import express from "express";
import supabase from "../db.js";

const router = express.Router();
const allowedCategories = ["grain", "electronics", "food"];
// GET 

router.get("/", async (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  //  validation is 
  if (category && !allowedCategories.includes(category.toLowerCase())) {
    return res.status(400).json({ error: "Invalid category" });
  }

  let query = supabase.from("inventory").select("*");

  if (q) {
    query = query.ilike("product_name" , `%${q.trim()}%`);
  }

  if (category) {
    query = query.eq("category", category.toLowerCase());
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