import { LightningElement, api, track } from 'lwc';

export default class Toast extends LightningElement {
    id = 0;
    @track toasts = [];

    @api display(severity, message, details) {
        this.toasts.push({
            id: this.id++,
            message,
            details,
            icon: 'utility:' + severity,
            css: 'slds-notify slds-notify_toast slds-theme_' + severity
        });

        this.show = setTimeout(() => this.toasts.shift(), 2000);
    }
}