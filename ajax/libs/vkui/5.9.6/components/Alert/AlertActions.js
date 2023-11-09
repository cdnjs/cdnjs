import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { AlertAction } from "./AlertAction";
var alignStyles = {
    left: "vkuiAlert__actions--align-left",
    center: "vkuiAlert__actions--align-center",
    right: "vkuiAlert__actions--align-right"
};
var directionStyles = {
    vertical: "vkuiAlert__actions--direction-vertical",
    horizontal: "vkuiAlert__actions--direction-horizontal"
};
export var AlertActions = function(param) {
    var _param_actions = param.actions, actions = _param_actions === void 0 ? [] : _param_actions, _param_renderAction = param.renderAction, renderAction = _param_renderAction === void 0 ? function(props) {
        return /*#__PURE__*/ React.createElement(AlertAction, props);
    } : _param_renderAction, onItemClick = param.onItemClick, actionsAlign = param.actionsAlign, actionsLayout = param.actionsLayout;
    var platform = usePlatform();
    var direction = platform === Platform.VKCOM ? "horizontal" : actionsLayout;
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiAlert__actions", actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction])
    }, actions.map(function(action, i) {
        // Убираем
        var children = action.title, _ = action.action, autoClose = action.autoClose, restProps = _object_without_properties(action, [
            "title",
            "action",
            "autoClose"
        ]);
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: i
        }, renderAction(_object_spread({
            children: children,
            onClick: function() {
                return onItemClick(action);
            }
        }, restProps)));
    }));
};

//# sourceMappingURL=AlertActions.js.map