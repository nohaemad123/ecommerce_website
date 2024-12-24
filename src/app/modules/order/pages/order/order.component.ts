import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse, EmptyState, Order, PaginationParams } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  params: PaginationParams = {
    limit: 4,
    page: 1
  };
  totalOrders = 0;
  emptyStateData: EmptyState;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private orderService: OrderService,
    private coreTranslationService: CoreTranslationService,
    private notifier: NotifyService,
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.prepareEmptyStateData();
    this.handlePageTitle();
    this.handleMetaTags();
  }

  handlePageTitle(): void {
    this.titleService.setTitle(this.coreTranslationService.instant('Order.myOrders'));
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
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('Order.myOrders') },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('Order.myOrders') },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  getAllOrders(): void {
    this.loading = true;
    this.subscriptions.add(
      this.orderService.getOrders(this.params).subscribe((response: ApiResponse) => {
        this.loading = false;
        if (response?.ok) {
          this.orders = response.data?.items;
          this.totalOrders = response.data?.totalItems;
        } 
      }, (error: HttpErrorResponse) => {
        this.loading = false;
      }));
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.getAllOrders();
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      text: this.coreTranslationService.instant('Order.NoOrdersFound'),
      btnText: this.coreTranslationService.instant('Order.startShopping'),
      withBtn: true,
    };
  }

  onStartShopping(): void {
    this.router.navigateByUrl(this.routingService.navigate('home'));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
