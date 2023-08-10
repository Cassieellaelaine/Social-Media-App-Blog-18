const router = require('express').Router();
const postRoutes = require('./thoughtsRoutes');
const bloggerRoutes = require('./userRoutes');

router.use('/posts', postRoutes);
router.use('/bloggers', bloggerRoutes);

module.exports = router;
