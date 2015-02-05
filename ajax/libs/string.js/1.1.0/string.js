/*
string.js - Copyright (C) 2012, JP Richardson <jprichardson@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is furnished to 
do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

;(function() {
  "use strict";

  var VERSION = '1.1.0';

  function S(s) {
    if (s !== null && s !== undefined) {
      if (typeof s === 'string')
        this.s = s;
      else 
        this.s = s.toString();
    } else {
      this.s = s; //null or undefined
    }

    this.orig = s; //original object, currently only used by toCSV() and toBoolean()

    if (s !== null && s !== undefined) {
      if (this.__defineGetter__) {
        this.__defineGetter__('length', function() {
          return this.s.length;
        })
      } else {
        this.length = s.length;
      }
    } else {
      this.length = -1;
    }
  }

  var __nsp = String.prototype;
  var __sp = S.prototype = {
    //# modified slightly from https://github.com/epeli/underscore.string
    camelize: function() {
      var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
        return (c ? c.toUpperCase() : '');
      });
      return new S(s);
    },
    
    capitalize: function() {
      return new S(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
    },

    charAt: function(index) {
      return this.s.charAt(index);
    },

    //#thanks Google
    collapseWhitespace: function() {
      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new S(s);
    },

    contains: function(ss) {
      return this.s.indexOf(ss) >= 0;
    },

    //#modified from https://github.com/epeli/underscore.string
    dasherize: function() {
      var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
      return new S(s);
    },

    decodeHtmlEntities: function(quote_style) { //from php.js
      var symbol = "", entity = "", hash_map = {};
      var tmp_str = this.s;
      if (false === (hash_map = get_html_translation_table("HTML_ENTITIES", quote_style))) {
        return false;
      }
      delete hash_map["&"];
      hash_map["&"] = "&amp;";
      for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
      }
      tmp_str = tmp_str.split("&#039;").join("'");
      return new S(tmp_str);
    },

    endsWith: function(suffix) {
      var l  = this.s.length - suffix.length;
      return l >= 0 && this.s.indexOf(suffix, l) === l;
    },

    escapeHTML: function() { //from underscore.string
      return new S(this.s.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; }));
    },

    isAlpha: function() {
      return !/[^a-zA-Z]/.test(this.s);
    },

    isAlphaNumeric: function() {
      return !/[^a-zA-Z0-9]/.test(this.s);
    },

    isEmpty: function() {
      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },

    isLower: function() {
      return !/[^a-z]/.test(this.s);
    },

    isNumeric: function() {
      return !/[^0-9]/.test(this.s);
    },

    isUpper: function() {
      return !/[^A-Z]/.test(this.s);
    },

    left: function(N) {
      if (N >= 0) {
        var s = this.s.substr(0, N);
        return new S(s);
      } else {
        return this.right(-N);
      }
    },

    lines: function() {
      var lines = this.s.split('\n')
      for (var i = 0; i < lines.length; ++i) {
        lines[i] = lines[i].replace(/(^\s*|\s*$)/g, '');
      }
      return lines;
    },

    pad: function(len, ch) { //https://github.com/component/pad
      ch = ch || ' ';
      if (this.s.length >= len) return new S(this.s);
      len = len - this.s.length;
      var left = Array(Math.ceil(len / 2) + 1).join(ch);
      var right = Array(Math.floor(len / 2) + 1).join(ch);
      return new S(left + this.s + right);
    },

    padLeft: function(len, ch) { //https://github.com/component/pad
      ch = ch || ' ';
      if (this.s.length >= len) return new S(this.s);
      return new S(Array(len - this.s.length + 1).join(ch) + this.s);
    },

    padRight: function(len, ch) { //https://github.com/component/pad
      ch = ch || ' ';
      if (this.s.length >= len) return new S(this.s);
      return new S(this.s + Array(len - this.s.length + 1).join(ch));
    },

    parseCSV: function(delimiter, qualifier) { //try to parse no matter what
      delimiter = delimiter || ',';
      escape = '\\'
      if (typeof qualifier == 'undefined')
        qualifier = '"';

      var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, self = this;
      var ca = function(i){return self.s.charAt(i)};

      if (!qualifier)
        inField = true;

      while (i < len) {
        var current = ca(i);
        switch (current) {
          case qualifier:
            if (!inField) {
              inField = true;
            } else {
              if (ca(i-1) === escape)
                fieldBuffer.push(current);
              else
                inField = false;
            }
            break;
          case delimiter:
            if (inField && qualifier)
              fieldBuffer.push(current);
            else {
              fields.push(fieldBuffer.join(''))
              fieldBuffer.length = 0;
            }
            break;
          case escape:
            if (qualifier)
              if (ca(i+1) !== qualifier) 
                fieldBuffer.push(current);
            break;
          default:
            if (inField)
              fieldBuffer.push(current);
            break;
        }
        i += 1;
      }

      fields.push(fieldBuffer.join(''))
      return fields;
    },

    replaceAll: function(ss, r) {
      var s = this.s.replace(new RegExp(ss, 'g'), r);
      return new S(s);
    },

    right: function(N) {
      if (N >= 0) {
        var s = this.s.substr(this.s.length - N, N);
        return new S(s);
      } else {
        return this.left(-N);
      }
    },

    slugify: function() {
      var sl = (new S(this.s.replace(/[^\w\s-]/g, ''))).dasherize().s;
      if (sl.charAt(0) === '-')
        sl = sl.substr(1);
      return new S(sl);
    },

    startsWith: function(prefix) {
      return this.s.lastIndexOf(prefix, 0) === 0;
    },

    stripPunctuation: function() {
      //return new S(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      return new S(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
    },

    stripTags: function() { //from sugar.js
      var s = this.s, args = arguments.length > 0 ? arguments : [''];
      multiArgs(args, function(tag) {
        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
      });
      return new S(s);
    },

    times: function(n) {
      return new S(new Array(n + 1).join(this.s));
    },

    toBoolean: function() {
      if (typeof this.orig === 'string') {
        var s = this.s.toLowerCase();
        return s === 'true' || s === 'yes' || s === 'on';
      } else 
        return this.orig === true || this.orig === 1;
    },

    toFloat: function(precision) {
      var num = parseFloat(this.s, 10);
      if (precision)
        return parseFloat(num.toFixed(precision));
      else
        return num;
    },

    toInt: function() { //thanks Google
      // If the string starts with '0x' or '-0x', parse as hex.
      return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10);
    },

    trim: function() {
      var s;
      if (typeof String.prototype.trim === 'undefined') {
        s = this.s.replace(/(^\s*|\s*$)/g, '');
      } else {
        s = this.s.trim();
      }
      return new S(s);
    },

    trimLeft: function() {
      var s;
      if (__nsp.trimLeft)
        s = this.s.trimLeft();
      else 
        s = this.s.replace(/(^\s*)/g, '');
      return new S(s);
    },

    trimRight: function() {
      var s;
      if (__nsp.trimRight)
        s = this.s.trimRight();
      else
        s = this.s.replace(/\s+$/, '');
      return new S(s);
    },

    truncate: function(length, pruneStr) { //from underscore.string, author: github.com/rwz
      var str = this.s;

      length = ~~length;
      pruneStr = pruneStr || '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = new S(template.slice(0, template.length-1)).trimRight().s;

      return (template+pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length)+pruneStr);
    },

    toCSV: function() {
      var delim = ',', qualifier = '"', escapeChar = '\\', encloseNumbers = true, keys = false;
      var dataArray = [];

      function hasVal(it) {
        return it !== null && it !== '';
      }

      if (typeof arguments[0] === 'object') {
        delim = arguments[0].delimiter || delim;
        delim = arguments[0].separator || delim;
        qualifier = arguments[0].qualifier || qualifier;
        encloseNumbers = !!arguments[0].encloseNumbers;
        escapeChar = arguments[0].escapeChar || escapeChar;
        keys = !!arguments[0].keys;
      } else if (typeof arguments[0] === 'string') {
        delim = arguments[0];
      }

      if (typeof arguments[1] === 'string')
        qualifier = arguments[1];

      if (arguments[1] === null)
        qualifier = null;

       if (this.orig instanceof Array) 
        dataArray  = this.orig;
      else { //object
        for (var key in this.orig)
          if (this.orig.hasOwnProperty(key))
            if (keys)
              dataArray.push(key);
            else
              dataArray.push(this.orig[key]);
      }

      var rep = escapeChar + qualifier;
      var buildString = [];
      for (var i = 0; i < dataArray.length; ++i) {
        var shouldQualify = hasVal(qualifier)
        if (typeof dataArray[i] == 'number')
          shouldQualify &= encloseNumbers;
        if (shouldQualify)
          buildString.push(qualifier);
        var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
        buildString.push(d);
        if (shouldQualify)
          buildString.push(qualifier);
        if (delim)
          buildString.push(delim);
      }

      //chop last delim
      //console.log(buildString.length)
      buildString.length = buildString.length - 1;
      return new S(buildString.join(''));
    },

    toString: function() {
      return this.s;
    },

    //#modified from https://github.com/epeli/underscore.string
    underscore: function() {
      var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      if ((new S(this.s.charAt(0))).isUpper()) {
        s = '_' + s;
      }
      return new S(s);
    },

    unescapeHTML: function() { //from underscore.string
      return new S(this.s.replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      }));
    },

    valueOf: function() {
      return this.s.valueOf();
    }

  }

  var methodsAdded = [];
  function extendPrototype() {
    for (var name in __sp) {
      (function(name){
        var func = __sp[name];
        if (!__nsp.hasOwnProperty(name)) {
          methodsAdded.push(name);
          __nsp[name] = function() {
            String.prototype.s = this;
            return func.apply(this, arguments);
          }
        }
      })(name); 
    }
  }

  function restorePrototype() {
    for (var i = 0; i < methodsAdded.length; ++i)
      delete String.prototype[methodsAdded[i]];
    methodsAdded.length = 0;
  }


/*************************************
/* Attach Native JavaScript String Properties
/*************************************/

  var nativeProperties = getNativeStringProperties();
  for (var name in nativeProperties) {
    (function(name) {
      var stringProp = __nsp[name];
      if (typeof stringProp == 'function') {
        //console.log(stringProp)
        if (!__sp[name]) {
          if (nativeProperties[name] === 'string') {
            __sp[name] = function() {
              //console.log(name)
              return new S(stringProp.apply(this, arguments));
            }
          } else {
            __sp[name] = stringProp;
          }
        }
      }
    })(name);
  }


/*************************************
/* Function Aliases
/*************************************/

  __sp.repeat = __sp.times;
  __sp.include = __sp.contains;
  __sp.toInteger = __sp.toInt;
  __sp.toBool = __sp.toBoolean;


/*************************************
/* Private Functions
/*************************************/

  function getNativeStringProperties() {
    var names = getNativeStringPropertyNames();
    var retObj = {};

    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      var func = __nsp[name];
      try {
        var type = typeof func.apply('teststring', []); 
        retObj[name] = type;
      } catch (e) {}
    }
    return retObj;
  }

  function getNativeStringPropertyNames() {
    var results = []; 
    if (Object.getOwnPropertyNames) {
      results = Object.getOwnPropertyNames(__nsp);
      results.splice(results.indexOf('valueOf'), 1);
      results.splice(results.indexOf('toString'), 1);
      return results;
    } else { //meant for legacy cruft, this could probably be made more efficient
      var stringNames = {};
      var objectNames = [];
      for (var name in String.prototype)
        stringNames[name] = name;
      
      for (var name in Object.prototype)
        delete stringNames[name];

      //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
      for (var name in stringNames) {
        results.push(name);
      }
      return results;
    }
  }

  function wrap(str) {
    return new S(str);
  };


/*************************************
/* Exports
/*************************************/

  if (typeof module !== 'undefined'  && typeof module.exports !== 'undefined') {
    module.exports = wrap;
    module.exports.extendPrototype = extendPrototype;
    module.exports.restorePrototype =  restorePrototype;
    module.exports.VERSION = VERSION
  } else {
    window.S = wrap;
    window.S.extendPrototype = extendPrototype;
    window.S.restorePrototype = restorePrototype;
    window.S.VERSION = VERSION;
  }


/*************************************
/* 3rd Party Private Functions
/*************************************/

  //from sugar.js
  function multiArgs(args, fn) {
    var result = [], i;
    for(i = 0; i < args.length; i++) {
      result.push(args[i]);
      if(fn) fn.call(args, args[i], i);
    }
    return result;
  }

  //from underscore.string
  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };

  //from underscore.string
  var reversedEscapeChars = {};
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }

  //from PHP.js  
  function get_html_translation_table (table, quote_style) {
      var entities = {},
          hash_map = {},
          decimal;
      var constMappingTable = {},
          constMappingQuoteStyle = {};
      var useTable = {},
          useQuoteStyle = {};

      // Translate arguments
      constMappingTable[0] = 'HTML_SPECIALCHARS';
      constMappingTable[1] = 'HTML_ENTITIES';
      constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
      constMappingQuoteStyle[2] = 'ENT_COMPAT';
      constMappingQuoteStyle[3] = 'ENT_QUOTES';

      useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
      useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

      if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
          throw new Error("Table: " + useTable + ' not supported');
          // return false;
      }

      entities['38'] = '&amp;';
      if (useTable === 'HTML_ENTITIES') {
          entities['160'] = '&nbsp;';
          entities['161'] = '&iexcl;';
          entities['162'] = '&cent;';
          entities['163'] = '&pound;';
          entities['164'] = '&curren;';
          entities['165'] = '&yen;';
          entities['166'] = '&brvbar;';
          entities['167'] = '&sect;';
          entities['168'] = '&uml;';
          entities['169'] = '&copy;';
          entities['170'] = '&ordf;';
          entities['171'] = '&laquo;';
          entities['172'] = '&not;';
          entities['173'] = '&shy;';
          entities['174'] = '&reg;';
          entities['175'] = '&macr;';
          entities['176'] = '&deg;';
          entities['177'] = '&plusmn;';
          entities['178'] = '&sup2;';
          entities['179'] = '&sup3;';
          entities['180'] = '&acute;';
          entities['181'] = '&micro;';
          entities['182'] = '&para;';
          entities['183'] = '&middot;';
          entities['184'] = '&cedil;';
          entities['185'] = '&sup1;';
          entities['186'] = '&ordm;';
          entities['187'] = '&raquo;';
          entities['188'] = '&frac14;';
          entities['189'] = '&frac12;';
          entities['190'] = '&frac34;';
          entities['191'] = '&iquest;';
          entities['192'] = '&Agrave;';
          entities['193'] = '&Aacute;';
          entities['194'] = '&Acirc;';
          entities['195'] = '&Atilde;';
          entities['196'] = '&Auml;';
          entities['197'] = '&Aring;';
          entities['198'] = '&AElig;';
          entities['199'] = '&Ccedil;';
          entities['200'] = '&Egrave;';
          entities['201'] = '&Eacute;';
          entities['202'] = '&Ecirc;';
          entities['203'] = '&Euml;';
          entities['204'] = '&Igrave;';
          entities['205'] = '&Iacute;';
          entities['206'] = '&Icirc;';
          entities['207'] = '&Iuml;';
          entities['208'] = '&ETH;';
          entities['209'] = '&Ntilde;';
          entities['210'] = '&Ograve;';
          entities['211'] = '&Oacute;';
          entities['212'] = '&Ocirc;';
          entities['213'] = '&Otilde;';
          entities['214'] = '&Ouml;';
          entities['215'] = '&times;';
          entities['216'] = '&Oslash;';
          entities['217'] = '&Ugrave;';
          entities['218'] = '&Uacute;';
          entities['219'] = '&Ucirc;';
          entities['220'] = '&Uuml;';
          entities['221'] = '&Yacute;';
          entities['222'] = '&THORN;';
          entities['223'] = '&szlig;';
          entities['224'] = '&agrave;';
          entities['225'] = '&aacute;';
          entities['226'] = '&acirc;';
          entities['227'] = '&atilde;';
          entities['228'] = '&auml;';
          entities['229'] = '&aring;';
          entities['230'] = '&aelig;';
          entities['231'] = '&ccedil;';
          entities['232'] = '&egrave;';
          entities['233'] = '&eacute;';
          entities['234'] = '&ecirc;';
          entities['235'] = '&euml;';
          entities['236'] = '&igrave;';
          entities['237'] = '&iacute;';
          entities['238'] = '&icirc;';
          entities['239'] = '&iuml;';
          entities['240'] = '&eth;';
          entities['241'] = '&ntilde;';
          entities['242'] = '&ograve;';
          entities['243'] = '&oacute;';
          entities['244'] = '&ocirc;';
          entities['245'] = '&otilde;';
          entities['246'] = '&ouml;';
          entities['247'] = '&divide;';
          entities['248'] = '&oslash;';
          entities['249'] = '&ugrave;';
          entities['250'] = '&uacute;';
          entities['251'] = '&ucirc;';
          entities['252'] = '&uuml;';
          entities['253'] = '&yacute;';
          entities['254'] = '&thorn;';
          entities['255'] = '&yuml;';
      }

      if (useQuoteStyle !== 'ENT_NOQUOTES') {
          entities['34'] = '&quot;';
      }
      if (useQuoteStyle === 'ENT_QUOTES') {
          entities['39'] = '&#39;';
      }
      entities['60'] = '&lt;';
      entities['62'] = '&gt;';


      // ascii decimals to real symbols
      for (decimal in entities) {
          if (entities.hasOwnProperty(decimal)) {
              hash_map[String.fromCharCode(decimal)] = entities[decimal];
          }
      }

      return hash_map;

  };


}).call(this);
