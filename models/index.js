const User = require('./User');
const Movie = require('./Movie');
const Flag = require('./Flag');

User.belongsToMany(Movie, {

    through: {
        model: Flag,
        unique: false
    },
    as: 'x'

});

Movie.belongsToMany(User, {
    through: {
        model: Flag,
        unique: false
    },
    as: 'y'
});

module.exports = { User, Movie, Flag };
