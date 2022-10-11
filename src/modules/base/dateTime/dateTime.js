import { LightningElement, api } from 'lwc';

export default class DateTime extends LightningElement {
    milliseconds;
    
    @api set value(value) {
        this.milliseconds = value * 1000;
    }
    
    get value() {
        const dateControl = this.template.querySelector('input.date');
        const timeControl = this.template.querySelector('input.time');
        const date = new Date(dateControl.valueAsNumber + timeControl.valueAsNumber);

        return parseInt((date.getTime() + (date.getTimezoneOffset() * 60)) / 1000);
    }

    get date() {
        const datetime = new Date(this.milliseconds);
        return new Date(datetime.getTime() - (datetime.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
    }

    get time() {
        return new Date(this.milliseconds).toLocaleTimeString('de-DE');
    }
}
