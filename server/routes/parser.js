import { Router } from "express";

import { getCurrency } from "../controllers/parser.js";
import { getOilCost } from "../controllers/parser.js";

const router = new Router();

router.get("/currency", getCurrency);
router.get("/oil", getOilCost);

export default router;