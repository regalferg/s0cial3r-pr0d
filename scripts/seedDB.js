const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Socialer",
  {
    useMongoClient: true
  }
);

const feedSeed = [
  {
    poster: "Bill S Preston",
    link: "http://www.telegraph.co.uk/content/dam/films/2018/02/02/bill-ted_trans_NvBQzQNjv4BqNJjoeBT78QIaYdkJdEY4CnGTJFJS74MYhNY6w3GNbO8.jpg?imwidth=450",
    date: new Date(Date.now())
  },
  {
    poster: "Ted Logan ",
    link: "https://geekireland.com/wp-content/uploads/2017/02/Keanu-Reeves-Graham-Norton-Bill-and-Ted-3-Geek-Ireland.jpg",
    date: new Date(Date.now())
  },
  {
    poster: "Tyrion Lannister",
    link: "https://vignette.wikia.nocookie.net/vampirediaries/images/8/80/Tyrion-Lannister-Internet-Meme.jpg/revision/latest?cb=20130814014843",
    date: new Date(Date.now())
  },
  {
    poster: "Dany T",
    link: "https://i.imgflip.com/1jqz1k.jpg",
   date: new Date(Date.now())
  },
  {
    poster: "J 'Knows EvryThang' Snow",
    link: "https://sayingimages.com/wp-content/uploads/6-8-inches-jon-snow-meme.jpg",
  date: new Date(Date.now())
  }
    
   
];

db.Feed
  .remove({})
  .then(() => db.Feed.collection.insertMany(feedSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
