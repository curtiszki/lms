import pg from 'pg';
const { Client } = pg;

export const client = new Client({
    host: '127.0.0.1',
    port : 5432,
    database : 'Frank',
    user : 'Frank'
});
client.connect();