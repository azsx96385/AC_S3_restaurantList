//如果沒有驗證，就強制返回登入頁面 | 認證中介曾

module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("errorMessage", "請先登入在使用喔!");
      res.redirect("/users/login");
    }
  }
};
