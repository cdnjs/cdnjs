"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withQuicklink = void 0;

var _react = _interopRequireWildcard(require("react"));

var _routeManifest = _interopRequireDefault(require("route-manifest"));

var _quicklink = require("./quicklink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useIntersect = function useIntersect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$root = _ref.root,
      root = _ref$root === void 0 ? null : _ref$root,
      rootMargin = _ref.rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0 : _ref$threshold;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      entry = _useState2[0],
      updateEntry = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      node = _useState4[0],
      setNode = _useState4[1];

  var observer = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          entry = _ref3[0];

      return updateEntry(entry);
    }, {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    });
    var currentObserver = observer.current;
    if (node) currentObserver.observe(node);
    return function () {
      return currentObserver.disconnect();
    };
  }, [node, root, rootMargin, threshold]);
  return [setNode, entry];
};

var __defaultAccessor = function __defaultAccessor(mix) {
  return mix && mix.href || mix || '';
};

var prefetchChunks = function prefetchChunks(entry, prefetchHandler) {
  var accessor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __defaultAccessor;

  var _rmanifest = (0, _routeManifest["default"])(window.__rmanifest, entry.pathname),
      files = _rmanifest.files;

  var chunkURLs = files.map(accessor).filter(Boolean);

  if (chunkURLs.length) {
    prefetchHandler(chunkURLs);
  } else {
    // also prefetch regular links in-viewport
    prefetchHandler(entry.href);
  }
};

var withQuicklink = function withQuicklink(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (props) {
    var _useIntersect = useIntersect({
      root: document.body.parentElement
    }),
        _useIntersect2 = _slicedToArray(_useIntersect, 2),
        ref = _useIntersect2[0],
        entry = _useIntersect2[1];

    var intersectionRatio = entry.intersectionRatio;
    (0, _react.useEffect)(function () {
      options.prefetchChunks = prefetchChunks;

      if (intersectionRatio > 0) {
        (0, _quicklink.listen)(options);
      }
    }, [intersectionRatio]);
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: ref
    }, /*#__PURE__*/_react["default"].createElement(Component, props));
  };
};

exports.withQuicklink = withQuicklink;

//# sourceMappingURL=hoc.js.map