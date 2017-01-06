import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    GoogleChart, AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
