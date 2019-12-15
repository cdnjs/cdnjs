(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Slider"] = factory(require("react"), require("react-dom"));
	else
		root["Slider"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _slider = __webpack_require__(1);

	var _slider2 = _interopRequireDefault(_slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slider2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _innerSlider = __webpack_require__(3);

	var _json2mq = __webpack_require__(20);

	var _json2mq2 = _interopRequireDefault(_json2mq);

	var _defaultProps = __webpack_require__(6);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	var _canUseDom = __webpack_require__(22);

	var _canUseDom2 = _interopRequireDefault(_canUseDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var enquire = _canUseDom2.default && __webpack_require__(23);

	var Slider = function (_React$Component) {
	  _inherits(Slider, _React$Component);

	  function Slider(props) {
	    _classCallCheck(this, Slider);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.innerSliderRefHandler = function (ref) {
	      return _this.innerSlider = ref;
	    };

	    _this.slickPrev = function () {
	      return _this.innerSlider.slickPrev();
	    };

	    _this.slickNext = function () {
	      return _this.innerSlider.slickNext();
	    };

	    _this.slickGoTo = function (slide) {
	      return _this.innerSlider.slickGoTo(slide);
	    };

	    _this.slickPause = function () {
	      return _this.innerSlider.pause('paused');
	    };

	    _this.slickPlay = function () {
	      return _this.innerSlider.autoPlay('play');
	    };

	    _this.state = {
	      breakpoint: null
	    };
	    _this._responsiveMediaHandlers = [];
	    return _this;
	  }

	  Slider.prototype.media = function media(query, handler) {
	    // javascript handler for  css media query
	    enquire.register(query, handler);
	    this._responsiveMediaHandlers.push({ query: query, handler: handler });
	  };

	  // handles responsive breakpoints


	  Slider.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    if (this.props.responsive) {
	      var breakpoints = this.props.responsive.map(function (breakpt) {
	        return breakpt.breakpoint;
	      });
	      // sort them in increasing order of their numerical value
	      breakpoints.sort(function (x, y) {
	        return x - y;
	      });

	      breakpoints.forEach(function (breakpoint, index) {
	        // media query for each breakpoint
	        var bQuery = void 0;
	        if (index === 0) {
	          bQuery = (0, _json2mq2.default)({ minWidth: 0, maxWidth: breakpoint });
	        } else {
	          bQuery = (0, _json2mq2.default)({ minWidth: breakpoints[index - 1] + 1, maxWidth: breakpoint });
	        }
	        // when not using server side rendering
	        _canUseDom2.default && _this2.media(bQuery, function () {
	          _this2.setState({ breakpoint: breakpoint });
	        });
	      });

	      // Register media query for full screen. Need to support resize from small to large
	      // convert javascript object to media query string
	      var query = (0, _json2mq2.default)({ minWidth: breakpoints.slice(-1)[0] });

	      _canUseDom2.default && this.media(query, function () {
	        _this2.setState({ breakpoint: null });
	      });
	    }
	  };

	  Slider.prototype.componentWillUnmount = function componentWillUnmount() {
	    this._responsiveMediaHandlers.forEach(function (obj) {
	      enquire.unregister(obj.query, obj.handler);
	    });
	  };

	  Slider.prototype.render = function render() {
	    var _this3 = this;

	    var settings;
	    var newProps;
	    if (this.state.breakpoint) {
	      newProps = this.props.responsive.filter(function (resp) {
	        return resp.breakpoint === _this3.state.breakpoint;
	      });
	      settings = newProps[0].settings === 'unslick' ? 'unslick' : _extends({}, _defaultProps2.default, this.props, newProps[0].settings);
	    } else {
	      settings = _extends({}, _defaultProps2.default, this.props);
	    }

	    // force scrolling by one if centerMode is on
	    if (settings.centerMode) {
	      if (settings.slidesToScroll > 1 && ("development") !== 'production') {
	        console.warn('slidesToScroll should be equal to 1 in centerMode, you are using ' + settings.slidesToScroll);
	      }
	      settings.slidesToScroll = 1;
	    }
	    // force showing one slide and scrolling by one if the fade mode is on
	    if (settings.fade) {
	      if (settings.slidesToShow > 1 && ("development") !== 'production') {
	        console.warn('slidesToShow should be equal to 1 when fade is true, you\'re using ' + settings.slidesToShow);
	      }
	      if (settings.slidesToScroll > 1 && ("development") !== 'production') {
	        console.warn('slidesToScroll should be equal to 1 when fade is true, you\'re using ' + settings.slidesToScroll);
	      }
	      settings.slidesToShow = 1;
	      settings.slidesToScroll = 1;
	    }

	    // makes sure that children is an array, even when there is only 1 child
	    var children = _react2.default.Children.toArray(this.props.children);

	    // Children may contain false or null, so we should filter them
	    // children may also contain string filled with spaces (in certain cases where we use jsx strings)
	    children = children.filter(function (child) {
	      if (typeof child === 'string') {
	        return !!child.trim();
	      }
	      return !!child;
	    });

	    if (settings === 'unslick') {

	      var className = 'regular slider ' + (this.props.className || '');
	      return _react2.default.createElement(
	        'div',
	        { className: className },
	        children
	      );
	    } else if (children.length <= settings.slidesToShow) {
	      settings.unslick = true;
	    }
	    return _react2.default.createElement(
	      _innerSlider.InnerSlider,
	      _extends({ ref: this.innerSliderRefHandler }, settings),
	      children
	    );
	  };

	  return Slider;
	}(_react2.default.Component);

	exports.default = Slider;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.InnerSlider = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _initialState = __webpack_require__(5);

	var _initialState2 = _interopRequireDefault(_initialState);

	var _defaultProps = __webpack_require__(6);

	var _defaultProps2 = _interopRequireDefault(_defaultProps);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _innerSliderUtils = __webpack_require__(15);

	var _track = __webpack_require__(16);

	var _dots = __webpack_require__(17);

	var _arrows = __webpack_require__(18);

	var _resizeObserverPolyfill = __webpack_require__(19);

	var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InnerSlider = exports.InnerSlider = function (_React$Component) {
	  _inherits(InnerSlider, _React$Component);

	  function InnerSlider(props) {
	    _classCallCheck(this, InnerSlider);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.listRefHandler = function (ref) {
	      return _this.list = ref;
	    };

	    _this.trackRefHandler = function (ref) {
	      return _this.track = ref;
	    };

	    _this.adaptHeight = function () {
	      if (_this.props.adaptiveHeight && _this.list) {
	        var elem = _this.list.querySelector('[data-index="' + _this.state.currentSlide + '"]');
	        _this.list.style.height = (0, _innerSliderUtils.getHeight)(elem) + 'px';
	      }
	    };

	    _this.componentWillMount = function () {
	      _this.props.onInit && _this.props.onInit();
	      if (_this.props.lazyLoad) {
	        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_extends({}, _this.props, _this.state));
	        if (slidesToLoad.length > 0) {
	          _this.setState(function (prevState, props) {
	            return { lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad) };
	          });
	          if (_this.props.onLazyLoad) {
	            _this.props.onLazyLoad(slidesToLoad);
	          }
	        }
	      }
	    };

	    _this.componentDidMount = function () {
	      var spec = _extends({ listRef: _this.list, trackRef: _this.track }, _this.props);
	      _this.updateState(spec, true, function () {
	        _this.adaptHeight();
	        _this.props.autoplay && _this.autoPlay('update');
	      });
	      if (_this.props.lazyLoad === 'progressive') {
	        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1000);
	      }
	      _this.ro = new _resizeObserverPolyfill2.default(function (entries) {
	        return _this.onWindowResized();
	      });
	      _this.ro.observe(_this.list);
	      Array.from(document.querySelectorAll('.slick-slide')).forEach(function (slide) {
	        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
	        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
	      });
	      // To support server-side rendering
	      if (!window) {
	        return;
	      }
	      if (window.addEventListener) {
	        window.addEventListener('resize', _this.onWindowResized);
	      } else {
	        window.attachEvent('onresize', _this.onWindowResized);
	      }
	    };

	    _this.componentWillUnmount = function () {
	      if (_this.animationEndCallback) {
	        clearTimeout(_this.animationEndCallback);
	      }
	      if (_this.lazyLoadTimer) {
	        clearInterval(_this.lazyLoadTimer);
	      }
	      if (_this.callbackTimers.length) {
	        _this.callbackTimers.forEach(function (timer) {
	          return clearTimeout(timer);
	        });
	        _this.callbackTimers = [];
	      }
	      if (window.addEventListener) {
	        window.removeEventListener('resize', _this.onWindowResized);
	      } else {
	        window.detachEvent('onresize', _this.onWindowResized);
	      }
	      if (_this.autoplayTimer) {
	        clearInterval(_this.autoplayTimer);
	      }
	    };

	    _this.componentWillReceiveProps = function (nextProps) {
	      var spec = _extends({ listRef: _this.list, trackRef: _this.track }, nextProps, _this.state);
	      _this.updateState(spec, false, function () {
	        if (_this.state.currentSlide >= _react2.default.Children.count(nextProps.children)) {
	          _this.changeSlide({
	            message: 'index',
	            index: _react2.default.Children.count(nextProps.children) - nextProps.slidesToShow,
	            currentSlide: _this.state.currentSlide
	          });
	        }
	        if (nextProps.autoplay) {
	          _this.autoPlay('update');
	        } else {
	          _this.pause('paused');
	        }
	      });
	    };

	    _this.componentDidUpdate = function () {
	      _this.checkImagesLoad();
	      _this.props.onReInit && _this.props.onReInit();
	      if (_this.props.lazyLoad) {
	        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_extends({}, _this.props, _this.state));
	        if (slidesToLoad.length > 0) {
	          _this.setState(function (prevState, props) {
	            return { lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad) };
	          });
	          if (_this.props.onLazyLoad) {
	            _this.props.onLazyLoad(slidesToLoad);
	          }
	        }
	      }
	      // if (this.props.onLazyLoad) {
	      //   this.props.onLazyLoad([leftMostSlide])
	      // }
	      _this.adaptHeight();
	    };

	    _this.onWindowResized = function () {
	      if (!_reactDom2.default.findDOMNode(_this.track)) return;
	      var spec = _extends({ listRef: _this.list, trackRef: _this.track }, _this.props, _this.state);
	      _this.updateState(spec, true, function () {
	        if (_this.props.autoplay) _this.autoPlay('update');else _this.pause('paused');
	      });
	      // animating state should be cleared while resizing, otherwise autoplay stops working
	      _this.setState({
	        animating: false
	      });
	      clearTimeout(_this.animationEndCallback);
	      delete _this.animationEndCallback;
	    };

	    _this.updateState = function (spec, setTrackStyle, callback) {
	      var updatedState = (0, _innerSliderUtils.initializedState)(spec);
	      spec = _extends({}, spec, updatedState, { slideIndex: updatedState.currentSlide });
	      var targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec);
	      spec = _extends({}, spec, { left: targetLeft });
	      var trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec);
	      if (setTrackStyle || _react2.default.Children.count(_this.props.children) !== _react2.default.Children.count(spec.children)) {
	        updatedState['trackStyle'] = trackStyle;
	      }
	      _this.setState(updatedState, callback);
	    };

	    _this.checkImagesLoad = function () {
	      var images = document.querySelectorAll('.slick-slide img');
	      var imagesCount = images.length,
	          loadedCount = 0;
	      Array.from(images).forEach(function (image) {
	        var handler = function handler() {
	          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
	        };
	        if (!image.onclick) {
	          image.onclick = function () {
	            return image.parentNode.focus();
	          };
	        } else {
	          var prevClickHandler = image.onclick;
	          image.onclick = function () {
	            prevClickHandler();
	            image.parentNode.focus();
	          };
	        }
	        if (!image.onload) {
	          if (_this.props.lazyLoad) {
	            image.onload = function () {
	              _this.adaptHeight();
	              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
	            };
	          } else {
	            image.onload = handler;
	            image.onerror = function () {
	              handler();
	              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
	            };
	          }
	        }
	      });
	    };

	    _this.progressiveLazyLoad = function () {
	      var slidesToLoad = [];
	      var spec = _extends({}, _this.props, _this.state);
	      for (var index = _this.state.currentSlide; index < _this.state.slideCount + (0, _innerSliderUtils.getPostClones)(spec); index++) {
	        if (_this.state.lazyLoadedList.indexOf(index) < 0) {
	          slidesToLoad.push(index);
	          break;
	        }
	      }
	      for (var _index = _this.state.currentSlide - 1; _index >= -(0, _innerSliderUtils.getPreClones)(spec); _index--) {
	        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
	          slidesToLoad.push(_index);
	          break;
	        }
	      }
	      if (slidesToLoad.length > 0) {
	        _this.setState(function (state) {
	          return { lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad) };
	        });
	        if (_this.props.onLazyLoad) {
	          _this.props.onLazyLoad(slidesToLoad);
	        }
	      } else {
	        if (_this.lazyLoadTimer) {
	          clearInterval(_this.lazyLoadTimer);
	          delete _this.lazyLoadTimer;
	        }
	      }
	    };

	    _this.slideHandler = function (index) {
	      var _this$props = _this.props,
	          asNavFor = _this$props.asNavFor,
	          currentSlide = _this$props.currentSlide,
	          beforeChange = _this$props.beforeChange,
	          onLazyLoad = _this$props.onLazyLoad,
	          speed = _this$props.speed,
	          afterChange = _this$props.afterChange;

	      var _slideHandler = (0, _innerSliderUtils.slideHandler)(_extends({ index: index }, _this.props, _this.state, { trackRef: _this.track })),
	          state = _slideHandler.state,
	          nextState = _slideHandler.nextState;

	      if (!state) return;
	      beforeChange && beforeChange(currentSlide, state.currentSlide);
	      var slidesToLoad = state.lazyLoadedList.filter(function (value) {
	        return _this.state.lazyLoadedList.indexOf(value) < 0;
	      });
	      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);
	      _this.setState(state, function () {
	        asNavFor && asNavFor.innerSlider.state.currentSlide !== currentSlide && asNavFor.innerSlider.slideHandler(index);
	        _this.animationEndCallback = setTimeout(function () {
	          var animating = nextState.animating,
	              firstBatch = _objectWithoutProperties(nextState, ['animating']);

	          _this.setState(firstBatch, function () {
	            _this.callbackTimers.push(setTimeout(function () {
	              return _this.setState({ animating: animating });
	            }, 10));
	            afterChange && afterChange(state.currentSlide);
	            delete _this.animationEndCallback;
	          });
	        }, speed);
	      });
	    };

	    _this.changeSlide = function (options) {
	      var spec = _extends({}, _this.props, _this.state);
	      var targetSlide = (0, _innerSliderUtils.changeSlide)(spec, options);
	      if (targetSlide !== 0 && !targetSlide) return;
	      _this.slideHandler(targetSlide);
	    };

	    _this.keyHandler = function (e) {
	      var dir = (0, _innerSliderUtils.keyHandler)(e, _this.props.accessibility, _this.props.rtl);
	      dir !== '' && _this.changeSlide({ message: dir });
	    };

	    _this.selectHandler = function (options) {
	      _this.changeSlide(options);
	    };

	    _this.swipeStart = function (e) {
	      var state = (0, _innerSliderUtils.swipeStart)(e, _this.props.swipe, _this.props.draggable);
	      state !== '' && _this.setState(state);
	    };

	    _this.swipeMove = function (e) {
	      var state = (0, _innerSliderUtils.swipeMove)(e, _extends({}, _this.props, _this.state, {
	        trackRef: _this.track,
	        listRef: _this.list,
	        slideIndex: _this.state.currentSlide
	      }));
	      if (!state) return;
	      _this.setState(state);
	    };

	    _this.swipeEnd = function (e) {
	      var state = (0, _innerSliderUtils.swipeEnd)(e, _extends({}, _this.props, _this.state, {
	        trackRef: _this.track,
	        listRef: _this.list,
	        slideIndex: _this.state.currentSlide
	      }));
	      if (!state) return;
	      var triggerSlideHandler = state['triggerSlideHandler'];
	      delete state['triggerSlideHandler'];
	      _this.setState(state);
	      if (triggerSlideHandler === undefined) return;
	      _this.slideHandler(triggerSlideHandler);
	    };

	    _this.slickPrev = function () {
	      // this and fellow methods are wrapped in setTimeout
	      // to make sure initialize setState has happened before
	      // any of such methods are called
	      _this.callbackTimers.push(setTimeout(function () {
	        return _this.changeSlide({ message: 'previous' });
	      }, 0));
	    };

	    _this.slickNext = function () {
	      _this.callbackTimers.push(setTimeout(function () {
	        return _this.changeSlide({ message: 'next' });
	      }, 0));
	    };

	    _this.slickGoTo = function (slide) {
	      slide = Number(slide);
	      if (isNaN(slide)) return '';
	      _this.callbackTimers.push(setTimeout(function () {
	        return _this.changeSlide({
	          message: 'index',
	          index: slide,
	          currentSlide: _this.state.currentSlide
	        });
	      }, 0));
	    };

	    _this.play = function () {
	      var nextIndex;
	      if (_this.props.rtl) {
	        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
	      } else {
	        if ((0, _innerSliderUtils.canGoNext)(_extends({}, _this.props, _this.state))) {
	          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
	        } else {
	          return false;
	        }
	      }

	      _this.slideHandler(nextIndex);
	    };

	    _this.autoPlay = function (playType) {
	      if (_this.autoplayTimer) {
	        console.warn("autoPlay is triggered more than once");
	        clearInterval(_this.autoplayTimer);
	      }
	      var autoplaying = _this.state.autoplaying;
	      if (playType === 'update') {
	        if (autoplaying === 'hovered' || autoplaying === 'focused' || autoplaying === 'paused') {
	          return;
	        }
	      } else if (playType === 'leave') {
	        if (autoplaying === 'paused' || autoplaying === 'focused') {
	          return;
	        }
	      } else if (playType === 'blur') {
	        if (autoplaying === 'paused' || autoplaying === 'hovered') {
	          return;
	        }
	      }
	      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);
	      _this.setState({ autoplaying: 'playing' });
	    };

	    _this.pause = function (pauseType) {
	      if (_this.autoplayTimer) {
	        clearInterval(_this.autoplayTimer);
	        _this.autoplayTimer = null;
	      }
	      var autoplaying = _this.state.autoplaying;
	      if (pauseType === 'paused') {
	        _this.setState({ autoplaying: 'paused' });
	      } else if (pauseType === 'focused') {
	        if (autoplaying === 'hovered' || autoplaying === 'playing') {
	          _this.setState({ autoplaying: 'focused' });
	        }
	      } else {
	        // pauseType  is 'hovered'
	        if (autoplaying === 'playing') {
	          _this.setState({ autoplaying: 'hovered' });
	        }
	      }
	    };

	    _this.onDotsOver = function (e) {
	      return _this.props.autoplay && _this.pause('hovered');
	    };

	    _this.onDotsLeave = function (e) {
	      return _this.props.autoplay && _this.state.autoplaying === 'hovered' && _this.autoPlay('leave');
	    };

	    _this.onTrackOver = function (e) {
	      return _this.props.autoplay && _this.pause('hovered');
	    };

	    _this.onTrackLeave = function (e) {
	      return _this.props.autoplay && _this.state.autoplaying === 'hovered' && _this.autoPlay('leave');
	    };

	    _this.onSlideFocus = function (e) {
	      return _this.props.autoplay && _this.pause('focused');
	    };

	    _this.onSlideBlur = function (e) {
	      return _this.props.autoplay && _this.state.autoplaying === 'focused' && _this.autoPlay('blur');
	    };

	    _this.render = function () {
	      var className = (0, _classnames2.default)('regular', 'slider', 'slick-initialized', 'slick-slider', _this.props.className, {
	        'slick-vertical': _this.props.vertical
	      });
	      var spec = _extends({}, _this.props, _this.state);
	      var trackProps = (0, _innerSliderUtils.extractObject)(spec, ['fade', 'cssEase', 'speed', 'infinite', 'centerMode', 'focusOnSelect', 'currentSlide', 'lazyLoad', 'lazyLoadedList', 'rtl', 'slideWidth', 'slideHeight', 'listHeight', 'vertical', 'slidesToShow', 'slidesToScroll', 'slideCount', 'trackStyle', 'variableWidth', 'unslick', 'centerPadding']);
	      var pauseOnHover = _this.props.pauseOnHover;

	      trackProps = _extends({}, trackProps, {
	        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
	        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
	        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
	        focusOnSelect: _this.props.focusOnSelect ? _this.selectHandler : null
	      });

	      var dots;
	      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
	        var dotProps = (0, _innerSliderUtils.extractObject)(spec, ['dotsClass', 'slideCount', 'slidesToShow', 'currentSlide', 'slidesToScroll', 'clickHandler', 'children', 'customPaging', 'infinite', 'appendDots']);
	        var pauseOnDotsHover = _this.props.pauseOnDotsHover;

	        dotProps = _extends({}, dotProps, {
	          clickHandler: _this.changeSlide,
	          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
	          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
	          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
	        });
	        dots = _react2.default.createElement(_dots.Dots, dotProps);
	      }

	      var prevArrow, nextArrow;
	      var arrowProps = (0, _innerSliderUtils.extractObject)(spec, ['infinite', 'centerMode', 'currentSlide', 'slideCount', 'slidesToShow', 'prevArrow', 'nextArrow']);
	      arrowProps.clickHandler = _this.changeSlide;

	      if (_this.props.arrows) {
	        prevArrow = _react2.default.createElement(_arrows.PrevArrow, arrowProps);
	        nextArrow = _react2.default.createElement(_arrows.NextArrow, arrowProps);
	      }

	      var verticalHeightStyle = null;

	      if (_this.props.vertical) {
	        verticalHeightStyle = {
	          height: _this.state.listHeight
	        };
	      }

	      var centerPaddingStyle = null;

	      if (_this.props.vertical === false) {
	        if (_this.props.centerMode === true) {
	          centerPaddingStyle = {
	            padding: '0px ' + _this.props.centerPadding
	          };
	        }
	      } else {
	        if (_this.props.centerMode === true) {
	          centerPaddingStyle = {
	            padding: _this.props.centerPadding + ' 0px'
	          };
	        }
	      }

	      var listStyle = _extends({}, verticalHeightStyle, centerPaddingStyle);
	      var touchMove = _this.props.touchMove;
	      var listProps = {
	        className: 'slick-list',
	        style: listStyle,
	        onMouseDown: touchMove ? _this.swipeStart : null,
	        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
	        onMouseUp: touchMove ? _this.swipeEnd : null,
	        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
	        onTouchStart: touchMove ? _this.swipeStart : null,
	        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
	        onTouchEnd: touchMove ? _this.swipeEnd : null,
	        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
	        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
	      };

	      var innerSliderProps = {
	        className: className,
	        dir: 'ltr'
	      };

	      if (_this.props.unslick) {
	        listProps = { className: 'slick-list' };
	        innerSliderProps = { className: className };
	      }

	      return _react2.default.createElement(
	        'div',
	        innerSliderProps,
	        !_this.props.unslick ? prevArrow : '',
	        _react2.default.createElement(
	          'div',
	          _extends({ ref: _this.listRefHandler }, listProps),
	          _react2.default.createElement(
	            _track.Track,
	            _extends({ ref: _this.trackRefHandler }, trackProps),
	            _this.props.children
	          )
	        ),
	        !_this.props.unslick ? nextArrow : '',
	        !_this.props.unslick ? dots : ''
	      );
	    };

	    _this.list = null;
	    _this.track = null;
	    _this.state = _extends({}, _initialState2.default, {
	      currentSlide: _this.props.initialSlide
	    });
	    _this.callbackTimers = [];
	    return _this;
	  }

	  return InnerSlider;
	}(_react2.default.Component);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var initialState = {
	  animating: false,
	  autoplaying: null,
	  currentDirection: 0,
	  currentLeft: null,
	  currentSlide: 0,
	  direction: 1,
	  dragging: false,
	  edgeDragged: false,
	  initialized: false,
	  lazyLoadedList: [],
	  listHeight: null,
	  listWidth: null,
	  scrolling: false,
	  slideCount: null,
	  slideHeight: null,
	  slideWidth: null,
	  swipeLeft: null,
	  swiped: false, // used by swipeEvent. differentites between touch and swipe.
	  swiping: false,
	  touchObject: { startX: 0, startY: 0, curX: 0, curY: 0 },
	  trackStyle: {},
	  trackWidth: 0
	};

	exports.default = initialState;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultProps = {
	  accessibility: true,
	  adaptiveHeight: false,
	  afterChange: null,
	  appendDots: function appendDots(dots) {
	    return _react2.default.createElement(
	      'ul',
	      { style: { display: 'block' } },
	      dots
	    );
	  },
	  arrows: true,
	  autoplay: false,
	  autoplaySpeed: 3000,
	  beforeChange: null,
	  centerMode: false,
	  centerPadding: '50px',
	  className: '',
	  cssEase: 'ease',
	  customPaging: function customPaging(i) {
	    return _react2.default.createElement(
	      'button',
	      null,
	      i + 1
	    );
	  },
	  dots: false,
	  dotsClass: 'slick-dots',
	  draggable: true,
	  easing: 'linear',
	  edgeFriction: 0.35,
	  fade: false,
	  focusOnSelect: false,
	  infinite: true,
	  initialSlide: 0,
	  lazyLoad: null,
	  nextArrow: null,
	  onEdge: null,
	  onInit: null,
	  onLazyLoadError: null,
	  onReInit: null,
	  pauseOnDotsHover: false,
	  pauseOnFocus: false,
	  pauseOnHover: true,
	  prevArrow: null,
	  responsive: null,
	  rtl: false,
	  slide: 'div',
	  slidesToScroll: 1,
	  slidesToShow: 1,
	  speed: 500,
	  swipe: true,
	  swipeEvent: null,
	  swipeToSlide: false,
	  touchMove: true,
	  touchThreshold: 5,
	  useCSS: true,
	  useTransform: true,
	  variableWidth: false,
	  vertical: false,
	  waitForAnimate: true
	};

	exports.default = defaultProps;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var React = __webpack_require__(2);
	var factory = __webpack_require__(8);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(9);

	var emptyObject = __webpack_require__(10);
	var _invariant = __webpack_require__(11);

	if (true) {
	  var warning = __webpack_require__(12);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (true) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
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
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

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
	    getDefaultProps: 'DEFINE_MANY_MERGED',

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
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

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
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

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
	    componentDidMount: 'DEFINE_MANY',

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
	    componentWillReceiveProps: 'DEFINE_MANY',

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
	    shouldComponentUpdate: 'DEFINE_ONCE',

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
	    componentWillUpdate: 'DEFINE_MANY',

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
	    componentDidUpdate: 'DEFINE_MANY',

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
	    componentWillUnmount: 'DEFINE_MANY',

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
	    updateComponent: 'OVERRIDE_BASE'
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
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (true) {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (true) {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (true) {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (true) {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

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
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (true) {
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
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
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
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
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
	    if (true) {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (true) {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (true) {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
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

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (true) {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (true) {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
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
	      if (true) {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (true) {
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

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (true) {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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

	var emptyObject = {};

	if (true) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(13);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

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
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
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
	var emptyFunction = function emptyFunction() {};

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.slidesOnLeft = exports.slidesOnRight = exports.siblingDirection = exports.getTotalSlides = exports.getPostClones = exports.getPreClones = exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = exports.checkSpecKeys = exports.getSlideCount = exports.checkNavigable = exports.getNavigableIndexes = exports.swipeEnd = exports.swipeMove = exports.swipeStart = exports.keyHandler = exports.changeSlide = exports.slideHandler = exports.initializedState = exports.extractObject = exports.canGoNext = exports.getSwipeDirection = exports.getHeight = exports.getWidth = exports.lazySlidesOnRight = exports.lazySlidesOnLeft = exports.lazyEndIndex = exports.lazyStartIndex = exports.getRequiredLazySlides = exports.getOnDemandLazySlides = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getOnDemandLazySlides = exports.getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
	  var onDemandSlides = [];
	  var startIndex = lazyStartIndex(spec);
	  var endIndex = lazyEndIndex(spec);
	  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
	    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
	      onDemandSlides.push(slideIndex);
	    }
	  }
	  return onDemandSlides;
	};

	// return list of slides that need to be present
	var getRequiredLazySlides = exports.getRequiredLazySlides = function getRequiredLazySlides(spec) {
	  var requiredSlides = [];
	  var startIndex = lazyStartIndex(spec);
	  var endIndex = lazyEndIndex(spec);
	  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
	    requiredSlides.push(slideIndex);
	  }
	  return requiredSlides;
	};

	// startIndex that needs to be present
	var lazyStartIndex = exports.lazyStartIndex = function lazyStartIndex(spec) {
	  return spec.currentSlide - lazySlidesOnLeft(spec);
	};
	var lazyEndIndex = exports.lazyEndIndex = function lazyEndIndex(spec) {
	  return spec.currentSlide + lazySlidesOnRight(spec);
	};
	var lazySlidesOnLeft = exports.lazySlidesOnLeft = function lazySlidesOnLeft(spec) {
	  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
	};
	var lazySlidesOnRight = exports.lazySlidesOnRight = function lazySlidesOnRight(spec) {
	  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
	};

	// get width of an element
	var getWidth = exports.getWidth = function getWidth(elem) {
	  return elem && elem.offsetWidth || 0;
	};
	var getHeight = exports.getHeight = function getHeight(elem) {
	  return elem && elem.offsetHeight || 0;
	};
	var getSwipeDirection = exports.getSwipeDirection = function getSwipeDirection(touchObject) {
	  var verticalSwiping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var xDist, yDist, r, swipeAngle;
	  xDist = touchObject.startX - touchObject.curX;
	  yDist = touchObject.startY - touchObject.curY;
	  r = Math.atan2(yDist, xDist);
	  swipeAngle = Math.round(r * 180 / Math.PI);
	  if (swipeAngle < 0) {
	    swipeAngle = 360 - Math.abs(swipeAngle);
	  }
	  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
	    return 'left';
	  }
	  if (swipeAngle >= 135 && swipeAngle <= 225) {
	    return 'right';
	  }
	  if (verticalSwiping === true) {
	    if (swipeAngle >= 35 && swipeAngle <= 135) {
	      return 'up';
	    } else {
	      return 'down';
	    }
	  }

	  return 'vertical';
	};

	// whether or not we can go next
	var canGoNext = exports.canGoNext = function canGoNext(spec) {
	  var canGo = true;
	  if (!spec.infinite) {
	    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
	      canGo = false;
	    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
	      canGo = false;
	    }
	  }
	  return canGo;
	};

	// given an object and a list of keys, return new object with given keys
	var extractObject = exports.extractObject = function extractObject(spec, keys) {
	  var newObject = {};
	  keys.forEach(function (key) {
	    return newObject[key] = spec[key];
	  });
	  return newObject;
	};

	// get initialized state
	var initializedState = exports.initializedState = function initializedState(spec) {
	  // spec also contains listRef, trackRef
	  var slideCount = _react2.default.Children.count(spec.children);
	  var listWidth = Math.ceil(getWidth(_reactDom2.default.findDOMNode(spec.listRef)));
	  var trackWidth = Math.ceil(getWidth(_reactDom2.default.findDOMNode(spec.trackRef)));
	  var slideWidth = void 0;
	  if (!spec.vertical) {
	    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;
	    if (typeof spec.centerPadding === 'string' && spec.centerPadding.slice(-1) === '%') {
	      centerPaddingAdj *= listWidth / 100;
	    }
	    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
	  } else {
	    slideWidth = listWidth;
	  }
	  var slideHeight = _reactDom2.default.findDOMNode(spec.listRef) && getHeight(_reactDom2.default.findDOMNode(spec.listRef).querySelector('[data-index="0"]'));
	  var listHeight = slideHeight * spec.slidesToShow;
	  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;
	  if (spec.rtl && spec.currentSlide === undefined) {
	    currentSlide = slideCount - 1 - spec.initialSlide;
	  }
	  var lazyLoadedList = spec.lazyLoadedList || [];
	  var slidesToLoad = getOnDemandLazySlides({ currentSlide: currentSlide, lazyLoadedList: lazyLoadedList }, spec);
	  lazyLoadedList.concat(slidesToLoad);

	  var state = { slideCount: slideCount, slideWidth: slideWidth, listWidth: listWidth, trackWidth: trackWidth, currentSlide: currentSlide,
	    slideHeight: slideHeight, listHeight: listHeight, lazyLoadedList: lazyLoadedList };

	  if (spec.autoplaying === null && spec.autoplay) {
	    state['autoplaying'] = 'playing';
	  }

	  return state;
	};

	var slideHandler = exports.slideHandler = function slideHandler(spec) {
	  var waitForAnimate = spec.waitForAnimate,
	      animating = spec.animating,
	      fade = spec.fade,
	      infinite = spec.infinite,
	      index = spec.index,
	      slideCount = spec.slideCount,
	      lazyLoadedList = spec.lazyLoadedList,
	      lazyLoad = spec.lazyLoad,
	      onLazyLoad = spec.onLazyLoad,
	      asNavFor = spec.asNavFor,
	      currentSlide = spec.currentSlide,
	      speed = spec.speed,
	      centerMode = spec.centerMode,
	      slidesToScroll = spec.slidesToScroll,
	      slidesToShow = spec.slidesToShow,
	      useCSS = spec.useCSS;

	  if (waitForAnimate && animating) return {};
	  var animationSlide = index,
	      finalSlide = void 0,
	      animationLeft = void 0,
	      finalLeft = void 0;
	  var state = {},
	      nextState = {};
	  if (fade) {
	    if (!infinite && (index < 0 || index >= slideCount)) return {};
	    if (index < 0) {
	      animationSlide = index + slideCount;
	    } else if (index >= slideCount) {
	      animationSlide = index - slideCount;
	    }
	    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
	      lazyLoadedList.push(animationSlide);
	    }
	    state = {
	      animating: true,
	      currentSlide: animationSlide,
	      lazyLoadedList: lazyLoadedList
	    };
	    nextState = { animating: false };
	  } else {
	    finalSlide = animationSlide;
	    if (animationSlide < 0) {
	      finalSlide = animationSlide + slideCount;
	      if (!infinite) finalSlide = 0;else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
	    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
	      animationSlide = finalSlide = currentSlide;
	    } else if (centerMode && animationSlide >= slideCount) {
	      animationSlide = infinite ? slideCount : slideCount - 1;
	      finalSlide = infinite ? 0 : slideCount - 1;
	    } else if (animationSlide >= slideCount) {
	      finalSlide = animationSlide - slideCount;
	      if (!infinite) finalSlide = slideCount - slidesToShow;else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
	    }
	    animationLeft = getTrackLeft(_extends({}, spec, { slideIndex: animationSlide }));
	    finalLeft = getTrackLeft(_extends({}, spec, { slideIndex: finalSlide }));
	    if (!infinite) {
	      if (animationLeft === finalLeft) animationSlide = finalSlide;
	      animationLeft = finalLeft;
	    }
	    lazyLoad && lazyLoadedList.concat(getOnDemandLazySlides(_extends({}, spec, { currentSlide: animationSlide })));
	    if (!useCSS) {
	      state = {
	        currentSlide: finalSlide,
	        trackStyle: getTrackCSS(_extends({}, spec, { left: finalLeft })),
	        lazyLoadedList: lazyLoadedList
	      };
	    } else {
	      state = {
	        animating: true,
	        currentSlide: finalSlide,
	        trackStyle: getTrackAnimateCSS(_extends({}, spec, { left: animationLeft })),
	        lazyLoadedList: lazyLoadedList
	      };
	      nextState = {
	        animating: false,
	        currentSlide: finalSlide,
	        trackStyle: getTrackCSS(_extends({}, spec, { left: finalLeft })),
	        swipeLeft: null
	      };
	    }
	  }
	  return { state: state, nextState: nextState };
	};

	var changeSlide = exports.changeSlide = function changeSlide(spec, options) {
	  var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
	  var slidesToScroll = spec.slidesToScroll,
	      slidesToShow = spec.slidesToShow,
	      centerMode = spec.centerMode,
	      rtl = spec.rtl,
	      slideCount = spec.slideCount,
	      currentSlide = spec.currentSlide,
	      lazyLoad = spec.lazyLoad,
	      infinite = spec.infinite;

	  unevenOffset = slideCount % slidesToScroll !== 0;
	  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

	  if (options.message === 'previous') {
	    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
	    targetSlide = currentSlide - slideOffset;
	    if (lazyLoad && !infinite) {
	      previousInt = currentSlide - slideOffset;
	      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
	    }
	  } else if (options.message === 'next') {
	    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
	    targetSlide = currentSlide + slideOffset;
	    if (lazyLoad && !infinite) {
	      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
	    }
	  } else if (options.message === 'dots') {
	    // Click on dots
	    targetSlide = options.index * options.slidesToScroll;
	    if (targetSlide === options.currentSlide) {
	      return null;
	    }
	  } else if (options.message === 'children') {
	    // Click on the slides
	    targetSlide = options.index;
	    if (targetSlide === options.currentSlide) {
	      return null;
	    }
	    if (infinite) {
	      var direction = siblingDirection(_extends({}, spec, { targetSlide: targetSlide }));
	      if (targetSlide > options.currentSlide && direction === 'left') {
	        targetSlide = targetSlide - slideCount;
	      } else if (targetSlide < options.currentSlide && direction === 'right') {
	        targetSlide = targetSlide + slideCount;
	      }
	    }
	  } else if (options.message === 'index') {
	    targetSlide = Number(options.index);
	    if (targetSlide === options.currentSlide) {
	      return null;
	    }
	  }
	  return targetSlide;
	};
	var keyHandler = exports.keyHandler = function keyHandler(e, accessibility, rtl) {
	  if (e.target.tagName.match('TEXTAREA|INPUT|SELECT') || !accessibility) return '';
	  if (e.keyCode === 37) return rtl ? 'next' : 'previous';
	  if (e.keyCode === 39) return rtl ? 'previous' : 'next';
	  return '';
	};

	var swipeStart = exports.swipeStart = function swipeStart(e, swipe, draggable) {
	  e.target.tagName === 'IMG' && e.preventDefault();
	  if (!swipe || !draggable && e.type.indexOf('mouse') !== -1) return '';
	  return {
	    dragging: true,
	    touchObject: {
	      startX: e.touches ? e.touches[0].pageX : e.clientX,
	      startY: e.touches ? e.touches[0].pageY : e.clientY,
	      curX: e.touches ? e.touches[0].pageX : e.clientX,
	      curY: e.touches ? e.touches[0].pageY : e.clientY
	    }
	  };
	};
	var swipeMove = exports.swipeMove = function swipeMove(e, spec) {
	  // spec also contains, trackRef and slideIndex
	  var scrolling = spec.scrolling,
	      animating = spec.animating,
	      vertical = spec.vertical,
	      swipeToSlide = spec.swipeToSlide,
	      verticalSwiping = spec.verticalSwiping,
	      rtl = spec.rtl,
	      currentSlide = spec.currentSlide,
	      edgeFriction = spec.edgeFriction,
	      edgeDragged = spec.edgeDragged,
	      onEdge = spec.onEdge,
	      swiped = spec.swiped,
	      swiping = spec.swiping,
	      slideCount = spec.slideCount,
	      slidesToScroll = spec.slidesToScroll,
	      infinite = spec.infinite,
	      touchObject = spec.touchObject,
	      swipeEvent = spec.swipeEvent,
	      listHeight = spec.listHeight,
	      listWidth = spec.listWidth;

	  if (scrolling) return;
	  if (animating) return e.preventDefault();
	  if (vertical && swipeToSlide && verticalSwiping) e.preventDefault();
	  var swipeLeft = void 0,
	      state = {};
	  var curLeft = getTrackLeft(spec);
	  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
	  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
	  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
	  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));
	  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
	    return { scrolling: true };
	  }
	  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
	  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
	  if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;

	  var dotCount = Math.ceil(slideCount / slidesToScroll);
	  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
	  var touchSwipeLength = touchObject.swipeLength;
	  if (!infinite) {
	    if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left' || !canGoNext(spec) && swipeDirection === 'left') {
	      touchSwipeLength = touchObject.swipeLength * edgeFriction;
	      if (edgeDragged === false && onEdge) {
	        onEdge(swipeDirection);
	        state['edgeDragged'] = true;
	      }
	    }
	  }
	  if (!swiped && swipeEvent) {
	    swipeEvent(swipeDirection);
	    state['swiped'] = true;
	  }
	  if (!vertical) {
	    if (!rtl) {
	      swipeLeft = curLeft + touchSwipeLength * positionOffset;
	    } else {
	      swipeLeft = curLeft - touchSwipeLength * positionOffset;
	    }
	  } else {
	    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
	  }
	  if (verticalSwiping) {
	    swipeLeft = curLeft + touchSwipeLength * positionOffset;
	  }
	  state = _extends({}, state, {
	    touchObject: touchObject,
	    swipeLeft: swipeLeft,
	    trackStyle: getTrackCSS(_extends({}, spec, { left: swipeLeft }))
	  });
	  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
	    return state;
	  }
	  if (touchObject.swipeLength > 10) {
	    state['swiping'] = true;
	    e.preventDefault();
	  }
	  return state;
	};
	var swipeEnd = exports.swipeEnd = function swipeEnd(e, spec) {
	  var dragging = spec.dragging,
	      swipe = spec.swipe,
	      touchObject = spec.touchObject,
	      listWidth = spec.listWidth,
	      touchThreshold = spec.touchThreshold,
	      verticalSwiping = spec.verticalSwiping,
	      listHeight = spec.listHeight,
	      currentSlide = spec.currentSlide,
	      swipeToSlide = spec.swipeToSlide,
	      scrolling = spec.scrolling,
	      onSwipe = spec.onSwipe;

	  if (!dragging) {
	    if (swipe) e.preventDefault();
	    return {};
	  }
	  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
	  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping);
	  // reset the state of touch related state variables.
	  var state = {
	    dragging: false,
	    edgeDragged: false,
	    scrolling: false,
	    swiping: false,
	    swiped: false,
	    swipeLeft: null,
	    touchObject: {}
	  };
	  if (scrolling) {
	    return state;
	  }
	  if (!touchObject.swipeLength) {
	    return state;
	  }
	  if (touchObject.swipeLength > minSwipe) {
	    e.preventDefault();
	    if (onSwipe) {
	      onSwipe(swipeDirection);
	    }
	    var slideCount = void 0,
	        newSlide = void 0;
	    switch (swipeDirection) {
	      case 'left':
	      case 'up':
	        newSlide = currentSlide + getSlideCount(spec);
	        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
	        state['currentDirection'] = 0;
	        break;
	      case 'right':
	      case 'down':
	        newSlide = currentSlide - getSlideCount(spec);
	        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
	        state['currentDirection'] = 1;
	        break;
	      default:
	        slideCount = currentSlide;
	    }
	    state['triggerSlideHandler'] = slideCount;
	  } else {
	    // Adjust the track back to it's original position.
	    var currentLeft = getTrackLeft(spec);
	    state['trackStyle'] = getTrackAnimateCSS(_extends({}, spec, { left: currentLeft }));
	  }
	  return state;
	};
	var getNavigableIndexes = exports.getNavigableIndexes = function getNavigableIndexes(spec) {
	  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
	  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
	  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
	  var indexes = [];
	  while (breakpoint < max) {
	    indexes.push(breakpoint);
	    breakpoint = counter + spec.slidesToScroll;
	    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
	  }
	  return indexes;
	};
	var checkNavigable = exports.checkNavigable = function checkNavigable(spec, index) {
	  var navigables = getNavigableIndexes(spec);
	  var prevNavigable = 0;
	  if (index > navigables[navigables.length - 1]) {
	    index = navigables[navigables.length - 1];
	  } else {
	    for (var n in navigables) {
	      if (index < navigables[n]) {
	        index = prevNavigable;
	        break;
	      }
	      prevNavigable = navigables[n];
	    }
	  }
	  return index;
	};
	var getSlideCount = exports.getSlideCount = function getSlideCount(spec) {
	  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;
	  if (spec.swipeToSlide) {
	    var swipedSlide = void 0;
	    var slickList = _reactDom2.default.findDOMNode(spec.listRef);
	    var slides = slickList.querySelectorAll('.slick-slide');
	    Array.from(slides).every(function (slide) {
	      if (!spec.vertical) {
	        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
	          swipedSlide = slide;
	          return false;
	        }
	      } else {
	        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
	          swipedSlide = slide;
	          return false;
	        }
	      }

	      return true;
	    });

	    if (!swipedSlide) {
	      return 0;
	    }
	    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
	    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
	    return slidesTraversed;
	  } else {
	    return spec.slidesToScroll;
	  }
	};

	var checkSpecKeys = exports.checkSpecKeys = function checkSpecKeys(spec, keysArray) {
	  return keysArray.reduce(function (value, key) {
	    return value && spec.hasOwnProperty(key);
	  }, true) ? null : console.error('Keys Missing:', spec);
	};

	var getTrackCSS = exports.getTrackCSS = function getTrackCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);
	  var trackWidth = void 0,
	      trackHeight = void 0;
	  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;
	  if (!spec.vertical) {
	    trackWidth = getTotalSlides(spec) * spec.slideWidth;
	  } else {
	    trackHeight = trackChildren * spec.slideHeight;
	  }
	  var style = {
	    opacity: 1,
	    transition: '',
	    WebkitTransition: ''
	  };
	  if (spec.useTransform) {
	    var WebkitTransform = !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)';
	    var transform = !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)';
	    var msTransform = !spec.vertical ? 'translateX(' + spec.left + 'px)' : 'translateY(' + spec.left + 'px)';
	    style = _extends({}, style, {
	      WebkitTransform: WebkitTransform,
	      transform: transform,
	      msTransform: msTransform
	    });
	  } else {
	    if (spec.vertical) {
	      style['top'] = spec.left;
	    } else {
	      style['left'] = spec.left;
	    }
	  }
	  if (spec.fade) style = { opacity: 1 };
	  if (trackWidth) style.width = trackWidth;
	  if (trackHeight) style.height = trackHeight;

	  // Fallback for IE8
	  if (window && !window.addEventListener && window.attachEvent) {
	    if (!spec.vertical) {
	      style.marginLeft = spec.left + 'px';
	    } else {
	      style.marginTop = spec.left + 'px';
	    }
	  }

	  return style;
	};
	var getTrackAnimateCSS = exports.getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
	  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);
	  var style = getTrackCSS(spec);
	  // useCSS is true by default so it can be undefined
	  if (spec.useTransform) {
	    style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
	    style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
	  } else {
	    if (spec.vertical) {
	      style.transition = 'top ' + spec.speed + 'ms ' + spec.cssEase;
	    } else {
	      style.transition = 'left ' + spec.speed + 'ms ' + spec.cssEase;
	    }
	  }
	  return style;
	};
	var getTrackLeft = exports.getTrackLeft = function getTrackLeft(spec) {

	  if (spec.unslick) {
	    return 0;
	  }

	  checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth', 'slideHeight']);

	  var slideIndex = spec.slideIndex,
	      trackRef = spec.trackRef,
	      infinite = spec.infinite,
	      centerMode = spec.centerMode,
	      slideCount = spec.slideCount,
	      slidesToShow = spec.slidesToShow,
	      slidesToScroll = spec.slidesToScroll,
	      slideWidth = spec.slideWidth,
	      listWidth = spec.listWidth,
	      variableWidth = spec.variableWidth,
	      slideHeight = spec.slideHeight,
	      fade = spec.fade,
	      vertical = spec.vertical;


	  var slideOffset = 0;
	  var targetLeft;
	  var targetSlide;
	  var verticalOffset = 0;

	  if (fade || spec.slideCount === 1) {
	    return 0;
	  }

	  var slidesToOffset = 0;
	  if (infinite) {
	    slidesToOffset = -getPreClones(spec); // bring active slide to the beginning of visual area
	    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children
	    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
	      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
	    }
	    // shift current slide to center of the frame
	    if (centerMode) {
	      slidesToOffset += parseInt(slidesToShow / 2);
	    }
	  } else {
	    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
	      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
	    }
	    if (centerMode) {
	      slidesToOffset = parseInt(slidesToShow / 2);
	    }
	  }
	  slideOffset = slidesToOffset * slideWidth;
	  verticalOffset = slidesToOffset * slideHeight;

	  if (!vertical) {
	    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
	  } else {
	    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
	  }

	  if (variableWidth === true) {
	    var targetSlideIndex;
	    var trackElem = _reactDom2.default.findDOMNode(trackRef);
	    var lastSlide = trackElem && trackElem.children[slideCount - 1];
	    targetSlideIndex = slideIndex + getPreClones(spec);
	    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
	    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
	    if (centerMode === true) {
	      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
	      targetSlide = trackElem && trackElem.children[targetSlideIndex];
	      targetLeft = 0;
	      for (var slide = 0; slide < targetSlideIndex; slide++) {
	        targetLeft -= trackElem && trackElem.children[slide].offsetWidth;
	      }
	      targetLeft -= parseInt(spec.centerPadding);
	      targetLeft += (listWidth - targetSlide.offsetWidth) / 2;
	    }
	  }

	  return targetLeft;
	};

	var getPreClones = exports.getPreClones = function getPreClones(spec) {
	  if (spec.unslick || !spec.infinite) {
	    return 0;
	  }
	  if (spec.variableWidth) {
	    return spec.slideCount;
	  }
	  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
	};

	var getPostClones = exports.getPostClones = function getPostClones(spec) {
	  if (spec.unslick || !spec.infinite) {
	    return 0;
	  }
	  return spec.slideCount;
	};

	var getTotalSlides = exports.getTotalSlides = function getTotalSlides(spec) {
	  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
	};
	var siblingDirection = exports.siblingDirection = function siblingDirection(spec) {
	  if (spec.targetSlide > spec.currentSlide) {
	    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
	      return 'left';
	    }
	    return 'right';
	  } else {
	    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
	      return 'right';
	    }
	    return 'left';
	  }
	};

	var slidesOnRight = exports.slidesOnRight = function slidesOnRight(_ref) {
	  var slidesToShow = _ref.slidesToShow,
	      centerMode = _ref.centerMode,
	      rtl = _ref.rtl,
	      centerPadding = _ref.centerPadding;

	  // returns no of slides on the right of active slide
	  if (centerMode) {
	    var right = (slidesToShow - 1) / 2 + 1;
	    if (parseInt(centerPadding) > 0) right += 1;
	    if (rtl && slidesToShow % 2 === 0) right += 1;
	    return right;
	  }
	  if (rtl) {
	    return 0;
	  }
	  return slidesToShow - 1;
	};

	var slidesOnLeft = exports.slidesOnLeft = function slidesOnLeft(_ref2) {
	  var slidesToShow = _ref2.slidesToShow,
	      centerMode = _ref2.centerMode,
	      rtl = _ref2.rtl,
	      centerPadding = _ref2.centerPadding;

	  // returns no of slides on the left of active slide
	  if (centerMode) {
	    var left = (slidesToShow - 1) / 2 + 1;
	    if (parseInt(centerPadding) > 0) left += 1;
	    if (!rtl && slidesToShow % 2 === 0) left += 1;
	    return left;
	  }
	  if (rtl) {
	    return slidesToShow - 1;
	  }
	  return 0;
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Track = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _innerSliderUtils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
	var getSlideClasses = function getSlideClasses(spec) {
	  // if spec has currentSlideIndex, we can also apply slickCurrent class according to that (https://github.com/kenwheeler/slick/blob/master/slick/slick.js#L2300-L2302)
	  var slickActive, slickCenter, slickCloned;
	  var centerOffset, index;

	  if (spec.rtl) {
	    // if we're going right to left, index is reversed
	    index = spec.slideCount - 1 - spec.index;
	  } else {
	    // index of the slide
	    index = spec.index;
	  }
	  slickCloned = index < 0 || index >= spec.slideCount;
	  if (spec.centerMode) {
	    centerOffset = Math.floor(spec.slidesToShow / 2);
	    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0; // concern: not sure if this should be correct (https://github.com/kenwheeler/slick/blob/master/slick/slick.js#L2328-L2346)
	    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
	      slickActive = true;
	    }
	  } else {
	    // concern: following can be incorrect in case where currentSlide is lastSlide in frame and rest of the slides to show have index smaller than currentSlideIndex
	    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
	  }
	  var slickCurrent = index === spec.currentSlide;
	  return (0, _classnames2.default)({
	    'slick-slide': true,
	    'slick-active': slickActive,
	    'slick-center': slickCenter,
	    'slick-cloned': slickCloned,
	    'slick-current': slickCurrent // dubious in case of RTL
	  });
	};

	var getSlideStyle = function getSlideStyle(spec) {
	  var style = {};

	  if (spec.variableWidth === undefined || spec.variableWidth === false) {
	    style.width = spec.slideWidth;
	  }

	  if (spec.fade) {
	    style.position = 'relative';
	    if (spec.vertical) {
	      style.top = -spec.index * spec.slideHeight;
	    } else {
	      style.left = -spec.index * spec.slideWidth;
	    }
	    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
	    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase + ', ' + 'visibility ' + spec.speed + 'ms ' + spec.cssEase;
	    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase + ', ' + 'visibility ' + spec.speed + 'ms ' + spec.cssEase;
	  }

	  return style;
	};

	var getKey = function getKey(child, fallbackKey) {
	  return child.key || fallbackKey;
	};

	var renderSlides = function renderSlides(spec) {
	  var key;
	  var slides = [];
	  var preCloneSlides = [];
	  var postCloneSlides = [];
	  var childrenCount = _react2.default.Children.count(spec.children);
	  var startIndex = (0, _innerSliderUtils.lazyStartIndex)(spec);
	  var endIndex = (0, _innerSliderUtils.lazyEndIndex)(spec);

	  _react2.default.Children.forEach(spec.children, function (elem, index) {
	    var child = void 0;
	    var childOnClickOptions = {
	      message: 'children',
	      index: index,
	      slidesToScroll: spec.slidesToScroll,
	      currentSlide: spec.currentSlide
	    };

	    // in case of lazyLoad, whether or not we want to fetch the slide
	    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0) {
	      child = elem;
	    } else {
	      child = _react2.default.createElement('div', null);
	    }
	    var childStyle = getSlideStyle(_extends({}, spec, { index: index }));
	    var slideClass = child.props.className || '';

	    // push a cloned element of the desired slide
	    slides.push(_react2.default.cloneElement(child, {
	      key: 'original' + getKey(child, index),
	      'data-index': index,
	      className: (0, _classnames2.default)(getSlideClasses(_extends({}, spec, { index: index })), slideClass),
	      tabIndex: '-1',
	      style: _extends({ outline: 'none' }, child.props.style || {}, childStyle),
	      onClick: function onClick(e) {
	        child.props && child.props.onClick && child.props.onClick(e);
	        if (spec.focusOnSelect) {
	          spec.focusOnSelect(childOnClickOptions);
	        }
	      }
	    }));

	    // if slide needs to be precloned or postcloned
	    if (spec.infinite && spec.fade === false) {
	      var preCloneNo = childrenCount - index;
	      if (preCloneNo <= (0, _innerSliderUtils.getPreClones)(spec) && childrenCount !== spec.slidesToShow) {
	        key = -preCloneNo;
	        if (key >= startIndex) {
	          child = elem;
	        }
	        preCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'precloned' + getKey(child, key),
	          'data-index': key,
	          tabIndex: '-1',
	          className: (0, _classnames2.default)(getSlideClasses(_extends({}, spec, { index: key })), slideClass),
	          style: _extends({}, child.props.style || {}, childStyle),
	          onClick: function onClick(e) {
	            child.props && child.props.onClick && child.props.onClick(e);
	            if (spec.focusOnSelect) {
	              spec.focusOnSelect(childOnClickOptions);
	            }
	          }
	        }));
	      }

	      if (childrenCount !== spec.slidesToShow) {
	        key = childrenCount + index;
	        if (key < endIndex) {
	          child = elem;
	        }
	        postCloneSlides.push(_react2.default.cloneElement(child, {
	          key: 'postcloned' + getKey(child, key),
	          'data-index': key,
	          tabIndex: '-1',
	          className: (0, _classnames2.default)(getSlideClasses(_extends({}, spec, { index: key })), slideClass),
	          style: _extends({}, child.props.style || {}, childStyle),
	          onClick: function onClick(e) {
	            child.props && child.props.onClick && child.props.onClick(e);
	            if (spec.focusOnSelect) {
	              spec.focusOnSelect(childOnClickOptions);
	            }
	          }
	        }));
	      }
	    }
	  });

	  if (spec.rtl) {
	    return preCloneSlides.concat(slides, postCloneSlides).reverse();
	  } else {
	    return preCloneSlides.concat(slides, postCloneSlides);
	  }
	};

	var Track = exports.Track = function (_React$Component) {
	  _inherits(Track, _React$Component);

	  function Track() {
	    _classCallCheck(this, Track);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Track.prototype.render = function render() {
	    var slides = renderSlides(this.props);
	    var _props = this.props,
	        onMouseEnter = _props.onMouseEnter,
	        onMouseOver = _props.onMouseOver,
	        onMouseLeave = _props.onMouseLeave;

	    var mouseEvents = { onMouseEnter: onMouseEnter, onMouseOver: onMouseOver, onMouseLeave: onMouseLeave };
	    return _react2.default.createElement(
	      'div',
	      _extends({ className: 'slick-track', style: this.props.trackStyle }, mouseEvents),
	      slides
	    );
	  };

	  return Track;
	}(_react2.default.Component);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Dots = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var getDotCount = function getDotCount(spec) {
	  var dots;

	  if (spec.infinite) {
	    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
	  } else {
	    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
	  }

	  return dots;
	};

	var Dots = exports.Dots = function (_React$Component) {
	  _inherits(Dots, _React$Component);

	  function Dots() {
	    _classCallCheck(this, Dots);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Dots.prototype.clickHandler = function clickHandler(options, e) {
	    // In Autoplay the focus stays on clicked button even after transition
	    // to next slide. That only goes away by click somewhere outside
	    e.preventDefault();
	    this.props.clickHandler(options);
	  };

	  Dots.prototype.render = function render() {
	    var _this2 = this;

	    var dotCount = getDotCount({
	      slideCount: this.props.slideCount,
	      slidesToScroll: this.props.slidesToScroll,
	      slidesToShow: this.props.slidesToShow,
	      infinite: this.props.infinite
	    });

	    // Apply join & split to Array to pre-fill it for IE8
	    //
	    // Credit: http://stackoverflow.com/a/13735425/1849458
	    var _props = this.props,
	        onMouseEnter = _props.onMouseEnter,
	        onMouseOver = _props.onMouseOver,
	        onMouseLeave = _props.onMouseLeave;

	    var mouseEvents = { onMouseEnter: onMouseEnter, onMouseOver: onMouseOver, onMouseLeave: onMouseLeave };
	    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {

	      var leftBound = i * _this2.props.slidesToScroll;
	      var rightBound = i * _this2.props.slidesToScroll + (_this2.props.slidesToScroll - 1);
	      var className = (0, _classnames2.default)({
	        'slick-active': _this2.props.currentSlide >= leftBound && _this2.props.currentSlide <= rightBound
	      });

	      var dotOptions = {
	        message: 'dots',
	        index: i,
	        slidesToScroll: _this2.props.slidesToScroll,
	        currentSlide: _this2.props.currentSlide
	      };

	      var onClick = _this2.clickHandler.bind(_this2, dotOptions);
	      return _react2.default.createElement(
	        'li',
	        { key: i, className: className },
	        _react2.default.cloneElement(_this2.props.customPaging(i), { onClick: onClick })
	      );
	    });

	    return _react2.default.cloneElement(this.props.appendDots(dots), _extends({ className: this.props.dotsClass }, mouseEvents));
	  };

	  return Dots;
	}(_react2.default.Component);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.NextArrow = exports.PrevArrow = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(14);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _innerSliderUtils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PrevArrow = exports.PrevArrow = function (_React$Component) {
	  _inherits(PrevArrow, _React$Component);

	  function PrevArrow() {
	    _classCallCheck(this, PrevArrow);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  PrevArrow.prototype.clickHandler = function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  };

	  PrevArrow.prototype.render = function render() {
	    var prevClasses = { 'slick-arrow': true, 'slick-prev': true };
	    var prevHandler = this.clickHandler.bind(this, { message: 'previous' });

	    if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
	      prevClasses['slick-disabled'] = true;
	      prevHandler = null;
	    }

	    var prevArrowProps = {
	      key: '0',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(prevClasses),
	      style: { display: 'block' },
	      onClick: prevHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var prevArrow = void 0;

	    if (this.props.prevArrow) {
	      prevArrow = _react2.default.cloneElement(this.props.prevArrow, _extends({}, prevArrowProps, customProps));
	    } else {
	      prevArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '0', type: 'button' }, prevArrowProps),
	        ' Previous'
	      );
	    }

	    return prevArrow;
	  };

	  return PrevArrow;
	}(_react2.default.Component);

	var NextArrow = exports.NextArrow = function (_React$Component2) {
	  _inherits(NextArrow, _React$Component2);

	  function NextArrow() {
	    _classCallCheck(this, NextArrow);

	    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
	  }

	  NextArrow.prototype.clickHandler = function clickHandler(options, e) {
	    if (e) {
	      e.preventDefault();
	    }
	    this.props.clickHandler(options, e);
	  };

	  NextArrow.prototype.render = function render() {
	    var nextClasses = { 'slick-arrow': true, 'slick-next': true };
	    var nextHandler = this.clickHandler.bind(this, { message: 'next' });

	    if (!(0, _innerSliderUtils.canGoNext)(this.props)) {
	      nextClasses['slick-disabled'] = true;
	      nextHandler = null;
	    }

	    var nextArrowProps = {
	      key: '1',
	      'data-role': 'none',
	      className: (0, _classnames2.default)(nextClasses),
	      style: { display: 'block' },
	      onClick: nextHandler
	    };
	    var customProps = {
	      currentSlide: this.props.currentSlide,
	      slideCount: this.props.slideCount
	    };
	    var nextArrow = void 0;

	    if (this.props.nextArrow) {
	      nextArrow = _react2.default.cloneElement(this.props.nextArrow, _extends({}, nextArrowProps, customProps));
	    } else {
	      nextArrow = _react2.default.createElement(
	        'button',
	        _extends({ key: '1', type: 'button' }, nextArrowProps),
	        ' Next'
	      );
	    }

	    return nextArrow;
	  };

	  return NextArrow;
	}(_react2.default.Component);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.ResizeObserver = factory());
	}(this, (function () { 'use strict';

	/**
	 * A collection of shims that provide minimal functionality of the ES6 collections.
	 *
	 * These implementations are not meant to be used outside of the ResizeObserver
	 * modules as they cover only a limited range of use cases.
	 */
	/* eslint-disable require-jsdoc, valid-jsdoc */
	var MapShim = (function () {
	    if (typeof Map !== 'undefined') {
	        return Map;
	    }

	    /**
	     * Returns index in provided array that matches the specified key.
	     *
	     * @param {Array<Array>} arr
	     * @param {*} key
	     * @returns {number}
	     */
	    function getIndex(arr, key) {
	        var result = -1;

	        arr.some(function (entry, index) {
	            if (entry[0] === key) {
	                result = index;

	                return true;
	            }

	            return false;
	        });

	        return result;
	    }

	    return (function () {
	        function anonymous() {
	            this.__entries__ = [];
	        }

	        var prototypeAccessors = { size: { configurable: true } };

	        /**
	         * @returns {boolean}
	         */
	        prototypeAccessors.size.get = function () {
	            return this.__entries__.length;
	        };

	        /**
	         * @param {*} key
	         * @returns {*}
	         */
	        anonymous.prototype.get = function (key) {
	            var index = getIndex(this.__entries__, key);
	            var entry = this.__entries__[index];

	            return entry && entry[1];
	        };

	        /**
	         * @param {*} key
	         * @param {*} value
	         * @returns {void}
	         */
	        anonymous.prototype.set = function (key, value) {
	            var index = getIndex(this.__entries__, key);

	            if (~index) {
	                this.__entries__[index][1] = value;
	            } else {
	                this.__entries__.push([key, value]);
	            }
	        };

	        /**
	         * @param {*} key
	         * @returns {void}
	         */
	        anonymous.prototype.delete = function (key) {
	            var entries = this.__entries__;
	            var index = getIndex(entries, key);

	            if (~index) {
	                entries.splice(index, 1);
	            }
	        };

	        /**
	         * @param {*} key
	         * @returns {void}
	         */
	        anonymous.prototype.has = function (key) {
	            return !!~getIndex(this.__entries__, key);
	        };

	        /**
	         * @returns {void}
	         */
	        anonymous.prototype.clear = function () {
	            this.__entries__.splice(0);
	        };

	        /**
	         * @param {Function} callback
	         * @param {*} [ctx=null]
	         * @returns {void}
	         */
	        anonymous.prototype.forEach = function (callback, ctx) {
	            var this$1 = this;
	            if ( ctx === void 0 ) ctx = null;

	            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
	                var entry = list[i];

	                callback.call(ctx, entry[1], entry[0]);
	            }
	        };

	        Object.defineProperties( anonymous.prototype, prototypeAccessors );

	        return anonymous;
	    }());
	})();

	/**
	 * Detects whether window and document objects are available in current environment.
	 */
	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

	// Returns global object of a current environment.
	var global$1 = (function () {
	    if (typeof global !== 'undefined' && global.Math === Math) {
	        return global;
	    }

	    if (typeof self !== 'undefined' && self.Math === Math) {
	        return self;
	    }

	    if (typeof window !== 'undefined' && window.Math === Math) {
	        return window;
	    }

	    // eslint-disable-next-line no-new-func
	    return Function('return this')();
	})();

	/**
	 * A shim for the requestAnimationFrame which falls back to the setTimeout if
	 * first one is not supported.
	 *
	 * @returns {number} Requests' identifier.
	 */
	var requestAnimationFrame$1 = (function () {
	    if (typeof requestAnimationFrame === 'function') {
	        // It's required to use a bounded function because IE sometimes throws
	        // an "Invalid calling object" error if rAF is invoked without the global
	        // object on the left hand side.
	        return requestAnimationFrame.bind(global$1);
	    }

	    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
	})();

	// Defines minimum timeout before adding a trailing call.
	var trailingTimeout = 2;

	/**
	 * Creates a wrapper function which ensures that provided callback will be
	 * invoked only once during the specified delay period.
	 *
	 * @param {Function} callback - Function to be invoked after the delay period.
	 * @param {number} delay - Delay after which to invoke callback.
	 * @returns {Function}
	 */
	var throttle = function (callback, delay) {
	    var leadingCall = false,
	        trailingCall = false,
	        lastCallTime = 0;

	    /**
	     * Invokes the original callback function and schedules new invocation if
	     * the "proxy" was called during current request.
	     *
	     * @returns {void}
	     */
	    function resolvePending() {
	        if (leadingCall) {
	            leadingCall = false;

	            callback();
	        }

	        if (trailingCall) {
	            proxy();
	        }
	    }

	    /**
	     * Callback invoked after the specified delay. It will further postpone
	     * invocation of the original function delegating it to the
	     * requestAnimationFrame.
	     *
	     * @returns {void}
	     */
	    function timeoutCallback() {
	        requestAnimationFrame$1(resolvePending);
	    }

	    /**
	     * Schedules invocation of the original function.
	     *
	     * @returns {void}
	     */
	    function proxy() {
	        var timeStamp = Date.now();

	        if (leadingCall) {
	            // Reject immediately following calls.
	            if (timeStamp - lastCallTime < trailingTimeout) {
	                return;
	            }

	            // Schedule new call to be in invoked when the pending one is resolved.
	            // This is important for "transitions" which never actually start
	            // immediately so there is a chance that we might miss one if change
	            // happens amids the pending invocation.
	            trailingCall = true;
	        } else {
	            leadingCall = true;
	            trailingCall = false;

	            setTimeout(timeoutCallback, delay);
	        }

	        lastCallTime = timeStamp;
	    }

	    return proxy;
	};

	// Minimum delay before invoking the update of observers.
	var REFRESH_DELAY = 20;

	// A list of substrings of CSS properties used to find transition events that
	// might affect dimensions of observed elements.
	var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

	// Check if MutationObserver is available.
	var mutationObserverSupported = typeof MutationObserver !== 'undefined';

	/**
	 * Singleton controller class which handles updates of ResizeObserver instances.
	 */
	var ResizeObserverController = function() {
	    this.connected_ = false;
	    this.mutationEventsAdded_ = false;
	    this.mutationsObserver_ = null;
	    this.observers_ = [];

	    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
	    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
	};

	/**
	 * Adds observer to observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be added.
	 * @returns {void}
	 */


	/**
	 * Holds reference to the controller's instance.
	 *
	 * @private {ResizeObserverController}
	 */


	/**
	 * Keeps reference to the instance of MutationObserver.
	 *
	 * @private {MutationObserver}
	 */

	/**
	 * Indicates whether DOM listeners have been added.
	 *
	 * @private {boolean}
	 */
	ResizeObserverController.prototype.addObserver = function (observer) {
	    if (!~this.observers_.indexOf(observer)) {
	        this.observers_.push(observer);
	    }

	    // Add listeners if they haven't been added yet.
	    if (!this.connected_) {
	        this.connect_();
	    }
	};

	/**
	 * Removes observer from observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be removed.
	 * @returns {void}
	 */
	ResizeObserverController.prototype.removeObserver = function (observer) {
	    var observers = this.observers_;
	    var index = observers.indexOf(observer);

	    // Remove observer if it's present in registry.
	    if (~index) {
	        observers.splice(index, 1);
	    }

	    // Remove listeners if controller has no connected observers.
	    if (!observers.length && this.connected_) {
	        this.disconnect_();
	    }
	};

	/**
	 * Invokes the update of observers. It will continue running updates insofar
	 * it detects changes.
	 *
	 * @returns {void}
	 */
	ResizeObserverController.prototype.refresh = function () {
	    var changesDetected = this.updateObservers_();

	    // Continue running updates if changes have been detected as there might
	    // be future ones caused by CSS transitions.
	    if (changesDetected) {
	        this.refresh();
	    }
	};

	/**
	 * Updates every observer from observers list and notifies them of queued
	 * entries.
	 *
	 * @private
	 * @returns {boolean} Returns "true" if any observer has detected changes in
	 *  dimensions of it's elements.
	 */
	ResizeObserverController.prototype.updateObservers_ = function () {
	    // Collect observers that have active observations.
	    var activeObservers = this.observers_.filter(function (observer) {
	        return observer.gatherActive(), observer.hasActive();
	    });

	    // Deliver notifications in a separate cycle in order to avoid any
	    // collisions between observers, e.g. when multiple instances of
	    // ResizeObserver are tracking the same element and the callback of one
	    // of them changes content dimensions of the observed target. Sometimes
	    // this may result in notifications being blocked for the rest of observers.
	    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

	    return activeObservers.length > 0;
	};

	/**
	 * Initializes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.connect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already added.
	    if (!isBrowser || this.connected_) {
	        return;
	    }

	    // Subscription to the "Transitionend" event is used as a workaround for
	    // delayed transitions. This way it's possible to capture at least the
	    // final state of an element.
	    document.addEventListener('transitionend', this.onTransitionEnd_);

	    window.addEventListener('resize', this.refresh);

	    if (mutationObserverSupported) {
	        this.mutationsObserver_ = new MutationObserver(this.refresh);

	        this.mutationsObserver_.observe(document, {
	            attributes: true,
	            childList: true,
	            characterData: true,
	            subtree: true
	        });
	    } else {
	        document.addEventListener('DOMSubtreeModified', this.refresh);

	        this.mutationEventsAdded_ = true;
	    }

	    this.connected_ = true;
	};

	/**
	 * Removes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.disconnect_ = function () {
	    // Do nothing if running in a non-browser environment or if listeners
	    // have been already removed.
	    if (!isBrowser || !this.connected_) {
	        return;
	    }

	    document.removeEventListener('transitionend', this.onTransitionEnd_);
	    window.removeEventListener('resize', this.refresh);

	    if (this.mutationsObserver_) {
	        this.mutationsObserver_.disconnect();
	    }

	    if (this.mutationEventsAdded_) {
	        document.removeEventListener('DOMSubtreeModified', this.refresh);
	    }

	    this.mutationsObserver_ = null;
	    this.mutationEventsAdded_ = false;
	    this.connected_ = false;
	};

	/**
	 * "Transitionend" event handler.
	 *
	 * @private
	 * @param {TransitionEvent} event
	 * @returns {void}
	 */
	ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
	        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

	    // Detect whether transition may affect dimensions of an element.
	    var isReflowProperty = transitionKeys.some(function (key) {
	        return !!~propertyName.indexOf(key);
	    });

	    if (isReflowProperty) {
	        this.refresh();
	    }
	};

	/**
	 * Returns instance of the ResizeObserverController.
	 *
	 * @returns {ResizeObserverController}
	 */
	ResizeObserverController.getInstance = function () {
	    if (!this.instance_) {
	        this.instance_ = new ResizeObserverController();
	    }

	    return this.instance_;
	};

	ResizeObserverController.instance_ = null;

	/**
	 * Defines non-writable/enumerable properties of the provided target object.
	 *
	 * @param {Object} target - Object for which to define properties.
	 * @param {Object} props - Properties to be defined.
	 * @returns {Object} Target object.
	 */
	var defineConfigurable = (function (target, props) {
	    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
	        var key = list[i];

	        Object.defineProperty(target, key, {
	            value: props[key],
	            enumerable: false,
	            writable: false,
	            configurable: true
	        });
	    }

	    return target;
	});

	/**
	 * Returns the global object associated with provided element.
	 *
	 * @param {Object} target
	 * @returns {Object}
	 */
	var getWindowOf = (function (target) {
	    // Assume that the element is an instance of Node, which means that it
	    // has the "ownerDocument" property from which we can retrieve a
	    // corresponding global object.
	    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

	    // Return the local global object if it's not possible extract one from
	    // provided element.
	    return ownerGlobal || global$1;
	});

	// Placeholder of an empty content rectangle.
	var emptyRect = createRectInit(0, 0, 0, 0);

	/**
	 * Converts provided string to a number.
	 *
	 * @param {number|string} value
	 * @returns {number}
	 */
	function toFloat(value) {
	    return parseFloat(value) || 0;
	}

	/**
	 * Extracts borders size from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @param {...string} positions - Borders positions (top, right, ...)
	 * @returns {number}
	 */
	function getBordersSize(styles) {
	    var positions = [], len = arguments.length - 1;
	    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

	    return positions.reduce(function (size, position) {
	        var value = styles['border-' + position + '-width'];

	        return size + toFloat(value);
	    }, 0);
	}

	/**
	 * Extracts paddings sizes from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @returns {Object} Paddings box.
	 */
	function getPaddings(styles) {
	    var positions = ['top', 'right', 'bottom', 'left'];
	    var paddings = {};

	    for (var i = 0, list = positions; i < list.length; i += 1) {
	        var position = list[i];

	        var value = styles['padding-' + position];

	        paddings[position] = toFloat(value);
	    }

	    return paddings;
	}

	/**
	 * Calculates content rectangle of provided SVG element.
	 *
	 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
	 *      to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getSVGContentRect(target) {
	    var bbox = target.getBBox();

	    return createRectInit(0, 0, bbox.width, bbox.height);
	}

	/**
	 * Calculates content rectangle of provided HTMLElement.
	 *
	 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
	 * @returns {DOMRectInit}
	 */
	function getHTMLElementContentRect(target) {
	    // Client width & height properties can't be
	    // used exclusively as they provide rounded values.
	    var clientWidth = target.clientWidth;
	    var clientHeight = target.clientHeight;

	    // By this condition we can catch all non-replaced inline, hidden and
	    // detached elements. Though elements with width & height properties less
	    // than 0.5 will be discarded as well.
	    //
	    // Without it we would need to implement separate methods for each of
	    // those cases and it's not possible to perform a precise and performance
	    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
	    // gives wrong results for elements with width & height less than 0.5.
	    if (!clientWidth && !clientHeight) {
	        return emptyRect;
	    }

	    var styles = getWindowOf(target).getComputedStyle(target);
	    var paddings = getPaddings(styles);
	    var horizPad = paddings.left + paddings.right;
	    var vertPad = paddings.top + paddings.bottom;

	    // Computed styles of width & height are being used because they are the
	    // only dimensions available to JS that contain non-rounded values. It could
	    // be possible to utilize the getBoundingClientRect if only it's data wasn't
	    // affected by CSS transformations let alone paddings, borders and scroll bars.
	    var width = toFloat(styles.width),
	        height = toFloat(styles.height);

	    // Width & height include paddings and borders when the 'border-box' box
	    // model is applied (except for IE).
	    if (styles.boxSizing === 'border-box') {
	        // Following conditions are required to handle Internet Explorer which
	        // doesn't include paddings and borders to computed CSS dimensions.
	        //
	        // We can say that if CSS dimensions + paddings are equal to the "client"
	        // properties then it's either IE, and thus we don't need to subtract
	        // anything, or an element merely doesn't have paddings/borders styles.
	        if (Math.round(width + horizPad) !== clientWidth) {
	            width -= getBordersSize(styles, 'left', 'right') + horizPad;
	        }

	        if (Math.round(height + vertPad) !== clientHeight) {
	            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
	        }
	    }

	    // Following steps can't be applied to the document's root element as its
	    // client[Width/Height] properties represent viewport area of the window.
	    // Besides, it's as well not necessary as the <html> itself neither has
	    // rendered scroll bars nor it can be clipped.
	    if (!isDocumentElement(target)) {
	        // In some browsers (only in Firefox, actually) CSS width & height
	        // include scroll bars size which can be removed at this step as scroll
	        // bars are the only difference between rounded dimensions + paddings
	        // and "client" properties, though that is not always true in Chrome.
	        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
	        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

	        // Chrome has a rather weird rounding of "client" properties.
	        // E.g. for an element with content width of 314.2px it sometimes gives
	        // the client width of 315px and for the width of 314.7px it may give
	        // 314px. And it doesn't happen all the time. So just ignore this delta
	        // as a non-relevant.
	        if (Math.abs(vertScrollbar) !== 1) {
	            width -= vertScrollbar;
	        }

	        if (Math.abs(horizScrollbar) !== 1) {
	            height -= horizScrollbar;
	        }
	    }

	    return createRectInit(paddings.left, paddings.top, width, height);
	}

	/**
	 * Checks whether provided element is an instance of the SVGGraphicsElement.
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	var isSVGGraphicsElement = (function () {
	    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
	    // interface.
	    if (typeof SVGGraphicsElement !== 'undefined') {
	        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
	    }

	    // If it's so, then check that element is at least an instance of the
	    // SVGElement and that it has the "getBBox" method.
	    // eslint-disable-next-line no-extra-parens
	    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
	})();

	/**
	 * Checks whether provided element is a document element (<html>).
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	function isDocumentElement(target) {
	    return target === getWindowOf(target).document.documentElement;
	}

	/**
	 * Calculates an appropriate content rectangle for provided html or svg element.
	 *
	 * @param {Element} target - Element content rectangle of which needs to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getContentRect(target) {
	    if (!isBrowser) {
	        return emptyRect;
	    }

	    if (isSVGGraphicsElement(target)) {
	        return getSVGContentRect(target);
	    }

	    return getHTMLElementContentRect(target);
	}

	/**
	 * Creates rectangle with an interface of the DOMRectReadOnly.
	 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
	 *
	 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
	 * @returns {DOMRectReadOnly}
	 */
	function createReadOnlyRect(ref) {
	    var x = ref.x;
	    var y = ref.y;
	    var width = ref.width;
	    var height = ref.height;

	    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
	    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
	    var rect = Object.create(Constr.prototype);

	    // Rectangle's properties are not writable and non-enumerable.
	    defineConfigurable(rect, {
	        x: x, y: y, width: width, height: height,
	        top: y,
	        right: x + width,
	        bottom: height + y,
	        left: x
	    });

	    return rect;
	}

	/**
	 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
	 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 * @param {number} width - Rectangle's width.
	 * @param {number} height - Rectangle's height.
	 * @returns {DOMRectInit}
	 */
	function createRectInit(x, y, width, height) {
	    return { x: x, y: y, width: width, height: height };
	}

	/**
	 * Class that is responsible for computations of the content rectangle of
	 * provided DOM element and for keeping track of it's changes.
	 */
	var ResizeObservation = function(target) {
	    this.broadcastWidth = 0;
	    this.broadcastHeight = 0;
	    this.contentRect_ = createRectInit(0, 0, 0, 0);

	    this.target = target;
	};

	/**
	 * Updates content rectangle and tells whether it's width or height properties
	 * have changed since the last broadcast.
	 *
	 * @returns {boolean}
	 */


	/**
	 * Reference to the last observed content rectangle.
	 *
	 * @private {DOMRectInit}
	 */


	/**
	 * Broadcasted width of content rectangle.
	 *
	 * @type {number}
	 */
	ResizeObservation.prototype.isActive = function () {
	    var rect = getContentRect(this.target);

	    this.contentRect_ = rect;

	    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
	};

	/**
	 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
	 * from the corresponding properties of the last observed content rectangle.
	 *
	 * @returns {DOMRectInit} Last observed content rectangle.
	 */
	ResizeObservation.prototype.broadcastRect = function () {
	    var rect = this.contentRect_;

	    this.broadcastWidth = rect.width;
	    this.broadcastHeight = rect.height;

	    return rect;
	};

	var ResizeObserverEntry = function(target, rectInit) {
	    var contentRect = createReadOnlyRect(rectInit);

	    // According to the specification following properties are not writable
	    // and are also not enumerable in the native implementation.
	    //
	    // Property accessors are not being used as they'd require to define a
	    // private WeakMap storage which may cause memory leaks in browsers that
	    // don't support this type of collections.
	    defineConfigurable(this, { target: target, contentRect: contentRect });
	};

	var ResizeObserverSPI = function(callback, controller, callbackCtx) {
	    this.activeObservations_ = [];
	    this.observations_ = new MapShim();

	    if (typeof callback !== 'function') {
	        throw new TypeError('The callback provided as parameter 1 is not a function.');
	    }

	    this.callback_ = callback;
	    this.controller_ = controller;
	    this.callbackCtx_ = callbackCtx;
	};

	/**
	 * Starts observing provided element.
	 *
	 * @param {Element} target - Element to be observed.
	 * @returns {void}
	 */


	/**
	 * Registry of the ResizeObservation instances.
	 *
	 * @private {Map<Element, ResizeObservation>}
	 */


	/**
	 * Public ResizeObserver instance which will be passed to the callback
	 * function and used as a value of it's "this" binding.
	 *
	 * @private {ResizeObserver}
	 */

	/**
	 * Collection of resize observations that have detected changes in dimensions
	 * of elements.
	 *
	 * @private {Array<ResizeObservation>}
	 */
	ResizeObserverSPI.prototype.observe = function (target) {
	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    // Do nothing if current environment doesn't have the Element interface.
	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	        return;
	    }

	    if (!(target instanceof getWindowOf(target).Element)) {
	        throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_;

	    // Do nothing if element is already being observed.
	    if (observations.has(target)) {
	        return;
	    }

	    observations.set(target, new ResizeObservation(target));

	    this.controller_.addObserver(this);

	    // Force the update of observations.
	    this.controller_.refresh();
	};

	/**
	 * Stops observing provided element.
	 *
	 * @param {Element} target - Element to stop observing.
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.unobserve = function (target) {
	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    // Do nothing if current environment doesn't have the Element interface.
	    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
	        return;
	    }

	    if (!(target instanceof getWindowOf(target).Element)) {
	        throw new TypeError('parameter 1 is not of type "Element".');
	    }

	    var observations = this.observations_;

	    // Do nothing if element is not being observed.
	    if (!observations.has(target)) {
	        return;
	    }

	    observations.delete(target);

	    if (!observations.size) {
	        this.controller_.removeObserver(this);
	    }
	};

	/**
	 * Stops observing all elements.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.disconnect = function () {
	    this.clearActive();
	    this.observations_.clear();
	    this.controller_.removeObserver(this);
	};

	/**
	 * Collects observation instances the associated element of which has changed
	 * it's content rectangle.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.gatherActive = function () {
	        var this$1 = this;

	    this.clearActive();

	    this.observations_.forEach(function (observation) {
	        if (observation.isActive()) {
	            this$1.activeObservations_.push(observation);
	        }
	    });
	};

	/**
	 * Invokes initial callback function with a list of ResizeObserverEntry
	 * instances collected from active resize observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.broadcastActive = function () {
	    // Do nothing if observer doesn't have active observations.
	    if (!this.hasActive()) {
	        return;
	    }

	    var ctx = this.callbackCtx_;

	    // Create ResizeObserverEntry instance for every active observation.
	    var entries = this.activeObservations_.map(function (observation) {
	        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
	    });

	    this.callback_.call(ctx, entries, ctx);
	    this.clearActive();
	};

	/**
	 * Clears the collection of active observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.clearActive = function () {
	    this.activeObservations_.splice(0);
	};

	/**
	 * Tells whether observer has active observations.
	 *
	 * @returns {boolean}
	 */
	ResizeObserverSPI.prototype.hasActive = function () {
	    return this.activeObservations_.length > 0;
	};

	// Registry of internal observers. If WeakMap is not available use current shim
	// for the Map collection as it has all required methods and because WeakMap
	// can't be fully polyfilled anyway.
	var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

	/**
	 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
	 * exposing only those methods and properties that are defined in the spec.
	 */
	var ResizeObserver = function(callback) {
	    if (!(this instanceof ResizeObserver)) {
	        throw new TypeError('Cannot call a class as a function.');
	    }
	    if (!arguments.length) {
	        throw new TypeError('1 argument required, but only 0 present.');
	    }

	    var controller = ResizeObserverController.getInstance();
	    var observer = new ResizeObserverSPI(callback, controller, this);

	    observers.set(this, observer);
	};

	// Expose public methods of ResizeObserver.
	['observe', 'unobserve', 'disconnect'].forEach(function (method) {
	    ResizeObserver.prototype[method] = function () {
	        return (ref = observers.get(this))[method].apply(ref, arguments);
	        var ref;
	    };
	});

	var index = (function () {
	    // Export existing implementation if available.
	    if (typeof global$1.ResizeObserver !== 'undefined') {
	        return global$1.ResizeObserver;
	    }

	    return ResizeObserver;
	})();

	return index;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var camel2hyphen = __webpack_require__(21);

	var isDimension = function (feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};

	var obj2mq = function (obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length-1) {
	      mq += ' and '
	    }
	  });
	  return mq;
	};

	var json2mq = function (query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length-1) {
	        mq += ', '
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};

	module.exports = json2mq;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	var camel2hyphen = function (str) {
	  return str
	          .replace(/[A-Z]/g, function (match) {
	            return '-' + match.toLowerCase();
	          })
	          .toLowerCase();
	};

	module.exports = camel2hyphen;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQueryDispatch = __webpack_require__(24);
	module.exports = new MediaQueryDispatch();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQuery = __webpack_require__(25);
	var Util = __webpack_require__(27);
	var each = Util.each;
	var isFunction = Util.isFunction;
	var isArray = Util.isArray;

	/**
	 * Allows for registration of query handlers.
	 * Manages the query handler's state and is responsible for wiring up browser events
	 *
	 * @constructor
	 */
	function MediaQueryDispatch () {
	    if(!window.matchMedia) {
	        throw new Error('matchMedia not present, legacy browsers require a polyfill');
	    }

	    this.queries = {};
	    this.browserIsIncapable = !window.matchMedia('only all').matches;
	}

	MediaQueryDispatch.prototype = {

	    constructor : MediaQueryDispatch,

	    /**
	     * Registers a handler for the given media query
	     *
	     * @param {string} q the media query
	     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	     * @param {function} options.match fired when query matched
	     * @param {function} [options.unmatch] fired when a query is no longer matched
	     * @param {function} [options.setup] fired when handler first triggered
	     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	     */
	    register : function(q, options, shouldDegrade) {
	        var queries         = this.queries,
	            isUnconditional = shouldDegrade && this.browserIsIncapable;

	        if(!queries[q]) {
	            queries[q] = new MediaQuery(q, isUnconditional);
	        }

	        //normalise to object in an array
	        if(isFunction(options)) {
	            options = { match : options };
	        }
	        if(!isArray(options)) {
	            options = [options];
	        }
	        each(options, function(handler) {
	            if (isFunction(handler)) {
	                handler = { match : handler };
	            }
	            queries[q].addHandler(handler);
	        });

	        return this;
	    },

	    /**
	     * unregisters a query and all it's handlers, or a specific handler for a query
	     *
	     * @param {string} q the media query to target
	     * @param {object || function} [handler] specific handler to unregister
	     */
	    unregister : function(q, handler) {
	        var query = this.queries[q];

	        if(query) {
	            if(handler) {
	                query.removeHandler(handler);
	            }
	            else {
	                query.clear();
	                delete this.queries[q];
	            }
	        }

	        return this;
	    }
	};

	module.exports = MediaQueryDispatch;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var QueryHandler = __webpack_require__(26);
	var each = __webpack_require__(27).each;

	/**
	 * Represents a single media query, manages it's state and registered handlers for this query
	 *
	 * @constructor
	 * @param {string} query the media query string
	 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	 */
	function MediaQuery(query, isUnconditional) {
	    this.query = query;
	    this.isUnconditional = isUnconditional;
	    this.handlers = [];
	    this.mql = window.matchMedia(query);

	    var self = this;
	    this.listener = function(mql) {
	        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
	        self.mql = mql.currentTarget || mql;
	        self.assess();
	    };
	    this.mql.addListener(this.listener);
	}

	MediaQuery.prototype = {

	    constuctor : MediaQuery,

	    /**
	     * add a handler for this query, triggering if already active
	     *
	     * @param {object} handler
	     * @param {function} handler.match callback for when query is activated
	     * @param {function} [handler.unmatch] callback for when query is deactivated
	     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	     */
	    addHandler : function(handler) {
	        var qh = new QueryHandler(handler);
	        this.handlers.push(qh);

	        this.matches() && qh.on();
	    },

	    /**
	     * removes the given handler from the collection, and calls it's destroy methods
	     *
	     * @param {object || function} handler the handler to remove
	     */
	    removeHandler : function(handler) {
	        var handlers = this.handlers;
	        each(handlers, function(h, i) {
	            if(h.equals(handler)) {
	                h.destroy();
	                return !handlers.splice(i,1); //remove from array and exit each early
	            }
	        });
	    },

	    /**
	     * Determine whether the media query should be considered a match
	     *
	     * @return {Boolean} true if media query can be considered a match, false otherwise
	     */
	    matches : function() {
	        return this.mql.matches || this.isUnconditional;
	    },

	    /**
	     * Clears all handlers and unbinds events
	     */
	    clear : function() {
	        each(this.handlers, function(handler) {
	            handler.destroy();
	        });
	        this.mql.removeListener(this.listener);
	        this.handlers.length = 0; //clear array
	    },

	    /*
	        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	        */
	    assess : function() {
	        var action = this.matches() ? 'on' : 'off';

	        each(this.handlers, function(handler) {
	            handler[action]();
	        });
	    }
	};

	module.exports = MediaQuery;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	/**
	 * Delegate to handle a media query being matched and unmatched.
	 *
	 * @param {object} options
	 * @param {function} options.match callback for when the media query is matched
	 * @param {function} [options.unmatch] callback for when the media query is unmatched
	 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	 * @constructor
	 */
	function QueryHandler(options) {
	    this.options = options;
	    !options.deferSetup && this.setup();
	}

	QueryHandler.prototype = {

	    constructor : QueryHandler,

	    /**
	     * coordinates setup of the handler
	     *
	     * @function
	     */
	    setup : function() {
	        if(this.options.setup) {
	            this.options.setup();
	        }
	        this.initialised = true;
	    },

	    /**
	     * coordinates setup and triggering of the handler
	     *
	     * @function
	     */
	    on : function() {
	        !this.initialised && this.setup();
	        this.options.match && this.options.match();
	    },

	    /**
	     * coordinates the unmatch event for the handler
	     *
	     * @function
	     */
	    off : function() {
	        this.options.unmatch && this.options.unmatch();
	    },

	    /**
	     * called when a handler is to be destroyed.
	     * delegates to the destroy or unmatch callbacks, depending on availability.
	     *
	     * @function
	     */
	    destroy : function() {
	        this.options.destroy ? this.options.destroy() : this.off();
	    },

	    /**
	     * determines equality by reference.
	     * if object is supplied compare options, if function, compare match callback
	     *
	     * @function
	     * @param {object || function} [target] the target for comparison
	     */
	    equals : function(target) {
	        return this.options === target || this.options.match === target;
	    }

	};

	module.exports = QueryHandler;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/**
	 * Helper function for iterating over a collection
	 *
	 * @param collection
	 * @param fn
	 */
	function each(collection, fn) {
	    var i      = 0,
	        length = collection.length,
	        cont;

	    for(i; i < length; i++) {
	        cont = fn(collection[i], i);
	        if(cont === false) {
	            break; //allow early exit
	        }
	    }
	}

	/**
	 * Helper function for determining whether target object is an array
	 *
	 * @param target the object under test
	 * @return {Boolean} true if array, false otherwise
	 */
	function isArray(target) {
	    return Object.prototype.toString.apply(target) === '[object Array]';
	}

	/**
	 * Helper function for determining whether target object is a function
	 *
	 * @param target the object under test
	 * @return {Boolean} true if function, false otherwise
	 */
	function isFunction(target) {
	    return typeof target === 'function';
	}

	module.exports = {
	    isFunction : isFunction,
	    isArray : isArray,
	    each : each
	};


/***/ })
/******/ ])
});
;