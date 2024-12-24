import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { DOCUMENT, Location, LocationStrategy, PathLocationStrategy, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './core/services/common.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { CartService } from './shared/services/cart.service';
import { NotifyService } from './core/services/notify.service';
import { CookieService } from 'ngx-cookie';
import { ApiResponse, MenuLink, StoreSettings } from './core/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit, OnDestroy {

    location: string;
    lang = environment.lang;
    menuLinks: MenuLink[] = [];
    storeSettings: StoreSettings;
    subscriptions = new Subscription();

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        private translateService: TranslateService,
        private renderer: Renderer2,
        private commonService: CommonService,
        private title: Title,
        private cartService: CartService,
        private notifier: NotifyService,
        private cookieService: CookieService,
        private authenticationService: AuthenticationService
    ) {
        this.getTenant();
    }

    ngOnInit(): void {
        this.checkStorageForLang();
        this.getStoreInfo();
        this.getStoreMenu();
        this.getStoreSettings();
        this.recallJsFunctions();
    }


    getTenant(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (document.location.host) {
                console.log('host', document.location.href.split('/')[3]);
                environment.tenant = document.location.href.split('/')[3];
                // if (!environment.tenant) {
                //    this.notifier.notifyError('Tenant Not Found');
                // }
            }
        }
    }

    getStoreInfo(): void {
        this.subscriptions.add(
            this.commonService.getStoreInfo().subscribe({
                next: (response: ApiResponse) => {
                    if (response?.ok) {
                        this.title.setTitle(response.data?.storeInfoLangDto?.name);
                        this.commonService.setStoreInfo(response.data);
                    }
                },
            })
        )
    }

    getStoreSettings(): void {
        this.subscriptions.add(
            this.commonService.getAllSettings().subscribe((response: ApiResponse) => {
                if (response.ok) {
                    this.storeSettings = response.data;
                    environment.storeSettings = response.data;
                }
            })
        )
    }

    getStoreMenu(): void {
        this.subscriptions.add(
            this.commonService.getStoreFooterMenu().subscribe((response: ApiResponse) => {
                if (response.ok) {
                    this.menuLinks = response.data;
                    environment.menuLinks = response.data;
                }
            })
        )
    }

    recallJsFunctions(): void {
        this.subscriptions.add(
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
                .subscribe(event => {
                    this.location = this.router.url;
                    if (!(event instanceof NavigationEnd)) {
                        return;
                    }
                    if (isPlatformBrowser(this.platformId)) {
                        window.scrollTo(0, 0);
                    }
                })
        )
    }

    checkStorageForLang(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.cookieService.get('lang')) {
                this.translateService.use(this.cookieService.get('lang')!);
                this.lang = this.cookieService.get('lang')!;
                environment['lang'] = this.lang;
                if (isPlatformBrowser(this.platformId)) {
                    this.document.documentElement.lang = this.lang;
                }
            } else {
                this.translateService.use(this.lang);
                this.cookieService.put('lang', this.lang);
                environment['lang'] = this.lang;
                if (isPlatformBrowser(this.platformId)) {
                    this.document.documentElement.lang = this.lang;
                }
            }
        }
        this.changeDir();
    }

    changeDir(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.lang === 'ar') {
                document.dir = 'rtl';
                this.document.documentElement.lang = 'ar';
            } else {
                document.dir = 'ltr';
                this.document.documentElement.lang = 'en';
            }
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
