"use strict";

exports.__esModule = true;
exports.withQuicklink = void 0;
var _react = _interopRequireWildcard(require("react"));
var _routeManifest = _interopRequireDefault(require("route-manifest"));
var _quicklink = require("./quicklink.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Copyright 2019-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var useIntersect = function useIntersect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$root = _ref.root,
    root = _ref$root === void 0 ? null : _ref$root,
    rootMargin = _ref.rootMargin,
    _ref$threshold = _ref.threshold,
    threshold = _ref$threshold === void 0 ? 0 : _ref$threshold;
  var _useState = (0, _react.useState)({}),
    entry = _useState[0],
    updateEntry = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    node = _useState2[0],
    setNode = _useState2[1];
  var observer = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(function (_ref2) {
      var entry = _ref2[0];
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
var prefetchChunks = function prefetchChunks(entry, prefetchHandler, accessor) {
  if (accessor === void 0) {
    accessor = __defaultAccessor;
  }
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
var withQuicklink = exports.withQuicklink = function withQuicklink(Component, options) {
  if (options === void 0) {
    options = {};
  }
  // eslint-disable-next-line react/display-name
  return function (props) {
    var _useIntersect = useIntersect({
        root: document.body.parentElement
      }),
      ref = _useIntersect[0],
      entry = _useIntersect[1];
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
