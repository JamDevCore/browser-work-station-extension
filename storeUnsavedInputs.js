function storeUnsavedTitleText(e) {
  var input = e.target;
  var titleText = input.value;

}

function storeUnsavedInputs() {
var titleInput = document.getElementById('stationName');
titleInput.addEventListener('change', storeUnsavedTitleText);

}
