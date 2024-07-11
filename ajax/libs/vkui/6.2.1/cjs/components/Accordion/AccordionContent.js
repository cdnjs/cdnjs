"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccordionContent", {
    enumerable: true,
    get: function() {
        return AccordionContent;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _animation = require("../../lib/animation");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AccordionContext = require("./AccordionContext");
const CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT = '--vkui_internal--AccordionContent_height';
const stateClassNames = {
    enter: "vkuiAccordionContent__in--enter",
    entering: "vkuiAccordionContent__in--enter",
    entered: "vkuiAccordionContent__in--entered",
    exit: "vkuiAccordionContent__in--exit",
    exiting: "vkuiAccordionContent__in--exit",
    exited: "vkuiAccordionContent__in--exited"
};
const AccordionContent = (_param)=>{
    var { getRootRef, getRef, className, children } = _param, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "getRef",
        "className",
        "children"
    ]);
    const { expanded, labelId, contentId } = _react.useContext(_AccordionContext.AccordionContext);
    const inRef = (0, _useExternRef.useExternRef)(getRef);
    const [animationState, animationHandlers] = (0, _animation.useCSSKeyframesAnimationController)(expanded ? 'enter' : 'exit', undefined, true);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        const inEl = inRef.current;
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!inEl) {
            return;
        }
        switch(animationState){
            case 'enter':
            case 'exit':
                inEl.style.setProperty(CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT, `${inEl.scrollHeight}px`);
                break;
            case 'entered':
            case 'exited':
                inEl.style.removeProperty(CUSTOM_PROPERTY_ACCORDION_CONTENT_HEIGHT);
                break;
        }
    }, [
        animationState,
        inRef
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
        ref: getRootRef,
        id: contentId,
        role: "region",
        "aria-labelledby": labelId,
        "aria-hidden": !expanded,
        className: (0, _vkjs.classNames)("vkuiAccordionContent", className)
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
            ref: inRef,
            className: (0, _vkjs.classNames)("vkuiAccordionContent__in", stateClassNames[animationState])
        }, animationHandlers), {
            children: children
        }))
    }));
};
AccordionContent.displayName = 'AccordionContent';

//# sourceMappingURL=AccordionContent.js.map