var button = document.getElementById('submitLinksButton');

button.onclick = function() {
  var groupTitle = document.getElementById('stationName').value;
  var urlSet = document.getElementById('linkBox').value;
  var urlArray = urlSet.split('\n');
  var userWorkStations = chrome.storage.sync.get(['stations'], function(result) {
    var allStations= result.stations || [];
    var newStation= {
      name: groupTitle,
      links: urlArray,
    }
    allStations.push(newStation);
    chrome.storage.sync.set({ 'stations': allStations }, function() {
      console.log('Added links')
  });
  });
}
