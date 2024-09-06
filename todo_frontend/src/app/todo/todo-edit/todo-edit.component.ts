import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITodo, TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: 'todo-edit.component.html',
  styleUrls: ['todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoEditComponent implements OnChanges {
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  public editStore$: Observable<Partial<ITodo>> = this.service.getEditStoreTodo();
  public editTodoId: string = '';

  constructor(private service: TodoService, private fb: FormBuilder) {
  }

  editTodoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
    isDone: [false]
  });

  ngOnChanges(): void {
    this.editStore$.subscribe({
      next: (todo) => {
        this.editTodoForm.patchValue({
          text: todo.text,
          isDone: todo.isDone
        });
        if (todo.id) this.editTodoId = todo.id
      }
    })
  }

  close() {
    this.closeModal.emit()
  }

  onEditSubmit() {
    if (this.editTodoForm.valid) {
      const todoEditForm = {
        id: this.editTodoId,
        text: this.editTodoForm.value.text,
        isDone: this.editTodoForm.value.isDone
      }
      this.service.editTodo(todoEditForm).subscribe({
        next: () => {
          console.log('edited');
        }
      })
    }

    this.close();
  }
}
