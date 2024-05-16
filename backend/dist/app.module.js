"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_controller_1 = require("./database/database.controller");
const database_module_1 = require("./database/database.module");
const tasks_controller_1 = require("./tasks/tasks.controller");
const tasks_module_1 = require("./tasks/tasks.module");
const database_service_1 = require("./database/database.service");
const user_controller_1 = require("./user/user.controller");
const counters_controller_1 = require("./counters/counters.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController, database_controller_1.DatabaseController, tasks_controller_1.TasksController, user_controller_1.UserController, counters_controller_1.CountersController],
        providers: [app_service_1.AppService, database_service_1.DatabaseService],
        imports: [database_module_1.DatabaseModule, tasks_module_1.TasksModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map