var clearButton = document.getElementById('clearButton');
clearButton.onclick = function () {
  chrome.storage.sync.clear(() => {
    location.reload();
  })
}
