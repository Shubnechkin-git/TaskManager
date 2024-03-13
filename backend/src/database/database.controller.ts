import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

// @Request, @Req — req;
// @Response, @Res — res;
// @Next — next;
// @Session — req.session;
// @Param(key?: string) — req.params / req.params[key];
// @Body(key?: string) — req.body / req.body[key];
// @Query(key?: string) — req.query / req.query[key];
// @Headers(name?: string) — req.headers / req.headers[name];
// @Ip — req.ip;
// @HostParam — req.hosts.

@Controller('database')
export class DatabaseController {
  private pool: mysql.Pool;

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'task_manager',
      connectionLimit: 10, // Adjust as needed
    });
  }

  @Get()
  async getDB(): Promise<string> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    connection.release();

    return JSON.stringify(rows);
  }

  @Get('user')
  async getUser1(@Query('id') id: number): Promise<string> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    connection.release();
    // http://localhost:3000/database/user?id=1
    return JSON.stringify(rows);
  }

  @Get('user/id/:id')
  async getUser2(@Param('id') id: number): Promise<string> {
    const connection = await this.pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    connection.release();
    // http://localhost:3000/database/user/id/1
    return JSON.stringify(rows);
  }
}
