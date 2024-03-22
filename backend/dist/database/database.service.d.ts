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
    createTask(vk_id: any, title: any, description: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    getTasks(id: any): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
}
