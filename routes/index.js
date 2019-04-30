//引用 express.Router() | model

const express = require("express");
const router = express.Router();
const resModel = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//路由設定

//1. 首頁顯示
router.get("/", authenticated, (req, res) => {
  console.log(req.user._id);
  resModel
    .find({ userId: req.user._id })
    .then(resterant_data => {
      console.log(resterant_data);
      res.render("index", { restaurants: resterant_data });
    })
    .catch(err => {
      console.log(err);
    });
});

//匯出
module.exports = router;
