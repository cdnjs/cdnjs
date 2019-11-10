/*
 * approve.js 0.0.3
 * A simple validation library.
 * Author: Charl Gottschalk
 * @license: MIT
 */

/** @namespace approve */
;(function(root, factory) {    // eslint-disable-line no-extra-semi
    // Save the previous value of 'approve'
    root._approve = root.approve;

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.approve = factory(root));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(root);
    } else {
        // Browser globals (root is self)
        root.approve = factory(root);
    }
}(this, function(root) {
    /** @constructor */
    var approve = {};

    /** 
     * ApproveJs version
     * @memberOf approve
     */
    approve.VERSION = '0.0.3';

    /**
     * Default tests.
     * 
     * Each test has at least three members
     * 
     * A 'validate' method wich is called when testing a value, a 'message' property that holds the default error message and an 'expects' property that is either false if the test expects no parameters, or an array of strings representing the names of the expected parameters.
     * 
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
         * @param {integer} min - The minimum allowed length.
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
         * @param {integer} max - The maximum allowed length.
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
         * @param {integer} min - The minimum allowed length.
         * @param {integer} max - The maximum allowed length.
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
         * @param {string} field - The id of the DOM &lt;input/&gt; element to test against.
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
                var other = document.getElementById(pars.field);
                return '' + value === '' + other.value;
            },
            message: '{title} must be equal to {field}',
            expects: ['field']
        },
        /**
         * Checks if a value passes a given regular expression.
         * @param {regexp} regex - The regular expression to test against.
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
     */
    approve._format = function(text, col) {
        col = typeof col === 'object' ? col : arrFn.slice.call(arguments, 1);
        return text.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
            if (m == "{{") { return "{"; }
            if (m == "}}") { return "}"; }
            return col[n];
        });
    };

    /**
     * Returns an array of formatted error messages returned by tests that return objects instead of booleans.
     * @example
     * this._formatErrors(['array', 'of', 'errors'], title);
     * @param {array} errors - The array of unformatted errors returned by the test's result.
     * @param {string} title - The title to replace the {title} placeholder with.
     * @return {array} The formatted errors
     * @memberOf approve
     */
    approve._formatErrors = function(errors, title) {
        var format = {title: title};
        for (var i = errors.length - 1; i >= 0; i--) {
            errors[i] = this.format(errors[i], format);
        }
        return errors;  
    };

    /**
     * Returns the correctly formatted message representing the current test's failure.
     * @example
     * this._message(rule, rules, title);
     * @param {string} rule - The current rule being processed.
     * @param {object} rules - The rules object for the value being tested.
     * @param {string} title - The title to replace the {title} placeholder with.
     * @return {string} The correctly formatted error message
     * @memberOf approve
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
                format = {};
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
            message = this.format(message, format);
            // Return the formatted message.
            return message.trim();
        }        
    };

    /**
     * Executes the tests based on given rules to validate a given value.
     * @example
     * approve.value('some value', {test: constraints});
     * @param {string|integer} value - The value to test against the rules.
     * @param {object} rules - The constraints for the value being tested.
     * @param {string} title - The title to replace the {title} placeholder with.
     * @return {object} The object containing the result of the tests performed.
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
                        result.errors = result.errors.concat(this._formatErrors(ret.getErrors(), title));
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
     * Used to extend the default tests with custom tests.
     * @example
     * var test = {
     *      expects: false,
     *      message: '{title} did not pass the test.',
     *      validate: function(value) {
     *          return this.strength(value);
     *      },
     *   };
     *   approve.addTest(test, 'test_name');
     * @param {obj} obj - The test object to add.
     * @param {string} name - The name of the test.
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
     * Used to configure default values, such as default error messages.
     * @example
     * approve.configure({
     *     test: {
     *         message: 'New error message'
     *     },
     * });
     * @param {obj} obj - The configuration to update.
     * @return void
     * @memberOf approve
     */
    approve.configure = function(obj) {
        // If obj is not a valid object, we cannot continue.
        if (typeof obj !== 'object') {
            console.error('approve.configure(obj): obj is not a valid object.');
        }
        try {
            // Loop all properties in the config object.
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    // Does the tests have the object being configured?
                    if (this.tests.hasOwnProperty(name)) {
                        // The test exists. Configure it.
                        for (var prop in obj[name]) {
                            if (obj[name].hasOwnProperty(prop)) {
                                // Set the property of the test, to that of the configuration.
                                this.tests[name][prop] = obj[name][prop];
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error('approve.configure(): ' + e.message);
        }
    };

    /**
     * Returns the root approve variable back to the previous object
     * @example
     * var approveObj = approve.noconflict();
     * opproveObj.value(...);
     * @return this
     * @memberOf approve
     */
    approve.noconflict = function() {
        root.approve = root._approve;
        return this;
    };
    
    /*
     * Return the main ApproveJs object.
     */
    return approve;
}));

/*
 * approve.strength.js 0.0.3
 * Tests whether a value is a strong password like string.
 * Author: Charl Gottschalk
 * @license: MIT
 */

/** 
 * Checks if a value is a strong password string.
 * @example
 * approve.value('some value', {srength: true});
 * @return {object} An object with various properties relating to the value's score.
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
     * Expects no parameters.
     */
    expects: false,
    /**
     * Returns an object containing the score of a value.
     * @param {string} text - The text to score.
     * @return {object} The score of the text.
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
     * @param {string} text - The text to score.
     * @return {object} The score and validation of the text.
     */
    strength: function (text) {
        var min = this.minimum,
            bonus = this.minimumBonus,
            message = this.messages[0],
            result = {     
                message: message,
                minimum: min,
                minimumBonus: bonus,
                score: {},
                valid: false,
                getErrors: function() {
                    var errors = [];
                    if (!this.score.isMinimum) {
                        errors.push('{title} must be at least ' + min + ' characters');
                    }
                    if (!this.score.hasLower) {
                        errors.push('{title} must have at least 1 lower case character');
                    }
                    if (!this.score.hasUpper) {
                        errors.push('{title} must have at least 1 upper case character');
                    }
                    if (!this.score.hasSpecial) {
                        errors.push('{title} must have at least 1 special character');
                    }
                    if (!this.score.hasNumber) {
                        errors.push('{title} must have at least 1 number');
                    }
                    return errors;
                }
            };
        result.score = this.score(text);
        result.message = this.messages[result.score.value];
        if (result.score.value > 4) {
          result.valid = true;
        }
        return result;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
     * @param {string|integer} value - The value to test.
     * @return {object} The result object of the test.
     */
    validate: function(value) {
        return this.strength(value);
    },
};
approve.addTest(strength, 'strength');