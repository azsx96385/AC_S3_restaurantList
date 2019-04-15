//匯入必要套件&資料-------------------------------------------------------------------------
const express = require("express");
const exphbs = require("express-handlebars");
const resterant_data = require("./restaurant.json").results;

//express
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log("start listening http://localhost:3001");
});

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//路由區--------------------------------------------------------------------------------------

//靜態檔案路由
app.use(express.static("public"));

//一般-首頁路由
app.get("/", (req, res) => {
  res.render("index", { restaurants: resterant_data });
});

//一般-內頁路由
app.get("/restaurants/:id", (req, res) => {
  let id = req.params.id;
  data = resterant_data.filter(item => item.id == id);
  res.render("show", { restaurant_data: data[0] });
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
