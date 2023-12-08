var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "./constant"], function (require, exports, constant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compact = exports.compact2array = exports.combo = exports.combo2array = exports.convertUserOptions = exports.convertPinyinMode = exports.convertPinyinStyle = exports.hasKey = void 0;
    function hasKey(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    exports.hasKey = hasKey;
    var pinyinStyleMap = new Map([
        ["tone", constant_1.ENUM_PINYIN_STYLE.TONE],
        ["TONE", constant_1.ENUM_PINYIN_STYLE.TONE],
        ["1", constant_1.ENUM_PINYIN_STYLE.TONE],
        ["tone2", constant_1.ENUM_PINYIN_STYLE.TONE2],
        ["TONE2", constant_1.ENUM_PINYIN_STYLE.TONE2],
        ["2", constant_1.ENUM_PINYIN_STYLE.TONE2],
        ["to3ne", constant_1.ENUM_PINYIN_STYLE.TO3NE],
        ["TO3NE", constant_1.ENUM_PINYIN_STYLE.TO3NE],
        ["5", constant_1.ENUM_PINYIN_STYLE.TO3NE],
        ["first_letter", constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER],
        ["FIRST_LETTER", constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER],
        ["4", constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER],
        ["initials", constant_1.ENUM_PINYIN_STYLE.INITIALS],
        ["INITIALS", constant_1.ENUM_PINYIN_STYLE.INITIALS],
        ["3", constant_1.ENUM_PINYIN_STYLE.INITIALS],
        ["normal", constant_1.ENUM_PINYIN_STYLE.NORMAL],
        ["NORMAL", constant_1.ENUM_PINYIN_STYLE.NORMAL],
        ["0", constant_1.ENUM_PINYIN_STYLE.NORMAL],
        ["passport", constant_1.ENUM_PINYIN_STYLE.PASSPORT],
        ["PASSPORT", constant_1.ENUM_PINYIN_STYLE.PASSPORT],
        ["6", constant_1.ENUM_PINYIN_STYLE.PASSPORT],
    ]);
    function convertPinyinStyle(style) {
        var s = String(style);
        if (pinyinStyleMap.has(s)) {
            return pinyinStyleMap.get(s);
        }
        return constant_1.ENUM_PINYIN_STYLE.TONE;
    }
    exports.convertPinyinStyle = convertPinyinStyle;
    var pinyinModeMap = new Map([
        ["normal", constant_1.ENUM_PINYIN_MODE.NORMAL],
        ["NORMAL", constant_1.ENUM_PINYIN_MODE.NORMAL],
        ["surname", constant_1.ENUM_PINYIN_MODE.SURNAME],
        ["SURNAME", constant_1.ENUM_PINYIN_MODE.SURNAME],
    ]);
    function convertPinyinMode(mode) {
        var s = String(mode);
        if (pinyinModeMap.has(s)) {
            return pinyinModeMap.get(s);
        }
        return constant_1.ENUM_PINYIN_MODE.NORMAL;
    }
    exports.convertPinyinMode = convertPinyinMode;
    function convertUserOptions(options) {
        var segment = undefined;
        if (options === null || options === void 0 ? void 0 : options.segment) {
            if ((options === null || options === void 0 ? void 0 : options.segment) === true) {
                segment = "Intl.Segmenter";
            }
            else {
                segment = options.segment;
            }
        }
        var opt = __assign(__assign({}, constant_1.DEFAULT_OPTIONS), { style: convertPinyinStyle(options === null || options === void 0 ? void 0 : options.style), mode: convertPinyinMode(options === null || options === void 0 ? void 0 : options.mode), segment: segment, heteronym: (options === null || options === void 0 ? void 0 : options.heteronym) || false, group: (options === null || options === void 0 ? void 0 : options.group) || false });
        return opt;
    }
    exports.convertUserOptions = convertUserOptions;
    function combo2array(a1, a2) {
        var result = [];
        if (!a1.length) {
            return a2;
        }
        if (!a2.length) {
            return a1;
        }
        for (var i = 0, l = a1.length; i < l; i++) {
            for (var j = 0, m = a2.length; j < m; j++) {
                result.push(a1[i] + a2[j]);
            }
        }
        return result;
    }
    exports.combo2array = combo2array;
    function combo(arr) {
        if (arr.length === 0) {
            return [];
        }
        if (arr.length === 1) {
            return arr[0];
        }
        var result = combo2array(arr[0], arr[1]);
        for (var i = 2, l = arr.length; i < l; i++) {
            result = combo2array(result, arr[i]);
        }
        return result;
    }
    exports.combo = combo;
    function compact2array(a1, a2) {
        if (!Array.isArray(a1) || !Array.isArray(a2)) {
            throw new Error("compact2array expect two array as parameters");
        }
        if (!a1.length) {
            a1 = [""];
        }
        if (!a2.length) {
            a2 = [""];
        }
        var result = [];
        for (var i = 0, l = a1.length; i < l; i++) {
            for (var j = 0, m = a2.length; j < m; j++) {
                if (Array.isArray(a1[i])) {
                    result.push(__spreadArray(__spreadArray([], __read(a1[i]), false), [a2[j]], false));
                }
                else {
                    result.push([a1[i], a2[j]]);
                }
            }
        }
        return result;
    }
    exports.compact2array = compact2array;
    function compact(arr) {
        if (arr.length === 0) {
            return [];
        }
        if (arr.length === 1) {
            return [arr[0]];
        }
        var result = compact2array(arr[0], arr[1]);
        for (var i = 2, l = arr.length; i < l; ++i) {
            result = compact2array(result, arr[i]);
        }
        return result;
    }
    exports.compact = compact;
});
//# sourceMappingURL=util.js.map