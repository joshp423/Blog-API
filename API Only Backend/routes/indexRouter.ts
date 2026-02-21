import { Router } from "express";
import * as indexController from "../controllers/indexController.js";
const indexRouter = Router();

indexRouter.post("/sign-up", indexController.signUp);
indexRouter.post("/log-in/viewer", indexController.logInView);
indexRouter.post("/log-in/editor", indexController.logInEdit);
indexRouter.get("/blogPosts/view", indexController.getAllBlogPosts);
indexRouter.post("/blogPosts/view/", indexController.getSelectedBlogPost);
indexRouter.put(
  "/blogPosts/edit/",
  indexController.verifyToken,
  indexController.editSelectedBlogPost,
);
indexRouter.put(
  "/blogPosts/publishToggle/",
  indexController.verifyToken,
  indexController.togglePublishSelectedBlogPost,
);
indexRouter.post(
  "/blogPosts/create",
  indexController.verifyToken,
  indexController.createNewBlogPost,
);
indexRouter.delete(
  "/blogPosts/delete/",
  indexController.verifyToken,
  indexController.deleteSelectedBlogPost,
);
indexRouter.post("/comments/view", indexController.getAllComments);
indexRouter.post(
  "/comments/view",
  indexController.verifyToken,
  indexController.createNewComment,
);

export default indexRouter;
