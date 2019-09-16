class Client {
    constructor() {     
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];
        this.currentClient = JSON.parse(localStorage.getItem('currentClient')) || {};      
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
            balance: parseFloat(updatedBalance).toFixed(2),
            registerDate: today
        }

        this.clients.push(client);
        this._commit(this.clients);
    }

    deleteClient(code) {
        this.clients = this.clients.filter(x => x.code !== code);
        this._commit(this.clients);
        location.reload();
    }


    editClient(codepr, updatedName, updatedBalance) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.clients = this.clients.map(x => x.code === Number(codepr) ? {code: x.code, name: updatedName, balance: parseFloat(updatedBalance).toFixed(2), registerDate: today} : x);
        this._commit(this.clients);
    }

    _commit(clients) {
        localStorage.setItem('clients', JSON.stringify(clients));        
    }
}

let root = document.getElementById("root");
let detail = document.getElementById("clientDetailBox");
let ul = document.createElement("ul");
let li1 = document.createElement("li");
let li2 = document.createElement("li");
let li3 = document.createElement("li");
let li4 = document.createElement("li");
let client = new Client();


if(window.location.href.endsWith("addClientPage.html")) {
    document.getElementById("AddButton").addEventListener("click", () => {
        addClient();
    });
} else if(window.location.href.endsWith("main.html")){
    document.getElementById("addBtn").addEventListener("click", () => {
        window.open("addClientPage.html", "_self");
    });
} else if(window.location.href.endsWith("clientDetailspage.html")) {
    document.getElementById("ReturnButton").addEventListener("click", () => {
        window.open("main.html", "_self");
    });
} else {
    document.getElementById("EditButton").addEventListener("click", () => {
        editClient();
    });
}


function addClient() {
    let name = document.getElementById("Nombre").value;
    let balance = document.getElementById("Balance").value;
    client.addClient(name, balance);
    window.open("main.html", "_self");
}

function editClient() {
    let name = document.getElementById("NombreEditar").value;
    let balance = document.getElementById("BalanceEditar").value;
    let code = document.getElementById("ClientCode").value;
    client.editClient(code, name, balance);
    window.open("main.html", "_self");
}


function createTable() {
    //Table definition
    let table = document.createElement('table');
    let head = document.createElement('thead');
    let mainRow = document.createElement('tr')
    let colum1 = document.createElement('th');
    let colum2 = document.createElement('th');
    let colum3 = document.createElement('th');
    let colum4 = document.createElement('th');
    let colum5 = document.createElement('th');
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
    head.appendChild(mainRow);
    table.appendChild(head);
    let body = document.createElement('tbody');

    client.clients.forEach(element => {
        //Creates a new row and colum for each client
        let newRow = document.createElement('tr');
        let col1 = document.createElement('td');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        
        //appends a delete button for each client that exists
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute("id", `${element.code}`);
        deleteButton.addEventListener("click", () => {
            client.deleteClient(element.code);
        });

        //appends an edit button for each client that exits
        let editButton =  document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.setAttribute("id", `${element.code}`);
        editButton.addEventListener("click", () => {  
            window.open("editClientPage.html", "_self");
        });

        //appends a detail button for each client that exists
        let detailButton = document.createElement('button');
        detailButton.textContent = 'Detail';
        //detailButton.setAttribute("id", `${element.code}`);          
        //detail.appendChild(ul);
        detailButton.addEventListener("click", () => {       
            window.open("clientDetailspage.html", "_self");
            client.currentClient = element;
            localStorage.setItem('currentClient', JSON.stringify(client.currentClient));        
      
            // li1.textContent = `Codigo: ${element.code}`;
            // li2.textContent = `Nombre: ${element.name}`;
            // li3.textContent = `Balance: ${element.balance}`;
            // li4.textContent = `Fecha Registro: ${element.registerDate}`;
            // ul.appendChild(li1);
            // ul.appendChild(li2);
            // ul.appendChild(li3);
            // ul.appendChild(li4);            
            // detail.appendChild(ul);
            // window.scrollTo({
            //     top: 0,
            //     left: 100,
            //     behavior: 'smooth'
            //   });
        });

        //adds all client data to the table
        col1.textContent = element.code;
        col2.textContent = element.name;
        col3.textContent = element.balance;
        col4.textContent = element.registerDate;
        col5.appendChild(deleteButton);
        col5.appendChild(editButton);
        col5.appendChild(detailButton);
        newRow.appendChild(col1);
        newRow.appendChild(col2);
        newRow.appendChild(col3);
        newRow.appendChild(col4);
        newRow.appendChild(col5);
        body.appendChild(newRow);
        table.appendChild(body);
    });
    root.appendChild(table);

}

