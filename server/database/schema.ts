/* User -- Identifies the user
*  id (primary key)
*  username
*/
const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        user_id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
        username varchar(16) NOT NULL,
        PRIMARY KEY (id)
    );
`;

/*
*  Lookup table for passwords
*  id (Foreign key to user.id)
*  password
*/
const createUserData = `
CREATE TABLE IF NOT EXISTS userData (
    userdata_id uuid NOT NULL UNIQUE,
    password varchar(16) NOT NULL,
    FOREIGN KEY (userdata_id) references users(user_id)
);
`;

/*
* Storage container for each user
* storage_id (Primary Key)
* user_id (Foreign Key)
*/

const createStorage = `
CREATE TABLE IF NOT EXISTS storage (
    storage_id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`;

const createCollection = `
CREATE TABLE IF NOT EXISTS collection (
    collection_id uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    storage_id uuid NOT NULL UNIQUE,
    FOREIGN KEY (storage_id) REFERENCES storage(storage_id)
);
`;

const createStorageItem = `
CREATE TABLE IF NOT EXISTS storageItem (
    collection_id uuid NOT NULL UNIQUE,
    data JSON NOT NULL,
    FOREIGN KEY (collection_id) REFERENCES collection(collection_id) 
);
`;

import postgres from "postgres";
const export initializeTables = (sql : postgres.Sql<{}>) => {
    const create = await sql `${createUserTable} ${createUserData} ${createStorage} ${createCollection} ${createStorageItem}`
    console.log('Initialized tables.');
    return;
}