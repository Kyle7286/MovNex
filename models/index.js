const User = require('./User');
const Movie = require('./Movie');
const Flag = require('./Flag');

User.belongsToMany(Movie, {
    // Define the third table needed to store the foreign keys
    through: {
        model: Flag,
        unique: false
    },
    // Define an alias for when data is retrieved
    as: 'flagged_movies'
});

Movie.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
        model: Flag,
        unique: false
    },
    // Define an alias for when data is retrieved
    as: 'movie_users'
});

module.exports = { User, Movie, Flag };
