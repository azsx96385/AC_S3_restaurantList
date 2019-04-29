//引用 express.Router() | model

const express = require("express");
const router = express.Router();
const resModel = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//路由設定

//2. 瀏覽單個餐廳詳細資訊
router.get("/show/:id", authenticated, (req, res) => {
  let id = req.params.id;
  //data = resterant_data.filter(item => item.id == id);
  resModel.findById(id, (err, rest_data) => {
    res.render("show", { restaurant_data: rest_data });
  });
});

//3. 新增單一個餐廳
router.get("/create", authenticated, (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {
  let newData = req.body;
  console.log(newData);
  const resdata = resModel(req.body);
  resdata.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

//4. 修改單一個餐廳
router.get("/:id/edit", (req, res) => {
  resModel.findById(req.params.id, (err, resdata) => {
    res.render("edit", { resdata });
  });
});
router.put("/:id/edit", (req, res) => {
  resModel.findById(req.params.id, (err, resdata) => {
    let updatelist = [
      "name",
      "name_en",
      "category",
      "image",
      "location",
      "phone",
      "google_map",
      "rating",
      "description"
    ];

    updatelist.forEach(item => {
      resdata[item] = req.body[item];
    });

    resdata.save(err => {});
    return res.redirect("/");
  });
});

//5.delete 刪除資料
router.delete("/:id/delete", (req, res) => {
  resModel.findById(req.params.id, (err, resdata) => {
    resdata.remove(err => {
      return res.redirect("/");
    });
  });
});

//6. search bar
router.get("/search", (req, res) => {
  let keyword = req.query.keyword;
  resModel.find((err, alldata) => {
    data = alldata.filter(
      item =>
        item.name.includes(keyword) ||
        item.name_en.toLowerCase().includes(keyword.toLowerCase())
    );
    res.render("index", { restaurants: data });
  });
});

//7. 排序 | name catagory location
router.get("/sort/:type", (req, res) => {
  const type = req.params.type;

  if (type === "name") {
    resModel
      .find()
      .sort({ name: "desc" })
      .exec((err, resterant_data) => {
        res.render("index", { restaurants: resterant_data });
      });
  } else if (type === "category") {
    resModel
      .find()
      .sort({ category: "desc" })
      .exec((err, resterant_data) => {
        res.render("index", { restaurants: resterant_data });
      });
  } else if (type === "location") {
    resModel
      .find()
      .sort({ location: "desc" })
      .exec((err, resterant_data) => {
        res.render("index", { restaurants: resterant_data });
      });
  }
});

//匯出
module.exports = router;
