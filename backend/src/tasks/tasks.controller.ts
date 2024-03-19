// tasks.controller.ts

import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { VkUserData } from '../interface/vkUserData';

@Controller('tasks')
export class TasksController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async test(@Query('id') id: number): Promise<string> {
    return this.databaseService.getUser1(id);
  }

}
