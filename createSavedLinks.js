function openLink (e) {
  if (e) {
    var button = e.target;
    var urlSet = button.getAttribute('data');
    var urlArray = urlSet.split(',')
    urlArray.forEach((url) => {
      chrome.tabs.create({ url })
    });
  }
}

function getAllLinks () {
  chrome.storage.sync.get(['stations'], (result) => {
    document.getElementById('linkList').appendChild(showLinks(result.stations));
  });
}

function showLinks(myStations) {
  var list = document.createElement('div');

  if (myStations) {
    myStations.forEach((station) => {
      // create button and attributes
      var item = document.createElement('button');
      var dataSet = document.createAttribute('data');
      var className = document.createAttribute('class');
      // add values
      item.appendChild(document.createTextNode(station.name));
      dataSet.value = station.links;
      className.value = 'linkButton'
      // set values
      item.setAttributeNode(dataSet);
      item.setAttributeNode(className);
      // append to document
      list.appendChild(item);
      item.addEventListener("click", openLink)
    });
  }
  return list;
}


window.onload = getAllLinks();
