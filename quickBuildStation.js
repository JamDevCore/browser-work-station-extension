function buildStation (e) {
  var stationName = document.getElementById('stationName').value;
  if (stationName) {
    chrome.tabs.query({currentWindow: true}, (result) => {
      var urlArray = result.map(tab => tab.url);
      chrome.storage.sync.get(['stations'], (res) => {

        var stations = res.stations || [];
        var newStation = {
          name: stationName,
          links: urlArray,
        }

        stations.push(newStation);
        chrome.storage.sync.set({'stations': stations }, (result) => {
          location.reload();
        });
      })
    })
  } else {
    e.preventDefault();
    var warningDiv = document.getElementById('warningDiv')
    if (warningDiv.childNodes[0]) warningDiv.removeChild(warningDiv.childNodes[0]);
    warningDiv.appendChild(createWarning())
  }
}

function addClickEvent() {
  var button = document.getElementById('quickBuildStation');
  button.addEventListener("click", buildStation)
}

addClickEvent();
