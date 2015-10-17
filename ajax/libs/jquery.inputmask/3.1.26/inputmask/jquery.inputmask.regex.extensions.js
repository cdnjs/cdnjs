/*
* jquery.inputmask.regex.extensions.js
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.1.26
*/
(function (factory) {if (typeof define === 'function' && define.amd) {define(["jquery","./jquery.inputmask"], factory);} else {factory(jQuery);}}/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 - 2014 Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0

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