import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: ':tenant',
        loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: '**',
        loadChildren: () => import('./modules/pages-wrapper/pages-wrapper.module').then(m => m.PagesWrapperModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
