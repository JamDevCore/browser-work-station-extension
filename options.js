
function createDeleteButtons() {
  var page = document.getElementById('linksDiv');
  chrome.storage.sync.get(['stations'], function (result) {
    if (result && result.stations && result.stations.length > 0) {
      result.stations.forEach((station) => {

        var button = document.createElement('button');
        var name = document.createAttribute('name');

        name.value = station.name;

        button.setAttributeNode(name)
        button.appendChild(document.createTextNode(`Delete ${station.name}`));

        page.appendChild(button)
        button.addEventListener('click', removeStation)
    })
  }
  })
    return page;

}

function removeStation(e) {

  var button = e.target;
  var stationName = button.name;

  chrome.storage.sync.get(['stations'], function (result) {
    var allStations = result.stations;
    var newStations = allStations.filter(station => station.name !== stationName);

    chrome.storage.sync.set({'stations': newStations})
      location.reload();
  });
}
createDeleteButtons();
