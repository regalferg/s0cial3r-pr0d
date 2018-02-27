const db = require("../models");

// Defining methods for the channelController
module.exports = {
    getMemesByChannelName: function (req, res) {
        channelName = req.body.channelName;
        db.Channel.find({name:channelName}).then(function(result) {
            if(result.length == 0) {
                
            } else {
                db.Meme
                .find({ channel: result[0]._id })
                .then(result =>{
                    console.log(result);
                    res.json(result)
                })
                .catch(err => res.status(422).json(err));
            }
        }).catch(err => console.log(err));
    
    },
    postMeme: function (req, res) {
        console.log(req.body);
        db.Channel
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    addMeme: function (req, res) {
        var meme = req.body.meme;
        var userId = req.body.userId;
        var username = req.body.username;
        var channelName = req.body.channelName;
        db.Channel.find({ name: channelName }).then(function (result) {
            if (result.length === 0) {
                db.Channel.create({
                    name: channelName
                }).then(function (result) {
                    const cId = result._id;
                    db.Meme.create({
                        link: meme,
                        channel: cId,
                        poster: username
                    }).then(function (result) {
                        console.log(result);
                        db.User.updateOne({_id: userId}, {$push:{memes: result._id}}).then(function(result){
                            res.json("Channel and meme added!")
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
           } else {
                const cId = result[0]._id;
                db.Meme.create({
                    link: meme,
                    channel: cId,
                    poster: username
                }).then(function (result) {                       
                    console.log(result);
                    db.User.updateOne({_id: userId}, {$push:{memes: result._id}}).then(function(result){
                        res.json("Meme added to existing channel!")
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    },






    // getMemesByChannelName: function (req, res) {
    //     const channelName = req.body.channelName;
    //     db.Channel.find({
    //         channel: channelName
    //     }).then(function (result) {
    //         const channelId = result[0]._id
    //         db.Meme.find({ // find Memes for channel by name
    //             channel: channelId
    //         })
    //             .then(function (result) {
    //                 res.json(result);
    //             })
    //             .catch(err => console.log(err));;
    //     })
    //         .catch(err => console.log(err));;
    // },
    getMemesByChannelTwitchId: function (req, res) {
        console.log(1);
        const TwitchId = req.body.TwitchId;
        db.Channel.find({
            TwitchId: TwitchId
        }).then(function (result) {
            const channelId = result[0]._id
            db.Meme.find({ // find Memes for channel  by twitch id
                channel: channelId
            })
                .then(function (result) {
                    res.json(result);
                })
                .catch(err => console.log(err));;
        })
            .catch(err => console.log(err));;
    },
    getMemesByChannelId: function (req, res) {
        const channelId = req.body.channelId;
        db.Meme.find({ // find Memes for channel  by channel mongo id
            channel: channelId
        }).then(function (result) {
            res.json(result);
        })
            .catch(err => console.log(err));
    },
    createChannel: function (req, res) {
        const channel = req.body;
        db.Channel.find({
            name: channel.name
        }).then(function (result) {
            if (!result) {
                db.Channel.create({ channel }).then(function (result) {
                    return res.json("Added New Channel!");
                });
            } else {
                return res.json("Channel already exists!");
            }
        })
            .catch(err => console.log(err));
    }
};

