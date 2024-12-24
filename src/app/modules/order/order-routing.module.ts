import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
    {
        path: '',
        component: OrderComponent
    },
    {
        path: 'order-details/:orderId',
        component: OrderDetailsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
