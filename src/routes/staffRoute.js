const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const auth = require("../middleware/auth");

router.get("/", staffController.getStaffs);

router.get("/:id", staffController.getStaffById);

router.put("/:id",  staffController.editWholeStaff);

router.post("/register", staffController.register);
router.post("/login", staffController.login);

module.exports = router;