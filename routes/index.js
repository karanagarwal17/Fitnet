const router = require('express').Router();

const match = require('./match');
const user = require('./user');
const venue = require('./venue');

router.use('/match', match);
router.use('/users', user);
router.use('/venue', venue);

module.exports = router;