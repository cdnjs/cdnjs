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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _ActionSheetContext = require("../ActionSheet/ActionSheetContext");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var _Radio = require("./subcomponents/Radio/Radio");
var ActionSheetItem = function(_param) {
    var children = _param.children, autoClose = _param.autoClose, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, meta = _param.meta, subtitle = _param.subtitle, before = _param.before, after = _param.after, selectable = _param.selectable, value = _param.value, name = _param.name, checked = _param.checked, defaultChecked = _param.defaultChecked, onChange = _param.onChange, onClick = _param.onClick, onImmediateClick = _param.onImmediateClick, _param_multiline = _param.multiline, multiline = _param_multiline === void 0 ? false : _param_multiline, iconChecked = _param.iconChecked, className = _param.className, isCancelItem = _param.isCancelItem, restProps = _object_without_properties._(_param, [
        "children",
        "autoClose",
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
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useContext = _react.useContext(_ActionSheetContext.ActionSheetContext), _React_useContext_onItemClick = _React_useContext.onItemClick, onItemClick = _React_useContext_onItemClick === void 0 ? function() {
        return _vkjs.noop;
    } : _React_useContext_onItemClick, actionSheetMode = _React_useContext.mode;
    var sizeY = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().sizeY;
    var Component = restProps.href ? "a" : "div";
    if (selectable) {
        Component = "label";
    }
    var isRich = subtitle || meta || selectable;
    var isCentered = !isRich && !before && platform === _platform.Platform.IOS;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: Component
    }, restProps), {
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === _platform.Platform.IOS ? "vkuiActionSheetItem--active" : undefined,
        className: (0, _vkjs.classNames)("vkuiActionSheetItem", platform === _platform.Platform.IOS && "vkuiActionSheetItem--ios", mode === "cancel" && "vkuiActionSheetItem--mode-cancel", mode === "destructive" && "vkuiActionSheetItem--mode-destructive", sizeY === _adaptivity.SizeType.COMPACT && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === "menu" && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className)
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_Title.Title, {
        className: "vkuiActionSheetItem__children",
        weight: mode === "cancel" ? "2" : "3",
        level: isCentered ? "2" : "3"
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
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map