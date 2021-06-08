"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__BackgroundImpl = exports.Background = exports.__shouldComponentUpdate = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactMeasure = require("react-measure");

var _constants = require("./constants");

var _constructUrl = _interopRequireDefault(require("./constructUrl"));

var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));

var _findClosest = _interopRequireDefault(require("./findClosest"));

var _targetWidths = _interopRequireDefault(require("./targetWidths"));

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var findNearestWidth = function findNearestWidth(actualWidth) {
  return (0, _findClosest.default)(actualWidth, _targetWidths.default);
};

var toFixed = function toFixed(dp, value) {
  return +value.toFixed(dp);
};

var __shouldComponentUpdate = function __shouldComponentUpdate(props, nextProps) {
  var contentRect = props.contentRect;
  var bounds = contentRect.bounds;
  var prevWidth = bounds.width,
      prevHeight = bounds.height;
  var nextContentRect = nextProps.contentRect;
  var nextBounds = nextContentRect.bounds;
  var nextWidth = nextBounds.width,
      nextHeight = nextBounds.height; // If neither of the previous nor next dimensions are present,
  // re-render.

  if (!nextWidth || !nextHeight || !prevWidth || !prevHeight) {
    return true;
  } // The component has been rendered at least twice by this point
  // and both the previous and next dimensions should be defined.
  // Only update if the nextWidth is greater than the prevWidth.


  if (prevWidth && nextWidth && nextWidth > prevWidth) {
    return true;
  } // Similarly, only update if the next height is greater than
  // the previous height.


  if (prevHeight && nextHeight && nextHeight > prevHeight) {
    return true;
  }

  var customizer = function customizer(oldProp, newProp, key) {
    // these keys are ignored from prop checking process
    if (key === "contextRect" || key === "measure" || key === "measureRef") {
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
  }; // If we made it here, we need to check if the "top-level"
  // props have changed (e.g. disableLibraryParam).


  var propsEqual = (0, _common.shallowEqual)(props, nextProps, customizer);
  return !propsEqual;
};

exports.__shouldComponentUpdate = __shouldComponentUpdate;

var BackgroundImpl = /*#__PURE__*/function (_React$Component) {
  _inherits(BackgroundImpl, _React$Component);

  var _super = _createSuper(BackgroundImpl);

  function BackgroundImpl(props) {
    _classCallCheck(this, BackgroundImpl);

    return _super.call(this, props);
  }

  _createClass(BackgroundImpl, [{
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

        var srcOptions = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, params), {}, {
          fit: "crop"
        }, imgixParams), disableLibraryParam ? {} : {
          ixlib: "react-".concat(_constants.PACKAGE_VERSION)
        }), {}, {
          width: width,
          height: height,
          dpr: dpr
        });

        return (0, _constructUrl.default)(rawSrc, srcOptions);
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

  return BackgroundImpl;
}(_react.default.Component);

exports.__BackgroundImpl = BackgroundImpl;
var Background = (0, _reactMeasure.withContentRect)("bounds")(BackgroundImpl);
exports.Background = Background;
//# sourceMappingURL=react-imgix-bg.js.map