import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductDetailsService } from '../../services/product-details.service';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { environment } from 'src/environments/environment';
import { NotifyService } from 'src/app/core/services/notify.service';
import { CookieService } from 'ngx-cookie';
import { Meta, Title } from '@angular/platform-browser';
import {
    ApiResponse,
    CartProduct,
    Product,
    ProductImage,
    User,
} from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product: Product;
    currentLang = environment.lang;
    inputNumber = 1;
    currentCurrency: string;
    reviewForm: FormGroup;
    customThumbsOptions: OwlOptions = {
        loop: true,
        autoplay: false,
        center: false,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        items: 4,
        margin: 10,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>",
        ],
    };
    filterCriteria: { limit: number; page: number; ProductId: any } = {
        limit: 10,
        page: 1,
        ProductId: null,
    };
    productId: number;
    currentUser: User;
    reviews: any[] = [];
    loading = false;
    getReviewsLoading = false;
    addReviewLoading = false;
    submitted = false;
    messageFlag = false;
    imgBaseUrl = environment.imageBaseUrl;
    productMainImg: { imageProductUrl: string; imageProductId: number };
    currentUrl = window.location.href;
    subscriptions = new Subscription();
    cartProducts: CartProduct[] = [];

    constructor(
        private route: ActivatedRoute,
        private productDetailsService: ProductDetailsService,
        private commonService: CommonService,
        private coreTranslationService: CoreTranslationService,
        private cartService: CartService,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        public imagesFallbackService: ImagesFallbackService,
        private notifier: NotifyService,
        private cookieService: CookieService,
        private titleService: Title,
        private meta: Meta,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.getProductId();
        this.handleCurrencyChange();
        this.getCurrentUserData();
    }

    getProductId(): void {
        this.route.paramMap.subscribe((params) => {
            this.productId = +params.get('productId')!;
            if (this.productId > 0) {
                this.getProductDetails();
                this.filterCriteria.ProductId = this.productId;
                this.initReviewForm();
                this.getProductRatingByProductId();
            }
        });
    }

    onCartListChange(): void {
        this.subscriptions.add(
            this.cartService.onCartListChange.subscribe(
                (res: { cartDetails: CartProduct[] }) => {
                    this.cartProducts = res.cartDetails;
                    let product_index = this.cartProducts?.findIndex(
                        (p: CartProduct) =>
                            p.productId == this.product.productId
                    );
                    if (product_index > -1) {
                        this.product.quantity =
                            this.cartProducts[product_index].quantity;
                        // this.product.quantity++;
                    }

                    // console.log(' this.product.quantity', this.product.quantity);
                }
            )
        );
    }

    getProductDetails(): void {
        this.loading = true;
        this.subscriptions.add(
            this.productDetailsService
                .GetStoreProductDetails(this.productId)
                .subscribe(
                    (res: ApiResponse) => {
                        this.loading = false;
                        if (res?.ok) {
                            this.product = res.data;
                            this.handlePageTitle();
                            this.handleMetaTags();
                            this.onCartListChange();

                            if (!this.product.quantity)
                                this.product.quantity = 1;
                            let counter = 0;
                            this.product.productImages.forEach(
                                (productImage: ProductImage) => {
                                    if (productImage.isMainImage == true) {
                                        this.productMainImg = {
                                            imageProductUrl:
                                                productImage.imageProduct,
                                            imageProductId: productImage.id,
                                        };
                                    } else {
                                        counter++;
                                    }
                                    if (
                                        counter ==
                                        this.product.productImages.length
                                    ) {
                                        this.productMainImg = {
                                            imageProductUrl:
                                                this.product.productImages[0]
                                                    .imageProduct,
                                            imageProductId:
                                                this.product.productImages[0]
                                                    .imageProduct.id,
                                        };
                                    }
                                }
                            );
                        } 
                    },
                    (error: HttpErrorResponse) => {
                        this.loading = false;
                    }
                )
        );
    }

    handlePageTitle(): void {
        this.titleService.setTitle(this.product?.productName);
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
                    'Al Nasyan Company | ' + this.currentLang == 'en'
                        ? this.product?.productNameEn
                        : this.product?.productName,
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
                    'Al Nasyan Company | ' + this.currentLang == 'en'
                        ? this.product?.productNameEn
                        : this.product?.productName,
            },
            {
                name: 'og:description',
                content:
                    'An Ecommerce Platform provides a wide range of products.',
            },
            { name: 'og:image', content: '' },
        ]);
    }

    getProductRatingByProductId(): void {
        this.getReviewsLoading = true;
        this.subscriptions.add(
            this.productDetailsService
                .getProductRatingByProductId(this.filterCriteria)
                .subscribe(
                    (res: ApiResponse) => {
                        if (res.ok) {
                            this.reviews = res.data.items;
                        }
                    },
                    (error: HttpErrorResponse) => {
                        this.getReviewsLoading = false;
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

    getData(slide: ProductImage): void {
        this.productMainImg = {
            imageProductUrl: slide.imageProduct,
            imageProductId: slide.id,
        };
    }

    getCurrentUserData(): void {
        this.subscriptions.add(
            this.authenticationService.currentUser.subscribe(
                (userData: User) => {
                    this.currentUser = userData;
                }
            )
        );
    }

    initReviewForm(): void {
        this.reviewForm = this.formBuilder.group({
            rate: ['', [Validators.required]],
            comments: ['', Validators.required],
            productID: [this.productId],
        });
    }

    onAddReview(): void {
        if (this.currentUser.token) {
            this.submitted = true;
            // stop here if form is invalid
            if (this.reviewForm.invalid) {
                if (this.reviewForm.controls['rate'].invalid)
                    this.notifier.notifyWarning(
                        this.coreTranslationService.instant(
                            'productDetail.add_rating'
                        )
                    );
                if (this.reviewForm.controls['comments'].invalid)
                    this.notifier.notifyWarning(
                        this.coreTranslationService.instant(
                            'productDetail.add_comment'
                        )
                    );

                return;
            }

            // add review
            this.addReviewLoading = true;
            this.productDetailsService
                .addProductReview(this.reviewForm.value)
                .subscribe(
                    (response: ApiResponse) => {
                        this.addReviewLoading = false;
                        if (response.ok) {
                            this.notifier.notifySuccess(
                                this.coreTranslationService.instant(
                                    'ReviewAddSuccess'
                                )
                            );
                            this.reviewForm.reset();
                            this.getProductId();
                        }
                    },
                    (error: HttpErrorResponse) => {
                        this.addReviewLoading = false;
                    }
                );
        } else {
            this.notifier.notifyInfo(
                this.coreTranslationService.instant('LoginFirst')
            );
        }
    }

    addToCartUser(product: Product): void {
        if (!product.quantity) product.quantity = 1;
        this.subscriptions.add(
            this.cartService
                .updateCart(product.id, product.quantity)
                .subscribe(() => {
                    product.isInCart = true;
                    this.notifier.notifySuccess(
                        this.coreTranslationService.instant('AddedToCart')
                    );
                })
        );
    }

    addToCartGuest(product: Product): void {
        product.isInCart = true;
        if (!product.quantity) product.quantity = 1;
        this.cartService.addProductToCart(product, 'product_details');
        this.notifier.notifySuccess(
            this.coreTranslationService.instant('AddedToCart')
        );
    }

    plus(): void {
        this.product.quantity++;
    }

    minus(): void {
        if (this.product.quantity > 1) {
            this.product.quantity--;
        }
    }

    onReviewsTabClicked(): void {
        // if (this.currentUser) {
        // this.initReviewForm();
        // }
        // this.getProductRatingByProductId();
    }

    onToggleFavorite(): void {
        if (this.currentUser.token) {
            if (!this.product.isInFavorite) {
                this.addProductToFavorite();
            } else {
                this.removeProductFromFavorite();
            }
            this.product.isInFavorite = !this.product.isInFavorite;
        } else {
            this.notifier.notifyInfo(
                this.coreTranslationService.instant('LoginFirst')
            );
        }
    }

    addProductToFavorite(): void {
        this.subscriptions.add(
            this.commonService.addProductToWishlist(this.productId).subscribe(
                (response: ApiResponse) => {
                    if (response?.ok) {
                        this.product.isInFavorite = true;
                        this.notifier.notifySuccess(
                            this.coreTranslationService.instant(
                                'AddedToWishlist'
                            )
                        );
                    } else {
                        this.product.isInFavorite = false;
                    }
                }
            )
        );
    }

    removeProductFromFavorite(): void {
        this.subscriptions.add(
            this.commonService
                .removeProductFromWishlist(this.productId)
                .subscribe(
                    (response: ApiResponse) => {
                        if (response?.ok) {
                            this.product.isInFavorite = false;
                            this.notifier.notifySuccess(
                                this.coreTranslationService.instant(
                                    'RemovedFromWishlist'
                                )
                            );
                        } else {
                            this.product.isInFavorite = true;
                        }
                    }
                )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
