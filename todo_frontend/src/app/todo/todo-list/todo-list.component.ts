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

  public toDoList$: Observable<ITodo[]> = this.service.getStoreTodo();

  constructor(private service: TodoService, private fb: FormBuilder) {
  }

  checkForm = this.fb.control({})

  ngOnInit(): void {
    this.service.fetchAllTodos().subscribe({
      next: () => {
        console.log('success');
      }
    });
  }

  deleteItem(id: string) {
    this.service.deleteTodo(id).subscribe({
      next: () => {
        console.log('deleted');
      }
    })
  }

  editItem(todo: ITodo) {
    this.service.updateEditStore$(todo)
    this.openModel.emit();
  }
  
  editCheckTodo() {
    console.log('check input');
  }
}
