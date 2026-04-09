import express from "express";
import {
  createInventory,
  getInventory
} from "../controllers/inventoryController.js";

const router = express.Router();

// POST /inventory
router.post("/", createInventory);

// GET /inventory
router.get("/", getInventory);

export default router;