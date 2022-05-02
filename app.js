window.addEventListener("contextmenu",e => e.preventDefault())

const canvas1 = document.querySelector('#canvas1');
const context1 = canvas1.getContext('2d');
const canvas2 = document.querySelector('#canvas2');
const context2 = canvas2.getContext('2d');

resizeCanvas(canvas1);
resizeCanvas(canvas2);

drawHTMLimage(riverData, canvas1, context1);
drawHTMLimage(bridgeData, canvas2, context2);

let riverParticleArray;
let beamArray;
let state = 0;


document.addEventListener('image-drawn', () => {
  //code
  const particleSize = 10;
  riverParticleArray = captureParticles(canvas1, context1, particleSize);
})

setTimeout(()=>{
  const beamHeight = 10;
  beamArray = captureBeams(canvas2, context2, beamHeight);
},1000);

window.addEventListener('click', () => {
  state === 0 ? loop() : null;
  state++;
  // console.log(state)
});

const fps = 60;
const interval = 1000 / fps;
let now = Date.now();
let then = Date.now();
let delta = 0;
let animation;

function loop(){
  animation = requestAnimationFrame(loop);
  now = Date.now();
  delta = now - then;
  if(delta > interval){
      then = now - (delta % interval);
      //animation code
      if(state === 1){
        drawParticles(context1, riverParticleArray);
        updateParticles(riverParticleArray);
        return;
      }
      if(state === 2){
        fadeCanvas(canvas1, context1);
        setTimeout(()=>{state = 3}, 2000);
        return;
      }
      if(state === 3){
        drawBeamArray(context1, beamArray);
        updateBeams(beamArray);
        return;
      }
      if(state === 4){
        cancelAnimationFrame(animation);
      }
    }
}
