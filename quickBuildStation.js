function buildStation () {
  chrome.tabs.query({currentWindow: true}, (result) => {
    var urlArray = result.map(tab => tab.url);
    chrome.storage.sync.get(['stations'], (res) => {

      var stations = res.stations || [];
      var newStation = {
        name: "My first station",
        links: urlArray,
      }
      
      stations.push(newStation);
      chrome.storage.sync.set({'stations': stations }, (result) => {
        location.reload();
      });
    })
  })
}



function addClickEvent() {
  var button = document.getElementById('quickBuildStation');
  button.addEventListener("click", buildStation)
}

addClickEvent();
