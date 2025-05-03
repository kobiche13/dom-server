import {ticketId} from './loadTask.js';

export default class DeleteTicket {
    constructor() {
        this.searchName = undefined;
        this.positionTicket = undefined;
        this.idDeleteTicket = undefined;
    }

    deleteTicket(){
        document.body.addEventListener('click', this.clickDeleteTicket.bind(this))
        document.body.addEventListener('click', this.deleteTicketInServer.bind(this))
    }

    clickDeleteTicket(event){
        this.containerDelete = document.querySelector('.delete-tickets__container')
        if(event.type == 'click'){
            if(event.target.classList.contains('ticket-container__delete')){
                this.searchName = event.target.closest('.ticket-container')
                this.containerDelete.style.display = 'block';
            }else if(event.target.classList.contains('close-delete') || event.target.classList.contains('ok-delete')){
                this.containerDelete.style.display = 'none';
            }
        }
    }

    deleteTicketInServer(event){      
        if(event.target.classList.contains('ok-delete')){
            self = this;
            self.searchIdTicket();  
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:7070?method=deleteById&id='+`${ticketId[this.idDeleteTicket].id}`)
            xhr.send()
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return
                location.reload()
            }
        }
    }

    searchIdTicket(){ 
        let searchName = this.searchName.querySelector('.ticket-container__description-text').textContent;
        ticketId.forEach((element, index) => {
            if (element.name == searchName){
                this.idDeleteTicket = index;
            }
        });
    }
}