// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app) {
  // GET route for all users
  app.get("/api/users", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.User.findAll({
        include: [db.Item]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    }
  });

  // GET route for single author
  app.get("/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Item]
    }).then(function(dbUser) {
      let userObj = {
        user: dbUser
      }
      // res.json(dbUser);
      res.render("../views/user", userObj);
      console.log(userObj);
    });
  });

  // POST route for saving new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // DELETE route for deleting user
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // PUT route for updating users
  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};