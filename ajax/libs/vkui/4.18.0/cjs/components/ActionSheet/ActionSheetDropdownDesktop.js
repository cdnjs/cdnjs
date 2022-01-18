"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdownDesktop = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _dom = require("../../lib/dom");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _warnOnce = require("../../lib/warnOnce");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useEventListener = require("../../hooks/useEventListener");

var _excluded = ["children", "toggleRef", "closing", "popupDirection", "onClose"];
var warn = (0, _warnOnce.warnOnce)('ActionSheet');

function getEl(ref) {
  return ref && 'current' in ref ? ref.current : ref;
}

var ActionSheetDropdownDesktop = function ActionSheetDropdownDesktop(_ref) {
  var children = _ref.children,
      toggleRef = _ref.toggleRef,
      closing = _ref.closing,
      popupDirection = _ref.popupDirection,
      onClose = _ref.onClose,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window,
      document = _useDOM.document;

  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var elementRef = React.useRef();

  var _React$useState = React.useState({
    left: 0,
    top: 0,
    opacity: 0,
    pointerEvents: 'none'
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      dropdownStyles = _React$useState2[0],
      setDropdownStyles = _React$useState2[1];

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    var toggleEl = getEl(toggleRef);

    if (!toggleEl) {
      if (process.env.NODE_ENV === 'development') {
        warn('toggleRef not passed');
      }

      return;
    }

    var toggleRect = toggleEl.getBoundingClientRect();
    var elementRect = elementRef.current.getBoundingClientRect();
    var isTop = popupDirection === 'top' || typeof popupDirection === 'function' && popupDirection(elementRef) === 'top';
    setDropdownStyles({
      left: toggleRect.left + toggleRect.width - elementRect.width + window.pageXOffset,
      top: toggleRect.top + window.pageYOffset + (isTop ? -elementRect.height : toggleRect.height)
    });
  }, [toggleRef]);
  var bodyClickListener = (0, _useEventListener.useEventListener)('click', function (e) {
    var dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;

    if (dropdownElement && !dropdownElement.contains(e.target)) {
      onClose();
    }
  });
  React.useEffect(function () {
    setTimeout(function () {
      bodyClickListener.add(document.body);
    });
  }, []);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: elementRef,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: dropdownStyles,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('ActionSheet', platform), 'ActionSheet--desktop', {
      'ActionSheet--closing': closing
    }, "ActionSheet--sizeY-".concat(sizeY))
  }), children);
};

exports.ActionSheetDropdownDesktop = ActionSheetDropdownDesktop;
//# sourceMappingURL=ActionSheetDropdownDesktop.js.map