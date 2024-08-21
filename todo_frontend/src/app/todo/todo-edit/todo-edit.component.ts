import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: 'todo-edit.component.html',
  styleUrls: ['todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoEditComponent implements OnChanges {
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private service: TodoService, private fb: FormBuilder) {
  }

  editTodoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
    isDone: [false]
  });

  ngOnChanges(): void {
    this.editTodoForm.reset({
      text: this.service.getEditTodo().text,
      isDone: this.service.getEditTodo().isDone
    })
  }

  close() {
    this.closeModal.emit()
  }

  onEditSubmit() {
    this.service.editTodo({ ...this.service.getEditTodo(), text: this.editTodoForm.value.text }).subscribe({
      next: () => {
        this.service.fetchAllTodos()
      }
    });
    this.close();
  }
}
