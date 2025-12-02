import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);

router.delete("/delete/songs/:id", deleteSong);

router.post("/albums", createAlbum);

router.delete("/delete/album/:id", deleteAlbum);

export default router;
