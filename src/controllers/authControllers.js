// zuspchcufvpkwnms
const connection = require("../models/connection");
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
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
                            alert: true,
                            title: 'Error',
                            mensage: 'Usuario y/o contraseña incorrectos',
                            icon: 'warning',
                            time: 2000,
                            ruta: ''

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
                            user: results[0].usuario,
                            email: results[0].email
                        });
                    }
                }else {
                    console.log(results);   
                }
            });
        
        } else { 
            res.render('./auth/login', {
                title: "Login",
                styles: [
                    'normalize',
                    'header',
                    'main',
                    'footer',
                    'formulario'
                ],
                alert: true,
                title: 'Error',
                mensage: 'Por favor ingrese un usuario y una contraseña',
                icon: 'question',
                time: 2000,
                ruta: ''
            }); 
        }
    },
    register: async (req,res) => {
        const user = req.body.user;
        const pass = req.body.pass;
        const tel = req.body.tel;
        const email = req.body.email;
        let password = await bcryptjs.hash(pass,8);
        connection.query('INSERT INTO usuarios SET ?', {usuario:user, pass:password, email:email, telefono:tel}, async(error, results) => {
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
    },
    reservacompleta: async (req,res) => {
        const user = req.body.user;
        const email = req.body.email;
        const dia = req.body.dia;
        const hora = req.body.hora;
        connection.query('INSERT INTO turnos SET ?', {dia:dia,horario:hora,user:user,email:email},async(error, results) => {
            if(error){
                console.log(error);
            } else {
                enviarMail = async () => {
                    const config = {
                        host: 'smtp-mail.outlook.com',
                        port: 587,
                        auth: {
                            user: 'adharavestidos@hotmail.com',
                            pass: 'zuspchcufvpkwnms'
                        }
                    }
                    const transport = nodemailer.createTransport(config);
                    const mensaje = { 
                        from: 'adharavestidos@hotmail.com',
                        to: email,
                        subject: 'Reserva completa',
                        text: 'Hola ' + user + ', tu reserva para el dia ' + dia + ' a las ' + hora +'hs fue completada. Muchas gracias!'
                    }
                    const info = await transport.sendMail(mensaje);
                    console.log(info);
                }
                enviarMail();
                res.render('./auth/reservacompleta', {
                    title: 'Cita Reservada',
                    styles: [
                        'normalize',
                        'header',
                        'main',
                        'footer'
                    ],
                });
            }
        });

    }
}