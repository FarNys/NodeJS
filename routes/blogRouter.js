const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog)
  .delete(blogController.deleteAllBlogs);
//   .post(productController.saveProducts);

router.route("/unwind").get(blogController.unwindBlog);
router.route("/stats").get(blogController.aggregateBlog);
module.exports = router;