'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon24Reorder, Icon24ReorderIos } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useDraggableWithDomApi } from "../../../hooks/useDraggableWithDomApi/index.js";
import { usePlatform } from "../../../hooks/usePlatform.js";
import { useIsomorphicLayoutEffect } from "../../../lib/useIsomorphicLayoutEffect.js";
import { Touch } from "../../Touch/Touch.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./CellDragger.module.css";
export const CellDragger = ({ elRef, disabled, className, onDragStateChange, onDragFinish, children, ...restProps })=>{
    const platform = usePlatform();
    const Icon = platform === 'ios' ? Icon24ReorderIos : Icon24Reorder;
    const { dragging, onDragStart, onDragMove, onDragEnd } = useDraggableWithDomApi({
        elRef,
        onDragFinish
    });
    useIsomorphicLayoutEffect(()=>{
        if (onDragStateChange) {
            onDragStateChange(dragging);
        }
    }, [
        dragging,
        onDragStateChange
    ]);
    return /*#__PURE__*/ _jsxs(Touch, {
        className: classNames(styles.host, className),
        onStart: disabled ? undefined : onDragStart,
        onMoveY: disabled ? undefined : onDragMove,
        onEnd: disabled ? undefined : onDragEnd,
        ...restProps,
        children: [
            children && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ _jsx(Icon, {
                className: styles.icon
            })
        ]
    });
};

//# sourceMappingURL=CellDragger.js.map