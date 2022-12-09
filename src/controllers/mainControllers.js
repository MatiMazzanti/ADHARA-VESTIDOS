module.exports = {
    home: (req,res) => {
        res.render('home', {
            title: "Home",
            styles: [
                  'normalize',
                  'header',
                  'main',
                  'home',
                  'footer'
                ]
        });
    },
    galeria: (req,res) => {
        res.render('galeria', {
            title: "Galeria",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'galeria'
            ]
        });
    },
    preguntas: (req,res) => {
        res.render('preguntas', {
            title: "Preguntas",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'preguntas'
            ]
        });
    }
}