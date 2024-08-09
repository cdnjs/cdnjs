import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { Removable } from "../Removable/Removable";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import { CellCheckbox } from "./CellCheckbox/CellCheckbox";
import { CellDragger } from "./CellDragger/CellDragger";
import { DEFAULT_DRAGGABLE_LABEL } from "./constants";
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */ export var Cell = function(_param) {
    var mode = _param.mode, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, onDragFinish = _param.onDragFinish, before = _param.before, after = _param.after, disabled = _param.disabled, draggable = _param.draggable, ComponentProps = _param.Component, onChange = _param.onChange, name = _param.name, value = _param.value, checked = _param.checked, defaultChecked = _param.defaultChecked, getRootRef = _param.getRootRef, _param_draggerLabel = _param.draggerLabel, draggerLabel = _param_draggerLabel === void 0 ? DEFAULT_DRAGGABLE_LABEL : _param_draggerLabel, className = _param.className, style = _param.style, restProps = _object_without_properties(_param, [
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
        "style"
    ]);
    var _React_useState = _sliced_to_array(React.useState(false), 2), dragging = _React_useState[0], setDragging = _React_useState[1];
    var selectable = mode === "selectable";
    var removable = mode === "removable";
    var Component = selectable ? "label" : ComponentProps;
    var platform = usePlatform();
    var rootElRef = useExternRef(getRootRef);
    var dragger = draggable ? /*#__PURE__*/ React.createElement(CellDragger, {
        elRef: rootElRef,
        className: "vkuiCell__dragger",
        "aria-label": draggerLabel,
        disabled: disabled,
        onDragStateChange: setDragging,
        onDragFinish: onDragFinish
    }) : null;
    var checkbox;
    if (selectable) {
        var checkboxProps = {
            name: name,
            value: value,
            defaultChecked: defaultChecked,
            checked: checked,
            disabled: disabled,
            onChange: onChange
        };
        checkbox = /*#__PURE__*/ React.createElement(CellCheckbox, _object_spread({
            className: "vkuiCell__checkbox"
        }, checkboxProps));
    }
    var simpleCellDisabled = draggable && !selectable || removable && !restProps.onClick || disabled;
    var hasActive = !simpleCellDisabled && !dragging;
    var cellClasses = classNames("vkuiCell", dragging && "vkuiCell--dragging", platform === Platform.IOS && "vkuiCell--ios", removable && "vkuiCell--removable", Component === "label" && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
    var simpleCellProps = _object_spread_props(_object_spread({
        hasActive: hasActive,
        hasHover: hasActive && !removable
    }, restProps), {
        className: "vkuiCell__content",
        disabled: simpleCellDisabled,
        Component: Component,
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform !== Platform.IOS && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform === Platform.IOS && dragger, after)
    });
    if (removable) {
        return /*#__PURE__*/ React.createElement(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: function(e) {
                return onRemove(e, rootElRef.current);
            }
        }, platform === Platform.IOS ? function(param) {
            var isRemoving = param.isRemoving;
            return /*#__PURE__*/ React.createElement(SimpleCell, _object_spread_props(_object_spread({}, simpleCellProps), {
                disabled: simpleCellProps.disabled || isRemoving
            }));
        } : /*#__PURE__*/ React.createElement(SimpleCell, simpleCellProps));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef
    }, /*#__PURE__*/ React.createElement(SimpleCell, simpleCellProps));
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map