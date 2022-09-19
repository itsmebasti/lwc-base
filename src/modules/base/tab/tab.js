import { LightningElement, api } from 'lwc';

export default class Tab extends LightningElement {
    @api label;
    @api icon;
    @api badge;

    @api get id() {
        return encodeURI(this.label);
    }
}