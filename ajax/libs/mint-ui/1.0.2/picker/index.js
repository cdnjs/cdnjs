module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(133);


/***/ },

/***/ 37:
/***/ function(module, exports) {

	var bindEvent = (function() {
	  if(document.addEventListener) {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var unbindEvent = (function() {
	  if(document.removeEventListener) {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.removeEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.detachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var bindOnce = function(el, event, fn) {
	  var listener = function() {
	    if (fn) {
	      fn.apply(this, arguments);
	    }
	    unbindEvent(el, event, listener);
	  };
	  bindEvent(el, event, listener);
	};

	module.exports = {
	  on: bindEvent,
	  off: unbindEvent,
	  once: bindOnce
	};

/***/ },

/***/ 86:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(134);

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(135)
	__vue_script__ = __webpack_require__(137)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/picker/src/picker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(147)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 135:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'mt-picker',

	  props: {
	    slots: {
	      type: Array
	    },
	    showToolbar: {
	      type: Boolean,
	      default: false
	    },
	    visibleItemCount: {
	      type: Number,
	      default: 5
	    },
	    rotateEffect: {
	      type: Boolean,
	      default: false
	    }
	  },

	  beforeCompile: function beforeCompile() {
	    var slots = this.slots || [];
	    this.values = [];
	    var values = this.values;
	    var valueIndexCount = 0;
	    slots.forEach(function (slot) {
	      if (!slot.divider) {
	        slot.valueIndex = valueIndexCount++;
	        values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
	      }
	    });
	  },


	  methods: {
	    getSlot: function getSlot(slotIndex) {
	      var slots = this.slots || [];
	      var count = 0;
	      var target;
	      var children = this.$children;

	      slots.forEach(function (slot, index) {
	        if (!slot.divider) {
	          if (slotIndex === count) {
	            target = children[index];
	          }
	          count++;
	        }
	      });

	      return target;
	    },
	    getSlotValue: function getSlotValue(index) {
	      var slot = this.getSlot(index);
	      if (slot) {
	        return slot.value;
	      }
	      return null;
	    },
	    setSlotValue: function setSlotValue(index, value) {
	      var slot = this.getSlot(index);
	      if (slot) {
	        slot.value = value;
	      }
	    },
	    getSlotValues: function getSlotValues(index) {
	      var slot = this.getSlot(index);
	      if (slot) {
	        return slot.values;
	      }
	      return null;
	    },
	    setSlotValues: function setSlotValues(index, values) {
	      var slot = this.getSlot(index);
	      if (slot) {
	        slot.values = values;
	      }
	    },
	    getValues: function getValues() {
	      return this.values;
	    },
	    setValues: function setValues(values) {
	      var _this = this;

	      var slotCount = this.slotCount;
	      values = values || [];
	      if (slotCount !== values.length) {
	        throw new Error('values length is not equal slot count.');
	      }
	      values.forEach(function (value, index) {
	        _this.setSlotValue(index, value);
	      });
	    }
	  },

	  events: {
	    slotValueChange: function slotValueChange() {
	      this.$emit('change', this, this.values);
	    }
	  },

	  computed: {
	    values: function values() {
	      var slots = this.slots || [];
	      var values = [];
	      slots.forEach(function (slot) {
	        if (!slot.divider) values.push(slot.value);
	      });

	      return values;
	    },
	    slotCount: function slotCount() {
	      var slots = this.slots || [];
	      var result = 0;
	      slots.forEach(function (slot) {
	        if (!slot.divider) result++;
	      });
	      return result;
	    }
	  },

	  components: {
	    PickerSlot: __webpack_require__(138)
	  }
	};

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(139)
	__vue_script__ = __webpack_require__(141)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/picker/src/picker-slot.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(146)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 139:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(86);

	var _vue2 = _interopRequireDefault(_vue);

	var _draggable = __webpack_require__(142);

	var _draggable2 = _interopRequireDefault(_draggable);

	var _translate = __webpack_require__(143);

	var _translate2 = _interopRequireDefault(_translate);

	var _event = __webpack_require__(37);

	var _class = __webpack_require__(144);

	__webpack_require__(145);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rotateElement = function rotateElement(element, angle) {
	  if (!element) return;
	  var transformProperty = _translate2.default.transformProperty;

	  element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + (' rotateX(' + angle + 'deg)');
	};

	var ITEM_HEIGHT = 36;
	var VISIBLE_ITEMS_ANGLE_MAP = {
	  3: -45,
	  5: -20,
	  7: -15
	};

	exports.default = {
	  props: {
	    values: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    value: {},
	    visibleItemCount: {
	      type: Number,
	      default: 5
	    },
	    rotateEffect: {
	      type: Boolean,
	      default: false
	    },
	    divider: {
	      type: Boolean,
	      default: false
	    },
	    textAlign: {
	      type: String,
	      default: 'center'
	    },
	    flex: {},
	    className: {},
	    content: {}
	  },

	  data: function data() {
	    return {
	      dragging: false,
	      animationFrameId: null
	    };
	  },


	  computed: {
	    flexStyle: function flexStyle() {
	      return {
	        'flex': this.flex,
	        '-webkit-box-flex': this.flex,
	        '-moz-box-flex': this.flex,
	        '-ms-flex': this.flex
	      };
	    },
	    classNames: function classNames() {
	      var PREFIX = 'picker-slot-';
	      var resultArray = [];

	      if (this.rotateEffect) {
	        resultArray.push(PREFIX + 'absolute');
	      }

	      var textAlign = this.textAlign || 'center';
	      resultArray.push(PREFIX + textAlign);

	      if (this.divider) {
	        resultArray.push(PREFIX + 'divider');
	      }

	      if (this.className) {
	        resultArray.push(this.className);
	      }

	      return resultArray.join(' ');
	    },
	    contentHeight: function contentHeight() {
	      return ITEM_HEIGHT * this.visibleItemCount;
	    },
	    valueIndex: function valueIndex() {
	      return this.values.indexOf(this.value);
	    },
	    dragRange: function dragRange() {
	      var values = this.values;
	      var visibleItemCount = this.visibleItemCount;

	      return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2)];
	    }
	  },

	  methods: {
	    value2Translate: function value2Translate(value) {
	      var values = this.values;
	      var valueIndex = values.indexOf(value);
	      var offset = Math.floor(this.visibleItemCount / 2);

	      if (valueIndex !== -1) {
	        return (valueIndex - offset) * -ITEM_HEIGHT;
	      }
	    },
	    translate2Value: function translate2Value(translate) {
	      translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
	      var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

	      return this.values[index];
	    },


	    updateRotate: function updateRotate(currentTranslate, pickerItems) {
	      if (this.divider) return;
	      var dragRange = this.dragRange;
	      var wrapper = this.$els.wrapper;

	      if (!pickerItems) {
	        pickerItems = wrapper.querySelectorAll('.picker-item');
	      }

	      if (currentTranslate === undefined) {
	        currentTranslate = _translate2.default.getElementTranslate(wrapper).top;
	      }

	      var itemsFit = Math.ceil(this.visibleItemCount / 2);
	      var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

	      [].forEach.call(pickerItems, function (item, index) {
	        var itemOffsetTop = index * ITEM_HEIGHT;
	        var translateOffset = dragRange[1] - currentTranslate;
	        var itemOffset = itemOffsetTop - translateOffset;
	        var percentage = itemOffset / ITEM_HEIGHT;

	        var angle = angleUnit * percentage;
	        if (angle > 180) angle = 180;
	        if (angle < -180) angle = -180;

	        rotateElement(item, angle);

	        if (Math.abs(percentage) > itemsFit) {
	          (0, _class.addClass)(item, 'picker-item-far');
	        } else {
	          (0, _class.removeClass)(item, 'picker-item-far');
	        }
	      });
	    },

	    planUpdateRotate: function planUpdateRotate() {
	      var _this = this;

	      var el = this.$els.wrapper;
	      cancelAnimationFrame(this.animationFrameId);

	      this.animationFrameId = requestAnimationFrame(function () {
	        _this.updateRotate();
	      });

	      (0, _event.once)(el, _translate2.default.transitionEndProperty, function () {
	        _this.animationFrameId = null;
	        cancelAnimationFrame(_this.animationFrameId);
	      });
	    },

	    initEvents: function initEvents() {
	      var _this2 = this;

	      var el = this.$els.wrapper;
	      var dragState = {};

	      var velocityTranslate, prevTranslate, pickerItems;

	      (0, _draggable2.default)(el, {
	        start: function start(event) {
	          cancelAnimationFrame(_this2.animationFrameId);
	          _this2.animationFrameId = null;
	          dragState = {
	            range: _this2.dragRange,
	            start: new Date(),
	            startLeft: event.pageX,
	            startTop: event.pageY,
	            startTranslateTop: _translate2.default.getElementTranslate(el).top
	          };
	          pickerItems = el.querySelectorAll('.picker-item');
	        },

	        drag: function drag(event) {
	          _this2.dragging = true;

	          dragState.left = event.pageX;
	          dragState.top = event.pageY;

	          var deltaY = dragState.top - dragState.startTop;
	          var translate = dragState.startTranslateTop + deltaY;

	          _translate2.default.translateElement(el, null, translate);

	          velocityTranslate = translate - prevTranslate || translate;

	          prevTranslate = translate;

	          if (_this2.rotateEffect) {
	            _this2.updateRotate(prevTranslate, pickerItems);
	          }
	        },

	        end: function end() {
	          _this2.dragging = false;

	          var momentumRatio = 7;
	          var currentTranslate = _translate2.default.getElementTranslate(el).top;
	          var duration = new Date() - dragState.start;

	          var momentumTranslate;
	          if (duration < 300) {
	            momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
	          }

	          var dragRange = dragState.range;

	          _vue2.default.nextTick(function () {
	            var translate;
	            if (momentumTranslate) {
	              translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
	            } else {
	              translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
	            }

	            translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

	            _translate2.default.translateElement(el, null, translate);

	            _this2.value = _this2.translate2Value(translate);

	            if (_this2.rotateEffect) {
	              _this2.planUpdateRotate();
	            }
	          });

	          dragState = {};
	        }
	      });
	    },
	    doOnValueChange: function doOnValueChange() {
	      var value = this.value;
	      var wrapper = this.$els.wrapper;

	      _translate2.default.translateElement(wrapper, null, this.value2Translate(value));
	    },
	    doOnValuesChange: function doOnValuesChange() {
	      var el = this.$el;
	      var items = el.querySelectorAll('.picker-item');
	      [].forEach.call(items, function (item, index) {
	        _translate2.default.translateElement(item, null, ITEM_HEIGHT * index);
	      });
	      if (this.rotateEffect) {
	        this.planUpdateRotate();
	      }
	    }
	  },

	  ready: function ready() {
	    this.ready = true;

	    if (!this.divider) {
	      this.initEvents();
	      this.doOnValueChange();
	    }

	    if (this.rotateEffect) {
	      this.doOnValuesChange();
	    }
	  },


	  watch: {
	    values: function values(newVal) {
	      var _this3 = this;

	      if (this.valueIndex === -1) {
	        this.value = (newVal || [])[0];
	      }
	      if (this.rotateEffect) {
	        _vue2.default.nextTick(function () {
	          _this3.doOnValuesChange();
	        });
	      }
	    },
	    value: function value() {
	      this.doOnValueChange();
	      if (this.rotateEffect) {
	        this.planUpdateRotate();
	      }
	      this.$dispatch('slotValueChange', this);
	    }
	  }
	};

/***/ },

/***/ 142:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (element, options) {
	  var moveFn = function moveFn(event) {
	    if (options.drag) {
	      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  var endFn = function endFn(event) {
	    if (!supportTouch) {
	      document.removeEventListener('mousemove', moveFn);
	      document.removeEventListener('mouseup', endFn);
	    }
	    document.onselectstart = null;
	    document.ondragstart = null;

	    isDragging = false;

	    if (options.end) {
	      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
	    if (isDragging) return;
	    document.onselectstart = function () {
	      return false;
	    };
	    document.ondragstart = function () {
	      return false;
	    };

	    if (!supportTouch) {
	      document.addEventListener('mousemove', moveFn);
	      document.addEventListener('mouseup', endFn);
	    }
	    isDragging = true;

	    if (options.start) {
	      event.preventDefault();
	      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  });

	  if (supportTouch) {
	    element.addEventListener('touchmove', moveFn);
	    element.addEventListener('touchend', endFn);
	    element.addEventListener('touchcancel', endFn);
	  }
	};

	var isDragging = false;
	var supportTouch = 'ontouchstart' in window;

	;

/***/ },

/***/ 143:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var docStyle = document.documentElement.style;
	var engine;
	var translate3d = false;

	if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
	  engine = 'presto';
	} else if ('MozAppearance' in docStyle) {
	  engine = 'gecko';
	} else if ('WebkitAppearance' in docStyle) {
	  engine = 'webkit';
	} else if (typeof navigator.cpuClass === 'string') {
	  engine = 'trident';
	}

	var cssPrefix = { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }[engine];

	var vendorPrefix = { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[engine];

	var helperElem = document.createElement('div');
	var perspectiveProperty = vendorPrefix + 'Perspective';
	var transformProperty = vendorPrefix + 'Transform';
	var transformStyleName = cssPrefix + 'transform';
	var transitionProperty = vendorPrefix + 'Transition';
	var transitionStyleName = cssPrefix + 'transition';
	var transitionEndProperty = vendorPrefix.toLowerCase() + 'TransitionEnd';

	if (helperElem.style[perspectiveProperty] !== undefined) {
	  translate3d = true;
	}

	var getTranslate = function getTranslate(element) {
	  var result = { left: 0, top: 0 };
	  if (element === null || element.style === null) return result;

	  var transform = element.style[transformProperty];
	  var matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(transform);
	  if (matches) {
	    result.left = +matches[1];
	    result.top = +matches[3];
	  }

	  return result;
	};

	var translateElement = function translateElement(element, x, y) {
	  if (x === null && y === null) return;

	  if (element === null || element === undefined || element.style === null) return;

	  if (!element.style[transformProperty] && x === 0 && y === 0) return;

	  if (x === null || y === null) {
	    var translate = getTranslate(element);
	    if (x === null) {
	      x = translate.left;
	    }
	    if (y === null) {
	      y = translate.top;
	    }
	  }

	  cancelTranslateElement(element);

	  if (translate3d) {
	    element.style[transformProperty] += ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ') translateZ(0px)';
	  } else {
	    element.style[transformProperty] += ' translate(' + (x ? x + 'px' : '0px') + ',' + (y ? y + 'px' : '0px') + ')';
	  }
	};

	var cancelTranslateElement = function cancelTranslateElement(element) {
	  if (element === null || element.style === null) return;
	  var transformValue = element.style[transformProperty];
	  if (transformValue) {
	    transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
	    element.style[transformProperty] = transformValue;
	  }
	};

	exports.default = {
	  transformProperty: transformProperty,
	  transformStyleName: transformStyleName,
	  transitionProperty: transitionProperty,
	  transitionStyleName: transitionStyleName,
	  transitionEndProperty: transitionEndProperty,
	  getElementTranslate: getTranslate,
	  translateElement: translateElement,
	  cancelTranslateElement: cancelTranslateElement
	};

/***/ },

/***/ 144:
/***/ function(module, exports) {

	var trim = function (string) {
	  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
	};

	var hasClass = function (el, cls) {
	  if (!el || !cls) return false;
	  if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
	  if (el.classList) {
	    return el.classList.contains(cls);
	  } else {
	    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	  }
	};

	var addClass = function (el, cls) {
	  if (!el) return;
	  var curClass = el.className;
	  var classes = (cls || '').split(' ');

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;

	    if (el.classList) {
	      el.classList.add(clsName);
	    } else {
	      if (!hasClass(el, clsName)) {
	        curClass += ' ' + clsName;
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = curClass;
	  }
	};

	var removeClass = function (el, cls) {
	  if (!el || !cls) return;
	  var classes = cls.split(' ');
	  var curClass = ' ' + el.className + ' ';

	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;

	    if (el.classList) {
	      el.classList.remove(clsName);
	    } else {
	      if (hasClass(el, clsName)) {
	        curClass = curClass.replace(' ' + clsName + ' ', ' ');
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = trim(curClass);
	  }
	};

	module.exports = {
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass
	};

/***/ },

/***/ 145:
/***/ function(module, exports) {

	module.exports = require("raf.js");

/***/ },

/***/ 146:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"picker-slot {{classNames}}\" :style=\"flexStyle\">\n  <div v-if=\"!divider\" v-el:wrapper class=\"picker-slot-wrapper\" :class=\"{ dragging: dragging }\" :style=\"{ height: contentHeight + 'px' }\">\n    <div class=\"picker-item\" v-for=\"itemValue in values\" :class=\"{ 'picker-selected': itemValue === value }\">{{ itemValue }}</div>\n  </div>\n  <div v-if=\"divider\">{{ content }}</div>\n</div>\n";

/***/ },

/***/ 147:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"picker\" :class=\"{ 'picker-3d': rotateEffect }\">\n  <div class=\"picker-toolbar\" v-if=\"showToolbar\"><slot></slot></div>\n  <div class=\"picker-items\">\n    <picker-slot v-for=\"slot in slots\" :values=\"slot.values || []\" :text-align=\"slot.textAlign || 'center'\" :visible-item-count=\"visibleItemCount\" :class-name=\"slot.className\" :flex=\"slot.flex\" :value.sync=\"values[slot.valueIndex]\" :rotate-effect=\"rotateEffect\" :divider=\"slot.divider\" :content=\"slot.content\"></picker-slot>\n    <div class=\"picker-center-highlight\"></div>\n  </div>\n</div>\n";

/***/ }

/******/ });