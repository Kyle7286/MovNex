const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const theaterRoutes = require('./theaterRoutes');

router.use('/', homeRoutes);
router.use('/', theaterRoutes);
router.use('/api', apiRoutes);

module.exports = router;
