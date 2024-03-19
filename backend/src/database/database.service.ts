import { Injectable, Query } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
@Injectable()
export class DatabaseService {
  constructor() {
    this.initializeDatabase();
  }
  private pool: mysql.Pool;

  private initializeDatabase() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'task_manager',
      connectionLimit: 10, // Adjust as needed
    });
  }

  async getDB(): Promise<string> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    connection.release();

    return JSON.stringify(rows);
  }

  async getUsers(): Promise<string> {
    return 'Пользователи:';
  }

  async getUser1(@Query('id') id: number): Promise<string> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    connection.release();
    // http://localhost:3000/database/user/get_user?id=1
    return JSON.stringify(rows);
  }

  // Запись пользователя
  async insertUser(vkUserData) {
    const connection = await this.pool.getConnection();
    const [result] = await connection.execute(`
  INSERT INTO users (vk_id) 
  SELECT * FROM (SELECT ${vkUserData['userInfo']['id']}) AS tmp
  WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE vk_id = ${vkUserData['userInfo']['id']}
    )
    `);
    connection.release();
    return result;
  }
}
