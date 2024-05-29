import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
height='';
weight='';
bodymassindex='';
res='';
val;

    handler(event){
this.height=event.target.value;
    }

    handlerweight(event){
  this.weight=event.target.value;
    }

    clickhandler(event){
        event.preventDefault();
        console.log("height",this.height);
        console.log("Weight",this.weight);
  let temp= Number(this.height)/100;
  let bmi= Number(this.weight)/(temp*temp);
  
  console.log("bmi",bmi);
  this.bodymassindex=Number(bmi.toFixed(2));

  if(this.bodymassindex<18.5){
 this.res="Underweight";
  }
  else if(this.bodymassindex>=18.5 && this.bodymassindex<25){
this.res="Healthy";
  }
  else if(this.bodymassindex>25 && this.bodymassindex<30){
this.res="Overweight";
  }
  else if(this.bodymassindex>30){
this.res-="Obese";
  }


  console.log('BMI',this.bodymassindex);
  console.log('result',this.res);
    }
    clickingthebutton(event){
        this.res='';
        this.height='';
        this.weight='';
        this.bodymassindex='';
    }
}