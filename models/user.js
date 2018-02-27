var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var UserSchema = new Schema({
    TwitchId: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    email: {
        type: String,
        required: true
   },
    avatar: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        default: null
    },
    interests: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    memes:[ {
        type: Schema.Types.ObjectId,
        ref: "Meme"
    } ],
    blocked: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    friends: [{
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
    },
    socialitPosts: [{
        type: Schema.Types.ObjectId,
        ref: "SocialitPost"
    }],
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
