import { LightningElement, api } from 'lwc';

export default class Tab extends LightningElement {
    @api title;
    @api iconName;
    @api badge;

    id;
    isItem = false;
    isContent = false;
    displayed = false;

    @api connect(id, isContent) {
        this.id = id;
        this.isContent = isContent;
        this.isItem = !isContent;
    }

    @api show(id) {
        this.displayed = (id === this.id);
    }

    get contentClasses() {
        return 'slds-vertical-tabs__content ' + ((this.displayed) ? 'slds-show' : 'slds-hide')
    }

    get itemClasses() {
        return 'slds-vertical-tabs__nav-item ' + ((this.displayed) ? 'slds-is-active' : '')
    }
}