import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: './area-website/area-website.module#AreaWebsiteModule'
    },
    {
        path: 'admin',
        loadChildren: './area-admin/area-admin.module#AreaAdminModule'
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            {
                useHash: true,
                scrollPositionRestoration: 'enabled',
            })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
