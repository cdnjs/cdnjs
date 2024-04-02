import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import { Radio } from './subcomponents/Radio/Radio';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ export const ActionSheetItem = (_param)=>{
    var { children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem } = _param, restProps = _object_without_properties(_param, [
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
    const platform = usePlatform();
    const { onItemClick = ()=>noop, mode: actionSheetMode } = React.useContext(ActionSheetContext);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, Component && {
        Component
    }, restProps), {
        onClick: selectable ? onClick : onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        activeMode: platform === 'ios' ? "vkuiActionSheetItem--active" : undefined,
        className: classNames("vkuiActionSheetItem", platform === 'ios' && "vkuiActionSheetItem--ios", mode === 'cancel' && "vkuiActionSheetItem--mode-cancel", mode === 'destructive' && "vkuiActionSheetItem--mode-destructive", sizeY === 'compact' && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === 'menu' && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className)
    }), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiActionSheetItem__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
    }, platform === 'ios' ? /*#__PURE__*/ React.createElement(Title, {
        className: "vkuiActionSheetItem__children",
        weight: mode === 'cancel' ? '2' : '3',
        level: isCentered ? '2' : '3'
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
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        }),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map