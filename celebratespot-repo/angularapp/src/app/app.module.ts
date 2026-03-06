import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
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

// Pipes
import { StatusCountPipe } from './pipes/status-count.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    AdminAddPartyHallComponent,
    AdminViewPartyHallComponent,
    AdminViewBookingComponent,
    CustomerViewPartyHallComponent,
    CustomerViewBookingComponent,
    AddReviewComponent,
    DeveloperComponent,
    NotFoundComponent,
    StatusCountPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
