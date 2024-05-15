import { DatabaseService } from './database.service';
export declare class DatabaseController {
    private readonly databaseService;
    private pool;
    constructor(databaseService: DatabaseService);
    private initializeDatabase;
    getDB(): Promise<string>;
    async(id: number): Promise<string>;
    getUser2(id: number): Promise<string>;
}