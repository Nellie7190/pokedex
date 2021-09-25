const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = 3000;

//DATA
const allPokes = require('./models/pokedex');

//MIDDLEWARE====================================
app.use((req,res, next) => {
    console.log('I run for all routes');
    next();
});

//Processes data and creates req.body
app.use(express.urlencoded({extended:false}));

//used to 'change' POST to DELETE
app.use(methodOverride('_method'));

/////ROUTES======================================
//INDEX
app.get('/allPokemon', (req, res) => {
    res.render('index.ejs', {pokemon: allPokes});
});

//NEW
app.get('/allPokemon/new', (req, res) => {
    res.render('new.ejs');
})

//DELETE
app.delete('/allPokemon/:id', (req, res) => {
    allPokes.splice(req.params.idx, 1);
    res.redirect('/allPokemon');
});

//SHOW
app.get('/allPokemon/:idx', (req, res) => {
    res.render('show.ejs', {allPoke: allPokes[req.params.idx]});
});



app.listen(3000, () => {
    console.log('listening on port:', port);
});

