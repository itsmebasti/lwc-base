const DOWN = {axis: 'y', value: 1};
const UP = {axis: 'y', value: -1};
const RIGHT = {axis: 'x', value: 1};
const LEFT = {axis: 'x', value: -1};

DOWN.opposite = UP;
UP.opposite = DOWN;
RIGHT.opposite = LEFT;
LEFT.opposite = RIGHT;

// Note: this queue is holding the two latest directions.
//       It was needed to fix issues where snake was too slow to handle fast direction changes
class Queue {
    last;
    queue = [];
    
    start(direction) {
        this.queue.length = 0;
        this.last = direction;
    }
    
    add(direction) {
        if(this.queue[0] && direction !== this.queue[0]) {
            this.queue[1] = direction;
        }
        else {
            this.queue[0] = direction;
        }
    }
    
    next() {
        let next = this.queue.shift();
        
        if(next?.opposite === this.last) {
            next = this.queue.shift();
        }
        
        next = next || this.last;
        
        this.last = next;
        return next;
    }
}

export default { UP, DOWN, RIGHT, LEFT, Queue };