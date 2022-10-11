import { LightningElement, api } from 'lwc';

export default class DateTime extends LightningElement {
    milliseconds;
    
    @api set value(value = 0) {
        this.milliseconds = parseInt(value / 1000) * 1000;
    }
    
    get value() {
        const dateControl = this.template.querySelector('input.date');
        const timeControl = this.template.querySelector('input.time');
        const date = new Date(dateControl.valueAsNumber + timeControl.valueAsNumber);

        return parseInt(date.getTime() + this.offsetMillis(date));
    }

    get date() {
        const date = new Date(this.milliseconds);
        return new Date(date.getTime() - this.offsetMillis(date)).toISOString().slice(0, 10);
    }

    get time() {
        return new Date(this.milliseconds).toLocaleTimeString('de-DE');
    }
    
    offsetMillis(date) {
        return date.getTimezoneOffset() * 60 * 1000;
    }
}