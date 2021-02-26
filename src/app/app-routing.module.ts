import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';
import { LoginComponent } from './auth/login/login.component';
import { BookReservationComponent } from './dashboard/book-reservation/book-reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'book-reservation',
    component: BookReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-book',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'update-book/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
