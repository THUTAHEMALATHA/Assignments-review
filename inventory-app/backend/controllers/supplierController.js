import supabase from "../db.js";

export const createSupplier = async (req, res) => {
  const { name, city } = req.body;

  const { data, error } = await supabase
    .from("suppliers")
    .insert([{ name, city }]).select();

  if (error) return res.status(500).json(error);

  res.json(data);
};