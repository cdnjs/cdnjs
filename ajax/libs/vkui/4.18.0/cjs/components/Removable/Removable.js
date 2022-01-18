"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Removable = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _utils = require("../../lib/utils");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _dom = require("../../lib/dom");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _IconButton = _interopRequireDefault(require("../IconButton/IconButton"));

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _excluded = ["children", "onRemove", "removePlaceholder", "align"];

var Removable = function Removable(_ref) {
  var children = _ref.children,
      onRemove = _ref.onRemove,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'center' : _ref$align,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var removeButtonRef = React.useRef(null);

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isRemoveActivated = _React$useState2[0],
      setRemoveActivated = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      removeOffset = _React$useState4[0],
      updateRemoveOffset = _React$useState4[1];

  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'click', isRemoveActivated && function () {
    setRemoveActivated(false);
    updateRemoveOffset(0);
  });

  var onRemoveTransitionEnd = function onRemoveTransitionEnd() {
    if (isRemoveActivated) {
      var _removeButtonRef$curr;

      removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef$curr = removeButtonRef.current) === null || _removeButtonRef$curr === void 0 ? void 0 : _removeButtonRef$curr.focus();
    }
  };

  var onRemoveActivateClick = function onRemoveActivateClick(e) {
    e.nativeEvent.stopPropagation();
    e.preventDefault();
    setRemoveActivated(true);
  };

  var onRemoveClick = function onRemoveClick(e) {
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    onRemove && onRemove(e);
  };

  React.useEffect(function () {
    var removeButton = removeButtonRef === null || removeButtonRef === void 0 ? void 0 : removeButtonRef.current;

    if (isRemoveActivated && removeButton) {
      updateRemoveOffset(removeButton.offsetWidth);
    }
  }, [isRemoveActivated]);
  var removePlaceholderString = (0, _utils.getTitleFromChildren)(removePlaceholder);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Removable', platform), "Removable--".concat(align), "Removable--sizeY-".concat(sizeY))
  }), (platform === _platform.ANDROID || platform === _platform.VKCOM) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Removable__content"
  }, children, (0, _jsxRuntime.createScopedElement)(_IconButton.default, {
    "aria-label": removePlaceholderString,
    vkuiClass: "Removable__action",
    onClick: onRemoveClick
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Cancel, {
    role: "presentation"
  }))), platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Removable__content",
    style: {
      transform: "translateX(-".concat(removeOffset, "px)")
    }
  }, (0, _jsxRuntime.createScopedElement)(_IconButton.default, {
    hasActive: false,
    hasHover: false,
    "aria-label": removePlaceholderString,
    vkuiClass: "Removable__action Removable__toggle",
    onClick: onRemoveActivateClick
  }, (0, _jsxRuntime.createScopedElement)("i", {
    vkuiClass: "Removable__toggle-in",
    role: "presentation"
  })), children, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Removable__offset",
    "aria-hidden": "true"
  })), (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "button",
    hasActive: false,
    hasHover: false,
    disabled: !isRemoveActivated,
    getRootRef: removeButtonRef,
    vkuiClass: "Removable__remove",
    onClick: onRemoveClick,
    onTransitionEnd: onRemoveTransitionEnd,
    style: {
      transform: "translateX(-".concat(removeOffset, "px)")
    }
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Removable__remove-in"
  }, removePlaceholder))));
};

exports.Removable = Removable;
//# sourceMappingURL=Removable.js.map