import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AreaWebsiteRoutingModule} from './area-website-routing.module';
import {SharedModule} from '../shared';
import {CoreModule} from '../core';
import {TestLayoutComponent} from '../layouts/test-layout/test-layout.component';

@NgModule({
    declarations: [
        TestLayoutComponent,
    ],
    imports: [
        CommonModule,
        AreaWebsiteRoutingModule,
        SharedModule,
        CoreModule,
    ]
})
export class AreaWebsiteModule {
}
