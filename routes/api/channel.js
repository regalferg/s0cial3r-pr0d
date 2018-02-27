const router = require("express").Router();
const channelController = require("../../controllers/channelController");


router.route("/:channel")
    .get(channelController.getMemesByChannelName);

    router.route("/")
    .post(channelController.postMeme);
    router.route("/addMeme")
    .post(channelController.addMeme);
router.route("/getMemesByChannelId")
    .post(channelController.getMemesByChannelId);
router.route("/getMemesByChannelTwitchId")
    .post(channelController.getMemesByChannelTwitchId);
router.route("/createChannel")
    .post(channelController.createChannel);
    router.route("/getMemesByChannelName")
    .post(channelController.getMemesByChannelName);

    





module.exports = router;
