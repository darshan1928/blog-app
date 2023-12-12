
const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    name: { type: String },
  },
  commentText: { type: String, required: true },
  publicationDate: { type: Date, default: Date.now },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
