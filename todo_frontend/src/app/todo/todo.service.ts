import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface ITodo {
  id: string,
  text: string,
  isDone: boolean,
  createdOn?: string | undefined
}

@Injectable({ providedIn: 'root' })
export class TodoService {

  private storeTodos$ = new BehaviorSubject<ITodo[]>([]);
  private storeEditTodo$ = new BehaviorSubject<Partial<ITodo>>({
    id: '',
    text: '',
    isDone: false
  });

  private readonly todoUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  public fetchAllTodos = () => {
    this.http.get<ITodo[]>(this.todoUrl + "todos").subscribe({
      next: data => {
        this._updateStrore$(data)
      }
    })
  }

  public getTodos$$: Observable<ITodo[]> = this.storeTodos$.pipe(
    map((store) => {
      return store
    })
  )

  private _updateStrore$(todos: ITodo[]) {
    this.storeTodos$.next(todos)
  }

  public deleteTodo = (id: string) => {
    return this.http.delete(this.todoUrl + "delete/" + id)
  }

  public addTodo = (todo: Partial<ITodo>) => {
    return this.http.post(this.todoUrl + "add", todo)
  }

  public editTodo = (todo: Partial<ITodo>) => {
    return this.http.put(this.todoUrl + "update", todo)
  }

  public pushEditTodoStore(todo: ITodo) {
    this.storeEditTodo$.next(todo);
  }

  public getEditTodo() {
    return this.storeEditTodo$.getValue();
  }
}