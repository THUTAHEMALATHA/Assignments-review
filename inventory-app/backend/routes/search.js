import express from "express";
import supabase from "../db.js";

const router = express.Router();
const allowedCategories = ["grain", "electronics", "clothes"];
// GET /search
router.get("/", async (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  //  validation
  if (category && !allowedCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  let query = supabase.from("inventory").select("*");

  if (q) {
    query = query.ilike("product_name", `%${q}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (minPrice) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json(error);

  res.json(data);
});

export default router;