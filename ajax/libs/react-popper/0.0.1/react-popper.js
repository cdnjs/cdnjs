(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("Popper"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "Popper"], factory);
	else if(typeof exports === 'object')
		exports["ReactPopper"] = factory(require("react"), require("react-dom"), require("Popper"));
	else
		root["ReactPopper"] = factory(root["React"], root["ReactDOM"], root["Popper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Popper = __webpack_require__(1);

	var _Popper2 = _interopRequireDefault(_Popper);

	exports['default'] = _Popper2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _popperJs = __webpack_require__(4);

	var _popperJs2 = _interopRequireDefault(_popperJs);

	var Popper = (function (_Component) {
	  _inherits(Popper, _Component);

	  function Popper() {
	    _classCallCheck(this, Popper);

	    _get(Object.getPrototypeOf(Popper.prototype), 'constructor', this).apply(this, arguments);

	    this._targetNode = null;
	    this._elementParentNode = null;
	    this._popper = false;
	  }

	  _createClass(Popper, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._targetNode = (0, _reactDom.findDOMNode)(this);
	      this._update();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._update();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroy();
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      if (this._elementParentNode) {
	        // unmount component
	        _reactDom2['default'].unmountComponentAtNode(this._elementParentNode);

	        // clean up DOM
	        this._elementParentNode.parentNode.removeChild(this._elementParentNode);
	      }

	      if (this._popper) {
	        this._popper.destroy();
	      }

	      this._elementParentNode = null;
	      this._popper = null;
	    }
	  }, {
	    key: '_update',
	    value: function _update() {
	      var _this = this;

	      var _props = this.props;
	      var children = _props.children;
	      var renderElementTag = _props.renderElementTag;

	      var elementComponent = _react.Children.toArray(children)[1];

	      // if no element component provided, bail out
	      if (!elementComponent) {
	        // destroy Popper element if it has been created
	        if (this._popper) {
	          this._destroy();
	        }
	        return;
	      }

	      // create element node container if it hasn't been yet
	      if (!this._elementParentNode) {
	        // create a node that we can stick our content Component in
	        this._elementParentNode = document.createElement(renderElementTag);

	        // append node to the render node
	        this._renderNode.appendChild(this._elementParentNode);
	      }

	      // render element component into the DOM
	      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, elementComponent, this._elementParentNode, function () {
	        // don't update Popper until the subtree has finished rendering
	        _this._updatePopper();
	      });
	    }
	  }, {
	    key: '_updatePopper',
	    value: function _updatePopper() {
	      var _this2 = this;

	      var _props2 = this.props;
	      var children = _props2.children;
	      var renderElementTag = _props2.renderElementTag;
	      var renderElementTo = _props2.renderElementTo;
	      var id = _props2.id;
	      var className = _props2.className;
	      var style = _props2.style;

	      var options = _objectWithoutProperties(_props2, ['children', 'renderElementTag', 'renderElementTo', 'id', 'className', 'style']);

	      if (id) {
	        this._elementParentNode.id = id;
	      }

	      if (className) {
	        this._elementParentNode.className = className;
	      }

	      if (style) {
	        Object.keys(style).forEach(function (key) {
	          _this2._elementParentNode.style[key] = style[key];
	        });
	      }

	      if (!this._popper) {
	        this._popper = new _popperJs2['default'](this._targetNode, this._elementParentNode, {
	          placement: 'top'
	        });
	      } else {
	        // this._popper.setOptions(popperOptions)
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.toArray(this.props.children)[0];
	    }
	  }, {
	    key: 'targetNode',
	    get: function get() {
	      return this._targetNode;
	    }
	  }, {
	    key: 'elementParentNode',
	    get: function get() {
	      return this._elementParentNode;
	    }
	  }, {
	    key: 'tetherInstance',
	    get: function get() {
	      return this._popper;
	    }
	  }, {
	    key: '_renderNode',
	    get: function get() {
	      var renderElementTo = this.props.renderElementTo;

	      if (typeof renderElementTo === 'string') {
	        return document.querySelector(renderElementTo);
	      } else {
	        return renderElementTo || document.body;
	      }
	    }
	  }], [{
	    key: 'defaultProps',
	    value: {
	      renderElementTag: 'div',
	      renderElementTo: null
	    },
	    enumerable: true
	  }]);

	  return Popper;
	})(_react.Component);

	exports['default'] = Popper;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;