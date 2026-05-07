import { Router } from "express";
import {getAllStories,getStoryById,toggleBookmark,} from "../controllers/storyController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", authenticate, toggleBookmark);

export default router;
