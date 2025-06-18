'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useCSSTransition } from "../../lib/animation/useCSSTransition.js";
const positionClassNames = {
    absolute: "vkuiModalOverlay__hostPositionAbsolute",
    fixed: "vkuiModalOverlay__hostPositionFixed"
};
const transitionStateClassNames = {
    appear: "vkuiModalOverlay__hostStateEnter",
    appearing: "vkuiModalOverlay__hostStateEntering",
    appeared: "vkuiModalOverlay__hostStateEntered",
    enter: "vkuiModalOverlay__hostStateEnter",
    entering: "vkuiModalOverlay__hostStateEntering",
    entered: "vkuiModalOverlay__hostStateEntered",
    exit: "vkuiModalOverlay__hostStateExit",
    exiting: "vkuiModalOverlay__hostStateExiting",
    exited: "vkuiModalOverlay__hostStateExited"
};
/**
 * @private
 */ export const ModalOverlay = (_param)=>{
    var { visible = false, position = 'absolute', getRootRef, onClick } = _param, restProps = _object_without_properties(_param, [
        "visible",
        "position",
        "getRootRef",
        "onClick"
    ]);
    const [transitionState, { ref, onTransitionEnd }] = useCSSTransition(visible, {
        enableAppear: true
    });
    const handleRef = useExternRef(getRootRef, ref);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({}, restProps), {
        ref: handleRef,
        "aria-hidden": "true",
        hidden: transitionState === 'exited',
        className: classNames("vkuiModalOverlay__host", onClick === undefined && "vkuiModalOverlay__nonInteractive", positionClassNames[position], transitionStateClassNames[transitionState]),
        onClick: onClick,
        onTransitionEnd: onTransitionEnd
    }));
};

//# sourceMappingURL=ModalOverlay.js.map