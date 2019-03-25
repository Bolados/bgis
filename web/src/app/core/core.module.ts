import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";

import {AuthGuard} from './guards/auth.guard';
import {NoAuthGuard} from './guards/no-auth.guard';

import {throwIfAlreadyLoaded} from './guards/utilities.guard';
import {TokenInterceptor} from "./interceptors";


@NgModule({
    imports: [
        HttpClientModule,
        NgxSpinnerModule
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
