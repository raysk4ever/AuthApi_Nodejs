const auth = require("../middelware/auth");
const admin = require("../middelware/admin");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Movie, validateMovie } = require("../modules/movie");

router.get("/", async(req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.post("/",auth, async (req, res) => {

    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let = movie = new Movie({name: req.body.name,
    rating: req.body.rating,
genres: req.body.genres});

movie = await movie.save();
res.send(movie);
});

router.delete("/:id", [auth, admin],async(req, res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("This Movie with given id not found");

    res.send(movie);
});


module.exports = router;

