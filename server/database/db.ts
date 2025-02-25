import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host: '127.0.0.1',
    port : 5432,
    database : 'Frank',
    user : 'Frank'
});


import { initializeTables } from "./schema";

export const initialize = async () => {
    await client.connect();
    await initializeTables(client);
    console.log('Finished initialization');
}
export default client;