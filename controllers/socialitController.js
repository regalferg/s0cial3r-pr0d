const db = require("../models");

// Defining methods for the socialitsController
module.exports = {
  getPostsByChannelName: function(req, res) {
    console.log(req.params.channel);
    channel = req.params.channel;
    db.Channel
      .find({channel:channel})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.socialitPost
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.socialitPost
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.socialitPost
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.socialitPost
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.socialitPost
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addPost: function (req, res) {
    console.log("yas")
    var title = req.body.title;
    var userId = req.body.userId;
    var username = req.body.username;
    var channelName = req.body.channelName;
    var body = req.body.body; 
    var imageLink = req.body.imageLink ;
    console.log(imageLink)
    db.Channel.find({ name: channelName }).then(function (result) {
        if (result.length === 0) {
            db.Channel.create({
                name: channelName
            }).then(function (result) {
                const cId = result._id;
                console.log("asd")
                db.socialitPost.create({
                    channel: cId,
                    poster: username,
                    title: title,
                    imageLink:imageLink,
                    body:body,
                }).then(function (result) {
                    console.log(result);
                    db.User.updateOne({_id: userId}, {$push:{socialitPosts: result._id}}).then(function(result){
                        res.json("Channel and Post added!")
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
       } else {
            const cId = result[0]._id;
            db.socialitPost.create({
                    channel: cId,
                    poster: username,
                    title: title,
                    imageLink:imageLink,
                    body:body,
            }).then(function (result) {                       
                console.log(result);
                db.User.updateOne({_id: userId}, {$push:{socialitPosts: result._id}}).then(function(result){
                    res.json("Post added to existing channel!")
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));

        }
    }).catch(err => console.log(err));
},

getPostsByChannelId: function (req, res) {
  channelName = req.body.channelName;
  db.Channel.find({name:channelName}).then(function(result) {
      if(result.length == 0) {
          
      } else {
          db.socialitPost
          .find({ channel: result[0]._id })
          .then(result =>{
              console.log(result);
              res.json(result)
          })
          .catch(err => res.status(422).json(err));
      }
  }).catch(err => console.log(err));

},

getCommentsByChannelId: function (req, res) {
    postId = req.body.postId;
    db.socialitPost.find({_id: postId}).then(function(result) {
        const parrent = result
        if(result.length == 0) {
            
        } else {
            db.socialitComment
            .find({ op: result[0]._id })
            .then(result =>{
                console.log(result);
                res.json(result+ parrent)
            })
            .catch(err => res.status(422).json(err));
        }
    }).catch(err => console.log(err));
}

};