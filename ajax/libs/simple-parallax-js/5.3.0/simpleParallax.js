/*!
 * simpleParallax - simpleParallax is a simple JavaScript library that gives your website parallax animations on any images, 
 * @date: 01-02-2020 23:1:26, 
 * @version: 5.3.0,
 * @link: https://simpleparallax.com/
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("simpleParallax", [], factory);
	else if(typeof exports === 'object')
		exports["simpleParallax"] = factory();
	else
		root["simpleParallax"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/helpers/viewport.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Viewport =
/*#__PURE__*/
function () {
  function Viewport() {
    _classCallCheck(this, Viewport);

    this.positions = {
      top: 0,
      bottom: 0,
      height: 0
    };
  }

  _createClass(Viewport, [{
    key: "setViewportTop",
    value: function setViewportTop(container) {
      // if this is a custom container, user the scrollTop
      this.positions.top = container ? container.scrollTop : window.pageYOffset;
      return this.positions;
    }
  }, {
    key: "setViewportBottom",
    value: function setViewportBottom() {
      this.positions.bottom = this.positions.top + this.positions.height;
      return this.positions;
    }
  }, {
    key: "setViewportAll",
    value: function setViewportAll(container) {
      // if this is a custom container, user the scrollTop
      this.positions.top = container ? container.scrollTop : window.pageYOffset; // if this is a custom container, get the height from the custom container itself

      this.positions.height = container ? container.clientHeight : document.documentElement.clientHeight;
      this.positions.bottom = this.positions.top + this.positions.height;
      return this.positions;
    }
  }]);

  return Viewport;
}();

var viewport = new Viewport();

// CONCATENATED MODULE: ./src/helpers/convertToArray.js
// check wether the element is a Node List, a HTML Collection or an array
// return an array of nodes
var convertToArray = function convertToArray(elements) {
  if (NodeList.prototype.isPrototypeOf(elements) || HTMLCollection.prototype.isPrototypeOf(elements)) return Array.from(elements);
  if (typeof elements === 'string' || elements instanceof String) return document.querySelectorAll(elements);
  return [elements];
};

/* harmony default export */ var helpers_convertToArray = (convertToArray);
// CONCATENATED MODULE: ./src/helpers/cssTransform.js
// Detect css transform
var cssTransform = function cssTransform() {
  var prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' ');
  var transform;
  var i = 0;

  while (transform === undefined) {
    transform = document.createElement('div').style[prefixes[i]] !== undefined ? prefixes[i] : undefined;
    i += 1;
  }

  return transform;
};

/* harmony default export */ var helpers_cssTransform = (cssTransform());
// CONCATENATED MODULE: ./src/helpers/isImageLoaded.js
// check if image is fully loaded
var isImageLoaded = function isImageLoaded(image) {
  // check if image is set as the parameter
  if (!image) {
    return false;
  } // check if image has been 100% loaded


  if (!image.complete) {
    return false;
  } // check if the image is displayed


  if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth === 0) {
    return false;
  }

  return true;
};

/* harmony default export */ var helpers_isImageLoaded = (isImageLoaded);
// CONCATENATED MODULE: ./src/instances/parallax.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function parallax_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parallax_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function parallax_createClass(Constructor, protoProps, staticProps) { if (protoProps) parallax_defineProperties(Constructor.prototype, protoProps); if (staticProps) parallax_defineProperties(Constructor, staticProps); return Constructor; }





var parallax_ParallaxInstance =
/*#__PURE__*/
function () {
  function ParallaxInstance(element, options) {
    parallax_classCallCheck(this, ParallaxInstance);

    // set the element & settings
    this.element = element;
    this.elementContainer = element;
    this.settings = options;
    this.isVisible = true;
    this.isInit = false;
    this.oldTranslateValue = -1;
    this.init = this.init.bind(this); // check if images has not been loaded yet

    if (helpers_isImageLoaded(element)) {
      this.init();
    } else {
      this.element.addEventListener('load', this.init);
    }
  }

  parallax_createClass(ParallaxInstance, [{
    key: "init",
    value: function init() {
      var _this = this;

      // for some reason, <picture> are init an infinite time on windows OS
      if (this.isInit) return; // check if element has not been already initialized with simpleParallax

      if (this.element.closest('.simpleParallax')) return;

      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // wrap the element into a div to apply overflow
        this.wrapElement(this.element);
      } // apply the transform style on the image


      this.setTransformCSS(); // get the current element offset

      this.getElementOffset(); // init the Intesection Observer

      this.intersectionObserver(); // get its translated value

      this.getTranslateValue(); // apply its translation even if not visible for the first init

      this.animate(); // if a delay has been set

      if (this.settings.delay > 0) {
        // apply a timeout to avoid buggy effect
        setTimeout(function () {
          // apply the transition style on the image
          _this.setTransitionCSS();
        }, 10);
      } // for some reason, <picture> are init an infinite time on windows OS


      this.isInit = true;
    } // if overflow option is set to false
    // wrap the element into a .simpleParallax div and apply overflow hidden to hide the image excedant (result of the scale)

  }, {
    key: "wrapElement",
    value: function wrapElement() {
      // check is current image is in a <picture> tag
      var elementToWrap = this.element.closest('picture') || this.element; // create a .simpleParallax wrapper container

      var wrapper = document.createElement('div');
      wrapper.classList.add('simpleParallax');
      wrapper.style.overflow = 'hidden'; // append the image inside the new wrapper

      elementToWrap.parentNode.insertBefore(wrapper, elementToWrap);
      wrapper.appendChild(elementToWrap);
      this.elementContainer = wrapper;
    } // unwrap the element from .simpleParallax wrapper container

  }, {
    key: "unWrapElement",
    value: function unWrapElement() {
      var wrapper = this.elementContainer;
      wrapper.replaceWith.apply(wrapper, _toConsumableArray(wrapper.childNodes));
    } // apply default style on element

  }, {
    key: "setTransformCSS",
    value: function setTransformCSS() {
      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // add scale style so the image can be translated without getting out of its container
        this.element.style[helpers_cssTransform] = "scale(".concat(this.settings.scale, ")");
      } // add will-change CSS property to improve perfomance


      this.element.style.willChange = 'transform';
    } // apply the transition effet

  }, {
    key: "setTransitionCSS",
    value: function setTransitionCSS() {
      // add transition option
      this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition);
    } // remove style of the element

  }, {
    key: "unSetStyle",
    value: function unSetStyle() {
      // remove will change inline style
      this.element.style.willChange = '';
      this.element.style[helpers_cssTransform] = '';
      this.element.style.transition = '';
    } // get the current element offset

  }, {
    key: "getElementOffset",
    value: function getElementOffset() {
      // get position of the element
      var positions = this.elementContainer.getBoundingClientRect(); // get height

      this.elementHeight = positions.height; // get offset top

      this.elementTop = positions.top + viewport.positions.top; // if there is a custom container

      if (this.settings.customContainer) {
        // we need to do some calculation to get the position from the parent rather than the viewport
        var parentPositions = this.settings.customContainer.getBoundingClientRect();
        this.elementTop = positions.top - parentPositions.top + viewport.positions.top;
      } // get offset bottom


      this.elementBottom = this.elementHeight + this.elementTop;
    } // build the Threshold array to cater change for every pixel scrolled

  }, {
    key: "buildThresholdList",
    value: function buildThresholdList() {
      var thresholds = [];

      for (var i = 1.0; i <= this.elementHeight; i++) {
        var ratio = i / this.elementHeight;
        thresholds.push(ratio);
      }

      return thresholds;
    } // create the Intersection Observer

  }, {
    key: "intersectionObserver",
    value: function intersectionObserver() {
      var options = {
        root: null,
        threshold: this.buildThresholdList()
      };
      this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), options);
      this.observer.observe(this.element);
    } // Intersection Observer Callback to set the element at visible state or not

  }, {
    key: "intersectionObserverCallback",
    value: function intersectionObserverCallback(entries) {
      for (var i = entries.length - 1; i >= 0; i--) {
        if (entries[i].isIntersecting) {
          this.isVisible = true;
        } else {
          this.isVisible = false;
        }
      }
    } // check if the current element is visible in the Viewport
    // for browser that not support Intersection Observer API

  }, {
    key: "checkIfVisible",
    value: function checkIfVisible() {
      return this.elementBottom > viewport.positions.top && this.elementTop < viewport.positions.bottom;
    } // calculate the range between image will be translated

  }, {
    key: "getRangeMax",
    value: function getRangeMax() {
      // get the real height of the image without scale
      var elementImageHeight = this.element.clientHeight; // range is calculate with the image height by the scale

      this.rangeMax = elementImageHeight * this.settings.scale - elementImageHeight;
    } // get the percentage and the translate value to apply on the element

  }, {
    key: "getTranslateValue",
    value: function getTranslateValue() {
      // calculate the % position of the element comparing to the viewport
      // rounding percentage to a 1 number float to avoid unn unnecessary calculation
      var percentage = ((viewport.positions.bottom - this.elementTop) / ((viewport.positions.height + this.elementHeight) / 100)).toFixed(1); // sometime the percentage exceeds 100 or goes below 0

      percentage = Math.min(100, Math.max(0, percentage)); // if a maxTransition has been set, we round the percentage to that number

      if (this.settings.maxTransition !== 0 && percentage > this.settings.maxTransition) {
        percentage = this.settings.maxTransition;
      } // sometime the same percentage is returned
      // if so we don't do aything


      if (this.oldPercentage === percentage) {
        return false;
      } // if not range max is set, recalculate it


      if (!this.rangeMax) {
        this.getRangeMax();
      } // transform this % into the max range of the element
      // rounding translateValue to a non float int - as minimum pixel for browser to render is 1 (no 0.5)


      this.translateValue = (percentage / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0); // sometime the same translate value is returned
      // if so we don't do aything

      if (this.oldTranslateValue === this.translateValue) {
        return false;
      } // store the current percentage


      this.oldPercentage = percentage;
      this.oldTranslateValue = this.translateValue;
      return true;
    } // animate the image

  }, {
    key: "animate",
    value: function animate() {
      var translateValueY = 0;
      var translateValueX = 0;
      var inlineCss;

      if (this.settings.orientation.includes('left') || this.settings.orientation.includes('right')) {
        // if orientation option is left or right
        // use horizontal axe - X axe
        translateValueX = "".concat(this.settings.orientation.includes('left') ? this.translateValue * -1 : this.translateValue, "px");
      }

      if (this.settings.orientation.includes('up') || this.settings.orientation.includes('down')) {
        // if orientation option is up or down
        // use vertical axe - Y axe
        translateValueY = "".concat(this.settings.orientation.includes('up') ? this.translateValue * -1 : this.translateValue, "px");
      } // set style to apply to the element


      if (this.settings.overflow === false) {
        // if overflow option is set to false
        // add the scale style
        inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0) scale(").concat(this.settings.scale, ")");
      } else {
        inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0)");
      } // add style on the element using the adequate CSS transform


      this.element.style[helpers_cssTransform] = inlineCss;
    }
  }]);

  return ParallaxInstance;
}();

/* harmony default export */ var parallax = (parallax_ParallaxInstance);
// CONCATENATED MODULE: ./src/simpleParallax.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return simpleParallax_SimpleParallax; });
function simpleParallax_toConsumableArray(arr) { return simpleParallax_arrayWithoutHoles(arr) || simpleParallax_iterableToArray(arr) || simpleParallax_nonIterableSpread(); }

function simpleParallax_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function simpleParallax_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function simpleParallax_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function simpleParallax_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function simpleParallax_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function simpleParallax_createClass(Constructor, protoProps, staticProps) { if (protoProps) simpleParallax_defineProperties(Constructor.prototype, protoProps); if (staticProps) simpleParallax_defineProperties(Constructor, staticProps); return Constructor; }




var intersectionObserverAvailable = true;
var isInit = false;
var instances = [];
var instancesLength;
var frameID;
var resizeID;

var simpleParallax_SimpleParallax =
/*#__PURE__*/
function () {
  function SimpleParallax(elements, options) {
    simpleParallax_classCallCheck(this, SimpleParallax);

    if (!elements) return;
    this.elements = helpers_convertToArray(elements);
    this.defaults = {
      delay: 0.4,
      orientation: 'up',
      scale: 1.3,
      overflow: false,
      transition: 'cubic-bezier(0,0,0,1)',
      customContainer: false,
      maxTransition: 0
    };
    this.settings = Object.assign(this.defaults, options); // check if the browser handle the Intersection Observer API

    if (!('IntersectionObserver' in window)) intersectionObserverAvailable = false;

    if (this.settings.customContainer) {
      console.log(helpers_convertToArray(this.settings.customContainer)[0]);
      this.customContainer = helpers_convertToArray(this.settings.customContainer)[0];
    }

    this.lastPosition = -1;
    this.resizeIsDone = this.resizeIsDone.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this);
    this.init();
  }

  simpleParallax_createClass(SimpleParallax, [{
    key: "init",
    value: function init() {
      var _this = this;

      viewport.setViewportAll(this.customContainer);
      instances = [].concat(simpleParallax_toConsumableArray(this.elements.map(function (element) {
        return new parallax(element, _this.settings);
      })), simpleParallax_toConsumableArray(instances)); // update the instance length

      instancesLength = instances.length; // only if this is the first simpleParallax init

      if (!isInit) {
        // init the frame
        this.proceedRequestAnimationFrame();
        window.addEventListener('resize', this.resizeIsDone);
        isInit = true;
      }
    } // wait for resize to be completely done

  }, {
    key: "resizeIsDone",
    value: function resizeIsDone() {
      clearTimeout(resizeID);
      resizeID = setTimeout(this.handleResize, 500);
    } // handle the resize process, some coordonates need to be re-calculate

  }, {
    key: "handleResize",
    value: function handleResize() {
      // re-get all the viewport positions
      viewport.setViewportAll(this.customContainer);

      for (var i = instancesLength - 1; i >= 0; i--) {
        // re-get the current element offset
        instances[i].getElementOffset(); // re-get the range if the current element

        instances[i].getRangeMax();
      } // force the request animation frame to fired


      this.lastPosition = -1;
    } // animation frame

  }, {
    key: "proceedRequestAnimationFrame",
    value: function proceedRequestAnimationFrame() {
      // get the offset top of the viewport
      viewport.setViewportTop(this.customContainer);

      if (this.lastPosition === viewport.positions.top) {
        // if last position if the same than the curent one
        // callback the animationFrame and exit the current loop
        frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
        return;
      } // get the offset bottom of the viewport


      viewport.setViewportBottom(); // proceed with the current element

      for (var i = instancesLength - 1; i >= 0; i--) {
        this.proceedElement(instances[i]);
      } // callback the animationFrame


      frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame); // store the last position

      this.lastPosition = viewport.positions.top;
    } // proceed the element

  }, {
    key: "proceedElement",
    value: function proceedElement(instance) {
      var isVisible = false; // is not support for Intersection Observer API
      // or if this is a custom container
      // use old function to check if element visible

      if (!intersectionObserverAvailable || this.customContainer) {
        isVisible = instance.checkIfVisible(); // if support
        // use response from Intersection Observer API Callback
      } else {
        isVisible = instance.isVisible;
      } // if element not visible, stop it


      if (!isVisible) return; // if percentage is equal to the last one, no need to continue

      if (!instance.getTranslateValue()) {
        return;
      } // animate the image


      instance.animate();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var instancesToDestroy = []; // remove all instances that need to be destroyed from the instances array

      instances = instances.filter(function (instance) {
        if (_this2.elements.includes(instance.element)) {
          // push instance that need to be destroyed into instancesToDestroy
          instancesToDestroy.push(instance);
          return false;
        }

        return instance;
      });

      for (var i = instancesToDestroy.length - 1; i >= 0; i--) {
        // unset style
        instancesToDestroy[i].unSetStyle();

        if (this.settings.overflow === false) {
          // if overflow option is set to false
          // unwrap the element from .simpleParallax wrapper container
          instancesToDestroy[i].unWrapElement();
        }
      } // update the instance length var


      instancesLength = instances.length; // if no instances left, remove the raf and resize event = simpleParallax fully destroyed

      if (!instancesLength) {
        // cancel the animation frame
        window.cancelAnimationFrame(frameID); // detach the resize event

        window.removeEventListener('resize', this.handleResize);
      }
    }
  }]);

  return SimpleParallax;
}();



/***/ })
/******/ ])["default"];
});