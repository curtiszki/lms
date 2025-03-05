import { Router } from "express";
import { generateRouter } from "./generate";
import { userRouter } from "./users";

const router = Router()

router.use(generateRouter);
router.use(userRouter);
export default router;