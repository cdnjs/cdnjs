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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _usePlatform = require("../../hooks/usePlatform");
const _useTimeout = require("../../hooks/useTimeout");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _Footnote = require("../Typography/Footnote/Footnote");
const _ActionSheetContext = require("./ActionSheetContext");
const _ActionSheetDefaultIosCloseItem = require("./ActionSheetDefaultIosCloseItem");
const _ActionSheetDropdownMenu = require("./ActionSheetDropdownMenu");
const _ActionSheetDropdownSheet = require("./ActionSheetDropdownSheet");
const ActionSheet = (_param)=>{
    var { children, className, header, text, style, iosCloseItem, popupOffsetDistance, placement, mode: modeProp } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupOffsetDistance",
        "placement",
        "mode"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const [closingBy, setClosingBy] = _react.useState(undefined);
    const onClose = ()=>setClosingBy('other');
    const _action = _react.useRef(_vkjs.noop);
    const afterClose = ()=>{
        restProps.onClose({
            closedBy: closingBy || 'other'
        });
        _action.current();
        _action.current = _vkjs.noop;
    };
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const mode = modeProp !== null && modeProp !== void 0 ? modeProp : isDesktop ? 'menu' : 'sheet';
    (0, _ScrollContext.useScrollLock)(mode === 'sheet');
    let timeout = platform === 'ios' ? 300 : 200;
    if (mode === 'menu') {
        timeout = 0;
    }
    const fallbackTransitionFinish = (0, _useTimeout.useTimeout)(afterClose, timeout);
    _react.useEffect(()=>{
        if (closingBy) {
            fallbackTransitionFinish.set();
        } else {
            fallbackTransitionFinish.clear();
        }
    }, [
        closingBy,
        fallbackTransitionFinish
    ]);
    const onItemClick = _react.useCallback(({ action, immediateAction, autoClose, isCancelItem })=>(event)=>{
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                _action.current = ()=>action && action(event);
                setClosingBy(isCancelItem ? 'cancel-item' : 'action-item');
            } else {
                action && action(event);
            }
        }, []);
    const contextValue = (0, _useObjectMemo.useObjectMemo)({
        onItemClick,
        mode
    });
    const DropdownComponent = mode === 'menu' ? _ActionSheetDropdownMenu.ActionSheetDropdownMenu : _ActionSheetDropdownSheet.ActionSheetDropdownSheet;
    const dropdownProps = mode === 'menu' ? Object.assign(restProps, {
        popupOffsetDistance,
        placement
    }) : restProps;
    const actionSheet = /*#__PURE__*/ _react.createElement(_ActionSheetContext.ActionSheetContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ _react.createElement(DropdownComponent, _object_spread_props._(_object_spread._({
        closing: Boolean(closingBy),
        timeout: timeout
    }, dropdownProps), {
        onClose: onClose,
        className: mode === 'menu' ? className : undefined,
        style: mode === 'menu' ? style : undefined
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__content-wrapper"
    }, (header || text) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__header"
    }, header && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        weight: "2",
        className: "vkuiActionSheet__title"
    }, header), text && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiActionSheet__text"
    }, text)), children), platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheet__close-item-wrapper--ios"
    }, iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ _react.createElement(_ActionSheetDefaultIosCloseItem.ActionSheetDefaultIosCloseItem, null))));
    if (mode === 'menu') {
        return actionSheet;
    }
    return /*#__PURE__*/ _react.createElement(_PopoutWrapper.PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onClose,
        fixed: true
    }, actionSheet);
};

//# sourceMappingURL=ActionSheet.js.map