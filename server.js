//======
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var nodemailer = require('nodemailer');
var cookieSession = require('cookie-session');
var discord = require("discord.js");
var db = require("./models");
const flash = require('express-flash');
const mongoose = require("mongoose");
require('dotenv').config();
const routes = require("./routes");
var PORT = process.env.PORT || 3001;
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


//======= 
// SOCKET.IO

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1', 'room2', 'room3'];
// Handle connection
io.sockets.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on('sendmeme', function (memeObject) {
    var meme = memeObject.meme;
    var userId = memeObject.userId;
    var username = memeObject.username;
    var channelName = memeObject.channelName;
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
                  io.in(socket.room).emit('updatememe', result);
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
              io.in(socket.room).emit('updatememe', result);
                console.log(result);
                db.User.updateOne({_id: userId}, {$push:{memes: result._id}}).then(function(result){
                    res.json("Meme added to existing channel!")
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));

        }
    }).catch(err => console.log(err));
  });



  socket.on('adduser', function (username) {
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (chatId, userId, data) {
    var message = data;
    db.Message.create({
      message: message,
      sender: userId
    }).then(function (messageObj) {
      const id = messageObj._id;

      db.Chat.updateOne({ _id: chatId }, { $push: { messages: id } })
        .then(function (result) {
          // we tell the client to execute 'updatechat' with 2 parameters
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
    io.in(socket.room).emit('updatechat', {message: message, sender: userId, date: new Date()});


  });

  socket.on('writing', function (username) {
    io.in(socket.room).emit('iswriting', username);
  });
  socket.on('notwriting', function (username) {
    io.in(socket.room).emit('isnotwriting', username);
  });

  socket.on('switchRoom', function (newroom) {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    // update socket session room title
    socket.room = newroom;
    socket.emit('updaterooms', rooms, newroom);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});


//========

process.on('unhandledRejection', function (reason, p) { // moar reasons for unhandled rejections promises plz gibz me stack trace!
  console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});




// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("client/build"));


// ==========For Passport=============
//load passport strategies
// app.use(require('./config/passport/passport.js')(passport, db.User));

app.use(cookieSession({
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
  secure: false,
  overwrite: false,
  secret: 'keyboard cat'
}));


//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(flash());
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

require('./config/passport/passport.js')(passport);

//===============================
// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
//==============================================
// Import routes and give the server access to them.
// require("./routes/profile_routes.js")(app,db);
// require('./routes/auth.js')(app,passport);
// require('./routes/forgot.js')(app,db.user);
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);
//==============================================
//Listen with no sync

app.get("/auth/twitch", passport.authenticate("twitch"));

app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function (req, res) {

  if (req.session.user = req.session.passport.user[0]) {
    req.session.user = req.session.passport.user[0];
  } else {
    req.session.user = req.session.passport.user;
  }
  console.log(req.session.user)
  return res.redirect("http://localhost:3000/browse");
});

app.use(routes);
//Syncing our sequelize models and then starting our Express app
//=============================================================
// db.sequelize.sync({ force: false }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

// Routers
// app.use(require("./controllers/AuthController"));
// app.use(require("./controllers/userController"));


mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Socialer"
);

server.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});
