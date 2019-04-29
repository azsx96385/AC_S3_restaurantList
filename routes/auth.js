//route 引入必要套件與modle
const express = require("express");
const router = express.Router();
const passport = require("passport");
//設計路由
//設定路由區
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })
); //

//匯出路由
module.exports = router;
