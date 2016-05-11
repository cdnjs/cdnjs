/*! rasterizeHTML.js - v1.2.0 - 2015-10-03
* http://www.github.com/cburgmer/rasterizeHTML.js
* Copyright (c) 2015 Christoph Burgmer; Licensed MIT */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["url","cssMediaQuery","xmlserializer","sanedomparsererror","ayepromise","inlineresources"], function (a0,b1,c2,d3,e4,f5) {
      return (root['rasterizeHTML'] = factory(a0,b1,c2,d3,e4,f5));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("url"),require("css-mediaquery"),require("xmlserializer"),require("sane-domparser-error"),require("ayepromise"),require("inlineresources"));
  } else {
    root['rasterizeHTML'] = factory(url,cssMediaQuery,xmlserializer,sanedomparsererror,ayepromise,inlineresources);
  }
}(this, function (url, cssMediaQuery, xmlserializer, sanedomparsererror, ayepromise, inlineresources) {

var util = (function (url) {
    "use strict";

    var module = {};

    var uniqueIdList = [];

    module.joinUrl = function (baseUrl, relUrl) {
        if (!baseUrl) {
            return relUrl;
        }
        return url.resolve(baseUrl, relUrl);
    };

    module.getConstantUniqueIdFor = function (element) {
        // HACK, using a list results in O(n), but how do we hash e.g. a DOM node?
        if (uniqueIdList.indexOf(element) < 0) {
            uniqueIdList.push(element);
        }
        return uniqueIdList.indexOf(element);
    };

    module.clone = function (object) {
        var theClone = {},
            i;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                theClone[i] = object[i];
            }
        }
        return theClone;
    };

    var isObject = function (obj) {
        return typeof obj === "object" && obj !== null;
    };

    var isCanvas = function (obj) {
        return isObject(obj) &&
            Object.prototype.toString.apply(obj).match(/\[object (Canvas|HTMLCanvasElement)\]/i);
    };

    // args: canvas, options
    module.parseOptionalParameters = function (args) {
        var parameters = {
            canvas: null,
            options: {}
        };

        if (args[0] == null || isCanvas(args[0])) {
            parameters.canvas = args[0] || null;

            parameters.options = module.clone(args[1]);
        } else {
            parameters.options = module.clone(args[0]);
        }

        return parameters;
    };

    return module;
}(url));

// Proxy objects by monkey patching
var proxies = (function (util, ayepromise) {
    "use strict";

    var module = {};

    var monkeyPatchInstanceMethod = function (object, methodName, proxyFunc) {
        var originalFunc = object[methodName];

        object[methodName] = function () {
            var args = Array.prototype.slice.call(arguments);

            return proxyFunc.apply(this, [args, originalFunc]);
        };

        return originalFunc;
    };

    // Bases all XHR calls on the given base URL
    module.baseUrlRespectingXhr = function (XHRObject, baseUrl) {
        var xhrConstructor = function () {
            var xhr = new XHRObject();

            monkeyPatchInstanceMethod(xhr, 'open', function (args, originalOpen) {
                var method = args.shift(),
                    url = args.shift(),
                    joinedUrl = util.joinUrl(baseUrl, url);

                return originalOpen.apply(this, [method, joinedUrl].concat(args));
            });

            return xhr;
        };

        return xhrConstructor;
    };

    // Provides a convenient way of being notified when all pending XHR calls are finished
    module.finishNotifyingXhr = function (XHRObject) {
        var totalXhrCount = 0,
            doneXhrCount = 0,
            waitingForPendingToClose = false,
            defer = ayepromise.defer();

        var checkAllRequestsFinished = function () {
            var pendingXhrCount = totalXhrCount - doneXhrCount;

            if (pendingXhrCount <= 0 && waitingForPendingToClose) {
                defer.resolve({totalCount: totalXhrCount});
            }
        };

        var xhrConstructor = function () {
            var xhr = new XHRObject();

            monkeyPatchInstanceMethod(xhr, 'send', function (_, originalSend) {
                totalXhrCount += 1;
                return originalSend.apply(this, arguments);
            });

            xhr.addEventListener('load', function () {
                doneXhrCount += 1;

                checkAllRequestsFinished();
            });

            return xhr;
        };

        xhrConstructor.waitForRequestsToFinish = function () {
            waitingForPendingToClose = true;
            checkAllRequestsFinished();
            return defer.promise;
        };

        return xhrConstructor;
    };

    return module;
}(util, ayepromise));

var documentUtil = (function () {
    "use strict";

    var module = {};

    var asArray = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };

    module.addClassName = function (element, className) {
        element.className += ' ' + className;
    };

    module.addClassNameRecursively = function (element, className) {
        module.addClassName(element, className);

        if (element.parentNode !== element.ownerDocument) {
            module.addClassNameRecursively(element.parentNode, className);
        }
    };

    var changeCssRule = function (rule, newRuleText) {
        var styleSheet = rule.parentStyleSheet,
            ruleIdx = asArray(styleSheet.cssRules).indexOf(rule);

        // Exchange rule with the new text
        styleSheet.insertRule(newRuleText, ruleIdx+1);
        styleSheet.deleteRule(ruleIdx);
    };

    var updateRuleSelector = function (rule, updatedSelector) {
        var styleDefinitions = rule.cssText.replace(/^[^\{]+/, ''),
            newRule = updatedSelector + ' ' + styleDefinitions;

        changeCssRule(rule, newRule);
    };

    var cssRulesToText = function (cssRules) {
        return asArray(cssRules).reduce(function (cssText, rule) {
            return cssText + rule.cssText;
        }, '');
    };

    var rewriteStyleContent = function (styleElement) {
        styleElement.textContent = cssRulesToText(styleElement.sheet.cssRules);
    };

    var matchingSimpleSelectorsRegex = function (simpleSelectorList) {
        return '(' +
            '(?:^|[^.#:\\w])' +            // start of string or not a simple selector character,
            '|' +                          // ... or ...
            '(?=\\W)' +                    // the next character parsed is not an alphabetic character (and thus a natural boundary)
            ')' +
            '(' +
            simpleSelectorList.join('|') + // one out of the given simple selectors
            ')' +
            '(?=\\W|$)';                   // followed either by a non-alphabetic character or the end of the string
    };

    var replaceSimpleSelectorsBy = function (doc, simpleSelectorList, caseInsensitiveReplaceFunc) {
        var selectorRegex = matchingSimpleSelectorsRegex(simpleSelectorList);

        asArray(doc.querySelectorAll('style')).forEach(function (styleElement) {
            var matchingRules = asArray(styleElement.sheet.cssRules).filter(function (rule) {
                return rule.selectorText && new RegExp(selectorRegex, 'i').test(rule.selectorText);
            });

            if (matchingRules.length) {
                matchingRules.forEach(function (rule) {
                    var newSelector = rule.selectorText.replace(new RegExp(selectorRegex, 'gi'),
                                                             function (_, prefixMatch, selectorMatch) {
                        return prefixMatch + caseInsensitiveReplaceFunc(selectorMatch);
                    });

                    if (newSelector !== rule.selectorText) {
                        updateRuleSelector(rule, newSelector);
                    }
                });

                rewriteStyleContent(styleElement);
            }
        });
    };

    module.rewriteCssSelectorWith = function (doc, oldSelector, newSelector) {
        replaceSimpleSelectorsBy(doc, [oldSelector], function () {
            return newSelector;
        });
    };

    module.lowercaseCssTypeSelectors = function (doc, matchingTagNames) {
        replaceSimpleSelectorsBy(doc, matchingTagNames, function (match) {
            return match.toLowerCase();
        });
    };

    module.findHtmlOnlyNodeNames = function (doc) {
        var treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT),
            htmlNodeNames = {},
            nonHtmlNodeNames = {},
            currentTagName;

        while(treeWalker.nextNode()) {
            currentTagName = treeWalker.currentNode.tagName.toLowerCase();
            if (treeWalker.currentNode.namespaceURI === 'http://www.w3.org/1999/xhtml') {
                htmlNodeNames[currentTagName] = true;
            } else {
                nonHtmlNodeNames[currentTagName] = true;
            }
        }

        return Object.keys(htmlNodeNames).filter(function (tagName) {
            return !nonHtmlNodeNames[tagName];
        });
    };

    return module;
}());

var documentHelper = (function (documentUtil) {
    "use strict";

    var module = {};

    var asArray = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };

    var cascadingAction = {
        active: true,
        hover: true,
        focus: false,
        target: false
    };

    module.fakeUserAction = function (doc, selector, action) {
        var elem = doc.querySelector(selector),
            pseudoClass = ':' + action,
            fakeActionClass = 'rasterizehtml' + action;
        if (! elem) {
            return;
        }

        if (cascadingAction[action]) {
            documentUtil.addClassNameRecursively(elem, fakeActionClass);
        } else {
            documentUtil.addClassName(elem, fakeActionClass);
        }
        documentUtil.rewriteCssSelectorWith(doc, pseudoClass, '.' + fakeActionClass);
    };

    module.persistInputValues = function (doc) {
        var inputs = doc.querySelectorAll('input'),
            textareas = doc.querySelectorAll('textarea'),
            isCheckable = function (input) {
                return input.type === 'checkbox' || input.type === 'radio';
            };

        asArray(inputs).filter(isCheckable)
            .forEach(function (input) {
                if (input.checked) {
                    input.setAttribute('checked', '');
                } else {
                    input.removeAttribute('checked');
                }
            });

        asArray(inputs).filter(function (input) { return !isCheckable(input); })
            .forEach(function (input) {
                input.setAttribute('value', input.value);
            });

        asArray(textareas)
            .forEach(function (textarea) {
                textarea.textContent = textarea.value;
            });
    };

    module.rewriteTagNameSelectorsToLowerCase = function (doc) {
        documentUtil.lowercaseCssTypeSelectors(doc, documentUtil.findHtmlOnlyNodeNames(doc));
    };

    return module;
}(documentUtil));

var mediaQueryHelper = (function (cssMediaQuery) {
    "use strict";

    var module = {};

    var svgImgBlueByEmMediaQuery = function () {
        var svg = '<svg id="svg" xmlns="http://www.w3.org/2000/svg" width="10" height="10">' +
                '<style>@media (max-width: 1em) { svg { background: #00f; } }</style>' +
                '</svg>';

        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
            img = document.createElement('img');

        img.src = url;

        return img;
    };

    var firstPixelHasColor = function (img, r, g, b) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext("2d"),
            data;

        context.drawImage(img, 0, 0);
        data = context.getImageData(0, 0, 1, 1).data;
        return data[0] === r && data[1] === g && data[2] === b;
    };

    var hasEmMediaQueryIssue = function () {
        var img = svgImgBlueByEmMediaQuery(),
            defer = ayepromise.defer();

        document.querySelector('body').appendChild(img);

        img.onload = function () {
            document.querySelector('body').removeChild(img);
            try {
                defer.resolve(!firstPixelHasColor(img, 0, 0, 255));
            } catch (e) {
                // Fails in PhantomJS, let's assume the issue exists
                defer.resolve(true);
            }
        };
        img.onerror = function () {
            defer.reject();
        };

        return defer.promise;
    };

    var hasEmIssue;

    module.needsEmWorkaround = function () {
        if (hasEmIssue === undefined) {
            hasEmIssue = hasEmMediaQueryIssue();
        }
        return hasEmIssue;
    };

    var asArray = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };

    var cssRulesToText = function (cssRules) {
        return asArray(cssRules).map(function (rule) {
            return rule.cssText;
        }).join('\n');
    };

    var mediaQueryRule = function (mediaQuery, cssRules) {
        return '@media ' + mediaQuery + '{' +
            cssRulesToText(cssRules) +
            '}';
    };

    var exchangeRuleWithNewContent = function (styleSheet, ruleIdx, newRuleText) {
        try {
            styleSheet.insertRule(newRuleText, ruleIdx+1);
        } catch (e) {
            // In case the browser does not like our new rule we just keep the existing one and quietly leave
            return;
        }
        styleSheet.deleteRule(ruleIdx);
    };

    var changeCssRule = function (rule, newRuleText) {
        var styleSheet = rule.parentStyleSheet,
            ruleIdx = asArray(styleSheet.cssRules).indexOf(rule);

        exchangeRuleWithNewContent(styleSheet, ruleIdx, newRuleText);
    };

    var rewriteStyleContent = function (styleElement) {
        styleElement.textContent = cssRulesToText(styleElement.sheet.cssRules);
    };

    var serializeExpression = function (exp) {
        var feature = exp.modifier ? exp.modifier + '-' + exp.feature : exp.feature;
        if (exp.value) {
            return '(' + feature + ': ' + exp.value + ')';
        } else {
            return '(' + feature + ')';
        }
    };

    var serializeQueryPart = function (q) {
        var segments = [];

        if (q.inverse) {
            segments.push("not");
        }

        segments.push(q.type);

        if (q.expressions.length > 0) {
            segments.push('and ' + q.expressions.map(serializeExpression).join(' and '));
        }

        return segments.join(' ');
    };

    // poor man's testability
    module.serializeQuery = function (q) {
        var queryParts = q.map(serializeQueryPart);
        return queryParts.join(', ');
    };

    var transformEmIntoPx = function (em) {
        return em * 16;
    };

    var replaceEmValueWithPx = function (value) {
        // Match a number with em unit. Doesn't match all, but should be enough for now
        var match = /^((?:\d+\.)?\d+)em/.exec(value);
        if (match) {
            return transformEmIntoPx(parseFloat(match[1])) + 'px';
        }
        return value;
    };

    var substituteEmWithPx = function (mediaQuery) {
        var parsedQuery = cssMediaQuery.parse(mediaQuery),
            hasChanges = false;

        parsedQuery.forEach(function (q) {
            q.expressions.forEach(function (exp) {
                var rewrittenValue = replaceEmValueWithPx(exp.value);

                hasChanges |= rewrittenValue !== exp.value;
                exp.value = rewrittenValue;
            });
        });

        if (hasChanges) {
            return module.serializeQuery(parsedQuery);
        }
    };

    var replaceEmsWithPx = function (mediaQueryRules) {
        var anyRuleHasChanges = false;

        mediaQueryRules.forEach(function (rule) {
            var rewrittenMediaQuery = substituteEmWithPx(rule.media.mediaText);

            if (rewrittenMediaQuery) {
                changeCssRule(rule, mediaQueryRule(rewrittenMediaQuery, rule.cssRules));
            }

            anyRuleHasChanges |= !!rewrittenMediaQuery;
        });

        return anyRuleHasChanges;
    };

    module.workAroundWebKitEmSizeIssue = function (document) {
        var styles = document.querySelectorAll('style');

        asArray(styles).forEach(function (style) {
            var mediaQueryRules = asArray(style.sheet.cssRules).filter(function (rule) {
                return rule.type === window.CSSRule.MEDIA_RULE;
            });

            var hasChanges = replaceEmsWithPx(mediaQueryRules);
            if (hasChanges) {
                rewriteStyleContent(style);
            }
        });
    };

    return module;
}(cssMediaQuery));

var browser = (function (util, proxies, ayepromise, sanedomparsererror, theWindow) {
    "use strict";

    var module = {};

    var createHiddenElement = function (doc, tagName, width, height) {
        var element = doc.createElement(tagName);
        // 'display: none' doesn't cut it, as browsers seem to be lazy loading CSS
        element.style.visibility = "hidden";
        element.style.width = width + "px";
        element.style.height = height + "px";
        element.style.position = "absolute";
        element.style.top = (-10000 - height) + "px";
        element.style.left = (-10000 - width) + "px";
        // We need to add the element to the document so that its content gets loaded
        doc.getElementsByTagName("body")[0].appendChild(element);
        return element;
    };

    module.executeJavascript = function (doc, options) {
        var iframe = createHiddenElement(theWindow.document, "iframe", options.width, options.height),
            html = doc.documentElement.outerHTML,
            iframeErrorsMessages = [],
            defer = ayepromise.defer(),
            timeout = options.executeJsTimeout || 0;

        var doResolve = function () {
            var doc = iframe.contentDocument;
            theWindow.document.getElementsByTagName("body")[0].removeChild(iframe);
            defer.resolve({
                document: doc,
                errors: iframeErrorsMessages
            });
        };

        var waitForJavaScriptToRun = function () {
            var d = ayepromise.defer();
            if (timeout > 0) {
                setTimeout(d.resolve, timeout);
            } else {
                d.resolve();
            }
            return d.promise;
        };

        iframe.onload = function () {
            waitForJavaScriptToRun()
                .then(finishNotifyXhrProxy.waitForRequestsToFinish)
                .then(doResolve);
        };

        var xhr = iframe.contentWindow.XMLHttpRequest,
            finishNotifyXhrProxy = proxies.finishNotifyingXhr(xhr),
            baseUrlXhrProxy = proxies.baseUrlRespectingXhr(finishNotifyXhrProxy, options.baseUrl);

        iframe.contentDocument.open();
        iframe.contentWindow.XMLHttpRequest = baseUrlXhrProxy;
        iframe.contentWindow.onerror = function (msg) {
            iframeErrorsMessages.push({
                resourceType: "scriptExecution",
                msg: msg
            });
        };

        iframe.contentDocument.write('<!DOCTYPE html>');
        iframe.contentDocument.write(html);
        iframe.contentDocument.close();

        return defer.promise;
    };

    var createHiddenSandboxedIFrame = function (doc, width, height) {
        var iframe = doc.createElement('iframe');
        iframe.style.width = width + "px";
        iframe.style.height = height + "px";
        // 'display: none' doesn't cut it, as browsers seem to be lazy loading content
        iframe.style.visibility = "hidden";
        iframe.style.position = "absolute";
        iframe.style.top = (-10000 - height) + "px";
        iframe.style.left = (-10000 - width) + "px";
        // Don't execute JS, all we need from sandboxing is access to the iframe's document
        iframe.sandbox = 'allow-same-origin';
        // Don't include a scrollbar on Linux
        iframe.scrolling = 'no';
        return iframe;
    };

    var createIframeWithSizeAtZoomLevel1 = function (width, height, zoom) {
        var scaledViewportWidth = Math.floor(width / zoom),
            scaledViewportHeight = Math.floor(height / zoom);

        return createHiddenSandboxedIFrame(theWindow.document, scaledViewportWidth, scaledViewportHeight);
    };

    var calculateZoomedContentSizeAndRoundUp = function (actualViewport, requestedWidth, requestedHeight, zoom) {
        return {
            width: Math.max(actualViewport.width * zoom, requestedWidth),
            height: Math.max(actualViewport.height * zoom, requestedHeight)
        };
    };

    var calculateContentSize = function (doc, selector, requestedWidth, requestedHeight, zoom) {
            // clientWidth/clientHeight needed for PhantomJS
        var actualViewportWidth = Math.max(doc.documentElement.scrollWidth, doc.body.clientWidth),
            actualViewportHeight = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, doc.body.clientHeight),
            top, left, originalWidth, originalHeight, rootFontSize,
            element, rect, contentSize;

        if (selector) {
            element = doc.querySelector(selector);

            if (!element) {
                throw {
                    message: "Clipping selector not found"
                };
            }

            rect = element.getBoundingClientRect();

            top = rect.top;
            left = rect.left;
            originalWidth = rect.width;
            originalHeight = rect.height;
        } else {
            top = 0;
            left = 0;
            originalWidth = actualViewportWidth;
            originalHeight = actualViewportHeight;
        }

        contentSize = calculateZoomedContentSizeAndRoundUp({
                width: originalWidth,
                height: originalHeight
            },
            requestedWidth,
            requestedHeight,
            zoom);

        rootFontSize = theWindow.getComputedStyle(doc.documentElement).fontSize;

        return {
            left: left,
            top: top,
            width: contentSize.width,
            height: contentSize.height,
            viewportWidth: actualViewportWidth,
            viewportHeight: actualViewportHeight,

            rootFontSize: rootFontSize
        };
    };

    module.calculateDocumentContentSize = function (doc, options) {
        var html = doc.documentElement.outerHTML,
            defer = ayepromise.defer(),
            zoom = options.zoom || 1,
            iframe;


        iframe = createIframeWithSizeAtZoomLevel1(options.width, options.height, zoom);
        // We need to add the element to the document so that its content gets loaded
        theWindow.document.getElementsByTagName("body")[0].appendChild(iframe);

        iframe.onload = function () {
            var doc = iframe.contentDocument,
                size;

            try {
                size = calculateContentSize(doc, options.clip, options.width, options.height, zoom);

                defer.resolve(size);
            } catch (e) {
                defer.reject(e);
            } finally {
                theWindow.document.getElementsByTagName("body")[0].removeChild(iframe);
            }
        };

        // srcdoc doesn't work in PhantomJS yet
        iframe.contentDocument.open();
        iframe.contentDocument.write('<!DOCTYPE html>');
        iframe.contentDocument.write(html);
        iframe.contentDocument.close();

        return defer.promise;
    };

    var addHTMLTagAttributes = function (doc, html) {
        var attributeMatch = /<html((?:\s+[^>]*)?)>/im.exec(html),
            helperDoc = theWindow.document.implementation.createHTMLDocument(''),
            htmlTagSubstitute,
            i, elementSubstitute, attribute;

        if (!attributeMatch) {
            return;
        }

        htmlTagSubstitute = '<div' + attributeMatch[1] + '></div>';
        helperDoc.documentElement.innerHTML = htmlTagSubstitute;
        elementSubstitute = helperDoc.querySelector('div');

        for (i = 0; i < elementSubstitute.attributes.length; i++) {
            attribute = elementSubstitute.attributes[i];
            doc.documentElement.setAttribute(attribute.name, attribute.value);
        }
    };

    module.parseHTML = function (html) {
        // We should be using the DOMParser, but it is not supported in older browsers
        var doc = theWindow.document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = html;

        addHTMLTagAttributes(doc, html);
        return doc;
    };

    var failOnInvalidSource = function (doc) {
        try {
            return sanedomparsererror.failOnParseError(doc);
        } catch (e) {
            throw {
                message: "Invalid source",
                originalError: e
            };
        }
    };

    module.validateXHTML = function (xhtml) {
        var p = new DOMParser(),
            doc = p.parseFromString(xhtml, "application/xml");

        failOnInvalidSource(doc);
    };

    var lastCacheDate = null;

    var getUncachableURL = function (url, cache) {
        if (cache === 'none' || cache === 'repeated') {
            if (lastCacheDate === null || cache !== 'repeated') {
                lastCacheDate = Date.now();
            }
            return url + "?_=" + lastCacheDate;
        } else {
            return url;
        }
    };

    var doDocumentLoad = function (url, options) {
        var xhr = new window.XMLHttpRequest(),
            joinedUrl = util.joinUrl(options.baseUrl, url),
            augmentedUrl = getUncachableURL(joinedUrl, options.cache),
            defer = ayepromise.defer(),
            doReject = function (e) {
                defer.reject({
                    message: "Unable to load page",
                    originalError: e
                });
            };

        xhr.addEventListener("load", function () {
            if (xhr.status === 200 || xhr.status === 0) {
                defer.resolve(xhr.responseXML);
            } else {
                doReject(xhr.statusText);
            }
        }, false);

        xhr.addEventListener("error", function (e) {
            doReject(e);
        }, false);

        try {
            xhr.open('GET', augmentedUrl, true);
            xhr.responseType = "document";
            xhr.send(null);
        } catch (e) {
            doReject(e);
        }

        return defer.promise;
    };

    module.loadDocument = function (url, options) {
        return doDocumentLoad(url, options)
            .then(function (doc) {
                return failOnInvalidSource(doc);
            });
    };

    return module;
}(util, proxies, ayepromise, sanedomparsererror, window));

var svg2image = (function (ayepromise, window) {
    "use strict";

    var module = {};

    var urlForSvg = function (svg, useBlobs) {
        if (useBlobs) {
            return URL.createObjectURL(new Blob([svg], {"type": "image/svg+xml"}));
        } else {
            return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        }
    };

    var cleanUpUrl = function (url) {
        if (url instanceof Blob) {
            URL.revokeObjectURL(url);
        }
    };

    var simpleForeignObjectSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><foreignObject></foreignObject></svg>';

    var supportsReadingObjectFromCanvas = function (url) {
        var canvas = document.createElement("canvas"),
            image = new Image(),
            defer = ayepromise.defer();

        image.onload = function () {
            var context = canvas.getContext("2d");
            try {
                context.drawImage(image, 0, 0);
                // This will fail in Chrome & Safari
                canvas.toDataURL("image/png");
                defer.resolve(true);
            } catch (e) {
                defer.resolve(false);
            }
        };
        image.onerror = defer.reject;
        image.src = url;

        return defer.promise;
    };

    var readingBackFromCanvasBenefitsFromOldSchoolDataUris = function () {
        // Check for work around for https://code.google.com/p/chromium/issues/detail?id=294129
        var blobUrl = urlForSvg(simpleForeignObjectSvg, true);
        return supportsReadingObjectFromCanvas(blobUrl)
            .then(function (supportsReadingFromBlobs) {
                cleanUpUrl(blobUrl);
                if (supportsReadingFromBlobs) {
                    return false;
                }
                return supportsReadingObjectFromCanvas(urlForSvg(simpleForeignObjectSvg, false))
                    .then(function (s) {
                        return s;
                    });
            }, function () {
                return false;
            });
    };

    var supportsBlobBuilding = function () {
        if (window.Blob) {
            // Available as constructor only in newer builds for all browsers
            try {
                new Blob(['<b></b>'], { "type" : "text/xml" });
                return true;
            } catch (err) {}
        }
        return false;
    };

    var checkBlobSupport = function () {
        var defer = ayepromise.defer();

        if (supportsBlobBuilding && window.URL) {
            readingBackFromCanvasBenefitsFromOldSchoolDataUris()
                .then(function (doesBenefit) {
                    defer.resolve(! doesBenefit);
                }, function () {
                    defer.reject();
                });
        } else {
            defer.resolve(false);
        }

        return defer.promise;
    };

    var checkForBlobsResult;

    var checkForBlobs = function () {
        if (checkForBlobsResult === undefined) {
            checkForBlobsResult = checkBlobSupport();
        }

        return checkForBlobsResult;
    };

    var buildImageUrl = function (svg) {
        return checkForBlobs().then(function (useBlobs) {
            return urlForSvg(svg, useBlobs);
        });
    };

    module.renderSvg = function (svg) {
        var url, image,
            defer = ayepromise.defer(),
            resetEventHandlers = function () {
                image.onload = null;
                image.onerror = null;
            },
            cleanUp = function () {
                if (url) {
                    cleanUpUrl(url);
                }
            };

        image = new Image();
        image.onload = function() {
            resetEventHandlers();
            cleanUp();

            defer.resolve(image);
        };
        image.onerror = function () {
            cleanUp();

            // Webkit calls the onerror handler if the SVG is faulty
            defer.reject();
        };

        buildImageUrl(svg).then(function (imageUrl) {
            url = imageUrl;
            image.src = url;
        }, defer.reject);

        return defer.promise;
    };

    return module;
}(ayepromise, window));

var document2svg = (function (util, browser, documentHelper, mediaQueryHelper, xmlserializer) {
    "use strict";

    var module = {};

    var zoomedElementSizingAttributes = function (size, zoomFactor) {
        var closestScaledWith, closestScaledHeight,
            offsetX, offsetY;

        zoomFactor = zoomFactor || 1;
        closestScaledWith = Math.round(size.viewportWidth);
        closestScaledHeight = Math.round(size.viewportHeight);

        offsetX = -size.left;
        offsetY = -size.top;

        var attributes = {
             'x': offsetX,
             'y': offsetY,
             'width': closestScaledWith,
             'height': closestScaledHeight
        };

        if (zoomFactor !== 1) {
            attributes.transform = 'scale(' + zoomFactor + ')';
        }

        return attributes;
    };

    var workAroundCollapsingMarginsAcrossSVGElementInWebKitLike = function (attributes) {
        var style = attributes.style || '';
        attributes.style = style + 'float: left;';
    };

    var workAroundSafariSometimesNotShowingExternalResources = function (attributes) {
        /* Let's hope that works some magic. The spec says SVGLoad only fires
         * now when all externals are available.
         * http://www.w3.org/TR/SVG/struct.html#ExternalResourcesRequired */
        attributes.externalResourcesRequired = true;
    };

    var workAroundChromeShowingScrollbarsUnderLinuxIfHtmlIsOverflowScroll = function () {
        return '<style scoped="">html::-webkit-scrollbar { display: none; }</style>';
    };

    var serializeAttributes = function (attributes) {
        var keys = Object.keys(attributes);
        if (!keys.length) {
            return '';
        }

        return ' ' + keys.map(function (key) {
            return key + '="' + attributes[key] + '"';
        }).join(' ');
    };

    var convertDocumentToSvg = function (doc, size, zoomFactor) {
        var xhtml = xmlserializer.serializeToString(doc);

        browser.validateXHTML(xhtml);

        var attributes = zoomedElementSizingAttributes(size, zoomFactor);

        workAroundCollapsingMarginsAcrossSVGElementInWebKitLike(attributes);
        workAroundSafariSometimesNotShowingExternalResources(attributes);

        return (
            '<svg xmlns="http://www.w3.org/2000/svg"' +
                ' width="' + size.width + '"' +
                ' height="' + size.height + '"' +
                ' font-size="' + size.rootFontSize + '"' +
                '>' +
                workAroundChromeShowingScrollbarsUnderLinuxIfHtmlIsOverflowScroll() +
                '<foreignObject' + serializeAttributes(attributes) + '>' +
                xhtml +
                '</foreignObject>' +
                '</svg>'
        );
    };

    module.getSvgForDocument = function (doc, size, zoomFactor) {
        documentHelper.rewriteTagNameSelectorsToLowerCase(doc);

        return mediaQueryHelper.needsEmWorkaround().then(function (needsWorkaround) {
            if (needsWorkaround) {
                mediaQueryHelper.workAroundWebKitEmSizeIssue(doc);
            }

            return convertDocumentToSvg(doc, size, zoomFactor);
        });
    };

    module.drawDocumentAsSvg = function (doc, options) {
        ['hover', 'active', 'focus', 'target'].forEach(function (action) {
            if (options[action]) {
                documentHelper.fakeUserAction(doc, options[action], action);
            }
        });

        return browser.calculateDocumentContentSize(doc, options)
            .then(function (size) {
                return module.getSvgForDocument(doc, size, options.zoom);
            });
    };

    return module;
}(util, browser, documentHelper, mediaQueryHelper, xmlserializer));

var rasterize = (function (util, browser, documentHelper, document2svg, svg2image, inlineresources) {
    "use strict";

    var module = {};

    var generalDrawError = function (e) {
        return {
            message: "Error rendering page",
            originalError: e
        };
    };

    var drawSvgAsImg = function (svg) {
        return svg2image.renderSvg(svg)
            .then(function (image) {
                return {
                    image: image,
                    svg: svg
                };
            }, function (e) {
                throw generalDrawError(e);
            });
    };

    var drawImageOnCanvas = function (image, canvas) {
        try {
            canvas.getContext("2d").drawImage(image, 0, 0);
        } catch (e) {
            // Firefox throws a 'NS_ERROR_NOT_AVAILABLE' if the SVG is faulty
            throw generalDrawError(e);
        }
    };

    var doDraw = function (doc, canvas, options) {
        return document2svg.drawDocumentAsSvg(doc, options)
            .then(drawSvgAsImg)
            .then(function (result) {
                if (canvas) {
                    drawImageOnCanvas(result.image, canvas);
                }

                return result;
            });
    };

    var operateJavaScriptOnDocument = function (doc, options) {
        return browser.executeJavascript(doc, options)
            .then(function (result) {
                var document = result.document;
                documentHelper.persistInputValues(document);

                return {
                    document: document,
                    errors: result.errors
                };
            });
    };

    module.rasterize = function (doc, canvas, options) {
        var inlineOptions;

        inlineOptions = util.clone(options);
        inlineOptions.inlineScripts = options.executeJs === true;

        return inlineresources.inlineReferences(doc, inlineOptions)
            .then(function (errors) {
                if (options.executeJs) {
                    return operateJavaScriptOnDocument(doc, options)
                        .then(function (result) {
                            return {
                                document: result.document,
                                errors: errors.concat(result.errors)
                            };
                        });
                } else {
                    return {
                        document: doc,
                        errors: errors
                    };
                }
            }).then(function (result) {
                return doDraw(result.document, canvas, options)
                    .then(function (drawResult) {
                        return {
                            image: drawResult.image,
                            svg: drawResult.svg,
                            errors: result.errors
                        };
                    });
            });
    };

    return module;
}(util, browser, documentHelper, document2svg, svg2image, inlineresources));

var rasterizeHTML = (function (util, browser, rasterize) {
    "use strict";

    var module = {};

    var getViewportSize = function (canvas, options) {
        var defaultWidth = 300,
            defaultHeight = 200,
            fallbackWidth = canvas ? canvas.width : defaultWidth,
            fallbackHeight = canvas ? canvas.height : defaultHeight,
            width = options.width !== undefined ? options.width : fallbackWidth,
            height = options.height !== undefined ? options.height : fallbackHeight;

        return {
            width: width,
            height: height
        };
    };

    var constructOptions = function (params) {
        var viewport = getViewportSize(params.canvas, params.options),
            options;

        options = util.clone(params.options);
        options.width = viewport.width;
        options.height = viewport.height;

        return options;
    };

    /**
     * Draws a Document to the canvas.
     * rasterizeHTML.drawDocument( document [, canvas] [, options] ).then(function (result) { ... });
     */
    module.drawDocument = function () {
        var doc = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = util.parseOptionalParameters(optionalArguments);

        return rasterize.rasterize(doc, params.canvas, constructOptions(params));
    };

    var drawHTML = function (html, canvas, options) {
        var doc = browser.parseHTML(html);

        return module.drawDocument(doc, canvas, options);
    };

    /**
     * Draws a HTML string to the canvas.
     * rasterizeHTML.drawHTML( html [, canvas] [, options] ).then(function (result) { ... });
     */
    module.drawHTML = function () {
        var html = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = util.parseOptionalParameters(optionalArguments);

        return drawHTML(html, params.canvas, params.options);
    };

    // work around https://bugzilla.mozilla.org/show_bug.cgi?id=925493
    var workAroundFirefoxNotLoadingStylesheetStyles = function (doc, url, options) {
        var d = document.implementation.createHTMLDocument('');
        d.replaceChild(doc.documentElement, d.documentElement);

        var extendedOptions = options ? util.clone(options) : {};

        if (!options.baseUrl) {
            extendedOptions.baseUrl = url;
        }

        return {
            document: d,
            options: extendedOptions
        };
    };

    var drawURL = function (url, canvas, options) {
        return browser.loadDocument(url, options)
            .then(function (doc) {
                var workaround = workAroundFirefoxNotLoadingStylesheetStyles(doc, url, options);
                return module.drawDocument(workaround.document, canvas, workaround.options);
            });
    };

    /**
     * Draws a page to the canvas.
     * rasterizeHTML.drawURL( url [, canvas] [, options] ).then(function (result) { ... });
     */
    module.drawURL = function () {
        var url = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = util.parseOptionalParameters(optionalArguments);

        return drawURL(url, params.canvas, params.options);
    };

    return module;
}(util, browser, rasterize));

return rasterizeHTML;

}));
