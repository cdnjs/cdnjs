/*  angular-summernote v0.8.0 | (c) 2016 JeongHoon Byun | MIT license */
/* global angular */
angular.module('summernote', [])

  .controller('SummernoteController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
    'use strict';

    var currentElement,
        summernoteConfig = angular.copy($scope.summernoteConfig) || {};

    if (angular.isDefined($attrs.height)) { summernoteConfig.height = +$attrs.height; }
    if (angular.isDefined($attrs.minHeight)) { summernoteConfig.minHeight = +$attrs.minHeight; }
    if (angular.isDefined($attrs.maxHeight)) { summernoteConfig.maxHeight = +$attrs.maxHeight; }
    if (angular.isDefined($attrs.placeholder)) { summernoteConfig.placeholder = $attrs.placeholder; }
    if (angular.isDefined($attrs.focus)) { summernoteConfig.focus = true; }
    if (angular.isDefined($attrs.airmode)) { summernoteConfig.airMode = true; }
    if (angular.isDefined($attrs.lang)) {
      if (!angular.isDefined($.summernote.lang[$attrs.lang])) {
        throw new Error('"' + $attrs.lang + '" lang file must be exist.');
      }
      summernoteConfig.lang = $attrs.lang;
    }

    summernoteConfig.callbacks = summernoteConfig.callbacks || {};
    
    if (angular.isDefined($attrs.onInit)) {
      summernoteConfig.callbacks.onInit = function(evt) {
        $scope.init({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onEnter)) {
      summernoteConfig.callbacks.onEnter = function(evt) {
        $scope.enter({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onFocus)) {
      summernoteConfig.callbacks.onFocus = function(evt) {
        $scope.focus({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onPaste)) {
      summernoteConfig.callbacks.onPaste = function(evt) {
        $scope.paste({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onKeyup)) {
      summernoteConfig.callbacks.onKeyup = function(evt) {
        $scope.keyup({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onKeydown)) {
      summernoteConfig.callbacks.onKeydown = function(evt) {
        $scope.keydown({evt:evt});
      };
    }
    if (angular.isDefined($attrs.onImageUpload)) {
      summernoteConfig.callbacks.onImageUpload = function(files) {
        $scope.imageUpload({files:files, editable: $scope.editable});
      };
    }
    if (angular.isDefined($attrs.onMediaDelete)) {
      summernoteConfig.callbacks.onMediaDelete = function(target) {
        // make new object that has information of target to avoid error:isecdom
        var removedMedia = {attrs: {}};
        removedMedia.tagName = target[0].tagName;
        angular.forEach(target[0].attributes, function(attr) {
          removedMedia.attrs[attr.name] = attr.value;
        });
        $scope.mediaDelete({target: removedMedia});
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

      var originalOnChange = summernoteConfig.callbacks.onChange;
      summernoteConfig.callbacks.onChange = function (contents) {
        $timeout(function () {
          if (element.summernote('isEmpty')) {
            contents = '';
          }
          updateNgModel();
        }, 0);
        if (angular.isDefined($attrs.onChange)) {
          $scope.change({contents: contents, editable: $scope.editable});
        } else if (angular.isFunction(originalOnChange)) {
          originalOnChange.apply(this, arguments);
        }
      };
      if (angular.isDefined($attrs.onBlur)) {
        summernoteConfig.callbacks.onBlur = function (evt) {
          (!summernoteConfig.airMode) && element.blur();
          $scope.blur({evt: evt});
        };
      }
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
          if (ngModel.$viewValue) {
            element.summernote('code', ngModel.$viewValue);
          } else {
            element.summernote('empty');
          }
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
        imageUpload: '&onImageUpload',
        mediaDelete: '&onMediaDelete'
      },
      template: '<div class="summernote"></div>',
      link: function(scope, element, attrs, ctrls, transclude) {
        var summernoteController = ctrls[0],
          ngModel = ctrls[1];

          if (!ngModel) {
            transclude(scope, function(clone, scope) {
              // to prevent binding to angular scope (It require `tranclude: 'element'`)
              element.append(clone.html());
            });
            summernoteController.activate(scope, element, ngModel);
          } else {
            scope.$watch(function() {
              return ngModel.$viewValue;
            }, function(value) {
              element.append(value);
              summernoteController.activate(scope, element, ngModel);
            }, true);
          }
      }
    };
  }]);
