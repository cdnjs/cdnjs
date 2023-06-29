"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeader", {
    enumerable: true,
    get: function() {
        return PanelHeader;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _configProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _fixedLayout = require("../FixedLayout/FixedLayout");
var _modalRootContext = require("../ModalRoot/ModalRootContext");
var _separator = require("../Separator/Separator");
var _spacing = require("../Spacing/Spacing");
var _tooltipContainer = require("../Tooltip/TooltipContainer");
var _text = require("../Typography/Text/Text");
var platformClassNames = {
    ios: (0, _vkjs.classNames)("vkuiPanelHeader--ios", "vkuiInternalPanelHeader--ios"),
    android: (0, _vkjs.classNames)("vkuiPanelHeader--android", "vkuiInternalPanelHeader--android"),
    vkcom: (0, _vkjs.classNames)("vkuiPanelHeader--vkcom", "vkuiInternalPanelHeader--vkcom")
};
var sizeXClassNames = {
    none: "vkuiPanelHeader--sizeX-none",
    regular: "vkuiPanelHeader--sizeX-regular"
};
var PanelHeaderIn = function(param) {
    var before = param.before, after = param.after, separator = param.separator, children = param.children, _param_typographyProps = param.typographyProps, typographyProps = _param_typographyProps === void 0 ? {} : _param_typographyProps;
    var _typographyProps_Component = typographyProps.Component, Component = _typographyProps_Component === void 0 ? "span" : _typographyProps_Component, restProps = _objectWithoutProperties(typographyProps, [
        "Component"
    ]);
    var webviewType = (0, _configProviderContext.useConfigProvider)().webviewType;
    var isInsideModal = _react.useContext(_modalRootContext.ModalRootContext).isInsideModal;
    var platform = (0, _usePlatform.usePlatform)();
    var typographyNode;
    // TODO [>=6]: Удалить условие
    if (/*#__PURE__*/ _react.isValidElement(children) && // eslint-disable-next-line @typescript-eslint/no-use-before-define
    children.type.displayName === LegacyPanelHeaderContent.displayName) {
        typographyNode = children;
    } else {
        typographyNode = platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_text.Text, _objectSpread({
            weight: "2",
            Component: Component
        }, restProps), children) : /*#__PURE__*/ _react.createElement(Component, _objectSpread({
            className: "vkuiPanelHeader__content-in"
        }, restProps), children);
    }
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_tooltipContainer.TooltipContainer, {
        fixed: true,
        className: "vkuiPanelHeader__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__before", "vkuiInternalPanelHeader__before")
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeader__content"
    }, typographyNode), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__after", "vkuiInternalPanelHeader__after")
    }, (webviewType === _configProviderContext.WebviewType.INTERNAL || isInsideModal) && after)), separator && platform === _platform.Platform.VKCOM && /*#__PURE__*/ _react.createElement(_separator.Separator, {
        className: "vkuiPanelHeader__separator",
        wide: true
    }));
};
var PanelHeader = function(_param) {
    var before = _param.before, children = _param.children, after = _param.after, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, _param_visor = _param.visor, visor = _param_visor === void 0 ? true : _param_visor, _param_transparent = _param.transparent, transparent = _param_transparent === void 0 ? false : _param_transparent, shadow = _param.shadow, getRef = _param.getRef, getRootRef = _param.getRootRef, fixed = _param.fixed, className = _param.className, typographyProps = _param.typographyProps, restProps = _objectWithoutProperties(_param, [
        "before",
        "children",
        "after",
        "separator",
        "visor",
        "transparent",
        "shadow",
        "getRef",
        "getRootRef",
        "fixed",
        "className",
        "typographyProps"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var webviewType = (0, _configProviderContext.useConfigProvider)().webviewType;
    var isInsideModal = _react.useContext(_modalRootContext.ModalRootContext).isInsideModal;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var _useAdaptivityConditionalRender1 = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(), adaptiveSizeX = _useAdaptivityConditionalRender1.sizeX;
    var isFixed = fixed !== undefined ? fixed : platform !== _platform.Platform.VKCOM;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeader", "vkuiInternalPanelHeader", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, transparent && "vkuiPanelHeader--trnsp", shadow && "vkuiPanelHeader--shadow", visor && (0, _vkjs.classNames)("vkuiPanelHeader--vis", "vkuiInternalPanelHeader--vis"), separator && visor && (0, _vkjs.classNames)("vkuiPanelHeader--sep", "vkuiInternalPanelHeader--sep"), webviewType === _configProviderContext.WebviewType.VKAPPS && !isInsideModal && "vkuiPanelHeader--vkapps", !before && "vkuiPanelHeader--no-before", !after && "vkuiPanelHeader--no-after", isFixed && "vkuiPanelHeader--fixed", sizeX !== _adaptivity.SizeType.COMPACT && sizeXClassNames[sizeX], className),
        ref: isFixed ? getRootRef : getRef
    }), isFixed ? /*#__PURE__*/ _react.createElement(_fixedLayout.FixedLayout, {
        className: (0, _vkjs.classNames)("vkuiPanelHeader__fixed", "vkuiInternalPanelHeader__fixed"),
        vertical: "top",
        getRootRef: getRef
    }, /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children)) : /*#__PURE__*/ _react.createElement(PanelHeaderIn, {
        before: before,
        after: after,
        separator: separator,
        typographyProps: typographyProps
    }, children), separator && visor && platform !== _platform.Platform.VKCOM && /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeX.compact && /*#__PURE__*/ _react.createElement(_separator.Separator, {
        className: adaptiveSizeX.compact.className
    }), adaptiveSizeX.regular && /*#__PURE__*/ _react.createElement(_spacing.Spacing, {
        className: adaptiveSizeX.regular.className,
        size: 16
    })));
};
var warn = (0, _warnOnce.warnOnce)("PanelHeader");
/**
 * TODO [>=6]: Удалить подкомпонент
 * @deprecated
 */ var LegacyPanelHeaderContent = function(param) {
    var children = param.children, _param_Component = param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, id = param.id;
    if (process.env.NODE_ENV === "development") {
        warn("Подкомпонент PanelHeader.Content устарел и будет удалён в v6. Используйте параметр typographyProps.");
    }
    var platform = (0, _usePlatform.usePlatform)();
    return platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_text.Text, {
        weight: "2",
        Component: Component,
        id: id
    }, children) : /*#__PURE__*/ _react.createElement(Component, {
        className: "vkuiPanelHeader__content-in",
        id: id
    }, children);
};
LegacyPanelHeaderContent.displayName = "LegacyPanelHeaderContent";
PanelHeader.Content = LegacyPanelHeaderContent;

//# sourceMappingURL=PanelHeader.js.map