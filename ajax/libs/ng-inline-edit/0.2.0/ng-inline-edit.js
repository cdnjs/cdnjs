/**
 * ng-inline-edit v0.2.0 (http://tamerayd.in/ng-inline-edit)
 * Copyright 2015 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT
 */
(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.controllers', [])
    .controller('InlineEditController', ['$scope', '$document', '$timeout',
      function($scope, $document, $timeout) {
        $scope.validationError = false;
        $scope.validating = false;
        $scope.cancelOnBlur = false;
        $scope.editMode = false;
        $scope.inputValue = '';

        $scope.editText = function(inputValue) {
          $scope.editMode = true;
          $scope.inputValue = (typeof inputValue === 'string') ?
            inputValue : $scope.model;

          $timeout(function() {
            $scope.editInput[0].focus();
            $document.bind('click', $scope.onDocumentClick);
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

          function _onEnd() {
            $scope.validating = false;
            if (byDOM) {
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

            if (validationResult.then) { // promise
              validationResult
                .then(_onSuccess)
                .catch(_onFailure)
                .finally(_onEnd);

            } else if (validationResult) {
              _onSuccess();
              _onEnd();

            } else {
              _onFailure();
              _onEnd();
            }
          }

          $document.unbind('click', $scope.onDocumentClick);
        };

        $scope.onInputKeyup = function(event) {
          if (!$scope.validating) {
            switch (event.keyCode) {
              case 13: // ENTER
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
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile',
      function($compile) {
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
            if (attrs.hasOwnProperty('inlineEditCancelOnBlur')) {
              scope.cancelOnBlur = true;
            }

            // check if proper validation method is provided:
            if (!attrs.inlineEditValidation ||
              typeof scope.$parent.$eval(attrs.inlineEditValidation.split('(')[0]) !== 'function') {
              scope.validate = function() {
                return true;
              };
            }

            var container = angular.element(
              '<div class="ng-inline-edit" ' +
                'ng-class="{\'ng-inline-edit--validating\': validating, ' +
                  '\'ng-inline-edit--error\': validationError}">');

            var input = angular.element(
              '<input type="text" class="ng-inline-edit__input" ' +
                'ng-disabled="validating" ' +
                'ng-show="editMode" ' +
                'ng-keyup="onInputKeyup($event)" ' +
                'ng-model="inputValue" />');
            var innerContainer = angular.element(
              '<div class="ng-inline-edit__inner-container"></div>');

            innerContainer
              // text
              .append(angular.element(
                '<span class="ng-inline-edit__text" ' +
                  'ng-hide="editMode">{{model}}</span>'))
              // button
              .append(angular.element(
                '<a class="ng-inline-edit__button" ' +
                  'ng-show="!editMode" ' +
                  'ng-click="editText()">' + (attrs.inlineEditButtonHtml || '') + '</a>'));

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
          }
        };
      }
    ]);

})(window, window.angular);

(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit', [
      'angularInlineEdit.controllers',
      'angularInlineEdit.directives'
    ]);

})(window, window.angular);
