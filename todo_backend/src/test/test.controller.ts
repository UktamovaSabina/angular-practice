import { Controller, Get, Post } from '@nestjs/common';

@Controller('test')
export class TestController {
  private _counter = 0;

  @Get()
  async getCounter(): Promise<{ counter: number }> {
    await this._sleep(2000);
    return { counter: this._counter };
  }

  @Post('increment')
  async increment(): Promise<void> {
    await this._sleep(2000);
    this._counter += 1;
  }

  @Post('decrement')
  async decrement(): Promise<void> {
    await this._sleep(2000);
    this._counter -= 1;
  }

  private _sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  }
}
