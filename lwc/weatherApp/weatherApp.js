import { LightningElement,wire,track } from 'lwc';
import WeatherAppIcon from '@salesforce/resourceUrl/WeatherAppIcon';
import searchhandle from '@salesforce/apex/classsearch.searchhandle';
import meancall from '@salesforce/apex/MeanApicall.meancall';
export default class WeatherApp extends LightningElement {
@track input="";
showoptions=false;
clickedvalue='';
cities=[];
clearicon= WeatherAppIcon +'/weatherAppIcons/clear.svg';
cloudicon=WeatherAppIcon +'/weatherAppIcons/cloud.svg';
dropleticon=WeatherAppIcon +'/weatherAppIcons/droplet.svg';
hazeicon=WeatherAppIcon +'/weatherAppIcons/haze.svg';
mapicon=WeatherAppIcon +'/weatherAppIcons/map.svg';
rainicon=WeatherAppIcon +'/weatherAppIcons/rain.svg';
snowicon=WeatherAppIcon +'/weatherAppIcons/snow.svg';
stormicon=WeatherAppIcon +'/weatherAppIcons/storm.svg';
thermometericon=WeatherAppIcon +'/weatherAppIcons/thermometer.svg';
arrowbackicon=WeatherAppIcon +'/weatherAppIcons/arrow-back.svg';
changingcity(event){
this.input=event.target.value;
console.log('City typed',this.input);
this.clickedvalue='';
this.cityname='';
this.iserror=false;
this.loadingtext='';
 if(this.input==null){
    this.showoptions=false;
 }

    this.showoptions=true;
}

@wire(searchhandle,{name:"$input"})
wiredresult({data,error}){

    if(data){
        this.cities=data;
        if(data.length<=0){
            this.showoptions=false;
        }
        
    }
   
}

    cityname='';
loadingtext='';
iserror=false;
response
weathericon
get dynamicallo(){
    return this.iserror ? 'errors':'load';
}
    searchhandler(event){
this.cityname=event.target.value;
    }
    clickhandled(event){
        let rec= event.target.getAttribute("data-recid");
       console.log('Record id',rec);
       this.cityname=rec;
       console.log('City name',this.cityname);
       this.showoptions=false;
       this.clickedvalue=rec;
       this.input=rec;
       
    }

    submithandler(event){
        event.preventDefault()
        console.log("city name",this.cityname);
        this.loadingtext='Fetching weather for you...';
        //const URL=`https://api.openweathermap.org/data/2.5/weather?q=${this.cityname}&units=metric&appid=${API_KEY}`;
       

        
     //server side call below- Imperative model, cannot use wire here ,as it is a reactive model and cannot be based on events.
         meancall({city: this.cityname}).then(res=>{
        this.weatherdetails(JSON.parse(res));
      }).catch((error)=>{
        console.log('Something went wrong');
        console.log(error);
        this.iserror=true;
        this.loadingtext='Something went wrong, try again!';
       })
        

       /*  Client side call   
       fetch(URL).then(res=>res.json()).then(result=>{
       console.log(JSON.stringify(result));
       this.weatherdetails(result)*/
       

    }

weatherdetails(info){
    
    if(info.cod === "404"){
        this.iserror=true;
        this.loadingtext=`${this.cityname} is not available`;
    
    }
    else{
    this.loadingtext='';
       const city = info.name
       const country = info.sys.country
       const {description, id} = info.weather[0]
       const {temp, feels_like, humidity} = info.main
       console.log("city",city);
       if(id===800){
        this.weathericon=this.clearicon;

       }
       else if(id>=200 && id<=232){
        this.weathericon=this.stormicon;
       }

       else if( id>=600 && id<=622){
        this.weathericon=this.stormicon;
       }
       else if( id>=701 && id<=781){
        this.weathericon=this.hazeicon;
       }
       else if( id>=801 && id<=804){
        this.weathericon=this.cloudicon;
       }

       else if( id>=500 && id<=531 || id>=300 && id<=321){
        this.weathericon=this.rainicon;
       }
       else{

       }

       this.response= {
        city: city,
        temperature:Math.floor(temp),
        location:`${city},${country}`,
        description:description,
        feels_like: Math.floor(feels_like),
        humidity:`${humidity}%`

       }

       
}
}

clickhandler(){
    this.response=null
    this.cityname=''
    this.loadingtext=''
    this.iserror=false
    this.weathericon=''
    this.showoptions=false;
    this.input='';
    this.clickedvalue='';
}

}