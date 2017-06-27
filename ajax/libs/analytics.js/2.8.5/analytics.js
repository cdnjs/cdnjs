(function umd(require){
  if ('object' == typeof exports) {
    module.exports = require('1');
  } else if ('function' == typeof define && define.amd) {
    define(function(){ return require('1'); });
  } else {
    this['analytics'] = require('1');
  }
})((function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {

/**
 * Analytics.js
 *
 * (C) 2013 Segment.io Inc.
 */

var _analytics = window.analytics;
var Integrations = require('analytics.js-integrations');
var Analytics = require('./analytics');
var each = require('each');


/**
 * Expose the `analytics` singleton.
 */

var analytics = module.exports = exports = new Analytics();

/**
 * Expose require
 */

analytics.require = require;

/**
 * Expose `VERSION`.
 */

exports.VERSION = require('../bower.json').version;

/**
 * Add integrations.
 */

each(Integrations, function (name, Integration) {
  analytics.use(Integration);
});

}, {"analytics.js-integrations":2,"./analytics":3,"each":4,"../bower.json":5}],
2: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var each = require('each');
var plugins = require('./integrations.js');

/**
 * Expose the integrations, using their own `name` from their `prototype`.
 */

each(plugins, function(plugin){
  var name = (plugin.Integration || plugin).prototype.name;
  exports[name] = plugin;
});



}, {"each":4,"./integrations.js":6}],
4: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var type = require('type');

/**
 * HOP reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Iterate the given `obj` and invoke `fn(val, i)`.
 *
 * @param {String|Array|Object} obj
 * @param {Function} fn
 * @api public
 */

module.exports = function(obj, fn){
  switch (type(obj)) {
    case 'array':
      return array(obj, fn);
    case 'object':
      if ('number' == typeof obj.length) return array(obj, fn);
      return object(obj, fn);
    case 'string':
      return string(obj, fn);
  }
};

/**
 * Iterate string chars.
 *
 * @param {String} obj
 * @param {Function} fn
 * @api private
 */

function string(obj, fn) {
  for (var i = 0; i < obj.length; ++i) {
    fn(obj.charAt(i), i);
  }
}

/**
 * Iterate object keys.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function object(obj, fn) {
  for (var key in obj) {
    if (has.call(obj, key)) {
      fn(key, obj[key]);
    }
  }
}

/**
 * Iterate array-ish.
 *
 * @param {Array|Object} obj
 * @param {Function} fn
 * @api private
 */

function array(obj, fn) {
  for (var i = 0; i < obj.length; ++i) {
    fn(obj[i], i);
  }
}
}, {"type":7}],
7: [function(require, module, exports) {
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};

}, {}],
6: [function(require, module, exports) {

/**
 * DON'T EDIT THIS FILE. It's automatically generated!
 */

module.exports = [
  require('./lib/adroll'),
  require('./lib/adwords'),
  require('./lib/alexa'),
  require('./lib/amplitude'),
  require('./lib/appcues'),
  require('./lib/atatus'),
  require('./lib/autosend'),
  require('./lib/awesm'),
  require('./lib/bing-ads'),
  require('./lib/blueshift'),
  require('./lib/bronto'),
  require('./lib/bugherd'),
  require('./lib/bugsnag'),
  require('./lib/chartbeat'),
  require('./lib/churnbee'),
  require('./lib/clicktale'),
  require('./lib/clicky'),
  require('./lib/comscore'),
  require('./lib/crazy-egg'),
  require('./lib/curebit'),
  require('./lib/customerio'),
  require('./lib/drip'),
  require('./lib/errorception'),
  require('./lib/evergage'),
  require('./lib/extole'),
  require('./lib/facebook-conversion-tracking'),
  require('./lib/foxmetrics'),
  require('./lib/frontleaf'),
  require('./lib/fullstory'),
  require('./lib/gauges'),
  require('./lib/get-satisfaction'),
  require('./lib/google-analytics'),
  require('./lib/google-tag-manager'),
  require('./lib/gosquared'),
  require('./lib/heap'),
  require('./lib/hellobar'),
  require('./lib/hittail'),
  require('./lib/hubspot'),
  require('./lib/improvely'),
  require('./lib/insidevault'),
  require('./lib/inspectlet'),
  require('./lib/intercom'),
  require('./lib/keen-io'),
  require('./lib/kenshoo'),
  require('./lib/kissmetrics'),
  require('./lib/klaviyo'),
  require('./lib/livechat'),
  require('./lib/lucky-orange'),
  require('./lib/lytics'),
  require('./lib/mixpanel'),
  require('./lib/mojn'),
  require('./lib/mouseflow'),
  require('./lib/mousestats'),
  require('./lib/navilytics'),
  require('./lib/nudgespot'),
  require('./lib/olark'),
  require('./lib/optimizely'),
  require('./lib/perfect-audience'),
  require('./lib/pingdom'),
  require('./lib/piwik'),
  require('./lib/preact'),
  require('./lib/qualaroo'),
  require('./lib/quantcast'),
  require('./lib/rollbar'),
  require('./lib/saasquatch'),
  require('./lib/satismeter'),
  require('./lib/segmentio'),
  require('./lib/sentry'),
  require('./lib/snapengage'),
  require('./lib/spinnakr'),
  require('./lib/tapstream'),
  require('./lib/trakio'),
  require('./lib/twitter-ads'),
  require('./lib/userlike'),
  require('./lib/uservoice'),
  require('./lib/vero'),
  require('./lib/visual-website-optimizer'),
  require('./lib/webengage'),
  require('./lib/woopra'),
  require('./lib/yandex-metrica')
];

}, {"./lib/adroll":8,"./lib/adwords":9,"./lib/alexa":10,"./lib/amplitude":11,"./lib/appcues":12,"./lib/atatus":13,"./lib/autosend":14,"./lib/awesm":15,"./lib/bing-ads":16,"./lib/blueshift":17,"./lib/bronto":18,"./lib/bugherd":19,"./lib/bugsnag":20,"./lib/chartbeat":21,"./lib/churnbee":22,"./lib/clicktale":23,"./lib/clicky":24,"./lib/comscore":25,"./lib/crazy-egg":26,"./lib/curebit":27,"./lib/customerio":28,"./lib/drip":29,"./lib/errorception":30,"./lib/evergage":31,"./lib/extole":32,"./lib/facebook-conversion-tracking":33,"./lib/foxmetrics":34,"./lib/frontleaf":35,"./lib/fullstory":36,"./lib/gauges":37,"./lib/get-satisfaction":38,"./lib/google-analytics":39,"./lib/google-tag-manager":40,"./lib/gosquared":41,"./lib/heap":42,"./lib/hellobar":43,"./lib/hittail":44,"./lib/hubspot":45,"./lib/improvely":46,"./lib/insidevault":47,"./lib/inspectlet":48,"./lib/intercom":49,"./lib/keen-io":50,"./lib/kenshoo":51,"./lib/kissmetrics":52,"./lib/klaviyo":53,"./lib/livechat":54,"./lib/lucky-orange":55,"./lib/lytics":56,"./lib/mixpanel":57,"./lib/mojn":58,"./lib/mouseflow":59,"./lib/mousestats":60,"./lib/navilytics":61,"./lib/nudgespot":62,"./lib/olark":63,"./lib/optimizely":64,"./lib/perfect-audience":65,"./lib/pingdom":66,"./lib/piwik":67,"./lib/preact":68,"./lib/qualaroo":69,"./lib/quantcast":70,"./lib/rollbar":71,"./lib/saasquatch":72,"./lib/satismeter":73,"./lib/segmentio":74,"./lib/sentry":75,"./lib/snapengage":76,"./lib/spinnakr":77,"./lib/tapstream":78,"./lib/trakio":79,"./lib/twitter-ads":80,"./lib/userlike":81,"./lib/uservoice":82,"./lib/vero":83,"./lib/visual-website-optimizer":84,"./lib/webengage":85,"./lib/woopra":86,"./lib/yandex-metrica":87}],
8: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var snake = require('to-snake-case');
var useHttps = require('use-https');
var each = require('each');
var is = require('is');
var del = require('obj-case').del;

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `AdRoll` integration.
 */

var AdRoll = module.exports = integration('AdRoll')
  .assumesPageview()
  .global('__adroll_loaded')
  .global('adroll_adv_id')
  .global('adroll_pix_id')
  .global('adroll_custom_data')
  .option('advId', '')
  .option('pixId', '')
  .tag('http', '<script src="http://a.adroll.com/j/roundtrip.js">')
  .tag('https', '<script src="https://s.adroll.com/j/roundtrip.js">')
  .mapping('events');

/**
 * Initialize.
 *
 * http://support.adroll.com/getting-started-in-4-easy-steps/#step-one
 * http://support.adroll.com/enhanced-conversion-tracking/
 *
 * @param {Object} page
 */

AdRoll.prototype.initialize = function(page){
  window.adroll_adv_id = this.options.advId;
  window.adroll_pix_id = this.options.pixId;
  window.__adroll_loaded = true;
  var name = useHttps() ? 'https' : 'http';
  this.load(name, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

AdRoll.prototype.loaded = function(){
  return window.__adroll;
};

/**
 * Page.
 *
 * http://support.adroll.com/segmenting-clicks/
 *
 * @param {Page} page
 */

AdRoll.prototype.page = function(page){
  var name = page.fullName();
  this.track(page.track(name));
};

/**
 * Track.
 *
 * @param {Track} track
 */

AdRoll.prototype.track = function(track){
  var event = track.event();
  var user = this.analytics.user();
  var events = this.events(event);
  var total = track.revenue() || track.total() || 0;
  var orderId = track.orderId() || 0;
  var productId = track.id();
  var sku = track.sku();
  var customProps = track.properties();

  var data = {};
  if (user.id()) data.user_id = user.id();
  if (orderId) data.order_id = orderId;
  if (productId) data.product_id = productId;
  if (sku) data.sku = sku;
  if (total) data.adroll_conversion_value_in_dollars = total;
  del(customProps, "revenue");
  del(customProps, "total");
  del(customProps, "orderId");
  del(customProps, "id");
  del(customProps, "sku");
  if (!is.empty(customProps)) data.adroll_custom_data = customProps;

  each(events, function(event){
    // the adroll interface only allows for
    // segment names which are snake cased.
    data.adroll_segments = snake(event);
    window.__adroll.record_user(data);
  });

  // no events found
  if (!events.length) {
    data.adroll_segments = snake(event);
    window.__adroll.record_user(data);
  }
};

}, {"analytics.js-integration":88,"to-snake-case":89,"use-https":90,"each":4,"is":91,"obj-case":92}],
88: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var bind = require('bind');
var callback = require('callback');
var clone = require('clone');
var debug = require('debug');
var defaults = require('defaults');
var protos = require('./protos');
var slug = require('slug');
var statics = require('./statics');

/**
 * Expose `createIntegration`.
 */

module.exports = createIntegration;

/**
 * Create a new `Integration` constructor.
 *
 * @param {String} name
 * @return {Function} Integration
 */

function createIntegration(name){

  /**
   * Initialize a new `Integration`.
   *
   * @param {Object} options
   */

  function Integration(options){
    if (options && options.addIntegration) {
      // plugin
      return options.addIntegration(Integration);
    }
    this.debug = debug('analytics:integration:' + slug(name));
    this.options = defaults(clone(options) || {}, this.defaults);
    this._queue = [];
    this.once('ready', bind(this, this.flush));

    Integration.emit('construct', this);
    this.ready = bind(this, this.ready);
    this._wrapInitialize();
    this._wrapPage();
    this._wrapTrack();
  }

  Integration.prototype.defaults = {};
  Integration.prototype.globals = [];
  Integration.prototype.templates = {};
  Integration.prototype.name = name;
  for (var key in statics) Integration[key] = statics[key];
  for (var key in protos) Integration.prototype[key] = protos[key];
  return Integration;
}

}, {"bind":93,"callback":94,"clone":95,"debug":96,"defaults":97,"./protos":98,"slug":99,"./statics":100}],
93: [function(require, module, exports) {

var bind = require('bind')
  , bindAll = require('bind-all');


/**
 * Expose `bind`.
 */

module.exports = exports = bind;


/**
 * Expose `bindAll`.
 */

exports.all = bindAll;


/**
 * Expose `bindMethods`.
 */

exports.methods = bindMethods;


/**
 * Bind `methods` on `obj` to always be called with the `obj` as context.
 *
 * @param {Object} obj
 * @param {String} methods...
 */

function bindMethods (obj, methods) {
  methods = [].slice.call(arguments, 1);
  for (var i = 0, method; method = methods[i]; i++) {
    obj[method] = bind(obj, obj[method]);
  }
  return obj;
}
}, {"bind":101,"bind-all":102}],
101: [function(require, module, exports) {
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

}, {}],
102: [function(require, module, exports) {

try {
  var bind = require('bind');
  var type = require('type');
} catch (e) {
  var bind = require('bind-component');
  var type = require('type-component');
}

module.exports = function (obj) {
  for (var key in obj) {
    var val = obj[key];
    if (type(val) === 'function') obj[key] = bind(obj, obj[key]);
  }
  return obj;
};
}, {"bind":101,"type":7}],
94: [function(require, module, exports) {
var next = require('next-tick');


/**
 * Expose `callback`.
 */

module.exports = callback;


/**
 * Call an `fn` back synchronously if it exists.
 *
 * @param {Function} fn
 */

function callback (fn) {
  if ('function' === typeof fn) fn();
}


/**
 * Call an `fn` back asynchronously if it exists. If `wait` is ommitted, the
 * `fn` will be called on next tick.
 *
 * @param {Function} fn
 * @param {Number} wait (optional)
 */

callback.async = function (fn, wait) {
  if ('function' !== typeof fn) return;
  if (!wait) return next(fn);
  setTimeout(fn, wait);
};


/**
 * Symmetry.
 */

callback.sync = callback;

}, {"next-tick":103}],
103: [function(require, module, exports) {
"use strict"

if (typeof setImmediate == 'function') {
  module.exports = function(f){ setImmediate(f) }
}
// legacy node.js
else if (typeof process != 'undefined' && typeof process.nextTick == 'function') {
  module.exports = process.nextTick
}
// fallback for other environments / postMessage behaves badly on IE8
else if (typeof window == 'undefined' || window.ActiveXObject || !window.postMessage) {
  module.exports = function(f){ setTimeout(f) };
} else {
  var q = [];

  window.addEventListener('message', function(){
    var i = 0;
    while (i < q.length) {
      try { q[i++](); }
      catch (e) {
        q = q.slice(i);
        window.postMessage('tic!', '*');
        throw e;
      }
    }
    q.length = 0;
  }, true);

  module.exports = function(fn){
    if (!q.length) window.postMessage('tic!', '*');
    q.push(fn);
  }
}

}, {}],
95: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var type;

try {
  type = require('type');
} catch(e){
  type = require('type-component');
}

/**
 * Module exports.
 */

module.exports = clone;

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key]);
        }
      }
      return copy;

    case 'array':
      var copy = new Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}

}, {"type":7}],
96: [function(require, module, exports) {
if ('undefined' == typeof window) {
  module.exports = require('./lib/debug');
} else {
  module.exports = require('./debug');
}

}, {"./lib/debug":104,"./debug":105}],
104: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var tty = require('tty');

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Enabled debuggers.
 */

var names = []
  , skips = [];

(process.env.DEBUG || '')
  .split(/[\s,]+/)
  .forEach(function(name){
    name = name.replace('*', '.*?');
    if (name[0] === '-') {
      skips.push(new RegExp('^' + name.substr(1) + '$'));
    } else {
      names.push(new RegExp('^' + name + '$'));
    }
  });

/**
 * Colors.
 */

var colors = [6, 2, 3, 4, 5, 1];

/**
 * Previous debug() call.
 */

var prev = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Is stdout a TTY? Colored output is disabled when `true`.
 */

var isatty = tty.isatty(2);

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function color() {
  return colors[prevColor++ % colors.length];
}

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

function humanize(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
}

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  function disabled(){}
  disabled.enabled = false;

  var match = skips.some(function(re){
    return re.test(name);
  });

  if (match) return disabled;

  match = names.some(function(re){
    return re.test(name);
  });

  if (!match) return disabled;
  var c = color();

  function colored(fmt) {
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (prev[name] || curr);
    prev[name] = curr;

    fmt = '  \u001b[9' + c + 'm' + name + ' '
      + '\u001b[3' + c + 'm\u001b[90m'
      + fmt + '\u001b[3' + c + 'm'
      + ' +' + humanize(ms) + '\u001b[0m';

    console.error.apply(this, arguments);
  }

  function plain(fmt) {
    fmt = coerce(fmt);

    fmt = new Date().toUTCString()
      + ' ' + name + ' ' + fmt;
    console.error.apply(this, arguments);
  }

  colored.enabled = plain.enabled = true;

  return isatty || process.env.DEBUG_COLORS
    ? colored
    : plain;
}

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {}],
105: [function(require, module, exports) {

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

}, {}],
97: [function(require, module, exports) {
'use strict';

/**
 * Merge default values.
 *
 * @param {Object} dest
 * @param {Object} defaults
 * @return {Object}
 * @api public
 */
var defaults = function (dest, src, recursive) {
  for (var prop in src) {
    if (recursive && dest[prop] instanceof Object && src[prop] instanceof Object) {
      dest[prop] = defaults(dest[prop], src[prop], true);
    } else if (! (prop in dest)) {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

/**
 * Expose `defaults`.
 */
module.exports = defaults;

}, {}],
98: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var loadScript = require('load-script');
var loadIframe = require('load-iframe');
var events = require('analytics-events');
var normalize = require('to-no-case');
var callback = require('callback');
var Emitter = require('emitter');
var tick = require('next-tick');
var after = require('after');
var each = require('each');
var type = require('type');
var fmt = require('fmt');

/**
 * Noop.
 */

function noop(){}

/**
 * Window defaults.
 */

var setTimeout = window.setTimeout;
var setInterval = window.setInterval;
var onerror = window.onerror;
var onload = null;

/**
 * Mixin emitter.
 */

Emitter(exports);

/**
 * Initialize.
 */

exports.initialize = function(){
  var ready = this.ready;
  tick(ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 * @api private
 */

exports.loaded = function(){
  return false;
};

/**
 * Page.
 *
 * @param {Page} page
 */

exports.page = function(page){};

/**
 * Track.
 *
 * @param {Track} track
 */

exports.track = function(track){};

/**
 * Get events that match `str`.
 *
 * Examples:
 *
 *    events = { my_event: 'a4991b88' }
 *    .map(events, 'My Event');
 *    // => ["a4991b88"]
 *    .map(events, 'whatever');
 *    // => []
 *
 *    events = [{ key: 'my event', value: '9b5eb1fa' }]
 *    .map(events, 'my_event');
 *    // => ["9b5eb1fa"]
 *    .map(events, 'whatever');
 *    // => []
 *
 * @param {String} str
 * @return {Array}
 * @api public
 */

exports.map = function(obj, str){
  var a = normalize(str);
  var ret = [];

  // noop
  if (!obj) return ret;

  // object
  if ('object' == type(obj)) {
    for (var k in obj) {
      var item = obj[k];
      var b = normalize(k);
      if (b == a) ret.push(item);
    }
  }

  // array
  if ('array' == type(obj)) {
    if (!obj.length) return ret;
    if (!obj[0].key) return ret;

    for (var i = 0; i < obj.length; ++i) {
      var item = obj[i];
      var b = normalize(item.key);
      if (b == a) ret.push(item.value);
    }
  }

  return ret;
};

/**
 * Invoke a `method` that may or may not exist on the prototype with `args`,
 * queueing or not depending on whether the integration is "ready". Don't
 * trust the method call, since it contains integration party code.
 *
 * @param {String} method
 * @param {Mixed} args...
 * @api private
 */

exports.invoke = function(method){
  if (!this[method]) return;
  var args = [].slice.call(arguments, 1);
  if (!this._ready) return this.queue(method, args);
  var ret;

  try {
    this.debug('%s with %o', method, args);
    ret = this[method].apply(this, args);
  } catch (e) {
    this.debug('error %o calling %s with %o', e, method, args);
  }

  return ret;
};

/**
 * Queue a `method` with `args`. If the integration assumes an initial
 * pageview, then let the first call to `page` pass through.
 *
 * @param {String} method
 * @param {Array} args
 * @api private
 */

exports.queue = function(method, args){
  if ('page' == method && this._assumesPageview && !this._initialized) {
    return this.page.apply(this, args);
  }

  this._queue.push({ method: method, args: args });
};

/**
 * Flush the internal queue.
 *
 * @api private
 */

exports.flush = function(){
  this._ready = true;
  var call;
  while (call = this._queue.shift()) this[call.method].apply(this, call.args);
};

/**
 * Reset the integration, removing its global variables.
 *
 * @api private
 */

exports.reset = function(){
  for (var i = 0, key; key = this.globals[i]; i++) window[key] = undefined;
  window.setTimeout = setTimeout;
  window.setInterval = setInterval;
  window.onerror = onerror;
  window.onload = onload;
};

/**
 * Load a tag by `name`.
 *
 * @param {String} name
 * @param {Function} [fn]
 */

exports.load = function(name, locals, fn){
  if ('function' == typeof name) fn = name, locals = null, name = null;
  if (name && 'object' == typeof name) fn = locals, locals = name, name = null;
  if ('function' == typeof locals) fn = locals, locals = null;
  name = name || 'library';
  locals = locals || {};
  locals = this.locals(locals);
  var template = this.templates[name];
  if (!template) throw new Error(fmt('template "%s" not defined.', name));
  var attrs = render(template, locals);
  var fn = fn || noop;
  var self = this;
  var el;

  switch (template.type) {
    case 'img':
      attrs.width = 1;
      attrs.height = 1;
      el = loadImage(attrs, fn);
      break;
    case 'script':
      el = loadScript(attrs, function(err){
        if (!err) return fn();
        self.debug('error loading "%s" error="%s"', self.name, err);
      });
      // TODO: hack until refactoring load-script
      delete attrs.src;
      each(attrs, function(key, val){
        el.setAttribute(key, val);
      });
      break;
    case 'iframe':
      el = loadIframe(attrs, fn);
      break;
  }

  return el;
};

/**
 * Locals for tag templates.
 *
 * By default it includes a cache buster,
 * and all of the options.
 *
 * @param {Object} [locals]
 * @return {Object}
 */

exports.locals = function(locals){
  locals = locals || {};
  var cache = Math.floor(new Date().getTime() / 3600000);
  if (!locals.hasOwnProperty('cache')) locals.cache = cache;
  each(this.options, function(key, val){
    if (!locals.hasOwnProperty(key)) locals[key] = val;
  });
  return locals;
};

/**
 * Simple way to emit ready.
 */

exports.ready = function(){
  this.emit('ready');
};

/**
 * Wrap the initialize method in an exists check, so we don't have to do it for
 * every single integration.
 *
 * @api private
 */

exports._wrapInitialize = function(){
  var initialize = this.initialize;
  this.initialize = function(){
    this.debug('initialize');
    this._initialized = true;
    var ret = initialize.apply(this, arguments);
    this.emit('initialize');
    return ret;
  };

  if (this._assumesPageview) this.initialize = after(2, this.initialize);
};

/**
 * Wrap the page method to call `initialize` instead if the integration assumes
 * a pageview.
 *
 * @api private
 */

exports._wrapPage = function(){
  var page = this.page;
  this.page = function(){
    if (this._assumesPageview && !this._initialized) {
      return this.initialize.apply(this, arguments);
    }

    return page.apply(this, arguments);
  };
};

/**
 * Wrap the track method to call other ecommerce methods if
 * available depending on the `track.event()`.
 *
 * @api private
 */

exports._wrapTrack = function(){
  var t = this.track;
  this.track = function(track){
    var event = track.event();
    var called;
    var ret;

    for (var method in events) {
      var regexp = events[method];
      if (!this[method]) continue;
      if (!regexp.test(event)) continue;
      ret = this[method].apply(this, arguments);
      called = true;
      break;
    }

    if (!called) ret = t.apply(this, arguments);
    return ret;
  };
};

function loadImage(attrs, fn) {
  fn = fn || function(){};
  var img = new Image;
  img.onerror = error(fn, 'failed to load pixel', img);
  img.onload = function(){ fn(); };
  img.src = attrs.src;
  img.width = 1;
  img.height = 1;
  return img;
}

function error(fn, message, img){
  return function(e){
    e = e || window.event;
    var err = new Error(message);
    err.event = e;
    err.source = img;
    fn(err);
  };
}

/**
 * Render template + locals into an `attrs` object.
 *
 * @param {Object} template
 * @param {Object} locals
 * @return {Object}
 */

function render(template, locals) {
  var attrs = {};
  each(template.attrs, function(key, val){
    attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function(_, $1){
      return locals[$1];
    });
  });
  return attrs;
}


}, {"load-script":106,"load-iframe":107,"analytics-events":108,"to-no-case":109,"callback":94,"emitter":110,"next-tick":103,"after":111,"each":112,"type":113,"fmt":114}],
106: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var onload = require('script-onload');
var tick = require('next-tick');
var type = require('type');

/**
 * Expose `loadScript`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function loadScript(options, fn){
  if (!options) throw new Error('Cant load nothing...');

  // Allow for the simplest case, just passing a `src` string.
  if ('string' == type(options)) options = { src : options };

  var https = document.location.protocol === 'https:' ||
              document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = https ? 'https:' + options.src : 'http:' + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) options.src = options.https;
  else if (!https && options.http) options.src = options.http;

  // Make the `<script>` element and insert it before the first script on the
  // page, which is guaranteed to exist since this Javascript is running.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = options.src;

  // If we have a fn, attach event handlers, even in IE. Based off of
  // the Third-Party Javascript script loading example:
  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
  if ('function' == type(fn)) {
    onload(script, fn);
  }

  tick(function(){
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });

  // Return the script element in case they want to do anything special, like
  // give it an ID or attributes.
  return script;
};
}, {"script-onload":115,"next-tick":103,"type":7}],
115: [function(require, module, exports) {

// https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

/**
 * Invoke `fn(err)` when the given `el` script loads.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api public
 */

module.exports = function(el, fn){
  return el.addEventListener
    ? add(el, fn)
    : attach(el, fn);
};

/**
 * Add event listener to `el`, `fn()`.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function add(el, fn){
  el.addEventListener('load', function(_, e){ fn(null, e); }, false);
  el.addEventListener('error', function(e){
    var err = new Error('script error "' + el.src + '"');
    err.event = e;
    fn(err);
  }, false);
}

/**
 * Attach evnet.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function attach(el, fn){
  el.attachEvent('onreadystatechange', function(e){
    if (!/complete|loaded/.test(el.readyState)) return;
    fn(null, e);
  });
  el.attachEvent('onerror', function(e){
    var err = new Error('failed to load the script "' + el.src + '"');
    err.event = e || window.event;
    fn(err);
  });
}

}, {}],
107: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var onload = require('script-onload');
var tick = require('next-tick');
var type = require('type');

/**
 * Expose `loadScript`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function loadIframe(options, fn){
  if (!options) throw new Error('Cant load nothing...');

  // Allow for the simplest case, just passing a `src` string.
  if ('string' == type(options)) options = { src : options };

  var https = document.location.protocol === 'https:' ||
              document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = https ? 'https:' + options.src : 'http:' + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) options.src = options.https;
  else if (!https && options.http) options.src = options.http;

  // Make the `<iframe>` element and insert it before the first iframe on the
  // page, which is guaranteed to exist since this Javaiframe is running.
  var iframe = document.createElement('iframe');
  iframe.src = options.src;
  iframe.width = options.width || 1;
  iframe.height = options.height || 1;
  iframe.style.display = 'none';

  // If we have a fn, attach event handlers, even in IE. Based off of
  // the Third-Party Javascript script loading example:
  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
  if ('function' == type(fn)) {
    onload(iframe, fn);
  }

  tick(function(){
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(iframe, firstScript);
  });

  // Return the iframe element in case they want to do anything special, like
  // give it an ID or attributes.
  return iframe;
};
}, {"script-onload":115,"next-tick":103,"type":7}],
108: [function(require, module, exports) {

module.exports = {
  removedProduct: /^[ _]?removed[ _]?product[ _]?$/i,
  viewedProduct: /^[ _]?viewed[ _]?product[ _]?$/i,
  viewedProductCategory: /^[ _]?viewed[ _]?product[ _]?category[ _]?$/i,
  addedProduct: /^[ _]?added[ _]?product[ _]?$/i,
  completedOrder: /^[ _]?completed[ _]?order[ _]?$/i,
  startedOrder: /^[ _]?started[ _]?order[ _]?$/i,
  updatedOrder: /^[ _]?updated[ _]?order[ _]?$/i,
  refundedOrder: /^[ _]?refunded?[ _]?order[ _]?$/i,
  viewedProductDetails: /^[ _]?viewed[ _]?product[ _]?details?[ _]?$/i,
  clickedProduct: /^[ _]?clicked[ _]?product[ _]?$/i,
  viewedPromotion: /^[ _]?viewed[ _]?promotion?[ _]?$/i,
  clickedPromotion: /^[ _]?clicked[ _]?promotion?[ _]?$/i,
  viewedCheckoutStep: /^[ _]?viewed[ _]?checkout[ _]?step[ _]?$/i,
  completedCheckoutStep: /^[ _]?completed[ _]?checkout[ _]?step[ _]?$/i
};

}, {}],
109: [function(require, module, exports) {

/**
 * Expose `toNoCase`.
 */

module.exports = toNoCase;


/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasSeparator = /[\W_]/;


/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase (string) {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string)) return unseparate(string).toLowerCase();
  return uncamelize(string).toLowerCase();
}


/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;


/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate (string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}


/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;


/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize (string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}
}, {}],
110: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = index(callbacks, fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

}, {"indexof":116}],
116: [function(require, module, exports) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
}, {}],
111: [function(require, module, exports) {

module.exports = function after (times, func) {
  // After 0, really?
  if (times <= 0) return func();

  // That's more like it.
  return function() {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
};
}, {}],
112: [function(require, module, exports) {

/**
 * Module dependencies.
 */

try {
  var type = require('type');
} catch (err) {
  var type = require('component-type');
}

var toFunction = require('to-function');

/**
 * HOP reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Iterate the given `obj` and invoke `fn(val, i)`
 * in optional context `ctx`.
 *
 * @param {String|Array|Object} obj
 * @param {Function} fn
 * @param {Object} [ctx]
 * @api public
 */

module.exports = function(obj, fn, ctx){
  fn = toFunction(fn);
  ctx = ctx || this;
  switch (type(obj)) {
    case 'array':
      return array(obj, fn, ctx);
    case 'object':
      if ('number' == typeof obj.length) return array(obj, fn, ctx);
      return object(obj, fn, ctx);
    case 'string':
      return string(obj, fn, ctx);
  }
};

/**
 * Iterate string chars.
 *
 * @param {String} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function string(obj, fn, ctx) {
  for (var i = 0; i < obj.length; ++i) {
    fn.call(ctx, obj.charAt(i), i);
  }
}

/**
 * Iterate object keys.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function object(obj, fn, ctx) {
  for (var key in obj) {
    if (has.call(obj, key)) {
      fn.call(ctx, key, obj[key]);
    }
  }
}

/**
 * Iterate array-ish.
 *
 * @param {Array|Object} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function array(obj, fn, ctx) {
  for (var i = 0; i < obj.length; ++i) {
    fn.call(ctx, obj[i], i);
  }
}

}, {"type":113,"component-type":113,"to-function":117}],
113: [function(require, module, exports) {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object String]': return 'string';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val && val.nodeType === 1) return 'element';
  if (val === Object(val)) return 'object';

  return typeof val;
};

}, {}],
117: [function(require, module, exports) {

/**
 * Module Dependencies
 */

var expr;
try {
  expr = require('props');
} catch(e) {
  expr = require('component-props');
}

/**
 * Expose `toFunction()`.
 */

module.exports = toFunction;

/**
 * Convert `obj` to a `Function`.
 *
 * @param {Mixed} obj
 * @return {Function}
 * @api private
 */

function toFunction(obj) {
  switch ({}.toString.call(obj)) {
    case '[object Object]':
      return objectToFunction(obj);
    case '[object Function]':
      return obj;
    case '[object String]':
      return stringToFunction(obj);
    case '[object RegExp]':
      return regexpToFunction(obj);
    default:
      return defaultToFunction(obj);
  }
}

/**
 * Default to strict equality.
 *
 * @param {Mixed} val
 * @return {Function}
 * @api private
 */

function defaultToFunction(val) {
  return function(obj){
    return val === obj;
  };
}

/**
 * Convert `re` to a function.
 *
 * @param {RegExp} re
 * @return {Function}
 * @api private
 */

function regexpToFunction(re) {
  return function(obj){
    return re.test(obj);
  };
}

/**
 * Convert property `str` to a function.
 *
 * @param {String} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  // immediate such as "> 20"
  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);

  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
  return new Function('_', 'return ' + get(str));
}

/**
 * Convert `object` to a function.
 *
 * @param {Object} object
 * @return {Function}
 * @api private
 */

function objectToFunction(obj) {
  var match = {};
  for (var key in obj) {
    match[key] = typeof obj[key] === 'string'
      ? defaultToFunction(obj[key])
      : toFunction(obj[key]);
  }
  return function(val){
    if (typeof val !== 'object') return false;
    for (var key in match) {
      if (!(key in val)) return false;
      if (!match[key](val[key])) return false;
    }
    return true;
  };
}

/**
 * Built the getter function. Supports getter style functions
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function get(str) {
  var props = expr(str);
  if (!props.length) return '_.' + str;

  var val, i, prop;
  for (i = 0; i < props.length; i++) {
    prop = props[i];
    val = '_.' + prop;
    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";

    // mimic negative lookbehind to avoid problems with nested properties
    str = stripNested(prop, str, val);
  }

  return str;
}

/**
 * Mimic negative lookbehind to avoid problems with nested properties.
 *
 * See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
 *
 * @param {String} prop
 * @param {String} str
 * @param {String} val
 * @return {String}
 * @api private
 */

function stripNested (prop, str, val) {
  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function($0, $1) {
    return $1 ? $0 : val;
  });
}

}, {"props":118,"component-props":118}],
118: [function(require, module, exports) {
/**
 * Global Names
 */

var globals = /\b(this|Array|Date|Object|Math|JSON)\b/g;

/**
 * Return immediate identifiers parsed from `str`.
 *
 * @param {String} str
 * @param {String|Function} map function or prefix
 * @return {Array}
 * @api public
 */

module.exports = function(str, fn){
  var p = unique(props(str));
  if (fn && 'string' == typeof fn) fn = prefixed(fn);
  if (fn) return map(str, p, fn);
  return p;
};

/**
 * Return immediate identifiers in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function props(str) {
  return str
    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .replace(globals, '')
    .match(/[$a-zA-Z_]\w*/g)
    || [];
}

/**
 * Return `str` with `props` mapped with `fn`.
 *
 * @param {String} str
 * @param {Array} props
 * @param {Function} fn
 * @return {String}
 * @api private
 */

function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
  return str.replace(re, function(_){
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~props.indexOf(_)) return _;
    return fn(_);
  });
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

/**
 * Map with prefix `str`.
 */

function prefixed(str) {
  return function(_){
    return str + _;
  };
}

}, {}],
114: [function(require, module, exports) {

/**
 * toString.
 */

var toString = window.JSON
  ? JSON.stringify
  : function(_){ return String(_); };

/**
 * Export `fmt`
 */

module.exports = fmt;

/**
 * Formatters
 */

fmt.o = toString;
fmt.s = String;
fmt.d = parseInt;

/**
 * Format the given `str`.
 *
 * @param {String} str
 * @param {...} args
 * @return {String}
 * @api public
 */

function fmt(str){
  var args = [].slice.call(arguments, 1);
  var j = 0;

  return str.replace(/%([a-z])/gi, function(_, f){
    return fmt[f]
      ? fmt[f](args[j++])
      : _ + f;
  });
}

}, {}],
99: [function(require, module, exports) {

/**
 * Generate a slug from the given `str`.
 *
 * example:
 *
 *        generate('foo bar');
 *        // > foo-bar
 *
 * @param {String} str
 * @param {Object} options
 * @config {String|RegExp} [replace] characters to replace, defaulted to `/[^a-z0-9]/g`
 * @config {String} [separator] separator to insert, defaulted to `-`
 * @return {String}
 */

module.exports = function (str, options) {
  options || (options = {});
  return str.toLowerCase()
    .replace(options.replace || /[^a-z0-9]/g, ' ')
    .replace(/^ +| +$/g, '')
    .replace(/ +/g, options.separator || '-')
};

}, {}],
100: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var after = require('after');
var domify = require('domify');
var each = require('each');
var Emitter = require('emitter');

/**
 * Mixin emitter.
 */

Emitter(exports);

/**
 * Add a new option to the integration by `key` with default `value`.
 *
 * @param {String} key
 * @param {Mixed} value
 * @return {Integration}
 */

exports.option = function(key, value){
  this.prototype.defaults[key] = value;
  return this;
};

/**
 * Add a new mapping option.
 *
 * This will create a method `name` that will return a mapping
 * for you to use.
 *
 * Example:
 *
 *    Integration('My Integration')
 *      .mapping('events');
 *
 *    new MyIntegration().track('My Event');
 *
 *    .track = function(track){
 *      var events = this.events(track.event());
 *      each(events, send);
 *     };
 *
 * @param {String} name
 * @return {Integration}
 */

exports.mapping = function(name){
  this.option(name, []);
  this.prototype[name] = function(str){
    return this.map(this.options[name], str);
  };
  return this;
};

/**
 * Register a new global variable `key` owned by the integration, which will be
 * used to test whether the integration is already on the page.
 *
 * @param {String} global
 * @return {Integration}
 */

exports.global = function(key){
  this.prototype.globals.push(key);
  return this;
};

/**
 * Mark the integration as assuming an initial pageview, so to defer loading
 * the script until the first `page` call, noop the first `initialize`.
 *
 * @return {Integration}
 */

exports.assumesPageview = function(){
  this.prototype._assumesPageview = true;
  return this;
};

/**
 * Mark the integration as being "ready" once `load` is called.
 *
 * @return {Integration}
 */

exports.readyOnLoad = function(){
  this.prototype._readyOnLoad = true;
  return this;
};

/**
 * Mark the integration as being "ready" once `initialize` is called.
 *
 * @return {Integration}
 */

exports.readyOnInitialize = function(){
  this.prototype._readyOnInitialize = true;
  return this;
};

/**
 * Define a tag to be loaded.
 *
 * @param {String} str DOM tag as string or URL
 * @return {Integration}
 */

exports.tag = function(name, str){
  if (null == str) {
    str = name;
    name = 'library';
  }
  this.prototype.templates[name] = objectify(str);
  return this;
};

/**
 * Given a string, give back DOM attributes.
 *
 * Do it in a way where the browser doesn't load images or iframes.
 * It turns out, domify will load images/iframes, because
 * whenever you construct those DOM elements,
 * the browser immediately loads them.
 *
 * @param {String} str
 * @return {Object}
 */

function objectify(str) {
  // replace `src` with `data-src` to prevent image loading
  str = str.replace(' src="', ' data-src="');

  var el = domify(str);
  var attrs = {};

  each(el.attributes, function(attr){
    // then replace it back
    var name = 'data-src' == attr.name ? 'src' : attr.name;
    if (!~str.indexOf(attr.name + '=')) return;
    attrs[name] = attr.value;
  });

  return {
    type: el.tagName.toLowerCase(),
    attrs: attrs
  };
}

}, {"after":111,"domify":119,"each":112,"emitter":110}],
119: [function(require, module, exports) {

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var div = document.createElement('div');
// Setup
div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
// Make sure that link elements get serialized correctly by innerHTML
// This requires a wrapper element in IE
var innerHTMLBug = !div.getElementsByTagName('link').length;
div = undefined;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

}, {}],
89: [function(require, module, exports) {
var toSpace = require('to-space-case');


/**
 * Expose `toSnakeCase`.
 */

module.exports = toSnakeCase;


/**
 * Convert a `string` to snake case.
 *
 * @param {String} string
 * @return {String}
 */


function toSnakeCase (string) {
  return toSpace(string).replace(/\s/g, '_');
}

}, {"to-space-case":120}],
120: [function(require, module, exports) {

var clean = require('to-no-case');


/**
 * Expose `toSpaceCase`.
 */

module.exports = toSpaceCase;


/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */


function toSpaceCase (string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : '';
  });
}
}, {"to-no-case":121}],
121: [function(require, module, exports) {

/**
 * Expose `toNoCase`.
 */

module.exports = toNoCase;


/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasCamel = /[a-z][A-Z]/;
var hasSeparator = /[\W_]/;


/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase (string) {
  if (hasSpace.test(string)) return string.toLowerCase();

  if (hasSeparator.test(string)) string = unseparate(string);
  if (hasCamel.test(string)) string = uncamelize(string);
  return string.toLowerCase();
}


/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;


/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate (string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}


/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;


/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize (string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}
}, {}],
90: [function(require, module, exports) {

/**
 * Protocol.
 */

module.exports = function (url) {
  switch (arguments.length) {
    case 0: return check();
    case 1: return transform(url);
  }
};


/**
 * Transform a protocol-relative `url` to the use the proper protocol.
 *
 * @param {String} url
 * @return {String}
 */

function transform (url) {
  return check() ? 'https:' + url : 'http:' + url;
}


/**
 * Check whether `https:` be used for loading scripts.
 *
 * @return {Boolean}
 */

function check () {
  return (
    location.protocol == 'https:' ||
    location.protocol == 'chrome-extension:'
  );
}
}, {}],
91: [function(require, module, exports) {

var isEmpty = require('is-empty');

try {
  var typeOf = require('type');
} catch (e) {
  var typeOf = require('component-type');
}


/**
 * Types.
 */

var types = [
  'arguments',
  'array',
  'boolean',
  'date',
  'element',
  'function',
  'null',
  'number',
  'object',
  'regexp',
  'string',
  'undefined'
];


/**
 * Expose type checkers.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */

for (var i = 0, type; type = types[i]; i++) exports[type] = generate(type);


/**
 * Add alias for `function` for old browsers.
 */

exports.fn = exports['function'];


/**
 * Expose `empty` check.
 */

exports.empty = isEmpty;


/**
 * Expose `nan` check.
 */

exports.nan = function (val) {
  return exports.number(val) && val != val;
};


/**
 * Generate a type checker.
 *
 * @param {String} type
 * @return {Function}
 */

function generate (type) {
  return function (value) {
    return type === typeOf(value);
  };
}
}, {"is-empty":122,"type":7,"component-type":7}],
122: [function(require, module, exports) {

/**
 * Expose `isEmpty`.
 */

module.exports = isEmpty;


/**
 * Has.
 */

var has = Object.prototype.hasOwnProperty;


/**
 * Test whether a value is "empty".
 *
 * @param {Mixed} val
 * @return {Boolean}
 */

function isEmpty (val) {
  if (null == val) return true;
  if ('number' == typeof val) return 0 === val;
  if (undefined !== val.length) return 0 === val.length;
  for (var key in val) if (has.call(val, key)) return false;
  return true;
}
}, {}],
92: [function(require, module, exports) {

var identity = function(_){ return _; };


/**
 * Module exports, export
 */

module.exports = multiple(find);
module.exports.find = module.exports;


/**
 * Export the replacement function, return the modified object
 */

module.exports.replace = function (obj, key, val, options) {
  multiple(replace).call(this, obj, key, val, options);
  return obj;
};


/**
 * Export the delete function, return the modified object
 */

module.exports.del = function (obj, key, options) {
  multiple(del).call(this, obj, key, null, options);
  return obj;
};


/**
 * Compose applying the function to a nested key
 */

function multiple (fn) {
  return function (obj, path, val, options) {
    var normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
    path = normalize(path);

    var key;
    var finished = false;

    while (!finished) loop();

    function loop() {
      for (key in obj) {
        var normalizedKey = normalize(key);
        if (0 === path.indexOf(normalizedKey)) {
          var temp = path.substr(normalizedKey.length);
          if (temp.charAt(0) === '.' || temp.length === 0) {
            path = temp.substr(1);
            var child = obj[key];

            // we're at the end and there is nothing.
            if (null == child) {
              finished = true;
              return;
            }

            // we're at the end and there is something.
            if (!path.length) {
              finished = true;
              return;
            }

            // step into child
            obj = child;

            // but we're done here
            return;
          }
        }
      }

      key = undefined;
      // if we found no matching properties
      // on the current object, there's no match.
      finished = true;
    }

    if (!key) return;
    if (null == obj) return obj;

    // the `obj` and `key` is one above the leaf object and key, so
    // start object: { a: { 'b.c': 10 } }
    // end object: { 'b.c': 10 }
    // end key: 'b.c'
    // this way, you can do `obj[key]` and get `10`.
    return fn(obj, key, val);
  };
}


/**
 * Find an object by its key
 *
 * find({ first_name : 'Calvin' }, 'firstName')
 */

function find (obj, key) {
  if (obj.hasOwnProperty(key)) return obj[key];
}


/**
 * Delete a value for a given key
 *
 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
 */

function del (obj, key) {
  if (obj.hasOwnProperty(key)) delete obj[key];
  return obj;
}


/**
 * Replace an objects existing value with a new one
 *
 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
 */

function replace (obj, key, val) {
  if (obj.hasOwnProperty(key)) obj[key] = val;
  return obj;
}

/**
 * Normalize a `dot.separated.path`.
 *
 * A.HELL(!*&#(!)O_WOR   LD.bar => ahelloworldbar
 *
 * @param {String} path
 * @return {String}
 */

function defaultNormalize(path) {
  return path.replace(/[^a-zA-Z0-9\.]+/g, '').toLowerCase();
}

/**
 * Check if a value is a function.
 *
 * @param {*} val
 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
 */

function isFunction(val) {
  return typeof val === 'function';
}

}, {}],
9: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var domify = require('domify');
var each = require('each');

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `AdWords`.
 */

var AdWords = module.exports = integration('AdWords')
  .option('conversionId', '')
  .option('remarketing', false)
  .tag('<script src="//www.googleadservices.com/pagead/conversion_async.js">')
  .mapping('events');

/**
 * Load.
 *
 * @param {Function} fn
 * @api public
 */

AdWords.prototype.initialize = function(){
  this.load(this.ready);
};

/**
 * Loaded.
 *
 * @return {Boolean}
 * @api public
 */

AdWords.prototype.loaded = function(){
  return !! document.body;
};

/**
 * Page.
 *
 * https://support.google.com/adwords/answer/3111920#standard_parameters
 * https://support.google.com/adwords/answer/3103357
 * https://developers.google.com/adwords-remarketing-tag/asynchronous/
 * https://developers.google.com/adwords-remarketing-tag/parameters
 *
 * @param {Page} page
 */

AdWords.prototype.page = function(page){
  var remarketing = !!this.options.remarketing;
  var id = this.options.conversionId;
  var props = {};
  window.google_trackConversion({
    google_conversion_id: id,
    google_custom_params: props,
    google_remarketing_only: remarketing
  });
};

/**
 * Track.
 *
 * @param {Track}
 * @api public
 */

AdWords.prototype.track = function(track){
  var id = this.options.conversionId;
  var events = this.events(track.event());
  var revenue = track.revenue() || 0;
  each(events, function(label){
    var props = track.properties();
    delete props.revenue
    window.google_trackConversion({
      google_conversion_id: id,
      google_custom_params: props,
      google_conversion_language: 'en',
      google_conversion_format: '3',
      google_conversion_color: 'ffffff',
      google_conversion_label: label,
      google_conversion_value: revenue,
      google_remarketing_only: false
    });
  });
};

}, {"analytics.js-integration":88,"domify":119,"each":4}],
10: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose Alexa integration.
 */

var Alexa = module.exports = integration('Alexa')
  .assumesPageview()
  .global('_atrk_opts')
  .option('account', null)
  .option('domain', '')
  .option('dynamic', true)
  .tag('<script src="//d31qbv1cthcecs.cloudfront.net/atrk.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Alexa.prototype.initialize = function(page){
  var self = this;
  window._atrk_opts = {
    atrk_acct: this.options.account,
    domain: this.options.domain,
    dynamic: this.options.dynamic
  };
  this.load(function(){
    window.atrk();
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Alexa.prototype.loaded = function(){
  return !! window.atrk;
};

}, {"analytics.js-integration":88}],
11: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var utm = require('utm-params');
var top = require('top-domain');

/**
 * UMD ?
 */

var umd = 'function' == typeof define && define.amd;

/**
 * Source.
 */

var src = '//d24n15hnbwhuhn.cloudfront.net/libs/amplitude-2.1.0-min.js';

/**
 * Expose `Amplitude` integration.
 */

var Amplitude = module.exports = integration('Amplitude')
  .global('amplitude')
  .option('apiKey', '')
  .option('trackAllPages', false)
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .option('trackUtmProperties', true)
  .tag('<script src="' + src + '">');

/**
 * Initialize.
 *
 * https://github.com/amplitude/Amplitude-Javascript
 *
 * @param {Object} page
 */

Amplitude.prototype.initialize = function(page){
  // jscs:disable
  (function(e,t){var r=e.amplitude||{};r._q=[];function a(e){r[e]=function(){r._q.push([e].concat(Array.prototype.slice.call(arguments,0)))}}var i=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties"];for(var o=0;o<i.length;o++){a(i[o])}e.amplitude=r})(window,document);
  // jscs:enable

  this.setDomain(window.location.href);
  window.amplitude.init(this.options.apiKey, null, {
    includeUtm: this.options.trackUtmProperties
  });

  var self = this;
  if (umd) {
    window.require([src], function(amplitude){
      window.amplitude = amplitude;
      self.ready();
    });
    return;
  }

  this.load(function(){
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Amplitude.prototype.loaded = function(){
  return !! (window.amplitude && window.amplitude.options);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Amplitude.prototype.page = function(page){
  var properties = page.properties();
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  // all pages
  if (opts.trackAllPages) {
    this.track(page.track());
  }

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }
};

/**
 * Identify.
 *
 * @param {Facade} identify
 */

Amplitude.prototype.identify = function(identify){
  var id = identify.userId();
  var traits = identify.traits();
  if (id) window.amplitude.setUserId(id);
  if (traits) window.amplitude.setUserProperties(traits);
};

/**
 * Track.
 *
 * @param {Track} event
 */

Amplitude.prototype.track = function(track){
  var props = track.properties();
  var event = track.event();
  var revenue = track.revenue();

  // track the event
  window.amplitude.logEvent(event, props);

  // also track revenue
  if (revenue) {
    window.amplitude.logRevenue(revenue, props.quantity, props.productId);
  }
};

/**
 * Set domain name to root domain
 *
 * @param {String} href
 */

Amplitude.prototype.setDomain = function(href){
  var domain = top(href);
  window.amplitude.setDomain(domain);
};

/**
 * Override device ID
 *
 * @param {String} deviceId
 */

Amplitude.prototype.setDeviceId = function(deviceId){
  if (deviceId) window.amplitude.setDeviceId(deviceId);
};

}, {"analytics.js-integration":88,"utm-params":123,"top-domain":124}],
123: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var parse = require('querystring').parse;

/**
 * Expose `utm`
 */

module.exports = utm;

/**
 * Get all utm params from the given `querystring`
 *
 * @param {String} query
 * @return {Object}
 * @api private
 */

function utm(query){
  if ('?' == query.charAt(0)) query = query.substring(1);
  var query = query.replace(/\?/g, '&');
  var params = parse(query);
  var param;
  var ret = {};

  for (var key in params) {
    if (~key.indexOf('utm_')) {
      param = key.substr(4);
      if ('campaign' == param) param = 'name';
      ret[param] = params[key];
    }
  }

  return ret;
}

}, {"querystring":125}],
125: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var encode = encodeURIComponent;
var decode = decodeURIComponent;
var trim = require('trim');
var type = require('type');

var pattern = /(\w+)\[(\d+)\]/

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = pattern.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};

}, {"trim":126,"type":7}],
126: [function(require, module, exports) {

exports = module.exports = trim;

function trim(str){
  if (str.trim) return str.trim();
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  if (str.trimLeft) return str.trimLeft();
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  if (str.trimRight) return str.trimRight();
  return str.replace(/\s*$/, '');
};

}, {}],
124: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var parse = require('url').parse;

/**
 * Expose `domain`
 */

module.exports = domain;

/**
 * RegExp
 */

var regexp = /[a-z0-9][a-z0-9\-]*[a-z0-9]\.[a-z\.]{2,6}$/i;

/**
 * Get the top domain.
 * 
 * Official Grammar: http://tools.ietf.org/html/rfc883#page-56
 * Look for tlds with up to 2-6 characters.
 * 
 * Example:
 * 
 *      domain('http://localhost:3000/baz');
 *      // => ''
 *      domain('http://dev:3000/baz');
 *      // => ''
 *      domain('http://127.0.0.1:3000/baz');
 *      // => ''
 *      domain('http://segment.io/baz');
 *      // => 'segment.io'
 * 
 * @param {String} url
 * @return {String}
 * @api public
 */

function domain(url){
  var host = parse(url).hostname;
  var match = host.match(regexp);
  return match ? match[0] : '';
};

}, {"url":127}],
127: [function(require, module, exports) {

/**
 * Parse the given `url`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(url){
  var a = document.createElement('a');
  a.href = url;
  return {
    href: a.href,
    host: a.host || location.host,
    port: ('0' === a.port || '' === a.port) ? port(a.protocol) : a.port,
    hash: a.hash,
    hostname: a.hostname || location.hostname,
    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
    search: a.search,
    query: a.search.slice(1)
  };
};

/**
 * Check if `url` is absolute.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isAbsolute = function(url){
  return 0 == url.indexOf('//') || !!~url.indexOf('://');
};

/**
 * Check if `url` is relative.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isRelative = function(url){
  return !exports.isAbsolute(url);
};

/**
 * Check if `url` is cross domain.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isCrossDomain = function(url){
  url = exports.parse(url);
  var location = exports.parse(window.location.href);
  return url.hostname !== location.hostname
    || url.port !== location.port
    || url.protocol !== location.protocol;
};

/**
 * Return default port for `protocol`.
 *
 * @param  {String} protocol
 * @return {String}
 * @api private
 */
function port (protocol){
  switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
  }
}

}, {}],
12: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var load = require('load-script');
var is = require('is');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Appcues);
};

/**
 * Expose `Appcues` integration.
 */

var Appcues = exports.Integration = integration('Appcues')
  .assumesPageview()
  .global('Appcues')
  .global('AppcuesIdentity')
  .option('appcuesId', '')
  .option('userId', '')
  .option('userEmail', '');

/**
 * Initialize.
 *
 * http://appcues.com/docs/
 *
 * @param {Object}
 */

Appcues.prototype.initialize = function(){
  this.load(function(){
    window.Appcues.init();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Appcues.prototype.loaded = function(){
  return is.object(window.Appcues);
};

/**
 * Load the Appcues library.
 *
 * @param {Function} callback
 */

Appcues.prototype.load = function(callback){
  var script = load('//d2dubfq97s02eu.cloudfront.net/appcues-bundle.min.js', callback);
  script.setAttribute('data-appcues-id', this.options.appcuesId);
  script.setAttribute('data-user-id', this.options.userId);
  script.setAttribute('data-user-email', this.options.userEmail);
};

/**
 * Identify.
 *
 * http://appcues.com/docs#identify
 *
 * @param {Identify} identify
 */

Appcues.prototype.identify = function(identify){
  window.Appcues.identify(identify.traits());
};

}, {"analytics.js-integration":88,"load-script":128,"is":91}],
128: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var onload = require('script-onload');
var tick = require('next-tick');
var type = require('type');

/**
 * Expose `loadScript`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function loadScript(options, fn){
  if (!options) throw new Error('Cant load nothing...');

  // Allow for the simplest case, just passing a `src` string.
  if ('string' == type(options)) options = { src : options };

  var https = document.location.protocol === 'https:' ||
              document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = https ? 'https:' + options.src : 'http:' + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) options.src = options.https;
  else if (!https && options.http) options.src = options.http;

  // Make the `<script>` element and insert it before the first script on the
  // page, which is guaranteed to exist since this Javascript is running.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = options.src;

  // If we have a fn, attach event handlers, even in IE. Based off of
  // the Third-Party Javascript script loading example:
  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
  if ('function' == type(fn)) {
    onload(script, fn);
  }

  tick(function(){
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });

  // Return the script element in case they want to do anything special, like
  // give it an ID or attributes.
  return script;
};
}, {"script-onload":115,"next-tick":103,"type":7}],
13: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `Atatus` integration.
 */

var Atatus = module.exports = integration('Atatus')
  .global('atatus')
  .option('apiKey', '')
  .tag('<script src="//www.atatus.com/atatus.js">');

/**
 * Initialize.
 *
 * https://www.atatus.com/docs.html
 *
 * @param {Object} page
 */

Atatus.prototype.initialize = function(page){
  var self = this;

  this.load(function(){
    // Configure Atatus and install default handler to capture uncaught exceptions
    window.atatus.config(self.options.apiKey).install();
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Atatus.prototype.loaded = function(){
  return is.object(window.atatus);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Atatus.prototype.identify = function(identify){
  window.atatus.setCustomData({ person: identify.traits() });
};

}, {"analytics.js-integration":88,"is":91}],
14: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `Autosend` integration.
 */

var Autosend = module.exports = integration('Autosend')
  .global('_autosend')
  .option('appKey', '')
  .tag('<script id="asnd-tracker" src="https://d2zjxodm1cz8d6.cloudfront.net/js/v1/autosend.js" data-auth-key="{{ appKey }}">');

/**
 * Initialize.
 *
 * http://autosend.io/faq/install-autosend-using-javascript/
 *
 * @param {Object} page
 */

Autosend.prototype.initialize = function(page){

  window._autosend = window._autosend || [];
  (function(){var a,b,c;a=function(f){return function(){window._autosend.push([f].concat(Array.prototype.slice.call(arguments,0))); }; }; b=["identify", "track", "cb"];for (c=0;c<b.length;c++){window._autosend[b[c]]=a(b[c]); } })();
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Autosend.prototype.loaded = function(){
  return !! (window._autosend);
};

/**
 * Identify.
 *
 * http://autosend.io/faq/install-autosend-using-javascript/
 *
 * @param {Identify} identify
 */

Autosend.prototype.identify = function(identify){
  var id = identify.userId();
  if (!id) return;

  var traits = identify.traits();
  traits.id = id;
  window._autosend.identify(traits);
};

/**
 * Track.
 *
 * http://autosend.io/faq/install-autosend-using-javascript/
 *
 * @param {Track} track
 */

Autosend.prototype.track = function(track){
  window._autosend.track(track.event());
};

}, {"analytics.js-integration":88}],
15: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var each = require('each');

/**
 * Expose `Awesm` integration.
 */

var Awesm = module.exports = integration('awe.sm')
  .assumesPageview()
  .global('AWESM')
  .option('apiKey', '')
  .tag('<script src="//widgets.awe.sm/v3/widgets.js?key={{ apiKey }}&async=true">')
  .mapping('events');

/**
 * Initialize.
 *
 * http://developers.awe.sm/guides/javascript/
 *
 * @param {Object} page
 */

Awesm.prototype.initialize = function(page){
  window.AWESM = { api_key: this.options.apiKey };
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Awesm.prototype.loaded = function(){
  return !! (window.AWESM && window.AWESM._exists);
};

/**
 * Track.
 *
 * @param {Track} track
 */

Awesm.prototype.track = function(track){
  var user = this.analytics.user();
  var goals = this.events(track.event());
  each(goals, function(goal){
    window.AWESM.convert(goal, track.cents(), null, user.id());
  });
};

}, {"analytics.js-integration":88,"each":4}],
16: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var onbody = require('on-body');
var domify = require('domify');
var extend = require('extend');
var bind = require('bind');
var when = require('when');
var each = require('each');

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Noop.
 */

var noop = function(){};

/**
 * Expose `Bing`.
 *
 * https://bingads.microsoft.com/campaign/signup
 */

var Bing = module.exports = integration('Bing Ads')
  .global('uetq')
  .option('tagId', '')
  .tag('<script src="//bat.bing.com/bat.js">');

/**
 * Initialize
 *
 * inferred from their snippet
 * https://gist.github.com/sperand-io/8bef4207e9c66e1aa83b
 */

Bing.prototype.initialize = function(){
  window.uetq = window.uetq || [];
  var self = this;

  self.load(function(){
    var setup = {
      ti: self.options.tagId,
      q: window.uetq
    };

    window.uetq = new UET(setup);
    self.ready();
  });
};

/**
 * Loaded?
 *
 * Check for custom `push` method bestowed by UET constructor
 *
 * @return {Boolean}
 */

Bing.prototype.loaded = function(){
  return !! (window.uetq && window.uetq.push !== Array.prototype.push);
};

/**
 * Page
 */

Bing.prototype.page = function(){
  window.uetq.push("pageLoad");
};

/**
 * Track
 *
 * Send all events then set goals based
 * on them retroactively: http://advertise.bingads.microsoft.com/en-us/uahelp-topic?market=en&project=Bing_Ads&querytype=topic&query=HLP_BA_PROC_UET.htm
 *
 * @param {Track} track
 */

Bing.prototype.track = function(track){
  var event = {
    ea: 'track',
    el: track.event()
  };

  if (track.category()) event.ec = track.category();
  if (track.revenue()) event.ev = track.revenue();

  window.uetq.push(event);
};

}, {"analytics.js-integration":88,"on-body":129,"domify":119,"extend":130,"bind":101,"when":131,"each":4}],
129: [function(require, module, exports) {
var each = require('each');


/**
 * Cache whether `<body>` exists.
 */

var body = false;


/**
 * Callbacks to call when the body exists.
 */

var callbacks = [];


/**
 * Export a way to add handlers to be invoked once the body exists.
 *
 * @param {Function} callback  A function to call when the body exists.
 */

module.exports = function onBody (callback) {
  if (body) {
    call(callback);
  } else {
    callbacks.push(callback);
  }
};


/**
 * Set an interval to check for `document.body`.
 */

var interval = setInterval(function () {
  if (!document.body) return;
  body = true;
  each(callbacks, call);
  clearInterval(interval);
}, 5);


/**
 * Call a callback, passing it the body.
 *
 * @param {Function} callback  The callback to call.
 */

function call (callback) {
  callback(document.body);
}
}, {"each":112}],
130: [function(require, module, exports) {

module.exports = function extend (object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1);

    // For each extender, copy their properties on our object.
    for (var i = 0, source; source = args[i]; i++) {
        if (!source) continue;
        for (var property in source) {
            object[property] = source[property];
        }
    }

    return object;
};
}, {}],
131: [function(require, module, exports) {

var callback = require('callback');


/**
 * Expose `when`.
 */

module.exports = when;


/**
 * Loop on a short interval until `condition()` is true, then call `fn`.
 *
 * @param {Function} condition
 * @param {Function} fn
 * @param {Number} interval (optional)
 */

function when (condition, fn, interval) {
  if (condition()) return callback.async(fn);

  var ref = setInterval(function () {
    if (!condition()) return;
    callback(fn);
    clearInterval(ref);
  }, interval || 10);
}
}, {"callback":94}],
17: [function(require, module, exports) {
/**
 * Module dependencies.
 */
var integration = require('analytics.js-integration');

/**
 * Expose `Blueshift` integration.
 */

var Blueshift = module.exports = integration('Blueshift')
  .global('blueshift')
  .global('_blueshiftid')
  .option('apiKey', '')
  .option('retarget', false)
  .tag('<script src="https://cdn.getblueshift.com/blueshift.js">');

/**
 * Initialize.
 *
 * Documentation: http://getblueshift.com/documentation
 *
 * @param {Object} page
 */

Blueshift.prototype.initialize = function(page){
  window.blueshift=window.blueshift||[];
  // jscs:disable
  window.blueshift.load=function(a){window._blueshiftid=a;var d=function(a){return function(){blueshift.push([a].concat(Array.prototype.slice.call(arguments,0)))}},e=["identify","track","click", "pageload", "capture", "retarget"];for(var f=0;f<e.length;f++)blueshift[e[f]]=d(e[f])};
  // jscs:enable
  window.blueshift.load(this.options.apiKey);

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Blueshift.prototype.loaded = function(){
  return !! (window.blueshift && window._blueshiftid);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Blueshift.prototype.page = function(page){
  if (this.options.retarget) window.blueshift.retarget();
  var properties = page.properties();
  properties._bsft_source = 'segment.com';
  window.blueshift.pageload(properties);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Blueshift.prototype.identify = function(identify){
  if (!identify.userId()) return this.debug('user id required');
  var traits = identify.traits({ created: 'created_at' });
  traits._bsft_source = 'segment.com';
  window.blueshift.identify(traits);
};

/**
 * Group.
 *
 * @param {Group} group
 */

Blueshift.prototype.group = function(group){
  var traits = group.traits({ created: 'created_at' });
  traits._bsft_source = 'segment.com';
  window.blueshift.track('group', traits);
};

/**
 * Track.
 *
 * @param {Track} track
 */

Blueshift.prototype.track = function(track){
  var properties = track.properties();
  properties._bsft_source = 'segment.com';
  window.blueshift.track(track.event(), properties);
};

}, {"analytics.js-integration":88}],
18: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var Identify = require('facade').Identify;
var Track = require('facade').Track;
var pixel = require('load-pixel')('http://app.bronto.com/public/');
var qs = require('querystring');
var each = require('each');

/**
 * Expose `Bronto` integration.
 */

var Bronto = module.exports = integration('Bronto')
  .global('__bta')
  .option('siteId', '')
  .option('host', '')
  .tag('<script src="//p.bm23.com/bta.js">');

/**
 * Initialize.
 *
 * http://app.bronto.com/mail/help/help_view/?k=mail:home:api_tracking:tracking_data_store_js#addingjavascriptconversiontrackingtoyoursite
 * http://bronto.com/product-blog/features/using-conversion-tracking-private-domain#.Ut_Vk2T8KqB
 * http://bronto.com/product-blog/features/javascript-conversion-tracking-setup-and-reporting#.Ut_VhmT8KqB
 *
 * @param {Object} page
 */

Bronto.prototype.initialize = function(page){
  var self = this;
  var params = qs.parse(window.location.search);
  if (!params._bta_tid && !params._bta_c) {
    this.debug('missing tracking URL parameters `_bta_tid` and `_bta_c`.');
  }
  this.load(function(){
    var opts = self.options;
    self.bta = new window.__bta(opts.siteId);
    if (opts.host) self.bta.setHost(opts.host);
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Bronto.prototype.loaded = function(){
  return this.bta;
};

/**
 * Completed order.
 *
 * The cookie is used to link the order being processed back to the delivery,
 * message, and contact which makes it a conversion.
 * Passing in just the email ensures that the order itself
 * gets linked to the contact record in Bronto even if the user
 * does not have a tracking cookie.
 *
 * @param {Track} track
 * @api private
 */

Bronto.prototype.completedOrder = function(track){
  var user = this.analytics.user();
  var products = track.products();
  var props = track.properties();
  var items = [];
  var identify = new Identify({
    userId: user.id(),
    traits: user.traits()
  });
  var email = identify.email();

  // items
  each(products, function(product){
    var track = new Track({ properties: product });
    items.push({
      item_id: track.id() || track.sku(),
      desc: product.description || track.name(),
      quantity: track.quantity(),
      amount: track.price(),
    });
  });

  // add conversion
  this.bta.addOrder({
    order_id: track.orderId(),
    email: email,
    // they recommend not putting in a date
    // because it needs to be formatted correctly
    // YYYY-MM-DDTHH:MM:SS
    items: items
  });
};

}, {"analytics.js-integration":88,"facade":132,"load-pixel":133,"querystring":134,"each":4}],
132: [function(require, module, exports) {

var Facade = require('./facade');

/**
 * Expose `Facade` facade.
 */

module.exports = Facade;

/**
 * Expose specific-method facades.
 */

Facade.Alias = require('./alias');
Facade.Group = require('./group');
Facade.Identify = require('./identify');
Facade.Track = require('./track');
Facade.Page = require('./page');
Facade.Screen = require('./screen');

}, {"./facade":135,"./alias":136,"./group":137,"./identify":138,"./track":139,"./page":140,"./screen":141}],
135: [function(require, module, exports) {

var traverse = require('isodate-traverse');
var isEnabled = require('./is-enabled');
var clone = require('./utils').clone;
var type = require('./utils').type;
var address = require('./address');
var objCase = require('obj-case');
var newDate = require('new-date');

/**
 * Expose `Facade`.
 */

module.exports = Facade;

/**
 * Initialize a new `Facade` with an `obj` of arguments.
 *
 * @param {Object} obj
 */

function Facade (obj) {
  if (!obj.hasOwnProperty('timestamp')) obj.timestamp = new Date();
  else obj.timestamp = newDate(obj.timestamp);
  traverse(obj);
  this.obj = obj;
}

/**
 * Mixin address traits.
 */

address(Facade.prototype);

/**
 * Return a proxy function for a `field` that will attempt to first use methods,
 * and fallback to accessing the underlying object directly. You can specify
 * deeply nested fields too like:
 *
 *   this.proxy('options.Librato');
 *
 * @param {String} field
 */

Facade.prototype.proxy = function (field) {
  var fields = field.split('.');
  field = fields.shift();

  // Call a function at the beginning to take advantage of facaded fields
  var obj = this[field] || this.field(field);
  if (!obj) return obj;
  if (typeof obj === 'function') obj = obj.call(this) || {};
  if (fields.length === 0) return transform(obj);

  obj = objCase(obj, fields.join('.'));
  return transform(obj);
};

/**
 * Directly access a specific `field` from the underlying object, returning a
 * clone so outsiders don't mess with stuff.
 *
 * @param {String} field
 * @return {Mixed}
 */

Facade.prototype.field = function (field) {
  var obj = this.obj[field];
  return transform(obj);
};

/**
 * Utility method to always proxy a particular `field`. You can specify deeply
 * nested fields too like:
 *
 *   Facade.proxy('options.Librato');
 *
 * @param {String} field
 * @return {Function}
 */

Facade.proxy = function (field) {
  return function () {
    return this.proxy(field);
  };
};

/**
 * Utility method to directly access a `field`.
 *
 * @param {String} field
 * @return {Function}
 */

Facade.field = function (field) {
  return function () {
    return this.field(field);
  };
};

/**
 * Proxy multiple `path`.
 *
 * @param {String} path
 * @return {Array}
 */

Facade.multi = function(path){
  return function(){
    var multi = this.proxy(path + 's');
    if ('array' == type(multi)) return multi;
    var one = this.proxy(path);
    if (one) one = [clone(one)];
    return one || [];
  };
};

/**
 * Proxy one `path`.
 *
 * @param {String} path
 * @return {Mixed}
 */

Facade.one = function(path){
  return function(){
    var one = this.proxy(path);
    if (one) return one;
    var multi = this.proxy(path + 's');
    if ('array' == type(multi)) return multi[0];
  };
};

/**
 * Get the basic json object of this facade.
 *
 * @return {Object}
 */

Facade.prototype.json = function () {
  var ret = clone(this.obj);
  if (this.type) ret.type = this.type();
  return ret;
};

/**
 * Get the options of a call (formerly called "context"). If you pass an
 * integration name, it will get the options for that specific integration, or
 * undefined if the integration is not enabled.
 *
 * @param {String} integration (optional)
 * @return {Object or Null}
 */

Facade.prototype.context =
Facade.prototype.options = function (integration) {
  var options = clone(this.obj.options || this.obj.context) || {};
  if (!integration) return clone(options);
  if (!this.enabled(integration)) return;
  var integrations = this.integrations();
  var value = integrations[integration] || objCase(integrations, integration);
  if ('boolean' == typeof value) value = {};
  return value || {};
};

/**
 * Check whether an integration is enabled.
 *
 * @param {String} integration
 * @return {Boolean}
 */

Facade.prototype.enabled = function (integration) {
  var allEnabled = this.proxy('options.providers.all');
  if (typeof allEnabled !== 'boolean') allEnabled = this.proxy('options.all');
  if (typeof allEnabled !== 'boolean') allEnabled = this.proxy('integrations.all');
  if (typeof allEnabled !== 'boolean') allEnabled = true;

  var enabled = allEnabled && isEnabled(integration);
  var options = this.integrations();

  // If the integration is explicitly enabled or disabled, use that
  // First, check options.providers for backwards compatibility
  if (options.providers && options.providers.hasOwnProperty(integration)) {
    enabled = options.providers[integration];
  }

  // Next, check for the integration's existence in 'options' to enable it.
  // If the settings are a boolean, use that, otherwise it should be enabled.
  if (options.hasOwnProperty(integration)) {
    var settings = options[integration];
    if (typeof settings === 'boolean') {
      enabled = settings;
    } else {
      enabled = true;
    }
  }

  return enabled ? true : false;
};

/**
 * Get all `integration` options.
 *
 * @param {String} integration
 * @return {Object}
 * @api private
 */

Facade.prototype.integrations = function(){
  return this.obj.integrations
    || this.proxy('options.providers')
    || this.options();
};

/**
 * Check whether the user is active.
 *
 * @return {Boolean}
 */

Facade.prototype.active = function () {
  var active = this.proxy('options.active');
  if (active === null || active === undefined) active = true;
  return active;
};

/**
 * Get `sessionId / anonymousId`.
 *
 * @return {Mixed}
 * @api public
 */

Facade.prototype.sessionId =
Facade.prototype.anonymousId = function(){
  return this.field('anonymousId')
    || this.field('sessionId');
};

/**
 * Get `groupId` from `context.groupId`.
 *
 * @return {String}
 * @api public
 */

Facade.prototype.groupId = Facade.proxy('options.groupId');

/**
 * Get the call's "super properties" which are just traits that have been
 * passed in as if from an identify call.
 *
 * @param {Object} aliases
 * @return {Object}
 */

Facade.prototype.traits = function (aliases) {
  var ret = this.proxy('options.traits') || {};
  var id = this.userId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = null == this[alias]
      ? this.proxy('options.traits.' + alias)
      : this[alias]();
    if (null == value) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Add a convenient way to get the library name and version
 */

Facade.prototype.library = function(){
  var library = this.proxy('options.library');
  if (!library) return { name: 'unknown', version: null };
  if (typeof library === 'string') return { name: library, version: null };
  return library;
};

/**
 * Setup some basic proxies.
 */

Facade.prototype.userId = Facade.field('userId');
Facade.prototype.channel = Facade.field('channel');
Facade.prototype.timestamp = Facade.field('timestamp');
Facade.prototype.userAgent = Facade.proxy('options.userAgent');
Facade.prototype.ip = Facade.proxy('options.ip');

/**
 * Return the cloned and traversed object
 *
 * @param {Mixed} obj
 * @return {Mixed}
 */

function transform(obj){
  var cloned = clone(obj);
  return cloned;
}

}, {"isodate-traverse":142,"./is-enabled":143,"./utils":144,"./address":145,"obj-case":92,"new-date":146}],
142: [function(require, module, exports) {

var is = require('is');
var isodate = require('isodate');
var each;

try {
  each = require('each');
} catch (err) {
  each = require('each-component');
}

/**
 * Expose `traverse`.
 */

module.exports = traverse;

/**
 * Traverse an object or array, and return a clone with all ISO strings parsed
 * into Date objects.
 *
 * @param {Object} obj
 * @return {Object}
 */

function traverse (input, strict) {
  if (strict === undefined) strict = true;

  if (is.object(input)) return object(input, strict);
  if (is.array(input)) return array(input, strict);
  return input;
}

/**
 * Object traverser.
 *
 * @param {Object} obj
 * @param {Boolean} strict
 * @return {Object}
 */

function object (obj, strict) {
  each(obj, function (key, val) {
    if (isodate.is(val, strict)) {
      obj[key] = isodate.parse(val);
    } else if (is.object(val) || is.array(val)) {
      traverse(val, strict);
    }
  });
  return obj;
}

/**
 * Array traverser.
 *
 * @param {Array} arr
 * @param {Boolean} strict
 * @return {Array}
 */

function array (arr, strict) {
  each(arr, function (val, x) {
    if (is.object(val)) {
      traverse(val, strict);
    } else if (isodate.is(val, strict)) {
      arr[x] = isodate.parse(val);
    }
  });
  return arr;
}

}, {"is":147,"isodate":148,"each":4}],
147: [function(require, module, exports) {

var isEmpty = require('is-empty');

try {
  var typeOf = require('type');
} catch (e) {
  var typeOf = require('component-type');
}


/**
 * Types.
 */

var types = [
  'arguments',
  'array',
  'boolean',
  'date',
  'element',
  'function',
  'null',
  'number',
  'object',
  'regexp',
  'string',
  'undefined'
];


/**
 * Expose type checkers.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */

for (var i = 0, type; type = types[i]; i++) exports[type] = generate(type);


/**
 * Add alias for `function` for old browsers.
 */

exports.fn = exports['function'];


/**
 * Expose `empty` check.
 */

exports.empty = isEmpty;


/**
 * Expose `nan` check.
 */

exports.nan = function (val) {
  return exports.number(val) && val != val;
};


/**
 * Generate a type checker.
 *
 * @param {String} type
 * @return {Function}
 */

function generate (type) {
  return function (value) {
    return type === typeOf(value);
  };
}
}, {"is-empty":122,"type":7,"component-type":7}],
148: [function(require, module, exports) {

/**
 * Matcher, slightly modified from:
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 */

var matcher = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;


/**
 * Convert an ISO date string to a date. Fallback to native `Date.parse`.
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 *
 * @param {String} iso
 * @return {Date}
 */

exports.parse = function (iso) {
  var numericKeys = [1, 5, 6, 7, 11, 12];
  var arr = matcher.exec(iso);
  var offset = 0;

  // fallback to native parsing
  if (!arr) return new Date(iso);

  // remove undefined values
  for (var i = 0, val; val = numericKeys[i]; i++) {
    arr[val] = parseInt(arr[val], 10) || 0;
  }

  // allow undefined days and months
  arr[2] = parseInt(arr[2], 10) || 1;
  arr[3] = parseInt(arr[3], 10) || 1;

  // month is 0-11
  arr[2]--;

  // allow abitrary sub-second precision
  arr[8] = arr[8]
    ? (arr[8] + '00').substring(0, 3)
    : 0;

  // apply timezone if one exists
  if (arr[4] == ' ') {
    offset = new Date().getTimezoneOffset();
  } else if (arr[9] !== 'Z' && arr[10]) {
    offset = arr[11] * 60 + arr[12];
    if ('+' == arr[10]) offset = 0 - offset;
  }

  var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
  return new Date(millis);
};


/**
 * Checks whether a `string` is an ISO date string. `strict` mode requires that
 * the date string at least have a year, month and date.
 *
 * @param {String} string
 * @param {Boolean} strict
 * @return {Boolean}
 */

exports.is = function (string, strict) {
  if (strict && false === /^\d{4}-\d{2}-\d{2}/.test(string)) return false;
  return matcher.test(string);
};
}, {}],
143: [function(require, module, exports) {

/**
 * A few integrations are disabled by default. They must be explicitly
 * enabled by setting options[Provider] = true.
 */

var disabled = {
  Salesforce: true
};

/**
 * Check whether an integration should be enabled by default.
 *
 * @param {String} integration
 * @return {Boolean}
 */

module.exports = function (integration) {
  return ! disabled[integration];
};
}, {}],
144: [function(require, module, exports) {

/**
 * TODO: use component symlink, everywhere ?
 */

try {
  exports.inherit = require('inherit');
  exports.clone = require('clone');
  exports.type = require('type');
} catch (e) {
  exports.inherit = require('inherit-component');
  exports.clone = require('clone-component');
  exports.type = require('type-component');
}

}, {"inherit":149,"clone":150,"type":7}],
149: [function(require, module, exports) {

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
}, {}],
150: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var type;
try {
  type = require('component-type');
} catch (_) {
  type = require('type');
}

/**
 * Module exports.
 */

module.exports = clone;

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key]);
        }
      }
      return copy;

    case 'array':
      var copy = new Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}

}, {"component-type":7,"type":7}],
145: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var get = require('obj-case');

/**
 * Add address getters to `proto`.
 *
 * @param {Function} proto
 */

module.exports = function(proto){
  proto.zip = trait('postalCode', 'zip');
  proto.country = trait('country');
  proto.street = trait('street');
  proto.state = trait('state');
  proto.city = trait('city');

  function trait(a, b){
    return function(){
      var traits = this.traits();
      var props = this.properties ? this.properties() : {};

      return get(traits, 'address.' + a)
        || get(traits, a)
        || (b ? get(traits, 'address.' + b) : null)
        || (b ? get(traits, b) : null)
        || get(props, 'address.' + a)
        || get(props, a)
        || (b ? get(props, 'address.' + b) : null)
        || (b ? get(props, b) : null);
    };
  }
};

}, {"obj-case":92}],
146: [function(require, module, exports) {

var is = require('is');
var isodate = require('isodate');
var milliseconds = require('./milliseconds');
var seconds = require('./seconds');


/**
 * Returns a new Javascript Date object, allowing a variety of extra input types
 * over the native Date constructor.
 *
 * @param {Date|String|Number} val
 */

module.exports = function newDate (val) {
  if (is.date(val)) return val;
  if (is.number(val)) return new Date(toMs(val));

  // date strings
  if (isodate.is(val)) return isodate.parse(val);
  if (milliseconds.is(val)) return milliseconds.parse(val);
  if (seconds.is(val)) return seconds.parse(val);

  // fallback to Date.parse
  return new Date(val);
};


/**
 * If the number passed val is seconds from the epoch, turn it into milliseconds.
 * Milliseconds would be greater than 31557600000 (December 31, 1970).
 *
 * @param {Number} num
 */

function toMs (num) {
  if (num < 31557600000) return num * 1000;
  return num;
}
}, {"is":151,"isodate":148,"./milliseconds":152,"./seconds":153}],
151: [function(require, module, exports) {

var isEmpty = require('is-empty')
  , typeOf = require('type');


/**
 * Types.
 */

var types = [
  'arguments',
  'array',
  'boolean',
  'date',
  'element',
  'function',
  'null',
  'number',
  'object',
  'regexp',
  'string',
  'undefined'
];


/**
 * Expose type checkers.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */

for (var i = 0, type; type = types[i]; i++) exports[type] = generate(type);


/**
 * Add alias for `function` for old browsers.
 */

exports.fn = exports['function'];


/**
 * Expose `empty` check.
 */

exports.empty = isEmpty;


/**
 * Expose `nan` check.
 */

exports.nan = function (val) {
  return exports.number(val) && val != val;
};


/**
 * Generate a type checker.
 *
 * @param {String} type
 * @return {Function}
 */

function generate (type) {
  return function (value) {
    return type === typeOf(value);
  };
}
}, {"is-empty":122,"type":7}],
152: [function(require, module, exports) {

/**
 * Matcher.
 */

var matcher = /\d{13}/;


/**
 * Check whether a string is a millisecond date string.
 *
 * @param {String} string
 * @return {Boolean}
 */

exports.is = function (string) {
  return matcher.test(string);
};


/**
 * Convert a millisecond string to a date.
 *
 * @param {String} millis
 * @return {Date}
 */

exports.parse = function (millis) {
  millis = parseInt(millis, 10);
  return new Date(millis);
};
}, {}],
153: [function(require, module, exports) {

/**
 * Matcher.
 */

var matcher = /\d{10}/;


/**
 * Check whether a string is a second date string.
 *
 * @param {String} string
 * @return {Boolean}
 */

exports.is = function (string) {
  return matcher.test(string);
};


/**
 * Convert a second string to a date.
 *
 * @param {String} seconds
 * @return {Date}
 */

exports.parse = function (seconds) {
  var millis = parseInt(seconds, 10) * 1000;
  return new Date(millis);
};
}, {}],
136: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var inherit = require('./utils').inherit;
var Facade = require('./facade');

/**
 * Expose `Alias` facade.
 */

module.exports = Alias;

/**
 * Initialize a new `Alias` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @property {String} from
 *   @property {String} to
 *   @property {Object} options
 */

function Alias (dictionary) {
  Facade.call(this, dictionary);
}

/**
 * Inherit from `Facade`.
 */

inherit(Alias, Facade);

/**
 * Return type of facade.
 *
 * @return {String}
 */

Alias.prototype.type =
Alias.prototype.action = function () {
  return 'alias';
};

/**
 * Get `previousId`.
 *
 * @return {Mixed}
 * @api public
 */

Alias.prototype.from =
Alias.prototype.previousId = function(){
  return this.field('previousId')
    || this.field('from');
};

/**
 * Get `userId`.
 *
 * @return {String}
 * @api public
 */

Alias.prototype.to =
Alias.prototype.userId = function(){
  return this.field('userId')
    || this.field('to');
};

}, {"./utils":144,"./facade":135}],
137: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var inherit = require('./utils').inherit;
var address = require('./address');
var isEmail = require('is-email');
var newDate = require('new-date');
var Facade = require('./facade');

/**
 * Expose `Group` facade.
 */

module.exports = Group;

/**
 * Initialize a new `Group` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @param {String} userId
 *   @param {String} groupId
 *   @param {Object} properties
 *   @param {Object} options
 */

function Group (dictionary) {
  Facade.call(this, dictionary);
}

/**
 * Inherit from `Facade`
 */

inherit(Group, Facade);

/**
 * Get the facade's action.
 */

Group.prototype.type =
Group.prototype.action = function () {
  return 'group';
};

/**
 * Setup some basic proxies.
 */

Group.prototype.groupId = Facade.field('groupId');

/**
 * Get created or createdAt.
 *
 * @return {Date}
 */

Group.prototype.created = function(){
  var created = this.proxy('traits.createdAt')
    || this.proxy('traits.created')
    || this.proxy('properties.createdAt')
    || this.proxy('properties.created');

  if (created) return newDate(created);
};

/**
 * Get the group's email, falling back to the group ID if it's a valid email.
 *
 * @return {String}
 */

Group.prototype.email = function () {
  var email = this.proxy('traits.email');
  if (email) return email;
  var groupId = this.groupId();
  if (isEmail(groupId)) return groupId;
};

/**
 * Get the group's traits.
 *
 * @param {Object} aliases
 * @return {Object}
 */

Group.prototype.traits = function (aliases) {
  var ret = this.properties();
  var id = this.groupId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = null == this[alias]
      ? this.proxy('traits.' + alias)
      : this[alias]();
    if (null == value) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Special traits.
 */

Group.prototype.name = Facade.proxy('traits.name');
Group.prototype.industry = Facade.proxy('traits.industry');
Group.prototype.employees = Facade.proxy('traits.employees');

/**
 * Get traits or properties.
 *
 * TODO: remove me
 *
 * @return {Object}
 */

Group.prototype.properties = function(){
  return this.field('traits')
    || this.field('properties')
    || {};
};

}, {"./utils":144,"./address":145,"is-email":154,"new-date":146,"./facade":135}],
154: [function(require, module, exports) {

/**
 * Expose `isEmail`.
 */

module.exports = isEmail;


/**
 * Email address matcher.
 */

var matcher = /.+\@.+\..+/;


/**
 * Loosely validate an email address.
 *
 * @param {String} string
 * @return {Boolean}
 */

function isEmail (string) {
  return matcher.test(string);
}
}, {}],
138: [function(require, module, exports) {

var address = require('./address');
var Facade = require('./facade');
var isEmail = require('is-email');
var newDate = require('new-date');
var utils = require('./utils');
var get = require('obj-case');
var trim = require('trim');
var inherit = utils.inherit;
var clone = utils.clone;
var type = utils.type;

/**
 * Expose `Idenfity` facade.
 */

module.exports = Identify;

/**
 * Initialize a new `Identify` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @param {String} userId
 *   @param {String} sessionId
 *   @param {Object} traits
 *   @param {Object} options
 */

function Identify (dictionary) {
  Facade.call(this, dictionary);
}

/**
 * Inherit from `Facade`.
 */

inherit(Identify, Facade);

/**
 * Get the facade's action.
 */

Identify.prototype.type =
Identify.prototype.action = function () {
  return 'identify';
};

/**
 * Get the user's traits.
 *
 * @param {Object} aliases
 * @return {Object}
 */

Identify.prototype.traits = function (aliases) {
  var ret = this.field('traits') || {};
  var id = this.userId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = null == this[alias]
      ? this.proxy('traits.' + alias)
      : this[alias]();
    if (null == value) continue;
    ret[aliases[alias]] = value;
    if (alias !== aliases[alias]) delete ret[alias];
  }

  return ret;
};

/**
 * Get the user's email, falling back to their user ID if it's a valid email.
 *
 * @return {String}
 */

Identify.prototype.email = function () {
  var email = this.proxy('traits.email');
  if (email) return email;

  var userId = this.userId();
  if (isEmail(userId)) return userId;
};

/**
 * Get the user's created date, optionally looking for `createdAt` since lots of
 * people do that instead.
 *
 * @return {Date or Undefined}
 */

Identify.prototype.created = function () {
  var created = this.proxy('traits.created') || this.proxy('traits.createdAt');
  if (created) return newDate(created);
};

/**
 * Get the company created date.
 *
 * @return {Date or undefined}
 */

Identify.prototype.companyCreated = function(){
  var created = this.proxy('traits.company.created')
    || this.proxy('traits.company.createdAt');

  if (created) return newDate(created);
};

/**
 * Get the user's name, optionally combining a first and last name if that's all
 * that was provided.
 *
 * @return {String or Undefined}
 */

Identify.prototype.name = function () {
  var name = this.proxy('traits.name');
  if (typeof name === 'string') return trim(name);

  var firstName = this.firstName();
  var lastName = this.lastName();
  if (firstName && lastName) return trim(firstName + ' ' + lastName);
};

/**
 * Get the user's first name, optionally splitting it out of a single name if
 * that's all that was provided.
 *
 * @return {String or Undefined}
 */

Identify.prototype.firstName = function () {
  var firstName = this.proxy('traits.firstName');
  if (typeof firstName === 'string') return trim(firstName);

  var name = this.proxy('traits.name');
  if (typeof name === 'string') return trim(name).split(' ')[0];
};

/**
 * Get the user's last name, optionally splitting it out of a single name if
 * that's all that was provided.
 *
 * @return {String or Undefined}
 */

Identify.prototype.lastName = function () {
  var lastName = this.proxy('traits.lastName');
  if (typeof lastName === 'string') return trim(lastName);

  var name = this.proxy('traits.name');
  if (typeof name !== 'string') return;

  var space = trim(name).indexOf(' ');
  if (space === -1) return;

  return trim(name.substr(space + 1));
};

/**
 * Get the user's unique id.
 *
 * @return {String or undefined}
 */

Identify.prototype.uid = function(){
  return this.userId()
    || this.username()
    || this.email();
};

/**
 * Get description.
 *
 * @return {String}
 */

Identify.prototype.description = function(){
  return this.proxy('traits.description')
    || this.proxy('traits.background');
};

/**
 * Get the age.
 *
 * If the age is not explicitly set
 * the method will compute it from `.birthday()`
 * if possible.
 *
 * @return {Number}
 */

Identify.prototype.age = function(){
  var date = this.birthday();
  var age = get(this.traits(), 'age');
  if (null != age) return age;
  if ('date' != type(date)) return;
  var now = new Date;
  return now.getFullYear() - date.getFullYear();
};

/**
 * Get the avatar.
 *
 * .photoUrl needed because help-scout
 * implementation uses `.avatar || .photoUrl`.
 *
 * .avatarUrl needed because trakio uses it.
 *
 * @return {Mixed}
 */

Identify.prototype.avatar = function(){
  var traits = this.traits();
  return get(traits, 'avatar')
    || get(traits, 'photoUrl')
    || get(traits, 'avatarUrl');
};

/**
 * Get the position.
 *
 * .jobTitle needed because some integrations use it.
 *
 * @return {Mixed}
 */

Identify.prototype.position = function(){
  var traits = this.traits();
  return get(traits, 'position') || get(traits, 'jobTitle');
};

/**
 * Setup sme basic "special" trait proxies.
 */

Identify.prototype.username = Facade.proxy('traits.username');
Identify.prototype.website = Facade.one('traits.website');
Identify.prototype.websites = Facade.multi('traits.website');
Identify.prototype.phone = Facade.one('traits.phone');
Identify.prototype.phones = Facade.multi('traits.phone');
Identify.prototype.address = Facade.proxy('traits.address');
Identify.prototype.gender = Facade.proxy('traits.gender');
Identify.prototype.birthday = Facade.proxy('traits.birthday');

}, {"./address":145,"./facade":135,"is-email":154,"new-date":146,"./utils":144,"obj-case":92,"trim":126}],
139: [function(require, module, exports) {

var inherit = require('./utils').inherit;
var clone = require('./utils').clone;
var type = require('./utils').type;
var Facade = require('./facade');
var Identify = require('./identify');
var isEmail = require('is-email');
var get = require('obj-case');

/**
 * Expose `Track` facade.
 */

module.exports = Track;

/**
 * Initialize a new `Track` facade with a `dictionary` of arguments.
 *
 * @param {object} dictionary
 *   @property {String} event
 *   @property {String} userId
 *   @property {String} sessionId
 *   @property {Object} properties
 *   @property {Object} options
 */

function Track (dictionary) {
  Facade.call(this, dictionary);
}

/**
 * Inherit from `Facade`.
 */

inherit(Track, Facade);

/**
 * Return the facade's action.
 *
 * @return {String}
 */

Track.prototype.type =
Track.prototype.action = function () {
  return 'track';
};

/**
 * Setup some basic proxies.
 */

Track.prototype.event = Facade.field('event');
Track.prototype.value = Facade.proxy('properties.value');

/**
 * Misc
 */

Track.prototype.category = Facade.proxy('properties.category');

/**
 * Ecommerce
 */

Track.prototype.id = Facade.proxy('properties.id');
Track.prototype.sku = Facade.proxy('properties.sku');
Track.prototype.tax = Facade.proxy('properties.tax');
Track.prototype.name = Facade.proxy('properties.name');
Track.prototype.price = Facade.proxy('properties.price');
Track.prototype.total = Facade.proxy('properties.total');
Track.prototype.coupon = Facade.proxy('properties.coupon');
Track.prototype.shipping = Facade.proxy('properties.shipping');
Track.prototype.discount = Facade.proxy('properties.discount');

/**
 * Description
 */

Track.prototype.description = Facade.proxy('properties.description');

/**
 * Plan
 */

Track.prototype.plan = Facade.proxy('properties.plan');

/**
 * Order id.
 *
 * @return {String}
 * @api public
 */

Track.prototype.orderId = function(){
  return this.proxy('properties.id')
    || this.proxy('properties.orderId');
};

/**
 * Get subtotal.
 *
 * @return {Number}
 */

Track.prototype.subtotal = function(){
  var subtotal = get(this.properties(), 'subtotal');
  var total = this.total();
  var n;

  if (subtotal) return subtotal;
  if (!total) return 0;
  if (n = this.tax()) total -= n;
  if (n = this.shipping()) total -= n;
  if (n = this.discount()) total += n;

  return total;
};

/**
 * Get products.
 *
 * @return {Array}
 */

Track.prototype.products = function(){
  var props = this.properties();
  var products = get(props, 'products');
  return 'array' == type(products)
    ? products
    : [];
};

/**
 * Get quantity.
 *
 * @return {Number}
 */

Track.prototype.quantity = function(){
  var props = this.obj.properties || {};
  return props.quantity || 1;
};

/**
 * Get currency.
 *
 * @return {String}
 */

Track.prototype.currency = function(){
  var props = this.obj.properties || {};
  return props.currency || 'USD';
};

/**
 * BACKWARDS COMPATIBILITY: should probably re-examine where these come from.
 */

Track.prototype.referrer = Facade.proxy('properties.referrer');
Track.prototype.query = Facade.proxy('options.query');

/**
 * Get the call's properties.
 *
 * @param {Object} aliases
 * @return {Object}
 */

Track.prototype.properties = function (aliases) {
  var ret = this.field('properties') || {};
  aliases = aliases || {};

  for (var alias in aliases) {
    var value = null == this[alias]
      ? this.proxy('properties.' + alias)
      : this[alias]();
    if (null == value) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Get the call's username.
 *
 * @return {String or Undefined}
 */

Track.prototype.username = function () {
  return this.proxy('traits.username') ||
         this.proxy('properties.username') ||
         this.userId() ||
         this.sessionId();
};

/**
 * Get the call's email, using an the user ID if it's a valid email.
 *
 * @return {String or Undefined}
 */

Track.prototype.email = function () {
  var email = this.proxy('traits.email');
  email = email || this.proxy('properties.email');
  if (email) return email;

  var userId = this.userId();
  if (isEmail(userId)) return userId;
};

/**
 * Get the call's revenue, parsing it from a string with an optional leading
 * dollar sign.
 *
 * For products/services that don't have shipping and are not directly taxed,
 * they only care about tracking `revenue`. These are things like
 * SaaS companies, who sell monthly subscriptions. The subscriptions aren't
 * taxed directly, and since it's a digital product, it has no shipping.
 *
 * The only case where there's a difference between `revenue` and `total`
 * (in the context of analytics) is on ecommerce platforms, where they want
 * the `revenue` function to actually return the `total` (which includes
 * tax and shipping, total = subtotal + tax + shipping). This is probably
 * because on their backend they assume tax and shipping has been applied to
 * the value, and so can get the revenue on their own.
 *
 * @return {Number}
 */

Track.prototype.revenue = function () {
  var revenue = this.proxy('properties.revenue');
  var event = this.event();

  // it's always revenue, unless it's called during an order completion.
  if (!revenue && event && event.match(/completed ?order/i)) {
    revenue = this.proxy('properties.total');
  }

  return currency(revenue);
};

/**
 * Get cents.
 *
 * @return {Number}
 */

Track.prototype.cents = function(){
  var revenue = this.revenue();
  return 'number' != typeof revenue
    ? this.value() || 0
    : revenue * 100;
};

/**
 * A utility to turn the pieces of a track call into an identify. Used for
 * integrations with super properties or rate limits.
 *
 * TODO: remove me.
 *
 * @return {Facade}
 */

Track.prototype.identify = function () {
  var json = this.json();
  json.traits = this.traits();
  return new Identify(json);
};

/**
 * Get float from currency value.
 *
 * @param {Mixed} val
 * @return {Number}
 */

function currency(val) {
  if (!val) return;
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return;

  val = val.replace(/\$/g, '');
  val = parseFloat(val);

  if (!isNaN(val)) return val;
}

}, {"./utils":144,"./facade":135,"./identify":138,"is-email":154,"obj-case":92}],
140: [function(require, module, exports) {

var inherit = require('./utils').inherit;
var Facade = require('./facade');
var Track = require('./track');

/**
 * Expose `Page` facade
 */

module.exports = Page;

/**
 * Initialize new `Page` facade with `dictionary`.
 *
 * @param {Object} dictionary
 *   @param {String} category
 *   @param {String} name
 *   @param {Object} traits
 *   @param {Object} options
 */

function Page(dictionary){
  Facade.call(this, dictionary);
}

/**
 * Inherit from `Facade`
 */

inherit(Page, Facade);

/**
 * Get the facade's action.
 *
 * @return {String}
 */

Page.prototype.type =
Page.prototype.action = function(){
  return 'page';
};

/**
 * Fields
 */

Page.prototype.category = Facade.field('category');
Page.prototype.name = Facade.field('name');

/**
 * Proxies.
 */

Page.prototype.title = Facade.proxy('properties.title');
Page.prototype.path = Facade.proxy('properties.path');
Page.prototype.url = Facade.proxy('properties.url');

/**
 * Referrer.
 */

Page.prototype.referrer = function(){
  return this.proxy('properties.referrer')
    || this.proxy('context.referrer.url');
};

/**
 * Get the page properties mixing `category` and `name`.
 *
 * @return {Object}
 */

Page.prototype.properties = function(){
  var props = this.field('properties') || {};
  var category = this.category();
  var name = this.name();
  if (category) props.category = category;
  if (name) props.name = name;
  return props;
};

/**
 * Get the page fullName.
 *
 * @return {String}
 */

Page.prototype.fullName = function(){
  var category = this.category();
  var name = this.name();
  return name && category
    ? category + ' ' + name
    : name;
};

/**
 * Get event with `name`.
 *
 * @return {String}
 */

Page.prototype.event = function(name){
  return name
    ? 'Viewed ' + name + ' Page'
    : 'Loaded a Page';
};

/**
 * Convert this Page to a Track facade with `name`.
 *
 * @param {String} name
 * @return {Track}
 */

Page.prototype.track = function(name){
  var props = this.properties();
  return new Track({
    event: this.event(name),
    timestamp: this.timestamp(),
    context: this.context(),
    properties: props
  });
};

}, {"./utils":144,"./facade":135,"./track":139}],
141: [function(require, module, exports) {

var inherit = require('./utils').inherit;
var Page = require('./page');
var Track = require('./track');

/**
 * Expose `Screen` facade
 */

module.exports = Screen;

/**
 * Initialize new `Screen` facade with `dictionary`.
 *
 * @param {Object} dictionary
 *   @param {String} category
 *   @param {String} name
 *   @param {Object} traits
 *   @param {Object} options
 */

function Screen(dictionary){
  Page.call(this, dictionary);
}

/**
 * Inherit from `Page`
 */

inherit(Screen, Page);

/**
 * Get the facade's action.
 *
 * @return {String}
 * @api public
 */

Screen.prototype.type =
Screen.prototype.action = function(){
  return 'screen';
};

/**
 * Get event with `name`.
 *
 * @param {String} name
 * @return {String}
 * @api public
 */

Screen.prototype.event = function(name){
  return name
    ? 'Viewed ' + name + ' Screen'
    : 'Loaded a Screen';
};

/**
 * Convert this Screen.
 *
 * @param {String} name
 * @return {Track}
 * @api public
 */

Screen.prototype.track = function(name){
  var props = this.properties();
  return new Track({
    event: this.event(name),
    timestamp: this.timestamp(),
    context: this.context(),
    properties: props
  });
};

}, {"./utils":144,"./page":140,"./track":139}],
133: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var stringify = require('querystring').stringify;
var sub = require('substitute');

/**
 * Factory function to create a pixel loader.
 *
 * @param {String} path
 * @return {Function}
 * @api public
 */

module.exports = function(path){
  return function(query, obj, fn){
    if ('function' == typeof obj) fn = obj, obj = {};
    obj = obj || {};
    fn = fn || function(){};
    var url = sub(path, obj);
    var img = new Image;
    img.onerror = error(fn, 'failed to load pixel', img);
    img.onload = function(){ fn(); };
    query = stringify(query);
    if (query) query = '?' + query;
    img.src = url + query;
    img.width = 1;
    img.height = 1;
    return img;
  };
};

/**
 * Create an error handler.
 *
 * @param {Fucntion} fn
 * @param {String} message
 * @param {Image} img
 * @return {Function}
 * @api private
 */

function error(fn, message, img){
  return function(e){
    e = e || window.event;
    var err = new Error(message);
    err.event = e;
    err.source = img;
    fn(err);
  };
}

}, {"querystring":125,"substitute":155}],
155: [function(require, module, exports) {

/**
 * Expose `substitute`
 */

module.exports = substitute;

/**
 * Type.
 */

var type = Object.prototype.toString;

/**
 * Substitute `:prop` with the given `obj` in `str`
 *
 * @param {String} str
 * @param {Object or Array} obj
 * @param {RegExp} expr
 * @return {String}
 * @api public
 */

function substitute(str, obj, expr){
  if (!obj) throw new TypeError('expected an object');
  expr = expr || /:(\w+)/g;
  return str.replace(expr, function(_, prop){
    switch (type.call(obj)) {
      case '[object Object]':
        return null != obj[prop] ? obj[prop] : _;
      case '[object Array]':
        var val = obj.shift();
        return null != val ? val : _;
    }
  });
}

}, {}],
134: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var encode = encodeURIComponent;
var decode = decodeURIComponent;
var trim = require('trim');
var type = require('type');

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = /(\w+)\[(\d+)\]/.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};

}, {"trim":126,"type":7}],
19: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var tick = require('next-tick');

/**
 * Expose `BugHerd` integration.
 */

var BugHerd = module.exports = integration('BugHerd')
  .assumesPageview()
  .global('BugHerdConfig')
  .global('_bugHerd')
  .option('apiKey', '')
  .option('showFeedbackTab', true)
  .tag('<script src="//www.bugherd.com/sidebarv2.js?apikey={{ apiKey }}">');

/**
 * Initialize.
 *
 * http://support.bugherd.com/home
 *
 * @param {Object} page
 */

BugHerd.prototype.initialize = function(page){
  window.BugHerdConfig = { feedback: { hide: !this.options.showFeedbackTab }};
  var ready = this.ready;
  this.load(function(){
    tick(ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

BugHerd.prototype.loaded = function(){
  return !! window._bugHerd;
};

}, {"analytics.js-integration":88,"next-tick":103}],
20: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');
var extend = require('extend');
var onError = require('on-error');

/**
 * UMD ?
 */

var umd = 'function' == typeof define && define.amd;

/**
 * Source.
 */

var src = '//d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js';

/**
 * Expose `Bugsnag` integration.
 */

var Bugsnag = module.exports = integration('Bugsnag')
  .global('Bugsnag')
  .option('apiKey', '')
  .tag('<script src="' + src + '">');

/**
 * Initialize.
 *
 * https://bugsnag.com/docs/notifiers/js
 *
 * @param {Object} page
 */

Bugsnag.prototype.initialize = function(page){
  var self = this;

  if (umd) {
    window.require([src], function(bugsnag){
      bugsnag.apiKey = self.options.apiKey;
      window.Bugsnag = bugsnag;
      self.ready();
    });
    return;
  }

  this.load(function(){
    window.Bugsnag.apiKey = self.options.apiKey;
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Bugsnag.prototype.loaded = function(){
  return is.object(window.Bugsnag);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Bugsnag.prototype.identify = function(identify){
  window.Bugsnag.metaData = window.Bugsnag.metaData || {};
  extend(window.Bugsnag.metaData, identify.traits());
};

}, {"analytics.js-integration":88,"is":91,"extend":130,"on-error":156}],
156: [function(require, module, exports) {

/**
 * Expose `onError`.
 */

module.exports = onError;


/**
 * Callbacks.
 */

var callbacks = [];


/**
 * Preserve existing handler.
 */

if ('function' == typeof window.onerror) callbacks.push(window.onerror);


/**
 * Bind to `window.onerror`.
 */

window.onerror = handler;


/**
 * Error handler.
 */

function handler () {
  for (var i = 0, fn; fn = callbacks[i]; i++) fn.apply(this, arguments);
}


/**
 * Call a `fn` on `window.onerror`.
 *
 * @param {Function} fn
 */

function onError (fn) {
  callbacks.push(fn);
  if (window.onerror != handler) {
    callbacks.push(window.onerror);
    window.onerror = handler;
  }
}
}, {}],
21: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var defaults = require('defaults');
var onBody = require('on-body');

/**
 * Expose `Chartbeat` integration.
 */

var Chartbeat = module.exports = integration('Chartbeat')
  .assumesPageview()
  .global('_sf_async_config')
  .global('_sf_endpt')
  .global('pSUPERFLY')
  .option('domain', '')
  .option('uid', null)
  .tag('<script src="//static.chartbeat.com/js/chartbeat.js">');

/**
 * Initialize.
 *
 * http://chartbeat.com/docs/configuration_variables/
 *
 * @param {Object} page
 */

Chartbeat.prototype.initialize = function(page){
  var self = this;

  window._sf_async_config = window._sf_async_config || {};
  window._sf_async_config.useCanonical = true;
  defaults(window._sf_async_config, this.options);

  onBody(function(){
    window._sf_endpt = new Date().getTime();
    // Note: Chartbeat depends on document.body existing so the script does
    // not load until that is confirmed. Otherwise it may trigger errors.
    self.load(self.ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Chartbeat.prototype.loaded = function(){
  return !! window.pSUPERFLY;
};

/**
 * Page.
 *
 * http://chartbeat.com/docs/handling_virtual_page_changes/
 *
 * @param {Page} page
 */

Chartbeat.prototype.page = function(page){
  var category = page.category();
  if (category) window._sf_async_config.sections = category;
  var author = page.proxy('properties.author');
  if (author) window._sf_async_config.authors = author;
  var props = page.properties();
  var name = page.fullName();
  window.pSUPERFLY.virtualPage(props.path, name || props.title);
};

}, {"analytics.js-integration":88,"defaults":157,"on-body":129}],
157: [function(require, module, exports) {
/**
 * Expose `defaults`.
 */
module.exports = defaults;

function defaults (dest, defaults) {
  for (var prop in defaults) {
    if (! (prop in dest)) {
      dest[prop] = defaults[prop];
    }
  }

  return dest;
};

}, {}],
22: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_cbq');
var each = require('each');

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Supported events
 */

var supported = {
  activation: true,
  changePlan: true,
  register: true,
  refund: true,
  charge: true,
  cancel: true,
  login: true
};

/**
 * Expose `ChurnBee` integration.
 */

var ChurnBee = module.exports = integration('ChurnBee')
  .global('_cbq')
  .global('ChurnBee')
  .option('apiKey', '')
  .tag('<script src="//api.churnbee.com/cb.js">')
  .mapping('events');

/**
 * Initialize.
 *
 * https://churnbee.com/docs
 *
 * @param {Object} page
 */

ChurnBee.prototype.initialize = function(page){
  push('_setApiKey', this.options.apiKey);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

ChurnBee.prototype.loaded = function(){
  return !! window.ChurnBee;
};

/**
 * Track.
 *
 * @param {Track} event
 */

ChurnBee.prototype.track = function(track){
  var event = track.event();
  var events = this.events(event);
  events.push(event);
  each(events, function(event){
    if (true != supported[event]) return;
    push(event, track.properties({ revenue: 'amount' }));
  });
};

}, {"analytics.js-integration":88,"global-queue":158,"each":4}],
158: [function(require, module, exports) {

/**
 * Expose `generate`.
 */

module.exports = generate;


/**
 * Generate a global queue pushing method with `name`.
 *
 * @param {String} name
 * @param {Object} options
 *   @property {Boolean} wrap
 * @return {Function}
 */

function generate (name, options) {
  options = options || {};

  return function (args) {
    args = [].slice.call(arguments);
    window[name] || (window[name] = []);
    options.wrap === false
      ? window[name].push.apply(window[name], args)
      : window[name].push(args);
  };
}
}, {}],
23: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var date = require('load-date');
var domify = require('domify');
var each = require('each');
var integration = require('analytics.js-integration');
var is = require('is');
var useHttps = require('use-https');
var onBody = require('on-body');

/**
 * Expose `ClickTale` integration.
 */

var ClickTale = module.exports = integration('ClickTale')
  .assumesPageview()
  .global('WRInitTime')
  .global('ClickTale')
  .global('ClickTaleSetUID')
  .global('ClickTaleField')
  .global('ClickTaleEvent')
  .option('httpCdnUrl', 'http://s.clicktale.net/WRe0.js')
  .option('httpsCdnUrl', '')
  .option('projectId', '')
  .option('recordingRatio', 0.01)
  .option('partitionId', '')
  .tag('<script src="{{src}}">');

/**
 * Initialize.
 *
 * http://wiki.clicktale.com/Article/JavaScript_API
 *
 * @param {Object} page
 */

ClickTale.prototype.initialize = function(page){
  var self = this;
  window.WRInitTime = date.getTime();

  onBody(function(body){
    body.appendChild(domify('<div id="ClickTaleDiv" style="display: none;">'));
  });

  var http = this.options.httpCdnUrl;
  var https = this.options.httpsCdnUrl;
  if (useHttps() && !https) return this.debug('https option required');
  var src = useHttps() ? https : http;

  this.load({ src: src }, function(){
    window.ClickTale(
      self.options.projectId,
      self.options.recordingRatio,
      self.options.partitionId
    );
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

ClickTale.prototype.loaded = function(){
  return is.fn(window.ClickTale);
};

/**
 * Identify.
 *
 * http://wiki.clicktale.com/Article/ClickTaleTag#ClickTaleSetUID
 * http://wiki.clicktale.com/Article/ClickTaleTag#ClickTaleField
 *
 * @param {Identify} identify
 */

ClickTale.prototype.identify = function(identify){
  var id = identify.userId();
  window.ClickTaleSetUID(id);
  each(identify.traits(), function(key, value){
    window.ClickTaleField(key, value);
  });
};

/**
 * Track.
 *
 * http://wiki.clicktale.com/Article/ClickTaleTag#ClickTaleEvent
 *
 * @param {Track} track
 */

ClickTale.prototype.track = function(track){
  window.ClickTaleEvent(track.event());
};

}, {"load-date":159,"domify":119,"each":4,"analytics.js-integration":88,"is":91,"use-https":90,"on-body":129}],
159: [function(require, module, exports) {


/*
 * Load date.
 *
 * For reference: http://www.html5rocks.com/en/tutorials/webperformance/basics/
 */

var time = new Date()
  , perf = window.performance;

if (perf && perf.timing && perf.timing.responseEnd) {
  time = new Date(perf.timing.responseEnd);
}

module.exports = time;
}, {}],
24: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var Identify = require('facade').Identify;
var extend = require('extend');
var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `Clicky` integration.
 */

var Clicky = module.exports = integration('Clicky')
  .assumesPageview()
  .global('clicky')
  .global('clicky_site_ids')
  .global('clicky_custom')
  .option('siteId', null)
  .tag('<script src="//static.getclicky.com/js"></script>');

/**
 * Initialize.
 *
 * http://clicky.com/help/customization
 *
 * @param {Object} page
 */

Clicky.prototype.initialize = function(page){
  var user = this.analytics.user();
  window.clicky_site_ids = window.clicky_site_ids || [this.options.siteId];
  this.identify(new Identify({
    userId: user.id(),
    traits: user.traits()
  }));
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Clicky.prototype.loaded = function(){
  return is.object(window.clicky);
};

/**
 * Page.
 *
 * http://clicky.com/help/customization#/help/custom/manual
 *
 * @param {Page} page
 */

Clicky.prototype.page = function(page){
  var properties = page.properties();
  var category = page.category();
  var name = page.fullName();
  window.clicky.log(properties.path, name || properties.title);
};

/**
 * Identify.
 *
 * @param {Identify} id (optional)
 */

Clicky.prototype.identify = function(identify){
  window.clicky_custom = window.clicky_custom || {};
  window.clicky_custom.session = window.clicky_custom.session || {};
  var traits = identify.traits();

  var username = identify.username();
  var email = identify.email();
  var name = identify.name();

  if (username || email || name) traits.username = username || email || name;

  extend(window.clicky_custom.session, traits);
};

/**
 * Track.
 *
 * http://clicky.com/help/customization#/help/custom/manual
 *
 * @param {Track} event
 */

Clicky.prototype.track = function(track){
  window.clicky.goal(track.event(), track.revenue());
};

}, {"facade":132,"extend":130,"analytics.js-integration":88,"is":91}],
25: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var useHttps = require('use-https');

/**
 * Expose `Comscore` integration.
 */

var Comscore = module.exports = integration('comScore')
  .assumesPageview()
  .global('_comscore')
  .global('COMSCORE')
  .option('c1', '2')
  .option('c2', '')
  .tag('http', '<script src="http://b.scorecardresearch.com/beacon.js">')
  .tag('https', '<script src="https://sb.scorecardresearch.com/beacon.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Comscore.prototype.initialize = function(page){
  window._comscore = window._comscore || [this.options];
  var name = useHttps() ? 'https' : 'http';
  this.load(name, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Comscore.prototype.loaded = function(){
  return !! window.COMSCORE;
};

/**
 * Page
 *
 * @param {Object} page
 */

Comscore.prototype.page = function(page){
  window.COMSCORE.beacon(this.options);
};

}, {"analytics.js-integration":88,"use-https":90}],
26: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `CrazyEgg` integration.
 */

var CrazyEgg = module.exports = integration('Crazy Egg')
  .assumesPageview()
  .global('CE2')
  .option('accountNumber', '')
  .tag('<script src="//dnn506yrbagrg.cloudfront.net/pages/scripts/{{ path }}.js?{{ cache }}">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

CrazyEgg.prototype.initialize = function(page){
  var number = this.options.accountNumber;
  var path = number.slice(0,4) + '/' + number.slice(4);
  var cache = Math.floor(new Date().getTime() / 3600000);
  this.load({ path: path, cache: cache }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

CrazyEgg.prototype.loaded = function(){
  return !! window.CE2;
};

}, {"analytics.js-integration":88}],
27: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_curebitq');
var Identify = require('facade').Identify;
var throttle = require('throttle');
var Track = require('facade').Track;
var iso = require('to-iso-string');
var clone = require('clone');
var each = require('each');
var bind = require('bind');

/**
 * Expose `Curebit` integration.
 */

var Curebit = module.exports = integration('Curebit')
  .global('_curebitq')
  .global('curebit')
  .option('siteId', '')
  .option('iframeWidth', '100%')
  .option('iframeHeight', '480')
  .option('iframeBorder', 0)
  .option('iframeId', 'curebit_integration')
  .option('responsive', true)
  .option('device', '')
  .option('insertIntoId', '')
  .option('campaigns', {})
  .option('server', 'https://www.curebit.com')
  .tag('<script src="//d2jjzw81hqbuqv.cloudfront.net/integration/curebit-1.0.min.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Curebit.prototype.initialize = function(page){
  push('init', { site_id: this.options.siteId, server: this.options.server });
  this.load(this.ready);

  // throttle the call to `page` since curebit needs to append an iframe
  this.page = throttle(bind(this, this.page), 250);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Curebit.prototype.loaded = function(){
  return !!window.curebit;
};

/**
 * Page.
 *
 * Call the `register_affiliate` method of the Curebit API that will load a
 * custom iframe onto the page, only if this page's path is marked as a
 * campaign.
 *
 * http://www.curebit.com/docs/affiliate/registration
 *
 * This is throttled to prevent accidentally drawing the iframe multiple times,
 * from multiple `.page()` calls. The `250` is from the curebit script.
 *
 * @param {String} url
 * @param {String} id
 * @param {Function} fn
 * @api private
 */

Curebit.prototype.injectIntoId = function(url, id, fn){
  var server = this.options.server;
  when(function(){
    return document.getElementById(id);
  }, function(){
    var script = document.createElement('script');
    script.src = url;
    var parent = document.getElementById(id);
    parent.appendChild(script);
    onload(script, fn);
  });
};

/**
 * Campaign tags.
 *
 * @param {Page} page
 */

Curebit.prototype.page = function(page){
  var user = this.analytics.user();
  var campaigns = this.options.campaigns;
  var path = window.location.pathname;
  if (!campaigns[path]) return;

  var tags = (campaigns[path] || '').split(',');
  if (!tags.length) return;

  var settings = {
    responsive: this.options.responsive,
    device: this.options.device,
    campaign_tags: tags,
    iframe: {
      width: this.options.iframeWidth,
      height: this.options.iframeHeight,
      id: this.options.iframeId,
      frameborder: this.options.iframeBorder,
      container: this.options.insertIntoId
    }
  };

  var identify = new Identify({
    userId: user.id(),
    traits: user.traits()
  });

  // if we have an email, add any information about the user
  if (identify.email()) {
    settings.affiliate_member = {
      email: identify.email(),
      first_name: identify.firstName(),
      last_name: identify.lastName(),
      customer_id: identify.userId()
    };
  }

  push('register_affiliate', settings);
};

/**
 * Completed order.
 *
 * Fire the Curebit `register_purchase` with the order details and items.
 *
 * https://www.curebit.com/docs/ecommerce/custom
 *
 * @param {Track} track
 */

Curebit.prototype.completedOrder = function(track){
  var user = this.analytics.user();
  var orderId = track.orderId();
  var products = track.products();
  var props = track.properties();
  var items = [];
  var identify = new Identify({
    traits: user.traits(),
    userId: user.id()
  });

  each(products, function(product){
    var track = new Track({ properties: product });
    items.push({
      product_id: track.id() || track.sku(),
      quantity: track.quantity(),
      image_url: product.image,
      price: track.price(),
      title: track.name(),
      url: product.url,
    });
  });

  push('register_purchase', {
    order_date: iso(props.date || new Date()),
    order_number: orderId,
    coupon_code: track.coupon(),
    subtotal: track.total(),
    customer_id: identify.userId(),
    first_name: identify.firstName(),
    last_name: identify.lastName(),
    email: identify.email(),
    items: items
  });
};

}, {"analytics.js-integration":88,"global-queue":158,"facade":132,"throttle":160,"to-iso-string":161,"clone":95,"each":4,"bind":101}],
160: [function(require, module, exports) {

/**
 * Module exports.
 */

module.exports = throttle;

/**
 * Returns a new function that, when invoked, invokes `func` at most one time per
 * `wait` milliseconds.
 *
 * @param {Function} func The `Function` instance to wrap.
 * @param {Number} wait The minimum number of milliseconds that must elapse in between `func` invokations.
 * @return {Function} A new function that wraps the `func` function passed in.
 * @api public
 */

function throttle (func, wait) {
  var rtn; // return value
  var last = 0; // last invokation timestamp
  return function throttled () {
    var now = new Date().getTime();
    var delta = now - last;
    if (delta >= wait) {
      rtn = func.apply(this, arguments);
      last = now;
    }
    return rtn;
  };
}

}, {}],
161: [function(require, module, exports) {

/**
 * Expose `toIsoString`.
 */

module.exports = toIsoString;


/**
 * Turn a `date` into an ISO string.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 *
 * @param {Date} date
 * @return {String}
 */

function toIsoString (date) {
  return date.getUTCFullYear()
    + '-' + pad(date.getUTCMonth() + 1)
    + '-' + pad(date.getUTCDate())
    + 'T' + pad(date.getUTCHours())
    + ':' + pad(date.getUTCMinutes())
    + ':' + pad(date.getUTCSeconds())
    + '.' + String((date.getUTCMilliseconds()/1000).toFixed(3)).slice(2, 5)
    + 'Z';
}


/**
 * Pad a `number` with a ten's place zero.
 *
 * @param {Number} number
 * @return {String}
 */

function pad (number) {
  var n = number.toString();
  return n.length === 1 ? '0' + n : n;
}
}, {}],
28: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var alias = require('alias');
var convertDates = require('convert-dates');
var Identify = require('facade').Identify;
var integration = require('analytics.js-integration');

/**
 * Expose `Customerio` integration.
 */

var Customerio = module.exports = integration('Customer.io')
  .global('_cio')
  .option('siteId', '')
  .tag('<script id="cio-tracker" src="https://assets.customer.io/assets/track.js" data-site-id="{{ siteId }}">');

/**
 * Initialize.
 *
 * http://customer.io/docs/api/javascript.html
 *
 * @param {Object} page
 */

Customerio.prototype.initialize = function(page){
  window._cio = window._cio || [];
  (function(){var a,b,c; a = function(f){return function(){window._cio.push([f].concat(Array.prototype.slice.call(arguments,0))); }; }; b = ['identify', 'track']; for (c = 0; c < b.length; c++) {window._cio[b[c]] = a(b[c]); } })();
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Customerio.prototype.loaded = function(){
  return (!! window._cio) && (window._cio.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * http://customer.io/docs/api/javascript.html#section-Identify_customers
 *
 * @param {Identify} identify
 */

Customerio.prototype.identify = function(identify){
  if (!identify.userId()) return this.debug('user id required');
  var traits = identify.traits({ createdAt: 'created' });
  traits = alias(traits, { created: 'created_at' });
  traits = convertDates(traits, convertDate);
  window._cio.identify(traits);
};

/**
 * Group.
 *
 * @param {Group} group
 */

Customerio.prototype.group = function(group){
  var traits = group.traits();
  var user = this.analytics.user();

  traits = alias(traits, function(trait){
    return 'Group ' + trait;
  });

  this.identify(new Identify({
    userId: user.id(),
    traits: traits
  }));
};

/**
 * Track.
 *
 * http://customer.io/docs/api/javascript.html#section-Track_a_custom_event
 *
 * @param {Track} track
 */

Customerio.prototype.track = function(track){
  var properties = track.properties();
  properties = convertDates(properties, convertDate);
  window._cio.track(track.event(), properties);
};

/**
 * Convert a date to the format Customer.io supports.
 *
 * @param {Date} date
 * @return {Number}
 */

function convertDate(date){
  return Math.floor(date.getTime() / 1000);
}

}, {"alias":162,"convert-dates":163,"facade":132,"analytics.js-integration":88}],
162: [function(require, module, exports) {

var type = require('type');

try {
  var clone = require('clone');
} catch (e) {
  var clone = require('clone-component');
}


/**
 * Expose `alias`.
 */

module.exports = alias;


/**
 * Alias an `object`.
 *
 * @param {Object} obj
 * @param {Mixed} method
 */

function alias (obj, method) {
  switch (type(method)) {
    case 'object': return aliasByDictionary(clone(obj), method);
    case 'function': return aliasByFunction(clone(obj), method);
  }
}


/**
 * Convert the keys in an `obj` using a dictionary of `aliases`.
 *
 * @param {Object} obj
 * @param {Object} aliases
 */

function aliasByDictionary (obj, aliases) {
  for (var key in aliases) {
    if (undefined === obj[key]) continue;
    obj[aliases[key]] = obj[key];
    delete obj[key];
  }
  return obj;
}


/**
 * Convert the keys in an `obj` using a `convert` function.
 *
 * @param {Object} obj
 * @param {Function} convert
 */

function aliasByFunction (obj, convert) {
  // have to create another object so that ie8 won't infinite loop on keys
  var output = {};
  for (var key in obj) output[convert(key)] = obj[key];
  return output;
}
}, {"type":7,"clone":150}],
163: [function(require, module, exports) {

var is = require('is');

try {
  var clone = require('clone');
} catch (e) {
  var clone = require('clone-component');
}


/**
 * Expose `convertDates`.
 */

module.exports = convertDates;


/**
 * Recursively convert an `obj`'s dates to new values.
 *
 * @param {Object} obj
 * @param {Function} convert
 * @return {Object}
 */

function convertDates (obj, convert) {
  obj = clone(obj);
  for (var key in obj) {
    var val = obj[key];
    if (is.date(val)) obj[key] = convert(val);
    if (is.object(val)) obj[key] = convertDates(val, convert);
  }
  return obj;
}
}, {"is":91,"clone":95}],
29: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var alias = require('alias');
var integration = require('analytics.js-integration');
var is = require('is');
var load = require('load-script');
var push = require('global-queue')('_dcq');

/**
 * Expose `Drip` integration.
 */

var Drip = module.exports = integration('Drip')
  .assumesPageview()
  .global('_dc')
  .global('_dcqi')
  .global('_dcq')
  .global('_dcs')
  .option('account', '')
  .tag('<script src="//tag.getdrip.com/{{ account }}.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Drip.prototype.initialize = function(page){
  window._dcq = window._dcq || [];
  window._dcs = window._dcs || {};
  window._dcs.account = this.options.account;
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Drip.prototype.loaded = function(){
  return is.object(window._dc);
};

/**
 * Track.
 *
 * @param {Track} track
 */

Drip.prototype.track = function(track){
  var props = track.properties();
  var cents = track.cents();
  if (cents) props.value = cents;
  delete props.revenue;
  push('track', track.event(), props);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Drip.prototype.identify = function(identify){
  push('identify', identify.traits());
};

}, {"alias":162,"analytics.js-integration":88,"is":91,"load-script":128,"global-queue":158}],
30: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var extend = require('extend');
var integration = require('analytics.js-integration');
var onError = require('on-error');
var push = require('global-queue')('_errs');

/**
 * Expose `Errorception` integration.
 */

var Errorception = module.exports = integration('Errorception')
  .assumesPageview()
  .global('_errs')
  .option('projectId', '')
  .option('meta', true)
  .tag('<script src="//beacon.errorception.com/{{ projectId }}.js">');

/**
 * Initialize.
 *
 * https://github.com/amplitude/Errorception-Javascript
 *
 * @param {Object} page
 */

Errorception.prototype.initialize = function(page){
  window._errs = window._errs || [this.options.projectId];
  onError(push);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Errorception.prototype.loaded = function(){
  return !! (window._errs && window._errs.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * http://blog.errorception.com/2012/11/capture-custom-data-with-your-errors.html
 *
 * @param {Object} identify
 */

Errorception.prototype.identify = function(identify){
  if (!this.options.meta) return;
  var traits = identify.traits();
  window._errs = window._errs || [];
  window._errs.meta = window._errs.meta || {};
  extend(window._errs.meta, traits);
};

}, {"extend":130,"analytics.js-integration":88,"on-error":156,"global-queue":158}],
31: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var each = require('each');
var integration = require('analytics.js-integration');
var push = require('global-queue')('_aaq');

/**
 * Expose `Evergage` integration.integration.
 */

var Evergage = module.exports = integration('Evergage')
  .assumesPageview()
  .global('_aaq')
  .option('account', '')
  .option('dataset', '')
  .tag('<script src="//cdn.evergage.com/beacon/{{ account }}/{{ dataset }}/scripts/evergage.min.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Evergage.prototype.initialize = function(page){
  var account = this.options.account;
  var dataset = this.options.dataset;

  window._aaq = window._aaq || [];
  push('setEvergageAccount', account);
  push('setDataset', dataset);
  push('setUseSiteConfig', true);

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Evergage.prototype.loaded = function(){
  return !! (window._aaq && window._aaq.push !== Array.prototype.push);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Evergage.prototype.page = function(page){
  var props = page.properties();
  var name = page.name();
  if (name) push('namePage', name);

  each(props, function(key, value){
    push('setCustomField', key, value, 'page');
  });

  window.Evergage.init(true);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Evergage.prototype.identify = function(identify){
  var id = identify.userId();
  if (!id) return;

  push('setUser', id);

  var traits = identify.traits({
    email: 'userEmail',
    name: 'userName'
  });

  each(traits, function(key, value){
    push('setUserField', key, value, 'page');
  });
};

/**
 * Group.
 *
 * @param {Group} group
 */

Evergage.prototype.group = function(group){
  var props = group.traits();
  var id = group.groupId();
  if (!id) return;

  push('setCompany', id);
  each(props, function(key, value){
    push('setAccountField', key, value, 'page');
  });
};

/**
 * Track.
 *
 * @param {Track} track
 */

Evergage.prototype.track = function(track){
  push('trackAction', track.event(), track.properties());
};

}, {"each":4,"analytics.js-integration":88,"global-queue":158}],
32: [function(require, module, exports) {
'use strict';

/**
* Module dependencies.
*/

var bind = require('bind');
var domify = require('domify');
var each = require('each');
var extend = require('extend');
var integration = require('analytics.js-integration');
var json = require('json');

/**
* Expose `Extole` integration.
*/

var Extole = module.exports = integration('Extole')
  .global('extole')
  .option('clientId', '')
  .mapping('events')
  .tag('main', '<script src="//tags.extole.com/{{ clientId }}/core.js">');

/**
* Initialize.
*
* @param {Object} page
*/

Extole.prototype.initialize = function(){
  if (this.loaded()) return this.ready();
  this.load('main', bind(this, this.ready));
};

/**
* Loaded?
*
* @return {Boolean}
*/

Extole.prototype.loaded = function(){
  return !!window.extole;
};

/**
* Track.
*
* @param {Track} track
*/

Extole.prototype.track = function(track){
  var user = this.analytics.user();
  var traits = user.traits();
  var userId = user.id();
  var email = traits.email;

  if (!userId && !email) {
    return this.debug('User must be identified before `#track` calls');
  }

  var event = track.event();
  var extoleEvents = this.events(event);

  if (!extoleEvents.length) {
    return this.debug('No events found for %s', event);
  }

  each(extoleEvents, bind(this, function(extoleEvent){
    this._registerConversion(this._createConversionTag({
      type: extoleEvent,
      params: this._formatConversionParams(event, email, userId, track.properties())
    }));
  }));
};

/**
 * Register a conversion to Extole.
 *
 * @api private
 * @param {HTMLElement} conversionTag An Extole conversion tag.
 */

// TODO: If I understand Extole's lib correctly, this is sometimes async,
// sometimes sync. Should probably refactor this into more predictable/sane
// behavior
Extole.prototype._registerConversion = function(conversionTag){
  if (window.extole.main && window.extole.main.fireConversion) {
    return window.extole.main.fireConversion(conversionTag);
  }

  if (window.extole.initializeGo) {
    window.extole.initializeGo().andWhenItsReady(function(){
      window.extole.main.fireConversion(conversionTag);
    });
  }
};

/**
 * formatConversionParams. Formats details from a Segment track event into a
 * data format Extole can accept.
 *
 * @param {string} event
 * @param {string} email
 * @param {string|number} userId
 * @param {Object} properties The result of calling `track.properties()`.
 * @return {Object}
 */

Extole.prototype._formatConversionParams = function(event, email, userId, properties){
  var total;

  if (properties.total) {
    total = properties.total;
    delete properties.total;
    properties['tag:cart_value'] = total;
  }

  return extend({
    'tag:segment_event': event,
    e: email,
    partner_conversion_id: userId
  }, properties);
};

/**
 * Create an Extole conversion tag.
 *
 * @param {Object} conversion An Extole conversion object.
 * @return {HTMLElement}
 */

Extole.prototype._createConversionTag = function(conversion){
  return domify('<script type="extole/conversion">' + json.stringify(conversion) + '</script>');
};

}, {"bind":101,"domify":119,"each":4,"extend":130,"analytics.js-integration":88,"json":164}],
164: [function(require, module, exports) {

var json = window.JSON || {};
var stringify = json.stringify;
var parse = json.parse;

module.exports = parse && stringify
  ? JSON
  : require('json-fallback');

}, {"json-fallback":165}],
165: [function(require, module, exports) {
/*
    json2.js
    2014-02-04

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

(function () {
    'use strict';

    var JSON = module.exports = {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

}, {}],
33: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_fbq');
var each = require('each');

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `Facebook`
 */

var Facebook = module.exports = integration('Facebook Conversion Tracking')
  .global('_fbq')
  .option('currency', 'USD')
  .tag('<script src="//connect.facebook.net/en_US/fbds.js">')
  .mapping('events');

/**
 * Initialize Facebook Conversion Tracking
 *
 * https://developers.facebook.com/docs/ads-for-websites/conversion-pixel-code-migration
 *
 * @param {Object} page
 */

Facebook.prototype.initialize = function(page){
  window._fbq = window._fbq || [];
  this.load(this.ready);
  window._fbq.loaded = true;
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Facebook.prototype.loaded = function(){
  return !! (window._fbq && window._fbq.loaded);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Facebook.prototype.page = function(page){
  var name = page.fullName();
  this.track(page.track(name));
}

/**
 * Track.
 *
 * https://developers.facebook.com/docs/reference/ads-api/custom-audience-website-faq/#fbpixel
 *
 * @param {Track} track
 */

Facebook.prototype.track = function(track){
  var event = track.event();
  var events = this.events(event);
  var revenue = track.revenue() || 0;
  var self = this;

  each(events, function(event){
    push('track', event, {
      value: String(revenue.toFixed(2)),
      currency: self.options.currency
    });
  });
};

}, {"analytics.js-integration":88,"global-queue":158,"each":4}],
34: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var push = require('global-queue')('_fxm');
var integration = require('analytics.js-integration');
var Track = require('facade').Track;
var each = require('each');

/**
 * Expose `FoxMetrics` integration.
 */

var FoxMetrics = module.exports = integration('FoxMetrics')
  .assumesPageview()
  .global('_fxm')
  .option('appId', '')
  .tag('<script src="//d35tca7vmefkrc.cloudfront.net/scripts/{{ appId }}.js">');

/**
 * Initialize.
 *
 * http://foxmetrics.com/documentation/apijavascript
 *
 * @param {Object} page
 */

FoxMetrics.prototype.initialize = function(page){
  window._fxm = window._fxm || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

FoxMetrics.prototype.loaded = function(){
  return !! (window._fxm && window._fxm.appId);
};

/**
 * Page.
 *
 * @param {Page} page
 */

FoxMetrics.prototype.page = function(page){
  var properties = page.proxy('properties');
  var category = page.category();
  var name = page.name();
  this._category = category; // store for later

  push(
    '_fxm.pages.view',
    properties.title,   // title
    name,               // name
    category,           // category
    properties.url,     // url
    properties.referrer // referrer
  );
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

FoxMetrics.prototype.identify = function(identify){
  var id = identify.userId();

  if (!id) return;

  push(
    '_fxm.visitor.profile',
    id,                    // user id
    identify.firstName(), // first name
    identify.lastName(),  // last name
    identify.email(),     // email
    identify.address(),   // address
    undefined,            // social
    undefined,            // partners
    identify.traits()     // attributes
  );
};

/**
 * Track.
 *
 * @param {Track} track
 */

FoxMetrics.prototype.track = function(track){
  var props = track.properties();
  var category = this._category || props.category;
  push(track.event(), category, props);
};

/**
 * Viewed product.
 *
 * @param {Track} track
 * @api private
 */

FoxMetrics.prototype.viewedProduct = function(track){
  ecommerce('productview', track);
};

/**
 * Removed product.
 *
 * @param {Track} track
 * @api private
 */

FoxMetrics.prototype.removedProduct = function(track){
  ecommerce('removecartitem', track);
};

/**
 * Added product.
 *
 * @param {Track} track
 * @api private
 */

FoxMetrics.prototype.addedProduct = function(track){
  ecommerce('cartitem', track);
};

/**
 * Completed Order.
 *
 * @param {Track} track
 * @api private
 */

FoxMetrics.prototype.completedOrder = function(track){
  var orderId = track.orderId();

  // transaction
  push(
    '_fxm.ecommerce.order',
    orderId,
    track.subtotal(),
    track.shipping(),
    track.tax(),
    track.city(),
    track.state(),
    track.zip(),
    track.quantity()
  );

  // items
  each(track.products(), function(product){
    var track = new Track({ properties: product });
    ecommerce('purchaseitem', track, [
      track.quantity(),
      track.price(),
      orderId
    ]);
  });
};

/**
 * Track ecommerce `event` with `track`
 * with optional `arr` to append.
 *
 * @param {String} event
 * @param {Track} track
 * @param {Array} arr
 * @api private
 */

function ecommerce(event, track, arr){
  push.apply(null, [
    '_fxm.ecommerce.' + event,
    track.id() || track.sku(),
    track.name(),
    track.category()
  ].concat(arr || []));
}

}, {"global-queue":158,"analytics.js-integration":88,"facade":132,"each":4}],
35: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var bind = require('bind');
var when = require('when');
var is = require('is');

/**
 * Expose `Frontleaf` integration.
 */

var Frontleaf = module.exports = integration('Frontleaf')
  .global('_fl')
  .global('_flBaseUrl')
  .option('baseUrl', 'https://api.frontleaf.com')
  .option('token', '')
  .option('stream', '')
  .option('trackNamedPages', false)
  .option('trackCategorizedPages', false)
  .tag('<script id="_fl" src="{{ baseUrl }}/lib/tracker.js">');

/**
 * Initialize.
 *
 * http://docs.frontleaf.com/#/technical-implementation/tracking-customers/tracking-beacon
 *
 * @param {Object} page
 */

Frontleaf.prototype.initialize = function(page){
  window._fl = window._fl || [];
  window._flBaseUrl = window._flBaseUrl || this.options.baseUrl;
  this._push('setApiToken', this.options.token);
  this._push('setStream', this.options.stream);
  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load({ baseUrl: window._flBaseUrl }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Frontleaf.prototype.loaded = function(){
  return is.array(window._fl) && window._fl.ready === true;
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Frontleaf.prototype.identify = function(identify){
  var userId = identify.userId();
  if (userId) {
    this._push('setUser', {
      id: userId,
      name: identify.name() || identify.username(),
      data: clean(identify.traits())
    });
  }
};

/**
 * Group.
 *
 * @param {Group} group
 */

Frontleaf.prototype.group = function(group){
  var groupId = group.groupId();
  if (groupId) {
    this._push('setAccount', {
      id: groupId,
      name: group.proxy('traits.name'),
      data: clean(group.traits())
    });
  }
};

/**
 * Page.
 *
 * @param {Page} page
 */

Frontleaf.prototype.page = function(page){
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }
};

/**
 * Track.
 *
 * @param {Track} track
 */

Frontleaf.prototype.track = function(track){
  var event = track.event();
  this._push('event', event, clean(track.properties()));
};

/**
 * Push a command onto the global Frontleaf queue.
 *
 * @param {String} command
 * @return {Object} args
 * @api private
 */

Frontleaf.prototype._push = function(command){
  var args = [].slice.call(arguments, 1);
  window._fl.push(function(t){ t[command].apply(command, args); });
};

/**
 * Clean all nested objects and arrays.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function clean(obj){
  var ret = {};

  // Remove traits/properties that are already represented
  // outside of the data container
  var excludeKeys = ["id","name","firstName","lastName"];
  var len = excludeKeys.length;
  for (var i = 0; i < len; i++) {
    clear(obj, excludeKeys[i]);
  }

  // Flatten nested hierarchy, preserving arrays
  obj = flatten(obj);

  // Discard nulls, represent arrays as comma-separated strings
  for (var key in obj) {
    var val = obj[key];
    if (null == val) {
      continue;
    }

    if (is.array(val)) {
      ret[key] = val.toString();
      continue;
    }

    ret[key] = val;
  }

  return ret;
}

/**
 * Remove a property from an object if set.
 *
 * @param {Object} obj
 * @param {String} key
 * @api private
 */

function clear(obj, key){
  if (obj.hasOwnProperty(key)) {
    delete obj[key];
  }
}

/**
 * Flatten a nested object into a single level space-delimited
 * hierarchy.
 *
 * Based on https://github.com/hughsk/flat
 *
 * @param {Object} source
 * @return {Object}
 * @api private
 */

function flatten(source){
  var output = {};

  function step(object, prev){
    for (var key in object) {
      var value = object[key];
      var newKey = prev ? prev + ' ' + key : key;

      if (!is.array(value) && is.object(value)) {
        return step(value, newKey);
      }

      output[newKey] = value;
    }
  }

  step(source);

  return output;
}

}, {"analytics.js-integration":88,"bind":101,"when":131,"is":91}],
36: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var foldl = require('foldl');
var is = require('is');
var camel = require('to-camel-case');
var integration = require('analytics.js-integration');

/**
 * Expose `FullStory` integration.
 *
 * https://www.fullstory.com/docs/developer
 */

var FullStory = module.exports = integration('FullStory')
  .option('org', '')
  .option('debug', false)
  .tag('<script src="https://www.fullstory.com/s/fs.js"></script>')

/**
 * Initialize.
 */

FullStory.prototype.initialize = function(){
  var self = this;
  window._fs_debug = this.options.debug;
  window._fs_host = 'www.fullstory.com';
  window._fs_org = this.options.org;

  (function(m,n,e,t,l,o,g,y){
    g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
    // jscs:disable
    g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){FS(l,v)};
    // jscs:enable
    g.setSessionVars=function(v){FS('session',v)};g.setPageVars=function(v){FS('page',v)};
    self.ready();
    self.load();
  })(window,document,'FS','script','user');
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

FullStory.prototype.loaded = function(){
  return !! window.FS;
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

FullStory.prototype.identify = function(identify){
  var id = identify.userId() || identify.anonymousId();
  var traits = identify.traits({ name: 'displayName' });

  var newTraits = foldl(function(results, value, key){
    if (key !== 'id') results[key === 'displayName' || key === 'email' ? key : convert(key, value)] = value;
    return results;
  }, {}, traits);

  window.FS.identify(String(id), newTraits);
};

/**
* Convert to FullStory format.
*
* @param {String} trait
* @param {Property} value
*/

function convert (trait, value) {
  trait = camel(trait);
  if (is.string(value)) return trait += '_str';
  if (isInt(value)) return trait += '_int';
  if (isFloat(value)) return trait += '_real';
  if (is.date(value)) return trait += '_date';
  if (is.boolean(value)) return trait += '_bool';
}

/**
 * Check if n is a float.
 */

function isFloat(n) {
  return n === +n && n !== (n|0);
}

/**
 * Check if n is an integer.
 */

function isInt(n) {
  return n === +n && n === (n|0);
}

}, {"foldl":166,"is":91,"to-camel-case":167,"analytics.js-integration":88}],
166: [function(require, module, exports) {
'use strict';

/**
 * Module dependencies.
 */

var each = require('each');

/**
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from left to right, repeatedly calling an `iterator` function and passing to it four
 * arguments: `(accumulator, value, index, collection)`.
 *
 * Returns the final return value of the `iterator` function.
 *
 * @name foldl
 * @api public
 * @param {Function} iterator The function to invoke per iteration.
 * @param {*} accumulator The initial accumulator value, passed to the first invocation of `iterator`.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {*} The return value of the final call to `iterator`.
 * @example
 * foldl(function(total, n) {
 *   return total + n;
 * }, 0, [1, 2, 3]);
 * //=> 6
 *
 * var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };
 *
 * foldl(function(results, phoneNumber) {
 *  if (phoneNumber[0] === '6') {
 *    return results.concat(phoneNumber);
 *  }
 *  return results;
 * }, [], phonebook);
 * // => ['655-222-6789', '655-333-1298']
 */

var foldl = function foldl(iterator, accumulator, collection) {
  if (typeof iterator !== 'function') {
    throw new TypeError('Expected a function but received a ' + typeof iterator);
  }

  each(function(val, i, collection) {
    accumulator = iterator(accumulator, val, i, collection);
  }, collection);

  return accumulator;
};

/**
 * Exports.
 */

module.exports = foldl;

}, {"each":168}],
168: [function(require, module, exports) {
'use strict';

/**
 * Module dependencies.
 */

var keys = require('keys');

/**
 * Object.prototype.toString reference.
 */

var objToString = Object.prototype.toString;

/**
 * Tests if a value is a number.
 *
 * @name isNumber
 * @api private
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a number, otherwise `false`.
 */

// TODO: Move to library
var isNumber = function isNumber(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

/**
 * Tests if a value is an array.
 *
 * @name isArray
 * @api private
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is an array, otherwise `false`.
 */

// TODO: Move to library
var isArray = typeof Array.isArray === 'function' ? Array.isArray : function isArray(val) {
  return objToString.call(val) === '[object Array]';
};

/**
 * Tests if a value is array-like. Array-like means the value is not a function and has a numeric
 * `.length` property.
 *
 * @name isArrayLike
 * @api private
 * @param {*} val
 * @return {boolean}
 */

// TODO: Move to library
var isArrayLike = function isArrayLike(val) {
  return val != null && (isArray(val) || (val !== 'function' && isNumber(val.length)));
};

/**
 * Internal implementation of `each`. Works on arrays and array-like data structures.
 *
 * @name arrayEach
 * @api private
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Array} array The array(-like) structure to iterate over.
 * @return {undefined}
 */

var arrayEach = function arrayEach(iterator, array) {
  for (var i = 0; i < array.length; i += 1) {
    // Break iteration early if `iterator` returns `false`
    if (iterator(array[i], i, array) === false) {
      break;
    }
  }
};

/**
 * Internal implementation of `each`. Works on objects.
 *
 * @name baseEach
 * @api private
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined}
 */

var baseEach = function baseEach(iterator, object) {
  var ks = keys(object);

  for (var i = 0; i < ks.length; i += 1) {
    // Break iteration early if `iterator` returns `false`
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
};

/**
 * Iterate over an input collection, invoking an `iterator` function for each element in the
 * collection and passing to it three arguments: `(value, index, collection)`. The `iterator`
 * function can end iteration early by returning `false`.
 *
 * @name each
 * @api public
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Array|Object|string} collection The collection to iterate over.
 * @return {undefined} Because `each` is run only for side effects, always returns `undefined`.
 * @example
 * var log = console.log.bind(console);
 *
 * each(log, ['a', 'b', 'c']);
 * //-> 'a', 0, ['a', 'b', 'c']
 * //-> 'b', 1, ['a', 'b', 'c']
 * //-> 'c', 2, ['a', 'b', 'c']
 * //=> undefined
 *
 * each(log, 'tim');
 * //-> 't', 2, 'tim'
 * //-> 'i', 1, 'tim'
 * //-> 'm', 0, 'tim'
 * //=> undefined
 *
 * // Note: Iteration order not guaranteed across environments
 * each(log, { name: 'tim', occupation: 'enchanter' });
 * //-> 'tim', 'name', { name: 'tim', occupation: 'enchanter' }
 * //-> 'enchanter', 'occupation', { name: 'tim', occupation: 'enchanter' }
 * //=> undefined
 */

var each = function each(iterator, collection) {
  return (isArrayLike(collection) ? arrayEach : baseEach).call(this, iterator, collection);
};

/**
 * Exports.
 */

module.exports = each;

}, {"keys":169}],
169: [function(require, module, exports) {
'use strict';

/**
 * charAt reference.
 */

var strCharAt = String.prototype.charAt;

/**
 * Returns the character at a given index.
 *
 * @param {string} str
 * @param {number} index
 * @return {string|undefined}
 */

// TODO: Move to a library
var charAt = function(str, index) {
  return strCharAt.call(str, index);
};

/**
 * hasOwnProperty reference.
 */

var hop = Object.prototype.hasOwnProperty;

/**
 * Object.prototype.toString reference.
 */

var toStr = Object.prototype.toString;

/**
 * hasOwnProperty, wrapped as a function.
 *
 * @name has
 * @api private
 * @param {*} context
 * @param {string|number} prop
 * @return {boolean}
 */

// TODO: Move to a library
var has = function has(context, prop) {
  return hop.call(context, prop);
};

/**
 * Returns true if a value is a string, otherwise false.
 *
 * @name isString
 * @api private
 * @param {*} val
 * @return {boolean}
 */

// TODO: Move to a library
var isString = function isString(val) {
  return toStr.call(val) === '[object String]';
};

/**
 * Returns true if a value is array-like, otherwise false. Array-like means a
 * value is not null, undefined, or a function, and has a numeric `length`
 * property.
 *
 * @name isArrayLike
 * @api private
 * @param {*} val
 * @return {boolean}
 */

// TODO: Move to a library
var isArrayLike = function isArrayLike(val) {
  return val != null && (typeof val !== 'function' && typeof val.length === 'number');
};


/**
 * indexKeys
 *
 * @name indexKeys
 * @api private
 * @param {} target
 * @param {} pred
 * @return {Array}
 */

var indexKeys = function indexKeys(target, pred) {
  pred = pred || has;
  var results = [];

  for (var i = 0, len = target.length; i < len; i += 1) {
    if (pred(target, i)) {
      results.push(String(i));
    }
  }

  return results;
};

/**
 * Returns an array of all the owned
 *
 * @name objectKeys
 * @api private
 * @param {*} target
 * @param {Function} pred Predicate function used to include/exclude values from
 * the resulting array.
 * @return {Array}
 */

var objectKeys = function objectKeys(target, pred) {
  pred = pred || has;
  var results = [];


  for (var key in target) {
    if (pred(target, key)) {
      results.push(String(key));
    }
  }

  return results;
};

/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
 *
 * @name keys
 * @api public
 * @category Object
 * @param {Object} source The value to retrieve keys from.
 * @return {Array} An array containing all the input `source`'s keys.
 * @example
 * keys({ likes: 'avocado', hates: 'pineapple' });
 * //=> ['likes', 'pineapple'];
 *
 * // Ignores non-enumerable properties
 * var hasHiddenKey = { name: 'Tim' };
 * Object.defineProperty(hasHiddenKey, 'hidden', {
 *   value: 'i am not enumerable!',
 *   enumerable: false
 * })
 * keys(hasHiddenKey);
 * //=> ['name'];
 *
 * // Works on arrays
 * keys(['a', 'b', 'c']);
 * //=> ['0', '1', '2']
 *
 * // Skips unpopulated indices in sparse arrays
 * var arr = [1];
 * arr[4] = 4;
 * keys(arr);
 * //=> ['0', '4']
 */

module.exports = function keys(source) {
  if (source == null) {
    return [];
  }

  // IE6-8 compatibility (string)
  if (isString(source)) {
    return indexKeys(source, charAt);
  }

  // IE6-8 compatibility (arguments)
  if (isArrayLike(source)) {
    return indexKeys(source, has);
  }

  return objectKeys(source);
};

}, {}],
167: [function(require, module, exports) {

var toSpace = require('to-space-case');


/**
 * Expose `toCamelCase`.
 */

module.exports = toCamelCase;


/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */


function toCamelCase (string) {
  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}
}, {"to-space-case":120}],
37: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_gauges');

/**
 * Expose `Gauges` integration.
 */

var Gauges = module.exports = integration('Gauges')
  .assumesPageview()
  .global('_gauges')
  .option('siteId', '')
  .tag('<script id="gauges-tracker" src="//secure.gaug.es/track.js" data-site-id="{{ siteId }}">');

/**
 * Initialize Gauges.
 *
 * http://get.gaug.es/documentation/tracking/
 *
 * @param {Object} page
 */

Gauges.prototype.initialize = function(page){
  window._gauges = window._gauges || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Gauges.prototype.loaded = function(){
  return !! (window._gauges && window._gauges.push !== Array.prototype.push);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Gauges.prototype.page = function(page){
  push('track');
};

}, {"analytics.js-integration":88,"global-queue":158}],
38: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var onBody = require('on-body');

/**
 * Expose `GetSatisfaction` integration.
 */

var GetSatisfaction = module.exports = integration('Get Satisfaction')
  .assumesPageview()
  .global('GSFN')
  .option('widgetId', '')
  .tag('<script src="https://loader.engage.gsfn.us/loader.js">');

/**
 * Initialize.
 *
 * https://console.getsatisfaction.com/start/101022?signup=true#engage
 *
 * @param {Object} page
 */

GetSatisfaction.prototype.initialize = function(page){
  var self = this;
  var widget = this.options.widgetId;
  var div = document.createElement('div');
  var id = div.id = 'getsat-widget-' + widget;
  onBody(function(body){ body.appendChild(div); });

  // usually the snippet is sync, so wait for it before initializing the tab
  this.load(function(){
    window.GSFN.loadWidget(widget, { containerId: id });
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

GetSatisfaction.prototype.loaded = function(){
  return !! window.GSFN;
};

}, {"analytics.js-integration":88,"on-body":129}],
39: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_gaq');
var length = require('object').length;
var canonical = require('canonical');
var useHttps = require('use-https');
var Track = require('facade').Track;
var callback = require('callback');
var defaults = require('defaults');
var load = require('load-script');
var keys = require('object').keys;
var select = require('select');
var dot = require('obj-case');
var each = require('each');
var type = require('type');
var url = require('url');
var is = require('is');
var group;
var user;

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(GA);
  group = analytics.group();
  user = analytics.user();
};

/**
 * Expose `GA` integration.
 *
 * http://support.google.com/analytics/bin/answer.py?hl=en&answer=2558867
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._setSiteSpeedSampleRate
 */

var GA = exports.Integration = integration('Google Analytics')
  .readyOnLoad()
  .global('ga')
  .global('gaplugins')
  .global('_gaq')
  .global('GoogleAnalyticsObject')
  .option('anonymizeIp', false)
  .option('classic', false)
  .option('domain', 'auto')
  .option('doubleClick', false)
  .option('enhancedEcommerce', false)
  .option('enhancedLinkAttribution', false)
  .option('nonInteraction', false)
  .option('ignoredReferrers', null)
  .option('includeSearch', false)
  .option('siteSpeedSampleRate', 1)
  .option('trackingId', '')
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .option('sendUserId', false)
  .option('metrics', {})
  .option('dimensions', {})
  .tag('library', '<script src="//www.google-analytics.com/analytics.js">')
  .tag('double click', '<script src="//stats.g.doubleclick.net/dc.js">')
  .tag('http', '<script src="http://www.google-analytics.com/ga.js">')
  .tag('https', '<script src="https://ssl.google-analytics.com/ga.js">');

/**
 * On `construct` swap any config-based methods to the proper implementation.
 */

GA.on('construct', function(integration){
  if (integration.options.classic) {
    integration.initialize = integration.initializeClassic;
    integration.loaded = integration.loadedClassic;
    integration.page = integration.pageClassic;
    integration.track = integration.trackClassic;
    integration.completedOrder = integration.completedOrderClassic;

  } else if (integration.options.enhancedEcommerce) {
    integration.viewedProduct = integration.viewedProductEnhanced;
    integration.clickedProduct = integration.clickedProductEnhanced;
    integration.addedProduct = integration.addedProductEnhanced;
    integration.removedProduct = integration.removedProductEnhanced;
    integration.startedOrder = integration.startedOrderEnhanced;
    integration.viewedCheckoutStep = integration.viewedCheckoutStepEnhanced;
    integration.completedCheckoutStep = integration.completedCheckoutStepEnhanced;
    integration.updatedOrder = integration.updatedOrderEnhanced;
    integration.completedOrder = integration.completedOrderEnhanced;
    integration.refundedOrder = integration.refundedOrderEnhanced;
    integration.viewedPromotion = integration.viewedPromotionEnhanced;
    integration.clickedPromotion = integration.clickedPromotionEnhanced;
  }
});

/**
 * Initialize.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
 */

GA.prototype.initialize = function(){
  var opts = this.options;

  // setup the tracker globals
  window.GoogleAnalyticsObject = 'ga';
  window.ga = window.ga || function(){
    window.ga.q = window.ga.q || [];
    window.ga.q.push(arguments);
  };
  window.ga.l = new Date().getTime();

  if (window.location.hostname === 'localhost') opts.domain = 'none';

  window.ga('create', opts.trackingId, {
    cookieDomain: opts.domain || GA.prototype.defaults.domain, // to protect against empty string
    siteSpeedSampleRate: opts.siteSpeedSampleRate,
    allowLinker: true
  });

  // display advertising
  if (opts.doubleClick) {
    window.ga('require', 'displayfeatures');
  }

  // send global id
  if (opts.sendUserId && user.id()) {
    window.ga('set', 'userId', user.id());
  }

  // anonymize after initializing, otherwise a warning is shown
  // in google analytics debugger
  if (opts.anonymizeIp) window.ga('set', 'anonymizeIp', true);

  // custom dimensions & metrics
  var custom = metrics(user.traits(), opts);
  if (length(custom)) window.ga('set', custom);

  this.load('library', this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

GA.prototype.loaded = function(){
  return !! window.gaplugins;
};

/**
 * Page.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 *
 * @param {Page} page
 */

GA.prototype.page = function(page){
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var opts = this.options;
  var campaign = page.proxy('context.campaign') || {};
  var pageview = {};
  var track;

  this._category = category; // store for later

  pageview.page = path(props, this.options);
  pageview.title = name || props.title;
  pageview.location = props.url;

  if (campaign.name) pageview.campaignName = campaign.name;
  if (campaign.source) pageview.campaignSource = campaign.source;
  if (campaign.medium) pageview.campaignMedium = campaign.medium;
  if (campaign.content) pageview.campaignContent = campaign.content;
  if (campaign.term) pageview.campaignKeyword = campaign.term;

  // custom dimensions and metrics
  var custom = metrics(props, opts);
  if (length(custom)) window.ga('set', custom);

  // send
  window.ga('send', 'pageview', pageview);

  // categorized pages
  if (category && this.options.trackCategorizedPages) {
    track = page.track(category);
    this.track(track, { nonInteraction: 1 });
  }

  // named pages
  if (name && this.options.trackNamedPages) {
    track = page.track(name);
    this.track(track, { nonInteraction: 1 });
  }
};

/**
 * Identify.
 *
 * @param {Identify} event
 */

GA.prototype.identify = function(identify){
  var opts = this.options;

  //set userId
  if (opts.sendUserId && identify.userId()) {
    window.ga('set', 'userId', identify.userId());
  }

  //set dimensions
  var custom = metrics(user.traits(), opts);
  if (length(custom)) window.ga('set', custom);
 };

/**
 * Track.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 *
 * @param {Track} event
 */

GA.prototype.track = function(track, options){
  var contextOpts = track.options(this.name);
  var interfaceOpts = this.options;
  var opts = defaults(options || {}, contextOpts);
  opts = defaults(opts, interfaceOpts);
  var props = track.properties();
  var campaign = track.proxy('context.campaign') || {};

  // custom dimensions & metrics
  var custom = metrics(props, interfaceOpts);
  if (length(custom)) window.ga('set', custom);

  var payload = {
    eventAction: track.event(),
    eventCategory: props.category || this._category || 'All',
    eventLabel: props.label,
    eventValue: formatValue(props.value || track.revenue()),
    nonInteraction: !!(props.nonInteraction || opts.nonInteraction)
  };

  if (campaign.name) payload.campaignName = campaign.name;
  if (campaign.source) payload.campaignSource = campaign.source;
  if (campaign.medium) payload.campaignMedium = campaign.medium;
  if (campaign.content) payload.campaignContent = campaign.content;
  if (campaign.term) payload.campaignKeyword = campaign.term;

  window.ga('send', 'event', payload);
};

/**
 * Completed order.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#multicurrency
 *
 * @param {Track} track
 * @api private
 */

GA.prototype.completedOrder = function(track){
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products();
  var props = track.properties();

  // orderId is required.
  if (!orderId) return;

  // require ecommerce
  if (!this.ecommerce) {
    window.ga('require', 'ecommerce');
    this.ecommerce = true;
  }

  // add transaction
  window.ga('ecommerce:addTransaction', {
    affiliation: props.affiliation,
    shipping: track.shipping(),
    revenue: total,
    tax: track.tax(),
    id: orderId,
    currency: track.currency()
  });

  // add products
  each(products, function(product){
    var track = new Track({ properties: product });
    window.ga('ecommerce:addItem', {
      category: track.category(),
      quantity: track.quantity(),
      price: track.price(),
      name: track.name(),
      sku: track.sku(),
      id: orderId,
      currency: track.currency()
    });
  });

  // send
  window.ga('ecommerce:send');
};

/**
 * Initialize (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration
 */

GA.prototype.initializeClassic = function(){
  var opts = this.options;
  var anonymize = opts.anonymizeIp;
  var db = opts.doubleClick;
  var domain = opts.domain;
  var enhanced = opts.enhancedLinkAttribution;
  var ignore = opts.ignoredReferrers;
  var sample = opts.siteSpeedSampleRate;

  window._gaq = window._gaq || [];
  push('_setAccount', opts.trackingId);
  push('_setAllowLinker', true);

  if (anonymize) push('_gat._anonymizeIp');
  if (domain) push('_setDomainName', domain);
  if (sample) push('_setSiteSpeedSampleRate', sample);

  if (enhanced) {
    var protocol = 'https:' === document.location.protocol ? 'https:' : 'http:';
    var pluginUrl = protocol + '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
    push('_require', 'inpage_linkid', pluginUrl);
  }

  if (ignore) {
    if (!is.array(ignore)) ignore = [ignore];
    each(ignore, function(domain){
      push('_addIgnoredRef', domain);
    });
  }

  if (this.options.doubleClick) {
    this.load('double click', this.ready);
  } else {
    var name = useHttps() ? 'https' : 'http';
    this.load(name, this.ready);
  }
};

/**
 * Loaded? (classic)
 *
 * @return {Boolean}
 */

GA.prototype.loadedClassic = function(){
  return !! (window._gaq && window._gaq.push !== Array.prototype.push);
};

/**
 * Page (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration
 *
 * @param {Page} page
 */

GA.prototype.pageClassic = function(page){
  var opts = page.options(this.name);
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var track;

  push('_trackPageview', path(props, this.options));

  // categorized pages
  if (category && this.options.trackCategorizedPages) {
    track = page.track(category);
    this.track(track, { nonInteraction: 1 });
  }

  // named pages
  if (name && this.options.trackNamedPages) {
    track = page.track(name);
    this.track(track, { nonInteraction: 1 });
  }
};

/**
 * Track (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEventTracking
 *
 * @param {Track} track
 */

GA.prototype.trackClassic = function(track, options){
  var opts = options || track.options(this.name);
  var props = track.properties();
  var revenue = track.revenue();
  var event = track.event();
  var category = this._category || props.category || 'All';
  var label = props.label;
  var value = formatValue(revenue || props.value);
  var nonInteraction = !!(props.nonInteraction || opts.nonInteraction);
  push('_trackEvent', category, event, label, value, nonInteraction);
};

/**
 * Completed order.
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce
 * https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce#localcurrencies
 *
 * @param {Track} track
 * @api private
 */

GA.prototype.completedOrderClassic = function(track){
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products() || [];
  var props = track.properties();
  var currency = track.currency();

  // required
  if (!orderId) return;

  // add transaction
  push('_addTrans',
    orderId,
    props.affiliation,
    total,
    track.tax(),
    track.shipping(),
    track.city(),
    track.state(),
    track.country());

  // add items
  each(products, function(product){
    var track = new Track({ properties: product });
    push('_addItem',
      orderId,
      track.sku(),
      track.name(),
      track.category(),
      track.price(),
      track.quantity());
  });

  // send
  push('_set', 'currencyCode', currency);
  push('_trackTrans');
};

/**
 * Return the path based on `properties` and `options`.
 *
 * @param {Object} properties
 * @param {Object} options
 */

function path(properties, options) {
  if (!properties) return;
  var str = properties.path;
  if (options.includeSearch && properties.search) str += properties.search;
  return str;
}

/**
 * Format the value property to Google's liking.
 *
 * @param {Number} value
 * @return {Number}
 */

function formatValue(value) {
  if (!value || value < 0) return 0;
  return Math.round(value);
}

/**
 * Map google's custom dimensions & metrics with `obj`.
 *
 * Example:
 *
 *      metrics({ revenue: 1.9 }, { { metrics : { revenue: 'metric8' } });
 *      // => { metric8: 1.9 }
 *
 *      metrics({ revenue: 1.9 }, {});
 *      // => {}
 *
 * @param {Object} obj
 * @param {Object} data
 * @return {Object|null}
 * @api private
 */

function metrics(obj, data){
  var dimensions = data.dimensions;
  var metrics = data.metrics;
  var names = keys(metrics).concat(keys(dimensions));
  var ret = {};

  for (var i = 0; i < names.length; ++i) {
    var name = names[i];
    var key = metrics[name] || dimensions[name];
    var value = dot(obj, name) || obj[name];
    if (null == value) continue;
    ret[key] = value;
  }

  return ret;
}

/**
 * Loads ec.js (unless already loaded)
 */

GA.prototype.loadEnhancedEcommerce = function(track){
  if (!this.enhancedEcommerceLoaded) {
    window.ga('require', 'ec');
    this.enhancedEcommerceLoaded = true;
  }

  // Ensure we set currency for every hit
  window.ga('set', '&cu', track.currency());
};

/**
 * Pushes an event and all previously set EE data to GA.
 */

GA.prototype.pushEnhancedEcommerce = function(track){
  // Send a custom non-interaction event to ensure all EE data is pushed.
  // Without doing this we'd need to require page display after setting EE data.
  ga('send', 'event', track.category() || 'EnhancedEcommerce', track.event(), { nonInteraction: 1 });
};

/**
 * Started order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @param {Track} track
 */

GA.prototype.startedOrderEnhanced = function(track){
  // same as viewed checkout step #1
  this.viewedCheckoutStep(track);
};

/**
 * Updated order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @param {Track} track
 */

GA.prototype.updatedOrderEnhanced = function(track){
  // Same event as started order - will override
  this.startedOrderEnhanced(track);
};

/**
 * Viewed checkout step - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @param {Track} track
 */

GA.prototype.viewedCheckoutStepEnhanced = function(track){
  var products = track.products();
  var props = track.properties();
  var options = extractCheckoutOptions(props);

  this.loadEnhancedEcommerce(track);

  each(products, function(product){
    var trackTemp = new Track({ properties: product });
    enhancedEcommerceTrackProduct(trackTemp);
  });

  window.ga('ec:setAction','checkout', {
    step: props.step || 1,
    option: options || undefined,
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Completed checkout step - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-options
 *
 * @param {Track} track
 */

GA.prototype.completedCheckoutStepEnhanced = function(track){
  var props = track.properties();
  var options = extractCheckoutOptions(props);

  // Only send an event if we have step and options to update
  if (!props.step || !options) return;

  this.loadEnhancedEcommerce(track);

  window.ga('ec:setAction', 'checkout_option', {
    step: props.step || 1,
    option: options,
  });

  window.ga('send', 'event', 'Checkout', 'Option');
};

/**
 * Completed order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-transactions
 *
 * @param {Track} track
 */

GA.prototype.completedOrderEnhanced = function(track){
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products();
  var props = track.properties();

  // orderId is required.
  if (!orderId) return;

  this.loadEnhancedEcommerce(track);

  each(products, function(product){
    var track = new Track({ properties: product });
    enhancedEcommerceTrackProduct(track);
  });

  window.ga('ec:setAction', 'purchase', {
    id: orderId,
    affiliation: props.affiliation,
    revenue: total,
    tax: track.tax(),
    shipping: track.shipping(),
    coupon: track.coupon(),
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Refunded order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
 *
 * @param {Track} track
 */

GA.prototype.refundedOrderEnhanced = function(track){
  var orderId = track.orderId();
  var products = track.products();

  // orderId is required.
  if (!orderId) return;

  this.loadEnhancedEcommerce(track);

  // Without any products it's a full refund
  each(products, function(product){
    var track = new Track({ properties: product });
    window.ga('ec:addProduct', {
      id: track.id() || track.sku(),
      quantity: track.quantity(),
    });
  });

  window.ga('ec:setAction', 'refund', {
    id: orderId,
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Added product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
 *
 * @param {Track} track
 */

GA.prototype.addedProductEnhanced = function(track){
  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'add');
  this.pushEnhancedEcommerce(track);
};

/**
 * Removed product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
 *
 * @param {Track} track
 */

GA.prototype.removedProductEnhanced = function(track){
  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'remove');
  this.pushEnhancedEcommerce(track);
};

/**
 * Viewed product details - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-detail-view
 *
 * @param {Track} track
 */

GA.prototype.viewedProductEnhanced = function(track){
  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'detail');
  this.pushEnhancedEcommerce(track);
};

/**
 * Clicked product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-actions
 *
 * @param {Track} track
 */

GA.prototype.clickedProductEnhanced = function(track){
  var props = track.properties();

  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'click', {
    list: props.list
  });
  this.pushEnhancedEcommerce(track);
};

/**
 * Viewed promotion - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-impressions
 *
 * @param {Track} track
 */

GA.prototype.viewedPromotionEnhanced = function(track){
  var props = track.properties();

  this.loadEnhancedEcommerce(track);
  window.ga('ec:addPromo', {
    id: track.id(),
    name: track.name(),
    creative: props.creative,
    position: props.position,
  });
  this.pushEnhancedEcommerce(track);
};

/**
 * Clicked promotion - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
 *
 * @param {Track} track
 */

GA.prototype.clickedPromotionEnhanced = function(track){
  var props = track.properties();

  this.loadEnhancedEcommerce(track);
  window.ga('ec:addPromo', {
    id: track.id(),
    name: track.name(),
    creative: props.creative,
    position: props.position,
  });
  ga('ec:setAction', 'promo_click', {});
  this.pushEnhancedEcommerce(track);
};

/**
 * Enhanced ecommerce track product.
 *
 * Simple helper so that we don't repeat `ec:addProduct` everywhere.
 *
 * @param {Track} track
 */

function enhancedEcommerceTrackProduct(track){
  var props = track.properties();

  window.ga('ec:addProduct', {
    id: track.id() || track.sku(),
    name: track.name(),
    category: track.category(),
    quantity: track.quantity(),
    price: track.price(),
    brand: props.brand,
    variant: props.variant,
  });
}

/**
 * Set `action` on `track` with `data`.
 *
 * @param {Track} track
 * @param {String} action
 * @param {Object} data
 */

function enhancedEcommerceProductAction(track, action, data){
  enhancedEcommerceTrackProduct(track);
  window.ga('ec:setAction', action, data || {});
}

/**
 * Extracts checkout options.
 *
 * @param {Object} props
 * @return {Null|String}
 */

function extractCheckoutOptions(props){
  var options = [
    props.paymentMethod,
    props.shippingMethod
  ];

  // Remove all nulls, empty strings, zeroes, and join with commas.
  var valid = select(options, function(e){return e; });
  return valid.length > 0 ? valid.join(', ') : null;
}

}, {"analytics.js-integration":88,"global-queue":158,"object":170,"canonical":171,"use-https":90,"facade":132,"callback":94,"defaults":157,"load-script":128,"select":172,"obj-case":92,"each":4,"type":113,"url":173,"is":91}],
170: [function(require, module, exports) {

/**
 * HOP ref.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Return own keys in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.keys = Object.keys || function(obj){
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Return own values in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.values = function(obj){
  var vals = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function(a, b){
  for (var key in b) {
    if (has.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Return length of `obj`.
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.length = function(obj){
  return exports.keys(obj).length;
};

/**
 * Check if `obj` is empty.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */

exports.isEmpty = function(obj){
  return 0 == exports.length(obj);
};
}, {}],
171: [function(require, module, exports) {
module.exports = function canonical () {
  var tags = document.getElementsByTagName('link');
  for (var i = 0, tag; tag = tags[i]; i++) {
    if ('canonical' == tag.getAttribute('rel')) return tag.getAttribute('href');
  }
};
}, {}],
172: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var toFunction = require('to-function');

/**
 * Filter the given `arr` with callback `fn(val, i)`,
 * when a truthy value is return then `val` is included
 * in the array returned.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 * @api public
 */

module.exports = function(arr, fn){
  var ret = [];
  fn = toFunction(fn);
  for (var i = 0; i < arr.length; ++i) {
    if (fn(arr[i], i)) {
      ret.push(arr[i]);
    }
  }
  return ret;
};

}, {"to-function":174}],
174: [function(require, module, exports) {

/**
 * Module Dependencies
 */

var expr;
try {
  expr = require('props');
} catch(e) {
  expr = require('component-props');
}

/**
 * Expose `toFunction()`.
 */

module.exports = toFunction;

/**
 * Convert `obj` to a `Function`.
 *
 * @param {Mixed} obj
 * @return {Function}
 * @api private
 */

function toFunction(obj) {
  switch ({}.toString.call(obj)) {
    case '[object Object]':
      return objectToFunction(obj);
    case '[object Function]':
      return obj;
    case '[object String]':
      return stringToFunction(obj);
    case '[object RegExp]':
      return regexpToFunction(obj);
    default:
      return defaultToFunction(obj);
  }
}

/**
 * Default to strict equality.
 *
 * @param {Mixed} val
 * @return {Function}
 * @api private
 */

function defaultToFunction(val) {
  return function(obj){
    return val === obj;
  };
}

/**
 * Convert `re` to a function.
 *
 * @param {RegExp} re
 * @return {Function}
 * @api private
 */

function regexpToFunction(re) {
  return function(obj){
    return re.test(obj);
  };
}

/**
 * Convert property `str` to a function.
 *
 * @param {String} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  // immediate such as "> 20"
  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);

  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
  return new Function('_', 'return ' + get(str));
}

/**
 * Convert `object` to a function.
 *
 * @param {Object} object
 * @return {Function}
 * @api private
 */

function objectToFunction(obj) {
  var match = {};
  for (var key in obj) {
    match[key] = typeof obj[key] === 'string'
      ? defaultToFunction(obj[key])
      : toFunction(obj[key]);
  }
  return function(val){
    if (typeof val !== 'object') return false;
    for (var key in match) {
      if (!(key in val)) return false;
      if (!match[key](val[key])) return false;
    }
    return true;
  };
}

/**
 * Built the getter function. Supports getter style functions
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function get(str) {
  var props = expr(str);
  if (!props.length) return '_.' + str;

  var val, i, prop;
  for (i = 0; i < props.length; i++) {
    prop = props[i];
    val = '_.' + prop;
    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";

    // mimic negative lookbehind to avoid problems with nested properties
    str = stripNested(prop, str, val);
  }

  return str;
}

/**
 * Mimic negative lookbehind to avoid problems with nested properties.
 *
 * See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
 *
 * @param {String} prop
 * @param {String} str
 * @param {String} val
 * @return {String}
 * @api private
 */

function stripNested (prop, str, val) {
  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function($0, $1) {
    return $1 ? $0 : val;
  });
}

}, {"props":118,"component-props":118}],
173: [function(require, module, exports) {

/**
 * Parse the given `url`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(url){
  var a = document.createElement('a');
  a.href = url;
  return {
    href: a.href,
    host: a.host,
    port: a.port,
    hash: a.hash,
    hostname: a.hostname,
    pathname: a.pathname,
    protocol: a.protocol,
    search: a.search,
    query: a.search.slice(1)
  }
};

/**
 * Check if `url` is absolute.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isAbsolute = function(url){
  if (0 == url.indexOf('//')) return true;
  if (~url.indexOf('://')) return true;
  return false;
};

/**
 * Check if `url` is relative.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isRelative = function(url){
  return ! exports.isAbsolute(url);
};

/**
 * Check if `url` is cross domain.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isCrossDomain = function(url){
  url = exports.parse(url);
  return url.hostname != location.hostname
    || url.port != location.port
    || url.protocol != location.protocol;
};
}, {}],
40: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var push = require('global-queue')('dataLayer', { wrap: false });
var integration = require('analytics.js-integration');

/**
 * Expose `GTM`.
 */

var GTM = module.exports = integration('Google Tag Manager')
  .assumesPageview()
  .global('dataLayer')
  .global('google_tag_manager')
  .option('containerId', '')
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .tag('<script src="//www.googletagmanager.com/gtm.js?id={{ containerId }}&l=dataLayer">');

/**
 * Initialize.
 *
 * https://developers.google.com/tag-manager
 *
 * @param {Object} page
 */

GTM.prototype.initialize = function(){
  push({ 'gtm.start': +new Date, event: 'gtm.js' });
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

GTM.prototype.loaded = function(){
  return !! (window.dataLayer && [].push != window.dataLayer.push);
};

/**
 * Page.
 *
 * @param {Page} page
 * @api public
 */

GTM.prototype.page = function(page){
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var opts = this.options;
  var track;

  // all
  if (opts.trackAllPages) {
    this.track(page.track());
  }

  // categorized
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }

  // named
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }
};

/**
 * Track.
 *
 * https://developers.google.com/tag-manager/devguide#events
 *
 * @param {Track} track
 * @api public
 */

GTM.prototype.track = function(track){
  var props = track.properties();
  props.event = track.event();
  push(props);
};

}, {"global-queue":158,"analytics.js-integration":88}],
41: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var Identify = require('facade').Identify;
var Track = require('facade').Track;
var callback = require('callback');
var load = require('load-script');
var onBody = require('on-body');
var each = require('each');
var is = require('is');
var pick = require('pick');
var omit = require('omit');

/**
 * Expose `GoSquared` integration.
 */

var GoSquared = module.exports = integration('GoSquared')
  .assumesPageview()
  .global('_gs')
  .option('siteToken', '')
  .option('anonymizeIP', false)
  .option('cookieDomain', null)
  .option('useCookies', true)
  .option('trackHash', false)
  .option('trackLocal', false)
  .option('trackParams', true)
  .tag('<script src="//d1l6p2sc9645hc.cloudfront.net/tracker.js">');

/**
 * Initialize.
 *
 * https://www.gosquared.com/developer/tracker
 * Options: https://www.gosquared.com/developer/tracker/configuration
 *
 * @param {Object} page
 */

GoSquared.prototype.initialize = function(page){
  var self = this;
  var options = this.options;
  var user = this.analytics.user();
  push(options.siteToken);

  each(options, function(name, value){
    if ('siteToken' == name) return;
    if (null == value) return;
    push('set', name, value);
  });

  self.identify(new Identify({
    traits: user.traits(),
    userId: user.id()
  }));

  self.load(this.ready);
};

/**
 * Loaded? (checks if the tracker version is set)
 *
 * @return {Boolean}
 */

GoSquared.prototype.loaded = function(){
  return !! (window._gs && window._gs.v);
};

/**
 * Page.
 *
 * https://www.gosquared.com/docs/tracking/api/#pageviews
 *
 * @param {Page} page
 */

GoSquared.prototype.page = function(page){
  var props = page.properties();
  var name = page.fullName();
  push('track', props.path, name || props.title)
};

/**
 * Identify.
 *
 * https://www.gosquared.com/docs/tracking/identify
 *
 * @param {Identify} identify
 */

GoSquared.prototype.identify = function(identify){
  var traits = identify.traits({
    createdAt: 'created_at',
    firstName: 'first_name',
    lastName: 'last_name',
    title: 'company_position',
    industry: 'company_industry'
  });

  // https://www.gosquared.com/docs/tracking/api/#properties
  var specialKeys = [
    'id',
    'email',
    'name',
    'first_name',
    'last_name',
    'username',
    'description',
    'avatar',
    'phone',
    'created_at',
    'company_name',
    'company_size',
    'company_position',
    'company_industry'
  ];

  // Segment allows traits to all be in a flat object
  // GoSquared requires all custom properties to be in a `custom` object,

  // select all special keys
  var props = pick.apply(null, [traits].concat(specialKeys));
  props.custom = omit(specialKeys, traits);

  var id = identify.userId();

  if (id) {
    push('identify', id, props);
  } else {
    push('properties', props);
  }

  var email = identify.email();
  var username = identify.username();

  var name = email || username || id;
  if (name) push('set', 'visitorName', name);
};

/**
 * Track.
 *
 * https://www.gosquared.com/docs/tracking/events
 *
 * @param {Track} track
 */

GoSquared.prototype.track = function(track){
  push('event', track.event(), track.properties());
};

/**
 * Checked out.
 *
 * https://www.gosquared.com/docs/tracking/ecommerce
 *
 * @param {Track} track
 * @api private
 */

GoSquared.prototype.completedOrder = function(track){
  var products = track.products();
  var items = [];

  each(products, function(product){
    var track = new Track({ properties: product });
    items.push({
      category: track.category(),
      quantity: track.quantity(),
      price: track.price(),
      name: track.name(),
    });
  })

  push('transaction', track.orderId(), {
    revenue: track.total(),
    track: true
  }, items);
};

/**
 * Push to `_gs.q`.
 *
 * @param {...} args
 * @api private
 */

function push(){
  var _gs = window._gs = window._gs || function(){
    (_gs.q = _gs.q || []).push(arguments);
  };
  _gs.apply(null, arguments);
}

}, {"analytics.js-integration":88,"facade":132,"callback":94,"load-script":128,"on-body":129,"each":4,"is":91,"pick":175,"omit":176}],
175: [function(require, module, exports) {

/**
 * Expose `pick`.
 */

module.exports = pick;

/**
 * Pick keys from an `obj`.
 *
 * @param {Object} obj
 * @param {Strings} keys...
 * @return {Object}
 */

function pick(obj){
  var keys = [].slice.call(arguments, 1);
  var ret = {};

  for (var i = 0, key; key = keys[i]; i++) {
    if (key in obj) ret[key] = obj[key];
  }

  return ret;
}
}, {}],
176: [function(require, module, exports) {
/**
 * Expose `omit`.
 */

module.exports = omit;

/**
 * Return a copy of the object without the specified keys.
 *
 * @param {Array} keys
 * @param {Object} object
 * @return {Object}
 */

function omit(keys, object){
  var ret = {};

  for (var item in object) {
    ret[item] = object[item];
  }

  for (var i = 0; i < keys.length; i++) {
    delete ret[keys[i]];
  }
  return ret;
}
}, {}],
42: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var alias = require('alias');

/**
 * Expose `Heap` integration.
 */

var Heap = module.exports = integration('Heap')
  .global('heap')
  .option('appId', '')
  .tag('<script src="//cdn.heapanalytics.com/js/heap-{{ appId }}.js">');

/**
 * Initialize.
 *
 * https://heapanalytics.com/docs/installation#web
 *
 * @param {Object} page
 */

Heap.prototype.initialize = function(page){
  window.heap = window.heap || [];
  window.heap.load = function(appid, config){
    window.heap.appid = appid;
    window.heap.config = config;

    var methodFactory = function(type){
      return function(){
        heap.push([type].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };

    var methods = ['clearEventProperties', 'identify', 'setEventProperties', 'track', 'unsetEventProperty'];
    for (var i = 0; i < methods.length; i++) {
      heap[methods[i]] = methodFactory(methods[i]);
    }
  };

  window.heap.load(this.options.appId);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Heap.prototype.loaded = function(){
  return (window.heap && window.heap.appid);
};

/**
 * Identify.
 *
 * https://heapanalytics.com/docs#identify
 *
 * @param {Identify} identify
 */

Heap.prototype.identify = function(identify){
  var traits = identify.traits({ email: '_email' });
  var id = identify.userId();
  if (id) traits.handle = id;
  window.heap.identify(traits);
};

/**
 * Track.
 *
 * https://heapanalytics.com/docs#track
 *
 * @param {Track} track
 */

Heap.prototype.track = function(track){
  window.heap.track(track.event(), track.properties());
};

}, {"analytics.js-integration":88,"alias":162}],
43: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `hellobar.com` integration.
 */

var Hellobar = module.exports = integration('Hello Bar')
  .assumesPageview()
  .global('_hbq')
  .option('apiKey', '')
  .tag('<script src="//s3.amazonaws.com/scripts.hellobar.com/{{ apiKey }}.js">');

/**
 * Initialize.
 *
 * https://s3.amazonaws.com/scripts.hellobar.com/bb900665a3090a79ee1db98c3af21ea174bbc09f.js
 *
 * @param {Object} page
 */

Hellobar.prototype.initialize = function(page){
  window._hbq = window._hbq || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Hellobar.prototype.loaded = function(){
  return !! (window._hbq && window._hbq.push !== Array.prototype.push);
};

}, {"analytics.js-integration":88}],
44: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `HitTail` integration.
 */

var HitTail = module.exports = integration('HitTail')
  .assumesPageview()
  .global('htk')
  .option('siteId', '')
  .tag('<script src="//{{ siteId }}.hittail.com/mlt.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

HitTail.prototype.initialize = function(page){
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

HitTail.prototype.loaded = function(){
  return is.fn(window.htk);
};

}, {"analytics.js-integration":88,"is":91}],
45: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_hsq');
var convert = require('convert-dates');

/**
 * Expose `HubSpot` integration.
 */

var HubSpot = module.exports = integration('HubSpot')
  .assumesPageview()
  .global('_hsq')
  .option('portalId', null)
  .tag('<script id="hs-analytics" src="https://js.hs-analytics.net/analytics/{{ cache }}/{{ portalId }}.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

HubSpot.prototype.initialize = function(page){
  window._hsq = [];
  var cache = Math.ceil(new Date() / 300000) * 300000;
  this.load({ cache: cache }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

HubSpot.prototype.loaded = function(){
  return !! (window._hsq && window._hsq.push !== Array.prototype.push);
};

/**
 * Page.
 *
 * @param {String} category (optional)
 * @param {String} name (optional)
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

HubSpot.prototype.page = function(page){
  push('_trackPageview');
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

HubSpot.prototype.identify = function(identify){
  if (!identify.email()) return;
  var traits = identify.traits();
  traits = convertDates(traits);
  push('identify', traits);
};

/**
 * Track.
 *
 * @param {Track} track
 */

HubSpot.prototype.track = function(track){
  var props = track.properties();
  props = convertDates(props);
  push('trackEvent', track.event(), props);
};

/**
 * Convert all the dates in the HubSpot properties to millisecond times
 *
 * @param {Object} properties
 */

function convertDates(properties){
  return convert(properties, function(date){ return date.getTime(); });
}

}, {"analytics.js-integration":88,"global-queue":158,"convert-dates":163}],
46: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var alias = require('alias');

/**
 * Expose `Improvely` integration.
 */

var Improvely = module.exports = integration('Improvely')
  .assumesPageview()
  .global('_improvely')
  .global('improvely')
  .option('domain', '')
  .option('projectId', null)
  .tag('<script src="//{{ domain }}.iljmp.com/improvely.js">');

/**
 * Initialize.
 *
 * http://www.improvely.com/docs/landing-page-code
 *
 * @param {Object} page
 */

Improvely.prototype.initialize = function(page){
  window._improvely = [];
  window.improvely = { init: function(e, t){ window._improvely.push(["init", e, t]); }, goal: function(e){ window._improvely.push(["goal", e]); }, label: function(e){ window._improvely.push(["label", e]); }};

  var domain = this.options.domain;
  var id = this.options.projectId;
  window.improvely.init(domain, id);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Improvely.prototype.loaded = function(){
  return !! (window.improvely && window.improvely.identify);
};

/**
 * Identify.
 *
 * http://www.improvely.com/docs/labeling-visitors
 *
 * @param {Identify} identify
 */

Improvely.prototype.identify = function(identify){
  var id = identify.userId();
  if (id) window.improvely.label(id);
};

/**
 * Track.
 *
 * http://www.improvely.com/docs/conversion-code
 *
 * @param {Track} track
 */

Improvely.prototype.track = function(track){
  var props = track.properties({ revenue: 'amount' });
  props.type = track.event();
  window.improvely.goal(props);
};

}, {"analytics.js-integration":88,"alias":162}],
47: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_iva');
var Track = require('facade').Track;
var each = require('each');
var is = require('is');

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `InsideVault` integration.
 */

var InsideVault = module.exports = integration('InsideVault')
  .global('_iva')
  .option('clientId', '')
  .option('domain', '')
  .tag('<script src="//analytics.staticiv.com/iva.js">')
  .mapping('events');

/**
 * Initialize.
 *
 * @param page
 */

InsideVault.prototype.initialize = function(page){
  var domain = this.options.domain;
  window._iva = window._iva || [];
  push('setClientId', this.options.clientId);
  var userId = this.analytics.user().id();
  if (userId) push('setUserId', userId);
  if (domain) push('setDomain', domain);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

InsideVault.prototype.loaded = function(){
  return !! (window._iva && window._iva.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

InsideVault.prototype.identify = function(identify){
  push('setUserId', identify.userId());
};

/**
 * Page.
 *
 * @param {Page} page
 */

InsideVault.prototype.page = function(page){
  // they want every landing page to send a "click" event.
  push('trackEvent', 'click');
};

/**
 * Track.
 *
 * Tracks everything except 'sale' events.
 *
 * @param {Track} track
 */

InsideVault.prototype.track = function(track){
  var user = this.analytics.user();
  var events = this.events(track.event());
  var value = track.revenue() || track.value() || 0;
  var eventId = track.orderId() || user.id() || '';
  each(events, function(event){
    // 'sale' is a special event that will be routed to a table that is deprecated on InsideVault's end.
    // They don't want a generic 'sale' event to go to their deprecated table.
    if (event != 'sale') {
      push('trackEvent', event, value, eventId);
    }
  });
};

}, {"analytics.js-integration":88,"global-queue":158,"facade":132,"each":4,"is":91}],
48: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('__insp');
var alias = require('alias');
var clone = require('clone');

/**
 * Expose `Inspectlet` integration.
 */

var Inspectlet = module.exports = integration('Inspectlet')
  .assumesPageview()
  .global('__insp')
  .global('__insp_')
  .option('wid', '')
  .tag('<script src="//cdn.inspectlet.com/inspectlet.js">');

/**
 * Initialize.
 *
 * https://www.inspectlet.com/dashboard/embedcode/1492461759/initial
 *
 * @param {Object} page
 */

Inspectlet.prototype.initialize = function(page){
  push('wid', this.options.wid);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Inspectlet.prototype.loaded = function(){
  return !! (window.__insp_ && window.__insp);
};

/**
 * Identify.
 *
 * http://www.inspectlet.com/docs#tagging
 *
 * @param {Identify} identify
 */

Inspectlet.prototype.identify = function(identify){
  var traits = identify.traits({ id: 'userid' });
  push('tagSession', traits);
};

/**
 * Track.
 *
 * http://www.inspectlet.com/docs/tags
 *
 * @param {Track} track
 */

Inspectlet.prototype.track = function(track){
  push('tagSession', track.event());
};

/**
 * Page.
 *
 * http://www.inspectlet.com/docs/tags
 *
 * @param {Track} track
 */

Inspectlet.prototype.page = function(){
  push('virtualPage');
};

}, {"analytics.js-integration":88,"global-queue":158,"alias":162,"clone":95}],
49: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var convertDates = require('convert-dates');
var defaults = require('defaults');
var del = require('obj-case').del;
var isEmail = require('is-email');
var load = require('load-script');
var empty = require('is-empty');
var alias = require('alias');
var each = require('each');
var when = require('when');
var is = require('is');

/**
 * Expose `Intercom` integration.
 */

var Intercom = module.exports = integration('Intercom')
  .assumesPageview()
  .global('Intercom')
  .option('activator', '#IntercomDefaultWidget')
  .option('appId', '')
  .option('inbox', false)
  .tag('<script src="https://static.intercomcdn.com/intercom.v1.js">');

/**
 * Initialize.
 *
 * http://docs.intercom.io/
 * http://docs.intercom.io/#IntercomJS
 *
 * @param {Object} page
 */

Intercom.prototype.initialize = function(page){
  var self = this;
  this.load(function(){
    when(function(){ return self.loaded(); }, self.ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Intercom.prototype.loaded = function(){
  return is.fn(window.Intercom);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Intercom.prototype.page = function(page){
  window.Intercom('update');
};

/**
 * Identify.
 *
 * http://docs.intercom.io/#IntercomJS
 *
 * @param {Identify} identify
 */

Intercom.prototype.identify = function(identify){
  var traits = identify.traits({ userId: 'user_id' });
  var activator = this.options.activator;
  var opts = identify.options(this.name);
  var companyCreated = identify.companyCreated();
  var created = identify.created();
  var email = identify.email();
  var name = identify.name();
  var id = identify.userId();
  var group = this.analytics.group();

  if (!id && !traits.email) return; // one is required

  traits.app_id = this.options.appId;

  // intercom requires `company` to be an object. default it with group traits
  // so that we guarantee an `id` is there, since they require it
  if (null != traits.company && !is.object(traits.company)) delete traits.company;
  if (traits.company) defaults(traits.company, group.traits());

  // name
  if (name) traits.name = name;

  // handle dates
  if (created) {
    del(traits, 'created');
    del(traits, 'createdAt');
    traits.created_at = created;
  }
  if (companyCreated) {
    del(traits.company, 'created');
    del(traits.company, 'createdAt');
    traits.company.created_at = companyCreated;
  }

  // convert dates
  traits = convertDates(traits, formatDate);

  // handle options
  if (opts.increments) traits.increments = opts.increments;
  if (opts.userHash) traits.user_hash = opts.userHash;
  if (opts.user_hash) traits.user_hash = opts.user_hash;

  // Intercom, will force the widget to appear
  // if the selector is #IntercomDefaultWidget
  // so no need to check inbox, just need to check
  // that the selector isn't #IntercomDefaultWidget.
  if ('#IntercomDefaultWidget' != activator) {
    traits.widget = { activator: activator };
  }

  var method = this._id !== id ? 'boot': 'update';
  this._id = id; // cache for next time

  window.Intercom(method, traits);
};

/**
 * Group.
 *
 * @param {Group} group
 */

Intercom.prototype.group = function(group){
  var props = group.properties();
  props = alias(props, { createdAt: 'created' });
  props = alias(props, { created: 'created_at' });
  var id = group.groupId();
  if (id) props.id = id;
  window.Intercom('update', { company: props });
};

/**
 * Track.
 *
 * @param {Track} track
 */

Intercom.prototype.track = function(track){
  window.Intercom('trackEvent', track.event(), track.properties());
};

/**
 * Format a date to Intercom's liking.
 *
 * @param {Date} date
 * @return {Number}
 */

function formatDate(date) {
  return Math.floor(date / 1000);
}

}, {"analytics.js-integration":88,"convert-dates":163,"defaults":157,"obj-case":92,"is-email":154,"load-script":128,"is-empty":122,"alias":162,"each":4,"when":131,"is":91}],
50: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var clone = require('clone');

/**
 * Expose `Keen IO` integration.
 */

var Keen = module.exports = integration('Keen IO')
  .global('Keen')
  .option('projectId', '')
  .option('readKey', '')
  .option('writeKey', '')
  .option('ipAddon', false)
  .option('uaAddon', false)
  .option('urlAddon', false)
  .option('referrerAddon', false)
  .option('trackNamedPages', true)
  .option('trackAllPages', false)
  .option('trackCategorizedPages', true)
  .tag('<script src="//d26b395fwzu5fz.cloudfront.net/3.0.7/{{ lib }}.min.js">');

/**
 * Initialize.
 *
 * https://keen.io/docs/
 */

Keen.prototype.initialize = function(){
  var options = this.options;
  !(function(a,b){
    if (void 0===b[a]){
      b["_"+a]={},
      b[a]=function(c){
        b["_"+a].clients=b["_"+a].clients||{},
        b["_"+a].clients[c.projectId]=this,
        this._config=c
      },
      b[a].ready=function(c){
        b["_"+a].ready=b["_"+a].ready||[],b["_"+a].ready.push(c)
      };
      for (var c=["addEvent","setGlobalProperties","trackExternalLink","on"],d=0;d<c.length;d++){
        var e=c[d],
        f=function(a){
          return function(){
            return this["_"+a]=this["_"+a]||[],this["_"+a].push(arguments),this
          }
        };
        b[a].prototype[e]=f(e)
      }
    }
  })("Keen",window);
  this.client = new window.Keen({
    projectId: options.projectId,
    writeKey: options.writeKey,
    readKey: options.readKey
  });

  // if you have a read-key, then load the full keen library
  var lib = this.options.readKey ? 'keen' : 'keen-tracker';
  this.load({ lib: lib }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Keen.prototype.loaded = function(){
  return !!(window.Keen && window.Keen.prototype.configure);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Keen.prototype.page = function(page){
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var opts = this.options;

  // all pages
  if (opts.trackAllPages) {
    this.track(page.track());
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }
};

/**
 * Identify.
 *
 * TODO: migrate from old `userId` to simpler `id`
 * https://keen.io/docs/data-collection/data-enrichment/#add-ons
 *
 * Set up the Keen addons object. These must be specifically
 * enabled by the settings in order to include the plugins, or else
 * Keen will reject the request.
 *
 * @param {Identify} identify
 */

Keen.prototype.identify = function(identify){
  var traits = identify.traits();
  var id = identify.userId();
  var user = {};
  if (id) user.userId = id;
  if (traits) user.traits = traits;
  var props = { user: user };
  this.addons(props, identify);
  this.client.setGlobalProperties(function(){
    return clone(props);
  });
};

/**
 * Track.
 *
 * @param {Track} track
 */

Keen.prototype.track = function(track){
  var props = track.properties();
  this.addons(props, track);
  this.client.addEvent(track.event(), props);
};

/**
 * Attach addons to `obj` with `msg`.
 *
 * @param {Object} obj
 * @param {Facade} msg
 */

Keen.prototype.addons = function(obj, msg){
  var options = this.options;
  var addons = [];

  if (options.ipAddon) {
    addons.push({
      name: 'keen:ip_to_geo',
      input: { ip: 'ip_address' },
      output: 'ip_geo_info'
    });
    obj.ip_address = '${keen.ip}';
  }

  if (options.uaAddon) {
    addons.push({
      name: 'keen:ua_parser',
      input: { ua_string: 'user_agent' },
      output: 'parsed_user_agent'
    });
    obj.user_agent = '${keen.user_agent}';
  }

  if (options.urlAddon) {
    addons.push({
      name: 'keen:url_parser',
      input: { url: 'page_url' },
      output: 'parsed_page_url'
    });
    obj.page_url = document.location.href;
  }

  if (options.referrerAddon) {
    addons.push({
      name: 'keen:referrer_parser',
      input: {
        referrer_url: 'referrer_url',
        page_url: 'page_url'
      },
      output: 'referrer_info'
    });
    obj.referrer_url = document.referrer;
    obj.page_url = document.location.href;
  }

  obj.keen = {
    timestamp: msg.timestamp(),
    addons: addons
  };
};

}, {"analytics.js-integration":88,"clone":95}],
51: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var indexof = require('indexof');
var is = require('is');

/**
 * Expose `Kenshoo` integration.
 */

var Kenshoo = module.exports = integration('Kenshoo')
  .global('k_trackevent')
  .option('cid', '')
  .option('subdomain', '')
  .option('events', [])
  .tag('<script src="//{{ subdomain }}.xg4ken.com/media/getpx.php?cid={{ cid }}">');

/**
 * Initialize.
 *
 * See https://gist.github.com/justinboyle/7875832
 *
 * @param {Object} page
 */

Kenshoo.prototype.initialize = function(page){
  this.load(this.ready);
};

/**
 * Loaded? (checks if the tracking function is set)
 *
 * @return {Boolean}
 */

Kenshoo.prototype.loaded = function(){
  return is.fn(window.k_trackevent);
};

/**
 * Track.
 *
 * Only tracks events if they are listed in the events array option.
 * We've asked for docs a few times but no go :/
 *
 * https://github.com/jorgegorka/the_tracker/blob/master/lib/the_tracker/trackers/kenshoo.rb
 *
 * @param {Track} event
 */

Kenshoo.prototype.track = function(track){
  var events = this.options.events;
  var traits = track.traits();
  var event = track.event();
  var revenue = track.revenue() || 0;
  if (!~indexof(events, event)) return;

  var params = [
    'id=' + this.options.cid,
    'type=conv',
    'val=' + revenue,
    'orderId=' + track.orderId(),
    'promoCode=' + track.coupon(),
    'valueCurrency=' + track.currency(),

    // Live tracking fields. Ignored for now (until we get documentation).
    'GCID=',
    'kw=',
    'product='
  ];

  window.k_trackevent(params, this.options.subdomain);
};

}, {"analytics.js-integration":88,"indexof":116,"is":91}],
52: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_kmq');
var Track = require('facade').Track;
var alias = require('alias');
var each = require('each');
var is = require('is');

/**
 * Expose `KISSmetrics` integration.
 */

var KISSmetrics = module.exports = integration('KISSmetrics')
  .assumesPageview()
  .global('_kmq')
  .global('KM')
  .global('_kmil')
  .option('apiKey', '')
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .option('prefixProperties', true)
  .tag('library', '<script src="//scripts.kissmetrics.com/{{ apiKey }}.2.js">');

/**
 * Check if browser is mobile, for kissmetrics.
 *
 * http://support.kissmetrics.com/how-tos/browser-detection.html#mobile-vs-non-mobile
 */

exports.isMobile = navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/iPhone|iPod/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/Opera Mini/i)
  || navigator.userAgent.match(/IEMobile/i);

/**
 * Initialize.
 *
 * http://support.kissmetrics.com/apis/javascript
 *
 * @param {Object} page
 */

KISSmetrics.prototype.initialize = function(page){
  var self = this;
  window._kmq = [];
  if (exports.isMobile) push('set', { 'Mobile Session': 'Yes' });

  this.load('library', function(){
    self.trackPage(page);
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

KISSmetrics.prototype.loaded = function(){
  return is.object(window.KM);
};

/**
 * Page.
 *
 * @param {Page} page
 */

KISSmetrics.prototype.page = function(page){
  if (!window.KM_SKIP_PAGE_VIEW) window.KM.pageView();
  this.trackPage(page);
};

/**
 * Track page.
 *
 * @param {Page} page
 */

KISSmetrics.prototype.trackPage = function(page){
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

KISSmetrics.prototype.identify = function(identify){
  var traits = identify.traits();
  var id = identify.userId();
  if (id) push('identify', id);
  if (traits) push('set', traits);
};

/**
 * Track.
 *
 * @param {Track} track
 */

KISSmetrics.prototype.track = function(track){
  var mapping = { revenue: 'Billing Amount' };
  var event = track.event();
  var properties = track.properties(mapping);
  if (this.options.prefixProperties) properties = prefix(event, properties);
  push('record', event, properties);
};

/**
 * Alias.
 *
 * @param {Alias} to
 */

KISSmetrics.prototype.alias = function(alias){
  push('alias', alias.to(), alias.from());
};

/**
 * Completed order.
 *
 * @param {Track} track
 * @api private
 */

KISSmetrics.prototype.completedOrder = function(track){
  var products = track.products();
  var event = track.event();

  // transaction
  push('record', event, prefix(event, track.properties()));

  // items
  window._kmq.push(function(){
    var km = window.KM;
    each(products, function(product, i){
      var item = prefix(event, product);
      item._t = km.ts() + i;
      item._d = 1;
      km.set(item);
    });
  });
};

/**
 * Prefix properties with the event name.
 *
 * @param {String} event
 * @param {Object} properties
 * @return {Object} prefixed
 * @api private
 */

function prefix(event, properties){
  var prefixed = {};
  each(properties, function(key, val){
    if (key === 'Billing Amount') {
      prefixed[key] = val;
    } else {
      prefixed[event + ' - ' + key] = val;
    }
  });
  return prefixed;
}

}, {"analytics.js-integration":88,"global-queue":158,"facade":132,"alias":162,"each":4,"is":91}],
53: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_learnq');
var tick = require('next-tick');
var alias = require('alias');

/**
 * Trait aliases.
 */

var aliases = {
  id: '$id',
  email: '$email',
  firstName: '$first_name',
  lastName: '$last_name',
  phone: '$phone_number',
  title: '$title'
};

/**
 * Expose `Klaviyo` integration.
 */

var Klaviyo = module.exports = integration('Klaviyo')
  .assumesPageview()
  .global('_learnq')
  .option('apiKey', '')
  .tag('<script src="//a.klaviyo.com/media/js/learnmarklet.js">');

/**
 * Initialize.
 *
 * https://www.klaviyo.com/docs/getting-started
 *
 * @param {Object} page
 */

Klaviyo.prototype.initialize = function(page){
  var self = this;
  push('account', this.options.apiKey);
  this.load(function(){
    tick(self.ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Klaviyo.prototype.loaded = function(){
  return !! (window._learnq && window._learnq.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Klaviyo.prototype.identify = function(identify){
  var traits = identify.traits(aliases);
  if (!traits.$id && !traits.$email) return;
  push('identify', traits);
};

/**
 * Group.
 *
 * @param {Group} group
 */

Klaviyo.prototype.group = function(group){
  var props = group.properties();
  if (!props.name) return;
  push('identify', { $organization: props.name });
};

/**
 * Track.
 *
 * @param {Track} track
 */

Klaviyo.prototype.track = function(track){
  push('track', track.event(), track.properties({
    revenue: '$value'
  }));
};

}, {"analytics.js-integration":88,"global-queue":158,"next-tick":103,"alias":162}],
54: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var clone = require('clone');
var each = require('each');
var Identify = require('facade').Identify;
var when = require('when');

/**
 * Expose `LiveChat` integration.
 */

var LiveChat = module.exports = integration('LiveChat')
  .assumesPageview()
  .global('__lc')
  .global('__lc_inited')
  .global('LC_API')
  .global('LC_Invite')
  .option('group', 0)
  .option('license', '')
  .tag('<script src="//cdn.livechatinc.com/tracking.js">');

/**
 * Initialize.
 *
 * http://www.livechatinc.com/api/javascript-api
 *
 * @param {Object} page
 */

LiveChat.prototype.initialize = function(page){
  var self = this;
  var user = this.analytics.user();
  var identify = new Identify({
    userId: user.id(),
    traits: user.traits()
  });

  window.__lc = clone(this.options);
  window.__lc.visitor = {
    name: identify.name(),
    email: identify.email()
  };

  this.load(function(){
    when(function(){
      return self.loaded();
    }, self.ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

LiveChat.prototype.loaded = function(){
  return !!(window.LC_API && window.LC_Invite);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

LiveChat.prototype.identify = function(identify){
  var traits = identify.traits({ userId: 'User ID' });
  window.LC_API.set_custom_variables(convert(traits));
};

/**
 * Convert a traits object into the format LiveChat requires.
 *
 * @param {Object} traits
 * @return {Array}
 */

function convert(traits){
  var arr = [];
  each(traits, function(key, value){
    arr.push({ name: key, value: value });
  });
  return arr;
}

}, {"analytics.js-integration":88,"clone":95,"each":4,"facade":132,"when":131}],
55: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var Identify = require('facade').Identify;
var useHttps = require('use-https');

/**
 * Expose `LuckyOrange` integration.
 */

var LuckyOrange = module.exports = integration('Lucky Orange')
  .assumesPageview()
  .global('_loq')
  .global('__wtw_watcher_added')
  .global('__wtw_lucky_site_id')
  .global('__wtw_lucky_is_segment_io')
  .global('__wtw_custom_user_data')
  .option('siteId', null)
  .tag('http', '<script src="http://www.luckyorange.com/w.js?{{ cache }}">')
  .tag('https', '<script src="https://ssl.luckyorange.com/w.js?{{ cache }}">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

LuckyOrange.prototype.initialize = function(page){
  var user = this.analytics.user();
  window._loq || (window._loq = []);
  window.__wtw_lucky_site_id = this.options.siteId;
  this.identify(new Identify({
    traits: user.traits(),
    userId: user.id()
  }));
  var cache = Math.floor(new Date().getTime() / 60000);
  var name = useHttps() ? 'https' : 'http';
  this.load(name, { cache: cache }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

LuckyOrange.prototype.loaded = function(){
  return !! window.__wtw_watcher_added;
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

LuckyOrange.prototype.identify = function(identify){
  var traits = identify.traits();
  var email = identify.email();
  var name = identify.name();
  if (name) traits.name = name;
  if (email) traits.email = email;
  window.__wtw_custom_user_data = traits;
};

}, {"analytics.js-integration":88,"facade":132,"use-https":90}],
56: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var alias = require('alias');

/**
 * Expose `Lytics` integration.
 */

var Lytics = module.exports = integration('Lytics')
  .global('jstag')
  .option('cid', '')
  .option('cookie', 'seerid')
  .option('delay', 2000)
  .option('sessionTimeout', 1800)
  .option('url', '//c.lytics.io')
  .tag('<script src="//c.lytics.io/static/io.min.js">');

/**
 * Options aliases.
 */

var aliases = {
  sessionTimeout: 'sessecs'
};

/**
 * Initialize.
 *
 * http://admin.lytics.io/doc#jstag
 *
 * @param {Object} page
 */

Lytics.prototype.initialize = function(page){
  var options = alias(this.options, aliases);
  window.jstag = (function(){var t = { _q: [], _c: options, ts: (new Date()).getTime() }; t.send = function(){this._q.push(['ready', 'send', Array.prototype.slice.call(arguments)]); return this; }; return t; })();
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Lytics.prototype.loaded = function(){
  return !! (window.jstag && window.jstag.bind);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Lytics.prototype.page = function(page){
  window.jstag.send(page.properties());
};

/**
 * Idenfity.
 *
 * @param {Identify} identify
 */

Lytics.prototype.identify = function(identify){
  var traits = identify.traits({ userId: '_uid' });
  window.jstag.send(traits);
};

/**
 * Track.
 *
 * @param {String} event
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Lytics.prototype.track = function(track){
  var props = track.properties();
  props._e = track.event();
  window.jstag.send(props);
};

}, {"analytics.js-integration":88,"alias":162}],
57: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var alias = require('alias');
var clone = require('clone');
var dates = require('convert-dates');
var integration = require('analytics.js-integration');
var is = require('is');
var iso = require('to-iso-string');
var indexof = require('indexof');
var del = require('obj-case').del;
var some = require('some');

/**
 * Expose `Mixpanel` integration.
 */

var Mixpanel = module.exports = integration('Mixpanel')
  .global('mixpanel')
  .option('increments', [])
  .option('cookieName', '')
  .option('crossSubdomainCookie', false)
  .option('secureCookie', false)
  .option('nameTag', true)
  .option('pageview', false)
  .option('people', false)
  .option('token', '')
  .option('trackAllPages', false)
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .tag('<script src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js">');

/**
 * Options aliases.
 */

var optionsAliases = {
  cookieName: 'cookie_name',
  crossSubdomainCookie: 'cross_subdomain_cookie',
  secureCookie: 'secure_cookie'
};

/**
 * Initialize.
 *
 * https://mixpanel.com/help/reference/javascript#installing
 * https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.init
 */

Mixpanel.prototype.initialize = function(){
  (function(c, a){window.mixpanel = a; var b, d, h, e; a._i = []; a.init = function(b, c, f){function d(a, b){var c = b.split('.'); 2 == c.length && (a = a[c[0]], b = c[1]); a[b] = function(){a.push([b].concat(Array.prototype.slice.call(arguments, 0))); }; } var g = a; 'undefined' !== typeof f ? g = a[f] = [] : f = 'mixpanel'; g.people = g.people || []; h = ['disable', 'track', 'track_pageview', 'track_links', 'track_forms', 'register', 'register_once', 'unregister', 'identify', 'alias', 'name_tag', 'set_config', 'people.set', 'people.increment', 'people.track_charge', 'people.append']; for (e = 0; e < h.length; e++) d(g, h[e]); a._i.push([b, c, f]); }; a.__SV = 1.2; })(document, window.mixpanel || []);
  this.options.increments = lowercase(this.options.increments);
  var options = alias(this.options, optionsAliases);
  window.mixpanel.init(options.token, options);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Mixpanel.prototype.loaded = function(){
  return !! (window.mixpanel && window.mixpanel.config);
};

/**
 * Page.
 *
 * https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_pageview
 *
 * @param {String} category (optional)
 * @param {String} name (optional)
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Mixpanel.prototype.page = function(page){
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  // all pages
  if (opts.trackAllPages) {
    this.track(page.track());
  }

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }
};

/**
 * Trait aliases.
 */

var traitAliases = {
  created: '$created',
  email: '$email',
  firstName: '$first_name',
  lastName: '$last_name',
  lastSeen: '$last_seen',
  name: '$name',
  username: '$username',
  phone: '$phone'
};

/**
 * Identify.
 *
 * https://mixpanel.com/help/reference/javascript#super-properties
 * https://mixpanel.com/help/reference/javascript#user-identity
 * https://mixpanel.com/help/reference/javascript#storing-user-profiles
 *
 * @param {Identify} identify
 */

Mixpanel.prototype.identify = function(identify){
  var username = identify.username();
  var email = identify.email();
  var id = identify.userId();

  // id
  if (id) window.mixpanel.identify(id);

  // name tag
  var nametag = email || username || id;
  if (nametag) window.mixpanel.name_tag(nametag);

  // traits
  var traits = identify.traits(traitAliases);
  if (traits.$created) del(traits, 'createdAt');
  window.mixpanel.register(dates(traits, iso));
  if (this.options.people) window.mixpanel.people.set(traits);
};

/**
 * Track.
 *
 * https://mixpanel.com/help/reference/javascript#sending-events
 * https://mixpanel.com/help/reference/javascript#tracking-revenue
 *
 * @param {Track} track
 */

Mixpanel.prototype.track = function(track){
  var increments = this.options.increments;
  var increment = track.event().toLowerCase();
  var people = this.options.people;
  var props = track.properties();
  var revenue = track.revenue();

  // delete mixpanel's reserved properties, so they don't conflict
  delete props.distinct_id;
  delete props.ip;
  delete props.mp_name_tag;
  delete props.mp_note;
  delete props.token;

  // convert arrays of objects to length, since mixpanel doesn't support object arrays
  for (var key in props) {
    var val = props[key];
    if (is.array(val) && some(val, is.object)) props[key] = val.length;
  }

  // increment properties in mixpanel people
  if (people && ~indexof(increments, increment)) {
    window.mixpanel.people.increment(track.event());
    window.mixpanel.people.set('Last ' + track.event(), new Date);
  }

  // track the event
  props = dates(props, iso);
  window.mixpanel.track(track.event(), props);

  // track revenue specifically
  if (revenue && people) {
    window.mixpanel.people.track_charge(revenue);
  }
};

/**
 * Alias.
 *
 * https://mixpanel.com/help/reference/javascript#user-identity
 * https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.alias
 *
 * @param {Alias} alias
 */

Mixpanel.prototype.alias = function(alias){
  var mp = window.mixpanel;
  var to = alias.to();
  if (mp.get_distinct_id && mp.get_distinct_id() === to) return;
  // HACK: internal mixpanel API to ensure we don't overwrite
  if (mp.get_property && mp.get_property('$people_distinct_id') === to) return;
  // although undocumented, mixpanel takes an optional original id
  mp.alias(to, alias.from());
};

/**
 * Lowercase the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function lowercase(arr){
  var ret = new Array(arr.length);

  for (var i = 0; i < arr.length; ++i) {
    ret[i] = String(arr[i]).toLowerCase();
  }

  return ret;
}

}, {"alias":162,"clone":95,"convert-dates":163,"analytics.js-integration":88,"is":91,"to-iso-string":161,"indexof":116,"obj-case":92,"some":177}],
177: [function(require, module, exports) {

/**
 * some
 */

var some = [].some;

/**
 * test whether some elements in
 * the array pass the test implemented
 * by `fn`.
 *
 * example:
 *
 *          some([1, 'foo', 'bar'], function (el, i) {
 *            return 'string' == typeof el;
 *          });
 *          // > true
 *
 * @param {Array} arr
 * @param {Function} fn
 * @return {bool}
 */

module.exports = function (arr, fn) {
  if (some) return some.call(arr, fn);
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (fn(arr[i], i)) return true;
  }
  return false;
};

}, {}],
58: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var bind = require('bind');
var when = require('when');
var is = require('is');

/**
 * Expose `Mojn`
 */

var Mojn = module.exports = integration('Mojn')
  .option('customerCode', '')
  .global('_mojnTrack')
  .tag('<script src="https://track.idtargeting.com/{{ customerCode }}/track.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Mojn.prototype.initialize = function(){
  window._mojnTrack = window._mojnTrack || [];
  window._mojnTrack.push({ cid: this.options.customerCode });
  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load(function(){
    when(loaded, ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Mojn.prototype.loaded = function(){
  return is.object(window._mojnTrack);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Mojn.prototype.identify = function(identify){
  var email = identify.email();
  if (!email) return;
  var img = new Image();
  img.src = '//matcher.idtargeting.com/identify.gif?cid=' + this.options.customerCode + '&_mjnctid='+email;
  img.width = 1;
  img.height = 1;
  return img;
};

/**
 * Track.
 *
 * @param {Track} event
 */

Mojn.prototype.track = function(track){
  var properties = track.properties();
  var revenue = properties.revenue;
  var currency = properties.currency || '';
  var conv = currency + revenue;
  if (!revenue) return;
  window._mojnTrack.push({ conv: conv });
  return conv;
};

}, {"analytics.js-integration":88,"bind":101,"when":131,"is":91}],
59: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var push = require('global-queue')('_mfq');
var integration = require('analytics.js-integration');
var each = require('each');

/**
 * Expose `Mouseflow`.
 */

var Mouseflow = module.exports = integration('Mouseflow')
  .assumesPageview()
  .global('mouseflow')
  .global('_mfq')
  .option('apiKey', '')
  .option('mouseflowHtmlDelay', 0)
  .tag('<script src="//cdn.mouseflow.com/projects/{{ apiKey }}.js">');

/**
 * Initalize.
 *
 * @param {Object} page
 */

Mouseflow.prototype.initialize = function(page){
  window.mouseflowHtmlDelay = this.options.mouseflowHtmlDelay;
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Mouseflow.prototype.loaded = function(){
  return !! window.mouseflow;
};

/**
 * Page.
 *
 * http://mouseflow.zendesk.com/entries/22528817-Single-page-websites
 *
 * @param {Page} page
 */

Mouseflow.prototype.page = function(page){
  if (!window.mouseflow) return;
  if ('function' != typeof mouseflow.newPageView) return;
  mouseflow.newPageView();
};

/**
 * Identify.
 *
 * http://mouseflow.zendesk.com/entries/24643603-Custom-Variables-Tagging
 *
 * @param {Identify} identify
 */

Mouseflow.prototype.identify = function(identify){
  set(identify.traits());
};

/**
 * Track.
 *
 * http://mouseflow.zendesk.com/entries/24643603-Custom-Variables-Tagging
 *
 * @param {Track} track
 */

Mouseflow.prototype.track = function(track){
  var props = track.properties();
  props.event = track.event();
  set(props);
};

/**
 * Push each key and value in the given `obj` onto the queue.
 *
 * @param {Object} obj
 */

function set(obj){
  each(obj, function(key, value){
    push('setVariable', key, value);
  });
}

}, {"global-queue":158,"analytics.js-integration":88,"each":4}],
60: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var useHttps = require('use-https');
var each = require('each');
var is = require('is');

/**
 * Expose `MouseStats` integration.
 */

var MouseStats = module.exports = integration('MouseStats')
  .assumesPageview()
  .global('msaa')
  .global('MouseStatsVisitorPlaybacks')
  .option('accountNumber', '')
  .tag('http', '<script src="http://www2.mousestats.com/js/{{ path }}.js?{{ cache }}">')
  .tag('https', '<script src="https://ssl.mousestats.com/js/{{ path }}.js?{{ cache }}">');

/**
 * Initialize.
 *
 * http://www.mousestats.com/docs/pages/allpages
 *
 * @param {Object} page
 */

MouseStats.prototype.initialize = function(page){
  var number = this.options.accountNumber;
  var path = number.slice(0,1) + '/' + number.slice(1,2) + '/' + number;
  var cache = Math.floor(new Date().getTime() / 60000);
  var name = useHttps() ? 'https' : 'http';
  this.load(name, { path: path, cache: cache }, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

MouseStats.prototype.loaded = function(){
  return is.array(window.MouseStatsVisitorPlaybacks);
};

/**
 * Identify.
 *
 * http://www.mousestats.com/docs/wiki/7/how-to-add-custom-data-to-visitor-playbacks
 *
 * @param {Identify} identify
 */

MouseStats.prototype.identify = function(identify){
  each(identify.traits(), function(key, value){
    window.MouseStatsVisitorPlaybacks.customVariable(key, value);
  });
};

}, {"analytics.js-integration":88,"use-https":90,"each":4,"is":91}],
61: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('__nls');

/**
 * Expose `Navilytics` integration.
 */

var Navilytics = module.exports = integration('Navilytics')
  .assumesPageview()
  .global('__nls')
  .option('memberId', '')
  .option('projectId', '')
  .tag('<script src="//www.navilytics.com/nls.js?mid={{ memberId }}&pid={{ projectId }}">');

/**
 * Initialize.
 *
 * https://www.navilytics.com/member/code_settings
 *
 * @param {Object} page
 */

Navilytics.prototype.initialize = function(page){
  window.__nls = window.__nls || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Navilytics.prototype.loaded = function(){
  return !! (window.__nls && [].push != window.__nls.push);
};

/**
 * Track.
 *
 * https://www.navilytics.com/docs#tags
 *
 * @param {Track} track
 */

Navilytics.prototype.track = function(track){
  push('tagRecording', track.event());
};

}, {"analytics.js-integration":88,"global-queue":158}],
62: [function(require, module, exports) {
var integration = require('analytics.js-integration');
var alias = require('alias');
var Identify = require('facade').Identify;

/**
 * Expose `plugin`.
 */

/*module.exports = exports = function(analytics){
  analytics.addIntegration(Nudgespot);
};*/

/**
 * Expose `Nudgespot` integration.
 */

var Nudgespot = module.exports = integration('Nudgespot')
  .assumesPageview()
  .option('apiKey', '')
  .global('nudgespot')
  .tag('<script id="nudgespot" src="//cdn.nudgespot.com/nudgespot.js">');

/**
 * Initialize Nudgespot.
 */

Nudgespot.prototype.initialize = function(page){
  window.nudgespot = window.nudgespot || [];
  window.nudgespot.init = function(n, t){function f(n,m){var a=m.split('.');2==a.length&&(n=n[a[0]],m=a[1]);n[m]=function(){n.push([m].concat(Array.prototype.slice.call(arguments,0)))}}n._version=0.1;n._globals=[t];n.people=n.people||[];n.params=n.params||[];m="track register unregister identify set_config people.delete people.create people.update people.create_property people.tag people.remove_Tag".split(" ");for (var i=0;i<m.length;i++)f(n,m[i])};
  window.nudgespot.init(window.nudgespot, this.options.apiKey);
  this.load(this.ready);
};

/**
 * Has the Nudgespot library been loaded yet?
 */

Nudgespot.prototype.loaded = function(){
  return (!! window.nudgespot) && (window.nudgespot.push !== Array.prototype.push);
};

/**
 * Identify a user.
 */

Nudgespot.prototype.identify = function(identify){
  if (!identify.userId()) return this.debug('user id required');
  var traits = identify.traits({ createdAt: 'created' });
  traits = alias(traits, { created: 'created_at' });
  window.nudgespot.identify(identify.userId(), traits);
};

/**
 * Track an event.
 */

Nudgespot.prototype.track = function(track){
  var properties = track.properties();
  window.nudgespot.track(track.event(), properties);
};

}, {"analytics.js-integration":88,"alias":162,"facade":132}],
63: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var https = require('use-https');
var tick = require('next-tick');

/**
 * Expose `Olark` integration.
 */

var Olark = module.exports = integration('Olark')
  .assumesPageview()
  .global('olark')
  .option('identify', true)
  .option('page', true)
  .option('siteId', '')
  .option('groupId', '')
  .option('track', false);

/**
 * Initialize.
 *
 * http://www.olark.com/documentation
 * https://www.olark.com/documentation/javascript/api.chat.setOperatorGroup
 *
 * @param {Facade} page
 */

Olark.prototype.initialize = function(page){
  var self = this;
  this.load(function(){
    tick(self.ready);
  });

  // assign chat to a specific site
  var groupId = this.options.groupId;
  if (groupId) api('chat.setOperatorGroup', { group: groupId });

  // keep track of the widget's open state
  api('box.onExpand', function(){ self._open = true; });
  api('box.onShrink', function(){ self._open = false; });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Olark.prototype.loaded = function(){
  return !! window.olark;
};

/**
 * Load.
 *
 * @param {Function} callback
 */

Olark.prototype.load = function(callback){
  var el = document.getElementById('olark');
  window.olark||(function(c){var f=window,d=document,l=https()?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while (q--) {(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={ 0:+new Date() };a.P=function(u){a.p[u]=new Date()-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return ["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if (!m) {return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if (/MSIE[ ]+6/.test(navigator.userAgent)) {b.src="javascript:false"}b.allowTransparency="true";v[j](b);try {b.contentWindow[g].open()}catch (w) {c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try {var t=b.contentWindow[g];t.write(p());t.close()}catch (x) {b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({ loader: "static.olark.com/jsclient/loader0.js", name:"olark", methods:["configure","extend","declare","identify"] });
  window.olark.identify(this.options.siteId);
  callback();
};

/**
 * Page.
 *
 * @param {Facade} page
 */

Olark.prototype.page = function(page){
  if (!this.options.page) return;
  var props = page.properties();
  var name = page.fullName();
  if (!name && !props.url) return;

  name = name ? name + ' page' : props.url;
  this.notify('looking at ' + name);
};

/**
 * Identify.
 *
 * @param {Facade} identify
 */

Olark.prototype.identify = function(identify){
  if (!this.options.identify) return;

  var username = identify.username();
  var traits = identify.traits();
  var id = identify.userId();
  var email = identify.email();
  var phone = identify.phone();
  var name = identify.name() || identify.firstName();

  if (traits) api('visitor.updateCustomFields', traits);
  if (email) api('visitor.updateEmailAddress', { emailAddress: email });
  if (phone) api('visitor.updatePhoneNumber', { phoneNumber: phone });
  if (name) api('visitor.updateFullName', { fullName: name });

  // figure out best nickname
  var nickname = name || email || username || id;
  if (name && email) nickname += ' (' + email + ')';
  if (nickname) api('chat.updateVisitorNickname', { snippet: nickname });
};

/**
 * Track.
 *
 * @param {Facade} track
 */

Olark.prototype.track = function(track){
  if (!this.options.track) return;
  this.notify('visitor triggered "' + track.event() + '"');
};

/**
 * Send a notification `message` to the operator, only when a chat is active and
 * when the chat is open.
 *
 * @param {String} message
 */

Olark.prototype.notify = function(message){
  if (!this._open) return;

  // lowercase since olark does
  message = message.toLowerCase();

  api('visitor.getDetails', function(data){
    if (!data || !data.isConversing) return;
    api('chat.sendNotificationToOperator', { body: message });
  });
};

/**
 * Helper for Olark API calls.
 *
 * @param {String} action
 * @param {Object} value
 */

function api(action, value) {
  window.olark('api.' + action, value);
}

}, {"analytics.js-integration":88,"use-https":90,"next-tick":103}],
64: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('optimizely');
var callback = require('callback');
var tick = require('next-tick');
var bind = require('bind');
var each = require('each');

/**
 * Expose `Optimizely` integration.
 */

var Optimizely = module.exports = integration('Optimizely')
  .option('variations', true)
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true);

/**
 * Initialize.
 *
 * https://www.optimizely.com/docs/api#function-calls
 */

Optimizely.prototype.initialize = function(){
  if (this.options.variations) {
    var self = this;
    tick(function(){
      self.replay();
    });
  }
  this.ready();
};

/**
 * Track.
 *
 * https://www.optimizely.com/docs/api#track-event
 *
 * @param {Track} track
 */

Optimizely.prototype.track = function(track){
  var props = track.properties();
  if (props.revenue) props.revenue *= 100;
  push('trackEvent', track.event(), props);
};

/**
 * Page.
 *
 * https://www.optimizely.com/docs/api#track-event
 *
 * @param {Page} page
 */

Optimizely.prototype.page = function(page){
  var category = page.category();
  var name = page.fullName();
  var opts = this.options;

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }
};

/**
 * Replay experiment data as traits to other enabled providers.
 *
 * https://www.optimizely.com/docs/api#data-object
 */

Optimizely.prototype.replay = function(){
  if (!window.optimizely) return; // in case the snippet isnt on the page

  var data = window.optimizely.data;
  if (!data || !data.state) return;

  var experiments = data.experiments;
  var map = data.state.variationNamesMap;
  var traits = {};

  each(map, function(experimentId, variation){
    var experiment = experiments[experimentId].name;
    traits['Experiment: ' + experiment] = variation;
  });

  this.analytics.identify(traits);
};

}, {"analytics.js-integration":88,"global-queue":158,"callback":94,"next-tick":103,"bind":101,"each":4}],
65: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_pq');

/**
 * Expose `PerfectAudience` integration.
 */

var PerfectAudience = module.exports = integration('Perfect Audience')
  .assumesPageview()
  .global('_pq')
  .option('siteId', '')
  .tag('<script src="//tag.perfectaudience.com/serve/{{ siteId }}.js">');

/**
 * Initialize.
 *
 * http://support.perfectaudience.com/knowledgebase/articles/212490-visitor-tracking-api
 *
 * @param {Object} page
 */

PerfectAudience.prototype.initialize = function(page){
  window._pq = window._pq || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

PerfectAudience.prototype.loaded = function(){
  return !! (window._pq && window._pq.push);
};

/**
 * Track.
 *
 * http://support.perfectaudience.com/knowledgebase/articles/212490-visitor-tracking-api
 *
 * @param {Track} event
 */

PerfectAudience.prototype.track = function(track){
  var total = track.total() || track.revenue();
  var orderId = track.orderId();
  var props = {};
  var sendProps = false;
  if (total) {
    props.revenue = total;
    sendProps = true;
  }
  if (orderId) {
    props.orderId = orderId;
    sendProps = true;
  }

  if (!sendProps) return push('track', track.event());
  return push('track', track.event(), props);
};

/**
 * Viewed Product.
 *
 * http://support.perfectaudience.com/knowledgebase/articles/212490-visitor-tracking-api
 *
 * @param {Track} event
 */

PerfectAudience.prototype.viewedProduct = function(track){
  var product = track.sku();
  push('track', track.event());
  push('trackProduct', product);
};

/**
 * Completed Purchase.
 *
 * http://support.perfectaudience.com/knowledgebase/articles/212490-visitor-tracking-api
 *
 * @param {Track} event
 */

PerfectAudience.prototype.completedOrder = function(track){
  var total = track.total() || track.revenue();
  var orderId = track.orderId();
  var props = {};
  if (total) props.revenue = total;
  if (orderId) props.orderId = orderId;
  push('track', track.event(), props);
};

}, {"analytics.js-integration":88,"global-queue":158}],
66: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_prum');
var date = require('load-date');

/**
 * Expose `Pingdom` integration.
 */

var Pingdom = module.exports = integration('Pingdom')
  .assumesPageview()
  .global('_prum')
  .global('PRUM_EPISODES')
  .option('id', '')
  .tag('<script src="//rum-static.pingdom.net/prum.min.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Pingdom.prototype.initialize = function(page){
  window._prum = window._prum || [];
  push('id', this.options.id);
  push('mark', 'firstbyte', date.getTime());
  var self = this;
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Pingdom.prototype.loaded = function(){
  return !! (window._prum && window._prum.push !== Array.prototype.push);
};

}, {"analytics.js-integration":88,"global-queue":158,"load-date":159}],
67: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_paq');
var each = require('each');
var is = require('is');

/**
 * Expose `Piwik` integration.
 */

var Piwik = module.exports = integration('Piwik')
  .global('_paq')
  .option('url', null)
  .option('siteId', '')
  .option('customVariableLimit', 5)
  .mapping('goals')
  .tag('<script src="{{ url }}/piwik.js">');

/**
 * Initialize.
 *
 * http://piwik.org/docs/javascript-tracking/#toc-asynchronous-tracking
 */

Piwik.prototype.initialize = function(){
  window._paq = window._paq || [];
  push('setSiteId', this.options.siteId);
  push('setTrackerUrl', this.options.url + '/piwik.php');
  push('enableLinkTracking');
  this.load(this.ready);
};

/**
 * Check if Piwik is loaded
 */

Piwik.prototype.loaded = function(){
  return !! (window._paq && window._paq.push != [].push);
};

/**
 * Page
 *
 * @param {Page} page
 */

Piwik.prototype.page = function(page){
  push('trackPageView');
};

/**
 * Track.
 *
 * @param {Track} track
 */

Piwik.prototype.track = function(track){
  var goals = this.goals(track.event());
  var revenue = track.revenue();
  var category = track.category() || 'All';
  var action = track.event();
  var name = track.proxy('properties.name') || track.proxy('properties.label');
  var value = track.value() || track.revenue();

  var options = track.options('Piwik');
  var customVariables = options.customVars || options.cvar;

  if (!is.object(customVariables)) {
    customVariables = {};
  }

  for (var i = 1; i <= this.options.customVariableLimit; i += 1){
    if (customVariables[i]) {
      push('setCustomVariable', i.toString(), customVariables[i][0], customVariables[i][1], 'page');
    }
  }

  each(goals, function(goal){
    push('trackGoal', goal, revenue);
  });

  push('trackEvent', category, action, name, value);
};

}, {"analytics.js-integration":88,"global-queue":158,"each":4,"is":91}],
68: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var convertDates = require('convert-dates');
var push = require('global-queue')('_preactq');
var alias = require('alias');

/**
 * Expose `Preact` integration.
 */

var Preact = module.exports = integration('Preact')
  .assumesPageview()
  .global('_preactq')
  .global('_lnq')
  .option('projectCode', '')
  .tag('<script src="//d2bbvl6dq48fa6.cloudfront.net/js/preact-4.1.min.js">');

/**
 * Initialize.
 *
 * http://www.preact.io/api/javascript
 *
 * @param {Object} page
 */

Preact.prototype.initialize = function(page){
  window._preactq = window._preactq || [];
  window._lnq = window._lnq || [];
  push('_setCode', this.options.projectCode);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Preact.prototype.loaded = function(){
  return !! (window._preactq && window._preactq.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Preact.prototype.identify = function(identify){
  if (!identify.userId()) return;
  var traits = identify.traits({ created: 'created_at' });
  traits = convertDates(traits, convertDate);
  push('_setPersonData', {
    name: identify.name(),
    email: identify.email(),
    uid: identify.userId(),
    properties: traits
  });
};

/**
 * Group.
 *
 * @param {String} id
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Preact.prototype.group = function(group){
  if (!group.groupId()) return;
  push('_setAccount', group.traits());
};

/**
 * Track.
 *
 * @param {Track} track
 */

Preact.prototype.track = function(track){
  var props = track.properties();
  var revenue = track.revenue();
  var event = track.event();
  var special = { name: event };

  if (revenue) {
    special.revenue = revenue * 100;
    delete props.revenue;
  }

  if (props.note) {
    special.note = props.note;
    delete props.note;
  }

  push('_logEvent', special, props);
};

/**
 * Convert a `date` to a format Preact supports.
 *
 * @param {Date} date
 * @return {Number}
 */

function convertDate(date){
  return Math.floor(date / 1000);
}

}, {"analytics.js-integration":88,"convert-dates":163,"global-queue":158,"alias":162}],
69: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_kiq');
var Facade = require('facade');
var Identify = Facade.Identify;
var bind = require('bind');
var when = require('when');

/**
 * Expose `Qualaroo` integration.
 */

var Qualaroo = module.exports = integration('Qualaroo')
  .assumesPageview()
  .global('_kiq')
  .option('customerId', '')
  .option('siteToken', '')
  .option('track', false)
  .tag('<script src="//s3.amazonaws.com/ki.js/{{ customerId }}/{{ siteToken }}.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Qualaroo.prototype.initialize = function(page){
  window._kiq = window._kiq || [];
  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load(function(){
    when(loaded, ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Qualaroo.prototype.loaded = function(){
  return !! (window._kiq && window._kiq.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * http://help.qualaroo.com/customer/portal/articles/731085-identify-survey-nudge-takers
 * http://help.qualaroo.com/customer/portal/articles/731091-set-additional-user-properties
 *
 * @param {Identify} identify
 */

Qualaroo.prototype.identify = function(identify){
  var traits = identify.traits();
  var id = identify.userId();
  var email = identify.email();
  if (email) id = email;
  if (id) push('identify', id);
  if (traits) push('set', traits);
};

/**
 * Track.
 *
 * @param {String} event
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Qualaroo.prototype.track = function(track){
  if (!this.options.track) return;
  var event = track.event();
  var traits = {};
  traits['Triggered: ' + event] = true;
  this.identify(new Identify({ traits: traits }));
};

}, {"analytics.js-integration":88,"global-queue":158,"facade":132,"bind":101,"when":131}],
70: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var push = require('global-queue')('_qevents', { wrap: false });
var integration = require('analytics.js-integration');
var useHttps = require('use-https');
var is = require('is');
var reduce = require('reduce');

/**
 * Expose `Quantcast` integration.
 */

var Quantcast = module.exports = integration('Quantcast')
  .assumesPageview()
  .global('_qevents')
  .global('__qc')
  .option('pCode', null)
  .option('advertise', false)
  .tag('http', '<script src="http://edge.quantserve.com/quant.js">')
  .tag('https', '<script src="https://secure.quantserve.com/quant.js">');

/**
 * Initialize.
 *
 * https://www.quantcast.com/learning-center/guides/using-the-quantcast-asynchronous-tag/
 * https://www.quantcast.com/help/cross-platform-audience-measurement-guide/
 *
 * @param {Page} page
 */

Quantcast.prototype.initialize = function(page){
  window._qevents = window._qevents || [];

  var opts = this.options;
  var settings = { qacct: opts.pCode };
  var user = this.analytics.user();
  if (user.id()) settings.uid = user.id();

  if (page) {
    settings.labels = this._labels('page', page.category(), page.name());
  }

  push(settings);

  var name = useHttps() ? 'https' : 'http';
  this.load(name, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Quantcast.prototype.loaded = function(){
  return !! window.__qc;
};

/**
 * Page.
 *
 * https://cloudup.com/cBRRFAfq6mf
 *
 * @param {Page} page
 */

Quantcast.prototype.page = function(page){
  var category = page.category();
  var name = page.name();
  var customLabels = page.proxy('properties.label')
  var labels = this._labels('page', category, name, customLabels);

  var settings = {
    event: 'refresh',
    labels: labels,
    qacct: this.options.pCode,
  };
  var user = this.analytics.user();
  if (user.id()) settings.uid = user.id();
  push(settings);
};

/**
 * Identify.
 *
 * https://www.quantcast.com/help/cross-platform-audience-measurement-guide/
 *
 * @param {String} id (optional)
 */

Quantcast.prototype.identify = function(identify){
  // edit the initial quantcast settings
  // TODO: could be done in a cleaner way
  var id = identify.userId();
  if (id) {
    window._qevents[0] = window._qevents[0] || {};
    window._qevents[0].uid = id;
  }
};

/**
 * Track.
 *
 * https://cloudup.com/cBRRFAfq6mf
 *
 * @param {Track} track
 */

Quantcast.prototype.track = function(track){
  var name = track.event();
  var revenue = track.revenue();
  var orderId = track.orderId();
  var customLabels = track.proxy('properties.label');
  var labels = this._labels('event', name, customLabels);

  var settings = {
    event: 'click',
    labels: labels,
    qacct: this.options.pCode
  };

  var user = this.analytics.user();
  if (null != revenue) settings.revenue = (revenue+''); // convert to string
  if (orderId) settings.orderid = orderId;
  if (user.id()) settings.uid = user.id();
  push(settings);
};

/**
 * Completed Order.
 *
 * @param {Track} track
 * @api private
 */

Quantcast.prototype.completedOrder = function(track){
  var name = track.event();
  var revenue = track.total();
  var customLabels = track.proxy('properties.label')
  var labels = this._labels('event', name, customLabels);
  var category = track.category();
  var repeat = track.proxy('properties.repeat');

  if (this.options.advertise && category) {
    labels += ',' + this._labels('pcat', category);
  }

  if ('boolean' == typeof repeat) {
    labels += ',_fp.customer.' + (repeat ? 'repeat' : 'new');
  }

  var settings = {
    event: 'refresh', // the example Quantcast sent has completed order send refresh not click
    labels: labels,
    revenue: (revenue+''), // convert to string
    orderid: track.orderId(),
    qacct: this.options.pCode
  };
  push(settings);
};

/**
 * Generate quantcast labels.
 *
 * Example:
 *
 *    options.advertise = false;
 *    labels('event', 'my event');
 *    // => "event.my event"
 *
 *    options.advertise = true;
 *    labels('event', 'my event');
 *    // => "_fp.event.my event"
 *
 * @param {String} type
 * @param {String} ...
 * @return {String}
 * @api private
 */

Quantcast.prototype._labels = function(type){
  var args = Array.prototype.slice.call(arguments, 1);
  var advertise = this.options.advertise;

  if (advertise && 'page' == type) type = 'event';
  if (advertise) type = '_fp.' + type;

  var separator = advertise ? ' ' : '.';
  var ret = reduce(args, function(ret, arg){
    if (arg != null) {
      ret.push(String(arg).replace(/, /g, ','));
    }
    return ret;
  }, []).join(separator);

  return [type, ret].join('.');
};

}, {"global-queue":158,"analytics.js-integration":88,"use-https":90,"is":91,"reduce":178}],
178: [function(require, module, exports) {

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
}, {}],
71: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var extend = require('extend');
var is = require('is');

/**
 * Expose `Rollbar` integration.
 */

var RollbarIntegration = module.exports = integration('Rollbar')
  .global('Rollbar')
  .option('identify', true)
  .option('accessToken', '')
  .option('environment', 'unknown')
  .option('captureUncaught', true);

/**
 * Initialize.
 *
 * @param {Object} page
 */

RollbarIntegration.prototype.initialize = function(page){
  var _rollbarConfig = this.config = {
    accessToken: this.options.accessToken,
    captureUncaught: this.options.captureUncaught,
    payload: {
      environment: this.options.environment
    }
  };
  // jscs:disable
  (function(a,b){function c(b){this.shimId=++h,this.notifier=null,this.parentShim=b,this.logger=function(){},a.console&&void 0===a.console.shimId&&(this.logger=a.console.log)}function d(b,c,d){a._rollbarWrappedError&&(d[4]||(d[4]=a._rollbarWrappedError),d[5]||(d[5]=a._rollbarWrappedError._rollbarContext),a._rollbarWrappedError=null),b.uncaughtError.apply(b,d),c&&c.apply(a,d)}function e(b){var d=c;return g(function(){if(this.notifier)return this.notifier[b].apply(this.notifier,arguments);var c=this,e="scope"===b;e&&(c=new d(this));var f=Array.prototype.slice.call(arguments,0),g={shim:c,method:b,args:f,ts:new Date};return a._rollbarShimQueue.push(g),e?c:void 0})}function f(a,b){if(b.hasOwnProperty&&b.hasOwnProperty("addEventListener")){var c=b.addEventListener;b.addEventListener=function(b,d,e){c.call(this,b,a.wrap(d),e)};var d=b.removeEventListener;b.removeEventListener=function(a,b,c){d.call(this,a,b&&b._wrapped?b._wrapped:b,c)}}}function g(a,b){return b=b||this.logger,function(){try{return a.apply(this,arguments)}catch(c){b("Rollbar internal error:",c)}}}var h=0;c.init=function(a,b){var e=b.globalAlias||"Rollbar";if("object"==typeof a[e])return a[e];a._rollbarShimQueue=[],a._rollbarWrappedError=null,b=b||{};var h=new c;return g(function(){if(h.configure(b),b.captureUncaught){var c=a.onerror;a.onerror=function(){var a=Array.prototype.slice.call(arguments,0);d(h,c,a)};var g,i,j="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(g=0;g<j.length;++g)i=j[g],a[i]&&a[i].prototype&&f(h,a[i].prototype)}return a[e]=h,h},h.logger)()},c.prototype.loadFull=function(a,b,c,d,e){var f=g(function(){var a=b.createElement("script"),e=b.getElementsByTagName("script")[0];a.src=d.rollbarJsUrl,a.async=!c,a.onload=h,e.parentNode.insertBefore(a,e)},this.logger),h=g(function(){var b;if(void 0===a._rollbarPayloadQueue){var c,d,f,g;for(b=new Error("rollbar.js did not load");c=a._rollbarShimQueue.shift();)for(f=c.args,g=0;g<f.length;++g)if(d=f[g],"function"==typeof d){d(b);break}}"function"==typeof e&&e(b)},this.logger);g(function(){c?f():a.addEventListener?a.addEventListener("load",f,!1):a.attachEvent("onload",f)},this.logger)()},c.prototype.wrap=function(b,c){try{var d;if(d="function"==typeof c?c:function(){return c||{}},"function"!=typeof b)return b;if(b._isWrap)return b;if(!b._wrapped){b._wrapped=function(){try{return b.apply(this,arguments)}catch(c){throw c._rollbarContext=d(),c._rollbarContext._wrappedSource=b.toString(),a._rollbarWrappedError=c,c}},b._wrapped._isWrap=!0;for(var e in b)b.hasOwnProperty(e)&&(b._wrapped[e]=b[e])}return b._wrapped}catch(f){return b}};for(var i="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),j=0;j<i.length;++j)c.prototype[i[j]]=e(i[j]);var k="//d37gvrvc0wt4s1.cloudfront.net/js/v1.1/rollbar.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||k;var l=c.init(a,_rollbarConfig);})(window,document);
  // jscs:enable
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

RollbarIntegration.prototype.loaded = function(){
  return is.object(window.Rollbar) && null == window.Rollbar.shimId;
};

/**
 * Load.
 *
 * @param {Function} callback
 */

RollbarIntegration.prototype.load = function(callback){
  window.Rollbar.loadFull(window, document, true, this.config, callback);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */
RollbarIntegration.prototype.identify = function(identify){
  // do stuff with `id` or `traits`
  if (!this.options.identify) return;

  // Don't allow identify without a user id
  var uid = identify.userId();
  if (uid === null || uid === undefined) return;

  var rollbar = window.Rollbar;
  var person = { id: uid };
  extend(person, identify.traits());
  rollbar.configure({ payload: { person: person }});
};

}, {"analytics.js-integration":88,"extend":130,"is":91}],
72: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `SaaSquatch` integration.
 */

var SaaSquatch = module.exports = integration('SaaSquatch')
  .option('tenantAlias', '')
  .option('referralImage', '')
  .global('_sqh')
  .tag('<script src="//d2rcp9ak152ke1.cloudfront.net/assets/javascripts/squatch.min.js">');

/**
 * Initialize.
 *
 * @param {Page} page
 */

SaaSquatch.prototype.initialize = function(page){
  window._sqh = window._sqh || [];
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

SaaSquatch.prototype.loaded = function(){
  return window._sqh && window._sqh.push != [].push;
};

/**
 * Identify.
 *
 * @param {Facade} identify
 */

SaaSquatch.prototype.identify = function(identify){
  var sqh = window._sqh;
  var accountId = identify.proxy('traits.accountId');
  var paymentProviderId = identify.proxy('traits.paymentProviderId');
  var accountStatus = identify.proxy('traits.accountStatus');
  var referralCode = identify.proxy('traits.referralCode');
  var image = identify.proxy('traits.referralImage') || this.options.referralImage;
  var opts = identify.options(this.name);
  var id = identify.userId();
  var email = identify.email();

  if (!(id || email)) return;
  if (this.called) return;

  var init = {
    tenant_alias: this.options.tenantAlias,
    first_name: identify.firstName(),
    last_name: identify.lastName(),
    user_image: identify.avatar(),
    email: email,
    user_id: id,
  };

  if (accountId) init.account_id = accountId;
  if (paymentProviderId) init.payment_provider_id = paymentProviderId;
  if (init.payment_provider_id == "null") init.payment_provider_id = null;
  if (accountStatus) init.account_status = accountStatus;
  if (referralCode) init.referral_code = referralCode;
  if (opts.checksum) init.checksum = opts.checksum;
  if (image) init.fb_share_image = image;

  sqh.push(['init', init]);
  this.called = true;
  this.load();
};

/**
 * Group.
 *
 * @param {Group} group
 */

SaaSquatch.prototype.group = function(group){
  var sqh = window._sqh;
  var props = group.properties();
  var id = group.groupId();
  var image = group.proxy('traits.referralImage') || this.options.referralImage;
  var opts = group.options(this.name);

  // tenant_alias is required.
  if (this.called) return;

  var init = {
    tenant_alias: this.options.tenantAlias,
    account_id: id
  };

  if (opts.checksum) init.checksum = opts.checksum;
  if (image) init.fb_share_image = image;

  sqh.push(['init', init]);
  this.called = true;
  this.load();
};

}, {"analytics.js-integration":88}],
73: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var when = require('when');

/**
 * Expose `SatisMeter` integration.
 */

var SatisMeter = module.exports = integration('SatisMeter')
  .global('satismeter')
  .option('token', '')
  .tag('<script src="https://app.satismeter.com/satismeter.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

SatisMeter.prototype.initialize = function(page){
  var self = this;
  this.load(function(){
    when(function(){ return self.loaded(); }, self.ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

SatisMeter.prototype.loaded = function(){
  return !!window.satismeter;
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

SatisMeter.prototype.identify = function(identify){
  var traits = identify.traits();

  traits.token = this.options.token;

  traits.user = {
    id: identify.userId()
  };
  if (identify.name()) {
    traits.user.name = identify.name();
  }
  if (identify.email()) {
    traits.user.email = identify.email();
  }
  if (identify.created()) {
    traits.user.signUpDate = identify.created().toISOString();
  }

  // Remove traits that are already passed in user object
  delete traits.id;
  delete traits.email;
  delete traits.name;
  delete traits.created;

  window.satismeter(traits);
};

}, {"analytics.js-integration":88,"when":131}],
74: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var localstorage = require('store');
var protocol = require('protocol');
var utm = require('utm-params');
var ads = require('ad-params');
var send = require('send-json');
var cookie = require('cookie');
var clone = require('clone');
var uuid = require('uuid');
var top = require('top-domain');
var extend = require('extend');
var json = require('segmentio/json@1.0.0');

/**
 * Cookie options
 */

var options = {
  maxage: 31536000000, // 1y
  secure: false,
  path: '/'
};

/**
 * Expose `Segment` integration.
 */

var Segment = exports = module.exports = integration('Segment.io')
  .option('apiKey', '');

/**
 * Get the store.
 *
 * @return {Function}
 */

exports.storage = function(){
  return 'file:' == protocol()
    || 'chrome-extension:' == protocol()
    ? localstorage
    : cookie;
};

/**
 * Expose global for testing.
 */

exports.global = window;

/**
 * Initialize.
 *
 * https://github.com/segmentio/segmentio/blob/master/modules/segmentjs/segment.js/v1/segment.js
 *
 * @param {Object} page
 */

Segment.prototype.initialize = function(page){
  var self = this;
  this.ready();
  this.analytics.on('invoke', function(msg){
    var action = msg.action();
    var listener = 'on' + msg.action();
    self.debug('%s %o', action, msg);
    if (self[listener]) self[listener](msg);
    self.ready();
  });
};

/**
 * Loaded.
 *
 * @return {Boolean}
 */

Segment.prototype.loaded = function(){
  return true;
};

/**
 * Page.
 *
 * @param {Page} page
 */

Segment.prototype.onpage = function(page){
  this.send('/p', page.json());
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Segment.prototype.onidentify = function(identify){
  this.send('/i', identify.json());
};

/**
 * Group.
 *
 * @param {Group} group
 */

Segment.prototype.ongroup = function(group){
  this.send('/g', group.json());
};

/**
 * Track.
 *
 * @param {Track} track
 */

Segment.prototype.ontrack = function(track){
  var json = track.json();
  delete json.traits; // TODO: figure out why we need traits.
  this.send('/t', json);
};

/**
 * Alias.
 *
 * @param {Alias} alias
 */

Segment.prototype.onalias = function(alias){
  var json = alias.json();
  var user = this.analytics.user();
  json.previousId = json.previousId || json.from || user.id() || user.anonymousId();
  json.userId = json.userId || json.to;
  delete json.from;
  delete json.to;
  this.send('/a', json);
};

/**
 * Normalize the given `msg`.
 *
 * @param {Object} msg
 * @api private
 */

Segment.prototype.normalize = function(msg){
  this.debug('normalize %o', msg);
  var user = this.analytics.user();
  var global = exports.global;
  var query = global.location.search;
  var ctx = msg.context = msg.context || msg.options || {};
  delete msg.options;
  msg.writeKey = this.options.apiKey;
  ctx.userAgent = navigator.userAgent;
  if (!ctx.library) ctx.library = { name: 'analytics.js', version: this.analytics.VERSION };
  if (query) ctx.campaign = utm(query);
  this.referrerId(query, ctx);
  msg.userId = msg.userId || user.id();
  msg.anonymousId = user.anonymousId();
  msg.messageId = uuid();
  msg.sentAt = new Date();
  this.debug('normalized %o', msg);
  return msg;
};

/**
 * Send `obj` to `path`.
 *
 * @param {String} path
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

Segment.prototype.send = function(path, msg, fn){
  var url = scheme() + '//api.segment.io/v1' + path;
  var headers = { 'Content-Type': 'text/plain' };
  var fn = fn || noop;
  var self = this;

  // msg
  msg = this.normalize(msg);

  // send
  send(url, msg, headers, function(err, res){
    self.debug('sent %O, received %O', msg, arguments);
    if (err) return fn(err);
    res.url = url;
    fn(null, res);
  });
};

/**
 * Gets/sets cookies on the appropriate domain.
 *
 * @param {String} name
 * @param {Mixed} val
 */

Segment.prototype.cookie = function(name, val){
  var store = Segment.storage();
  if (arguments.length === 1) return store(name);
  var global = exports.global;
  var href = global.location.href;
  var domain = '.' + top(href);
  if ('.' == domain) domain = '';
  this.debug('store domain %s -> %s', href, domain);
  var opts = clone(options);
  opts.domain = domain;
  this.debug('store %s, %s, %o', name, val, opts);
  store(name, val, opts);
  if (store(name)) return;
  delete opts.domain;
  this.debug('fallback store %s, %s, %o', name, val, opts);
  store(name, val, opts);
};

/**
 * Add referrerId to context.
 *
 * TODO: remove.
 *
 * @param {Object} query
 * @param {Object} ctx
 * @api private
 */

Segment.prototype.referrerId = function(query, ctx){
  var stored = this.cookie('s:context.referrer');
  var ad;

  if (stored) stored = json.parse(stored);
  if (query) ad = ads(query);

  ad = ad || stored;

  if (!ad) return;
  ctx.referrer = extend(ctx.referrer || {}, ad);
  this.cookie('s:context.referrer', json.stringify(ad));
}

/**
 * Get the scheme.
 *
 * The function returns `http:`
 * if the protocol is `http:` and
 * `https:` for other protocols.
 *
 * @return {String}
 */

function scheme(){
  return 'http:' == protocol()
    ? 'http:'
    : 'https:';
}

/**
 * Noop
 */

function noop(){}

}, {"analytics.js-integration":88,"store":179,"protocol":180,"utm-params":123,"ad-params":181,"send-json":182,"cookie":183,"clone":95,"uuid":184,"top-domain":124,"extend":130,"segmentio/json@1.0.0":164}],
179: [function(require, module, exports) {

/**
 * dependencies.
 */

var unserialize = require('unserialize');
var each = require('each');
var storage;

/**
 * Safari throws when a user
 * blocks access to cookies / localstorage.
 */

try {
  storage = window.localStorage;
} catch (e) {
  storage = null;
}

/**
 * Expose `store`
 */

module.exports = store;

/**
 * Store the given `key`, `val`.
 *
 * @param {String|Object} key
 * @param {Mixed} value
 * @return {Mixed}
 * @api public
 */

function store(key, value){
  var length = arguments.length;
  if (0 == length) return all();
  if (2 <= length) return set(key, value);
  if (1 != length) return;
  if (null == key) return storage.clear();
  if ('string' == typeof key) return get(key);
  if ('object' == typeof key) return each(key, set);
}

/**
 * supported flag.
 */

store.supported = !! storage;

/**
 * Set `key` to `val`.
 *
 * @param {String} key
 * @param {Mixed} val
 */

function set(key, val){
  return null == val
    ? storage.removeItem(key)
    : storage.setItem(key, JSON.stringify(val));
}

/**
 * Get `key`.
 *
 * @param {String} key
 * @return {Mixed}
 */

function get(key){
  return unserialize(storage.getItem(key));
}

/**
 * Get all.
 *
 * @return {Object}
 */

function all(){
  var len = storage.length;
  var ret = {};
  var key;

  while (0 <= --len) {
    key = storage.key(len);
    ret[key] = get(key);
  }

  return ret;
}

}, {"unserialize":185,"each":112}],
185: [function(require, module, exports) {

/**
 * Unserialize the given "stringified" javascript.
 * 
 * @param {String} val
 * @return {Mixed}
 */

module.exports = function(val){
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
};

}, {}],
180: [function(require, module, exports) {

/**
 * Convenience alias
 */

var define = Object.defineProperty;


/**
 *  The base protocol
 */

var initialProtocol = window.location.protocol;

/**
 * Fallback mocked protocol in case Object.defineProperty doesn't exist.
 */

var mockedProtocol;


module.exports = function (protocol) {
  if (arguments.length === 0) return get();
  else return set(protocol);
};


/**
 * Sets the protocol to be http:
 */

module.exports.http = function () {
  set('http:');
};


/**
 * Sets the protocol to be https:
 */

module.exports.https = function () {
  set('https:');
};


/**
 * Reset to the initial protocol.
 */

module.exports.reset = function () {
  set(initialProtocol);
};


/**
 * Gets the current protocol, using the fallback and then the native protocol.
 *
 * @return {String} protocol
 */

function get () {
  return mockedProtocol || window.location.protocol;
}


/**
 * Sets the protocol
 *
 * @param {String} protocol
 */

function set (protocol) {
  try {
    define(window.location, 'protocol', {
      get: function () { return protocol; }
    });
  } catch (err) {
    mockedProtocol = protocol;
  }
}

}, {}],
181: [function(require, module, exports) {
/**
 * Module dependencies.
 */
 
var parse = require('querystring').parse;
 
/**
 * Expose `ads`
 */
 
module.exports = ads;
 
/**
 * All the ad query params we look for.
 */
 
var QUERYIDS = {
  'btid' : 'dataxu',
  'urid' : 'millennial-media'
};
 
/**
 * Get all ads info from the given `querystring`
 *
 * @param {String} query
 * @return {Object}
 * @api private
 */
 
function ads(query){
  var params = parse(query);
  for (var key in params) {
    for (var id in QUERYIDS) {
      if (key === id) {
        return {
          id : params[key],
          type : QUERYIDS[id]
        };
      }
    }
  }
}
}, {"querystring":125}],
182: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var encode = require('base64-encode');
var cors = require('has-cors');
var jsonp = require('jsonp');
var JSON = require('json');

/**
 * Expose `send`
 */

exports = module.exports = cors
  ? json
  : base64;

/**
 * Expose `callback`
 */

exports.callback = 'callback';

/**
 * Expose `prefix`
 */

exports.prefix = 'data';

/**
 * Expose `json`.
 */

exports.json = json;

/**
 * Expose `base64`.
 */

exports.base64 = base64;

/**
 * Expose `type`
 */

exports.type = cors
  ? 'xhr'
  : 'jsonp';

/**
 * Send the given `obj` to `url` with `fn(err, req)`.
 *
 * @param {String} url
 * @param {Object} obj
 * @param {Object} headers
 * @param {Function} fn
 * @api private
 */

function json(url, obj, headers, fn){
  if (3 == arguments.length) fn = headers, headers = {};

  var req = new XMLHttpRequest;
  req.onerror = fn;
  req.onreadystatechange = done;
  req.open('POST', url, true);
  for (var k in headers) req.setRequestHeader(k, headers[k]);
  req.send(JSON.stringify(obj));

  function done(){
    if (4 == req.readyState) return fn(null, req);
  }
}

/**
 * Send the given `obj` to `url` with `fn(err, req)`.
 *
 * @param {String} url
 * @param {Object} obj
 * @param {Function} fn
 * @api private
 */

function base64(url, obj, _, fn){
  if (3 == arguments.length) fn = _;
  var prefix = exports.prefix;
  obj = encode(JSON.stringify(obj));
  obj = encodeURIComponent(obj);
  url += '?' + prefix + '=' + obj;
  jsonp(url, { param: exports.callback }, function(err, obj){
    if (err) return fn(err);
    fn(null, {
      url: url,
      body: obj
    });
  });
}

}, {"base64-encode":186,"has-cors":187,"jsonp":188,"json":164}],
186: [function(require, module, exports) {
var utf8Encode = require('utf8-encode');
var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

module.exports = encode;
function encode(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = utf8Encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);

    }

    return output;
}
}, {"utf8-encode":189}],
189: [function(require, module, exports) {
module.exports = encode;

function encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
}
}, {}],
187: [function(require, module, exports) {

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

}, {}],
188: [function(require, module, exports) {
/**
 * Module dependencies
 */

var debug = require('debug')('jsonp');

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var prefix = opts.prefix || '__jp';
  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;

  // generate a unique id for this request
  var id = prefix + (count++);

  if (timeout) {
    timer = setTimeout(function(){
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup(){
    script.parentNode.removeChild(script);
    window[id] = noop;
  }

  window[id] = function(data){
    debug('jsonp got', data);
    if (timer) clearTimeout(timer);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);
}

}, {"debug":190}],
190: [function(require, module, exports) {
if ('undefined' == typeof window) {
  module.exports = require('./lib/debug');
} else {
  module.exports = require('./debug');
}

}, {"./lib/debug":191,"./debug":192}],
191: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var tty = require('tty');

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Enabled debuggers.
 */

var names = []
  , skips = [];

(process.env.DEBUG || '')
  .split(/[\s,]+/)
  .forEach(function(name){
    name = name.replace('*', '.*?');
    if (name[0] === '-') {
      skips.push(new RegExp('^' + name.substr(1) + '$'));
    } else {
      names.push(new RegExp('^' + name + '$'));
    }
  });

/**
 * Colors.
 */

var colors = [6, 2, 3, 4, 5, 1];

/**
 * Previous debug() call.
 */

var prev = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Is stdout a TTY? Colored output is disabled when `true`.
 */

var isatty = tty.isatty(2);

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function color() {
  return colors[prevColor++ % colors.length];
}

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

function humanize(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
}

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  function disabled(){}
  disabled.enabled = false;

  var match = skips.some(function(re){
    return re.test(name);
  });

  if (match) return disabled;

  match = names.some(function(re){
    return re.test(name);
  });

  if (!match) return disabled;
  var c = color();

  function colored(fmt) {
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (prev[name] || curr);
    prev[name] = curr;

    fmt = '  \u001b[9' + c + 'm' + name + ' '
      + '\u001b[3' + c + 'm\u001b[90m'
      + fmt + '\u001b[3' + c + 'm'
      + ' +' + humanize(ms) + '\u001b[0m';

    console.error.apply(this, arguments);
  }

  function plain(fmt) {
    fmt = coerce(fmt);

    fmt = new Date().toUTCString()
      + ' ' + name + ' ' + fmt;
    console.error.apply(this, arguments);
  }

  colored.enabled = plain.enabled = true;

  return isatty || process.env.DEBUG_COLORS
    ? colored
    : plain;
}

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {}],
192: [function(require, module, exports) {

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

}, {}],
183: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var debug = require('debug')('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  return parse(document.cookie);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}

}, {"debug":190}],
184: [function(require, module, exports) {

/**
 * Taken straight from jed's gist: https://gist.github.com/982883
 *
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f, and
 * y is replaced with a random hexadecimal digit from 8 to b.
 */

module.exports = function uuid(a){
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e7] +        // 10000000 +
      -1e3 +         // -1000 +
      -4e3 +         // -4000 +
      -8e3 +         // -80000000 +
      -1e11          // -100000000000,
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        uuid         // random hex digits
      )
};
}, {}],
75: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `Sentry` integration.
 */

var Sentry = module.exports = integration('Sentry')
  .global('Raven')
  .option('config', '')
  .tag('<script src="//cdn.ravenjs.com/1.1.16/native/raven.min.js">');

/**
 * Initialize.
 *
 * http://raven-js.readthedocs.org/en/latest/config/index.html
 * https://github.com/getsentry/raven-js/blob/1.1.16/src/raven.js#L734-L741
 */

Sentry.prototype.initialize = function(){
  var dsn = this.options.config;
  window.RavenConfig = { dsn: dsn };
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Sentry.prototype.loaded = function(){
  return is.object(window.Raven);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Sentry.prototype.identify = function(identify){
  window.Raven.setUser(identify.traits());
};

}, {"analytics.js-integration":88,"is":91}],
76: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `SnapEngage` integration.
 */

var SnapEngage = module.exports = integration('SnapEngage')
  .assumesPageview()
  .global('SnapABug')
  .option('apiKey', '')
  .tag('<script src="//www.snapengage.com/cdn/js/{{ apiKey }}.js">');

/**
 * Initialize.
 *
 * http://help.snapengage.com/installation-guide-getting-started-in-a-snap/
 *
 * @param {Object} page
 */

SnapEngage.prototype.initialize = function(page){
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

SnapEngage.prototype.loaded = function(){
  return is.object(window.SnapABug);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

SnapEngage.prototype.identify = function(identify){
  var email = identify.email();
  if (!email) return;
  window.SnapABug.setUserEmail(email);
};

}, {"analytics.js-integration":88,"is":91}],
77: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var bind = require('bind');
var when = require('when');

/**
 * Expose `Spinnakr` integration.
 */

var Spinnakr = module.exports = integration('Spinnakr')
  .assumesPageview()
  .global('_spinnakr_site_id')
  .global('_spinnakr')
  .option('siteId', '')
  .tag('<script src="//d3ojzyhbolvoi5.cloudfront.net/js/so.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Spinnakr.prototype.initialize = function(page){
  window._spinnakr_site_id = this.options.siteId;
  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load(function(){
    when(loaded, ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Spinnakr.prototype.loaded = function(){
  return !! window._spinnakr;
};

}, {"analytics.js-integration":88,"bind":101,"when":131}],
78: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var slug = require('slug');
var push = require('global-queue')('_tsq');

/**
 * Expose `Tapstream` integration.
 */

var Tapstream = module.exports = integration('Tapstream')
  .assumesPageview()
  .global('_tsq')
  .option('accountName', '')
  .option('trackAllPages', true)
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .tag('<script src="//cdn.tapstream.com/static/js/tapstream.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Tapstream.prototype.initialize = function(page){
  window._tsq = window._tsq || [];
  push('setAccountName', this.options.accountName);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Tapstream.prototype.loaded = function(){
  return !! (window._tsq && window._tsq.push !== Array.prototype.push);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Tapstream.prototype.page = function(page){
  var category = page.category();
  var opts = this.options;
  var name = page.fullName();

  // all pages
  if (opts.trackAllPages) {
    this.track(page.track());
  }

  // named pages
  if (name && opts.trackNamedPages) {
    this.track(page.track(name));
  }

  // categorized pages
  if (category && opts.trackCategorizedPages) {
    this.track(page.track(category));
  }
};

/**
 * Track.
 *
 * @param {Track} track
 */

Tapstream.prototype.track = function(track){
  var props = track.properties();
  push('fireHit', slug(track.event()), [props.url]); // needs events as slugs
};

}, {"analytics.js-integration":88,"slug":99,"global-queue":158}],
79: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var alias = require('alias');
var clone = require('clone');

/**
 * Expose `Trakio` integration.
 */

var Trakio = module.exports = integration('trak.io')
  .assumesPageview()
  .global('trak')
  .option('token', '')
  .option('trackNamedPages', true)
  .option('trackCategorizedPages', true)
  .tag('<script src="//d29p64779x43zo.cloudfront.net/v1/trak.io.min.js">');

/**
 * Options aliases.
 */

var optionsAliases = {
  initialPageview: 'auto_track_page_view'
};

/**
 * Initialize.
 *
 * https://docs.trak.io
 *
 * @param {Object} page
 */

Trakio.prototype.initialize = function(page){
  var options = this.options;
  window.trak = window.trak || [];
  window.trak.io = window.trak.io || {};
  window.trak.push = window.trak.push || function(){};
  window.trak.io.load = window.trak.io.load || function(e){var r = function(e){return function(){window.trak.push([e].concat(Array.prototype.slice.call(arguments,0))); }; } ,i=["initialize","identify","track","alias","channel","source","host","protocol","page_view"]; for (var s=0;s<i.length;s++) window.trak.io[i[s]]=r(i[s]); window.trak.io.initialize.apply(window.trak.io,arguments); };
  window.trak.io.load(options.token, alias(options, optionsAliases));
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Trakio.prototype.loaded = function(){
  return !! (window.trak && window.trak.loaded);
};

/**
 * Page.
 *
 * @param {Page} page
 */

Trakio.prototype.page = function(page){
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();

  window.trak.io.page_view(props.path, name || props.title);

  // named pages
  if (name && this.options.trackNamedPages) {
    this.track(page.track(name));
  }

  // categorized pages
  if (category && this.options.trackCategorizedPages) {
    this.track(page.track(category));
  }
};

/**
 * Trait aliases.
 *
 * http://docs.trak.io/properties.html#special
 */

var traitAliases = {
  avatar: 'avatar_url',
  firstName: 'first_name',
  lastName: 'last_name'
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Trakio.prototype.identify = function(identify){
  var traits = identify.traits(traitAliases);
  var id = identify.userId();

  if (id) {
    window.trak.io.identify(id, traits);
  } else {
    window.trak.io.identify(traits);
  }
};

/**
 * Group.
 *
 * @param {String} id (optional)
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 *
 * TODO: add group
 * TODO: add `trait.company/organization` from trak.io docs http://docs.trak.io/properties.html#special
 */

/**
 * Track.
 *
 * @param {Track} track
 */

Trakio.prototype.track = function(track){
  window.trak.io.track(track.event(), track.properties());
};

/**
 * Alias.
 *
 * @param {Alias} alias
 */

Trakio.prototype.alias = function(alias){
  if (!window.trak.io.distinct_id) return;
  var from = alias.from();
  var to = alias.to();

  if (to === window.trak.io.distinct_id()) return;

  if (from) {
    window.trak.io.alias(from, to);
  } else {
    window.trak.io.alias(to);
  }
};

}, {"analytics.js-integration":88,"alias":162,"clone":95}],
80: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var each = require('each');

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `TwitterAds`.
 */

var TwitterAds = module.exports = integration('Twitter Ads')
  .option('page', '')
  .tag('<img src="//analytics.twitter.com/i/adsct?txn_id={{ pixelId }}&p_id=Twitter"/>')
  .mapping('events');

/**
 * Initialize.
 *
 * @param {Object} page
 */

TwitterAds.prototype.initialize = function(){
  this.ready();
};

/**
 * Page.
 *
 * @param {Page} page
 */

TwitterAds.prototype.page = function(page){
  if (this.options.page) {
    this.load({ pixelId: this.options.page });
  }
};

/**
 * Track.
 *
 * @param {Track} track
 */

TwitterAds.prototype.track = function(track){
  var events = this.events(track.event());
  var self = this;
  each(events, function(pixelId){
    self.load({ pixelId: pixelId });
  });
};

}, {"analytics.js-integration":88,"each":4}],
81: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var Identify = require('facade').Identify;
var clone = require('clone');

/**
 * Expose Userlike integration.
 */

var Userlike = module.exports = integration('Userlike')
  .assumesPageview()
  .global('userlikeConfig')
  .global('userlikeData')
  .option('secretKey', '')
  .tag('<script src="//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/{{ secretKey }}.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */
Userlike.prototype.initialize = function(page){
  var self = this;
  var user = this.analytics.user();
  var identify = new Identify({
    userId: user.id(),
    traits: user.traits()
  });

  segment_base_info = clone(this.options);

  segment_base_info.visitor = {
    name: identify.name(),
    email: identify.email()
  };

  if (!window.userlikeData)
    window.userlikeData = {
      custom:{}
    }

  window.userlikeData.custom.segmentio = segment_base_info;

  this.load(function(){
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */
Userlike.prototype.loaded = function(){
  return !! (window.userlikeConfig && window.userlikeData);
};

}, {"analytics.js-integration":88,"facade":132,"clone":95}],
82: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('UserVoice');
var convertDates = require('convert-dates');
var unix = require('to-unix-timestamp');
var alias = require('alias');
var clone = require('clone');

/**
 * Expose `UserVoice` integration.
 */

var UserVoice = module.exports = integration('UserVoice')
  .assumesPageview()
  .global('UserVoice')
  .global('showClassicWidget')
  .option('apiKey', '')
  .option('classic', false)
  .option('forumId', null)
  .option('showWidget', true)
  .option('mode', 'contact')
  .option('accentColor', '#448dd6')
  .option('screenshotEnabled', true)
  .option('smartvote', true)
  .option('trigger', null)
  .option('triggerPosition', 'bottom-right')
  .option('triggerColor', '#ffffff')
  .option('triggerBackgroundColor', 'rgba(46, 49, 51, 0.6)')
  // BACKWARDS COMPATIBILITY: classic options
  .option('classicMode', 'full')
  .option('primaryColor', '#cc6d00')
  .option('linkColor', '#007dbf')
  .option('defaultMode', 'support')
  .option('tabLabel', 'Feedback & Support')
  .option('tabColor', '#cc6d00')
  .option('tabPosition', 'middle-right')
  .option('tabInverted', false)
  .option('customTicketFields', {})
  .tag('<script src="//widget.uservoice.com/{{ apiKey }}.js">');

/**
 * When in "classic" mode, on `construct` swap all of the method to point to
 * their classic counterparts.
 */

UserVoice.on('construct', function(integration){
  if (!integration.options.classic) return;
  integration.group = undefined;
  integration.identify = integration.identifyClassic;
  integration.initialize = integration.initializeClassic;
});

/**
 * Initialize.
 *
 * @param {Object} page
 */

UserVoice.prototype.initialize = function(page){
  var options = this.options;
  var opts = formatOptions(options);
  push('set', opts);
  push('autoprompt', {});
  if (options.showWidget) {
    options.trigger
      ? push('addTrigger', options.trigger, opts)
      : push('addTrigger', opts);
  }

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

UserVoice.prototype.loaded = function(){
  return !! (window.UserVoice && window.UserVoice.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

UserVoice.prototype.identify = function(identify){
  var traits = identify.traits({ created: 'created_at' });
  traits = convertDates(traits, unix);
  push('identify', traits);
};

/**
 * Group.
 *
 * @param {Group} group
 */

UserVoice.prototype.group = function(group){
  var traits = group.traits({ created: 'created_at' });
  traits = convertDates(traits, unix);
  push('identify', { account: traits });
};

/**
 * Initialize (classic).
 *
 * @param {Object} options
 * @param {Function} ready
 */

UserVoice.prototype.initializeClassic = function(){
  var options = this.options;
  window.showClassicWidget = showClassicWidget; // part of public api
  if (options.showWidget) showClassicWidget('showTab', formatClassicOptions(options));
  this.load(this.ready);
};

/**
 * Identify (classic).
 *
 * @param {Identify} identify
 */

UserVoice.prototype.identifyClassic = function(identify){
  push('setCustomFields', identify.traits());
};

/**
 * Format the options for UserVoice.
 *
 * @param {Object} options
 * @return {Object}
 */

function formatOptions(options){
  return alias(options, {
    forumId: 'forum_id',
    accentColor: 'accent_color',
    smartvote: 'smartvote_enabled',
    triggerColor: 'trigger_color',
    triggerBackgroundColor: 'trigger_background_color',
    triggerPosition: 'trigger_position',
    screenshotEnabled: 'screenshot_enabled',
    customTicketFields: 'ticket_custom_fields'
  });
}

/**
 * Format the classic options for UserVoice.
 *
 * @param {Object} options
 * @return {Object}
 */

function formatClassicOptions(options){
  return alias(options, {
    forumId: 'forum_id',
    classicMode: 'mode',
    primaryColor: 'primary_color',
    tabPosition: 'tab_position',
    tabColor: 'tab_color',
    linkColor: 'link_color',
    defaultMode: 'default_mode',
    tabLabel: 'tab_label',
    tabInverted: 'tab_inverted'
  });
}

/**
 * Show the classic version of the UserVoice widget. This method is usually part
 * of UserVoice classic's public API.
 *
 * @param {String} type ('showTab' or 'showLightbox')
 * @param {Object} options (optional)
 */

function showClassicWidget(type, options){
  type = type || 'showLightbox';
  push(type, 'classic_widget', options);
}

}, {"analytics.js-integration":88,"global-queue":158,"convert-dates":163,"to-unix-timestamp":193,"alias":162,"clone":95}],
193: [function(require, module, exports) {

/**
 * Expose `toUnixTimestamp`.
 */

module.exports = toUnixTimestamp;


/**
 * Convert a `date` into a Unix timestamp.
 *
 * @param {Date}
 * @return {Number}
 */

function toUnixTimestamp (date) {
  return Math.floor(date.getTime() / 1000);
}
}, {}],
83: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_veroq');
var cookie = require('component/cookie');
var objCase = require('obj-case');

/**
 * Expose `Vero` integration.
 */

var Vero = module.exports = integration('Vero')
  .global('_veroq')
  .option('apiKey', '')
  .tag('<script src="//d3qxef4rp70elm.cloudfront.net/m.js">');

/**
 * Initialize.
 *
 * https://github.com/getvero/vero-api/blob/master/sections/js.md
 *
 * @param {Object} page
 */

Vero.prototype.initialize = function(page){
  // clear default cookie so vero parses correctly.
  // this is for the tests.
  // basically, they have window.addEventListener('unload')
  // which then saves their "command_store", which is an array.
  // so we just want to create that initially so we can reload the tests.
  if (!cookie('__veroc4')) cookie('__veroc4', '[]');
  push('init', { api_key: this.options.apiKey });
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Vero.prototype.loaded = function(){
  return !! (window._veroq && window._veroq.push !== Array.prototype.push);
};

/**
 * Page.
 *
 * https://www.getvero.com/knowledge-base#/questions/71768-Does-Vero-track-pageviews
 *
 * @param {Page} page
 */

Vero.prototype.page = function(page){
  push('trackPageview');
};

/**
 * Identify.
 *
 * https://github.com/getvero/vero-api/blob/master/sections/js.md#user-identification
 *
 * @param {Identify} identify
 */

Vero.prototype.identify = function(identify){
  var traits = identify.traits();
  var email = identify.email();
  var id = identify.userId();
  if (!id || !email) return; // both required
  push('user', traits);
};

/**
 * Track.
 *
 * https://github.com/getvero/vero-api/blob/master/sections/js.md#tracking-events
 *
 * @param {Track} track
 */

Vero.prototype.track = function(track){
  var regex = /[uU]nsubscribe/;

  if (track.event().match(regex)) {
    push('unsubscribe', { id: track.properties().id });
  } else {
    push('track', track.event(), track.properties());
  }
};

Vero.prototype.alias = function(alias){
  var to = alias.to();

  if (alias.from()) {
    push('reidentify', to, alias.from());
  } else {
    push('reidentify', to);
  }
};

}, {"analytics.js-integration":88,"global-queue":158,"component/cookie":183,"obj-case":92}],
84: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var tick = require('next-tick');
var each = require('each');

/**
 * Expose `VWO` integration.
 */

var VWO = module.exports = integration('Visual Website Optimizer')
  .option('replay', true);

/**
 * Initialize.
 *
 * http://v2.visualwebsiteoptimizer.com/tools/get_tracking_code.php
 */

VWO.prototype.initialize = function(){
  if (this.options.replay) this.replay();
  this.ready();
};

/**
 * Replay the experiments the user has seen as traits to all other integrations.
 * Wait for the next tick to replay so that the `analytics` object and all of
 * the integrations are fully initialized.
 */

VWO.prototype.replay = function(){
  var analytics = this.analytics;
  tick(function(){
    experiments(function(err, traits){
      if (traits) analytics.identify(traits);
    });
  });
};

/**
 * Get dictionary of experiment keys and variations.
 *
 * http://visualwebsiteoptimizer.com/knowledge/integration-of-vwo-with-kissmetrics/
 *
 * @param {Function} fn
 * @return {Object}
 */

function experiments(fn){
  enqueue(function(){
    var data = {};
    var ids = window._vwo_exp_ids;
    if (!ids) return fn();
    each(ids, function(id){
      var name = variation(id);
      if (name) data['Experiment: ' + id] = name;
    });
    fn(null, data);
  });
}

/**
 * Add a `fn` to the VWO queue, creating one if it doesn't exist.
 *
 * @param {Function} fn
 */

function enqueue(fn){
  window._vis_opt_queue = window._vis_opt_queue || [];
  window._vis_opt_queue.push(fn);
}

/**
 * Get the chosen variation's name from an experiment `id`.
 *
 * http://visualwebsiteoptimizer.com/knowledge/integration-of-vwo-with-kissmetrics/
 *
 * @param {String} id
 * @return {String}
 */

function variation(id){
  var experiments = window._vwo_exp;
  if (!experiments) return null;
  var experiment = experiments[id];
  var variationId = experiment.combination_chosen;
  return variationId ? experiment.comb_n[variationId] : null;
}

}, {"analytics.js-integration":88,"next-tick":103,"each":4}],
85: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var useHttps = require('use-https');

/**
 * Expose `WebEngage` integration.
 */

var WebEngage = module.exports = integration('WebEngage')
  .assumesPageview()
  .global('_weq')
  .global('webengage')
  .option('widgetVersion', '4.0')
  .option('licenseCode', '')
  .tag('http', '<script src="http://cdn.widgets.webengage.com/js/widget/webengage-min-v-4.0.js">')
  .tag('https', '<script src="https://ssl.widgets.webengage.com/js/widget/webengage-min-v-4.0.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

WebEngage.prototype.initialize = function(page){
  var _weq = window._weq = window._weq || {};
  _weq['webengage.licenseCode'] = this.options.licenseCode;
  _weq['webengage.widgetVersion'] = this.options.widgetVersion;
  var name = useHttps() ? 'https' : 'http';
  this.load(name, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

WebEngage.prototype.loaded = function(){
  return !! window.webengage;
};

}, {"analytics.js-integration":88,"use-https":90}],
86: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var snake = require('to-snake-case');
var isEmail = require('is-email');
var extend = require('extend');
var each = require('each');
var type = require('type');

/**
 * Expose `Woopra` integration.
 */

var Woopra = module.exports = integration('Woopra')
  .global('woopra')
  .option('domain', '')
  .option('cookieName', 'wooTracker')
  .option('cookieDomain', null)
  .option('cookiePath', '/')
  .option('ping', true)
  .option('pingInterval', 12000)
  .option('idleTimeout', 300000)
  .option('downloadTracking', true)
  .option('outgoingTracking', true)
  .option('outgoingIgnoreSubdomain', true)
  .option('downloadPause', 200)
  .option('outgoingPause', 400)
  .option('ignoreQueryUrl', true)
  .option('hideCampaign', false)
  .tag('<script src="//static.woopra.com/js/w.js">');

/**
 * Initialize.
 *
 * http://www.woopra.com/docs/setup/javascript-tracking/
 *
 * @param {Object} page
 */

Woopra.prototype.initialize = function(page){
  (function(){var i, s, z, w = window, d = document, a = arguments, q = 'script', f = ['config', 'track', 'identify', 'visit', 'push', 'call'], c = function(){var i, self = this; self._e = []; for (i = 0; i < f.length; i++){(function(f){self[f] = function(){self._e.push([f].concat(Array.prototype.slice.call(arguments, 0))); return self; }; })(f[i]); } }; w._w = w._w || {}; for (i = 0; i < a.length; i++){ w._w[a[i]] = w[a[i]] = w[a[i]] || new c(); } })('woopra');
  this.load(this.ready);
  each(this.options, function(key, value){
    key = snake(key);
    if (null == value) return;
    if ('' === value) return;
    window.woopra.config(key, value);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Woopra.prototype.loaded = function(){
  return !! (window.woopra && window.woopra.loaded);
};

/**
 * Page.
 *
 * @param {String} category (optional)
 */

Woopra.prototype.page = function(page){
  var props = page.properties();
  var name = page.fullName();
  if (name) props.title = name;
  window.woopra.track('pv', props);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Woopra.prototype.identify = function(identify){
  var traits = identify.traits();
  if (identify.name()) traits.name = identify.name();
  window.woopra.identify(traits).push(); // `push` sends it off async
};

/**
 * Track.
 *
 * @param {Track} track
 */

Woopra.prototype.track = function(track){
  window.woopra.track(track.event(), track.properties());
};

}, {"analytics.js-integration":88,"to-snake-case":89,"is-email":154,"extend":130,"each":4,"type":113}],
87: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var tick = require('next-tick');
var bind = require('bind');
var when = require('when');

/**
 * Expose `Yandex` integration.
 */

var Yandex = module.exports = integration('Yandex Metrica')
  .assumesPageview()
  .global('yandex_metrika_callbacks')
  .global('Ya')
  .option('counterId', null)
  .option('clickmap', false)
  .option('webvisor', false)
  .tag('<script src="//mc.yandex.ru/metrika/watch.js">');

/**
 * Initialize.
 *
 * http://api.yandex.com/metrika/
 * https://metrica.yandex.com/22522351?step=2#tab=code
 *
 * @param {Object} page
 */

Yandex.prototype.initialize = function(page){
  var id = this.options.counterId;
  var clickmap = this.options.clickmap;
  var webvisor = this.options.webvisor;

  push(function(){
    window['yaCounter' + id] = new window.Ya.Metrika({
      id: id,
      clickmap: clickmap,
      webvisor: webvisor
    });
  });

  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load(function(){
    when(loaded, function(){
      tick(ready);
    });
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Yandex.prototype.loaded = function(){
  return !! (window.Ya && window.Ya.Metrika);
};

/**
 * Push a new callback on the global Yandex queue.
 *
 * @param {Function} callback
 */

function push(callback){
  window.yandex_metrika_callbacks = window.yandex_metrika_callbacks || [];
  window.yandex_metrika_callbacks.push(callback);
}

}, {"analytics.js-integration":88,"next-tick":103,"bind":101,"when":131}],
3: [function(require, module, exports) {

var _analytics = window.analytics;
var after = require('after');
var bind = require('bind');
var callback = require('callback');
var clone = require('clone');
var cookie = require('./cookie');
var debug = require('debug');
var defaults = require('defaults');
var each = require('each');
var Emitter = require('emitter');
var group = require('./group');
var is = require('is');
var isEmail = require('is-email');
var isMeta = require('is-meta');
var newDate = require('new-date');
var on = require('event').bind;
var pageDefaults = require('./pageDefaults');
var pick = require('pick');
var prevent = require('prevent');
var querystring = require('querystring');
var normalize = require('./normalize');
var size = require('object').length;
var keys = require('object').keys;
var memory = require('./memory');
var store = require('./store');
var user = require('./user');
var Facade = require('facade');
var Identify = Facade.Identify;
var Group = Facade.Group;
var Alias = Facade.Alias;
var Track = Facade.Track;
var Page = Facade.Page;

/**
 * Expose `Analytics`.
 */

exports = module.exports = Analytics;

/**
 * Expose storage.
 */

exports.cookie = cookie;
exports.store = store;
exports.memory = memory;

/**
 * Initialize a new `Analytics` instance.
 */

function Analytics () {
  this._options({});
  this.Integrations = {};
  this._integrations = {};
  this._readied = false;
  this._timeout = 300;
  this._user = user; // BACKWARDS COMPATIBILITY
  this.log = debug('analytics.js');
  bind.all(this);

  var self = this;
  this.on('initialize', function(settings, options){
    if (options.initialPageview) self.page();
    self._parseQuery();
  });
}

/**
 * Event Emitter.
 */

Emitter(Analytics.prototype);

/**
 * Use a `plugin`.
 *
 * @param {Function} plugin
 * @return {Analytics}
 */

Analytics.prototype.use = function (plugin) {
  plugin(this);
  return this;
};

/**
 * Define a new `Integration`.
 *
 * @param {Function} Integration
 * @return {Analytics}
 */

Analytics.prototype.addIntegration = function (Integration) {
  var name = Integration.prototype.name;
  if (!name) throw new TypeError('attempted to add an invalid integration');
  this.Integrations[name] = Integration;
  return this;
};

/**
 * Initialize with the given integration `settings` and `options`. Aliased to
 * `init` for convenience.
 *
 * @param {Object} settings
 * @param {Object} options (optional)
 * @return {Analytics}
 */

Analytics.prototype.init =
Analytics.prototype.initialize = function (settings, options) {
  settings = settings || {};
  options = options || {};

  this._options(options);
  this._readied = false;

  // clean unknown integrations from settings
  var self = this;
  each(settings, function (name) {
    var Integration = self.Integrations[name];
    if (!Integration) delete settings[name];
  });

  // add integrations
  each(settings, function (name, opts) {
    var Integration = self.Integrations[name];
    var integration = new Integration(clone(opts));
    self.log('initialize %o - %o', name, opts);
    self.add(integration);
  });

  var integrations = this._integrations;

  // load user now that options are set
  user.load();
  group.load();

  // make ready callback
  var ready = after(size(integrations), function () {
    self._readied = true;
    self.emit('ready');
  });

  // initialize integrations, passing ready
  each(integrations, function (name, integration) {
    if (options.initialPageview && integration.options.initialPageview === false) {
      integration.page = after(2, integration.page);
    }

    integration.analytics = self;
    integration.once('ready', ready);
    integration.initialize();
  });

  // backwards compat with angular plugin.
  // TODO: remove
  this.initialized = true;

  this.emit('initialize', settings, options);
  return this;
};

/**
 * Set the user's `id`.
 *
 * @param {Mixed} id
 */

Analytics.prototype.setAnonymousId = function(id){
  this.user().anonymousId(id);
  return this;
};

/**
 * Add an integration.
 *
 * @param {Integration} integration
 */

Analytics.prototype.add = function(integration){
  this._integrations[integration.name] = integration;
  return this;
};

/**
 * Identify a user by optional `id` and `traits`.
 *
 * @param {String} id (optional)
 * @param {Object} traits (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics}
 */

Analytics.prototype.identify = function (id, traits, options, fn) {
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(traits)) fn = traits, options = null, traits = null;
  if (is.object(id)) options = traits, traits = id, id = user.id();

  // clone traits before we manipulate so we don't do anything uncouth, and take
  // from `user` so that we carryover anonymous traits
  user.identify(id, traits);

  var msg = this.normalize({
    options: options,
    traits: user.traits(),
    userId: user.id(),
  });

  this._invoke('identify', new Identify(msg));

  // emit
  this.emit('identify', id, traits, options);
  this._callback(fn);
  return this;
};

/**
 * Return the current user.
 *
 * @return {Object}
 */

Analytics.prototype.user = function () {
  return user;
};

/**
 * Identify a group by optional `id` and `traits`. Or, if no arguments are
 * supplied, return the current group.
 *
 * @param {String} id (optional)
 * @param {Object} traits (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics or Object}
 */

Analytics.prototype.group = function (id, traits, options, fn) {
  if (0 === arguments.length) return group;
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(traits)) fn = traits, options = null, traits = null;
  if (is.object(id)) options = traits, traits = id, id = group.id();


  // grab from group again to make sure we're taking from the source
  group.identify(id, traits);

  var msg = this.normalize({
    options: options,
    traits: group.traits(),
    groupId: group.id()
  });

  this._invoke('group', new Group(msg));

  this.emit('group', id, traits, options);
  this._callback(fn);
  return this;
};

/**
 * Track an `event` that a user has triggered with optional `properties`.
 *
 * @param {String} event
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics}
 */

Analytics.prototype.track = function (event, properties, options, fn) {
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(properties)) fn = properties, options = null, properties = null;

  // figure out if the event is archived.
  var plan = this.options.plan || {};
  var events = plan.track || {};

  // normalize
  var msg = this.normalize({
    properties: properties,
    options: options,
    event: event
  });

  // plan.
  if (plan = events[event]) {
    this.log('plan %o - %o', event, plan);
    if (false == plan.enabled) return this._callback(fn);
    defaults(msg.integrations, plan.integrations || {});
  }

  this._invoke('track', new Track(msg));

  this.emit('track', event, properties, options);
  this._callback(fn);
  return this;
};

/**
 * Helper method to track an outbound link that would normally navigate away
 * from the page before the analytics calls were sent.
 *
 * BACKWARDS COMPATIBILITY: aliased to `trackClick`.
 *
 * @param {Element or Array} links
 * @param {String or Function} event
 * @param {Object or Function} properties (optional)
 * @return {Analytics}
 */

Analytics.prototype.trackClick =
Analytics.prototype.trackLink = function (links, event, properties) {
  if (!links) return this;
  if (is.element(links)) links = [links]; // always arrays, handles jquery

  var self = this;
  each(links, function (el) {
    if (!is.element(el)) throw new TypeError('Must pass HTMLElement to `analytics.trackLink`.');
    on(el, 'click', function (e) {
      var ev = is.fn(event) ? event(el) : event;
      var props = is.fn(properties) ? properties(el) : properties;
      var href = el.getAttribute('href')
        || el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
        || el.getAttribute('xlink:href');

      self.track(ev, props);

      if (href && el.target !== '_blank' && !isMeta(e)) {
        prevent(e);
        self._callback(function () {
          window.location.href = href;
        });
      }
    });
  });

  return this;
};

/**
 * Helper method to track an outbound form that would normally navigate away
 * from the page before the analytics calls were sent.
 *
 * BACKWARDS COMPATIBILITY: aliased to `trackSubmit`.
 *
 * @param {Element or Array} forms
 * @param {String or Function} event
 * @param {Object or Function} properties (optional)
 * @return {Analytics}
 */

Analytics.prototype.trackSubmit =
Analytics.prototype.trackForm = function (forms, event, properties) {
  if (!forms) return this;
  if (is.element(forms)) forms = [forms]; // always arrays, handles jquery

  var self = this;
  each(forms, function (el) {
    if (!is.element(el)) throw new TypeError('Must pass HTMLElement to `analytics.trackForm`.');
    function handler (e) {
      prevent(e);

      var ev = is.fn(event) ? event(el) : event;
      var props = is.fn(properties) ? properties(el) : properties;
      self.track(ev, props);

      self._callback(function () {
        el.submit();
      });
    }

    // support the events happening through jQuery or Zepto instead of through
    // the normal DOM API, since `el.submit` doesn't bubble up events...
    var $ = window.jQuery || window.Zepto;
    if ($) {
      $(el).submit(handler);
    } else {
      on(el, 'submit', handler);
    }
  });

  return this;
};

/**
 * Trigger a pageview, labeling the current page with an optional `category`,
 * `name` and `properties`.
 *
 * @param {String} category (optional)
 * @param {String} name (optional)
 * @param {Object or String} properties (or path) (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics}
 */

Analytics.prototype.page = function (category, name, properties, options, fn) {
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(properties)) fn = properties, options = properties = null;
  if (is.fn(name)) fn = name, options = properties = name = null;
  if (is.object(category)) options = name, properties = category, name = category = null;
  if (is.object(name)) options = properties, properties = name, name = null;
  if (is.string(category) && !is.string(name)) name = category, category = null;

  properties = clone(properties) || {};
  if (name) properties.name = name;
  if (category) properties.category = category;

  // Ensure properties has baseline spec properties.
  // TODO: Eventually move these entirely to `options.context.page`
  var defs = pageDefaults();
  defaults(properties, defs);

  // Mirror user overrides to `options.context.page` (but exclude custom properties)
  // (Any page defaults get applied in `this.normalize` for consistency.)
  // Weird, yeah--moving special props to `context.page` will fix this in the long term.
  var overrides = pick(keys(defs), properties);
  if (!is.empty(overrides)) {
    options = options || {};
    options.context = options.context || {};
    options.context.page = overrides;
  }

  var msg = this.normalize({
    properties: properties,
    category: category,
    options: options,
    name: name
  });

  this._invoke('page', new Page(msg));

  this.emit('page', category, name, properties, options);
  this._callback(fn);
  return this;
};

/**
 * BACKWARDS COMPATIBILITY: convert an old `pageview` to a `page` call.
 *
 * @param {String} url (optional)
 * @param {Object} options (optional)
 * @return {Analytics}
 * @api private
 */

Analytics.prototype.pageview = function (url, options) {
  var properties = {};
  if (url) properties.path = url;
  this.page(properties);
  return this;
};

/**
 * Merge two previously unassociated user identities.
 *
 * @param {String} to
 * @param {String} from (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics}
 */

Analytics.prototype.alias = function (to, from, options, fn) {
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(from)) fn = from, options = null, from = null;
  if (is.object(from)) options = from, from = null;

  var msg = this.normalize({
    options: options,
    previousId: from,
    userId: to
  });

  this._invoke('alias', new Alias(msg));

  this.emit('alias', to, from, options);
  this._callback(fn);
  return this;
};

/**
 * Register a `fn` to be fired when all the analytics services are ready.
 *
 * @param {Function} fn
 * @return {Analytics}
 */

Analytics.prototype.ready = function (fn) {
  if (!is.fn(fn)) return this;
  this._readied
    ? callback.async(fn)
    : this.once('ready', fn);
  return this;
};

/**
 * Set the `timeout` (in milliseconds) used for callbacks.
 *
 * @param {Number} timeout
 */

Analytics.prototype.timeout = function (timeout) {
  this._timeout = timeout;
};

/**
 * Enable or disable debug.
 *
 * @param {String or Boolean} str
 */

Analytics.prototype.debug = function(str){
  if (0 == arguments.length || str) {
    debug.enable('analytics:' + (str || '*'));
  } else {
    debug.disable();
  }
};

/**
 * Apply options.
 *
 * @param {Object} options
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._options = function (options) {
  options = options || {};
  this.options = options;
  cookie.options(options.cookie);
  store.options(options.localStorage);
  user.options(options.user);
  group.options(options.group);
  return this;
};

/**
 * Callback a `fn` after our defined timeout period.
 *
 * @param {Function} fn
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._callback = function (fn) {
  callback.async(fn, this._timeout);
  return this;
};

/**
 * Call `method` with `facade` on all enabled integrations.
 *
 * @param {String} method
 * @param {Facade} facade
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._invoke = function (method, facade) {
  var options = facade.options();

  this.emit('invoke', facade);

  each(this._integrations, function (name, integration) {
    if (!facade.enabled(name)) return;
    integration.invoke.call(integration, method, facade);
  });

  return this;
};

/**
 * Push `args`.
 *
 * @param {Array} args
 * @api private
 */

Analytics.prototype.push = function(args){
  var method = args.shift();
  if (!this[method]) return;
  this[method].apply(this, args);
};

/**
 * Reset group and user traits and id's.
 *
 * @api public
 */

Analytics.prototype.reset = function(){
  this.user().logout();
  this.group().logout();
};

/**
 * Parse the query string for callable methods.
 *
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._parseQuery = function () {
  // Identify and track any `ajs_uid` and `ajs_event` parameters in the URL.
  var q = querystring.parse(window.location.search);
  if (q.ajs_uid) this.identify(q.ajs_uid);
  if (q.ajs_event) this.track(q.ajs_event);
  if (q.ajs_aid) user.anonymousId(q.ajs_aid);
  return this;
};

/**
 * Normalize the given `msg`.
 *
 * @param {Object} msg
 * @return {Object}
 */

Analytics.prototype.normalize = function(msg){
  msg = normalize(msg, keys(this._integrations));
  if (msg.anonymousId) user.anonymousId(msg.anonymousId);
  msg.anonymousId = user.anonymousId();

  // Ensure all outgoing requests include page data in their contexts.
  msg.context.page = defaults(msg.context.page || {}, pageDefaults());

  return msg;
};

/**
 * No conflict support.
 */

Analytics.prototype.noConflict = function(){
  window.analytics = _analytics;
  return this;
};


}, {"after":111,"bind":194,"callback":94,"clone":95,"./cookie":195,"debug":190,"defaults":97,"each":4,"emitter":110,"./group":196,"is":91,"is-email":154,"is-meta":197,"new-date":146,"event":198,"./pageDefaults":199,"pick":200,"prevent":201,"querystring":202,"./normalize":203,"object":170,"./memory":204,"./store":205,"./user":206,"facade":132}],
194: [function(require, module, exports) {

try {
  var bind = require('bind');
} catch (e) {
  var bind = require('bind-component');
}

var bindAll = require('bind-all');


/**
 * Expose `bind`.
 */

module.exports = exports = bind;


/**
 * Expose `bindAll`.
 */

exports.all = bindAll;


/**
 * Expose `bindMethods`.
 */

exports.methods = bindMethods;


/**
 * Bind `methods` on `obj` to always be called with the `obj` as context.
 *
 * @param {Object} obj
 * @param {String} methods...
 */

function bindMethods (obj, methods) {
  methods = [].slice.call(arguments, 1);
  for (var i = 0, method; method = methods[i]; i++) {
    obj[method] = bind(obj, obj[method]);
  }
  return obj;
}
}, {"bind":101,"bind-all":102}],
195: [function(require, module, exports) {

var debug = require('debug')('analytics.js:cookie');
var bind = require('bind');
var cookie = require('cookie');
var clone = require('clone');
var defaults = require('defaults');
var json = require('json');
var topDomain = require('top-domain');


/**
 * Initialize a new `Cookie` with `options`.
 *
 * @param {Object} options
 */

function Cookie (options) {
  this.options(options);
}


/**
 * Get or set the cookie options.
 *
 * @param {Object} options
 *   @field {Number} maxage (1 year)
 *   @field {String} domain
 *   @field {String} path
 *   @field {Boolean} secure
 */

Cookie.prototype.options = function (options) {
  if (arguments.length === 0) return this._options;

  options = options || {};

  var domain = '.' + topDomain(window.location.href);

  this._options = defaults(options, {
    maxage: 31536000000, // default to a year
    path: '/',
    domain: domain
  });

  // http://curl.haxx.se/rfc/cookie_spec.html
  // https://publicsuffix.org/list/effective_tld_names.dat
  //
  // try setting a dummy cookie with the options
  // if the cookie isn't set, it probably means
  // that the domain is on the public suffix list
  // like myapp.herokuapp.com or localhost / ip.
  this.set('ajs:test', true);
  if (!this.get('ajs:test')) {
    debug('fallback to domain=null');
    this._options.domain = null;
  }
  this.remove('ajs:test');
};


/**
 * Set a `key` and `value` in our cookie.
 *
 * @param {String} key
 * @param {Object} value
 * @return {Boolean} saved
 */

Cookie.prototype.set = function (key, value) {
  try {
    value = json.stringify(value);
    cookie(key, value, clone(this._options));
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * Get a value from our cookie by `key`.
 *
 * @param {String} key
 * @return {Object} value
 */

Cookie.prototype.get = function (key) {
  try {
    var value = cookie(key);
    value = value ? json.parse(value) : null;
    return value;
  } catch (e) {
    return null;
  }
};


/**
 * Remove a value from our cookie by `key`.
 *
 * @param {String} key
 * @return {Boolean} removed
 */

Cookie.prototype.remove = function (key) {
  try {
    cookie(key, null, clone(this._options));
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * Expose the cookie singleton.
 */

module.exports = bind.all(new Cookie());


/**
 * Expose the `Cookie` constructor.
 */

module.exports.Cookie = Cookie;

}, {"debug":190,"bind":194,"cookie":183,"clone":95,"defaults":97,"json":164,"top-domain":124}],
196: [function(require, module, exports) {

var debug = require('debug')('analytics:group');
var Entity = require('./entity');
var inherit = require('inherit');
var bind = require('bind');


/**
 * Group defaults
 */

Group.defaults = {
  persist: true,
  cookie: {
    key: 'ajs_group_id'
  },
  localStorage: {
    key: 'ajs_group_properties'
  }
};


/**
 * Initialize a new `Group` with `options`.
 *
 * @param {Object} options
 */

function Group (options) {
  this.defaults = Group.defaults;
  this.debug = debug;
  Entity.call(this, options);
}


/**
 * Inherit `Entity`
 */

inherit(Group, Entity);


/**
 * Expose the group singleton.
 */

module.exports = bind.all(new Group());


/**
 * Expose the `Group` constructor.
 */

module.exports.Group = Group;

}, {"debug":190,"./entity":207,"inherit":208,"bind":194}],
207: [function(require, module, exports) {

var debug = require('debug')('analytics:entity');
var traverse = require('isodate-traverse');
var defaults = require('defaults');
var memory = require('./memory');
var cookie = require('./cookie');
var store = require('./store');
var extend = require('extend');
var clone = require('clone');


/**
 * Expose `Entity`
 */

module.exports = Entity;


/**
 * Initialize new `Entity` with `options`.
 *
 * @param {Object} options
 */

function Entity(options){
  this.options(options);
  this.initialize();
}

/**
 * Initialize picks the storage.
 *
 * Checks to see if cookies can be set
 * otherwise fallsback to localStorage.
 */

Entity.prototype.initialize = function(){
  cookie.set('ajs:cookies', true);

  // cookies are enabled.
  if (cookie.get('ajs:cookies')) {
    cookie.remove('ajs:cookies');
    this._storage = cookie;
    return;
  }

  // localStorage is enabled.
  if (store.enabled) {
    this._storage = store;
    return;
  }

  // fallback to memory storage.
  debug('warning using memory store both cookies and localStorage are disabled');
  this._storage = memory;
};

/**
 * Get the storage.
 */

Entity.prototype.storage = function(){
  return this._storage;
};


/**
 * Get or set storage `options`.
 *
 * @param {Object} options
 *   @property {Object} cookie
 *   @property {Object} localStorage
 *   @property {Boolean} persist (default: `true`)
 */

Entity.prototype.options = function (options) {
  if (arguments.length === 0) return this._options;
  options || (options = {});
  defaults(options, this.defaults || {});
  this._options = options;
};


/**
 * Get or set the entity's `id`.
 *
 * @param {String} id
 */

Entity.prototype.id = function (id) {
  switch (arguments.length) {
    case 0: return this._getId();
    case 1: return this._setId(id);
  }
};


/**
 * Get the entity's id.
 *
 * @return {String}
 */

Entity.prototype._getId = function () {
  var ret = this._options.persist
    ? this.storage().get(this._options.cookie.key)
    : this._id;
  return ret === undefined ? null : ret;
};


/**
 * Set the entity's `id`.
 *
 * @param {String} id
 */

Entity.prototype._setId = function (id) {
  if (this._options.persist) {
    this.storage().set(this._options.cookie.key, id);
  } else {
    this._id = id;
  }
};


/**
 * Get or set the entity's `traits`.
 *
 * BACKWARDS COMPATIBILITY: aliased to `properties`
 *
 * @param {Object} traits
 */

Entity.prototype.properties =
Entity.prototype.traits = function (traits) {
  switch (arguments.length) {
    case 0: return this._getTraits();
    case 1: return this._setTraits(traits);
  }
};


/**
 * Get the entity's traits. Always convert ISO date strings into real dates,
 * since they aren't parsed back from local storage.
 *
 * @return {Object}
 */

Entity.prototype._getTraits = function () {
  var ret = this._options.persist
    ? store.get(this._options.localStorage.key)
    : this._traits;
  return ret ? traverse(clone(ret)) : {};
};


/**
 * Set the entity's `traits`.
 *
 * @param {Object} traits
 */

Entity.prototype._setTraits = function (traits) {
  traits || (traits = {});
  if (this._options.persist) {
    store.set(this._options.localStorage.key, traits);
  } else {
    this._traits = traits;
  }
};


/**
 * Identify the entity with an `id` and `traits`. If we it's the same entity,
 * extend the existing `traits` instead of overwriting.
 *
 * @param {String} id
 * @param {Object} traits
 */

Entity.prototype.identify = function (id, traits) {
  traits || (traits = {});
  var current = this.id();
  if (current === null || current === id) traits = extend(this.traits(), traits);
  if (id) this.id(id);
  this.debug('identify %o, %o', id, traits);
  this.traits(traits);
  this.save();
};


/**
 * Save the entity to local storage and the cookie.
 *
 * @return {Boolean}
 */

Entity.prototype.save = function () {
  if (!this._options.persist) return false;
  cookie.set(this._options.cookie.key, this.id());
  store.set(this._options.localStorage.key, this.traits());
  return true;
};


/**
 * Log the entity out, reseting `id` and `traits` to defaults.
 */

Entity.prototype.logout = function () {
  this.id(null);
  this.traits({});
  cookie.remove(this._options.cookie.key);
  store.remove(this._options.localStorage.key);
};


/**
 * Reset all entity state, logging out and returning options to defaults.
 */

Entity.prototype.reset = function () {
  this.logout();
  this.options({});
};


/**
 * Load saved entity `id` or `traits` from storage.
 */

Entity.prototype.load = function () {
  this.id(cookie.get(this._options.cookie.key));
  this.traits(store.get(this._options.localStorage.key));
};


}, {"debug":190,"isodate-traverse":142,"defaults":97,"./memory":204,"./cookie":195,"./store":205,"extend":130,"clone":95}],
204: [function(require, module, exports) {

/**
 * Module Dependencies.
 */

var clone = require('clone');
var bind = require('bind');

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `Memory`
 */

module.exports = bind.all(new Memory);

/**
 * Initialize `Memory` store
 */

function Memory(){
  this.store = {};
}

/**
 * Set a `key` and `value`.
 *
 * @param {String} key
 * @param {Mixed} value
 * @return {Boolean}
 */

Memory.prototype.set = function(key, value){
  this.store[key] = clone(value);
  return true;
};

/**
 * Get a `key`.
 *
 * @param {String} key
 */

Memory.prototype.get = function(key){
  if (!has.call(this.store, key)) return;
  return clone(this.store[key]);
};

/**
 * Remove a `key`.
 *
 * @param {String} key
 * @return {Boolean}
 */

Memory.prototype.remove = function(key){
  delete this.store[key];
  return true;
};
}, {"clone":95,"bind":194}],
205: [function(require, module, exports) {

var bind = require('bind');
var defaults = require('defaults');
var store = require('store.js');


/**
 * Initialize a new `Store` with `options`.
 *
 * @param {Object} options
 */

function Store (options) {
  this.options(options);
}


/**
 * Set the `options` for the store.
 *
 * @param {Object} options
 *   @field {Boolean} enabled (true)
 */

Store.prototype.options = function (options) {
  if (arguments.length === 0) return this._options;

  options = options || {};
  defaults(options, { enabled : true });

  this.enabled  = options.enabled && store.enabled;
  this._options = options;
};


/**
 * Set a `key` and `value` in local storage.
 *
 * @param {String} key
 * @param {Object} value
 */

Store.prototype.set = function (key, value) {
  if (!this.enabled) return false;
  return store.set(key, value);
};


/**
 * Get a value from local storage by `key`.
 *
 * @param {String} key
 * @return {Object}
 */

Store.prototype.get = function (key) {
  if (!this.enabled) return null;
  return store.get(key);
};


/**
 * Remove a value from local storage by `key`.
 *
 * @param {String} key
 */

Store.prototype.remove = function (key) {
  if (!this.enabled) return false;
  return store.remove(key);
};


/**
 * Expose the store singleton.
 */

module.exports = bind.all(new Store());


/**
 * Expose the `Store` constructor.
 */

module.exports.Store = Store;

}, {"bind":194,"defaults":97,"store.js":209}],
209: [function(require, module, exports) {
var json             = require('json')
  , store            = {}
  , win              = window
	,	doc              = win.document
	,	localStorageName = 'localStorage'
	,	namespace        = '__storejs__'
	,	storage;

store.disabled = false
store.set = function(key, value) {}
store.get = function(key) {}
store.remove = function(key) {}
store.clear = function() {}
store.transact = function(key, defaultVal, transactionFn) {
	var val = store.get(key)
	if (transactionFn == null) {
		transactionFn = defaultVal
		defaultVal = null
	}
	if (typeof val == 'undefined') { val = defaultVal || {} }
	transactionFn(val)
	store.set(key, val)
}
store.getAll = function() {}

store.serialize = function(value) {
	return json.stringify(value)
}
store.deserialize = function(value) {
	if (typeof value != 'string') { return undefined }
	try { return json.parse(value) }
	catch(e) { return value || undefined }
}

// Functions to encapsulate questionable FireFox 3.6.13 behavior
// when about.config::dom.storage.enabled === false
// See https://github.com/marcuswestin/store.js/issues#issue/13
function isLocalStorageNameSupported() {
	try { return (localStorageName in win && win[localStorageName]) }
	catch(err) { return false }
}

if (isLocalStorageNameSupported()) {
	storage = win[localStorageName]
	store.set = function(key, val) {
		if (val === undefined) { return store.remove(key) }
		storage.setItem(key, store.serialize(val))
		return val
	}
	store.get = function(key) { return store.deserialize(storage.getItem(key)) }
	store.remove = function(key) { storage.removeItem(key) }
	store.clear = function() { storage.clear() }
	store.getAll = function() {
		var ret = {}
		for (var i=0; i<storage.length; ++i) {
			var key = storage.key(i)
			ret[key] = store.get(key)
		}
		return ret
	}
} else if (doc.documentElement.addBehavior) {
	var storageOwner,
		storageContainer
	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<s' + 'cript>document.w=window</s' + 'cript><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storage = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storage = doc.createElement('div')
		storageOwner = doc.body
	}
	function withIEStorage(storeFunction) {
		return function() {
			var args = Array.prototype.slice.call(arguments, 0)
			args.unshift(storage)
			// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
			// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
			storageOwner.appendChild(storage)
			storage.addBehavior('#default#userData')
			storage.load(localStorageName)
			var result = storeFunction.apply(store, args)
			storageOwner.removeChild(storage)
			return result
		}
	}

	// In IE7, keys may not contain special chars. See all of https://github.com/marcuswestin/store.js/issues/40
	var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
	function ieKeyFix(key) {
		return key.replace(forbiddenCharsRegex, '___')
	}
	store.set = withIEStorage(function(storage, key, val) {
		key = ieKeyFix(key)
		if (val === undefined) { return store.remove(key) }
		storage.setAttribute(key, store.serialize(val))
		storage.save(localStorageName)
		return val
	})
	store.get = withIEStorage(function(storage, key) {
		key = ieKeyFix(key)
		return store.deserialize(storage.getAttribute(key))
	})
	store.remove = withIEStorage(function(storage, key) {
		key = ieKeyFix(key)
		storage.removeAttribute(key)
		storage.save(localStorageName)
	})
	store.clear = withIEStorage(function(storage) {
		var attributes = storage.XMLDocument.documentElement.attributes
		storage.load(localStorageName)
		for (var i=0, attr; attr=attributes[i]; i++) {
			storage.removeAttribute(attr.name)
		}
		storage.save(localStorageName)
	})
	store.getAll = withIEStorage(function(storage) {
		var attributes = storage.XMLDocument.documentElement.attributes
		var ret = {}
		for (var i=0, attr; attr=attributes[i]; ++i) {
			var key = ieKeyFix(attr.name)
			ret[attr.name] = store.deserialize(storage.getAttribute(key))
		}
		return ret
	})
}

try {
	store.set(namespace, namespace)
	if (store.get(namespace) != namespace) { store.disabled = true }
	store.remove(namespace)
} catch(e) {
	store.disabled = true
}
store.enabled = !store.disabled

module.exports = store;
}, {"json":164}],
208: [function(require, module, exports) {

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
}, {}],
197: [function(require, module, exports) {
module.exports = function isMeta (e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return true;

    // Logic that handles checks for the middle mouse button, based
    // on [jQuery](https://github.com/jquery/jquery/blob/master/src/event.js#L466).
    var which = e.which, button = e.button;
    if (!which && button !== undefined) {
      return (!button & 1) && (!button & 2) && (button & 4);
    } else if (which === 2) {
      return true;
    }

    return false;
};
}, {}],
198: [function(require, module, exports) {

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (el.addEventListener) {
    el.addEventListener(type, fn, capture || false);
  } else {
    el.attachEvent('on' + type, fn);
  }
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, capture || false);
  } else {
    el.detachEvent('on' + type, fn);
  }
  return fn;
};

}, {}],
199: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var canonical = require('canonical');
var url = require('url');

/**
 * Return a default `options.context.page` object.
 *
 * https://segment.com/docs/spec/page/#properties
 *
 * @return {Object}
 */

function pageDefaults() {
  return {
    path: canonicalPath(),
    referrer: document.referrer,
    search: location.search,
    title: document.title,
    url: canonicalUrl(location.search)
  };
}

/**
 * Return the canonical path for the page.
 *
 * @return {String}
 */

function canonicalPath () {
  var canon = canonical();
  if (!canon) return window.location.pathname;
  var parsed = url.parse(canon);
  return parsed.pathname;
}

/**
 * Return the canonical URL for the page concat the given `search`
 * and strip the hash.
 *
 * @param {String} search
 * @return {String}
 */

function canonicalUrl (search) {
  var canon = canonical();
  if (canon) return ~canon.indexOf('?') ? canon : canon + search;
  var url = window.location.href;
  var i = url.indexOf('#');
  return -1 === i ? url : url.slice(0, i);
}

/**
 * Exports.
 */

module.exports = pageDefaults;

}, {"canonical":171,"url":173}],
200: [function(require, module, exports) {
'use strict';

var objToString = Object.prototype.toString;

// TODO: Move to lib
var existy = function(val) {
  return val != null;
};

// TODO: Move to lib
var isArray = function(val) {
  return objToString.call(val) === '[object Array]';
};

// TODO: Move to lib
var isString = function(val) {
   return typeof val === 'string' || objToString.call(val) === '[object String]';
};

// TODO: Move to lib
var isObject = function(val) {
  return val != null && typeof val === 'object';
};

/**
 * Returns a copy of the new `object` containing only the specified properties.
 *
 * @name pick
 * @api public
 * @category Object
 * @see {@link omit}
 * @param {Array.<string>|string} props The property or properties to keep.
 * @param {Object} object The object to iterate over.
 * @return {Object} A new object containing only the specified properties from `object`.
 * @example
 * var person = { name: 'Tim', occupation: 'enchanter', fears: 'rabbits' };
 *
 * pick('name', person);
 * //=> { name: 'Tim' }
 *
 * pick(['name', 'fears'], person);
 * //=> { name: 'Tim', fears: 'rabbits' }
 */

var pick = function pick(props, object) {
  if (!existy(object) || !isObject(object)) {
    return {};
  }

  if (isString(props)) {
    props = [props];
  }

  if (!isArray(props)) {
    props = [];
  }

  var result = {};

  for (var i = 0; i < props.length; i += 1) {
    if (isString(props[i]) && props[i] in object) {
      result[props[i]] = object[props[i]];
    }
  }

  return result;
};

/**
 * Exports.
 */

module.exports = pick;

}, {}],
201: [function(require, module, exports) {

/**
 * prevent default on the given `e`.
 * 
 * examples:
 * 
 *      anchor.onclick = prevent;
 *      anchor.onclick = function(e){
 *        if (something) return prevent(e);
 *      };
 * 
 * @param {Event} e
 */

module.exports = function(e){
  e = e || window.event
  return e.preventDefault
    ? e.preventDefault()
    : e.returnValue = false;
};

}, {}],
202: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var encode = encodeURIComponent;
var decode = decodeURIComponent;
var trim = require('trim');
var type = require('type');

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = /(\w+)\[(\d+)\]/.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};

}, {"trim":126,"type":7}],
203: [function(require, module, exports) {

/**
 * Module Dependencies.
 */

var debug = require('debug')('analytics.js:normalize');
var indexof = require('component/indexof');
var defaults = require('defaults');
var map = require('component/map');
var each = require('each');
var is = require('is');

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `normalize`
 */

module.exports = normalize;

/**
 * Toplevel properties.
 */

var toplevel = [
  'integrations',
  'anonymousId',
  'timestamp',
  'context'
];

/**
 * Normalize `msg` based on integrations `list`.
 *
 * @param {Object} msg
 * @param {Array} list
 * @return {Function}
 */

function normalize(msg, list){
  var lower = map(list, function(s){ return s.toLowerCase(); });
  var opts = msg.options || {};
  var integrations = opts.integrations || {};
  var providers = opts.providers || {};
  var context = opts.context || {};
  var ret = {};
  debug('<-', msg);

  // integrations.
  each(opts, function(key, value){
    if (!integration(key)) return;
    if (!has.call(integrations, key)) integrations[key] = value;
    delete opts[key];
  });

  // providers.
  delete opts.providers;
  each(providers, function(key, value){
    if (!integration(key)) return;
    if (is.object(integrations[key])) return;
    if (has.call(integrations, key) && 'boolean' == typeof providers[key]) return;
    integrations[key] = value;
  });

  // move all toplevel options to msg
  // and the rest to context.
  each(opts, function(key){
    if (~indexof(toplevel, key)) {
      ret[key] = opts[key];
    } else {
      context[key] = opts[key];
    }
  });

  // cleanup
  delete msg.options;
  ret.integrations = integrations;
  ret.context = context;
  ret = defaults(ret, msg);
  debug('->', ret);
  return ret;

  function integration(name){
    return !! (~indexof(list, name)
      || 'all' == name.toLowerCase()
      || ~indexof(lower, name.toLowerCase()));
  }
}
}, {"debug":190,"component/indexof":116,"defaults":97,"component/map":210,"each":4,"is":91}],
210: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var toFunction = require('to-function');

/**
 * Map the given `arr` with callback `fn(val, i)`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 * @api public
 */

module.exports = function(arr, fn){
  var ret = [];
  fn = toFunction(fn);
  for (var i = 0; i < arr.length; ++i) {
    ret.push(fn(arr[i], i));
  }
  return ret;
};
}, {"to-function":174}],
206: [function(require, module, exports) {

var debug = require('debug')('analytics:user');
var Entity = require('./entity');
var inherit = require('inherit');
var bind = require('bind');
var cookie = require('./cookie');
var uuid = require('uuid');
var rawCookie = require('cookie');


/**
 * User defaults
 */

User.defaults = {
  persist: true,
  cookie: {
    key: 'ajs_user_id',
    oldKey: 'ajs_user'
  },
  localStorage: {
    key: 'ajs_user_traits'
  }
};


/**
 * Initialize a new `User` with `options`.
 *
 * @param {Object} options
 */

function User (options) {
  this.defaults = User.defaults;
  this.debug = debug;
  Entity.call(this, options);
}


/**
 * Inherit `Entity`
 */

inherit(User, Entity);

/**
 * Set / get the user id.
 *
 * When the user id changes, the method will
 * reset his anonymousId to a new one.
 *
 * Example:
 *
 *      // didn't change because the user didn't have previous id.
 *      anonId = user.anonymousId();
 *      user.id('foo');
 *      assert.equal(anonId, user.anonymousId());
 *
 *      // didn't change because the user id changed to null.
 *      anonId = user.anonymousId();
 *      user.id('foo');
 *      user.id(null);
 *      assert.equal(anonId, user.anonymousId());
 *
 *     // change because the user had previous id.
 *     anonId = user.anonymousId();
 *     user.id('foo');
 *     user.id('baz'); // triggers change
 *     user.id('baz'); // no change
 *     assert.notEqual(anonId, user.anonymousId());
 *
 * @param {String} id
 * @return {Mixed}
 */

User.prototype.id = function(id){
  var prev = this._getId();
  var ret = Entity.prototype.id.apply(this, arguments);
  if (null == prev) return ret;
  if (prev != id && id) this.anonymousId(null);
  return ret;
};

/**
 * Set / get / remove anonymousId.
 *
 * @param {String} anonId
 * @return {String|User}
 */

User.prototype.anonymousId = function(anonId){
  var store = this.storage();

  // set / remove
  if (arguments.length) {
    store.set('ajs_anonymous_id', anonId);
    return this;
  }

  // new
  if (anonId = store.get('ajs_anonymous_id')) {
    return anonId;
  }

  // old - it is not stringified so we use the raw cookie.
  if (anonId = rawCookie('_sio')) {
    anonId = anonId.split('----')[0];
    store.set('ajs_anonymous_id', anonId);
    store.remove('_sio');
    return anonId;
  }

  // empty
  anonId = uuid();
  store.set('ajs_anonymous_id', anonId);
  return store.get('ajs_anonymous_id');
};

/**
 * Remove anonymous id on logout too.
 */

User.prototype.logout = function(){
  Entity.prototype.logout.call(this);
  this.anonymousId(null);
};

/**
 * Load saved user `id` or `traits` from storage.
 */

User.prototype.load = function () {
  if (this._loadOldCookie()) return;
  Entity.prototype.load.call(this);
};


/**
 * BACKWARDS COMPATIBILITY: Load the old user from the cookie.
 *
 * @return {Boolean}
 * @api private
 */

User.prototype._loadOldCookie = function () {
  var user = cookie.get(this._options.cookie.oldKey);
  if (!user) return false;

  this.id(user.id);
  this.traits(user.traits);
  cookie.remove(this._options.cookie.oldKey);
  return true;
};


/**
 * Expose the user singleton.
 */

module.exports = bind.all(new User());


/**
 * Expose the `User` constructor.
 */

module.exports.User = User;

}, {"debug":190,"./entity":207,"inherit":208,"bind":194,"./cookie":195,"uuid":184,"cookie":183}],
5: [function(require, module, exports) {
module.exports = {
  "name": "analytics",
  "version": "2.8.4",
  "main": "analytics.js",
  "dependencies": {},
  "devDependencies": {}
}
;
}, {}]}, {}, {"1":""})
);