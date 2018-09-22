function clearStorage() {
  chrome.storage.sync.clear(() => {
    location.reload();
  });
}

function setText () {
  chrome.storage.sync.get(['stations'], function(results) {
    if (results && results.stations && results.stations.length > 0) {
      var title = document.getElementById('workStationTitle')
      var titleButtonDiv = document.getElementById('titleButton')
      var clearButton = document.createElement('button');
      var className = document.createAttribute('id')
      className.value = 'clearButton';

      clearButton.setAttributeNode(className);
      clearButton.appendChild(document.createTextNode('Clear all stations'));
      clearButton.addEventListener("click", clearStorage);
      title.appendChild(document.createTextNode('Your existing work stations'))
      titleButtonDiv.append(clearButton)
    }
  })
};

setText();
