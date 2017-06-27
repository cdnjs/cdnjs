(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OptimalSelect"] = factory();
	else
		root["OptimalSelect"] = factory();
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.common = exports.optimize = exports.select = undefined;

	var _select2 = __webpack_require__(1);

	var _select3 = _interopRequireDefault(_select2);

	var _optimize2 = __webpack_require__(4);

	var _optimize3 = _interopRequireDefault(_optimize2);

	var _common2 = __webpack_require__(5);

	var _common = _interopRequireWildcard(_common2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.select = _select3.default;
	exports.optimize = _optimize3.default;
	exports.common = _common;
	exports.default = _select3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * # Select
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * Construct a unique CSS queryselector to access the selected DOM element(s).
	                                                                                                                                                                                                                                                   * Applies different matching and optimization strategies for efficiency.
	                                                                                                                                                                                                                                                   */

	exports.default = getQuerySelector;
	exports.getSingleSelector = getSingleSelector;
	exports.getMultiSelector = getMultiSelector;

	var _adapt = __webpack_require__(2);

	var _adapt2 = _interopRequireDefault(_adapt);

	var _match = __webpack_require__(3);

	var _match2 = _interopRequireDefault(_match);

	var _optimize = __webpack_require__(4);

	var _optimize2 = _interopRequireDefault(_optimize);

	var _common = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Choose action depending on the input (single/multi)
	 *
	 * @param  {HTMLElement|Array.<HTMLElement>} input   - [description]
	 * @param  {Object}                          options - [description]
	 * @return {string}                                  - [description]
	 */
	function getQuerySelector(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (Array.isArray(input)) {
	    return getMultiSelector(input, options);
	  }
	  return getSingleSelector(input, options);
	}

	/**
	 * Get a selector for the provided element
	 *
	 * @param  {HTMLElement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	function getSingleSelector(element) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  if (element.nodeType === 3) {
	    element = element.parentNode;
	  }
	  if (element.nodeType !== 1) {
	    throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '")');
	  }

	  var globalModified = (0, _adapt2.default)(element, options);

	  var selector = (0, _match2.default)(element, options);
	  var optimized = (0, _optimize2.default)(selector, element, options);

	  // debug
	  // console.log(`
	  //   selector:  ${selector}
	  //   optimized: ${optimized}
	  // `)

	  if (globalModified) {
	    delete global.document;
	  }

	  return optimized;
	}

	/**
	 * Get a selector to match multiple descendants from an ancestor
	 *
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @param  {Object}              options  - [description]
	 * @return {string}                       - [description]
	 */
	function getMultiSelector(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  if (elements.some(function (element) {
	    return element.nodeType !== 1;
	  })) {
	    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');
	  }

	  var globalModified = (0, _adapt2.default)(elements[0], options);

	  var ancestor = (0, _common.getCommonAncestor)(elements, options);
	  var ancestorSelector = getSingleSelector(ancestor, options);

	  // TODO: consider usage of multiple selectors + parent-child relation
	  var commonSelectors = getCommonSelectors(elements);
	  var descendantSelector = commonSelectors[0];

	  var selector = ancestorSelector + ' ' + descendantSelector;
	  var selectorMatches = [].concat(_toConsumableArray(document.querySelectorAll(selector)));

	  if (!elements.every(function (element) {
	    return selectorMatches.some(function (entry) {
	      return entry === element;
	    });
	  })) {
	    // TODO: cluster matches to split into similar groups for sub selections
	    return console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ', elements);
	  }

	  if (globalModified) {
	    delete global.document;
	  }

	  return selector;
	}

	/**
	 * Get selectors to describe a set of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {string}                        - [description]
	 */
	function getCommonSelectors(elements) {
	  var _getCommonProperties = (0, _common.getCommonProperties)(elements);

	  var classes = _getCommonProperties.classes;
	  var attributes = _getCommonProperties.attributes;
	  var tag = _getCommonProperties.tag;


	  var selectorPath = [];

	  if (tag) {
	    selectorPath.push(tag);
	  }

	  if (classes) {
	    var classSelector = classes.map(function (name) {
	      return '.' + name;
	    }).join('');
	    selectorPath.push(classSelector);
	  }

	  if (attributes) {
	    var attributeSelector = Object.keys(attributes).reduce(function (parts, name) {
	      parts.push('[' + name + '="' + attributes[name] + '"]');
	      return parts;
	    }, []).join('');
	    selectorPath.push(attributeSelector);
	  }

	  if (selectorPath.length) {
	    // TODO: check for parent-child relation
	  }

	  return [selectorPath.join('')];
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = adapt;

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	/**
	 * # Universal
	 *
	 * Check and extend the environment for universal usage
	 */

	/**
	 * Modify the context based on the environment
	 *
	 * @param  {HTMLELement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {boolean}             - [description]
	 */
	function adapt(element, options) {

	  // detect environment setup
	  if (global.document) {
	    return false;
	  }

	  var context = options.context;


	  global.document = context || function () {
	    var root = element;
	    while (root.parent) {
	      root = root.parent;
	    }
	    return root;
	  }();

	  // https://github.com/fb55/domhandler/blob/master/index.js#L75
	  var ElementPrototype = Object.getPrototypeOf(global.document);

	  // alternative descriptor to access elements with filtering invalid elements (e.g. textnodes)
	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'childTags')) {
	    Object.defineProperty(ElementPrototype, 'childTags', {
	      enumerable: true,
	      get: function get() {
	        return this.children.filter(function (node) {
	          // https://github.com/fb55/domelementtype/blob/master/index.js#L12
	          return node.type === 'tag' || node.type === 'script' || node.type === 'style';
	        });
	      }
	    });
	  }

	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'attributes')) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
	    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
	    Object.defineProperty(ElementPrototype, 'attributes', {
	      enumerable: true,
	      get: function get() {
	        var attribs = this.attribs;

	        var attributesNames = Object.keys(attribs);
	        var NamedNodeMap = attributesNames.reduce(function (attributes, attributeName, index) {
	          attributes[index] = {
	            name: attributeName,
	            value: attribs[attributeName]
	          };
	          return attributes;
	        }, {});
	        Object.defineProperty(NamedNodeMap, 'length', {
	          enumerable: false,
	          configurable: false,
	          value: attributesNames.length
	        });
	        return NamedNodeMap;
	      }
	    });
	  }

	  if (!ElementPrototype.getAttribute) {
	    // https://docs.webplatform.org/wiki/dom/Element/getAttribute
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
	    ElementPrototype.getAttribute = function (name) {
	      return this.attribs[name] || null;
	    };
	  }

	  if (!ElementPrototype.getElementsByTagName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByTagName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
	    ElementPrototype.getElementsByTagName = function (tagName) {
	      var HTMLCollection = [];
	      traverseDescendants(this.childTags, function (descendant) {
	        if (descendant.name === tagName || tagName === '*') {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }

	  if (!ElementPrototype.getElementsByClassName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByClassName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
	    ElementPrototype.getElementsByClassName = function (className) {
	      var names = className.trim().replace(/\s+/g, ' ').split(' ');
	      var HTMLCollection = [];
	      traverseDescendants([this], function (descendant) {
	        var descendantClassName = descendant.attribs.class;
	        if (descendantClassName && names.every(function (name) {
	          return descendantClassName.indexOf(name) > -1;
	        })) {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }

	  if (!ElementPrototype.querySelectorAll) {
	    // https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
	    ElementPrototype.querySelectorAll = function (selectors) {
	      var _this = this;

	      selectors = selectors.replace(/(>)(\S)/g, '$1 $2').trim(); // add space for '>' selector

	      // using right to left execution => https://github.com/fb55/css-select#how-does-it-work

	      var _getInstructions = getInstructions(selectors);

	      var _getInstructions2 = _toArray(_getInstructions);

	      var discover = _getInstructions2[0];

	      var ascendings = _getInstructions2.slice(1);

	      var total = ascendings.length;
	      return discover(this).filter(function (node) {
	        var step = 0;
	        while (step < total) {
	          node = ascendings[step](node, _this);
	          if (!node) {
	            // hierarchy doesn't match
	            return false;
	          }
	          step += 1;
	        }
	        return true;
	      });
	    };
	  }

	  if (!ElementPrototype.contains) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
	    ElementPrototype.contains = function (element) {
	      var inclusive = false;
	      traverseDescendants([this], function (descendant, done) {
	        if (descendant === element) {
	          inclusive = true;
	          done();
	        }
	      });
	      return inclusive;
	    };
	  }

	  return true;
	}

	/**
	 * Retrieve transformation steps
	 *
	 * @param  {Array.<string>}   selectors - [description]
	 * @return {Array.<Function>}           - [description]
	 */
	function getInstructions(selectors) {
	  return selectors.split(' ').reverse().map(function (selector, step) {
	    var discover = step === 0;

	    var _selector$split = selector.split(':');

	    var _selector$split2 = _slicedToArray(_selector$split, 2);

	    var type = _selector$split2[0];
	    var pseudo = _selector$split2[1];


	    var validate = null;
	    var instruction = null;

	    (function () {
	      switch (true) {

	        // child: '>'
	        case />/.test(type):
	          instruction = function checkParent(node) {
	            return function (validate) {
	              return validate(node.parent) && node.parent;
	            };
	          };
	          break;

	        // class: '.'
	        case /^\./.test(type):
	          var names = type.substr(1).split('.');
	          validate = function validate(node) {
	            var nodeClassName = node.attribs.class;
	            return nodeClassName && names.every(function (name) {
	              return nodeClassName.indexOf(name) > -1;
	            });
	          };
	          instruction = function checkClass(node, root) {
	            if (discover) {
	              return node.getElementsByClassName(names.join(' '));
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // attribute: '[key="value"]'
	        case /^\[/.test(type):
	          var _type$replace$split = type.replace(/\[|\]|"/g, '').split('=');

	          var _type$replace$split2 = _slicedToArray(_type$replace$split, 2);

	          var attributeKey = _type$replace$split2[0];
	          var attributeValue = _type$replace$split2[1];

	          validate = function validate(node) {
	            var hasAttribute = Object.keys(node.attribs).indexOf(attributeKey) > -1;
	            if (hasAttribute) {
	              // regard optional attributeValue
	              if (!attributeValue || node.attribs[attributeKey] === attributeValue) {
	                return true;
	              }
	            }
	            return false;
	          };
	          instruction = function checkAttribute(node, root) {
	            if (discover) {
	              var _ret2 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // id: '#'
	        case /^#/.test(type):
	          var id = type.substr(1);
	          validate = function validate(node) {
	            return node.attribs.id === id;
	          };
	          instruction = function checkId(node, root) {
	            if (discover) {
	              var _ret3 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant, done) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                    done();
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // universal: '*'
	        case /\*/.test(type):
	          validate = function validate(node) {
	            return true;
	          };
	          instruction = function checkUniversal(node, root) {
	            if (discover) {
	              var _ret4 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  return NodeList.push(descendant);
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;

	        // tag: '...'
	        default:
	          validate = function validate(node) {
	            return node.name === type;
	          };
	          instruction = function checkTag(node, root) {
	            if (discover) {
	              var _ret5 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();

	              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	      }
	    })();

	    if (!pseudo) {
	      return instruction;
	    }

	    var rule = pseudo.match(/-(child|type)\((\d+)\)$/);
	    var kind = rule[1];
	    var index = parseInt(rule[2], 10) - 1;

	    var validatePseudo = function validatePseudo(node) {
	      if (node) {
	        var compareSet = node.parent.childTags;
	        if (kind === 'type') {
	          compareSet = compareSet.filter(validate);
	        }
	        var nodeIndex = compareSet.findIndex(function (child) {
	          return child === node;
	        });
	        if (nodeIndex === index) {
	          return true;
	        }
	      }
	      return false;
	    };

	    return function enhanceInstruction(node) {
	      var match = instruction(node);
	      if (discover) {
	        return match.reduce(function (NodeList, matchedNode) {
	          if (validatePseudo(matchedNode)) {
	            NodeList.push(matchedNode);
	          }
	          return NodeList;
	        }, []);
	      }
	      return validatePseudo(match) && match;
	    };
	  });
	}

	/**
	 * Walking recursive to invoke callbacks
	 *
	 * @param {Array.<HTMLElement>} nodes   - [description]
	 * @param {Function}            handler - [description]
	 */
	function traverseDescendants(nodes, handler) {
	  nodes.forEach(function (node) {
	    var progress = true;
	    handler(node, function () {
	      return progress = false;
	    });
	    if (node.childTags && progress) {
	      traverseDescendants(node.childTags, handler);
	    }
	  });
	}

	/**
	 * Bubble up from bottom to top
	 *
	 * @param  {HTMLELement} node     - [description]
	 * @param  {HTMLELement} root     - [description]
	 * @param  {Function}    validate - [description]
	 * @return {HTMLELement}          - [description]
	 */
	function getAncestor(node, root, validate) {
	  while (node.parent) {
	    node = node.parent;
	    if (validate(node)) {
	      return node;
	    }
	    if (node === root) {
	      break;
	    }
	  }
	  return null;
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = match;
	/**
	 * # Match
	 *
	 * Retrieves selector
	 */

	var defaultIgnore = {
	  attribute: function attribute(attributeName) {
	    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;
	  }
	};

	/**
	 * Get the path of the element
	 *
	 * @param  {HTMLElement} node    - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	function match(node, options) {
	  var _options$root = options.root;
	  var root = _options$root === undefined ? document : _options$root;
	  var _options$skip = options.skip;
	  var skip = _options$skip === undefined ? null : _options$skip;
	  var _options$ignore = options.ignore;
	  var ignore = _options$ignore === undefined ? {} : _options$ignore;


	  var path = [];
	  var element = node;
	  var length = path.length;

	  var skipCompare = skip && (Array.isArray(skip) ? skip : [skip]).map(function (entry) {
	    if (typeof entry !== 'function') {
	      return function (element) {
	        return element === entry;
	      };
	    }
	    return entry;
	  });

	  var skipChecks = function skipChecks(element) {
	    return skip && skipCompare.some(function (compare) {
	      return compare(element);
	    });
	  };

	  var ignoreClass = false;

	  Object.keys(ignore).forEach(function (type) {
	    if (type === 'class') {
	      ignoreClass = true;
	    }
	    var predicate = ignore[type];
	    if (typeof predicate === 'function') return;
	    if (typeof predicate === 'number') {
	      predicate = predicate.toString();
	    }
	    if (typeof predicate === 'string') {
	      predicate = new RegExp(predicate);
	    }
	    // check class-/attributename for regex
	    ignore[type] = predicate.test.bind(predicate);
	  });

	  if (ignoreClass) {
	    (function () {
	      var ignoreAttribute = ignore.attribute;
	      ignore.attribute = function (name, value, defaultPredicate) {
	        return ignore.class(value) || ignoreAttribute && ignoreAttribute(name, value, defaultPredicate);
	      };
	    })();
	  }

	  while (element !== root) {

	    if (skipChecks(element) !== true) {
	      // global
	      if (checkId(element, path, ignore)) break;
	      if (checkClassGlobal(element, path, ignore, root)) break;
	      if (checkAttributeGlobal(element, path, ignore, root)) break;
	      if (checkTagGlobal(element, path, ignore, root)) break;

	      // local
	      checkClassLocal(element, path, ignore);

	      // define only one selector each iteration
	      if (path.length === length) {
	        checkAttributeLocal(element, path, ignore);
	      }
	      if (path.length === length) {
	        checkTagLocal(element, path, ignore);
	      }

	      if (path.length === length) {
	        checkClassChild(element, path, ignore);
	      }
	      if (path.length === length) {
	        checkAttributeChild(element, path, ignore);
	      }
	      if (path.length === length) {
	        checkTagChild(element, path, ignore);
	      }
	    }

	    element = element.parentNode;
	    length = path.length;
	  }

	  if (element === root) {
	    path.unshift('*');
	  }

	  return path.join(' ');
	}

	/**
	 * Preset 'checkClass' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassGlobal(element, path, ignore, root) {
	  return checkClass(element, path, ignore, root);
	}

	/**
	 * Preset 'checkClass' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassLocal(element, path, ignore) {
	  return checkClass(element, path, ignore, element.parentNode);
	}

	/**
	 * Preset 'checkChild' with class data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassChild(element, path, ignore) {
	  var className = element.getAttribute('class');
	  if (checkIgnore(ignore.class, className)) {
	    return false;
	  }
	  return checkChild(element, path, '.' + className.trim().replace(/\s+/g, '.'));
	}

	/**
	 * Preset 'checkAttribute' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeGlobal(element, path, ignore, root) {
	  return checkAttribute(element, path, ignore, root);
	}

	/**
	 * Preset 'checkAttribute' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeLocal(element, path, ignore) {
	  return checkAttribute(element, path, ignore, element.parentNode);
	}

	/**
	 * Preset 'checkChild' with attribute data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeChild(element, path, ignore) {
	  var attributes = element.attributes;
	  return Object.keys(attributes).some(function (key) {
	    var attribute = attributes[key];
	    var attributeName = attribute.name;
	    var attributeValue = attribute.value;
	    if (checkIgnore(ignore.attribute, attributeName, attributeValue, defaultIgnore.attribute)) {
	      return false;
	    }
	    var pattern = '[' + attributeName + '="' + attributeValue + '"]';
	    return checkChild(element, path, pattern);
	  });
	}

	/**
	 * Preset 'checkTag' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagGlobal(element, path, ignore, root) {
	  return checkTag(element, path, ignore, root);
	}

	/**
	 * Preset 'checkTag' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagLocal(element, path, ignore) {
	  return checkTag(element, path, ignore, element.parentNode);
	}

	/**
	 * Preset 'checkChild' with tag data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagChild(element, path, ignore) {
	  var tagName = element.tagName.toLowerCase();
	  if (checkIgnore(ignore.tag, tagName)) {
	    return false;
	  }
	  return checkChild(element, path, tagName);
	}

	/**
	 * Lookup unique identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkId(element, path, ignore) {
	  var id = element.getAttribute('id');
	  if (checkIgnore(ignore.id, id)) {
	    return false;
	  }
	  path.unshift('#' + id);
	  return true;
	}

	/**
	 * Lookup class identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClass(element, path, ignore, parent) {
	  var className = element.getAttribute('class');
	  if (checkIgnore(ignore.class, className)) {
	    return false;
	  }
	  var matches = parent.getElementsByClassName(className);
	  if (matches.length === 1) {
	    path.unshift('.' + className.trim().replace(/\s+/g, '.'));
	    return true;
	  }
	  return false;
	}

	/**
	 * Lookup attribute identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttribute(element, path, ignore, parent) {
	  var attributes = element.attributes;
	  return Object.keys(attributes).some(function (key) {
	    var attribute = attributes[key];
	    var attributeName = attribute.name;
	    var attributeValue = attribute.value;
	    if (checkIgnore(ignore.attribute, attributeName, attributeValue, defaultIgnore.attribute)) {
	      return false;
	    }
	    var pattern = '[' + attributeName + '="' + attributeValue + '"]';
	    var matches = parent.querySelectorAll(pattern);
	    if (matches.length === 1) {
	      path.unshift(pattern);
	      return true;
	    }
	  });
	}

	/**
	 * Lookup tag identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTag(element, path, ignore, parent) {
	  var tagName = element.tagName.toLowerCase();
	  if (checkIgnore(ignore.tag, tagName)) {
	    return false;
	  }
	  var matches = parent.getElementsByTagName(tagName);
	  if (matches.length === 1) {
	    path.unshift(tagName);
	    return true;
	  }
	  return false;
	}

	/**
	 * Lookup child identfier
	 *
	 * Note: childTags is a custom property to use a view filter for tags on for virutal elements
	 *
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Array.<string>} path     - [description]
	 * @param  {String}         selector - [description]
	 * @return {boolean}                 - [description]
	 */
	function checkChild(element, path, selector) {
	  var parent = element.parentNode;
	  var children = parent.childTags || parent.children;
	  for (var i = 0, l = children.length; i < l; i++) {
	    if (children[i] === element) {
	      path.unshift('> ' + selector + ':nth-child(' + (i + 1) + ')');
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Validate with custom and default functions
	 *
	 * @param  {Function} predicate        - [description]
	 * @param  {string}   name             - [description]
	 * @param  {string}   value            - [description]
	 * @param  {Function} defaultPredicate - [description]
	 * @return {boolean}                   - [description]
	 */
	function checkIgnore(predicate, name, value, defaultPredicate) {
	  if (!name) {
	    return true;
	  }
	  var check = predicate || defaultPredicate;
	  if (!check) {
	    return false;
	  }
	  return check(name, value || name, defaultPredicate);
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = optimize;

	var _adapt = __webpack_require__(2);

	var _adapt2 = _interopRequireDefault(_adapt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Apply different optimization techniques
	 *
	 * @param  {string}      selector - [description]
	 * @param  {HTMLElement} element  - [description]
	 * @return {string}               - [description]
	 */
	function optimize(selector, element) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	  if (!element || element.nodeType !== 1) {
	    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the node! (missing "element")');
	  }

	  var globalModified = (0, _adapt2.default)(element, options);

	  // chunk parts outside of quotes (http://stackoverflow.com/a/25663729)
	  var path = selector.replace(/> /g, '>').split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);

	  if (path.length < 3) {
	    return optimizePart('', selector, '', element);
	  }

	  var shortened = [path.pop()];
	  while (path.length > 1) {
	    var current = path.pop();
	    var prePart = path.join(' ');
	    var postPart = shortened.join(' ');

	    var pattern = prePart + ' ' + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length !== 1) {
	      shortened.unshift(optimizePart(prePart, current, postPart, element));
	    }
	  }
	  shortened.unshift(path[0]);
	  path = shortened;

	  // optimize start + end
	  path[0] = optimizePart('', path[0], path.slice(1).join(' '), element);
	  path[path.length - 1] = optimizePart(path.slice(0, -1).join(' '), path[path.length - 1], '', element);

	  if (globalModified) {
	    delete global.document;
	  }

	  return path.join(' ').replace(/>/g, '> ').trim();
	}

	/**
	 * Improve a chunk of the selector
	 *
	 * @param  {string}      prePart  - [description]
	 * @param  {string}      current  - [description]
	 * @param  {string}      postPart - [description]
	 * @param  {HTMLElement} element  - [description]
	 * @return {string}               - [description]
	 */
	/**
	 * # Optimize
	 *
	 * 1.) Improve efficiency through shorter selectors by removing redundancy
	 * 2.) Improve robustness through selector transformation
	 */

	function optimizePart(prePart, current, postPart, element) {
	  if (prePart.length) prePart = prePart + ' ';
	  if (postPart.length) postPart = ' ' + postPart;

	  // robustness: attribute without value (generalization)
	  if (/\[*\]/.test(current)) {
	    var key = current.replace(/=.*$/, ']');
	    var pattern = '' + prePart + key + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length === 1 && matches[0] === element) {
	      current = key;
	    } else {
	      // robustness: replace specific key-value with tag (heuristic)
	      var references = document.querySelectorAll('' + prePart + key);
	      for (var i = 0, l = references.length; i < l; i++) {
	        if (references[i].contains(element)) {
	          var description = references[i].tagName.toLowerCase();
	          var pattern = '' + prePart + description + postPart;
	          var matches = document.querySelectorAll(pattern);
	          if (matches.length === 1 && matches[0] === element) {
	            current = description;
	          }
	          break;
	        }
	      }
	    }
	  }

	  // robustness: descendant instead child (heuristic)
	  if (/>/.test(current)) {
	    var descendant = current.replace(/>/, '');
	    var pattern = '' + prePart + descendant + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length === 1 && matches[0] === element) {
	      current = descendant;
	    }
	  }

	  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)
	  if (/:nth-child/.test(current)) {
	    // TODO: consider complete coverage of 'nth-of-type' replacement
	    var type = current.replace(/nth-child/g, 'nth-of-type');
	    var pattern = '' + prePart + type + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length === 1 && matches[0] === element) {
	      current = type;
	    }
	  }

	  // efficiency: combinations of classname (partial permutations)
	  if (/\.\S+\.\S+/.test(current)) {
	    var names = current.trim().split('.').slice(1).map(function (name) {
	      return '.' + name;
	    }).sort(function (curr, next) {
	      return curr.length - next.length;
	    });
	    while (names.length) {
	      var partial = current.replace(names.shift(), '').trim();
	      var pattern = '' + prePart + partial + postPart;
	      if (!pattern || partial === '>') {
	        break;
	      }
	      var matches = document.querySelectorAll(pattern);
	      if (matches.length === 1 && matches[0] === element) {
	        current = partial;
	      }
	    }
	    // robustness: degrade complex classname (heuristic)
	    if (current && current.match(/\./g).length > 2) {
	      var _references = document.querySelectorAll('' + prePart + current);
	      for (var i = 0, l = _references.length; i < l; i++) {
	        if (_references[i].contains(element)) {
	          // TODO:
	          // - check using attributes + regard excludes
	          var _description = _references[i].tagName.toLowerCase();
	          var pattern = '' + prePart + _description + postPart;
	          var matches = document.querySelectorAll(pattern);
	          if (matches.length === 1 && matches[0] === element) {
	            current = _description;
	          }
	          break;
	        }
	      }
	    }
	  }

	  return current;
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCommonAncestor = getCommonAncestor;
	exports.getCommonProperties = getCommonProperties;
	/**
	 * # Common
	 *
	 * Group similars
	 */

	/**
	 * Find the last common ancestor of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {HTMLElement}                   - [description]
	 */
	function getCommonAncestor(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var _options$root = options.root;
	  var root = _options$root === undefined ? document : _options$root;
	  var _options$skip = options.skip;
	  var skip = _options$skip === undefined ? null : _options$skip;
	  var _options$ignore = options.ignore;
	  var ignore = _options$ignore === undefined ? {} : _options$ignore;


	  var ancestors = [];

	  elements.forEach(function (element, index) {
	    var parents = [];
	    while (element !== root) {
	      element = element.parentNode;
	      parents.unshift(element);
	    }
	    ancestors[index] = parents;
	  });

	  ancestors.sort(function (curr, next) {
	    return curr.length - next.length;
	  });

	  var shallowAncestor = ancestors.shift();

	  var ancestor = null;

	  var _loop = function _loop() {
	    var parent = shallowAncestor[i];
	    var missing = ancestors.some(function (otherParents) {
	      return !otherParents.some(function (otherParent) {
	        return otherParent === parent;
	      });
	    });

	    if (missing) {
	      // TODO: find similar sub-parents, not the top root, e.g. sharing a class selector
	      return 'break';
	    }

	    ancestor = parent;
	  };

	  for (var i = 0, l = shallowAncestor.length; i < l; i++) {
	    var _ret = _loop();

	    if (_ret === 'break') break;
	  }

	  return ancestor;
	}

	/**
	 * Get a set of common properties of elements
	 *
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {Object}                       - [description]
	 */
	function getCommonProperties(elements) {

	  var commonProperties = {
	    classes: [],
	    attributes: {},
	    tag: null
	  };

	  elements.forEach(function (element) {
	    var commonClasses = commonProperties.classes;
	    var commonAttributes = commonProperties.attributes;
	    var commonTag = commonProperties.tag;

	    // ~ classes

	    if (commonClasses !== undefined) {
	      (function () {
	        var classes = element.getAttribute('class').trim().split(' ');
	        // TODO: restructure, cleanup, 2x set, 2x delete || always replacing with new collection instead modify
	        if (classes.length) {
	          if (!commonClasses.length) {
	            commonProperties.classes = classes;
	          } else {
	            commonClasses = commonClasses.filter(function (entry) {
	              return classes.some(function (name) {
	                return name === entry;
	              });
	            });
	            if (commonClasses.length) {
	              commonProperties.classes = commonClasses;
	            } else {
	              delete commonProperties.classes;
	            }
	          }
	        } else {
	          delete commonProperties.classes;
	        }
	      })();
	    }

	    // ~ attributes
	    if (commonAttributes !== undefined) {
	      (function () {
	        var elementAttributes = element.attributes;
	        var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
	          var attribute = elementAttributes[key];
	          var attributeName = attribute.name;
	          if (attributeName !== 'class') {
	            attributes[attributeName] = attribute.value;
	          }
	          return attributes;
	        }, {});

	        var attributesNames = Object.keys(attributes);
	        var commonAttributesNames = Object.keys(commonAttributes);

	        if (attributesNames.length) {
	          if (!commonAttributesNames.length) {
	            commonProperties.attributes = attributes;
	          } else {
	            commonAttributes = commonAttributesNames.reduce(function (nextCommonAttributes, name) {
	              var value = commonAttributes[name];
	              if (valeu === attributes[name]) {
	                nextCommonAttributes[name] = value;
	              }
	              return nextCommonAttributes;
	            }, {});
	            if (Object.keys(commonAttributes).length) {
	              commonProperties.attributes = commonAttributes;
	            } else {
	              delete commonProperties.attributes;
	            }
	          }
	        } else {
	          delete commonProperties.attributes;
	        }
	      })();
	    }

	    // ~ tag
	    if (commonTag !== undefined) {
	      var tag = element.tagName.toLowerCase();
	      if (!commonTag) {
	        commonProperties.tag = tag;
	      } else if (tag !== commonTag) {
	        delete commonProperties.tag;
	      }
	    }
	  });

	  return commonProperties;
	}

/***/ }
/******/ ])
});
;