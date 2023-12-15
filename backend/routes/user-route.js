const express = require("express");
const router = express.Router();
const {
  getUserId,
  postSignUp,
  postSignIn,
} = require("../controllers/userController");

router.get("/userId", getUserId);

router.post("/signup", postSignUp);

router.post("/signin", postSignIn);

module.exports = router;
