// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  // GET route for all categories
  app.get("/api/categories", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Category.findAll({}).then(function(dbCategory) {
        res.json(dbCategory);
      });
    }
  });

  // GET route for single Category
  app.get("/api/categories/:id", function(req, res) {
    db.Category.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCategory) {
      console.log(dbCategory);
      res.json(dbCategory);
    });
  });

  // POST route for saving new Category
  app.post("/api/categories", function(req, res) {
    db.Category.create(req.body).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

};