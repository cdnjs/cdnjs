import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
import { ScrollSaver } from "./ScrollSaver";
var warn = warnOnce("Epic");
/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */ export var Epic = function(_param) {
    var activeStory = _param.activeStory, tabbar = _param.tabbar, children = _param.children, restProps = _object_without_properties(_param, [
        "activeStory",
        "tabbar",
        "children"
    ]);
    var scroll = React.useRef({}).current;
    var _React_Children_toArray_find;
    var story = (_React_Children_toArray_find = React.Children.toArray(children).find(function(story) {
        return /*#__PURE__*/ React.isValidElement(story) && getNavId(story.props, warn) === activeStory;
    })) !== null && _React_Children_toArray_find !== void 0 ? _React_Children_toArray_find : null;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiEpic", tabbar && "vkuiInternalEpic--hasTabbar")
    }), /*#__PURE__*/ React.createElement(ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: function(value) {
            return scroll[activeStory] = value;
        }
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map