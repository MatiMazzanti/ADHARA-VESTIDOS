class Calendar {
    constructor(id){
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id),
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid_body');
        this.elMonthName = this.elCalendar.querySelector('.month-name')
        this.showCells();
        
    }
    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControl();
    }
    getTemplate(){
        let template = `
        <p>Paso 1: Seleccioná el día</p>
        <div class="calendar_header">
            <button type="button" class="control control--prev" id="prev"> < </button>
                <input value="Oct 2022" id="mes" name="mes" class="month-name"></input>
            <button type="button" class="control control--next" id="prev"> > </button>
        </div>
        <div class="calendar_body">
            <div class="grid">
                <div class="grid_header">
                    <span class="grid_cell grid_cell--gh">Dom</span>
                    <span class="grid_cell grid_cell--gh">Lun</span>
                    <span class="grid_cell grid_cell--gh">Mar</span>
                    <span class="grid_cell grid_cell--gh">Mié</span>
                    <span class="grid_cell grid_cell--gh">Jue</span>
                    <span class="grid_cell grid_cell--gh">Vie</span>
                    <span class="grid_cell grid_cell--gh">Sáb</span>
                    
                </div>
                <div class="grid_body">

                </div>
            </div>
        </div>`
        return template;
    }
    addEventListenerToControl() {
        let elControl = this.elCalendar.querySelectorAll('.control');
        elControl.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                let next = false;
                if(elTarget.classList.contains('control--next')) {
                    next = true;
                }
                this.changeMonth(next)
                this.showCells();
            });
        });
    }
    changeMonth(next = true) {
        let fecha = new Date();
        let mes = fecha.getMonth();

        if(next){
            this.currentMonth.add(1,'months');
        } else if(mes > this.currentMonth.month()){
            this.currentMonth.subtract(1,'months');
        }
    }
    showCells() {
        this.cells = this.generateDate(this.currentMonth);
        if(this.cells === null){
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth();
        

        for(let i = 0; i < this.cells.length; i++){
            disabledClass = '';
            if(!this.cells[i].isInCurrentMonth){
                disabledClass = 'grid_cell--disabled';
            }
            if(this.cells[i].date.day() == 0 || this.cells[i].date.day() == 6){
                disabledClass = 'grid_cell--disabled';
            }
            if(this.cells[i].date.date() < dia && this.currentMonth.month() == mes){
                disabledClass = 'grid_cell--disabled';
            }
            //<span class="grid_cell grid_cell--gd" grid_cell--selected></span>
            templateCells += `
            <input type="button" value="${this.cells[i].date.date()}" class="grid_cell grid_cell--gd ${disabledClass}" data-cell-id="${i}"></input>`;
        }
        this.elMonthName.setAttribute("value",this.currentMonth.format('MMM YYYY'));
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells(); 
    }
    generateDate(monthToShow = moment()){
        if(!moment.isMoment(monthToShow)){
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];
        //Encontrar la primera fecha del calendario 
        while(dateStart.day() !== 0) {
            dateStart.subtract(1, 'days');
        }
        //Encontrar la ultima fecha del calendario
        while(dateEnd.day() !== 6) {
            dateEnd.add(1, 'days');
        }
        //Genera las fechas del calendario
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1,'days');
        } while (dateStart.isSameOrBefore(dateEnd));
        return cells;
    }
    addEventListenerToCells(){
        let elCells = this.elCalendar.querySelectorAll('.grid_cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if(elTarget.classList.contains('grid_cell--disabled') || elTarget.classList.contains('grid_cell--selected')){
                    return;
                }
                //Deselecionar el dia del calendario anterior
                let selectedCell = this.elGridBody.querySelector('.grid_cell--selected');
                if(selectedCell) {
                    selectedCell.classList.remove('grid_cell--selected'); 
                }
                //Seleccionar la nueva celda
                elTarget.classList.add('grid_cell--selected');

                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }
    getElement() {
        return this.elCalendar;
    }
    value() {
        return this.selectedDate;
    }
}