import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderCardComponent } from './components/order-card/order-card.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class OrderModule { }
