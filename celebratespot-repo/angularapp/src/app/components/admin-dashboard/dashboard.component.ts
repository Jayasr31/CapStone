import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `<app-home></app-home>`
})
export class AdminDashboardComponent {}

@Component({
  selector: 'app-customer-dashboard',
  template: `<app-home></app-home>`
})
export class CustomerDashboardComponent {}
