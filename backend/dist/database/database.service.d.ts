import * as mysql from 'mysql2/promise';
export declare class DatabaseService {
    constructor();
    private pool;
    private initializeDatabase;
    getDB(): Promise<string>;
    getUsers(): Promise<string>;
    getUser1(id: number): Promise<string>;
    insertUser(vkUserData: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    getImageTask(id_task: any): Promise<any>;
    insertImageTask(image: any, id_task: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    createTask(vk_id: any, title: any, description: any, image: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    createCounter(vk_id: any, title: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    getTasks(id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    getCounters(id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    updateCount(id: any, vk_id: any, count: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | "Повторите позже!">;
    deleteTask(id: any, vk_id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | "Повторите позже!">;
    doneTask(id: any, vk_id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket | "Повторите позже!">;
}
