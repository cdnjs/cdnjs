"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheet", {
    enumerable: true,
    get: function() {
        return ActionSheet;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _Footnote = require("../Typography/Footnote/Footnote");
var _ActionSheetContext = require("./ActionSheetContext");
var _ActionSheetDefaultIosCloseItem = require("./ActionSheetDefaultIosCloseItem");
var _ActionSheetDropdownMenu = require("./ActionSheetDropdownMenu");
var _ActionSheetDropdownSheet = require("./ActionSheetDropdownSheet");
var warn = (0, _warnOnce.warnOnce)("ActionSheet");
var ActionSheet = function(_param) {
    var children = _param.children, className = _param.className, header = _param.header, text = _param.text, style = _param.style, iosCloseItem = _param.iosCloseItem, popupDirection = _param.popupDirection, popupOffsetDistance = _param.popupOffsetDistance, placement = _param.placement, modeProp = _param.mode, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupDirection",
        "popupOffsetDistance",
        "placement",
        "mode"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _sliced_to_array._(_react.useState(undefined), 2), closingBy = _React_useState[0], setClosingBy = _React_useState[1];
    var onClose = function() {
        return setClosingBy("other");
    };
    var _action = _react.useRef(_vkjs.noop);
    var afterClose = function() {
        restProps.onClose({
            closedBy: closingBy || "other"
        });
        _action.current();
        _action.current = _vkjs.noop;
    };
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var mode = modeProp !== null && modeProp !== void 0 ? modeProp : isDesktop ? "menu" : "sheet";
    (0, _ScrollContext.useScrollLock)(mode === "sheet");
    var timeout = platform === _platform.Platform.IOS ? 300 : 200;
    if (mode === "menu") {
        timeout = 0;
    }
    var fallbackTransitionFinish = (0, _useTimeout.useTimeout)(afterClose, timeout);
    _react.useEffect(function() {
        if (closingBy) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closingBy,
        fallbackTransitionFinish
    ]);
    var onItemClick = _react.useCallback(function(param) {
        var action = param.action, immediateAction = param.immediateAction, autoClose = param.autoClose, isCancelItem = param.isCancelItem;
        return function(event) {
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = function() {
                    return action && action(event);
                };
                setClosingBy(isCancelItem ? "cancel-item" : "action-item");
            } else {
                action && action(event);
            }
        };
    }, []);
    var contextValue = (0, _useObjectMemo.useObjectMemo)({
        onItemClick: onItemClick,
        mode: mode
    });
    var DropdownComponent = mode === "menu" ? _ActionSheetDropdownMenu.ActionSheetDropdownMenu : _ActionSheetDropdownSheet.ActionSheetDropdownSheet;
    if (process.env.NODE_ENV === "development" && popupDirection) {
        // TODO [>=6]: popupDirection
        warn('Свойство "popupDirection" будет удалено в v6. Используйте свойство "placement"');
    }
    popupDirection = popupDirection !== undefined ? popupDirection : "bottom";
    var dropdownProps = mode === "menu" ? Object.assign(restProps, {
        popupOffsetDistance: popupOffsetDistance,
        popupDirection: popupDirection,
        placement: placement
    }) : restProps;
    var actionSheet = /*#__PURE__*/ _react.createElement(_ActionSheetContext.ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ _react.createElement(DropdownComponent, _object_spread_props._(_object_spread._({
        closing: Boolean(closingBy),
        timeout: timeout
    }, dropdownProps), {
        onClose: onClose,
        className: mode === "menu" ? className : undefined,
        style: mode === "menu" ? style : undefined
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__content-wrapper"
    }, (header || text) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__header"
    }, header && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        weight: "2",
        className: "vkuiActionSheet__title"
    }, header), text && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiActionSheet__text"
    }, text)), children), platform === _platform.Platform.IOS && mode === "sheet" && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__close-item-wrapper--ios"
    }, iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ _react.createElement(_ActionSheetDefaultIosCloseItem.ActionSheetDefaultIosCloseItem, null))));
    if (mode === "menu") {
        return actionSheet;
    }
    return /*#__PURE__*/ _react.createElement(_PopoutWrapper.PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        hasMask: true,
        fixed: true
    }, actionSheet);
};

//# sourceMappingURL=ActionSheet.js.map