/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.helpers.parseOptions', []).provider('$parseOptions', function () {
  var defaults = this.defaults = { regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/ };
  this.$get = [
    '$parse',
    '$q',
    function ($parse, $q) {
      function ParseOptionsFactory(attr, config) {
        var $parseOptions = {};
        var options = angular.extend({}, defaults, config);
        $parseOptions.$values = [];
        var match, displayFn, valueName, keyName, groupByFn, valueFn, valuesFn;
        $parseOptions.init = function () {
          $parseOptions.$match = match = attr.match(options.regexp);
          displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]);
        };
        $parseOptions.valuesFn = function (scope, controller) {
          return $q.when(valuesFn(scope, controller)).then(function (values) {
            $parseOptions.$values = values ? parseValues(values) : {};
            return $parseOptions.$values;
          });
        };
        function parseValues(values) {
          return values.map(function (match) {
            var locals = {}, label, value;
            locals[valueName] = match;
            label = displayFn(locals);
            value = valueFn(locals);
            if (angular.isObject(value))
              value = label;
            return {
              label: label,
              value: value
            };
          });
        }
        $parseOptions.init();
        return $parseOptions;
      }
      return ParseOptionsFactory;
    }
  ];
});