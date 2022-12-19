// zuspchcufvpkwnms
const connection = require("../models/connection");
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const Mail = require("nodemailer/lib/mailer");
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
                        if(user == 'Carolina' && pass == 'Carolina'){
                            res.render('./admin/home',{
                                title: 'Home Admin',
                                styles: [
                                    'normalize',
                                    'header',
                                    'footer'
                                ]
                            })
                        }else {
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
                        }
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
                            email: results[0].email,
                            tell: results[0].telefono,
                        });
                    }
                }else{
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
        connection.query
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
        const tel = req.body.tel;
        const mes = req.body.mes[0];
        connection.query('INSERT INTO turnos SET ?', {id:null, dia:dia, usuario:user, mes:mes, hora:hora}, async(error, results) => {
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
                        text: 'Hola ' + user + ', tu reserva para el dia ' + dia +' ' + mes + ' a las ' + hora +'hs fue completada. Nuestro showroom queda en el club de campo la martona, ruta 205 km 54,5 Alejandro Petion, unidad funcional 120. Gacias por confiar en nosotras!'
                    }
                    const mensaje2 = {
                        from: 'adharavestidos@hotmail.com',
                        to: 'adharavestidos@hotmail.com',
                        subject: 'Nueva reserva',
                        text: 'EL usuario: ' + user + ', reservo una cita para el dia ' + dia + ' ' + mes + ' a las ' + hora + '. Datos: email: ' + email + ', tel: ' + tel
                    }
                    const info = await transport.sendMail(mensaje);
                    const info2 = await transport.sendMail(mensaje2);
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