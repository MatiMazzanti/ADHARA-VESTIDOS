function hsSelected(id) {
    let span = document.getElementById('span'+id);
    let elGridBody = document.getElementById('none').querySelector('.grid_body-hs').querySelector('.grid_cell--selected');
    if(elGridBody){
        elGridBody.classList.remove('grid_cell--selected');
    }
    span.classList.add('grid_cell--selected');
}