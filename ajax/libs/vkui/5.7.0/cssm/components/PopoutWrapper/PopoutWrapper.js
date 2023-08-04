import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { useDOM } from '../../lib/dom';
import { Platform } from '../../lib/platform';
import styles from './PopoutWrapper.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = ({ alignY = 'center', alignX = 'center', closing = false, hasMask = true, fixed = true, children, onClick, className, ...restProps })=>{
    const platform = usePlatform();
    const [opened, setOpened] = React.useState(!hasMask);
    const elRef = React.useRef(null);
    const onFadeInEnd = (e)=>{
        if (!e || e.animationName === styles['vkui-animation-full-fade-in']) {
            setOpened(true);
        }
    };
    const animationFinishFallback = useTimeout(onFadeInEnd, platform === Platform.IOS ? 300 : 200);
    React.useEffect(()=>{
        !opened && animationFinishFallback.set();
    }, [
        animationFinishFallback,
        opened
    ]);
    const { window } = useDOM();
    useGlobalEventListener(window, 'touchmove', (e)=>e.preventDefault(), {
        passive: false
    });
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['PopoutWrapper'], {
            center: styles['PopoutWrapper--alignY-center'],
            top: styles['PopoutWrapper--alignY-top'],
            bottom: styles['PopoutWrapper--alignY-bottom']
        }[alignY], {
            center: styles['PopoutWrapper--alignX-center'],
            left: styles['PopoutWrapper--alignX-left'],
            right: styles['PopoutWrapper--alignX-right']
        }[alignX], closing && styles['PopoutWrapper--closing'], opened && styles['PopoutWrapper--opened'], fixed && styles['PopoutWrapper--fixed'], hasMask && styles['PopoutWrapper--masked'], className),
        onAnimationEnd: opened ? undefined : onFadeInEnd,
        ref: elRef
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutWrapper__container']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutWrapper__overlay'],
        onClick: onClick
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['PopoutWrapper__content']
    }, children)));
};

//# sourceMappingURL=PopoutWrapper.js.map