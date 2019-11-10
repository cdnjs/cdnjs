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


/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2ZkNGE4ZjQ0ZDE4Zjk3NDg5MDEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0aXZlLWVsZW1lbnRzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7O0FDQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCLGM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXNDLDRCQUE0QjtBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBQzs7Ozs7OztBQy9ERCxtQzs7Ozs7O0FDQUEsdUM7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0QkFBMkIsSUFBSTtBQUMvQiwwQkFBeUIsRUFBRSxJQUFJLEVBQUU7QUFDakMsOEJBQTZCLE9BQU87O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQSxzREFBcUQsRUFBRTtBQUN2RCxNQUFLO0FBQ0wsb0RBQW1EO0FBQ25EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicmVhY3RpdmUtZWxlbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjZmQ0YThmNDRkMThmOTc0ODkwMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvcmVhY3RpdmUtZWxlbWVudHMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NIHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKHBhcmVudCwgcHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xuICAgICAgICAgICAgcGFyZW50LnJlYWN0aXZlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIHBhcmVudCwgcHJvcHMub25SZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB1dGlscy5nZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gdXRpbHMuZ2V0Q2hpbGRyZW4odGhpcyk7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuXG4gICAgICAgICAgICBpZiAocmVhY3RFbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZXhwb3NlTWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGV4cG9zZURlZmF1bHRNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByb3BzID0gdXRpbHMuZ2V0UHJvcHModGhpcyk7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge3Byb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZX0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBleHBvc2VEZWZhdWx0TWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgY3VzdG9tRWxlbWVudC5mb3JjZVVwZGF0ZSA9IHJlYWN0Q29tcG9uZW50LmZvcmNlVXBkYXRlLmJpbmQocmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cG9zZU1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIHV0aWxzLmV4dGVuZChjdXN0b21FbGVtZW50LCByZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuXG4gICAgZG9jdW1lbnQucmVnaXN0ZXJSZWFjdCA9IGV4cG9ydHMucmVnaXN0ZXJSZWFjdDtcbn0oKSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlYWN0aXZlLWVsZW1lbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3RcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb21cIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIGdldEFsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHByb3BzID0ge307XG4gICAgd2hpbGUgKG9iaiAmJiBvYmogIT09IFJlYWN0LkNvbXBvbmVudC5wcm90b3R5cGUgJiYgb2JqICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVzW2ldXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgfVxuICAgIGRlbGV0ZSBwcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcHMpO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5zaWJsZSwgZXh0ZW5kaW5nKSB7XG4gICAgdmFyIHByb3BzID0gZ2V0QWxsUHJvcGVydGllcyhleHRlbmRpbmcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgaWYgKCEocHJvcCBpbiBleHRlbnNpYmxlKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGV4dGVuZGluZ1twcm9wXTtcbiAgICAgICAgICAgIGV4dGVuc2libGVbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHByb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGVsLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHZhciBuYW1lID0gZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xuXG4gICAgcmV0dXJuIHByb3BzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVHZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uKTtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcbn07XG5cbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZVxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xufTtcblxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0IGF0dHJpYnV0ZSB2YWx1ZXMgd2l0aCBuZXdsaW5lc1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW1xcblxccl0vZywgJycpO1xuXG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxuICAgICAgICBqc29uUmVnZXhwID0gL157ezJ9Lip9ezJ9JC8sXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xuXG4gICAgdmFyIHBvaW50ZXJNYXRjaGVzID0gdmFsdWUubWF0Y2gocG9pbnRlclJlZ2V4cCksXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcblxuICAgIGlmIChqc29uTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gZXZhbChwb2ludGVyTWF0Y2hlc1swXS5yZXBsYWNlKC9be31dL2csICcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0cy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmV4cG9ydHMuc2hhbGxvd0NvcHkgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==