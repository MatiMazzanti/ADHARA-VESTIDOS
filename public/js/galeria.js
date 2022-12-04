function cambiarfoto(x,y){
    var id = 'vestido' + x;
    var ruta = document.getElementById(id).src;
    console.log(id,ruta,x,y);
    if(y === 0){
        if(ruta === "http://localhost:7000/img/vestidos/vestido"+x+".2.jpeg"){
            console.log("hola 1 "+ruta );
            document.getElementById(id).src="img/vestidos/vestido"+x+".1.jpeg"
        }else if(ruta === "http://localhost:7000/img/vestidos/vestido"+x+".1.jpeg"){
            console.log("hola 2 "+ruta );
            document.getElementById(id).src="/img/vestidos/vestido"+x+".jpeg";
        }else{
            console.log("hola 3 "+ruta );
            document.getElementById(id).src="/img/vestidos/vestido"+x+".2.jpeg";
        }
    }else{
        if(ruta === "http://localhost:7000/img/vestidos/vestido"+x+".jpeg"){
            console.log("hola 1 1 "+ruta );
            document.getElementById(id).src="/img/vestidos/vestido"+x+".1.jpeg";
            console.log("nueva ruta "+ruta );
        }else if(ruta === "http://localhost:7000/img/vestidos/vestido"+x+".1.jpeg"){
            console.log("hola 1 2 "+ruta );
            document.getElementById(id).src="img/vestidos/vestido"+x+".2.jpeg";
            console.log("nueva ruta "+ruta );
        }else{
            console.log("hola 1 3 "+ruta );
            document.getElementById(id).src="/img/vestidos/vestido"+x+".jpeg";
            console.log("nueva ruta "+ruta );
        }
    }
}


const fulimgbox = document.getElementById("fulimgbox"),
fulimg = document.getElementById("fulimg");
function openImg(reference){
    fulimgbox.style.display = "flex"
    fulimg.src = reference;
}
function closeImg(){
    fulimgbox.style.display = "none";
}
