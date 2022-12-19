const { json } = require('express');
const connection = require('./connection');
connection.query('SELECT * FROM turnos', (error,results) => {
    var turnos = [];
    for(var i = 0; i < results.length; i++){
        turnos[i] = results[i];
    }
    module.exports = turnos;
    for(var i = 0; i < turnos.length; i++){
        console.log(turnos[i].dia);
        console.log(turnos[i].mes);
        console.log(turnos[i].hora);
    }
});
connection.end();