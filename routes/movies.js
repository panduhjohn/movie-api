const express = require('express');
const router = express.Router();

// const Movies = require('../models/Movies');

const movieController = require('../controllers/movieController')

router.get('/', movieController.renderIndex);
router.get('/addmovie', movieController.renderAddMovies);

router.get('/getallmovies', movieController.getAllMovies);
router.get('/foundmovie', movieController.foundMovies);
router.post('/addmovie', movieController.addMovie);
router.put('/:title', movieController.updateMovie);
router.delete('/:title', movieController.deleteMovie);
router.get('/findmovie', movieController.findMovie);


module.exports = router;
