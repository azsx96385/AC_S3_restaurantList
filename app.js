//匯入必要套件&資料-------------------------------------------------------------------------
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
//const resterant_data = require("./restaurant.json").results;
const resModel = require("./models/restaurant");
const bdParser = require("body-parser");
const methodOverride = require("method-override");

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
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error ");
});
db.once("open", () => {
  console.log(" mongodb connected ");
});

//[設定] body-parser
app.use(bdParser.urlencoded({ extended: true }));

//[設定] method-override
app.use(methodOverride("_method"));
//路由區--------------------------------------------------------------------------------------

//靜態檔案路由
app.use(express.static("public"));
app.use("/", require("./routes/index"));
app.use("/restaurant", require("./routes/restaurant"));
