const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/uploadMeme")
    .post(userController.uploadMeme);
router.route("/getFriends")
    .get(userController.getFriends);
router.route("/getFeed")
    .get(userController.getFeed);
router.route("/getMemes")
    .get(userController.getMemes);
router.route("/getMemesByUser")
    .post(userController.getMemesByUser);
router.route("/getSession")
    .get(userController.getSession);
router.route("/getUser")
    .post(userController.getUser);
router.route("/getChats")
    .get(userController.getChats);
router.route("/updateProfile")
    .post(userController.updateProfile);
router.route("/seed")
    .get(userController.seed);
router.route("/getChats")
    .get(userController.getChats);
router.route("/getAvatars")
    .post(userController.getAvatars);
router.route("/getAll")
    .get(userController.getAll);





module.exports = router;
