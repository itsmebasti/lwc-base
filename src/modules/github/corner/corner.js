import { LightningElement, api } from 'lwc';

export default class Corner extends LightningElement {
    @api repo;
    @api cornerColor = 'black';
    @api octoColor = 'white';
}