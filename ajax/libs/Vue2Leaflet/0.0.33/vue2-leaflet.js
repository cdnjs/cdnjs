(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/core-js/object/keys"), require("leaflet"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/core-js/object/keys", "leaflet", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Vue2Leaflet"] = factory(require("babel-runtime/core-js/object/keys"), require("leaflet"), require("vue"));
	else
		root["Vue2Leaflet"] = factory(root["babel-runtime/core-js/object/keys"], root["leaflet"], root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_39__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_41__) {
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
	
	exports.Map = __webpack_require__(20);
	exports.TileLayer = __webpack_require__(24);
	exports.Marker = __webpack_require__(21);
	exports.Polyline = __webpack_require__(22);
	exports.LayerGroup = __webpack_require__(19);
	exports.GeoJSON = __webpack_require__(16);
	exports.IconDefault = __webpack_require__(17);
	exports.Tooltip = __webpack_require__(25);
	exports.Popup = __webpack_require__(23);
	exports.LCircle = __webpack_require__(18);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}
	
	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }
	
	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports
	
	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }
	
	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }
	
	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }
	
	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(39);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	exports.default = function (vueElement, leafletElement, props, options) {
	  var keys = (0, _keys2.default)(props);
	
	  var _loop = function _loop() {
	    var key = keys[i];
	    var setMethodName = 'set' + capitalizeFirstLetter(key);
	    var deepValue = props[key].type === Object;
	    if (props[key].custom) {
	      vueElement.$watch(key, function (newVal, oldVal) {
	        vueElement[setMethodName](newVal, oldVal);
	      }, {
	        deep: deepValue
	      });
	    } else {
	      vueElement.$watch(key, function (newVal, oldVal) {
	        leafletElement[setMethodName](newVal);
	      }, {
	        deep: deepValue
	      });
	    }
	  };
	
	  for (var i = 0; i < keys.length; i++) {
	    _loop();
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (vueElement, leaflet, events) {
	  var _loop = function _loop() {
	    var exposedName = 'l-' + events[i];
	    var eventName = events[i];
	    leaflet.on(eventName, function (ev) {
	      vueElement.$emit(exposedName, ev);
	    });
	  };
	
	  for (var i = 0; i < events.length; i++) {
	    _loop();
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['geojson', 'options'],
	  mounted: function mounted() {
	    this.$geoJSON = L.geoJSON(this.geojson, this.options);
	  },
	
	  methods: {
	    deferredMountedTo: function deferredMountedTo(parent) {
	      this.$geoJSON.addTo(parent);
	      var that = this.mapObject;
	      for (var i = 0; i < this.$children.length; i++) {
	        this.$children[i].deferredMountedTo(that);
	      }
	    },
	    addGeoJSONData: function addGeoJSONData(geojsonData) {
	      this.$geoJSON.addData(geojsonData);
	    },
	    getGeoJSONData: function getGeoJSONData() {
	      return this.$geoJSON.toGeoJSON();
	    },
	    getBounds: function getBounds() {
	      return this.$geoJSON.getBounds();
	    }
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _propsBinder = __webpack_require__(2);
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
	var _propsBinder2 = _interopRequireDefault(_propsBinder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'add', 'remove', 'popupopen', 'popupclose', 'tooltipopen', 'tooltipclose'];
	
	var props = {
	  latLng: {
	    type: Object
	  },
	  radius: {
	    type: Number
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
	    default: '#3388ff'
	  },
	  weight: {
	    type: Number,
	    custom: true,
	    default: 3
	  },
	  opacity: {
	    type: Number,
	    custom: true,
	    default: 1.0
	  },
	  lineCap: {
	    type: String,
	    custom: true,
	    default: 'round'
	  },
	  lineJoin: {
	    type: String,
	    custom: true,
	    default: 'round'
	  },
	  dashArray: {
	    type: String,
	    custom: true,
	    default: null
	  },
	  dashOffset: {
	    type: String,
	    custom: true,
	    default: null
	  },
	  fill: {
	    type: Boolean,
	    custom: true,
	    default: true
	  },
	  fillColor: {
	    type: String,
	    custom: true,
	    default: '#3388ff'
	  },
	  fillOpacity: {
	    type: Number,
	    custom: true,
	    default: 0.2
	  },
	  fillRule: {
	    type: String,
	    custom: true,
	    default: 'evenodd'
	  },
	  className: {
	    type: String,
	    custom: true,
	    default: null
	  }
	
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    var options = {};
	    if (this.color) {
	      options.color = this.color;
	    }
	    if (this.radius) {
	      options.radius = this.radius;
	    }
	    this.mapObject = L.circle(this.latLng, options);
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
	    setWeight: function setWeight(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ weight: newVal });
	      }
	    },
	    setOpacity: function setOpacity(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ opacity: newVal });
	      }
	    },
	    setLineCap: function setLineCap(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ lineCap: newVal });
	      }
	    },
	    setLineJoin: function setLineJoin(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ lineJoin: newVal });
	      }
	    },
	    setDashArray: function setDashArray(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ dashArray: newVal });
	      }
	    },
	    setDashOffset: function setDashOffset(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ dashOffset: newVal });
	      }
	    },
	    setFill: function setFill(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ fill: newVal });
	      }
	    },
	    setFillColor: function setFillColor(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ fillColor: newVal });
	      }
	    },
	    setFillOpacity: function setFillOpacity(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ fillOpacity: newVal });
	      }
	    },
	    setFillRule: function setFillRule(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ fillRule: newVal });
	      }
	    },
	    setClassName: function setClassName(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (newVal) {
	        this.mapObject.setStyle({ className: newVal });
	      }
	    },
	    addLatLng: function addLatLng(value) {
	      this.mapObject.addLatLng(value);
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
	
	var _propsBinder = __webpack_require__(2);
	
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
	      for (var i = 0; i < this.$children.length; i++) {
	        this.$children[i].deferredMountedTo(that);
	      }
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
	
	var _vue = __webpack_require__(41);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _leaflet = __webpack_require__(40);
	
	var _leaflet2 = _interopRequireDefault(_leaflet);
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
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
	  },
	  worldCopyJump: {
	    type: Boolean,
	    default: false
	  }
	};
	
	exports.default = {
	  props: props,
	  mounted: function mounted() {
	    this.mapObject = _leaflet2.default.map(this.$el, {
	      center: this.center,
	      zoom: this.zoom,
	      minZoom: this.minZoom,
	      maxZoom: this.maxZoom,
	      worldCopyJump: this.worldCopyJump
	    });
	    (0, _eventsBinder2.default)(this, this.mapObject, events);
	    (0, _propsBinder2.default)(this, this.mapObject, props);
	    for (var i = 0; i < this.$children.length; i++) {
	      this.$children[i].deferredMountedTo(this.mapObject);
	    }
	    this.setBounds(this.bounds);
	    this.mapObject.whenReady(function () {
	      this.$emit('l-ready');
	    }, this);
	  },
	
	  methods: {
	    setCenter: function setCenter(newVal, oldVal) {
	      this.mapObject.setView(newVal, this.zoom);
	    },
	    setBounds: function setBounds(newVal, oldVal) {
	      if (!(newVal && newVal.isValid())) {
	        return;
	      }
	
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
	      if (this.maxZoom != null) {
	        options.maxZoom = this.maxZoom;
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
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
	  icon: {
	    custom: false,
	    default: function _default() {
	      return new L.Icon.Default();
	    }
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
	      for (var i = 0; i < this.$children.length; i++) {
	        this.$children[i].deferredMountedTo(that);
	      }
	      if (this.visible) {
	        this.mapObject.addTo(parent);
	      }
	    },
	    setDraggable: function setDraggable(newVal, oldVal) {
	      if (this.mapObject.dragging) {
	        newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable();
	      }
	    },
	    setVisible: function setVisible(newVal, oldVal) {
	      if (newVal == oldVal) return;
	      if (this.mapObject) {
	        if (newVal) {
	          this.mapObject.addTo(this.parent);
	        } else {
	          this.parent.removeLayer(this.mapObject);
	        }
	      }
	    }
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
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
	    if (this.parent.getPopup()) {
	      this.parent.unbindPopup();
	    }
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
	        if (this.parent.getPopup()) {
	          this.parent.unbindPopup();
	        }
	      }
	    }
	  }
	};

/***/ },
/* 12 */
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
	      var that = this.mapObject;
	      for (var i = 0; i < this.$children.length; i++) {
	        this.$children[i].deferredMountedTo(that);
	      }
	    }
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventsBinder = __webpack_require__(3);
	
	var _eventsBinder2 = _interopRequireDefault(_eventsBinder);
	
	var _propsBinder = __webpack_require__(2);
	
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
	    if (this.parent.getTooltip()) {
	      this.parent.unbindTooltip();
	    }
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
	        if (this.parent.getTooltip()) {
	          this.parent.unbindTooltip();
	        }
	      }
	    }
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports
	
	
	// module
	exports.push([module.id, "#map,.map-container{height:100%;width:100%}", ""]);
	
	// exports


/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(4),
	  /* template */
	  __webpack_require__(35),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(5),
	  /* template */
	  __webpack_require__(26),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(6),
	  /* template */
	  __webpack_require__(30),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(7),
	  /* template */
	  __webpack_require__(31),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(36)
	
	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(8),
	  /* template */
	  __webpack_require__(28),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(9),
	  /* template */
	  __webpack_require__(29),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(10),
	  /* template */
	  __webpack_require__(27),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(11),
	  /* template */
	  __webpack_require__(33),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(12),
	  /* template */
	  __webpack_require__(34),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(13),
	  /* template */
	  __webpack_require__(32),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	
	module.exports = Component.exports


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div')
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
/* 29 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._t("default")], 2)
	},staticRenderFns: []}

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c("div")
	},staticRenderFns: []}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(37)("12f9e1fa", content, true);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-32da8ba1!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Map.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js?minimize!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-32da8ba1!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Map.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/
	
	var hasDocument = typeof document !== 'undefined'
	
	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}
	
	var listToStyles = __webpack_require__(38)
	
	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}
	
	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/
	
	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}
	
	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}
	
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())
	
	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction
	
	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)
	
	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}
	
	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}
	
	function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = { css: css, media: media, sourceMap: sourceMap }
	    if (!newStyles[id]) {
	      part.id = parentId + ':0'
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      part.id = parentId + ':' + newStyles[id].parts.length
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}
	
	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}
	
	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	  var hasSSR = styleElement != null
	
	  // if in production mode and style is already provided by SSR,
	  // simply do nothing.
	  if (hasSSR && isProduction) {
	    return noop
	  }
	
	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = styleElement || createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }
	
	  if (!hasSSR) {
	    update(obj)
	  }
	
	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}
	
	var replaceText = (function () {
	  var textStore = []
	
	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()
	
	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}
	
	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap
	
	  if (media) {
	    styleElement.setAttribute('media', media)
	  }
	
	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }
	
	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("leaflet");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue2-leaflet.js.map