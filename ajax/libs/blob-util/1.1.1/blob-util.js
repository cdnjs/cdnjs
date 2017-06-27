!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.blobUtil=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var utils = require('./utils');
/* jshint -W079 */
var Blob = require('blob');
var Promise = utils.Promise;

//
// PRIVATE
//

// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function binaryStringToArrayBuffer(binary) {
  var length = binary.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);
  var i = -1;
  while (++i < length) {
    arr[i] = binary.charCodeAt(i);
  }
  return buf;
}

// Can't find original post, but this is close
// http://stackoverflow.com/questions/6965107/ (continues on next line)
// converting-between-strings-and-arraybuffers
function arrayBufferToBinaryString(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var length = bytes.byteLength;
  var i = -1;
  while (++i < length) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

// doesn't download the image more than once, because
// browsers aren't dumb. uses the cache
function loadImage(src, crossOrigin) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }
    img.onload = function () {
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

function imgToCanvas(img) {
  var canvas = document.createElement('canvas');

  canvas.width = img.width;
  canvas.height = img.height;

  // copy the image contents to the canvas
  var context = canvas.getContext('2d');
  context.drawImage(
    img,
    0, 0,
    img.width, img.height,
    0, 0,
    img.width, img.height);

  return canvas;
}

//
// PUBLIC
//

/**
 * Shim for
 * [new Blob()]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob.Blob}
 * to support
 * [older browsers that use the deprecated <code>BlobBuilder</code> API]{@link http://caniuse.com/blob}.
 *
 * @param {Array} parts - content of the <code>Blob</code>
 * @param {Object} options - usually just <code>{type: myContentType}</code>
 * @returns {Blob}
 */
function createBlob(parts, options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {type: options}; // do you a solid here
  }
  return new Blob(parts, options);
}

/**
 * Shim for
 * [URL.createObjectURL()]{@link https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL}
 * to support browsers that only have the prefixed
 * <code>webkitURL</code> (e.g. Android <4.4).
 * @param {Blob} blob
 * @returns {string} url
 */
function createObjectURL(blob) {
  return (window.URL || window.webkitURL).createObjectURL(blob);
}

/**
 * Shim for
 * [URL.revokeObjectURL()]{@link https://developer.mozilla.org/en-US/docs/Web/API/URL.revokeObjectURL}
 * to support browsers that only have the prefixed
 * <code>webkitURL</code> (e.g. Android <4.4).
 * @param {string} url
 */
function revokeObjectURL(url) {
  return (window.URL || window.webkitURL).revokeObjectURL(url);
}

/**
 * Convert a <code>Blob</code> to a binary string. Returns a Promise.
 *
 * @param {Blob} blob
 * @returns {Promise} Promise that resolves with the binary string
 */
function blobToBinaryString(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    var hasBinaryString = typeof reader.readAsBinaryString === 'function';
    reader.onloadend = function (e) {
      var result = e.target.result || '';
      if (hasBinaryString) {
        return resolve(result);
      }
      resolve(arrayBufferToBinaryString(result));
    };
    reader.onerror = reject;
    if (hasBinaryString) {
      reader.readAsBinaryString(blob);
    } else {
      reader.readAsArrayBuffer(blob);
    }
  });
}

/**
 * Convert a base64-encoded string to a <code>Blob</code>. Returns a Promise.
 * @param {string} base64
 * @param {string|undefined} type - the content type (optional)
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function base64StringToBlob(base64, type) {
  return Promise.resolve().then(function () {
    var parts = [binaryStringToArrayBuffer(atob(base64))];
    return type ? createBlob(parts, {type: type}) : createBlob(parts);
  });
}

/**
 * Convert a binary string to a <code>Blob</code>. Returns a Promise.
 * @param {string} binary
 * @param {string|undefined} type - the content type (optional)
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function binaryStringToBlob(binary, type) {
  return Promise.resolve().then(function () {
    return base64StringToBlob(btoa(binary), type);
  });
}

/**
 * Convert a <code>Blob</code> to a binary string. Returns a Promise.
 * @param {Blob} blob
 * @returns {Promise} Promise that resolves with the binary string
 */
function blobToBase64String(blob) {
  return blobToBinaryString(blob).then(function (binary) {
    return btoa(binary);
  });
}

/**
 * Convert a data URL string
 * (e.g. <code>'data:image/png;base64,iVBORw0KG...'</code>)
 * to a <code>Blob</code>. Returns a Promise.
 * @param {string} dataURL
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function dataURLToBlob(dataURL) {
  return Promise.resolve().then(function () {
    var type = dataURL.match(/data:([^;]+)/)[1];
    var base64 = dataURL.replace(/^[^,]+,/, '');

    var buff = binaryStringToArrayBuffer(atob(base64));
    return createBlob([buff], {type: type});
  });
}

/**
 * Convert an image's <code>src</code> URL to a data URL by loading the image and painting
 * it to a <code>canvas</code>. Returns a Promise.
 *
 * <p/>Note: this will coerce the image to the desired content type, and it
 * will only paint the first frame of an animated GIF.
 *
 * @param {string} src
 * @param {string|undefined} type - the content type (optional, defaults to 'image/png')
 * @param {string|undefined} crossOrigin - for CORS-enabled images, set this to
 *                                         'Anonymous' to avoid "tainted canvas" errors
 * @returns {Promise} Promise that resolves with the data URL string
 */
function imgSrcToDataURL(src, type, crossOrigin) {
  type = type || 'image/png';

  return loadImage(src, crossOrigin).then(function (img) {
    return imgToCanvas(img);
  }).then(function (canvas) {
    return canvas.toDataURL(type);
  });
}

/**
 * Convert a <code>canvas</code> to a <code>Blob</code>. Returns a Promise.
 * @param {string} canvas
 * @param {string|undefined} type - the content type (optional, defaults to 'image/png')
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function canvasToBlob(canvas, type) {
  return Promise.resolve().then(function () {
    if (typeof canvas.toBlob === 'function') {
      return new Promise(function (resolve) {
        canvas.toBlob(resolve, type);
      });
    }
    return dataURLToBlob(canvas.toDataURL(type));
  });
}

/**
 * Convert an image's <code>src</code> URL to a <code>Blob</code> by loading the image and painting
 * it to a <code>canvas</code>. Returns a Promise.
 *
 * <p/>Note: this will coerce the image to the desired content type, and it
 * will only paint the first frame of an animated GIF.
 *
 * @param {string} src
 * @param {string|undefined} type - the content type (optional, defaults to 'image/png')
 * @param {string|undefined} crossOrigin - for CORS-enabled images, set this to
 *                                         'Anonymous' to avoid "tainted canvas" errors
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function imgSrcToBlob(src, type, crossOrigin) {
  type = type || 'image/png';

  return loadImage(src, crossOrigin).then(function (img) {
    return imgToCanvas(img);
  }).then(function (canvas) {
    return canvasToBlob(canvas, type);
  });
}

/**
 * Convert an <code>ArrayBuffer</code> to a <code>Blob</code>. Returns a Promise.
 *
 * @param {ArrayBuffer} buffer
 * @param {string|undefined} type - the content type (optional)
 * @returns {Promise} Promise that resolves with the <code>Blob</code>
 */
function arrayBufferToBlob(buffer, type) {
  return Promise.resolve().then(function () {
    return createBlob([buffer], type);
  });
}

/**
 * Convert a <code>Blob</code> to an <code>ArrayBuffer</code>. Returns a Promise.
 * @param {Blob} blob
 * @returns {Promise} Promise that resolves with the <code>ArrayBuffer</code>
 */
function blobToArrayBuffer(blob) {
  return blobToBinaryString(blob).then(function (binary) {
    return binaryStringToArrayBuffer(binary);
  });
}

module.exports = {
  createBlob         : createBlob,
  createObjectURL    : createObjectURL,
  revokeObjectURL    : revokeObjectURL,
  imgSrcToBlob       : imgSrcToBlob,
  imgSrcToDataURL    : imgSrcToDataURL,
  canvasToBlob       : canvasToBlob,
  dataURLToBlob      : dataURLToBlob,
  blobToBase64String : blobToBase64String,
  base64StringToBlob : base64StringToBlob,
  binaryStringToBlob : binaryStringToBlob,
  blobToBinaryString : blobToBinaryString,
  arrayBufferToBlob  : arrayBufferToBlob,
  blobToArrayBuffer  : blobToArrayBuffer
};

},{"./utils":2,"blob":3}],2:[function(require,module,exports){
(function (global){
'use strict';

var Promise = typeof global.Promise === 'function' ? global.Promise : require('lie');

exports.Promise = Promise;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lie":7}],3:[function(require,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
'use strict';

module.exports = INTERNAL;

function INTERNAL() {}
},{}],5:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = all;
function all(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len & !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}
},{"./INTERNAL":4,"./handlers":6,"./promise":8,"./reject":11,"./resolve":12}],6:[function(require,module,exports){
'use strict';
var tryCatch = require('./tryCatch');
var resolveThenable = require('./resolveThenable');
var states = require('./states');

exports.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return exports.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    resolveThenable.safely(self, thenable);
  } else {
    self.state = states.FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
exports.reject = function (self, error) {
  self.state = states.REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}
},{"./resolveThenable":13,"./states":14,"./tryCatch":15}],7:[function(require,module,exports){
module.exports = exports = require('./promise');

exports.resolve = require('./resolve');
exports.reject = require('./reject');
exports.all = require('./all');
exports.race = require('./race');
},{"./all":5,"./promise":8,"./race":10,"./reject":11,"./resolve":12}],8:[function(require,module,exports){
'use strict';

var unwrap = require('./unwrap');
var INTERNAL = require('./INTERNAL');
var resolveThenable = require('./resolveThenable');
var states = require('./states');
var QueueItem = require('./queueItem');

module.exports = Promise;
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    return new Promise(resolver);
  }
  if (typeof resolver !== 'function') {
    throw new TypeError('reslover must be a function');
  }
  this.state = states.PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    resolveThenable.safely(this, resolver);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === states.FULFILLED ||
    typeof onRejected !== 'function' && this.state === states.REJECTED) {
    return this;
  }
  var promise = new Promise(INTERNAL);

  
  if (this.state !== states.PENDING) {
    var resolver = this.state === states.FULFILLED ? onFulfilled: onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};

},{"./INTERNAL":4,"./queueItem":9,"./resolveThenable":13,"./states":14,"./unwrap":16}],9:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var unwrap = require('./unwrap');

module.exports = QueueItem;
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};
},{"./handlers":6,"./unwrap":16}],10:[function(require,module,exports){
'use strict';
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = race;
function race(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return resolve([]);
  }

  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  
  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}
},{"./INTERNAL":4,"./handlers":6,"./promise":8,"./reject":11,"./resolve":12}],11:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = reject;

function reject(reason) {
	var promise = new Promise(INTERNAL);
	return handlers.reject(promise, reason);
}
},{"./INTERNAL":4,"./handlers":6,"./promise":8}],12:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var INTERNAL = require('./INTERNAL');
var handlers = require('./handlers');
module.exports = resolve;

var FALSE = handlers.resolve(new Promise(INTERNAL), false);
var NULL = handlers.resolve(new Promise(INTERNAL), null);
var UNDEFINED = handlers.resolve(new Promise(INTERNAL), void 0);
var ZERO = handlers.resolve(new Promise(INTERNAL), 0);
var EMPTYSTRING = handlers.resolve(new Promise(INTERNAL), '');

function resolve(value) {
  if (value) {
    if (value instanceof Promise) {
      return value;
    }
    return handlers.resolve(new Promise(INTERNAL), value);
  }
  var valueType = typeof value;
  switch (valueType) {
    case 'boolean':
      return FALSE;
    case 'undefined':
      return UNDEFINED;
    case 'object':
      return NULL;
    case 'number':
      return ZERO;
    case 'string':
      return EMPTYSTRING;
  }
}
},{"./INTERNAL":4,"./handlers":6,"./promise":8}],13:[function(require,module,exports){
'use strict';
var handlers = require('./handlers');
var tryCatch = require('./tryCatch');
function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }
  
  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}
exports.safely = safelyResolveThenable;
},{"./handlers":6,"./tryCatch":15}],14:[function(require,module,exports){
// Lazy man's symbols for states

exports.REJECTED = ['REJECTED'];
exports.FULFILLED = ['FULFILLED'];
exports.PENDING = ['PENDING'];
},{}],15:[function(require,module,exports){
'use strict';

module.exports = tryCatch;

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}
},{}],16:[function(require,module,exports){
'use strict';

var immediate = require('immediate');
var handlers = require('./handlers');
module.exports = unwrap;

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}
},{"./handlers":6,"immediate":17}],17:[function(require,module,exports){
'use strict';
var types = [
  require('./nextTick'),
  require('./mutation.js'),
  require('./messageChannel'),
  require('./stateChange'),
  require('./timeout')
];
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++ i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}
},{"./messageChannel":18,"./mutation.js":19,"./nextTick":22,"./stateChange":20,"./timeout":21}],18:[function(require,module,exports){
(function (global){
'use strict';

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(require,module,exports){
(function (global){
'use strict';
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
(function (global){
'use strict';

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
'use strict';
exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};
},{}],22:[function(require,module,exports){

},{}]},{},[1])(1)
});