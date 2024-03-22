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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UserController = class UserController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getUsers() {
        return await this.databaseService.getUsers();
    }
    async createUser(vkUserData) {
        try {
            const result = this.databaseService.insertUser(vkUserData);
            if (result['affectedRows'] > 0) {
                return {
                    success: true,
                    message: `Пользователь с vk_id=${vkUserData['userInfo']['id']} успешно добавлен!`,
                };
            }
            else {
                return {
                    success: false,
                    message: `Пользователь с vk_id=${vkUserData['userInfo']['id']} уже существует!`,
                };
            }
        }
        catch (error) {
            console.error(error);
            return {
                success: false,
                message: 'Произошла ошибка при выполнении запроса',
            };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/create_user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserController);
//# sourceMappingURL=user.controller.js.map