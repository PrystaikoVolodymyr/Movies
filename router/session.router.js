const router = require('express').Router();
const sessionController = require('../controller/session.controller');

router.post('/', ( req, res, next) => {
    sessionController.openSession(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

module.exports = router;