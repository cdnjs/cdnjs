;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("calvinmetcalf-setImmediate/lib/index.js", function(exports, require, module){
"use strict";
var types = [
    require("./nextTick"),
    require("./mutation"),
    require("./postMessage"),
    require("./messageChannel"),
    require("./stateChange"),
    require("./timeout")
];
var handlerQueue = [];

function drainQueue() {
    var i = 0,
        task,
        innerQueue = handlerQueue;
	handlerQueue = [];
	/*jslint boss: true */
	while (task = innerQueue[i++]) {
		task();
	}
}
var nextTick;
types.some(function (obj) {
    var t = obj.test();
    if (t) {
        nextTick = obj.install(drainQueue);
    }
    return t;
});
var retFunc = function (task) {
    var len, args;
    if (arguments.length > 1 && typeof task === "function") {
        args = Array.prototype.slice.call(arguments, 1);
        args.unshift(undefined);
        task = task.bind.apply(task, args);
    }
    if ((len = handlerQueue.push(task)) === 1) {
        nextTick(drainQueue);
    }
    return len;
};
retFunc.clear = function (n) {
    if (n <= handlerQueue.length) {
        handlerQueue[n - 1] = function () {};
    }
    return this;
};
module.exports = retFunc;

});
require.register("calvinmetcalf-setImmediate/lib/nextTick.js", function(exports, require, module){
"use strict";
exports.test = function () {
    // Don't get fooled by e.g. browserify environments.
    return typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";
};

exports.install = function () {
    return process.nextTick;
};
});
require.register("calvinmetcalf-setImmediate/lib/postMessage.js", function(exports, require, module){
"use strict";
var globe = require("./global");
exports.test = function () {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can"t be used for this purpose.

    if (!globe.postMessage || globe.importScripts) {
        return false;
    }

    var postMessageIsAsynchronous = true;
    var oldOnMessage = globe.onmessage;
    globe.onmessage = function () {
        postMessageIsAsynchronous = false;
    };
    globe.postMessage("", "*");
    globe.onmessage = oldOnMessage;

    return postMessageIsAsynchronous;
};

exports.install = function (func) {
    var codeWord = "com.calvinmetcalf.setImmediate" + Math.random();
    function globalMessage(event) {
        if (event.source === globe && event.data === codeWord) {
            func();
        }
    }
    if (globe.addEventListener) {
        globe.addEventListener("message", globalMessage, false);
    } else {
        globe.attachEvent("onmessage", globalMessage);
    }
    return function () {
        globe.postMessage(codeWord, "*");
    };
};
});
require.register("calvinmetcalf-setImmediate/lib/messageChannel.js", function(exports, require, module){
"use strict";
var globe = require("./global");
exports.test = function () {
    return !!globe.MessageChannel;
};

exports.install = function (func) {
    var channel = new globe.MessageChannel();
    channel.port1.onmessage = func;
    return function () {
        channel.port2.postMessage(0);
    };
};
});
require.register("calvinmetcalf-setImmediate/lib/stateChange.js", function(exports, require, module){
"use strict";
var globe = require("./global");
exports.test = function () {
    return "document" in globe && "onreadystatechange" in globe.document.createElement("script");
};

exports.install = function (handle) {
    return function () {

        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
        var scriptEl = globe.document.createElement("script");
        scriptEl.onreadystatechange = function () {
            handle();

            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
        };
        globe.document.documentElement.appendChild(scriptEl);

        return handle;
    };
};
});
require.register("calvinmetcalf-setImmediate/lib/timeout.js", function(exports, require, module){
"use strict";
exports.test = function () {
    return true;
};

exports.install = function (t) {
    return function () {
        setTimeout(t, 0);
    };
};
});
require.register("calvinmetcalf-setImmediate/lib/global.js", function(exports, require, module){
module.exports = typeof global === "object" && global ? global : this;
});
require.register("calvinmetcalf-setImmediate/lib/mutation.js", function(exports, require, module){
"use strict";
//based off rsvp
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/async.js
var globe = require("./global");

var MutationObserver = globe.MutationObserver || globe.WebKitMutationObserver;

exports.test = function () {
    return MutationObserver;
};

exports.install = function (handle) {
    var observer = new MutationObserver(handle);
    var element = globe.document.createElement("div");
    observer.observe(element, { attributes: true });

    // Chrome Memory Leak: https://bugs.webkit.org/show_bug.cgi?id=93661
    globe.addEventListener("unload", function () {
        observer.disconnect();
        observer = null;
    }, false);
    return function () {
        element.setAttribute("drainQueue", "drainQueue");
    };
};
});
require.register("lie/lie.js", function(exports, require, module){
var immediate = require('immediate');
// Creates a deferred: an object with a promise and corresponding resolve/reject methods
function Promise(resolver) {
     if (!(this instanceof Promise)) {
        return new Promise(resolver);
    }
    var queue = [];
    var resolved = false;
    // The `handler` variable points to the function that will
    // 1) handle a .then(onFulfilled, onRejected) call
    // 2) handle a .resolve or .reject call (if not fulfilled)
    // Before 2), `handler` holds a queue of callbacks.
    // After 2), `handler` is a simple .then handler.
    // We use only one function to save memory and complexity.
     // Case 1) handle a .then(onFulfilled, onRejected) call
    function pending(onFulfilled, onRejected){
        return Promise(function(resolver,rejecter){
            queue.push({
                resolve: onFulfilled,
                reject: onRejected,
                resolver:resolver,
                rejecter:rejecter
            });
        });
    }
    function then(onFulfilled, onRejected) {
        return resolved?resolved(onFulfilled, onRejected):pending(onFulfilled, onRejected);
    }
    // Case 2) handle a .resolve or .reject call
        // (`onFulfilled` acts as a sentinel)
        // The actual function signature is
        // .re[ject|solve](sentinel, success, value)
    function resolve(success, value){
        var action = success ? 'resolve' : 'reject';
        var queued;
        var callback;
        for (var i = 0, l = queue.length; i < l; i++) {
            queued = queue[i];
            callback = queued[action];
            if (typeof callback === 'function') {
                immediate(execute,callback, value, queued.resolver, queued.rejecter);
            }else if(success){
                queued.resolver(value);
            }else{
                queued.rejecter(value);
            }
        }
        // Replace this handler with a simple resolved or rejected handler
        resolved = createHandler(then, value, success);
    }
    this.then = then;
    function yes(value) {
        if (!resolved) {
            resolve(true, value);
        }
    }
    function no (reason) {
        if (!resolved) {
            resolve(false, reason);
        }
    }
    try{
        resolver(function(a){
            if(a && typeof a.then==='function'){
                a.then(yes,no);
            }else{
                yes(a);
            }
        },no);
    }catch(e){
        no(e);
    }
}

// Creates a fulfilled or rejected .then function
function createHandler(then, value, success) {
    return function(onFulfilled, onRejected) {
        var callback = success ? onFulfilled : onRejected;
        if (typeof callback !== 'function') {
            return Promise(function(resolve,reject){
                then(resolve,reject);
            });
        }
        return Promise(function(resolve,reject){
            immediate(execute,callback,value,resolve,reject);
       });
    };
}

// Executes the callback with the specified value,
// resolving or rejecting the deferred
function execute(callback, value, resolve, reject) {
        try {
            var result = callback(value);
            if (result && typeof result.then === 'function') {
                result.then(resolve, reject);
            }
            else {
                resolve(result);
            }
        }
        catch (error) {
            reject(error);
        }
}
module.exports = Promise;

});
require.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/immediate/lib/index.js");
require.alias("calvinmetcalf-setImmediate/lib/nextTick.js", "lie/deps/immediate/lib/nextTick.js");
require.alias("calvinmetcalf-setImmediate/lib/postMessage.js", "lie/deps/immediate/lib/postMessage.js");
require.alias("calvinmetcalf-setImmediate/lib/messageChannel.js", "lie/deps/immediate/lib/messageChannel.js");
require.alias("calvinmetcalf-setImmediate/lib/stateChange.js", "lie/deps/immediate/lib/stateChange.js");
require.alias("calvinmetcalf-setImmediate/lib/timeout.js", "lie/deps/immediate/lib/timeout.js");
require.alias("calvinmetcalf-setImmediate/lib/global.js", "lie/deps/immediate/lib/global.js");
require.alias("calvinmetcalf-setImmediate/lib/mutation.js", "lie/deps/immediate/lib/mutation.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/immediate/index.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "immediate/index.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "calvinmetcalf-setImmediate/index.js");

require.alias("lie/lie.js", "lie/index.js");

L.Util.Promise = require("lie");
})();

L.Util.ajax = function(url, options) {
	'use strict';
	options = options || {};
	if (options.jsonp) {
		return L.Util.ajax.jsonp(url, options);
	}
	var request;
	var cancel;
	var out = L.Util.Promise(function(resolve,reject){
		var Ajax;
		cancel=reject;
		// the following is from JavaScript: The Definitive Guide
		if (window.XMLHttpRequest === undefined) {
			Ajax = function() {
				try {
					return new ActiveXObject('Microsoft.XMLHTTP.6.0');
				}
				catch (e1) {
					try {
						return new ActiveXObject('Microsoft.XMLHTTP.3.0');
					}
					catch (e2) {
						reject('XMLHttpRequest is not supported');
					}
				}
			};
		}
		else {
			Ajax = window.XMLHttpRequest;
		}
		var response;
		request = new Ajax();
		request.open('GET', url);
		request.onreadystatechange = function() {
			/*jslint evil: true */
			if (request.readyState === 4) {
				if((request.status < 400&&options.local)|| request.status===200) {
					if (window.JSON) {
						response = JSON.parse(request.responseText);
					} else if (options.evil) {
						response = eval('(' + request.responseText + ')');
					}
					resolve(response);
				} else {
					if(!request.status){
						reject('Attempted cross origin request without CORS enabled');
					}else{
						reject(request.statusText);
					}
				}
			}
		};
		request.send();
	});
	out.then(null,function(reason){
		request.abort();
		return reason;
	});
	out.abort = cancel;
	return out;
};

L.Util.jsonp = function(url, options) {
	options = options || {};
	var head = document.getElementsByTagName('head')[0];
	var scriptNode = L.DomUtil.create('script', '', head);
	var cbName, ourl, cbSuffix, cancel;
	var out = L.Util.Promise(function(resolve, reject){
		cancel=reject;
		var cbParam = options.cbParam || 'callback';
		if (options.callbackName) {
			cbName = options.callbackName;
		}
		else {
			cbSuffix = '_' + ('' + Math.random()).slice(2);
			cbName = 'L.Util.jsonp.cb.' + cbSuffix;
		}
		scriptNode.type = 'text/javascript';
		if (cbSuffix) {
			L.Util.jsonp.cb[cbSuffix] = function(data) {
				head.removeChild(scriptNode);
				delete L.Util.jsonp.cb[cbSuffix];
				resolve(data);
			};
		}
		if (url.indexOf('?') === -1) {
			ourl = url + '?' + cbParam + '=' + cbName;
		}
		else {
			ourl = url + '&' + cbParam + '=' + cbName;
		}
		scriptNode.src = ourl;
	}).then(null,function(reason){
	    head.removeChild(scriptNode);
		delete L.Util.ajax.cb[cbSuffix];
		return reason;
	});
	out.abort = cancel;
	return out;
};
L.Util.jsonp.cb = {};

L.GeoJSON.AJAX = L.GeoJSON.extend({
	defaultAJAXparams: {
		dataType: 'json',
		callbackParam: 'callback',
		local:false,
		middleware: function(f) {
			return f;
		}
	},
	initialize: function(url, options) {

		this.urls = [];
		if (url) {
			if (typeof url === 'string') {
				this.urls.push(url);
			}
			else if (typeof url.pop === 'function') {
				this.urls = this.urls.concat(url);
			}
			else {
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
		this.on('data:loaded', function() {
			if (this.filter) {
				this.refilter(this.filter);
			}
		}, this);
		var self = this;
		if (this.urls.length > 0) {
			L.Util.Promise(function(yes){
			    yes();
			}).then(function(){
			    self.addUrl();
		    });
		}
	},
	clearLayers: function() {
		this.urls = [];
		L.GeoJSON.prototype.clearLayers.call(this);
		return this;
	},
	addUrl: function(url) {
		var self = this;
		if (url) {
			if (typeof url === 'string') {
				self.urls.push(url);
			}
			else if (typeof url.pop === 'function') {
				self.urls = self.urls.concat(url);
			}
		}
		var loading = self.urls.length;
		var done = 0;
		self.fire('data:loading');
		self.urls.forEach(function(url) {
			if (self.ajaxParams.dataType.toLowerCase() === 'json') {
				L.Util.ajax(url,self.ajaxParams).then(function(d) {
					var data = self.ajaxParams.middleware(d);
					self.addData(data);
					self.fire('data:progress',data);
				},function(err){
					self.fire('data:progress',{error:err});
				});
			}
			else if (self.ajaxParams.dataType.toLowerCase() === 'jsonp') {
				L.Util.jsonp(url,self.ajaxParams).then(function(d) {
					var data = self.ajaxParams.middleware(d);
					self.addData(data);
					self.fire('data:progress',data);
				},function(err){
					self.fire('data:progress',{error:err});
				});
			}
		});
		self.on('data:progress', function() {
			if (++done === loading) {
				self.fire('data:loaded');
			}
		});
	},
	refresh: function(url) {
		url = url || this.urls;
		this.clearLayers();
		this.addUrl(url);
	},
	refilter: function(func) {
		if (typeof func !== 'function') {
			this.filter = false;
			this.eachLayer(function(a) {
				a.setStyle({
					stroke: true,
					clickable: true
				});
			});
		}
		else {
			this.filter = func;
			this.eachLayer(function(a) {

				if (func(a.feature)) {
					a.setStyle({
						stroke: true,
						clickable: true
					});
				}
				else {
					a.setStyle({
						stroke: false,
						clickable: false
					});
				}
			});
		}
	}
});
L.geoJson.ajax = function(geojson, options) {
	return new L.GeoJSON.AJAX(geojson, options);
};
