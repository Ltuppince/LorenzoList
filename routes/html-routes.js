// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var fs = require("fs");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/newitem", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newitem.html"));
  });

  app.get("/messages", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/messages.html"));
  });

  app.get("/message/:id", isAuthenticated, function(req, res) {
    let msgId = req.params.id;
    fs.readFile(path.join(__dirname, "../public/lib/message.template.html"), function(err, buf) {
      console.log(buf.toString());
      buf = buf.toString().replace("{{MESSAGE_ID}}", msgId);
      fs.writeFile(path.join(__dirname, "../public/messageView.html"), buf, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        res.sendFile(path.join(__dirname, "../public/messageView.html"));
      });
    });

  });


};