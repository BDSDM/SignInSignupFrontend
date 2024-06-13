import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/todos';

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
}
