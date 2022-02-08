"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__PictureImpl = exports.__SourceImpl = exports.Source = exports.Picture = exports.__ReactImgixImpl = exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

require("./array-findindex");

var _common = require("./common");

var _constants = require("./constants");

var _constructUrl = _interopRequireWildcard(require("./constructUrl"));

var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));

var _HOCs = require("./HOCs");

var _HOFs = require("./HOFs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  } // assign ref based on if it's a callback vs object


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
      imgixParams = _ref.imgixParams,
      disableQualityByDPR = _ref.disableQualityByDPR,
      srcSetOptions = _ref.srcSetOptions;
  var fixedSize = width != null || height != null;

  var _extractQueryParams = (0, _extractQueryParams3.default)(inputSrc),
      _extractQueryParams2 = _slicedToArray(_extractQueryParams, 2),
      rawSrc = _extractQueryParams2[0],
      params = _extractQueryParams2[1];

  var srcOptions = _extends({}, params, imgixParams, disableLibraryParam ? {} : {
    ixlib: "react-".concat(_constants.PACKAGE_VERSION)
  }, fixedSize && height ? {
    height: height
  } : {}, fixedSize && width ? {
    width: width
  } : {});

  var src = (0, _constructUrl.default)(rawSrc, srcOptions);
  var srcSet;

  if (disableSrcSet) {
    srcSet = src;
  } else {
    if (fixedSize) {
      var _width = srcOptions.width,
          w = srcOptions.w,
          _height = srcOptions.height,
          h = srcOptions.h,
          q = srcOptions.q,
          urlParams = _objectWithoutProperties(srcOptions, ["width", "w", "height", "h", "q"]);

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

      srcSet = buildSrcSet(rawSrc, urlParams, _objectSpread({
        disableVariableQuality: disableQualityByDPR
      }, srcSetOptions));
    } else {
      var _width2 = srcOptions.width,
          _w = srcOptions.w,
          _height2 = srcOptions.height,
          _h = srcOptions.h,
          _urlParams = _objectWithoutProperties(srcOptions, ["width", "w", "height", "h"]);

      var aspectRatio = imgixParams.ar;
      var showARWarning = aspectRatio != null && aspectRatioIsValid(aspectRatio) === false;
      srcSet = buildSrcSet(rawSrc, _urlParams, srcSetOptions);

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
 * Combines default imgix params with custom imgix params to make a imgix params config object
 */


function imgixParams(props) {
  var params = _extends({}, defaultImgixParams, props.imgixParams);

  return _extends({}, params);
}
/**
 * React component used to render <img> elements with Imgix
 */


var ReactImgix = /*#__PURE__*/function (_Component) {
  _inherits(ReactImgix, _Component);

  var _super = _createSuper(ReactImgix);

  function ReactImgix(props) {
    var _this;

    _classCallCheck(this, ReactImgix);

    _this = _super.call(this, props);
    _this.imgRef = null;
    return _this;
  }

  _createClass(ReactImgix, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMounted(this.imgRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
          _extends2;

      var _this$props = this.props,
          disableSrcSet = _this$props.disableSrcSet,
          type = _this$props.type,
          width = _this$props.width,
          height = _this$props.height; // Pre-render checks

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

      var childProps = _extends({}, this.props.htmlAttributes, (_extends2 = {}, _defineProperty(_extends2, attributeConfig.sizes, this.props.sizes), _defineProperty(_extends2, "className", this.props.className), _defineProperty(_extends2, "width", width <= 1 ? null : width), _defineProperty(_extends2, "height", height <= 1 ? null : height), _defineProperty(_extends2, attributeConfig.src, src), _defineProperty(_extends2, "ref", function ref(el) {
        _this2.imgRef = el;

        if (_this2.props.htmlAttributes !== undefined && "ref" in _this2.props.htmlAttributes) {
          setParentRef(_this2.props.htmlAttributes.ref, _this2.imgRef);
        }
      }), _extends2));

      if (!disableSrcSet) {
        childProps[attributeConfig.srcSet] = srcSet;
      }

      if (this.props.alt) {
        childProps.alt = this.props.alt;
      }

      return /*#__PURE__*/_react.default.createElement("img", childProps);
    }
  }]);

  return ReactImgix;
}(_react.Component);

exports.__ReactImgixImpl = ReactImgix;

_defineProperty(ReactImgix, "propTypes", _extends({}, REACT_IMGIX_PROP_TYPES));

_defineProperty(ReactImgix, "defaultProps", {
  disableSrcSet: false,
  onMounted: noop
});

ReactImgix.displayName = "ReactImgix";
/**
 * React component used to render <picture> elements with Imgix
 */

var PictureImpl = /*#__PURE__*/function (_Component2) {
  _inherits(PictureImpl, _Component2);

  var _super2 = _createSuper(PictureImpl);

  function PictureImpl(props) {
    var _this3;

    _classCallCheck(this, PictureImpl);

    _this3 = _super2.call(this, props);
    _this3.pictureRef = null;
    return _this3;
  }

  _createClass(PictureImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMounted(this.pictureRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var children = this.props.children; // make sure all of our children have key set, otherwise we get react warnings

      var _children = _react.default.Children.map(children, function (child, idx) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          key: buildKey(idx),
          _inPicture: true
        });
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

  return PictureImpl;
}(_react.Component);

exports.__PictureImpl = PictureImpl;

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

var SourceImpl = /*#__PURE__*/function (_Component3) {
  _inherits(SourceImpl, _Component3);

  var _super3 = _createSuper(SourceImpl);

  function SourceImpl(props) {
    var _this5;

    _classCallCheck(this, SourceImpl);

    _this5 = _super3.call(this, props);
    _this5.sourceRef = null;
    return _this5;
  }

  _createClass(SourceImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMounted(this.sourceRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this,
          _extends3;

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

      var childProps = _extends({}, this.props.htmlAttributes, (_extends3 = {}, _defineProperty(_extends3, attributeConfig.sizes, this.props.sizes), _defineProperty(_extends3, "className", this.props.className), _defineProperty(_extends3, "width", width <= 1 ? null : width), _defineProperty(_extends3, "height", height <= 1 ? null : height), _defineProperty(_extends3, "ref", function ref(el) {
        _this6.sourceRef = el;

        if (_this6.props.htmlAttributes !== undefined && "ref" in _this6.props.htmlAttributes) {
          setParentRef(_this6.props.htmlAttributes.ref, _this6.sourceRef);
        }
      }), _extends3)); // inside of a <picture> element a <source> element ignores its src
      // attribute in favor of srcSet so we set that with either an actual
      // srcSet or a single src


      if (disableSrcSet) {
        childProps[attributeConfig.srcSet] = src;
      } else {
        childProps[attributeConfig.srcSet] = "".concat(srcSet);
      } // for now we'll take media from htmlAttributes which isn't ideal because
      //   a) this isn't an <img>
      //   b) passing objects as props means that react will always rerender
      //      since objects dont respond correctly to ===


      return /*#__PURE__*/_react.default.createElement("source", childProps);
    }
  }]);

  return SourceImpl;
}(_react.Component);

exports.__SourceImpl = SourceImpl;

_defineProperty(SourceImpl, "propTypes", _extends({}, SHARED_IMGIX_AND_SOURCE_PROP_TYPES));

_defineProperty(SourceImpl, "defaultProps", {
  disableSrcSet: false,
  onMounted: noop
});

SourceImpl.displayName = "ReactImgixSource";
var ReactImgixWrapped = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(ReactImgix)));
var Picture = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(PictureImpl)));
exports.Picture = Picture;
var Source = (0, _HOFs.mergeComponentPropsHOF)((0, _HOFs.processPropsHOF)((0, _HOCs.ShouldComponentUpdateHOC)(SourceImpl)));
exports.Source = Source;
var _default = ReactImgixWrapped;
exports.default = _default;
//# sourceMappingURL=react-imgix.js.map