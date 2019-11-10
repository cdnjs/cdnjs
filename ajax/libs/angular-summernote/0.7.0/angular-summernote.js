/*  angular-summernote v0.7.0 | (c) 2014, 2015 JeongHoon Byun | MIT license */
/* global angular */
angular.module('summernote', [])

  .controller('SummernoteController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
    'use strict';

    var currentElement,
        summernoteConfig = $scope.summernoteConfig || {};

    if (angular.isDefined($attrs.height)) { summernoteConfig.height = $attrs.height; }
    if (angular.isDefined($attrs.focus)) { summernoteConfig.focus = true; }
    if (angular.isDefined($attrs.airmode)) { summernoteConfig.airMode = true; }
    if (angular.isDefined($attrs.lang)) {
      if (!angular.isDefined($.summernote.lang[$attrs.lang])) {
        throw new Error('"' + $attrs.lang + '" lang file must be exist.');
      }
      summernoteConfig.lang = $attrs.lang;
    }

    var callbacks = {};
    callbacks.onInit = $scope.init;
    callbacks.onEnter = function(evt) { $scope.enter({evt:evt}); };
    callbacks.onFocus = function(evt) { $scope.focus({evt:evt}); };
    callbacks.onPaste = function(evt) { $scope.paste({evt:evt}); };
    callbacks.onKeyup = function(evt) { $scope.keyup({evt:evt}); };
    callbacks.onKeydown = function(evt) { $scope.keydown({evt:evt}); };
    if (angular.isDefined($attrs.onImageUpload)) {
      callbacks.onImageUpload = function(files) {
        $scope.imageUpload({files:files, editable: $scope.editable});
      };
    }

    this.activate = function(scope, element, ngModel) {
      var updateNgModel = function() {
        var newValue = element.summernote('code');
        if (element.summernote('isEmpty')) { newValue = ''; }
        if (ngModel && ngModel.$viewValue !== newValue) {
          $timeout(function() {
            ngModel.$setViewValue(newValue);
          }, 0);
        }
      };

      callbacks.onChange = function(contents) {
        if (element.summernote('isEmpty')) { contents = ''; }
        updateNgModel();
        $scope.change({contents:contents, editable: $scope.editable});
      };
      callbacks.onBlur = function(evt) {
        (!summernoteConfig.airMode) && element.blur();
        $scope.blur({evt:evt});
      };
      summernoteConfig.callbacks = callbacks;
      element.summernote(summernoteConfig);

      var editor$ = element.next('.note-editor'),
          unwatchNgModel;
      editor$.find('.note-toolbar').click(function() {
        updateNgModel();

        // sync ngModel in codeview mode
        if (editor$.hasClass('codeview')) {
          editor$.on('keyup', updateNgModel);
          if (ngModel) {
            unwatchNgModel = scope.$watch(function () {
              return ngModel.$modelValue;
            }, function(newValue) {
              editor$.find('.note-codable').val(newValue);
            });
          }
        } else {
          editor$.off('keyup', updateNgModel);
          if (angular.isFunction(unwatchNgModel)) {
            unwatchNgModel();
          }
        }
      });

      if (ngModel) {
        ngModel.$render = function() {
          element.summernote('code', ngModel.$viewValue || '');
        };
      }

      // set editable to avoid error:isecdom since Angular v1.3
      if (angular.isDefined($attrs.editable)) {
        $scope.editable = editor$.find('.note-editable');
      }
      if (angular.isDefined($attrs.editor)) {
        $scope.editor = element;
      }

      currentElement = element;
      // use jquery Event binding instead $on('$destroy') to preserve options data of DOM
      element.on('$destroy', function() {
        element.summernote('destroy');
        $scope.summernoteDestroyed = true;
      });
    };

    $scope.$on('$destroy', function () {
      // when destroying scope directly
      if (!$scope.summernoteDestroyed) {
        currentElement.summernote('destroy');
      }
    });
  }])
  .directive('summernote', [function() {
    'use strict';

    return {
      restrict: 'EA',
      transclude: 'element',
      replace: true,
      require: ['summernote', '?ngModel'],
      controller: 'SummernoteController',
      scope: {
        summernoteConfig: '=config',
        editable: '=',
        editor: '=',
        init: '&onInit',
        enter: '&onEnter',
        focus: '&onFocus',
        blur: '&onBlur',
        paste: '&onPaste',
        keyup: '&onKeyup',
        keydown: '&onKeydown',
        change: '&onChange',
        imageUpload: '&onImageUpload'
      },
      template: '<div class="summernote"></div>',
      link: function(scope, element, attrs, ctrls, transclude) {
        var summernoteController = ctrls[0],
            ngModel = ctrls[1];

        transclude(scope, function(clone, scope) {
          // to prevent binding to angular scope (It require `tranclude: 'element'`)
          element.append(clone.html());
        });

        summernoteController.activate(scope, element, ngModel);
      }
    };
  }]);
