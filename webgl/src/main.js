var vertices = [
  1.0,  1,  0.0, // top right
  -1, 1.0,  0.0, // top left
  1.0,  -1.0, 0.0, // bottom right
  -1.0, -1, 0.0 // bottom left
];

const init = () => {
  initRender();


  const update = (t)=>{
    requestAnimationFrame(update);

    vertices[0] = Math.sin(t/200);
    vertices[3] = Math.cos(t/200);
    // vertices[3] = Math.atan(t/100);

    uploadData(vertices);
    
  }

  update(performance.now());


}



document.addEventListener('DOMContentLoaded', init);