const sequelize = require('../config/connection');
const { User, Movie, Flag } = require('../models');

const userData = require('./userData.json');
const movieData = require('./movieData.json');
const flagData = require('./flagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const movies = await Movie.bulkCreate(movieData, {
    individualHooks: true,
    returning: true,
  });

  const flags = await Flag.bulkCreate(flagData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
