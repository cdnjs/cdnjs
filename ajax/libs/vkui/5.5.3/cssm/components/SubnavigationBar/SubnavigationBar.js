import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import styles from './SubnavigationBar.module.css';
const defaultScrollToLeft = (x)=>x - 240;
const defaultScrollToRight = (x)=>x + 240;
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */ export const SubnavigationBar = ({ mode ='overflow' , children , showArrows =true , getScrollToLeft =defaultScrollToLeft , getScrollToRight =defaultScrollToRight , scrollAnimationDuration , className , ...restProps })=>{
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
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames('vkuiInternalSubnavigationBar', mode === 'fixed' && classNames('vkuiInternalSubnavigationBar--mode-fixed'), className)
    }, /*#__PURE__*/ React.createElement(ScrollWrapper, {
        className: styles['SubnavigationBar__in'],
        ...scrollWrapperProps
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['SubnavigationBar__scrollIn']
    }, children)));
};

//# sourceMappingURL=SubnavigationBar.js.map