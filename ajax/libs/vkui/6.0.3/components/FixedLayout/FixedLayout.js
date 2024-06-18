import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { OnboardingTooltipContainer } from '../OnboardingTooltip/OnboardingTooltipContainer';
import { SplitColContext } from '../SplitCol/SplitColContext';
const stylesVertical = {
    top: "vkuiFixedLayout--vertical-top",
    bottom: classNames("vkuiFixedLayout--vertical-bottom", 'vkuiInternalFixedLayout--vertical-bottom')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FixedLayout
 */ export const FixedLayout = (_param)=>{
    var { children, style, vertical, getRootRef, filled, className, useParentWidth } = _param, restProps = _object_without_properties(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "filled",
        "className",
        "useParentWidth"
    ]);
    const platform = usePlatform();
    const ref = useExternRef(getRootRef);
    const [width, setWidth] = React.useState(undefined);
    const { window } = useDOM();
    const { colRef } = React.useContext(SplitColContext);
    const doResize = ()=>{
        if (useParentWidth && ref.current) {
            var _ref_current_parentElement;
            const parentWidth = (_ref_current_parentElement = ref.current.parentElement) === null || _ref_current_parentElement === void 0 ? void 0 : _ref_current_parentElement.getBoundingClientRect().width;
            setWidth(parentWidth ? `${parentWidth}px` : undefined);
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
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
    return /*#__PURE__*/ React.createElement(OnboardingTooltipContainer, _object_spread_props(_object_spread({}, restProps), {
        fixed: true,
        ref: ref,
        className: classNames("vkuiFixedLayout", platform === 'ios' && 'vkuiInternalFixedLayout--ios', filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props(_object_spread({}, style), {
            width
        })
    }), children);
};

//# sourceMappingURL=FixedLayout.js.map