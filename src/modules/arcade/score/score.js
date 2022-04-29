import { LightningElement, track, api } from 'lwc';
import Grid from '../view/model/grid';
import numbers from '../view/model/numbers';

export default class Score extends LightningElement {
    @api scale = 10;
    @api border = 'green';
    @api background = 'black';
    @track board;
    
    _digits;
    _score;
    _color = 'white';
    
    @api set digits(value) {
        this._digits = value;
        this.renderScore();
    }
    
    @api set score(value) {
        this._score = value;
        this.renderScore();
    }
    
    @api set color(value) {
        this._color = value;
        this.renderScore();
    }
    
    renderScore() {
        if(isNaN(this.score) || isNaN(this.digits)) {
            return;
        }
    
        this.board = this.board ?? new Grid(this.digits * 4 - 1, 5);
        
        this.board.clear();
    
        this.score.toString().split('')
             .reverse()
             .forEach((digit, i) => {
                 this.board.draw(this.board.width - 3 - i*4, 0, numbers[digit], this.color);
             });
    }
    
    get digits() {
        return this._digits;
    }
    
    get score() {
        return this._score;
    }
    
    get color() {
        return this._color;
    }
}