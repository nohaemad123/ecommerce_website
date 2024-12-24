import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { CategoryModalComponent } from './components/navbar/components/category-modal/category-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CategoryModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: []
})
export class CoreModule { }
