/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.0.0
*/

(function ($) {
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

        function generateMaskSet(opts) {
            var ms = [];

            function analyseMask(mask) {
                var tokenizer = /(?:[?*+]|\{[0-9]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g,
                    escaped = false;

                function maskToken(isGroup, isOptional, isQuantifier) {
                    this.matches = [];
                    this.isGroup = isGroup || false;
                    this.isOptional = isOptional || false;
                    this.isQuantifier = isQuantifier || false;
                    this.quantifier = { min: 1, max: 1 };
                };

                //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
                function insertTestDefinition(mtoken, element, position) {
                    var maskdef = opts.definitions[element];
                    position = position != undefined ? position : mtoken.matches.length;
                    if (maskdef && !escaped) {
                        var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
                        for (var i = 1; i < maskdef.cardinality; i++) {
                            var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                            mtoken.matches.splice(position++, 0, { fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: mtoken.isOptional, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                        }
                        mtoken.matches.splice(position++, 0, { fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: mtoken.isOptional, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                    } else {
                        mtoken.matches.splice(position++, 0, { fn: null, cardinality: 0, optionality: mtoken.isOptional, casing: null, def: element });
                        escaped = false;
                    }
                }

                var currentToken = new maskToken(),
                    match,
                    m,
                    openenings = [],
                    maskTokens = [];

                while (match = tokenizer.exec(mask)) {
                    m = match[0];
                    switch (m.charAt(0)) {
                        case opts.optionalmarker.end:
                            // optional closing
                        case opts.groupmarker.end:
                            // Group closing
                            var openingToken = openenings.pop();
                            if (openenings.length > 0) {
                                openenings[openenings.length - 1]["matches"].push(openingToken);
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
                            var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = mq.length == 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
                            quantifier.quantifier = { min: mq0, max: mq1 };
                            if (mq1 == "*" || mq1 == "+") opts.greedy = false;
                            if (openenings.length > 0) {
                                var matches = openenings[openenings.length - 1]["matches"];
                                var match = matches.pop();
                                if (!match["isGroup"]) {
                                    var groupToken = new maskToken(true);
                                    groupToken.matches.push(match);
                                    match = groupToken;
                                }
                                matches.push(match);
                                matches.push(quantifier);
                            } else {
                                var match = currentToken.matches.pop();
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
                        default:
                            if (openenings.length > 0) {
                                insertTestDefinition(openenings[openenings.length - 1], m);
                            } else {
                                if (currentToken.matches.length > 0) {
                                    var lastMatch = currentToken.matches[currentToken.matches.length - 1];
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

                if (currentToken.matches.length > 0)
                    maskTokens.push(currentToken);

                //console.log(JSON.stringify(maskTokens));
                return maskTokens;
            }

            function generateMask(mask, metadata) {
                if (opts.numericInput) { //TODO FIXME for dynamic masks
                    mask = mask.split('').reverse().join('');
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
                $.each(opts.mask, function (ndx, msk) {
                    if (msk["mask"] != undefined) {
                        ms.push(generateMask(msk["mask"].toString(), msk));
                    } else {
                        ms.push(generateMask(msk.toString()));
                    }
                });
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
        function maskScope(maskset, opts, actionObj) {
            var isRTL = false,
                valueOnFocus = getBuffer().join(''),
                $el,
                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipInputEvent = false, //skip when triggered from within inputmask
                ignorable = false,
                maxLength;

            //maskset helperfunctions
            function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
                minimalPos = minimalPos || 0;
                var maskTemplate = [], ndxIntlzr, pos = 0, test;
                do {
                    if (baseOnInput === true && getMaskSet()['validPositions'][pos]) {
                        var validPos = getMaskSet()['validPositions'][pos];
                        test = validPos["match"];
                        ndxIntlzr = validPos["locator"].slice();
                        maskTemplate.push(test["fn"] == null ? test["def"] : (includeInput === true ? validPos["input"] : opts.placeholder.charAt(pos % opts.placeholder.length)));
                    } else {
                        var testPos = getTests(pos, false, ndxIntlzr, pos - 1);
                        testPos = testPos[opts.greedy || minimalPos > pos ? 0 : (testPos.length - 1)];
                        test = testPos["match"];
                        ndxIntlzr = testPos["locator"].slice();
                        maskTemplate.push(test["fn"] == null ? test["def"] : opts.placeholder.charAt(pos % opts.placeholder.length));
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

            function getLastValidPosition(closestTo) { //TODO implement closest to
                var maskset = getMaskSet();
                var lastValidPosition = -1;
                for (var posNdx in maskset["validPositions"]) {
                    var psNdx = parseInt(posNdx);
                    if (psNdx > lastValidPosition) lastValidPosition = psNdx;
                }
                return lastValidPosition;
            }

            function setValidPosition(pos, validTest, strict, fromSetValid) {
                if (opts.insertMode && getMaskSet()["validPositions"][pos] != undefined && fromSetValid == undefined) {
                    //reposition & revalidate others
                    var positionsClone = $.extend(true, {}, getMaskSet()["validPositions"]);

                    for (var i = seekPrevious(getMaskLength()) ; i > pos && i >= 0; i--) {
                        if (isMask(i)) {
                            var j = seekPrevious(i);
                            var t = getMaskSet()["validPositions"][j];
                            if (t != undefined) {
                                if (getTest(i).def == getTest(j).def && getMaskSet()["validPositions"][i] == undefined && isValid(i, t["input"], strict, true) !== false) {
                                    delete getMaskSet()["validPositions"][j];
                                }
                            }
                        }
                    }

                    if (getMaskSet()["validPositions"][pos] == undefined) {
                        getMaskSet()["validPositions"][pos] = validTest;
                    } else {
                        getMaskSet()["validPositions"] = $.extend(true, {}, positionsClone);
                        return false;
                    }
                } else
                    getMaskSet()["validPositions"][pos] = validTest;

                return true;
            }

            function stripValidPositions(start, end) {
                var i, ml, startPos = seekNext(start - 1);
                for (i = start; i < end; i++) { //clear selection
                    delete getMaskSet()["validPositions"][i];
                }
                for (i = end, ml = getMaskLength() ; i < ml; i++) { //clear selection
                    var t = getMaskSet()["validPositions"][i];
                    var s = getMaskSet()["validPositions"][startPos];
                    if (t != undefined && s == undefined) {
                        if (getTest(startPos).def == t.match.def && isValid(startPos, t["input"], true) !== false) {
                            delete getMaskSet()["validPositions"][i];
                        }
                        startPos = seekNext(startPos);
                    }
                }
                resetMaskSet(true);
            }

            function getTest(pos) {
                if (getMaskSet()['validPositions'][pos]) {
                    return getMaskSet()['validPositions'][pos]["match"];
                }
                return getTests(pos)[0]["match"];
            }

            function getTests(pos, disableCache, ndxIntlzr, tstPs) {
                var maskTokens = getMaskSet()["maskToken"], testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [0], matches = [], insertStop = false;

                function ResolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitilizer contains a set of indexes to speedup searches in the mtokens

                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        var currentPos = testPos;
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
                                    var isFirstMatch = (optionalToken.matches.indexOf(latestMatch) == 0);
                                    if (isFirstMatch) {
                                        insertStop = true; //insert a stop for non greedy
                                    }
                                    //search for next possible match
                                    testPos = currentPos;
                                }
                            } else if (match.isQuantifier && quantifierRecurse !== true) {
                                var qt = match;
                                for (var qndx = (ndxInitializer.length > 0 && quantifierRecurse !== true) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                                    var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                                    match = handleMatch(tokenGroup, [qndx].concat(loopNdx), true);
                                    if (match) {
                                        //get latest match
                                        var latestMatch = matches[matches.length - 1]["match"];
                                        if (qndx > qt.quantifier.min - 1) { //mark optionality
                                            latestMatch.optionalQuantifier = true;
                                        }
                                        var isFirstMatch = (tokenGroup.matches.indexOf(latestMatch) == 0);
                                        if (isFirstMatch) { //search for next possible match
                                            if (qndx > qt.quantifier.min - 1) {
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

                if (disableCache !== true && getMaskSet()['tests'][pos] && !getMaskSet()['validPositions'][pos]) {
                    return getMaskSet()['tests'][pos];
                }
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
                if (matches.length == 0 || (insertStop && matches.length < 2))
                    matches.push({ "match": { fn: null, cardinality: 0, optionality: true, casing: null, def: "" }, "locator": [] });

                getMaskSet()['tests'][pos] = matches;
                //console.log(pos + " - " + JSON.stringify(matches));
                return matches;
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
                var buffer = getBuffer();
                for (var i = start; i < end; i++) {
                    if (buffer[i] != getPlaceholder(i)) {
                        var ltst = getTests(i, false)[0];
                        setValidPosition(i, $.extend({}, ltst, { "input": casing(buffer[i], ltst["match"]) }), true);
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
                    $.each(getTests(position, !strict), function (ndx, tst) {
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
                            test.fn.test(chrs, buffer, position, strict, opts)
                            : (c == test["def"] || c == opts.skipOptionalPartCharacter) && test["def"] != "" ? //non mask
                            { c: test["def"], pos: position }
                            : false;

                        if (rslt !== false) {
                            var elem = rslt.c != undefined ? rslt.c : c;
                            elem = elem == opts.skipOptionalPartCharacter ? test["def"] : elem;

                            var validatedPos = position;
                            if (rslt["refreshFromBuffer"]) {
                                var refresh = rslt["refreshFromBuffer"];
                                strict = true;
                                validatedPos = rslt.pos != undefined ? rslt.pos : position;
                                tst = getTests(validatedPos, !strict)[0]; //possible mismatch TODO
                                if (refresh === true) {
                                    getMaskSet()["validPositions"] = {};
                                    refreshFromBuffer(0, getBuffer().length);
                                }
                                else {
                                    refreshFromBuffer(refresh["start"], refresh["end"]);
                                }
                            } else if (rslt !== true && rslt["pos"] != position) { //their is a position offset
                                setValidPosition(position, $.extend({}, tst, { "input": casing(buffer[position], test) }), strict);
                                validatedPos = rslt["pos"];
                                refreshFromBuffer(position + 1, validatedPos);
                                tst = getTests(validatedPos, !strict)[0]; //possible mismatch TODO
                            }
                            if (ndx > 0) {
                                resetMaskSet(true);
                            }
                            if (!setValidPosition(validatedPos, $.extend({}, tst, { "input": casing(elem, test) }), strict, fromSetValid))
                                rslt = false;
                            return false; //break from $.each
                        }
                    });

                    return rslt;
                }

                var maskPos = pos;
                var result = _isValid(maskPos, c, strict, fromSetValid);
                if (!strict && (opts.insertMode || getMaskSet()["validPositions"][seekNext(maskPos)] == undefined) && result === false && !isMask(maskPos)) { //does the input match on a further position?
                    for (var nPos = maskPos + 1, snPos = seekNext(maskPos) ; nPos <= snPos; nPos++) {
                        result = _isValid(nPos, c, strict, fromSetValid);
                        if (result !== false) {
                            maskPos = nPos;
                            break;
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
                if (opts.greedy == false) { //TODO FIXME OPTIMIZE ME
                    var lvp = getLastValidPosition() + 1,
                        test = getTest(lvp);
                    while (!(test.fn == null && test.def == "")) { //determine last possible position
                        test = getTest(++lvp);
                        if (test.optionality !== true) {
                            var tests = getTests(lvp);
                            test = tests[tests.length - 1]["match"];
                        }
                    }
                    maskLength = getMaskTemplate(true, lvp).length;
                    getMaskSet()["tests"] = {}; //cleanup tests
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

            function getPlaceholder(pos) {
                var test = getTest(pos);
                return test["fn"] == null ? test["def"] : opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
                var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');
                resetMaskSet();
                if (writeOut) input._valueSet(""); //initial clear
                $.each(inputValue, function (ndx, charCode) {
                    if (intelliCheck === true) {
                        var p = getMaskSet()["p"],
                            lvp = p == -1 ? p : seekPrevious(p),
                            pos = lvp == -1 ? ndx : seekNext(lvp);
                        if ($.inArray(charCode, getBufferTemplate().slice(lvp + 1, pos)) == -1) {
                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                        }
                    } else {
                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                        strict = strict || (ndx > 0 && ndx > getMaskSet()["p"]);
                    }
                });
            }

            function escapeRegex(str) {
                return $.inputmask.escapeRegex.call(this, str);
            }

            function truncateInput(inputValue) {
                return inputValue.replace(new RegExp("(" + escapeRegex(getBufferTemplate().join('')) + ")*$"), "");
            }

            function clearOptionalTail(input) {
                var buffer = getBuffer(), tmpBuffer = buffer.slice(), pos;
                for (pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                    var test = getTest(pos);
                    if ((test.optionality || test.optionalQuantifier) && tmpBuffer[pos] == getPlaceholder(pos)) {
                        tmpBuffer.pop();
                    } else break;
                }
                writeBuffer(input, tmpBuffer);
            }

            function unmaskedvalue($input, skipDatepickerCheck) {
                if ($input.data('_inputmask') && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    var umValue = $.map(getBuffer(), function (element, index) {
                        return isMask(index) && isValid(index, element, true) ? element : null;
                    });
                    var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
                    var bufferValue = (isRTL ? getBuffer().reverse() : getBuffer()).join('');
                    return $.isFunction(opts.onUnMask) ? opts.onUnMask.call($input, bufferValue, unmaskedValue, opts) : unmaskedValue;
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

                    if (!$(npt).is(':visible')) {
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
                    if (!$(npt).is(':visible') && data && data["caret"] != undefined) {
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

            function isComplete(buffer) { //return true / false / undefined (repeat *)
                if ($.isFunction(opts.isComplete)) return opts.isComplete.call($el, buffer, opts);
                if (opts.repeat == "*") return undefined;
                var complete = false,
                    aml = seekPrevious(getMaskLength());
                if (getLastValidPosition() == aml) {
                    complete = true;
                    for (var i = 0; i <= aml; i++) {
                        var mask = isMask(i);
                        if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceholder(i))) || (!mask && buffer[i] != getPlaceholder(i))) {
                            complete = false;
                            break;
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
                                var $elem = $(elem);
                                var result = valueSet(elem, value);
                                if ($elem.data('_inputmask')) $elem.triggerHandler('setvalue.inputmask');
                                return result;
                            },
                            inputmaskpatch: true
                        };
                    }
                }

                var valueProperty;
                if (Object.getOwnPropertyDescriptor)
                    valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                if (valueProperty && valueProperty.get) {
                    if (!npt._valueGet) {
                        var valueGet = valueProperty.get;
                        var valueSet = valueProperty.set;
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        Object.defineProperty(npt, "value", {
                            get: function () {
                                var $self = $(this), inputData = $(this).data('_inputmask'), maskset = inputData['maskset'];
                                return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != maskset['_buffer'].join('') ? valueGet.call(this) : '';
                            },
                            set: function (value) {
                                valueSet.call(this, value);
                                $(this).triggerHandler('setvalue.inputmask');
                            }
                        });
                    }
                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                    if (!npt._valueGet) {
                        var valueGet = npt.__lookupGetter__("value");
                        var valueSet = npt.__lookupSetter__("value");
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        npt.__defineGetter__("value", function () {
                            var $self = $(this), inputData = $(this).data('_inputmask'), maskset = inputData['maskset'];
                            return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != maskset['_buffer'].join('') ? valueGet.call(this) : '';
                        });
                        npt.__defineSetter__("value", function (value) {
                            valueSet.call(this, value);
                            $(this).triggerHandler('setvalue.inputmask');
                        });
                    }
                } else {
                    if (!npt._valueGet) {
                        npt._valueGet = function () { return isRTL ? this.value.split('').reverse().join('') : this.value; };
                        npt._valueSet = function (value) { this.value = isRTL ? value.split('').reverse().join('') : value; };
                    }
                    PatchValhook(npt.type);
                }
            }

            function HandleRemove(input, k, pos) {
                if (opts.numericInput || isRTL) {
                    switch (k) {
                        case opts.keyCode.BACKSPACE:
                            k = opts.keyCode.DELETE;
                            break;
                        case opts.keyCode.DELETE:
                            k = opts.keyCode.BACKSPACE;
                            break;
                    }
                    if (isRTL) {
                        var pend = pos.end;
                        pos.end = pos.begin;
                        pos.begin = pend;
                    }
                }

                if (pos.begin == pos.end) {
                    var posBegin = k == opts.keyCode.BACKSPACE ? pos.begin - 1 : pos.begin;
                    if (opts.isNumeric && opts.radixPoint != "" && getBuffer()[posBegin] == opts.radixPoint) {
                        pos.begin = (getBuffer().length - 1 == posBegin) /* radixPoint is latest? delete it */ ? pos.begin : k == opts.keyCode.BACKSPACE ? posBegin : seekNext(posBegin);
                        pos.end = pos.begin;
                    }
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin = seekPrevious(pos.begin);
                    else if (k == opts.keyCode.DELETE)
                        pos.end++;
                } else if (pos.end - pos.begin == 1 && !opts.insertMode) {
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin--;
                }

                stripValidPositions(pos.begin, pos.end);
                var firstMaskPos = seekNext(-1);
                if (getLastValidPosition() < firstMaskPos) {
                    getMaskSet()["p"] = firstMaskPos;
                } else {
                    getMaskSet()["p"] = pos.begin;
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
                    HandleRemove(input, k, pos);
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
                            caret(input, caretPos.begin - 1);
                        }, 0);
                    }
                }

                var currentCaretPos = caret(input);
                var keydownResult = opts.onKeyDown.call(this, e, getBuffer(), opts);
                if (keydownResult && keydownResult["refreshFromBuffer"] === true) { //extra stuff to execute on keydown
                    getMaskSet()["validPositions"] = {};
                    refreshFromBuffer(0, getBuffer().length);
                    caret(input, currentCaretPos.begin, currentCaretPos.end);
                }
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
                            HandleRemove(input, opts.keyCode.DELETE, pos);
                            if (!opts.insertMode) { //preserve some space
                                opts.insertMode = !opts.insertMode;
                                setValidPosition(pos.begin, undefined, strict);
                                opts.insertMode = !opts.insertMode;
                            }
                            isSlctn = !opts.multi;
                        }

                        var radixPosition = getBuffer().join('').indexOf(opts.radixPoint);
                        if (opts.isNumeric && checkval !== true && radixPosition != -1) {
                            if (opts.greedy && pos.begin <= radixPosition) {
                                pos.begin = seekPrevious(pos.begin);
                                pos.end = pos.begin;
                            } else if (c == opts.radixPoint) {
                                pos.begin = radixPosition;
                                pos.end = pos.begin;
                            }
                        }

                        getMaskSet()["writeOutBuffer"] = true;
                        var p = pos.begin;
                        var valResult = isValid(p, c, strict);
                        if (valResult !== false) {
                            if (valResult !== true) {
                                p = valResult.pos != undefined ? valResult.pos : p; //set new position from isValid
                                c = valResult.c != undefined ? valResult.c : c; //set new char from isValid
                            }
                            resetMaskSet(true);
                            forwardPosition = seekNext(p);
                            getMaskSet()["p"] = forwardPosition; //needed for checkval
                        }

                        if (writeOut !== false) {
                            var self = this;
                            setTimeout(function () { opts.onKeyValidation.call(self, valResult, opts); }, 0);
                            if (getMaskSet()["writeOutBuffer"] && valResult !== false) {
                                var buffer = getBuffer();

                                var newCaretPosition;
                                if (checkval) {
                                    newCaretPosition = undefined;
                                } else if (opts.numericInput) {
                                    if (p > radixPosition) {
                                        newCaretPosition = seekPrevious(forwardPosition);
                                    } else if (c == opts.radixPoint) {
                                        newCaretPosition = forwardPosition - 1;
                                    } else newCaretPosition = seekPrevious(forwardPosition - 1);
                                } else {
                                    newCaretPosition = forwardPosition;
                                }

                                writeBuffer(input, buffer, newCaretPosition);
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
                        if (e) e.preventDefault ? e.preventDefault() : e.returnValue = false;
                    }
                }
            }

            function keyupEvent(e) {
                var $input = $(this), input = this, k = e.keyCode, buffer = getBuffer();

                var keyupResult = opts.onKeyUp.call(this, e, buffer, opts);
                if (keyupResult && keyupResult["refreshFromBuffer"] === true) {
                    getMaskSet()["validPositions"] = {};
                    refreshFromBuffer(0, getBuffer().length);
                }
                if (k == opts.keyCode.TAB && opts.showMaskOnFocus) {
                    if ($input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        resetMaskSet();
                        buffer = getBuffer();
                        writeBuffer(input, buffer);
                        caret(input, 0);
                        valueOnFocus = getBuffer().join('');
                    } else {
                        writeBuffer(input, buffer);
                        if (buffer.join('') == getBufferTemplate().join('') && $.inArray(opts.radixPoint, buffer) != -1) {
                            caret(input, TranslatePosition(0));
                            $input.click();
                        } else
                            caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()));
                    }
                }
            }

            function pasteEvent(e) {
                if (skipInputEvent === true && e.type == "input") {
                    skipInputEvent = false;
                    return true;
                }

                var input = this, $input = $(input);
                //paste event for IE8 and lower I guess ;-)
                if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
                    return true;
                }
                setTimeout(function () {
                    var pasteValue = $.isFunction(opts.onBeforePaste) ? opts.onBeforePaste.call(input, input._valueGet(), opts) : input._valueGet();
                    checkVal(input, false, false, pasteValue.split(''), true);
                    writeBuffer(input, getBuffer());
                    if (isComplete(getBuffer()) === true)
                        $input.trigger("complete");
                    $input.click();
                }, 0);
            }

            function mobileInputEvent(e) {
                var input = this, $input = $(input);

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
                } else { //nonnumerics don't fire keypress 
                    checkVal(input, false, false, currentValue.split(''));
                    writeBuffer(input, getBuffer());
                    if (isComplete(getBuffer()) === true)
                        $input.trigger("complete");
                    $input.click();
                }
                e.preventDefault();
            }

            function mask(el) {
                $el = $(el);
                if ($el.is(":input")) {
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

                    patchValueProperty(el);

                    if (opts.numericInput) opts.isNumeric = opts.numericInput;
                    if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
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
                    $el.removeClass('focus.inputmask');
                    //bind events
                    $el.closest('form').bind("submit", function () { //trigger change on submit if any
                        if (valueOnFocus != getBuffer().join('')) {
                            $el.change();
                        }
                    }).bind('reset', function () {
                        setTimeout(function () {
                            $el.trigger("setvalue");
                        }, 0);
                    });
                    $el.bind("mouseenter.inputmask", function () {
                        var $input = $(this), input = this;
                        if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                            if (input._valueGet() != getBuffer().join('')) {
                                writeBuffer(input, getBuffer());
                            }
                        }
                    }).bind("blur.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getBuffer();
                        $input.removeClass('focus.inputmask');
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
                    }).bind("focus.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet();
                        if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                            if (input._valueGet() != getBuffer().join('')) {
                                writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
                            }
                        }
                        $input.addClass('focus.inputmask');
                        valueOnFocus = getBuffer().join('');
                    }).bind("mouseleave.inputmask", function () {
                        var $input = $(this), input = this;
                        if (opts.clearMaskOnLostFocus) {
                            if (!$input.hasClass('focus.inputmask') && input._valueGet() != $input.attr("placeholder")) {
                                if (input._valueGet() == getBufferTemplate().join('') || input._valueGet() == '')
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                        }
                    }).bind("click.inputmask", function () {
                        var input = this;
                        setTimeout(function () {
                            var selectedCaret = caret(input), buffer = getBuffer();
                            if (selectedCaret.begin == selectedCaret.end) {
                                var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
                                    lvp = getLastValidPosition(clickPosition),
                                    lastPosition;
                                if (opts.isNumeric) {
                                    lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ?
                                        (opts.numericInput ? seekNext($.inArray(opts.radixPoint, buffer)) : $.inArray(opts.radixPoint, buffer)) :
                                        seekNext(lvp);
                                } else {
                                    lastPosition = seekNext(lvp);
                                }
                                if (clickPosition < lastPosition) {
                                    if (isMask(clickPosition))
                                        caret(input, clickPosition);
                                    else caret(input, seekNext(clickPosition));
                                } else
                                    caret(input, lastPosition);
                            }
                        }, 0);
                    }).bind('dblclick.inputmask', function () {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getLastValidPosition()));
                        }, 0);
                    }).bind(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", pasteEvent
                    ).bind('setvalue.inputmask', function () {
                        var input = this;
                        checkVal(input, true);
                        valueOnFocus = getBuffer().join('');
                        if (input._valueGet() == getBufferTemplate().join(''))
                            input._valueSet('');
                    }).bind('complete.inputmask', opts.oncomplete
                    ).bind('incomplete.inputmask', opts.onincomplete
                    ).bind('cleared.inputmask', opts.oncleared);

                    $el.bind("keydown.inputmask", keydownEvent
                    ).bind("keypress.inputmask", keypressEvent
                    ).bind("keyup.inputmask", keyupEvent);

                    // as the other inputevents aren't reliable for the moment we only base on the input event
                    // needs follow-up
                    if (android || androidfirefox || androidchrome || kindle) {
                        $el.attr("autocomplete", "off")
                            .attr("autocorrect", "off")
                            .attr("autocapitalize", "off")
                            .attr("spellcheck", false);

                        if (androidfirefox || kindle) {
                            $el.unbind("keydown.inputmask", keydownEvent
                            ).unbind("keypress.inputmask", keypressEvent
                            ).unbind("keyup.inputmask", keyupEvent);
                            if (PasteEventType == "input") {
                                $el.unbind(PasteEventType + ".inputmask");
                            }
                            $el.bind("input.inputmask", mobileInputEvent);
                        }
                    }

                    if (msie1x)
                        $el.bind("input.inputmask", pasteEvent);

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
                    if (activeElement === el) { //position the caret when in focus
                        $el.addClass('focus.inputmask');
                        caret(el, seekNext(getLastValidPosition()));
                    } else if (opts.clearMaskOnLostFocus) {
                        if (getBuffer().join('') == getBufferTemplate().join('')) {
                            el._valueSet('');
                        } else {
                            clearOptionalTail(el);
                        }
                    } else {
                        writeBuffer(el, getBuffer());
                    }

                    installEventRuler(el);
                }
            }

            //action object
            if (actionObj != undefined) {
                switch (actionObj["action"]) {
                    case "isComplete":
                        $el = $(actionObj["el"]);
                        return isComplete(actionObj["buffer"]);
                    case "unmaskedvalue":
                        $el = actionObj["$input"];
                        isRTL = actionObj["$input"].data('_inputmask')['isRTL'];
                        return unmaskedvalue(actionObj["$input"], actionObj["skipDatepickerCheck"]);
                    case "mask":
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
                            opts.isNumeric = opts.numericInput;
                            isRTL = true;
                        }
                        var valueBuffer = actionObj["value"].split('');
                        checkVal($el, false, false, isRTL ? valueBuffer.reverse() : valueBuffer, true);
                        return isRTL ? getBuffer().reverse().join('') : getBuffer().join('');
                    case "isValid":
                        $el = $({});
                        $el.data('_inputmask', {
                            'maskset': maskset,
                            'opts': opts,
                            'isRTL': opts.numericInput
                        });
                        if (opts.numericInput) {
                            opts.isNumeric = opts.numericInput;
                            isRTL = true;
                        }
                        var valueBuffer = actionObj["value"].split('');
                        checkVal($el, false, true, isRTL ? valueBuffer.reverse() : valueBuffer);
                        return isComplete(getBuffer());
                }
            }
        };

        function multiMaskScope(el, masksets, opts) {
            function PatchValhookMulti(type) {
                if ($.valHooks[type] == undefined || $.valHooks[type].inputmaskmultipatch != true) {
                    var valueGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) { return elem.value; };
                    var valueSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                        elem.value = value;
                        return elem;
                    };

                    $.valHooks[type] = {
                        get: function (elem) {
                            var $elem = $(elem);
                            if ($elem.data('_inputmask-multi')) {
                                var data = $elem.data('_inputmask-multi');
                                return valueGet(data["elmasks"][data["activeMasksetIndex"]]);
                            } else return valueGet(elem);
                        },
                        set: function (elem, value) {
                            var $elem = $(elem);
                            var result = valueSet(elem, value);
                            if ($elem.data('_inputmask-multi')) $elem.triggerHandler('setvalue.inputmaskmulti');
                            return result;
                        },
                        inputmaskmultipatch: true
                    };
                }
            }
            function mcaret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                if (typeof begin == 'number') {
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    end = (typeof end == 'number') ? end : begin;

                    //store caret for multi scope
                    if (npt != el) {
                        var data = $(npt).data('_inputmask') || {};
                        data["caret"] = { "begin": begin, "end": end };
                        $(npt).data('_inputmask', data);
                    }
                    if (!$(npt).is(':visible')) {
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
                    if (!$(npt).is(':visible') && $(npt).data('_inputmask')["caret"] != undefined) {
                        var data = $(npt).data('_inputmask');
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
            function TranslatePosition(pos) {
                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
                    var bffrLght = el.value.length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            function determineActiveMask(eventType, elmasks) {
                if (eventType != "multiMaskScope") {
                    var lpc = -1, cp = -1, lvp = -1;;
                    $.each(elmasks, function (ndx, lmsk) {
                        var data = $(lmsk).data('_inputmask');
                        var maskset = data["maskset"];
                        var lastValidPosition = -1, validPositionCount = 0, caretPos = mcaret(lmsk).begin;
                        for (var posNdx in maskset["validPositions"]) {
                            var psNdx = parseInt(posNdx);
                            if (psNdx > lastValidPosition) lastValidPosition = psNdx;
                            validPositionCount++;
                        }
                        if (validPositionCount > lpc
                            || (validPositionCount == lpc && cp > caretPos && lvp > lastValidPosition)
                            || (validPositionCount == lpc && cp == caretPos && lvp < lastValidPosition)
                            ) {
                            //console.log("lvp " + lastValidPosition + " vpc " + validPositionCount + " caret " + caretPos + " ams " + ndx);
                            lpc = validPositionCount;
                            cp = caretPos;
                            activeMasksetIndex = ndx;
                            lvp = lastValidPosition;
                        }
                    });

                    if ($.isFunction(opts.determineActiveMasksetIndex)) activeMasksetIndex = opts.determineActiveMasksetIndex.call($el, eventType, elmasks);

                    var data = $el.data('_inputmask-multi') || { "activeMasksetIndex": 0, "elmasks": elmasks };
                    data["activeMasksetIndex"] = activeMasksetIndex;
                    $el.data('_inputmask-multi', data);
                }

                if (["focus"].indexOf(eventType) == -1 && el.value != elmasks[activeMasksetIndex]._valueGet()) {
                    var value = $(elmasks[activeMasksetIndex]).val() == "" ? elmasks[activeMasksetIndex]._valueGet() : $(elmasks[activeMasksetIndex]).val();
                    $el.val(value);
                }
                if (["blur", "focus"].indexOf(eventType) == -1) {
                    if ($(elmasks[activeMasksetIndex]).hasClass("focus.inputmask")) {
                        var activeCaret = mcaret(elmasks[activeMasksetIndex]);
                        mcaret(el, activeCaret.begin, activeCaret.end);
                    }
                }
            }
            opts.multi = true;
            var $el = $(el), isRTL = el.dir == "rtl" || opts.numericInput;
            var activeMasksetIndex = 0,
             elmasks = $.map(masksets, function (msk, ndx) {
                 var elMaskStr = '<input type="text" ';
                 if ($el.attr("value")) elMaskStr += 'value="' + $el.attr("value") + '" ';
                 if ($el.attr("dir")) elMaskStr += 'dir="' + $el.attr("dir") + '" ';
                 elMaskStr += '/>';
                 var elmask = $(elMaskStr)[0];
                 maskScope($.extend(true, {}, msk), opts, { "action": "mask", "el": elmask });
                 return elmask;
             });

            $el.data('_inputmask-multi', { "activeMasksetIndex": 0, "elmasks": elmasks });
            if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
                $el.css("text-align", "right");
            el.dir = "ltr";
            $el.removeAttr("dir");

            $el.bind("mouseenter blur focus mouseleave click dblclick keydown keypress keypress", function (e) {
                var caretPos = mcaret(el), k, goDetermine = true;
                if (e.type == "keydown") {
                    k = e.keyCode;
                    if (k == opts.keyCode.DOWN && activeMasksetIndex < elmasks.length - 1) {
                        activeMasksetIndex++;
                        determineActiveMask("multiMaskScope", elmasks);
                        return false;
                    } else if (k == opts.keyCode.UP && activeMasksetIndex > 0) {
                        activeMasksetIndex--;
                        determineActiveMask("multiMaskScope", elmasks);
                        return false;
                    } if (e.ctrlKey || e.shiftKey || e.altKey) {
                        return true;
                    }
                } else if (e.type == "keypress" && (e.ctrlKey || e.shiftKey || e.altKey)) {
                    return true;
                }
                $.each(elmasks, function (ndx, lmnt) {
                    if (e.type == "keydown") {
                        k = e.keyCode;

                        if (k == opts.keyCode.BACKSPACE && lmnt._valueGet().length < caretPos.begin) {
                            return;
                        } else if (k == opts.keyCode.TAB) {
                            goDetermine = false;
                        } else if (k == opts.keyCode.RIGHT) {
                            mcaret(lmnt, caretPos.begin + 1, caretPos.end + 1);
                            goDetermine = false;
                            return;
                        } else if (k == opts.keyCode.LEFT) {
                            mcaret(lmnt, caretPos.begin - 1, caretPos.end - 1);
                            goDetermine = false;
                            return;
                        }
                    }
                    if (["click"].indexOf(e.type) != -1) {
                        mcaret(lmnt, TranslatePosition(caretPos.begin), TranslatePosition(caretPos.end));
                        if (caretPos.begin != caretPos.end) {
                            goDetermine = false;
                            return;
                        }
                    }

                    if (["keydown"].indexOf(e.type) != -1 && caretPos.begin != caretPos.end) {
                        mcaret(lmnt, caretPos.begin, caretPos.end);
                    }

                    $(lmnt).triggerHandler(e);
                });
                if (goDetermine) {
                    setTimeout(function () {
                        determineActiveMask(e.type, elmasks);
                    }, 0);
                }
            });

            $el.bind(PasteEventType + " dragdrop drop setvalue.inputmaskmulti", function (e) {
                var caretPos = mcaret(el);
                setTimeout(function () {
                    $.each(elmasks, function (ndx, lmnt) {
                        lmnt._valueSet(el.value);
                        $(lmnt).triggerHandler(e);
                    });
                    setTimeout(function () {
                        determineActiveMask(e.type, elmasks);
                    }, 0);
                }, 0);
            });
            PatchValhookMulti(el.type);

            if ($el.attr("value") != "") {
                setTimeout(function () {
                    determineActiveMask("init", elmasks);
                }, 0);
            }
        };

        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: { start: "[", end: "]" },
                quantifiermarker: { start: "{", end: "}" },
                groupmarker: { start: "(", end: ")" },
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
                onBeforeMask: undefined, //executes before masking the initial value to allow preprocessing of the initial value.  args => initialValue, opts => return processedValue
                onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.  args => pastedValue, opts => return processedValue
                onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.  args => maskedValue, unmaskedValue, opts
                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                showTooltip: false, //show the activemask as tooltip
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                //numeric basic properties
                isNumeric: false, //enable numeric features
                radixPoint: "", //".", // | ","
                skipRadixDance: false, //disable radixpoint caret positioning
                rightAlignNumerics: true, //align numerics to the right
                //numeric basic properties
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
                        cardinality: 1,
                        definitionSymbol: "*"
                    },
                    '*': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                        cardinality: 1
                    }
                },
                keyCode: {
                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                },
                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                isComplete: undefined, //override for isComplete - args => buffer, opts - return true || false
                //multi-masks
                multi: false, //do not alter - internal use
                nojumps: false, //do not jump over fixed parts in the mask
                nojumpsThreshold: 0, //start nojumps as of
                determineActiveMasksetIndex: undefined //override determineActiveMasksetIndex - args => eventType, elmasks - return int
            },
            masksCache: {},
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            format: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope(generateMaskSet(opts), opts, { "action": "format", "value": value });
            },
            isValid: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope(generateMaskSet(opts), opts, { "action": "isValid", "value": value });
            }
        };
        $.fn.inputmask = function (fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options),
                maskset;

            if (typeof fn === "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options, opts);
                        maskset = generateMaskSet(opts);
                        if (maskset.length == 0) { return this; }

                        return this.each(function () {
                            if ($.isArray(maskset)) {
                                multiMaskScope(this, maskset, opts);
                            } else
                                maskScope($.extend(true, {}, maskset), opts, { "action": "mask", "el": this });
                        });
                    case "unmaskedvalue":
                        var $input = $(this), input = this;
                        if ($input.data('_inputmask')) {
                            maskset = $input.data('_inputmask')['maskset'];
                            opts = $input.data('_inputmask')['opts'];
                            return maskScope(maskset, opts, { "action": "unmaskedvalue", "$input": $input });
                        } else return $input.val();
                    case "remove":
                        return this.each(function () {
                            var $input = $(this), input = this;
                            if ($input.data('_inputmask')) {
                                maskset = $input.data('_inputmask')['maskset'];
                                opts = $input.data('_inputmask')['opts'];
                                //writeout the unmaskedvalue
                                input._valueSet(maskScope(maskset, opts, { "action": "unmaskedvalue", "$input": $input, "skipDatepickerCheck": true }));
                                //clear data
                                $input.removeData('_inputmask');
                                //unbind all events
                                $input.unbind(".inputmask");
                                $input.removeClass('focus.inputmask');
                                //restore the value property
                                var valueProperty;
                                if (Object.getOwnPropertyDescriptor)
                                    valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                if (valueProperty && valueProperty.get) {
                                    if (input._valueGet) {
                                        Object.defineProperty(input, "value", {
                                            get: input._valueGet,
                                            set: input._valueSet
                                        });
                                    }
                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                    if (input._valueGet) {
                                        input.__defineGetter__("value", input._valueGet);
                                        input.__defineSetter__("value", input._valueSet);
                                    }
                                }
                                try { //try catch needed for IE7 as it does not supports deleting fns
                                    delete input._valueGet;
                                    delete input._valueSet;
                                } catch (e) {
                                    input._valueGet = undefined;
                                    input._valueSet = undefined;

                                }
                            }
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('_inputmask')) {
                            maskset = this.data('_inputmask')['maskset'];
                            return maskset['_buffer'].join('');
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
                    case "isComplete":
                        if (this.data('_inputmask')) {
                            maskset = this.data('_inputmask')['maskset'];
                            opts = this.data('_inputmask')['opts'];
                            return maskScope(maskset, opts, { "action": "isComplete", "buffer": this[0]._valueGet().split(''), "el": this });
                        } else return true;
                    case "getmetadata": //return mask metadata if exists
                        if (this.data('_inputmask')) {
                            maskset = this.data('_inputmask')['maskset'];
                            return maskset['metadata'];
                        }
                        else return undefined;
                    default:
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options, opts)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        maskset = generateMaskSet(opts);
                        if (maskset == undefined) { return this; }
                        return this.each(function () {
                            if ($.isArray(maskset)) {
                                multiMaskScope(this, maskset, opts);
                            } else
                                maskScope($.extend(true, {}, maskset), opts, { "action": "mask", "el": this });
                        });

                        break;
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                resolveAlias(opts.alias, fn, opts); //resolve aliases
                maskset = generateMaskSet(opts);
                if (maskset == undefined) { return this; }
                return this.each(function () {
                    if ($.isArray(maskset)) {
                        multiMaskScope(this, maskset, opts);
                    } else
                        maskScope($.extend(true, {}, maskset), opts, { "action": "mask", "el": this });
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
                            $(this).inputmask(opts);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                });
            }
        };
    }
})(jQuery);
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.0.0

Optional extensions on the jquery.inputmask base
*/
(function ($) {
    //extra definitions
    $.extend($.inputmask.defaults.definitions, {
        'A': {
            validator: "[A-Za-z]",
            cardinality: 1,
            casing: "upper" //auto uppercasing
        },
        '#': {
            validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
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
                    validator: function (chrs, buffer, pos, strict, opts) {
                        return true;
                    },
                    cardinality: 8,
                    prevalidator: (function () {
                        var result = [], prefixLimit = 8;
                        for (var i = 0; i < prefixLimit; i++) {
                            result[i] = (function () {
                                var j = i;
                                return {
                                    validator: function (chrs, buffer, pos, strict, opts) {
                                        if (opts.regex["urlpre" + (j + 1)]) {
                                            var tmp = chrs, k;
                                            if (((j + 1) - chrs.length) > 0) {
                                                tmp = buffer.join('').substring(0, ((j + 1) - chrs.length)) + "" + tmp;
                                            }
                                            var isValid = opts.regex["urlpre" + (j + 1)].test(tmp);
                                            if (!strict && !isValid) {
                                                pos = pos - j;
                                                for (k = 0; k < opts.defaultPrefix.length; k++) {
                                                    buffer[pos] = opts.defaultPrefix[k]; pos++;
                                                }
                                                for (k = 0; k < tmp.length - 1; k++) {
                                                    buffer[pos] = tmp[k]; pos++;
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
                    validator: function (chrs, buffer, pos, strict, opts) {
                        if (pos - 1 > -1 && buffer[pos - 1] != ".") {
                            chrs = buffer[pos - 1] + chrs;
                            if (pos - 2 > -1 && buffer[pos - 2] != ".") {
                                chrs = buffer[pos - 2] + chrs;
                            } else chrs = "0" + chrs;
                        } else chrs = "00" + chrs;
                        return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            }
        },
        "email": {
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}.*{2,6}[.*{1,2}]",
            greedy: false
        }
    });
})(jQuery);
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.0.0

Optional extensions on the jquery.inputmask base
*/
(function ($) {
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
            onKeyUp: function (e, buffer, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString());
                }
            },
            definitions: {
                '1': { //val1 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val1.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.val1pre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val1.test("0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                '2': { //val2 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var frontValue = buffer.join('').substr(0, 3);
                        if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(0, 3);
                            if (frontValue.indexOf(opts.placeholder[0]) != -1) frontValue = "01" + opts.separator;
                            var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                'y': { //year
                    validator: function (chrs, buffer, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = buffer.join('').substr(0, 6);
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
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[0];
                                return { "pos": pos };
                            }
                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2);

                            isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[0];
                                buffer[pos++] = yearPrefix[1];
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                {
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        if (!strict && !isValid) {
                            var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);

                            isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (isValid) {
                                buffer[pos++] = yearPrefix[1];
                                return { "pos": pos };
                            }

                            yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                            if (opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                var dayMonthValue = buffer.join('').substr(0, 6);
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
                                buffer[pos - 1] = yearPrefix[0];
                                buffer[pos++] = yearPrefix[1];
                                buffer[pos++] = chrs[0];
                                return { "pos": pos };
                            }
                        }
                        return isValid;
                    }, cardinality: 2
                },
                {
                    validator: function (chrs, buffer, pos, strict, opts) {
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
            onKeyUp: function (e, buffer, opts) {
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
            onKeyUp: function (e, buffer, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode == opts.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString());
                }
            },
            definitions: {
                '2': { //val2 ~ day or month
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var frontValue = buffer.join('').substr(5, 3);
                        if (frontValue.indexOf(opts.placeholder[5]) != -1) frontValue = "01" + opts.separator;
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.separator || "-./".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    return { "pos": pos, "c": chrs.charAt(0) };
                                }
                            }
                        }

                        //check leap yeap
                        if (isValid) {
                            var dayMonthValue = buffer.join('').substr(4, 4) + chrs;
                            if (dayMonthValue != opts.leapday)
                                return true;
                            else {
                                var year = parseInt(buffer.join('').substr(0, 4), 10);  //detect leap year
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
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var frontValue = buffer.join('').substr(5, 3);
                            if (frontValue.indexOf(opts.placeholder[5]) != -1) frontValue = "01" + opts.separator;
                            var isValid = opts.regex.val2pre(opts.separator).test(frontValue + chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
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
                ampm: new RegExp("^[a|p|A|P][m|M]")
            },
            timeseparator: ':',
            hourFormat: "24", // or 12
            definitions: {
                'h': { //hours
                    validator: function (chrs, buffer, pos, strict, opts) {
                        if (opts.hourFormat == "24") {
                            if (parseInt(chrs, 10) == 24) {
                                buffer[pos - 1] = "0";
                                buffer[pos] = "0";
                                return { "refreshFromBuffer": { start: pos - 1, end: pos }, "c": "0" };
                            }
                        }

                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid) {
                            if (chrs.charAt(1) == opts.timeseparator || "-.:".indexOf(chrs.charAt(1)) != -1) {
                                isValid = opts.regex.hrs.test("0" + chrs.charAt(0));
                                if (isValid) {
                                    buffer[pos - 1] = "0";
                                    buffer[pos] = chrs.charAt(0);
                                    pos++;
                                    return { "refreshFromBuffer": { start: pos - 2, end: pos }, "pos": pos, "c": opts.timeseparator };
                                }
                            }
                        }

                        if (isValid && opts.hourFormat !== "24" && opts.regex.hrs24.test(chrs)) {

                            var tmp = parseInt(chrs, 10);

                            if (tmp == 24) {
                                buffer[pos + 5] = "a";
                                buffer[pos + 6] = "m";
                            } else {
                                buffer[pos + 5] = "p";
                                buffer[pos + 6] = "m";
                            }

                            tmp = tmp - 12;

                            if (tmp < 10) {
                                buffer[pos] = tmp.toString();
                                buffer[pos - 1] = "0";
                            } else {
                                buffer[pos] = tmp.toString().charAt(1);
                                buffer[pos - 1] = tmp.toString().charAt(0);
                            }

                            return { "refreshFromBuffer": { start: pos - 1, end: pos + 6 }, "c": buffer[pos] };
                        }

                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function (chrs, buffer, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            if (!strict && !isValid) {
                                isValid = opts.regex.hrs.test("0" + chrs);
                                if (isValid) {
                                    buffer[pos] = "0";
                                    pos++;
                                    return { "pos": pos };
                                }
                            }
                            return isValid;
                        }, cardinality: 1
                    }]
                },
                't': { //am/pm
                    validator: function (chrs, buffer, pos, strict, opts) {
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
            autoUnmask: false
        },
        'hh:mm': {
            mask: "h:s",
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
})(jQuery);
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.0.0

Optional extensions on the jquery.inputmask base
*/
(function ($) {
    //number aliases
    $.extend($.inputmask.defaults.aliases, {
        'decimal': {
            mask: "~",
            placeholder: "",
            repeat: "*",
            greedy: false,
            numericInput: false,
            isNumeric: true,
            digits: "*", //number of fractionalDigits
            groupSeparator: "",//",", // | "."
            radixPoint: ".",
            groupSize: 3,
            autoGroup: false,
            allowPlus: true,
            allowMinus: true,
            //todo
            integerDigits: "*", //number of integerDigits
            defaultValue: "",
            prefix: "",
            suffix: "",
            postFormat: function (buffer, pos, reformatOnly, opts) {
                if (opts.groupSeparator == "") return pos;
                var cbuf = buffer.slice(),
                    radixPos = $.inArray(opts.radixPoint, buffer);
                if (!reformatOnly) {
                    cbuf.splice(pos, 0, "?"); //set position indicator
                }
                var bufVal = cbuf.join('');
                if (opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) != -1)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), '');
                    var radixSplit = bufVal.split(opts.radixPoint);
                    bufVal = radixSplit[0];
                    var reg = new RegExp('([-\+]?[\\d\?]+)([\\d\?]{' + opts.groupSize + '})');
                    while (reg.test(bufVal)) {
                        bufVal = bufVal.replace(reg, '$1' + opts.groupSeparator + '$2');
                        bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    }
                    if (radixSplit.length > 1)
                        bufVal += opts.radixPoint + radixSplit[1];
                }
                buffer.length = bufVal.length; //align the length
                for (var i = 0, l = bufVal.length; i < l; i++) {
                    buffer[i] = bufVal.charAt(i);
                }
                var newPos = $.inArray("?", buffer);
                if (!reformatOnly) buffer.splice(newPos, 1);

                return reformatOnly ? pos : newPos;
            },
            regex: {
                number: function (opts) {
                    var escapedRadixPoint = $.inputmask.escapeRegex.call(this, opts.radixPoint);
                    var digitExpression = isNaN(opts.digits) ? opts.digits : '{0,' + opts.digits + '}';
                    var integerExpression = isNaN(opts.integerDigits) ? opts.integerDigits : '{1,' + opts.integerDigits + '}';
                    var signedExpression = opts.allowPlus || opts.allowMinus ? "[" + (opts.allowPlus ? "\+" : "") + (opts.allowMinus ? "-" : "") + "]?" : "";                   

                    var currentRegExp = "^" + signedExpression + "\\d" + integerExpression + "(" + escapedRadixPoint + "\\d" + digitExpression + ")?$";
                    return new RegExp(currentRegExp);

                }
            },
            onKeyDown: function (e, buffer, opts) {
                var $input = $(this), input = this;
                if (e.keyCode == opts.keyCode.TAB) {
                    var radixPosition = $.inArray(opts.radixPoint, buffer);
                    if (radixPosition != -1) {
                        var masksets = $input.data('_inputmask')['masksets'];
                        var activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                        for (var i = 1; i <= opts.digits && i < opts.getMaskLength(masksets[activeMasksetIndex]["_buffer"], opts.greedy, opts.repeat, buffer, opts) ; i++) {
                            if (buffer[radixPosition + i] == undefined || buffer[radixPosition + i] == "") buffer[radixPosition + i] = "0";
                        }
                        return { "refreshFromBuffer": true };
                    }
                } else if (e.keyCode == opts.keyCode.DELETE || e.keyCode == opts.keyCode.BACKSPACE) {
                    opts.postFormat(buffer, 0, true, opts);
                    input._valueSet(buffer.join(''));
                    return { "refreshFromBuffer": true };
                }
            },
            definitions: {
                '~': { //real number
                    validator: function (chrs, buffer, pos, strict, opts) {
                        var iopts = $.extend({}, opts, { digits: strict ? "*" : opts.digits });
                        if (chrs == "") return false;
                        if (!strict && pos <= 1 && buffer[0] === '0' && new RegExp("[\\d-]").test(chrs) && buffer.join('').length == 1) { //handle first char
                            buffer[0] = "";
                            return { "pos": 0 };
                        }

                        var cbuf = strict ? buffer.slice(0, pos) : buffer.slice();

                        cbuf.splice(pos, 0, chrs);
                        var bufferStr = cbuf.join('');

                        //strip groupseparator
                        var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                        bufferStr = bufferStr.replace(new RegExp(escapedGroupSeparator, "g"), '');
                        if (strict && bufferStr.lastIndexOf(opts.radixPoint) == bufferStr.length - 1) {
                            var escapedRadixPoint = $.inputmask.escapeRegex.call(this, opts.radixPoint);
                            bufferStr = bufferStr.replace(new RegExp(escapedRadixPoint, "g"), '');
                        }
                        if (!strict && bufferStr == "") return false;

                        var isValid = opts.regex.number(iopts).test(bufferStr);
                        if (!isValid) {
                            //let's help the regex a bit
                            bufferStr += "0";
                            isValid = opts.regex.number(iopts).test(bufferStr);
                            if (!isValid) {
                                //make a valid group
                                var lastGroupSeparator = bufferStr.lastIndexOf(opts.groupSeparator);
                                for (var i = bufferStr.length - lastGroupSeparator; i <= 3; i++) {
                                    bufferStr += "0";
                                }

                                isValid = opts.regex.number(iopts).test(bufferStr);
                                if (!isValid && !strict) {
                                    if (chrs == opts.radixPoint) {
                                        isValid = opts.regex.number(iopts).test("0" + bufferStr + "0");
                                        if (isValid) {
                                            buffer[pos] = "0";
                                            pos++;
                                            return { "pos": pos };
                                        }
                                    }
                                }
                            }
                        }

                        if (isValid != false && !strict && chrs != opts.radixPoint) {
                            var newPos = opts.postFormat(buffer, pos, (chrs == "-" || chrs == "+") ? true : false, opts);
                            return { "pos": newPos, "refreshFromBuffer": true };
                        }

                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                }
            },
            insertMode: true,
            autoUnmask: false
        },
        'integer': {
            regex: {
                number: function (opts) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    var signedExpression = opts.allowPlus || opts.allowMinus ? "[" + (opts.allowPlus ? "\+" : "") + (opts.allowMinus ? "-" : "") + "]?" : "";
                    return new RegExp("^" + signedExpression + "(\\d+|\\d{1," + opts.groupSize + "}((" + escapedGroupSeparator + "\\d{" + opts.groupSize + "})?)+)$");
                }
            },
            alias: "decimal"
        }
    });
})(jQuery);
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.0.0

Regex extensions on the jquery.inputmask base
Allows for using regular expressions as a mask
*/
(function ($) {
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
                    validator: function (chrs, buffer, pos, strict, opts) {
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
                                    var crrntndx = token["matches"].indexOf(matchToken),
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
                                    if (matchToken[0] == "[") {
                                        testExp = regexPart;
                                        testExp += matchToken;
                                        for (var j = 0; j < openGroupCount; j++) {
                                            testExp += ")";
                                        }
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        isvalid = exp.test(bufferStr);
                                    } else {
                                        for (var l = 0, tl = matchToken.length; l < tl; l++) {
                                            if (matchToken[l] == "\\") continue;
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

                        var cbuffer = buffer.slice(), regexPart = "", isValid = false, openGroupCount = 0;
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
})(jQuery);
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 3.0.0

Phone extension.
When using this extension make sure you specify the correct url to get the masks

 $(selector).inputmask("phone", {
                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json", 
                onKeyValidation: function () { //show some metadata in the console
                    console.log($(this).inputmask("getmetadata")["name_en"]);
                } 
  });


*/
(function ($) {
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

                maskList.splice(0, 0, "+p(ppp)ppp-pppp");
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

                maskList.splice(0, 0, "+32(ppp)ppp-pppp");
                return maskList;
            },
            nojumps: true,
            nojumpsThreshold: 4
        }
    });
})(jQuery);
