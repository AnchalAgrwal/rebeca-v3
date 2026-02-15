const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();
const upload = require("../middlewares/multer");
// specifically for events
const eventAssetsUpload = upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
]);

router.post("/", eventAssetsUpload, eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.patch("/", eventAssetsUpload, eventController.updateEvent);
router.delete("/", eventController.deleteEvent);

module.exports = router;