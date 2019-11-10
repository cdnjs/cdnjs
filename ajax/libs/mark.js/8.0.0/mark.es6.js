/*!***************************************************
 * mark.js v8.0.0
 * https://github.com/julmot/mark.js
 * Copyright (c) 2014–2016, Julian Motz
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/

"use strict";

((factory, window, document) => {
    if (typeof define === "function" && define.amd) {
        define([], () => {
            return factory(window, document);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(window, document);
    } else {
        factory(window, document);
    }
})((window, document) => {
    class Mark {
        constructor(ctx) {
            this.ctx = ctx;
        }

        set opt(val) {
            this._opt = Object.assign({}, {
                "element": "",
                "className": "",
                "exclude": [],
                "iframes": false,
                "separateWordSearch": true,
                "diacritics": true,
                "synonyms": {},
                "accuracy": "partially",
                "acrossElements": false,
                "each": () => {},
                "noMatch": () => {},
                "filter": () => true,
                "done": () => {},
                "debug": false,
                "log": window.console
            }, val);
        }

        get opt() {
            return this._opt;
        }

        get iterator() {
            if (!this._iterator) {
                this._iterator = new DOMIterator(this.ctx, this.opt.iframes);
            }
            return this._iterator;
        }

        log(msg, level = "debug") {
            const log = this.opt.log;
            if (!this.opt.debug) {
                return;
            }
            if (typeof log === "object" && typeof log[level] === "function") {
                log[level](`mark.js: ${ msg }`);
            }
        }

        escapeStr(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        createRegExp(str) {
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

        createSynonymsRegExp(str) {
            const syn = this.opt.synonyms;
            for (let index in syn) {
                if (syn.hasOwnProperty(index)) {
                    const value = syn[index],
                          k1 = this.escapeStr(index),
                          k2 = this.escapeStr(value);
                    str = str.replace(new RegExp(`(${ k1 }|${ k2 })`, "gmi"), `(${ k1 }|${ k2 })`);
                }
            }
            return str;
        }

        createDiacriticsRegExp(str) {
            const dct = ["aÀÁÂÃÄÅàáâãäåĀāąĄ", "cÇçćĆčČ", "dđĐďĎ", "eÈÉÊËèéêëěĚĒēęĘ", "iÌÍÎÏìíîïĪī", "lłŁ", "nÑñňŇńŃ", "oÒÓÔÕÕÖØòóôõöøŌō", "rřŘ", "sŠšśŚ", "tťŤ", "uÙÚÛÜùúûüůŮŪū", "yŸÿýÝ", "zŽžżŻźŹ"];
            let handled = [];
            str.split("").forEach(ch => {
                dct.every(dct => {
                    if (dct.indexOf(ch) !== -1) {
                        if (handled.indexOf(dct) > -1) {
                            return false;
                        }

                        str = str.replace(new RegExp(`[${ dct }]`, "gmi"), `[${ dct }]`);
                        handled.push(dct);
                    }
                    return true;
                });
            });
            return str;
        }

        createMergedBlanksRegExp(str) {
            return str.replace(/[\s]+/gmi, "[\\s]*");
        }

        createAccuracyRegExp(str) {
            let acc = this.opt.accuracy,
                val = typeof acc === "string" ? acc : acc.value,
                ls = typeof acc === "string" ? [] : acc.limiters,
                lsJoin = "";
            ls.forEach(limiter => {
                lsJoin += `|${ this.escapeStr(limiter) }`;
            });
            switch (val) {
                case "partially":
                    return `()(${ str })`;
                case "complementary":
                    return `()([^\\s${ lsJoin }]*${ str }[^\\s${ lsJoin }]*)`;
                case "exactly":
                    return `(^|\\s${ lsJoin })(${ str })(?=$|\\s${ lsJoin })`;
            }
        }

        getSeparatedKeywords(sv) {
            let stack = [];
            sv.forEach(kw => {
                if (!this.opt.separateWordSearch) {
                    if (kw.trim() && stack.indexOf(kw) === -1) {
                        stack.push(kw);
                    }
                } else {
                    kw.split(" ").forEach(kwSplitted => {
                        if (kwSplitted.trim() && stack.indexOf(kwSplitted) === -1) {
                            stack.push(kwSplitted);
                        }
                    });
                }
            });
            return {
                "keywords": stack.sort((a, b) => {
                    return b.length - a.length;
                }),
                "length": stack.length
            };
        }

        getTextNodes(cb) {
            let val = "",
                nodes = [];
            this.iterator.forEachNode(NodeFilter.SHOW_TEXT, node => {
                nodes.push({
                    start: val.length,
                    end: (val += node.textContent).length,
                    node
                });
            }, node => {
                if (this.matchesExclude(node.parentNode, true)) {
                    return NodeFilter.FILTER_REJECT;
                } else {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }, () => {
                cb({
                    value: val,
                    nodes: nodes
                });
            });
        }

        matchesExclude(el, exclM) {
            let remain = true;
            let excl = this.opt.exclude.concat(["script", "style", "title", "head", "html"]);
            if (exclM) {
                excl = excl.concat(["*[data-markjs='true']"]);
            }
            excl.every(sel => {
                if (DOMIterator.matches(el, sel)) {
                    return remain = false;
                }
                return true;
            });
            return !remain;
        }

        wrapRangeInTextNode(node, start, end) {
            const hEl = !this.opt.element ? "mark" : this.opt.element,
                  startNode = node.splitText(start),
                  ret = startNode.splitText(end - start);
            let repl = document.createElement(hEl);
            repl.setAttribute("data-markjs", "true");
            if (this.opt.className) {
                repl.setAttribute("class", this.opt.className);
            }
            repl.textContent = startNode.textContent;
            startNode.parentNode.replaceChild(repl, startNode);
            return ret;
        }

        wrapRangeInMappedTextNode(dict, start, end, filterCb, eachCb) {
            dict.nodes.every((n, i) => {
                const sibl = dict.nodes[i + 1];
                if (typeof sibl === "undefined" || sibl.start > start) {
                    const s = start - n.start,
                          e = (end > n.end ? n.end : end) - n.start;
                    if (filterCb(n.node)) {
                        n.node = this.wrapRangeInTextNode(n.node, s, e);

                        const startStr = dict.value.substr(0, n.start),
                              endStr = dict.value.substr(e + n.start);
                        dict.value = startStr + endStr;
                        dict.nodes.forEach((k, j) => {
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
                            return false;
                        }
                    }
                }
                return true;
            });
        }

        wrapMatches(regex, custom, filterCb, eachCb, endCb) {
            const matchIdx = custom ? 0 : 2;
            this.getTextNodes(dict => {
                dict.nodes.forEach(node => {
                    node = node.node;
                    let match;
                    while ((match = regex.exec(node.textContent)) !== null) {
                        if (!filterCb(match[matchIdx], node)) {
                            continue;
                        }
                        let pos = match.index;
                        if (!custom) {
                            pos += match[matchIdx - 1].length;
                        }
                        node = this.wrapRangeInTextNode(node, pos, pos + match[matchIdx].length);
                        eachCb(node.previousSibling);

                        regex.lastIndex = 0;
                    }
                });
                endCb();
            });
        }

        wrapMatchesAcrossElements(regex, custom, filterCb, eachCb, endCb) {
            const matchIdx = custom ? 0 : 2;
            this.getTextNodes(dict => {
                let match;
                while ((match = regex.exec(dict.value)) !== null) {
                    let start = match.index;
                    if (!custom) {
                        start += match[matchIdx - 1].length;
                    }
                    const end = start + match[matchIdx].length;

                    this.wrapRangeInMappedTextNode(dict, start, end, node => {
                        return filterCb(match[matchIdx], node);
                    }, (node, lastIndex) => {
                        regex.lastIndex = lastIndex;
                        eachCb(node);
                    });
                }
                endCb();
            });
        }

        unwrapMatches(node) {
            const parent = node.parentNode;
            let docFrag = document.createDocumentFragment();
            while (node.firstChild) {
                docFrag.appendChild(node.removeChild(node.firstChild));
            }
            parent.replaceChild(docFrag, node);
            parent.normalize();
        }

        markRegExp(regexp, opt) {
            this.opt = opt;
            this.log(`Searching with expression "${ regexp }"`);
            let totalMatches = 0;
            const eachCb = element => {
                totalMatches++;
                this.opt.each(element);
            };
            let fn = "wrapMatches";
            if (this.opt.acrossElements) {
                fn = "wrapMatchesAcrossElements";
            }
            this[fn](regexp, true, (match, node) => {
                return this.opt.filter(node, match, totalMatches);
            }, eachCb, () => {
                if (totalMatches === 0) {
                    this.opt.noMatch(regexp);
                }
                this.opt.done(totalMatches);
            });
        }

        mark(sv, opt) {
            this.opt = opt;
            const {
                keywords: kwArr,
                length: kwArrLen
            } = this.getSeparatedKeywords(typeof sv === "string" ? [sv] : sv);
            let totalMatches = 0,
                fn = "wrapMatches";
            if (this.opt.acrossElements) {
                fn = "wrapMatchesAcrossElements";
            }
            if (kwArrLen === 0) {
                this.opt.done(totalMatches);
                return;
            }
            const handler = kw => {
                let regex = new RegExp(this.createRegExp(kw), "gmi"),
                    matches = 0;
                this.log(`Searching with expression "${ regex }"`);
                this[fn](regex, false, (term, node) => {
                    return this.opt.filter(node, kw, totalMatches, matches);
                }, element => {
                    matches++;
                    totalMatches++;
                    this.opt.each(element);
                }, () => {
                    if (matches === 0) {
                        this.opt.noMatch(kw);
                    }
                    if (kwArr[kwArrLen - 1] === kw) {
                        this.opt.done(totalMatches);
                    } else {
                        handler(kwArr[kwArr.indexOf(kw) + 1]);
                    }
                });
            };
            handler(kwArr[0]);
        }

        unmark(opt) {
            this.opt = opt;
            let sel = this.opt.element ? this.opt.element : "*";
            sel += "[data-markjs]";
            if (this.opt.className) {
                sel += `.${ this.opt.className }`;
            }
            this.log(`Removal selector "${ sel }"`);
            this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, node => {
                this.unwrapMatches(node);
            }, node => {
                const matchesSel = DOMIterator.matches(node, sel),
                      matchesExclude = this.matchesExclude(node, false);
                if (!matchesSel || matchesExclude) {
                    return NodeFilter.FILTER_REJECT;
                } else {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }, this.opt.done);
        }
    }

    class DOMIterator {
        constructor(ctx, iframes = true) {
            this.ctx = ctx;

            this.iframes = iframes;
        }

        getContexts() {
            let ctx;
            if (typeof this.ctx === "undefined" || !this.ctx) {
                ctx = [];
            } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
                ctx = Array.prototype.slice.call(this.ctx);
            } else if (Array.isArray(this.ctx)) {
                ctx = this.ctx;
            } else {
                ctx = [this.ctx];
            }

            let filteredCtx = [];
            ctx.forEach(ctx => {
                const isDescendant = filteredCtx.filter(contexts => {
                    return contexts.contains(ctx);
                }).length > 0;
                if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
                    filteredCtx.push(ctx);
                }
            });
            return filteredCtx;
        }

        static matches(el, selector) {
            const fn = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.oMatchesSelector || el.webkitMatchesSelector;
            if (fn) {
                return fn.call(el, selector);
            } else {
                return false;
            }
        }

        getIframeContents(ifr, successFn, errorFn = () => {}) {
            let doc;
            try {
                const ifrWin = ifr.contentWindow;
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

        onIframeReady(ifr, successFn, errorFn) {
            try {
                const ifrWin = ifr.contentWindow,
                      bl = "about:blank",
                      compl = "complete",
                      isBlank = () => {
                    const src = ifr.getAttribute("src").trim(),
                          href = ifrWin.location.href;
                    return href === bl && src !== bl && src;
                },
                      observeOnload = () => {
                    const listener = () => {
                        try {
                            if (!isBlank()) {
                                ifr.removeEventListener("load", listener);
                                this.getIframeContents(ifr, successFn, errorFn);
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
                        this.getIframeContents(ifr, successFn, errorFn);
                    }
                } else {
                    observeOnload();
                }
            } catch (e) {
                errorFn();
            }
        }

        forEachIframe(ctx, filter, each, end) {
            let ifr = ctx.querySelectorAll("iframe"),
                open = ifr.length,
                handled = 0;
            ifr = Array.prototype.slice.call(ifr);
            const checkEnd = () => {
                if (--open <= 0) {
                    end(handled);
                }
            };
            if (!open) {
                checkEnd();
            }
            ifr.forEach(ifr => {
                this.onIframeReady(ifr, con => {
                    if (filter(ifr)) {
                        handled++;
                        each(con);
                    }
                    checkEnd();
                }, checkEnd);
            });
        }

        createIterator(ctx, whatToShow, filter) {
            return document.createNodeIterator(ctx, whatToShow, filter, false);
        }

        createInstanceOnIframe(contents) {
            contents = contents.querySelector("html");
            return new DOMIterator(contents, this.iframes);
        }

        compareNodeIframe(node, prevNode, ifr) {
            const compCurr = node.compareDocumentPosition(ifr),
                  prev = Node.DOCUMENT_POSITION_PRECEDING;
            if (compCurr & prev) {
                if (prevNode !== null) {
                    const compPrev = prevNode.compareDocumentPosition(ifr),
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

        getIteratorNode(itr) {
            const prevNode = itr.previousNode();
            let node;
            if (prevNode === null) {
                node = itr.nextNode();
            } else {
                node = itr.nextNode() && itr.nextNode();
            }
            return {
                prevNode,
                node
            };
        }

        checkIframeFilter(node, prevNode, currIfr, ifr) {
            let key = false,
                handled = false;
            ifr.forEach((ifrDict, i) => {
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

        handleOpenIframes(ifr, whatToShow, eCb, fCb, endCb) {
            let endAlreadyCalled = false;
            ifr.forEach(ifrDict => {
                if (!ifrDict.handled) {
                    endAlreadyCalled = true;
                    this.getIframeContents(ifrDict.val, c => {
                        this.createInstanceOnIframe(c).forEachNode(whatToShow, eCb, fCb, endCb);
                    });
                }
            });
            if (!endAlreadyCalled) {
                endCb();
            }
        }

        iterateThroughNodes(whatToShow, ctx, eCb, fCb, endCb, itr, ifr = []) {
            itr = !itr ? this.createIterator(ctx, whatToShow, fCb) : itr;
            const {
                prevNode,
                node
            } = this.getIteratorNode(itr),
                  done = () => {
                if (node !== null) {
                    eCb(node);
                }
                if (itr.nextNode()) {
                    itr.previousNode();
                    this.iterateThroughNodes(whatToShow, ctx, eCb, fCb, endCb, itr, ifr);
                } else {
                    this.handleOpenIframes(ifr, whatToShow, eCb, fCb, endCb);
                }
            };
            if (!this.iframes) {
                done();
            } else {
                this.forEachIframe(ctx, currIfr => {
                    return this.checkIframeFilter(node, prevNode, currIfr, ifr);
                }, con => {
                    this.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb, done);
                }, handled => {
                    if (handled === 0) {
                        done();
                    }
                });
            }
        }

        forEachNode(whatToShow, cb, filterCb, end = () => {}) {
            const contexts = this.getContexts();
            let open = contexts.length;
            if (!open) {
                end();
            }
            contexts.forEach(ctx => {
                this.iterateThroughNodes(whatToShow, ctx, cb, filterCb, () => {
                    if (--open <= 0) {
                        end();
                    }
                });
            });
        }

    }

    window.Mark = function (ctx) {
        const instance = new Mark(ctx);
        this.mark = (sv, opt) => {
            instance.mark(sv, opt);
            return this;
        };
        this.markRegExp = (sv, opt) => {
            instance.markRegExp(sv, opt);
            return this;
        };
        this.unmark = opt => {
            instance.unmark(opt);
            return this;
        };
        return this;
    };

    return window.Mark;
}, window, document);
