import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

export interface ITodo {
  id: string,
  text: string,
  isDone: boolean,
  createdOn?: string | undefined
}

@Injectable({ providedIn: 'root' })
export class TodoService {

  private storeTodos$ = new BehaviorSubject<ITodo[]>([]);
  private storeEditTodo$ = new BehaviorSubject<Partial<ITodo>>({});

  private readonly todoUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  fetchAllTodos(): Observable<void> {
    return this.http.get<ITodo[]>(this.todoUrl + "todos").pipe(
      tap((todos) => this._updateStore$(todos)),
      map(() => void 0));
  }

  deleteTodo(id: string) {
    return this.http.delete(this.todoUrl + "delete/" + id).pipe(
      switchMap(() => this.fetchAllTodos()),
    )
  }

  addTodo(body: Partial<ITodo>) {
    return this.http.post(this.todoUrl + "add/", body).pipe(
      switchMap(() => this.fetchAllTodos()),
    )
  }

  editTodo = (body: Partial<ITodo>) => {
    return this.http.put(this.todoUrl + "update", body).pipe(
      switchMap(() => this.fetchAllTodos())
    )
  }

  getStoreTodo() {
    return this.storeTodos$.pipe(map((store) => {
      return store
    }))
  }

  getEditStoreTodo() {
    return this.storeEditTodo$.pipe(map((store) => {
      return store
    }))
  }

  private _updateStore$(todos: ITodo[]) {
    this.storeTodos$.next(todos)
  }

  public updateEditStore$(todo: ITodo) {
    this.storeEditTodo$.next(todo)
  }
}