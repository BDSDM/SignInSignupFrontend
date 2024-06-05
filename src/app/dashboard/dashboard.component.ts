import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  username: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
