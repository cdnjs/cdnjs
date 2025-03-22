"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__shouldComponentUpdate = exports.__BackgroundImpl = exports.Background = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactMeasure = require("react-measure");
var _common = require("./common");
var _constants = require("./constants");
var _constructUrl = _interopRequireDefault(require("./constructUrl"));
var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));
var _findClosest = _interopRequireDefault(require("./findClosest"));
var _targetWidths = _interopRequireDefault(require("./targetWidths"));
var _HOFs = require("./HOFs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var findNearestWidth = function findNearestWidth(actualWidth) {
  return (0, _findClosest.default)(actualWidth, _targetWidths.default);
};
var toFixed = function toFixed(dp, value) {
  return +value.toFixed(dp);
};
var __shouldComponentUpdate = exports.__shouldComponentUpdate = function __shouldComponentUpdate(props, nextProps) {
  var contentRect = props.contentRect;
  var bounds = contentRect.bounds;
  var prevWidth = bounds.width,
    prevHeight = bounds.height;
  var nextContentRect = nextProps.contentRect;
  var nextBounds = nextContentRect.bounds;
  var nextWidth = nextBounds.width,
    nextHeight = nextBounds.height;

  // If neither of the previous nor next dimensions are present,
  // re-render.
  if (!nextWidth || !nextHeight || !prevWidth || !prevHeight) {
    return true;
  }

  // The component has been rendered at least twice by this point
  // and both the previous and next dimensions should be defined.
  // Only update if the nextWidth is greater than the prevWidth.
  if (prevWidth && nextWidth && nextWidth > prevWidth) {
    return true;
  }

  // Similarly, only update if the next height is greater than
  // the previous height.
  if (prevHeight && nextHeight && nextHeight > prevHeight) {
    return true;
  }
  var customizer = function customizer(oldProp, newProp, key) {
    // these keys are ignored from prop checking process
    if (key === "contentRect" || key === "measure" || key === "measureRef") {
      return true;
    }
    if (key === "children") {
      return oldProp == newProp;
    }
    if (key === "imgixParams") {
      return (0, _common.shallowEqual)(oldProp, newProp, function (a, b) {
        if (Array.isArray(a)) {
          return (0, _common.shallowEqual)(a, b);
        }
        return undefined;
      });
    }
    if (key === "htmlAttributes") {
      return (0, _common.shallowEqual)(oldProp, newProp);
    }
    return undefined; // handled by shallowEqual
  };

  // If we made it here, we need to check if the "top-level"
  // props have changed (e.g. disableLibraryParam).
  var propsEqual = (0, _common.shallowEqual)(props, nextProps, customizer);
  return !propsEqual;
};
var BackgroundImpl = exports.__BackgroundImpl = /*#__PURE__*/function (_React$Component) {
  function BackgroundImpl(props) {
    _classCallCheck(this, BackgroundImpl);
    return _callSuper(this, BackgroundImpl, [props]);
  }
  _inherits(BackgroundImpl, _React$Component);
  return _createClass(BackgroundImpl, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return __shouldComponentUpdate(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        measureRef = _this$props.measureRef,
        contentRect = _this$props.contentRect,
        _this$props$imgixPara = _this$props.imgixParams,
        imgixParams = _this$props$imgixPara === void 0 ? {} : _this$props$imgixPara,
        onLoad = _this$props.onLoad,
        disableLibraryParam = _this$props.disableLibraryParam,
        disablePathEncoding = _this$props.disablePathEncoding,
        src = _this$props.src,
        children = _this$props.children,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? "" : _this$props$className;
      var forcedWidth = imgixParams.w,
        forcedHeight = imgixParams.h;
      var hasDOMDimensions = contentRect.bounds.width != null && contentRect.bounds.height != null;
      var htmlAttributes = this.props.htmlAttributes || {};
      var dpr = toFixed(2, imgixParams.dpr || global.devicePixelRatio || 1);
      var ref = htmlAttributes.ref;
      var onRef = function onRef(el) {
        measureRef(el);
        if (typeof ref === "function") {
          ref(el);
        }
      };
      var _ref = function () {
          var bothWidthAndHeightPassed = forcedWidth != null && forcedHeight != null;
          if (bothWidthAndHeightPassed) {
            return {
              width: forcedWidth,
              height: forcedHeight
            };
          }
          if (!hasDOMDimensions) {
            return {
              width: undefined,
              height: undefined
            };
          }
          var ar = contentRect.bounds.width / contentRect.bounds.height;
          var neitherWidthNorHeightPassed = forcedWidth == null && forcedHeight == null;
          if (neitherWidthNorHeightPassed) {
            var _width = findNearestWidth(contentRect.bounds.width);
            var _height = Math.ceil(_width / ar);
            return {
              width: _width,
              height: _height
            };
          }
          if (forcedWidth != null) {
            var _height2 = Math.ceil(forcedWidth / ar);
            return {
              width: forcedWidth,
              height: _height2
            };
          } else if (forcedHeight != null) {
            var _width2 = Math.ceil(forcedHeight * ar);
            return {
              width: _width2,
              height: forcedHeight
            };
          }
        }(),
        width = _ref.width,
        height = _ref.height;
      var isReady = width != null && height != null;
      var commonProps = _objectSpread({}, htmlAttributes);
      if (!isReady) {
        return /*#__PURE__*/_react.default.createElement("div", _extends({}, commonProps, {
          className: "react-imgix-bg-loading ".concat(className),
          ref: onRef
        }), children);
      }
      var renderedSrc = function () {
        var _extractQueryParams = (0, _extractQueryParams3.default)(src),
          _extractQueryParams2 = _slicedToArray(_extractQueryParams, 2),
          rawSrc = _extractQueryParams2[0],
          params = _extractQueryParams2[1];
        var longImgixParams = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, params), {}, {
          fit: "crop"
        }, imgixParams), disableLibraryParam ? {} : {
          ixlib: "react-".concat(_constants.PACKAGE_VERSION)
        }), {}, {
          width: width,
          height: height,
          dpr: dpr
        });
        var srcOptions = {
          disablePathEncoding: disablePathEncoding
        };
        return (0, _constructUrl.default)(rawSrc, longImgixParams, srcOptions);
      }();
      var style = _objectSpread(_objectSpread({}, htmlAttributes.style), {}, {
        backgroundImage: "url(".concat(renderedSrc, ")"),
        backgroundSize: (htmlAttributes.style || {}).backgroundSize !== undefined ? htmlAttributes.style.backgroundSize : "cover"
      });
      return /*#__PURE__*/_react.default.createElement("div", _extends({}, commonProps, {
        className: className,
        ref: onRef,
        style: style
      }), children);
    }
  }]);
}(_react.default.Component);
var Background = exports.Background = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _reactMeasure.withContentRect)("bounds")(BackgroundImpl)));
//# sourceMappingURL=react-imgix-bg.js.map