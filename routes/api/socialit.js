const router = require("express").Router();
const socialitController = require("../../controllers/socialitController");

// Matches with "/api/socialit"
// router.route("/channel")
//   .get(socialitController.findAll)
//   .post(socialitController.addPost);

// Matches with "/api/socialit/:id"
// router
//   .route("/:id")
//   .get(socialitController.findById)
//   .put(socialitController.update)
//   .delete(socialitController.remove);
router.route("/getCommentsByChannelId")
.post(socialitController.getCommentsByChannelId);
  
  router.route("/getPostsByChannelId")
  .post(socialitController.getPostsByChannelId);

  router.route("/addPost")
    .post(socialitController.addPost);
module.exports = router;
