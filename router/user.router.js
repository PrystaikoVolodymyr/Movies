const router = require('express').Router();
const userController  = require('../controller/user.controller');

router.post('/', ( req, res, next) =>
    userController.createUser(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
);

module.exports = router;