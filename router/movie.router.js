const router = require('express').Router();
const  multer = require('multer')
const movieController = require('../controller/movie.controller');
const { auth } = require('../middleware/session.middleware')

const storage = multer.memoryStorage(); // Store uploaded file in memory
const upload = multer({ storage });

router.post('/', auth, ( req, res, next) => {
    movieController.addFilm(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

router.delete('/:id', auth, ( req, res, next) => {
    movieController.deleteFilm(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

router.patch('/:id', auth, ( req, res, next) => {
    movieController.updateFilm(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

router.get('/:id', auth,( req, res, next) => {
    movieController.getById(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

router.get('/', auth, ( req, res, next) => {
    movieController.filmFilter(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

router.post('/import', auth, upload.single('movies'),( req, res, next) => {
    movieController.importFromFile(req, res)
        .then(data => data.status === 'success' ? res.json(data) : res.status(400).json(data))
        .catch(err => next(err))
});

module.exports = router;