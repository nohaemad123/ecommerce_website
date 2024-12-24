import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { PagesWrapperModule } from '../pages-wrapper/pages-wrapper.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { ProfilePasswordComponent } from './pages/profile-password/profile-password.component';


@NgModule({
    declarations: [
        ProfileInfoComponent,
        ProfilePasswordComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        ProfileSettingsRoutingModule,
        PagesWrapperModule,
        SharedModule
    ]
})
export class ProfileSettingsModule { }
