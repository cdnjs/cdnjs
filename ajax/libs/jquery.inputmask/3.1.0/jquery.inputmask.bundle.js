/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.0
*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    if ($.fn.inputmask === undefined) {

        //helper functions
        function isInputEventSupported(eventName) {
            var el = document.createElement('input'),
                eventName = 'on' + eventName,
                isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
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
            var ms = [];

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
                    $.each(opts.mask, function (ndx, msk) {
                        if (msk["mask"] != undefined) {
                            ms.push(generateMask(msk["mask"].toString(), msk));
                        } else {
                            ms.push(generateMask(msk.toString()));
                        }
                    });
                } else {
                    opts.keepStatic = opts.keepStatic == undefined ? true : opts.keepStatic; //enable by default when passing multiple masks when the option is not explicitly specified
                    var hasMetaData = false;
                    var altMask = "(";
                    $.each(opts.mask, function (ndx, msk) {
                        if (altMask.length > 1)
                            altMask += ")|(";
                        if (msk["mask"] != undefined) {
                            hasMetaData = true;
                            altMask += msk["mask"].toString();
                        } else {
                            altMask += msk.toString();
                        }
                    });
                    altMask += ")";
                    ms = generateMask(altMask, hasMetaData ? opts.mask : undefined);
                }
            } else {
                if (opts.mask.length == 1 && opts.greedy == false && opts.repeat != 0) {
                    opts.placeholder = "";
                } //hide placeholder with single non-greedy mask
                if (opts.mask["mask"] != undefined) {
                    ms = generateMask(opts.mask["mask"].toString(), opts.mask);
                } else {
                    ms = generateMask(opts.mask.toString());
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
                        maskTemplate.push(test["fn"] == null ? test["def"] : (includeInput === true ? validPos["input"] : test["placeholder"] || opts.placeholder.charAt(pos % opts.placeholder.length)));
                    } else {
                        if (minimalPos > pos) {
                            var testPositions = getTests(pos, ndxIntlzr, pos - 1);
                            testPos = testPositions[0];
                        } else {
                            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                        }
                        test = testPos["match"];
                        ndxIntlzr = testPos["locator"].slice();
                        maskTemplate.push(test["fn"] == null ? test["def"] : (test["placeholder"] != undefined ? test["placeholder"] : opts.placeholder.charAt(pos % opts.placeholder.length)));
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
                    maskset["p"] = -1;
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
                var i, startPos = start, lvp;
                for (i = start; i < end; i++) { //clear selection
                    //TODO FIXME BETTER CHECK
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
                lvp = getLastValidPosition();
                //catchup
                while (lvp > 0 && (getMaskSet()["validPositions"][lvp] == undefined || getMaskSet()["validPositions"][lvp].match.fn == null)) {
                    delete getMaskSet()["validPositions"][lvp];
                    lvp--;
                }
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
                            firstAlt,
                            alternation;
                        //find last alternation
                        for (firstAlt = getLastValidPosition() ; firstAlt >= 0; firstAlt--) {
                            if (getMaskSet()["validPositions"][firstAlt] && getMaskSet()["validPositions"][firstAlt].alternation != undefined) {
                                alternation = getMaskSet()["validPositions"][firstAlt].alternation;
                                break;
                            }
                        }
                        if (alternation != undefined) {
                            //find first decision making position
                            for (var decisionPos in getMaskSet()["validPositions"]) {
                                if (parseInt(decisionPos) > parseInt(firstAlt) && getMaskSet()["validPositions"][decisionPos].alternation === undefined) {
                                    var altPos = getMaskSet()["validPositions"][decisionPos],
                                        decisionTaker = altPos.locator[alternation],
                                        altNdxs = getMaskSet()["validPositions"][firstAlt].locator[alternation].split(",");

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
                return test["placeholder"] || (test["fn"] == null ? test["def"] : opts.placeholder.charAt(pos % opts.placeholder.length));
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
                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), false, strict, ndx);
                        }
                    } else {
                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), false, strict, ndx);
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
                var rl = determineLastRequiredPosition();
                tmpBuffer.length = rl;
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
                if (opts.numericInput || isRTL) {
                    if (k == opts.keyCode.BACKSPACE)
                        k = opts.keyCode.DELETE;
                    else if (k == opts.keyCode.DELETE)
                        k = opts.keyCode.BACKSPACE;

                    if (isRTL) {
                        var pend = pos.end;
                        pos.end = pos.begin;
                        pos.begin = pend;
                    }
                }

                if (k == opts.keyCode.BACKSPACE && pos.end - pos.begin <= 1)
                    pos.begin = seekPrevious(pos.begin);
                else if (k == opts.keyCode.DELETE && pos.begin == pos.end)
                    pos.end++;

                stripValidPositions(pos.begin, pos.end);
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
                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || e.ctrlKey && k == 88) { //backspace/delete
                    e.preventDefault(); //stop default action but allow propagation
                    if (k == 88) valueOnFocus = getBuffer().join('');
                    handleRemove(input, k, pos);
                    writeBuffer(input, getBuffer(), getMaskSet()["p"]);
                    if (input._valueGet() == getBufferTemplate().join(''))
                        $input.trigger('cleared');

                    if (opts.showTooltip) { //update tooltip
                        $input.prop("title", getMaskSet()["mask"]);
                    }
                } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                    setTimeout(function () {
                        var caretPos = seekNext(getLastValidPosition());
                        if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                    }, 0);
                } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
                    caret(input, 0, e.shiftKey ? pos.begin : 0);
                } else if (k == opts.keyCode.ESCAPE || (k == 90 && e.ctrlKey)) { //escape && undo
                    checkVal(input, true, false, valueOnFocus.split(''));
                    $input.click();
                } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                    opts.insertMode = !opts.insertMode;
                    caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                } else if (opts.insertMode == false && !e.shiftKey) {
                    if (k == opts.keyCode.RIGHT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin);
                        }, 0);
                    } else if (k == opts.keyCode.LEFT) {
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

                        var pos, forwardPosition, c = String.fromCharCode(k);
                        if (checkval) {
                            var pcaret = strict ? ndx : getLastValidPosition() + 1;
                            pos = { begin: pcaret, end: pcaret };
                        } else {
                            pos = caret(input);
                        }

                        //should we clear a possible selection??
                        var isSlctn = isSelection(pos.begin, pos.end);
                        if (isSlctn) {
                            getMaskSet()["undoPositions"] = $.extend(true, {}, getMaskSet()["validPositions"]); //init undobuffer for recovery when not valid
                            handleRemove(input, opts.keyCode.DELETE, pos);
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

                        //needed for IE8 and below
                        if (e && checkval != true) {
                            e.preventDefault ? e.preventDefault() : e.returnValue = false;

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
                if (k == opts.keyCode.TAB && opts.showMaskOnFocus) {
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
                checkVal(input, true, false, pasteValue.split(''), true);
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
                    e.keyCode = opts.keyCode.BACKSPACE;
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
                if ($el.is(":input") && $el.attr("type") != "number") {
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
                    $el.closest('form').bind("submit", function () { //trigger change on submit if any
                        if (valueOnFocus != getBuffer().join('')) {
                            $el.change();
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
                                    if (clickPosition < lastPosition) {
                                        if (isMask(clickPosition))
                                            caret(input, clickPosition);
                                        else caret(input, seekNext(clickPosition));
                                    } else
                                        caret(input, lastPosition);
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
                    }).bind('complete.inputmask', opts.oncomplete
                    ).bind('incomplete.inputmask', opts.onincomplete
                    ).bind('cleared.inputmask', opts.oncleared);

                    $el.bind("keydown.inputmask", keydownEvent
                    ).bind("keypress.inputmask", keypressEvent
                    ).bind("keyup.inputmask", keyupEvent
                    ).bind("compositionupdate.inputmask", compositionupdateEvent);

                    if (PasteEventType === "paste") {
                        $el.bind("input.inputmask", inputFallBackEvent);
                    }
                    if (android || androidfirefox || androidchrome || kindle) {
                        if (PasteEventType == "input") {
                            $el.unbind(PasteEventType + ".inputmask");
                        }
                        $el.bind("input.inputmask", mobileInputEvent);
                    }

                    if (msie1x)
                        $el.bind("input.inputmask", pasteEvent);

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
                        var rl = determineLastRequiredPosition();
                        buffer.length = rl;

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
                keyCode: {
                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                },
                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: undefined //override for isComplete - args => buffer, opts - return true || false
            },
            masksCache: {},
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            format: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope({ "action": "format", "value": value }, generateMaskSet(opts), opts);
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
            function importAttributeOptions(npt, opts) {
                var $npt = $(npt);
                for (var option in opts) {
                    var optionData = $npt.data("inputmask-" + option.toLowerCase());
                    if (optionData != undefined)
                        opts[option] = optionData;
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
                        if (maskset.length == 0) { return this; }

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
                            resolveAlias(opts.alias, dataoptions, opts);
                            opts.alias = undefined;
                            $(this).inputmask("mask", opts, targetScope);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                });
            }
        };
    }
    return $.fn.inputmask;
}));
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.1.0

Optional extensions on the jquery.inputmask base
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    //extra definitions
    $.extend($.inputmask.defaults.definitions, {
        'A': {
            validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            cardinality: 1,
            casing: "upper" //auto uppercasing
        },
        '#': {
            validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
            cardinality: 1,
            casing: "upper"
        }
    });
    $.extend($.inputmask.defaults.aliases, {
        'url': {
            mask: "ir",
            placeholder: "",
            separator: "",
            defaultPrefix: "http://",
            regex: {
                urlpre1: new RegExp("[fh]"),
                urlpre2: new RegExp("(ft|ht)"),
                urlpre3: new RegExp("(ftp|htt)"),
                urlpre4: new RegExp("(ftp:|http|ftps)"),
                urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
                urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
                urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
                urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
            },
            definitions: {
                'i': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        return true;
                    },
                    cardinality: 8,
                    prevalidator: (function () {
                        var result = [], prefixLimit = 8;
                        for (var i = 0; i < prefixLimit; i++) {
                            result[i] = (function () {
                                var j = i;
                                return {
                                    validator: function (chrs, maskset, pos, strict, opts) {
                                        if (opts.regex["urlpre" + (j + 1)]) {
                                            var tmp = chrs, k;
                                            if (((j + 1) - chrs.length) > 0) {
                                                tmp = maskset.buffer.join('').substring(0, ((j + 1) - chrs.length)) + "" + tmp;
                                            }
                                            var isValid = opts.regex["urlpre" + (j + 1)].test(tmp);
                                            if (!strict && !isValid) {
                                                pos = pos - j;
                                                for (k = 0; k < opts.defaultPrefix.length; k++) {
                                                    maskset.buffer[pos] = opts.defaultPrefix[k]; pos++;
                                                }
                                                for (k = 0; k < tmp.length - 1; k++) {
                                                    maskset.buffer[pos] = tmp[k]; pos++;
                                                }
                                                return { "pos": pos };
                                            }
                                            return isValid;
                                        } else {
                                            return false;
                                        }
                                    }, cardinality: j
                                };
                            })();
                        }
                        return result;
                    })()
                },
                "r": {
                    validator: ".",
                    cardinality: 50
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        "ip": { //ip-address mask
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                'i': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        if (pos - 1 > -1 && maskset.buffer[pos - 1] != ".") {
                            chrs = maskset.buffer[pos - 1] + chrs;
                            if (pos - 2 > -1 && maskset.buffer[pos - 2] != ".") {
                                chrs = maskset.buffer[pos - 2] + chrs;
                            } else chrs = "0" + chrs;
                        } else chrs = "00" + chrs;
                        return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            }
        },
        "email": {
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                '*': {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        }
    });
    return $.fn.inputmask;
}));
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.1.0

Optional extensions on the jquery.inputmask base
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    //date & time aliases
    $.extend($.inputmask.defaults.definitions, {
        'h': { //hours
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-2]", cardinality: 1 }]
        },
        's': { //seconds || minutes
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-5]", cardinality: 1 }]
        },
        'd': { //basic day
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [{ validator: "[0-3]", cardinality: 1 }]
        },
        'm': { //basic month
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [{ validator: "[01]", cardinality: 1 }]
        },
        'y': { //basic year
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [
                        { validator: "[12]", cardinality: 1 },
                        { validator: "(19|20)", cardinality: 2 },
                        { validator: "(19|20)\\d", cardinality: 3 }
            ]
        }
    });
    $.extend($.inputmask.defaults.aliases, {
        'dd/mm/yyyy': {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"), //daypre
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), //day
                val2pre: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])"); }, //monthpre
                val2: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))"); }//month
            },
            leapday: "29/02/",
            separator: '/',
            yearrange: { minyear: 1900, maxyear: 2099 },
            isInYearRange: function (chrs, minyear, maxyear) {
                if (isNaN(chrs)) return false;
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length)));
                var enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (!isNaN(enteredyear) ? minyear <= enteredyear && enteredyear <= maxyear : false) ||
            		   (!isNaN(enteredyear2) ? minyear <= enteredyear2 && enteredyear2 <= maxyear : false);
            },
            determinebaseyear: function (minyear, maxyear, hint) {
                var currentyear = (new Date()).getFullYear();
                if (minyear > currentyear) return minyear;
                if (maxyear < currentyear) {
                    var maxYearPrefix = maxyear.toString().slice(0, 2);
                    var maxYearPostfix = maxyear.toString().slice(2, 4);
                    while (maxyear < maxYearPrefix + hint) {
                        maxYearPrefix--;
                    }
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }

                return currentyear;
            },
            onKeyUp: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                }
            },
            definitions: {
                '1': { //val1 ~ day or month
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val1.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    return { "refreshFromBuffer": { start: pos - 1, end: pos }, "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            if (!isNaN(maskset.buffer[pos + 1])) chrs += maskset.buffer[pos + 1];
                            var isValid = chrs.length == 1 ? opts.regex.val1pre.test(chrs) : opts.regex.val1.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val1.test("0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                '2': { //val2 ~ day or month
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var frontValue = (opts.mask.indexOf("2") == opts.mask.length - 1) ? maskset.buffer.join('').substr(5, 3) : maskset.buffer.join('').substr(0, 3);
                        if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    return { "refreshFromBuffer": { start: pos - 1, end: pos }, "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }

                        //check leap yeap
                        if ((opts.mask.indexOf("2") == opts.mask.length - 1) && isValid) {
                            var dayMonthValue = maskset.buffer.join('').substr(4, 4) + chrs;
                            if (dayMonthValue != opts.leapday)
                                return true;
                            else {
                                var year = parseInt(maskset.buffer.join('').substr(0, 4), 10);  //detect leap year
                                if (year % 4 === 0)
                                    if (year % 100 === 0)
                                        if (year % 400 === 0)
                                            return true;
                                        else return false;
                                    else return true;
                                else return false;
                            }
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            if (!isNaN(maskset.buffer[pos + 1])) chrs += maskset.buffer[pos + 1];
                            var frontValue = (opts.mask.indexOf("2") == opts.mask.length - 1) ? maskset.buffer.join('').substr(5, 3) : maskset.buffer.join('').substr(0, 3);
                            if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                            var isValid = chrs.length == 1 ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                'y': { //year
                    validator: function (chrs, maskset, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = maskset.buffer.join('').substr(0, 6);
                            if (dayMonthValue != opts.leapday)
                                return true;
                            else {
                                var year = parseInt(chrs, 10);//detect leap year
                                if (year % 4 === 0)
                                    if (year % 100 === 0)
                                        if (year % 400 === 0)
                                            return true;
                                        else return false;
                                    else return true;
                                else return false;
                            }
                        } else return false;
                    },
                    cardinality: 4,
                    prevalidator: [
                {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                maskset.buffer[pos++] = yearPrefix.charAt(0);
                                return { "pos": pos };
                            }
                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                maskset.buffer[pos++] = yearPrefix.charAt(0);
                                maskset.buffer[pos++] = yearPrefix.charAt(1);
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);

                            isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                maskset.buffer[pos++] = yearPrefix.charAt(1);
                                return { "pos": pos };
                            }

                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                            if (opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                var dayMonthValue = maskset.buffer.join('').substr(0, 6);
                                if (dayMonthValue != opts.leapday)
                                    isValid = true;
                                else {
                                    var year = parseInt(chrs, 10);//detect leap year
                                    if (year % 4 === 0)
                                        if (year % 100 === 0)
                                            if (year % 400 === 0)
                                                isValid = true;
                                            else isValid = false;
                                        else isValid = true;
                                    else isValid = false;
                                }
                            } else isValid = false;
                            if (isValid) {
                                maskset.buffer[pos - 1] = yearPrefix.charAt(0);
                                maskset.buffer[pos++] = yearPrefix.charAt(1);
                                maskset.buffer[pos++] = chrs.charAt(0);
                                return { "refreshFromBuffer": { start: pos - 3, end: pos }, "pos": pos };
                            }
                        }
                        return isValid;
                    }, cardinality: 2
                },
                {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                    }, cardinality: 3
                }
                    ]
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        'mm/dd/yyyy': {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy", //reuse functionality of dd/mm/yyyy alias
            regex: {
                val2pre: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])"); }, //daypre
                val2: function (separator) { var escapedSeparator = $.inputmask.escapeRegex.call(this, separator); return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)"); }, //day
                val1pre: new RegExp("[01]"), //monthpre
                val1: new RegExp("0[1-9]|1[012]") //month
            },
            leapday: "02/29/",
            onKeyUp: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString());
                }
            }
        },
        'yyyy/mm/dd': {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyUp: function (e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                }
            }
        },
        'dd.mm.yyyy': {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: '.',
            alias: "dd/mm/yyyy"
        },
        'dd-mm-yyyy': {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: '-',
            alias: "dd/mm/yyyy"
        },
        'mm.dd.yyyy': {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: '.',
            alias: "mm/dd/yyyy"
        },
        'mm-dd-yyyy': {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: '-',
            alias: "mm/dd/yyyy"
        },
        'yyyy.mm.dd': {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: '.',
            alias: "yyyy/mm/dd"
        },
        'yyyy-mm-dd': {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: '-',
            alias: "yyyy/mm/dd"
        },
        'datetime': {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"), //hours pre
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"), //hours
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"), //minutes/seconds pre
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ':',
            hourFormat: "24", // or 12
            definitions: {
                'h': { //hours
                    validator: function (chrs, maskset, pos, strict, opts) {
                        if (opts.hourFormat == "24") {
                            if (parseInt(chrs, 10) == 24) {
                                maskset.buffer[pos - 1] = "0";
                                maskset.buffer[pos] = "0";
                                return { "refreshFromBuffer": { start: pos - 1, end: pos }, "c": "0" };
                            }
                        }

                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.timeseparator || "-.:".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.hrs.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    maskset.buffer[pos - 1] = "0";
                                    maskset.buffer[pos] = chrs.charAt(0);
                                    pos++;
                                    return { "refreshFromBuffer": { start: pos - 2, end: pos }, "pos": pos, "c": opts.timeseparator };
                                }
                            }
                        }

                        if (isValid && opts.hourFormat !== "24" && opts.regex.hrs24.test(chrs)) {

                            var tmp = parseInt(chrs, 10);

                            if (tmp == 24) {
                                maskset.buffer[pos + 5] = "a";
                                maskset.buffer[pos + 6] = "m";
                            } else {
                                maskset.buffer[pos + 5] = "p";
                                maskset.buffer[pos + 6] = "m";
                            }

                            tmp = tmp - 12;

                            if (tmp < 10) {
                                maskset.buffer[pos] = tmp.toString();
                                maskset.buffer[pos - 1] = "0";
                            } else {
                                maskset.buffer[pos] = tmp.toString().charAt(1);
                                maskset.buffer[pos - 1] = tmp.toString().charAt(0);
                            }

                            return { "refreshFromBuffer": { start: pos - 1, end: pos + 6 }, "c": maskset.buffer[pos] };
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.hrs.test("0" + chrs);
                                if (isValid) {
                                    maskset.buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                's': { //seconds || minutes
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [
                        {
                            validator: function (chrs, maskset, pos, strict, opts) {
                                var isValid = opts.regex.mspre.test(chrs);
                                if (!strict && !isValid) {
                                    isValid = opts.regex.ms.test("0" + chrs);
                                    if (isValid) {
                                        maskset.buffer[pos] = "0";
                                        pos++;
                                        return { "pos": pos };
                                    }
                                }
                                return isValid;
                            }, cardinality: 1
                        }]
                },
                't': { //am/pm
                    validator: function (chrs, maskset, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: false,
            autoUnmask: false
        },
        'datetime12': {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'hh:mm t': {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'h:s t': {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        'hh:mm:ss': {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: false
        },
        'hh:mm': {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: false
        },
        'date': {
            alias: "dd/mm/yyyy" // "mm/dd/yyyy"
        },
        'mm/yyyy': {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: '/',
            alias: "mm/dd/yyyy"
        }
    });

    return $.fn.inputmask;
}));
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.1.0

Optional extensions on the jquery.inputmask base
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    //number aliases
    $.extend($.inputmask.defaults.aliases, {
        'numeric': {
            mask: function (opts) {
                if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
                    opts.integerDigits = opts.repeat;
                }
                opts.repeat = 0;

                opts.autoGroup = opts.autoGroup && opts.groupSeparator != "";

                if (opts.autoGroup && isFinite(opts.integerDigits)) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize);
                    var mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits += mod == 0 ? seps - 1 : seps;
                }

                opts.definitions[":"].placeholder = opts.radixPoint;

                var mask = opts.prefix;
                mask += "[+]";
                mask += "~{1," + opts.integerDigits + "}";
                if (opts.digits != undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    if (opts.digitsOptional)
                        mask += "[" + ":" + "~{" + opts.digits + "}]";
                    else mask += ":" + "~{" + opts.digits + "}";
                }
                mask += opts.suffix;
                return mask;
            },
            placeholder: "",
            greedy: false,
            digits: "*", //number of fractionalDigits
            digitsOptional: true,
            groupSeparator: "",//",", // | "."
            radixPoint: ".",
            groupSize: 3,
            autoGroup: false,
            allowPlus: true,
            allowMinus: true,
            integerDigits: "+", //number of integerDigits
            prefix: "",
            suffix: "",
            rightAlign: true,
            postFormat: function (buffer, pos, reformatOnly, opts) {  //this needs to be removed // this is crap
                var needsRefresh = false, charAtPos = buffer[pos];
                if (opts.groupSeparator == "" ||
                    ($.inArray(opts.radixPoint, buffer) != -1 && pos >= $.inArray(opts.radixPoint, buffer)) ||
                    new RegExp('[-\+]').test(charAtPos)
                    ) return { pos: pos };
                var cbuf = buffer.slice();
                if (charAtPos == opts.groupSeparator) {
                    cbuf.splice(pos--, 1);
                    charAtPos = cbuf[pos];
                }
                if (reformatOnly) cbuf[pos] = "?"; else cbuf.splice(pos, 0, "?"); //set position indicator
                var bufVal = cbuf.join('');
                if (opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) != -1)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    needsRefresh = bufVal.indexOf(opts.groupSeparator) == 0;
                    bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), '');
                    var radixSplit = bufVal.split(opts.radixPoint);
                    bufVal = radixSplit[0];
                    if (bufVal != (opts.prefix + "?0") && bufVal.length >= (opts.groupSize + opts.prefix.length)) {
                        needsRefresh = true;
                        var reg = new RegExp('([-\+]?[\\d\?]+)([\\d\?]{' + opts.groupSize + '})');
                        while (reg.test(bufVal)) {
                            bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                            bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                        }
                    }
                    if (radixSplit.length > 1)
                        bufVal += opts.radixPoint + radixSplit[1];
                }
                buffer.length = bufVal.length; //align the length
                for (var i = 0, l = bufVal.length; i < l; i++) {
                    buffer[i] = bufVal.charAt(i);
                }
                var newPos = $.inArray("?", buffer);
                if (reformatOnly) buffer[newPos] = charAtPos; else buffer.splice(newPos, 1);

                return { pos: newPos, "refreshFromBuffer": needsRefresh };
            },
            onKeyDown: function (e, buffer, caretPos, opts) {
                if (e.keyCode == opts.keyCode.TAB && opts.placeholder.charAt(0) != "0") {
                    var radixPosition = $.inArray(opts.radixPoint, buffer);
                    if (radixPosition != -1 && isFinite(opts.digits)) {
                        for (var i = 1; i <= opts.digits; i++) {
                            if (buffer[radixPosition + i] == undefined || buffer[radixPosition + i] == opts.placeholder.charAt(0)) buffer[radixPosition + i] = "0";
                        }
                        return { "refreshFromBuffer": { start: ++radixPosition, end: radixPosition + opts.digits } };
                    }
                } else if (opts.autoGroup && (e.keyCode == opts.keyCode.DELETE || e.keyCode == opts.keyCode.BACKSPACE)) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, true, opts);
                    rslt.caret = rslt.pos + 1;
                    return rslt;
                }
            },
            onKeyPress: function (e, buffer, caretPos, opts) {
                if (opts.autoGroup /*&& String.fromCharCode(k) == opts.radixPoint*/) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, true, opts);
                    rslt.caret = rslt.pos + 1;
                    return rslt;
                }
            },
            regex: {
                integerPart: function (opts) { return new RegExp('[-\+]?\\d+'); }
            },
            negationhandler: function (chrs, buffer, pos, strict, opts) {
                if (!strict && opts.allowMinus && chrs === "-") {
                    var matchRslt = buffer.join('').match(opts.regex.integerPart(opts));

                    if (matchRslt.length > 0) {
                        if (buffer[matchRslt.index] == "+") {
                            return { "pos": matchRslt.index, "c": "-", "remove": matchRslt.index, "caret": pos };
                        } else if (buffer[matchRslt.index] == "-") {
                            return { "remove": matchRslt.index, "caret": pos - 1 };
                        } else {
                            return { "pos": matchRslt.index, "c": "-", "caret": pos + 1 };
                        }
                    }
                }
                return false;
            },
            definitions: {
                '~': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.negationhandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid) {
                            isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
                            if (isValid === true) isValid = { pos: pos };
                            if (isValid != false && !strict) {
                                //handle 0 for integerpart
                                var matchRslt = maskset.buffer.join('').match(opts.regex.integerPart(opts)), radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                                if (matchRslt) {
                                    if (matchRslt["0"].indexOf("0") == 0 && pos >= opts.prefix.length) {
                                        if (radixPosition == -1 || (pos <= radixPosition && maskset["validPositions"][radixPosition] == undefined)) {
                                            maskset.buffer.splice(matchRslt.index, 1);
                                            pos = pos > matchRslt.index ? pos - 1 : matchRslt.index;
                                            $.extend(isValid, { "pos": pos, "remove": matchRslt.index });
                                        } else if (pos > matchRslt.index && pos <= radixPosition) {
                                            maskset.buffer.splice(matchRslt.index, 1);
                                            pos = pos > matchRslt.index ? pos - 1 : matchRslt.index;
                                            $.extend(isValid, { "pos": pos, "remove": matchRslt.index });
                                        }
                                    } else if (chrs == "0" && pos <= matchRslt.index) {
                                        return false;
                                    }
                                }
                                //handle overwrite when fixed precision
                                if (opts.digitsOptional === false && pos > radixPosition) {
                                    return { "pos": pos, "remove": pos };
                                }
                            }
                        }

                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                '+': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var signed = "[";
                        if (opts.allowMinus === true) signed += "-";
                        if (opts.allowPlus === true) signed += "\+";
                        signed += "]";
                        var isValid = new RegExp(signed).test(chrs);
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                ':': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        var isValid = opts.negationhandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + $.inputmask.escapeRegex.call(this, opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs);
                            if (isValid && maskset["validPositions"][pos] && maskset["validPositions"][pos]["match"].placeholder == opts.radixPoint) {
                                isValid = { "pos": pos, "remove": pos };
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: "" //radixpoint will be set in the mask function
                }

            },
            insertMode: true,
            autoUnmask: false,
            onUnMask: function (maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                //processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), ".");
                return processValue;
            },
            isComplete: function (buffer, opts) {
                var maskedValue = buffer.join(''), bufClone = buffer.slice();
                //verify separator positions
                opts.postFormat(bufClone, 0, true, opts);
                if (bufClone.join('') != maskedValue) return false;

                var processValue = maskedValue.replace(opts.prefix, "");
                processValue = processValue.replace(opts.suffix, "");
                processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), ".");
                return isFinite(processValue);
            },
            onBeforeMask: function (initialValue, opts) {
                if (isFinite(initialValue)) {
                    return initialValue.toString().replace(".", opts.radixPoint);
                } else {
                    var kommaMatches = initialValue.match(/,/g);
                    var dotMatches = initialValue.match(/\./g);
                    if (dotMatches && kommaMatches) {
                        if (dotMatches.length > kommaMatches.length) {
                            initialValue = initialValue.replace(/\./g, "");
                            initialValue = initialValue.replace(",", opts.radixPoint);
                        } else if (kommaMatches.length > dotMatches.length) {
                            initialValue = initialValue.replace(/,/g, "");
                            initialValue = initialValue.replace(".", opts.radixPoint);
                        }
                    } else {
                        initialValue = initialValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
                    }
                    return initialValue;
                }
            }
        },
        'decimal': {
            alias: "numeric"
        },
        'integer': {
            alias: "numeric",
            digits: "0"
        }
    });
    return $.fn.inputmask;
}));
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.1.0

Regex extensions on the jquery.inputmask base
Allows for using regular expressions as a mask
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.extend($.inputmask.defaults.aliases, { // $(selector).inputmask("Regex", { regex: "[0-9]*"}
        'Regex': {
            mask: "r",
            greedy: false,
            repeat: "*",
            regex: null,
            regexTokens: null,
            //Thx to https://github.com/slevithan/regex-colorizer for the tokenizer regex
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(buffer, opts){
            	return new RegExp(opts.regex).test(buffer.join(''));
            },
            definitions: {
                'r': {
                    validator: function (chrs, maskset, pos, strict, opts) {
                        function regexToken(isGroup, isQuantifier) {
                            this.matches = [];
                            this.isGroup = isGroup || false;
                            this.isQuantifier = isQuantifier || false;
                            this.quantifier = { min: 1, max: 1 };
                            this.repeaterPart = undefined;
                        }
                        function analyseRegex() {
                            var currentToken = new regexToken(), match, m, opengroups = [];

                            opts.regexTokens = [];

                            // The tokenizer regex does most of the tokenization grunt work
                            while (match = opts.tokenizer.exec(opts.regex)) {
                                m = match[0];
                                switch (m.charAt(0)) {
                                    case "(": // Group opening
                                        opengroups.push(new regexToken(true));
                                        break;
                                    case ")": // Group closing
                                        var groupToken = opengroups.pop();
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(groupToken);
                                        } else {
                                            currentToken.matches.push(groupToken);
                                        }
                                        break;
                                    case "{": case "+": case "*": //Quantifier
                                        var quantifierToken = new regexToken(false, true);
                                        m = m.replace(/[{}]/g, "");
                                        var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = mq.length == 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
                                        quantifierToken.quantifier = { min: mq0, max: mq1 };
                                        if (opengroups.length > 0) {
                                            var matches = opengroups[opengroups.length - 1]["matches"];
                                            match = matches.pop();
                                            if (!match["isGroup"]) {
                                                var groupToken = new regexToken(true);
                                                groupToken.matches.push(match);
                                                match = groupToken;
                                            }
                                            matches.push(match);
                                            matches.push(quantifierToken);
                                        } else {
                                            match = currentToken.matches.pop();
                                            if (!match["isGroup"]) {
                                                var groupToken = new regexToken(true);
                                                groupToken.matches.push(match);
                                                match = groupToken;
                                            }
                                            currentToken.matches.push(match);
                                            currentToken.matches.push(quantifierToken);
                                        }
                                        break;
                                    default:
                                        if (opengroups.length > 0) {
                                            opengroups[opengroups.length - 1]["matches"].push(m);
                                        } else {
                                            currentToken.matches.push(m);
                                        }
                                        break;
                                }
                            }

                            if (currentToken.matches.length > 0)
                                opts.regexTokens.push(currentToken);
                        };

                        function validateRegexToken(token, fromGroup) {
                            var isvalid = false;
                            if (fromGroup) {
                                regexPart += "(";
                                openGroupCount++;
                            }
                            for (var mndx = 0; mndx < token["matches"].length; mndx++) {
                                var matchToken = token["matches"][mndx];
                                if (matchToken["isGroup"] == true) {
                                    isvalid = validateRegexToken(matchToken, true);
                                } else if (matchToken["isQuantifier"] == true) {
                                    var crrntndx = $.inArray(matchToken, token["matches"]),
                                        matchGroup = token["matches"][crrntndx - 1];
                                    var regexPartBak = regexPart;
                                    if (isNaN(matchToken.quantifier.max)) {
                                        while (matchToken["repeaterPart"] && matchToken["repeaterPart"] != regexPart && matchToken["repeaterPart"].length > regexPart.length) {
                                            isvalid = validateRegexToken(matchGroup, true);
                                            if (isvalid) break;
                                        }
                                        isvalid = isvalid || validateRegexToken(matchGroup, true);
                                        if (isvalid) matchToken["repeaterPart"] = regexPart;
                                        regexPart = regexPartBak + matchToken.quantifier.max;
                                    } else {
                                        for (var i = 0, qm = matchToken.quantifier.max - 1; i < qm; i++) {
                                            isvalid = validateRegexToken(matchGroup, true);
                                            if (isvalid) break;
                                        }
                                        regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
                                    }
                                } else if (matchToken["matches"] != undefined) {
                                    for (var k = 0; k < matchToken.length; k++) {
                                        isvalid = validateRegexToken(matchToken[k], fromGroup);
                                        if (isvalid) break;
                                    }
                                } else {
                                    var testExp;
                                    if (matchToken.charAt(0) == "[") {
                                        testExp = regexPart;
                                        testExp += matchToken;
                                        for (var j = 0; j < openGroupCount; j++) {
                                            testExp += ")";
                                        }
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        isvalid = exp.test(bufferStr);
                                    } else {
                                        for (var l = 0, tl = matchToken.length; l < tl; l++) {
                                            if (matchToken.charAt(l) == "\\") continue;
                                            testExp = regexPart;
                                            testExp += matchToken.substr(0, l + 1);
                                            testExp = testExp.replace(/\|$/, "");
                                            for (var j = 0; j < openGroupCount; j++) {
                                                testExp += ")";
                                            }
                                            var exp = new RegExp("^(" + testExp + ")$");
                                            isvalid = exp.test(bufferStr);
                                            if (isvalid) break;
                                        }
                                    }
                                    regexPart += matchToken;
                                }
                                if (isvalid) break;
                            }

                            if (fromGroup) {
                                regexPart += ")";
                                openGroupCount--;
                            }

                            return isvalid;
                        }


                        if (opts.regexTokens == null) {
                            analyseRegex();
                        }

                        var cbuffer = maskset.buffer.slice(), regexPart = "", isValid = false, openGroupCount = 0;
                        cbuffer.splice(pos, 0, chrs);
                        var bufferStr = cbuffer.join('');
                        for (var i = 0; i < opts.regexTokens.length; i++) {
                            var regexToken = opts.regexTokens[i];
                            isValid = validateRegexToken(regexToken, regexToken["isGroup"]);
                            if (isValid) break;
                        }

                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    });
    return $.fn.inputmask;
}));
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.1.0

Phone extension.
When using this extension make sure you specify the correct url to get the masks

 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json", 
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["name_en"]);
                } 
  });


*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './jquery.inputmask'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.extend($.inputmask.defaults.aliases, {
        'phone': {
            url: "phone-codes/phone-codes.json",
            mask: function (opts) {
                opts.definitions = {
                    'p': {
                        validator: function () { return false; },
                        cardinality: 1
                    },
                    '#': {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var maskList = [];
                $.ajax({
                    url: opts.url,
                    async: false,
                    dataType: 'json',
                    success: function (response) {
                        maskList = response;
                    }
                });

                maskList.splice(0, 0, "+pp(pp)pppppppp");
                return maskList;
            },
            nojumps: true,
            nojumpsThreshold: 1
        },
        'phonebe': {
            url: "phone-codes/phone-be.json",
            mask: function (opts) {
                opts.definitions = {
                    'p': {
                        validator: function () { return false; },
                        cardinality: 1
                    },
                    '#': {
                        validator: "[0-9]",
                        cardinality: 1
                    }
                };
                var maskList = [];
                $.ajax({
                    url: opts.url,
                    async: false,
                    dataType: 'json',
                    success: function (response) {
                        maskList = response;
                    }
                });

                maskList.splice(0, 0, "+32(pp)pppppppp");
                return maskList;
            },
            nojumps: true,
            nojumpsThreshold: 4
        }
    });
    return $.fn.inputmask;
}));
