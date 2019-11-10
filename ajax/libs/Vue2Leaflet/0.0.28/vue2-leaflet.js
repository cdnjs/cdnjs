(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("leaflet"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "leaflet", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Vue2Leaflet"] = factory(require("lodash"), require("leaflet"), require("vue"));
	else
		root["Vue2Leaflet"] = factory(root["lodash"], root["leaflet"], root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.Map = __webpack_require__(16);
	exports.TileLayer = __webpack_require__(20);
	exports.Marker = __webpack_require__(17);
	exports.Polyline = __webpack_require__(18);
	exports.LayerGroup = __webpack_require__(15);
	exports.IconDefault = __webpack_require__(14);
	exports.Tooltip = __webpack_require__(21);
	exports.Popup = __webpack_require__(19);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	exports.default = function (vueElement, leafletElement, props, options) {
	  _lodash2.default.forEach(props, function (_ref, attribute) {
	    var twoWay = _ref.twoWay,
	        type = _ref.type,
	        custom = _ref.custom,
	        eventName = _ref.eventName;
	
	    var setMethodName = 'set' + capitalizeFirstLetter(attribute);
	    vueElement.$watch(attribute, function (newVal, oldVal) {
	      if (custom) {
	        vueElement[setMethodName](newVal, oldVal);
	      } else {
	        leafletElement[setMethodName](newVal);
	      }
	    }, {
	      deep: type === Object
	    });
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (vueElement, leaflet, events) {
	  _lodash2.default.forEach(events, function (eventName) {
	    var exposedName = 'l-' + eventName;
	    leaflet.on(eventName, function (ev) {
	      vueElement.$emit(exposedName, ev);
	    });
	  });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var props = {
	  imagePath: {
	    type: String,
	    custom: true,
	    default: ""
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    L.Icon.Default.imagePath = this.imagePath;
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {},
	    setImagePath: function setImagePath(newVal, oldVal) {
	      L.Icon.Default.imagePath = newVal;
	    }
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var props = {
	  visible: {
	    type: Boolean,
	    custom: true,
	    default: true
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = L.layerGroup();
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.setVisible(false);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      var that = this.mapObject;
	      this.parent = parent;
	      _.forEach(this.$children, function (child) {
	        child.deferredMountedTo(that);
	      });
	      if (this.visible) {
	        this.mapObject.addTo(parent);
	      }
	    },
	    setVisible: function setVisible(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.addTo(this.parent);
	      } else {
	        this.parent.removeLayer(this.mapObject);
	      }
	    }
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lodash = __webpack_require__(3);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _vue = __webpack_require__(33);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _leaflet = __webpack_require__(32);
	
	var _leaflet2 = _interopRequireDefault(_leaflet);
	
	var _eventsBinder = __webpack_require__(2);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'contextmenu', 'focus', 'blur', 'preclick', 'load', 'unload', 'viewreset', 'movestart', 'move', 'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoomend', 'zoomanim', 'zoomlevelschange', 'resize', 'autopanstart', 'layeradd', 'layerremove', 'baselayerchange', 'overlayadd', 'overlayremove', 'locationfound', 'locationerror', 'popupopen', 'popupclose'];
	
	var props = {
	  center: {
	    custom: true,
	    default: undefined
	  },
	  bounds: {
	    custom: true,
	    default: undefined
	  },
	  zoom: {
	    type: Number,
	    default: undefined
	  },
	  minZoom: {
	    type: Number,
	    default: undefined
	  },
	  maxZoom: {
	    type: Number,
	    default: undefined
	  },
	  paddingBottomRight: {
	    custom: true,
	    default: null
	  },
	  paddingTopLeft: {
	    custom: true,
	    default: null
	  },
	  padding: {
	    custom: true,
	    default: null
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = _leaflet2.default.map(this.$el, {
	      center: this.center,
	      zoom: this.zoom,
	      minZoom: this.minZoom,
	      maxZoom: this.maxZoom
	    });
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    var that = this.mapObject;
	    _lodash2.default.forEach(this.$children, function (child) {
	      child.deferredMountedTo(that);
	    });
	  },
	
	  methods: {
	    setCenter: function setCenter(newVal, oldVal) {
	      this.mapObject.setView(newVal, this.zoom);
	    },
	    setBounds: function setBounds(newVal, oldVal) {
	      var options = {};
	      if (this.padding) {
	        options.padding = this.padding;
	      } else {
	        if (this.paddingBottomRight) {
	          options.paddingBottomRight = this.paddingBottomRight;
	        }
	        if (this.paddingTopLeft) {
	          options.paddingTopLeft = this.paddingTopLeft;
	        }
	      }
	      this.mapObject.fitBounds(newVal, options);
	    },
	    setPaddingBottomRight: function setPaddingBottomRight(newVal, oldVal) {
	      this.paddingBottomRight = newVal;
	    },
	    setPaddingTopLeft: function setPaddingTopLeft(newVal, oldVal) {
	      this.paddingTopLeft = newVal;
	    },
	    setPadding: function setPadding(newVal, oldVal) {
	      this.padding = newVal;
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(2);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'add', 'remove', 'popupopen', 'popupclose', 'tooltipopen', 'tooltipclose'];
	
	var props = {
	  draggable: {
	    type: Boolean,
	    custom: true,
	    default: false
	  },
	  visible: {
	    type: Boolean,
	    custom: true,
	    default: true
	  },
	  latLng: {
	    type: Object
	  },
	  title: {
	    type: String,
	    custom: true,
	    default: ''
	  },
	  icon: {
	    custom: false,
	    default: ''
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    var options = {};
	    if (this.icon) {
	      options.icon = this.icon;
	    }
	    options.draggable = this.draggable;
	    this.mapObject = L.marker(this.latLng, options);
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.setVisible(false);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.parent = parent;
	      var that = this.mapObject;
	      _.forEach(this.$children, function (child) {
	        child.deferredMountedTo(that);
	      });
	      if (this.visible) {
	        this.mapObject.addTo(parent);
	      }
	    },
	    setDraggable: function setDraggable(newVal, oldVal) {
	      newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
	    },
	    setVisible: function setVisible(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.addTo(this.parent);
	      } else {
	        this.parent.removeLayer(this.mapObject);
	      }
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(2);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'add', 'remove', 'popupopen', 'popupclose', 'tooltipopen', 'tooltipclose'];
	
	var props = {
	  latLngs: {
	    type: Array,
	    default: []
	  },
	  style: {
	    type: Object
	  },
	  visible: {
	    type: Boolean,
	    custom: true,
	    default: true
	  },
	  color: {
	    type: String,
	    custom: true,
	    default: 'red'
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = L.polyline(this.latLngs, { color: this.color });
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.setVisible(false);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.parent = parent;
	      if (this.visible) {
	        this.mapObject.addTo(parent);
	      }
	    },
	    setVisible: function setVisible(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.addTo(this.parent);
	      } else {
	        this.parent.removeLayer(this.mapObject);
	      }
	    },
	    setColor: function setColor(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ color: newVal });
	      }
	    },
	    addLatLng: function addLatLng(value) {
	      this.mapObject.addLatLng(value);
	    }
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(2);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['add', 'remove', 'popupopen', 'popupclose', 'tooltipopen', 'tooltipclose'];
	
	var props = {
	  content: {
	    custom: true,
	    default: ''
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = L.popup();
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.setVisible(false);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.parent = parent;
	      parent.bindPopup(this.content);
	    },
	    setContent: function setContent(newVal, oldVal) {
	      if (newVal) {
	        this.parent.bindPopup(this.content);
	      } else {
	        if (this.parent.getTooltip) {
	          this.parent.unbindPopup();
	        }
	      }
	    }
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['url', 'attribution', 'token'],
	  mounted: function mounted() {
	    this.$tileLayer = L.tileLayer(this.url, {
	      attribution: this.attribution,
	      token: this.token
	    });
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.$tileLayer.addTo(parent);
	      _.forEach(this.$children, function (child) {
	        child.deferredMountedTo(that);
	      });
	    }
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(2);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(1);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['add', 'remove', 'popupopen', 'popupclose', 'tooltipopen', 'tooltipclose'];
	
	var props = {
	  content: {
	    type: String,
	    custom: true,
	    default: ''
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = L.tooltip();
	    this.mapObject.setTooltipContent(this.content);
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    if (this.$parent._isMounted) {
	      this.deferredMountedTo(this.$parent.mapObject);
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.setVisible(false);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.parent = parent;
	      if (this.content) {
	        this.parent.bindTooltip(this.content);
	      }
	    },
	    setContent: function setContent(newVal, oldVal) {
	      if (newVal) {
	        this.parent.bindTooltip(this.content);
	      } else {
	        if (this.parent.getTooltip) {
	          this.parent.unbindTooltip();
	        }
	      }
	    }
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, "\n#map {\n  height: 100%;\n  width: 100%;\n}\n.map-container {\n  height: 100%;\n  width: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(4)
	
	/* template */
	var __vue_template__ = __webpack_require__(29)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(5)
	
	/* template */
	var __vue_template__ = __webpack_require__(28)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(31)
	
	/* script */
	__vue_exports__ = __webpack_require__(6)
	
	/* template */
	var __vue_template__ = __webpack_require__(24)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(7)
	
	/* template */
	var __vue_template__ = __webpack_require__(22)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(8)
	
	/* template */
	var __vue_template__ = __webpack_require__(27)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(9)
	
	/* template */
	var __vue_template__ = __webpack_require__(25)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(10)
	
	/* template */
	var __vue_template__ = __webpack_require__(23)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(11)
	
	/* template */
	var __vue_template__ = __webpack_require__(26)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "map-container"
	  }, [_vm._m(0), _vm._v(" "), _c('div', [_vm._t("default")], 2)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "map-container"
	  }, [_c('div', {
	    attrs: {
	      "id": "map"
	    }
	  })])
	}]}

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div')
	},staticRenderFns: []}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(30)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-290724a0!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Map.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-290724a0!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Map.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("leaflet");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue2-leaflet.js.map