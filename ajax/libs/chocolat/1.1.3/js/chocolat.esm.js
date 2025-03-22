import 'core-js/modules/web.dom-collections.iterator.js';

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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
  return new Promise(function (resolve) {
    var handleTransitionEnd = function handleTransitionEnd() {
      el.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    };

    el.addEventListener('transitionend', handleTransitionEnd);
    var classesBefore = el.getAttribute('class');
    var stylesBefore = el.getAttribute('style');
    triggeringFunc();

    if (classesBefore === el.getAttribute('class') && stylesBefore === el.getAttribute('style')) {
      handleTransitionEnd();
    }

    if (parseFloat(getComputedStyle(el)['transitionDuration']) === 0) {
      handleTransitionEnd();
    }
  });
}
function loadImage(_ref) {
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
      image.decode().then(function () {
        resolve(image);
      })["catch"](function () {
        reject(image);
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      image.onload = resolve(image);
      image.onerror = reject(image);
    });
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
  imageSourceAttribute: 'href',
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
  beforeImageLoad: function beforeImageLoad() {},
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
        _this.images.push({
          title: el.getAttribute('title'),
          src: el.getAttribute(settings.imageSourceAttribute),
          srcset: el.getAttribute('data-srcset'),
          sizes: el.getAttribute('data-sizes')
        });

        _this.off(el, 'click.chocolat');

        _this.on(el, 'click.chocolat', function (e) {
          _this.init(i);

          e.preventDefault();
        });
      });
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
        i = parseInt(i) || 0;
        return _this.init(i);
      },
      close: function close() {
        return _this.close();
      },
      next: function next() {
        return _this.change(1);
      },
      prev: function prev() {
        return _this.change(-1);
      },
      "goto": function goto(i) {
        return _this.open(i);
      },
      current: function current() {
        return _this.settings.currentImageIndex;
      },
      position: function position() {
        return _this.position(_this.elems.img);
      },
      destroy: function destroy() {
        return _this.destroy();
      },
      set: function set(property, value) {
        _this.settings[property] = value;
        return value;
      },
      get: function get(property) {
        return _this.settings[property];
      },
      getElem: function getElem(name) {
        return _this.elems[name];
      }
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
      var _this2 = this;

      this.settings.beforeImageLoad.call(this);

      if (!this.state.visible) {
        this.state.visible = true;
        setTimeout(function () {
          _this2.elems.overlay.classList.add('chocolat-visible');

          _this2.elems.wrapper.classList.add('chocolat-visible');
        }, 0);
        this.elems.container.classList.add('chocolat-open');
      }

      if (this.settings.fullScreen) {
        openFullScreen(this.elems.wrapper);
      }

      if (this.settings.currentImageIndex === index) {
        return Promise.resolve();
      }

      var loaderTimer = setTimeout(function () {
        _this2.elems.loader.classList.add('chocolat-visible');
      }, 1000);
      var fadeOutPromise;
      var image;
      var fadeOutTimer = setTimeout(function () {
        fadeOutTimer = undefined;
        fadeOutPromise = transitionAsPromise(function () {
          _this2.elems.imageCanvas.classList.remove('chocolat-visible');
        }, _this2.elems.imageCanvas);
      }, 80);
      return loadImage(this.images[index]).then(function (loadedImage) {
        image = loadedImage;

        if (fadeOutTimer) {
          clearTimeout(fadeOutTimer);
          return Promise.resolve();
        } else {
          return fadeOutPromise;
        }
      }).then(function () {
        var nextIndex = index + 1;

        if (_this2.images[nextIndex] != undefined) {
          loadImage(_this2.images[nextIndex]);
        }

        _this2.settings.currentImageIndex = index;
        _this2.elems.description.textContent = _this2.settings.description.call(_this2);
        _this2.elems.pagination.textContent = _this2.settings.pagination.call(_this2);

        _this2.arrows();

        return _this2.position(image).then(function () {
          _this2.elems.loader.classList.remove('chocolat-visible');

          clearTimeout(loaderTimer);
          return _this2.appear(image);
        });
      }).then(function () {
        _this2.elems.container.classList.toggle('chocolat-zoomable', _this2.zoomable(image, _this2.elems.wrapper));

        _this2.settings.afterImageLoad.call(_this2);
      });
    }
  }, {
    key: "position",
    value: function position(_ref) {
      var _this3 = this;

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
        Object.assign(_this3.elems.imageWrapper.style, {
          width: width + 'px',
          height: height + 'px'
        });
      }, this.elems.imageWrapper);
    }
  }, {
    key: "appear",
    value: function appear(image) {
      var _this4 = this;

      this.elems.imageWrapper.removeChild(this.elems.img);
      this.elems.img = image;
      this.elems.img.setAttribute('class', 'chocolat-img');
      this.elems.imageWrapper.appendChild(this.elems.img);
      var fadeInPromise = transitionAsPromise(function () {
        _this4.elems.imageCanvas.classList.add('chocolat-visible');
      }, this.elems.imageCanvas);
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
      var _this5 = this;

      if (this.state.fullScreenOpen) {
        exitFullScreen();
        return;
      }

      this.state.visible = false;
      var promiseOverlay = transitionAsPromise(function () {
        _this5.elems.overlay.classList.remove('chocolat-visible');
      }, this.elems.overlay);
      var promiseWrapper = transitionAsPromise(function () {
        _this5.elems.wrapper.classList.remove('chocolat-visible');
      }, this.elems.wrapper);
      return Promise.all([promiseOverlay, promiseWrapper]).then(function () {
        _this5.elems.container.classList.remove('chocolat-open');

        _this5.settings.afterClose.call(_this5);
      });
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
      var _this6 = this;

      this.off(document, 'keydown.chocolat');
      this.on(document, 'keydown.chocolat', function (e) {
        if (_this6.state.initialized) {
          if (e.keyCode == 37) {
            _this6.change(-1);
          } else if (e.keyCode == 39) {
            _this6.change(1);
          } else if (e.keyCode == 27) {
            _this6.close();
          }
        }
      });
      var right = this.elems.wrapper.querySelector('.chocolat-right');
      this.off(right, 'click.chocolat');
      this.on(right, 'click.chocolat', function () {
        _this6.change(+1);
      });
      var left = this.elems.wrapper.querySelector('.chocolat-left');
      this.off(left, 'click.chocolat');
      this.on(left, 'click.chocolat', function () {
        _this6.change(-1);
      });
      this.off(this.elems.close, 'click.chocolat');
      this.on(this.elems.close, 'click.chocolat', this.close.bind(this));
      this.off(this.elems.fullscreen, 'click.chocolat');
      this.on(this.elems.fullscreen, 'click.chocolat', function () {
        if (_this6.state.fullScreenOpen) {
          exitFullScreen();
          return;
        }

        openFullScreen(_this6.elems.wrapper);
      });
      this.off(document, 'fullscreenchange.chocolat');
      this.on(document, 'fullscreenchange.chocolat', function () {
        if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
          _this6.state.fullScreenOpen = true;
        } else {
          _this6.state.fullScreenOpen = false;
        }
      });
      this.off(document, 'webkitfullscreenchange.chocolat');
      this.on(document, 'webkitfullscreenchange.chocolat', function () {
        if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
          _this6.state.fullScreenOpen = true;
        } else {
          _this6.state.fullScreenOpen = false;
        }
      });

      if (this.settings.closeOnBackgroundClick) {
        this.off(this.elems.overlay, 'click.chocolat');
        this.on(this.elems.overlay, 'click.chocolat', this.close.bind(this));
      }

      this.off(this.elems.wrapper, 'click.chocolat');
      this.on(this.elems.wrapper, 'click.chocolat', function () {
        if (_this6.state.initialZoomState === null || !_this6.state.visible) {
          return;
        }

        _this6.elems.container.classList.add('chocolat-zooming-out');

        _this6.zoomOut().then(function () {
          _this6.elems.container.classList.remove('chocolat-zoomed');

          _this6.elems.container.classList.remove('chocolat-zooming-out');
        });
      });
      this.off(this.elems.imageWrapper, 'click.chocolat');
      this.on(this.elems.imageWrapper, 'click.chocolat', function (e) {
        if (_this6.state.initialZoomState === null && _this6.elems.container.classList.contains('chocolat-zoomable')) {
          e.stopPropagation();

          _this6.elems.container.classList.add('chocolat-zooming-in');

          _this6.zoomIn(e).then(function () {
            _this6.elems.container.classList.add('chocolat-zoomed');

            _this6.elems.container.classList.remove('chocolat-zooming-in');
          });
        }
      });
      this.on(this.elems.wrapper, 'mousemove.chocolat', function (e) {
        if (_this6.state.initialZoomState === null || !_this6.state.visible) {
          return;
        }

        var rect = _this6.elems.wrapper.getBoundingClientRect();

        var pos = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        };
        var height = _this6.elems.wrapper.clientHeight;
        var width = _this6.elems.wrapper.clientWidth;
        var imgWidth = _this6.elems.img.width;
        var imgHeight = _this6.elems.img.height;
        var coord = [e.pageX - width / 2 - pos.left, e.pageY - height / 2 - pos.top];
        var mvtX = 0;

        if (imgWidth > width) {
          var paddingX = _this6.settings.zoomedPaddingX(imgWidth, width);

          mvtX = coord[0] / (width / 2);
          mvtX = ((imgWidth - width) / 2 + paddingX) * mvtX;
        }

        var mvtY = 0;

        if (imgHeight > height) {
          var paddingY = _this6.settings.zoomedPaddingY(imgHeight, height);

          mvtY = coord[1] / (height / 2);
          mvtY = ((imgHeight - height) / 2 + paddingY) * mvtY;
        }

        _this6.elems.img.style.marginLeft = -mvtX + 'px';
        _this6.elems.img.style.marginTop = -mvtY + 'px';
      });
      this.on(window, 'resize.chocolat', function (e) {
        if (!_this6.state.initialized || !_this6.state.visible) {
          return;
        }

        debounce(50, function () {
          var fitOptions = {
            imgHeight: _this6.elems.img.naturalHeight,
            imgWidth: _this6.elems.img.naturalWidth,
            containerHeight: _this6.elems.wrapper.clientHeight,
            containerWidth: _this6.elems.wrapper.clientWidth,
            canvasWidth: _this6.elems.imageCanvas.clientWidth,
            canvasHeight: _this6.elems.imageCanvas.clientHeight,
            imageSize: _this6.settings.imageSize
          };

          var _fit2 = fit(fitOptions);

          _this6.position(_this6.elems.img).then(function () {
            _this6.elems.container.classList.toggle('chocolat-zoomable', _this6.zoomable(_this6.elems.img, _this6.elems.wrapper));
          });
        });
      });
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
      // const eventName = this.settings.setIndex + '-' + eventName
      var index = this.events.findIndex(function (event) {
        return event.element === element && event.eventName === eventName;
      });

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
