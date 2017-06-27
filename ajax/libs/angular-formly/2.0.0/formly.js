// "formly" version 2.0.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], function (angular) {
      return (root.returnExportsGlobal = factory(angular));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'));
  } else {
    factory(root.angular);
  }
}(this, function (angular) {

// Main Formly Module
angular.module('formly', []);

angular.module('formly').directive('formlyCustomValidation', ["formlyUtil", function (formlyUtil) {
  'use strict';

  return {
    require: 'ngModel',
    link: function (scope, el, attrs, ctrl) {
      var validators = scope.$eval(attrs.formlyCustomValidation);
      if (!validators) {
        return;
      }

      // setup watchers and parsers
      var hasValidators = ctrl.hasOwnProperty('$validators');
      angular.forEach(validators, function (validator, name) {
        if (hasValidators) {
          var validatorCollection = validator.isAsync ? '$asyncValidators' : '$validators';
          ctrl[validatorCollection][name] = function (modelValue, viewValue) {
            return formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
          };
        } else {
          ctrl.$parsers.unshift(function (viewValue) {
            var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
            ctrl.$setValidity(name, isValid);
            return viewValue;
          });
        }
      });
    }
  };
}]);

angular.module('formly').directive('formlyDynamicName', function formlyDynamicName() {
  'use strict';
  return {
    restrict: 'A',
    priority: 599, // one after ngIf
    controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
      $element.removeAttr('formly-dynamic-name');
      $attrs.$set('name', $scope.$eval($attrs.formlyDynamicName));
      delete $attrs.formlyDynamicName;
    }]
  };
});

(function() {
  'use strict';

  angular.module('formly').directive('formlyField', formlyField);

  function formlyField($http, $compile, $templateCache, formlyConfig, formlyUtil) {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        options: '=',
        model: '=',
        formId: '=?',
        index: '=?',
        fields: '=?',
        form: '=?'
      },
      controller: function fieldController($scope, $interval) {
        // set field id to link labels and fields
        $scope.id = formlyUtil.getFieldId($scope.formId, $scope.options, $scope.index);
        angular.extend($scope.options, {
          runExpressions: runExpressions,
          modelOptions: {
            getterSetter: true,
            allowInvalid: true
          }
        });
        $scope.options.runExpressions = runExpressions;
        $scope.value = valueGetterSetter;

        // initalization
        runExpressions();
        if (!$scope.options.noFormControl) {
          setFormControl();
        }
        if ($scope.options.model) {
          $scope.$watch('options.model', runExpressions, true);
        }

        // function definitions

        function runExpressions() {
          var field = $scope.options;
          var currentValue = valueGetterSetter();
          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
            if (prop !== 'data') {
              field[prop] = formlyUtil.formlyEval($scope, expression, currentValue);
            } else {
              field.data = field.data || {};
              angular.forEach(field.expressionProperties.data, function runExpression(dataExpression, dataProp) {
                field.data[dataProp] = formlyUtil.formlyEval($scope, dataExpression, currentValue);
              });
            }
          });
        }

        function valueGetterSetter(newVal) {
          if (!$scope.model || (!$scope.options.key && !$scope.index)) {
            return;
          }
          if (angular.isDefined(newVal)) {
            $scope.model[$scope.options.key || $scope.index] = newVal;
          }
          return $scope.model[$scope.options.key || $scope.index];
        }

        function setFormControl() {
          var stopWaitingForDestroy;
          var maxTime = 2000;
          var intervalTime = 5;
          var iterations = 0;
          var interval = $interval(function () {
            iterations++;
            if (!angular.isDefined($scope.options.key) && !angular.isDefined($scope.index)) {
              return cleanUp();
            }
            var formControl = $scope.form && $scope.form[$scope.id];
            if (formControl) {
              $scope.options.formControl = formControl;
              cleanUp();
            } else if (intervalTime * iterations > maxTime) {
              formlyUtil.warn('Couldn\'t set the formControl after ' + maxTime + 'ms', $scope);
              cleanUp();
            }
          }, intervalTime);
          stopWaitingForDestroy = $scope.$on('$destroy', cleanUp);

          function cleanUp() {
            stopWaitingForDestroy();
            $interval.cancel(interval);
          }
        }
      },
      link: function fieldLink($scope, $element) {
        var templateOptions = 0;
        templateOptions += $scope.options.template ? 1 : 0;
        templateOptions += $scope.options.type ? 1 : 0;
        templateOptions += $scope.options.templateUrl ? 1 : 0;
        if (templateOptions === 0) {
          formlyUtil.warn('template type \'' + $scope.options.type + '\' not supported. On element:', $element);
          return;
        } else if (templateOptions > 1) {
          formlyUtil.throwErrorWithField('You must only provide a type, template, or templateUrl for a field', $scope.options);
        }
        var template = $scope.options.template || formlyConfig.getTemplate($scope.options.type);
        if (template) {
          setElementTemplate(template);
        } else {
          var templateUrl = $scope.options.templateUrl || formlyConfig.getTemplateUrl($scope.options.type);
          if (templateUrl) {
            $http.get(templateUrl, {
              cache: $templateCache
            }).then(function (response) {
              setElementTemplate(response.data);
            }, function (error) {
              formlyUtil.warn('Problem loading template for ' + templateUrl, error);
            });
          }
        }
        function setElementTemplate(templateData) {
          $element.html(templateData);
          $compile($element.contents())($scope);
        }
      }
    };
  }
  formlyField.$inject = ["$http", "$compile", "$templateCache", "formlyConfig", "formlyUtil"];
})();

angular.module('formly').directive('formlyForm', function formlyForm() {
  'use strict';
  var currentFormId = 1;
  return {
    restrict: 'E',
    templateUrl: 'directives/formly-form.html',
    replace: true,
    transclude: true,
    scope: {
      fields: '=',
      model: '=',
      form: '=?'
    },
    controller: ["$scope", "formlyUtil", function ($scope, formlyUtil) {
      $scope.formId = 'formly_' + currentFormId++;

      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

      // watch the model and evaluate watch expressions that depend on it.
      $scope.$watch('model', function onResultUpdate(newResult) {
        angular.forEach($scope.fields, function (field) {
          /*jshint -W030 */
          field.runExpressions && field.runExpressions(newResult);
        });
      }, true);

      function setupWatchers(field, index) {
        if (!angular.isDefined(field.watcher)) {
          return;
        }
        var watchers = field.watcher;
        if (!angular.isArray(watchers)) {
          watchers = [watchers];
        }
        angular.forEach(watchers, function (watcher) {
          var stopWatching;
          if (!angular.isDefined(watcher.listener)) {
            formlyUtil.throwErrorWithField('All field watchers must have a listener', field);
          }
          var watchExpression = watcher.expression || 'model["' + field.key + '" || ' + index + ']';
          if (angular.isFunction(watchExpression)) {
            // wrap the field's watch expression so we can call it with the field as the first arg and the stop function as the last arg as a helper
            var originalExpression = watchExpression;
            watchExpression = function formlyWatchExpression() {
              var args = Array.prototype.slice.call(arguments, 0);
              args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
              args.push(stopWatching);
              return originalExpression.apply(this, args);
            };
            watchExpression.displayName = 'Formly Watch Expression for field for ' + field.key;
          }
          var watchListener = watcher.listener;
          if (angular.isFunction(watchListener)) {
            // wrap the field's watch listener so we can call it with the field as the first arg and the stop function as the last arg as a helper
            var originalListener = watchListener;
            watchListener = function formlyWatchListener() {
              var args = Array.prototype.slice.call(arguments, 0);
              args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
              args.push(stopWatching);
              return originalListener.apply(this, args);
            };
            watchListener.displayName = 'Formly Watch Listener for field for ' + field.key;
          }
          var type = watcher.type || '$watch';
          stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
        });
      }
    }]
  };
});

angular.module('formly').provider('formlyConfig', function () {
  'use strict';

  var templateUrlMap = {};
  var templateMap = {};

  angular.extend(this, {
    getTemplateUrl: getTemplateUrl,
    setTemplateUrl: setTemplateUrl,
    getTemplate: getTemplate,
    setTemplate: setTemplate,
    disableWarnings: false,
    $get: function formlyConfig() {
      return this;
    }
  });

  function setTemplateUrl(name, templateUrl) {
    if (typeof name === 'string') {
      templateUrlMap[name] = templateUrl;
    } else {
      angular.forEach(name, function (templateUrl, name) {
        setTemplateUrl(name, templateUrl);
      });
    }
  }

  function getTemplateUrl(type) {
    return templateUrlMap[type];
  }

  function setTemplate(name, template) {
    if (typeof name === 'string') {
      templateMap[name] = template;
    } else {
      angular.forEach(name, function (template, name) {
        setTemplate(name, template);
      });
    }
  }

  function getTemplate(type) {
    return templateMap[type];
  }



});

angular.module('formly').factory('formlyUtil', ["formlyConfig", function (formlyConfig) {
  'use strict';
  return {
    throwErrorWithField: throwErrorWithField,
    formlyEval: formlyEval,
    warn: warn,
    getFieldId: getFieldId
  };

  function throwErrorWithField(message, field) {
    throw new Error('Formly Error: ' + message + '. Field definition: ' + angular.toJson(field));
  }

  function formlyEval(scope, expression, modelValue, viewValue) {
    if (angular.isFunction(expression)) {
      return expression(viewValue, modelValue, scope);
    } else {
      return scope.$eval(expression, {
        $viewValue: viewValue,
        $modelValue: modelValue
      });
    }
  }

  function warn() {
    if (!formlyConfig.disableWarnings) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('Formly Warning:');
      console.warn.apply(console, args);
    }
  }

  function getFieldId(formId, options, index) {
    var type = options.type;
    if (!type && options.template) {
      type = 'template';
    } else if (!type && options.templateUrl) {
      type = 'templateUrl';
    }

    return [formId, type, options.key, index].join('_');
  }

}]);

angular.module('formly').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/formly-form.html',
    "<ng-form class=formly name=form role=form><div formly-field ng-repeat=\"field in fields track by $index\" ng-if=!field.hide class=formly-field options=field model=\"field.model || model\" fields=fields form=form form-id=formId index=$index></div><div ng-transclude></div></ng-form>"
  );

}]);

return "formly";

}));
