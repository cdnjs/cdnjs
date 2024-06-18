import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { PopoutRoot } from '../PopoutRoot/PopoutRoot';
import styles from './SplitLayout.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SplitLayout
 */ export const SplitLayout = ({ popout, modal, header, children, getRootRef, getRef, className, ...restProps })=>{
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PopoutRoot, {
        className: classNames(styles['SplitLayout'], platform === 'ios' && styles['SplitLayout--ios']),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef
    }, header, /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        ref: getRef,
        className: classNames(styles['SplitLayout__inner'], !!header && styles['SplitLayout__inner--header'], className)
    }, children));
};

//# sourceMappingURL=SplitLayout.js.map