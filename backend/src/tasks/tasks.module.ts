// tasks.module.ts

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { DatabaseService } from 'src/database/database.service'; // Импортируем сервис базы данных

@Module({
  controllers: [TasksController],
  providers: [DatabaseService], // Добавляем сервис базы данных в провайдеры
})
export class TasksModule {}
