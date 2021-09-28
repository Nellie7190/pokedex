const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = 3000;

//DATA
const allPokes = require('./models/pokedex');

app.use(express.static('css'));


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
app.delete('/allPokemon/:idx', (req, res) => {
    allPokes.splice(req.params.idx, 1);
    res.redirect('/allPokemon');
});

//UPDATE
app.put('/allPokemon/:idx', (req, res) => {
    allPokes[req.params.index] = req.body
    req.body.type = req.body.type.split(', ');
    req.body.stats = {
        hp: req.body.stats[0],
        attack: req.body.stats[1],
        defense: req.body.stats[2],
        spattack: req.body.stats[3],
        spdefense: req.body.stats[4],
        speed: req.body.stats[5],
    }
    console.log(req.body);
    res.redirect('/allPokemon/:idx');
    
});

//CREATE
app.post('/allPokemon', (req, res) => {
    console.log(req.body);
    allPokes.push(req.body);
    res.redirect('/allPokemon');
});



//EDIT
app.get('/allPokemon/:idx/edit', (req, res) => {
    res.render('edit.ejs', {
        poke: allPokes[req.params.idx],
    index: req.params.idx});
});

//SHOW
app.get('/allPokemon/:idx', (req, res) => {
    // console.log(allPokes[req.params.index].img)
    res.render('show.ejs', {allPoke: allPokes[req.params.idx], idx: req.params.idx });
});



app.listen(3000, () => {
    console.log('listening on port:', port);
});

