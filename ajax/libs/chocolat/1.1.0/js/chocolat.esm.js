import 'core-js/modules/es.object.assign.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.symbol.js';
import 'core-js/modules/es.symbol.description.js';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.string.iterator.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.array.find-index.js';
import 'core-js/modules/es.array.splice.js';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var timerDebounce = undefined;
function debounce(duration, callback) {
  clearTimeout(timerDebounce);
  timerDebounce = setTimeout(function () {
    callback();
  }, duration);
  return timerDebounce;
}
function transitionAsPromise(triggeringFunc, el) {
  var _this = this;

  return new Promise(function (resolve) {
    var _this2 = this;

    _newArrowCheck(this, _this);

    var _handleTransitionEnd = function handleTransitionEnd() {
      _newArrowCheck(this, _this2);

      el.removeEventListener('transitionend', _handleTransitionEnd);
      resolve();
    }.bind(this);

    el.addEventListener('transitionend', _handleTransitionEnd);
    var classesBefore = el.getAttribute('class');
    var stylesBefore = el.getAttribute('style');
    triggeringFunc();

    if (classesBefore === el.getAttribute('class') && stylesBefore === el.getAttribute('style')) {
      _handleTransitionEnd();
    }

    if (parseFloat(getComputedStyle(el)['transitionDuration']) === 0) {
      _handleTransitionEnd();
    }
  }.bind(this));
}
function loadImage(_ref) {
  var _this3 = this;

  var src = _ref.src,
      srcset = _ref.srcset,
      sizes = _ref.sizes;
  var image = new Image();
  image.src = src;

  if (srcset) {
    image.srcset = srcset;
  }

  if (sizes) {
    image.sizes = sizes;
  }

  if ('decode' in image) {
    return new Promise(function (resolve, reject) {
      var _this4 = this;

      _newArrowCheck(this, _this3);

      image.decode().then(function () {
        _newArrowCheck(this, _this4);

        resolve(image);
      }.bind(this))["catch"](function () {
        _newArrowCheck(this, _this4);

        reject(image);
      }.bind(this));
    }.bind(this));
  } else {
    return new Promise(function (resolve, reject) {
      _newArrowCheck(this, _this3);

      image.onload = resolve(image);
      image.onerror = reject(image);
    }.bind(this));
  }
}
function fit(options) {
  var height;
  var width;
  var imgHeight = options.imgHeight,
      imgWidth = options.imgWidth,
      containerHeight = options.containerHeight,
      containerWidth = options.containerWidth,
      canvasWidth = options.canvasWidth,
      canvasHeight = options.canvasHeight,
      imageSize = options.imageSize;
  var canvasRatio = canvasHeight / canvasWidth;
  var containerRatio = containerHeight / containerWidth;
  var imgRatio = imgHeight / imgWidth;

  if (imageSize == 'cover') {
    if (imgRatio < containerRatio) {
      height = containerHeight;
      width = height / imgRatio;
    } else {
      width = containerWidth;
      height = width * imgRatio;
    }
  } else if (imageSize == 'native') {
    height = imgHeight;
    width = imgWidth;
  } else {
    if (imgRatio > canvasRatio) {
      height = canvasHeight;
      width = height / imgRatio;
    } else {
      width = canvasWidth;
      height = width * imgRatio;
    }

    if (imageSize === 'scale-down' && (width >= imgWidth || height >= imgHeight)) {
      width = imgWidth;
      height = imgHeight;
    }
  }

  return {
    height: height,
    width: width
  };
}
function openFullScreen(wrapper) {
  if (wrapper.requestFullscreen) {
    return wrapper.requestFullscreen();
  } else if (wrapper.webkitRequestFullscreen) {
    return wrapper.webkitRequestFullscreen();
  } else if (wrapper.msRequestFullscreen) {
    return wrapper.msRequestFullscreen();
  } else {
    return Promise.reject();
  }
}
function exitFullScreen() {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    return document.msExitFullscreen();
  } else {
    return Promise.reject();
  }
}

var defaults = {
  container: document.body,
  // window or element
  className: undefined,
  imageSize: 'scale-down',
  // 'scale-down', 'contain', 'cover' or 'native'
  fullScreen: false,
  loop: false,
  linkImages: true,
  setIndex: 0,
  firstImageIndex: 0,
  lastImageIndex: false,
  currentImageIndex: undefined,
  allowZoom: true,
  closeOnBackgroundClick: true,
  setTitle: function setTitle() {
    return '';
  },
  description: function description() {
    return this.images[this.settings.currentImageIndex].title;
  },
  pagination: function pagination() {
    var last = this.settings.lastImageIndex + 1;
    var position = this.settings.currentImageIndex + 1;
    return position + '/' + last;
  },
  afterInitialize: function afterInitialize() {},
  afterMarkup: function afterMarkup() {},
  afterImageLoad: function afterImageLoad() {},
  afterClose: function afterClose() {},
  zoomedPaddingX: function zoomedPaddingX(canvasWidth, imgWidth) {
    return 0;
  },
  zoomedPaddingY: function zoomedPaddingY(canvasHeight, imgHeight) {
    return 0;
  }
};
var Chocolat = /*#__PURE__*/function () {
  function Chocolat(elements, settings) {
    var _this = this;

    _classCallCheck(this, Chocolat);

    this.settings = settings;
    this.elems = {};
    this.images = [];
    this.events = [];
    this.state = {
      fullScreenOpen: false,
      initialZoomState: null,
      initialized: false,
      timer: false,
      visible: false
    };
    this._cssClasses = ['chocolat-open', 'chocolat-in-container', 'chocolat-cover', 'chocolat-zoomable', 'chocolat-zoomed', 'chocolat-zooming-in', 'chocolat-zooming-out'];

    if (NodeList.prototype.isPrototypeOf(elements) || HTMLCollection.prototype.isPrototypeOf(elements)) {
      elements.forEach(function (el, i) {
        var _this2 = this;

        _newArrowCheck(this, _this);

        this.images.push({
          title: el.getAttribute('title'),
          src: el.getAttribute('href'),
          srcset: el.getAttribute('data-srcset'),
          sizes: el.getAttribute('data-sizes')
        });
        this.off(el, 'click.chocolat');
        this.on(el, 'click.chocolat', function (e) {
          _newArrowCheck(this, _this2);

          this.init(i);
          e.preventDefault();
        }.bind(this));
      }.bind(this));
    } else {
      this.images = elements;
    }

    if (this.settings.container instanceof Element || this.settings.container instanceof HTMLElement) {
      this.elems.container = this.settings.container;
    } else {
      this.elems.container = document.body;
    }

    this.api = {
      open: function open(i) {
        _newArrowCheck(this, _this);

        i = parseInt(i) || 0;
        return this.init(i);
      }.bind(this),
      close: function close() {
        _newArrowCheck(this, _this);

        return this.close();
      }.bind(this),
      next: function next() {
        _newArrowCheck(this, _this);

        return this.change(1);
      }.bind(this),
      prev: function prev() {
        _newArrowCheck(this, _this);

        return this.change(-1);
      }.bind(this),
      "goto": function goto(i) {
        _newArrowCheck(this, _this);

        return this.open(i);
      }.bind(this),
      current: function current() {
        _newArrowCheck(this, _this);

        return this.settings.currentImageIndex;
      }.bind(this),
      position: function position() {
        _newArrowCheck(this, _this);

        return this.position(this.elems.img);
      }.bind(this),
      destroy: function destroy() {
        _newArrowCheck(this, _this);

        return this.destroy();
      }.bind(this),
      set: function set(property, value) {
        _newArrowCheck(this, _this);

        this.settings[property] = value;
        return value;
      }.bind(this),
      get: function get(property) {
        _newArrowCheck(this, _this);

        return this.settings[property];
      }.bind(this),
      getElem: function getElem(name) {
        _newArrowCheck(this, _this);

        return this.elems[name];
      }.bind(this)
    };
  }

  _createClass(Chocolat, [{
    key: "init",
    value: function init(i) {
      if (!this.state.initialized) {
        this.markup();
        this.attachListeners();
        this.settings.lastImageIndex = this.images.length - 1;
        this.state.initialized = true;
      }

      this.settings.afterInitialize.call(this);
      return this.load(i);
    }
  }, {
    key: "load",
    value: function load(index) {
      var _this3 = this;

      if (!this.state.visible) {
        this.state.visible = true;
        setTimeout(function () {
          _newArrowCheck(this, _this3);

          this.elems.overlay.classList.add('chocolat-visible');
          this.elems.wrapper.classList.add('chocolat-visible');
        }.bind(this), 0);
        this.elems.container.classList.add('chocolat-open');
      }

      if (this.settings.fullScreen) {
        openFullScreen(this.elems.wrapper);
      }

      if (this.settings.currentImageIndex === index) {
        return Promise.resolve();
      }

      var loaderTimer = setTimeout(function () {
        _newArrowCheck(this, _this3);

        this.elems.loader.classList.add('chocolat-visible');
      }.bind(this), 1000);
      var fadeOutPromise;
      var image;
      var fadeOutTimer = setTimeout(function () {
        var _this4 = this;

        _newArrowCheck(this, _this3);

        fadeOutTimer = undefined;
        fadeOutPromise = transitionAsPromise(function () {
          _newArrowCheck(this, _this4);

          this.elems.imageCanvas.classList.remove('chocolat-visible');
        }.bind(this), this.elems.imageCanvas);
      }.bind(this), 80);
      return loadImage(this.images[index]).then(function (loadedImage) {
        _newArrowCheck(this, _this3);

        image = loadedImage;

        if (fadeOutTimer) {
          clearTimeout(fadeOutTimer);
          return Promise.resolve();
        } else {
          return fadeOutPromise;
        }
      }.bind(this)).then(function () {
        var _this5 = this;

        _newArrowCheck(this, _this3);

        var nextIndex = index + 1;

        if (this.images[nextIndex] != undefined) {
          loadImage(this.images[nextIndex]);
        }

        this.settings.currentImageIndex = index;
        this.elems.description.textContent = this.settings.description.call(this);
        this.elems.pagination.textContent = this.settings.pagination.call(this);
        this.arrows();
        return this.position(image).then(function () {
          _newArrowCheck(this, _this5);

          this.elems.loader.classList.remove('chocolat-visible');
          clearTimeout(loaderTimer);
          return this.appear(image);
        }.bind(this));
      }.bind(this)).then(function () {
        _newArrowCheck(this, _this3);

        this.elems.container.classList.toggle('chocolat-zoomable', this.zoomable(image, this.elems.wrapper));
        this.settings.afterImageLoad.call(this);
      }.bind(this));
    }
  }, {
    key: "position",
    value: function position(_ref) {
      var _this6 = this;

      var naturalHeight = _ref.naturalHeight,
          naturalWidth = _ref.naturalWidth;
      var fitOptions = {
        imgHeight: naturalHeight,
        imgWidth: naturalWidth,
        containerHeight: this.elems.container.clientHeight,
        containerWidth: this.elems.container.clientWidth,
        canvasWidth: this.elems.imageCanvas.clientWidth,
        canvasHeight: this.elems.imageCanvas.clientHeight,
        imageSize: this.settings.imageSize
      };

      var _fit = fit(fitOptions),
          width = _fit.width,
          height = _fit.height;

      return transitionAsPromise(function () {
        _newArrowCheck(this, _this6);

        Object.assign(this.elems.imageWrapper.style, {
          width: width + 'px',
          height: height + 'px'
        });
      }.bind(this), this.elems.imageWrapper);
    }
  }, {
    key: "appear",
    value: function appear(image) {
      var _this7 = this;

      this.elems.imageWrapper.removeChild(this.elems.img);
      this.elems.img = image;
      this.elems.img.setAttribute('class', 'chocolat-img');
      this.elems.imageWrapper.appendChild(this.elems.img);
      var fadeInPromise = transitionAsPromise(function () {
        _newArrowCheck(this, _this7);

        this.elems.imageCanvas.classList.add('chocolat-visible');
      }.bind(this), this.elems.imageCanvas);
      return fadeInPromise;
    }
  }, {
    key: "change",
    value: function change(step) {
      if (!this.state.visible) {
        return;
      }

      if (!this.settings.linkImages) {
        return;
      }

      this.zoomOut();
      var requestedImage = this.settings.currentImageIndex + parseInt(step);

      if (requestedImage > this.settings.lastImageIndex) {
        if (this.settings.loop) {
          return this.load(this.settings.firstImageIndex);
        }
      } else if (requestedImage < this.settings.firstImageIndex) {
        if (this.settings.loop) {
          return this.load(this.settings.lastImageIndex);
        }
      } else {
        return this.load(requestedImage);
      }
    }
  }, {
    key: "arrows",
    value: function arrows() {
      if (this.settings.loop) {
        this.elems.left.classList.add('active');
        this.elems.right.classList.add('active');
      } else if (this.settings.linkImages) {
        this.elems.right.classList.toggle('active', this.settings.currentImageIndex !== this.settings.lastImageIndex);
        this.elems.left.classList.toggle('active', this.settings.currentImageIndex !== this.settings.firstImageIndex);
      } else {
        this.elems.left.classList.remove('active');
        this.elems.right.classList.remove('active');
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this8 = this;

      if (this.state.fullScreenOpen) {
        exitFullScreen();
        return;
      }

      this.state.visible = false;
      var promiseOverlay = transitionAsPromise(function () {
        _newArrowCheck(this, _this8);

        this.elems.overlay.classList.remove('chocolat-visible');
      }.bind(this), this.elems.overlay);
      var promiseWrapper = transitionAsPromise(function () {
        _newArrowCheck(this, _this8);

        this.elems.wrapper.classList.remove('chocolat-visible');
      }.bind(this), this.elems.wrapper);
      return Promise.all([promiseOverlay, promiseWrapper]).then(function () {
        _newArrowCheck(this, _this8);

        this.elems.container.classList.remove('chocolat-open');
        this.settings.afterClose.call(this);
      }.bind(this));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$elems$container;

      for (var i = this.events.length - 1; i >= 0; i--) {
        var _this$events$i = this.events[i],
            element = _this$events$i.element,
            eventName = _this$events$i.eventName;
        this.off(element, eventName);
      }

      if (!this.state.initialized) {
        return;
      }

      if (this.state.fullScreenOpen) {
        exitFullScreen();
      }

      this.settings.currentImageIndex = undefined;
      this.state.visible = false;
      this.state.initialized = false;

      (_this$elems$container = this.elems.container.classList).remove.apply(_this$elems$container, _toConsumableArray(this._cssClasses));

      this.elems.wrapper.parentNode.removeChild(this.elems.wrapper);
    }
  }, {
    key: "markup",
    value: function markup() {
      this.elems.container.classList.add('chocolat-open', this.settings.className);

      if (this.settings.imageSize == 'cover') {
        this.elems.container.classList.add('chocolat-cover');
      }

      if (this.elems.container !== document.body) {
        this.elems.container.classList.add('chocolat-in-container');
      }

      this.elems.wrapper = document.createElement('div');
      this.elems.wrapper.setAttribute('id', 'chocolat-content-' + this.settings.setIndex);
      this.elems.wrapper.setAttribute('class', 'chocolat-wrapper');
      this.elems.container.appendChild(this.elems.wrapper);
      this.elems.overlay = document.createElement('div');
      this.elems.overlay.setAttribute('class', 'chocolat-overlay');
      this.elems.wrapper.appendChild(this.elems.overlay);
      this.elems.loader = document.createElement('div');
      this.elems.loader.setAttribute('class', 'chocolat-loader');
      this.elems.wrapper.appendChild(this.elems.loader);
      this.elems.layout = document.createElement('div');
      this.elems.layout.setAttribute('class', 'chocolat-layout');
      this.elems.wrapper.appendChild(this.elems.layout);
      this.elems.top = document.createElement('div');
      this.elems.top.setAttribute('class', 'chocolat-top');
      this.elems.layout.appendChild(this.elems.top);
      this.elems.center = document.createElement('div');
      this.elems.center.setAttribute('class', 'chocolat-center');
      this.elems.layout.appendChild(this.elems.center);
      this.elems.left = document.createElement('div');
      this.elems.left.setAttribute('class', 'chocolat-left');
      this.elems.center.appendChild(this.elems.left);
      this.elems.imageCanvas = document.createElement('div');
      this.elems.imageCanvas.setAttribute('class', 'chocolat-image-canvas');
      this.elems.center.appendChild(this.elems.imageCanvas);
      this.elems.imageWrapper = document.createElement('div');
      this.elems.imageWrapper.setAttribute('class', 'chocolat-image-wrapper');
      this.elems.imageCanvas.appendChild(this.elems.imageWrapper);
      this.elems.img = document.createElement('img');
      this.elems.img.setAttribute('class', 'chocolat-img');
      this.elems.imageWrapper.appendChild(this.elems.img);
      this.elems.right = document.createElement('div');
      this.elems.right.setAttribute('class', 'chocolat-right');
      this.elems.center.appendChild(this.elems.right);
      this.elems.bottom = document.createElement('div');
      this.elems.bottom.setAttribute('class', 'chocolat-bottom');
      this.elems.layout.appendChild(this.elems.bottom);
      this.elems.close = document.createElement('span');
      this.elems.close.setAttribute('class', 'chocolat-close');
      this.elems.top.appendChild(this.elems.close);
      this.elems.description = document.createElement('span');
      this.elems.description.setAttribute('class', 'chocolat-description');
      this.elems.bottom.appendChild(this.elems.description);
      this.elems.pagination = document.createElement('span');
      this.elems.pagination.setAttribute('class', 'chocolat-pagination');
      this.elems.bottom.appendChild(this.elems.pagination);
      this.elems.setTitle = document.createElement('span');
      this.elems.setTitle.setAttribute('class', 'chocolat-set-title');
      this.elems.setTitle.textContent = this.settings.setTitle();
      this.elems.bottom.appendChild(this.elems.setTitle);
      this.elems.fullscreen = document.createElement('span');
      this.elems.fullscreen.setAttribute('class', 'chocolat-fullscreen');
      this.elems.bottom.appendChild(this.elems.fullscreen);
      this.settings.afterMarkup.call(this);
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this9 = this;

      this.off(document, 'keydown.chocolat');
      this.on(document, 'keydown.chocolat', function (e) {
        _newArrowCheck(this, _this9);

        if (this.state.initialized) {
          if (e.keyCode == 37) {
            this.change(-1);
          } else if (e.keyCode == 39) {
            this.change(1);
          } else if (e.keyCode == 27) {
            this.close();
          }
        }
      }.bind(this));
      var right = this.elems.wrapper.querySelector('.chocolat-right');
      this.off(right, 'click.chocolat');
      this.on(right, 'click.chocolat', function () {
        _newArrowCheck(this, _this9);

        this.change(+1);
      }.bind(this));
      var left = this.elems.wrapper.querySelector('.chocolat-left');
      this.off(left, 'click.chocolat');
      this.on(left, 'click.chocolat', function () {
        _newArrowCheck(this, _this9);

        this.change(-1);
      }.bind(this));
      this.off(this.elems.close, 'click.chocolat');
      this.on(this.elems.close, 'click.chocolat', this.close.bind(this));
      this.off(this.elems.fullscreen, 'click.chocolat');
      this.on(this.elems.fullscreen, 'click.chocolat', function () {
        _newArrowCheck(this, _this9);

        if (this.state.fullScreenOpen) {
          exitFullScreen();
          return;
        }

        openFullScreen(this.elems.wrapper);
      }.bind(this));
      this.off(document, 'fullscreenchange.chocolat');
      this.on(document, 'fullscreenchange.chocolat', function () {
        _newArrowCheck(this, _this9);

        if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
          this.state.fullScreenOpen = true;
        } else {
          this.state.fullScreenOpen = false;
        }
      }.bind(this));
      this.off(document, 'webkitfullscreenchange.chocolat');
      this.on(document, 'webkitfullscreenchange.chocolat', function () {
        _newArrowCheck(this, _this9);

        if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
          this.state.fullScreenOpen = true;
        } else {
          this.state.fullScreenOpen = false;
        }
      }.bind(this));

      if (this.settings.closeOnBackgroundClick) {
        this.off(this.elems.overlay, 'click.chocolat');
        this.on(this.elems.overlay, 'click.chocolat', this.close.bind(this));
      }

      this.off(this.elems.wrapper, 'click.chocolat');
      this.on(this.elems.wrapper, 'click.chocolat', function () {
        var _this10 = this;

        _newArrowCheck(this, _this9);

        if (this.state.initialZoomState === null || !this.state.visible) {
          return;
        }

        this.elems.container.classList.add('chocolat-zooming-out');
        this.zoomOut().then(function () {
          _newArrowCheck(this, _this10);

          this.elems.container.classList.remove('chocolat-zoomed');
          this.elems.container.classList.remove('chocolat-zooming-out');
        }.bind(this));
      }.bind(this));
      this.off(this.elems.imageWrapper, 'click.chocolat');
      this.on(this.elems.imageWrapper, 'click.chocolat', function (e) {
        var _this11 = this;

        _newArrowCheck(this, _this9);

        if (this.state.initialZoomState === null && this.elems.container.classList.contains('chocolat-zoomable')) {
          e.stopPropagation();
          this.elems.container.classList.add('chocolat-zooming-in');
          this.zoomIn(e).then(function () {
            _newArrowCheck(this, _this11);

            this.elems.container.classList.add('chocolat-zoomed');
            this.elems.container.classList.remove('chocolat-zooming-in');
          }.bind(this));
        }
      }.bind(this));
      this.on(this.elems.wrapper, 'mousemove.chocolat', function (e) {
        _newArrowCheck(this, _this9);

        if (this.state.initialZoomState === null || !this.state.visible) {
          return;
        }

        var rect = this.elems.wrapper.getBoundingClientRect();
        var pos = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        };
        var height = this.elems.wrapper.clientHeight;
        var width = this.elems.wrapper.clientWidth;
        var imgWidth = this.elems.img.width;
        var imgHeight = this.elems.img.height;
        var coord = [e.pageX - width / 2 - pos.left, e.pageY - height / 2 - pos.top];
        var mvtX = 0;

        if (imgWidth > width) {
          var paddingX = this.settings.zoomedPaddingX(imgWidth, width);
          mvtX = coord[0] / (width / 2);
          mvtX = ((imgWidth - width) / 2 + paddingX) * mvtX;
        }

        var mvtY = 0;

        if (imgHeight > height) {
          var paddingY = this.settings.zoomedPaddingY(imgHeight, height);
          mvtY = coord[1] / (height / 2);
          mvtY = ((imgHeight - height) / 2 + paddingY) * mvtY;
        }

        this.elems.img.style.marginLeft = -mvtX + 'px';
        this.elems.img.style.marginTop = -mvtY + 'px';
      }.bind(this));
      this.on(window, 'resize.chocolat', function (e) {
        var _this12 = this;

        _newArrowCheck(this, _this9);

        if (!this.state.initialized || !this.state.visible) {
          return;
        }

        debounce(50, function () {
          var _this13 = this;

          _newArrowCheck(this, _this12);

          var fitOptions = {
            imgHeight: this.elems.img.naturalHeight,
            imgWidth: this.elems.img.naturalWidth,
            containerHeight: this.elems.wrapper.clientHeight,
            containerWidth: this.elems.wrapper.clientWidth,
            canvasWidth: this.elems.imageCanvas.clientWidth,
            canvasHeight: this.elems.imageCanvas.clientHeight,
            imageSize: this.settings.imageSize
          };

          var _fit2 = fit(fitOptions);

          this.position(this.elems.img).then(function () {
            _newArrowCheck(this, _this13);

            this.elems.container.classList.toggle('chocolat-zoomable', this.zoomable(this.elems.img, this.elems.wrapper));
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }
  }, {
    key: "zoomable",
    value: function zoomable(image, wrapper) {
      var wrapperWidth = wrapper.clientWidth;
      var wrapperHeight = wrapper.clientHeight;
      var isImageZoomable = this.settings.allowZoom && (image.naturalWidth > wrapperWidth || image.naturalHeight > wrapperHeight) ? true : false;
      var isImageStretched = image.clientWidth > image.naturalWidth || image.clientHeight > image.naturalHeight;
      return isImageZoomable && !isImageStretched;
    }
  }, {
    key: "zoomIn",
    value: function zoomIn(e) {
      this.state.initialZoomState = this.settings.imageSize;
      this.settings.imageSize = 'native';
      return this.position(this.elems.img);
    }
  }, {
    key: "zoomOut",
    value: function zoomOut(e) {
      this.settings.imageSize = this.state.initialZoomState || this.settings.imageSize;
      this.state.initialZoomState = null;
      this.elems.img.style.margin = 0;
      return this.position(this.elems.img);
    }
  }, {
    key: "on",
    value: function on(element, eventName, cb) {
      // const eventName = this.settings.setIndex + '-' + eventName
      var length = this.events.push({
        element: element,
        eventName: eventName,
        cb: cb
      });
      element.addEventListener(eventName.split('.')[0], this.events[length - 1].cb);
    }
  }, {
    key: "off",
    value: function off(element, eventName) {
      var _this14 = this;

      // const eventName = this.settings.setIndex + '-' + eventName
      var index = this.events.findIndex(function (event) {
        _newArrowCheck(this, _this14);

        return event.element === element && event.eventName === eventName;
      }.bind(this));

      if (this.events[index]) {
        element.removeEventListener(eventName.split('.')[0], this.events[index].cb);
        this.events.splice(index, 1);
      }
    }
  }]);

  return Chocolat;
}();

var instances = [];
function main_esm (elements, options) {
  var settings = Object.assign({}, defaults, {
    images: []
  }, options, {
    setIndex: instances.length
  });
  var instance = new Chocolat(elements, settings);
  instances.push(instance);
  return instance;
}

export default main_esm;
