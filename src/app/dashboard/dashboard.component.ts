import { Component, Input } from '@angular/core';
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
  @Input() userId!: number;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.getToDosById();
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getToDos(): void {
    this.dashboardService.getToDos().subscribe((todos) => {
      this.todos = todos.filter((todo) => todo.userId === this.userId);
    });
  }
  getToDosById(): void {
    this.dashboardService
      .getToDosByUser(this.username)
      .subscribe((data: ToDo[]) => {
        this.todos = data;
      });
  }
  deleteToDo(id: number | undefined): void {
    if (id !== undefined) {
      this.dashboardService.deleteToDo(this.username, id).subscribe(() => {
        this.getToDosById();
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
    this.dashboardService.createToDo(this.username, newTodo).subscribe(() => {
      this.title = '';
      this.getToDosById();
    });
  }
  directToInfos() {
    this.router.navigate(['/identite']);
  }
}
