import { LightningElement,wire, api } from 'lwc';
import methodname from "@salesforce/apex/ConSearch.methodname";
import { NavigationMixin } from "lightning/navigation";
export default class Typeahead extends NavigationMixin(LightningElement)  {
    input="";
    gottondata=[];
    hasrecords=false;
    @track items=[];
    
@wire(methodname,{
    input: "$input"
})
methoddata({data,error}){
    if(data){
        console.log(data);
     this.hasrecords=data.length>0 ? true:false;
     this.gottondata=data;
     
    }
    else if(error){
     console.log(error);
    }
}




    changehandler(event){
        this.input= event.target.value;
    }

    clickhandler(event){
       let rec= event.target.getAttribute("data-recid");
       console.log('Record id',rec);
       if(this.validati(rec)){
       let selectedrecord= this.gottondata.find(
        (currItem)=>currItem.Id===rec);
        console.log('Selected record',selectedrecord);
       let pill=          //making the pills
        {
       type: 'icon',
       label: selectedrecord.Name,
       iconName:'standard:contact',
       name:rec,    
       alternativeText: 'Contact',
    };

this.items=[...this.items,pill];
       }
    }

    validati(rec){
        let recordselected= this.items.find(
            (currItem)=>currItem.name===rec);
        if(recordselected){
            return false;
        }
        else{
        return true;
        }
    }

    handleremove(event){
       
    
            const index = event.detail.index;
            this.items.splice(index, 1);
    
    }


    pillclick(event){
       
    
        const index = event.target.dataset.index;
        let selectedItem = this.items[index];
        
        let recordId= selectedItem.name;
        console.log('Selected pill',recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
               // objectApiName: 'Contact', // objectApiName is optional
                actionName: 'view'
               
            }
        });

}


}