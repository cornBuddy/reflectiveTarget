'use strict';

let tapCounter = 0;
let tapsCoordinates = [];

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
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const init = {
      method: 'POST',
      body: JSON.stringify(tapsCoordinates),
      headers: headers
    };
    fetch('/points', init)
      .then(() => console.log('ok'))
      .catch((error) => console.log(error));
  }
});
