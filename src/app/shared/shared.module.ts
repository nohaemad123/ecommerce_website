import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { TabsModule } from 'ngx-tabset';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { AccordionModule } from 'ngx-accordion';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCardOneComponent } from './components/product-card-one/product-card-one.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { NotifierModule } from 'angular-notifier';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';


@NgModule({
  declarations: [
    CustomCurrencyPipe,
    ProductCardOneComponent,
    SubscribeComponent,
    ProductsSliderComponent,
    AddressCardComponent,
    AddressFormComponent,
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxScrollTopModule,
    TabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    AccordionModule,
    NgxSliderModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 12,
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10,
        },
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    }),
    NgxPaginationModule,
    CarouselModule,
    TranslateModule
  ],
  exports: [
    CustomCurrencyPipe,
    NgxScrollTopModule,
    TabsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    AccordionModule,
    NgxSliderModule,
    HttpClientModule,
    MarkdownModule,
    NgxPaginationModule,
    CarouselModule,
    ProductCardOneComponent,
    TranslateModule,
    SubscribeComponent,
    NotifierModule,
    AddressCardComponent,
    AddressFormComponent,
    EmptyStateComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
