import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface IStore {
  randomNumbers: number[],
  isHttpLoading: boolean
}

@Injectable()
export class Task03Service {

  private store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
    isHttpLoading: false
  });

  private readonly randomNumberUrl = 'http://localhost:3000/randomNumber';

  constructor(private http: HttpClient) { }

  public getRandomNum$() {
    this._updateStore(null, true);
    
    return this.http.get<{ result: number }>(this.randomNumberUrl).pipe(
      map((response) => response.result),
      tap((number) => {
        this._updateStore(number, false);
      })
    );
  }

  private _updateStore(number: number | null, loading: boolean | null) {
    let updateRandomNumbers: number[] | null = null;
    if (typeof number === 'number') {
      updateRandomNumbers = [...this.store.getValue().randomNumbers, number];
    }
    this.store.next({
      randomNumbers: updateRandomNumbers ? updateRandomNumbers : this.store.getValue().randomNumbers,
      isHttpLoading: loading === null ? this.store.getValue().isHttpLoading : loading
    });
  }

  public getStoreRandomNums(): Observable<number[]> {
    return this.store.pipe(map(d => d.randomNumbers));
  }
  public getStoreLoading(): Observable<boolean> {
    return this.store.pipe(map(d => d.isHttpLoading))
  }

  public minValue$$: Observable<number> = this.store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        return Math.min(...store.randomNumbers)
      } else {
        return 0;
      }
    })
  )
  public maxValue$$: Observable<number> = this.store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        return Math.max(...store.randomNumbers)
      } else {
        return 0;
      }
    })
  )
  public avgValue$$: Observable<number> = this.store.pipe(
    map((store) => {
      if (store.randomNumbers.length) {
        const sum = store.randomNumbers.reduce((acc, num) => acc + num, 0);
        return sum / store.randomNumbers.length
      } else {
        return 0;
      }
    })
  )
  public numsCount$$: Observable<number> = this.store.pipe(
    map((store) => {
      return store.randomNumbers.length
    })
  )
}
