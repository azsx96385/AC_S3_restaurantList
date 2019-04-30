//passport 設定 passport 套件 與 策略
const localStrategy = require("passport-local").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//輸出中介層
module.exports = passport => {
  //[passport 策略設定]

  //1.local strategy | 修改預設 | 調資料比對
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //調資料做比對
      User.findOne({ email: email }).then(user => {
        //1.user 空 查無此人 -> done 告訴 驗證器-done(null,false,{message})
        if (!user) {
          return done(null, false, { message: "申請者尚未註冊" });
        } else {
          //2.比對密碼雜湊化處理後，是否相同
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "密碼錯誤" });
            }
          });
        }
      });
    })
  );

  //2.facebook
  passport.use(
    new facebookStrategy(
      {
        //輸入 facebook app 基本資訊
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        //拿取得的email，用model調出資料，做比對
        User.findOne({ email: profile._json.email }).then(user => {
          if (user) {
            //有調到資料->獲准登入
            done(null, user);
          } else {
            //資料庫查無此人->新增使用者資料到資料庫 ( name,email,password )->在回傳該物件，代表成功

            //處理密碼加密
            bcrypt.genSalt(10, (err, salt) => {
              if (err) throw err;
              bcrypt.hash("123456", salt, (err, hash) => {
                let fbUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                });

                fbUser
                  .save()
                  .then(user => {
                    done(null, fbUser);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            });
          }
        });
      }
    )
  );

  //正反序列化
  //2.log session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
