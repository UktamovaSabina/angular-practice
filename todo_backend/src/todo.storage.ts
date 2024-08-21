import { Injectable } from '@nestjs/common';
import { randomString } from './utils/random-string';

export interface ITodoStorageItem {
  id: string;
  text: string;
  isDone: boolean;
  createdOn: string;
}

export interface IAddTodo {
  text: string;
  isDone: boolean;
}

export interface IUpdateTodo {
  id: string;
  text: string;
  isDone: boolean;
}

@Injectable()
export class TodoStorage {
  private _store: ITodoStorageItem[] = [
    {
      id: randomString(),
      text: 'note 1',
      createdOn: '2022-06-10T16:16:00.237Z',
      isDone: false,
    },
    {
      id: randomString(),
      text: 'note 2',
      createdOn: '2022-06-11T14:16:00.237Z',
      isDone: true,
    }
  ];

  public getTodos(): ITodoStorageItem[] {
    return this._store;
  }

  public addTodo(todo: IAddTodo): ITodoStorageItem {
    const itemToAdd: ITodoStorageItem = {
      id: randomString(),
      text: todo.text,
      isDone: todo.isDone,
      createdOn: new Date().toISOString()
    };
    this._store.push(itemToAdd);
    return itemToAdd;
  }

  public updateTodo(todo: IUpdateTodo): ITodoStorageItem {
    const itemToUpdate = this._store.find(x => x.id === todo.id);
    if (itemToUpdate != null) {
      itemToUpdate.text = todo.text;
      itemToUpdate.isDone = todo.isDone;
    }
    return itemToUpdate;
  }

  public deleteTodo(id: ITodoStorageItem['id']): void {
    this._store = this._store.filter(x => x.id !== id);
  }
}
