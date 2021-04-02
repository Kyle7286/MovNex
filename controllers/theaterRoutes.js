const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
// const withAuth = require("../utils/auth");


const _ = require('underscore');



router.get("/theater", async (req, res) => {
    try {
        res.render('theater', {
            logged_in: req.session.logged_in,
            theater: true
        })

    } catch (e) {
        res.status(500).json(err);
    }
})

// All Movies | http://localhost:3001/movies/
router.get("/movies/", async (req, res) => {
    try {
        // Query all the data from a movie title
        const movieData = await Movie.findAll({
            attributes: ['title', 'poster']
        });

        // Serialize the movie data for rendering
        const movies = movieData.map((element) => element.get({ plain: true }));

        console.log(movies);
        // Render Movie Page and send it the data
        res.render('movies', {
            movies,
            logged_in: req.session.logged_in,
            page: "movies"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})

// When you click on a poster | http://localhost:3001/movies/braveheart
router.get("/movies/:title", async (req, res) => {
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
        res.render('movieinfo', {
            ...data,
            logged_in: req.session.logged_in,
            page: "movieinfo"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})


module.exports = router;