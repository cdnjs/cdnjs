import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { callMultiple } from '../../../lib/callMultiple';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = (_param)=>{
    var { getRef, className, style, children, getRootRef, before } = _param, restProps = _object_without_properties(_param, [
        "getRef",
        "className",
        "style",
        "children",
        "getRootRef",
        "before"
    ]);
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible
    });
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", focusVisibleClassNames, className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    })), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSegmentedControlOption__before"
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        level: "2",
        weight: "2"
    }, children));
};

//# sourceMappingURL=SegmentedControlOption.js.map