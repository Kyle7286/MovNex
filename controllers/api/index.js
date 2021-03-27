const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);


module.exports = router;
