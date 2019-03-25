import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";

import {TokenInterceptor} from "./interceptors";
import {AuthGuard, NoAuthGuard, throwIfAlreadyLoaded} from "./guards";


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
