import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesWrapperRoutingModule } from './pages-wrapper-routing.module';
import { PagesWrapperComponent } from './pages/pages-wrapper/pages-wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BigBannerComponent } from './components/big-banner/big-banner.component';
import { SiteFeaturesComponent } from './components/site-features/site-features.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GroupSliderComponent } from './components/group-slider/group-slider.component';

@NgModule({
  declarations: [
    PagesWrapperComponent,
    HeaderComponent,
    BigBannerComponent,
    SiteFeaturesComponent,
    GroupSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PagesWrapperRoutingModule,
    SharedModule,
    CarouselModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: []
})
export class PagesWrapperModule { }
