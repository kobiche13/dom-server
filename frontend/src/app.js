import LoadTask from './js/loadTask.js'
import AddNewTicket from './js/addNewTicket.js'
import DeleteTicket from './js/deleteTickets.js'
import UpdatingTicket from './js/updateTickets.js'

export default class AppTask{
    constructor(){
        
    }

    initApp(){
        this.loadAllTickets = new LoadTask();
        this.newTickets = new AddNewTicket();
        this.deleteTicket = new DeleteTicket();
        this.updateTicket = new UpdatingTicket();

        this.deleteTicket.deleteTicket();
        this.loadAllTickets.loadTicket();
        this.newTickets.newTicket();
        this.updateTicket.ticketUpdate();
    }
}