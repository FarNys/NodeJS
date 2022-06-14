const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const searchRouter = require("./routes/searchRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const blogRouter = require("./routes/blogRouter");
dotenv.config({ path: "./config.env" });

const app = express();
//JSON WILL SHOW AS UNDEFINED IN POST DATA WITHOUT THIS
app.use(express.json());
app.use(cors());

const router = express.Router();
const PORT = 3456;

connectDB();

app.listen(PORT, (req, res) => {
  console.log(`server started on ${PORT}`);
});
//REAL API ADDRESS AND ITS ROUTE FUNCTION (TO HANDLE ALL HTTP METHODS)
app.use("/s", (req, res) => {
  res.status(200).json({
    status: "success",
    msg: "Your Requests have coug ss",
  });
});

//AUTHENTICATION
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);

//PRODUCTS
app.use("/api/v1/products", productRouter);
//SEARCH PRODUCT
app.use("/api/v1/product/search", searchRouter);
//BLOG ROUTERS
app.use("/api/v1/blogs", blogRouter);
