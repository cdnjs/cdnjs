'use strict';
/**
 * Binds a CodeMirror widget to a <textarea> element.
 */
angular.module('ui.codemirror', []).constant('uiCodemirrorConfig', {}).directive('uiCodemirror', [
  'uiCodemirrorConfig',
  function (uiCodemirrorConfig) {
    return {
      restrict: 'EA',
      require: '?ngModel',
      priority: 1,
      compile: function compile(tElement) {
        // Require CodeMirror
        if (angular.isUndefined(window.CodeMirror)) {
          throw new Error('ui-codemirror need CodeMirror to work... (o rly?)');
        }
        // Create a codemirror instance with
        // - the function that will to place the editor into the document.
        // - the initial content of the editor.
        //   see http://codemirror.net/doc/manual.html#api_constructor
        var value = tElement.text();
        var codeMirror = new window.CodeMirror(function (cm_el) {
            angular.forEach(tElement.prop('attributes'), function (a) {
              if (a.name === 'ui-codemirror') {
                cm_el.setAttribute('ui-codemirror-opts', a.textContent);
              } else {
                cm_el.setAttribute(a.name, a.textContent);
              }
            });
            // FIX replaceWith throw not parent Error !
            if (tElement.parent().length <= 0) {
              tElement.wrap('<div>');
            }
            tElement.replaceWith(cm_el);
          }, { value: value });
        return function postLink(scope, iElement, iAttrs, ngModel) {
          var options, opts;
          options = uiCodemirrorConfig.codemirror || {};
          opts = angular.extend({}, options, scope.$eval(iAttrs.uiCodemirror), scope.$eval(iAttrs.uiCodemirrorOpts));
          function updateOptions(newValues) {
            for (var key in newValues) {
              if (newValues.hasOwnProperty(key)) {
                codeMirror.setOption(key, newValues[key]);
              }
            }
          }
          updateOptions(opts);
          if (angular.isDefined(scope.$eval(iAttrs.uiCodemirror))) {
            scope.$watch(iAttrs.uiCodemirror, updateOptions, true);
          }
          if (ngModel) {
            // CodeMirror expects a string, so make sure it gets one.
            // This does not change the model.
            ngModel.$formatters.push(function (value) {
              if (angular.isUndefined(value) || value === null) {
                return '';
              } else if (angular.isObject(value) || angular.isArray(value)) {
                throw new Error('ui-codemirror cannot use an object or an array as a model');
              }
              return value;
            });
            // Override the ngModelController $render method, which is what gets called when the model is updated.
            // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
            ngModel.$render = function () {
              //Code mirror expects a string so make sure it gets one
              //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
              var safeViewValue = ngModel.$viewValue || '';
              codeMirror.setValue(safeViewValue);
            };
            // Keep the ngModel in sync with changes from CodeMirror
            codeMirror.on('change', function (instance) {
              var newValue = instance.getValue();
              if (newValue !== ngModel.$viewValue) {
                // Changes to the model from a callback need to be wrapped in $apply or angular will not notice them
                scope.$apply(function () {
                  ngModel.$setViewValue(newValue);
                });
              }
            });
          }
          // Watch ui-refresh and refresh the directive
          if (iAttrs.uiRefresh) {
            scope.$watch(iAttrs.uiRefresh, function (newVal, oldVal) {
              // Skip the initial watch firing
              if (newVal !== oldVal) {
                codeMirror.refresh();
              }
            });
          }
          // onLoad callback
          if (angular.isFunction(opts.onLoad)) {
            opts.onLoad(codeMirror);
          }
        };
      }
    };
  }
]);