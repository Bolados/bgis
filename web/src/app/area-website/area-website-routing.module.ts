import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestLayoutComponent} from '../layouts/test-layout/test-layout.component';

const routes: Routes = [

    {
        path: 'home',
        component: TestLayoutComponent,
        data: {breadcrumb: 'Home'}
    },
    {
        path: 'about',
        component: TestLayoutComponent,
        data: {breadcrumb: 'About'}
    },
    {
        path: 'github', data: {breadcrumb: 'GitHub'},
        children: [
            {
                path: '',
                component: TestLayoutComponent
            },
            {
                path: 'org',
                data: {
                    breadcrumb: 'Organisation'
                },
                children: [
                    {
                        path: '',
                        component: TestLayoutComponent
                    },
                    {
                        path: 'repo',
                        component: TestLayoutComponent,
                        data: {breadcrumb: 'Repo'}
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaWebsiteRoutingModule {
}
