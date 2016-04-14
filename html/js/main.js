'use strict';

const targetImage = document.querySelector('img');
targetImage.addEventListener('click', function(event) {
  console.log('image clicked', event);
  const mock = {
    x: 1,
    y: 1
  };
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const init = {
    method: 'POST',
    body: JSON.stringify(mock),
    headers: headers
  };
  fetch('/points', init)
    .then(() => console.log('ok'))
    .catch((error) => console.log(error));
});
