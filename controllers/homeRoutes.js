const router = require("express").Router();
const { Movie, User, Flag } = require("../models");
const withAuth = require("../utils/auth");

// Landing Page | http://localhost:3001/
router.get("/", async (req, res) => {
  try {

    // If logged in, render theater, else go to landing page
    if (req.session.logged_in) {
      res.redirect("theater")
    } else {
      res.render("landing", {
        logged_in: req.session.logged_in,
        isLandingPage: true
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    console.log(`UserID: ${req.session.user_id}`);

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("profile", {
      ...user,
      logged_in: true,
      page: "profile"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Saved Movies | http://localhost:3001/profile/saved
router.get("/profile/saved", withAuth, async (req, res) => {
  try {

    // console.log(`UserID: ${req.session.user_id}`);
    // Find the logged in user based on the session ID
    const saveData = await Flag.findAll({
      include: [
        {
          model: Movie
        },
      ],
      where: {
        user_id: req.session.user_id,
        flag: 1
      }
    });

    // Serialize data
    const movies = saveData.map((element) => element.get({ plain: true }));
    console.log(movies);

    // Render the list of movies
    res.render('saved', {
      movies,
      logged_in: req.session.logged_in,
      saved: true
    })

  } catch (err) {
    res.status(500).json(err);
  }
});



// Maybe Movies | http://localhost:3001/profile/maybe
router.get("/profile/maybe", withAuth,  async (req, res) => {
  try {

    console.log(`UserID: ${req.session.user_id}`);
    // Find the logged in user based on the session ID
    const saveData = await Flag.findAll({
      include: [
        {
          model: Movie
        },

      ],
      where: {
        user_id: req.session.user_id,
        flag: 2
      }
    });

    // Serialize data
    const movies = saveData.map((element) => element.get({ plain: true }));
    console.log(movies);

    // Render the list of movies
    res.render('maybe', {
      movies,
      logged_in: req.session.logged_in,
      page: "maybe"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Pass Movies | http://localhost:3001/profile/pass
router.get("/profile/pass",  withAuth, async (req, res) => {
  try {

    console.log(`UserID: ${req.session.user_id}`);
    // Find the logged in user based on the session ID
    const saveData = await Flag.findAll({
      include: [
        {
          model: Movie
        },

      ],
      where: {
        user_id: req.session.user_id,
        flag: 0
      }
    });

    // Serialize data
    const movies = saveData.map((element) => element.get({ plain: true }));
    console.log(movies);

    // Render the list of movies
    res.render('pass', {
      movies,
      logged_in: req.session.logged_in,
      pass: true
    })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Seen Movies | http://localhost:3001/profile/seen
router.get("/profile/seen",  withAuth, async (req, res) => {
  try {

    console.log(`UserID: ${req.session.user_id}`);
    // Find the logged in user based on the session ID
    const saveData = await Flag.findAll({
      include: [
        {
          model: Movie
        },

      ],
      where: {
        user_id: req.session.user_id,
        flag: 3
      }
    });

    // Serialize data
    const movies = saveData.map((element) => element.get({ plain: true }));
    console.log(movies);

    // Render the list of movies
    res.render('seen', {
      movies,
      logged_in: req.session.logged_in,
      seen: true
    })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login",  (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/theater");
    return;
  }

  res.render("login");
});

// Signup page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

module.exports = router;
