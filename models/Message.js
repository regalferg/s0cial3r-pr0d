var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var MessageSchema = new Schema({
    message: {
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
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
