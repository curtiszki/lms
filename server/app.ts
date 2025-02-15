import { Response, Request, NextFunction} from "express";

// Custom type to accomodate for express error
interface ResponseError extends Error {
  status?: number;
}
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.port || 4000;

const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
