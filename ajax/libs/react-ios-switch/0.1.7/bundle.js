(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

	var _Switch = __webpack_require__(1);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Switch).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dynamics = __webpack_require__(2);

	var _dynamics2 = _interopRequireDefault(_dynamics);

	var _d3Interpolate = __webpack_require__(3);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _Switch = __webpack_require__(38);

	var _Switch2 = _interopRequireDefault(_Switch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Switch = function (_React$Component) {
	  _inherits(Switch, _React$Component);

	  function Switch(props) {
	    _classCallCheck(this, Switch);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, props));

	    var offset = _this.getCheckedStateOffset(props);

	    // During a drag, we track the starting mouse position and the current mouse position.
	    // This allows us to avoid accumulating deltas, and thus avoid accumulating errors.
	    _this.state = {
	      currentClientX: 0,
	      dragging: false,
	      offset: offset,
	      startClientX: 0
	    };

	    // The state offset should always eventually match the animated properties offset.
	    // The component should interact with the state offset, while dynamics should interact with
	    // the animated properties offset.
	    _this.animatedProperties = {
	      offset: offset
	    };

	    _this.handleAnimationChange = _this.handleAnimationChange.bind(_this);
	    _this.handleClick = _this.handleClick.bind(_this);
	    _this.handleHandleClick = _this.handleHandleClick.bind(_this);
	    _this.handleInputChange = _this.handleInputChange.bind(_this);
	    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
	    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
	    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
	    return _this;
	  }

	  _createClass(Switch, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // Assume the props change occurred because the checked state changed. Animate back to the
	      // rest state.
	      this.startAnimation(nextProps);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var dragging = this.state.dragging;

	      this.cancelAnimation();
	      if (dragging) {
	        this.removeListeners();
	      }
	    }

	    // We should be able to compute the offset from the checked state.

	  }, {
	    key: 'getCheckedStateOffset',
	    value: function getCheckedStateOffset(props) {
	      var checked = props.checked;
	      var maxOffset = props.maxOffset;

	      return checked ? maxOffset : 0;
	    }
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      document.addEventListener('mousemove', this.handleMouseMove);
	      document.addEventListener('mouseup', this.handleMouseUp);
	    }
	  }, {
	    key: 'cancelAnimation',
	    value: function cancelAnimation() {
	      _dynamics2.default.stop(this.animatedProperties);
	    }
	  }, {
	    key: 'handleAnimationChange',
	    value: function handleAnimationChange() {
	      this.setState({
	        offset: this.animatedProperties.offset
	      });
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(e) {
	      var _props = this.props;
	      var checked = _props.checked;
	      var onChange = _props.onChange;

	      // Prevent the outer label from receiving the event.

	      e.preventDefault();

	      onChange(!checked);
	    }

	    // If a click event occurs on the handle, drop the event. The mouseup handler will decide
	    // whether to consider the mouseup event a "click to toggle" interaction or a "drag end"
	    // interaction.

	  }, {
	    key: 'handleHandleClick',
	    value: function handleHandleClick(e) {
	      // Prevent the outer label from receiving the event.
	      e.preventDefault();

	      // Prevent the switch click handler from receiving the event.
	      e.stopPropagation();
	    }

	    // If there is an outer label, and it is clicked, the input receives a click event and a change
	    // event. Because we use the click event to set the checked state (the click event propagates to
	    // the switch), we can ignore the change event.

	  }, {
	    key: 'handleInputChange',
	    value: function handleInputChange() {}
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(e) {
	      var dragging = this.state.dragging;

	      (0, _invariant2.default)(!dragging, 'Mouse down handler called inside of a drag');

	      // Left click only
	      if (e.button !== 0) {
	        return;
	      }

	      this.cancelAnimation();
	      this.setState({
	        currentClientX: e.clientX,
	        dragging: true,
	        startClientX: e.clientX
	      });

	      // While the drag is ongoing, we set document-level event handlers to capture mousemove and
	      // mouseup. This way, the drag doesn't end if the user mouses off the handle. These event
	      // handlers are expensive and global, so we need to make sure we remove them when the drag ends.
	      this.addListeners();
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      var dragging = this.state.dragging;

	      (0, _invariant2.default)(dragging, 'Mouse move handler called outside of a drag');

	      this.setState({
	        currentClientX: e.clientX
	      });
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp() {
	      var _props2 = this.props;
	      var checked = _props2.checked;
	      var maxOffset = _props2.maxOffset;
	      var onChange = _props2.onChange;
	      var _state = this.state;
	      var currentClientX = _state.currentClientX;
	      var dragging = _state.dragging;
	      var offset = _state.offset;
	      var startClientX = _state.startClientX;


	      (0, _invariant2.default)(dragging, 'Mouse up handler called outside of a drag');
	      this.removeListeners();

	      // If the mouse hasn't changed position by the end of a drag, treat it as a click on the handle.
	      var deltaX = currentClientX - startClientX;
	      if (!deltaX) {
	        this.setState({
	          dragging: false
	        });
	        onChange(!checked);
	        return;
	      }

	      // The checked state is a function of the mouse offset.
	      var newOffset = offset + deltaX;
	      var newChecked = newOffset > maxOffset / 2;

	      this.setState({
	        dragging: false,
	        offset: newOffset
	      });
	      onChange(newChecked);
	    }
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners() {
	      document.removeEventListener('mousemove', this.handleMouseMove);
	      document.removeEventListener('mouseup', this.handleMouseUp);
	    }
	  }, {
	    key: 'startAnimation',
	    value: function startAnimation(props) {
	      var offset = this.state.offset;

	      this.animatedProperties.offset = offset;

	      // Note that spring animation always results in a bounce at the end. Choose parameters to
	      // minimize this bounce.
	      _dynamics2.default.animate(this.animatedProperties, {
	        offset: this.getCheckedStateOffset(props)
	      }, {
	        change: this.handleAnimationChange,
	        frequency: 200,
	        friction: 400,
	        type: _dynamics2.default.spring
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props;
	      var checked = _props3.checked;
	      var disabled = _props3.disabled;
	      var handleColor = _props3.handleColor;
	      var maxOffset = _props3.maxOffset;
	      var offColor = _props3.offColor;
	      var onColor = _props3.onColor;
	      var pendingOffColor = _props3.pendingOffColor;
	      var _state2 = this.state;
	      var currentClientX = _state2.currentClientX;
	      var dragging = _state2.dragging;
	      var offset = _state2.offset;
	      var startClientX = _state2.startClientX;

	      // The handle position is a function of the mouse offset.

	      var deltaX = dragging ? currentClientX - startClientX : 0;
	      var clampedOffset = Math.min(maxOffset, Math.max(0, offset + deltaX));
	      var handleTransform = 'translateX(' + clampedOffset + 'px)';

	      // The interpolation parameter is a function of the mouse offset.
	      var t = clampedOffset / maxOffset;

	      // The switch color is a function of the interpolation parameter.
	      var color = (0, _d3Interpolate.interpolate)(pendingOffColor, onColor)(t);

	      // The off state size is a function of the interpolation parameter.
	      var offStateTransform = 'scale(' + (1 - t) + ')';

	      return _react2.default.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)(_Switch2.default.switch, disabled && _Switch2.default['switch--disabled']),
	          onClick: this.handleClick,
	          style: {
	            backgroundColor: color
	          }
	        },
	        _react2.default.createElement('div', {
	          className: _Switch2.default.offState,
	          style: {
	            backgroundColor: offColor,
	            msTransform: offStateTransform,
	            transform: offStateTransform,
	            WebkitTransform: offStateTransform
	          }
	        }),
	        _react2.default.createElement('div', {
	          className: _Switch2.default.handle,
	          onClick: this.handleHandleClick,
	          onMouseDown: !disabled && this.handleMouseDown,
	          style: {
	            backgroundColor: handleColor,
	            msTransform: handleTransform,
	            transform: handleTransform,
	            WebkitTransform: handleTransform
	          }
	        }),
	        _react2.default.createElement('input', {
	          className: _Switch2.default.input,
	          checked: checked,
	          disabled: disabled,
	          onChange: this.handleInputChange,
	          type: 'checkbox'
	        })
	      );
	    }
	  }]);

	  return Switch;
	}(_react2.default.Component);

	Switch.defaultProps = {
	  disabled: false,
	  handleColor: 'white',
	  maxOffset: 20,
	  offColor: 'white',
	  onColor: '#4cd964',
	  pendingOffColor: '#e5e5e5'
	};
	exports.default = Switch;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.7.1
	(function() {
	  var Color, DecomposedMatrix, DecomposedMatrix2D, InterpolableArray, InterpolableColor, InterpolableObject, InterpolableWithUnit, Matrix, Matrix2D, Set, Vector, addTimeout, animationTick, animations, animationsTimeouts, applyDefaults, applyFrame, applyProperties, baseSVG, cacheFn, cancelTimeout, clone, createInterpolable, defaultValueForKey, degProperties, dynamics, getCurrentProperties, interpolate, isDocumentVisible, isSVGElement, lastTime, leftDelayForTimeout, makeArrayFn, observeVisibilityChange, parseProperties, prefixFor, propertyWithPrefix, pxProperties, rAF, roundf, runLoopPaused, runLoopRunning, runLoopTick, setRealTimeout, slow, slowRatio, startAnimation, startRunLoop, svgProperties, timeBeforeVisibilityChange, timeoutLastId, timeouts, toDashed, transformProperties, transformValueForProperty, unitForProperty,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  isDocumentVisible = function() {
	    return document.visibilityState === "visible" || (dynamics.tests != null);
	  };

	  observeVisibilityChange = (function() {
	    var fns;
	    fns = [];
	    if (typeof document !== "undefined" && document !== null) {
	      document.addEventListener("visibilitychange", function() {
	        var fn, _i, _len, _results;
	        _results = [];
	        for (_i = 0, _len = fns.length; _i < _len; _i++) {
	          fn = fns[_i];
	          _results.push(fn(isDocumentVisible()));
	        }
	        return _results;
	      });
	    }
	    return function(fn) {
	      return fns.push(fn);
	    };
	  })();

	  clone = function(o) {
	    var k, newO, v;
	    newO = {};
	    for (k in o) {
	      v = o[k];
	      newO[k] = v;
	    }
	    return newO;
	  };

	  cacheFn = function(func) {
	    var data;
	    data = {};
	    return function() {
	      var k, key, result, _i, _len;
	      key = "";
	      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
	        k = arguments[_i];
	        key += k.toString() + ",";
	      }
	      result = data[key];
	      if (!result) {
	        data[key] = result = func.apply(this, arguments);
	      }
	      return result;
	    };
	  };

	  makeArrayFn = function(fn) {
	    return function(el) {
	      var args, i, res;
	      if (el instanceof Array || el instanceof NodeList || el instanceof HTMLCollection) {
	        res = (function() {
	          var _i, _ref, _results;
	          _results = [];
	          for (i = _i = 0, _ref = el.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	            args = Array.prototype.slice.call(arguments, 1);
	            args.splice(0, 0, el[i]);
	            _results.push(fn.apply(this, args));
	          }
	          return _results;
	        }).apply(this, arguments);
	        return res;
	      }
	      return fn.apply(this, arguments);
	    };
	  };

	  applyDefaults = function(options, defaults) {
	    var k, v, _results;
	    _results = [];
	    for (k in defaults) {
	      v = defaults[k];
	      _results.push(options[k] != null ? options[k] : options[k] = v);
	    }
	    return _results;
	  };

	  applyFrame = function(el, properties) {
	    var k, v, _results;
	    if ((el.style != null)) {
	      return applyProperties(el, properties);
	    } else {
	      _results = [];
	      for (k in properties) {
	        v = properties[k];
	        _results.push(el[k] = v.format());
	      }
	      return _results;
	    }
	  };

	  applyProperties = function(el, properties) {
	    var isSVG, k, matrix, transforms, v;
	    properties = parseProperties(properties);
	    transforms = [];
	    isSVG = isSVGElement(el);
	    for (k in properties) {
	      v = properties[k];
	      if (transformProperties.contains(k)) {
	        transforms.push([k, v]);
	      } else {
	        if (v.format != null) {
	          v = v.format();
	        } else {
	          v = "" + v + (unitForProperty(k, v));
	        }
	        if (isSVG && svgProperties.contains(k)) {
	          el.setAttribute(k, v);
	        } else {
	          el.style[propertyWithPrefix(k)] = v;
	        }
	      }
	    }
	    if (transforms.length > 0) {
	      if (isSVG) {
	        matrix = new Matrix2D();
	        matrix.applyProperties(transforms);
	        return el.setAttribute("transform", matrix.decompose().format());
	      } else {
	        v = (transforms.map(function(transform) {
	          return transformValueForProperty(transform[0], transform[1]);
	        })).join(" ");
	        return el.style[propertyWithPrefix("transform")] = v;
	      }
	    }
	  };

	  isSVGElement = function(el) {
	    var _ref, _ref1;
	    if ((typeof SVGElement !== "undefined" && SVGElement !== null) && (typeof SVGSVGElement !== "undefined" && SVGSVGElement !== null)) {
	      return el instanceof SVGElement && !(el instanceof SVGSVGElement);
	    } else {
	      return (_ref = (_ref1 = dynamics.tests) != null ? typeof _ref1.isSVG === "function" ? _ref1.isSVG(el) : void 0 : void 0) != null ? _ref : false;
	    }
	  };

	  roundf = function(v, decimal) {
	    var d;
	    d = Math.pow(10, decimal);
	    return Math.round(v * d) / d;
	  };

	  Set = (function() {
	    function Set(array) {
	      var v, _i, _len;
	      this.obj = {};
	      for (_i = 0, _len = array.length; _i < _len; _i++) {
	        v = array[_i];
	        this.obj[v] = 1;
	      }
	    }

	    Set.prototype.contains = function(v) {
	      return this.obj[v] === 1;
	    };

	    return Set;

	  })();

	  toDashed = function(str) {
	    return str.replace(/([A-Z])/g, function($1) {
	      return "-" + $1.toLowerCase();
	    });
	  };

	  pxProperties = new Set('marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius'.split(','));

	  degProperties = new Set('rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ'.split(','));

	  transformProperties = new Set('translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective'.split(','));

	  svgProperties = new Set('accent-height,ascent,azimuth,baseFrequency,baseline-shift,bias,cx,cy,d,diffuseConstant,divisor,dx,dy,elevation,filterRes,fx,fy,gradientTransform,height,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,letter-spacing,limitingConeAngle,markerHeight,markerWidth,numOctaves,order,overline-position,overline-thickness,pathLength,points,pointsAtX,pointsAtY,pointsAtZ,r,radius,rx,ry,seed,specularConstant,specularExponent,stdDeviation,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,surfaceScale,target,targetX,targetY,transform,underline-position,underline-thickness,viewBox,width,x,x1,x2,y,y1,y2,z'.split(','));

	  unitForProperty = function(k, v) {
	    if (typeof v !== 'number') {
	      return '';
	    }
	    if (pxProperties.contains(k)) {
	      return 'px';
	    } else if (degProperties.contains(k)) {
	      return 'deg';
	    }
	    return '';
	  };

	  transformValueForProperty = function(k, v) {
	    var match, unit;
	    match = ("" + v).match(/^([0-9.-]*)([^0-9]*)$/);
	    if (match != null) {
	      v = match[1];
	      unit = match[2];
	    } else {
	      v = parseFloat(v);
	    }
	    v = roundf(parseFloat(v), 10);
	    if ((unit == null) || unit === "") {
	      unit = unitForProperty(k, v);
	    }
	    return "" + k + "(" + v + unit + ")";
	  };

	  parseProperties = function(properties) {
	    var axis, match, parsed, property, value, _i, _len, _ref;
	    parsed = {};
	    for (property in properties) {
	      value = properties[property];
	      if (transformProperties.contains(property)) {
	        match = property.match(/(translate|rotateC|rotate|skew|scale|perspective)(X|Y|Z|)/);
	        if (match && match[2].length > 0) {
	          parsed[property] = value;
	        } else {
	          _ref = ['X', 'Y', 'Z'];
	          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            axis = _ref[_i];
	            parsed[match[1] + axis] = value;
	          }
	        }
	      } else {
	        parsed[property] = value;
	      }
	    }
	    return parsed;
	  };

	  defaultValueForKey = function(key) {
	    var v;
	    v = key === 'opacity' ? 1 : 0;
	    return "" + v + (unitForProperty(key, v));
	  };

	  getCurrentProperties = function(el, keys) {
	    var isSVG, key, matrix, properties, style, v, _i, _j, _len, _len1, _ref;
	    properties = {};
	    isSVG = isSVGElement(el);
	    if (el.style != null) {
	      style = window.getComputedStyle(el, null);
	      for (_i = 0, _len = keys.length; _i < _len; _i++) {
	        key = keys[_i];
	        if (transformProperties.contains(key)) {
	          if (properties['transform'] == null) {
	            if (isSVG) {
	              matrix = new Matrix2D((_ref = el.transform.baseVal.consolidate()) != null ? _ref.matrix : void 0);
	            } else {
	              matrix = Matrix.fromTransform(style[propertyWithPrefix('transform')]);
	            }
	            properties['transform'] = matrix.decompose();
	          }
	        } else {
	          v = style[key];
	          if ((v == null) && svgProperties.contains(key)) {
	            v = el.getAttribute(key);
	          }
	          if (v === "" || (v == null)) {
	            v = defaultValueForKey(key);
	          }
	          properties[key] = createInterpolable(v);
	        }
	      }
	    } else {
	      for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
	        key = keys[_j];
	        properties[key] = createInterpolable(el[key]);
	      }
	    }
	    return properties;
	  };

	  createInterpolable = function(value) {
	    var interpolable, klass, klasses, _i, _len;
	    klasses = [InterpolableColor, InterpolableArray, InterpolableObject, InterpolableWithUnit];
	    for (_i = 0, _len = klasses.length; _i < _len; _i++) {
	      klass = klasses[_i];
	      interpolable = klass.create(value);
	      if (interpolable != null) {
	        return interpolable;
	      }
	    }
	    return null;
	  };

	  InterpolableObject = (function() {
	    function InterpolableObject(obj) {
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	      this.obj = obj;
	    }

	    InterpolableObject.prototype.interpolate = function(endInterpolable, t) {
	      var end, k, newObj, start, v;
	      start = this.obj;
	      end = endInterpolable.obj;
	      newObj = {};
	      for (k in start) {
	        v = start[k];
	        if (v.interpolate != null) {
	          newObj[k] = v.interpolate(end[k], t);
	        } else {
	          newObj[k] = v;
	        }
	      }
	      return new InterpolableObject(newObj);
	    };

	    InterpolableObject.prototype.format = function() {
	      return this.obj;
	    };

	    InterpolableObject.create = function(value) {
	      var k, obj, v;
	      if (value instanceof Object) {
	        obj = {};
	        for (k in value) {
	          v = value[k];
	          obj[k] = createInterpolable(v);
	        }
	        return new InterpolableObject(obj);
	      }
	      return null;
	    };

	    return InterpolableObject;

	  })();

	  InterpolableWithUnit = (function() {
	    function InterpolableWithUnit(value, prefix, suffix) {
	      this.prefix = prefix;
	      this.suffix = suffix;
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	      this.value = parseFloat(value);
	    }

	    InterpolableWithUnit.prototype.interpolate = function(endInterpolable, t) {
	      var end, start;
	      start = this.value;
	      end = endInterpolable.value;
	      return new InterpolableWithUnit((end - start) * t + start, endInterpolable.prefix || this.prefix, endInterpolable.suffix || this.suffix);
	    };

	    InterpolableWithUnit.prototype.format = function() {
	      if ((this.prefix == null) && (this.suffix == null)) {
	        return roundf(this.value, 5);
	      }
	      return this.prefix + roundf(this.value, 5) + this.suffix;
	    };

	    InterpolableWithUnit.create = function(value) {
	      var match;
	      if (typeof value !== "string") {
	        return new InterpolableWithUnit(value);
	      }
	      match = ("" + value).match("([^0-9.+-]*)([0-9.+-]+)([^0-9.+-]*)");
	      if (match != null) {
	        return new InterpolableWithUnit(match[2], match[1], match[3]);
	      }
	      return null;
	    };

	    return InterpolableWithUnit;

	  })();

	  InterpolableArray = (function() {
	    function InterpolableArray(values, sep) {
	      this.values = values;
	      this.sep = sep;
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	    }

	    InterpolableArray.prototype.interpolate = function(endInterpolable, t) {
	      var end, i, newValues, start, _i, _ref;
	      start = this.values;
	      end = endInterpolable.values;
	      newValues = [];
	      for (i = _i = 0, _ref = Math.min(start.length, end.length); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        if (start[i].interpolate != null) {
	          newValues.push(start[i].interpolate(end[i], t));
	        } else {
	          newValues.push(start[i]);
	        }
	      }
	      return new InterpolableArray(newValues, this.sep);
	    };

	    InterpolableArray.prototype.format = function() {
	      var values;
	      values = this.values.map(function(val) {
	        if (val.format != null) {
	          return val.format();
	        } else {
	          return val;
	        }
	      });
	      if (this.sep != null) {
	        return values.join(this.sep);
	      } else {
	        return values;
	      }
	    };

	    InterpolableArray.createFromArray = function(arr, sep) {
	      var values;
	      values = arr.map(function(val) {
	        return createInterpolable(val) || val;
	      });
	      values = values.filter(function(val) {
	        return val != null;
	      });
	      return new InterpolableArray(values, sep);
	    };

	    InterpolableArray.create = function(value) {
	      var arr, sep, seps, _i, _len;
	      if (value instanceof Array) {
	        return InterpolableArray.createFromArray(value, null);
	      }
	      if (typeof value !== "string") {
	        return;
	      }
	      seps = [' ', ',', '|', ';', '/', ':'];
	      for (_i = 0, _len = seps.length; _i < _len; _i++) {
	        sep = seps[_i];
	        arr = value.split(sep);
	        if (arr.length > 1) {
	          return InterpolableArray.createFromArray(arr, sep);
	        }
	      }
	      return null;
	    };

	    return InterpolableArray;

	  })();

	  Color = (function() {
	    function Color(rgb, format) {
	      this.rgb = rgb != null ? rgb : {};
	      this.format = format;
	      this.toRgba = __bind(this.toRgba, this);
	      this.toRgb = __bind(this.toRgb, this);
	      this.toHex = __bind(this.toHex, this);
	    }

	    Color.fromHex = function(hex) {
	      var hex3, result;
	      hex3 = hex.match(/^#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i);
	      if (hex3 != null) {
	        hex = "#" + hex3[1] + hex3[1] + hex3[2] + hex3[2] + hex3[3] + hex3[3];
	      }
	      result = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
	      if (result != null) {
	        return new Color({
	          r: parseInt(result[1], 16),
	          g: parseInt(result[2], 16),
	          b: parseInt(result[3], 16),
	          a: 1
	        }, "hex");
	      }
	      return null;
	    };

	    Color.fromRgb = function(rgb) {
	      var match, _ref;
	      match = rgb.match(/^rgba?\(([0-9.]*), ?([0-9.]*), ?([0-9.]*)(?:, ?([0-9.]*))?\)$/);
	      if (match != null) {
	        return new Color({
	          r: parseFloat(match[1]),
	          g: parseFloat(match[2]),
	          b: parseFloat(match[3]),
	          a: parseFloat((_ref = match[4]) != null ? _ref : 1)
	        }, match[4] != null ? "rgba" : "rgb");
	      }
	      return null;
	    };

	    Color.componentToHex = function(c) {
	      var hex;
	      hex = c.toString(16);
	      if (hex.length === 1) {
	        return "0" + hex;
	      } else {
	        return hex;
	      }
	    };

	    Color.prototype.toHex = function() {
	      return "#" + Color.componentToHex(this.rgb.r) + Color.componentToHex(this.rgb.g) + Color.componentToHex(this.rgb.b);
	    };

	    Color.prototype.toRgb = function() {
	      return "rgb(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ")";
	    };

	    Color.prototype.toRgba = function() {
	      return "rgba(" + this.rgb.r + ", " + this.rgb.g + ", " + this.rgb.b + ", " + this.rgb.a + ")";
	    };

	    return Color;

	  })();

	  InterpolableColor = (function() {
	    function InterpolableColor(color) {
	      this.color = color;
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	    }

	    InterpolableColor.prototype.interpolate = function(endInterpolable, t) {
	      var end, k, rgb, start, v, _i, _len, _ref;
	      start = this.color;
	      end = endInterpolable.color;
	      rgb = {};
	      _ref = ['r', 'g', 'b'];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        k = _ref[_i];
	        v = Math.round((end.rgb[k] - start.rgb[k]) * t + start.rgb[k]);
	        rgb[k] = Math.min(255, Math.max(0, v));
	      }
	      k = "a";
	      v = roundf((end.rgb[k] - start.rgb[k]) * t + start.rgb[k], 5);
	      rgb[k] = Math.min(1, Math.max(0, v));
	      return new InterpolableColor(new Color(rgb, end.format));
	    };

	    InterpolableColor.prototype.format = function() {
	      if (this.color.format === "hex") {
	        return this.color.toHex();
	      } else if (this.color.format === "rgb") {
	        return this.color.toRgb();
	      } else if (this.color.format === "rgba") {
	        return this.color.toRgba();
	      }
	    };

	    InterpolableColor.create = function(value) {
	      var color;
	      if (typeof value !== "string") {
	        return;
	      }
	      color = Color.fromHex(value) || Color.fromRgb(value);
	      if (color != null) {
	        return new InterpolableColor(color);
	      }
	      return null;
	    };

	    return InterpolableColor;

	  })();

	  DecomposedMatrix2D = (function() {
	    function DecomposedMatrix2D(props) {
	      this.props = props;
	      this.applyRotateCenter = __bind(this.applyRotateCenter, this);
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	    }

	    DecomposedMatrix2D.prototype.interpolate = function(endMatrix, t) {
	      var i, k, newProps, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _ref2;
	      newProps = {};
	      _ref = ['translate', 'scale', 'rotate'];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        k = _ref[_i];
	        newProps[k] = [];
	        for (i = _j = 0, _ref1 = this.props[k].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	          newProps[k][i] = (endMatrix.props[k][i] - this.props[k][i]) * t + this.props[k][i];
	        }
	      }
	      for (i = _k = 1; _k <= 2; i = ++_k) {
	        newProps['rotate'][i] = endMatrix.props['rotate'][i];
	      }
	      _ref2 = ['skew'];
	      for (_l = 0, _len1 = _ref2.length; _l < _len1; _l++) {
	        k = _ref2[_l];
	        newProps[k] = (endMatrix.props[k] - this.props[k]) * t + this.props[k];
	      }
	      return new DecomposedMatrix2D(newProps);
	    };

	    DecomposedMatrix2D.prototype.format = function() {
	      return "translate(" + (this.props.translate.join(',')) + ") rotate(" + (this.props.rotate.join(',')) + ") skewX(" + this.props.skew + ") scale(" + (this.props.scale.join(',')) + ")";
	    };

	    DecomposedMatrix2D.prototype.applyRotateCenter = function(rotateC) {
	      var i, m, m2d, negativeTranslate, _i, _results;
	      m = baseSVG.createSVGMatrix();
	      m = m.translate(rotateC[0], rotateC[1]);
	      m = m.rotate(this.props.rotate[0]);
	      m = m.translate(-rotateC[0], -rotateC[1]);
	      m2d = new Matrix2D(m);
	      negativeTranslate = m2d.decompose().props.translate;
	      _results = [];
	      for (i = _i = 0; _i <= 1; i = ++_i) {
	        _results.push(this.props.translate[i] -= negativeTranslate[i]);
	      }
	      return _results;
	    };

	    return DecomposedMatrix2D;

	  })();

	  baseSVG = typeof document !== "undefined" && document !== null ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : void 0;

	  Matrix2D = (function() {
	    function Matrix2D(m) {
	      this.m = m;
	      this.applyProperties = __bind(this.applyProperties, this);
	      this.decompose = __bind(this.decompose, this);
	      if (!this.m) {
	        this.m = baseSVG.createSVGMatrix();
	      }
	    }

	    Matrix2D.prototype.decompose = function() {
	      var kx, ky, kz, r0, r1;
	      r0 = new Vector([this.m.a, this.m.b]);
	      r1 = new Vector([this.m.c, this.m.d]);
	      kx = r0.length();
	      kz = r0.dot(r1);
	      r0 = r0.normalize();
	      ky = r1.combine(r0, 1, -kz).length();
	      return new DecomposedMatrix2D({
	        translate: [this.m.e, this.m.f],
	        rotate: [Math.atan2(this.m.b, this.m.a) * 180 / Math.PI, this.rotateCX, this.rotateCY],
	        scale: [kx, ky],
	        skew: kz / ky * 180 / Math.PI
	      });
	    };

	    Matrix2D.prototype.applyProperties = function(properties) {
	      var hash, k, props, v, _i, _len, _ref, _ref1;
	      hash = {};
	      for (_i = 0, _len = properties.length; _i < _len; _i++) {
	        props = properties[_i];
	        hash[props[0]] = props[1];
	      }
	      for (k in hash) {
	        v = hash[k];
	        if (k === "translateX") {
	          this.m = this.m.translate(v, 0);
	        } else if (k === "translateY") {
	          this.m = this.m.translate(0, v);
	        } else if (k === "scaleX") {
	          this.m = this.m.scale(v, 1);
	        } else if (k === "scaleY") {
	          this.m = this.m.scale(1, v);
	        } else if (k === "rotateZ") {
	          this.m = this.m.rotate(v);
	        } else if (k === "skewX") {
	          this.m = this.m.skewX(v);
	        } else if (k === "skewY") {
	          this.m = this.m.skewY(v);
	        }
	      }
	      this.rotateCX = (_ref = hash.rotateCX) != null ? _ref : 0;
	      return this.rotateCY = (_ref1 = hash.rotateCY) != null ? _ref1 : 0;
	    };

	    return Matrix2D;

	  })();

	  Vector = (function() {
	    function Vector(els) {
	      this.els = els;
	      this.combine = __bind(this.combine, this);
	      this.normalize = __bind(this.normalize, this);
	      this.length = __bind(this.length, this);
	      this.cross = __bind(this.cross, this);
	      this.dot = __bind(this.dot, this);
	      this.e = __bind(this.e, this);
	    }

	    Vector.prototype.e = function(i) {
	      if (i < 1 || i > this.els.length) {
	        return null;
	      } else {
	        return this.els[i - 1];
	      }
	    };

	    Vector.prototype.dot = function(vector) {
	      var V, n, product;
	      V = vector.els || vector;
	      product = 0;
	      n = this.els.length;
	      if (n !== V.length) {
	        return null;
	      }
	      n += 1;
	      while (--n) {
	        product += this.els[n - 1] * V[n - 1];
	      }
	      return product;
	    };

	    Vector.prototype.cross = function(vector) {
	      var A, B;
	      B = vector.els || vector;
	      if (this.els.length !== 3 || B.length !== 3) {
	        return null;
	      }
	      A = this.els;
	      return new Vector([(A[1] * B[2]) - (A[2] * B[1]), (A[2] * B[0]) - (A[0] * B[2]), (A[0] * B[1]) - (A[1] * B[0])]);
	    };

	    Vector.prototype.length = function() {
	      var a, e, _i, _len, _ref;
	      a = 0;
	      _ref = this.els;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        e = _ref[_i];
	        a += Math.pow(e, 2);
	      }
	      return Math.sqrt(a);
	    };

	    Vector.prototype.normalize = function() {
	      var e, i, length, newElements, _ref;
	      length = this.length();
	      newElements = [];
	      _ref = this.els;
	      for (i in _ref) {
	        e = _ref[i];
	        newElements[i] = e / length;
	      }
	      return new Vector(newElements);
	    };

	    Vector.prototype.combine = function(b, ascl, bscl) {
	      var i, result, _i, _ref;
	      result = [];
	      for (i = _i = 0, _ref = this.els.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        result[i] = (ascl * this.els[i]) + (bscl * b.els[i]);
	      }
	      return new Vector(result);
	    };

	    return Vector;

	  })();

	  DecomposedMatrix = (function() {
	    function DecomposedMatrix() {
	      this.toMatrix = __bind(this.toMatrix, this);
	      this.format = __bind(this.format, this);
	      this.interpolate = __bind(this.interpolate, this);
	    }

	    DecomposedMatrix.prototype.interpolate = function(decomposedB, t, only) {
	      var angle, decomposed, decomposedA, i, invscale, invth, k, qa, qb, scale, th, _i, _j, _k, _l, _len, _ref, _ref1;
	      if (only == null) {
	        only = null;
	      }
	      decomposedA = this;
	      decomposed = new DecomposedMatrix;
	      _ref = ['translate', 'scale', 'skew', 'perspective'];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        k = _ref[_i];
	        decomposed[k] = [];
	        for (i = _j = 0, _ref1 = decomposedA[k].length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	          if ((only == null) || only.indexOf(k) > -1 || only.indexOf("" + k + ['x', 'y', 'z'][i]) > -1) {
	            decomposed[k][i] = (decomposedB[k][i] - decomposedA[k][i]) * t + decomposedA[k][i];
	          } else {
	            decomposed[k][i] = decomposedA[k][i];
	          }
	        }
	      }
	      if ((only == null) || only.indexOf('rotate') !== -1) {
	        qa = decomposedA.quaternion;
	        qb = decomposedB.quaternion;
	        angle = qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2] + qa[3] * qb[3];
	        if (angle < 0.0) {
	          for (i = _k = 0; _k <= 3; i = ++_k) {
	            qa[i] = -qa[i];
	          }
	          angle = -angle;
	        }
	        if (angle + 1.0 > .05) {
	          if (1.0 - angle >= .05) {
	            th = Math.acos(angle);
	            invth = 1.0 / Math.sin(th);
	            scale = Math.sin(th * (1.0 - t)) * invth;
	            invscale = Math.sin(th * t) * invth;
	          } else {
	            scale = 1.0 - t;
	            invscale = t;
	          }
	        } else {
	          qb[0] = -qa[1];
	          qb[1] = qa[0];
	          qb[2] = -qa[3];
	          qb[3] = qa[2];
	          scale = Math.sin(piDouble * (.5 - t));
	          invscale = Math.sin(piDouble * t);
	        }
	        decomposed.quaternion = [];
	        for (i = _l = 0; _l <= 3; i = ++_l) {
	          decomposed.quaternion[i] = qa[i] * scale + qb[i] * invscale;
	        }
	      } else {
	        decomposed.quaternion = decomposedA.quaternion;
	      }
	      return decomposed;
	    };

	    DecomposedMatrix.prototype.format = function() {
	      return this.toMatrix().toString();
	    };

	    DecomposedMatrix.prototype.toMatrix = function() {
	      var decomposedMatrix, i, j, match, matrix, quaternion, skew, temp, w, x, y, z, _i, _j, _k, _l;
	      decomposedMatrix = this;
	      matrix = Matrix.I(4);
	      for (i = _i = 0; _i <= 3; i = ++_i) {
	        matrix.els[i][3] = decomposedMatrix.perspective[i];
	      }
	      quaternion = decomposedMatrix.quaternion;
	      x = quaternion[0];
	      y = quaternion[1];
	      z = quaternion[2];
	      w = quaternion[3];
	      skew = decomposedMatrix.skew;
	      match = [[1, 0], [2, 0], [2, 1]];
	      for (i = _j = 2; _j >= 0; i = --_j) {
	        if (skew[i]) {
	          temp = Matrix.I(4);
	          temp.els[match[i][0]][match[i][1]] = skew[i];
	          matrix = matrix.multiply(temp);
	        }
	      }
	      matrix = matrix.multiply(new Matrix([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w), 0], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w), 0], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y), 0], [0, 0, 0, 1]]));
	      for (i = _k = 0; _k <= 2; i = ++_k) {
	        for (j = _l = 0; _l <= 2; j = ++_l) {
	          matrix.els[i][j] *= decomposedMatrix.scale[i];
	        }
	        matrix.els[3][i] = decomposedMatrix.translate[i];
	      }
	      return matrix;
	    };

	    return DecomposedMatrix;

	  })();

	  Matrix = (function() {
	    function Matrix(els) {
	      this.els = els;
	      this.toString = __bind(this.toString, this);
	      this.decompose = __bind(this.decompose, this);
	      this.inverse = __bind(this.inverse, this);
	      this.augment = __bind(this.augment, this);
	      this.toRightTriangular = __bind(this.toRightTriangular, this);
	      this.transpose = __bind(this.transpose, this);
	      this.multiply = __bind(this.multiply, this);
	      this.dup = __bind(this.dup, this);
	      this.e = __bind(this.e, this);
	    }

	    Matrix.prototype.e = function(i, j) {
	      if (i < 1 || i > this.els.length || j < 1 || j > this.els[0].length) {
	        return null;
	      }
	      return this.els[i - 1][j - 1];
	    };

	    Matrix.prototype.dup = function() {
	      return new Matrix(this.els);
	    };

	    Matrix.prototype.multiply = function(matrix) {
	      var M, c, cols, elements, i, j, ki, kj, nc, ni, nj, returnVector, sum;
	      returnVector = matrix.modulus ? true : false;
	      M = matrix.els || matrix;
	      if (typeof M[0][0] === 'undefined') {
	        M = new Matrix(M).els;
	      }
	      ni = this.els.length;
	      ki = ni;
	      kj = M[0].length;
	      cols = this.els[0].length;
	      elements = [];
	      ni += 1;
	      while (--ni) {
	        i = ki - ni;
	        elements[i] = [];
	        nj = kj;
	        nj += 1;
	        while (--nj) {
	          j = kj - nj;
	          sum = 0;
	          nc = cols;
	          nc += 1;
	          while (--nc) {
	            c = cols - nc;
	            sum += this.els[i][c] * M[c][j];
	          }
	          elements[i][j] = sum;
	        }
	      }
	      M = new Matrix(elements);
	      if (returnVector) {
	        return M.col(1);
	      } else {
	        return M;
	      }
	    };

	    Matrix.prototype.transpose = function() {
	      var cols, elements, i, j, ni, nj, rows;
	      rows = this.els.length;
	      cols = this.els[0].length;
	      elements = [];
	      ni = cols;
	      ni += 1;
	      while (--ni) {
	        i = cols - ni;
	        elements[i] = [];
	        nj = rows;
	        nj += 1;
	        while (--nj) {
	          j = rows - nj;
	          elements[i][j] = this.els[j][i];
	        }
	      }
	      return new Matrix(elements);
	    };

	    Matrix.prototype.toRightTriangular = function() {
	      var M, els, i, j, k, kp, multiplier, n, np, p, _i, _j, _ref, _ref1;
	      M = this.dup();
	      n = this.els.length;
	      k = n;
	      kp = this.els[0].length;
	      while (--n) {
	        i = k - n;
	        if (M.els[i][i] === 0) {
	          for (j = _i = _ref = i + 1; _ref <= k ? _i < k : _i > k; j = _ref <= k ? ++_i : --_i) {
	            if (M.els[j][i] !== 0) {
	              els = [];
	              np = kp;
	              np += 1;
	              while (--np) {
	                p = kp - np;
	                els.push(M.els[i][p] + M.els[j][p]);
	              }
	              M.els[i] = els;
	              break;
	            }
	          }
	        }
	        if (M.els[i][i] !== 0) {
	          for (j = _j = _ref1 = i + 1; _ref1 <= k ? _j < k : _j > k; j = _ref1 <= k ? ++_j : --_j) {
	            multiplier = M.els[j][i] / M.els[i][i];
	            els = [];
	            np = kp;
	            np += 1;
	            while (--np) {
	              p = kp - np;
	              els.push(p <= i ? 0 : M.els[j][p] - M.els[i][p] * multiplier);
	            }
	            M.els[j] = els;
	          }
	        }
	      }
	      return M;
	    };

	    Matrix.prototype.augment = function(matrix) {
	      var M, T, cols, i, j, ki, kj, ni, nj;
	      M = matrix.els || matrix;
	      if (typeof M[0][0] === 'undefined') {
	        M = new Matrix(M).els;
	      }
	      T = this.dup();
	      cols = T.els[0].length;
	      ni = T.els.length;
	      ki = ni;
	      kj = M[0].length;
	      if (ni !== M.length) {
	        return null;
	      }
	      ni += 1;
	      while (--ni) {
	        i = ki - ni;
	        nj = kj;
	        nj += 1;
	        while (--nj) {
	          j = kj - nj;
	          T.els[i][cols + j] = M[i][j];
	        }
	      }
	      return T;
	    };

	    Matrix.prototype.inverse = function() {
	      var M, divisor, els, i, inverse_elements, j, ki, kp, new_element, ni, np, p, _i;
	      ni = this.els.length;
	      ki = ni;
	      M = this.augment(Matrix.I(ni)).toRightTriangular();
	      kp = M.els[0].length;
	      inverse_elements = [];
	      ni += 1;
	      while (--ni) {
	        i = ni - 1;
	        els = [];
	        np = kp;
	        inverse_elements[i] = [];
	        divisor = M.els[i][i];
	        np += 1;
	        while (--np) {
	          p = kp - np;
	          new_element = M.els[i][p] / divisor;
	          els.push(new_element);
	          if (p >= ki) {
	            inverse_elements[i].push(new_element);
	          }
	        }
	        M.els[i] = els;
	        for (j = _i = 0; 0 <= i ? _i < i : _i > i; j = 0 <= i ? ++_i : --_i) {
	          els = [];
	          np = kp;
	          np += 1;
	          while (--np) {
	            p = kp - np;
	            els.push(M.els[j][p] - M.els[i][p] * M.els[j][i]);
	          }
	          M.els[j] = els;
	        }
	      }
	      return new Matrix(inverse_elements);
	    };

	    Matrix.I = function(n) {
	      var els, i, j, k, nj;
	      els = [];
	      k = n;
	      n += 1;
	      while (--n) {
	        i = k - n;
	        els[i] = [];
	        nj = k;
	        nj += 1;
	        while (--nj) {
	          j = k - nj;
	          els[i][j] = i === j ? 1 : 0;
	        }
	      }
	      return new Matrix(els);
	    };

	    Matrix.prototype.decompose = function() {
	      var els, i, inversePerspectiveMatrix, j, k, matrix, pdum3, perspective, perspectiveMatrix, quaternion, result, rightHandSide, rotate, row, rowElement, s, scale, skew, t, translate, transposedInversePerspectiveMatrix, type, typeKey, v, w, x, y, z, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
	      matrix = this;
	      translate = [];
	      scale = [];
	      skew = [];
	      quaternion = [];
	      perspective = [];
	      els = [];
	      for (i = _i = 0; _i <= 3; i = ++_i) {
	        els[i] = [];
	        for (j = _j = 0; _j <= 3; j = ++_j) {
	          els[i][j] = matrix.els[i][j];
	        }
	      }
	      if (els[3][3] === 0) {
	        return false;
	      }
	      for (i = _k = 0; _k <= 3; i = ++_k) {
	        for (j = _l = 0; _l <= 3; j = ++_l) {
	          els[i][j] /= els[3][3];
	        }
	      }
	      perspectiveMatrix = matrix.dup();
	      for (i = _m = 0; _m <= 2; i = ++_m) {
	        perspectiveMatrix.els[i][3] = 0;
	      }
	      perspectiveMatrix.els[3][3] = 1;
	      if (els[0][3] !== 0 || els[1][3] !== 0 || els[2][3] !== 0) {
	        rightHandSide = new Vector(els.slice(0, 4)[3]);
	        inversePerspectiveMatrix = perspectiveMatrix.inverse();
	        transposedInversePerspectiveMatrix = inversePerspectiveMatrix.transpose();
	        perspective = transposedInversePerspectiveMatrix.multiply(rightHandSide).els;
	        for (i = _n = 0; _n <= 2; i = ++_n) {
	          els[i][3] = 0;
	        }
	        els[3][3] = 1;
	      } else {
	        perspective = [0, 0, 0, 1];
	      }
	      for (i = _o = 0; _o <= 2; i = ++_o) {
	        translate[i] = els[3][i];
	        els[3][i] = 0;
	      }
	      row = [];
	      for (i = _p = 0; _p <= 2; i = ++_p) {
	        row[i] = new Vector(els[i].slice(0, 3));
	      }
	      scale[0] = row[0].length();
	      row[0] = row[0].normalize();
	      skew[0] = row[0].dot(row[1]);
	      row[1] = row[1].combine(row[0], 1.0, -skew[0]);
	      scale[1] = row[1].length();
	      row[1] = row[1].normalize();
	      skew[0] /= scale[1];
	      skew[1] = row[0].dot(row[2]);
	      row[2] = row[2].combine(row[0], 1.0, -skew[1]);
	      skew[2] = row[1].dot(row[2]);
	      row[2] = row[2].combine(row[1], 1.0, -skew[2]);
	      scale[2] = row[2].length();
	      row[2] = row[2].normalize();
	      skew[1] /= scale[2];
	      skew[2] /= scale[2];
	      pdum3 = row[1].cross(row[2]);
	      if (row[0].dot(pdum3) < 0) {
	        for (i = _q = 0; _q <= 2; i = ++_q) {
	          scale[i] *= -1;
	          for (j = _r = 0; _r <= 2; j = ++_r) {
	            row[i].els[j] *= -1;
	          }
	        }
	      }
	      rowElement = function(index, elementIndex) {
	        return row[index].els[elementIndex];
	      };
	      rotate = [];
	      rotate[1] = Math.asin(-rowElement(0, 2));
	      if (Math.cos(rotate[1]) !== 0) {
	        rotate[0] = Math.atan2(rowElement(1, 2), rowElement(2, 2));
	        rotate[2] = Math.atan2(rowElement(0, 1), rowElement(0, 0));
	      } else {
	        rotate[0] = Math.atan2(-rowElement(2, 0), rowElement(1, 1));
	        rotate[1] = 0;
	      }
	      t = rowElement(0, 0) + rowElement(1, 1) + rowElement(2, 2) + 1.0;
	      if (t > 1e-4) {
	        s = 0.5 / Math.sqrt(t);
	        w = 0.25 / s;
	        x = (rowElement(2, 1) - rowElement(1, 2)) * s;
	        y = (rowElement(0, 2) - rowElement(2, 0)) * s;
	        z = (rowElement(1, 0) - rowElement(0, 1)) * s;
	      } else if ((rowElement(0, 0) > rowElement(1, 1)) && (rowElement(0, 0) > rowElement(2, 2))) {
	        s = Math.sqrt(1.0 + rowElement(0, 0) - rowElement(1, 1) - rowElement(2, 2)) * 2.0;
	        x = 0.25 * s;
	        y = (rowElement(0, 1) + rowElement(1, 0)) / s;
	        z = (rowElement(0, 2) + rowElement(2, 0)) / s;
	        w = (rowElement(2, 1) - rowElement(1, 2)) / s;
	      } else if (rowElement(1, 1) > rowElement(2, 2)) {
	        s = Math.sqrt(1.0 + rowElement(1, 1) - rowElement(0, 0) - rowElement(2, 2)) * 2.0;
	        x = (rowElement(0, 1) + rowElement(1, 0)) / s;
	        y = 0.25 * s;
	        z = (rowElement(1, 2) + rowElement(2, 1)) / s;
	        w = (rowElement(0, 2) - rowElement(2, 0)) / s;
	      } else {
	        s = Math.sqrt(1.0 + rowElement(2, 2) - rowElement(0, 0) - rowElement(1, 1)) * 2.0;
	        x = (rowElement(0, 2) + rowElement(2, 0)) / s;
	        y = (rowElement(1, 2) + rowElement(2, 1)) / s;
	        z = 0.25 * s;
	        w = (rowElement(1, 0) - rowElement(0, 1)) / s;
	      }
	      quaternion = [x, y, z, w];
	      result = new DecomposedMatrix;
	      result.translate = translate;
	      result.scale = scale;
	      result.skew = skew;
	      result.quaternion = quaternion;
	      result.perspective = perspective;
	      result.rotate = rotate;
	      for (typeKey in result) {
	        type = result[typeKey];
	        for (k in type) {
	          v = type[k];
	          if (isNaN(v)) {
	            type[k] = 0;
	          }
	        }
	      }
	      return result;
	    };

	    Matrix.prototype.toString = function() {
	      var i, j, str, _i, _j;
	      str = 'matrix3d(';
	      for (i = _i = 0; _i <= 3; i = ++_i) {
	        for (j = _j = 0; _j <= 3; j = ++_j) {
	          str += roundf(this.els[i][j], 10);
	          if (!(i === 3 && j === 3)) {
	            str += ',';
	          }
	        }
	      }
	      str += ')';
	      return str;
	    };

	    Matrix.matrixForTransform = cacheFn(function(transform) {
	      var matrixEl, result, style, _ref, _ref1, _ref2;
	      matrixEl = document.createElement('div');
	      matrixEl.style.position = 'absolute';
	      matrixEl.style.visibility = 'hidden';
	      matrixEl.style[propertyWithPrefix("transform")] = transform;
	      document.body.appendChild(matrixEl);
	      style = window.getComputedStyle(matrixEl, null);
	      result = (_ref = (_ref1 = style.transform) != null ? _ref1 : style[propertyWithPrefix("transform")]) != null ? _ref : (_ref2 = dynamics.tests) != null ? _ref2.matrixForTransform(transform) : void 0;
	      document.body.removeChild(matrixEl);
	      return result;
	    });

	    Matrix.fromTransform = function(transform) {
	      var digits, elements, i, match, matrixElements, _i;
	      match = transform != null ? transform.match(/matrix3?d?\(([-0-9,e \.]*)\)/) : void 0;
	      if (match) {
	        digits = match[1].split(',');
	        digits = digits.map(parseFloat);
	        if (digits.length === 6) {
	          elements = [digits[0], digits[1], 0, 0, digits[2], digits[3], 0, 0, 0, 0, 1, 0, digits[4], digits[5], 0, 1];
	        } else {
	          elements = digits;
	        }
	      } else {
	        elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	      }
	      matrixElements = [];
	      for (i = _i = 0; _i <= 3; i = ++_i) {
	        matrixElements.push(elements.slice(i * 4, i * 4 + 4));
	      }
	      return new Matrix(matrixElements);
	    };

	    return Matrix;

	  })();

	  prefixFor = cacheFn(function(property) {
	    var k, prefix, prop, propArray, propertyName, _i, _j, _len, _len1, _ref;
	    if (document.body.style[property] !== void 0) {
	      return '';
	    }
	    propArray = property.split('-');
	    propertyName = "";
	    for (_i = 0, _len = propArray.length; _i < _len; _i++) {
	      prop = propArray[_i];
	      propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1);
	    }
	    _ref = ["Webkit", "Moz", "ms"];
	    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
	      prefix = _ref[_j];
	      k = prefix + propertyName;
	      if (document.body.style[k] !== void 0) {
	        return prefix;
	      }
	    }
	    return '';
	  });

	  propertyWithPrefix = cacheFn(function(property) {
	    var prefix;
	    prefix = prefixFor(property);
	    if (prefix === 'Moz') {
	      return "" + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
	    }
	    if (prefix !== '') {
	      return "-" + (prefix.toLowerCase()) + "-" + (toDashed(property));
	    }
	    return toDashed(property);
	  });

	  rAF = typeof window !== "undefined" && window !== null ? window.requestAnimationFrame : void 0;

	  animations = [];

	  animationsTimeouts = [];

	  slow = false;

	  slowRatio = 1;

	  if (typeof window !== "undefined" && window !== null) {
	    window.addEventListener('keyup', function(e) {
	      if (e.keyCode === 68 && e.shiftKey && e.ctrlKey) {
	        return dynamics.toggleSlow();
	      }
	    });
	  }

	  if (rAF == null) {
	    lastTime = 0;
	    rAF = function(callback) {
	      var currTime, id, timeToCall;
	      currTime = Date.now();
	      timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      id = window.setTimeout(function() {
	        return callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }

	  runLoopRunning = false;

	  runLoopPaused = false;

	  startRunLoop = function() {
	    if (!runLoopRunning) {
	      runLoopRunning = true;
	      return rAF(runLoopTick);
	    }
	  };

	  runLoopTick = function(t) {
	    var animation, toRemoveAnimations, _i, _len;
	    if (runLoopPaused) {
	      rAF(runLoopTick);
	      return;
	    }
	    toRemoveAnimations = [];
	    for (_i = 0, _len = animations.length; _i < _len; _i++) {
	      animation = animations[_i];
	      if (!animationTick(t, animation)) {
	        toRemoveAnimations.push(animation);
	      }
	    }
	    animations = animations.filter(function(animation) {
	      return toRemoveAnimations.indexOf(animation) === -1;
	    });
	    if (animations.length === 0) {
	      return runLoopRunning = false;
	    } else {
	      return rAF(runLoopTick);
	    }
	  };

	  animationTick = function(t, animation) {
	    var key, properties, property, tt, y, _base, _base1, _ref;
	    if (animation.tStart == null) {
	      animation.tStart = t;
	    }
	    tt = (t - animation.tStart) / animation.options.duration;
	    y = animation.curve(tt);
	    properties = {};
	    if (tt >= 1) {
	      if (animation.curve.initialForce) {
	        properties = animation.properties.start;
	      } else {
	        properties = animation.properties.end;
	      }
	    } else {
	      _ref = animation.properties.start;
	      for (key in _ref) {
	        property = _ref[key];
	        properties[key] = interpolate(property, animation.properties.end[key], y);
	      }
	    }
	    applyFrame(animation.el, properties);
	    if (typeof (_base = animation.options).change === "function") {
	      _base.change(animation.el);
	    }
	    if (tt >= 1) {
	      if (typeof (_base1 = animation.options).complete === "function") {
	        _base1.complete(animation.el);
	      }
	    }
	    return tt < 1;
	  };

	  interpolate = function(start, end, y) {
	    if ((start != null) && (start.interpolate != null)) {
	      return start.interpolate(end, y);
	    }
	    return null;
	  };

	  startAnimation = function(el, properties, options, timeoutId) {
	    var endProperties, isSVG, k, matrix, startProperties, transforms, v, _base;
	    if (timeoutId != null) {
	      animationsTimeouts = animationsTimeouts.filter(function(timeout) {
	        return timeout.id !== timeoutId;
	      });
	    }
	    dynamics.stop(el, {
	      timeout: false
	    });
	    if (!options.animated) {
	      dynamics.css(el, properties);
	      if (typeof options.complete === "function") {
	        options.complete(this);
	      }
	      return;
	    }
	    properties = parseProperties(properties);
	    startProperties = getCurrentProperties(el, Object.keys(properties));
	    endProperties = {};
	    transforms = [];
	    for (k in properties) {
	      v = properties[k];
	      if ((el.style != null) && transformProperties.contains(k)) {
	        transforms.push([k, v]);
	      } else {
	        endProperties[k] = createInterpolable(v);
	        if (endProperties[k] instanceof InterpolableWithUnit && (el.style != null)) {
	          endProperties[k].prefix = '';
	          if ((_base = endProperties[k]).suffix == null) {
	            _base.suffix = unitForProperty(k, 0);
	          }
	        }
	      }
	    }
	    if (transforms.length > 0) {
	      isSVG = isSVGElement(el);
	      if (isSVG) {
	        matrix = new Matrix2D();
	        matrix.applyProperties(transforms);
	      } else {
	        v = (transforms.map(function(transform) {
	          return transformValueForProperty(transform[0], transform[1]);
	        })).join(" ");
	        matrix = Matrix.fromTransform(Matrix.matrixForTransform(v));
	      }
	      endProperties['transform'] = matrix.decompose();
	      if (isSVG) {
	        startProperties.transform.applyRotateCenter([endProperties.transform.props.rotate[1], endProperties.transform.props.rotate[2]]);
	      }
	    }
	    animations.push({
	      el: el,
	      properties: {
	        start: startProperties,
	        end: endProperties
	      },
	      options: options,
	      curve: options.type.call(options.type, options)
	    });
	    return startRunLoop();
	  };

	  timeouts = [];

	  timeoutLastId = 0;

	  setRealTimeout = function(timeout) {
	    if (!isDocumentVisible()) {
	      return;
	    }
	    return timeout.realTimeoutId = setTimeout(function() {
	      timeout.fn();
	      return cancelTimeout(timeout.id);
	    }, timeout.delay);
	  };

	  addTimeout = function(fn, delay) {
	    var timeout;
	    timeoutLastId += 1;
	    timeout = {
	      id: timeoutLastId,
	      tStart: Date.now(),
	      fn: fn,
	      delay: delay,
	      originalDelay: delay
	    };
	    setRealTimeout(timeout);
	    timeouts.push(timeout);
	    return timeoutLastId;
	  };

	  cancelTimeout = function(id) {
	    return timeouts = timeouts.filter(function(timeout) {
	      if (timeout.id === id) {
	        clearTimeout(timeout.realTimeoutId);
	      }
	      return timeout.id !== id;
	    });
	  };

	  leftDelayForTimeout = function(time, timeout) {
	    var consumedDelay;
	    if (time != null) {
	      consumedDelay = time - timeout.tStart;
	      return timeout.originalDelay - consumedDelay;
	    } else {
	      return timeout.originalDelay;
	    }
	  };

	  if (typeof window !== "undefined" && window !== null) {
	    window.addEventListener('unload', function() {});
	  }

	  timeBeforeVisibilityChange = null;

	  observeVisibilityChange(function(visible) {
	    var animation, difference, timeout, _i, _j, _k, _len, _len1, _len2, _results;
	    runLoopPaused = !visible;
	    if (!visible) {
	      timeBeforeVisibilityChange = Date.now();
	      _results = [];
	      for (_i = 0, _len = timeouts.length; _i < _len; _i++) {
	        timeout = timeouts[_i];
	        _results.push(clearTimeout(timeout.realTimeoutId));
	      }
	      return _results;
	    } else {
	      if (runLoopRunning) {
	        difference = Date.now() - timeBeforeVisibilityChange;
	        for (_j = 0, _len1 = animations.length; _j < _len1; _j++) {
	          animation = animations[_j];
	          if (animation.tStart != null) {
	            animation.tStart += difference;
	          }
	        }
	      }
	      for (_k = 0, _len2 = timeouts.length; _k < _len2; _k++) {
	        timeout = timeouts[_k];
	        timeout.delay = leftDelayForTimeout(timeBeforeVisibilityChange, timeout);
	        setRealTimeout(timeout);
	      }
	      return timeBeforeVisibilityChange = null;
	    }
	  });

	  dynamics = {};

	  dynamics.linear = function() {
	    return function(t) {
	      return t;
	    };
	  };

	  dynamics.spring = function(options) {
	    var A1, A2, decal, frequency, friction, s;
	    if (options == null) {
	      options = {};
	    }
	    applyDefaults(options, arguments.callee.defaults);
	    frequency = Math.max(1, options.frequency / 20);
	    friction = Math.pow(20, options.friction / 100);
	    s = options.anticipationSize / 1000;
	    decal = Math.max(0, s);
	    A1 = function(t) {
	      var M, a, b, x0, x1;
	      M = 0.8;
	      x0 = s / (1 - s);
	      x1 = 0;
	      b = (x0 - (M * x1)) / (x0 - x1);
	      a = (M - b) / x0;
	      return (a * t * options.anticipationStrength / 100) + b;
	    };
	    A2 = function(t) {
	      return Math.pow(friction / 10, -t) * (1 - t);
	    };
	    return function(t) {
	      var A, At, a, angle, b, frictionT, y0, yS;
	      frictionT = (t / (1 - s)) - (s / (1 - s));
	      if (t < s) {
	        yS = (s / (1 - s)) - (s / (1 - s));
	        y0 = (0 / (1 - s)) - (s / (1 - s));
	        b = Math.acos(1 / A1(yS));
	        a = (Math.acos(1 / A1(y0)) - b) / (frequency * (-s));
	        A = A1;
	      } else {
	        A = A2;
	        b = 0;
	        a = 1;
	      }
	      At = A(frictionT);
	      angle = frequency * (t - s) * a + b;
	      return 1 - (At * Math.cos(angle));
	    };
	  };

	  dynamics.bounce = function(options) {
	    var A, fn, frequency, friction;
	    if (options == null) {
	      options = {};
	    }
	    applyDefaults(options, arguments.callee.defaults);
	    frequency = Math.max(1, options.frequency / 20);
	    friction = Math.pow(20, options.friction / 100);
	    A = function(t) {
	      return Math.pow(friction / 10, -t) * (1 - t);
	    };
	    fn = function(t) {
	      var At, a, angle, b;
	      b = -3.14 / 2;
	      a = 1;
	      At = A(t);
	      angle = frequency * t * a + b;
	      return At * Math.cos(angle);
	    };
	    fn.initialForce = true;
	    return fn;
	  };

	  dynamics.gravity = function(options) {
	    var L, bounciness, curves, elasticity, fn, getPointInCurve, gravity;
	    if (options == null) {
	      options = {};
	    }
	    applyDefaults(options, arguments.callee.defaults);
	    bounciness = Math.min(options.bounciness / 1250, 0.8);
	    elasticity = options.elasticity / 1000;
	    gravity = 100;
	    curves = [];
	    L = (function() {
	      var b, curve;
	      b = Math.sqrt(2 / gravity);
	      curve = {
	        a: -b,
	        b: b,
	        H: 1
	      };
	      if (options.initialForce) {
	        curve.a = 0;
	        curve.b = curve.b * 2;
	      }
	      while (curve.H > 0.001) {
	        L = curve.b - curve.a;
	        curve = {
	          a: curve.b,
	          b: curve.b + L * bounciness,
	          H: curve.H * bounciness * bounciness
	        };
	      }
	      return curve.b;
	    })();
	    getPointInCurve = function(a, b, H, t) {
	      var c, t2;
	      L = b - a;
	      t2 = (2 / L) * t - 1 - (a * 2 / L);
	      c = t2 * t2 * H - H + 1;
	      if (options.initialForce) {
	        c = 1 - c;
	      }
	      return c;
	    };
	    (function() {
	      var L2, b, curve, _results;
	      b = Math.sqrt(2 / (gravity * L * L));
	      curve = {
	        a: -b,
	        b: b,
	        H: 1
	      };
	      if (options.initialForce) {
	        curve.a = 0;
	        curve.b = curve.b * 2;
	      }
	      curves.push(curve);
	      L2 = L;
	      _results = [];
	      while (curve.b < 1 && curve.H > 0.001) {
	        L2 = curve.b - curve.a;
	        curve = {
	          a: curve.b,
	          b: curve.b + L2 * bounciness,
	          H: curve.H * elasticity
	        };
	        _results.push(curves.push(curve));
	      }
	      return _results;
	    })();
	    fn = function(t) {
	      var curve, i, v;
	      i = 0;
	      curve = curves[i];
	      while (!(t >= curve.a && t <= curve.b)) {
	        i += 1;
	        curve = curves[i];
	        if (!curve) {
	          break;
	        }
	      }
	      if (!curve) {
	        v = options.initialForce ? 0 : 1;
	      } else {
	        v = getPointInCurve(curve.a, curve.b, curve.H, t);
	      }
	      return v;
	    };
	    fn.initialForce = options.initialForce;
	    return fn;
	  };

	  dynamics.forceWithGravity = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    applyDefaults(options, arguments.callee.defaults);
	    options.initialForce = true;
	    return dynamics.gravity(options);
	  };

	  dynamics.bezier = (function() {
	    var Bezier, Bezier_, yForX;
	    Bezier_ = function(t, p0, p1, p2, p3) {
	      return (Math.pow(1 - t, 3) * p0) + (3 * Math.pow(1 - t, 2) * t * p1) + (3 * (1 - t) * Math.pow(t, 2) * p2) + Math.pow(t, 3) * p3;
	    };
	    Bezier = function(t, p0, p1, p2, p3) {
	      return {
	        x: Bezier_(t, p0.x, p1.x, p2.x, p3.x),
	        y: Bezier_(t, p0.y, p1.y, p2.y, p3.y)
	      };
	    };
	    yForX = function(xTarget, Bs, returnsToSelf) {
	      var B, aB, i, lower, percent, upper, x, xTolerance, _i, _len;
	      B = null;
	      for (_i = 0, _len = Bs.length; _i < _len; _i++) {
	        aB = Bs[_i];
	        if (xTarget >= aB(0).x && xTarget <= aB(1).x) {
	          B = aB;
	        }
	        if (B !== null) {
	          break;
	        }
	      }
	      if (!B) {
	        if (returnsToSelf) {
	          return 0;
	        } else {
	          return 1;
	        }
	      }
	      xTolerance = 0.0001;
	      lower = 0;
	      upper = 1;
	      percent = (upper + lower) / 2;
	      x = B(percent).x;
	      i = 0;
	      while (Math.abs(xTarget - x) > xTolerance && i < 100) {
	        if (xTarget > x) {
	          lower = percent;
	        } else {
	          upper = percent;
	        }
	        percent = (upper + lower) / 2;
	        x = B(percent).x;
	        i += 1;
	      }
	      return B(percent).y;
	    };
	    return function(options) {
	      var Bs, points, returnsToSelf;
	      if (options == null) {
	        options = {};
	      }
	      points = options.points;
	      returnsToSelf = false;
	      Bs = (function() {
	        var i, k, _fn;
	        Bs = [];
	        _fn = function(pointA, pointB) {
	          var B2;
	          B2 = function(t) {
	            return Bezier(t, pointA, pointA.cp[pointA.cp.length - 1], pointB.cp[0], pointB);
	          };
	          return Bs.push(B2);
	        };
	        for (i in points) {
	          k = parseInt(i);
	          if (k >= points.length - 1) {
	            break;
	          }
	          _fn(points[k], points[k + 1]);
	        }
	        return Bs;
	      })();
	      return function(t) {
	        if (t === 0) {
	          return 0;
	        } else if (t === 1) {
	          return 1;
	        } else {
	          return yForX(t, Bs, returnsToSelf);
	        }
	      };
	    };
	  })();

	  dynamics.easeInOut = function(options) {
	    var friction, _ref;
	    if (options == null) {
	      options = {};
	    }
	    friction = (_ref = options.friction) != null ? _ref : arguments.callee.defaults.friction;
	    return dynamics.bezier({
	      points: [
	        {
	          x: 0,
	          y: 0,
	          cp: [
	            {
	              x: 0.92 - (friction / 1000),
	              y: 0
	            }
	          ]
	        }, {
	          x: 1,
	          y: 1,
	          cp: [
	            {
	              x: 0.08 + (friction / 1000),
	              y: 1
	            }
	          ]
	        }
	      ]
	    });
	  };

	  dynamics.easeIn = function(options) {
	    var friction, _ref;
	    if (options == null) {
	      options = {};
	    }
	    friction = (_ref = options.friction) != null ? _ref : arguments.callee.defaults.friction;
	    return dynamics.bezier({
	      points: [
	        {
	          x: 0,
	          y: 0,
	          cp: [
	            {
	              x: 0.92 - (friction / 1000),
	              y: 0
	            }
	          ]
	        }, {
	          x: 1,
	          y: 1,
	          cp: [
	            {
	              x: 1,
	              y: 1
	            }
	          ]
	        }
	      ]
	    });
	  };

	  dynamics.easeOut = function(options) {
	    var friction, _ref;
	    if (options == null) {
	      options = {};
	    }
	    friction = (_ref = options.friction) != null ? _ref : arguments.callee.defaults.friction;
	    return dynamics.bezier({
	      points: [
	        {
	          x: 0,
	          y: 0,
	          cp: [
	            {
	              x: 0,
	              y: 0
	            }
	          ]
	        }, {
	          x: 1,
	          y: 1,
	          cp: [
	            {
	              x: 0.08 + (friction / 1000),
	              y: 1
	            }
	          ]
	        }
	      ]
	    });
	  };

	  dynamics.spring.defaults = {
	    frequency: 300,
	    friction: 200,
	    anticipationSize: 0,
	    anticipationStrength: 0
	  };

	  dynamics.bounce.defaults = {
	    frequency: 300,
	    friction: 200
	  };

	  dynamics.forceWithGravity.defaults = dynamics.gravity.defaults = {
	    bounciness: 400,
	    elasticity: 200
	  };

	  dynamics.easeInOut.defaults = dynamics.easeIn.defaults = dynamics.easeOut.defaults = {
	    friction: 500
	  };

	  dynamics.css = makeArrayFn(function(el, properties) {
	    return applyProperties(el, properties, true);
	  });

	  dynamics.animate = makeArrayFn(function(el, properties, options) {
	    var id;
	    if (options == null) {
	      options = {};
	    }
	    options = clone(options);
	    applyDefaults(options, {
	      type: dynamics.easeInOut,
	      duration: 1000,
	      delay: 0,
	      animated: true
	    });
	    options.duration = Math.max(0, options.duration * slowRatio);
	    options.delay = Math.max(0, options.delay);
	    if (options.delay === 0) {
	      return startAnimation(el, properties, options);
	    } else {
	      id = dynamics.setTimeout(function() {
	        return startAnimation(el, properties, options, id);
	      }, options.delay);
	      return animationsTimeouts.push({
	        id: id,
	        el: el
	      });
	    }
	  });

	  dynamics.stop = makeArrayFn(function(el, options) {
	    if (options == null) {
	      options = {};
	    }
	    if (options.timeout == null) {
	      options.timeout = true;
	    }
	    if (options.timeout) {
	      animationsTimeouts = animationsTimeouts.filter(function(timeout) {
	        if (timeout.el === el && ((options.filter == null) || options.filter(timeout))) {
	          dynamics.clearTimeout(timeout.id);
	          return false;
	        }
	        return true;
	      });
	    }
	    return animations = animations.filter(function(animation) {
	      return animation.el !== el;
	    });
	  });

	  dynamics.setTimeout = function(fn, delay) {
	    return addTimeout(fn, delay * slowRatio);
	  };

	  dynamics.clearTimeout = function(id) {
	    return cancelTimeout(id);
	  };

	  dynamics.toggleSlow = function() {
	    slow = !slow;
	    if (slow) {
	      slowRatio = 3;
	    } else {
	      slowRatio = 1;
	    }
	    return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log("dynamics.js: slow animations " + (slow ? "enabled" : "disabled")) : void 0 : void 0;
	  };

	  if (typeof module === "object" && typeof module.exports === "object") {
	    module.exports = dynamics;
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return dynamics;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    window.dynamics = dynamics;
	  }

	}).call(this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports, __webpack_require__(4)) :
	  typeof define === 'function' && define.amd ? define(['exports', 'd3-color'], factory) :
	  (factory((global.d3_interpolate = global.d3_interpolate || {}),global.d3_color));
	}(this, function (exports,d3Color) { 'use strict';

	  function constant(x) {
	    return function() {
	      return x;
	    };
	  }

	  function linear(a, d) {
	    return function(t) {
	      return a + t * d;
	    };
	  }

	  function exponential(a, b, y) {
	    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	      return Math.pow(a + t * b, y);
	    };
	  }

	  function interpolateHue(a, b) {
	    var d = b - a;
	    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	  }

	  function gamma(y) {
	    return (y = +y) === 1 ? nogamma : function(a, b) {
	      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	    };
	  }

	  function nogamma(a, b) {
	    var d = b - a;
	    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	  }

	  var rgb$1 = (function gamma$$(y) {
	    var interpolateColor = gamma(y);

	    function interpolateRgb(start, end) {
	      var r = interpolateColor((start = d3Color.rgb(start)).r, (end = d3Color.rgb(end)).r),
	          g = interpolateColor(start.g, end.g),
	          b = interpolateColor(start.b, end.b),
	          opacity = interpolateColor(start.opacity, end.opacity);
	      return function(t) {
	        start.r = r(t);
	        start.g = g(t);
	        start.b = b(t);
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    interpolateRgb.gamma = gamma$$;

	    return interpolateRgb;
	  })(1);

	  // TODO sparse arrays?
	  function array(a, b) {
	    var x = [],
	        c = [],
	        na = a ? a.length : 0,
	        nb = b ? b.length : 0,
	        n0 = Math.min(na, nb),
	        i;

	    for (i = 0; i < n0; ++i) x.push(value(a[i], b[i]));
	    for (; i < na; ++i) c[i] = a[i];
	    for (; i < nb; ++i) c[i] = b[i];

	    return function(t) {
	      for (i = 0; i < n0; ++i) c[i] = x[i](t);
	      return c;
	    };
	  }

	  function number(a, b) {
	    return a = +a, b -= a, function(t) {
	      return a + b * t;
	    };
	  }

	  function object(a, b) {
	    var i = {},
	        c = {},
	        k;

	    if (a === null || typeof a !== "object") a = {};
	    if (b === null || typeof b !== "object") b = {};

	    for (k in a) {
	      if (k in b) {
	        i[k] = value(a[k], b[k]);
	      } else {
	        c[k] = a[k];
	      }
	    }

	    for (k in b) {
	      if (!(k in a)) {
	        c[k] = b[k];
	      }
	    }

	    return function(t) {
	      for (k in i) c[k] = i[k](t);
	      return c;
	    };
	  }

	  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	  var reB = new RegExp(reA.source, "g");
	  function zero(b) {
	    return function() {
	      return b;
	    };
	  }

	  function one(b) {
	    return function(t) {
	      return b(t) + "";
	    };
	  }

	  function string(a, b) {
	    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	        am, // current match in a
	        bm, // current match in b
	        bs, // string preceding current number in b, if any
	        i = -1, // index in s
	        s = [], // string constants and placeholders
	        q = []; // number interpolators

	    // Coerce inputs to strings.
	    a = a + "", b = b + "";

	    // Interpolate pairs of numbers in a & b.
	    while ((am = reA.exec(a))
	        && (bm = reB.exec(b))) {
	      if ((bs = bm.index) > bi) { // a string precedes the next number in b
	        bs = b.slice(bi, bs);
	        if (s[i]) s[i] += bs; // coalesce with previous string
	        else s[++i] = bs;
	      }
	      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	        if (s[i]) s[i] += bm; // coalesce with previous string
	        else s[++i] = bm;
	      } else { // interpolate non-matching numbers
	        s[++i] = null;
	        q.push({i: i, x: number(am, bm)});
	      }
	      bi = reB.lastIndex;
	    }

	    // Add remains of b.
	    if (bi < b.length) {
	      bs = b.slice(bi);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }

	    // Special optimization for only a single match.
	    // Otherwise, interpolate each of the numbers and rejoin the string.
	    return s.length < 2 ? (q[0]
	        ? one(q[0].x)
	        : zero(b))
	        : (b = q.length, function(t) {
	            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	            return s.join("");
	          });
	  }

	  var values = [
	    function(a, b) {
	      var t = typeof b, c;
	      return (t === "string" ? ((c = d3Color.color(b)) ? (b = c, rgb$1) : string)
	          : b instanceof d3Color.color ? rgb$1
	          : Array.isArray(b) ? array
	          : t === "object" && isNaN(b) ? object
	          : number)(a, b);
	    }
	  ];

	  function value(a, b) {
	    var i = values.length, f;
	    while (--i >= 0 && !(f = values[i](a, b)));
	    return f;
	  }

	  function round(a, b) {
	    return a = +a, b -= a, function(t) {
	      return Math.round(a + b * t);
	    };
	  }

	  var rad2deg = 180 / Math.PI;

	  var identity = {
	    translateX: 0,
	    translateY: 0,
	    rotate: 0,
	    skewX: 0,
	    scaleX: 1,
	    scaleY: 1
	  };

	  function decompose(a, b, c, d, e, f) {
	    if (a * d === b * c) return null;

	    var scaleX = Math.sqrt(a * a + b * b);
	    a /= scaleX, b /= scaleX;

	    var skewX = a * c + b * d;
	    c -= a * skewX, d -= b * skewX;

	    var scaleY = Math.sqrt(c * c + d * d);
	    c /= scaleY, d /= scaleY, skewX /= scaleY;

	    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;

	    return {
	      translateX: e,
	      translateY: f,
	      rotate: Math.atan2(b, a) * rad2deg,
	      skewX: Math.atan(skewX) * rad2deg,
	      scaleX: scaleX,
	      scaleY: scaleY
	    };
	  }

	  var cssNode;
	  var cssRoot;
	  var cssView;
	  var svgNode;
	  function parseCss(value) {
	    if (value === "none") return identity;
	    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
	    cssNode.style.transform = value;
	    cssRoot.appendChild(cssNode);
	    value = cssView.getComputedStyle(cssNode, null).getPropertyValue("transform");
	    cssRoot.removeChild(cssNode);
	    var m = value.slice(7, -1).split(",");
	    return decompose(+m[0], +m[1], +m[2], +m[3], +m[4], +m[5]);
	  }

	  function parseSvg(value) {
	    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	    svgNode.setAttribute("transform", value == null ? "" : value);
	    var m = svgNode.transform.baseVal.consolidate().matrix;
	    return decompose(m.a, m.b, m.c, m.d, m.e, m.f);
	  }

	  function interpolateTransform(parse, pxComma, pxParen, degParen) {

	    function pop(s) {
	      return s.length ? s.pop() + " " : "";
	    }

	    function translate(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push("translate(", null, pxComma, null, pxParen);
	        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	      } else if (xb || yb) {
	        s.push("translate(" + xb + pxComma + yb + pxParen);
	      }
	    }

	    function rotate(a, b, s, q) {
	      if (a !== b) {
	        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
	      } else if (b) {
	        s.push(pop(s) + "rotate(" + b + degParen);
	      }
	    }

	    function skewX(a, b, s, q) {
	      if (a !== b) {
	        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
	      } else if (b) {
	        s.push(pop(s) + "skewX(" + b + degParen);
	      }
	    }

	    function scale(xa, ya, xb, yb, s, q) {
	      if (xa !== xb || ya !== yb) {
	        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	        q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
	      } else if (xb !== 1 || yb !== 1) {
	        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	      }
	    }

	    return function(a, b) {
	      var s = [], // string constants and placeholders
	          q = []; // number interpolators
	      a = parse(a), b = parse(b);
	      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	      rotate(a.rotate, b.rotate, s, q);
	      skewX(a.skewX, b.skewX, s, q);
	      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	      a = b = null; // gc
	      return function(t) {
	        var i = -1, n = q.length, o;
	        while (++i < n) s[(o = q[i]).i] = o.x(t);
	        return s.join("");
	      };
	    };
	  }

	  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	  var rho = Math.SQRT2;
	  var rho2 = 2;
	  var rho4 = 4;
	  var epsilon2 = 1e-12;
	  function cosh(x) {
	    return ((x = Math.exp(x)) + 1 / x) / 2;
	  }

	  function sinh(x) {
	    return ((x = Math.exp(x)) - 1 / x) / 2;
	  }

	  function tanh(x) {
	    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	  }

	  // p0 = [ux0, uy0, w0]
	  // p1 = [ux1, uy1, w1]
	  function zoom(p0, p1) {
	    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	        dx = ux1 - ux0,
	        dy = uy1 - uy0,
	        d2 = dx * dx + dy * dy,
	        i,
	        S;

	    // Special case for u0 ≅ u1.
	    if (d2 < epsilon2) {
	      S = Math.log(w1 / w0) / rho;
	      i = function(t) {
	        return [
	          ux0 + t * dx,
	          uy0 + t * dy,
	          w0 * Math.exp(rho * t * S)
	        ];
	      }
	    }

	    // General case.
	    else {
	      var d1 = Math.sqrt(d2),
	          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	      S = (r1 - r0) / rho;
	      i = function(t) {
	        var s = t * S,
	            coshr0 = cosh(r0),
	            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	        return [
	          ux0 + u * dx,
	          uy0 + u * dy,
	          w0 * coshr0 / cosh(rho * s + r0)
	        ];
	      }
	    }

	    i.duration = S * 1000;

	    return i;
	  }

	  function interpolateHsl(start, end) {
	    var h = interpolateHue((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  function interpolateHslLong(start, end) {
	    var h = nogamma((start = d3Color.hsl(start)).h, (end = d3Color.hsl(end)).h),
	        s = nogamma(start.s, end.s),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  function interpolateLab(start, end) {
	    var l = nogamma((start = d3Color.lab(start)).l, (end = d3Color.lab(end)).l),
	        a = nogamma(start.a, end.a),
	        b = nogamma(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.l = l(t);
	      start.a = a(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  function interpolateHcl(start, end) {
	    var h = interpolateHue((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  function interpolateHclLong(start, end) {
	    var h = nogamma((start = d3Color.hcl(start)).h, (end = d3Color.hcl(end)).h),
	        c = nogamma(start.c, end.c),
	        l = nogamma(start.l, end.l),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.c = c(t);
	      start.l = l(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  var cubehelix$1 = (function gamma(y) {
	    y = +y;

	    function interpolateCubehelix(start, end) {
	      var h = interpolateHue((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    interpolateCubehelix.gamma = gamma;

	    return interpolateCubehelix;
	  })(1);

	  var cubehelixLong = (function gamma(y) {
	    y = +y;

	    function interpolateCubehelixLong(start, end) {
	      var h = nogamma((start = d3Color.cubehelix(start)).h, (end = d3Color.cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    interpolateCubehelixLong.gamma = gamma;

	    return interpolateCubehelixLong;
	  })(1);

	  var version = "0.6.0";

	  exports.version = version;
	  exports.interpolate = value;
	  exports.interpolators = values;
	  exports.interpolateArray = array;
	  exports.interpolateNumber = number;
	  exports.interpolateObject = object;
	  exports.interpolateRound = round;
	  exports.interpolateString = string;
	  exports.interpolateTransformCss = interpolateTransformCss;
	  exports.interpolateTransformSvg = interpolateTransformSvg;
	  exports.interpolateZoom = zoom;
	  exports.interpolateRgb = rgb$1;
	  exports.interpolateHsl = interpolateHsl;
	  exports.interpolateHslLong = interpolateHslLong;
	  exports.interpolateLab = interpolateLab;
	  exports.interpolateHcl = interpolateHcl;
	  exports.interpolateHclLong = interpolateHclLong;
	  exports.interpolateCubehelix = cubehelix$1;
	  exports.interpolateCubehelixLong = cubehelixLong;

	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_color = global.d3_color || {})));
	}(this, function (exports) { 'use strict';

	  function define(constructor, factory, prototype) {
	    constructor.prototype = factory.prototype = prototype;
	    prototype.constructor = constructor;
	  }

	  function extend(parent, definition) {
	    var prototype = Object.create(parent.prototype);
	    for (var key in definition) prototype[key] = definition[key];
	    return prototype;
	  }

	  function Color() {}

	  var darker = 0.7;
	  var brighter = 1 / darker;

	  var reHex3 = /^#([0-9a-f]{3})$/;
	  var reHex6 = /^#([0-9a-f]{6})$/;
	  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	  var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	  var named = {
	    aliceblue: 0xf0f8ff,
	    antiquewhite: 0xfaebd7,
	    aqua: 0x00ffff,
	    aquamarine: 0x7fffd4,
	    azure: 0xf0ffff,
	    beige: 0xf5f5dc,
	    bisque: 0xffe4c4,
	    black: 0x000000,
	    blanchedalmond: 0xffebcd,
	    blue: 0x0000ff,
	    blueviolet: 0x8a2be2,
	    brown: 0xa52a2a,
	    burlywood: 0xdeb887,
	    cadetblue: 0x5f9ea0,
	    chartreuse: 0x7fff00,
	    chocolate: 0xd2691e,
	    coral: 0xff7f50,
	    cornflowerblue: 0x6495ed,
	    cornsilk: 0xfff8dc,
	    crimson: 0xdc143c,
	    cyan: 0x00ffff,
	    darkblue: 0x00008b,
	    darkcyan: 0x008b8b,
	    darkgoldenrod: 0xb8860b,
	    darkgray: 0xa9a9a9,
	    darkgreen: 0x006400,
	    darkgrey: 0xa9a9a9,
	    darkkhaki: 0xbdb76b,
	    darkmagenta: 0x8b008b,
	    darkolivegreen: 0x556b2f,
	    darkorange: 0xff8c00,
	    darkorchid: 0x9932cc,
	    darkred: 0x8b0000,
	    darksalmon: 0xe9967a,
	    darkseagreen: 0x8fbc8f,
	    darkslateblue: 0x483d8b,
	    darkslategray: 0x2f4f4f,
	    darkslategrey: 0x2f4f4f,
	    darkturquoise: 0x00ced1,
	    darkviolet: 0x9400d3,
	    deeppink: 0xff1493,
	    deepskyblue: 0x00bfff,
	    dimgray: 0x696969,
	    dimgrey: 0x696969,
	    dodgerblue: 0x1e90ff,
	    firebrick: 0xb22222,
	    floralwhite: 0xfffaf0,
	    forestgreen: 0x228b22,
	    fuchsia: 0xff00ff,
	    gainsboro: 0xdcdcdc,
	    ghostwhite: 0xf8f8ff,
	    gold: 0xffd700,
	    goldenrod: 0xdaa520,
	    gray: 0x808080,
	    green: 0x008000,
	    greenyellow: 0xadff2f,
	    grey: 0x808080,
	    honeydew: 0xf0fff0,
	    hotpink: 0xff69b4,
	    indianred: 0xcd5c5c,
	    indigo: 0x4b0082,
	    ivory: 0xfffff0,
	    khaki: 0xf0e68c,
	    lavender: 0xe6e6fa,
	    lavenderblush: 0xfff0f5,
	    lawngreen: 0x7cfc00,
	    lemonchiffon: 0xfffacd,
	    lightblue: 0xadd8e6,
	    lightcoral: 0xf08080,
	    lightcyan: 0xe0ffff,
	    lightgoldenrodyellow: 0xfafad2,
	    lightgray: 0xd3d3d3,
	    lightgreen: 0x90ee90,
	    lightgrey: 0xd3d3d3,
	    lightpink: 0xffb6c1,
	    lightsalmon: 0xffa07a,
	    lightseagreen: 0x20b2aa,
	    lightskyblue: 0x87cefa,
	    lightslategray: 0x778899,
	    lightslategrey: 0x778899,
	    lightsteelblue: 0xb0c4de,
	    lightyellow: 0xffffe0,
	    lime: 0x00ff00,
	    limegreen: 0x32cd32,
	    linen: 0xfaf0e6,
	    magenta: 0xff00ff,
	    maroon: 0x800000,
	    mediumaquamarine: 0x66cdaa,
	    mediumblue: 0x0000cd,
	    mediumorchid: 0xba55d3,
	    mediumpurple: 0x9370db,
	    mediumseagreen: 0x3cb371,
	    mediumslateblue: 0x7b68ee,
	    mediumspringgreen: 0x00fa9a,
	    mediumturquoise: 0x48d1cc,
	    mediumvioletred: 0xc71585,
	    midnightblue: 0x191970,
	    mintcream: 0xf5fffa,
	    mistyrose: 0xffe4e1,
	    moccasin: 0xffe4b5,
	    navajowhite: 0xffdead,
	    navy: 0x000080,
	    oldlace: 0xfdf5e6,
	    olive: 0x808000,
	    olivedrab: 0x6b8e23,
	    orange: 0xffa500,
	    orangered: 0xff4500,
	    orchid: 0xda70d6,
	    palegoldenrod: 0xeee8aa,
	    palegreen: 0x98fb98,
	    paleturquoise: 0xafeeee,
	    palevioletred: 0xdb7093,
	    papayawhip: 0xffefd5,
	    peachpuff: 0xffdab9,
	    peru: 0xcd853f,
	    pink: 0xffc0cb,
	    plum: 0xdda0dd,
	    powderblue: 0xb0e0e6,
	    purple: 0x800080,
	    rebeccapurple: 0x663399,
	    red: 0xff0000,
	    rosybrown: 0xbc8f8f,
	    royalblue: 0x4169e1,
	    saddlebrown: 0x8b4513,
	    salmon: 0xfa8072,
	    sandybrown: 0xf4a460,
	    seagreen: 0x2e8b57,
	    seashell: 0xfff5ee,
	    sienna: 0xa0522d,
	    silver: 0xc0c0c0,
	    skyblue: 0x87ceeb,
	    slateblue: 0x6a5acd,
	    slategray: 0x708090,
	    slategrey: 0x708090,
	    snow: 0xfffafa,
	    springgreen: 0x00ff7f,
	    steelblue: 0x4682b4,
	    tan: 0xd2b48c,
	    teal: 0x008080,
	    thistle: 0xd8bfd8,
	    tomato: 0xff6347,
	    turquoise: 0x40e0d0,
	    violet: 0xee82ee,
	    wheat: 0xf5deb3,
	    white: 0xffffff,
	    whitesmoke: 0xf5f5f5,
	    yellow: 0xffff00,
	    yellowgreen: 0x9acd32
	  };

	  define(Color, color, {
	    displayable: function() {
	      return this.rgb().displayable();
	    },
	    toString: function() {
	      return this.rgb() + "";
	    }
	  });

	  function color(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
	        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	        : named.hasOwnProperty(format) ? rgbn(named[format])
	        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	        : null;
	  }

	  function rgbn(n) {
	    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	  }

	  function rgba(r, g, b, a) {
	    if (a <= 0) r = g = b = NaN;
	    return new Rgb(r, g, b, a);
	  }

	  function rgbConvert(o) {
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Rgb;
	    o = o.rgb();
	    return new Rgb(o.r, o.g, o.b, o.opacity);
	  }

	  function rgb(r, g, b, opacity) {
	    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	  }

	  function Rgb(r, g, b, opacity) {
	    this.r = +r;
	    this.g = +g;
	    this.b = +b;
	    this.opacity = +opacity;
	  }

	  define(Rgb, rgb, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	    },
	    rgb: function() {
	      return this;
	    },
	    displayable: function() {
	      return (0 <= this.r && this.r <= 255)
	          && (0 <= this.g && this.g <= 255)
	          && (0 <= this.b && this.b <= 255)
	          && (0 <= this.opacity && this.opacity <= 1);
	    },
	    toString: function() {
	      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	      return (a === 1 ? "rgb(" : "rgba(")
	          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	          + (a === 1 ? ")" : ", " + a + ")");
	    }
	  }));

	  function hsla(h, s, l, a) {
	    if (a <= 0) h = s = l = NaN;
	    else if (l <= 0 || l >= 1) h = s = NaN;
	    else if (s <= 0) h = NaN;
	    return new Hsl(h, s, l, a);
	  }

	  function hslConvert(o) {
	    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Color)) o = color(o);
	    if (!o) return new Hsl;
	    if (o instanceof Hsl) return o;
	    o = o.rgb();
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        min = Math.min(r, g, b),
	        max = Math.max(r, g, b),
	        h = NaN,
	        s = max - min,
	        l = (max + min) / 2;
	    if (s) {
	      if (r === max) h = (g - b) / s + (g < b) * 6;
	      else if (g === max) h = (b - r) / s + 2;
	      else h = (r - g) / s + 4;
	      s /= l < 0.5 ? max + min : 2 - max - min;
	      h *= 60;
	    } else {
	      s = l > 0 && l < 1 ? 0 : h;
	    }
	    return new Hsl(h, s, l, o.opacity);
	  }

	  function hsl(h, s, l, opacity) {
	    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	  }

	  function Hsl(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Hsl, hsl, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Hsl(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function() {
	      var h = this.h % 360 + (this.h < 0) * 360,
	          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	          l = this.l,
	          m2 = l + (l < 0.5 ? l : 1 - l) * s,
	          m1 = 2 * l - m2;
	      return new Rgb(
	        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	        hsl2rgb(h, m1, m2),
	        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	        this.opacity
	      );
	    },
	    displayable: function() {
	      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	          && (0 <= this.l && this.l <= 1)
	          && (0 <= this.opacity && this.opacity <= 1);
	    }
	  }));

	  /* From FvD 13.37, CSS Color Module Level 3 */
	  function hsl2rgb(h, m1, m2) {
	    return (h < 60 ? m1 + (m2 - m1) * h / 60
	        : h < 180 ? m2
	        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	        : m1) * 255;
	  }

	  var deg2rad = Math.PI / 180;
	  var rad2deg = 180 / Math.PI;

	  var Kn = 18;
	  var Xn = 0.950470;
	  var Yn = 1;
	  var Zn = 1.088830;
	  var t0 = 4 / 29;
	  var t1 = 6 / 29;
	  var t2 = 3 * t1 * t1;
	  var t3 = t1 * t1 * t1;
	  function labConvert(o) {
	    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	    if (o instanceof Hcl) {
	      var h = o.h * deg2rad;
	      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	    }
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var b = rgb2xyz(o.r),
	        a = rgb2xyz(o.g),
	        l = rgb2xyz(o.b),
	        x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
	        y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
	        z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
	    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	  }

	  function lab(l, a, b, opacity) {
	    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	  }

	  function Lab(l, a, b, opacity) {
	    this.l = +l;
	    this.a = +a;
	    this.b = +b;
	    this.opacity = +opacity;
	  }

	  define(Lab, lab, extend(Color, {
	    brighter: function(k) {
	      return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    darker: function(k) {
	      return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
	    },
	    rgb: function() {
	      var y = (this.l + 16) / 116,
	          x = isNaN(this.a) ? y : y + this.a / 500,
	          z = isNaN(this.b) ? y : y - this.b / 200;
	      y = Yn * lab2xyz(y);
	      x = Xn * lab2xyz(x);
	      z = Zn * lab2xyz(z);
	      return new Rgb(
	        xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	        xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	        xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
	        this.opacity
	      );
	    }
	  }));

	  function xyz2lab(t) {
	    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	  }

	  function lab2xyz(t) {
	    return t > t1 ? t * t * t : t2 * (t - t0);
	  }

	  function xyz2rgb(x) {
	    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	  }

	  function rgb2xyz(x) {
	    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	  }

	  function hclConvert(o) {
	    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	    if (!(o instanceof Lab)) o = labConvert(o);
	    var h = Math.atan2(o.b, o.a) * rad2deg;
	    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	  }

	  function hcl(h, c, l, opacity) {
	    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	  }

	  function Hcl(h, c, l, opacity) {
	    this.h = +h;
	    this.c = +c;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Hcl, hcl, extend(Color, {
	    brighter: function(k) {
	      return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
	    },
	    darker: function(k) {
	      return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
	    },
	    rgb: function() {
	      return labConvert(this).rgb();
	    }
	  }));

	  var A = -0.14861;
	  var B = +1.78277;
	  var C = -0.29227;
	  var D = -0.90649;
	  var E = +1.97294;
	  var ED = E * D;
	  var EB = E * B;
	  var BC_DA = B * C - D * A;
	  function cubehelixConvert(o) {
	    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	    if (!(o instanceof Rgb)) o = rgbConvert(o);
	    var r = o.r / 255,
	        g = o.g / 255,
	        b = o.b / 255,
	        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	        bl = b - l,
	        k = (E * (g - l) - C * bl) / D,
	        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	  }

	  function cubehelix(h, s, l, opacity) {
	    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	  }

	  function Cubehelix(h, s, l, opacity) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	    this.opacity = +opacity;
	  }

	  define(Cubehelix, cubehelix, extend(Color, {
	    brighter: function(k) {
	      k = k == null ? brighter : Math.pow(brighter, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    darker: function(k) {
	      k = k == null ? darker : Math.pow(darker, k);
	      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	    },
	    rgb: function() {
	      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	          l = +this.l,
	          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	          cosh = Math.cos(h),
	          sinh = Math.sin(h);
	      return new Rgb(
	        255 * (l + a * (A * cosh + B * sinh)),
	        255 * (l + a * (C * cosh + D * sinh)),
	        255 * (l + a * (E * cosh)),
	        this.opacity
	      );
	    }
	  }));

	  var version = "0.4.2";

	  exports.version = version;
	  exports.color = color;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.cubehelix = cubehelix;

	}));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(10);

	var ReactChildren = __webpack_require__(11);
	var ReactComponent = __webpack_require__(21);
	var ReactClass = __webpack_require__(27);
	var ReactDOMFactories = __webpack_require__(32);
	var ReactElement = __webpack_require__(14);
	var ReactElementValidator = __webpack_require__(33);
	var ReactPropTypes = __webpack_require__(35);
	var ReactVersion = __webpack_require__(36);

	var onlyChild = __webpack_require__(37);
	var warning = __webpack_require__(16);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(12);
	var ReactElement = __webpack_require__(14);

	var emptyFunction = __webpack_require__(17);
	var traverseAllChildren = __webpack_require__(19);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var invariant = __webpack_require__(13);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(10);

	var ReactCurrentOwner = __webpack_require__(15);

	var warning = __webpack_require__(16);
	var canDefineProperty = __webpack_require__(18);

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
	      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
	    } else {
	      ref = config.ref === undefined ? null : config.ref;
	      key = config.key === undefined ? null : '' + config.key;
	    }
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // Create dummy `key` and `ref` property to `props` to warn users
	    // against its use
	    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	      if (!props.hasOwnProperty('key')) {
	        Object.defineProperty(props, 'key', {
	          get: function () {
	            if (!specialPropKeyWarningShown) {
	              specialPropKeyWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	      if (!props.hasOwnProperty('ref')) {
	        Object.defineProperty(props, 'ref', {
	          get: function () {
	            if (!specialPropRefWarningShown) {
	              specialPropRefWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(17);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(15);
	var ReactElement = __webpack_require__(14);

	var getIteratorFn = __webpack_require__(20);
	var invariant = __webpack_require__(13);
	var warning = __webpack_require__(16);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var userProvidedKeyEscaperLookup = {
	  '=': '=0',
	  ':': '=2'
	};

	var userProvidedKeyEscapeRegex = /[=:]/g;

	var didWarnAboutMaps = false;

	function userProvidedKeyEscaper(match) {
	  return userProvidedKeyEscaperLookup[match];
	}

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return wrapUserProvidedKey(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * Escape a component key so that it is safe to use in a reactid.
	 *
	 * @param {*} text Component key to be escaped.
	 * @return {string} An escaped string.
	 */
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
	}

	/**
	 * Wrap a `key` value explicitly provided by the user to distinguish it from
	 * implicitly-generated keys generated by a component's index in its parent.
	 *
	 * @param {string} key Value of a user-provided `key` attribute
	 * @return {string}
	 */
	function wrapUserProvidedKey(key) {
	  return '$' + escapeUserProvidedKey(key);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var ReactNoopUpdateQueue = __webpack_require__(22);
	var ReactInstrumentation = __webpack_require__(23);

	var canDefineProperty = __webpack_require__(18);
	var emptyObject = __webpack_require__(26);
	var invariant = __webpack_require__(13);
	var warning = __webpack_require__(16);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onSetState();
	    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	  }
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(16);

	function warnTDZ(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnTDZ(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnTDZ(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnTDZ(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstrumentation
	 */

	'use strict';

	var ReactDebugTool = __webpack_require__(24);

	module.exports = { debugTool: ReactDebugTool };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDebugTool
	 */

	'use strict';

	var ReactInvalidSetStateWarningDevTool = __webpack_require__(25);
	var warning = __webpack_require__(16);

	var eventHandlers = [];
	var handlerDoesThrowForEvent = {};

	function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
	  if (process.env.NODE_ENV !== 'production') {
	    eventHandlers.forEach(function (handler) {
	      try {
	        if (handler[handlerFunctionName]) {
	          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
	        }
	      } catch (e) {
	        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
	        handlerDoesThrowForEvent[handlerFunctionName] = true;
	      }
	    });
	  }
	}

	var ReactDebugTool = {
	  addDevtool: function (devtool) {
	    eventHandlers.push(devtool);
	  },
	  removeDevtool: function (devtool) {
	    for (var i = 0; i < eventHandlers.length; i++) {
	      if (eventHandlers[i] === devtool) {
	        eventHandlers.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onMountRootComponent: function (internalInstance) {
	    emitEvent('onMountRootComponent', internalInstance);
	  },
	  onMountComponent: function (internalInstance) {
	    emitEvent('onMountComponent', internalInstance);
	  },
	  onUpdateComponent: function (internalInstance) {
	    emitEvent('onUpdateComponent', internalInstance);
	  },
	  onUnmountComponent: function (internalInstance) {
	    emitEvent('onUnmountComponent', internalInstance);
	  }
	};

	ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);

	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInvalidSetStateWarningDevTool
	 */

	'use strict';

	var warning = __webpack_require__(16);

	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;

	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}

	var ReactInvalidSetStateWarningDevTool = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};

	module.exports = ReactInvalidSetStateWarningDevTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var _assign = __webpack_require__(10);

	var ReactComponent = __webpack_require__(21);
	var ReactElement = __webpack_require__(14);
	var ReactPropTypeLocations = __webpack_require__(28);
	var ReactPropTypeLocationNames = __webpack_require__(30);
	var ReactNoopUpdateQueue = __webpack_require__(22);

	var emptyObject = __webpack_require__(26);
	var invariant = __webpack_require__(13);
	var keyMirror = __webpack_require__(29);
	var keyOf = __webpack_require__(31);
	var warning = __webpack_require__(16);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(29);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(13);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function (obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(14);
	var ReactElementValidator = __webpack_require__(33);

	var mapObject = __webpack_require__(34);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hgroup: 'hgroup',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  image: 'image',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactElement = __webpack_require__(14);
	var ReactPropTypeLocations = __webpack_require__(28);
	var ReactPropTypeLocationNames = __webpack_require__(30);
	var ReactCurrentOwner = __webpack_require__(15);

	var canDefineProperty = __webpack_require__(18);
	var getIteratorFn = __webpack_require__(20);
	var invariant = __webpack_require__(13);
	var warning = __webpack_require__(16);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	var loggedTypeFailures = {};

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
	  if (addenda === null) {
	    // we already showed the warning
	    return;
	  }
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} messageType A key used for de-duping warnings.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 * @returns {?object} A set of addenda to use in the warning message, or null
	 * if the warning has already been shown before (and shouldn't be shown again).
	 */
	function getAddendaForKeyUse(messageType, element, parentType) {
	  var addendum = getDeclarationErrorAddendum();
	  if (!addendum) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      addendum = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }

	  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
	  if (memoizer[addendum]) {
	    return null;
	  }
	  memoizer[addendum] = true;

	  var addenda = {
	    parentOrOwner: addendum,
	    url: ' See https://fb.me/react-warning-keys for more information.',
	    childOwner: null
	  };

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  return addenda;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var addendum = getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(14);
	var ReactPropTypeLocationNames = __webpack_require__(30);

	var emptyFunction = __webpack_require__(17);
	var getIteratorFn = __webpack_require__(20);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;

/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.0.1';

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var ReactElement = __webpack_require__(14);

	var invariant = __webpack_require__(13);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection. The current implementation of this
	 * function assumes that a single child gets passed without a wrapper, but the
	 * purpose of this helper function is to abstract away the particular structure
	 * of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactComponent} The first and only `ReactComponent` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"handle":"react-ios-switch-Switch-handle","input":"react-ios-switch-Switch-input","offState":"react-ios-switch-Switch-offState","switch":"react-ios-switch-Switch-switch","switch--disabled":"react-ios-switch-Switch-switch--disabled"};

/***/ }
/******/ ])
});
;