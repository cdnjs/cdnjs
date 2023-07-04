"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Cell", {
    enumerable: true,
    get: function() {
        return Cell;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _ListContext = require("../List/ListContext");
var _Removable = require("../Removable/Removable");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var _CellCheckbox = require("./CellCheckbox/CellCheckbox");
var _CellDragger = require("./CellDragger/CellDragger");
var _useDraggable = require("./useDraggable");
var Cell = function(_param) {
    var mode = _param.mode, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, onDragFinish = _param.onDragFinish, before = _param.before, after = _param.after, disabled = _param.disabled, draggable = _param.draggable, ComponentProps = _param.Component, onChange = _param.onChange, name = _param.name, value = _param.value, checked = _param.checked, defaultChecked = _param.defaultChecked, getRootRef = _param.getRootRef, _param_draggerLabel = _param.draggerLabel, draggerLabel = _param_draggerLabel === void 0 ? "Перенести ячейку" : _param_draggerLabel, className = _param.className, style = _param.style, restProps = _object_without_properties._(_param, [
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
    var platform = (0, _usePlatform.usePlatform)();
    var rootElRef = (0, _useExternRef.useExternRef)(getRootRef);
    var _useDraggable1 = (0, _useDraggable.useDraggable)({
        rootElRef: rootElRef,
        onDragFinish: onDragFinish
    }), dragging = _useDraggable1.dragging, draggableProps = _object_without_properties._(_useDraggable1, [
        "dragging"
    ]);
    var toggleDrag = _react.useContext(_ListContext.ListContext).toggleDrag;
    _react.useEffect(function() {
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
        dragger = /*#__PURE__*/ _react.createElement(_CellDragger.CellDragger, _object_spread._({
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
        checkbox = /*#__PURE__*/ _react.createElement(_CellCheckbox.CellCheckbox, _object_spread._({
            className: "vkuiCell__checkbox"
        }, checkboxProps));
    }
    var simpleCellDisabled = draggable && !selectable || removable || disabled;
    var hasActive = !simpleCellDisabled && !dragging;
    var cellClasses = (0, _vkjs.classNames)("vkuiCell", platform === _platform.Platform.IOS && "vkuiCell--ios", dragging && "vkuiCell--dragging", removable && "vkuiCell--removable", Component === "label" && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
    var simpleCell = /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, _object_spread_props._(_object_spread._({
        hasActive: hasActive,
        hasHover: hasActive
    }, restProps), {
        className: "vkuiCell__content",
        disabled: simpleCellDisabled,
        Component: Component,
        before: /*#__PURE__*/ _react.createElement(_react.Fragment, null, draggable && platform !== _platform.Platform.IOS && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ _react.createElement(_react.Fragment, null, draggable && platform === _platform.Platform.IOS && dragger, after)
    }));
    if (removable) {
        return /*#__PURE__*/ _react.createElement(_Removable.Removable, {
            className: (0, _vkjs.classNames)(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: function(e) {
                return onRemove(e, rootElRef.current);
            }
        }, simpleCell);
    }
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)(cellClasses, className),
        style: style,
        ref: rootElRef
    }, simpleCell);
};
Cell.Checkbox = _CellCheckbox.CellCheckbox;

//# sourceMappingURL=Cell.js.map