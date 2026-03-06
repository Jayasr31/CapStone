import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PartyhallService } from '../../services/partyhall.service';
import { PartyHall } from '../../models/partyhall.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredHalls: PartyHall[] = [];
  stats = [
    { icon: '🏛️', value: '50+', label: 'Premium Venues' },
    { icon: '🎊', value: '10K+', label: 'Events Hosted' },
    { icon: '⭐', value: '4.9', label: 'Average Rating' },
    { icon: '🏙️', value: '15+', label: 'Cities Covered' }
  ];

  constructor(public authService: AuthService, private hallService: PartyhallService) {}

  ngOnInit(): void {
    this.hallService.getAllPartyHalls().subscribe({
      next: (halls) => {
        this.featuredHalls = halls.slice(0, 3);
      },
      error: () => {}
    });
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < rating ? '★' : '☆');
  }
}
