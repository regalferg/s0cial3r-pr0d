const router = require("express").Router();
const chatController = require("../../controllers/chatController");


router.route("/sendMessage")
    .post(chatController.sendMessage);
router.route("/isAllowedIntoChat")
    .post(chatController.isAllowedIntoChat);
router.route("/getMessages")
    .post(chatController.getMessages);
router.route("/getChat")
    .post(chatController.getChat);
router.route("/goToChat/:id")
    .get(chatController.goToChat);






module.exports = router;
