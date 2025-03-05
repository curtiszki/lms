import passport from "passport";
import { Strategy } from "passport-local";
import { DatabaseQuery } from "database/utils/users";
import client from "database/db";
import { DatabaseResult } from "database/defines/types";
import { schemaNames } from "database/defines/schemaConfig";

import { createHash } from "crypto";

export default (database : DatabaseQuery) => {
    passport.use('local',
    new Strategy(async (username, password, done) => {
        // find the user
        try {
            // check the username
            const foundUser = await database.retrieveRow(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.USERNAME, username);
            if (foundUser == DatabaseResult.ERROR) {
                throw new Error("Unable to find username");
            }
            // check the password
            const hashedPassword = createHash('sha256').update(password).digest('hex');
            const foundPassword = await database.findValue(client, schemaNames.USER_DATA.TABLE_NAME, schemaNames.USER_DATA.PASSWORD, hashedPassword, schemaNames.USER_DATA.ID);
            if (foundPassword != DatabaseResult.SUCCESS) {
                throw new Error("Unable to find matching password");
            }
            done(null, foundUser);
        } catch (error: unknown) {
            console.log("CAUGHT: ", error);
            done(null, false);
        }
    })
)
};