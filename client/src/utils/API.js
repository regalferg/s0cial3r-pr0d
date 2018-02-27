import axios from "axios";

export default {
  signin: function (formData) {
    return axios.post("/signin", formData);
  },
  // Gets all memes
  getFeeds: function () {
    return axios.get("/api/feeds");
  },
  getFeed: function (id) {
    return axios.get("/api/feeds" + id);
  },
  // Saves memes to the database
  saveFeed: function (feedData) {
    return axios.post("/api/feeds", feedData);
  },
  getSessionData: function () {
    return axios.get('/api/user/getSession');
  },
  destroySession: function() {
    return axios.get('/api/auth/logout');
  },
  getMemesByUser: function (user) {
    return axios.post('/api/user/getMemesByUser', user);
  },
  uploadMeme: function (meme) {
    return axios.post('/api/user/uploadMeme', meme);
  },
  postMeme: function (feedData) {
    return axios.post("/api/channel", feedData);
  },
  addMeme: function (data) {
    return axios.post("/api/channel/addMeme", data);
  },
  getMemesByChannelName: function (channel) {
    return axios.post('/api/channel/getMemesByChannelName', channel);
  },
  // getMemesByChannelTwitchId: function () {
  //   return axios.post('/api/channel/getMemesByChannelTwitchId', channelTwitchId);
  // },
  getMemesByChannelId: function (channelId) {
    return axios.post('/api/channel/getMemesByChannelId', channelId);
  },
  createChannel: function (channel) {
    return axios.post('/api/channel/createChannel', channel);
  },
  getUserData: function(username) {
    return axios.post("/api/user/getUser", username);
  },
  updateProfile: function(profile) {
    return axios.post("/api/user/updateProfile", profile);
  },
  getChats: function() {
    return axios.get("/api/user/getChats");
  },
  sendMessage: function(message) {
    return axios.post("/api/chat/sendMessage", message);
  },
  isAllowedIntoChat: function(data) {
    return axios.post("/api/chat/isAllowedIntoChat", data);
  },
  getMessages: function(data) {
    return axios.post("/api/chat/getMessages", data);
  },
  getChat: function(data) {
    return axios.post("/api/chat/getChat", data);
  },
  getAllUsers: function() {
    return axios.get("/api/user/getAll");
  },
  goToChat: function(userId) {
    return axios.get(`/api/chat/goToChat/${userId}`);
  }


}
