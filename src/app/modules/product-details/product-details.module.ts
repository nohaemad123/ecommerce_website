import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CoreModule } from 'src/app/core/core.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RelatedProductsComponent } from './pages/product-details/related-products/related-products.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
    declarations: [ProductDetailsComponent, RelatedProductsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        CoreModule,
        ProductDetailsRoutingModule,
        SharedModule,
        NgxImageZoomModule
    ],
})
export class ProductDetailsModule {}
