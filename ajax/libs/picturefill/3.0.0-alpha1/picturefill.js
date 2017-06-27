/*! Picturefill - v3.0.0 - 2015-05-14
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
!function(window, document, undefined) {
    "use strict";
    function isSpace(c) {
        return " " === c || "	" === c || "\n" === c || "\f" === c || "\r" === c;
    }
    function updateMetrics() {
        var dprM;
        isVwDirty = !1, DPR = window.devicePixelRatio, cssCache = {}, sizeLengthCache = {}, 
        dprM = (DPR || 1) * cfg.xQuant, cfg.uT || (cfg.maxX = Math.max(1.3, cfg.maxX), dprM = Math.min(dprM, cfg.maxX), 
        ri.DPR = dprM), units.width = Math.max(window.innerWidth || 0, docElem.clientWidth), 
        units.height = Math.max(window.innerHeight || 0, docElem.clientHeight), units.vw = units.width / 100, 
        units.vh = units.height / 100, evalId = [ units.height, units.width, dprM ].join("-"), 
        units.em = ri.getEmValue(), units.rem = units.em, lazyFactor = cfg.lazyFactor / 2, 
        lazyFactor = lazyFactor * dprM + lazyFactor, lowTreshold = .5 + .2 * dprM, partialLowTreshold = .5 + .25 * dprM, 
        (isLandscape = units.width > units.height) || (lazyFactor *= .9), supportAbort && (lazyFactor *= .9);
    }
    function chooseLowRes(lowRes, diff, dpr) {
        var add = diff * Math.pow(lowRes - .4, 1.2);
        return isLandscape || (add /= 1.3), lowRes += add, lowRes > dpr;
    }
    function applyBestCandidate(img) {
        var srcSetCandidates, matchingSet = ri.getSet(img), evaluated = !1;
        "pending" !== matchingSet && (evaluated = evalId, matchingSet && (srcSetCandidates = ri.setRes(matchingSet), 
        ri.applySetCandidate(srcSetCandidates, img))), img[ri.ns].evaled = evaluated;
    }
    function ascendingSort(a, b) {
        return a.res - b.res;
    }
    function setSrcToCur(img, src, set) {
        var candidate;
        return !set && src && (set = img[ri.ns].sets, set = set && set[set.length - 1]), 
        candidate = getCandidateForSrc(src, set), candidate && (src = ri.makeUrl(src), img[ri.ns].curSrc = src, 
        img[ri.ns].curCan = candidate, candidate.res || setResolution(candidate, candidate.set.sizes)), 
        candidate;
    }
    function getCandidateForSrc(src, set) {
        var i, candidate, candidates;
        if (src && set) for (candidates = ri.parseSet(set), src = ri.makeUrl(src), i = 0; i < candidates.length; i++) if (src === ri.makeUrl(candidates[i].url)) {
            candidate = candidates[i];
            break;
        }
        return candidate;
    }
    function getAllSourceElements(picture, candidates) {
        var i, len, source, srcset, sources = picture.getElementsByTagName("source");
        for (i = 0, len = sources.length; len > i; i++) source = sources[i], source[ri.ns] = !0, 
        srcset = source.getAttribute("srcset"), srcset && candidates.push({
            srcset: srcset,
            media: source.getAttribute("media"),
            type: source.getAttribute("type"),
            sizes: source.getAttribute("sizes")
        });
    }
    function parseSrcset(input, set) {
        function collectCharacters(regEx) {
            var chars, match = regEx.exec(input.substring(pos));
            return match ? (chars = match[0], pos += chars.length, chars) : void 0;
        }
        function parseDescriptors() {
            var w, d, h, i, desc, lastChar, value, intVal, floatVal, pError = !1, candidate = {};
            for (i = 0; i < descriptors.length; i++) desc = descriptors[i], lastChar = desc[desc.length - 1], 
            value = desc.substring(0, desc.length - 1), intVal = parseInt(value, 10), floatVal = parseFloat(value), 
            regexNonNegativeInteger.test(value) && "w" === lastChar ? ((w || d) && (pError = !0), 
            0 === intVal ? pError = !0 : w = intVal) : regexFloatingPoint.test(value) && "x" === lastChar ? ((w || d || h) && (pError = !0), 
            0 > floatVal ? pError = !0 : d = floatVal) : regexNonNegativeInteger.test(value) && "h" === lastChar ? ((h || d) && (pError = !0), 
            0 === intVal ? pError = !0 : h = intVal) : pError = !0;
            pError || (candidate.url = url, w && (candidate.w = w), d && (candidate.d = d), 
            h && (candidate.h = h), h || d || w || (candidate.d = 1), 1 === candidate.d && (set.has1x = !0), 
            candidate.set = set, candidates.push(candidate));
        }
        function tokenize() {
            for (collectCharacters(regexLeadingSpaces), currentDescriptor = "", state = "in descriptor"; ;) {
                if (c = input.charAt(pos), "in descriptor" === state) if (isSpace(c)) currentDescriptor && (descriptors.push(currentDescriptor), 
                currentDescriptor = "", state = "after descriptor"); else {
                    if ("," === c) return pos += 1, currentDescriptor && descriptors.push(currentDescriptor), 
                    void parseDescriptors();
                    if ("(" === c) currentDescriptor += c, state = "in parens"; else {
                        if ("" === c) return currentDescriptor && descriptors.push(currentDescriptor), void parseDescriptors();
                        currentDescriptor += c;
                    }
                } else if ("in parens" === state) if (")" === c) currentDescriptor += c, state = "in descriptor"; else {
                    if ("" === c) return descriptors.push(currentDescriptor), void parseDescriptors();
                    currentDescriptor += c;
                } else if ("after descriptor" === state) if (isSpace(c)) ; else {
                    if ("" === c) return void parseDescriptors();
                    state = "in descriptor", pos -= 1;
                }
                pos += 1;
            }
        }
        for (var url, descriptors, currentDescriptor, state, c, inputLength = input.length, pos = 0, candidates = []; ;) {
            if (collectCharacters(regexLeadingCommasOrSpaces), pos >= inputLength) return candidates;
            url = collectCharacters(regexLeadingNotSpaces), descriptors = [], "," === url.slice(-1) ? (url = url.replace(regexTrailingCommas, ""), 
            parseDescriptors()) : tokenize();
        }
    }
    function parseSizes(strValue) {
        function parseComponentValues(str) {
            function pushComponent() {
                component && (componentArray.push(component), component = "");
            }
            function pushComponentArray() {
                componentArray[0] && (listArray.push(componentArray), componentArray = []);
            }
            for (var chrctr, component = "", componentArray = [], listArray = [], parenDepth = 0, pos = 0, inComment = !1; ;) {
                if (chrctr = str[pos], chrctr === undefined) return pushComponent(), pushComponentArray(), 
                listArray;
                if (inComment) {
                    if ("*" === chrctr && "/" === str[pos + 1]) {
                        inComment = !1, pos += 2, pushComponent();
                        continue;
                    }
                    pos += 1;
                } else {
                    if (isSpace(chrctr)) {
                        if (str[pos - 1] && isSpace(str[pos - 1]) || !component) {
                            pos += 1;
                            continue;
                        }
                        if (0 === parenDepth) {
                            pushComponent(), pos += 1;
                            continue;
                        }
                        chrctr = " ";
                    } else if ("(" === chrctr) parenDepth += 1; else if (")" === chrctr) parenDepth -= 1; else {
                        if ("," === chrctr) {
                            pushComponent(), pushComponentArray(), pos += 1;
                            continue;
                        }
                        if ("/" === chrctr && "*" === str[pos + 1]) {
                            inComment = !0, pos += 2;
                            continue;
                        }
                    }
                    component += chrctr, pos += 1;
                }
            }
        }
        function isValidNonNegativeSourceSizeValue(s) {
            return regexCssLengthWithUnits.test(s) && parseFloat(s) >= 0 ? !0 : regexCssCalc.test(s) ? !0 : "0" === s || "-0" === s || "+0" === s ? !0 : !1;
        }
        var i, unparsedSizesList, unparsedSizesListLength, unparsedSize, lastComponentValue, size, regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
        for (unparsedSizesList = parseComponentValues(strValue), unparsedSizesListLength = unparsedSizesList.length, 
        i = 0; unparsedSizesListLength > i; i++) if (unparsedSize = unparsedSizesList[i], 
        lastComponentValue = unparsedSize[unparsedSize.length - 1], isValidNonNegativeSourceSizeValue(lastComponentValue)) {
            if (size = lastComponentValue, unparsedSize.pop(), 0 === unparsedSize.length) return size;
            if (unparsedSize = unparsedSize.join(" "), ri.matchesMedia(unparsedSize)) return size;
        }
        return "100vw";
    }
    document.createElement("picture");
    var lowTreshold, partialLowTreshold, isLandscape, lazyFactor, eminpx, alwaysCheckWDescriptor, resizeThrottle, evalId, ri = {}, noop = function() {}, image = document.createElement("img"), getImgAttr = image.getAttribute, setImgAttr = image.setAttribute, removeImgAttr = image.removeAttribute, docElem = document.documentElement, types = {}, cfg = {
        xQuant: 1,
        lazyFactor: .3,
        maxX: 4
    }, srcAttr = "data-pfsrc", srcsetAttr = srcAttr + "set", ua = navigator.userAgent, supportAbort = /rident/.test(ua) || /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35, curSrcProp = "currentSrc", regWDesc = /\s+\+?\d+(e\d+)?w/, regSize = /(\([^)]+\))?\s*(.+)/, setOptions = window.picturefillCFG, baseStyle = ("https:" === location.protocol, 
    "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)"), fsCss = "font-size:100%!important;", isVwDirty = !0, cssCache = {}, sizeLengthCache = {}, DPR = window.devicePixelRatio, units = {
        px: 1,
        "in": 96
    }, anchor = document.createElement("a"), alreadyRun = !1, regexLeadingSpaces = /^[ \t\n\r\u000c]+/, regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/, regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/, regexTrailingCommas = /[,]+$/, regexNonNegativeInteger = /^\d+$/, regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, on = function(obj, evt, fn, capture) {
        obj.addEventListener ? obj.addEventListener(evt, fn, capture || !1) : obj.attachEvent && obj.attachEvent("on" + evt, fn);
    }, memoize = function(fn) {
        var cache = {};
        return function(input) {
            return input in cache || (cache[input] = fn(input)), cache[input];
        };
    }, evalCSS = function() {
        var regLength = /^([\d\.]+)(em|vw|px)$/, replace = function() {
            for (var args = arguments, index = 0, string = args[0]; ++index in args; ) string = string.replace(args[index], args[++index]);
            return string;
        }, buidlStr = memoize(function(css) {
            return "return " + replace((css || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";";
        });
        return function(css, length) {
            var parsedLength;
            if (!(css in cssCache)) if (cssCache[css] = !1, length && (parsedLength = css.match(regLength))) cssCache[css] = parsedLength[1] * units[parsedLength[2]]; else try {
                cssCache[css] = new Function("e", buidlStr(css))(units);
            } catch (e) {}
            return cssCache[css];
        };
    }(), setResolution = function(candidate, sizesattr) {
        return candidate.w ? (candidate.cWidth = ri.calcListLength(sizesattr || "100vw"), 
        candidate.res = candidate.w / candidate.cWidth) : candidate.res = candidate.d, candidate;
    }, picturefill = function(opt) {
        var elements, i, plen, options = opt || {};
        if (options.elements && 1 === options.elements.nodeType && ("IMG" === options.elements.nodeName.toUpperCase() ? options.elements = [ options.elements ] : (options.context = options.elements, 
        options.elements = null)), elements = options.elements || ri.qsa(options.context || document, options.reevaluate || options.mqchange ? ri.sel : ri.selShort), 
        plen = elements.length) {
            for (ri.setupRun(options), alreadyRun = !0, i = 0; plen > i; i++) ri.fillImg(elements[i], options);
            ri.teardownRun(options);
        }
    };
    curSrcProp in image || (curSrcProp = "src"), types["image/jpeg"] = !0, types["image/gif"] = !0, 
    types["image/png"] = !0, types["image/svg+xml"] = document.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"), 
    ri.ns = ("pf" + new Date().getTime()).substr(0, 9), ri.supSrcset = "srcset" in image, 
    ri.supSizes = "sizes" in image, ri.selShort = "picture>img,img[srcset]", ri.sel = ri.selShort, 
    ri.cfg = cfg, ri.supSrcset && (ri.sel += ",img[" + srcsetAttr + "]"), ri.DPR = DPR || 1, 
    ri.u = units, ri.types = types, alwaysCheckWDescriptor = ri.supSrcset && !ri.supSizes, 
    ri.setSize = noop, ri.makeUrl = memoize(function(src) {
        return anchor.href = src, anchor.href;
    }), ri.qsa = function(context, sel) {
        return context.querySelectorAll(sel);
    }, ri.matchesMedia = function() {
        return ri.matchesMedia = window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? function(media) {
            return !media || matchMedia(media).matches;
        } : ri.mMQ, ri.matchesMedia.apply(this, arguments);
    }, ri.mMQ = function(media) {
        return media ? evalCSS(media) : !0;
    }, ri.calcLength = function(sourceSizeValue) {
        var value = evalCSS(sourceSizeValue, !0) || !1;
        return 0 > value && (value = !1), value;
    }, ri.supportsType = function(type) {
        return type ? types[type] : !0;
    }, ri.parseSize = memoize(function(sourceSizeStr) {
        var match = (sourceSizeStr || "").match(regSize);
        return {
            media: match && match[1],
            length: match && match[2]
        };
    }), ri.parseSet = function(set) {
        return set.cands || (set.cands = parseSrcset(set.srcset, set)), set.cands;
    }, ri.getEmValue = function() {
        var body;
        if (!eminpx && (body = document.body)) {
            var div = document.createElement("div"), originalHTMLCSS = docElem.style.cssText, originalBodyCSS = body.style.cssText;
            div.style.cssText = baseStyle, docElem.style.cssText = fsCss, body.style.cssText = fsCss, 
            body.appendChild(div), eminpx = div.offsetWidth, body.removeChild(div), eminpx = parseFloat(eminpx, 10), 
            docElem.style.cssText = originalHTMLCSS, body.style.cssText = originalBodyCSS;
        }
        return eminpx || 16;
    }, ri.calcListLength = function(sourceSizeListStr) {
        if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
            var winningLength = ri.calcLength(parseSizes(sourceSizeListStr));
            sizeLengthCache[sourceSizeListStr] = winningLength ? winningLength : units.width;
        }
        return sizeLengthCache[sourceSizeListStr];
    }, ri.setRes = function(set) {
        var candidates;
        if (set) {
            candidates = ri.parseSet(set);
            for (var i = 0, len = candidates.length; len > i; i++) setResolution(candidates[i], set.sizes);
        }
        return candidates;
    }, ri.setRes.res = setResolution, ri.applySetCandidate = function(candidates, img) {
        if (candidates.length) {
            var candidate, i, j, diff, length, bestCandidate, curSrc, curCan, isSameSet, candidateSrc, curRes, abortCurSrc, imageData = img[ri.ns], dpr = ri.DPR, sub = .2 + .1 * dpr;
            if (curSrc = imageData.curSrc || img[curSrcProp], curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set), 
            curRes = curCan && curCan.res, curSrc && (abortCurSrc = supportAbort && !img.complete && curCan && curRes > dpr, 
            abortCurSrc || (curCan && dpr > curRes && curRes > lowTreshold && (partialLowTreshold > curRes && (sub += .1 * dpr), 
            curCan.res += lazyFactor * (curRes - sub)), isSameSet = !imageData.pic || curCan && curCan.set === candidates[0].set, 
            curCan && isSameSet && curCan.res >= dpr && (bestCandidate = curCan))), !bestCandidate) for (curRes && (curCan.res = curCan.res - (curCan.res - curRes) / 2), 
            candidates.sort(ascendingSort), length = candidates.length, bestCandidate = candidates[length - 1], 
            i = 0; length > i; i++) if (candidate = candidates[i], candidate.res >= dpr) {
                j = i - 1, bestCandidate = candidates[j] && (diff = candidate.res - dpr) && (abortCurSrc || curSrc !== ri.makeUrl(candidate.url)) && chooseLowRes(candidates[j].res, diff, dpr) ? candidates[j] : candidate;
                break;
            }
            curRes && (curCan.res = curRes), bestCandidate && (candidateSrc = ri.makeUrl(bestCandidate.url), 
            imageData.curSrc = candidateSrc, imageData.curCan = bestCandidate, candidateSrc !== curSrc && ri.setSrc(img, bestCandidate), 
            ri.setSize(img));
        }
    }, ri.setSrc = function(img, bestCandidate) {
        var origWidth;
        img.src = bestCandidate.url, "image/svg+xml" === bestCandidate.set.type && (origWidth = img.style.width, 
        img.style.width = img.offsetWidth + 1 + "px", img.offsetWidth + 1 && (img.style.width = origWidth));
    }, ri.getSet = function(img) {
        var i, set, supportsType, match = !1, sets = img[ri.ns].sets;
        for (i = 0; i < sets.length && !match; i++) if (set = sets[i], set.srcset && ri.matchesMedia(set.media) && (supportsType = ri.supportsType(set.type))) {
            "pending" === supportsType && (set = supportsType), match = set;
            break;
        }
        return match;
    }, ri.parseSets = function(element, parent) {
        var srcsetAttribute, imageSet, isWDescripor, srcsetParsed, hasPicture = parent && "PICTURE" === parent.nodeName.toUpperCase(), imageData = element[ri.ns];
        imageData.src === undefined && (imageData.src = getImgAttr.call(element, "src"), 
        imageData.src ? setImgAttr.call(element, srcAttr, imageData.src) : removeImgAttr.call(element, srcAttr)), 
        imageData.srcset === undefined && (srcsetAttribute = getImgAttr.call(element, "srcset"), 
        imageData.srcset = srcsetAttribute, srcsetParsed = !0), imageData.sets = [], hasPicture && (imageData.pic = !0, 
        getAllSourceElements(parent, imageData.sets)), imageData.srcset ? (imageSet = {
            srcset: imageData.srcset,
            sizes: getImgAttr.call(element, "sizes")
        }, imageData.sets.push(imageSet), isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || ""), 
        isWDescripor || !imageData.src || getCandidateForSrc(imageData.src, imageSet) || imageSet.has1x || (imageSet.srcset += ", " + imageData.src, 
        imageSet.cands.push({
            url: imageData.src,
            d: 1,
            set: imageSet
        }))) : imageData.src && imageData.sets.push({
            srcset: imageData.src,
            sizes: null
        }), imageData.curCan = null, imageData.supported = !(hasPicture || imageSet && !ri.supSrcset || isWDescripor), 
        srcsetParsed && ri.supSrcset && !imageData.supported && (srcsetAttribute ? (setImgAttr.call(element, srcsetAttr, srcsetAttribute), 
        element.srcset = "") : removeImgAttr.call(element, srcsetAttr)), imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src !== ri.makeUrl(imageData.src)) && (null === imageData.src ? element.removeAttribute("src") : element.src = imageData.src), 
        imageData.parsed = !0;
    }, ri.fillImg = function(element, options) {
        var imageData, extreme = options.reselect || options.reevaluate;
        element[ri.ns] || (element[ri.ns] = {}), imageData = element[ri.ns], (extreme || imageData.evaled !== evalId) && ((!imageData.parsed || options.reevaluate) && ri.parseSets(element, element.parentNode, options), 
        imageData.supported ? imageData.evaled = evalId : applyBestCandidate(element));
    }, ri.setupRun = function(options) {
        (!alreadyRun || isVwDirty || DPR !== window.devicePixelRatio) && (updateMetrics(), 
        options.elements || options.context || clearTimeout(resizeThrottle));
    }, window.HTMLPictureElement ? (picturefill = noop, ri.fillImg = noop) : !function() {
        var isDomReady, regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/, run = function() {
            var readyState = document.readyState || "";
            timerId = setTimeout(run, "loading" === readyState ? 200 : 999), document.body && (ri.fillImgs(), 
            isDomReady = isDomReady || regReady.test(readyState), isDomReady && clearTimeout(timerId));
        }, resizeEval = function() {
            ri.fillImgs();
        }, onResize = function() {
            clearTimeout(resizeThrottle), isVwDirty = !0, resizeThrottle = setTimeout(resizeEval, 99);
        }, timerId = setTimeout(run, document.body ? 9 : 99);
        on(window, "resize", onResize), on(document, "readystatechange", run);
    }(), ri.picturefill = picturefill, ri.fillImgs = picturefill, ri.teardownRun = noop, 
    picturefill._ = ri, window.picturefillCFG = {
        ri: ri,
        push: function(args) {
            var name = args.shift();
            "function" == typeof ri[name] ? ri[name].apply(ri, args) : (cfg[name] = args[0], 
            alreadyRun && ri.fillImgs({
                reselect: !0
            }));
        }
    };
    for (;setOptions && setOptions.length; ) window.picturefillCFG.push(setOptions.shift());
    window.picturefill = picturefill, "object" == typeof module && "object" == typeof module.exports ? module.exports = picturefill : "function" == typeof define && define.amd && define("picturefill", function() {
        return picturefill;
    });
}(window, document);