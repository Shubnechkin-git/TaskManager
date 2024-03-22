"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let DatabaseService = class DatabaseService {
    constructor() {
        this.initializeDatabase();
    }
    initializeDatabase() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'task_manager',
            connectionLimit: 10,
        });
    }
    async getDB() {
        const connection = await this.pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users');
        connection.release();
        return JSON.stringify(rows);
    }
    async getUsers() {
        return 'Пользователи:';
    }
    async getUser1(id) {
        const connection = await this.pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        connection.release();
        return JSON.stringify(rows);
    }
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
        const [result] = await connection.execute(`UPDATE user_tasks SET image = '${image}' WHERE id = ${id_task}`);
        connection.release();
        return result;
    }
    async createTask(vk_id, title, description) {
        const connection = await this.pool.getConnection();
        const [result] = await connection.execute('INSERT INTO user_tasks (vk_id, title, description) VALUES (?,?, ?)', [vk_id, title, description]);
        connection.release();
        return result;
    }
    async getTasks(id) {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute(`SELECT id,title, description, image FROM user_tasks WHERE vk_id = ?`, [id]);
            return rows;
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
            return null;
        }
        finally {
            connection.release();
        }
    }
};
exports.DatabaseService = DatabaseService;
__decorate([
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DatabaseService.prototype, "getUser1", null);
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map