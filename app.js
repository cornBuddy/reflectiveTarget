'use strict';

const http = require('http');

const renderMainPage = require('./routes').renderMainPage;
const getDataFromClient = require('./routes').getDataFromClient;
const sendResult = require('./routes').sendResult;
const show404Page = require('./routes').show404Page;
const show500Page = require('./routes').show500Page;
const serveFile = require('./routes').serveFile;


let _isFile = (url) => {
  const formats = ['js', 'gif', 'css', 'ico'];
  for (const format of formats)
    if (url.endsWith(format))
      return true;
  return false;
};

http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;
  request.on('error', (error) => show500Page(error, response));
  if (method === 'GET' && url === '/')
    renderMainPage(request, response);
  else if (method === 'POST' && url === '/points')
    getDataFromClient(request, response);
  else if (method === 'GET' && url === '/points')
    sendResult(response);
  else if (method === 'GET' && _isFile(url))
    serveFile(request, response);
  else
    show404Page('no router', request, response);
}).listen(8080);
