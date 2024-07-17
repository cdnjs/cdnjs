var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./data/dict-zi", "./data/phrases-dict", "./segment-web", "./format", "./data/surname", "./data/compound_surname", "./util", "./constant"], function (require, exports, dict_zi_1, phrases_dict_1, segment_web_1, format_1, surname_1, compound_surname_1, util_1, constant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPinyinInstance = void 0;
    dict_zi_1 = __importDefault(dict_zi_1);
    phrases_dict_1 = __importDefault(phrases_dict_1);
    surname_1 = __importDefault(surname_1);
    compound_surname_1 = __importDefault(compound_surname_1);
    var PinyinBase = (function () {
        function PinyinBase() {
            this.STYLE_TONE = constant_1.ENUM_PINYIN_STYLE.TONE;
            this.STYLE_TONE2 = constant_1.ENUM_PINYIN_STYLE.TONE2;
            this.STYLE_TO3NE = constant_1.ENUM_PINYIN_STYLE.TO3NE;
            this.STYLE_NORMAL = constant_1.ENUM_PINYIN_STYLE.NORMAL;
            this.STYLE_INITIALS = constant_1.ENUM_PINYIN_STYLE.INITIALS;
            this.STYLE_FIRST_LETTER = constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER;
            this.STYLE_PASSPORT = constant_1.ENUM_PINYIN_STYLE.PASSPORT;
            this.MODE_NORMAL = constant_1.ENUM_PINYIN_MODE.NORMAL;
            this.MODE_SURNAME = constant_1.ENUM_PINYIN_MODE.SURNAME;
        }
        PinyinBase.prototype.pinyin = function (hans, options) {
            if (typeof hans !== "string") {
                return [];
            }
            var opt = (0, util_1.convertUserOptions)(options);
            var pys;
            if (opt.mode === constant_1.ENUM_PINYIN_MODE.SURNAME) {
                pys = this.surname_pinyin(hans, opt);
            }
            else {
                if (opt.segment) {
                    pys = this.segment_pinyin(hans, opt);
                }
                else {
                    pys = this.normal_pinyin(hans, opt);
                }
            }
            if (options === null || options === void 0 ? void 0 : options.compact) {
                pys = (0, util_1.compact)(pys);
            }
            return pys;
        };
        PinyinBase.prototype.normal_pinyin = function (hans, options) {
            var pys = [];
            var nohans = "";
            for (var i = 0, l = hans.length; i < l; i++) {
                var words = hans[i];
                var firstCharCode = words.charCodeAt(0);
                if (dict_zi_1.default[firstCharCode]) {
                    if (nohans.length > 0) {
                        pys.push([nohans]);
                        nohans = "";
                    }
                    pys.push(this.single_pinyin(words, options));
                }
                else {
                    nohans += words;
                }
            }
            if (nohans.length > 0) {
                pys.push([nohans]);
                nohans = "";
            }
            return pys;
        };
        PinyinBase.prototype.single_pinyin = function (han, options) {
            if (typeof han !== "string") {
                return [];
            }
            if (han.length !== 1) {
                return this.single_pinyin(han.charAt(0), options);
            }
            var hanCode = han.charCodeAt(0);
            if (!dict_zi_1.default[hanCode]) {
                return [han];
            }
            var pys = dict_zi_1.default[hanCode].split(",");
            if (!options.heteronym) {
                return [(0, format_1.toFixed)(pys[0], options.style)];
            }
            var py_cached = {};
            var pinyins = [];
            for (var i = 0, l = pys.length; i < l; i++) {
                var py = (0, format_1.toFixed)(pys[i], options.style);
                if ((0, util_1.hasKey)(py_cached, py)) {
                    continue;
                }
                py_cached[py] = py;
                pinyins.push(py);
            }
            return pinyins;
        };
        PinyinBase.prototype.segment = function (hans, segmentType) {
            return (0, segment_web_1.segment)(hans, segmentType);
        };
        PinyinBase.prototype.segment_pinyin = function (hans, options) {
            var phrases = this.segment(hans, options.segment);
            var pys = [];
            var nohans = "";
            for (var i = 0, l = phrases.length; i < l; i++) {
                var words = phrases[i];
                var firstCharCode = words.charCodeAt(0);
                if (dict_zi_1.default[firstCharCode]) {
                    if (nohans.length > 0) {
                        pys.push([nohans]);
                        nohans = "";
                    }
                    var newPys = words.length === 1
                        ? this.normal_pinyin(words, options)
                        : this.phrases_pinyin(words, options);
                    if (options.group) {
                        pys.push(this.groupPhrases(newPys));
                    }
                    else {
                        pys = pys.concat(newPys);
                    }
                }
                else {
                    nohans += words;
                }
            }
            if (nohans.length > 0) {
                pys.push([nohans]);
                nohans = "";
            }
            return pys;
        };
        PinyinBase.prototype.phrases_pinyin = function (phrases, options) {
            var py = [];
            if ((0, util_1.hasKey)(phrases_dict_1.default, phrases)) {
                phrases_dict_1.default[phrases].forEach(function (item, idx) {
                    py[idx] = [];
                    if (options.heteronym) {
                        item.forEach(function (py_item, py_index) {
                            py[idx][py_index] = (0, format_1.toFixed)(py_item, options.style);
                        });
                    }
                    else {
                        py[idx][0] = (0, format_1.toFixed)(item[0], options.style);
                    }
                });
            }
            else {
                for (var i = 0, l = phrases.length; i < l; i++) {
                    py.push(this.single_pinyin(phrases[i], options));
                }
            }
            return py;
        };
        PinyinBase.prototype.groupPhrases = function (phrases) {
            if (phrases.length === 1) {
                return phrases[0];
            }
            var grouped = (0, util_1.combo)(phrases);
            return grouped;
        };
        PinyinBase.prototype.surname_pinyin = function (hans, options) {
            return this.compound_surname(hans, options);
        };
        PinyinBase.prototype.compound_surname = function (hans, options) {
            var len = hans.length;
            var prefixIndex = 0;
            var result = [];
            for (var i = 0; i < len; i++) {
                var twowords = hans.substring(i, i + 2);
                if ((0, util_1.hasKey)(compound_surname_1.default, twowords)) {
                    if (prefixIndex <= i - 1) {
                        result = result.concat(this.single_surname(hans.substring(prefixIndex, i), options));
                    }
                    var pys = compound_surname_1.default[twowords].map(function (item) {
                        return item.map(function (ch) { return (0, format_1.toFixed)(ch, options.style); });
                    });
                    result = result.concat(pys);
                    i = i + 2;
                    prefixIndex = i;
                }
            }
            result = result.concat(this.single_surname(hans.substring(prefixIndex, len), options));
            return result;
        };
        PinyinBase.prototype.single_surname = function (hans, options) {
            var result = [];
            for (var i = 0, l = hans.length; i < l; i++) {
                var word = hans.charAt(i);
                if ((0, util_1.hasKey)(surname_1.default, word)) {
                    var pys = surname_1.default[word].map(function (item) {
                        return item.map(function (ch) { return (0, format_1.toFixed)(ch, options.style); });
                    });
                    result = result.concat(pys);
                }
                else {
                    result.push(this.single_pinyin(word, options));
                }
            }
            return result;
        };
        PinyinBase.prototype.compare = function (hanA, hanB) {
            var pinyinA = this.pinyin(hanA);
            var pinyinB = this.pinyin(hanB);
            return String(pinyinA).localeCompare(String(pinyinB));
        };
        PinyinBase.prototype.compact = function (pys) {
            return (0, util_1.compact)(pys);
        };
        return PinyinBase;
    }());
    exports.default = PinyinBase;
    function getPinyinInstance(py) {
        var pinyin = py.pinyin.bind(py);
        pinyin.compare = py.compare.bind(py);
        pinyin.compact = py.compact.bind(py);
        pinyin.STYLE_TONE = constant_1.ENUM_PINYIN_STYLE.TONE;
        pinyin.STYLE_TONE2 = constant_1.ENUM_PINYIN_STYLE.TONE2;
        pinyin.STYLE_TO3NE = constant_1.ENUM_PINYIN_STYLE.TO3NE;
        pinyin.STYLE_NORMAL = constant_1.ENUM_PINYIN_STYLE.NORMAL;
        pinyin.STYLE_INITIALS = constant_1.ENUM_PINYIN_STYLE.INITIALS;
        pinyin.STYLE_FIRST_LETTER = constant_1.ENUM_PINYIN_STYLE.FIRST_LETTER;
        pinyin.STYLE_PASSPORT = constant_1.ENUM_PINYIN_STYLE.PASSPORT;
        pinyin.MODE_NORMAL = constant_1.ENUM_PINYIN_MODE.NORMAL;
        pinyin.MODE_SURNAME = constant_1.ENUM_PINYIN_MODE.SURNAME;
        return pinyin;
    }
    exports.getPinyinInstance = getPinyinInstance;
});
//# sourceMappingURL=PinyinBase.js.map