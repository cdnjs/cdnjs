import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesAlignX = {
    center: "vkuiPopoutWrapper--alignX-center",
    left: "vkuiPopoutWrapper--alignX-left",
    right: "vkuiPopoutWrapper--alignX-right"
};
const stylesAlignY = {
    center: "vkuiPopoutWrapper--alignY-center",
    top: "vkuiPopoutWrapper--alignY-top",
    bottom: "vkuiPopoutWrapper--alignY-bottom"
};
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */ export const PopoutWrapper = (_param)=>{
    var { alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick } = _param, restProps = _object_without_properties(_param, [
        "alignY",
        "alignX",
        "closing",
        "noBackground",
        "fixed",
        "children",
        "onClick"
    ]);
    const platform = usePlatform();
    const [opened, setOpened] = React.useState(noBackground);
    const onFadeInEnd = (e)=>{
        if (!e || e.animationName === "vkuianimation-full-fade-in") {
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiPopoutWrapper", stylesAlignY[alignY], stylesAlignX[alignX], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", !noBackground && "vkuiPopoutWrapper--masked"),
        onAnimationEnd: opened ? undefined : onFadeInEnd
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__container"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__overlay",
        onClick: onClick
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutWrapper__content"
    }, children)));
};

//# sourceMappingURL=PopoutWrapper.js.map