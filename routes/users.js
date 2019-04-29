//route 引入必要套件與modle
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");

//設計路由
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  //1.檢查輸入格式 | 資料是否漏填 | 密碼是否依樣
  let errorMessage = [];
  //送出資料驗證-是否缺填
  if (!name || !email || !password || !passwordConfirm) {
    //訊息-資料都是必填
    errorMessage.push({ message: "資料都是必填" });
  }
  //送出資料驗證-驗證密碼是否一致
  if (password !== passwordConfirm) {
    //訊息-密碼驗證不一致，再檢查一下
    errorMessage.push({ message: "密碼驗證不一致，再檢查一下" });
  }

  //回傳錯誤訊息
  if (errorMessage.length > 0) {
    res.render("register", {
      name,
      email,
      password,
      passwordConfirm,
      errorMessage
    });
  } else {
    //2.調出資料作比對
    User.findOne({ email: email }).then(user => {
      if (!user) {
        console.log("申請者不存在，正在準備申請程序");
        //密碼雜湊處理
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            //修改雜湊後的密碼
            let password = hash;
            //使用model 建立 entity
            let registerData = new User({
              name,
              email,
              password
            });

            //使用 entity 存到資料庫
            registerData
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          });
        });
      } else {
        console.log("申請者存在，重新導向登入頁面");
        res.render("login", { successMessage: "您已有帳號，請登入使用" });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout(); //清除session
  req.flash("successMessage", "你已經成功登出!!"); //在app.js 我們有將successMessafe 存到 res.locals ，就會被view 使用
  res.redirect("/users/login");
});

//匯出路由
module.exports = router;
