

export default class TicketForm {
    constructor() {
    
    }

    createTicketForm(classNameAdd, classNameSearch){
        let div = document.createElement('div');
        div.className = classNameAdd;
        let addElement = document.querySelector(classNameSearch);
        addElement.appendChild(div)
    }

    createTicketElement(element, className){
        let elementHTML = document.createElement(element);
        elementHTML.className = className;
        this.elementHTML = elementHTML;
    }

    createTicket(){
        let ticketContainer = Array.from(document.querySelectorAll('.ticket-container'))
        ticketContainer.forEach((el) => {
            this.createTicketElement('div', 'ticket-container__status');
            el.append(this.elementHTML);
            this.createTicketElement('div', 'ticket-container__name')/**/
            el.append(this.elementHTML);
           
            this.createTicketElement('div', 'ticket-container__description')
            el.lastElementChild.append(this.elementHTML)
            
            this.createTicketElement('div', 'ticket-container__date')
            el.append(this.elementHTML);
            this.createTicketElement('div', 'ticket-container__change')
            el.append(this.elementHTML);
            this.createTicketElement('div', 'ticket-container__delete')
            el.append(this.elementHTML);
        })
    }

    fillingTicketStatus(data){
        let ticketStatus = Array.from(document.querySelectorAll('.ticket-container__status'));
        ticketStatus.forEach((el, index)=>{
           if (data[index].status == true){
            
            el.classList.add('true');
           }
           
        })
    }
    
    fillingTicketName(data){
        let ticketNames = Array.from(document.querySelectorAll('.ticket-container__name'));
        ticketNames.forEach((el, index)=>{
            let p = document.createElement('p');
            p.className = 'ticket-container__description-text'
            p.textContent = data[index].name;
            el.prepend(p);
            
        })
    }

    fillingTicketDate(data){
        let ticketDate = Array.from(document.querySelectorAll('.ticket-container__date'));
        ticketDate.forEach((el, index)=>{
            let day = new Date(data[index].created);
            el.textContent = day.toLocaleString()
        })
    }

    fillingTicketEvent(event){
        if(event.type == 'click'){
            if(event.target.classList.contains('ticket-container__description-text') && event.target.nextElementSibling.textContent !== ""){
                if(event.target.nextElementSibling.style.display !== 'block'){  
                    event.target.nextElementSibling.style.display = 'block';
                } else {
                    event.target.nextElementSibling.style.display = 'none';
                }
            }
        }
    }
    
    fillingTicketDescription(data){
        let ticketDescriptionText = Array.from(document.querySelectorAll('.ticket-container__description'));
        ticketDescriptionText.forEach((el, index)=>{
            if(data[index].description !== " "){   
                el.textContent = data[index].description;
            }
        })
    }

}
  