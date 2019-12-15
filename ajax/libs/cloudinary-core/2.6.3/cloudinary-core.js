/**
 * cloudinary-core.js
 * Cloudinary's JavaScript library - Version 2.6.2
 * Copyright Cloudinary
 * see https://github.com/cloudinary/cloudinary_js
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/assign"), require("lodash/cloneDeep"), require("lodash/compact"), require("lodash/difference"), require("lodash/functions"), require("lodash/identity"), require("lodash/includes"), require("lodash/isArray"), require("lodash/isElement"), require("lodash/isFunction"), require("lodash/isPlainObject"), require("lodash/isString"), require("lodash/merge"), require("lodash/trim"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/assign", "lodash/cloneDeep", "lodash/compact", "lodash/difference", "lodash/functions", "lodash/identity", "lodash/includes", "lodash/isArray", "lodash/isElement", "lodash/isFunction", "lodash/isPlainObject", "lodash/isString", "lodash/merge", "lodash/trim"], factory);
	else if(typeof exports === 'object')
		exports["cloudinary"] = factory(require("lodash/assign"), require("lodash/cloneDeep"), require("lodash/compact"), require("lodash/difference"), require("lodash/functions"), require("lodash/identity"), require("lodash/includes"), require("lodash/isArray"), require("lodash/isElement"), require("lodash/isFunction"), require("lodash/isPlainObject"), require("lodash/isString"), require("lodash/merge"), require("lodash/trim"));
	else
		root["cloudinary"] = factory(root["_"]["assign"], root["_"]["cloneDeep"], root["_"]["compact"], root["_"]["difference"], root["_"]["functions"], root["_"]["identity"], root["_"]["includes"], root["_"]["isArray"], root["_"]["isElement"], root["_"]["isFunction"], root["_"]["isPlainObject"], root["_"]["isString"], root["_"]["merge"], root["_"]["trim"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_lodash_assign__, __WEBPACK_EXTERNAL_MODULE_lodash_cloneDeep__, __WEBPACK_EXTERNAL_MODULE_lodash_compact__, __WEBPACK_EXTERNAL_MODULE_lodash_difference__, __WEBPACK_EXTERNAL_MODULE_lodash_functions__, __WEBPACK_EXTERNAL_MODULE_lodash_identity__, __WEBPACK_EXTERNAL_MODULE_lodash_includes__, __WEBPACK_EXTERNAL_MODULE_lodash_isArray__, __WEBPACK_EXTERNAL_MODULE_lodash_isElement__, __WEBPACK_EXTERNAL_MODULE_lodash_isFunction__, __WEBPACK_EXTERNAL_MODULE_lodash_isPlainObject__, __WEBPACK_EXTERNAL_MODULE_lodash_isString__, __WEBPACK_EXTERNAL_MODULE_lodash_merge__, __WEBPACK_EXTERNAL_MODULE_lodash_trim__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/namespace/cloudinary-core.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cloudinary.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/configuration.js");
/* harmony import */ var _tags_htmltag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/tags/htmltag.js");
/* harmony import */ var _tags_imagetag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/tags/imagetag.js");
/* harmony import */ var _tags_picturetag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/tags/picturetag.js");
/* harmony import */ var _tags_sourcetag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/tags/sourcetag.js");
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/transformation.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/url.js");
/* harmony import */ var _tags_videotag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/tags/videotag.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/util/lodash.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var applyBreakpoints, closestAbove, defaultBreakpoints, findContainerWidth, maxWidth, updateDpr;











defaultBreakpoints = function defaultBreakpoints(width) {
  var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return steps * Math.ceil(width / steps);
};

closestAbove = function closestAbove(list, value) {
  var i;
  i = list.length - 2;

  while (i >= 0 && list[i] >= value) {
    i--;
  }

  return list[i + 1];
};

applyBreakpoints = function applyBreakpoints(tag, width, steps, options) {
  var ref, ref1, ref2, responsive_use_breakpoints;
  responsive_use_breakpoints = (ref = (ref1 = (ref2 = options['responsive_use_breakpoints']) != null ? ref2 : options['responsive_use_stoppoints']) != null ? ref1 : this.config('responsive_use_breakpoints')) != null ? ref : this.config('responsive_use_stoppoints');

  if (!responsive_use_breakpoints || responsive_use_breakpoints === 'resize' && !options.resizing) {
    return width;
  } else {
    return this.calc_breakpoint(tag, width, steps);
  }
};

findContainerWidth = function findContainerWidth(element) {
  var containerWidth, style;
  containerWidth = 0;

  while ((element = element != null ? element.parentNode : void 0) instanceof Element && !containerWidth) {
    style = window.getComputedStyle(element);

    if (!/^inline/.test(style.display)) {
      containerWidth = Object(_util__WEBPACK_IMPORTED_MODULE_9__["width"])(element);
    }
  }

  return containerWidth;
};

updateDpr = function updateDpr(dataSrc, roundDpr) {
  return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
};

maxWidth = function maxWidth(requiredWidth, tag) {
  var imageWidth;
  imageWidth = Object(_util__WEBPACK_IMPORTED_MODULE_9__["getData"])(tag, 'width') || 0;

  if (requiredWidth > imageWidth) {
    imageWidth = requiredWidth;
    Object(_util__WEBPACK_IMPORTED_MODULE_9__["setData"])(tag, 'width', requiredWidth);
  }

  return imageWidth;
};

var Cloudinary =
/*#__PURE__*/
function () {
  /**
   * Main Cloudinary class
   * @class Cloudinary
   * @param {Object} options - options to configure Cloudinary
   * @see Configuration for more details
   * @example
   *    var cl = new cloudinary.Cloudinary( { cloud_name: "mycloud"});
   *    var imgTag = cl.image("myPicID");
   */
  function Cloudinary(options) {
    _classCallCheck(this, Cloudinary);

    var configuration;
    this.devicePixelRatioCache = {};
    this.responsiveConfig = {};
    this.responsiveResizeInitialized = false;
    configuration = new _configuration__WEBPACK_IMPORTED_MODULE_0__["default"](options); // Provided for backward compatibility

    this.config = function (newConfig, newValue) {
      return configuration.config(newConfig, newValue);
    };
    /**
     * Use \<meta\> tags in the document to configure this Cloudinary instance.
     * @return {Cloudinary} this for chaining
     */


    this.fromDocument = function () {
      configuration.fromDocument();
      return this;
    };
    /**
     * Use environment variables to configure this Cloudinary instance.
     * @return {Cloudinary} this for chaining
     */


    this.fromEnvironment = function () {
      configuration.fromEnvironment();
      return this;
    };
    /**
     * Initialize configuration.
     * @function Cloudinary#init
     * @see Configuration#init
     * @return {Cloudinary} this for chaining
     */


    this.init = function () {
      configuration.init();
      return this;
    };
  }
  /**
   * Convenience constructor
   * @param {Object} options
   * @return {Cloudinary}
   * @example cl = cloudinary.Cloudinary.new( { cloud_name: "mycloud"})
   */


  _createClass(Cloudinary, [{
    key: "url",

    /**
     * Generate an resource URL.
     * @function Cloudinary#url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @param {Object} [options.resource_type='image'] - the type of the resource
     * @return {string} The resource URL
     */
    value: function url(publicId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Object(_url__WEBPACK_IMPORTED_MODULE_6__["default"])(publicId, options, this.config());
    }
    /**
     * Generate an video resource URL.
     * @function Cloudinary#video_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video URL
     */

  }, {
    key: "video_url",
    value: function video_url(publicId, options) {
      options = Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        resource_type: 'video'
      }, options);
      return this.url(publicId, options);
    }
    /**
     * Generate an video thumbnail URL.
     * @function Cloudinary#video_thumbnail_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video thumbnail URL
     */

  }, {
    key: "video_thumbnail_url",
    value: function video_thumbnail_url(publicId, options) {
      options = Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({}, _constants__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_POSTER_OPTIONS"], options);
      return this.url(publicId, options);
    }
    /**
     * Generate a string representation of the provided transformation options.
     * @function Cloudinary#transformation_string
     * @param {Object} options - the transformation options
     * @returns {string} The transformation string
     */

  }, {
    key: "transformation_string",
    value: function transformation_string(options) {
      return new _transformation__WEBPACK_IMPORTED_MODULE_5__["default"](options).serialize();
    }
    /**
     * Generate an image tag.
     * @function Cloudinary#image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "image",
    value: function image(publicId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var client_hints, img, ref;
      img = this.imageTag(publicId, options);
      client_hints = (ref = options.client_hints != null ? options.client_hints : this.config('client_hints')) != null ? ref : false;

      if (options.src == null && !client_hints) {
        // src must be removed before creating the DOM element to avoid loading the image
        img.setAttr("src", '');
      }

      img = img.toDOM();

      if (!client_hints) {
        // cache the image src
        Object(_util__WEBPACK_IMPORTED_MODULE_9__["setData"])(img, 'src-cache', this.url(publicId, options)); // set image src taking responsiveness in account

        this.cloudinary_update(img, options);
      }

      return img;
    }
    /**
     * Creates a new ImageTag instance, configured using this own's configuration.
     * @function Cloudinary#imageTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new ImageTag instance
     * @return {ImageTag} An ImageTag that is attached (chained) to this Cloudinary instance
     */

  }, {
    key: "imageTag",
    value: function imageTag(publicId, options) {
      var tag;
      tag = new _tags_imagetag__WEBPACK_IMPORTED_MODULE_2__["default"](publicId, this.config());
      tag.transformation().fromOptions(options);
      return tag;
    }
    /**
     * Creates a new PictureTag instance, configured using this own's configuration.
     * @function Cloudinary#PictureTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new ImageTag instance
     * @return {PictureTag} An PictureTag that is attached (chained) to this Cloudinary instance
     */

  }, {
    key: "pictureTag",
    value: function pictureTag(publicId, options) {
      var tag;
      tag = new _tags_picturetag__WEBPACK_IMPORTED_MODULE_3__["default"](publicId, this.config());
      tag.transformation().fromOptions(options);
      return tag;
    }
    /**
     * Creates a new SourceTag instance, configured using this own's configuration.
     * @function Cloudinary#SourceTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new ImageTag instance
     * @return {SourceTag} An PictureTag that is attached (chained) to this Cloudinary instance
     */

  }, {
    key: "sourceTag",
    value: function sourceTag(publicId, options) {
      var tag;
      tag = new _tags_sourcetag__WEBPACK_IMPORTED_MODULE_4__["default"](publicId, this.config());
      tag.transformation().fromOptions(options);
      return tag;
    }
    /**
     * Generate an image tag for the video thumbnail.
     * @function Cloudinary#video_thumbnail
     * @param {string} publicId - the public ID of the video
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} An image tag element
     */

  }, {
    key: "video_thumbnail",
    value: function video_thumbnail(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["merge"])({}, _constants__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_POSTER_OPTIONS"], options));
    }
    /**
     * @function Cloudinary#facebook_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "facebook_profile_image",
    value: function facebook_profile_image(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'facebook'
      }, options));
    }
    /**
     * @function Cloudinary#twitter_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "twitter_profile_image",
    value: function twitter_profile_image(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'twitter'
      }, options));
    }
    /**
     * @function Cloudinary#twitter_name_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "twitter_name_profile_image",
    value: function twitter_name_profile_image(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'twitter_name'
      }, options));
    }
    /**
     * @function Cloudinary#gravatar_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "gravatar_image",
    value: function gravatar_image(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'gravatar'
      }, options));
    }
    /**
     * @function Cloudinary#fetch_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "fetch_image",
    value: function fetch_image(publicId, options) {
      return this.image(publicId, Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'fetch'
      }, options));
    }
    /**
     * @function Cloudinary#video
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

  }, {
    key: "video",
    value: function video(publicId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.videoTag(publicId, options).toHtml();
    }
    /**
     * Creates a new VideoTag instance, configured using this own's configuration.
     * @function Cloudinary#videoTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new VideoTag instance
     * @return {VideoTag} A VideoTag that is attached (chained) to this Cloudinary instance
     */

  }, {
    key: "videoTag",
    value: function videoTag(publicId, options) {
      options = Object(_util__WEBPACK_IMPORTED_MODULE_9__["defaults"])({}, options, this.config());
      return new _tags_videotag__WEBPACK_IMPORTED_MODULE_7__["default"](publicId, options);
    }
    /**
     * Generate the URL of the sprite image
     * @function Cloudinary#sprite_css
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations
     * @see {@link http://cloudinary.com/documentation/sprite_generation Sprite generation}
     */

  }, {
    key: "sprite_css",
    value: function sprite_css(publicId, options) {
      options = Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
        type: 'sprite'
      }, options);

      if (!publicId.match(/.css$/)) {
        options.format = 'css';
      }

      return this.url(publicId, options);
    }
    /**
    * Initialize the responsive behaviour.<br>
    * Calls {@link Cloudinary#cloudinary_update} to modify image tags.
     * @function Cloudinary#responsive
    * @param {Object} options
    * @param {String} [options.responsive_class='cld-responsive'] - provide an alternative class used to locate img tags
    * @param {number} [options.responsive_debounce=100] - the debounce interval in milliseconds.
    * @param {boolean} [bootstrap=true] if true processes the img tags by calling cloudinary_update. When false the tags will be processed only after a resize event.
    * @see {@link Cloudinary#cloudinary_update} for additional configuration parameters
     */

  }, {
    key: "responsive",
    value: function responsive(options) {
      var _this = this;

      var bootstrap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var ref, ref1, ref2, responsiveClass, responsiveResize, timeout;
      this.responsiveConfig = Object(_util__WEBPACK_IMPORTED_MODULE_9__["merge"])(this.responsiveConfig || {}, options);
      responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');

      if (bootstrap) {
        this.cloudinary_update("img.".concat(responsiveClass, ", img.cld-hidpi"), this.responsiveConfig);
      }

      responsiveResize = (ref1 = (ref2 = this.responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;

      if (responsiveResize && !this.responsiveResizeInitialized) {
        this.responsiveConfig.resizing = this.responsiveResizeInitialized = true;
        timeout = null;
        return window.addEventListener('resize', function () {
          var debounce, ref3, ref4, reset, run, wait, waitFunc;
          debounce = (ref3 = (ref4 = _this.responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;

          reset = function reset() {
            if (timeout) {
              clearTimeout(timeout);
              return timeout = null;
            }
          };

          run = function run() {
            return _this.cloudinary_update("img.".concat(responsiveClass), _this.responsiveConfig);
          };

          waitFunc = function waitFunc() {
            reset();
            return run();
          };

          wait = function wait() {
            reset();
            return timeout = setTimeout(waitFunc, debounce);
          };

          if (debounce) {
            return wait();
          } else {
            return run();
          }
        });
      }
    }
    /**
     * @function Cloudinary#calc_breakpoint
     * @private
     * @ignore
     */

  }, {
    key: "calc_breakpoint",
    value: function calc_breakpoint(element, width, steps) {
      var breakpoints = Object(_util__WEBPACK_IMPORTED_MODULE_9__["getData"])(element, 'breakpoints') || Object(_util__WEBPACK_IMPORTED_MODULE_9__["getData"])(element, 'stoppoints') || this.config('breakpoints') || this.config('stoppoints') || defaultBreakpoints;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_9__["isFunction"])(breakpoints)) {
        return breakpoints(width, steps);
      } else {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_9__["isString"])(breakpoints)) {
          breakpoints = breakpoints.split(',').map(function (point) {
            return parseInt(point);
          }).sort(function (a, b) {
            return a - b;
          });
        }

        return closestAbove(breakpoints, width);
      }
    }
    /**
     * @function Cloudinary#calc_stoppoint
     * @deprecated Use {@link calc_breakpoint} instead.
     * @private
     * @ignore
     */

  }, {
    key: "calc_stoppoint",
    value: function calc_stoppoint(element, width, steps) {
      return this.calc_breakpoint(element, width, steps);
    }
    /**
     * @function Cloudinary#device_pixel_ratio
     * @private
     */

  }, {
    key: "device_pixel_ratio",
    value: function device_pixel_ratio(roundDpr) {
      roundDpr = roundDpr == null ? true : roundDpr;
      var dpr = (typeof window !== "undefined" && window !== null ? window.devicePixelRatio : void 0) || 1;

      if (roundDpr) {
        dpr = Math.ceil(dpr);
      }

      if (dpr <= 0 || dpr === 0 / 0) {
        dpr = 1;
      }

      var dprString = dpr.toString();

      if (dprString.match(/^\d+$/)) {
        dprString += '.0';
      }

      return dprString;
    }
    /**
    * Finds all `img` tags under each node and sets it up to provide the image through Cloudinary
    * @param {Element[]} nodes the parent nodes to search for img under
    * @param {Object} [options={}] options and transformations params
    * @function Cloudinary#processImageTags
     */

  }, {
    key: "processImageTags",
    value: function processImageTags(nodes, options) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_9__["isEmpty"])(nodes)) {
        // similar to `$.fn.cloudinary`
        return this;
      }

      options = Object(_util__WEBPACK_IMPORTED_MODULE_9__["defaults"])({}, options || {}, this.config());
      var images = nodes.filter(function (node) {
        return /^img$/i.test(node.tagName);
      }).map(function (node) {
        var imgOptions = Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])({
          width: node.getAttribute('width'),
          height: node.getAttribute('height'),
          src: node.getAttribute('src')
        }, options);
        var publicId = imgOptions['source'] || imgOptions['src'];
        delete imgOptions['source'];
        delete imgOptions['src'];
        var attr = new _transformation__WEBPACK_IMPORTED_MODULE_5__["default"](imgOptions).toHtmlAttributes();
        Object(_util__WEBPACK_IMPORTED_MODULE_9__["setData"])(node, 'src-cache', Object(_url__WEBPACK_IMPORTED_MODULE_6__["default"])(publicId, imgOptions));
        node.setAttribute('width', attr.width);
        node.setAttribute('height', attr.height);
        return node;
      });
      this.cloudinary_update(images, options);
      return this;
    }
    /**
    * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
    * Only images marked with the cld-responsive class have w_auto updated.
    * @function Cloudinary#cloudinary_update
    * @param {(Array|string|NodeList)} elements - the elements to modify
    * @param {Object} options
    * @param {boolean|string} [options.responsive_use_breakpoints=true]
    *  - when `true`, always use breakpoints for width
    * - when `"resize"` use exact width on first render and breakpoints on resize
    * - when `false` always use exact width
    * @param {boolean} [options.responsive] - if `true`, enable responsive on this element. Can be done by adding cld-responsive.
    * @param {boolean} [options.responsive_preserve_height] - if set to true, original css height is preserved.
    *   Should only be used if the transformation supports different aspect ratios.
     */

  }, {
    key: "cloudinary_update",
    value: function cloudinary_update(elements, options) {
      var _this2 = this;

      var containerWidth, dataSrc, match, ref4, requiredWidth;

      if (elements === null) {
        return this;
      }

      if (options == null) {
        options = {};
      }

      var responsive = options.responsive != null ? options.responsive : this.config('responsive');

      elements = function () {
        switch (false) {
          case !Object(_util__WEBPACK_IMPORTED_MODULE_9__["isArray"])(elements):
            return elements;

          case elements.constructor.name !== "NodeList":
            return elements;

          case !Object(_util__WEBPACK_IMPORTED_MODULE_9__["isString"])(elements):
            return document.querySelectorAll(elements);

          default:
            return [elements];
        }
      }();

      var responsiveClass;

      if (this.responsiveConfig && this.responsiveConfig.responsive_class != null) {
        responsiveClass = this.responsiveConfig.responsive_class;
      } else if (options.responsive_class != null) {
        responsiveClass = options.responsive_class;
      } else {
        responsiveClass = this.config('responsive_class');
      }

      var roundDpr = options.round_dpr != null ? options.round_dpr : this.config('round_dpr');
      elements.forEach(function (tag) {
        if (/img/i.test(tag.tagName)) {
          var setUrl = true;

          if (responsive) {
            Object(_util__WEBPACK_IMPORTED_MODULE_9__["addClass"])(tag, responsiveClass);
          }

          dataSrc = Object(_util__WEBPACK_IMPORTED_MODULE_9__["getData"])(tag, 'src-cache') || Object(_util__WEBPACK_IMPORTED_MODULE_9__["getData"])(tag, 'src');

          if (!Object(_util__WEBPACK_IMPORTED_MODULE_9__["isEmpty"])(dataSrc)) {
            // Update dpr according to the device's devicePixelRatio
            dataSrc = updateDpr.call(_this2, dataSrc, roundDpr);

            if (_tags_htmltag__WEBPACK_IMPORTED_MODULE_1__["default"].isResponsive(tag, responsiveClass)) {
              containerWidth = findContainerWidth(tag);

              if (containerWidth !== 0) {
                switch (false) {
                  case !/w_auto:breakpoints/.test(dataSrc):
                    requiredWidth = maxWidth(containerWidth, tag);
                    dataSrc = dataSrc.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:".concat(requiredWidth));
                    break;

                  case !(match = /w_auto(:(\d+))?/.exec(dataSrc)):
                    requiredWidth = applyBreakpoints.call(_this2, tag, containerWidth, match[2], options);
                    requiredWidth = maxWidth(requiredWidth, tag);
                    dataSrc = dataSrc.replace(/w_auto[^,\/]*/g, "w_".concat(requiredWidth));
                }

                Object(_util__WEBPACK_IMPORTED_MODULE_9__["removeAttribute"])(tag, 'width');

                if (!options.responsive_preserve_height) {
                  Object(_util__WEBPACK_IMPORTED_MODULE_9__["removeAttribute"])(tag, 'height');
                }
              } else {
                // Container doesn't know the size yet - usually because the image is hidden or outside the DOM.
                setUrl = false;
              }
            }

            if (setUrl) {
              Object(_util__WEBPACK_IMPORTED_MODULE_9__["setAttribute"])(tag, 'src', dataSrc);
            }
          }
        }
      });
      return this;
    }
    /**
     * Provide a transformation object, initialized with own's options, for chaining purposes.
     * @function Cloudinary#transformation
     * @param {Object} options
     * @return {Transformation}
     */

  }, {
    key: "transformation",
    value: function transformation(options) {
      return _transformation__WEBPACK_IMPORTED_MODULE_5__["default"].new(this.config()).fromOptions(options).setParent(this);
    }
  }], [{
    key: "new",
    value: function _new(options) {
      return new this(options);
    }
  }]);

  return Cloudinary;
}();

Object(_util__WEBPACK_IMPORTED_MODULE_9__["assign"])(Cloudinary, _constants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony default export */ __webpack_exports__["default"] = (Cloudinary);

/***/ }),

/***/ "./src/condition.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/expression.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Condition =
/*#__PURE__*/
function (_Expression) {
  _inherits(Condition, _Expression);

  /**
   * Represents a transformation condition
   * @param {string} conditionStr - a condition in string format
   * @class Condition
   * @example
   * // normally this class is not instantiated directly
   * var tr = cloudinary.Transformation.new()
   *    .if().width( ">", 1000).and().aspectRatio("<", "3:4").then()
   *      .width(1000)
   *      .crop("scale")
   *    .else()
   *      .width(500)
   *      .crop("scale")
   *
   * var tr = cloudinary.Transformation.new()
   *    .if("w > 1000 and aspectRatio < 3:4")
   *      .width(1000)
   *      .crop("scale")
   *    .else()
   *      .width(500)
   *      .crop("scale")
   *
   */
  function Condition(conditionStr) {
    _classCallCheck(this, Condition);

    return _possibleConstructorReturn(this, _getPrototypeOf(Condition).call(this, conditionStr));
  }
  /**
   * @function Condition#height
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */


  _createClass(Condition, [{
    key: "height",
    value: function height(operator, value) {
      return this.predicate("h", operator, value);
    }
    /**
     * @function Condition#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

  }, {
    key: "width",
    value: function width(operator, value) {
      return this.predicate("w", operator, value);
    }
    /**
     * @function Condition#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

  }, {
    key: "aspectRatio",
    value: function aspectRatio(operator, value) {
      return this.predicate("ar", operator, value);
    }
    /**
     * @function Condition#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

  }, {
    key: "pageCount",
    value: function pageCount(operator, value) {
      return this.predicate("pc", operator, value);
    }
    /**
     * @function Condition#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

  }, {
    key: "faceCount",
    value: function faceCount(operator, value) {
      return this.predicate("fc", operator, value);
    }
  }]);

  return Condition;
}(_expression__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Condition);

/***/ }),

/***/ "./src/configuration.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/util/lodash.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Cloudinary configuration class
 * Depends on 'utils'
 */

/**
 * Defaults configuration.
 */

var Configuration =
/*#__PURE__*/
function () {
  /**
   * Cloudinary configuration class
   * @constructor Configuration
   * @param {Object} options - configuration parameters
   */
  function Configuration(options) {
    _classCallCheck(this, Configuration);

    this.configuration = options == null ? {} : Object(_util__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(options);
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["defaults"])(this.configuration, DEFAULT_CONFIGURATION_PARAMS);
  }
  /**
   * Initialize the configuration.
   * The function first tries to retrieve the configuration form the environment and then from the document.
   * @function Configuration#init
   * @return {Configuration} returns this for chaining
   * @see fromDocument
   * @see fromEnvironment
   */


  _createClass(Configuration, [{
    key: "init",
    value: function init() {
      this.fromEnvironment();
      this.fromDocument();
      return this;
    }
    /**
     * Set a new configuration item
     * @function Configuration#set
     * @param {string} name - the name of the item to set
     * @param {*} value - the value to be set
     * @return {Configuration}
     *
     */

  }, {
    key: "set",
    value: function set(name, value) {
      this.configuration[name] = value;
      return this;
    }
    /**
     * Get the value of a configuration item
     * @function Configuration#get
     * @param {string} name - the name of the item to set
     * @return {*} the configuration item
     */

  }, {
    key: "get",
    value: function get(name) {
      return this.configuration[name];
    }
  }, {
    key: "merge",
    value: function merge(config) {
      Object(_util__WEBPACK_IMPORTED_MODULE_0__["assign"])(this.configuration, Object(_util__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(config));
      return this;
    }
    /**
     * Initialize Cloudinary from HTML meta tags.
     * @function Configuration#fromDocument
     * @return {Configuration}
     * @example <meta name="cloudinary_cloud_name" content="mycloud">
     *
     */

  }, {
    key: "fromDocument",
    value: function fromDocument() {
      var el, i, len, meta_elements;
      meta_elements = typeof document !== "undefined" && document !== null ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0;

      if (meta_elements) {
        for (i = 0, len = meta_elements.length; i < len; i++) {
          el = meta_elements[i];
          this.configuration[el.getAttribute('name').replace('cloudinary_', '')] = el.getAttribute('content');
        }
      }

      return this;
    }
    /**
     * Initialize Cloudinary from the `CLOUDINARY_URL` environment variable.
     *
     * This function will only run under Node.js environment.
     * @function Configuration#fromEnvironment
     * @requires Node.js
     */

  }, {
    key: "fromEnvironment",
    value: function fromEnvironment() {
      var _this = this;

      var cloudinary_url, query, uri, uriRegex;

      if (typeof process !== "undefined" && process !== null && process.env && process.env.CLOUDINARY_URL) {
        cloudinary_url = process.env.CLOUDINARY_URL;
        uriRegex = /cloudinary:\/\/(?:(\w+)(?:\:([\w-]+))?@)?([\w\.-]+)(?:\/([^?]*))?(?:\?(.+))?/;
        uri = uriRegex.exec(cloudinary_url);

        if (uri) {
          if (uri[3] != null) {
            this.configuration['cloud_name'] = uri[3];
          }

          if (uri[1] != null) {
            this.configuration['api_key'] = uri[1];
          }

          if (uri[2] != null) {
            this.configuration['api_secret'] = uri[2];
          }

          if (uri[4] != null) {
            this.configuration['private_cdn'] = uri[4] != null;
          }

          if (uri[4] != null) {
            this.configuration['secure_distribution'] = uri[4];
          }

          query = uri[5];

          if (query != null) {
            query.split('&').forEach(function (value) {
              var _value$split = value.split('='),
                  _value$split2 = _slicedToArray(_value$split, 2),
                  k = _value$split2[0],
                  v = _value$split2[1];

              if (v == null) {
                v = true;
              }

              _this.configuration[k] = v;
            });
          }
        }
      }

      return this;
    }
    /**
     * Create or modify the Cloudinary client configuration
     *
     * Warning: `config()` returns the actual internal configuration object. modifying it will change the configuration.
     *
     * This is a backward compatibility method. For new code, use get(), merge() etc.
     * @function Configuration#config
     * @param {hash|string|boolean} new_config
     * @param {string} new_value
     * @returns {*} configuration, or value
     *
     * @see {@link fromEnvironment} for initialization using environment variables
     * @see {@link fromDocument} for initialization using HTML meta tags
     */

  }, {
    key: "config",
    value: function config(new_config, new_value) {
      switch (false) {
        case new_value === void 0:
          this.set(new_config, new_value);
          return this.configuration;

        case !Object(_util__WEBPACK_IMPORTED_MODULE_0__["isString"])(new_config):
          return this.get(new_config);

        case !Object(_util__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(new_config):
          this.merge(new_config);
          return this.configuration;

        default:
          // Backward compatibility - return the internal object
          return this.configuration;
      }
    }
    /**
     * Returns a copy of the configuration parameters
     * @function Configuration#toOptions
     * @returns {Object} a key:value collection of the configuration parameters
     */

  }, {
    key: "toOptions",
    value: function toOptions() {
      return Object(_util__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(this.configuration);
    }
  }]);

  return Configuration;
}();

var DEFAULT_CONFIGURATION_PARAMS = {
  responsive_class: 'cld-responsive',
  responsive_use_breakpoints: true,
  round_dpr: true,
  secure: (typeof window !== "undefined" && window !== null ? window.location ? window.location.protocol : void 0 : void 0) === 'https:'
};
Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "callback", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "upload_preset", "url_suffix", "use_root_path", "version"];
/* harmony default export */ __webpack_exports__["default"] = (Configuration);

/***/ }),

/***/ "./src/constants.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CF_SHARED_CDN", function() { return CF_SHARED_CDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OLD_AKAMAI_SHARED_CDN", function() { return OLD_AKAMAI_SHARED_CDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AKAMAI_SHARED_CDN", function() { return AKAMAI_SHARED_CDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARED_CDN", function() { return SHARED_CDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_POSTER_OPTIONS", function() { return DEFAULT_POSTER_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_VIDEO_SOURCE_TYPES", function() { return DEFAULT_VIDEO_SOURCE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEO_TYPES", function() { return SEO_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_IMAGE_PARAMS", function() { return DEFAULT_IMAGE_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_VIDEO_PARAMS", function() { return DEFAULT_VIDEO_PARAMS; });
var VERSION = "2.5.0";
var CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";
var OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";
var AKAMAI_SHARED_CDN = "res.cloudinary.com";
var SHARED_CDN = AKAMAI_SHARED_CDN;
var DEFAULT_POSTER_OPTIONS = {
  format: 'jpg',
  resource_type: 'video'
};
var DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];
var SEO_TYPES = {
  "image/upload": "images",
  "image/private": "private_images",
  "image/authenticated": "authenticated_images",
  "raw/upload": "files",
  "video/upload": "videos"
};
/**
* @const {Object} Cloudinary.DEFAULT_IMAGE_PARAMS
* Defaults values for image parameters.
*
* (Previously defined using option_consume() )
 */

var DEFAULT_IMAGE_PARAMS = {
  resource_type: "image",
  transformation: [],
  type: 'upload'
};
/**
* Defaults values for video parameters.
* @const {Object} Cloudinary.DEFAULT_VIDEO_PARAMS
* (Previously defined using option_consume() )
 */

var DEFAULT_VIDEO_PARAMS = {
  fallback_content: '',
  resource_type: "video",
  source_transformation: {},
  source_types: DEFAULT_VIDEO_SOURCE_TYPES,
  transformation: [],
  type: 'upload'
};

/***/ }),

/***/ "./src/crc32.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utf8_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utf8_encode.js");
/**
 * CRC32 calculator
 * Depends on 'utf8_encode'
 */
var crc32;


crc32 = function crc32(str) {
  var crc, i, iTop, table, x, y; // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: T0bsn
  // +   improved by: http://stackoverflow.com/questions/2647935/javascript-crc32-function-and-php-crc32-not-matching
  // -    depends on: utf8_encode
  // *     example 1: crc32('Kevin van Zonneveld');
  // *     returns 1: 1249991249

  str = Object(_utf8_encode__WEBPACK_IMPORTED_MODULE_0__["default"])(str);
  table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
  crc = 0;
  x = 0;
  y = 0;
  crc = crc ^ -1;
  i = 0;
  iTop = str.length;

  while (i < iTop) {
    y = (crc ^ str.charCodeAt(i)) & 0xFF;
    x = '0x' + table.substr(y * 9, 8);
    crc = crc >>> 8 ^ x;
    i++;
  }

  crc = crc ^ -1; //convert to unsigned 32-bit int if needed

  if (crc < 0) {
    crc += 4294967296;
  }

  return crc;
};

/* harmony default export */ __webpack_exports__["default"] = (crc32);

/***/ }),

/***/ "./src/expression.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Expression =
/*#__PURE__*/
function () {
  /**
   * Represents a transformation expression
   * @param {string} expressionStr - a expression in string format
   * @class Expression
   *
   */
  function Expression(expressionStr) {
    _classCallCheck(this, Expression);

    /**
     * @protected
     * @inner Expression-expressions
     */
    this.expressions = [];

    if (expressionStr != null) {
      this.expressions.push(Expression.normalize(expressionStr));
    }
  }
  /**
   * Convenience constructor method
   * @function Expression.new
   */


  _createClass(Expression, [{
    key: "serialize",

    /**
     * Serialize the expression
     * @return {string} the expression as a string
     */
    value: function serialize() {
      return Expression.normalize(this.expressions.join("_"));
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.serialize();
    }
    /**
     * Get the parent transformation of this expression
     * @return Transformation
     */

  }, {
    key: "getParent",
    value: function getParent() {
      return this.parent;
    }
    /**
     * Set the parent transformation of this expression
     * @param {Transformation} the parent transformation
     * @return {Expression} this expression
     */

  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
      return this;
    }
    /**
     * Add a expression
     * @function Expression#predicate
     * @internal
     */

  }, {
    key: "predicate",
    value: function predicate(name, operator, value) {
      if (Expression.OPERATORS[operator] != null) {
        operator = Expression.OPERATORS[operator];
      }

      this.expressions.push("".concat(name, "_").concat(operator, "_").concat(value));
      return this;
    }
    /**
     * @function Expression#and
     */

  }, {
    key: "and",
    value: function and() {
      this.expressions.push("and");
      return this;
    }
    /**
     * @function Expression#or
     */

  }, {
    key: "or",
    value: function or() {
      this.expressions.push("or");
      return this;
    }
    /**
     * Conclude expression
     * @function Expression#then
     * @return {Transformation} the transformation this expression is defined for
     */

  }, {
    key: "then",
    value: function then() {
      return this.getParent().if(this.toString());
    }
    /**
     * @function Expression#height
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

  }, {
    key: "height",
    value: function height(operator, value) {
      return this.predicate("h", operator, value);
    }
    /**
     * @function Expression#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

  }, {
    key: "width",
    value: function width(operator, value) {
      return this.predicate("w", operator, value);
    }
    /**
     * @function Expression#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

  }, {
    key: "aspectRatio",
    value: function aspectRatio(operator, value) {
      return this.predicate("ar", operator, value);
    }
    /**
     * @function Expression#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

  }, {
    key: "pageCount",
    value: function pageCount(operator, value) {
      return this.predicate("pc", operator, value);
    }
    /**
     * @function Expression#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */

  }, {
    key: "faceCount",
    value: function faceCount(operator, value) {
      return this.predicate("fc", operator, value);
    }
  }, {
    key: "value",
    value: function value(_value) {
      this.expressions.push(_value);
      return this;
    }
    /**
     */

  }], [{
    key: "new",
    value: function _new(expressionStr) {
      return new this(expressionStr);
    }
    /**
     * Normalize a string expression
     * @function Cloudinary#normalize
     * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
     * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
     */

  }, {
    key: "normalize",
    value: function normalize(expression) {
      var operators, pattern, replaceRE;

      if (expression == null) {
        return expression;
      }

      expression = String(expression);
      operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*";
      pattern = "((" + operators + ")(?=[ _])|" + Object.keys(Expression.PREDEFINED_VARS).join("|") + ")";
      replaceRE = new RegExp(pattern, "g");
      expression = expression.replace(replaceRE, function (match) {
        return Expression.OPERATORS[match] || Expression.PREDEFINED_VARS[match];
      });
      return expression.replace(/[ _]+/g, '_');
    }
  }, {
    key: "variable",
    value: function variable(name, value) {
      return new this(name).value(value);
    }
    /**
     * @returns Expression a new expression with the predefined variable "width"
     * @function Expression.width
     */

  }, {
    key: "width",
    value: function width() {
      return new this("width");
    }
    /**
     * @returns Expression a new expression with the predefined variable "height"
     * @function Expression.height
     */

  }, {
    key: "height",
    value: function height() {
      return new this("height");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialWidth"
     * @function Expression.initialWidth
     */

  }, {
    key: "initialWidth",
    value: function initialWidth() {
      return new this("initialWidth");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialHeight"
     * @function Expression.initialHeight
     */

  }, {
    key: "initialHeight",
    value: function initialHeight() {
      return new this("initialHeight");
    }
    /**
     * @returns Expression a new expression with the predefined variable "aspectRatio"
     * @function Expression.aspectRatio
     */

  }, {
    key: "aspectRatio",
    value: function aspectRatio() {
      return new this("aspectRatio");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialAspectRatio"
     * @function Expression.initialAspectRatio
     */

  }, {
    key: "initialAspectRatio",
    value: function initialAspectRatio() {
      return new this("initialAspectRatio");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageCount"
     * @function Expression.pageCount
     */

  }, {
    key: "pageCount",
    value: function pageCount() {
      return new this("pageCount");
    }
    /**
     * @returns Expression new expression with the predefined variable "faceCount"
     * @function Expression.faceCount
     */

  }, {
    key: "faceCount",
    value: function faceCount() {
      return new this("faceCount");
    }
    /**
     * @returns Expression a new expression with the predefined variable "currentPage"
     * @function Expression.currentPage
     */

  }, {
    key: "currentPage",
    value: function currentPage() {
      return new this("currentPage");
    }
    /**
     * @returns Expression a new expression with the predefined variable "tags"
     * @function Expression.tags
     */

  }, {
    key: "tags",
    value: function tags() {
      return new this("tags");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageX"
     * @function Expression.pageX
     */

  }, {
    key: "pageX",
    value: function pageX() {
      return new this("pageX");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageY"
     * @function Expression.pageY
     */

  }, {
    key: "pageY",
    value: function pageY() {
      return new this("pageY");
    }
  }]);

  return Expression;
}();
/**
 * @internal
 */


Expression.OPERATORS = {
  "=": 'eq',
  "!=": 'ne',
  "<": 'lt',
  ">": 'gt',
  "<=": 'lte',
  ">=": 'gte',
  "&&": 'and',
  "||": 'or',
  "*": "mul",
  "/": "div",
  "+": "add",
  "-": "sub"
};
/**
 * @internal
 */

Expression.PREDEFINED_VARS = {
  "aspect_ratio": "ar",
  "aspectRatio": "ar",
  "current_page": "cp",
  "currentPage": "cp",
  "face_count": "fc",
  "faceCount": "fc",
  "height": "h",
  "initial_aspect_ratio": "iar",
  "initial_height": "ih",
  "initial_width": "iw",
  "initialAspectRatio": "iar",
  "initialHeight": "ih",
  "initialWidth": "iw",
  "page_count": "pc",
  "page_x": "px",
  "page_y": "py",
  "pageCount": "pc",
  "pageX": "px",
  "pageY": "py",
  "tags": "tags",
  "width": "w"
};
/**
 * @internal
 */

Expression.BOUNDRY = "[ _]+";
/* harmony default export */ __webpack_exports__["default"] = (Expression);

/***/ }),

/***/ "./src/layer/fetchlayer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/layer/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/util/lodash.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var FetchLayer =
/*#__PURE__*/
function (_Layer) {
  _inherits(FetchLayer, _Layer);

  /**
   * @constructor FetchLayer
   * @param {Object|string} options - layer parameters or a url
   * @param {string} options.url the url of the image to fetch
   */
  function FetchLayer(options) {
    var _this;

    _classCallCheck(this, FetchLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FetchLayer).call(this, options));

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isString"])(options)) {
      _this.options.url = options;
    } else if (options != null ? options.url : void 0) {
      _this.options.url = options.url;
    }

    return _this;
  }

  _createClass(FetchLayer, [{
    key: "url",
    value: function url(_url) {
      this.options.url = _url;
      return this;
    }
    /**
     * generate the string representation of the layer
     * @function FetchLayer#toString
     * @return {String}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "fetch:".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["base64EncodeURL"])(this.options.url));
    }
  }]);

  return FetchLayer;
}(_layer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FetchLayer);

/***/ }),

/***/ "./src/layer/layer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/util/lodash.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Layer =
/*#__PURE__*/
function () {
  /**
   * Layer
   * @constructor Layer
   * @param {Object} options - layer parameters
   */
  function Layer(options) {
    var _this = this;

    _classCallCheck(this, Layer);

    this.options = {};

    if (options != null) {
      ["resourceType", "type", "publicId", "format"].forEach(function (key) {
        var ref;
        return _this.options[key] = (ref = options[key]) != null ? ref : options[Object(_util__WEBPACK_IMPORTED_MODULE_0__["snakeCase"])(key)];
      });
    }
  }

  _createClass(Layer, [{
    key: "resourceType",
    value: function resourceType(value) {
      this.options.resourceType = value;
      return this;
    }
  }, {
    key: "type",
    value: function type(value) {
      this.options.type = value;
      return this;
    }
  }, {
    key: "publicId",
    value: function publicId(value) {
      this.options.publicId = value;
      return this;
    }
    /**
     * Get the public ID, formatted for layer parameter
     * @function Layer#getPublicId
     * @return {String} public ID
     */

  }, {
    key: "getPublicId",
    value: function getPublicId() {
      var ref;
      return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
    }
    /**
     * Get the public ID, with format if present
     * @function Layer#getFullPublicId
     * @return {String} public ID
     */

  }, {
    key: "getFullPublicId",
    value: function getFullPublicId() {
      if (this.options.format != null) {
        return this.getPublicId() + "." + this.options.format;
      } else {
        return this.getPublicId();
      }
    }
  }, {
    key: "format",
    value: function format(value) {
      this.options.format = value;
      return this;
    }
    /**
     * generate the string representation of the layer
     * @function Layer#toString
     */

  }, {
    key: "toString",
    value: function toString() {
      var components;
      components = [];

      if (this.options.publicId == null) {
        throw "Must supply publicId";
      }

      if (!(this.options.resourceType === "image")) {
        components.push(this.options.resourceType);
      }

      if (!(this.options.type === "upload")) {
        components.push(this.options.type);
      }

      components.push(this.getFullPublicId());
      return Object(_util__WEBPACK_IMPORTED_MODULE_0__["compact"])(components).join(":");
    }
  }]);

  return Layer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Layer);

/***/ }),

/***/ "./src/layer/subtitleslayer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _textlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/layer/textlayer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SubtitlesLayer =
/*#__PURE__*/
function (_TextLayer) {
  _inherits(SubtitlesLayer, _TextLayer);

  /**
   * Represent a subtitles layer
   * @constructor SubtitlesLayer
   * @param {Object} options - layer parameters
   */
  function SubtitlesLayer(options) {
    var _this;

    _classCallCheck(this, SubtitlesLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SubtitlesLayer).call(this, options));
    _this.options.resourceType = "subtitles";
    return _this;
  }

  return SubtitlesLayer;
}(_textlayer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SubtitlesLayer);

/***/ }),

/***/ "./src/layer/textlayer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/layer/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/util/lodash.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TextLayer =
/*#__PURE__*/
function (_Layer) {
  _inherits(TextLayer, _Layer);

  /**
   * @constructor TextLayer
   * @param {Object} options - layer parameters
   */
  function TextLayer(options) {
    var _this;

    _classCallCheck(this, TextLayer);

    var keys;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextLayer).call(this, options));
    keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"];

    if (options != null) {
      keys.forEach(function (key) {
        var ref;
        return _this.options[key] = (ref = options[key]) != null ? ref : options[Object(_util__WEBPACK_IMPORTED_MODULE_1__["snakeCase"])(key)];
      });
    }

    _this.options.resourceType = "text";
    return _this;
  }

  _createClass(TextLayer, [{
    key: "resourceType",
    value: function resourceType(_resourceType) {
      throw "Cannot modify resourceType for text layers";
    }
  }, {
    key: "type",
    value: function type(_type) {
      throw "Cannot modify type for text layers";
    }
  }, {
    key: "format",
    value: function format(_format) {
      throw "Cannot modify format for text layers";
    }
  }, {
    key: "fontFamily",
    value: function fontFamily(_fontFamily) {
      this.options.fontFamily = _fontFamily;
      return this;
    }
  }, {
    key: "fontSize",
    value: function fontSize(_fontSize) {
      this.options.fontSize = _fontSize;
      return this;
    }
  }, {
    key: "fontWeight",
    value: function fontWeight(_fontWeight) {
      this.options.fontWeight = _fontWeight;
      return this;
    }
  }, {
    key: "fontStyle",
    value: function fontStyle(_fontStyle) {
      this.options.fontStyle = _fontStyle;
      return this;
    }
  }, {
    key: "textDecoration",
    value: function textDecoration(_textDecoration) {
      this.options.textDecoration = _textDecoration;
      return this;
    }
  }, {
    key: "textAlign",
    value: function textAlign(_textAlign) {
      this.options.textAlign = _textAlign;
      return this;
    }
  }, {
    key: "stroke",
    value: function stroke(_stroke) {
      this.options.stroke = _stroke;
      return this;
    }
  }, {
    key: "letterSpacing",
    value: function letterSpacing(_letterSpacing) {
      this.options.letterSpacing = _letterSpacing;
      return this;
    }
  }, {
    key: "lineSpacing",
    value: function lineSpacing(_lineSpacing) {
      this.options.lineSpacing = _lineSpacing;
      return this;
    }
  }, {
    key: "text",
    value: function text(_text) {
      this.options.text = _text;
      return this;
    }
    /**
     * generate the string representation of the layer
     * @function TextLayer#toString
     * @return {String}
     */

  }, {
    key: "toString",
    value: function toString() {
      var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
      style = this.textStyleIdentifier();

      if (this.options.publicId != null) {
        publicId = this.getFullPublicId();
      }

      if (this.options.text != null) {
        hasPublicId = !Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(publicId);
        hasStyle = !Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(style);

        if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
          throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
        }

        re = /\$\([a-zA-Z]\w*\)/g;
        start = 0; //        textSource = text.replace(new RegExp("[,/]", 'g'), (c)-> "%#{c.charCodeAt(0).toString(16).toUpperCase()}")

        textSource = Object(_util__WEBPACK_IMPORTED_MODULE_1__["smartEscape"])(this.options.text, /[,\/]/g);
        text = "";

        while (res = re.exec(textSource)) {
          text += Object(_util__WEBPACK_IMPORTED_MODULE_1__["smartEscape"])(textSource.slice(start, res.index));
          text += res[0];
          start = res.index + res[0].length;
        }

        text += Object(_util__WEBPACK_IMPORTED_MODULE_1__["smartEscape"])(textSource.slice(start));
      }

      components = [this.options.resourceType, style, publicId, text];
      return Object(_util__WEBPACK_IMPORTED_MODULE_1__["compact"])(components).join(":");
    }
  }, {
    key: "textStyleIdentifier",
    value: function textStyleIdentifier() {
      var components;
      components = [];

      if (this.options.fontWeight !== "normal") {
        components.push(this.options.fontWeight);
      }

      if (this.options.fontStyle !== "normal") {
        components.push(this.options.fontStyle);
      }

      if (this.options.textDecoration !== "none") {
        components.push(this.options.textDecoration);
      }

      components.push(this.options.textAlign);

      if (this.options.stroke !== "none") {
        components.push(this.options.stroke);
      }

      if (!(Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(this.options.letterSpacing) && !Object(_util__WEBPACK_IMPORTED_MODULE_1__["isNumberLike"])(this.options.letterSpacing))) {
        components.push("letter_spacing_" + this.options.letterSpacing);
      }

      if (!(Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(this.options.lineSpacing) && !Object(_util__WEBPACK_IMPORTED_MODULE_1__["isNumberLike"])(this.options.lineSpacing))) {
        components.push("line_spacing_" + this.options.lineSpacing);
      }

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(Object(_util__WEBPACK_IMPORTED_MODULE_1__["compact"])(components))) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(this.options.fontFamily)) {
          throw "Must supply fontFamily. ".concat(components);
        }

        if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(this.options.fontSize) && !Object(_util__WEBPACK_IMPORTED_MODULE_1__["isNumberLike"])(this.options.fontSize)) {
          throw "Must supply fontSize.";
        }
      }

      components.unshift(this.options.fontFamily, this.options.fontSize);
      components = Object(_util__WEBPACK_IMPORTED_MODULE_1__["compact"])(components).join("_");
      return components;
    }
  }]);

  return TextLayer;
}(_layer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (TextLayer);

/***/ }),

/***/ "./src/namespace/cloudinary-core.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utf8_encode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utf8_encode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utf8_encode", function() { return _utf8_encode__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _crc32__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/crc32.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "crc32", function() { return _crc32__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/util/lodash.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _util__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/transformation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transformation", function() { return _transformation__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/condition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Condition", function() { return _condition__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/configuration.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Configuration", function() { return _configuration__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _tags_htmltag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/tags/htmltag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HtmlTag", function() { return _tags_htmltag__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _tags_imagetag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/tags/imagetag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageTag", function() { return _tags_imagetag__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _tags_picturetag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/tags/picturetag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PictureTag", function() { return _tags_picturetag__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _tags_videotag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/tags/videotag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VideoTag", function() { return _tags_videotag__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _tags_clienthintsmetatag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/tags/clienthintsmetatag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientHintsMetaTag", function() { return _tags_clienthintsmetatag__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _layer_layer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/layer/layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _layer_layer__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/layer/fetchlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FetchLayer", function() { return _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _layer_textlayer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/layer/textlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextLayer", function() { return _layer_textlayer__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _layer_subtitleslayer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/layer/subtitleslayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubtitlesLayer", function() { return _layer_subtitleslayer__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _cloudinary__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/cloudinary.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cloudinary", function() { return _cloudinary__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/**
 * Creates the namespace for Cloudinary
 */
















/* harmony default export */ __webpack_exports__["default"] = ({
  ClientHintsMetaTag: _tags_clienthintsmetatag__WEBPACK_IMPORTED_MODULE_10__["default"],
  Cloudinary: _cloudinary__WEBPACK_IMPORTED_MODULE_15__["default"],
  Condition: _condition__WEBPACK_IMPORTED_MODULE_4__["default"],
  Configuration: _configuration__WEBPACK_IMPORTED_MODULE_5__["default"],
  crc32: _crc32__WEBPACK_IMPORTED_MODULE_1__["default"],
  FetchLayer: _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_12__["default"],
  HtmlTag: _tags_htmltag__WEBPACK_IMPORTED_MODULE_6__["default"],
  ImageTag: _tags_imagetag__WEBPACK_IMPORTED_MODULE_7__["default"],
  Layer: _layer_layer__WEBPACK_IMPORTED_MODULE_11__["default"],
  PictureTag: _tags_picturetag__WEBPACK_IMPORTED_MODULE_8__["default"],
  SubtitlesLayer: _layer_subtitleslayer__WEBPACK_IMPORTED_MODULE_14__["default"],
  TextLayer: _layer_textlayer__WEBPACK_IMPORTED_MODULE_13__["default"],
  Transformation: _transformation__WEBPACK_IMPORTED_MODULE_3__["default"],
  utf8_encode: _utf8_encode__WEBPACK_IMPORTED_MODULE_0__["default"],
  Util: _util__WEBPACK_IMPORTED_MODULE_2__,
  VideoTag: _tags_videotag__WEBPACK_IMPORTED_MODULE_9__["default"]
});


/***/ }),

/***/ "./src/parameters.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Param", function() { return Param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayParam", function() { return ArrayParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationParam", function() { return TransformationParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeParam", function() { return RangeParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RawParam", function() { return RawParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayerParam", function() { return LayerParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionParam", function() { return ExpressionParam; });
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/expression.js");
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/transformation.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _layer_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/layer/layer.js");
/* harmony import */ var _layer_textlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/layer/textlayer.js");
/* harmony import */ var _layer_subtitleslayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/layer/subtitleslayer.js");
/* harmony import */ var _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/layer/fetchlayer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








/**
 * Transformation parameters
 * Depends on 'util', 'transformation'
 */

var Param =
/*#__PURE__*/
function () {
  /**
   * Represents a single parameter
   * @class Param
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} shortName - The name of the serialized form of the parameter.
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @ignore
   */
  function Param(name, shortName) {
    var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util__WEBPACK_IMPORTED_MODULE_2__["identity"];

    _classCallCheck(this, Param);

    /**
     * The name of the parameter in snake_case
     * @member {string} Param#name
     */
    this.name = name;
    /**
     * The name of the serialized form of the parameter
     * @member {string} Param#shortName
     */

    this.shortName = shortName;
    /**
     * Manipulate origValue when value is called
     * @member {function} Param#process
     */

    this.process = process;
  }
  /**
   * Set a (unprocessed) value for this parameter
   * @function Param#set
   * @param {*} origValue - the value of the parameter
   * @return {Param} self for chaining
   */


  _createClass(Param, [{
    key: "set",
    value: function set(origValue) {
      this.origValue = origValue;
      return this;
    }
    /**
     * Generate the serialized form of the parameter
     * @function Param#serialize
     * @return {string} the serialized form of the parameter
     */

  }, {
    key: "serialize",
    value: function serialize() {
      var val, valid;
      val = this.value();
      valid = Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(val) || Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(val) || Object(_util__WEBPACK_IMPORTED_MODULE_2__["isString"])(val) ? !Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(val) : val != null;

      if (this.shortName != null && valid) {
        return "".concat(this.shortName, "_").concat(val);
      } else {
        return '';
      }
    }
    /**
     * Return the processed value of the parameter
     * @function Param#value
     */

  }, {
    key: "value",
    value: function value() {
      return this.process(this.origValue);
    }
  }, {
    key: "build_array",
    value: function build_array(arg) {
      if (arg == null) {
        return [];
      } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(arg)) {
        return arg;
      } else {
        return [arg];
      }
    }
    /**
    * Covert value to video codec string.
    *
    * If the parameter is an object,
    * @param {(string|Object)} param - the video codec as either a String or a Hash
    * @return {string} the video codec string in the format codec:profile:level
    * @example
    * vc_[ :profile : [level]]
    * or
      { codec: 'h264', profile: 'basic', level: '3.1' }
    * @ignore
     */

  }], [{
    key: "norm_color",
    value: function norm_color(value) {
      return value != null ? value.replace(/^#/, 'rgb:') : void 0;
    }
  }, {
    key: "process_video_params",
    value: function process_video_params(param) {
      var video;

      switch (param.constructor) {
        case Object:
          video = "";

          if ('codec' in param) {
            video = param['codec'];

            if ('profile' in param) {
              video += ":" + param['profile'];

              if ('level' in param) {
                video += ":" + param['level'];
              }
            }
          }

          return video;

        case String:
          return param;

        default:
          return null;
      }
    }
  }]);

  return Param;
}();

var ArrayParam =
/*#__PURE__*/
function (_Param) {
  _inherits(ArrayParam, _Param);

  /**
   * A parameter that represents an array
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} shortName - The name of the serialized form of the parameter
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {string} [sep='.'] - The separator to use when joining the array elements together
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @class ArrayParam
   * @extends Param
   * @ignore
   */
  function ArrayParam(name, shortName) {
    var _this;

    var sep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    var process = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, ArrayParam);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayParam).call(this, name, shortName, process));
    _this.sep = sep;
    return _this;
  }

  _createClass(ArrayParam, [{
    key: "serialize",
    value: function serialize() {
      if (this.shortName != null) {
        var arrayValue = this.value();

        if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(arrayValue)) {
          return '';
        } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isString"])(arrayValue)) {
          return "".concat(this.shortName, "_").concat(arrayValue);
        } else {
          var flat = arrayValue.map(function (t) {
            return Object(_util__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(t.serialize) ? t.serialize() : t;
          }).join(this.sep);
          return "".concat(this.shortName, "_").concat(flat);
        }
      } else {
        return '';
      }
    }
  }, {
    key: "value",
    value: function value() {
      var _this2 = this;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(this.origValue)) {
        return this.origValue.map(function (v) {
          return _this2.process(v);
        });
      } else {
        return this.process(this.origValue);
      }
    }
  }, {
    key: "set",
    value: function set(origValue) {
      if (origValue == null || Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(origValue)) {
        return _get(_getPrototypeOf(ArrayParam.prototype), "set", this).call(this, origValue);
      } else {
        return _get(_getPrototypeOf(ArrayParam.prototype), "set", this).call(this, [origValue]);
      }
    }
  }]);

  return ArrayParam;
}(Param);

var TransformationParam =
/*#__PURE__*/
function (_Param2) {
  _inherits(TransformationParam, _Param2);

  /**
   * A parameter that represents a transformation
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} [shortName='t'] - The name of the serialized form of the parameter
   * @param {string} [sep='.'] - The separator to use when joining the array elements together
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @class TransformationParam
   * @extends Param
   * @ignore
   */
  function TransformationParam(name) {
    var _this3;

    var shortName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "t";
    var sep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
    var process = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, TransformationParam);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(TransformationParam).call(this, name, shortName, process));
    _this3.sep = sep;
    return _this3;
  }

  _createClass(TransformationParam, [{
    key: "serialize",
    value: function serialize() {
      var _this4 = this;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(this.value())) {
        return '';
      } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["allStrings"])(this.value())) {
        var joined = this.value().join(this.sep);

        if (!Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(joined)) {
          return "".concat(this.shortName, "_").concat(joined);
        } else {
          return '';
        }
      } else {
        return this.value().map(function (t) {
          if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isString"])(t) && !Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(t)) {
            return "".concat(_this4.shortName, "_").concat(t);
          } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(t.serialize)) {
            return t.serialize();
          } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(t) && !Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(t)) {
            return new _transformation__WEBPACK_IMPORTED_MODULE_1__["default"](t).serialize();
          } else {
            return undefined;
          }
        }).filter(function (t) {
          return t;
        });
      }
    }
  }, {
    key: "set",
    value: function set(origValue1) {
      this.origValue = origValue1;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(this.origValue)) {
        return _get(_getPrototypeOf(TransformationParam.prototype), "set", this).call(this, this.origValue);
      } else {
        return _get(_getPrototypeOf(TransformationParam.prototype), "set", this).call(this, [this.origValue]);
      }
    }
  }]);

  return TransformationParam;
}(Param);

var RangeParam =
/*#__PURE__*/
function (_Param3) {
  _inherits(RangeParam, _Param3);

  /**
   * A parameter that represents a range
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} shortName - The name of the serialized form of the parameter
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
   * @class RangeParam
   * @extends Param
   * @ignore
   */
  function RangeParam(name, shortName, process) {
    var _this5;

    _classCallCheck(this, RangeParam);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(RangeParam).call(this, name, shortName, process));
    _this5.process || (_this5.process = _this5.norm_range_value);
    return _this5;
  }

  _createClass(RangeParam, null, [{
    key: "norm_range_value",
    value: function norm_range_value(value) {
      var modifier, offset;
      offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));

      if (offset) {
        modifier = offset[5] != null ? 'p' : '';
        value = (offset[1] || offset[4]) + modifier;
      }

      return value;
    }
  }]);

  return RangeParam;
}(Param);

var RawParam =
/*#__PURE__*/
function (_Param4) {
  _inherits(RawParam, _Param4);

  function RawParam(name, shortName) {
    var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util__WEBPACK_IMPORTED_MODULE_2__["identity"];

    _classCallCheck(this, RawParam);

    return _possibleConstructorReturn(this, _getPrototypeOf(RawParam).call(this, name, shortName, process));
  }

  _createClass(RawParam, [{
    key: "serialize",
    value: function serialize() {
      return this.value();
    }
  }]);

  return RawParam;
}(Param);

var LAYER_KEYWORD_PARAMS = [["font_weight", "normal"], ["font_style", "normal"], ["text_decoration", "none"], ["text_align", null], ["stroke", "none"], ["letter_spacing", null], ["line_spacing", null]];

var LayerParam =
/*#__PURE__*/
function (_Param5) {
  _inherits(LayerParam, _Param5);

  function LayerParam() {
    _classCallCheck(this, LayerParam);

    return _possibleConstructorReturn(this, _getPrototypeOf(LayerParam).apply(this, arguments));
  }

  _createClass(LayerParam, [{
    key: "value",
    // Parse layer options
    // @return [string] layer transformation string
    // @private
    value: function value() {
      var result;
      var layerOptions = this.origValue;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(layerOptions)) {
        layerOptions = Object(_util__WEBPACK_IMPORTED_MODULE_2__["withCamelCaseKeys"])(layerOptions);

        if (layerOptions.resourceType === "text" || layerOptions.text != null) {
          result = new _layer_textlayer__WEBPACK_IMPORTED_MODULE_4__["default"](layerOptions).toString();
        } else if (layerOptions.resourceType === "subtitles") {
          result = new _layer_subtitleslayer__WEBPACK_IMPORTED_MODULE_5__["default"](layerOptions).toString();
        } else if (layerOptions.resourceType === "fetch" || layerOptions.url != null) {
          result = new _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_6__["default"](layerOptions).toString();
        } else {
          result = new _layer_layer__WEBPACK_IMPORTED_MODULE_3__["default"](layerOptions).toString();
        }
      } else if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isString"])(layerOptions) && /^fetch:.+/.test(layerOptions)) {
        result = new _layer_fetchlayer__WEBPACK_IMPORTED_MODULE_6__["default"](layerOptions.substr(6)).toString();
      } else {
        result = layerOptions;
      }

      return result;
    }
  }, {
    key: "textStyle",
    value: function textStyle(layer) {
      return new _layer_textlayer__WEBPACK_IMPORTED_MODULE_4__["default"](layer).textStyleIdentifier();
    }
  }]);

  return LayerParam;
}(Param);

var ExpressionParam =
/*#__PURE__*/
function (_Param6) {
  _inherits(ExpressionParam, _Param6);

  function ExpressionParam() {
    _classCallCheck(this, ExpressionParam);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExpressionParam).apply(this, arguments));
  }

  _createClass(ExpressionParam, [{
    key: "serialize",
    value: function serialize() {
      return _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(_get(_getPrototypeOf(ExpressionParam.prototype), "serialize", this).call(this));
    }
  }]);

  return ExpressionParam;
}(Param);



/***/ }),

/***/ "./src/tags/clienthintsmetatag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _htmltag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/tags/htmltag.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/util/lodash.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Image Tag
 * Depends on 'tags/htmltag', 'cloudinary'
 */



var ClientHintsMetaTag =
/*#__PURE__*/
function (_HtmlTag) {
  _inherits(ClientHintsMetaTag, _HtmlTag);

  /**
   * Creates an HTML (DOM) Meta tag that enables client-hints.
   * @constructor ClientHintsMetaTag
   * @extends HtmlTag
   */
  function ClientHintsMetaTag(options) {
    _classCallCheck(this, ClientHintsMetaTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClientHintsMetaTag).call(this, 'meta', void 0, Object(_util__WEBPACK_IMPORTED_MODULE_1__["assign"])({
      "http-equiv": "Accept-CH",
      content: "DPR, Viewport-Width, Width"
    }, options)));
  }
  /** @override */


  _createClass(ClientHintsMetaTag, [{
    key: "closeTag",
    value: function closeTag() {
      return "";
    }
  }]);

  return ClientHintsMetaTag;
}(_htmltag__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ClientHintsMetaTag);

/***/ }),

/***/ "./src/tags/htmltag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/transformation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Generic HTML tag
 * Depends on 'transformation', 'util'
 */



var HtmlTag =
/*#__PURE__*/
function () {
  /**
   * Represents an HTML (DOM) tag
   * @constructor HtmlTag
   * @param {string} name - the name of the tag
   * @param {string} [publicId]
   * @param {Object} options
   * @example tag = new HtmlTag( 'div', { 'width': 10})
   */
  function HtmlTag(name, publicId, options) {
    _classCallCheck(this, HtmlTag);

    var transformation;
    this.name = name;
    this.publicId = publicId;

    if (options == null) {
      if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(publicId)) {
        options = publicId;
        this.publicId = void 0;
      } else {
        options = {};
      }
    }

    transformation = new _transformation__WEBPACK_IMPORTED_MODULE_1__["default"](options);
    transformation.setParent(this);

    this.transformation = function () {
      return transformation;
    };
  }
  /**
   * Convenience constructor
   * Creates a new instance of an HTML (DOM) tag
   * @function HtmlTag.new
   * @param {string} name - the name of the tag
   * @param {string} [publicId]
   * @param {Object} options
   * @return {HtmlTag}
   * @example tag = HtmlTag.new( 'div', { 'width': 10})
   */


  _createClass(HtmlTag, [{
    key: "htmlAttrs",

    /**
     * combine key and value from the `attr` to generate an HTML tag attributes string.
     * `Transformation::toHtmlTagOptions` is used to filter out transformation and configuration keys.
     * @protected
     * @param {Object} attrs
     * @return {string} the attributes in the format `'key1="value1" key2="value2"'`
     * @ignore
     */
    value: function htmlAttrs(attrs) {
      var key, pairs, value;
      return pairs = function () {
        var results;
        results = [];

        for (key in attrs) {
          value = escapeQuotes(attrs[key]);

          if (value) {
            results.push(toAttribute(key, value));
          }
        }

        return results;
      }().sort().join(' ');
    }
    /**
     * Get all options related to this tag.
     * @function HtmlTag#getOptions
     * @returns {Object} the options
     *
     */

  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.transformation().toOptions();
    }
    /**
     * Get the value of option `name`
     * @function HtmlTag#getOption
     * @param {string} name - the name of the option
     * @returns {*} Returns the value of the option
     *
     */

  }, {
    key: "getOption",
    value: function getOption(name) {
      return this.transformation().getValue(name);
    }
    /**
     * Get the attributes of the tag.
     * @function HtmlTag#attributes
     * @returns {Object} attributes
     */

  }, {
    key: "attributes",
    value: function attributes() {
      // The attributes are be computed from the options every time this method is invoked.
      var htmlAttributes = this.transformation().toHtmlAttributes();
      Object.keys(htmlAttributes).forEach(function (key) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(htmlAttributes[key])) {
          delete htmlAttributes[key];
        }
      });

      if (htmlAttributes.attributes) {
        // Currently HTML attributes are defined both at the top level and under 'attributes'
        Object(_util__WEBPACK_IMPORTED_MODULE_0__["merge"])(htmlAttributes, htmlAttributes.attributes);
        delete htmlAttributes.attributes;
      }

      return htmlAttributes;
    }
    /**
     * Set a tag attribute named `name` to `value`
     * @function HtmlTag#setAttr
     * @param {string} name - the name of the attribute
     * @param {string} value - the value of the attribute
     */

  }, {
    key: "setAttr",
    value: function setAttr(name, value) {
      this.transformation().set("html_".concat(name), value);
      return this;
    }
    /**
     * Get the value of the tag attribute `name`
     * @function HtmlTag#getAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

  }, {
    key: "getAttr",
    value: function getAttr(name) {
      return this.attributes()["html_".concat(name)] || this.attributes()[name];
    }
    /**
     * Remove the tag attributed named `name`
     * @function HtmlTag#removeAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

  }, {
    key: "removeAttr",
    value: function removeAttr(name) {
      var ref;
      return (ref = this.transformation().remove("html_".concat(name))) != null ? ref : this.transformation().remove(name);
    }
    /**
     * @function HtmlTag#content
     * @protected
     * @ignore
     */

  }, {
    key: "content",
    value: function content() {
      return "";
    }
    /**
     * @function HtmlTag#openTag
     * @protected
     * @ignore
     */

  }, {
    key: "openTag",
    value: function openTag() {
      var tag = "<" + this.name;
      var htmlAttrs = this.htmlAttrs(this.attributes());

      if (htmlAttrs && htmlAttrs.length > 0) {
        tag += " " + htmlAttrs;
      }

      return tag + ">";
    }
    /**
     * @function HtmlTag#closeTag
     * @protected
     * @ignore
     */

  }, {
    key: "closeTag",
    value: function closeTag() {
      return "</".concat(this.name, ">");
    }
    /**
     * Generates an HTML representation of the tag.
     * @function HtmlTag#toHtml
     * @returns {string} Returns HTML in string format
     */

  }, {
    key: "toHtml",
    value: function toHtml() {
      return this.openTag() + this.content() + this.closeTag();
    }
    /**
     * Creates a DOM object representing the tag.
     * @function HtmlTag#toDOM
     * @returns {Element}
     */

  }, {
    key: "toDOM",
    value: function toDOM() {
      var element, name, ref, value;

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(typeof document !== "undefined" && document !== null ? document.createElement : void 0)) {
        throw "Can't create DOM if document is not present!";
      }

      element = document.createElement(this.name);
      ref = this.attributes();

      for (name in ref) {
        value = ref[name];
        element.setAttribute(name, value);
      }

      return element;
    }
  }], [{
    key: "new",
    value: function _new(name, publicId, options) {
      return new this(name, publicId, options);
    }
  }, {
    key: "isResponsive",
    value: function isResponsive(tag, responsiveClass) {
      var dataSrc;
      dataSrc = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getData"])(tag, 'src-cache') || Object(_util__WEBPACK_IMPORTED_MODULE_0__["getData"])(tag, 'src');
      return Object(_util__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(tag, responsiveClass) && /\bw_auto\b/.exec(dataSrc);
    }
  }]);

  return HtmlTag;
}();
/**
 * Represent the given key and value as an HTML attribute.
 * @function toAttribute
 * @protected
 * @param {string} key - attribute name
 * @param {*|boolean} value - the value of the attribute. If the value is boolean `true`, return the key only.
 * @returns {string} the attribute
 *
 */


function toAttribute(key, value) {
  if (!value) {
    return void 0;
  } else if (value === true) {
    return key;
  } else {
    return "".concat(key, "=\"").concat(value, "\"");
  }
}
/**
 * If given value is a string, replaces quotes with character entities (&#34;, &#39;)
 * @param value - value to change
 * @returns {*} changed value
 */


function escapeQuotes(value) {
  return Object(_util__WEBPACK_IMPORTED_MODULE_0__["isString"])(value) ? value.replace('"', '&#34;').replace("'", '&#39;') : value;
}

/* harmony default export */ __webpack_exports__["default"] = (HtmlTag);

/***/ }),

/***/ "./src/tags/imagetag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _htmltag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/tags/htmltag.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/url.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _util_srcsetUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/util/srcsetUtils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Image Tag
 * Depends on 'tags/htmltag', 'cloudinary'
 */





var ImageTag =
/*#__PURE__*/
function (_HtmlTag) {
  _inherits(ImageTag, _HtmlTag);

  /**
   * Creates an HTML (DOM) Image tag using Cloudinary as the source.
   * @constructor ImageTag
   * @extends HtmlTag
   * @param {string} [publicId]
   * @param {Object} [options]
   */
  function ImageTag(publicId) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ImageTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImageTag).call(this, "img", publicId, options));
  }
  /** @override */


  _createClass(ImageTag, [{
    key: "closeTag",
    value: function closeTag() {
      return "";
    }
    /** @override */

  }, {
    key: "attributes",
    value: function attributes() {
      var attr, options, srcAttribute;
      attr = _get(_getPrototypeOf(ImageTag.prototype), "attributes", this).call(this) || {};
      options = this.getOptions();
      var srcsetParam = this.getOption('srcset');
      var attributes = this.getOption('attributes') || {};
      var responsiveAttributes = {};

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isString"])(srcsetParam)) {
        responsiveAttributes.srcset = srcsetParam;
      } else {
        responsiveAttributes = Object(_util_srcsetUtils__WEBPACK_IMPORTED_MODULE_3__["generateImageResponsiveAttributes"])(this.publicId, attributes, srcsetParam, options);
      }

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_2__["isEmpty"])(responsiveAttributes)) {
        delete options.width;
        delete options.height;
      }

      Object(_util__WEBPACK_IMPORTED_MODULE_2__["merge"])(attr, responsiveAttributes);
      srcAttribute = options.responsive && !options.client_hints ? 'data-src' : 'src';

      if (attr[srcAttribute] == null) {
        attr[srcAttribute] = Object(_url__WEBPACK_IMPORTED_MODULE_1__["default"])(this.publicId, this.getOptions());
      }

      return attr;
    }
  }]);

  return ImageTag;
}(_htmltag__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ImageTag);

/***/ }),

/***/ "./src/tags/picturetag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _htmltag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/tags/htmltag.js");
/* harmony import */ var _imagetag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/tags/imagetag.js");
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/transformation.js");
/* harmony import */ var _sourcetag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/tags/sourcetag.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/util/lodash.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var PictureTag =
/*#__PURE__*/
function (_HtmlTag) {
  _inherits(PictureTag, _HtmlTag);

  function PictureTag(publicId) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var sources = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, PictureTag);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PictureTag).call(this, 'picture', publicId, options));
    _this.widthList = sources;
    return _this;
  }
  /** @override */


  _createClass(PictureTag, [{
    key: "content",
    value: function content() {
      var _this2 = this;

      return this.widthList.map(function (_ref) {
        var min_width = _ref.min_width,
            max_width = _ref.max_width,
            transformation = _ref.transformation;

        var options = _this2.getOptions();

        var sourceTransformation = new _transformation__WEBPACK_IMPORTED_MODULE_2__["default"](options);
        sourceTransformation.chain().fromOptions(typeof transformation === 'string' ? {
          raw_transformation: transformation
        } : transformation);
        options = Object(_util__WEBPACK_IMPORTED_MODULE_4__["extractUrlParams"])(options);
        options.media = {
          min_width: min_width,
          max_width: max_width
        };
        options.transformation = sourceTransformation;
        return new _sourcetag__WEBPACK_IMPORTED_MODULE_3__["default"](_this2.publicId, options).toHtml();
      }).join('') + new _imagetag__WEBPACK_IMPORTED_MODULE_1__["default"](this.publicId, this.getOptions()).toHtml();
    }
    /** @override */

  }, {
    key: "attributes",
    value: function attributes() {
      var attr = _get(_getPrototypeOf(PictureTag.prototype), "attributes", this).call(this);

      delete attr.width;
      delete attr.height;
      return attr;
    }
    /** @override */

  }, {
    key: "closeTag",
    value: function closeTag() {
      return "</" + this.name + ">";
    }
  }]);

  return PictureTag;
}(_htmltag__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PictureTag);

/***/ }),

/***/ "./src/tags/sourcetag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_srcsetUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/util/srcsetUtils.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/url.js");
/* harmony import */ var _htmltag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/tags/htmltag.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Image Tag
 * Depends on 'tags/htmltag', 'cloudinary'
 */





var SourceTag =
/*#__PURE__*/
function (_HtmlTag) {
  _inherits(SourceTag, _HtmlTag);

  /**
   * Creates an HTML (DOM) Image tag using Cloudinary as the source.
   * @constructor SourceTag
   * @extends HtmlTag
   * @param {string} [publicId]
   * @param {Object} [options]
   */
  function SourceTag(publicId) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SourceTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(SourceTag).call(this, "source", publicId, options));
  }
  /** @override */


  _createClass(SourceTag, [{
    key: "closeTag",
    value: function closeTag() {
      return "";
    }
    /** @override */

  }, {
    key: "attributes",
    value: function attributes() {
      var srcsetParam = this.getOption('srcset');
      var attr = _get(_getPrototypeOf(SourceTag.prototype), "attributes", this).call(this) || {};
      var options = this.getOptions();
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["merge"])(attr, Object(_util_srcsetUtils__WEBPACK_IMPORTED_MODULE_0__["generateImageResponsiveAttributes"])(this.publicId, attr, srcsetParam, options));

      if (!attr.srcset) {
        attr.srcset = Object(_url__WEBPACK_IMPORTED_MODULE_2__["default"])(this.publicId, options);
      }

      if (!attr.media && options.media) {
        attr.media = Object(_util_srcsetUtils__WEBPACK_IMPORTED_MODULE_0__["generateMediaAttr"])(options.media);
      }

      return attr;
    }
  }]);

  return SourceTag;
}(_htmltag__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SourceTag);

/***/ }),

/***/ "./src/tags/videotag.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constants.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/url.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _htmltag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/tags/htmltag.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Video Tag
 * Depends on 'tags/htmltag', 'util', 'cloudinary'
 */




var VIDEO_TAG_PARAMS = ['source_types', 'source_transformation', 'fallback_content', 'poster'];
var DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];
var DEFAULT_POSTER_OPTIONS = {
  format: 'jpg',
  resource_type: 'video'
};

var VideoTag =
/*#__PURE__*/
function (_HtmlTag) {
  _inherits(VideoTag, _HtmlTag);

  /**
   * Creates an HTML (DOM) Video tag using Cloudinary as the source.
   * @constructor VideoTag
   * @extends HtmlTag
   * @param {string} [publicId]
   * @param {Object} [options]
   */
  function VideoTag(publicId) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, VideoTag);

    options = Object(_util__WEBPACK_IMPORTED_MODULE_2__["defaults"])({}, options, _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_VIDEO_PARAMS"]);
    return _possibleConstructorReturn(this, _getPrototypeOf(VideoTag).call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ''), options));
  }
  /**
   * Set the transformation to apply on each source
   * @function VideoTag#setSourceTransformation
   * @param {Object} an object with pairs of source type and source transformation
   * @returns {VideoTag} Returns this instance for chaining purposes.
   */


  _createClass(VideoTag, [{
    key: "setSourceTransformation",
    value: function setSourceTransformation(value) {
      this.transformation().sourceTransformation(value);
      return this;
    }
    /**
     * Set the source types to include in the video tag
     * @function VideoTag#setSourceTypes
     * @param {Array<string>} an array of source types
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

  }, {
    key: "setSourceTypes",
    value: function setSourceTypes(value) {
      this.transformation().sourceTypes(value);
      return this;
    }
    /**
     * Set the poster to be used in the video tag
     * @function VideoTag#setPoster
     * @param {string|Object} value
     * - string: a URL to use for the poster
     * - Object: transformation parameters to apply to the poster. May optionally include a public_id to use instead of the video public_id.
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

  }, {
    key: "setPoster",
    value: function setPoster(value) {
      this.transformation().poster(value);
      return this;
    }
    /**
     * Set the content to use as fallback in the video tag
     * @function VideoTag#setFallbackContent
     * @param {string} value - the content to use, in HTML format
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

  }, {
    key: "setFallbackContent",
    value: function setFallbackContent(value) {
      this.transformation().fallbackContent(value);
      return this;
    }
  }, {
    key: "content",
    value: function content() {
      var fallback, innerTags, type, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
      sourceTypes = this.transformation().getValue('source_types');
      sourceTransformation = this.transformation().getValue('source_transformation');
      fallback = this.transformation().getValue('fallback_content');

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(sourceTypes)) {
        var options = this.getOptions();

        innerTags = function () {
          var i, len, results;
          results = [];

          for (i = 0, len = sourceTypes.length; i < len; i++) {
            srcType = sourceTypes[i];
            transformation = sourceTransformation[srcType] || {};
            src = Object(_url__WEBPACK_IMPORTED_MODULE_1__["default"])("".concat(this.publicId), Object(_util__WEBPACK_IMPORTED_MODULE_2__["defaults"])({}, transformation, {
              resource_type: 'video',
              format: srcType
            }, options));
            videoType = srcType === 'ogv' ? 'ogg' : srcType;
            type = 'video/' + videoType;
            results.push("<source ".concat(this.htmlAttrs({
              src: src,
              type: type
            }), ">"));
          }

          return results;
        }.call(this);
      } else {
        innerTags = [];
      }

      return innerTags.join('') + fallback;
    }
  }, {
    key: "attributes",
    value: function attributes() {
      var a, attr, defaultOptions, i, len, poster, ref, ref1, sourceTypes;
      sourceTypes = this.getOption('source_types');
      poster = (ref = this.getOption('poster')) != null ? ref : {};

      if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(poster)) {
        defaultOptions = poster.public_id != null ? _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_IMAGE_PARAMS"] : DEFAULT_POSTER_OPTIONS;
        poster = Object(_url__WEBPACK_IMPORTED_MODULE_1__["default"])((ref1 = poster.public_id) != null ? ref1 : this.publicId, Object(_util__WEBPACK_IMPORTED_MODULE_2__["defaults"])({}, poster, defaultOptions, this.getOptions()));
      }

      attr = _get(_getPrototypeOf(VideoTag.prototype), "attributes", this).call(this) || [];

      for (i = 0, len = attr.length; i < len; i++) {
        a = attr[i];

        if (!Object(_util__WEBPACK_IMPORTED_MODULE_2__["contains"])(VIDEO_TAG_PARAMS)) {
          attr = a;
        }
      }

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_2__["isArray"])(sourceTypes)) {
        attr["src"] = Object(_url__WEBPACK_IMPORTED_MODULE_1__["default"])(this.publicId, this.getOptions(), {
          resource_type: 'video',
          format: sourceTypes
        });
      }

      if (poster != null) {
        attr["poster"] = poster;
      }

      return attr;
    }
  }]);

  return VideoTag;
}(_htmltag__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (VideoTag);

/***/ }),

/***/ "./src/transformation.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/expression.js");
/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/condition.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/configuration.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _parameters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/parameters.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






/**
 * Assign key, value to target, when value is not null.<br>
 *   This function mutates the target!
 * @param {object} target the object to assign the values to
 * @param {object} sources one or more objects to get values from
 * @returns {object} the target after the assignment
 */

function assignNotNull(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      if (source[key] != null) {
        target[key] = source[key];
      }
    });
  });
  return target;
}
/**
 * TransformationBase
 * Depends on 'configuration', 'parameters','util'
 * @internal
 */


var TransformationBase =
/*#__PURE__*/
function () {
  /**
   * The base class for transformations.
   * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
   * @class TransformationBase
   */
  function TransformationBase(options) {
    _classCallCheck(this, TransformationBase);

    /** @private */

    /** @private */
    var parent, trans;
    parent = void 0;
    trans = {};
    /**
     * Return an options object that can be used to create an identical Transformation
     * @function Transformation#toOptions
     * @return {Object} Returns a plain object representing this transformation
     */

    this.toOptions = function (withChain) {
      var opt = {};

      if (withChain == null) {
        withChain = true;
      }

      Object.keys(trans).forEach(function (key) {
        return opt[key] = trans[key].origValue;
      });
      assignNotNull(opt, this.otherOptions);

      if (withChain && !Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(this.chained)) {
        var list = this.chained.map(function (tr) {
          return tr.toOptions();
        });
        list.push(opt);
        opt = {};
        assignNotNull(opt, this.otherOptions);
        opt.transformation = list;
      }

      return opt;
    };
    /**
     * Set a parent for this object for chaining purposes.
     *
     * @function Transformation#setParent
     * @param {Object} object - the parent to be assigned to
     * @returns {Transformation} Returns this instance for chaining purposes.
     */


    this.setParent = function (object) {
      parent = object;

      if (object != null) {
        this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
      }

      return this;
    };
    /**
     * Returns the parent of this object in the chain
     * @function Transformation#getParent
     * @protected
     * @return {Object} Returns the parent of this object if there is any
     */


    this.getParent = function () {
      return parent;
    }; // Helper methods to create parameter methods
    // These methods are defined here because they access `trans` which is
    // a private member of `TransformationBase`

    /** @protected */


    this.param = function (value, name, abbr, defaultValue, process) {
      if (process == null) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(defaultValue)) {
          process = defaultValue;
        } else {
          process = _util__WEBPACK_IMPORTED_MODULE_3__["identity"];
        }
      }

      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["Param"](name, abbr, process).set(value);
      return this;
    };
    /** @protected */


    this.rawParam = function (value, name, abbr, defaultValue) {
      var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _util__WEBPACK_IMPORTED_MODULE_3__["identity"];
      process = lastArgCallback(arguments);
      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["RawParam"](name, abbr, process).set(value);
      return this;
    };
    /** @protected */


    this.rangeParam = function (value, name, abbr, defaultValue) {
      var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _util__WEBPACK_IMPORTED_MODULE_3__["identity"];
      process = lastArgCallback(arguments);
      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["RangeParam"](name, abbr, process).set(value);
      return this;
    };
    /** @protected */


    this.arrayParam = function (value, name, abbr) {
      var sep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ":";
      var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _util__WEBPACK_IMPORTED_MODULE_3__["identity"];
      process = lastArgCallback(arguments);
      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["ArrayParam"](name, abbr, sep, process).set(value);
      return this;
    };
    /** @protected */


    this.transformationParam = function (value, name, abbr) {
      var sep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ".";
      var defaultValue = arguments.length > 4 ? arguments[4] : undefined;
      var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _util__WEBPACK_IMPORTED_MODULE_3__["identity"];
      process = lastArgCallback(arguments);
      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["TransformationParam"](name, abbr, sep, process).set(value);
      return this;
    };

    this.layerParam = function (value, name, abbr) {
      trans[name] = new _parameters__WEBPACK_IMPORTED_MODULE_4__["LayerParam"](name, abbr).set(value);
      return this;
    }; // End Helper methods

    /**
     * Get the value associated with the given name.
     * @function Transformation#getValue
     * @param {string} name - the name of the parameter
     * @return {*} the processed value associated with the given name
     * @description Use {@link get}.origValue for the value originally provided for the parameter
     */


    this.getValue = function (name) {
      var value = trans[name] && trans[name].value();
      return value != null ? value : this.otherOptions[name];
    };
    /**
     * Get the parameter object for the given parameter name
     * @function Transformation#get
     * @param {string} name the name of the transformation parameter
     * @returns {Param} the param object for the given name, or undefined
     */


    this.get = function (name) {
      return trans[name];
    };
    /**
     * Remove a transformation option from the transformation.
     * @function Transformation#remove
     * @param {string} name - the name of the option to remove
     * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
     *              returned value depends on the value.
     */


    this.remove = function (name) {
      var temp;

      switch (false) {
        case trans[name] == null:
          temp = trans[name];
          delete trans[name];
          return temp.origValue;

        case this.otherOptions[name] == null:
          temp = this.otherOptions[name];
          delete this.otherOptions[name];
          return temp;

        default:
          return null;
      }
    };
    /**
     * Return an array of all the keys (option names) in the transformation.
     * @return {Array<string>} the keys in snakeCase format
     */


    this.keys = function () {
      var key;
      return function () {
        var results;
        results = [];

        for (key in trans) {
          if (key != null) {
            results.push(key.match(VAR_NAME_RE) ? key : Object(_util__WEBPACK_IMPORTED_MODULE_3__["snakeCase"])(key));
          }
        }

        return results;
      }().sort();
    };
    /**
     * Returns a plain object representation of the transformation. Values are processed.
     * @function Transformation#toPlainObject
     * @return {Object} the transformation options as plain object
     */


    this.toPlainObject = function () {
      var hash, key, list;
      hash = {};

      for (key in trans) {
        hash[key] = trans[key].value();

        if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isPlainObject"])(hash[key])) {
          hash[key] = Object(_util__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(hash[key]);
        }
      }

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(this.chained)) {
        list = this.chained.map(function (tr) {
          return tr.toPlainObject();
        });
        list.push(hash);
        hash = {
          transformation: list
        };
      }

      return hash;
    };
    /**
     * Complete the current transformation and chain to a new one.
     * In the URL, transformations are chained together by slashes.
     * @function Transformation#chain
     * @return {Transformation} Returns this transformation for chaining
     * @example
     * var tr = cloudinary.Transformation.new();
     * tr.width(10).crop('fit').chain().angle(15).serialize()
     * // produces "c_fit,w_10/a_15"
     */


    this.chain = function () {
      var names, tr;
      names = Object.getOwnPropertyNames(trans);

      if (names.length !== 0) {
        tr = new this.constructor(this.toOptions(false));
        this.resetTransformations();
        this.chained.push(tr);
      }

      return this;
    };

    this.resetTransformations = function () {
      trans = {};
      return this;
    };

    this.otherOptions = {};
    this.chained = [];
    this.fromOptions(options);
  }
  /**
   * Merge the provided options with own's options
   * @param {Object} [options={}] key-value list of options
   * @returns {Transformation} Returns this instance for chaining
   */


  _createClass(TransformationBase, [{
    key: "fromOptions",
    value: function fromOptions(options) {
      if (!Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(options)) {
        if (options instanceof TransformationBase) {
          this.fromTransformation(options);
        } else {
          options || (options = {});

          if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isString"])(options) || Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(options)) {
            options = {
              transformation: options
            };
          }

          options = Object(_util__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(options, function (value) {
            if (value instanceof TransformationBase) {
              return new value.constructor(value.toOptions());
            }
          }); // Handling of "if" statements precedes other options as it creates a chained transformation

          if (options["if"]) {
            this.set("if", options["if"]);
            delete options["if"];
          }

          for (var key in options) {
            var opt = options[key];

            if (key.match(VAR_NAME_RE)) {
              if (key !== '$attr') {
                this.set('variable', key, opt);
              }
            } else {
              this.set(key, opt);
            }
          }
        }
      }

      return this;
    }
  }, {
    key: "fromTransformation",
    value: function fromTransformation(other) {
      var _this = this;

      if (other instanceof TransformationBase) {
        other.keys().forEach(function (key) {
          return _this.set(key, other.get(key).origValue);
        });
      }

      return this;
    }
    /**
     * Set a parameter.
     * The parameter name `key` is converted to
     * @param {string} key - the name of the parameter
     * @param {*} values - the value of the parameter
     * @returns {Transformation} Returns this instance for chaining
     */

  }, {
    key: "set",
    value: function set(key) {
      var camelKey;
      camelKey = Object(_util__WEBPACK_IMPORTED_MODULE_3__["camelCase"])(key);

      for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["contains"])(Transformation.methods, camelKey)) {
        this[camelKey].apply(this, values);
      } else {
        this.otherOptions[key] = values[0];
      }

      return this;
    }
  }, {
    key: "hasLayer",
    value: function hasLayer() {
      return this.getValue("overlay") || this.getValue("underlay");
    }
    /**
     * Generate a string representation of the transformation.
     * @function Transformation#serialize
     * @return {string} Returns the transformation as a string
     */

  }, {
    key: "serialize",
    value: function serialize() {
      var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, transformationList, transformationString, transformations, value, variables, vars;
      resultArray = this.chained.map(function (tr) {
        return tr.serialize();
      });
      paramList = this.keys();
      transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
      ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
      variables = processVar((ref2 = this.get("variables")) != null ? ref2.value() : void 0);
      paramList = Object(_util__WEBPACK_IMPORTED_MODULE_3__["difference"])(paramList, ["transformation", "if", "variables"]);
      vars = [];
      transformationList = [];

      for (j = 0, len = paramList.length; j < len; j++) {
        t = paramList[j];

        if (t.match(VAR_NAME_RE)) {
          vars.push(t + "_" + _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize((ref3 = this.get(t)) != null ? ref3.value() : void 0));
        } else {
          transformationList.push((ref4 = this.get(t)) != null ? ref4.serialize() : void 0);
        }
      }

      switch (false) {
        case !Object(_util__WEBPACK_IMPORTED_MODULE_3__["isString"])(transformations):
          transformationList.push(transformations);
          break;

        case !Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(transformations):
          resultArray = resultArray.concat(transformations);
      }

      transformationList = function () {
        var k, len1, results;
        results = [];

        for (k = 0, len1 = transformationList.length; k < len1; k++) {
          value = transformationList[k];

          if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(value) && !Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(value) || !Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(value) && value) {
            results.push(value);
          }
        }

        return results;
      }();

      transformationList = vars.sort().concat(variables).concat(transformationList.sort());

      if (ifParam === "if_end") {
        transformationList.push(ifParam);
      } else if (!Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(ifParam)) {
        transformationList.unshift(ifParam);
      }

      transformationString = Object(_util__WEBPACK_IMPORTED_MODULE_3__["compact"])(transformationList).join(this.param_separator);

      if (!Object(_util__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(transformationString)) {
        resultArray.push(transformationString);
      }

      return Object(_util__WEBPACK_IMPORTED_MODULE_3__["compact"])(resultArray).join(this.trans_separator);
    }
    /**
     * Provide a list of all the valid transformation option names
     * @function Transformation#listNames
     * @private
     * @return {Array<string>} a array of all the valid option names
     */

  }, {
    key: "listNames",
    value: function listNames() {
      return Transformation.methods;
    }
    /**
     * Returns attributes for an HTML tag.
     * @function Cloudinary.toHtmlAttributes
     * @return PlainObject
     */

  }, {
    key: "toHtmlAttributes",
    value: function toHtmlAttributes() {
      var _this2 = this;

      var attrName, height, key, options, ref2, ref3, value, width;
      options = {};

      for (key in this.otherOptions) {
        value = this.otherOptions[key];

        if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["contains"])(Transformation.PARAM_NAMES, Object(_util__WEBPACK_IMPORTED_MODULE_3__["snakeCase"])(key))) {
          continue;
        }

        attrName = /^html_/.test(key) ? key.slice(5) : key;
        options[attrName] = value;
      } // convert all "html_key" to "key" with the same value


      this.keys().forEach(function (key) {
        if (/^html_/.test(key)) {
          options[Object(_util__WEBPACK_IMPORTED_MODULE_3__["camelCase"])(key.slice(5))] = _this2.getValue(key);
        }
      });

      if (!(this.hasLayer() || this.getValue("angle") || Object(_util__WEBPACK_IMPORTED_MODULE_3__["contains"])(["fit", "limit", "lfill"], this.getValue("crop")))) {
        width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
        height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;

        if (parseFloat(width) >= 1.0) {
          if (options['width'] == null) {
            options['width'] = width;
          }
        }

        if (parseFloat(height) >= 1.0) {
          if (options['height'] == null) {
            options['height'] = height;
          }
        }
      }

      return options;
    }
  }, {
    key: "isValidParamName",
    value: function isValidParamName(name) {
      return Transformation.methods.indexOf(Object(_util__WEBPACK_IMPORTED_MODULE_3__["camelCase"])(name)) >= 0;
    }
    /**
     * Delegate to the parent (up the call chain) to produce HTML
     * @function Transformation#toHtml
     * @return {string} HTML representation of the parent if possible.
     * @example
     * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
     * // ImageTag {name: "img", publicId: "sample"}
     * tag.toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
     * tag.transformation().crop("fit").width(300).toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
     */

  }, {
    key: "toHtml",
    value: function toHtml() {
      var ref;
      return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.serialize();
    }
  }]);

  return TransformationBase;
}();

var VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/;
TransformationBase.prototype.trans_separator = '/';
TransformationBase.prototype.param_separator = ',';

function lastArgCallback(args) {
  var callback;
  callback = args != null ? args[args.length - 1] : void 0;

  if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(callback)) {
    return callback;
  } else {
    return void 0;
  }
}

function processVar(varArray) {
  var j, len, name, results, v;

  if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(varArray)) {
    results = [];

    for (j = 0, len = varArray.length; j < len; j++) {
      var _varArray$j = _slicedToArray(varArray[j], 2);

      name = _varArray$j[0];
      v = _varArray$j[1];
      results.push("".concat(name, "_").concat(_expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(v)));
    }

    return results;
  } else {
    return varArray;
  }
}
/**
 * Transformation Class methods.
 * This is a list of the parameters defined in Transformation.
 * Values are camelCased.
 * @const Transformation.methods
 * @private
 * @ignore
 * @type {Array<string>}
 */

/**
 * Parameters that are filtered out before passing the options to an HTML tag.
 *
 * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
 * @const {Array<string>} Transformation.PARAM_NAMES
 * @private
 * @ignore
 * @see toHtmlAttributes
 */


var Transformation =
/*#__PURE__*/
function (_TransformationBase) {
  _inherits(Transformation, _TransformationBase);

  /**
   *  Represents a single transformation.
   *  @class Transformation
   *  @example
   *  t = new cloudinary.Transformation();
   * t.angle(20).crop("scale").width("auto");
   *
   * // or
   *
   * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
   */
  function Transformation(options) {
    _classCallCheck(this, Transformation);

    return _possibleConstructorReturn(this, _getPrototypeOf(Transformation).call(this, options));
  }
  /**
   * Convenience constructor
   * @param {Object} options
   * @return {Transformation}
   * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
   */


  _createClass(Transformation, [{
    key: "angle",

    /*
      Transformation Parameters
    */
    value: function angle(value) {
      return this.arrayParam(value, "angle", "a", ".", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "audioCodec",
    value: function audioCodec(value) {
      return this.param(value, "audio_codec", "ac");
    }
  }, {
    key: "audioFrequency",
    value: function audioFrequency(value) {
      return this.param(value, "audio_frequency", "af");
    }
  }, {
    key: "aspectRatio",
    value: function aspectRatio(value) {
      return this.param(value, "aspect_ratio", "ar", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "background",
    value: function background(value) {
      return this.param(value, "background", "b", _parameters__WEBPACK_IMPORTED_MODULE_4__["Param"].norm_color);
    }
  }, {
    key: "bitRate",
    value: function bitRate(value) {
      return this.param(value, "bit_rate", "br");
    }
  }, {
    key: "border",
    value: function border(value) {
      return this.param(value, "border", "bo", function (border) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isPlainObject"])(border)) {
          border = Object(_util__WEBPACK_IMPORTED_MODULE_3__["assign"])({}, {
            color: "black",
            width: 2
          }, border);
          return "".concat(border.width, "px_solid_").concat(_parameters__WEBPACK_IMPORTED_MODULE_4__["Param"].norm_color(border.color));
        } else {
          return border;
        }
      });
    }
  }, {
    key: "color",
    value: function color(value) {
      return this.param(value, "color", "co", _parameters__WEBPACK_IMPORTED_MODULE_4__["Param"].norm_color);
    }
  }, {
    key: "colorSpace",
    value: function colorSpace(value) {
      return this.param(value, "color_space", "cs");
    }
  }, {
    key: "crop",
    value: function crop(value) {
      return this.param(value, "crop", "c");
    }
  }, {
    key: "defaultImage",
    value: function defaultImage(value) {
      return this.param(value, "default_image", "d");
    }
  }, {
    key: "delay",
    value: function delay(value) {
      return this.param(value, "delay", "dl");
    }
  }, {
    key: "density",
    value: function density(value) {
      return this.param(value, "density", "dn");
    }
  }, {
    key: "duration",
    value: function duration(value) {
      return this.rangeParam(value, "duration", "du");
    }
  }, {
    key: "dpr",
    value: function dpr(value) {
      return this.param(value, "dpr", "dpr", function (dpr) {
        dpr = dpr.toString();

        if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
          return dpr + ".0";
        } else {
          return _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(dpr);
        }
      });
    }
  }, {
    key: "effect",
    value: function effect(value) {
      return this.arrayParam(value, "effect", "e", ":", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "else",
    value: function _else() {
      return this.if('else');
    }
  }, {
    key: "endIf",
    value: function endIf() {
      return this.if('end');
    }
  }, {
    key: "endOffset",
    value: function endOffset(value) {
      return this.rangeParam(value, "end_offset", "eo");
    }
  }, {
    key: "fallbackContent",
    value: function fallbackContent(value) {
      return this.param(value, "fallback_content");
    }
  }, {
    key: "fetchFormat",
    value: function fetchFormat(value) {
      return this.param(value, "fetch_format", "f");
    }
  }, {
    key: "format",
    value: function format(value) {
      return this.param(value, "format");
    }
  }, {
    key: "flags",
    value: function flags(value) {
      return this.arrayParam(value, "flags", "fl", ".");
    }
  }, {
    key: "gravity",
    value: function gravity(value) {
      return this.param(value, "gravity", "g");
    }
  }, {
    key: "fps",
    value: function fps(value) {
      return this.param(value, "fps", "fps", function (fps) {
        if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isString"])(fps)) {
          return fps;
        } else if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(fps)) {
          return fps.join("-");
        } else {
          return fps;
        }
      });
    }
  }, {
    key: "height",
    value: function height(value) {
      var _this3 = this;

      return this.param(value, "height", "h", function () {
        if (_this3.getValue("crop") || _this3.getValue("overlay") || _this3.getValue("underlay")) {
          return _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(value);
        } else {
          return null;
        }
      });
    }
  }, {
    key: "htmlHeight",
    value: function htmlHeight(value) {
      return this.param(value, "html_height");
    }
  }, {
    key: "htmlWidth",
    value: function htmlWidth(value) {
      return this.param(value, "html_width");
    }
  }, {
    key: "if",
    value: function _if() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var i, ifVal, j, ref, trIf, trRest;

      switch (value) {
        case "else":
          this.chain();
          return this.param(value, "if", "if");

        case "end":
          this.chain();

          for (i = j = ref = this.chained.length - 1; j >= 0; i = j += -1) {
            ifVal = this.chained[i].getValue("if");

            if (ifVal === "end") {
              break;
            } else if (ifVal != null) {
              trIf = Transformation.new().if(ifVal);
              this.chained[i].remove("if");
              trRest = this.chained[i];
              this.chained[i] = Transformation.new().transformation([trIf, trRest]);

              if (ifVal !== "else") {
                break;
              }
            }
          }

          return this.param(value, "if", "if");

        case "":
          return _condition__WEBPACK_IMPORTED_MODULE_1__["default"].new().setParent(this);

        default:
          return this.param(value, "if", "if", function (value) {
            return _condition__WEBPACK_IMPORTED_MODULE_1__["default"].new(value).toString();
          });
      }
    }
  }, {
    key: "keyframeInterval",
    value: function keyframeInterval(value) {
      return this.param(value, "keyframe_interval", "ki");
    }
  }, {
    key: "offset",
    value: function offset(value) {
      var end_o, start_o;

      var _ref = Object(_util__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(value != null ? value.split : void 0) ? value.split('..') : Object(_util__WEBPACK_IMPORTED_MODULE_3__["isArray"])(value) ? value : [null, null];

      var _ref2 = _slicedToArray(_ref, 2);

      start_o = _ref2[0];
      end_o = _ref2[1];

      if (start_o != null) {
        this.startOffset(start_o);
      }

      if (end_o != null) {
        return this.endOffset(end_o);
      }
    }
  }, {
    key: "opacity",
    value: function opacity(value) {
      return this.param(value, "opacity", "o", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "overlay",
    value: function overlay(value) {
      return this.layerParam(value, "overlay", "l");
    }
  }, {
    key: "page",
    value: function page(value) {
      return this.param(value, "page", "pg");
    }
  }, {
    key: "poster",
    value: function poster(value) {
      return this.param(value, "poster");
    }
  }, {
    key: "prefix",
    value: function prefix(value) {
      return this.param(value, "prefix", "p");
    }
  }, {
    key: "quality",
    value: function quality(value) {
      return this.param(value, "quality", "q", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "radius",
    value: function radius(value) {
      return this.arrayParam(value, "radius", "r", ":", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "rawTransformation",
    value: function rawTransformation(value) {
      return this.rawParam(value, "raw_transformation");
    }
  }, {
    key: "size",
    value: function size(value) {
      var height, width;

      if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(value != null ? value.split : void 0)) {
        var _value$split = value.split('x');

        var _value$split2 = _slicedToArray(_value$split, 2);

        width = _value$split2[0];
        height = _value$split2[1];
        this.width(width);
        return this.height(height);
      }
    }
  }, {
    key: "sourceTypes",
    value: function sourceTypes(value) {
      return this.param(value, "source_types");
    }
  }, {
    key: "sourceTransformation",
    value: function sourceTransformation(value) {
      return this.param(value, "source_transformation");
    }
  }, {
    key: "startOffset",
    value: function startOffset(value) {
      return this.rangeParam(value, "start_offset", "so");
    }
  }, {
    key: "streamingProfile",
    value: function streamingProfile(value) {
      return this.param(value, "streaming_profile", "sp");
    }
  }, {
    key: "transformation",
    value: function transformation(value) {
      return this.transformationParam(value, "transformation", "t");
    }
  }, {
    key: "underlay",
    value: function underlay(value) {
      return this.layerParam(value, "underlay", "u");
    }
  }, {
    key: "variable",
    value: function variable(name, value) {
      return this.param(value, name, name);
    }
  }, {
    key: "variables",
    value: function variables(values) {
      return this.arrayParam(values, "variables");
    }
  }, {
    key: "videoCodec",
    value: function videoCodec(value) {
      return this.param(value, "video_codec", "vc", _parameters__WEBPACK_IMPORTED_MODULE_4__["Param"].process_video_params);
    }
  }, {
    key: "videoSampling",
    value: function videoSampling(value) {
      return this.param(value, "video_sampling", "vs");
    }
  }, {
    key: "width",
    value: function width(value) {
      var _this4 = this;

      return this.param(value, "width", "w", function () {
        if (_this4.getValue("crop") || _this4.getValue("overlay") || _this4.getValue("underlay")) {
          return _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(value);
        } else {
          return null;
        }
      });
    }
  }, {
    key: "x",
    value: function x(value) {
      return this.param(value, "x", "x", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "y",
    value: function y(value) {
      return this.param(value, "y", "y", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }, {
    key: "zoom",
    value: function zoom(value) {
      return this.param(value, "zoom", "z", _expression__WEBPACK_IMPORTED_MODULE_0__["default"].normalize);
    }
  }], [{
    key: "new",
    value: function _new(options) {
      return new Transformation(options);
    }
  }]);

  return Transformation;
}(TransformationBase);
/**
 * Transformation Class methods.
 * This is a list of the parameters defined in Transformation.
 * Values are camelCased.
 */


Transformation.methods = ["angle", "audioCodec", "audioFrequency", "aspectRatio", "background", "bitRate", "border", "color", "colorSpace", "crop", "defaultImage", "delay", "density", "duration", "dpr", "effect", "else", "endIf", "endOffset", "fallbackContent", "fetchFormat", "format", "flags", "gravity", "fps", "height", "htmlHeight", "htmlWidth", "if", "keyframeInterval", "offset", "opacity", "overlay", "page", "poster", "prefix", "quality", "radius", "rawTransformation", "size", "sourceTypes", "sourceTransformation", "startOffset", "streamingProfile", "transformation", "underlay", "variable", "variables", "videoCodec", "videoSampling", "width", "x", "y", "zoom"];
/**
 * Parameters that are filtered out before passing the options to an HTML tag.
 *
 * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
 */

Transformation.PARAM_NAMES = Transformation.methods.map(_util__WEBPACK_IMPORTED_MODULE_3__["snakeCase"]).concat(_configuration__WEBPACK_IMPORTED_MODULE_2__["default"].CONFIG_PARAMS);
/* harmony default export */ __webpack_exports__["default"] = (Transformation);

/***/ }),

/***/ "./src/url.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return url; });
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/transformation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _crc32__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/crc32.js");





function absolutize(url) {
  var prefix;

  if (!url.match(/^https?:\//)) {
    prefix = document.location.protocol + '//' + document.location.host;

    if (url[0] === '?') {
      prefix += document.location.pathname;
    } else if (url[0] !== '/') {
      prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
    }

    url = prefix + url;
  }

  return url;
} // Produce a number between 1 and 5 to be used for cdn sub domains designation


function cdnSubdomainNumber(publicId) {
  return Object(_crc32__WEBPACK_IMPORTED_MODULE_3__["default"])(publicId) % 5 + 1;
} //  * cdn_subdomain - Boolean (default: false). Whether to automatically build URLs with multiple CDN sub-domains. See this blog post for more details.
//  * private_cdn - Boolean (default: false). Should be set to true for Advanced plan's users that have a private CDN distribution.
//  * secure_distribution - The domain name of the CDN distribution to use for building HTTPS URLs. Relevant only for Advanced plan's users that have a private CDN distribution.
//  * cname - Custom domain name to use for building HTTP URLs. Relevant only for Advanced plan's users that have a private CDN distribution and a custom CNAME.
//  * secure - Boolean (default: false). Force HTTPS URLs of images even if embedded in non-secure HTTP pages.


function cloudinaryUrlPrefix(publicId, options) {
  var cdnPart, host, path, protocol, ref, subdomain;

  if (((ref = options.cloud_name) != null ? ref.indexOf("/") : void 0) === 0) {
    return '/res' + options.cloud_name;
  } // defaults


  protocol = "http://";
  cdnPart = "";
  subdomain = "res";
  host = ".cloudinary.com";
  path = "/" + options.cloud_name; // modifications

  if (options.protocol) {
    protocol = options.protocol + '//';
  }

  if (options.private_cdn) {
    cdnPart = options.cloud_name + "-";
    path = "";
  }

  if (options.cdn_subdomain) {
    subdomain = "res-" + cdnSubdomainNumber(publicId);
  }

  if (options.secure) {
    protocol = "https://";

    if (options.secure_cdn_subdomain === false) {
      subdomain = "res";
    }

    if (options.secure_distribution != null && options.secure_distribution !== _constants__WEBPACK_IMPORTED_MODULE_1__["OLD_AKAMAI_SHARED_CDN"] && options.secure_distribution !== _constants__WEBPACK_IMPORTED_MODULE_1__["SHARED_CDN"]) {
      cdnPart = "";
      subdomain = "";
      host = options.secure_distribution;
    }
  } else if (options.cname) {
    protocol = "http://";
    cdnPart = "";
    subdomain = options.cdn_subdomain ? 'a' + (Object(_crc32__WEBPACK_IMPORTED_MODULE_3__["default"])(publicId) % 5 + 1) + '.' : '';
    host = options.cname;
  }

  return [protocol, cdnPart, subdomain, host, path].join("");
}
/**
 * Return the resource type and action type based on the given configuration
 * @function Cloudinary#finalizeResourceType
 * @param {Object|string} resourceType
 * @param {string} [type='upload']
 * @param {string} [urlSuffix]
 * @param {boolean} [useRootPath]
 * @param {boolean} [shorten]
 * @returns {string} resource_type/type
 * @ignore
 */


function finalizeResourceType() {
  var resourceType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image";
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "upload";
  var urlSuffix = arguments.length > 2 ? arguments[2] : undefined;
  var useRootPath = arguments.length > 3 ? arguments[3] : undefined;
  var shorten = arguments.length > 4 ? arguments[4] : undefined;
  var options;
  resourceType = resourceType == null ? "image" : resourceType;
  type = type == null ? "upload" : type;

  if (Object(_util__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(resourceType)) {
    options = resourceType;
    resourceType = options.resource_type;
    type = options.type;
    urlSuffix = options.url_suffix;
    useRootPath = options.use_root_path;
    shorten = options.shorten;
  }

  if (type == null) {
    type = 'upload';
  }

  if (urlSuffix != null) {
    resourceType = _constants__WEBPACK_IMPORTED_MODULE_1__["SEO_TYPES"]["".concat(resourceType, "/").concat(type)];
    type = null;

    if (resourceType == null) {
      throw new Error("URL Suffix only supported for ".concat(Object.keys(_constants__WEBPACK_IMPORTED_MODULE_1__["SEO_TYPES"]).join(', ')));
    }
  }

  if (useRootPath) {
    if (resourceType === 'image' && type === 'upload' || resourceType === "images") {
      resourceType = null;
      type = null;
    } else {
      throw new Error("Root path only supported for image/upload");
    }
  }

  if (shorten && resourceType === 'image' && type === 'upload') {
    resourceType = 'iu';
    type = null;
  }

  return [resourceType, type].join("/");
}
/**
 * Generate an resource URL.
 * @function Cloudinary#url
 * @param {string} publicId - the public ID of the resource
 * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
 *                          and {@link Configuration} parameters
 * @param {string} [options.type='upload'] - the classification of the resource
 * @param {Object} [options.resource_type='image'] - the type of the resource
 * @param {Object} [config] URL configuration
 * @return {string} The resource URL
 */


function url(publicId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var error, prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;

  if (!publicId) {
    return publicId;
  }

  if (options instanceof _transformation__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    options = options.toOptions();
  }

  options = Object(_util__WEBPACK_IMPORTED_MODULE_2__["defaults"])({}, options, config, _constants__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_IMAGE_PARAMS"]);

  if (options.type === 'fetch') {
    options.fetch_format = options.fetch_format || options.format;
    publicId = absolutize(publicId);
  }

  transformation = new _transformation__WEBPACK_IMPORTED_MODULE_0__["default"](options);
  transformationString = transformation.serialize();

  if (!options.cloud_name) {
    throw 'Unknown cloud_name';
  } // if publicId has a '/' and doesn't begin with v<number> and doesn't start with http[s]:/ and version is empty


  if (publicId.search('/') >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !((ref = options.version) != null ? ref.toString() : void 0)) {
    options.version = 1;
  }

  if (publicId.match(/^https?:/)) {
    if (options.type === 'upload' || options.type === 'asset') {
      url = publicId;
    } else {
      publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
    }
  } else {
    try {
      // Make sure publicId is URI encoded.
      publicId = decodeURIComponent(publicId);
    } catch (error1) {
      error = error1;
    }

    publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');

    if (options.url_suffix) {
      if (options.url_suffix.match(/[\.\/]/)) {
        throw 'url_suffix should not include . or /';
      }

      publicId = publicId + '/' + options.url_suffix;
    }

    if (options.format) {
      if (!options.trust_public_id) {
        publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, '');
      }

      publicId = publicId + '.' + options.format;
    }
  }

  prefix = cloudinaryUrlPrefix(publicId, options);
  resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten);
  version = options.version ? 'v' + options.version : '';
  return url || Object(_util__WEBPACK_IMPORTED_MODULE_2__["compact"])([prefix, resourceTypeAndType, transformationString, version, publicId]).join('/').replace(/([^:])\/+/g, '$1/');
}
;

/***/ }),

/***/ "./src/utf8_encode.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * UTF8 encoder
 *
 */
var utf8_encode;
/* harmony default export */ __webpack_exports__["default"] = (utf8_encode = function utf8_encode(argString) {
  var c1, enc, end, n, start, string, stringl, utftext; // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: sowberry
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +   improved by: Yves Sucaet
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Ulrich
  // +   bugfixed by: Rafal Kukawski
  // +   improved by: kirilloid
  // *     example 1: utf8_encode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return '';
  }

  string = argString + ''; // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  utftext = '';
  start = void 0;
  end = void 0;
  stringl = 0;
  start = end = 0;
  stringl = string.length;
  n = 0;

  while (n < stringl) {
    c1 = string.charCodeAt(n);
    enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
    } else {
      enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
    }

    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }

      utftext += enc;
      start = end = n + 1;
    }

    n++;
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
});

/***/ }),

/***/ "./src/util/baseutil.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allStrings", function() { return allStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "without", function() { return without; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberLike", function() { return isNumberLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smartEscape", function() { return smartEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return defaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectProto", function() { return objectProto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objToString", function() { return objToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funcTag", function() { return funcTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reWords", function() { return reWords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return camelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snakeCase", function() { return snakeCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertKeys", function() { return convertKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withCamelCaseKeys", function() { return withCamelCaseKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withSnakeCaseKeys", function() { return withSnakeCaseKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64Encode", function() { return base64Encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64EncodeURL", function() { return base64EncodeURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractUrlParams", function() { return extractUrlParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchFetchFormat", function() { return patchFetchFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionConsume", function() { return optionConsume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Includes common utility methods and shims
 */

/**
 * Return true if all items in list are strings
 * @function Util.allString
 * @param {Array} list - an array of items
 */
var allStrings = function allStrings(list) {
  return list.length && list.every(function (value) {
    return typeof value === 'string';
  });
};
/**
* Creates a new array without the given item.
* @function Util.without
* @param {Array} array - original array
* @param {*} item - the item to exclude from the new array
* @return {Array} a new array made of the original array's items except for `item`
 */

var without = function without(array, item) {
  return array.filter(function (v) {
    return v !== item;
  });
};
/**
* Return true is value is a number or a string representation of a number.
* @function Util.isNumberLike
* @param {*} value
* @returns {boolean} true if value is a number
* @example
*    Util.isNumber(0) // true
*    Util.isNumber("1.3") // true
*    Util.isNumber("") // false
*    Util.isNumber(undefined) // false
 */

var isNumberLike = function isNumberLike(value) {
  return value != null && !isNaN(parseFloat(value));
};
/**
 * Escape all characters matching unsafe in the given string
 * @function Util.smartEscape
 * @param {string} string - source string to escape
 * @param {RegExp} unsafe - characters that must be escaped
 * @return {string} escaped string
 */

var smartEscape = function smartEscape(string) {
  var unsafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /([^a-zA-Z0-9_.\-\/:]+)/g;
  return string.replace(unsafe, function (match) {
    return match.split("").map(function (c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    }).join("");
  });
};
/**
 * Assign values from sources if they are not defined in the destination.
 * Once a value is set it does not change
 * @function Util.defaults
 * @param {Object} destination - the object to assign defaults to
 * @param {...Object} source - the source object(s) to assign defaults from
 * @return {Object} destination after it was modified
 */

var defaults = function defaults(destination) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  return sources.reduce(function (dest, source) {
    var key, value;

    for (key in source) {
      value = source[key];

      if (dest[key] === void 0) {
        dest[key] = value;
      }
    }

    return dest;
  }, destination);
};
/*********** lodash functions */

var objectProto = Object.prototype;
/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */

var objToString = objectProto.toString;
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
#isObject({});
 * // => true
 *
#isObject([1, 2, 3]);
 * // => true
 *
#isObject(1);
 * // => false
 */

var isObject = function isObject(value) {
  var type; // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.

  type = _typeof(value);
  return !!value && (type === 'object' || type === 'function');
};
var funcTag = '[object Function]';
/**
* Checks if `value` is classified as a `Function` object.
* @function Util.isFunction
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
* @example
*
* function Foo(){};
* isFunction(Foo);
* // => true
*
* isFunction(/abc/);
* // => false
 */

var isFunction = function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) === funcTag;
};
/*********** lodash functions */

/** Used to match words to create compound words. */

var reWords = function () {
  var lower, upper;
  upper = '[A-Z]';
  lower = '[a-z]+';
  return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
}();
/**
* Convert string to camelCase
* @function Util.camelCase
* @param {string} source - the string to convert
* @return {string} in camelCase format
 */

var camelCase = function camelCase(source) {
  var words = source.match(reWords);
  words = words.map(function (word) {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
  });
  words[0] = words[0].toLocaleLowerCase();
  return words.join('');
};
/**
 * Convert string to snake_case
 * @function Util.snakeCase
 * @param {string} source - the string to convert
 * @return {string} in snake_case format
 */

var snakeCase = function snakeCase(source) {
  var words = source.match(reWords);
  words = words.map(function (word) {
    return word.toLocaleLowerCase();
  });
  return words.join('_');
};
/**
 * Creates a new object from source, with the keys transformed using the converter.
 * @param {object} source
 * @param {function|null} converter
 * @returns {object}
 */

var convertKeys = function convertKeys(source, converter) {
  var result, value;
  result = {};

  for (var key in source) {
    value = source[key];

    if (converter) {
      key = converter(key);
    }

    if (!isEmpty(key)) {
      result[key] = value;
    }
  }

  return result;
};
/**
 * Create a copy of the source object with all keys in camelCase
 * @function Util.withCamelCaseKeys
 * @param {Object} value - the object to copy
 * @return {Object} a new object
 */

var withCamelCaseKeys = function withCamelCaseKeys(source) {
  return convertKeys(source, camelCase);
};
/**
 * Create a copy of the source object with all keys in snake_case
 * @function Util.withSnakeCaseKeys
 * @param {Object} value - the object to copy
 * @return {Object} a new object
 */

var withSnakeCaseKeys = function withSnakeCaseKeys(source) {
  return convertKeys(source, snakeCase);
}; // Browser
// Node.js

var base64Encode = typeof btoa !== 'undefined' && isFunction(btoa) ? btoa : typeof Buffer !== 'undefined' && isFunction(Buffer) ? function (input) {
  if (!(input instanceof Buffer)) {
    input = new Buffer.from(String(input), 'binary');
  }

  return input.toString('base64');
} : function (input) {
  throw new Error("No base64 encoding function found");
};
/**
* Returns the Base64-decoded version of url.<br>
* This method delegates to `btoa` if present. Otherwise it tries `Buffer`.
* @function Util.base64EncodeURL
* @param {string} url - the url to encode. the value is URIdecoded and then re-encoded before converting to base64 representation
* @return {string} the base64 representation of the URL
 */

var base64EncodeURL = function base64EncodeURL(url) {
  try {
    url = decodeURI(url);
  } finally {
    url = encodeURI(url);
  }

  return base64Encode(url);
};
/**
 * A list of keys used by the url() function.
 * @private
 */

var URL_KEYS = ['api_secret', 'auth_token', 'cdn_subdomain', 'cloud_name', 'cname', 'format', 'private_cdn', 'resource_type', 'secure', 'secure_cdn_subdomain', 'secure_distribution', 'shorten', 'sign_url', 'ssl_detected', 'type', 'url_suffix', 'use_root_path', 'version'];
/**
 * Create a new object with only URL parameters
 * @param {object} options The source object
 * @return {Object} An object containing only URL parameters
 */

function extractUrlParams(options) {
  return URL_KEYS.reduce(function (obj, key) {
    if (options[key] != null) {
      obj[key] = options[key];
    }

    return obj;
  }, {});
}
/**
 * Handle the format parameter for fetch urls
 * @private
 * @param options url and transformation options. This argument may be changed by the function!
 */

function patchFetchFormat(options) {
  if (options == null) {
    options = {};
  }

  if (options.type === "fetch") {
    if (options.fetch_format == null) {
      options.fetch_format = optionConsume(options, "format");
    }
  }
}
/**
 * Deletes `option_name` from `options` and return the value if present.
 * If `options` doesn't contain `option_name` the default value is returned.
 * @param {Object} options a collection
 * @param {String} option_name the name (key) of the desired value
 * @param {*} [default_value] the value to return is option_name is missing
 */

function optionConsume(options, option_name, default_value) {
  var result = options[option_name];
  delete options[option_name];

  if (result != null) {
    return result;
  } else {
    return default_value;
  }
}
/**
 * Returns true if value is empty:
 * <ul>
 *   <li>value is null or undefined</li>
 *   <li>value is an array or string of length 0</li>
 *   <li>value is an object with no keys</li>
 * </ul>
 * @function Util.isEmpty
 * @param value
 * @returns {boolean} true if value is empty
 */

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (typeof value.length == "number") {
    return value.length === 0;
  }

  if (typeof value.size == "number") {
    return value.size === 0;
  }

  if (_typeof(value) == "object") {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  return true;
}

/***/ }),

/***/ "./src/util/generateBreakpoints.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return generateBreakpoints; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Helper function. Gets or populates srcset breakpoints using provided parameters
 * Either the breakpoints or min_width, max_width, max_images must be provided.
 *
 * @module utils
 * @private
 * @param {srcset} srcset Options with either `breakpoints` or `min_width`, `max_width`, and `max_images`
 *
 * @return {number[]} Array of breakpoints
 *
 */
function generateBreakpoints(srcset) {
  var breakpoints = srcset.breakpoints || [];

  if (breakpoints.length) {
    return breakpoints;
  }

  var _map = [srcset.min_width, srcset.max_width, srcset.max_images].map(Number),
      _map2 = _slicedToArray(_map, 3),
      min_width = _map2[0],
      max_width = _map2[1],
      max_images = _map2[2];

  if ([min_width, max_width, max_images].some(isNaN)) {
    throw 'Either (min_width, max_width, max_images) ' + 'or breakpoints must be provided to the image srcset attribute';
  }

  if (min_width > max_width) {
    throw 'min_width must be less than max_width';
  }

  if (max_images <= 0) {
    throw 'max_images must be a positive integer';
  } else if (max_images === 1) {
    min_width = max_width;
  }

  var stepSize = Math.ceil((max_width - min_width) / Math.max(max_images - 1, 1));

  for (var current = min_width; current < max_width; current += stepSize) {
    breakpoints.push(current);
  }

  breakpoints.push(max_width);
  return breakpoints;
}

/***/ }),

/***/ "./src/util/lodash.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttribute", function() { return getAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttribute", function() { return setAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttribute", function() { return removeAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttributes", function() { return setAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssExpand", function() { return cssExpand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domStyle", function() { return domStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curCSS", function() { return curCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssValue", function() { return cssValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "augmentWidthOrHeight", function() { return augmentWidthOrHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidthOrHeight", function() { return getWidthOrHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "width", function() { return width; });
/* harmony import */ var lodash_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash/assign");
/* harmony import */ var lodash_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return lodash_assign__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("lodash/cloneDeep");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "cloneDeep", function() { return lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lodash/compact");
/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_compact__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "compact", function() { return lodash_compact__WEBPACK_IMPORTED_MODULE_2___default.a; });
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lodash/difference");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "difference", function() { return lodash_difference__WEBPACK_IMPORTED_MODULE_3___default.a; });
/* harmony import */ var lodash_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("lodash/functions");
/* harmony import */ var lodash_functions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_functions__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "functions", function() { return lodash_functions__WEBPACK_IMPORTED_MODULE_4___default.a; });
/* harmony import */ var lodash_identity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lodash/identity");
/* harmony import */ var lodash_identity__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_identity__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return lodash_identity__WEBPACK_IMPORTED_MODULE_5___default.a; });
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("lodash/includes");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return lodash_includes__WEBPACK_IMPORTED_MODULE_6___default.a; });
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("lodash/isArray");
/* harmony import */ var lodash_isArray__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return lodash_isArray__WEBPACK_IMPORTED_MODULE_7___default.a; });
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("lodash/isPlainObject");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_8___default.a; });
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("lodash/isString");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return lodash_isString__WEBPACK_IMPORTED_MODULE_9___default.a; });
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("lodash/merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return lodash_merge__WEBPACK_IMPORTED_MODULE_10___default.a; });
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return lodash_includes__WEBPACK_IMPORTED_MODULE_6___default.a; });
/* harmony import */ var lodash_isElement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("lodash/isElement");
/* harmony import */ var lodash_isElement__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_isElement__WEBPACK_IMPORTED_MODULE_11__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return lodash_isElement__WEBPACK_IMPORTED_MODULE_11__; });
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("lodash/isFunction");
/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__; });
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("lodash/trim");
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_trim__WEBPACK_IMPORTED_MODULE_13__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return lodash_trim__WEBPACK_IMPORTED_MODULE_13__; });
/* harmony import */ var _baseutil__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/util/baseutil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allStrings", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["allStrings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "without", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["without"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumberLike", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["isNumberLike"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "smartEscape", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["smartEscape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["defaults"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectProto", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["objectProto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objToString", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["objToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["isObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "funcTag", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["funcTag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reWords", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["reWords"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["camelCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "snakeCase", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["snakeCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertKeys", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["convertKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withCamelCaseKeys", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["withCamelCaseKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withSnakeCaseKeys", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["withSnakeCaseKeys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base64Encode", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["base64Encode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "base64EncodeURL", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["base64EncodeURL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractUrlParams", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["extractUrlParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patchFetchFormat", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["patchFetchFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optionConsume", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["optionConsume"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return _baseutil__WEBPACK_IMPORTED_MODULE_14__["isEmpty"]; });

var nodeContains;

















/*
 * Includes utility methods and lodash / jQuery shims
 */

/**
 * Get data from the DOM element.
 *
 * This method will use jQuery's `data()` method if it is available, otherwise it will get the `data-` attribute
 * @param {Element} element - the element to get the data from
 * @param {string} name - the name of the data item
 * @returns the value associated with the `name`
 * @function Util.getData
 */

var getData = function getData(element, name) {
  switch (false) {
    case !(element == null):
      return void 0;

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.getAttribute):
      return element.getAttribute("data-".concat(name));

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.getAttr):
      return element.getAttr("data-".concat(name));

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.data):
      return element.data(name);

    case !(lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(typeof jQuery !== "undefined" && jQuery.fn && jQuery.fn.data) && lodash_isElement__WEBPACK_IMPORTED_MODULE_11__(element)):
      return jQuery(element).data(name);
  }
};
/**
 * Set data in the DOM element.
 *
 * This method will use jQuery's `data()` method if it is available, otherwise it will set the `data-` attribute
 * @function Util.setData
 * @param {Element} element - the element to set the data in
 * @param {string} name - the name of the data item
 * @param {*} value - the value to be set
 *
 */

var setData = function setData(element, name, value) {
  switch (false) {
    case !(element == null):
      return void 0;

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.setAttribute):
      return element.setAttribute("data-".concat(name), value);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.setAttr):
      return element.setAttr("data-".concat(name), value);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.data):
      return element.data(name, value);

    case !(lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(typeof jQuery !== "undefined" && jQuery.fn && jQuery.fn.data) && lodash_isElement__WEBPACK_IMPORTED_MODULE_11__(element)):
      return jQuery(element).data(name, value);
  }
};
/**
 * Get attribute from the DOM element.
 *
 * @function Util.getAttribute
 * @param {Element} element - the element to set the attribute for
 * @param {string} name - the name of the attribute
 * @returns {*} the value of the attribute
 *
 */

var getAttribute = function getAttribute(element, name) {
  switch (false) {
    case !(element == null):
      return void 0;

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.getAttribute):
      return element.getAttribute(name);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.attr):
      return element.attr(name);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.getAttr):
      return element.getAttr(name);
  }
};
/**
 * Set attribute in the DOM element.
 *
 * @function Util.setAttribute
 * @param {Element} element - the element to set the attribute for
 * @param {string} name - the name of the attribute
 * @param {*} value - the value to be set
 */

var setAttribute = function setAttribute(element, name, value) {
  switch (false) {
    case !(element == null):
      return void 0;

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.setAttribute):
      return element.setAttribute(name, value);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.attr):
      return element.attr(name, value);

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.setAttr):
      return element.setAttr(name, value);
  }
};
/**
 * Remove an attribute in the DOM element.
 *
 * @function Util.removeAttribute
 * @param {Element} element - the element to set the attribute for
 * @param {string} name - the name of the attribute
 */

var removeAttribute = function removeAttribute(element, name) {
  switch (false) {
    case !(element == null):
      return void 0;

    case !lodash_isFunction__WEBPACK_IMPORTED_MODULE_12__(element.removeAttribute):
      return element.removeAttribute(name);

    default:
      return setAttribute(element, void 0);
  }
};
/**
 * Set a group of attributes to the element
 * @function Util.setAttributes
 * @param {Element} element - the element to set the attributes for
 * @param {Object} attributes - a hash of attribute names and values
 */

var setAttributes = function setAttributes(element, attributes) {
  var name, results, value;
  results = [];

  for (name in attributes) {
    value = attributes[name];

    if (value != null) {
      results.push(setAttribute(element, name, value));
    } else {
      results.push(removeAttribute(element, name));
    }
  }

  return results;
};
/**
 * Checks if element has a css class
 * @function Util.hasClass
 * @param {Element} element - the element to check
 * @param {string} name - the class name
 @returns {boolean} true if the element has the class
 */

var hasClass = function hasClass(element, name) {
  if (lodash_isElement__WEBPACK_IMPORTED_MODULE_11__(element)) {
    return element.className.match(new RegExp("\\b".concat(name, "\\b")));
  }
};
/**
 * Add class to the element
 * @function Util.addClass
 * @param {Element} element - the element
 * @param {string} name - the class name to add
 */

var addClass = function addClass(element, name) {
  if (!element.className.match(new RegExp("\\b".concat(name, "\\b")))) {
    return element.className = lodash_trim__WEBPACK_IMPORTED_MODULE_13__("".concat(element.className, " ").concat(name));
  }
}; // The following code is taken from jQuery

var getStyles = function getStyles(elem) {
  // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  if (elem.ownerDocument.defaultView.opener) {
    return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
  }

  return window.getComputedStyle(elem, null);
};
var cssExpand = ["Top", "Right", "Bottom", "Left"];

nodeContains = function nodeContains(a, b) {
  var adown, bup;
  adown = a.nodeType === 9 ? a.documentElement : a;
  bup = b && b.parentNode;
  return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
}; // Truncated version of jQuery.style(elem, name)


var domStyle = function domStyle(elem, name) {
  if (!(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style)) {
    return elem.style[name];
  }
};
var curCSS = function curCSS(elem, name, computed) {
  var maxWidth, minWidth, ret, rmargin, style, width;
  rmargin = /^margin/;
  width = void 0;
  minWidth = void 0;
  maxWidth = void 0;
  ret = void 0;
  style = elem.style;
  computed = computed || getStyles(elem);

  if (computed) {
    // Support: IE9
    // getPropertyValue is only needed for .css('filter') (#12537)
    ret = computed.getPropertyValue(name) || computed[name];
  }

  if (computed) {
    if (ret === "" && !nodeContains(elem.ownerDocument, elem)) {
      ret = domStyle(elem, name);
    } // Support: iOS < 6
    // A tribute to the "awesome hack by Dean Edwards"
    // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values


    if (rnumnonpx.test(ret) && rmargin.test(name)) {
      // Remember the original values
      width = style.width;
      minWidth = style.minWidth;
      maxWidth = style.maxWidth; // Put in the new values to get a computed value out

      style.minWidth = style.maxWidth = style.width = ret;
      ret = computed.width; // Revert the changed values

      style.width = width;
      style.minWidth = minWidth;
      style.maxWidth = maxWidth;
    }
  } // Support: IE
  // IE returns zIndex value as an integer.


  if (ret !== undefined) {
    return ret + "";
  } else {
    return ret;
  }
};
var cssValue = function cssValue(elem, name, convert, styles) {
  var val;
  val = curCSS(elem, name, styles);

  if (convert) {
    return parseFloat(val);
  } else {
    return val;
  }
};
var augmentWidthOrHeight = function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
  var i, len, side, sides, val; // If we already have the right measurement, avoid augmentation
  // Otherwise initialize for horizontal or vertical properties

  if (extra === (isBorderBox ? "border" : "content")) {
    return 0;
  } else {
    sides = name === "width" ? ["Right", "Left"] : ["Top", "Bottom"];
    val = 0;

    for (i = 0, len = sides.length; i < len; i++) {
      side = sides[i];

      if (extra === "margin") {
        // Both box models exclude margin, so add it if we want it
        val += cssValue(elem, extra + side, true, styles);
      }

      if (isBorderBox) {
        if (extra === "content") {
          // border-box includes padding, so remove it if we want content
          val -= cssValue(elem, "padding".concat(side), true, styles);
        }

        if (extra !== "margin") {
          // At this point, extra isn't border nor margin, so remove border
          val -= cssValue(elem, "border".concat(side, "Width"), true, styles);
        }
      } else {
        // At this point, extra isn't content, so add padding
        val += cssValue(elem, "padding".concat(side), true, styles);

        if (extra !== "padding") {
          // At this point, extra isn't content nor padding, so add border
          val += cssValue(elem, "border".concat(side, "Width"), true, styles);
        }
      }
    }

    return val;
  }
};
var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
var getWidthOrHeight = function getWidthOrHeight(elem, name, extra) {
  var isBorderBox, styles, val, valueIsBorderBox; // Start with offset property, which is equivalent to the border-box value

  valueIsBorderBox = true;
  val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
  styles = getStyles(elem);
  isBorderBox = cssValue(elem, "boxSizing", false, styles) === "border-box"; // Some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668

  if (val <= 0 || val == null) {
    // Fall back to computed then uncomputed css if necessary
    val = curCSS(elem, name, styles);

    if (val < 0 || val == null) {
      val = elem.style[name];
    }

    if (rnumnonpx.test(val)) {
      // Computed unit is not pixels. Stop here and return.
      return val;
    } // Check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    //    valueIsBorderBox = isBorderBox and (support.boxSizingReliable() or val is elem.style[name])


    valueIsBorderBox = isBorderBox && val === elem.style[name]; // Normalize "", auto, and prepare for extra

    val = parseFloat(val) || 0;
  } // Use the active box-sizing model to add/subtract irrelevant styles


  return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles);
};
var width = function width(element) {
  return getWidthOrHeight(element, "width", "content");
};
/**
 * @class Util
 */

/**
 * Returns true if item is a string
 * @function Util.isString
 * @param item
 * @returns {boolean} true if item is a string
 */

/**
 * Returns true if item is empty:
 * <ul>
 *   <li>item is null or undefined</li>
 *   <li>item is an array or string of length 0</li>
 *   <li>item is an object with no keys</li>
 * </ul>
 * @function Util.isEmpty
 * @param item
 * @returns {boolean} true if item is empty
 */

/**
 * Assign source properties to destination.
 * If the property is an object it is assigned as a whole, overriding the destination object.
 * @function Util.assign
 * @param {Object} destination - the object to assign to
 */

/**
 * Recursively assign source properties to destination
 * @function Util.merge
 * @param {Object} destination - the object to assign to
 * @param {...Object} [sources] The source objects.
 */

/**
 * Create a new copy of the given object, including all internal objects.
 * @function Util.cloneDeep
 * @param {Object} value - the object to clone
 * @return {Object} a new deep copy of the object
 */

/**
 * Creates a new array from the parameter with "falsey" values removed
 * @function Util.compact
 * @param {Array} array - the array to remove values from
 * @return {Array} a new array without falsey values
 */

/**
 * Check if a given item is included in the given array
 * @function Util.contains
 * @param {Array} array - the array to search in
 * @param {*} item - the item to search for
 * @return {boolean} true if the item is included in the array
 */

/**
 * Returns values in the given array that are not included in the other array
 * @function Util.difference
 * @param {Array} arr - the array to select from
 * @param {Array} values - values to filter from arr
 * @return {Array} the filtered values
 */

/**
 * Returns a list of all the function names in obj
 * @function Util.functions
 * @param {Object} object - the object to inspect
 * @return {Array} a list of functions of object
 */

/**
 * Returns the provided value. This functions is used as a default predicate function.
 * @function Util.identity
 * @param {*} value
 * @return {*} the provided value
 */

/**
 * Remove leading or trailing spaces from text
 * @function Util.trim
 * @param {string} text
 * @return {string} the `text` without leading or trailing spaces
 */

/***/ }),

/***/ "./src/util/srcsetUtils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaledUrl", function() { return scaledUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrGenerateBreakpoints", function() { return getOrGenerateBreakpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSrcsetAttribute", function() { return generateSrcsetAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSizesAttribute", function() { return generateSizesAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateImageResponsiveAttributes", function() { return generateImageResponsiveAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMediaAttr", function() { return generateMediaAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srcsetUrl", function() { return srcsetUrl; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/util/lodash.js");
/* harmony import */ var _generateBreakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/util/generateBreakpoints.js");
/* harmony import */ var _transformation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/transformation.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/url.js");

var isEmpty = _util__WEBPACK_IMPORTED_MODULE_0__["isEmpty"];



/**
 * Options used to generate the srcset attribute.
 * @typedef {object} srcset
 * @property {(number[]|string[])}   [breakpoints] An array of breakpoints.
 * @property {number}                [min_width]   Minimal width of the srcset images.
 * @property {number}                [max_width]   Maximal width of the srcset images.
 * @property {number}                [max_images]  Number of srcset images to generate.
 * @property {object|string}         [transformation] The transformation to use in the srcset urls.
 * @property {boolean}               [sizes] Whether to calculate and add the sizes attribute.
 */

/**
 * Options used to generate the srcset attribute.
 * @typedef {object} srcset
 * @property {(number[]|string[])}   [breakpoints] An array of breakpoints.
 * @property {number}                [min_width]   Minimal width of the srcset images.
 * @property {number}                [max_width]   Maximal width of the srcset images.
 * @property {number}                [max_images]  Number of srcset images to generate.
 * @property {object|string}         [transformation] The transformation to use in the srcset urls.
 * @property {boolean}               [sizes] Whether to calculate and add the sizes attribute.
 */

/**
 * Helper function. Generates a single srcset item url
 *
 * @private
 * @param {string} public_id  Public ID of the resource.
 * @param {number} width      Width in pixels of the srcset item.
 * @param {object|string} transformation
 * @param {object} options    Additional options.
 *
 * @return {string} Resulting URL of the item
 */

function scaledUrl(public_id, width, transformation) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var configParams = _util__WEBPACK_IMPORTED_MODULE_0__["extractUrlParams"](options);
  transformation = transformation || options;
  configParams.raw_transformation = new _transformation__WEBPACK_IMPORTED_MODULE_2__["default"]([_util__WEBPACK_IMPORTED_MODULE_0__["merge"]({}, transformation), {
    crop: 'scale',
    width: width
  }]).toString();
  return Object(_url__WEBPACK_IMPORTED_MODULE_3__["default"])(public_id, configParams);
}
/**
 * If cache is enabled, get the breakpoints from the cache. If the values were not found in the cache,
 * or cache is not enabled, generate the values.
 * @param {srcset} srcset The srcset configuration parameters
 * @param {string} public_id
 * @param {object} options
 * @return {*|Array}
 */

function getOrGenerateBreakpoints(public_id) {
  var srcset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Object(_generateBreakpoints__WEBPACK_IMPORTED_MODULE_1__["default"])(srcset);
}
/**
 * Helper function. Generates srcset attribute value of the HTML img tag
 * @private
 *
 * @param {string} public_id  Public ID of the resource
 * @param {number[]} breakpoints An array of breakpoints (in pixels)
 * @param {object} transformation The transformation
 * @param {object} options Includes html tag options, transformation options
 * @return {string} Resulting srcset attribute value
 */

function generateSrcsetAttribute(public_id, breakpoints, transformation, options) {
  options = _util__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"](options);
  _util__WEBPACK_IMPORTED_MODULE_0__["patchFetchFormat"](options);
  return breakpoints.map(function (width) {
    return "".concat(scaledUrl(public_id, width, transformation, options), " ").concat(width, "w");
  }).join(', ');
}
/**
 * Helper function. Generates sizes attribute value of the HTML img tag
 * @private
 * @param {number[]} breakpoints An array of breakpoints.
 * @return {string} Resulting sizes attribute value
 */

function generateSizesAttribute(breakpoints) {
  if (breakpoints == null) {
    return '';
  }

  return breakpoints.map(function (width) {
    return "(max-width: ".concat(width, "px) ").concat(width, "px");
  }).join(', ');
}
/**
 * Helper function. Generates srcset and sizes attributes of the image tag
 *
 * Generated attributes are added to attributes argument
 *
 * @private
 * @param {string}    publicId  The public ID of the resource
 * @param {object}    attributes Existing HTML attributes.
 * @param {srcset}    srcsetData
 * @param {object}    options    Additional options.
 *
 * @return array The responsive attributes
 */

function generateImageResponsiveAttributes(publicId) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var srcsetData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Create both srcset and sizes here to avoid fetching breakpoints twice
  var responsiveAttributes = {};

  if (isEmpty(srcsetData)) {
    return responsiveAttributes;
  }

  var generateSizes = !attributes.sizes && srcsetData.sizes === true;
  var generateSrcset = !attributes.srcset;

  if (generateSrcset || generateSizes) {
    var breakpoints = getOrGenerateBreakpoints(publicId, srcsetData, options);

    if (generateSrcset) {
      var transformation = srcsetData.transformation;
      var srcsetAttr = generateSrcsetAttribute(publicId, breakpoints, transformation, options);

      if (!isEmpty(srcsetAttr)) {
        responsiveAttributes.srcset = srcsetAttr;
      }
    }

    if (generateSizes) {
      var sizesAttr = generateSizesAttribute(breakpoints);

      if (!isEmpty(sizesAttr)) {
        responsiveAttributes.sizes = sizesAttr;
      }
    }
  }

  return responsiveAttributes;
}
/**
 * Generate a media query
 *
 * @private
 * @param {object} options configuration options
 * @param {number|string} options.min_width
 * @param {number|string} options.max_width
 * @return {string} a media query string
 */

function generateMediaAttr(options) {
  var mediaQuery = [];

  if (options != null) {
    if (options.min_width != null) {
      mediaQuery.push("(min-width: ".concat(options.min_width, "px)"));
    }

    if (options.max_width != null) {
      mediaQuery.push("(max-width: ".concat(options.max_width, "px)"));
    }
  }

  return mediaQuery.join(' and ');
}
var srcsetUrl = scaledUrl;

/***/ }),

/***/ "lodash/assign":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_assign__;

/***/ }),

/***/ "lodash/cloneDeep":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_cloneDeep__;

/***/ }),

/***/ "lodash/compact":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_compact__;

/***/ }),

/***/ "lodash/difference":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_difference__;

/***/ }),

/***/ "lodash/functions":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_functions__;

/***/ }),

/***/ "lodash/identity":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_identity__;

/***/ }),

/***/ "lodash/includes":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_includes__;

/***/ }),

/***/ "lodash/isArray":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isArray__;

/***/ }),

/***/ "lodash/isElement":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isElement__;

/***/ }),

/***/ "lodash/isFunction":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isFunction__;

/***/ }),

/***/ "lodash/isPlainObject":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isPlainObject__;

/***/ }),

/***/ "lodash/isString":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_isString__;

/***/ }),

/***/ "lodash/merge":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_merge__;

/***/ }),

/***/ "lodash/trim":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_trim__;

/***/ })

/******/ });
});
//# sourceMappingURL=cloudinary-core.js.map