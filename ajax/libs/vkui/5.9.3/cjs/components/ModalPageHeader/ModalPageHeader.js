"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalPageHeader", {
    enumerable: true,
    get: function() {
        return ModalPageHeader;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _ModalPageContext = require("../ModalPage/ModalPageContext");
var _PanelHeader = require("../PanelHeader/PanelHeader");
var _Separator = require("../Separator/Separator");
var ModalPageHeader = function(_param) {
    var children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, getRef = _param.getRef, getRootRef = _param.getRootRef, className = _param.className, typographyProps = _param.typographyProps, restProps = _object_without_properties._(_param, [
        "children",
        "separator",
        "getRef",
        "getRootRef",
        "className",
        "typographyProps"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var hasSeparator = separator && platform === _platform.Platform.VKCOM;
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var labelId = _react.useContext(_ModalPageContext.ModalPageContext).labelId;
    var modalPageHeaderRef = (0, _useExternRef.useExternRef)(getRef, getRootRef);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalPageHeader", platform !== _platform.Platform.VKCOM && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
        ref: modalPageHeaderRef
    }, /*#__PURE__*/ _react.createElement(_PanelHeader.PanelHeader, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)("vkuiInternalModalPageHeader__in", className),
        typographyProps: _object_spread._({
            Component: "h2",
            id: labelId
        }, typographyProps)
    }, restProps), {
        fixed: false,
        separator: false,
        transparent: true
    }), children), hasSeparator && /*#__PURE__*/ _react.createElement(_Separator.Separator, {
        wide: true
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map