//匯入必要套件&資料-------------------------------------------------------------------------
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
//const resterant_data = require("./restaurant.json").results;
const resModel = require("./models/restaurant");
const bdParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

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

//[設定] session
app.use(session({ secret: "okok" }));

// //[設定] passport
// app.use(passport.initialize());
// app.use(passport.session());
// require("./config/passport")(passport);

//[設定] 系統訊息
app.use(flash());

//[設定] res.local
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errMessage = req.flash("errMessage");

  next();
});
//路由區--------------------------------------------------------------------------------------

//靜態檔案路由
app.use(express.static("public"));
app.use("/", require("./routes/index"));
app.use("/restaurant", require("./routes/restaurant"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
