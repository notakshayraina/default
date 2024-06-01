import { LightningElement } from 'lwc';
import Portfolio from '@salesforce/resourceUrl/Portfolio';
export default class Portfoliocertifications extends LightningElement {

    admin= `${Portfolio}/PortfolioAssets/cert_logo.png`;
    adminurl=`${Portfolio}/PortfolioAssets/Administrator.png`;
    platformurl=`${Portfolio}/PortfolioAssets/Platform developer.png`;
    builderurl=`${Portfolio}/PortfolioAssets/Platform App Builder.png`;
    aiurl=`${Portfolio}/PortfolioAssets/Ai associate.png`;
    vlocityurl=`${Portfolio}/PortfolioAssets/Omnistudio consultant cert.png`;
}