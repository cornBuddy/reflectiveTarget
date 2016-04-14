'use strict';

const fs = require('fs');
const parse = require('url').parse;
const join = require('path').join;
const createReadStream = require('fs').createReadStream;
const stat = require('fs').stat;

const index = fs.readFileSync('./html/index.html');
const root = __dirname;

exports.renderMainPage = (req, res) => {
  res.statusCode = 200;
  res.writeHeader(200, {'Content-Type': 'text/html'});
  res.end(index);
};

exports.getDataFromClient = null;

exports.sendResult = null;

exports.show404Page = null;

exports.show500Page = null;

exports.serveFile = (request, response) => {
  const parsedUrl = parse(request.url);
  let path = join(root, 'html', parsedUrl.pathname);
  stat(path, (err, stat) => {
    if (err) {
      if (err.code === 'ENOENT')
        exports.show404Page(request, response);
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
