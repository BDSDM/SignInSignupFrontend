import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'is_authenticated';
  private readonly USERNAME_KEY = 'username';
  private readonly ROLE_KEY = 'user_role';
  private isAuthenticated = false;
  private username: string = '';
  private userRole: string | null = null;

  constructor() {
    this.isAuthenticated = !!localStorage.getItem(this.AUTH_KEY);
    this.username = localStorage.getItem(this.USERNAME_KEY) || '';
    this.userRole = localStorage.getItem(this.ROLE_KEY);
  }

  login(username: string, role: string): void {
    localStorage.setItem(this.AUTH_KEY, 'true');
    localStorage.setItem(this.USERNAME_KEY, username);
    localStorage.setItem(this.ROLE_KEY, role);
    this.isAuthenticated = true;
    this.username = username;
    this.userRole = role;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.isAuthenticated = false;
    this.username = '';
    this.userRole = null;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated || !!localStorage.getItem(this.AUTH_KEY);
  }

  getUsername(): string {
    return this.username;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}
