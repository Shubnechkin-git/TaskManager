import { DatabaseService } from 'src/database/database.service';
import { VkUserData } from '../interface/vkUserData';
import { taskData } from 'src/interface/taskData';
export declare class TasksController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    test(id: number): Promise<string>;
    uploadImage(file: any): Promise<any>;
    createTask(taskData: taskData): Promise<any>;
    deleteTask(id: number): Promise<any>;
    doneTask(id: number): Promise<any>;
    getTask(id: VkUserData): Promise<any>;
}
