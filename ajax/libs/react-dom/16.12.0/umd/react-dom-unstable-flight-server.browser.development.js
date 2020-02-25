/** @license React v16.12.0
 * react-dom-unstable-flight-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom/server')) :
	typeof define === 'function' && define.amd ? define(['react-dom/server'], factory) :
	(global.ReactFlightDOMServer = factory(global.ReactDOMServer));
}(this, (function (ReactDOMServer) { 'use strict';

function scheduleWork(callback) {
  callback();
}


function writeChunk(destination, buffer) {
  destination.enqueue(buffer);
  return destination.desiredSize > 0;
}

function close(destination) {
  destination.close();
}
var textEncoder = new TextEncoder();
function convertStringToBuffer(content) {
  return textEncoder.encode(content);
}

function renderHostChildrenToString(children) {
  // TODO: This file is used to actually implement a server renderer
  // so we can't actually reference the renderer here. Instead, we
  // should replace this method with a reference to Fizz which
  // then uses this file to implement the server renderer.
  return ReactDOMServer.renderToStaticMarkup(children);
}

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;





 // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

/*

FLIGHT PROTOCOL GRAMMAR

Response
- JSONData RowSequence
- JSONData

RowSequence
- Row RowSequence
- Row

Row
- "J" RowID JSONData
- "H" RowID HTMLData
- "B" RowID BlobData
- "U" RowID URLData
- "E" RowID ErrorData

RowID
- HexDigits ":"

HexDigits
- HexDigit HexDigits
- HexDigit

HexDigit
- 0-F

URLData
- (UTF8 encoded URL) "\n"

ErrorData
- (UTF8 encoded JSON: {message: "...", stack: "..."}) "\n"

JSONData
- (UTF8 encoded JSON) "\n"
  - String values that begin with $ are escaped with a "$" prefix.
  - References to other rows are encoding as JSONReference strings.

JSONReference
- "$" HexDigits

HTMLData
- ByteSize (UTF8 encoded HTML)

BlobData
- ByteSize (Binary Data)

ByteSize
- (unsigned 32-bit integer)
*/
// TODO: Implement HTMLData, BlobData and URLData.

var stringify = JSON.stringify;
function createRequest(model, destination) {
  var pingedSegments = [];
  var request = {
    destination: destination,
    nextChunkId: 0,
    pendingChunks: 0,
    pingedSegments: pingedSegments,
    completedJSONChunks: [],
    completedErrorChunks: [],
    flowing: false,
    toJSON: function (key, value) {
      return resolveModelToJSON(request, value);
    }
  };
  request.pendingChunks++;
  var rootSegment = createSegment(request, model);
  pingedSegments.push(rootSegment);
  return request;
}

function attemptResolveModelComponent(element) {
  var type = element.type;
  var props = element.props;

  if (typeof type === 'function') {
    // This is a nested view model.
    return type(props);
  } else if (typeof type === 'string') {
    // This is a host element. E.g. HTML.
    return renderHostChildrenToString(element);
  } else {
    throw new Error('Unsupported type.');
  }
}

function pingSegment(request, segment) {
  var pingedSegments = request.pingedSegments;
  pingedSegments.push(segment);

  if (pingedSegments.length === 1) {
    scheduleWork(function () {
      return performWork(request);
    });
  }
}

function createSegment(request, model) {
  var id = request.nextChunkId++;
  var segment = {
    id: id,
    model: model,
    ping: function () {
      return pingSegment(request, segment);
    }
  };
  return segment;
}

function serializeIDRef(id) {
  return '$' + id.toString(16);
}

function serializeRowHeader(tag, id) {
  return tag + id.toString(16) + ':';
}

function escapeStringValue(value) {
  if (value[0] === '$') {
    // We need to escape $ prefixed strings since we use that to encode
    // references to IDs.
    return '$' + value;
  } else {
    return value;
  }
}

function resolveModelToJSON(request, value) {
  if (typeof value === 'string') {
    return escapeStringValue(value);
  }

  while (typeof value === 'object' && value !== null && value.$$typeof === REACT_ELEMENT_TYPE) {
    var element = value;

    try {
      value = attemptResolveModelComponent(element);
    } catch (x) {
      if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
        // Something suspended, we'll need to create a new segment and resolve it later.
        request.pendingChunks++;
        var newSegment = createSegment(request, element);
        var ping = newSegment.ping;
        x.then(ping, ping);
        return serializeIDRef(newSegment.id);
      } else {
        request.pendingChunks++;
        var errorId = request.nextChunkId++;
        emitErrorChunk(request, errorId, x);
        return serializeIDRef(errorId);
      }
    }
  }

  return value;
}

function emitErrorChunk(request, id, error) {
  // TODO: We should not leak error messages to the client in prod.
  // Give this an error code instead and log on the server.
  // We can serialize the error in DEV as a convenience.
  var message;
  var stack = '';

  try {
    if (error instanceof Error) {
      message = '' + error.message;
      stack = '' + error.stack;
    } else {
      message = 'Error: ' + error;
    }
  } catch (x) {
    message = 'An error occurred but serializing the error message failed.';
  }

  var errorInfo = {
    message: message,
    stack: stack
  };
  var row = serializeRowHeader('E', id) + stringify(errorInfo) + '\n';
  request.completedErrorChunks.push(convertStringToBuffer(row));
}

function retrySegment(request, segment) {
  var value = segment.model;

  try {
    while (typeof value === 'object' && value !== null && value.$$typeof === REACT_ELEMENT_TYPE) {
      // If this is a nested model, there's no need to create another chunk,
      // we can reuse the existing one and try again.
      var element = value;
      segment.model = element;
      value = attemptResolveModelComponent(element);
    }

    var json = stringify(value, request.toJSON);
    var row;
    var id = segment.id;

    if (id === 0) {
      row = json + '\n';
    } else {
      row = serializeRowHeader('J', id) + json + '\n';
    }

    request.completedJSONChunks.push(convertStringToBuffer(row));
  } catch (x) {
    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
      // Something suspended again, let's pick it back up later.
      var ping = segment.ping;
      x.then(ping, ping);
      return;
    } else {
      // This errored, we need to serialize this error to the
      emitErrorChunk(request, segment.id, x);
    }
  }
}

function performWork(request) {
  var pingedSegments = request.pingedSegments;
  request.pingedSegments = [];

  for (var i = 0; i < pingedSegments.length; i++) {
    var segment = pingedSegments[i];
    retrySegment(request, segment);
  }

  if (request.flowing) {
    flushCompletedChunks(request);
  }
}

var reentrant = false;

function flushCompletedChunks(request) {
  if (reentrant) {
    return;
  }

  reentrant = true;
  var destination = request.destination;
  try {
    var jsonChunks = request.completedJSONChunks;
    var i = 0;

    for (; i < jsonChunks.length; i++) {
      request.pendingChunks--;
      var chunk = jsonChunks[i];

      if (!writeChunk(destination, chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    jsonChunks.splice(0, i);
    var errorChunks = request.completedErrorChunks;
    i = 0;

    for (; i < errorChunks.length; i++) {
      request.pendingChunks--;
      var _chunk = errorChunks[i];

      if (!writeChunk(destination, _chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    errorChunks.splice(0, i);
  } finally {
    reentrant = false;
    
  }

  if (request.pendingChunks === 0) {
    // We're done.
    close(destination);
  }
}

function startWork(request) {
  request.flowing = true;
  scheduleWork(function () {
    return performWork(request);
  });
}
function startFlowing(request) {
  request.flowing = true;
  flushCompletedChunks(request);
}

// This file intentionally does *not* have the Flow annotation.
// Don't add it. See `./inline-typed.js` for an explanation.

function renderToReadableStream(model) {
  var request;
  return new ReadableStream({
    start: function (controller) {
      request = createRequest(model, controller);
      startWork(request);
    },
    pull: function (controller) {
      startFlowing(request);
    },
    cancel: function (reason) {}
  });
}

var ReactFlightDOMServerBrowser = {
  renderToReadableStream: renderToReadableStream
};

var ReactFlightDOMServerBrowser$1 = Object.freeze({
	default: ReactFlightDOMServerBrowser
});

var ReactFlightDOMServerBrowser$2 = ( ReactFlightDOMServerBrowser$1 && ReactFlightDOMServerBrowser ) || ReactFlightDOMServerBrowser$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest


var unstableFlightServer_browser = ReactFlightDOMServerBrowser$2.default || ReactFlightDOMServerBrowser$2;

return unstableFlightServer_browser;

})));
