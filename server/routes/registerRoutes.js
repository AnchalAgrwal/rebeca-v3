const express = require('express')
const router = express.Router()
const regController = require("../controllers/registerController")


router.post("/", regController.createReg)
router.patch("/", regController.updateReg)
router.delete("/:id", regController.deleteReg)
router.get("/all", regController.getAllReg)
router.get("/:id", regController.getAllUserRegs)

module.exports = router