import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaAdminRoutingModule} from './area-admin-routing.module';
import {SharedModule} from '../shared';
import {CoreModule} from '../core';
import {Test2LayoutComponent} from '../layouts/test2-layout/test2-layout/test2-layout.component';
import {AreaAdminComponent} from './area-admin.component';

@NgModule({
    declarations: [
        Test2LayoutComponent,
        AreaAdminComponent,
    ],
    imports: [
        CommonModule,
        AreaAdminRoutingModule,
        SharedModule,
        CoreModule,
    ]
})
export class AreaAdminModule {
}
