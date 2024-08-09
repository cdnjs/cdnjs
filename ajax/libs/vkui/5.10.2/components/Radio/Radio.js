import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Text } from "../Typography/Text/Text";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
var sizeYClassNames = _define_property({
    none: "vkuiRadio--sizeY-none"
}, SizeType.COMPACT, "vkuiRadio--sizeY-compact");
var RadioIcon = function(props) {
    return /*#__PURE__*/ React.createElement("svg", _object_spread({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        "aria-hidden": true
    }, props), /*#__PURE__*/ React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "11",
        stroke: "currentColor",
        strokeWidth: "2",
        fill: "none"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "7.5",
        className: "vkuiRadio__pin",
        fill: "currentColor"
    }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */ export var Radio = function(_param) {
    var children = _param.children, description = _param.description, style = _param.style, className = _param.className, getRootRef = _param.getRootRef, titleAfter = _param.titleAfter, getRef = _param.getRef, labelProps = _param.labelProps, restProps = _object_without_properties(_param, [
        "children",
        "description",
        "style",
        "className",
        "getRootRef",
        "titleAfter",
        "getRef",
        "labelProps"
    ]);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        Component: "label",
        style: style,
        className: classNames("vkuiRadio", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
        disabled: restProps.disabled,
        getRootRef: getRootRef
    }, labelProps), /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        type: "radio",
        getRootRef: getRef,
        className: "vkuiRadio__input"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRadio__container"
    }, /*#__PURE__*/ React.createElement(RadioIcon, {
        className: "vkuiRadio__icon"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRadio__content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRadio__title"
    }, /*#__PURE__*/ React.createElement(Text, null, children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRadio__titleAfter"
    }, titleAfter)), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiRadio__description"
    }, description))));
};

//# sourceMappingURL=Radio.js.map