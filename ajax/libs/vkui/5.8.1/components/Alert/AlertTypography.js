import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from "react";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { Caption } from "../Typography/Caption/Caption";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
export var AlertHeader = function(props) {
    var platform = usePlatform();
    switch(platform){
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "1",
                level: "3"
            }, props));
        default:
            return /*#__PURE__*/ React.createElement(Title, _object_spread({
                className: "vkuiAlert__header",
                weight: "2",
                level: "2"
            }, props));
    }
};
export var AlertText = function(props) {
    var platform = usePlatform();
    switch(platform){
        case Platform.VKCOM:
            return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Caption, _object_spread({
                className: "vkuiAlert__text"
            }, props));
        default:
            return /*#__PURE__*/ React.createElement(Text, _object_spread({
                Component: "span",
                className: "vkuiAlert__text",
                weight: "3"
            }, props));
    }
};

//# sourceMappingURL=AlertTypography.js.map