import TicketForm from './TicketForm'
export let ticketId = undefined;
export let ticketStatus = undefined;

export default class LoadTask{
    constructor(){
        this.data = undefined;
    }

    loadTicket(){ 
        const xhr = new XMLHttpRequest();
        self = this;
        window.addEventListener('load', (e) => {
            e.preventDefault();
            xhr.open('GET', 'http://localhost:7070?method=allTickets')
            xhr.send()
            xhr.onreadystatechange = function(){
                if (xhr.readyState !== 4) return                
                this.data = JSON.parse(xhr.responseText)
                self.addTickets(this.data)
                self.saveIdTickets(this.data)
                self.saveStatusTickets(this.data)
            }
        });
    }

    addTickets(data){
        let ticketForm = new TicketForm();
        for (let i = 0; i < data.length; i++) {
            ticketForm.createTicketForm('ticket-container', '.tickets-form')
        }
        ticketForm.createTicket()
        ticketForm.fillingTicketDate(data)
        ticketForm.fillingTicketStatus(data)
        ticketForm.fillingTicketName(data)
        ticketForm.fillingTicketDescription(data)
        document.body.addEventListener('click', ticketForm.fillingTicketEvent.bind(this), true)
    }

    saveIdTickets(data){
        ticketId = data.map(({description, status, created, ...rest}) => ({...rest}));
    }

    saveStatusTickets(data){
        ticketStatus = data.map(({description, created, ...rest}) => ({...rest}));
        console.log(ticketStatus)
        let tickets = Array.from(document.querySelectorAll('.ticket-container'));
        console.log(tickets)
        ticketStatus.forEach((element, index) => {
            if(element.status == false){
                tickets[index].children[0].classList.remove('true')
            } else{
                tickets[index].children[0].classList.add('true')
            }
        })
    }

}




