/*! cropit - v0.5.1 <https://github.com/scottcheng/cropit> */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["cropit"] = factory(require("jquery"));
	else
		root["cropit"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var _slice = Array.prototype.slice;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _cropit = __webpack_require__(2);

	var _cropit2 = _interopRequireDefault(_cropit);

	var _constants = __webpack_require__(4);

	var _utils = __webpack_require__(6);

	var applyOnEach = function applyOnEach($el, callback) {
	  return $el.each(function () {
	    var cropit = _jquery2['default'].data(this, _constants.PLUGIN_KEY);

	    if (!cropit) {
	      return;
	    }
	    callback(cropit);
	  });
	};

	var callOnFirst = function callOnFirst($el, method, options) {
	  var cropit = $el.first().data(_constants.PLUGIN_KEY);

	  if (!cropit || !_jquery2['default'].isFunction(cropit[method])) {
	    return null;
	  }
	  return cropit[method](options);
	};

	var methods = {
	  init: function init(options) {
	    return this.each(function () {
	      // Only instantiate once per element
	      if (_jquery2['default'].data(this, _constants.PLUGIN_KEY)) {
	        return;
	      }

	      var cropit = new _cropit2['default'](_jquery2['default'], this, options);
	      _jquery2['default'].data(this, _constants.PLUGIN_KEY, cropit);
	    });
	  },

	  destroy: function destroy() {
	    return this.each(function () {
	      _jquery2['default'].removeData(this, _constants.PLUGIN_KEY);
	    });
	  },

	  isZoomable: function isZoomable() {
	    return callOnFirst(this, 'isZoomable');
	  },

	  'export': function _export(options) {
	    return callOnFirst(this, 'getCroppedImageData', options);
	  }
	};

	var delegate = function delegate($el, fnName) {
	  return applyOnEach($el, function (cropit) {
	    cropit[fnName]();
	  });
	};

	var prop = function prop($el, name, value) {
	  if ((0, _utils.exists)(value)) {
	    return applyOnEach($el, function (cropit) {
	      cropit[name] = value;
	    });
	  } else {
	    var cropit = $el.first().data(_constants.PLUGIN_KEY);
	    return cropit[name];
	  }
	};

	_jquery2['default'].fn.cropit = function (method) {
	  if (methods[method]) {
	    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	  } else if (['imageState', 'imageSrc', 'offset', 'previewSize', 'imageSize', 'zoom', 'initialZoom', 'exportZoom', 'minZoom', 'maxZoom'].indexOf(method) >= 0) {
	    return prop.apply(undefined, [this].concat(_slice.call(arguments)));
	  } else if (['rotateCW', 'rotateCCW', 'disable', 'reenable'].indexOf(method) >= 0) {
	    return delegate.apply(undefined, [this].concat(_slice.call(arguments)));
	  } else {
	    return methods.init.apply(this, arguments);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _Zoomer = __webpack_require__(3);

	var _Zoomer2 = _interopRequireDefault(_Zoomer);

	var _constants = __webpack_require__(4);

	var _options = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var Cropit = (function () {
	  function Cropit(jQuery, element, options) {
	    _classCallCheck(this, Cropit);

	    this.$el = (0, _jquery2['default'])(element);

	    var defaults = (0, _options.loadDefaults)(this.$el);
	    this.options = _jquery2['default'].extend({}, defaults, options);

	    this.init();
	  }

	  _createClass(Cropit, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.image = new Image();
	      this.preImage = new Image();
	      this.image.onload = this.onImageLoaded.bind(this);
	      this.preImage.onload = this.onPreImageLoaded.bind(this);
	      this.image.onerror = this.preImage.onerror = function () {
	        _this.onImageError.call(_this, _constants.ERRORS.IMAGE_FAILED_TO_LOAD);
	      };

	      this.$preview = this.options.$preview.css('position', 'relative');
	      this.$fileInput = this.options.$fileInput.attr({ accept: 'image/*' });
	      this.$zoomSlider = this.options.$zoomSlider.attr({ min: 0, max: 1, step: 0.01 });

	      this.previewSize = {
	        width: this.options.width || this.$preview.width(),
	        height: this.options.height || this.$preview.height()
	      };

	      this.$image = (0, _jquery2['default'])('<img />').addClass(_constants.CLASS_NAMES.PREVIEW_IMAGE).attr('alt', '').css({
	        transformOrigin: 'top left',
	        webkitTransformOrigin: 'top left',
	        willChange: 'transform'
	      });
	      this.$imageContainer = (0, _jquery2['default'])('<div />').addClass(_constants.CLASS_NAMES.PREVIEW_IMAGE_CONTAINER).css({
	        position: 'absolute',
	        overflow: 'hidden',
	        left: 0,
	        top: 0,
	        width: '100%',
	        height: '100%'
	      }).append(this.$image);
	      this.$preview.append(this.$imageContainer);

	      if (this.options.imageBackground) {
	        if (_jquery2['default'].isArray(this.options.imageBackgroundBorderWidth)) {
	          this.bgBorderWidthArray = this.options.imageBackgroundBorderWidth;
	        } else {
	          this.bgBorderWidthArray = [0, 1, 2, 3].map(function () {
	            return _this.options.imageBackgroundBorderWidth;
	          });
	        }

	        this.$bg = (0, _jquery2['default'])('<img />').addClass(_constants.CLASS_NAMES.PREVIEW_BACKGROUND).attr('alt', '').css({
	          position: 'relative',
	          left: this.bgBorderWidthArray[3],
	          top: this.bgBorderWidthArray[0],
	          transformOrigin: 'top left',
	          webkitTransformOrigin: 'top left',
	          willChange: 'transform'
	        });
	        this.$bgContainer = (0, _jquery2['default'])('<div />').addClass(_constants.CLASS_NAMES.PREVIEW_BACKGROUND_CONTAINER).css({
	          position: 'absolute',
	          zIndex: 0,
	          top: -this.bgBorderWidthArray[0],
	          right: -this.bgBorderWidthArray[1],
	          bottom: -this.bgBorderWidthArray[2],
	          left: -this.bgBorderWidthArray[3]
	        }).append(this.$bg);
	        if (this.bgBorderWidthArray[0] > 0) {
	          this.$bgContainer.css('overflow', 'hidden');
	        }
	        this.$preview.prepend(this.$bgContainer);
	      }

	      this.initialZoom = this.options.initialZoom;

	      this.imageLoaded = false;

	      this.moveContinue = false;

	      this.zoomer = new _Zoomer2['default']();

	      if (this.options.allowDragNDrop) {
	        _jquery2['default'].event.props.push('dataTransfer');
	      }

	      this.bindListeners();

	      if (this.options.imageState && this.options.imageState.src) {
	        this.loadImage(this.options.imageState.src);
	      }
	    }
	  }, {
	    key: 'bindListeners',
	    value: function bindListeners() {
	      this.$fileInput.on('change.cropit', this.onFileChange.bind(this));
	      this.$imageContainer.on(_constants.EVENTS.PREVIEW, this.onPreviewEvent.bind(this));
	      this.$zoomSlider.on(_constants.EVENTS.ZOOM_INPUT, this.onZoomSliderChange.bind(this));

	      if (this.options.allowDragNDrop) {
	        this.$imageContainer.on('dragover.cropit dragleave.cropit', this.onDragOver.bind(this));
	        this.$imageContainer.on('drop.cropit', this.onDrop.bind(this));
	      }
	    }
	  }, {
	    key: 'unbindListeners',
	    value: function unbindListeners() {
	      this.$fileInput.off('change.cropit');
	      this.$imageContainer.off(_constants.EVENTS.PREVIEW);
	      this.$imageContainer.off('dragover.cropit dragleave.cropit drop.cropit');
	      this.$zoomSlider.off(_constants.EVENTS.ZOOM_INPUT);
	    }
	  }, {
	    key: 'onFileChange',
	    value: function onFileChange(e) {
	      this.options.onFileChange(e);

	      if (this.$fileInput.get(0).files) {
	        this.loadFile(this.$fileInput.get(0).files[0]);
	      }
	    }
	  }, {
	    key: 'loadFile',
	    value: function loadFile(file) {
	      var fileReader = new FileReader();
	      if (file && file.type.match('image')) {
	        fileReader.readAsDataURL(file);
	        fileReader.onload = this.onFileReaderLoaded.bind(this);
	        fileReader.onerror = this.onFileReaderError.bind(this);
	      } else if (file) {
	        this.onFileReaderError();
	      }
	    }
	  }, {
	    key: 'onFileReaderLoaded',
	    value: function onFileReaderLoaded(e) {
	      this.loadImage(e.target.result);
	    }
	  }, {
	    key: 'onFileReaderError',
	    value: function onFileReaderError() {
	      this.options.onFileReaderError();
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(e) {
	      e.preventDefault();
	      e.dataTransfer.dropEffect = 'copy';
	      this.$preview.toggleClass(_constants.CLASS_NAMES.DRAG_HOVERED, e.type === 'dragover');
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(e) {
	      var _this2 = this;

	      e.preventDefault();
	      e.stopPropagation();

	      var files = Array.prototype.slice.call(e.dataTransfer.files, 0);
	      files.some(function (file) {
	        if (!file.type.match('image')) {
	          return false;
	        }

	        _this2.loadFile(file);
	        return true;
	      });

	      this.$preview.removeClass(_constants.CLASS_NAMES.DRAG_HOVERED);
	    }
	  }, {
	    key: 'loadImage',
	    value: function loadImage(imageSrc) {
	      var _this3 = this;

	      if (!imageSrc) {
	        return;
	      }

	      this.options.onImageLoading();
	      this.setImageLoadingClass();

	      if (imageSrc.indexOf('data') === 0) {
	        this.preImage.src = imageSrc;
	      } else {
	        var xhr = new XMLHttpRequest();
	        xhr.onload = function (e) {
	          if (e.target.status >= 300) {
	            _this3.onImageError.call(_this3, _constants.ERRORS.IMAGE_FAILED_TO_LOAD);
	            return;
	          }

	          _this3.loadFile(e.target.response);
	        };
	        xhr.open('GET', imageSrc);
	        xhr.responseType = 'blob';
	        xhr.send();
	      }
	    }
	  }, {
	    key: 'onPreImageLoaded',
	    value: function onPreImageLoaded() {
	      if (this.shouldRejectImage({
	        imageWidth: this.preImage.width,
	        imageHeight: this.preImage.height,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.onImageError(_constants.ERRORS.SMALL_IMAGE);
	        if (this.image.src) {
	          this.setImageLoadedClass();
	        }
	        return;
	      }

	      this.image.src = this.preImage.src;
	    }
	  }, {
	    key: 'onImageLoaded',
	    value: function onImageLoaded() {
	      this.rotation = 0;
	      this.setupZoomer(this.options.imageState && this.options.imageState.zoom || this._initialZoom);
	      if (this.options.imageState && this.options.imageState.offset) {
	        this.offset = this.options.imageState.offset;
	      } else {
	        this.centerImage();
	      }

	      this.options.imageState = {};

	      this.$image.attr('src', this.image.src);
	      if (this.options.imageBackground) {
	        this.$bg.attr('src', this.image.src);
	      }

	      this.setImageLoadedClass();

	      this.imageLoaded = true;

	      this.options.onImageLoaded();
	    }
	  }, {
	    key: 'onImageError',
	    value: function onImageError() {
	      this.options.onImageError.apply(this, arguments);
	      this.removeImageLoadingClass();
	    }
	  }, {
	    key: 'setImageLoadingClass',
	    value: function setImageLoadingClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADED).addClass(_constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'setImageLoadedClass',
	    value: function setImageLoadedClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING).addClass(_constants.CLASS_NAMES.IMAGE_LOADED);
	    }
	  }, {
	    key: 'removeImageLoadingClass',
	    value: function removeImageLoadingClass() {
	      this.$preview.removeClass(_constants.CLASS_NAMES.IMAGE_LOADING);
	    }
	  }, {
	    key: 'getEventPosition',
	    value: function getEventPosition(e) {
	      if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]) {
	        e = e.originalEvent.touches[0];
	      }
	      if (e.clientX && e.clientY) {
	        return { x: e.clientX, y: e.clientY };
	      }
	    }
	  }, {
	    key: 'onPreviewEvent',
	    value: function onPreviewEvent(e) {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.moveContinue = false;
	      this.$imageContainer.off(_constants.EVENTS.PREVIEW_MOVE);

	      if (e.type === 'mousedown' || e.type === 'touchstart') {
	        this.origin = this.getEventPosition(e);
	        this.moveContinue = true;
	        this.$imageContainer.on(_constants.EVENTS.PREVIEW_MOVE, this.onMove.bind(this));
	      } else {
	        (0, _jquery2['default'])(document.body).focus();
	      }

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'onMove',
	    value: function onMove(e) {
	      var eventPosition = this.getEventPosition(e);

	      if (this.moveContinue && eventPosition) {
	        this.offset = {
	          x: this.offset.x + eventPosition.x - this.origin.x,
	          y: this.offset.y + eventPosition.y - this.origin.y
	        };
	      }

	      this.origin = eventPosition;

	      e.stopPropagation();
	      return false;
	    }
	  }, {
	    key: 'fixOffset',
	    value: function fixOffset(offset) {
	      if (!this.imageLoaded) {
	        return offset;
	      }

	      var ret = { x: offset.x, y: offset.y };

	      if (!this.options.freeMove) {
	        if (this.imageWidth * this.zoom >= this.previewSize.width) {
	          ret.x = Math.min(0, Math.max(ret.x, this.previewSize.width - this.imageWidth * this.zoom));
	        } else {
	          ret.x = Math.max(0, Math.min(ret.x, this.previewSize.width - this.imageWidth * this.zoom));
	        }

	        if (this.imageHeight * this.zoom >= this.previewSize.height) {
	          ret.y = Math.min(0, Math.max(ret.y, this.previewSize.height - this.imageHeight * this.zoom));
	        } else {
	          ret.y = Math.max(0, Math.min(ret.y, this.previewSize.height - this.imageHeight * this.zoom));
	        }
	      }

	      ret.x = (0, _utils.round)(ret.x);
	      ret.y = (0, _utils.round)(ret.y);

	      return ret;
	    }
	  }, {
	    key: 'centerImage',
	    value: function centerImage() {
	      if (!this.image.width || !this.image.height || !this.zoom) {
	        return;
	      }

	      this.offset = {
	        x: (this.previewSize.width - this.imageWidth * this.zoom) / 2,
	        y: (this.previewSize.height - this.imageHeight * this.zoom) / 2
	      };
	    }
	  }, {
	    key: 'onZoomSliderChange',
	    value: function onZoomSliderChange() {
	      if (!this.imageLoaded) {
	        return;
	      }

	      this.zoomSliderPos = Number(this.$zoomSlider.val());
	      var newZoom = this.zoomer.getZoom(this.zoomSliderPos);
	      if (newZoom === this.zoom) {
	        return;
	      }
	      this.zoom = newZoom;
	    }
	  }, {
	    key: 'enableZoomSlider',
	    value: function enableZoomSlider() {
	      this.$zoomSlider.removeAttr('disabled');
	      this.options.onZoomEnabled();
	    }
	  }, {
	    key: 'disableZoomSlider',
	    value: function disableZoomSlider() {
	      this.$zoomSlider.attr('disabled', true);
	      this.options.onZoomDisabled();
	    }
	  }, {
	    key: 'setupZoomer',
	    value: function setupZoomer(zoom) {
	      this.zoomer.setup({
	        imageSize: this.imageSize,
	        previewSize: this.previewSize,
	        exportZoom: this.options.exportZoom,
	        maxZoom: this.options.maxZoom,
	        minZoom: this.options.minZoom,
	        smallImage: this.options.smallImage
	      });
	      this.zoom = (0, _utils.exists)(zoom) ? zoom : this._zoom;

	      if (this.isZoomable()) {
	        this.enableZoomSlider();
	      } else {
	        this.disableZoomSlider();
	      }
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return this.zoomer.fixZoom(zoom);
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      return this.zoomer.isZoomable();
	    }
	  }, {
	    key: 'renderImage',
	    value: function renderImage() {
	      var transformation = '\n      translate(' + this.rotatedOffset.x + 'px, ' + this.rotatedOffset.y + 'px)\n      scale(' + this.zoom + ')\n      rotate(' + this.rotation + 'deg)';

	      this.$image.css({
	        transform: transformation,
	        webkitTransform: transformation
	      });
	      if (this.options.imageBackground) {
	        this.$bg.css({
	          transform: transformation,
	          webkitTransform: transformation
	        });
	      }
	    }
	  }, {
	    key: 'rotateCW',
	    value: function rotateCW() {
	      if (this.shouldRejectImage({
	        imageWidth: this.image.height,
	        imageHeight: this.image.width,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.rotation = (this.rotation + 180) % 360;
	      } else {
	        this.rotation = (this.rotation + 90) % 360;
	      }
	    }
	  }, {
	    key: 'rotateCCW',
	    value: function rotateCCW() {
	      if (this.shouldRejectImage({
	        imageWidth: this.image.height,
	        imageHeight: this.image.width,
	        previewSize: this.previewSize,
	        maxZoom: this.options.maxZoom,
	        exportZoom: this.options.exportZoom,
	        smallImage: this.options.smallImage
	      })) {
	        this.rotation = (this.rotation + 180) % 360;
	      } else {
	        this.rotation = (this.rotation + 270) % 360;
	      }
	    }
	  }, {
	    key: 'shouldRejectImage',
	    value: function shouldRejectImage(_ref) {
	      var imageWidth = _ref.imageWidth;
	      var imageHeight = _ref.imageHeight;
	      var previewSize = _ref.previewSize;
	      var maxZoom = _ref.maxZoom;
	      var exportZoom = _ref.exportZoom;
	      var smallImage = _ref.smallImage;

	      if (smallImage !== 'reject') {
	        return false;
	      }

	      return imageWidth * maxZoom < previewSize.width * exportZoom || imageHeight * maxZoom < previewSize.height * exportZoom;
	    }
	  }, {
	    key: 'getCroppedImageData',
	    value: function getCroppedImageData(exportOptions) {
	      if (!this.image.src) {
	        return;
	      }

	      var exportDefaults = {
	        type: 'image/png',
	        quality: 0.75,
	        originalSize: false,
	        fillBg: '#fff'
	      };
	      exportOptions = _jquery2['default'].extend({}, exportDefaults, exportOptions);

	      var exportZoom = exportOptions.originalSize ? 1 / this.zoom : this.options.exportZoom;

	      var zoomedSize = {
	        width: this.zoom * exportZoom * this.image.width,
	        height: this.zoom * exportZoom * this.image.height
	      };

	      var canvas = (0, _jquery2['default'])('<canvas />').attr({
	        width: this.previewSize.width * exportZoom,
	        height: this.previewSize.height * exportZoom
	      }).get(0);
	      var canvasContext = canvas.getContext('2d');

	      if (exportOptions.type === 'image/jpeg') {
	        canvasContext.fillStyle = exportOptions.fillBg;
	        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	      }

	      canvasContext.translate(this.rotatedOffset.x * exportZoom, this.rotatedOffset.y * exportZoom);
	      canvasContext.rotate(this.rotation * Math.PI / 180);
	      canvasContext.drawImage(this.image, 0, 0, zoomedSize.width, zoomedSize.height);

	      return canvas.toDataURL(exportOptions.type, exportOptions.quality);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.unbindListeners();
	      this.disableZoomSlider();
	      this.$el.addClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: 'reenable',
	    value: function reenable() {
	      this.bindListeners();
	      this.enableZoomSlider();
	      this.$el.removeClass(_constants.CLASS_NAMES.DISABLED);
	    }
	  }, {
	    key: '$',
	    value: function $(selector) {
	      if (!this.$el) {
	        return null;
	      }
	      return this.$el.find(selector);
	    }
	  }, {
	    key: 'offset',
	    set: function (position) {
	      if (!position || !(0, _utils.exists)(position.x) || !(0, _utils.exists)(position.y)) {
	        return;
	      }

	      this._offset = this.fixOffset(position);
	      this.renderImage();

	      this.options.onOffsetChange(position);
	    },
	    get: function () {
	      return this._offset;
	    }
	  }, {
	    key: 'zoom',
	    set: function (newZoom) {
	      newZoom = this.fixZoom(newZoom);

	      if (this.imageLoaded) {
	        var oldZoom = this.zoom;

	        var newX = this.previewSize.width / 2 - (this.previewSize.width / 2 - this.offset.x) * newZoom / oldZoom;
	        var newY = this.previewSize.height / 2 - (this.previewSize.height / 2 - this.offset.y) * newZoom / oldZoom;

	        this._zoom = newZoom;
	        this.offset = { x: newX, y: newY }; // Triggers renderImage()
	      } else {
	        this._zoom = newZoom;
	      }

	      this.zoomSliderPos = this.zoomer.getSliderPos(this.zoom);
	      this.$zoomSlider.val(this.zoomSliderPos);

	      this.options.onZoomChange(newZoom);
	    },
	    get: function () {
	      return this._zoom;
	    }
	  }, {
	    key: 'rotatedOffset',
	    get: function () {
	      return {
	        x: this.offset.x + (this.rotation === 90 ? this.image.height * this.zoom : 0) + (this.rotation === 180 ? this.image.width * this.zoom : 0),
	        y: this.offset.y + (this.rotation === 180 ? this.image.height * this.zoom : 0) + (this.rotation === 270 ? this.image.width * this.zoom : 0)
	      };
	    }
	  }, {
	    key: 'rotation',
	    set: function (newRotation) {
	      this._rotation = newRotation;

	      if (this.imageLoaded) {
	        // Change in image size may lead to change in zoom range
	        this.setupZoomer();
	      }
	    },
	    get: function () {
	      return this._rotation;
	    }
	  }, {
	    key: 'imageState',
	    get: function () {
	      return {
	        src: this.image.src,
	        offset: this.offset,
	        zoom: this.zoom
	      };
	    }
	  }, {
	    key: 'imageSrc',
	    get: function () {
	      return this.image.src;
	    },
	    set: function (imageSrc) {
	      this.loadImage(imageSrc);
	    }
	  }, {
	    key: 'imageWidth',
	    get: function () {
	      return this.rotation % 180 === 0 ? this.image.width : this.image.height;
	    }
	  }, {
	    key: 'imageHeight',
	    get: function () {
	      return this.rotation % 180 === 0 ? this.image.height : this.image.width;
	    }
	  }, {
	    key: 'imageSize',
	    get: function () {
	      return {
	        width: this.imageWidth,
	        height: this.imageHeight
	      };
	    }
	  }, {
	    key: 'initialZoom',
	    get: function () {
	      return this.options.initialZoom;
	    },
	    set: function (initialZoomOption) {
	      this.options.initialZoom = initialZoomOption;
	      if (initialZoomOption === 'min') {
	        this._initialZoom = 0; // Will be fixed when image loads
	      } else if (initialZoomOption === 'image') {
	        this._initialZoom = 1;
	      } else {
	        this._initialZoom = 0;
	      }
	    }
	  }, {
	    key: 'exportZoom',
	    get: function () {
	      return this.options.exportZoom;
	    },
	    set: function (exportZoom) {
	      this.options.exportZoom = exportZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'minZoom',
	    get: function () {
	      return this.options.minZoom;
	    },
	    set: function (minZoom) {
	      this.options.minZoom = minZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'maxZoom',
	    get: function () {
	      return this.options.maxZoom;
	    },
	    set: function (maxZoom) {
	      this.options.maxZoom = maxZoom;
	      this.setupZoomer();
	    }
	  }, {
	    key: 'previewSize',
	    get: function () {
	      return this._previewSize;
	    },
	    set: function (size) {
	      if (!size || size.width <= 0 || size.height <= 0) {
	        return;
	      }

	      this._previewSize = {
	        width: size.width,
	        height: size.height
	      };
	      this.$preview.css({
	        width: this.previewSize.width,
	        height: this.previewSize.height
	      });

	      if (this.imageLoaded) {
	        this.setupZoomer();
	      }
	    }
	  }]);

	  return Cropit;
	})();

	exports['default'] = Cropit;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Zoomer = (function () {
	  function Zoomer() {
	    _classCallCheck(this, Zoomer);

	    this.minZoom = this.maxZoom = 1;
	  }

	  _createClass(Zoomer, [{
	    key: 'setup',
	    value: function setup(_ref) {
	      var imageSize = _ref.imageSize;
	      var previewSize = _ref.previewSize;
	      var exportZoom = _ref.exportZoom;
	      var maxZoom = _ref.maxZoom;
	      var minZoom = _ref.minZoom;
	      var smallImage = _ref.smallImage;

	      var widthRatio = previewSize.width / imageSize.width;
	      var heightRatio = previewSize.height / imageSize.height;

	      if (minZoom === 'fit') {
	        this.minZoom = Math.min(widthRatio, heightRatio);
	      } else {
	        this.minZoom = Math.max(widthRatio, heightRatio);
	      }

	      if (smallImage === 'allow') {
	        this.minZoom = Math.min(this.minZoom, 1);
	      }

	      this.maxZoom = Math.max(this.minZoom, maxZoom / exportZoom);
	    }
	  }, {
	    key: 'getZoom',
	    value: function getZoom(sliderPos) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return sliderPos * (this.maxZoom - this.minZoom) + this.minZoom;
	    }
	  }, {
	    key: 'getSliderPos',
	    value: function getSliderPos(zoom) {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      if (this.minZoom === this.maxZoom) {
	        return 0;
	      } else {
	        return (zoom - this.minZoom) / (this.maxZoom - this.minZoom);
	      }
	    }
	  }, {
	    key: 'isZoomable',
	    value: function isZoomable() {
	      if (!this.minZoom || !this.maxZoom) {
	        return null;
	      }

	      return this.minZoom !== this.maxZoom;
	    }
	  }, {
	    key: 'fixZoom',
	    value: function fixZoom(zoom) {
	      return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
	    }
	  }]);

	  return Zoomer;
	})();

	exports['default'] = Zoomer;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var PLUGIN_KEY = 'cropit';

	exports.PLUGIN_KEY = PLUGIN_KEY;
	var CLASS_NAMES = {
	  PREVIEW: 'cropit-preview',
	  PREVIEW_IMAGE_CONTAINER: 'cropit-preview-image-container',
	  PREVIEW_IMAGE: 'cropit-preview-image',
	  PREVIEW_BACKGROUND_CONTAINER: 'cropit-preview-background-container',
	  PREVIEW_BACKGROUND: 'cropit-preview-background',
	  FILE_INPUT: 'cropit-image-input',
	  ZOOM_SLIDER: 'cropit-image-zoom-input',

	  DRAG_HOVERED: 'cropit-drag-hovered',
	  IMAGE_LOADING: 'cropit-image-loading',
	  IMAGE_LOADED: 'cropit-image-loaded',
	  DISABLED: 'cropit-disabled'
	};

	exports.CLASS_NAMES = CLASS_NAMES;
	var ERRORS = {
	  IMAGE_FAILED_TO_LOAD: { code: 0, message: 'Image failed to load.' },
	  SMALL_IMAGE: { code: 1, message: 'Image is too small.' }
	};

	exports.ERRORS = ERRORS;
	var eventName = function eventName(events) {
	  return events.map(function (e) {
	    return '' + e + '.cropit';
	  }).join(' ');
	};
	var EVENTS = {
	  PREVIEW: eventName(['mousedown', 'mouseup', 'mouseleave', 'touchstart', 'touchend', 'touchcancel', 'touchleave']),
	  PREVIEW_MOVE: eventName(['mousemove', 'touchmove']),
	  ZOOM_INPUT: eventName(['mousemove', 'touchmove', 'change'])
	};
	exports.EVENTS = EVENTS;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _constants = __webpack_require__(4);

	var options = {
	  elements: [{
	    name: '$preview',
	    description: 'The HTML element that displays image preview.',
	    defaultSelector: '.' + _constants.CLASS_NAMES.PREVIEW
	  }, {
	    name: '$fileInput',
	    description: 'File input element.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.FILE_INPUT
	  }, {
	    name: '$zoomSlider',
	    description: 'Range input element that controls image zoom.',
	    defaultSelector: 'input.' + _constants.CLASS_NAMES.ZOOM_SLIDER
	  }].map(function (o) {
	    o.type = 'jQuery element';
	    o['default'] = '$imageCropper.find(\'' + o.defaultSelector + '\')';
	    return o;
	  }),

	  values: [{
	    name: 'width',
	    type: 'number',
	    description: 'Width of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'height',
	    type: 'number',
	    description: 'Height of image preview in pixels. If set, it will override the CSS property.',
	    'default': null
	  }, {
	    name: 'imageBackground',
	    type: 'boolean',
	    description: 'Whether or not to display the background image beyond the preview area.',
	    'default': false
	  }, {
	    name: 'imageBackgroundBorderWidth',
	    type: 'array or number',
	    description: 'Width of background image border in pixels.\n        The four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n        The background image beyond the width will be hidden.\n        If specified as a number, border with uniform width on all sides will be applied.',
	    'default': [0, 0, 0, 0]
	  }, {
	    name: 'exportZoom',
	    type: 'number',
	    description: 'The ratio between the desired image size to export and the preview size.\n        For example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n        the exported image size will be `600px * 400px`.\n        This also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.',
	    'default': 1
	  }, {
	    name: 'allowDragNDrop',
	    type: 'boolean',
	    description: 'When set to true, you can load an image by dragging it from local file browser onto the preview area.',
	    'default': true
	  }, {
	    name: 'minZoom',
	    type: 'string',
	    description: 'This options decides the minimal zoom level of the image.\n        If set to `\'fill\'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n        If set to `\'fit\'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.',
	    'default': 'fill'
	  }, {
	    name: 'maxZoom',
	    type: 'number',
	    description: 'Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.',
	    'default': 1
	  }, {
	    name: 'initialZoom',
	    type: 'string',
	    description: 'Determines the zoom when an image is loaded.\n        When set to `\'min\'`, image is zoomed to the smallest when loaded.\n        When set to `\'image\'`, image is zoomed to 100% when loaded.',
	    'default': 'min'
	  }, {
	    name: 'freeMove',
	    type: 'boolean',
	    description: 'When set to true, you can freely move the image instead of being bound to the container borders',
	    'default': false
	  }, {
	    name: 'smallImage',
	    type: 'string',
	    description: 'When set to `\'reject\'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n        When set to `\'allow\'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n        When set to `\'stretch\'`, the minimum zoom of small images would follow `minZoom` option.',
	    'default': 'reject'
	  }],

	  callbacks: [{
	    name: 'onFileChange',
	    description: 'Called when user selects a file in the select file input.',
	    params: [{
	      name: 'event',
	      type: 'object',
	      description: 'File change event object'
	    }]
	  }, {
	    name: 'onFileReaderError',
	    description: 'Called when `FileReader` encounters an error while loading the image file.'
	  }, {
	    name: 'onImageLoading',
	    description: 'Called when image starts to be loaded.'
	  }, {
	    name: 'onImageLoaded',
	    description: 'Called when image is loaded.'
	  }, {
	    name: 'onImageError',
	    description: 'Called when image cannot be loaded.',
	    params: [{
	      name: 'error',
	      type: 'object',
	      description: 'Error object.'
	    }, {
	      name: 'error.code',
	      type: 'number',
	      description: 'Error code. `0` means generic image loading failure. `1` means image is too small.'
	    }, {
	      name: 'error.message',
	      type: 'string',
	      description: 'A message explaining the error.'
	    }]
	  }, {
	    name: 'onZoomEnabled',
	    description: 'Called when image the zoom slider is enabled.'
	  }, {
	    name: 'onZoomDisabled',
	    description: 'Called when image the zoom slider is disabled.'
	  }, {
	    name: 'onZoomChange',
	    description: 'Called when zoom changes.',
	    params: [{
	      name: 'zoom',
	      type: 'number',
	      description: 'New zoom.'
	    }]
	  }, {
	    name: 'onOffsetChange',
	    description: 'Called when image offset changes.',
	    params: [{
	      name: 'offset',
	      type: 'object',
	      description: 'New offset, with `x` and `y` values.'
	    }]
	  }].map(function (o) {
	    o.type = 'function';return o;
	  })
	};

	var loadDefaults = function loadDefaults($el) {
	  var defaults = {};
	  if ($el) {
	    options.elements.forEach(function (o) {
	      defaults[o.name] = $el.find(o.defaultSelector);
	    });
	  }
	  options.values.forEach(function (o) {
	    defaults[o.name] = o['default'];
	  });
	  options.callbacks.forEach(function (o) {
	    defaults[o.name] = function () {};
	  });

	  return defaults;
	};

	exports.loadDefaults = loadDefaults;
	exports['default'] = options;

/***/ },
/* 6 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var exists = function exists(v) {
	  return typeof v !== 'undefined';
	};

	exports.exists = exists;
	var round = function round(x) {
	  return +(Math.round(x * 100) + 'e-2');
	};
	exports.round = round;

/***/ }
/******/ ])
});
;