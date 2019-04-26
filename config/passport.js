//passport 設定 passport 套件 與 策略
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//輸出中介層
module.exports = passport => {
  //[passport 策略設定]

  //1.local strategy | 修改預設 | 調資料比對
  passport.use(
    new localStorage({ usernameField: "email" }, (email, password, done) => {
      //調資料做比對
      User.findOne({ email: email }).then(user => {
        //1.user 空 查無此人 -> done 告訴 驗證器-done(null,false,{message})
        if (!user) {
          return done(null.false, { message: "申請者尚未註冊" });
        } else {
          //2.user 有 已經註冊 -> 導向登入頁面，訊息-已經有帳號，請輸入帳密登入
          return done(null.user, { message: "申請者已經註冊" });
        }
      });
    })
  );
};
