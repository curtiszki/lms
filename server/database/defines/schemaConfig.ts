export const schemaNames = {
    SchemaName: 'USER_INFORMATION',
    USERNAME_SIZE_LIMIT: '16',
    PASSWORD_SIZE_LIMIT: '16',
    // table name for user data
    USER_ACCOUNT : {
       TABLE_NAME: 'userAccount',
       ID: 'user_id',
       USERNAME : 'username',
    },
    // table name for user information
    USER_DATA : {
        TABLE_NAME: 'userData',
        ID: 'userdata_id',
        PASSWORD: 'password'
    },
    // table for storage
    STORAGE: {
        TABLE_NAME: 'storage',
        ID: 'storage_id',
        ID_REFERENCES_USER_ACCOUNT : 'user_id'
    },
    // table for collection, storage items
    COLLECTION: {
        TABLE_NAME: 'collection',
        ID: 'collection_id',
        ID_REFERENCES_STORAGE: 'storage_id'
    },
    // table for item name
    ITEM_CONTAINER: {
        TABLE_NAME: 'storageItem',
        ID_REFERENCES_COLLECTION: 'collection_id',
        JSON: 'data'
    }
}
