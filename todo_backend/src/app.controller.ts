import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { IAddTodo, ITodoStorageItem, IUpdateTodo } from './todo.storage';

const randomNumsArray: number[] = [];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('checkCode')
  async checkCode(@Body() obj: { code: string }): Promise<{ result: 'ok' | 'error' }> {
    await this._sleep(2000);
    return this.appService.checkCode(obj);
  }

  @Post('checkLogin')
  async checkLogin(@Body() obj: { login: string, password: string }): Promise<{ result: 'ok' | 'error' }> {
    await this._sleep(2000);
    return this.appService.checkLogin(obj);
  }

  @Get('todos')
  async getTodos(): Promise<ITodoStorageItem[]> {
    return this.appService.todoStore.getTodos()
  }

  @Post('add')
  async addTodo(@Body() todo: IAddTodo): Promise<ITodoStorageItem> {
    return this.appService.todoStore.addTodo(todo);
  }

  @Put('update')
  async UpdateTodo(@Body() todo: IUpdateTodo): Promise<ITodoStorageItem> {
    return this.appService.todoStore.updateTodo(todo);
  }

  @Delete('delete/:id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    this.appService.todoStore.deleteTodo(id);
  }

  @Get('randomNumber')
  async getRandomNumber(): Promise<{ result: number }> {
    await this._sleep(2000);
    const result = Math.floor(Math.random() * 101);
    randomNumsArray.push(result);
    return { result };
  }

  @Get('randomNumberArray')
  async getRandomNumberArray(): Promise<{ result: number[] }> {
    return { result: randomNumsArray };
  }

  private _sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  }
}
