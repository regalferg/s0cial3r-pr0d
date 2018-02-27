var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var FeedMessageSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var FeedMessage = mongoose.model("FeedMessage", FeedMessageSchema);

module.exports = FeedMessage;
