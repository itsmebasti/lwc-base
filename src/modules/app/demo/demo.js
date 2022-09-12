import { LightningElement, track } from 'lwc';
import { CacheMixin } from '../../../lib/cache';

export default class Demo extends CacheMixin(LightningElement) {
    @track cache = this.cached({ demo: 'change me' });

    options = ['foo', 'bar'];

    toast(evt) {
        const value = evt.target.innerText;
        this.template.querySelector('base-toast').display(value, value);
    }

    updateCache(evt) {
        this.cache.demo = this.template.querySelector('lightning-input.cache').value;
    }

    resetCache(evt) {
        this.cache.reset('demo');
    }
}
