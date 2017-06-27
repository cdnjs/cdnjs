/*
* jquery.inputmask.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.26
*/
(function (factory) {if (typeof define === 'function' && define.amd) {define(["jquery"], factory);} else {factory(jQuery);}}/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*/

(function ($) {
    if ($.fn.inputmask === undefined) {

        //helper functions
        function isInputEventSupported(eventName) {
            var el = document.createElement('input'),
                evName = 'on' + eventName,
                isSupported = (evName in el);
            if (!isSupported) {
                el.setAttribute(evName, 'return;');
                isSupported = typeof el[evName] == 'function';
            }
            el = null;
            return isSupported;
        }

        function isInputTypeSupported(inputType) {
            var el = document.createElement('input');
            el.setAttribute("type", inputType);
            var isSupported = el.type !== "text";
            el = null;
            return isSupported;
        }

        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = opts.aliases[aliasStr];
            if (aliasDefinition) {
                if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
                $.extend(true, opts, aliasDefinition); //merge alias definition in the options
                $.extend(true, opts, options); //reapply extra given options
                return true;
            }
            return false;
        }

        function generateMaskSet(opts, multi) {
            var ms = undefined;

            function analyseMask(mask) {
                var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,
                    escaped = false;

                function maskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                    this.matches = [];
                    this.isGroup = isGroup || false;
                    this.isOptional = isOptional || false;
                    this.isQuantifier = isQuantifier || false;
                    this.isAlternator = isAlternator || false;
                    this.quantifier = { min: 1, max: 1 };
                };

                //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
                function insertTestDefinition(mtoken, element, position) {
                    var maskdef = opts.definitions[element];
                    var newBlockMarker = mtoken.matches.length == 0;
                    position = position != undefined ? position : mtoken.matches.length;
                    if (maskdef && !escaped) {
                        var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
                        for (var i = 1; i < maskdef.cardinality; i++) {
                            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                            mtoken.matches.splice(position++, 0, { fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: mtoken.isOptional, newBlockMarker: newBlockMarker, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element, placeholder: maskdef["placeholder"], mask: element });
                        }
                        mtoken.matches.splice(position++, 0, { fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: mtoken.isOptional, newBlockMarker: newBlockMarker, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element, placeholder: maskdef["placeholder"], mask: element });
                    } else {
                        mtoken.matches.splice(position++, 0, { fn: null, cardinality: 0, optionality: mtoken.isOptional, newBlockMarker: newBlockMarker, casing: null, def: element, placeholder: undefined, mask: element });
                        escaped = false;
                    }
                }

                var currentToken = new maskToken(),
                    match,
                    m,
                    openenings = [],
                    maskTokens = [],
                    openingToken,
                    currentOpeningToken,
                    alternator,
                    lastMatch;

                while (match = tokenizer.exec(mask)) {
                    m = match[0];
                    switch (m.charAt(0)) {
                        case opts.optionalmarker.end:
                            // optional closing
                        case opts.groupmarker.end:
                            // Group closing
                            openingToken = openenings.pop();
                            if (openenings.length > 0) {
                                currentOpeningToken = openenings[openenings.length - 1];
                                currentOpeningToken["matches"].push(openingToken);
                                if (currentOpeningToken.isAlternator) {  //handle alternator (a) | (b) case
                                    alternator = openenings.pop();
                                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                                        alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                                    }
                                    if (openenings.length > 0) {
                                        currentOpeningToken = openenings[openenings.length - 1];
                                        currentOpeningToken["matches"].push(alternator);
                                    } else {
                                        currentToken.matches.push(alternator);
                                    }
                                }
                            } else {
                                currentToken.matches.push(openingToken);
                            }
                            break;
                        case opts.optionalmarker.start:
                            // optional opening
                            openenings.push(new maskToken(false, true));
                            break;
                        case opts.groupmarker.start:
                            // Group opening
                            openenings.push(new maskToken(true));
                            break;
                        case opts.quantifiermarker.start:
                            //Quantifier
                            var quantifier = new maskToken(false, false, true);

                            m = m.replace(/[{}]/g, "");
                            var mq = m.split(","),
                                mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                                mq1 = mq.length == 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
                            if (mq1 == "*" || mq1 == "+") {
                                mq0 = mq1 == "*" ? 0 : 1;
                            }
                            quantifier.quantifier = { min: mq0, max: mq1 };
                            if (openenings.length > 0) {
                                var matches = openenings[openenings.length - 1]["matches"];
                                match = matches.pop();
                                if (!match["isGroup"]) {
                                    var groupToken = new maskToken(true);
                                    groupToken.matches.push(match);
                                    match = groupToken;
                                }
                                matches.push(match);
                                matches.push(quantifier);
                            } else {
                                match = currentToken.matches.pop();
                                if (!match["isGroup"]) {
                                    var groupToken = new maskToken(true);
                                    groupToken.matches.push(match);
                                    match = groupToken;
                                }
                                currentToken.matches.push(match);
                                currentToken.matches.push(quantifier);
                            }
                            break;
                        case opts.escapeChar:
                            escaped = true;
                            break;
                        case opts.alternatormarker:
                            if (openenings.length > 0) {
                                currentOpeningToken = openenings[openenings.length - 1];
                                lastMatch = currentOpeningToken.matches.pop();
                            } else {
                                lastMatch = currentToken.matches.pop();
                            }
                            if (lastMatch.isAlternator) {
                                openenings.push(lastMatch);
                            } else {
                                alternator = new maskToken(false, false, false, true);
                                alternator.matches.push(lastMatch);
                                openenings.push(alternator);
                            }
                            break;
                        default:
                            if (openenings.length > 0) {
                                currentOpeningToken = openenings[openenings.length - 1];
                                if (currentOpeningToken.matches.length > 0) {
                                    lastMatch = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                                    if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
                                        lastMatch.isGroup = false;
                                        insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
                                        insertTestDefinition(lastMatch, opts.groupmarker.end);
                                    }
                                }
                                insertTestDefinition(currentOpeningToken, m);
                                if (currentOpeningToken.isAlternator) {  //handle alternator a | b case
                                    alternator = openenings.pop();
                                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                                        alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                                    }
                                    if (openenings.length > 0) {
                                        currentOpeningToken = openenings[openenings.length - 1];
                                        currentOpeningToken["matches"].push(alternator);
                                    } else {
                                        currentToken.matches.push(alternator);
                                    }
                                }
                            } else {
                                if (currentToken.matches.length > 0) {
                                    lastMatch = currentToken.matches[currentToken.matches.length - 1];
                                    if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
                                        lastMatch.isGroup = false;
                                        insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
                                        insertTestDefinition(lastMatch, opts.groupmarker.end);
                                    }
                                }
                                insertTestDefinition(currentToken, m);
                            }
                    }
                }

                if (currentToken.matches.length > 0) {
                    lastMatch = currentToken.matches[currentToken.matches.length - 1];
                    if (lastMatch["isGroup"]) { //this is not a group but a normal mask => convert
                        lastMatch.isGroup = false;
                        insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
                        insertTestDefinition(lastMatch, opts.groupmarker.end);
                    }
                    maskTokens.push(currentToken);
                }

                //console.log(JSON.stringify(maskTokens));
                return maskTokens;
            }

            function generateMask(mask, metadata) {
                if (opts.numericInput && opts.multi !== true) { //TODO FIX FOR DYNAMIC MASKS WITH QUANTIFIERS
                    mask = mask.split('').reverse();
                    for (var ndx = 0; ndx < mask.length; ndx++) {
                        if (mask[ndx] == opts.optionalmarker.start)
                            mask[ndx] = opts.optionalmarker.end;
                        else if (mask[ndx] == opts.optionalmarker.end)
                            mask[ndx] = opts.optionalmarker.start;
                        else if (mask[ndx] == opts.groupmarker.start)
                            mask[ndx] = opts.groupmarker.end;
                        else if (mask[ndx] == opts.groupmarker.end)
                            mask[ndx] = opts.groupmarker.start;
                    }
                    mask = mask.join('');
                }
                if (mask == undefined || mask == "")
                    return undefined;
                else {
                    if (mask.length == 1 && opts.greedy == false && opts.repeat != 0) {
                        opts.placeholder = "";
                    } //hide placeholder with single non-greedy mask
                    if (opts.repeat > 0 || opts.repeat == "*" || opts.repeat == "+") {
                        var repeatStart = opts.repeat == "*" ? 0 : (opts.repeat == "+" ? 1 : opts.repeat);
                        mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
                    }
                    if ($.inputmask.masksCache[mask] == undefined) {
                        $.inputmask.masksCache[mask] = {
                            "mask": mask,
                            "maskToken": analyseMask(mask),
                            "validPositions": {},
                            "_buffer": undefined,
                            "buffer": undefined,
                            "tests": {},
                            "metadata": metadata
                        };
                    }

                    return $.extend(true, {}, $.inputmask.masksCache[mask]);
                }
            }

            if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
                opts.mask = opts.mask.call(this, opts);
            }
            if ($.isArray(opts.mask)) {
                if (multi) {  //remove me
                    ms = [];
                    $.each(opts.mask, function (ndx, msk) {
                        if (msk["mask"] != undefined && !$.isFunction(msk["mask"])) {
                            ms.push(generateMask(msk["mask"].toString(), msk));
                        } else {
                            ms.push(generateMask(msk.toString(), msk));
                        }
                    });
                } else {
                    opts.keepStatic = opts.keepStatic == undefined ? true : opts.keepStatic; //enable by default when passing multiple masks when the option is not explicitly specified
                    var altMask = "(";
                    $.each(opts.mask, function (ndx, msk) {
                        if (altMask.length > 1)
                            altMask += ")|(";
                        if (msk["mask"] != undefined && !$.isFunction(msk["mask"])) {
                            altMask += msk["mask"].toString();
                        } else {
                            altMask += msk.toString();
                        }
                    });
                    altMask += ")";
                    ms = generateMask(altMask, opts.mask);
                }
            } else {
                if (opts.mask) {
                    if (opts.mask["mask"] != undefined && !$.isFunction(opts.mask["mask"])) {
                        ms = generateMask(opts.mask["mask"].toString(), opts.mask);
                    } else {
                        ms = generateMask(opts.mask.toString(), opts.mask);
                    }
                }
            }
            return ms;
        }

        var msie1x = typeof ScriptEngineMajorVersion === "function"
                ? ScriptEngineMajorVersion() //IE11 detection
                : new Function("/*@cc_on return @_jscript_version; @*/")() >= 10, //conditional compilation from mickeysoft trick
            ua = navigator.userAgent,
            iphone = ua.match(new RegExp("iphone", "i")) !== null,
            android = ua.match(new RegExp("android.*safari.*", "i")) !== null,
            androidchrome = ua.match(new RegExp("android.*chrome.*", "i")) !== null,
            androidfirefox = ua.match(new RegExp("android.*firefox.*", "i")) !== null,
            kindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua),
            PasteEventType = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange";

        //if (androidchrome) {
        //    var browser = navigator.userAgent.match(new RegExp("chrome.*", "i")),
        //        version = parseInt(new RegExp(/[0-9]+/).exec(browser));
        //    androidchrome32 = (version == 32);
        //}

        //masking scope
        //actionObj definition see below
        function maskScope(actionObj, maskset, opts) {
            var isRTL = false,
                valueOnFocus,
                $el,
                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipInputEvent = false, //skip when triggered from within inputmask
                ignorable = false,
                maxLength;

            //maskset helperfunctions


            function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
                minimalPos = minimalPos || 0;
                var maskTemplate = [], ndxIntlzr, pos = 0, test, testPos;
                do {
                    if (baseOnInput === true && getMaskSet()['validPositions'][pos]) {
                        var validPos = getMaskSet()['validPositions'][pos];
                        test = validPos["match"];
                        ndxIntlzr = validPos["locator"].slice();
                        maskTemplate.push(includeInput === true ? validPos["input"] : getPlaceholder(pos, test));
                    } else {
                        if (minimalPos > pos) {
                            var testPositions = getTests(pos, ndxIntlzr, pos - 1);
                            testPos = testPositions[0];
                        } else {
                            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                        }
                        test = testPos["match"];
                        ndxIntlzr = testPos["locator"].slice();
                        maskTemplate.push(getPlaceholder(pos, test));
                    }
                    pos++;
                } while ((maxLength == undefined || pos - 1 < maxLength) && test["fn"] != null || (test["fn"] == null && test["def"] != "") || minimalPos >= pos);
                maskTemplate.pop(); //drop the last one which is empty
                return maskTemplate;
            }
            function getMaskSet() {
                return maskset;
            }
            function resetMaskSet(soft) {
                var maskset = getMaskSet();
                maskset["buffer"] = undefined;
                maskset["tests"] = {};
                if (soft !== true) {
                    maskset["_buffer"] = undefined;
                    maskset["validPositions"] = {};
                    maskset["p"] = 0;
                }
            }
            function getLastValidPosition(closestTo) {
                var maskset = getMaskSet(), lastValidPosition = -1, valids = maskset["validPositions"];
                if (closestTo == undefined) closestTo = -1;
                var before = lastValidPosition, after = lastValidPosition;
                for (var posNdx in valids) {
                    var psNdx = parseInt(posNdx);
                    if (closestTo == -1 || valids[psNdx]["match"].fn != null) {
                        if (psNdx < closestTo) before = psNdx;
                        if (psNdx >= closestTo) after = psNdx;
                    }
                }
                lastValidPosition = (closestTo - before) > 1 || after < closestTo ? before : after;
                return lastValidPosition;
            }
            function setValidPosition(pos, validTest, fromSetValid) {
                if (opts.insertMode && getMaskSet()["validPositions"][pos] != undefined && fromSetValid == undefined) {
                    //reposition & revalidate others
                    var positionsClone = $.extend(true, {}, getMaskSet()["validPositions"]), lvp = getLastValidPosition(), i;
                    for (i = pos; i <= lvp; i++) { //clear selection
                        delete getMaskSet()["validPositions"][i];
                    }
                    getMaskSet()["validPositions"][pos] = validTest;
                    var valid = true;
                    for (i = pos; i <= lvp ; i++) {
                        var t = positionsClone[i];
                        if (t != undefined) {
                            var j = t["match"].fn == null ? i + 1 : seekNext(i);
                            if (positionCanMatchDefinition(j, t["match"].def)) {
                                valid = valid && isValid(j, t["input"], true, true) !== false;
                            } else valid = false;
                        }
                        if (!valid) break;
                    }

                    if (!valid) {
                        getMaskSet()["validPositions"] = $.extend(true, {}, positionsClone);
                        return false;
                    }
                } else
                    getMaskSet()["validPositions"][pos] = validTest;

                return true;
            }
            function stripValidPositions(start, end) {
                var i, startPos = start;
                if (getMaskSet()["validPositions"][start] != undefined && getMaskSet()["validPositions"][start].input == opts.radixPoint) {
                    end++;
                    startPos++;
                }
                for (i = startPos; i < end; i++) { //clear selection
                    if (getMaskSet()["validPositions"][i] != undefined &&
                        (getMaskSet()["validPositions"][i].input != opts.radixPoint || i == getLastValidPosition()))
                        delete getMaskSet()["validPositions"][i];
                }

                for (i = end ; i <= getLastValidPosition() ;) {
                    var t = getMaskSet()["validPositions"][i];
                    var s = getMaskSet()["validPositions"][startPos];
                    if (t != undefined && s == undefined) {
                        if (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t["input"], true) !== false) {
                            delete getMaskSet()["validPositions"][i];
                            i++;
                        }
                        startPos++;
                    } else i++;
                }
                //remove radixpoint if needed
                var lvp = getLastValidPosition();
                if (start <= lvp && getMaskSet()["validPositions"][lvp] != undefined && (getMaskSet()["validPositions"][lvp].input == opts.radixPoint))
                    delete getMaskSet()["validPositions"][lvp];

                resetMaskSet(true);
            }
            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                var testPositions = getTests(pos, ndxIntlzr, tstPs),
                    testPos,
                    lvp = getLastValidPosition(),
                    lvTest = getMaskSet()["validPositions"][lvp] || getTests(0)[0],
                    lvTestAltArr = (lvTest.alternation != undefined) ? lvTest["locator"][lvTest.alternation].split(",") : [];
                for (var ndx = 0; ndx < testPositions.length; ndx++) {
                    testPos = testPositions[ndx];

                    if (opts.greedy ||
                        ((testPos["match"] && (testPos["match"].optionality === false || testPos["match"].newBlockMarker === false) && testPos["match"].optionalQuantifier !== true) &&
                        (lvTest.alternation == undefined || (testPos["locator"][lvTest.alternation] != undefined && $.inArray(testPos["locator"][lvTest.alternation].toString(), lvTestAltArr) == -1)))) {
                        break;
                    }
                }

                return testPos;
            }
            function getTest(pos) {
                if (getMaskSet()['validPositions'][pos]) {
                    return getMaskSet()['validPositions'][pos]["match"];
                }
                return getTests(pos)[0]["match"];
            }
            function positionCanMatchDefinition(pos, def) {
                var valid = false, tests = getTests(pos);
                for (var tndx = 0; tndx < tests.length; tndx++) {
                    if (tests[tndx]["match"] && tests[tndx]["match"].def == def) {
                        valid = true;
                        break;
                    }
                }
                return valid;
            };
            function getTests(pos, ndxIntlzr, tstPs) {
                var maskTokens = getMaskSet()["maskToken"], testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [0], matches = [], insertStop = false;
                function ResolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitilizer contains a set of indexes to speedup searches in the mtokens
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        if (testPos > 10000) {
                            alert("jquery.inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet()["mask"]);
                            return true;
                        }
                        if (testPos == pos && match.matches == undefined) {
                            matches.push({ "match": match, "locator": loopNdx.reverse() });
                            return true;
                        } else if (match.matches != undefined) {
                            if (match.isGroup && quantifierRecurse !== true) { //when a group pass along to the quantifier
                                match = handleMatch(maskToken.matches[tndx + 1], loopNdx);
                                if (match) return true;
                            } else if (match.isOptional) {
                                var optionalToken = match;
                                match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                                if (match) {
                                    var latestMatch = matches[matches.length - 1]["match"];
                                    var isFirstMatch = $.inArray(latestMatch, optionalToken.matches) == 0;
                                    if (isFirstMatch) {
                                        insertStop = true; //insert a stop for non greedy
                                    }
                                    testPos = pos; //match the position after the group
                                }
                            } else if (match.isAlternator) {
                                var alternateToken = match, malternateMatches = [], maltMatches,
                                    currentMatches = matches.slice(), loopNdxCnt = loopNdx.length;
                                var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                                if (altIndex == -1 || typeof altIndex == "string") {
                                    var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr;
                                    if (typeof altIndex == "string") altIndexArr = altIndex.split(",");
                                    for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                        matches = [];
                                        match = handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match;
                                        maltMatches = matches.slice();
                                        testPos = currentPos;
                                        matches = [];
                                        //cloneback
                                        for (var i = 0; i < ndxInitializerClone.length; i++) {
                                            ndxInitializer[i] = ndxInitializerClone[i];
                                        }
                                        //fuzzy merge matches
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1];
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                //verify equality
                                                if (altMatch.match.mask == altMatch2.match.mask && (typeof altIndex != "string" || $.inArray(altMatch.locator[loopNdxCnt].toString(), altIndexArr) != -1)) {
                                                    maltMatches.splice(ndx1, 1);
                                                    altMatch2.locator[loopNdxCnt] = altMatch2.locator[loopNdxCnt] + "," + altMatch.locator[loopNdxCnt];
                                                    altMatch2.alternation = loopNdxCnt; //we pass the alternation index => used in determineLastRequiredPosition
                                                    break;
                                                }
                                            }
                                        }
                                        malternateMatches = malternateMatches.concat(maltMatches);
                                    }

                                    if (typeof altIndex == "string") { //filter matches
                                        malternateMatches = $.map(malternateMatches, function (lmnt, ndx) {
                                            if (isFinite(ndx)) {
                                                var altLocArr = lmnt.locator[loopNdxCnt].toString().split(",");
                                                var mamatch;
                                                lmnt.locator[loopNdxCnt] = undefined;
                                                lmnt.alternation = undefined;
                                                for (var alndx = 0; alndx < altLocArr.length; alndx++) {
                                                    mamatch = $.inArray(altLocArr[alndx], altIndexArr) != -1;
                                                    if (mamatch) { //rebuild the locator with valid entries
                                                        if (lmnt.locator[loopNdxCnt] != undefined) {
                                                            lmnt.locator[loopNdxCnt] += ",";
                                                            lmnt.alternation = loopNdxCnt; //only define alternation when there is more then 1 possibility
                                                            lmnt.locator[loopNdxCnt] += altLocArr[alndx];
                                                        } else
                                                            lmnt.locator[loopNdxCnt] = parseInt(altLocArr[alndx]);
                                                    }
                                                }
                                                if (lmnt.locator[loopNdxCnt] != undefined) return lmnt;
                                            }
                                        });
                                    }

                                    matches = currentMatches.concat(malternateMatches);
                                    //console.log("alternates " + pos + " -> " + JSON.stringify(matches));
                                    insertStop = true; //insert a stopelemnt when there is an alternate
                                } else {
                                    match = handleMatch(alternateToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                                }
                                if (match) return true;
                            } else if (match.isQuantifier && quantifierRecurse !== true) {
                                var qt = match;
                                opts.greedy = opts.greedy && isFinite(qt.quantifier.max); //greedy must be off when * or + is used (always!!)
                                for (var qndx = (ndxInitializer.length > 0 && quantifierRecurse !== true) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                                    var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                    match = handleMatch(tokenGroup, [qndx].concat(loopNdx), true);
                                    if (match) {
                                        //get latest match
                                        var latestMatch = matches[matches.length - 1]["match"];
                                        latestMatch.optionalQuantifier = qndx > (qt.quantifier.min - 1);
                                        var isFirstMatch = $.inArray(latestMatch, tokenGroup.matches) == 0;

                                        if (isFirstMatch) { //search for next possible match
                                            if (qndx > (qt.quantifier.min - 1)) {
                                                insertStop = true;
                                                testPos = pos; //match the position after the group
                                                break; //stop quantifierloop
                                            } else return true;
                                        } else {
                                            return true;
                                        }
                                    }
                                }
                            } else {
                                match = ResolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                                if (match)
                                    return true;
                            }
                        } else testPos++;
                    }

                    for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0) ; tndx < maskToken.matches.length; tndx++) {
                        if (maskToken.matches[tndx]["isQuantifier"] !== true) {
                            var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                            if (match && testPos == pos) {
                                return match;
                            } else if (testPos > pos) {
                                break;
                            }
                        }
                    }
                }

                //if (disableCache !== true && getMaskSet()['tests'][pos] && !getMaskSet()['validPositions'][pos]) {
                //    return getMaskSet()['tests'][pos];
                //}
                if (ndxIntlzr == undefined) {
                    var previousPos = pos - 1, test;
                    while ((test = getMaskSet()['validPositions'][previousPos]) == undefined && previousPos > -1) {
                        previousPos--;
                    }
                    if (test != undefined && previousPos > -1) {
                        testPos = previousPos;
                        ndxInitializer = test["locator"].slice();
                    } else {
                        previousPos = pos - 1;
                        while ((test = getMaskSet()['tests'][previousPos]) == undefined && previousPos > -1) {
                            previousPos--;
                        }
                        if (test != undefined && previousPos > -1) {
                            testPos = previousPos;
                            ndxInitializer = test[0]["locator"].slice();
                        }
                    }
                }
                for (var mtndx = ndxInitializer.shift() ; mtndx < maskTokens.length; mtndx++) {
                    var match = ResolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
                    if ((match && testPos == pos) || testPos > pos) {
                        break;
                    }
                }
                if (matches.length == 0 || insertStop)
                    matches.push({ "match": { fn: null, cardinality: 0, optionality: true, casing: null, def: "" }, "locator": [] });

                getMaskSet()['tests'][pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
                //console.log(pos + " - " + JSON.stringify(matches));
                return getMaskSet()['tests'][pos];
            }
            function getBufferTemplate() {
                if (getMaskSet()['_buffer'] == undefined) {
                    //generate template
                    getMaskSet()["_buffer"] = getMaskTemplate(false, 1);
                }
                return getMaskSet()['_buffer'];
            }
            function getBuffer() {
                if (getMaskSet()['buffer'] == undefined) {
                    getMaskSet()['buffer'] = getMaskTemplate(true, getLastValidPosition(), true);
                }
                return getMaskSet()['buffer'];
            }
            function refreshFromBuffer(start, end) {
                var buffer = getBuffer().slice(); //work on clone
                if (start === true) {
                    resetMaskSet();
                    start = 0;
                    end = buffer.length;
                } else {
                    for (var i = start; i < end; i++) {
                        delete getMaskSet()["validPositions"][i];
                        delete getMaskSet()["tests"][i];
                    }
                }

                for (var i = start; i < end; i++) {
                    if (buffer[i] != opts.skipOptionalPartCharacter) {
                        isValid(i, buffer[i], true, true);
                    }
                }
            }
            function casing(elem, test) {
                switch (test.casing) {
                    case "upper":
                        elem = elem.toUpperCase();
                        break;
                    case "lower":
                        elem = elem.toLowerCase();
                        break;
                }

                return elem;
            }
            function isValid(pos, c, strict, fromSetValid) { //strict true ~ no correction or autofill
                strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions 

                function _isValid(position, c, strict, fromSetValid) {
                    var rslt = false;
                    $.each(getTests(position), function (ndx, tst) {
                        var test = tst["match"];
                        var loopend = c ? 1 : 0, chrs = '', buffer = getBuffer();
                        for (var i = test.cardinality; i > loopend; i--) {
                            chrs += getBufferElement(position - (i - 1));
                        }
                        if (c) {
                            chrs += c;
                        }

                        //return is false or a json object => { pos: ??, c: ??} or true
                        rslt = test.fn != null ?
                            test.fn.test(chrs, getMaskSet(), position, strict, opts)
                            : (c == test["def"] || c == opts.skipOptionalPartCharacter) && test["def"] != "" ? //non mask
                            { c: test["def"], pos: position }
                            : false;

                        if (rslt !== false) {
                            var elem = rslt.c != undefined ? rslt.c : c;
                            elem = (elem == opts.skipOptionalPartCharacter && test["fn"] === null) ? test["def"] : elem;

                            var validatedPos = position;
                            if (rslt["remove"] != undefined) { //remove position
                                stripValidPositions(rslt["remove"], rslt["remove"] + 1);
                            }

                            if (rslt["refreshFromBuffer"]) {
                                var refresh = rslt["refreshFromBuffer"];
                                strict = true;
                                refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"]);
                                if (rslt.pos == undefined && rslt.c == undefined) {
                                    rslt.pos = getLastValidPosition();
                                    return false;//breakout if refreshFromBuffer && nothing to insert
                                }
                                validatedPos = rslt.pos != undefined ? rslt.pos : position;
                                if (validatedPos != position) {
                                    rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
                                    return false;
                                }

                            } else if (rslt !== true && rslt.pos != undefined && rslt["pos"] != position) { //their is a position offset
                                validatedPos = rslt["pos"];
                                refreshFromBuffer(position, validatedPos);
                                if (validatedPos != position) {
                                    rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
                                    return false;
                                }
                            }

                            if (rslt != true && rslt.pos == undefined && rslt.c == undefined) {
                                return false; //breakout if nothing to insert
                            }

                            if (ndx > 0) {
                                resetMaskSet(true);
                            }

                            if (!setValidPosition(validatedPos, $.extend({}, tst, { "input": casing(elem, test) }), fromSetValid))
                                rslt = false;
                            return false; //break from $.each
                        }
                    });

                    return rslt;
                }
                function alternate(pos, c, strict, fromSetValid) {
                    if (opts.keepStatic) {
                        var validPsClone = $.extend(true, {}, getMaskSet()["validPositions"]),
                            lastAlt,
                            alternation;
                        //find last alternation
                        for (lastAlt = getLastValidPosition() ; lastAlt >= 0; lastAlt--) {
                            if (getMaskSet()["validPositions"][lastAlt] && getMaskSet()["validPositions"][lastAlt].alternation != undefined) {
                                alternation = getMaskSet()["validPositions"][lastAlt].alternation;
                                break;
                            }
                        }
                        if (alternation != undefined) {
                            //find first decision making position
                            for (var decisionPos in getMaskSet()["validPositions"]) {
                                if (parseInt(decisionPos) > parseInt(lastAlt) && getMaskSet()["validPositions"][decisionPos].alternation === undefined) {
                                    var altPos = getMaskSet()["validPositions"][decisionPos],
                                        decisionTaker = altPos.locator[alternation],
                                        altNdxs = getMaskSet()["validPositions"][lastAlt].locator[alternation].split(",");

                                    for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                                        if (decisionTaker < altNdxs[mndx]) {
                                            var possibilityPos, possibilities;
                                            for (var dp = decisionPos - 1; dp >= 0; dp--) {
                                                possibilityPos = getMaskSet()["validPositions"][dp];
                                                if (possibilityPos != undefined) {
                                                    possibilities = possibilityPos.locator[alternation]; //store to reset 
                                                    possibilityPos.locator[alternation] = altNdxs[mndx];
                                                    break;
                                                }
                                            }
                                            if (decisionTaker != possibilityPos.locator[alternation]) {
                                                var buffer = getBuffer().slice(); //work on clone
                                                for (var i = decisionPos; i < getLastValidPosition() + 1; i++) {
                                                    delete getMaskSet()["validPositions"][i];
                                                    delete getMaskSet()["tests"][i];
                                                }
                                                resetMaskSet(true); //clear getbuffer
                                                opts.keepStatic = !opts.keepStatic; //disable keepStatic on getMaskLength
                                                for (var i = decisionPos; i < buffer.length; i++) {
                                                    if (buffer[i] != opts.skipOptionalPartCharacter) {
                                                        isValid(getLastValidPosition() + 1, buffer[i], false, true);
                                                    }
                                                }
                                                possibilityPos.locator[alternation] = possibilities; //reset forceddecision ~ needed for proper delete
                                                var isValidRslt = getLastValidPosition() + 1 == pos && isValid(pos, c, strict, fromSetValid);
                                                opts.keepStatic = !opts.keepStatic; //enable keepStatic on getMaskLength
                                                if (!isValidRslt) {
                                                    resetMaskSet();
                                                    getMaskSet()["validPositions"] = $.extend(true, {}, validPsClone);
                                                } else
                                                    return isValidRslt;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    return false;
                }
                //Check for a nonmask before the pos
                var buffer = getBuffer();
                for (var pndx = pos - 1; pndx > -1; pndx--) {
                    if (getMaskSet()["validPositions"][pndx] && getMaskSet()["validPositions"][pndx]["match"].fn == null)
                        break;
                    else if (getMaskSet()["validPositions"][pndx] == undefined && (!isMask(pndx) || buffer[pndx] != getPlaceholder(pndx)) && getTests(pndx).length > 1) {
                        _isValid(pndx, buffer[pndx], true);
                    }
                }

                var maskPos = pos;
                if (maskPos >= getMaskLength()) { //try fuzzy alternator logic
                    if (fromSetValid) {
                        resetMaskSet(true);
                        if (maskPos >= getMaskLength())
                            return alternate(pos, c, strict, fromSetValid);
                    } else
                        return alternate(pos, c, strict, fromSetValid);
                }
                var result = _isValid(maskPos, c, strict, fromSetValid);
                if (!strict && result === false) {
                    var currentPosValid = getMaskSet()["validPositions"][maskPos];
                    if (currentPosValid && currentPosValid["match"].fn == null && (currentPosValid["match"].def == c || c == opts.skipOptionalPartCharacter)) {
                        result = { "caret": seekNext(maskPos) };
                    } else if ((opts.insertMode || getMaskSet()["validPositions"][seekNext(maskPos)] == undefined) && !isMask(maskPos)) { //does the input match on a further position?
                        for (var nPos = maskPos + 1, snPos = seekNext(maskPos) ; nPos <= snPos; nPos++) {
                            result = _isValid(nPos, c, strict, fromSetValid);
                            if (result !== false) {
                                maskPos = nPos;
                                break;
                            }
                        }
                    }
                }

                if (result === true) result = { "pos": maskPos };
                return result;
            }
            function isMask(pos) {
                var test = getTest(pos);
                return test.fn != null ? test.fn : false;
            }
            function getMaskLength() {
                var maskLength;
                maxLength = $el.prop('maxLength');
                if (maxLength == -1) maxLength = undefined; /* FF sets no defined max length to -1 */
                if (opts.greedy == false) {
                    var pos, lvp = getLastValidPosition(), testPos = getMaskSet()["validPositions"][lvp],
                        ndxIntlzr = testPos != undefined ? testPos["locator"].slice() : undefined;
                    for (pos = lvp + 1; testPos == undefined || (testPos["match"]["fn"] != null || (testPos["match"]["fn"] == null && testPos["match"]["def"] != "")) ; pos++) {
                        testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                        ndxIntlzr = testPos["locator"].slice();
                    }
                    maskLength = pos;
                } else
                    maskLength = getBuffer().length;

                return (maxLength == undefined || maskLength < maxLength) ? maskLength : maxLength;
            }
            function seekNext(pos) {
                var maskL = getMaskLength();
                if (pos >= maskL) return maskL;
                var position = pos;
                while (++position < maskL && !isMask(position) && (opts.nojumps !== true || opts.nojumpsThreshold > position)) {
                }
                return position;
            }
            function seekPrevious(pos) {
                var position = pos;
                if (position <= 0) return 0;

                while (--position > 0 && !isMask(position)) {
                };
                return position;
            }
            function getBufferElement(position) {
                return getMaskSet()["validPositions"][position] == undefined ? getPlaceholder(position) : getMaskSet()["validPositions"][position]["input"];
            }
            function writeBuffer(input, buffer, caretPos) {
                input._valueSet(buffer.join(''));
                if (caretPos != undefined) {
                    caret(input, caretPos);
                }
            }
            function getPlaceholder(pos, test) {
                test = test || getTest(pos);
                return ($.isFunction(test["placeholder"]) ? test["placeholder"].call(this, opts) : test["placeholder"]) || (test["fn"] == null ? test["def"] : opts.placeholder.charAt(pos % opts.placeholder.length));
            }
            function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
                var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');
                resetMaskSet();
                if (writeOut) input._valueSet(""); //initial clear
                $.each(inputValue, function (ndx, charCode) {
                    if (intelliCheck === true) {
                        var lvp = getLastValidPosition(),
                            pos = lvp == -1 ? ndx : seekNext(lvp);
                        if ($.inArray(charCode, getBufferTemplate().slice(lvp + 1, pos)) == -1) {
                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), false, strict, strict ? ndx : getMaskSet()["p"]);
                        }
                    } else {
                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), false, strict, strict ? ndx : getMaskSet()["p"]);
                        strict = strict || (ndx > 0 && ndx > getMaskSet()["p"]);
                    }
                });
                if (writeOut) {
                    var keypressResult = opts.onKeyPress.call(this, undefined, getBuffer(), 0, opts);
                    handleOnKeyResult(input, keypressResult);
                    writeBuffer(input, getBuffer(), $(input).is(":focus") ? seekNext(getLastValidPosition(0)) : undefined);
                }
            }
            function escapeRegex(str) {
                return $.inputmask.escapeRegex.call(this, str);
            }
            function truncateInput(inputValue) {
                return inputValue.replace(new RegExp("(" + escapeRegex(getBufferTemplate().join('')) + ")*$"), "");
            }
            function unmaskedvalue($input) {
                if ($input.data('_inputmask') && !$input.hasClass('hasDatepicker')) {
                    var umValue = [], vps = getMaskSet()["validPositions"];
                    for (var pndx in vps) {
                        if (vps[pndx]["match"] && vps[pndx]["match"].fn != null) {
                            umValue.push(vps[pndx]["input"]);
                        }
                    }
                    var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join('');
                    if ($.isFunction(opts.onUnMask)) {
                        unmaskedValue = opts.onUnMask.call($input, bufferValue, unmaskedValue, opts);
                    }
                    return unmaskedValue;
                } else {
                    return $input[0]._valueGet();
                }
            }
            function TranslatePosition(pos) {
                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
                    var bffrLght = getBuffer().length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            function caret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                if (typeof begin == 'number') {
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    end = (typeof end == 'number') ? end : begin;

                    //store caret for multi scope
                    var data = $(npt).data('_inputmask') || {};
                    data["caret"] = { "begin": begin, "end": end };
                    $(npt).data('_inputmask', data);

                    if (!$(npt).is(":visible")) {
                        return;
                    }

                    npt.scrollLeft = npt.scrollWidth;
                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                    if (npt.setSelectionRange) {
                        npt.selectionStart = begin;
                        npt.selectionEnd = end;

                    } else if (npt.createTextRange) {
                        range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                } else {
                    var data = $(npt).data('_inputmask');
                    if (!$(npt).is(":visible") && data && data["caret"] != undefined) {
                        begin = data["caret"]["begin"];
                        end = data["caret"]["end"];
                    } else if (npt.setSelectionRange) {
                        begin = npt.selectionStart;
                        end = npt.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    return { "begin": begin, "end": end };
                }
            }
            function determineLastRequiredPosition(returnDefinition) {
                var buffer = getBuffer(), bl = buffer.length,
                   pos, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet()["validPositions"][lvp],
                   ndxIntlzr = lvTest != undefined ? lvTest["locator"].slice() : undefined, testPos;
                for (pos = lvp + 1; pos < buffer.length; pos++) {
                    testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                    ndxIntlzr = testPos["locator"].slice();
                    positions[pos] = $.extend(true, {}, testPos);
                }

                var lvTestAltArr = lvTest && lvTest.alternation != undefined ? lvTest["locator"][lvTest.alternation].split(",") : [];
                for (pos = bl - 1; pos > lvp; pos--) {
                    testPos = positions[pos]["match"];
                    if ((testPos.optionality ||
                        testPos.optionalQuantifier ||
                        (lvTest && lvTest.alternation != undefined && positions[pos]["locator"][lvTest.alternation] != undefined && $.inArray(positions[pos]["locator"][lvTest.alternation].toString(), lvTestAltArr) != -1))
                        && buffer[pos] == getPlaceholder(pos, testPos)) {
                        bl--;
                    } else break;
                }
                return returnDefinition ? { "l": bl, "def": positions[bl] ? positions[bl]["match"] : undefined } : bl;
            }
            function clearOptionalTail(input) {
                var buffer = getBuffer(), tmpBuffer = buffer.slice();
                var rl = determineLastRequiredPosition(), lmib = tmpBuffer.length - 1;
                for (; lmib > rl; lmib--) {
                    if (isMask(lmib)) break;
                }
                tmpBuffer.splice(rl, lmib + 1 - rl);
                writeBuffer(input, tmpBuffer);
            }
            function isComplete(buffer) { //return true / false / undefined (repeat *)
                if ($.isFunction(opts.isComplete)) return opts.isComplete.call($el, buffer, opts);
                if (opts.repeat == "*") return undefined;
                var complete = false, lrp = determineLastRequiredPosition(true), aml = seekPrevious(lrp["l"]), lvp = getLastValidPosition();

                if (lvp == aml) {
                    if (lrp["def"] == undefined || lrp["def"].newBlockMarker || lrp["def"].optionalQuantifier) {
                        complete = true;
                        for (var i = 0; i <= aml; i++) {
                            var mask = isMask(i);
                            if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceholder(i))) || (!mask && buffer[i] != getPlaceholder(i))) {
                                complete = false;
                                break;
                            }
                        }
                    }
                }
                return complete;
            }
            function isSelection(begin, end) {
                return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
                (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
            }
            function installEventRuler(npt) {
                var events = $._data(npt).events;

                $.each(events, function (eventType, eventHandlers) {
                    $.each(eventHandlers, function (ndx, eventHandler) {
                        if (eventHandler.namespace == "inputmask") {
                            if (eventHandler.type != "setvalue") {
                                var handler = eventHandler.handler;
                                eventHandler.handler = function (e) {
                                    if (this.readOnly || this.disabled)
                                        e.preventDefault;
                                    else
                                        return handler.apply(this, arguments);
                                };
                            }
                        }
                    });
                });
            }
            function patchValueProperty(npt) {
                var valueGet;
                var valueSet;
                function PatchValhook(type) {
                    if ($.valHooks[type] == undefined || $.valHooks[type].inputmaskpatch != true) {
                        var valueGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) { return elem.value; };
                        var valueSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                            elem.value = value;
                            return elem;
                        };

                        $.valHooks[type] = {
                            get: function (elem) {
                                var $elem = $(elem);
                                if ($elem.data('_inputmask')) {
                                    if ($elem.data('_inputmask')['opts'].autoUnmask)
                                        return $elem.inputmask('unmaskedvalue');
                                    else {
                                        var result = valueGet(elem),
                                            inputData = $elem.data('_inputmask'),
                                            maskset = inputData['maskset'],
                                            bufferTemplate = maskset['_buffer'];
                                        bufferTemplate = bufferTemplate ? bufferTemplate.join('') : '';
                                        return result != bufferTemplate ? result : '';
                                    }
                                } else return valueGet(elem);
                            },
                            set: function (elem, value) {
                                var $elem = $(elem), inputData = $elem.data('_inputmask'), result;
                                if (inputData) {
                                    result = valueSet(elem, $.isFunction(inputData['opts'].onBeforeMask) ? inputData['opts'].onBeforeMask.call(el, value, inputData['opts']) : value);
                                    $elem.triggerHandler('setvalue.inputmask');
                                } else {
                                    result = valueSet(elem, value);
                                }
                                return result;
                            },
                            inputmaskpatch: true
                        };
                    }
                }
                function getter() {
                    var $self = $(this), inputData = $(this).data('_inputmask');
                    if (inputData) {
                        return inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : (valueGet.call(this) != getBufferTemplate().join('') ? valueGet.call(this) : '');
                    } else return valueGet.call(this);
                }
                function setter(value) {
                    var inputData = $(this).data('_inputmask');
                    if (inputData) {
                        valueSet.call(this, $.isFunction(inputData['opts'].onBeforeMask) ? inputData['opts'].onBeforeMask.call(el, value, inputData['opts']) : value);
                        $(this).triggerHandler('setvalue.inputmask');
                    } else {
                        valueSet.call(this, value);
                    }
                }
                function InstallNativeValueSetFallback(npt) {
                    $(npt).bind("mouseenter.inputmask", function (event) {
                        var $input = $(this), input = this, value = input._valueGet();
                        if (value != "" && value != getBuffer().join('')) {
                            $input.trigger("setvalue");
                        }
                    });
                    //!! the bound handlers are executed in the order they where bound
                    //reorder the events
                    var events = $._data(npt).events;
                    var handlers = events["mouseover"];
                    if (handlers) {
                        var ourHandler = handlers[handlers.length - 1];
                        for (var i = handlers.length - 1; i > 0; i--) {
                            handlers[i] = handlers[i - 1];
                        }
                        handlers[0] = ourHandler;
                    }
                }

                if (!npt._valueGet) {
                    //var valueProperty;
                    if (Object.getOwnPropertyDescriptor)
                        var valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                    if (valueProperty && valueProperty.configurable && false) { //experimental for chrome
                        npt._value = valueProperty.value;
                        valueGet = function () {
                            return this._value || "";
                        }
                        valueSet = function (value) {
                            this._value = value;
                            this.select();
                            this.setRangeText(value);
                            this.selectionStart = this.selectionEnd;
                        }

                        Object.defineProperty(npt, "value", {
                            get: getter,
                            set: setter
                        });
                    } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                        valueGet = npt.__lookupGetter__("value");
                        valueSet = npt.__lookupSetter__("value");

                        npt.__defineGetter__("value", getter);
                        npt.__defineSetter__("value", setter);
                    } else { //jquery.val 
                        valueGet = function () { return npt.value; }
                        valueSet = function (value) { npt.value = value; }
                        PatchValhook(npt.type);
                        InstallNativeValueSetFallback(npt);
                    }
                    npt._valueGet = function () {
                        return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                    };
                    npt._valueSet = function (value) {
                        valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                    };
                }
            }
            function handleRemove(input, k, pos) {
                function generalize() {
                    if (opts.keepStatic) {
                        var validInputs = [],
                          lastAlt;
                        //find last alternation
                        for (lastAlt = getLastValidPosition() ; lastAlt >= 0; lastAlt--) {
                            if (getMaskSet()["validPositions"][lastAlt]) {
                                if (getMaskSet()["validPositions"][lastAlt].alternation != undefined) {
                                    break;
                                }
                                validInputs.push(getMaskSet()["validPositions"][lastAlt].input);
                                delete getMaskSet()["validPositions"][lastAlt];
                            }
                        }
                        if (lastAlt > 0) {
                            while (validInputs.length > 0) {
                                getMaskSet()["p"] = seekNext(getLastValidPosition());
                                keypressEvent.call(input, undefined, true, validInputs.pop().charCodeAt(0), false, false, getMaskSet()["p"]);
                            }
                        }
                    }
                }

                if (opts.numericInput || isRTL) {
                    if (k == $.inputmask.keyCode.BACKSPACE)
                        k = $.inputmask.keyCode.DELETE;
                    else if (k == $.inputmask.keyCode.DELETE)
                        k = $.inputmask.keyCode.BACKSPACE;

                    if (isRTL) {
                        var pend = pos.end;
                        pos.end = pos.begin;
                        pos.begin = pend;
                    }
                }

                if (k == $.inputmask.keyCode.BACKSPACE && pos.end - pos.begin <= 1)
                    pos.begin = seekPrevious(pos.begin);
                else if (k == $.inputmask.keyCode.DELETE && pos.begin == pos.end)
                    pos.end++;

                stripValidPositions(pos.begin, pos.end);
                generalize(); //revert the alternation

                var firstMaskedPos = getLastValidPosition(pos.begin);
                if (firstMaskedPos < pos.begin) {
                    getMaskSet()["p"] = seekNext(firstMaskedPos);
                } else {
                    getMaskSet()["p"] = pos.begin;
                }
            }
            function handleOnKeyResult(input, keyResult, caretPos) {
                if (keyResult && keyResult["refreshFromBuffer"]) {
                    var refresh = keyResult["refreshFromBuffer"];
                    refreshFromBuffer(refresh === true ? refresh : refresh["start"], refresh["end"]);

                    resetMaskSet(true);
                    if (caretPos != undefined) {
                        writeBuffer(input, getBuffer());
                        caret(input, keyResult.caret || caretPos.begin, keyResult.caret || caretPos.end);
                    }
                }
            }
            function keydownEvent(e) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipKeyPressEvent = false;
                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);

                //backspace, delete, and escape get special treatment
                if (k == $.inputmask.keyCode.BACKSPACE || k == $.inputmask.keyCode.DELETE || (iphone && k == 127) || e.ctrlKey && k == 88) { //backspace/delete
                    e.preventDefault(); //stop default action but allow propagation
                    if (k == 88) valueOnFocus = getBuffer().join('');
                    handleRemove(input, k, pos);
                    writeBuffer(input, getBuffer(), getMaskSet()["p"]);
                    if (input._valueGet() == getBufferTemplate().join(''))
                        $input.trigger('cleared');

                    if (opts.showTooltip) { //update tooltip
                        $input.prop("title", getMaskSet()["mask"]);
                    }
                } else if (k == $.inputmask.keyCode.END || k == $.inputmask.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                    setTimeout(function () {
                        var caretPos = seekNext(getLastValidPosition());
                        if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                    }, 0);
                } else if ((k == $.inputmask.keyCode.HOME && !e.shiftKey) || k == $.inputmask.keyCode.PAGE_UP) { //Home or page_up
                    caret(input, 0, e.shiftKey ? pos.begin : 0);
                } else if (k == $.inputmask.keyCode.ESCAPE || (k == 90 && e.ctrlKey)) { //escape && undo
                    checkVal(input, true, false, valueOnFocus.split(''));
                    $input.click();
                } else if (k == $.inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                    opts.insertMode = !opts.insertMode;
                    caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                } else if (opts.insertMode == false && !e.shiftKey) {
                    if (k == $.inputmask.keyCode.RIGHT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin);
                        }, 0);
                    } else if (k == $.inputmask.keyCode.LEFT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                        }, 0);
                    }
                }

                var currentCaretPos = caret(input);
                var keydownResult = opts.onKeyDown.call(this, e, getBuffer(), currentCaretPos.begin, opts);
                handleOnKeyResult(input, keydownResult, currentCaretPos);
                ignorable = $.inArray(k, opts.ignorables) != -1;
            }
            function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                if (k == undefined && skipKeyPressEvent) return false;
                skipKeyPressEvent = true;

                var input = this, $input = $(input);

                e = e || window.event;
                var k = checkval ? k : (e.which || e.charCode || e.keyCode);

                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
                    return true;
                } else {
                    if (k) {
                        //special treat the decimal separator
                        if (checkval !== true && k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;
                        var pos = checkval ? { begin: ndx, end: ndx } : caret(input), forwardPosition, c = String.fromCharCode(k);

                        //should we clear a possible selection??
                        var isSlctn = isSelection(pos.begin, pos.end);
                        if (isSlctn) {
                            getMaskSet()["undoPositions"] = $.extend(true, {}, getMaskSet()["validPositions"]); //init undobuffer for recovery when not valid
                            handleRemove(input, $.inputmask.keyCode.DELETE, pos);
                            if (!opts.insertMode) { //preserve some space
                                opts.insertMode = !opts.insertMode;
                                setValidPosition(pos.begin, strict);
                                opts.insertMode = !opts.insertMode;
                            }
                            isSlctn = !opts.multi;
                        }

                        getMaskSet()["writeOutBuffer"] = true;
                        var p = isRTL && !isSlctn ? pos.end : pos.begin;
                        var valResult = isValid(p, c, strict);
                        if (valResult !== false) {
                            if (valResult !== true) {
                                p = valResult.pos != undefined ? valResult.pos : p; //set new position from isValid
                                c = valResult.c != undefined ? valResult.c : c; //set new char from isValid
                            }
                            resetMaskSet(true);
                            if (valResult.caret != undefined)
                                forwardPosition = valResult.caret;
                            else {
                                var vps = getMaskSet()["validPositions"];
                                if (!opts.keepStatic && (vps[p + 1] != undefined && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || vps[p].alternation != undefined))
                                    forwardPosition = p + 1;
                                else
                                    forwardPosition = seekNext(p);
                            }
                            getMaskSet()["p"] = forwardPosition; //needed for checkval
                        }

                        if (writeOut !== false) {
                            var self = this;
                            setTimeout(function () { opts.onKeyValidation.call(self, valResult, opts); }, 0);
                            if (getMaskSet()["writeOutBuffer"] && valResult !== false) {
                                var buffer = getBuffer();
                                writeBuffer(input, buffer, checkval ? undefined : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
                                if (checkval !== true) {
                                    setTimeout(function () { //timeout needed for IE
                                        if (isComplete(buffer) === true)
                                            $input.trigger("complete");
                                        skipInputEvent = true;
                                        $input.trigger("input");
                                    }, 0);
                                }
                            } else if (isSlctn) {
                                getMaskSet()["buffer"] = undefined;
                                getMaskSet()["validPositions"] = getMaskSet()["undoPositions"];
                            }
                        } else if (isSlctn) {
                            getMaskSet()["buffer"] = undefined;
                            getMaskSet()["validPositions"] = getMaskSet()["undoPositions"];
                        }


                        if (opts.showTooltip) { //update tooltip
                            $input.prop("title", getMaskSet()["mask"]);
                        }

                        if (e && checkval != true) {
                            e.preventDefault();

                            var currentCaretPos = caret(input);
                            var keypressResult = opts.onKeyPress.call(this, e, getBuffer(), currentCaretPos.begin, opts);
                            handleOnKeyResult(input, keypressResult, currentCaretPos);
                        }
                    }
                }
            }
            function keyupEvent(e) {
                var $input = $(this), input = this, k = e.keyCode, buffer = getBuffer();
                var currentCaretPos = caret(input);
                var keyupResult = opts.onKeyUp.call(this, e, buffer, currentCaretPos.begin, opts);
                handleOnKeyResult(input, keyupResult, currentCaretPos);
                if (k == $.inputmask.keyCode.TAB && opts.showMaskOnFocus) {
                    if ($input.hasClass('focus-inputmask') && input._valueGet().length == 0) {
                        resetMaskSet();
                        buffer = getBuffer();
                        writeBuffer(input, buffer);
                        caret(input, 0);
                        valueOnFocus = getBuffer().join('');
                    } else {
                        writeBuffer(input, buffer);
                        caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()));
                    }
                }
            }
            function pasteEvent(e) {
                if (skipInputEvent === true && e.type == "input") {
                    skipInputEvent = false;
                    return true;
                }

                var input = this, $input = $(input), inputValue = input._valueGet();
                //paste event for IE8 and lower I guess ;-)
                if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
                    return true;
                } else if (e.type == "paste") {
                    if (window.clipboardData && window.clipboardData.getData) { // IE
                        inputValue = window.clipboardData.getData('Text');
                    } else if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
                        inputValue = e.originalEvent.clipboardData.getData('text/plain');
                    }
                }

                var pasteValue = $.isFunction(opts.onBeforePaste) ? opts.onBeforePaste.call(input, inputValue, opts) : inputValue;
                checkVal(input, true, false, isRTL ? pasteValue.split('').reverse() : pasteValue.split(''), true);
                $input.click();
                if (isComplete(getBuffer()) === true)
                    $input.trigger("complete");

                return false;
            }
            function mobileInputEvent(e) {
                if (skipInputEvent === true && e.type == "input") {
                    skipInputEvent = false;
                    return true;
                }
                var input = this;

                //backspace in chrome32 only fires input event - detect & treat
                var caretPos = caret(input),
                    currentValue = input._valueGet();

                currentValue = currentValue.replace(new RegExp("(" + escapeRegex(getBufferTemplate().join('')) + ")*"), "");
                //correct caretposition for chrome
                if (caretPos.begin > currentValue.length) {
                    caret(input, currentValue.length);
                    caretPos = caret(input);
                }
                if ((getBuffer().length - currentValue.length) == 1 && currentValue.charAt(caretPos.begin) != getBuffer()[caretPos.begin]
                    && currentValue.charAt(caretPos.begin + 1) != getBuffer()[caretPos.begin]
                    && !isMask(caretPos.begin)) {
                    e.keyCode = $.inputmask.keyCode.BACKSPACE;
                    keydownEvent.call(input, e);
                }
                e.preventDefault();
            }
            function inputFallBackEvent(e) { //fallback when keypress & compositionevents fail
                if (skipInputEvent === true && e.type == "input") {
                    skipInputEvent = false;
                    return true;
                }
                var input = this;
                var caretPos = caret(input),
                    currentValue = input._valueGet();

                caret(input, caretPos.begin - 1);
                var keypress = $.Event("keypress");
                keypress.which = currentValue.charCodeAt(caretPos.begin - 1);
                skipKeyPressEvent = false;
                ignorable = false;
                keypressEvent.call(input, keypress, undefined, undefined, false);
                var forwardPosition = getMaskSet()["p"];
                writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);

                e.preventDefault();
            }
            function compositionupdateEvent(e) { //fix for special latin-charset FF/Linux
                skipInputEvent = true; //stop inutFallback
                var input = this;
                setTimeout(function () {
                    caret(input, caret(input).begin - 1);
                    var keypress = $.Event("keypress");
                    keypress.which = e.originalEvent.data.charCodeAt(0);
                    skipKeyPressEvent = false;
                    ignorable = false;
                    keypressEvent.call(input, keypress, undefined, undefined, false);
                    var forwardPosition = getMaskSet()["p"];
                    writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
                }, 0);
                return false;
            }
            function mask(el) {
                $el = $(el);
                if ($el.is(":input") && !isInputTypeSupported($el.attr("type"))) {
                    //store tests & original buffer in the input element - used to get the unmasked value
                    $el.data('_inputmask', {
                        'maskset': maskset,
                        'opts': opts,
                        'isRTL': false
                    });

                    //show tooltip
                    if (opts.showTooltip) {
                        $el.prop("title", getMaskSet()["mask"]);
                    }

                    if (el.dir == "rtl" || opts.rightAlign)
                        $el.css("text-align", "right");

                    if (el.dir == "rtl" || opts.numericInput) {
                        el.dir = "ltr";
                        $el.removeAttr("dir");
                        var inputData = $el.data('_inputmask');
                        inputData['isRTL'] = true;
                        $el.data('_inputmask', inputData);
                        isRTL = true;
                    }

                    //unbind all events - to make sure that no other mask will interfere when re-masking
                    $el.unbind(".inputmask");
                    $el.removeClass('focus-inputmask');
                    //bind events
                    $el.closest('form').bind("submit", function (e) { //trigger change on submit if any
                        if (valueOnFocus != getBuffer().join('')) {
                            $el.change();
                        }
                        if ($el[0]._valueGet && $el[0]._valueGet() == getBufferTemplate().join('')) {
                            $el[0]._valueSet(''); //clear masktemplete on submit and still has focus
                        }
                        if (opts.autoUnmask && opts.removeMaskOnSubmit) {
                            $el.inputmask("remove");
                        }
                    }).bind('reset', function () {
                        setTimeout(function () {
                            $el.trigger("setvalue");
                        }, 0);
                    });
                    $el.bind("mouseenter.inputmask", function () {
                        var $input = $(this), input = this;
                        if (!$input.hasClass('focus-inputmask') && opts.showMaskOnHover) {
                            if (input._valueGet() != getBuffer().join('')) {
                                writeBuffer(input, getBuffer());
                            }
                        }
                    }).bind("blur.inputmask", function () {
                        var $input = $(this), input = this;
                        if ($input.data('_inputmask')) {
                            var nptValue = input._valueGet(), buffer = getBuffer();
                            $input.removeClass('focus-inputmask');
                            if (valueOnFocus != getBuffer().join('')) {
                                $input.change();
                            }
                            if (opts.clearMaskOnLostFocus && nptValue != '') {
                                if (nptValue == getBufferTemplate().join(''))
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                            if (isComplete(buffer) === false) {
                                $input.trigger("incomplete");
                                if (opts.clearIncomplete) {
                                    resetMaskSet();
                                    if (opts.clearMaskOnLostFocus)
                                        input._valueSet('');
                                    else {
                                        buffer = getBufferTemplate().slice();
                                        writeBuffer(input, buffer);
                                    }
                                }
                            }
                        }
                    }).bind("focus.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet();
                        if (opts.showMaskOnFocus && !$input.hasClass('focus-inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                            if (input._valueGet() != getBuffer().join('')) {
                                writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
                            }
                        }
                        $input.addClass('focus-inputmask');
                        valueOnFocus = getBuffer().join('');
                    }).bind("mouseleave.inputmask", function () {
                        var $input = $(this), input = this;
                        if (opts.clearMaskOnLostFocus) {
                            if (!$input.hasClass('focus-inputmask') && input._valueGet() != $input.attr("placeholder")) {
                                if (input._valueGet() == getBufferTemplate().join('') || input._valueGet() == '')
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                        }
                    }).bind("click.inputmask", function () {
                        var input = this;
                        if ($(input).is(":focus")) {
                            setTimeout(function () {
                                var selectedCaret = caret(input);
                                if (selectedCaret.begin == selectedCaret.end) {
                                    var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
                                        lvp = getLastValidPosition(clickPosition),
                                        lastPosition = seekNext(lvp);
                                    if (clickPosition <= lastPosition) {
                                        if (isMask(clickPosition))
                                            caret(input, clickPosition);
                                        else caret(input, lvp == -1 && opts.radixPoint != "" ? $.inArray(opts.radixPoint, getBuffer()) : seekNext(clickPosition));
                                    } else {
                                        caret(input, lastPosition);
                                    }
                                }
                            }, 0);
                        }
                    }).bind('dblclick.inputmask', function () {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getLastValidPosition()));
                        }, 0);
                    }).bind(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", pasteEvent
                    ).bind('setvalue.inputmask', function () {
                        var input = this;
                        checkVal(input, true, false, undefined, true);
                        valueOnFocus = getBuffer().join('');
                        if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input._valueGet() == getBufferTemplate().join(''))
                            input._valueSet('');
                    }).bind('complete.inputmask', opts.oncomplete
                    ).bind('incomplete.inputmask', opts.onincomplete
                    ).bind('cleared.inputmask', opts.oncleared);

                    $el.bind("keydown.inputmask", keydownEvent
                    ).bind("keypress.inputmask", keypressEvent
                    ).bind("keyup.inputmask", keyupEvent
                    ).bind("compositionupdate.inputmask", compositionupdateEvent);

                    if (PasteEventType === "paste" && !msie1x) {
                        $el.bind("input.inputmask", inputFallBackEvent);
                    }
                    if (msie1x) { //todo enhance inputFallBack to handle this case
                        $el.bind("input.inputmask", pasteEvent);
                    }
                    if (android || androidfirefox || androidchrome || kindle) {
                        if (PasteEventType == "input") {
                            $el.unbind(PasteEventType + ".inputmask");
                        }
                        $el.bind("input.inputmask", mobileInputEvent);
                    }

                    patchValueProperty(el);

                    //apply mask
                    var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(el, el._valueGet(), opts) : el._valueGet();
                    checkVal(el, true, false, initialValue.split(''), true);
                    valueOnFocus = getBuffer().join('');
                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                    var activeElement;
                    try {
                        activeElement = document.activeElement;
                    } catch (e) {
                    }
                    if (isComplete(getBuffer()) === false) {
                        if (opts.clearIncomplete)
                            resetMaskSet();
                    }
                    if (opts.clearMaskOnLostFocus) {
                        if (getBuffer().join('') == getBufferTemplate().join('')) {
                            el._valueSet('');
                        } else {
                            clearOptionalTail(el);
                        }
                    } else {
                        writeBuffer(el, getBuffer());
                    }
                    if (activeElement === el) { //position the caret when in focus
                        $el.addClass('focus-inputmask');
                        caret(el, seekNext(getLastValidPosition()));
                    }

                    installEventRuler(el);
                }
            }

            //action object
            if (actionObj != undefined) {
                switch (actionObj["action"]) {
                    case "isComplete":
                        $el = $(actionObj["el"]);
                        maskset = $el.data('_inputmask')['maskset'];
                        opts = $el.data('_inputmask')['opts'];
                        return isComplete(actionObj["buffer"]);
                    case "unmaskedvalue":
                        $el = actionObj["$input"];
                        maskset = $el.data('_inputmask')['maskset'];
                        opts = $el.data('_inputmask')['opts'];
                        isRTL = actionObj["$input"].data('_inputmask')['isRTL'];
                        return unmaskedvalue(actionObj["$input"]);
                    case "mask":
                        valueOnFocus = getBuffer().join('');
                        mask(actionObj["el"]);
                        break;
                    case "format":
                        $el = $({});
                        $el.data('_inputmask', {
                            'maskset': maskset,
                            'opts': opts,
                            'isRTL': opts.numericInput
                        });
                        if (opts.numericInput) {
                            isRTL = true;
                        }
                        var valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call($el, actionObj["value"], opts) : actionObj["value"]).split('');
                        checkVal($el, false, false, isRTL ? valueBuffer.reverse() : valueBuffer, true);
                        opts.onKeyPress.call(this, undefined, getBuffer(), 0, opts);

                        if (actionObj["metadata"]) {
                            return {
                                value: isRTL ? getBuffer().slice().reverse().join('') : getBuffer().join(''),
                                metadata: $el.inputmask("getmetadata")
                            }
                        }

                        return isRTL ? getBuffer().slice().reverse().join('') : getBuffer().join('');
                    case "isValid":
                        $el = $({});
                        $el.data('_inputmask', {
                            'maskset': maskset,
                            'opts': opts,
                            'isRTL': opts.numericInput
                        });
                        if (opts.numericInput) {
                            isRTL = true;
                        }
                        var valueBuffer = actionObj["value"].split('');
                        checkVal($el, false, true, isRTL ? valueBuffer.reverse() : valueBuffer);
                        var buffer = getBuffer();
                        var rl = determineLastRequiredPosition(), lmib = buffer.length - 1;
                        for (; lmib > rl; lmib--) {
                            if (isMask(lmib)) break;
                        }
                        buffer.splice(rl, lmib + 1 - rl);

                        return isComplete(buffer) && actionObj["value"] == buffer.join('');
                    case "getemptymask":
                        $el = $(actionObj["el"]);
                        maskset = $el.data('_inputmask')['maskset'];
                        opts = $el.data('_inputmask')['opts'];
                        return getBufferTemplate();
                    case "remove":
                        var el = actionObj["el"];
                        $el = $(el);
                        maskset = $el.data('_inputmask')['maskset'];
                        opts = $el.data('_inputmask')['opts'];
                        //writeout the unmaskedvalue
                        el._valueSet(unmaskedvalue($el));
                        //unbind all events
                        $el.unbind(".inputmask");
                        $el.removeClass('focus-inputmask');
                        //clear data
                        $el.removeData('_inputmask');
                        //restore the value property
                        var valueProperty;
                        if (Object.getOwnPropertyDescriptor)
                            valueProperty = Object.getOwnPropertyDescriptor(el, "value");
                        if (valueProperty && valueProperty.get) {
                            if (el._valueGet) {
                                Object.defineProperty(el, "value", {
                                    get: el._valueGet,
                                    set: el._valueSet
                                });
                            }
                        } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
                            if (el._valueGet) {
                                el.__defineGetter__("value", el._valueGet);
                                el.__defineSetter__("value", el._valueSet);
                            }
                        }
                        try { //try catch needed for IE7 as it does not supports deleting fns
                            delete el._valueGet;
                            delete el._valueSet;
                        } catch (e) {
                            el._valueGet = undefined;
                            el._valueSet = undefined;

                        }
                        break;
                    case "getmetadata":
                        $el = $(actionObj["el"]);
                        maskset = $el.data('_inputmask')['maskset'];
                        opts = $el.data('_inputmask')['opts'];
                        if ($.isArray(maskset["metadata"])) {
                            //find last alternation
                            var alternation, lvp = getLastValidPosition();
                            for (var firstAlt = lvp; firstAlt >= 0; firstAlt--) {
                                if (getMaskSet()["validPositions"][firstAlt] && getMaskSet()["validPositions"][firstAlt].alternation != undefined) {
                                    alternation = getMaskSet()["validPositions"][firstAlt].alternation;
                                    break;
                                }
                            }
                            if (alternation != undefined) {
                                return maskset["metadata"][getMaskSet()["validPositions"][lvp].locator[alternation]];
                            } else return maskset["metadata"][0];
                        }

                        return maskset["metadata"];
                }
            }
        }

        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: { start: "[", end: "]" },
                quantifiermarker: { start: "{", end: "}" },
                groupmarker: { start: "(", end: ")" },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                removeMaskOnSubmit: true, //remove the mask before submitting the form.  Use in combination with autoUnmask: true
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                alias: null,
                onKeyUp: $.noop, //callback to implement autocomplete on certain keys for example
                onKeyPress: $.noop, //callback to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //callback to implement autocomplete on certain keys for example
                onBeforeMask: undefined, //executes before masking the initial value to allow preprocessing of the initial value.  args => initialValue, opts => return processedValue
                onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.  args => pastedValue, opts => return processedValue
                onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.  args => maskedValue, unmaskedValue, opts
                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                showTooltip: false, //show the activemask as tooltip
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                rightAlign: false, //align to the right
                //numeric basic properties
                radixPoint: "", //".", // | ","
                //numeric basic properties
                nojumps: false, //do not jump over fixed parts in the mask
                nojumpsThreshold: 0, //start nojumps as of
                keepStatic: undefined, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - undefined see auto selection for multi masks
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    '*': {
                        validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
                        cardinality: 1
                    }
                },
                //specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: undefined //override for isComplete - args => buffer, opts - return true || false
            },
            keyCode: {
                ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
            },
            masksCache: {},
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            format: function (value, options, metadata) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope({ "action": "format", "value": value, "metadata": metadata }, generateMaskSet(opts), opts);
            },
            isValid: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope({ "action": "isValid", "value": value }, generateMaskSet(opts), opts);
            }
        };

        $.fn.inputmask = function (fn, options, targetScope, targetData, msk) {
            targetScope = targetScope || maskScope;
            targetData = targetData || "_inputmask";
            function importAttributeOptions(npt, opts, importedOptionsContainer) {
                var $npt = $(npt);
                if ($npt.data("inputmask-alias")) {
                    resolveAlias($npt.data("inputmask-alias"), {}, opts);
                }
                for (var option in opts) {
                    var optionData = $npt.data("inputmask-" + option.toLowerCase());
                    if (optionData != undefined) {
                        if (option == "mask" && optionData.indexOf("[") == 0) {
                            opts[option] = optionData.replace(/[\s[\]]/g, "").split("','");
                            opts[option][0] = opts[option][0].replace("'", "");
                            opts[option][opts[option].length - 1] = opts[option][opts[option].length - 1].replace("'", "");
                        } else
                            opts[option] = typeof optionData == "boolean" ? optionData : optionData.toString();
                        if (importedOptionsContainer)
                            importedOptionsContainer[option] = opts[option];
                    }
                }
                return opts;
            }
            var opts = $.extend(true, {}, $.inputmask.defaults, options),
                maskset;

            if (typeof fn === "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options, opts);
                        maskset = generateMaskSet(opts, targetScope !== maskScope);
                        if (maskset == undefined) { return this; }

                        return this.each(function () {
                            targetScope({ "action": "mask", "el": this }, $.extend(true, {}, maskset), importAttributeOptions(this, opts));
                        });
                    case "unmaskedvalue":
                        var $input = $(this);
                        if ($input.data(targetData)) {
                            return targetScope({ "action": "unmaskedvalue", "$input": $input });
                        } else return $input.val();
                    case "remove":
                        return this.each(function () {
                            var $input = $(this);
                            if ($input.data(targetData)) {
                                targetScope({ "action": "remove", "el": this });
                            }
                        });
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data(targetData)) {
                            return targetScope({ "action": "getemptymask", "el": this });
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data(targetData) ? !this.data(targetData)['opts'].autoUnmask : false;
                    case "isComplete":
                        if (this.data(targetData)) {
                            return targetScope({ "action": "isComplete", "buffer": this[0]._valueGet().split(''), "el": this });
                        } else return true;
                    case "getmetadata": //return mask metadata if exists
                        if (this.data(targetData)) {
                            return targetScope({ "action": "getmetadata", "el": this });
                        }
                        else return undefined;
                    case "_detectScope":
                        resolveAlias(opts.alias, options, opts);
                        if (msk != undefined && !resolveAlias(msk, options, opts) && $.inArray(msk, ["mask", "unmaskedvalue", "remove", "getemptymask", "hasMaskedValue", "isComplete", "getmetadata", "_detectScope"]) == -1) {
                            opts.mask = msk;
                        }
                        if ($.isFunction(opts.mask)) {
                            opts.mask = opts.mask.call(this, opts);
                        }
                        return $.isArray(opts.mask);
                    default:
                        resolveAlias(opts.alias, options, opts);
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options, opts)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        maskset = generateMaskSet(opts, targetScope !== maskScope);
                        if (maskset == undefined) { return this; }
                        return this.each(function () {
                            targetScope({ "action": "mask", "el": this }, $.extend(true, {}, maskset), importAttributeOptions(this, opts));
                        });
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);
                resolveAlias(opts.alias, fn, opts); //resolve aliases
                maskset = generateMaskSet(opts, targetScope !== maskScope);
                if (maskset == undefined) { return this; }
                return this.each(function () {
                    targetScope({ "action": "mask", "el": this }, $.extend(true, {}, maskset), importAttributeOptions(this, opts));
                });
            } else if (fn == undefined) {
                //look for data-inputmask atribute - the attribute should only contain optipns
                return this.each(function () {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && attrOptions != "") {
                        try {
                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                            var dataoptions = $.parseJSON("{" + attrOptions + "}");
                            $.extend(true, dataoptions, options);
                            opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
                            opts = importAttributeOptions(this, opts);
                            resolveAlias(opts.alias, dataoptions, opts);
                            opts.alias = undefined;
                            $(this).inputmask("mask", opts, targetScope);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                    if ($(this).attr("data-inputmask-mask") || $(this).attr("data-inputmask-alias")) {
                        opts = $.extend(true, {}, $.inputmask.defaults, {});
                        var dataOptions = {};
                        opts = importAttributeOptions(this, opts, dataOptions);
                        resolveAlias(opts.alias, dataOptions, opts);
                        opts.alias = undefined;
                        $(this).inputmask("mask", opts, targetScope);
                    }
                });
            }
        };
    }
    return $.fn.inputmask;
}));