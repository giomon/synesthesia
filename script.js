console.log("Hola");

function paintForm () {
  const formSection = document.querySelector('.form-section');
  const domForm = `<input
   id="photoInput" 
   type="file" 
   accept="image/*;capture=camera">
  `
  formSection.innerHTML = domForm;
}

function paintCanvas () {
  const imageSection = document.querySelector('.image-section');
  const domCanvas = `<canvas 
    id="photoCanvas"  
    width="300" 
    height="300" 
    onclick="echoColor(event)"
    >
    </canvas>`
  imageSection.innerHTML = domCanvas;
}
function paintSound () {
  const soundSection = document.querySelector('.sound-section');
  const domSound = `
    <audio 
    id="audio" 
    type="audio/wav"
    preload="none"
    controls=""
    src="./lasser.wav" hidden>
    </audio>`
  soundSection.innerHTML = domSound;  
}

function echoColor (event) {
  var ctx = photoCanvas.getContext("2d");
  
  const imgData = ctx.getImageData(event.pageX, event.pageX, 1, 1);
  red = imgData.data[0];
  green = imgData.data[1];
  blue = imgData.data[2];
  alpha = imgData.data[3];
  console.log(red, green, blue, alpha);

  const audio = document.getElementById('audio');

  if(red===0 && green === 0 && blue === 0 && alpha === 255){
    isBlack(audio)
  }
}

function isBlack(element){
  element.play();
}


function builApp() {
  paintForm();
  paintCanvas();
  paintSound();
  const photoCanvas = document.getElementById('photoCanvas');
  const photoForm = document.getElementById('photoInput');
  
  
  photoForm.addEventListener('change',function () {
    const photoFile = this.files[0];
    const filereader = new FileReader();
    
    filereader.onload = function(event){
      const img = new Image();

      img.addEventListener('load', function(){
        ctx = photoCanvas.getContext("2d")
        ctx.drawImage(img, 0, 0);
      });

      img.src = event.target.result;
    }
    filereader.readAsDataURL(photoFile);
  });  

}

builApp();