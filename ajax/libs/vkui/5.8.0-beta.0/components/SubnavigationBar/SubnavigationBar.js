import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
var defaultScrollToLeft = function(x) {
    return x - 240;
};
var defaultScrollToRight = function(x) {
    return x + 240;
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export var SubnavigationBar = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "overflow" : _param_mode, children = _param.children, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_getScrollToLeft = _param.getScrollToLeft, getScrollToLeft = _param_getScrollToLeft === void 0 ? defaultScrollToLeft : _param_getScrollToLeft, _param_getScrollToRight = _param.getScrollToRight, getScrollToRight = _param_getScrollToRight === void 0 ? defaultScrollToRight : _param_getScrollToRight, scrollAnimationDuration = _param.scrollAnimationDuration, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration",
        "className"
    ]);
    var ScrollWrapper;
    var scrollWrapperProps = {};
    if (mode === "fixed") {
        ScrollWrapper = "div";
    } else {
        ScrollWrapper = HorizontalScroll;
        scrollWrapperProps = {
            showArrows: showArrows,
            getScrollToLeft: getScrollToLeft,
            getScrollToRight: getScrollToRight,
            scrollAnimationDuration: scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames(// TODO: [>=6]
        // Заменить у SubnavigationButton `display: inline-block` на `width: 100%`
        // и удалить применение селектора в `SubnavigationButton.module.css`.
        // 2. Заменить глобальный селектор на CSS Modules `styles['SubnavigationBar--mode-fixed']`
        // mode !== 'fixed' && classNames('vkuiInternalSubnavigationBar--mode-fixed')
        mode === "fixed" && classNames("vkuiInternalSubnavigationBar--mode-fixed"), className)
    }), /*#__PURE__*/ React.createElement(ScrollWrapper, _object_spread({
        className: "vkuiSubnavigationBar__in"
    }, scrollWrapperProps), /*#__PURE__*/ React.createElement("ul", {
        className: "vkuiSubnavigationBar__scrollIn"
    }, React.Children.map(children, function(child, idx) {
        return /*#__PURE__*/ React.createElement("li", {
            key: idx,
            className: "vkuiSubnavigationBar__item"
        }, child);
    }))));
};

//# sourceMappingURL=SubnavigationBar.js.map