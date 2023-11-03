import { Router } from "express";
import { registration, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

router.post("/auth/register", registration);
router.post("/auth/login", login);
router.get("/me", checkAuth, getMe)

export default router;
