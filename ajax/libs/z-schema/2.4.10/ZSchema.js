/*
 * Copyright (c) 2013, Martin Zagora <zaggino@gmail.com>
 * Copyright (c) 2013, Oleksiy Krivoshey <oleksiyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @license http://opensource.org/licenses/MIT
 */

/*jslint node:true, nomen:true, plusplus:true, regexp:true, vars:true*/
/*jshint -W044*/
/*global ZSchema*/

(function () {
    'use strict';

    var Promise = require('bluebird');
    var request = require('request');

    // z-schema used Q before bluebird, so alias is here to preserve compatibility
    Promise.prototype.fail = Promise.prototype.catch;

    /***** ValidationError class *****/

    var ValidationError = function (code, message, params, path) {
        this.code    = code;
        this.message = message;
        this.path    = path || '';
        this.params  = params || {};
    };

    ValidationError.prototype = new Error();

    ValidationError.messages = {
        'INVALID_TYPE': 'invalid type: {type} (expected {expected})',
        'ENUM_MISMATCH': 'No enum match for: {value}',
        'ANY_OF_MISSING': 'Data does not match any schemas from "anyOf"',
        'ONE_OF_MISSING': 'Data does not match any schemas from "oneOf"',
        'ONE_OF_MULTIPLE': 'Data is valid against more than one schema from "oneOf"',
        'NOT_PASSED': 'Data matches schema from "not"',
        'UNRESOLVABLE_REFERENCE': 'Reference could not be resolved: {ref}',
        // Numeric errors
        'MULTIPLE_OF': 'Value {value} is not a multiple of {multipleOf}',
        'MINIMUM': 'Value {value} is less than minimum {minimum}',
        'MINIMUM_EXCLUSIVE': 'Value {value} is equal or less than exclusive minimum {minimum}',
        'MAXIMUM': 'Value {value} is greater than maximum {maximum}',
        'MAXIMUM_EXCLUSIVE': 'Value {value} is equal or greater than exclusive maximum {maximum}',
        // String errors
        'MIN_LENGTH': 'String is too short ({length} chars), minimum {minimum}',
        'MAX_LENGTH': 'String is too long ({length} chars), maximum {maximum}',
        'PATTERN': 'String does not match pattern: {pattern}',
        // Object errors
        'OBJECT_PROPERTIES_MINIMUM': 'Too few properties defined ({count}), minimum {minimum}',
        'OBJECT_PROPERTIES_MAXIMUM': 'Too many properties defined ({count}), maximum {maximum}',
        'OBJECT_REQUIRED': 'Missing required property: {property}',
        'OBJECT_ADDITIONAL_PROPERTIES': 'Additional properties not allowed',
        'OBJECT_DEPENDENCY_KEY': 'Dependency failed - key must exist: {missing} (due to key: {key})',
        // Array errors
        'ARRAY_LENGTH_SHORT': 'Array is too short ({length}), minimum {minimum}',
        'ARRAY_LENGTH_LONG': 'Array is too long ({length}), maximum {maximum}',
        'ARRAY_UNIQUE': 'Array items are not unique (indices {index1} and {index2})',
        'ARRAY_ADDITIONAL_ITEMS': 'Additional items not allowed',
        // Format errors
        'FORMAT': '{format} format validation failed: {error}',
        // Schema validation errors
        'KEYWORD_TYPE_EXPECTED': 'Keyword "{keyword}" is expected to be of type "{type}"',
        'KEYWORD_UNDEFINED_STRICT': 'Keyword "{keyword}" must be defined in strict mode',
        'KEYWORD_UNEXPECTED': 'Keyword "{keyword}" is not expected to appear in the schema',
        'KEYWORD_MUST_BE': 'Keyword "{keyword}" must be {expression}',
        'KEYWORD_DEPENDENCY': 'Keyword "{keyword1}" requires keyword "{keyword2}"',
        'KEYWORD_PATTERN': 'Keyword "{keyword}" is not a valid RegExp pattern ({pattern})',
        'KEYWORD_VALUE_TYPE': 'Each element of keyword "{keyword}" array must be a "{type}"',
        'UNKNOWN_FORMAT': 'There is no validation function for format "{format}"',
        // Remote errors
        'SCHEMA_NOT_REACHABLE': 'Validator was not able to read schema located at {uri}',
        'SCHEMA_TYPE_EXPECTED': 'Schema is expected to be of type "object"'
    };

    ValidationError.prototype.addSubError = function (err) {
        if (!this.subErrors) { this.subErrors = []; }
        this.subErrors.push(err);
    };

    ValidationError.createError = function (code, params, path) {
        var msg = ValidationError.messages[code];
        params  = params || {};

        if (typeof msg !== 'string') {
            throw new Error('Unknown error code: ' + code);
        }

        msg = msg.replace(/\{([^{}]*)\}/g, function (whole, varName) {
            var subValue = params[varName];
            if (typeof subValue === 'string' || typeof subValue === 'number') {
                return subValue;
            }
            if (subValue && typeof subValue.toString === 'function') {
                return subValue.toString();
            }
            return whole;
        });

        return new ValidationError(code, msg, params, path);
    };

    /***** Utility methods *****/

    var Utils = {
        isBoolean: function (what) {
            return typeof what === 'boolean';
        },
        isString: function (what) {
            return typeof what === 'string';
        },
        isInteger: function (what) {
            return this.isNumber(what) && what % 1 === 0;
        },
        isNumber: function (what) {
            return typeof what === 'number' && Number.isFinite(what);
        },
        isArray: function (what) {
            return Array.isArray(what);
        },
        isObject: function (what) {
            return typeof what === 'object' && what === Object(what) && !Array.isArray(what);
        },
        isFunction: function (what) {
            return typeof what === 'function';
        },
        whatIs: function (what) {
            if (what === undefined) {
                return 'undefined';
            } else if (what === null) {
                return 'null';
            } else if (this.isBoolean(what)) {
                return 'boolean';
            } else if (this.isString(what)) {
                return 'string';
            } else if (this.isArray(what)) {
                return 'array';
            } else if (this.isInteger(what)) {
                return 'integer';
            } else if (this.isNumber(what)) {
                return 'number';
            } else if (this.isObject(what)) {
                return 'object';
            } else if (this.isFunction(what)) {
                return 'function';
            } else if (Number.isNaN(what)) {
                return 'not-a-number';
            } else {
                throw new Error('Utils.whatIs does not know what this is: ' + what);
            }
        },
        isUniqueArray: function (arr, match) {
            match = match || {};
            var i, j, l = arr.length;
            for (i = 0; i < l; i++) {
                for (j = i + 1; j < l; j++) {
                    if (this.areEqual(arr[i], arr[j])) {
                        match.index1 = i;
                        match.index2 = j;
                        return false;
                    }
                }
            }
            return true;
        },
        isAbsoluteUri: function (str) {
            return Utils.getRegExp('^https?\:\/\/').test(str);
        },
        forEach: function (obj, callback, context) {
            if (Array.isArray(obj)) {
                return obj.forEach(callback, context);
            } else if (Utils.isObject(obj)) {
                var key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        callback.call(context, obj[key], key);
                    }
                }
            }
        },
        map: function (obj, callback, thisArg) {
            var index = -1,
                result = [];

            Utils.forEach(obj, function (val, key) {
                result[++index] = callback.call(thisArg, val, key);
            });

            return result;
        },
        defaults: function (main, def) {
            Utils.forEach(def, function (val, key) {
                if (main[key] === undefined) {
                    main[key] = val;
                }
            });
            return main;
        },
        uniq: function (arr) {
            var rv = [];
            arr.forEach(function (val) {
                if (rv.indexOf(val) === -1) {
                    rv.push(val);
                }
            });
            return rv;
        },
        difference: function (bigSet, subSet) {
            var rv = [];
            bigSet.forEach(function (val) {
                if (subSet.indexOf(val) === -1) {
                    rv.push(val);
                }
            });
            return rv;
        },
        areEqual: function (json1, json2) {
            // http://json-schema.org/latest/json-schema-core.html#rfc.section.3.6

            // Two JSON values are said to be equal if and only if:
            // both are nulls; or
            // both are booleans, and have the same value; or
            // both are strings, and have the same value; or
            // both are numbers, and have the same mathematical value; or
            if (json1 === json2) {
                return true;
            }

            var i, len;

            // both are arrays, and:
            if (this.isArray(json1) && this.isArray(json2)) {
                // have the same number of items; and
                if (json1.length !== json2.length) {
                    return false;
                }
                // items at the same index are equal according to this definition; or
                len = json1.length;
                for (i = 0; i < len; i++) {
                    if (!this.areEqual(json1[i], json2[i])) {
                        return false;
                    }
                }
                return true;
            }

            // both are objects, and:
            if (this.isObject(json1) && this.isObject(json2)) {
                // have the same set of property names; and
                var keys1 = Object.keys(json1);
                var keys2 = Object.keys(json2);
                if (!this.areEqual(keys1, keys2)) {
                    return false;
                }
                // values for a same property name are equal according to this definition.
                len = keys1.length;
                for (i = 0; i < len; i++) {
                    if (!this.areEqual(json1[keys1[i]], json2[keys1[i]])) {
                        return false;
                    }
                }
                return true;
            }

            return false;
        },
        decodeJSONPointer: function (str) {
            // http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-07#section-3
            return decodeURIComponent(str).replace(/~[0-1]/g, function (x) {
                return x === '~1' ? '/' : '~';
            });
        },
        _getRegExpCache: {},
        getRegExp: function (pattern) {
            if (!this._getRegExpCache[pattern]) {
                this._getRegExpCache[pattern] = new RegExp(pattern);
            }
            return this._getRegExpCache[pattern];
        },
        _getRemoteSchemaCache: {},
        getRemoteSchema: function (urlWithQuery, callback) {
            var self = this,
                url = urlWithQuery.split('#')[0];

            function returnSchemaFromString(str, url) {
                var sch;

                try {
                    sch = JSON.parse(str);
                } catch (e) {
                    delete self._getRemoteSchemaCache[url];
                    throw new Error('Not a JSON data at: ' + url + ', ' + e);
                }

                // override in case of 'lying' schemas?
                if (!sch.id) {
                    sch.id = url;
                }
                if (!sch.$schema) {
                    sch.$schema = url;
                }
                sch.__$downloadedFrom = url;
                return callback ? callback(undefined, sch) : sch;
            }

            if (self._getRemoteSchemaCache[url]) {
                return returnSchemaFromString(self._getRemoteSchemaCache[url], url);
            }

            if (!callback) {
                // sync mode, checking in cache only
                return;
            }

            request(url, function (error, response, body) {
                if (error) {
                    callback(error);
                    return;
                }
                returnSchemaFromString(self._getRemoteSchemaCache[url] = body, url);
            });
        },
        // query should be valid json pointer
        resolveSchemaQuery: function resolveSchemaQuery(schema, rootSchema, queryStr, allowNull, sync) {
            ZSchema.expect.string(queryStr);
            if (queryStr === '#') {
                return rootSchema;
            }

            var rv = null;
            var uriPart = queryStr.split('#')[0];
            var queryPart = queryStr.split('#')[1];

            if (uriPart) {
                if (uriPart.indexOf('http:') === 0 || uriPart.indexOf('https:') === 0) {
                    // remote
                    if (!rootSchema.__remotes || !rootSchema.__remotes[uriPart]) {
                        if (!sync) {
                            throw new Error('Remote is not downloaded: ' + uriPart);
                        } else {
                            throw new Error('Use .setRemoteReference to download references in sync mode: ' + uriPart);
                        }
                    }
                    rv = rootSchema.__remotes[uriPart];
                } else {
                    // it's a local ID
                    rv = Utils.resolveSchemaId(rootSchema, uriPart);
                }
            } else {
                rv = rootSchema;
            }

            // we have the schema and query to resolve in it
            if (rv && queryPart) {
                var queries = ('#' + queryPart).split('/');
                while (queries.length > 0) {
                    var key = Utils.decodeJSONPointer(queries.shift());
                    if (key.indexOf('#') === -1) {
                        rv = rv[key];
                    } else if (key !== '#') {
                        rv = Utils.resolveSchemaId(rv, key);
                    }
                }
            }

            if (!rv && !allowNull) {
                throw new Error('Could not resolve schema reference: ' + queryStr);
            }

            return rv;
        },
        resolveSchemaId: function (schema, id) {
            if (!this.isObject(schema) && !this.isArray(schema)) {
                return;
            }
            if (schema.id === id) {
                return schema;
            }
            var rv = null;
            Utils.forEach(schema, function (val, key) {
                // prevent recursing through z-schema properties
                if (typeof key === 'string' && key.indexOf('__$') === 0) { return; }

                if (!rv) {
                    rv = Utils.resolveSchemaId(val, id);
                }
            });
            return rv;
        }
    };

    /*
     * these functions are used to validate formats
     * method registerFormat is available for adding new formats
     */
    /*jshint maxlen: false*/
    var FormatValidators = {
        'date': function (date) {
            if (!Utils.isString(date)) {
                return true;
            }
            // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
            var matches = Utils.getRegExp('^([0-9]{4})-([0-9]{2})-([0-9]{2})$').exec(date);
            if (matches === null) {
                return false;
            }
            // var year = matches[1];
            var month = matches[2];
            var day = matches[3];
            if (month < '01' || month > '12' || day < '01' || day > '31') {
                return false;
            }
            return true;
        },
        'date-time': function (dateTime) {
            if (!Utils.isString(dateTime)) {
                return true;
            }
            // date-time from http://tools.ietf.org/html/rfc3339#section-5.6
            var s = dateTime.toLowerCase().split('t');
            if (!FormatValidators.date(s[0])) {
                return false;
            }
            var matches = Utils.getRegExp('^([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]+)?(z|([+-][0-9]{2}:[0-9]{2}))$').exec(s[1]);
            if (matches === null) {
                return false;
            }
            var hour = matches[1];
            var minute = matches[2];
            var second = matches[3];
            // var fraction = matches[4];
            // var timezone = matches[5];
            if (hour > '23' || minute > '59' || second > '59') {
                return false;
            }
            return true;
        },
        'email': function (email, validator) {
            if (validator.options.strictEmails) {
                // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
                return typeof email !== 'string' || Utils.getRegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i).test(email);
            }
            // use less-strict but still safe regex from owasp: https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
            return Utils.getRegExp('^[a-zA-Z0-9+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$').test(email);
        },
        'hostname': function (hostname) {
            if (!Utils.isString(hostname)) {
                return true;
            }
            /*
                http://json-schema.org/latest/json-schema-validation.html#anchor114
                A string instance is valid against this attribute if it is a valid
                representation for an Internet host name, as defined by RFC 1034, section 3.1 [RFC1034].

                http://tools.ietf.org/html/rfc1034#section-3.5

                <digit> ::= any one of the ten digits 0 through 9
                var digit = /[0-9]/;

                <letter> ::= any one of the 52 alphabetic characters A through Z in upper case and a through z in lower case
                var letter = /[a-zA-Z]/;

                <let-dig> ::= <letter> | <digit>
                var letDig = /[0-9a-zA-Z]/;

                <let-dig-hyp> ::= <let-dig> | "-"
                var letDigHyp = /[-0-9a-zA-Z]/;

                <ldh-str> ::= <let-dig-hyp> | <let-dig-hyp> <ldh-str>
                var ldhStr = /[-0-9a-zA-Z]+/;

                <label> ::= <letter> [ [ <ldh-str> ] <let-dig> ]
                var label = /[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?/;

                <subdomain> ::= <label> | <subdomain> "." <label>
                var subdomain = /^[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?(\.[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?)*$/;

                <domain> ::= <subdomain> | " "
                var domain = null;
            */
            var valid = Utils.getRegExp('^[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?(\\.[a-zA-Z](([-0-9a-zA-Z]+)?[0-9a-zA-Z])?)*$').test(hostname);
            if (valid) {
                // the sum of all label octets and label lengths is limited to 255.
                if (hostname.length > 255) { return false; }
                // Each node has a label, which is zero to 63 octets in length
                var labels = hostname.split('.');
                for (var i = 0; i < labels.length; i++) { if (labels[i].length > 63) { return false; } }
            }
            return valid;
        },
        'host-name': function () {
            return FormatValidators.hostname.apply(this, arguments);
        },
        'ipv4': function (ipv4) {
            if (typeof ipv4 !== 'string') { return true; }
            if (ipv4.indexOf('.') === -1) { return false; }
            // https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
            return Utils.getRegExp('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$').test(ipv4);
        },
        'ipv6': function (ipv6) {
            // Stephen Ryan at Dartware @ http://forums.intermapper.com/viewtopic.php?t=452
            return typeof ipv6 !== 'string' || Utils.getRegExp('^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$').test(ipv6);
        },
        'regex': function (str) {
            try {
                Utils.getRegExp(str);
                return true;
            } catch (e) {
                return false;
            }
        },
        'uri': function (uri, validator) {
            if (validator.options.strictUris) {
                return FormatValidators['strict-uri'].apply(this, arguments);
            }
            // https://github.com/zaggino/z-schema/issues/18
            // RegExp from http://tools.ietf.org/html/rfc3986#appendix-B
            return typeof uri !== 'string' || Utils.getRegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?').test(uri);
        },
        'strict-uri': function (uri) {
            // http://mathiasbynens.be/demo/url-regex
            // https://gist.github.com/dperini/729294
            return typeof uri !== 'string' || Utils.getRegExp(
                '^' +
                    // protocol identifier
                    '(?:(?:https?|ftp)://)' +
                    // user:pass authentication
                    '(?:\\S+(?::\\S*)?@)?' +
                    '(?:' +
                        // IP address exclusion
                        // private & local networks
                        '(?!10(?:\\.\\d{1,3}){3})' +
                        '(?!127(?:\\.\\d{1,3}){3})' +
                        '(?!169\\.254(?:\\.\\d{1,3}){2})' +
                        '(?!192\\.168(?:\\.\\d{1,3}){2})' +
                        '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
                        // IP address dotted notation octets
                        // excludes loopback network 0.0.0.0
                        // excludes reserved space >= 224.0.0.0
                        // excludes network & broacast addresses
                        // (first & last IP address of each class)
                        '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
                        '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
                        '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
                    '|' +
                        // host name
                        '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' +
                        // domain name
                        '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' +
                        // TLD identifier
                        '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
                    ')' +
                    // port number
                    '(?::\\d{2,5})?' +
                    // resource path
                    '(?:/[^\\s]*)?' +
                '$', 'i'
            ).test(uri);
        }
    };
    /*jshint maxlen: 150*/

    var CustomFormatValidators = {};

    var Report = function (parentReport) {
        if (parentReport) {
            this.parentReport = parentReport;
            Utils.forEach(parentReport, function (val, key) {
                this[key] = val;
            }, this);
        }
        this.errors = [];
        this.warnings = [];
        this.path = [];
    };
    Report.prototype = {
        getPath: function () {
            var path = ['#'];

            if (this.parentReport) {
                path = path.concat(this.parentReport.path);
            }
            path = path.concat(this.path);

            if (path.length == 1) {
                return '#/';
            }

            return path.join('/');
        },
        addWarning: function (message) {
            this.warnings.push({
                message: message,
                path: this.getPath()
            });
            return true;
        },
        addError: function (code, params, subReports) {
            var err = ValidationError.createError(code, params, this.getPath());
            if (subReports) {
                subReports.forEach(function (report) {
                    report.errors.forEach(function (_err) {
                        err.addSubError(_err);
                    }, this);
                }, this);
            }
            this.errors.push(err);
            return false;
        },
        expect: function (bool, code, params, subReports) {
            if (!bool) {
                this.addError(code, params, subReports);
                return false;
            } else {
                return true;
            }
        },
        isValid: function () {
            return this.errors.length === 0;
        },
        toJSON: function () {
            return {
                valid: this.errors.length === 0,
                errors: this.errors,
                warnings: this.warnings
            };
        },
        toError: function () {
            var err = new Error('Validation failed');
            err.errors = this.errors;
            err.warnings = this.warnings;
            return err;
        },
        toPromise: function () {
            if (this.isValid()) {
                return Promise.resolve(this);
            } else {
                return Promise.reject(this.toError());
            }
        },
        goDown: function (str) {
            this.path.push(str);
        },
        goUp: function () {
            this.path.pop();
        }
    };

    /*
     * Add ability to customize validation later, right now there are no options
     */
    function ZSchema(options) {
        this.options = Utils.defaults(options || {}, {
            noExtraKeywords: false, // when on, do not allow unknown keywords in schema
            noZeroLengthStrings: false, // when on, always adds minLength: 1 to schemas where type is string,
            noTypeless: false, // when on, every schema must specify a type
            forceAdditional: false, // when on, forces not to leave out some keys on schemas (additionalProperties, additionalItems)
            forceProperties: false, // when on, forces not to leave out properties or patternProperties on type-object schemas
            forceItems: false, // when on, forces not to leave out items on array-type schemas
            forceMaxLength: false, // when on, forces not to leave out maxLength on string-type schemas, when format or enum is not specified
            noSchemaCache: false, // when on, schema caching is disabled - cache is used to resolve references by id between schemas
            strictUris: false, // when on, strict uris by rfc3986 are required - https://github.com/zaggino/z-schema/issues/18
            sync: false // when on, features that require async handling are disabled - https://github.com/zaggino/z-schema/issues/19
        });
        if (this.options.strict === true) {
            this.options.noExtraKeywords = true;
            this.options.noZeroLengthStrings = true;
            this.options.noTypeless = true;
            this.options.forceAdditional = true;
            this.options.forceProperties = true;
            this.options.forceItems = true;
            this.options.forceMaxLength = true;
        }
        // schema-cache can be turned off for memory / performance gain when not required
        if (this.options.noSchemaCache !== true) {
            this.schemaCache = {};
        }
    }

    // static-methods

    /**
     * Error utility methods
     */
    ZSchema.expect = {
        typeError: function (expected, what) {
            return 'Type mismatch, expected "' + expected + '", got "' + Utils.whatIs(what) + '"';
        },
        boolean: function (what) {
            if (!Utils.isBoolean(what)) {
                throw new Error(ZSchema.expect.typeError('boolean', what));
            }
        },
        string: function (what) {
            if (!Utils.isString(what)) {
                throw new Error(ZSchema.expect.typeError('string', what));
            }
        },
        callable: function (what) {
            if (!Utils.isFunction(what)) {
                throw new Error(ZSchema.expect.typeError('function', what));
            }
        },
        object: function (what) {
            if (!Utils.isObject(what)) {
                throw new Error(ZSchema.expect.typeError('object', what));
            }
        }
    };

    /*
     *  Basic validation entry, uses instance of validator with default options
     */
    ZSchema.validate = function () {
        if (!this._defaultInstance) {
            var Self = this;
            this._defaultInstance = new Self();
        }
        return this._defaultInstance.validate.apply(this._defaultInstance, arguments);
    };

    /*
     *  Register your own format function to use when validating
     *
     *  `func` can be sync or async and can either return a promise or
     *  execute a classic callback passed as last argument
     */
    ZSchema.registerFormat = function (name, func) {
        ZSchema.expect.string(name);
        ZSchema.expect.callable(func);

        if (FormatValidators[name]) {
            throw new Error('Cannot override built-in validator for ' + name);
        }

        if (CustomFormatValidators[name]) {
            throw new Error('Cannot override existing validator for ' + name);
        }

        CustomFormatValidators[name] = func;
    };

    /**
     * Register your own format validation function and tell ZSchema to call it in sync mode (performance)
     */
    ZSchema.registerFormatSync = function (name, func) {
        func.__$sync = true;
        return ZSchema.registerFormat(name, func);
    };

    /*
     *  Convenience method if you wish to pre-load remote schemas so validator doesn't
     *  have to do that while running validation later.
     */
    ZSchema.setRemoteReference = function (url, data) {
        ZSchema.expect.string(data);
        Utils._getRemoteSchemaCache[url] = data;
    };

    // instance-methods

    /**
     * Validate object against schema
     *
     * @param {Object} json Object to validate
     * @param {Object} schema Schema
     * @param {Function} [callback]
     * @returns {Object} Promise for Report
     */
    ZSchema.prototype.validate = function (json, schema, callback) {
        var self = this;
        var report = new Report();

        if (this.options.sync) {

            if (!schema.__$compiled) {
                this._compileSchema(report, schema);
            }
            if (!schema.__$validated) {
                this._validateSchema(report, schema);
            }
            this._validateObject(report, schema, json);
            this._lastError = report.toJSON();
            return report.isValid();

        } else {

            // schema compilation is async as some remote requests may occur
            return this._compileSchema(report, schema)
                .then(function (compiledSchema) {
                    // schema validation
                    return self._validateSchema(report, compiledSchema)
                        .then(function () {
                            // object validation against schema
                            return self._validateObject(report, compiledSchema, json)
                                .then(function () {
                                    return report.toPromise();
                                });
                        });
                })
                .then(function () {
                    return report.toJSON();
                })
                .nodeify(callback);
        }
    };

    ZSchema.prototype.getLastError = function () {
        return this._lastError;
    };

    /**
     * Compile Schema
     * @param schema
     * @param {Function} [callback]
     * @returns {Object} Promise for compiled schema
     */
    ZSchema.prototype.compileSchema = function (schema, callback) {
        var self = this;

        if (Array.isArray(schema)) {
            return this.options.sync ? this.compileSchemasSync(schema) : this.compileSchemas(schema, callback);
        }

        var report = new Report();

        if (this.options.sync) {
            this._compileSchema(report, schema);
            this._validateSchema(report, schema);
            this._lastError = report.toJSON();
            if (report.isValid()) {
                return schema;
            } else {
                throw report.toError();
            }
        } else {
            return this._compileSchema(report, schema).then(function (compiledSchema) {
                return self._validateSchema(report, compiledSchema).then(function () {
                    return compiledSchema;
                });
            }).nodeify(callback);
        }
    };

    /**
     * Compile multiple schemas in one batch
     * @param {Array} array of schemas
     * @param {Function} callback
     * @returns {Object} Promise
     */
    ZSchema.prototype.compileSchemas = function (arr, callback) {
        var self = this,
            compileSchemasFinished = Promise.defer(),
            compiled = [],
            failed = [],
            lastError;

        var loopArrayFinished;
        function loopArray() {
            // condition
            if (arr.length === 0) { return loopArrayFinished.resolve(); }
            // body
            var nextSchema = arr.shift();
            self.compileSchema(nextSchema).then(function () {
                compiled.push(nextSchema);
            }).catch(function (err) {
                lastError = err;
                failed.push(nextSchema);
            }).finally(function () {
                loopArray();
            });
        }

        var lastArrayLength;
        function loopCompile() {
            // condition
            if (arr.length === 0) { return compileSchemasFinished.resolve(compiled); }
            if (arr.length === lastArrayLength) { return compileSchemasFinished.reject(lastError); }
            // body
            lastArrayLength = arr.length;
            loopArrayFinished = Promise.defer();
            loopArrayFinished.promise.then(function () {
                arr = failed;
                failed = [];
                loopCompile();
            });
            loopArray();
        }
        loopCompile();

        return compileSchemasFinished.promise.nodeify(callback);
    };

    ZSchema.prototype.compileSchemasSync = function (arr) {
        var self = this,
            lastError,
            compiled,
            retArr = [];

        function cycle() {
            compiled = 0;
            arr.forEach(function (sch, i) {
                try {
                    self.compileSchema(sch);
                } catch (e) {
                    lastError = e;
                    return;
                }
                compiled++;
                retArr.push(sch);
                arr.splice(i, 1);
            });
        }

        do {
            cycle();
        } while (compiled > 0);

        if (arr.length === 0) {
            return retArr;
        } else {
            throw lastError;
        }
    };

    /**
     * Validate schema
     *
     * @param schema
     * @param {Function} callback
     * @returns {Object} Promise for Report
     */
    ZSchema.prototype.validateSchema = function (schema, callback) {
        var report = new Report();
        report.expect(Utils.isObject(schema), 'SCHEMA_TYPE_EXPECTED');

        if (this.options.sync) {
            this._validateSchema(report, schema);
            this._lastError = report.toJSON();
            if (report.isValid()) {
                return schema;
            } else {
                throw report.toError();
            }
        } else {
            return this._validateSchema(report, schema)
                .then(function () {
                    return report.toJSON();
                })
                .nodeify(callback);
        }
    };

    // recurse schema and collect all references for download
    ZSchema.prototype._collectReferences = function _collectReferences(schema) {
        var arr = [];
        if (Utils.isString(schema.$ref)) {
            arr.push(schema);
        }
        Utils.forEach(schema, function (val, key) {
            if (typeof key === 'string' && key.indexOf('__') === 0) {
                return;
            }
            if (Utils.isObject(val) || Utils.isArray(val)) {
                arr = arr.concat(_collectReferences(val));
            }
        }, this);
        return arr;
    };

    ZSchema.prototype._compileSchema = function (report, schema) {
        var self = this;
        
        // if schema is a string, assume it's a uri
        if (typeof schema === 'string') {
            // getRemoteSchema is sync when callback is not specified
            var cachedSchema = Utils.getRemoteSchema(schema);
            if (!cachedSchema) {
                report.addError('SCHEMA_NOT_REACHABLE', {uri: schema});
            } else {
                schema = cachedSchema;
            }
        }

        // reusing of compiled schemas
        if (schema.__$compiled) {
            // we need to add this to our schemaCache
            if (schema.id && self.schemaCache) {
                self.schemaCache[schema.id] = schema;
            }
            return this.options.sync ? schema : Promise.resolve(schema);
        }

        // fix all references
        this._fixInnerReferences(schema);
        this._fixOuterReferences(schema);

        // then collect for downloading other schemas
        var refObjs = this._collectReferences(schema);
        var refs = Utils.uniq(refObjs.map(function (obj) {
            return obj.$ref;
        }));

        function afterDownload() {
            refObjs.forEach(function (refObj) {
                var reference = refObj.$ref;
                if (reference.length > 1 && reference.slice(-1) === '#') {
                    reference = reference.substring(0, reference.length - 1);
                }

                if (!refObj.__$refResolved) {
                    refObj.__$refResolved = Utils.resolveSchemaQuery(refObj, schema, reference, true, self.options.sync) || null;
                }

                if (self.schemaCache && self.schemaCache[reference]) {
                    refObj.__$refResolved = self.schemaCache[reference];
                }

                report.expect(refObj.__$refResolved != null, 'UNRESOLVABLE_REFERENCE', {ref: refObj.$ref});
            });
            if (report.isValid()) {
                schema.__$compiled = true;
            }
            if (schema.id && self.schemaCache) {
                self.schemaCache[schema.id] = schema;
            }
            return schema;
        }

        function download() {
            return refs.map(function (ref) {
                // download if it is a remote
                if (ref.indexOf('http:') === 0 || ref.indexOf('https:') === 0) {
                    return self._downloadRemoteReferences(report, schema, ref.split('#')[0]);
                }
            });
        }

        if (this.options.sync) {
            download();
            afterDownload();
        } else {
            return Promise.all(download()).then(afterDownload);
        }
    };

    ZSchema.prototype._fixInnerReferences = function _fixInnerReferences(rootSchema, schema) {
        if (!schema) {
            schema = rootSchema;
        }
        if (Utils.isString(schema.$ref) && schema.__$refResolved !== null && schema.$ref.indexOf('http:') !== 0 &&
            schema.$ref.indexOf('https:') !== 0) {
            schema.__$refResolved = Utils.resolveSchemaQuery(schema, rootSchema, schema.$ref, true, this.options.sync) || null;
        }
        Utils.forEach(schema, function (val, key) {
            if (typeof key === 'string' && key.indexOf('__') === 0) {
                return;
            }
            if (Utils.isObject(val) || Utils.isArray(val)) {
                _fixInnerReferences.call(this, rootSchema, val);
            }
        }, this);
    };

    // fix references according to current scope
    ZSchema.prototype._fixOuterReferences = function _fixOuterReferences(schema, scope) {
        scope = scope || [];
        if (Utils.isString(schema.id)) {
            scope.push(schema.id);
        }
        if (Utils.isString(schema.$ref) && !schema.__$refResolved && !Utils.isAbsoluteUri(schema.$ref)) {
            if (scope.length > 0) {
                var s = scope.join('').split('#')[0];
                if (schema.$ref[0] === '#') {
                    schema.$ref = s + schema.$ref;
                } else {
                    schema.$ref = s.substring(0, 1 + s.lastIndexOf('/')) + schema.$ref;
                }
            }
        }
        Utils.forEach(schema, function (val, key) {
            if (typeof key === 'string' && key.indexOf('__') === 0) {
                return;
            }
            if (Utils.isObject(val) || Utils.isArray(val)) {
                _fixOuterReferences(val, scope);
            }
        }, this);
        if (Utils.isString(schema.id)) {
            scope.pop();
        }
    };

    // download remote references when needed
    ZSchema.prototype._downloadRemoteReferences = function (report, rootSchema, uri) {
        if (!rootSchema.__remotes) {
            rootSchema.__remotes = {};
        }

        // do not try to download self
        if (rootSchema.id && uri === rootSchema.id.split('#')[0]) {
            rootSchema.__remotes[uri] = rootSchema;
            return this.options.sync ? null : Promise.resolve();
        }

        if (this.options.sync) {
            // getRemoteSchema is sync when callback is not specified
            var remoteSchema = Utils.getRemoteSchema(uri);
            if (remoteSchema) {
                this._compileSchema(report, remoteSchema);
                rootSchema.__remotes[uri] = remoteSchema;
            }
        } else {
            var self = this,
                p = Promise.defer();
            Utils.getRemoteSchema(uri, function (err, remoteSchema) {
                if (err) {
                    err.description = 'Connection failed to: ' + uri;
                    return p.reject(err);
                }
                p.resolve(self._compileSchema(report, remoteSchema)
                    .then(function (compiledRemoteSchema) {
                        rootSchema.__remotes[uri] = compiledRemoteSchema;
                    }));
            });
            return p.promise;
        }
    };

    ZSchema.prototype._validateSchema = function (report, schema) {
        if (schema.__$validated) {
            return this.options.sync ? schema : Promise.resolve(schema);
        }

        var self = this,
            hasParentSchema = schema.$schema && schema.id !== schema.$schema;

        var finish = function () {
            // run sync validations over schema keywords
            if (self.options.noTypeless === true) {

                // issue #36 - inherit type to anyOf, oneOf, allOf if noTypeless is defined
                if (schema.type !== undefined) {
                    var schemas = [];
                    if (Array.isArray(schema.anyOf)) { schemas = schemas.concat(schema.anyOf); }
                    if (Array.isArray(schema.oneOf)) { schemas = schemas.concat(schema.oneOf); }
                    if (Array.isArray(schema.allOf)) { schemas = schemas.concat(schema.allOf); }
                    schemas.forEach(function (sch) {
                        if (!sch.type) { sch.type = schema.type; }
                    });
                }
                // end issue #36

                report.expect(schema.type !== undefined || schema.anyOf !== undefined || schema.oneOf !== undefined ||
                              schema.not  !== undefined || schema.$ref  !== undefined, 'KEYWORD_UNDEFINED_STRICT', {keyword: 'type'});
            }
            Utils.forEach(schema, function (value, key) {
                if (typeof key === 'string' && key.indexOf('__') === 0) {
                    return;
                }
                if (SchemaValidators[key] !== undefined) {
                    SchemaValidators[key].call(self, report, schema);
                } else if (!hasParentSchema) {
                    if (self.options.noExtraKeywords === true) {
                        report.expect(false, 'KEYWORD_UNEXPECTED', {keyword: key});
                    } else {
                        report.addWarning('Unknown key "' + key + '" found in schema.');
                    }
                }
            });
            if (report.isValid()) {
                schema.__$validated = true;
            }
            self._lastError = report.toJSON();
            return self.options.sync ? report.isValid() : report.toPromise();
        };

        // if $schema is present, this schema should validate against that $schema
        if (hasParentSchema) {
            if (this.options.sync) {
                // remote schema will not be validated in sync mode - assume that schema is correct
                return finish();
            } else {
                var rv = Promise.defer();
                Utils.getRemoteSchema(schema.$schema, function (err, remoteSchema) {
                    if (err) {
                        report.addError('SCHEMA_NOT_REACHABLE', {uri: schema.$schema});
                        rv.resolve();
                        return;
                    }
                    // prevent recursion here
                    if (schema.__$downloadedFrom !== remoteSchema.__$downloadedFrom) {
                        self.validate(schema, remoteSchema, function (err) {
                            if (err) {
                                report.errors = report.errors.concat(err.errors);
                            }
                            rv.resolve();
                        });
                    } else {
                        rv.resolve();
                    }
                });
                return rv.promise.then(finish);
            }
        } else {
            return finish();
        }
    };

    ZSchema.prototype._validateObject = function (report, schema, instance) {
        ZSchema.expect.object(schema);

        // empty schema passed, nothing to validate here
        if (Object.keys(schema).length === 0) {
            if (this.options.sync) {
                return report.isValid();
            } else {
                return Promise.resolve(report);
            }
        }

        var self = this;

        var thisIsRoot = false;
        if (!report.rootSchema) {
            report.rootSchema = schema;
            thisIsRoot = true;
        }

        var maxRefs = 99;
        while (schema.$ref && maxRefs > 0) {
            if (schema.__$refResolved) {
                schema = schema.__$refResolved;
            } else {
                schema = Utils.resolveSchemaQuery(schema, report.rootSchema, schema.$ref, false, self.options.sync);
            }
            maxRefs--;
        }

        function step1(val, key) {
            if (InstanceValidators[key] !== undefined) {
                return InstanceValidators[key].call(self, report, schema, instance);
            }
        }

        function step2() {
            // Children calculations
            if (Utils.isArray(instance)) {
                return self._recurseArray(report, schema, instance);
            } else if (Utils.isObject(instance)) {
                return self._recurseObject(report, schema, instance);
            }
        }

        function step3() {
            if (thisIsRoot) {
                delete report.rootSchema;
            }
            return report;
        }

        if (this.options.sync) {
            Utils.forEach(schema, step1);
            step2();
            step3();
            self._lastError = report.toJSON();
            return report.isValid();
        } else {
            return Promise.all(Utils.map(schema, step1)).then(step2).then(step3);
        }
    };

    ZSchema.prototype._recurseArray = function (report, schema, instance) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.8.2

        var p, self = this;

        // If items is a schema, then the child instance must be valid against this schema,
        // regardless of its index, and regardless of the value of "additionalItems".
        if (Utils.isObject(schema.items)) {

            if (this.options.sync) {
                instance.forEach(function (val, index) {
                    report.goDown('[' + index + ']');
                    this._validateObject(report, schema.items, val);
                    report.goUp();
                }, this);
                return;
            } else {
                p = Promise.resolve();
                instance.forEach(function (val, index) {
                    p = p.then(function () {
                        report.goDown('[' + index + ']');
                        return self._validateObject(report, schema.items, val)
                            .then(function () {
                                report.goUp();
                            });
                    });
                });
                return p;
            }

        }

        // If "items" is an array, this situation, the schema depends on the index:
        // if the index is less than, or equal to, the size of "items",
        // the child instance must be valid against the corresponding schema in the "items" array;
        // otherwise, it must be valid against the schema defined by "additionalItems".
        if (Utils.isArray(schema.items)) {

            if (this.options.sync) {
                instance.forEach(function (val, index) {
                    // equal to doesnt make sense here
                    if (index < schema.items.length) {
                        report.goDown('[' + index + ']');
                        this._validateObject(report, schema.items[index], val);
                        report.goUp();
                    } else {
                        // might be boolean
                        if (Utils.isObject(schema.additionalItems)) {
                            report.goDown('[' + index + ']');
                            this._validateObject(report, schema.additionalItems, val);
                            report.goUp();
                        }
                    }
                }, this);
                return;
            } else {
                p = Promise.resolve();
                instance.forEach(function (val, index) {
                    p = p.then(function () {
                        // equal to doesnt make sense here
                        if (index < schema.items.length) {
                            report.goDown('[' + index + ']');
                            return self._validateObject(report, schema.items[index], val)
                                .then(function () {
                                    report.goUp();
                                });
                        } else {
                            // might be boolean
                            if (Utils.isObject(schema.additionalItems)) {
                                report.goDown('[' + index + ']');
                                return self._validateObject(report, schema.additionalItems, val)
                                    .then(function () {
                                        report.goUp();
                                    });
                            }
                        }
                    });
                });
                return p;
            }
        }
    };

    ZSchema.prototype._recurseObject = function (report, schema, instance) {
        // http://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3

        var self = this;
        var promise = this.options.sync ? null : Promise.resolve();

        // If "additionalProperties" is absent, it is considered present with an empty schema as a value.
        // In addition, boolean value true is considered equivalent to an empty schema.
        var additionalProperties = schema.additionalProperties;
        if (additionalProperties === true || additionalProperties === undefined) {
            additionalProperties = {};
        }
        // p - The property set from "properties".
        var p = Object.keys(schema.properties || {});
        // pp - The property set from "patternProperties". Elements of this set will be called regexes for convenience.
        var pp = Object.keys(schema.patternProperties || {});
        // m - The property name of the child.
        Utils.forEach(instance, function (propertyValue, m) {
            // s - The set of schemas for the child instance.
            var s = [];

            // 1. If set "p" contains value "m", then the corresponding schema in "properties" is added to "s".
            if (p.indexOf(m) !== -1) {
                s.push(schema.properties[m]);
            }

            // 2. For each regex in "pp", if it matches "m" successfully, the corresponding schema in "patternProperties" is added to "s".
            pp.forEach(function (str) {
                if (Utils.getRegExp(str).test(m) === true) {
                    s.push(schema.patternProperties[str]);
                }
            }, this);

            // 3. The schema defined by "additionalProperties" is added to "s" if and only if, at this stage, "s" is empty.
            if (s.length === 0 && additionalProperties !== false) {
                s.push(additionalProperties);
            }

            // we are passing tests even without this assert because this is covered by properties check
            // if s is empty in this stage, no additionalProperties are allowed
            // report.expect(s.length !== 0, 'E001', m);

            // Instance property value must pass all schemas from s
            s.forEach(function (sch) {
                if (this.options.sync) {
                    report.goDown(m);
                    this._validateObject(report, sch, propertyValue);
                    report.goUp();
                } else {
                    promise = promise.then(function () {
                        report.goDown(m);
                        return self._validateObject(report, sch, propertyValue)
                            .then(function () {
                                report.goUp();
                            });
                    });
                }
            }, this);
        }, this);

        return this.options.sync ? null : promise;
    };

    /*
     * use this functions to validate json schema itself
     * every code here SHOULD reference json schema specification
     */
    var SchemaValidators = {
        $ref: function (report, schema) {
            // http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-07
            // http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03
            report.expect(Utils.isString(schema.$ref), 'KEYWORD_TYPE_EXPECTED', {keyword: '$ref', type: 'string'});
        },
        $schema: function (report, schema) {
            // http://json-schema.org/latest/json-schema-core.html#rfc.section.6
            report.expect(Utils.isString(schema.$schema), 'KEYWORD_TYPE_EXPECTED', {keyword: '$schema', type: 'string'});
        },
        multipleOf: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.1.1
            var fine = report.expect(Utils.isNumber(schema.multipleOf), 'KEYWORD_TYPE_EXPECTED', {keyword: 'multipleOf', type: 'number'});
            if (!fine) { return; }
            report.expect(schema.multipleOf > 0, 'KEYWORD_MUST_BE', { keyword: 'multipleOf', expression: 'strictly greater than 0'});
        },
        maximum: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.1
            report.expect(Utils.isNumber(schema.maximum), 'KEYWORD_TYPE_EXPECTED', {keyword: 'maximum', type: 'number'});
        },
        exclusiveMaximum: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.1
            var fine = report.expect(Utils.isBoolean(schema.exclusiveMaximum),
                                     'KEYWORD_TYPE_EXPECTED', {keyword: 'exclusiveMaximum', type: 'boolean'});
            if (!fine) { return; }
            report.expect(schema.maximum !== undefined, 'KEYWORD_DEPENDENCY', {keyword1: 'exclusiveMaximum', keyword2: 'maximum'});
        },
        minimum: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.1
            report.expect(Utils.isNumber(schema.minimum), 'KEYWORD_TYPE_EXPECTED', {keyword: 'minimum', type: 'number'});
        },
        exclusiveMinimum: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.1
            var fine = report.expect(Utils.isBoolean(schema.exclusiveMinimum),
                                     'KEYWORD_TYPE_EXPECTED', {keyword: 'exclusiveMinimum', type: 'boolean'});
            if (!fine) { return; }
            report.expect(schema.minimum !== undefined, 'KEYWORD_DEPENDENCY', {keyword1: 'exclusiveMinimum', keyword2: 'minimum'});
        },
        maxLength: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.1.1
            var fine = report.expect(Utils.isInteger(schema.maxLength), 'KEYWORD_TYPE_EXPECTED', {keyword: 'maxLength', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.maxLength >= 0, 'KEYWORD_MUST_BE', {keyword: 'maxLength', expression: 'greater than, or equal to 0'});
        },
        minLength: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.2.1
            var fine = report.expect(Utils.isInteger(schema.minLength), 'KEYWORD_TYPE_EXPECTED', {keyword: 'minLength', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.minLength >= 0, 'KEYWORD_MUST_BE', {keyword: 'minLength', expression: 'greater than, or equal to 0'});
        },
        pattern: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.3.1
            var fine = report.expect(Utils.isString(schema.pattern), 'KEYWORD_TYPE_EXPECTED', {keyword: 'pattern', type: 'string'});
            if (!fine) { return; }
            try {
                Utils.getRegExp(schema.pattern);
            } catch (e) {
                report.addError('KEYWORD_PATTERN', {keyword: 'pattern', pattern: schema.pattern});
            }
        },
        additionalItems: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.1
            var isBoolean = Utils.isBoolean(schema.additionalItems);
            var isObject = Utils.isObject(schema.additionalItems);
            var fine = report.expect(isBoolean || isObject, 'KEYWORD_TYPE_EXPECTED', {keyword: 'additionalItems', type: ['boolean', 'object']});
            if (!fine) { return; }
            if (isObject) {
                report.goDown('additionalItems');
                this._validateSchema(report, schema.additionalItems);
                report.goUp();
            }
        },
        items: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.1
            var self = this;
            var isArray = Utils.isArray(schema.items);
            var isObject = Utils.isObject(schema.items);
            var fine = report.expect(isArray || isObject, 'KEYWORD_TYPE_EXPECTED', {keyword: 'items', type: ['array', 'object']});
            if (!fine) { return; }
            if (isObject) {
                report.goDown('items');
                this._validateSchema(report, schema.items);
                report.goUp();
            } else if (isArray) {
                schema.items.forEach(function (obj, index) {
                    report.goDown('items[' + index + ']');
                    self._validateSchema(report, obj);
                    report.goUp();
                });
            }
            // custom - strict mode
            if (this.options.forceAdditional === true) {
                report.expect(schema.additionalItems !== undefined, 'KEYWORD_UNDEFINED_STRICT', {keyword: 'additionalItems'});
            }
        },
        maxItems: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.2.1
            var fine = report.expect(Utils.isInteger(schema.maxItems), 'KEYWORD_TYPE_EXPECTED', {keyword: 'maxItems', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.maxItems >= 0, 'KEYWORD_MUST_BE', {keyword: 'maxItems', expression: 'greater than, or equal to 0'});
        },
        minItems: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.3.1
            var fine = report.expect(Utils.isInteger(schema.minItems), 'KEYWORD_TYPE_EXPECTED', {keyword: 'minItems', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.minItems >= 0, 'KEYWORD_MUST_BE', {keyword: 'minItems', expression: 'greater than, or equal to 0'});
        },
        uniqueItems: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.4.1
            report.expect(Utils.isBoolean(schema.uniqueItems), 'KEYWORD_TYPE_EXPECTED', {keyword: 'uniqueItems', type: 'boolean'});
        },
        maxProperties: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.1.1
            var fine = report.expect(Utils.isInteger(schema.maxProperties), 'KEYWORD_TYPE_EXPECTED', {keyword: 'maxProperties', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.maxProperties >= 0, 'KEYWORD_MUST_BE', {keyword: 'maxProperties', expression: 'greater than, or equal to 0'});
        },
        minProperties: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.2.1
            var fine = report.expect(Utils.isInteger(schema.minProperties), 'KEYWORD_TYPE_EXPECTED', {keyword: 'minProperties', type: 'integer'});
            if (!fine) { return; }
            report.expect(schema.minProperties >= 0, 'KEYWORD_MUST_BE', {keyword: 'minProperties', expression: 'greater than, or equal to 0'});
        },
        required: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.3.1
            var fine;
            fine = report.expect(Utils.isArray(schema.required), 'KEYWORD_TYPE_EXPECTED', {keyword: 'required', type: 'array'});
            if (!fine) { return; }
            fine = report.expect(schema.required.length > 0,
                                 'KEYWORD_MUST_BE', {keyword: 'required', expression: 'an array with at least one element'});
            if (!fine) { return; }
            schema.required.forEach(function (el) {
                report.expect(Utils.isString(el), 'KEYWORD_VALUE_TYPE', {keyword: 'required', type: 'string'});
            }, this);
            report.expect(Utils.isUniqueArray(schema.required), 'KEYWORD_MUST_BE', {keyword: 'required', expression: 'an array with unique items'});
        },
        additionalProperties: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
            var isBoolean = Utils.isBoolean(schema.additionalProperties);
            var isObject = Utils.isObject(schema.additionalProperties);
            var fine = report.expect(isBoolean || isObject, 'KEYWORD_TYPE_EXPECTED', {keyword: 'additionalProperties', type: ['boolean', 'object']});
            if (!fine) { return; }
            if (isObject) {
                report.goDown('additionalProperties');
                this._validateSchema(report, schema.additionalProperties);
                report.goUp();
            }
        },
        properties: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
            var self = this;

            var fine = report.expect(Utils.isObject(schema.properties), 'KEYWORD_TYPE_EXPECTED', {keyword: 'properties', type: 'object'});
            if (!fine) { return; }
            Utils.forEach(schema.properties, function (val, propName) {
                report.goDown('properties[' + propName + ']');
                self._validateSchema(report, val);
                report.goUp();
            });

            // custom - strict mode
            if (this.options.forceAdditional === true) {
                report.expect(schema.additionalProperties !== undefined, 'KEYWORD_UNDEFINED_STRICT', {keyword: 'additionalProperties'});
            }
        },
        patternProperties: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.1
            var self = this;
            var fine = report.expect(Utils.isObject(schema.patternProperties),
                                     'KEYWORD_TYPE_EXPECTED', {keyword: 'patternProperties', type: 'object'});
            if (!fine) { return; }
            Utils.forEach(schema.patternProperties, function (val, propName) {
                try {
                    Utils.getRegExp(propName);
                } catch (e) {
                    report.addError('KEYWORD_PATTERN', {keyword: 'patternProperties', pattern: propName});
                }
                report.goDown('patternProperties[' + propName + ']');
                self._validateSchema(report, val);
                report.goUp();
            });
        },
        dependencies: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.5.1

            var self = this;

            var fine = report.expect(Utils.isObject(schema.dependencies), 'KEYWORD_TYPE_EXPECTED', 'dependencies', 'object');
            if (!fine) { return; }
            Utils.forEach(schema.dependencies, function (schemaDependency, schemaKey) {

                var isObject = Utils.isObject(schemaDependency);
                var isArray = Utils.isArray(schemaDependency);
                report.expect(isObject || isArray, 'KEYWORD_VALUE_TYPE', {keyword: 'dependencies', type: 'object or array'});
                if (isObject) {
                    report.goDown('dependencies[' + schemaKey + ']');
                    self._validateSchema(report, schemaDependency);
                    report.goUp();
                } else if (isArray) {
                    report.expect(schemaDependency.length > 0, 'KEYWORD_MUST_BE', {keyword: 'dependencies', expression: 'not empty array'});
                    schemaDependency.forEach(function (el) {
                        report.expect(Utils.isString(el), 'KEYWORD_VALUE_TYPE', {keyword: 'dependensices', type: 'string'});
                    });
                    report.expect(Utils.isUniqueArray(schemaDependency), {keyword: 'dependencies', expression: 'an array with unique items'});
                }
            });
        },
        enum: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.1.1
            var fine;
            fine = report.expect(Utils.isArray(schema.enum), 'KEYWORD_TYPE_EXPECTED', {keyword: 'enum', type: 'array'});
            if (!fine) { return; }
            fine = report.expect(schema.enum.length > 0, 'KEYWORD_MUST_BE', {keyword: 'enum', expression: 'an array with at least one element'});
            if (!fine) { return; }
            fine = report.expect(Utils.isUniqueArray(schema.enum), 'KEYWORD_MUST_BE', {keyword: 'enum', expression: 'an array with unique items'});
        },
        type: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.2.1
            var primitiveTypes = ['array', 'boolean', 'integer', 'number', 'null', 'object', 'string'];
            var primitiveTypeStr = primitiveTypes.join(',');
            var isString = Utils.isString(schema.type);
            var isArray = Utils.isArray(schema.type);
            var fine;
            fine = report.expect(isString || isArray, 'KEYWORD_TYPE_EXPECTED', {keyword: 'type', type: ['string', 'array']});
            if (!fine) { return; }
            if (isArray) {
                schema.type.forEach(function (el) {
                    report.expect(primitiveTypes.indexOf(el) !== -1, 'KEYWORD_TYPE_EXPECTED', { keyword: 'type', type: primitiveTypeStr});
                }, this);
                report.expect(Utils.isUniqueArray(schema.type), 'KEYWORD_MUST_BE', {keyword: 'type', expression: 'an object with unique properties'});
            } else {
                report.expect(primitiveTypes.indexOf(schema.type) !== -1, 'KEYWORD_TYPE_EXPECTED', { keyword: 'type', type: primitiveTypeStr});
            }
            if (this.options.noZeroLengthStrings === true) {
                if (schema.type === 'string' || isArray && schema.type.indexOf('string') !== -1) {
                    if (schema.minLength === undefined) {
                        schema.minLength = 1;
                    }
                }
            }
            if (this.options.forceProperties === true) {
                if (schema.type === 'object' || isArray && schema.type.indexOf('object') !== -1) {
                    report.expect(schema.properties !== undefined || schema.patternProperties !== undefined,
                                  'KEYWORD_UNDEFINED_STRICT', {keyword: 'properties'});
                }
            }
            if (this.options.forceItems === true) {
                if (schema.type === 'array' || isArray && schema.type.indexOf('array') !== -1) {
                    report.expect(schema.items !== undefined, 'KEYWORD_UNDEFINED_STRICT', {keyword: 'items'});
                }
            }
            if (this.options.forceMaxLength === true) {
                if (schema.type === 'string' || isArray && schema.type.indexOf('string') !== -1) {
                    report.expect(schema.maxLength !== undefined || schema.format !== undefined || schema.enum !== undefined,
                                  'KEYWORD_UNDEFINED_STRICT', {keyword: 'maxLength'});
                }
            }
        },
        allOf: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.3.1

            var self = this;

            var fine;
            fine = report.expect(Utils.isArray(schema.allOf), 'KEYWORD_TYPE_EXPECTED', {keyword: 'allOf', type: 'array'});
            if (!fine) { return; }
            fine = report.expect(schema.allOf.length > 0, 'KEYWORD_MUST_BE', {keyword: 'allOf', expression: 'an array with at least one element'});
            if (!fine) { return; }
            schema.allOf.forEach(function (sch, index) {
                report.goDown('allOf[' + index + ']');
                self._validateSchema(report, sch);
                report.goUp();
            });
        },
        anyOf: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.4.1

            var self = this;

            var fine;
            fine = report.expect(Utils.isArray(schema.anyOf), 'KEYWORD_TYPE_EXPECTED', {keyword: 'anyOf', type: 'array'});
            if (!fine) { return; }
            fine = report.expect(schema.anyOf.length > 0, 'KEYWORD_MUST_BE', {keyword: 'anyOf', expression: 'an array with at least one element'});
            if (!fine) { return; }
            schema.anyOf.forEach(function (sch, index) {
                report.goDown('anyOf[' + index + ']');
                self._validateSchema(report, sch);
                report.goUp();
            });
        },
        oneOf: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.5.1

            var self = this;

            var fine;
            fine = report.expect(Utils.isArray(schema.oneOf), 'KEYWORD_TYPE_EXPECTED', {keyword: 'oneOf', type: 'array'});
            if (!fine) { return; }
            fine = report.expect(schema.oneOf.length > 0, 'KEYWORD_MUST_BE', {keyword: 'oneOf', expression: 'an array with at least one element'});
            if (!fine) { return; }

            schema.oneOf.forEach(function (sch, index) {
                report.goDown('oneOf[' + index + ']');
                self._validateSchema(report, sch);
                report.goUp();
            });
        },
        not: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.6.1
            var fine;
            fine = report.expect(Utils.isObject(schema.not), 'KEYWORD_TYPE_EXPECTED', {keyword: 'not', type: 'object'});
            if (!fine) { return; }
            report.goDown('not');
            this._validateSchema(report, schema.not);
            report.goUp();
        },
        definitions: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.7.1
            var self = this;
            var fine;
            fine = report.expect(Utils.isObject(schema.definitions), 'KEYWORD_TYPE_EXPECTED', {keyword: 'definitions', type: 'object'});
            if (!fine) { return; }
            Utils.forEach(schema.definitions, function (obj, index) {
                report.goDown('definitions[' + index + ']');
                self._validateSchema(report, obj);
                report.goUp();
            });
        },
        format: function (report, schema) {
            var fine;
            fine = report.expect(Utils.isString(schema.format), 'KEYWORD_TYPE_EXPECTED', {keyword: 'format', type: 'string'});
            if (!fine) { return; }
            fine = report.expect(Utils.isFunction(FormatValidators[schema.format]) || Utils.isFunction(CustomFormatValidators[schema.format]),
                                 'UNKNOWN_FORMAT', {format: schema.format});
            if (!fine) { return; }
        },
        id: function (report, schema) {
            // http://json-schema.org/latest/json-schema-core.html#rfc.section.7.2
            report.expect(Utils.isString(schema.id), 'KEYWORD_TYPE_EXPECTED', {keyword: 'id', type: 'string'});
        },
        title: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1
            report.expect(Utils.isString(schema.title), 'KEYWORD_TYPE_EXPECTED', {keyword: 'title', type: 'string'});
        },
        description: function (report, schema) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1
            report.expect(Utils.isString(schema.description), 'KEYWORD_TYPE_EXPECTED', {keyword: 'description', type: 'string'});
        },
        'default': function () { /*report, schema*/
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2
        },
        // ---- custom keys used by ZSchema
        __$compiled: function (report, schema) {
            ZSchema.expect.boolean(schema.__$compiled);
        },
        __$validated: function (report, schema) {
            ZSchema.expect.boolean(schema.__$validated);
        }
    };

    var InstanceValidators = {
        multipleOf: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.1.2
            if (!Utils.isNumber(instance)) {
                return;
            }
            var isInteger = Utils.whatIs(instance / schema.multipleOf) === 'integer';
            report.expect(isInteger,
                'MULTIPLE_OF',
                { value: instance, multipleOf: schema.multipleOf}
            );
        },
        maximum: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.2.2
            if (!Utils.isNumber(instance)) {
                return;
            }
            if (schema.exclusiveMaximum !== true) {
                report.expect(instance <= schema.maximum,
                    'MAXIMUM',
                    { value: instance, maximum: schema.maximum}
                );
            } else {
                report.expect(instance < schema.maximum,
                    'MAXIMUM_EXCLUSIVE',
                    { value: instance, maximum: schema.maximum}
                );
            }
        },
        exclusiveMaximum: function () {
            // covered in maximum
        },
        minimum: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.1.3.2
            if (!Utils.isNumber(instance)) {
                return;
            }
            if (schema.exclusiveMinimum !== true) {
                report.expect(instance >= schema.minimum,
                    'MINIMUM',
                    { value: instance, minimum: schema.minimum}
                );
            } else {
                report.expect(instance > schema.minimum,
                    'MINIMUM_EXCLUSIVE',
                    { value: instance, minimum: schema.minimum}
                );
            }
        },
        exclusiveMinimum: function () {
            // covered in minimum
        },
        maxLength: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.1.2
            if (!Utils.isString(instance)) {
                return;
            }
            report.expect(instance.length <= schema.maxLength,
                'MAX_LENGTH',
                { length: instance.length, maximum: schema.maxLength}
            );
        },
        minLength: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.2.2
            if (!Utils.isString(instance)) {
                return;
            }
            report.expect(instance.length >= schema.minLength,
                'MIN_LENGTH',
                { length: instance.length, minimum: schema.minLength}
            );
        },
        pattern: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.2.3.2
            if (!Utils.isString(instance)) {
                return;
            }
            report.expect(Utils.getRegExp(schema.pattern).test(instance),
                'PATTERN',
                { pattern: schema.pattern});
        },
        additionalItems: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.1.2
            if (!Utils.isArray(instance)) {
                return;
            }

            // if the value of "additionalItems" is boolean value false and the value of "items" is an array,
            // the instance is valid if its size is less than, or equal to, the size of "items".
            if (schema.additionalItems === false && Utils.isArray(schema.items)) {
                report.expect(instance.length <= schema.items.length, 'ARRAY_ADDITIONAL_ITEMS');
            }
        },
        items: function () { /*report, schema, instance*/
            // covered in additionalItems
        },
        maxItems: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.2.2
            if (!Utils.isArray(instance)) {
                return;
            }
            report.expect(instance.length <= schema.maxItems, 'ARRAY_LENGTH_LONG', {length: instance.length, maximum: schema.maxItems});
        },
        minItems: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.3.2
            if (!Utils.isArray(instance)) {
                return;
            }
            report.expect(instance.length >= schema.minItems, 'ARRAY_LENGTH_SHORT', {length: instance.length, minimum: schema.minItems});
        },
        uniqueItems: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.3.4.2
            if (!Utils.isArray(instance)) {
                return;
            }
            if (schema.uniqueItems === true) {
                var matches = {};
                report.expect(Utils.isUniqueArray(instance, matches), 'ARRAY_UNIQUE', matches);
            }
        },
        maxProperties: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.1.2
            if (!Utils.isObject(instance)) {
                return;
            }
            var keysCount = Object.keys(instance).length;
            report.expect(keysCount <= schema.maxProperties, 'OBJECT_PROPERTIES_MAXIMUM', {count: keysCount, maximum: schema.maxProperties});
        },
        minProperties: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.2.2
            if (!Utils.isObject(instance)) {
                return;
            }
            var keysCount = Object.keys(instance).length;
            report.expect(keysCount >= schema.minProperties, 'OBJECT_PROPERTIES_MINIMUM', {count: keysCount, minimum: schema.minProperties});
        },
        required: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.3.2
            if (!Utils.isObject(instance)) {
                return;
            }
            schema.required.forEach(function (reqProperty) {
                report.expect(instance[reqProperty] !== undefined, 'OBJECT_REQUIRED', {property: reqProperty});
            });
        },
        additionalProperties: function (report, schema) { /*instance*/
            // covered in properties and patternProperties
            if (schema.properties === undefined && schema.patternProperties === undefined) {
                return InstanceValidators.properties.apply(this, arguments);
            }
        },
        properties: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.4.2
            if (!Utils.isObject(instance)) {
                return;
            }
            var properties = schema.properties !== undefined ? schema.properties : {};
            var patternProperties = schema.patternProperties !== undefined ? schema.patternProperties : {};
            if (schema.additionalProperties === false) {
                // The property set of the instance to validate.
                var s = Object.keys(instance);
                // The property set from "properties".
                var p = Object.keys(properties);
                // The property set from "patternProperties".
                var pp = Object.keys(patternProperties);
                // remove from "s" all elements of "p", if any;
                s = Utils.difference(s, p);
                // for each regex in "pp", remove all elements of "s" which this regex matches.
                pp.forEach(function (patternProperty) {
                    var regExp = Utils.getRegExp(patternProperty);
                    for (var i = s.length - 1; i >= 0; i--) {
                        if (regExp.test(s[i]) === true) {
                            s.splice(i, 1);
                        }
                    }
                }, this);
                // Validation of the instance succeeds if, after these two steps, set "s" is empty.
                report.expect(s.length === 0, 'OBJECT_ADDITIONAL_PROPERTIES', {properties: s});
            }
        },
        patternProperties: function (report, schema) { /*instance*/
            // covered in properties
            if (schema.properties === undefined) {
                return InstanceValidators.properties.apply(this, arguments);
            }
        },
        dependencies: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.4.5.2

            if (!Utils.isObject(instance)) {
                return;
            }

            var promiseArray = [];

            Utils.forEach(schema.dependencies, function (dependency, name) {
                if (instance[name] !== undefined) {
                    if (Utils.isObject(dependency)) {
                        // errors will be added to same report
                        promiseArray.push(this._validateObject(report, dependency, instance));
                    } else { // Array
                        Utils.forEach(dependency, function (requiredProp) {
                            report.expect(instance[requiredProp] !== undefined, 'OBJECT_DEPENDENCY_KEY', { missing: requiredProp, key: name });
                        });
                    }
                }
            }, this);

            return this.options.sync ? null : Promise.all(promiseArray);
        },
        enum: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.1.2
            var match = false;
            for (var i = 0, l = schema.enum.length; i < l; i++) {
                if (Utils.areEqual(instance, schema.enum[i])) {
                    match = true;
                    break;
                }
            }
            report.expect(match, 'ENUM_MISMATCH', {value: instance});
        },
        type: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.2.2
            var instanceType = Utils.whatIs(instance);
            if (Utils.isString(schema.type)) {
                report.expect(instanceType === schema.type || instanceType === 'integer' && schema.type === 'number',
                    'INVALID_TYPE', { expected: schema.type, type: instanceType});
            } else {
                var one = schema.type.indexOf(instanceType) !== -1;
                var two = instanceType === 'integer' && schema.type.indexOf('number') !== -1;
                report.expect(one || two, 'INVALID_TYPE', { expected: schema.type, type: instanceType});
            }
        },
        allOf: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.3.2
            if (this.options.sync) {
                var i = schema.allOf.length;
                while (i--) {
                    // _validateObject returns isValid boolean
                    if (!this._validateObject(report, schema.allOf[i], instance)) { break; }
                }
            } else {
                var self = this;
                return Promise.all(schema.allOf.map(function (sch) {
                    return self._validateObject(report, sch, instance);
                }));
            }
        },
        anyOf: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.4.2
            var subReports = [];
            if (this.options.sync) {
                var passed = false,
                    i = schema.anyOf.length;
                while (i-- && !passed) {
                    var subReport = new Report(report);
                    subReports.push(subReport);
                    passed = this._validateObject(subReport, schema.anyOf[i], instance);
                }
                report.expect(passed, 'ANY_OF_MISSING', {}, subReports);
                return;
            } else {
                var self = this,
                    passes = 0,
                    p = Promise.resolve();
                schema.anyOf.forEach(function (anyOf) {
                    p = p.then(function () {
                        if (passes > 0) { return; }
                        var subReport = new Report(report);
                        return self._validateObject(subReport, anyOf, instance)
                            .then(function () {
                                if (subReport.isValid()) {
                                    passes++;
                                } else {
                                    subReports.push(subReport);
                                }
                            });
                    });
                });
                return p.then(function () {
                    report.expect(passes >= 1, 'ANY_OF_MISSING', {}, passes === 0 ? subReports : null);
                });
            }
        },
        oneOf: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.5.2
            var passes = 0;
            var subReports = [];

            function finish() {
                report.expect(passes > 0, 'ONE_OF_MISSING', {}, passes === 0 ? subReports : null);
                report.expect(passes < 2, 'ONE_OF_MULTIPLE');
            }

            if (this.options.sync) {
                var i = schema.oneOf.length;
                while (i--) {
                    var subReport = new Report(report);
                    subReports.push(subReport);
                    if (this._validateObject(subReport, schema.oneOf[i], instance)) {
                        passes++;
                    }
                }
                return finish();
            } else {
                var self = this;
                return Promise.all(schema.oneOf.map(function (oneOf) {
                    var subReport = new Report(report);
                    return self._validateObject(subReport, oneOf, instance)
                        .then(function () {
                            if (subReport.isValid()) {
                                passes++;
                            } else {
                                subReports.push(subReport);
                            }
                        });
                })).then(finish);
            }
        },
        not: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.6.2

            var subReport = new Report(report);

            function finish() {
                report.expect(!subReport.isValid(), 'NOT_PASSED');
            }

            if (this.options.sync) {
                this._validateObject(subReport, schema.not, instance);
                finish();
            } else {
                return this._validateObject(subReport, schema.not, instance).then(finish);
            }
        },
        definitions: function () { /*report, schema, instance*/
            //http://json-schema.org/latest/json-schema-validation.html#rfc.section.5.5.7.2
            //none
        },
        format: function (report, schema, instance) {
            // http://json-schema.org/latest/json-schema-validation.html#rfc.section.7.2

            var p;

            if (typeof FormatValidators[schema.format] === 'function') { // built-in format (sync)
                report.expect(FormatValidators[schema.format](instance, this), 'FORMAT', {format: schema.format, error: instance});
                return;
            }

            // custom format was registered as sync function, so we can do some speedup
            if (CustomFormatValidators[schema.format].__$sync === true) {
                try {
                    p = CustomFormatValidators[schema.format](instance);
                    if (p !== true) {
                        report.addError('FORMAT', {format: schema.format});
                    }
                } catch (err) {
                    report.addError('FORMAT', {format: schema.format, error: err});
                }

                return;
            }

            // custom format (sync or async)
            var deferred = Promise.defer();

            try {
                p = CustomFormatValidators[schema.format](instance, deferred.callback);
                if (Promise.is(p) || Utils.isBoolean(p)) {
                    deferred.resolve(p);
                }
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise
                .then(function (valid) { // validators may return (resolve with) true/false
                    if (!valid) {
                        report.addError('FORMAT', {format: schema.format});
                    }
                })
                .catch(function (err) { // validators may throw Error or return rejected promise
                    report.addError('FORMAT', {format: schema.format, error: err});
                });
        }
    };

    module.exports = ZSchema;

}());
