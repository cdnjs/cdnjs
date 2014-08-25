var stream = require('stream');

module.exports = function(params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(params.method, params.url);
  if (params.headers) {
    for (var header in params.headers) {
      xhr.setRequestHeader(header, params.headers[header]);
    }
  }
  var response;
  var str = new stream.Duplex();
  str._read = function(size) {
    if (response) {
      str.push(response.body);
    }
  };
  var bufs = [];
  var sent = false;
  str._write = function(chunk, encoding, callback) {
    bufs.push(chunk.toString(encoding));
    callback();
  };
  str.on('finish', function() {
    if (!sent) {
      xhr.send(bufs.join(''));
      sent = true;
    }
  });
  if (params.body || params.body === "" || !/^(put|post|patch)$/i.test(params.method)) {
    xhr.send(params.body);
    sent = true;
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var headers = {
        "content-type": xhr.getResponseHeader("content-type")
      };
      response = {
        statusCode: xhr.status,
        headers: headers,
        body: xhr.response
      };
      if (!response.statusCode) {
        response.statusCode = 400;
        response.body = "Access Declined";
      }
      if (callback) {
        callback(null, response, response.body);
      }
      str.end();
    }
  };
  return str;
};

