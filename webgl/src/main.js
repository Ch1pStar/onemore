let gravity = 2;
// let gravity = 0;
let friction = .9999;
// let friction = 1;
let bounce = .9;

// let ps = [new Point({x:150,y:30}), new Point({x:150,y:50})];
// let sticks = [new Stick({p0:ps[0], p1:ps[1], l:d(ps[0], ps[1])})];

let ps = [];
let sticks = [];

let mX = 0;
let mY = 0;

let pinTop = true;

createCloth();
vCount = ps.length;

const init = () => {
  initRender();


  document.querySelector('canvas').addEventListener('mousemove', (e)=>{
  // document.addEventListener('mousemove', (e)=>{
    mX = e.clientX;
    mY = e.clientY;

  });

  // LINE_LOOP = 2
  // LINE_STRIP = 3
  // TRIANGLES_STRIP = 5

  drawMode = 3;

  const update = (t)=>{
    requestAnimationFrame(update);

    updatePoints();
    ps[ps.length-30].x = mX;
    ps[ps.length-30].y = mY;

    // ps[ps.length-1].x = mX;
    // ps[ps.length-1].y = mY;

    updateSticks();

    uploadPointVertices();
  }

  update(performance.now());
}

function createCloth() {
  const width = 20;
  const height = 10;

  const pointDistX = 25;
  const pointDistY = 25;

  const pointOffsetX = 150;
  // const pointOffsetY = -450;
  const pointOffsetY = 250;

  ps = new Array(width*height);

  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const p1 = new Point({x:(x*pointDistX)+pointOffsetX, y:((-y)*pointDistY)+pointOffsetY});

      const invert = height-y-1; //inverts y axis

      if (invert == 0 && pinTop){
        p1.pinned = true;
      }
      const index = (invert*width)+x;
      ps[index] = p1;

      // console.log(`invert(${invert}) * y(${y}) + x(${x}) = ${ index }`);
     }
  }

  let q = 0;

  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const invert = height-y-1; //inverts y axis

      //link upward
      if(y != 0) { //skip top row
        const p0 = ps[invert*width+x];
        const p1 = ps[(invert+1)*width+x];

        sticks[q] = new Stick({p0:p0, p1: p1, l:d(p0, p1)});
        q++;
      }

      //link leftward (is that a word?)
      if(x != 0) { //skip left edge
        const p0 = ps[invert*width+x];
        const p1 = ps[invert*width+x-1];

        sticks[q] = new Stick({p0:p0, p1: p1, l:d(p0, p1)});;
        q++;
      }
    }
  }
}

function updatePoints() {
  for(let i=0,len=ps.length;i<len;i++){
    const p = ps[i];

    p.update();
  }
}

function updateSticks() {
  for(let k=0;k<8;k++){
    for(let i=0,len=sticks.length;i<len;i++){
        sticks[i].update();
    }
  }
}

function uploadPointVertices() {
  let vertices = [];

  for(let i=0,len=ps.length;i<len;i++){
    const p = ps[i];

    vertices = vertices.concat(p.vertices);
  }

  // vCount = ps.length;
  uploadData(vertices);
}

function d(p0, p1){
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;

    return Math.sqrt(dx * dx + dy * dy);
}

document.addEventListener('DOMContentLoaded', init);