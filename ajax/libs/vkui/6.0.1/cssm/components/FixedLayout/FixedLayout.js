import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { SplitColContext } from '../SplitCol/SplitColContext';
import styles from './FixedLayout.module.css';
const stylesVertical = {
    top: styles['FixedLayout--vertical-top'],
    bottom: classNames(styles['FixedLayout--vertical-bottom'], 'vkuiInternalFixedLayout--vertical-bottom')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
 */ export const FixedLayout = ({ children, style, vertical, getRootRef, filled, className, useParentWidth, ...restProps })=>{
    const platform = usePlatform();
    const ref = useExternRef(getRootRef);
    const [width, setWidth] = React.useState(undefined);
    const { window } = useDOM();
    const { colRef } = React.useContext(SplitColContext);
    const doResize = ()=>{
        if (useParentWidth && ref.current) {
            const parentWidth = ref.current.parentElement?.getBoundingClientRect().width;
            setWidth(parentWidth ? `${parentWidth}px` : undefined);
        } else if (colRef?.current) {
            const computedStyle = getComputedStyle(colRef.current);
            setWidth(`${colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)}px`);
        } else {
            setWidth(undefined);
        }
    };
    React.useEffect(doResize, [
        colRef,
        platform,
        ref,
        useParentWidth
    ]);
    useGlobalEventListener(window, 'resize', doResize);
    return /*#__PURE__*/ React.createElement(OnboardingTooltipContainer, {
        ...restProps,
        fixed: true,
        ref: ref,
        className: classNames(styles['FixedLayout'], platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && styles['FixedLayout--filled'], vertical && stylesVertical[vertical], className),
        style: {
            ...style,
            width
        }
    }, children);
};

//# sourceMappingURL=FixedLayout.js.map