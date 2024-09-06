import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: 'todo-add.component.html',
  styleUrls: ['todo-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoAddComponent {

  constructor(private fb: FormBuilder, private todoService: TodoService) { }

  todoForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
    isDone: [false]
  });

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: () => {
          this.todoForm.reset({
            text: '',
            isDone: false
          });
        }
      })
    }
  }
}
