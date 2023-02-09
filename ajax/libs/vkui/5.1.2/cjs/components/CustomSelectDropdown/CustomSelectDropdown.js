"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelectDropdown = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/createForOfIteratorHelper"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _CustomScrollView = require("../CustomScrollView/CustomScrollView");
var _vkjs = require("@vkontakte/vkjs");
var _Popper = require("../Popper/Popper");
var _Spinner = require("../Spinner/Spinner");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _excluded = ["children", "targetRef", "scrollBoxRef", "placement", "fetching", "onPlacementChange", "offsetDistance", "sameWidth", "forcePortal", "autoHideScrollbar", "autoHideScrollbarDelay", "observableRefs", "className"];
var calcIsTop = function calcIsTop(placement) {
  return placement === null || placement === void 0 ? void 0 : placement.includes('top');
};
function getObserverModifier(element) {
  return {
    name: 'customSelectChildrenChange',
    enabled: true,
    phase: 'main',
    fn: _vkjs.noop,
    effect: function effect(_ref) {
      var instance = _ref.instance;
      var observer = new MutationObserver(instance.forceUpdate);
      observer.observe(element, {
        childList: true,
        subtree: true
      });
      return function () {
        observer.disconnect();
      };
    }
  };
}
var CustomSelectDropdown = function CustomSelectDropdown(_ref2) {
  var children = _ref2.children,
    targetRef = _ref2.targetRef,
    scrollBoxRef = _ref2.scrollBoxRef,
    placement = _ref2.placement,
    fetching = _ref2.fetching,
    parentOnPlacementChange = _ref2.onPlacementChange,
    _ref2$offsetDistance = _ref2.offsetDistance,
    offsetDistance = _ref2$offsetDistance === void 0 ? 0 : _ref2$offsetDistance,
    _ref2$sameWidth = _ref2.sameWidth,
    sameWidth = _ref2$sameWidth === void 0 ? true : _ref2$sameWidth,
    _ref2$forcePortal = _ref2.forcePortal,
    forcePortal = _ref2$forcePortal === void 0 ? true : _ref2$forcePortal,
    autoHideScrollbar = _ref2.autoHideScrollbar,
    autoHideScrollbarDelay = _ref2.autoHideScrollbarDelay,
    observableRefs = _ref2.observableRefs,
    className = _ref2.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var _React$useState = React.useState(function () {
      return calcIsTop(placement);
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isTop = _React$useState2[0],
    setIsTop = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    customModifiers = _React$useState4[0],
    setCustomModifiers = _React$useState4[1];
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (!observableRefs) {
      return;
    }
    var customModifiers = [];
    if (Array.isArray(observableRefs)) {
      var _iterator = (0, _createForOfIteratorHelper2.default)(observableRefs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ref = _step.value;
          if (ref !== null && ref !== void 0 && ref.current) {
            customModifiers.push(getObserverModifier(ref.current));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (observableRefs.current) {
      customModifiers.push(getObserverModifier(observableRefs.current));
    }
    setCustomModifiers(customModifiers);
  }, [observableRefs]);
  var onPlacementChange = React.useCallback(function (_ref3) {
    var placement = _ref3.placement;
    setIsTop(calcIsTop(placement));
    parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
  }, [parentOnPlacementChange, setIsTop]);
  return /*#__PURE__*/React.createElement(_Popper.Popper, (0, _extends2.default)({
    targetRef: targetRef,
    offsetDistance: offsetDistance,
    sameWidth: sameWidth,
    onPlacementChange: onPlacementChange,
    placement: placement,
    className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && "vkuiCustomSelectDropdown--wide", className),
    forcePortal: forcePortal,
    customModifiers: customModifiers
  }, restProps), /*#__PURE__*/React.createElement(_CustomScrollView.CustomScrollView, {
    boxRef: scrollBoxRef,
    className: "vkuiCustomSelectDropdown__in",
    autoHideScrollbar: autoHideScrollbar,
    autoHideScrollbarDelay: autoHideScrollbarDelay
  }, fetching ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectDropdown__fetching"
  }, /*#__PURE__*/React.createElement(_Spinner.Spinner, {
    size: "small"
  })) : children));
};
exports.CustomSelectDropdown = CustomSelectDropdown;
//# sourceMappingURL=CustomSelectDropdown.js.map