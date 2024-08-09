"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Clickable", {
    enumerable: true,
    get: function() {
        return Clickable;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useFocusVisible = require("../../hooks/useFocusVisible");
var _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
var _callMultiple = require("../../lib/callMultiple");
var _RootComponent = require("../RootComponent/RootComponent");
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ var NonClickable = function(_param) /*#__PURE__*/ {
    var href = _param.href, onClick = _param.onClick, onClickCapture = _param.onClickCapture, restProps = _object_without_properties._(_param, [
        "href",
        "onClick",
        "onClickCapture"
    ]);
    return _react.createElement(_RootComponent.RootComponent, restProps);
};
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ var RealClickable = function(_param) {
    var baseClassName = _param.baseClassName, children = _param.children, _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, restProps = _object_without_properties._(_param, [
        "baseClassName",
        "children",
        "focusVisibleMode"
    ]);
    var _useFocusVisible1 = (0, _useFocusVisible.useFocusVisible)(), focusVisible = _useFocusVisible1.focusVisible, onBlur = _useFocusVisible1.onBlur, onFocus = _useFocusVisible1.onFocus;
    var focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: focusVisible,
        mode: focusVisibleMode
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)(baseClassName, focusVisibleClassNames, "vkuiClickable__host"),
        onBlur: (0, _callMultiple.callMultiple)(onBlur, restProps.onBlur),
        onFocus: (0, _callMultiple.callMultiple)(onFocus, restProps.onFocus)
    }, restProps), children);
};
/**
 * Проверяем, является ли компонент кликабельным
 */ function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined) && !props.disabled;
}
/**
 * Определяет правильный компонент и его свойства
 *
 * - если передан Component, используем его
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 */ function component(param) {
    var Component = param.Component, onClick = param.onClick, onClickCapture = param.onClickCapture, href = param.href, disabled = param.disabled;
    if (Component !== undefined) {
        return {
            Component: Component
        };
    } else if (href !== undefined) {
        return {
            "Component": "a",
            "role": "link",
            "aria-disabled": disabled
        };
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return {
            "Component": "div",
            "role": "button",
            "tabIndex": disabled ? undefined : 0,
            "aria-disabled": disabled
        };
    }
    return {};
}
var Clickable = function(_param) {
    var _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, restProps = _object_without_properties._(_param, [
        "focusVisibleMode"
    ]);
    var commonProps = component(restProps);
    var isClickable = checkClickable(restProps);
    if (isClickable) {
        return /*#__PURE__*/ _react.createElement(RealClickable, _object_spread._({
            focusVisibleMode: focusVisibleMode
        }, commonProps, restProps));
    }
    return /*#__PURE__*/ _react.createElement(NonClickable, _object_spread._({}, commonProps, restProps));
};

//# sourceMappingURL=Clickable.js.map