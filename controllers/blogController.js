const catchAsync = require("../utils/catchAsync");
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

exports.createBlog = catchAsync(async (req, res, next) => {
  const { title, desc, point, list } = req.body;

  const newBlog = new Blog({
    title,
    desc,
    point,
    list,
  });
  await newBlog.save();
  res.status(201).json({ msg: "Blog Created" });
});

exports.unwindBlog = async (req, res) => {
  console.log(req);
  try {
    const getUnwind = await Blog.aggregate([
      { $unwind: "$list" },
      {
        $match: {
          point: { $gte: 0 },
        },
      },
      // {
      //   $group: {
      //     _id: null,
      //     items: { $push: "$title" },
      //     sumPoint: { $sum: "$point" },
      //     dataLength: { $sum: 1 },
      //   },
      // },
      // {
      //   $addFields: {
      //     extraField: "$sumPoint",
      //   },
      // },
      {
        $project: { _id: 0, __v: 0 },
      },
    ]);
    res.status(200).json(getUnwind);
  } catch (error) {
    res.status(500).json({ msg: "ServEr ErroR.!" });
  }
};

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
