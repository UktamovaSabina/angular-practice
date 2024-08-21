import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  styleUrls: ['./todo.component.scss'],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  showModal = false;

  constructor(private cdr: ChangeDetectorRef) { }

  handleCloseModal() {
    this.showModal = false;
    this.cdr.markForCheck()
  }

  handleOpenModal() {
    this.showModal = true;
    this.cdr.markForCheck()
  }
}
