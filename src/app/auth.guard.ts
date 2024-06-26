import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    if (this.authService.getIsAuthenticated()) {
      if (this.authService.getUserRole() === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
