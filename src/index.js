import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import Demo from 'arcade/demo';

document.querySelector('body')
        .appendChild(createElement('arcade-demo', { is: Demo }));
