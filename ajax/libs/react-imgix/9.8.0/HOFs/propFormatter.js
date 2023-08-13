"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatProps = exports.collapseImgixParams = void 0;
exports.formatSrc = formatSrc;
exports.processPropsHOF = void 0;
var React = _interopRequireWildcard(require("react"));
var _constants = require("./constants");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Creates a 1-step, or complete, URL from `domain` and `src` Strings.
 *
 * - First, the function checks if src has a defined `domain`. If it does, it
 * checks to see if `src` has a scheme, and prepends "http" or "https" as needed
 * - Otherwise, formatSrc formats `domain` and `src` Strings.
 *   - First it strips the two strings of the  leading and `/` or trailing `/`
 *     slash characters.
 *   - Then, it joins the two strings on a `/` character. IE,
 *    `strippedDomain + "/" + strippedSrc`.
 *   - If `domain` String argument `null` or `undefined`, the function returns
 *    the original `src` String.
 *
 * @param {String} src - URL that is either 1-step or 2-step
 * @param {String} domain - Domain string, optional
 * @returns 1-step, or complete, URL String. Ex, _assets.ix.net/foo/bar.jpg_
 */
function formatSrc(src, domain) {
  var useHTTPS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // ignore if already has protocol
  if (src.indexOf("://") !== -1) {
    return src;
  } else {
    // prepend domain if defined
    if (domain == null) {
      return src;
    }
    var strippedDomain = domain ? domain.replace(/^\/|\/$/g, "") : "";
    var strippedSrc = src.replace(/^\/|\/$/g, "");
    var prefix = useHTTPS ? "https://" : "http://";
    return prefix + strippedDomain + "/" + strippedSrc;
  }
}

/**
 * A function that formats the following values in the props Object:
 *
 * - `width`: if undefined or negative gets set to `undefined`.
 * - `height`: if undefined or negative gets set to `undefined`.
 * - `src`: concatenated to `domain` if `src` defined and has no domain.
 *
 * @param {Object} props
 * @returns A formatted `props` Object.
 */
var formatProps = function formatProps(props) {
  var width = !props.width || props.width <= 1 ? undefined : props.width;
  var height = !props.height || props.height <= 1 ? undefined : props.height;
  var src = props.src ? formatSrc(props.src, props.domain, props.useHttps) : undefined;
  return _extends({}, props, {
    width: width,
    height: height,
    src: src
  });
};

/**
 * Function that shortens params keys according to the imgix spec.
 * @param {Object} params - imgixParams object
 * @returns imgixParams object with shortened keys
 * @see https://www.imgix.com/docs/reference
 */
exports.formatProps = formatProps;
var collapseImgixParams = function collapseImgixParams(params) {
  if (params == null) {
    return params;
  }
  var compactedParams = {};
  for (var _i = 0, _Object$entries = _objectEntries(params); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      k = _Object$entries$_i[0],
      v = _Object$entries$_i[1];
    if (_constants.PARAMS_EXP_MAP[k]) {
      compactedParams[_constants.PARAMS_EXP_MAP[k]] = v;
    } else {
      compactedParams[k] = v;
    }
  }
  return compactedParams;
};

/**
 * `processPropsHOF` takes a Component's props and formats them to adhere to the
 * ImgixClient's specifications.
 *
 * @param {React.Element<typeof Component>} Component - A react component with
 * defined `props`.
 * @returns A React Component who's `props` have been formatted and
 * `imgixParams` have been collapsed.
 */
exports.collapseImgixParams = collapseImgixParams;
var processPropsHOF = function processPropsHOF(Component) {
  return function (props) {
    var formattedProps = formatProps(props);
    var formattedImgixParams = collapseImgixParams(formattedProps.imgixParams);
    return /*#__PURE__*/React.createElement(Component, _extends({}, formattedProps, {
      imgixParams: formattedImgixParams
    }));
  };
};
exports.processPropsHOF = processPropsHOF;
//# sourceMappingURL=propFormatter.js.map