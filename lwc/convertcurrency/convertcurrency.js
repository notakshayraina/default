import { LightningElement } from 'lwc';

export default class Convertcurrency extends LightningElement {

    showoutput=false;
    convertedvalue="";
    enteredamount="";
    fromcurrency="";
    tocurrency="";
    options=[];

connectedCallback(){
    this.fetchSymbols();
}

handlerbutton(){
this.conversion();    
}

handleChange(event){

        let {name, value}=event.target;
        if(name==='Amount'){

            this.enteredamount=value;
        }

     if(name==='Fromcurr'){

            this.fromcurrency=value;
        }


    if(name==='Tocurr'){

            this.tocurrency=value;
                    }



            
 }

async fetchSymbols(){
let endpoint='https://api.frankfurter.app/currencies';
try{
let response= await fetch(endpoint);
if(!response.ok){
    throw new Error('Network downn');
}
const data= await response.json();
//process the data returned from api
let option=[];
for(let symbol in data){
    option= [...option,{label:symbol,value:symbol}]
}
this.options=[...option];
}
catch(error){
console.log(error);
}


    }

    async conversion(){
      /*  const host = 'api.frankfurter.app';
fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
  .then(resp => resp.json())
  .then((data) => {
    alert(`10 GBP = ${data.rates.USD} USD`);
  });*/

  let endpoint=`https://api.frankfurter.app/latest?amount=${this.enteredamount}&from=${this.fromcurrency}&to=${this.tocurrency}`;
  try{
    let response= await fetch(endpoint);
    if(!response.ok){
        throw new Error('Network downn');
    }
    const data= await response.json();
    //process the data returned from api
    this.convertedvalue=data.rates[this.tocurrency];
    this.showoutput=true;
  }
    catch(error){
    console.log(error);
    }
        


}
}