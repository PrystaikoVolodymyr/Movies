const router = require('express').Router();
const userRouter = require('./user.router');
const sessionRouter = require('./session.router');
const movieRouter = require('./movie.router')

router.use('/users', userRouter);
router.use('/sessions', sessionRouter);
router.use('/movies', movieRouter);

module.exports = router;