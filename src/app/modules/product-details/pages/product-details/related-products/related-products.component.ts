import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
 import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { locale as arabic } from './../../../i18n/ar';
import { locale as english } from './../../../i18n/en';
import { ProductDetailsService } from '../../../services/product-details.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, Product } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {

  products: Product[] = [];
  @Input() productId: number;
  filterCriteria: { limit: number; page: number; productId: any} = {
    limit: 4,
    page: 1,
    productId: null
  };
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private coreTranslationService: CoreTranslationService,
    private cartService: CartService,
    private productDetailsService: ProductDetailsService,
    private notifier: NotifyService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.filterCriteria.productId = this.productId;
    this.getRelatedProducts();
  }

  getRelatedProducts(): void {
    this.loading = true;
    this.subscriptions.add(
      this.productDetailsService.getRelatedProducts(this.filterCriteria).subscribe((response: ApiResponse) => {
        this.loading = false;
        if (response.ok) {
          this.products = response.data.items;
        }
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
