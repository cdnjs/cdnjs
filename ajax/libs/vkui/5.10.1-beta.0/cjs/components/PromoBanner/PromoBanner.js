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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _warnOnce = require("../../lib/warnOnce");
var _Button = require("../Button/Button");
var _Image = require("../Image/Image");
var _RootComponent = require("../RootComponent/RootComponent");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var _Footnote = require("../Typography/Footnote/Footnote");
var warn = (0, _warnOnce.warnOnce)("PromoBanner");
var PromoBanner = function(_param) {
    var _param_bannerData = _param.bannerData, bannerData = _param_bannerData === void 0 ? {} : _param_bannerData, onClose = _param.onClose, isCloseButtonHidden = _param.isCloseButtonHidden, restProps = _object_without_properties._(_param, [
        "bannerData",
        "onClose",
        "isCloseButtonHidden"
    ]);
    if (process.env.NODE_ENV === "development") {
        warn("Компонент устарел и будет удален в v6. Используйте событие VKWebAppShowBannerAd https://dev.vk.com/mini-apps/monetization/ad/banners");
    }
    var _React_useState = _sliced_to_array._(_react.useState(""), 2), currentPixel = _React_useState[0], setCurrentPixel = _React_useState[1];
    var statsPixels = _react.useMemo(function() {
        return bannerData.statistics ? bannerData.statistics.reduce(function(acc, item) {
            return _object_spread_props._(_object_spread._({}, acc), _define_property._({}, item.type, item.url));
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
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: "vkuiPromoBanner"
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPromoBanner__head"
    }, /*#__PURE__*/ _react.createElement(_Footnote.Footnote, null, bannerData.advertisingLabel || "Advertisement"), bannerData.ageRestrictions && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiPromoBanner__age"
    }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPromoBanner__close",
        onClick: onClose
    }, /*#__PURE__*/ _react.createElement(_icons.Icon24Dismiss, null))), /*#__PURE__*/ _react.createElement(_SimpleCell.SimpleCell, {
        href: bannerData.trackingLink,
        onClick: onClick,
        rel: "nofollow noopener noreferrer",
        target: "_blank",
        before: bannerData.iconLink && /*#__PURE__*/ _react.createElement(_Image.Image, {
            size: 48,
            src: bannerData.iconLink,
            alt: bannerData.title,
            "data-testid": process.env.NODE_ENV === "test" ? "avatar" : undefined
        }),
        after: bannerData.ctaText && /*#__PURE__*/ _react.createElement(_Button.Button, {
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