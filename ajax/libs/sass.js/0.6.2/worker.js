/*! sass.js - v0.6.2 - web worker - 2015-01-23 */'use strict';
/*global Sass, postMessage, onmessage:true, importScripts*/
importScripts('sass.min.js');

onmessage = function (event) {
  var result;
  switch (event.data.command) {
    case 'compile':
      result = Sass.compile(event.data.text);
      break;
    case 'options':
      result = Sass.options(event.data.options);
      break;
    case 'writeFile':
      result = Sass.writeFile(event.data.filename, event.data.text);
      break;
    case 'readFile':
      result = Sass.readFile(event.data.filename);
      break;
    case 'listFiles':
      result = Sass.listFiles();
      break;
    case 'removeFile':
      result = Sass.removeFile(event.data.filename);
      break;
    default:
      result = {line: 0, message: 'Unknown command ' + event.action};
      break;
  }

  postMessage({
    id: event.data.id,
    result: result
  });
};
