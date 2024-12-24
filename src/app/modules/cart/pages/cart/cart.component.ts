import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { environment } from 'src/environments/environment';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { Meta, Title } from '@angular/platform-browser';
import { CartProduct, Product } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    cartProducts: CartProduct[] = [];
    total = 0;
    shipping = 20;
    taxVat = 0;
    tax=0;
    subtotal = 0;
    discount = 0;
    vat=0;
    currentCurrency: string;
    couponCode: string;
    error = '';
    loading = false;
    imgBaseUrl = environment.imageBaseUrl;
    subscriptions = new Subscription();

    constructor(
        private cartService: CartService,
        private notifier: NotifyService,
        private commonService: CommonService,
        public imagesFallbackService: ImagesFallbackService,
        private coreTranslationService: CoreTranslationService,
        private titleService: Title,
        private meta: Meta,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.onCurrentCurrencyChange();
        this.onCartListChange();
        this.handlePageTitle();
        this.handleMetaTags();
    }

    handlePageTitle(): void {
        this.titleService.setTitle(this.coreTranslationService.instant('shoppingcart.title'));
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
            { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('shoppingcart.title') },
            { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'twitter:image', content: '' },

            // Facebook Card
            { name: 'og:url', content: '' },
            { name: 'og:type', content: 'Service' },
            { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('shoppingcart.title') },
            { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'og:image', content: '' }

        ]);
    }

    onCurrentCurrencyChange(): void {
        this.subscriptions.add(
            this.commonService.onCurrentCurrencyChange.subscribe((Currency) => {
                this.currentCurrency = Currency;
            })
        );
    }

    // cartLists.vat
    onCartListChange(): void{
        this.subscriptions.add(
            this.cartService.onCartListChange.subscribe((res: { cartDetails: CartProduct[]; dataFullDetails?: any }) => {
                // console.log('res',res);
                this.vat = res.dataFullDetails?.vat;
                this.tax = res.dataFullDetails?.tax;
                this.discount = res.dataFullDetails?.discount;
                this.couponCode = res.dataFullDetails?.couponCode;
                this.cartProducts = res?.cartDetails;
                this.subtotal= res.dataFullDetails?.subTotalPrice
                this.total = res.dataFullDetails?.totalPrice;
            }));
    }


    onDeleteItem(product: CartProduct): void {
        this.subscriptions.add(this.cartService.updateCart(product.productId, 0).subscribe(() => { }));
        this.notifier.notifyInfo('Your product removed from the cart!');
    }

    // Input Counter
    plus(product: CartProduct): void {
        this.total = 0;
        product.quantity++;
        this.subscriptions.add(this.cartService.updateCart(product.productId, product.quantity).subscribe(() => { }));
    }

    minus(product: CartProduct): void {
        this.total = 0;
        if (product.quantity > 1) {
            product.quantity--;
            this.subscriptions.add(this.cartService.updateCart(product.productId, product.quantity).subscribe(() => { }));
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
