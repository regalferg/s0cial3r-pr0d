var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var ChatSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    topic: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

var Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
