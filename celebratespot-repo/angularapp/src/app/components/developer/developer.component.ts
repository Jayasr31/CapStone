import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  developers = [
    {
      name: 'Arjun Sharma',
      role: 'Full Stack Developer',
      description: 'Led the backend development using .NET WebAPI and Entity Framework Core. Designed RESTful APIs and JWT authentication system.',
      skills: ['C#', '.NET', 'SQL Server', 'Entity Framework'],
      avatar: 'AS',
      email: 'arjun.sharma@celebratespot.com',
      linkedin: '#',
      github: '#',
      emoji: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Frontend Developer',
      description: 'Built the Angular frontend with modern UI/UX principles. Crafted responsive and accessible components with smooth animations.',
      skills: ['Angular', 'TypeScript', 'CSS', 'HTML5'],
      avatar: 'PP',
      email: 'priya.patel@celebratespot.com',
      linkedin: '#',
      github: '#',
      emoji: '👩‍🎨'
    },
    {
      name: 'Rahul Mehta',
      role: 'Database Engineer',
      description: 'Designed the database schema and optimized SQL queries for performance. Managed data migrations and integrity constraints.',
      skills: ['MS SQL Server', 'T-SQL', 'Performance Tuning', 'EF Migrations'],
      avatar: 'RM',
      email: 'rahul.mehta@celebratespot.com',
      linkedin: '#',
      github: '#',
      emoji: '🗄️'
    },
    {
      name: 'Kavya Reddy',
      role: 'UI/UX Designer',
      description: 'Designed the overall user experience and visual identity of CelebrateSpot. Created wireframes, prototypes, and design system.',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      avatar: 'KR',
      email: 'kavya.reddy@celebratespot.com',
      linkedin: '#',
      github: '#',
      emoji: '🎨'
    }
  ];

  techStack = [
    { name: 'Angular 14', category: 'Frontend', icon: '🅰️' },
    { name: 'TypeScript', category: 'Frontend', icon: '📘' },
    { name: '.NET 6 WebAPI', category: 'Backend', icon: '⚙️' },
    { name: 'Entity Framework', category: 'ORM', icon: '🔗' },
    { name: 'MS SQL Server', category: 'Database', icon: '🗄️' },
    { name: 'JWT Auth', category: 'Security', icon: '🔐' },
    { name: 'REST APIs', category: 'Architecture', icon: '🌐' },
    { name: 'CSS3 Animations', category: 'Frontend', icon: '✨' },
  ];
}
