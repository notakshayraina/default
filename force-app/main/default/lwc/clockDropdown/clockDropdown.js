import { LightningElement,api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api uniqueId='';
    @api options=[];
    @api label='';
valueoption;
    changehandler(event){
this.valueoption=event.target.value;

this.dispatchEvent(new CustomEvent('eventofoption', {
    detail:{
        label:this.label,
        value:this.valueoption
    }
}))


    }



@api
reset(value){

    this.template.querySelector('select').value = value;
    
}


}