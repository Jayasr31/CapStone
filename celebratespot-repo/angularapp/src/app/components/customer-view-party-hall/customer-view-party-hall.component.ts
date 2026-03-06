import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyhallService } from '../../services/partyhall.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { PartyHall } from '../../models/partyhall.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-customer-view-party-hall',
  templateUrl: './customer-view-party-hall.component.html',
  styleUrls: ['./customer-view-party-hall.component.css']
})
export class CustomerViewPartyHallComponent implements OnInit {
  halls: PartyHall[] = [];
  filteredHalls: PartyHall[] = [];
  selectedHall: PartyHall | null = null;
  showBookingModal = false;
  successMsg = '';
  errorMsg = '';
  isLoading = true;
  currentImageIndex = 0;

  // Filters
  searchQuery = '';
  maxPrice = 200000;
  minCapacity = 0;
  filterLocation = '';
  filterTheme = '';
  filterStatus = '';

  // Booking form
  booking: Booking = {
    noOfPersons: 1,
    fromDate: '',
    toDate: '',
    status: 'Pending',
    totalPrice: 0,
    address: '',
    userId: 0,
    partyHallId: 0
  };

  constructor(
    private hallService: PartyhallService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(): void {
    this.isLoading = true;
    this.hallService.getAllPartyHalls().subscribe({
      next: (halls) => {
        this.halls = halls;
        this.filteredHalls = halls;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  applyFilters(): void {
    this.filteredHalls = this.halls.filter(h => {
      const matchSearch = !this.searchQuery ||
        h.hallName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        h.hallLocation.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchPrice = h.price <= this.maxPrice;
      const matchCapacity = h.capacity >= this.minCapacity;
      const matchLocation = !this.filterLocation ||
        h.hallLocation.toLowerCase().includes(this.filterLocation.toLowerCase());
      const matchTheme = !this.filterTheme || (h.theme || '').toLowerCase().includes(this.filterTheme.toLowerCase());
      const matchStatus = !this.filterStatus || h.hallAvailableStatus === this.filterStatus;
      return matchSearch && matchPrice && matchCapacity && matchLocation && matchTheme && matchStatus;
    });
  }

  openBookingModal(hall: PartyHall): void {
    this.selectedHall = hall;
    this.booking = {
      noOfPersons: 1,
      fromDate: '',
      toDate: '',
      status: 'Pending',
      totalPrice: 0,
      address: '',
      userId: this.authService.getUserId(),
      partyHallId: hall.partyHallId
    };
    this.showBookingModal = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.currentImageIndex = 0;
  }

  closeModal(): void {
    this.showBookingModal = false;
    this.selectedHall = null;
  }

  calculatePrice(): void {
    if (this.booking.fromDate && this.booking.toDate && this.selectedHall) {
      const from = new Date(this.booking.fromDate);
      const to = new Date(this.booking.toDate);
      const days = Math.max(1, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
      this.booking.totalPrice = days * this.selectedHall.price;
    }
  }

  submitBooking(): void {
    if (!this.booking.fromDate || !this.booking.toDate || !this.booking.address) {
      this.errorMsg = 'Please fill all required fields.';
      return;
    }
    this.errorMsg = '';
    this.bookingService.addBooking(this.booking).subscribe({
      next: () => {
        this.successMsg = 'Booking confirmed! We will contact you shortly.';
        setTimeout(() => this.closeModal(), 2000);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Booking failed. Please try again.';
      }
    });
  }

  getAdditionalImages(hall: PartyHall): string[] {
    try {
      return hall.additionalImages ? JSON.parse(hall.additionalImages) : [];
    } catch { return []; }
  }

  nextImage(images: string[]): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
  }

  prevImage(images: string[]): void {
    const total = images.length;
    this.currentImageIndex = (this.currentImageIndex - 1 + total) % total;
  }
}
