import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Test2LayoutComponent} from '../layouts/test2-layout/test2-layout/test2-layout.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: '',
        // component: AreaAdminComponent,
        children: [
            {
                path: 'login',
                loadChildren: './login/login.module#LoginModule',
                data: {breadcrumb: 'login'}
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                // canLoad: [AuthGuardService]
                data: {breadcrumb: 'Dashboard'}
            },
            {
                path: 'store',
                loadChildren: './store/store.module#StoreModule',
                // canLoad: [AuthGuardService]
                data: {breadcrumb: 'Store'}
            },
            {
                path: 'about',
                component: Test2LayoutComponent,
                data: {breadcrumb: 'About'}
            },
            {
                path: 'github',
                data: {breadcrumb: 'GitHub'},
                children: [
                    {
                        path: '',
                        component: Test2LayoutComponent
                    },
                    {
                        path: 'org',
                        data: {breadcrumb: 'Organisation'},

                        children: [
                            {
                                path: '',
                                component: Test2LayoutComponent
                            },
                            {
                                path: 'repo',
                                component: Test2LayoutComponent,
                                data: {breadcrumb: 'Repo'}
                            }
                        ]
                    }
                ],
            },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaAdminRoutingModule {
}
