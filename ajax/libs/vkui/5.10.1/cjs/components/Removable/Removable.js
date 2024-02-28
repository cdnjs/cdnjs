"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Removable", {
    enumerable: true,
    get: function() {
        return Removable;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _utils = require("../../lib/utils");
var _IconButton = require("../IconButton/IconButton");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */ var RemovableIos = function(param) {
    var onRemove = param.onRemove, removePlaceholder = param.removePlaceholder, removePlaceholderString = param.removePlaceholderString, childrenProp = param.children;
    var window = (0, _dom.useDOM)().window;
    var removeButtonRef = _react.useRef(null);
    var disabledRef = _react.useRef(true);
    var _React_useState = _sliced_to_array._(_react.useState(0), 2), removeOffset = _React_useState[0], updateRemoveOffset = _React_useState[1];
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "click", function() {
        if (removeOffset > 0) {
            updateRemoveOffset(0);
        }
    }, {
        capture: true
    });
    var onRemoveTransitionEnd = function() {
        if (removeOffset > 0) {
            var _removeButtonRef_current;
            removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef_current = removeButtonRef.current) === null || _removeButtonRef_current === void 0 ? void 0 : _removeButtonRef_current.focus();
        } else {
            disabledRef.current = true;
        }
    };
    var onRemoveActivateClick = function(e) {
        e.stopPropagation();
        if (!removeButtonRef.current) {
            return;
        }
        var offsetWidth = removeButtonRef.current.offsetWidth;
        disabledRef.current = false;
        updateRemoveOffset(offsetWidth);
    };
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiRemovable__content", "vkuiInternalRemovable__content"),
        style: {
            transform: "translateX(-".concat(removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0, "px)")
        },
        onTransitionEnd: onRemoveTransitionEnd
    }, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hasActive: false,
        hasHover: false,
        "aria-label": removePlaceholderString,
        className: (0, _vkjs.classNames)("vkuiRemovable__action", "vkuiRemovable__toggle", "vkuiInternalRemovable__action"),
        onClick: onRemoveActivateClick,
        disabled: removeOffset > 0
    }, /*#__PURE__*/ _react.createElement("i", {
        className: "vkuiRemovable__toggle-in",
        role: "presentation"
    })), typeof childrenProp === "function" ? childrenProp({
        isRemoving: removeOffset > 0
    }) : childrenProp, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    }), /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        Component: "button",
        hasActive: false,
        hasHover: false,
        disabled: disabledRef.current,
        getRootRef: removeButtonRef,
        className: "vkuiRemovable__remove",
        onClick: onRemove
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiRemovable__remove-in"
    }, removePlaceholder)));
};
var Removable = function(_param) {
    var children = _param.children, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, _param_align = _param.align, align = _param_align === void 0 ? "center" : _param_align, _param_indent = _param.indent, indent = _param_indent === void 0 ? false : _param_indent, restProps = _object_without_properties._(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var onRemoveClick = function(e) {
        e.preventDefault();
        onRemove(e);
    };
    var removePlaceholderString = (0, _utils.getTitleFromChildren)(removePlaceholder);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)(platform === _platform.Platform.IOS && "vkuiRemovable--ios", align === "start" && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent")
    }), platform !== _platform.Platform.IOS && /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiRemovable__content", "vkuiInternalRemovable__content")
    }, children, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        activeMode: "opacity",
        hoverMode: "opacity",
        className: (0, _vkjs.classNames)("vkuiRemovable__action", "vkuiInternalRemovable__action"),
        onClick: onRemoveClick,
        "aria-label": removePlaceholderString
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, {
        role: "presentation"
    })), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    })), platform === _platform.Platform.IOS && /*#__PURE__*/ _react.createElement(RemovableIos, {
        onRemove: onRemoveClick,
        removePlaceholder: removePlaceholder,
        removePlaceholderString: removePlaceholderString
    }, children));
};

//# sourceMappingURL=Removable.js.map