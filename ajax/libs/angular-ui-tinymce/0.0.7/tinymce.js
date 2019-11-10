/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['$rootScope', '$window', 'uiTinymceConfig', function($rootScope, $window, uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      require: ['ngModel', '^?form'],
      link: function(scope, element, attrs, ctrls) {
        if (!$window.tinymce) {
          return;
        }

        var ngModel = ctrls[0],
          form = ctrls[1] || null;

        var expression, options, tinyInstance,
          updateView = function(editor) {
            if (options.raw === true) {
              ngModel.$setViewValue(editor.getContent({format: 'text'}).trim());
            } else {
              ngModel.$setViewValue(editor.getContent().trim());
            }
            if (!$rootScope.$$phase) {
              scope.$apply();
            }
            if (angular.isFunction(options.onChange)) {
              options.onChange();
            }
          };

        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }

        expression = {};

        angular.extend(expression, scope.$eval(attrs.uiTinymce));

        options = {
          // Update model when calling setContent (such as from the source editor popup)
          setup: function(ed) {
            ed.on('init', function() {
              ngModel.$render();
              ngModel.$setPristine();
              if (form) {
                form.$setPristine();
              }
            });
            // Update model on button click
            ed.on('ExecCommand', function() {
              ed.save();
              updateView(ed);
            });
            // Update model on change
            ed.on('change', function(e) {
              if (!e.originalEvent) {
                ed.save();
                updateView(ed);
              }
            });
            ed.on('blur', function() {
              element[0].blur();
            });
            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function() {
              ed.save();
              updateView(ed);
            });
            if (expression.setup) {
              expression.setup(ed, {
                updateView: updateView
              });
            }
          },
          selector: '#' + attrs.id
        };
        // extend options with initial uiTinymceConfig and options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        tinymce.init(options);

        ngModel.$formatters.unshift(function(modelValue) {
          return modelValue || '';
        });

        ngModel.$render = function() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }

          var format = options.raw ? 'text' : 'raw';

          // tinymce replaces "\r\n" to "\n", so we have to do the same on model value
          if (tinyInstance &&
            tinyInstance.getContent({format: format}).trim() !== ngModel.$viewValue.replace(/\r\n/g, '\n')
          ) {
            tinyInstance.setContent(ngModel.$viewValue);
          }
        };

        scope.$on('$destroy', function() {
          if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });
      }
    };
  }]);
