const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    postName: {
      type: String,
      required: true,
    },
    inPerson: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    bloggers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blogger',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Post = model('post', postSchema);

module.exports = Post;
