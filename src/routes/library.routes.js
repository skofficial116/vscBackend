import { Router } from "express";
import {getBGShloka} from "../controllers/library.controller.js";
const router = Router();

router.route("/bg/:chapter/:shloka").get(getBGShloka);


export default router;
