const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
// const withAuth = require("../utils/auth");
const _ = require('underscore');
const { route } = require("./api/movieRoutes");



router.get("/theater", async (req, res) => {
    try {
        res.render('theater')

    } catch (e) {
        res.status(500).json(err);
    }
})

// Individual Movie Data | When you click on a poster
router.get("/movie/:title", async (req, res) => {
    try {

        // Query all the data from a movie title
        const movieData = await Movie.findAll({
            where: {
                title: req.params.title
            }
        });

        // Serialize the movie data for rendering
        const data = movieData[0].get({ plain: true });

        // Render Movie Page and send it the data
        res.render('movie', {
            ...data,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})


module.exports = router;