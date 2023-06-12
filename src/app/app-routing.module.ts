import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'add-post', component:AddPostComponent},
      { path: 'reservation', component:ReservationPageComponent},
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
