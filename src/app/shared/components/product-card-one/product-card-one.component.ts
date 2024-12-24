import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { locale as arabic } from '../../../modules/product-details/i18n/ar';
import { locale as english } from '../../../modules/product-details/i18n/en';
import { CoreTranslationService } from '../../services/core-translation.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, CartProduct, Product, User } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
    selector: 'app-product-card-one',
    templateUrl: './product-card-one.component.html',
    styleUrls: ['./product-card-one.component.scss'],
})
export class ProductCardOneComponent implements OnInit, OnDestroy {
    @Input() cardData: Product;
    @Output() removeFromFavoriteEmitter = new EventEmitter<boolean>();
    currentUser: User;
    currentCurrency: string;
    productId: number;
    imgBaseUrl = environment.imageBaseUrl;
    lang = environment.lang;
    subscriptions = new Subscription();
    cartProducts: CartProduct[] = [];

    constructor(
        private commonService: CommonService,
        private cartService: CartService,
        public imagesFallbackService: ImagesFallbackService,
        private authenticationService: AuthenticationService,
        private coreTranslationService: CoreTranslationService,
        private notifier: NotifyService,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.productId = this.cardData?.id;
        this.handleCurrencyChange();
        this.getCurrentUserData();
        if (this.cardData) {
            this.cardData.id = this.cardData.productId;
        }

        this.onCartListChange();
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

    onCartListChange(): void {
        this.subscriptions.add(
            this.cartService.onCartListChange.subscribe(
                (res: { cartDetails: CartProduct[] }) => {
                    this.cartProducts = res.cartDetails;
                    let product_index = this.cartProducts?.findIndex(
                        (p: CartProduct) =>
                            p.productId == this.cardData.productId
                    );
                    if (product_index > -1) {
                        this.cardData.quantity =
                            this.cartProducts[product_index].quantity;
                        this.cardData.quantity++;
                    }
                }
            )
        );
    }

    addToCartGuest(product: Product): void {
        product.isInCart = true;
        if (!product.quantity) product.quantity = 1;
        this.cartService.addProductToCart(product,'product_card');
        this.notifier.notifySuccess(
            this.coreTranslationService.instant('AddedToCart')
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

    onToggleFavorite(): void {
        if (this.currentUser.token) {
            if (!this.cardData.isInFavorite) {
                this.addProductToFavorite();
            } else {
                this.removeProductFromFavorite();
            }
            this.cardData.isInFavorite = !this.cardData.isInFavorite;
        } else {
            this.notifier.notifyInfo(
                this.coreTranslationService.instant('LoginFirst')
            );
        }
    }

    addProductToFavorite(): void {
        this.subscriptions.add(
            this.commonService
                .addProductToWishlist(this.cardData.productId)
                .subscribe(
                    (response: any) => {
                        if (response?.ok) {
                            this.cardData.isInFavorite = true;
                            this.notifier.notifySuccess(
                                this.coreTranslationService.instant(
                                    'AddedToWishlist'
                                )
                            );
                        } else {
                            this.cardData.isInFavorite = false;
                        }
                    }
                )
        );
    }

    removeProductFromFavorite(): void {
        this.subscriptions.add(
            this.commonService
                .removeProductFromWishlist(this.cardData.productId)
                .subscribe(
                    (response: any) => {
                        if (response?.ok) {
                            this.cardData.isInFavorite = false;
                            this.notifier.notifySuccess(
                                this.coreTranslationService.instant(
                                    'RemovedFromWishlist'
                                )
                            );
                            this.removeFromFavoriteEmitter.emit(true);
                        } else {
                            this.cardData.isInFavorite = true;
                        }
                    }
                )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
