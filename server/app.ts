import cors, { CorsOptions } from "cors"

// Custom type to accomodate for express error
interface ResponseError extends Error {
  status?: number;
}
import createError from 'http-errors';
import express from 'express';
import path from 'path';
//import cookieParser from 'cookie-parser';
//import logger from 'morgan';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const corsOptions : CorsOptions = {
  origin: [process.env.CLIENT_URI || 'http://localhost:5173'],
  methods: 'GET, PUT, POST, PATCH, DELETE',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const port = process.env.port || 4000;

import routes from "@/routes/index";
app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
