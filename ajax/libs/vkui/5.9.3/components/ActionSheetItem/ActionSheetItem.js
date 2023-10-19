import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { ActionSheetContext } from "../ActionSheet/ActionSheetContext";
import { Tappable } from "../Tappable/Tappable";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
import { Radio } from "./subcomponents/Radio/Radio";
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export var ActionSheetItem = function(_param) {
    var children = _param.children, autoClose = _param.autoClose, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, meta = _param.meta, subtitle = _param.subtitle, before = _param.before, after = _param.after, selectable = _param.selectable, value = _param.value, name = _param.name, checked = _param.checked, defaultChecked = _param.defaultChecked, onChange = _param.onChange, onClick = _param.onClick, onImmediateClick = _param.onImmediateClick, _param_multiline = _param.multiline, multiline = _param_multiline === void 0 ? false : _param_multiline, iconChecked = _param.iconChecked, className = _param.className, isCancelItem = _param.isCancelItem, restProps = _object_without_properties(_param, [
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
    var platform = usePlatform();
    var _React_useContext = React.useContext(ActionSheetContext), _React_useContext_onItemClick = _React_useContext.onItemClick, onItemClick = _React_useContext_onItemClick === void 0 ? function() {
        return noop;
    } : _React_useContext_onItemClick, actionSheetMode = _React_useContext.mode;
    var sizeY = useAdaptivityWithJSMediaQueries().sizeY;
    var Component = restProps.href ? "a" : "div";
    if (selectable) {
        Component = "label";
    }
    var isRich = subtitle || meta || selectable;
    var isCentered = !isRich && !before && platform === Platform.IOS;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === Platform.IOS ? "vkuiActionSheetItem--active" : undefined,
        className: classNames("vkuiActionSheetItem", platform === Platform.IOS && "vkuiActionSheetItem--ios", mode === "cancel" && "vkuiActionSheetItem--mode-cancel", mode === "destructive" && "vkuiActionSheetItem--mode-destructive", sizeY === SizeType.COMPACT && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === "menu" && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className)
    }), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheetItem__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Title, {
        className: "vkuiActionSheetItem__children",
        weight: mode === "cancel" ? "2" : "3",
        level: isCentered ? "2" : "3"
    }, children) : /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiActionSheetItem__children"
    }, children), meta && /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiActionSheetItem__meta"
    }, meta)), subtitle && /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiActionSheetItem__subtitle"
    }, subtitle)), (selectable || after) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheetItem__after"
    }, after, selectable && /*#__PURE__*/ React.createElement(Radio, {
        name: name,
        value: value,
        onChange: onChange,
        onClick: onItemClick({
            action: noop,
            immediateAction: noop,
            autoClose: Boolean(autoClose),
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map