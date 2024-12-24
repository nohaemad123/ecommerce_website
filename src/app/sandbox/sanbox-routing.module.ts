import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyAccountPageComponent } from './common/my-account-page/my-account-page.component';
import { CartPageComponent } from './common/cart-page/cart-page.component';
// import { CheckoutPageComponent } from './common/checkout-page/checkout-page.component';
import { CategoriesComponent } from './common/categories/categories.component';
import { ProductsDetailsPageComponent } from './products-details-page/products-details-page.component';
import { ShopLeftSidebarPageTwoComponent } from './shop-left-sidebar-page-two/shop-left-sidebar-page-two.component';
import { OrderPagesComponent } from './order-pages/order-pages.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckoutMainPageComponent } from './checkoutMainPage/checkoutMainPage.component';

const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'profile-authentication', component: MyAccountPageComponent},
    {path: 'cart', component: CartPageComponent},
    // {path: 'checkout', component: CheckoutPageComponent},
    {path: 'categories-m', component: CategoriesComponent},
    {path: 'products-details', component: ProductsDetailsPageComponent},
    {path: 'filter-page', component: ShopLeftSidebarPageTwoComponent},
    {path: 'order-page', component: OrderPagesComponent},
    {path: 'my-orders', component: MyOrdersComponent},
    {path:'checkout-page', component:CheckoutMainPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SandboxRoutingModule { }