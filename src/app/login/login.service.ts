// auth.service.ts

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/users'; // Mettez l'URL de votre backend ici

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, body, { headers });
  }

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http
      .post<any>(`${this.baseUrl}/register`, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      // Conflict error (utilisateur déjà existant)
      return throwError('Utilisateur déjà existant');
    } else {
      // Autres erreurs
      return throwError('Something went wrong. Please try again later.');
    }
  }
}
