import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('deploy-project-app');
  protected data = signal<any>(null);

  constructor() {}

  ngOnInit() {
    const apiUrl = import.meta?.env?.VITE_API_URL ?? '';
    const url = apiUrl
  ? `${apiUrl}/api/data`
  : 'http://localhost:3000/api/data';
    fetch(url)
      .then(res => res.json())
      .then(data => this.data.set(data))
      .catch(err => console.error('Error fetching data:', err));
  }
}
