/*
    json_parse_state.js
    2016-05-02

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.

        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === "string") {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint for */

/*property
    acomma, avalue, b, call, colon, container, exec, f, false, firstavalue,
    firstokey, fromCharCode, go, hasOwnProperty, key, length, n, null, ocomma,
    okey, ovalue, pop, prototype, push, r, replace, slice, state, t, test,
    true
*/

var json_parse = (function () {
    "use strict";

// This function creates a JSON parse function that uses a state machine rather
// than the dangerous eval function to parse a JSON text.

    var state;      // The state of the parser, one of
                    // 'go'         The starting state
                    // 'ok'         The final, accepting state
                    // 'firstokey'  Ready for the first key of the object or
                    //              the closing of an empty object
                    // 'okey'       Ready for the next key of the object
                    // 'colon'      Ready for the colon
                    // 'ovalue'     Ready for the value half of a key/value pair
                    // 'ocomma'     Ready for a comma or closing }
                    // 'firstavalue' Ready for the first value of an array or
                    //              an empty array
                    // 'avalue'     Ready for the next value of an array
                    // 'acomma'     Ready for a comma or closing ]
    var stack;      // The stack, for controlling nesting.
    var container;  // The current container object or array
    var key;        // The current key
    var value;      // The current value
    var escapes = { // Escapement translation table
        "\\": "\\",
        "\"": "\"",
        "/": "/",
        "t": "\t",
        "n": "\n",
        "r": "\r",
        "f": "\f",
        "b": "\b"
    };
    var string = {   // The actions for string tokens
        go: function () {
            state = "ok";
        },
        firstokey: function () {
            key = value;
            state = "colon";
        },
        okey: function () {
            key = value;
            state = "colon";
        },
        ovalue: function () {
            state = "ocomma";
        },
        firstavalue: function () {
            state = "acomma";
        },
        avalue: function () {
            state = "acomma";
        }
    };
    var number = {   // The actions for number tokens
        go: function () {
            state = "ok";
        },
        ovalue: function () {
            state = "ocomma";
        },
        firstavalue: function () {
            state = "acomma";
        },
        avalue: function () {
            state = "acomma";
        }
    };
    var action = {

// The action table describes the behavior of the machine. It contains an
// object for each token. Each object contains a method that is called when
// a token is matched in a state. An object will lack a method for illegal
// states.

        "{": {
            go: function () {
                stack.push({state: "ok"});
                container = {};
                state = "firstokey";
            },
            ovalue: function () {
                stack.push({container: container, state: "ocomma", key: key});
                container = {};
                state = "firstokey";
            },
            firstavalue: function () {
                stack.push({container: container, state: "acomma"});
                container = {};
                state = "firstokey";
            },
            avalue: function () {
                stack.push({container: container, state: "acomma"});
                container = {};
                state = "firstokey";
            }
        },
        "}": {
            firstokey: function () {
                var pop = stack.pop();
                value = container;
                container = pop.container;
                key = pop.key;
                state = pop.state;
            },
            ocomma: function () {
                var pop = stack.pop();
                container[key] = value;
                value = container;
                container = pop.container;
                key = pop.key;
                state = pop.state;
            }
        },
        "[": {
            go: function () {
                stack.push({state: "ok"});
                container = [];
                state = "firstavalue";
            },
            ovalue: function () {
                stack.push({container: container, state: "ocomma", key: key});
                container = [];
                state = "firstavalue";
            },
            firstavalue: function () {
                stack.push({container: container, state: "acomma"});
                container = [];
                state = "firstavalue";
            },
            avalue: function () {
                stack.push({container: container, state: "acomma"});
                container = [];
                state = "firstavalue";
            }
        },
        "]": {
            firstavalue: function () {
                var pop = stack.pop();
                value = container;
                container = pop.container;
                key = pop.key;
                state = pop.state;
            },
            acomma: function () {
                var pop = stack.pop();
                container.push(value);
                value = container;
                container = pop.container;
                key = pop.key;
                state = pop.state;
            }
        },
        ":": {
            colon: function () {
                if (Object.hasOwnProperty.call(container, key)) {
                    throw new SyntaxError("Duplicate key '" + key + "\"");
                }
                state = "ovalue";
            }
        },
        ",": {
            ocomma: function () {
                container[key] = value;
                state = "okey";
            },
            acomma: function () {
                container.push(value);
                state = "avalue";
            }
        },
        "true": {
            go: function () {
                value = true;
                state = "ok";
            },
            ovalue: function () {
                value = true;
                state = "ocomma";
            },
            firstavalue: function () {
                value = true;
                state = "acomma";
            },
            avalue: function () {
                value = true;
                state = "acomma";
            }
        },
        "false": {
            go: function () {
                value = false;
                state = "ok";
            },
            ovalue: function () {
                value = false;
                state = "ocomma";
            },
            firstavalue: function () {
                value = false;
                state = "acomma";
            },
            avalue: function () {
                value = false;
                state = "acomma";
            }
        },
        "null": {
            go: function () {
                value = null;
                state = "ok";
            },
            ovalue: function () {
                value = null;
                state = "ocomma";
            },
            firstavalue: function () {
                value = null;
                state = "acomma";
            },
            avalue: function () {
                value = null;
                state = "acomma";
            }
        }
    };

    function debackslashify(text) {

// Remove and replace any backslash escapement.

        return text.replace(/\\(?:u(.{4})|([^u]))/g, function (ignore, b, c) {
            return b
                ? String.fromCharCode(parseInt(b, 16))
                : escapes[c];
        });
    }

    return function (source, reviver) {

// A regular expression is used to extract tokens from the JSON text.
// The extraction process is cautious.

        var result;
        var tx = /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;

// Set the starting state.

        state = "go";

// The stack records the container, key, and state for each object or array
// that contains another object or array while processing nested structures.

        stack = [];

// If any error occurs, we will catch it and ultimately throw a syntax error.

        try {

// For each token...

            while (true) {
                result = tx.exec(source);
                if (!result) {
                    break;
                }

// result is the result array from matching the tokenizing regular expression.
//  result[0] contains everything that matched, including any initial whitespace.
//  result[1] contains any punctuation that was matched, or true, false, or null.
//  result[2] contains a matched number, still in string form.
//  result[3] contains a matched string, without quotes but with escapement.

                if (result[1]) {

// Token: Execute the action for this state and token.

                    action[result[1]][state]();

                } else if (result[2]) {

// Number token: Convert the number string into a number value and execute
// the action for this state and number.

                    value = +result[2];
                    number[state]();
                } else {

// String token: Replace the escapement sequences and execute the action for
// this state and string.

                    value = debackslashify(result[3]);
                    string[state]();
                }

// Remove the token from the string. The loop will continue as long as there
// are tokens. This is a slow process, but it allows the use of ^ matching,
// which assures that no illegal tokens slip through.

                source = source.slice(result[0].length);
            }

// If we find a state/token combination that is illegal, then the action will
// cause an error. We handle the error by simply changing the state.

        } catch (e) {
            state = e;
        }

// The parsing is finished. If we are not in the final "ok" state, or if the
// remaining source contains anything except whitespace, then we did not have
//a well-formed JSON text.

        if (state !== "ok" || (/[^\u0020\t\n\r]/.test(source))) {
            throw (state instanceof SyntaxError)
                ? state
                : new SyntaxError("JSON");
        }

// If there is a reviver function, we recursively walk the new structure,
// passing each name/value pair to the reviver function for possible
// transformation, starting with a temporary root object that holds the current
// value in an empty key. If there is not a reviver function, we simply return
// that value.

        return (typeof reviver === "function")
            ? (function walk(holder, key) {
                var k;
                var v;
                var val = holder[key];
                if (val && typeof val === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(val, k)) {
                            v = walk(val, k);
                            if (v !== undefined) {
                                val[k] = v;
                            } else {
                                delete val[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, val);
            }({"": value}, ""))
            : value;
    };
}());
