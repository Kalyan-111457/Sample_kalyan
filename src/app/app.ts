import { Component, OnInit, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('deploy-project-app');
  protected data = signal<any>(null);

  constructor() { }




  ngOnInit() {
    const url = `${environment.backendApiUrl}/api/data`;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(data => this.data.set(data))
      .catch(err => console.error('Error fetching data:', err));
  }
}
