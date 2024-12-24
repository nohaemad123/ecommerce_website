import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { PagesWrapperModule } from '../pages-wrapper/pages-wrapper.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsFilterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProductsRoutingModule,
    PagesWrapperModule,
    SharedModule,
    NgbModule
  ]
})
export class ProductsModule { }
