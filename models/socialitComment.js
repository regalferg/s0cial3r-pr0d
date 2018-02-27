const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialitCommentSchema = new Schema({
  imageLink: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    required: false,
    default: 0
  },
  body: {
    type: String,
    required: true
  },
  edited: {
    type: Boolean,
    default: 0
  },
  editedDate: {
    type: Date,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  op: {
    type: Schema.Types.ObjectId,
    ref: "socialitPost"
  },
  poster: {
    type: String,
    required: true  
}
});

const socialitComment = mongoose.model("socialitComment", socialitCommentSchema);

module.exports = socialitComment;
