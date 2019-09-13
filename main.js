let root = document.getElementById("root");

function agregarCliente() {
    var nombre = document.getElementById("Nombre").nodeValue;
}

function createTable() {
    let table = document.createElement('table');
    let mainRow = document.createElement('tr')
    let colum1 = document.createElement('td');
    let colum2 = document.createElement('td');
    let colum3 = document.createElement('td');
    let colum4 = document.createElement('td');
    let colum5 = document.createElement('td');
    colum1.textContent = "Codigo";
    colum2.textContent = "Nombre";
    colum3.textContent = "Balance";
    colum4.textContent = "Fecha Registro";
    colum5.textContent = "Opciones";
    mainRow.appendChild(colum1);
    mainRow.appendChild(colum2);
    mainRow.appendChild(colum3);
    mainRow.appendChild(colum4);
    mainRow.appendChild(colum5);
    table.appendChild(mainRow);
    root.appendChild(table);
}

