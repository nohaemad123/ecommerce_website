import { Component, OnDestroy, OnInit } from '@angular/core';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { CookieService } from 'ngx-cookie';
import { Meta, Title } from '@angular/platform-browser';
import { CartProduct } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    error = '';
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    passwordTextType = false;
    subscriptions = new Subscription();
    cartListData:{ cartDetails:CartProduct[] } = {} as any;

    constructor(
        private coreTranslationService: CoreTranslationService,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private cartService: CartService,
        private cookieService: CookieService,
        private titleService: Title,
        private meta: Meta,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    get loginFormControls() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {
        this.initLoginForm();
        this.handlePageTitle();
        this.handleMetaTags();
    }

    handlePageTitle(): void {
        this.titleService.setTitle('Al Nasyan Company | ' + this.coreTranslationService.instant('AUTH.LOGIN'));
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
            { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('AUTH.LOGIN') },
            { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'twitter:image', content: '' },

            // Facebook Card
            { name: 'og:url', content: '' },
            { name: 'og:type', content: 'Service' },
            { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('AUTH.LOGIN') },
            { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'og:image', content: '' }

        ]);
    }

    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // Login
        this.loading = true;
        this.authenticationService
            .loginCustomer(this.loginForm.value)
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                (res: any) => {
                    let cartList= this.cookieService.get("cartList");
                    if (!cartList) {
                        this.cartListData.cartDetails=[];
                    } else {
                        this.cartListData = JSON.parse(cartList);
                    }
                    if (this.cartListData.cartDetails?.length) {
                        this.cartListData.cartDetails?.forEach((product: any) => {
                            this.cartService.updateCart(product.id, product.quantity).subscribe((res) => {
                                product.isInCart = true;
                            });
                        });
                    }
                    this.router.navigateByUrl(this.routingService.navigate('home'));
                },
                (error) => {
                    this.error = error.error.responseMessage;
                    this.loading = false;
                }
            )
    }

    togglePasswordTextType(): void {
        this.passwordTextType = !this.passwordTextType;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
