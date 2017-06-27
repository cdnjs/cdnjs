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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertNodeList = convertNodeList;
exports.escapeValue = escapeValue;
/**
 * # Utilities
 *
 * Convenience helpers.
 */

/**
 * Create an array with the DOM nodes of the list
 *
 * @param  {NodeList}             nodes - [description]
 * @return {Array.<HTMLElement>}        - [description]
 */
function convertNodeList(nodes) {
  var length = nodes.length;

  var arr = new Array(length);
  for (var i = 0; i < length; i++) {
    arr[i] = nodes[i];
  }
  return arr;
}

/**
 * Escape special characters and line breaks as a simplified version of 'CSS.escape()'
 *
 * Description of valid characters: https://mathiasbynens.be/notes/css-escapes
 *
 * @param  {String?} value - [description]
 * @return {String}        - [description]
 */
function escapeValue(value) {
  return value && value.replace(/['"`\\/:\?&!#$%^()[\]{|}*+;,.<=>@~]/g, '\\$&').replace(/\n/g, '\A');
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommonAncestor = getCommonAncestor;
exports.getCommonProperties = getCommonProperties;
/**
 * # Common
 *
 * Process collections for similarities.
 */

/**
 * Find the last common ancestor of elements
 *
 * @param  {Array.<HTMLElements>} elements - [description]
 * @return {HTMLElement}                   - [description]
 */
function getCommonAncestor(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$root = options.root,
      root = _options$root === undefined ? document : _options$root;


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
    var commonClasses = commonProperties.classes,
        commonAttributes = commonProperties.attributes,
        commonTag = commonProperties.tag;

    // ~ classes

    if (commonClasses !== undefined) {
      var classes = element.getAttribute('class');
      if (classes) {
        classes = classes.trim().split(' ');
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
        // TODO: restructure removal as 2x set / 2x delete, instead of modify always replacing with new collection
        delete commonProperties.classes;
      }
    }

    // ~ attributes
    if (commonAttributes !== undefined) {
      (function () {
        var elementAttributes = element.attributes;
        var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
          var attribute = elementAttributes[key];
          var attributeName = attribute.name;
          // NOTE: workaround detection for non-standard phantomjs NamedNodeMap behaviour
          // (issue: https://github.com/ariya/phantomjs/issues/14634)
          if (attribute && attributeName !== 'class') {
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
              if (value === attributes[name]) {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optimize;

var _adapt = __webpack_require__(3);

var _adapt2 = _interopRequireDefault(_adapt);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Apply different optimization techniques
 *
 * @param  {string}                          selector - [description]
 * @param  {HTMLElement|Array.<HTMLElement>} element  - [description]
 * @param  {Object}                          options  - [description]
 * @return {string}                                   - [description]
 */
/**
 * # Optimize
 *
 * 1.) Improve efficiency through shorter selectors by removing redundancy
 * 2.) Improve robustness through selector transformation
 */

function optimize(selector, elements) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  // convert single entry and NodeList
  if (!Array.isArray(elements)) {
    elements = !elements.length ? [elements] : (0, _utilities.convertNodeList)(elements);
  }

  if (!elements.length || elements.some(function (element) {
    return element.nodeType !== 1;
  })) {
    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');
  }

  var globalModified = (0, _adapt2.default)(elements[0], options);

  // chunk parts outside of quotes (http://stackoverflow.com/a/25663729)
  var path = selector.replace(/> /g, '>').split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);

  if (path.length < 2) {
    return optimizePart('', selector, '', elements);
  }

  var shortened = [path.pop()];
  while (path.length > 1) {
    var current = path.pop();
    var prePart = path.join(' ');
    var postPart = shortened.join(' ');

    var pattern = prePart + ' ' + postPart;
    var matches = document.querySelectorAll(pattern);
    if (matches.length !== elements.length) {
      shortened.unshift(optimizePart(prePart, current, postPart, elements));
    }
  }
  shortened.unshift(path[0]);
  path = shortened;

  // optimize start + end
  path[0] = optimizePart('', path[0], path.slice(1).join(' '), elements);
  path[path.length - 1] = optimizePart(path.slice(0, -1).join(' '), path[path.length - 1], '', elements);

  if (globalModified) {
    delete true;
  }

  return path.join(' ').replace(/>/g, '> ').trim();
}

/**
 * Improve a chunk of the selector
 *
 * @param  {string}              prePart  - [description]
 * @param  {string}              current  - [description]
 * @param  {string}              postPart - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @return {string}                       - [description]
 */
function optimizePart(prePart, current, postPart, elements) {
  if (prePart.length) prePart = prePart + ' ';
  if (postPart.length) postPart = ' ' + postPart;

  // robustness: attribute without value (generalization)
  if (/\[*\]/.test(current)) {
    var key = current.replace(/=.*$/, ']');
    var pattern = '' + prePart + key + postPart;
    var matches = document.querySelectorAll(pattern);
    if (compareResults(matches, elements)) {
      current = key;
    } else {
      // robustness: replace specific key-value with base tag (heuristic)
      var references = document.querySelectorAll('' + prePart + key);

      var _loop = function _loop() {
        var reference = references[i];
        if (elements.some(function (element) {
          return reference.contains(element);
        })) {
          var description = reference.tagName.toLowerCase();
          pattern = '' + prePart + description + postPart;
          matches = document.querySelectorAll(pattern);

          if (compareResults(matches, elements)) {
            current = description;
          }
          return 'break';
        }
      };

      for (var i = 0, l = references.length; i < l; i++) {
        var pattern;
        var matches;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
    }
  }

  // robustness: descendant instead child (heuristic)
  if (/>/.test(current)) {
    var descendant = current.replace(/>/, '');
    var pattern = '' + prePart + descendant + postPart;
    var matches = document.querySelectorAll(pattern);
    if (compareResults(matches, elements)) {
      current = descendant;
    }
  }

  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)
  if (/:nth-child/.test(current)) {
    // TODO: consider complete coverage of 'nth-of-type' replacement
    var type = current.replace(/nth-child/g, 'nth-of-type');
    var pattern = '' + prePart + type + postPart;
    var matches = document.querySelectorAll(pattern);
    if (compareResults(matches, elements)) {
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
      var pattern = ('' + prePart + partial + postPart).trim();
      if (!pattern.length || pattern.charAt(0) === '>' || pattern.charAt(pattern.length - 1) === '>') {
        break;
      }
      var matches = document.querySelectorAll(pattern);
      if (compareResults(matches, elements)) {
        current = partial;
      }
    }

    // robustness: degrade complex classname (heuristic)
    names = current && current.match(/\./g);
    if (names && names.length > 2) {
      var _references = document.querySelectorAll('' + prePart + current);

      var _loop2 = function _loop2() {
        var reference = _references[i];
        if (elements.some(function (element) {
          return reference.contains(element);
        })) {
          // TODO:
          // - check using attributes + regard excludes
          var description = reference.tagName.toLowerCase();
          pattern = '' + prePart + description + postPart;
          matches = document.querySelectorAll(pattern);

          if (compareResults(matches, elements)) {
            current = description;
          }
          return 'break';
        }
      };

      for (var i = 0, l = _references.length; i < l; i++) {
        var pattern;
        var matches;

        var _ret2 = _loop2();

        if (_ret2 === 'break') break;
      }
    }
  }

  return current;
}

/**
 * Evaluate matches with expected elements
 *
 * @param  {Array.<HTMLElement>} matches  - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @return {Boolean}                      - [description]
 */
function compareResults(matches, elements) {
  var length = matches.length;

  return length === elements.length && elements.every(function (element) {
    for (var i = 0; i < length; i++) {
      if (matches[i] === element) {
        return true;
      }
    }
    return false;
  });
}
module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = adapt;
/**
 * # Adapt
 *
 * Check and extend the environment for universal usage.
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
  if (true) {
    return false;
  } else {
    global.document = options.context || function () {
      var root = element;
      while (root.parent) {
        root = root.parent;
      }
      return root;
    }();
  }

  // https://github.com/fb55/domhandler/blob/master/index.js#L75
  var ElementPrototype = Object.getPrototypeOf(true);

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
      var instructions = getInstructions(selectors);
      var discover = instructions.shift();

      var total = instructions.length;
      return discover(this).filter(function (node) {
        var step = 0;
        while (step < total) {
          node = instructions[step](node, _this);
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

    var _selector$split = selector.split(':'),
        _selector$split2 = _slicedToArray(_selector$split, 2),
        type = _selector$split2[0],
        pseudo = _selector$split2[1];

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
          var _type$replace$split = type.replace(/\[|\]|"/g, '').split('='),
              _type$replace$split2 = _slicedToArray(_type$replace$split, 2),
              attributeKey = _type$replace$split2[0],
              attributeValue = _type$replace$split2[1];

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * # Select
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Construct a unique CSS query selector to access the selected DOM element(s).
                                                                                                                                                                                                                                                                               * For longevity it applies different matching and optimization strategies.
                                                                                                                                                                                                                                                                               */

exports.getSingleSelector = getSingleSelector;
exports.getMultiSelector = getMultiSelector;
exports.default = getQuerySelector;

var _adapt = __webpack_require__(3);

var _adapt2 = _interopRequireDefault(_adapt);

var _match = __webpack_require__(5);

var _match2 = _interopRequireDefault(_match);

var _optimize = __webpack_require__(2);

var _optimize2 = _interopRequireDefault(_optimize);

var _utilities = __webpack_require__(0);

var _common = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    delete true;
  }

  return optimized;
}

/**
 * Get a selector to match multiple descendants from an ancestor
 *
 * @param  {Array.<HTMLElement>|NodeList} elements - [description]
 * @param  {Object}                       options  - [description]
 * @return {string}                                - [description]
 */
function getMultiSelector(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (!Array.isArray(elements)) {
    elements = (0, _utilities.convertNodeList)(elements);
  }

  if (elements.some(function (element) {
    return element.nodeType !== 1;
  })) {
    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');
  }

  var globalModified = (0, _adapt2.default)(elements[0], options);

  var ancestor = (0, _common.getCommonAncestor)(elements, options);
  var ancestorSelector = getSingleSelector(ancestor, options);

  // TODO: consider usage of multiple selectors + parent-child relation + check for part redundancy
  var commonSelectors = getCommonSelectors(elements);
  var descendantSelector = commonSelectors[0];

  var selector = (0, _optimize2.default)(ancestorSelector + ' ' + descendantSelector, elements, options);
  var selectorMatches = (0, _utilities.convertNodeList)(document.querySelectorAll(selector));

  if (!elements.every(function (element) {
    return selectorMatches.some(function (entry) {
      return entry === element;
    });
  })) {
    // TODO: cluster matches to split into similar groups for sub selections
    return console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ', elements);
  }

  if (globalModified) {
    delete true;
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
  var _getCommonProperties = (0, _common.getCommonProperties)(elements),
      classes = _getCommonProperties.classes,
      attributes = _getCommonProperties.attributes,
      tag = _getCommonProperties.tag;

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

/**
 * Choose action depending on the input (multiple/single)
 *
 * NOTE: extended detection is used for special cases like the <select> element with <options>
 *
 * @param  {HTMLElement|NodeList|Array.<HTMLElement>} input   - [description]
 * @param  {Object}                                   options - [description]
 * @return {string}                                           - [description]
 */
function getQuerySelector(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (input.length && !input.name) {
    return getMultiSelector(input, options);
  }
  return getSingleSelector(input, options);
}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = match;

var _utilities = __webpack_require__(0);

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
/**
 * # Match
 *
 * Retrieve selector for a node.
 */

function match(node, options) {
  var _options$root = options.root,
      root = _options$root === undefined ? document : _options$root,
      _options$skip = options.skip,
      skip = _options$skip === undefined ? null : _options$skip,
      _options$priority = options.priority,
      priority = _options$priority === undefined ? ['id', 'class', 'href', 'src'] : _options$priority,
      _options$ignore = options.ignore,
      ignore = _options$ignore === undefined ? {} : _options$ignore;


  var path = [];
  var element = node;
  var length = path.length;
  var ignoreClass = false;

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
      predicate = new RegExp((0, _utilities.escapeValue)(predicate).replace(/\\/g, '\\\\'));
    }
    if (typeof predicate === 'boolean') {
      predicate = predicate ? /(?:)/ : /.^/;
    }
    // check class-/attributename for regex
    ignore[type] = function (name, value) {
      return predicate.test(value);
    };
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
      // ~ global
      if (checkAttributes(priority, element, ignore, path, root)) break;
      if (checkTag(element, ignore, path, root)) break;

      // ~ local
      checkAttributes(priority, element, ignore, path);
      if (path.length === length) {
        checkTag(element, ignore, path);
      }

      // define only one part each iteration
      if (path.length === length) {
        checkChilds(priority, element, ignore, path);
      }
    }

    element = element.parentNode;
    length = path.length;
  }

  if (element === root) {
    var pattern = findPattern(priority, element, ignore);
    path.unshift(pattern);
  }

  return path.join(' ');
}

/**
 * Extend path with attribute identifier
 *
 * @param  {Array.<string>} priority - [description]
 * @param  {HTMLElement}    element  - [description]
 * @param  {Object}         ignore   - [description]
 * @param  {Array.<string>} path     - [description]
 * @param  {HTMLElement}    parent   - [description]
 * @return {boolean}                 - [description]
 */
function checkAttributes(priority, element, ignore, path) {
  var parent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : element.parentNode;

  var pattern = findAttributesPattern(priority, element, ignore);
  if (pattern) {
    var matches = parent.querySelectorAll(pattern);
    if (matches.length === 1) {
      path.unshift(pattern);
      return true;
    }
  }
  return false;
}

/**
 * Lookup attribute identifier
 *
 * @param  {Array.<string>} priority - [description]
 * @param  {HTMLElement}    element  - [description]
 * @param  {Object}         ignore   - [description]
 * @return {string?}                 - [description]
 */
function findAttributesPattern(priority, element, ignore) {
  var attributes = element.attributes;
  var sortedKeys = Object.keys(attributes).sort(function (curr, next) {
    var currPos = priority.indexOf(attributes[curr].name);
    var nextPos = priority.indexOf(attributes[next].name);
    if (nextPos === -1) {
      if (currPos === -1) {
        return 0;
      }
      return -1;
    }
    return currPos - nextPos;
  });

  for (var i = 0, l = sortedKeys.length; i < l; i++) {
    var key = sortedKeys[i];
    var attribute = attributes[key];
    var attributeName = attribute.name;
    var attributeValue = (0, _utilities.escapeValue)(attribute.value);

    var currentIgnore = ignore[attributeName] || ignore.attribute;
    var currentDefaultIgnore = defaultIgnore[attributeName] || defaultIgnore.attribute;
    if (checkIgnore(currentIgnore, attributeName, attributeValue, currentDefaultIgnore)) {
      continue;
    }

    var pattern = '[' + attributeName + '="' + attributeValue + '"]';

    if (/\b\d/.test(attributeValue) === false) {
      if (attributeName === 'id') {
        pattern = '#' + attributeValue;
      }

      if (attributeName === 'class') {
        var className = attributeValue.trim().replace(/\s+/g, '.');
        pattern = '.' + className;
      }
    }

    return pattern;
  }
  return null;
}

/**
 * Extend path with tag identifier
 *
 * @param  {HTMLElement}    element - [description]
 * @param  {Object}         ignore  - [description]
 * @param  {Array.<string>} path    - [description]
 * @param  {HTMLElement}    parent  - [description]
 * @return {boolean}                - [description]
 */
function checkTag(element, ignore, path) {
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : element.parentNode;

  var pattern = findTagPattern(element, ignore);
  if (pattern) {
    var matches = parent.getElementsByTagName(pattern);
    if (matches.length === 1) {
      path.unshift(pattern);
      return true;
    }
  }
  return false;
}

/**
 * Lookup tag identifier
 *
 * @param  {HTMLElement} element - [description]
 * @param  {Object}      ignore  - [description]
 * @return {boolean}             - [description]
 */
function findTagPattern(element, ignore) {
  var tagName = element.tagName.toLowerCase();
  if (checkIgnore(ignore.tag, null, tagName)) {
    return null;
  }
  return tagName;
}

/**
 * Extend path with specific child identifier
 *
 * NOTE: 'childTags' is a custom property to use as a view filter for tags using 'adapter.js'
 *
 * @param  {Array.<string>} priority - [description]
 * @param  {HTMLElement}    element  - [description]
 * @param  {Object}         ignore   - [description]
 * @param  {Array.<string>} path     - [description]
 * @return {boolean}                 - [description]
 */
function checkChilds(priority, element, ignore, path) {
  var parent = element.parentNode;
  var children = parent.childTags || parent.children;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child === element) {
      var childPattern = findPattern(priority, child, ignore);
      if (!childPattern) {
        return console.warn('\n          Element couldn\'t be matched through strict ignore pattern!\n        ', child, ignore, childPattern);
      }
      var pattern = '> ' + childPattern + ':nth-child(' + (i + 1) + ')';
      path.unshift(pattern);
      return true;
    }
  }
  return false;
}

/**
 * Lookup identifier
 *
 * @param  {Array.<string>} priority - [description]
 * @param  {HTMLElement}    element  - [description]
 * @param  {Object}         ignore   - [description]
 * @return {string}                  - [description]
 */
function findPattern(priority, element, ignore) {
  var pattern = findAttributesPattern(priority, element, ignore);
  if (!pattern) {
    pattern = findTagPattern(element, ignore);
  }
  return pattern;
}

/**
 * Validate with custom and default functions
 *
 * @param  {Function} predicate        - [description]
 * @param  {string?}  name             - [description]
 * @param  {string}   value            - [description]
 * @param  {Function} defaultPredicate - [description]
 * @return {boolean}                   - [description]
 */
function checkIgnore(predicate, name, value, defaultPredicate) {
  if (!value) {
    return true;
  }
  var check = predicate || defaultPredicate;
  if (!check) {
    return false;
  }
  return check(name, value, defaultPredicate);
}
module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.common = exports.optimize = exports.getMultiSelector = exports.getSingleSelector = exports.select = undefined;

var _select2 = __webpack_require__(4);

Object.defineProperty(exports, 'getSingleSelector', {
  enumerable: true,
  get: function get() {
    return _select2.getSingleSelector;
  }
});
Object.defineProperty(exports, 'getMultiSelector', {
  enumerable: true,
  get: function get() {
    return _select2.getMultiSelector;
  }
});

var _select3 = _interopRequireDefault(_select2);

var _optimize2 = __webpack_require__(2);

var _optimize3 = _interopRequireDefault(_optimize2);

var _common2 = __webpack_require__(1);

var _common = _interopRequireWildcard(_common2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.select = _select3.default;
exports.optimize = _optimize3.default;
exports.common = _common;
exports.default = _select3.default;

/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhOGUwMjk3Y2RkNDE2YmMwZjMyNiIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGltaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9hZGFwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udmVydE5vZGVMaXN0IiwiZXNjYXBlVmFsdWUiLCJub2RlcyIsImxlbmd0aCIsImFyciIsIkFycmF5IiwiaSIsInZhbHVlIiwicmVwbGFjZSIsImdldENvbW1vbkFuY2VzdG9yIiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImVsZW1lbnRzIiwib3B0aW9ucyIsInJvb3QiLCJkb2N1bWVudCIsImFuY2VzdG9ycyIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJwYXJlbnRzIiwicGFyZW50Tm9kZSIsInVuc2hpZnQiLCJzb3J0IiwiY3VyciIsIm5leHQiLCJzaGFsbG93QW5jZXN0b3IiLCJzaGlmdCIsImFuY2VzdG9yIiwicGFyZW50IiwibWlzc2luZyIsInNvbWUiLCJvdGhlclBhcmVudHMiLCJvdGhlclBhcmVudCIsImwiLCJjb21tb25Qcm9wZXJ0aWVzIiwiY2xhc3NlcyIsImF0dHJpYnV0ZXMiLCJ0YWciLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzcGxpdCIsImZpbHRlciIsImVudHJ5IiwibmFtZSIsImVsZW1lbnRBdHRyaWJ1dGVzIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImtleSIsImF0dHJpYnV0ZSIsImF0dHJpYnV0ZU5hbWUiLCJhdHRyaWJ1dGVzTmFtZXMiLCJjb21tb25BdHRyaWJ1dGVzTmFtZXMiLCJuZXh0Q29tbW9uQXR0cmlidXRlcyIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIm9wdGltaXplIiwic2VsZWN0b3IiLCJpc0FycmF5Iiwibm9kZVR5cGUiLCJFcnJvciIsImdsb2JhbE1vZGlmaWVkIiwicGF0aCIsIm9wdGltaXplUGFydCIsInNob3J0ZW5lZCIsInBvcCIsImN1cnJlbnQiLCJwcmVQYXJ0Iiwiam9pbiIsInBvc3RQYXJ0IiwicGF0dGVybiIsIm1hdGNoZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2xpY2UiLCJ0ZXN0IiwiY29tcGFyZVJlc3VsdHMiLCJyZWZlcmVuY2VzIiwicmVmZXJlbmNlIiwiY29udGFpbnMiLCJkZXNjcmlwdGlvbiIsImRlc2NlbmRhbnQiLCJ0eXBlIiwibmFtZXMiLCJtYXAiLCJwYXJ0aWFsIiwiY2hhckF0IiwibWF0Y2giLCJldmVyeSIsImFkYXB0IiwiZ2xvYmFsIiwiY29udGV4dCIsIkVsZW1lbnRQcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsImNoaWxkcmVuIiwibm9kZSIsImF0dHJpYnMiLCJOYW1lZE5vZGVNYXAiLCJjb25maWd1cmFibGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIkhUTUxDb2xsZWN0aW9uIiwidHJhdmVyc2VEZXNjZW5kYW50cyIsImNoaWxkVGFncyIsInB1c2giLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiZGVzY2VuZGFudENsYXNzTmFtZSIsImNsYXNzIiwiaW5kZXhPZiIsInNlbGVjdG9ycyIsImluc3RydWN0aW9ucyIsImdldEluc3RydWN0aW9ucyIsImRpc2NvdmVyIiwidG90YWwiLCJzdGVwIiwiaW5jbHVzaXZlIiwiZG9uZSIsInJldmVyc2UiLCJwc2V1ZG8iLCJ2YWxpZGF0ZSIsImluc3RydWN0aW9uIiwiY2hlY2tQYXJlbnQiLCJzdWJzdHIiLCJub2RlQ2xhc3NOYW1lIiwiY2hlY2tDbGFzcyIsImdldEFuY2VzdG9yIiwiYXR0cmlidXRlS2V5IiwiYXR0cmlidXRlVmFsdWUiLCJoYXNBdHRyaWJ1dGUiLCJjaGVja0F0dHJpYnV0ZSIsIk5vZGVMaXN0IiwiaWQiLCJjaGVja0lkIiwiY2hlY2tVbml2ZXJzYWwiLCJjaGVja1RhZyIsInJ1bGUiLCJraW5kIiwicGFyc2VJbnQiLCJ2YWxpZGF0ZVBzZXVkbyIsImNvbXBhcmVTZXQiLCJub2RlSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsImVuaGFuY2VJbnN0cnVjdGlvbiIsIm1hdGNoZWROb2RlIiwiaGFuZGxlciIsInByb2dyZXNzIiwiZ2V0U2luZ2xlU2VsZWN0b3IiLCJnZXRNdWx0aVNlbGVjdG9yIiwiZ2V0UXVlcnlTZWxlY3RvciIsIm9wdGltaXplZCIsImFuY2VzdG9yU2VsZWN0b3IiLCJjb21tb25TZWxlY3RvcnMiLCJnZXRDb21tb25TZWxlY3RvcnMiLCJkZXNjZW5kYW50U2VsZWN0b3IiLCJzZWxlY3Rvck1hdGNoZXMiLCJjb25zb2xlIiwid2FybiIsInNlbGVjdG9yUGF0aCIsImNsYXNzU2VsZWN0b3IiLCJhdHRyaWJ1dGVTZWxlY3RvciIsInBhcnRzIiwiaW5wdXQiLCJkZWZhdWx0SWdub3JlIiwic2tpcCIsInByaW9yaXR5IiwiaWdub3JlIiwiaWdub3JlQ2xhc3MiLCJza2lwQ29tcGFyZSIsInNraXBDaGVja3MiLCJjb21wYXJlIiwicHJlZGljYXRlIiwidG9TdHJpbmciLCJSZWdFeHAiLCJpZ25vcmVBdHRyaWJ1dGUiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2hlY2tBdHRyaWJ1dGVzIiwiY2hlY2tDaGlsZHMiLCJmaW5kUGF0dGVybiIsImZpbmRBdHRyaWJ1dGVzUGF0dGVybiIsInNvcnRlZEtleXMiLCJjdXJyUG9zIiwibmV4dFBvcyIsImN1cnJlbnRJZ25vcmUiLCJjdXJyZW50RGVmYXVsdElnbm9yZSIsImNoZWNrSWdub3JlIiwiZmluZFRhZ1BhdHRlcm4iLCJjaGlsZFBhdHRlcm4iLCJjaGVjayIsInNlbGVjdCIsImNvbW1vbiIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztRQ3BEZ0JBLGUsR0FBQUEsZTtRQWlCQUMsVyxHQUFBQSxXO0FBN0JoQjs7Ozs7O0FBTUE7Ozs7OztBQU1PLFNBQVNELGVBQVQsQ0FBMEJFLEtBQTFCLEVBQWlDO0FBQUEsTUFDOUJDLE1BRDhCLEdBQ25CRCxLQURtQixDQUM5QkMsTUFEOEI7O0FBRXRDLE1BQU1DLE1BQU0sSUFBSUMsS0FBSixDQUFVRixNQUFWLENBQVo7QUFDQSxPQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBcEIsRUFBNEJHLEdBQTVCLEVBQWlDO0FBQy9CRixRQUFJRSxDQUFKLElBQVNKLE1BQU1JLENBQU4sQ0FBVDtBQUNEO0FBQ0QsU0FBT0YsR0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFPLFNBQVNILFdBQVQsQ0FBc0JNLEtBQXRCLEVBQTZCO0FBQ2xDLFNBQU9BLFNBQVNBLE1BQU1D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QyxFQUE4QytLLGdCQUE5QyxFQUFnRTtBQUM5RCxNQUFJLENBQUMvSyxLQUFMLEVBQVk7QUFDVixXQUFPLElBQVA7QUFDRDtBQUNELE1BQU00TCxRQUFRakIsYUFBYUksZ0JBQTNCO0FBQ0EsTUFBSSxDQUFDYSxLQUFMLEVBQVk7QUFDVixXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU9BLE1BQU1wSixJQUFOLEVBQVl4QyxLQUFaLEVBQW1CK0ssZ0JBQW5CLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDelJnQjVCLGlCOzs7Ozs7b0JBQW1CQyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQTdCeUMsTTtRQUNBeEksUTtRQUNLeUksTTtRQUVMQyxPIiwiZmlsZSI6Im9wdGltYWwtc2VsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJPcHRpbWFsU2VsZWN0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE4ZTAyOTdjZGQ0MTZiYzBmMzI2IiwiLyoqXG4gKiAjIFV0aWxpdGllc1xuICpcbiAqIENvbnZlbmllbmNlIGhlbHBlcnMuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYW4gYXJyYXkgd2l0aCB0aGUgRE9NIG5vZGVzIG9mIHRoZSBsaXN0XG4gKlxuICogQHBhcmFtICB7Tm9kZUxpc3R9ICAgICAgICAgICAgIG5vZGVzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE5vZGVMaXN0IChub2Rlcykge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUucmVwbGFjZSgvWydcImBcXFxcLzpcXD8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxBJylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsaXRpZXMuanMiLCIvKipcbiAqICMgQ29tbW9uXG4gKlxuICogUHJvY2VzcyBjb2xsZWN0aW9ucyBmb3Igc2ltaWxhcml0aWVzLlxuICovXG5cbi8qKlxuICogRmluZCB0aGUgbGFzdCBjb21tb24gYW5jZXN0b3Igb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnRzPn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tb25BbmNlc3RvciAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGNvbnN0IHtcbiAgICByb290ID0gZG9jdW1lbnRcbiAgfSA9IG9wdGlvbnNcblxuICBjb25zdCBhbmNlc3RvcnMgPSBbXVxuXG4gIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFyZW50cyA9IFtdXG4gICAgd2hpbGUgKGVsZW1lbnQgIT09IHJvb3QpIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgICAgIHBhcmVudHMudW5zaGlmdChlbGVtZW50KVxuICAgIH1cbiAgICBhbmNlc3RvcnNbaW5kZXhdID0gcGFyZW50c1xuICB9KVxuXG4gIGFuY2VzdG9ycy5zb3J0KChjdXJyLCBuZXh0KSA9PiBjdXJyLmxlbmd0aCAtIG5leHQubGVuZ3RoKVxuXG4gIGNvbnN0IHNoYWxsb3dBbmNlc3RvciA9IGFuY2VzdG9ycy5zaGlmdCgpXG5cbiAgdmFyIGFuY2VzdG9yID0gbnVsbFxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc2hhbGxvd0FuY2VzdG9yLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IHBhcmVudCA9IHNoYWxsb3dBbmNlc3RvcltpXVxuICAgIGNvbnN0IG1pc3NpbmcgPSBhbmNlc3RvcnMuc29tZSgob3RoZXJQYXJlbnRzKSA9PiB7XG4gICAgICByZXR1cm4gIW90aGVyUGFyZW50cy5zb21lKChvdGhlclBhcmVudCkgPT4gb3RoZXJQYXJlbnQgPT09IHBhcmVudClcbiAgICB9KVxuXG4gICAgaWYgKG1pc3NpbmcpIHtcbiAgICAgIC8vIFRPRE86IGZpbmQgc2ltaWxhciBzdWItcGFyZW50cywgbm90IHRoZSB0b3Agcm9vdCwgZS5nLiBzaGFyaW5nIGEgY2xhc3Mgc2VsZWN0b3JcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgYW5jZXN0b3IgPSBwYXJlbnRcbiAgfVxuXG4gIHJldHVybiBhbmNlc3RvclxufVxuXG4vKipcbiAqIEdldCBhIHNldCBvZiBjb21tb24gcHJvcGVydGllcyBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21tb25Qcm9wZXJ0aWVzIChlbGVtZW50cykge1xuXG4gIGNvbnN0IGNvbW1vblByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NlczogW10sXG4gICAgYXR0cmlidXRlczoge30sXG4gICAgdGFnOiBudWxsXG4gIH1cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cbiAgICB2YXIge1xuICAgICAgY2xhc3NlczogY29tbW9uQ2xhc3NlcyxcbiAgICAgIGF0dHJpYnV0ZXM6IGNvbW1vbkF0dHJpYnV0ZXMsXG4gICAgICB0YWc6IGNvbW1vblRhZ1xuICAgIH0gPSBjb21tb25Qcm9wZXJ0aWVzXG5cbiAgICAvLyB+IGNsYXNzZXNcbiAgICBpZiAoY29tbW9uQ2xhc3NlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpXG4gICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBjbGFzc2VzID0gY2xhc3Nlcy50cmltKCkuc3BsaXQoJyAnKVxuICAgICAgICBpZiAoIWNvbW1vbkNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzID0gY2xhc3Nlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkNsYXNzZXMgPSBjb21tb25DbGFzc2VzLmZpbHRlcigoZW50cnkpID0+IGNsYXNzZXMuc29tZSgobmFtZSkgPT4gbmFtZSA9PT0gZW50cnkpKVxuICAgICAgICAgIGlmIChjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzID0gY29tbW9uQ2xhc3Nlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiByZXN0cnVjdHVyZSByZW1vdmFsIGFzIDJ4IHNldCAvIDJ4IGRlbGV0ZSwgaW5zdGVhZCBvZiBtb2RpZnkgYWx3YXlzIHJlcGxhY2luZyB3aXRoIG5ldyBjb2xsZWN0aW9uXG4gICAgICAgIGRlbGV0ZSBjb21tb25Qcm9wZXJ0aWVzLmNsYXNzZXNcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB+IGF0dHJpYnV0ZXNcbiAgICBpZiAoY29tbW9uQXR0cmlidXRlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBlbGVtZW50QXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlc1xuICAgICAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5rZXlzKGVsZW1lbnRBdHRyaWJ1dGVzKS5yZWR1Y2UoKGF0dHJpYnV0ZXMsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBlbGVtZW50QXR0cmlidXRlc1trZXldXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubmFtZVxuICAgICAgICAvLyBOT1RFOiB3b3JrYXJvdW5kIGRldGVjdGlvbiBmb3Igbm9uLXN0YW5kYXJkIHBoYW50b21qcyBOYW1lZE5vZGVNYXAgYmVoYXZpb3VyXG4gICAgICAgIC8vIChpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTQ2MzQpXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlTmFtZSAhPT0gJ2NsYXNzJykge1xuICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPSBhdHRyaWJ1dGUudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlc1xuICAgICAgfSwge30pXG5cbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXNOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG4gICAgICBjb25zdCBjb21tb25BdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhjb21tb25BdHRyaWJ1dGVzKVxuXG4gICAgICBpZiAoYXR0cmlidXRlc05hbWVzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIWNvbW1vbkF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbW9uQXR0cmlidXRlcyA9IGNvbW1vbkF0dHJpYnV0ZXNOYW1lcy5yZWR1Y2UoKG5leHRDb21tb25BdHRyaWJ1dGVzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbW1vbkF0dHJpYnV0ZXNbbmFtZV1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gYXR0cmlidXRlc1tuYW1lXSkge1xuICAgICAgICAgICAgICBuZXh0Q29tbW9uQXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dENvbW1vbkF0dHJpYnV0ZXNcbiAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcykubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLmF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb21tb25Qcm9wZXJ0aWVzLmF0dHJpYnV0ZXNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBjb21tb25Qcm9wZXJ0aWVzLmF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB+IHRhZ1xuICAgIGlmIChjb21tb25UYWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdGFnID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmICghY29tbW9uVGFnKSB7XG4gICAgICAgIGNvbW1vblByb3BlcnRpZXMudGFnID0gdGFnXG4gICAgICB9IGVsc2UgaWYgKHRhZyAhPT0gY29tbW9uVGFnKSB7XG4gICAgICAgIGRlbGV0ZSBjb21tb25Qcm9wZXJ0aWVzLnRhZ1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gY29tbW9uUHJvcGVydGllc1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi5qcyIsIi8qKlxuICogIyBPcHRpbWl6ZVxuICpcbiAqIDEuKSBJbXByb3ZlIGVmZmljaWVuY3kgdGhyb3VnaCBzaG9ydGVyIHNlbGVjdG9ycyBieSByZW1vdmluZyByZWR1bmRhbmN5XG4gKiAyLikgSW1wcm92ZSByb2J1c3RuZXNzIHRocm91Z2ggc2VsZWN0b3IgdHJhbnNmb3JtYXRpb25cbiAqL1xuXG5pbXBvcnQgYWRhcHQgZnJvbSAnLi9hZGFwdCdcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEFwcGx5IGRpZmZlcmVudCBvcHRpbWl6YXRpb24gdGVjaG5pcXVlc1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcHRpbWl6ZSAoc2VsZWN0b3IsIGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcblxuICAvLyBjb252ZXJ0IHNpbmdsZSBlbnRyeSBhbmQgTm9kZUxpc3RcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gIWVsZW1lbnRzLmxlbmd0aCA/IFtlbGVtZW50c10gOiBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoIWVsZW1lbnRzLmxlbmd0aCB8fCBlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIHRvIGNvbXBhcmUgSFRNTEVsZW1lbnRzIGl0cyBuZWNlc3NhcnkgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBvZiB0aGUgc2VsZWN0ZWQgbm9kZShzKSEgKG1pc3NpbmcgXCJlbGVtZW50c1wiKWApXG4gIH1cblxuICBjb25zdCBnbG9iYWxNb2RpZmllZCA9IGFkYXB0KGVsZW1lbnRzWzBdLCBvcHRpb25zKVxuXG4gIC8vIGNodW5rIHBhcnRzIG91dHNpZGUgb2YgcXVvdGVzIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTY2MzcyOSlcbiAgdmFyIHBhdGggPSBzZWxlY3Rvci5yZXBsYWNlKC8+IC9nLCAnPicpLnNwbGl0KC9cXHMrKD89KD86KD86W15cIl0qXCIpezJ9KSpbXlwiXSokKS8pXG5cbiAgaWYgKHBhdGgubGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBvcHRpbWl6ZVBhcnQoJycsIHNlbGVjdG9yLCAnJywgZWxlbWVudHMpXG4gIH1cblxuICBjb25zdCBzaG9ydGVuZWQgPSBbcGF0aC5wb3AoKV1cbiAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkgIHtcbiAgICBjb25zdCBjdXJyZW50ID0gcGF0aC5wb3AoKVxuICAgIGNvbnN0IHByZVBhcnQgPSBwYXRoLmpvaW4oJyAnKVxuICAgIGNvbnN0IHBvc3RQYXJ0ID0gc2hvcnRlbmVkLmpvaW4oJyAnKVxuXG4gICAgY29uc3QgcGF0dGVybiA9IGAke3ByZVBhcnR9ICR7cG9zdFBhcnR9YFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIHNob3J0ZW5lZC51bnNoaWZ0KG9wdGltaXplUGFydChwcmVQYXJ0LCBjdXJyZW50LCBwb3N0UGFydCwgZWxlbWVudHMpKVxuICAgIH1cbiAgfVxuICBzaG9ydGVuZWQudW5zaGlmdChwYXRoWzBdKVxuICBwYXRoID0gc2hvcnRlbmVkXG5cbiAgLy8gb3B0aW1pemUgc3RhcnQgKyBlbmRcbiAgcGF0aFswXSA9IG9wdGltaXplUGFydCgnJywgcGF0aFswXSwgcGF0aC5zbGljZSgxKS5qb2luKCcgJyksIGVsZW1lbnRzKVxuICBwYXRoW3BhdGgubGVuZ3RoLTFdID0gb3B0aW1pemVQYXJ0KHBhdGguc2xpY2UoMCwgLTEpLmpvaW4oJyAnKSwgcGF0aFtwYXRoLmxlbmd0aC0xXSwgJycsIGVsZW1lbnRzKVxuXG4gIGlmIChnbG9iYWxNb2RpZmllZCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnRcbiAgfVxuXG4gIHJldHVybiBwYXRoLmpvaW4oJyAnKS5yZXBsYWNlKC8+L2csICc+ICcpLnRyaW0oKVxufVxuXG4vKipcbiAqIEltcHJvdmUgYSBjaHVuayBvZiB0aGUgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICBwcmVQYXJ0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgcG9zdFBhcnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBvcHRpbWl6ZVBhcnQgKHByZVBhcnQsIGN1cnJlbnQsIHBvc3RQYXJ0LCBlbGVtZW50cykge1xuICBpZiAocHJlUGFydC5sZW5ndGgpIHByZVBhcnQgPSBgJHtwcmVQYXJ0fSBgXG4gIGlmIChwb3N0UGFydC5sZW5ndGgpIHBvc3RQYXJ0ID0gYCAke3Bvc3RQYXJ0fWBcblxuICAvLyByb2J1c3RuZXNzOiBhdHRyaWJ1dGUgd2l0aG91dCB2YWx1ZSAoZ2VuZXJhbGl6YXRpb24pXG4gIGlmICgvXFxbKlxcXS8udGVzdChjdXJyZW50KSkge1xuICAgIGNvbnN0IGtleSA9IGN1cnJlbnQucmVwbGFjZSgvPS4qJC8sICddJylcbiAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtrZXl9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IGtleVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByb2J1c3RuZXNzOiByZXBsYWNlIHNwZWNpZmljIGtleS12YWx1ZSB3aXRoIGJhc2UgdGFnIChoZXVyaXN0aWMpXG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtwcmVQYXJ0fSR7a2V5fWApXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlZmVyZW5jZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSkpIHtcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHJlZmVyZW5jZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtkZXNjcmlwdGlvbn0ke3Bvc3RQYXJ0fWBcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgICAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHJvYnVzdG5lc3M6IGRlc2NlbmRhbnQgaW5zdGVhZCBjaGlsZCAoaGV1cmlzdGljKVxuICBpZiAoLz4vLnRlc3QoY3VycmVudCkpIHtcbiAgICBjb25zdCBkZXNjZW5kYW50ID0gY3VycmVudC5yZXBsYWNlKC8+LywgJycpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY2VuZGFudH0ke3Bvc3RQYXJ0fWBcbiAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICBjdXJyZW50ID0gZGVzY2VuZGFudFxuICAgIH1cbiAgfVxuXG4gIC8vIHJvYnVzdG5lc3M6ICdudGgtb2YtdHlwZScgaW5zdGVhZCAnbnRoLWNoaWxkJyAoaGV1cmlzdGljKVxuICBpZiAoLzpudGgtY2hpbGQvLnRlc3QoY3VycmVudCkpIHtcbiAgICAvLyBUT0RPOiBjb25zaWRlciBjb21wbGV0ZSBjb3ZlcmFnZSBvZiAnbnRoLW9mLXR5cGUnIHJlcGxhY2VtZW50XG4gICAgY29uc3QgdHlwZSA9IGN1cnJlbnQucmVwbGFjZSgvbnRoLWNoaWxkL2csICdudGgtb2YtdHlwZScpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7dHlwZX0ke3Bvc3RQYXJ0fWBcbiAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICBjdXJyZW50ID0gdHlwZVxuICAgIH1cbiAgfVxuXG4gIC8vIGVmZmljaWVuY3k6IGNvbWJpbmF0aW9ucyBvZiBjbGFzc25hbWUgKHBhcnRpYWwgcGVybXV0YXRpb25zKVxuICBpZiAoL1xcLlxcUytcXC5cXFMrLy50ZXN0KGN1cnJlbnQpKSB7XG4gICAgdmFyIG5hbWVzID0gY3VycmVudC50cmltKCkuc3BsaXQoJy4nKS5zbGljZSgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChuYW1lKSA9PiBgLiR7bmFtZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcbiAgICB3aGlsZSAobmFtZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBwYXJ0aWFsID0gY3VycmVudC5yZXBsYWNlKG5hbWVzLnNoaWZ0KCksICcnKS50cmltKClcbiAgICAgIHZhciBwYXR0ZXJuID0gYCR7cHJlUGFydH0ke3BhcnRpYWx9JHtwb3N0UGFydH1gLnRyaW0oKVxuICAgICAgaWYgKCFwYXR0ZXJuLmxlbmd0aCB8fCBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJz4nIHx8IHBhdHRlcm4uY2hhckF0KHBhdHRlcm4ubGVuZ3RoLTEpID09PSAnPicpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHZhciBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICBjdXJyZW50ID0gcGFydGlhbFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJvYnVzdG5lc3M6IGRlZ3JhZGUgY29tcGxleCBjbGFzc25hbWUgKGhldXJpc3RpYylcbiAgICBuYW1lcyA9IGN1cnJlbnQgJiYgY3VycmVudC5tYXRjaCgvXFwuL2cpXG4gICAgaWYgKG5hbWVzICYmIG5hbWVzLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAke3ByZVBhcnR9JHtjdXJyZW50fWApXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlZmVyZW5jZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSApKSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgICAvLyAtIGNoZWNrIHVzaW5nIGF0dHJpYnV0ZXMgKyByZWdhcmQgZXhjbHVkZXNcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHJlZmVyZW5jZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtkZXNjcmlwdGlvbn0ke3Bvc3RQYXJ0fWBcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgICAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogRXZhbHVhdGUgbWF0Y2hlcyB3aXRoIGV4cGVjdGVkIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gbWF0Y2hlcyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb21wYXJlUmVzdWx0cyAobWF0Y2hlcywgZWxlbWVudHMpIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IG1hdGNoZXNcbiAgcmV0dXJuIGxlbmd0aCA9PT0gZWxlbWVudHMubGVuZ3RoICYmIGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG1hdGNoZXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb3B0aW1pemUuanMiLCIvKipcbiAqICMgQWRhcHRcbiAqXG4gKiBDaGVjayBhbmQgZXh0ZW5kIHRoZSBlbnZpcm9ubWVudCBmb3IgdW5pdmVyc2FsIHVzYWdlLlxuICovXG5cbi8qKlxuICogTW9kaWZ5IHRoZSBjb250ZXh0IGJhc2VkIG9uIHRoZSBlbnZpcm9ubWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFTGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRhcHQgKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAvLyBkZXRlY3QgZW52aXJvbm1lbnQgc2V0dXBcbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5kb2N1bWVudCA9IG9wdGlvbnMuY29udGV4dCB8fCAoKCkgPT4ge1xuICAgICAgdmFyIHJvb3QgPSBlbGVtZW50XG4gICAgICB3aGlsZSAocm9vdC5wYXJlbnQpIHtcbiAgICAgICAgcm9vdCA9IHJvb3QucGFyZW50XG4gICAgICB9XG4gICAgICByZXR1cm4gcm9vdFxuICAgIH0pKClcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2RvbWhhbmRsZXIvYmxvYi9tYXN0ZXIvaW5kZXguanMjTDc1XG4gIGNvbnN0IEVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsLmRvY3VtZW50KVxuXG4gIC8vIGFsdGVybmF0aXZlIGRlc2NyaXB0b3IgdG8gYWNjZXNzIGVsZW1lbnRzIHdpdGggZmlsdGVyaW5nIGludmFsaWQgZWxlbWVudHMgKGUuZy4gdGV4dG5vZGVzKVxuICBpZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkVGFncycpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnRQcm90b3R5cGUsICdjaGlsZFRhZ3MnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZmlsdGVyKChub2RlKSA9PiB7XG4gICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvZG9tZWxlbWVudHR5cGUvYmxvYi9tYXN0ZXIvaW5kZXguanMjTDEyXG4gICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ3RhZycgfHwgbm9kZS50eXBlID09PSAnc2NyaXB0JyB8fCBub2RlLnR5cGUgPT09ICdzdHlsZSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnRQcm90b3R5cGUsICdhdHRyaWJ1dGVzJykpIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRyaWJ1dGVzXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05hbWVkTm9kZU1hcFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50UHJvdG90eXBlLCAnYXR0cmlidXRlcycsIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQgKCkge1xuICAgICAgICBjb25zdCB7IGF0dHJpYnMgfSA9IHRoaXNcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoYXR0cmlicylcbiAgICAgICAgY29uc3QgTmFtZWROb2RlTWFwID0gYXR0cmlidXRlc05hbWVzLnJlZHVjZSgoYXR0cmlidXRlcywgYXR0cmlidXRlTmFtZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2luZGV4XSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogYXR0cmlic1thdHRyaWJ1dGVOYW1lXVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXR0cmlidXRlc1xuICAgICAgICB9LCB7IH0pXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOYW1lZE5vZGVNYXAsICdsZW5ndGgnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB2YWx1ZTogYXR0cmlidXRlc05hbWVzLmxlbmd0aFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gTmFtZWROb2RlTWFwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5nZXRBdHRyaWJ1dGUpIHtcbiAgICAvLyBodHRwczovL2RvY3Mud2VicGxhdGZvcm0ub3JnL3dpa2kvZG9tL0VsZW1lbnQvZ2V0QXR0cmlidXRlXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0QXR0cmlidXRlXG4gICAgRWxlbWVudFByb3RvdHlwZS5nZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cmlic1tuYW1lXSB8fCBudWxsXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lKSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLndlYnBsYXRmb3JtLm9yZy93aWtpL2RvbS9Eb2N1bWVudC9nZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgRWxlbWVudFByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgICBjb25zdCBIVE1MQ29sbGVjdGlvbiA9IFtdXG4gICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKHRoaXMuY2hpbGRUYWdzLCAoZGVzY2VuZGFudCkgPT4ge1xuICAgICAgICBpZiAoZGVzY2VuZGFudC5uYW1lID09PSB0YWdOYW1lIHx8IHRhZ05hbWUgPT09ICcqJykge1xuICAgICAgICAgIEhUTUxDb2xsZWN0aW9uLnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBIVE1MQ29sbGVjdGlvblxuICAgIH1cbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLndlYnBsYXRmb3JtLm9yZy93aWtpL2RvbS9Eb2N1bWVudC9nZXRFbGVtZW50c0J5Q2xhc3NOYW1lXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0RWxlbWVudHNCeUNsYXNzTmFtZVxuICAgIEVsZW1lbnRQcm90b3R5cGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gY2xhc3NOYW1lLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykuc3BsaXQoJyAnKVxuICAgICAgY29uc3QgSFRNTENvbGxlY3Rpb24gPSBbXVxuICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbdGhpc10sIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRDbGFzc05hbWUgPSBkZXNjZW5kYW50LmF0dHJpYnMuY2xhc3NcbiAgICAgICAgaWYgKGRlc2NlbmRhbnRDbGFzc05hbWUgJiYgbmFtZXMuZXZlcnkoKG5hbWUpID0+IGRlc2NlbmRhbnRDbGFzc05hbWUuaW5kZXhPZihuYW1lKSA+IC0xKSkge1xuICAgICAgICAgIEhUTUxDb2xsZWN0aW9uLnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBIVE1MQ29sbGVjdGlvblxuICAgIH1cbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLndlYnBsYXRmb3JtLm9yZy93aWtpL2Nzcy9zZWxlY3RvcnNfYXBpL3F1ZXJ5U2VsZWN0b3JBbGxcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9xdWVyeVNlbGVjdG9yQWxsXG4gICAgRWxlbWVudFByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9ycykge1xuICAgICAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLnJlcGxhY2UoLyg+KShcXFMpL2csICckMSAkMicpLnRyaW0oKSAvLyBhZGQgc3BhY2UgZm9yICc+JyBzZWxlY3RvclxuXG4gICAgICAvLyB1c2luZyByaWdodCB0byBsZWZ0IGV4ZWN1dGlvbiA9PiBodHRwczovL2dpdGh1Yi5jb20vZmI1NS9jc3Mtc2VsZWN0I2hvdy1kb2VzLWl0LXdvcmtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGdldEluc3RydWN0aW9ucyhzZWxlY3RvcnMpXG4gICAgICBjb25zdCBkaXNjb3ZlciA9IGluc3RydWN0aW9ucy5zaGlmdCgpXG5cbiAgICAgIGNvbnN0IHRvdGFsID0gaW5zdHJ1Y3Rpb25zLmxlbmd0aFxuICAgICAgcmV0dXJuIGRpc2NvdmVyKHRoaXMpLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICB2YXIgc3RlcCA9IDBcbiAgICAgICAgd2hpbGUgKHN0ZXAgPCB0b3RhbCkge1xuICAgICAgICAgIG5vZGUgPSBpbnN0cnVjdGlvbnNbc3RlcF0obm9kZSwgdGhpcylcbiAgICAgICAgICBpZiAoIW5vZGUpIHsgLy8gaGllcmFyY2h5IGRvZXNuJ3QgbWF0Y2hcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGVwICs9IDFcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuY29udGFpbnMpIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9jb250YWluc1xuICAgIEVsZW1lbnRQcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGluY2x1c2l2ZSA9IGZhbHNlXG4gICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFt0aGlzXSwgKGRlc2NlbmRhbnQsIGRvbmUpID0+IHtcbiAgICAgICAgaWYgKGRlc2NlbmRhbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICBpbmNsdXNpdmUgPSB0cnVlXG4gICAgICAgICAgZG9uZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gaW5jbHVzaXZlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0cmFuc2Zvcm1hdGlvbiBzdGVwc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSAgIHNlbGVjdG9ycyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxGdW5jdGlvbj59ICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0SW5zdHJ1Y3Rpb25zIChzZWxlY3RvcnMpIHtcbiAgcmV0dXJuIHNlbGVjdG9ycy5zcGxpdCgnICcpLnJldmVyc2UoKS5tYXAoKHNlbGVjdG9yLCBzdGVwKSA9PiB7XG4gICAgY29uc3QgZGlzY292ZXIgPSBzdGVwID09PSAwXG4gICAgY29uc3QgW3R5cGUsIHBzZXVkb10gPSBzZWxlY3Rvci5zcGxpdCgnOicpXG5cbiAgICB2YXIgdmFsaWRhdGUgPSBudWxsXG4gICAgdmFyIGluc3RydWN0aW9uID0gbnVsbFxuXG4gICAgc3dpdGNoICh0cnVlKSB7XG5cbiAgICAgIC8vIGNoaWxkOiAnPidcbiAgICAgIGNhc2UgLz4vLnRlc3QodHlwZSk6XG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tQYXJlbnQgKG5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gKHZhbGlkYXRlKSA9PiB2YWxpZGF0ZShub2RlLnBhcmVudCkgJiYgbm9kZS5wYXJlbnRcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBjbGFzczogJy4nXG4gICAgICBjYXNlIC9eXFwuLy50ZXN0KHR5cGUpOlxuICAgICAgICBjb25zdCBuYW1lcyA9IHR5cGUuc3Vic3RyKDEpLnNwbGl0KCcuJylcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGVDbGFzc05hbWUgPSBub2RlLmF0dHJpYnMuY2xhc3NcbiAgICAgICAgICByZXR1cm4gbm9kZUNsYXNzTmFtZSAmJiBuYW1lcy5ldmVyeSgobmFtZSkgPT4gbm9kZUNsYXNzTmFtZS5pbmRleE9mKG5hbWUpID4gLTEpXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja0NsYXNzIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWVzLmpvaW4oJyAnKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBub2RlKHZhbGlkYXRlKSA6IGdldEFuY2VzdG9yKG5vZGUsIHJvb3QsIHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGF0dHJpYnV0ZTogJ1trZXk9XCJ2YWx1ZVwiXSdcbiAgICAgIGNhc2UgL15cXFsvLnRlc3QodHlwZSk6XG4gICAgICAgIGNvbnN0IFthdHRyaWJ1dGVLZXksIGF0dHJpYnV0ZVZhbHVlXSA9IHR5cGUucmVwbGFjZSgvXFxbfFxcXXxcIi9nLCAnJykuc3BsaXQoJz0nKVxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaGFzQXR0cmlidXRlID0gT2JqZWN0LmtleXMobm9kZS5hdHRyaWJzKS5pbmRleE9mKGF0dHJpYnV0ZUtleSkgPiAtMVxuICAgICAgICAgIGlmIChoYXNBdHRyaWJ1dGUpIHsgLy8gcmVnYXJkIG9wdGlvbmFsIGF0dHJpYnV0ZVZhbHVlXG4gICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZVZhbHVlIHx8IChub2RlLmF0dHJpYnNbYXR0cmlidXRlS2V5XSA9PT0gYXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGUgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IE5vZGVMaXN0ID0gW11cbiAgICAgICAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW25vZGVdLCAoZGVzY2VuZGFudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsaWRhdGUoZGVzY2VuZGFudCkpIHtcbiAgICAgICAgICAgICAgICBOb2RlTGlzdC5wdXNoKGRlc2NlbmRhbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gTm9kZUxpc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBub2RlKHZhbGlkYXRlKSA6IGdldEFuY2VzdG9yKG5vZGUsIHJvb3QsIHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIGlkOiAnIydcbiAgICAgIGNhc2UgL14jLy50ZXN0KHR5cGUpOlxuICAgICAgICBjb25zdCBpZCA9IHR5cGUuc3Vic3RyKDEpXG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5hdHRyaWJzLmlkID09PSBpZFxuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tJZCAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgY29uc3QgTm9kZUxpc3QgPSBbXVxuICAgICAgICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbbm9kZV0sIChkZXNjZW5kYW50LCBkb25lKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0ZShkZXNjZW5kYW50KSkge1xuICAgICAgICAgICAgICAgIE5vZGVMaXN0LnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gdW5pdmVyc2FsOiAnKidcbiAgICAgIGNhc2UgL1xcKi8udGVzdCh0eXBlKTpcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4gdHJ1ZVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrVW5pdmVyc2FsIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQpID0+IE5vZGVMaXN0LnB1c2goZGVzY2VuZGFudCkpXG4gICAgICAgICAgICByZXR1cm4gTm9kZUxpc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBub2RlKHZhbGlkYXRlKSA6IGdldEFuY2VzdG9yKG5vZGUsIHJvb3QsIHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIHRhZzogJy4uLidcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5uYW1lID09PSB0eXBlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja1RhZyAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgY29uc3QgTm9kZUxpc3QgPSBbXVxuICAgICAgICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbbm9kZV0sIChkZXNjZW5kYW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmICh2YWxpZGF0ZShkZXNjZW5kYW50KSkge1xuICAgICAgICAgICAgICAgIE5vZGVMaXN0LnB1c2goZGVzY2VuZGFudClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiBub2RlID09PSAnZnVuY3Rpb24nKSA/IG5vZGUodmFsaWRhdGUpIDogZ2V0QW5jZXN0b3Iobm9kZSwgcm9vdCwgdmFsaWRhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBzZXVkbykge1xuICAgICAgcmV0dXJuIGluc3RydWN0aW9uXG4gICAgfVxuXG4gICAgY29uc3QgcnVsZSA9IHBzZXVkby5tYXRjaCgvLShjaGlsZHx0eXBlKVxcKChcXGQrKVxcKSQvKVxuICAgIGNvbnN0IGtpbmQgPSBydWxlWzFdXG4gICAgY29uc3QgaW5kZXggPSBwYXJzZUludChydWxlWzJdLCAxMCkgLSAxXG5cbiAgICBjb25zdCB2YWxpZGF0ZVBzZXVkbyA9IChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICB2YXIgY29tcGFyZVNldCA9IG5vZGUucGFyZW50LmNoaWxkVGFnc1xuICAgICAgICBpZiAoa2luZCA9PT0gJ3R5cGUnKSB7XG4gICAgICAgICAgY29tcGFyZVNldCA9IGNvbXBhcmVTZXQuZmlsdGVyKHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IGNvbXBhcmVTZXQuZmluZEluZGV4KChjaGlsZCkgPT4gY2hpbGQgPT09IG5vZGUpXG4gICAgICAgIGlmIChub2RlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVuaGFuY2VJbnN0cnVjdGlvbiAobm9kZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBpbnN0cnVjdGlvbihub2RlKVxuICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgIHJldHVybiBtYXRjaC5yZWR1Y2UoKE5vZGVMaXN0LCBtYXRjaGVkTm9kZSkgPT4ge1xuICAgICAgICAgIGlmICh2YWxpZGF0ZVBzZXVkbyhtYXRjaGVkTm9kZSkpIHtcbiAgICAgICAgICAgIE5vZGVMaXN0LnB1c2gobWF0Y2hlZE5vZGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBOb2RlTGlzdFxuICAgICAgICB9LCBbXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxpZGF0ZVBzZXVkbyhtYXRjaCkgJiYgbWF0Y2hcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogV2Fsa2luZyByZWN1cnNpdmUgdG8gaW52b2tlIGNhbGxiYWNrc1xuICpcbiAqIEBwYXJhbSB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gbm9kZXMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259ICAgICAgICAgICAgaGFuZGxlciAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VEZXNjZW5kYW50cyAobm9kZXMsIGhhbmRsZXIpIHtcbiAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIHZhciBwcm9ncmVzcyA9IHRydWVcbiAgICBoYW5kbGVyKG5vZGUsICgpID0+IHByb2dyZXNzID0gZmFsc2UpXG4gICAgaWYgKG5vZGUuY2hpbGRUYWdzICYmIHByb2dyZXNzKSB7XG4gICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKG5vZGUuY2hpbGRUYWdzLCBoYW5kbGVyKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBCdWJibGUgdXAgZnJvbSBib3R0b20gdG8gdG9wXG4gKlxuICogQHBhcmFtICB7SFRNTEVMZW1lbnR9IG5vZGUgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVMZW1lbnR9IHJvb3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7RnVuY3Rpb259ICAgIHZhbGlkYXRlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7SFRNTEVMZW1lbnR9ICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBnZXRBbmNlc3RvciAobm9kZSwgcm9vdCwgdmFsaWRhdGUpIHtcbiAgd2hpbGUgKG5vZGUucGFyZW50KSB7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50XG4gICAgaWYgKHZhbGlkYXRlKG5vZGUpKSB7XG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cbiAgICBpZiAobm9kZSA9PT0gcm9vdCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hZGFwdC5qcyIsIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuXG5pbXBvcnQgYWRhcHQgZnJvbSAnLi9hZGFwdCdcbmltcG9ydCBtYXRjaCBmcm9tICcuL21hdGNoJ1xuaW1wb3J0IG9wdGltaXplIGZyb20gJy4vb3B0aW1pemUnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgZm9yIHRoZSBwcm92aWRlZCBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xlU2VsZWN0b3IgKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSBvbmx5IEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBhcmUgc3VwcG9ydGVkISAobm90IFwiJHt0eXBlb2YgZWxlbWVudH1cIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50LCBvcHRpb25zKVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gbWF0Y2goZWxlbWVudCwgb3B0aW9ucylcbiAgY29uc3Qgb3B0aW1pemVkID0gb3B0aW1pemUoc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpXG5cbiAgLy8gZGVidWdcbiAgLy8gY29uc29sZS5sb2coYFxuICAvLyAgIHNlbGVjdG9yOiAgJHtzZWxlY3Rvcn1cbiAgLy8gICBvcHRpbWl6ZWQ6ICR7b3B0aW1pemVkfVxuICAvLyBgKVxuXG4gIGlmIChnbG9iYWxNb2RpZmllZCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnRcbiAgfVxuXG4gIHJldHVybiBvcHRpbWl6ZWRcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RvciAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCFgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclNlbGVjdG9yID0gZ2V0U2luZ2xlU2VsZWN0b3IoYW5jZXN0b3IsIG9wdGlvbnMpXG5cbiAgLy8gVE9ETzogY29uc2lkZXIgdXNhZ2Ugb2YgbXVsdGlwbGUgc2VsZWN0b3JzICsgcGFyZW50LWNoaWxkIHJlbGF0aW9uICsgY2hlY2sgZm9yIHBhcnQgcmVkdW5kYW5jeVxuICBjb25zdCBjb21tb25TZWxlY3RvcnMgPSBnZXRDb21tb25TZWxlY3RvcnMoZWxlbWVudHMpXG4gIGNvbnN0IGRlc2NlbmRhbnRTZWxlY3RvciA9IGNvbW1vblNlbGVjdG9yc1swXVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gb3B0aW1pemUoYCR7YW5jZXN0b3JTZWxlY3Rvcn0gJHtkZXNjZW5kYW50U2VsZWN0b3J9YCwgZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IHNlbGVjdG9yTWF0Y2hlcyA9IGNvbnZlcnROb2RlTGlzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblxuICBpZiAoIWVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBzZWxlY3Rvck1hdGNoZXMuc29tZSgoZW50cnkpID0+IGVudHJ5ID09PSBlbGVtZW50KSApKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICBUaGUgc2VsZWN0ZWQgZWxlbWVudHMgY2FuXFwndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGAsIGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKGdsb2JhbE1vZGlmaWVkKSB7XG4gICAgZGVsZXRlIGdsb2JhbC5kb2N1bWVudFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudHM+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tbW9uU2VsZWN0b3JzIChlbGVtZW50cykge1xuXG4gIGNvbnN0IHsgY2xhc3NlcywgYXR0cmlidXRlcywgdGFnIH0gPSBnZXRDb21tb25Qcm9wZXJ0aWVzKGVsZW1lbnRzKVxuXG4gIGNvbnN0IHNlbGVjdG9yUGF0aCA9IFtdXG5cbiAgaWYgKHRhZykge1xuICAgIHNlbGVjdG9yUGF0aC5wdXNoKHRhZylcbiAgfVxuXG4gIGlmIChjbGFzc2VzKSB7XG4gICAgY29uc3QgY2xhc3NTZWxlY3RvciA9IGNsYXNzZXMubWFwKChuYW1lKSA9PiBgLiR7bmFtZX1gKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGNsYXNzU2VsZWN0b3IpXG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChwYXJ0cywgbmFtZSkgPT4ge1xuICAgICAgcGFydHMucHVzaChgWyR7bmFtZX09XCIke2F0dHJpYnV0ZXNbbmFtZV19XCJdYClcbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH0sIFtdKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGF0dHJpYnV0ZVNlbGVjdG9yKVxuICB9XG5cbiAgaWYgKHNlbGVjdG9yUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgcGFyZW50LWNoaWxkIHJlbGF0aW9uXG4gIH1cblxuICByZXR1cm4gW1xuICAgIHNlbGVjdG9yUGF0aC5qb2luKCcnKVxuICBdXG59XG5cbi8qKlxuICogQ2hvb3NlIGFjdGlvbiBkZXBlbmRpbmcgb24gdGhlIGlucHV0IChtdWx0aXBsZS9zaW5nbGUpXG4gKlxuICogTk9URTogZXh0ZW5kZWQgZGV0ZWN0aW9uIGlzIHVzZWQgZm9yIHNwZWNpYWwgY2FzZXMgbGlrZSB0aGUgPHNlbGVjdD4gZWxlbWVudCB3aXRoIDxvcHRpb25zPlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvciAoaW5wdXQsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKSB7XG4gICAgcmV0dXJuIGdldE11bHRpU2VsZWN0b3IoaW5wdXQsIG9wdGlvbnMpXG4gIH1cbiAgcmV0dXJuIGdldFNpbmdsZVNlbGVjdG9yKGlucHV0LCBvcHRpb25zKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlbGVjdC5qcyIsIi8qKlxuICogIyBNYXRjaFxuICpcbiAqIFJldHJpZXZlIHNlbGVjdG9yIGZvciBhIG5vZGUuXG4gKi9cblxuaW1wb3J0IHsgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcblxuY29uc3QgZGVmYXVsdElnbm9yZSA9IHtcbiAgYXR0cmlidXRlIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzdHlsZScsXG4gICAgICAnZGF0YS1yZWFjdGlkJyxcbiAgICAgICdkYXRhLXJlYWN0LWNoZWNrc3VtJ1xuICAgIF0uaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA+IC0xXG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZSAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdGNoIChub2RlLCBvcHRpb25zKSB7XG5cbiAgY29uc3Qge1xuICAgIHJvb3QgPSBkb2N1bWVudCxcbiAgICBza2lwID0gbnVsbCxcbiAgICBwcmlvcml0eSA9IFsnaWQnLCAnY2xhc3MnLCAnaHJlZicsICdzcmMnXSxcbiAgICBpZ25vcmUgPSB7fVxuICB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IHBhdGggPSBbXVxuICB2YXIgZWxlbWVudCA9IG5vZGVcbiAgdmFyIGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIHZhciBpZ25vcmVDbGFzcyA9IGZhbHNlXG5cbiAgY29uc3Qgc2tpcENvbXBhcmUgPSBza2lwICYmIChBcnJheS5pc0FycmF5KHNraXApID8gc2tpcCA6IFtza2lwXSkubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gZW50cnlcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5XG4gIH0pXG5cbiAgY29uc3Qgc2tpcENoZWNrcyA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIHNraXAgJiYgc2tpcENvbXBhcmUuc29tZSgoY29tcGFyZSkgPT4gY29tcGFyZShlbGVtZW50KSlcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGlnbm9yZSkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIGlmICh0eXBlID09PSAnY2xhc3MnKSB7XG4gICAgICBpZ25vcmVDbGFzcyA9IHRydWVcbiAgICB9XG4gICAgdmFyIHByZWRpY2F0ZSA9IGlnbm9yZVt0eXBlXVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnZnVuY3Rpb24nKSByZXR1cm5cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS50b1N0cmluZygpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgcHJlZGljYXRlID0gbmV3IFJlZ0V4cChlc2NhcGVWYWx1ZShwcmVkaWNhdGUpLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZSA/IC8oPzopLyA6IC8uXi9cbiAgICB9XG4gICAgLy8gY2hlY2sgY2xhc3MtL2F0dHJpYnV0ZW5hbWUgZm9yIHJlZ2V4XG4gICAgaWdub3JlW3R5cGVdID0gKG5hbWUsIHZhbHVlKSA9PiBwcmVkaWNhdGUudGVzdCh2YWx1ZSlcbiAgfSlcblxuICBpZiAoaWdub3JlQ2xhc3MpIHtcbiAgICBjb25zdCBpZ25vcmVBdHRyaWJ1dGUgPSBpZ25vcmUuYXR0cmlidXRlXG4gICAgaWdub3JlLmF0dHJpYnV0ZSA9IChuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSkgPT4ge1xuICAgICAgcmV0dXJuIGlnbm9yZS5jbGFzcyh2YWx1ZSkgfHwgaWdub3JlQXR0cmlidXRlICYmIGlnbm9yZUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoZWxlbWVudCAhPT0gcm9vdCkge1xuICAgIGlmIChza2lwQ2hlY2tzKGVsZW1lbnQpICE9PSB0cnVlKSB7XG4gICAgICAvLyB+IGdsb2JhbFxuICAgICAgaWYgKGNoZWNrQXR0cmlidXRlcyhwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBwYXRoLCByb290KSkgYnJlYWtcbiAgICAgIGlmIChjaGVja1RhZyhlbGVtZW50LCBpZ25vcmUsIHBhdGgsIHJvb3QpKSBicmVha1xuXG4gICAgICAvLyB+IGxvY2FsXG4gICAgICBjaGVja0F0dHJpYnV0ZXMocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgcGF0aClcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNoZWNrVGFnKGVsZW1lbnQsIGlnbm9yZSwgcGF0aClcbiAgICAgIH1cblxuICAgICAgLy8gZGVmaW5lIG9ubHkgb25lIHBhcnQgZWFjaCBpdGVyYXRpb25cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNoZWNrQ2hpbGRzKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIH1cblxuICBpZiAoZWxlbWVudCA9PT0gcm9vdCkge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBmaW5kUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKVxuICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICB9XG5cbiAgcmV0dXJuIHBhdGguam9pbignICcpXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBhdHRyaWJ1dGUgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGVzIChwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBwYXRoLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlKVxuICBpZiAocGF0dGVybikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcHJpb3JpdHkgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgaWdub3JlICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmc/fSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGZpbmRBdHRyaWJ1dGVzUGF0dGVybiAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSkge1xuICBjb25zdCBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gIGNvbnN0IHNvcnRlZEtleXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5zb3J0KChjdXJyLCBuZXh0KSA9PiB7XG4gICAgY29uc3QgY3VyclBvcyA9IHByaW9yaXR5LmluZGV4T2YoYXR0cmlidXRlc1tjdXJyXS5uYW1lKVxuICAgIGNvbnN0IG5leHRQb3MgPSBwcmlvcml0eS5pbmRleE9mKGF0dHJpYnV0ZXNbbmV4dF0ubmFtZSlcbiAgICBpZiAobmV4dFBvcyA9PT0gLTEpIHtcbiAgICAgIGlmIChjdXJyUG9zID09PSAtMSkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBjdXJyUG9zIC0gbmV4dFBvc1xuICB9KVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc29ydGVkS2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBzb3J0ZWRLZXlzW2ldXG4gICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1trZXldXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lXG4gICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBlc2NhcGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpXG5cbiAgICBjb25zdCBjdXJyZW50SWdub3JlID0gaWdub3JlW2F0dHJpYnV0ZU5hbWVdIHx8IGlnbm9yZS5hdHRyaWJ1dGVcbiAgICBjb25zdCBjdXJyZW50RGVmYXVsdElnbm9yZSA9IGRlZmF1bHRJZ25vcmVbYXR0cmlidXRlTmFtZV0gfHwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGVcbiAgICBpZiAoY2hlY2tJZ25vcmUoY3VycmVudElnbm9yZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUsIGN1cnJlbnREZWZhdWx0SWdub3JlKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB2YXIgcGF0dGVybiA9IGBbJHthdHRyaWJ1dGVOYW1lfT1cIiR7YXR0cmlidXRlVmFsdWV9XCJdYFxuXG4gICAgaWYgKCgvXFxiXFxkLykudGVzdChhdHRyaWJ1dGVWYWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ2lkJykge1xuICAgICAgICBwYXR0ZXJuID0gYCMke2F0dHJpYnV0ZVZhbHVlfWBcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYXR0cmlidXRlVmFsdWUudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy4nKVxuICAgICAgICBwYXR0ZXJuID0gYC4ke2NsYXNzTmFtZX1gXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdHRlcm5cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggdGFnIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja1RhZyAoZWxlbWVudCwgaWdub3JlLCBwYXRoLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBjb25zdCBtYXRjaGVzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHBhdHRlcm4pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmluZFRhZ1BhdHRlcm4gKGVsZW1lbnQsIGlnbm9yZSkge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS50YWcsIG51bGwsIHRhZ05hbWUpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICByZXR1cm4gdGFnTmFtZVxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggc3BlY2lmaWMgY2hpbGQgaWRlbnRpZmllclxuICpcbiAqIE5PVEU6ICdjaGlsZFRhZ3MnIGlzIGEgY3VzdG9tIHByb3BlcnR5IHRvIHVzZSBhcyBhIHZpZXcgZmlsdGVyIGZvciB0YWdzIHVzaW5nICdhZGFwdGVyLmpzJ1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tDaGlsZHMgKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHBhdGgpIHtcbiAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkVGFncyB8fCBwYXJlbnQuY2hpbGRyZW5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldXG4gICAgaWYgKGNoaWxkID09PSBlbGVtZW50KSB7XG4gICAgICBjb25zdCBjaGlsZFBhdHRlcm4gPSBmaW5kUGF0dGVybihwcmlvcml0eSwgY2hpbGQsIGlnbm9yZSlcbiAgICAgIGlmICghY2hpbGRQYXR0ZXJuKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oYFxuICAgICAgICAgIEVsZW1lbnQgY291bGRuXFwndCBiZSBtYXRjaGVkIHRocm91Z2ggc3RyaWN0IGlnbm9yZSBwYXR0ZXJuIVxuICAgICAgICBgLCBjaGlsZCwgaWdub3JlLCBjaGlsZFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBjb25zdCBwYXR0ZXJuID0gYD4gJHtjaGlsZFBhdHRlcm59Om50aC1jaGlsZCgke2krMX0pYFxuICAgICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmluZFBhdHRlcm4gKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUpIHtcbiAgdmFyIHBhdHRlcm4gPSBmaW5kQXR0cmlidXRlc1BhdHRlcm4ocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgfVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHdpdGggY3VzdG9tIGFuZCBkZWZhdWx0IGZ1bmN0aW9uc1xuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBwcmVkaWNhdGUgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nP30gIG5hbWUgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdmFsdWUgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkZWZhdWx0UHJlZGljYXRlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrSWdub3JlIChwcmVkaWNhdGUsIG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IGNoZWNrID0gcHJlZGljYXRlIHx8IGRlZmF1bHRQcmVkaWNhdGVcbiAgaWYgKCFjaGVjaykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBjaGVjayhuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXRjaC5qcyIsImV4cG9ydCBzZWxlY3QsIHsgZ2V0U2luZ2xlU2VsZWN0b3IsIGdldE11bHRpU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdCdcbmV4cG9ydCBvcHRpbWl6ZSBmcm9tICcuL29wdGltaXplJ1xuZXhwb3J0ICogYXMgY29tbW9uIGZyb20gJy4vY29tbW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBmcm9tICcuL3NlbGVjdCdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=