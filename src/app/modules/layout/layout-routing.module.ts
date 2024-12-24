import { SandboxModule } from './../../sandbox/sandbox.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ContentLayoutComponent } from './pages/content-layout/content-layout.component';
import { ProfileLayoutComponent } from './pages/profile-layout/profile-layout.component';
// import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
    {
        path: '',
        component: ContentLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../modules/pages-wrapper/pages-wrapper.module').then(m => m.PagesWrapperModule)
            },
            {
                path: 'sandbox',
                loadChildren: () => import('../../sandbox/sandbox.module').then(m => m.SandboxModule)
            },
            {
                path: 'products',
                loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'product-details/:productId',
                loadChildren: () => import('../product-details/product-details.module').then(m => m.ProductDetailsModule)
            },
            {
                path: 'authentication',
                loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)
            },
            {
                path: 'checkout',
                canActivate: [AuthGuard],
                loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
            },
            {
                path: 'wishlist',
                canActivate: [AuthGuard],
                loadChildren: () => import('../wishlist/wishlist.module').then(m => m.WishlistModule)
            },
        ]
    },
    {
        path: 'profile',
        component: ProfileLayoutComponent,
        children: [
            {
                path: 'settings',
                loadChildren: () => import('../profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule)
            },
            {
                path: 'address',
                // canActivate: [AuthGuard],
                loadChildren: () => import('../addresses/addresses.module').then(m => m.AddressesModule)
            },
            {
                path: 'orders',
                // canActivate: [AuthGuard],
                loadChildren: () => import('../order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'wishlist',
                // canActivate: [AuthGuard],
                loadChildren: () => import('../wishlist/wishlist.module').then(m => m.WishlistModule)
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
