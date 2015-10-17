/*!
 * Copyright 2015, PPOffice
 * Released under the MIT License
 * https://github.com/ppoffice/js-validator
 */

;(function(){
  'use strict';

  // Validator singleton
  var Validator = function () {
    this.config = {
      resumeOnFailed: false,
    };
  };
  var instance = instance ? instance : new Validator,
      rejects = [];

  var Utils = {

    // author: meizz
    // Stringify date to defined formats.
    dateFormat: function (date, fmt) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      return fmt;
    },

    extend: function (targetObj, sourceObj) {
      for(var property in sourceObj) {
        targetObj[property] = sourceObj[property];
      }
      return targetObj;
    },

    inArray: function (array, value) {
      for (var i = 0; i < array.length; i++) {
        if(array[i] === value)
          return true;
      }
      return false;
    },

    // Split string while taking predefined chars like '|', ':' and ',' into consideration
    split: function (string, separator, escape) {
      if(!string)
        return [];
      var list = string.split(escape),
          result = [];
      for (var i = 0; i < list.length; i++) {
        var childList = list[i].split(separator);
        for (var j = 0; j < childList.length; j++) {
          if(i > 0 && j === 0) {
            result[result.length - 1] += separator + childList[j];
            continue;
          }
          result.push(childList[j]);
        }
      }
      return result;
    },

    typeof: function (value) {
      var type = Object.prototype.toString.call(value),
          arr = (type = type.split(' ')) && type.length > 1 ? type[1].substr(0, type[1].length - 1) : '';
      return arr.toLowerCase();
    },

    // Trim string
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },

  };


  Validator.prototype.requires = {

    // The field under validation must be present in the input data.
    'required': function (object, field) {
      return !!object[field];
    },

    // required_if:field1,value1,...
    // The field under validation must be present if the field is equal to any value.
    // The relationship between each field is AND.
    'required_if': function () {
      if(arguments.length < 4 || arguments.length % 2 != 0)
        return false;
      var object = arguments[0],
          field  = arguments[1];
      for (var i = 2; i < arguments.length; i = i + 2) {
        var _field = arguments[i],
            _value = arguments[i + 1];
        if(!object[_field] || object[_field] != _value)
          return true;
      }
      return this.requires.required(field);
    },

    // required_with:foo,bar,...
    // The field under validation must be present only if any of the other specified fields are present.
    'required_with': function () {
      if(arguments.length < 3)
        return false;
      var object = arguments[0],
          field  = arguments[1];
      for (var i = 2; i < arguments.length; i++) {
        if(arguments[i] in object)
          return this.requires.required(field);
      }
      return true;
    },

    // required_with_all:foo,bar,...
    // The field under validation must be present only if all of the other specified fields are present.
    'required_with_all': function () {
      if(arguments.length < 3)
        return false;
      var object = arguments[0],
          field  = arguments[1];
      for (var i = 2; i < arguments.length; i++) {
        if(!(arguments[i] in object))
          return true;
      }
      return this.requires.required(field);
    },

    // required_without:foo,bar,...
    // The field under validation must be present only when any of the other specified fields are not present.
    'required_without': function () {
      if(arguments.length < 3)
        return false;
      var object = arguments[0],
          field  = arguments[1];
      for (var i = 2; i < arguments.length; i++) {
        if(!(arguments[i] in object))
          return this.requires.required(field);
      }
      return true;
    },

    // required_without_all:foo,bar,...
    // The field under validation must be present only when all of the other specified fields are not present.
    'required_without_all': function () {
      if(arguments.length < 3)
        return false;
      var object = arguments[0],
          field  = arguments[1];
      for (var i = 2; i < arguments.length; i++) {
        if(arguments[i] in object)
          return true;
      }
      return this.requires.required(field);
    },

  };

  Validator.prototype.validators = {

    // The field under validation must be yes, on, 1, or true.
    // This is useful for validating "Terms of Service" acceptance.
    'accepted': /^(yes|on|1|true)$/i,

    // after:date
    // The field under validation must be a value after a given date.
    'after': function (object, value, date) {
      var _date = Date.parse(date),
          _value = Date.parse(value);
      if(isNaN(_date) || isNaN(_value))
        return false;
      else
        return _date < _value;
    },

    // The field under validation must be entirely alphabetic characters.
    'alpha': /^[A-Za-z]+$/,

    // The field under validation may have alpha-numeric characters, as well as dashes and underscores.
    'alpha_dash': /^[0-9A-Za-z_-]+$/,

    // The field under validation must be entirely alpha-numeric characters.
    'alpha_num': /^[0-9A-Za-z]+$/,

    // The field under validation must be of type array.
    'array': function (object, value) {
      return Object.prototype.toString.apply(value) === '[object Array]';
    },

    // before:date
    // The field under validation must be a value preceding the given date.
    'before': function (object, value, date) {
      var _date = Date.parse(date),
          _value = Date.parse(value);
      if(isNaN(_date) || isNaN(_value))
        return false;
      else
        return _date > _value;
    },

    // between:min,max
    // The field under validation must have a size between the given min and max.
    // Strings, numerics and files are evaluated.
    // Files are evaluated in kilobytes.
    'between': function (object, value, min, max) {
      var res = false;
      min = Number(min);
      max = Number(max);
      switch(Utils.typeof(value)) {
        case 'string':
          res = (value.localeCompare(min) >= 0) && (value.localeCompare(max) <= 0);
          break;
        case 'number':
          res = (value >= min) && (value <= max);
          break;
        case 'filelist':
          res = !!value.length;
          for (var i in value) {
            if(!res || !value.hasOwnProperty(i) || Utils.typeof(value[i]) !== 'file')
              continue;
            var file = value[i];
            res = res && (parseInt(file.size/1024) >= min &&  parseInt(file.size/1024) <= max);
            if(!res)
              break;
          }
          break;
        case 'file':
          res = parseInt(value.size/1024) >= min &&  parseInt(value.size/1024) <= max;
          break;
        default:
          break;
      }
      return res;
    },

    // The field under validation must be able to be cast as a boolean.
    // Accepted input are true, false, 1, 0, "1", "0", '1' and '0'.
    'boolean': /^(true|false|1|0|"1"|"0"|'1'|'0')$/i,

    // The field under validation must be a valid date according to the Date.parse function.
    'date': function (object, value) {
      return !isNaN(Date.parse(value));
    },

    // date_format:format
    // The field under validation must match the format defined according to the Utils.dateFormat function.
    'date_format': function (object, value, format) {
      var date = new Date(Date.parse(value)),
          dateString = Utils.dateFormat(date, format);
      return value === dateString;
    },

    // different:field
    // The given field must be different than the field under validation.
    'different': function (object, value, field) {
      return value != object[field];
    },

    // digits:value
    // The field under validation must be numeric and must have an exact length of value.
    'digits': function (object, value, digits) {
      var pattern = new RegExp('^[0-9]{' + digits + '}$');
      return pattern.test(value);
    },

    // digits_between:min,max
    // The field under validation must have a length between the given min and max.
    'digits_between': function (object, value, min, max) {
      var pattern = new RegExp('^[0-9]{' + min + ',' + max + '}$');
      return pattern.test(value);
    },

    // The field under validation must be formatted as an e-mail address.
    'email': /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,

    // in:foo,bar,...
    // The field under validation must be included in the given list of values.
    'in': function () {
      if(arguments.length <= 2)
        return false;
      return Utils.inArray(Array.prototype.slice.call(arguments, 2), arguments[1]);
    },

    // The field under validation must have an integer value.
    'integer': function (object, value) {
      return (Utils.typeof(value) === 'number' && isFinite(value) && (value | 0) === value);
    },

    // The field under validation must be formatted as an IP address.
    'ip': function (object, value) {
      var ipv4 = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
          ipv6 = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;
      return ipv4.test(value) || ipv6.test(value);
    },

    // max:value
    // The field under validation must be less than or equal to a maximum value.
    // Strings, numerics and files are evaluated.
    // Files are evaluated in kilobytes.
    'max': function (object, value, max) {
      var res = false;
      max = Number(max);
      switch(Utils.typeof(value)) {
        case 'string':
          res = value.localeCompare(max) <= 0;
          break;
        case 'number':
          res = value <= max;
          break;
        case 'filelist':
          res = !!value.length;
          for (var i in value) {
            if(!res || !value.hasOwnProperty(i) || Utils.typeof(value[i]) !== 'file')
              continue;
            var file = value[i];
            res = res && parseInt(file.size/1024) <= max;
          }
          break;
        case 'file':
          res = parseInt(value.size/1024) <= max;
          break;
        default:
          break;
      }
      return res;
    },

    // mimes:foo,bar,...
    // The string under validation must have a MIME type corresponding to one of the listed extensions.
    'mimes': function () {
      if(arguments.length <= 2)
        return false;
      var ret,
          extension,
          value = arguments[1],
          pattern = /\.([^\.]*)?$/;
      if((ret = pattern.exec(value)) === null || ret.length < 2)
        return false;
      extension = ret[1];
      return this.validators.inArray(Array.prototype.slice.call(arguments, 2), extension);
    },

    // min:value
    // The field under validation must have a minimum value.
    // Strings, numerics and files are evaluated.
    // Files are evaluated in kilobytes.
    'min': function (object, value, min) {
      var res = false;
      min = Number(min);
      switch(Utils.typeof(value)) {
        case 'string':
          res = value.localeCompare(min) >= 0;
          break;
        case 'number':
          res = value >= min;
          break;
        case 'filelist':
          res = !!value.length;
          for (var i in value) {
            if(!res || !value.hasOwnProperty(i) || Utils.typeof(value[i]) !== 'file')
              continue;
            var file = value[i];
            res = res && parseInt(file.size/1024) >= min;
            if(!res)
              break;
          }
          break;
        case 'file':
          res = parseInt(value.size/1024) >= min;
          break;
        default:
          break;
      }
      return res;
    },

    // not_in:foo,bar,...
    // The field under validation must not be included in the given list of values.
    'not_in': function () {
      if(arguments.length <= 2)
        return false;
      return !this.validators.inArray(Array.prototype.slice.call(arguments, 2), arguments[1]);
    },

    // The field under validation must have a numeric value.
    'numeric': function (object, value) {
      return Utils.typeof(value) === 'number' && isFinite(value);
    },

    // regex:pattern
    // The field under validation must match the given regular expression.
    'regex': function (object, value, pattern) {
      var _pattern = new RegExp(pattern);
      return _pattern.test(value);
    },

    // same:field
    // The given field must match the field under validation.
    'same': function (object, value, field) {
      return value === object[field];
    },

    // size:value
    // The field under validation must have a size matching the given value.
    // For string data, value corresponds to the number of characters.
    // For numeric data, value corresponds to a given integer value.
    // For file, size corresponds to the file size in kilobytes.
    'size': function (object, value, size) {
      var res = false;
      size = Number(size);
      switch(Utils.typeof(value)) {
        case 'string':
          res = size === value.length;
          break;
        case 'number':
          res = value === size;
          break;
        case 'filelist':
          res = !!value.length;
          for (var i in value) {
            if(!res || !value.hasOwnProperty(i) || Utils.typeof(value[i]) !== 'file')
              continue;
            var file = value[i];
            res = res && parseInt(file.size/1024) === size;
          }
          break;
        case 'file':
          res = parseInt(value.size/1024) === size;
          break;
        default:
          break;
      }
      return res;
    },

    // The field under validation must be a string type.
    'string': function (object, value) {
      return Utils.typeof(value) === 'string';
    },

    // The field under validation must be formatted as an URL.
    // It does not support non-English urls.
    'url': /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+\/?)$/,

  };

  // Add a validator.
  // @fn must be a Function or an RegExp object.
  // if @fn is a Function, it must receive value as its first argument, and return true if validation succeeds.
  Validator.prototype.add = function (name, fn) {
    if(Utils.typeof(fn) === 'function' || Utils.typeof(fn) === 'regexp')
      this.validators[name] = fn;
    else
      console.error('Invalid validator function or regular expression!');
  };

  Validator.prototype.setConfig = function (config) {
    this.config = Utils.extend(this.config, config);
  };

  // Parse rule string to object array.
  var parse = function (value) {
    var fields = Utils.split(value, '|', '\\|'),
        res    = [];

    for (var i = 0; i < fields.length; i++) {
      var field = Utils.split(fields[i], ':', '\\:');
      if(!field.length)
        continue;

      var key    = field[0],
          values = [];

      if(field.length === 2)
        values = Utils.split(field[1], ',', '\\,');
      key = Utils.trim(key);
      for (var j = 0; j < values.length; j++) {
        values[j] = Utils.trim(values[j]);
      }
      res.push({key: key, value: values});
    }
    return res;
  };

  // Run single validation.
  // @param {Object} validatorGroup Requires or validators
  // @param {Object} rule Rule key-value
  // @param {String} append Field name or value to be appended to rule value
  var run = function (object, validatorGroup, rule, append) {
    // Skip if rule is not in the group
    if(!(rule.key in validatorGroup))
      return true;
    var validator = validatorGroup[rule.key];
    if(Utils.typeof(validator) === 'function') {
      rule.value.unshift(object, append);
      return validator.apply(instance, rule.value);
    } else if (validator.constructor.name === 'RegExp') {
      return validator.test(append);
    }
  };

  // Breakdown validation rules and run tests.
  var validate = function (object, _rules) {
    for(var field in _rules) {
      var ruleValue = _rules[field],
          rules;
      if(Utils.typeof(ruleValue) === 'object' && field in object) {
        if(validate.apply(this, [object[field], _rules[field]]) || this.config.resumeOnFailed)
          continue;
        else
          return false;
      } else if (Utils.typeof(ruleValue) === 'string') {
        rules = parse(ruleValue);
      }

      for (var i = 0; i < rules.length; i++) {
        var key   = rules[i].key,
            value = rules[i].value;

        if(!run(object, this.requires, rules[i], field) ||
          (field in object && !run(object, this.validators, rules[i], object[field]))) {
          rejects.push({ object: object, field: field, rule: key });
          if(!this.config.resumeOnFailed)
            return false;
        }
      }
    }
    return true;
  }

  Validator.prototype.validate = function(object, rules) {
    if(Utils.typeof(object) === 'string') {
      try {
        object = JSON.parse(object);
      } catch (e) {
        return {
          status: 'failed',
          rejects: [{object: 'Invalid JSON string!'}]
        };
      }
    }
    rejects = [];
    validate.apply(this, [object, rules]);
    return {
      status: !rejects.length ? 'success' : 'failed',
      rejects: rejects
    };
  };

  if (typeof(require) !== 'undefined' &&
      typeof(module) !== 'undefined' &&
      typeof(exports) !== 'undefined') {
    module.exports = new Validator;                    // Node.js
  } else if (typeof(define) !== 'undefined') {
    if(define.amd) {
      define(function () {
        return new Validator;                          // AMD
      });
    } else if(define.cmd) {
      define(function (require, exports, module) {
        module.exports = new Validator;                // CMD
      });
    }
  } else if (typeof(window) !== 'undefined') {
    window['Validator'] = new Validator;               // Native
  }

})();