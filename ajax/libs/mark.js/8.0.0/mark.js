/*!***************************************************
 * mark.js v8.0.0
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2016, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory, window, document) {
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return factory(window, document);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        module.exports = factory(window, document);
    } else {
        factory(window, document);
    }
})(function (window, document) {
    var Mark = function () {
        function Mark(ctx) {
            _classCallCheck(this, Mark);

            this.ctx = ctx;
        }

        _createClass(Mark, [{
            key: "log",
            value: function log(msg) {
                var level = arguments.length <= 1 || arguments[1] === undefined ? "debug" : arguments[1];

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
                str = this.escapeStr(str);
                if (Object.keys(this.opt.synonyms).length) {
                    str = this.createSynonymsRegExp(str);
                }
                if (this.opt.diacritics) {
                    str = this.createDiacriticsRegExp(str);
                }
                str = this.createMergedBlanksRegExp(str);
                str = this.createAccuracyRegExp(str);
                return str;
            }
        }, {
            key: "createSynonymsRegExp",
            value: function createSynonymsRegExp(str) {
                var syn = this.opt.synonyms;
                for (var index in syn) {
                    if (syn.hasOwnProperty(index)) {
                        var value = syn[index],
                            k1 = this.escapeStr(index),
                            k2 = this.escapeStr(value);
                        str = str.replace(new RegExp("(" + k1 + "|" + k2 + ")", "gmi"), "(" + k1 + "|" + k2 + ")");
                    }
                }
                return str;
            }
        }, {
            key: "createDiacriticsRegExp",
            value: function createDiacriticsRegExp(str) {
                var dct = ["aÀÁÂÃÄÅàáâãäåĀāąĄ", "cÇçćĆčČ", "dđĐďĎ", "eÈÉÊËèéêëěĚĒēęĘ", "iÌÍÎÏìíîïĪī", "lłŁ", "nÑñňŇńŃ", "oÒÓÔÕÕÖØòóôõöøŌō", "rřŘ", "sŠšśŚ", "tťŤ", "uÙÚÛÜùúûüůŮŪū", "yŸÿýÝ", "zŽžżŻźŹ"];
                var handled = [];
                str.split("").forEach(function (ch) {
                    dct.every(function (dct) {
                        if (dct.indexOf(ch) !== -1) {
                            if (handled.indexOf(dct) > -1) {
                                return false;
                            }

                            str = str.replace(new RegExp("[" + dct + "]", "gmi"), "[" + dct + "]");
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
                return str.replace(/[\s]+/gmi, "[\\s]*");
            }
        }, {
            key: "createAccuracyRegExp",
            value: function createAccuracyRegExp(str) {
                var _this = this;

                var acc = this.opt.accuracy,
                    val = typeof acc === "string" ? acc : acc.value,
                    ls = typeof acc === "string" ? [] : acc.limiters,
                    lsJoin = "";
                ls.forEach(function (limiter) {
                    lsJoin += "|" + _this.escapeStr(limiter);
                });
                switch (val) {
                    case "partially":
                        return "()(" + str + ")";
                    case "complementary":
                        return "()([^\\s" + lsJoin + "]*" + str + "[^\\s" + lsJoin + "]*)";
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
                    if (_this3.matchesExclude(node.parentNode, true)) {
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
            value: function matchesExclude(el, exclM) {
                var remain = true;
                var excl = this.opt.exclude.concat(["script", "style", "title", "head", "html"]);
                if (exclM) {
                    excl = excl.concat(["*[data-markjs='true']"]);
                }
                excl.every(function (sel) {
                    if (DOMIterator.matches(el, sel)) {
                        return remain = false;
                    }
                    return true;
                });
                return !remain;
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
                            var s = start - n.start,
                                e = (end > n.end ? n.end : end) - n.start;
                            if (filterCb(n.node)) {
                                n.node = _this4.wrapRangeInTextNode(n.node, s, e);

                                var startStr = dict.value.substr(0, n.start),
                                    endStr = dict.value.substr(e + n.start);
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
                            }
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                    return true;
                });
            }
        }, {
            key: "wrapMatches",
            value: function wrapMatches(regex, custom, filterCb, eachCb, endCb) {
                var _this5 = this;

                var matchIdx = custom ? 0 : 2;
                this.getTextNodes(function (dict) {
                    dict.nodes.forEach(function (node) {
                        node = node.node;
                        var match = void 0;
                        while ((match = regex.exec(node.textContent)) !== null) {
                            if (!filterCb(match[matchIdx], node)) {
                                continue;
                            }
                            var pos = match.index;
                            if (!custom) {
                                pos += match[matchIdx - 1].length;
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
            value: function wrapMatchesAcrossElements(regex, custom, filterCb, eachCb, endCb) {
                var _this6 = this;

                var matchIdx = custom ? 0 : 2;
                this.getTextNodes(function (dict) {
                    var match = void 0;
                    while ((match = regex.exec(dict.value)) !== null) {
                        var start = match.index;
                        if (!custom) {
                            start += match[matchIdx - 1].length;
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
                parent.normalize();
            }
        }, {
            key: "markRegExp",
            value: function markRegExp(regexp, opt) {
                var _this7 = this;

                this.opt = opt;
                this.log("Searching with expression \"" + regexp + "\"");
                var totalMatches = 0;
                var eachCb = function eachCb(element) {
                    totalMatches++;
                    _this7.opt.each(element);
                };
                var fn = "wrapMatches";
                if (this.opt.acrossElements) {
                    fn = "wrapMatchesAcrossElements";
                }
                this[fn](regexp, true, function (match, node) {
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

                var _getSeparatedKeywords = this.getSeparatedKeywords(typeof sv === "string" ? [sv] : sv);

                var kwArr = _getSeparatedKeywords.keywords;
                var kwArrLen = _getSeparatedKeywords.length;

                var totalMatches = 0,
                    fn = "wrapMatches";
                if (this.opt.acrossElements) {
                    fn = "wrapMatchesAcrossElements";
                }
                if (kwArrLen === 0) {
                    this.opt.done(totalMatches);
                    return;
                }
                var handler = function handler(kw) {
                    var regex = new RegExp(_this8.createRegExp(kw), "gmi"),
                        matches = 0;
                    _this8.log("Searching with expression \"" + regex + "\"");
                    _this8[fn](regex, false, function (term, node) {
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
                handler(kwArr[0]);
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
                        matchesExclude = _this9.matchesExclude(node, false);
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
                    "separateWordSearch": true,
                    "diacritics": true,
                    "synonyms": {},
                    "accuracy": "partially",
                    "acrossElements": false,
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
                    this._iterator = new DOMIterator(this.ctx, this.opt.iframes);
                }
                return this._iterator;
            }
        }]);

        return Mark;
    }();

    var DOMIterator = function () {
        function DOMIterator(ctx) {
            var iframes = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            _classCallCheck(this, DOMIterator);

            this.ctx = ctx;

            this.iframes = iframes;
        }

        _createClass(DOMIterator, [{
            key: "getContexts",
            value: function getContexts() {
                var ctx = void 0;
                if (typeof this.ctx === "undefined" || !this.ctx) {
                    ctx = [];
                } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
                    ctx = Array.prototype.slice.call(this.ctx);
                } else if (Array.isArray(this.ctx)) {
                    ctx = this.ctx;
                } else {
                    ctx = [this.ctx];
                }

                var filteredCtx = [];
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
                var errorFn = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

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
            key: "onIframeReady",
            value: function onIframeReady(ifr, successFn, errorFn) {
                var _this10 = this;

                try {
                    (function () {
                        var ifrWin = ifr.contentWindow,
                            bl = "about:blank",
                            compl = "complete",
                            isBlank = function isBlank() {
                            var src = ifr.getAttribute("src").trim(),
                                href = ifrWin.location.href;
                            return href === bl && src !== bl && src;
                        },
                            observeOnload = function observeOnload() {
                            var listener = function listener() {
                                try {
                                    if (!isBlank()) {
                                        ifr.removeEventListener("load", listener);
                                        _this10.getIframeContents(ifr, successFn, errorFn);
                                    }
                                } catch (e) {
                                    errorFn();
                                }
                            };
                            ifr.addEventListener("load", listener);
                        };
                        if (ifrWin.document.readyState === compl) {
                            if (isBlank()) {
                                observeOnload();
                            } else {
                                _this10.getIframeContents(ifr, successFn, errorFn);
                            }
                        } else {
                            observeOnload();
                        }
                    })();
                } catch (e) {
                    errorFn();
                }
            }
        }, {
            key: "forEachIframe",
            value: function forEachIframe(ctx, filter, each, end) {
                var _this11 = this;

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
                    _this11.onIframeReady(ifr, function (con) {
                        if (filter(ifr)) {
                            handled++;
                            each(con);
                        }
                        checkEnd();
                    }, checkEnd);
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
                contents = contents.querySelector("html");
                return new DOMIterator(contents, this.iframes);
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
            value: function handleOpenIframes(ifr, whatToShow, eCb, fCb, endCb) {
                var _this12 = this;

                var endAlreadyCalled = false;
                ifr.forEach(function (ifrDict) {
                    if (!ifrDict.handled) {
                        endAlreadyCalled = true;
                        _this12.getIframeContents(ifrDict.val, function (c) {
                            _this12.createInstanceOnIframe(c).forEachNode(whatToShow, eCb, fCb, endCb);
                        });
                    }
                });
                if (!endAlreadyCalled) {
                    endCb();
                }
            }
        }, {
            key: "iterateThroughNodes",
            value: function iterateThroughNodes(whatToShow, ctx, eCb, fCb, endCb, itr) {
                var _this13 = this;

                var ifr = arguments.length <= 6 || arguments[6] === undefined ? [] : arguments[6];

                itr = !itr ? this.createIterator(ctx, whatToShow, fCb) : itr;

                var _getIteratorNode = this.getIteratorNode(itr);

                var prevNode = _getIteratorNode.prevNode;
                var node = _getIteratorNode.node;
                var done = function done() {
                    if (node !== null) {
                        eCb(node);
                    }
                    if (itr.nextNode()) {
                        itr.previousNode();
                        _this13.iterateThroughNodes(whatToShow, ctx, eCb, fCb, endCb, itr, ifr);
                    } else {
                        _this13.handleOpenIframes(ifr, whatToShow, eCb, fCb, endCb);
                    }
                };
                if (!this.iframes) {
                    done();
                } else {
                    this.forEachIframe(ctx, function (currIfr) {
                        return _this13.checkIframeFilter(node, prevNode, currIfr, ifr);
                    }, function (con) {
                        _this13.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb, done);
                    }, function (handled) {
                        if (handled === 0) {
                            done();
                        }
                    });
                }
            }
        }, {
            key: "forEachNode",
            value: function forEachNode(whatToShow, cb, filterCb) {
                var _this14 = this;

                var end = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];

                var contexts = this.getContexts();
                var open = contexts.length;
                if (!open) {
                    end();
                }
                contexts.forEach(function (ctx) {
                    _this14.iterateThroughNodes(whatToShow, ctx, cb, filterCb, function () {
                        if (--open <= 0) {
                            end();
                        }
                    });
                });
            }
        }], [{
            key: "matches",
            value: function matches(el, selector) {
                var fn = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.oMatchesSelector || el.webkitMatchesSelector;
                if (fn) {
                    return fn.call(el, selector);
                } else {
                    return false;
                }
            }
        }]);

        return DOMIterator;
    }();

    window.Mark = function (ctx) {
        var _this15 = this;

        var instance = new Mark(ctx);
        this.mark = function (sv, opt) {
            instance.mark(sv, opt);
            return _this15;
        };
        this.markRegExp = function (sv, opt) {
            instance.markRegExp(sv, opt);
            return _this15;
        };
        this.unmark = function (opt) {
            instance.unmark(opt);
            return _this15;
        };
        return this;
    };

    return window.Mark;
}, window, document);
