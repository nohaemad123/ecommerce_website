import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { PagesWrapperModule } from '../pages-wrapper/pages-wrapper.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    WishlistRoutingModule,
    PagesWrapperModule,
    SharedModule
  ]
})
export class WishlistModule { }
