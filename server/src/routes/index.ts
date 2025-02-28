import { Request, Response, Router } from "express";
import { generateRouter } from "./generate";
import { userRouter } from "./users";

const router = Router()
router.get("/", function(req : Request, res: Response) {
    res.send('Index');
});
router.use(generateRouter);
router.use(userRouter);
export default router;