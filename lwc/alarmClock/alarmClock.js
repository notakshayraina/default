import { LightningElement } from 'lwc';
import AlarmFiles from '@salesforce/resourceUrl/AlarmFiles';
export default class AlarmClock extends LightningElement {
Datetime;
ampmValue;
hourvalue;
minutevalue;
hours=[];
minutes=[];
alarmTime='';
isalarmset=false;
isAlarmtriggered=false;
changehandleram(event){
    this.ampmValue=event.target.value;
}
    clockimage= AlarmFiles+'/AlarmFiles/6347431.png';
    ringtone= new Audio(AlarmFiles+'/AlarmFiles/Clocksound.mp3');
connectedCallback(){

    setInterval(() => { let dates= new Date();
        let hour= dates.getHours();
        let min= dates.getMinutes();
        let sec=dates.getSeconds();
        let ampm="AM"
        if(hour=='0'){
         hour=12;
     
        }
        else if(hour>=12){
         hour=hour-12;
         ampm="PM";
        }
     
        hour= hour<10 ? "0"+hour:hour;
        min=min<10 ? "0"+min:min;
        sec=sec<10 ? "0"+sec:sec;
        this.Datetime=`${hour}:${min}:${sec} ${ampm}`
    
        if(this.alarmTime===`${hour}:${min} ${ampm}`){
            console.log('Send out alarm');
            this.isAlarmtriggered=true;
            this.ringtone.play();
            this.ringtone.loop=true
        }

    }, 1000);
   this.createhours();
   this.createminutes();
}


createhours(){
    for(let i=1; i<=12;i++)
    {
        let val= i<10? "0"+i:i;
        this.hours.push(val);

    }
}

createminutes(){
    for(let i=0; i<=59;i++)
    {
        let val= i<10? "0"+i:i;
        this.minutes.push(val);

    }
}

optionhandle(event){
const {label,value}=event.detail;

if(label==="Hours")
{
this.hourvalue=value;
}
else if(label=="Minutes"){
this.minutevalue=value;
}


console.log(this.hourvalue,this.minutevalue);
}


get isfieldnotselected(){
  return !(this.hourvalue && this.minutevalue &&this.ampmValue);

}

alarmhandler(event){
    this.alarmTime= `${this.hourvalue}:${this.minutevalue} ${this.ampmValue}`;
    this.isalarmset=true;
}

clearalarm(event){
    this.isalarmset=false;
    this.isAlarmtriggered=false;
    this.ringtone.pause();
this.alarmTime='';
this.hourvalue='';
this.minutevalue='';
this.ampmValue='';
this.template.querySelector('select').value = '';
const elem= this.template.querySelectorAll('c-clock-dropdown')
Array.from(elem).forEach(element=>{
    element.reset('');

})
}


get shakeImage(){
    return this.isAlarmtriggered ? 'shake':'';
}
}