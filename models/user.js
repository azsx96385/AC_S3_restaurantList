//使用 express Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//設定 Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, //移除確認密碼欄位
  date: { type: Date, default: Date.now }
});

//匯出
module.exports = mongoose.model("users", userSchema);
