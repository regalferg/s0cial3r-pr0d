//load bcrypt
var bCrypt = require("bcrypt-nodejs");
var twitchStrategy = require("passport-twitch").Strategy;
var db = require("../../models");

module.exports = function (passport) {
  var User = db.User;

  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // deserialize user
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new twitchStrategy(
      {
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: process.env.TWITCH_CALLBACK_URL,
        scope: process.env.TWITCH_SCOPE
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile.username);
      
        const json = profile._json;
        User.find({ TwitchId: profile.id }, function (err, result) {
          if (result.length === 0) {
            User.create({
              TwitchId: profile.id,
              username: profile.username,
              email: profile.email,
              avatar: json.logo,
              bio: json.bio
            }, function (err, result) {
              return done(err, result);
            });
          } else {
            User.findOneAndUpdate(
              { TwitchId: profile.id },
              {
                email: profile.email,
                avatar: json.logo,
                bio: json.bio
              },
              function (err, result) {
                return done(err, result);
              });
          }
        });
      }
    )
  );
};
