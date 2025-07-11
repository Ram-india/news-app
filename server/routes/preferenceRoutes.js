const express = require( "express");
import { getPreferences, savePreferences } from "../controllers/preferenceController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getPreferences);
router.post("/", verifyToken, savePreferences);

export default router;