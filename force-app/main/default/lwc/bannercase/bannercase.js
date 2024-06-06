import { LightningElement,api } from 'lwc';
import show from '@salesforce/apex/showhide.show';
import hide from '@salesforce/apex/showhide.hide';
import { NavigationMixin } from 'lightning/navigation';
import { reloadRecord } from 'lightning/uiRecordApi';

export default class Bannercase extends LightningElement {
   @api recordId;
   showbutton=true;
      showhandler(event){
        console.log('Button clicked');
            show({rec: this.recordId}).then(()=>{
                console.log('Nice');
                this.showbutton=false;
            })
            .catch(error => {
              console.log('Error received',error);  
            });
                   
          
           // location.reload();
    }

    hidehandler(event){
        hide({rec: this.recordId}).then(()=>{
            console.log('Nice');
            this.showbutton=true;
        })
        .catch(error => {
          console.log('Error received',error);  
        });


    
       // location.reload();
    }
}