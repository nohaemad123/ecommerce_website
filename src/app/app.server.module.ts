import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { translateServerLoaderFactory } from './translate-server.loader';
import { TransferState } from '@angular/platform-browser';
// import { TranslateInterceptor } from './translate.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieBackendModule } from 'ngx-cookie-backend';
import { CookieService } from 'ngx-cookie';
import { translateServerLoaderFactory } from './translate-server.loader';
import { TranslateInterceptor } from './translate.interceptor';
import { TranslationLoaderService } from './translate-loader.service';

export function translationInitializerFactory(translationLoaderService: TranslationLoaderService) {
  return () => translationLoaderService.loadTranslations([]);
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CookieBackendModule.withOptions(),
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TranslateInterceptor, multi: true },
    // { provide: CookieService, useClass: CookieBackendService }
    TranslationLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializerFactory,
      deps: [TranslationLoaderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(private translateLoaderService: TranslationLoaderService) {
    const translations = [
      // Import and add translations for different components here
      { lang: 'ar', data: require('../app/core/components/navbar/i18n/ar').locale },
      { lang: 'en', data: require('../app/core/components/navbar/i18n/en').locale },

      { lang: 'ar', data: require('../app/core/components/footer/i18n/ar').locale },
      { lang: 'en', data: require('../app/core/components/footer/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/addresses/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/addresses/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/authentication/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/authentication/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/cart/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/cart/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/checkout/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/checkout/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/layout/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/layout/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/order/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/order/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/product-details/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/product-details/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/products/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/products/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/profile-settings/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/profile-settings/i18n/en').locale },

      { lang: 'ar', data: require('../app/modules/wishlist/i18n/ar').locale },
      { lang: 'en', data: require('../app/modules/wishlist/i18n/en').locale }

      // Add translations for other components as needed
    ];

    this.translateLoaderService.loadTranslations(translations).then(() => {
      // Translations loaded successfully, continue with SSR setup
    });
  }
}
