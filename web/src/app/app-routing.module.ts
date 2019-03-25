import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


// const routes: Routes = [
//     {
//         path: '',
//         redirectTo: '/auth/login',
//         pathMatch: 'full'
//     },
//     {
//         path: 'admin',
//         redirectTo: '/auth/login',
//         pathMatch: 'full'
//     },
//     {
//         path: '',
//         component: ContentLayoutComponent,
//         canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
//         children: CONTENT_ROUTES
//     },
//     {
//         path: 'auth',
//         component: AuthLayoutComponent,
//         loadChildren: './modules/auth/auth.module#AuthModule'
//     },
//     // Fallback when no prior routes is matched
//     { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
// ];

const routes: Routes = [
    {
        path: 'admin',
        // component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                // component: DashboardComponent},
            },
            {
                path: 'databases',
                // component: UserComponent
            },
            {
                path: 'countries',
                // component: RightsComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
