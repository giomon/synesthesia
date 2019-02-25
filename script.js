/**
   * We'll keep track of the touches in-progress. 
  */
 let ongoingTouches = [];

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
    width="400" 
    height="400" 
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
    type="audio/mp3"
    preload="none"
    controls=""
    src="./music.mp3" hidden>
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
  event.preventDefault();
  const canvasContex = photoCanvas.getContext("2d");
  const audio = document.getElementById('audio');
  const imgData = canvasContex.getImageData(event.pageX, event.pageX, 1, 1);
  


  [red, green, blue, alpha] = imgData.data;
  if(red < 85 && green < 85 && blue < 85 && alpha === 255){
    isBlack(audio)
  }else{
    stopPlay();
  }
}

/**
 * This function play
 * the audio element
 * @param {Node} element 
 */
function isBlack(element){
  element.play();
  console.log(element);
}

/**
 * Stop the audio element
 * @param {Node} element 
 */
function stopPlay(element){
  element.pause();
  element.currentTime = 0;
}

/**
 * The ongoingTouchIndexById() function below scans through the ongoingTouches array to find the touch matching the given identifier, then returns that touch's index into the array.
 * @param {Event} idToFind 
 */
function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;
    
    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}
/**
 * Some browsers (mobile Safari, for one) re-use touch objects between events, so it's best to copy the bits you care about, rather than referencing the entire object.
 * @param {Event} event 
 */
function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

/**
 * When a touch start
 * @param {Event} event 
 */
function handleStart(event) {
  const canvasContext = photoCanvas.getContext("2d");
  const audio = document.getElementById('audio');

  const touches = event.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));

    let imgData = canvasContext.getImageData(touches[i].pageX, touches[i].pageY, 1, 1);
    [red, green, blue, alpha] = imgData.data;
    console.log(red, green, blue, alpha);
    
    if(red < 85 && green < 85 && blue < 85 ){
      isBlack(audio)
    } else {
      stopPlay(audio);
    }
  }
}


/**
 * When a touch event continues
 * @param {Event} event 
 */
function handleMove(event) {
  const canvasContext = photoCanvas.getContext("2d");
  const audio = document.getElementById('audio');

  const touches = event.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);      
    
    if (idx >= 0) {
      console.log("continuing touch ",idx);

      let imgData = canvasContext.getImageData(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY, 1, 1);
      [red, green, blue, alpha] = imgData.data;
      console.log(red, green, blue, alpha);
      
      if(red < 85 && green < 85 && blue < 85 ){
        isBlack(audio)
      } else {
        stopPlay(audio);
      }

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
    }
  }  
}

/**
 * When a touch event continues
 * @param {Event} event 
 */
function handleCancel(event) {
  event.preventDefault();
  const audio = document.getElementById('audio');
  var touches = event.changedTouches;
  
  stopPlay(audio);

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  
  }
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
  

  photoCanvas.addEventListener("touchstart", handleStart, false);
  photoCanvas.addEventListener("touchmove", handleMove, false);
  photoCanvas.addEventListener("touchend", handleCancel, false);
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