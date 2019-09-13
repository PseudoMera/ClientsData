class Model {
    constructor() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.clients = [ 
            {code: 12345, name: "Albin",balance: 1250.95, registerdate: today},
        ]
        console.log(this.clients);
    }

    addClient(clientName, clientBalance) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const client = {
            code: this.clients.length > 0 ? this.clients[this.clients.length - 1].code++ : 12345,
            name: clientName,
            balance: clientBalance,
            registerdate: today,        
        }

        this.clients.push(client);
        this.onClientListChanged(this.clients);

    }

    deleteClient(code) {
        this.clients = this.clients.filter(client => client.code !== code);
        this.onClientListChanged(this.clients);
    }

    editClient(code, updatedName, updatedBalance) {
        this.clients = this.clients.map(client => client.code === code ?
            {code: client.code, name: updatedName, balance: updatedBalance, registerdate: client.registerdate} : client);
        this.onClientListChanged(this.clients);

        }

    bindTableClientChanged(callback) {
        this.onClientListChanged = callback;
    }


}

class View {
    constructor() {
        this.app = this.getElement("#root");
        this.deleteButton;
        this.title = this.createElement('h1');
        this.title.textContent = 'Clientes'
        this.form = this.createElement('form');
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Create';
        this.clientTable = this.createElement('table');
        this.tableHead = this.createElement('thead');
        this.tableBody = this.createElement('tbody' , 'tableBody');
        this.tableRow = this.createElement('tr');
        this.tableColum1 = this.createElement('td');
        this.tableColum2 = this.createElement('td');
        this.tableColum3 = this.createElement('td');
        this.tableColum4 = this.createElement('td');
        this.tableColum5 = this.createElement('td');

        this.tableColum1.textContent = 'Code';
        this.tableColum2.textContent = 'Name';
        this.tableColum3.textContent = 'Balance';
        this.tableColum4.textContent = 'Register Date';
        this.tableColum5.textContent = 'Options';
        this.tableRow.append(this.tableColum1);
        this.tableRow.append(this.tableColum2);
        this.tableRow.append(this.tableColum3);
        this.tableRow.append(this.tableColum4);
        this.tableRow.append(this.tableColum5);
        this.tableHead.append(this.tableRow);
        this.clientTable.append(this.tableHead, this.tableBody);
        this.form.append(this.submitButton);
        this.app.append(this.title, this.form, this.clientTable);
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
    
        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)
    
        return element
    }

    bindAddClient(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            
        });

    }

    bindDeleteClient(handler) {
        this.clientTable.addEventListener('click', event => {
            if(event.target.className == 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        });
    }

    displayTable(clientsx) {
        let tds = document.querySelectorAll('.tableBody tr');
        console.log(tds);
        for(let i = 0; i < tds.length;i++) {
            this.clientTable.deleteRow(tds);
        }
        
        if(clientsx.length == 0) {
            
        } else {
            clientsx.forEach(client => {
                const row = this.createElement('tr');
                const tr1 = this.createElement('td');
                const tr2 = this.createElement('td');
                const tr3 = this.createElement('td');
                const tr4 = this.createElement('td');
                const tr5 = this.createElement('td');

                row.id = client.code;
                tr1.id = client.code;
                tr2.id = client.code;
                tr3.id = client.code;
                tr4.id = client.code;
                tr5.id = client.code;
                this.deleteButton = this.createElement('button', 'delete')
                this.deleteButton.textContent = 'Delete';
                tr1.textContent = client.code;
                tr2.textContent = client.name;
                tr3.textContent =  client.balance;
                tr4.textContent = client.registerdate;
                tr5.append(this.deleteButton);
                row.append(tr1,tr2,tr3,tr4,tr5);
                this.tableBody.append(row);
                this.tableHead.append(this.tableRow);
             
            });
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.onClientListChanged(this.model.clients);
        this.view.bindAddClient(this.handleAddClient);
        this.view.bindDeleteClient(this.handleDeleteClient);
        this.model.bindTableClientChanged(this.onClientListChanged);
    }

    onClientListChanged = clients => {
        this.view.displayTable(clients);
    }

    handleAddClient = (clientName, clientBalance) => {
        this.model.addClient(clientName, clientBalance);
    }

    handleEditClient = (code, clientName, clientBalance) => {
        this.model.addClient(code,clientName, clientBalance);
    }

    handleDeleteClient = code => {
        this.model.deleteClient(code);
    }

}

const app = new Controller(new Model(), new View())
