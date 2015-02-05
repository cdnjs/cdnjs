'use strict';

/**
 * Add querySelectorAll() to jqLite.
 *
 * jqLite find() is limited to lookups by tag name.
 * TODO This will change with AngularJS 1.3, to be removed when this happens
 *
 * See jqLite.find - why not use querySelectorAll? https://github.com/angular/angular.js/issues/3586
 * See feat(jqLite): use querySelectorAll instead of getElementsByTagName in jqLite.find https://github.com/angular/angular.js/pull/3598
 */
if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

angular.module('ui.select', [])

.constant('uiSelectConfig', {
  defaultTheme: 'select2',
  defaultPlaceholder: 'Select Item'
})

.directive('uiSelect',
  ['$document', '$timeout', 'uiSelectConfig',
  function($document, $timeout, uiSelectConfig) {

  return {
    restrict: 'E',
    templateUrl: function(tElement, tAttrs) {
      var theme = tAttrs.theme || uiSelectConfig.defaultTheme;
      return theme + '/select.tpl.html';
    },
    replace: true,
    require: ['uiSelect', 'ngModel'],
    transclude: true,
    scope: true,
    controllerAs: 'uiSelectCtrl',

    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
      var ctrl = this;

      this.activate = function($event) {
        if ($event) $event.stopPropagation(); // Prevent bubbling
        $scope.open = true;
        // Give it time to appear before focus
        $timeout(function() {
          ctrl.input[0].focus();
        });
      };

      this.select = function(item) {
        $scope.$select.selected = item;
        this.close();
        // Using a watch instead of $scope.ngModel.$setViewValue(item)
      };

      this.close = function() {
        $scope.open = false;
        $scope.$select.search = "";
      };

      this.input = $element.find('input'); // TODO could break if input is at other template
    }],

    link: function(scope, element, attrs, controllers, transcludeFn) {
      scope.open = false;
      scope.$select = {}; // Namespace

      var uiSelectCtrl = controllers[0];
      var ngModelCtrl = controllers[1];

      scope.$watch('$select.selected', function(newVal, oldVal) {
        if (ngModelCtrl.$viewValue !== newVal) ngModelCtrl.$setViewValue(newVal);
      });

      ngModelCtrl.$render = function() {
        scope.$select.selected = ngModelCtrl.$viewValue;
      };

      // See Click everywhere but here event http://stackoverflow.com/questions/12931369/click-everywhere-but-here-event
      $document.on('mousedown', function(evt) {
        var contains = false;

        if (window.jQuery) {
          // Firefox 3.6 does not support element.contains()
          // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
          contains = $.contains(element[0], evt.target);
        } else {
          contains = element[0].contains(evt.target);
        }

        if (!contains) {
          uiSelectCtrl.close();
          scope.$digest();
        }
      });

      scope.$on('$destroy', function() {
        $document.off('mousedown');
      });

      // Move transcluded elements to their correct position on main template
      transcludeFn(scope, function(clone) {
        var transcluded = angular.element('<div>').append(clone);

        // Child directives could be uncompiled at this point, so we check both alternatives,
        // first for compiled version (by class) or uncompiled (by tag). We place the directives
        // at the insertion points that are marked with ui-select-* classes inside the templates
        // TODO: If we change directive restrict attribute to EA, we should do some changes here.

        var transMatch = transcluded.querySelectorAll('.ui-select-match');
        transMatch = !transMatch.length ? transcluded.find('match') : transMatch;
        element.querySelectorAll('.ui-select-match').replaceWith(transMatch);

        var transChoices = transcluded.querySelectorAll('.ui-select-choices');
        transChoices = !transChoices.length ? transcluded.find('choices') : transChoices;
        element.querySelectorAll('.ui-select-choices').replaceWith(transChoices);
      });
    }
  };
}])

.directive('choices', ['$sce', 'uiSelectConfig', function($sce, uiSelectConfig) {
  var HOT_KEYS = [9, 13, 27, 38, 40];
  return {
    require: '^uiSelect',
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.defaultTheme;
      return theme + '/choices.tpl.html';
    },

    compile: function(tElement, tAttrs) {

      tElement.querySelectorAll('.ui-select-choices-row')
        .attr("ng-repeat", 'item in ' + tAttrs.data)
        .attr("ng-mouseenter", '$select.activeIdx=$index')
        .attr("ng-click", 'uiSelectCtrl.select(item)');

      return function(scope, element, attrs, uiSelectCtrl) {

        scope.trustAsHtml = function(value) {
          return $sce.trustAsHtml(value);
        };

        var container = element.hasClass('ui-select-choices-content') ? element : element.querySelectorAll('.ui-select-choices-content');

        function ensureHighlightVisible() {
          var rows = element.querySelectorAll('.ui-select-choices-row');
          if (!rows.length) return;
          var highlighted = rows[scope.$select.activeIdx],
              posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop,
              maxHeight = 200; // TODO Need to get this value from container.max-height
          if (posY > maxHeight) {
            container[0].scrollTop += posY-maxHeight;
          } else if (posY < highlighted.clientHeight) {
            container[0].scrollTop -= highlighted.clientHeight-posY;
          }
        }

        scope.$watch('$select.search', function() {
          scope.$select.activeIdx = 0;
          ensureHighlightVisible();
        });

        // Bind keyboard events related to choices
        uiSelectCtrl.input.on('keydown', function(evt) {

          if (HOT_KEYS.indexOf(evt.which) === -1) return; // Exit on regular key
          evt.preventDefault();

          var rows = element.querySelectorAll('.ui-select-choices-row');

          if (evt.which === 40) { // down(40)
            if (scope.$select.activeIdx < rows.length) {
              scope.$select.activeIdx = (scope.$select.activeIdx + 1) % rows.length || rows.length - 1 ;
              ensureHighlightVisible();
              scope.$digest();
            }

          } else if (evt.which === 38) { // up(38)
            if (scope.$select.activeIdx > 0) {
              scope.$select.activeIdx--;
              ensureHighlightVisible();
              scope.$digest();
            }

          } else if (evt.which === 13 || evt.which === 9) { // enter(13) and tab(9)
            angular.element(rows[scope.$select.activeIdx]).triggerHandler('click');

          } else if (evt.which === 27) { // esc(27)
            evt.stopPropagation();
            uiSelectCtrl.close();
            scope.$digest();

          }
        });

        scope.$on('$destroy', function() {
          uiSelectCtrl.input.off('keydown');
        });

      };
    }
  };
}])

.directive('match', ['$compile', 'uiSelectConfig', function($compile, uiSelectConfig) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.defaultTheme;
      return theme + '/match.tpl.html';
    },
    link: function(scope, element, attrs) {
      scope.placeholder = attrs.placeholder || uiSelectConfig.defaultPlaceholder;
    }
  };
}])

.filter('highlight', function() {
  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  }
  return function(matchItem, query) {
    return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
  };
});

angular.module('ui.select').run(['$templateCache', function ($templateCache) {
	$templateCache.put('select2/choices.tpl.html', '<ul class="ui-select-choices ui-select-choices-content select2-results"> <li class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.activeIdx==$index}"> <div class="select2-result-label" ng-transclude></div> </li> </ul> ');
	$templateCache.put('select2/match.tpl.html', '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.selected == undefined}" ng-click="uiSelectCtrl.activate($event)"> <span ng-hide="$select.selected" class="select2-chosen">{{placeholder}}</span> <span ng-show="$select.selected" class="select2-chosen" ng-transclude></span> <span class="select2-arrow"><b></b></span> </a> ');
	$templateCache.put('select2/select.tpl.html', '<div class="select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open\': open}"> <div class="ui-select-match"></div> <div ng-class="{\'select2-display-none\': !open}" class="select2-drop select2-with-searchbox select2-drop-active"> <div class="select2-search"> <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search select2-input" ng-model="$select.search"> </div> <div class="ui-select-choices"></div> </div> </div> ');
	$templateCache.put('selectize/choices.tpl.html', '<div ng-show="open" class="ui-select-choices selectize-dropdown single"> <div class="ui-select-choices-content selectize-dropdown-content"> <div class="ui-select-choices-row" ng-class="{\'active\': $select.activeIdx==$index}" ng-click="$select(item)" ng-mouseenter="$select.index=$index"> <div class="option" data-selectable ng-transclude></div> </div> </div> </div> ');
	$templateCache.put('selectize/match.tpl.html', '<div ng-hide="open || !$select.selected" class="ui-select-match" ng-transclude></div> ');
	$templateCache.put('selectize/select.tpl.html', '<div class="selectize-control single"> <div class="selectize-input" ng-class="{\'focus\': open}" ng-click="uiSelectCtrl.activate($event)"> <div class="ui-select-match"></div> <input type="text" class="ui-select-search" autocomplete="off" tabindex="" placeholder="{{placeholder}}" ng-model="$select.search" ng-hide="$select.selected && !open"> </div> <div class="ui-select-choices"></div> </div> ');
}]);