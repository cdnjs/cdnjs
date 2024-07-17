define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FINALS = exports.INITIALS = exports.PHONETIC_SYMBOL = exports.DEFAULT_OPTIONS = exports.ENUM_PINYIN_MODE = exports.ENUM_PINYIN_STYLE = void 0;
    var ENUM_PINYIN_STYLE;
    (function (ENUM_PINYIN_STYLE) {
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["NORMAL"] = 0] = "NORMAL";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["TONE"] = 1] = "TONE";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["TONE2"] = 2] = "TONE2";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["TO3NE"] = 5] = "TO3NE";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["INITIALS"] = 3] = "INITIALS";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["FIRST_LETTER"] = 4] = "FIRST_LETTER";
        ENUM_PINYIN_STYLE[ENUM_PINYIN_STYLE["PASSPORT"] = 6] = "PASSPORT";
    })(ENUM_PINYIN_STYLE = exports.ENUM_PINYIN_STYLE || (exports.ENUM_PINYIN_STYLE = {}));
    ;
    var ENUM_PINYIN_MODE;
    (function (ENUM_PINYIN_MODE) {
        ENUM_PINYIN_MODE[ENUM_PINYIN_MODE["NORMAL"] = 0] = "NORMAL";
        ENUM_PINYIN_MODE[ENUM_PINYIN_MODE["SURNAME"] = 1] = "SURNAME";
    })(ENUM_PINYIN_MODE = exports.ENUM_PINYIN_MODE || (exports.ENUM_PINYIN_MODE = {}));
    ;
    exports.DEFAULT_OPTIONS = {
        style: ENUM_PINYIN_STYLE.TONE,
        mode: ENUM_PINYIN_MODE.NORMAL,
        heteronym: false,
        group: false,
        compact: false,
    };
    exports.PHONETIC_SYMBOL = {
        "ā": "a1",
        "á": "a2",
        "ǎ": "a3",
        "à": "a4",
        "ē": "e1",
        "é": "e2",
        "ě": "e3",
        "è": "e4",
        "ō": "o1",
        "ó": "o2",
        "ǒ": "o3",
        "ò": "o4",
        "ī": "i1",
        "í": "i2",
        "ǐ": "i3",
        "ì": "i4",
        "ū": "u1",
        "ú": "u2",
        "ǔ": "u3",
        "ù": "u4",
        "ü": "v0",
        "ǘ": "v2",
        "ǚ": "v3",
        "ǜ": "v4",
        "ń": "n2",
        "ň": "n3",
        "": "m2",
    };
    exports.INITIALS = "b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s".split(",");
    exports.FINALS = "ang,eng,ing,ong,an,en,in,un,er,ai,ei,ui,ao,ou,iu,ie,ve,a,o,e,i,u,v".split(",");
});
//# sourceMappingURL=constant.js.map