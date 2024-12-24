import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesComponent } from './pages/addresses/addresses.component';

@NgModule({
  declarations: [
    AddressesComponent,
    // AddressCardComponent,
    // AddressFormComponent
  ],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class AddressesModule { }
