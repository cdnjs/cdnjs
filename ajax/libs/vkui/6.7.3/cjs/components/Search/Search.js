"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Search", {
    enumerable: true,
    get: function() {
        return Search;
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
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const _useBooleanState = require("../../hooks/useBooleanState");
const _useExternRef = require("../../hooks/useExternRef");
const _useNativeFormResetListener = require("../../hooks/useNativeFormResetListener");
const _usePlatform = require("../../hooks/usePlatform");
const _callMultiple = require("../../lib/callMultiple");
const _touch = require("../../lib/touch");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _Button = require("../Button/Button");
const _IconButton = require("../IconButton/IconButton");
const _Headline = require("../Typography/Headline/Headline");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const Search = (_param)=>{
    var { id: idProp, before = /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon16SearchOutline, {}), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon: iconProp, onIconClick, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', noPadding, getRootRef, findButtonText = 'Найти', onFindButtonClick } = _param, inputProps = _object_without_properties._(_param, [
        "id",
        "before",
        "className",
        "placeholder",
        "after",
        "getRef",
        "icon",
        "onIconClick",
        "style",
        "autoComplete",
        "onChange",
        "iconLabel",
        "clearLabel",
        "noPadding",
        "getRootRef",
        "findButtonText",
        "onFindButtonClick"
    ]);
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const { value: isFocused, setTrue: setFocusedTrue, setFalse: setFocusedFalse } = (0, _useBooleanState.useBooleanState)(false);
    const generatedId = _react.useId();
    const inputId = idProp ? idProp : `search-${generatedId}`;
    const [hasValue, setHasValue] = _react.useState(()=>Boolean(inputProps.value || inputProps.defaultValue));
    const checkHasValue = (e)=>setHasValue(Boolean(e.currentTarget.value));
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { sizeY: adaptiveSizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    const platform = (0, _usePlatform.usePlatform)();
    const hasAfter = platform === 'ios' && (0, _vkjs.hasReactNode)(after);
    const onFocus = (e)=>{
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    const onBlur = (e)=>{
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    const onCancel = _react.useCallback(()=>{
        var _Object_getOwnPropertyDescriptor, _inputRef_current;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const nativeInputValueSetter = (_Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')) === null || _Object_getOwnPropertyDescriptor === void 0 ? void 0 : _Object_getOwnPropertyDescriptor.set;
        nativeInputValueSetter === null || nativeInputValueSetter === void 0 ? void 0 : nativeInputValueSetter.call(inputRef.current, '');
        const ev2 = new Event('input', {
            bubbles: true
        });
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.dispatchEvent(ev2);
    }, [
        inputRef
    ]);
    const onIconClickStart = _react.useCallback((e)=>onIconClick === null || onIconClick === void 0 ? void 0 : onIconClick(e), [
        onIconClick
    ]);
    const onIconCancelClickStart = _react.useCallback((e)=>{
        var _inputRef_current;
        e.preventDefault();
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        if ((0, _touch.touchEnabled)()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (inputProps.value !== undefined) {
            setHasValue(Boolean(inputProps.value));
        }
    }, [
        inputProps.value
    ]);
    (0, _useNativeFormResetListener.useNativeFormResetListener)(inputRef, ()=>{
        setHasValue(Boolean(inputProps.defaultValue));
    });
    const renderIconButton = (icon, props = {})=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_IconButton.IconButton, _object_spread_props._(_object_spread._({
            hoverMode: "opacity",
            onPointerDown: onIconClickStart,
            className: "vkuiSearch__icon",
            onFocus: setFocusedTrue,
            onBlur: setFocusedFalse,
            onClick: _vkjs.noop
        }, props), {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                    children: iconLabel
                }),
                icon
            ]
        }));
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        className: (0, _vkjs.classNames)('vkuiInternalSearch', "vkuiSearch", sizeY === 'none' && "vkuiSearch--sizeY-none", sizeY === 'compact' && "vkuiSearch--sizeY-compact", isFocused && "vkuiSearch--focused", hasValue && "vkuiSearch--has-value", hasAfter && "vkuiSearch--has-after", iconProp && "vkuiSearch--has-icon", inputProps.disabled && "vkuiSearch--disabled", !noPadding && "vkuiSearch--withPadding", className),
        ref: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiSearch__field",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("label", {
                        htmlFor: inputId,
                        className: "vkuiSearch__label",
                        children: placeholder
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiSearch__input",
                        children: [
                            before,
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, _object_spread_props._(_object_spread._({
                                Component: "input",
                                type: "search",
                                level: "1",
                                weight: "3"
                            }, inputProps), {
                                id: inputId,
                                placeholder: placeholder,
                                autoComplete: autoComplete,
                                getRootRef: inputRef,
                                className: "vkuiSearch__nativeInput",
                                onFocus: onFocus,
                                onBlur: onBlur,
                                onChange: (0, _callMultiple.callMultiple)(onChange, checkHasValue)
                            }))
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiSearch__controls",
                        children: [
                            iconProp && (typeof iconProp === 'function' ? iconProp(renderIconButton) : renderIconButton(iconProp)),
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_IconButton.IconButton, {
                                hoverMode: "opacity",
                                onPointerDown: onIconCancelClickStart,
                                onClick: onCancel,
                                className: "vkuiSearch__icon",
                                tabIndex: hasValue ? undefined : -1,
                                disabled: inputProps.disabled,
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                                        children: clearLabel
                                    }),
                                    platform === 'ios' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon16Clear, {}) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon24Cancel, {})
                                ]
                            }),
                            adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Button.Button, {
                                mode: "primary",
                                size: "m",
                                className: (0, _vkjs.classNames)("vkuiSearch__findButton", adaptiveSizeY.compact.className),
                                focusVisibleMode: "inside",
                                onClick: onFindButtonClick,
                                tabIndex: hasValue ? undefined : -1,
                                children: findButtonText
                            })
                        ]
                    })
                ]
            }),
            hasAfter && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiSearch__after",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Button.Button, {
                    mode: "tertiary",
                    size: "m",
                    focusVisibleMode: "inside",
                    hoverMode: "opacity",
                    activeMode: "opacity",
                    onClick: onCancel,
                    onFocus: setFocusedTrue,
                    onBlur: setFocusedFalse,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        className: "vkuiSearch__afterTextClip",
                        children: after
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=Search.js.map