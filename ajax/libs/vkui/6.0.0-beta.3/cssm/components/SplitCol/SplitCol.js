import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { ViewWidth, viewWidthToClassName } from '../../lib/adaptivity';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../../lib/matchMedia';
import { RootComponent } from '../RootComponent/RootComponent';
import { SplitColContext } from './SplitColContext';
import styles from './SplitCol.module.css';
const breakpointClassNames = {
    none: classNames(styles['SplitCol--viewWidth-none'], 'vkuiInternalSplitCol--viewWidth-none'),
    tabletMinus: styles['SplitCol--viewWidth-tabletMinus'],
    smallTabletPlus: styles['SplitCol--viewWidth-smallTabletPlus'],
    tabletPlus: 'vkuiInternalSplitCol--viewWidth-tabletPlus'
};
function useTransitionAnimate(animateProp) {
    const { viewWidth } = useAdaptivity();
    const [animate, setAnimate] = React.useState(Boolean(animateProp));
    const mediaQueries = useMediaQueries();
    React.useEffect(()=>{
        if (animateProp !== undefined) {
            setAnimate(animateProp);
            return;
        }
        if (viewWidth !== undefined) {
            setAnimate(viewWidth < ViewWidth.TABLET);
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        const listener = ()=>setAnimate(!mediaQueries.smallTabletPlus.matches);
        listener();
        matchMediaListAddListener(mediaQueries.smallTabletPlus, listener);
        return ()=>{
            matchMediaListRemoveListener(mediaQueries.smallTabletPlus, listener);
        };
    }, [
        animateProp,
        viewWidth,
        mediaQueries
    ]);
    return animate;
}
/**
 * @see https://vkcom.github.io/VKUI/#/SplitCol
 */ export const SplitCol = (props)=>{
    const { children, width, maxWidth, minWidth, animate: animateProp, fixed, style, autoSpaced, stretchedOnMobile, getRootRef, ...restProps } = props;
    const baseRef = useExternRef(getRootRef);
    const { viewWidth } = useAdaptivity();
    const animate = useTransitionAnimate(animateProp);
    const contextValue = useObjectMemo({
        colRef: baseRef,
        animate
    });
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        style: {
            ...style,
            width: width,
            maxWidth: maxWidth,
            minWidth: minWidth
        },
        getRootRef: baseRef,
        baseClassName: classNames(styles['SplitCol'], viewWidthToClassName(breakpointClassNames, viewWidth), autoSpaced && classNames(styles['SplitCol--spaced-auto'], 'vkuiInternalSplitCol--spaced-auto'), fixed && styles['SplitCol--fixed'], stretchedOnMobile && styles['SplitCol--stretched-on-mobile'])
    }, /*#__PURE__*/ React.createElement(SplitColContext.Provider, {
        value: contextValue
    }, fixed ? /*#__PURE__*/ React.createElement("div", {
        className: styles['SplitCol__fixedInner']
    }, children) : children));
};

//# sourceMappingURL=SplitCol.js.map