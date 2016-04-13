'use strict';

const http = require('http');
const

http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;
  if (method === 'GET' && url === '/')
    renderMainPage(request, response);
  else if (method === 'POST' && url === '/points')
    getDataFromClient(request, response);
  else if (method === 'GET' && url === '/result')
    sendResult(request, response);
  else
    show404Page(request, response);
}).listen(8080);
