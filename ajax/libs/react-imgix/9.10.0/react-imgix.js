"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.__SourceImpl = exports.__ReactImgixImpl = exports.__PictureImpl = exports.Source = exports.Picture = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
require("./array-findindex");
var _common = require("./common");
var _constants = require("./constants");
var _constructUrl = _interopRequireWildcard(require("./constructUrl"));
var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));
var _HOCs = require("./HOCs");
var _HOFs = require("./HOFs");
var _excluded = ["width", "w", "height", "h", "q"],
  _excluded2 = ["width", "w", "height", "h"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var NODE_ENV = process.env.NODE_ENV;
var buildKey = function buildKey(idx) {
  return "react-imgix-".concat(idx);
};
var defaultImgixParams = {
  auto: ["format"]
};
var defaultAttributeMap = {
  src: "src",
  srcSet: "srcSet",
  sizes: "sizes"
};
var noop = function noop() {};
var COMMON_PROP_TYPES = {
  className: _propTypes.default.string,
  onMounted: _propTypes.default.func,
  htmlAttributes: _propTypes.default.object,
  alt: _propTypes.default.string
};
var SHARED_IMGIX_AND_SOURCE_PROP_TYPES = _extends({}, COMMON_PROP_TYPES, {
  disableQualityByDPR: _propTypes.default.bool,
  disableSrcSet: _propTypes.default.bool,
  disableLibraryParam: _propTypes.default.bool,
  disablePathEncoding: _propTypes.default.bool,
  imgixParams: _propTypes.default.object,
  sizes: _propTypes.default.string,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  src: _propTypes.default.string.isRequired,
  srcSetOptions: _propTypes.default.shape({
    widths: _propTypes.default.arrayOf(_propTypes.default.number),
    widthTolerance: _propTypes.default.number,
    minWidth: _propTypes.default.number,
    maxWidth: _propTypes.default.number,
    devicePixelRatios: _propTypes.default.arrayOf(_propTypes.default.number)
  })
});
var REACT_IMGIX_PROP_TYPES = _extends({}, SHARED_IMGIX_AND_SOURCE_PROP_TYPES, {
  alt: _propTypes.default.string
});
var OVERSIZE_IMAGE_TOLERANCE = 500;
var performanceObserver;

/**
 * Validates that an aspect ratio is in the format w:h. If false is returned, the aspect ratio is in the wrong format.
 */
function aspectRatioIsValid(aspectRatio) {
  if (typeof aspectRatio !== "string") {
    return false;
  }
  return /^\d+(\.\d+)?:\d+(\.\d+)?$/.test(aspectRatio);
}
var setParentRef = function setParentRef(parentRef, el) {
  if (!parentRef) {
    return;
  }

  // assign ref based on if it's a callback vs object
  if (typeof parentRef === "function") {
    parentRef(el);
  } else {
    parentRef.current = el;
  }
};
function buildSrcSet(rawSrc) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _extractClientAndPath = (0, _constructUrl.extractClientAndPathComponents)(rawSrc),
    client = _extractClientAndPath.client,
    pathComponents = _extractClientAndPath.pathComponents;
  var compactedParams = (0, _constructUrl.compactParamKeys)(params);
  return client.buildSrcSet(pathComponents.join("/"), compactedParams, options);
}

/**
 * Build a imgix source url with parameters from a raw url
 */
function buildSrc(_ref) {
  var inputSrc = _ref.src,
    width = _ref.width,
    height = _ref.height,
    disableLibraryParam = _ref.disableLibraryParam,
    disableSrcSet = _ref.disableSrcSet,
    disablePathEncoding = _ref.disablePathEncoding,
    imgixParams = _ref.imgixParams,
    disableQualityByDPR = _ref.disableQualityByDPR,
    srcSetOptions = _ref.srcSetOptions;
  var fixedSize = width != null || height != null;
  var _extractQueryParams = (0, _extractQueryParams3.default)(inputSrc),
    _extractQueryParams2 = _slicedToArray(_extractQueryParams, 2),
    rawSrc = _extractQueryParams2[0],
    params = _extractQueryParams2[1];
  var srcImgixParams = _extends({}, params, imgixParams, disableLibraryParam ? {} : {
    ixlib: "react-".concat(_constants.PACKAGE_VERSION)
  }, fixedSize && height ? {
    height: height
  } : {}, fixedSize && width ? {
    width: width
  } : {});
  var srcOptions = {
    disablePathEncoding: disablePathEncoding
  };
  var src = (0, _constructUrl.default)(rawSrc, srcImgixParams, srcOptions);
  var srcSet;
  if (disableSrcSet) {
    srcSet = src;
  } else {
    var sharedSrcSetOptions = _extends({}, srcSetOptions, {
      disablePathEncoding: disablePathEncoding
    });
    if (fixedSize) {
      var _width = srcImgixParams.width,
        w = srcImgixParams.w,
        _height = srcImgixParams.height,
        h = srcImgixParams.h,
        q = srcImgixParams.q,
        urlParams = _objectWithoutProperties(srcImgixParams, _excluded);
      if (q) {
        urlParams["q"] = q;
      }
      var finalWidth = _width || w;
      var finalHeight = _height || h;
      if (finalWidth) {
        urlParams["w"] = finalWidth;
      }
      if (finalHeight) {
        urlParams["h"] = finalHeight;
      }
      srcSet = buildSrcSet(rawSrc, urlParams, _extends({
        disableVariableQuality: disableQualityByDPR
      }, sharedSrcSetOptions));
    } else {
      var _width2 = srcImgixParams.width,
        _w = srcImgixParams.w,
        _height2 = srcImgixParams.height,
        _h = srcImgixParams.h,
        _urlParams = _objectWithoutProperties(srcImgixParams, _excluded2);
      var aspectRatio = imgixParams.ar;
      var showARWarning = aspectRatio != null && aspectRatioIsValid(aspectRatio) === false;
      srcSet = buildSrcSet(rawSrc, _urlParams, sharedSrcSetOptions);
      if (NODE_ENV !== "production" && showARWarning && _common.config.warnings.invalidARFormat) {
        console.warn("[Imgix] The aspect ratio passed (\"".concat(aspectRatio, "\") is not in the correct format. The correct format is \"W:H\"."));
      }
    }
  }
  return {
    src: src,
    srcSet: srcSet
  };
}

/**
 * Use the PerfomanceObser API to warn if an LCP element is loaded lazily.
 */
function watchForLazyLCP(imgRef) {
  if (!performanceObserver && typeof window !== 'undefined' && window.PerformanceObserver) {
    performanceObserver = new PerformanceObserver(function (entryList) {
      var _lcpCandidate$element;
      var entries = entryList.getEntries();
      if (entries.length === 0) {
        return;
      }

      // The most recent LCP entry is the only one that can be the real LCP element.
      var lcpCandidate = entries[entries.length - 1];
      if (((_lcpCandidate$element = lcpCandidate.element) === null || _lcpCandidate$element === void 0 ? void 0 : _lcpCandidate$element.getAttribute("loading")) === "lazy") {
        console.warn("An image with URL ".concat(imgRef.src, " was detected as a possible LCP element (https://web.dev/lcp) ") + "and also has 'loading=\"lazy\"'. This can have a significant negative impact on page loading performance. " + "Lazy loading is not recommended for images which may render in the initial viewport.");
      }
    });
    performanceObserver.observe({
      type: 'largest-contentful-paint',
      buffered: true
    });
  }
}

/**
 * Once the image is loaded, warn if it's intrinsic size is much larger than its rendered size.
 */
function checkImageSize(imgRef) {
  var renderedWidth = imgRef.clientWidth;
  var renderedHeight = imgRef.clientHeight;
  var intrinsicWidth = imgRef.naturalWidth;
  var intrinsicHeight = imgRef.naturalHeight;
  if (intrinsicWidth > renderedWidth + OVERSIZE_IMAGE_TOLERANCE || intrinsicHeight > renderedHeight + OVERSIZE_IMAGE_TOLERANCE) {
    console.warn("An image with URL ".concat(imgRef.src, " was rendered with dimensions significantly smaller than intrinsic size, ") + "which can slow down page loading. This may be caused by a missing or inaccurate \"sizes\" property. " + "Rendered size: ".concat(renderedWidth, "x").concat(renderedHeight, ". Intrinsic size: ").concat(intrinsicWidth, "x").concat(intrinsicHeight, "."));
  }
}

/**
 * Initializes listeners for performance-related image warnings
 */
function doPerformanceChecksOnLoad(imgRef) {
  // Check image size on load
  if (_common.config.warnings.oversizeImage) {
    if (imgRef.complete) {
      checkImageSize(imgRef);
    } else {
      imgRef.addEventListener('load', function () {
        checkImageSize(imgRef);
      });
    }
  }
  if (_common.config.warnings.lazyLCP) {
    watchForLazyLCP(imgRef);
  }
}

/**
 * Combines default imgix params with custom imgix params to make a imgix params config object
 */
function imgixParams(props) {
  var params = _extends({}, defaultImgixParams, props.imgixParams);
  return _extends({}, params);
}

/**
 * React component used to render <img> elements with Imgix
 */
var ReactImgix = exports.__ReactImgixImpl = /*#__PURE__*/function (_Component) {
  function ReactImgix(props) {
    var _this;
    _classCallCheck(this, ReactImgix);
    _this = _callSuper(this, ReactImgix, [props]);
    _this.imgRef = null;
    return _this;
  }
  _inherits(ReactImgix, _Component);
  return _createClass(ReactImgix, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (NODE_ENV === 'development' && this.imgRef) {
        doPerformanceChecksOnLoad(this.imgRef);
      }
      this.props.onMounted(this.imgRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$htmlAttri,
        _this$props$htmlAttri2,
        _this$props$htmlAttri3,
        _this$props$htmlAttri4,
        _this$props$htmlAttri5,
        _this2 = this;
      var _this$props = this.props,
        disableSrcSet = _this$props.disableSrcSet,
        width = _this$props.width,
        height = _this$props.height;

      // Pre-render checks
      if (NODE_ENV !== "production" && _common.config.warnings.sizesAttribute) {
        if (this.props.width == null && this.props.height == null && this.props.sizes == null && !this.props._inPicture) {
          console.warn("If width and height are not set, a sizes attribute should be passed.");
        }
      }
      var _buildSrc = buildSrc(_extends({}, this.props, {
          type: "img",
          imgixParams: imgixParams(this.props)
        })),
        src = _buildSrc.src,
        srcSet = _buildSrc.srcSet;
      var attributeConfig = _extends({}, defaultAttributeMap, this.props.attributeConfig);
      var fixedSize = !!((width || (_this$props$htmlAttri = this.props.htmlAttributes) !== null && _this$props$htmlAttri !== void 0 && _this$props$htmlAttri.width) && (height || (_this$props$htmlAttri2 = this.props.htmlAttributes) !== null && _this$props$htmlAttri2 !== void 0 && _this$props$htmlAttri2.height));
      var adjustedSizes = this.props.sizes;
      if (this.props.sizes && ((_this$props$htmlAttri3 = this.props.htmlAttributes) === null || _this$props$htmlAttri3 === void 0 ? void 0 : _this$props$htmlAttri3.loading) === "lazy" && !fixedSize) {
        var _ref2;
        adjustedSizes = (_ref2 = "auto, " + adjustedSizes) !== null && _ref2 !== void 0 ? _ref2 : "";
      }
      var childProps = _extends({}, this.props.htmlAttributes, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, attributeConfig.sizes, adjustedSizes), "className", this.props.className), "width", width <= 1 ? null : width !== null && width !== void 0 ? width : (_this$props$htmlAttri4 = this.props.htmlAttributes) === null || _this$props$htmlAttri4 === void 0 ? void 0 : _this$props$htmlAttri4.width), "height", height <= 1 ? null : height !== null && height !== void 0 ? height : (_this$props$htmlAttri5 = this.props.htmlAttributes) === null || _this$props$htmlAttri5 === void 0 ? void 0 : _this$props$htmlAttri5.height), attributeConfig.src, src), "ref", function ref(el) {
        _this2.imgRef = el;
        if (_this2.props.htmlAttributes !== undefined && "ref" in _this2.props.htmlAttributes) {
          setParentRef(_this2.props.htmlAttributes.ref, _this2.imgRef);
        }
      }));
      if (!disableSrcSet) {
        childProps[attributeConfig.srcSet] = srcSet;
      }
      if (this.props.alt) {
        childProps.alt = this.props.alt;
      }
      return /*#__PURE__*/_react.default.createElement("img", childProps);
    }
  }]);
}(_react.Component);
_defineProperty(ReactImgix, "propTypes", _extends({}, REACT_IMGIX_PROP_TYPES));
_defineProperty(ReactImgix, "defaultProps", {
  disableSrcSet: false,
  onMounted: noop
});
ReactImgix.displayName = "ReactImgix";

/**
 * React component used to render <picture> elements with Imgix
 */
var PictureImpl = exports.__PictureImpl = /*#__PURE__*/function (_Component2) {
  function PictureImpl(props) {
    var _this3;
    _classCallCheck(this, PictureImpl);
    _this3 = _callSuper(this, PictureImpl, [props]);
    _this3.pictureRef = null;
    return _this3;
  }
  _inherits(PictureImpl, _Component2);
  return _createClass(PictureImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMounted(this.pictureRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var children = this.props.children;

      // make sure all of our children have key set, otherwise we get react warnings
      var _children = _react.default.Children.map(children, function (child, idx) {
        var _child$type;
        var childIsReactImgix = ((_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.name) === "mergeComponentPropsHOFInner";
        return /*#__PURE__*/_react.default.cloneElement(child, _extends({
          key: buildKey(idx)
        },
        // This prevents props._inPicture being set on other children if
        // they're passed, such as an <img> component, which will cause a
        // React error
        childIsReactImgix && {
          _inPicture: true
        }));
      }) || [];

      /*
      We need to make sure an <img /> or <Imgix /> is the last child so we look for one in children
        a. if we find one, move it to the last entry if it's not already there
        b. if we don't find one, warn the user as they probably want to pass one.
      */

      // look for an <img> or <ReactImgix type='img'> - at the bare minimum we have to have a single <img> element or else it will not work.
      var imgIdx = _children.findIndex(function (c) {
        return c.type === "img" || c.type === ReactImgix || c.type === ReactImgixWrapped;
      });
      if (imgIdx === -1 && _common.config.warnings.fallbackImage) {
        console.warn("No fallback <img /> or <Imgix /> found in the children of a <picture> component. A fallback image should be passed to ensure the image renders correctly at all dimensions.");
      } else if (imgIdx !== _children.length - 1) {
        // found one, need to move it to the end
        _children.push(_children.splice(imgIdx, 1)[0]);
      }
      return /*#__PURE__*/_react.default.createElement("picture", {
        ref: function ref(el) {
          return _this4.pictureRef = el;
        },
        children: _children
      });
    }
  }]);
}(_react.Component);
_defineProperty(PictureImpl, "propTypes", _extends({}, COMMON_PROP_TYPES, {
  children: _propTypes.default.any
}));
_defineProperty(PictureImpl, "defaultProps", {
  onMounted: noop
});
PictureImpl.displayName = "ReactImgixPicture";

/**
 * React component used to render <source> elements with Imgix
 */
var SourceImpl = exports.__SourceImpl = /*#__PURE__*/function (_Component3) {
  function SourceImpl(props) {
    var _this5;
    _classCallCheck(this, SourceImpl);
    _this5 = _callSuper(this, SourceImpl, [props]);
    _this5.sourceRef = null;
    return _this5;
  }
  _inherits(SourceImpl, _Component3);
  return _createClass(SourceImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMounted(this.sourceRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$htmlAttri6,
        _this$props$htmlAttri7,
        _this6 = this;
      var _this$props2 = this.props,
        disableSrcSet = _this$props2.disableSrcSet,
        width = _this$props2.width,
        height = _this$props2.height;
      var _buildSrc2 = buildSrc(_extends({}, this.props, {
          type: "source",
          imgixParams: imgixParams(this.props)
        })),
        src = _buildSrc2.src,
        srcSet = _buildSrc2.srcSet;
      var attributeConfig = _extends({}, defaultAttributeMap, this.props.attributeConfig);
      var childProps = _extends({}, this.props.htmlAttributes, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, attributeConfig.sizes, this.props.sizes), "className", this.props.className), "width", width <= 1 ? null : width !== null && width !== void 0 ? width : (_this$props$htmlAttri6 = this.props.htmlAttributes) === null || _this$props$htmlAttri6 === void 0 ? void 0 : _this$props$htmlAttri6.width), "height", height <= 1 ? null : height !== null && height !== void 0 ? height : (_this$props$htmlAttri7 = this.props.htmlAttributes) === null || _this$props$htmlAttri7 === void 0 ? void 0 : _this$props$htmlAttri7.height), "ref", function ref(el) {
        _this6.sourceRef = el;
        if (_this6.props.htmlAttributes !== undefined && "ref" in _this6.props.htmlAttributes) {
          setParentRef(_this6.props.htmlAttributes.ref, _this6.sourceRef);
        }
      }));

      // inside of a <picture> element a <source> element ignores its src
      // attribute in favor of srcSet so we set that with either an actual
      // srcSet or a single src
      if (disableSrcSet) {
        childProps[attributeConfig.srcSet] = src;
      } else {
        childProps[attributeConfig.srcSet] = "".concat(srcSet);
      }
      // for now we'll take media from htmlAttributes which isn't ideal because
      //   a) this isn't an <img>
      //   b) passing objects as props means that react will always rerender
      //      since objects dont respond correctly to ===

      return /*#__PURE__*/_react.default.createElement("source", childProps);
    }
  }]);
}(_react.Component);
_defineProperty(SourceImpl, "propTypes", _extends({}, SHARED_IMGIX_AND_SOURCE_PROP_TYPES));
_defineProperty(SourceImpl, "defaultProps", {
  disableSrcSet: false,
  onMounted: noop
});
SourceImpl.displayName = "ReactImgixSource";
var ReactImgixWrapped = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(ReactImgix)));
var Picture = exports.Picture = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(PictureImpl)));
var Source = exports.Source = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(SourceImpl)));
var _default = exports.default = ReactImgixWrapped;
//# sourceMappingURL=react-imgix.js.map