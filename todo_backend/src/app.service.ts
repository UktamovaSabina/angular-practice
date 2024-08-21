import { Injectable } from '@nestjs/common';
import { TodoStorage } from './todo.storage';

@Injectable()
export class AppService {

  constructor(public todoStore: TodoStorage) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  checkCode(obj: { code: string }): { result: 'ok' | 'error' } {
    console.log(obj);
    if (obj == null) {
      return { result: 'error' };
    }
    if (obj.code !== '2145') {
      return { result: 'error' };
    }
    return { result: 'ok' };
  }

  checkLogin(obj: { login: string, password: string }): { result: 'ok' | 'error' } {
    if (obj == null) {
      return { result: 'error' };
    }

    if (obj.login === 'hursand' && obj.password === '1234') {
      return { result: 'ok' };
    }

    return { result: 'error' };
  }
}

