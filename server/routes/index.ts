import { Request, Response } from "express";
const express = require("express");
import { generateRouter } from "./generate";

const router = express.Router();
router.get("/", function(req : Request, res: Response) {
    res.send('Index');
});
router.use(generateRouter);
module.exports = router;