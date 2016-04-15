'use strict';

let tapCounter = 0;
let tapsCoordinates = [];

const targetImage = document.querySelector('img');
const clearTargetButton = document.getElementById('clear');
const sendDataButton = document.getElementById('send');

let generateData = function(data, httpMethod='POST') {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  return {
    method: httpMethod,
    body: JSON.stringify(data),
    headers: headers
  };
};

let drawPoint = function(tap) {
  let point = document.createElement('div');
  let imageWrapper = document.getElementById('image-wrapper');
  point.className = 'point';
  point.style.marginTop = `${tap.y}px`;
  point.style.marginLeft = `${tap.x}px`;
  imageWrapper.insertBefore(point, targetImage);
};

let parseObjects = function(response) {
  return JSON.parse(response);
};

let displayResults = function(objects) {
  for (let studentResult of objects) {
    for (let point of studentResult) {
      drawPoint(point);
    }
  }
};

let removePoints = function() {
  let points = document.querySelectorAll('.point');
  Array.prototype.forEach.call(points, function(point) {
    point.remove();
  });
};

targetImage.addEventListener('click', function(event) {
  const tap = {
    x: event.offsetX,
    y: event.offsetY
  };
  tapsCoordinates.push(tap);
  drawPoint(tap);
  tapCounter++;
  if (tapCounter === 4)
    sendDataButton.className = '';
});

clearTargetButton.addEventListener('click', function() {
  tapCounter = 0;
  tapsCoordinates = [];
  removePoints();
  sendDataButton.className = 'hidden';
});

sendDataButton.addEventListener('click', function() {
  removePoints();
  const init = generateData(tapsCoordinates);
  fetch('/points', init)
    .then(() => console.log('ok'))
    .catch((error) => console.log(error));
});
