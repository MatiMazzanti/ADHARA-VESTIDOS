const connection = require("../models/connection");
const bcryptjs = require('bcryptjs');
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
            ],
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
    //autenticacion 
    reserva: async (req,res) => {
        const user = req.body.user;
        const pass = req.body.pass;
        let password = await bcryptjs.hash(pass,8);
        if(user && pass){
            connection.query('SELECT * FROM usuarios WHERE usuario = ?', [user], async(error, results) => {
                if(results != undefined){
                    if( results.length == 0 || !(await bcryptjs.compare(pass,results[0].pass))){
                        res.render('./auth/login',{
                            title: "Login",
                            styles: [
                                'normalize',
                                'header',
                                'main',
                                'footer',
                                'formulario'
                            ],
                        });    
                    }else {
                        req.session.name = results[0].user; 
                        res.render('./auth/reserva', {
                            title: "Reservas",
                            styles: [
                                'normalize',
                                'header',
                                'footer',
                                'reserva',
                                'formulario'
                            ],
                            user: results[0].usuario
                        });
                    }
                }else {
                    console.log(results);   
                }
            });
        
        } else { 
            res.send('Por favor ingrese un usuario y una contraseña '); 
        }
    },
    register: async (req,res) =>{
        const user = req.body.user;
        const pass = req.body.pass;
        const tel = req.body.tel;
        const email = req.body.email;
        let password = await bcryptjs.hash(pass,8);
        connection.query('INSERT INTO usuarios SET ?', {usuario:user, pass:password, email:email, telefono:tel}, async(error, results) => {
            console.log(results);
            if(error){
                console.log(error);
            } else {
                res.render('alta', {
                    title: 'Alta Exitosa',
                    styles: [
                        'normalize',
                        'header',
                        'main',
                        'footer'
                    ]
                })
            }
        });
    }
}