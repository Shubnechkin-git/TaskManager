// tasks.controller.ts

import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { DatabaseService } from 'src/database/database.service';
import { VkUserData } from '../interface/vkUserData';
import { taskData } from 'src/interface/taskData';

@Controller('tasks')
export class TasksController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async test(@Query('id') id: number): Promise<string> {
    return this.databaseService.getUser1(id);
  }

  @Post('upload_image')
  async uploadImage(@Body() file: any): Promise<any> {
    // console.log(file.data.id_task);

    try {
      const insertImage = await this.databaseService.insertImageTask(
        file.data.file,
        // file.data.id,
        file.data.id_task,
      );
      try {
        console.log(insertImage);
        // const getImage = await this.databaseService.getImageTask(
        //   insertImage['insertId'],
        // );
        // return {
        //   image: getImage[0].image,
        //   success: true,
        //   message: 'Изображение выведенно!',
        // };
      } catch (error) {
        return {
          success: false,
          message: 'Изображение не выведено!',
          error: error.message,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  @Post('create_task')
  async createTask(@Body() taskData: taskData): Promise<any> {
    try {
      // console.log(taskData);

      const createTask = await this.databaseService.createTask(
        taskData.vk_id,
        taskData.title,
        taskData.description,
      );
      return {
        success: true,
        message: 'Задача создана!',
        data: createTask,
      };
    } catch (err) {
      return { success: false, err: err };
    }
  }

  @Get('get')
  async getTask(@Query() id: VkUserData): Promise<any> {
    // console.log(id.id);
    const getTasks = await this.databaseService.getTasks(id.id);
    return getTasks;
  }
}
