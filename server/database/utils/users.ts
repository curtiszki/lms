import { DatabaseResult } from "database/defines/types"
import {type Client, type DatabaseError} from "pg";
import { schemaNames } from "database/defines/schemaConfig";

export class DatabaseUser {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.findUser = this.findUser.bind(this);
    }
    // Create a user profile
    public async createUser(client: Client, username: string) : Promise<DatabaseResult> {
        const query =
        `
            INSERT INTO ${schemaNames.USER_ACCOUNT.TABLE_NAME} (${schemaNames.USER_ACCOUNT.USERNAME}) VALUES ('${username}');
        `;
        try {
            await client.query(query);
            return DatabaseResult.SUCCESS;
        }
        catch (error: unknown) {
            const e = error as DatabaseError;
            console.log('Error handling query: ' + query);
            if (e.code == '23505') {
                console.log('Duplicate Key');
            }
            else {
                console.log('Error handling request.')
            }
            return DatabaseResult.FAILURE;
        }
    };

    public async findUser(client: Client, username: string) : Promise<DatabaseResult>  {
        const query =  
        `   
            SELECT (${schemaNames.USER_ACCOUNT.ID}) FROM ${schemaNames.USER_ACCOUNT.TABLE_NAME}
            WHERE '${username}' IN (${schemaNames.USER_ACCOUNT.USERNAME})
        `;
        try {
            return (await client.query(query).then((result) => {
                return (result['rowCount'] == 0 ? DatabaseResult.FAILURE : DatabaseResult.SUCCESS);
            }));
        } catch (e: unknown) {
            return DatabaseResult.ERROR;
        }
    } 
}