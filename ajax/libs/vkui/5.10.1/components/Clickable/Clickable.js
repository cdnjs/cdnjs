import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName";
import { callMultiple } from "../../lib/callMultiple";
import { RootComponent } from "../RootComponent/RootComponent";
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ var NonClickable = function(_param) /*#__PURE__*/ {
    var href = _param.href, onClick = _param.onClick, onClickCapture = _param.onClickCapture, restProps = _object_without_properties(_param, [
        "href",
        "onClick",
        "onClickCapture"
    ]);
    return React.createElement(RootComponent, restProps);
};
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ var RealClickable = function(_param) {
    var baseClassName = _param.baseClassName, children = _param.children, _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, restProps = _object_without_properties(_param, [
        "baseClassName",
        "children",
        "focusVisibleMode"
    ]);
    var _useFocusVisible = useFocusVisible(), focusVisible = _useFocusVisible.focusVisible, onBlur = _useFocusVisible.onBlur, onFocus = _useFocusVisible.onFocus;
    var focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusVisible,
        mode: focusVisibleMode
    });
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames(baseClassName, focusVisibleClassNames, "vkuiClickable__host"),
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
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
/**
 * Базовый кликабельный корневой компонент.
 *
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 */ export var Clickable = function(_param) {
    var _param_focusVisibleMode = _param.focusVisibleMode, focusVisibleMode = _param_focusVisibleMode === void 0 ? "inside" : _param_focusVisibleMode, restProps = _object_without_properties(_param, [
        "focusVisibleMode"
    ]);
    var commonProps = component(restProps);
    var isClickable = checkClickable(restProps);
    if (isClickable) {
        return /*#__PURE__*/ React.createElement(RealClickable, _object_spread({
            focusVisibleMode: focusVisibleMode
        }, commonProps, restProps));
    }
    return /*#__PURE__*/ React.createElement(NonClickable, _object_spread({}, commonProps, restProps));
};

//# sourceMappingURL=Clickable.js.map