// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  app.get("/api/item", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Item.findAll({}).then(function(dbItem) {
        res.json(dbItem);
      });
    }
  });

};