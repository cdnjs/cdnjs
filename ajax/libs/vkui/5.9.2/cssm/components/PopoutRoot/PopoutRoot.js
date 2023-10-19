import * as React from 'react';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './PopoutRoot.module.css';
const PopoutRootPopout = (props)=>/*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutRoot__popout'],
        ...props
    });
const PopoutRootModal = (props)=>/*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutRoot__modal'],
        ...props
    });
export const PopoutRoot = ({ popout, modal, children, ...restProps })=>{
    const { document } = useDOM();
    React.useEffect(()=>{
        popout && blurActiveElement(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: styles['PopoutRoot']
    }, children, /*#__PURE__*/ React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/ React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ React.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map