"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AlertActions", {
    enumerable: true,
    get: function() {
        return AlertActions;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _AlertAction = require("./AlertAction");
var alignStyles = {
    left: "vkuiAlert__actions--align-left",
    center: "vkuiAlert__actions--align-center",
    right: "vkuiAlert__actions--align-right"
};
var directionStyles = {
    vertical: "vkuiAlert__actions--direction-vertical",
    horizontal: "vkuiAlert__actions--direction-horizontal"
};
var AlertActions = function(param) {
    var _param_actions = param.actions, actions = _param_actions === void 0 ? [] : _param_actions, _param_renderAction = param.renderAction, renderAction = _param_renderAction === void 0 ? function(props) {
        return /*#__PURE__*/ _react.createElement(_AlertAction.AlertAction, props);
    } : _param_renderAction, onItemClick = param.onItemClick, actionsAlign = param.actionsAlign, actionsLayout = param.actionsLayout;
    var platform = (0, _usePlatform.usePlatform)();
    var direction = platform === _platform.Platform.VKCOM ? "horizontal" : actionsLayout;
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiAlert__actions", actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction])
    }, actions.map(function(action, i) {
        // Убираем
        var children = action.title, _ = action.action, autoClose = action.autoClose, restProps = _object_without_properties._(action, [
            "title",
            "action",
            "autoClose"
        ]);
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: i
        }, renderAction(_object_spread._({
            children: children,
            onClick: function() {
                return onItemClick(action);
            }
        }, restProps)));
    }));
};

//# sourceMappingURL=AlertActions.js.map