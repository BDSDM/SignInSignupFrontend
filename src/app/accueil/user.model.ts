import { ToDo } from '../dashboard/todo.model';

export class User {
  id!: number;
  username!: string;
  password!: string;
  todos!: ToDo[];
}
