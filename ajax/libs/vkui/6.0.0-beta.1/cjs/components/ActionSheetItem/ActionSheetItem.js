"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetItem", {
    enumerable: true,
    get: function() {
        return ActionSheetItem;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _ActionSheetContext = require("../ActionSheet/ActionSheetContext");
const _Tappable = require("../Tappable/Tappable");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Text = require("../Typography/Text/Text");
const _Title = require("../Typography/Title/Title");
const _Radio = require("./subcomponents/Radio/Radio");
const ActionSheetItem = (_param)=>{
    var { children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "autoCloseDisabled",
        "mode",
        "meta",
        "subtitle",
        "before",
        "after",
        "selectable",
        "value",
        "name",
        "checked",
        "defaultChecked",
        "onChange",
        "onClick",
        "onImmediateClick",
        "multiline",
        "iconChecked",
        "className",
        "isCancelItem"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { onItemClick = ()=>_vkjs.noop, mode: actionSheetMode } = _react.useContext(_ActionSheetContext.ActionSheetContext);
    const { sizeY } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, Component && {
        Component
    }, restProps), {
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === 'ios' ? "vkuiActionSheetItem--active" : undefined,
        className: (0, _vkjs.classNames)("vkuiActionSheetItem", platform === 'ios' && "vkuiActionSheetItem--ios", mode === 'cancel' && "vkuiActionSheetItem--mode-cancel", mode === 'destructive' && "vkuiActionSheetItem--mode-destructive", sizeY === 'compact' && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === 'menu' && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className)
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
    }, platform === 'ios' ? /*#__PURE__*/ _react.createElement(_Title.Title, {
        className: "vkuiActionSheetItem__children",
        weight: mode === 'cancel' ? '2' : '3',
        level: isCentered ? '2' : '3'
    }, children) : /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiActionSheetItem__children"
    }, children), meta && /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiActionSheetItem__meta"
    }, meta)), subtitle && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiActionSheetItem__subtitle"
    }, subtitle)), (selectable || after) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__after"
    }, after, selectable && /*#__PURE__*/ _react.createElement(_Radio.Radio, {
        name: name,
        value: value,
        onChange: onChange,
        onClick: onItemClick({
            action: _vkjs.noop,
            immediateAction: _vkjs.noop,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map