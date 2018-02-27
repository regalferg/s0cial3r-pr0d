var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    channel: {
        type: String,
        required: false
    },
    TwitchId: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;
