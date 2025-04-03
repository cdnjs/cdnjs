'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */ export const Cell = (_param)=>{
    var { mode, onRemove, removePlaceholder = 'Удалить', onDragFinish, before, after, disabled, draggable, Component: ComponentProps, onChange, name, value, checked, defaultChecked, getRootRef, draggerLabel = DEFAULT_DRAGGABLE_LABEL, className, style, toggleButtonTestId, removeButtonTestId } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "onRemove",
        "removePlaceholder",
        "onDragFinish",
        "before",
        "after",
        "disabled",
        "draggable",
        "Component",
        "onChange",
        "name",
        "value",
        "checked",
        "defaultChecked",
        "getRootRef",
        "draggerLabel",
        "className",
        "style",
        "toggleButtonTestId",
        "removeButtonTestId"
    ]);
    const [dragging, setDragging] = React.useState(false);
    const selectable = mode === 'selectable';
    const removable = mode === 'removable';
    const Component = selectable ? 'label' : ComponentProps;
    const platform = usePlatform();
    const rootElRef = useExternRef(getRootRef);
    const dragger = draggable ? /*#__PURE__*/ _jsx(CellDragger, {
        elRef: rootElRef,
        className: classNames("vkuiCell__dragger", !before && !selectable && "vkuiCell__controlNoBefore"),
        onDragStateChange: setDragging,
        onDragFinish: onDragFinish,
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
        checkbox = /*#__PURE__*/ _jsx(CellCheckbox, _object_spread({
            className: classNames("vkuiCell__checkbox", !before && "vkuiCell__controlNoBefore")
        }, checkboxProps));
    }
    const hasActive = !disabled && !dragging;
    const cellClasses = classNames("vkuiCell__host", dragging && "vkuiCell__dragging", platform === 'ios' && "vkuiCell__ios", removable && "vkuiCell__removable", Component === 'label' && "vkuiCell__selectable");
    const simpleCellProps = _object_spread_props(_object_spread(_object_spread_props(_object_spread({
        hasActive: hasActive,
        hasHover: hasActive && !removable,
        disabled
    }, restProps), {
        className: "vkuiCell__content"
    }), Component && {
        Component
    }), {
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
    });
    if (removable) {
        return /*#__PURE__*/ _jsx(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootElRef.current),
            toggleButtonTestId: toggleButtonTestId,
            removeButtonTestId: removeButtonTestId,
            disabled: disabled,
            children: platform === 'ios' ? ({ isRemoving })=>{
                return /*#__PURE__*/ _jsx(SimpleCell, _object_spread({}, simpleCellProps, isRemoving ? {
                    onClick: undefined
                } : {}));
            } : /*#__PURE__*/ _jsx(SimpleCell, _object_spread({}, simpleCellProps))
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef,
        children: /*#__PURE__*/ _jsx(SimpleCell, _object_spread({}, simpleCellProps))
    });
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map