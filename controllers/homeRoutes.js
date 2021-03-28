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
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
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
