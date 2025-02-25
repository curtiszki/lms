import { sql } from "database/db";
import { initializeTables } from "database/schema";

export const initialize = async () => {
    await initializeTables(sql);
    console.log('Finished initialization');
}