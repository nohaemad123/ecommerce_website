import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { ContentLayoutComponent } from './pages/content-layout/content-layout.component';
import { ProfileLayoutComponent } from './pages/profile-layout/profile-layout.component';



@NgModule({
  declarations: [
    ContentLayoutComponent,
    ProfileLayoutComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
