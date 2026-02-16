import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.get("/blogPosts", indexController.blogPostsGet)
indexRouter.post("/blogPosts", indexController.blogPostsPost)

export default indexRouter;