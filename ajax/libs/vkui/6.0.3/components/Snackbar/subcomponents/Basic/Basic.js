import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../../RootComponent/RootComponent';
import { Paragraph } from '../../../Typography/Paragraph/Paragraph';
import { Subhead } from '../../../Typography/Subhead/Subhead';
const stylesLayout = {
    vertical: "vkuiSnackbar--layout-vertical",
    horizontal: "vkuiSnackbar--layout-horizontal"
};
export function Basic(_param) {
    var { layout: layoutProps, action, after, before, mode, subtitle, children } = _param, restProps = _object_without_properties(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    const layout = layoutProps || (after || subtitle ? 'vertical' : 'horizontal');
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiSnackbar__body", stylesLayout[layout], mode === 'dark' && "vkuiSnackbar--mode-dark")
    }, restProps), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSnackbar__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSnackbar__content"
    }, /*#__PURE__*/ React.createElement(Paragraph, {
        className: "vkuiSnackbar__content-text"
    }, children), subtitle && !action && /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiSnackbar__content-subtitle"
    }, subtitle), action && !subtitle && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSnackbar__action"
    }, action)), after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSnackbar__after"
    }, after));
}

//# sourceMappingURL=Basic.js.map