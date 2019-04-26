//route 引入必要套件與modle
const express = require("express");
const router = express.Router();

//設計路由
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  res.render("login");
});

//匯出路由
module.exports = router;
