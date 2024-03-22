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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let TasksController = class TasksController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async test(id) {
        return this.databaseService.getUser1(id);
    }
    async uploadImage(file) {
        try {
            const insertImage = await this.databaseService.insertImageTask(file.data.file, file.data.id_task);
            try {
                console.log(insertImage);
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Изображение не выведено!',
                    error: error.message,
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async createTask(taskData) {
        try {
            const createTask = await this.databaseService.createTask(taskData.vk_id, taskData.title, taskData.description);
            return {
                success: true,
                message: 'Задача создана!',
                data: createTask,
            };
        }
        catch (err) {
            return { success: false, err: err };
        }
    }
    async getTask(id) {
        const getTasks = await this.databaseService.getTasks(id.id);
        return getTasks;
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('upload_image'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('create_task'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map