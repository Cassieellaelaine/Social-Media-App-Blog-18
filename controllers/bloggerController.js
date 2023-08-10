// ObjectId() method for converting bloggerId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { Blogger, Post } = require('../models');

// TODO: Create an aggregate function to get the number of social media bloggers overall
const headCount = async () => {
  // Your code here
  const numberOfBloggers = await Blogger.aggregate().count("bloggersCount");
  return numberOfBloggers;
}

// Execute the aggregate method on the Social Media Blogger model and calculate the overall post rating by using the $avg operator
const rating = async (bloggerId) =>
  Blogger.aggregate([
    {
      $match: {
        _id: new ObjectId(bloggerId),
        
    // TODO: Ensure we include only the blogger who can match the given ObjectId using the $match operator
      },
    },
    {
      $unwind: '$topic',
    // TODO: Group information for the Blogger with the given ObjectId alongside an overall post rating for a topic calculated using the $avg operator

    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        overallGrade: { $avg: '$topic' },
      },
    },
  ]);

     

const bloggerId = '64cc49428855365960f9c109';
const result = rating(bloggerId);
console.log(result);


module.exports = {
  // Get all social medial bloggers/friends
  async getBloggers(req, res) {
    try {
      const bloggers = await Blogger.find();
      const bloggerObj = {
        bloggers,
        headCount: await headCount(),
      };
      return res.json(bloggerObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single social media blogger/friend
  async getSingleBlogger(req, res) {
    try {
      const blogger = await Blogger.findOne({ _id: req.params.bloggerId })
        .select('-__v')
        .lean();

      if (!blogger) {
        return res.status(404).json({ message: 'No blogger with that ID' });
      }

      res.json({
        blogger,
        rating: await rating(req.params.bloggerId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new social media blogger/friend
  async createBlogger(req, res) {
    try {
      const blogger = await Blogger.create(req.body);
      res.json(blogger);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a social media blogger/friend and remove them from the friend list
  async deleteBlogger(req, res) {
    try {
      const blogger = await Blogger.findOneAndRemove({ _id: req.params.bloggerId });

      if (!blogger) {
        return res.status(404).json({ message: 'No such blogger exists' })
      }

      const post = await Post.findOneAndUpdate(
        { bloggers: req.params.bloggerId },
        { $pull: { bloggers: req.params.bloggerId } },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({
          message: 'Blogger deleted, but no associated posts found',
        });
      }

      res.json({ message: 'Blogger successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Associated a topic with a social media blogger/friend
  async addTopic(req, res) {
    try {
      console.log('You are adding a topic');
      console.log(req.body);
      const blogger = await Blogger.findOneAndUpdate(
        { _id: req.params.bloggerId },
        { $addToSet: { topicss: req.body } },
        { runValidators: true, new: true }
      );

      if (!blogger) {
        return res
          .status(404)
          .json({ message: 'No blogger found with that ID :(' })
      }

      res.json(blogger);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove topic from being associated with a blogger/friend
  async removeTopic(req, res) {
    try {
      const blogger = await Blogger.findOneAndUpdate(
        { _id: req.params.bloggerId },
        { $pull: { topic: { topicId: req.params.topicId } } },
        { runValidators: true, new: true }
      );

      if (!blogger) {
        return res
          .status(404)
          .json({ message: 'No blogger found with that ID :(' });
      }

      res.json(blogger);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
