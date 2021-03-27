const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
const withAuth = require("../utils/auth");
const _ = require('underscore')



router.get("/theater", async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            attributes: ['id', 'title', 'year', 'rating', 'genre', 'trailer', 'poster',]
        })


        if (req.session.logged_in) {
            res.render("theater", {
                logged_in: req.session.logged_in,
            });
        } else {
        }

        res.status(200).json(_.shuffle(movieData))

    } catch (e) {

    }
})



module.exports = router;