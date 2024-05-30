import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccueilService } from './accueil.service';
import { User } from './user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private accueilService: AccueilService
  ) {}

  ngOnInit(): void {
    this.displayUsers();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  displayUsers() {
    this.accueilService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  deleteUser(id: number) {
    this.accueilService.deleteUser(id).subscribe(
      () => {
        // Supprimer l'utilisateur localement après une suppression réussie
        this.users = this.users.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('There was an error deleting the user!', error);
      }
    );
  }
}
