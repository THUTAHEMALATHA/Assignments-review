import express from "express";
import cors from "cors";

import searchRoute from "./routes/search.js";
import inventoryRoute from "./routes/inventory.js";
import supplierRoute from "./routes/supplier.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchRoute);
app.use("/supplier", supplierRoute);
app.use("/inventory", inventoryRoute);

app.listen(5000, () => {
  console.log("SERVER running on port 5000");
});