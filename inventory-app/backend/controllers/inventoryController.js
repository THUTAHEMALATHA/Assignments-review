import supabase from "../db.js";

// POST inventory
export const createInventory = async (req, res) => {
  const { supplier_id, product_name, quantity, price,category } = req.body;

  if (quantity < 0 || price <= 0) {
    return res.status(400).json({ message: "Invalid values" });
  }

  const { data, error } = await supabase
    .from("inventory")
    .insert([{ supplier_id, product_name, quantity, price, category }])
    .select();

  if (error) return res.status(500).json(error);

  res.json(data);
};

// GET inventory
export const getInventory = async (req, res) => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
};