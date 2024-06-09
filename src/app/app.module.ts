import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Не захаращуємо app.module, виносимо UI в окремий модуль
import { MaterialModule } from './shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

import { ScootersService } from './services/scooters.service';
import { ScootersInterceptor } from './services/scooters.interceptor';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';

@NgModule({
  declarations: [AppComponent, AboutComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgxGoogleAnalyticsModule.forRoot('G-9L74NSW2TB'),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [
    ScootersService,
    // { provide: HTTP_INTERCEPTORS, useClass: ScootersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
