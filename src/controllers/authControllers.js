module.exports = {
    login: (req,res) => {
        res.render('./auth/login', {
            title: "Login",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'formulario'
            ]
        });
    },
    crearcuenta: (req,res) => {
        res.render('./auth/crearcuenta', {
            title: "Crear Cuenta",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'formulario'
            ]
        });
    },
    olvidepass: (req,res) => {
        res.render('./auth/olvidepass', {
            title: "Recuperar contraseña",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'formulario'
            ]
        });
    },
    reserva: (req,res) => {
        res.render('./auth/reserva', {
            title: "Reservas",
            styles: [
                'normalize',
                'header',
                'main',
                'footer',
                'formulario'
            ]
        });
    }
}