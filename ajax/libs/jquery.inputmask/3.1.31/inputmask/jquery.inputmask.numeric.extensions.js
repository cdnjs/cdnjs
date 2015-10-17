/*!
* jquery.inputmask.numeric.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.31
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "./jquery.inputmask" ], factory) : factory(jQuery);
}(function($) {
    return $.extend($.inputmask.defaults.aliases, {
        numeric: {
            mask: function(opts) {
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator == opts.radixPoint && (opts.groupSeparator = "." == opts.radixPoint ? "," : "," == opts.radixPoint ? "." : ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" != opts.groupSeparator, 
                opts.autoGroup && isFinite(opts.integerDigits)) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits += 0 == mod ? seps - 1 : seps;
                }
                opts.definitions[";"] = opts.definitions["~"];
                var mask = opts.prefix;
                return mask += "[+]", mask += "~{1," + opts.integerDigits + "}", void 0 != opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}"), 
                mask += opts.suffix;
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            groupSeparator: "",
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            integerDigits: "+",
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            postFormat: function(buffer, pos, reformatOnly, opts) {
                var needsRefresh = !1, charAtPos = buffer[pos];
                if ("" == opts.groupSeparator || -1 != $.inArray(opts.radixPoint, buffer) && pos >= $.inArray(opts.radixPoint, buffer) || new RegExp("[-+]").test(charAtPos)) return {
                    pos: pos
                };
                var cbuf = buffer.slice();
                charAtPos == opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]), 
                reformatOnly ? cbuf[pos] = "?" : cbuf.splice(pos, 0, "?");
                var bufVal = cbuf.join("");
                if (bufVal.length > 0 && opts.autoGroup || reformatOnly && -1 != bufVal.indexOf(opts.groupSeparator)) {
                    var escapedGroupSeparator = $.inputmask.escapeRegex.call(this, opts.groupSeparator);
                    needsRefresh = 0 == bufVal.indexOf(opts.groupSeparator), bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
                    var radixSplit = bufVal.split(opts.radixPoint);
                    if (bufVal = "" == opts.radixPoint ? bufVal : radixSplit[0], bufVal != opts.prefix + "?0" && bufVal.length >= opts.groupSize + opts.prefix.length) {
                        needsRefresh = !0;
                        for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal); ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
                        bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    }
                    "" != opts.radixPoint && radixSplit.length > 1 && (bufVal += opts.radixPoint + radixSplit[1]);
                }
                buffer.length = bufVal.length;
                for (var i = 0, l = bufVal.length; l > i; i++) buffer[i] = bufVal.charAt(i);
                var newPos = $.inArray("?", buffer);
                return reformatOnly ? buffer[newPos] = charAtPos : buffer.splice(newPos, 1), {
                    pos: newPos,
                    refreshFromBuffer: needsRefresh
                };
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                if (e.keyCode == $.inputmask.keyCode.TAB && "0" != opts.placeholder.charAt(0)) {
                    var radixPosition = $.inArray(opts.radixPoint, buffer);
                    if (-1 != radixPosition && isFinite(opts.digits)) {
                        for (var i = 1; i <= opts.digits; i++) (void 0 == buffer[radixPosition + i] || buffer[radixPosition + i] == opts.placeholder.charAt(0)) && (buffer[radixPosition + i] = "0");
                        return {
                            refreshFromBuffer: {
                                start: ++radixPosition,
                                end: radixPosition + opts.digits
                            }
                        };
                    }
                } else if (opts.autoGroup && (e.keyCode == $.inputmask.keyCode.DELETE || e.keyCode == $.inputmask.keyCode.BACKSPACE)) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, !0, opts);
                    return rslt.caret = rslt.pos + 1, rslt;
                }
            },
            onKeyPress: function(e, buffer, caretPos, opts) {
                if (opts.autoGroup) {
                    var rslt = opts.postFormat(buffer, caretPos - 1, !0, opts);
                    return rslt.caret = rslt.pos + 1, rslt;
                }
            },
            regex: {
                integerPart: function() {
                    return new RegExp("[-+]?\\d+");
                },
                integerNPart: function() {
                    return new RegExp("\\d+");
                }
            },
            signHandler: function(chrs, buffer, pos, strict, opts) {
                if (!strict && (opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs)) {
                    var matchRslt = buffer.join("").match(opts.regex.integerPart(opts));
                    if (matchRslt && matchRslt.length > 0 && "0" !== matchRslt[matchRslt.index]) return buffer[matchRslt.index] == ("-" === chrs ? "+" : "-") ? {
                        pos: matchRslt.index,
                        c: chrs,
                        remove: matchRslt.index,
                        caret: pos
                    } : buffer[matchRslt.index] == ("-" === chrs ? "-" : "+") ? {
                        remove: matchRslt.index,
                        caret: pos - 1
                    } : {
                        pos: matchRslt.index,
                        c: chrs,
                        caret: pos + 1
                    };
                }
                return !1;
            },
            radixHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && chrs === opts.radixPoint) {
                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (-1 != radixPos && maskset.validPositions[radixPos]) return maskset.validPositions[radixPos - 1] ? {
                        caret: radixPos + 1
                    } : {
                        pos: integerValue.index,
                        c: integerValue[0],
                        caret: radixPos + 1
                    };
                }
                return !1;
            },
            leadingZeroHandler: function(chrs, maskset, pos, strict, opts) {
                var matchRslt = maskset.buffer.join("").match(opts.regex.integerNPart(opts)), radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                if (matchRslt && !strict && (-1 == radixPosition || matchRslt.index < radixPosition)) if (0 == matchRslt[0].indexOf("0") && pos >= opts.prefix.length) {
                    if (-1 == radixPosition || radixPosition >= pos && void 0 == maskset.validPositions[radixPosition]) return maskset.buffer.splice(matchRslt.index, 1), 
                    pos = pos > matchRslt.index ? pos - 1 : matchRslt.index, {
                        pos: pos,
                        remove: matchRslt.index
                    };
                    if (pos > matchRslt.index && radixPosition >= pos) return maskset.buffer.splice(matchRslt.index, 1), 
                    pos = pos > matchRslt.index ? pos - 1 : matchRslt.index, {
                        pos: pos,
                        remove: matchRslt.index
                    };
                } else if ("0" == chrs && pos <= matchRslt.index) return !1;
                return !0;
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
                        !isValid && (isValid = strict ? new RegExp("[0-9" + $.inputmask.escapeRegex.call(this, opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts), 
                        isValid === !0)))) {
                            var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                            isValid = opts.digitsOptional === !1 && pos > radixPosition && !strict ? {
                                pos: pos,
                                remove: pos
                            } : {
                                pos: pos
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        return isValid || (isValid = opts.allowMinus && "-" == chrs || opts.allowPlus && "+" == chrs), 
                        isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset.buffer, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + $.inputmask.escapeRegex.call(this, opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder == opts.radixPoint && (isValid = {
                                pos: pos,
                                remove: pos
                            });
                        }
                        return isValid;
                    },
                    cardinality: 1,
                    prevalidator: null,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            insertMode: !0,
            autoUnmask: !1,
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), "");
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join(""), bufClone = buffer.slice();
                if (opts.postFormat(bufClone, 0, !0, opts), bufClone.join("") != maskedValue) return !1;
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), ""), 
                processValue = processValue.replace($.inputmask.escapeRegex.call(this, opts.radixPoint), "."), 
                isFinite(processValue);
            },
            onBeforeMask: function(initialValue, opts) {
                if (isFinite(initialValue)) return initialValue.toString().replace(".", opts.radixPoint);
                var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                return dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length && (initialValue = initialValue.replace(/,/g, ""), 
                initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.replace(new RegExp($.inputmask.escapeRegex.call(this, opts.groupSeparator), "g"), ""), 
                initialValue;
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: "0",
            radixPoint: ""
        }
    }), $.fn.inputmask;
});