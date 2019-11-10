(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["labella"] = factory();
	else
		root["labella"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	Copyright 2015 Twitter, Inc.
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
	*/

	module.exports = {
	  Node: __webpack_require__(1),
	  Force: __webpack_require__(2),
	  Distributor: __webpack_require__(3),
	  Renderer: __webpack_require__(10)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function () {
	  function Node(idealPos, width, data) {
	    _classCallCheck(this, Node);

	    this.idealPos = idealPos;
	    this.currentPos = idealPos;
	    this.width = width;
	    this.data = data;
	    this.layerIndex = 0;
	  }

	  // return negative if overlap


	  _createClass(Node, [{
	    key: 'distanceFrom',
	    value: function distanceFrom(node) {
	      var halfWidth = this.width / 2;
	      var nodeHalfWidth = node.width / 2;
	      // max(a[0], b[0]) - min(a[1], b[1])
	      return Math.max(this.currentPos - halfWidth, node.currentPos - nodeHalfWidth) - Math.min(this.currentPos + halfWidth, node.currentPos + nodeHalfWidth);
	    }
	  }, {
	    key: 'moveToIdealPosition',
	    value: function moveToIdealPosition() {
	      this.currentPos = this.idealPos;
	      return this;
	    }
	  }, {
	    key: 'displacement',
	    value: function displacement() {
	      return this.idealPos - this.currentPos;
	    }
	  }, {
	    key: 'overlapWithNode',
	    value: function overlapWithNode(node) {
	      var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      return this.distanceFrom(node) - buffer < 0;
	    }
	  }, {
	    key: 'overlapWithPoint',
	    value: function overlapWithPoint(pos) {
	      var halfWidth = this.width / 2;
	      return pos >= this.currentPos - halfWidth && pos <= this.currentPos + halfWidth;
	    }
	  }, {
	    key: 'positionBefore',
	    value: function positionBefore(node) {
	      var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      return node.currentLeft() - this.width / 2 - buffer;
	    }
	  }, {
	    key: 'positionAfter',
	    value: function positionAfter(node) {
	      var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      return node.currentRight() + this.width / 2 + buffer;
	    }
	  }, {
	    key: 'currentRight',
	    value: function currentRight() {
	      return this.currentPos + this.width / 2;
	    }
	  }, {
	    key: 'currentLeft',
	    value: function currentLeft() {
	      return this.currentPos - this.width / 2;
	    }
	  }, {
	    key: 'idealRight',
	    value: function idealRight() {
	      return this.idealPos + this.width / 2;
	    }
	  }, {
	    key: 'idealLeft',
	    value: function idealLeft() {
	      return this.idealPos - this.width / 2;
	    }
	  }, {
	    key: 'createStub',
	    value: function createStub(width) {
	      var stub = new Node(this.idealPos, width, this.data);
	      stub.currentPos = this.currentPos;
	      stub.child = this;
	      this.parent = stub;
	      return stub;
	    }
	  }, {
	    key: 'removeStub',
	    value: function removeStub() {
	      if (this.parent) {
	        this.parent.child = null;
	        this.parent = null;
	      }
	      return this;
	    }
	  }, {
	    key: 'isStub',
	    value: function isStub() {
	      return !!this.child;
	    }
	  }, {
	    key: 'getPathToRoot',
	    value: function getPathToRoot() {
	      var path = [];
	      var current = this;
	      while (current) {
	        path.push(current);
	        current = current.parent;
	      }
	      return path;
	    }
	  }, {
	    key: 'getPathFromRoot',
	    value: function getPathFromRoot() {
	      return this.getPathToRoot().reverse();
	    }
	  }, {
	    key: 'getPathToRootLength',
	    value: function getPathToRootLength() {
	      var length = 0;
	      var current = this;
	      while (current) {
	        var targetPos = current.parent ? current.parent.currentPos : current.idealPos;
	        length += Math.abs(current.currentPos - targetPos);
	        current = current.parent;
	      }

	      return length;
	    }

	    // Trace back to the node without parent

	  }, {
	    key: 'getRoot',
	    value: function getRoot() {
	      var previous = this;
	      var current = this;
	      while (current) {
	        previous = current;
	        current = current.parent;
	      }
	      return previous;
	    }
	  }, {
	    key: 'getLayerIndex',
	    value: function getLayerIndex() {
	      return this.layerIndex;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var node = new Node(this.idealPos, this.width, this.data);
	      node.currentPos = this.currentPos;
	      node.layerIndex = this.layerIndex;
	      return node;
	    }
	  }]);

	  return Node;
	}();

	module.exports = Node;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Distributor = __webpack_require__(3);
	var helper = __webpack_require__(4);
	var removeOverlap = __webpack_require__(8);

	var DEFAULT_OPTIONS = {
	  nodeSpacing: 3,
	  minPos: 0,
	  maxPos: null,

	  algorithm: 'overlap',
	  removeOverlap: true,
	  density: 0.85,
	  stubWidth: 1
	};

	var Force = function Force(_options) {
	  var force = {};
	  var options = helper.extend({}, DEFAULT_OPTIONS);
	  var distributor = new Distributor();
	  var nodes = [];
	  var layers = null;

	  force.nodes = function (x) {
	    if (!arguments.length) return nodes;
	    nodes = x;
	    layers = [x.concat()];
	    return force;
	  };

	  force.getLayers = function () {
	    return layers;
	  };

	  force.options = function (x) {
	    if (!arguments.length) return options;
	    options = helper.extend(options, x);

	    var disOptions = helper.pick(options, Object.keys(Distributor.DEFAULT_OPTIONS));
	    if (helper.isDefined(options.minPos) && helper.isDefined(options.maxPos)) {
	      disOptions.layerWidth = options.maxPos - options.minPos;
	    } else {
	      disOptions.layerWidth = null;
	    }
	    distributor.options(disOptions);

	    return force;
	  };

	  force.options(_options);

	  force.compute = function () {
	    var overlapOptions = helper.pick(options, Object.keys(removeOverlap.DEFAULT_OPTIONS));

	    nodes.forEach(function (node) {
	      node.removeStub();
	    });

	    layers = distributor.distribute(nodes);
	    layers.map(function (nodes, layerIndex) {
	      nodes.forEach(function (node) {
	        node.layerIndex = layerIndex;
	      });
	      if (options.removeOverlap) {
	        removeOverlap(nodes, overlapOptions);
	      }
	    });

	    return force;
	  };

	  force.start = function () {
	    console.log('[warning] force.start() is deprecated. Please use force.compute() instead.');
	  };

	  return force;
	};

	Force.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

	module.exports = Force;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helper = __webpack_require__(4);
	var IntervalTree = __webpack_require__(6);

	var DEFAULT_OPTIONS = {
	  algorithm: 'overlap',
	  layerWidth: 1000,
	  density: 0.75,
	  nodeSpacing: 3,
	  stubWidth: 1
	};

	var Distributor = function Distributor(options) {
	  var distributor = {};

	  options = helper.extend({}, DEFAULT_OPTIONS, options);

	  distributor.options = function (x) {
	    if (!arguments.length) return options;
	    options = helper.extend(options, x);
	    return distributor;
	  };

	  distributor.computeRequiredWidth = function (nodes) {
	    return helper.sum(nodes, function (d) {
	      return d.width + options.nodeSpacing;
	    }) - options.nodeSpacing;
	  };

	  distributor.maxWidthPerLayer = function () {
	    return options.density * options.layerWidth;
	  };

	  distributor.needToSplit = function (nodes) {
	    return distributor.estimateRequiredLayers(nodes) > 1;
	  };

	  distributor.estimateRequiredLayers = function (nodes) {
	    return options.layerWidth ? Math.ceil(distributor.computeRequiredWidth(nodes) / distributor.maxWidthPerLayer()) : 1;
	  };

	  var algorithms = {
	    simple: function simple(nodes) {
	      var numLayers = distributor.estimateRequiredLayers(nodes);

	      var layers = [];
	      for (var i = 0; i < numLayers; i++) {
	        layers.push([]);
	      }

	      nodes.forEach(function (node, i) {
	        var mod = i % numLayers;
	        layers[mod].push(node);

	        var stub = node;
	        for (var j = mod - 1; j >= 0; j--) {
	          stub = stub.createStub(options.stubWidth);
	          layers[j].push(stub);
	        }
	      });

	      return layers;
	    },
	    roundRobin: function roundRobin(nodes) {
	      var layers = [];

	      return layers;
	    },
	    overlap: function overlap(nodes) {
	      var layers = [];
	      var maxWidth = distributor.maxWidthPerLayer();

	      var puntedNodes = nodes.concat();
	      var puntedWidth = distributor.computeRequiredWidth(puntedNodes);

	      while (puntedWidth > maxWidth) {
	        distributor.countIdealOverlaps(puntedNodes);

	        var nodesInCurrentLayer = puntedNodes.concat();
	        var currentlayerWidth = puntedWidth;
	        puntedNodes = [];

	        while (nodesInCurrentLayer.length > 2 && currentlayerWidth > maxWidth) {
	          // Sort by overlaps
	          nodesInCurrentLayer.sort(function (a, b) {
	            return b.overlapCount - a.overlapCount;
	          });

	          // Remove the node with most overlap
	          var first = nodesInCurrentLayer.shift();

	          // Update width
	          currentlayerWidth -= first.width;
	          currentlayerWidth += options.stubWidth;

	          // Update overlap count for the remaining nodes
	          first.overlaps.forEach(function (node) {
	            node.overlapCount--;
	          });

	          // Add removed node to the next layer
	          puntedNodes.push(first);
	        }

	        layers.push(nodesInCurrentLayer);

	        puntedWidth = distributor.computeRequiredWidth(puntedNodes);
	      }

	      if (puntedNodes.length > 0) {
	        layers.push(puntedNodes);
	      }

	      // Create stubs
	      // From last layer
	      for (var i = layers.length - 1; i >= 1; i--) {
	        var layer = layers[i];
	        // For each node in the layer
	        for (var k = 0; k < layer.length; k++) {
	          var node = layer[k];
	          // If it is not a stub
	          if (node.isStub()) continue;
	          // Create one stub for each layer above it
	          var stub = node;
	          for (var j = i - 1; j >= 0; j--) {
	            stub = stub.createStub(options.stubWidth);
	            layers[j].push(stub);
	          }
	        }
	      }

	      return layers;
	    }
	  };

	  distributor.countIdealOverlaps = function (nodes) {
	    var iTree = new IntervalTree(options.layerWidth / 2);
	    nodes.forEach(function (node) {
	      iTree.add([node.idealLeft(), node.idealRight(), node]);
	    });

	    nodes.forEach(function (node) {
	      var overlaps = iTree.search(node.idealLeft(), node.idealRight());
	      node.overlaps = overlaps.map(function (x) {
	        return x.data[2];
	      });
	      node.overlapCount = overlaps.length;
	    });

	    return nodes;
	  };

	  distributor.distribute = function (nodes) {
	    if (!nodes || nodes.length === 0) return [];

	    if (options.algorithm == 'none' || !helper.isDefined(options.algorithm)) {
	      return [nodes];
	    }

	    if (!distributor.needToSplit(nodes)) {
	      return [nodes];
	    }

	    var sortedNodes = nodes.concat().sort(function (a, b) {
	      return a.idealPos - b.idealPos;
	    });

	    if (typeof options.algorithm == 'function') {
	      return options.algorithm(sortedNodes, options);
	    } else if (algorithms.hasOwnProperty(options.algorithm)) {
	      return algorithms[options.algorithm](sortedNodes);
	    } else {
	      throw 'Unknown algorithm: ' + options.algorithm;
	    }
	  };

	  return distributor;
	};

	Distributor.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

	// return module
	module.exports = Distributor;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helper = {
	  isDefined: function isDefined(x) {
	    return x !== null && x !== undefined;
	  },
	  last: function last(array) {
	    return array.length > 0 ? array[array.length - 1] : null;
	  },
	  pick: function pick(object, keys) {
	    return keys.reduce(function (prev, key) {
	      prev[key] = object[key];
	      return prev;
	    }, {});
	  },
	  sum: function sum(array, accessor) {
	    return array.map(accessor).reduce(function (prev, current) {
	      return prev + current;
	    }, 0);
	  }
	};

	helper.extend = __webpack_require__(5);

	module.exports = helper;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*
	This file is modified from https://github.com/justmoon/node-extend
	The MIT License (MIT)

	Copyright (c) 2014 Stefan Thomas

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
	  if (typeof Array.isArray === 'function') {
	    return Array.isArray(arr);
	  }

	  return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
	  'use strict';

	  if (!obj || toStr.call(obj) !== '[object Object]') {
	    return false;
	  }

	  var has_own_constructor = hasOwn.call(obj, 'constructor');
	  var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	  // Not own constructor property must be Object
	  if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
	    return false;
	  }

	  // Own properties are enumerated firstly, so to speed up,
	  // if last one is own, then all properties are own.
	  var key;
	  for (key in obj) {}

	  return key === undefined || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
	  'use strict';

	  var options,
	      name,
	      src,
	      copy,
	      copyIsArray,
	      clone,
	      target = arguments[0],
	      i = 1,
	      length = arguments.length,
	      deep = false;

	  // Handle a deep copy situation
	  if (typeof target === 'boolean') {
	    deep = target;
	    target = arguments[1] || {};
	    // skip the boolean and the target
	    i = 2;
	  } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function' || target == null) {
	    target = {};
	  }

	  for (; i < length; ++i) {
	    options = arguments[i];
	    // Only deal with non-null/undefined values
	    if (options != null) {
	      // Extend the base object
	      for (name in options) {
	        src = target[name];
	        copy = options[name];

	        // Prevent never-ending loop
	        if (target === copy) {
	          continue;
	        }

	        // Recurse if we're merging plain objects or arrays
	        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && isArray(src) ? src : [];
	          } else {
	            clone = src && isPlainObject(src) ? src : {};
	          }

	          // Never move original objects, clone them
	          target[name] = extend(deep, clone, copy);

	          // Don't bring in undefined values
	        } else if (copy !== undefined) {
	          target[name] = copy;
	        }
	      }
	    }
	  }

	  // Return the modified object
	  return target;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	This file is modified from https://github.com/shinout/interval-tree

	(The MIT License)

	Copyright (c) 2012 SHIN Suzuki <shinout310@gmail.com>

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	'Software'), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	var SortedList = __webpack_require__(7);

	/**
	 * IntervalTree
	 *
	 * @param (object) data:
	 * @param (number) center:
	 * @param (object) options:
	 *   center:
	 *
	 **/
	function IntervalTree(center, options) {
	  options || (options = {});

	  this.startKey = options.startKey || 0; // start key
	  this.endKey = options.endKey || 1; // end key
	  this.intervalHash = {}; // id => interval object
	  this.pointTree = new SortedList({ // b-tree of start, end points
	    compare: function compare(a, b) {
	      if (a == null) return -1;
	      if (b == null) return 1;
	      var c = a[0] - b[0];
	      return c > 0 ? 1 : c == 0 ? 0 : -1;
	    }
	  });

	  this._autoIncrement = 0;

	  // index of the root node
	  if (!center || typeof center != 'number') {
	    throw new Error('you must specify center index as the 2nd argument.');
	  }

	  this.root = new Node(center, this);
	}

	/**
	 * publid methods
	 **/

	/**
	 * add new range
	 **/
	IntervalTree.prototype.add = function (data, id) {
	  if (this.intervalHash[id]) {
	    throw new Error('id ' + id + ' is already registered.');
	  }

	  if (id == undefined) {
	    while (this.intervalHash[this._autoIncrement]) {
	      this._autoIncrement++;
	    }
	    id = this._autoIncrement;
	  }

	  var itvl = new Interval(data, id, this.startKey, this.endKey);
	  this.pointTree.insert([itvl.start, id]);
	  this.pointTree.insert([itvl.end, id]);
	  this.intervalHash[id] = itvl;
	  this._autoIncrement++;
	  _insert.call(this, this.root, itvl);
	};

	/**
	 * search
	 *
	 * @param (integer) val:
	 * @return (array)
	 **/
	IntervalTree.prototype.search = function (val1, val2) {
	  var ret = [];
	  if (typeof val1 != 'number') {
	    throw new Error(val1 + ': invalid input');
	  }

	  if (val2 == undefined) {
	    _pointSearch.call(this, this.root, val1, ret);
	  } else if (typeof val2 == 'number') {
	    _rangeSearch.call(this, val1, val2, ret);
	  } else {
	    throw new Error(val1 + ',' + val2 + ': invalid input');
	  }
	  return ret;
	};

	/**
	 * remove:
	 **/
	IntervalTree.prototype.remove = function (interval_id) {};

	/**
	 * private methods
	 **/

	/**
	 * _insert
	 **/
	function _insert(node, itvl) {
	  if (itvl.end < node.idx) {
	    if (!node.left) {
	      node.left = new Node(itvl.start + itvl.end >> 1, this);
	    }
	    return _insert.call(this, node.left, itvl);
	  }

	  if (node.idx < itvl.start) {
	    if (!node.right) {
	      node.right = new Node(itvl.start + itvl.end >> 1, this);
	    }
	    return _insert.call(this, node.right, itvl);
	  }
	  return node.insert(itvl);
	}

	/**
	 * _pointSearch
	 * @param (Node) node
	 * @param (integer) idx
	 * @param (Array) arr
	 **/
	function _pointSearch(node, idx, arr) {
	  if (!node) return;

	  if (idx < node.idx) {
	    node.starts.every(function (itvl) {
	      var bool = itvl.start <= idx;
	      if (bool) arr.push(itvl.result());
	      return bool;
	    });
	    return _pointSearch.call(this, node.left, idx, arr);
	  } else if (idx > node.idx) {
	    node.ends.every(function (itvl) {
	      var bool = itvl.end >= idx;
	      if (bool) arr.push(itvl.result());
	      return bool;
	    });
	    return _pointSearch.call(this, node.right, idx, arr);
	  }
	  // exact equal
	  else {
	      node.starts.map(function (itvl) {
	        arr.push(itvl.result());
	      });
	    }
	}

	/**
	 * _rangeSearch
	 * @param (integer) start
	 * @param (integer) end
	 * @param (Array) arr
	 **/
	function _rangeSearch(start, end, arr) {
	  if (end - start <= 0) {
	    throw new Error('end must be greater than start. start: ' + start + ', end: ' + end);
	  }
	  var resultHash = {};

	  var wholeWraps = [];
	  _pointSearch.call(this, this.root, start + end >> 1, wholeWraps, true);

	  wholeWraps.forEach(function (result) {
	    resultHash[result.id] = true;
	  });

	  var idx1 = this.pointTree.bsearch([start, null]);
	  var pointTreeArray = this.pointTree;
	  while (idx1 >= 0 && pointTreeArray[idx1][0] == start) {
	    idx1--;
	  }

	  var idx2 = this.pointTree.bsearch([end, null]);
	  if (idx2 >= 0) {
	    var len = pointTreeArray.length - 1;
	    while (idx2 <= len && pointTreeArray[idx2][0] <= end) {
	      idx2++;
	    }

	    pointTreeArray.slice(idx1 + 1, idx2).forEach(function (point) {
	      var id = point[1];
	      resultHash[id] = true;
	    }, this);

	    Object.keys(resultHash).forEach(function (id) {
	      var itvl = this.intervalHash[id];
	      arr.push(itvl.result(start, end));
	    }, this);
	  }
	}

	/**
	 * subclasses
	 *
	 **/

	/**
	 * Node : prototype of each node in a interval tree
	 *
	 **/
	function Node(idx) {
	  this.idx = idx;
	  this.starts = new SortedList({
	    compare: function compare(a, b) {
	      if (a == null) return -1;
	      if (b == null) return 1;
	      var c = a.start - b.start;
	      return c > 0 ? 1 : c == 0 ? 0 : -1;
	    }
	  });

	  this.ends = new SortedList({
	    compare: function compare(a, b) {
	      if (a == null) return -1;
	      if (b == null) return 1;
	      var c = a.end - b.end;
	      return c < 0 ? 1 : c == 0 ? 0 : -1;
	    }
	  });
	}

	/**
	 * insert an Interval object to this node
	 **/
	Node.prototype.insert = function (interval) {
	  this.starts.insert(interval);
	  this.ends.insert(interval);
	};

	/**
	 * Interval : prototype of interval info
	 **/
	function Interval(data, id, s, e) {
	  this.id = id;
	  this.start = data[s];
	  this.end = data[e];
	  this.data = data;

	  if (typeof this.start != 'number' || typeof this.end != 'number') {
	    throw new Error('start, end must be number. start: ' + this.start + ', end: ' + this.end);
	  }

	  if (this.start >= this.end) {
	    throw new Error('start must be smaller than end. start: ' + this.start + ', end: ' + this.end);
	  }
	}

	/**
	 * get result object
	 **/
	Interval.prototype.result = function (start, end) {
	  var ret = {
	    id: this.id,
	    data: this.data
	  };
	  if (typeof start == 'number' && typeof end == 'number') {
	    /**
	     * calc overlapping rate
	     **/
	    var left = Math.max(this.start, start);
	    var right = Math.min(this.end, end);
	    var lapLn = right - left;
	    ret.rate1 = lapLn / (end - start);
	    ret.rate2 = lapLn / (this.end - this.start);
	  }
	  return ret;
	};

	module.exports = IntervalTree;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*
	This file is modified from https://github.com/shinout/SortedList

	(The MIT License)

	Copyright (c) 2012 SHIN Suzuki <shinout310@gmail.com>

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	'Software'), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	var SortedList = function SortedList() {
	  var arr = null,
	      options = {},
	      args = arguments;

	  ["0", "1"].forEach(function (n) {
	    var val = args[n];
	    if (Array.isArray(val)) {
	      arr = val;
	    } else if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
	      options = val;
	    }
	  });

	  if (typeof options.filter == 'function') {
	    this._filter = options.filter;
	  }

	  if (typeof options.compare == 'function') {
	    this._compare = options.compare;
	  } else if (typeof options.compare == 'string' && SortedList.compares[options.compare]) {
	    this._compare = SortedList.compares[options.compare];
	  }

	  this._unique = !!options.unique;

	  if (options.resume && arr) {
	    arr.forEach(function (v, i) {
	      this.push(v);
	    }, this);
	  } else if (arr) this.insert.apply(this, arr);
	};

	/**
	 * SortedList.create(val1, val2)
	 * creates an instance
	 **/
	SortedList.create = function (val1, val2) {
	  return new SortedList(val1, val2);
	};

	SortedList.prototype = new Array();
	SortedList.prototype.constructor = Array.prototype.constructor;

	/**
	 * sorted.insertOne(val)
	 * insert one value
	 * returns false if failed, inserted position if succeed
	 **/
	SortedList.prototype.insertOne = function (val) {
	  var pos = this.bsearch(val);
	  if (this._unique && this.key(val, pos) != null) return false;
	  if (!this._filter(val, pos)) return false;
	  this.splice(pos + 1, 0, val);
	  return pos + 1;
	};

	/**
	 * sorted.insert(val1, val2, ...)
	 * insert multi values
	 * returns the list of the results of insertOne()
	 **/
	SortedList.prototype.insert = function () {
	  return Array.prototype.map.call(arguments, function (val) {
	    return this.insertOne(val);
	  }, this);
	};

	/**
	 * sorted.remove(pos)
	 * remove the value in the given position
	 **/
	SortedList.prototype.remove = function (pos) {
	  this.splice(pos, 1);
	  return this;
	};

	/**
	 * sorted.bsearch(val)
	 * @returns position of the value
	 **/
	SortedList.prototype.bsearch = function (val) {
	  if (!this.length) return -1;
	  var mpos,
	      spos = 0,
	      epos = this.length;
	  while (epos - spos > 1) {
	    mpos = Math.floor((spos + epos) / 2);
	    var mval = this[mpos];
	    var comp = this._compare(val, mval);
	    if (comp == 0) return mpos;
	    if (comp > 0) spos = mpos;else epos = mpos;
	  }
	  return spos == 0 && this._compare(this[0], val) > 0 ? -1 : spos;
	};

	/**
	 * sorted.key(val)
	 * @returns first index if exists, null if not
	 **/
	SortedList.prototype.key = function (val, bsResult) {
	  if (bsResult == null) bsResult = this.bsearch(val);
	  var pos = bsResult;
	  if (pos == -1 || this._compare(this[pos], val) < 0) return pos + 1 < this.length && this._compare(this[pos + 1], val) == 0 ? pos + 1 : null;
	  while (pos >= 1 && this._compare(this[pos - 1], val) == 0) {
	    pos--;
	  }return pos;
	};

	/**
	 * sorted.key(val)
	 * @returns indexes if exists, null if not
	 **/
	SortedList.prototype.keys = function (val, bsResult) {
	  var ret = [];
	  if (bsResult == null) bsResult = this.bsearch(val);
	  var pos = bsResult;
	  while (pos >= 0 && this._compare(this[pos], val) == 0) {
	    ret.push(pos);
	    pos--;
	  }

	  var len = this.length;
	  pos = bsResult + 1;
	  while (pos < len && this._compare(this[pos], val) == 0) {
	    ret.push(pos);
	    pos++;
	  }
	  return ret.length ? ret : null;
	};

	/**
	 * sorted.unique()
	 * @param createNew : create new instance
	 * @returns first index if exists, null if not
	 **/
	SortedList.prototype.unique = function (createNew) {
	  if (createNew) return this.filter(function (v, k) {
	    return k == 0 || this._compare(this[k - 1], v) != 0;
	  }, this);
	  var total = 0;
	  this.map(function (v, k) {
	    if (k == 0 || this._compare(this[k - 1], v) != 0) return null;
	    return k - total++;
	  }, this).forEach(function (k) {
	    if (k != null) this.remove(k);
	  }, this);
	  return this;
	};

	/**
	 * sorted.toArray()
	 * get raw array
	 **/
	SortedList.prototype.toArray = function () {
	  return this.slice();
	};

	/**
	 * default filtration function
	 **/
	SortedList.prototype._filter = function (val, pos) {
	  return true;
	};

	/**
	 * comparison functions
	 **/
	SortedList.compares = {
	  "number": function number(a, b) {
	    var c = a - b;
	    return c > 0 ? 1 : c == 0 ? 0 : -1;
	  },

	  "string": function string(a, b) {
	    return a > b ? 1 : a == b ? 0 : -1;
	  }
	};

	/**
	 * sorted.compare(a, b)
	 * default comparison function
	 **/
	SortedList.prototype._compare = SortedList.compares["string"];

	module.exports = SortedList;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helper = __webpack_require__(4);
	var vpsc = __webpack_require__(9);

	var DEFAULT_OPTIONS = {
	  lineSpacing: 2,
	  nodeSpacing: 3,
	  minPos: 0,
	  maxPos: null
	};

	function nodeToVariable(node) {
	  var v = new vpsc.Variable(node.targetPos);
	  v.node = node;
	  return v;
	}

	function removeOverlap(nodes, options) {
	  if (nodes.length > 0) {
	    options = helper.extend(DEFAULT_OPTIONS, options);

	    // For nodes with stub, set target position to stub's current position
	    nodes.forEach(function (node, index) {
	      node.targetPos = node.parent ? node.parent.currentPos : node.idealPos;
	      node.index = index;
	    });

	    var variables = nodes.concat().sort(function (a, b) {
	      var diff = a.targetPos - b.targetPos;
	      if (diff !== 0) return diff;
	      var diff2 = a.isStub() - b.isStub();
	      if (diff2 !== 0) return diff2;
	      // If same position, use original order
	      return a.index - b.index;
	    }).map(nodeToVariable);

	    var constraints = [];
	    for (var i = 1; i < variables.length; i++) {
	      var v1 = variables[i - 1];
	      var v2 = variables[i];

	      var gap = void 0;
	      if (v1.node.isStub() && v2.node.isStub()) {
	        gap = (v1.node.width + v2.node.width) / 2 + options.lineSpacing;
	      } else {
	        gap = (v1.node.width + v2.node.width) / 2 + options.nodeSpacing;
	      }
	      constraints.push(new vpsc.Constraint(v1, v2, gap));
	    }

	    if (helper.isDefined(options.minPos)) {
	      var leftWall = new vpsc.Variable(options.minPos, 1e10);
	      var v = variables[0];
	      constraints.push(new vpsc.Constraint(leftWall, v, v.node.width / 2));
	      variables.unshift(leftWall);
	    }

	    if (helper.isDefined(options.maxPos)) {
	      var rightWall = new vpsc.Variable(options.maxPos, 1e10);
	      var lastv = helper.last(variables);
	      constraints.push(new vpsc.Constraint(lastv, rightWall, lastv.node.width / 2));
	      variables.push(rightWall);
	    }

	    new vpsc.Solver(variables, constraints).solve();

	    variables.filter(function (v) {
	      return v.node;
	    }).map(function (v) {
	      v.node.currentPos = Math.round(v.position());
	      return v;
	    });
	  }

	  return nodes;
	}

	removeOverlap.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

	module.exports = removeOverlap;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/*
	This file is compiled from https://github.com/tgdwyer/WebCola/blob/master/WebCola/src/vpsc.ts
	and modified slightly.

	The MIT License (MIT)

	Copyright (c) 2013 Tim Dwyer

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	*/

	var vpsc = {};

	var PositionStats = function () {
	    function PositionStats(scale) {
	        this.scale = scale;
	        this.AB = 0;
	        this.AD = 0;
	        this.A2 = 0;
	    }
	    PositionStats.prototype.addVariable = function (v) {
	        var ai = this.scale / v.scale;
	        var bi = v.offset / v.scale;
	        var wi = v.weight;
	        this.AB += wi * ai * bi;
	        this.AD += wi * ai * v.desiredPosition;
	        this.A2 += wi * ai * ai;
	    };
	    PositionStats.prototype.getPosn = function () {
	        return (this.AD - this.AB) / this.A2;
	    };
	    return PositionStats;
	}();
	vpsc.PositionStats = PositionStats;
	var Constraint = function () {
	    function Constraint(left, right, gap, equality) {
	        if (equality === void 0) {
	            equality = false;
	        }
	        this.left = left;
	        this.right = right;
	        this.gap = gap;
	        this.equality = equality;
	        this.active = false;
	        this.unsatisfiable = false;
	        this.left = left;
	        this.right = right;
	        this.gap = gap;
	        this.equality = equality;
	    }
	    Constraint.prototype.slack = function () {
	        return this.unsatisfiable ? Number.MAX_VALUE : this.right.scale * this.right.position() - this.gap - this.left.scale * this.left.position();
	    };
	    return Constraint;
	}();
	vpsc.Constraint = Constraint;
	var Variable = function () {
	    function Variable(desiredPosition, weight, scale) {
	        if (weight === void 0) {
	            weight = 1;
	        }
	        if (scale === void 0) {
	            scale = 1;
	        }
	        this.desiredPosition = desiredPosition;
	        this.weight = weight;
	        this.scale = scale;
	        this.offset = 0;
	    }
	    Variable.prototype.dfdv = function () {
	        return 2.0 * this.weight * (this.position() - this.desiredPosition);
	    };
	    Variable.prototype.position = function () {
	        return (this.block.ps.scale * this.block.posn + this.offset) / this.scale;
	    };
	    // visit neighbours by active constraints within the same block
	    Variable.prototype.visitNeighbours = function (prev, f) {
	        var ff = function ff(c, next) {
	            return c.active && prev !== next && f(c, next);
	        };
	        this.cOut.forEach(function (c) {
	            return ff(c, c.right);
	        });
	        this.cIn.forEach(function (c) {
	            return ff(c, c.left);
	        });
	    };
	    return Variable;
	}();
	vpsc.Variable = Variable;
	var Block = function () {
	    function Block(v) {
	        this.vars = [];
	        v.offset = 0;
	        this.ps = new PositionStats(v.scale);
	        this.addVariable(v);
	    }
	    Block.prototype.addVariable = function (v) {
	        v.block = this;
	        this.vars.push(v);
	        this.ps.addVariable(v);
	        this.posn = this.ps.getPosn();
	    };
	    // move the block where it needs to be to minimize cost
	    Block.prototype.updateWeightedPosition = function () {
	        this.ps.AB = this.ps.AD = this.ps.A2 = 0;
	        for (var i = 0, n = this.vars.length; i < n; ++i) {
	            this.ps.addVariable(this.vars[i]);
	        }this.posn = this.ps.getPosn();
	    };
	    Block.prototype.compute_lm = function (v, u, postAction) {
	        var _this = this;
	        var dfdv = v.dfdv();
	        v.visitNeighbours(u, function (c, next) {
	            var _dfdv = _this.compute_lm(next, v, postAction);
	            if (next === c.right) {
	                dfdv += _dfdv * c.left.scale;
	                c.lm = _dfdv;
	            } else {
	                dfdv += _dfdv * c.right.scale;
	                c.lm = -_dfdv;
	            }
	            postAction(c);
	        });
	        return dfdv / v.scale;
	    };
	    Block.prototype.populateSplitBlock = function (v, prev) {
	        var _this = this;
	        v.visitNeighbours(prev, function (c, next) {
	            next.offset = v.offset + (next === c.right ? c.gap : -c.gap);
	            _this.addVariable(next);
	            _this.populateSplitBlock(next, v);
	        });
	    };
	    // traverse the active constraint tree applying visit to each active constraint
	    Block.prototype.traverse = function (visit, acc, v, prev) {
	        var _this = this;
	        if (v === void 0) {
	            v = this.vars[0];
	        }
	        if (prev === void 0) {
	            prev = null;
	        }
	        v.visitNeighbours(prev, function (c, next) {
	            acc.push(visit(c));
	            _this.traverse(visit, acc, next, v);
	        });
	    };
	    // calculate lagrangian multipliers on constraints and
	    // find the active constraint in this block with the smallest lagrangian.
	    // if the lagrangian is negative, then the constraint is a split candidate.
	    Block.prototype.findMinLM = function () {
	        var m = null;
	        this.compute_lm(this.vars[0], null, function (c) {
	            if (!c.equality && (m === null || c.lm < m.lm)) m = c;
	        });
	        return m;
	    };
	    Block.prototype.findMinLMBetween = function (lv, rv) {
	        this.compute_lm(lv, null, function () {});
	        var m = null;
	        this.findPath(lv, null, rv, function (c, next) {
	            if (!c.equality && c.right === next && (m === null || c.lm < m.lm)) m = c;
	        });
	        return m;
	    };
	    Block.prototype.findPath = function (v, prev, to, visit) {
	        var _this = this;
	        var endFound = false;
	        v.visitNeighbours(prev, function (c, next) {
	            if (!endFound && (next === to || _this.findPath(next, v, to, visit))) {
	                endFound = true;
	                visit(c, next);
	            }
	        });
	        return endFound;
	    };
	    // Search active constraint tree from u to see if there is a directed path to v.
	    // Returns true if path is found.
	    Block.prototype.isActiveDirectedPathBetween = function (u, v) {
	        if (u === v) return true;
	        var i = u.cOut.length;
	        while (i--) {
	            var c = u.cOut[i];
	            if (c.active && this.isActiveDirectedPathBetween(c.right, v)) return true;
	        }
	        return false;
	    };
	    // split the block into two by deactivating the specified constraint
	    Block.split = function (c) {
	        /* DEBUG
	                    console.log("split on " + c);
	                    console.assert(c.active, "attempt to split on inactive constraint");
	        DEBUG */
	        c.active = false;
	        return [Block.createSplitBlock(c.left), Block.createSplitBlock(c.right)];
	    };
	    Block.createSplitBlock = function (startVar) {
	        var b = new Block(startVar);
	        b.populateSplitBlock(startVar, null);
	        return b;
	    };
	    // find a split point somewhere between the specified variables
	    Block.prototype.splitBetween = function (vl, vr) {
	        /* DEBUG
	                    console.assert(vl.block === this);
	                    console.assert(vr.block === this);
	        DEBUG */
	        var c = this.findMinLMBetween(vl, vr);
	        if (c !== null) {
	            var bs = Block.split(c);
	            return { constraint: c, lb: bs[0], rb: bs[1] };
	        }
	        // couldn't find a split point - for example the active path is all equality constraints
	        return null;
	    };
	    Block.prototype.mergeAcross = function (b, c, dist) {
	        c.active = true;
	        for (var i = 0, n = b.vars.length; i < n; ++i) {
	            var v = b.vars[i];
	            v.offset += dist;
	            this.addVariable(v);
	        }
	        this.posn = this.ps.getPosn();
	    };
	    Block.prototype.cost = function () {
	        var sum = 0,
	            i = this.vars.length;
	        while (i--) {
	            var v = this.vars[i],
	                d = v.position() - v.desiredPosition;
	            sum += d * d * v.weight;
	        }
	        return sum;
	    };
	    return Block;
	}();
	vpsc.Block = Block;
	var Blocks = function () {
	    function Blocks(vs) {
	        this.vs = vs;
	        var n = vs.length;
	        this.list = new Array(n);
	        while (n--) {
	            var b = new Block(vs[n]);
	            this.list[n] = b;
	            b.blockInd = n;
	        }
	    }
	    Blocks.prototype.cost = function () {
	        var sum = 0,
	            i = this.list.length;
	        while (i--) {
	            sum += this.list[i].cost();
	        }return sum;
	    };
	    Blocks.prototype.insert = function (b) {
	        /* DEBUG
	                    console.assert(!this.contains(b), "blocks error: tried to reinsert block " + b.blockInd)
	        DEBUG */
	        b.blockInd = this.list.length;
	        this.list.push(b);
	        /* DEBUG
	                    console.log("insert block: " + b.blockInd);
	                    this.contains(b);
	        DEBUG */
	    };
	    Blocks.prototype.remove = function (b) {
	        /* DEBUG
	                    console.log("remove block: " + b.blockInd);
	                    console.assert(this.contains(b));
	        DEBUG */
	        var last = this.list.length - 1;
	        var swapBlock = this.list[last];
	        this.list.length = last;
	        if (b !== swapBlock) {
	            this.list[b.blockInd] = swapBlock;
	            swapBlock.blockInd = b.blockInd;
	        }
	    };
	    // merge the blocks on either side of the specified constraint, by copying the smaller block into the larger
	    // and deleting the smaller.
	    Blocks.prototype.merge = function (c) {
	        var l = c.left.block,
	            r = c.right.block;
	        /* DEBUG
	                    console.assert(l!==r, "attempt to merge within the same block");
	        DEBUG */
	        var dist = c.right.offset - c.left.offset - c.gap;
	        if (l.vars.length < r.vars.length) {
	            r.mergeAcross(l, c, dist);
	            this.remove(l);
	        } else {
	            l.mergeAcross(r, c, -dist);
	            this.remove(r);
	        }
	        /* DEBUG
	                    console.assert(Math.abs(c.slack()) < 1e-6, "Error: Constraint should be at equality after merge!");
	                    console.log("merged on " + c);
	        DEBUG */
	    };
	    Blocks.prototype.forEach = function (f) {
	        this.list.forEach(f);
	    };
	    // useful, for example, after variable desired positions change.
	    Blocks.prototype.updateBlockPositions = function () {
	        this.list.forEach(function (b) {
	            return b.updateWeightedPosition();
	        });
	    };
	    // split each block across its constraint with the minimum lagrangian
	    Blocks.prototype.split = function (inactive) {
	        var _this = this;
	        this.updateBlockPositions();
	        this.list.forEach(function (b) {
	            var v = b.findMinLM();
	            if (v !== null && v.lm < Solver.LAGRANGIAN_TOLERANCE) {
	                b = v.left.block;
	                Block.split(v).forEach(function (nb) {
	                    return _this.insert(nb);
	                });
	                _this.remove(b);
	                inactive.push(v);
	            }
	        });
	    };
	    return Blocks;
	}();
	vpsc.Blocks = Blocks;
	var Solver = function () {
	    function Solver(vs, cs) {
	        this.vs = vs;
	        this.cs = cs;
	        this.vs = vs;
	        vs.forEach(function (v) {
	            v.cIn = [], v.cOut = [];
	            /* DEBUG
	                            v.toString = () => "v" + vs.indexOf(v);
	            DEBUG */
	        });
	        this.cs = cs;
	        cs.forEach(function (c) {
	            c.left.cOut.push(c);
	            c.right.cIn.push(c);
	            /* DEBUG
	                            c.toString = () => c.left + "+" + c.gap + "<=" + c.right + " slack=" + c.slack() + " active=" + c.active;
	            DEBUG */
	        });
	        this.inactive = cs.map(function (c) {
	            c.active = false;return c;
	        });
	        this.bs = null;
	    }
	    Solver.prototype.cost = function () {
	        return this.bs.cost();
	    };
	    // set starting positions without changing desired positions.
	    // Note: it throws away any previous block structure.
	    Solver.prototype.setStartingPositions = function (ps) {
	        this.inactive = this.cs.map(function (c) {
	            c.active = false;return c;
	        });
	        this.bs = new Blocks(this.vs);
	        this.bs.forEach(function (b, i) {
	            return b.posn = ps[i];
	        });
	    };
	    Solver.prototype.setDesiredPositions = function (ps) {
	        this.vs.forEach(function (v, i) {
	            return v.desiredPosition = ps[i];
	        });
	    };
	    /* DEBUG
	            private getId(v: Variable): number {
	                return this.vs.indexOf(v);
	            }
	             // sanity check of the index integrity of the inactive list
	            checkInactive(): void {
	                var inactiveCount = 0;
	                this.cs.forEach(c=> {
	                    var i = this.inactive.indexOf(c);
	                    console.assert(!c.active && i >= 0 || c.active && i < 0, "constraint should be in the inactive list if it is not active: " + c);
	                    if (i >= 0) {
	                        inactiveCount++;
	                    } else {
	                        console.assert(c.active, "inactive constraint not found in inactive list: " + c);
	                    }
	                });
	                console.assert(inactiveCount === this.inactive.length, inactiveCount + " inactive constraints found, " + this.inactive.length + "in inactive list");
	            }
	            // after every call to satisfy the following should check should pass
	            checkSatisfied(): void {
	                this.cs.forEach(c=>console.assert(c.slack() >= vpsc.Solver.ZERO_UPPERBOUND, "Error: Unsatisfied constraint! "+c));
	            }
	    DEBUG */
	    Solver.prototype.mostViolated = function () {
	        var minSlack = Number.MAX_VALUE,
	            v = null,
	            l = this.inactive,
	            n = l.length,
	            deletePoint = n;
	        for (var i = 0; i < n; ++i) {
	            var c = l[i];
	            if (c.unsatisfiable) continue;
	            var slack = c.slack();
	            if (c.equality || slack < minSlack) {
	                minSlack = slack;
	                v = c;
	                deletePoint = i;
	                if (c.equality) break;
	            }
	        }
	        if (deletePoint !== n && (minSlack < Solver.ZERO_UPPERBOUND && !v.active || v.equality)) {
	            l[deletePoint] = l[n - 1];
	            l.length = n - 1;
	        }
	        return v;
	    };
	    // satisfy constraints by building block structure over violated constraints
	    // and moving the blocks to their desired positions
	    Solver.prototype.satisfy = function () {
	        if (this.bs == null) {
	            this.bs = new Blocks(this.vs);
	        }
	        /* DEBUG
	                    console.log("satisfy: " + this.bs);
	        DEBUG */
	        this.bs.split(this.inactive);
	        var v = null;
	        while ((v = this.mostViolated()) && (v.equality || v.slack() < Solver.ZERO_UPPERBOUND && !v.active)) {
	            var lb = v.left.block,
	                rb = v.right.block;
	            /* DEBUG
	                            console.log("most violated is: " + v);
	                            this.bs.contains(lb);
	                            this.bs.contains(rb);
	            DEBUG */
	            if (lb !== rb) {
	                this.bs.merge(v);
	            } else {
	                if (lb.isActiveDirectedPathBetween(v.right, v.left)) {
	                    // cycle found!
	                    v.unsatisfiable = true;
	                    continue;
	                }
	                // constraint is within block, need to split first
	                var split = lb.splitBetween(v.left, v.right);
	                if (split !== null) {
	                    this.bs.insert(split.lb);
	                    this.bs.insert(split.rb);
	                    this.bs.remove(lb);
	                    this.inactive.push(split.constraint);
	                } else {
	                    /* DEBUG
	                                            console.log("unsatisfiable constraint found");
	                    DEBUG */
	                    v.unsatisfiable = true;
	                    continue;
	                }
	                if (v.slack() >= 0) {
	                    /* DEBUG
	                                            console.log("violated constraint indirectly satisfied: " + v);
	                    DEBUG */
	                    // v was satisfied by the above split!
	                    this.inactive.push(v);
	                } else {
	                    /* DEBUG
	                                            console.log("merge after split:");
	                    DEBUG */
	                    this.bs.merge(v);
	                }
	            }
	        }
	        /* DEBUG
	                    this.checkSatisfied();
	        DEBUG */
	    };
	    // repeatedly build and split block structure until we converge to an optimal solution
	    Solver.prototype.solve = function () {
	        this.satisfy();
	        var lastcost = Number.MAX_VALUE,
	            cost = this.bs.cost();
	        while (Math.abs(lastcost - cost) > 0.0001) {
	            this.satisfy();
	            lastcost = cost;
	            cost = this.bs.cost();
	        }
	        return cost;
	    };
	    Solver.LAGRANGIAN_TOLERANCE = -1e-4;
	    Solver.ZERO_UPPERBOUND = -1e-10;
	    return Solver;
	}();
	vpsc.Solver = Solver;

	module.exports = vpsc;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helper = __webpack_require__(4);

	function Renderer(options) {
	  this.options = helper.extend({
	    layerGap: 60,
	    nodeHeight: 10,
	    direction: 'down'
	  }, options);
	}

	function lineTo(point) {
	  return 'L ' + point.join(' ');
	}

	function moveTo(point) {
	  return 'M ' + point.join(' ');
	}

	function curveTo(c1, c2, point2) {
	  return 'C ' + c1.join(' ') + ' ' + c2.join(' ') + ' ' + point2.join(' ');
	}

	function vCurveBetween(point1, point2) {
	  var midY = (point1[1] + point2[1]) / 2;
	  return curveTo([point1[0], midY], [point2[0], midY], point2);
	}

	function hCurveBetween(point1, point2) {
	  var midX = (point1[0] + point2[0]) / 2;
	  return curveTo([midX, point1[1]], [midX, point2[1]], point2);
	}

	Renderer.lineTo = lineTo;
	Renderer.moveTo = moveTo;
	Renderer.curveTo = curveTo;
	Renderer.vCurveBetween = vCurveBetween;
	Renderer.hCurveBetween = hCurveBetween;

	Renderer.prototype.getWaypoints = function (node) {
	  var options = this.options;
	  var direction = options.direction;

	  var hops = node.getPathFromRoot();
	  var gap = options.nodeHeight + options.layerGap;

	  if (direction === 'left') {
	    return [[[0, hops[0].idealPos]]].concat(hops.map(function (hop, level) {
	      var xPos = gap * (level + 1) * -1;
	      return [[xPos + options.nodeHeight, hop.currentPos], [xPos, hop.currentPos]];
	    }));
	  } else if (direction === 'right') {
	    return [[[0, hops[0].idealPos]]].concat(hops.map(function (hop, level) {
	      var xPos = gap * (level + 1);
	      return [[xPos - options.nodeHeight, hop.currentPos], [xPos, hop.currentPos]];
	    }));
	  } else if (direction === 'up') {
	    return [[[hops[0].idealPos, 0]]].concat(hops.map(function (hop, level) {
	      var yPos = gap * (level + 1) * -1;
	      return [[hop.currentPos, yPos + options.nodeHeight], [hop.currentPos, yPos]];
	    }));
	  } else {
	    return [[[hops[0].idealPos, 0]]].concat(hops.map(function (hop, level) {
	      var yPos = gap * (level + 1);
	      return [[hop.currentPos, yPos - options.nodeHeight], [hop.currentPos, yPos]];
	    }));
	  }
	};

	Renderer.prototype.layout = function (nodes) {
	  var options = this.options;

	  var gap = options.layerGap + options.nodeHeight;

	  switch (options.direction) {
	    case 'left':
	      nodes.forEach(function (node) {
	        var pos = node.getLayerIndex() * gap + options.layerGap;
	        node.x = -pos - options.nodeHeight;
	        node.y = node.currentPos;
	        node.dx = options.nodeHeight;
	        node.dy = node.width;
	      });
	      break;
	    case 'right':
	      nodes.forEach(function (node) {
	        var pos = node.getLayerIndex() * gap + options.layerGap;
	        node.x = pos;
	        node.y = node.currentPos;
	        node.dx = options.nodeHeight;
	        node.dy = node.width;
	      });
	      break;
	    case 'up':
	      nodes.forEach(function (node) {
	        var pos = node.getLayerIndex() * gap + options.layerGap;
	        node.x = node.currentPos;
	        node.y = -pos - options.nodeHeight;
	        node.dx = node.width;
	        node.dy = options.nodeHeight;
	      });
	      break;
	    default:
	    case 'down':
	      nodes.forEach(function (node) {
	        var pos = node.getLayerIndex() * gap + options.layerGap;
	        node.x = node.currentPos;
	        node.y = pos;
	        node.dx = node.width;
	        node.dy = options.nodeHeight;
	      });
	      break;
	  }

	  return nodes;
	};

	Renderer.prototype.generatePath = function (node) {
	  var options = this.options;
	  var direction = options.direction;

	  var waypoints = this.getWaypoints(node, direction);

	  var steps = [moveTo(waypoints[0][0])];

	  if (direction === 'left' || direction === 'right') {
	    waypoints.reduce(function (prev, current, level) {
	      steps.push(hCurveBetween(prev[prev.length - 1], current[0]));
	      if (level < waypoints.length - 1) {
	        steps.push(lineTo(current[1]));
	      }
	      return current;
	    });
	  } else {
	    waypoints.reduce(function (prev, current, level) {
	      steps.push(vCurveBetween(prev[prev.length - 1], current[0]));
	      if (level < waypoints.length - 1) {
	        steps.push(lineTo(current[1]));
	      }
	      return current;
	    });
	  }

	  return steps.join(' ');
	};

	// return module
	module.exports = Renderer;

/***/ }
/******/ ])
});
;