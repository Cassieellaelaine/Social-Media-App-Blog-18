const { Schema, model } = require('mongoose');
const topicSchema = require('./topic');

// Schema to create Blogger model
const bloggerSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    Email: {
      type: String,
      required: true,
      max_length: 50,
    },
    topics: [topicSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Blogger = model('blogger', bloggerSchema);

module.exports = Blogger;
