const fs = require('fs');

const index = fs.readFileSync('./html/index.html');

exports.renderMainPage = (req, res) => {
  res.statusCode = 200;
  res.writeHeader(200, {'Content-Type': 'text/html'});
  res.end(index);
};

exports.getDataFromClient = null;

exports.sendResult = null;

exports.show404Page = null;

exports.show500Page = null;
