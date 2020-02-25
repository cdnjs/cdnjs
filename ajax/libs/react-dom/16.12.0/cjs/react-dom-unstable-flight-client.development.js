/** @license React v16.12.0
 * react-dom-unstable-flight-client.development.js
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

var supportsBinaryStreams = true;
function createStringDecoder() {
  return new TextDecoder();
}
var decoderOptions = {
  stream: true
};
function readPartialStringChunk(decoder, buffer) {
  return decoder.decode(buffer, decoderOptions);
}
function readFinalStringChunk(decoder, buffer) {
  return decoder.decode(buffer);
}

var PENDING = 0;
var RESOLVED = 1;
var ERRORED = 2;
function createResponse(source) {
  var modelRoot = {};
  var rootChunk = createPendingChunk();
  definePendingProperty(modelRoot, 'model', rootChunk);
  var chunks = new Map();
  chunks.set(0, rootChunk);
  var response = {
    source: source,
    partialRow: '',
    modelRoot: modelRoot,
    chunks: chunks,
    fromJSON: function (key, value) {
      return parseFromJSON(response, this, key, value);
    }
  };

  if (supportsBinaryStreams) {
    response.stringDecoder = createStringDecoder();
  }

  return response;
}

function createPendingChunk() {
  var resolve = null;
  var promise = new Promise(function (r) {
    return resolve = r;
  });
  return {
    status: PENDING,
    value: promise,
    resolve: resolve
  };
}

function createErrorChunk(error) {
  return {
    status: ERRORED,
    value: error,
    resolve: null
  };
}

function triggerErrorOnChunk(chunk, error) {
  if (chunk.status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var resolve = chunk.resolve;
  var erroredChunk = chunk;
  erroredChunk.status = ERRORED;
  erroredChunk.value = error;
  erroredChunk.resolve = null;
  resolve();
}

function createResolvedChunk(value) {
  return {
    status: RESOLVED,
    value: value,
    resolve: null
  };
}

function resolveChunk(chunk, value) {
  if (chunk.status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var resolve = chunk.resolve;
  var resolvedChunk = chunk;
  resolvedChunk.status = RESOLVED;
  resolvedChunk.value = value;
  resolvedChunk.resolve = null;
  resolve();
} // Report that any missing chunks in the model is now going to throw this
// error upon read. Also notify any pending promises.


function reportGlobalError(response, error) {
  response.chunks.forEach(function (chunk) {
    // If this chunk was already resolved or errored, it won't
    // trigger an error but if it wasn't then we need to
    // because we won't be getting any new data to resolve it.
    triggerErrorOnChunk(chunk, error);
  });
}

function definePendingProperty(object, key, chunk) {
  Object.defineProperty(object, key, {
    configurable: false,
    enumerable: true,
    get: function () {
      if (chunk.status === RESOLVED) {
        return chunk.value;
      } else {
        throw chunk.value;
      }
    }
  });
}

function parseFromJSON(response, targetObj, key, value) {
  if (typeof value === 'string' && value[0] === '$') {
    if (value[1] === '$') {
      // This was an escaped string value.
      return value.substring(1);
    } else {
      var id = parseInt(value.substring(1), 16);
      var chunks = response.chunks;
      var chunk = chunks.get(id);

      if (!chunk) {
        chunk = createPendingChunk();
        chunks.set(id, chunk);
      } else if (chunk.status === RESOLVED) {
        return chunk.value;
      }

      definePendingProperty(targetObj, key, chunk);
      return undefined;
    }
  }

  return value;
}

function resolveJSONRow(response, id, json) {
  var model = JSON.parse(json, response.fromJSON);
  var chunks = response.chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createResolvedChunk(model));
  } else {
    resolveChunk(chunk, model);
  }
}

function processFullRow(response, row) {
  if (row === '') {
    return;
  }

  var tag = row[0];

  switch (tag) {
    case 'J':
      {
        var colon = row.indexOf(':', 1);
        var id = parseInt(row.substring(1, colon), 16);
        var json = row.substring(colon + 1);
        resolveJSONRow(response, id, json);
        return;
      }

    case 'E':
      {
        var _colon = row.indexOf(':', 1);

        var _id = parseInt(row.substring(1, _colon), 16);

        var _json = row.substring(_colon + 1);

        var errorInfo = JSON.parse(_json);
        var error = new Error(errorInfo.message);
        error.stack = errorInfo.stack;
        var chunks = response.chunks;
        var chunk = chunks.get(_id);

        if (!chunk) {
          chunks.set(_id, createErrorChunk(error));
        } else {
          triggerErrorOnChunk(chunk, error);
        }

        return;
      }

    default:
      {
        // Assume this is the root model.
        resolveJSONRow(response, 0, row);
        return;
      }
  }
}

function processStringChunk(response, chunk, offset) {
  var linebreak = chunk.indexOf('\n', offset);

  while (linebreak > -1) {
    var fullrow = response.partialRow + chunk.substring(offset, linebreak);
    processFullRow(response, fullrow);
    response.partialRow = '';
    offset = linebreak + 1;
    linebreak = chunk.indexOf('\n', offset);
  }

  response.partialRow += chunk.substring(offset);
}
function processBinaryChunk(response, chunk) {
  if (!supportsBinaryStreams) {
    throw new Error("This environment don't support binary chunks.");
  }

  var stringDecoder = response.stringDecoder;
  var linebreak = chunk.indexOf(10); // newline

  while (linebreak > -1) {
    var fullrow = response.partialRow + readFinalStringChunk(stringDecoder, chunk.subarray(0, linebreak));
    processFullRow(response, fullrow);
    response.partialRow = '';
    chunk = chunk.subarray(linebreak + 1);
    linebreak = chunk.indexOf(10); // newline
  }

  response.partialRow += readPartialStringChunk(stringDecoder, chunk);
}
function complete(response) {
  // In case there are any remaining unresolved chunks, they won't
  // be resolved now. So we need to issue an error to those.
  // Ideally we should be able to early bail out if we kept a
  // ref count of pending chunks.
  reportGlobalError(response, new Error('Connection closed.'));
}
function getModelRoot(response) {
  return response.modelRoot;
}

// This file intentionally does *not* have the Flow annotation.
// Don't add it. See `./inline-typed.js` for an explanation.

function startReadingFromStream(response, stream) {
  var reader = stream.getReader();

  function progress(_ref) {
    var done = _ref.done,
        value = _ref.value;

    if (done) {
      complete(response);
      return;
    }

    var buffer = value;
    processBinaryChunk(response, buffer);
    return reader.read().then(progress, error);
  }

  function error(e) {
    reportGlobalError(response, e);
  }

  reader.read().then(progress, error);
}

function readFromReadableStream(stream) {
  var response = createResponse(stream);
  startReadingFromStream(response, stream);
  return getModelRoot(response);
}

function readFromFetch(promiseForResponse) {
  var response = createResponse(promiseForResponse);
  promiseForResponse.then(function (r) {
    startReadingFromStream(response, r.body);
  }, function (e) {
    reportGlobalError(response, e);
  });
  return getModelRoot(response);
}

function readFromXHR(request) {
  var response = createResponse(request);
  var processedLength = 0;

  function progress(e) {
    var chunk = request.responseText;
    processStringChunk(response, chunk, processedLength);
    processedLength = chunk.length;
  }

  function load(e) {
    progress(e);
    complete(response);
  }

  function error(e) {
    reportGlobalError(response, new TypeError('Network error'));
  }

  request.addEventListener('progress', progress);
  request.addEventListener('load', load);
  request.addEventListener('error', error);
  request.addEventListener('abort', error);
  request.addEventListener('timeout', error);
  return getModelRoot(response);
}

var ReactFlightDOMClient = {
  readFromXHR: readFromXHR,
  readFromFetch: readFromFetch,
  readFromReadableStream: readFromReadableStream
};

var ReactFlightDOMClient$1 = Object.freeze({
	default: ReactFlightDOMClient
});

var ReactFlightDOMClient$2 = ( ReactFlightDOMClient$1 && ReactFlightDOMClient ) || ReactFlightDOMClient$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest


var unstableFlightClient = ReactFlightDOMClient$2.default || ReactFlightDOMClient$2;

module.exports = unstableFlightClient;
  })();
}
