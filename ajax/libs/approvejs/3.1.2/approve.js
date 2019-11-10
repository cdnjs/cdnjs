(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.approve = factory());
}(this, (function () { 'use strict';

/**
 * The result object containing the outcome of the credit card test.
 */
function Card() {
    this.scheme = '';
    this.valid = false;
}

/** 
 * Checks if a value is a valid credit card.
 */
var cc = {
    /**
     * The default error message.
     */
    message: '{title} is not a valid credit card number',
    schemes: [
        {
            regex: /^(5610|560221|560222|560223|560224|560225)/,
            scheme: 'Australian Bank Card'
        },
        {
            regex: /^(2014|2149)/,
            scheme: 'Diner\'s Club'
        },
        {
            regex: /^36/,
            scheme: 'Diner\'s Club International'
        },
        {
            regex: /^(30[0-5]|36|38|54|55|2014|2149)/,
            scheme: 'Diner\'s Club / Carte Blanche'
        },
        {
            regex: /^35(2[89]|[3-8][0-9])/,
            scheme: 'Japanese Credit Bureau'
        },
        {
            regex: /^(5018|5020|5038|6304|6759|676[1-3])/,
            scheme: 'Maestro'
        },
        {
            regex: /^5[1-5]/,
            scheme: 'Mastercard'
        },
        {
            regex: /^(6304|670[69]|6771)/,
            scheme: 'Laser'
        },
        {
            regex: /^(6334|6767)/,
            scheme: 'Solo (Paymentech)'
        },
        {
            regex: /^(6011|622|64|65)/,
            scheme: 'Discover'
        },
        {
            regex: /^3[47]/,
            scheme: 'American Express'
        },
        {
            regex: /^(4026|417500|4508|4844|491(3|7))/,
            scheme: 'Visa Electron'
        },
        {
            regex: /^(4)/,
            scheme: 'Visa'
        }
    ],
    /**
     * Returns the name of the credit card scheme.
     * @param {Object} value - The credit card number to test.
     * @return {Object} The result of the test.
     */
    _getScheme: function(value) {
        value = (''+ value).replace(/\D/g, '');

        var i = this.schemes.length;
        while (i--) {
            if (this.schemes[i].regex.test(value)) {
                return this.schemes[i].scheme;
            }
        }

        return undefined;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
     * @param {Object} value - The value to test.
     * @return {Object} The result object of the test.
     */
    validate: function(value) {
        value = (''+ value).replace(/\D/g, '');

        var card = new Card(), 
            i = value.length,
            sum = 0,
            mul = 1,
            ca;

        // Not enough numbers. Shortest currently is 12. 
        if (i < 12) {
            return false;
        }

        while (i--) {
            ca = value.charAt(i) * mul;
            sum += ca - (ca > 9) * 9;
            mul ^= 3;
        }

        card.valid = (sum % 10 === 0) && (sum > 0);
        card.scheme = this._getScheme(value);

        return card;
    }
};

/**
 * The result object containing the outcome of the strength test.
 */
function Score(strength) {
    this.strength = strength;
    this.points = 0;
    this.isMinimum = false;
    this.hasLower = false;
    this.hasUpper = false;
    this.hasNumber = false;
    this.hasSpecial = false;
    this.isBonus = false;
    this.percent = 0;
    this.valid = false;
    this.errors = [];
}
/** 
 * Checks if a value is a strong password string.
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
    strengths: {
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
     */
    _getScore: function(text) {
        // Create the object that represents the score of the text
        var result = new Score(this.strengths[0]);
        // If text is longer than minimum give 1 point.
        // If text is longer than minimumBonus give another 1 point.
        if (text.length > this.minimumBonus) {
            result.points += 2;
            result.isBonus = true;
            result.isMinimum = true;
        } else if (text.length > this.minimum){
            result.points++;
            result.isMinimum = true;
        } else {
            result.points = 1;
            result.isMinimum = false;
        }
        // If text has lowercase characters give 1 point.
        result.hasLower = text.match(/[a-z]/) === null ? false : true;
        if(result.isMinimum && result.hasLower) {
            result.points++;
        }
        // If text has uppercase characters give 1 point.
        result.hasUpper = text.match(/[A-Z]/) === null ? false : true;
        if(result.isMinimum && result.hasUpper) {
            result.points++;
        }
        // If text has at least one number give 1 point.
        result.hasNumber = text.match(/\d+/) === null ? false : true;
        if(result.isMinimum && result.hasNumber) {
            result.points++;
        }
        // If text has at least one special caracther give 1 point.
        result.hasSpecial = text.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) === null ? false : true;
        if(result.isMinimum && result.hasSpecial) {
            result.points++;
        }
        // Set the percentage value.
        result.percent = Math.ceil((result.points / 6) * 100);
        // Return the score object.
        return result;
    },
    /**
     * Returns an object containing the score and validation of a value.
     */
    _getStrength: function (text) {
        var result = this._getScore(text);
        result.strength = this.strengths[result.points];
        if (!result.isMinimum) {
            result.errors.push(this.errors.isMinimum);
        }
        if (!result.hasLower) {
            result.errors.push(this.errors.hasLower);
        }
        if (!result.hasUpper) {
            result.errors.push(this.errors.hasUpper);
        }
        if (!result.hasSpecial) {
            result.errors.push(this.errors.hasSpecial);
        }
        if (!result.hasNumber) {
            result.errors.push(this.errors.hasNumber);
        }
        if (result.points > 4) {
          result.valid = true;
        } 
        return result;
    },
    /**
     * The method that is called by ApproveJs to perform the test.
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
        return this._getStrength(value);
    }
};

var tests = {
    /**
     * Checks if a value is present.
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
     * Checks if a value contains both letters and numbers.
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
     */
    numeric: {
        regex: /^-?[0-9]+$/,
        validate: function(value) {
            return this.regex.test(value);
        },
        message: '{title} may only contain [0-9]',
        expects: false
    },
    /**
     * Checks if a value contains only letters.
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
     */
    ip: {
        regex: {
            ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
            ipv4Cidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/,
            ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
            ipv6Cidr: /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/
        },
        validate: function(value) {
            return this.regex.ipv4.test(value) || this.regex.ipv6.test(value) || this.regex.ipv4Cidr.test(value) || this.regex.ipv6Cidr.test(value);
        },
        message: '{title} must be a valid IP address',
        expects: false
    },
    /**
     * Checks if a value is a minimum of n characters.
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
     */
    max: {
        validate: function(value, pars) {
            return typeof value === 'string' && value.length <= pars.max;
        },
        message: '{title} must be a maximum of {max} characters',
        expects: ['max']
    },
    /**
     * Checks if a string's length or number is between a minimum and maximum.
     */
    range: {
        validate: function(value, pars) {
            if (typeof value === 'string')
            {
                return value.length >= pars.min && value.length <= pars.max;
            } else if (typeof value === 'number') {
                return value >= pars.min && value <= pars.max;
            }
            return false;
        },
        message: '{title} must be a minimum of {min} and a maximum of {max} characters',
        expects: ['min', 'max']
    },
    /**
     * Checks if a value is the same as the value of another.
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
     */
    format: {
        validate: function(value, pars) {
            if (Object.prototype.toString.call(pars.regex) === '[object RegExp]') {
                return pars.regex.test(value);
            }
            throw 'approve.value(): [format] - regex is not a valid regular expression.';
        },
        message: '{title} did not pass the [{regex}] test',
        expects: ['regex']
    },
    /**
     * Checks if a value is a valid time string (hh:mm:ss).
     */
    time: {
        regex: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        validate: function(value) {
            return this.regex.test(value);
        },
        message: '{title} is not a valid time',
        expects: false
    },
    /**
     * Checks if a value is a valid date.
     */
    date: {
        formats: {
            ymd: /^(?:\2)(?:[0-9]{2})?[0-9]{2}([\/-])(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])$/,
            dmy: /^(3[01]|[12][0-9]|0?[1-9])([\/-])(1[0-2]|0?[1-9])([\/-])(?:[0-9]{2})?[0-9]{2}$/
        },
        validate: function(value, pars) {
            return this.formats[pars.format].test(value);
        },
        message: '{title} is not a valid date',
        expects: ['format']
    },
    /**
     * Checks if a value is truthy ('yes', 'true', 'ok[ay]', '1').
     */
    truthy: {
        regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,
        validate: function(value) {
            return this.regex.test(value);
        },
        message: '{title} is not valid',
        expects: false
    },
    /**
     * Checks if a value is falsy ('No', 'false', '0').
     */
    falsy: {
        regex: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,
        validate: function(value) {
            return !this.regex.test(value);
        },
        message: '{title} is not valid',
        expects: false
    },
    cc: cc,
    strength: strength
};

var Result = function() {
    this.approved = true;
    this.errors = [];
    this.failed = [];
    // Provides easy access to the loop for the errors.
    this.each = function(callback) {
        var isFunc = callback && callback.constructor && callback.call && callback.apply,
            i = this.errors.length;
        while (i--) {
            if (isFunc) {
                callback(this.errors[i]);
            }
        }
    };
    // Provides easy access to the loop for a test's errors.
    this.filter = function(test, callback) {
    	var isFunc = callback && callback.constructor && callback.call && callback.apply,
    		i = 0;
    	if (this.hasOwnProperty(test)) {
    		i = this[test].errors.length;
    		while (i--) {
	            if (isFunc) {
	                callback(this[test].errors[i]);
	            }
	        }
    	}
    };
};

/** @constructor */
var approve = {
	/**
	 * Default tests.<br>
	 */
	tests: tests,
	/**
	 * A helper function for formatting strings.
	 */
	_format: function(text, col) {
	    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
	    return text.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
	        if (m === "{{") { return "{"; }
	        if (m === "}}") { return "}"; }
	        return col[n];
	    }).trim();
	},
	/**
	 * Checks whether the given rule is not a config property.
	 */
	_isRule: function(rule) {
		var props = [
			'title',
			'stop',
			'ignoreNull'
		];
		return props.indexOf(rule) < 0;
	},
	/**
	 * The start of the validation process.
	 */
	_start: function(value, rules) {
	    // Instantiate a result object.
	    var result = new Result(),
	        // This is used to format the message with the value title.
	        title = '',
	        // When true, tests will not continue after first failed test.
	        stop = false,
	        // When true, tests will not be executed if the value is null.
	        ignoreNull = false;
	    // Check if the rule has a title property?
	    if (rules.hasOwnProperty('title')) {
	        title = rules.title;
	    }
	    // Check if the rule has a stop property?
	    if (rules.hasOwnProperty('stop')) {
	        stop = rules.stop;
	    }
	    // Check if the rule has an ignoreNull property?
	    if (rules.hasOwnProperty('ignoreNull')) {
	        ignoreNull = rules.ignoreNull;
	    }
	    // Loop through given rules.
	    for (var rule in rules) {
	    	// Stop validating after each failed test
	    	if (stop && !result.approved) {
	    		break;
	    	}
	        if (rules.hasOwnProperty(rule) && this._isRule(rule)) {
	            var constraint = rules[rule];
	            // Check if rule exists in tests.
	            if (this.tests.hasOwnProperty(rule)) {
	                // Set a pointer to the current test.
	                var params = {
	                    constraint: constraint,
	                    rule: rule,
	                    title: title,
	                    test: this.tests[rule],
	                    value: value,
	                    ignoreNull: ignoreNull
	                };
	                this._test(params, result);
	            } else {
	                throw 'approve.value(): ' + rule + ' test not defined.';
	            }
	        }
	    }

	    return result;
	},
	/**
	 * Performs the actual testing of the value and returns the result including any errors.
	 */
	_test: function(params, result) {
		// Check if nulls should be ignored
		if (params.hasOwnProperty('ignoreNull')) {
			if (!params.value && params.ignoreNull) {
				return;
			}
		}
	    // Create an args object for required parameters.
	    var args = this._getArgs(params),
	        // Test the value.
	        ret = params.test.validate(params.value, args);

	    result[params.rule] = {
	    	approved: true,
	    	errors: []
	    };
	    // Check if the returned value is an object.
	    if(typeof ret === 'object')
	    {
	        // An object was returned.
	        // Check if the test was successful.
	        result.approved = !ret.valid ? false : result.approved;
	        result[params.rule].approved = ret.valid;
	        // Add the error messages returned by the resluting object.
	        if (ret.hasOwnProperty('errors')) {
	        	var messages = this._formatMessages(ret.errors, params);
	            result.errors = result.errors.concat(messages);
	            result[params.rule].errors = messages;
	        }
	        // Merge any properties from the resulting object with the main result to be returned.
	        for (var prop in ret) {
	            if (ret.hasOwnProperty(prop) && !result.hasOwnProperty(prop)) {
	                result[params.rule][prop] = ret[prop];
	            }
	        }
	    } else if (typeof ret !== 'boolean') {
	        // We don't process if it's not a boolean or object.
	        throw 'approve.value(): ' + params.rule + ' returned an invalid value';
	    } else {
	        result.approved = !ret ? false : result.approved;
	        result[params.rule].approved = ret;
	    }
	    if (!result.approved) {
	    	var message = this._formatMessage(params);
	        result.errors.push(message);
	        result[params.rule].errors.push(message);
	    }
	    if (!ret.valid) {
        	result.failed.push(params.rule);
        }
	},
	/**
	 * Helper method to loop over expected test parameters.
	 */
	_eachExpected: function(params, fn) {
	    if (Array.isArray(params.test.expects)) {
	        var expectsLength = params.test.expects.length,
	            i = expectsLength;
	        // This test expects paramaters.
	        // Loop through the test's expected parameters and call the given function.
	        while (i--) {
	            fn(params.test.expects[i], expectsLength);
	        }
	    }
	},
	/**
	 * Returns an object containing the arguments for a test's expected parameters.
	 */
	_getArgs: function(params) {
	    var pars = {};
	    // Does the test for this rule expect any paramaters?
	    this._eachExpected(params, function(expects, expectsLength) {
	        // Check if the rule object has the required parameter.
	        if (params.constraint.hasOwnProperty(expects)) {
	            // Add the expected parameter value to the pars object.
	            pars[expects] = params.constraint[expects];
	        } else if (expectsLength <= 1 && (/^[A-Za-z0-9]+$/i.test(params.constraint) || toString.call(params.constraint) === '[object RegExp]')) {
	            // Set the parameter to the rule's value.
	            pars[expects] = params.constraint;
	        } else {
	            throw 'approve.value(): ' + params.rule + ' expects the ' + expects + ' parameter.';
	        }
	    });

	    // Does the rule have config?
	    if (params.constraint.hasOwnProperty('config')) {
	        // Add the config to the pars object.
	        pars.config = params.constraint.config;
	    }
	    // Return the parameters object
	    return pars;
	},
	/**
	 * Returns an object containing placholder values to correctly format an error message.
	 */
	_getFormat: function(params) {
	    var format = {};
	    // Does the test for the rule expect parameters?
	    this._eachExpected(params, function(expects) {
	        // Check if the rule object has the required parameter.
	        if (params.constraint.hasOwnProperty(expects)) {
	            // Add the expected parameter's format to the parameter value.
	            format[expects] = params.constraint[expects];
	        }
	        // Expected parameter not present, is the constraint formattable?
	        if (/^[A-Za-z0-9]+$/i.test(params.constraint)) {
	            format[expects] = params.constraint;
	        }
	    });
	    format.title = params.title;
	    // Return the formatted message.
	    return format;
	},
	/**
	 * Returns an array of formatted error messages returned by tests that return objects instead of booleans.
	 */
	_formatMessages: function(errors, params) {
	    var format = this._getFormat(params),
	        i = errors.length;
	    while (i--) {
	        errors[i] = this._format(errors[i], format);
	    }
	    return errors;
	},
	/**
	 * Returns the correctly formatted message representing the current test's failure.
	 */
	_formatMessage: function(params) {
	    var format = this._getFormat(params);
	    var message;

	    // Does the provided rule have a custom message?
	    if (params.constraint.hasOwnProperty('message')) {
	        // The rule has a custom message, return it.
	        message = params.constraint.message;
	        return this._format(message, format);
	    }
	    else {
	        // The rule does not have a custom message.
	        // Get the default message from the tests.
	        message = params.test.message;
	        return this._format(message, format);
	    }
	},
	/**
	 * Executes the tests based on given rules to validate a given value.
	 */
	value: function(value, rules) {

	    // If rules is not an object, we cannot continue.
	    if (typeof rules !== 'object') {
	        throw 'approve.value(value, rules): rules is not a valid object.';
	    }
	    // Return the result object.
	    return this._start(value, rules);
	},
	/**
	 * Used to add custom tests.
	 */
	addTest: function(obj, name) {
	    // If obj is not a valid object, we cannot continue.
	    if (typeof obj !== 'object') {
	        throw 'approve.addTest(obj, name): obj is not a valid object.';
	    }
	    try {
	        // Check if the test name already exists.
	        if (!this.tests.hasOwnProperty(name)) {
	            // The name does not exist, add it to the tests.
	            this.tests[name] = obj;
	        }
	    } catch (e) {
	        throw 'approve.addTest(): ' + e.message;
	    }
	}
};

return approve;

})));
