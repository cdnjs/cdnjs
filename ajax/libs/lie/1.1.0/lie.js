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
require('./realSetImmediate'),
require('./nextTick'),
require('./postMessage'),
require('./messageChannel'),
require('./stateChange'),
require('./timeout')];



types.some(function(obj) {
    var t = obj.test();
    if (t) {
        module.exports = obj.install();
    }
    return t;
});
});
require.register("calvinmetcalf-setImmediate/lib/realSetImmediate.js", function(exports, require, module){
exports.test = function(){
    return typeof setImmediate !== 'undefined';
};

exports.install = function() {
     setImmediate.clear = clearImmediate;
     return setImmediate;
};
});
require.register("calvinmetcalf-setImmediate/lib/nextTick.js", function(exports, require, module){
var tasks = require('./tasks');
exports.test = function() {
    // Don't get fooled by e.g. browserify environments.
    return typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";
};

exports.install = function(attachTo) {
    var returnFunc = function() {
        var handle = tasks.addFromSetImmediateArguments(arguments);

        process.nextTick(function() {
            tasks.runIfPresent(handle);
        });

        return handle;
    };
    returnFunc.clear = tasks.remove;
    return returnFunc;
};
});
require.register("calvinmetcalf-setImmediate/lib/postMessage.js", function(exports, require, module){
var tasks = require('./tasks');
var global = require('./global');
exports.test = function() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.

    if (!global.postMessage || global.importScripts) {
        return false;
    }

    var postMessageIsAsynchronous = true;
    var oldOnMessage = global.onmessage;
    global.onmessage = function() {
        postMessageIsAsynchronous = false;
    };
    global.postMessage("", "*");
    global.onmessage = oldOnMessage;

    return postMessageIsAsynchronous;
};

exports.install = function() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

    var MESSAGE_PREFIX = "com.bn.NobleJS.setImmediate" + Math.random();

    function isStringAndStartsWith(string, putativeStart) {
        return typeof string === "string" && string.substring(0, putativeStart.length) === putativeStart;
    }

    function onGlobalMessage(event) {
        // This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
        // avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
        // (randomly generated) unpredictable identifying prefix is present.
        if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
            var handle = event.data.substring(MESSAGE_PREFIX.length);
            tasks.runIfPresent(handle);
        }
    }
    if (global.addEventListener) {
        global.addEventListener("message", onGlobalMessage, false);
    }
    else {
        global.attachEvent("onmessage", onGlobalMessage);
    }

    var returnFunc =  function() {
        var handle = tasks.addFromSetImmediateArguments(arguments);

        // Make `global` post a message to itself with the handle and identifying prefix, thus asynchronously
        // invoking our onGlobalMessage listener above.
        global.postMessage(MESSAGE_PREFIX + handle, "*");

        return handle;
    };
    returnFunc.clear = tasks.remove;
    return returnFunc;
};
});
require.register("calvinmetcalf-setImmediate/lib/messageChannel.js", function(exports, require, module){
var tasks = require('./tasks');
var global = require('./global');
exports.test = function() {
    return !!global.MessageChannel;
};

exports.install = function(attachTo) {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = function(event) {
        var handle = event.data;
        tasks.runIfPresent(handle);
    };
    var returnFunc = function() {
        var handle = tasks.addFromSetImmediateArguments(arguments);

        channel.port2.postMessage(handle);

        return handle;
    };
    returnFunc.clear = tasks.remove;
    return returnFunc;
};
});
require.register("calvinmetcalf-setImmediate/lib/stateChange.js", function(exports, require, module){
var tasks = require('./tasks');
exports.test = function() {
    return "document" in global && "onreadystatechange" in global.document.createElement("script");
};

exports.install = function() {
    var returnFunc = function() {
        var handle = tasks.addFromSetImmediateArguments(arguments);

        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
        var scriptEl = global.document.createElement("script");
        scriptEl.onreadystatechange = function() {
            tasks.runIfPresent(handle);

            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
        };
        global.document.documentElement.appendChild(scriptEl);

        return handle;
    };
    returnFunc.clear = tasks.remove;
    return returnFunc;
};
});
require.register("calvinmetcalf-setImmediate/lib/timeout.js", function(exports, require, module){
var tasks = require('./tasks');

exports.test = function() {
    return true;
};

exports.install = function(attachTo) {
    return function() {
        var handle = tasks.addFromSetImmediateArguments(arguments);

        global.setTimeout(function() {
            tasks.runIfPresent(handle);
        }, 0);

        return handle;
    };
};
exports.clearImmediate = tasks.remove;
});
require.register("calvinmetcalf-setImmediate/lib/tasks.js", function(exports, require, module){
function Task(handler, args) {
    this.handler = handler;
    this.args = args;
}
Task.prototype.run = function() {
    // See steps in section 5 of the spec.
    if (typeof this.handler === "function") {
        // Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
        this.handler.apply(undefined, this.args);
    }
    else {
        var scriptSource = "" + this.handler;
        /*jshint evil: true */
        eval(scriptSource);
    }
};

var nextHandle = 1; // Spec says greater than zero
var tasksByHandle = {};
var currentlyRunningATask = false;

exports.addFromSetImmediateArguments = function(args) {
    var handler = args[0];
    var argsToHandle = Array.prototype.slice.call(args, 1);
    var task = new Task(handler, argsToHandle);

    var thisHandle = nextHandle++;
    tasksByHandle[thisHandle] = task;
    return thisHandle;
};
exports.runIfPresent = function(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (!currentlyRunningATask) {
        var task = tasksByHandle[handle];
        if (task) {
            currentlyRunningATask = true;
            try {
                task.run();
            }
            finally {
                delete tasksByHandle[handle];
                currentlyRunningATask = false;
            }
        }
    }
    else {
        // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
        // "too much recursion" error.
        setTimeout(function() {
            exports.runIfPresent(handle);
        }, 0);
    }
};
exports.remove = function(handle) {
    delete tasksByHandle[handle];
};
});
require.register("calvinmetcalf-setImmediate/lib/global.js", function(exports, require, module){
module.exports = typeof global === "object" && global ? global : this;
});
require.register("lie/lie.js", function(exports, require, module){
var immediate = require('setImmediate');
var func = 'function';
// Creates a deferred: an object with a promise and corresponding resolve/reject methods
function Deferred() {
    // The `handler` variable points to the function that will
    // 1) handle a .then(onFulfilled, onRejected) call
    // 2) handle a .resolve or .reject call (if not fulfilled)
    // Before 2), `handler` holds a queue of callbacks.
    // After 2), `handler` is a simple .then handler.
    // We use only one function to save memory and complexity.
    var handler = function(onFulfilled, onRejected, value) {
        // Case 1) handle a .then(onFulfilled, onRejected) call
        var createdDeffered;
        if (onFulfilled !== handler) {
            createdDeffered = createDeferred();
            handler.queue.push({
                deferred: createdDeffered,
                resolve: onFulfilled,
                reject: onRejected
            });
            return createdDeffered.promise;
        }

        // Case 2) handle a .resolve or .reject call
        // (`onFulfilled` acts as a sentinel)
        // The actual function signature is
        // .re[ject|solve](sentinel, success, value)
        var action = onRejected ? 'resolve' : 'reject',
            queue, deferred, callback;
        for (var i = 0, l = handler.queue.length; i < l; i++) {
            queue = handler.queue[i];
            deferred = queue.deferred;
            callback = queue[action];
            if (typeof callback !== func) {
                deferred[action](value);
            }
            else {
                execute(callback, value, deferred);
            }
        }
        // Replace this handler with a simple resolved or rejected handler
        handler = createHandler(promise, value, onRejected);
    };

    function Promise() {
        this.then = function(onFulfilled, onRejected) {
            return handler(onFulfilled, onRejected);
        };
    }
    var promise = new Promise();
    this.promise = promise;
    // The queue of deferreds
    handler.queue = [];

    this.resolve = function(value) {
        if (handler.queue) {
            handler(handler, true, value);
        }
    };

    this.fulfill = this.resolve;

    this.reject = function(reason) {
        if (handler.queue) {
            handler(handler, false, reason);
        }
    };
}

function createDeferred() {
    return new Deferred();
}

// Creates a fulfilled or rejected .then function
function createHandler(promise, value, success) {
    return function(onFulfilled, onRejected) {
        var callback = success ? onFulfilled : onRejected,
            result;
        if (typeof callback !== func) {
            return promise;
        }
        execute(callback, value, result = createDeferred());
        return result.promise;
    };
}

// Executes the callback with the specified value,
// resolving or rejecting the deferred
function execute(callback, value, deferred) {
    immediate(function() {
        var result;
        try {
            result = callback(value);
            if (result && typeof result.then === func) {
                result.then(deferred.resolve, deferred.reject);
            }
            else {
                deferred.resolve(result);
            }
        }
        catch (error) {
            deferred.reject(error);
        }
    });
}
// Returns a resolved promise
createDeferred.resolve = function(value) {
    var promise = {};
    promise.then = createHandler(promise, value, true);
    return promise;
};
// Returns a rejected promise
createDeferred.reject = function(reason) {
    var promise = {};
    promise.then = createHandler(promise, reason, false);
    return promise;
};
createDeferred.all = function(array) {
    var promise = createDeferred();
    var len = array.length;
    var resolved = 0;
    var out = [];
    var onSuccess = function(n) {
        return function(v) {
            out[n] = v;
            resolved++;
            if (resolved === len) {
                promise.resolve(out);
            }
        };
    };
    array.forEach(function(v, i) {
        v.then(onSuccess(i), function(a) {
            promise.reject(a);
        });
    });
    return promise.promise;
};
// Returns a deferred
createDeferred.immediate = immediate;
module.exports = createDeferred;
});
require.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/setImmediate/lib/index.js");
require.alias("calvinmetcalf-setImmediate/lib/realSetImmediate.js", "lie/deps/setImmediate/lib/realSetImmediate.js");
require.alias("calvinmetcalf-setImmediate/lib/nextTick.js", "lie/deps/setImmediate/lib/nextTick.js");
require.alias("calvinmetcalf-setImmediate/lib/postMessage.js", "lie/deps/setImmediate/lib/postMessage.js");
require.alias("calvinmetcalf-setImmediate/lib/messageChannel.js", "lie/deps/setImmediate/lib/messageChannel.js");
require.alias("calvinmetcalf-setImmediate/lib/stateChange.js", "lie/deps/setImmediate/lib/stateChange.js");
require.alias("calvinmetcalf-setImmediate/lib/timeout.js", "lie/deps/setImmediate/lib/timeout.js");
require.alias("calvinmetcalf-setImmediate/lib/tasks.js", "lie/deps/setImmediate/lib/tasks.js");
require.alias("calvinmetcalf-setImmediate/lib/global.js", "lie/deps/setImmediate/lib/global.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/setImmediate/index.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "setImmediate/index.js");
require.alias("calvinmetcalf-setImmediate/lib/index.js", "calvinmetcalf-setImmediate/index.js");

require.alias("lie/lie.js", "lie/index.js");

if (typeof exports == "object") {
  module.exports = require("lie");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("lie"); });
} else {
  this["deferred"] = require("lie");
}})();