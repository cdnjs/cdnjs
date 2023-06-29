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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _listContext = require("../List/ListContext");
var _removable = require("../Removable/Removable");
var _simpleCell = require("../SimpleCell/SimpleCell");
var _cellCheckbox = require("./CellCheckbox/CellCheckbox");
var _cellDragger = require("./CellDragger/CellDragger");
var _useDraggable = require("./useDraggable");
var Cell = function(_param) {
    var mode = _param.mode, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? _vkjs.noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, onDragFinish = _param.onDragFinish, before = _param.before, after = _param.after, disabled = _param.disabled, draggable = _param.draggable, Component = _param.Component, onChange = _param.onChange, name = _param.name, value = _param.value, checked = _param.checked, defaultChecked = _param.defaultChecked, getRootRef = _param.getRootRef, _param_draggerLabel = _param.draggerLabel, draggerLabel = _param_draggerLabel === void 0 ? "Перенести ячейку" : _param_draggerLabel, className = _param.className, style = _param.style, restProps = _objectWithoutProperties(_param, [
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
    var platform = (0, _usePlatform.usePlatform)();
    var rootElRef = (0, _useExternRef.useExternRef)(getRootRef);
    var _useDraggable1 = (0, _useDraggable.useDraggable)({
        rootElRef: rootElRef,
        onDragFinish: onDragFinish
    }), dragging = _useDraggable1.dragging, draggableProps = _objectWithoutProperties(_useDraggable1, [
        "dragging"
    ]);
    var toggleDrag = _react.useContext(_listContext.ListContext).toggleDrag;
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
        dragger = /*#__PURE__*/ _react.createElement(_cellDragger.CellDragger, _objectSpread({
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
        checkbox = /*#__PURE__*/ _react.createElement(_cellCheckbox.CellCheckbox, _objectSpread({
            className: "vkuiCell__checkbox"
        }, checkboxProps));
    }
    var simpleCellDisabled = draggable && !selectable || removable || disabled;
    var hasActive = !simpleCellDisabled && !dragging;
    var cellClasses = (0, _vkjs.classNames)("vkuiCell", platform === _platform.Platform.IOS && "vkuiCell--ios", dragging && "vkuiCell--dragging", removable && "vkuiCell--removable", selectable && "vkuiCell--selectable", disabled && "vkuiCell--disabled");
    var simpleCell = /*#__PURE__*/ _react.createElement(_simpleCell.SimpleCell, _objectSpreadProps(_objectSpread({
        hasActive: hasActive,
        hasHover: hasActive
    }, restProps), {
        className: "vkuiCell__content",
        disabled: simpleCellDisabled,
        Component: selectable ? "label" : Component,
        before: /*#__PURE__*/ _react.createElement(_react.Fragment, null, draggable && platform !== _platform.Platform.IOS && dragger, selectable && checkbox, before),
        after: /*#__PURE__*/ _react.createElement(_react.Fragment, null, draggable && platform === _platform.Platform.IOS && dragger, after)
    }));
    if (removable) {
        return /*#__PURE__*/ _react.createElement(_removable.Removable, {
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

//# sourceMappingURL=Cell.js.map