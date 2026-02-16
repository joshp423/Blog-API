import { Router } from "express";
import * as indexController from "../controllers/indexController";
const indexRouter = Router();

indexRouter.post("/sign-up", indexController.signUpPost);

export default indexRouter;