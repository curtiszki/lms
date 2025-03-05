import passport from "passport";
import localStrategy from "./localStrategy";
import { schemaNames } from "database/defines/schemaConfig";
import client from "database/db";
import { DatabaseQuery } from "database/utils/users";
import { DatabaseResult } from "database/defines/types";

const database = new DatabaseQuery();
export default (passport : passport.PassportStatic) => {
    passport.serializeUser((user, done) => {
        console.log("SERIALIZE");
        done(null, (user as {
            user_id: string,
            username: string
        }).user_id);
    });

    passport.deserializeUser(async (userId : string, done) => {
        console.log("DESERIALIZE");
        try {
            const foundUser = await database.retrieveRow(client, schemaNames.USER_ACCOUNT.TABLE_NAME, schemaNames.USER_ACCOUNT.ID, userId);
            if (foundUser == DatabaseResult.ERROR) {
                throw new Error("Unable to find username");
            }
            done(null, foundUser);
        } catch (err) {
            done (null, false);
        }
    });

    localStrategy(database);
}