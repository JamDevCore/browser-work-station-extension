function setText () {
  chrome.storage.sync.get(['stations'], function(results) {
    if (results && results.stations && results.stations.length > 0) {
      var title = document.getElementById('workStationTitle')
      title.appendChild(document.createTextNode('Your existing work stations'))
    }
  })
};

setText();
