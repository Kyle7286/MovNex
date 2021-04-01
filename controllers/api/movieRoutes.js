const router = require("express").Router();
const { Movie, User, Flag } = require("../../models");
const _ = require('underscore')
const withAuth = require('../../utils/auth');

// Get Movie Array JSON | http://localhost:3001/api/movies
router.get("/", async (req, res) => {
    try {
        // Query all the movie data
        const movieData = await Movie.findAll({
            attributes: ['id', 'rating', 'genre', 'trailer', 'poster',]
        })

        // Shuffle the array
        const shuffle = _.shuffle(movieData)

        // Send the movie data
        res.status(200).json(shuffle);

    } catch (e) {
        res.status(500).json(e);
    }
})

// Create/Update FlagMovie Route | http://localhost:3001/api/movies/flag
router.post('/flag', withAuth, async (req, res) => {
    try {
        
        console.log(req.body);
        // check if there is a flag or not in the database
        const queryUM = await Flag.findAll({
            where: {
                user_id: req.session.user_id,
                movie_id: req.body.movie_id,
            }
        });
        // Create movie is req doesnt exist already, else update it if it does
        if (queryUM == "") {
            console.log(`UM association not found! Will create one now...`);
            const newFlag = await Flag.create({
                user_id: req.session.user_id,
                movie_id: req.body.movie_id,
                flag: req.body.flag
            });
            res.status(200).json(newFlag)
        } else {
            console.log(`UM association found! Update a movie user association`);
            const updateFlag = await Flag.update({
                flag: req.body.flag
            }, {
                where: {
                    user_id: req.session.user_id,
                    movie_id: req.body.movie_id
                },
            });
            res.status(200).json(updateFlag)
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json(err);
    }
});

// Delete UserMovieFlag from DB | http://localhost:3001/api/movies/flag
router.delete("/flag", withAuth, async (req, res) => {
    try {
        console.log(`BODY: ${req.body}`);
        console.log(`USER: ${req.session.user_id}`);

        // Query all the movie data
        const flagData = await Flag.destroy({
            where: {
                movie_id: req.body.movie_id,
                user_id: req.session.user_id,
            },
        });

        // If data not found, respond back with error
        if (!flagData) {
            res.status(404).json({ message: 'No association found with this user id!' });
            return;
        }

        // Send a successfull response
        res.status(200).json(flagData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})

module.exports = router;