import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SandboxRoutingModule } from './sanbox-routing.module';
import { SummerSaleComponent } from './common/summer-sale/summer-sale.component';
import { SubscribeComponent } from './common/subscribe/subscribe.component';
import { PopularProductsComponent } from './common/popular-products/popular-products.component';
import { PartnerComponent } from './common/partner/partner.component';
import { FacilityComponent } from './common';
import { DealsOfTheDayComponent } from './common/deals-of-the-day/deals-of-the-day.component';
import { BestSellersProductsComponent } from './common/best-sellers-products/best-sellers-products.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { TabsModule } from 'ngx-tabset';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { AccordionModule } from "ngx-accordion";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NotifierModule } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';
import { HomesevenBannerComponent } from './common/homeseven-banner/homeseven-banner.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { MyAccountPageComponent } from './common/my-account-page/my-account-page.component';
import { CartPageComponent } from './common/cart-page/cart-page.component';
import { SideContentComponent } from './common/side-content/side-content.component';
// import { CheckoutPageComponent } from './common/checkout-page/checkout-page.component';
import { ProductsDetailsPageComponent } from './products-details-page/products-details-page.component';
import { ShopByCategoriesComponent } from './common/shop-by-categories/shop-by-categories.component';
import { ShopLeftSidebarPageTwoComponent } from './shop-left-sidebar-page-two/shop-left-sidebar-page-two.component';
import { OrderPagesComponent } from './order-pages/order-pages.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckoutMainPageComponent } from './checkoutMainPage/checkoutMainPage.component';
import { CategoryModalComponent } from './common/navbar/components/category-modal/category-modal.component';
@NgModule({
  declarations: [ 
    HomeComponent,
    ProductsDetailsPageComponent,
    SummerSaleComponent,
    SubscribeComponent,
    PopularProductsComponent,
    PartnerComponent,
    FacilityComponent,
    DealsOfTheDayComponent,
    BestSellersProductsComponent,
    HomesevenBannerComponent, 
    NavbarComponent,
    FooterComponent,
    MyAccountPageComponent,
    CartPageComponent,
    SideContentComponent,
    ShopByCategoriesComponent,
    ShopLeftSidebarPageTwoComponent,
    OrderPagesComponent,
    MyOrdersComponent,
    CheckoutMainPageComponent,
    CategoryModalComponent
   ],
  imports: [
    CommonModule,
    SandboxRoutingModule,
    CarouselModule,
    TabsModule,
    NgxScrollTopModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    AccordionModule,
    NgxSliderModule,
    NotifierModule,
    HttpClientModule,
    NgxPaginationModule,
    MarkdownModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: []
})
export class SandboxModule { }
