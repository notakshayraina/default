import { LightningElement, api, wire} from 'lwc';
import searchin from "@salesforce/apex/controllerfor.searchin";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
export default class Multiselect extends LightningElement {
hasrecords=false;
searchingkey;
@api label="Account";
@api placeholder="Search Account";
searchoutput=[];
selectionrecords=[];
@api oobjectapiname="Account";
delaytimeout;
 delay=300; //millisecond
 @api iconname="standard:account";

@wire(searchin,{
    searchkey: "$searchingkey",
    objectapiname: "$oobjectapiname"
})
searchresult({data,error}){
if(data){
    console.log(data);
    this.hasrecords= data.length > 0 ? true : false;
    this.searchoutput=data;
}
else if(error)
{
    console.log(error);
}
}

changehandler(event){   
    //clearTimeout(this.delaytimeout);
   // value=event.target.value;
    
//this.delaytimeout=setTimeout(()=>{
   // this.searchkey=value;
//},Delay);

this.searchingkey=event.target.value;
   
}




clickhandler(event){
    let recid=event.target.getAttribute("data-recid");
    console.log('recid',recid);

    if(this.validatedup(recid)){
        let selectedrecord= this.searchoutput.find(
            (currItem)=>currItem.Id===recid
        );
        let pill={
            type: 'icon',
            label: selectedrecord.Name,
            name: recid,
            iconName: this.iconname,
            alternativeText: 'Account',
        };
    this.selectionrecords= [...this.selectionrecords,pill];

    }
    
}


get showpillrecords(){
    return this.selectionrecords.length>0? true:false;
}
handleItemRemove(event){
    
        const index = event.detail.index;
        this.selectionrecords.splice(index, 1);

}

validatedup(selectedrecord){
     let isValid=true;
    let isrecordalready = this.selectionrecords.find(
    (currItem) => currItem.name === selectedrecord
);

    if(isrecordalready){
        isValid= false;
      this.dispatchEvent(new ShowToastEvent({
          title: "Record already exists",
          message: "Select any other record",
          variant: "error"
      }));
    }
    else{
        isValid=true;
    }
    return isValid;
}
}