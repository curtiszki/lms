import { Response, Request, Router } from "express";

export const generateRouter = Router();

generateRouter.get('/generate', function(req : Request, res : Response) {
  res.send('generate');
});

import DataGenerator from "@/services/generateData";
generateRouter.post('/generate', async function(req : Request, res : Response) {
  const json = req.body;
  const Generator = DataGenerator.getInstance;
  const response = await Generator.generateInformation(json);
  console.log(response);
  res.send(JSON.stringify(response));
});