!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.TB=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib');

},{"./lib":3}],2:[function(require,module,exports){
/*
 * getData() : getData(el)
 * Returns data attributes as a plain object.
 *
 *     // <div data-name='john' data-last-name='watson'>
 *
 *     getData(div)
 *     => { name: "john", lastName: "watson" }
 */

function getData (el, prefix) {
  var key;
  var re = {};
  if (!prefix) prefix = 'data-';

  for (var i = 0, len = el.attributes.length; i < len; i++) {
    var attr = el.attributes[i];
    key = attr.name;
    if (key.substr(0, prefix.length) !== prefix) continue;

    key = key.substr(prefix.length);
    key = camelize(key);
    re[key] = attr.value;
  }

  return re;
}

function camelize (str) {
  return str.replace(/[\s_\-]+([a-zA-Z])/g, function (_, l) {
    return l.toUpperCase();
  });
}

module.exports = getData;

},{}],3:[function(require,module,exports){
var ajaxapi = require('ajaxapi');

var getData = require('./helpers/get_data');

var ready = require('dom101/ready');
var each = require('dom101/each');
var qa = require('dom101/query-selector-all');
var q = require('dom101/query-selector');

/**
 * TB:
 * Ticketbase widget library.
 */

var TB = module.exports = {};

/**
 * api : TB.api
 * Access the Ticketbase API.
 *
 *     TB.api.get('/v1/events/101')
 *       .then(function (event) { ... })
 */

TB.api = ajaxapi('http://api.ticketbase.com');

/*
 * go : TB.go()
 * Processes all new widgets in the page.  Widgets are elements with the
 * `<div data-tb='...'>` attribute. This procedure is idempotent.
 */

TB.go = function () {
  each(qa('[data-tb]'), function (el) {
    TB.widget(el);
  });
};

/**
 * widget : TB.widget(element)
 * Converts a DOM `element` into a widget. This procedure is idempotent.
 */

TB.widget = function (el) {
  var EventForm = require('./widgets/event_form');

  // skip if already widgetized
  if (el.__tbInstance) return;

  var data = getData(el);
  return new EventForm(el, data);
};

/*
 * Run upon inclusion.
 */

ready(TB.go);

},{"./helpers/get_data":2,"./widgets/event_form":5,"ajaxapi":6,"dom101/each":23,"dom101/query-selector":26,"dom101/query-selector-all":25,"dom101/ready":27}],4:[function(require,module,exports){

/* event presenter */

function presentEvent (event) {
  event.ticket_types = presentTicketTypes(event.ticket_types, event);
  event.order_action_url = event.url + '/orders';
  event.form_hidden = getHiddenFields(event);
  return event;
}

module.exports = presentEvent;

function getHiddenFields (event) {
  var re = [];
  var types = event.ticket_types;
  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_id]' value='"+ticket.id+"'>");
    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_type]' value='TicketType'>");
  }
  return re.join("\n");
}

function presentTicketTypes (types, event) {
  var re = [];

  var curr = getCurrency(event.currency || 'usd');

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    ticket.price_label = formatPrice(ticket.price, curr);
    ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';

    re.push(ticket);
  }

  return re;
}

function formatPrice (price, curr) {
  var priceStr = parseFloat(price, 10).toFixed(2);

  if (priceStr.match(/00$/))
    priceStr = parseFloat(price, 10).toFixed(0);

  return '' +
    curr.symbol +
    priceStr;
}

function getCurrency (code) {
  var currencies = {
    usd: { symbol: '$' },
    aud: { symbol: 'AU$' },
    btc: { symbol: 'B' }
  };

  var curr = currencies[code.toLowerCase()];
  if (!curr) throw new Error("Unknown currency '"+code+"'");
  return curr;
}

},{}],5:[function(require,module,exports){
var presentEvent = require('../presenters/event');
var removeClass = require('dom101/remove-class');
var addClass = require('dom101/add-class');
var template = require('templayed');
var extend = require('dom101/extend');

var TB = require('..');

/*
 * EventForm:
 * For `data-tb='event-form'` widgets.
 */

function EventForm (el, data) {
  el.__tbInstance = this;
  extend(this, data, { el: el });
  this.el = el;
  this.load();
}

EventForm.prototype = {
  /*
   * template
   */

  template:
    "<div class='tb-event-form'>\n  <form method=\"post\" action=\"{{event.order_action_url}}\">\n    {{{event.form_hidden}}}\n\n    <h1 class='tb-headline'>\n      <a href='{{event.url}}'>\n        {{event.title}}\n      </a>\n    </h1>\n\n    <div class='tb-order-items'>\n      {{#event.ticket_types}}\n        <div class='tb-order-item tb-ticket'>\n          <strong class='tb-title'>{{title}}</strong>\n          <span class='tb-price'>{{price_label}}</span>\n          <div class='tb-quantity'>\n            <input type='number' name='{{input_quantity_name}}' value='0'>\n          </div>\n        </div>\n      {{/event.ticket_types}}\n    </div>\n\n    <div class='tb-action'>\n      <button type='submit' class='tb-submit'>Order</button>\n    </div>\n\n  </form>\n</div>\n",

  /*
   * loads data and renders
   */

  load: function () {
    var self = this;

    this.el.innerHTML = '<div class="tb-spinner"></div>';
    addClass(this.el, 'tb-loading');

    TB.api.get('/v1/events/'+this.eventId)
      .then(function (event) {
        self.event = event;
        self.render();
      })
      .catch(self.onerror.bind(this))
      .done();
  },

  /*
   * renders
   */

  render: function () {
    removeClass(this.el, 'tb-loading');
    addClass(this.el, 'tb-loaded');

    var tpl = template(this.template);
    var event = presentEvent(this.event);
    this.el.innerHTML = tpl({ event: event });
  },

  /*
   * process an ajax error
   */

  onerror: function (err) {
    throw err;
  }
};

module.exports = EventForm;

},{"..":3,"../presenters/event":4,"dom101/add-class":22,"dom101/extend":24,"dom101/remove-class":28,"templayed":29}],6:[function(require,module,exports){
/*
 * API
 */

function Api (config) {
  if (!(this instanceof Api))
    return new Api(config);

  if (typeof config === 'string') config = { base: config };
  else if (!config) config = {};

  this.base = config.base;
  this._after = [];
  this._before = [];
  this.response = null;
}

/*
 * Api.request() : Api.request(...)
 * ThenRequest instance. See http://npmjs.com/then-request
 */

Api.request = require('then-request');

/**
 * Api.expand() : Api.expand(template, data)
 * Expands a URL template.
 *
 *     API.expand('/get/{user}', { user: 'john' })
 *     => "/get/john"
 */

/*
 * request() : request(method, url, [data])
 * Performs a request.
 */

Api.prototype.request = function (method, url, data) {
  var options = { headers: {}, qs: {}, json: (data || {}) };

  var context = {
    method: method,
    url: this.prefix(url),
    data: data,
    headers: options.headers,
    options: options
  };

  // apply before hooks (custom)
  this._before.forEach(function (fn) { fn.call(this, context); });

  // promise
  var pro = Api.request(
    context.method,
    context.url,
    context.options);

  // apply after hooks (defaults)
  pro = pro
    .then(this.saveResponse.bind(this))
    .then(this.parseBody.bind(this));

  // apply after hooks (custom)
  this._after.forEach(function (callbacks) {
    pro = pro.then(proxy(callbacks[0]), proxy(callbacks[1]));
  });

  function proxy (fn) {
    return fn ? fn.bind(this) : null;
  }

  return pro;
};

/*
 * aliases
 */

Api.prototype.get = buildAlias('GET');
Api.prototype.put = buildAlias('PUT');
Api.prototype.del = buildAlias('DELETE');
Api.prototype.post = buildAlias('POST');
Api.prototype.patch = buildAlias('PATCH');

/*
 * currying helper to make alias methods
 */

function buildAlias (method) {
  return function () {
    return Api.prototype.request.apply(this,
      [method].concat([].slice.call(arguments)));
  };
}

/*
 * add before hook
 */

Api.prototype.before = function (fn) {
  this._before.push(fn);
  return this;
};

/*
 * add after hook
 */

Api.prototype.after = function (okFn, errFn) {
  this._after.push([ okFn, errFn ]);
  return this;
};

/*
 * parses the body
 *
 *     parseBody({
 *       body: '{"name":"Joe"}',
 *       headers: { 'content-type': 'application/json' }
 *     })
 *     => { name: "Joe" }
 */

Api.prototype.parseBody = function (res) {
  var
    body = res.getBody(),
    type = res.headers['content-type'];

  if (type.match(/^application\/json/))
    return JSON.parse(body);
  else
    return body;
};

/*
 * prefixes a url with the base
 */

Api.prototype.prefix = function (url) {
  if (url[0] === '/')
    return (this.base || '') + url;
  else
    return url;
};

/*
 * (internal) saves responses
 */

Api.prototype.saveResponse = function (res) {
  this.response = this.res = res;
  return res;
};

/*
 * export
 */

module.exports = Api;

},{"then-request":7}],7:[function(require,module,exports){
'use strict';

var Promise = require('promise');
var Response = require('http-response-object');
var handleQs = require('./lib/handle-qs.js');

module.exports = doRequest;
function doRequest(method, url, options, callback) {
  var result = new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest();

    // check types of arguments

    if (typeof method !== 'string') {
      throw new TypeError('The method must be a string.');
    }
    if (typeof url !== 'string') {
      throw new TypeError('The URL/path must be a string.');
    }
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (options === null || options === undefined) {
      options = {};
    }
    if (typeof options !== 'object') {
      throw new TypeError('Options must be an object (or null).');
    }
    if (typeof callback !== 'function') {
      callback = undefined;
    }

    method = method.toUpperCase();
    options.headers = options.headers || {};

    // handle cross domain

    var match;
    var crossDomain = !!((match = /^([\w-]+:)?\/\/([^\/]+)/.exec(options.uri)) && (match[2] != window.location.host));
    if (!crossDomain) options.headers['X-Requested-With'] = 'XMLHttpRequest';

    // handle query string
    if (options.qs) {
      url = handleQs(url, options.qs);
    }

    // handle json body
    if (options.json) {
      options.body = JSON.stringify(options.json);
      options.headers['content-type'] = 'application/json';
    }


    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var headers = {};
        xhr.getAllResponseHeaders().split('\r\n').forEach(function (header) {
          var h = header.split(':');
          if (h.length > 1) {
            headers[h[0].toLowerCase()] = h.slice(1).join(':').trim();
          }
        });
        resolve(new Response(xhr.status, headers, xhr.responseText));
      }
    };

    // method, url, async
    xhr.open(method, url, true);

    for (var name in options.headers) {
      xhr.setRequestHeader(name.toLowerCase(), options.headers[name]);
    }

    // avoid sending empty string (#319)
    xhr.send(options.body ? options.body : null);
  });
  result.getBody = function () {
    return result.then(function (res) { return res.getBody(); });
  };
  return result.nodeify(callback);
}

},{"./lib/handle-qs.js":8,"http-response-object":9,"promise":10}],8:[function(require,module,exports){
'use strict';

var parse = require('qs').parse;
var stringify = require('qs').stringify;

module.exports = handleQs;
function handleQs(url, query) {
  url = url.split('?');
  var start = url[0];
  var qs = (url[1] || '').split('#')[0];
  var end = url[1] && url[1].split('#').length > 1 ? '#' + url[1].split('#')[1] : '';

  var baseQs = parse(qs);
  for (var i in query) {
    baseQs[i] = query[i];
  }
  qs = stringify(baseQs);
  if (qs !== '') {
    qs = '?' + qs;
  }
  return start + qs + end;
}

},{"qs":16}],9:[function(require,module,exports){
'use strict';

module.exports = Response;

/**
 * A response from a web request
 *
 * @param {Number} statusCode
 * @param {Object} headers
 * @param {Buffer} body
 */
function Response(statusCode, headers, body) {
  if (typeof statusCode !== 'number') {
    throw new TypeError('statusCode must be a number but was ' + (typeof statusCode));
  }
  if (headers === null) {
    throw new TypeError('headers cannot be null');
  }
  if (typeof headers !== 'object') {
    throw new TypeError('headers must be an object but was ' + (typeof headers));
  }
  this.statusCode = statusCode;
  this.headers = {};
  for (var key in headers) {
    this.headers[key.toLowerCase()] = headers[key];
  }
  this.body = body;
}

Response.prototype.getBody = function (encoding) {
  if (this.statusCode >= 300) {
    var err = new Error('Server responded with status code '
                    + this.statusCode + ':\n' + this.body.toString());
    err.statusCode = this.statusCode;
    err.headers = this.headers;
    err.body = this.body;
    throw err;
  }
  return encoding ? this.body.toString(encoding) : this.body;
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = require('./lib/core.js')
require('./lib/done.js')
require('./lib/es6-extensions.js')
require('./lib/node-extensions.js')
},{"./lib/core.js":11,"./lib/done.js":12,"./lib/es6-extensions.js":13,"./lib/node-extensions.js":14}],11:[function(require,module,exports){
'use strict';

var asap = require('asap')

module.exports = Promise;
function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
  if (typeof fn !== 'function') throw new TypeError('not a function')
  var state = null
  var value = null
  var deferreds = []
  var self = this

  this.then = function(onFulfilled, onRejected) {
    return new self.constructor(function(resolve, reject) {
      handle(new Handler(onFulfilled, onRejected, resolve, reject))
    })
  }

  function handle(deferred) {
    if (state === null) {
      deferreds.push(deferred)
      return
    }
    asap(function() {
      var cb = state ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        (state ? deferred.resolve : deferred.reject)(value)
        return
      }
      var ret
      try {
        ret = cb(value)
      }
      catch (e) {
        deferred.reject(e)
        return
      }
      deferred.resolve(ret)
    })
  }

  function resolve(newValue) {
    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
          doResolve(then.bind(newValue), resolve, reject)
          return
        }
      }
      state = true
      value = newValue
      finale()
    } catch (e) { reject(e) }
  }

  function reject(newValue) {
    state = false
    value = newValue
    finale()
  }

  function finale() {
    for (var i = 0, len = deferreds.length; i < len; i++)
      handle(deferreds[i])
    deferreds = null
  }

  doResolve(fn, resolve, reject)
}


function Handler(onFulfilled, onRejected, resolve, reject){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}

},{"asap":15}],12:[function(require,module,exports){
'use strict';

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    asap(function () {
      throw err
    })
  })
}
},{"./core.js":11,"asap":15}],13:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise

/* Static Functions */

function ValuePromise(value) {
  this.then = function (onFulfilled) {
    if (typeof onFulfilled !== 'function') return this
    return new Promise(function (resolve, reject) {
      asap(function () {
        try {
          resolve(onFulfilled(value))
        } catch (ex) {
          reject(ex);
        }
      })
    })
  }
}
ValuePromise.prototype = Promise.prototype

var TRUE = new ValuePromise(true)
var FALSE = new ValuePromise(false)
var NULL = new ValuePromise(null)
var UNDEFINED = new ValuePromise(undefined)
var ZERO = new ValuePromise(0)
var EMPTYSTRING = new ValuePromise('')

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return NULL
  if (value === undefined) return UNDEFINED
  if (value === true) return TRUE
  if (value === false) return FALSE
  if (value === 0) return ZERO
  if (value === '') return EMPTYSTRING

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex)
      })
    }
  }

  return new ValuePromise(value)
}

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { res(i, val) }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { 
    reject(value);
  });
}

Promise.race = function (values) {
  return new Promise(function (resolve, reject) { 
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    })
  });
}

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
}

},{"./core.js":11,"asap":15}],14:[function(require,module,exports){
'use strict';

//This file contains then/promise specific extensions that are only useful for node.js interop

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop()
      }
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      var res = fn.apply(self, args)
      if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function') {
        resolve(res)
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    var ctx = this
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx)
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        asap(function () {
          callback.call(ctx, ex)
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value)
    })
  }, function (err) {
    asap(function () {
      callback.call(ctx, err)
    })
  })
}

},{"./core.js":11,"asap":15}],15:[function(require,module,exports){
(function (process){

// Use the fastest possible means to execute a task in a future turn
// of the event loop.

// linked list of tasks (single, with head node)
var head = {task: void 0, next: null};
var tail = head;
var flushing = false;
var requestFlush = void 0;
var isNodeJS = false;

function flush() {
    /* jshint loopfunc: true */

    while (head.next) {
        head = head.next;
        var task = head.task;
        head.task = void 0;
        var domain = head.domain;

        if (domain) {
            head.domain = void 0;
            domain.enter();
        }

        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function() {
                   throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    flushing = false;
}

if (typeof process !== "undefined" && process.nextTick) {
    // Node.js before 0.9. Note that some fake-Node environments, like the
    // Mocha test runner, introduce a `process` global without a `nextTick`.
    isNodeJS = true;

    requestFlush = function () {
        process.nextTick(flush);
    };

} else if (typeof setImmediate === "function") {
    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
    if (typeof window !== "undefined") {
        requestFlush = setImmediate.bind(window, flush);
    } else {
        requestFlush = function () {
            setImmediate(flush);
        };
    }

} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    requestFlush = function () {
        channel.port2.postMessage(0);
    };

} else {
    // old browsers
    requestFlush = function () {
        setTimeout(flush, 0);
    };
}

function asap(task) {
    tail = tail.next = {
        task: task,
        domain: isNodeJS && process.domain,
        next: null
    };

    if (!flushing) {
        flushing = true;
        requestFlush();
    }
};

module.exports = asap;


}).call(this,require('_process'))
},{"_process":21}],16:[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":17}],17:[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":18,"./stringify":19}],18:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) &&
            root !== cleanRoot &&
            indexString === cleanRoot &&
            index >= 0 &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":20}],19:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    indices: true
};


internals.stringify = function (obj, prefix, options) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (!options.indices &&
            Array.isArray(obj)) {

            values = values.concat(internals.stringify(obj[key], prefix, options));
        }
        else {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', options));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
    options.indices = typeof options.indices === 'boolean' ? options.indices : internals.indices;

    var keys = [];

    if (typeof obj !== 'object' ||
        obj === null) {

        return '';
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, options));
    }

    return keys.join(delimiter);
};

},{"./utils":20}],20:[function(require,module,exports){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        }
        else {
            target[source] = true;
        }

        return target;
    }

    if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
    }

    if (Array.isArray(target) &&
        !Array.isArray(source)) {

        target = exports.arrayToObject(target);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (!target[key]) {
            target[key] = value;
        }
        else {
            target[key] = exports.merge(target[key], value);
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, il = obj.length; i < il; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (obj === null ||
        typeof obj === 'undefined') {

        return false;
    }

    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};

},{}],21:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
/**
 * addClass : addClass(el, className)
 * Adds a class name to an element. Compare with `$.fn.addClass`.
 *
 *     var addClass = require('dom101/add-class');
 *
 *     addClass(el, 'active');
 */

function addClass (el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

module.exports = addClass;

},{}],23:[function(require,module,exports){
/**
 * each : each(list, fn)
 * Iterates through `list` (an array or an object). This is useful when dealing
 * with NodeLists like `document.querySelectorAll`.
 *
 *     var each = require('dom101/each');
 *     var qa = require('dom101/query-selector-all');
 *
 *     each(qa('.button'), function (el) {
 *       addClass('el', 'selected');
 *     });
 */

function each (list, fn) {
  var i, len = list.length;

  if (len === +len) {
    for (i = 0; i < len; i++) {
      fn(list[i], i);
    }
  } else {
    for (i in list) {
      if (list.hasOwnProperty(i))
        fn(list[i], i);
    }
  }

  return list;
}

module.exports = each;

},{}],24:[function(require,module,exports){
/**
 * extend() : extend(dest, src1, [src2 ...])
 * Extends object `dest` with properties from sources `src`.
 * Compare with [$.extend](http://api.jquery.com/jquery.extend/).
 *
 * Also consider [node-extend] for more complicated cases.
 * [node-extend]: http://npmjs.com/node-extend
 *
 *     var extend = require('dom101/extend');
 *     extend({}, defaults, options);
 */

function extend (out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
}

// Thanks:
// https://github.com/HubSpot/youmightnotneedjquery/blob/ef987223c20e480fcbfb5924d96c11cd928e1226/comparisons/utils/extend/ie8.js

module.exports = extend;

},{}],25:[function(require,module,exports){
/**
 * querySelectorAll : querySelectorAll(query)
 * Convenience function to access `document.querySelectorAll`.
 *
 *     var each = require('dom101/each');
 *     var qa = require('dom101/query-selector-all');
 *
 *     each(qa('.button'), function (el) {
 *       addClass('el', 'selected');
 *     });
 */

function querySelectorAll (query) {
  return document.querySelectorAll(query);
}

module.exports = querySelectorAll;

},{}],26:[function(require,module,exports){
/**
 * querySelector : querySelector(query)
 * Convenience function to access `document.querySelector`.
 *
 *     var q = require('dom101/query-selector');
 *     addClass(q('#instructions'), 'hidden');
 */

function querySelector (query) {
  return document.querySelector(query);
}

module.exports = querySelector;

},{}],27:[function(require,module,exports){
/**
 * ready : ready(fn)
 * Executes `fn` when the DOM is ready.
 *
 *     var ready = require('dom101/ready');
 *
 *     ready(function () {
 *       ...
 *     });
 */

function ready (fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive') fn();
    });
  }
}

module.exports = ready;

},{}],28:[function(require,module,exports){
/**
 * removeClass : removeClass(el, className)
 * Removes a classname.
 *
 *     var removeClass = require('dom101/remove-class');
 *
 *     el.className = 'selected active';
 *     removeClass(el, 'active');
 *
 *     el.className
 *     => "selected"
 */

function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    var expr =
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');

    el.className = el.className.replace(expr, ' ');
  }
}

module.exports = removeClass;

},{}],29:[function(require,module,exports){
// * templayed.js 0.2.1
// * The fastest and smallest Mustache compliant Javascript templating library written in 1806 bytes (uncompressed)
// *
// * (c) 2012 Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, templayed.js is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: 2012-10-14 01:17:01 +0100 (Sun, 14 October 2012) $
// *

function templayed(template, vars) {

  var get = function(path, i) {
    i = 1; path = path.replace(/\.\.\//g, function() { i++; return ''; });
    var js = ['vars[vars.length - ', i, ']'], keys = (path == "." ? [] : path.split(".")), j = 0;
    for (j; j < keys.length; j++) { js.push('.' + keys[j]); };
    return js.join('');
  }, tag = function(template) {
    return template.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g, function(match, operator, context) {
      if (operator == "!") return '';
      var i = inc++;
      return ['"; var o', i, ' = ', get(context), ', s', i, ' = (((typeof(o', i, ') == "function" ? o', i, '.call(vars[vars.length - 1]) : o', i, ') || "") + ""); s += ',
        (operator ? ('s' + i) : '(/[&"><]/.test(s' + i + ') ? s' + i + '.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/>/g,"&gt;").replace(/</g,"&lt;") : s' + i + ')'), ' + "'
      ].join('');
    });
  }, block = function(template) {
    return tag(template.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g, function(match, operator, key, context) {
      var i = inc++;
      return ['"; var o', i, ' = ', get(key), '; ',
        (operator == "^" ?
          ['if ((o', i, ' instanceof Array) ? !o', i, '.length : !o', i, ') { s += "', block(context), '"; } '] :
          ['if (typeof(o', i, ') == "boolean" && o', i, ') { s += "', block(context), '"; } else if (o', i, ') { for (var i', i, ' = 0; i', i, ' < o',
            i, '.length; i', i, '++) { vars.push(o', i, '[i', i, ']); s += "', block(context), '"; vars.pop(); }}']
        ).join(''), '; s += "'].join('');
    }));
  }, inc = 0;

  return new Function("vars", 'vars = [vars]; var s = "' + block(template.replace(/"/g, '\\"').replace(/\n/g, '\\n')) + '"; return s;');
};

templayed.version = "0.2.1";

//simpleport
module.exports = templayed;

},{}]},{},[1])(1)
});