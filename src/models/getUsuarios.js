const connection = require('./connection');

/* function getUsuarios(){
    connection.query('SELECT * FROM usuarios;', (err, results, fields) => {
        if(err){
            console.log(err);
        } else{
            console.log('R: ', results);
        }
    });
    connection.end();
} */
const usuarios = [];
var i = 0;
function getUsuarios(){
    connection.query('SELECT * FROM usuarios;', (err, results, fields) => {
        usuarios[i] = results;
        console.log(results);
        i++;
    });

}
getUsuarios();
console.log(usuarios);
connection.end();