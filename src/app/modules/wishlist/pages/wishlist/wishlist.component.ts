import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { locale as arabic } from '../../i18n/ar';
import { locale as english } from '../../i18n/en';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse, EmptyState, PaginationParams, Product } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

  productsData: Product[] = [];
  filterCriteria: PaginationParams = {
    limit: 8,
    page: 1
  };
  totalProducts = 0;
  emptyStateData: EmptyState;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private wishlistService: WishlistService,
    private notifier: NotifyService,
    private coreTranslationService: CoreTranslationService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    public routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.fetchWishlistProducts();
    this.prepareEmptyStateData();
    this.handlePageTitle();
    this.handleMetaTags();
  }

  handlePageTitle(): void {
    this.titleService.setTitle(this.coreTranslationService.instant('wishlist.title'));
  }

  handleMetaTags(): void {
    this.meta.addTags([
      { name: 'developed by', content: 'Al Nasyan Company' },
      { name: 'author', content: 'Al Nasyan Company' },
      { name: 'description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'keywords', content: 'e-commerce, online shopping, online store, ecommerce platform, products' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: 'Al Nasyan Company' },
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('wishlist.title') },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('wishlist.title') },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  fetchWishlistProducts(): void {
    this.loading = true;
    this.subscriptions.add(
      this.wishlistService
        .getAllWishlistProducts(this.filterCriteria)
        .subscribe((response: ApiResponse) => {
          this.loading = false;
          if (response.ok) {
            this.productsData = response.data.items;
            this.totalProducts = response.data?.totalItems;
          } 
        }, (error: HttpErrorResponse) => {
          this.loading = false;
        })
    );
  }

  onPageChange(page: number): void {
    this.filterCriteria.page = page;
    this.fetchWishlistProducts();
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      text: this.coreTranslationService.instant('wishlist.empty_wishlist'),
      btnText: this.coreTranslationService.instant('wishlist.return_shop'),
      withBtn: true,
    };
  }

  onReturnToHome(): void {
    // this.router.navigateByUrl('/');
    this.routingService.navigate('home');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
