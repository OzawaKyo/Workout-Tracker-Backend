import express from "express";
import { getUserInfo } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAvatars } from "../controllers/userController.js";
import { updateAvatar } from "../controllers/userController.js";
import { updateName } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getUserInfo);
router.get("/avatars", getAvatars);
router.put("/update-avatar", authMiddleware, updateAvatar);
router.put("/update-name", authMiddleware, updateName);

export default router;
