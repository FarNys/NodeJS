const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .delete(blogController.deleteAllBlogs);
//   .post(productController.saveProducts);

module.exports = router;
