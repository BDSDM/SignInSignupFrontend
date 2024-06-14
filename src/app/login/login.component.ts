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
  newAccount = false;
  errorMessage: string = '';
  registeredWithSuccess = false;
  errorMessageConnexion: string = '';

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Charger l'état depuis le localStorage lors de l'initialisation
    const storedNewAccount = localStorage.getItem('showText');
    if (storedNewAccount !== null) {
      this.newAccount = JSON.parse(storedNewAccount);
    }
  }
  login(): void {
    const role = this.username;

    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        // Gérer la réponse de l'API
        if (response && response.message === 'Connexion réussie') {
          this.errorMessageConnexion = '';
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
        console.log('errrrrrrrrrrrrrrrrrrrrr' + error);

        console.error(error);
        this.errorMessageConnexion = error;
      }
    );
  }
  createNewAccount() {
    this.newAccount = !this.newAccount;
    localStorage.setItem('showText', JSON.stringify(this.newAccount));
  }
  signIn() {
    this.newAccount = !this.newAccount;
    localStorage.setItem('showText', JSON.stringify(this.newAccount));
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
          this.errorMessage = '';
          this.registeredWithSuccess = true;
        },
        (error) => {
          console.error(error);
          this.errorMessage = error;
          this.registeredWithSuccess = false;
        }
      );
  }
}
