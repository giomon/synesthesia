/**
 * Function for paint the form component.
 */
function paintForm () {
  const formSection = document.querySelector('.form-section');
  const domForm = `<input
   id="photoInput" 
   type="file" 
   accept="image/*;capture=camera">
  `
  formSection.innerHTML = domForm;
}

/**
 * Function for paint the canvas component.
 */
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

/**
 * Function for paint the audio component.
 */
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

/**
 * Function for get the canvas
 * contex and play the sound
 * when a color near black is
 * press at the image.
 */
function echoColor (event) {
  const canvasContex = photoCanvas.getContext("2d");
  const audio = document.getElementById('audio');
  const imgData = canvasContex.getImageData(event.pageX, event.pageX, 1, 1);
  
  [red, green, blue, alpha] = imgData.data;
  if(red < 85 && green < 85 && blue < 85 && alpha === 255){
    isBlack(audio)
  }
}

/**
 * This function play
 * the audio element
 * @param {Node} element 
 */
function isBlack(element){
  element.play();
}


/**
 * Function for init the 
 * app & put all the
 * elemts in the Document
 */
function builApp() {
  paintForm();
  paintCanvas();
  paintSound();
  const photoCanvas = document.getElementById('photoCanvas');
  const photoForm = document.getElementById('photoInput');
  

  /**
   * When a image is upload
   * Put the image in the canvas
   *  
   * */
  photoForm.addEventListener('change',function () {
    const canvasContext = photoCanvas.getContext("2d");

    canvasContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
    canvasContext.fillStyle = "white";


    const photoFile = this.files[0];
    const filereader = new FileReader();
    
    filereader.onload = function(event){
      const img = new Image();

      img.addEventListener('load', function(){
        canvasContext.drawImage(img, 0, 0);
      });

      img.src = event.target.result;
    }
    filereader.readAsDataURL(photoFile);
  });  

}

builApp();