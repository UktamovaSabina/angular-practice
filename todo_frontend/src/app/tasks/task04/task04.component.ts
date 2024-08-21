import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task04Service } from './task04.service';


@Component({
  selector: 'app-task04',
  templateUrl: './task04.component.html',
  styleUrls: ['./task04.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task04Service]
})
export class Task04Component {


  constructor() { }


}
