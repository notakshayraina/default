import { LightningElement } from 'lwc';

export default class Portfoliouserdetails extends LightningElement {

    records='0035g00001ABPwyAAH';
    objectapiname='Contact';
    downloadresume(event){
        window.open('https://github.com/notakshayraina/resumeakshay/raw/main/Resume%20Akshay%20A.pdf',"_blank");

    }

}