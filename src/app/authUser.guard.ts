import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardUser implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    if (
      this.authService.getIsAuthenticated() &&
      this.authService.getUserRole() != 'destin'
    ) {
      return true;
    } else {
      this.router.navigate(['/accueil']);
      return false;
    }
  }
}
