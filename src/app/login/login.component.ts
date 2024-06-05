// auth.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  usernameRegister: string = '';
  passwordRegister: string = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    const role = this.username;

    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        // Gérer la réponse de l'API
        if (response && response.message === 'Authentification réussie') {
          if (this.username === 'destin') {
            // Redirection vers la page HTML souhaitée
            this.authService.login(this.username, role);
            this.router.navigate(['/accueil']);
          } else {
            // Redirection vers la page HTML souhaitée
            this.authService.login(this.username, role);

            this.router.navigate(['/dashboard']);
          }
        }
      },

      (error) => {
        console.error(error);
      }
    );
  }
  onLoginSuccess() {
    this.router.navigate(['/acceuil']);
  }
  register(): void {
    this.loginService
      .register(this.usernameRegister, this.passwordRegister)
      .subscribe(
        (response) => {
          // Gérer la réponse de l'API
          this.passwordRegister = '';
          this.usernameRegister = '';
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
