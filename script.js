console.log("Hola");

function paintForm () {
  const formSection = document.querySelector('.form-section');
  const domForm = `<input
   id="myFileInput" 
   type="file" 
   accept="image/*;capture=camera">
  `
  formSection.innerHTML = domForm;
}

function builApp() {
  paintForm();

}

builApp();