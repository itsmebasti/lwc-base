import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import Demo from 'base/demo';

document.querySelector('body')
        .appendChild(createElement('base-demo', { is: Demo }));
