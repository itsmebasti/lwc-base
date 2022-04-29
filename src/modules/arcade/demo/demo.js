import { LightningElement, track } from 'lwc';
import Grid from '../view/model/grid';
import numbers from '../view/model/numbers';

export default class Demo extends LightningElement {
    @track grid = new Grid(10, 7);
    @track interactive = new Grid(10, 10);

    constructor() {
        super();

        this.grid.draw(-1, 1, numbers[1], 'LightBlue');
        this.grid.draw(2, 1, numbers[8], 'LightGreen');
        this.grid.draw(6, 1, numbers[8], 'LightCoral');
    }

    paint({offsetX: x, offsetY: y, currentTarget: {scale}}) {
        x = x/Number(scale)|0;
        y = y/Number(scale)|0;

        this.interactive.paint(x, y, 'orange');
    }
}
