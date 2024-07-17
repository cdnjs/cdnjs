define(["require", "exports", "./constant", "./util"], function (require, exports, constant_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toFixed = void 0;
    function initials(py) {
        for (var i = 0, l = constant_1.INITIALS.length; i < l; i++) {
            if (py.indexOf(constant_1.INITIALS[i]) === 0) {
                return constant_1.INITIALS[i];
            }
        }
        return "";
    }
    var RE_PHONETIC_SYMBOL = new RegExp("([" + Object.keys(constant_1.PHONETIC_SYMBOL).join("") + "])", "g");
    var RE_TONE2 = /([aeoiuvnm])([0-4])$/;
    function toFixed(pinyin, style) {
        var tone = "";
        var first_letter;
        var py;
        switch (style) {
            case constant_1.ENUM_PINYIN_STYLE.INITIALS:
                return initials(pinyin);
            case constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER:
                first_letter = pinyin.charAt(0);
                if ((0, util_1.hasKey)(constant_1.PHONETIC_SYMBOL, first_letter)) {
                    first_letter = constant_1.PHONETIC_SYMBOL[first_letter].charAt(0);
                }
                return first_letter;
            case constant_1.ENUM_PINYIN_STYLE.NORMAL:
                return pinyin.replace(RE_PHONETIC_SYMBOL, function ($0, $1_phonetic) {
                    return constant_1.PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1");
                });
            case constant_1.ENUM_PINYIN_STYLE.PASSPORT:
                return pinyin.replace(RE_PHONETIC_SYMBOL, function ($0, $1_phonetic) {
                    return constant_1.PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1").replace("v", "YU");
                }).toUpperCase();
            case constant_1.ENUM_PINYIN_STYLE.TO3NE:
                return pinyin.replace(RE_PHONETIC_SYMBOL, function ($0, $1_phonetic) {
                    return constant_1.PHONETIC_SYMBOL[$1_phonetic];
                });
            case constant_1.ENUM_PINYIN_STYLE.TONE2:
                py = pinyin.replace(RE_PHONETIC_SYMBOL, function ($0, $1) {
                    tone = constant_1.PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$2");
                    return constant_1.PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$1");
                });
                return py + tone;
            case constant_1.ENUM_PINYIN_STYLE.TONE:
            default:
                return pinyin;
        }
    }
    exports.toFixed = toFixed;
});
//# sourceMappingURL=format.js.map