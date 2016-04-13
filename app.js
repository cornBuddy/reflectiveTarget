'use strict';

const http = require('http');

http.createServer((request, response) => {
  const headers = request.headers;
  const method = request.method;
  const url = request.url;
  let body = [];
  request
    .on('error', (err) => console.error(err))
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString();
      response.on('error', (err) => console.error(err));
      response.writeHead(200, {'Content-Type': 'application/json'});
      const responseBody = {
        headers: headers,
        method: method,
        url: url,
        body: body
      };
      response.end(JSON.stringify(responseBody));
    });
}).listen(8080);
