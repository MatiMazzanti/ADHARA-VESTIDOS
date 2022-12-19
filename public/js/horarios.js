function hsSelected(id) {
    let span = document.getElementById('span'+id);
    let elGridBody = document.getElementById('none').querySelector('.grid_body-hs').querySelector('.grid_cell--selected-hs');
    if(elGridBody){
        elGridBody.classList.remove('grid_cell--selected-hs');
    }
    span.classList.add('grid_cell--selected-hs');
    const user = document.querySelector('#usuario').textContent;
    const email = document.querySelector('#email').textContent;
    const tel = document.querySelector('#tell').textContent;
    const dia = document.querySelector('.grid_cell--selected').value;
    const hora = document.querySelector('.grid_cell--selected-hs').value;
    const mess = document.querySelector('#mes').textContent;

    console.log(user,email,dia,hora,tel,mess);
    const usuario = document.getElementById('user');
    const mail = document.getElementById('mail');
    const dias = document.getElementById('dia');
    const horas = document.getElementById('hora');
    const tell = document.getElementById('tel');
    const mes = document.getElementById('messs');
    usuario.setAttribute("value",user);
    mail.setAttribute("value",email);
    dias.setAttribute("value",dia);
    horas.setAttribute("value",hora);
    tell.setAttribute("value",tel);
    mes.setAttribute("value",mess);
}