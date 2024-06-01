import { LightningElement } from 'lwc';
import Portfolio from '@salesforce/resourceUrl/Portfolio';

export default class Portfolioprojects extends LightningElement {
    alarmimg=`${Portfolio}/PortfolioAssets/Projects/AlarmClock.png`
    weathering=`${Portfolio}/PortfolioAssets/Projects/WeatherApp.png`
    bming=`${Portfolio}/PortfolioAssets/Projects/BMICalculator.png`




     alarmurl ="https://portfolioofakshayraina-dev-ed.my.site.com/alarmclock";
     weatherurl="https://portfolioofakshayraina-dev-ed.my.site.com/weatherapp";
     bmiurl="https://portfolioofakshayraina-dev-ed.my.site.com/bmi-calculator";
}