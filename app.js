const http = require('http');

http.createServer((request, response) => {
  const headers = request.headers;
  const method = request.method;
  const url = request.url;
  let body = [];
  request
    .on('error', (err) => console.error(err))
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => body = Buffer.concat(body).toString());
}).listen(8080);
