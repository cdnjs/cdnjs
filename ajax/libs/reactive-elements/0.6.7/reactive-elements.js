(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	            exposeMethods(reactElement, reactElement.props.container);
	            exposeDefaultMethods(reactElement, reactElement.props.container);
	
	            utils.getterSetter(this, 'props', function () {
	                return reactElement.props;
	            }, function (props) {
	                reactElement = create(this, props);
	            });
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = window.React || __webpack_require__(2);
	
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
	
	exports.getProps = function (el) {
	    var props = {};
	
	    for (var i = 0; i < el.attributes.length; i++) {
	        var attribute = el.attributes[i];
	        var name = exports.attributeNameToPropertyName(attribute.name);
	        props[name] = exports.parseAttributeValue(attribute.value);
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
	
	exports.parseAttributeValue = function (value) {
	    if (!value) {
	        return null;
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


/***/ }
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGM2YWRhYTBjMTNmMTBmMjg0OTciLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0aXZlLWVsZW1lbnRzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7O0FDQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBc0MsNEJBQTRCO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFDOzs7Ozs7O0FDNURELG1DOzs7Ozs7QUNBQSx1Qzs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDRCQUEyQixJQUFJO0FBQy9CLDBCQUF5QixFQUFFLElBQUksRUFBRTtBQUNqQyw4QkFBNkIsT0FBTzs7QUFFcEM7QUFDQTs7QUFFQTtBQUNBLHNEQUFxRCxFQUFFO0FBQ3ZELE1BQUs7QUFDTCxvREFBbUQ7QUFDbkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJyZWFjdGl2ZS1lbGVtZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGM2YWRhYTBjMTNmMTBmMjg0OTdcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3JjL3JlYWN0aXZlLWVsZW1lbnRzJyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlZ2lzdGVyRWxlbWVudCA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCB8fCBkb2N1bWVudC5yZWdpc3RlcjtcblxuICAgIGlmIChyZWdpc3RlckVsZW1lbnQpIHtcbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50ID0gcmVnaXN0ZXJFbGVtZW50LmJpbmQoZG9jdW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY3VzdG9tIGVsZW1lbnQgc3VwcG9ydCBvciBwb2x5ZmlsbCBmb3VuZCEnKTtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET00gfHwgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICAgICAgdmFyIHJlYWN0RWxlbWVudDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICBwYXJlbnQucmVhY3RpdmVFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB1dGlscy5nZXRDaGlsZHJlbih0aGlzKTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICBleHBvc2VNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBleHBvc2VEZWZhdWx0TWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwb3NlRGVmYXVsdE1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnQuZm9yY2VVcGRhdGUgPSByZWFjdENvbXBvbmVudC5mb3JjZVVwZGF0ZS5iaW5kKHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBvc2VNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICB1dGlscy5leHRlbmQoY3VzdG9tRWxlbWVudCwgcmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGV4cG9ydHMudXRpbHMgPSB1dGlscztcblxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XG59KCkpXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3JlYWN0aXZlLWVsZW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInJlYWN0LWRvbVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBnZXRBbGxQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHdoaWxlIChvYmogJiYgb2JqICE9PSBSZWFjdC5Db21wb25lbnQucHJvdG90eXBlICYmIG9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgcHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lc1tpXV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIH1cbiAgICBkZWxldGUgcHJvcHMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BzKTtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuc2libGUsIGV4dGVuZGluZykge1xuICAgIHZhciBwcm9wcyA9IGdldEFsbFByb3BlcnRpZXMoZXh0ZW5kaW5nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgIGlmICghKHByb3AgaW4gZXh0ZW5zaWJsZSkpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBleHRlbmRpbmdbcHJvcF07XG4gICAgICAgICAgICBleHRlbnNpYmxlW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5nZXRQcm9wcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBleHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm9wcy5jb250YWluZXIgPSBlbDtcblxuICAgIHJldHVybiBwcm9wcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICBzZXQ6IHNldHRlckZ1bmN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XG4gICAgdmFyaWFibGVQYXJlbnRbJ3NldCcgKyB2YXJpYWJsZU5hbWVdID0gc2V0dGVyRnVuY3Rpb247XG59O1xuXG5leHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvWy1fOl0oLikvZywgZnVuY3Rpb24gKHgsIGNocikge1xuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gU3VwcG9ydCBhdHRyaWJ1dGUgdmFsdWVzIHdpdGggbmV3bGluZXNcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1tcXG5cXHJdL2csICcnKTtcblxuICAgIHZhciBwb2ludGVyUmVnZXhwID0gL157Lio/fSQvaSxcbiAgICAgICAganNvblJlZ2V4cCA9IC9ee3syfS4qfXsyfSQvLFxuICAgICAgICBqc29uQXJyYXlSZWdleHAgPSAvXntcXFsuKlxcXX0kLztcblxuICAgIHZhciBwb2ludGVyTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHBvaW50ZXJSZWdleHApLFxuICAgICAgICBqc29uTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGpzb25SZWdleHApIHx8IHZhbHVlLm1hdGNoKGpzb25BcnJheVJlZ2V4cCk7XG5cbiAgICBpZiAoanNvbk1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGpzb25NYXRjaGVzWzBdLnJlcGxhY2UoL157fH0kL2csICcnKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IGV2YWwocG9pbnRlck1hdGNoZXNbMF0ucmVwbGFjZSgvW3t9XS9nLCAnJykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydHMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuXG5leHBvcnRzLnNoYWxsb3dDb3B5ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYikgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9