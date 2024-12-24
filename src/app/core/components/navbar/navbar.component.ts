import {
    Component,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    RendererFactory2,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { NotifierService } from 'angular-notifier';
import { CommonService } from '../../services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { locale as arabic } from './i18n/ar';
import { locale as english } from './i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/modules/products/services/products.service';
import { isPlatformBrowser } from '@angular/common';
import { ImagesFallbackService } from '../../services/images-fallback.service';
import { NotifyService } from '../../services/notify.service';
import { CookieService } from 'ngx-cookie';
import { ApiResponse, CartProduct, Category, MenuLink, PaginationParams, Product, ProductsFilter, StoreSettings, User } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('slideInOut', [
            state(
                'in',
                style({
                    transform: 'translateX(0)',
                    display: 'block',
                })
            ),
            state(
                'out',
                style({
                    transform: 'translateX(100%)',
                    display: 'none',
                })
            ),
            transition('in => out', animate('300ms ease-out')),
            transition('out => in', animate('300ms ease-in')),
        ]),
    ],
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
    @Input() storeLinks: MenuLink[];
    @Input() storeSettings: StoreSettings;
    currency = "SAR";
    cartProducts: CartProduct[] = [];
    classApplied = false;
    isCart = false;
    selectedOption = '';
    isDropdownOpen = false;
    isSearchOpen = true;
    totalPrice = 0;
    inputNumber = 1;
    categories: Category[] = [];
    selectedLang = this.cookieService.get('lang') ? this.cookieService.get('lang') : environment.lang;
    currentUser: User;
    searchControl: FormControl = new FormControl('');
    searchResults: Product[] = [];
    searchStarted = false;
    isResponsive = false;
    selectedLink = 'info';
    isAccountMenu = false;
    showCurrencyMenu = false;
    imgBaseUrl = environment.imageBaseUrl;
    params: PaginationParams = {
        limit: 12,
        page: 1
    };
    filterCriteria: ProductsFilter = {
        brandIds: [],
        tagIds: [],
        categoryId: null,
        priceMin: 1,
        priceMax: 100000,
        name: "",
        sortBy: 0
    };
    subscriptions = new Subscription();

    constructor(
        public router: Router,
        private cartService: CartService,
        private commonService: CommonService,
        private translateService: TranslateService,
        private rendererFactory: RendererFactory2,
        private coreTranslationService: CoreTranslationService,
        private notifier: NotifyService,
        private productsService: ProductsService,
        private authenticationService: AuthenticationService,
        @Inject(PLATFORM_ID) private platformId: Object,
        public imagesFallbackService: ImagesFallbackService,
        private cookieService: CookieService,
        private modalService: NgbModal,
        public routingService: RoutingService,
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.getCurrentUserData();
        this.checkCartListData();
        this.onCartListChange();
        this.getStoreCategories();
        this.setCurrentCurrency();
        this.handleSearch();
        this.onResize();
        this.selectedLink = this.router.url.replace('/profile/', '');
    }

    onResize(event?: Event): void {
        this.isResponsive = window.innerWidth < 768;
    }

    openProfileLink(link: string): void {
        this.selectedLink = link;
        this.router.navigateByUrl(this.routingService.navigate('profile/' + link));
        // this.router.navigate(['/profile/' + link]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['storeLinks']) {
            this.storeLinks = changes['storeLinks'].currentValue.slice(0, 4);
        }
        if (changes['storeSettings']) {
            this.storeSettings = changes['storeSettings'].currentValue;
        }
    }

    onCategoryClicked(categoryId: number): void {
        this.router.navigateByUrl(this.routingService.navigate('products?categoryId=' + categoryId));
    }

    getCurrentUserData(): void {
        this.subscriptions.add(
            this.authenticationService.currentUser.subscribe(
                (userData: User) => {
                    this.currentUser = userData;
                    if (this.currentUser.token) {
                        this.subscriptions.add(
                            this.cartService.getCartList().subscribe(() => { })
                        );
                    }
                }
            )
        );
    }

    checkCartListData(): void {
        if (this.cookieService.get('cartList')) {
            let cartListData = JSON.parse(this.cookieService.get('cartList')!);
            if (cartListData && !this.currentUser.token) {
                this.cartService.onCartListChange.next(cartListData);
            }
        }
    }

    setCurrentCurrency(): void {
        if (this.cookieService.get('currentCurrency')) {
            this.currency = this.cookieService.get('currentCurrency')!;
            this.commonService.setCurrentCurrency(this.currency);
        } else {
            this.subscriptions.add(
                this.commonService.getAllSettings().subscribe((res: ApiResponse) => {
                    let currencyID = res.data.currencyID;
                    if (currencyID == 1) {
                        this.cookieService.put('currentCurrency', 'SAR');
                        this.currency = 'SAR';
                    } else if (currencyID == 2) {
                        this.cookieService.put('currentCurrency', 'EGP');
                        this.currency = 'EGP';
                    } else if (currencyID == 3) {
                        this.cookieService.put('currentCurrency', 'USD');
                        this.currency = 'USD';
                    } else {
                        this.cookieService.put('currentCurrency', 'SAR');
                        this.currency = 'SAR';
                    }
                    this.commonService.setCurrentCurrency(this.currency);
                })
            );
        }
    }

    onCartListChange(): void {
        this.subscriptions.add(
            this.cartService.onCartListChange.subscribe((res: { cartDetails: CartProduct[] }) => {
                this.totalPrice = 0;
                this.cartProducts = res.cartDetails;
                this.cartProducts?.forEach((element: CartProduct) => {
                    this.totalPrice += (element.quantity * element.productPrice);
                });
            })
        );
    }

    getStoreCategories(): void {
        this.subscriptions.add(
            this.productsService.getCategoriesTreeList().subscribe(
                (response: ApiResponse) => {
                    if (response.ok) {
                        this.categories = response.data?.splice(0, 6);
                    }
                }
            )
        );
    }

    get stateName(): string {
        return this.isCart ? 'in' : 'out';
    }

    toggleClass(): void {
        this.classApplied = !this.classApplied;
    }

    openCartModel(): void {
        this.isCart = !this.isCart;
        const htmlTag = document.getElementsByTagName('html');
        htmlTag[0].classList.toggle('overflow');
    }


    removeFromCartUser(product: CartProduct): void {
        this.subscriptions.add(this.cartService.updateCart(product.productId, 0).subscribe(() => { }));
        this.notifier.notifySuccess(this.coreTranslationService.instant('NavBar.ProductRemoved'));
    }

    removeFromCartGuest(product: CartProduct): void {
        this.cartService.removeFromCartGuest(product);
        this.notifier.notifySuccess(
            this.coreTranslationService.instant('NavBar.ProductRemoved')
        );
    }

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    goToCartDetails(): void {
        this.isCart = !this.isCart;
        if (this.currentUser.token) {
            this.router.navigateByUrl(this.routingService.navigate('cart'));
        } else {
            this.notifier.notifyInfo(
                this.coreTranslationService.instant('NavBar.LoginFirst')
            );
            this.router.navigateByUrl(this.routingService.navigate('authentication'));
        }
    }

    openSearch(): void {
        this.isSearchOpen = !this.isSearchOpen;
    }

    selectOption(option: string): void {
        this.selectedOption = option;
        this.isDropdownOpen = false;
    }

    // Input Counter
    plus(product: CartProduct): void {
        product.quantity++;
        if (this.currentUser.token) {
            this.subscriptions.add(
                this.cartService
                    .updateCart(product.productId, product.quantity)
                    .subscribe(() => {
                        this.calculateTotalPrice();
                    }, (error) => {
                        product.quantity--;
                        this.calculateTotalPrice();
                    })
            );
        } else {
            this.cartService.InOrderIncreaseQuantityFromCartGuest(
                product,
                product.quantity
            );
            this.calculateTotalPrice();
        }

    }

    minus(product: CartProduct): void {
        if (product.quantity > 1) {
            product.quantity--;
            if (this.currentUser.token) {
                this.subscriptions.add(
                    this.cartService
                        .updateCart(product.productId, product.quantity)
                        .subscribe(() => {
                            this.calculateTotalPrice();
                        },
                            (error) => {
                                this.calculateTotalPrice();
                            }
                        )
                );
            } else {
                this.cartService.InOrderIncreaseQuantityFromCartGuest(
                    product,
                    product.quantity
                );
                this.calculateTotalPrice();
            }
        }
    }

    calculateTotalPrice(): void {
        this.totalPrice = 0;
        this.cartProducts?.forEach((element: CartProduct) => {
            this.totalPrice += (element.quantity * element.productPrice);
        });
    }

    //CurrencyStore
    onSelectCurrency(currency: string): void {
        this.currency = currency;
        this.cookieService.put('currentCurrency', currency);
        this.commonService.setCurrentCurrency(currency);
        this.showCurrencyMenu = false;
    }

    //lang
    setLanguage(language: string): void {
        // Set the selected language for the navbar on change
        this.selectedLang = language;
        // Use the selected language id for translations
        this.translateService.use(language);
        this.setAppDirection(language == 'ar' ? 'rtl' : 'ltr');
        window.location.reload();
    }

    setAppDirection(AppDirection: 'ltr' | 'rtl'): void {
        try {
            let renderer = this.rendererFactory.createRenderer(null, null);
            if (AppDirection) {
                this.cookieService.put('AppDirection', AppDirection);
                if (AppDirection === 'rtl') {
                    renderer.setAttribute(document.body, 'dir', 'rtl');
                    renderer.setAttribute(document.body, 'direction', 'rtl');
                    renderer.setStyle(document.body, 'direction', 'rtl');
                    renderer.setStyle(document.body, 'text-align', 'right');
                } else {
                    renderer.removeAttribute(document.body, 'direction');
                    renderer.removeAttribute(document.body, 'dir');
                    renderer.removeStyle(document.body, 'direction');
                    renderer.removeStyle(document.body, 'text-align');
                }
                this.cookieService.put('lang', this.selectedLang);
            }
        } catch (error) {
            console.error(error);
        }
    }

    openRoute(routeUrl: string): void {
        this.commonService.selectedWrapperPage.next(routeUrl);
        this.router.navigateByUrl(this.routingService.navigate(routeUrl));
    }

    handleSearch(): void {
        this.subscriptions.add(
            this.searchControl?.valueChanges
                .pipe(
                    filter((q) => q?.trim()?.length >= 2 || q?.trim() === ''),
                    debounceTime(400)
                )
                .subscribe(
                    (query: string) => {
                        this.filterCriteria.name = query;
                        this.getSearchResults(this.params, this.handleFilter());
                    }
                )
        );
    }

    handleFilter(): ProductsFilter {
        let filterObj: ProductsFilter = {} as ProductsFilter;
        if (this.filterCriteria?.brandIds?.length) filterObj['brandIds'] = this.filterCriteria?.brandIds
        if (this.filterCriteria?.tagIds?.length) filterObj['tagIds'] = this.filterCriteria?.tagIds
        if (this.filterCriteria?.categoryId) filterObj['categoryId'] = this.filterCriteria?.categoryId
        if (this.filterCriteria?.priceMin) filterObj['priceMin'] = this.filterCriteria?.priceMin
        if (this.filterCriteria?.priceMax) filterObj['priceMax'] = this.filterCriteria?.priceMax
        if (this.filterCriteria?.name) filterObj['name'] = this.filterCriteria?.name
        if (this.filterCriteria?.sortBy) filterObj['sortBy'] = this.filterCriteria?.sortBy
        return filterObj;
    }

    getSearchResults(params: PaginationParams, filter: ProductsFilter): void {
        if (filter?.name?.length >= 2) {
            this.subscriptions.add(
                this.productsService
                    .getStoreProducts(params, filter)
                    .subscribe((response: ApiResponse) => {
                        if (response?.ok) {
                            this.searchResults = response?.data?.items;
                        }
                        this.searchStarted = true;
                    })
            );
        } else {
            this.searchResults = [];
            this.searchStarted = false;
        }
    }

    openProductPage(productId: number): void {
        console.log("productId:",productId)
        this.router.navigateByUrl(this.routingService.navigate(`product-details/${productId}`));
        this.searchResults = [];
        this.searchStarted = false;
    }

    onUserIconClicked(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.cookieService.get('userToken')) {
                this.isAccountMenu = !this.isAccountMenu;
            } else {
                this.router.navigateByUrl(this.routingService.navigate('authentication'));
            }
        }
    }

    onUserIconClickedMobile(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.cookieService.get('userToken')) {
                this.router.navigateByUrl(this.routingService.navigate('profile/settings/info'));
            } else {
                this.router.navigateByUrl(this.routingService.navigate('authentication'));
            }
        }
    }

    onLogout(): void {
        this.authenticationService.logout();
        this.isAccountMenu = false;
    }

    openCurrencyMenu(): void {
        this.showCurrencyMenu = !this.showCurrencyMenu;
    }

    modalOpenForm(modalForm: any): void {
        this.modalService.open(modalForm, { centered: true });
    }



    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
