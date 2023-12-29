import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './PopoutRoot.module.css';
/**
 * @private
 */ export const PopoutRootPopout = ({ className, ...restProps })=>/*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['PopoutRoot__popout'], className),
        ...restProps
    });
/**
 * @private
 */ export const PopoutRootModal = ({ className, ...restProps })=>/*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['PopoutRoot__modal'], className),
        ...restProps
    });
/**
 * @private
 */ export const PopoutRoot = ({ popout, modal, children, ...restProps })=>{
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