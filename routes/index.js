const router = require('express').Router();

const event = require('./event');
const user = require('./user');
const venue = require('./venue');

router.use('/event', event);
router.use('/users', user);
router.use('/venue', venue);

module.exports = router;