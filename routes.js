'use strict';

const fs = require('fs');
const parse = require('url').parse;
const join = require('path').join;
const createReadStream = require('fs').createReadStream;
const stat = require('fs').stat;

const index = fs.readFileSync('./html/index.html');

exports.renderMainPage = (req, res) => {
  const header = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(index)
  };
  res.writeHeader(200, header);
  res.end(index);
};

exports.getDataFromClient = () => {
  throw new Error('not implemented');
};

exports.sendResult = () => {
  throw new Error('not implemented');
};

exports.show404Page = (error, req, res) => {
  console.log(`404 url: ${req.url}, err: ${error};`);
  const header = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength('404')
  };
  res.writeHeader(404, header);
  res.end('404');
};

exports.show500Page = (error, res) => {
  console.log(`500 err: ${error};`);
  const header = {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength('500')
  };
  res.writeHeader(500, header);
  res.end('500');
};

exports.serveFile = (request, response) => {
  const parsedUrl = parse(request.url);
  const root = __dirname;
  let path = join(root, 'html', parsedUrl.pathname);
  stat(path, (err, stat) => {
    if (err) {
      if (err.code === 'ENOENT')
        exports.show404Page(err, request, response);
      else
        exports.show500Page(request, response);
    } else {
      response.setHeader('Content-Length', stat.size);
      let stream = createReadStream(path);
      stream.pipe(response);
      stream.on('error', (error) => exports.show500Page(response, error));
    }
  });
};
