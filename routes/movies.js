const express = require('express');
const router = express.Router();

const Movies = require('../models/Movies')

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

//! get all movies
router.get('/getallmovies', (req, res) => {
    Movies.find({})
        .then((movies) => {
            res.render('viewMovies', {movies: movies})
        })
        .catch(err => res.status(500).json({message: 'Server Error', err}))
})

router.get('/addmovie', (req, res) => {
    return res.render('addMovie')
})

router.get('/', (req, res) => {
    Word.find({})
        .then(words => {
            // return res.status(200).json(words);
            res.render('viewDictionary', { words: words });
        })
        .catch(err => res.status(500).json({ message: 'Server Error', err }));
});

//! add a movie
router.post('/addmovie', (req, res) => {
    // const { title, rating, synopsis, releaseYear, genre, director, boxOffice} = req.body
    //validate input
    if (!req.body.title || !req.body.rating || !req.body.synopsis || !req.body.releaseYear || !req.body.genre || !req.body.director || !req.body.boxOffice) {
        return res.status(400).json({ message: 'All inputs must be filled' });
    }

    //check to see if word is unique
    // use the word model and the .findOne mongoose method to compare word in the DB to the input word (req.body.word)
    Movies.findOne({ title: req.body.title })
        .then(movie => {
            //if the movie is found return the message "movie is already listed in DB"
            if (movie) {
                return res.status(500).json({ message: 'Movie is already listed in database' });
            }
            // Create a new movie based on Schema characteristics
            const newMovie = new Movies();
            newMovie.title = req.body.title;
            newMovie.rating = req.body.rating;
            newMovie.synopsis = req.body.synopsis;
            newMovie.releaseYear = req.body.releaseYear;
            newMovie.genre = req.body.genre;
            newMovie.director = req.body.director;
            newMovie.boxOffice = req.body.boxOffice;

            //add the movie to db
            newMovie
                .save()
                .then(movie => {
                    return res
                        .status(200)
                        .json({ message: 'Movie added sucessfully', movie: movie });
                })
                .catch(err => {
                    return res
                        .status(500)
                        .json({ message: 'Movie was not created', err });
                });
        })
        .catch(err => {
            return res.status(500).json({ message: 'Server Error', err });
        });
});

//! Update movie
router.put('/:title', (req, res) => {
    // find movie based on parameters
    Movies.findOne({ title: req.params.title })
        .then(movie => {
            if (movie) {
                //redefine definition
                movie.title = req.body.title ? req.body.title : movie.title;
                movie.synopsis = req.body.synopsis ? req.body.synopsis : movie.synopsis;
                //? alternate to ternary statement above
                // if (req.body.definition) {
                //     return (word.definition = req.body.definition)
                // } else {
                //     return
                // }

                // save new movie
                movie.save()
                    .then(updated => res.status(200).json({ message: 'Movie updated', updated }))
                    .catch(err => res.status(400).json({ message: 'Movie not updated', err }));
            } else {
                return res.status(200).json({ message: 'Movie not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Server Error', err }));
});

//! delete a Movie
router.delete('/:title', (req, res) => {
    Movies.findOneAndDelete({ title: req.params.title })
        .then(movie => {
            if (movie) {
                return res.status(200).json({ message: 'Movie Deleted', movie });
            } else {
                return res.status(400).json({ message: 'No movie to delete' });
            }
        })
        .catch(err =>
            res.status(400).json({ message: 'Movie not deleted', err })
        );
});

module.exports = router;

// User should be able to see all movies in the database
// User should be able to add a movie
// User should be able to search for a movie and see the information (on the same page)
// User should be able to update information about the move, but NOT the unique values or the id (only in postman not using an ejs page)
// User should be able to delete a word from the database (this should work only in postman not on a page)

// //render addword page
// router.get('/addword', (req, res) => {
//     return res.render('addWord');
// });

// //render findword page
// router.get('/findword', (req, res) => {
//     return res.render('findWord', { word: null });
// });

// router.get('/foundword', (req, res) => {
//     // find the word we are searching for based on searchbox query in findWord.ejs
//     Word.findOne({ word: req.query.word })
//         .then(word => {
//             if (word) {
//                 //render the findword page
//                 return res.render('findWord', { word });
//             } else {
//                 return res.status(400).json({ message: 'No word found' });
//             }
//         })
//         .catch(err => res.status(500).json({ message: 'Server Error', err }));
// });



