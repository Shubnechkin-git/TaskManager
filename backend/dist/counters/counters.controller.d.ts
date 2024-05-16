import { DatabaseService } from 'src/database/database.service';
import { counterData } from 'src/interface/counterData';
export declare class CountersController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    createCounter(counterData: counterData): Promise<any>;
    getCounters(id: counterData): Promise<any>;
    updateCount(counterData: counterData): Promise<any>;
}
