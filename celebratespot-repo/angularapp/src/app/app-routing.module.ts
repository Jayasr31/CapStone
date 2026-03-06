import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent, CustomerDashboardComponent } from './components/admin-dashboard/dashboard.component';
import { AdminAddPartyHallComponent } from './components/admin-add-party-hall/admin-add-party-hall.component';
import { AdminViewPartyHallComponent } from './components/admin-view-party-hall/admin-view-party-hall.component';
import { AdminViewBookingComponent } from './components/admin-view-booking/admin-view-booking.component';
import { CustomerViewPartyHallComponent } from './components/customer-view-party-hall/customer-view-party-hall.component';
import { CustomerViewBookingComponent } from './components/customer-view-booking/customer-view-booking.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  // Default - redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Shared protected routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'developer', component: DeveloperComponent },

  // Admin routes
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/add-party-hall', component: AdminAddPartyHallComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/view-party-hall', component: AdminViewPartyHallComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/view-booking', component: AdminViewBookingComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/reviews', component: AddReviewComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },

  // Customer routes
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
  { path: 'customer/halls', component: CustomerViewPartyHallComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
  { path: 'customer/bookings', component: CustomerViewBookingComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
  { path: 'customer/reviews', component: AddReviewComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },

  // 404
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
