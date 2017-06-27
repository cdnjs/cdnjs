/*!
 * approve.js 0.0.2
 * A simple validation library.
 * Author: Charl Gottschalk
 * @license: MIT
 */

// A helper function for formatting strings:
// 'i can speak {language} since i was {age}'.format({language:'javascript',age:10});
// 'i can speak {0} since i was {1}'.format('javascript',10});
String.prototype.format = function(col) {
    col = typeof col === 'object' ? col : arrFn.slice.call(arguments, 1);
    return this.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return col[n];
    });
};

// AMD with global, Node, or global
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
    var approve = {};

    approve.NAME = 'ApproveJs';
    approve.DESCRIPTION = 'Provides for simple form input value validation.';
    approve.VERSION = '0.0.2';
    approve.DEPENDENCIES = [];

    approve.tests = {
        required: {
            validate: function(value) {
                return !!value;
            },
            message: '{title} is required',
            expects: false
        },
        email: {
            regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, // eslint-disable-line no-control-regex
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid email address',
            expects: false
        },
        url: {
            regex: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid web address',
            expects: false
        },
        cc: {
            regex: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid credit card number',
            expects: false
        },
        alphaNumeric: {
            regex: /^[A-Za-z0-9]+$/i,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [Aa-Zz] and [0-9]',
            expects: false
        },
        numeric: {
            regex: /^[0-9]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [0-9]',
            expects: false
        },
        alpha: {
            regex: /^[A-Za-z]+$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} may only contain [Aa-Zz]',
            expects: false
        },
        decimal: {
            regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid decimal',
            expects: false
        },
        currency: {
            regex: /^\s*(\+|-)?((\d+(\.\d\d)?)|(\.\d\d))\s*$/,
            validate: function(value) {
                return this.regex.test(value);
            },
            message: '{title} must be a valid currency value',
            expects: false
        },
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
        min: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length >= pars.min;
            },
            message: '{title} must be a minimum of {min} characters',
            expects: ['min']
        },
        max: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length <= pars.max;
            },
            message: '{title} must be a maximum of {max} characters',
            expects: ['max']
        },
        range: {
            validate: function(value, pars) {
                return typeof value === 'string' && value.length >= pars.min && value.length <= pars.max;
            },
            message: '{title} must be a minimum of {min} and a maximum of {max} characters',
            expects: ['min', 'max']
        },
        equal: {
            validate: function(value, pars) {
                var other = document.getElementById(pars.field);
                return '' + value === '' + other.value;
            },
            message: '{title} must be equal to {field}',
            expects: ['field']
        },
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

    approve._formatErrors = function(errors, title) {
        var format = {title: title};
        for (var i = errors.length - 1; i >= 0; i--) {
            errors[i] = errors[i].format(format);
        }
        return errors;  
    };

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
                for (var i = this.tests[rule].expects.length - 1; i >= 0; i--) {
                    var expects = this.tests[rule].expects[i];
                    // Check if the rule object has the required parameter.
                    if (rules[rule].hasOwnProperty(expects)) {
                        // Add the expected parameter's format to the parameter value.
                        format[expects] = rules[rule][expects];
                    }
                }
            }
            // Check if the rule has a name property?
            // This is used to format the message with the field name.
            if (rules[rule].hasOwnProperty('title')) {
                // Format the message to include the field name.
                format.title = rules[rule].title;
            } else {
                // Format the message to include the provided title paramater as the field name.
                format.title = title;
            }
            message = message.format(format);
            // Return the formatted message.
            return message;
        }        
    };

    approve.value = function(value, rules, title) {
        if (typeof rules !== 'object') {
            console.error('approve.value(value, rules): rules is not a valid object.');
        }

        var result = {
            approved: true,
            errors: []
        };

        // Loop through provided rules.
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
                        result.errors = result.errors.concat(this._formatErrors(ret.getErrors(), title));
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

    approve.extend = function(tests) {
        if (typeof obj !== 'object') {
            console.error('approve.extend(tests): tests is not a valid object.');
        }
        try {
            for (var test in tests) {
                if (tests.hasOwnProperty(test)) {
                    if (!this.tests.hasOwnProperty(test)) {
                        this.tests[test] = tests[test];
                    }
                }
            }
        } catch(e) {
            console.error('approve.extend(): ' + e.message);
        }
    };

    approve.addTest = function(obj, name) {
        if (typeof obj !== 'object') {
            console.error('approve.addTest(obj, name): obj is not a valid object.');
        }
        try {
            if (!this.tests.hasOwnProperty(name)) {
                this.tests[name] = obj;
            }
        } catch (e) {
            console.error('approve.addTest(): ' + e.message);
        }
    };

    approve.noconflict = function() {
        root.approve = root._approve;
        return this;
    };
    
    return approve;
}));

approve.addTest({
    config: {
        minimum: 8,
        minimumBonus: 10,
        messages: {
            0: 'Very Weak',
            1: 'Weak',
            2: 'Better',
            3: 'Almost',
            4: 'Acceptable',
            5: 'Strong',
            6: 'Very Strong'
        }
    },
    validate: function(value) {
        return this.strength(value);
    },
    message: '{title} did not pass the strength test.',
    expects: false,
    score: function(text) {
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
        // If password is longer than minimum give 1 point
        if (text.length > this.config.minimum){
            score.value++;
            score.isMinimum = true;
        } else {
            score.value = 1;
            score.isMinimum = false;
        }
        // If password has lowercase characters give 1 point
        if ( text.match(/[a-z]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasLower = true;
        }
        // If password has uppercase characters give 1 point
        if ( text.match(/[A-Z]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasUpper = true;
        }
        // If password has at least one number give 1 point
        if (text.match(/\d+/)) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasNumber = true;
        }
        // If password has at least one special caracther give 1 point
        if ( text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
            if(score.isMinimum) {
                score.value++;
            }
            score.hasSpecial = true;
        }
        // If password is longer than minimumBonus give another 1 point
        if (text.length > this.config.minimumBonus) {
            score.value++;
            score.isBonus = true;
        }
        score.strength = Math.ceil((score.value / 6) * 100);

        return score;
    },
    strength: function (text) {
        var min = this.config.minimum,
            bonus = this.config.minimumBonus,
            message = this.config.messages[0];
        var result = {           
            message: message,
            minimum: min,
            minimumBonus: bonus,
            score: {
                value: 0,
                isMinimum: false,
                hasLower: false,
                hasUpper: false,
                hasNumber: false,
                hasSpecial: false,
                isBonus: false,
                strength: 0
            },
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
        result.message = this.config.messages[result.score.value];
        if (result.score.value > 4) {
          result.valid = true;
        }
        return result;
    }
}, 'strength');