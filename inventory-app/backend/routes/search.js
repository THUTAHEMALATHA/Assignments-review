import express from "express";
import supabase from "../db.js";

const router = express.Router();

// GET /search
router.get("/", async (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  // base query
  let query = supabase.from("inventory").select("*");

  // product name (case-insensitive)
  if (q) {
    query = query.ilike("product_name", `%${q}%`);
  }

  // category filter
  if (category) {
    query = query.eq("category", category);
  }

  // price filters
  if (minPrice) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  // invalid range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  const { data, error } = await query;

  if (error) return res.status(500).json(error);

  res.json(data);
});

export default router;