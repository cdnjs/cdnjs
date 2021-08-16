/*!
 * wavesurfer.js markers plugin 5.2.0 (2021-08-16)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WaveSurfer", [], factory);
	else if(typeof exports === 'object')
		exports["WaveSurfer"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["markers"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/plugin/markers/index.js":
/*!*************************************!*\
  !*** ./src/plugin/markers/index.js ***!
  \*************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {Object} MarkerParams
 * @desc The parameters used to describe a marker.
 * @example wavesurfer.addMarker(regionParams);
 * @property {number} time The time to set the marker at
 * @property {?label} string An optional marker label
 * @property {?color} string Background color for marker
 * @property {?position} string "top" or "bottom", defaults to "bottom"
 * @property {?markerElement} element An HTML element to display instead of the default marker image
 */

/**
 * Markers are points in time in the audio that can be jumped to.
 *
 * @implements {PluginClass}
 *
 * @example
 * import MarkersPlugin from 'wavesurfer.markers.js';
 *
 * // if you are using <script> tags
 * var MarkerPlugin = window.WaveSurfer.markers;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     MarkersPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var DEFAULT_FILL_COLOR = "#D8D8D8";
var DEFAULT_POSITION = "bottom";

var MarkersPlugin = /*#__PURE__*/function () {
  function MarkersPlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, MarkersPlugin);

    this.params = params;
    this.wavesurfer = ws;
    this.util = ws.util;
    this.style = this.util.style;
    this.markerWidth = 11;
    this.markerHeight = 22;

    this._onResize = function () {
      _this._updateMarkerPositions();
    };

    this._onBackendCreated = function () {
      _this.wrapper = _this.wavesurfer.drawer.wrapper;

      if (_this.params.markers) {
        _this.params.markers.forEach(function (marker) {
          return _this.add(marker);
        });
      }

      window.addEventListener('resize', _this._onResize, true);
      window.addEventListener('orientationchange', _this._onResize, true);

      _this.wavesurfer.on('zoom', _this._onResize);
    };

    this.markers = [];

    this._onReady = function () {
      _this.wrapper = _this.wavesurfer.drawer.wrapper;

      _this._updateMarkerPositions();
    };
  }

  _createClass(MarkersPlugin, [{
    key: "init",
    value: function init() {
      // Check if ws is ready
      if (this.wavesurfer.isReady) {
        this._onBackendCreated();

        this._onReady();
      } else {
        this.wavesurfer.once('ready', this._onReady);
        this.wavesurfer.once('backend-created', this._onBackendCreated);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.wavesurfer.un('ready', this._onReady);
      this.wavesurfer.un('backend-created', this._onBackendCreated);
      this.wavesurfer.un('zoom', this._onResize);
      window.removeEventListener('resize', this._onResize, true);
      window.removeEventListener('orientationchange', this._onResize, true);
      this.clear();
    }
    /**
     * Add a marker
     *
     * @param {MarkerParams} params Marker definition
     * @return {object} The created marker
     */

  }, {
    key: "add",
    value: function add(params) {
      var marker = {
        time: params.time,
        label: params.label,
        color: params.color || DEFAULT_FILL_COLOR,
        position: params.position || DEFAULT_POSITION
      };

      if (params.markerElement) {
        this.markerWidth = params.markerElement.width;
        this.markerHeight = params.markerElement.height;
      }

      marker.el = this._createMarkerElement(marker, params.markerElement);
      this.wrapper.appendChild(marker.el);
      this.markers.push(marker);

      this._updateMarkerPositions();

      return marker;
    }
    /**
     * Remove a marker
     *
     * @param {number} index Index of the marker to remove
     */

  }, {
    key: "remove",
    value: function remove(index) {
      var marker = this.markers[index];

      if (!marker) {
        return;
      }

      this.wrapper.removeChild(marker.el);
      this.markers.splice(index, 1);
    }
  }, {
    key: "_createPointerSVG",
    value: function _createPointerSVG(color, position) {
      var svgNS = "http://www.w3.org/2000/svg";
      var el = document.createElementNS(svgNS, "svg");
      var polygon = document.createElementNS(svgNS, "polygon");
      el.setAttribute("viewBox", "0 0 40 80");
      polygon.setAttribute("id", "polygon");
      polygon.setAttribute("stroke", "#979797");
      polygon.setAttribute("fill", color);
      polygon.setAttribute("points", "20 0 40 30 40 80 0 80 0 30");

      if (position == "top") {
        polygon.setAttribute("transform", "rotate(180, 20 40)");
      }

      el.appendChild(polygon);
      this.style(el, {
        width: this.markerWidth + "px",
        height: this.markerHeight + "px",
        "min-width": this.markerWidth + "px",
        "margin-right": "5px",
        "z-index": 4
      });
      return el;
    }
  }, {
    key: "_createMarkerElement",
    value: function _createMarkerElement(marker, markerElement) {
      var _this2 = this;

      var label = marker.label;
      var time = marker.time;
      var el = document.createElement('marker');
      el.className = "wavesurfer-marker";
      this.style(el, {
        position: "absolute",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        "flex-direction": marker.position == "top" ? "column-reverse" : "column"
      });
      var line = document.createElement('div');
      this.style(line, {
        "flex-grow": 1,
        "margin-left": this.markerWidth / 2 - 0.5 + "px",
        background: "black",
        width: "1px",
        opacity: 0.1
      });
      el.appendChild(line);
      var labelDiv = document.createElement('div');

      var point = markerElement || this._createPointerSVG(marker.color, marker.position);

      labelDiv.appendChild(point);

      if (label) {
        var labelEl = document.createElement('span');
        labelEl.innerText = label;
        this.style(labelEl, {
          "font-family": "monospace",
          "font-size": "90%"
        });
        labelDiv.appendChild(labelEl);
      }

      this.style(labelDiv, {
        display: "flex",
        "align-items": "center",
        cursor: "pointer"
      });
      el.appendChild(labelDiv);
      labelDiv.addEventListener("click", function (e) {
        e.stopPropagation();

        _this2.wavesurfer.setCurrentTime(time);

        _this2.wavesurfer.fireEvent("marker-click", marker, e);
      });
      return el;
    }
  }, {
    key: "_updateMarkerPositions",
    value: function _updateMarkerPositions() {
      var duration = this.wavesurfer.getDuration();

      for (var i = 0; i < this.markers.length; i++) {
        var marker = this.markers[i];
        var elementWidth = this.wavesurfer.drawer.width / this.wavesurfer.params.pixelRatio;
        var positionPct = Math.min(marker.time / duration, 1);
        var leftPx = elementWidth * positionPct - this.markerWidth / 2;
        this.style(marker.el, {
          "left": leftPx + "px",
          "max-width": elementWidth - leftPx + "px"
        });
      }
    }
    /**
     * Remove all markers
     */

  }, {
    key: "clear",
    value: function clear() {
      while (this.markers.length > 0) {
        this.remove(0);
      }
    }
  }], [{
    key: "create",
    value:
    /**
     * @typedef {Object} MarkersPluginParams
     * @property {?MarkerParams[]} markers Initial set of markers
     * @fires MarkersPlugin#marker-click
     */

    /**
     * Markers plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param {MarkersPluginParams} params parameters use to initialise the plugin
     * @since 4.6.0
     * @return {PluginDefinition} an object representing the plugin
     */
    function create(params) {
      return {
        name: 'markers',
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        staticProps: {
          addMarker: function addMarker(options) {
            if (!this.initialisedPluginList.markers) {
              this.initPlugin('markers');
            }

            return this.markers.add(options);
          },
          clearMarkers: function clearMarkers() {
            this.markers && this.markers.clear();
          }
        },
        instance: MarkersPlugin
      };
    }
  }]);

  return MarkersPlugin;
}();

exports.default = MarkersPlugin;
module.exports = exports.default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/plugin/markers/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=wavesurfer.markers.js.map