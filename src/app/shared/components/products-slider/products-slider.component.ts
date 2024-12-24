import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { PagesWrapperService } from 'src/app/modules/pages-wrapper/services/pages-wrapper.service';
import { Value } from 'src/app/modules/pages-wrapper/pages/pages-wrapper/pages-wrapper.component';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, ComponentData, Product } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { locale as arabic } from '../../../modules/product-details/i18n/ar';
import { locale as english } from '../../../modules/product-details/i18n/en';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss']
})
export class ProductsSliderComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private coreTranslationService: CoreTranslationService,
    private pagesWrapperService: PagesWrapperService,
    private cartService: CartService,
    @Inject(Value) public componentData: ComponentData,
    private notifier: NotifyService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    if (this.componentData.pageSectionId) {
      this.getPageSectionDetails();
    }
  }

  getPageSectionDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.pagesWrapperService
        .getPageSectionDetails(this.componentData.pageSectionId)
        .subscribe((response: ApiResponse) => {
          this.loading = false;
          if (response?.ok) {
            this.products = response?.data.splice(0, 4);
          } 
        }, (error: HttpErrorResponse) => {
          this.loading = false;
        })
    );
  }

  addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
    this.notifier.notifySuccess(this.coreTranslationService.instant('AddedToCart'));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
