const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    max: 255,
    required: true
  },
  rating: {
    type: Number,
    max: 10,
    min: 0,
    required: true
  },
  genres: {
    type: String,
    min: 3,
    max: 25,
    required: true
  }
});

const Movie = mongoose.model("movies", movieSchema);

function validateMovie(movie) {
  const schema = {
    name: Joi.string()
      .max(255)
      .required(),
    rating: Joi.number()
      .max(10)
      .min(0)
      .required(),
    genres: Joi.string()
      .max(25)
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
