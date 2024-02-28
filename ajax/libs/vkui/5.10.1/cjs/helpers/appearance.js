"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Appearance: function() {
        return Appearance;
    },
    Scheme: function() {
        return Scheme;
    },
    deriveAppearance: function() {
        return deriveAppearance;
    },
    resolveAppearance: function() {
        return resolveAppearance;
    }
});
var Scheme;
(function(Scheme) {
    Scheme["BRIGHT_LIGHT"] = "bright_light";
    Scheme["SPACE_GRAY"] = "space_gray";
    Scheme["VKCOM_LIGHT"] = "vkcom_light";
    Scheme["VKCOM_DARK"] = "vkcom_dark";
})(Scheme || (Scheme = {}));
var Appearance;
(function(Appearance) {
    Appearance["DARK"] = "dark";
    Appearance["LIGHT"] = "light";
})(Appearance || (Appearance = {}));
var deriveAppearance = function(scheme) {
    return scheme === "space_gray" || scheme === "vkcom_dark" ? "dark" : "light";
};
function resolveAppearance(data) {
    var scheme = data.scheme, appearance = data.appearance;
    // appearance пока приходит только на IOS и ANDROID
    if (appearance) {
        return appearance;
    }
    // Проверяем scheme если appearance не пришел
    return deriveAppearance(scheme);
}

//# sourceMappingURL=appearance.js.map