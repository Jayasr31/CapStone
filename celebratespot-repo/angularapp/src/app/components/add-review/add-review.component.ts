import { Component, OnInit } from '@angular/core';
import { PartyhallService } from '../../services/partyhall.service';
import { AuthService } from '../../services/auth.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  review: Review = {
    userId: 0,
    subject: '',
    body: '',
    rating: 5,
    dateCreated: new Date().toISOString()
  };

  myReviews: Review[] = [];
  hoverRating = 0;
  successMsg = '';
  errorMsg = '';
  isLoading = false;
  isAdmin = false;
  allReviews: Review[] = [];

  constructor(private hallService: PartyhallService, private authService: AuthService) {}

  ngOnInit(): void {
    this.review.userId = this.authService.getUserId();
    this.isAdmin = this.authService.getUserRole() === 'Admin';
    if (this.isAdmin) {
      this.loadAllReviews();
    } else {
      this.loadMyReviews();
    }
  }

  loadMyReviews(): void {
    this.hallService.getReviewsByUserId().subscribe({
      next: (reviews) => { this.myReviews = reviews; },
      error: () => {}
    });
  }

  loadAllReviews(): void {
    this.hallService.getAllReviews().subscribe({
      next: (reviews) => { this.allReviews = reviews; },
      error: () => {}
    });
  }

  setRating(r: number): void { this.review.rating = r; }

  submitReview(): void {
    if (!this.review.subject || !this.review.body) {
      this.errorMsg = 'Subject and review body are required.';
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';
    this.review.dateCreated = new Date().toISOString();

    this.hallService.addReview(this.review).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = 'Review submitted successfully! Thank you for your feedback.';
        this.review = { userId: this.authService.getUserId(), subject: '', body: '', rating: 5, dateCreated: new Date().toISOString() };
        this.loadMyReviews();
        setTimeout(() => this.successMsg = '', 4000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Failed to submit review.';
      }
    });
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }
}
