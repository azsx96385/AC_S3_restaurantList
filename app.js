//匯入必要套件&資料-------------------------------------------------------------------------
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
//const resterant_data = require("./restaurant.json").results;
const resModel = require("./models/restaurant");

//[設定] express
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log("start listening http://localhost:3001");
});

//[設定] handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//[設定] mongoose
mongoose.connect("mongodb://127.0.0.1/restaurant");
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error ");
});
db.once("open", () => {
  console.log(" mongodb connected ");
});

//路由區--------------------------------------------------------------------------------------

//靜態檔案路由
app.use(express.static("public"));

//1. 首頁顯示
app.get("/", (req, res) => {
  resModel.find((err, resterant_data) => {
    res.render("index", { restaurants: resterant_data });
  });
});

//2. 瀏覽單個餐廳詳細資訊
app.get("/restaurants/:id", (req, res) => {
  let id = req.params.id;
  //data = resterant_data.filter(item => item.id == id);
  resModel.findById(id, (err, rest_data) => {
    res.render("show", { restaurant_data: rest_data });
  });
});

app.get("/search", (req, res) => {
  let keyword = req.query.keyword;
  data = resterant_data.filter(
    item =>
      item.name.includes(keyword) ||
      item.name_en.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render("index", { restaurants: data });
});
