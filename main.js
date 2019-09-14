class Client {
    constructor() {     
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];      
    }

    addClient(updatedName, updatedBalance) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const client = {
            code: this.clients.length > 0 ? this.clients[this.clients.length - 1].code + 1 : 1,
            name: updatedName,
            balance: updatedBalance,
            registerDate: today
        }

        this.clients.push(client);
        this._commit(this.clients);
    }

    deleteClient(code) {
        this.clients = this.clients.filter(x => x.code !== code);
        this._commit(this.clients);
    }

    _commit(clients) {
        localStorage.setItem('clients', JSON.stringify(clients));        
    }


}

let root = document.getElementById("root");
let client = new Client();

document.getElementById("AddButton").addEventListener("click", () => {
    agregarCliente();
});



function agregarCliente() {
    let name = document.getElementById("Nombre").value;
    let balance = document.getElementById("Balance").value;
    client.addClient(name, balance);

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

    client.clients.forEach(element => {
        let newRow = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        col1.textContent = element.code;
        col2.textContent = element.name;
        col3.textContent = element.balance;
        col4.textContent = element.registerDate;
        col5.appendChild(deleteButton);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        newRow.appendChild(col3);
        newRow.appendChild(col4);
        newRow.appendChild(col5);
        table.appendChild(newRow);
    });
    root.appendChild(table);
}

