"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickPopper = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _dom = require("../../lib/dom");

var _Popper = require("../Popper/Popper");

var _useExternRef = require("../../hooks/useExternRef");

var _useEventListener = require("../../hooks/useEventListener");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _usePatchChildrenRef3 = require("../../hooks/usePatchChildrenRef");

var _excluded = ["getRef", "content", "children", "onShownChange", "shown"];

var ClickPopper = function ClickPopper(_ref) {
  var getRef = _ref.getRef,
      content = _ref.content,
      children = _ref.children,
      onShownChange = _ref.onShownChange,
      _shown = _ref.shown,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _React$useState = React.useState(_shown || false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      computedShown = _React$useState2[0],
      setComputedShown = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      dropdownNode = _React$useState4[0],
      setPopperNode = _React$useState4[1];

  var shown = typeof _shown === "boolean" ? _shown : computedShown;

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var patchedPopperRef = (0, _useExternRef.useExternRef)(setPopperNode, getRef);

  var _usePatchChildrenRef = (0, _usePatchChildrenRef3.usePatchChildrenRef)(children),
      _usePatchChildrenRef2 = (0, _slicedToArray2.default)(_usePatchChildrenRef, 2),
      childRef = _usePatchChildrenRef2[0],
      child = _usePatchChildrenRef2[1];

  var setShown = function setShown(value) {
    if (typeof _shown !== "boolean") {
      setComputedShown(value);
    }

    typeof onShownChange === "function" && onShownChange(value);
  };

  (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", function (e) {
    var _childRef$current;

    if (dropdownNode && !((_childRef$current = childRef.current) !== null && _childRef$current !== void 0 && _childRef$current.contains(e.target)) && !dropdownNode.contains(e.target)) {
      setShown(false);
    }
  });
  var targetClickEvent = (0, _useEventListener.useEventListener)("click", function () {
    setShown(!shown);
  });
  React.useEffect(function () {
    if (childRef.current !== null) {
      targetClickEvent.add(childRef.current);
    }
  }, [childRef, targetClickEvent]);
  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, child, shown && (0, _jsxRuntime.createScopedElement)(_Popper.Popper, (0, _extends2.default)({}, restProps, {
    targetRef: childRef,
    getRef: patchedPopperRef
  }), content));
};

exports.ClickPopper = ClickPopper;
//# sourceMappingURL=ClickPopper.js.map