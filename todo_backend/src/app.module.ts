import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoStorage } from './todo.storage';
import { TestController } from './test/test.controller';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService, TodoStorage],
})
export class AppModule {}
