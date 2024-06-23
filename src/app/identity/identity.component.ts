import { Component, OnInit } from '@angular/core';
import { Identity } from '../dashboard/identity.model';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css'],
})
export class IdentityComponent implements OnInit {
  identity: Identity | null = null;
  newIdentity: Identity = {
    user: { username: '' },
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };
  username: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  fetchIdentity(): void {
    if (this.username.trim() !== '') {
      this.dashboardService.getIdentityByUsername(this.username).subscribe(
        (response) => {
          this.identity = response;
          this.successMessage = 'Identity fetched successfully';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error fetching identity:', error);
          this.identity = null;
          this.errorMessage = 'Identity not found';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please enter a username';
    }
  }

  createIdentity(): void {
    this.dashboardService
      .createIdentity(this.newIdentity.user.username, this.newIdentity)
      .subscribe(
        (response) => {
          this.successMessage = 'Identity created successfully';
          this.errorMessage = '';
          this.identity = response;
          this.newIdentity = {
            user: { username: '' },
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
          };
        },
        (error) => {
          console.error('Failed to create identity:', error);
          this.errorMessage = 'Failed to create identity';
          this.successMessage = '';
        }
      );
  }

  deleteIdentity(): void {
    if (this.identity) {
      this.dashboardService
        .deleteIdentity(this.identity.user.username)
        .subscribe(
          (response) => {
            this.successMessage = 'Identity deleted successfully';
            this.errorMessage = '';
            this.identity = null;
          },
          (error) => {
            console.error('Failed to delete identity:', error);
            this.errorMessage = 'Failed to delete identity';
            this.successMessage = '';
          }
        );
    }
  }
}
