import { Response, Request, Router } from "express";

export const generateRouter = Router();

export enum generateRouterTypeParams {
  long_answer="long_answer",
  dataset="dataset"
};

import DataGenerator from "@/services/generateData";
generateRouter.post('/generate/:type', async function(req : Request, res : Response) {
  const key = req.params.type;
  const json = req.body;
  const Generator = DataGenerator.getInstance;
  if (!Generator.validate(json, key)) {
    res.sendStatus(412);
    return;
  }

  // Generate data and send back
  await ((key == generateRouterTypeParams.long_answer) ? Generator.generateLongAnswerResponses(json) : Generator.generateInformation(json))
    .then((response) => {
      if (response) {
        res.setHeader('Content-Type', 'application/json').send(JSON.stringify(response));
      }
      else {
        res.sendStatus(307);
      }
      res.end();
    })
});