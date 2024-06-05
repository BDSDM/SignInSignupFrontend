import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'is_authenticated';
  private readonly USERNAME_KEY = 'username';
  private isAuthenticated = false;
  private username: string = '';
  private userRole: string | null = null;

  constructor() {
    // À l'initialisation du service, vérifiez si l'utilisateur est authentifié en consultant le localStorage
    this.isAuthenticated = !!localStorage.getItem(this.AUTH_KEY);
    this.username = localStorage.getItem(this.USERNAME_KEY) || '';
  }

  login(username: string, role: string): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
    localStorage.setItem(this.USERNAME_KEY, username);
    this.isAuthenticated = true;
    this.username = username;
    this.userRole = role;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    this.isAuthenticated = false;
    this.username = '';
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string {
    return this.username;
  }
  getUserRole(): string | null {
    return this.userRole;
  }
}
