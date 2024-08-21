import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task03Service } from './task03.service';

@Component({
  selector: 'app-task03',
  templateUrl: './task03.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task03Service]
})
export class Task03Component {
  public nums: Observable<number[]> = this.service.getStoreRandomNums()
  public numsCount$: Observable<number> = this.service.numsCount$$
  public minNum$: Observable<number> = this.service.minValue$$
  public maxNum$: Observable<number> = this.service.maxValue$$
  public avgNum$: Observable<number> = this.service.avgValue$$
  public isLoading$: Observable<boolean> = this.service.getStoreLoading();

  constructor(private service: Task03Service) { }

  onClick(): void {
    this.service.getRandomNum$().subscribe((randomNumber) => {
      console.log('Random Number Added:', randomNumber);
    });
  }
}
