'use strict';

const http = require('http');

http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;
  if (method === 'GET' && url === '/')
    null; // return main page
  else if (method === 'POST' && url === '/points')
    null; // get points from client
  else if (method === 'GET' && url === '/result')
    null; // show result
}).listen(8080);
