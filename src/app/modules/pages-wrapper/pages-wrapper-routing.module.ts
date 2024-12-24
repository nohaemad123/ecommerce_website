import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesWrapperComponent } from './pages/pages-wrapper/pages-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: PagesWrapperComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesWrapperRoutingModule { }
