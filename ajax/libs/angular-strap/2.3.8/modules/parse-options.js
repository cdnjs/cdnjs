/**
 * angular-strap
 * @version v2.3.8 - 2016-03-31
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.parseOptions', []).provider('$parseOptions', function() {
  var defaults = this.defaults = {
    regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/
  };
  this.$get = [ '$parse', '$q', function($parse, $q) {
    function ParseOptionsFactory(attr, config) {
      var $parseOptions = {};
      var options = angular.extend({}, defaults, config);
      $parseOptions.$values = [];
      var match;
      var displayFn;
      var valueName;
      var keyName;
      var groupByFn;
      var valueFn;
      var valuesFn;
      $parseOptions.init = function() {
        $parseOptions.$match = match = attr.match(options.regexp);
        displayFn = $parse(match[2] || match[1]);
        valueName = match[4] || match[6];
        keyName = match[5];
        groupByFn = $parse(match[3] || '');
        valueFn = $parse(match[2] ? match[1] : valueName);
        valuesFn = $parse(match[7]);
      };
      $parseOptions.valuesFn = function(scope, controller) {
        return $q.when(valuesFn(scope, controller)).then(function(values) {
          if (!angular.isArray(values)) {
            values = [];
          }
          $parseOptions.$values = values.length ? parseValues(values, scope) : [];
          return $parseOptions.$values;
        });
      };
      $parseOptions.displayValue = function(modelValue) {
        var scope = {};
        scope[valueName] = modelValue;
        return displayFn(scope);
      };
      function parseValues(values, scope) {
        return values.map(function(match, index) {
          var locals = {};
          var label;
          var value;
          locals[valueName] = match;
          label = displayFn(scope, locals);
          value = valueFn(scope, locals);
          return {
            label: label,
            value: value,
            index: index
          };
        });
      }
      $parseOptions.init();
      return $parseOptions;
    }
    return ParseOptionsFactory;
  } ];
});