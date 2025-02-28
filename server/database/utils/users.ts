import { DatabaseResult } from "database/defines/types"
import {DatabaseError, QueryResult, QueryResultRow, type Client} from "pg";
import { schemaNames } from "database/defines/schemaConfig";

export class DatabaseQuery {
    // Create a user profile
    public async insertValues(client: Client, tableName: string, column: string[], values: string[]) : Promise<DatabaseResult> {
        const query =
        `
            INSERT INTO ${tableName} (${column}) VALUES (${values.map(value => {
                return  "'"+value+"'";
            }).join(',')});
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
            return DatabaseResult.ERROR;
        }
    };

    public async findValue(client: Client,  tableName: string, targetColumn: string, value: string, ...retrievedFields: string[]) : Promise<DatabaseResult>  {
        const query =  
        `   
            SELECT (${retrievedFields.join(',')}) FROM ${tableName}
            WHERE '${value}' IN (${targetColumn})
        `;
        try {
            return (await client.query(query).then((result) => {
                return (result['rowCount'] == 0 ? DatabaseResult.FAILURE : DatabaseResult.SUCCESS);
            }));
        } catch (e: unknown) {
            return DatabaseResult.ERROR;
        }
    }
    
    public async retrieveRow(client: Client,  tableName: string, targetColumn: string, value: string, ...retrievedFields: string[]) : Promise<QueryResultRow|DatabaseResult.ERROR>  {
        const query =  
        `   
            SELECT (${retrievedFields.join(',')}) FROM ${tableName}
            WHERE '${value}' IN (${targetColumn})
        `;
        try {
            return (await client.query(query).then((result) => {
                const row = result.rows[0];
                return row;
            }));
        } catch (e: unknown) {
            return DatabaseResult.ERROR;
        }
    }  

}