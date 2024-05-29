import { LightningElement,api } from 'lwc';
import Portfolio from '@salesforce/resourceUrl/Portfolio';

export default class Portfoliocontent extends LightningElement {

 @api LinkedinUrl ="https://www.linkedin.com/in/akshay-raina-985105173";
 @api trailheadurl //="https://www.salesforce.com/trailblazer/araina15";
 @api intagramurl //="https://www.instagram.com/notakshayraina_?igsh=MTFyem84eDUyc2JxOA%3D%3D&utm_source=qr";

    userPic= `${Portfolio}/PortfolioAssets/profile-pic.png`
    linkedin=`${Portfolio}/PortfolioAssets/Social/linkedin.svg`
    trailhead=`${Portfolio}/PortfolioAssets/Social/trailhead.svg`
    instagram=`${Portfolio}/PortfolioAssets/Social/insta.png`
    
}