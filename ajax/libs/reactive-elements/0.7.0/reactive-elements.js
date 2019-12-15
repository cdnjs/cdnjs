(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	(function() {
	    var registerElement = document.registerElement || document.register;

	    if (registerElement) {
	        registerElement = registerElement.bind(document);
	    } else {
	        throw new Error('No custom element support or polyfill found!');
	    }

	    var React = window.React || __webpack_require__(2);
	    var ReactDOM = window.ReactDOM || __webpack_require__(3);
	    var utils = __webpack_require__(4);

	    exports.registerReact = function (elementName, ReactComponent) {
	        var elementPrototype = Object.create(HTMLElement.prototype);
	        var reactElement;

	        function create(parent, props) {
	            var element = React.createElement(ReactComponent, props);
	            parent.reactiveElement = element;
	            return ReactDOM.render(element, parent, props.onRender);
	        }

	        elementPrototype.createdCallback = function () {
	            var props = utils.getProps(this);
	            props.children = utils.getChildren(this);
	            reactElement = create(this, props);

	            if (reactElement !== null) {
	                exposeMethods(reactElement, reactElement.props.container);
	                exposeDefaultMethods(reactElement, reactElement.props.container);

	                utils.getterSetter(this, 'props', function () {
	                    return reactElement.props;
	                }, function (props) {
	                    reactElement = create(this, props);
	                });
	            }
	        };

	        elementPrototype.detachedCallback = function () {
	            ReactDOM.unmountComponentAtNode(this);
	        };

	        elementPrototype.attributeChangedCallback = function (name, oldValue, newValue) {
	            var props = utils.getProps(this);
	            reactElement = create(this, props);
	        };

	        registerElement(elementName, {prototype: elementPrototype});
	    };

	    function exposeDefaultMethods (reactComponent, customElement) {
	        customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
	    }

	    function exposeMethods (reactComponent, customElement) {
	        utils.extend(customElement, reactComponent);
	    }

	    exports.utils = utils;

	    document.registerReact = exports.registerReact;
	}())


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var React = window.React || __webpack_require__(2);
	var noBooleanTransformName = 'reactive-elements-no-boolean-transform';

	var getAllProperties = function (obj) {
	    var props = {};
	    while (obj && obj !== React.Component.prototype && obj !== Object.prototype) {
	        var propNames = Object.getOwnPropertyNames(obj);
	        for (var i = 0; i < propNames.length; i++) {
	            props[propNames[i]] = null;
	        }
	        obj = Object.getPrototypeOf(obj);
	    }
	    delete props.constructor;
	    return Object.keys(props);
	};

	exports.extend = function (extensible, extending) {
	    var props = getAllProperties(extending);
	    for (var i = 0; i < props.length; i++) {
	        var prop = props[i];
	        if (!(prop in extensible)) {
	            var val = extending[prop];
	            extensible[prop] = val;
	        }
	    }
	};

	var elementHasNoBooleanTransformAttribute = function (el) {
	  var foundAttribute = false;
	  for (var i = 0; i < el.attributes.length; i++) {
	    var attribute = el.attributes[i];
	    if (attribute.name === noBooleanTransformName) {
	      foundAttribute = true;
	      break;
	    }
	  }
	  return foundAttribute;
	}

	exports.getProps = function (el) {
	    var props = {};
	    var noBooleanTransforms = elementHasNoBooleanTransformAttribute(el);

	    for (var i = 0; i < el.attributes.length; i++) {
	        var attribute = el.attributes[i];
	        if (attribute.name === noBooleanTransformName) continue;

	        var name = exports.attributeNameToPropertyName(attribute.name);
	        props[name] = exports.parseAttributeValue(attribute.value, {
	            noBooleanTransforms: noBooleanTransforms,
	        });
	    }

	    props.container = el;

	    return props;
	};

	exports.getterSetter = function (variableParent, variableName, getterFunction, setterFunction) {
	    if (Object.defineProperty) {
	        Object.defineProperty(variableParent, variableName, {
	            get: getterFunction,
	            set: setterFunction
	        });
	    }
	    else if (document.__defineGetter__) {
	        variableParent.__defineGetter__(variableName, getterFunction);
	        variableParent.__defineSetter__(variableName, setterFunction);
	    }

	    variableParent['get' + variableName] = getterFunction;
	    variableParent['set' + variableName] = setterFunction;
	};

	exports.attributeNameToPropertyName = function (attributeName) {
	    return attributeName
	        .replace(/^(x|data)[-_:]/i, '')
	        .replace(/[-_:](.)/g, function (x, chr) {
	            return chr.toUpperCase();
	        });
	};

	exports.parseAttributeValue = function (value, transformOptions) {
	    if (!value) {
	        return null;
	    }

	    if (!transformOptions) {
	        transformOptions = {}
	    }

	    // Support attribute values with newlines
	    value = value.replace(/[\n\r]/g, '');

	    var pointerRegexp = /^{.*?}$/i,
	        jsonRegexp = /^{{2}.*}{2}$/,
	        jsonArrayRegexp = /^{\[.*\]}$/;

	    var pointerMatches = value.match(pointerRegexp),
	        jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

	    if (jsonMatches) {
	        value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
	    } else if (pointerMatches) {
	        value = eval(pointerMatches[0].replace(/[{}]/g, ''));
	    } else if ((value === 'true' || value === 'false') && !transformOptions.noBooleanTransforms) {
	        // convert the value to its actual boolean
	        value = value === 'true';
	    }

	    return value;
	};

	exports.getChildren = function (el) {
	    var fragment = document.createDocumentFragment();
	    while (el.childNodes.length) {
	        fragment.appendChild(el.childNodes[0]);
	    }
	    return fragment;
	};

	exports.shallowCopy = function (a, b) {
	    for (var key in b) a[key] = b[key];
	    return a;
	};


/***/ })
/******/ ])));