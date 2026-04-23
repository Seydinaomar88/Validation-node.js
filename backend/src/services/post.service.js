const Post = require('../models/Post');

/**
 * CREATE POST
 */
exports.createPost = async (data, userId) => {
  return await Post.create({
    ...data,
    author: userId
  });
};

/**
 * GET ALL POSTS (PAGINATION)
 */
exports.getAllPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments();

  return {
    posts,
    totalPosts: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  };
};

/**
 * GET ONE POST
 */
exports.getPostById = async (id) => {
  const post = await Post.findById(id).populate('author', 'name email');

  if (!post) {
    throw new Error('Post introuvable');
  }

  return post;
};

/**
 * UPDATE POST
 */
exports.updatePost = async (id, data, userId, userRole, permissions = []) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new Error('Post introuvable');
  }

  const isOwner = post.author.toString() === userId;
  const isAdmin = userRole === 'admin';
  const canUpdate = permissions.includes('update');

  if (!isOwner && !isAdmin && !canUpdate) {
    throw new Error("Vous n'avez pas la permission de modifier ce post");
  }

  return await Post.findByIdAndUpdate(id, data, {
    new: true
  });
};

/**
 * DELETE POST
 */
exports.deletePost = async (id, userId, userRole, permissions = []) => {
  const post = await Post.findById(id);

  if (!post) {
    throw new Error('Post introuvable');
  }

  const isOwner = post.author.toString() === userId;
  const isAdmin = userRole === 'admin';
  const canDelete = permissions.includes('delete');

  if (!isOwner && !isAdmin && !canDelete) {
    throw new Error("Vous n'avez pas la permission de supprimer ce post");
  }

  await post.deleteOne();

  return { message: 'Post supprimé avec succès' };
};

/**
 * TOGGLE LIKE
 */
exports.toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error('Post introuvable');
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return {
    likesCount: post.likes.length,
    liked: !alreadyLiked
  };
};