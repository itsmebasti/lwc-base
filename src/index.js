import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import Demo from 'app/demo';

document.querySelector('body')
        .appendChild(createElement('app-demo', { is: Demo }));
