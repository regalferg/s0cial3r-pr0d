const db = require("../models");

// Defining methods for the userController
module.exports = {
  getAll: function (req, res) {
    db.User.find({}).then(result => { // oh god
      return res.json(result);
    });
  },
  uploadMeme: function (req, res) {
    const userId = req.session.user._id;
    db.Meme.create(req.body)
      .then(function (Meme) {
        db.User.findOneAndUpdate({ _id: userId }, { $push: { memes: Meme._id } })
          .then(
          res.json("Meme uploaded successfully!")
          );

      }).catch(
      err => res.json("there was an error with upload")
      );
  },
  getFriends: function (req, res) {
    const userId = req.session.user._id;
    db.User.find({ // find user
      _id: userId
    }).then(function (result) {
      var friends = result.friends;
      db.User.findAll({
        _id: { $in: friends }
      }).then(function (result) { // find friends
        res.json(result);
      });
    });
  },
  getFeed: function (req, res) {
    const userId = req.session.user._id;
    db.FeedMessage.find({
      sender: userId
    }).then(function (result) {
      res.json(result);
    });
  },
  getMemes: function (req, res) {
    const userId = req.session.user._id;
    db.User.find({ // find user
      _id: userId
    }).then(function (result) {
      var memes = result.memes;
      db.Meme.find({
        _id: { $in: memes }
      }).then(function (result) { // find memes
        res.json(result);
      });
    });
  },
  getMemesByUser: function (req, res) {
    const username = req.body.username;
    console.log(username);
    db.User.find({ // find user
      username: username
    })
      .populate('memes')
      .then(function (result) {
        console.log(result);
        var memes = result[0].memes;
        res.json(memes);
      });
  },
  getSession: function (req, res) {
    res.json(req.session.user);
  },
  getUser: function (req, res) {
    console.log(req.body);
    db.User.find({ username: req.body.username }).then(function (result) {
      console.log(result);
      return res.json(result[0]);
    }).catch(err => console.log(err));
  },
  getChats: function (req, res) {
    const userId = req.session.user._id;
    db.Chat.find({
      participants: userId
    })
      .populate("participants")
      .then(function (result) {
        return res.json(result);
      }).catch(err => console.log(err));
    // db.User.find({ _id: req.body.userId }).then(function (result) {
    //   return res.json(result[0]);
    // }).catch(err => console.log(err));
  },
  updateProfile: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.session.user._id }, req.body).then(
      result => {
        return res.json(result);
      }).catch(err => console.log(err));
  },
  getAvatars: function (req, res) {
    const ids = req.body.ids;
    db.User.find({
      _id: { $in: ids }
    }).then(function (result) {
      const json = {};
      for (let key in result) {
        json[result[key]._id] = result[key].avatar;
      }
      res.json(json);
    }).catch(err => console.log(err));
  },
  seed: function (req, res) {
    db.User.create({
      TwitchId: 23444332222,
      username: "Test",
      email: "r@gmail.com"
    }).then(function (result) {
      const userId = result._id;
      console.log(userId);
      console.log(req.session.user._id);
      db.Chat.create({
        participants: [userId, req.session.user._id]
      }).then(function (result) {
        res.json("success");
      });
    });
  }
};



// var express = require("express");
// var router = express.Router();
// var mongoose = require("mongoose");
// var db = require("../models");




// router.post("/api/user/getFriends", async function (req, res) {
//   const userId = req.session.user._id;
//   db.User.find({ // find user
//     _id: userId
//   }).then(function (result) {
//     var friends = result.friends;
//     db.User.findAll({
//       _id: { $in: friends }
//     }).then(function (result) { // find friends
//       res.json(result);
//     });
//   });
// });

// router.post("/api/user/getFeed", async function (req, res) {
//   const userId = req.session.user._id;
//   db.FeedMessage.find({
//     sender: userId
//   }).then(function (result) {
//     res.json(result);
//   });
// });


// router.post("/api/user/getMemes", async function (req, res) {
//   const userId = req.session.user._id;
//   db.User.find({ // find user
//     _id: userId
//   }).then(function (result) {
//     var memes = result.memes;
//     db.Meme.findAll({
//       _id: { $in: memes }
//     }).then(function (result) { // find memes
//       res.json(result);
//     });
//   });
// });

// router.post("/api/user/getMemesByUser", async function (req, res) {
//   const userId = req.body.userId;
//   db.User.find({ // find user
//     _id: userId
//   }).then(function (result) {
//     var memes = result.memes;
//     db.Meme.findAll({
//       _id: { $in: memes }
//     }).then(function (result) { // find memes
//       res.json(result);
//     });
//   });
// });


// router.post("/api/user/uploadMeme", async function (req, res) {

// });

// router.get("/api/user/session", function(req, res) {
//   res.json(req.session.user);
// });

// module.exports = router;
