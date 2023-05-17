"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _dom = require("../../lib/dom");
var _Popper = require("../Popper/Popper");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _useTimeout = require("../../hooks/useTimeout");
var _useExternRef = require("../../hooks/useExternRef");
var _useEventListener = require("../../hooks/useEventListener");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePatchChildrenRef3 = require("../../hooks/usePatchChildrenRef");
var _excluded = ["action", "shown", "showDelay", "hideDelay", "offsetDistance", "content", "children", "style", "getRef", "onShownChange"];
/**
 * @see https://vkcom.github.io/VKUI/#/Dropdown
 *
 * TODO v5.0.0 Переименовать в `Popover` (см. https://github.com/VKCOM/VKUI/issues/2523)
 */
var Dropdown = function Dropdown(_ref) {
  var _ref$action = _ref.action,
    action = _ref$action === void 0 ? "click" : _ref$action,
    shownProp = _ref.shown,
    _ref$showDelay = _ref.showDelay,
    showDelay = _ref$showDelay === void 0 ? 150 : _ref$showDelay,
    _ref$hideDelay = _ref.hideDelay,
    hideDelay = _ref$hideDelay === void 0 ? 150 : _ref$hideDelay,
    _ref$offsetDistance = _ref.offsetDistance,
    offsetDistance = _ref$offsetDistance === void 0 ? 8 : _ref$offsetDistance,
    content = _ref.content,
    children = _ref.children,
    style = _ref.style,
    getRef = _ref.getRef,
    onShownChange = _ref.onShownChange,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var hoverable = action === "hover";
  var hovered = React.useRef(false);
  var _React$useState = React.useState(shownProp || false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    computedShown = _React$useState2[0],
    setComputedShown = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    dropdownNode = _React$useState4[0],
    setPopperNode = _React$useState4[1];

  // Reason: Typescript ругается на CSS Custom Properties в объекте
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  var styles = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
    "--popover-safe-zone-padding": "".concat(offsetDistance, "px")
  });
  var shown = typeof shownProp === "boolean" ? shownProp : computedShown;
  var patchedPopperRef = (0, _useExternRef.useExternRef)(setPopperNode, getRef);
  var _usePatchChildrenRef = (0, _usePatchChildrenRef3.usePatchChildrenRef)(children),
    _usePatchChildrenRef2 = (0, _slicedToArray2.default)(_usePatchChildrenRef, 2),
    childRef = _usePatchChildrenRef2[0],
    child = _usePatchChildrenRef2[1];
  var setShown = function setShown(value) {
    if (typeof shownProp !== "boolean") {
      setComputedShown(value);
    }
    typeof onShownChange === "function" && onShownChange(value);
  };
  var showTimeout = (0, _useTimeout.useTimeout)(function () {
    return setShown(true);
  }, showDelay);
  var hideTimeout = (0, _useTimeout.useTimeout)(function () {
    return setShown(false);
  }, hideDelay);
  var handleTargetEnter = function handleTargetEnter() {
    hovered.current = true;
    hideTimeout.clear();
    showTimeout.set();
  };
  var handleTargetClick = function handleTargetClick() {
    if (hovered.current && shown) {
      return;
    }
    setShown(!shown);
  };
  var handleTargetLeave = function handleTargetLeave() {
    hovered.current = false;
    showTimeout.clear();
    hideTimeout.set();
  };
  var handleContentKeyDownEscape = function handleContentKeyDownEscape() {
    setShown(false);
  };
  var handleOutsideClick = function handleOutsideClick(e) {
    var _childRef$current;
    if (dropdownNode && !((_childRef$current = childRef.current) !== null && _childRef$current !== void 0 && _childRef$current.contains(e.target)) && !dropdownNode.contains(e.target)) {
      setShown(false);
    }
  };
  (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", handleOutsideClick, {
    capture: true,
    passive: true
  });
  var targetEnterListener = (0, _useEventListener.useEventListener)("mouseenter", handleTargetEnter);
  var targetClickEvent = (0, _useEventListener.useEventListener)("click", handleTargetClick);
  var targetLeaveListener = (0, _useEventListener.useEventListener)("mouseleave", handleTargetLeave);
  React.useEffect(function () {
    if (!childRef.current) {
      return;
    }
    targetClickEvent.add(childRef.current);
    if (hoverable) {
      targetEnterListener.add(childRef.current);
      targetLeaveListener.add(childRef.current);
    }
  }, [childRef, hoverable, targetClickEvent, targetEnterListener, targetLeaveListener]);
  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, child, shown && (0, _jsxRuntime.createScopedElement)(_Popper.Popper, (0, _extends2.default)({}, restProps, {
    vkuiClass: "Dropdown",
    targetRef: childRef,
    getRef: patchedPopperRef,
    offsetDistance: offsetDistance,
    style: styles,
    renderContent: function renderContent(_ref2) {
      var className = _ref2.className;
      return (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, {
        vkuiClass: className,
        onClose: handleContentKeyDownEscape
      }, content);
    },
    onMouseOver: hoverable ? hideTimeout.clear : undefined,
    onMouseOut: hoverable ? handleTargetLeave : undefined
  })));
};
exports.Dropdown = Dropdown;
//# sourceMappingURL=Dropdown.js.map