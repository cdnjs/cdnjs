"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GMap = /*#__PURE__*/function (_Component) {
  _inherits(GMap, _Component);

  var _super = _createSuper(GMap);

  function GMap() {
    _classCallCheck(this, GMap);

    return _super.apply(this, arguments);
  }

  _createClass(GMap, [{
    key: "initMap",
    value: function initMap() {
      this.map = new google.maps.Map(this.container, this.props.options);

      if (this.props.onMapReady) {
        this.props.onMapReady({
          map: this.map
        });
      }

      this.initOverlays(this.props.overlays);
      this.bindMapEvent('click', this.props.onMapClick);
      this.bindMapEvent('dragend', this.props.onMapDragEnd);
      this.bindMapEvent('zoom_changed', this.props.onZoomChanged);
    }
  }, {
    key: "initOverlays",
    value: function initOverlays(overlays) {
      if (overlays) {
        var _iterator = _createForOfIteratorHelper(overlays),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var overlay = _step.value;
            overlay.setMap(this.map);
            this.bindOverlayEvents(overlay);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "bindOverlayEvents",
    value: function bindOverlayEvents(overlay) {
      var _this = this;

      overlay.addListener('click', function (event) {
        if (_this.props.onOverlayClick) {
          _this.props.onOverlayClick({
            originalEvent: event,
            overlay: overlay,
            map: _this.map
          });
        }
      });

      if (overlay.getDraggable()) {
        this.bindDragEvents(overlay);
      }
    }
  }, {
    key: "bindDragEvents",
    value: function bindDragEvents(overlay) {
      this.bindDragEvent(overlay, 'dragstart', this.props.onOverlayDragStart);
      this.bindDragEvent(overlay, 'drag', this.props.onOverlayDrag);
      this.bindDragEvent(overlay, 'dragend', this.props.onOverlayDragEnd);
    }
  }, {
    key: "bindMapEvent",
    value: function bindMapEvent(eventName, callback) {
      this.map.addListener(eventName, function (event) {
        if (callback) {
          callback(event);
        }
      });
    }
  }, {
    key: "bindDragEvent",
    value: function bindDragEvent(overlay, eventName, callback) {
      var _this2 = this;

      overlay.addListener(eventName, function (event) {
        if (callback) {
          callback({
            originalEvent: event,
            overlay: overlay,
            map: _this2.map
          });
        }
      });
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.map;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.overlays !== this.props.overlays) {
        if (prevProps.overlays) {
          var _iterator2 = _createForOfIteratorHelper(prevProps.overlays),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var overlay = _step2.value;
              google.maps.event.clearInstanceListeners(overlay);
              overlay.setMap(null);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        this.initOverlays(this.props.overlays);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initMap();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this3.container = el;
        },
        style: this.props.style,
        className: this.props.className
      });
    }
  }]);

  return GMap;
}(_react.Component);

exports.GMap = GMap;

_defineProperty(GMap, "defaultProps", {
  options: null,
  overlays: null,
  style: null,
  className: null,
  onMapReady: null,
  onMapClick: null,
  onMapDragEnd: null,
  onZoomChanged: null,
  onOverlayDragStart: null,
  onOverlayDrag: null,
  onOverlayDragEnd: null,
  onOverlayClick: null
});

_defineProperty(GMap, "propTypes", {
  options: _propTypes.default.object,
  overlays: _propTypes.default.array,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  onMapReady: _propTypes.default.func,
  onMapClick: _propTypes.default.func,
  onMapDragEnd: _propTypes.default.func,
  onZoomChanged: _propTypes.default.func,
  onOverlayDragStart: _propTypes.default.func,
  onOverlayDrag: _propTypes.default.func,
  onOverlayDragEnd: _propTypes.default.func,
  onOverlayClick: _propTypes.default.func
});