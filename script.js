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

function echoColor (event){
  var ctx = photoCanvas.getContext("2d");
  
  const imgData = ctx.getImageData(event.pageX, event.pageX, 1, 1);
  red = imgData.data[0];
  green = imgData.data[1];
  blue = imgData.data[2];
  alpha = imgData.data[3];
  console.log(red + " hola" + green + " " + blue + " " + alpha);
}


function builApp() {
  paintForm();
  paintCanvas();
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