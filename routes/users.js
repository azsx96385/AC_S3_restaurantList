//route 引入必要套件與modle
const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
  const { name, email, password, passwordConfirm } = req.body;

  //1.檢查輸入格式 | 資料是否漏填 | 密碼是否依樣
  if (!name || !email || !password || !passwordConfirm) {
  }
  if (password !== passwordConfirm) {
  }

  User.findOne({ email: email }).then(user => {
    if (!user) {
      console.log("申請者不存在，正在準備申請程序");
    } else {
      console.log("申請者存在，重新導向登入頁面");
    }
  });
  //2.調出資料作比對
  res.render("register");
});

router.get("/logout", (req, res) => {
  res.render("login");
});

//匯出路由
module.exports = router;
