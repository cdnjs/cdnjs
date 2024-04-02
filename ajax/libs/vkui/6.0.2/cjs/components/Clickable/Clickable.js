"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Clickable: function() {
        return Clickable;
    },
    checkClickable: function() {
        return checkClickable;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useFocusVisible = require("../../hooks/useFocusVisible");
const _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
const _mergeCalls = require("../../lib/mergeCalls");
const _RootComponent = require("../RootComponent/RootComponent");
const _useKeyboard = require("./useKeyboard");
const _useState = require("./useState");
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = (_param)=>{
    var { href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, activated, activeEffectDelay } = _param, restProps = _object_without_properties._(_param, [
        "href",
        "onClick",
        "onClickCapture",
        "activeClassName",
        "hoverClassName",
        "hasActive",
        "hasHover",
        "hovered",
        "activated",
        "activeEffectDelay"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, restProps);
};
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ const RealClickable = (_param)=>{
    var { baseClassName, children, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = _useState.DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown } = _param, restProps = _object_without_properties._(_param, [
        "baseClassName",
        "children",
        "focusVisibleMode",
        "activeClassName",
        "hoverClassName",
        "activeEffectDelay",
        "hasHover",
        "hasActive",
        "hovered",
        "activated",
        "onPointerEnter",
        "onPointerLeave",
        "onPointerDown",
        "onPointerCancel",
        "onPointerUp",
        "onBlur",
        "onFocus",
        "onKeyDown"
    ]);
    const _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), { focusVisible } = _useFocusVisible1, focusEvents = _object_without_properties._(_useFocusVisible1, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible,
        mode: focusVisibleMode
    });
    const _useState1 = (0, _useState.useState)({
        activeClassName,
        hoverClassName,
        activeEffectDelay,
        hasHover,
        hasActive,
        hovered,
        activated
    }), { stateClassName, setLockBubblingImmediate } = _useState1, stateEvents = _object_without_properties._(_useState1, [
        "stateClassName",
        "setLockBubblingImmediate"
    ]);
    const keyboardHandlers = (0, _useKeyboard.useKeyboard)();
    const handlers = (0, _mergeCalls.mergeCalls)(focusEvents, stateEvents, keyboardHandlers, {
        onPointerEnter,
        onPointerLeave,
        onPointerDown,
        onPointerCancel,
        onPointerUp,
        onBlur,
        onFocus,
        onKeyDown
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)(baseClassName, "vkuiClickable__realClickable", focusVisibleClassNames, stateClassName)
    }, handlers, restProps), /*#__PURE__*/ _react.createElement(_useState.ClickableLockStateContext.Provider, {
        value: setLockBubblingImmediate
    }, children));
};
function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined || props.Component === 'label') && !props.disabled;
}
/**
 * Определяет правильный компонент и его свойства
 *
 * - если передан Component, используем его
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 */ function component({ Component, onClick, onClickCapture, href, disabled }) {
    if (Component !== undefined) {
        return {
            Component
        };
    } else if (href !== undefined) {
        return {
            'Component': 'a',
            'aria-disabled': disabled
        };
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return {
            'Component': 'div',
            'role': 'button',
            'tabIndex': disabled ? undefined : 0,
            'aria-disabled': disabled
        };
    }
    return {};
}
const Clickable = (_param)=>{
    var { focusVisibleMode = 'inside', baseClassName: baseClassNameProp } = _param, restProps = _object_without_properties._(_param, [
        "focusVisibleMode",
        "baseClassName"
    ]);
    const commonProps = component(restProps);
    const isClickable = checkClickable(restProps);
    const baseClassName = (0, _vkjs.classNames)(baseClassNameProp, "vkuiClickable__host");
    if (isClickable) {
        return /*#__PURE__*/ _react.createElement(RealClickable, _object_spread._({
            baseClassName: baseClassName,
            focusVisibleMode: focusVisibleMode
        }, commonProps, restProps));
    }
    return /*#__PURE__*/ _react.createElement(NonClickable, _object_spread._({
        baseClassName: baseClassName
    }, commonProps, restProps));
};

//# sourceMappingURL=Clickable.js.map