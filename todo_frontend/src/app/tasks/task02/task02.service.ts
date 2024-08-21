import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[],
}

@Injectable()
export class Task02Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
  });


  public minValue$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        return Math.min(...store.randomNumbers)
      } else {
        return 0;
      }
    })
  )
  public maxValue$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        return Math.max(...store.randomNumbers)
      } else {
        return 0;
      }
    })
  )
  public avgValue$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        const sum = store.randomNumbers.reduce((acc, num) => acc + num, 0);
        return sum / store.randomNumbers.length
      } else {
        return 0;
      }
    })
  )

  public numbers$$:Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers)
  )

  public numbersCount$$: Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length)
  )

  public addRandomNumber(): void {
    const updateRandomNumbers: number[] = [...this._store.getValue().randomNumbers, this._getRandomNumber()];
    this._store.next({
      randomNumbers: updateRandomNumbers
    });
  }

  public getStoreValue() {
    return this._store.getValue();
  }

  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }

}
