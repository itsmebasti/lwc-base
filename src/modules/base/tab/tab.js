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

    get itemClasses() {
        return 'nav-item slds-vertical-tabs__nav-item ' + ((this.displayed) ? 'slds-is-active' : '')
    }

    get contentClasses() {
        return 'content ' + ((this.displayed) ? 'slds-show' : 'slds-hide')
    }
}