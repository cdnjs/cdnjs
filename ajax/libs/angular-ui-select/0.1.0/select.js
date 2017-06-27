'use strict';

/**
 * Add querySelectorAll() to jqLite.
 *
 * jqLite find() is limited to lookups by tag name.
 * TODO This will change with future versions of AngularJS, to be removed when this happens
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
  theme: 'select2',
  placeholder: '' // Empty by default, like HTML tag <select>
})

/**
 * Parses "repeat" attribute.
 *
 * Taken from AngularJS ngRepeat source code
 * See https://github.com/angular/angular.js/blob/55848a9139/src/ng/directive/ngRepeat.js#L211
 *
 * Original discussion about parsing "repeat" attribute instead of fully relying on ng-repeat:
 * https://github.com/angular-ui/ui-select/commit/5dd63ad#commitcomment-5504697
 */
.service('RepeatParser', function() {
  var self = this;

  /**
   * Example:
   * expression = "address in getAddress($select.search) track by $index
   * lhs = "address",
   * rhs = "getAddress($select.search)",
   * trackByExp = "$index",
   * valueIdentifier = "address",
   * keyIdentifier = undefined
   */
  self.parse = function(expression) {
    var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

    if (!match) {
      throw new Error("Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                      expression);
    }

    var lhs = match[1]; // Left-hand side
    var rhs = match[2]; // Right-hand side
    var trackByExp = match[3];

    match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
    if (!match) {
      throw new Error("'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                      lhs);
    }

    var valueIdentifier = match[3] || match[1];
    var keyIdentifier = match[2];

    return {
      lhs: lhs,
      rhs: rhs,
      trackByExp: trackByExp
    };
  };

  self.getNgRepeatExpression = function(lhs, rhs, trackByExp) {
    var expression = lhs + ' in ' + rhs;
    if (trackByExp) {
      expression += ' track by ' + trackByExp;
    }
    return expression;
  };
})

/**
 * Contains ui-select "intelligence".
 *
 * The goal is to limit dependency on the DOM whenever possible and
 * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.
 */
.controller('uiSelectCtrl',
  ['$scope', '$element', '$timeout', 'RepeatParser', '$parse', '$q',
  function($scope, $element, $timeout, RepeatParser, $parse, $q) {

  var ctrl = this;

  var EMPTY_SEARCH = '';

  ctrl.placeholder = undefined;
  ctrl.search = EMPTY_SEARCH;
  ctrl.activeIndex = 0;
  ctrl.items = [];
  ctrl.selected = undefined;
  ctrl.open = false;
  ctrl.disabled = false;

  ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');

  // When the user clicks on ui-select, displays the dropdown list
  ctrl.activate = function() {
    if (ctrl.disabled === false) {
      ctrl.open = true;
      // Give it time to appear before focus
      $timeout(function() {
        ctrl.searchInput[0].focus();
      });
    }
  };

  var _repeatRhsIsCollection = null;
  var _repeatRhsFn = null;

  ctrl.parseRepeatAttr = function(repeatAttr) {
    var repeat = RepeatParser.parse(repeatAttr);
    _repeatRhsFn = $parse(repeat.rhs);

    var collectionOrPromise = _repeatRhsFn($scope);

    // Hackish :/
    // Determine if the repeat expression (repeat.rhs) gives us a collection or a promise
    // If it is a collection we need to $watch it in order to update ctrl.items
    _repeatRhsIsCollection = angular.isArray(collectionOrPromise);

    if (_repeatRhsIsCollection) {
      // See https://github.com/angular/angular.js/blob/55848a9139/src/ng/directive/ngRepeat.js#L259
      $scope.$watchCollection(repeat.rhs, function(items) {
        ctrl.items = items;
      });
    }
  };

  ctrl.populateItems = function() {
    if (!_repeatRhsIsCollection) {
      var promise = _repeatRhsFn($scope);

      // See https://github.com/angular-ui/bootstrap/blob/d0024931de/src/typeahead/typeahead.js#L109
      // See https://github.com/mgcrea/angular-strap/blob/1529ab4bbc/src/helpers/parse-options.js#L35
      $q.when(promise).then(function(items) {
        ctrl.items = items;
      });
    }
  };

  // When the user clicks on an item inside the dropdown list
  ctrl.select = function(item) {
    ctrl.selected = item;
    ctrl.close();
    // Using a watch instead of $scope.ngModel.$setViewValue(item)
  };

  ctrl.close = function() {
    if (ctrl.open) {
      ctrl.open = false;
      if (_repeatRhsIsCollection) {
        // This means if repeat.rhs is a promise, we keep the search term (ctrl.search)
        // even after the dropdown being closed
        ctrl.search = EMPTY_SEARCH;
      }
    }
  };

  var Key = {
    Enter: 13,
    Tab: 9,
    Up: 38,
    Down: 40,
    Escape: 27
  };

  ctrl.onKeydown = function(key) {
    var processed = true;
    switch (key) {
      case Key.Down:
        if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }
        break;
      case Key.Up:
        if (ctrl.activeIndex > 0) { ctrl.activeIndex--; }
        break;
      case Key.Tab:
      case Key.Enter:
        ctrl.select(ctrl.items[ctrl.activeIndex]);
        break;
      case Key.Escape:
        ctrl.close();
        break;
      default:
        processed = false;
    }
    return processed;
  };
}])

.directive('uiSelect', ['$document', 'uiSelectConfig', function($document, uiSelectConfig) {
  return {
    restrict: 'EA',
    templateUrl: function(tElement, tAttrs) {
      var theme = tAttrs.theme || uiSelectConfig.theme;
      return theme + '/select.tpl.html';
    },
    replace: true,
    transclude: true,
    require: ['uiSelect', 'ngModel'],
    scope: true,

    controller: 'uiSelectCtrl',
    controllerAs: '$select',

    link: function(scope, element, attrs, ctrls, transcludeFn) {
      var $select = ctrls[0];
      var ngModel = ctrls[1];

      attrs.$observe('disabled', function() {
        $select.disabled = attrs.disabled ? true : false;
      });

      scope.$watch('$select.selected', function(newValue, oldValue) {
        if (ngModel.$viewValue !== newValue) {
          ngModel.$setViewValue(newValue);
        }
      });

      ngModel.$render = function() {
        $select.selected = ngModel.$viewValue;
      };

      function ensureHighlightVisible() {
        var container = element.querySelectorAll('.ui-select-choices-content');
        var rows = container.querySelectorAll('.ui-select-choices-row');

        var highlighted = rows[$select.activeIndex];
        var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
        var height = container[0].offsetHeight;

        if (posY > height) {
          container[0].scrollTop += posY - height;
        } else if (posY < highlighted.clientHeight) {
          container[0].scrollTop -= highlighted.clientHeight - posY;
        }
      }

      // Bind to keyboard shortcuts
      $select.searchInput.on('keydown', function(e) {
        scope.$apply(function() {
          var processed = $select.onKeydown(e.which);
          if (processed) {
            e.preventDefault();
            e.stopPropagation();

            ensureHighlightVisible();
          }
        });
      });

      // See Click everywhere but here event http://stackoverflow.com/questions/12931369
      $document.on('mousedown', function(e) {
        var contains = false;

        if (window.jQuery) {
          // Firefox 3.6 does not support element.contains()
          // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
          contains = $.contains(element[0], e.target);
        } else {
          contains = element[0].contains(e.target);
        }

        if (!contains) {
          $select.close();
          scope.$digest();
        }
      });

      scope.$on('$destroy', function() {
        $select.searchInput.off('keydown');
        $document.off('mousedown');
      });

      // Move transcluded elements to their correct position on main template
      transcludeFn(scope, function(clone) {
        var transcluded = angular.element('<div>').append(clone);

        // Child directives could be uncompiled at this point, so we check both alternatives,
        // first for compiled version (by class) or uncompiled (by tag). We place the directives
        // at the insertion points that are marked with ui-select-* classes inside the templates

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

.directive('choices', ['uiSelectConfig', 'RepeatParser', function(uiSelectConfig, RepeatParser) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/choices.tpl.html';
    },

    compile: function(tElement, tAttrs) {
      var repeat = RepeatParser.parse(tAttrs.repeat);

      tElement.querySelectorAll('.ui-select-choices-row')
        .attr('ng-repeat', RepeatParser.getNgRepeatExpression(repeat.lhs, '$select.items', repeat.trackByExp))
        .attr('ng-mouseenter', '$select.activeIndex = $index')
        .attr('ng-click', '$select.select(' + repeat.lhs + ')');

      return function link(scope, element, attrs, $select) {
        $select.parseRepeatAttr(attrs.repeat);

        scope.$watch('$select.search', function() {
          $select.activeIndex = 0;
          $select.populateItems(attrs.repeat);
        });
      };
    }
  };
}])

.directive('match', ['uiSelectConfig', function(uiSelectConfig) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/match.tpl.html';
    },
    link: function(scope, element, attrs, $select) {
      attrs.$observe('placeholder', function(placeholder) {
        $select.placeholder = placeholder || uiSelectConfig.placeholder;
      });
    }
  };
}])

/**
 * Highlights text that matches $select.search.
 *
 * Taken from AngularUI Bootstrap Typeahead
 * See https://github.com/angular-ui/bootstrap/blob/d0024931de/src/typeahead/typeahead.js#L352
 */
.filter('highlight', function() {
  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  return function(matchItem, query) {
    return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
  };
});

angular.module('ui.select').run(['$templateCache', function ($templateCache) {
	$templateCache.put('bootstrap/choices.tpl.html', '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length> 0"> <li class="ui-select-choices-row" ng-class="{active: $select.activeIndex===$index}"> <a href="javascript:void(0)" ng-transclude></a> </li> </ul> ');
	$templateCache.put('bootstrap/match.tpl.html', '<button class="btn btn-default form-control ui-select-match" ng-hide="$select.open" ng-disabled="$select.disabled" ng-click="$select.activate()"> <span ng-hide="$select.selected !==undefined" class="text-muted">{{$select.placeholder}}</span> <span ng-show="$select.selected !==undefined" ng-transclude></span> <span class="caret"></span> </button> ');
	$templateCache.put('bootstrap/select.tpl.html', '<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}"> <div class="ui-select-match"></div> <input type="text" autocomplete="off" tabindex="" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.open"> <div class="ui-select-choices"></div> </div> ');
	$templateCache.put('select2/choices.tpl.html', '<ul class="ui-select-choices ui-select-choices-content select2-results"> <li class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.activeIndex===$index}"> <div class="select2-result-label" ng-transclude></div> </li> </ul> ');
	$templateCache.put('select2/match.tpl.html', '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.selected === undefined}" ng-click="$select.activate()"> <span ng-hide="$select.selected !==undefined" class="select2-chosen">{{$select.placeholder}}</span> <span ng-show="$select.selected !==undefined" class="select2-chosen" ng-transclude></span> <span class="select2-arrow"><b></b></span> </a> ');
	$templateCache.put('select2/select.tpl.html', '<div class="select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open\': $select.open, \'select2-container-disabled\': $select.disabled}"> <div class="ui-select-match"></div> <div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"> <div class="select2-search"> <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search select2-input" ng-model="$select.search"> </div> <div class="ui-select-choices"></div> </div> </div> ');
	$templateCache.put('selectize/choices.tpl.html', '<div ng-show="$select.open" class="ui-select-choices selectize-dropdown single"> <div class="ui-select-choices-content selectize-dropdown-content"> <div class="ui-select-choices-row" ng-class="{\'active\': $select.activeIndex===$index}"> <div class="option" data-selectable ng-transclude></div> </div> </div> </div> ');
	$templateCache.put('selectize/match.tpl.html', '<div ng-hide="$select.open || $select.selected===undefined" class="ui-select-match" ng-transclude></div> ');
	$templateCache.put('selectize/select.tpl.html', '<div class="selectize-control single"> <div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled}" ng-click="$select.activate()"> <div class="ui-select-match"></div> <input type="text" autocomplete="off" tabindex="" class="ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="$select.selected && !$select.open" ng-disabled="$select.disabled"> </div> <div class="ui-select-choices"></div> </div> ');
}]);