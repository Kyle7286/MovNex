const router = require("express").Router();
const { Movie, User, Flag } = require("../../models");
const _ = require('underscore')

router.get("/", async (req, res) => {
    try {
        // session id


        // Query all the movie data
        const movieData = await Movie.findAll({
            attributes: ['id', 'rating', 'genre', 'trailer', 'poster',]
        })

        // Shuffle the array
        const shuffle = _.shuffle(movieData)

        // Send the movie data
        res.status(200).json(shuffle);

    } catch (e) {

    }
})



module.exports = router;