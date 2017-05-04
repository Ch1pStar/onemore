class Stick {

    constructor(data) {
        this.p0 = data.p0;
        this.p1 = data.p1;
        this.length = data.l;
    }

    update() {
      let p0 = this.p0;
      let p1 = this.p1;

      if(p0.pinned || p1.pinned) return;

      let dx = p1.x - p0.x;
      let dy = p1.y - p0.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let difference = this.length - distance;
      let percent = difference / distance / 2;
      let offsetX = dx * percent;
      let offsetY = dy * percent;

      p0._x -= offsetX;
      p0._y -= offsetY;
      p1._x += offsetX;
      p1._y += offsetY;

    }   

}