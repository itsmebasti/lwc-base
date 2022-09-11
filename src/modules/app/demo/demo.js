import { LightningElement, track } from 'lwc';

export default class Demo extends LightningElement {

    toast(evt) {
        this.template.querySelector('base-toast').show('Demo');
    }
}
