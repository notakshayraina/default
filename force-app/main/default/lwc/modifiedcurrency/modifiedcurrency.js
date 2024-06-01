import { LightningElement } from 'lwc';

export default class Modifiedcurrency extends LightningElement {
inputamount="";
fromcurrency="";
tocurrency="";
convertedvalue="";
showit=false;
options=[];

handlerchange(event){

    let {name, value}= event.target;
    if(name==="input"){
     this.inputamount=value; 
    }

if(name==="Fromval"){
this.fromcurrency=value;

}

if(name==="Toval"){
this.tocurrency=value;
}
}

connectedCallback(){
    this.fetchcurrencies();
}

async fetchcurrencies(){
let endpoint='https://api.frankfurter.app/currencies';
try{
let response= await fetch(endpoint);

        if(!response.ok){
               throw new Error('Network is down');
                }
let data= await response.json();
let option=[];
for(let a in data){
     option=[...option, {label:a, value:a}];
}
this.options=[...option];

}
catch(error){
    console.log(error);
}



}

buttonclick(){
    this.fetchconversion();
}

async fetchconversion(){
    let endpoint=`https://api.frankfurter.app/latest?amount=${this.inputamount}&from=${this.fromcurrency}&to=${this.tocurrency}`;
    try{
    let response= await fetch(endpoint);
    
            if(!response.ok){
                   throw new Error('Network is down');
                    }
    let data= await response.json();
   this.convertedvalue=data.rates[this.tocurrency];
   this.showit=true;

    }
    catch(error){
        console.log(error);
    }
    

}

}