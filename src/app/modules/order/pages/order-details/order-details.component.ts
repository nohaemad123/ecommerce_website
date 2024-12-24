import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CommonService } from 'src/app/core/services/common.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Meta, Title } from '@angular/platform-browser';
import { ApiResponse, Order } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

    orderId: number;
    orderDetail: Order;
    currentCurrency: string;
    days: number;
    loading = false;
    subscriptions = new Subscription();
    imgBaseUrl = environment.imageBaseUrl;


    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private commonService: CommonService,
        private coreTranslationService: CoreTranslationService,
        private notifier: NotifyService,
        private titleService: Title,
        private meta: Meta
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.orderId = +params['orderId'];
            if (this.orderId > 0) this.getOrderDetailsById();
        });
        this.handleCurrencyChange();
        this.handlePageTitle();
        this.handleMetaTags();
    }

    handlePageTitle(): void {
        this.titleService.setTitle(this.coreTranslationService.instant('Order.title'));
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
            { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('Order.title') },
            { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'twitter:image', content: '' },

            // Facebook Card
            { name: 'og:url', content: '' },
            { name: 'og:type', content: 'Service' },
            { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('Order.title') },
            { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'og:image', content: '' }

        ]);
    }

    getOrderDetailsById(): void {
        this.loading = true;
        this.subscriptions.add(
            this.orderService
                .getOrderById(this.orderId)
                .subscribe((response: ApiResponse) => {
                    this.loading = false;
                    if (response.ok) {
                        this.orderDetail = response.data;
                        this.days = this.getDiffDays(
                            new Date(this.orderDetail.orderDate),
                            new Date(
                                this.orderDetail.orderDetails[0].deliveryDate
                            )
                        );
                    } 
                },
                    (error: HttpErrorResponse) => {
                        this.loading = false;
                    }
                )
        );
    }

    handleCurrencyChange(): void {
        this.subscriptions.add(
            this.commonService.onCurrentCurrencyChange.subscribe(
                (currentCurrency: string) => {
                    this.currentCurrency = currentCurrency;
                }
            )
        );
    }

    getDiffDays(startDate: any, endDate: any) {
        return Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
