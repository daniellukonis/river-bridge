function resizeCanvas(canvas, width, height){
    canvas.width = width || window.innerWidth;
    canvas.height = height || window.innerHeight;
}

function clearCanvas(canvas, context){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function fadeCanvas(canvas, context){
  context.fillStyle = '#00000020';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function getCanvasOrientation(canvas){
  return canvas.width >= canvas.height ? 'landscape' : 'portrait';
}

function getImageCanvasRatio(image, canvas, orientation){
  return orientation === 'landscape' ? canvas.height / image.height : canvas.width / image.width;
}

function xOffset(image, canvas, orientation){
  return orientation === 'landscape' ? Math.floor((canvas.width / 2) - (image.width / 2)) : 0;
}

function yOffset(image, canvas, orientation){
  return orientation === 'landscape' ? 0 : Math.floor((canvas.height / 2) - (image.height / 2));
}

function setImageWidth(image, ratio){
  return Math.floor(image.width * ratio);
}

function setImageHeight(image, ratio){
  return Math.floor(image.height * ratio);
}

const imageDrawn = new Event('image-drawn');

function drawHTMLimage(imageData, canvas, context){
  const image = new Image();
  image.src = imageData;
  image.addEventListener('load', () => {

    const orientation = getCanvasOrientation(canvas);
    const ratio = getImageCanvasRatio(image, canvas, orientation);
    image.width = setImageWidth(image, ratio);
    image.height = setImageHeight(image, ratio);
    resizeCanvas(canvas, image.width, image.height);
    context.drawImage(image, 0, 0, image.width, image.height);
    // const x = xOffset(image, canvas, orientation);
    // const y = yOffset(image, canvas, orientation);
    // context.drawImage(image, x, y, image.width, image.height);
    document.dispatchEvent(imageDrawn);
  })
}
