import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { ListContext } from "../List/ListContext";
import { Removable } from "../Removable/Removable";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import { CellCheckbox } from "./CellCheckbox/CellCheckbox";
import { CellDragger } from "./CellDragger/CellDragger";
import { useDraggable } from "./useDraggable";
/**
 * @see https://vkcom.github.io/VKUI/#/Cell
 */ export var Cell = function(_param) {
    var mode = _param.mode, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, onDragFinish = _param.onDragFinish, before = _param.before, after = _param.after, disabled = _param.disabled, draggable = _param.draggable, ComponentProps = _param.Component, onChange = _param.onChange, name = _param.name, value = _param.value, checked = _param.checked, defaultChecked = _param.defaultChecked, getRootRef = _param.getRootRef, _param_draggerLabel = _param.draggerLabel, draggerLabel = _param_draggerLabel === void 0 ? "Перенести ячейку" : _param_draggerLabel, className = _param.className, style = _param.style, restProps = _object_without_properties(_param, [
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
    var selectable = mode === "selectable";
    var removable = mode === "removable";
    var Component = selectable ? "label" : ComponentProps;
    var platform = usePlatform();
    var rootElRef = useExternRef(getRootRef);
    var _useDraggable = useDraggable({
        rootElRef: rootElRef,
        onDragFinish: onDragFinish
    }), dragging = _useDraggable.dragging, draggableProps = _object_without_properties(_useDraggable, [
        "dragging"
    ]);
    var toggleDrag = React.useContext(ListContext).toggleDrag;
    React.useEffect(function() {
        if (dragging) {
            toggleDrag(true);
            return function() {
                return toggleDrag(false);
            };
        }
        return undefined;
    }, [
        dragging,
        toggleDrag
    ]);
    var dragger;
    if (draggable) {
        dragger = /*#__PURE__*/ React.createElement(CellDragger, _object_spread({
            className: "vkuiCell__dragger",
            "aria-label": draggerLabel
        }, draggableProps));
    }
    var checkbox;
    if (selectable) {
        var checkboxProps = {
            name: name,
            value: value,
            onChange: onChange,
            defaultChecked: defaultChecked,
            checked: checked,
            disabled: disabled
        };
        checkbox = /*#__PURE__*/ React.createElement(CellCheckbox, _object_spread({
            className: "vkuiCell__checkbox"
        }, checkboxProps));
    }
    var simpleCellDisabled = draggable && !selectable || removable || disabled;
    var hasActive = !simpleCellDisabled && !dragging;
    var cellClasses = classNames("vkuiCell", platform === Platform.IOS && "vkuiCell--ios", dragging && "vkuiCell--dragging", removable && "vkuiCell--removable", Component === "label" && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
    var simpleCell = /*#__PURE__*/ React.createElement(SimpleCell, _object_spread_props(_object_spread({
        hasActive: hasActive,
        hasHover: hasActive
    }, restProps), {
        className: "vkuiCell__content",
        disabled: simpleCellDisabled,
        Component: Component,
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform !== Platform.IOS && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, draggable && platform === Platform.IOS && dragger, after)
    }));
    if (removable) {
        return /*#__PURE__*/ React.createElement(Removable, {
            className: classNames(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: function(e) {
                return onRemove(e, rootElRef.current);
            }
        }, simpleCell);
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(cellClasses, className),
        style: style,
        ref: rootElRef
    }, simpleCell);
};
Cell.Checkbox = CellCheckbox;

//# sourceMappingURL=Cell.js.map