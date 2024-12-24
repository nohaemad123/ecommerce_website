import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
// import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
    {
        path: '',
        component: WishlistComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WishlistRoutingModule { }
