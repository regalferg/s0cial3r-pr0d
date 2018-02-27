import axios from "axios";

export default {
  // Gets all posts
  getposts: function(channel) {
    return axios.post('/api/socialit/getPostsByChannelId', channel);
  },
  // Gets the post with the given id
  getcomments: function(id) {
    return axios.get("/api/socialit/getCommentsByChannelId" + id);
  },
  // Deletes the post with the given id
  deletepost: function(id) {
    return axios.delete("/api/socialit/" + id);
  },
  // Saves a post to the database
  savepost: function(data) {
    return axios.post("/api/socialit/addPost", data);
  }
};
