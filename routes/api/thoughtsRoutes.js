const router = require('express').Router();
const {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../../controllers/postController.js');

// /api/posts
router.route('/').get(getPosts).post(createPost);

// /api/posts/:postId
router
  .route('/:postId')
  .get(getSinglePost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
