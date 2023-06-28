"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixedLayout", {
    enumerable: true,
    get: function() {
        return FixedLayout;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _splitColContext = require("../SplitCol/SplitColContext");
var _tooltipContainer = require("../Tooltip/TooltipContainer");
var FixedLayout = function(_param) {
    var children = _param.children, style = _param.style, vertical = _param.vertical, getRootRef = _param.getRootRef, getRef = _param.getRef, filled = _param.filled, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "getRef",
        "filled",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var ref = (0, _useExternRef.useExternRef)(getRootRef, getRef); // TODO [>=6]: удалить getRef
    var _React_useState = _slicedToArray(_react.useState(undefined), 2), width = _React_useState[0], setWidth = _React_useState[1];
    var window = (0, _dom.useDOM)().window;
    var colRef = _react.useContext(_splitColContext.SplitColContext).colRef;
    var doResize = function() {
        if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
            var computedStyle = getComputedStyle(colRef.current);
            setWidth("".concat(colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), "px"));
        } else {
            setWidth(undefined);
        }
    };
    _react.useEffect(doResize, [
        colRef,
        platform
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "resize", doResize);
    return /*#__PURE__*/ _react.createElement(_tooltipContainer.TooltipContainer, _objectSpreadProps(_objectSpread({}, restProps), {
        fixed: true,
        ref: ref,
        className: (0, _vkjs.classNames)("vkuiFixedLayout", platform === _platform.Platform.IOS && "vkuiInternalFixedLayout--ios", filled && "vkuiFixedLayout--filled", vertical && ({
            top: "vkuiFixedLayout--vertical-top",
            bottom: (0, _vkjs.classNames)("vkuiFixedLayout--vertical-bottom", "vkuiInternalFixedLayout--vertical-bottom")
        })[vertical], className),
        style: _objectSpreadProps(_objectSpread({}, style), {
            width: width
        })
    }), children);
};

//# sourceMappingURL=FixedLayout.js.map