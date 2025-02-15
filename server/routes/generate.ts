import { Response, Request, NextFunction } from "express";

const express = require('express');

export const generateRouter = express.Router();

generateRouter.get('/generate', function(req : Request, res : Response, next : NextFunction) {
  res.send('generate');
});

generateRouter.post('/generate', function(req : Request, res : Response, next : NextFunction) {
  console.log(req.body);
  res.send('generate post');
});
