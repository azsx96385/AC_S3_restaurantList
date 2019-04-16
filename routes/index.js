//引用 express.Router() | model

const express = require("express");
const router = express.Router();
const resModel = require("../models/restaurant");

//路由設定

//1. 首頁顯示
router.get("/", (req, res) => {
  resModel.find((err, resterant_data) => {
    res.render("index", { restaurants: resterant_data });
  });
});

//匯出
module.exports = router;
