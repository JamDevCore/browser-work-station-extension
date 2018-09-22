function getRandomId() {
  var randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return randomId;
}

function createWarning() {
  var warning = document.createElement('p')
  warning.style = "color: red;"
  warning.appendChild(document.createTextNode('Please add a title and the links you want to save'))
  return warning;
}

function addSubmitLinkButtonEvent() {

  var button = document.getElementById('submitLinksButton');
  button.onclick = function(e) {
    var groupTitle = document.getElementById('stationName').value;
    var urlSet = document.getElementById('linkBox').value;
    if (groupTitle && urlSet) {
      var urlArray = urlSet.split('\n');
      var userWorkStations = chrome.storage.sync.get(['stations'], function(result) {
        var allStations = result.stations || [];
        const buttonId = getRandomId();
        var newStation= {
          name: groupTitle,
          links: urlArray,
          id: buttonId,
        }
        allStations.push(newStation);
        chrome.storage.sync.set({ 'stations': allStations }, function() {
          console.log('Added links')
        });
      });
    } else {
      e.preventDefault();
      var warningDiv = document.getElementById('warningDiv')
      if (warningDiv.childNodes[0]) warningDiv.removeChild(warningDiv.childNodes[0]);
      warningDiv.appendChild(createWarning())
    }
  }
}

addSubmitLinkButtonEvent();
