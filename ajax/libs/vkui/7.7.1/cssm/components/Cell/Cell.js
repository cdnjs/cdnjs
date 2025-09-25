'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { Removable } from "../Removable/Removable.js";
import { SimpleCell } from "../SimpleCell/SimpleCell.js";
import { CellCheckbox } from "./CellCheckbox/CellCheckbox.js";
import { CellDragger } from "./CellDragger/CellDragger.js";
import { DEFAULT_DRAGGABLE_LABEL } from "./constants.js";
import styles from "./Cell.module.css";
/**
 * @see https://vkui.io/components/cell
 */ export const Cell = ({ mode, onRemove, removePlaceholder = 'Удалить', onDragFinish, before, after, disabled, draggable, Component: ComponentProps, onChange, name, value, checked, defaultChecked, getRootRef, draggerLabel = DEFAULT_DRAGGABLE_LABEL, className, style, toggleButtonTestId, removeButtonTestId, draggerTestId, href: hrefProp, ...restProps })=>{
    const [dragging, setDragging] = React.useState(false);
    const selectable = mode === 'selectable';
    const removable = mode === 'removable';
    const Component = selectable ? 'label' : ComponentProps;
    const href = selectable ? undefined : hrefProp;
    const platform = usePlatform();
    const rootElRef = useExternRef(getRootRef);
    const dragger = draggable ? /*#__PURE__*/ _jsx(CellDragger, {
        elRef: rootElRef,
        className: classNames(styles.dragger, !before && !selectable && styles.controlNoBefore),
        onDragStateChange: setDragging,
        onDragFinish: onDragFinish,
        "data-testid": draggerTestId,
        children: draggerLabel
    }) : null;
    let checkbox;
    if (selectable) {
        const checkboxProps = {
            name,
            value,
            defaultChecked,
            checked,
            disabled,
            onChange
        };
        checkbox = /*#__PURE__*/ _jsx(CellCheckbox, {
            className: classNames(styles.checkbox, !before && styles.controlNoBefore),
            ...checkboxProps
        });
    }
    const hasActive = !disabled && !dragging;
    const cellClasses = classNames(styles.host, dragging && styles.dragging, platform === 'ios' && styles.ios, removable && styles.removable);
    const simpleCellProps = {
        hasActive: hasActive,
        hasHover: hasActive && !removable,
        disabled,
        href,
        ...restProps,
        className: styles.content,
        // чтобы свойство, если не определено, не присутствовало в
        // restProps явно как {'Component': undefined} и ниже не переопределяло
        // возможное значение commonProps.Component = 'a' при слиянии двух объектов, как
        // {...commonProps, ...restProps}
        ...Component && {
            Component
        },
        before: /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                draggable && platform !== 'ios' && dragger,
                selectable && checkbox,
                before
            ]
        }),
        after: /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                draggable && platform === 'ios' && dragger,
                after
            ]
        })
    };
    if (removable) {
        return /*#__PURE__*/ _jsx(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>onRemove?.(e, rootElRef.current),
            toggleButtonTestId: toggleButtonTestId,
            removeButtonTestId: removeButtonTestId,
            disabled: disabled,
            children: platform === 'ios' ? ({ isRemoving })=>{
                return /*#__PURE__*/ _jsx(SimpleCell, {
                    ...simpleCellProps,
                    ...isRemoving ? {
                        onClick: undefined
                    } : {}
                });
            } : /*#__PURE__*/ _jsx(SimpleCell, {
                ...simpleCellProps
            })
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef,
        children: /*#__PURE__*/ _jsx(SimpleCell, {
            ...simpleCellProps
        })
    });
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map