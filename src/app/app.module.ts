import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{JsonService} from './json.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
