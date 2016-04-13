'use strict';

const http = require('http');
const renderMainPage = require('.routes').renderMainPage;
const getDataFromClient = require('.routes').getDataFromClient;
const sendResult = require('.routes').sendResult;
const show404Page = require('.routes').show404Page;

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
