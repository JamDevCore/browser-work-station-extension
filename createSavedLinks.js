function getRandomId() {
  var randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return randomId;
}

function openStation (e) {
  if (e) {
    var button = e.target;
    var urlSet = button.getAttribute('data');
    var urlArray = urlSet.split(',')
    urlArray.forEach((url) => {
      chrome.tabs.create({ url })
    });
  }
}

function removeStation(e) {
  var button = e.target;
  var stationId = button.id;
  chrome.storage.sync.get(['stations'], function (result) {
    var allStations = result.stations;
    var newStations = allStations.filter(station => station.id !== stationId);
    chrome.storage.sync.set({'stations': newStations})
      location.reload();
  });
}

function createButton (name, links, id) {
  // create container
  var div = document.createElement('div');
  //  create button
  var item = document.createElement('button');
  var dataSet = document.createAttribute('data');
  var className = document.createAttribute('class');
  // create closeButton
  var deleteButton = document.createElement('button');
  var deleteButtonClassName = document.createAttribute('class');
  var deleteButtonId = document.createAttribute('id');

  deleteButtonClassName.value = 'deleteButton';

  deleteButtonId.value = id;

  deleteButton.setAttributeNode(deleteButtonId);

  deleteButton.addEventListener('click', removeStation);
  // add values
  deleteButton.appendChild(document.createTextNode('x'))
  item.appendChild(document.createTextNode(name));
  dataSet.value = links;
  className.value = 'linkButton'
  // set values
  item.setAttributeNode(dataSet);
  item.setAttributeNode(className);

  deleteButton.setAttributeNode(deleteButtonClassName)


  item.addEventListener("click", openStation);

  div.appendChild(item)
  div.appendChild(deleteButton)

  return div;
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
      var newButton = createButton(station.name, station.links, station.id)

      // append to document
      list.appendChild(newButton);
    });
  }
  return list;
}


window.onload = getAllLinks();
