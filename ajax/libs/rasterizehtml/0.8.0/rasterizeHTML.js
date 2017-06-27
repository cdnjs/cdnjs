/*! rasterizeHTML.js - v0.8.0 - 2014-02-17
* http://www.github.com/cburgmer/rasterizeHTML.js
* Copyright (c) 2014 Christoph Burgmer; Licensed MIT */
window.rasterizeHTMLInline = (function (module) {
    "use strict";

    var getUrlBasePath = function (url) {
        return module.util.joinUrl(url, '.');
    };

    var parameterHashFunction = function (params) {
        // HACK JSON.stringify is poor man's hashing;
        // same objects might not receive same result as key order is not guaranteed
        var a = params.map(function (param, idx) {
            // Only include options relevant for method
            if (idx === (params.length - 1)) {
                param = {
                    // Two different HTML pages on the same path level have the same base path, but a different URL
                    baseUrl: getUrlBasePath(param.baseUrl)
                };
            }
            return JSON.stringify(param);
        });
        return a;
    };

    var memoizeFunctionOnCaching = function (func, options) {
        if ((options.cache !== false && options.cache !== 'none') && options.cacheBucket) {
            return module.util.memoize(func, parameterHashFunction, options.cacheBucket);
        } else {
            return func;
        }
    };

    /* Img Inlining */

    var encodeImageAsDataURI = function (image, options) {
        var url = image.attributes.src ? image.attributes.src.nodeValue : null,
            documentBase = module.util.getDocumentBaseUrl(image.ownerDocument),
            ajaxOptions = module.util.clone(options);

        if (!ajaxOptions.baseUrl && documentBase) {
            ajaxOptions.baseUrl = documentBase;
        }

        return module.util.getDataURIForImageURL(url, ajaxOptions)
            .then(function (dataURI) {
                return dataURI;
            }, function (e) {
                throw {
                    resourceType: "image",
                    url: e.url,
                    msg: "Unable to load image " + e.url
                };
            });
    };

    var filterExternalImages = function (images) {
        return images.filter(function (image) {
            var url = image.attributes.src ? image.attributes.src.nodeValue : null;

            return url !== null && !module.util.isDataUri(url);
        });
    };

    var filterInputsForImageType = function (inputs) {
        return Array.prototype.filter.call(inputs, function (input) {
            return input.type === "image";
        });
    };

    var toArray = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };

    module.loadAndInlineImages = function (doc, options) {
        var images = toArray(doc.getElementsByTagName("img")),
            imageInputs = filterInputsForImageType(doc.getElementsByTagName("input")),
            externalImages = filterExternalImages(images.concat(imageInputs));

        return module.util.collectAndReportErrors(externalImages.map(function (image) {
            return encodeImageAsDataURI(image, options).then(function (dataURI) {
                image.attributes.src.nodeValue = dataURI;
            });
        }));
    };

    /* Style inlining */

    var requestExternalsForStylesheet = function (styleContent, alreadyLoadedCssUrls, options) {
        var cssRules = module.css.rulesForCssText(styleContent);

        return module.css.loadCSSImportsForRules(cssRules, alreadyLoadedCssUrls, options).then(function (cssImportResult) {
            return module.css.loadAndInlineCSSResourcesForRules(cssRules, options).then(function (cssResourcesResult) {
                var errors = cssImportResult.errors.concat(cssResourcesResult.errors),
                    hasChanges = cssImportResult.hasChanges || cssResourcesResult.hasChanges;

                if (hasChanges) {
                    styleContent = module.css.cssRulesToText(cssRules);
                }

                return {
                    hasChanges: hasChanges,
                    content: styleContent,
                    errors: errors
                };
            });
        });
    };

    var loadAndInlineCssForStyle = function (style, options, alreadyLoadedCssUrls) {
        var styleContent = style.textContent,
            processExternals = memoizeFunctionOnCaching(requestExternalsForStylesheet, options);

        return processExternals(styleContent, alreadyLoadedCssUrls, options).then(function (result) {
            if (result.hasChanges) {
                style.childNodes[0].nodeValue = result.content;
            }

            return module.util.cloneArray(result.errors);
        });
    };

    var getCssStyleElements = function (doc) {
        var styles = doc.getElementsByTagName("style");

        return Array.prototype.filter.call(styles, function (style) {
            return !style.attributes.type || style.attributes.type.nodeValue === "text/css";
        });
    };

    module.loadAndInlineStyles = function (doc, options) {
        var styles = getCssStyleElements(doc),
            allErrors = [],
            alreadyLoadedCssUrls = [],
            inlineOptions;

        inlineOptions = module.util.clone(options);
        inlineOptions.baseUrl = inlineOptions.baseUrl || module.util.getDocumentBaseUrl(doc);

        return module.util.all(styles.map(function (style) {
            return loadAndInlineCssForStyle(style, inlineOptions, alreadyLoadedCssUrls).then(function (errors) {
                allErrors = allErrors.concat(errors);
            });
        })).then(function () {
            return allErrors;
        });
    };

    /* CSS link inlining */

    var substituteLinkWithInlineStyle = function (oldLinkNode, styleContent) {
        var parent = oldLinkNode.parentNode,
            styleNode;

        styleContent = styleContent.trim();
        if (styleContent) {
            styleNode = oldLinkNode.ownerDocument.createElement("style");
            styleNode.type = "text/css";
            styleNode.appendChild(oldLinkNode.ownerDocument.createTextNode(styleContent));

            parent.insertBefore(styleNode, oldLinkNode);
        }

        parent.removeChild(oldLinkNode);
    };

    var requestStylesheetAndInlineResources = function (url, options) {
        return module.util.ajax(url, options)
            .then(function (content) {
                var cssRules = module.css.rulesForCssText(content);

                return {
                    content: content,
                    cssRules: cssRules
                };
            })
            .then(function (result) {
                var hasChangesFromPathAdjustment = module.css.adjustPathsOfCssResources(url, result.cssRules);

                return {
                    content: result.content,
                    cssRules: result.cssRules,
                    hasChanges: hasChangesFromPathAdjustment
                };
            })
            .then(function (result) {
                return module.css.loadCSSImportsForRules(result.cssRules, [], options)
                    .then(function (cssImportResult) {
                        return {
                            content: result.content,
                            cssRules: result.cssRules,
                            hasChanges: result.hasChanges || cssImportResult.hasChanges,
                            errors: cssImportResult.errors
                        };
                    });
            })
            .then(function (result) {
                return module.css.loadAndInlineCSSResourcesForRules(result.cssRules, options)
                    .then(function (cssResourcesResult) {
                        return {
                            content: result.content,
                            cssRules: result.cssRules,
                            hasChanges: result.hasChanges || cssResourcesResult.hasChanges,
                            errors: result.errors.concat(cssResourcesResult.errors)
                        };
                    });
            })
            .then(function (result) {
                var content = result.content;
                if (result.hasChanges) {
                    content = module.css.cssRulesToText(result.cssRules);
                }
                return {
                    content: content,
                    errors: result.errors
                };
            });
    };

    var loadLinkedCSS = function (link, options) {
        var cssHref = link.attributes.href.nodeValue,
            documentBaseUrl = module.util.getDocumentBaseUrl(link.ownerDocument),
            ajaxOptions = module.util.clone(options);

        if (!ajaxOptions.baseUrl && documentBaseUrl) {
            ajaxOptions.baseUrl = documentBaseUrl;
        }

        var processStylesheet = memoizeFunctionOnCaching(requestStylesheetAndInlineResources, options);

        return processStylesheet(cssHref, ajaxOptions).then(function (result) {
            return {
                content: result.content,
                errors: module.util.cloneArray(result.errors)
            };
        });
    };

    var getCssStylesheetLinks = function (doc) {
        var links = doc.getElementsByTagName("link");

        return Array.prototype.filter.call(links, function (link) {
            return link.attributes.rel && link.attributes.rel.nodeValue === "stylesheet" &&
                (!link.attributes.type || link.attributes.type.nodeValue === "text/css");
        });
    };

    module.loadAndInlineCssLinks = function (doc, options) {
        var links = getCssStylesheetLinks(doc),
            errors = [];

        return module.util.all(links.map(function (link) {
            return loadLinkedCSS(link, options).then(function(result) {
                substituteLinkWithInlineStyle(link, result.content + "\n");

                errors = errors.concat(result.errors);
            }, function (e) {
                errors.push({
                    resourceType: "stylesheet",
                    url: e.url,
                    msg: "Unable to load stylesheet " + e.url
                });
            });
        })).then(function () {
            return errors;
        });
    };

    /* Script inlining */

    var loadLinkedScript = function (script, options) {
        var src = script.attributes.src.nodeValue,
            documentBase = module.util.getDocumentBaseUrl(script.ownerDocument),
            ajaxOptions = module.util.clone(options);

        if (!ajaxOptions.baseUrl && documentBase) {
            ajaxOptions.baseUrl = documentBase;
        }

        return module.util.ajax(src, ajaxOptions)
            .fail(function (e) {
                throw {
                    resourceType: "script",
                    url: e.url,
                    msg: "Unable to load script " + e.url
                };
            });
    };

    var escapeClosingTags = function (text) {
        // http://stackoverflow.com/questions/9246382/escaping-script-tag-inside-javascript
        return text.replace(/<\//g, '<\\/');
    };

    var substituteExternalScriptWithInline = function (scriptNode, jsCode) {
        scriptNode.attributes.removeNamedItem('src');
        scriptNode.textContent = escapeClosingTags(jsCode);
    };

    var getScripts = function (doc) {
        var scripts = doc.getElementsByTagName("script");

        return Array.prototype.filter.call(scripts, function (script) {
            return !!script.attributes.src;
        });
    };

    module.loadAndInlineScript = function (doc, options) {
        var scripts = getScripts(doc);

        return module.util.collectAndReportErrors(scripts.map(function (script) {
            return loadLinkedScript(script, options).then(function (jsCode) {
                substituteExternalScriptWithInline(script, jsCode);
            });
        }));
    };

    /* Main */

    module.inlineReferences = function (doc, options) {
        var allErrors = [],
            inlineFuncs = [
                module.loadAndInlineImages,
                module.loadAndInlineStyles,
                module.loadAndInlineCssLinks];

        if (options.inlineScripts !== false) {
            inlineFuncs.push(module.loadAndInlineScript);
        }

        return module.util.all(inlineFuncs.map(function (func) {
            return func(doc, options)
                .then(function (errors) {
                    allErrors = allErrors.concat(errors);
                });
        })).then(function () {
            return allErrors;
        });
    };

    return module;
}(window.rasterizeHTMLInline || {}));

window.rasterizeHTMLInline = (function (module, window, CSSOM, ayepromise) {
    "use strict";

    module.css = {};

    var updateCssPropertyValue = function (rule, property, value) {
        rule.style.setProperty(property, value, rule.style.getPropertyPriority(property));
    };

    var rulesForCssTextFromBrowser = function (styleContent) {
        var doc = document.implementation.createHTMLDocument(""),
            styleElement = document.createElement("style"),
            rules;

        styleElement.textContent = styleContent;
        // the style will only be parsed once it is added to a document
        doc.body.appendChild(styleElement);
        rules = styleElement.sheet.cssRules;

        return Array.prototype.slice.call(rules);
    };

    var browserHasBackgroundImageUrlIssue = (function () {
        // Checks for http://code.google.com/p/chromium/issues/detail?id=161644
        var rules = rulesForCssTextFromBrowser('a{background:url(i)}');
        return !rules.length || rules[0].cssText.indexOf('url()') >= 0;
    }());

    module.css.rulesForCssText = function (styleContent) {
        if (browserHasBackgroundImageUrlIssue && CSSOM.parse) {
            return CSSOM.parse(styleContent).cssRules;
        } else {
            return rulesForCssTextFromBrowser(styleContent);
        }
    };

    var findBackgroundImageRules = function (cssRules) {
        return cssRules.filter(function (rule) {
            return rule.type === window.CSSRule.STYLE_RULE && (rule.style.getPropertyValue('background-image') || rule.style.getPropertyValue('background'));
        });
    };

    var findBackgroundDeclarations = function (rules) {
        var backgroundDeclarations = [];

        rules.forEach(function (rule) {
            if (rule.style.getPropertyValue('background-image')) {
                backgroundDeclarations.push({
                    property: 'background-image',
                    value: rule.style.getPropertyValue('background-image'),
                    rule: rule
                });
            } else if (rule.style.getPropertyValue('background')) {
                backgroundDeclarations.push({
                    property: 'background',
                    value: rule.style.getPropertyValue('background'),
                    rule: rule
                });
            }
        });

        return backgroundDeclarations;
    };

    var findFontFaceRules = function (cssRules) {
        return cssRules.filter(function (rule) {
            return rule.type === window.CSSRule.FONT_FACE_RULE && rule.style.getPropertyValue("src");
        });
    };

    module.css.cssRulesToText = function (cssRules) {
        return cssRules.reduce(function (cssText, rule) {
            return cssText + rule.cssText;
        }, '');
    };

    var unquoteString = function (quotedUrl) {
        var doubleQuoteRegex = /^"(.*)"$/,
            singleQuoteRegex = /^'(.*)'$/;

        if (doubleQuoteRegex.test(quotedUrl)) {
            return quotedUrl.replace(doubleQuoteRegex, "$1");
        } else {
            if (singleQuoteRegex.test(quotedUrl)) {
                return quotedUrl.replace(singleQuoteRegex, "$1");
            } else {
                return quotedUrl;
            }
        }
    };

    var trimCSSWhitespace = function (url) {
        var whitespaceRegex = /^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/;

        return url.replace(whitespaceRegex, "$1");
    };

    module.css.extractCssUrl = function (cssUrl) {
        var urlRegex = /^url\(([^\)]+)\)/,
            quotedUrl;

        if (!urlRegex.test(cssUrl)) {
            throw new Error("Invalid url");
        }

        quotedUrl = urlRegex.exec(cssUrl)[1];
        return unquoteString(trimCSSWhitespace(quotedUrl));
    };

    var findFontFaceFormat = function (value) {
        var fontFaceFormatRegex = /^format\(([^\)]+)\)/,
            quotedFormat;

        if (!fontFaceFormatRegex.test(value)) {
            return null;
        }

        quotedFormat = fontFaceFormatRegex.exec(value)[1];
        return unquoteString(quotedFormat);
    };

    var extractFontFaceSrcUrl = function (reference) {
        var url, format = null;

        try {
            url = module.css.extractCssUrl(reference[0]);
            if (reference[1]) {
                format = findFontFaceFormat(reference[1]);
            }
            return {
                url: url,
                format: format
            };
        } catch (e) {}
    };

    // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=443978
    var changeFontFaceRuleSrc = function (cssRules, rule, newSrc) {
        var newRuleText = '@font-face { font-family: ' + rule.style.getPropertyValue("font-family") + '; ';

        if (rule.style.getPropertyValue("font-style")) {
            newRuleText += 'font-style: ' + rule.style.getPropertyValue("font-style") + '; ';
        }

        if (rule.style.getPropertyValue("font-weight")) {
            newRuleText += 'font-weight: ' + rule.style.getPropertyValue("font-weight") + '; ';
        }

        newRuleText += 'src: ' + newSrc + '}';
        exchangeRule(cssRules, rule, newRuleText);
    };

    var exchangeRule = function (cssRules, rule, newRuleText) {
        var ruleIdx = cssRules.indexOf(rule),
            styleSheet = rule.parentStyleSheet;

        // Generate a new rule
        styleSheet.insertRule(newRuleText, ruleIdx+1);
        styleSheet.deleteRule(ruleIdx);
        // Exchange with the new
        cssRules[ruleIdx] = styleSheet.cssRules[ruleIdx];
    };

    module.css.adjustPathsOfCssResources = function (baseUrl, cssRules) {
        var backgroundRules = findBackgroundImageRules(cssRules),
            backgroundDeclarations = findBackgroundDeclarations(backgroundRules),
            change = false;

        backgroundDeclarations.forEach(function (declaration) {
            var parsedBackground = parseBackgroundDeclaration(declaration.value),
                externalBackgroundIndices = findExternalBackgroundUrls(parsedBackground),
                backgroundValue;

            if (externalBackgroundIndices.length > 0) {
                externalBackgroundIndices.forEach(function (backgroundLayerIndex) {
                    var relativeUrl = parsedBackground[backgroundLayerIndex].url,
                        url = module.util.joinUrl(baseUrl, relativeUrl);
                    parsedBackground[backgroundLayerIndex].url = url;
                });

                backgroundValue = parsedBackgroundDeclarationToText(parsedBackground);

                updateCssPropertyValue(declaration.rule, declaration.property, backgroundValue);

                change = true;
            }
        });
        findFontFaceRules(cssRules).forEach(function (rule) {
            var fontFaceSrcDeclaration = rule.style.getPropertyValue("src"),
                parsedFontFaceSources = parseFontFaceSrcDeclaration(fontFaceSrcDeclaration),
                externalFontFaceUrlIndices = findExternalFontFaceUrls(parsedFontFaceSources);

            if (externalFontFaceUrlIndices.length > 0) {
                externalFontFaceUrlIndices.forEach(function (fontFaceUrlIndex) {
                    var relativeUrl = parsedFontFaceSources[fontFaceUrlIndex].url,
                        url = module.util.joinUrl(baseUrl, relativeUrl);

                    parsedFontFaceSources[fontFaceUrlIndex].url = url;
                });

                changeFontFaceRuleSrc(cssRules, rule, parsedFontFaceSrcDeclarationToText(parsedFontFaceSources));

                change = true;
            }
        });
        findCSSImportRules(cssRules).forEach(function (rule) {
            var cssUrl = rule.href,
                url = module.util.joinUrl(baseUrl, cssUrl);

            exchangeRule(cssRules, rule, "@import url(" + url + ");");

            change = true;
        });

        return change;
    };

    /* CSS import inlining */

    var findCSSImportRules = function (cssRules) {
        return cssRules.filter(function (rule) {
            return rule.type === window.CSSRule.IMPORT_RULE && rule.href;
        });
    };

    var substituteRule = function (cssRules, rule, newCssRules) {
        var position = cssRules.indexOf(rule);

        cssRules.splice(position, 1);

        newCssRules.forEach(function (newRule, i) {
            cssRules.splice(position + i, 0, newRule);
        });
    };

    var isQuotedString = function (string) {
        var doubleQuoteRegex = /^"(.*)"$/,
            singleQuoteRegex = /^'(.*)'$/;

        return doubleQuoteRegex.test(string) || singleQuoteRegex.test(string);
    };

    var fulfilledPromise = function (value) {
        var defer = ayepromise.defer();
        defer.resolve(value);
        return defer.promise;
    };

    var loadAndInlineCSSImport = function (cssRules, rule, alreadyLoadedCssUrls, options) {
        var url = rule.href,
            cssHrefRelativeToDoc;

        if (isQuotedString(url)) {
            url = unquoteString(url);
        }

        cssHrefRelativeToDoc = module.util.joinUrl(options.baseUrl, url);

        if (alreadyLoadedCssUrls.indexOf(cssHrefRelativeToDoc) >= 0) {
            // Remove URL by adding empty string
            substituteRule(cssRules, rule, []);
            return fulfilledPromise([]);
        } else {
            alreadyLoadedCssUrls.push(cssHrefRelativeToDoc);
        }

        return module.util.ajax(url, options)
            .then(function (cssText) {
                var externalCssRules = module.css.rulesForCssText(cssText);

                // Recursively follow @import statements
                return module.css.loadCSSImportsForRules(externalCssRules, alreadyLoadedCssUrls, options)
                    .then(function (result) {
                        module.css.adjustPathsOfCssResources(url, externalCssRules);

                        substituteRule(cssRules, rule, externalCssRules);

                        return result.errors;
                    });
            }, function (e) {
                throw {
                    resourceType: "stylesheet",
                    url: e.url,
                    msg: "Unable to load stylesheet " + e.url
                };
            });
    };

    module.css.loadCSSImportsForRules = function (cssRules, alreadyLoadedCssUrls, options) {
        var rulesToInline = findCSSImportRules(cssRules),
            errors = [],
            hasChanges = false;

        return module.util.all(rulesToInline.map(function (rule) {
            return loadAndInlineCSSImport(cssRules, rule, alreadyLoadedCssUrls, options).then(function (moreErrors) {
                errors = errors.concat(moreErrors);

                hasChanges = true;
            }, function (e) {
                errors.push(e);
            });
        })).then(function () {
            return {
                hasChanges: hasChanges,
                errors: errors
            };
        });
    };

    /* CSS linked resource inlining */

    var sliceBackgroundDeclaration = function (backgroundDeclarationText) {
        var functionParamRegexS = "\\s*(?:\"[^\"]*\"|'[^']*'|[^\\(]+)\\s*",
            valueRegexS = "(" + "url\\(" + functionParamRegexS + "\\)" + "|" + "[^,\\s]+" + ")",
            simpleSingularBackgroundRegexS = "(?:\\s*" + valueRegexS + ")+",
            simpleBackgroundRegexS = "^\\s*(" + simpleSingularBackgroundRegexS + ")" +
                                      "(?:\\s*,\\s*(" + simpleSingularBackgroundRegexS + "))*" +
                                      "\\s*$",
            simpleSingularBackgroundRegex = new RegExp(simpleSingularBackgroundRegexS, "g"),
            outerRepeatedMatch,
            backgroundLayers = [],
            getValues = function (singularBackgroundDeclaration) {
                var valueRegex = new RegExp(valueRegexS, "g"),
                    backgroundValues = [],
                    repeatedMatch;

                repeatedMatch = valueRegex.exec(singularBackgroundDeclaration);
                while (repeatedMatch) {
                    backgroundValues.push(repeatedMatch[1]);
                    repeatedMatch = valueRegex.exec(singularBackgroundDeclaration);
                }
                return backgroundValues;
            };

        if (backgroundDeclarationText.match(new RegExp(simpleBackgroundRegexS))) {
            outerRepeatedMatch = simpleSingularBackgroundRegex.exec(backgroundDeclarationText);
            while (outerRepeatedMatch) {
                backgroundLayers.push(getValues(outerRepeatedMatch[0]));
                outerRepeatedMatch = simpleSingularBackgroundRegex.exec(backgroundDeclarationText);
            }

            return backgroundLayers;
        }
        return [];
    };

    var findBackgroundImageUrlInValues = function (values) {
        var i, url;

        for(i = 0; i < values.length; i++) {
            try {
                url = module.css.extractCssUrl(values[i]);
                return {
                    url: url,
                    idx: i
                };
            } catch (e) {}
        }
    };

    var parseBackgroundDeclaration = function (backgroundValue) {
        var backgroundLayers = sliceBackgroundDeclaration(backgroundValue);

        return backgroundLayers.map(function (backgroundLayerValues) {
            var urlMatch = findBackgroundImageUrlInValues(backgroundLayerValues);

            if (urlMatch) {
                return {
                    preUrl: backgroundLayerValues.slice(0, urlMatch.idx),
                    url: urlMatch.url,
                    postUrl: backgroundLayerValues.slice(urlMatch.idx+1),
                };
            } else {
                return {
                    preUrl: backgroundLayerValues
                };
            }
        });
    };

    var findExternalBackgroundUrls = function (parsedBackground) {
        var matchIndices = [];

        parsedBackground.forEach(function (backgroundLayer, i) {
            if (backgroundLayer.url && !module.util.isDataUri(backgroundLayer.url)) {
                matchIndices.push(i);
            }
        });

        return matchIndices;
    };

    var parsedBackgroundDeclarationToText = function (parsedBackground) {
        var backgroundLayers = parsedBackground.map(function (backgroundLayer) {
            var values = [].concat(backgroundLayer.preUrl);

            if (backgroundLayer.url) {
                values.push('url("' + backgroundLayer.url + '")');
            }
            if (backgroundLayer.postUrl) {
                values = values.concat(backgroundLayer.postUrl);
            }

            return values.join(' ');
        });

        return backgroundLayers.join(', ');
    };

    var loadAndInlineBackgroundImages = function (backgroundValue, options) {
        var parsedBackground = parseBackgroundDeclaration(backgroundValue),
            externalBackgroundLayerIndices = findExternalBackgroundUrls(parsedBackground),
            hasChanges = false;

        return module.util.collectAndReportErrors(externalBackgroundLayerIndices.map(function (backgroundLayerIndex) {
            var url = parsedBackground[backgroundLayerIndex].url;

            return module.util.getDataURIForImageURL(url, options)
                .then(function (dataURI) {
                    parsedBackground[backgroundLayerIndex].url = dataURI;

                    hasChanges = true;
                }, function (e) {
                    throw {
                        resourceType: "backgroundImage",
                        url: e.url,
                        msg: "Unable to load background-image " + e.url
                    };
                });
        })).then(function (errors) {
            return {
                backgroundValue: parsedBackgroundDeclarationToText(parsedBackground),
                hasChanges: hasChanges,
                errors: errors
            };
        });
    };

    var iterateOverRulesAndInlineBackgroundImages = function (cssRules, options) {
        var rulesToInline = findBackgroundImageRules(cssRules),
            backgroundDeclarations = findBackgroundDeclarations(rulesToInline),
            errors = [],
            cssHasChanges = false;

        return module.util.all(backgroundDeclarations.map(function (declaration) {
            return loadAndInlineBackgroundImages(declaration.value, options)
                .then(function (result) {
                    if (result.hasChanges) {
                        updateCssPropertyValue(declaration.rule, declaration.property, result.backgroundValue);

                        cssHasChanges = true;
                    }

                    errors = errors.concat(result.errors);
                });
        })).then(function () {
            return {
                hasChanges: cssHasChanges,
                errors: errors
            };
        });
    };

    var sliceFontFaceSrcReferences = function (fontFaceSrc) {
        var functionParamRegexS = "\\s*(?:\"[^\"]*\"|'[^']*'|[^\\(]+)\\s*",
            referenceRegexS = "(local\\(" + functionParamRegexS + "\\))" + "|" +
                              "(url\\(" + functionParamRegexS + "\\))" + "(?:\\s+(format\\(" + functionParamRegexS + "\\)))?",
            simpleFontFaceSrcRegexS = "^\\s*(" + referenceRegexS + ")" +
                                      "(?:\\s*,\\s*(" + referenceRegexS + "))*" +
                                      "\\s*$",
            referenceRegex = new RegExp(referenceRegexS, "g"),
            repeatedMatch,
            fontFaceSrcReferences = [],
            getReferences = function (match) {
                var references = [];
                match.slice(1).forEach(function (elem) {
                    if (elem) {
                        references.push(elem);
                    }
                });
                return references;
            };

        if (fontFaceSrc.match(new RegExp(simpleFontFaceSrcRegexS))) {
            repeatedMatch = referenceRegex.exec(fontFaceSrc);
            while (repeatedMatch) {
                fontFaceSrcReferences.push(getReferences(repeatedMatch));
                repeatedMatch = referenceRegex.exec(fontFaceSrc);
            }
            return fontFaceSrcReferences;
        }
        // we should probably throw an exception here
        return [];
    };

    var parseFontFaceSrcDeclaration = function (fontFaceSourceValue) {
        var fontReferences = sliceFontFaceSrcReferences(fontFaceSourceValue);

        return fontReferences.map(function (reference) {
            var fontSrc = extractFontFaceSrcUrl(reference);

            if (fontSrc) {
                return fontSrc;
            } else {
                return {
                    local: reference
                };
            }
        });
    };

    var findExternalFontFaceUrls = function (parsedFontFaceSources) {
        var sourceIndices = [];
        parsedFontFaceSources.forEach(function (sourceItem, i) {
            if (sourceItem.url && !module.util.isDataUri(sourceItem.url)) {
                sourceIndices.push(i);
            }
        });
        return sourceIndices;
    };

    var parsedFontFaceSrcDeclarationToText = function (parsedFontFaceSources) {
        return parsedFontFaceSources.map(function (sourceItem) {
            var itemValue;

            if (sourceItem.url) {
                itemValue = 'url("' + sourceItem.url + '")';
                if (sourceItem.format) {
                    itemValue += ' format("' + sourceItem.format + '")';
                }
            } else {
                itemValue = sourceItem.local;
            }
            return itemValue;
        }).join(', ');
    };

    var loadAndInlineFontFace = function (srcDeclarationValue, options) {
        var parsedFontFaceSources = parseFontFaceSrcDeclaration(srcDeclarationValue),
            externalFontFaceUrlIndices = findExternalFontFaceUrls(parsedFontFaceSources),
            hasChanges = false;

        return module.util.collectAndReportErrors(externalFontFaceUrlIndices.map(function (urlIndex) {
            var fontSrc = parsedFontFaceSources[urlIndex],
                format = fontSrc.format || "woff";

            return module.util.binaryAjax(fontSrc.url, options)
                .then(function (content) {
                    var base64Content = btoa(content);
                    fontSrc.url = 'data:font/' + format + ';base64,' + base64Content;

                    hasChanges = true;
                }, function (e) {
                    throw {
                        resourceType: "fontFace",
                        url: e.url,
                        msg: "Unable to load font-face " + e.url
                    };
                });
        })).then(function (errors) {
            return {
                srcDeclarationValue: parsedFontFaceSrcDeclarationToText(parsedFontFaceSources),
                hasChanges: hasChanges,
                errors: errors
            };
        });
    };

    var iterateOverRulesAndInlineFontFace = function (cssRules, options) {
        var rulesToInline = findFontFaceRules(cssRules),
            errors = [],
            hasChanges = false;

        return module.util.all(rulesToInline.map(function (rule) {
            var srcDeclarationValue = rule.style.getPropertyValue("src");

            return loadAndInlineFontFace(srcDeclarationValue, options).then(function (result) {
                if (result.hasChanges) {
                    changeFontFaceRuleSrc(cssRules, rule, result.srcDeclarationValue);

                    hasChanges = true;
                }

                errors = errors.concat(result.errors);
            });
        })).then(function () {
            return {
                hasChanges: hasChanges,
                errors: errors
            };
        });
    };

    module.css.loadAndInlineCSSResourcesForRules = function (cssRules, options) {
        var hasChanges = false,
            errors = [];

        return module.util.all([iterateOverRulesAndInlineBackgroundImages, iterateOverRulesAndInlineFontFace].map(function (func) {
            return func(cssRules, options)
                .then(function (result) {
                    hasChanges = hasChanges || result.hasChanges;
                    errors = errors.concat(result.errors);
                });
        })).then(function () {
            return {
                hasChanges: hasChanges,
                errors: errors
            };
        });
    };

    return module;
}(window.rasterizeHTMLInline || {}, window, window.CSSOM || {}, ayepromise));

window.rasterizeHTMLInline = (function (module, window, ayepromise, url) {
    "use strict";

    module.util = {};

    module.util.getDocumentBaseUrl = function (doc) {
        if (doc.baseURI !== 'about:blank') {
            return doc.baseURI;
        }

        return null;
    };

    module.util.clone = function (object) {
        var theClone = {},
            i;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
               theClone[i] = object[i];
            }
        }
        return theClone;
    };

    module.util.cloneArray = function (nodeList) {
        return Array.prototype.slice.apply(nodeList, [0]);
    };

    module.util.joinUrl = function (baseUrl, relUrl) {
        return url.resolve(baseUrl, relUrl);
    };

    module.util.isDataUri = function (url) {
        return (/^data:/).test(url);
    };

    module.util.all = function (promises) {
        var defer = ayepromise.defer(),
            pendingPromiseCount = promises.length,
            resolvedValues = [];

        if (promises.length === 0) {
            defer.resolve([]);
            return defer.promise;
        }

        promises.forEach(function (promise, idx) {
            promise.then(function (value) {
                pendingPromiseCount -= 1;
                resolvedValues[idx] = value;

                if (pendingPromiseCount === 0) {
                    defer.resolve(resolvedValues);
                }
            }, function (e) {
                defer.reject(e);
            });
        });
        return defer.promise;
    };

    module.util.collectAndReportErrors = function (promises) {
        var errors = [];

        return module.util.all(promises.map(function (promise) {
            return promise.fail(function (e) {
                errors.push(e);
            });
        })).then(function () {
            return errors;
        });
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

    module.util.ajax = function (url, options) {
        var ajaxRequest = new window.XMLHttpRequest(),
            defer = ayepromise.defer(),
            joinedUrl = module.util.joinUrl(options.baseUrl, url),
            augmentedUrl;

        var doReject = function () {
            defer.reject({
                msg: 'Unable to load url',
                url: joinedUrl
            });
        };

        augmentedUrl = getUncachableURL(joinedUrl, options.cache);

        ajaxRequest.addEventListener("load", function () {
            if (ajaxRequest.status === 200 || ajaxRequest.status === 0) {
                defer.resolve(ajaxRequest.response);
            } else {
                doReject();
            }
        }, false);

        ajaxRequest.addEventListener("error", doReject, false);

        try {
            ajaxRequest.open('GET', augmentedUrl, true);
            ajaxRequest.overrideMimeType(options.mimeType);
            ajaxRequest.send(null);
        } catch (e) {
            doReject();
        }

        return defer.promise;
    };

    module.util.binaryAjax = function (url, options) {
        var ajaxOptions = module.util.clone(options);

        ajaxOptions.mimeType = 'text/plain; charset=x-user-defined';

        return module.util.ajax(url, ajaxOptions)
            .then(function (content) {
                var binaryContent = "";

                for (var i = 0; i < content.length; i++) {
                    binaryContent += String.fromCharCode(content.charCodeAt(i) & 0xFF);
                }

                return binaryContent;
            });
    };

    var detectMimeType = function (content) {
        var startsWith = function (string, substring) {
            return string.substring(0, substring.length) === substring;
        };

        if (startsWith(content, '<?xml') || startsWith(content, '<svg')) {
            return 'image/svg+xml';
        }
        return 'image/png';
    };

    module.util.getDataURIForImageURL = function (url, options) {
        return module.util.binaryAjax(url, options)
            .then(function (content) {
                var base64Content = btoa(content),
                    mimeType = detectMimeType(content);

                return 'data:' + mimeType + ';base64,' + base64Content;
            });
    };

    var uniqueIdList = [];

    var constantUniqueIdFor = function (element) {
        // HACK, using a list results in O(n), but how do we hash a function?
        if (uniqueIdList.indexOf(element) < 0) {
            uniqueIdList.push(element);
        }
        return uniqueIdList.indexOf(element);
    };

    module.util.memoize = function (func, hasher, memo) {
        if (typeof memo !== "object") {
            throw new Error("cacheBucket is not an object");
        }

        return function () {
            var args = Array.prototype.slice.call(arguments);

            var argumentHash = hasher(args),
                funcHash = constantUniqueIdFor(func),
                retValue;

            if (memo[funcHash] && memo[funcHash][argumentHash]) {
                return memo[funcHash][argumentHash];
            } else {
                retValue = func.apply(null, args);

                memo[funcHash] = memo[funcHash] || {};
                memo[funcHash][argumentHash] = retValue;

                return retValue;
            }
        };
    };

    return module;
}(window.rasterizeHTMLInline || {}, window, ayepromise, url));

window.rasterizeHTML = (function (rasterizeHTMLInline, xmlserializer, ayepromise, theWindow) {
    "use strict";

    var module = {};

    /* Utilities */

    var uniqueIdList = [];

    module.util = {};

    module.util.getConstantUniqueIdFor = function (element) {
        // HACK, using a list results in O(n), but how do we hash e.g. a DOM node?
        if (uniqueIdList.indexOf(element) < 0) {
            uniqueIdList.push(element);
        }
        return uniqueIdList.indexOf(element);
    };

    var cloneObject = function(object) {
        var newObject = {},
            i;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                newObject[i] = object[i];
            }
        }
        return newObject;
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

    module.util.parseOptionalParameters = function (args) { // args: canvas, options, callback
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
                    parameters.options = cloneObject(args[1]);
                    parameters.callback = args[2] || null;
                }

            } else {
                parameters.options = cloneObject(args[0]);
                parameters.callback = args[1] || null;
            }
        }

        return parameters;
    };

    var baseUrlRespectingXMLHttpRequestProxy = function (XHRObject, baseUrl) {
        return function () {
            var xhr = new XHRObject(),
                open = xhr.open;

            xhr.open = function () {
                var args = Array.prototype.slice.call(arguments),
                    method = args.shift(),
                    url = args.shift(),
                    // TODO remove reference to rasterizeHTMLInline.util
                    joinedUrl = rasterizeHTMLInline.util.joinUrl(baseUrl, url);

                return open.apply(this, [method, joinedUrl].concat(args));
            };

            return xhr;
        };
    };

    module.util.executeJavascript = function (doc, baseUrl, timeout) {
        var iframe = createHiddenElement(theWindow.document, "iframe"),
            html = doc.documentElement.outerHTML,
            iframeErrorsMessages = [],
            defer = ayepromise.defer(),
            doResolve = function () {
                var doc = iframe.contentDocument;
                theWindow.document.getElementsByTagName("body")[0].removeChild(iframe);
                defer.resolve({
                    document: doc,
                    errors: iframeErrorsMessages
                });
            };

        if (timeout > 0) {
            iframe.onload = function () {
                setTimeout(doResolve, timeout);
            };
        } else {
            iframe.onload = doResolve;
        }

        iframe.contentDocument.open();
        iframe.contentWindow.XMLHttpRequest = baseUrlRespectingXMLHttpRequestProxy(iframe.contentWindow.XMLHttpRequest, baseUrl);
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

    module.util.calculateDocumentContentSize = function (doc, viewportWidth, viewportHeight) {
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

    module.util.parseHTML = function (html) {
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

    module.util.loadDocument = function (url, options) {
        var ajaxRequest = new window.XMLHttpRequest(),
            // TODO remove reference to rasterizeHTMLInline.util
            joinedUrl = rasterizeHTMLInline.util.joinUrl(options.baseUrl, url),
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

    /* Rendering */

    var supportsBlobBuilding = function () {
        // Newer Safari (under PhantomJS) seems to support blob building, but loading an image with the blob fails
        if (theWindow.navigator.userAgent.indexOf("WebKit") >= 0 && theWindow.navigator.userAgent.indexOf("Chrome") < 0) {
            return false;
        }
        if (theWindow.BlobBuilder || theWindow.MozBlobBuilder || theWindow.WebKitBlobBuilder) {
            // Deprecated interface
            return true;
        } else {
            if (theWindow.Blob) {
                // Available as constructor only in newer builds for all Browsers
                try {
                    new theWindow.Blob(['<b></b>'], { "type" : "text\/xml" });
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
           BLOBBUILDER = theWindow.BlobBuilder || theWindow.MozBlobBuilder || theWindow.WebKitBlobBuilder,
           svg;
       if (BLOBBUILDER) {
           svg = new BLOBBUILDER();
           svg.append(data);
           return svg.getBlob(imageType);
       } else {
           return new theWindow.Blob([data], {"type": imageType});
       }
    };

    var buildImageUrl = function (svg) {
        var DOMURL = theWindow.URL || theWindow.webkitURL || window;
        if (supportsBlobBuilding()) {
            return DOMURL.createObjectURL(getBlob(svg));
        } else {
            return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        }
    };

    var cleanUpUrl = function (url) {
        var DOMURL = theWindow.URL || theWindow.webkitURL || window;
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
        var firefoxMatch = theWindow.navigator.userAgent.match(/Firefox\/(\d+).0/);
        return !firefoxMatch || !firefoxMatch[1] || parseInt(firefoxMatch[1], 10) < 17;
    };

    var workAroundBrowserBugForBackgroundImages = function (svg, canvas) {
        // Firefox < 17, Chrome & Safari will (sometimes) not show an inlined background-image until the svg is
        // connected to the DOM it seems.
        var uniqueId = module.util.getConstantUniqueIdFor(svg),
            doc = canvas ? canvas.ownerDocument : theWindow.document,
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
            Array.prototype.forEach.call(doc.getElementsByTagName("style"), function (style) {
                style.textContent = "span {}\n" + style.textContent;
            });
        }
    };

    var cleanUpAfterWorkAroundForBackgroundImages = function (svg, canvas) {
        var uniqueId = module.util.getConstantUniqueIdFor(svg),
            doc = canvas ? canvas.ownerDocument : theWindow.document,
            div = doc.getElementById(WORKAROUND_ID + uniqueId);
        if (div) {
            div.parentNode.removeChild(div);
        }
    };

    module.util.addClassNameRecursively = function (element, className) {
        element.className += ' ' + className;

        if (element.parentNode !== element.ownerDocument) {
            module.util.addClassNameRecursively(element.parentNode, className);
        }
    };

    var changeCssRule = function (rule, newRuleText) {
        var styleSheet = rule.parentStyleSheet,
            ruleIdx = Array.prototype.indexOf.call(styleSheet.cssRules, rule);

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
        return Array.prototype.reduce.call(cssRules, function (cssText, rule) {
            return cssText + rule.cssText;
        }, '');
    };

    var rewriteStyleContent = function (styleElement) {
        styleElement.textContent = cssRulesToText(styleElement.sheet.cssRules);
    };

    module.util.rewriteStyleRuleSelector = function (doc, oldSelector, newSelector) {
        // Assume that oldSelector is always prepended with a ':' or '.' for now, so no special handling needed
        var oldSelectorRegex = oldSelector + '(?=\\W|$)';

        Array.prototype.forEach.call(doc.querySelectorAll('style'), function (styleElement) {
            var matchingRules = Array.prototype.filter.call(styleElement.sheet.cssRules, function (rule) {
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

    module.util.fakeHover = function (doc, hoverSelector) {
        var elem = doc.querySelector(hoverSelector),
            fakeHoverClass = 'rasterizehtmlhover';
        if (! elem) {
            return;
        }

        module.util.addClassNameRecursively(elem, fakeHoverClass);
        module.util.rewriteStyleRuleSelector(doc, ':hover', '.' + fakeHoverClass);
    };

    module.util.fakeActive = function (doc, activeSelector) {
        var elem = doc.querySelector(activeSelector),
            fakeActiveClass = 'rasterizehtmlactive';
        if (! elem) {
            return;
        }

        module.util.addClassNameRecursively(elem, fakeActiveClass);
        module.util.rewriteStyleRuleSelector(doc, ':active', '.' + fakeActiveClass);
    };

    module.util.persistInputValues = function (doc) {
        var inputs = Array.prototype.slice.call(doc.querySelectorAll('input')),
            textareas = Array.prototype.slice.call(doc.querySelectorAll('textarea')),
            isCheckable = function (input) {
                return input.type === 'checkbox' || input.type === 'radio';
            };

        inputs.filter(isCheckable)
            .forEach(function (input) {
                if (input.checked) {
                    input.setAttribute('checked', '');
                } else {
                    input.removeAttribute('checked');
                }
            });

        inputs.filter(function (input) { return !isCheckable(input); })
            .forEach(function (input) {
                input.setAttribute('value', input.value);
            });

        textareas
            .forEach(function (textarea) {
                textarea.textContent = textarea.value;
            });
    };

    module.getSvgForDocument = function (doc, width, height) {
        var xhtml;

        workAroundWebkitBugIgnoringTheFirstRuleInCSS(doc);
        xhtml = xmlserializer.serializeToString(doc);

        return (
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                '<foreignObject width="100%" height="100%">' +
                    xhtml +
                '</foreignObject>' +
            '</svg>'
        );
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

        image = new theWindow.Image();
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
        image.src = url;

        return defer.promise;
    };

    module.drawImageOnCanvas = function (image, canvas) {
        try {
            canvas.getContext("2d").drawImage(image, 0, 0);
        } catch (e) {
            // Firefox throws a 'NS_ERROR_NOT_AVAILABLE' if the SVG is faulty
            return false;
        }

        return true;
    };

    module.drawDocumentImage = function (doc, canvas, options) {
        var viewportSize = getViewportSize(canvas, options);

        if (options.hover) {
            module.util.fakeHover(doc, options.hover);
        }
        if (options.active) {
            module.util.fakeActive(doc, options.active);
        }

        return module.util.calculateDocumentContentSize(doc, viewportSize.width, viewportSize.height)
            .then(function (size) {
                return module.getSvgForDocument(doc, size.width, size.height);
            })
            .then(function (svg) {
                return module.renderSvg(svg, canvas);
            });
    };

    /* "Public" API */

    var doDraw = function (doc, canvas, options) {
        var drawError = {message: "Error rendering page"};

        return module.drawDocumentImage(doc, canvas, options).then(function (image) {
            var successful;

            if (canvas) {
                successful = module.drawImageOnCanvas(image, canvas);

                if (!successful) {
                    throw drawError;
                }
            }

            return image;
        }, function () {
            throw drawError;
        });
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

    var drawDocument = function (doc, canvas, options) {
        var executeJsTimeout = options.executeJsTimeout || 0,
            inlineOptions;

        inlineOptions = rasterizeHTMLInline.util.clone(options);
        inlineOptions.inlineScripts = options.executeJs === true;

        return rasterizeHTMLInline.inlineReferences(doc, inlineOptions)
            .then(function (errors) {
                if (options.executeJs) {
                    return module.util.executeJavascript(doc, options.baseUrl, executeJsTimeout)
                        .then(function (result) {
                            var document = result.document;
                            module.util.persistInputValues(document);

                            return {
                                document: document,
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
     * rasterizeHTML.drawDocument( document [, canvas] [, options] [, callback] );
     */
    module.drawDocument = function () {
        var doc = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = module.util.parseOptionalParameters(optionalArguments);

        var promise = drawDocument(doc, params.canvas, params.options);

        // legacy API
        if (params.callback) {
            promise.then(function (result) {
                params.callback(result.image, result.errors);
            }, function (e) {
                params.callback(null, [{
                    resourceType: "document",
                    msg: e.message
                }]);
            });
        }

        return promise;
    };

    var drawHTML = function (html, canvas, options, callback) {
        var doc = module.util.parseHTML(html);

        return module.drawDocument(doc, canvas, options, callback);
    };

    /**
     * Draws a HTML string to the canvas.
     * rasterizeHTML.drawHTML( html [, canvas] [, options] [, callback] );
     */
    module.drawHTML = function () {
        var html = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = module.util.parseOptionalParameters(optionalArguments);

        return drawHTML(html, params.canvas, params.options, params.callback);
    };

    var drawURL = function (url, canvas, options, callback) {
        var promise = module.util.loadDocument(url, options)
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
     * rasterizeHTML.drawURL( url [, canvas] [, options] [, callback] );
     */
    module.drawURL = function () {
        var url = arguments[0],
            optionalArguments = Array.prototype.slice.call(arguments, 1),
            params = module.util.parseOptionalParameters(optionalArguments);

        return drawURL(url, params.canvas, params.options, params.callback);
    };

    return module;
}(window.rasterizeHTMLInline, window.xmlserializer, ayepromise, window));
