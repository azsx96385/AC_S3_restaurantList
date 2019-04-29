//使用種子-新建兩個使用者
//引入model & mongoose
const mongoose = require("mongoose");
const userModel = require("../user");
const bcrypt = require("bcryptjs");

//啟動連線
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true });

//接收connection 物件
const db = mongoose.connection;

//啟動監聽
db.on("erroe", () => {
  console.log("mongodb erroe!!");
});
db.on("open", () => {
  console.log(" mongodb connected ");

  let username = "user";

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("123456", salt, (err, hash) => {
      if (err) throw err;

      for (let i = 0; i < 2; i++) {
        userModel.create({
          name: username + i,
          email: "user" + i + "@user.com",
          password: hash
        });
      }
    });
  });

  console.log("done!!");
});
