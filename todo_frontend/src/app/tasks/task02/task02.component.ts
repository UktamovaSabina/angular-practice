import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task02Service } from './task02.service';

@Component({
  selector: 'app-task02',
  templateUrl: './task02.component.html',
  styleUrls: ['./task02.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task02Service, CommonModule]
})
export class Task02Component {

  public numbersCount$: Observable<number> = this.store.numbersCount$$;
  public numbers$: Observable<number[]> = this.store.numbers$$;
  public minNum$: Observable<number> = this.store.minValue$$;
  public maxNum$: Observable<number> = this.store.maxValue$$;
  public avgNum$: Observable<number> = this.store.avgValue$$;

  constructor(private store: Task02Service) { }

  onClick(): void {
    this.store.addRandomNumber();
  }
}

