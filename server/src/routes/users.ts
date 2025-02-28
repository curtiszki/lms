import {Response, Request, Router } from "express";

export const userRouter = Router();

import { registerJSON } from "@/defines/types";
import { DatabaseQuery } from "database/utils/users";
import client from "database/db";
import { schemaNames } from "database/defines/schemaConfig";
import { DatabaseResult } from "database/defines/types";
import { QueryResultRow } from "pg";
// POST request for registration
userRouter.post('/users/register', async function(req: Request, res: Response) {
    // Should expect a username and password
    // Insert user into username and password table
    const json = req.body as registerJSON;
    res.type("text");
    try {
        const query = new DatabaseQuery();
        let queryRes = await query.findValue(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.USERNAME, json.username, schemaNames.USER_ACCOUNT.ID);
        if (queryRes === DatabaseResult.SUCCESS) {
            res.status(409).send('Taken username');
            return;
        }
        queryRes = await query.insertValues(client, schemaNames.USER_ACCOUNT.TABLE_NAME, [schemaNames.USER_ACCOUNT.USERNAME], [json.username]);
        if (queryRes === DatabaseResult.ERROR) {
            throw new Error('Duplicate user');
        }
        const idRow = await query.retrieveRow(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.USERNAME, json.username, schemaNames.USER_ACCOUNT.ID);
        if (idRow == DatabaseResult.ERROR) {
            throw new Error('Error parsing request');
        }
        const id = (idRow as QueryResultRow)[schemaNames.USER_ACCOUNT.ID];
        queryRes = await query.insertValues(client, schemaNames.USER_DATA.TABLE_NAME, 
            [schemaNames.USER_DATA.ID, schemaNames.USER_DATA.PASSWORD],[id, json.password]
        );
        if (queryRes === DatabaseResult.ERROR) {
            throw new Error('Unable to update password table.');
        }

        res.status(201).send('Created account');
        return;
    }
    catch (e) {
        const err = e as Error;
        res.status(500).send(err.message);
    }

});