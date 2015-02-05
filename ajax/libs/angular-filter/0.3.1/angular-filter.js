/**
 * Bunch of useful filters for angularJS
 * @version v0.3.1 - 2014-07-29 * @link https://github.com/a8m/angular-filter
 * @author Ariel Mashraki <ariel@mashraki.co.il>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( window, angular, undefined ) {
/*jshint globalstrict:true*/
'use strict';

var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;


/**
 * get an object and return array of values
 * @param object
 * @returns {Array}
 */
function toArray(object) {
    var i = -1,
        props = Object.keys(object),
        result = new Array(props.length);

    while(++i < props.length) {
        result[i] = object[props[i]];
    }
    return result;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 * return if object contains partial object
 * @param partial{object}
 * @param object{object}
 * @returns {boolean}
 */
function objectContains(partial, object) {
  var keys = Object.keys(partial);

  return keys.map(function(el) {
    return !(!object[el] || (object[el] != partial[el]));
  }).indexOf(false) == -1;

}

/**
 * search for approximate pattern in string
 * @param word
 * @param pattern
 * @returns {*}
 */
function hasApproxPattern(word, pattern) {
  if(pattern === '')
    return word;

  var index = word.indexOf(pattern.charAt(0));

  if(index === -1)
    return false;

  return hasApproxPattern(word.substr(index+1), pattern.substr(1))
}
/**
 * @ngdoc filter
 * @name a8m.angular
 * @kind function
 *
 * @description
 * reference to angular function
 */

angular.module('a8m.angular', [])

    .filter('isUndefined', function () {
      return function (input) {
        return angular.isUndefined(input);
      }
    })
    .filter('isDefined', function() {
      return function (input) {
        return angular.isDefined(input);
      }
    })
    .filter('isFunction', function() {
      return function (input) {
        return angular.isFunction(input);
      }
    })
    .filter('isString', function() {
      return function (input) {
        return angular.isString(input)
      }
    })
    .filter('isNumber', function() {
      return function (input) {
        return angular.isNumber(input);
      }
    })
    .filter('isArray', function() {
      return function (input) {
        return angular.isArray(input);
      }
    })
    .filter('isObject', function() {
      return function (input) {
        return angular.isObject(input);
      }
    })
    .filter('isEqual', function() {
      return function (o1, o2) {
        return angular.equals(o1, o2);
      }
    });

/**
 * @ngdoc filter
 * @name isNull
 * @kind function
 *
 * @description
 * checks if value is null or not
 * @return Boolean
 */

angular.module('a8m.is-null', [])

    .filter('isNull', function () {
      return function(input) {
        return isNull(input);
      }
    });

/**
 * @ngdoc filter
 * @name after-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection after the first that found with the given properties.
 *
 */

angular.module('a8m.after-where', [])
    .filter('afterWhere', function() {
      return function (collection, object) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        if(!isArray(collection) || isUndefined(object))
          return collection;

        var index = collection.map( function( elm ) {
          return objectContains(object, elm);
        }).indexOf( true );

        return collection.slice((index === -1) ? 0 : index);
      }
    });

/**
 * @ngdoc filter
 * @name after
 * @kind function
 *
 * @description
 * get a collection and specified count, and returns all of the items
 * in the collection after the specified count.
 *
 */

angular.module('a8m.after', [])
    .filter('after', function() {
      return function (collection, count) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        return (isArray(collection)) ?
            collection.slice(count) :
            collection;

      }
    });

/**
 * @ngdoc filter
 * @name before-where
 * @kind function
 *
 * @description
 * get a collection and properties object, and returns all of the items
 * in the collection before the first that found with the given properties.
 *
 */

angular.module('a8m.before-where', [])
  .filter('beforeWhere', function() {
    return function (collection, object) {

      collection = (isObject(collection)) ?
        toArray(collection) :
        collection;

      if(!isArray(collection) || isUndefined(object))
        return collection;

      var index = collection.map( function( elm ) {
        return objectContains(object, elm);
      }).indexOf( true );

      return collection.slice(0, (index === -1) ? collection.length : ++index);
    }
  });

/**
 * @ngdoc filter
 * @name before
 * @kind function
 *
 * @description
 * get a collection and specified count, and returns all of the items
 * in the collection before the specified count.
 *
 */

angular.module('a8m.before', [])
    .filter('before', function() {
      return function (collection, count) {

        collection = (isObject(collection)) ?
            toArray(collection) :
            collection;

        return (isArray(collection)) ?
            collection.slice(0, (!count) ? count : --count) :
            collection;

      }
    });

/**
 * @ngdoc filter
 * @name concat
 * @kind function
 *
 * @description
 * get (array/object, object/array) and return merged collection
 *
 */

angular.module('a8m.concat', [])
  //TODO:unique option ? or use unique filter to filter result
  .filter('concat', [function () {
    return function (collection, joined) {

      if (isUndefined(joined)) {
        return collection;
      }
      if (isArray(collection)) {
        return (isObject(joined)) ?
            collection.concat(toArray(joined)) :
            collection.concat(joined);
      }

      if (isObject(collection)) {
        var array = toArray(collection);
        return (isObject(joined)) ?
            array.concat(toArray(joined)) :
            array.concat(joined);
      }
      return collection;
    };
  }
]);

/**
 * @ngdoc filter
 * @name fuzzyByKey
 * @kind function
 *
 * @description
 * fuzzy string searching by key
 */

angular.module('a8m.fuzzy-by', [])
  .filter('fuzzyBy', ['$parse', function ( $parse ) {
    return function (collection, property, search, csensitive) {

      var sensitive = csensitive || false,
        prop, getter;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)
        || isUndefined(search)) {
        return collection;
      }

      getter = $parse(property);

      return collection.filter(function(elm) {

        prop = getter(elm);
        if(!isString(prop)) {
          return false;
        }

        prop = (sensitive) ? prop : prop.toLowerCase();
        search = (sensitive) ? search : search.toLowerCase();

        return hasApproxPattern(prop, search) !== false
      })
    }

 }]);
/**
 * @ngdoc filter
 * @name fuzzy
 * @kind function
 *
 * @description
 * fuzzy string searching for array of strings, objects
 */

angular.module('a8m.fuzzy', [])
  .filter('fuzzy', function () {
    return function (collection, search, csensitive) {

      var sensitive = csensitive || false;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(search)) {
        return collection;
      }

      search = (sensitive) ? search : search.toLowerCase();

      return collection.filter(function(elm) {

        if(isString(elm)) {
          elm = (sensitive) ? elm : elm.toLowerCase();
          return hasApproxPattern(elm, search) !== false
        }

        return (isObject(elm)) ? _hasApproximateKey(elm, search) : false;

      });

      /**
       * checks if object has key{string} that match
       * to fuzzy search pattern
       * @param object
       * @param search
       * @returns {boolean}
       * @private
       */
      function _hasApproximateKey(object, search) {
        var properties = Object.keys(object),
          prop, flag;
        return 0 < properties.filter(function (elm) {
          prop = object[elm];

          //avoid iteration if we found some key that equal[performance]
          if(flag) return true;

          if (isString(prop)) {
            prop = (sensitive) ? prop : prop.toLowerCase();
            return flag = (hasApproxPattern(prop, search) !== false);
          }

          return false;

        }).length;
      }

    }
  });

/**
 * @ngdoc filter
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a collection,
 * each key is an array of the elements.
 */

angular.module('a8m.group-by', [])

  .filter('groupBy', [ '$parse', function ( $parse ) {
    return function (collection, property) {

      var result = {},
        get = $parse(property),
        prop;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(property)) {
        return collection;
      }

      collection.forEach( function( elm ) {
        prop = get(elm);

        if(!result[prop]) {
          result[prop] = [];
        }

        result[prop].push(elm);
      });

      return result;
    }
 }]);

/**
 * @ngdoc filter
 * @name isEmpty
 * @kind function
 *
 * @description
 * get collection or string and return if it empty
 */

angular.module('a8m.is-empty', [])
  .filter('isEmpty', function () {
    return function(collection) {
      return (isObject(collection)) ?
        !toArray(collection).length :
        !collection.length;
    }
  });

/**
 * @ngdoc filter
 * @name omit
 * @kind function
 *
 * @description
 * filter collection by expression
 */

angular.module('a8m.omit', [])

  .filter('omit', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.filter(function (elm) {

        return !($parse(expression)(elm));
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name omit
 * @kind function
 *
 * @description
 * filter collection by expression
 */

angular.module('a8m.pick', [])

  .filter('pick', ['$parse', function($parse) {
    return function (collection, expression) {

      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      if(!isArray(collection) || isUndefined(expression)) {
        return collection;
      }

      return collection.filter(function (elm) {

        return $parse(expression)(elm);
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name removeWith
 * @kind function
 *
 * @description
 * get collection and properties object, and removed elements
 * with this properties
 */

angular.module('a8m.remove-with', [])
  .filter('removeWith', function() {
    return function (collection, object) {

      if(isUndefined(object)) {
        return collection;
      }
      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      return collection.filter(function (elm) {
        return !objectContains(object, elm);
      });
    }
  });


/**
 * @ngdoc filter
 * @name remove
 * @kind function
 *
 * @description
 * remove specific members from collection
 */

angular.module('a8m.remove', [])

  .filter('remove', function () {
    return function (collection) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection)) {
        return collection;
      }

      return collection.filter( function( member ) {
        return !args.some(function(nest) {
          return equals(nest, member);
        })
      });

    }
  });

/**
 * @ngdoc filter
 * @name reverse
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */

angular.module('a8m.reverse', [])

    .filter('reverse',[ function () {
      return function (input) {

        input = (isObject(input)) ? toArray(input) : input;

        if(isString(input)) {
          return input.split('').reverse().join('');
        }

        return (isArray(input)) ? input.reverse() : input;
      }
    }]);


/**
 * @ngdoc filter
 * @name searchField
 * @kind function
 *
 * @description
 * for each member, join several strings field and add them to
 * new field called 'searchField' (use for search filtering)
 */

angular.module('a8m.search-field', [])

  .filter('searchField', ['$parse', function ($parse) {
    return function (collection) {

      var get, field;

      collection = (isObject(collection)) ? toArray(collection) : collection;

      var args = Array.prototype.slice.call(arguments, 1);

      if(!isArray(collection) || !args.length) {
        return collection;
      }

      return collection.map(function(member) {

        field = args.map(function(field) {
          get = $parse(field);
          return get(member);
        }).join(' ');

        //TODO(ariel):we don't wanna change the source, but I'm not sure about the performance.
        return extend({ searchField: field }, member);
      });
    }
  }]);

/**
 * @ngdoc filter
 * @name unique/uniq
 * @kind function
 *
 * @description
 * get collection and filter duplicate members
 * if uniqueFilter get a property(nested to) as argument it's
 * filter by this property as unique identifier
 */

angular.module('a8m.unique', [])
  .filter({
    unique: ['$parse', uniqFilter],
    uniq: ['$parse', uniqFilter]
    });

function uniqFilter($parse) {
    return function (collection, property) {

      collection = (isObject(collection)) ? toArray(collection) : collection;

      if (isUndefined(property)) {
        return collection.filter(function (elm, pos, self) {
          return self.indexOf(elm) === pos;
        })
      }
      //store all unique members
      var uniqueItems = [],
          get = $parse(property);

      return collection.filter(function (elm) {
        var prop = get(elm);
        if(some(uniqueItems, prop)) {
          return false;
        }
        uniqueItems.push(prop);
        return true;
      });

      //checked if the unique identifier is already exist
      function some(array, member) {
        if(isUndefined(member)) {
          return false;
        }
        return array.some(function(el) {
          return equals(el, member);
        });
      }

    }
}

/**
 * @ngdoc filter
 * @name where
 * @kind function
 *
 * @description
 * of each element in a collection to the given properties object,
 * returning an array of all elements that have equivalent property values.
 *
 */

angular.module('a8m.where', [])
  .filter('where', function() {
    return function (collection, object) {

      if(isUndefined(object)) {
        return collection;
      }
      collection = (isObject(collection)) ?
        toArray(collection) : collection;

      return collection.filter(function (elm) {
        return objectContains(object, elm);
      });
    }
  });

/**
 * @ngdoc module
 * @name math
 * @description
 * reference to global Math object
 */

angular.module('a8m.math', [])
  .factory('$math', ['$window', function ($window) {

    return $window.Math;

  }]);

/**
 * @ngdoc filter
 * @name max
 * @kind function
 *
 * @description
 * Math.max
 *
 */

angular.module('a8m.math.max', ['a8m.math'])

  .filter('max', ['$math', function ($math) {
    return function (input) {

      return (isArray(input)) ?
        $math.max.apply($math, input) :
        input;
    }

  }]);

/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min
 *
 */

angular.module('a8m.math.min', ['a8m.math'])

  .filter('min', ['$math', function ($math) {
    return function (input) {

      return (isArray(input)) ?
        $math.min.apply($math, input) :
        input;
    }

  }]);

/**
 * @ngdoc filter
 * @name endsWith
 * @kind function
 *
 * @description
 * checks whether string ends with the ends parameter.
 */

angular.module('a8m.ends-with', [])

  .filter('endsWith', function () {
    return function (input, ends, csensitive) {

      var sensitive = csensitive || false,
        position;

      if(!isString(input) || isUndefined(ends)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();
      position = input.length - ends.length;

      return input.indexOf((sensitive) ? ends : ends.toLowerCase(), position) !== -1;
    }
  });

/**
 * @ngdoc filter
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */

angular.module('a8m.slugify', [])

  .filter('slugify',[ function () {
    return function (input, sub) {

      var replace = sub || '-';

      if(isString(input)) {
        return input.toLowerCase()
          .replace(/\s+/g, replace);
      }

      return input;
    }
  }]);

/**
 * @ngdoc filter
 * @name startWith
 * @kind function
 *
 * @description
 * checks whether string starts with the starts parameter.
 */

angular.module('a8m.starts-with', [])

  .filter('startsWith', function () {
    return function (input, start, csensitive) {

      var sensitive = csensitive || false;

      if(!isString(input) || isUndefined(start)) {
        return input;
      }

      input = (sensitive) ? input : input.toLowerCase();

      return !input.indexOf((sensitive) ? start : start.toLowerCase());
    }
  });

/**
 * @ngdoc filter
 * @name stringular
 * @kind function
 *
 * @description
 * get string with {n} and replace match with enumeration values
 */

angular.module('a8m.stringular', [])
  .filter('stringular', function () {
    return function(input) {

      var args = Array.prototype.slice.call(arguments, 1);

      return input.replace(/{(\d+)}/g, function (match, number) {
        return isUndefined(args[number]) ? match : args[number];
      });

    }
  });

/**
 * @ngdoc filter
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */

angular.module('a8m.strip-tags', [])
  .filter('stripTags', function () {
    return function(input) {
      if(isString(input)) {
        return input.replace(/<\S[^><]*>/g, '');
      }
      return input;
    }
  });

/**
 * @ngdoc filter
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */

angular.module('a8m.trim', [])

  .filter('trim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '');
    }
  });

/**
 * @ngdoc filter
 * @name truncate
 * @kind function
 *
 * @description
 * truncates a string given a specified length, providing a custom string to denote an omission.
 */

angular.module('a8m.truncate', [])
  .filter('truncate', function () {
    return function(input, length, suffix, preserve) {

      if(!isString(input)) return input;

      length = isUndefined(length) ? input.length : length;
      preserve = preserve || false;
      suffix = suffix || '';

      return input.substring(0, (preserve) ?
          ((input.indexOf(' ', length) === -1) ? length : input.indexOf(' ', length)) :
          length) + suffix;

    };
  });

/**
 * @ngdoc filter
 * @name ucfirst
 * @kind function
 *
 * @description
 * ucfirst
 *
 */

angular.module('a8m.ucfirst', [])

  .filter('ucfirst', [function() {
    return function(input) {
      return angular.isString(input) ? input.split(' ')
        .map(function (char) {
          return char.charAt(0).toUpperCase() + char.substring(1);
        }).join(' ') : input;
    }

  }]);

/**
 * @ngdoc filter
 * @name uriEncode
 * @kind function
 *
 * @description
 * get string as parameter and return encoded string
 */

angular.module('a8m.uri-encode', [])

  .filter('uriEncode',['$window', function ($window) {
      return function (input) {

        if(isString(input)) {
          return $window.encodeURI(input);
        }

        return input;
      }
    }]);

/**
 * @ngdoc filter
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */

angular.module('a8m.wrap', [])

  .filter('wrap', function () {
    return function(input, wrap, ends) {

      if(!isString(input) || isUndefined(wrap)) {
        return input;
      }

      return [wrap, input, ends || wrap].join('');

    }
  });

/**
 * @ngdoc module
 * @name angular.filters
 * @description
 *  bunch of useful filters for angularJS
 */

angular.module('angular.filter', [

  'a8m.ucfirst',
  'a8m.uri-encode',
  'a8m.slugify',
  'a8m.strip-tags',
  'a8m.stringular',
  'a8m.truncate',
  'a8m.starts-with',
  'a8m.ends-with',
  'a8m.wrap',
  'a8m.trim',

  'a8m.concat',
  'a8m.unique',
  'a8m.is-empty',
  'a8m.after',
  'a8m.after-where',
  'a8m.before',
  'a8m.before-where',
  'a8m.where',
  'a8m.reverse',
  'a8m.remove',
  'a8m.remove-with',
  'a8m.group-by',
  'a8m.search-field',
  'a8m.fuzzy-by',
  'a8m.fuzzy',
  'a8m.omit',
  'a8m.pick',

  'a8m.math',
  'a8m.math.max',
  'a8m.math.min',

  'a8m.angular',
  'a8m.is-null'

]);
})( window, window.angular );