import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'is_authenticated';
  private isAuthenticated = false;
  constructor() {
    // À l'initialisation du service, vérifiez si l'utilisateur est authentifié en consultant le localStorage
    this.isAuthenticated = !!localStorage.getItem(this.AUTH_KEY);
  }

  login(): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
    this.isAuthenticated = true;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated = false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
