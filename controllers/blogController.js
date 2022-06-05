const Blog = require("./../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find({});
    if (data.length === 0) {
      return res.status(202).json({ msg: "No Blog Found" });
    }
    res.status(200).json(data);
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

exports.createBlog = async (req, res) => {
  const { title, desc, point, list } = req.body;
  try {
    const newBlog = new Blog({
      title,
      desc,
      point,
      list,
    });
    await newBlog.save();
    res.status(201).json({ msg: "Blog Created" });
  } catch (error) {
    console.log(error);
  }
};

exports.unwindBlog = async (req, res) => {};

exports.aggregateBlog = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $match: {
          point: { $gte: 1 },
        },
      },
      {
        $group: {
          // _id: "$title",
          _id: null,
          averagePoint: { $avg: "$point" },
          length: { $sum: 1 },
          summAll: { $sum: "$point" },
        },
      },
    ]);
    console.log(stats);
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
  }
};
