/*!***************************************************
 * mark.js v8.9.0
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2017, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory, window, document) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function (jQuery) {
            return factory(window, document, jQuery);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        module.exports = factory(window, document, require("jquery"));
    } else {
        factory(window, document, jQuery);
    }
})(function (window, document, $) {
    var Mark = function () {
        function Mark(ctx) {
            _classCallCheck(this, Mark);

            this.ctx = ctx;

            this.ie = false;
            var ua = window.navigator.userAgent;
            if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1) {
                this.ie = true;
            }
        }

        _createClass(Mark, [{
            key: "log",
            value: function log(msg) {
                var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "debug";

                var log = this.opt.log;
                if (!this.opt.debug) {
                    return;
                }
                if ((typeof log === "undefined" ? "undefined" : _typeof(log)) === "object" && typeof log[level] === "function") {
                    log[level]("mark.js: " + msg);
                }
            }
        }, {
            key: "escapeStr",
            value: function escapeStr(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
        }, {
            key: "createRegExp",
            value: function createRegExp(str) {
                if (this.opt.wildcards !== "disabled") {
                    str = this.setupWildcardsRegExp(str);
                }
                str = this.escapeStr(str);
                if (Object.keys(this.opt.synonyms).length) {
                    str = this.createSynonymsRegExp(str);
                }
                if (this.opt.ignoreJoiners) {
                    str = this.setupIgnoreJoinersRegExp(str);
                }
                if (this.opt.diacritics) {
                    str = this.createDiacriticsRegExp(str);
                }
                str = this.createMergedBlanksRegExp(str);
                if (this.opt.ignoreJoiners) {
                    str = this.createIgnoreJoinersRegExp(str);
                }
                if (this.opt.wildcards !== "disabled") {
                    str = this.createWildcardsRegExp(str);
                }
                str = this.createAccuracyRegExp(str);
                return str;
            }
        }, {
            key: "createSynonymsRegExp",
            value: function createSynonymsRegExp(str) {
                var syn = this.opt.synonyms,
                    sens = this.opt.caseSensitive ? "" : "i";
                for (var index in syn) {
                    if (syn.hasOwnProperty(index)) {
                        var value = syn[index],
                            k1 = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(index) : this.escapeStr(index),
                            k2 = this.opt.wildcards !== "disabled" ? this.setupWildcardsRegExp(value) : this.escapeStr(value);
                        if (k1 !== "" && k2 !== "") {
                            str = str.replace(new RegExp("(" + k1 + "|" + k2 + ")", "gm" + sens), "(" + k1 + "|" + k2 + ")");
                        }
                    }
                }
                return str;
            }
        }, {
            key: "setupWildcardsRegExp",
            value: function setupWildcardsRegExp(str) {
                str = str.replace(/(?:\\)*\?/g, function (val) {
                    return val.charAt(0) === "\\" ? "?" : "\x01";
                });

                return str.replace(/(?:\\)*\*/g, function (val) {
                    return val.charAt(0) === "\\" ? "*" : "\x02";
                });
            }
        }, {
            key: "createWildcardsRegExp",
            value: function createWildcardsRegExp(str) {
                var spaces = this.opt.wildcards === "withSpaces";
                return str.replace(/\u0001/g, spaces ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, spaces ? "[\\S\\s]*?" : "\\S*");
            }
        }, {
            key: "setupIgnoreJoinersRegExp",
            value: function setupIgnoreJoinersRegExp(str) {
                return str.replace(/[^(|)\\]/g, function (val, indx, original) {
                    var nextChar = original.charAt(indx + 1);
                    if (/[(|)\\]/.test(nextChar) || nextChar === "") {
                        return val;
                    } else {
                        return val + "\0";
                    }
                });
            }
        }, {
            key: "createIgnoreJoinersRegExp",
            value: function createIgnoreJoinersRegExp(str) {
                return str.split("\0").join("[\\u00ad|\\u200b|\\u200c|\\u200d]?");
            }
        }, {
            key: "createDiacriticsRegExp",
            value: function createDiacriticsRegExp(str) {
                var sens = this.opt.caseSensitive ? "" : "i",
                    dct = this.opt.caseSensitive ? ["aàáâãäåāąă", "AÀÁÂÃÄÅĀĄĂ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéêëěēę", "EÈÉÊËĚĒĘ", "iìíîïī", "IÌÍÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóôõöøō", "OÒÓÔÕÖØŌ", "rř", "RŘ", "sšśșş", "SŠŚȘŞ", "tťțţ", "TŤȚŢ", "uùúûüůū", "UÙÚÛÜŮŪ", "yÿý", "YŸÝ", "zžżź", "ZŽŻŹ"] : ["aàáâãäåāąăAÀÁÂÃÄÅĀĄĂ", "cçćčCÇĆČ", "dđďDĐĎ", "eèéêëěēęEÈÉÊËĚĒĘ", "iìíîïīIÌÍÎÏĪ", "lłLŁ", "nñňńNÑŇŃ", "oòóôõöøōOÒÓÔÕÖØŌ", "rřRŘ", "sšśșşSŠŚȘŞ", "tťțţTŤȚŢ", "uùúûüůūUÙÚÛÜŮŪ", "yÿýYŸÝ", "zžżźZŽŻŹ"];
                var handled = [];
                str.split("").forEach(function (ch) {
                    dct.every(function (dct) {
                        if (dct.indexOf(ch) !== -1) {
                            if (handled.indexOf(dct) > -1) {
                                return false;
                            }

                            str = str.replace(new RegExp("[" + dct + "]", "gm" + sens), "[" + dct + "]");
                            handled.push(dct);
                        }
                        return true;
                    });
                });
                return str;
            }
        }, {
            key: "createMergedBlanksRegExp",
            value: function createMergedBlanksRegExp(str) {
                return str.replace(/[\s]+/gmi, "[\\s]+");
            }
        }, {
            key: "createAccuracyRegExp",
            value: function createAccuracyRegExp(str) {
                var _this = this;

                var chars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\xA1\xBF";
                var acc = this.opt.accuracy,
                    val = typeof acc === "string" ? acc : acc.value,
                    ls = typeof acc === "string" ? [] : acc.limiters,
                    lsJoin = "";
                ls.forEach(function (limiter) {
                    lsJoin += "|" + _this.escapeStr(limiter);
                });
                switch (val) {
                    case "partially":
                    default:
                        return "()(" + str + ")";
                    case "complementary":
                        lsJoin = "\\s" + (lsJoin ? lsJoin : this.escapeStr(chars));
                        return "()([^" + lsJoin + "]*" + str + "[^" + lsJoin + "]*)";
                    case "exactly":
                        return "(^|\\s" + lsJoin + ")(" + str + ")(?=$|\\s" + lsJoin + ")";
                }
            }
        }, {
            key: "getSeparatedKeywords",
            value: function getSeparatedKeywords(sv) {
                var _this2 = this;

                var stack = [];
                sv.forEach(function (kw) {
                    if (!_this2.opt.separateWordSearch) {
                        if (kw.trim() && stack.indexOf(kw) === -1) {
                            stack.push(kw);
                        }
                    } else {
                        kw.split(" ").forEach(function (kwSplitted) {
                            if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
                                stack.push(kwSplitted);
                            }
                        });
                    }
                });
                return {
                    "keywords": stack.sort(function (a, b) {
                        return b.length - a.length;
                    }),
                    "length": stack.length
                };
            }
        }, {
            key: "getTextNodes",
            value: function getTextNodes(cb) {
                var _this3 = this;

                var val = "",
                    nodes = [];
                this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (node) {
                    nodes.push({
                        start: val.length,
                        end: (val += node.textContent).length,
                        node: node
                    });
                }, function (node) {
                    if (_this3.matchesExclude(node.parentNode)) {
                        return NodeFilter.FILTER_REJECT;
                    } else {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }, function () {
                    cb({
                        value: val,
                        nodes: nodes
                    });
                });
            }
        }, {
            key: "matchesExclude",
            value: function matchesExclude(el) {
                return DOMIterator.matches(el, this.opt.exclude.concat(["script", "style", "title", "head", "html"]));
            }
        }, {
            key: "wrapRangeInTextNode",
            value: function wrapRangeInTextNode(node, start, end) {
                var hEl = !this.opt.element ? "mark" : this.opt.element,
                    startNode = node.splitText(start),
                    ret = startNode.splitText(end - start);
                var repl = document.createElement(hEl);
                repl.setAttribute("data-markjs", "true");
                if (this.opt.className) {
                    repl.setAttribute("class", this.opt.className);
                }
                repl.textContent = startNode.textContent;
                startNode.parentNode.replaceChild(repl, startNode);
                return ret;
            }
        }, {
            key: "wrapRangeInMappedTextNode",
            value: function wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
                var _this4 = this;

                dict.nodes.every(function (n, i) {
                    var sibl = dict.nodes[i + 1];
                    if (typeof sibl === "undefined" || sibl.start > start) {
                        var _ret = function () {
                            if (!filterCb(n.node)) {
                                return {
                                    v: false
                                };
                            }

                            var s = start - n.start,
                                e = (end > n.end ? n.end : end) - n.start,
                                startStr = dict.value.substr(0, n.start),
                                endStr = dict.value.substr(e + n.start);
                            n.node = _this4.wrapRangeInTextNode(n.node, s, e);

                            dict.value = startStr + endStr;
                            dict.nodes.forEach(function (k, j) {
                                if (j >= i) {
                                    if (dict.nodes[j].start > 0 && j !== i) {
                                        dict.nodes[j].start -= e;
                                    }
                                    dict.nodes[j].end -= e;
                                }
                            });
                            end -= e;
                            eachCb(n.node.previousSibling, n.start);
                            if (end > n.end) {
                                start = n.end;
                            } else {
                                return {
                                    v: false
                                };
                            }
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                    return true;
                });
            }
        }, {
            key: "wrapMatches",
            value: function wrapMatches(regex, ignoreGroups, filterCb, eachCb, endCb) {
                var _this5 = this;

                var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
                this.getTextNodes(function (dict) {
                    dict.nodes.forEach(function (node) {
                        node = node.node;
                        var match = void 0;
                        while ((match = regex.exec(node.textContent)) !== null && match[matchIdx] !== "") {
                            if (!filterCb(match[matchIdx], node)) {
                                continue;
                            }
                            var pos = match.index;
                            if (matchIdx !== 0) {
                                for (var i = 1; i < matchIdx; i++) {
                                    pos += match[i].length;
                                }
                            }
                            node = _this5.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
                            eachCb(node.previousSibling);

                            regex.lastIndex = 0;
                        }
                    });
                    endCb();
                });
            }
        }, {
            key: "wrapMatchesAcrossElements",
            value: function wrapMatchesAcrossElements(regex, ignoreGroups, filterCb, eachCb, endCb) {
                var _this6 = this;

                var matchIdx = ignoreGroups === 0 ? 0 : ignoreGroups + 1;
                this.getTextNodes(function (dict) {
                    var match = void 0;
                    while ((match = regex.exec(dict.value)) !== null && match[matchIdx] !== "") {
                        var start = match.index;
                        if (matchIdx !== 0) {
                            for (var i = 1; i < matchIdx; i++) {
                                start += match[i].length;
                            }
                        }
                        var end = start + match[matchIdx].length;

                        _this6.wrapRangeInMappedTextNode(dict, start, end, function (node) {
                            return filterCb(match[matchIdx], node);
                        }, function (node, lastIndex) {
                            regex.lastIndex = lastIndex;
                            eachCb(node);
                        });
                    }
                    endCb();
                });
            }
        }, {
            key: "unwrapMatches",
            value: function unwrapMatches(node) {
                var parent = node.parentNode;
                var docFrag = document.createDocumentFragment();
                while (node.firstChild) {
                    docFrag.appendChild(node.removeChild(node.firstChild));
                }
                parent.replaceChild(docFrag, node);
                if (!this.ie) {
                    parent.normalize();
                } else {
                    this.normalizeTextNode(parent);
                }
            }
        }, {
            key: "normalizeTextNode",
            value: function normalizeTextNode(node) {
                if (!node) {
                    return;
                }
                if (node.nodeType === 3) {
                    while (node.nextSibling && node.nextSibling.nodeType === 3) {
                        node.nodeValue += node.nextSibling.nodeValue;
                        node.parentNode.removeChild(node.nextSibling);
                    }
                } else {
                    this.normalizeTextNode(node.firstChild);
                }
                this.normalizeTextNode(node.nextSibling);
            }
        }, {
            key: "markRegExp",
            value: function markRegExp(regexp, opt) {
                var _this7 = this;

                this.opt = opt;
                this.log("Searching with expression \"" + regexp + "\"");
                var totalMatches = 0,
                    fn = "wrapMatches";
                var eachCb = function eachCb(element) {
                    totalMatches++;
                    _this7.opt.each(element);
                };
                if (this.opt.acrossElements) {
                    fn = "wrapMatchesAcrossElements";
                }
                this[fn](regexp, this.opt.ignoreGroups, function (match, node) {
                    return _this7.opt.filter(node, match, totalMatches);
                }, eachCb, function () {
                    if (totalMatches === 0) {
                        _this7.opt.noMatch(regexp);
                    }
                    _this7.opt.done(totalMatches);
                });
            }
        }, {
            key: "mark",
            value: function mark(sv, opt) {
                var _this8 = this;

                this.opt = opt;
                var totalMatches = 0,
                    fn = "wrapMatches";

                var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === "string" ? [sv] : sv),
                    kwArr = _getSeparatedKeywords.keywords,
                    kwArrLen = _getSeparatedKeywords.length,
                    sens = this.opt.caseSensitive ? "" : "i",
                    handler = function handler(kw) {
                    var regex = new RegExp(_this8.createRegExp(kw), "gm" + sens),
                        matches = 0;
                    _this8.log("Searching with expression \"" + regex + "\"");
                    _this8[fn](regex, 1, function (term, node) {
                        return _this8.opt.filter(node, kw, totalMatches, matches);
                    }, function (element) {
                        matches++;
                        totalMatches++;
                        _this8.opt.each(element);
                    }, function () {
                        if (matches === 0) {
                            _this8.opt.noMatch(kw);
                        }
                        if (kwArr[kwArrLen - 1] === kw) {
                            _this8.opt.done(totalMatches);
                        } else {
                            handler(kwArr[kwArr.indexOf(kw) + 1]);
                        }
                    });
                };

                if (this.opt.acrossElements) {
                    fn = "wrapMatchesAcrossElements";
                }
                if (kwArrLen === 0) {
                    this.opt.done(totalMatches);
                } else {
                    handler(kwArr[0]);
                }
            }
        }, {
            key: "unmark",
            value: function unmark(opt) {
                var _this9 = this;

                this.opt = opt;
                var sel = this.opt.element ? this.opt.element : "*";
                sel += "[data-markjs]";
                if (this.opt.className) {
                    sel += "." + this.opt.className;
                }
                this.log("Removal selector \"" + sel + "\"");
                this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, function (node) {
                    _this9.unwrapMatches(node);
                }, function (node) {
                    var matchesSel = DOMIterator.matches(node, sel),
                        matchesExclude = _this9.matchesExclude(node);
                    if (!matchesSel || matchesExclude) {
                        return NodeFilter.FILTER_REJECT;
                    } else {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }, this.opt.done);
            }
        }, {
            key: "opt",
            set: function set(val) {
                this._opt = _extends({}, {
                    "element": "",
                    "className": "",
                    "exclude": [],
                    "iframes": false,
                    "iframesTimeout": 5000,
                    "separateWordSearch": true,
                    "diacritics": true,
                    "synonyms": {},
                    "accuracy": "partially",
                    "acrossElements": false,
                    "caseSensitive": false,
                    "ignoreJoiners": false,
                    "ignoreGroups": 0,
                    "wildcards": "disabled",
                    "each": function each() {},
                    "noMatch": function noMatch() {},
                    "filter": function filter() {
                        return true;
                    },
                    "done": function done() {},
                    "debug": false,
                    "log": window.console
                }, val);
            },
            get: function get() {
                return this._opt;
            }
        }, {
            key: "iterator",
            get: function get() {
                if (!this._iterator) {
                    this._iterator = new DOMIterator(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
                }
                return this._iterator;
            }
        }]);

        return Mark;
    }();

    var DOMIterator = function () {
        function DOMIterator(ctx) {
            var iframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var iframesTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

            _classCallCheck(this, DOMIterator);

            this.ctx = ctx;

            this.iframes = iframes;

            this.exclude = exclude;

            this.iframesTimeout = iframesTimeout;
        }

        _createClass(DOMIterator, [{
            key: "getContexts",
            value: function getContexts() {
                var ctx = void 0,
                    filteredCtx = [];
                if (typeof this.ctx === "undefined" || !this.ctx) {
                    ctx = [];
                } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
                    ctx = Array.prototype.slice.call(this.ctx);
                } else if (Array.isArray(this.ctx)) {
                    ctx = this.ctx;
                } else if (typeof this.ctx === "string") {
                    ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
                } else {
                    ctx = [this.ctx];
                }

                ctx.forEach(function (ctx) {
                    var isDescendant = filteredCtx.filter(function (contexts) {
                        return contexts.contains(ctx);
                    }).length > 0;
                    if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
                        filteredCtx.push(ctx);
                    }
                });
                return filteredCtx;
            }
        }, {
            key: "getIframeContents",
            value: function getIframeContents(ifr, successFn) {
                var errorFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

                var doc = void 0;
                try {
                    var ifrWin = ifr.contentWindow;
                    doc = ifrWin.document;
                    if (!ifrWin || !doc) {
                        throw new Error("iframe inaccessible");
                    }
                } catch (e) {
                    errorFn();
                }
                if (doc) {
                    successFn(doc);
                }
            }
        }, {
            key: "isIframeBlank",
            value: function isIframeBlank(ifr) {
                var bl = "about:blank",
                    src = ifr.getAttribute("src").trim(),
                    href = ifr.contentWindow.location.href;
                return href === bl && src !== bl && src;
            }
        }, {
            key: "observeIframeLoad",
            value: function observeIframeLoad(ifr, successFn, errorFn) {
                var _this10 = this;

                var called = false,
                    tout = null;
                var listener = function listener() {
                    if (called) {
                        return;
                    }
                    called = true;
                    clearTimeout(tout);
                    try {
                        if (!_this10.isIframeBlank(ifr)) {
                            ifr.removeEventListener("load", listener);
                            _this10.getIframeContents(ifr, successFn, errorFn);
                        }
                    } catch (e) {
                        errorFn();
                    }
                };
                ifr.addEventListener("load", listener);
                tout = setTimeout(listener, this.iframesTimeout);
            }
        }, {
            key: "onIframeReady",
            value: function onIframeReady(ifr, successFn, errorFn) {
                try {
                    if (ifr.contentWindow.document.readyState === "complete") {
                        if (this.isIframeBlank(ifr)) {
                            this.observeIframeLoad(ifr, successFn, errorFn);
                        } else {
                            this.getIframeContents(ifr, successFn, errorFn);
                        }
                    } else {
                        this.observeIframeLoad(ifr, successFn, errorFn);
                    }
                } catch (e) {
                    errorFn();
                }
            }
        }, {
            key: "waitForIframes",
            value: function waitForIframes(ctx, done) {
                var _this11 = this;

                var eachCalled = 0;
                this.forEachIframe(ctx, function () {
                    return true;
                }, function (ifr) {
                    eachCalled++;
                    _this11.waitForIframes(ifr.querySelector("html"), function () {
                        if (! --eachCalled) {
                            done();
                        }
                    });
                }, function (handled) {
                    if (!handled) {
                        done();
                    }
                });
            }
        }, {
            key: "forEachIframe",
            value: function forEachIframe(ctx, filter, each) {
                var _this12 = this;

                var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

                var ifr = ctx.querySelectorAll("iframe"),
                    open = ifr.length,
                    handled = 0;
                ifr = Array.prototype.slice.call(ifr);
                var checkEnd = function checkEnd() {
                    if (--open <= 0) {
                        end(handled);
                    }
                };
                if (!open) {
                    checkEnd();
                }
                ifr.forEach(function (ifr) {
                    if (DOMIterator.matches(ifr, _this12.exclude)) {
                        checkEnd();
                    } else {
                        _this12.onIframeReady(ifr, function (con) {
                            if (filter(ifr)) {
                                handled++;
                                each(con);
                            }
                            checkEnd();
                        }, checkEnd);
                    }
                });
            }
        }, {
            key: "createIterator",
            value: function createIterator(ctx, whatToShow, filter) {
                return document.createNodeIterator(ctx, whatToShow, filter, false);
            }
        }, {
            key: "createInstanceOnIframe",
            value: function createInstanceOnIframe(contents) {
                return new DOMIterator(contents.querySelector("html"), this.iframes);
            }
        }, {
            key: "compareNodeIframe",
            value: function compareNodeIframe(node, prevNode, ifr) {
                var compCurr = node.compareDocumentPosition(ifr),
                    prev = Node.DOCUMENT_POSITION_PRECEDING;
                if (compCurr & prev) {
                    if (prevNode !== null) {
                        var compPrev = prevNode.compareDocumentPosition(ifr),
                            after = Node.DOCUMENT_POSITION_FOLLOWING;
                        if (compPrev & after) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
                return false;
            }
        }, {
            key: "getIteratorNode",
            value: function getIteratorNode(itr) {
                var prevNode = itr.previousNode();
                var node = void 0;
                if (prevNode === null) {
                    node = itr.nextNode();
                } else {
                    node = itr.nextNode() && itr.nextNode();
                }
                return {
                    prevNode: prevNode,
                    node: node
                };
            }
        }, {
            key: "checkIframeFilter",
            value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
                var key = false,
                    handled = false;
                ifr.forEach(function (ifrDict, i) {
                    if (ifrDict.val === currIfr) {
                        key = i;
                        handled = ifrDict.handled;
                    }
                });
                if (this.compareNodeIframe(node, prevNode, currIfr)) {
                    if (key === false && !handled) {
                        ifr.push({
                            val: currIfr,
                            handled: true
                        });
                    } else if (key !== false && !handled) {
                        ifr[key].handled = true;
                    }
                    return true;
                }
                if (key === false) {
                    ifr.push({
                        val: currIfr,
                        handled: false
                    });
                }
                return false;
            }
        }, {
            key: "handleOpenIframes",
            value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
                var _this13 = this;

                ifr.forEach(function (ifrDict) {
                    if (!ifrDict.handled) {
                        _this13.getIframeContents(ifrDict.val, function (con) {
                            _this13.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
                        });
                    }
                });
            }
        }, {
            key: "iterateThroughNodes",
            value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
                var _this14 = this;

                var itr = this.createIterator(ctx, whatToShow, filterCb);
                var ifr = [],
                    elements = [],
                    node = void 0,
                    prevNode = void 0,
                    retrieveNodes = function retrieveNodes() {
                    var _getIteratorNode = _this14.getIteratorNode(itr);

                    prevNode = _getIteratorNode.prevNode;
                    node = _getIteratorNode.node;

                    return node;
                };
                while (retrieveNodes()) {
                    if (this.iframes) {
                        this.forEachIframe(ctx, function (currIfr) {
                            return _this14.checkIframeFilter(node, prevNode, currIfr, ifr);
                        }, function (con) {
                            _this14.createInstanceOnIframe(con).forEachNode(whatToShow, eachCb, filterCb);
                        });
                    }

                    elements.push(node);
                }
                elements.forEach(function (node) {
                    eachCb(node);
                });
                if (this.iframes) {
                    this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
                }
                doneCb();
            }
        }, {
            key: "forEachNode",
            value: function forEachNode(whatToShow, each, filter) {
                var _this15 = this;

                var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

                var contexts = this.getContexts();
                var open = contexts.length;
                if (!open) {
                    done();
                }
                contexts.forEach(function (ctx) {
                    var ready = function ready() {
                        _this15.iterateThroughNodes(whatToShow, ctx, each, filter, function () {
                            if (--open <= 0) {
                                done();
                            }
                        });
                    };

                    if (_this15.iframes) {
                        _this15.waitForIframes(ctx, ready);
                    } else {
                        ready();
                    }
                });
            }
        }], [{
            key: "matches",
            value: function matches(element, selector) {
                var selectors = typeof selector === "string" ? [selector] : selector,
                    fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
                if (fn) {
                    var match = false;
                    selectors.every(function (sel) {
                        if (fn.call(element, sel)) {
                            match = true;
                            return false;
                        }
                        return true;
                    });
                    return match;
                } else {
                    return false;
                }
            }
        }]);

        return DOMIterator;
    }();

    $.fn.mark = function (sv, opt) {
        new Mark(this.get()).mark(sv, opt);
        return this;
    };
    $.fn.markRegExp = function (regexp, opt) {
        new Mark(this.get()).markRegExp(regexp, opt);
        return this;
    };
    $.fn.unmark = function (opt) {
        new Mark(this.get()).unmark(opt);
        return this;
    };
    return $;
}, window, document);
