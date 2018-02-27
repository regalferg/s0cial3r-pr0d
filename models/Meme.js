var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var MemeSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: false,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    },
    poster: {
        type: String,
        required: true  
    }
});

var Meme = mongoose.model("Meme", MemeSchema);

module.exports = Meme;
