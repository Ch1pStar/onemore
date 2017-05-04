class Point{

    constructor(data) {
        this._x = data.x;
        this._y = data.y;

        this.x = data.x;
        this.y = data.y;

        this.pinned = data.pinned || false;
    }

    update(){
        if(this.pinned) return;

        const vx = (this._x - this._oldX) * friction;
        const vy = (this._y - this._oldY) * friction;

        this.x += vx;
        this.y += vy + gravity;

        this.constraint(vx, vy);
    }

    constraint(vx, vy) {
        if(this.x > width) {
            this._x = width;
            this._oldX = this._x + vx * bounce;
        }
        else if(this.x < 0) {
            this._x = 0;
            this._oldX = this._x + vx * bounce;
        }
        if(this.y > height-15) {
            this._y = height-15;
            this._oldY = this._y + vy * bounce;
        }
        else if(this.y < 0) {
            this._y = 0;
            this._oldY = this._y + vy * bounce;
        }
    }

    set x(val) {
        this._oldX = this._x;
        this._x = val;
        this.sprite && (this.sprite.x = val);
    }

    set y(val) {
        this._oldY = this._y;
        this._y = val;
        this.sprite && (this.sprite.y = val);
    }

    get vertices() {
        const vertices = new Array(3);
        vertices[0] = pixelToVertex(this._x, width);
        vertices[1] = pixelToVertex(this._y, height);
        vertices[2] = 0; // no 3d

        return vertices;
    };


    get x() {return this._x};
    get y() {return this._y};

    get oldX() {return this._oldX};
    get oldY() {return this._oldY};
}