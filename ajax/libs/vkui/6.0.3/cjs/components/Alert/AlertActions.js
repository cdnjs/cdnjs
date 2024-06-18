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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _AlertAction = require("./AlertAction");
const alignStyles = {
    left: "vkuiAlert__actions--align-left",
    center: "vkuiAlert__actions--align-center",
    right: "vkuiAlert__actions--align-right"
};
const directionStyles = {
    vertical: "vkuiAlert__actions--direction-vertical",
    horizontal: "vkuiAlert__actions--direction-horizontal"
};
const AlertActions = ({ actions = [], renderAction = (props)=>/*#__PURE__*/ _react.createElement(_AlertAction.AlertAction, props), onItemClick, actionsAlign, actionsLayout })=>{
    const platform = (0, _usePlatform.usePlatform)();
    const direction = platform === 'vkcom' ? 'horizontal' : actionsLayout;
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiAlert__actions", actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction])
    }, actions.map((action, i)=>{
        // Убираем
        const { title: children, action: _, autoCloseDisabled } = action, restProps = _object_without_properties._(action, [
            "title",
            "action",
            "autoCloseDisabled"
        ]);
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: i
        }, renderAction(_object_spread._({
            children,
            onClick: ()=>onItemClick(action)
        }, restProps)));
    }));
};

//# sourceMappingURL=AlertActions.js.map