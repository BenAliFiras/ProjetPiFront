import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AddPostComponent } from './add-post/add-post.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const Approutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


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
        path: 'dashboard/reclamations', component:ModalReclamationComponent
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

      { path: 'post/details', component: DetailsPostComponent },

      { path: 'reservation', component:ReservationPageComponent},
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
