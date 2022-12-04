const express = require('express');
const app = express();

const PORT = 7000;

/* ARCHIVOS ESTATICOS */
app.use(express.static('public'));


/* VIEW ENGINE */
app.set('view engine', 'ejs');
app.set('views',__dirname + '/src/views');

/* ROUTES */
app.get('/',(req,res) => {
    res.render('home', {
        title: "Home"
    });
});
app.get('/galeria',(req,res) => {
    res.render('galeria', {
        title: "Galeria"
    });
});
app.get('/login',(req,res) => {
    res.render('login', {
        title: "Login"
    });
});
app.get('/preguntas',(req,res) => {
    res.render('preguntas', {
        title: "Preguntas"
    });
});


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
