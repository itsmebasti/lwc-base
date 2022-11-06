import { LightningElement, api } from 'lwc';

export default class Select extends LightningElement {
    @api label;
    @api options;
    _value;

    bubble(evt) {
        this.dispatchEvent(new CustomEvent('change', {detail: evt.target.value}))
    }
    
    @api set value(value) {
        this._value = value;
        
        // Note: solve rendering issues https://salesforce.stackexchange.com/q/369236/2513
        if(this.template.querySelector('select')) {
            this.template.querySelector('select').selectedIndex = this.options.indexOf(value);
        }
    }
    
    get value() {
        return this._value;
    }

    get selectOptions() {
        return this.options?.map((option) => ({
            value: option,
            selected: (option === this.value)
        })) ?? [];
    }
}