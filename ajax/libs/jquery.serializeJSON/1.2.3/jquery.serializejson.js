/*!
  SerializeJSON jQuery plugin.
  https://github.com/marioizquierdo/jquery.serializeJSON
  version 1.2.3 (Apr, 2014)

  Copyright (c) 2012 Mario Izquierdo
  Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
  and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/
(function ($) {
  "use strict";

  // jQuery('form').serializeJSON()
  $.fn.serializeJSON = function () {
    var serializedObject, formAsArray, keys;

    serializedObject = {};
    formAsArray = this.serializeArray(); // array of objects {name, value}

    $.each(formAsArray, function (i, input) {
      keys = $.serializeJSON.splitInputNameIntoKeysArray(input.name);
      $.serializeJSON.deepSet(serializedObject, keys, input.value); // Set value in the object using the keys
    });

    return serializedObject;
  };

  // Use $.serializeJSON as namespace for the auxiliar functions
  $.serializeJSON = {

    isObject: function (obj) {
      return obj === Object(obj);
    },

    isUndefined: function (obj) {
      return obj === void 0;
    },

    isValidArrayIndex: function (val) {
      return val === '' || /^[0-9]+$/.test(String(val));
    },

    // Split the input name in programatically readable keys
    // "foo"              => ['foo']
    // "[foo]"            => ['foo']
    // "foo[inn][bar]"    => ['foo', 'inn', 'bar']
    // "foo[inn][arr][0]" => ['foo', 'inn', 'arr', '0']
    // "arr[][val]"       => ['arr', '', 'val']
    splitInputNameIntoKeysArray: function (name) {
      var keys, last;

      if ($.serializeJSON.isUndefined(name)) { throw new Error("ArgumentError: param 'name' expected to be a string, found undefined"); }
      keys = $.map(name.split('['), function (key) {
        last = key[key.length - 1];
        return last === ']' ? key.substring(0, key.length - 1) : key;
      });
      if (keys[0] === '') { keys.shift(); } // "[foo][inn]" should be same as "foo[inn]"
      return keys;
    },

    // Set a value in an object or array, using multiple keys to set in a nested object or array:
    //
    // obj = {}
    // deepSet(obj, ['foo'], v)             //=> obj['foo'] = v
    // deepSet(obj, ['foo', 'inn'], v)      //=> obj['foo']['inn'] = v // Create the inner obj['foo'] object, if needed
    // deepSet(obj, ['0'], v)               //=> obj[0] = v // obj may be an array
    // deepSet(obj, [''], v)                //=> obj.push(v) // assume obj as array, and add a new value to the end
    // deepSet(obj, ['arr', '0'], v)        //=> obj['arr']['0'] = v // obj['arr'] is created as array if needed
    // deepSet(obj, ['arr', ''], v)         //=> obj['arr'].push(v)
    // deepSet(obj, ['foo', 'arr', '0'], v) //=> obj['foo']['arr'][0] = v // obj['foo'] is created as object and obj['foo']['arr'] as array, if needed
    // deepSet(obj, ['arr', '0', 'foo'], v) //=> obj['arr']['0']['foo'] = v // obj['foo'] is created as object and obj['foo']['arr'] as array and obj['foo']['arr'][0] as object, if needed
    //
    // arr = []
    // deepSet(arr, [''], v)                //=> arr === [v]
    // deepSet(arr, ['', 'foo'], v)         //=> arr === [v, {foo: v}]
    // deepSet(arr, ['', 'bar'], v)         //=> arr === [v, {foo: v, bar: v}]
    // deepSet(arr, ['', 'bar'], v)         //=> arr === [v, {foo: v, bar: v}, {bar: v}]
    //
    deepSet: function (o, keys, value) {
      var key, nextKey, tail, lastIdx, lastVal;
      if ($.serializeJSON.isUndefined(o)) { throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined"); }
      if (!keys || keys.length === 0) { throw new Error("ArgumentError: param 'keys' expected to be an array with least one element"); }

      key = keys[0];

      // Only one key, then it's not a deepSet, just assign the value.
      if (keys.length === 1) {
        if (key === '') {
          o.push(value); // '' is used to push values into the array (assume o is an array)
        } else {
          o[key] = value; // other keys can be used as object keys or array indexes
        }

      // More keys is a deepSet. Apply recursively
      } else {

        nextKey = keys[1];

        // '' is used to push values into the array,
        // with nextKey, set the value in nextKey into the same object or array.
        // Covers the case of ['', 'foo'] and ['', 'var'] to push the object {foo, var}, and the case of nested arrays.
        if (key === '') {
          lastIdx = o.length - 1;
          lastVal = o[o.length - 1];
          if ($.serializeJSON.isObject(lastVal) && $.serializeJSON.isUndefined(lastVal[nextKey])) { // if nextKey is not present in the last object element
            key = lastIdx; // then set the new value in the same object element
          } else {
            key = lastIdx + 1; // otherwise, point to set the next index in the array
          }
        }

        // o[key] defaults to object or array, depending if nextKey is an array index (int or '') or an object key (string)
        if ($.serializeJSON.isUndefined(o[key])) {
          if ($.serializeJSON.isValidArrayIndex(nextKey)) { // if is '', 1, 2, 3 ... then use an array, where nextKey is the index
            o[key] = [];
          } else { // if is something else, use an object, where nextKey is the key
            o[key] = {};
          }
        }

        // Recursively set the inner object
        tail = keys.slice(1);
        $.serializeJSON.deepSet(o[key], tail, value);
      }
    }

  };

}(window.jQuery || window.Zepto || window.$));