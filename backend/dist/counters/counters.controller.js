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
exports.CountersController = void 0;
const database_service_1 = require("../database/database.service");
const common_1 = require("@nestjs/common");
let CountersController = class CountersController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async createCounter(counterData) {
        try {
            const createCounter = await this.databaseService.createCounter(counterData.vk_id, counterData.title);
            return {
                success: true,
                message: 'Счетчик создан!',
                data: createCounter,
            };
        }
        catch (err) {
            return { success: false, err: err, message: err.code };
        }
    }
    async getCounters(id) {
        console.log(id);
        const getCounters = await this.databaseService.getCounters(id['id']);
        return getCounters;
    }
    async updateCount(counterData) {
        try {
            const updateCount = await this.databaseService.updateCount(counterData.id, counterData.vk_id, counterData.count);
            return {
                success: true,
                message: 'Количесвто обновленно!',
                data: updateCount,
            };
        }
        catch (err) {
            return { success: false, err: err, message: err.code };
        }
    }
};
exports.CountersController = CountersController;
__decorate([
    (0, common_1.Post)('create_counter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountersController.prototype, "createCounter", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountersController.prototype, "getCounters", null);
__decorate([
    (0, common_1.Put)('update_count'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountersController.prototype, "updateCount", null);
exports.CountersController = CountersController = __decorate([
    (0, common_1.Controller)('counters'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CountersController);
//# sourceMappingURL=counters.controller.js.map