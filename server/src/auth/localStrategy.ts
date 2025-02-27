import passport from "passport";
import { Strategy } from "passport-local";
import { DatabaseQuery } from "database/utils/users";
import client from "database/db";
import { DatabaseResult } from "database/defines/types";
import { schemaNames } from "database/defines/schemaConfig";
import { QueryResultRow } from "pg";


const database = new DatabaseQuery();
passport.use(
    new Strategy(async (username, password, done) => {
        // find the user
        try {
            // check the username
            let foundUser = await database.retrieveRow(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.USERNAME, username, schemaNames.USER_ACCOUNT.TABLE_NAME);
            if (foundUser == DatabaseResult.ERROR) {
                throw new Error("Unable to find username");
            }
            foundUser = (foundUser as QueryResultRow)[schemaNames.USER_ACCOUNT.ID];

            // check the password
            const foundPassword = await database.findValue(client, schemaNames.USER_DATA.TABLE_NAME, schemaNames.USER_DATA.PASSWORD, password, schemaNames.USER_DATA.ID);
            if (foundPassword != DatabaseResult.SUCCESS) {
                throw new Error("Unable to find matching password");
            }
            done(null, foundUser);
        } catch (error: unknown) {
            done(error, false);
        }
    })
)