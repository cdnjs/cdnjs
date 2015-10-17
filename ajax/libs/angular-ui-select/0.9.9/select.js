/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.9.9 - 2015-02-18T03:49:07.277Z
 * License: MIT
 */


(function () {
  "use strict";

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
    COMMAND: 91,

    MAP: { 91 : "COMMAND", 8 : "BACKSPACE" , 9 : "TAB" , 13 : "ENTER" , 16 : "SHIFT" , 17 : "CTRL" , 18 : "ALT" , 19 : "PAUSEBREAK" , 20 : "CAPSLOCK" , 27 : "ESC" , 32 : "SPACE" , 33 : "PAGE_UP", 34 : "PAGE_DOWN" , 35 : "END" , 36 : "HOME" , 37 : "LEFT" , 38 : "UP" , 39 : "RIGHT" , 40 : "DOWN" , 43 : "+" , 44 : "PRINTSCREEN" , 45 : "INSERT" , 46 : "DELETE", 48 : "0" , 49 : "1" , 50 : "2" , 51 : "3" , 52 : "4" , 53 : "5" , 54 : "6" , 55 : "7" , 56 : "8" , 57 : "9" , 59 : ";", 61 : "=" , 65 : "A" , 66 : "B" , 67 : "C" , 68 : "D" , 69 : "E" , 70 : "F" , 71 : "G" , 72 : "H" , 73 : "I" , 74 : "J" , 75 : "K" , 76 : "L", 77 : "M" , 78 : "N" , 79 : "O" , 80 : "P" , 81 : "Q" , 82 : "R" , 83 : "S" , 84 : "T" , 85 : "U" , 86 : "V" , 87 : "W" , 88 : "X" , 89 : "Y" , 90 : "Z", 96 : "0" , 97 : "1" , 98 : "2" , 99 : "3" , 100 : "4" , 101 : "5" , 102 : "6" , 103 : "7" , 104 : "8" , 105 : "9", 106 : "*" , 107 : "+" , 109 : "-" , 110 : "." , 111 : "/", 112 : "F1" , 113 : "F2" , 114 : "F3" , 115 : "F4" , 116 : "F5" , 117 : "F6" , 118 : "F7" , 119 : "F8" , 120 : "F9" , 121 : "F10" , 122 : "F11" , 123 : "F12", 144 : "NUMLOCK" , 145 : "SCROLLLOCK" , 186 : ";" , 187 : "=" , 188 : "," , 189 : "-" , 190 : "." , 191 : "/" , 192 : "`" , 219 : "[" , 220 : "\\" , 221 : "]" , 222 : "'"
    },

    isControl: function (e) {
        var k = e.which;
        switch (k) {
        case KEY.COMMAND:
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
    },
    isVerticalMovement: function (k){
      return ~[KEY.UP, KEY.DOWN].indexOf(k);
    },
    isHorizontalMovement: function (k){
      return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);
    }
  };

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

  /**
   * Add closest() to jqLite.
   */
  if (angular.element.prototype.closest === undefined) {
    angular.element.prototype.closest = function( selector) {
      var elem = this[0];
      var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

      while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
          return elem;
        } else {
          elem = elem.parentElement;
        }
      }
      return false;
    };
  }

  var latestId = 0;
  angular.module('ui.select', [])

  .constant('uiSelectConfig', {
    theme: 'bootstrap',
    searchEnabled: true,
    placeholder: '', // Empty by default, like HTML tag <select>
    refreshDelay: 1000, // In milliseconds
    closeOnSelect: true,
    generateId: function() {
      return latestId++;
    }
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
  .service('RepeatParser', ['uiSelectMinErr','$parse', function(uiSelectMinErr, $parse) {
    var self = this;

    /**
     * Example:
     * expression = "address in addresses | filter: {street: $select.search} track by $index"
     * itemName = "address",
     * source = "addresses | filter: {street: $select.search}",
     * trackByExp = "$index",
     */
    self.parse = function(expression) {

      var match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

      if (!match) {
        throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                expression);
      }

      return {
        itemName: match[2], // (lhs) Left-hand side,
        source: $parse(match[3]),
        trackByExp: match[4],
        modelMapper: $parse(match[1] || match[2])
      };

    };

    self.getGroupNgRepeatExpression = function() {
      return '$group in $select.groups';
    };

    self.getNgRepeatExpression = function(itemName, source, trackByExp, grouped) {
      var expression = itemName + ' in ' + (grouped ? '$group.items' : source);
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
    ['$scope', '$element', '$timeout', '$filter', 'RepeatParser', 'uiSelectMinErr', 'uiSelectConfig',
    function($scope, $element, $timeout, $filter, RepeatParser, uiSelectMinErr, uiSelectConfig) {

    var ctrl = this;

    var EMPTY_SEARCH = '';

    ctrl.placeholder = undefined;
    ctrl.search = EMPTY_SEARCH;
    ctrl.activeIndex = 0;
    ctrl.activeMatchIndex = -1;
    ctrl.items = [];
    ctrl.selected = undefined;
    ctrl.open = false;
    ctrl.focus = false;
    ctrl.focusser = undefined; //Reference to input element used to handle focus events
    ctrl.disabled = undefined; // Initialized inside uiSelect directive link function
    ctrl.searchEnabled = undefined; // Initialized inside uiSelect directive link function
    ctrl.resetSearchInput = undefined; // Initialized inside uiSelect directive link function
    ctrl.refreshDelay = undefined; // Initialized inside uiSelectChoices directive link function
    ctrl.multiple = false; // Initialized inside uiSelect directive link function
    ctrl.disableChoiceExpression = undefined; // Initialized inside uiSelect directive link function
    ctrl.tagging = {isActivated: false, fct: undefined};
    ctrl.taggingTokens = {isActivated: false, tokens: undefined};
    ctrl.lockChoiceExpression = undefined; // Initialized inside uiSelect directive link function
    ctrl.closeOnSelect = true; // Initialized inside uiSelect directive link function
    ctrl.clickTriggeredSelect = false;
    ctrl.$filter = $filter;

    ctrl.isEmpty = function() {
      return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';
    };

    var _searchInput = $element.querySelectorAll('input.ui-select-search');
    if (_searchInput.length !== 1) {
      throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", _searchInput.length);
    }

    // Most of the time the user does not want to empty the search input when in typeahead mode
    function _resetSearchInput() {
      if (ctrl.resetSearchInput || (ctrl.resetSearchInput === undefined && uiSelectConfig.resetSearchInput)) {
        ctrl.search = EMPTY_SEARCH;
        //reset activeIndex
        if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {
          ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);
        }
      }
    }

    // When the user clicks on ui-select, displays the dropdown list
    ctrl.activate = function(initSearchValue, avoidReset) {
      if (!ctrl.disabled  && !ctrl.open) {
        if(!avoidReset) _resetSearchInput();
        ctrl.focusser.prop('disabled', true); //Will reactivate it on .close()
        ctrl.open = true;
        ctrl.activeMatchIndex = -1;

        ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;

        // ensure that the index is set to zero for tagging variants
        // that where first option is auto-selected
        if ( ctrl.activeIndex === -1 && ctrl.taggingLabel !== false ) {
          ctrl.activeIndex = 0;
        }

        // Give it time to appear before focus
        $timeout(function() {
          ctrl.search = initSearchValue || ctrl.search;
          _searchInput[0].focus();
        });
      }
    };

    ctrl.findGroupByName = function(name) {
      return ctrl.groups && ctrl.groups.filter(function(group) {
        return group.name === name;
      })[0];
    };

    ctrl.parseRepeatAttr = function(repeatAttr, groupByExp) {
      function updateGroups(items) {
        ctrl.groups = [];
        angular.forEach(items, function(item) {
          var groupFn = $scope.$eval(groupByExp);
          var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
          var group = ctrl.findGroupByName(groupName);
          if(group) {
            group.items.push(item);
          }
          else {
            ctrl.groups.push({name: groupName, items: [item]});
          }
        });
        ctrl.items = [];
        ctrl.groups.forEach(function(group) {
          ctrl.items = ctrl.items.concat(group.items);
        });
      }

      function setPlainItems(items) {
        ctrl.items = items;
      }

      var setItemsFn = groupByExp ? updateGroups : setPlainItems;

      ctrl.parserResult = RepeatParser.parse(repeatAttr);

      ctrl.isGrouped = !!groupByExp;
      ctrl.itemProperty = ctrl.parserResult.itemName;

      // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
      $scope.$watchCollection(ctrl.parserResult.source, function(items) {

        if (items === undefined || items === null) {
          // If the user specifies undefined or null => reset the collection
          // Special case: items can be undefined if the user did not initialized the collection on the scope
          // i.e $scope.addresses = [] is missing
          ctrl.items = [];
        } else {
          if (!angular.isArray(items)) {
            throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
          } else {
            if (ctrl.multiple){
              //Remove already selected items (ex: while searching)
              var filteredItems = items.filter(function(i) {return ctrl.selected.indexOf(i) < 0;});
              setItemsFn(filteredItems);
            }else{
              setItemsFn(items);
            }
            ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters

          }
        }

      });

      if (ctrl.multiple){
        //Remove already selected items
        $scope.$watchCollection('$select.selected', function(selectedItems){
          var data = ctrl.parserResult.source($scope);
          if (!selectedItems.length) {
            setItemsFn(data);
          }else{
            if ( data !== undefined ) {
              var filteredItems = data.filter(function(i) {return selectedItems.indexOf(i) < 0;});
              setItemsFn(filteredItems);
            }
          }
          ctrl.sizeSearchInput();
        });
      }

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
      if ( !ctrl.open ) {
        return false;
      }
      var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
      var isActive =  itemIndex === ctrl.activeIndex;

      if ( !isActive || ( itemIndex < 0 && ctrl.taggingLabel !== false ) ||( itemIndex < 0 && ctrl.taggingLabel === false) ) {
        return false;
      }

      if (isActive && !angular.isUndefined(ctrl.onHighlightCallback)) {
        itemScope.$eval(ctrl.onHighlightCallback);
      }

      return isActive;
    };

    ctrl.isDisabled = function(itemScope) {

      if (!ctrl.open) return;

      var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
      var isDisabled = false;
      var item;

      if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {
        item = ctrl.items[itemIndex];
        isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression)); // force the boolean value
        item._uiSelectChoiceDisabled = isDisabled; // store this for later reference
      }

      return isDisabled;
    };


    // When the user selects an item with ENTER or clicks the dropdown
    ctrl.select = function(item, skipFocusser, $event) {
      if (item === undefined || !item._uiSelectChoiceDisabled) {

        if ( ! ctrl.items && ! ctrl.search ) return;

        if (!item || !item._uiSelectChoiceDisabled) {
          if(ctrl.tagging.isActivated) {
            // if taggingLabel is disabled, we pull from ctrl.search val
            if ( ctrl.taggingLabel === false ) {
              if ( ctrl.activeIndex < 0 ) {
                item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;
                if (!item || angular.equals( ctrl.items[0], item ) ) {
                  return;
                }
              } else {
                // keyboard nav happened first, user selected from dropdown
                item = ctrl.items[ctrl.activeIndex];
              }
            } else {
              // tagging always operates at index zero, taggingLabel === false pushes
              // the ctrl.search value without having it injected
              if ( ctrl.activeIndex === 0 ) {
                // ctrl.tagging pushes items to ctrl.items, so we only have empty val
                // for `item` if it is a detected duplicate
                if ( item === undefined ) return;

                // create new item on the fly if we don't already have one;
                // use tagging function if we have one
                if ( ctrl.tagging.fct !== undefined && typeof item === 'string' ) {
                  item = ctrl.tagging.fct(ctrl.search);
                  if (!item) return;
                // if item type is 'string', apply the tagging label
                } else if ( typeof item === 'string' ) {
                  // trim the trailing space
                  item = item.replace(ctrl.taggingLabel,'').trim();
                }
              }
            }
            // search ctrl.selected for dupes potentially caused by tagging and return early if found
            if ( ctrl.selected && angular.isArray(ctrl.selected) && ctrl.selected.filter( function (selection) { return angular.equals(selection, item); }).length > 0 ) {
              ctrl.close(skipFocusser);
              return;
            }
          }

          var locals = {};
          locals[ctrl.parserResult.itemName] = item;

          if(ctrl.multiple) {
            ctrl.selected.push(item);
            ctrl.sizeSearchInput();
          } else {
            ctrl.selected = item;
          }

          $timeout(function(){
            ctrl.onSelectCallback($scope, {
              $item: item,
              $model: ctrl.parserResult.modelMapper($scope, locals)
            });
          });

          if (!ctrl.multiple || ctrl.closeOnSelect) {
            ctrl.close(skipFocusser);
          }
          if ($event && $event.type === 'click') {
            ctrl.clickTriggeredSelect = true;
          }
        }
      }
    };

    // Closes the dropdown
    ctrl.close = function(skipFocusser) {
      if (!ctrl.open) return;
      if (ctrl.ngModel && ctrl.ngModel.$setTouched) ctrl.ngModel.$setTouched();
      _resetSearchInput();
      ctrl.open = false;
      if (!ctrl.multiple){
        $timeout(function(){
          ctrl.focusser.prop('disabled', false);
          if (!skipFocusser) ctrl.focusser[0].focus();
        },0,false);
      }
    };

    ctrl.clear = function($event) {
      ctrl.select(undefined);
      $event.stopPropagation();
      ctrl.focusser[0].focus();
    };

    // Toggle dropdown
    ctrl.toggle = function(e) {
      if (ctrl.open) {
        ctrl.close();
        e.preventDefault();
        e.stopPropagation();
      } else {
        ctrl.activate();
      }
    };

    ctrl.isLocked = function(itemScope, itemIndex) {
        var isLocked, item = ctrl.selected[itemIndex];

        if (item && !angular.isUndefined(ctrl.lockChoiceExpression)) {
            isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression)); // force the boolean value
            item._uiSelectChoiceLocked = isLocked; // store this for later reference
        }

        return isLocked;
    };

    // Remove item from multiple select
    ctrl.removeChoice = function(index){
      var removedChoice = ctrl.selected[index];

      // if the choice is locked, can't remove it
      if(removedChoice._uiSelectChoiceLocked) return;

      var locals = {};
      locals[ctrl.parserResult.itemName] = removedChoice;

      ctrl.selected.splice(index, 1);
      ctrl.activeMatchIndex = -1;
      ctrl.sizeSearchInput();

      // Give some time for scope propagation.
      $timeout(function(){
        ctrl.onRemoveCallback($scope, {
          $item: removedChoice,
          $model: ctrl.parserResult.modelMapper($scope, locals)
        });
      });
    };

    ctrl.getPlaceholder = function(){
      //Refactor single?
      if(ctrl.multiple && ctrl.selected.length) return;
      return ctrl.placeholder;
    };

    var containerSizeWatch;
    ctrl.sizeSearchInput = function(){
      var input = _searchInput[0],
          container = _searchInput.parent().parent()[0];
      _searchInput.css('width','10px');
      var calculate = function(){
        var newWidth = container.clientWidth - input.offsetLeft - 10;
        if(newWidth < 50) newWidth = container.clientWidth;
        _searchInput.css('width',newWidth+'px');
      };
      $timeout(function(){ //Give tags time to render correctly
        if (container.clientWidth === 0 && !containerSizeWatch){
          containerSizeWatch = $scope.$watch(function(){ return container.clientWidth;}, function(newValue){
            if (newValue !== 0){
              calculate();
              containerSizeWatch();
              containerSizeWatch = null;
            }
          });
        }else if (!containerSizeWatch) {
          calculate();
        }
      }, 0, false);
    };

    function _handleDropDownSelection(key) {
      var processed = true;
      switch (key) {
        case KEY.DOWN:
          if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          else if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }
          break;
        case KEY.UP:
          if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          else if (ctrl.activeIndex > 0 || (ctrl.search.length === 0 && ctrl.tagging.isActivated && ctrl.activeIndex > -1)) { ctrl.activeIndex--; }
          break;
        case KEY.TAB:
          if (!ctrl.multiple || ctrl.open) ctrl.select(ctrl.items[ctrl.activeIndex], true);
          break;
        case KEY.ENTER:
          if(ctrl.open && ctrl.activeIndex >= 0){
            ctrl.select(ctrl.items[ctrl.activeIndex]); // Make sure at least one dropdown item is highlighted before adding.
          } else {
            ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          }
          break;
        case KEY.ESC:
          ctrl.close();
          break;
        default:
          processed = false;
      }
      return processed;
    }

    // Handles selected options in "multiple" mode
    function _handleMatchSelection(key){
      var caretPosition = _getCaretPosition(_searchInput[0]),
          length = ctrl.selected.length,
          // none  = -1,
          first = 0,
          last  = length-1,
          curr  = ctrl.activeMatchIndex,
          next  = ctrl.activeMatchIndex+1,
          prev  = ctrl.activeMatchIndex-1,
          newIndex = curr;

      if(caretPosition > 0 || (ctrl.search.length && key == KEY.RIGHT)) return false;

      ctrl.close();

      function getNewActiveMatchIndex(){
        switch(key){
          case KEY.LEFT:
            // Select previous/first item
            if(~ctrl.activeMatchIndex) return prev;
            // Select last item
            else return last;
            break;
          case KEY.RIGHT:
            // Open drop-down
            if(!~ctrl.activeMatchIndex || curr === last){
              ctrl.activate();
              return false;
            }
            // Select next/last item
            else return next;
            break;
          case KEY.BACKSPACE:
            // Remove selected item and select previous/first
            if(~ctrl.activeMatchIndex){
              ctrl.removeChoice(curr);
              return prev;
            }
            // Select last item
            else return last;
            break;
          case KEY.DELETE:
            // Remove selected item and select next item
            if(~ctrl.activeMatchIndex){
              ctrl.removeChoice(ctrl.activeMatchIndex);
              return curr;
            }
            else return false;
        }
      }

      newIndex = getNewActiveMatchIndex();

      if(!ctrl.selected.length || newIndex === false) ctrl.activeMatchIndex = -1;
      else ctrl.activeMatchIndex = Math.min(last,Math.max(first,newIndex));

      return true;
    }

    // Bind to keyboard shortcuts
    _searchInput.on('keydown', function(e) {

      var key = e.which;

      // if(~[KEY.ESC,KEY.TAB].indexOf(key)){
      //   //TODO: SEGURO?
      //   ctrl.close();
      // }

      $scope.$apply(function() {
        var processed = false;
        var tagged = false;

        if(ctrl.multiple && KEY.isHorizontalMovement(key)){
          processed = _handleMatchSelection(key);
        }

        if (!processed && (ctrl.items.length > 0 || ctrl.tagging.isActivated)) {
          processed = _handleDropDownSelection(key);
          if ( ctrl.taggingTokens.isActivated ) {
            for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {
              if ( ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode] ) {
                // make sure there is a new value to push via tagging
                if ( ctrl.search.length > 0 ) {
                  tagged = true;
                }
              }
            }
            if ( tagged ) {
              $timeout(function() {
                _searchInput.triggerHandler('tagged');
                var newItem = ctrl.search.replace(KEY.MAP[e.keyCode],'').trim();
                if ( ctrl.tagging.fct ) {
                  newItem = ctrl.tagging.fct( newItem );
                }
                if (newItem) ctrl.select(newItem, true);
              });
            }
          }
        }

        if (processed  && key != KEY.TAB) {
          //TODO Check si el tab selecciona aun correctamente
          //Crear test
          e.preventDefault();
          e.stopPropagation();
        }
      });

      if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){
        _ensureHighlightVisible();
      }

    });

    // If tagging try to split by tokens and add items
    _searchInput.on('paste', function (e) {
      var data = e.originalEvent.clipboardData.getData('text/plain');
      if (data && data.length > 0 && ctrl.taggingTokens.isActivated && ctrl.tagging.fct) {
        var items = data.split(ctrl.taggingTokens.tokens[0]); // split by first token only
        if (items && items.length > 0) {
          angular.forEach(items, function (item) {
            var newItem = ctrl.tagging.fct(item);
            if (newItem) {
              ctrl.select(newItem, true);
            }
          });
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });

    _searchInput.on('keyup', function(e) {
      if ( ! KEY.isVerticalMovement(e.which) ) {
        $scope.$evalAsync( function () {
          ctrl.activeIndex = ctrl.taggingLabel === false ? -1 : 0;
        });
      }
      // Push a "create new" item into array if there is a search string
      if ( ctrl.tagging.isActivated && ctrl.search.length > 0 ) {

        // return early with these keys
        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which) ) {
          return;
        }
        // always reset the activeIndex to the first item when tagging
        ctrl.activeIndex = ctrl.taggingLabel === false ? -1 : 0;
        // taggingLabel === false bypasses all of this
        if (ctrl.taggingLabel === false) return;

        var items = angular.copy( ctrl.items );
        var stashArr = angular.copy( ctrl.items );
        var newItem;
        var item;
        var hasTag = false;
        var dupeIndex = -1;
        var tagItems;
        var tagItem;

        // case for object tagging via transform `ctrl.tagging.fct` function
        if ( ctrl.tagging.fct !== undefined) {
          tagItems = ctrl.$filter('filter')(items,{'isTag': true});
          if ( tagItems.length > 0 ) {
            tagItem = tagItems[0];
          }
          // remove the first element, if it has the `isTag` prop we generate a new one with each keyup, shaving the previous
          if ( items.length > 0 && tagItem ) {
            hasTag = true;
            items = items.slice(1,items.length);
            stashArr = stashArr.slice(1,stashArr.length);
          }
          newItem = ctrl.tagging.fct(ctrl.search);
          newItem.isTag = true;
          // verify the the tag doesn't match the value of an existing item
          if ( stashArr.filter( function (origItem) { return angular.equals( origItem, ctrl.tagging.fct(ctrl.search) ); } ).length > 0 ) {
            return;
          }
          newItem.isTag = true;
        // handle newItem string and stripping dupes in tagging string context
        } else {
          // find any tagging items already in the ctrl.items array and store them
          tagItems = ctrl.$filter('filter')(items,function (item) {
            return item.match(ctrl.taggingLabel);
          });
          if ( tagItems.length > 0 ) {
            tagItem = tagItems[0];
          }
          item = items[0];
          // remove existing tag item if found (should only ever be one tag item)
          if ( item !== undefined && items.length > 0 && tagItem ) {
            hasTag = true;
            items = items.slice(1,items.length);
            stashArr = stashArr.slice(1,stashArr.length);
          }
          newItem = ctrl.search+' '+ctrl.taggingLabel;
          if ( _findApproxDupe(ctrl.selected, ctrl.search) > -1 ) {
            return;
          }
          // verify the the tag doesn't match the value of an existing item from
          // the searched data set or the items already selected
          if ( _findCaseInsensitiveDupe(stashArr.concat(ctrl.selected)) ) {
            // if there is a tag from prev iteration, strip it / queue the change
            // and return early
            if ( hasTag ) {
              items = stashArr;
              $scope.$evalAsync( function () {
                ctrl.activeIndex = 0;
                ctrl.items = items;
              });
            }
            return;
          }
          if ( _findCaseInsensitiveDupe(stashArr) ) {
            // if there is a tag from prev iteration, strip it
            if ( hasTag ) {
              ctrl.items = stashArr.slice(1,stashArr.length);
            }
            return;
          }
        }
        if ( hasTag ) dupeIndex = _findApproxDupe(ctrl.selected, newItem);
        // dupe found, shave the first item
        if ( dupeIndex > -1 ) {
          items = items.slice(dupeIndex+1,items.length-1);
        } else {
          items = [];
          items.push(newItem);
          items = items.concat(stashArr);
        }
        $scope.$evalAsync( function () {
          ctrl.activeIndex = 0;
          ctrl.items = items;
        });
      }
    });

    _searchInput.on('tagged', function() {
      $timeout(function() {
        _resetSearchInput();
      });
    });

    _searchInput.on('blur', function() {
      $timeout(function() {
        ctrl.activeMatchIndex = -1;
      });
    });

    function _findCaseInsensitiveDupe(arr) {
      if ( arr === undefined || ctrl.search === undefined ) {
        return false;
      }
      var hasDupe = arr.filter( function (origItem) {
        if ( ctrl.search.toUpperCase() === undefined || origItem === undefined ) {
          return false;
        }
        return origItem.toUpperCase() === ctrl.search.toUpperCase();
      }).length > 0;

      return hasDupe;
    }

    function _findApproxDupe(haystack, needle) {
      var dupeIndex = -1;
	  if(angular.isArray(haystack)) {
		  var tempArr = angular.copy(haystack);
		  for (var i = 0; i <tempArr.length; i++) {
			// handle the simple string version of tagging
			if ( ctrl.tagging.fct === undefined ) {
			  // search the array for the match
			  if ( tempArr[i]+' '+ctrl.taggingLabel === needle ) {
				dupeIndex = i;
			  }
			// handle the object tagging implementation
			} else {
			  var mockObj = tempArr[i];
			  mockObj.isTag = true;
			  if ( angular.equals(mockObj, needle) ) {
				dupeIndex = i;
			  }
			}
		  }
	  }
      return dupeIndex;
    }

    function _getCaretPosition(el) {
      if(angular.isNumber(el.selectionStart)) return el.selectionStart;
      // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
      else return el.value.length;
    }

    // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431
    function _ensureHighlightVisible() {
      var container = $element.querySelectorAll('.ui-select-choices-content');
      var choices = container.querySelectorAll('.ui-select-choices-row');
      if (choices.length < 1) {
        throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
      }

      if (ctrl.activeIndex < 0) {
        return;
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
      _searchInput.off('keyup keydown tagged blur paste');
    });
  }])

  .directive('uiSelect',
    ['$document', 'uiSelectConfig', 'uiSelectMinErr', '$compile', '$parse',
    function($document, uiSelectConfig, uiSelectMinErr, $compile, $parse) {

    return {
      restrict: 'EA',
      templateUrl: function(tElement, tAttrs) {
        var theme = tAttrs.theme || uiSelectConfig.theme;
        return theme + (angular.isDefined(tAttrs.multiple) ? '/select-multiple.tpl.html' : '/select.tpl.html');
      },
      replace: true,
      transclude: true,
      require: ['uiSelect', '^ngModel'],
      scope: true,

      controller: 'uiSelectCtrl',
      controllerAs: '$select',

      link: function(scope, element, attrs, ctrls, transcludeFn) {
        var $select = ctrls[0];
        var ngModel = ctrls[1];

        var searchInput = element.querySelectorAll('input.ui-select-search');

        $select.generatedId = uiSelectConfig.generateId();
        $select.baseTitle = attrs.title || 'Select box';
        $select.focusserTitle = $select.baseTitle + ' focus';
        $select.focusserId = 'focusser-' + $select.generatedId;

        $select.multiple = angular.isDefined(attrs.multiple) && (
            attrs.multiple === '' ||
            attrs.multiple.toLowerCase() === 'multiple' ||
            attrs.multiple.toLowerCase() === 'true'
        );

        $select.closeOnSelect = function() {
          if (angular.isDefined(attrs.closeOnSelect)) {
            return $parse(attrs.closeOnSelect)();
          } else {
            return uiSelectConfig.closeOnSelect;
          }
        }();

        $select.onSelectCallback = $parse(attrs.onSelect);
        $select.onRemoveCallback = $parse(attrs.onRemove);

        //From view --> model
        ngModel.$parsers.unshift(function (inputValue) {
          var locals = {},
              result;
          if ($select.multiple){
            var resultMultiple = [];
            for (var j = $select.selected.length - 1; j >= 0; j--) {
              locals = {};
              locals[$select.parserResult.itemName] = $select.selected[j];
              result = $select.parserResult.modelMapper(scope, locals);
              resultMultiple.unshift(result);
            }
            return resultMultiple;
          }else{
            locals = {};
            locals[$select.parserResult.itemName] = inputValue;
            result = $select.parserResult.modelMapper(scope, locals);
            return result;
          }
        });

        //From model --> view
        ngModel.$formatters.unshift(function (inputValue) {
          var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search
              locals = {},
              result;
          if (data){
            if ($select.multiple){
              var resultMultiple = [];
              var checkFnMultiple = function(list, value){
                //if the list is empty add the value to the list
                if (!list || !list.length){
                    resultMultiple.unshift(value);
                    return true;
                }
                for (var p = list.length - 1; p >= 0; p--) {
                  locals[$select.parserResult.itemName] = list[p];
                  result = $select.parserResult.modelMapper(scope, locals);
                  if($select.parserResult.trackByExp){
                      var matches = /\.(.+)/.exec($select.parserResult.trackByExp);
                      if(matches.length>0 && result[matches[1]] == value[matches[1]]){
                          resultMultiple.unshift(list[p]);
                          return true;
                      }
                  }
                  if (result == value){
                    resultMultiple.unshift(list[p]);
                    return true;
                  }
                }
                return false;
              };
              if (!inputValue) return resultMultiple; //If ngModel was undefined
              for (var k = inputValue.length - 1; k >= 0; k--) {
                if (!checkFnMultiple($select.selected, inputValue[k])){
                  checkFnMultiple(data, inputValue[k]);
                }
              }
              return resultMultiple;
            }else{
              var checkFnSingle = function(d){
                locals[$select.parserResult.itemName] = d;
                result = $select.parserResult.modelMapper(scope, locals);
                return result == inputValue;
              };
              //If possible pass same object stored in $select.selected
              if ($select.selected && checkFnSingle($select.selected)) {
                return $select.selected;
              }
              for (var i = data.length - 1; i >= 0; i--) {
                if (checkFnSingle(data[i])) return data[i];
              }
            }
          }
          return inputValue;
        });

        //Set reference to ngModel from uiSelectCtrl
        $select.ngModel = ngModel;

        $select.choiceGrouped = function(group){
          return $select.isGrouped && group && group.name;
        };

        //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954
        var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");

        if(attrs.tabindex){
          //tabindex might be an expression, wait until it contains the actual value before we set the focusser tabindex
          attrs.$observe('tabindex', function(value) {
            //If we are using multiple, add tabindex to the search input
            if($select.multiple){
              searchInput.attr("tabindex", value);
            } else {
              focusser.attr("tabindex", value);
            }
            //Remove the tabindex on the parent so that it is not focusable
            element.removeAttr("tabindex");
          });
        }

        $compile(focusser)(scope);
        $select.focusser = focusser;

        if (!$select.multiple){

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

            if (e.which === KEY.BACKSPACE) {
              e.preventDefault();
              e.stopPropagation();
              $select.select(undefined);
              scope.$apply();
              return;
            }

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

            if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
              return;
            }

            $select.activate(focusser.val()); //User pressed some regular key, so we pass it to the search input
            focusser.val('');
            scope.$digest();

          });

        }


        scope.$watch('searchEnabled', function() {
            var searchEnabled = scope.$eval(attrs.searchEnabled);
            $select.searchEnabled = searchEnabled !== undefined ? searchEnabled : uiSelectConfig.searchEnabled;
        });

        attrs.$observe('disabled', function() {
          // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string
          $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
        });

        attrs.$observe('resetSearchInput', function() {
          // $eval() is needed otherwise we get a string instead of a boolean
          var resetSearchInput = scope.$eval(attrs.resetSearchInput);
          $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
        });

        attrs.$observe('tagging', function() {
          if(attrs.tagging !== undefined)
          {
            // $eval() is needed otherwise we get a string instead of a boolean
            var taggingEval = scope.$eval(attrs.tagging);
            $select.tagging = {isActivated: true, fct: taggingEval !== true ? taggingEval : undefined};
          }
          else
          {
            $select.tagging = {isActivated: false, fct: undefined};
          }
        });

        attrs.$observe('taggingLabel', function() {
          if(attrs.tagging !== undefined )
          {
            // check eval for FALSE, in this case, we disable the labels
            // associated with tagging
            if ( attrs.taggingLabel === 'false' ) {
              $select.taggingLabel = false;
            }
            else
            {
              $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';
            }
          }
        });

        attrs.$observe('taggingTokens', function() {
          if (attrs.tagging !== undefined) {
            var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',','ENTER'];
            $select.taggingTokens = {isActivated: true, tokens: tokens };
          }
        });

        if ($select.multiple){
          scope.$watchCollection(function(){ return ngModel.$modelValue; }, function(newValue, oldValue) {
            if (oldValue != newValue)
              ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
          });
          $select.firstPass = true; // so the form doesn't get dirty as soon as it loads
          scope.$watchCollection('$select.selected', function() {
            if (!$select.firstPass) {
              ngModel.$setViewValue(Date.now()); //Set timestamp as a unique string to force changes
            } else {
              $select.firstPass = false;
            }
          });
          focusser.prop('disabled', true); //Focusser isn't needed if multiple
        }else{
          scope.$watch('$select.selected', function(newValue) {
            if (ngModel.$viewValue !== newValue) {
              ngModel.$setViewValue(newValue);
            }
          });
        }

        ngModel.$render = function() {
          if($select.multiple){
            // Make sure that model value is array
            if(!angular.isArray(ngModel.$viewValue)){
              // Have tolerance for null or undefined values
              if(angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null){
                $select.selected = [];
              } else {
                throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
              }
            }
          }
          $select.selected = ngModel.$viewValue;
        };

        function onDocumentClick(e) {
          if (!$select.open) return; //Skip it if dropdown is close

          var contains = false;

          if (window.jQuery) {
            // Firefox 3.6 does not support element.contains()
            // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
            contains = window.jQuery.contains(element[0], e.target);
          } else {
            contains = element[0].contains(e.target);
          }

          if (!contains && !$select.clickTriggeredSelect) {
            //Will lose focus only with certain targets
            var focusableControls = ['input','button','textarea'];
            var targetScope = angular.element(e.target).scope(); //To check if target is other ui-select
            var skipFocusser = targetScope && targetScope.$select && targetScope.$select !== $select; //To check if target is other ui-select
            if (!skipFocusser) skipFocusser =  ~focusableControls.indexOf(e.target.tagName.toLowerCase()); //Check if target is input, button or textarea
            $select.close(skipFocusser);
            scope.$digest();
          }
          $select.clickTriggeredSelect = false;
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
          transcludedMatch.removeAttr('ui-select-match'); //To avoid loop in case directive as attr
          transcludedMatch.removeAttr('data-ui-select-match'); // Properly handle HTML5 data-attributes
          if (transcludedMatch.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
          }
          element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);

          var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');
          transcludedChoices.removeAttr('ui-select-choices'); //To avoid loop in case directive as attr
          transcludedChoices.removeAttr('data-ui-select-choices'); // Properly handle HTML5 data-attributes
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

        if (!tAttrs.repeat) throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");

        return function link(scope, element, attrs, $select, transcludeFn) {

          // var repeat = RepeatParser.parse(attrs.repeat);
          var groupByExp = attrs.groupBy;

          $select.parseRepeatAttr(attrs.repeat, groupByExp); //Result ready at $select.parserResult

          $select.disableChoiceExpression = attrs.uiDisableChoice;
          $select.onHighlightCallback = attrs.onHighlight;

          if(groupByExp) {
            var groups = element.querySelectorAll('.ui-select-choices-group');
            if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
            groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
          }

          var choices = element.querySelectorAll('.ui-select-choices-row');
          if (choices.length !== 1) {
            throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);
          }

          choices.attr('ng-repeat', RepeatParser.getNgRepeatExpression($select.parserResult.itemName, '$select.items', $select.parserResult.trackByExp, groupByExp))
              .attr('ng-if', '$select.open') //Prevent unnecessary watches when dropdown is closed
              .attr('ng-mouseenter', '$select.setActiveItem('+$select.parserResult.itemName +')')
              .attr('ng-click', '$select.select(' + $select.parserResult.itemName + ',false,$event)');

          var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');
          if (rowsInner.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);
          rowsInner.attr('uis-transclude-append', ''); //Adding uisTranscludeAppend directive to row element after choices element has ngRepeat

          $compile(element, transcludeFn)(scope); //Passing current transcludeFn to be able to append elements correctly from uisTranscludeAppend

          scope.$watch('$select.search', function(newValue) {
            if(newValue && !$select.open && $select.multiple) $select.activate(false, true);
            $select.activeIndex = $select.tagging.isActivated ? -1 : 0;
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
  // Recreates old behavior of ng-transclude. Used internally.
  .directive('uisTranscludeAppend', function () {
    return {
      link: function (scope, element, attrs, ctrl, transclude) {
          transclude(scope, function (clone) {
            element.append(clone);
          });
        }
      };
  })
  .directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
    return {
      restrict: 'EA',
      require: '^uiSelect',
      replace: true,
      transclude: true,
      templateUrl: function(tElement) {
        // Gets theme attribute from parent (ui-select)
        var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
        var multi = tElement.parent().attr('multiple');
        return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');
      },
      link: function(scope, element, attrs, $select) {
        $select.lockChoiceExpression = attrs.uiLockChoice;
        attrs.$observe('placeholder', function(placeholder) {
          $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
        });

        $select.allowClear = (angular.isDefined(attrs.allowClear)) ? (attrs.allowClear === '') ? true : (attrs.allowClear.toLowerCase() === 'true') : false;

        if($select.multiple){
          $select.sizeSearchInput();
        }

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

angular.module("ui.select").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content dropdown-menu\" role=\"listbox\" ng-show=\"$select.items.length > 0\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
$templateCache.put("bootstrap/match-multiple.tpl.html","<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span style=\"margin-right: 3px;\" class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$select.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$select.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
$templateCache.put("bootstrap/match.tpl.html","<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right\"><i class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></i></a></span></div>");
$templateCache.put("bootstrap/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$select.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
$templateCache.put("select2/match-multiple.tpl.html","<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$select.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$select.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
$templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.activate()\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\" ng-click=\"$select.toggle($event)\"><b></b></span></a>");
$templateCache.put("select2/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open,\n                \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$select.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\"></li></ul><div class=\"select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("select2/select.tpl.html","<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open,\n                \'select2-container-disabled\': $select.disabled,\n                \'select2-container-active\': $select.focus,\n                \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
$templateCache.put("selectize/match.tpl.html","<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
$templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");}]);