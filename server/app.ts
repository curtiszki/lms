import cors, { CorsOptions } from "cors"
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import {Request,Response, NextFunction} from "express";

dotenv.config();

// Custom type to accomodate for express error
interface ResponseError extends Error {
  status?: number;
}
import createError from 'http-errors';
import express from 'express';
import path from 'path';
//import cookieParser from 'cookie-parser';
//import logger from 'morgan';

// Database initialization
import { initialize } from "database/db";
initialize();

const app = express();

// view engine setup

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


const sessionSettings = {
  cookie: {
    // one day
    maxAge: 86400000,
    sameSite: true,
    secure: true,
  },
  saveUnitialized: true,
  resave: false,
  secret: process.env.SECRET || 'Apple pancakes'

};

// Enable trusted localhost during development
if (app.get('env') === 'development') {
  app.set('trust proxy', 'loopback');
}

app.use(session(sessionSettings));

app.use(passport.initialize());
app.use(passport.session());

import passportConfig from "@/auth/config";
passportConfig(passport);

const corsOptions : CorsOptions = {
  origin: [process.env.CLIENT_URI || 'http://localhost:5173'],
  methods: 'GET, PUT, POST, PATCH, DELETE',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const port = process.env.port || 4000;

/*
declare module 'express-session' {
  interface SessionData {
      user: {
        username: string
      };
  }
}
*/
import routes from "@/routes/index";
app.use('/', routes);
// Ensure user is authenticated
/*
const authenticationCheck = (req: Request, res: Response, next: NextFunction) => {
if (!req.user) {
  res.redirect(401, '/');
}
next();
};
routes.use(authenticationCheck);
*/

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})