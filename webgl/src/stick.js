class Stick {


    constructor(data) {
        // this.sprite = new PIXI.Sprite(this.genTexture(length));
        this.genTexture(data.length);
        this.p0 = data.p0;
        this.p1 = data.p1;
        this.length = data.length;
    }

    update() {
      let p0 = this.p0;
      let p1 = this.p1;
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

      if(this.sprite){
        this.sprite.x = p0.x;
        this.sprite.y = p0.y;
        this.sprite.rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
      }

    }

  genTexture(len) {
    const a = new PIXI.Graphics();
    a.beginFill(0xFF3300);
    a.lineStyle(1, 0xffd900, 1);

    a.moveTo(0,0);
    a.lineTo(len, 0);
    a.endFill();

    stage.addChild(a);

    this.sprite = a;
  }    

}