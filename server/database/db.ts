import postgres from 'postgres';

const sql = postgres({
    host: '127.0.0.1',
    port : 5432,
    database : 'Frank',
    username : 'Frank'
});