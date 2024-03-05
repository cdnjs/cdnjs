import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { RootComponent } from '../../RootComponent/RootComponent';
import { Footnote } from '../../Typography/Footnote/Footnote';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
const sizeYClassNames = {
    none: "vkuiChip--sizeY-none",
    compact: "vkuiChip--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */ export const Chip = (_param)=>{
    var { Component = 'span', value = '', removable = true, onRemove = noop, removeLabel = 'Удалить', before, after, disabled, readOnly, children, className, onFocus: onFocusProp, onBlur: onBlurProp } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "value",
        "removable",
        "onRemove",
        "removeLabel",
        "before",
        "after",
        "disabled",
        "readOnly",
        "children",
        "className",
        "onFocus",
        "onBlur"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const { focusVisible, onFocus, onBlur } = useFocusVisible();
    const focusVisibleClassName = useFocusVisibleClassName({
        focusVisible
    });
    const handleFocus = (event)=>{
        if (onFocusProp) {
            onFocusProp(event);
        }
        onFocus(event);
    };
    const handleBlur = (event)=>{
        if (onBlurProp) {
            onBlurProp(event);
        }
        onBlur(event);
    };
    const onRemoveWrapper = React.useCallback((event)=>{
        onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        className: classNames("vkuiChip", sizeY !== 'regular' && sizeYClassNames[sizeY], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiChip__in"
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiChip__before"
    }, before), /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiChip__content"
    }, children), hasReactNode(after) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiChip__after"
    }, after)), !readOnly && removable && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiChip__removable"
    }, /*#__PURE__*/ React.createElement("button", {
        tabIndex: -1,
        disabled: disabled,
        className: "vkuiChip__remove",
        onClick: disabled ? undefined : onRemoveWrapper
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "  ", removeLabel, " ", children), /*#__PURE__*/ React.createElement(Icon16Cancel, null))));
};

//# sourceMappingURL=Chip.js.map