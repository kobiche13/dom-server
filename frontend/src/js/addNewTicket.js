
export default class AddNewTicket {
    constructor() {
        this.btnAdd = document.querySelector('.button-add');
        this.form = document.querySelector('.form-field');
    }

    newTicket(){
        document.body.addEventListener('click', this.clickAddTicket.bind(this))
        document.body.addEventListener('click', this.pushTicketInServer.bind(this))
    }

    clickAddTicket(event){
        this.containerForm = document.querySelector('.container-form')
        if(event.type == 'click'){
            if(event.target.classList.contains('button-add')){
                this.containerForm.style.display = 'block';
            }else if(event.target.classList.contains('button-close') || event.target.classList.contains('button-ok')){
                this.containerForm.style.display = 'none';
            }
        }
    }

    pushTicketInServer(event){ 
        if(event.target.classList.contains('button-ok')){
            let objectCreateTickets = {}
            let formData = new FormData(this.form);
            formData.forEach(function(value, key){
                objectCreateTickets[key] = value;
            });
            let json = JSON.stringify(objectCreateTickets);

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return
            }
            xhr.open('POST', 'http://localhost:7070?method=createTicket')
            xhr.send(json)
        }
    }
}