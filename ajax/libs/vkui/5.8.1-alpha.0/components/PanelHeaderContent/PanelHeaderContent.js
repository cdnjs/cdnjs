import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { RootComponent } from "../RootComponent/RootComponent";
import { Tappable } from "../Tappable/Tappable";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Headline } from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
var platformClassNames = {
    ios: "vkuiPanelHeaderContent--ios",
    android: "vkuiPanelHeaderContent--android",
    vkcom: "vkuiPanelHeaderContent--vkcom"
};
var PanelHeaderChildren = function(param) {
    var hasStatus = param.hasStatus, hasBefore = param.hasBefore, children = param.children;
    var platform = usePlatform();
    if (platform === Platform.VKCOM) {
        return /*#__PURE__*/ React.createElement(Text, {
            className: "vkuiPanelHeaderContent__childrenText",
            Component: "div",
            weight: "2"
        }, children);
    }
    return hasStatus || hasBefore ? /*#__PURE__*/ React.createElement(Headline, {
        className: "vkuiPanelHeaderContent__childrenText",
        Component: "div",
        weight: "2"
    }, children) : /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContent__children-in"
    }, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderContent
 */ export var PanelHeaderContent = function(_param) {
    var aside = _param.aside, status = _param.status, before = _param.before, children = _param.children, onClick = _param.onClick, restProps = _object_without_properties(_param, [
        "aside",
        "status",
        "before",
        "children",
        "onClick"
    ]);
    var InComponent = onClick ? Tappable : "div";
    var rootProps = onClick ? {} : restProps;
    var platform = usePlatform();
    var inProps = onClick ? _object_spread_props(_object_spread({}, restProps), {
        onClick: onClick,
        activeEffectDelay: 200,
        hasActive: platform === Platform.IOS,
        activeMode: "opacity"
    }) : {};
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, rootProps), {
        baseClassName: classNames("vkuiPanelHeaderContent", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android)
    }), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContent__before"
    }, before), /*#__PURE__*/ React.createElement(InComponent, _object_spread_props(_object_spread({}, inProps), {
        className: classNames("vkuiPanelHeaderContent__in", !before && platform !== Platform.ANDROID && "vkuiPanelHeaderContent__in--centered")
    }), hasReactNode(status) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiPanelHeaderContent__status"
    }, status), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContent__children"
    }, /*#__PURE__*/ React.createElement(PanelHeaderChildren, {
        hasStatus: hasReactNode(status),
        hasBefore: hasReactNode(before)
    }, children), hasReactNode(aside) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContent__aside"
    }, aside)), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPanelHeaderContent__width"
    })));
};

//# sourceMappingURL=PanelHeaderContent.js.map