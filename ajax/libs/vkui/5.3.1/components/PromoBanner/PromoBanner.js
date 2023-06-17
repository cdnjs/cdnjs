import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import * as React from "react";
import { Icon24Dismiss } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { warnOnce } from "../../lib/warnOnce";
import { Button } from "../Button/Button";
import { Image } from "../Image/Image";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import { Footnote } from "../Typography/Footnote/Footnote";
var warn = warnOnce("PromoBanner");
/**
 * @see https://vkcom.github.io/VKUI/#/PromoBanner
 * @deprecated v5.3.1
 *
 * Используйте событие [VKWebAppShowBannerAd](https://dev.vk.com/mini-apps/monetization/ad/banners)
 */ export var PromoBanner = function(_param) {
    var _param_bannerData = _param.bannerData, bannerData = _param_bannerData === void 0 ? {} : _param_bannerData, onClose = _param.onClose, isCloseButtonHidden = _param.isCloseButtonHidden, className = _param.className, restProps = _object_without_properties(_param, [
        "bannerData",
        "onClose",
        "isCloseButtonHidden",
        "className"
    ]);
    if (process.env.NODE_ENV === "development") {
        warn("Компонент устарел и будет удален в v6. Используйте событие VKWebAppShowBannerAd https://dev.vk.com/mini-apps/monetization/ad/banners");
    }
    var _React_useState = _sliced_to_array(React.useState(""), 2), currentPixel = _React_useState[0], setCurrentPixel = _React_useState[1];
    var statsPixels = React.useMemo(function() {
        return bannerData.statistics ? bannerData.statistics.reduce(function(acc, item) {
            return _object_spread_props(_object_spread({}, acc), _define_property({}, item.type, item.url));
        }, {}) : {};
    }, [
        bannerData.statistics
    ]);
    var onClick = React.useCallback(function() {
        return setCurrentPixel(statsPixels.click || "");
    }, [
        statsPixels.click
    ]);
    React.useEffect(function() {
        if (statsPixels.playbackStarted) {
            setCurrentPixel(statsPixels.playbackStarted);
        }
    }, [
        statsPixels.playbackStarted
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiPromoBanner", className)
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPromoBanner__head"
    }, /*#__PURE__*/ React.createElement(Footnote, null, bannerData.advertisingLabel || "Advertisement"), bannerData.ageRestrictions && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiPromoBanner__age"
    }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPromoBanner__close",
        onClick: onClose
    }, /*#__PURE__*/ React.createElement(Icon24Dismiss, null))), /*#__PURE__*/ React.createElement(SimpleCell, {
        href: bannerData.trackingLink,
        onClick: onClick,
        rel: "nofollow noopener noreferrer",
        target: "_blank",
        before: bannerData.iconLink && /*#__PURE__*/ React.createElement(Image, {
            size: 48,
            src: bannerData.iconLink,
            alt: bannerData.title,
            "data-testid": process.env.NODE_ENV === "test" ? "avatar" : undefined
        }),
        after: bannerData.ctaText && /*#__PURE__*/ React.createElement(Button, {
            mode: "outline",
            "data-testid": process.env.NODE_ENV === "test" ? "button-ctaText" : undefined
        }, bannerData.ctaText),
        subtitle: bannerData.domain
    }, bannerData.title), currentPixel.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPromoBanner__pixels"
    }, /*#__PURE__*/ React.createElement("img", {
        src: currentPixel,
        alt: ""
    })));
};

//# sourceMappingURL=PromoBanner.js.map