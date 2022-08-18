import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeeplinkComponent } from './deeplink.component';

const routes: Routes = [
  { path: ':brand', component: DeeplinkComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '/notfound', },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeeplinkRoutingModule { }
