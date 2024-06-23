import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from './todo.model';
import { Identity } from './identity.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/todos';
  private baseUrlIdentity = 'http://localhost:8080/api/identities';

  constructor(private http: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseUrl);
  }

  createToDo(username: string, todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(`${this.baseUrl}/${username}`, todo);
  }

  updateToDo(id: number, todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.baseUrl}/${id}`, todo);
  }

  deleteToDo(username: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${username}/${id}`);
  }
  getToDosByUser(username: string): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.baseUrl}/${username}`);
  }
  // Récupérer une identité par username
  getIdentityByUsername(username: string): Observable<Identity> {
    return this.http.get<Identity>(`${this.baseUrlIdentity}/${username}`);
  }

  // Créer une identité pour un utilisateur
  createIdentity(username: string, identity: Identity): Observable<Identity> {
    return this.http.post<Identity>(
      `${this.baseUrlIdentity}/${username}`,
      identity
    );
  }

  // Mettre à jour une identité par username
  updateIdentity(username: string, identity: Identity): Observable<Identity> {
    return this.http.put<Identity>(
      `${this.baseUrlIdentity}/${username}`,
      identity
    );
  }

  // Supprimer une identité par username
  deleteIdentity(username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlIdentity}/${username}`);
  }
}
