import { DatabaseQuery } from "database/utils/users"
import client from "database/db";
import { schemaNames } from "database/defines/schemaConfig";
import { QueryResultRow } from "pg";
const user = new DatabaseQuery();
export const add_and_find_user = async () => {
    const name = 'Henry';
    //user.createUser(client, name);
    const result = await user.retrieveRow(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.USERNAME, name, schemaNames.USER_ACCOUNT.ID) as QueryResultRow;
    console.log(result);
}