import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: 'todo-add.component.html',
  styleUrls: ['todo-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoAddComponent {

  constructor(private fb: FormBuilder, private todoService: TodoService, private cdr: ChangeDetectorRef) {
  }

  todoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
    isDone: [false]
  });

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoService.addTodo({ text: this.todoForm?.value.text, isDone: this.todoForm.value.isDone }).subscribe({
        next: () => {
          this.todoService.fetchAllTodos();
          this.todoForm.reset({
            text: '',
            isDone: false
          });
          this.cdr.markForCheck();
        }
      })
    }
  }
}
