const express = require('express');
const app = express();
const port = 3000;

//DATA
const allPokes = require('./models/pokedex');

//INDEX
app.get('/allPokemon', (req, res) => {
    res.render('index.ejs', {pokemon: allPokes})
})

//SHOW
app.get('/allPokemon/:idx', (req, res) => {
    res.render('show.ejs', {allPoke: allPokes[req.params.idx]})
})


app.listen(3000, () => {
    console.log('listening on port:', port)
})



