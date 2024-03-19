// tasks.module.ts

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service'; // Импортируем сервис базы данных

@Module({
  controllers: [UserController],
  providers: [DatabaseService], // Добавляем сервис базы данных в провайдеры
})
export class TasksModule {}
