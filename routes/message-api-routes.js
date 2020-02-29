// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const { Op } = require("sequelize");
module.exports = function(app) {
  // GET route for all messages
  app.get("/api/messages", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Message.findAll({
        where: query,
        include: [db.User]
      }).then(function(dbMessage) {
        res.json(dbMessage);
      });
    }
  });

  app.get("/api/messages/user/:id", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Message.findAll({
        where: {
          [Op.or]: [
            { AuthorId: req.params.id },
            { RecipientId: req.params.id }
          ]
        }
      }).then(function(dbMessage) {
        res.json(dbMessage);
      });
    }
  });

  app.get("/api/messages/sender/:id", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Message.findAll({
        where: { AuthorId: req.params.id }
      }).then(function(dbMessage) {
        res.json(dbMessage);
      });
    }
  });

  app.get("/api/messages/recipient/:id", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.Message.findAll({
        where: { RecipientId: req.params.id }
      }).then(function(dbMessage) {
        res.json(dbMessage);
      });
    }
  });


  // GET route for single Message
  app.get("/api/messages/:id", function(req, res) {
    db.Message.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbMessage) {
      console.log(dbMessage);
      res.json(dbMessage);
    });
  });

  // POST route for saving new Message
  app.post("/api/messages", function(req, res) {
    db.Message.create(req.body).then(function(dbMessage) {
      res.json(dbMessage);
    });
  });


  // DELETE route for deleting Message
  app.delete("/api/messages/:id", function(req, res) {
    db.Message.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMessage) {
      res.json(dbMessage);
    });
  });

};