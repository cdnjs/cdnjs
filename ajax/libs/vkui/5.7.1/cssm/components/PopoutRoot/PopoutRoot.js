import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import styles from './PopoutRoot.module.css';
const PopoutRootPopout = ({ children })=>{
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['PopoutRoot__popout'], isDesktop && styles['PopoutRoot__popout--absolute'])
    }, children);
};
const PopoutRootModal = ({ children })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutRoot__modal']
    }, children);
};
export const PopoutRoot = ({ popout, modal, children, getRootRef, className, ...restProps })=>{
    const { document } = useDOM();
    React.useEffect(()=>{
        popout && blurActiveElement(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['PopoutRoot'], className),
        ref: getRootRef
    }, children, /*#__PURE__*/ React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/ React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ React.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map