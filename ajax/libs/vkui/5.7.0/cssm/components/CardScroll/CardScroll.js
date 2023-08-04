import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useDOM } from '../../lib/dom';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import styles from './CardScroll.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/CardScroll
 */ export const CardScroll = ({ children, size = 's', showArrows = true, withSpaces = true, className, ...restProps })=>{
    const refContainer = React.useRef(null);
    const gapRef = React.useRef(null);
    const { window } = useDOM();
    function getScrollToLeft(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slideIndex = [
            ...refContainer.current.children
        ].findIndex((el)=>el.offsetLeft + el.offsetWidth + parseInt(window.getComputedStyle(el).marginRight) - offset >= 0);
        if (slideIndex === -1) {
            return offset;
        }
        if (slideIndex === 0) {
            return 0;
        }
        const slide = refContainer.current.children[slideIndex];
        const scrollTo = slide.offsetLeft - (containerWidth - slide.offsetWidth) + gapRef.current.offsetWidth;
        if (scrollTo <= 2 * gapRef.current.offsetWidth) {
            return 0;
        }
        return scrollTo;
    }
    function getScrollToRight(offset) {
        if (!refContainer.current || !gapRef.current) {
            return offset;
        }
        const containerWidth = refContainer.current.offsetWidth;
        const slide = Array.prototype.find.call(refContainer.current.children, (el)=>el.offsetLeft + el.offsetWidth - offset > containerWidth);
        if (!slide) {
            return offset;
        }
        return slide.offsetLeft - gapRef.current.offsetWidth;
    }
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['CardScroll'], 'vkuiInternalCardScroll', size !== false && ({
            s: 'vkuiInternalCardScroll--size-s',
            m: 'vkuiInternalCardScroll--size-m',
            l: 'vkuiInternalCardScroll--size-l'
        })[size], withSpaces && styles['CardScroll--withSpaces'], className)
    }, /*#__PURE__*/ React.createElement(HorizontalScroll, {
        getScrollToLeft: getScrollToLeft,
        getScrollToRight: getScrollToRight,
        showArrows: showArrows
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['CardScroll__in'],
        ref: refContainer
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['CardScroll__gap'],
        ref: gapRef
    }), children, /*#__PURE__*/ React.createElement("span", {
        className: styles['CardScroll__gap']
    }))));
};

//# sourceMappingURL=CardScroll.js.map