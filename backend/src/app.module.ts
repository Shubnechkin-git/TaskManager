import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseService } from './database/database.service';
import { UserController } from './user/user.controller';

@Module({
  controllers: [AppController, DatabaseController, TasksController, UserController],
  providers: [AppService, DatabaseService],
  imports: [DatabaseModule, TasksModule],
})
export class AppModule {}
