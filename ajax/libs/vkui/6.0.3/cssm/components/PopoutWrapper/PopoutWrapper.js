import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './PopoutWrapper.module.css';
const stylesAlignX = {
    center: styles['PopoutWrapper--alignX-center'],
    left: styles['PopoutWrapper--alignX-left'],
    right: styles['PopoutWrapper--alignX-right']
};
const stylesAlignY = {
    center: styles['PopoutWrapper--alignY-center'],
    top: styles['PopoutWrapper--alignY-top'],
    bottom: styles['PopoutWrapper--alignY-bottom']
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = ({ alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick, ...restProps })=>{
    const platform = usePlatform();
    const [opened, setOpened] = React.useState(noBackground);
    const onFadeInEnd = (e)=>{
        if (!e || e.animationName === styles['animation-full-fade-in']) {
            setOpened(true);
        }
    };
    const animationFinishFallback = useTimeout(onFadeInEnd, platform === 'ios' ? 300 : 200);
    React.useEffect(()=>{
        !opened && animationFinishFallback.set();
    }, [
        animationFinishFallback,
        opened
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['PopoutWrapper'], stylesAlignY[alignY], stylesAlignX[alignX], closing && styles['PopoutWrapper--closing'], opened && styles['PopoutWrapper--opened'], fixed && styles['PopoutWrapper--fixed'], !noBackground && styles['PopoutWrapper--masked']),
        onAnimationEnd: opened ? undefined : onFadeInEnd
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