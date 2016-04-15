'use strict';

let tapCounter = 0;
let tapsCoordinates = [];
const targetImage = document.querySelector('img');

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

let parseObjects = function(response) {
  return JSON.parse(response);
};

let displayResults = function(objects) {
  for (let studentResult of objects) {
    for (let point of studentResult) {
      console.log(point);
    }
  }
  return null;
};

let drawPoint = function(tap) {
  let point = document.createElement('div');
  let imageWrapper = document.getElementById('image-wrapper');
  point.className = 'point';
  point.style.marginTop = `${tap.y}px`;
  point.style.marginLeft = `${tap.x}px`;
  imageWrapper.insertBefore(point, targetImage);
};

targetImage.addEventListener('click', function(event) {
  if (tapCounter != 4) {
    const tap = {
      x: event.offsetX,
      y: event.offsetY
    };
    tapsCoordinates.push(tap);
    drawPoint(tap);
    tapCounter++;
  } else {
    const init = generateData(tapsCoordinates);
    fetch('/points', init)
      .then(() => console.log('ok'))
      .catch((error) => console.log(error));
  }
});
