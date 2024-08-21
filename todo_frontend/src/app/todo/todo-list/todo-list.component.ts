import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITodo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoListComponent implements OnInit {
  @Input() showModal!: boolean;
  @Output() openModel = new EventEmitter<void>();

  public toDoList$: Observable<ITodo[]> = this.todoService.getTodos$$;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
  }

  checkForm = this.fb.control({})

  ngOnInit(): void {
    this.todoService.fetchAllTodos();
  }

  deleteItem(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todoService.fetchAllTodos()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editItem(todo: ITodo) {
    this.openModel.emit();
    this.todoService.pushEditTodoStore(todo);
  }

  editCheckTodo() {
    console.log('check input');
  }
}
