"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PromoBanner", {
    enumerable: true,
    get: function() {
        return PromoBanner;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _button = require("../Button/Button");
var _image = require("../Image/Image");
var _simpleCell = require("../SimpleCell/SimpleCell");
var _footnote = require("../Typography/Footnote/Footnote");
var PromoBanner = function(_param) {
    var _param_bannerData = _param.bannerData, bannerData = _param_bannerData === void 0 ? {} : _param_bannerData, onClose = _param.onClose, isCloseButtonHidden = _param.isCloseButtonHidden, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "bannerData",
        "onClose",
        "isCloseButtonHidden",
        "className"
    ]);
    var _React_useState = _slicedToArray(_react.useState(""), 2), currentPixel = _React_useState[0], setCurrentPixel = _React_useState[1];
    var statsPixels = _react.useMemo(function() {
        return bannerData.statistics ? bannerData.statistics.reduce(function(acc, item) {
            return _objectSpreadProps(_objectSpread({}, acc), _defineProperty({}, item.type, item.url));
        }, {}) : {};
    }, [
        bannerData.statistics
    ]);
    var onClick = _react.useCallback(function() {
        return setCurrentPixel(statsPixels.click || "");
    }, [
        statsPixels.click
    ]);
    _react.useEffect(function() {
        if (statsPixels.playbackStarted) {
            setCurrentPixel(statsPixels.playbackStarted);
        }
    }, [
        statsPixels.playbackStarted
    ]);
    return /*#__PURE__*/ _react.createElement("div", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiPromoBanner", className)
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPromoBanner__head"
    }, /*#__PURE__*/ _react.createElement(_footnote.Footnote, null, bannerData.advertisingLabel || "Advertisement"), bannerData.ageRestrictions && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiPromoBanner__age"
    }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPromoBanner__close",
        onClick: onClose
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Dismiss, null))), /*#__PURE__*/ _react.createElement(_simpleCell.SimpleCell, {
        href: bannerData.trackingLink,
        onClick: onClick,
        rel: "nofollow noopener noreferrer",
        target: "_blank",
        before: bannerData.iconLink && /*#__PURE__*/ _react.createElement(_image.Image, {
            size: 48,
            src: bannerData.iconLink,
            alt: bannerData.title,
            "data-testid": process.env.NODE_ENV === "test" ? "avatar" : undefined
        }),
        after: bannerData.ctaText && /*#__PURE__*/ _react.createElement(_button.Button, {
            mode: "outline",
            "data-testid": process.env.NODE_ENV === "test" ? "button-ctaText" : undefined
        }, bannerData.ctaText),
        subtitle: bannerData.domain
    }, bannerData.title), currentPixel.length > 0 && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPromoBanner__pixels"
    }, /*#__PURE__*/ _react.createElement("img", {
        src: currentPixel,
        alt: ""
    })));
};

//# sourceMappingURL=PromoBanner.js.map