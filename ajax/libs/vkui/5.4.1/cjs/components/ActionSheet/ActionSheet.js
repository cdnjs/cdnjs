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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _platform = require("../../lib/platform");
var _scrollContext = require("../AppRoot/ScrollContext");
var _popoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _footnote = require("../Typography/Footnote/Footnote");
var _actionSheetContext = require("./ActionSheetContext");
var _actionSheetDropdown = require("./ActionSheetDropdown");
var _actionSheetDropdownDesktop = require("./ActionSheetDropdownDesktop");
var ActionSheet = function(_param) {
    var children = _param.children, className = _param.className, header = _param.header, text = _param.text, style = _param.style, iosCloseItem = _param.iosCloseItem, _param_popupDirection = _param.popupDirection, popupDirection = _param_popupDirection === void 0 ? "bottom" : _param_popupDirection, popupOffsetDistance = _param.popupOffsetDistance, restProps = _objectWithoutProperties(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupDirection",
        "popupOffsetDistance"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _slicedToArray(_react.useState(false), 2), closing = _React_useState[0], setClosing = _React_useState[1];
    var onClose = function() {
        return setClosing(true);
    };
    var _action = _react.useRef(_vkjs.noop);
    var afterClose = function() {
        restProps.onClose();
        _action.current();
        _action.current = _vkjs.noop;
    };
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    (0, _scrollContext.useScrollLock)(!isDesktop);
    var timeout = platform === _platform.Platform.IOS ? 300 : 200;
    if (isDesktop) {
        timeout = 0;
    }
    var fallbackTransitionFinish = (0, _useTimeout.useTimeout)(afterClose, timeout);
    _react.useEffect(function() {
        if (closing) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closing,
        fallbackTransitionFinish
    ]);
    var onItemClick = _react.useCallback(function(action, immediateAction, autoClose) {
        return function(event) {
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = function() {
                    return action && action(event);
                };
                setClosing(true);
            } else {
                action && action(event);
            }
        };
    }, []);
    var contextValue = (0, _useObjectMemo.useObjectMemo)({
        onItemClick: onItemClick,
        isDesktop: isDesktop
    });
    var DropdownComponent = isDesktop ? _actionSheetDropdownDesktop.ActionSheetDropdownDesktop : _actionSheetDropdown.ActionSheetDropdown;
    var dropdownProps = isDesktop ? Object.assign(restProps, {
        popupOffsetDistance: popupOffsetDistance,
        popupDirection: popupDirection
    }) : restProps;
    var actionSheet = /*#__PURE__*/ _react.createElement(_actionSheetContext.ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ _react.createElement(DropdownComponent, _objectSpreadProps(_objectSpread({
        closing: closing,
        timeout: timeout
    }, dropdownProps), {
        onClose: onClose,
        className: isDesktop ? className : undefined,
        style: isDesktop ? style : undefined
    }), (header || text) && /*#__PURE__*/ _react.createElement("header", {
        className: "vkuiActionSheet__header"
    }, header && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        weight: "2",
        className: "vkuiActionSheet__title"
    }, header), text && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiActionSheet__text"
    }, text)), children, platform === _platform.Platform.IOS && !isDesktop && iosCloseItem));
    if (isDesktop) {
        return actionSheet;
    }
    return /*#__PURE__*/ _react.createElement(_popoutWrapper.PopoutWrapper, {
        closing: closing,
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        hasMask: true,
        fixed: true
    }, actionSheet);
};

//# sourceMappingURL=ActionSheet.js.map