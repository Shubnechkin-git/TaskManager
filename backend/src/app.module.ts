import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';

@Module({
  imports: [],
  controllers: [AppController, DatabaseController],
  providers: [AppService],
})
export class AppModule {}
