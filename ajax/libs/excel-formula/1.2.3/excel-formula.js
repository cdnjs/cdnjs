/*
 * excelFormulaUtilitiesJS
 * https://github.com/joshatjben/excelFormulaUtilitiesJS/
 *
 * Copyright 2011, Josh Bennett
 * licensed under the MIT license.
 * https://github.com/joshatjben/excelFormulaUtilitiesJS/blob/master/LICENSE.txt
 *
 * Some functionality based off of the jquery core lib
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Based on Ewbi's Go Calc Prototype Excel Formula Parser. [http://ewbi.blogs.com/develops/2004/12/excel_formula_p.html]
 */
 
(function () {

    if (typeof window === 'undefined') {
      window = root;
    }
    var excelFormulaUtilities = window.excelFormulaUtilities = window.excelFormulaUtilities || {};
    var core = window.excelFormulaUtilities.core = {};
	window.excelFormulaUtilities.string = window.excelFormulaUtilities.string || {};
	
	/**
	* Simple/quick string formater. This will take an input string and apply n number of arguments to it.
	*
	* <b>example:</b><br />
	* <code>
	* <pre>
	*	var foo = excelFormulaUtilities.core.formatStr("{0}", "foo"); // foo will be set to "foo"
	*	var fooBar = excelFormulaUtilities.core.formatStr("{0} {1}", "foo", "bar"); // fooBar will be set to "fooBar"
	*	var error = excelFormulaUtilities.core.formatStr("{1}", "error"); // will throw an index out of range error since only 1 extra argument was passed, which would be index 0.
	* </pre>
	* </code>
	*
    * @memberOf window.excelFormulaUtilities.core
	* @function
    * @param {String} inStr 
    **/
	var formatStr = window.excelFormulaUtilities.string.formatStr = function(inStr) {
			var formattedStr = inStr;
			var argIndex = 1;
			for (; argIndex < arguments.length; argIndex++) {
				var replaceIndex = (argIndex - 1);
				var replaceRegex = new RegExp("\\{{1}" + replaceIndex.toString() + "{1}\\}{1}", "g");
				formattedStr = formattedStr.replace(replaceRegex, arguments[argIndex]);
			}
			return formattedStr;
		};
    
    var trim = window.excelFormulaUtilities.string.trim = function(inStr){
			return inStr.replace(/^\s|\s$/, "");
		};
	
	var trimHTML = window.excelFormulaUtilities.string.trim = function(inStr){
			return inStr.replace(/^(?:\s|&nbsp;|<\s*br\s*\/*\s*>)*|(?:\s|&nbsp;|<\s*br\s*\/*\s*>)*$/, "");
		};

	//Quick and dirty type checks
	/**
	* @param {object} obj
	* @returns {boolean}
	* @memberOf window.excelFormulaUtilities.core
	*/
	var isFunction = core.isFunction = function (obj) {
		return (typeof obj) === "function";
	};

	/**
	* @param {object} obj
	* @returns {boolean}
	* @memberOf window.excelFormulaUtilities.core
	*/
	var isArray = core.isArray = function (obj) {
		return (typeof obj) === "object" && obj.length;
	};

	/**
	* @param {object} obj
	* @returns {boolean}
	* @memberOf window.excelFormulaUtilities.core
	*/
	var isWindow = core.isWindow = function () {
		return obj && typeof obj === "object" && "setInterval" in obj;
	}; /*----The functionality below has based off of the jQuery core library----*/

	/**
	* Check if the object is a plain object or not. This has been pulled from the jQuery core and modified slightly.
	* @param {object} obj
	* @returns {boolean} returns weather the object is a plain object or not.
	* @memberOf window.excelFormulaUtilities.core
	*/
	var isPlainObject = core.isPlainObject = function (obj) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (!obj || typeof obj !== "object" || obj.nodeType || isWindow(obj)) {
			return false;
		}
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
			return false;
		}
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { }
		return key === undefined || hasOwnProperty.call(obj, key);
	};

	/**
	* This has been pulled from the jQuery core and modified slightly. see http://api.jquery.com/jQuery.extend/
	* @param {object} target
	* @param {object} object add one or more object to extend the target.
	* @returns {object} returns the extended object.
	* @memberOf window.excelFormulaUtilities.core
	*/
	var extend = core.extend = function () {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !isFunction(target)) {
			target = {};
		}
		// extend jQuery itself if only one argument is passed
		if (length === i) {
			target = this;
			--i;
		}
		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}
						// Never move original objects, clone them
						target[name] = core.extend(deep, clone, copy);
						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	}; /*----end of jquery functionality----*/

	
}());

/*
 * excelFormulaUtilitiesJS
 * https://github.com/joshatjben/excelFormulaUtilitiesJS/
 *
 * Copyright 2011, Josh Bennett
 * licensed under the MIT license.
 * https://github.com/joshatjben/excelFormulaUtilitiesJS/blob/master/LICENSE.txt
 *
 * Some functionality based off of the jquery core lib
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Based on Ewbi's Go Calc Prototype Excel Formula Parser. [http://ewbi.blogs.com/develops/2004/12/excel_formula_p.html]
 */
(function (root) {
    var excelFormulaUtilities = root.excelFormulaUtilities = root.excelFormulaUtilities || {},
    core = root.excelFormulaUtilities.core,
        formatStr = root.excelFormulaUtilities.string.formatStr,
        trim = root.excelFormulaUtilities.string.trim,

        types = {},
        TOK_TYPE_NOOP = types.TOK_TYPE_NOOP = "noop",
        TOK_TYPE_OPERAND = types.TOK_TYPE_OPERAND = "operand",
        TOK_TYPE_FUNCTION = types.TOK_TYPE_FUNCTION = "function",
        TOK_TYPE_SUBEXPR = types.TOK_TYPE_SUBEXPR = "subexpression",
        TOK_TYPE_ARGUMENT = types.TOK_TYPE_ARGUMENT = "argument",
        TOK_TYPE_OP_PRE = types.TOK_TYPE_OP_PRE = "operator-prefix",
        TOK_TYPE_OP_IN = types.TOK_TYPE_OP_IN = "operator-infix",
        TOK_TYPE_OP_POST = types.TOK_TYPE_OP_POST = "operator-postfix",
        TOK_TYPE_WSPACE = types.TOK_TYPE_WSPACE = "white-space",
        TOK_TYPE_UNKNOWN = types.TOK_TYPE_UNKNOWN = "unknown",

        TOK_SUBTYPE_START = types.TOK_SUBTYPE_START = "start",
        TOK_SUBTYPE_STOP = types.TOK_SUBTYPE_STOP = "stop",

        TOK_SUBTYPE_TEXT = types.TOK_SUBTYPE_TEXT = "text",
        TOK_SUBTYPE_NUMBER = types.TOK_SUBTYPE_NUMBER = "number",
        TOK_SUBTYPE_LOGICAL = types.TOK_SUBTYPE_LOGICAL = "logical",
        TOK_SUBTYPE_ERROR = types.TOK_SUBTYPE_ERROR = "error",
        TOK_SUBTYPE_RANGE = types.TOK_SUBTYPE_RANGE = "range",

        TOK_SUBTYPE_MATH = types.TOK_SUBTYPE_MATH = "math",
        TOK_SUBTYPE_CONCAT = types.TOK_SUBTYPE_CONCAT = "concatenate",
        TOK_SUBTYPE_INTERSECT = types.TOK_SUBTYPE_INTERSECT = "intersect",
        TOK_SUBTYPE_UNION = types.TOK_SUBTYPE_UNION = "union";

    root.excelFormulaUtilities.isEu = typeof root.excelFormulaUtilities.isEu === 'boolean' ? root.excelFormulaUtilities.isEu : false;


    /**
     * @class
     */

    function F_token(value, type, subtype) {
        this.value = value;
        this.type = type;
        this.subtype = subtype;
    }

    /**
     * @class
     */

    function F_tokens() {

        this.items = [];

        this.add = function (value, type, subtype) {
            if (!subtype) {
                subtype = "";
            }
            var token = new F_token(value, type, subtype);
            this.addRef(token);
            return token;
        };
        this.addRef = function (token) {
            this.items.push(token);
        };

        this.index = -1;
        this.reset = function () {
            this.index = -1;
        };
        this.BOF = function () {
            return (this.index <= 0);
        };
        this.EOF = function () {
            return (this.index >= (this.items.length - 1));
        };
        this.moveNext = function () {
            if (this.EOF()) {
                return false;
            }
            this.index += 1;
            return true;
        };
        this.current = function () {
            if (this.index === -1) {
                return null;
            }
            return (this.items[this.index]);
        };
        this.next = function () {
            if (this.EOF()) {
                return null;
            }
            return (this.items[this.index + 1]);
        };
        this.previous = function () {
            if (this.index < 1) {
                return null;
            }
            return (this.items[this.index - 1]);
        };

    }

    function F_tokenStack() {

        this.items = [];

        this.push = function (token) {
            this.items.push(token);
        };
        this.pop = function (name) {
            var token = this.items.pop();
            return (new F_token(name || "", token.type, TOK_SUBTYPE_STOP));
        };

        this.token = function () {
            return ((this.items.length > 0) ? this.items[this.items.length - 1] : null);
        };
        this.value = function () {
            return ((this.token()) ? this.token().value.toString() : "");
        };
        this.type = function () {
            return ((this.token()) ? this.token().type.toString() : "");
        };
        this.subtype = function () {
            return ((this.token()) ? this.token().subtype.toString() : "");
        };

    }

    function getTokens(formula) {

        var tokens = new F_tokens(),
            tokenStack = new F_tokenStack(),

            offset = 0,

            currentChar = function () {
                return formula.substr(offset, 1);
            },
            doubleChar = function () {
                return formula.substr(offset, 2);
            },
            nextChar = function () {
                return formula.substr(offset + 1, 1);
            },
            EOF = function () {
                return (offset >= formula.length);
            },

            token = "",

            inString = false,
            inPath = false,
            inRange = false,
            inError = false,
            regexSN = /^[1-9]{1}(\.[0-9]+)?E{1}$/;

        while (formula.length > 0) {
            if (formula.substr(0, 1) === " ") {
                formula = formula.substr(1);
            } else {
                if (formula.substr(0, 1) === "=") {
                    formula = formula.substr(1);
                }
                break;
            }
        }



        while (!EOF()) {

            // state-dependent character evaluation (order is important)
            // double-quoted strings
            // embeds are doubled
            // end marks token
            if (inString) {
                if (currentChar() === "\"") {
                    if (nextChar() === "\"") {
                        token += "\"";
                        offset += 1;
                    } else {
                        inString = false;
                        tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_TEXT);
                        token = "";
                    }
                } else {
                    token += currentChar();
                }
                offset += 1;
                continue;
            }

            // single-quoted strings (links)
            // embeds are double
            // end does not mark a token
            if (inPath) {
                if (currentChar() === "'") {

                    if (nextChar() === "'") {
                        token += "'";
                        offset += 1;
                    } else {
                        inPath = false;
                        token += "'";
                    }
                } else {
                    token += currentChar();
                }

                offset += 1;
                continue;
            }

            // bracked strings (range offset or linked workbook name)
            // no embeds (changed to "()" by Excel)
            // end does not mark a token
            if (inRange) {
                if (currentChar() === "]") {
                    inRange = false;
                }
                token += currentChar();
                offset += 1;
                continue;
            }

            // error values
            // end marks a token, determined from absolute list of values
            if (inError) {
                token += currentChar();
                offset += 1;
                if ((",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,").indexOf("," + token + ",") !== -1) {
                    inError = false;
                    tokens.add(token, TOK_TYPE_OPERAND, TOK_SUBTYPE_ERROR);
                    token = "";
                }
                continue;
            }

            // scientific notation check
            if (("+-").indexOf(currentChar()) !== -1) {
                if (token.length > 1) {
                    if (token.match(regexSN)) {
                        token += currentChar();
                        offset += 1;
                        continue;
                    }
                }
            }

            // independent character evaulation (order not important)
            // establish state-dependent character evaluations
            if (currentChar() === "\"") {
                if (token.length > 0) {
                    // not expected
                    tokens.add(token, TOK_TYPE_UNKNOWN);
                    token = "";
                }
                inString = true;
                offset += 1;
                continue;
            }

            if (currentChar() === "'") {
                if (token.length > 0) {
                    // not expected
                    tokens.add(token, TOK_TYPE_UNKNOWN);
                    token = "";
                }
                token = "'"
                inPath = true;
                offset += 1;
                continue;
            }

            if (currentChar() === "[") {
                inRange = true;
                token += currentChar();
                offset += 1;
                continue;
            }

            if (currentChar() === "#") {
                if (token.length > 0) {
                    // not expected
                    tokens.add(token, TOK_TYPE_UNKNOWN);
                    token = "";
                }
                inError = true;
                token += currentChar();
                offset += 1;
                continue;
            }

            // mark start and end of arrays and array rows
            if (currentChar() === "{") {
                if (token.length > 0) {
                    // not expected
                    tokens.add(token, TOK_TYPE_UNKNOWN);
                    token = "";
                }
                tokenStack.push(tokens.add("ARRAY", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                offset += 1;
                continue;
            }

            if (currentChar() === ";" ) {
                if(root.excelFormulaUtilities.isEu){
                    // If is EU then handle ; as list seperators
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    if (tokenStack.type() !== TOK_TYPE_FUNCTION) {
                        tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
                    } else {
                        tokens.add(currentChar(), TOK_TYPE_ARGUMENT);
                    }
                    offset += 1;
                    continue;
                } else {
                    // Else if not Eu handle ; as array row seperator
                    if (token.length > 0) {
                        tokens.add(token, TOK_TYPE_OPERAND);
                        token = "";
                    }
                    tokens.addRef(tokenStack.pop());
                    tokens.add(",", TOK_TYPE_ARGUMENT);
                    tokenStack.push(tokens.add("ARRAYROW", TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                    offset += 1;
                    continue;
                }
            }

            if (currentChar() === "}") {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.addRef(tokenStack.pop("ARRAYROWSTOP"));
                tokens.addRef(tokenStack.pop("ARRAYSTOP"));
                offset += 1;
                continue;
            }

            // trim white-space
            if (currentChar() === " ") {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.add("", TOK_TYPE_WSPACE);
                offset += 1;
                while ((currentChar() === " ") && (!EOF())) {
                    offset += 1;
                }
                continue;
            }

            // multi-character comparators
            if ((",>=,<=,<>,").indexOf("," + doubleChar() + ",") !== -1) {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.add(doubleChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_LOGICAL);
                offset += 2;
                continue;
            }

            // standard infix operators
            if (("+-*/^&=><").indexOf(currentChar()) !== -1) {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.add(currentChar(), TOK_TYPE_OP_IN);
                offset += 1;
                continue;
            }

            // standard postfix operators
            if (("%").indexOf(currentChar()) !== -1) {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.add(currentChar(), TOK_TYPE_OP_POST);
                offset += 1;
                continue;
            }

            // start subexpression or function
            if (currentChar() === "(") {
                if (token.length > 0) {
                    tokenStack.push(tokens.add(token, TOK_TYPE_FUNCTION, TOK_SUBTYPE_START));
                    token = "";
                } else {
                    tokenStack.push(tokens.add("", TOK_TYPE_SUBEXPR, TOK_SUBTYPE_START));
                }
                offset += 1;
                continue;
            }

            // function, subexpression, array parameters
            if (currentChar() === "," && !root.excelFormulaUtilities.isEu) {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                if (tokenStack.type() !== TOK_TYPE_FUNCTION) {
                    tokens.add(currentChar(), TOK_TYPE_OP_IN, TOK_SUBTYPE_UNION);
                } else {
                    tokens.add(currentChar(), TOK_TYPE_ARGUMENT);
                }
                offset += 1;
                continue;
            }

            // stop subexpression
            if (currentChar() === ")") {
                if (token.length > 0) {
                    tokens.add(token, TOK_TYPE_OPERAND);
                    token = "";
                }
                tokens.addRef(tokenStack.pop());
                offset += 1;
                continue;
            }

            // token accumulation
            token += currentChar();
            offset += 1;

        }

        // dump remaining accumulation
        if (token.length > 0) {
            tokens.add(token, TOK_TYPE_OPERAND);
        }

        // move all tokens to a new collection, excluding all unnecessary white-space tokens
        var tokens2 = new F_tokens();

        while (tokens.moveNext()) {

            token = tokens.current();

            if (token.type.toString() === TOK_TYPE_WSPACE) {
                var doAddToken = (tokens.BOF()) || (tokens.EOF());
                //if ((tokens.BOF()) || (tokens.EOF())) {}
                doAddToken = doAddToken && (((tokens.previous().type.toString() === TOK_TYPE_FUNCTION) && (tokens.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || ((tokens.previous().type.toString() === TOK_TYPE_SUBEXPR) && (tokens.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || (tokens.previous().type.toString() === TOK_TYPE_OPERAND));
                //else if (!(
                //       ((tokens.previous().type === TOK_TYPE_FUNCTION) && (tokens.previous().subtype == TOK_SUBTYPE_STOP))
                //    || ((tokens.previous().type == TOK_TYPE_SUBEXPR) && (tokens.previous().subtype == TOK_SUBTYPE_STOP))
                //    || (tokens.previous().type == TOK_TYPE_OPERAND)))
                //  {}
                doAddToken = doAddToken && (((tokens.next().type.toString() === TOK_TYPE_FUNCTION) && (tokens.next().subtype.toString() === TOK_SUBTYPE_START)) || ((tokens.next().type.toString() === TOK_TYPE_SUBEXPR) && (tokens.next().subtype.toString() === TOK_SUBTYPE_START)) || (tokens.next().type.toString() === TOK_TYPE_OPERAND));
                //else if (!(
                //	((tokens.next().type == TOK_TYPE_FUNCTION) && (tokens.next().subtype == TOK_SUBTYPE_START))
                //	|| ((tokens.next().type == TOK_TYPE_SUBEXPR) && (tokens.next().subtype == TOK_SUBTYPE_START))
                //	|| (tokens.next().type == TOK_TYPE_OPERAND)))
                //	{}
                //else { tokens2.add(token.value, TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT)};
                if (doAddToken) {
                    tokens2.add(token.value.toString(), TOK_TYPE_OP_IN, TOK_SUBTYPE_INTERSECT);
                }
                continue;
            }

            tokens2.addRef(token);

        }

        // switch infix "-" operator to prefix when appropriate, switch infix "+" operator to noop when appropriate, identify operand
        // and infix-operator subtypes, pull "@" from in front of function names
        while (tokens2.moveNext()) {

            token = tokens2.current();

            if ((token.type.toString() === TOK_TYPE_OP_IN) && (token.value.toString() === "-")) {
                if (tokens2.BOF()) {
                    token.type = TOK_TYPE_OP_PRE.toString();
                } else if (((tokens2.previous().type.toString() === TOK_TYPE_FUNCTION) && (tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || ((tokens2.previous().type.toString() === TOK_TYPE_SUBEXPR) && (tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || (tokens2.previous().type.toString() === TOK_TYPE_OP_POST) || (tokens2.previous().type.toString() === TOK_TYPE_OPERAND)) {
                    token.subtype = TOK_SUBTYPE_MATH.toString();
                } else {
                    token.type = TOK_TYPE_OP_PRE.toString();
                }
                continue;
            }

            if ((token.type.toString() === TOK_TYPE_OP_IN) && (token.value.toString() === "+")) {
                if (tokens2.BOF()) {
                    token.type = TOK_TYPE_NOOP.toString();
                } else if (((tokens2.previous().type.toString() === TOK_TYPE_FUNCTION) && (tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || ((tokens2.previous().type.toString() === TOK_TYPE_SUBEXPR) && (tokens2.previous().subtype.toString() === TOK_SUBTYPE_STOP)) || (tokens2.previous().type.toString() === TOK_TYPE_OP_POST) || (tokens2.previous().type.toString() === TOK_TYPE_OPERAND)) {
                    token.subtype = TOK_SUBTYPE_MATH.toString();
                } else {
                    token.type = TOK_TYPE_NOOP.toString();
                }
                continue;
            }

            if ((token.type.toString() === TOK_TYPE_OP_IN) && (token.subtype.length === 0)) {
                if (("<>=").indexOf(token.value.substr(0, 1)) !== -1) {
                    token.subtype = TOK_SUBTYPE_LOGICAL.toString();
                } else if (token.value.toString() === "&") {
                    token.subtype = TOK_SUBTYPE_CONCAT.toString();
                } else {
                    token.subtype = TOK_SUBTYPE_MATH.toString();
                }
                continue;
            }

            if ((token.type.toString() === TOK_TYPE_OPERAND) && (token.subtype.length === 0)) {
                if (isNaN(parseFloat(token.value))) {
                    if ((token.value.toString() === 'TRUE') || (token.value.toString() === 'FALSE')) {
                        token.subtype = TOK_SUBTYPE_LOGICAL.toString();
                    } else {
                        token.subtype = TOK_SUBTYPE_RANGE.toString();
                    }
                } else {
                    token.subtype = TOK_SUBTYPE_NUMBER.toString();
                }

                continue;
            }

            if (token.type.toString() === TOK_TYPE_FUNCTION) {
                if (token.value.substr(0, 1) === "@") {
                    token.value = token.value.substr(1).toString();
                }
                continue;
            }

        }

        tokens2.reset();

        // move all tokens to a new collection, excluding all noops
        tokens = new F_tokens();

        while (tokens2.moveNext()) {
            if (tokens2.current().type.toString() !== TOK_TYPE_NOOP) {
                tokens.addRef(tokens2.current());
            }
        }

        tokens.reset();

        return tokens;
    }


    var parseFormula = excelFormulaUtilities.parseFormula = function (inputID, outputID) {


        var indentCount = 0;

        var indent = function () {
            var s = "|",
                i = 0;
            for (; i < indentCount; i += 1) {
                s += "&nbsp;&nbsp;&nbsp;|";
            }
            return s;
        };

        var formulaControl = document.getElementById(inputID);
        var formula = formulaControl.value;

        var tokens = getTokens(formula);

        var tokensHtml = "";

        tokensHtml += "<table cellspacing='0' style='border-top: 1px #cecece solid; margin-top: 5px; margin-bottom: 5px'>";
        tokensHtml += "<tr>";
        tokensHtml += "<td class='token' style='font-weight: bold; width: 50px'>index</td>";
        tokensHtml += "<td class='token' style='font-weight: bold; width: 125px'>type</td>";
        tokensHtml += "<td class='token' style='font-weight: bold; width: 125px'>subtype</td>";
        tokensHtml += "<td class='token' style='font-weight: bold; width: 150px'>token</td>";
        tokensHtml += "<td class='token' style='font-weight: bold; width: 300px'>token tree</td></tr>";

        while (tokens.moveNext()) {

            var token = tokens.current();

            if (token.subtype === TOK_SUBTYPE_STOP) {
                indentCount -= ((indentCount > 0) ? 1 : 0);
            }

            tokensHtml += "<tr>";

            tokensHtml += "<td class='token'>" + (tokens.index + 1) + "</td>";

            tokensHtml += "<td class='token'>" + token.type + "</td>";
            tokensHtml += "<td class='token'>" + ((token.subtype.length === 0) ? "&nbsp;" : token.subtype.toString()) + "</td>";
            tokensHtml += "<td class='token'>" + ((token.value.length === 0) ? "&nbsp;" : token.value).split(" ").join("&nbsp;") + "</td>";
            tokensHtml += "<td class='token'>" + indent() + ((token.value.length === 0) ? "&nbsp;" : token.value).split(" ").join("&nbsp;") + "</td>";

            tokensHtml += "</tr>";

            if (token.subtype === TOK_SUBTYPE_START) {
                indentCount += 1;
            }

        }

        tokensHtml += "</table>";

        document.getElementById(outputID).innerHTML = tokensHtml;

        formulaControl.select();
        formulaControl.focus();

    };

    // Pass a range such as A1:B2 along with a
    // delimiter to get back a full list of ranges.
    //
    // Example:
    //    breakOutRanges("A1:B2", "+"); //Returns A1+A2+B1+B2
    function breakOutRanges(rangeStr, delimStr){

        //Quick Check to see if if rangeStr is a valid range
        if ( !RegExp("[a-z]+[0-9]+:[a-z]+[0-9]+","gi").test(rangeStr) ){
            throw "This is not a valid range: " + rangeStr;
        }

        //Make the rangeStr lowercase to deal with looping.
        var range = rangeStr.split(":"),

            startRow = parseInt(range[0].match(/[0-9]+/gi)[0]),
            startCol = range[0].match(/[A-Z]+/gi)[0],
            startColDec = fromBase26(startCol)

            endRow =  parseInt(range[1].match(/[0-9]+/gi)[0]),
            endCol = range[1].match(/[A-Z]+/gi)[0],
            endColDec = fromBase26(endCol),

            // Total rows and cols
            totalRows = endRow - startRow + 1,
            totalCols = fromBase26(endCol) - fromBase26(startCol) + 1,

            // Loop vars
            curCol = 0,
            curRow = 1 ,
            curCell = "",

            //Return String
            retStr = "";

        for(; curRow <= totalRows; curRow+=1){
            for(; curCol < totalCols; curCol+=1){
                // Get the current cell id
                curCell = toBase26(startColDec + curCol) + "" + (startRow+curRow-1) ;
                retStr += curCell + (curRow===totalRows && curCol===totalCols-1 ? "" : delimStr);
            }
            curCol=0;
        }

        return retStr;

    }

    //Modified from function at http://en.wikipedia.org/wiki/Hexavigesimal
    var toBase26 = excelFormulaUtilities.toBase26 = function( value ) {

       value = Math.abs(value);

       var converted = ""
            ,iteration = false
            ,remainder;

       // Repeatedly divide the numerb by 26 and convert the
       // remainder into the appropriate letter.
       do {
           remainder = value % 26;

           // Compensate for the last letter of the series being corrected on 2 or more iterations.
           if (iteration && value < 25) {
               remainder--;
           }

           converted = String.fromCharCode((remainder + 'A'.charCodeAt(0))) + converted;
           value = Math.floor((value - remainder) / 26);

           iteration = true;
       } while (value > 0);

       return converted;
   }

   // This was Modified from a function at http://en.wikipedia.org/wiki/Hexavigesimal
   // Pass in the base 26 string, get back integer
   var fromBase26 = excelFormulaUtilities.fromBase26 = function (number) {
        number = number.toUpperCase();

        var s = 0
            ,i = 0
            ,dec = 0;

        if (
            number !== null
            && typeof number !== "undefined"
            && number.length > 0
        ) {
            for (; i < number.length; i++) {
                s = number.charCodeAt(number.length - i - 1) - "A".charCodeAt(0);
                dec += (Math.pow(26, i)) * (s+1);
            }
        }

        return dec - 1;
    }

    function applyTokenTemplate(token, options, indent, lineBreak, override) {

        var indt = indent;

        var lastToken = typeof arguments[5] === undefined || arguments[5] === null ? null : arguments[5];

        var replaceTokenTmpl = function (inStr) {
            return inStr.replace(/\{\{token\}\}/gi, "{0}").replace(/\{\{autoindent\}\}/gi, "{1}").replace(/\{\{autolinebreak\}\}/gi, "{2}");
        };

        var tokenString = "";

        if (token.subtype === "text" || token.type === "text") {
            tokenString = token.value.toString();
        } else if ( token.type === 'operand' && token.subtype === 'range') {
            tokenString = token.value.toString() ;
        } else {
            tokenString = ((token.value.length === 0) ? " " : token.value.toString()).split(" ").join("").toString();
        }

        if (typeof override === 'function') {
            var returnVal = override(tokenString, token, indent, lineBreak);

            tokenString = returnVal.tokenString;

            if (!returnVal.useTemplate) {
                return tokenString;
            }
        }

        switch (token.type) {

        case "function":
            //-----------------FUNCTION------------------
            switch (token.value) {
            case "ARRAY":
                tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStartArray), tokenString, indt, lineBreak);
                break;
            case "ARRAYROW":
                tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStartArrayRow), tokenString, indt, lineBreak);
                break;
            default:
                if (token.subtype.toString() === "start") {
                    tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStart), tokenString, indt, lineBreak);
                } else {
                    tokenString = formatStr(replaceTokenTmpl(options.tmplFunctionStop), tokenString, indt, lineBreak);
                }
                break;
            }
            break;
        case "operand":
            //-----------------OPERAND------------------
            switch (token.subtype.toString()) {
            case "error":
                tokenString = formatStr(replaceTokenTmpl(options.tmplOperandError), tokenString, indt, lineBreak);
                break;
            case "range":
                tokenString = formatStr(replaceTokenTmpl(options.tmplOperandRange), tokenString, indt, lineBreak);
                break;
            case "logical":
                tokenString = formatStr(replaceTokenTmpl(options.tmplOperandLogical), tokenString, indt, lineBreak);
            break;
            case "number":
                tokenString = formatStr(replaceTokenTmpl(options.tmplOperandNumber), tokenString, indt, lineBreak);
                break;
            case "text":
                tokenString = formatStr(replaceTokenTmpl(options.tmplOperandText), tokenString, indt, lineBreak);
                break;
            case "argument":
                tokenString = formatStr(replaceTokenTmpl(options.tmplArgument), tokenString, indt, lineBreak);
                break;
            default:
                break;
            }
            break;
        case "operator-infix":
            tokenString = formatStr(replaceTokenTmpl(options.tmplOperandOperatorInfix), tokenString, indt, lineBreak);
            break;
        case "logical":
            tokenString = formatStr(replaceTokenTmpl(options.tmplLogical), tokenString, indt, lineBreak);
            break;
        case "argument":
        	if(lastToken.type !== "argument"){
        		tokenString = formatStr(replaceTokenTmpl(options.tmplArgument), tokenString, indt, lineBreak);
            } else  {
            	tokenString = formatStr(replaceTokenTmpl("{{autoindent}}"+options.tmplArgument), tokenString, indt, lineBreak);
            }
            break;
        case "subexpression":
            if (token.subtype.toString() === "start") {
                tokenString = formatStr(replaceTokenTmpl(options.tmplSubexpressionStart), tokenString, indt, lineBreak);
            } else {
                tokenString = formatStr(replaceTokenTmpl(options.tmplSubexpressionStop), tokenString, indt, lineBreak);
            }
            break;
        default:

            break;
        }
        return tokenString;
    };

    /**
     *
     * @memberof excelFormulaUtilities.parser
     * @function
     * @param {string} formula
     * @param {object} options optional param
     *<pre>
     *   TEMPLATE VALUES
     *  {{autoindent}} - apply auto indent based on current tree level
     *  {{token}} - the named token such as FUNCTION_NAME or "string"
     *  {{autolinebreak}} - apply linbreak automaticly. tests for next element only at this point
     *
     * Options include:
     *  tmplFunctionStart           - template for the start of a function, the {{token}} will contain the name of the function.
     *  tmplFunctionStop            - template for when the end of a function has been reached.
     *  tmplOperandError            - template for errors.
     *  tmplOperandRange            - template for ranges and variable names.
     *  tmplOperandLogical          - template for logical operators such as + - = ...
     *  tmplOperandNumber           - template for numbers.
     *  tmplOperandText             - template for text/strings.
     *  tmplArgument				- template for argument seperators such as ,.
     *  tmplFunctionStartArray      - template for the start of an array.
     *  tmplFunctionStartArrayRow   - template for the start of an array row.
     *  tmplFunctionStopArrayRow    - template for the end of an array row.
     *  tmplFunctionStopArray       - template for the end of an array.
     *  tmplSubexpressionStart      - template for the sub expresson start
     *  tmplSubexpressionStop       - template for the sub expresson stop
     *  tmplIndentTab               - template for the tab char.
     *  tmplIndentSpace             - template for space char.
     *  autoLineBreak               - when rendering line breaks automaticly which types should it break on. "TOK_SUBTYPE_STOP | TOK_SUBTYPE_START | TOK_TYPE_ARGUMENT"
     *  newLine                     - used for the {{autolinebreak}} replacement as well as some string parsing. if this is not set correctly you may get undesired results. usually \n for text or <br /> for html
     *  trim: true                  - trim the output.
     *	customTokenRender: null     - this is a call back to a custom token function. your call back should look like
     *                                EXAMPLE:
     *
     *                                    customTokenRender: function(tokenString, token, indent, linbreak){
     *                                        var outstr = token,
     *                                            useTemplate = true;
     *                                        // In the return object "useTemplate" tells formatFormula()
     *                                        // weather or not to apply the template to what your return from the "tokenString".
     *                                        return {tokenString: outstr, useTemplate: useTemplate};
     *                                    }
     *
     *</pre>
     * @returns {string}
     */
    var formatFormula = excelFormulaUtilities.formatFormula = function (formula, options) {
        //Quick fix for trailing space after = sign
        formula = formula.replace(/^\s*=\s+/, "=");

        var isFirstToken = true,
            defaultOptions = {
                tmplFunctionStart: '{{autoindent}}{{token}}(\n',
                tmplFunctionStop: '\n{{autoindent}}{{token}})',
                tmplOperandError: ' {{token}}',
                tmplOperandRange: '{{autoindent}}{{token}}',
                tmplLogical: '{{token}}{{autolinebreak}}',
                tmplOperandLogical: '{{autoindent}}{{token}}',
                tmplOperandNumber: '{{autoindent}}{{token}}',
                tmplOperandText: '{{autoindent}}"{{token}}"',
                tmplArgument: '{{token}}\n',
                tmplOperandOperatorInfix: ' {{token}}{{autolinebreak}}',
                tmplFunctionStartArray: '',
                tmplFunctionStartArrayRow: '{',
                tmplFunctionStopArrayRow: '}',
                tmplFunctionStopArray: '',
                tmplSubexpressionStart: '{{autoindent}}(\n',
                tmplSubexpressionStop: '\n)',
                tmplIndentTab: '\t',
                tmplIndentSpace: ' ',
                autoLineBreak: 'TOK_TYPE_FUNCTION | TOK_TYPE_ARGUMENT | TOK_SUBTYPE_LOGICAL | TOK_TYPE_OP_IN ',
                newLine: '\n',
                //trim: true,
                customTokenRender: null,
                prefix: "",
                postfix: ""
            };

        if (options) {
            options = core.extend(true, defaultOptions, options);
        } else {
            options = defaultOptions;
        }

        var indentCount = 0;

        var indent = function () {
            var s = "",
                i = 0;

            for (; i < indentCount; i += 1) {
                s += options.tmplIndentTab;
            }
            return s;
        };

        var tokens = getTokens(formula);

        var outputFormula = "";

        var autoBreakArray = options.autoLineBreak.replace(/\s/gi, "").split("|");

        //Tokens
        var isNewLine = true;

        var testAutoBreak = function (nextToken) {
            var i = 0;
            for (; i < autoBreakArray.length; i += 1) {
                if (nextToken !== null && typeof nextToken !== 'undefined' && (types[autoBreakArray[i]] === nextToken.type.toString() || types[autoBreakArray[i]] === nextToken.subtype.toString())) {
                    return true;
                }
            }
            return false;
        };

        var lastToken = null;

        while (tokens.moveNext()) {

            var token = tokens.current();
            var nextToken = tokens.next();

            if (token.subtype.toString() === TOK_SUBTYPE_STOP) {
                indentCount -= ((indentCount > 0) ? 1 : 0);
            }

            var matchBeginNewline = new RegExp('^' + options.newLine, ''),
                matchEndNewLine = new RegExp(options.newLine + '$', ''),
                autoBreak = testAutoBreak(nextToken),
                autoIndent = isNewLine,
                indt = autoIndent ? indent() : options.tmplIndentSpace,
                lineBreak = autoBreak ? options.newLine : "";

            // TODO this strips out spaces which breaks part of issue 28.  'Data Sheet' gets changed to DataSheet
            outputFormula += applyTokenTemplate(token, options, indt, lineBreak, options.customTokenRender, lastToken);

            if (token.subtype.toString() === TOK_SUBTYPE_START) {
                indentCount += 1;

            }

            isNewLine = autoBreak || matchEndNewLine.test(outputFormula);
            isFirstToken = false;

            lastToken = token;
        }

        outputFormula = options.prefix + trim(outputFormula) + options.postfix;

        return outputFormula;
    };
    /**
     * This function calls {@link excelFormulaUtilities.parser.formatFormula}
     *
     * @memberof excelFormulaUtilities.parser
     * @function
     * @param {string} formula
     * @param {object} options optional param
     */
    var formatFormulaHTML = excelFormulaUtilities.formatFormulaHTML = function (formula) {
        var options = {
            tmplFunctionStart: '{{autoindent}}<span class="function">{{token}}</span><span class="function_start">(</span><br />',
            tmplFunctionStop: '<br />{{autoindent}}{{token}}<span class="function_stop">)</span>',
            tmplOperandText: '{{autoindent}}<span class="quote_mark">"</span><span class="text">{{token}}</span><span class="quote_mark">"</span>',
            tmplArgument: '{{token}}<br />',
            tmplSubexpressionStart: '{{autoindent}}(',
            tmplSubexpressionStop: ' )',
            tmplIndentTab: '<span class="tabbed">&nbsp;&nbsp;&nbsp;&nbsp;</span>',
            tmplIndentSpace: '&nbsp;',
            newLine: '<br />',
            autoLineBreak: 'TOK_TYPE_FUNCTION | TOK_TYPE_ARGUMENT | TOK_SUBTYPE_LOGICAL | TOK_TYPE_OP_IN ',
            trim: true,
            prefix: "=",
            customTokenRender: null
        };

        return formatFormula(formula, options);
    }

    /**
     *
     * @memberof excelFormulaUtilities.convert
     * @function
     * @param {string} formula
     * @returns {string}
     */
    var formula2CSharp = excelFormulaUtilities.formula2CSharp = function (formula) {

        //Custom callback to format as c#
        var functionStack = [];

        var tokRender = function (tokenStr, token, indent, linbreak) {
            var outstr = "",
                /*tokenString = (token.value.length === 0) ? "" : token.value.toString(),*/
                tokenString = tokenStr,
                directConversionMap = {
                    "=": "==",
                    "<>": "!=",
                    "MIN": "Math.min",
                    "MAX": "Math.max",
                    "ABS": "Math.abs",
                    "SUM": "",
                    "IF": "",
                    "&": "+",
                    "AND": "",
                    "OR": ""
                },
                currentFunctionOnStack = functionStack[functionStack.length - 1],
                useTemplate = false;

            switch (token.type.toString()) {

            case TOK_TYPE_FUNCTION:

                switch (token.subtype) {

                case TOK_SUBTYPE_START:

                    functionStack.push({
                        name: tokenString,
                        argumentNumber: 0
                    });
                    outstr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
                    useTemplate = true;

                    break;

                case TOK_SUBTYPE_STOP:

                    useTemplate = true;
                    switch (currentFunctionOnStack.name.toLowerCase()) {
                    case "if":
                        outstr = ")";
                        useTemplate = false;
                        break;
                    default:
                        outstr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
                        break
                    }
                    functionStack.pop();
                    break;
                }

                break;

            case TOK_TYPE_ARGUMENT:
                switch (currentFunctionOnStack.name.toLowerCase()) {
                case "if":
                    switch (currentFunctionOnStack.argumentNumber) {
                    case 0:
                        outstr = "?";
                        break;
                    case 1:
                        outstr = ":";
                        break;
                    }
                    break;
                case "sum":
                    outstr = "+";
                    break;
                case "and":
                    outstr = "&&";
                    break;
                case "or":
                    outstr = "||";
                    break;
                default:
                    outstr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
                    useTemplate = true;
                    break;
                }

                currentFunctionOnStack.argumentNumber += 1;

                break;

            case TOK_TYPE_OPERAND:

                switch (token.subtype) {

                    case TOK_SUBTYPE_RANGE:
                        //Assume '=' sign
                        if(!currentFunctionOnStack){
                          break;
                        }
                        switch (currentFunctionOnStack.name.toLowerCase()) {
                        // If in the sum function break aout cell names and add
                        case "sum":
                            //TODO make sure this is working
                            if(RegExp(":","gi").test(tokenString)){
                                outstr = breakOutRanges(tokenString, "+");
                            } else {
                                outStr = tokenString;
                            }

                            break;
                        case "and":
                            //TODO make sure this is working
                            if(RegExp(":","gi").test(tokenString)){
                                outstr = breakOutRanges(tokenString, "&&");
                            } else {
                                outStr = tokenString;
                            }

                            break;
                        case "or":
                            //TODO make sure this is working
                            if(RegExp(":","gi").test(tokenString)){
                                outstr = breakOutRanges(tokenString, "||");
                            } else {
                                outStr = tokenString;
                            }

                            break;
                        // By Default return an array containing all cell names in array
                        default:
                            // Create array for ranges
                            if(RegExp(":","gi").test(tokenString)){
                                outstr = "[" + breakOutRanges(tokenString, ",") +"]";
                            } else {
                                outstr = tokenString;
                            }
                            //debugger;
                            break;
                        }

                        break;

                    default:
                        break;
                }

            default:
                if( outstr === "" ){
                    outstr = typeof directConversionMap[tokenString.toUpperCase()] === "string" ? directConversionMap[tokenString.toUpperCase()] : tokenString;
                }
                useTemplate = true;
                break;
            }

            return {
                tokenString: outstr,
                useTemplate: useTemplate
            };
        };

        var cSharpOutput = formatFormula(
        formula, {
            tmplFunctionStart: '{{token}}(',
            tmplFunctionStop: '{{token}})',
            tmplOperandError: '{{token}}',
            tmplOperandRange: '{{token}}',
            tmplOperandLogical: '{{token}}',
            tmplOperandNumber: '{{token}}',
            tmplOperandText: '"{{token}}"',
            tmplArgument: '{{token}}',
            tmplOperandOperatorInfix: '{{token}}',
            tmplFunctionStartArray: "",
            tmplFunctionStartArrayRow: "{",
            tmplFunctionStopArrayRow: "}",
            tmplFunctionStopArray: "",
            tmplSubexpressionStart: "(",
            tmplSubexpressionStop: ")",
            tmplIndentTab: "\t",
            tmplIndentSpace: " ",
            autoLineBreak: "TOK_SUBTYPE_STOP | TOK_SUBTYPE_START | TOK_TYPE_ARGUMENT",
            trim: true,
            customTokenRender: tokRender
        });
        return cSharpOutput;
    };

    /**
     * Both the csharp and javascript are the same when converted, this is just an alias for convert2CSharp. there are some subtle differences such as == vrs ===, this will be addressed in a later version.
     * @memberof excelFormulaUtilities.convert
     * @function
     * @param {string} formula
     * @returns {string}
     */
    var formula2JavaScript = excelFormulaUtilities.formula2JavaScript = function (formula) {
        return formula2CSharp(formula).replace('==', '===');
    }

    excelFormulaUtilities.getTokens = getTokens;

}(window|| module.exports || {}));
