import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-admin-view-booking',
  templateUrl: './admin-view-booking.component.html',
  styleUrls: ['./admin-view-booking.component.css']
})
export class AdminViewBookingComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  successMsg = '';
  errorMsg = '';
  statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void { this.loadBookings(); }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (data) => { this.bookings = data; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  updateStatus(booking: Booking, newStatus: string): void {
    const updated = { ...booking, status: newStatus };
    this.bookingService.updateBooking(updated).subscribe({
      next: () => {
        booking.status = newStatus;
        this.successMsg = 'Booking status updated!';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Update failed.'; }
    });
  }

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
