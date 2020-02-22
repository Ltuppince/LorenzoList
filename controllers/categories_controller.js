const express = require("express");
const router = express.Router();

const db = require("../models");

// GET route for getting all categories
router.get("/", (req, res) => {
    db.Category.findall((data) => {
        let categoriesObj = {
            categories: data
        }
        res.render("index", categoriesObj);
    });
});