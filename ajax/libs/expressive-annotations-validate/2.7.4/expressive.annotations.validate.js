/* expressive.annotations.validate.js - v2.7.4
 * Client-side component of ExpressiveAnnotations - annotation-based conditional validation library.
 * https://github.com/jwaliszko/ExpressiveAnnotations
 *
 * Copyright (c) 2014 Jarosław Waliszko
 * Licensed MIT: http://opensource.org/licenses/MIT */

(function($, window) {
    'use strict';
var
    backup = window.ea, // map over the ea in case of overwrite
    buffer = window.console,

    api = { // to be accessed from outer scope
        settings: {
            debug: false, // outputs debug messages to the web console (should be disabled in release code not to introduce redundant overhead)
            optimize: true, // if flag is on, requirement expression is not needlessly evaluated for non-empty fields (otherwise, it is evaluated
                            // and such an evaluation result is provided to the eavalid event)
            enumsAsNumbers: true, // specifies whether values of enum types are internally treated as integral numerics or string identifiers (should be consistent
                                  // with the way of how input fields values are stored in HTML)
            registerAllMethods: false, // specifies whether all of the built-in and custom methods are to be registered within the model context (excluding these
                                       // having naming conflicts with the field identifiers), or the essential ones only (actually used in the expression)
            dependencyTriggers: 'change keyup', // a string containing one or more space-separated DOM field event types (such as "change", "keyup" or custom event
                                                // names) for which fields directly dependent on referenced DOM field are validated - for this feature to be off
                                                // entirely, initialize with empty string, null or undefined (validation will be fired on form submit attempt only)

            apply: function(options) { // alternative way of settings setup (recommended), crucial to invoke e.g. for new set of dependency triggers to be re-bound
                function verifySetup() {
                    if (!typeHelper.isBool(api.settings.debug)) {
                        throw 'EA settings error: debug value must be a boolean (true or false)';
                    }
                    if (!typeHelper.isBool(api.settings.optimize)) {
                        throw 'EA settings error: optimize value must be a boolean (true or false)';
                    }
                    if (!typeHelper.isBool(api.settings.enumsAsNumbers)) {
                        throw 'EA settings error: enumsAsNumbers value must be a boolean (true or false)';
                    }
                    if (!typeHelper.isBool(api.settings.registerAllMethods)) {
                        throw 'EA settings error: registerAllMethods value must be a boolean (true or false)';
                    }
                    if (!typeHelper.isString(api.settings.dependencyTriggers)
                        && api.settings.dependencyTriggers !== null && api.settings.dependencyTriggers !== undefined) {
                        throw 'EA settings error: dependencyTriggers value must be a string (multiple event types can be bound at once by including each one separated by a space), null or undefined';
                    }
                }
                function extend(target, source) { // custom implementation over jQuery.extend() because null/undefined merge is needed as well
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            target[key] = source[key];
                        }
                    }
                }

                extend(api.settings, options);
                verifySetup();

                $('form').each(function() {
                    $(this).find('input, select, textarea').off('.expressive.annotations'); // remove all event handlers in the '.expressive.annotations' namespace
                    validationHelper.bindFields(this, true);
                });

                logger.info(typeHelper.string.format("EA settings applied:\n{0}", options));
            }
        },
        addMethod: function(name, func) {    // provide custom function to be accessible for expression
            toolchain.addMethod(name, func); // parameters: name - method name
        },                                   //             func - method body
                                             // e.g. if server-side uses following attribute: [AssertThat("IsBloodType(BloodType)")], where IsBloodType() is a custom method available at C# side,
                                             // its client-side equivalent, mainly function of the same signature (name and the number of parameters), must be also provided, i.e.
                                             // ea.addMethod('IsBloodType', function(group) {
                                             //     return /^(A|B|AB|0)[\+-]$/.test(group);
                                             // });
        addValueParser: function(name, func) {     // provide custom deserialization methods for values of these DOM fields, which are accordingly decorated with ValueParser attribute at the server-side
            typeHelper.addValueParser(name, func); // parameters: name - parser name
        },                                         //             func - parse logic
                                                   // e.g. for objects when stored in non-json format or dates when stored in non-standard format (not proper for Date.parse(dateString)),
                                                   // i.e. suppose DOM field date string is given in dd/mm/yyyy format:
                                                   // ea.addValueParser('dateparser', function(value, field) { // parameters: value - raw data string extracted by default from DOM element
                                                   //                                                          //             field - DOM element name for which parser was invoked
                                                   //     var arr = value.split('/'); return new Date(arr[2], arr[1] - 1, arr[0]).getTime(); // return milliseconds since January 1, 1970, 00:00:00 UTC
                                                   // });
                                                   // multiple parsers can be registered at once when, separated by whitespace, are provided to name parameter, i.e. ea.addValueParser('p1 p2', ...
                                                   // finally, if value parser is registered under the name of some type, e.g. datetime, int32, etc., all DOM fields of such a type are going to be deserialized using such a parser
        noConflict: function() {
            if (window.ea === this) {
                window.ea = backup;
            }
            return this;
        }
    },

    logger = {
        info: function(message) {
            if (api.settings.debug && buffer && typeof buffer.log === 'function') { // flush in debug mode only
                buffer.log('[info] ' + logger.prep(message, new Date()));
            }
        },
        warn: function(message) {
            if (buffer && typeof buffer.warn === 'function') {
                buffer.warn('[warn] ' + logger.prep(message, new Date()));
            }
        },
        fail: function(message) {
            if (buffer && typeof buffer.error === 'function') {
                buffer.error('[fail] ' + logger.prep(message, new Date()));
            }
        },
        prep: function(message, date) {
            message = typeHelper.string.tryParse(message);
            var lines = message.split('\n');
            var stamp = date !== undefined && date !== null ? '(' + typeHelper.datetime.stamp(date) + '): ' : '';
            var fline = stamp + lines.shift();
            return lines.length > 0
                ? fline + '\n' + typeHelper.string.indent(lines.join('\n'), 19)
                : fline;
        }
    },

    toolchain = {
        methods: {},
        addMethod: function(name, func) { // add multiple function signatures to methods object (methods overloading, based only on numbers of arguments)
            var old = this.methods[name];
            this.methods[name] = function() {
                if (func.length === arguments.length) {
                    return func.apply(this, arguments);
                }
                if (typeof old === 'function') {
                    return old.apply(this, arguments);
                }
                return func.apply(this, arguments); // no exact signature match, most likely variable number of arguments is accepted
            };
        },
        registerMethods: function(model, essentialMethods, fieldName) {
            var i, name, body;
            this.initialize();
            if (api.settings.registerAllMethods) {
                for (name in this.methods) {
                    if (this.methods.hasOwnProperty(name)) {
                        if (model.hasOwnProperty(name)) {
                            logger.warn(typeHelper.string.format('Field {0} - skipping {1}(...) method registration, naming conflict with the field identifier.', fieldName, name));
                            continue;
                        }
                        body = this.methods[name];
                        model[name] = body;
                    }
                }
                return;
            }

            for (i = 0; i < essentialMethods.length; i++) {
                name = essentialMethods[i];
                if (this.methods.hasOwnProperty(name)) { // if not available, exception will be thrown later, during expression evaluation (not thrown here on purpose - too early, let the log to become more complete)
                    body = this.methods[name];
                    model[name] = body;
                }
            }
        },
        initialize: function() {
            var that = this;
            this.addMethod('Now', function() { // return milliseconds
                return Date.now(); // now() is faster than new Date().getTime()
            });
            this.addMethod('Today', function() { // return milliseconds
                return new Date(new Date().setHours(0, 0, 0, 0)).getTime();
            });
            this.addMethod('ToDate', function(dateString) { // return milliseconds
                return Date.parse(dateString);
            });
            this.addMethod('Date', function(year, month, day) { // months are 1-based, return milliseconds
                return new Date(new Date(year, month - 1, day).setFullYear(year)).getTime();
            });
            this.addMethod('Date', function(year, month, day, hour, minute, second) { // months are 1-based, return milliseconds
                return new Date(new Date(year, month - 1, day, hour, minute, second).setFullYear(year)).getTime();
            });
            this.addMethod('TimeSpan', function(days, hours, minutes, seconds) { // return milliseconds
                return seconds * 1e3 + minutes * 6e4 + hours * 36e5 + days * 864e5;
            });
            this.addMethod('Length', function(str) {
                return str !== null && str !== undefined ? str.length : 0;
            });
            this.addMethod('Trim', function(str) {
                return str !== null && str !== undefined ? $.trim(str) : null;
            });
            this.addMethod('Concat', function(strA, strB) {
                return [strA, strB].join('');
            });
            this.addMethod('Concat', function(strA, strB, strC) {
                return [strA, strB, strC].join('');
            });
            this.addMethod('CompareOrdinal', function(strA, strB) {
                if (strA === strB) {
                    return 0;
                }
                if (strA !== null && strB === null) {
                    return 1;
                }
                if (strA === null && strB !== null) {
                    return -1;
                }
                return strA > strB ? 1 : -1;
            });
            this.addMethod('CompareOrdinalIgnoreCase', function(strA, strB) {
                strA = (strA !== null && strA !== undefined) ? strA.toLowerCase() : null;
                strB = (strB !== null && strB !== undefined) ? strB.toLowerCase() : null;
                return that.methods.CompareOrdinal(strA, strB);
            });
            this.addMethod('StartsWith', function(str, prefix) {
                return str !== null && str !== undefined && prefix !== null && prefix !== undefined && str.slice(0, prefix.length) === prefix;
            });
            this.addMethod('StartsWithIgnoreCase', function(str, prefix) {
                str = (str !== null && str !== undefined) ? str.toLowerCase() : null;
                prefix = (prefix !== null && prefix !== undefined) ? prefix.toLowerCase() : null;
                return that.methods.StartsWith(str, prefix);
            });
            this.addMethod('EndsWith', function(str, suffix) {
                return str !== null && str !== undefined && suffix !== null && suffix !== undefined && str.slice(-suffix.length) === suffix;
            });
            this.addMethod('EndsWithIgnoreCase', function(str, suffix) {
                str = (str !== null && str !== undefined) ? str.toLowerCase() : null;
                suffix = (suffix !== null && suffix !== undefined) ? suffix.toLowerCase() : null;
                return that.methods.EndsWith(str, suffix);
            });
            this.addMethod('Contains', function(str, substr) {
                return str !== null && str !== undefined && substr !== null && substr !== undefined && str.indexOf(substr) > -1;
            });
            this.addMethod('ContainsIgnoreCase', function(str, substr) {
                str = (str !== null && str !== undefined) ? str.toLowerCase() : null;
                substr = (substr !== null && substr !== undefined) ? substr.toLowerCase() : null;
                return that.methods.Contains(str, substr);
            });
            this.addMethod('IsNullOrWhiteSpace', function(str) {
                return str === null || !/\S/.test(str);
            });
            this.addMethod('IsDigitChain', function(str) {
                return /^[0-9]+$/.test(str);
            });
            this.addMethod('IsNumber', function(str) {
                return /^[+-]?(?:(?:[0-9]+)|(?:[0-9]+[eE][+-]?[0-9]+)|(?:[0-9]*\.[0-9]+(?:[eE][+-]?[0-9]+)?))$/.test(str);
            });
            this.addMethod('IsEmail', function(str) {
                // taken from HTML5 specification: http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
            });
            this.addMethod('IsPhone', function(str) {
                // taken from PhoneAttribute implementation: https://referencesource.microsoft.com/#System.ComponentModel.DataAnnotations/DataAnnotations/PhoneAttribute.cs, adjusted for JavaScript regex engine - since JS doesn't use lookbehind feature, alternative approach used (as described here: http://stackoverflow.com/q/7376238/270315)
                return /^(\+\s?)?((?!\+.*)\(\+?\d+([\s\-\.]?\d+)?\)|\d+)([\s\-\.]?(\(\d+([\s\-\.]?\d+)?\)|\d+))*(\s?(x|ext\.?)\s?\d+)?$/.test(str);
            });
            this.addMethod('IsUrl', function(str) {
                // contributed by Diego Perini: https://gist.github.com/dperini/729294 (https://mathiasbynens.be/demo/url-regex)
                return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(str);
            });
            this.addMethod('IsRegexMatch', function(str, regex) {
                return str !== null && str !== undefined && regex !== null && regex !== undefined && new RegExp(regex).test(str);
            });
            this.addMethod('Guid', function(str) {
                var guid = typeHelper.guid.tryParse(str);
                if (guid.error) {
                    throw guid.msg;
                }
                return guid;
            });
            this.addMethod('Min', function(values) { // accepts both, array and variable number of arguments
                if (arguments.length === 0)
                    throw "no arguments";

                if (arguments.length === 1) {
                    if (typeHelper.isArray(values)) {
                        if (values.length === 0)
                            throw "empty sequence";
                        return Math.min.apply(null, values);
                    }
                }
                return Math.min.apply(null, arguments);
            });
            this.addMethod('Max', function(values) { // accepts both, array and variable number of arguments
                if (arguments.length === 0)
                    throw "no arguments";

                if (arguments.length === 1) {
                    if (typeHelper.isArray(values)) {
                        if (values.length === 0)
                            throw "empty sequence";
                        return Math.max.apply(null, values);
                    }
                }
                return Math.max.apply(null, arguments);
            });
            this.addMethod('Sum', function(values) { // accepts both, array and variable number of arguments
                if (arguments.length === 0)
                    throw "no arguments";

                var sum = 0, i, l;
                if (arguments.length === 1) {
                    if (typeHelper.isArray(values)) {
                        if (values.length === 0)
                            throw "empty sequence";
                        for (i = 0, l = values.length; i < l; i++) {
                            sum += parseFloat(values[i]);
                        }
                        return sum;
                    }
                }
                for (i = 0, l = arguments.length; i < l; i++) {
                    sum += parseFloat(arguments[i]);
                }
                return sum;
            });
            this.addMethod('Average', function(values) { // accepts both, array and variable number of arguments
                if (arguments.length === 0)
                    throw "no arguments";

                var sum, i, l, arr = new Array();
                if (arguments.length === 1) {
                    if (typeHelper.isArray(values)) {
                        if (values.length === 0)
                            throw "empty sequence";
                        sum = that.methods.Sum(values);
                        return sum / values.length;
                    }
                }
                for (i = 0, l = arguments.length; i < l; i++) {
                    arr.push(arguments[i]);
                }
                sum = that.methods.Sum(arr);
                return sum / arguments.length;
            });
        }
    },

    typeHelper = {
        parsers: {},
        addValueParser: function(name, func) {
            $.each(name.split(/\s+/), function(idx, parser) {
                if (/\S/.test(parser)) {
                    typeHelper.parsers[parser] = func;
                }
            });
        },
        array: {
            contains: function(arr, item) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === item) {
                        return true;
                    }
                }
                return false;
            }
        },
        object: {
            keys: function(obj) {
                var key, arr = [];
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(key);
                    }
                }
                return arr;
            },
            tryParse: function(value) {
                try {
                    return $.parseJSON(value);
                } catch (ex) {
                    return { error: true, msg: 'Given value was not recognized as a valid JSON. ' + ex };
                }
            }
        },
        string: {
            format: function(text, params) {
                function makeParam(value) {
                    var replacer = function(key, value) {
                        return typeof value === 'function' ? 'function(...) {...}' : value;
                    }
                    if (api.settings.registerAllMethods) {
                        replacer = null; // do not print all of the methods not to disturb the console output
                    }
                    value = typeHelper.isObject(value) ? JSON.stringify(value, replacer, 4): value;
                    value = typeHelper.isString(value) ? value.replace(/\$/g, '$$$$'): value; // escape $ sign for string.replace()
                    return value;
                }
                function applyParam(text, param, idx) {
                    return text.replace(new RegExp('\\{' + idx + '\\}', 'gm'), param);
                }

                var i;
                if (params instanceof Array) {
                    for (i = 0; i < params.length; i++) {
                        text = applyParam(text, makeParam(params[i]), i);
                    }
                    return text;
                }
                for (i = 0; i < arguments.length - 1; i++) {
                    text = applyParam(text, makeParam(arguments[i + 1]), i);
                }
                return text;
            },
            indent: function(str, spaces) {
                var indent = Array((spaces || 0) + 1).join(' ');
                return str.replace(/^/gm, indent);
            },
            tryParse: function(value) {
                if (typeHelper.isString(value)) {
                    return value;
                }
                if (value !== undefined && value !== null) {
                    return value.toString();
                }
                return { error: true, msg: 'Given value was not recognized as a valid string.' };
            }
        },
        bool: {
            tryParse: function(value) {
                if (typeHelper.isBool(value)) {
                    return value;
                }
                if (typeHelper.isString(value)) {
                    value = $.trim(value).toLowerCase();
                    if (value === 'true' || value === 'false') {
                        return value === 'true';
                    }
                }
                return { error: true, msg: 'Given value was not recognized as a valid boolean.' };
            }
        },
        number: {
            tryParse: function(value) {
                function isNumber(n) {
                    return typeHelper.isNumeric(parseFloat(n)) && isFinite(n);
                }

                if (isNumber(value)) {
                    return parseFloat(value);
                }
                return { error: true, msg: 'Given value was not recognized as a valid number.' };
            }
        },
        timespan: {
            tryParse: function(value) {
                if (typeHelper.isTimeSpan(value)) {
                    var DAY = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6;
                    var match = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/.exec(value);
                    var sign = (match[1] === '-') ? -1 : 1;
                    var d = {
                        days: typeHelper.number.tryParse(match[DAY] || 0) * sign,
                        hours: typeHelper.number.tryParse(match[HOUR] || 0) * sign,
                        minutes: typeHelper.number.tryParse(match[MINUTE] || 0) * sign,
                        seconds: typeHelper.number.tryParse(match[SECOND] || 0) * sign,
                        milliseconds: typeHelper.number.tryParse(match[MILLISECOND] || 0) * sign
                    };
                    var millisec = d.milliseconds +
                        d.seconds * 1e3 + // 1000
                        d.minutes * 6e4 + // 1000 * 60
                        d.hours * 36e5 +  // 1000 * 60 * 60
                        d.days * 864e5;   // 1000 * 60 * 60 * 24
                    return millisec;
                }
                return { error: true, msg: 'Given value was not recognized as a valid .NET style timespan string.' };
            }
        },
        datetime: {
            stamp: function(date) {
                function pad(n) { return ('0' + n).slice(-2); }
                return pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
            },
            tryParse: function(value) {
                if (typeHelper.isDate(value)) {
                    return value.getTime(); // return the time value in milliseconds
                }
                if (typeHelper.isString(value)) {
                    var millisec = Date.parse(value); // default parsing of string representing an RFC 2822 or ISO 8601 date
                    if (typeHelper.isNumeric(millisec)) {
                        return millisec;
                    }
                }
                return { error: true, msg: 'Given value was not recognized as a valid RFC 2822 or ISO 8601 date.' };
            }
        },
        guid: {
            tryParse: function(value) {
                if (typeHelper.isGuid(value)) {
                    return value.toUpperCase();
                }
                return { error: true, msg: 'Given value was not recognized as a valid guid - guid should contain 32 digits with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).' };
            }
        },
        enumeration: {
            tryParse: function(value) {
                return api.settings.enumsAsNumbers ? typeHelper.number.tryParse(value) : typeHelper.string.tryParse(value);
            }
        },
        isTimeSpan: function(value) {
            return /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/.test(value); // regex for recognition of .NET style timespan string, taken from moment.js v2.9.0
        },
        isNumeric: function(value) {
            return typeof value === 'number' && !isNaN(value);
        },
        isDate: function(value) {
            return value instanceof Date;
        },
        isObject: function(value) {
            return typeof value === 'object' || value instanceof Object;
        },
        isString: function(value) {
            return typeof value === 'string' || value instanceof String;
        },
        isBool: function(value) {
            return typeof value === 'boolean' || value instanceof Boolean;
        },
        isGuid: function(value) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value); // basic check
        },
        isArray: function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },
        tryParse: function(value, type, field, parser) {
            var parseFunc;
            if (parser !== null && parser !== undefined) {
                parseFunc = typeHelper.findValueParser(field, parser); // pointed by attribute custom field-specific parser lookup - highest parsing priority
                if (!parseFunc.error) {
                    return parseFunc(value, field);
                }
                logger.warn(parseFunc.msg);
            }
            parseFunc = typeHelper.findValueParser(field, type); // custom type-specific parser lookup - secondary parsing priority
            if (!parseFunc.error) {
                logger.warn(typeHelper.string.format('Overridden {0} type parsing runs for {1} field. All fields of {0} type are going to be parsed using your value parser. If such a behavior is unintentional, change the name of your value parser to one, which does not indicate at {0} (or any other) type name.', type, field));
                return parseFunc(value, field);
            }
            return typeHelper.tryAutoParse(value, type); // built-in parser lookup - lowest parsing priority
        },
        tryAutoParse: function(value, type) {
            return typeHelper.hasOwnProperty(type)
                ? typeHelper[type].tryParse(value)
                : typeHelper.object.tryParse(value);
        },
        findValueParser: function(field, parser) {
            var parseFunc = typeHelper.parsers[parser]; // custom parsing lookup
            if (typeof parseFunc === 'function') {
                return parseFunc;
            }
            return { error: true, msg: typeHelper.string.format('Custom value parser {0} not found. Consider its registration with ea.addValueParser(), or remove redundant ValueParser attribute from {1} model field.', parser, field) };
        }
    },

    modelHelper = {
        getPrefix: function(str) {
            return (str !== undefined && str !== null) ? str.substr(0, str.lastIndexOf('.') + 1) : '';
        },
        extractValue: function(form, name, prefix, type, parser) {
            function getValue(element) {
                var elementType = element.attr('type');
                switch (elementType) {
                    case 'checkbox':
                        if (element.length > 2) {
                            logger.warn(typeHelper.string.format('DOM field {0} is ambiguous (unless custom value parser is provided).', element.attr('name')));
                        }
                        return element.is(':checked');
                    case 'radio':
                        return element.filter(':checked').val();
                    default:
                        if (element.length > 1) {
                            logger.warn(typeHelper.string.format('DOM field {0} is ambiguous (unless custom value parser is provided).', element.attr('name')));
                        }
                        return element.val();
                }
            }

            var field, fieldName, rawValue, parsedValue;
            fieldName = prefix + name;
            field = $(form).find(typeHelper.string.format(':input[name="{0}"]', fieldName));
            if (field.length === 0) {
                throw typeHelper.string.format('DOM field {0} not found.', fieldName);
            }
            rawValue = getValue(field);
            if (rawValue === null || rawValue === undefined  || rawValue === '') { // field value not set
                return null;
            }
            parsedValue = typeHelper.tryParse(rawValue, type, fieldName, parser); // convert field value to required type
            if (parsedValue !== null && parsedValue !== undefined && parsedValue.error) {
                throw typeHelper.string.format('DOM field {0} value conversion to {1} failed. {2}', fieldName, type, parsedValue.msg);
            }
            return parsedValue;
        },
        deserializeObject: function(form, fieldsMap, constsMap, enumsMap, parsersMap, prefix) {
            function buildField(fieldName, fieldValue, object) {
                var props, parent, i, match, arrayIndex, arrayName, arrayPat;
                arrayPat = /^([a-z_0-9]+)\[([0-9]+)\]$/i;
                props = fieldName.split('.');
                parent = object;
                for (i = 0; i < props.length - 1; i++) {
                    fieldName = props[i];

                    match = arrayPat.exec(fieldName); // check for array element access
                    if (match) {
                        fieldName = match[1];
                        arrayIndex = match[2];
                        if (!parent.hasOwnProperty(fieldName)) {
                            parent[fieldName] = {};
                        }
                        parent[fieldName][arrayIndex] = parent[fieldName][arrayIndex] || {}; // create if needed
                        parent = parent[fieldName][arrayIndex];
                        continue;
                    }

                    if (!parent.hasOwnProperty(fieldName)) {
                        parent[fieldName] = {};
                    }
                    parent = parent[fieldName];
                }
                fieldName = props[props.length - 1];

                var endMatch = arrayPat.exec(fieldName);
                if (endMatch) { // our fieldName matches array access pattern i.e. arr[idx]
                    arrayName = endMatch[1];
                    arrayIndex = endMatch[2];
                    parent[arrayName] = parent[arrayName] || []; // create if needed
                    parent[arrayName][arrayIndex] = fieldValue;
                } else {
                    parent[fieldName] = fieldValue;
                }
            }

            var model = {}, name, type, value, parser;
            for (name in fieldsMap) {
                if (fieldsMap.hasOwnProperty(name)) {
                    type = fieldsMap[name];
                    parser = parsersMap[name];
                    value = this.extractValue(form, name, prefix, type, parser);
                    buildField(name, value, model);
                }
            }
            for (name in constsMap) {
                if (constsMap.hasOwnProperty(name)) {
                    value = constsMap[name];
                    buildField(name, value, model);
                }
            }
            for (name in enumsMap) {
                if (enumsMap.hasOwnProperty(name)) {
                    value = api.settings.enumsAsNumbers ? enumsMap[name] : name.split('.').pop();
                    buildField(name, value, model);
                }
            }
            return model;
        },
        adjustGivenValue: function(value, element, params) {
            value = element.type === 'checkbox' ? element.checked : value; // special treatment for checkbox, because when unchecked, false value should be retrieved instead of undefined

            var field = element.name.replace(params.prefix, '');
            var parser = params.parsersMap[field];
            if (parser !== null && parser !== undefined) {
                var parseFunc = typeHelper.findValueParser(element.name, parser); // pointed by attribute custom field-specific parser lookup - highest parsing priority
                if (!parseFunc.error) {
                    return parseFunc(value, element.name);
                }
                logger.warn(parseFunc.msg);
            }
            return value;
        },
        ctxEval: function(exp, ctx) { // evaluates expression in the scope of context object
            return (new Function('expression', 'context', 'with(context){return eval(expression)}'))(exp, ctx); // function constructor used on purpose (a hack), for 'with' statement not to collide with strict mode, which
                                                                                                                // is applied to entire module scope (BTW 'use strict'; pragma intentionally not put to function constructor)
        }
    },

    validationHelper = {
        referencesMap: [],
        collectReferences: function(fields, refField, prefix) {
            var i, name;
            for (i = 0; i < fields.length; i++) {
                name = prefix + fields[i];
                if (name !== refField) {
                    this.referencesMap[name] = this.referencesMap[name] || [];
                    if (!typeHelper.array.contains(this.referencesMap[name], refField)) {
                        this.referencesMap[name].push(refField);
                    }
                }
            }
        },
        validateReferences: function(name, form) {
            var i, field, referencedFields, validator;
            validator = $(form).validate(); // get validator attached to the form
            referencedFields = this.referencesMap[name];
            if (referencedFields !== undefined && referencedFields !== null) {
                logger.info(typeHelper.string.format('Validation triggered for the following dependencies of {0} field:\n{1}.', name, referencedFields.join(', ')));
                i = referencedFields.length;
                while (i--) {
                    field = $(form).find(typeHelper.string.format(':input[data-val][name="{0}"]', referencedFields[i])).not(validator.settings.ignore);
                    if (field.length !== 0) {
                        field.valid();
                    }
                }
            } else {
                logger.info(typeHelper.string.format('No fields dependent on {0} detected.', name));
            }
        },
        bindFields: function(form, force) { // attach validation handlers to dependency triggers (events) for some form elements
            if (api.settings.dependencyTriggers !== null && api.settings.dependencyTriggers !== undefined && api.settings.dependencyTriggers !== '') {
                var namespacedEvents = [];
                $.each(api.settings.dependencyTriggers.split(/\s+/), function(idx, event) {
                    if (/\S/.test(event)) {
                        namespacedEvents.push(typeHelper.string.format('{0}.expressive.annotations', event));
                    }
                });
                // attach handlers to all inputs that do not have 'ea-triggers-bound' class (unless force is true)
                $(form).find('input, select, textarea').not(function(idx, element) {
                    var bound = $(element).hasClass('ea-triggers-bound');
                    $(element).addClass('ea-triggers-bound');
                    return !force && bound;
                }).on(namespacedEvents.join(' '), function(event) {
                    var field = $(this).attr('name');
                    logger.info(typeHelper.string.format('Dependency validation trigger - {0} event, handled.', event.type));
                    validationHelper.validateReferences(field, form); // validate referenced fields only
                });
            }
        }
    },

    buildAdapter = function(adapter, options) {
        var rules = {
            prefix: modelHelper.getPrefix(options.element.name),
            form: options.form
        };
        for (var key in options.params) {
            if (options.params.hasOwnProperty(key)) {
                rules[key] = options.params[key] !== undefined ? $.parseJSON(options.params[key]) : {};
            }
        }
        if (options.message) {
            options.messages[adapter] = function(params, element) {
                var message, field, guid, value;
                message = options.message;
                for (field in params.errFieldsMap) {
                    if (params.errFieldsMap.hasOwnProperty(field)) {
                        guid = params.errFieldsMap[field];
                        value = modelHelper.extractValue(params.form, field, params.prefix, 'string', null);

                        var re = new RegExp(guid, 'g'); // with this regex...
                        message = message.replace(re, value); // ...occurrences are replaced globally
                    }
                }
                return message;
            };
        }
        validationHelper.bindFields(options.form);
        validationHelper.collectReferences(typeHelper.object.keys(rules.fieldsMap), options.element.name, rules.prefix);
        options.rules[adapter] = rules;
    },

    computeAssertThat = function(method, value, element, params) {
        value = modelHelper.adjustGivenValue(value, element, params); // preprocess given value (here basically we are concerned about determining if such a value is null or not, to determine if the attribute
                                                                      // logic should be invoked or not - full type-detection parsing is not required at this stage, but we may have to extract such a value using
                                                                      // value parser, e.g. for an array which values are distracted among multiple fields)
        if (value !== undefined && value !== null && value !== '') { // check if the field value is set (continue if so, otherwise skip condition verification)
            var model = modelHelper.deserializeObject(params.form, params.fieldsMap, params.constsMap, params.enumsMap, params.parsersMap, params.prefix);
            toolchain.registerMethods(model, params.methodsList, element.name);
            var message = 'Field {0} - {1} expression:\n[{2}]\nto be executed within the following context{3}:\n{4}';
            logger.info(typeHelper.string.format(message, element.name, method, params.expression, api.settings.registerAllMethods ? ' (methods not shown)' : '', model));
            var exprVal = modelHelper.ctxEval(params.expression, model); // verify assertion, if not satisfied => notify (return false)
            return {
                valid: exprVal,
                condition: exprVal
            }
        }
        return {
            valid: true,
            condition: undefined // undefined always when value is set (computation redundant)
        }
    },

    computeRequiredIf = function(method, value, element, params) {
        value = modelHelper.adjustGivenValue(value, element, params);

        var exprVal = undefined, model;
        var message = 'Field {0} - {1} expression:\n[{2}]\nto be executed within the following context{3}:\n{4}';
        if (!api.settings.optimize) { // no optimization - compute requirement condition (which now may have changed) despite the fact field value may be provided
            model = modelHelper.deserializeObject(params.form, params.fieldsMap, params.constsMap, params.enumsMap, params.parsersMap, params.prefix);
            toolchain.registerMethods(model, params.methodsList, element.name);
            logger.info(typeHelper.string.format(message, element.name, method, params.expression, api.settings.registerAllMethods ? ' (methods not shown)' : '', model));
            exprVal = modelHelper.ctxEval(params.expression, model);
        }

        if (value === undefined || value === null || value === '' // check if the field value is not set (undefined, null or empty string treated at client as null at server)
            || (!/\S/.test(value) && !params.allowEmpty)) {

            if (exprVal !== undefined) {
                return {
                    valid: !exprVal,
                    condition: exprVal
                }
            }

            model = modelHelper.deserializeObject(params.form, params.fieldsMap, params.constsMap, params.enumsMap, params.parsersMap, params.prefix);
            toolchain.registerMethods(model, params.methodsList, element.name);
            logger.info(typeHelper.string.format(message, element.name, method, params.expression, api.settings.registerAllMethods ? ' (methods not shown)' : '', model));
            exprVal = modelHelper.ctxEval(params.expression, model); // verify requirement, if satisfied => notify (return false)
            return {
                valid: !exprVal,
                condition: exprVal
            }
        }
        return {
            valid: true,
            condition: exprVal  // undefined when optimize flag is on and value is not set (computation redundant)
        }
    },

    annotations = ' abcdefghijklmnopqrstuvwxyz'; // suffixes for attributes annotating single field multiple times

    // bind requirements first...
    $.each(annotations.split(''), function() { // it would be ideal to have exactly as many handlers as there are unique annotations, but the number of annotations isn't known untill DOM is ready
        var adapter = typeHelper.string.format('requiredif{0}', $.trim(this));
        $.validator.unobtrusive.adapters.add(adapter, ['expression', 'fieldsMap', 'constsMap', 'enumsMap', 'methodsList', 'parsersMap', 'errFieldsMap', 'allowEmpty'], function(options) {
            buildAdapter(adapter, options);
        });
    });

    // ...then move to asserts
    $.each(annotations.split(''), function() {
        var adapter = typeHelper.string.format('assertthat{0}', $.trim(this));
        $.validator.unobtrusive.adapters.add(adapter, ['expression', 'fieldsMap', 'constsMap', 'enumsMap', 'methodsList', 'parsersMap', 'errFieldsMap'], function(options) {
            buildAdapter(adapter, options);
        });
    });

    $.each(annotations.split(''), function() {
        var suffix = $.trim(this);
        var method = typeHelper.string.format('assertthat{0}', suffix);
        $.validator.addMethod(method, function(value, element, params) {
            try {
                var result = computeAssertThat(method, value, element, params);

                logger.info(typeHelper.string.format('Field {0} - {1} outcome: {2}, assertion {3}.',
                    element.name,
                    method,
                    result.condition === undefined
                        ? 'assertion expression computation redundant'
                        : result.condition
                            ? 'expression true'
                            : 'expression false',
                    result.valid ? 'satisfied' : 'not satisfied'));

                $(element).trigger('eavalid', ['assertthat', result.valid, params.expression]);
                return result.valid;
            } catch (ex) {
                logger.fail(ex);
            }
        }, '');
    });

    $.each(annotations.split(''), function() {
        var suffix = $.trim(this);
        var method = typeHelper.string.format('requiredif{0}', suffix);
        $.validator.addMethod(method, function(value, element, params) {
            try {
                var result = computeRequiredIf(method, value, element, params);

                logger.info(typeHelper.string.format('Field {0} - {1} outcome: {2}, requirement {3}.',
                    element.name,
                    method,
                    result.condition === undefined
                        ? 'requirement expression computation redundant'
                        : result.condition
                            ? 'required'
                            : 'not required',
                    result.valid ? 'satisfied' : 'not satisfied'));

                $(element).trigger('eavalid', ['requiredif', result.valid, params.expression, result.condition, annotations.indexOf(suffix)]);
                return result.valid;
            } catch (ex) {
                logger.fail(ex);
            }
        }, '');
    });

    window.ea = api; // expose some tiny api to the ea global object

}(jQuery, window));
