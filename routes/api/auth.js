const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route("/logout")
    .get(authController.logout);


module.exports = router;