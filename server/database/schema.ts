import { schemaNames } from "./defines/schemaConfig";

// crypto to hash inputs
const intialization =
`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
`;

/* User -- Identifies the user
*  id (primary key)
*  username
*/

const createUserTable = `
    CREATE TABLE IF NOT EXISTS ${schemaNames.USER_ACCOUNT.TABLE_NAME} (
        ${schemaNames.USER_ACCOUNT.ID} uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
        ${schemaNames.USER_ACCOUNT.USERNAME} VARCHAR(${schemaNames.USERNAME_SIZE_LIMIT}) UNIQUE NOT NULL,
        PRIMARY KEY (${schemaNames.USER_ACCOUNT.ID})
    );
`;

/*
*  Lookup table for passwords
*  id (Foreign key to user.id)
*  password
*/
const createUserData = `
CREATE TABLE IF NOT EXISTS ${schemaNames.USER_DATA.TABLE_NAME} (
    ${schemaNames.USER_DATA.ID} uuid NOT NULL UNIQUE,
    ${schemaNames.USER_DATA.PASSWORD} text NOT NULL,
    FOREIGN KEY (${schemaNames.USER_DATA.ID}) references ${schemaNames.USER_ACCOUNT.TABLE_NAME}(${schemaNames.USER_ACCOUNT.ID})
);

CREATE OR REPLACE FUNCTION password_hash() RETURNS trigger AS $$
BEGIN
    IF tg_op = 'INSERT' THEN
        NEW.password = encode(digest(NEW.password, 'sha256'), 'hex');
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insert_password_hash
    BEFORE INSERT ON ${schemaNames.USER_DATA.TABLE_NAME}
    FOR EACH ROW EXECUTE PROCEDURE password_hash();
`;

/*
* Storage container for each user
* storage_id (Primary Key)
* user_id (Foreign Key)
*/

const createStorage = `
CREATE TABLE IF NOT EXISTS ${schemaNames.STORAGE.TABLE_NAME} (
    ${schemaNames.STORAGE.ID} uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    ${schemaNames.STORAGE.ID_REFERENCES_USER_ACCOUNT} uuid NOT NULL UNIQUE,
    FOREIGN KEY (${schemaNames.STORAGE.ID_REFERENCES_USER_ACCOUNT}) REFERENCES ${schemaNames.USER_ACCOUNT.TABLE_NAME}(${schemaNames.USER_ACCOUNT.ID})
);
`;

const createCollection = `
CREATE TABLE IF NOT EXISTS ${schemaNames.COLLECTION.TABLE_NAME} (
    ${schemaNames.COLLECTION.ID} uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    ${schemaNames.COLLECTION.ID_REFERENCES_STORAGE} uuid NOT NULL UNIQUE,
    FOREIGN KEY (${schemaNames.COLLECTION.ID_REFERENCES_STORAGE}) REFERENCES ${schemaNames.STORAGE.TABLE_NAME}(${schemaNames.STORAGE.ID})
);
`;

const createStorageItem = `
CREATE TABLE IF NOT EXISTS ${schemaNames.ITEM_CONTAINER.TABLE_NAME} (
    ${schemaNames.ITEM_CONTAINER.ID_REFERENCES_COLLECTION} uuid NOT NULL UNIQUE,
    ${schemaNames.ITEM_CONTAINER.JSON} JSON NOT NULL,
    FOREIGN KEY (${schemaNames.ITEM_CONTAINER.ID_REFERENCES_COLLECTION}) REFERENCES ${schemaNames.COLLECTION.TABLE_NAME}(${schemaNames.COLLECTION.ID}) 
);
`;

import {type Client} from "pg"
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const initializeTables = async (client: Client) => {
    try {
        const query = [
            intialization,
            createUserTable, 
            createUserData,
            createStorage,
            createCollection,
            createStorageItem].join('\n\t')
        await client.query(query)
    }
    catch (error : unknown) {
        console.log('An error occured while initializing the database...');
        console.log(error);
        return;
    }
    console.log('Initialized tables.');
    return;
}