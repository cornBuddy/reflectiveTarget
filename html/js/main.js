'use strict';

let tapCounter = 0;
let tapsCoordinates = [];

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

const targetImage = document.querySelector('img');
targetImage.addEventListener('click', function(event) {
  tapCounter++;
  if (tapCounter != 4) {
    const tap = {
      x: event.offsetX,
      y: event.offsetY
    };
    tapsCoordinates.push(tap);
  } else {
    const init = generateData(tapsCoordinates);
    fetch('/points', init)
      .then(() => console.log('ok'))
      .catch((error) => console.log(error));
  }
});
