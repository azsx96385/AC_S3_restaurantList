//引入套件 | model | json

const mongoose = require("mongoose");
const resModel = require("../restaurant");
const resJson = require("../../restaurant.json");
const resdata = resJson.results;
//啟動連線
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true });

//接收connection 物件
const db = mongoose.connection;

//啟動監聽
db.on("error", () => {
  console.log("mongodb error!!");
});

db.once("open", () => {
  console.log("mongodb connected");

  resdata.forEach(item => {
    resModel.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    });
  });

  console.log("Done!!");
});
