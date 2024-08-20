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
const _jsxruntime = require("react/jsx-runtime");
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
 */ const RemovableIos = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp, toggleButtonTestId, removeButtonTestId, disabled })=>{
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        className: (0, _vkjs.classNames)("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
        style: {
            transform: `translateX(-${removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0}px)`
        },
        onTransitionEnd: onRemoveTransitionEnd,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_IconButton.IconButton, {
                hasActive: false,
                hasHover: false,
                className: (0, _vkjs.classNames)("vkuiRemovable__action", "vkuiRemovable__toggle", 'vkuiInternalRemovable__action'),
                onClick: onRemoveActivateClick,
                disabled: removeOffset > 0 || disabled,
                "data-testid": toggleButtonTestId,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                        children: removePlaceholderString
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("i", {
                        className: "vkuiRemovable__toggle-in",
                        role: "presentation"
                    })
                ]
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: removeOffset > 0
            }) : childrenProp,
            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                className: "vkuiRemovable__offset",
                "aria-hidden": true
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, {
                Component: "button",
                hasActive: false,
                hasHover: false,
                disabled: disabledRef.current,
                getRootRef: removeButtonRef,
                className: "vkuiRemovable__remove",
                onClick: onRemove,
                "data-testid": removeButtonTestId,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    className: "vkuiRemovable__remove-in",
                    children: removePlaceholder
                })
            })
        ]
    });
};
const Removable = (_param)=>{
    var { children, onRemove, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId, disabled } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent",
        "toggleButtonTestId",
        "removeButtonTestId",
        "disabled"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(e);
    };
    const removePlaceholderString = (0, _children.getTextFromChildren)(removePlaceholder);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)(platform === 'ios' && "vkuiRemovable--ios", align === 'start' && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent"),
        children: [
            platform !== 'ios' && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: (0, _vkjs.classNames)("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
                children: [
                    typeof children === 'function' ? children({
                        isRemoving: false
                    }) : children,
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_IconButton.IconButton, {
                        activeMode: "opacity",
                        hoverMode: "opacity",
                        className: (0, _vkjs.classNames)("vkuiRemovable__action", 'vkuiInternalRemovable__action'),
                        onClick: onRemoveClick,
                        label: removePlaceholderString,
                        "data-testid": removeButtonTestId,
                        disabled: disabled,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24Cancel, {
                            role: "presentation"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        className: "vkuiRemovable__offset",
                        "aria-hidden": true
                    })
                ]
            }),
            platform === 'ios' && /*#__PURE__*/ (0, _jsxruntime.jsx)(RemovableIos, {
                onRemove: onRemoveClick,
                removePlaceholder: removePlaceholder,
                removePlaceholderString: removePlaceholderString,
                toggleButtonTestId: toggleButtonTestId,
                removeButtonTestId: removeButtonTestId,
                disabled: disabled,
                children: children
            })
        ]
    }));
};

//# sourceMappingURL=Removable.js.map