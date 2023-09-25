import * as React from 'react';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './SubnavigationBar.module.css';
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export const SubnavigationBar = ({ mode = 'overflow', children, showArrows = true, getScrollToLeft = defaultScrollToLeft, getScrollToRight = defaultScrollToRight, scrollAnimationDuration, ...restProps })=>{
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
    return /*#__PURE__*/ React.createElement(RootComponent, {
        // TODO: [>=6]
        // Заменить у SubnavigationButton `display: inline-block` на `width: 100%`
        // и удалить применение селектора в `SubnavigationButton.module.css`.
        // 2. Заменить глобальный селектор на CSS Modules `styles['SubnavigationBar--mode-fixed']`
        // mode !== 'fixed' && classNames('vkuiInternalSubnavigationBar--mode-fixed')
        baseClassName: mode === 'fixed' ? 'vkuiInternalSubnavigationBar--mode-fixed' : undefined,
        ...restProps
    }, /*#__PURE__*/ React.createElement(ScrollWrapper, {
        className: styles['SubnavigationBar__in'],
        ...scrollWrapperProps
    }, /*#__PURE__*/ React.createElement("ul", {
        className: styles['SubnavigationBar__scrollIn']
    }, React.Children.map(children, (child, idx)=>/*#__PURE__*/ React.createElement("li", {
            key: idx,
            className: styles['SubnavigationBar__item']
        }, child)))));
};

//# sourceMappingURL=SubnavigationBar.js.map