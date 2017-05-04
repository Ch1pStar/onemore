let gravity = -.05;
// let gravity = 0;
let friction = .9999;
// let friction = 1;
let bounce = .9;

let ps = [];
let sticks = [];


for(let i=0;i<5;i++){
  for(let k=0;k<5;k++){
    createTile(100+(i*50), 100+(k*50));    
    // createTile(0+(i*50), 0+(k*50));    
  }
}
sticks.push(new Stick({p0: ps[3], p1: ps[16],l: d(ps[3], ps[16])}));
sticks.push(new Stick({p0: ps[3], p1: ps[87],l: d(ps[3], ps[87])}));

sticks.push(new Stick({p0: ps[16], p1: ps[97],l: d(ps[16], ps[97])}));

sticks.push(new Stick({p0: ps[97], p1: ps[87],l: d(ps[97], ps[87])}));

sticks.push(new Stick({p0: ps[87], p1: ps[3],l: d(ps[87], ps[3])}));

sticks.push(new Stick({p0: ps[3], p1: ps[97],l: d(ps[3], ps[97])}));


function createTile(x, y, width=50, height=50){
    const points = [];

    // top left, top right, bottom right, bottom left
    points.push(new Point({x: x, y: y+height}));
    points.push(new Point({x: x+width, y: y+height}));
    points.push(new Point({x: x+width, y: y}));
    points.push(new Point({x: x, y: y}));

    ps = ps.concat(points);

    sticks.push(new Stick({p0: points[0],p1: points[1],l: d(points[0], points[1])}));
    sticks.push(new Stick({p0: points[1],p1: points[2],l: d(points[1], points[2])}));
    sticks.push(new Stick({p0: points[2],p1: points[3],l: d(points[2], points[3])}));
    sticks.push(new Stick({p0: points[3],p1: points[0],l: d(points[3], points[0])}));
    sticks.push(new Stick({p0: points[0],p1: points[2],l: d(points[0], points[2])}));
}


vCount = ps.length;
const init = () => {
  initRender();

  drawMode = 2;


  const update = (t)=>{
    requestAnimationFrame(update);

    for(let i=0,len=ps.length;i<len;i++){
      const p = ps[i];

      p.update();
    }

    for(let i=0,len=sticks.length;i<len;i++){
      for(let k=0;k<4;k++){
        sticks[i].update();
      }
    }

    let vertices = [];
    for(let i=0,len=ps.length;i<len;i++){
      const p = ps[i];

      vertices = vertices.concat(p.vertices);
    }

    uploadData(vertices);
    
  }

  update(performance.now());
}


function d(p0, p1){
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;

    return Math.sqrt(dx * dx + dy * dy);
}



document.addEventListener('DOMContentLoaded', init);