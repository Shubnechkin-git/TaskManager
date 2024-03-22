import { DatabaseService } from 'src/database/database.service';
import { VkUserData } from '../interface/vkUserData';
export declare class UserController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getUsers(): Promise<string>;
    createUser(vkUserData: VkUserData): Promise<{
        success: boolean;
        message: string;
    }>;
}
