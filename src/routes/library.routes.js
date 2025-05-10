import { Router } from "express";
import {getBGShloka, getBGChapter} from "../controllers/library.controller.js";
const router = Router();

router.route("/bg/:chapter/:shloka").get(getBGShloka);
router.route("/bg/:chapter").get(getBGChapter);


export default router;
