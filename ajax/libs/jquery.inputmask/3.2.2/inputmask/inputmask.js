/*!
* inputmask.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2015 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.2
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "inputmask.dependencyLib" ], factory) : "object" == typeof exports ? module.exports = factory(require("./inputmask.dependencyLib.jquery")) : factory(window.dependencyLib || jQuery);
}(function($) {
    function Inputmask(alias, options) {
        return this instanceof Inputmask ? ("object" == typeof alias ? options = alias : (options = options || {}, 
        options.alias = alias), this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options), 
        this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
        void resolveAlias(this.opts.alias, options, this.opts)) : new Inputmask(alias, options);
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function isInputTypeSupported(inputType) {
        var isSupported = "text" === inputType || "tel" === inputType || "password" === inputType;
        if (!isSupported) {
            var el = document.createElement("input");
            el.setAttribute("type", inputType), isSupported = "text" === el.type, el = null;
        }
        return isSupported;
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = opts.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
        !1);
    }
    function importAttributeOptions(npt, opts, userOptions) {
        function importOption(option) {
            var optionData = npt.getAttribute("data-inputmask-" + option.toLowerCase());
            null !== optionData && (optionData = "boolean" == typeof optionData ? optionData : optionData.toString(), 
            "string" == typeof optionData && 0 === option.indexOf("on") && (optionData = eval("(" + optionData + ")")), 
            "mask" === option && 0 === optionData.indexOf("[") ? (userOptions[option] = optionData.replace(/[\s[\]]/g, "").split(","), 
            userOptions[option][0] = userOptions[option][0].replace("'", ""), userOptions[option][userOptions[option].length - 1] = userOptions[option][userOptions[option].length - 1].replace("'", "")) : userOptions[option] = optionData);
        }
        var attrOptions = npt.getAttribute("data-inputmask");
        if (attrOptions && "" !== attrOptions) try {
            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
            var dataoptions = $.parseJSON("{" + attrOptions + "}");
            $.extend(!0, userOptions, dataoptions);
        } catch (ex) {}
        for (var option in opts) importOption(option);
        if (userOptions.alias) {
            resolveAlias(userOptions.alias, userOptions, opts);
            for (option in opts) importOption(option);
        }
        return $.extend(!0, opts, userOptions), opts;
    }
    function generateMaskSet(opts, nocache) {
        function analyseMask(mask) {
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, 
                this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                var maskdef = opts.definitions[element];
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (maskdef && !escaped) {
                    maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder.call(this, opts) : maskdef.placeholder;
                    for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                        var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                        mtoken.matches.splice(position++, 0, {
                            fn: validator ? "string" == typeof validator ? new RegExp(validator) : new function() {
                                this.test = validator;
                            }() : new RegExp("."),
                            cardinality: cardinality ? cardinality : 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            mask: element
                        }), prevMatch = mtoken.matches[position - 1];
                    }
                    mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator) : new function() {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        cardinality: maskdef.cardinality,
                        optionality: mtoken.isOptional,
                        newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        mask: element
                    });
                } else mtoken.matches.splice(position++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: mtoken.isOptional,
                    newBlockMarker: void 0 === prevMatch || prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: void 0,
                    mask: element
                }), escaped = !1;
            }
            function verifyGroupMarker(lastMatch, isOpenGroup) {
                lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                isOpenGroup !== !0 && insertTestDefinition(lastMatch, opts.groupmarker.end));
            }
            function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
                currentToken.matches.length > 0 && (void 0 === extraCondition || extraCondition) && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
                verifyGroupMarker(lastMatch)), insertTestDefinition(currentToken, m);
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else maskCurrentToken(m, currentToken, lastMatch);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
                    st;
                }
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
                return maskToken;
            }
            for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) if (m = match[0], 
            escaped) defaultCase(); else switch (m.charAt(0)) {
              case opts.escapeChar:
                escaped = !0;
                break;

              case opts.optionalmarker.end:
              case opts.groupmarker.end:
                if (openingToken = openenings.pop(), void 0 !== openingToken) if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken); else defaultCase();
                break;

              case opts.optionalmarker.start:
                openenings.push(new MaskToken(!1, !0));
                break;

              case opts.groupmarker.start:
                openenings.push(new MaskToken(!0));
                break;

              case opts.quantifiermarker.start:
                var quantifier = new MaskToken(!1, !1, !0);
                m = m.replace(/[{}]/g, "");
                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                if (("*" === mq1 || "+" === mq1) && (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                    min: mq0,
                    max: mq1
                }, openenings.length > 0) {
                    var matches = openenings[openenings.length - 1].matches;
                    match = matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), groupToken.matches.push(match), 
                    match = groupToken), matches.push(match), matches.push(quantifier);
                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), 
                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
                currentToken.matches.push(quantifier);
                break;

              case opts.alternatormarker:
                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
                lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new MaskToken(!1, !1, !1, !0), 
                alternator.matches.push(lastMatch), openenings.push(alternator));
                break;

              default:
                defaultCase();
            }
            for (;openenings.length > 0; ) openingToken = openenings.pop(), verifyGroupMarker(openingToken, !0), 
            currentToken.matches.push(openingToken);
            return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
            verifyGroupMarker(lastMatch), maskTokens.push(currentToken)), opts.numericInput && reverseTokens(maskTokens[0]), 
            maskTokens;
        }
        function generateMask(mask, metadata) {
            if (null === mask || "" === mask) return void 0;
            if (1 === mask.length && opts.greedy === !1 && 0 !== opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition;
            return void 0 === Inputmask.prototype.masksCache[mask] || nocache === !0 ? (masksetDefinition = {
                mask: mask,
                maskToken: analyseMask(mask),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: metadata
            }, nocache !== !0 && (Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask] = masksetDefinition)) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[mask]), 
            masksetDefinition;
        }
        function preProcessMask(mask) {
            return mask = mask.toString();
        }
        var ms;
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask.call(this, opts)), $.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = null === opts.keepStatic ? !0 : opts.keepStatic;
                var altMask = "(";
                return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                    altMask.length > 1 && (altMask += ")|("), altMask += preProcessMask(void 0 === msk.mask || $.isFunction(msk.mask) ? msk : msk.mask);
                }), altMask += ")", generateMask(altMask, opts.mask);
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && (ms = void 0 === opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(preProcessMask(opts.mask), opts.mask) : generateMask(preProcessMask(opts.mask.mask), opts.mask)), 
        ms;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0;
            do {
                if (baseOnInput === !0 && getMaskSet().validPositions[pos]) {
                    var validPos = getMaskSet().validPositions[pos];
                    test = validPos.match, ndxIntlzr = validPos.locator.slice(), maskTemplate.push(includeInput === !0 ? validPos.input : getPlaceholder(pos, test));
                } else testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, 
                ndxIntlzr = testPos.locator.slice(), maskTemplate.push(getPlaceholder(pos, test));
                pos++;
            } while ((void 0 === maxLength || maxLength > pos - 1) && null !== test.fn || null === test.fn && "" !== test.def || minimalPos >= pos);
            return maskTemplate.pop(), maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = void 0, maskset.tests = {}, soft !== !0 && (maskset._buffer = void 0, 
            maskset.validPositions = {}, maskset.p = 0);
        }
        function getLastValidPosition(closestTo, strict) {
            var maskset = getMaskSet(), lastValidPosition = -1, valids = maskset.validPositions;
            void 0 === closestTo && (closestTo = -1);
            var before = lastValidPosition, after = lastValidPosition;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || null !== valids[psNdx].match.fn) && (closestTo >= psNdx && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return lastValidPosition = -1 !== before && closestTo - before > 1 || closestTo > after ? before : after;
        }
        function setValidPosition(pos, validTest, fromSetValid) {
            if (opts.insertMode && void 0 !== getMaskSet().validPositions[pos] && void 0 === fromSetValid) {
                var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition();
                for (i = pos; lvp >= i; i++) delete getMaskSet().validPositions[i];
                getMaskSet().validPositions[pos] = validTest;
                var j, valid = !0, vps = getMaskSet().validPositions;
                for (i = j = pos; lvp >= i; i++) {
                    var t = positionsClone[i];
                    if (void 0 !== t) for (var posMatch = j, prevPosMatch = -1; posMatch < getMaskLength() && (null == t.match.fn && vps[i] && (vps[i].match.optionalQuantifier === !0 || vps[i].match.optionality === !0) || null != t.match.fn); ) {
                        if (null === t.match.fn || !opts.keepStatic && vps[i] && (void 0 !== vps[i + 1] && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || void 0 !== vps[i].alternation) ? posMatch++ : posMatch = seekNext(j), 
                        positionCanMatchDefinition(posMatch, t.match.def)) {
                            valid = isValid(posMatch, t.input, !0, !0) !== !1, j = posMatch;
                            break;
                        }
                        if (valid = null == t.match.fn, prevPosMatch === posMatch) break;
                        prevPosMatch = posMatch;
                    }
                    if (!valid) break;
                }
                if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                !1;
            } else getMaskSet().validPositions[pos] = validTest;
            return !0;
        }
        function stripValidPositions(start, end, nocheck, strict) {
            var i, startPos = start;
            for (getMaskSet().p = start, i = startPos; end > i; i++) void 0 !== getMaskSet().validPositions[i] && (nocheck === !0 || opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== !1) && delete getMaskSet().validPositions[i];
            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                for (;void 0 !== getMaskSet().validPositions[startPos]; ) startPos++;
                var s = getMaskSet().validPositions[startPos];
                startPos > i && (i = startPos + 1);
                var t = getMaskSet().validPositions[i];
                void 0 !== t && isMask(i) && void 0 === s ? (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t.input, !0) !== !1 && (delete getMaskSet().validPositions[i], 
                i++), startPos++) : i++;
            }
            var lvp = getLastValidPosition(), ml = getMaskLength();
            for (strict !== !0 && nocheck !== !0 && void 0 !== getMaskSet().validPositions[lvp] && getMaskSet().validPositions[lvp].input === opts.radixPoint && delete getMaskSet().validPositions[lvp], 
            i = lvp + 1; ml >= i; i++) getMaskSet().validPositions[i] && delete getMaskSet().validPositions[i];
            resetMaskSet(!0);
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var testPos = getMaskSet().validPositions[pos];
            if (void 0 === testPos) for (var testPositions = getTests(pos, ndxIntlzr, tstPs), lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
            !(testPos.match && (opts.greedy && testPos.match.optionalQuantifier !== !0 || (testPos.match.optionality === !1 || testPos.match.newBlockMarker === !1) && testPos.match.optionalQuantifier !== !0) && (void 0 === lvTest.alternation || lvTest.alternation !== testPos.alternation || void 0 !== testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr)))); ndx++) ;
            return testPos;
        }
        function getTest(pos) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos].match : getTests(pos)[0].match;
        }
        function positionCanMatchDefinition(pos, def) {
            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                valid = !0;
                break;
            }
            return valid;
        }
        function getTests(pos, ndxIntlzr, tstPs, cacheable) {
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    if (testPos === pos && void 0 === match.matches) return matches.push({
                        match: match,
                        locator: loopNdx.reverse()
                    }), !0;
                    if (void 0 !== match.matches) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                if (latestMatch = matches[matches.length - 1].match, isFirstMatch = 0 === $.inArray(latestMatch, optionalToken.matches), 
                                !isFirstMatch) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 === altIndex || "string" == typeof altIndex) {
                                var currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                "string" == typeof altIndex && (altIndexArr = altIndex.split(","));
                                for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                                    if (matches = [], match = handleMatch(alternateToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
                                    match !== !0 && void 0 !== match && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                        var ntndx = maskToken.matches.indexOf(match) + 1;
                                        maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse), 
                                        match && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
                                            lmnt.alternation = loopNdx.length - 1;
                                        })));
                                    }
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var i = 0; i < ndxInitializerClone.length; i++) ndxInitializer[i] = ndxInitializerClone[i];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1];
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if (altMatch.match.mask === altMatch2.match.mask && ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr))) {
                                                maltMatches.splice(ndx1, 1), ndx1--, altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                altMatch2.alternation = altMatch.alternation;
                                                break;
                                            }
                                        }
                                    }
                                    malternateMatches = malternateMatches.concat(maltMatches);
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var mamatch, alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                        lmnt.locator[alternation] = void 0, lmnt.alternation = void 0;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = -1 !== $.inArray(altLocArr[alndx], altIndexArr), 
                                        mamatch && (void 0 !== lmnt.locator[alternation] ? (lmnt.locator[alternation] += ",", 
                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                        lmnt.alternation = alternation);
                                        if (void 0 !== lmnt.locator[alternation]) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0;
                            } else match = alternateToken.matches[altIndex] ? handleMatch(alternateToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse) : !1;
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && pos >= testPos; qndx++) {
                            var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                isFirstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches)) {
                                    if (qndx > qt.quantifier.min - 1) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return !0;
                                }
                                return !0;
                            }
                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (maskToken.matches[tndx].isQuantifier !== !0) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match;
                    if (testPos > pos) break;
                }
            }
            var latestMatch, isFirstMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [ 0 ], matches = [], insertStop = !1;
            if (cacheable === !0 && getMaskSet().tests[pos]) return getMaskSet().tests[pos];
            if (void 0 === ndxIntlzr) {
                for (var test, previousPos = pos - 1; void 0 === (test = getMaskSet().validPositions[previousPos]) && previousPos > -1 && (!getMaskSet().tests[previousPos] || void 0 === (test = getMaskSet().tests[previousPos][0])); ) previousPos--;
                void 0 !== test && previousPos > -1 && (testPos = previousPos, ndxInitializer = test.locator.slice());
            }
            for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                if (match && testPos === pos || testPos > pos) break;
            }
            return (0 === matches.length || insertStop) && matches.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), getMaskSet().tests[pos] = $.extend(!0, [], matches), getMaskSet().tests[pos];
        }
        function getBufferTemplate() {
            return void 0 === getMaskSet()._buffer && (getMaskSet()._buffer = getMaskTemplate(!1, 1)), 
            getMaskSet()._buffer;
        }
        function getBuffer() {
            return void 0 === getMaskSet().buffer && (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
            getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end, buffer) {
            var i;
            if (buffer = buffer || getBuffer().slice(), start === !0) resetMaskSet(), start = 0, 
            end = buffer.length; else for (i = start; end > i; i++) delete getMaskSet().validPositions[i], 
            delete getMaskSet().tests[i];
            for (i = start; end > i; i++) resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter && isValid(i, buffer[i], !0, !0);
        }
        function casing(elem, test) {
            switch (test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2) {
            for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function isValid(pos, c, strict, fromSetValid) {
            function _isValid(position, c, strict, fromSetValid) {
                var rslt = !1;
                return $.each(getTests(position), function(ndx, tst) {
                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                    if (c && (chrs += c), rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts) : c !== test.def && c !== opts.skipOptionalPartCharacter || "" === test.def ? !1 : {
                        c: test.def,
                        pos: position
                    }, rslt !== !1) {
                        var elem = void 0 !== rslt.c ? rslt.c : c;
                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? test.def : elem;
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if (void 0 !== rslt.remove && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                        $.each(rslt.remove.sort(function(a, b) {
                            return b - a;
                        }), function(ndx, lmnt) {
                            stripValidPositions(lmnt, lmnt + 1, !0);
                        })), void 0 !== rslt.insert && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                        $.each(rslt.insert.sort(function(a, b) {
                            return a - b;
                        }), function(ndx, lmnt) {
                            isValid(lmnt.pos, lmnt.c, !0);
                        })), rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
                            void 0 === rslt.pos && void 0 === rslt.c) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if (validatedPos = void 0 !== rslt.pos ? rslt.pos : position, validatedPos !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                            !1;
                        } else if (rslt !== !0 && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos, 
                        refreshFromBuffer(position, validatedPos), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                        !1;
                        return rslt !== !0 && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (ndx > 0 && resetMaskSet(!0), 
                        setValidPosition(validatedPos, $.extend({}, tst, {
                            input: casing(elem, test)
                        }), fromSetValid) || (rslt = !1), !1);
                    }
                }), rslt;
            }
            function alternate(pos, c, strict, fromSetValid) {
                for (var lastAlt, alternation, isValidRslt, altPos, i, validPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), lAlt = getLastValidPosition(); lAlt >= 0 && (altPos = getMaskSet().validPositions[lAlt], 
                !altPos || void 0 === altPos.alternation || (lastAlt = lAlt, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                getTestTemplate(lastAlt).locator[altPos.alternation] === altPos.locator[altPos.alternation])); lAlt--) ;
                if (void 0 !== alternation) {
                    lastAlt = parseInt(lastAlt);
                    for (var decisionPos in getMaskSet().validPositions) if (decisionPos = parseInt(decisionPos), 
                    altPos = getMaskSet().validPositions[decisionPos], decisionPos >= lastAlt && void 0 !== altPos.alternation) {
                        var altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].toString().split(","), decisionTaker = altPos.locator[alternation] || altNdxs[0];
                        decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                        for (var mndx = 0; mndx < altNdxs.length; mndx++) if (decisionTaker < altNdxs[mndx]) {
                            for (var possibilityPos, possibilities, dp = decisionPos; dp >= 0; dp--) if (possibilityPos = getMaskSet().validPositions[dp], 
                            void 0 !== possibilityPos) {
                                possibilities = possibilityPos.locator[alternation], possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
                                break;
                            }
                            if (decisionTaker !== possibilityPos.locator[alternation]) {
                                var validInputs = [], staticInputsBeforePos = 0;
                                for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) validPos = getMaskSet().validPositions[i], 
                                validPos && (null != validPos.match.fn ? validInputs.push(validPos.input) : pos > i && staticInputsBeforePos++), 
                                delete getMaskSet().validPositions[i], delete getMaskSet().tests[i];
                                for (resetMaskSet(!0), opts.keepStatic = !opts.keepStatic, isValidRslt = !0; validInputs.length > 0; ) {
                                    var input = validInputs.shift();
                                    if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition() + 1, input, !1, !0))) break;
                                }
                                if (possibilityPos.alternation = alternation, possibilityPos.locator[alternation] = possibilities, 
                                isValidRslt) {
                                    var targetLvp = getLastValidPosition(pos) + 1, staticInputsBeforePosAlternate = 0;
                                    for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) validPos = getMaskSet().validPositions[i], 
                                    validPos && null == validPos.match.fn && pos > i && staticInputsBeforePosAlternate++;
                                    pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
                                }
                                if (opts.keepStatic = !opts.keepStatic, isValidRslt) return isValidRslt;
                                resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                            }
                        }
                        break;
                    }
                }
                return !1;
            }
            function trackbackAlternations(originalPos, newPos) {
                for (var vp = getMaskSet().validPositions[newPos], targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; newPos > ps; ps++) if (!isMask(ps)) {
                    var tests = getTests(ps), bestMatch = tests[0], equality = -1;
                    $.each(tests, function(ndx, tst) {
                        for (var i = 0; tll > i; i++) tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(",")) && i > equality && (equality = i, 
                        bestMatch = tst);
                    }), setValidPosition(ps, $.extend({}, bestMatch, {
                        input: bestMatch.match.def
                    }), !0);
                }
            }
            strict = strict === !0;
            for (var buffer = getBuffer(), pndx = pos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
            for (pndx++; pos > pndx; pndx++) void 0 === getMaskSet().validPositions[pndx] && ((!isMask(pndx) || buffer[pndx] !== getPlaceholder(pndx)) && getTests(pndx).length > 1 || buffer[pndx] === opts.radixPoint || "0" === buffer[pndx] && $.inArray(opts.radixPoint, buffer) < pndx) && _isValid(pndx, buffer[pndx], !0);
            var maskPos = pos, result = !1, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
            if (maskPos < getMaskLength() && (getBuffer(), result = _isValid(maskPos, c, strict, fromSetValid), 
            (!strict || fromSetValid) && result === !1)) {
                var currentPosValid = getMaskSet().validPositions[maskPos];
                if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                    if ((opts.insertMode || void 0 === getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); snPos >= nPos; nPos++) if (result = _isValid(nPos, c, strict, fromSetValid), 
                    result !== !1) {
                        trackbackAlternations(maskPos, nPos), maskPos = nPos;
                        break;
                    }
                } else result = {
                    caret: seekNext(maskPos)
                };
            }
            if (result === !1 && opts.keepStatic && isComplete(buffer) && (result = alternate(pos, c, strict, fromSetValid)), 
            result === !0 && (result = {
                pos: maskPos
            }), $.isFunction(opts.postValidation) && result !== !1 && !strict) {
                resetMaskSet(!0);
                var postValidResult = opts.postValidation(getBuffer(), opts);
                if (postValidResult) {
                    if (postValidResult.refreshFromBuffer) {
                        var refresh = postValidResult.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, postValidResult.buffer), 
                        resetMaskSet(!0), result = postValidResult;
                    }
                } else resetMaskSet(!0), getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                result = !1;
            }
            return result;
        }
        function isMask(pos) {
            var test = getTest(pos);
            if (null != test.fn) return test.fn;
            if (pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                for (var tests = getTests(pos), staticAlternations = !0, i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && (void 0 === tests[i].alternation || tests[i].locator[tests[i].alternation].length > 1)) {
                    staticAlternations = !1;
                    break;
                }
                return staticAlternations;
            }
            return !1;
        }
        function getMaskLength() {
            var maskLength;
            maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0);
            var pos, lvp = getLastValidPosition(), testPos = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== testPos ? testPos.locator.slice() : void 0;
            for (pos = lvp + 1; void 0 === testPos || null !== testPos.match.fn || null === testPos.match.fn && "" !== testPos.match.def; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice();
            var lastTest = getTest(pos - 1);
            return maskLength = "" !== lastTest.def ? pos : pos - 1, void 0 === maxLength || maxLength > maskLength ? maskLength : maxLength;
        }
        function seekNext(pos, newBlock) {
            var maskL = getMaskLength();
            if (pos >= maskL) return maskL;
            for (var position = pos; ++position < maskL && (newBlock === !0 && (getTest(position).newBlockMarker !== !0 || !isMask(position)) || newBlock !== !0 && !isMask(position) && (opts.nojumps !== !0 || opts.nojumpsThreshold > position)); ) ;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var position = pos;
            if (0 >= position) return 0;
            for (;--position > 0 && (newBlock === !0 && getTest(position).newBlockMarker !== !0 || newBlock !== !0 && !isMask(position)); ) ;
            return position;
        }
        function getBufferElement(position) {
            return void 0 === getMaskSet().validPositions[position] ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite.call(input, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                        resetMaskSet(!0), buffer = getBuffer();
                    }
                    void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                }
            }
            input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), 
            triggerInputEvent === !0 && (skipInputEvent = !0, $(input).trigger("input"));
        }
        function getPlaceholder(pos, test) {
            if (test = test || getTest(pos), void 0 !== test.placeholder) return test.placeholder;
            if (null === test.fn) {
                if (pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                    for (var prevTest, tests = getTests(pos), hasAlternations = !1, i = 0; i < tests.length; i++) {
                        if (prevTest && "" !== tests[i].match.def && tests[i].match.def !== prevTest.match.def && (void 0 === tests[i].alternation || tests[i].alternation === prevTest.alternation)) {
                            hasAlternations = !0;
                            break;
                        }
                        tests[i].match.optionality !== !0 && tests[i].match.optionalQuantifier !== !0 && (prevTest = tests[i]);
                    }
                    if (hasAlternations) return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl) {
            function isTemplateMatch() {
                var isMatch = !1, charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
                if (-1 !== charCodeNdx && !isMask(initialNdx)) {
                    isMatch = !0;
                    for (var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx), i = 0; i < bufferTemplateArr.length; i++) if (" " !== bufferTemplateArr[i]) {
                        isMatch = !1;
                        break;
                    }
                }
                return isMatch;
            }
            var inputValue = nptvl.slice(), charCodes = "", initialNdx = 0;
            if (resetMaskSet(), getMaskSet().p = seekNext(-1), !strict) if (opts.autoUnmask !== !0) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                initialNdx = seekNext(initialNdx));
            } else initialNdx = seekNext(initialNdx);
            $.each(inputValue, function(ndx, charCode) {
                var keypress = $.Event("keypress");
                keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                var lvp = getLastValidPosition(void 0, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : void 0, lvp);
                if (!isTemplateMatch() || strict || opts.autoUnmask) {
                    var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                    keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, 
                    charCodes = "";
                } else keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
            }), writeOut && writeBuffer(input, getBuffer(), document.activeElement === input ? seekNext(getLastValidPosition(0)) : void 0, $.Event("checkval"));
        }
        function unmaskedvalue(input) {
            if (input && void 0 === input.inputmask) return input.value;
            var umValue = [], vps = getMaskSet().validPositions;
            for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? null : (isRTL ? umValue.reverse() : umValue).join("");
            if (null !== unmaskedValue) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                $.isFunction(opts.onUnMask) && (unmaskedValue = opts.onUnMask.call(input, bufferValue, unmaskedValue, opts) || unmaskedValue);
            }
            return unmaskedValue;
        }
        function caret(input, begin, end) {
            function translatePosition(pos) {
                if (isRTL && "number" == typeof pos && (!opts.greedy || "" !== opts.placeholder)) {
                    var bffrLght = getBuffer().join("").length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            var range;
            if ("number" != typeof begin) return input.setSelectionRange ? (begin = input.selectionStart, 
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
            (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) && (begin = range.startOffset, 
            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
            {
                begin: translatePosition(begin),
                end: translatePosition(end)
            };
            begin = translatePosition(begin), end = translatePosition(end), end = "number" == typeof end ? end : begin;
            var scrollCalc = (input.ownerDocument.defaultView || window).getComputedStyle(input, null).fontSize.replace("px", "") * end;
            if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, androidchrome || opts.insertMode !== !1 || begin !== end || end++, 
            input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                if (range = document.createRange(), void 0 === input.firstChild) {
                    var textNode = document.createTextNode("");
                    input.appendChild(textNode);
                }
                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                range.collapse(!0);
                var sel = window.getSelection();
                sel.removeAllRanges(), sel.addRange(range);
            } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
            range.moveEnd("character", end), range.moveStart("character", begin), range.select());
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function clearOptionalTail(buffer) {
            for (var rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete.call(el, buffer, opts);
            if ("*" === opts.repeat) return void 0;
            var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
            if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = !0;
                for (var i = 0; aml >= i; i++) {
                    var test = getTestTemplate(i).match;
                    if (null !== test.fn && void 0 === getMaskSet().validPositions[i] && test.optionality !== !0 && test.optionalQuantifier !== !0 || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function isSelection(begin, end) {
            return isRTL ? begin - end > 1 || begin - end === 1 && opts.insertMode : end - begin > 1 || end - begin === 1 && opts.insertMode;
        }
        function wrapEvent(eventHandler) {
            return function(e) {
                var inComposition = !1;
                if (void 0 === this.inputmask) {
                    var imOpts = $.data(this, "_inputmask_opts");
                    imOpts ? new Inputmask(imOpts).mask(this) : $(this).off(".inputmask");
                } else {
                    if ("setvalue" === e.type || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || opts.tabThrough === !1 && e.keyCode === Inputmask.keyCode.TAB))) {
                        switch (e.type) {
                          case "input":
                            if (skipInputEvent === !0 || inComposition === !0) return skipInputEvent = !1, e.preventDefault();
                            break;

                          case "keydown":
                            skipKeyPressEvent = !1, inComposition = !1;
                            break;

                          case "keypress":
                            if (skipKeyPressEvent === !0) return e.preventDefault();
                            skipKeyPressEvent = !0;
                            break;

                          case "compositionstart":
                            inComposition = !0;
                            break;

                          case "compositionupdate":
                            skipInputEvent = !0;
                            break;

                          case "compositionend":
                            inComposition = !1;
                        }
                        return eventHandler.apply(this, arguments);
                    }
                    e.preventDefault();
                }
            };
        }
        function patchValueProperty(npt) {
            function patchValhook(type) {
                if ($.valHooks && void 0 === $.valHooks[type] || $.valHooks[type].inputmaskpatch !== !0) {
                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                        return elem.value;
                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                        return elem.value = value, elem;
                    };
                    $.valHooks[type] = {
                        get: function(elem) {
                            if (elem.inputmask) {
                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                var result = valhookGet(elem), maskset = elem.inputmask.maskset, bufferTemplate = maskset._buffer;
                                return bufferTemplate = bufferTemplate ? bufferTemplate.join("") : "", result !== bufferTemplate ? result : "";
                            }
                            return valhookGet(elem);
                        },
                        set: function(elem, value) {
                            var result, $elem = $(elem);
                            return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue.inputmask"), 
                            result;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function getter() {
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : valueGet.call(this) !== getBufferTemplate().join("") ? valueGet.call(this) : "" : valueGet.call(this);
            }
            function setter(value) {
                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue.inputmask");
            }
            function installNativeValueSetFallback(npt) {
                $(npt).on("mouseenter.inputmask", wrapEvent(function(event) {
                    var $input = $(this), input = this, value = input.inputmask._valueGet();
                    "" !== value && value !== getBuffer().join("") && $input.trigger("setvalue.inputmask");
                }));
            }
            var valueGet, valueSet;
            npt.inputmask.__valueGet || (Object.getOwnPropertyDescriptor && void 0 === npt.value ? (valueGet = function() {
                return this.textContent;
            }, valueSet = function(value) {
                this.textContent = value;
            }, Object.defineProperty(npt, "value", {
                get: getter,
                set: setter
            })) : document.__lookupGetter__ && npt.__lookupGetter__("value") ? (valueGet = npt.__lookupGetter__("value"), 
            valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
            npt.__defineSetter__("value", setter)) : (valueGet = function() {
                return npt.value;
            }, valueSet = function(value) {
                npt.value = value;
            }, patchValhook(npt.type), installNativeValueSetFallback(npt)), npt.inputmask.__valueGet = valueGet, 
            npt.inputmask._valueGet = function(overruleRTL) {
                return isRTL && overruleRTL !== !0 ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
            }, npt.inputmask.__valueSet = valueSet, npt.inputmask._valueSet = function(value, overruleRTL) {
                valueSet.call(this.el, overruleRTL !== !0 && isRTL && null !== value && void 0 !== value ? value.split("").reverse().join("") : value);
            });
        }
        function handleRemove(input, k, pos, strict) {
            function generalize() {
                if (opts.keepStatic) {
                    resetMaskSet(!0);
                    var lastAlt, validInputs = [], positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                    for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
                        var validPos = getMaskSet().validPositions[lastAlt];
                        if (validPos && (null != validPos.match.fn && validInputs.push(validPos.input), 
                        delete getMaskSet().validPositions[lastAlt], void 0 !== validPos.alternation && validPos.locator[validPos.alternation] === getTestTemplate(lastAlt).locator[validPos.alternation])) break;
                    }
                    if (lastAlt > -1) for (;validInputs.length > 0; ) {
                        getMaskSet().p = seekNext(getLastValidPosition());
                        var keypress = $.Event("keypress");
                        keypress.which = validInputs.pop().charCodeAt(0), keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                }
            }
            if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === !1) ? (pos.begin = seekPrevious(pos.begin), 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1, 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.end++), 
            stripValidPositions(pos.begin, pos.end, !1, strict), strict !== !0 && generalize();
            var lvp = getLastValidPosition(pos.begin);
            lvp < pos.begin ? (-1 === lvp && resetMaskSet(), getMaskSet().p = seekNext(lvp)) : strict !== !0 && (getMaskSet().p = pos.begin);
        }
        function keydownEvent(e) {
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && 127 === k || e.ctrlKey && 88 === k && !isInputEventSupported("cut") ? (e.preventDefault(), 
            88 === k && (undoValue = getBuffer().join("")), handleRemove(input, k, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            opts.showTooltip && $input.prop("title", getMaskSet().mask)) : k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN ? setTimeout(function() {
                var caretPos = seekNext(getLastValidPosition());
                opts.insertMode || caretPos !== getMaskLength() || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
            }, 0) : k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? caret(input, 0, e.shiftKey ? pos.begin : 0) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && e.altKey !== !0 ? (checkVal(input, !0, !1, undoValue.split("")), 
            $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? opts.tabThrough === !0 && k === Inputmask.keyCode.TAB ? (e.shiftKey === !0 ? (null === getTest(pos.begin).fn && (pos.begin = seekNext(pos.begin)), 
            pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
            pos.end = seekNext(pos.begin, !0), pos.end < getMaskLength() && pos.end--), pos.begin < getMaskLength() && (e.preventDefault(), 
            caret(input, pos.begin, pos.end))) : opts.insertMode !== !1 || e.shiftKey || (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                var caretPos = caret(input);
                caret(input, caretPos.begin);
            }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                var caretPos = caret(input);
                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskLength() ? pos.begin : pos.begin - 1)), 
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
        }
        function keypressEvent(e, checkval, writeOut, strict, ndx) {
            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && setTimeout(function() {
                $input.trigger("change"), undoValue = getBuffer().join("");
            }, 0), !0;
            if (k) {
                46 === k && e.shiftKey === !1 && "," === opts.radixPoint && (k = 44);
                var forwardPosition, pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret(input), c = String.fromCharCode(k), isSlctn = isSelection(pos.begin, pos.end);
                isSlctn && (getMaskSet().undoPositions = $.extend(!0, {}, getMaskSet().validPositions), 
                handleRemove(input, Inputmask.keyCode.DELETE, pos, !0), pos.begin = getMaskSet().p, 
                opts.insertMode || (opts.insertMode = !opts.insertMode, setValidPosition(pos.begin, strict), 
                opts.insertMode = !opts.insertMode), isSlctn = !opts.multi), getMaskSet().writeOutBuffer = !0;
                var p = isRTL && !isSlctn ? pos.end : pos.begin, valResult = isValid(p, c, strict);
                if (valResult !== !1) {
                    if (valResult !== !0 && (p = void 0 !== valResult.pos ? valResult.pos : p, c = void 0 !== valResult.c ? valResult.c : c), 
                    resetMaskSet(!0), void 0 !== valResult.caret) forwardPosition = valResult.caret; else {
                        var vps = getMaskSet().validPositions;
                        forwardPosition = !opts.keepStatic && (void 0 !== vps[p + 1] && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || void 0 !== vps[p].alternation) ? p + 1 : seekNext(p);
                    }
                    getMaskSet().p = forwardPosition;
                }
                if (writeOut !== !1) {
                    var self = this;
                    if (setTimeout(function() {
                        opts.onKeyValidation.call(self, valResult, opts);
                    }, 0), getMaskSet().writeOutBuffer && valResult !== !1) {
                        var buffer = getBuffer();
                        writeBuffer(input, buffer, checkval ? void 0 : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== !0), 
                        checkval !== !0 && setTimeout(function() {
                            isComplete(buffer) === !0 && $input.trigger("complete");
                        }, 0);
                    } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                } else isSlctn && (getMaskSet().buffer = void 0, getMaskSet().validPositions = getMaskSet().undoPositions);
                if (opts.showTooltip && $input.prop("title", getMaskSet().mask), checkval && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(this, e, getBuffer(), forwardPosition, opts);
                    if (result && result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
                        resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret);
                    }
                }
                if (e.preventDefault(), checkval) return valResult;
            }
        }
        function pasteEvent(e) {
            var input = this, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
            if ("propertychange" === e.type && input.inputmask._valueGet().length <= getMaskLength()) return !0;
            if ("paste" === e.type) {
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                valueBeforeCaret === getBufferTemplate().slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                valueAfterCaret === getBufferTemplate().slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                window.clipboardData && window.clipboardData.getData ? inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret : e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData && (inputValue = valueBeforeCaret + e.originalEvent.clipboardData.getData("text/plain") + valueAfterCaret);
            }
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
                if (pasteValue = opts.onBeforePaste.call(input, inputValue, opts), pasteValue === !1) return e.preventDefault(), 
                !1;
                pasteValue || (pasteValue = inputValue);
            }
            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
            writeBuffer(input, getBuffer(), void 0, e, !0), $input.trigger("click"), isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            !1;
        }
        function inputFallBackEvent(e) {
            var input = this;
            checkVal(input, !0, !1, input.inputmask._valueGet().split("")), isComplete(getBuffer()) === !0 && $(input).trigger("complete"), 
            e.preventDefault();
        }
        function compositionStartEvent(e) {
            var input = this;
            undoValue = getBuffer().join(""), ("" === compositionData || 0 !== e.originalEvent.data.indexOf(compositionData)) && (compositionCaretPos = caret(input));
        }
        function compositionUpdateEvent(e) {
            var input = this, caretPos = caret(input);
            0 === e.originalEvent.data.indexOf(compositionData) && (resetMaskSet(), caretPos = compositionCaretPos);
            var newData = e.originalEvent.data;
            caret(input, caretPos.begin, caretPos.end);
            for (var i = 0; i < newData.length; i++) {
                var keypress = $.Event("keypress");
                keypress.which = newData.charCodeAt(i), skipKeyPressEvent = !1, ignorable = !1, 
                keypressEvent.call(input, keypress);
            }
            setTimeout(function() {
                var forwardPosition = getMaskSet().p;
                writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
            }, 0), compositionData = e.originalEvent.data;
        }
        function compositionEndEvent(e) {}
        function setValueEvent(e) {
            var input = this, value = input.inputmask._valueGet();
            checkVal(input, !0, !1, ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(input, value, opts) || value : value).split("")), 
            undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
        }
        function focusEvent(e) {
            var input = this, nptValue = input.inputmask._valueGet();
            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) ? input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : mouseEnter === !1 && caret(input, seekNext(getLastValidPosition())), 
            opts.positionCaretOnTab === !0 && setTimeout(function() {
                caret(input, seekNext(getLastValidPosition()));
            }, 0), undoValue = getBuffer().join("");
        }
        function mouseleaveEvent(e) {
            var input = this;
            if (mouseEnter = !1, opts.clearMaskOnLostFocus) {
                var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                document.activeElement !== input && nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                writeBuffer(input, buffer));
            }
        }
        function clickEvent(e) {
            function doRadixFocus(clickPos) {
                if (opts.radixFocus && "" !== opts.radixPoint) {
                    var vps = getMaskSet().validPositions;
                    if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                        if (clickPos < seekNext(-1)) return !0;
                        var radixPos = $.inArray(opts.radixPoint, getBuffer());
                        if (-1 !== radixPos) {
                            for (var vp in vps) if (vp > radixPos && vps[vp].input !== getPlaceholder(vp)) return !1;
                            return !0;
                        }
                    }
                }
                return !1;
            }
            var input = this;
            if (document.activeElement === input) {
                var selectedCaret = caret(input);
                if (selectedCaret.begin === selectedCaret.end) if (doRadixFocus(selectedCaret.begin)) caret(input, $.inArray(opts.radixPoint, getBuffer())); else {
                    var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition), lastPosition = seekNext(lvclickPosition);
                    lastPosition > clickPosition ? caret(input, isMask(clickPosition) || isMask(clickPosition - 1) ? clickPosition : seekNext(clickPosition)) : caret(input, opts.numericInput ? 0 : lastPosition);
                }
            }
        }
        function dblclickEvent(e) {
            var input = this;
            setTimeout(function() {
                caret(input, 0, seekNext(getLastValidPosition()));
            }, 0);
        }
        function cutEvent(e) {
            skipInputEvent = !0;
            var input = this, $input = $(input), pos = caret(input);
            if (isRTL) {
                var clipboardData = window.clipboardData || e.originalEvent.clipboardData, clipData = clipboardData.getData("text").split("").reverse().join("");
                clipboardData.setData("text", clipData);
            }
            handleRemove(input, Inputmask.keyCode.DELETE, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared"), 
            opts.showTooltip && (input.title = getMaskSet().mask);
        }
        function blurEvent(e) {
            var $input = $(this), input = this;
            if (input.inputmask) {
                var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                undoValue !== buffer.join("") && setTimeout(function() {
                    $input.trigger("change"), undoValue = buffer.join("");
                }, 0), "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                isComplete(buffer) === !1 && (setTimeout(function() {
                    $input.trigger("incomplete");
                }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                writeBuffer(input, buffer, void 0, e));
            }
        }
        function mouseenterEvent(e) {
            var input = this;
            mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
        }
        function mask(elem) {
            el = elem, $el = $(el), opts.showTooltip && (el.title = getMaskSet().mask), ("rtl" === el.dir || opts.rightAlign) && (el.style.textAlign = "right"), 
            ("rtl" === el.dir || opts.numericInput) && (el.dir = "ltr", el.removeAttribute("dir"), 
            el.inputmask.isRTL = !0, isRTL = !0), $el.off(".inputmask"), patchValueProperty(el), 
            ("INPUT" === el.tagName && isInputTypeSupported(el.getAttribute("type")) || el.isContentEditable) && ($(el.form).on("submit", function() {
                undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
                opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
                setTimeout(function() {
                    writeBuffer(el, getBuffer());
                }, 0));
            }).on("reset", function() {
                setTimeout(function() {
                    $el.trigger("setvalue.inputmask");
                }, 0);
            }), $el.on("mouseenter.inputmask", wrapEvent(mouseenterEvent)).on("blur.inputmask", wrapEvent(blurEvent)).on("focus.inputmask", wrapEvent(focusEvent)).on("mouseleave.inputmask", wrapEvent(mouseleaveEvent)).on("click.inputmask", wrapEvent(clickEvent)).on("dblclick.inputmask", wrapEvent(dblclickEvent)).on(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", wrapEvent(pasteEvent)).on("cut.inputmask", wrapEvent(cutEvent)).on("complete.inputmask", wrapEvent(opts.oncomplete)).on("incomplete.inputmask", wrapEvent(opts.onincomplete)).on("cleared.inputmask", wrapEvent(opts.oncleared)).on("keydown.inputmask", wrapEvent(keydownEvent)).on("keypress.inputmask", wrapEvent(keypressEvent)), 
            androidfirefox || $el.on("compositionstart.inputmask", wrapEvent(compositionStartEvent)).on("compositionupdate.inputmask", wrapEvent(compositionUpdateEvent)).on("compositionend.inputmask", wrapEvent(compositionEndEvent)), 
            "paste" === PasteEventType && $el.on("input.inputmask", wrapEvent(inputFallBackEvent))), 
            $el.on("setvalue.inputmask", wrapEvent(setValueEvent));
            var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(el, el.inputmask._valueGet(), opts) || el.inputmask._valueGet() : el.inputmask._valueGet();
            checkVal(el, !0, !1, initialValue.split(""));
            var buffer = getBuffer().slice();
            undoValue = buffer.join("");
            var activeElement;
            try {
                activeElement = document.activeElement;
            } catch (e) {}
            isComplete(buffer) === !1 && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && (buffer.join("") === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
            writeBuffer(el, buffer), activeElement === el && caret(el, seekNext(getLastValidPosition()));
        }
        var undoValue, compositionCaretPos, compositionData, el, $el, maxLength, valueBuffer, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !0;
        if (void 0 !== actionObj) switch (actionObj.action) {
          case "isComplete":
            return el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            isComplete(actionObj.buffer);

          case "unmaskedvalue":
            return el = actionObj.el, void 0 !== el && void 0 !== el.inputmask ? (maskset = el.inputmask.maskset, 
            opts = el.inputmask.opts, isRTL = el.inputmask.isRTL, valueBuffer = isRTL ? el.inputmask._valueGet().split("").reverse().join("") : el.inputmask._valueGet()) : valueBuffer = actionObj.value, 
            opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call($el, valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(this, void 0, getBuffer(), 0, opts), 
            unmaskedvalue(el);

          case "mask":
            el = actionObj.el, maskset = el.inputmask.maskset, opts = el.inputmask.opts, isRTL = el.inputmask.isRTL, 
            undoValue = getBuffer().join(""), mask(el);
            break;

          case "format":
            return opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call($el, actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(this, void 0, getBuffer(), 0, opts), 
            actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: $el.inputmask("getmetadata")
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            opts.numericInput && (isRTL = !0), valueBuffer = actionObj.value.split(""), checkVal(void 0, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer);
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === buffer.join("");

          case "getemptymask":
            return el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            getBufferTemplate();

          case "remove":
            el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            el.inputmask._valueSet(unmaskedvalue(el)), $el.off(".inputmask");
            var valueProperty;
            Object.getOwnPropertyDescriptor && (valueProperty = Object.getOwnPropertyDescriptor(el, "value")), 
            valueProperty && valueProperty.get ? el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                get: el.inputmask.__valueGet,
                set: el.inputmask.__valueSet
            }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
            el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0;
            break;

          case "getmetadata":
            if (el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            $.isArray(maskset.metadata)) {
                for (var alternation, lvp = getLastValidPosition(), firstAlt = lvp; firstAlt >= 0; firstAlt--) if (getMaskSet().validPositions[firstAlt] && void 0 !== getMaskSet().validPositions[firstAlt].alternation) {
                    alternation = getMaskSet().validPositions[firstAlt].alternation;
                    break;
                }
                return void 0 !== alternation ? maskset.metadata[getMaskSet().validPositions[lvp].locator[alternation]] : maskset.metadata[0];
            }
            return maskset.metadata;
        }
    }
    Inputmask.prototype = {
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            showTooltip: !1,
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            groupSeparator: "",
            radixFocus: !1,
            nojumps: !1,
            nojumpsThreshold: 0,
            keepStatic: null,
            positionCaretOnTab: !1,
            tabThrough: !1,
            supportsInputType: [],
            definitions: {
                "9": {
                    validator: "[0-9]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1
                }
            },
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
            isComplete: null,
            canClearPosition: $.noop,
            postValidation: null
        },
        masksCache: {},
        mask: function(el) {
            var scopedOpts = $.extend(!0, {}, this.opts);
            importAttributeOptions(el, scopedOpts, $.extend(!0, {}, this.userOptions));
            var maskset = generateMaskSet(scopedOpts, this.noMasksCache);
            return void 0 !== maskset && (void 0 !== el.inputmask && el.inputmask.remove(), 
            el.inputmask = new Inputmask(), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = this.noMasksCache, 
            el.inputmask.userOptions = $.extend(!0, {}, this.userOptions), el.inputmask.el = el, 
            el.inputmask.maskset = maskset, el.inputmask.isRTL = !1, $.data(el, "_inputmask_opts", scopedOpts), 
            maskScope({
                action: "mask",
                el: el
            })), el.inputmask || this;
        },
        option: function(options) {
            return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.opts, options), 
            $.extend(this.userOptions, options), this.el && (void 0 !== options.mask || void 0 !== options.alias ? this.mask(this.el) : ($.data(this.el, "_inputmask_opts", this.opts), 
            maskScope({
                action: "mask",
                el: this.el
            }))), this) : void 0;
        },
        unmaskedvalue: function(value) {
            return maskScope({
                action: "unmaskedvalue",
                el: this.el,
                value: value
            }, this.el && this.el.inputmask ? this.el.inputmask.maskset : generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        remove: function() {
            return this.el ? (maskScope({
                action: "remove",
                el: this.el
            }), this.el.inputmask = void 0, this.el) : void 0;
        },
        getemptymask: function() {
            return this.el ? maskScope({
                action: "getemptymask",
                el: this.el
            }) : void 0;
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return this.el ? maskScope({
                action: "isComplete",
                buffer: this.el.inputmask._valueGet().split(""),
                el: this.el
            }) : void 0;
        },
        getmetadata: function() {
            return this.el ? maskScope({
                action: "getmetadata",
                el: this.el
            }) : void 0;
        },
        isValid: function(value) {
            return maskScope({
                action: "isValid",
                value: value
            }, generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        format: function(value, metadata) {
            return maskScope({
                action: "format",
                value: value,
                metadata: metadata
            }, generateMaskSet(this.opts, this.noMasksCache), this.opts);
        }
    }, Inputmask.extendDefaults = function(options) {
        $.extend(Inputmask.prototype.defaults, options);
    }, Inputmask.extendDefinitions = function(definition) {
        $.extend(Inputmask.prototype.defaults.definitions, definition);
    }, Inputmask.extendAliases = function(alias) {
        $.extend(Inputmask.prototype.defaults.aliases, alias);
    }, Inputmask.format = function(value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    }, Inputmask.unmask = function(value, options) {
        return Inputmask(options).unmaskedvalue(value);
    }, Inputmask.isValid = function(value, options) {
        return Inputmask(options).isValid(value);
    }, Inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    }, Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91
    };
    var ua = navigator.userAgent, iphone = null !== ua.match(new RegExp("iphone", "i")), androidchrome = null !== ua.match(new RegExp("android.*chrome.*", "i")), androidfirefox = null !== ua.match(new RegExp("android.*firefox.*", "i")), PasteEventType = isInputEventSupported("paste") ? "paste" : isInputEventSupported("input") ? "input" : "propertychange";
    return window.Inputmask = Inputmask, Inputmask;
});