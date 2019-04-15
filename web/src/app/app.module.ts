import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared";
import {CoreModule} from "./core";


@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [

      // angular
      BrowserModule,
      // core & shared
      SharedModule,
      CoreModule,
      // app
      AppRoutingModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
