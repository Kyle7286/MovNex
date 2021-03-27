const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
// const withAuth = require("../utils/auth");
const _ = require('underscore')



router.get("/theater", async (req, res) => {
    try {
        res.render('theater')

    } catch (e) {

    }
})



module.exports = router;