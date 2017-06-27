// Render module for formly to display forms
angular.module('formly.render', []);
// Main Formly Module
angular.module('formly', ['formly.render']);
'use strict';
angular.module('formly.render').directive('formlyField', [
  '$http',
  '$compile',
  '$templateCache',
  'formlyTemplate',
  function formlyField($http, $compile, $templateCache, formlyTemplate) {
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        optionsData: '&options',
        formId: '=formId',
        index: '=index',
        value: '=formValue'
      },
      link: function fieldLink($scope, $element, $attr) {
        var template = $scope.options.template;
        if (template) {
          setElementTemplate(template);
        } else {
          var templateUrl = $scope.options.templateUrl || formlyTemplate.getTemplateUrl($scope.options.type);
          if (templateUrl) {
            $http.get(templateUrl, { cache: $templateCache }).then(function (response) {
              setElementTemplate(response.data);
            }, function (error) {
              console.log('Formly Error: Problem loading template for ' + templateUrl, error);
            });
          } else {
            console.log('Formly Error: template type \'' + $scope.options.type + '\' not supported.');
          }
        }
        function setElementTemplate(templateData) {
          $element.html(templateData);
          $compile($element.contents())($scope);
        }
      },
      controller: [
        '$scope',
        function fieldController($scope) {
          $scope.options = $scope.optionsData();
          if (typeof $scope.options.default !== 'undefined') {
            $scope.value = $scope.options.default;
          }
          var type = $scope.options.type;
          if (!type && $scope.options.template) {
            type = 'template';
          } else if (!type && $scope.options.templateUrl) {
            type = 'templateUrl';
          }
          // set field id to link labels and fields
          $scope.id = $scope.formId + type + $scope.index;
        }
      ]
    };
  }
]);
'use strict';
angular.module('formly.render').directive('formlyForm', [
  'formlyOptions',
  '$compile',
  function formlyForm(formlyOptions, $compile) {
    return {
      restrict: 'AE',
      templateUrl: 'directives/formly-form.html',
      replace: true,
      scope: {
        fields: '=',
        options: '=?',
        result: '=',
        formOnParentScope: '=name'
      },
      compile: function (scope, iElement, iAttrs, controller, transcludeFn) {
        return {
          post: function (scope, ele, attr, controller) {
            scope.options = angular.extend(formlyOptions.getOptions(), scope.options);
            if (scope.options.submitButtonTemplate) {
              ele.find('button').replaceWith($compile(scope.options.submitButtonTemplate)(scope));
            }
            //Post gets called after angular has created the FormController
            //Now pass the FormController back up to the parent scope
            scope.formOnParentScope = scope[attr.name];
          }
        };
      },
      controller: [
        '$scope',
        '$element',
        '$parse',
        function ($scope, $element, $parse) {
          // setup watches for watchExpressions
          angular.forEach($scope.fields, function (field, index) {
            if (angular.isDefined(field.watch)) {
              var watchExpression = field.watch.expression;
              if (angular.isFunction(watchExpression)) {
                // wrap the field's watch expression so we can call it with the field as the first arg as a helper
                watchExpression = function () {
                  var args = Array.prototype.slice.call(arguments, 0);
                  args.unshift(field);
                  return field.watch.expression.apply(this, args);
                };
              }
              $scope.$watch(watchExpression, function () {
                // wrap the field's watch listener so we can call it with the field as the first arg as a helper
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift(field);
                return field.watch.listener.apply(this, args);
              });
            }
          });
          $scope.$watch('result', function (newValue) {
            angular.forEach($scope.fields, function (field, index) {
              if (field.hideExpression) {
                field.hide = $parse(field.hideExpression)($scope.result);
              }
            });
          }, true);
        }
      ]
    };
  }
]);
'use strict';
angular.module('formly.render').provider('formlyOptions', function () {
  var options = {
      uniqueFormId: null,
      submitCopy: 'Submit',
      hideSubmit: false,
      submitButtonTemplate: null
    };
  function setOption(name, value) {
    if (typeof name === 'string') {
      options[name] = value;
    } else {
      angular.forEach(name, function (val, name) {
        setOption(name, val);
      });
    }
  }
  function getOptions() {
    // copy to avoid third-parties manipulating the options outside of the api.
    return angular.copy(options);
  }
  this.setOption = setOption;
  this.getOptions = getOptions;
  this.$get = function formlyOptions() {
    return this;
  };
});
'use strict';
angular.module('formly.render').provider('formlyTemplate', function () {
  var templateMap = {
      textarea: 'directives/formly-field-textarea.html',
      radio: 'directives/formly-field-radio.html',
      select: 'directives/formly-field-select.html',
      number: 'directives/formly-field-number.html',
      checkbox: 'directives/formly-field-checkbox.html',
      password: 'directives/formly-field-password.html',
      hidden: 'directives/formly-field-hidden.html',
      email: 'directives/formly-field-email.html',
      text: 'directives/formly-field-text.html'
    };
  function setTemplateUrl(name, templateUrl) {
    if (typeof name === 'string') {
      templateMap[name] = templateUrl;
    } else {
      angular.forEach(name, function (templateUrl, name) {
        setTemplateUrl(name, templateUrl);
      });
    }
  }
  function getTemplateUrl(type) {
    return templateMap[type];
  }
  ;
  this.setTemplateUrl = setTemplateUrl;
  this.getTemplateUrl = getTemplateUrl;
  this.$get = function formlyTemplate() {
    return this;
  };
});
angular.module('formly.render').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('directives/formly-field-checkbox.html', '<div><label><input type=checkbox ng-required=options.required ng-disabled=options.disabled ng-model=value> {{options.label || \'Checkbox\'}} {{options.required ? \'*\' : \'\'}}</label></div>');
    $templateCache.put('directives/formly-field-email.html', '<div><label for={{id}}>{{options.label || \'Email\'}} {{options.required ? \'*\' : \'\'}}</label><input type=email id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-hidden.html', '<input type=hidden ng-model=value>');
    $templateCache.put('directives/formly-field-number.html', '<div><label for={{id}}>{{options.label || \'Number\'}} {{options.required ? \'*\' : \'\'}}</label><input type=number id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled min={{options.min}} max={{options.max}} ng-minlength={{options.minlength}} ng-maxlength={{options.maxlength}} ng-model=value></div>');
    $templateCache.put('directives/formly-field-password.html', '<div><label for={{id}}>{{options.label || \'Password\'}} {{options.required ? \'*\' : \'\'}}</label><input type=password id={{id}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-radio.html', '<div><label>{{options.label}} {{options.required ? \'*\' : \'\'}}</label><div ng-repeat="(key, option) in options.options"><label><input type=radio name={{id}} id="{{id + \'_\'+ $index}}" ng-value=option.value ng-required=options.required ng-model=$parent.value> {{option.name}}</label></div></div>');
    $templateCache.put('directives/formly-field-select.html', '<div><label for={{id}}>{{options.label || \'Select\'}} {{options.required ? \'*\' : \'\'}}</label><select id={{id}} ng-model=value ng-required=options.required ng-disabled=options.disabled ng-init="value = options.options[options.default]" ng-options="option.name group by option.group for option in options.options"></select></div>');
    $templateCache.put('directives/formly-field-text.html', '<div><label for={{id}}>{{options.label || \'Text\'}} {{options.required ? \'*\' : \'\'}}</label><input type=text id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-textarea.html', '<div><label for={{id}}>{{options.label || \'Text\'}} {{options.required ? \'*\' : \'\'}}</label><textarea type=text id={{id}} rows={{options.lines}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value>\n' + '\t</textarea></div>');
    $templateCache.put('directives/formly-field.html', '');
    $templateCache.put('directives/formly-form.html', '<form class=formly role=form><formly-field ng-repeat="field in fields" options=field form-value=result[field.key||$index] form-id=options.uniqueFormId index=$index ng-hide=field.hide></formly-field><button type=submit ng-hide=options.hideSubmit>{{options.submitCopy || "Submit"}}</button></form>');
  }
]);