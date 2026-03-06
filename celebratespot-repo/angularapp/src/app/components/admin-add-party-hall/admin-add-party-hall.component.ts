import { Component } from '@angular/core';
import { PartyhallService } from '../../services/partyhall.service';
import { PartyHall } from '../../models/partyhall.model';

@Component({
  selector: 'app-admin-add-party-hall',
  templateUrl: './admin-add-party-hall.component.html',
  styleUrls: ['./admin-add-party-hall.component.css']
})
export class AdminAddPartyHallComponent {
  hall: PartyHall = {
    hallName: '',
    hallImageUrl: '',
    hallLocation: '',
    hallAvailableStatus: 'Available',
    price: 0,
    capacity: 0,
    description: '',
    theme: '',
    additionalImages: ''
  };

  additionalImagesInput = '';
  successMsg = '';
  errorMsg = '';
  isLoading = false;

  themes = ['Royal', 'Modern', 'Garden', 'Classic', 'Luxury', 'Rustic', 'Beach', 'Industrial'];

  constructor(private hallService: PartyhallService) {}

  onSubmit(): void {
    if (!this.hall.hallName || !this.hall.hallLocation || !this.hall.price || !this.hall.capacity) {
      this.errorMsg = 'Please fill all required fields.';
      return;
    }

    // Parse additional images
    if (this.additionalImagesInput) {
      const urls = this.additionalImagesInput.split('\n').map(u => u.trim()).filter(u => u);
      this.hall.additionalImages = JSON.stringify(urls);
    }

    this.isLoading = true;
    this.errorMsg = '';

    this.hallService.addPartyHall(this.hall).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = `"${this.hall.hallName}" has been added successfully!`;
        this.resetForm();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Failed to add party hall.';
      }
    });
  }

  resetForm(): void {
    this.hall = {
      hallName: '', hallImageUrl: '', hallLocation: '',
      hallAvailableStatus: 'Available', price: 0, capacity: 0,
      description: '', theme: '', additionalImages: ''
    };
    this.additionalImagesInput = '';
  }
}
