import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-customer-view-booking',
  templateUrl: './customer-view-booking.component.html',
  styleUrls: ['./customer-view-booking.component.css']
})
export class CustomerViewBookingComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  successMsg = '';
  errorMsg = '';
  showDeleteConfirm = false;
  deleteTargetId: number | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void { this.loadBookings(); }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getBookingsByUserId().subscribe({
      next: (data) => { this.bookings = data; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  confirmDelete(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteConfirm = true;
  }

  doDelete(): void {
    if (!this.deleteTargetId) return;
    this.bookingService.deleteBooking(this.deleteTargetId).subscribe({
      next: () => {
        this.successMsg = 'Booking cancelled successfully.';
        this.showDeleteConfirm = false;
        this.bookings = this.bookings.filter(b => b.bookingId !== this.deleteTargetId);
        this.deleteTargetId = null;
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Failed to cancel booking.'; }
    });
  }

  cancelDelete(): void { this.showDeleteConfirm = false; this.deleteTargetId = null; }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'badge-success';
      case 'pending':   return 'badge-warning';
      case 'cancelled': return 'badge-danger';
      case 'completed': return 'badge-info';
      default: return 'badge-info';
    }
  }
}
