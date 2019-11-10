/**
 * ng-inline-edit v0.7.0 (http://tamerayd.in/ng-inline-edit)
 * Copyright 2015 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.providers', [])
    .value('InlineEditConfig', {
      btnEdit: 'Edit',
      btnSave: '',
      btnCancel: '',
      editOnClick: false,
      onBlur: null
    })
    .constant('InlineEditConstants', {
      CANCEL: 'cancel',
      SAVE: 'save'
    });

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.placeholder = '';
        $scope.validationError = false;
        $scope.validating = false;
        $scope.isOnBlurBehaviorValid = false;
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function(inputValue) {
          $scope.editMode = true;
          $scope.inputValue = (typeof inputValue === 'string') ?
            inputValue : $scope.model;

          $timeout(function() {
            $scope.editInput[0].focus();
            if ($scope.isOnBlurBehaviorValid) {
              $document.bind('click', $scope.onDocumentClick);
            }
          }, 0);
        };

        $scope.applyText = function(cancel, byDOM) {
          var inputValue = $scope.inputValue; // initial input value
          $scope.validationError = false;

          function _onSuccess() {
            $scope.model = inputValue;
            $scope.callback({
              newValue: inputValue
            });

            $scope.editMode = false;
          }

          function _onFailure() {
            $scope.validationError = true;
            $timeout(function() {
              $scope.editText(inputValue);
            }, 0);
          }

          function _onEnd(apply) {
            $scope.validating = false;
            if (apply && byDOM) {
              $scope.$apply();
            }
          }

          if (cancel || $scope.model === inputValue) {
            $scope.editMode = false;
            if (byDOM) {
              $scope.$apply();
            }

          } else {
            $scope.validating = true;
            if (byDOM) {
              $scope.$apply();
            }

            var validationResult = $scope.validate({
                newValue: $scope.inputValue
              });

            if (validationResult && validationResult.then) { // promise
              validationResult
                .then(_onSuccess)
                .catch(_onFailure)
                .finally(_onEnd);

            } else if (validationResult ||
                typeof validationResult === 'undefined') {
              _onSuccess();
              _onEnd(true);

            } else {
              _onFailure();
              _onEnd(true);
            }
          }

          if ($scope.isOnBlurBehaviorValid) {
            $document.unbind('click', $scope.onDocumentClick);
          }
        };

        $scope.onInputKeyup = function(event) {
          if (!$scope.validating) {
            switch (event.keyCode) {
              case 13: // ENTER
                if ($scope.isInputTextarea) {
                  return;
                }
                $scope.applyText(false, false);
                break;
              case 27: // ESC
                $scope.applyText(true, false);
                break;
              default:
                break;
            }
          }
        };

        $scope.onDocumentClick = function(event) {
          if (!$scope.validating) {
            if (event.target !== $scope.editInput[0]) {
              $scope.applyText($scope.cancelOnBlur, true);
            }
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.providers',
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile', 'InlineEditConfig', 'InlineEditConstants',
      function($compile, InlineEditConfig, InlineEditConstants) {
        return {
          restrict: 'A',
          controller: 'InlineEditController',
          scope: {
            model: '=inlineEdit',
            callback: '&inlineEditCallback',
            validate: '&inlineEditValidation'
          },
          link: function(scope, element, attrs) {
            scope.model = scope.$parent.$eval(attrs.inlineEdit);
            scope.isInputTextarea = attrs.hasOwnProperty('inlineEditTextarea');

            var onBlurBehavior = attrs.hasOwnProperty('inlineEditOnBlur') ?
              attrs.inlineEditOnBlur : InlineEditConfig.onBlur;
            if (onBlurBehavior === InlineEditConstants.CANCEL ||
                onBlurBehavior === InlineEditConstants.SAVE) {
              scope.isOnBlurBehaviorValid = true;
              scope.cancelOnBlur = onBlurBehavior === InlineEditConstants.CANCEL;
            }

            var container = angular.element(
              '<div class="ng-inline-edit" ' +
                'ng-class="{\'ng-inline-edit--validating\': validating, ' +
                  '\'ng-inline-edit--error\': validationError}">');

            var input = angular.element(
              (scope.isInputTextarea ?
                '<textarea ' : '<input type="text" ') +
                'class="ng-inline-edit__input" ' +
                'ng-disabled="validating" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" ' +
                'placeholder="{{placeholder}}" />');

            var innerContainer = angular.element(
              '<div class="ng-inline-edit__inner-container"></div>');

            // text
            innerContainer.append(angular.element(
              '<span class="ng-inline-edit__text" ' +
                'ng-class="{\'ng-inline-edit__text--placeholder\': !model}" ' +
                (attrs.hasOwnProperty('inlineEditOnClick') || InlineEditConfig.editOnClick ?
                  'ng-click="editText()" ' : '') +
                'ng-if="!editMode">{{(model || placeholder)' +
                  (attrs.hasOwnProperty('inlineEditFilter') ? ' | ' + attrs.inlineEditFilter : '') +
                  '}}</span>'));

            // edit button
            var inlineEditBtnEdit = attrs.hasOwnProperty('inlineEditBtnEdit') ?
              attrs.inlineEditBtnEdit : InlineEditConfig.btnEdit;
            if (inlineEditBtnEdit) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--edit" ' +
                  'ng-if="!editMode" ' +
                  'ng-click="editText()">' +
                    inlineEditBtnEdit +
                '</a>'));
            }

            // save button
            var inlineEditBtnSave = attrs.hasOwnProperty('inlineEditBtnSave') ?
              attrs.inlineEditBtnSave : InlineEditConfig.btnSave;
            if (inlineEditBtnSave) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--save" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(false, false)">' +
                    inlineEditBtnSave +
                '</a>'));
            }

            // cancel button
            var inlineEditBtnCancel = attrs.hasOwnProperty('inlineEditBtnCancel') ?
              attrs.inlineEditBtnCancel : InlineEditConfig.btnCancel;
            if (inlineEditBtnCancel) {
              innerContainer.append(angular.element(
                '<a class="ng-inline-edit__button ng-inline-edit__button--cancel" ' +
                  'ng-if="editMode && !validating" ' +
                  'ng-click="applyText(true, false)">' +
                    inlineEditBtnCancel +
                '</a>'));
            }

            container
              .append(input)
              .append(innerContainer);

            element
              .append(container);

            scope.editInput = input;

            attrs.$observe('inlineEdit', function(newValue) {
              scope.model = scope.$parent.$eval(newValue);
              $compile(element.contents())(scope);
            });

            attrs.$observe('inlineEditPlaceholder', function(placeholder) {
              scope.placeholder = placeholder;
            });

            scope.$watch('model', function(newValue) {
              if (!isNaN(parseFloat(newValue)) && isFinite(newValue) && newValue === 0) {
                scope.model = '0';
              }
            });
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit', [
      'angularInlineEdit.providers',
      'angularInlineEdit.controllers',
      'angularInlineEdit.directives'
    ]);

})(window, window.angular);
