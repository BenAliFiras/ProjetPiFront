import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AddPostComponent } from './add-post/add-post.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModalReclamationComponent } from './modal-reclamation/modal-reclamation.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReservationArchivePageComponent } from './reservation-archive-page/reservation-archive-page.component';
import { AuthGuard } from './auth.guard';
import { FormreclamationComponent } from './formreclamation/formreclamation.component';
import { UserComponent } from './user/user.component';

export const Approutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password/:token', component: ResetpasswordComponent },
  { path: 'request', component: ResetPasswordRequestComponent },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
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
      { path: 'add-post', component:AddPostComponent,canActivate: [AuthGuard]},

      { path: 'post/details', component: DetailsPostComponent,canActivate: [AuthGuard] },
      { path: 'post/update/:idPost', component: UpdatePostComponent,canActivate: [AuthGuard] },

      { path: 'reservation', component:ReservationPageComponent,canActivate: [AuthGuard]},
      { path: 'reservationArchive', component:ReservationArchivePageComponent,canActivate: [AuthGuard]},

      { path: 'users', component: UsersListComponent,canActivate: [AuthGuard] },
      { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard] },
      { path: 'user/:id', component: UserComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];
