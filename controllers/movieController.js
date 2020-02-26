// const express = require('express')
// const router = express.Router()

const Movies = require('../models/Movies')

module.exports = {
    getAllMovies: (req, res) => {
        Movies.find({})
            .then(movies => {
                res.render('viewMovies', { movies: movies });
            })
            .catch(err =>
                res.status(500).json({ message: 'Server Error', err })
            );
    },

    foundMovies: (req, res) => {
        // find the movie we are looking for by the title
        Movies.findOne({ title: req.query.title })
            .then(movie => {
                if (movie) {
                    //render the findMovie page
                    return res.render('findMovie', { movie });
                } else {
                    return res.status(400).json({ message: 'No MOVIE found' });
                }
            })
            .catch(err =>
                res.status(500).json({ message: 'Server Error', err })
            );
    },

    addMovie: (req, res) => {
        const { title, rating, synopsis, releaseYear, genre, director, boxOffice} = req.body
        //validate input
        if (
            !title || !rating || !synopsis || !releaseYear || !genre || !director || !boxOffice
        ) {
            return res
                .status(400)
                .json({ message: 'All inputs must be filled' });
        }

        //check to see if word is unique
        // use the word model and the .findOne mongoose method to compare movie in the DB to the searchbox 
        Movies.findOne({ title: title })
            .then(movie => {
                //if the movie is found return the message "movie is already listed in DB"
                if (movie) {
                    return res.status(500).json({
                        message: 'Movie is already listed in database'
                    });
                }
                // Create a new movie based on Schema characteristics
                const newMovie = new Movies();
                newMovie.title = title;
                newMovie.rating = rating;
                newMovie.synopsis = synopsis;
                newMovie.releaseYear = releaseYear;
                newMovie.genre = genre;
                newMovie.director = director;
                newMovie.boxOffice = boxOffice;

                //add the movie to db
                newMovie
                    .save()
                    .then(movie =>
                        res.status(200).json({
                            message: 'Movie added successfully',
                            movie: movie
                        })
                    )
                    .catch(err =>
                        res
                            .status(500)
                            .json({ message: 'Movie was not created', err })
                    );
            })
            .catch(err =>
                res.status(500).json({ message: 'Server Error', err })
            );
    },

    updateMovie: (req, res) => {
        const { title, rating, synopsis, releaseYear, genre, director, boxOffice} = req.body
        // find movie based on parameters
        Movies.findOne({ title: req.params.title })
            .then(movie => {
                if (movie) {
                    //redefine each part of the model
                    movie.title = title ? title : movie.title;
                    movie.rating = rating ? rating : movie.rating;
                    movie.synopsis = synopsis ? synopsis : movie.synopsis;
                    movie.releaseYear = releaseYear ? releaseYear : movie.releaseYear;
                    movie.genre = genre ? genre : movie.genre;
                    movie.director = director ? director : movie.director;
                    movie.boxOffice = boxOffice ? boxOffice : movie.boxOffice;
                 
                    // save new movie
                    movie
                        .save()
                        .then(updated =>
                            res
                                .status(200)
                                .json({ message: 'Movie updated', updated })
                        )
                        .catch(err =>
                            res
                                .status(400)
                                .json({ message: 'Movie not updated', err })
                        );
                } else {
                    return res.status(200).json({ message: 'Movie not found' });
                }
            })
            .catch(err =>
                res.status(500).json({ message: 'Server Error', err })
            );
    },

    deleteMovie: (req, res) => {
        Movies.findOneAndDelete({ title: req.params.title })
            .then(movie => {
                if (movie) {
                    return res
                        .status(200)
                        .json({ message: 'Movie Deleted', movie });
                } else {
                    return res
                        .status(400)
                        .json({ message: 'No movie to delete' });
                }
            })
            .catch(err =>
                res.status(400).json({ message: 'Movie not deleted', err })
            );
    },

    renderAddMovies: (req, res) => {
        return res.render('addMovie');
    },

    renderIndex: (req, res) => {
        res.render('index');
    },
    
    findMovie: (req, res) => {
        return res.render('findMovie', { movie: null });
    }
};