const router = require('express').Router();
const {
  getBloggers,
  getSingleBlogger,
  createBlogger,
  deleteBlogger,
  addTopic,
  removeTopic,
} = require('../../controllers/bloggerController');

// /api/bloggers
router.route('/').get(getBloggers).post(createBlogger);

// /api/bloggers/:bloggerId
router.route('/:bloggerId').get(getSingleBlogger).delete(deleteBlogger);

// /api/bloggers/:bloggerId/topics
router.route('/:bloggerId/topics').post(addTopic);

// /api/bloggers/:bloggerId/topics/:topicId
router.route('/:bloggerId/topics/:topicId').delete(removeTopic);

module.exports = router;
