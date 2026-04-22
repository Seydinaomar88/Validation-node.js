const Post = require('../models/Post');

/**
 * CREATE POST
 */
exports.createPost = async (data, userId, permissions = []) => {
  if (!permissions.includes('create')) {
    throw new Error(
      `Vous ne pouvez pas créer de post. Vos permissions actuelles: ${permissions.join(', ')}`
    );
  }

  return await Post.create({
    ...data,
    author: userId
  });
};

/**
 * GET ALL POSTS
 */
exports.getAllPosts = async () => {
  return await Post.find()
    .populate('author', 'name email')
    .sort({ createdAt: -1 });
};

/**
 * GET POST BY ID
 */
exports.getPostById = async (id) => {
  const post = await Post.findById(id)
    .populate('author', 'name email');

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
    throw new Error(
      `Modification refusée. Vos permissions actuelles: ${permissions.join(', ')}. Vous devez avoir 'update'`
    );
  }

  return await Post.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      returnDocument: 'after'
    }
  );
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
    throw new Error(
      `Suppression refusée. Vos permissions actuelles: ${permissions.join(', ')}`
    );
  }

  await post.deleteOne();

  return { message: 'Post supprimé avec succès' };
};