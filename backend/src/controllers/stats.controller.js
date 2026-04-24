const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total posts
    const totalPosts = await Post.countDocuments();

    // Total comments
    const totalComments = await Comment.countDocuments();

    // Total likes (dans tous les posts)
    const posts = await Post.find({}, "likes");

    const totalLikes = posts.reduce((acc, post) => {
      return acc + post.likes.length;
    }, 0);

    res.json({
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};