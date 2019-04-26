//route 引入必要套件與modle
const express = require("express");
const router = express.Router();

//設計路由
router.get("/facebook", (req, res) => {
  res.render("login");
});
router.get("/facebook/callback", (req, res) => {
  res.render("login");
});

//匯出路由
module.exports = router;
