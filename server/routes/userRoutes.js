const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multer");

// Add your admin routes here
router.get("/", userController.getAllUsers);
// router.patch("/", upload.single("image"), userController.updateUser);
router.patch("/", userController.updateUser);
module.exports = router;