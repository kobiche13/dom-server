import {ticketStatus} from './loadTask.js';

export default class UpdatingTicket {
    constructor() {
        this.form = document.querySelector('.form-field__update');
        this.containerForm = document.querySelector('.container-form__update');
        this.searchTicketContainer = undefined;
        this.idUpdateTicket = undefined;
        this.statusTicket = undefined;
        this.statusForUpdate = undefined;
    }

    ticketUpdate(){
        document.body.addEventListener('click', this.clickCompletedTicket.bind(this));
        document.body.addEventListener('click', this.clickEditTicket.bind(this))
        document.body.addEventListener('click', this.pushUpdateTicketInServer.bind(this))
    }

    clickCompletedTicket(event){        
        if(event.target.classList.contains('ticket-container__status')){
            event.target.classList.contains('true')? event.target.classList.remove('true'):event.target.classList.add('true')
        }    
    }

    clickEditTicket(event){
        if(event.type == 'click'){
            if(event.target.classList.contains('ticket-container__change')){
                this.containerForm.style.display = 'block';
                let textNameForm = this.form.querySelector('.form-field-update__text');
                let textDescriptionForm = this.form.querySelector('.textarea-update-description');

                this.searchTicketContainer = event.target.closest('.ticket-container');
            
                textNameForm.value = this.searchTicketContainer.querySelector('.ticket-container__description-text').textContent;
                
                textDescriptionForm.value = this.searchTicketContainer.querySelector('.ticket-container__description').textContent;

            }else if(event.target.classList.contains('button-update-close') || event.target.classList.contains('button-update-ok')){
                this.containerForm.style.display = 'none';
            }
                
        }
    }

    pushUpdateTicketInServer(event){ 
        if(event.target.classList.contains('button-update-ok')){
            let objectCreateTickets = {}
            let formData = new FormData(this.form);
            formData.forEach(function(value, key){
                objectCreateTickets[key] = value;
            });
            
            self = this;
            self.searchIdUpdateTicket();  
            objectCreateTickets.status = this.statusForUpdate;
        
            let json = JSON.stringify(objectCreateTickets);

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return
                location.reload()
            }
            xhr.open('POST', 'http://localhost:7070?method=updateById&id='+`${ticketStatus[this.idUpdateTicket].id}`)
            xhr.send(json)
        } else if(event.target.classList.contains('ticket-container__status')){
            let changeStatusContainer = event.target.closest('.ticket-container');
            let searchName = changeStatusContainer.querySelector('.ticket-container__description-text').textContent;
            ticketStatus.forEach((element, index) => {
                if (element.name == searchName){
                    this.idUpdateTicket = index;
                    if(changeStatusContainer.querySelector('.true') !== null){
                        this.statusForUpdate = true;
                    } else{
                        this.statusForUpdate = false;
                    }
                }
            })
            
            let objectCreateTickets = {}
            self = this;
            objectCreateTickets.status = this.statusForUpdate;
            let json = JSON.stringify(objectCreateTickets);

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return
                location.reload()
            }
            xhr.open('POST', 'http://localhost:7070?method=updateById&id='+`${ticketStatus[this.idUpdateTicket].id}`)
            xhr.send(json)
        }
    }
    
    searchIdUpdateTicket(){ 
        let searchName = this.searchTicketContainer.querySelector('.ticket-container__description-text').textContent;
        ticketStatus.forEach((element, index) => {
            if (element.name == searchName){
                this.idUpdateTicket = index;
                if(this.searchTicketContainer.querySelector('.true') !== null){
                    this.statusForUpdate = true;
                } else{
                    this.statusForUpdate = false;
                }
            }
        });
    }

    changeStatusIfPage(){

    }

}
