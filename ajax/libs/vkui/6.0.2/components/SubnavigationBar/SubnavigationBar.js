import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { RootComponent } from '../RootComponent/RootComponent';
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export const SubnavigationBar = (_param)=>{
    var { mode = 'overflow', children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration"
    ]);
    let ScrollWrapper;
    let scrollWrapperProps = {};
    if (mode === 'fixed') {
        ScrollWrapper = 'div';
    } else {
        ScrollWrapper = HorizontalScroll;
        scrollWrapperProps = {
            showArrows,
            getScrollToLeft,
            getScrollToRight,
            scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: mode === 'fixed' && "vkuiSubnavigationBar--mode-fixed"
    }, restProps), /*#__PURE__*/ React.createElement(ScrollWrapper, _object_spread({
        className: "vkuiSubnavigationBar__in"
    }, scrollWrapperProps), /*#__PURE__*/ React.createElement("ul", {
        className: "vkuiSubnavigationBar__scrollIn"
    }, React.Children.map(children, (child, idx)=>hasReactNode(child) ? /*#__PURE__*/ React.createElement("li", {
            key: idx,
            className: "vkuiSubnavigationBar__item"
        }, child) : null))));
};

//# sourceMappingURL=SubnavigationBar.js.map