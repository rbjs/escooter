import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeeplinkRoutingModule } from './deeplink-routing.module';
import { DeeplinkComponent } from './deeplink.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DeeplinkComponent
  ],
  imports: [
    CommonModule,
    DeeplinkRoutingModule,
    MatButtonModule
  ]
})
export class DeeplinkModule { }
