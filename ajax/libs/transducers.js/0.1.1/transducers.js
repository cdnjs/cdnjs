var transducers =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	// basic protocol helpers

	var symbolExists = typeof Symbol !== 'undefined';

	function throwProtocolError(name, coll) {
	  throw new Error("don't know how to " + name + " collection: " +
	                  coll);
	}

	function fullfillsProtocols(obj /* names ... */) {
	  var names = Array.prototype.slice.call(arguments, 1);
	  return names.reduce(function(result, name) {
	    if(symbolExists) {
	      return result && obj[name === 'iterator' ?
	                           Symbol.iterator :
	                           Symbol.for(name)];
	    }
	    else {
	      return result && obj['@@' + name];
	    }
	  }, true);
	}

	function getProtocolMethod(obj, name) {
	  if(symbolExists) {
	    if(name === 'iterator') {
	      return obj[Symbol.iterator];
	    }
	    else {
	      return obj[Symbol.for(name)];
	    }
	  }
	  return obj['@@' + name];
	}

	// helpers

	function isArray(x) {
	  return x instanceof Array;
	}

	function isObject(x) {
	  return x instanceof Object &&
	    Object.getPrototypeOf(x) === Object.getPrototypeOf({});
	}

	function isNumber(x) {
	  return typeof x === 'number';
	}

	function range(n) {
	  var arr = new Array(n);
	  for(var i=0; i<arr.length; i++) {
	    arr[i] = i;
	  }
	  return arr;
	}

	// TODO: get rid of iterate and allow reducers to stop reducing.
	// Didn't do that yet because performance.
	function Iterated(val) {
	  this.val = val;
	}

	function iterate(coll, f) {
	  if(isArray(coll)) {
	    for(var i=0; i<coll.length; i++) {
	      var val = f(coll[i], i);
	      if(val instanceof Iterated) {
	        return val.val;
	      }
	    }
	    return;
	  }
	  else if(isObject(coll)) {
	    return iterate(Object.keys(coll), function(k) {
	      return f([k, coll[k]]);
	    });
	  }
	  else if(fullfillsProtocols(coll, 'iterator')) {
	    var iter = getProtocolMethod(coll, 'iterator').call(coll);
	    var val = iter.next();
	    while(!val.done) {
	      if(f(val.value) instanceof Iterated) {
	        return val.value.val;
	      }
	      val = iter.next();
	    }
	    return;
	  }
	  throwProtocolError('iterate', coll);
	}

	function reduce(coll, f, init) {
	  if(isArray(coll)) {
	    var result = init;
	    var index = -1;
	    var len = coll.length;
	    while(++index < len) {
	      result = f(result, coll[index], index);
	    }
	    return result;
	  }
	  else if(isObject(coll)) {
	    return reduce(Object.keys(coll), function(result, k) {
	      return f(result, [k, coll[k]]);
	    }, init);
	  }
	  else if(fullfillsProtocols(coll, 'iterator')) {
	    var result = init;
	    var iter = getProtocolMethod(coll, 'iterator').call(coll);
	    var val = iter.next();
	    while(!val.done) {
	      result = f(result, val.value);
	      val = iter.next();
	    }
	    return result;
	  }
	  throwProtocolError('reduce', coll);
	}

	function append(coll, x) {
	  if(isArray(coll)) {
	    coll.push(x);
	    return coll;
	  }
	  else if(isObject(coll)) {
	    if(isObject(x)) {
	      var keys = Object.keys(x);
	      for(var i=0; i<keys.length; i++) {
	        coll[keys[i]] = x[keys[i]];
	      }
	      return coll;
	    }
	    else if(isArray(x) && x.length === 2) {
	      coll[x[0]] = x[1];
	      return coll;
	    }
	    throw new Error('cannot append ' + x + ' to object');
	  }
	  else if(fullfillsProtocols(coll, 'append')) {
	    return getProtocolMethod(coll, 'append').call(coll, x);
	  }
	  throwProtocolError('append', coll);
	}

	function empty(coll) {
	  if(isArray(coll)) {
	    return [];
	  }
	  else if(isObject(coll)) {
	    return {};
	  }
	  else if(fullfillsProtocols(coll, 'empty')) {
	    return getProtocolMethod(Object.getPrototypeOf(coll), 'empty')()
	  }
	  throwProtocolError('make empty', coll);
	}

	function transduce(coll, xform, f, init) {
	  return reduce(coll, xform(f), init);
	}

	function into(to, xform, from) {
	  return transduce(from, xform, append, to);
	}

	function compose() {
	  var funcs = Array.prototype.slice.call(arguments);
	  return function(r) {
	    var value = r;
	    for(var i=funcs.length-1; i>=0; i--) {
	      value = funcs[i](value);
	    }
	    return value;
	  }
	}

	// transformations

	function map(f, coll) {
	  if(coll) {
	    if(isArray(coll)) {
	      return coll.map(f);
	    }
	    else {
	      var i = 0;
	      return reduce(coll, function(result, x) {
	        return append(result, f(x, i++));
	      }, empty(coll));
	    }
	  }

	  return function(r) {
	    var i = 0;
	    return function(res, input) {
	      if(input === undefined) {
	        return r(res, input);
	      }
	      return r(res, f(input, i++));
	    }
	  }
	}

	function filter(f, coll) {
	  if(coll) {
	    if(isArray(coll)) {
	      return coll.filter(f);
	    }
	    else {
	      var i = 0;
	      return reduce(coll, function(result, x) {
	        if(f(x, i++)) {
	          return append(result, x);
	        }
	        return result;
	      }, empty(coll));
	    }
	  }

	  return function(r) {
	    var i = 0;
	    return function(res, input) {
	      if(f(input, i++)) {
	        return r(res, input);
	      }
	      return res;
	    };
	  };
	}

	function remove(f, coll) {
	  return filter(function(x) { return !f(x); }, coll);
	}

	// function takeWhile(f, coll) {
	//   if(coll) {
	//     reduce(coll, function(result, x) {
	//       if(x) {
	//         return append(result, x);
	//       }
	//       return REDUCE_STOP;
	//     }, empty(coll));
	//   }
	// }

	function keep(f, coll) {
	  return filter(function(x) { return x != null }, coll);
	}

	function dedupe(coll) {
	  var last;

	  if(coll) {
	    return reduce(
	      coll,
	      function(result, x) {
	        if(x !== last) {
	          last = x;
	          return append(result, x);
	        }
	        return result;
	      },
	      empty(coll)
	    );
	  }

	  return function(r) {
	    return function(result, x) {
	      if(x !== last) {
	        last = x;
	        r(result, x);
	      }
	      return result;
	    };
	  }
	}

	function take(coll, n) {
	  if(isNumber(n)) {
	    var result = empty(coll);
	    return iterate(coll, function(x, i) {
	      if(i + 1 <= n) {
	        result = append(result, x);
	      }
	      else {
	        return Iterated(result);
	      }
	    });
	  }
	  else {
	    n = coll;
	  }


	}

	// pure transducers (doesn't take collections)

	function cat(r) {
	  return function(result, input) {
	    return reduce(input, r, result);
	  }
	}

	function mapcat(f) {
	  return compose(map(f), cat);
	}

	module.exports = {
	  reduce: reduce,
	  iterate: iterate,
	  append: append,
	  empty: empty,
	  transduce: transduce,
	  into: into,
	  compose: compose,
	  map: map,
	  filter: filter,
	  remove: remove,
	  cat: cat,
	  mapcat: mapcat,
	  keep: keep,
	  dedupe: dedupe
	};


/***/ }
/******/ ])