import { LightningElement } from 'lwc';
import Portfolio from '@salesforce/resourceUrl/Portfolio';
export default class Portfolioothers extends LightningElement {

    awards= `${Portfolio}/PortfolioAssets/trophy.png`;
    superbadges= `${Portfolio}/PortfolioAssets/badge.png`;
    language=`${Portfolio}/PortfolioAssets/language.png`;
}