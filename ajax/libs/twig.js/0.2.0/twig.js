
/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */


/**
 * Create and compile a twig.js template.
 *
 * Returns a Twig.Template ready for rendering.
 */
var twig = function (params) {
    'use strict';
    var raw_tokens,
        tokens,
        id = params.id;

    if (params.debug !== undefined) {
        Twig.debug = params.debug;
    }

    if (params.data !== undefined) {
        tokens = Twig.prepare(params.data);
        return new Twig.Template( tokens, id );

    } else if (params.ref !== undefined) {
        if (params.id !== undefined) {
            throw new Error("Both ref and id cannot be set on a twig.js template.");
        }
        return Twig.Templates.load(params.ref);

    } else if (params.href !== undefined) {
        return Twig.Templates.loadRemote(params.href, id, params.load, params.async, params.precompiled);
    }
};

/**
 * Provide an extension for use with express.
 *
 * @param {string} markup The template markup.
 * @oaram {array} options The express options.
 *
 * @return {string} The rendered template.
 */
twig.compile = function(markup, options) {
    var id = options.filename,
        tokens = Twig.prepare(markup),
        // Try to load the template from the cache
        template = Twig.Templates.load(id) || new Twig.Template( tokens, id );

    return function(context) {
        return template.render(context);
    };
};

var Twig = (function (Twig) {
    "use strict";

    Twig.trace = false;
    Twig.debug = false;

    /**
     * Exception thrown by twig.js.
     */
    Twig.Error = function(message) {
       this.message = message;
       this.name = "Twig.Exception";
    };
    /**
     * Get the string representation of a Twig error.
     */
    Twig.Error.prototype.toString = function() {
        return this.name + ": " + this.message;
    };

    /**
     * Wrapper for logging to the console.
     */
    Twig.log = {
        trace: function() { if (Twig.trace) { console.log(Array.prototype.slice.call(arguments)); } },
        debug: function() { if (Twig.debug) { console.log(Array.prototype.slice.call(arguments)); } }
    };

    /**
     * Container for methods related to handling high level template tokens
     *      (for example: {{ expression }}, {% logic %}, {# comment #}, raw data)
     */
    Twig.token = {};

    /**
     * Token types.
     */
    Twig.token.type = {
        output:  'output',
        logic:   'logic',
        comment: 'comment',
        raw:     'raw'
    };

    /**
     * Token syntax definitions.
     */
    Twig.token.definitions = {
        /**
         * Output type tokens.
         *  These typically take the form {{ expression }}.
         */
        output: {
            type: Twig.token.type.output,
            open: '{{',
            close: '}}'
        },
        /**
         * Logic type tokens.
         *  These typically take a form like {% if expression %} or {% endif %}
         */
        logic: {
            type: Twig.token.type.logic,
            open: '{%',
            close: '%}'
        },
        /**
         * Comment type tokens.
         *  These take the form {# anything #}
         */
        comment: {
            type: Twig.token.type.comment,
            open: '{#',
            close: '#}'
        }
    };


    /**
     * What characters start "strings" in token definitions. We need this to ignore token close
     * strings inside an expression.
     */
    Twig.token.strings = ['"', "'"];

    Twig.token.findStart = function (template) {
        var output = {
                position: null,
                def: null
            },
            token_type,
            token_template,
            first_key_position;

        for (token_type in Twig.token.definitions) {
            if (Twig.token.definitions.hasOwnProperty(token_type)) {
                token_template = Twig.token.definitions[token_type];
                first_key_position = template.indexOf(token_template.open);

                Twig.log.trace("Twig.token.findStart: ", "Searching for ", token_template.open, " found at ", first_key_position);

                // Does this token occur before any other types?
                if (first_key_position >= 0 && (output.position === null || first_key_position < output.position)) {
                    output.position = first_key_position;
                    output.def = token_template;
                }
            }
        }

        return output;
    };

    Twig.token.findEnd = function (template, token_def, start) {
        var end = null,
            found = false,
            offset = 0,

            // String position variables
            str_pos = null,
            str_found = null,
            pos = null,
            end_offset = null,
            this_str_pos = null,
            end_str_pos = null,

            // For loop variables
            i,
            l;

        while (!found) {
            str_pos = null;
            str_found = null;
            pos = template.indexOf(token_def.close, offset);

            if (pos >= 0) {
                end = pos;
                found = true;
            } else {
                // throw an exception
                throw new Twig.Error("Unable to find closing bracket '" + token_def.close +
                                "'" + " opened near template position " + start);
            }

            l = Twig.token.strings.length;
            for (i = 0; i < l; i += 1) {
                this_str_pos = template.indexOf(Twig.token.strings[i], offset);

                if (this_str_pos > 0 && this_str_pos < pos &&
                        (str_pos === null || this_str_pos < str_pos)) {
                    str_pos = this_str_pos;
                    str_found = Twig.token.strings[i];
                }
            }

            // We found a string before the end of the token, now find the string's end and set the search offset to it
            if (str_pos !== null) {
                end_offset = str_pos + 1;
                end = null;
                found = false;
                while (true) {
                    end_str_pos = template.indexOf(str_found, end_offset);
                    if (end_str_pos < 0) {
                        throw "Unclosed string in template";
                    }
                    // Ignore escaped quotes
                    if (template.substr(end_str_pos - 1, 1) !== "\\") {
                        offset = end_str_pos + 1;
                        break;
                    } else {
                        end_offset = end_str_pos + 1;
                    }
                }
            }
        }
        return end;
    };

    /**
     * Convert a template into high-level tokens.
     */
    Twig.tokenize = function (template) {
        var tokens = [],
            // An offset for reporting errors locations in the template.
            error_offset = 0,

            // The start and type of the first token found in the template.
            found_token = null,
            // The end position of the matched token.
            end = null;

        while (template.length > 0) {
            // Find the first occurance of any token type in the template
            found_token = Twig.token.findStart(template);

            Twig.log.trace("Twig.tokenize: ", "Found token: ", found_token);

            if (found_token.position !== null) {
                // Add a raw type token for anything before the start of the token
                if (found_token.position > 0) {
                    tokens.push({
                        type: Twig.token.type.raw,
                        value: template.substring(0, found_token.position)
                    });
                }
                template = template.substr(found_token.position + found_token.def.open.length);
                error_offset += found_token.position + found_token.def.open.length;

                // Find the end of the token
                end = Twig.token.findEnd(template, found_token.def, error_offset);

                Twig.log.trace("Twig.tokenize: ", "Token ends at ", end);

                tokens.push({
                    type:  found_token.def.type,
                    value: template.substring(0, end).trim()
                });

                template = template.substr(end + found_token.def.close.length);

                // Increment the position in the template
                error_offset += end + found_token.def.close.length;

            } else {
                // No more tokens -> add the rest of the template as a raw-type token
                tokens.push({
                    type: Twig.token.type.raw,
                    value: template
                });
                template = '';
            }
        }

        return tokens;
    };


    Twig.compile = function (tokens) {
        // Output and intermediate stacks
        var output = [],
            stack = [],
            intermediate_output = [],
            token = null,
            logic_token = null,
            expression_token = null,
            unclosed_token = null,
            // Temporary previous token.
            prev_token = null,
            // The previous token's template
            prev_template = null,
            // The output token
            tok_output = null,

            // Logic Token values
            type = null,
            open = null,
            next = null;

        while (tokens.length > 0) {
            token = tokens.shift();
            switch (token.type) {
                case Twig.token.type.raw:
                    if (stack.length > 0) {
                        intermediate_output.push(token);
                    } else {
                        output.push(token);
                    }
                    break;

                case Twig.token.type.logic:
                    // Compile the logic token
                    logic_token = Twig.logic.compile(token);

                    type = logic_token.type;
                    open = Twig.logic.handler[type].open;
                    next = Twig.logic.handler[type].next;

                    Twig.log.trace("Twig.compile: ", "Compiled logic token to ", logic_token,
                                                     " next is: ", next, " open is : ", open);

                    // Not a standalone token, check logic stack to see if this is expected
                    if (open !== undefined && !open) {
                        prev_token = stack.pop();
                        prev_template = Twig.logic.handler[prev_token.type];

                        if (prev_template.next.indexOf(type) < 0) {
                            throw new Error(type + " not expected after a " + prev_token.type);
                        }

                        prev_token.output = prev_token.output || [];

                        prev_token.output = prev_token.output.concat(intermediate_output);
                        intermediate_output = [];

                        tok_output = {
                            type: Twig.token.type.logic,
                            token: prev_token
                        };
                        if (stack.length > 0) {
                            intermediate_output.push(tok_output);
                        } else {
                            output.push(tok_output);
                        }
                    }

                    // This token requires additional tokens to complete the logic structure.
                    if (next !== undefined && next.length > 0) {
                        Twig.log.trace("Twig.compile: ", "Pushing ", logic_token, " to logic stack.");

                        if (stack.length > 0) {
                            // Put any currently held output into the output list of the logic operator
                            // currently at the head of the stack before we push a new one on.
                            prev_token = stack.pop();
                            prev_token.output = prev_token.output || [];
                            prev_token.output = prev_token.output.concat(intermediate_output);
                            stack.push(prev_token);
                        }

                        // Push the new logic token onto the logic stack
                        stack.push(logic_token);

                    } else if (open !== undefined && open) {
                        tok_output = {
                            type: Twig.token.type.logic,
                            token: logic_token
                        };
                        // Standalone token (like {% set ... %}
                        if (stack.length > 0) {
                            intermediate_output.push(tok_output);
                        } else {
                            output.push(tok_output);
                        }
                    }
                    break;

                case Twig.token.type.comment:
                    // Do nothing, comments should be ignored
                    break;

                case Twig.token.type.output:
                    expression_token = Twig.expression.compile(token);
                    if (stack.length > 0) {
                        intermediate_output.push(expression_token);
                    } else {
                        output.push(expression_token);
                    }
                    break;
            }

            Twig.log.trace("Twig.compile: ", " Output: ", output,
                                             " Logic Stack: ", stack,
                                             " Pending Output: ", intermediate_output );
        }
        if (stack.length > 0) {
            unclosed_token = stack.pop();
            throw new Error("Unable to find an end tag for " + unclosed_token.type +
                            ", expecting one of " + unclosed_token.next.join(", "));
        }
        return output;
    };

    Twig.parse = function (tokens, context) {
        var output = [],
            // Track logic chains
            chain = true;

        // Default to an empty object if none provided
        context = context || { };

        tokens.forEach(function (token) {
            Twig.log.debug("Twig.parse: ", "Parsing token: ", token);

            switch (token.type) {
                case Twig.token.type.raw:
                    output.push(token.value);
                    break;

                case Twig.token.type.logic:
                    var logic_token = token.token,
                        logic = Twig.logic.parse(logic_token, context, chain);

                    if (logic.chain !== undefined) {
                        chain = logic.chain;
                    }
                    if (logic.context !== undefined) {
                        context = logic.context;
                    }
                    if (logic.output !== undefined) {
                        output.push(logic.output);
                    }
                    break;

                case Twig.token.type.comment:
                    // Do nothing, comments should be ignored
                    break;

                case Twig.token.type.output:
                    // Parse the given expression in the given context
                    output.push(Twig.expression.parse(token.stack, context));
                    break;
            }
        });
        return output.join("");
    };

    Twig.prepare = function(data) {
        var tokens, raw_tokens;

        Twig.log.debug("Twig.prepare: ", "Tokenizing ", data);
        raw_tokens = Twig.tokenize(data);
        Twig.log.debug("Twig.prepare: ", "Compiling ", raw_tokens);
        tokens = Twig.compile(raw_tokens);
        Twig.log.debug("Twig.prepare: ", "Compiled ", tokens);

        return tokens;
    };

    // Namespace for template storage and retrieval
    Twig.Templates = {
        registry: {}
    };

    /**
     * Save a template object to the store.
     *
     * @param {Twig.Template} template   The twig.js template to store.
     */
    Twig.Templates.save = function(template) {
        if (template.id === undefined) {
            throw new Twig.Error("Unable to save template with no id");
        }
        Twig.Templates.registry[template.id] = template;
    };

    /**
     * Load a previously saved template from the store.
     *
     * @param {string} id   The ID of the template to load.
     *
     * @return {Twig.Template} A twig.js template stored with the provided ID.
     */
    Twig.Templates.load = function(id) {
        if (!Twig.Templates.registry.hasOwnProperty(id)) {
            return null;
        }
        return Twig.Templates.registry[id];
    };

    /**
     * Load a template from a remote location using AJAX and saves in with the given ID.
     *
     * @param {string} url  The remote URL to load as a template.
     * @param {string} id   The ID to save the template with.
     * @param {function} callback  A callback triggered when the template finishes loading.
     * @param {boolean} async  Should the HTTP request be performed asynchronously. Defaults to true.
     * @param {boolean} precompiled  Has the requested template already been compiled.
     *
     */
    Twig.Templates.loadRemote = function(url, id, callback, async, precompiled) {
        // Default to the URL so the template is cached.
        if (id === undefined) {
            id = url;
        }
        // Check for existing template
        if (Twig.Templates.registry.hasOwnProperty(id)) {
            return Twig.Templates.registry[id];
        }
        if (typeof XMLHttpRequest == "undefined") {
            throw new Error("Unsupported platform: Unable to do remote requests " +
                            "because there is no XMLHTTPRequest implementation");
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            var tokens = null,
                template = null;

            if(xmlhttp.readyState == 4) {
                Twig.log.debug("Got template ", xmlhttp.responseText);
                // Get the template
                if (precompiled === true) {
                    tokens = JSON.parse(xmlhttp.responseText);
                } else {
                    tokens = Twig.prepare(xmlhttp.responseText);
                }
                template = new Twig.Template(tokens, id);
                if (callback) {
                    callback(template);
                }
            }
        };
        xmlhttp.open("GET", url, async === true);
        xmlhttp.send();
    };

    /**
     * Create a new twig.js template.
     *
     * Holds a set of compiled tokens ready to be rendered.
     */
    Twig.Template = function ( tokens, id ) {
        this.id = id;
        this.tokens = tokens;
        this.render = function (context) {
            Twig.log.debug("Twig.Template: ", "Rendering template with context: ", context);

            var output = Twig.parse(tokens, context);

            Twig.log.debug("Twig.Template: ", "Template rendered to: ", output);

            return output;
        };
        if (id !== undefined) {
            Twig.Templates.save(this);
        }
    };

    return Twig;

}) (Twig || { });


/**
 * The following methods are from MDN and are available under a
 * Creative Commons Attribution-ShareAlike 2.5 License.
 *     http://creativecommons.org/licenses/by-sa/2.5/
 *
 * See:
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
 */

(function() {
    "use strict";
    // Handle methods that don't yet exist in every browser

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    };

    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if ( !Array.prototype.forEach ) {
      Array.prototype.forEach = function( callback, thisArg ) {

        var T, k;

        if ( this == null ) {
          throw new TypeError( " this is null or not defined" );
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ( {}.toString.call(callback) != "[object Function]" ) {
          throw new TypeError( callback + " is not a function" );
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if ( thisArg ) {
          T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while( k < len ) {

          var kValue;

          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          if ( k in O ) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[ k ];

            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call( T, kValue, k, O );
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined
      };
    };

    if(!Object.keys) Object.keys = function(o){
        if (o !== Object(o)) {
            throw new TypeError('Object.keys called on non-object');
        }
        var ret = [], p;
        for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) ret.push(p);
        return ret;
    }
})();

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

/**
 * This file handles tokenizing, compiling and parsing logic (tags).
 */
var Twig = (function (Twig) {
    "use strict";

    /**
     * Namespace for logic handling.
     */
    Twig.logic = {};

    /**
     * Logic token types.
     */
    Twig.logic.type = {
        if_:    'if',
        endif:  'endif',
        for_:   'for',
        endfor: 'endfor',
        else_:  'else',
        elseif: 'elseif',
        set:    'set'
    };

    /**
     * Regular expressions to match templates to.
     *
     * Properties:
     *
     *      type:  The type of expression this matches
     *
     *      regex: A regular expression that matches the format of the token
     *
     *      next:  What logic tokens (if any) pop this token off the logic stack. If empty, the
     *             logic token is assumed to not require an end tag and isn't push onto the stack.
     *
     *      open:  Does this tag open a logic expression or is it standalone. For example,
     *             {% endif %} cannot exist without an opening {% if ... %} tag, so open = false.
     *
     *  Functions:
     *
     *      compile: A function that handles compiling the token into an output token ready for
     *               parsing with the parse function.
     *
     *      parse:   A function that parses the compiled token into output (HTML / whatever the
     *               template represents).
     */
    Twig.logic.definitions = [
        {
            /**
             * If type logic tokens.
             *
             *  Format: {% if expression %}
             */
            type: Twig.logic.type.if_,
            regex: /^if\s+([^\s].+)$/,
            next: [
                Twig.logic.type.else_,
                Twig.logic.type.elseif,
                Twig.logic.type.endif
            ],
            open: true,
            compile: function (token) {
                var expression = token.match[1];
                // Compile the expression.
                token.stack = Twig.expression.compile({
                    type:  Twig.expression.type.expression,
                    value: expression
                }).stack;
                delete token.match;
                return token;
            },
            parse: function (token, context, chain) {
                var output = '',
                    // Parse the expression
                    result = Twig.expression.parse(token.stack, context);

                // Start a new logic chain
                chain = true;

                if (result === true) {
                    chain = false;
                    // parse if output
                    output = Twig.parse(token.output, context);
                }
                return {
                    chain: chain,
                    output: output
                };
            }
        },
        {
            /**
             * Else if type logic tokens.
             *
             *  Format: {% elseif expression %}
             */
            type: Twig.logic.type.elseif,
            regex: /^elseif\s+([^\s].*)$/,
            next: [
                Twig.logic.type.else_,
                Twig.logic.type.endif
            ],
            open: false,
            compile: function (token) {
                var expression = token.match[1];
                // Compile the expression.
                token.stack = Twig.expression.compile({
                    type:  Twig.expression.type.expression,
                    value: expression
                }).stack;
                delete token.match;
                return token;
            },
            parse: function (token, context, chain) {
                var output = '';

                if (chain && Twig.expression.parse(token.stack, context) === true) {
                    chain = false;
                    // parse if output
                    output = Twig.parse(token.output, context);
                }

                return {
                    chain: chain,
                    output: output
                };
            }
        },
        {
            /**
             * Else if type logic tokens.
             *
             *  Format: {% elseif expression %}
             */
            type: Twig.logic.type.else_,
            regex: /^else$/,
            next: [
                Twig.logic.type.endif,
                Twig.logic.type.endfor
            ],
            open: false,
            parse: function (token, context, chain) {
                var output = '';
                if (chain) {
                    output = Twig.parse(token.output, context);
                }
                return {
                    chain: chain,
                    output: output
                };
            }
        },
        {
            /**
             * End if type logic tokens.
             *
             *  Format: {% endif %}
             */
            type: Twig.logic.type.endif,
            regex: /^endif$/,
            next: [ ],
            open: false
        },
        {
            /**
             * For type logic tokens.
             *
             *  Format: {% for expression %}
             */
            type: Twig.logic.type.for_,
            regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([^\s].+)$/,
            next: [
                Twig.logic.type.else_,
                Twig.logic.type.endfor
            ],
            open: true,
            compile: function (token) {
                var key_value = token.match[1],
                    expression = token.match[2],
                    kv_split = null,
                    expression_stack = null;

                token.key_var = null;
                token.value_var = null;

                if (key_value.indexOf(",") >= 0) {
                    kv_split = key_value.split(',');
                    if (kv_split.length === 2) {
                        token.key_var = kv_split[0].trim();
                        token.value_var = kv_split[1].trim();
                    } else {
                        throw new Twig.Error("Invalid expression in for loop: " + key_value);
                    }
                } else {
                    token.value_var = key_value;
                }

                // Valid expressions for a for loop
                //   for item     in expression
                //   for key,item in expression

                // Compile the expression.
                expression_stack = Twig.expression.compile({
                    type:  Twig.expression.type.expression,
                    value: expression
                }).stack;

                token.expression = expression_stack;

                delete token.match;
                return token;
            },
            parse: function (token, context, continue_chain) {
                // Parse expression
                var result = Twig.expression.parse(token.expression, context),
                    output = [],
                    key,
                    keyset;

                if (result instanceof Array) {
                    key = 0;
                    result.forEach(function (value) {
                        context[token.value_var] = value;
                        if (token.key_var) {
                            context[token.key_var] = key;
                        }
                        output.push(Twig.parse(token.output, context));

                        key += 1;
                    });
                } else if (result instanceof Object) {
                    if (result._keys !== undefined) {
                        keyset = result._keys;
                    } else {
                        keyset = Object.keys(result);
                    }
                    keyset.forEach(function(key) {
                        if (key === "_keys") return; // Ignore the _keys property
                        if (result.hasOwnProperty(key)) {
                            context[token.value_var] = result[key];
                            if (token.key_var) {
                                context[token.key_var] = key;
                            }
                            output.push(Twig.parse(token.output, context));
                        }
                    });
                }
                // Only allow else statements if no output was generated
                continue_chain = (output.length === 0);

                return {
                    chain: continue_chain,
                    output: output.join("")
                };
            }
        },
        {
            /**
             * End if type logic tokens.
             *
             *  Format: {% endif %}
             */
            type: Twig.logic.type.endfor,
            regex: /^endfor$/,
            next: [ ],
            open: false
        },
        {
            /**
             * Set type logic tokens.
             *
             *  Format: {% set key = expression %}
             */
            type: Twig.logic.type.set,
            regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*(.+)$/,
            next: [ ],
            open: true,
            compile: function (token) {
                var key = token.match[1].trim(),
                    expression = token.match[2],
                    // Compile the expression.
                    expression_stack  = Twig.expression.compile({
                        type:  Twig.expression.type.expression,
                        value: expression
                    }).stack;

                token.key = key;
                token.expression = expression_stack;

                delete token.match;
                return token;
            },
            parse: function (token, context, continue_chain) {
                var value = Twig.expression.parse(token.expression, context),
                    key = token.key;

                context[key] = value;

                return {
                    chain: continue_chain,
                    context: context
                };
            }
        }
    ];

    /**
     * Registry for logic handlers.
     */
    Twig.logic.handler = {};

    /**
     * Define a new token type, available at Twig.logic.type.{type}
     */
    Twig.logic.extendType = function (type, value) {
        value = value || type;
        Twig.logic.type[type] = value;
    };

    /**
     * Extend the logic parsing functionality with a new token definition.
     *
     * // Define a new tag
     * Twig.logic.extend({
     *     type: Twig.logic.type.{type},
     *     // The pattern to match for this token
     *     regex: ...,
     *     // What token types can follow this token, leave blank if any.
     *     next: [ ... ]
     *     // Create and return compiled version of the token
     *     compile: function(token) { ... }
     *     // Parse the compiled token with the context provided by the render call
     *     //   and whether this token chain is complete.
     *     parse: function(token, context, chain) { ... }
     * });
     */
    Twig.logic.extend = function (definition) {

        if (!definition.type) {
            throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
        }
        Twig.logic.handler[definition.type] = definition;
    };

    // Extend with built-in expressions
    while (Twig.logic.definitions.length > 0) {
        Twig.logic.extend(Twig.logic.definitions.shift());
    }

    /**
     * Compile logic tokens into JSON form ready for parsing.
     */
    Twig.logic.compile = function (raw_token) {
        var expression = raw_token.value.trim(),
            token = Twig.logic.tokenize(expression),
            token_template = Twig.logic.handler[token.type];

        Twig.log.trace("Twig.logic.compile: ", "Compiling logic token ", token);

        // Check if the token needs compiling
        if (token_template.compile) {
            token = token_template.compile(token);
            Twig.log.trace("Twig.logic.compile: ", "Compiled logic token to ", token);
        }

        return token;
    };

    /**
     * Tokenize logic expressions. This function matches token expressions against regular
     * expressions provided in token definitions provided with Twig.logic.extend.
     *
     * @param {string} expression the logic token expression to tokenize
     *                (i.e. what's between {% and %})
     *
     * @return {Object} The matched token with type set to the token type and match to the regex match.
     */
    Twig.logic.tokenize = function (expression) {
        var token = {},
            token_template_type = null,
            token_type = null,
            token_regex = null,
            regex_array = null,
            regex = null,
            match = null;

        // Ignore whitespace around expressions.
        expression = expression.trim();

        for (token_template_type in Twig.logic.handler) {
            if (Twig.logic.handler.hasOwnProperty(token_template_type)) {
                // Get the type and regex for this template type
                token_type = Twig.logic.handler[token_template_type].type;
                token_regex = Twig.logic.handler[token_template_type].regex;

                // Handle multiple regular expressions per type.
                regex_array = [];
                if (token_regex instanceof Array) {
                    regex_array = token_regex;
                } else {
                    regex_array.push(token_regex);
                }

                // Check regular expressions in the order they were specified in the definition.
                while (regex_array.length > 0) {
                    regex = regex_array.shift();
                    match = regex.exec(expression.trim());
                    if (match !== null) {
                        token.type  = token_type;
                        token.match = match;
                        Twig.log.trace("Twig.logic.tokenize: ", "Matched a ", token_type, " regular expression of ", match);
                        return token;
                    }
                }
            }
        }

        throw new Twig.Error("Unable to parse '" + expression.trim() + "'");
    };

    Twig.logic.parse = function (token, context, chain) {
        var output = '',
            token_template;

        context = context || { };

        // What does chain mean:
        //   Should we continue a chain of expressions?
        //   If false, no logic token with an open: false should be evaluated
        //     e.g. If an {% if ... %} evaluates true, then sets chain = false, any
        //          following tokens with open=false (else, elseif) should be ignored.

        Twig.log.trace("Twig.logic.parse: " ,"Parsing logic token ", token);

        token_template = Twig.logic.handler[token.type];

        if (token_template.parse) {
            output = token_template.parse(token, context, chain);
        }
        return output;
    };

    return Twig;

})(Twig || { });

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

 /**
  * This file handles tokenizing, compiling and parsing expression.
  */
var Twig = (function (Twig) {
    "use strict";

    /**
     * Namespace for expression handling.
     */
    Twig.expression = { };

    /**
     * The type of tokens used in expressions.
     */
    Twig.expression.type = {
        comma:      'Twig.expression.type.comma',
        expression: 'Twig.expression.type.expression',
        operator:   'Twig.expression.type.operator',
        string:     'Twig.expression.type.string',
        array: {
            start:  'Twig.expression.type.array.start',
            end:    'Twig.expression.type.array.end'
        },
        object: {
            start:  'Twig.expression.type.object.start',
            end:    'Twig.expression.type.object.end'
        },
        parameter: {
            start:  'Twig.expression.type.parameter.start',
            end:    'Twig.expression.type.parameter.end'
        },
        key: {
            period:   'Twig.expression.type.key.period',
            brackets: 'Twig.expression.type.key.brackets'
        },
        filter:     'Twig.expression.type.filter',
        variable:   'Twig.expression.type.variable',
        number:     'Twig.expression.type.number',
        setkey:     'Twig.expression.type.setkey',
        test:     'Twig.expression.type.test'
    };

    Twig.expression.set = {
        // What can follow an expression (in general)
        operations: [
            Twig.expression.type.filter,
            Twig.expression.type.operator,
            Twig.expression.type.array.end,
            Twig.expression.type.object.end,
            Twig.expression.type.parameter.end,
            Twig.expression.type.comma,
            Twig.expression.type.setkey,
            Twig.expression.type.test
        ],
        expressions: [
            Twig.expression.type.expression,
            Twig.expression.type.string,
            Twig.expression.type.variable,
            Twig.expression.type.number,
            Twig.expression.type.array.start,
            Twig.expression.type.object.start
        ]
    };

    /**
     * The regular expressions and compile/parse logic used to match tokens in expressions.
     *
     * Properties:
     *
     *      type:  The type of expression this matches
     *
     *      regex: One or more regular expressions that matche the format of the token.
     *
     *      next:  Valid tokens that can occur next in the expression.
     *
     * Functions:
     *
     *      compile: A function that compiles the raw regular expression match into a token.
     *
     *      parse:   A function that parses the compiled token into output.
     */
    Twig.expression.definitions = [
        {
            type: Twig.expression.type.test,
            regex: /^is\s+(not)?\s*([a-zA-Z_][a-zA-Z0-9_]*)/,
            next: Twig.expression.set.operations.concat([Twig.expression.type.parameter.start]),
            compile: function(token, stack, output) {
                token.filter   = token.match[2];
                token.modifier = token.match[1];
                // delete token.match;
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                var value = stack.pop(),
                    params = token.params && Twig.expression.parse(token.params, context),
                    result = Twig.test(token.filter, value, params);

                if (token.modifier == 'not') {
                    stack.push(!result);
                } else {
                    stack.push(result);
                }
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            type: Twig.expression.type.setkey,
            regex: /^\:/,
            next: Twig.expression.set.expressions,
            compile: function(token, stack, output) {
                var key_token = output.pop();
                if (key_token.type !== Twig.expression.type.string) {
                    throw new Twig.Error("Unexpected object key: " + key_token);
                }
                token.key = key_token.value;
                output.push(token);

                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            type: Twig.expression.type.comma,
            // Match a comma
            regex: /^,/,
            next: Twig.expression.set.expressions,
            compile: function(token, stack, output) {
                while(stack.length > 0) {
                    output.push(stack.pop());
                }
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            }
        },
        {
            type: Twig.expression.type.expression,
            // Match (, anything but ), )
            regex: /^\([^\)]+\)/,
            next: Twig.expression.set.operations,
            compile: function(token, stack, output) {
                token.value = token.value.substring(1, token.value.length - 1);

                var evaluated_expression = Twig.expression.compile(token),
                    sub_stack = evaluated_expression.stack;
                while (sub_stack.length > 0) {
                    output.push(sub_stack.shift());
                }
                return {
                    stack: stack,
                    output: output
                };
            }
        },
        {
            type: Twig.expression.type.operator,
            // Match any of +, *, /, -,^, ~, !, <, <=, >, >=, !=, ==, ||, &&
            regex: /(^[\+\*\/\-\^~%]|^[<>!]=?|^==|^\|\||^&&)/,
            next: Twig.expression.set.expressions,
            compile: function(token, stack, output) {
                var value = token.value,
                    operator = Twig.expression.operator.lookup(value, token);

                Twig.log.trace("Twig.expression.compile: ", "Operator: ", operator);

                while (stack.length > 0 && (
                            (operator.associativity === Twig.expression.operator.leftToRight &&
                             operator.precidence    >= stack[stack.length-1].precidence) ||

                            (operator.associativity === Twig.expression.operator.rightToLeft &&
                             operator.precidence    >  stack[stack.length-1].precidence))
                       ) {
                     output.push(stack.pop());
                }
                stack.push(operator);

                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack = Twig.expression.operator.parse(token.value, stack);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a string. This is anything between a pair of single or double quotes.
             */
            type: Twig.expression.type.string,
            // See: http://blog.stevenlevithan.com/archives/match-quoted-string
            regex: /^(["'])(?:(?=(\\?))\2.)*?\1/,
            next: Twig.expression.set.operations,
            compile: function(token, stack, output) {
                var value = token.value;

                // Remove the quotes from the string
                if (value.substring(0, 1) === '"') {
                    value = value.replace('\\"', '"');
                } else {
                    value = value.replace("\\'", "'");
                }
                token.value = value.substring(1, value.length-1);
                Twig.log.trace("Twig.expression.compile: ", "String value: ", token.value);
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token.value);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a parameter set start.
             */
            type: Twig.expression.type.parameter.start,
            regex: /^\(/,
            next: Twig.expression.set.expressions.concat([Twig.expression.type.parameter.end]),
            compile: function(token, stack, output) {
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a parameter set end.
             */
            type: Twig.expression.type.parameter.end,
            regex: /^\)/,
            next: Twig.expression.set.operations,
            compile: function(token, stack, output) {
                while(stack.length > 0) {
                    output.push(stack.pop());
                }
                // Move contents of parens into preceding filter
                var param_stack = [];
                while(token.type !== Twig.expression.type.parameter.start) {
                    // Add token to arguments stack
                    param_stack.unshift(token);
                    token = output.pop();
                }
                param_stack.unshift(token);

                // Get the token preceding the parameters
                token = output.pop();
                if (token.type !== Twig.expression.type.filter &&
                    token.type !== Twig.expression.type.test) {
                    throw new Twig.Error("Expected filter before parameters, got " + token.type);
                }
                token.params = param_stack;
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                var new_array = [],
                    array_ended = false,
                    value = null;

                while (stack.length > 0) {
                    value = stack.pop();
                    // Push values into the array until the start of the array
                    if (value.type && value.type == Twig.expression.type.parameter.start) {
                        array_ended = true;
                        break;
                    }
                    new_array.unshift(value);
                }
                if (!array_ended) {
                    throw new Twig.Error("Expected end of parameter set.");
                }

                stack.push(new_array);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match an array start.
             */
            type: Twig.expression.type.array.start,
            regex: /^\[/,
            next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end]),
            compile: function(token, stack, output) {
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match an array end.
             */
            type: Twig.expression.type.array.end,
            regex: /^\]/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets]),
            compile: function(token, stack, output) {
                while(stack.length > 0) {
                    output.push(stack.pop());
                }
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                var new_array = [],
                    array_ended = false,
                    value = null;

                while (stack.length > 0) {
                    value = stack.pop();
                    // Push values into the array until the start of the array
                    if (value.type && value.type == Twig.expression.type.array.start) {
                        array_ended = true;
                        break;
                    }
                    new_array.unshift(value);
                }
                if (!array_ended) {
                    throw new Twig.Error("Expected end of array.");
                }

                stack.push(new_array);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match an object/hash map start.
             */
            type: Twig.expression.type.object.start,
            regex: /^\{/,
            next: Twig.expression.set.expressions.concat([Twig.expression.type.object.end]),
            compile: function(token, stack, output) {
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match an object/hash map end.
             */
            type: Twig.expression.type.object.end,
            regex: /^\}/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets]),
            compile: function(token, stack, output) {
                while(stack.length > 0) {
                    output.push(stack.pop());
                }
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(obj_end_token, stack, context) {
                var new_object = {},
                    object_ended = false,
                    token = null,
                    value = null;

                while (stack.length > 0) {
                    token = stack.pop();
                    // Push values into the array until the start of the object
                    if (token.type && token.type === Twig.expression.type.object.start) {
                        object_ended = true;
                        break;
                    }
                    if (token.type && token.type === Twig.expression.type.setkey) {
                        if (value === null) {
                            throw new Twig.Error("Expected value for key " + token.key + " in object definition. Got " + token);
                        }
                        new_object[token.key] = value;

                        // Preserve the order that elements are added to the map
                        // This is necessary since JavaScript objects don't
                        // guarantee the order of keys
                        if (new_object._keys === undefined) new_object._keys = [];
                        new_object._keys.unshift(token.key);

                        value = null;

                    } else {
                        value = token;
                    }
                }
                if (!object_ended) {
                    throw new Twig.Error("Unexpected end of object.");
                }

                stack.push(new_object);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a filter of the form something|encode(...)
             */
            type: Twig.expression.type.filter,
            // match a | then a letter or _, then any number of letters, numbers, _ or -
            regex: /^\|[a-zA-Z_][a-zA-Z0-9_\-]*/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets,
                    Twig.expression.type.parameter.start]),
            compile: function(token, stack, output) {
                token.value = token.value.substr(1);
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                var input = stack.pop(),
                    params = token.params && Twig.expression.parse(token.params, context);

                stack.push(Twig.filter(token.value, input, params));
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a variable. Variables can contain letters, numbers, underscores and dashes
             * but must start with a letter or underscore.
             */
            type: Twig.expression.type.variable,
            // match any letter or _, then any number of letters, numbers, _ or -
            regex: /^[a-zA-Z_][a-zA-Z0-9_]*/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets]),
            compile: function(token, stack, output) {
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                // Get the variable from the context
                if (!context.hasOwnProperty(token.value)) {
                    // throw new Twig.Error("Model doesn't provide the property " + token.value);
                }
                stack.push(context[token.value]);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            type: Twig.expression.type.key.period,
            regex: /^\.[a-zA-Z_][a-zA-Z0-9_]*/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets]),
            compile: function(token, stack, output) {
                token.key = token.value.substr(1);
                delete token.value;

                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                var key = token.key,
                    object = stack.pop();

                if (object === null || object === undefined) {
                    throw new Twig.Error("Can't access a key " + key + " on an undefined object.");
                }

                // Get the variable from the context
                if (!object.hasOwnProperty(key)) {
                    // throw new Twig.Error("Model doesn't provide the key " + key);
                }
                stack.push(object[key]);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            type: Twig.expression.type.key.brackets,
            regex: /^\[([^\]]*)\]/,
            next: Twig.expression.set.operations.concat([
                    Twig.expression.type.key.period,
                    Twig.expression.type.key.brackets]),
            compile: function(token, stack, output) {
                var match = token.match[1];
                delete token.value;
                delete token.match;

                // The expression stack for the key
                token.stack = Twig.expression.compile({
                    value: match
                }).stack;

                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                // Evaluate key
                var key = Twig.expression.parse(token.stack, context),
                    object = stack.pop();
                // Get the variable from the context
                if (!object.hasOwnProperty(key)) {
                    throw new Twig.Error("Model doesn't provide the key " + key);
                }
                stack.push(object[key]);
                return {
                    stack: stack,
                    context: context
                };
            }
        },
        {
            /**
             * Match a number (integer or decimal)
             */
            type: Twig.expression.type.number,
            // match a number
            regex: /^\-?\d*\.?\d+/,
            next: Twig.expression.set.operations,
            compile: function(token, stack, output) {
                output.push(token);
                return {
                    stack: stack,
                    output: output
                };
            },
            parse: function(token, stack, context) {
                stack.push(token.value);
                return {
                    stack: stack,
                    context: context
                };
            }
        }
    ];

    /**
     * Registry for logic handlers.
     */
    Twig.expression.handler = {};

    /**
     * Define a new expression type, available at Twig.logic.type.{type}
     *
     * @param {string} type The name of the new type.
     */
    Twig.expression.extendType = function (type) {
        Twig.expression.type[type] = "Twig.expression.type." + type;
    };

    /**
     * Extend the expression parsing functionality with a new definition.
     *
     * Token definitions follow this format:
     *  {
     *      type:     One of Twig.expression.type.[type], either pre-defined or added using
     *                    Twig.expression.extendType
     *
     *      next:     Array of types from Twig.expression.type that can follow this token,
     *
     *      regex:    A regex or array of regex's that should match the token.
     *
     *      compile: function(token, stack, output) called when this token is being compiled.
     *                   Should return an object with stack and output set.
     *
     *      parse:   function(token, stack, context) called when this token is being parsed.
     *                   Should return an object with stack and context set.
     *  }
     *
     * @param {Object} definition A token definition.
     */
    Twig.expression.extend = function (definition) {

        if (!definition.type) {
            throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
        }
        Twig.expression.handler[definition.type] = definition;
    };

    // Extend with built-in expressions
    while (Twig.expression.definitions.length > 0) {
        Twig.expression.extend(Twig.expression.definitions.shift());
    }

    /**
     * Break an expression into tokens defined in Twig.expression.definitions.
     *
     * @param {string} expression The string to tokenize.
     *
     * @return {Array} An array of tokens.
     */
    Twig.expression.tokenize = function (expression) {
        var tokens = [],
            // Keep an offset of the location in the expression for error messages.
            exp_offset = 0,
            // The valid next tokens of the previous token
            next = null,
            // Match information
            type, regex, regex_array,
            // The possible next token for the match
            token_next,
            // Has a match been found from the definitions
            match_found, invalid_matches = [], match_function;

        match_function = function () {
            var match = Array.prototype.slice.apply(arguments),
                string  = match.pop(),
                offset = match.pop();

            Twig.log.trace("Twig.expression.tokenize",
                           "Matched a ", type, " regular expression of ", match);

            if (next && next.indexOf(type) < 0) {
                invalid_matches.push(
                    type + " cannot follow a " + tokens[tokens.length - 1].type +
                           " at template:" + exp_offset + " near '" + match[0].substring(0, 20) +
                           "...'"
                );
                // Not a match, don't change the expression
                return match[0];
            }
            invalid_matches = [];

            tokens.push({
                type:  type,
                value: match[0],
                match: match
            });

            match_found = true;
            next = token_next;
            exp_offset += match[0].length;
            return '';
        };

        Twig.log.debug("Twig.expression.tokenize", "Tokenizing expression ", expression);

        while (expression.length > 0) {
            expression = expression.trim();
            for (type in Twig.expression.handler) {
                if (Twig.expression.handler.hasOwnProperty(type)) {
                    token_next = Twig.expression.handler[type].next;
                    regex = Twig.expression.handler[type].regex;
                    Twig.log.trace("Checking type ", type, " on ", expression);
                    if (regex instanceof Array) {
                        regex_array = regex;
                    } else {
                        regex_array = [regex];
                    }

                    match_found = false;
                    while (regex_array.length > 0) {
                        regex = regex_array.pop();
                        expression = expression.replace(regex, match_function);
                    }
                    // An expression token has been matched. Break the for loop and start trying to
                    //  match the next template (if expression isn't empty.)
                    if (match_found) {
                        break;
                    }
                }
            }
            if (!match_found) {
                if (invalid_matches.length > 0) {
                    throw new Twig.Error(invalid_matches.join(" OR "));
                } else {
                    throw new Twig.Error("Unable to parse '" + expression + "' at template position" + exp_offset);
                }
            }
        }

        Twig.log.trace("Twig.expression.tokenize", "Tokenized to ", tokens);
        return tokens;
    };

    Twig.expression.compile = function (raw_token) {
        var expression = raw_token.value,
            // Tokenize expression
            tokens = Twig.expression.tokenize(expression),
            token = null,
            output = [],
            stack = [],
            value = null,
            token_template = null;

        Twig.log.trace("Twig.expression.compile: ", "Compiling ", expression);
        Twig.log.trace("Twig.expression.compile: ", "Tokens tokenized to ", tokens);

        // Push tokens into RPN stack using the Sunting-yard algorithm
        // See http://en.wikipedia.org/wiki/Shunting_yard_algorithm

        while (tokens.length > 0) {
            token = tokens.shift();
            token_template = Twig.expression.handler[token.type];
            if (token_template.compile) {
                value = token_template.compile(token, stack, output);
                output = value.output && output;
                stack = value.stack && stack;
            }
        }

        while(stack.length > 0) {
            output.push(stack.pop());
        }

        Twig.log.trace("Twig.expression.compile: ", "Stack is", output);

        raw_token.stack = output;
        delete raw_token.value;

        return raw_token;

    };


    /**
     * Parse an RPN expression stack within a context.
     */
    Twig.expression.parse = function (tokens, context) {
        // If the token isn't an array, make it one.
        if (!(tokens instanceof Array)) {
            tokens = [tokens];
        }

        // The output stack
        var stack = [],
            token_template = null,
            new_env = null;

        tokens.forEach(function (token) {
            token_template = Twig.expression.handler[token.type];

            Twig.log.trace("Twig.expression.parse: ", "Parsing ", token);
            if (token_template.parse) {
                new_env = token_template.parse(token, stack, context);
                stack = new_env.stack && stack;
                context = new_env.context && context;
            }
            Twig.log.trace("Twig.expression.parse: ", "Stack result: ", stack);
        });
        // Pop the final value off the stack
        return stack.pop();
    };

    return Twig;

})( Twig || { } );

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

 /**
  * This file handles operator lookups and parsing.
  */
var Twig = (function (Twig) {
    "use strict";

    /**
     * Operator associativity constants.
     */
    Twig.expression.operator = {
        leftToRight: 'leftToRight',
        rightToLeft: 'rightToLeft'
    };

    /**
     * Get the precidence and associativity of an operator. These follow the order that C/C++ use.
     * See http://en.wikipedia.org/wiki/Operators_in_C_and_C++ for the table of values.
     */
    Twig.expression.operator.lookup = function (operator, token) {
        switch (operator) {
            case ',':
                token.precidence = 18;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            // Ternary
            case '?':
            case ':':
                token.precidence = 16;
                token.associativity = Twig.expression.operator.rightToLeft;
                break;

            case '||':
                token.precidence = 14;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            case '&&':
                token.precidence = 13;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            case '==':
            case '!=':
                token.precidence = 9;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            case '<':
            case '<=':
            case '>':
            case '>=':
                token.precidence = 8;
                token.associativity = Twig.expression.operator.leftToRight;
                break;


            case '~': // String concatination
            case '+':
            case '-':
                token.precidence = 6;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            case '*':
            case '/':
            case '%':
                token.precidence = 5;
                token.associativity = Twig.expression.operator.leftToRight;
                break;

            case '!':
                token.precidence = 3;
                token.associativity = Twig.expression.operator.rightToLeft;
                break;

            default:
                throw new Twig.Error(operator + " is an unknown operator.");
        }
        token.operator = operator;
        return token;
    };

    /**
     * Handle operations on the RPN stack.
     *
     * Returns the updated stack.
     */
    Twig.expression.operator.parse = function (operator, stack) {
        Twig.log.trace("Twig.expression.operator.parse: ", "Handling ", operator);
        var a,b;
        switch (operator) {
            case '+':
                b = parseFloat(stack.pop());
                a = parseFloat(stack.pop());
                stack.push(a + b);
                break;

            case '-':
                b = parseFloat(stack.pop());
                a = parseFloat(stack.pop());
                stack.push(a - b);
                break;

            case '*':
                b = parseFloat(stack.pop());
                a = parseFloat(stack.pop());
                stack.push(a * b);
                break;

            case '/':
                b = parseFloat(stack.pop());
                a = parseFloat(stack.pop());
                stack.push(a / b);
                break;

            case '%':
                b = parseFloat(stack.pop());
                a = parseFloat(stack.pop());
                stack.push(a % b);
                break;

            case '~':
                b = stack.pop().toString();
                a = stack.pop().toString();
                stack.push(a + b);
                break;

            case '!':
                stack.push(!stack.pop());
                break;

            case '<':
                b = stack.pop();
                a = stack.pop();
                stack.push(a < b);
                break;

            case '<=':
                b = stack.pop();
                a = stack.pop();
                stack.push(a <= b);
                break;

            case '>':
                b = stack.pop();
                a = stack.pop();
                stack.push(a > b);
                break;

            case '>=':
                b = stack.pop();
                a = stack.pop();
                stack.push(a >= b);
                break;

            case '==':
                b = stack.pop();
                a = stack.pop();
                stack.push(a == b);
                break;

            case '!=':
                b = stack.pop();
                a = stack.pop();
                stack.push(a != b);
                break;

            case '||':
                b = stack.pop();
                a = stack.pop();
                stack.push(a || b);
                break;

            case '&&':
                b = stack.pop();
                a = stack.pop();
                stack.push(a && b);
                break;
        }

        return stack;
    };

    return Twig;

})( Twig || { } );

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

/**
 * This file handles parsing filters.
 */
var Twig = (function (Twig) {
    Twig.filters = {
        // String Filters
        upper:  function(value) {
            return value.toUpperCase();
        },
        lower: function(value) {
            return value.toLowerCase();
        },
        capitalize: function(value) {
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        },
        title: function(value) {
            return value.replace( /(^|\s)([a-z])/g , function(m, p1, p2){
                return p1 + p2.toUpperCase();
            });
        },
        length: function(value) {
            if (value instanceof Array || typeof value === "string") {
                return value.length;
            } else if (value instanceof Object) {
                if (value._keys === undefined) {
                    return Object.keys(value).length;
                } else {
                    return value._keys.length;
                }
            }
        },

        // Array/Object Filters
        reverse: function(value) {
            if (value instanceof Array) {
                return value.reverse();
            } else if (value instanceof Object) {
                var keys = value._keys || Object.keys(value).reverse();
                value._keys = keys;
                return value;
            }
        },
        sort: function(value) {
            if (value instanceof Array) {
                return value.sort();
            } else if (value instanceof Object) {
                // Sorting objects isn't obvious since the order of
                // returned keys isn't guaranteedin JavaScript.
                // Because of this we use a "hidden" key called _keys to
                // store the keys in the order we want to return them.

                var sorted_obj = { },
                    sorted_keys = Object.keys(value).sort(function(a, b) {
                        return value[a] > value[b];
                    });
                sorted_keys.forEach(function(key) {
                    sorted_obj[key] = value[key];
                });
                value._keys = sorted_keys;
                return value;
            }
        },
        keys: function(value) {
            var keyset = value._keys || Object.keys(value),
                output = [];

            keyset.forEach(function(key) {
                if (key === "_keys") return; // Ignore the _keys property
                if (value.hasOwnProperty(key)) {
                    output.push(key);
                }
            });
            return output;
        },
        url_encode: function(value) {
            return encodeURIComponent(value);
        },
        join: function(value, params) {
            var join_str = "",
                output = [],
                keyset = null;

            if (params && params[0]) {
                join_str = params[0];
            }
            if (value instanceof Array) {
                output = value;
            } else {
                keyset = value._keys || Object.keys(value);
                keyset.forEach(function(key) {
                    if (key === "_keys") return; // Ignore the _keys property
                    if (value.hasOwnProperty(key)) {
                        output.push(value[key]);
                    }
                });
            }
            return output.join(join_str);
        },
        "default": function(value, params) {
            if (params === undefined || params.length !== 1) {
                throw new Twig.Error("default filter expects one argument");
            }
            if (value === undefined || value === null || value === '' ) {
                return params[0];
            } else {
                return value;
            }
        },
        json_encode: function(value) {
            delete value._keys;
            return JSON.stringify(value);
        },
        merge: function(value, params) {
            var obj = [],
                arr_index = 0,
                keyset = [];

            // Check to see if all the objects being merged are arrays
            if (!(value instanceof Array)) {
                // Create obj as an Object
                obj = { };
            } else {
                params.forEach(function(param) {
                    if (!(param instanceof Array)) {
                        obj = { };
                    }
                });
            }
            if (!(obj instanceof Array)) {
                obj._keys = [];
            }

            if (value instanceof Array) {
                value.forEach(function(val) {
                    if (obj._keys) obj._keys.unshift(arr_index);
                    obj[arr_index] = val;
                    arr_index++;
                });
            } else {
                keyset = value._keys || Object.keys(value);
                keyset.forEach(function(key) {
                    obj[key] = value[key];
                    obj._keys.push(key);

                    // Handle edge case where a number index in an object is greater than
                    //   the array counter. In such a case, the array counter is increased
                    //   one past the index.
                    //
                    // Example {{ ["a", "b"]|merge({"4":"value"}, ["c", "d"])
                    // Without this, d would have an index of "4" and overwrite the value
                    //   of "value"
                    var int_key = parseInt(key, 10);
                    if (!isNaN(int_key) && int_key >= arr_index) {
                        arr_index = int_key + 1;
                    }
                });
            }

            // mixin the merge arrays
            params.forEach(function(param) {
                if (param instanceof Array) {
                    param.forEach(function(val) {
                        if (obj._keys) obj._keys.push(arr_index);
                        obj[arr_index] = val;
                        arr_index++;
                    });
                } else {
                    keyset = param._keys || Object.keys(param);
                    keyset.forEach(function(key) {
                        if (!obj[key]) obj._keys.unshift(key);
                        obj[key] = param[key];

                        var int_key = parseInt(key, 10);
                        if (!isNaN(int_key) && int_key >= arr_index) {
                            arr_index = int_key + 1;
                        }
                    });
                }
            })
            if (params.length === 0) {
                throw new Twig.Error("Filter merge expects at least one parameter");
            }

            return obj;
        }


        /*convert_encoding,
        date,
        escape,
        format,
        raw,
        replace,
        striptags */
    };

    Twig.filter = function(filter, value, params) {
        if (!Twig.filters[filter]) {
            throw "Unable to find filter " + filter;
        }
        return Twig.filters[filter](value, params);
    }

    return Twig;
})(Twig || { });

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

 /**
  * This file handles expression tests.
  */
var Twig = (function (Twig) {
    "use strict";
    Twig.tests = {
        empty: function(value) {
            if (value === null || value === undefined) return true;
            // Handle string and array
            if (value.length && value.length > 0) return false;
            // Handle objects
            for (var key in value) {
                if (value.hasOwnProperty(key)) return false;
            }
            return true;
        },
        odd: function(value) {
            return value % 2 === 1;
        },
        even: function(value) {
            return value % 2 === 0;
        },
        divisibleby: function(value, params) {
            return value % params[0] === 0;
        },
        defined: function(value) {
            return value !== undefined;
        },
        none: function(value) {
            return value === null;
        }
        /*
        constant ?
         */
    };

    Twig.test = function(test, value, params) {
        if (!Twig.tests[test]) {
            throw "Test " + test + " is not defined.";
        }
        return Twig.tests[test](value, params);
    };

    return Twig;
})( Twig || { } );

/**
 * Twig.js v0.2
 * Copyright (c) 2011 John Roepke
 * Available under the BSD 2-Clause License
 */

// Provide a CommonJS module export.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = twig;
} else {
    window.twig = twig;
}


