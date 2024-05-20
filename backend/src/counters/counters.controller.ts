import { DatabaseService } from 'src/database/database.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { counterData } from 'src/interface/counterData';

@Controller('counters')
export class CountersController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('create_counter')
  async createCounter(@Body() counterData: counterData): Promise<any> {
    try {
      // console.log(taskData);

      const createCounter = await this.databaseService.createCounter(
        counterData.vk_id,
        counterData.title,
      );

      return {
        success: true,
        message: 'Счетчик создан!',
        data: createCounter,
      };
    } catch (err) {
      return { success: false, err: err, message: err.code };
    }
  }

  @Get('get')
  async getCounters(@Query() id: counterData): Promise<any> {
    console.log(id);
    const getCounters = await this.databaseService.getCounters(id['id']);
    return getCounters;
  }

  @Put('update_count')
  async updateCount(@Body() counterData: counterData): Promise<any> {
    try {
      const updateCount = await this.databaseService.updateCount(
        counterData.id,
        counterData.vk_id,
        counterData.count,
      );
      return {
        success: true,
        message: 'Количесвто обновленно!',
        data: updateCount,
      };
    } catch (err) {
      return { success: false, err: err, message: err.code };
    }
  }

  @Delete('delete_counter')
  async deleteCounter(@Query() counterData: counterData): Promise<any> {
    console.log(counterData);

    try {
      const deleteCounter = await this.databaseService.deleteCounter(
        counterData.id,
        counterData.vk_id,
      );
      return {
        success: true,
        message: 'Счетчик успешно удален!',
        data: deleteCounter,
      };
    } catch (err) {
      return { success: false, err: err, message: err.code };
    }
  }

  @Put('update_counter')
  async updateCounter(@Body() counterData: counterData): Promise<any> {
    console.log(counterData);

    try {
      const updateCounter = await this.databaseService.updateCounter(
        counterData.id,
        counterData.vk_id,
        counterData.title,
      );
      return {
        success: true,
        message: 'Счетчик успешно обновлен!',
        data: updateCounter,
      };
    } catch (err) {
      return { success: false, err: err, message: err.code };
    }
  }
}
