const Blog = require("./../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find({});
    if (data.length === 0) {
      return res.status(202).json({ msg: "No Blog Found" });
    }
    res.status(200).json({ msg: "All Blogs Deleted" });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteAllBlogs = async (req, res) => {
  try {
    const getBlogs = await Blog.deleteMany({});
    console.log(getBlogs);
    res.status(200).json({ msg: "All Blogs Deleted" });
  } catch (error) {
    console.log(error);
  }
};
