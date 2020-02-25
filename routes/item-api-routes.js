// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  // GET route for all items
  app.get("/api/items", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Item.findAll({
        // where: query,
        include: [{model: db.User, as: "User"}]
      }).then(function(dbItem) {
        // res.json(dbItem);
        let itemObj = {
          items: dbItem
        }
        res.render("../views/index", itemObj);
        console.log(itemObj.items);
      });
    }
  });

  // GET route for single item
  app.get("/api/items/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      console.log(dbItem);
      res.json(dbItem);
    });
  });

  // POST route for saving new item
  app.post("/api/items", function(req, res) {
    db.Item.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });


  // DELETE route for deleting item
  app.delete("/api/items/:id", function(req, res) {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // PUT route for updating items
  app.put("/api/items", function(req, res) {
    db.Item.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

};