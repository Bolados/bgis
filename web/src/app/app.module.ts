import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core";
import {SharedModule} from "./shared";


@NgModule({
  declarations: [
      AppComponent,
      LoaderComponent
  ],
  imports: [
      // angular
    BrowserModule,
      // core & shared
      CoreModule,
      SharedModule,
      // app
      AppRoutingModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
