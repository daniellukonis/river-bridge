function captureParticle(canvas, context, x, y, particleSize){
  return context.getImageData(x, y, particleSize, particleSize);
}

function captureParticles(canvas, context, particleSize){
  const columns = Math.floor(canvas.width / particleSize);
  const rows = Math.floor(canvas.height / particleSize);
  const particles = [];
  for(let c = 0; c <= columns; c++){
    for(let r = 0; r <= rows; r++){
      const x = c * particleSize;
      const y = r * particleSize;
      const v = Math.random() + 1;
      const a = Math.PI * 2 * Math.random();
      const av = 0.1;
      const cp = captureParticle(canvas, context, x, y, particleSize);
      particles.push({x, y, v, a, av, cp});
    }
  }
  return particles;
}

function drawParticles(context, particleArray){
  particleArray.forEach(e => {
    context.putImageData(e.cp, e.x, e.y);
  });
}

function updateParticles(particleArray){
  particleArray.forEach(e => {
    e.y += e.v;
    e.a += e.av;
    e.x += Math.cos(e.a);
  });
}

function checkParticles(canvas, particleArray){
  return particleArray.every(e => {
    e.y > canvas.height;
  })
}
