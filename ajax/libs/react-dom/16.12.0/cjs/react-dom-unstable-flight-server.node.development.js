/** @license React v16.12.0
 * react-dom-unstable-flight-server.node.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var ReactDOMServer = require('react-dom/server');

function scheduleWork(callback) {
  setImmediate(callback);
}
function flushBuffered(destination) {
  // If we don't have any more data to send right now.
  // Flush whatever is in the buffer to the wire.
  if (typeof destination.flush === 'function') {
    // http.createServer response have flush(), but it has a different meaning and
    // is deprecated in favor of flushHeaders(). Detect to avoid a warning.
    if (typeof destination.flushHeaders !== 'function') {
      // By convention the Zlib streams provide a flush function for this purpose.
      destination.flush();
    }
  }
}
function beginWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.cork === 'function') {
    destination.cork();
  }
}
function writeChunk(destination, buffer) {
  var nodeBuffer = buffer; // close enough

  return destination.write(nodeBuffer);
}
function completeWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.uncork === 'function') {
    destination.uncork();
  }
}
function close(destination) {
  destination.end();
}
function convertStringToBuffer(content) {
  return Buffer.from(content, 'utf8');
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
  beginWriting(destination);

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
    completeWriting(destination);
  }

  flushBuffered(destination);

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

function createDrainHandler(destination, request) {
  return function () {
    return startFlowing(request);
  };
}

function pipeToNodeWritable(model, destination) {
  var request = createRequest(model, destination);
  destination.on('drain', createDrainHandler(destination, request));
  startWork(request);
}

var ReactFlightDOMServerNode = {
  pipeToNodeWritable: pipeToNodeWritable
};

var ReactFlightDOMServerNode$1 = Object.freeze({
	default: ReactFlightDOMServerNode
});

var ReactFlightDOMServerNode$2 = ( ReactFlightDOMServerNode$1 && ReactFlightDOMServerNode ) || ReactFlightDOMServerNode$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest


var unstableFlightServer_node = ReactFlightDOMServerNode$2.default || ReactFlightDOMServerNode$2;

module.exports = unstableFlightServer_node;
  })();
}
