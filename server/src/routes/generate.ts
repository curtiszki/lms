import { Response, Request, Router } from "express";

export const generateRouter = Router();

generateRouter.get('/generate', function(req : Request, res : Response) {
  res.send('generate');
});

import DataGenerator from "@/services/generateData";
generateRouter.post('/generate', async function(req : Request, res : Response) {
  const json = req.body;
  const Generator = DataGenerator.getInstance;
  if (!Generator.validate(json)) {
    res.send(412);
  }
  const response = await Generator.generateInformation(json);
  if (response) {
    res.setHeader('Content-Type', 'application/json').send(JSON.stringify(response));
  }
  else {
    res.status(307).send('Error');
  }
});