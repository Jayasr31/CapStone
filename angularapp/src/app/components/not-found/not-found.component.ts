import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div style="min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:2rem;">
      <div class="animate-fadeInUp">
        <div style="font-size:6rem; margin-bottom:1rem;">🎉</div>
        <h1 style="font-family:'Playfair Display',serif; font-size:5rem; background:linear-gradient(135deg,#D4AF37,#F5E8A0); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">404</h1>
        <h2 style="font-family:'Playfair Display',serif; color:#F0E8D5; margin-bottom:1rem;">Page Not Found</h2>
        <p style="color:#B8A98C; margin-bottom:2rem;">Looks like this page took an unplanned vacation!</p>
        <a routerLink="/login" class="btn-gold" style="display:inline-block;">Return Home</a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
