import { Injectable, Query } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as fs from 'fs';

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

  async getImageTask(id_task) {
    const connection = await this.pool.getConnection();

    const [result] = await connection
      .execute(`SELECT image FROM user_tasks WHERE id = ?`, id_task)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });

    connection.release();

    return result;
  }

  async insertImageTask(image, id_task) {
    const connection = await this.pool.getConnection();

    console.log(id_task);

    const [result] = await connection.execute(
      `UPDATE user_tasks SET image = '${image}' WHERE id = ${id_task}`,
      // 'INSERT INTO user_tasks (title,vk_id, image, description) VALUES (?,?, ?, ?)',
      // [
      //   'test',
      //   vk_id,
      //   image,
      //   new Date() +
      //     ' Cillum et adipisicing qui ea. Fugiat in non non cillum laborum amet aliqua. Nulla ex ea esse tempor in aute nisi enim id ipsum. Incididunt cupidatat commodo pariatur cillum. Non elit cillum eu qui Lorem ullamco ut.',
      // ],
    );

    connection.release();
    return result;
  }

  async createTask(vk_id, title, description, image) {
    const connection = await this.pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO user_tasks (vk_id, title, description, image) VALUES (?,?, ?, ?)',
      [vk_id, title, description, image],
    );
    result['task_count'] = await connection.execute(
      `SELECT COUNT(vk_id) as 'count' FROM user_tasks WHERE vk_id = ${vk_id} GROUP BY vk_id`,
    );

    connection.release();
    return result;
  }

  async createCounter(vk_id, title) {
    const connection = await this.pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO user_counters (vk_id, title) VALUES (?,?)',
      [vk_id, title],
    );
    result['task_count'] = await connection.execute(
      `SELECT COUNT(vk_id) as 'count' FROM user_counters WHERE vk_id = ${vk_id} GROUP BY vk_id`,
    );

    connection.release();
    return result;
  }

  async getTasks(id) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT id,title, description, image FROM user_tasks WHERE vk_id = ? AND status LIKE 'waiting' ORDER BY created_at DESC`,
        [id], // Поместите vk_id в массив параметров
      );
      // console.log('result:', rows);
      return rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return null; // Вернуть null или другое значение по умолчанию в случае ошибки
    } finally {
      connection.release();
    }
  }

  async getCounters(id) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(
        `SELECT id,title, count FROM user_counters WHERE vk_id = ? AND status LIKE 'waiting' ORDER BY created_at DESC`,
        [id], // Поместите vk_id в массив параметров
      );
      // console.log('result:', rows);
      return rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return null; // Вернуть null или другое значение по умолчанию в случае ошибки
    } finally {
      connection.release();
    }
  }

  async updateCount(id, vk_id, count) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(
        `UPDATE user_counters SET count = ${count} WHERE id=${id} AND vk_id=${vk_id}`,
      );
      return rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return 'Повторите позже!'; // Вернуть null или другое значение по умолчанию в случае ошибки
    } finally {
      connection.release();
    }
  }

  async deleteTask(id, vk_id) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(
        `UPDATE user_tasks SET status = 'deleted' WHERE id=${id} AND vk_id=${vk_id}`,
      );
      // console.log('result:', rows);
      return rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return 'Повторите позже!'; // Вернуть null или другое значение по умолчанию в случае ошибки
    } finally {
      connection.release();
    }
  }

  async doneTask(id, vk_id) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(
        `UPDATE user_tasks SET status = 'done' WHERE id=${id} AND vk_id=${vk_id}`,
      );
      // console.log('result:', rows);
      return rows;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return 'Повторите позже!'; // Вернуть null или другое значение по умолчанию в случае ошибки
    } finally {
      connection.release();
    }
  }
}
