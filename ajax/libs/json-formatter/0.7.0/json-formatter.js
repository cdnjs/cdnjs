/*!
 * jsonformatter
 * 
 * Version: 0.6.0 - 2016-08-27T12:58:03.306Z
 * License: Apache-2.0
 */


'use strict';

angular.module('jsonFormatter', ['RecursionHelper'])

.provider('JSONFormatterConfig', function JSONFormatterConfigProvider() {

  // Default values for hover preview config
  var hoverPreviewEnabled = false;
  var hoverPreviewArrayCount = 100;
  var hoverPreviewFieldCount = 5;

  return {
    get hoverPreviewEnabled() {
      return hoverPreviewEnabled;
    },
    set hoverPreviewEnabled(value) {
     hoverPreviewEnabled = !!value;
    },

    get hoverPreviewArrayCount() {
      return hoverPreviewArrayCount;
    },
    set hoverPreviewArrayCount(value) {
      hoverPreviewArrayCount = parseInt(value, 10);
    },

    get hoverPreviewFieldCount() {
      return hoverPreviewFieldCount;
    },
    set hoverPreviewFieldCount(value) {
      hoverPreviewFieldCount = parseInt(value, 10);
    },

    $get: function () {
      return {
        hoverPreviewEnabled: hoverPreviewEnabled,
        hoverPreviewArrayCount: hoverPreviewArrayCount,
        hoverPreviewFieldCount: hoverPreviewFieldCount
      };
    }
  };
})

.directive('jsonFormatter', ['RecursionHelper', 'JSONFormatterConfig', function jsonFormatterDirective(RecursionHelper, JSONFormatterConfig) {
  function escapeString(str) {
    return str.replace('"', '\"');
  }

  // From http://stackoverflow.com/a/332429
  function getObjectName(object) {
    if (object === undefined) {
      return '';
    }
    if (object === null) {
      return 'Object';
    }
    if (typeof object === 'object' && !object.constructor) {
        return 'Object';
    }

    //ES6 default gives name to constructor 
    if (object.__proto__ !== undefined && object.__proto__.constructor !== undefined && object.__proto__.constructor.name !== undefined) {
      return object.__proto__.constructor.name;
    } 
       
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((object).constructor.toString());
    if (results && results.length > 1) {
      return results[1];
    } else {
      return '';
    }
  }

  function getType(object) {
    if (object === null) { return 'null'; }
    return typeof object;
  }

  function getValuePreview (object, value) {
    var type = getType(object);

    if (type === 'null' || type === 'undefined') { return type; }

    if (type === 'string') {
      value = '"' + escapeString(value) + '"';
    }
    if (type === 'function'){

      // Remove content of the function
      return object.toString()
          .replace(/[\r\n]/g, '')
          .replace(/\{.*\}/, '') + '{…}';

    }
    return value;
  }

  function getPreview(object) {
    var value = '';
    if (angular.isObject(object)) {
      value = getObjectName(object);
      if (angular.isArray(object))
        value += '[' + object.length + ']';
    } else {
      value = getValuePreview(object, object);
    }
    return value;
  }

  function link(scope) {
    scope.isArray = function () {
      return angular.isArray(scope.json);
    };

    scope.isObject = function() {
      return angular.isObject(scope.json);
    };

    scope.getKeys = function (){
      if (scope.isObject()) {
        return Object.keys(scope.json).map(function(key) {
          if (key === '') { return '""'; }
          return key;
        });
      }
    };
    scope.type = getType(scope.json);
    scope.hasKey = typeof scope.key !== 'undefined';
    scope.getConstructorName = function(){
      return getObjectName(scope.json);
    };

    if (scope.type === 'string'){

      // Add custom type for date
      if((new Date(scope.json)).toString() !== 'Invalid Date') {
        scope.isDate = true;
      }

      // Add custom type for URLs
      if (scope.json.indexOf('http') === 0) {
        scope.isUrl = true;
      }
    }

    scope.isEmptyObject = function () {
      return scope.getKeys() && !scope.getKeys().length &&
        scope.isOpen && !scope.isArray();
    };


    // If 'open' attribute is present
    scope.isOpen = !!scope.open;
    scope.toggleOpen = function () {
      scope.isOpen = !scope.isOpen;
    };
    scope.childrenOpen = function () {
      if (scope.open > 1){
        return scope.open - 1;
      }
      return 0;
    };

    scope.openLink = function (isUrl) {
      if(isUrl) {
        window.location.href = scope.json;
      }
    };

    scope.parseValue = function (value){
      return getValuePreview(scope.json, value);
    };

    scope.showThumbnail = function () {
      return !!JSONFormatterConfig.hoverPreviewEnabled && scope.isObject() && !scope.isOpen;
    };

    scope.getThumbnail = function () {
      if (scope.isArray()) {

        // if array length is greater then 100 it shows "Array[101]"
        if (scope.json.length > JSONFormatterConfig.hoverPreviewArrayCount) {
          return 'Array[' + scope.json.length + ']';
        } else {
          return '[' + scope.json.map(getPreview).join(', ') + ']';
        }
      } else {

        var keys = scope.getKeys();

        // the first five keys (like Chrome Developer Tool)
        var narrowKeys = keys.slice(0, JSONFormatterConfig.hoverPreviewFieldCount);

        // json value schematic information
        var kvs = narrowKeys
          .map(function (key) { return key + ':' + getPreview(scope.json[key]); });

        // if keys count greater then 5 then show ellipsis
        var ellipsis = keys.length >= 5 ? '…' : '';

        return '{' + kvs.join(', ') + ellipsis + '}';
      }
    };
  }

  return {
    templateUrl: 'json-formatter.html',
    restrict: 'E',
    replace: true,
    scope: {
      json: '=',
      key: '=',
      open: '='
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
}]);

// Export to CommonJS style imports. Exporting this string makes this valid:
// angular.module('myApp', [require('jsonformatter')]);
if (typeof module === 'object') {
  module.exports = 'jsonFormatter';
}
'use strict';

// from http://stackoverflow.com/a/18609594
angular.module('RecursionHelper', []).factory('RecursionHelper', ['$compile', function($compile){
  return {
    /**
     * Manually compiles the element, fixing the recursion loop.
     * @param element
     * @param [link] A post-link function, or an object with function(s)
     * registered via pre and post properties.
     * @returns An object containing the linking functions.
     */
    compile: function(element, link){
      // Normalize the link parameter
      if(angular.isFunction(link)){
        link = { post: link };
      }

      // Break the recursion loop by removing the contents
      var contents = element.contents().remove();
      var compiledContents;
      return {
        pre: (link && link.pre) ? link.pre : null,
        /**
         * Compiles and re-adds the contents
         */
        post: function(scope, element){
          // Compile the contents
          if(!compiledContents){
            compiledContents = $compile(contents);
          }
          // Re-add the compiled contents to the element
          compiledContents(scope, function(clone){
            element.append(clone);
          });

          // Call the post-linking function, if any
          if(link && link.post){
            link.post.apply(null, arguments);
          }
        }
      };
    }
  };
}]);

angular.module("jsonFormatter").run(["$templateCache", function($templateCache) {$templateCache.put("json-formatter.html","<div ng-init=\"isOpen = open && open > 0\" class=\"json-formatter-row\"><a ng-click=\"toggleOpen()\"><span class=\"toggler {{isOpen ? \'open\' : \'\'}}\" ng-if=\"isObject()\"></span> <span class=\"key\" ng-if=\"hasKey\"><span class=\"key-text\">{{key}}</span><span class=\"colon\">:</span></span> <span class=\"value\"><span ng-if=\"isObject()\"><span class=\"constructor-name\">{{getConstructorName(json)}}</span> <span ng-if=\"isArray()\"><span class=\"bracket\">[</span><span class=\"number\">{{json.length}}</span><span class=\"bracket\">]</span></span></span> <span ng-if=\"!isObject()\" ng-click=\"openLink(isUrl)\" class=\"{{type}}\" ng-class=\"{date: isDate, url: isUrl}\">{{parseValue(json)}}</span></span> <span ng-if=\"showThumbnail()\" class=\"thumbnail-text\">{{getThumbnail()}}</span></a><div class=\"children\" ng-if=\"getKeys().length && isOpen\"><json-formatter ng-repeat=\"key in getKeys() track by $index\" json=\"json[key]\" key=\"key\" open=\"childrenOpen()\"></json-formatter></div><div class=\"children empty object\" ng-if=\"isEmptyObject()\"></div><div class=\"children empty array\" ng-if=\"getKeys() && !getKeys().length && isOpen && isArray()\"></div></div>");}]);