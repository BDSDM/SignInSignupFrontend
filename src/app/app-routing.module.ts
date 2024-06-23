import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardUser } from './authUser.guard';
import { IdentityComponent } from './identity/identity.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'identity', component: IdentityComponent },

  { path: 'identite', redirectTo: '/identity', pathMatch: 'full' },

  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'destin' },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardUser],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
