import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CheckoutService } from '../../services/checkout.service';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
    Address,
    ApiResponse,
    CartProduct,
    EmptyState,
    PaymentType,
    User,
} from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressesService } from 'src/app/modules/addresses/services/addresses.service';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
    products: CartProduct[] = [];
    total = 0;
    isOpen = false;
    isOpenNew = false;
    selectedOption: string | null = null;
    addressesData: Address[] = [];
    addressEmptyStateData: EmptyState;
    isEditClicked = false;
    addressData: Address;
    cartProducts: CartProduct[] = [];
    paymentTypes: PaymentType[] = [];
    taxVat = 0;
    subtotal = 0;
    discount = 0;
    tax=0;
    shippingCost = 0;
    currentCurrency: string;
    couponCode: string;
    error = '';
    loading = false;
    loadOrderFlag = true;
    placeOrderLoading = false;
    placeOrderPayload = {
        paymentTypeId: 0,
        shippingAddressId: 0,
        orderNote: ''
    };
    imgBaseUrl = environment.imageBaseUrl;
    loadingAddress = false;
    subscriptions = new Subscription();

    constructor(
        private cartService: CartService,
        private authenticationService: AuthenticationService,
        private addressesService: AddressesService,
        private coreTranslationService: CoreTranslationService,
        private commonService: CommonService,
        private checkoutService: CheckoutService,
        public imagesFallbackService: ImagesFallbackService,
        private notifier: NotifyService,
        private router: Router,
        private titleService: Title,
        private meta: Meta,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit() {
        this.handlePageTitle();
        this.onCurrentCurrencyChange();
        this.checkLoggedInUser();
        this.onCartListChange();
        this.getAllAddresses();
        this.getAllPaymentType();
        this.handleMetaTags();
        this.prepareAddressEmptyStateData();
    }

    handlePageTitle(): void {
        this.titleService.setTitle(
            this.coreTranslationService.instant('checkout.title')
        );
    }

    handleMetaTags(): void {
        this.meta.addTags([
            { name: 'developed by', content: 'Al Nasyan Company' },
            { name: 'author', content: 'Al Nasyan Company' },
            {
                name: 'description',
                content:
                    'An Ecommerce Platform provides a wide range of products.',
            },
            {
                name: 'keywords',
                content:
                    'e-commerce, online shopping, online store, ecommerce platform, products',
            },

            // Twitter Card
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: 'Al Nasyan Company' },
            {
                name: 'twitter:title',
                content:
                    'Al Nasyan Company | ' +
                    this.coreTranslationService.instant('checkout.title'),
            },
            {
                name: 'twitter:description',
                content:
                    'An Ecommerce Platform provides a wide range of products.',
            },
            { name: 'twitter:image', content: '' },

            // Facebook Card
            { name: 'og:url', content: '' },
            { name: 'og:type', content: 'Service' },
            {
                name: 'og:title',
                content:
                    'Al Nasyan Company | ' +
                    this.coreTranslationService.instant('checkout.title'),
            },
            {
                name: 'og:description',
                content:
                    'An Ecommerce Platform provides a wide range of products.',
            },
            { name: 'og:image', content: '' },
        ]);
    }

    onCurrentCurrencyChange(): void {
        this.subscriptions.add(
            this.commonService.onCurrentCurrencyChange.subscribe((Currency) => {
                this.currentCurrency = Currency;
            })
        );
    }

    checkLoggedInUser(): void {
        this.subscriptions.add(
            this.authenticationService.currentUser.subscribe(
                (currentUser: User) => {
                    if (currentUser.token) {
                        this.subscriptions.add(
                            this.cartService.getCartList().subscribe(() => { })
                        );
                    }
                }
            )
        );
    }

    onCartListChange(): void {
        this.subscriptions.add(
            this.cartService.onCartListChange.subscribe(
                (res: {
                    cartDetails: CartProduct[];
                    dataFullDetails?: any;
                }) => {
                    // console.log('res',res);
                    this.taxVat = res.dataFullDetails?.vat;
                    this.discount = res.dataFullDetails?.discount;
                    this.couponCode = res.dataFullDetails?.couponCode;
                    this.tax = res.dataFullDetails?.taxRate;
                    this.shippingCost = res.dataFullDetails?.shippingRate;
                    this.cartProducts = res?.cartDetails;
                    this.subtotal = res.dataFullDetails?.subTotalPrice;
                    this.total = res.dataFullDetails?.totalPrice;
                    if (res?.cartDetails) this.loadOrderFlag = false;
                }
            )
        );
    }

    getAllPaymentType(): void {
        this.subscriptions.add(
            this.checkoutService.getAllPaymentType().subscribe(
                (response: ApiResponse) => {
                    if (response.ok) {
                        this.paymentTypes = response.data;
                        this.placeOrderPayload.paymentTypeId =
                            this.paymentTypes[0].id;
                    } 
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                }
            )
        );
    }

    selectPaymentType(paymentTypeId: number): void {
        // this.placeOrderPayload.paymentTypeId = paymentTypeId;
    }

    prepareAddressEmptyStateData(): void {
        this.addressEmptyStateData = {
            text: this.coreTranslationService.instant('NoAddressesFound'),
            btnText: this.coreTranslationService.instant('AddNewAddress'),
            withBtn: true,
        };
    }

    placeOrder(): void {
        if (this.placeOrderPayload.shippingAddressId > 0) {
            this.placeOrderLoading = true;
            this.subscriptions.add(
                this.checkoutService
                    .placeOrder(this.placeOrderPayload)
                    .subscribe(
                        (response: ApiResponse) => {
                            this.placeOrderLoading = false;
                            if (response.ok) {
                                this.cartService
                                    .getCartList()
                                    .subscribe(() => { });
                                this.notifier.notifySuccess(
                                    this.coreTranslationService.instant(
                                        'checkout.orderPlacedSuccessfully'
                                    )
                                );
                                this.router.navigateByUrl(this.routingService.navigate('/profile/orders'));
                            } 
                        },
                        (error: HttpErrorResponse) => {
                            this.placeOrderLoading = false;
                        }
                    )
            );
        } else {
            this.notifier.notifyWarning(
                this.coreTranslationService.instant(
                    'checkout.please_add_your_default_address'
                )
            );
        }
    }

    applyCoupon(): void {
        this.loading = true;
        this.subscriptions.add(
            this.cartService.addCoupon(this.couponCode).subscribe(
                (response: ApiResponse) => {
                    this.loading = false;
                    this.notifier.notifySuccess(
                        this.coreTranslationService.instant(
                            'checkout.Coupon_applied'
                        )
                    );
                },
                (error: any) => {
                    this.error = error?.error?.responseMessage;
                    this.loading = false;
                }
            )
        );
    }

    openNewAdd(): void {
        this.isOpenNew = !this.isOpenNew;
    }

    getAllAddresses(): void {
        this.loadingAddress = true;
        this.subscriptions.add(
            this.addressesService.getAllAddresses().subscribe(
                (res: ApiResponse) => {
                    if (res.data) {
                        this.loadingAddress = false;
                        this.addressesData = res.data;
                        this.placeOrderPayload.shippingAddressId = 0;
                        res.data.forEach((addressElement: Address) => {
                            if (addressElement.defaultAddress)
                                this.placeOrderPayload.shippingAddressId =
                                    addressElement.id;
                        });
                    }
                },
                (error: any) => {
                    this.loadingAddress = false;
                }
            )
        );
    }

    onEditAddress(event: { address: Address }): void {
        if (event?.address) {
            this.openForm('EDIT');
            this.addressData = event.address;
            this.isEditClicked = this.isOpen ? true : false;
        }
    }

    openForm(mode: string): void {
        if (mode === 'ADD') {
            this.addressData = {} as Address;
        }
        this.isOpen = !this.isOpen;
    }

    onUpdateAddressList(event: { changed: boolean }): void {
        if (event.changed) {
            this.getAllAddresses();
            this.isOpen = false;
            this.isEditClicked = false;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
