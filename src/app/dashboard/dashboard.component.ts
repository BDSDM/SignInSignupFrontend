import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { ToDo } from './todo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title: string = '';
  username: string = '';
  todos: ToDo[] = [];
  todoAdded: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.getToDos();
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  getToDos(): void {
    this.dashboardService.getToDos().subscribe((todos) => (this.todos = todos));
  }
  deleteToDo(id: number | undefined): void {
    if (id !== undefined) {
      this.dashboardService.deleteToDo(id).subscribe(() => {
        this.getToDos();
      });
    } else {
      console.error('Todo ID is undefined.');
    }
  }
  addTodo(): void {
    const newTodo: ToDo = {
      title: this.title,
      completed: false,
      id: undefined,
    };
    this.dashboardService.createToDo(newTodo).subscribe(() => {
      this.title = '';
      this.getToDos();
    });
  }
}
