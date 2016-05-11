/*! rasterizeHTML.js - v0.9.0 - 2014-04-23
* http://www.github.com/cburgmer/rasterizeHTML.js
* Copyright (c) 2014 Christoph Burgmer; Licensed MIT */
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('url'), require('xmlserializer'), require('ayepromise'), require('inlineresources'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['url', 'xmlserializer', 'ayepromise', 'inlineresources'], factory);
    }
    else {
        root['rasterizeHTML'] = factory(root.url, root.xmlserializer, root.ayepromise, root.inlineresources);
    }
}(this, function(url, xmlserializer, ayepromise, inlineresources) {

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
    
        var isFunction = function (func) {
            return typeof func === "function";
        };
    
        // args: canvas, options
        // legacy API: args: canvas, options, callback
        module.parseOptionalParameters = function (args) {
            var parameters = {
                canvas: null,
                options: {},
                callback: null
            };
    
            if (isFunction(args[0])) {
                parameters.callback = args[0];
            } else {
                if (args[0] == null || isCanvas(args[0])) {
                    parameters.canvas = args[0] || null;
    
                    if (isFunction(args[1])) {
                        parameters.callback = args[1];
                    } else {
                        parameters.options = module.clone(args[1]);
                        parameters.callback = args[2] || null;
                    }
    
                } else {
                    parameters.options = module.clone(args[0]);
                    parameters.callback = args[1] || null;
                }
            }
    
            return parameters;
        };
    
        return module;
    }(url));
    
    var xhrproxies = (function (util, ayepromise) {
        var module = {};
    
        // Bases all XHR calls on the given base URL
        module.baseUrlRespecting = function (XHRObject, baseUrl) {
            var xhrConstructor = function () {
                var xhr = new XHRObject(),
                    open = xhr.open;
    
                xhr.open = function () {
                    var args = Array.prototype.slice.call(arguments),
                        method = args.shift(),
                        url = args.shift(),
                        joinedUrl = util.joinUrl(baseUrl, url);
    
                    return open.apply(this, [method, joinedUrl].concat(args));
                };
    
                return xhr;
            };
    
            return xhrConstructor;
        };
    
        // Provides a convenient way of being notified when all pending XHR calls are finished
        module.finishNotifying = function (XHRObject) {
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
                var xhr = new XHRObject(),
                    send = xhr.send;
    
                xhr.send = function () {
                    totalXhrCount += 1;
                    return send.apply(this, arguments);
                };
    
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
    
        module.addClassNameRecursively = function (element, className) {
            element.className += ' ' + className;
    
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
    
        module.rewriteStyleRuleSelector = function (doc, oldSelector, newSelector) {
            // Assume that oldSelector is always prepended with a ':' or '.' for now, so no special handling needed
            var oldSelectorRegex = oldSelector + '(?=\\W|$)';
    
            asArray(doc.querySelectorAll('style')).forEach(function (styleElement) {
                var matchingRules = asArray(styleElement.sheet.cssRules).filter(function (rule) {
                        return rule.selectorText && new RegExp(oldSelectorRegex).test(rule.selectorText);
                    });
    
                if (matchingRules.length) {
                    matchingRules.forEach(function (rule) {
                        var selector = rule.selectorText.replace(new RegExp(oldSelectorRegex, 'g'), newSelector);
    
                        updateRuleSelector(rule, selector);
                    });
    
                    rewriteStyleContent(styleElement);
                }
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
    
        module.fakeHover = function (doc, hoverSelector) {
            var elem = doc.querySelector(hoverSelector),
                fakeHoverClass = 'rasterizehtmlhover';
            if (! elem) {
                return;
            }
    
            documentUtil.addClassNameRecursively(elem, fakeHoverClass);
            documentUtil.rewriteStyleRuleSelector(doc, ':hover', '.' + fakeHoverClass);
        };
    
        module.fakeActive = function (doc, activeSelector) {
            var elem = doc.querySelector(activeSelector),
                fakeActiveClass = 'rasterizehtmlactive';
            if (! elem) {
                return;
            }
    
            documentUtil.addClassNameRecursively(elem, fakeActiveClass);
            documentUtil.rewriteStyleRuleSelector(doc, ':active', '.' + fakeActiveClass);
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
    
    
        return module;
    }(documentUtil));
    
    var browser = (function (util, xhrproxies, ayepromise, theWindow) {
        "use strict";
    
        var module = {};
    
        var createHiddenElement = function (doc, tagName) {
            var element = doc.createElement(tagName);
            // 'display: none' doesn't cut it, as browsers seem to be lazy loading CSS
            element.style.visibility = "hidden";
            element.style.width = "0px";
            element.style.height = "0px";
            element.style.position = "absolute";
            element.style.top = "-10000px";
            element.style.left = "-10000px";
            // We need to add the element to the document so that its content gets loaded
            doc.getElementsByTagName("body")[0].appendChild(element);
            return element;
        };
    
        module.executeJavascript = function (doc, baseUrl, timeout) {
            var iframe = createHiddenElement(theWindow.document, "iframe"),
                html = doc.documentElement.outerHTML,
                iframeErrorsMessages = [],
                defer = ayepromise.defer();
    
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
                finishNotifyXhrProxy = xhrproxies.finishNotifying(xhr),
                baseUrlXhrProxy = xhrproxies.baseUrlRespecting(finishNotifyXhrProxy, baseUrl);
    
            iframe.contentDocument.open();
            iframe.contentWindow.XMLHttpRequest = baseUrlXhrProxy;
            iframe.contentWindow.onerror = function (msg) {
                iframeErrorsMessages.push({
                    resourceType: "scriptExecution",
                    msg: msg
                });
            };
    
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
            // We need to add the element to the document so that its content gets loaded
            doc.getElementsByTagName("body")[0].appendChild(iframe);
            return iframe;
        };
    
        module.calculateDocumentContentSize = function (doc, viewportWidth, viewportHeight) {
            var html = doc.documentElement.outerHTML,
                iframe = createHiddenSandboxedIFrame(theWindow.document, viewportWidth, viewportHeight),
                defer = ayepromise.defer();
    
            iframe.onload = function () {
                var doc = iframe.contentDocument,
                    // clientWidth/clientHeight needed for PhantomJS
                    canvasWidth = Math.max(doc.documentElement.scrollWidth, doc.body.clientWidth),
                    canvasHeight = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, doc.body.clientHeight);
    
                theWindow.document.getElementsByTagName("body")[0].removeChild(iframe);
    
                defer.resolve({
                    width: canvasWidth,
                    height: canvasHeight
                });
            };
    
            // srcdoc doesn't work in PhantomJS yet
            iframe.contentDocument.open();
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
            var doc;
            if ((new DOMParser()).parseFromString('<a></a>', 'text/html')) {
                doc = (new DOMParser()).parseFromString(html, 'text/html');
            } else {
                doc = theWindow.document.implementation.createHTMLDocument('');
                doc.documentElement.innerHTML = html;
    
                addHTMLTagAttributes(doc, html);
            }
            return doc;
        };
    
        var isParseError = function (parsedDocument) {
            // http://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
            var p = new DOMParser(),
                errorneousParse = p.parseFromString('<', 'text/xml'),
                parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;
    
            if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
                // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
                return parsedDocument.getElementsByTagName("parsererror").length > 0;
            }
    
            return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
        };
    
        var failOnParseError = function (doc) {
            if (isParseError(doc)) {
                throw {
                    message: "Invalid source"
                };
            }
        };
    
        module.validateXHTML = function (xhtml) {
            var p = new DOMParser(),
                doc = p.parseFromString(xhtml, "application/xml");
    
            failOnParseError(doc);
        };
    
        var lastCacheDate = null;
    
        var getUncachableURL = function (url, cache) {
            if (cache === false || cache === 'none' || cache === 'repeated') {
                if (lastCacheDate === null || cache !== 'repeated') {
                    lastCacheDate = Date.now();
                }
                return url + "?_=" + lastCacheDate;
            } else {
                return url;
            }
        };
    
        var doDocumentLoad = function (url, options) {
            var ajaxRequest = new window.XMLHttpRequest(),
                joinedUrl = util.joinUrl(options.baseUrl, url),
                augmentedUrl = getUncachableURL(joinedUrl, options.cache),
                defer = ayepromise.defer(),
                doReject = function () {
                    defer.reject({message: "Unable to load page"});
                };
    
            ajaxRequest.addEventListener("load", function () {
                if (ajaxRequest.status === 200 || ajaxRequest.status === 0) {
                    defer.resolve(ajaxRequest.responseXML);
                } else {
                    doReject();
                }
            }, false);
    
            ajaxRequest.addEventListener("error", function () {
                doReject();
            }, false);
    
            try {
                ajaxRequest.open('GET', augmentedUrl, true);
                ajaxRequest.responseType = "document";
                ajaxRequest.send(null);
            } catch (err) {
                doReject();
            }
    
            return defer.promise;
        };
    
        module.loadDocument = function (url, options) {
            return doDocumentLoad(url, options)
                .then(function (doc) {
                    failOnParseError(doc);
    
                    return doc;
                });
        };
    
        return module;
    }(util, xhrproxies, ayepromise, window));
    
    var render = (function (util, browser, documentHelper, xmlserializer, ayepromise, window) {
        "use strict";
    
        var module = {};
    
        var asArray = function (arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        };
    
        var supportsBlobBuilding = function () {
            // Newer WebKit (under PhantomJS) seems to support blob building, but loading an image with the blob fails
            if (window.navigator.userAgent.indexOf("WebKit") >= 0 && window.navigator.userAgent.indexOf("Chrome") < 0) {
                return false;
            }
            if (window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder) {
                // Deprecated interface
                return true;
            } else {
                if (window.Blob) {
                    // Available as constructor only in newer builds for all Browsers
                    try {
                        new window.Blob(['<b></b>'], { "type" : "text\/xml" });
                        return true;
                    } catch (err) {
                        return false;
                    }
                }
            }
            return false;
        };
    
        var getBlob = function (data) {
           var imageType = "image/svg+xml;charset=utf-8",
               BLOBBUILDER = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder,
               svg;
           if (BLOBBUILDER) {
               svg = new BLOBBUILDER();
               svg.append(data);
               return svg.getBlob(imageType);
           } else {
               return new window.Blob([data], {"type": imageType});
           }
        };
    
        var buildImageUrl = function (svg) {
            var DOMURL = window.URL || window.webkitURL || window;
            if (supportsBlobBuilding()) {
                return DOMURL.createObjectURL(getBlob(svg));
            } else {
                return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
            }
        };
    
        var cleanUpUrl = function (url) {
            var DOMURL = window.URL || window.webkitURL || window;
            if (supportsBlobBuilding()) {
                DOMURL.revokeObjectURL(url);
            }
        };
    
        var createHiddenElement = function (doc, tagName) {
            var element = doc.createElement(tagName);
            // 'display: none' doesn't cut it, as browsers seem to be lazy loading CSS
            element.style.visibility = "hidden";
            element.style.width = "0px";
            element.style.height = "0px";
            element.style.position = "absolute";
            element.style.top = "-10000px";
            element.style.left = "-10000px";
            // We need to add the element to the document so that its content gets loaded
            doc.getElementsByTagName("body")[0].appendChild(element);
            return element;
        };
    
        var getOrCreateHiddenDivWithId = function (doc, id) {
            var div = doc.getElementById(id);
            if (! div) {
                div = createHiddenElement(doc, "div");
                div.id = id;
            }
    
            return div;
        };
    
        var WORKAROUND_ID = "rasterizeHTML_js_FirefoxWorkaround";
    
        var needsBackgroundImageWorkaround = function () {
            var firefoxMatch = window.navigator.userAgent.match(/Firefox\/(\d+).0/);
            return !firefoxMatch || !firefoxMatch[1] || parseInt(firefoxMatch[1], 10) < 17;
        };
    
        var workAroundBrowserBugForBackgroundImages = function (svg, canvas) {
            // Firefox < 17, Chrome & Safari will (sometimes) not show an inlined background-image until the svg is
            // connected to the DOM it seems.
            var uniqueId = util.getConstantUniqueIdFor(svg),
                doc = canvas ? canvas.ownerDocument : window.document,
                workaroundDiv;
    
            if (needsBackgroundImageWorkaround()) {
                workaroundDiv = getOrCreateHiddenDivWithId(doc, WORKAROUND_ID + uniqueId);
                workaroundDiv.innerHTML = svg;
                workaroundDiv.className = WORKAROUND_ID; // Make if findable for debugging & testing purposes
            }
        };
    
        var workAroundWebkitBugIgnoringTheFirstRuleInCSS = function (doc) {
            // Works around bug with webkit ignoring the first rule in each style declaration when rendering the SVG to the
            // DOM. While this does not directly affect the process when rastering to canvas, this is needed for the
            // workaround found in workAroundBrowserBugForBackgroundImages();
            if (window.navigator.userAgent.indexOf("WebKit") >= 0) {
                asArray(doc.getElementsByTagName("style")).forEach(function (style) {
                    style.textContent = "span {}\n" + style.textContent;
                });
            }
        };
    
        var cleanUpAfterWorkAroundForBackgroundImages = function (svg, canvas) {
            var uniqueId = util.getConstantUniqueIdFor(svg),
                doc = canvas ? canvas.ownerDocument : window.document,
                div = doc.getElementById(WORKAROUND_ID + uniqueId);
            if (div) {
                div.parentNode.removeChild(div);
            }
        };
    
        var zoomedElementSizingAttributes = function (width, height, zoomFactor) {
            var zoomHtmlInject = '',
                closestScaledWith, closestScaledHeight;
    
            zoomFactor = zoomFactor || 1;
            closestScaledWith = Math.round(width / zoomFactor);
            closestScaledHeight = Math.round(height / zoomFactor);
    
            if (zoomFactor !== 1) {
                zoomHtmlInject = ' style="' +
                    '-webkit-transform: scale(' + zoomFactor + '); ' +
                    '-webkit-transform-origin: top left; ' +
                    'transform: scale(' + zoomFactor + '); ' +
                    'transform-origin: top left;"';
            }
    
            return ' width="' + closestScaledWith + '" height="' + closestScaledHeight + '"' +
                    zoomHtmlInject;
        };
    
        module.getSvgForDocument = function (doc, width, height, zoomFactor) {
            var xhtml;
    
            workAroundWebkitBugIgnoringTheFirstRuleInCSS(doc);
            xhtml = xmlserializer.serializeToString(doc);
    
            browser.validateXHTML(xhtml);
    
            return (
                '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    '<foreignObject' + zoomedElementSizingAttributes(width, height, zoomFactor) + '>' +
                    xhtml +
                    '</foreignObject>' +
                '</svg>'
            );
        };
    
        var generalDrawError = function () {
            return {message: "Error rendering page"};
        };
    
        module.renderSvg = function (svg, canvas) {
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
                    cleanUpAfterWorkAroundForBackgroundImages(svg, canvas);
                };
    
            workAroundBrowserBugForBackgroundImages(svg, canvas);
    
            url = buildImageUrl(svg);
    
            image = new window.Image();
            image.onload = function() {
                resetEventHandlers();
                cleanUp();
    
                defer.resolve(image);
            };
            image.onerror = function () {
                cleanUp();
    
                // Webkit calls the onerror handler if the SVG is faulty
                defer.reject(generalDrawError());
            };
            image.src = url;
    
            return defer.promise;
        };
    
        module.drawImageOnCanvas = function (image, canvas) {
            try {
                canvas.getContext("2d").drawImage(image, 0, 0);
            } catch (e) {
                // Firefox throws a 'NS_ERROR_NOT_AVAILABLE' if the SVG is faulty
                throw generalDrawError();
            }
        };
    
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
    
        module.drawDocumentImage = function (doc, canvas, options) {
            var viewportSize = getViewportSize(canvas, options);
    
            if (options.hover) {
                documentHelper.fakeHover(doc, options.hover);
            }
            if (options.active) {
                documentHelper.fakeActive(doc, options.active);
            }
    
            return browser.calculateDocumentContentSize(doc, viewportSize.width, viewportSize.height)
                .then(function (size) {
                    return module.getSvgForDocument(doc, size.width, size.height, options.zoom);
                })
                .then(function (svg) {
                    return module.renderSvg(svg, canvas);
                });
        };
    
        return module;
    }(util, browser, documentHelper, xmlserializer, ayepromise, window));
    
    var rasterizeHTML = (function (util, browser, documentHelper, render, inlineresources) {
        "use strict";
    
        var module = {};
    
        var doDraw = function (doc, canvas, options) {
            return render.drawDocumentImage(doc, canvas, options).then(function (image) {
                if (canvas) {
                    render.drawImageOnCanvas(image, canvas);
                }
    
                return image;
            });
        };
    
        var operateJavaScriptOnDocument = function (doc, options) {
            var executeJsTimeout = options.executeJsTimeout || 0;
    
            return browser.executeJavascript(doc, options.baseUrl, executeJsTimeout)
                .then(function (result) {
                    var document = result.document;
                    documentHelper.persistInputValues(document);
    
                    return {
                        document: document,
                        errors: result.errors
                    };
                });
        };
    
        var drawDocument = function (doc, canvas, options) {
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
                        .then(function (image) {
                            return {
                                image: image,
                                errors: result.errors
                            };
                        });
                });
        };
    
        /**
         * Draws a Document to the canvas.
         * rasterizeHTML.drawDocument( document [, canvas] [, options] ).then(function (result) { ... });
         */
        module.drawDocument = function () {
            var doc = arguments[0],
                optionalArguments = Array.prototype.slice.call(arguments, 1),
                params = util.parseOptionalParameters(optionalArguments);
    
            var promise = drawDocument(doc, params.canvas, params.options);
    
            // legacy API
            if (params.callback) {
                promise.then(function (result) {
                    params.callback(result.image, result.errors);
                }, function () {
                    params.callback(null, [{
                        resourceType: "document",
                        msg: "Error rendering page"
                    }]);
                });
            }
    
            return promise;
        };
    
        var drawHTML = function (html, canvas, options, callback) {
            var doc = browser.parseHTML(html);
    
            return module.drawDocument(doc, canvas, options, callback);
        };
    
        /**
         * Draws a HTML string to the canvas.
         * rasterizeHTML.drawHTML( html [, canvas] [, options] ).then(function (result) { ... });
         */
        module.drawHTML = function () {
            var html = arguments[0],
                optionalArguments = Array.prototype.slice.call(arguments, 1),
                params = util.parseOptionalParameters(optionalArguments);
    
            return drawHTML(html, params.canvas, params.options, params.callback);
        };
    
        var drawURL = function (url, canvas, options, callback) {
            var promise = browser.loadDocument(url, options)
                .then(function (doc) {
                    return module.drawDocument(doc, canvas, options);
                });
    
            // legacy API
            if (callback) {
                promise.then(function (result) {
                        callback(result.image, result.errors);
                    }, function (e) {
                        callback(null, [{
                            resourceType: "page",
                            url: url,
                            msg: e.message + ' ' + url
                        }]);
                    });
            }
    
            return promise;
        };
    
        /**
         * Draws a page to the canvas.
         * rasterizeHTML.drawURL( url [, canvas] [, options] ).then(function (result) { ... });
         */
        module.drawURL = function () {
            var url = arguments[0],
                optionalArguments = Array.prototype.slice.call(arguments, 1),
                params = util.parseOptionalParameters(optionalArguments);
    
            return drawURL(url, params.canvas, params.options, params.callback);
        };
    
        return module;
    }(util, browser, documentHelper, render, inlineresources));
    

    return rasterizeHTML;

}));
