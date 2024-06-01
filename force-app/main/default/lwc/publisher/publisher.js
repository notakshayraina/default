import { MessageContext ,publish} from 'lightning/messageService';
import { LightningElement,wire } from 'lwc';
import akshaychannel from '@salesforce/messageChannel/akshaychannel__c';

export default class Publisher extends LightningElement {
name='';
@wire(MessageContext) messageContext;

handleinput(event){

this.name=event.target.value;

}


handleclick(event){
let payload={name:this.name};
publish(this.messageContext,akshaychannel,payload);

}


}