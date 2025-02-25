import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
    new Strategy((username, password, done) => {
        // find the user
        const findUser = false;
        // authenticate the passpor
    })
)