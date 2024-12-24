import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { CookieService } from 'ngx-cookie';
import { Meta, Title } from '@angular/platform-browser';
import { ApiResponse, CartProduct, Country } from 'src/app/core/models';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/core/services/common.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { finalize } from 'rxjs/operators';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    countries: Country[] = [];
    error = '';
    passwordTextType = false;
    submitted = false;
    loading = false;
    passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;
    usernameRegex = /^[a-zA-Z]+$/
    subscriptions = new Subscription();
    cartListData: { cartDetails: CartProduct[] } = {} as any;

    constructor(
        private router: Router,
        private coreTranslationService: CoreTranslationService,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private cartService: CartService,
        private cookieService: CookieService,
        private commonService: CommonService,
        private titleService: Title,
        private meta: Meta,
        private notifier: NotifyService,
        public routingService: RoutingService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    get registerFormControls() {
        return this.registerForm.controls;
    }

    ngOnInit(): void {
        this.initRegisterForm();
        this.getAllCountries();
        this.handlePageTitle();
        this.handleMetaTags();
    }

    handlePageTitle(): void {
        this.titleService.setTitle(
            'Al Nasyan Company | ' +
            this.coreTranslationService.instant('AUTH.REGISTER')
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
                    this.coreTranslationService.instant('AUTH.REGISTER'),
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
                    this.coreTranslationService.instant('AUTH.REGISTER'),
            },
            {
                name: 'og:description',
                content:
                    'An Ecommerce Platform provides a wide range of products.',
            },
            { name: 'og:image', content: '' },
        ]);
    }

    initRegisterForm(): void {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.usernameRegex)]],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(this.passwordPattern),
                ],
            ],
            mobileNumber: ['', [Validators.required]],
            countryId: ['', [Validators.required]]
        });
    }

    getAllCountries(): void {
        this.subscriptions.add(
            this.commonService.getAllCountries().subscribe(
                (response: ApiResponse) => {
                    if (response?.ok) {
                        this.countries = response.data;
                        this.registerFormControls.countryId.patchValue(
                            response.data[0]
                        );
                        if (response.data[0]?.countryPhoneCode === '+966') {
                            this.registerFormControls.mobileNumber.setValidators(
                                [
                                    Validators.minLength(9),
                                    Validators.maxLength(9),
                                    Validators.required
                                ]
                            );
                            this.registerFormControls.mobileNumber.updateValueAndValidity();
                        } else if (
                            response.data[0]?.countryPhoneCode === '+20'
                        ) {
                            this.registerFormControls.mobileNumber.setValidators(
                                [
                                    Validators.minLength(11),
                                    Validators.maxLength(11),
                                    Validators.required
                                ]
                            );
                            this.registerFormControls.mobileNumber.updateValueAndValidity();
                        }
                    }
                }
            )
        );
    }

    onSelectCountryCode(country: any): void {
        if (country?.countryPhoneCode === '+966') {
            this.registerFormControls.mobileNumber.setValidators([
                Validators.minLength(9),
                Validators.maxLength(9),
            ]);
        } else if (country?.countryPhoneCode === '+20') {
            this.registerFormControls.mobileNumber.setValidators([
                Validators.minLength(11),
                Validators.maxLength(11),
            ]);
        }
    }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // Login
        this.loading = true;
        this.subscriptions.add(
            this.authenticationService
                .registerCustomer({
                    ...this.registerForm.value,
                    countryId: this.registerForm.value.countryId?.id,
                    mobileNumber:
                        this.registerForm.value?.mobileNumber?.length === 9
                            ? this.registerForm.value.mobileNumber
                            : this.registerForm.value.mobileNumber.slice(1),
                })
                .pipe(finalize(() => this.loading = false))
                .subscribe(
                    (data) => {
                        if (data) {
                            let cartList = this.cookieService.get('cartList');
                            if (!cartList) {
                                this.cartListData.cartDetails = [];
                            } else {
                                this.cartListData = JSON.parse(cartList);
                            }
                            if (this.cartListData.cartDetails?.length) {
                                this.cartListData.cartDetails?.forEach(
                                    (product: any) => {
                                        this.cartService
                                            .updateCart(
                                                product.id,
                                                product.quantity
                                            )
                                            .subscribe((res) => {
                                                product.isInCart = true;
                                            });
                                    }
                                );
                            }
                            this.router.navigateByUrl(this.routingService.navigate('home'));

                            // let payload = {
                            //     email: this.registerForm.value.email,
                            //     password: this.registerForm.value.password,
                            // };

                            // this.authenticationService
                            //     .loginCustomer(payload)
                            //     .subscribe((data) => {
                            //         let cartList: any =
                            //             this.cookieService.get('cartList');
                            //         let cartListData = JSON.parse(cartList);
                            //         if (cartListData) {
                            //             cartListData.cartDetails?.forEach(
                            //                 (product: any) => {
                            //                     this.cartService
                            //                         .updateCart(product.id, product.quantity)
                            //                         .subscribe((res) => {
                            //                             product.isInCart = true;
                            //                         });
                            //                 }
                            //             );
                            //         }
                            //         this.router.navigate(['/']);
                            //     });
                        }
                    },
                    (error) => {
                        this.error = error.error.responseMessage;
                        this.loading = false;
                    }
                )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
