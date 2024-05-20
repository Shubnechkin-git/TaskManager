import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { VkUserData } from '../interface/vkUserData';

@Controller('user')
export class UserController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getUsers(): Promise<string> {
    return await this.databaseService.getUsers();
  }

  @Post('/create_user')
  async createUser(
    @Body() vkUserData: VkUserData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = this.databaseService.insertUser(vkUserData);
      if (result['affectedRows'] > 0) {
        return {
          success: true,
          message: `Пользователь с vk_id=${vkUserData['userInfo']['id']} успешно добавлен!`,
        };
      } else {
        return {
          success: false,
          message: `Пользователь с vk_id=${vkUserData['userInfo']['id']} уже существует!`,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Произошла ошибка при выполнении запроса',
      };
    }
  }
}
