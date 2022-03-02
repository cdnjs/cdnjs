"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Removable = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _useExternRef = require("../../hooks/useExternRef");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _dom = require("../../lib/dom");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _excluded = ["getRootRef", "children", "onRemove", "removePlaceholder", "align"];

var RemovableIos = function RemovableIos(_ref) {
  var onRemove = _ref.onRemove,
      removePlaceholder = _ref.removePlaceholder,
      removePlaceholderString = _ref.removePlaceholderString,
      children = _ref.children;

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window;

  var removeButtonRef = React.useRef(null);
  var disabledRef = React.useRef(true);

  var _React$useState = React.useState(0),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      removeOffset = _React$useState2[0],
      updateRemoveOffset = _React$useState2[1];

  (0, _useGlobalEventListener.useGlobalEventListener)(window, "click", function () {
    if (removeOffset > 0) {
      updateRemoveOffset(0);
    }
  }, {
    capture: true
  });

  var onRemoveTransitionEnd = function onRemoveTransitionEnd() {
    if (removeOffset > 0) {
      var _removeButtonRef$curr;

      removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef$curr = removeButtonRef.current) === null || _removeButtonRef$curr === void 0 ? void 0 : _removeButtonRef$curr.focus();
    } else {
      disabledRef.current = true;
    }
  };

  var onRemoveActivateClick = function onRemoveActivateClick(e) {
    e.stopPropagation();

    if (!removeButtonRef.current) {
      return;
    }

    var offsetWidth = removeButtonRef.current.offsetWidth;
    disabledRef.current = false;
    updateRemoveOffset(offsetWidth);
  };

  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Removable__content",
    style: {
      transform: "translateX(-".concat(removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0, "px)")
    },
    onTransitionEnd: onRemoveTransitionEnd
  }, (0, _jsxRuntime.createScopedElement)(_IconButton.default, {
    hasActive: false,
    hasHover: false,
    "aria-label": removePlaceholderString,
    vkuiClass: "Removable__action Removable__toggle",
    onClick: onRemoveActivateClick,
    disabled: removeOffset > 0
  }, (0, _jsxRuntime.createScopedElement)("i", {
    vkuiClass: "Removable__toggle-in",
    role: "presentation"
  })), children, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Removable__offset",
    "aria-hidden": "true"
  }), (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "button",
    hasActive: false,
    hasHover: false,
    disabled: disabledRef.current,
    getRootRef: removeButtonRef,
    vkuiClass: "Removable__remove",
    onClick: onRemove
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Removable__remove-in"
  }, removePlaceholder)));
};

var Removable = function Removable(_ref2) {
  var getRootRef = _ref2.getRootRef,
      children = _ref2.children,
      _ref2$onRemove = _ref2.onRemove,
      onRemove = _ref2$onRemove === void 0 ? _utils.noop : _ref2$onRemove,
      _ref2$removePlacehold = _ref2.removePlaceholder,
      removePlaceholder = _ref2$removePlacehold === void 0 ? "Удалить" : _ref2$removePlacehold,
      _ref2$align = _ref2.align,
      align = _ref2$align === void 0 ? "center" : _ref2$align,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var ref = (0, _useExternRef.useExternRef)(getRootRef);

  var onRemoveClick = function onRemoveClick(e) {
    e.preventDefault();
    onRemove(e);
  };

  var removePlaceholderString = (0, _utils.getTitleFromChildren)(removePlaceholder);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: ref,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Removable", platform), "Removable--".concat(align), "Removable--sizeY-".concat(sizeY))
  }), (platform === _platform.ANDROID || platform === _platform.VKCOM) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Removable__content"
  }, children, (0, _jsxRuntime.createScopedElement)(_IconButton.default, {
    activeMode: "opacity",
    hoverMode: "opacity",
    vkuiClass: "Removable__action",
    onClick: onRemoveClick,
    "aria-label": removePlaceholderString
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Cancel, {
    role: "presentation"
  }))), platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(RemovableIos, {
    onRemove: onRemoveClick,
    removePlaceholder: removePlaceholder,
    removePlaceholderString: removePlaceholderString
  }, children));
};

exports.Removable = Removable;
//# sourceMappingURL=Removable.js.map