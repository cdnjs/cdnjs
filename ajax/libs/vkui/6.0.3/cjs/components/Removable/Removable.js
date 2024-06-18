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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _children = require("../../lib/children");
const _dom = require("../../lib/dom");
const _IconButton = require("../IconButton/IconButton");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */ const RemovableIos = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp, toggleButtonTestId, removeButtonTestId })=>{
    const { window } = (0, _dom.useDOM)();
    const removeButtonRef = _react.useRef(null);
    const disabledRef = _react.useRef(true);
    const [removeOffset, updateRemoveOffset] = _react.useState(0);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, 'click', ()=>{
        if (removeOffset > 0) {
            updateRemoveOffset(0);
        }
    }, {
        capture: true
    });
    const onRemoveTransitionEnd = ()=>{
        if (removeOffset > 0) {
            var _removeButtonRef_current;
            removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef_current = removeButtonRef.current) === null || _removeButtonRef_current === void 0 ? void 0 : _removeButtonRef_current.focus();
        } else {
            disabledRef.current = true;
        }
    };
    const onRemoveActivateClick = (e)=>{
        e.stopPropagation();
        if (!removeButtonRef.current) {
            return;
        }
        const { offsetWidth } = removeButtonRef.current;
        disabledRef.current = false;
        updateRemoveOffset(offsetWidth);
    };
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
        style: {
            transform: `translateX(-${removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0}px)`
        },
        onTransitionEnd: onRemoveTransitionEnd
    }, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hasActive: false,
        hasHover: false,
        className: (0, _vkjs.classNames)("vkuiRemovable__action", "vkuiRemovable__toggle", 'vkuiInternalRemovable__action'),
        onClick: onRemoveActivateClick,
        disabled: removeOffset > 0,
        "data-testid": toggleButtonTestId
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, removePlaceholderString), /*#__PURE__*/ _react.createElement("i", {
        className: "vkuiRemovable__toggle-in",
        role: "presentation"
    })), typeof childrenProp === 'function' ? childrenProp({
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
        onClick: onRemove,
        "data-testid": removeButtonTestId
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiRemovable__remove-in"
    }, removePlaceholder)));
};
const Removable = (_param)=>{
    var { children, onRemove = _vkjs.noop, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent",
        "toggleButtonTestId",
        "removeButtonTestId"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove(e);
    };
    const removePlaceholderString = (0, _children.getTextFromChildren)(removePlaceholder);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)(platform === 'ios' && "vkuiRemovable--ios", align === 'start' && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent")
    }), platform !== 'ios' && /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiRemovable__content", 'vkuiInternalRemovable__content')
    }, typeof children === 'function' ? children({
        isRemoving: false
    }) : children, /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        activeMode: "opacity",
        hoverMode: "opacity",
        className: (0, _vkjs.classNames)("vkuiRemovable__action", 'vkuiInternalRemovable__action'),
        onClick: onRemoveClick,
        label: removePlaceholderString,
        "data-testid": removeButtonTestId
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, {
        role: "presentation"
    })), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    })), platform === 'ios' && /*#__PURE__*/ _react.createElement(RemovableIos, {
        onRemove: onRemoveClick,
        removePlaceholder: removePlaceholder,
        removePlaceholderString: removePlaceholderString,
        toggleButtonTestId: toggleButtonTestId,
        removeButtonTestId: removeButtonTestId
    }, children));
};

//# sourceMappingURL=Removable.js.map