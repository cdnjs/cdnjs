(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var immediate = require('immediate');

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
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

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
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

exports.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

exports.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

exports.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

exports.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
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

},{"immediate":2}],2:[function(require,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

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

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';
var jsonp = require('./jsonp');
var Promise = require('lie');

module.exports = function (url, options) {
  options = options || {};
  if (options.jsonp) {
    return jsonp(url, options);
  }
  var request;
  var cancel;
  var out = new Promise(function (resolve, reject) {
    cancel = reject;
    if (global.XMLHttpRequest === undefined) {
      reject('XMLHttpRequest is not supported');
    }
    var response;
    request = new global.XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if ((request.status < 400 && options.local) || request.status === 200) {
          if (global.JSON) {
            response = JSON.parse(request.responseText);
          } else {
            reject(new Error('JSON is not supported'));
          }
          resolve(response);
        } else {
          if (!request.status) {
            reject('Attempted cross origin request without CORS enabled');
          } else {
            reject(request.statusText);
          }
        }
      }
    };
    request.send();
  });
  out.catch(function (reason) {
    request.abort();
    return reason;
  });
  out.abort = cancel;
  return out;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./jsonp":5,"lie":1}],4:[function(require,module,exports){
(function (global){
'use strict';
var L = global.L || require('leaflet');
var Promise = require('lie');
var ajax = require('./ajax');
L.GeoJSON.AJAX = L.GeoJSON.extend({
  defaultAJAXparams: {
    dataType: 'json',
    callbackParam: 'callback',
    local: false,
    middleware: function (f) {
      return f;
    }
  },
  initialize: function (url, options) {
    this.urls = [];
    if (url) {
      if (typeof url === 'string') {
        this.urls.push(url);
      } else if (typeof url.pop === 'function') {
        this.urls = this.urls.concat(url);
      } else {
        options = url;
        url = undefined;
      }
    }
    var ajaxParams = L.Util.extend({}, this.defaultAJAXparams);

    for (var i in options) {
      if (this.defaultAJAXparams.hasOwnProperty(i)) {
        ajaxParams[i] = options[i];
      }
    }
    this.ajaxParams = ajaxParams;
    this._layers = {};
    L.Util.setOptions(this, options);
    this.on('data:loaded', function () {
      if (this.filter) {
        this.refilter(this.filter);
      }
    }, this);
    var self = this;
    if (this.urls.length > 0) {
      new Promise(function (yes) {
        yes();
      }).then(function () {
        self.addUrl();
      });
    }
  },
  clearLayers: function () {
    this.urls = [];
    L.GeoJSON.prototype.clearLayers.call(this);
    return this;
  },
  addUrl: function (url) {
    var self = this;
    if (url) {
      if (typeof url === 'string') {
        self.urls.push(url);
      } else if (typeof url.pop === 'function') {
        self.urls = self.urls.concat(url);
      }
    }
    var loading = self.urls.length;
    var done = 0;
    self.fire('data:loading');
    self.urls.forEach(function (url) {
      if (self.ajaxParams.dataType.toLowerCase() === 'json') {
        ajax(url, self.ajaxParams).then(function (d) {
          var data = self.ajaxParams.middleware(d);
          self.addData(data);
          self.fire('data:progress', data);
        }, function (err) {
          self.fire('data:progress', {
            error: err
          });
        });
      } else if (self.ajaxParams.dataType.toLowerCase() === 'jsonp') {
        L.Util.jsonp(url, self.ajaxParams).then(function (d) {
          var data = self.ajaxParams.middleware(d);
          self.addData(data);
          self.fire('data:progress', data);
        }, function (err) {
          self.fire('data:progress', {
            error: err
          });
        });
      }
    });
    self.on('data:progress', function () {
      if (++done === loading) {
        self.fire('data:loaded');
      }
    });
  },
  refresh: function (url) {
    url = url || this.urls;
    this.clearLayers();
    this.addUrl(url);
  },
  refilter: function (func) {
    if (typeof func !== 'function') {
      this.filter = false;
      this.eachLayer(function (a) {
        a.setStyle({
          stroke: true,
          clickable: true
        });
      });
    } else {
      this.filter = func;
      this.eachLayer(function (a) {
        if (func(a.feature)) {
          a.setStyle({
            stroke: true,
            clickable: true
          });
        } else {
          a.setStyle({
            stroke: false,
            clickable: false
          });
        }
      });
    }
  }
});
L.Util.Promise = Promise;
L.Util.ajax = ajax;
L.Util.jsonp = require('./jsonp');
L.geoJson.ajax = function (geojson, options) {
  return new L.GeoJSON.AJAX(geojson, options);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ajax":3,"./jsonp":5,"leaflet":undefined,"lie":1}],5:[function(require,module,exports){
(function (global){
'use strict';
var L = global.L || require('leaflet');
var Promise = require('lie');

module.exports = function (url, options) {
  options = options || {};
  var head = document.getElementsByTagName('head')[0];
  var scriptNode = L.DomUtil.create('script', '', head);
  var cbName, ourl, cbSuffix, cancel;
  var out = new Promise(function (resolve, reject) {
    cancel = reject;
    var cbParam = options.cbParam || 'callback';
    if (options.callbackName) {
      cbName = options.callbackName;
    } else {
      cbSuffix = '_' + ('' + Math.random()).slice(2);
      cbName = '_leafletJSONPcallbacks.' + cbSuffix;
    }
    scriptNode.type = 'text/javascript';
    if (cbSuffix) {
      if (!global._leafletJSONPcallbacks) {
        global._leafletJSONPcallbacks = {
          length: 0
        };
      }
      global._leafletJSONPcallbacks.length++;
      global._leafletJSONPcallbacks[cbSuffix] = function (data) {
        head.removeChild(scriptNode);
        delete global._leafletJSONPcallbacks[cbSuffix];
        global._leafletJSONPcallbacks.length--;
        if (!global._leafletJSONPcallbacks.length) {
          delete global._leafletJSONPcallbacks;
        }
        resolve(data);
      };
    }
    if (url.indexOf('?') === -1) {
      ourl = url + '?' + cbParam + '=' + cbName;
    } else {
      ourl = url + '&' + cbParam + '=' + cbName;
    }
    scriptNode.src = ourl;
  }).then(null, function (reason) {
    head.removeChild(scriptNode);
    delete L.Util.ajax.cb[cbSuffix];
    return reason;
  });
  out.abort = cancel;
  return out;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"leaflet":undefined,"lie":1}]},{},[4]);
