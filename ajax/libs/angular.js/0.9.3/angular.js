/**
 * The MIT License
 *
 * Copyright (c) 2010 Adam Abrons and Misko Hevery http://getangular.com
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
 */
(function(window, document, previousOnLoad){
////////////////////////////////////

if (typeof document.getAttribute == $undefined)
  document.getAttribute = function() {};

/**
 * @ngdoc
 * @name angular.lowercase
 * @function
 *
 * @description Converts string to lowercase
 * @param {string} value
 * @returns {string} Lowercased string.
 */
var lowercase = function (value){ return isString(value) ? value.toLowerCase() : value; };


/**
 * @ngdoc
 * @name angular.uppercase
 * @function
 *
 * @description Converts string to uppercase.
 * @param {string} value
 * @returns {string} Uppercased string.
 */
var uppercase = function (value){ return isString(value) ? value.toUpperCase() : value; };


var manualLowercase = function (s) {
  return isString(s) ? s.replace(/[A-Z]/g,
      function (ch) {return fromCharCode(ch.charCodeAt(0) | 32); }) : s;
};
var manualUppercase = function (s) {
  return isString(s) ? s.replace(/[a-z]/g,
      function (ch) {return fromCharCode(ch.charCodeAt(0) & ~32); }) : s;
};


// String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
// locale, for this reason we need to detect this case and redefine lowercase/uppercase methods with
// correct but slower alternatives.
if ('i' !== 'I'.toLowerCase()) {
  lowercase = manualLowercase;
  uppercase = manualUppercase;
}

function fromCharCode(code) { return String.fromCharCode(code); }


var _undefined        = undefined,
    _null             = null,
    $$element         = '$element',
    $angular          = 'angular',
    $array            = 'array',
    $boolean          = 'boolean',
    $console          = 'console',
    $date             = 'date',
    $display          = 'display',
    $element          = 'element',
    $function         = 'function',
    $length           = 'length',
    $name             = 'name',
    $none             = 'none',
    $noop             = 'noop',
    $null             = 'null',
    $number           = 'number',
    $object           = 'object',
    $string           = 'string',
    $undefined        = 'undefined',
    NG_EXCEPTION      = 'ng-exception',
    NG_VALIDATION_ERROR = 'ng-validation-error',
    NOOP              = 'noop',
    PRIORITY_FIRST    = -99999,
    PRIORITY_WATCH    = -1000,
    PRIORITY_LAST     =  99999,
    PRIORITY          = {'FIRST': PRIORITY_FIRST, 'LAST': PRIORITY_LAST, 'WATCH':PRIORITY_WATCH},
    jQuery            = window['jQuery'] || window['$'], // weirdness to make IE happy
    _                 = window['_'],
    /** holds major version number for IE or NaN for real browsers */
    msie              = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10),
    jqLite            = jQuery || jqLiteWrap,
    slice             = Array.prototype.slice,
    push              = Array.prototype.push,
    error             = window[$console] ? bind(window[$console], window[$console]['error'] || noop) : noop,

    /**
     * @name angular
     * @namespace The exported angular namespace.
     */
    angular           = window[$angular]    || (window[$angular] = {}),
    angularTextMarkup = extensionMap(angular, 'markup'),
    angularAttrMarkup = extensionMap(angular, 'attrMarkup'),
    angularDirective  = extensionMap(angular, 'directive'),

    /**
     * @ngdoc overview
     * @name angular.widget
     * @namespace Namespace for all widgets.
     * @description
     * # Overview
     * Widgets allow you to create DOM elements that the browser doesn't 
     * already understand. You create the widget in your namespace and 
     * assign it behavior. You can only bind one widget per DOM element 
     * (unlike directives, in which you can use any number per DOM 
     * element). Widgets are expected to manipulate the DOM tree by 
     * adding new elements whereas directives are expected to only modify
     * element properties.
     * 
     * Widgets come in two flavors: element and attribute.
     * 
     * # Element Widget
     * Let's say we would like to create a new element type in the 
     * namespace `my` that can watch an expression and alert() the user 
     * with each new value.
     * 
     * <pre>
     * &lt;my:watch exp="name"/&gt;
     * </pre>
     * 
     * You can implement `my:watch` like this:
     * <pre>
     * angular.widget('my:watch', function(compileElement) {
     *   var compiler = this;
     *   var exp = compileElement.attr('exp');
     *   return function(linkElement) {
     *     var currentScope = this;
     *     currentScope.$watch(exp, function(value){
     *       alert(value);
     *     }};
     *   };
     * });
     * </pre>
     * 
     * # Attribute Widget
     * Let's implement the same widget, but this time as an attribute 
     * that can be added to any existing DOM element.
     * <pre>
     * &lt;div my-watch="name"&gt;text&lt;/div&gt;
     * </pre>
     * You can implement `my:watch` attribute like this:
     * <pre>
     * angular.widget('@my:watch', function(expression, compileElement) {
     *   var compiler = this;
     *   return function(linkElement) {
     *     var currentScope = this;
     *     currentScope.$watch(expression, function(value){
     *       alert(value);
     *     });
     *   };
     * });
     * </pre>
     * 
     * @example
     * <script>
     *   angular.widget('my:time', function(compileElement){
     *     compileElement.css('display', 'block');
     *     return function(linkElement){
     *       function update(){
     *         linkElement.text('Current time is: ' + new Date());
     *         setTimeout(update, 1000);
     *       }
     *       update();
     *     };
     *   });
     * </script>
     * <my:time></my:time>
     */
    angularWidget     = extensionMap(angular, 'widget', lowercase),
    
    /**
     * @ngdoc overview
     * @name angular.validator
     * @namespace Namespace for all filters.
     * @description
     * # Overview
     * Validators are a standard way to check the user input against a specific criteria. For 
     * example, you might need to check that an input field contains a well-formed phone number.
     * 
     * # Syntax
     * Attach a validator on user input widgets using the `ng:validate` attribute.
     * 
     * <doc:example>
     *   <doc:source>
     *     Change me: &lt;input type="text" name="number" ng:validate="integer" value="123"&gt;
     *   </doc:source>
     *   <doc:scenario>
     *     it('should validate the default number string', function() {
     *       expect(element('input[name=number]').attr('class')).
     *          not().toMatch(/ng-validation-error/);
     *     });
     *     it('should not validate "foo"', function() {
     *       input('number').enter('foo');
     *       expect(element('input[name=number]').attr('class')).
     *          toMatch(/ng-validation-error/);
     *     });
     *   </doc:scenario>
     * </doc:example>
     * 
     *
     * # Writing your own Validators
     * Writing your own validator is easy. To make a function available as a 
     * validator, just define the JavaScript function on the `angular.validator` 
     * object. <angular/> passes in the input to validate as the first argument 
     * to your function. Any additional validator arguments are passed in as 
     * additional arguments to your function.
     * 
     * You can use these variables in the function:
     *
     * * `this` — The current scope.
     * * `this.$element` — The DOM element containing the binding. This allows the filter to manipulate
     *   the DOM in addition to transforming the input.
     *   
     * In this example we have written a upsTrackingNo validator. 
     * It marks the input text "valid" only when the user enters a well-formed 
     * UPS tracking number.
     *
     * @css ng-validation-error
     *   When validation fails, this css class is applied to the binding, making its borders red by
     *   default.
     * 
     * @example
     * <script>
     *  angular.validator('upsTrackingNo', function(input, format) {
     *    var regexp = new RegExp("^" + format.replace(/9/g, '\\d') + "$");
     *    return input.match(regexp)?"":"The format must match " + format;
     *  });
     * </script>
     * <input type="text" name="trackNo" size="40"
     *       ng:validate="upsTrackingNo:'1Z 999 999 99 9999 999 9'" 
     *       value="1Z 123 456 78 9012 345 6"/>
     *
     * @scenario
     * it('should validate correct UPS tracking number', function() {
     *   expect(element('input[name=trackNo]').attr('class')).
     *      not().toMatch(/ng-validation-error/);
     * });
     *
     * it('should not validate in correct UPS tracking number', function() {
     *   input('trackNo').enter('foo');
     *   expect(element('input[name=trackNo]').attr('class')).
     *      toMatch(/ng-validation-error/);
     * });
     *
     */
    angularValidator  = extensionMap(angular, 'validator'),


    /**
     * @ngdoc overview
     * @name angular.filter
     * @namespace Namespace for all filters.
     * @description
     * # Overview
     * Filters are a standard way to format your data for display to the user. For example, you
     * might have the number 1234.5678 and would like to display it as US currency: $1,234.57.
     * Filters allow you to do just that. In addition to transforming the data, filters also modify
     * the DOM. This allows the filters to for example apply css styles to the filtered output if
     * certain conditions were met.
     *
     *
     * # Standard Filters
     *
     * The Angular framework provides a standard set of filters for common operations, including:
     * {@link angular.filter.currency}, {@link angular.filter.json}, {@link angular.filter.number},
     * and {@link angular.filter.html}. You can also add your own filters.
     *
     *
     * # Syntax
     *
     * Filters can be part of any {@link angular.scope} evaluation but are typically used with
     * {{bindings}}. Filters typically transform the data to a new data type, formating the data in
     * the process. Filters can be chained and take optional arguments. Here are few examples:
     *
     * * No filter: {{1234.5678}} => 1234.5678
     * * Number filter: {{1234.5678|number}} => 1,234.57. Notice the “,” and rounding to two
     *   significant digits.
     * * Filter with arguments: {{1234.5678|number:5}} => 1,234.56780. Filters can take optional
     *   arguments, separated by colons in a binding. To number, the argument “5” requests 5 digits
     *   to the right of the decimal point.
     *
     *
     * # Writing your own Filters
     *
     * Writing your own filter is very easy: just define a JavaScript function on `angular.filter`.
     * The framework passes in the input value as the first argument to your function. Any filter
     * arguments are passed in as additional function arguments.
     *
     * You can use these variables in the function:
     *
     * * `this` — The current scope.
     * * `this.$element` — The DOM element containing the binding. This allows the filter to manipulate
     *   the DOM in addition to transforming the input.
     *
     *
     * @exampleDescription
     *  The following example filter reverses a text string. In addition, it conditionally makes the
     *  text upper-case (to demonstrate optional arguments) and assigns color (to demonstrate DOM
     *  modification).
     *
     * @example
         <script type="text/javascript">
           angular.filter('reverse', function(input, uppercase, color) {
             var out = "";
             for (var i = 0; i < input.length; i++) {
               out = input.charAt(i) + out;
             }
             if (uppercase) {
               out = out.toUpperCase();
             }
             if (color) {
               this.$element.css('color', color);
             }
             return out;
           });
         </script>

         <input name="text" type="text" value="hello" /><br>
         No filter: {{text}}<br>
         Reverse: {{text|reverse}}<br>
         Reverse + uppercase: {{text|reverse:true}}<br>
         Reverse + uppercase + blue:  {{text|reverse:true:"blue"}}

     */
    angularFilter     = extensionMap(angular, 'filter'),
    /**
     * @ngdoc overview
     * @name angular.formatter
     * @namespace Namespace for all formats.
     * @description
     * # Overview
     * The formatters are responsible for translating user readable text in an input widget to a
     * data model stored in an application.
     * 
     * # Writting your own Fromatter
     * Writing your own formatter is easy. Just register a pair of JavaScript functions with 
     * `angular.formatter`. One function for parsing user input text to the stored form, 
     * and one for formatting the stored data to user-visible text.
     * 
     * Here is an example of a "reverse" formatter: The data is stored in uppercase and in 
     * reverse, while it is displayed in lower case and non-reversed. User edits are 
     * automatically parsed into the internal form and data changes are automatically 
     * formatted to the viewed form.
     * 
     * <pre>
     * function reverse(text) {
     *   var reversed = [];
     *   for (var i = 0; i < text.length; i++) {
     *     reversed.unshift(text.charAt(i));
     *   }
     *   return reversed.join('');
     * }
     * 
     * angular.formatter('reverse', {
     *   parse: function(value){
     *     return reverse(value||'').toUpperCase();
     *   },
     *   format: function(value){
     *     return reverse(value||'').toLowerCase();
     *   }
     * });
     * </pre>
     * 
     * @example
     * <script type="text/javascript">
     * function reverse(text) {
     *   var reversed = [];
     *   for (var i = 0; i < text.length; i++) {
     *     reversed.unshift(text.charAt(i));
     *   }
     *   return reversed.join('');
     * }
     * 
     * angular.formatter('reverse', {
     *   parse: function(value){
     *     return reverse(value||'').toUpperCase();
     *   },
     *   format: function(value){
     *     return reverse(value||'').toLowerCase();
     *   }
     * });
     * </script>
     *
     * Formatted: 
     * <input type="text" name="data" value="angular" ng:format="reverse"/>
     * <br/>
     * 
     * Stored: 
     * <input type="text" name="data"/><br/>
     * <pre>{{data}}</pre>
     *
     * 
     * @scenario
     * it('should store reverse', function(){
     *  expect(element('.doc-example input:first').val()).toEqual('angular');
     *  expect(element('.doc-example input:last').val()).toEqual('RALUGNA');
     *  
     *  this.addFutureAction('change to XYZ', function($window, $document, done){
     *    $document.elements('.doc-example input:last').val('XYZ').trigger('change');
     *    done();
     *  });
     *  expect(element('input:first').val()).toEqual('zyx');
     * });
     */
    angularFormatter  = extensionMap(angular, 'formatter'),
    angularService    = extensionMap(angular, 'service'),
    angularCallbacks  = extensionMap(angular, 'callbacks'),
    nodeName,
    rngScript         = /^(|.*\/)angular(-.*?)?(\.min)?.js(\?[^#]*)?(#(.*))?$/;

function foreach(obj, iterator, context) {
  var key;
  if (obj) {
    if (isFunction(obj)){
      for (key in obj) {
        if (key != 'prototype' && key != $length && key != $name && obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key);
        }
      }
    } else if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (isObject(obj) && isNumber(obj.length)) {
      for (key = 0; key < obj.length; key++)
        iterator.call(context, obj[key], key);
    } else {
      for (key in obj)
        iterator.call(context, obj[key], key);
    }
  }
  return obj;
}

function foreachSorted(obj, iterator, context) {
  var keys = [];
  for (var key in obj) keys.push(key);
  keys.sort();
  for ( var i = 0; i < keys.length; i++) {
    iterator.call(context, obj[keys[i]], keys[i]);
  }
  return keys;
}


function extend(dst) {
  foreach(arguments, function(obj){
    if (obj !== dst) {
      foreach(obj, function(value, key){
        dst[key] = value;
      });
    }
  });
  return dst;
}

function inherit(parent, extra) {
  return extend(new (extend(function(){}, {prototype:parent}))(), extra);
}

function noop() {}
function identity($) {return $;}
function valueFn(value) {return function(){ return value; };}

function extensionMap(angular, name, transform) {
  var extPoint;
  return angular[name] || (extPoint = angular[name] = function (name, fn, prop){
    name = (transform || identity)(name);
    if (isDefined(fn)) {
      if (isDefined(extPoint[name])) {
        foreach(extPoint[name], function(property, key) {
          if (key.charAt(0) == '$' && isUndefined(fn[key]))
            fn[key] = property;
        });
      }
      extPoint[name] = extend(fn, prop || {});
    }
    return extPoint[name];
  });
}

function jqLiteWrap(element) {
  // for some reasons the parentNode of an orphan looks like _null but its typeof is object.
  if (element) {
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = element;
      element = new JQLite(div.childNodes);
    } else if (!(element instanceof JQLite) && isElement(element)) {
      element =  new JQLite(element);
    }
  }
  return element;
}
function isUndefined(value){ return typeof value == $undefined; }
function isDefined(value){ return typeof value != $undefined; }
function isObject(value){ return value!=_null && typeof value == $object;}
function isString(value){ return typeof value == $string;}
function isNumber(value){ return typeof value == $number;}
function isDate(value){ return value instanceof Date; }
function isArray(value) { return value instanceof Array; }
function isFunction(value){ return typeof value == $function;}
function isBoolean(value) { return typeof value == $boolean;}
function isTextNode(node) { return nodeName(node) == '#text'; }
function trim(value) { return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value; }
function isElement(node) {
  return node && (node.nodeName || node instanceof JQLite || (jQuery && node instanceof jQuery));
}

/**
 * HTML class which is the only class which can be used in ng:bind to inline HTML for security reasons.
 * @constructor
 * @param html raw (unsafe) html
 * @param {string=} option if set to 'usafe' then get method will return raw (unsafe/unsanitized) html
 */
function HTML(html, option) {
  this.html = html;
  this.get = lowercase(option) == 'unsafe' ?
    valueFn(html) :
    function htmlSanitize() {
      var buf = [];
      htmlParser(html, htmlSanitizeWriter(buf));
      return buf.join('');
    };
}

if (msie) {
  nodeName = function(element) {
    element = element.nodeName ? element : element[0];
    return (element.scopeName && element.scopeName != 'HTML' ) ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
  };
} else {
  nodeName = function(element) {
    return element.nodeName ? element.nodeName : element[0].nodeName;
  };
}

function quickClone(element) {
  return jqLite(element[0].cloneNode(true));
}

function isVisible(element) {
  var rect = element[0].getBoundingClientRect(),
      width = (rect.width || (rect.right||0 - rect.left||0)),
      height = (rect.height || (rect.bottom||0 - rect.top||0));
  return width>0 && height>0;
}

function map(obj, iterator, context) {
  var results = [];
  foreach(obj, function(value, index, list) {
    results.push(iterator.call(context, value, index, list));
  });
  return results;
}
function size(obj) {
  var size = 0;
  if (obj) {
    if (isNumber(obj.length)) {
      return obj.length;
    } else if (isObject(obj)){
      for (key in obj)
        size++;
    }
  }
  return size;
}
function includes(array, obj) {
  for ( var i = 0; i < array.length; i++) {
    if (obj === array[i]) return true;
  }
  return false;
}

function indexOf(array, obj) {
  for ( var i = 0; i < array.length; i++) {
    if (obj === array[i]) return i;
  }
  return -1;
}

function isLeafNode (node) {
  if (node) {
    switch (node.nodeName) {
    case "OPTION":
    case "PRE":
    case "TITLE":
      return true;
    }
  }
  return false;
}

/**
 * Copies stuff.
 *
 * If destination is not provided and source is an object or an array, a copy is created & returned,
 * otherwise the source is returned.
 *
 * If destination is provided, all of its properties will be deleted and if source is an object or
 * an array, all of its members will be copied into the destination object. Finally the destination
 * is returned just for kicks.
 *
 * @param {*} source The source to be used during copy.
 *                   Can be any type including primitives, null and undefined.
 * @param {(Object|Array)=} destination Optional destination into which the source is copied
 * @returns {*}
 */
function copy(source, destination){
  if (!destination) {
    destination = source;
    if (source) {
      if (isArray(source)) {
        destination = copy(source, []);
      } else if (isDate(source)) {
        destination = new Date(source.getTime());
      } else if (isObject(source)) {
        destination = copy(source, {});
      }
    }
  } else {
    if (isArray(source)) {
      while(destination.length) {
        destination.pop();
      }
      for ( var i = 0; i < source.length; i++) {
        destination.push(copy(source[i]));
      }
    } else {
      foreach(destination, function(value, key){
        delete destination[key];
      });
      for ( var key in source) {
        destination[key] = copy(source[key]);
      }
    }
  }
  return destination;
}

function equals(o1, o2) {
  if (o1 == o2) return true;
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 == t2 && t1 == 'object') {
    if (o1 instanceof Array) {
      if ((length = o1.length) == o2.length) {
        for(key=0; key<length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else {
      keySet = {};
      for(key in o1) {
        if (key.charAt(0) !== '$' && !isFunction(o1[key]) && !equals(o1[key], o2[key])) return false;
        keySet[key] = true;
      }
      for(key in o2) {
        if (!keySet[key] && key.charAt(0) !== '$' && !isFunction(o2[key])) return false;
      }
      return true;
    }
  }
  return false;
}

function setHtml(node, html) {
  if (isLeafNode(node)) {
    if (msie) {
      node.innerText = html;
    } else {
      node.textContent = html;
    }
  } else {
    node.innerHTML = html;
  }
}

function isRenderableElement(element) {
  var name = element && element[0] && element[0].nodeName;
  return name && name.charAt(0) != '#' &&
    !includes(['TR', 'COL', 'COLGROUP', 'TBODY', 'THEAD', 'TFOOT'], name);
}
function elementError(element, type, error) {
  while (!isRenderableElement(element)) {
    element = element.parent() || jqLite(document.body);
  }
  if (element[0]['$NG_ERROR'] !== error) {
    element[0]['$NG_ERROR'] = error;
    if (error) {
      element.addClass(type);
      element.attr(type, error);
    } else {
      element.removeClass(type);
      element.removeAttr(type);
    }
  }
}

function concat(array1, array2, index) {
  return array1.concat(slice.call(array2, index, array2.length));
}

function bind(self, fn) {
  var curryArgs = arguments.length > 2 ? slice.call(arguments, 2, arguments.length) : [];
  if (typeof fn == $function) {
    return curryArgs.length ? function() {
      return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0, arguments.length))) : fn.apply(self, curryArgs);
    }: function() {
      return arguments.length ? fn.apply(self, arguments) : fn.call(self);
    };
  } else {
    // in IE, native methods ore not functions and so they can not be bound (but they don't need to be)
    return fn;
  }
}

function toBoolean(value) {
  if (value && value.length !== 0) {
    var v = lowercase("" + value);
    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
  } else {
    value = false;
  }
  return value;
}

function merge(src, dst) {
  for ( var key in src) {
    var value = dst[key];
    var type = typeof value;
    if (type == $undefined) {
      dst[key] = fromJson(toJson(src[key]));
    } else if (type == 'object' && value.constructor != array &&
        key.substring(0, 1) != "$") {
      merge(src[key], value);
    }
  }
}

function compile(element, existingScope) {
  var compiler = new Compiler(angularTextMarkup, angularAttrMarkup, angularDirective, angularWidget),
      $element = jqLite(element);
  return compiler.compile($element)($element, existingScope);
}
/////////////////////////////////////////////////

/**
 * Parses an escaped url query string into key-value pairs.
 * @returns Object.<(string|boolean)>
 */
function parseKeyValue(/**string*/keyValue) {
  var obj = {}, key_value, key;
  foreach((keyValue || "").split('&'), function(keyValue){
    if (keyValue) {
      key_value = keyValue.split('=');
      key = unescape(key_value[0]);
      obj[key] = isDefined(key_value[1]) ? unescape(key_value[1]) : true;
    }
  });
  return obj;
}

function toKeyValue(obj) {
  var parts = [];
  foreach(obj, function(value, key) {
    parts.push(escape(key) + (value === true ? '' : '=' + escape(value)));
  });
  return parts.length ? parts.join('&') : '';
}

function angularInit(config){
  if (config.autobind) {
    // TODO default to the source of angular.js
    var scope = compile(window.document, _null, {'$config':config}),
        $browser = scope.$inject('$browser');

    if (config.css)
      $browser.addCss(config.base_url + config.css);
    else if(msie<8)
      $browser.addJs(config.base_url + config.ie_compat, config.ie_compat_id);

    scope.$init();
  }
}

function angularJsConfig(document, config) {
  var scripts = document.getElementsByTagName("script"),
      match;
  config = extend({
    ie_compat_id: 'ng-ie-compat'
  }, config);
  for(var j = 0; j < scripts.length; j++) {
    match = (scripts[j].src || "").match(rngScript);
    if (match) {
      config.base_url = match[1];
      config.ie_compat = match[1] + 'angular-ie-compat' + (match[2] || '') + '.js';
      extend(config, parseKeyValue(match[6]));
      eachAttribute(jqLite(scripts[j]), function(value, name){
        if (/^ng:/.exec(name)) {
          name = name.substring(3).replace(/-/g, '_');
          if (name == 'autobind') value = true;
          config[name] = value;
        }
      });
    }
  }
  return config;
}
var array = [].constructor;

function toJson(obj, pretty) {
  var buf = [];
  toJsonArray(buf, obj, pretty ? "\n  " : _null, []);
  return buf.join('');
}

function fromJson(json) {
  if (!json) return json;
  try {
    var p = parser(json, true);
    var expression =  p.primary();
    p.assertAllConsumed();
    return expression();
  } catch (e) {
    error("fromJson error: ", json, e);
    throw e;
  }
}

angular['toJson'] = toJson;
angular['fromJson'] = fromJson;

function toJsonArray(buf, obj, pretty, stack) {
  if (isObject(obj)) {
    if (obj === window) {
      buf.push('WINDOW');
      return;
    }

    if (obj === document) {
      buf.push('DOCUMENT');
      return;
    }

    if (includes(stack, obj)) {
      buf.push('RECURSION');
      return;
    }
    stack.push(obj);
  }
  if (obj === _null) {
    buf.push($null);
  } else if (obj instanceof RegExp) {
    buf.push(angular['String']['quoteUnicode'](obj.toString()));
  } else if (isFunction(obj)) {
    return;
  } else if (isBoolean(obj)) {
    buf.push('' + obj);
  } else if (isNumber(obj)) {
    if (isNaN(obj)) {
      buf.push($null);
    } else {
      buf.push('' + obj);
    }
  } else if (isString(obj)) {
    return buf.push(angular['String']['quoteUnicode'](obj));
  } else if (isObject(obj)) {
    if (isArray(obj)) {
      buf.push("[");
      var len = obj.length;
      var sep = false;
      for(var i=0; i<len; i++) {
        var item = obj[i];
        if (sep) buf.push(",");
        if (!(item instanceof RegExp) && (isFunction(item) || isUndefined(item))) {
          buf.push($null);
        } else {
          toJsonArray(buf, item, pretty, stack);
        }
        sep = true;
      }
      buf.push("]");
    } else if (isDate(obj)) {
      buf.push(angular['String']['quoteUnicode'](angular['Date']['toString'](obj)));
    } else {
      buf.push("{");
      if (pretty) buf.push(pretty);
      var comma = false;
      var childPretty = pretty ? pretty + "  " : false;
      var keys = [];
      for(var k in obj) {
        if (obj[k] === _undefined)
          continue;
        keys.push(k);
      }
      keys.sort();
      for ( var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        var key = keys[keyIndex];
        var value = obj[key];
        if (typeof value != $function) {
          if (comma) {
            buf.push(",");
            if (pretty) buf.push(pretty);
          }
          buf.push(angular['String']['quote'](key));
          buf.push(":");
          toJsonArray(buf, value, childPretty, stack);
          comma = true;
        }
      }
      buf.push("}");
    }
  }
  if (isObject(obj)) {
    stack.pop();
  }
}
/**
 * Template provides directions an how to bind to a given element.
 * It contains a list of init functions which need to be called to
 * bind to a new instance of elements. It also provides a list
 * of child paths which contain child templates
 */
function Template(priority) {
  this.paths = [];
  this.children = [];
  this.inits = [];
  this.priority = priority;
  this.newScope = false;
}

Template.prototype = {
  init: function(element, scope) {
    var inits = {};
    this.collectInits(element, inits, scope);
    foreachSorted(inits, function(queue){
      foreach(queue, function(fn) {fn();});
    });
  },

  collectInits: function(element, inits, scope) {
    var queue = inits[this.priority], childScope = scope;
    if (!queue) {
      inits[this.priority] = queue = [];
    }
    element = jqLite(element);
    if (this.newScope) {
      childScope = createScope(scope);
      scope.$onEval(childScope.$eval);
    }
    foreach(this.inits, function(fn) {
      queue.push(function() {
        childScope.$tryEval(function(){
          return childScope.$inject(fn, childScope, element);
        }, element);
      });
    });
    var i,
        childNodes = element[0].childNodes,
        children = this.children,
        paths = this.paths,
        length = paths.length;
    for (i = 0; i < length; i++) {
      children[i].collectInits(childNodes[paths[i]], inits, childScope);
    }
  },


  addInit:function(init) {
    if (init) {
      this.inits.push(init);
    }
  },


  addChild: function(index, template) {
    if (template) {
      this.paths.push(index);
      this.children.push(template);
    }
  },

  empty: function() {
    return this.inits.length === 0 && this.paths.length === 0;
  }
};

///////////////////////////////////
//Compiler
//////////////////////////////////
function Compiler(markup, attrMarkup, directives, widgets){
  this.markup = markup;
  this.attrMarkup = attrMarkup;
  this.directives = directives;
  this.widgets = widgets;
}

Compiler.prototype = {
  compile: function(rawElement) {
    rawElement = jqLite(rawElement);
    var index = 0,
        template,
        parent = rawElement.parent();
    if (parent && parent[0]) {
      parent = parent[0];
      for(var i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i] == rawElement[0]) {
          index = i;
        }
      }
    }
    template = this.templatize(rawElement, index, 0) || new Template();
    return function(element, parentScope){
      element = jqLite(element);
      var scope = parentScope && parentScope.$eval ?
          parentScope : createScope(parentScope);
      return extend(scope, {
        $element:element,
        $init: function() {
          template.init(element, scope);
          scope.$eval();
          delete scope.$init;
          return scope;
        }
      });
    };
  },

  templatize: function(element, elementIndex, priority){
    var self = this,
        widget,
        fn,
        directiveFns = self.directives,
        descend = true,
        directives = true,
        elementName = nodeName(element),
        template,
        selfApi = {
          compile: bind(self, self.compile),
          comment:function(text) {return jqLite(document.createComment(text));},
          element:function(type) {return jqLite(document.createElement(type));},
          text:function(text) {return jqLite(document.createTextNode(text));},
          descend: function(value){ if(isDefined(value)) descend = value; return descend;},
          directives: function(value){ if(isDefined(value)) directives = value; return directives;},
          scope: function(value){ if(isDefined(value)) template.newScope = template.newScope || value; return template.newScope;}
        };
    try {
      priority = element.attr('ng:eval-order') || priority || 0;
    } catch (e) {
      // for some reason IE throws error under some weird circumstances. so just assume nothing
      priority = priority || 0;
    }
    if (isString(priority)) {
      priority = PRIORITY[uppercase(priority)] || parseInt(priority, 10);
    }
    template = new Template(priority);
    eachAttribute(element, function(value, name){
      if (!widget) {
        if (widget = self.widgets('@' + name)) {
          element.addClass('ng-attr-widget');
          widget = bind(selfApi, widget, value, element);
        }
      }
    });
    if (!widget) {
      if (widget = self.widgets(elementName)) {
        if (elementName.indexOf(':') > 0)
          element.addClass('ng-widget');
        widget = bind(selfApi, widget, element);
      }
    }
    if (widget) {
      descend = false;
      directives = false;
      var parent = element.parent();
      template.addInit(widget.call(selfApi, element));
      if (parent && parent[0]) {
        element = jqLite(parent[0].childNodes[elementIndex]);
      }
    }
    if (descend){
      // process markup for text nodes only
      for(var i=0, child=element[0].childNodes;
          i<child.length; i++) {
        if (isTextNode(child[i])) {
          foreach(self.markup, function(markup){
            if (i<child.length) {
              var textNode = jqLite(child[i]);
              markup.call(selfApi, textNode.text(), textNode, element);
            }
          });
        }
      }
    }

    if (directives) {
      // Process attributes/directives
      eachAttribute(element, function(value, name){
        foreach(self.attrMarkup, function(markup){
          markup.call(selfApi, value, name, element);
        });
      });
      eachAttribute(element, function(value, name){
        fn = directiveFns[name];
        if (fn) {
          element.addClass('ng-directive');
          template.addInit((directiveFns[name]).call(selfApi, value, element));
        }
      });
    }
    // Process non text child nodes
    if (descend) {
      eachNode(element, function(child, i){
        template.addChild(i, self.templatize(child, i, priority));
      });
    }
    return template.empty() ? _null : template;
  }
};

function eachNode(element, fn){
  var i, chldNodes = element[0].childNodes || [], chld;
  for (i = 0; i < chldNodes.length; i++) {
    if(!isTextNode(chld = chldNodes[i])) {
      fn(jqLite(chld), i);
    }
  }
}

function eachAttribute(element, fn){
  var i, attrs = element[0].attributes || [], chld, attr, name, value, attrValue = {};
  for (i = 0; i < attrs.length; i++) {
    attr = attrs[i];
    name = attr.name;
    value = attr.value;
    if (msie && name == 'href') {
      value = decodeURIComponent(element[0].getAttribute(name, 2));
    }
    attrValue[name] = value;
  }
  foreachSorted(attrValue, fn);
}

function getter(instance, path, unboundFn) {
  if (!path) return instance;
  var element = path.split('.');
  var key;
  var lastInstance = instance;
  var len = element.length;
  for ( var i = 0; i < len; i++) {
    key = element[i];
    if (!key.match(/^[\$\w][\$\w\d]*$/))
        throw "Expression '" + path + "' is not a valid expression for accesing variables.";
    if (instance) {
      lastInstance = instance;
      instance = instance[key];
    }
    if (isUndefined(instance)  && key.charAt(0) == '$') {
      var type = angular['Global']['typeOf'](lastInstance);
      type = angular[type.charAt(0).toUpperCase()+type.substring(1)];
      var fn = type ? type[[key.substring(1)]] : _undefined;
      if (fn) {
        instance = bind(lastInstance, fn, lastInstance);
        return instance;
      }
    }
  }
  if (!unboundFn && isFunction(instance)) {
    return bind(lastInstance, instance);
  }
  return instance;
}

function setter(instance, path, value){
  var element = path.split('.');
  for ( var i = 0; element.length > 1; i++) {
    var key = element.shift();
    var newInstance = instance[key];
    if (!newInstance) {
      newInstance = {};
      instance[key] = newInstance;
    }
    instance = newInstance;
  }
  instance[element.shift()] = value;
  return value;
}

///////////////////////////////////
var scopeId = 0,
    getterFnCache = {},
    compileCache = {},
    JS_KEYWORDS = {};
foreach(
    ("abstract,boolean,break,byte,case,catch,char,class,const,continue,debugger,default," +
    "delete,do,double,else,enum,export,extends,false,final,finally,float,for,function,goto," +
    "if,implements,import,ininstanceof,intinterface,long,native,new,null,package,private," +
    "protected,public,return,short,static,super,switch,synchronized,this,throw,throws," +
    "transient,true,try,typeof,var,volatile,void,undefined,while,with").split(/,/),
  function(key){ JS_KEYWORDS[key] = true;}
);
function getterFn(path){
  var fn = getterFnCache[path];
  if (fn) return fn;

  var code = 'var l, fn, t;\n';
  foreach(path.split('.'), function(key) {
    key = (JS_KEYWORDS[key]) ? '["' + key + '"]' : '.' + key;
    code += 'if(!s) return s;\n' +
            'l=s;\n' +
            's=s' + key + ';\n' +
            'if(typeof s=="function") s = function(){ return l'+key+'.apply(l, arguments); };\n';
    if (key.charAt(1) == '$') {
      // special code for super-imposed functions
      var name = key.substr(2);
      code += 'if(!s) {\n' +
              '  t = angular.Global.typeOf(l);\n' +
              '  fn = (angular[t.charAt(0).toUpperCase() + t.substring(1)]||{})["' + name + '"];\n' +
              '  if (fn) s = function(){ return fn.apply(l, [l].concat(Array.prototype.slice.call(arguments, 0, arguments.length))); };\n' +
              '}\n';
    }
  });
  code += 'return s;';
  fn = Function('s', code);
  fn["toString"] = function(){ return code; };

  return getterFnCache[path] = fn;
}

///////////////////////////////////

function expressionCompile(exp){
  if (typeof exp === $function) return exp;
  var fn = compileCache[exp];
  if (!fn) {
    var p = parser(exp);
    var fnSelf = p.statements();
    p.assertAllConsumed();
    fn = compileCache[exp] = extend(
      function(){ return fnSelf(this);},
      {fnSelf: fnSelf});
  }
  return fn;
}

function errorHandlerFor(element, error) {
  elementError(element, NG_EXCEPTION, isDefined(error) ? toJson(error) : error);
}

function createScope(parent, providers, instanceCache) {
  function Parent(){}
  parent = Parent.prototype = (parent || {});
  var instance = new Parent();
  var evalLists = {sorted:[]};
  var postList = [], postHash = {}, postId = 0;

  extend(instance, {
    'this': instance,
    $id: (scopeId++),
    $parent: parent,
    $bind: bind(instance, bind, instance),
    $get: bind(instance, getter, instance),
    $set: bind(instance, setter, instance),

    $eval: function $eval(exp) {
      var type = typeof exp;
      var i, iSize;
      var j, jSize;
      var queue;
      var fn;
      if (type == $undefined) {
        for ( i = 0, iSize = evalLists.sorted.length; i < iSize; i++) {
          for ( queue = evalLists.sorted[i],
              jSize = queue.length,
              j= 0; j < jSize; j++) {
            instance.$tryEval(queue[j].fn, queue[j].handler);
          }
        }
        while(postList.length) {
          fn = postList.shift();
          delete postHash[fn.$postEvalId];
          instance.$tryEval(fn);
        }
      } else if (type === $function) {
        return exp.call(instance);
      } else  if (type === 'string') {
        return expressionCompile(exp).call(instance);
      }
    },

    $tryEval: function (expression, exceptionHandler) {
      var type = typeof expression;
      try {
        if (type == $function) {
          return expression.call(instance);
        } else if (type == 'string'){
          return expressionCompile(expression).call(instance);
        }
      } catch (e) {
        (instance.$log || {error:error}).error(e);
        if (isFunction(exceptionHandler)) {
          exceptionHandler(e);
        } else if (exceptionHandler) {
          errorHandlerFor(exceptionHandler, e);
        } else if (isFunction(instance.$exceptionHandler)) {
          instance.$exceptionHandler(e);
        }
      }
    },

    $watch: function(watchExp, listener, exceptionHandler) {
      var watch = expressionCompile(watchExp),
          last = {};
      listener = expressionCompile(listener);
      function watcher(){
        var value = watch.call(instance),
            lastValue = last;
        if (last !== value) {
          last = value;
          instance.$tryEval(function(){
            return listener.call(instance, value, lastValue);
          }, exceptionHandler);
        }
      }
      instance.$onEval(PRIORITY_WATCH, watcher);
      watcher();
    },

    $onEval: function(priority, expr, exceptionHandler){
      if (!isNumber(priority)) {
        exceptionHandler = expr;
        expr = priority;
        priority = 0;
      }
      var evalList = evalLists[priority];
      if (!evalList) {
        evalList = evalLists[priority] = [];
        evalList.priority = priority;
        evalLists.sorted.push(evalList);
        evalLists.sorted.sort(function(a,b){return a.priority-b.priority;});
      }
      evalList.push({
        fn: expressionCompile(expr),
        handler: exceptionHandler
      });
    },

    $postEval: function(expr) {
      if (expr) {
        var fn = expressionCompile(expr);
        var id = fn.$postEvalId;
        if (!id) {
          id = '$' + instance.$id + "_" + (postId++);
          fn.$postEvalId = id;
        }
        if (!postHash[id]) {
          postList.push(postHash[id] = fn);
        }
      }
    },

    $become: function(Class) {
      if (isFunction(Class)) {
        instance.constructor = Class;
        foreach(Class.prototype, function(fn, name){
          instance[name] = bind(instance, fn);
        });
        instance.$inject.apply(instance, concat([Class, instance], arguments, 1));

        //TODO: backwards compatibility hack, remove when we don't depend on init methods
        if (isFunction(Class.prototype.init)) {
          instance.init();
        }
      }
    },

    $new: function(Class) {
      var child = createScope(instance);
      child.$become.apply(instance, concat([Class], arguments, 1));
      instance.$onEval(child.$eval);
      return child;
    }

  });

  if (!parent.$root) {
    instance.$root = instance;
    instance.$parent = instance;
    (instance.$inject = createInjector(instance, providers, instanceCache))();
  }

  return instance;
}
/**
 * Create an inject method
 * @param providerScope provider's "this"
 * @param providers a function(name) which returns provider function
 * @param cache place where instances are saved for reuse
 * @returns {Function}
 */
function createInjector(providerScope, providers, cache) {
  providers = providers || angularService;
  cache = cache || {};
  providerScope = providerScope || {};
  /**
   * injection function
   * @param value: string, array, object or function.
   * @param scope: optional function "this"
   * @param args: optional arguments to pass to function after injection
   *              parameters
   * @returns depends on value:
   *   string: return an instance for the injection key.
   *   array of keys: returns an array of instances.
   *   function: look at $inject property of function to determine instances
   *             and then call the function with instances and scope. Any
   *             additional arguments are passed on to function.
   *   object: initialize eager providers and publish them the ones with publish here.
   *   none:   same as object but use providerScope as place to publish.
   */
  return function inject(value, scope, args){
    var returnValue, provider, creation;
    if (isString(value)) {
      if (!cache.hasOwnProperty(value)) {
        provider = providers[value];
        if (!provider) throw "Unknown provider for '"+value+"'.";
        cache[value] = inject(provider, providerScope);
      }
      returnValue = cache[value];
    } else if (isArray(value)) {
      returnValue = [];
      foreach(value, function(name) {
        returnValue.push(inject(name));
      });
    } else if (isFunction(value)) {
      returnValue = inject(value.$inject || []);
      returnValue = value.apply(scope, concat(returnValue, arguments, 2));
    } else if (isObject(value)) {
      foreach(providers, function(provider, name){
        creation = provider.$creation;
        if (creation == 'eager') {
          inject(name);
        }
        if (creation == 'eager-published') {
          setter(value, name, inject(name));
        }
      });
    } else {
      returnValue = inject(providerScope);
    }
    return returnValue;
  };
}var OPERATORS = {
    'null':function(self){return _null;},
    'true':function(self){return true;},
    'false':function(self){return false;},
    $undefined:noop,
    '+':function(self, a,b){return (isDefined(a)?a:0)+(isDefined(b)?b:0);},
    '-':function(self, a,b){return (isDefined(a)?a:0)-(isDefined(b)?b:0);},
    '*':function(self, a,b){return a*b;},
    '/':function(self, a,b){return a/b;},
    '%':function(self, a,b){return a%b;},
    '^':function(self, a,b){return a^b;},
    '=':function(self, a,b){return setter(self, a, b);},
    '==':function(self, a,b){return a==b;},
    '!=':function(self, a,b){return a!=b;},
    '<':function(self, a,b){return a<b;},
    '>':function(self, a,b){return a>b;},
    '<=':function(self, a,b){return a<=b;},
    '>=':function(self, a,b){return a>=b;},
    '&&':function(self, a,b){return a&&b;},
    '||':function(self, a,b){return a||b;},
    '&':function(self, a,b){return a&b;},
//    '|':function(self, a,b){return a|b;},
    '|':function(self, a,b){return b(self, a);},
    '!':function(self, a){return !a;}
};
var ESCAPE = {"n":"\n", "f":"\f", "r":"\r", "t":"\t", "v":"\v", "'":"'", '"':'"'};

function lex(text, parseStringsForObjects){
  var dateParseLength = parseStringsForObjects ? 24 : -1,
      tokens = [],
      token,
      index = 0,
      json = [],
      ch,
      lastCh = ':'; // can start regexp

  while (index < text.length) {
    ch = text.charAt(index);
    if (is('"\'')) {
      readString(ch);
    } else if (isNumber(ch) || is('.') && isNumber(peek())) {
      readNumber();
    } else if ( was('({[:,;') && is('/') ) {
      readRegexp();
    } else if (isIdent(ch)) {
      readIdent();
      if (was('{,') && json[0]=='{' &&
         (token=tokens[tokens.length-1])) {
        token.json = token.text.indexOf('.') == -1;
      }
    } else if (is('(){}[].,;:')) {
      tokens.push({index:index, text:ch, json:is('{}[]:,')});
      if (is('{[')) json.unshift(ch);
      if (is('}]')) json.shift();
      index++;
    } else if (isWhitespace(ch)) {
      index++;
      continue;
    } else {
      var ch2 = ch + peek(),
          fn = OPERATORS[ch],
          fn2 = OPERATORS[ch2];
      if (fn2) {
        tokens.push({index:index, text:ch2, fn:fn2});
        index += 2;
      } else if (fn) {
        tokens.push({index:index, text:ch, fn:fn, json: was('[,:') && is('+-')});
        index += 1;
      } else {
        throw "Lexer Error: Unexpected next character [" +
            text.substring(index) +
            "] in expression '" + text +
            "' at column '" + (index+1) + "'.";
      }
    }
    lastCh = ch;
  }
  return tokens;

  function is(chars) {
    return chars.indexOf(ch) != -1;
  }

  function was(chars) {
    return chars.indexOf(lastCh) != -1;
  }

  function peek() {
    return index + 1 < text.length ? text.charAt(index + 1) : false;
  }
  function isNumber(ch) {
    return '0' <= ch && ch <= '9';
  }
  function isWhitespace(ch) {
    return ch == ' ' || ch == '\r' || ch == '\t' ||
           ch == '\n' || ch == '\v' || ch == '\u00A0'; // IE treats non-breaking space as \u00A0
  }
  function isIdent(ch) {
    return 'a' <= ch && ch <= 'z' ||
           'A' <= ch && ch <= 'Z' ||
           '_' == ch || ch == '$';
  }
  function isExpOperator(ch) {
    return ch == '-' || ch == '+' || isNumber(ch);
  }
  function readNumber() {
    var number = "";
    var start = index;
    while (index < text.length) {
      var ch = lowercase(text.charAt(index));
      if (ch == '.' || isNumber(ch)) {
        number += ch;
      } else {
        var peekCh = peek();
        if (ch == 'e' && isExpOperator(peekCh)) {
          number += ch;
        } else if (isExpOperator(ch) &&
            peekCh && isNumber(peekCh) &&
            number.charAt(number.length - 1) == 'e') {
          number += ch;
        } else if (isExpOperator(ch) &&
            (!peekCh || !isNumber(peekCh)) &&
            number.charAt(number.length - 1) == 'e') {
          throw 'Lexer found invalid exponential value "' + text + '"';
        } else {
          break;
        }
      }
      index++;
    }
    number = 1 * number;
    tokens.push({index:start, text:number, json:true,
      fn:function(){return number;}});
  }
  function readIdent() {
    var ident = "";
    var start = index;
    while (index < text.length) {
      var ch = text.charAt(index);
      if (ch == '.' || isIdent(ch) || isNumber(ch)) {
        ident += ch;
      } else {
        break;
      }
      index++;
    }
    var fn = OPERATORS[ident];
    if (!fn) {
      fn = getterFn(ident);
      fn.isAssignable = ident;
    }
    tokens.push({index:start, text:ident, fn:fn, json: OPERATORS[ident]});
  }

  function readString(quote) {
    var start = index;
    index++;
    var string = "";
    var rawString = quote;
    var escape = false;
    while (index < text.length) {
      var ch = text.charAt(index);
      rawString += ch;
      if (escape) {
        if (ch == 'u') {
          var hex = text.substring(index + 1, index + 5);
          if (!hex.match(/[\da-f]{4}/i))
            throw "Lexer Error: Invalid unicode escape [\\u" +
              hex + "] starting at column '" +
              start + "' in expression '" + text + "'.";
          index += 4;
          string += String.fromCharCode(parseInt(hex, 16));
        } else {
          var rep = ESCAPE[ch];
          if (rep) {
            string += rep;
          } else {
            string += ch;
          }
        }
        escape = false;
      } else if (ch == '\\') {
        escape = true;
      } else if (ch == quote) {
        index++;
        tokens.push({index:start, text:rawString, string:string, json:true,
          fn:function(){
            return (string.length == dateParseLength) ?
              angular['String']['toDate'](string) : string;
          }});
        return;
      } else {
        string += ch;
      }
      index++;
    }
    throw "Lexer Error: Unterminated quote [" +
        text.substring(start) + "] starting at column '" +
        (start+1) + "' in expression '" + text + "'.";
  }
  function readRegexp(quote) {
    var start = index;
    index++;
    var regexp = "";
    var escape = false;
    while (index < text.length) {
      var ch = text.charAt(index);
      if (escape) {
        regexp += ch;
        escape = false;
      } else if (ch === '\\') {
        regexp += ch;
        escape = true;
      } else if (ch === '/') {
        index++;
        var flags = "";
        if (isIdent(text.charAt(index))) {
          readIdent();
          flags = tokens.pop().text;
        }
        var compiledRegexp = new RegExp(regexp, flags);
        tokens.push({index:start, text:regexp, flags:flags,
          fn:function(){return compiledRegexp;}});
        return;
      } else {
        regexp += ch;
      }
      index++;
    }
    throw "Lexer Error: Unterminated RegExp [" +
        text.substring(start) + "] starting at column '" +
        (start+1) + "' in expression '" + text + "'.";
  }
}

/////////////////////////////////////////

function parser(text, json){
  var ZERO = valueFn(0),
      tokens = lex(text, json);
  return {
      assertAllConsumed: assertAllConsumed,
      primary: primary,
      statements: statements,
      validator: validator,
      filter: filter,
      watch: watch
  };

  ///////////////////////////////////

  function error(msg, token) {
    throw "Token '" + token.text +
      "' is " + msg + " at column='" +
      (token.index + 1) + "' of expression '" +
      text + "' starting at '" + text.substring(token.index) + "'.";
  }

  function peekToken() {
    if (tokens.length === 0)
      throw "Unexpected end of expression: " + text;
    return tokens[0];
  }

  function peek(e1, e2, e3, e4) {
    if (tokens.length > 0) {
      var token = tokens[0];
      var t = token.text;
      if (t==e1 || t==e2 || t==e3 || t==e4 ||
          (!e1 && !e2 && !e3 && !e4)) {
        return token;
      }
    }
    return false;
  }

  function expect(e1, e2, e3, e4){
    var token = peek(e1, e2, e3, e4);
    if (token) {
      if (json && !token.json) {
        index = token.index;
        throw "Expression at column='" +
          token.index + "' of expression '" +
          text + "' starting at '" + text.substring(token.index) +
          "' is not valid json.";
      }
      tokens.shift();
      this.currentToken = token;
      return token;
    }
    return false;
  }

  function consume(e1){
    if (!expect(e1)) {
      var token = peek();
      throw "Expecting '" + e1 + "' at column '" +
          (token.index+1) + "' in '" +
          text + "' got '" +
          text.substring(token.index) + "'.";
    }
  }

  function unaryFn(fn, right) {
    return function(self) {
      return fn(self, right(self));
    };
  }

  function binaryFn(left, fn, right) {
    return function(self) {
      return fn(self, left(self), right(self));
    };
  }

  function hasTokens () {
    return tokens.length > 0;
  }

  function assertAllConsumed(){
    if (tokens.length !== 0) {
      throw "Did not understand '" + text.substring(tokens[0].index) +
          "' while evaluating '" + text + "'.";
    }
  }

  function statements(){
    var statements = [];
    while(true) {
      if (tokens.length > 0 && !peek('}', ')', ';', ']'))
        statements.push(filterChain());
      if (!expect(';')) {
        return function (self){
          var value;
          for ( var i = 0; i < statements.length; i++) {
            var statement = statements[i];
            if (statement)
              value = statement(self);
          }
          return value;
        };
      }
    }
  }

  function filterChain(){
    var left = expression();
    var token;
    while(true) {
      if ((token = expect('|'))) {
        left = binaryFn(left, token.fn, filter());
      } else {
        return left;
      }
    }
  }

  function filter(){
    return pipeFunction(angularFilter);
  }

  function validator(){
    return pipeFunction(angularValidator);
  }

  function pipeFunction(fnScope){
    var fn = functionIdent(fnScope);
    var argsFn = [];
    var token;
    while(true) {
      if ((token = expect(':'))) {
        argsFn.push(expression());
      } else {
        var fnInvoke = function(self, input){
          var args = [input];
          for ( var i = 0; i < argsFn.length; i++) {
            args.push(argsFn[i](self));
          }
          return fn.apply(self, args);
        };
        return function(){
          return fnInvoke;
        };
      }
    }
  }

  function expression(){
    return throwStmt();
  }

  function throwStmt(){
    if (expect('throw')) {
      var throwExp = assignment();
      return function (self) {
        throw throwExp(self);
      };
    } else {
      return assignment();
    }
  }

  function assignment(){
    var left = logicalOR();
    var token;
    if (token = expect('=')) {
      if (!left.isAssignable) {
        throw "Left hand side '" +
        text.substring(0, token.index) + "' of assignment '" +
        text.substring(token.index) + "' is not assignable.";
      }
      var ident = function(){return left.isAssignable;};
      return binaryFn(ident, token.fn, logicalOR());
    } else {
      return left;
    }
  }

  function logicalOR(){
    var left = logicalAND();
    var token;
    while(true) {
      if ((token = expect('||'))) {
        left = binaryFn(left, token.fn, logicalAND());
      } else {
        return left;
      }
    }
  }

  function logicalAND(){
    var left = equality();
    var token;
    if ((token = expect('&&'))) {
      left = binaryFn(left, token.fn, logicalAND());
    }
    return left;
  }

  function equality(){
    var left = relational();
    var token;
    if ((token = expect('==','!='))) {
      left = binaryFn(left, token.fn, equality());
    }
    return left;
  }

  function relational(){
    var left = additive();
    var token;
    if (token = expect('<', '>', '<=', '>=')) {
      left = binaryFn(left, token.fn, relational());
    }
    return left;
  }

  function additive(){
    var left = multiplicative();
    var token;
    while(token = expect('+','-')) {
      left = binaryFn(left, token.fn, multiplicative());
    }
    return left;
  }

  function multiplicative(){
    var left = unary();
    var token;
    while(token = expect('*','/','%')) {
      left = binaryFn(left, token.fn, unary());
    }
    return left;
  }

  function unary(){
    var token;
    if (expect('+')) {
      return primary();
    } else if (token = expect('-')) {
      return binaryFn(ZERO, token.fn, unary());
    } else if (token = expect('!')) {
      return unaryFn(token.fn, unary());
    } else {
      return primary();
    }
  }

  function functionIdent(fnScope) {
    var token = expect();
    var element = token.text.split('.');
    var instance = fnScope;
    var key;
    for ( var i = 0; i < element.length; i++) {
      key = element[i];
      if (instance)
        instance = instance[key];
    }
    if (typeof instance != $function) {
      throw "Function '" + token.text + "' at column '" +
      (token.index+1)  + "' in '" + text + "' is not defined.";
    }
    return instance;
  }

  function primary() {
    var primary;
    if (expect('(')) {
      var expression = filterChain();
      consume(')');
      primary = expression;
    } else if (expect('[')) {
      primary = arrayDeclaration();
    } else if (expect('{')) {
      primary = object();
    } else {
      var token = expect();
      primary = token.fn;
      if (!primary) {
        error("not a primary expression", token);
      }
    }
    var next;
    while (next = expect('(', '[', '.')) {
      if (next.text === '(') {
        primary = functionCall(primary);
      } else if (next.text === '[') {
        primary = objectIndex(primary);
      } else if (next.text === '.') {
        primary = fieldAccess(primary);
      } else {
        throw "IMPOSSIBLE";
      }
    }
    return primary;
  }

  function fieldAccess(object) {
    var field = expect().text;
    var getter = getterFn(field);
    var fn = function (self){
      return getter(object(self));
    };
    fn.isAssignable = field;
    return fn;
  }

  function objectIndex(obj) {
    var indexFn = expression();
    consume(']');
    if (expect('=')) {
      var rhs = expression();
      return function (self){
        return obj(self)[indexFn(self)] = rhs(self);
      };
    } else {
      return function (self){
        var o = obj(self);
        var i = indexFn(self);
        return (o) ? o[i] : _undefined;
      };
    }
  }

  function functionCall(fn) {
    var argsFn = [];
    if (peekToken().text != ')') {
      do {
        argsFn.push(expression());
      } while (expect(','));
    }
    consume(')');
    return function (self){
      var args = [];
      for ( var i = 0; i < argsFn.length; i++) {
        args.push(argsFn[i](self));
      }
      var fnPtr = fn(self) || noop;
      // IE stupidity!
      return fnPtr.apply ?
          fnPtr.apply(self, args) :
            fnPtr(args[0], args[1], args[2], args[3], args[4]);
    };
  }

  // This is used with json array declaration
  function arrayDeclaration () {
    var elementFns = [];
    if (peekToken().text != ']') {
      do {
        elementFns.push(expression());
      } while (expect(','));
    }
    consume(']');
    return function (self){
      var array = [];
      for ( var i = 0; i < elementFns.length; i++) {
        array.push(elementFns[i](self));
      }
      return array;
    };
  }

  function object () {
    var keyValues = [];
    if (peekToken().text != '}') {
      do {
        var token = expect(),
        key = token.string || token.text;
        consume(":");
        var value = expression();
        keyValues.push({key:key, value:value});
      } while (expect(','));
    }
    consume('}');
    return function (self){
      var object = {};
      for ( var i = 0; i < keyValues.length; i++) {
        var keyValue = keyValues[i];
        var value = keyValue.value(self);
        object[keyValue.key] = value;
      }
      return object;
    };
  }

  function watch () {
    var decl = [];
    while(hasTokens()) {
      decl.push(watchDecl());
      if (!expect(';')) {
        assertAllConsumed();
      }
    }
    assertAllConsumed();
    return function (self){
      for ( var i = 0; i < decl.length; i++) {
        var d = decl[i](self);
        self.addListener(d.name, d.fn);
      }
    };
  }

  function watchDecl () {
    var anchorName = expect().text;
    consume(":");
    var expressionFn;
    if (peekToken().text == '{') {
      consume("{");
      expressionFn = statements();
      consume("}");
    } else {
      expressionFn = expression();
    }
    return function(self) {
      return {name:anchorName, fn:expressionFn};
    };
  }
}






function Route(template, defaults) {
  this.template = template = template + '#';
  this.defaults = defaults || {};
  var urlParams = this.urlParams = {};
  foreach(template.split(/\W/), function(param){
    if (param && template.match(new RegExp(":" + param + "\\W"))) {
      urlParams[param] = true;
    }
  });
}

Route.prototype = {
  url: function(params) {
    var path = [];
    var self = this;
    var url = this.template;
    params = params || {};
    foreach(this.urlParams, function(_, urlParam){
      var value = params[urlParam] || self.defaults[urlParam] || "";
      url = url.replace(new RegExp(":" + urlParam + "(\\W)"), value + "$1");
    });
    url = url.replace(/\/?#$/, '');
    var query = [];
    foreachSorted(params, function(value, key){
      if (!self.urlParams[key]) {
        query.push(encodeURI(key) + '=' + encodeURI(value));
      }
    });
    url = url.replace(/\/*$/, '');
    return url + (query.length ? '?' + query.join('&') : '');
  }
};

function ResourceFactory(xhr) {
  this.xhr = xhr;
}

ResourceFactory.DEFAULT_ACTIONS = {
  'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'}
};

ResourceFactory.prototype = {
  route: function(url, paramDefaults, actions){
    var self = this;
    var route = new Route(url);
    actions = extend({}, ResourceFactory.DEFAULT_ACTIONS, actions);
    function extractParams(data){
      var ids = {};
      foreach(paramDefaults || {}, function(value, key){
        ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
      });
      return ids;
    }

    function Resource(value){
      copy(value || {}, this);
    }

    foreach(actions, function(action, name){
      var isPostOrPut = action.method == 'POST' || action.method == 'PUT';
      Resource[name] = function (a1, a2, a3) {
        var params = {};
        var data;
        var callback = noop;
        switch(arguments.length) {
        case 3: callback = a3;
        case 2:
          if (isFunction(a2)) {
            callback = a2;
          } else {
            params = a1;
            data = a2;
            break;
          }
        case 1:
          if (isFunction(a1)) callback = a1;
          else if (isPostOrPut) data = a1;
          else params = a1;
          break;
        case 0: break;
        default:
          throw "Expected between 0-3 arguments [params, data, callback], got " + arguments.length + " arguments.";
        }

        var value = this instanceof Resource ? this : (action.isArray ? [] : new Resource(data));
        self.xhr(
          action.method,
          route.url(extend({}, action.params || {}, extractParams(data), params)),
          data,
          function(status, response, clear) {
            if (status == 200) {
              if (action.isArray) {
                value.length = 0;
                foreach(response, function(item){
                  value.push(new Resource(item));
                });
              } else {
                copy(response, value);
              }
              (callback||noop)(value);
            } else {
              throw {status: status, response:response, message: status + ": " + response};
            }
          },
          action.verifyCache);
        return value;
      };

      Resource.bind = function(additionalParamDefaults){
        return self.route(url, extend({}, paramDefaults, additionalParamDefaults), actions);
      };

      Resource.prototype['$' + name] = function(a1, a2){
        var params = extractParams(this);
        var callback = noop;
        switch(arguments.length) {
        case 2: params = a1; callback = a2;
        case 1: if (typeof a1 == $function) callback = a1; else params = a1;
        case 0: break;
        default:
          throw "Expected between 1-2 arguments [params, callback], got " + arguments.length + " arguments.";
        }
        var data = isPostOrPut ? this : _undefined;
        Resource[name].call(this, params, data, callback);
      };
    });
    return Resource;
  }
};
//////////////////////////////
// Browser
//////////////////////////////
var XHR = window.XMLHttpRequest || function () {
  try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e1) {}
  try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e2) {}
  try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e3) {}
  throw new Error("This browser does not support XMLHttpRequest.");
};

function Browser(location, document, head, XHR, $log) {
  var self = this;
  self.isMock = false;

  //////////////////////////////////////////////////////////////
  // XHR API
  //////////////////////////////////////////////////////////////
  var idCounter = 0;
  var outstandingRequestCount = 0;
  var outstandingRequestCallbacks = [];

  self.xhr = function(method, url, post, callback){
    if (isFunction(post)) {
      callback = post;
      post = _null;
    }
    if (lowercase(method) == 'json') {
      var callbackId = "angular_" + Math.random() + '_' + (idCounter++);
      callbackId = callbackId.replace(/\d\./, '');
      var script = document[0].createElement('script');
      script.type = 'text/javascript';
      script.src = url.replace('JSON_CALLBACK', callbackId);
      window[callbackId] = function(data){
        window[callbackId] = _undefined;
        callback(200, data);
      };
      head.append(script);
    } else {
      var xhr = new XHR();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      outstandingRequestCount ++;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          try {
            callback(xhr.status || 200, xhr.responseText);
          } finally {
            outstandingRequestCount--;
            if (outstandingRequestCount === 0) {
              while(outstandingRequestCallbacks.length) {
                try {
                  outstandingRequestCallbacks.pop()();
                } catch (e) {
                }
              }
            }
          }
        }
      };
      xhr.send(post || '');
    }
  };

  self.notifyWhenNoOutstandingRequests = function(callback){
    if (outstandingRequestCount === 0) {
      callback();
    } else {
      outstandingRequestCallbacks.push(callback);
    }
  };

  //////////////////////////////////////////////////////////////
  // Poll Watcher API
  //////////////////////////////////////////////////////////////
  var pollFns = [];
  function poll(){
    foreach(pollFns, function(pollFn){ pollFn(); });
  }
  self.poll = poll;

  /**
   * Adds a function to the list of functions that poller periodically executes
   * @return {Function} the added function
   */
  self.addPollFn = function(/**Function*/fn){
    pollFns.push(fn);
    return fn;
  };

  /**
   * Configures the poller to run in the specified intervals, using the specified setTimeout fn and
   * kicks it off.
   */
  self.startPoller = function(/**number*/interval, /**Function*/setTimeout){
    (function check(){
      poll();
      setTimeout(check, interval);
    })();
  };

  //////////////////////////////////////////////////////////////
  // URL API
  //////////////////////////////////////////////////////////////
  self.setUrl = function(url) {
    var existingURL = location.href;
    if (!existingURL.match(/#/)) existingURL += '#';
    if (!url.match(/#/)) url += '#';
    location.href = url;
   };
   self.getUrl = function() {
    return location.href;
   };

  //////////////////////////////////////////////////////////////
  // Cookies API
  //////////////////////////////////////////////////////////////
  var rawDocument = document[0];
  var lastCookies = {};
  var lastCookieString = '';

  /**
   * The cookies method provides a 'private' low level access to browser cookies. It is not meant to
   * be used directly, use the $cookie service instead.
   *
   * The return values vary depending on the arguments that the method was called with as follows:
   * <ul><li>
   * cookies() -> hash of all cookies, this is NOT a copy of the internal state, so do not modify it
   * </li><li>
   * cookies(name, value) -> set name to value, if value is undefined delete the cookie
   * </li><li>
   * cookies(name) -> the same as (name, undefined) == DELETES (no one calls it right now that way)
   * </li></ul>
   */
  self.cookies = function (/**string*/name, /**string*/value){
    var cookieLength, cookieArray, i, keyValue;

    if (name) {
      if (value === _undefined) {
        rawDocument.cookie = escape(name) + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } else {
        if (isString(value)) {
          rawDocument.cookie = escape(name) + '=' + escape(value);

          cookieLength = name.length + value.length + 1;
          if (cookieLength > 4096) {
            $log.warn("Cookie '"+ name +"' possibly not set or overflowed because it was too large ("+
              cookieLength + " > 4096 bytes)!");
          }
          if (lastCookies.length > 20) {
            $log.warn("Cookie '"+ name +"' possibly not set or overflowed because too many cookies " +
              "were already set (" + lastCookies.length + " > 20 )");
          }
        }
      }
    } else {
      if (rawDocument.cookie !== lastCookieString) {
        lastCookieString = rawDocument.cookie;
        cookieArray = lastCookieString.split("; ");
        lastCookies = {};

        for (i = 0; i < cookieArray.length; i++) {
          keyValue = cookieArray[i].split("=");
          if (keyValue.length === 2) { //ignore nameless cookies
            lastCookies[unescape(keyValue[0])] = unescape(keyValue[1]);
          }
        }
      }
      return lastCookies;
    }
  };

  //////////////////////////////////////////////////////////////
  // Misc API
  //////////////////////////////////////////////////////////////
  var hoverListener = noop;
  self.hover = function(listener) { hoverListener = listener; };
  self.bind = function() {
    document.bind("mouseover", function(event){
      hoverListener(jqLite(msie ? event.srcElement : event.target), true);
      return true;
    });
    document.bind("mouseleave mouseout click dblclick keypress keyup", function(event){
      hoverListener(jqLite(event.target), false);
      return true;
    });
  };


  /**
   * Adds a stylesheet tag to the head.
   */
  self.addCss = function(/**string*/url) {
    var link = jqLite(rawDocument.createElement('link'));
    link.attr('rel', 'stylesheet');
    link.attr('type', 'text/css');
    link.attr('href', url);
    head.append(link);
  };


  /**
   * Adds a script tag to the head.
   */
  self.addJs = function(/**string*/url, /**string*/dom_id) {
    var script = jqLite(rawDocument.createElement('script'));
    script.attr('type', 'text/javascript');
    script.attr('src', url);
    if (dom_id) script.attr('id', dom_id);
    head.append(script);
  };
}
/*
 * HTML Parser By Misko Hevery (misko@hevery.com)
 * based on:  HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 */

// Regular Expressions for parsing tags and attributes
var START_TAG_REGEXP = /^<\s*([\w:]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
  END_TAG_REGEXP = /^<\s*\/\s*([\w:]+)[^>]*>/,
  ATTR_REGEXP = /(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
  BEGIN_TAG_REGEXP = /^</,
  BEGING_END_TAGE_REGEXP = /^<\s*\//,
  COMMENT_REGEXP = /<!--(.*?)-->/g,
  CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g;

// Empty Elements - HTML 4.01
var emptyElements = makeMap("area,base,basefont,br,col,hr,img,input,isindex,link,param");

// Block Elements - HTML 4.01
var blockElements = makeMap("address,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,"+
    "form,hr,ins,isindex,li,map,menu,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

// Inline Elements - HTML 4.01
var inlineElements = makeMap("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,"+
    "input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelfElements = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var specialElements = makeMap("script,style");

var validElements = extend({}, emptyElements, blockElements, inlineElements, closeSelfElements);
var validAttrs = extend({}, fillAttrs, makeMap(
    'abbr,align,alink,alt,archive,axis,background,bgcolor,border,cellpadding,cellspacing,cite,class,classid,clear,code,codebase,'+
    'codetype,color,cols,colspan,content,coords,data,dir,face,for,headers,height,href,hreflang,hspace,id,label,lang,language,'+
    'link,longdesc,marginheight,marginwidth,maxlength,media,method,name,nowrap,profile,prompt,rel,rev,rows,rowspan,rules,scheme,'+
    'scope,scrolling,shape,size,span,src,standby,start,summary,tabindex,target,text,title,type,usemap,valign,value,valuetype,'+
    'vlink,vspace,width'));

/**
 * @example
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * @param {string} html string
 * @param {object} handler
 */
var htmlParser = function( html, handler ) {
  var index, chars, match, stack = [], last = html;
  stack.last = function(){ return stack[ stack.length - 1 ]; };

  while ( html ) {
    chars = true;

    // Make sure we're not in a script or style element
    if ( !stack.last() || !specialElements[ stack.last() ] ) {

      // Comment
      if ( html.indexOf("<!--") === 0 ) {
        index = html.indexOf("-->");

        if ( index >= 0 ) {
          if ( handler.comment )
            handler.comment( html.substring( 4, index ) );
          html = html.substring( index + 3 );
          chars = false;
        }

      // end tag
      } else if ( BEGING_END_TAGE_REGEXP.test(html) ) {
        match = html.match( END_TAG_REGEXP );

        if ( match ) {
          html = html.substring( match[0].length );
          match[0].replace( END_TAG_REGEXP, parseEndTag );
          chars = false;
        }

      // start tag
      } else if ( BEGIN_TAG_REGEXP.test(html) ) {
        match = html.match( START_TAG_REGEXP );

        if ( match ) {
          html = html.substring( match[0].length );
          match[0].replace( START_TAG_REGEXP, parseStartTag );
          chars = false;
        }
      }

      if ( chars ) {
        index = html.indexOf("<");

        var text = index < 0 ? html : html.substring( 0, index );
        html = index < 0 ? "" : html.substring( index );

        if ( handler.chars )
          handler.chars( text );
      }

    } else {
      html = html.replace(new RegExp("(.*)<\\s*\\/\\s*" + stack.last() + "[^>]*>", 'i'), function(all, text){
        text = text.
          replace(COMMENT_REGEXP, "$1").
          replace(CDATA_REGEXP, "$1");

        if ( handler.chars )
          handler.chars( text );

        return "";
      });

      parseEndTag( "", stack.last() );
    }

    if ( html == last ) {
      throw "Parse Error: " + html;
    }
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();

  function parseStartTag( tag, tagName, rest, unary ) {
    tagName = lowercase(tagName);
    if ( blockElements[ tagName ] ) {
      while ( stack.last() && inlineElements[ stack.last() ] ) {
        parseEndTag( "", stack.last() );
      }
    }

    if ( closeSelfElements[ tagName ] && stack.last() == tagName ) {
      parseEndTag( "", tagName );
    }

    unary = emptyElements[ tagName ] || !!unary;

    if ( !unary )
      stack.push( tagName );

    if ( handler.start ) {
      var attrs = {};

      rest.replace(ATTR_REGEXP, function(match, name) {
        var value = arguments[2] ? arguments[2] :
          arguments[3] ? arguments[3] :
          arguments[4] ? arguments[4] :
          fillAttrs[name] ? name : "";

        attrs[name] = value; //value.replace(/(^|[^\\])"/g, '$1\\\"') //"
      });

      if ( handler.start )
        handler.start( tagName, attrs, unary );
    }
  }

  function parseEndTag( tag, tagName ) {
    var pos = 0, i;
    tagName = lowercase(tagName);
    if ( tagName )
      // Find the closest opened tag of the same type
      for ( pos = stack.length - 1; pos >= 0; pos-- )
        if ( stack[ pos ] == tagName )
          break;

    if ( pos >= 0 ) {
      // Close all the open elements, up the stack
      for ( i = stack.length - 1; i >= pos; i-- )
        if ( handler.end )
          handler.end( stack[ i ] );

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }
};

/**
 * @param str 'key1,key2,...'
 * @returns {object} in the form of {key1:true, key2:true, ...}
 */
function makeMap(str){
  var obj = {}, items = str.split(","), i;
  for ( i = 0; i < items.length; i++ )
    obj[ items[i] ] = true;
  return obj;
}

/*
 * For attack vectors see: http://ha.ckers.org/xss.html
 */
var JAVASCRIPT_URL = /^javascript:/i,
    NBSP_REGEXP = /&nbsp;/gim,
    HEX_ENTITY_REGEXP = /&#x([\da-f]*);?/igm,
    DEC_ENTITY_REGEXP = /&#(\d+);?/igm,
    CHAR_REGEXP = /[\w:]/gm,
    HEX_DECODE = function(match, code){return fromCharCode(parseInt(code,16));},
    DEC_DECODE = function(match, code){return fromCharCode(code);};
/**
 * @param {string} url
 * @returns true if url decodes to something which starts with 'javascript:' hence unsafe
 */
function isJavaScriptUrl(url) {
  var chars = [];
  url.replace(NBSP_REGEXP, '').
      replace(HEX_ENTITY_REGEXP, HEX_DECODE).
      replace(DEC_ENTITY_REGEXP, DEC_DECODE).
      // Remove all non \w: characters, unfurtunetly value.replace(/[\w:]/,'') can be defeated using \u0000
      replace(CHAR_REGEXP, function(ch){chars.push(ch);});
  return JAVASCRIPT_URL.test(lowercase(chars.join('')));
}

/**
 * create an HTML/XML writer which writes to buffer
 * @param {Array} buf use buf.jain('') to get out sanitized html string
 * @returns {object} in the form of {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * }
 */
function htmlSanitizeWriter(buf){
  var ignore = false;
  var out = bind(buf, buf.push);
  return {
    start: function(tag, attrs, unary){
      tag = lowercase(tag);
      if (!ignore && specialElements[tag]) {
        ignore = tag;
      }
      if (!ignore && validElements[tag]) {
        out('<');
        out(tag);
        foreach(attrs, function(value, key){
          if (validAttrs[lowercase(key)] && !isJavaScriptUrl(value)) {
            out(' ');
            out(key);
            out('="');
            out(value.
                replace(/</g, '&lt;').
                replace(/>/g, '&gt;').
                replace(/\"/g,'&quot;'));
            out('"');
          }
        });
        out(unary ? '/>' : '>');
      }
    },
    end: function(tag){
        tag = lowercase(tag);
        if (!ignore && validElements[tag]) {
          out('</');
          out(tag);
          out('>');
        }
        if (tag == ignore) {
          ignore = false;
        }
      },
    chars: function(chars){
        if (!ignore) {
          out(chars.
              replace(/&(\w+[&;\W])?/g, function(match, entity){return entity?match:'&amp;';}).
              replace(/</g, '&lt;').
              replace(/>/g, '&gt;'));
        }
      }
  };
}
//////////////////////////////////
//JQLite
//////////////////////////////////

var jqCache = {},
    jqName = 'ng-' + new Date().getTime(),
    jqId = 1,
    addEventListener = (window.document.attachEvent ?
      function(element, type, fn) {element.attachEvent('on' + type, fn);} :
      function(element, type, fn) {element.addEventListener(type, fn, false);}),
    removeEventListener = (window.document.detachEvent ?
      function(element, type, fn) {element.detachEvent('on' + type, fn); } :
      function(element, type, fn) { element.removeEventListener(type, fn, false); });

function jqNextId() { return (jqId++); }

function jqClearData(element) {
  var cacheId = element[jqName],
      cache = jqCache[cacheId];
  if (cache) {
    foreach(cache.bind || {}, function(fn, type){
      removeEventListener(element, type, fn);
    });
    delete jqCache[cacheId];
    if (msie)
      element[jqName] = ''; // ie does not allow deletion of attributes on elements.
    else
      delete element[jqName];
  }
}

function getStyle(element) {
  var current = {}, style = element[0].style, value, name, i;
  if (typeof style.length == 'number') {
    for(i = 0; i < style.length; i++) {
      name = style[i];
      current[name] = style[name];
    }
  } else {
    for (name in style) {
      value = style[name];
      if (1*name != name && name != 'cssText' && value && typeof value == 'string' && value !='false')
        current[name] = value;
    }
  }
  return current;
}

function JQLite(element) {
  if (isElement(element)) {
    this[0] = element;
    this.length = 1;
  } else if (isDefined(element.length) && element.item) {
    for(var i=0; i < element.length; i++) {
      this[i] = element[i];
    }
    this.length = element.length;
  }
}

JQLite.prototype = {
  data: function(key, value) {
    var element = this[0],
        cacheId = element[jqName],
        cache = jqCache[cacheId || -1];
    if (isDefined(value)) {
      if (!cache) {
        element[jqName] = cacheId = jqNextId();
        cache = jqCache[cacheId] = {};
      }
      cache[key] = value;
    } else {
      return cache ? cache[key] : _null;
    }
  },

  removeData: function(){
    jqClearData(this[0]);
  },

  dealoc: function(){
    (function dealoc(element){
      jqClearData(element);
      for ( var i = 0, children = element.childNodes; i < children.length; i++) {
        dealoc(children[i]);
      }
    })(this[0]);
  },

  bind: function(type, fn){
    var self = this,
        element = self[0],
        bind = self.data('bind'),
        eventHandler;
    if (!bind) this.data('bind', bind = {});
    foreach(type.split(' '), function(type){
      eventHandler = bind[type];
      if (!eventHandler) {
        bind[type] = eventHandler = function(event) {
          if (!event.preventDefault) {
            event.preventDefault = function(){
              event.returnValue = false; //ie
            };
          }
          if (!event.stopPropagation) {
            event.stopPropagation = function() {
              event.cancelBubble = true; //ie
            };
          }
          foreach(eventHandler.fns, function(fn){
            fn.call(self, event);
          });
        };
        eventHandler.fns = [];
        addEventListener(element, type, eventHandler);
      }
      eventHandler.fns.push(fn);
    });
  },

  replaceWith: function(replaceNode) {
    this[0].parentNode.replaceChild(jqLite(replaceNode)[0], this[0]);
  },

  children: function() {
    return new JQLite(this[0].childNodes);
  },

  append: function(node) {
    var self = this[0];
    node = jqLite(node);
    foreach(node, function(child){
      self.appendChild(child);
    });
  },

  remove: function() {
    this.dealoc();
    var parentNode = this[0].parentNode;
    if (parentNode) parentNode.removeChild(this[0]);
  },

  removeAttr: function(name) {
    this[0].removeAttribute(name);
  },

  after: function(element) {
    this[0].parentNode.insertBefore(jqLite(element)[0], this[0].nextSibling);
  },

  hasClass: function(selector) {
    var className = " " + selector + " ";
    if ( (" " + this[0].className + " ").replace(/[\n\t]/g, " ").indexOf( className ) > -1 ) {
      return true;
    }
    return false;
  },

  removeClass: function(selector) {
    this[0].className = trim((" " + this[0].className + " ").replace(/[\n\t]/g, " ").replace(" " + selector + " ", ""));
  },

  toggleClass: function(selector, condition) {
   var self = this;
   (condition ? self.addClass : self.removeClass).call(self, selector);
  },

  addClass: function( selector ) {
    if (!this.hasClass(selector)) {
      this[0].className = trim(this[0].className + ' ' + selector);
    }
  },

  css: function(name, value) {
    var style = this[0].style;
    if (isString(name)) {
      if (isDefined(value)) {
        style[name] = value;
      } else {
        return style[name];
      }
    } else {
      extend(style, name);
    }
  },

  attr: function(name, value){
    var e = this[0];
    if (isObject(name)) {
      foreach(name, function(value, name){
        e.setAttribute(name, value);
      });
    } else if (isDefined(value)) {
      e.setAttribute(name, value);
    } else {
      // the extra argument is to get the right thing for a.href in IE, see jQuery code
      return e.getAttribute(name, 2);
    }
  },

  text: function(value) {
    if (isDefined(value)) {
      this[0].textContent = value;
    }
    return this[0].textContent;
  },

  val: function(value) {
    if (isDefined(value)) {
      this[0].value = value;
    }
    return this[0].value;
  },

  html: function(value) {
    if (isDefined(value)) {
      var i = 0, childNodes = this[0].childNodes;
      for ( ; i < childNodes.length; i++) {
        jqLite(childNodes[i]).dealoc();
      }
      this[0].innerHTML = value;
    }
    return this[0].innerHTML;
  },

  parent: function() {
    return jqLite(this[0].parentNode);
  },

  clone: function() { return jqLite(this[0].cloneNode(true)); }
};

if (msie) {
  extend(JQLite.prototype, {
    text: function(value) {
      var e = this[0];
      // NodeType == 3 is text node
      if (e.nodeType == 3) {
        if (isDefined(value)) e.nodeValue = value;
        return e.nodeValue;
      } else {
        if (isDefined(value)) e.innerText = value;
        return e.innerText;
      }
    }
  });
}
var angularGlobal = {
  'typeOf':function(obj){
    if (obj === _null) return $null;
    var type = typeof obj;
    if (type == $object) {
      if (obj instanceof Array) return $array;
      if (isDate(obj)) return $date;
      if (obj.nodeType == 1) return $element;
    }
    return type;
  }
};

var angularCollection = {
  'copy': copy,
  'size': size,
  'equals': equals
};
var angularObject = {
  'extend': extend
};
var angularArray = {
  'indexOf': indexOf,
  'sum':function(array, expression) {
    var fn = angular['Function']['compile'](expression);
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      var value = 1 * fn(array[i]);
      if (!isNaN(value)){
        sum += value;
      }
    }
    return sum;
  },
  'remove':function(array, value) {
    var index = indexOf(array, value);
    if (index >=0)
      array.splice(index, 1);
    return value;
  },
  'filter':function(array, expression) {
    var predicates = [];
    predicates.check = function(value) {
      for (var j = 0; j < predicates.length; j++) {
        if(!predicates[j](value)) {
          return false;
        }
      }
      return true;
    };
    var search = function(obj, text){
      if (text.charAt(0) === '!') {
        return !search(obj, text.substr(1));
      }
      switch (typeof obj) {
      case "boolean":
      case "number":
      case "string":
        return ('' + obj).toLowerCase().indexOf(text) > -1;
      case "object":
        for ( var objKey in obj) {
          if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
            return true;
          }
        }
        return false;
      case "array":
        for ( var i = 0; i < obj.length; i++) {
          if (search(obj[i], text)) {
            return true;
          }
        }
        return false;
      default:
        return false;
      }
    };
    switch (typeof expression) {
      case "boolean":
      case "number":
      case "string":
        expression = {$:expression};
      case "object":
        for (var key in expression) {
          if (key == '$') {
            (function(){
              var text = (''+expression[key]).toLowerCase();
              if (!text) return;
              predicates.push(function(value) {
                return search(value, text);
              });
            })();
          } else {
            (function(){
              var path = key;
              var text = (''+expression[key]).toLowerCase();
              if (!text) return;
              predicates.push(function(value) {
                return search(getter(value, path), text);
              });
            })();
          }
        }
        break;
      case $function:
        predicates.push(expression);
        break;
      default:
        return array;
    }
    var filtered = [];
    for ( var j = 0; j < array.length; j++) {
      var value = array[j];
      if (predicates.check(value)) {
        filtered.push(value);
      }
    }
    return filtered;
  },
  'add':function(array, value) {
    array.push(isUndefined(value)? {} : value);
    return array;
  },
  'count':function(array, condition) {
    if (!condition) return array.length;
    var fn = angular['Function']['compile'](condition), count = 0;
    foreach(array, function(value){
      if (fn(value)) {
        count ++;
      }
    });
    return count;
  },
  'orderBy':function(array, expression, descend) {
    expression = isArray(expression) ? expression: [expression];
    expression = map(expression, function($){
      var descending = false, get = $ || identity;
      if (isString($)) {
        if (($.charAt(0) == '+' || $.charAt(0) == '-')) {
          descending = $.charAt(0) == '-';
          $ = $.substring(1);
        }
        get = expressionCompile($).fnSelf;
      }
      return reverse(function(a,b){
        return compare(get(a),get(b));
      }, descending);
    });
    var arrayCopy = [];
    for ( var i = 0; i < array.length; i++) { arrayCopy.push(array[i]); }
    return arrayCopy.sort(reverse(comparator, descend));

    function comparator(o1, o2){
      for ( var i = 0; i < expression.length; i++) {
        var comp = expression[i](o1, o2);
        if (comp !== 0) return comp;
      }
      return 0;
    }
    function reverse(comp, descending) {
      return toBoolean(descending) ?
          function(a,b){return comp(b,a);} : comp;
    }
    function compare(v1, v2){
      var t1 = typeof v1;
      var t2 = typeof v2;
      if (t1 == t2) {
        if (t1 == "string") v1 = v1.toLowerCase();
        if (t1 == "string") v2 = v2.toLowerCase();
        if (v1 === v2) return 0;
        return v1 < v2 ? -1 : 1;
      } else {
        return t1 < t2 ? -1 : 1;
      }
    }

  }
};

var R_ISO8061_STR = /^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d)(?:\:(\d\d)(?:\:(\d\d)(?:\.(\d{3}))?)?)?Z)?$/

var angularString = {
  'quote':function(string) {
    return '"' + string.replace(/\\/g, '\\\\').
                        replace(/"/g, '\\"').
                        replace(/\n/g, '\\n').
                        replace(/\f/g, '\\f').
                        replace(/\r/g, '\\r').
                        replace(/\t/g, '\\t').
                        replace(/\v/g, '\\v') +
             '"';
  },
  'quoteUnicode':function(string) {
    var str = angular['String']['quote'](string);
    var chars = [];
    for ( var i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      if (ch < 128) {
        chars.push(str.charAt(i));
      } else {
        var encode = "000" + ch.toString(16);
        chars.push("\\u" + encode.substring(encode.length - 4));
      }
    }
    return chars.join('');
  },

  /**
   * Tries to convert input to date and if successful returns the date, otherwise returns the input.
   * @param {string} string
   * @return {(Date|string)}
   */
  'toDate':function(string){
    var match;
    if (isString(string) && (match = string.match(R_ISO8061_STR))){
      var date = new Date(0);
      date.setUTCFullYear(match[1], match[2] - 1, match[3]);
      date.setUTCHours(match[4]||0, match[5]||0, match[6]||0, match[7]||0);
      return date;
    }
    return string;
  }
};

var angularDate = {
    'toString':function(date){
      return !date ?
                date :
                date.toISOString ?
                  date.toISOString() :
                  padNumber(date.getUTCFullYear(), 4) + '-' +
                  padNumber(date.getUTCMonth() + 1, 2) + '-' +
                  padNumber(date.getUTCDate(), 2) + 'T' +
                  padNumber(date.getUTCHours(), 2) + ':' +
                  padNumber(date.getUTCMinutes(), 2) + ':' +
                  padNumber(date.getUTCSeconds(), 2) + '.' +
                  padNumber(date.getUTCMilliseconds(), 3) + 'Z';
    }
  };

var angularFunction = {
  'compile':function(expression) {
    if (isFunction(expression)){
      return expression;
    } else if (expression){
      return expressionCompile(expression).fnSelf;
    } else {
      return identity;
    }
  }
};

function defineApi(dst, chain){
  angular[dst] = angular[dst] || {};
  foreach(chain, function(parent){
    extend(angular[dst], parent);
  });
}
defineApi('Global', [angularGlobal]);
defineApi('Collection', [angularGlobal, angularCollection]);
defineApi('Array', [angularGlobal, angularCollection, angularArray]);
defineApi('Object', [angularGlobal, angularCollection, angularObject]);
defineApi('String', [angularGlobal, angularString]);
defineApi('Date', [angularGlobal, angularDate]);
//IE bug
angular['Date']['toString'] = angularDate['toString'];
defineApi('Function', [angularGlobal, angularCollection, angularFunction]);
/**
 * @ngdoc filter
 * @name angular.filter.currency
 * @function
 *
 * @description
 *   Formats a number as a currency (ie $1,234.56).
 *
 * @param {number} amount Input to filter.
 * @returns {string} Formated number.
 *
 * @css ng-format-negative
 *   When the value is negative, this css class is applied to the binding making it by default red.
 *
 * @example
     <input type="text" name="amount" value="1234.56"/> <br/>
     {{amount | currency}}
 *
 * @scenario
     it('should init with 1234.56', function(){
       expect(binding('amount | currency')).toBe('$1,234.56');
     });
     it('should update', function(){
       input('amount').enter('-1234');
       expect(binding('amount | currency')).toBe('$-1,234.00');
       expect(element('.doc-example-live .ng-binding').attr('className')).
         toMatch(/ng-format-negative/);
     });
 */
angularFilter.currency = function(amount){
  this.$element.toggleClass('ng-format-negative', amount < 0);
  return '$' + angularFilter['number'].apply(this, [amount, 2]);
};

/**
 * @ngdoc filter
 * @name angular.filter.number
 * @function
 *
 * @description
 *   Formats a number as text.
 *
 *   If the input is not a number empty string is returned.
 *
 * @param {(number|string)} number Number to format.
 * @param {(number|string)=} [fractionSize=2] Number of decimal places to round the number to. Default 2.
 * @returns {string} Number rounded to decimalPlaces and places a “,” after each third digit.
 *
 * @example
     Enter number: <input name='val' value='1234.56789' /><br/>
     Default formatting: {{val | number}}<br/>
     No fractions: {{val | number:0}}<br/>
     Negative number: {{-val | number:4}}

 * @scenario
     it('should format numbers', function(){
       expect(binding('val | number')).toBe('1,234.57');
       expect(binding('val | number:0')).toBe('1,235');
       expect(binding('-val | number:4')).toBe('-1,234.5679');
     });

     it('should update', function(){
       input('val').enter('3374.333');
       expect(binding('val | number')).toBe('3,374.33');
       expect(binding('val | number:0')).toBe('3,374');
       expect(binding('-val | number:4')).toBe('-3,374.3330');
     });
 */
angularFilter.number = function(number, fractionSize){
  if (isNaN(number) || !isFinite(number)) {
    return '';
  }
  fractionSize = typeof fractionSize == $undefined ? 2 : fractionSize;
  var isNegative = number < 0;
  number = Math.abs(number);
  var pow = Math.pow(10, fractionSize);
  var text = "" + Math.round(number * pow);
  var whole = text.substring(0, text.length - fractionSize);
  whole = whole || '0';
  var frc = text.substring(text.length - fractionSize);
  text = isNegative ? '-' : '';
  for (var i = 0; i < whole.length; i++) {
    if ((whole.length - i)%3 === 0 && i !== 0) {
      text += ',';
    }
    text += whole.charAt(i);
  }
  if (fractionSize > 0) {
    for (var j = frc.length; j < fractionSize; j++) {
      frc += '0';
    }
    text += '.' + frc.substring(0, fractionSize);
  }
  return text;
};


function padNumber(num, digits, trim) {
  var neg = '';
  if (num < 0) {
    neg =  '-';
    num = -num;
  }
  num = '' + num;
  while(num.length < digits) num = '0' + num;
  if (trim)
    num = num.substr(num.length - digits);
  return neg + num;
}


function dateGetter(name, size, offset, trim) {
  return function(date) {
    var value = date['get' + name]();
    if (offset > 0 || value > -offset)
      value += offset;
    if (value === 0 && offset == -12 ) value = 12;
    return padNumber(value, size, trim);
  };
}


var DATE_FORMATS = {
  yyyy: dateGetter('FullYear', 4),
  yy:   dateGetter('FullYear', 2, 0, true),
  MM:   dateGetter('Month', 2, 1),
   M:   dateGetter('Month', 1, 1),
  dd:   dateGetter('Date', 2),
   d:   dateGetter('Date', 1),
  HH:   dateGetter('Hours', 2),
   H:   dateGetter('Hours', 1),
  hh:   dateGetter('Hours', 2, -12),
   h:   dateGetter('Hours', 1, -12),
  mm:   dateGetter('Minutes', 2),
   m:   dateGetter('Minutes', 1),
  ss:   dateGetter('Seconds', 2),
   s:   dateGetter('Seconds', 1),
  a:    function(date){return date.getHours() < 12 ? 'am' : 'pm';},
  Z:    function(date){
          var offset = date.getTimezoneOffset();
          return padNumber(offset / 60, 2) + padNumber(Math.abs(offset % 60), 2);
        }
};


var DATE_FORMATS_SPLIT = /([^yMdHhmsaZ]*)(y+|M+|d+|H+|h+|m+|s+|a|Z)(.*)/;
var NUMBER_STRING = /^\d+$/;


/**
 * @ngdoc filter
 * @name angular.filter.date
 * @function
 *
 * @description
 *   Formats `date` to a string based on the requested `format`.
 *
 *   `format` string can be composed of the following elements:
 *
 *   * `'yyyy'`: 4 digit representation of year e.g. 2010
 *   * `'yy'`: 2 digit representation of year, padded (00-99)
 *   * `'MM'`: Month in year, padded (01‒12)
 *   * `'M'`: Month in year (1‒12)
 *   * `'dd'`: Day in month, padded (01‒31)
 *   * `'d'`: Day in month (1-31)
 *   * `'HH'`: Hour in day, padded (00‒23)
 *   * `'H'`: Hour in day (0-23)
 *   * `'hh'`: Hour in am/pm, padded (01‒12)
 *   * `'h'`: Hour in am/pm, (1-12)
 *   * `'mm'`: Minute in hour, padded (00‒59)
 *   * `'m'`: Minute in hour (0-59)
 *   * `'ss'`: Second in minute, padded (00‒59)
 *   * `'s'`: Second in minute (0‒59)
 *   * `'a'`: am/pm marker
 *   * `'Z'`: 4 digit (+sign) representation of the timezone offset (-1200‒1200)
 *
 * @param {(Date|number|string)} date Date to format either as Date object, milliseconds (string or
 *    number) or ISO 8601 extended datetime string (yyyy-MM-ddTHH:mm:ss.SSSZ).
 * @param {string=} format Formatting rules. If not specified, Date#toLocaleDateString is used.
 * @returns {string} Formatted string or the input if input is not recognized as date/millis.
 *
 * @example
     <span ng:non-bindable>{{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}</span>:
        {{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}<br/>
     <span ng:non-bindable>{{1288323623006 | date:'MM/dd/yyyy @ h:mma'}}</span>:
        {{'1288323623006' | date:'MM/dd/yyyy @ h:mma'}}<br/>
 *
 * @scenario
     it('should format date', function(){
       expect(binding("1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'")).
          toMatch(/2010\-10\-2\d \d{2}:\d{2}:\d{2} \-?\d{4}/);
       expect(binding("'1288323623006' | date:'MM/dd/yyyy @ h:mma'")).
          toMatch(/10\/2\d\/2010 @ \d{1,2}:\d{2}(am|pm)/);
     });
 *
 */
angularFilter.date = function(date, format) {
  if (isString(date)) {
    if (NUMBER_STRING.test(date)) {
      date = parseInt(date, 10);
    } else {
      date = angularString.toDate(date);
    }
  }

  if (isNumber(date)) {
    date = new Date(date);
  }

  if (!isDate(date)) {
    return date;
  }

  var text = date.toLocaleDateString(), fn;
  if (format && isString(format)) {
    text = '';
    var parts = [];
    while(format) {
      parts = concat(parts, DATE_FORMATS_SPLIT.exec(format), 1);
      format = parts.pop();
    }
    foreach(parts, function(value){
      fn = DATE_FORMATS[value];
      text += fn ? fn(date) : value;
    });
  }
  return text;
};


/**
 * @ngdoc filter
 * @name angular.filter.json
 * @function
 *
 * @description
 *   Allows you to convert a JavaScript object into JSON string.
 *
 *   This filter is mostly useful for debugging. When using the double curly {{value}} notation
 *   the binding is automatically converted to JSON.
 *
 * @param {*} object Any JavaScript object (including arrays and primitive types) to filter.
 * @returns {string} JSON string.
 *
 * @css ng-monospace Always applied to the encapsulating element.
 *
 * @example:
     <input type="text" name="objTxt" value="{a:1, b:[]}"
            ng:eval="obj = $eval(objTxt)"/>
     <pre>{{ obj | json }}</pre>
 *
 * @scenario
     it('should jsonify filtered objects', function() {
       expect(binding('obj | json')).toBe('{\n  "a":1,\n  "b":[]}');
     });

     it('should update', function() {
       input('objTxt').enter('[1, 2, 3]');
       expect(binding('obj | json')).toBe('[1,2,3]');
     });
 *
 */
angularFilter.json = function(object) {
  this.$element.addClass("ng-monospace");
  return toJson(object, true);
};


/**
 * @ngdoc filter
 * @name angular.filter.lowercase
 * @function
 *
 * @see angular.lowercase
 */
angularFilter.lowercase = lowercase;


/**
 * @ngdoc filter
 * @name angular.filter.uppercase
 * @function
 *
 * @see angular.uppercase
 */
angularFilter.uppercase = uppercase;


/**
 * @ngdoc filter
 * @name angular.filter.html
 * @function
 *
 * @description
 *   Prevents the input from getting escaped by angular. By default the input is sanitized and
 *   inserted into the DOM as is.
 *
 *   The input is sanitized by parsing the html into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string, however since our parser is more strict than a typical browser
 *   parser, it's possible that some obscure input, which would be recognized as valid HTML by a
 *   browser, won't make it through the sanitizer.
 *
 *   If you hate your users, you may call the filter with optional 'unsafe' argument, which bypasses
 *   the html sanitizer, but makes your application vulnerable to XSS and other attacks. Using this
 *   option is strongly discouraged and should be used only if you absolutely trust the input being
 *   filtered and you can't get the content through the sanitizer.
 *
 * @param {string} html Html input.
 * @param {string=} option If 'unsafe' then do not sanitize the HTML input.
 * @returns {string} Sanitized or raw html.
 *
 * @example
     Snippet: <textarea name="snippet" cols="60" rows="3">
&lt;p style="color:blue"&gt;an html
&lt;em onmouseover="this.textContent='PWN3D!'"&gt;click here&lt;/em&gt;
snippet&lt;/p&gt;</textarea>
     <table>
       <tr>
         <td>Filter</td>
         <td>Source</td>
         <td>Rendered</td>
       </tr>
       <tr id="html-filter">
         <td>html filter</td>
         <td>
           <pre>&lt;div ng:bind="snippet | html"&gt;<br/>&lt;/div&gt;</pre>
         </td>
         <td>
           <div ng:bind="snippet | html"></div>
         </td>
       </tr>
       <tr id="escaped-html">
         <td>no filter</td>
         <td><pre>&lt;div ng:bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
         <td><div ng:bind="snippet"></div></td>
       </tr>
       <tr id="html-unsafe-filter">
         <td>unsafe html filter</td>
         <td><pre>&lt;div ng:bind="snippet | html:'unsafe'"&gt;<br/>&lt;/div&gt;</pre></td>
         <td><div ng:bind="snippet | html:'unsafe'"></div></td>
       </tr>
     </table>
 *
 * @scenario
     it('should sanitize the html snippet ', function(){
       expect(using('#html-filter').binding('snippet | html')).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it ('should escape snippet without any filter', function() {
       expect(using('#escaped-html').binding('snippet')).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it ('should inline raw snippet if filtered as unsafe', function() {
       expect(using('#html-unsafe-filter').binding("snippet | html:'unsafe'")).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should update', function(){
       input('snippet').enter('new <b>text</b>');
       expect(using('#html-filter').binding('snippet | html')).toBe('new <b>text</b>');
       expect(using('#escaped-html').binding('snippet')).toBe("new &lt;b&gt;text&lt;/b&gt;");
       expect(using('#html-unsafe-filter').binding("snippet | html:'unsafe'")).toBe('new <b>text</b>');
     });
 */
angularFilter.html =  function(html, option){
  return new HTML(html, option);
};


/**
 * @ngdoc filter
 * @name angular.filter.linky
 * @function
 *
 * @description
 *   Finds links in text input and turns them into html links. Supports http/https/ftp/mailto and
 *   plane email address links.
 *
 * @param {string} text Input text.
 * @returns {string} Html-linkified text.
 *
 * @example
     Snippet: <textarea name="snippet" cols="60" rows="3">
Pretty text with some links:
http://angularjs.org/,
mailto:us@somewhere.org,
another@somewhere.org,
and one more: ftp://127.0.0.1/.</textarea>
     <table>
       <tr>
         <td>Filter</td>
         <td>Source</td>
         <td>Rendered</td>
       </tr>
       <tr id="linky-filter">
         <td>linky filter</td>
         <td>
           <pre>&lt;div ng:bind="snippet | linky"&gt;<br/>&lt;/div&gt;</pre>
         </td>
         <td>
           <div ng:bind="snippet | linky"></div>
         </td>
       </tr>
       <tr id="escaped-html">
         <td>no filter</td>
         <td><pre>&lt;div ng:bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
         <td><div ng:bind="snippet"></div></td>
       </tr>
     </table>

   @scenario
     it('should linkify the snippet with urls', function(){
       expect(using('#linky-filter').binding('snippet | linky')).
         toBe('Pretty text with some links:\n' +
              '<a href="http://angularjs.org/">http://angularjs.org/</a>,\n' +
              '<a href="mailto:us@somewhere.org">us@somewhere.org</a>,\n' +
              '<a href="mailto:another@somewhere.org">another@somewhere.org</a>,\n' +
              'and one more: <a href="ftp://127.0.0.1/">ftp://127.0.0.1/</a>.');
     });

     it ('should not linkify snippet without the linky filter', function() {
       expect(using('#escaped-html').binding('snippet')).
         toBe("Pretty text with some links:\n" +
              "http://angularjs.org/,\n" +
              "mailto:us@somewhere.org,\n" +
              "another@somewhere.org,\n" +
              "and one more: ftp://127.0.0.1/.");
     });

     it('should update', function(){
       input('snippet').enter('new http://link.');
       expect(using('#linky-filter').binding('snippet | linky')).
         toBe('new <a href="http://link">http://link</a>.');
       expect(using('#escaped-html').binding('snippet')).toBe('new http://link.');
     });
 */
//TODO: externalize all regexps
angularFilter.linky = function(text){
  if (!text) return text;
  var URL = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/;
  var match;
  var raw = text;
  var html = [];
  var writer = htmlSanitizeWriter(html);
  var url;
  var i;
  while (match=raw.match(URL)) {
    // We can not end in these as they are sometimes found at the end of the sentence
    url = match[0];
    // if we did not match ftp/http/mailto then assume mailto
    if (match[2]==match[3]) url = 'mailto:' + url;
    i = match.index;
    writer.chars(raw.substr(0, i));
    writer.start('a', {href:url});
    writer.chars(match[0].replace(/^mailto:/, ''));
    writer.end('a');
    raw = raw.substring(i + match[0].length);
  }
  writer.chars(raw);
  return new HTML(html.join(''));
};
function formatter(format, parse) {return {'format':format, 'parse':parse || format};}
function toString(obj) {
  return (isDefined(obj) && obj !== _null) ? "" + obj : obj;
}

var NUMBER = /^\s*[-+]?\d*(\.\d*)?\s*$/;

angularFormatter.noop = formatter(identity, identity);

/**
 * @ngdoc formatter
 * @name angular.formatter.json
 *
 * @description
 *   Formats the user input as JSON text.
 *
 * @returns {string} A JSON string representation of the model.
 *
 * @example
 * <div ng:init="data={name:'misko', project:'angular'}">
 *   <input type="text" size='50' name="data" ng:format="json"/>
 *   <pre>data={{data}}</pre>
 * </div>
 *
 * @scenario
 * it('should format json', function(){
 *   expect(binding('data')).toEqual('data={\n  \"name\":\"misko\",\n  \"project\":\"angular\"}');
 *   input('data').enter('{}');
 *   expect(binding('data')).toEqual('data={\n  }');
 * });
 */
angularFormatter.json = formatter(toJson, fromJson);

/**
 * @ngdoc formatter
 * @name angular.formatter.boolean
 *
 * @description
 *   Use boolean formatter if you wish to store the data as boolean.
 *
 * @returns Convert to `true` unless user enters (blank), `f`, `false`, `0`, `no`, `[]`.
 *
 * @example
 * Enter truthy text:
 * <input type="text" name="value" ng:format="boolean" value="no"/>
 * <input type="checkbox" name="value"/>
 * <pre>value={{value}}</pre>
 *
 * @scenario
 * it('should format boolean', function(){
 *   expect(binding('value')).toEqual('value=false');
 *   input('value').enter('truthy');
 *   expect(binding('value')).toEqual('value=true');
 * });
 */
angularFormatter['boolean'] = formatter(toString, toBoolean);

/**
 * @ngdoc formatter
 * @name angular.formatter.number
 *
 * @description
 * Use number formatter if you wish to convert the user entered string to a number.
 *
 * @returns parse string to number.
 *
 * @example
 * Enter valid number:
 * <input type="text" name="value" ng:format="number" value="1234"/>
 * <pre>value={{value}}</pre>
 *
 * @scenario
 * it('should format numbers', function(){
 *   expect(binding('value')).toEqual('value=1234');
 *   input('value').enter('5678');
 *   expect(binding('value')).toEqual('value=5678');
 * });
 */
angularFormatter.number = formatter(toString, function(obj){
  if (obj == _null || NUMBER.exec(obj)) {
    return obj===_null || obj === '' ? _null : 1*obj;
  } else {
    throw "Not a number";
  }
});

/**
 * @ngdoc formatter
 * @name angular.formatter.list
 *
 * @description
 * Use number formatter if you wish to convert the user entered string to a number.
 *
 * @returns parse string to number.
 *
 * @example
 * Enter a list of items:
 * <input type="text" name="value" ng:format="list" value=" chair ,, table"/>
 * <input type="text" name="value" ng:format="list"/>
 * <pre>value={{value}}</pre>
 *
 * @scenario
 * it('should format lists', function(){
 *   expect(binding('value')).toEqual('value=["chair","table"]');
 *   this.addFutureAction('change to XYZ', function($window, $document, done){
 *     $document.elements('.doc-example :input:last').val(',,a,b,').trigger('change');
 *     done();
 *   });
 *   expect(binding('value')).toEqual('value=["a","b"]');
 * });
 */
angularFormatter.list = formatter(
  function(obj) { return obj ? obj.join(", ") : obj; },
  function(value) {
    var list = [];
    foreach((value || '').split(','), function(item){
      item = trim(item);
      if (item) list.push(item);
    });
    return list;
  }
);

/**
 * @ngdoc formatter
 * @name angular.formatter.trim
 *
 * @description
 * Use trim formatter if you wish to trim extra spaces in user text.
 *
 * @returns {String} Trim excess leading and trailing space.
 *
 * @example
 * Enter text with leading/trailing spaces:
 * <input type="text" name="value" ng:format="trim" value="  book  "/>
 * <input type="text" name="value" ng:format="trim"/>
 * <pre>value={{value|json}}</pre>
 *
 * @scenario
 * it('should format trim', function(){
 *   expect(binding('value')).toEqual('value="book"');
 *   this.addFutureAction('change to XYZ', function($window, $document, done){
 *     $document.elements('.doc-example :input:last').val('  text  ').trigger('change');
 *     done();
 *   });
 *   expect(binding('value')).toEqual('value="text"');
 * });
 */
angularFormatter.trim = formatter(
  function(obj) { return obj ? trim("" + obj) : ""; }
);
extend(angularValidator, {
  'noop': function() { return _null; },

  /**
   * @ngdoc validator
   * @name angular.validator.regexp
   * @description
   * Use regexp validator to restrict the input to any Regular Expression.
   * 
   * @param {string} value value to validate
   * @param {regexp} expression regular expression.
   * @css ng-validation-error
   * 
   * @example
   * Enter valid SSN:
   * <input name="ssn" value="123-45-6789" ng:validate="regexp:/^\d\d\d-\d\d-\d\d\d\d$/" >
   * 
   * @scenario
   * it('should invalidate non ssn', function(){
   *   var textBox = element('.doc-example :input');
   *   expect(textBox.attr('className')).not().toMatch(/ng-validation-error/);
   *   expect(textBox.val()).toEqual('123-45-6789');
   *   
   *   input('ssn').enter('123-45-67890');
   *   expect(textBox.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'regexp': function(value, regexp, msg) {
    if (!value.match(regexp)) {
      return msg ||
        "Value does not match expected format " + regexp + ".";
    } else {
      return _null;
    }
  },

  /**
   * @ngdoc validator
   * @name angular.validator.number
   * @description
   * Use number validator to restrict the input to numbers with an 
   * optional range. (See integer for whole numbers validator).
   * 
   * @param {string} value value to validate
   * @param {int=} [min=MIN_INT] minimum value.
   * @param {int=} [max=MAX_INT] maximum value.
   * @css ng-validation-error
   * 
   * @example
   * Enter number: <input name="n1" ng:validate="number" > <br>
   * Enter number greater than 10: <input name="n2" ng:validate="number:10" > <br>
   * Enter number between 100 and 200: <input name="n3" ng:validate="number:100:200" > <br>
   * 
   * @scenario
   * it('should invalidate number', function(){
   *   var n1 = element('.doc-example :input[name=n1]');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n1').enter('1.x');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   *   
   *   var n2 = element('.doc-example :input[name=n2]');
   *   expect(n2.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n2').enter('9');
   *   expect(n2.attr('className')).toMatch(/ng-validation-error/);
   *   
   *   var n3 = element('.doc-example :input[name=n3]');
   *   expect(n3.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n3').enter('201');
   *   expect(n3.attr('className')).toMatch(/ng-validation-error/);
   *   
   * });
   * 
   */
  'number': function(value, min, max) {
    var num = 1 * value;
    if (num == value) {
      if (typeof min != $undefined && num < min) {
        return "Value can not be less than " + min + ".";
      }
      if (typeof min != $undefined && num > max) {
        return "Value can not be greater than " + max + ".";
      }
      return _null;
    } else {
      return "Not a number";
    }
  },

  /**
   * @ngdoc validator
   * @name angular.validator.integer
   * @description
   * Use number validator to restrict the input to integers with an 
   * optional range. (See integer for whole numbers validator).
   * 
   * @param {string} value value to validate
   * @param {int=} [min=MIN_INT] minimum value.
   * @param {int=} [max=MAX_INT] maximum value.
   * @css ng-validation-error
   * 
   * @example
   * Enter integer: <input name="n1" ng:validate="integer" > <br>
   * Enter integer equal or greater than 10: <input name="n2" ng:validate="integer:10" > <br>
   * Enter integer between 100 and 200 (inclusive): <input name="n3" ng:validate="integer:100:200" > <br>
   * 
   * @scenario
   * it('should invalidate integer', function(){
   *   var n1 = element('.doc-example :input[name=n1]');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n1').enter('1.1');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   *   
   *   var n2 = element('.doc-example :input[name=n2]');
   *   expect(n2.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n2').enter('10.1');
   *   expect(n2.attr('className')).toMatch(/ng-validation-error/);
   *   
   *   var n3 = element('.doc-example :input[name=n3]');
   *   expect(n3.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('n3').enter('100.1');
   *   expect(n3.attr('className')).toMatch(/ng-validation-error/);
   *   
   * });
   */
  'integer': function(value, min, max) {
    var numberError = angularValidator['number'](value, min, max);
    if (numberError) return numberError;
    if (!("" + value).match(/^\s*[\d+]*\s*$/) || value != Math.round(value)) {
      return "Not a whole number";
    }
    return _null;
  },

  /**
   * @ngdoc validator
   * @name angular.validator.date
   * @description
   * Use date validator to restrict the user input to a valid date
   * in format in format MM/DD/YYYY.
   * 
   * @param {string} value value to validate
   * @css ng-validation-error
   * 
   * @example
   * Enter valid date:
   * <input name="text" value="1/1/2009" ng:validate="date" >
   * 
   * @scenario
   * it('should invalidate date', function(){
   *   var n1 = element('.doc-example :input');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('text').enter('123/123/123');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'date': function(value) {
    var fields = /^(\d\d?)\/(\d\d?)\/(\d\d\d\d)$/.exec(value);
    var date = fields ? new Date(fields[3], fields[1]-1, fields[2]) : 0;
    return (date &&
            date.getFullYear() == fields[3] &&
            date.getMonth() == fields[1]-1 &&
            date.getDate() == fields[2]) ?
              _null : "Value is not a date. (Expecting format: 12/31/2009).";
  },

  /**
   * @ngdoc validator
   * @name angular.validator.email
   * @description
   * Use email validator if you wist to restrict the user input to a valid email.
   * 
   * @param {string} value value to validate
   * @css ng-validation-error
   * 
   * @example
   * Enter valid email:
   * <input name="text" ng:validate="email" value="me@example.com">
   * 
   * @scenario
   * it('should invalidate email', function(){
   *   var n1 = element('.doc-example :input');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('text').enter('a@b.c');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'email': function(value) {
    if (value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
      return _null;
    }
    return "Email needs to be in username@host.com format.";
  },

  /**
   * @ngdoc validator
   * @name angular.validator.phone
   * @description
   * Use phone validator to restrict the input phone numbers.
   * 
   * @param {string} value value to validate
   * @css ng-validation-error
   * 
   * @example
   * Enter valid phone number:
   * <input name="text" value="1(234)567-8901" ng:validate="phone" >
   * 
   * @scenario
   * it('should invalidate phone', function(){
   *   var n1 = element('.doc-example :input');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('text').enter('+12345678');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'phone': function(value) {
    if (value.match(/^1\(\d\d\d\)\d\d\d-\d\d\d\d$/)) {
      return _null;
    }
    if (value.match(/^\+\d{2,3} (\(\d{1,5}\))?[\d ]+\d$/)) {
      return _null;
    }
    return "Phone number needs to be in 1(987)654-3210 format in North America or +999 (123) 45678 906 internationaly.";
  },

  /**
   * @ngdoc validator
   * @name angular.validator.url
   * @description
   * Use phone validator to restrict the input URLs.
   * 
   * @param {string} value value to validate
   * @css ng-validation-error
   * 
   * @example
   * Enter valid phone number:
   * <input name="text" value="http://example.com/abc.html" size="40" ng:validate="url" >
   * 
   * @scenario
   * it('should invalidate url', function(){
   *   var n1 = element('.doc-example :input');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('text').enter('abc://server/path');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'url': function(value) {
    if (value.match(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/)) {
      return _null;
    }
    return "URL needs to be in http://server[:port]/path format.";
  },

  /**
   * @ngdoc validator
   * @name angular.validator.json
   * @description
   * Use json validator if you wish to restrict the user input to a valid JSON.
   * 
   * @param {string} value value to validate
   * @css ng-validation-error
   * 
   * @example
   * <textarea name="json" cols="60" rows="5" ng:validate="json">
   * {name:'abc'}
   * </textarea>
   * 
   * @scenario
   * it('should invalidate json', function(){
   *   var n1 = element('.doc-example :input');
   *   expect(n1.attr('className')).not().toMatch(/ng-validation-error/);
   *   input('json').enter('{name}');
   *   expect(n1.attr('className')).toMatch(/ng-validation-error/);
   * });
   * 
   */
  'json': function(value) {
    try {
      fromJson(value);
      return _null;
    } catch (e) {
      return e.toString();
    }
  },

  /**
   * @ngdoc validator
   * @name angular.validator.asynchronous
   * @description
   * Use asynchronous validator if the validation can not be computed 
   * immediately, but is provided through a callback. The widget 
   * automatically shows a spinning indicator while the validity of 
   * the widget is computed. This validator caches the result.
   * 
   * @param {string} value value to validate
   * @param {function(inputToValidate,validationDone)} validate function to call to validate the state
   *         of the input.
   * @param {function(data)=} [update=noop] function to call when state of the 
   *    validator changes
   *    
   * @paramDescription
   * The `validate` function (specified by you) is called as 
   * `validate(inputToValidate, validationDone)`:
   * 
   *    * `inputToValidate`: value of the input box.
   *    * `validationDone`: `function(error, data){...}`
   *       * `error`: error text to display if validation fails
   *       * `data`: data object to pass to update function
   *       
   * The `update` function is optionally specified by you and is
   * called by <angular/> on input change. Since the 
   * asynchronous validator caches the results, the update 
   * function can be called without a call to `validate` 
   * function. The function is called as `update(data)`:
   * 
   *    * `data`: data object as passed from validate function
   * 
   * @css ng-input-indicator-wait, ng-validation-error
   * 
   * @example
   * <script>
   *   function myValidator(inputToValidate, validationDone) {
   *    setTimeout(function(){
   *      validationDone(inputToValidate.length % 2);
   *    }, 500);
   *  }
   * </script>
   *  This input is validated asynchronously:
   *  <input name="text" ng:validate="asynchronous:$window.myValidator">
   * 
   * @scenario
   * it('should change color in delayed way', function(){
   *   var textBox = element('.doc-example :input');
   *   expect(textBox.attr('className')).not().toMatch(/ng-input-indicator-wait/);
   *   expect(textBox.attr('className')).not().toMatch(/ng-validation-error/);
   *   
   *   input('text').enter('X');
   *   expect(textBox.attr('className')).toMatch(/ng-input-indicator-wait/);
   *   
   *   pause(.6);
   *   
   *   expect(textBox.attr('className')).not().toMatch(/ng-input-indicator-wait/);
   *   expect(textBox.attr('className')).toMatch(/ng-validation-error/);
   *   
   * });
   * 
   */
  /*
   * cache is attached to the element
   * cache: {
   *   inputs : {
   *     'user input': {
   *        response: server response,
   *        error: validation error
   *     },
   *   current: 'current input'
   * }
   *
   */
  'asynchronous': function(input, asynchronousFn, updateFn) {
    if (!input) return;
    var scope = this;
    var element = scope.$element;
    var cache = element.data('$asyncValidator');
    if (!cache) {
      element.data('$asyncValidator', cache = {inputs:{}});
    }

    cache.current = input;

    var inputState = cache.inputs[input];
    if (!inputState) {
      cache.inputs[input] = inputState = { inFlight: true };
      scope.$invalidWidgets.markInvalid(scope.$element);
      element.addClass('ng-input-indicator-wait');
      asynchronousFn(input, function(error, data) {
        inputState.response = data;
        inputState.error = error;
        inputState.inFlight = false;
        if (cache.current == input) {
          element.removeClass('ng-input-indicator-wait');
          scope.$invalidWidgets.markValid(element);
        }
        element.data('$validate')();
        scope.$root.$eval();
      });
    } else if (inputState.inFlight) {
      // request in flight, mark widget invalid, but don't show it to user
      scope.$invalidWidgets.markInvalid(scope.$element);
    } else {
      (updateFn||noop)(inputState.response);
    }
    return inputState.error;
  }

});
var URL_MATCH = /^(file|ftp|http|https):\/\/(\w+:{0,1}\w*@)?([\w\.-]*)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,
    HASH_MATCH = /^([^\?]*)?(\?([^\?]*))?$/,
    DEFAULT_PORTS = {'http': 80, 'https': 443, 'ftp':21},
    EAGER = 'eager',
    EAGER_PUBLISHED = EAGER + '-published';

function angularServiceInject(name, fn, inject, eager) {
  angularService(name, fn, {$inject:inject, $creation:eager});
}

angularServiceInject("$window", bind(window, identity, window), [], EAGER_PUBLISHED);
angularServiceInject("$document", function(window){
  return jqLite(window.document);
}, ['$window'], EAGER_PUBLISHED);

angularServiceInject("$location", function(browser) {
  var scope = this,
      location = {toString:toString, update:update, updateHash: updateHash},
      lastBrowserUrl = browser.getUrl(),
      lastLocationHref,
      lastLocationHash;

  browser.addPollFn(function() {
    if (lastBrowserUrl != browser.getUrl()) {
      update(lastBrowserUrl = browser.getUrl());
      updateLastLocation();
      scope.$eval();
    }
  });

  this.$onEval(PRIORITY_FIRST, updateBrowser);
  this.$onEval(PRIORITY_LAST, updateBrowser);

  update(lastBrowserUrl);
  updateLastLocation();

  return location;

  // PUBLIC METHODS

  /**
   * Update location object
   * Does not immediately update the browser
   * Browser is updated at the end of $eval()
   *
   * @example
   * scope.$location.update('http://www.angularjs.org/path#hash?search=x');
   * scope.$location.update({host: 'www.google.com', protocol: 'https'});
   * scope.$location.update({hashPath: '/path', hashSearch: {a: 'b', x: true}});
   *
   * @param {(string|Object)} href Full href as a string or hash object with properties
   */
  function update(href) {
    if (isString(href)) {
      extend(location, parseHref(href));
    } else {
      if (isDefined(href.hash)) {
        extend(href, parseHash(href.hash));
      }

      extend(location, href);

      if (isDefined(href.hashPath || href.hashSearch)) {
        location.hash = composeHash(location);
      }

      location.href = composeHref(location);
    }
  }

  /**
   * Update location hash
   * @see update()
   *
   * @example
   * scope.$location.updateHash('/hp')
   *   ==> update({hashPath: '/hp'})
   *
   * scope.$location.updateHash({a: true, b: 'val'})
   *   ==> update({hashSearch: {a: true, b: 'val'}})
   *
   * scope.$location.updateHash('/hp', {a: true})
   *   ==> update({hashPath: '/hp', hashSearch: {a: true}})
   *
   * @param {(string|Object)} path A hashPath or hashSearch object
   * @param {Object=} search A hashSearch object
   */
  function updateHash(path, search) {
    var hash = {};

    if (isString(path)) {
      hash.hashPath = path;
      if (isDefined(search))
        hash.hashSearch = search;
    } else
      hash.hashSearch = path;

    update(hash);
  }

  /**
   * Returns string representation - href
   *
   * @return {string} Location's href property
   */
  function toString() {
    updateLocation();
    return location.href;
  }

  // INNER METHODS

  /**
   * Update location object
   *
   * User is allowed to change properties, so after property change,
   * location object is not in consistent state.
   *
   * @example
   * scope.$location.href = 'http://www.angularjs.org/path#a/b'
   * immediately after this call, other properties are still the old ones...
   *
   * This method checks the changes and update location to the consistent state
   */
  function updateLocation() {
    if (location.href == lastLocationHref) {
      if (location.hash == lastLocationHash) {
        location.hash = composeHash(location);
      }
      location.href = composeHref(location);
    }
    update(location.href);
  }

  /**
   * Update information about last location
   */
  function updateLastLocation() {
    lastLocationHref = location.href;
    lastLocationHash = location.hash;
  }

  /**
   * If location has changed, update the browser
   * This method is called at the end of $eval() phase
   */
  function updateBrowser() {
    updateLocation();

    if (location.href != lastLocationHref) {    	
      browser.setUrl(lastBrowserUrl = location.href);
      updateLastLocation();
    }
  }

  /**
   * Compose href string from a location object
   *
   * @param {Object} loc The location object with all properties
   * @return {string} Composed href
   */
  function composeHref(loc) {
    var url = toKeyValue(loc.search);
    var port = (loc.port == DEFAULT_PORTS[loc.protocol] ? _null : loc.port);

    return loc.protocol  + '://' + loc.host +
          (port ? ':' + port : '') + loc.path +
          (url ? '?' + url : '') + (loc.hash ? '#' + loc.hash : '');
  }

  /**
   * Compose hash string from location object
   *
   * @param {Object} loc Object with hashPath and hashSearch properties
   * @return {string} Hash string
   */
  function composeHash(loc) {
    var hashSearch = toKeyValue(loc.hashSearch);
    return escape(loc.hashPath) + (hashSearch ? '?' + hashSearch : '');
  }

  /**
   * Parse href string into location object
   *
   * @param {string} href
   * @return {Object} The location object
   */
  function parseHref(href) {
    var loc = {};
    var match = URL_MATCH.exec(href);

    if (match) {
      loc.href = href.replace(/#$/, '');
      loc.protocol = match[1];
      loc.host = match[3] || '';
      loc.port = match[5] || DEFAULT_PORTS[loc.protocol] || _null;
      loc.path = match[6] || '';
      loc.search = parseKeyValue(match[8]);
      loc.hash = match[10] || '';

      extend(loc, parseHash(loc.hash));
    }

    return loc;
  }

  /**
   * Parse hash string into object
   *
   * @param {string} hash
   */
  function parseHash(hash) {
    var h = {};
    var match = HASH_MATCH.exec(hash);

    if (match) {
      h.hash = hash;
      h.hashPath = unescape(match[1] || '');
      h.hashSearch = parseKeyValue(match[3]);
    }

    return h;
  }
}, ['$browser'], EAGER_PUBLISHED);


angularServiceInject("$log", function($window){
  var console = $window.console || {log: noop, warn: noop, info: noop, error: noop},
      log = console.log || noop;
  return {
    log: bind(console, log),
    warn: bind(console, console.warn || log),
    info: bind(console, console.info || log),
    error: bind(console, console.error || log)
  };
}, ['$window'], EAGER_PUBLISHED);

angularServiceInject('$exceptionHandler', function($log){
  return function(e) {
    $log.error(e);
  };
}, ['$log'], EAGER_PUBLISHED);

angularServiceInject("$hover", function(browser, document) {
  var tooltip, self = this, error, width = 300, arrowWidth = 10, body = jqLite(document[0].body);
  browser.hover(function(element, show){
    if (show && (error = element.attr(NG_EXCEPTION) || element.attr(NG_VALIDATION_ERROR))) {
      if (!tooltip) {
        tooltip = {
            callout: jqLite('<div id="ng-callout"></div>'),
            arrow: jqLite('<div></div>'),
            title: jqLite('<div class="ng-title"></div>'),
            content: jqLite('<div class="ng-content"></div>')
        };
        tooltip.callout.append(tooltip.arrow);
        tooltip.callout.append(tooltip.title);
        tooltip.callout.append(tooltip.content);
        body.append(tooltip.callout);
      }
      var docRect = body[0].getBoundingClientRect(),
          elementRect = element[0].getBoundingClientRect(),
          leftSpace = docRect.right - elementRect.right - arrowWidth;
      tooltip.title.text(element.hasClass("ng-exception") ? "EXCEPTION:" : "Validation error...");
      tooltip.content.text(error);
      if (leftSpace < width) {
        tooltip.arrow.addClass('ng-arrow-right');
        tooltip.arrow.css({left: (width + 1)+'px'});
        tooltip.callout.css({
          position: 'fixed',
          left: (elementRect.left - arrowWidth - width - 4) + "px",
          top: (elementRect.top - 3) + "px",
          width: width + "px"
        });
      } else {
        tooltip.arrow.addClass('ng-arrow-left');
        tooltip.callout.css({
          position: 'fixed',
          left: (elementRect.right + arrowWidth) + "px",
          top: (elementRect.top - 3) + "px",
          width: width + "px"
        });
      }
    } else if (tooltip) {
      tooltip.callout.remove();
      tooltip = _null;
    }
  });
}, ['$browser', '$document'], EAGER);


/* Keeps references to all invalid widgets found during validation. Can be queried to find if there
 * are invalid widgets currently displayed
 */
angularServiceInject("$invalidWidgets", function(){
  var invalidWidgets = [];


  /** Remove an element from the array of invalid widgets */
  invalidWidgets.markValid = function(element){
    var index = indexOf(invalidWidgets, element);
    if (index != -1)
      invalidWidgets.splice(index, 1);
  };


  /** Add an element to the array of invalid widgets */
  invalidWidgets.markInvalid = function(element){
    var index = indexOf(invalidWidgets, element);
    if (index === -1)
      invalidWidgets.push(element);
  };


  /** Return count of all invalid widgets that are currently visible */
  invalidWidgets.visible = function() {
    var count = 0;
    foreach(invalidWidgets, function(widget){
      count = count + (isVisible(widget) ? 1 : 0);
    });
    return count;
  };


  /* At the end of each eval removes all invalid widgets that are not part of the current DOM. */
  this.$onEval(PRIORITY_LAST, function() {
    for(var i = 0; i < invalidWidgets.length;) {
      var widget = invalidWidgets[i];
      if (isOrphan(widget[0])) {
        invalidWidgets.splice(i, 1);
        if (widget.dealoc) widget.dealoc();
      } else {
        i++;
      }
    }
  });


  /**
   * Traverses DOM element's (widget's) parents and considers the element to be an orphant if one of
   * it's parents isn't the current window.document.
   */
  function isOrphan(widget) {
    if (widget == window.document) return false;
    var parent = widget.parentNode;
    return !parent || isOrphan(parent);
  }

  return invalidWidgets;
}, [], EAGER_PUBLISHED);



function switchRouteMatcher(on, when, dstName) {
  var regex = '^' + when.replace(/[\.\\\(\)\^\$]/g, "\$1") + '$',
      params = [],
      dst = {};
  foreach(when.split(/\W/), function(param){
    if (param) {
      var paramRegExp = new RegExp(":" + param + "([\\W])");
      if (regex.match(paramRegExp)) {
        regex = regex.replace(paramRegExp, "([^\/]*)$1");
        params.push(param);
      }
    }
  });
  var match = on.match(new RegExp(regex));
  if (match) {
    foreach(params, function(name, index){
      dst[name] = match[index + 1];
    });
    if (dstName) this.$set(dstName, dst);
  }
  return match ? dst : _null;
}

angularServiceInject('$route', function(location){
  var routes = {},
      onChange = [],
      matcher = switchRouteMatcher,
      parentScope = this,
      dirty = 0,
      $route = {
        routes: routes,
        onChange: bind(onChange, onChange.push),
        when:function (path, params){
          if (angular.isUndefined(path)) return routes;
          var route = routes[path];
          if (!route) route = routes[path] = {};
          if (params) angular.extend(route, params);
          dirty++;
          return route;
        }
      };
  function updateRoute(){
    var childScope;
    $route.current = _null;
    angular.foreach(routes, function(routeParams, route) {
      if (!childScope) {
        var pathParams = matcher(location.hashPath, route);
        if (pathParams) {
          childScope = angular.scope(parentScope);
          $route.current = angular.extend({}, routeParams, {
            scope: childScope,
            params: angular.extend({}, location.hashSearch, pathParams)
          });
        }
      }
    });
    angular.foreach(onChange, parentScope.$tryEval);
    if (childScope) {
      childScope.$become($route.current.controller);
    }
  }
  this.$watch(function(){return dirty + location.hash;}, updateRoute);
  return $route;
}, ['$location'], EAGER_PUBLISHED);

angularServiceInject('$xhr', function($browser, $error, $log){
  var self = this;
  return function(method, url, post, callback){
    if (isFunction(post)) {
      callback = post;
      post = _null;
    }
    if (post && isObject(post)) {
      post = toJson(post);
    }
    $browser.xhr(method, url, post, function(code, response){
      try {
        if (isString(response) && /^\s*[\[\{]/.exec(response) && /[\}\]]\s*$/.exec(response)) {
          response = fromJson(response);
        }
        if (code == 200) {
          callback(code, response);
        } else {
          $error(
            {method: method, url:url, data:post, callback:callback},
            {status: code, body:response});
        }
      } catch (e) {
        $log.error(e);
      } finally {
        self.$eval();
      }
    });
  };
}, ['$browser', '$xhr.error', '$log']);

angularServiceInject('$xhr.error', function($log){
  return function(request, response){
    $log.error('ERROR: XHR: ' + request.url, request, response);
  };
}, ['$log']);

angularServiceInject('$xhr.bulk', function($xhr, $error, $log){
  var requests = [],
      scope = this;
  function bulkXHR(method, url, post, callback) {
    if (isFunction(post)) {
      callback = post;
      post = _null;
    }
    var currentQueue;
    foreach(bulkXHR.urls, function(queue){
      if (isFunction(queue.match) ? queue.match(url) : queue.match.exec(url)) {
        currentQueue = queue;
      }
    });
    if (currentQueue) {
      if (!currentQueue.requests) currentQueue.requests = [];
      currentQueue.requests.push({method: method, url: url, data:post, callback:callback});
    } else {
      $xhr(method, url, post, callback);
    }
  }
  bulkXHR.urls = {};
  bulkXHR.flush = function(callback){
    foreach(bulkXHR.urls, function(queue, url){
      var currentRequests = queue.requests;
      if (currentRequests && currentRequests.length) {
        queue.requests = [];
        queue.callbacks = [];
        $xhr('POST', url, {requests:currentRequests}, function(code, response){
          foreach(response, function(response, i){
            try {
              if (response.status == 200) {
                (currentRequests[i].callback || noop)(response.status, response.response);
              } else {
                $error(currentRequests[i], response);
              }
            } catch(e) {
              $log.error(e);
            }
          });
          (callback || noop)();
        });
        scope.$eval();
      }
    });
  };
  this.$onEval(PRIORITY_LAST, bulkXHR.flush);
  return bulkXHR;
}, ['$xhr', '$xhr.error', '$log']);

angularServiceInject('$xhr.cache', function($xhr){
  var inflight = {}, self = this;
  function cache(method, url, post, callback, verifyCache){
    if (isFunction(post)) {
      callback = post;
      post = _null;
    }
    if (method == 'GET') {
      var data;
      if (data = cache.data[url]) {
        callback(200, copy(data.value));
        if (!verifyCache)
          return;
      }

      if (data = inflight[url]) {
        data.callbacks.push(callback);
      } else {
        inflight[url] = {callbacks: [callback]};
        cache.delegate(method, url, post, function(status, response){
          if (status == 200)
            cache.data[url] = { value: response };
          var callbacks = inflight[url].callbacks;
          delete inflight[url];
          foreach(callbacks, function(callback){
            try {
              (callback||noop)(status, copy(response));
            } catch(e) {
              self.$log.error(e);
            }
          });
        });
      }

    } else {
      cache.data = {};
      cache.delegate(method, url, post, callback);
    }
  }
  cache.data = {};
  cache.delegate = $xhr;
  return cache;
}, ['$xhr.bulk']);

angularServiceInject('$resource', function($xhr){
  var resource = new ResourceFactory($xhr);
  return bind(resource, resource.route);
}, ['$xhr.cache']);


/**
 * $cookies service provides read/write access to the browser cookies. Currently only session
 * cookies are supported.
 *
 * Only a simple Object is exposed and by adding or removing properties to/from this object, new
 * cookies are created or deleted from the browser at the end of the current eval.
 */
angularServiceInject('$cookies', function($browser) {
  var rootScope = this,
      cookies = {},
      lastCookies = {},
      lastBrowserCookies;

  //creates a poller fn that copies all cookies from the $browser to service & inits the service
  $browser.addPollFn(function() {
    var currentCookies = $browser.cookies();
    if (lastBrowserCookies != currentCookies) { //relies on browser.cookies() impl
      lastBrowserCookies = currentCookies;
      copy(currentCookies, lastCookies);
      copy(currentCookies, cookies);
      rootScope.$eval();
    }
  })();

  //at the end of each eval, push cookies
  this.$onEval(PRIORITY_LAST, push);

  return cookies;


  /**
   * Pushes all the cookies from the service to the browser and verifies if all cookies were stored.
   */
  function push(){
    var name,
        browserCookies,
        updated;

    //delete any cookies deleted in $cookies
    for (name in lastCookies) {
      if (isUndefined(cookies[name])) {
        $browser.cookies(name, _undefined);
      }
    }

    //update all cookies updated in $cookies
    for(name in cookies) {
      if (cookies[name] !== lastCookies[name]) {
        $browser.cookies(name, cookies[name]);
        updated = true;
      }
    }

    //verify what was actually stored
    if (updated){
      updated = !updated;
      browserCookies = $browser.cookies();

      for (name in cookies) {
        if (cookies[name] !== browserCookies[name]) {
          //delete or reset all cookies that the browser dropped from $cookies
          if (isUndefined(browserCookies[name])) {
            delete cookies[name];
          } else {
            cookies[name] = browserCookies[name];
          }
          updated = true;
        }

      }

      if (updated) {
        rootScope.$eval();
      }
    }
  }
}, ['$browser'], EAGER_PUBLISHED);


/**
 * $cookieStore provides a key-value (string-object) storage that is backed by session cookies.
 * Objects put or retrieved from this storage are automatically serialized or deserialized.
 */
angularServiceInject('$cookieStore', function($store) {

  return {
    get: function(/**string*/key) {
      return fromJson($store[key]);
    },

    put: function(/**string*/key, /**Object*/value) {
      $store[key] = toJson(value);
    },

    remove: function(/**string*/key) {
      delete $store[key];
    }
  };

}, ['$cookies']);
/**
 * @ngdoc directive
 * @name angular.directive.ng:init
 *
 * @description
 * `ng:init` attribute allows the for initialization tasks to be executed 
 *  before the template enters execution mode during bootstrap.
 *
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @example
    <div ng:init="greeting='Hello'; person='World'">
      {{greeting}} {{person}}!
    </div>
 *
 * @scenario
   it('should check greeting', function(){
     expect(binding('greeting')).toBe('Hello');
     expect(binding('person')).toBe('World');
   });
 */
angularDirective("ng:init", function(expression){
  return function(element){
    this.$tryEval(expression, element);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:controller
 *
 * @description
 * To support the Model-View-Controller design pattern, it is possible 
 * to assign behavior to a scope through `ng:controller`. The scope is 
 * the MVC model. The HTML (with data bindings) is the MVC view. 
 * The `ng:controller` directive specifies the MVC controller class
 *
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @example
    <script type="text/javascript">
      function SettingsController() {
        this.name = "John Smith";
        this.contacts = [
          {type:'phone', value:'408 555 1212'},
          {type:'email', value:'john.smith@example.org'} ];
      }
      SettingsController.prototype = {
       greet: function(){
         alert(this.name);
       },
       addContact: function(){
         this.contacts.push({type:'email', value:'yourname@example.org'});
       },
       removeContact: function(contactToRemove) {
         angular.Array.remove(this.contacts, contactToRemove);
       },
       clearContact: function(contact) {
         contact.type = 'phone';
         contact.value = '';
       }
      };
    </script>
    <div ng:controller="SettingsController">
      Name: <input type="text" name="name"/> 
      [ <a href="" ng:click="greet()">greet</a> ]<br/>
      Contact:
      <ul>
        <li ng:repeat="contact in contacts">
          <select name="contact.type">
             <option>phone</option>
             <option>email</option>
          </select>
          <input type="text" name="contact.value"/>
          [ <a href="" ng:click="clearContact(contact)">clear</a> 
          | <a href="" ng:click="removeContact(contact)">X</a> ]
        </li>
        <li>[ <a href="" ng:click="addContact()">add</a> ]</li>
     </ul>
    </div>
 *
 * @scenario
   it('should check controller', function(){
     expect(element('.doc-example-live div>:input').val()).toBe('John Smith');
     expect(element('.doc-example-live li[ng\\:repeat-index="0"] input').val()).toBe('408 555 1212');
     expect(element('.doc-example-live li[ng\\:repeat-index="1"] input').val()).toBe('john.smith@example.org');
     element('.doc-example-live li:first a:contains("clear")').click();
     expect(element('.doc-example-live li:first input').val()).toBe('');
     element('.doc-example-live li:last a:contains("add")').click();
     expect(element('.doc-example-live li[ng\\:repeat-index="2"] input').val()).toBe('yourname@example.org');
   });
 */
angularDirective("ng:controller", function(expression){
  this.scope(true);
  return function(element){
    var controller = getter(window, expression, true) || getter(this, expression, true);
    if (!controller)
      throw "Can not find '"+expression+"' controller.";
    if (!isFunction(controller))
      throw "Reference '"+expression+"' is not a class.";
    this.$become(controller);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:eval
 *
 * @description
 * The `ng:eval` allows you to execute a binding which has side effects 
 * without displaying the result to the user.
 *
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * Notice that `{{` `obj.multiplied = obj.a * obj.b` `}}` has a side effect of assigning 
 * a value to `obj.multiplied` and displaying the result to the user. Sometimes, 
 * however, it is desirable to execute a side effect without showing the value to 
 * the user. In such a case `ng:eval` allows you to execute code without updating 
 * the display.
 * 
 * @example
 *   <input name="obj.a" value="6" > 
 *     * <input name="obj.b" value="2"> 
 *     = {{obj.multiplied = obj.a * obj.b}} <br>
 *   <span ng:eval="obj.divide = obj.a / obj.b"></span>
 *   <span ng:eval="obj.updateCount = 1 + (obj.updateCount||0)"></span>
 *   <tt>obj.divide = {{obj.divide}}</tt><br/>
 *   <tt>obj.updateCount = {{obj.updateCount}}</tt>
 *
 * @scenario
   it('should check eval', function(){
     expect(binding('obj.divide')).toBe('3');
     expect(binding('obj.updateCount')).toBe('2');
     input('obj.a').enter('12');
     expect(binding('obj.divide')).toBe('6');
     expect(binding('obj.updateCount')).toBe('3');
   });
 */
angularDirective("ng:eval", function(expression){
  return function(element){
    this.$onEval(expression, element);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:bind
 *
 * @description
 * The `ng:bind` attribute asks <angular/> to replace the text content of this 
 * HTML element with the value of the given expression and kept it up to 
 * date when the expression's value changes. Usually you just write 
 * {{expression}} and let <angular/> compile it into 
 * <span ng:bind="expression"></span> at bootstrap time.
 * 
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * Try it here: enter text in text box and watch the greeting change.
 * @example
 * Enter name: <input type="text" name="name" value="Whirled">. <br>
 * Hello <span ng:bind="name" />!
 * 
 * @scenario
   it('should check ng:bind', function(){
     expect(using('.doc-example-live').binding('name')).toBe('Whirled');
     using('.doc-example-live').input('name').enter('world');
     expect(using('.doc-example-live').binding('name')).toBe('world');
   });
 */
angularDirective("ng:bind", function(expression, element){
  element.addClass('ng-binding');
  return function(element) {
    var lastValue = noop, lastError = noop;
    this.$onEval(function() {
      var error, value, html, isHtml, isDomElement,
          oldElement = this.hasOwnProperty($$element) ? this.$element : _undefined;
      this.$element = element;
      value = this.$tryEval(expression, function(e){
        error = toJson(e);
      });
      this.$element = oldElement;
      // If we are HTML than save the raw HTML data so that we don't
      // recompute sanitization since it is expensive.
      // TODO: turn this into a more generic way to compute this
      if (isHtml = (value instanceof HTML))
        value = (html = value).html;
      if (lastValue === value && lastError == error) return;
      isDomElement = isElement(value);
      if (!isHtml && !isDomElement && isObject(value)) {
        value = toJson(value);
      }
      if (value != lastValue || error != lastError) {
        lastValue = value;
        lastError = error;
        elementError(element, NG_EXCEPTION, error);
        if (error) value = error;
        if (isHtml) {
          element.html(html.get());
        } else if (isDomElement) {
          element.html('');
          element.append(value);
        } else {
          element.text(value === _undefined ? '' : value);
        }
      }
    }, element);
  };
});

var bindTemplateCache = {};
function compileBindTemplate(template){
  var fn = bindTemplateCache[template];
  if (!fn) {
    var bindings = [];
    foreach(parseBindings(template), function(text){
      var exp = binding(text);
      bindings.push(exp ? function(element){
        var error, value = this.$tryEval(exp, function(e){
          error = toJson(e);
        });
        elementError(element, NG_EXCEPTION, error);
        return error ? error : value;
      } : function() {
        return text;
      });
    });
    bindTemplateCache[template] = fn = function(element){
      var parts = [], self = this,
         oldElement = this.hasOwnProperty($$element) ? self.$element : _undefined;
      self.$element = element;
      for ( var i = 0; i < bindings.length; i++) {
        var value = bindings[i].call(self, element);
        if (isElement(value))
          value = '';
        else if (isObject(value))
          value = toJson(value, true);
        parts.push(value);
      }
      self.$element = oldElement;
      return parts.join('');
    };
  }
  return fn;
}

/**
 * @ngdoc directive
 * @name angular.directive.ng:bind-template
 *
 * @description
 * The `ng:bind-template` attribute specifies that the element 
 * text should be replaced with the template in ng:bind-template. 
 * Unlike ng:bind the ng:bind-template can contain multiple `{{` `}}` 
 * expressions. (This is required since some HTML elements 
 * can not have SPAN elements such as TITLE, or OPTION to name a few.
 * 
 * @element ANY
 * @param {string} template of form
 *   <tt>{{</tt> <tt>expression</tt> <tt>}}</tt> to eval.
 *
 * @exampleDescription
 * Try it here: enter text in text box and watch the greeting change.
 * @example
    Salutation: <input type="text" name="salutation" value="Hello"><br/>
    Name: <input type="text" name="name" value="World"><br/>
    <pre ng:bind-template="{{salutation}} {{name}}!"></pre>
 * 
 * @scenario
   it('should check ng:bind', function(){
     expect(using('.doc-example-live').binding('{{salutation}} {{name}}')).
       toBe('Hello World!');
     using('.doc-example-live').input('salutation').enter('Greetings');
     using('.doc-example-live').input('name').enter('user');
     expect(using('.doc-example-live').binding('{{salutation}} {{name}}')).
       toBe('Greetings user!');
   });
 */
angularDirective("ng:bind-template", function(expression, element){
  element.addClass('ng-binding');
  var templateFn = compileBindTemplate(expression);
  return function(element) {
    var lastValue;
    this.$onEval(function() {
      var value = templateFn.call(this, element);
      if (value != lastValue) {
        element.text(value);
        lastValue = value;
      }
    }, element);
  };
});

var REMOVE_ATTRIBUTES = {
  'disabled':'disabled',
  'readonly':'readOnly',
  'checked':'checked'
};
/**
 * @ngdoc directive
 * @name angular.directive.ng:bind-attr
 *
 * @description
 * The `ng:bind-attr` attribute specifies that the element attributes 
 * which should be replaced by the expression in it. Unlike `ng:bind` 
 * the `ng:bind-attr` contains a JSON key value pairs representing 
 * which attributes need to be changed. You don’t usually write the 
 * `ng:bind-attr` in the HTML since embedding 
 * <tt ng:non-bindable>{{expression}}</tt> into the 
 * attribute directly is the preferred way. The attributes get
 * translated into <span ng:bind-attr="{attr:expression}"/> at
 * bootstrap time.
 * 
 * This HTML snippet is preferred way of working with `ng:bind-attr`
 * <pre>
 *   <a href="http://www.google.com/search?q={{query}}">Google</a>
 * </pre>
 * 
 * The above gets translated to bellow during bootstrap time.
 * <pre>
 *   <a ng:bind-attr='{"href":"http://www.google.com/search?q={{query}}"}'>Google</a>
 * </pre>
 * 
 * @element ANY
 * @param {string} attribute_json a JSON key-value pairs representing 
 *    the attributes to replace. Each key matches the attribute 
 *    which needs to be replaced. Each value is a text template of 
 *    the attribute with embedded 
 *    <tt ng:non-bindable>{{expression}}</tt>s. Any number of 
 *    key-value pairs can be specified.
 *
 * @exampleDescription
 * Try it here: enter text in text box and click Google.
 * @example
    Google for: 
    <input type="text" name="query" value="AngularJS"/> 
    <a href="http://www.google.com/search?q={{query}}">Google</a>
 * 
 * @scenario
   it('should check ng:bind-attr', function(){
     expect(using('.doc-example-live').element('a').attr('href')).
       toBe('http://www.google.com/search?q=AngularJS');
     using('.doc-example-live').input('query').enter('google');
     expect(using('.doc-example-live').element('a').attr('href')).
       toBe('http://www.google.com/search?q=google');
   });
 */
angularDirective("ng:bind-attr", function(expression){
  return function(element){
    var lastValue = {};
    var updateFn = element.parent().data('$update');
    this.$onEval(function(){
      var values = this.$eval(expression);
      for(var key in values) {
        var value = compileBindTemplate(values[key]).call(this, element),
            specialName = REMOVE_ATTRIBUTES[lowercase(key)];
        if (lastValue[key] !== value) {
          lastValue[key] = value;
          if (specialName) {
            if (element[specialName] = toBoolean(value)) {
              element.attr(specialName, value);
            } else {
              element.removeAttr(key);
            }
            (element.data('$validate')||noop)();
          } else {
            element.attr(key, value);
          }
          this.$postEval(updateFn);
        }
      }
    }, element);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:non-bindable
 *
 * @description
 * Sometimes it is necessary to write code which looks like 
 * bindings but which should be left alone by <angular/>. 
 * Use `ng:non-bindable` to ignore a chunk of HTML.
 * 
 * @element ANY
 * @param {string} ignore 
 *
 * @exampleDescription
 * In this example there are two location where 
 * <tt ng:non-bindable>{{1 + 2}}</tt> is present, but the one 
 * wrapped in `ng:non-bindable` is left alone
 * @example
    <div>Normal: {{1 + 2}}</div>
    <div ng:non-bindable>Ignored: {{1 + 2}}</div>
 * 
 * @scenario
   it('should check ng:non-bindable', function(){
     expect(using('.doc-example-live').binding('1 + 2')).toBe('3');
     expect(using('.doc-example-live').element('div:last').text()).
       toMatch(/1 \+ 2/);
   });
 */
angularWidget("@ng:non-bindable", noop);

/**
 * @ngdoc directive
 * @name angular.directive.ng:repeat
 *
 * @description
 * `ng:repeat` instantiates a template once per item from a 
 * collection. The collection is enumerated with 
 * `ng:repeat-index` attribute starting from 0. Each template 
 * instance gets its own scope where the given loop variable 
 * is set to the current collection item and `$index` is set 
 * to the item index or key.
 * 
 * NOTE: `ng:repeat` looks like a directive, but is actually a 
 * attribute widget.
 * 
 * @element ANY
 * @param {repeat} repeat_expression to itterate over.
 * 
 *   * `variable in expression`, where variable is the user 
 *     defined loop variable and expression is a scope expression 
 *     giving the collection to enumerate. For example: 
 *     `track in cd.tracks`.
 *   * `(key, value) in expression`, where key and value can 
 *     be any user defined identifiers, and expression is the 
 *     scope expression giving the collection to enumerate. 
 *     For example: `(name, age) in {'adam':10, 'amalie':12}`.
 *
 * Special properties set on the local scope:
 *   * {number} $index - iterator offset of the repeated element (0..length-1)
 *   * {string} $position - position of the repeated element in the iterator ('first', 'middle', 'last')
 *
 * @exampleDescription
 * This example initializes the scope to a list of names and 
 * than uses `ng:repeat` to display every person.
 * @example
    <div ng:init="friends = [{name:'John', age:25}, {name:'Mary', age:28}]">
      I have {{friends.length}} friends. They are:
      <ul>
        <li ng:repeat="friend in friends"> 
          [{{$index + 1}}] {{friend.name}} who is {{friend.age}} years old.
        </li>
      </ul>
    </div>
 * @scenario
   it('should check ng:repeat', function(){
     var r = using('.doc-example-live').repeater('ul li'); 
     expect(r.count()).toBe(2);
     expect(r.row(0)).toEqual(["1","John","25"]);
     expect(r.row(1)).toEqual(["2","Mary","28"]);
   });
 */
angularWidget("@ng:repeat", function(expression, element){
  element.removeAttr('ng:repeat');
  element.replaceWith(this.comment("ng:repeat: " + expression));
  var template = this.compile(element);
  return function(reference){
    var match = expression.match(/^\s*(.+)\s+in\s+(.*)\s*$/),
        lhs, rhs, valueIdent, keyIdent;
    if (! match) {
      throw "Expected ng:repeat in form of 'item in collection' but got '" +
      expression + "'.";
    }
    lhs = match[1];
    rhs = match[2];
    match = lhs.match(/^([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\)$/);
    if (!match) {
      throw "'item' in 'item in collection' should be identifier or (key, value) but got '" +
      keyValue + "'.";
    }
    valueIdent = match[3] || match[1];
    keyIdent = match[2];

    var children = [], currentScope = this;
    this.$onEval(function(){
      var index = 0,
          childCount = children.length,
          lastElement = reference,
          collection = this.$tryEval(rhs, reference), 
          is_array = isArray(collection),
          collectionLength = 0,
          childScope,
          key;

      if (is_array) {
        collectionLength = collection.length;
      } else {
        for (key in collection)
          if (collection.hasOwnProperty(key))
            collectionLength++;
      }

      for (key in collection) {
        if (!is_array || collection.hasOwnProperty(key)) {
          if (index < childCount) {
            // reuse existing child
            childScope = children[index];
            childScope[valueIdent] = collection[key];
            if (keyIdent) childScope[keyIdent] = key;
          } else {
            // grow children
            childScope = template(quickClone(element), createScope(currentScope));
            childScope[valueIdent] = collection[key];
            if (keyIdent) childScope[keyIdent] = key;
            lastElement.after(childScope.$element);
            childScope.$index = index;
            childScope.$position = index == 0 ?
                                      'first' :
                                      (index == collectionLength - 1 ? 'last' : 'middle');
            childScope.$element.attr('ng:repeat-index', index);
            childScope.$init();
            children.push(childScope);
          }
          childScope.$eval();
          lastElement = childScope.$element;
          index ++;
        }
      }
      // shrink children
      while(children.length > index) {
        children.pop().$element.remove();
      }
    }, reference);
  };
});


/**
 * @ngdoc directive
 * @name angular.directive.ng:click
 *
 * @description
 * The ng:click allows you to specify custom behavior when 
 * element is clicked.
 * 
 * @element ANY
 * @param {expression} expression to eval upon click.
 *
 * @example
    <button ng:click="count = count + 1" ng:init="count=0">
      Increment
    </button>
    count: {{count}}
 * @scenario
   it('should check ng:click', function(){
     expect(binding('count')).toBe('0');
     element('.doc-example-live :button').click();
     expect(binding('count')).toBe('1');
   });
 */
/*
 * A directive that allows creation of custom onclick handlers that are defined as angular
 * expressions and are compiled and executed within the current scope.
 *
 * Events that are handled via these handler are always configured not to propagate further.
 *
 * TODO: maybe we should consider allowing users to control event propagation in the future.
 */
angularDirective("ng:click", function(expression, element){
  return function(element){
    var self = this;
    element.bind('click', function(event){
      self.$tryEval(expression, element);
      self.$root.$eval();
      event.stopPropagation();
    });
  };
});


/**
 * @ngdoc directive
 * @name angular.directive.ng:submit
 *
 * @description
 * 
 * @element form
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * @example
 * <form ng:submit="list.push(text);text='';" ng:init="list=[]">
 *   Enter text and hit enter: 
 *   <input type="text" name="text" value="hello"/>
 * </form>
 * <pre>list={{list}}</pre>
 * @scenario
   it('should check ng:submit', function(){
     expect(binding('list')).toBe('list=[]');
     element('.doc-example-live form input').click();
     this.addFutureAction('submit from', function($window, $document, done) {
       $window.angular.element(
         $document.elements('.doc-example-live form')).
           trigger('submit');
       done();
     });
     expect(binding('list')).toBe('list=["hello"]');
   });
 */
/**
 * Enables binding angular expressions to onsubmit events.
 *
 * Additionally it prevents the default action (which for form means sending the request to the
 * server and reloading the current page).
 */
angularDirective("ng:submit", function(expression, element) {
  return function(element) {
    var self = this;
    element.bind('submit', function(event) {
      self.$tryEval(expression, element);
      self.$root.$eval();
      event.preventDefault();
    });
  };
});


/**
 * @ngdoc directive
 * @name angular.directive.ng:watch
 *
 * @description
 * The `ng:watch` allows you watch a variable and then execute 
 * an evaluation on variable change.
 * 
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * Notice that the counter is incremented 
 * every time you change the text.
 * @example
    <div ng:init="counter=0" ng:watch="name: counter = counter+1">
      <input type="text" name="name" value="hello"><br/>
      Change counter: {{counter}} Name: {{name}}
    </div>
 * @scenario
   it('should check ng:watch', function(){
     expect(using('.doc-example-live').binding('counter')).toBe('2');
     using('.doc-example-live').input('name').enter('abc');
     expect(using('.doc-example-live').binding('counter')).toBe('3');
   });
 */
angularDirective("ng:watch", function(expression, element){
  return function(element){
    var self = this;
    parser(expression).watch()({
      addListener:function(watch, exp){
        self.$watch(watch, function(){
          return exp(self);
        }, element);
      }
    });
  };
});

function ngClass(selector) {
  return function(expression, element){
    var existing = element[0].className + ' ';
    return function(element){
      this.$onEval(function(){
        if (selector(this.$index)) {
          var value = this.$eval(expression);
          if (isArray(value)) value = value.join(' ');
          element[0].className = trim(existing + value);
        }
      }, element);
    };
  };
}

/**
 * @ngdoc directive
 * @name angular.directive.ng:class
 *
 * @description
 * The `ng:class` allows you to set CSS class on HTML element 
 * conditionally.
 * 
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * @example
    <input type="button" value="set" ng:click="myVar='ng-input-indicator-wait'">
    <input type="button" value="clear" ng:click="myVar=''">
    <br>
    <span ng:class="myVar">Sample Text &nbsp;&nbsp;&nbsp;&nbsp;</span>
 * 
 * @scenario
   it('should check ng:class', function(){
     expect(element('.doc-example-live span').attr('className')).not().
       toMatch(/ng-input-indicator-wait/);

     using('.doc-example-live').element(':button:first').click();

     expect(element('.doc-example-live span').attr('className')).
       toMatch(/ng-input-indicator-wait/);

     using('.doc-example-live').element(':button:last').click();
     
     expect(element('.doc-example-live span').attr('className')).not().
       toMatch(/ng-input-indicator-wait/);
   });
 */
angularDirective("ng:class", ngClass(function(){return true;}));

/**
 * @ngdoc directive
 * @name angular.directive.ng:class-odd
 *
 * @description
 * The `ng:class-odd` and `ng:class-even` works exactly as 
 * `ng:class`, except it works in conjunction with `ng:repeat` 
 * and takes affect only on odd (even) rows.
 *
 * @element ANY
 * @param {expression} expression to eval. Must be inside 
 * `ng:repeat`.

 *
 * @exampleDescription
 * @example
    <ol ng:init="names=['John', 'Mary', 'Cate', 'Suz']">
      <li ng:repeat="name in names">
       <span ng:class-odd="'ng-format-negative'"
             ng:class-even="'ng-input-indicator-wait'">
         {{name}} &nbsp; &nbsp; &nbsp; 
       </span>
      </li>
    </ol>
 * 
 * @scenario
   it('should check ng:class-odd and ng:class-even', function(){
     expect(element('.doc-example-live li:first span').attr('className')).
       toMatch(/ng-format-negative/);
     expect(element('.doc-example-live li:last span').attr('className')).
       toMatch(/ng-input-indicator-wait/);
   });
 */
angularDirective("ng:class-odd", ngClass(function(i){return i % 2 === 0;}));

/**
 * @ngdoc directive
 * @name angular.directive.ng:class-even
 *
 * @description
 * The `ng:class-odd` and `ng:class-even` works exactly as 
 * `ng:class`, except it works in conjunction with `ng:repeat` 
 * and takes affect only on odd (even) rows.
 *
 * @element ANY
 * @param {expression} expression to eval. Must be inside 
 * `ng:repeat`.

 *
 * @exampleDescription
 * @example
    <ol ng:init="names=['John', 'Mary', 'Cate', 'Suz']">
      <li ng:repeat="name in names">
       <span ng:class-odd="'ng-format-negative'"
             ng:class-even="'ng-input-indicator-wait'">
         {{name}} &nbsp; &nbsp; &nbsp; 
       </span>
      </li>
    </ol>
 * 
 * @scenario
   it('should check ng:class-odd and ng:class-even', function(){
     expect(element('.doc-example-live li:first span').attr('className')).
       toMatch(/ng-format-negative/);
     expect(element('.doc-example-live li:last span').attr('className')).
       toMatch(/ng-input-indicator-wait/);
   });
 */
angularDirective("ng:class-even", ngClass(function(i){return i % 2 === 1;}));

/**
 * @ngdoc directive
 * @name angular.directive.ng:show
 *
 * @description
 * The `ng:show` and `ng:hide` allows you to show or hide a portion
 * of the HTML conditionally.
 * 
 * @element ANY
 * @param {expression} expression if truthy then the element is 
 * shown or hidden respectively.
 *
 * @exampleDescription
 * @example
    Click me: <input type="checkbox" name="checked"><br/>
    Show: <span ng:show="checked">I show up when you checkbox is checked?</span> <br/>
    Hide: <span ng:hide="checked">I hide when you checkbox is checked?</span>
 * 
 * @scenario
   it('should check ng:show / ng:hide', function(){
     expect(element('.doc-example-live span:first:hidden').count()).toEqual(1);
     expect(element('.doc-example-live span:last:visible').count()).toEqual(1);
     
     input('checked').check();
     
     expect(element('.doc-example-live span:first:visible').count()).toEqual(1);
     expect(element('.doc-example-live span:last:hidden').count()).toEqual(1);
   });
 */
angularDirective("ng:show", function(expression, element){
  return function(element){
    this.$onEval(function(){
      element.css($display, toBoolean(this.$eval(expression)) ? '' : $none);
    }, element);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:hide
 *
 * @description
 * The `ng:show` and `ng:hide` allows you to show or hide a portion
 * of the HTML conditionally.
 * 
 * @element ANY
 * @param {expression} expression if truthy then the element is 
 * shown or hidden respectively.
 *
 * @exampleDescription
 * @example
    Click me: <input type="checkbox" name="checked"><br/>
    Show: <span ng:show="checked">I show up when you checkbox is checked?</span> <br/>
    Hide: <span ng:hide="checked">I hide when you checkbox is checked?</span>
 * 
 * @scenario
   it('should check ng:show / ng:hide', function(){
     expect(element('.doc-example-live span:first:hidden').count()).toEqual(1);
     expect(element('.doc-example-live span:last:visible').count()).toEqual(1);
     
     input('checked').check();
     
     expect(element('.doc-example-live span:first:visible').count()).toEqual(1);
     expect(element('.doc-example-live span:last:hidden').count()).toEqual(1);
   });
 */
angularDirective("ng:hide", function(expression, element){
  return function(element){
    this.$onEval(function(){
      element.css($display, toBoolean(this.$eval(expression)) ? $none : '');
    }, element);
  };
});

/**
 * @ngdoc directive
 * @name angular.directive.ng:style
 *
 * @description
 * 
 * @element ANY
 * @param {expression} expression to eval.
 *
 * @exampleDescription
 * @example
 * 
 * @scenario
   it('should check ng:style', function(){
   });
 */
angularDirective("ng:style", function(expression, element){
  return function(element){
    var resetStyle = getStyle(element);
    this.$onEval(function(){
      var style = this.$eval(expression) || {}, key, mergedStyle = {};
      for(key in style) {
        if (resetStyle[key] === _undefined) resetStyle[key] = '';
        mergedStyle[key] = style[key];
      }
      for(key in resetStyle) {
        mergedStyle[key] = mergedStyle[key] || resetStyle[key];
      }
      element.css(mergedStyle);
    }, element);
  };
});

function parseBindings(string) {
  var results = [];
  var lastIndex = 0;
  var index;
  while((index = string.indexOf('{{', lastIndex)) > -1) {
    if (lastIndex < index)
      results.push(string.substr(lastIndex, index - lastIndex));
    lastIndex = index;

    index = string.indexOf('}}', index);
    index = index < 0 ? string.length : index + 2;

    results.push(string.substr(lastIndex, index - lastIndex));
    lastIndex = index;
  }
  if (lastIndex != string.length)
    results.push(string.substr(lastIndex, string.length - lastIndex));
  return results.length === 0 ? [ string ] : results;
}

function binding(string) {
  var binding = string.replace(/\n/gm, ' ').match(/^\{\{(.*)\}\}$/);
  return binding ? binding[1] : _null;
}

function hasBindings(bindings) {
  return bindings.length > 1 || binding(bindings[0]) !== _null;
}

angularTextMarkup('{{}}', function(text, textNode, parentElement) {
  var bindings = parseBindings(text),
      self = this;
  if (hasBindings(bindings)) {
    if (isLeafNode(parentElement[0])) {
      parentElement.attr('ng:bind-template', text);
    } else {
      var cursor = textNode, newElement;
      foreach(parseBindings(text), function(text){
        var exp = binding(text);
        if (exp) {
          newElement = self.element('span');
          newElement.attr('ng:bind', exp);
        } else {
          newElement = self.text(text);
        }
        if (msie && text.charAt(0) == ' ') {
          newElement = jqLite('<span>&nbsp;</span>');
          var nbsp = newElement.html();
          newElement.text(text.substr(1));
          newElement.html(nbsp + newElement.html());
        }
        cursor.after(newElement);
        cursor = newElement;
      });
      textNode.remove();
    }
  }
});

// TODO: this should be widget not a markup
angularTextMarkup('OPTION', function(text, textNode, parentElement){
  if (nodeName(parentElement) == "OPTION") {
    var select = document.createElement('select');
    select.insertBefore(parentElement[0].cloneNode(true), _null);
    if (!select.innerHTML.match(/<option(\s.*\s|\s)value\s*=\s*.*>.*<\/\s*option\s*>/gi)) {
      parentElement.attr('value', text);
    }
  }
});

var NG_BIND_ATTR = 'ng:bind-attr';
var SPECIAL_ATTRS = {'ng:src': 'src', 'ng:href': 'href'};
angularAttrMarkup('{{}}', function(value, name, element){
  // don't process existing attribute markup
  if (angularDirective(name) || angularDirective("@" + name)) return;
  if (msie && name == 'src')
    value = decodeURI(value);
  var bindings = parseBindings(value),
      bindAttr;
  if (hasBindings(bindings)) {
    element.removeAttr(name);
    bindAttr = fromJson(element.attr(NG_BIND_ATTR) || "{}");
    bindAttr[SPECIAL_ATTRS[name] || name] = value;
    element.attr(NG_BIND_ATTR, toJson(bindAttr));
  }
});
/**
 * @ngdoc widget
 * @name angular.widget.HTML
 *
 * @description
 * The most common widgets you will use will be in the from of the
 * standard HTML set. These widgets are bound using the name attribute
 * to an expression. In addition they can have `ng:validate`, `ng:required`,
 * `ng:format`, `ng:change` attribute to further control their behavior.
 * 
 * @usageContent
 *   see example below for usage
 * 
 *   <input type="text|checkbox|..." ... />
 *   <textarea ... />
 *   <select ...>
 *     <option>...</option>
 *   </select>
 * 
 * @example
<table style="font-size:.9em;">
  <tr>
    <th>Name</th>
    <th>Format</th>
    <th>HTML</th>
    <th>UI</th>
    <th ng:non-bindable>{{input#}}</th>
  </tr>
  <tr>
    <th>text</th>
    <td>String</td>
    <td><tt>&lt;input type="text" name="input1"&gt;</tt></td>
    <td><input type="text" name="input1" size="4"></td>
    <td><tt>{{input1|json}}</tt></td>
  </tr>
  <tr>
    <th>textarea</th>
    <td>String</td>
    <td><tt>&lt;textarea name="input2"&gt;&lt;/textarea&gt;</tt></td>
    <td><textarea name="input2" cols='6'></textarea></td>
    <td><tt>{{input2|json}}</tt></td>
  </tr>
  <tr>
    <th>radio</th>
    <td>String</td>
    <td><tt>
      &lt;input type="radio" name="input3" value="A"&gt;<br>
      &lt;input type="radio" name="input3" value="B"&gt;
    </tt></td>
    <td>
      <input type="radio" name="input3" value="A">
      <input type="radio" name="input3" value="B">
    </td>
    <td><tt>{{input3|json}}</tt></td>
  </tr>
  <tr>
    <th>checkbox</th>
    <td>Boolean</td>
    <td><tt>&lt;input type="checkbox" name="input4" value="checked"&gt;</tt></td>
    <td><input type="checkbox" name="input4" value="checked"></td>
    <td><tt>{{input4|json}}</tt></td>
  </tr>
  <tr>
    <th>pulldown</th>
    <td>String</td>
    <td><tt>
      &lt;select name="input5"&gt;<br>
      &nbsp;&nbsp;&lt;option value="c"&gt;C&lt;/option&gt;<br>
      &nbsp;&nbsp;&lt;option value="d"&gt;D&lt;/option&gt;<br>
      &lt;/select&gt;<br>
    </tt></td>
    <td>
      <select name="input5">
        <option value="c">C</option>
        <option value="d">D</option>
      </select>
    </td>
    <td><tt>{{input5|json}}</tt></td>
  </tr>
  <tr>
    <th>multiselect</th>
    <td>Array</td>
    <td><tt>
      &lt;select name="input6" multiple size="4"&gt;<br>
      &nbsp;&nbsp;&lt;option value="e"&gt;E&lt;/option&gt;<br>
      &nbsp;&nbsp;&lt;option value="f"&gt;F&lt;/option&gt;<br>
      &lt;/select&gt;<br>
    </tt></td>
    <td>
      <select name="input6" multiple size="4">
        <option value="e">E</option>
        <option value="f">F</option>
      </select>
    </td>
    <td><tt>{{input6|json}}</tt></td>
  </tr>
</table>
 
 * @scenario
 * it('should exercise text', function(){
 *   input('input1').enter('Carlos');
 *   expect(binding('input1')).toEqual('"Carlos"');
 * });
 * it('should exercise textarea', function(){
 *   input('input2').enter('Carlos');
 *   expect(binding('input2')).toEqual('"Carlos"');
 * });
 * it('should exercise radio', function(){
 *   expect(binding('input3')).toEqual('null');
 *   input('input3').select('A');
 *   expect(binding('input3')).toEqual('"A"');
 *   input('input3').select('B');
 *   expect(binding('input3')).toEqual('"B"');
 * });
 * it('should exercise checkbox', function(){
 *   expect(binding('input4')).toEqual('false');
 *   input('input4').check();
 *   expect(binding('input4')).toEqual('true');
 * });
 * it('should exercise pulldown', function(){
 *   expect(binding('input5')).toEqual('"c"');
 *   select('input5').option('d');
 *   expect(binding('input5')).toEqual('"d"');
 * });
 * it('should exercise multiselect', function(){
 *   expect(binding('input6')).toEqual('[]');
 *   select('input6').options('e');
 *   expect(binding('input6')).toEqual('["e"]');
 *   select('input6').options('e', 'f');
 *   expect(binding('input6')).toEqual('["e","f"]');
 * });
 */

function modelAccessor(scope, element) {
  var expr = element.attr('name');
  if (!expr) throw "Required field 'name' not found.";
  return {
    get: function() {
      return scope.$eval(expr);
    },
    set: function(value) {
      if (value !== _undefined) {
        return scope.$tryEval(expr + '=' + toJson(value), element);
      }
    }
  };
}

function modelFormattedAccessor(scope, element) {
  var accessor = modelAccessor(scope, element),
      formatterName = element.attr('ng:format') || NOOP,
      formatter = angularFormatter(formatterName);
  if (!formatter) throw "Formatter named '" + formatterName + "' not found.";
  return {
    get: function() {
      return formatter.format(accessor.get());
    },
    set: function(value) {
      return accessor.set(formatter.parse(value));
    }
  };
}

function compileValidator(expr) {
  return parser(expr).validator()();
}

function valueAccessor(scope, element) {
  var validatorName = element.attr('ng:validate') || NOOP,
      validator = compileValidator(validatorName),
      requiredExpr = element.attr('ng:required'),
      formatterName = element.attr('ng:format') || NOOP,
      formatter = angularFormatter(formatterName),
      format, parse, lastError, required,
      invalidWidgets = scope.$invalidWidgets || {markValid:noop, markInvalid:noop};
  if (!validator) throw "Validator named '" + validatorName + "' not found.";
  if (!formatter) throw "Formatter named '" + formatterName + "' not found.";
  format = formatter.format;
  parse = formatter.parse;
  if (requiredExpr) {
    scope.$watch(requiredExpr, function(newValue) {
      required = newValue;
      validate();
    });
  } else {
    required = requiredExpr === '';
  }

  element.data('$validate', validate);
  return {
    get: function(){
      if (lastError)
        elementError(element, NG_VALIDATION_ERROR, _null);
      try {
        var value = parse(element.val());
        validate();
        return value;
      } catch (e) {
        lastError = e;
        elementError(element, NG_VALIDATION_ERROR, e);
      }
    },
    set: function(value) {
      var oldValue = element.val(),
          newValue = format(value);
      if (oldValue != newValue) {
        element.val(newValue || ''); // needed for ie
      }
      validate();
    }
  };

  function validate() {
    var value = trim(element.val());
    if (element[0].disabled || element[0].readOnly) {
      elementError(element, NG_VALIDATION_ERROR, _null);
      invalidWidgets.markValid(element);
    } else {
      var error, validateScope = inherit(scope, {$element:element});
      error = required && !value ?
              'Required' :
              (value ? validator(validateScope, value) : _null);
      elementError(element, NG_VALIDATION_ERROR, error);
      lastError = error;
      if (error) {
        invalidWidgets.markInvalid(element);
      } else {
        invalidWidgets.markValid(element);
      }
    }
  }
}

function checkedAccessor(scope, element) {
  var domElement = element[0], elementValue = domElement.value;
  return {
    get: function(){
      return !!domElement.checked;
    },
    set: function(value){
      domElement.checked = toBoolean(value);
    }
  };
}

function radioAccessor(scope, element) {
  var domElement = element[0];
  return {
    get: function(){
      return domElement.checked ? domElement.value : _null;
    },
    set: function(value){
      domElement.checked = value == domElement.value;
    }
  };
}

function optionsAccessor(scope, element) {
  var options = element[0].options;
  return {
    get: function(){
      var values = [];
      foreach(options, function(option){
        if (option.selected) values.push(option.value);
      });
      return values;
    },
    set: function(values){
      var keys = {};
      foreach(values, function(value){ keys[value] = true; });
      foreach(options, function(option){
        option.selected = keys[option.value];
      });
    }
  };
}

function noopAccessor() { return { get: noop, set: noop }; }

var textWidget = inputWidget('keyup change', modelAccessor, valueAccessor, initWidgetValue()),
    buttonWidget = inputWidget('click', noopAccessor, noopAccessor, noop),
    INPUT_TYPE = {
      'text':            textWidget,
      'textarea':        textWidget,
      'hidden':          textWidget,
      'password':        textWidget,
      'button':          buttonWidget,
      'submit':          buttonWidget,
      'reset':           buttonWidget,
      'image':           buttonWidget,
      'checkbox':        inputWidget('click', modelFormattedAccessor, checkedAccessor, initWidgetValue(false)),
      'radio':           inputWidget('click', modelFormattedAccessor, radioAccessor, radioInit),
      'select-one':      inputWidget('change', modelFormattedAccessor, valueAccessor, initWidgetValue(_null)),
      'select-multiple': inputWidget('change', modelFormattedAccessor, optionsAccessor, initWidgetValue([]))
//      'file':            fileWidget???
    };

function initWidgetValue(initValue) {
  return function (model, view) {
    var value = view.get();
    if (!value && isDefined(initValue)) {
      value = copy(initValue);
    }
    if (isUndefined(model.get()) && isDefined(value)) {
      model.set(value);
    }
  };
}

function radioInit(model, view, element) {
 var modelValue = model.get(), viewValue = view.get(), input = element[0];
 input.checked = false;
 input.name = this.$id + '@' + input.name;
 if (isUndefined(modelValue)) {
   model.set(modelValue = _null);
 }
 if (modelValue == _null && viewValue !== _null) {
   model.set(viewValue);
 }
 view.set(modelValue);
}

function inputWidget(events, modelAccessor, viewAccessor, initFn) {
  return function(element) {
    var scope = this,
        model = modelAccessor(scope, element),
        view = viewAccessor(scope, element),
        action = element.attr('ng:change') || '',
        lastValue;
    initFn.call(scope, model, view, element);
    this.$eval(element.attr('ng:init')||'');
    // Don't register a handler if we are a button (noopAccessor) and there is no action
    if (action || modelAccessor !== noopAccessor) {
      element.bind(events, function(event){
        model.set(view.get());
        lastValue = model.get();
        scope.$tryEval(action, element);
        scope.$root.$eval();
      });
    }
    function updateView(){
      view.set(lastValue = model.get());
    }
    updateView();
    element.data('$update', updateView);
    scope.$watch(model.get, function(value){
      if (lastValue !== value) {
        view.set(lastValue = value);
      }
    });
  };
}

function inputWidgetSelector(element){
  this.directives(true);
  return INPUT_TYPE[lowercase(element[0].type)] || noop;
}

angularWidget('input', inputWidgetSelector);
angularWidget('textarea', inputWidgetSelector);
angularWidget('button', inputWidgetSelector);
angularWidget('select', function(element){
  this.descend(true);
  return inputWidgetSelector.call(this, element);
});

angularWidget('option', function(){
  this.descend(true);
  this.directives(true);
  return function(element) {
    this.$postEval(element.parent().data('$update'));
  };
});


/**
 * @ngdoc widget
 * @name angular.widget.ng:include
 *
 * @description
 * Include external HTML fragment.
 * 
 * Keep in mind that Same Origin Policy applies to included resources 
 * (e.g. ng:include won't work for file:// access).
 *
 * @param {string} src expression evaluating to URL.
 * @param {Scope=} [scope=new_child_scope] expression evaluating to angular.scope
 *
 * @example
 *   <select name="url">
 *    <option value="angular.filter.date.html">date filter</option>
 *    <option value="angular.filter.html.html">html filter</option>
 *    <option value="">(blank)</option>
 *   </select>
 *   <tt>url = <a href="{{url}}">{{url}}</a></tt>
 *   <hr/>
 *   <ng:include src="url"></ng:include>
 *
 * @scenario
 * it('should load date filter', function(){
 *   expect(element('.doc-example ng\\:include').text()).toMatch(/angular\.filter\.date/);
 * });
 * it('should change to hmtl filter', function(){
 *   select('url').option('angular.filter.html.html');
 *   expect(element('.doc-example ng\\:include').text()).toMatch(/angular\.filter\.html/);
 * });
 * it('should change to blank', function(){
 *   select('url').option('(blank)');
 *   expect(element('.doc-example ng\\:include').text()).toEqual('');
 * });
 */
angularWidget('ng:include', function(element){
  var compiler = this,
      srcExp = element.attr("src"),
      scopeExp = element.attr("scope") || '';
  if (element[0]['ng:compiled']) {
    this.descend(true);
    this.directives(true);
  } else {
    element[0]['ng:compiled'] = true;
    return extend(function(xhr, element){
      var scope = this, childScope;
      var changeCounter = 0;
      var preventRecursion = false;
      function incrementChange(){ changeCounter++;}
      this.$watch(srcExp, incrementChange);
      this.$watch(scopeExp, incrementChange);
      scope.$onEval(function(){
        if (childScope && !preventRecursion) {
          preventRecursion = true;
          try {
            childScope.$eval();
          } finally {
            preventRecursion = false;
          }
        }
      });
      this.$watch(function(){return changeCounter;}, function(){
        var src = this.$eval(srcExp),
        useScope = this.$eval(scopeExp);
        if (src) {
          xhr('GET', src, function(code, response){
            element.html(response);
            childScope = useScope || createScope(scope);
            compiler.compile(element)(element, childScope);
            childScope.$init();
          });
        } else {
          childScope = null;
          element.html('');
        }
      });
    }, {$inject:['$xhr.cache']});
  }
});

/**
 * @ngdoc widget
 * @name angular.widget.ng:switch
 *
 * @description
 * Conditionally change the DOM structure.
 * 
 * @usageContent
 * <any ng:switch-when="matchValue1">...</any>
 *   <any ng:switch-when="matchValue2">...</any>
 *   ...
 *   <any ng:switch-default>...</any>
 * 
 * @param {*} on expression to match against <tt>ng:switch-when</tt>.
 * @paramDescription 
 * On child elments add:
 * 
 * * `ng:switch-when`: the case statement to match against. If match then this
 *   case will be displayed.
 * * `ng:switch-default`: the default case when no other casses match.
 *
 * @example
    <select name="switch">
      <option>settings</option>
      <option>home</option>
      <option>other</option>
    </select>
    <tt>switch={{switch}}</tt>
    </hr>
    <ng:switch on="switch" >
      <div ng:switch-when="settings">Settings Div</div>
      <span ng:switch-when="home">Home Span</span>
      <span ng:switch-default>default</span>
    </ng:switch>
    </code>
 *
 * @scenario
 * it('should start in settings', function(){
 *   expect(element('.doc-example ng\\:switch').text()).toEqual('Settings Div');
 * });
 * it('should change to home', function(){
 *   select('switch').option('home');
 *   expect(element('.doc-example ng\\:switch').text()).toEqual('Home Span');
 * });
 * it('should select deafault', function(){
 *   select('switch').option('other');
 *   expect(element('.doc-example ng\\:switch').text()).toEqual('default');
 * });
 */
var ngSwitch = angularWidget('ng:switch', function (element){
  var compiler = this,
      watchExpr = element.attr("on"),
      usingExpr = (element.attr("using") || 'equals'),
      usingExprParams = usingExpr.split(":"),
      usingFn = ngSwitch[usingExprParams.shift()],
      changeExpr = element.attr('change') || '',
      cases = [];
  if (!usingFn) throw "Using expression '" + usingExpr + "' unknown.";
  if (!watchExpr) throw "Missing 'on' attribute.";
  eachNode(element, function(caseElement){
    var when = caseElement.attr('ng:switch-when');
    var switchCase = {
        change: changeExpr,
        element: caseElement,
        template: compiler.compile(caseElement)
      };
    if (isString(when)) {
      switchCase.when = function(scope, value){
        var args = [value, when];
        foreach(usingExprParams, function(arg){
          args.push(arg);
        });
        return usingFn.apply(scope, args);
      };
      cases.unshift(switchCase);
    } else if (isString(caseElement.attr('ng:switch-default'))) {
      switchCase.when = valueFn(true);
      cases.push(switchCase);
    }
  });

  // this needs to be here for IE
  foreach(cases, function(_case){
    _case.element.remove();
  });

  element.html('');
  return function(element){
    var scope = this, childScope;
    this.$watch(watchExpr, function(value){
      var found = false;
      element.html('');
      childScope = createScope(scope);
      foreach(cases, function(switchCase){
        if (!found && switchCase.when(childScope, value)) {
          found = true;
          var caseElement = quickClone(switchCase.element);
          element.append(caseElement);
          childScope.$tryEval(switchCase.change, element);
          switchCase.template(caseElement, childScope);
          childScope.$init();
        }
      });
    });
    scope.$onEval(function(){
      if (childScope) childScope.$eval();
    });
  };
}, {
  equals: function(on, when) {
    return ''+on == when;
  },
  route: switchRouteMatcher
});


/*
 * Modifies the default behavior of html A tag, so that the default action is prevented when href
 * attribute is empty.
 *
 * The reasoning for this change is to allow easy creation of action links with ng:click without
 * changing the location or causing page reloads, e.g.:
 * <a href="" ng:click="model.$save()">Save</a>
 */
angular.widget('a', function() {
  this.descend(true);
  this.directives(true);

  return function(element) {
    if (element.attr('href') === '') {
      element.bind('click', function(event){
        event.preventDefault();
      });
    }
  };
});var browserSingleton;
angularService('$browser', function($log){
  if (!browserSingleton) {
    browserSingleton = new Browser(
        window.location,
        jqLite(window.document),
        jqLite(window.document.getElementsByTagName('head')[0]),
        XHR,
        $log);
    browserSingleton.startPoller(50, function(delay, fn){setTimeout(delay,fn);});
    browserSingleton.bind();
  }
  return browserSingleton;
}, {inject:['$log']});

extend(angular, {
  'element': jqLite,
  'compile': compile,
  'scope': createScope,
  'copy': copy,
  'extend': extend,
  'equals': equals,
  'foreach': foreach,
  'injector': createInjector,
  'noop':noop,
  'bind':bind,
  'toJson': toJson,
  'fromJson': fromJson,
  'identity':identity,
  'isUndefined': isUndefined,
  'isDefined': isDefined,
  'isString': isString,
  'isFunction': isFunction,
  'isObject': isObject,
  'isNumber': isNumber,
  'isArray': isArray
});


  window.onload = function(){
    try {
      if (previousOnLoad) previousOnLoad();
    } catch(e) {}
    angularInit(angularJsConfig(document));
  };

})(window, document, window.onload);
document.write('<style type="text/css">@charset "UTF-8";.ng-format-negative{color:red;}.ng-exception{border:2px solid #FF0000;font-family:"Courier New",Courier,monospace;font-size:smaller;}.ng-validation-error{border:2px solid #FF0000;}#ng-callout{margin:0;padding:0;border:0;outline:0;font-size:13px;font-weight:normal;font-family:Verdana,Arial,Helvetica,sans-serif;vertical-align:baseline;background:transparent;text-decoration:none;}#ng-callout .ng-arrow-left{background-image:url("data:image/gif;base64,R0lGODlhCwAXAKIAAMzMzO/v7/f39////////wAAAAAAAAAAACH5BAUUAAQALAAAAAALABcAAAMrSLoc/AG8FeUUIN+sGebWAnbKSJodqqlsOxJtqYooU9vvk+vcJIcTkg+QAAA7");background-repeat:no-repeat;background-position:left top;position:absolute;z-index:101;left:-12px;height:23px;width:10px;top:-3px;}#ng-callout .ng-arrow-right{background-image:url("data:image/gif;base64,R0lGODlhCwAXAKIAAMzMzO/v7/f39////////wAAAAAAAAAAACH5BAUUAAQALAAAAAALABcAAAMrCLTcoM29yN6k9socs91e5X3EyJloipYrO4ohTMqA0Fn2XVNswJe+H+SXAAA7");background-repeat:no-repeat;background-position:left top;position:absolute;z-index:101;height:23px;width:11px;top:-2px;}#ng-callout{position:absolute;z-index:100;border:2px solid #CCCCCC;background-color:#fff;}#ng-callout .ng-content{padding:10px 10px 10px 10px;color:#333333;}#ng-callout .ng-title{background-color:#CCCCCC;text-align:left;padding-left:8px;padding-bottom:5px;padding-top:2px;font-weight:bold;}.ng-input-indicator-wait{background-image:url("data:image/png;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==");background-position:right;background-repeat:no-repeat;}</style>');