import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { ProfilePasswordComponent } from './pages/profile-password/profile-password.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'info',
                component: ProfileInfoComponent
            },
            {
                path: 'password',
                component: ProfilePasswordComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileSettingsRoutingModule { }
