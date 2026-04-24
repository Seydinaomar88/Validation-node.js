const postService = require("../services/post.service");

/**
 * CREATE POST
 */
exports.create = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET ALL POSTS (SANS PAGINATION + commentCount)
 */
exports.getAll = async (req, res) => {
  try {
    const data = await postService.getAllPosts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ONE POST
 */
exports.getOne = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * UPDATE POST
 */
exports.update = async (req, res) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role,
      req.user.permissions
    );

    res.json(post);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/**
 * DELETE POST
 */
exports.remove = async (req, res) => {
  try {
    const result = await postService.deletePost(
      req.params.id,
      req.user.id,
      req.user.role,
      req.user.permissions
    );

    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/**
 * LIKE / UNLIKE POST
 */
exports.like = async (req, res) => {
  try {
    const result = await postService.toggleLike(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};