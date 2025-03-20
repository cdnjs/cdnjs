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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _usePlatform = require("../../hooks/usePlatform");
const _Removable = require("../Removable/Removable");
const _SimpleCell = require("../SimpleCell/SimpleCell");
const _CellCheckbox = require("./CellCheckbox/CellCheckbox");
const _CellDragger = require("./CellDragger/CellDragger");
const _constants = require("./constants");
const Cell = (_param)=>{
    var { mode, onRemove, removePlaceholder = 'Удалить', onDragFinish, before, after, disabled, draggable, Component: ComponentProps, onChange, name, value, checked, defaultChecked, getRootRef, draggerLabel = _constants.DEFAULT_DRAGGABLE_LABEL, className, style, toggleButtonTestId, removeButtonTestId } = _param, restProps = _object_without_properties._(_param, [
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
    const [dragging, setDragging] = _react.useState(false);
    const selectable = mode === 'selectable';
    const removable = mode === 'removable';
    const Component = selectable ? 'label' : ComponentProps;
    const platform = (0, _usePlatform.usePlatform)();
    const rootElRef = (0, _useExternRef.useExternRef)(getRootRef);
    const dragger = draggable ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_CellDragger.CellDragger, {
        elRef: rootElRef,
        className: (0, _vkjs.classNames)("vkuiCell__dragger", !before && !selectable && "vkuiCell__control--noBefore"),
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
        checkbox = /*#__PURE__*/ (0, _jsxruntime.jsx)(_CellCheckbox.CellCheckbox, _object_spread._({
            className: (0, _vkjs.classNames)("vkuiCell__checkbox", !before && "vkuiCell__control--noBefore")
        }, checkboxProps));
    }
    const hasActive = !disabled && !dragging;
    const cellClasses = (0, _vkjs.classNames)("vkuiCell", dragging && "vkuiCell--dragging", platform === 'ios' && "vkuiCell--ios", removable && "vkuiCell--removable", Component === 'label' && "vkuiCell--selectable");
    const simpleCellProps = _object_spread_props._(_object_spread._(_object_spread_props._(_object_spread._({
        hasActive: hasActive,
        hasHover: hasActive && !removable,
        disabled
    }, restProps), {
        className: "vkuiCell__content"
    }), Component && {
        Component
    }), {
        before: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
            children: [
                draggable && platform !== 'ios' && dragger,
                selectable && checkbox,
                before
            ]
        }),
        after: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
            children: [
                draggable && platform === 'ios' && dragger,
                after
            ]
        })
    });
    if (removable) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Removable.Removable, {
            className: (0, _vkjs.classNames)(cellClasses, className),
            style: style,
            getRootRef: rootElRef,
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootElRef.current),
            toggleButtonTestId: toggleButtonTestId,
            removeButtonTestId: removeButtonTestId,
            disabled: disabled,
            children: platform === 'ios' ? ({ isRemoving })=>{
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_SimpleCell.SimpleCell, _object_spread._({}, simpleCellProps, isRemoving ? {
                    onClick: undefined
                } : {}));
            } : /*#__PURE__*/ (0, _jsxruntime.jsx)(_SimpleCell.SimpleCell, _object_spread._({}, simpleCellProps))
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: (0, _vkjs.classNames)(cellClasses, className),
        style: style,
        ref: rootElRef,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_SimpleCell.SimpleCell, _object_spread._({}, simpleCellProps))
    });
};
Cell.Checkbox = _CellCheckbox.CellCheckbox;

//# sourceMappingURL=Cell.js.map