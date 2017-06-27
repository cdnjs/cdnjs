/**
 * approve.js 0.0.5
 * A simple validation library that doesn't interfere.
 * Author: Charl Gottschalk
 * @license: MIT
 */

/** @namespace approve */
;(function(root, factory) {    // eslint-disable-line no-extra-semi
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.approve = factory());
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is self)
        root.approve = factory();
    }
}(this, function(root) {
    /** @constructor */
    var approve = {};

    /** 
     * ApproveJs version
     * @memberOf approve
     * @ignore
     */
    approve.VERSION = '0.0.5';

    /**
     * Default tests.<br>
     * Each test has at least three members.<br>
     * <code>validate()</code> - the method which is called when testing a value.<br>
     * <code>message</code> - the property that holds the default error message.<br>
     * <code>expects</code> - the property that is either false if the test expects no parameters, or an array of strings representing the names of the expected parameters.<br>
     * Each test either returns a boolean or an object.
     * @memberOf approve
     * @namespace approve.tests
     */
    approve.tests = {
        /**
         * Checks if a value is present.
         * @example
         * approve.value('some value', {required: true});
         * @function required
         * @memberOf approve.tests
         * @inner
         */
        required: {
            validate: function(value) {
                return !!value;
            },
            message: '{title} is required',
            expects: false
        },
        /**
         * Checks if a value is a valid email address.
         * @example
         * approve.value('some value', {email: true});
         * @function email
         * @memberOf approve.tests
         * @inner
         */
        email: {
            regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid email address',
            expects: false
        },
        /**
         * Checks if a value is a valid web address.
         * @example
         * approve.value('some value', {url: true});
         * @function url
         * @memberOf approve.tests
         * @inner
         */
        url: {
            regex: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid web address',
            expects: false
        },
        /**
         * Checks if a value is a valid credit card number.
         * @example
         * approve.value('some value', {cc: true});
         * @function cc
         * @memberOf approve.tests
         * @inner
         */
        cc: {
            regex: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid credit card number',
            expects: false
        },
        /**
         * Checks if a value contains both letters and numbers.
         * @example
         * approve.value('some value', {alphaNumeric: true});
         * @function alphaNumeric
         * @memberOf approve.tests
         * @inner
         */
        alphaNumeric: {
            regex: /^[A-Za-z0-9]+$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [A-Za-z] and [0-9]',
            expects: false
        },
        /**
         * Checks if a value contains only numbers.
         * @example
         * approve.value('some value', {numeric: true});
         * @function numeric
         * @memberOf approve.tests
         * @inner
         */
        numeric: {
            regex: /^[0-9]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [0-9]',
            expects: false
        },
        /**
         * Checks if a value contains only letters.
         * @example
         * approve.value('some value', {alpha: true});
         * @function alpha
         * @memberOf approve.tests
         * @inner
         */
        alpha: {
            regex: /^[A-Za-z]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [A-Za-z]',
            expects: false
        },
        /**
         * Checks if a value is a valid decimal.
         * @example
         * approve.value('some value', {decimal: true});
         * @function decimal
         * @memberOf approve.tests
         * @inner
         */
        decimal: {
            regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid decimal',
            expects: false
        },
        /**
         * Similar to 'decimal', but for currency values.
         * @example
         * approve.value('some value', {currency: true});
         * @function currency
         * @memberOf approve.tests
         * @inner
         */
        currency: {
            regex: /^\s*(\+|-)?((\d+(\.\d\d)?)|(\.\d\d))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid currency value',
            expects: false
        },
        /**
         * Checks if a value is a valid ipv4 or ipv6 address.
         * @example
         * approve.value('some value', {ip: true});
         * @function ip
         * @memberOf approve.tests
         * @inner
         */
        ip: {
            regex: {
                ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
                ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
            },
            validate: function(value) {
                return this.regex.ipv4.test(value) || this.regex.ipv6.test(value);
            },
            message: '{title} must be a valid IP address',
            expects: false
        },
        /**
         * Checks if a value is a minimum of n characters.
         * @param {Integer} min - The minimum allowed length.
         * @example
         * approve.value('some value', {min: 5});
         * @function min
         * @memberOf approve.tests
         * @inner
         */
        min: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length >= pars.min;
            },
            message: '{title} must be a minimum of {min} characters',
            expects: ['min']
        },
        /**
         * Checks if a value is a maximum of n characters.
         * @param {Integer} max - The maximum allowed length.
         * @example
         * approve.value('some value', {max: 20});
         * @function max
         * @memberOf approve.tests
         * @inner
         */
        max: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length <= pars.max;
            },
            message: '{title} must be a maximum of {max} characters',
            expects: ['max']
        },
        /**
         * Checks if a value's length is between a minimum and maximum.
         * @param {Integer} min - The minimum allowed length.
         * @param {Integer} max - The maximum allowed length.
         * @example
         * var rule = {
         *     range: {
         *         min: 5,
         *         max: 20
         *     }
         * };
         * approve.value('some value', rule);
         * @function range
         * @memberOf approve.tests
         * @inner
         */
        range: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length >= pars.min && value.length <= pars.max;
            },
            message: '{title} must be a minimum of {min} and a maximum of {max} characters',
            expects: ['min', 'max']
        },
        /**
         * Checks if a value is the same as the value of another.
         * This test gets the value from a DOM &lt;input/&gt; element.
         * @param {String} field - The id of the DOM &lt;input/&gt; element to test against.
         * @example
         * var rule = {
         *     equal: 'password'
         * };
         * approve.value('some value', rule);
         * @function equal
         * @memberOf approve.tests
         * @inner
         */
        equal: {
            validate: function(value, pars) {
                return '' + value === '' + pars.value;
            },
            message: '{title} must be equal to {field}',
            expects: ['value', 'field']
        },
        /**
         * Checks if a value passes a given regular expression.
         * @param {RegExp} regex - The regular expression to test against. <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">MDN</a>
         * @example
         * var rule = {
         *     format: /^[A-Za-z0-9]+$/i
         * };
         * approve.value('some value', rule);
         * @function format
         * @memberOf approve.tests
         * @inner
         */
        format: {
            validate: function(value, pars) {
                if (Object.prototype.toString.call(pars.regex) === '[object RegExp]') {
                    return pars.regex.test(value);
                }
                console.error('approve.tests.format(value, regex): regex is not a valid regular expression.');
                return false;
            },
            message: '{title} did not pass the [{regex}] test',
            expects: ['regex']
        }
    };

    /** 
     * A helper function for formatting strings:
     * @example
     * this._format('i can speak {language} since i was {age}', {language:'javascript',age:10});
     * @example
     * this._format('i can speak {0} since i was {1}', 'javascript',10});
     * @memberOf approve
     * @ignore
     */
    approve._format = function(text, col) {
        col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
        return text.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return col[n];
        });
    };

    /**
     * Returns an array of formatted error messages returned by tests that return objects instead of booleans.
     * @example
     * this._formatMessages(['array', 'of', 'errors'], title);
     * @param {Array} errors - The array of unformatted errors returned by the test's result.
     * @param {String} title - The title to replace the {title} placeholder with.
     * @return {Array} The formatted errors
     * @memberOf approve
     * @ignore
     */
    approve._formatMessages = function(errors, rule, rules, title) {
        var format = this._getFormat(rule, rules, title);
        for (var i = errors.length - 1; i >= 0; i--) {
            errors[i] = this._format(errors[i], format).trim();
        }
        return errors;  
    };

    /**
     * Returns format object to correctly format an error message with the correct test values.
     * @example
     * this._getFormat(rule, rules, title);
     * @param {String} rule - The current rule being processed.
     * @param {Object} rules - The rules object for the value being tested.
     * @param {String} title - The title to replace the {title} placeholder with.
     * @return {Object} The object used to format an error message
     * @memberOf approve
     * @ignore
     */
    approve._getFormat = function(rule, rules, title) {
        var format = {};
        // Does the test for the rule expect parameters?
        if (Array.isArray(this.tests[rule].expects)) {
            // The test for the rule expects paramaters.
            // Loop through expected paramaters for the rule's test.
            var expects = '';
            for (var i = this.tests[rule].expects.length - 1; i >= 0; i--) {
                expects = this.tests[rule].expects[i];
                // Check if the rule object has the required parameter.
                if (rules[rule].hasOwnProperty(expects)) {
                    // Add the expected parameter's format to the parameter value.
                    format[expects] = rules[rule][expects];
                }
                // Expected parameter not present, is the constraint formattable?
                if (/^[A-Za-z0-9]+$/i.test(rules[rule])) {
                    format[expects] = rules[rule];
                }
            }
        }
        // Check if the rule has a name property?
        // This is used to format the message with the field name.
        if (rules.hasOwnProperty('title')) {
            // Format the message to include the field name.
            format.title = rules.title;
        } else {
            // Format the message to include the provided title paramater as the field name.
            format.title = title;
        }
        // Return the formatted message.
        return format;
    };

    /**
     * Returns the correctly formatted message representing the current test's failure.
     * @example
     * this._message(rule, rules, title);
     * @param {String} rule - The current rule being processed.
     * @param {Object} rules - The rules object for the value being tested.
     * @param {String} title - The title to replace the {title} placeholder with.
     * @return {String} The correctly formatted error message
     * @memberOf approve
     * @ignore
     */
    approve._message = function(rule, rules, title) {
        // Does the provided rule have a custom message?
        if (rules[rule].hasOwnProperty('message')) {
            // The rule has a custom message, return it.
            return rules[rule].message;
        }
        else {
            // The rule does not have a custom message.
            // Get the default message from the tests.
            var message = this.tests[rule].message,
                format = this._getFormat(rule, rules, title);
            return this._format(message, format).trim();
        }        
    };

    /**
     * Executes the tests based on given rules to validate a given value.<br><br>
     * Returns an object with at least two properties:<br>
     * <code>approved</code> : Boolean - <code>true</code> if test succeeded, otherwise <code>false</code>.<br>
     * <code>errors</code> : Array of String - holds a list of formatted errors.
     * @example
     * var result = approve.value('some value', {test: constraints});
     * if (result.approved) {
     *    // Value is approved - do something
     * } else {
     *    // Do something with the errors
     *    result.each(function(error) {
     *       console.log(error);
     *    });
     * }
     * @param {String|Integer} value - The value to test against the rules.
     * @param {Object} rules - The constraints for the value being tested.
     * @param {String} [title] - The title to replace the {title} placeholder in error messages with.
     * @return {Object} The object containing the result of the tests performed.
     * @memberOf approve
     */
    approve.value = function(value, rules, title) {

        // If rules is not an object, we cannot continue.
        if (typeof rules !== 'object') {
            console.error('approve.value(value, rules): rules is not a valid object.');
        }

        // Instantiate a new result object.
        var result = {
            approved: true,
            errors: [],
            // Provides easy access to the loop for the errors.
            each: function(fn) {
                var isFunc = fn && fn.constructor && fn.call && fn.apply;
                for (var i = this.errors.length - 1; i >= 0; i--) {
                    if (isFunc) {
                        fn(this.errors[i]);
                    }
                }
            }
        };

        // Loop through given rules.
        for (var rule in rules) {
            if (rules.hasOwnProperty(rule)) {
                title = title || '';
                // Check if rule exists in tests.
                if (this.tests.hasOwnProperty(rule)) {
                    // Create a pars object for required parameters.
                    var pars = {};
                    // Does the test for this rule expect any paramaters?
                    if (Array.isArray(this.tests[rule].expects)) {
                        // This test expects paramaters.
                        // Loop through the test's expected parameters and add the values from the rule.
                        for (var i = this.tests[rule].expects.length - 1; i >= 0; i--) {
                            var expects = this.tests[rule].expects[i];
                            // Check if the rule object has the required parameter.
                            if (rules[rule].hasOwnProperty(expects)) {
                                // Add the expected parameter value to the pars object.
                                pars[expects] = rules[rule][expects];
                            } else {
                                // Set the parameter to the rule's value.
                                pars[expects] = rules[rule];
                            }
                        }
                    }
                    // Does the rule have config?
                    if (rules[rule].hasOwnProperty('config')) {
                        // Add the config to the pars object.
                        pars.config = rules[rule].config;
                    }
                    // Test the value.
                    var ret = this.tests[rule].validate(value, pars);
                    // Check if the returned value is an object.
                    if(typeof ret === 'object')
                    {
                        // An object was returned.
                        // Check if the test was successful.
                        if (!ret.valid) {
                            // The test failed, set the result object properties.
                            result.approved = false;
                            result.errors.push(this._message(rule, rules, title));
                        }
                        // Add the error messages returned by the resluting object.
                        result.errors = result.errors.concat(this._formatMessages(ret.errors, rule, rules, title));
                        // Merge any properties from the resulting object with the main result to be returned.
                        for (var prop in ret) {
                            if (ret.hasOwnProperty(prop)) {
                                result[prop] = ret[prop];
                            }
                        }
                    } else {
                        // Check if the returned value is a boolean
                        if (typeof ret !== 'boolean') {
                            // We don't process if it's not a boolean or object.
                            result.approved = false;
                            result.errors.push(this._message(rule, rules, title));
                        } else {
                            if (!ret) {
                                // The test failed, set the result object properties.
                                result.approved = false;
                                result.errors.push(this._message(rule, rules, title));
                            }
                        }
                    }
                }
            }
        }
        // Return the result object.
        return result;
    };

    /**
     * Used to add custom tests.
     * @example
     * var test = {
     *    expects: false,
     *    message: '{title} did not pass the test.',
     *    validate: function(value) {
     *        return this.strength(value);
     *    },
     * };
     * approve.addTest(test, 'test_name');
     * @param {Object} obj - The test object to add.
     * @param {String} name - The name of the test.
     * @return void
     * @memberOf approve
     */
    approve.addTest = function(obj, name) {
        // If obj is not a valid object, we cannot continue.
        if (typeof obj !== 'object') {
            console.error('approve.addTest(obj, name): obj is not a valid object.');
        }
        try {
            // Check if the test name already exists.
            if (!this.tests.hasOwnProperty(name)) {
                // The name does not exist, add it to the tests.
                this.tests[name] = obj;
            }
        } catch (e) {
            console.error('approve.addTest(): ' + e.message);
        }
    };

    /** 
     * Checks if a value is a strong password string.
     * @example
     * var rule = {
     *     strength: {
     *         min: 8,
     *         bonus: 10
     *     }
     * };
     * approve.value('some value', rule);
     * @return {Object} An object with various properties relating to the value's score.
     * @function strength
     * @memberOf approve.tests
     * @inner
     */
    var strength = {
        /**
         * The minimum length a password must be.
         */
        minimum: 8,
        /**
         * The minimum length a password must be for a bonus point.
         */
        minimumBonus: 10,
        /**
         * The text representing the strength of a password.
         */
        messages: {
            0: 'Very Weak',
            1: 'Weak',
            2: 'Better',
            3: 'Almost',
            4: 'Acceptable',
            5: 'Strong',
            6: 'Very Strong'
        },
        /**
         * The default error message.
         */
        message: '{title} did not pass the strength test.',
        /**
         * Expects the 'min' and 'bonus' parameters.
         */
        expects: ['min', 'bonus'],
        /**
         * Default error messages
         * @type {Object}
         */
        errors: {
            isMinimum: '{title} must be at least {min} characters',
            hasLower: '{title} must have at least 1 lower case character',
            hasUpper: '{title} must have at least 1 upper case character',
            hasNumber: '{title} must have at least 1 number',
            hasSpecial: '{title} must have at least 1 special character'
        },
        /**
         * Returns an object containing the score of a value.
         * @param {String} text - The text to score.
         * @return {Object} The score of the text.
         */
        score: function(text) {
            // Create the object that represents the score of the text
            var score = {
                value: 0,
                isMinimum: false,
                hasLower: false,
                hasUpper: false,
                hasNumber: false,
                hasSpecial: false,
                isBonus: false,
                strength: 0
            };
            // If text is longer than minimum give 1 point.
            if (text.length > this.minimum){
                score.value++;
                score.isMinimum = true;
            } else {
                score.value = 1;
                score.isMinimum = false;
            }
            // If text has lowercase characters give 1 point.
            if ( text.match(/[a-z]/) ) {
                if(score.isMinimum) {
                    score.value++;
                }
                score.hasLower = true;
            }
            // If text has uppercase characters give 1 point.
            if ( text.match(/[A-Z]/) ) {
                if(score.isMinimum) {
                    score.value++;
                }
                score.hasUpper = true;
            }
            // If text has at least one number give 1 point.
            if (text.match(/\d+/)) {
                if(score.isMinimum) {
                    score.value++;
                }
                score.hasNumber = true;
            }
            // If text has at least one special caracther give 1 point.
            if ( text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
                if(score.isMinimum) {
                    score.value++;
                }
                score.hasSpecial = true;
            }
            // If text is longer than minimumBonus give another 1 point.
            if (text.length > this.minimumBonus) {
                score.value++;
                score.isBonus = true;
            }
            // Set the percentage value.
            score.strength = Math.ceil((score.value / 6) * 100);
            // Return the score object.
            return score;
        },
        /**
         * Returns an object containing the score and validation of a value.
         * @param {String} text - The text to score.
         * @return {Object} The score and validation of the text.
         */
        strength: function (text) {
            var result = {
                    message: this.messages[0],
                    minimum: this.minimum,
                    minimumBonus: this.minimumBonus,
                    score: {},
                    valid: false,
                    errors: []
                };
            result.score = this.score(text);
            result.message = this.messages[result.score.value];
            if (!result.score.isMinimum) {
                result.errors.push(this.errors.isMinimum);
            }
            if (!result.score.hasLower) {
                result.errors.push(this.errors.hasLower);
            }
            if (!result.score.hasUpper) {
                result.errors.push(this.errors.hasUpper);
            }
            if (!result.score.hasSpecial) {
                result.errors.push(this.errors.hasSpecial);
            }
            if (!result.score.hasNumber) {
                result.errors.push(this.errors.hasNumber);
            }
            if (result.score.value > 4) {
              result.valid = true;
            } 
            return result;
        },
        /**
         * The method that is called by ApproveJs to perform the test.
         * @param {String} value - The value to test.
         * @return {Object} The result object of the test.
         */
        validate: function(value, pars) {
            this.minimum = pars.min || this.minimum;
            this.minimumBonus = pars.bonus || this.minimumBonus;
            if (pars.hasOwnProperty('config') && pars.config.hasOwnProperty('messages')) {
                for (var message in pars.config.messages) {
                    if (pars.config.messages.hasOwnProperty(message)) {
                        this.errors[message] = pars.config.messages[message];
                    }
                }
            }
            return this.strength(value);
        },
    };
    approve.tests.strength = strength;

    /*
     * Return the main ApproveJs object.
     */
    return approve;
}));