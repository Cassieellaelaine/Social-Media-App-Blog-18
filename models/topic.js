const { Schema, Types } = require('mongoose');

const topicSchema = new Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    topicName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'Unnamed topic',
    },
    score: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = topicSchema;
