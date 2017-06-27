/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.3.1 - 2014-07-12T16:26:10.166Z
 * License: MIT
 */


(function () {
  "use strict";

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
    theme: 'bootstrap',
    placeholder: '', // Empty by default, like HTML tag <select>
    refreshDelay: 1000 // In milliseconds
  })

  // See Rename minErr and make it accessible from outside https://github.com/angular/angular.js/issues/6913
  .service('uiSelectMinErr', function() {
    var minErr = angular.$$minErr('ui.select');
    return function() {
      var error = minErr.apply(this, arguments);
      var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
      return new Error(message);
    };
  })

  /**
   * Parses "repeat" attribute.
   *
   * Taken from AngularJS ngRepeat source code
   * See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L211
   *
   * Original discussion about parsing "repeat" attribute instead of fully relying on ng-repeat:
   * https://github.com/angular-ui/ui-select/commit/5dd63ad#commitcomment-5504697
   */
  .service('RepeatParser', ['uiSelectMinErr', function(uiSelectMinErr) {
    var self = this;

    /**
     * Example:
     * expression = "address in addresses | filter: {street: $select.search} track by $index"
     * lhs = "address",
     * rhs = "addresses | filter: {street: $select.search}",
     * trackByExp = "$index",
     * valueIdentifier = "address",
     * keyIdentifier = undefined
     */
    self.parse = function(expression) {
      if (!expression) {
        throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");
      }

      var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

      if (!match) {
        throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                             expression);
      }

      var lhs = match[1]; // Left-hand side
      var rhs = match[2]; // Right-hand side
      var trackByExp = match[3];

      match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
      if (!match) {
        throw uiSelectMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                             lhs);
      }

      // Unused for now
      // var valueIdentifier = match[3] || match[1];
      // var keyIdentifier = match[2];

      return {
        lhs: lhs,
        rhs: rhs,
        trackByExp: trackByExp
      };
    };

    self.getGroupNgRepeatExpression = function() {
      return '($group, $items) in $select.groups';
    };

    self.getNgRepeatExpression = function(lhs, rhs, trackByExp, grouped) {
      var expression = lhs + ' in ' + (grouped ? '$items' : rhs);
      if (trackByExp) {
        expression += ' track by ' + trackByExp;
      }
      return expression;
    };
  }])

  /**
   * Contains ui-select "intelligence".
   *
   * The goal is to limit dependency on the DOM whenever possible and
   * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.
   */
  .controller('uiSelectCtrl',
    ['$scope', '$element', '$timeout', 'RepeatParser', 'uiSelectMinErr',
    function($scope, $element, $timeout, RepeatParser, uiSelectMinErr) {

    var ctrl = this;

    var EMPTY_SEARCH = '';

    ctrl.placeholder = undefined;
    ctrl.search = EMPTY_SEARCH;
    ctrl.activeIndex = 0;
    ctrl.items = [];
    ctrl.selected = undefined;
    ctrl.open = false;
    ctrl.focus = false;
    ctrl.focusser = undefined; //Reference to input element used to handle focus events  
    ctrl.disabled = undefined; // Initialized inside uiSelect directive link function
    ctrl.resetSearchInput = undefined; // Initialized inside uiSelect directive link function
    ctrl.refreshDelay = undefined; // Initialized inside uiSelectChoices directive link function

    var _searchInput = $element.querySelectorAll('input.ui-select-search');
    if (_searchInput.length !== 1) {
      throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", _searchInput.length);
    }

    // Most of the time the user does not want to empty the search input when in typeahead mode
    function _resetSearchInput() {
      if (ctrl.resetSearchInput) {
        ctrl.search = EMPTY_SEARCH;
        //reset activeIndex
        if (ctrl.selected && ctrl.items.length) {
          ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);
        }
      }
    }

    // When the user clicks on ui-select, displays the dropdown list
    ctrl.activate = function(initSearchValue) {
      if (!ctrl.disabled) {
        _resetSearchInput();
        ctrl.open = true;

        // Give it time to appear before focus
        $timeout(function() {
          ctrl.search = initSearchValue || ctrl.search;
          _searchInput[0].focus();
        });
      }
    };

    ctrl.parseRepeatAttr = function(repeatAttr, groupByExp) {
      function updateGroups(items) {
        ctrl.groups = {};
        angular.forEach(items, function(item) {
          var groupFn = $scope.$eval(groupByExp);
          var groupValue = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
          if(!ctrl.groups[groupValue]) {
            ctrl.groups[groupValue] = [item];
          }
          else {
            ctrl.groups[groupValue].push(item);
          }
        });
        ctrl.items = [];
        angular.forEach(Object.keys(ctrl.groups).sort(), function(group) {
          ctrl.items = ctrl.items.concat(ctrl.groups[group]);
        });
      }

      function setPlainItems(items) {
        ctrl.items = items;
      }

      var repeat = RepeatParser.parse(repeatAttr),
        setItemsFn = groupByExp ? updateGroups : setPlainItems;

      ctrl.isGrouped = !!groupByExp;
      ctrl.itemProperty = repeat.lhs;

      // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
      $scope.$watchCollection(repeat.rhs, function(items) {

        if (items === undefined || items === null) {
          // If the user specifies undefined or null => reset the collection
          // Special case: items can be undefined if the user did not initialized the collection on the scope
          // i.e $scope.addresses = [] is missing
          ctrl.items = [];
        } else {
          if (!angular.isArray(items)) {
            throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
          } else {
            // Regular case
            setItemsFn(items);
          }
        }

      });
    };

    var _refreshDelayPromise;

    /**
     * Typeahead mode: lets the user refresh the collection using his own function.
     *
     * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31
     */
    ctrl.refresh = function(refreshAttr) {
      if (refreshAttr !== undefined) {

        // Debounce
        // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155
        // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
        if (_refreshDelayPromise) {
          $timeout.cancel(_refreshDelayPromise);
        }
        _refreshDelayPromise = $timeout(function() {
          $scope.$eval(refreshAttr);
        }, ctrl.refreshDelay);
      }
    };

    ctrl.setActiveItem = function(item) {
      ctrl.activeIndex = ctrl.items.indexOf(item);
    };

    ctrl.isActive = function(itemScope) {
      return ctrl.items.indexOf(itemScope[ctrl.itemProperty]) === ctrl.activeIndex;
    };

    // When the user clicks on an item inside the dropdown
    ctrl.select = function(item) {
      ctrl.selected = item;
      ctrl.close();
      // Using a watch instead of $scope.ngModel.$setViewValue(item)
    };

    // Closes the dropdown
    ctrl.close = function() {
      if (ctrl.open) {
        _resetSearchInput();
        ctrl.open = false;
        ctrl.focusser[0].focus();
      }
    };

    var Key = {
      Enter: 13,
      Tab: 9,
      Up: 38,
      Down: 40,
      Escape: 27
    };

    function _onKeydown(key) {
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
    }

    // Bind to keyboard shortcuts
    _searchInput.on('keydown', function(e) {
      // Keyboard shortcuts are all about the items,
      // does not make sense (and will crash) if ctrl.items is empty
      if (ctrl.items && ctrl.items.length >= 0) {
        var key = e.which;

        $scope.$apply(function() {
          var processed = _onKeydown(key);
          if (processed) {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        switch (key) {
          case Key.Down:
          case Key.Up:
            _ensureHighlightVisible();
            break;
        }
      }
    });

    // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431
    function _ensureHighlightVisible() {
      var container = $element.querySelectorAll('.ui-select-choices-content');
      var choices = container.querySelectorAll('.ui-select-choices-row');
      if (choices.length < 1) {
        throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
      }

      var highlighted = choices[ctrl.activeIndex];
      var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
      var height = container[0].offsetHeight;

      if (posY > height) {
        container[0].scrollTop += posY - height;
      } else if (posY < highlighted.clientHeight) {
        if (ctrl.isGrouped && ctrl.activeIndex === 0)
          container[0].scrollTop = 0; //To make group header visible when going all the way up
        else
          container[0].scrollTop -= highlighted.clientHeight - posY;
      }
    }

    $scope.$on('$destroy', function() {
      _searchInput.off('keydown');
    });
  }])

  .directive('uiSelect',
    ['$document', 'uiSelectConfig', 'uiSelectMinErr', '$compile',
    function($document, uiSelectConfig, uiSelectMinErr, $compile) {

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

        //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954
        var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' aria-haspopup='true' role='button' />");
        $compile(focusser)(scope);
        $select.focusser = focusser;

        element.append(focusser);
        focusser.bind("focus", function(){
          scope.$evalAsync(function(){
            $select.focus = true;
          });
        });
        focusser.bind("blur", function(){
          scope.$evalAsync(function(){
            $select.focus = false;
          });
        });
        focusser.bind("keydown", function(e){

          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
            return;
          }

          if (e.which == KEY.DOWN  || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE){
            e.preventDefault();
            e.stopPropagation();
            $select.activate();
          }

          scope.$digest();
        });

        focusser.bind("keyup input", function(e){

          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER) {
            return;
          }
          
          $select.activate(focusser.val()); //User pressed some regualar key, so we pass it to the search input
          focusser.val('');
          scope.$digest();

        });

        //TODO Refactor to reuse the KEY object from uiSelectCtrl
        var KEY = {
          TAB: 9,
          ENTER: 13,
          ESC: 27,
          SPACE: 32,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          HOME: 36,
          END: 35,
          BACKSPACE: 8,
          DELETE: 46,
          isArrow: function (k) {
              k = k.which ? k.which : k;
              switch (k) {
              case KEY.LEFT:
              case KEY.RIGHT:
              case KEY.UP:
              case KEY.DOWN:
                  return true;
              }
              return false;
          },
          isControl: function (e) {
              var k = e.which;
              switch (k) {
              case KEY.SHIFT:
              case KEY.CTRL:
              case KEY.ALT:
                  return true;
              }

              if (e.metaKey) return true;

              return false;
          },
          isFunctionKey: function (k) {
              k = k.which ? k.which : k;
              return k >= 112 && k <= 123;
          }
        };

        attrs.$observe('disabled', function() {
          // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string
          $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
        });

        attrs.$observe('resetSearchInput', function() {
          // $eval() is needed otherwise we get a string instead of a boolean
          var resetSearchInput = scope.$eval(attrs.resetSearchInput);
          $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
        });

        scope.$watch('$select.selected', function(newValue) {
          if (ngModel.$viewValue !== newValue) {
            ngModel.$setViewValue(newValue);
          }
        });

        ngModel.$render = function() {
          $select.selected = ngModel.$viewValue;
        };

        function onDocumentClick(e) {
          var contains = false;

          if (window.jQuery) {
            // Firefox 3.6 does not support element.contains()
            // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
            contains = window.jQuery.contains(element[0], e.target);
          } else {
            contains = element[0].contains(e.target);
          }

          if (!contains) {
            $select.close();
            scope.$digest();
          }
        }

        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
        $document.on('click', onDocumentClick);

        scope.$on('$destroy', function() {
          $document.off('click', onDocumentClick);
        });

        // Move transcluded elements to their correct position in main template
        transcludeFn(scope, function(clone) {
          // See Transclude in AngularJS http://blog.omkarpatil.com/2012/11/transclude-in-angularjs.html

          // One day jqLite will be replaced by jQuery and we will be able to write:
          // var transcludedElement = clone.filter('.my-class')
          // instead of creating a hackish DOM element:
          var transcluded = angular.element('<div>').append(clone);

          var transcludedMatch = transcluded.querySelectorAll('.ui-select-match');
          if (transcludedMatch.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
          }
          element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);

          var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');
          if (transcludedChoices.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-choices but got '{0}'.", transcludedChoices.length);
          }
          element.querySelectorAll('.ui-select-choices').replaceWith(transcludedChoices);
        });
      }
    };
  }])

  .directive('uiSelectChoices',
    ['uiSelectConfig', 'RepeatParser', 'uiSelectMinErr', '$compile',
    function(uiSelectConfig, RepeatParser, uiSelectMinErr, $compile) {

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
        var groupByExp = tAttrs.groupBy;
        return function link(scope, element, attrs, $select, transcludeFn) {

          if(groupByExp) {
            var groups = element.querySelectorAll('.ui-select-choices-group');
            if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
            groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
          }

          var choices = element.querySelectorAll('.ui-select-choices-row');
          if (choices.length !== 1) {
            throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);
          }

          choices.attr('ng-repeat', RepeatParser.getNgRepeatExpression(repeat.lhs, '$select.items', repeat.trackByExp, groupByExp))
              .attr('ng-mouseenter', '$select.setActiveItem('+repeat.lhs+')')
              .attr('ng-click', '$select.select(' + repeat.lhs + ')');


          transcludeFn(function(clone) {
            var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');
            if (rowsInner.length !== 1)
              throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);

            rowsInner.append(clone);
            $compile(element)(scope);
          });

          $select.parseRepeatAttr(attrs.repeat, groupByExp);

          scope.$watch('$select.search', function() {
            $select.activeIndex = 0;
            $select.refresh(attrs.refresh);
          });

          attrs.$observe('refreshDelay', function() {
            // $eval() is needed otherwise we get a string instead of a number
            var refreshDelay = scope.$eval(attrs.refreshDelay);
            $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : uiSelectConfig.refreshDelay;
          });
        };
      }
    };
  }])

  .directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
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
          $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
        });
      }
    };
  }])

  /**
   * Highlights text that matches $select.search.
   *
   * Taken from AngularUI Bootstrap Typeahead
   * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340
   */
  .filter('highlight', function() {
    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
      return query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
    };
  });
}());

angular.module("ui.select").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\" ng-show=\"$select.items.length > 0\"><li class=\"ui-select-choices-group\"><div class=\"divider\" ng-show=\"$index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\">{{$group}}</div><div class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this)}\"><a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
$templateCache.put("bootstrap/match.tpl.html","<button type=\"button\" class=\"btn btn-default form-control ui-select-match\" tabindex=\"-1\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\" ;=\"\" ng-click=\"$select.activate()\"><span ng-hide=\"$select.selected !== undefined\" class=\"text-muted\">{{$select.placeholder}}</span> <span ng-show=\"$select.selected !== undefined\" ng-transclude=\"\"></span> <span class=\"caret\"></span></button>");
$templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.open\"><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.isGrouped}\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label select2-result-label\">{{$group}}</div><ul class=\"select2-result-sub\"><li class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
$templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.selected === undefined}\" ng-click=\"$select.activate()\"><span ng-hide=\"$select.selected !== undefined\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-show=\"$select.selected !== undefined\" class=\"select2-chosen\" ng-transclude=\"\"></span> <span class=\"select2-arrow\"><b></b></span></a>");
$templateCache.put("select2/select.tpl.html","<div class=\"select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open\': $select.open,\n                \'select2-container-disabled\': $select.disabled,\n                \'select2-container-active\': $select.focus }\"><div class=\"ui-select-match\"></div><div class=\"select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\">{{$group}}</div><div class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
$templateCache.put("selectize/match.tpl.html","<div ng-hide=\"$select.open || $select.selected === undefined\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
$templateCache.put("selectize/select.tpl.html","<div class=\"selectize-control single\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"$select.selected && !$select.open\" ng-disabled=\"$select.disabled\"></div><div class=\"ui-select-choices\"></div></div>");}]);