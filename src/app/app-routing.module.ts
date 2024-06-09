import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'lviv', pathMatch: 'full' },
  {
    path: 'lviv',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'deeplink',
    loadChildren: () =>
      import('./deeplink/deeplink.module').then((m) => m.DeeplinkModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
