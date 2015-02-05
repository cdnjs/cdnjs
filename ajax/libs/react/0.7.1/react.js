
;!function(exports, undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      
      this._conf = conf;
      
      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }
    
    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }
        
        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
    
    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;
            
            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  };

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    };

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {
    
    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      
      if (!this._all && 
        !this._events.error && 
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || this._all;
    }
    else {
      return this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {
    
    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;
        
        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if(!this._all) {
      this._all = [];
    }

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          return this;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1)
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
    define('eventemitter2',[],function() {
      return EventEmitter;
    });
  } else {
    exports.EventEmitter2 = EventEmitter; 
  }

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);

/*global define:true EventEmitter2:true */



define('react/eventemitter',['eventemitter2'], function (EventEmitterMod) {
  

  /**
     Abstract the details of getting an EventEmitter
    */

  // EventEmitter doesn't return itself in browser so need to get the global
  // EventEmitter api changed, so accomodate which ever version is available
  var EventEmitter = (EventEmitterMod) ?
    ((EventEmitterMod.EventEmitter2) ? EventEmitterMod.EventEmitter2 : EventEmitterMod) : EventEmitter2;
  return EventEmitter;

});
/*global define:true */



// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

define('util',['require','exports','module'],function (require, exports, module) {
  /*jshint white:false */

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var j = 0; j < arguments.length; j++) {
      objects.push(inspect(arguments[j]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


exports.print = function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(String(arguments[i]));
  }
};


exports.puts = function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
  }
};


exports.debug = function(x) {
  process.stderr.write('DEBUG: ' + x + '\n');
};


var error = exports.error = function(x) {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stderr.write(arguments[i] + '\n');
  }
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: colors ? stylizeWithColor : stylizeNoColor
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
var colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
var styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = styles[styleType];

  if (style) {
    return '\033[' + colors[style][0] + 'm' + str +
           '\033[' + colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    return value.inspect(recurseTimes);
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var visibleKeys = Object.keys(value);
  var keys = ctx.showHidden ? Object.getOwnPropertyNames(value) : visibleKeys;

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (typeof value === 'function') {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length === 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}
exports.isArray = isArray;


function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;


function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;


function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}
exports.isError = isError;


function objectToString(o) {
  return Object.prototype.toString.call(o);
}


// exports.p = function() {
//   for (var i = 0, len = arguments.length; i < len; ++i) {
//     error(exports.inspect(arguments[i]));
//   }
// };
// module.deprecate('p', 'Use `util.puts(util.inspect())` instead.');


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


exports.log = function(msg) {
  exports.puts(timestamp() + ' - ' + msg.toString());
};


// exports.exec = function() {
//   return require('child_process').exec.apply(this, arguments);
// };
// module.deprecate('exec', 'It is now called `child_process.exec`.');


exports.pump = function(readStream, writeStream, callback) {
  var callbackCalled = false;

  function call(a, b, c) {
    if (callback && !callbackCalled) {
      callback(a, b, c);
      callbackCalled = true;
    }
  }

  readStream.addListener('data', function(chunk) {
    if (writeStream.write(chunk) === false) readStream.pause();
  });

  writeStream.addListener('drain', function() {
    readStream.resume();
  });

  readStream.addListener('end', function() {
    writeStream.end();
  });

  readStream.addListener('close', function() {
    call();
  });

  readStream.addListener('error', function(err) {
    writeStream.end();
    call(err);
  });

  writeStream.addListener('error', function(err) {
    readStream.destroy();
    call(err);
  });
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

});  
/*global define:true */



define('react/error',['util'], function (util) {
  

  function ensureStackTraceLimitSet(stackTraceLimit) {
    if (!Error.stackTraceLimit || Error.stackTraceLimit < stackTraceLimit) {
      Error.stackTraceLimit = stackTraceLimit;
    }
  }

  function fName(fn) {
    if (!fn) return 'undefined';
    return (fn && fn.name) ? fn.name : fn;
  }

  function formatErrorMeta(err) {
    if (!err.meta) return;
    var vcon = err.meta.vcon;
    var task = err.meta.task;
    var errString = '\n\n';
    if (task && task.f && task.a) {
      errString += ('Error occurs in Task function: ' + fName(task.f) + '(' + task.a.join(',') + ')\n\n');
    }
    if (vcon) {
      errString += 'Variable Context: \n';
      errString += util.inspect(vcon);
      errString +=  '\n\n';
    }
    if (task && task.f) {
      errString += 'Task Source:\n\n';
      errString += task.f.toString(); //TODO need to pretty print function, gets collapsed
      errString += '\n\n';
    }
    return errString;
  }

  function augmentError(err, meta) {
    if (typeof(err) === 'string') { err = new Error(err); } //props will be lost on non-objects
    var origMsg = err.toString();
    err.meta = meta;
    err.toString = function () { return origMsg + formatErrorMeta(err); };
    return err;
  }

  return {
    ensureStackTraceLimitSet: ensureStackTraceLimitSet,
    augmentError: augmentError
  };

});
/*global define:true sprint:true */



define('react/sprintf',['util'], function (util) {
  

  /**
     Abstract the details of getting a sprintf function.
     Currently using the simple format capabilities of node's util.format
    */

  var sprintf = util.format;
  return sprintf;

});
(function (root, factory) {
  /*global define:true */

    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('ensure-array',[], factory);
    } else {
        // Browser globals
        root.ensureArray = factory();
    }
}(this, function () {
  

  function ensureArray(a, b, n) {
    if (arguments.length === 0) return [];            //no args, ret []
    if (arguments.length === 1) {                     //single argument
      if (a === undefined || a === null) return [];   //  undefined or null, ret []
      if (Array.isArray(a)) return a;                 //  isArray, return it
    }
    return Array.prototype.slice.call(arguments);     //return array with copy of all arguments
  }

  return ensureArray;
}));


/*global define:true */



define('react/status',[], function () {
  

  var STATUS = { READY: 'ready',  RUNNING: 'running', ERRORED: 'errored', COMPLETE: 'complete' };

  return STATUS;

});
/*global define:true process:false*/



define('react/event-manager',['./eventemitter'], function (EventEmitter) {
  
  /*jshint regexp:false */

  var EVENT_EMITTER2_CONFIG = {
    wildcard: true, // should the event emitter use wildcards.
    delimiter: '.', // the delimiter used to segment namespaces, defaults to `.`.
    maxListeners: 30 // the max number of listeners that can be assigned to an event, defaults to 10.
  };

  var PASS_EVENTS_PROCESS_RE = /^ast.defined$/;  // events to pass up to global process

  var TYPES = {
    // Flow monitoring events and their params
    AST_DEFINED: 'ast.defined',                      // ast
    FLOW_BEGIN: 'flow.begin',                        // env
    TASK_BEGIN: 'task.begin',                        // task
    TASK_COMPLETE: 'task.complete',                  // task
    TASK_ERRORED: 'task.errored',                    // task
    FLOW_COMPLETE: 'flow.complete',                  // env
    FLOW_ERRORED: 'flow.errored',                    // env

    // Internal Hooks
    EXEC_FLOW_START: 'exec.flow.start',              // env
    EXEC_INPUT_PREPROCESS: 'exec.input.preprocess',  // parsedInput
    EXEC_TASKS_PRECREATE: 'exec.tasks.precreate',    // env
    EXEC_OUTTASK_CREATE: 'exec.outTask.create',      // outTaskOptions
    EXEC_TASK_START: 'exec.task.start',              // task
    EXEC_TASK_COMPLETE: 'exec.task.complete',        // task
    EXEC_TASK_ERRORED: 'exec.task.errored',          // task
    EXEC_FLOW_COMPLETE: 'exec.flow.complete',        // env
    EXEC_FLOW_ERRORED: 'exec.flow.errored'           // env
  };

  /**
     Event manager which emits events up to its parent if exists.
     Allows a hierarchy of emitters, which communicate up the
     chain.
  */
  function EventManager() {
  }

  EventManager.create = function () { return new EventManager(); };

  EventManager.TYPES = TYPES;
  EventManager.prototype.TYPES = TYPES;

  EventManager.prototype.isEnabled = function () { // if has listener or an ancestor has listener
    return !!(this.emitter || (this.parent && this.parent.isEnabled()));
  };

  /**
     Add listener. Wildcard events are allowed like 'foo.*'
     Use '*' to listen to any event
  */
  EventManager.prototype.on = function (event, listener) {
    if (!this.emitter) this.emitter = new EventEmitter(EVENT_EMITTER2_CONFIG);
    if (event === '*') this.emitter.onAny(listener);
    else this.emitter.on(event, listener);
  };

  EventManager.prototype.emit = function (event, arg1, arg2, argN) {
    if (event === undefined) throw new Error('event is undefined');
    if (this.emitter) this.emitter.emit.apply(this.emitter, arguments);
    if (this.parent && this.parent.isEnabled()) this.parent.emit.apply(this.parent, arguments);
    if (PASS_EVENTS_PROCESS_RE.test(event) && typeof(process) !== 'undefined' && process.emit) {
      process.emit.apply(process, arguments);  // pass some to process
    }
  };

  EventManager.prototype.removeListener = function (event, listener) {
    if (this.emitter) this.emitter.removeListener.apply(this.emitter, arguments);
  };

  EventManager.prototype.removeAllListeners = function (event) {
    if (this.emitter) this.emitter.removeAllListeners.apply(this.emitter, arguments);
  };


  EventManager.global = EventManager.create(); // create one top level emitter
  return EventManager;

});
/*global define:true */



define('react/base-task',['ensure-array', './status', './event-manager'],
       function (array, STATUS, EventManager) {
  

  function BaseTask() {
  }

  /**
     Getter Fn to retrieveAn array of the output param names for this task.
  */
  BaseTask.prototype.getOutParams = function () {
    return array(this.out); // ensure array
  };

  BaseTask.prototype.isComplete = function () {
    return (this.status === STATUS.COMPLETE);
  };

  BaseTask.prototype.start = function (args) { // mark task as started with args and note time
    /*jshint validthis: true */
    this.args = args;
    this.env.currentTask = this;
    this.env.flowEmitter.emit(EventManager.TYPES.EXEC_TASK_START, this);
  };

  BaseTask.prototype.complete = function (args) { //args that were used are available
    /*jshint validthis: true */
    this.status = STATUS.COMPLETE;
    this.results = args;
    this.env.currentTask = this;
    this.env.flowEmitter.emit(EventManager.TYPES.EXEC_TASK_COMPLETE, this);
  };

  BaseTask.prototype.functionExists = function (vCon) {
    var fn = this.f;
    if (!fn) return false;
    if (fn instanceof Function) return true;
    if (typeof(fn) === 'string') {
      var f = vCon.getVar(fn);  // fn/method by string
      if (f && f instanceof Function) return true;
    }
    return false;
  };

  BaseTask.prototype.areAllDepArgsDefined = function (vCon) {
    return this.a.every(function (k) { return (vCon.getVar(k) !== undefined); });
  };

  BaseTask.prototype.depTasksAreDone = function (tasksByName) {
    return (!this.after || !this.after.length || // no dep tasks OR
            this.after.every(function (n) { return tasksByName[n].isComplete(); }));  //all done
  };

  function isObjProperty(str) { return (str.indexOf('.') !== -1); }

  /**
     check that obj parent is def and not null so writing to obj.prop
     will not fail. ex: 'b.c' checks that b is def and not null.
     Also returns true if not obj.prop but simple var ex: 'b'.
     Tasks will implement outParentsExist() passing each out str
     to this if they want to do this check.
  */
  BaseTask.prototype.parentExists = function (objPropStr, vCon) {
    if (!isObjProperty(objPropStr)) return true; // NOT obj prop, just simple arg, ret true
    var nameAndProps = objPropStr.split('.');
    nameAndProps.pop(); // pop off final prop
    var parent = nameAndProps.reduce(function (accObj, prop) {
      if (accObj === undefined || accObj === null) return undefined; // prevent exception
      return accObj[prop];
    }, vCon.values);   // vCon['foo']['bar']
    return (parent !== undefined && parent !== null);
  };

  /**
     If params are obj property writes make sure the dst objects
     are defined and not null. cb: ['b.c'] -> b is def and not null.
     If null is specified then param is valid and will be ignored.
       @returns true if all obj prop parents are def and non null
  */
  BaseTask.prototype.outParentsExist = function (vCon) {
    var self = this;
    return this.getOutParams().every(function (x) {
      if (x === null) return true;
      return self.parentExists(x, vCon);
    });
  };

  BaseTask.prototype.isReady = function (vCon, tasksByName) {
    return !this.status &&                  // not started AND
    this.functionExists(vCon) &&            // function/method exists AND
    this.areAllDepArgsDefined(vCon) &&      // all dep vars defined AND
    this.depTasksAreDone(tasksByName) &&    // all dep tasks are done AND
    (!this.outParentsExist ||               // (task does not implement outParentsExist method OR
     this.outParentsExist(vCon));          //  output parents exists (for obj property writes)
  };

  BaseTask.prototype.isMethodCall = function () {
    /*jshint regexp: false */
    return (typeof(this.f) === 'string' && /^.*\..*$/.test(this.f));  //str contains .
  };

  BaseTask.prototype.getMethodObj =  function (vCon) { //obj.prop.prop2, returns obj.prop or undefined
    var name = this.f;
    if (!name) return undefined;
    var nameAndProps = name.split('.');
    nameAndProps.pop(); // pop off last one
    if (!nameAndProps.length) return undefined;
    var result = vCon.resolveNameArr(nameAndProps);
    return result;
  };

  return BaseTask;

});

/*global define:true */



define('react/cb-task',['util', './sprintf', './base-task'], function (util, sprintf, BaseTask) {
  

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  var REQ = 'cbTask requires f, a, out';
  var FN_REQ = 'cbTask requires f to be a function or string';
  var A_REQ = 'cbTask requires a to be an array of string param names';
  var CB_REQ = 'cbTask requires out to be an array of string param names';

  function CbTask(taskDef) {
    var self = this;
    Object.keys(taskDef).forEach(function (k) { self[k] = taskDef[k]; });
  }

  CbTask.prototype = new BaseTask();
  CbTask.prototype.constructor = CbTask;

  CbTask.validate = function (taskDef) {
    var errors = [];
    if (!taskDef.f || !taskDef.a || !taskDef.out) {
      errors.push(format_error(REQ, taskDef));
    } else {
      var ftype = typeof(taskDef.f);
      if (! ((taskDef.f instanceof Function) || (ftype === 'string'))) {
        errors.push(format_error(FN_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.a) &&
             taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(A_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.out) &&
             taskDef.out.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(CB_REQ, taskDef));
      }
    }
    return errors;
  };

  CbTask.prototype.prepare = function prepare(handleTaskError, vCon, contExec) {
    var self = this;
    this.cbFun = function (err, arg0, arg1, argn) {
      var args = Array.prototype.slice.call(arguments, 1);
      if (err) { handleTaskError(self, err); return; } //handle error and return, we are done

      //no error, save callback args to vCon context, then continue execution
      vCon.saveResults(self.out, args);
      self.complete(args);
      contExec();
    };
  };

  CbTask.prototype.exec = function exec(vCon, handleError, contExec) {
    try {
      var args = this.a.map(function (k) { return vCon.getVar(k); }); //get args from vCon
      //console.error('CbTask.exec.args=', args);
      //console.error('CbTask.exec.vCon=', vCon);
      this.start(args); //note the start time, args
      args.push(this.cbFun);   // push callback fn on end
      var func = this.f;
      var bindObj = vCon.getVar('this'); //global space or the original this
      if (this.isMethodCall()) { //if method call then reset func and bindObj
        func = vCon.getVar(this.f);
        bindObj = this.getMethodObj(vCon);
      } else if (typeof(func) === 'string') {
        func = vCon.getVar(func); // we want the actual fn from this string
      }
      func.apply(bindObj, args);
    } catch (err) { //catch and handle the task error, calling final cb
      handleError(this, err);
    }
  };

  return CbTask;

});

/*global define:true */



define('react/promise-task',['util', './sprintf', './base-task'], function (util, sprintf, BaseTask) {
  

  /**
     PromiseTask is a task which executes a fn that returns a promise
     and when it completes it sets the values in vCon
  */

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  var REQ = 'promiseTask requires f, a, out';
  var FN_REQ = 'promiseTask requires f to be a function or string';
  var A_REQ = 'promiseTask requires a to be an array of string param names';
  var OUT_REQ = 'promiseTask requires out to be an array[1] of string param names';

  function PromiseTask(taskDef) {
    var self = this;
    Object.keys(taskDef).forEach(function (k) { self[k] = taskDef[k]; });
  }

  PromiseTask.prototype = new BaseTask();
  PromiseTask.prototype.constructor = PromiseTask;

  PromiseTask.validate = function (taskDef) {
    var errors = [];
    if (!taskDef.f || !taskDef.a || !taskDef.out) {
      errors.push(format_error(REQ, taskDef));
    } else {
      var ftype = typeof(taskDef.f);
      if (! ((taskDef.f instanceof Function) || (ftype === 'string'))) {
        errors.push(format_error(FN_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.a) &&
             taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(A_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.out) && taskDef.out.length <= 1 &&
             taskDef.out.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(OUT_REQ, taskDef));
      }
    }
    return errors;
  };

  PromiseTask.prototype.prepare = function prepare(handleTaskError, vCon, contExec) {
    var self = this;
    this.nextFn = function (arg) {
      var args = Array.prototype.slice.call(arguments);
      vCon.saveResults(self.out, args);
      self.complete(args);
      contExec();
    };
    this.failFn = function (err) {
      handleTaskError(self, err);
    };
  };

  PromiseTask.prototype.exec = function exec(vCon, handleError, contExec) {
    try {
      var args = this.a.map(function (k) { return vCon.getVar(k); }); //get args from vCon
      //console.error('PromiseTask.exec.args=', args);
      //console.error('PromiseTask.exec.vCon=', vCon);
      this.start(args); //note the start time, args
      var func = this.f;
      var bindObj = vCon.getVar('this'); //global space or the original this
      if (this.isMethodCall()) { //if method call then reset func and bindObj
        func = vCon.getVar(this.f);
        bindObj = this.getMethodObj(vCon);
      } else if (typeof(func) === 'string') {
        func = vCon.getVar(func); // we want the actual fn from this string
      }
      var retValue = func.apply(bindObj, args);
      if (retValue && typeof(retValue.then) === 'function') { // is a promise
        retValue.then(this.nextFn, this.failFn);
      } else { // just a value, proceed now
        this.nextFn(retValue);
      }
    } catch (err) { //catch and handle the task error, calling final cb
      handleError(this, err);
    }
  };

  return PromiseTask;

});
/*global define:true */



define('react/ret-task',['util', './sprintf', './base-task'], function (util, sprintf, BaseTask) {
  

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  var REQ = 'retTask requires f, a, out';
  var FN_REQ = 'retTask requires f to be a function or string';
  var A_REQ = 'retTask requires a to be an array of string param names';
  var RET_REQ = 'retTask requires out to be an array with single string param name or []';

  function RetTask(taskDef) {
    var self = this;
    Object.keys(taskDef).forEach(function (k) { self[k] = taskDef[k]; });
  }

  RetTask.prototype = new BaseTask();
  RetTask.prototype.constructor = RetTask;

  RetTask.validate = function (taskDef) {
    var errors = [];
    if (!taskDef.f || !taskDef.a || !taskDef.out) {
      errors.push(format_error(REQ, taskDef));
    } else {
      var ftype = typeof(taskDef.f);
      if (! ((taskDef.f instanceof Function) || (ftype === 'string'))) {
        errors.push(format_error(FN_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.a) &&
             taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(A_REQ, taskDef));
      }

      if (! (Array.isArray(taskDef.out) &&
             (taskDef.out.length === 0 ||
              (taskDef.out.length === 1 && typeof(taskDef.out[0] === 'string'))))) {
        errors.push(format_error(RET_REQ, taskDef));
      }
    }
    return errors;
  };

  RetTask.prototype.exec = function exec(vCon, handleError, contExec) {
    try {
      var args = this.a.map(function (k) { return vCon.getVar(k); }); //get args from vCon
      this.start(args); //note the start time, args
      var func = this.f;
      var bindObj = vCon.getVar('this'); //global space or the original this
      if (this.isMethodCall()) { //if method call then reset func and bindObj
        func = vCon.getVar(this.f);
        bindObj = this.getMethodObj(vCon);
      } else if (typeof(func) === 'string') {
        func = vCon.getVar(func); // we want the actual fn from this string
      }
      var results = [func.apply(bindObj, args)];
      vCon.saveResults(this.out, results); // save retval, takes arrays
      this.complete(results);
      contExec();       // continue since no callback to run this
    } catch (err) { handleError(this, err); }    // catch and handle the task error, calling final cb
  };

  return RetTask;

});
/*global define:true */



define('react/when-task',['util', './sprintf', './base-task'], function (util, sprintf, BaseTask) {
  

  /**
     When task which checks if is a promise (has a then method)
     and waits for it to resolve.

     If argument does not have a then method, it resolves immediately
  */

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  var REQ = 'whenTask requires a, out';
  var A_REQ = 'whenTask requires a to be an array[1] of string param names';
  var OUT_REQ = 'whenTask requires out to be an array[1] of string param names';

  function WhenTask(taskDef) {
    var self = this;
    Object.keys(taskDef).forEach(function (k) { self[k] = taskDef[k]; });
  }

  WhenTask.prototype = new BaseTask();
  WhenTask.prototype.constructor = WhenTask;

  WhenTask.prototype.f = function when() { }; // just here to keep validations happy

  WhenTask.validate = function (taskDef) {
    var errors = [];
    if (!taskDef.a || !taskDef.out) {
      errors.push(format_error(REQ, taskDef));
    } else {
      if (! (Array.isArray(taskDef.a) && taskDef.a.length === 1 &&
             taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(A_REQ, taskDef));
      }
      if (! (Array.isArray(taskDef.out) && taskDef.out.length <= 1 &&
             taskDef.out.every(function (x) { return (typeof(x) === 'string'); }))) {
        errors.push(format_error(OUT_REQ, taskDef));
      }
    }
    return errors;
  };

  WhenTask.prototype.prepare = function prepare(handleTaskError, vCon, contExec) {
    var self = this;
    this.nextFn = function (arg) {
      var args = Array.prototype.slice.call(arguments);
      vCon.saveResults(self.out, args);
      self.complete(args);
      contExec();
    };
    this.failFn = function (err) {
      handleTaskError(self, err);
    };
  };

  WhenTask.prototype.exec = function exec(vCon, handleError, contExec) {
    try {
      var args = this.a.map(function (k) { return vCon.getVar(k); }); //get args from vCon
      //console.error('WhenTask.exec.args=', args);
      //console.error('WhenTask.exec.vCon=', vCon);
      this.start(args); //note the start time, args
      var arg = args[0]; // one value allowed
      if (arg && typeof(arg.then) === 'function') { // is a promise
        arg.then(this.nextFn, this.failFn);
      } else { // not a promise continue immediately
        this.nextFn(arg);
      }
    } catch (err) { //catch and handle the task error, calling final cb
      handleError(this, err);
    }
  };

  return WhenTask;

});
/*global define:true */



define('react/finalcb-task',['./sprintf', 'util', './status', './event-manager'],
       function (sprintf, util, STATUS, EventManager) {
  

  var OUTTASK_A_REQ = 'ast.outTask.a should be an array of string param names';

  function FinalCbTask(outTaskOptions) {
    var taskDef = outTaskOptions.taskDef;
    if (typeof(outTaskOptions.cbFunc) !== 'function') throw new Error('callback is not a function');
    var self = this;
    for (var k in taskDef) {
      if (true) self[k] = taskDef[k];  // if to make jshint happy
    }
    this.f = outTaskOptions.cbFunc;
    this.tasks = outTaskOptions.tasks;
    this.vCon = outTaskOptions.vCon;
    this.retValue = outTaskOptions.retValue;
    this.execOptions = outTaskOptions.execOptions;
    this.env = outTaskOptions.env;
  }

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }


  FinalCbTask.validate = function (taskDef) {
    var errors = [];
    if (! (Array.isArray(taskDef.a) &&
           taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
      errors.push(format_error(OUTTASK_A_REQ, taskDef));
    }
    return errors;
  };

  FinalCbTask.prototype.isReady = function () {
    return (this.tasks.every(function (t) { return (t.status === STATUS.COMPLETE); }));
  };

  FinalCbTask.prototype.exec = function (err) {
    if (!this.f) return;   //must have already been called
    if (err) {
      this.env.error = err;
      this.env.flowEmitter.emit(EventManager.TYPES.EXEC_FLOW_ERRORED, this.env);
      this.f.call(null, err); //call the final callback with the first error hit
    } else { // no error, call with args
      var vCon = this.vCon;
      var finalArgs = this.a.map(function (k) { return vCon.getVar(k); });
      finalArgs.unshift(null);   //unshift err=null to front
      this.env.results = finalArgs;
      this.env.flowEmitter.emit(EventManager.TYPES.EXEC_FLOW_COMPLETE, this.env);
      this.f.apply(null, finalArgs);
    }
    this.f = null;   // prevent multiple calls
  };

  return FinalCbTask;

});
/*global define:true */



define('react/vcon',[], function () {
  

  var LAST_RESULTS_KEY = ':LAST_RESULTS';

  function VContext() {
  }

  VContext.prototype.getLastResults = function () { return this.getVar(LAST_RESULTS_KEY); };
  VContext.prototype.setLastResults = function (args) { this.setVar(LAST_RESULTS_KEY, args); };

  VContext.prototype.getVar = function (name) { //name might be simple or obj.prop, also literals
    /*jshint regexp: false */
    var vConValues = this.values;
    if (typeof(name) !== 'string') return name; // literal boolean or number
    name = name.trim();
    // literal checks need to match what is in validate.js
    if (name === 'true') return true;
    if (name === 'false') return false;
    if (name === 'null') return null;
    if (/^-?[0-9]+$/.test(name)) return parseInt(name, 10); //int
    if (/^-?[0-9.]+$/.test(name)) return parseFloat(name);  //float
    var m = /^("|')([^\1]*)\1$/.exec(name);  //check for quoted string " or '
    if (m) return m[2]; // if is quoted str, return inside of the quotes
    var nameAndProps = name.split('.');
    var result = this.resolveNameArr(nameAndProps);
    return result;
  };

  VContext.prototype.resolveNameArr = function (nameAndProps) {
    var vConValues = this.values;
    var result = nameAndProps.reduce(function (accObj, prop) {
      if (accObj === undefined || accObj === null) return undefined; // prevent exception
      return accObj[prop];
    }, vConValues);   // vCon['foo']['bar']
    if (result === undefined && this.global !== undefined) { // see if matches any global
      result = nameAndProps.reduce(function (accObj, prop) {
        if (accObj === undefined || accObj === null) return undefined; // prevent exception
        return accObj[prop];
      }, this.global);   // global['foo']['bar']
    }
    return result;
  };

  /**
     Saves all the results from a task as a unit, also sets special
     variable :LAST_RESULTS which keeps an array of the last values
     which can be used for chaining and testing last results, etc.
  */
  VContext.prototype.saveResults = function (paramArr, valuesArr) { // set values for params
    var self = this;
    paramArr.forEach(function (k, idx) { //save values to v context
      self.setVar(k, (valuesArr[idx] !== undefined) ? valuesArr[idx] : null); //upgrade any undefined to null
    });
    this.setLastResults(valuesArr);
  };

  VContext.prototype.setVar = function (name, value) { //name might be simple or obj.prop
    if (!name) return;  // if name is undefined or null, then discard
    var vConValues = this.values;
    var nameAndProps = name.split('.');
    var lastProp = nameAndProps.pop();
    var obj = nameAndProps.reduce(function (accObj, prop) {
      var o = accObj[prop];
      if (o === undefined || o === null) {  // if doesn't exist create it
        o = accObj[prop] = { };
      }
      return o;
    }, vConValues);   // vCon['foo']['bar']
    obj[lastProp] = value;
  };


  /**
     Create Variable Context using arguments passed in.
     Ignore extra arguments passed in. Locals can be
     passed into seed the VContext otherwise empty {}
     will be used
       @param self used to pass 'this' context in
  */
  VContext.create = function (args, inParams, locals, self) {
    /*jshint validthis:true, evil:true */
    var initValues = {};
    if (self) initValues['this'] = self;
    if (locals) Object.keys(locals).forEach(function (k) { initValues[k] = locals[k]; }); // copy over keys
    var vContext = new VContext();
    vContext.values = args.reduce(function (vcon, x, idx) { // create vCon start with input args
      var param = inParams[idx];
      if (param) vcon[param] = (x !== undefined) ? x : null; // upgrade undefined to null
      return vcon;
    }, initValues);

    // add in global
    if (typeof global === 'object') { // node.js and modern browsers expose global
      vContext.global = global;
    } else { // try to access this using Function eval of this
      // http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
      vContext.global = new Function('return this')();
    }

    return vContext;
  };


  return VContext;

});

/*global define:true */



define('react/finalcb-first-task',['./sprintf', 'util', './status', './vcon', './event-manager'],
       function (sprintf, util, STATUS, VContext, EventManager) {
  

  var OUTTASK_A_REQ = 'ast.outTask.a should be an array of string param names';

  function FinalCbFirstSuccTask(outTaskOptions) {
    var taskDef = outTaskOptions.taskDef;
    if (typeof(outTaskOptions.cbFunc) !== 'function') throw new Error('callback is not a function');
    var self = this;
    for (var k in taskDef) {
      if (true) self[k] = taskDef[k];  // if to make jshint happy
    }
    this.f = outTaskOptions.cbFunc;
    this.tasks = outTaskOptions.tasks;
    this.vCon = outTaskOptions.vCon;
    this.retValue = outTaskOptions.retValue;
    this.env = outTaskOptions.env;
  }

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  FinalCbFirstSuccTask.validate = function (taskDef) {
    var errors = [];
    if (! (Array.isArray(taskDef.a) &&
           taskDef.a.every(function (x) { return (typeof(x) === 'string'); }))) {
      errors.push(format_error(OUTTASK_A_REQ, taskDef));
    }
    return errors;
  };

  /**
     is ready to exit when any task comes back with non-null defined value
  */
  FinalCbFirstSuccTask.prototype.isReady = function () {
    var lastres = this.vCon.getLastResults();
    if (!lastres) return false; // no results yet
    return (lastres.some(function (v) { return (v !== undefined && v !== null); }));
  };

  FinalCbFirstSuccTask.prototype.exec = function (err) {
    if (!this.f) return;   //must have already been called
    if (err) {
      this.env.error = err;
      this.env.flowEmitter.emit(EventManager.TYPES.EXEC_FLOW_ERRORED, this.env);
      this.f.call(null, err); //call the final callback with the first error hit
    } else { // no error, call with args
      var vCon = this.vCon;
      var finalArgs = this.a.map(function (k) { return vCon.getVar(k); });
      finalArgs.unshift(null);   //unshift err=null to front
      this.env.results = finalArgs;
      this.env.flowEmitter.emit(EventManager.TYPES.EXEC_FLOW_COMPLETE, this.env);
      this.f.apply(null, finalArgs);
    }
    this.f = null;   // prevent multiple calls
  };

  return FinalCbFirstSuccTask;

});
/*global define:true */



define('react/task',['util', './sprintf', 'ensure-array', './cb-task', './promise-task',
       './ret-task', './when-task', './finalcb-task', './finalcb-first-task',
       './status', './error', './vcon', './event-manager'],
function (util, sprintf, array, CbTask, PromiseTask,
         RetTask, WhenTask, FinalCbTask, FinalCbFirstSuccTask,
         STATUS, error, VContext, EventManager) {
  

  var TASK_TYPES = {
    cb: CbTask,
    ret: RetTask,
    promise: PromiseTask,
    when: WhenTask
  };

  var DEFAULT_TASK_NAME = 'task_%s';  // for unnamed tasks use task_idx, like task_0

  function taskTypeKeys() { return Object.keys(TASK_TYPES); }

  var OUT_TASK_TYPES = {
    finalcb: FinalCbTask,   //first task is the default if no type specified in taskDef
    finalcbFirst: FinalCbFirstSuccTask
  };
  function outTaskTypeKeys() { return Object.keys(OUT_TASK_TYPES); }

  var LOCAL_FN_MISSING = 'function: %s not found in locals or input params - task[%s]';
  var TASKDEF_IS_OBJECT = 'task must be an object';
  var NO_TASKS_RUNNING_WONT_COMPLETE = 'no tasks running, flow will not complete, remaining tasks: %s';
  var TASK_TYPE_SHOULD_MATCH = 'task.type should match one of ' +
    Object.keys(TASK_TYPES).join(', ');

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  /**
     guess the missing types from params.
     Augments in place but also returns taskDef.
     If not specified then is 'cb'
  */
  function setMissingType(taskDef) {
    if (taskDef.type) return taskDef; //already set, return
    taskDef.type = 'cb';
    return taskDef;
  }

  function setMissingOutTaskType(taskDef) {
    if (!taskDef.type) taskDef.type = Object.keys(OUT_TASK_TYPES)[0]; //use first outTask type as default
  }

  function ensureAfterArrStrings(taskDef) { // convert any fn to str, and make sure is array
    if (!taskDef.after) return;
    var afterArr = array(taskDef.after);  // ensure is array, null becomes []
    afterArr = afterArr.map(function (a) { return (typeof(a) === 'function') ? a.name : a; });
    taskDef.after = afterArr;
  }

  /**
     @returns array of errors for taskDef, could be empty
  */
  function validate(taskDef) {
    if (!taskDef || typeof(taskDef) !== 'object') {
      return [format_error(TASKDEF_IS_OBJECT, taskDef)];
    }
    setMissingType(taskDef);
    ensureAfterArrStrings(taskDef);
    var errors = [];
    errors = errors.concat(validateTaskType(taskDef));
    errors = errors.concat(validateTask(taskDef));
    return errors;
  }

  function validateTaskType(taskDef) {
    var errors = [];
    if (!Object.keys(TASK_TYPES).some(
      function (type) { return (taskDef.type === type); })) {
      errors.push(format_error(TASK_TYPE_SHOULD_MATCH, taskDef));
    }
    return errors;
  }

  function validateTask(taskDef) {
    var errors = [];
    var taskCons = TASK_TYPES[taskDef.type];
    if (taskCons) {
      errors = errors.concat(taskCons.validate(taskDef));
    }
    return errors;
  }

  function validateOutTask(taskDef) {
    var errors = [];
    setMissingOutTaskType(taskDef);
    var taskCons = OUT_TASK_TYPES[taskDef.type];
    errors = errors.concat(taskCons.validate(taskDef));
    return errors;
  }


  function validateLocalFunctions(inParams, taskDefs, locals) {
    var errors = [];
    function foo() { } //used to mock args as fns for validation check
    var mock_args = inParams.map(function (p) { return foo; }); //mock args with fns
    var vCon = VContext.create(mock_args, inParams, locals);
    var tasks = taskDefs.map(create);
    var tasksWFunctions = tasks.filter(function (t) { return (t.type !== 'when'); }); // non-when tasks need f
    tasksWFunctions.forEach(function (t, idx) {
      if (!t.functionExists(vCon)) {   // error if function doesnt exist AND
        if (!t.isMethodCall()) errors.push(sprintf(LOCAL_FN_MISSING, t.f, idx)); // not method OR
        else {
          var obj = t.getMethodObj(vCon);
          if (obj && obj !== foo) {  // (has parent but not our mock)
            errors.push(sprintf(LOCAL_FN_MISSING, t.f, idx));
          }
        }
      }
    });
    return errors;
  }

  function fName(fn) {
    if (typeof(fn) === 'function') {
      return fn.name;
    }
    return (fn) ? fn : '';
  }

  /**
     Name tasks that are not already named. Prenamed task uniquness validation
     will be done in validate.

     This modifies the tasks with the new names.

     @returns map of names to tasks
  */
  function nameTasks(tasks) { //name tasks that are not already named, validation done elsewhere, ret map
    var namesMap = tasks.reduce(function (map, t) {
      if (t.name) { map[t.name] = t; }
      return map;
    }, {});
    tasks.forEach(function (t, idx) {
      if (!t.name) { //not already named
        var name = fName(t.f);
        if (!name) name = sprintf(DEFAULT_TASK_NAME, idx);
        if (!name || namesMap[name]) {
          name = sprintf('%s_%s', name, idx); //if empty or already used, postfix with _idx
        }
        t.name = name;
        namesMap[name] = t;
      }
    });
    return namesMap;
  }

  function create(taskDef) {
    var TaskConstructor = TASK_TYPES[taskDef.type];
    return new TaskConstructor(taskDef);
  }

  function createOutTask(taskDef, cbFunc, tasks, vCon, execOptions, env) {
    setMissingOutTaskType(taskDef);
    var outTaskOptions = {
      taskDef: taskDef,
      cbFunc: cbFunc,
      tasks: tasks,
      vCon: vCon,
      execOptions: execOptions,
      env: env,
      TaskConstructor: OUT_TASK_TYPES[taskDef.type]
    };
    EventManager.global.emit(EventManager.TYPES.EXEC_OUTTASK_CREATE, outTaskOptions); // hook
    var TaskConstructor = outTaskOptions.TaskConstructor;  // hook could have changed
    return new TaskConstructor(outTaskOptions);
  }

  function createErrorHandler(vCon, outTask) {
    return function handleError(task, err) {
      task.status = STATUS.ERRORED;
      task.error = err;
      outTask.env.currentTask = task;
      outTask.env.flowEmitter.emit(EventManager.TYPES.EXEC_TASK_ERRORED, task);
      var errWithMeta = error.augmentError(err, {task: task, vcon: vCon});
      outTask.exec(errWithMeta); //call the final callback with the first error hit
    };
  }

  function findTasksReady(vCon, tasks, tasksByName) {
    return tasks.filter(function (t) { return t.isReady(vCon, tasksByName); });
  }

  function execTasks(tasksReady, vCon, handleError, contExec) {
    tasksReady.forEach(function (t) { t.status = STATUS.READY; }); //set ready first, no double exec
    tasksReady.forEach(function (t) { t.exec(vCon, handleError, contExec); });
  }

  /**
     this will be called if there are no tasks found to run,
     and it will check if there are still tasks running or ready
     (which means they will be running shortly), in which
      case everything is fine. If no tasks are running then
      call handleError since this will never complete.
  */
  function checkIfTasksRunning(vCon, tasks, handleError, env) {
    var tasksRunning = tasks.filter(function (t) {
      return (t.status === STATUS.RUNNING || t.status === STATUS.READY);
    });
    if (!tasksRunning.length) {
      var remainingTasks = tasks.filter(function (t) { return (!t.status); });
      var remainingTNames = remainingTasks.map(function (t) { return t.name; });
      var errMsg = sprintf(NO_TASKS_RUNNING_WONT_COMPLETE, remainingTNames.join(', '));
      var emptyTask = { env: env };
      handleError(emptyTask, new Error(errMsg));
    }
  }

  function findReadyAndExec(vCon, tasks, tasksByName, handleError, contExec, env) {
    var tasksReady = findTasksReady(vCon, tasks, tasksByName);
    if (!tasksReady.length) checkIfTasksRunning(vCon, tasks, handleError, env); // no tasks to run, check if ok
    execTasks(tasksReady, vCon, handleError, contExec);
  }

  function serializeTasks(tasks) { // conveniently set after for each task idx > 0
    nameTasks(tasks);
    tasks.forEach(function (t, idx, arr) { if (idx !== 0) t.after = [arr[idx - 1].name]; });
    return tasks;
  }

  return {
    serializeTasks: serializeTasks,
    TASK_TYPES: TASK_TYPES,
    taskTypeKeys: taskTypeKeys,
    OUT_TASK_TYPES: OUT_TASK_TYPES,
    outTaskTypeKeys: outTaskTypeKeys,
    setMissingType: setMissingType,
    validate: validate,
    validateOutTask: validateOutTask,
    validateLocalFunctions: validateLocalFunctions,
    nameTasks: nameTasks,
    create: create,
    createOutTask: createOutTask,
    createErrorHandler: createErrorHandler,
    findReadyAndExec: findReadyAndExec
  };

});
/*global define:true */



define('react/validate',['util', './sprintf', 'ensure-array', './task'], function (util, sprintf, array, taskUtil) {
  
  /*jshint latedef:false */

  var AST_IS_OBJECT = 'ast must be an object with inParams, tasks, and outTask';
  var INPARAMS_ARR_STR = 'ast.inParams must be an array of strings';
  var TASKS_ARR = 'ast.tasks must be an array of tasks';
  var NAMES_UNIQUE = 'ast.tasks that specify name need to be unique, duplicate:';
  var LOCALS_NOTNULL = 'ast.locals should not be null';
  var DUP_OUTPUTS = 'multiple tasks output the same param, must be unique. param';
  var MISSING_INPUTS = 'missing or mispelled variable referenced in flow definition: %s';

  // match any of our literals true, false, int, float, quoted strings, or is property (has dot), match vcon.js
  var LITERAL_OR_PROP_RE = /^(true|false|this|null|\-?[0-9\.]+)$|'|"|\./i;

  function format_error(errmsg, obj) {
    return sprintf('%s - %s', errmsg, util.inspect(obj));
  }

  /**
     true if is a literal name
  */
  function isLiteralOrProp(name) {  // need to match what is in vcon.js, TODO consolidate?
    return LITERAL_OR_PROP_RE.test(name);
  }

  /**
     validate the AST return Errors
     @example
     var validate = require('./validate');
     var errors = validate(ast);
     @returns array of errors, could be empty
  */
  function validate(ast) {
    if (!ast || !ast.inParams || !ast.tasks || !ast.outTask) return [AST_IS_OBJECT];
    var errors = [];
    errors = errors.concat(validateInParams(ast.inParams));
    errors = errors.concat(validateTasks(ast.tasks));
    errors = errors.concat(validateTaskNamesUnique(ast.tasks));
    errors = errors.concat(taskUtil.validateOutTask(ast.outTask));
    errors = errors.concat(validateLocals(ast.locals));
    if (errors.length === 0) { // if no errors do additional validation
      if (ast.outTask.type !== 'finalcbFirst') errors = errors.concat(validateOuputsUnique(ast.tasks));
      errors = errors.concat(taskUtil.validateLocalFunctions(ast.inParams, ast.tasks, ast.locals));
      errors = errors.concat(validateNoMissingNames(ast));
    }
    return errors;
  }

  /**
     @returns array of errors, could be empty
  */
  function validateInParams(inParams) {
    if (!Array.isArray(inParams) ||
        !inParams.every(function (x) { return (typeof(x) === 'string'); })) {
      return [INPARAMS_ARR_STR];
    }
    return [];
  }

  /**
     @returns array of errors, could be empty
  */
  function validateTasks(tasks) {
    if (!Array.isArray(tasks)) return [TASKS_ARR];
    var errors = [];
    tasks.forEach(function (t) {
      errors = errors.concat(taskUtil.validate(t));
    });
    return errors;
  }

  function validateTaskNamesUnique(tasks) {
    if (!Array.isArray(tasks)) return [];
    var errors = [];
    var namedTasks = tasks.filter(function (t) { return (t.name); });
    var names = namedTasks.map(function (t) { return t.name; });
    names.reduce(function (accum, name) {
      if (accum[name]) errors.push(sprintf('%s %s', NAMES_UNIQUE, name));
      else accum[name] = true;
      return accum;
    }, {});
    return errors;
  }

  function validateLocals(locals) {
    var errors = [];
    if (locals === null) errors.push(LOCALS_NOTNULL);
    return errors;
  }

  function getOutputParams(taskDef) {
    return array(taskDef.out); //ensure array
  }

  function validateOuputsUnique(taskDefs) {
    var errors = [];
    taskDefs.reduce(function (accum, t) {
      getOutputParams(t).forEach(function (param) {
        if (accum[param] !== undefined) errors.push(sprintf('%s: %s', DUP_OUTPUTS, param));
        else accum[param] = true;
      });
      return accum;
    }, {});
    return errors;
  }


  /**
     validate there are no missing or mispelled param names in any task inputs
     or the final task output

     @return array of errors, or empty array if none
  */
  function validateNoMissingNames(ast) {
    var errors = [];
    var names = {};
    if (ast.locals) {
      names = Object.keys(ast.locals).reduce(function (accum, k) { // start with locals
        accum[k] = true;
        return accum;
      }, names);
    }
    ast.inParams.reduce(function (accum, p) {  // add input params
      accum[p] = true;
      return accum;
    }, names);
    ast.tasks.reduce(function (accum, t) { // add task outputs
      return t.out.reduce(function (innerAccum, p) {
        innerAccum[p] = true;
        return innerAccum;
      }, accum);
    }, names);

    // now we have all possible provided vars, check task inputs are accounted for
    ast.tasks.reduce(function (accum, t) {  // for all tasks
      return t.a.reduce(function (innerAccum, p) { // for all in params, except property
        if (!isLiteralOrProp(p) && !names[p]) innerAccum.push(sprintf(MISSING_INPUTS, p)); // add error if missing
        return innerAccum;
      }, accum);
    }, errors);

    // now check the final task outputs
    ast.outTask.a.reduce(function (accum, p) { // for final task out params
      if (!isLiteralOrProp(p) && !names[p]) accum.push(sprintf(MISSING_INPUTS, p)); // add error if missing
      return accum;
    }, errors);
    return errors;
  }

  return validate;

});
/*global define:true */



define('react/input-parser',['./event-manager'], function (EventManager) {
  

  var defaultExecOptions = {
    reactExecOptions: true,
    outputStyle: 'cb',
  };

  var OUTPUT_STYLES = {
    CALLBACK: 'cb',
    NONE: 'none'
  };

  function isExecOptions(x) { return (x && x.reactExecOptions); }
  function execOptionsFilter(x) { return isExecOptions(x); }
  function nonExecOptionsFilter(x) { return !isExecOptions(x); }
  function mergeExecOptions(accum, options) {
    Object.keys(options).forEach(function (k) { accum[k] = options[k]; });
    return accum;
  }

  function splitArgs(args, inParams, style) {
    var result = { };
    result.args = inParams.map(function (p) { return args.shift(); }); // take args for input params first
    if (style === OUTPUT_STYLES.CALLBACK && args.length) result.cb = args.shift(); // next take the cb
    result.extra = args; // these remaining were after the callback
    return result;
  }

  function inputParser(inputArgs, ast) {
    var parsedInput = { };
    var execOptionsArr = inputArgs.filter(execOptionsFilter);
    execOptionsArr.unshift(defaultExecOptions);
    parsedInput.options = execOptionsArr.reduce(mergeExecOptions, {});

    var args = inputArgs.filter(nonExecOptionsFilter);
    var splitResult = splitArgs(args, ast.inParams, parsedInput.options.outputStyle);
    parsedInput.args = splitResult.args;
    parsedInput.cb = splitResult.cb;
    if (splitResult.outputStyle) parsedInput.options.outputStyle = splitResult.outputStyle;
    if (splitResult.extra) parsedInput.extraArgs = splitResult.extra;
    EventManager.global.emit(EventManager.TYPES.EXEC_INPUT_PREPROCESS, parsedInput);  // hook
    return parsedInput;
  }


  inputParser.defaultExecOptions = defaultExecOptions;
  return inputParser;

});
/*global define:true */



define('react/id',[], function () {
  

  var startingId = 0;

  function createUniqueId() {
    startingId += 1;
    if (startingId === Number.MAX_VALUE) startingId = 0; // if hits this start over //TODO need something better?
    return startingId;
  }

  return {
    createUniqueId: createUniqueId
  };

});
/*global define:true */



define('react/core',['./eventemitter', './error', './validate', './task', './status',
        './vcon', './event-manager', './input-parser', './id', './sprintf'],
       function (EventEmitter, error, validate, taskUtil, STATUS,
                 VContext, EventManager, inputParser, idGenerator, sprintf) {
  

  var reactOptions = {
    stackTraceLimitMin: 30
  };

  var reactEmitter = EventManager.global; // the top emitter

  /**
     merge global react options with parsed options
  */
  function mergeOptions(parsedOptions) {
    return Object.keys(reactOptions).reduce(function (accum, k) {
      if (!accum[k]) accum[k] = reactOptions[k];
      return accum;
    }, parsedOptions);
  }

  /**
     generate a flow name when one is not provided
  */
  function generateFlowName() {
    return sprintf('flow_%s', idGenerator.createUniqueId());
  }

  /**
     Creates react function which the AST can be manipulated and then
     is ready to be executed. Can be used directly or a DSL can wrap this
     to provide the AST.

     @example
     var react = require('react');
     var fn = react();
     var valid2 = fn.setAndValidateAST({
     name: 'optionalName',
     inParams: ['a', 'b'],
     tasks: [
     { type: 'cb', f: multiply, a: ['a', 'b'], out: ['c'] }
     ],
     outTask: { a: ['c'] }
     });
     console.log(fn.ast); // view
     fn(123, 456, cb);
  */
  function reactFactory() {
    if (arguments.length) throw new Error('react() takes no args, check API');

    error.ensureStackTraceLimitSet(reactOptions.stackTraceLimitMin);
    var flowEmitter = EventManager.create();
    flowEmitter.parent = reactEmitter;

    var ast = {
      name: undefined,
      inParams: [],
      tasks: [],
      outTask: {},
      locals: {}
    };

    function setAndValidateAST(newAST) { //set AST then validate, ret error[]
      Object.keys(newAST).forEach(function (k) { ast[k] = newAST[k]; }); // copy all properties
      var errors = validate(ast);
      if (!errors.length) {
        if (!ast.name) ast.name = generateFlowName();
        taskUtil.nameTasks(ast.tasks); //run this so names can be checked in ast
      }
      if (Object.freeze) { //lets freeze the AST so plugin writers don't accidentally manip the ast
        Object.keys(newAST).forEach(function (k) {
          if (typeof(newAST[k]) === 'object') Object.freeze(newAST[k]);
        });
        Object.freeze(newAST);
      }
      flowEmitter.emit(EventManager.TYPES.AST_DEFINED, ast);
      return errors;
    }

    function exec(arg1, arg2, argN, cb) { // called to execute the flow
      /*jshint validthis: true */
      var args = Array.prototype.slice.call(arguments);
      var env = {
        execId: idGenerator.createUniqueId(),
        args: args,
        ast: ast,
        flowEmitter: flowEmitter
      };
      env.name = ast.name || env.execId;
      flowEmitter.emit(EventManager.TYPES.EXEC_FLOW_START, env);  // hook
      var parsedInput = inputParser(args, ast);
      var vCon = VContext.create(parsedInput.args, ast.inParams, ast.locals, this); // create var ctx with in args & locals

      env.parsedInput = parsedInput;
      env.options = mergeOptions(parsedInput.options);
      env.vCon = vCon;
      env.taskDefs = ast.tasks.slice(); // create copy
      env.outTaskDef = Object.create(ast.outTask); // create copy
      reactEmitter.emit(EventManager.TYPES.EXEC_TASKS_PRECREATE, env);  // hook

      var tasks = env.taskDefs.map(taskUtil.create);
      var tasksByName = taskUtil.nameTasks(tasks); // map names to working tasks
      var outTask = taskUtil.createOutTask(env.outTaskDef, parsedInput.cb, tasks, vCon, env.options, env);
      var handleError = taskUtil.createErrorHandler(vCon, outTask);

      function contExec() {
        if (!outTask.f) { return; } //stop execution, we already hit an error, f was cleared
        if (outTask.isReady()) return outTask.exec(); // all tasks done, exec cb, return
        taskUtil.findReadyAndExec(vCon, tasks, tasksByName, handleError, contExec, env);  //exec tasks that ready to run
      }

      tasks.forEach(function (t) {
        t.id = idGenerator.createUniqueId();
        t.env = env;
        if (t.prepare) t.prepare(handleError, vCon, contExec, flowEmitter);
      }); // create callbacks
      contExec();   // start things off
      return outTask.retValue; // could return promise
    }

    var reactFn = exec;        // make the exec() the function returned
    reactFn.ast  = ast;        // put AST hanging off the fn so it can be inspected
    reactFn.setAndValidateAST = setAndValidateAST;   // call to set AST and then validate
    reactFn.events = flowEmitter; // used to listen to execution events for this flow
    return reactFn;
  }

  reactFactory.options = reactOptions;   // global react options
  reactFactory.events = reactEmitter;    // global react emitter
  return reactFactory; // module returns reactFactory to create a react fn
});
/*global define:true */



define('react/parse',['./sprintf'], function (sprintf) {
  

  function splitTrimFilterArgs(commaSepArgs) { //parse 'one, two' into ['one', 'two']
    if (!commaSepArgs) return [];
    return commaSepArgs.split(',')            //split on commas
      .map(function (s) { return s.trim(); }) //trim
      .filter(function (s) { return (s); });  //filter out empty strings
  }

  /**
     @param patternFn regex + fn or splitStr + fn
  */
  function parseReduce(accum, patternFn) {
    if (typeof(accum) !== 'string') return accum; // already matched
    var m = (patternFn.regex) ? patternFn.regex.exec(accum) : accum.split(patternFn.splitStr);
    if (m) return patternFn.fn(m, accum); // pass in matches and origStr, return result obj
    return accum; // no match, return str, will try next matcher
  }

  function parseStr(str, parseMatchers, errStr) {
    var result = parseMatchers.reduce(parseReduce, str);
    if (typeof(result) !== 'string') { // matched
      return result;
    } else { // no match
      throw new Error(sprintf(errStr, str));
    }
  }

  return {
    splitTrimFilterArgs: splitTrimFilterArgs,
    parseStr: parseStr
  };

});

/*global define:true */



define('react/dsl',['./sprintf', './core', './parse', './task'],
       function (sprintf, core, parse, taskUtil) {
  
  /*jshint regexp: false */

  var MISSING_NAME = 'first flow parameter should be the flow name, but found in/out def: %s';
  var INOUT_PARAMS_NO_MATCH = 'params in wrong format, wanted "foo, bar, cb -> err, baz" - found: %s';
  var MISSING_ERR = 'callback specified, but first out param was not "err", use for clarity. Found in/out def: %s';
  var MISSING_CB = 'found err param, but cb/callback is not specified, is this cb-style async or sync function? Found in/out def: %s';
  var EXTRA_TASKARG = 'extra unmatched task arg: %s';

  var INOUT_RE = /\->/;  // used to detect missing name, in/out as first arg
  var CB_NAMES_RE = /^cb|callback$/i;  //cb, Cb, CB, callback, Callback
  var ERR_NAMES_RE = /^err$/i; // err, ERR, Err, ...

  function filterOutTrailingCbParam(args) { // if has trailing cb | callback param, filter it out
    if (args.length && args[args.length - 1].match(CB_NAMES_RE)) args.pop();
    return args;
  }

  function filterOutLeadingErrParam(args) { // if leading err param, filter it out
    if (args.length && args[0].match(ERR_NAMES_RE)) args.shift();
    return args;
  }

  var inOutDefParse = {
    splitStr: '->',
    fn: function (m, origStr) {
      var inParams = parse.splitTrimFilterArgs(m[0]);
      var lastParam = inParams[inParams.length - 1];
      var type = (lastParam && CB_NAMES_RE.test(lastParam)) ? 'cb' : 'ret';
      var outParams = parse.splitTrimFilterArgs(m[1]);
      var firstOutParam = outParams[0];
      if (type === 'cb' && (!firstOutParam || !ERR_NAMES_RE.test(firstOutParam))) {
        throw new Error(sprintf(MISSING_ERR, origStr));  // found cb, but no err param
      } else if (type === 'ret' && firstOutParam && ERR_NAMES_RE.test(firstOutParam)) {
        throw new Error(sprintf(MISSING_CB, origStr));  // found err but not cb param
      }
      return {
        type: type,
        inDef: filterOutTrailingCbParam(inParams),
        outDef: filterOutLeadingErrParam(outParams)
      };
    }
  };

  function parseInOutParams(str) {
    var objDef = parse.parseStr(str, [inOutDefParse], INOUT_PARAMS_NO_MATCH);
    objDef.inDef = filterOutTrailingCbParam(objDef.inDef);
    return objDef;
  }

  function parseTasks(arr) {
    var tasks = [];
    var fn, obj, result;
    while (arr.length >= 2) {
      obj = {};
      fn = arr.shift();
      result = parseInOutParams(arr.shift());
      if (typeof(arr[0]) === 'object') obj = arr.shift(); // has options, use as obj
      obj.f = fn;
      obj.a = result.inDef;
      var type = result.type;
      obj.out = result.outDef;
      obj.type = type;
      tasks.push(obj);
    }
    if (arr.length) throw new Error(sprintf(EXTRA_TASKARG, arr[0]));
    return tasks;
  }

  /**
     Parse the variable arguments into in/out params, options, tasks
  */
  function parseVargs(vargs) {
    var inOutParamStr = vargs.shift() || '';
    // if next arg is object, shift it off as options
    var options = (vargs.length && typeof(vargs[0]) === 'object') ? vargs.shift() : { };
    var taskDefArr = vargs; // rest are for the tasks
    var defObj = {
      inOutParamStr: inOutParamStr,
      taskDefArr: taskDefArr,
      options: options
    };
    return defObj;
  }


  function dslDefine(name, arg1, arg2, argN) {
    var reactFn = core();
    if (name && INOUT_RE.test(name)) throw new Error(sprintf(MISSING_NAME, name));
    var defObj = parseVargs(Array.prototype.slice.call(arguments, 1)); // name, already used
    var inOutDef = parseInOutParams(defObj.inOutParamStr);
    var ast = {
      name: name,
      inParams: inOutDef.inDef,
      tasks: parseTasks(defObj.taskDefArr),
      outTask: { a: inOutDef.outDef }
    };
    if (defObj.options) Object.keys(defObj.options).forEach(function (k) { ast[k] = defObj.options[k]; });
    var errors = reactFn.setAndValidateAST(ast);
    if (errors.length) {
      var errorStr = errors.join('\n');
      throw new Error(errorStr);
    }
    return reactFn;
  }

  function selectFirst(name, arg1, arg2, argN) {
    var reactFn = core();
    var defObj = parseVargs(Array.prototype.slice.call(arguments, 1)); // name, already used
    var inOutDef = parseInOutParams(defObj.inOutParamStr);
    var tasks = taskUtil.serializeTasks(parseTasks(defObj.taskDefArr));
    var ast = {
      name: name,
      inParams: inOutDef.inDef,
      tasks: tasks,
      outTask: { type: 'finalcbFirst', a: inOutDef.outDef },
    };
    if (defObj.options) Object.keys(defObj.options).forEach(function (k) { ast[k] = defObj.options[k]; });
    var errors = reactFn.setAndValidateAST(ast);
    if (errors.length) {
      var errorStr = errors.join('\n');
      throw new Error(errorStr);
    }
    return reactFn;
  }

  dslDefine.selectFirst = selectFirst;
  return dslDefine;

});
/*global define:true */



define('react/track-tasks',[], function () {
  

  /**
     Track the tasks, start, complete, args, results, elapsed time
     Emits events that can be monitored

     - track start and complete
     - record args each task was called with
     - record results at completion
     - record start, end, and calc elapsed time
     - emits flow.begin with flowEnv
     - emits task.begin with task
     - emits task.complete with task
     - emits flow complete with flowEnv
     - emits flow errored with flowEnv

     @example
     var react = require('react');
     react.trackTasks(); // enable task and flow tracking
    */


  var trackingTasks = false;

  function trackTasks(react) {
    if (trackingTasks) return;  // already tracking
    trackingTasks = true;

    react.events.on(react.events.TYPES.EXEC_FLOW_START, function (env) {
      env.startTime = Date.now();
      env.flowEmitter.emit(react.events.TYPES.FLOW_BEGIN, env); //fire public ev
    });

    react.events.on(react.events.TYPES.EXEC_TASK_START, function (task) {
      task.startTime = Date.now();
      task.env.flowEmitter.emit(react.events.TYPES.TASK_BEGIN, task); //fire public ev
    });

    react.events.on(react.events.TYPES.EXEC_TASK_COMPLETE, function (task) {
      task.endTime = Date.now();
      task.elapsedTime = task.endTime - task.startTime;
      task.env.flowEmitter.emit(react.events.TYPES.TASK_COMPLETE, task); // fire public ev
    });

    react.events.on(react.events.TYPES.EXEC_TASK_ERRORED, function (task) {
      task.endTime = Date.now();
      task.elapsedTime = task.endTime - task.startTime;
      task.env.flowEmitter.emit(react.events.TYPES.TASK_ERRORED, task); // fire public ev
    });

    react.events.on(react.events.TYPES.EXEC_FLOW_COMPLETE, function (env) {
      env.endTime = Date.now();
      env.elapsedTime = env.endTime - env.startTime;
      env.flowEmitter.emit(react.events.TYPES.FLOW_COMPLETE, env); //fire public ev
    });

    react.events.on(react.events.TYPES.EXEC_FLOW_ERRORED, function (env) {
      env.endTime = Date.now();
      env.elapsedTime = env.endTime - env.startTime;
      env.flowEmitter.emit(react.events.TYPES.FLOW_ERRORED, env); //fire public ev
    });

  }

  return trackTasks;

});
/*global define:true */



define('react/log-events',['util'], function (util) { // TODO replace util.inspect with something portable to browser
  

  var logEventsMod = { };

  /**
     Log events to console.error

     @example
     var react = require('react');
     react.logEvents(); // log all task and flow events on all react functions
     react.logEvents('task.*'); // log all task events on all react functions
     react.logEvents(flowFn); // log all task and flow events on flowFn only
     react.logEvents(flowFn, 'flow.*'); // log all flow events on flowFn only
    */

  var ALL_FLOW_EVENTS = 'flow.*';
  var ALL_TASK_EVENTS = 'task.*';
  var FLOW_RE = /^flow\./;

  function flowLog(obj) {
    /*jshint validthis: true */
    var time = new Date();
    time.setTime(obj.startTime);
    var argsNoCb = obj.args.filter(function (a) { return (typeof(a) !== 'function'); });
    var eventTimeStr = time.toISOString();
    if (this.event === 'flow.complete') {
      var env = obj;
      console.error('%s: %s \tmsecs: %s \n\targs: %s \n\tresults: %s\n',
                    this.event, env.name, env.elapsedTime, util.inspect(argsNoCb), util.inspect(env.results));
    } else {
      var name = obj.name;
      var args = obj.args;
      console.error('%s: %s \n\targs: %s\n', this.event, name, util.inspect(argsNoCb));
    }
  }

  function taskLog(obj) {
    /*jshint validthis: true */
    var time = new Date();
    time.setTime(obj.startTime);
    var argsNoCb = obj.args.filter(function (a) { return (typeof(a) !== 'function'); });
    var eventTimeStr = time.toISOString();
    if (this.event === 'task.complete') {
      var task = obj;
      console.error('%s: %s:%s \tmsecs: %s \n\targs: %s \n\tresults: %s\n',
                    this.event, task.env.name, task.name, task.elapsedTime, util.inspect(argsNoCb), util.inspect(task.results));
    } else {
      var name = obj.name;
      var args = obj.args;
      console.error('%s: %s:%s \n\targs: %s\n', this.event, obj.env.name, obj.name, util.inspect(argsNoCb));
    }

  }

  /**
     Log flow and task events for a flowFn or all of react.
     If called multiple times, remove previous listener (if any) before
     adding.

     @example
     var react = require('react');
     react.logEvents(flowFn, eventWildcard); //log events on flowfn matching wildcard

     @param flowFn Flow function or global react object
     @param eventWildcard wildcarded event type, if not provided use flow.* and task.*
  */
  function logEvents(flowFn, eventWildcard) {
    if (!flowFn) throw new Error('flowFn is required');
    if (!flowFn.events._loggingEvents) flowFn.events._loggingEvents = [];
    if (eventWildcard === false) { // turn off logging
      flowFn.events._loggingEvents.forEach(function (evt) {
        flowFn.events.removeAllListeners(evt);
      });
      flowFn.events._loggingEvents.length = 0; // clear
    } else if (eventWildcard && eventWildcard !== '*') {
      var logFn = (FLOW_RE.test(eventWildcard)) ? flowLog : taskLog;
      flowFn.events.removeListener(eventWildcard, logFn);
      flowFn.events.on(eventWildcard, logFn);
      flowFn.events._loggingEvents.push(eventWildcard);
    } else { // none provided, use flow.* and task.*
      //output events as tasks start and complete
      flowFn.events.removeListener(ALL_FLOW_EVENTS, flowLog);
      flowFn.events.on(ALL_FLOW_EVENTS, flowLog);
      flowFn.events._loggingEvents.push(ALL_FLOW_EVENTS);
      flowFn.events.removeListener(ALL_TASK_EVENTS, taskLog);
      flowFn.events.on(ALL_TASK_EVENTS, taskLog);
      flowFn.events._loggingEvents.push(ALL_TASK_EVENTS);
    }
  }

  logEventsMod.logEvents = logEvents;
  return logEventsMod;

});
/*global define:true */



define('react/promise-resolve',[], function () {
  

  /**
     Auto resolve promises passed in as arguments to the flow

     - Detects promises by checking for .then()
     - Create promise name for param (param__promise)
     - moves existing vCon promise into the param__promise
     - creates WhenTask which resolves param__promise into param
  */


  var PROMISE_SUFFIX = '__promise';  // added to param names that are promises

  var resolvingPromises = false;

  function resolvePromises(react) {
    if (resolvingPromises) return; // already resolving
    resolvingPromises = true;

    react.events.on(react.events.TYPES.EXEC_TASKS_PRECREATE, function (env) {
      var vConValues = env.vCon.values;
      var promiseParams = env.ast.inParams.filter(function (p) {
        var value = vConValues[p];
        return (value && typeof(value.then) === 'function');
      });
      promiseParams.forEach(function (p) {
        var promiseName = p + PROMISE_SUFFIX;
        vConValues[promiseName] = vConValues[p];
        vConValues[p] = undefined;
        env.taskDefs.push({
          type: 'when',
          a: [promiseName],
          out: [p]
        });
      });
    });

  }

  return resolvePromises;

});
/*global define:true */



define('react/event-collector',[], function () {
  

  /**
     create an instance of the event collector
  */
  function instantiate(react) {
    react.trackTasks(); // enable task tracking

    var AST_EVENTS_RE = /^ast\./;
    var TASK_EVENTS_RE = /^task\./;
    var FLOW_EVENTS_RE = /^flow\./;

    /**
       Accumulator to make it easy to capture events

       @example
       var react = require('react');
       var collector = react.createEventCollector();
       collector.capture(); // capture all flow and task events for all react flows
       collector.capture('flow.*'); // capture all flow events for all react flows
       collector.capture(flowFn, 'task.*'); // capture task events on a flow
       collector.capture(flowFn, 'flow.*'); // add capture flow events on a flow
       var events = collector.list();  // retrieve the list of events
       collector.clear();  // clear the list of events;
    */
    function EventCollector() {
      this.events = [];
    }

    /**
       register listener to capture events for a specific flow
       @param flowFn the react flow function or can pass global react
       @param eventId event id or wildcarded id
    */
    EventCollector.prototype.capture = function (flowFn, eventId) {
      /*jshint validthis: true */
      if (!eventId && typeof(flowFn) === 'string') { // only eventId provided
        eventId = flowFn;
        flowFn = react; // global react
      } else if (!flowFn) flowFn = react; // global react
      if (!eventId) eventId = '*'; // default to all
      var emitter = flowFn.events;
      var self = this;
      function accumEvents(obj) {
        var eventObject = {
          event: this.event,
          time: Date.now()
        };
        if (FLOW_EVENTS_RE.test(this.event)) {
          eventObject.env = obj;
        } else if (TASK_EVENTS_RE.test(this.event)) {
          eventObject.task = obj;
        } else if (AST_EVENTS_RE.test(this.event)) {
          eventObject.ast = obj;
        }
        self.events.push(eventObject);
      }
      emitter.on(eventId, accumEvents);
    };

    EventCollector.prototype.list = function () {
      return this.events;
    };

    EventCollector.prototype.clear = function () {
      this.events = []; // clear
    };

    return new EventCollector();
  }

  return instantiate; // return the factory for creating EventCollector

});
/*global define:true */



define('react/react',['./core', './dsl', './track-tasks', './log-events', './promise-resolve', './event-collector'],
       function (core, dsl, trackTasksFn, logEventsMod, resolvePromisesFn, eventCollectorFactory) {
  

  var react = dsl; // core + default dsl

  /**
     Enable detection of promises and resolution
    */
  function resolvePromises() {
    resolvePromisesFn(react);
  }

  /**
     Enable tracking of tasks and flow execution, emitting events and
     tracking start, end, elapsed time
    */
  function trackTasks() {
    trackTasksFn(react);
  }

  /**
     If called, load the built-in plugin for log events and invoke

     @param flowFn [function] if not provided uses global react
     @param eventWildcard [string] pattern to log events for
  */
  function logEvents(flowFn, eventWildcard) {
    if (typeof(flowFn) !== 'function') { // only wildcard provided
      eventWildcard = flowFn;
      flowFn = undefined;
    }
    if (!flowFn) flowFn = react; // use global
    trackTasks();
    return logEventsMod.logEvents(flowFn, eventWildcard);
  }

  /**
     Instantiate an event collector
    */
  function createEventCollector() {
    return eventCollectorFactory(react);
  }

  react.options = core.options; // global react options
  react.events = core.events;   // global react event emitter
  react.logEvents = logEvents;  // enable event logging
  react.resolvePromises = resolvePromises; // enable promise resolution
  react.trackTasks = trackTasks; // enable tracking of tasks
  react.createEventCollector = createEventCollector; // create instance of EventCollector
  return react;

});
define('react', ['react/react'], function (main) { return main; });
