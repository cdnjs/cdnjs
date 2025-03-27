'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useCSSTransition } from "../../lib/animation/useCSSTransition.js";
import styles from "./ModalOverlay.module.css";
const positionClassNames = {
    absolute: styles.hostPositionAbsolute,
    fixed: styles.hostPositionFixed
};
const transitionStateClassNames = {
    appear: styles['hostStateEnter'],
    appearing: styles['hostStateEntering'],
    appeared: styles['hostStateEntered'],
    enter: styles['hostStateEnter'],
    entering: styles['hostStateEntering'],
    entered: styles['hostStateEntered'],
    exit: styles['hostStateExit'],
    exiting: styles['hostStateExiting'],
    exited: styles['hostStateExited']
};
/**
 * @private
 */ export const ModalOverlay = ({ visible = false, position = 'absolute', getRootRef, onClick, ...restProps })=>{
    const [transitionState, { ref, onTransitionEnd }] = useCSSTransition(visible, {
        enableAppear: true
    });
    const handleRef = useExternRef(getRootRef, ref);
    return /*#__PURE__*/ _jsx("div", {
        ...restProps,
        ref: handleRef,
        "aria-hidden": "true",
        hidden: transitionState === 'exited',
        className: classNames(styles.host, onClick === undefined && styles.nonInteractive, positionClassNames[position], transitionStateClassNames[transitionState]),
        onClick: onClick,
        onTransitionEnd: onTransitionEnd
    });
};

//# sourceMappingURL=ModalOverlay.js.map