const express = require("express");
const router = express.Router();

const db = require("../models");

// GET route for getting all items for sale
router.get("/", (req, res) => {
    db.Item.findAll((data) => {
        let itemObj = {
            items: data
        };
        res.render("index", itemObj);
    });
});

// --------------  WILL THESE NEXT TWO ROUTES BE HANDLED ALL IN FRONT END ONLY??

// GET route for getting all items by a title
router.get("/api/items/:title", (req, res) => {
    db.Item.findAll({
        where: {
            title: req.params.title
        }
    }).then((result) => {
        res.render("index", {items: result});
    });
});


// GET route for getting all items by category
router.get("/api/items/:category", (req, res) => {
    db.Item.findAll({
        where: {
            category: req.params.category_id
        }
    }).then((result) => {
        res.render("index", {items: result});
    });
});

module.exports = router;