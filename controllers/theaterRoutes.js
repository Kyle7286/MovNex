const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
// const withAuth = require("../utils/auth");
const _ = require('underscore')



router.get("/theater", async (req, res) => {
    try {
        // Query all the movie data
        const movieData = await Movie.findAll({
            attributes: ['id', 'rating', 'genre', 'trailer', 'poster',]
        })


        if (req.session.logged_in) {
            res.render("theater", {
                logged_in: req.session.logged_in,
            });
        } else {
        
        }

        const shuffle = await _.shuffle(movieData)
        res.status(200).json(shuffle);

    } catch (e) {

    }
})



module.exports = router;