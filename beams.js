
function captureBeam(canvas, context, beamHeight, y){
  return context.getImageData(0, y, canvas.width, beamHeight);
}

function captureBeams(canvas, context, beamHeight){
  const rows = Math.floor(canvas.height / beamHeight);
  const array = [];
  for(let r = 0; r < rows; r++){
    const yTarget = r * beamHeight;
    const y = canvas.height + beamHeight;
    const v = Math.random() >= 0.5 ? 1 : 2;
    const cp = captureBeam(canvas, context, beamHeight, yTarget)
    array.push({yTarget, y, v, cp});
  }
  return array;
}

function drawBeamArray(context, beamArray){
  beamArray.forEach(e => {
    context.putImageData(e.cp, 0, e.y);
  });
}

function updateBeams(beamArray){
  beamArray.forEach(e => {
    Math.abs(e.y - e.yTarget < 5) ? e.v = 0.1: null;
    e.y >= e.yTarget ? e.y -= e.v : null;
  });
}
