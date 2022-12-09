const express = require('express');
const app = express();
const mainRoutes = require('./src/routes/mainRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
const PORT = 7000;

/* ARCHIVOS ESTATICOS */
app.use(express.static('public'));

/* VIEW ENGINE */
app.set('view engine', 'ejs');
app.set('views',__dirname + '/src/views');

/* ROUTES */
app.use('/',mainRoutes);
app.use('/',adminRoutes);
app.use('/',authRoutes);
app.use((req,res) => {
    res.status(404).render('404', {
        title: "Pagina no encontrada",
        styles: [
            'normalize',
            'header',
            'main',
            'footer'
        ]
    });
});

/* MYSQL */


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
