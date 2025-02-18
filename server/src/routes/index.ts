import { Request, Response, Router } from "express";
import { generateRouter } from "./generate";

const router = Router()
router.get("/", function(req : Request, res: Response) {
    res.send('Index');
});
router.use(generateRouter);

export default router;