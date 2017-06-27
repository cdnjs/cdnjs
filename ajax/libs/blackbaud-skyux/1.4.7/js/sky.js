/*global angular */

/** @module Action Bar
@icon bolt
@summary The action bar provides a Sky UX-themed container for buttons that can collapse when the screen is in extra-small mode.
@description The action bar creates a Sky UX-themed container for buttons. It includes the option to collapse groups of buttons into dropdowns when the screen is in extra-small mode.
### Action Bar Settings ###
    - `bb-action-bar` Wraps the content in the action bar.
    - `bb-action-bar-item` Wraps the content in an action button. Any `ng-click` applied to this directive is applied to the action button.
    - `bb-action-bar-item-group` Wraps `bb-action-bar-item` directives to collapse the buttons into a dropdown in extra-small mode. You can also pass an optional `bb-action-bar-item-group-title` to edit the default **Actions** label for the dropdown.

If it is necessary to apply action bar stylying to more complicated scenarios (e.g. hiding and showing buttons at different breakpoints other than xs, collapsing dropdowns into submenus), then you can place any content in a `div` that has the `bb-action-bar` class. Some Bootstrap convenience classes for showing/hiding arbitrary content are the `hidden-xs`, `hidden-sm`, `hidden-md`, and `hidden-lg` classes. You can get more information on these in the [Bootstrap](http://getbootstrap.com/css/#responsive-utilities-classes) documentation.
*/

(function () {
    'use strict';

    function bbActionBar() {
        return {
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/actionbar/actionbar.html'
        };
    }

    function bbActionBarItemGroup(bbResources, bbMediaBreakpoints) {
        return {
            replace: true,
            transclude: true,
            controller: function () {

            },
            restrict: 'E',
            scope: {
                title: '=?bbActionBarItemGroupTitle'
            },
            link: function ($scope, el) {
                if ($scope.title === null || angular.isUndefined($scope.title)) {
                    $scope.title = bbResources.action_bar_actions;
                }

                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        el.find('.bb-action-bar-buttons > ng-transclude').appendTo(el.find('.bb-action-bar-dropdown > .dropdown > ul'));
                    } else {
                        el.find('.bb-action-bar-dropdown .dropdown > ul > ng-transclude').appendTo(el.find('.bb-action-bar-buttons'));
                    }
                }

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                });

            },
            templateUrl: 'sky/templates/actionbar/actionbaritemgroup.html'
        };
    }

    bbActionBarItemGroup.$inject = ['bbResources', 'bbMediaBreakpoints'];

    function bbActionBarItem(bbMediaBreakpoints) {
        return {
            replace: true,
            require: '?^bbActionBarItemGroup',
            transclude: true,
            restrict: 'E',
            link: function ($scope, el, attrs, groupCtrl) {

                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        if (!el.parent().is('li')) {
                            el.wrap('<li></li>');
                        }

                    } else {
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    }
                }

                if (groupCtrl !== null) {
                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    $scope.$on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                        //get rid of wrapper on destroy
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    });
                }
            },
            templateUrl: 'sky/templates/actionbar/actionbaritem.html'
        };
    }

    bbActionBarItem.$inject = ['bbMediaBreakpoints'];

    angular.module('sky.actionbar', ['sky.resources', 'sky.mediabreakpoints'])
        .directive('bbActionBar', bbActionBar)
        .directive('bbActionBarItemGroup', bbActionBarItemGroup)
        .directive('bbActionBarItem', bbActionBarItem);
}());

/*jshint browser: true */

/*global angular */

/** @module Autofocus
@icon camera
@summary  The autofocus component specifies the input item on a form that should get focus when the form loads.
 @description The `bb-autofocus` directive specifies the item on a form that should get focus when the form renders. You can use this directive when items such as Angular dynamically loaded templates do not play nicely with the HTML autofocus property.
The **Open Modal** button below demonstrates a modal form where the `bb-autofocus` directive places the focus on an input control on the form.
 */

(function () {
    'use strict';

    angular.module('sky.autofocus', [])
        .directive('bbAutofocus', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element) {
                    /*jslint unparam: true */
                    $timeout(function () {
                        $element.focus();
                    }, 500);
                }
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular, jQuery */
/** @module Autonumeric
@icon calculator
@summary The autonumeric component wraps up the autoNumeric jQuery plugin to format any type of number, including currency.
 @description The `bb-autonumeric` directive wraps up the autoNumeric jQuery plugin to format any type of number, including currency. You must use this directive in conjunction with the `ngModel` directive where the property bound to `ngModel` is the raw numeric value on your model.

 ### Dependencies ###

 - **[autoNumeric](http://www.decorplanit.com/plugin/) (1.9.27 or higher)** Used to format money values

---

### Autonumeric Settings ###

 - `bb-autonumeric` This  can optionally be assigned the name of a property from the `bbAutonumericConfig` object.  If none is specified, it defaults to `number`.
 - `bb-autonumeric-settings` This can be assigned a value that represents a settings object that can be passed to autoNumeric.  These options will override any default options specified in the `bb-autonumeric` attribute.  A complete list of options is available [here](http://www.decorplanit.com/plugin/).

### Autonumeric Filter ###

In addition to the directive, there is also a filter that can be used to format numbers.  The filter has the added feature of optionally abbreviating a number according to Sky patterns.  For instance,
numbers over 10,000 will be displayed as 10k, over 1,000,000 as 1m, and 1,000,000,000 as 1b.  The filter takes three arguments:

 - `input` The value to format.
 - `configType` The name of the configuration (`number` or `money`) to apply to the value.
 - `abbreviate` A Boolean value indicating whether to abbreviate large numbers.
 */
(function ($) {
    'use strict';

    function getBaseSettings(bbAutoNumericConfig, configType) {
        var baseSettings,
            configSettings;

        baseSettings = angular.extend(
            {},
            $.fn.autoNumeric.defaults,
            bbAutoNumericConfig.number
        );

        if (configType) {
            configSettings = bbAutoNumericConfig[configType];
        }

        if (configSettings) {
            angular.extend(baseSettings, configSettings);
        }

        return baseSettings;
    }

    angular.module('sky.autonumeric', ['sky.resources', 'sky.window'])
        .constant('bbAutonumericConfig', {
            number: {
                aSep: ',',
                dGroup: 3,
                aDec: '.',
                pSign: 'p',
                mDec: 2
            },
            money: {
                aSign: '$'
            }
        })
        .directive('bbAutonumeric', ['$timeout', 'bbAutonumericConfig', 'bbWindow', function ($timeout, bbAutoNumericConfig, bbWindow) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, el, attrs, ngModel) {
                    var customSettings = {},
                        isIosUserAgent = bbWindow.isIosUserAgent();

                    function applySettings() {
                        el.autoNumeric('update', angular.extend({}, getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric), customSettings));
                    }

                    function applyCssSettings(el) {
                        if (attrs.bbAutonumeric) {
                            el.addClass('bb-autonumeric-' + attrs.bbAutonumeric);
                        }
                    }

                    function autonumericChange() {
                        return $scope.$apply(function () {

                            var value = parseFloat(el.autoNumeric('get'));

                            if (isNaN(value)) {
                                value = null;
                            }
                            return ngModel.$setViewValue(value);
                        });
                    }

                    if (attrs.bbAutonumericSettings) {
                        $scope.$watch(attrs.bbAutonumericSettings, function (newValue) {
                            customSettings = newValue || {};
                            applySettings();
                        }, true);
                    }

                    el.autoNumeric(getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric));
                    applyCssSettings(el);

                    // If a valid number, update the autoNumeric value.
                    // Also handles the model being updated, but being in correct (usually a paste).
                    // In that case, updates the model to what the autoNumeric plugin's value.
                    $scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        var getValue,
                            selectionStart;
                        if (newValue !== undefined && newValue !== null && !isNaN(newValue)) {

                            if (parseFloat(newValue) !== parseFloat(oldValue)) {

                                selectionStart = el[0].selectionStart;
                            }

                            el.autoNumeric('set', newValue);
                            getValue = el.autoNumeric('get');
                            if (parseFloat(getValue) !== parseFloat(newValue)) {
                                $timeout(autonumericChange);
                            } else if (el[0] && angular.isFunction(el[0].setSelectionRange) && angular.isDefined(selectionStart)) {
                                $timeout(function () {
                                    el[0].setSelectionRange(selectionStart, selectionStart);
                                });
                            }
                        } else if (newValue === null) {
                            el.val(null);

                        }
                    });

                    el.on('keydown', function (event) {
                        if (event.which === 13) {
                            autonumericChange();
                        }
                    });

                    el.on('change paste onpaste', function () {
                        autonumericChange();

                    });

                    // When focusing in textbox, select all.  This is to workaround not having placeholder text for autonumeric.
                    /*
                        istanbul ignore next: the test for this code isn't passing on IE 10 on BrowserStack in automated mode.
                        This isn't mission-critical so I'm just ignoring it for now.
                    */
                    el.on('focusin.bbAutonumeric', function () {
                        $timeout(function () {
                            // Check to ensure the field still has focus once the $timeout callback is executed.
                            // https://github.com/blackbaud/skyux/issues/64
                            if (el.is(':focus')) {
                                if (!isIosUserAgent) {
                                    el.select();
                                } else {
                                    //use setSelectionRange instead of select because select in a timeout does not work with iOS
                                    el[0].setSelectionRange(0, 9999);
                                }
                            }
                        });
                    });

                }
            };
        }])
        .filter('bbAutonumeric', ['bbAutonumericConfig', 'bbResources', function (bbAutonumericConfig, bbResources) {
            return function (input, configType, abbreviate) {
                var aSign,
                    dividend,
                    mDec,
                    formatted,
                    settings,
                    suffix,
                    tempEl;

                if (input === null || angular.isUndefined(input)) {
                    return '';
                }

                if (isNaN(input)) {
                    return input;
                }


                tempEl = $('<span></span>');

                settings = getBaseSettings(bbAutonumericConfig, configType);

                if (abbreviate) {
                    if (settings.pSign === 's') {
                        // The suffix needs to go between the number and the currency symbol, so the currency
                        // symbol has to be left off and appended after the number is formatted.
                        aSign = settings.aSign;
                        settings.aSign = '';
                    }

                    input = Math.round(input);

                    if (input >= 1000000000) {
                        dividend = 100000000;
                        suffix = bbResources.autonumeric_abbr_billions;
                    } else if (input >= 1000000) {
                        dividend = 100000;
                        suffix = bbResources.autonumeric_abbr_millions;
                    } else if (input >= 10000) {
                        dividend = 100;
                        suffix = bbResources.autonumeric_abbr_thousands;
                    }

                    if (suffix) {
                        input = Math.floor(input / dividend) / 10;
                        mDec = Math.floor(input) === input ? 0 : 1;
                    } else {
                        mDec = 0;
                    }

                    settings.mDec = mDec;
                }

                tempEl.autoNumeric(settings);
                tempEl.autoNumeric('set', input);

                formatted = tempEl.text();

                if (suffix) {
                    formatted += suffix;
                }

                if (abbreviate && settings.pSign === 's' && aSign) {
                    formatted += aSign;
                }

                return formatted;
            };
        }]);
}(jQuery));

/*jshint browser: true */

/*global angular */

/** @module Check
@icon check-square
@summary The check applies a commonly styled selector to a checkbox or radio button.
 @description The check directive allows you to change an input element of type checkbox or radio into a commonly-styled selector.  The value that is selected is driven through the `ng-model` attribute specified on the input element and for radio input types the value to set on the `ng-model` can be specified by the value attribute.

---

 */

(function () {
    'use strict';
    angular.module('sky.check', [])
        .directive('bbCheck', ['$templateCache', function ($templateCache) {
            function createEl(name) {
                return angular.element($templateCache.get('sky/templates/check/' + name + '.html'));
            }

            return {
                link: function (scope, el, attr) {
                    var labelEl = el.parent('label'),
                        styledEl,
                        typeClass;

                    if (labelEl.length < 1) {
                        el.wrap(createEl('wrapper'));
                    } else {
                        labelEl.addClass('bb-check-wrapper');
                    }
                    if (attr.type === 'radio') {
                        typeClass = 'bb-check-radio';
                    } else {
                        typeClass = 'bb-check-checkbox';
                    }

                    styledEl = createEl('styled');
                    styledEl.addClass(typeClass);

                    el.after(styledEl);
                }
            };
        }]);
}());

/*jslint browser: true */
/*global angular */

/** @module Checklist
@icon list-ul
@summary The checklist builds a filterable checkbox list that can display multiple columns of data.
 @description The checklist directive allows you to easily build a filterable checkbox list.  Multiple columns of data can be provided for the checkbox rows using the `bb-checklist-column` element.  Items can also be displayed in a list view with each row displaying a title and description.  The list view is preferable when building a responsive application.

### Checklist Settings ###

 - `bb-checklist`
 - `bb-checklist-items` An array of objects representing the rows that will be shown in the list.
 - `bb-checklist-selected-items` An array representing the selected items in the list.
 - `bb-checklist-include-search` A Boolean to optionally include a search textbox for filtering the items.  The search text will be highlighted in the columns of the list.  A callback function can be used to filter the items based on the search text.
 - `bb-checklist-search-placeholder` Placeholder text for the search textbox.
 - `bb-checklist-filter-callback` A function to be called when the search text is modified.  Used by the consumer to update the `bb-checklist-items` array as desired based on the search text.  The function will be passed a single object as a parameter containing `searchText` and `category` properties.  Useful when loading items remotely or using custom logic other than simple case-insensitive string matching to filter items.
 - `bb-checklist-filter-local` When specified, items are filtered by the checklist directive by examining the properties of each item to match the specified category or search text.
 - `bb-checklist-search-debounce` Number of milliseconds to debounce changes to the search text.  Useful if making a web request in the `bb-checklist-filter-callback` to avoid making the request after every character typed.
 - `bb-checklist-no-items-message` *(Default: `'No items found'`)* Message to display when no items are in the list.
 - `bb-checklist-mode` *(Optional. Default: 'grid')* one of two possible values:
  - `list` Displays items in a list with a title and description.  Items are expected to have `title`, `description` and `category` properties.  This is the preferred method of displaying a checklist.
  - `grid` Displays items in a grid with any number of columns.  Columns are specified using mulitple `bb-checklist-column` elements.  For backwards compatibility reasons this is the default mode, but `list` is the preferred mode since it is mobile-responsive.
 - `bb-checklist-categories` An array of category names used to build category filter buttons at the top of the list.

### Checklist Column Settings ###

 - `bb-checklist-column-caption` Caption text for the column header.
 - `bb-checklist-column-field` The name of the property on the checklist items that contains the text to display in this column.
 - `bb-checklist-column-class` A CSS class to apply to this column's header and cells.
 - `bb-checklist-column-width` Set the width to be used by the column.
 */

(function () {
    'use strict';

    var PROP_CATEGORY = 'category';

    function bbChecklist(bbChecklistUtility) {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: 'sky/templates/checklist/checklist.html',
            scope: {
                bbChecklistItems: '=',
                bbChecklistSelectedItems: '=',
                bbChecklistFilterCallback: '=',
                bbChecklistIncludeSearch: '=',
                bbChecklistSearchDebounce: '=',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=',
                bbChecklistCategories: '=',
                bbChecklistMode: '@'
            },
            controller: ['$scope', function ($scope) {
                var locals = $scope.locals = {};

                this.setColumns = function (columns) {
                    locals.columns = columns;
                };
            }],
            link: function ($scope, el, attrs) {
                var filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal),
                    locals = $scope.locals;

                function itemMatchesCategory(item, category) {
                    return !category || item.category === category;
                }

                function itemMatchesFilter(item, category, searchTextUpper) {
                    var p,
                        val;

                    if (itemMatchesCategory(item, category)) {
                        if (!searchTextUpper) {
                            return true;
                        }

                        for (p in item) {
                            if (item.hasOwnProperty(p) && p !== PROP_CATEGORY) {
                                val = item[p];

                                if (angular.isString(val) && val.toUpperCase().indexOf(searchTextUpper) >= 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    return false;
                }

                function invokeFilterLocal() {
                    var filteredItems,
                        i,
                        item,
                        items = $scope.bbChecklistItems,
                        n,
                        searchTextUpper = (locals.searchText || '').toUpperCase(),
                        selectedCategory = locals.selectedCategory;

                    if (!searchTextUpper && !selectedCategory) {
                        filteredItems = items.slice(0);
                    } else {
                        filteredItems = [];

                        for (i = 0, n = items.length; i < n; i++) {
                            item = items[i];

                            if (itemMatchesFilter(item, selectedCategory, searchTextUpper)) {
                                filteredItems.push(item);
                            }
                        }
                    }

                    locals.filteredItems = filteredItems;
                }

                function invokeFilter() {
                    if (filterLocal) {
                        invokeFilterLocal();
                    } else if ($scope.bbChecklistFilterCallback) {
                        $scope.bbChecklistFilterCallback({
                            searchText: locals.searchText,
                            category: locals.selectedCategory
                        });
                    }
                }

                $scope.bbChecklistSelectedItems = $scope.bbChecklistSelectedItems || [];

                locals.selectAll = function () {
                    var i,
                        item,
                        items = locals.filteredItems,
                        selected = $scope.bbChecklistSelectedItems;

                    for (i = 0; i < items.length; i += 1) {
                        item = items[i];
                        if (!bbChecklistUtility.contains(selected, item)) {
                            bbChecklistUtility.add(selected, item);
                        }
                    }
                };

                locals.clear = function () {
                    var i,
                        item,
                        items = locals.filteredItems,
                        selected = $scope.bbChecklistSelectedItems;

                    for (i = 0; i < items.length; i += 1) {
                        item = items[i];
                        bbChecklistUtility.remove(selected, item);
                    }
                };

                locals.rowClicked = function (item) {
                    var selected = $scope.bbChecklistSelectedItems;

                    if (!bbChecklistUtility.contains(selected, item)) {
                        bbChecklistUtility.add(selected, item);
                    } else {
                        bbChecklistUtility.remove(selected, item);
                    }
                };

                locals.filterByCategory = function (selectedCategory) {
                    locals.selectedCategory = selectedCategory;
                    invokeFilter();
                };

                $scope.$watch('bbChecklistItems', function () {
                    locals.filteredItems = $scope.bbChecklistItems;
                    locals.highlightRefresh = new Date().getTime();
                });

                $scope.$watch('locals.searchText', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        invokeFilter();
                    }
                });
            }
        };
    }

    bbChecklist.$inject = ['bbChecklistUtility'];

    angular.module('sky.checklist', ['sky.check', 'sky.checklist.column', 'sky.checklist.columns', 'sky.checklist.model', 'sky.checklist.utility', 'sky.resources'])
        .directive('bbChecklist', bbChecklist);
}());

/*global angular */

(function () {
    'use strict';

    function bbChecklistColumn() {
        return {
            require: '^bbChecklistColumns',
            restrict: 'E',
            scope: {
                bbChecklistColumnCaption: "=",
                bbChecklistColumnField: "=",
                bbChecklistColumnClass: "=",
                bbChecklistColumnWidth: "=",
                bbChecklistColumnAutomationId: "="
            },
            link: function ($scope, element, attrs, bbChecklistColumns) {
                /*jslint unparam: true */
                var column = {
                    caption: $scope.bbChecklistColumnCaption,
                    field: $scope.bbChecklistColumnField,
                    'class': $scope.bbChecklistColumnClass,
                    width: $scope.bbChecklistColumnWidth,
                    automationId: $scope.bbChecklistColumnAutomationId
                };

                bbChecklistColumns.addColumn(column);
            }
        };
    }
    
    angular.module('sky.checklist.column', ['sky.checklist.columns'])
        .directive('bbChecklistColumn', bbChecklistColumn);
}());
/*global angular */

(function () {
    'use strict';
    
    function bbChecklistColumns() {
        return {
            require: '^bbChecklist',
            restrict: 'E',
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.columns = [];

                this.addColumn = function (column) {
                    $scope.columns.push(column);
                };
            }],
            link: function ($scope, element, attrs, bbChecklist) {
                /*jslint unparam: true */
                bbChecklist.setColumns($scope.columns);
            }
        };
    }
    
    angular.module('sky.checklist.columns', [])
        .directive('bbChecklistColumns', bbChecklistColumns);
}());
/*global angular */

(function () {
    'use strict';
    
    function checklistModel($compile, $parse, bbChecklistUtility) {
        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            var getter,
                setter,
                value;

            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);

            // getter / setter for original model
            getter = $parse(attrs.checklistModel);
            setter = getter.assign;

            // value added to list
            value = $parse(attrs.checklistValue)(scope.$parent);

            // watch UI checked change
            scope.$watch('checked', function (newValue, oldValue) {
                var current;

                if (newValue === oldValue) {
                    return;
                }

                current = getter(scope.$parent);

                if (newValue === true) {
                    setter(scope.$parent, bbChecklistUtility.add(current, value));
                } else {
                    setter(scope.$parent, bbChecklistUtility.remove(current, value));
                }
            });

            // watch original model change
            scope.$parent.$watch(attrs.checklistModel, function (newArr) {
                scope.checked = bbChecklistUtility.contains(newArr, value);
            }, true);
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function (tElement, tAttrs) {
                if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }

                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }

                // exclude recursion
                tElement.removeAttr('checklist-model');

                // local scope var storing individual checkbox model
                tElement.attr('ng-model', 'checked');

                return postLinkFn;
            }
        };
    }
    
    checklistModel.$inject = ['$compile', '$parse', 'bbChecklistUtility'];
    
    angular.module('sky.checklist.model', ['sky.checklist.utility'])
        .directive('checklistModel', checklistModel);
}());
/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.checklist.utility', [])
        .factory('bbChecklistUtility', function () {
            return {
                
                contains: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },

                // add
                add: function (arr, item) {
                    var i;

                    arr = angular.isArray(arr) ? arr : [];
                    for (i = 0; i < arr.length; i += 1) {
                        if (angular.equals(arr[i], item)) {
                            return arr;
                        }
                    }
                    arr.push(item);
                    return arr;
                },

                // remove
                remove: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    return arr;
                }

            };
        });
}());
/* global angular */

/** @module Context Menu

@icon ellipsis-h
@summary The context menu creates simple or complicated dropdown menus that you can incorporate into buttons.
@description The context menu directives allow you to easily create Sky-styled  [dropdown](https://angular-ui.github.io/bootstrap/#/dropdown) menus. There are 3 directives in the context menu module:
  - `bb-context-menu` creates a dropdown with the context menu button.
  - `bb-context-menu-item` creates dropdown menu items within a dropdown that execute `bb-context-menu-action` on click.
  - `bb-context-menu-button` creates a button with the Sky context menu styles.
  - `bb-submenu` creates an accordion style submenu in a dropdown, you can place it in a dropdown list element.
    - `bb-submenu-heading` Can be either an attribute on `bb-submenu` that can be set equal to static header text, or can be used as a directive inside of `bb-submenu` to place arbitrary content in an accordion heading.
*/

(function () {
    'use strict';

    function getTemplateUrl(name) {
        return 'sky/templates/contextmenu/' + name + '.html';
    }

    function bbContextMenu() {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: getTemplateUrl('contextmenu'),
            link: function ($scope) {
                $scope.contextButtonStopPropagation = function ($event) {
                    $event.stopPropagation();
                };
            }
        };
    }

    function bbContextMenuItem() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                clickItem: '&bbContextMenuAction'
            },
            templateUrl: getTemplateUrl('menuitem')
        };
    }

    function bbContextMenuButton() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: getTemplateUrl('menubutton')
        };
    }

    function toggleAccordion($event, $scope) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.accordionLocals.accordionOpen = !$scope.accordionLocals.accordionOpen;
    }

    function BBSubmenuController($scope) {
        var self = this;

        self.toggleAccordion = function ($event) {
            toggleAccordion($event, $scope);
        };
    }

    BBSubmenuController.$inject = ['$scope'];

    function bbSubmenu() {
        return {
            controller: 'bbSubmenuController',
            restrict: 'E',
            scope: {
                heading: '=?bbSubmenuHeading'
            },
            link: function ($scope, el, attrs) {
                $scope.accordionLocals = {
                    accordionOpen: false,
                    staticHeader: false
                };

                if (angular.isDefined(attrs.bbSubmenuHeading)) {
                    $scope.accordionLocals.staticHeader = true;
                }

                $scope.toggleAccordion = function ($event) {
                    toggleAccordion($event, $scope);
                };
            },
            transclude: true,
            templateUrl: getTemplateUrl('submenu')
        };
    }

    function bbSubmenuHeading() {
        return {
            restrict: 'E',
            require: '^bbSubmenu',
            scope: true,
            link: function ($scope, el, attrs, submenuCtrl) {
                $scope.toggleAccordion = function ($event) {
                    submenuCtrl.toggleAccordion($event);
                };
            },
            transclude: true,
            templateUrl: getTemplateUrl('submenuheading')
        };
    }

    angular.module('sky.contextmenu', ['ui.bootstrap.dropdown', 'ui.bootstrap.accordion'])
        .controller('bbSubmenuController', BBSubmenuController)
        .directive('bbContextMenu', bbContextMenu)
        .directive('bbContextMenuItem', bbContextMenuItem)
        .directive('bbContextMenuButton', bbContextMenuButton)
        .directive('bbSubmenu', bbSubmenu)
        .directive('bbSubmenuHeading', bbSubmenuHeading);
}());

/*global angular, jQuery, require */

/** @module Data

@summary The data service provides access to convenience functions that allow you to manipulate data.
@icon database
@description The data service provides methods for loading data from and saving data to web service endpoints.

### bbData Functions ###

  - `load(loadObj)` Takes an object with `data`, `resources`, and `text` properties and returns a promise that contains the result of an HTTP GET request.  Note that in addition to the `data`, `resources` and `text` properties on the result object there is also an `httpResults` property containing the results from the underlying calls to [Angular's `$http` service](https://docs.angularjs.org/api/ng/service/$http).  These objects include metadata about the response such as the HTTP status code.
    - `data` Either a URL or an object with multiple URLs to be requested. The promise results will be contained in `result.data`. e.g. `bbData.load({data: '/foo/data'})` or `bbData.load({data: {a: '/foo/data1', b: '/foo/data2'}})`.  The requests to the specified URLs will be made with credentials.
    - `resources` Either a URL or an object with multiple URLs to be requested. The promise results will be contained in `result.resources`. The requests to the specified URLs will be made without credentials.
    - `text` Either a URL or an object with multiple URLs to be requested. The promise results will be contained in `result.text`.  The requests to the specified URLs will be made without credentials and the result will be returned as a string rather than an object.
    - `loadManager` An object with a `name` and `scope` property which creates a wait while it and its child load managers retreive data.
  - `query(url, queryParams)` Creates a URL with a query string based on an the queryParam's properties. e.g. `bbData.query('/foo/search', {x: 'y', z: 123});` returns `/foo/search?x=y&z=123`.
  - `post(url, data)` For use within `bbData.load`, creates a post request from a URL and data object. e.g. `bbData.load({data: bbData.post('/foo/post', postData)});`.
  - `save(saveObj)` A function that issues an HTTP post for the purpose of storing data on the remote server. Takes an argument with the following properties:
    - `url` The URL to which to send the request.
    - `data` The object to be POSTed to the URL.
    - `type` (*default: `POST`) The HTTP verb to use along with the request.
  - `cancel(promise)` Takes a promise returned by `bbData.load` or `bbData.save` and cancels the underlying HTTP request.  The promise will be rejected after cancelling.
*/

(function ($) {
    'use strict';

    var DEFAULT_PROP = '__DEFAULT__',
        REQUEST_TYPE_DATA = 0,
        REQUEST_TYPE_RESOURCES = 1,
        REQUEST_TYPE_TEXT = 2;

    function fillUrls(option, props, urls) {
        var item,
            p,
            url;

        /*istanbul ignore else: sanity check */
        if (option) {
            if (angular.isString(option) || option.BB_DATA_POST) {
                url = option;

                option = {};
                option[DEFAULT_PROP] = url;
            }

            for (p in option) {
                /*istanbul ignore else */
                if (option.hasOwnProperty(p)) {
                    item = option[p];
                    url = item;

                    props.push(p);
                    urls.push(url);
                }
            }
        }
    }

    function loadManager(options) {
        // A service endpoint for tracking loading items.

        var item,
            loadingItems = [],
            nonblockingForAdditionalItems = false,
            result,
            scope,
            waitingForFirstItem = false;

        function cancelWaiting() {
            options.waitForFirstItem = false;
            options.nonblockWaitForAdditionalItems = false;

            if (nonblockingForAdditionalItems) {
                nonblockingForAdditionalItems = false;
                scope.$emit("bbEndWait", { nonblocking: true });
            }

            if (waitingForFirstItem) {
                waitingForFirstItem = false;
                scope.$emit("bbEndWait");
            }
        }

        function startNonblockingForAdditionalItems() {
            nonblockingForAdditionalItems = true;
            scope.$emit("bbBeginWait", { nonblocking: true });
        }

        function markCompleted(item) {
            var i = loadingItems.indexOf(item);

            if (i !== -1) {
                loadingItems.splice(i, 1);
                if (loadingItems.length === 0) {
                    result.isLoading = false;

                    if (nonblockingForAdditionalItems) {
                        nonblockingForAdditionalItems = false;
                        scope.$emit("bbEndWait", { nonblocking: true });
                    }
                }
            }

            if (!result.isFirstItemLoaded) {
                result.isFirstItemLoaded = true;
                if (waitingForFirstItem) {
                    waitingForFirstItem = false;
                    scope.$emit("bbEndWait");
                }
            }

            if (result.isLoading && options.nonblockWaitForAdditionalItems && !nonblockingForAdditionalItems) {
                startNonblockingForAdditionalItems();
            }
        }

        function registerItem(item) {
            if (!result.isLoading) {
                if (result.isFirstItemLoaded && options.nonblockWaitForAdditionalItems) {
                    startNonblockingForAdditionalItems();
                }
            }
            loadingItems.push(item);
            result.isLoading = true;
        }

        // Initialize values
        scope = options.scope;

        if (options.load) {
            item = {
                name: options.name,
                load: options.load
            };
        }

        result = {
            isFirstItemLoaded: false,
            isLoading: false,
            loadingItems: loadingItems,
            cancelWaiting: cancelWaiting
        };

        if (options.waitForFirstItem) {
            waitingForFirstItem = true;
            scope.$emit("bbBeginWait");
        }

        // Start loading any item that is handed directly to the loader.
        if (item) {
            // Add the current item to the list.
            registerItem(item);

            // Start loading the item.
            result.loaded = item.load().finally(function () {
                markCompleted(item);
                scope.$parent.$emit("bbData.loadManager.markCompleted", item);
            });

            scope.$parent.$emit("bbData.loadManager.registerItem", item);
        }

        if (options.isAggregate) {
            // Listen to items being registered by child loadManagers.
            scope.$on("bbData.loadManager.registerItem", function (e, item) {
                e.stopPropagation();
                registerItem(item);
            });

            // Listen to items being marked completed by child loadManagers.
            scope.$on("bbData.loadManager.markCompleted", function (e, item) {
                e.stopPropagation();
                markCompleted(item);
            });
        }

        return result;
    }

    function bbData($http, $q, $templateCache, bbDataConfig, $window) {
        function ajaxUrl(url, requestType) {
            var filter,
                parts;

            requestType = requestType || 0;

            if ($window.define && $window.define.amd && $window.require) {
                parts = url.split('?');

                // Grab the portion before the query string and get the fully-qualified URL.
                url = parts.shift();
                url = require.toUrl(url);

                // If there was anything after the first question mark, put it back.
                url += '?' + parts.join('');
            }

            switch (requestType) {
            case REQUEST_TYPE_DATA:
                filter = bbDataConfig.dataUrlFilter;
                break;
            case REQUEST_TYPE_RESOURCES:
                filter = bbDataConfig.resourceUrlFilter;
                break;
            case REQUEST_TYPE_TEXT:
                filter = bbDataConfig.textUrlFilter;
                break;
            }

            if (angular.isFunction(filter)) {
                url = filter(url);
            }

            return url;
        }

        function createAjaxPromise(item, isPost, requestType, timeoutPromise) {
            var data,
                httpOptions,
                isGet,
                textContent,
                type,
                url;

            requestType = requestType || 0;

            if (item.BB_DATA_POST || isPost) {
                data = item.data;
                type = item.type || 'post';
                url = item.url;
            } else {
                type = 'get';
                url = item;
                isGet = true;
            }

            if (isGet && requestType === REQUEST_TYPE_TEXT) {
                // Check the Angular template cache using the raw URL first in case the text content is compiled into
                // the module bundle.
                textContent = $templateCache.get(url);

                if (textContent) {
                    return $q(function (resolve) {
                        resolve({
                            data: textContent
                        });
                    });
                }
            }

            url = ajaxUrl(url, requestType);

            httpOptions = {
                method: type,
                url: url,
                cache: requestType !== 0,
                data: data ? JSON.stringify(data) : null,
                dataType: requestType !== 0 ? 'text' : 'json',
                withCredentials: requestType === 0,
                timeout: timeoutPromise
            };

            if (data instanceof $window.FormData) {
                // Angular sets the Content-Type to application/json by default, but when posting FormData
                // it should clear out the Content-Type and let the browser determine it.
                // https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
                angular.extend(httpOptions, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                });
            }

            return $http(httpOptions);
        }

        function addPromises(items, urls, requestType, timeoutPromise) {
            var i,
                n,
                url;

            if (urls) {
                for (i = 0, n = urls.length; i < n; i++) {
                    url = urls[i];
                    items.push(createAjaxPromise(url, null, requestType, timeoutPromise));
                }
            }
        }

        function nextId() {
            nextId.index = nextId.index || 0;
            nextId.index++;
            return nextId.index;
        }

        function trackHTTPTimeoutForPromise(fn) {
            var id = nextId(),
                promise,
                httpTimeout = $q.defer();

            trackHTTPTimeoutForPromise[id] = httpTimeout;

            promise = fn(httpTimeout.promise);
            promise._id = id;

            function clearPromiseId() {
                delete trackHTTPTimeoutForPromise[id];
            }

            promise.then(clearPromiseId, clearPromiseId);

            return promise;
        }

        function loadData(options) {
            return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                return $q(function (resolve, reject) {
                    var dataOption,
                        dataProps,
                        dataUrls,
                        resourcesOption,
                        resourcesProps,
                        resourcesUrls,
                        promises = [],
                        textOption,
                        textProps,
                        textUrls;

                    function success(args) {
                        var argIndex = 0,
                            result = {
                                httpResults: {}
                            };

                        function addResult(name, props) {
                            var resultData,
                                httpResult,
                                i,
                                n,
                                p,
                                resultItem,
                                resultItemHttpResults;

                            if (props) {
                                for (i = 0, n = props.length; i < n; i++) {
                                    p = props[i];
                                    httpResult = args[argIndex];
                                    resultData = httpResult.data;

                                    if (p === DEFAULT_PROP) {
                                        resultItem = resultData;
                                        resultItemHttpResults = httpResult;
                                    } else {
                                        resultItem = resultItem || {};
                                        resultItem[p] = resultData;

                                        resultItemHttpResults = resultItemHttpResults || {};
                                        resultItemHttpResults[p] = httpResult;
                                    }

                                    argIndex++;
                                }
                            }

                            if (angular.isDefined(resultItem)) {
                                result[name] = resultItem;
                            }

                            if (angular.isDefined(resultItemHttpResults)) {
                                result.httpResults[name] = resultItemHttpResults;
                            }
                        }

                        addResult('data', dataProps, true);
                        addResult('resources', resourcesProps);
                        addResult('text', textProps);

                        resolve(result);
                    }

                    function failure() {
                        /*jshint validthis: true */
                        reject.apply(this, arguments);
                    }

                    dataOption = options.data;
                    resourcesOption = options.resources;
                    textOption = options.text;

                    if (dataOption) {
                        dataProps = [];
                        dataUrls = [];
                        fillUrls(dataOption, dataProps, dataUrls);
                    }

                    if (resourcesOption) {
                        resourcesProps = [];
                        resourcesUrls = [];
                        fillUrls(resourcesOption, resourcesProps, resourcesUrls);
                    }

                    if (textOption) {
                        textProps = [];
                        textUrls = [];
                        fillUrls(textOption, textProps, textUrls);
                    }

                    addPromises(promises, dataUrls, REQUEST_TYPE_DATA, timeoutPromise);
                    addPromises(promises, resourcesUrls, REQUEST_TYPE_RESOURCES, timeoutPromise);
                    addPromises(promises, textUrls, REQUEST_TYPE_TEXT, timeoutPromise);

                    $q.all(promises)
                        .then(success)
                        .catch(failure);
                });
            });
        }

        return {
            cancel: function (promise) {
                if (promise && promise._id && trackHTTPTimeoutForPromise[promise._id]) {
                    trackHTTPTimeoutForPromise[promise._id].resolve();
                }
            },
            load: function (options) {
                if (options.loadManager) {
                    options.loadManager.load = function () {
                        return loadData(options);
                    };

                    return loadManager(options.loadManager).loaded;
                }

                return loadData(options);
            },
            loadManager: loadManager,
            query: function (url, params) {
                return url + '?' + $.param(params);
            },
            post: function (url, data) {
                return {
                    url: url,
                    data: data,
                    BB_DATA_POST: true
                };
            },
            save: function (options) {
                return trackHTTPTimeoutForPromise(function (timeoutPromise) {
                    return createAjaxPromise(options, true, null, timeoutPromise);
                });
            }
        };
    }

    bbData.$inject = ['$http', '$q', '$templateCache', 'bbDataConfig', '$window'];

    angular.module('sky.data', [])
        .constant('bbDataConfig', {})
        .factory('bbData', bbData);
}(jQuery));

/*jshint browser: true */
/*global angular, jQuery */

/** @module Date Picker
@icon calendar-o
@summary The date picker wraps the ui.bootstrap.datepicker directive from Angular UI Bootstrap to create an input text box that includes a calendar for selecting dates.
@description The `bb-datepicker` directive wraps the ui.bootstrap.datepicker directive from [Angular UI Bootstrap](https://angular-ui.github.io/bootstrap/). It creates an input text box with a calendar picker for selecting dates.

## Date Picker Settings
  - `bb-custom-validation` an object containing the following:
    - `formatValue` A function that will be called when text is entered directly into the textbox. The only parameter to the function will be the raw value of the textbox. The function should return an object or a promise of an object with properties of `formattedValue` and optionally `formattingErrorMessage` if there was a problem when trying to format the input value.
  - `bb-date-format` The format string that the date should display as in the input text box. This will override the default set in the `bbDatepickerConfig` `currentCultureDateFormatString` property. The default format in sky is set as `MM/dd/yyyy`. The format string should be set up like the [angular](https://docs.angularjs.org/api/ng/filter/date) date filter format strings.
  - `bb-date-options` Options object for customizing the date picker. The options included are all of those valid for the angular ui bootstrap `datepicker-options` object. You can set application defaults for the `showWeeks` and `startingDay` properties of the angular ui bootstrap date picker in the `bbDatepickerConfig` constant defined in `sky.datepicker`. In sky the default for `showWeeks` is false and `startingDay` is 0 unless overridden in `bbDatepickerConfig`.
  - `bb-datepicker-name` This value gets bound to the `name` attribute of the date picker input for use in validation and form submission.
  - `close-on-date-selection` *(Default: true):*  Whether to close calendar when a date is chosen.
  - `datepicker-append-to-body` *(Default: false):*  Append the date picker popup element to `body`, rather than inserting after the date picker input.
  - `max-date` A Javascript Date object that can set a maximum date for the date picker control and input. Input validation will be bound to `$scope.myFormName.inputName.$error.maxDate`. This value can also be set globally in the `bbDatepickerConfig` object property `maxDate`.
  - `min-date` A Javascript Date object that can set a minimum date for the date picker control and input. Input validation will be bound to `$scope.myFormName.inputName.$error.minDate`. This value can also be set globally in the `bbDatepickerConfig` object property `minDate`.
  - `ng-model` An object to bind the date value in and out of the date picker. This will be set to a Javascript Date object when set or parsed from the bootstrap date picker.
  - `placeholder` overrides the default placeholder text of the `bb-datepicker` input
  - `required` Attribute present if the `bb-datepicker` value is required.
  - `show-button-bar` *(Default: false):*  Whether to display a button bar underneath the date picker. (see angular ui bootstrap date picker)

## Validation
`bb-datepicker` sets validation on the date picker input using `bb-datepicker-name` for the input name, and the validity of the date entered in the input is in the `dateFormat` validator. So if you want to see if the date value is valid, you can access this through `$scope.myFormName.inputName.$error.dateFormat`. The error message for an invalid date will be in `$scope.myFormName.inputName.invalidFormatMessage`.

*/
(function ($) {
    'use strict';
    angular.module('sky.datepicker', ['sky.resources', 'sky.moment'])
        .constant('bbDatepickerConfig', {
            currentCultureDateFormatString: 'MM/dd/yyyy',
            showWeeks: false,
            startingDay: 0,
            minDate: '',
            maxDate: ''
        })
        .directive('bbDatepicker', ['bbResources', 'bbDatepickerConfig', 'bbDatepickerParser', '$timeout', '$q', function (bbResources, bbDatepickerConfig, bbDatepickerParser, $timeout, $q) {
            return {
                replace: true,
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    date: '=ngModel',
                    dateOptions: '=?bbDateOptions',
                    customValidation: '=?bbCustomValidation',
                    format: '=?bbDateFormat',
                    maxDate: '=?maxDate',
                    minDate: '=?minDate',
                    placeholderText: '=?placeholder'
                },
                templateUrl: 'sky/templates/datepicker/datepicker.html',
                controller: ['$scope', function ($scope) {
                    var self = this;


                    $scope.getInputNgModel = function () {
                        if (angular.isFunction(self.getInputNgModel)) {
                            return self.getInputNgModel();
                        } else {
                            return null;
                        }
                    };
                }],
                link: function ($scope, el, attr, ngModel) {
                    var parsedDate,
                        inputEl,
                        skipValidation = false,
                        dateChangeInternal = false;

                    function getBodyDatepicker() {
                        return $('body > ul[datepicker-popup-wrap]');
                    }

                    function positionAbsoluteDatepicker() {
                        var calendarButtonEl = el.find('span.bb-datepicker-button-container'),
                            inputEl = el.find('input'),
                            datepickerScope = el.find('input').isolateScope(),
                            datepickerEl = getBodyDatepicker(),
                            inputWidth,
                            buttonWidth,
                            datepickerWidth;

                        inputWidth = inputEl.innerWidth();
                        buttonWidth = calendarButtonEl.innerWidth();
                        datepickerWidth = datepickerEl.innerWidth();

                        if (datepickerWidth < (inputWidth + buttonWidth)) {
                            datepickerScope.position.left = datepickerScope.position.left + inputWidth + buttonWidth - datepickerWidth;
                        }
                    }

                    function open($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        //add syle class when datepicker appended to body because necessary bb-datefield class will no longer be wrapping it.
                        if ($scope.locals.appendToBody) {
                            $timeout(function () {
                                getBodyDatepicker().addClass('bb-datefield');
                                positionAbsoluteDatepicker();
                            });
                        }

                        $scope.locals.opened = !$scope.locals.opened;
                    }

                    function setDate() {
                        var inputNgModel;
                        if (angular.isDate($scope.date)) {
                            $scope.locals.date = $scope.date;
                        } else if (!$scope.locals.hasCustomValidation) {
                            parsedDate = bbDatepickerParser.runParsers($scope.date, $scope.format);
                            if (angular.isDate(parsedDate)) {
                                $scope.date = parsedDate;
                                $scope.locals.date = parsedDate;
                            } else {
                                $scope.locals.date = $scope.date;
                                inputNgModel = $scope.getInputNgModel();
                                if (inputNgModel && !inputNgModel.$validators.date($scope.date)) {
                                    inputNgModel.invalidFormatMessage = bbResources.date_field_invalid_date_message;
                                    inputNgModel.$setValidity('dateFormat', false);
                                }
                            }
                        } else {
                            $scope.locals.date = $scope.date;
                        }
                    }

                    $scope.locals = {
                        showButtonBar: false,
                        appendToBody: false,
                        date: '',
                        opened: false,
                        open: open,
                        loaded: false,
                        closeOnSelection: true,
                        dateOptions: {
                            showWeeks: bbDatepickerConfig.showWeeks,
                            startingDay: bbDatepickerConfig.startingDay
                        },
                        hasCustomValidation: false,
                        inputName: attr.bbDatepickerName
                    };

                    if (!$scope.maxDate && bbDatepickerConfig.maxDate) {
                        $scope.maxDate = bbDatepickerConfig.maxDate;
                    }

                    if (!$scope.minDate && bbDatepickerConfig.minDate) {
                        $scope.minDate = bbDatepickerConfig.minDate;
                    }

                    $scope.resources = bbResources;

                    if (angular.isDefined(attr.showButtonBar)) {
                        $scope.locals.showButtonBar = attr.showButtonBar;
                    }

                    if (angular.isDefined(attr.closeOnDateSelection)) {
                        $scope.locals.closeOnSelection = attr.closeOnDateSelection;
                    }

                    if (angular.isDefined(attr.datepickerAppendToBody)) {
                        $scope.locals.appendToBody = (attr.datepickerAppendToBody === 'true');
                    }

                    if (angular.isUndefined($scope.format)) {
                        $scope.format = bbDatepickerConfig.currentCultureDateFormatString;
                    }

                    if (angular.isDefined($scope.dateOptions)) {
                        angular.extend($scope.locals.dateOptions, $scope.dateOptions);

                    }

                    if (angular.isDefined($scope.customValidation)) {
                        if (angular.isFunction($scope.customValidation.formatValue)) {
                            $scope.locals.hasCustomValidation = true;
                        }
                    }

                    $scope.locals.required = angular.isDefined(attr.required);


                    if ($scope.placeholderText === null || angular.isUndefined($scope.placeholderText)) {
                        $scope.placeholderText = $scope.format.toLowerCase();
                    }

                    setDate();

                    $scope.$watch('date', function (newValue, oldValue) {
                        if (newValue !== oldValue && !dateChangeInternal) {
                            setDate();
                        } else if (dateChangeInternal) {
                            dateChangeInternal = false;
                        }
                    });

                    $scope.$watch('locals.date', function () {

                        if ($scope.date !== $scope.locals.date) {
                            if (angular.isDate($scope.locals.date)) {
                                dateChangeInternal = true;
                                $scope.date = $scope.locals.date;
                            }
                        }

                    });

                    function hasRequiredError() {
                        var inputNgModel = $scope.getInputNgModel();

                        return inputNgModel && inputNgModel.$error && inputNgModel.$error.required;
                    }


                    function dateFormatValidator() {
                        var customFormattingResult,
                            deferred,
                            inputNgModel;

                        function resolveValidation() {
                            var inputNgModel = $scope.getInputNgModel();

                            if (inputNgModel !== null) {
                                deferred[inputNgModel.invalidFormatMessage ? 'reject' : 'resolve']();
                                inputNgModel.$setValidity('dateFormat', !inputNgModel.invalidFormatMessage || inputNgModel.invalidFormatMessage === '');
                            } else {
                                deferred.resolve();
                            }
                        }

                        function setInvalidFormatMessage(errorMessage) {
                            var inputNgModel = $scope.getInputNgModel();

                            if (inputNgModel !== null) {
                                inputNgModel.invalidFormatMessage = errorMessage;
                            }
                        }

                        function handleCustomFormattingValidation(result) {
                            result = result || {};

                            setInvalidFormatMessage(result.formattingErrorMessage);
                            resolveValidation();

                            if (result.formattedValue !== $scope.date) {
                                skipValidation = true;
                                dateChangeInternal = true;
                                $scope.date = result.formattedValue;
                                $scope.locals.date = result.formattedValue;
                            }

                        }

                        function datepickerIsPristine() {
                            var inputNgModel = $scope.getInputNgModel();

                            if (inputNgModel !== null) {
                                return inputNgModel.$pristine;
                            } else {
                                return true;
                            }
                        }

                        deferred = $q.defer();

                        if (skipValidation || angular.isDate($scope.locals.date) || $scope.locals.date === '' || ($scope.locals.required && hasRequiredError()) || datepickerIsPristine()) {
                            setInvalidFormatMessage(null);
                            resolveValidation();
                        } else if ($scope.locals.hasCustomValidation && angular.isString($scope.locals.date)) {
                            customFormattingResult = $scope.customValidation.formatValue($scope.locals.date);
                            if (customFormattingResult.then) {
                                customFormattingResult.then(handleCustomFormattingValidation);
                            } else {
                                handleCustomFormattingValidation(customFormattingResult);
                                return deferred.promise;
                            }
                        } else {
                            inputNgModel = $scope.getInputNgModel();

                            if (inputNgModel !== null && inputNgModel.$error && inputNgModel.$error.date) {
                                setInvalidFormatMessage(bbResources.date_field_invalid_date_message);
                            }
                            resolveValidation();
                        }

                        skipValidation = false;
                        return deferred.promise;
                    }

                    ngModel.$asyncValidators.dateFormat = dateFormatValidator;

                    $scope.locals.loaded = true;

                    //Timeout allows the locals.loaded to be applied to dom and ng-if=true to go into effect.
                    $timeout(function () {
                        inputEl = el.find('input');
                        inputEl.on('change blur', function () {
                            $timeout(function () {
                                var inputNgModel;

                                //allows validation to kick off for invalid dates
                                if (angular.isUndefined($scope.locals.date) && angular.isDefined(inputEl.val()) && inputEl.val() !== '') {
                                    dateChangeInternal = true;
                                    $scope.date = inputEl.val();


                                } else if ($scope.locals.required && hasRequiredError()) {
                                    dateChangeInternal = true;
                                    $scope.date = '';
                                    inputNgModel = $scope.getInputNgModel();
                                    inputNgModel.invalidFormatMessage = null;
                                    inputNgModel.$setValidity('dateFormat', true);
                                } else if ($scope.date !== $scope.locals.date) {

                                    dateChangeInternal = true;
                                    $scope.date = $scope.locals.date;

                                }

                            });
                        });
                    });

                }
            };
        }])
        .directive('bbDatepickerCustomValidate', ['$filter', 'bbDatepickerParser', function ($filter, bbDatepickerParser) {
            return {
                restrict: 'A',
                require: ['ngModel', '^bbDatepicker'],
                link: function ($scope, el, attr, controllers) {
                    var ngModel = controllers[0],
                        format = attr.datepickerPopup;

                    if (attr.bbDatepickerCustomValidate && attr.bbDatepickerCustomValidate === 'true') {
                        ngModel.$parsers = [];
                        ngModel.$validators.date = function () {
                            return true;
                        };
                    } else {
                        ngModel.$parsers.unshift(function (viewValue) {
                            var newDate = ngModel.$viewValue,
                                date = null;
                            //date was changed from datepicker or is empty so just return
                            if (typeof newDate === 'object' || newDate === '') {
                                return newDate;
                            }

                            date = bbDatepickerParser.runParsers(newDate, format);

                            if (angular.isDate(date)) {
                                el.val($filter('date')(date, format));
                            }

                            return date ? date : viewValue;
                        });
                    }

                    controllers[1].getInputNgModel = function () {
                        return ngModel;
                    };
                }
            };
        }])
    .directive('bbMinDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.minDate = function (modelValue) {
                    return !$scope.minDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.minDate) || modelValue >= $scope.minDate;
                };
            }
        };
    })
    .directive('bbMaxDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.maxDate = function (modelValue) {
                    return !$scope.maxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.maxDate) || modelValue <= $scope.maxDate;
                };
            }
        };
    })
    .factory('bbDatepickerParser', ['bbMoment', function (bbMoment) {

        function parseUTCString(value) {
            var date = null,
                dateArray,
                datePart;

            if (angular.isString(value) && value.indexOf('T00:00:00') !== -1) {
                datePart = value.split('T')[0];

                dateArray = datePart.split('-');
                date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            }
            return date;
        }

        function parseNoSeparatorDateString(value, format) {
            var date = null,
                yearBegin = format.indexOf('y'),
                monthBegin = format.indexOf('M'),
                dayBegin = format.indexOf('d'),
                yearIndex,
                monthIndex,
                dayIndex;
            if (angular.isString(value) && value.length === 8 && !isNaN(value)) {
                if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                    yearIndex = 4;
                    if (monthBegin < dayBegin) {
                        dayIndex = 2;
                        monthIndex = 0;
                    } else {
                        dayIndex = 0;
                        monthIndex = 2;
                    }
                } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                    yearIndex = 0;
                    monthIndex = 4;
                    dayIndex = 6;
                } else {
                    return null;
                }

                date = new Date(value.substr(yearIndex, 4), (value.substr(monthIndex, 2) - 1), value.substr(dayIndex, 2));
            }
            return date;
        }

        function matchSeparator(value) {
            return value.match(/[.\/\-\s].*?/);
        }

        function dateHasSeparator(value) {
            /*
            * Validation criteria:
            * A separator exists
            * There is no separator at the beginning
            * There is no separator at the end
            * Two separators exist
            * All parts of the date have a non-zero value
            */

            var separator = matchSeparator(value),
                valueArray = value.split(separator),
                separatorAtEnd = value.indexOf(separator, value.length - 1) !== -1,
                separatorAtBeginning = value.indexOf(separator) === 0,
                hasTwoSeparators = valueArray.length - 1 === 2,
                anyPartIsZero = valueArray.some(function (e) {
                    return Number(e) === 0;
                });

            return (separator && !separatorAtEnd && !separatorAtBeginning && hasTwoSeparators && !anyPartIsZero);
        }

        function isMomentParsable(value, format) {
            var yearParts,
                yearIndex,
                monthIndex,
                dayIndex,
                separator;

            if (angular.isString(value) && dateHasSeparator(value)) {

                if (value.length === 10) {
                    return true;
                } else if (value.length === 9 || value.length === 8) {
                    //insure that years have 4 characters
                    separator = matchSeparator(value);
                    yearParts = value.split(separator);
                    yearIndex = format.indexOf('y');
                    monthIndex = format.indexOf('M');
                    dayIndex = format.indexOf('d');
                    if (yearIndex > monthIndex && yearIndex > dayIndex) {
                        return yearParts[2].length === 4;
                    }

                    if (yearIndex < monthIndex && yearIndex < dayIndex) {
                        return yearParts[0].length === 4;
                    }

                }

            }

            return false;
        }



        function parseMoment(value, format) {
            var date = null,
                momentDate;

            if (isMomentParsable(value, format)) {
                momentDate = bbMoment(value, format.toUpperCase());
                if (momentDate.isValid()) {
                    date = momentDate.toDate();
                }
            }

            return date;
        }

        return {
            parseUTCString: parseUTCString,
            parseNoSeparatorDateString: parseNoSeparatorDateString,
            parseMoment: parseMoment,
            runParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseMoment(value, format);

                return date;

            }
        };
    }]);


}(jQuery));

/*jshint browser: true */
/*global angular */

/** @module Date Range Picker
@icon calendar
@summary The date range picker creates an input text box that includes a dropdown for selecting date ranges from a well-known set of options.
 @description The date range picker directive allows you to easily choose a date range from a well-known set of options. A date range picker service also exists to work hand-in-hand with the directive to provide more service-oriented functionality.

### Date Range Picker Settings ###

 - `bb-date-range-picker-value` An object tracking the value of the date range picker control.  Right now, the only proeprty of the object is `.dateRangeType` gives you the integer (ENUM) value of the date range typ that was selected in the picker. See the date range picker service for details of this ENUM.
 - `bb-date-range-picker-automation-id` A string to use when creating the bb-auto-field attribute on elements in the date range picker
 - `bb-date-range-picker-options` Optional. An options object that can be provided to customize the behavior of the date range picker.

### Date Range Picker Options Settings ###

 - `availableDateRangeTypes` Optional. An array of integers (`dateRangeTypes` ENUM) to specify the ordered list of date range types to be included in the dropdown.  Common variations can be found in the date range picker service.

### Date Range Picker Service ###
This service provides additional functionality that works closely with the directive.  Below are a list of members provided by the service.

 - `dateRangeTypes` An ENUM of all types of date ranges that are understood by the date range picker and can be available in the dropdown.
 - `defaultDateRangeOptions` An array of `dateRangeTypes` providing the default order and set of date range types that are included in the dropdown.
 - `pastDateRangeOptions` An array of `dateRangeTypes` that are appropriate for filtering for things that have occurred in the past.  For example, you wouldn't want to be able to search for items created 'next month'.
 - `getDateRangeTypeCaption` A function for getting the caption of the dropdown item selected for a given `bb-date-range-picker-value`.
 - `getDateRangeFilterDescription` A function for getting an appropriate description string explaining the meaning of a given `bb-date-range-picker-value`.
 */

(function () {
    'use strict';
    angular.module('sky.daterangepicker', ['sky.resources'])
        .factory('bbDateRangePicker', ['bbResources', function (bbResources) {

            var dateRangeTypes,
                defaultDateRangeOptions,
                pastDateRangeOptions;

            dateRangeTypes = {
                AT_ANY_TIME: 0,
                NEXT_WEEK: 1,
                THIS_MONTH: 2,
                NEXT_MONTH: 3,
                THIS_QUARTER: 4,
                NEXT_QUARTER: 5,
                THIS_FISCAL_YEAR: 6,
                NEXT_FISCAL_YEAR: 7,
                THIS_CALENDAR_YEAR: 8,
                NEXT_CALENDAR_YEAR: 9,
                LAST_WEEK: 10,
                LAST_MONTH: 11,
                LAST_QUARTER: 12,
                LAST_FISCAL_YEAR: 13,
                LAST_CALENDAR_YEAR: 14,
                TODAY: 15,
                YESTERDAY: 16,
                TOMORROW: 17,
                THIS_WEEK: 18
            };

            defaultDateRangeOptions = [
                dateRangeTypes.AT_ANY_TIME,
                dateRangeTypes.YESTERDAY,
                dateRangeTypes.TODAY,
                dateRangeTypes.TOMORROW,
                dateRangeTypes.LAST_WEEK,
                dateRangeTypes.THIS_WEEK,
                dateRangeTypes.NEXT_WEEK,
                dateRangeTypes.LAST_MONTH,
                dateRangeTypes.THIS_MONTH,
                dateRangeTypes.NEXT_MONTH,
                dateRangeTypes.LAST_QUARTER,
                dateRangeTypes.THIS_QUARTER,
                dateRangeTypes.NEXT_QUARTER,
                dateRangeTypes.LAST_CALENDAR_YEAR,
                dateRangeTypes.THIS_CALENDAR_YEAR,
                dateRangeTypes.NEXT_CALENDAR_YEAR,
                dateRangeTypes.LAST_FISCAL_YEAR,
                dateRangeTypes.THIS_FISCAL_YEAR,
                dateRangeTypes.NEXT_FISCAL_YEAR
            ];

            pastDateRangeOptions = [
                dateRangeTypes.AT_ANY_TIME,
                dateRangeTypes.YESTERDAY,
                dateRangeTypes.TODAY,
                dateRangeTypes.LAST_WEEK,
                dateRangeTypes.THIS_WEEK,
                dateRangeTypes.LAST_MONTH,
                dateRangeTypes.THIS_MONTH,
                dateRangeTypes.LAST_QUARTER,
                dateRangeTypes.THIS_QUARTER,
                dateRangeTypes.LAST_CALENDAR_YEAR,
                dateRangeTypes.THIS_CALENDAR_YEAR,
                dateRangeTypes.LAST_FISCAL_YEAR,
                dateRangeTypes.THIS_FISCAL_YEAR
            ];

            function getDateRangeTypeCaption(dateRangePickerValue) {
                if (angular.isNumber(dateRangePickerValue)) {
                    // If the input is the enum value itself, then map it to the object structure we expect before proceeding.
                    dateRangePickerValue = { dateRangeType: dateRangePickerValue };
                } else {
                    // If the value is undefiend, then map it to a null object.
                    dateRangePickerValue = dateRangePickerValue || {};
                }

                if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                    // If the enum value is undefined, then it represents any time.
                    dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
                }

                switch (dateRangePickerValue.dateRangeType) {
                case dateRangeTypes.AT_ANY_TIME:
                    return bbResources.date_range_picker_at_any_time;

                case dateRangeTypes.THIS_WEEK:
                    return bbResources.date_range_picker_this_week;

                case dateRangeTypes.NEXT_WEEK:
                    return bbResources.date_range_picker_next_week;

                case dateRangeTypes.THIS_MONTH:
                    return bbResources.date_range_picker_this_month;

                case dateRangeTypes.NEXT_MONTH:
                    return bbResources.date_range_picker_next_month;

                case dateRangeTypes.THIS_QUARTER:
                    return bbResources.date_range_picker_this_quarter;

                case dateRangeTypes.NEXT_QUARTER:
                    return bbResources.date_range_picker_next_quarter;

                case dateRangeTypes.THIS_FISCAL_YEAR:
                    return bbResources.date_range_picker_this_fiscal_year;

                case dateRangeTypes.NEXT_FISCAL_YEAR:
                    return bbResources.date_range_picker_next_fiscal_year;

                case dateRangeTypes.THIS_CALENDAR_YEAR:
                    return bbResources.date_range_picker_this_calendar_year;

                case dateRangeTypes.NEXT_CALENDAR_YEAR:
                    return bbResources.date_range_picker_next_calendar_year;

                case dateRangeTypes.LAST_WEEK:
                    return bbResources.date_range_picker_last_week;

                case dateRangeTypes.LAST_MONTH:
                    return bbResources.date_range_picker_last_month;

                case dateRangeTypes.LAST_QUARTER:
                    return bbResources.date_range_picker_last_quarter;

                case dateRangeTypes.LAST_FISCAL_YEAR:
                    return bbResources.date_range_picker_last_fiscal_year;

                case dateRangeTypes.LAST_CALENDAR_YEAR:
                    return bbResources.date_range_picker_last_calendar_year;

                case dateRangeTypes.TODAY:
                    return bbResources.date_range_picker_today;

                case dateRangeTypes.YESTERDAY:
                    return bbResources.date_range_picker_yesterday;

                case dateRangeTypes.TOMORROW:
                    return bbResources.date_range_picker_tomorrow;

                }
            }

            function getDateRangeFilterDescription(dateRangePickerValue) {
                // If the value is undefiend, then map it to a null object.
                dateRangePickerValue = dateRangePickerValue || {};

                if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                    // If the enum value is undefined, then it represents any time.
                    dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
                }

                switch (dateRangePickerValue.dateRangeType) {
                case dateRangeTypes.AT_ANY_TIME:
                    return bbResources.date_range_picker_filter_description_at_any_time;

                case dateRangeTypes.THIS_WEEK:
                    return bbResources.date_range_picker_filter_description_this_week;

                case dateRangeTypes.NEXT_WEEK:
                    return bbResources.date_range_picker_filter_description_next_week;

                case dateRangeTypes.THIS_MONTH:
                    return bbResources.date_range_picker_filter_description_this_month;

                case dateRangeTypes.NEXT_MONTH:
                    return bbResources.date_range_picker_filter_description_next_month;

                case dateRangeTypes.THIS_QUARTER:
                    return bbResources.date_range_picker_filter_description_this_quarter;

                case dateRangeTypes.NEXT_QUARTER:
                    return bbResources.date_range_picker_filter_description_next_quarter;

                case dateRangeTypes.THIS_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_this_fiscal_year;

                case dateRangeTypes.NEXT_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_next_fiscal_year;

                case dateRangeTypes.THIS_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_this_calendar_year;

                case dateRangeTypes.NEXT_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_next_calendar_year;

                case dateRangeTypes.LAST_WEEK:
                    return bbResources.date_range_picker_filter_description_last_week;

                case dateRangeTypes.LAST_MONTH:
                    return bbResources.date_range_picker_filter_description_last_month;

                case dateRangeTypes.LAST_QUARTER:
                    return bbResources.date_range_picker_filter_description_last_quarter;

                case dateRangeTypes.LAST_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_last_fiscal_year;

                case dateRangeTypes.LAST_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_last_calendar_year;

                case dateRangeTypes.TODAY:
                    return bbResources.date_range_picker_filter_description_today;

                case dateRangeTypes.YESTERDAY:
                    return bbResources.date_range_picker_filter_description_yesterday;

                case dateRangeTypes.TOMORROW:
                    return bbResources.date_range_picker_filter_description_tomorrow;

                }
            }

            return {
                dateRangeTypes: dateRangeTypes,
                defaultDateRangeOptions: defaultDateRangeOptions,
                pastDateRangeOptions: pastDateRangeOptions,
                getDateRangeTypeCaption: getDateRangeTypeCaption,
                getDateRangeFilterDescription: getDateRangeFilterDescription
            };

        }])
        .directive('bbDateRangePicker', ['bbDateRangePicker', function (bbDateRangePicker) {
            /// <summary>
            /// This directive provides a date range filter control
            /// </summary>

            return {
                replace: true,
                restrict: 'E',
                templateUrl: 'sky/templates/daterangepicker/daterangepicker.html',
                scope: {
                    bbDateRangePickerValue: "=",
                    bbDateRangePickerAutomationId: "=",
                    bbDateRangePickerOptions: '='
                },
                controller: ['$scope', function ($scope) {

                    $scope.locals = {
                        bbDateRangePicker: bbDateRangePicker
                    };

                    $scope.$watch("bbDateRangePickerValue", function (newVal) {
                        if (!newVal) {
                            $scope.bbDateRangePickerValue = {
                                dateRangeType: bbDateRangePicker.dateRangeTypes.AT_ANY_TIME
                            };
                            return;
                        }
                        newVal.dateRangeType = newVal.dateRangeType || bbDateRangePicker.dateRangeTypes.AT_ANY_TIME;
                    }, true);
                }]
            };
        }]);

}());

/*jshint browser: true */
/*global angular */

/** @module File Attachments
@icon cloud-upload
@summary The file attachments module provides the ability to add multiple files to a form and to display information about files after they are added.
@description The file attachments module contains two directives to make it easier to add multiple files to a form.
The `bb-file-drop` directive provides an element that can both be clicked to select a file from the user's
local drive or serve as a drop zone where files can be dragged from the user's local drive.  The directive can
also optionally display controls for the user to add a hyperlink to a file on the web.

The contents of the directive may be left blank to display the default UI for the drop zone, or you may include your
own custom content to be displayed instead of the default UI.

Also note that upon the initialization of the Sky module, dragging and dropping files will be disabled for the entire window so that
accidentally dropping a file outside the target zone doesn't result in the file being opened in the browser window.  If you are
implementing your own file drop functionality outside of the file drop directive, you can place the `bb-file-drop-target` CSS
class on the element you wish to receive drop events and that element will be exempt from the drop exclusion rule.

### File Drop Settings ###

- `bb-file-drop-accept` *(Optional)* A comma-delimited string literal of MIME types that may be dropped or selected (e.g. `bb-file-drop-accept="fileAttachmentDemo.validFileTypes"` or `bb-file-drop-accept="'image/png'"`) or a custom validation function (e.g. `bb-file-drop-accept="fileAttachmentDemo.validate($file)"`).
- `bb-file-drop-multiple` *(Default: `true`)* A flag indicating whether multiple files may be dropped at once.
- `bb-file-drop-allow-dir` *(Default: `true`)* A flag indicating whether a directory can be selected.
- `bb-file-drop-min-size` *(Optional)* The minimum size in bytes of a valid file.
- `bb-file-drop-max-size` *(Optional)* The maximum size in bytes of a valid file.
- `bb-file-drop-change` A function that is called when a file or files are selected when the user drops files onto the
drop zone or selects them by clicking the element.  This function accepts 2 parameters:
 - `files` An array of valid files that were dropped or selected.  Each item is a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
 object.
 - `rejectedFiles` An array of files that did not meet the specified file type and/or size requirements.
- `bb-file-drop-link` *(Optional)* The attribute with no value can be specified)* Indicates that an option to add hyperlinks
should be displayed.
- `bb-file-drop-link-change` *(Optional)* A function that is called when the user adds a hyperlink.  The function accepts one
`link` parameter.  The `link` will have a `url` property containing the link the user added.
- `bb-file-drop-noclick` Specify this attribute when you want to disable the ability to select a file from a file dialog by clicking the element.

The `bb-file-item` directive displays summary information about a file that has been added to a form.  By default
it displays the file's name and a delete button, and if the file from the user's local drive rather than a hyperlink,
a the file's size and thumbnail will also be displayed.  Any content inside this directive will be displayed to the right
of the preview image.

### File Item Settings ###

- `bb-file-item` The file or hyperlink to display.  If the item is a file, the file size and a preview will be displayed.
- `bb-file-item-delete` A function to call when an item's delete button is clicked.  The deleted item will be passed
to the function.
 */
(function () {
    'use strict';

    angular.module(
        'sky.fileattachments',
        [
            'sky.fileattachments.filedrop',
            'sky.fileattachments.fileitem',
            'sky.fileattachments.filesize'
        ]
    );
}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    function run($window) {
        $($window).on('dragover drop', function (e) {
            if (!$(e.target).hasClass('bb-file-drop-target')) {
                e.preventDefault();
            }
        });
    }

    run.$inject = ['$window'];

    function bbFileDrop($parse, $templateCache) {
        return {
            link: function (scope, el, attrs) {
                scope.bbFileDrop = {
                    hasTranscludeContents: $.trim(el.find('.bb-file-drop-contents-custom').html()).length > 0,
                    allowLinks: angular.isDefined(attrs.bbFileDropLink),
                    addLink: function () {
                        scope.bbFileDropLinkChange({
                            link: {
                                url: scope.bbFileDrop.url
                            }
                        });

                        scope.bbFileDrop.url = null;
                    },
                    fileChange: function ($files, $event, $rejectedFiles) {
                        scope.bbFileDropChange({
                            files: $files,
                            rejectedFiles: $rejectedFiles
                        });
                    }
                };
            },
            scope: {
                bbFileDropChange: '&',
                bbFileDropLinkChange: '&'
            },
            template: function (el, attrs) {
                var dropEl;

                el.html($templateCache.get('sky/templates/fileattachments/filedrop.html'));

                dropEl = el.find('.bb-file-drop');

                dropEl.attr({
                    'ngf-allow-dir': attrs.bbFileDropAllowDir,
                    'ngf-accept': attrs.bbFileDropAccept,
                    'ngf-multiple': attrs.bbFileDropMultiple || 'true',
                    'ngf-min-size': attrs.bbFileDropMinSize || '0',
                    'ngf-max-size': attrs.bbFileDropMaxSize || '500000'
                });

                if (angular.isDefined(attrs.bbFileDropNoclick)) {
                    dropEl.addClass('bb-file-drop-noclick');
                } else {
                    dropEl.attr('ngf-select', '');
                }
            },
            transclude: true
        };
    }

    bbFileDrop.$inject = ['$parse', '$templateCache'];

    angular.module('sky.fileattachments.filedrop', ['ngFileUpload', 'sky.resources'])
        .run(run)
        .directive('bbFileDrop', bbFileDrop);
}(jQuery));

/*global angular */

(function () {
    'use strict';

    function bbFileItem() {
        return {
            link: function (scope) {
                function getFileTypeUpper() {
                    var fileType = '';

                    if (scope.item) {
                        fileType = scope.item.type || '';
                    }

                    return fileType.toUpperCase();
                }

                function getFileExtensionUpper() {
                    var extension = '',
                        name;

                    if (scope.item) {
                        name = scope.item.name || '';

                        extension = name.substr(name.lastIndexOf('.')) || '';
                    }

                    return extension.toUpperCase();
                }

                scope.bbFileItem = {
                    isFile: function () {
                        var item = scope.item;

                        return item && angular.isDefined(item.size);
                    },
                    isImg: function () {
                        var fileTypeUpper = getFileTypeUpper(),
                            slashIndex;

                        slashIndex = fileTypeUpper.indexOf('/');

                        if (slashIndex >= 0) {
                            switch (fileTypeUpper.substr(fileTypeUpper.indexOf('/') + 1)) {
                            case 'BMP':
                            case 'GIF':
                            case 'JPEG':
                            case 'PNG':
                                return true;
                            }
                        }

                        return false;
                    }
                };

                scope.$watch('item.type', function () {
                    var cls,
                        extensionUpper = getFileExtensionUpper(),
                        fileTypeUpper;

                    switch (extensionUpper) {
                        case '.PDF':
                            cls = 'pdf';
                            break;
                        case '.GZ':
                        case '.RAR':
                        case '.TGZ':
                        case '.ZIP':
                            cls = 'archive';
                            break;
                        case '.PPT':
                        case '.PPTX':
                            cls = 'powerpoint';
                            break;
                        case '.DOC':
                        case '.DOCX':
                            cls = 'word';
                            break;
                        case '.XLS':
                        case '.XLSX':
                            cls  = 'excel';
                            break;
                        case '.TXT':
                            cls = 'text';
                            break;
                        case '.HTM':
                        case '.HTML':
                            cls = 'code';
                            break;
                    }

                    if (!cls) {
                        fileTypeUpper = getFileTypeUpper();

                        switch (fileTypeUpper.substr(0, fileTypeUpper.indexOf('/'))) {
                            case 'AUDIO':
                                cls = 'audio';
                                break;
                            case 'IMAGE':
                                // Normally images are displayed as thumbnails, but if an image type is not recognized
                                // as being widely supported by modern browsers (e.g. TIFF files) then an icon should
                                // be displayed instead.
                                cls = 'image';
                                break;
                            case 'TEXT':
                                cls = 'text';
                                break;
                            case 'VIDEO':
                                cls = 'video';
                                break;
                        }
                    }

                    scope.bbFileItem.otherCls = 'fa-file-' + (cls ? cls + '-' : '') + 'o';
                });
            },
            scope: {
                item: '=bbFileItem',
                itemDelete: '&bbFileItemDelete'
            },
            templateUrl: 'sky/templates/fileattachments/fileitem.html',
            transclude: true
        };
    }

    angular.module('sky.fileattachments.fileitem', ['ngFileUpload', 'sky.fileattachments.filesize', 'sky.resources'])
        .directive('bbFileItem', bbFileItem);
}());

/*global angular */

(function () {
    'use strict';
    
    function bbFileSize($filter, bbFormat, bbResources) {
        return function (input) {
            var decimalPlaces = 0,
                dividend = 1,
                formattedSize,
                roundedSize,
                template;
            
            if (input === null || angular.isUndefined(input)) {
                return '';
            }
            
            if (Math.abs(input) === 1) {
                template = bbResources.file_size_b_singular;
            } else if (input < 1000) {
                template = bbResources.file_size_b_plural;
            } else if (input < 1e6) {
                template = bbResources.file_size_kb;
                dividend = 1000;
            } else if (input < 1e9) {
                template = bbResources.file_size_mb;
                dividend = 1e6;
                decimalPlaces = 1;
            } else {
                template = bbResources.file_size_gb;
                dividend = 1e9;
                decimalPlaces = 1;
            }

            roundedSize = Math.floor(input / (dividend / Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);

            formattedSize = $filter('number')(roundedSize);

            return bbFormat.formatText(template, formattedSize);
        };
    }
    
    bbFileSize.$inject = ['$filter', 'bbFormat', 'bbResources'];
    
    angular.module('sky.fileattachments.filesize', ['sky.format', 'sky.resources'])
        .filter('bbFileSize', bbFileSize);
}());
/*global angular */

/** @module Format
@icon paragraph
@summary The format service provides functions to format text with a format string and to escape HTML characters.
@description The format service gives you the following functions:

  - `formatText(formatString, args)` Formats the args with a given format string.
  - `escape(text)` Replaces the `<`, `>`, and `&` tags with `&lt;`, `&gt;`, and `&amp;`.

*/

(function () {
    'use strict';
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    function replaceTag(tag) {
        return tagsToReplace[tag];
    }

    function isEmpty(str) {
        return str === null || angular.isUndefined(str);
    }

    angular.module('sky.format', [])
        .factory('bbFormat', function () {
            return {
                formatText: function (format) {
                    var args;

                    if (isEmpty(format)) {
                        return '';
                    }

                    args = arguments;

                    return String(format).replace(/\{(\d+)\}/g, function (match, capture) {
                        /*jslint unparam: true */
                        return args[parseInt(capture, 10) + 1];
                    });
                },
                escape: function (str) {
                    if (isEmpty(str)) {
                        return '';
                    }

                    return String(str).replace(/[&<>]/g, replaceTag);
                }
            };
        });
}());

/*jslint browser: false, plusplus: true */
/*global angular */

(function () {
    'use strict';

    function buildCategoryList(columns) {
        var categories = [],
            column,
            index,
            len;

        len = columns.length;

        for (index = 0; index < len; index++) {
            column = columns[index];

            if (column.category) {
                if (categories.indexOf(column.category) === -1) {
                    categories.push(column.category);
                }
            }
        }

        return categories;
    }


    function columnCompare(a, b) {
        a = a.title.toLocaleLowerCase();
        b = b.title.toLocaleLowerCase();

        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    }
    
    function getInitialSelectedColumns(columns, selectedIds) {
        var selectedColumns = [];
        
        angular.forEach(columns, function (column) {
            if (selectedIds.indexOf(column.id) >= 0) {
                selectedColumns.push(column);
            }
        });
        
        return selectedColumns;
    }

    function BBGridColumnPickerController($scope, availableColumns, initialSelectedColumnIds, columnPickerHelpKey, listMode) {
        var columns = [],
            initialSelectedColumns;

        angular.forEach(availableColumns, function (column) {
            columns.push({
                id: column.id,
                name: column.name,
                title: column.caption,
                category: column.category,
                description: column.description
            });
        });
        
        initialSelectedColumns = getInitialSelectedColumns(columns, initialSelectedColumnIds);

        columns.sort(columnCompare);

        $scope.columns = columns;
        $scope.categories = buildCategoryList(columns);
        $scope.locals = {};
        $scope.locals.selectedColumns = initialSelectedColumns.slice(0);
        $scope.columnPickerHelpKey = columnPickerHelpKey;
        $scope.listMode = listMode;
        
        $scope.applyChanges = function () {
            var column,
                scopeColumns = $scope.columns,
                selectedColumns = $scope.locals.selectedColumns,
                columnIds = [],
                i;
            
            //Loop through previously selected columns.  If they are still selected, add
            //them to the resulting list in their original order.
            angular.forEach(initialSelectedColumnIds, function (columnId) {
                for (i = 0; i < scopeColumns.length; i++) {
                    column = scopeColumns[i];

                    if (column.id === columnId) {
                        if (selectedColumns.indexOf(column) >= 0) {
                            columnIds.push(column.id);
                        }
                        break;
                    }
                }
            });

            //Loop through all columns.  If they are selected and not already in the list
            //then add them to the end.
            angular.forEach(selectedColumns, function (column) {
                var id = column.id;
                
                if (columnIds.indexOf(id) < 0) {
                    columnIds.push(id);
                }
            });

            $scope.$close(columnIds);
        };
    }
    
    BBGridColumnPickerController.$inject = ['$scope', 'columns', 'selectedColumnIds', 'columnPickerHelpKey', 'listMode'];

    angular.module('sky.grids.columnpicker', ['sky.checklist', 'sky.resources'])
        .controller('BBGridColumnPickerController', BBGridColumnPickerController);
}());
/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.grids.actionbar', ['sky.mediabreakpoints', 'sky.resources'])
    .directive('bbGridActionBar', ['bbMediaBreakpoints', 'bbResources', '$timeout', function (bbMediaBreakpoints, bbResources, $timeout) {
        return {
                require: '^bbGrid',
                replace: true,
                transclude: true,
                restrict: 'E',
                scope: {
                    bbMultiselectActions: '=',
                    bbSelectionsUpdated: '&'
                },
                controller: ['$scope', function ($scope) {
                    $scope.locals = {
                        actions: $scope.bbMultiselectActions,
                        showActionBar: false,
                        mobileButtons: false,
                        showMobileActions: false
                    };

                    $scope.resources = bbResources;
                }],
                link: function ($scope, element, attrs, bbGrid) {
                    /*jslint unparam: true */
                    var visibleSelected = [];
                    
                    function updateActionBar(data, selected) {
                        var action,
                            i,
                            showActionBar;
                        
                        //this notation is necessary because the argument is passed through grid and then to the controller
                        //in which grid resides.
                        visibleSelected = bbGrid.getVisibleSelections(data, selected);
                        
                        $scope.bbSelectionsUpdated({ selections: { selections: visibleSelected } });

                        showActionBar = false;
                        if ($scope.locals.actions) {
                            //only show the action bar if an action has an available selection
                            for (i = 0; i < $scope.locals.actions.length; i++) {
                                action = $scope.locals.actions[i];
                                if (action.selections.length > 0) {
                                    showActionBar = true;
                                }
                            }
                        }
                        
                        $scope.locals.showActionBar = showActionBar;

                        if (showActionBar) {
                            $timeout(function () {
                                bbGrid.syncActionBarViewKeeper();
                            });
                        }
                    }
                    
                    
                    bbGrid.scope.$watchCollection('selectedRows', function (newValue) {
                        updateActionBar(bbGrid.scope.options.data, newValue);
                    });

                    bbGrid.scope.$watchCollection('options.data', function (newValue) {
                        updateActionBar(newValue, bbGrid.scope.selectedRows);
                    });
                    
                    //on mobile do an ng-if that changes the stuff.
                    function mediaBreakpointHandler(newBreakpoints) {
                        $scope.locals.mobileButtons = newBreakpoints.xs;
                    }

                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    element.on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    });

                    $scope.locals.clearSelection = function () {
                        
                        //If the visible selections are the same as the selected rows we can just reset all multiselected rows
                        if (visibleSelected.length === bbGrid.scope.selectedRows.length) {
                            bbGrid.resetMultiselect();
                        } else {
                            bbGrid.toggleMultiselectRows(visibleSelected);
                        }
                        
                    };

                    $scope.locals.chooseAction = function () {
                        $scope.locals.showMobileActions = true;
                    };

                    $scope.locals.cancelChooseAction = function () {
                        $scope.locals.showMobileActions = false;
                    };
                },
                templateUrl: 'sky/templates/grids/actionbar.html'
            };
    }]);
}());
/*global angular */

(function () {
    'use strict';
    angular.module('sky.grids.filters', ['sky.help', 'sky.resources', 'sky.mediabreakpoints'])
    .directive('bbGridFilters', ['bbHelp', 'bbResources', 'bbMediaBreakpoints', function (bbHelp, bbResources, bbMediaBreakpoints) {
        return {
            require: '^bbGrid',
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                bbOptions: "="
            },
            controller: ['$scope', function ($scope) {
                $scope.applyFilters = function () {
                    var args = {},
                        options = $scope.bbOptions;

                    if (options && options.applyFilters) {
                        options.applyFilters(args);
                        $scope.updateFilters(args.filters);

                        if (bbMediaBreakpoints.getCurrent().xs) {
                            $scope.locals.expanded = false;
                        }
                    }
                };
                $scope.clearFilters = function () {
                    var args = {},
                        options = $scope.bbOptions;

                    if (options && options.clearFilters) {
                        options.clearFilters(args);
                        $scope.updateFilters(args.filters);
                    }
                };
            }],
            link: function ($scope, element, attrs, bbGrid) {
                /*jslint unparam: true */
                var box = element.find('.bb-grid-filters-box'),
                    filtersContainer = element.find('.bb-grid-filters-container');

                $scope.locals = {
                    expanded: false
                };

                $scope.viewKeeperOptions = {};

                bbGrid.viewKeeperChangedHandler = function (val) {
                    $scope.viewKeeperOptions.viewKeeperOffsetElId = val;
                };

                bbGrid.toggleFilterMenu = function (isOpen) {
                    if (angular.isDefined(isOpen)) {
                        $scope.locals.expanded = isOpen;
                    } else {
                        $scope.locals.expanded = !$scope.locals.expanded;
                    }

                    if ($scope.locals.expanded) {
                        bbHelp.close();
                    }
                };

                bbGrid.openFilterMenu = function () {
                    $scope.locals.expanded = true;
                };

                bbGrid.scope.$watch('gridCreated', function (newValue) {
                    if (newValue) {
                        element.parents('.bb-grid-container').prepend(element);
                        element.show();

                        if ($scope.locals.expanded) {
                            animateFilters($scope.locals.expanded);
                        }
                    }
                });

                $scope.updateFilters = function (filters) {
                    bbGrid.setFilters(filters);
                };

                $scope.resources = bbResources;

                function animateFilters(isExpanded) {
                    var animationDuration = 250;
                    if (isExpanded) {
                        box.css('left', '240px');
                        filtersContainer.show();
                        box.animate({ 'left': '0' }, animationDuration);
                    } else {
                        box.animate({ 'left': '240px' }, {
                            duration: animationDuration,
                            complete: function () {
                                box.css('left', '0');
                                filtersContainer.hide();
                            }
                        });
                    }
                }

                $scope.$watch('locals.expanded', function (newValue, oldValue) {
                    if (newValue !== oldValue || newValue) {
                        animateFilters(newValue);
                    }
                });

            },
            templateUrl: 'sky/templates/grids/filters.html'
        };
    }])
    .directive('bbGridFiltersGroup', function () {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                bbGridFiltersGroupLabel: '=',
                isCollapsed: '=?bbGridFiltersGroupIsCollapsed'
            },
            templateUrl: 'sky/templates/grids/filtersgroup.html'
        };
    })
    .directive('bbGridFiltersSummary', ['bbResources', function (bbResources) {
        return {
            require: '^bbGrid',
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                bbOptions: "="
            },
            controller: ['$scope', function ($scope) {
                $scope.clearFilters = function () {
                    var args = {},
                        options = $scope.bbOptions;

                    if (options && options.clearFilters) {
                        options.clearFilters(args);
                        $scope.updateFilters(args.filters);
                    }
                };

                $scope.resources = bbResources;

            }],
            link: function ($scope, element, attrs, bbGrid) {
                /*jslint unparam: true */

                bbGrid.scope.$watch('gridCreated', function () {
                    var toolbarContainer = element.parents('.bb-grid-container').find('.bb-grid-toolbar-container .bb-grid-filter-summary-container');
                    toolbarContainer.append(element);
                });


                $scope.updateFilters = function (filters) {
                    bbGrid.setFilters(filters);
                };

                $scope.openFilterMenu = function () {
                    if (bbGrid.openFilterMenu) {
                        bbGrid.openFilterMenu();
                    }
                };
                $scope.$watch(function () {
                    return element.is(':visible');
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        bbGrid.syncViewKeepers();
                    }
                });
            },
            templateUrl: 'sky/templates/grids/filterssummary.html'
        };
    }]);

}());

/*jslint plusplus: true */
/*global angular, jQuery */

/** @module Grid
@icon table
@summary The grid builds a full-featured grid with a search box, column picker, and filter form.
 @description The grid directive allows you to build a full-featured grid with a search box, column picker, and filter form.

 ### Dependencies ###

- **[jqGrid](https://github.com/free-jqgrid/jqGrid) (4.7.0 or higher)**
- **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**
---

The grid directive allows you to build a full-featured grid with a search box, column picker and filter form.

### Grid Settings ###
- `bb-grid-filters` A directive you can use inside the bb-grid directive to create a filter flyout menu.
  - `bb-options` An options object for bb-grid-filters that contains the following:
      - `applyFilters` A function that is called when you click the apply filters button. You can pass updated filters to `bb-grid` by setting `args.filters`.
      - `clearFilters` A function that is called when you click the clear filters button. You can pass updated filters to `bb-grid` by setting `args.filters`.
  - `bb-grid-filters-group` A directive you can use inside of `bb-grid-filters` that creates labels (with the `bb-grid-filters-group-label` option) and collapsible areas.
- `bb-grid-filters-summary` A directive you can use inside the bb-grid directive to create a summary toolbar for your applied filters.
  - `bb-options` An options object for `bb-grid-filters-summary` that contains the following:
      - `clearFilters` A function that is called when you click the clear filters (x) icon. You can pass updated filters to `bb-grid` by setting `args.filters`.

- `bb-grid-options` An object with the following properties:
  - `columns` An array of available columns.  Each column can have these properties:
        - `allow_see_more` Allows the column to have a see more link to view overflow content.
        - `caption` The text to display in the column header and column chooser.
        - `category` A category for the column, can be used to filter in the column chooser.
        - `center_align` True if the column header and contents should be center aligned.
        - `controller` The controller function if the column is templated. This allows a cell to perform logic while displaying formatted or complex data. You can access row data from the grid in the column template controller using `$scope.rowData`.
        - `description` A description for the column, seen in the column chooser.
        - `exclude_from_search` If true, then the column does not highlight text on search.
        - `id` A unique identifier for the column.  The ID is referenced by the option object's `selectedColumnIds` property.
        - `jsonmap` The name of the property that maps to the column's data.
        - `name` The name of the column.
        - `right_align` True if the column header and contents should be right aligned.
        - `template_url` The url for the column template to show formatted or complex data in a cell. The properties of the cell data object can be accessed using the format `data.property_name`.
        - `width_all` The default width (in pixels) for a column if no breakpoint specific column is specified (`width_xs`, `width_sm`, `width_md`, `width_lg`). If no value is specified, columns will default to 150px, and if the columns do not take up the available room in the grid, the last column will be extended.
        - `width_xs` The width of the column for screen sizes less than 768px.
        - `width_sm` The width of the column for screen sizes from 768px to 991px.
        - `width_md` The width of the column for screen sizes from 992px to 1199px.
        - `width_lg` The width of the column for screen sizes greater than 1199px.
  - `data` An array of objects representing the rows in the grid.  Each row should have properties that correspond to the `columns` `jsonmap` properties.
  - `fixedToolbar` Prevents the toolbar and grid headers from scrolling with the window. Defaults to false.
  - `filtersAreActive` If true, the filter button highlights to indicate that filters are active.
  - `filtersOpen` If set to true, opens filters. If set to false, closes filters.
  - `getContextMenuItems` If a function is specified, then the grid rows will attempt to create a bootstrap dropdown based on the return value of the function. The return value should be an array of objects that represent the items in a dropdown. The objects should contain the following properties:
      - `id` A unique string identifier for the option.
      - `title` The title shown for the dropdown option.
      - `cmd` A function that will be called when the dropdown option is clicked. It should return false if you wish to close the dropdown after the function is called.
  - `hasInlineFilters` If true, toggles hide/show on the transcluded content in the `bb-grid` directive when the filter button is pressed.
  - `hasMoreRows` If set to true, then the `See more` button will appear below the grid when the grid does not use pagination.
  - `hideColPicker` If true, hides the grid column picker in the toolbar.
  - `hideFilters` If true, hides the filters button in the toolbar.
  - `multiselect` If true, adds a multiselect checkbox column to the listbuilder.
  - `onAddClick` If a function is specified, then an add button will appear in the grid toolbar that will call the `onAddClick` function when clicked.
  - `onAddClickLabel` Label for the add button.
  - `searchText` The text entered in the grid search box, set by bbGrid.
  - `selectedColumnIds` An array of unique identifiers indicating the visible columns in the order in which they should be displayed.
  - `sortOptions` Options around column sorting:
      - `excludedColumns` An array of column names that should be excluded.
      - `column` The name of the column that the data should be sorted by, set by bbGrid.
      - `descending` Set to true by bbGrid if the sort should be in descending order.
- `bb-grid-pagination` An object set when you intend to use pagination instead of infinite scrolling with your grid. It has the following properties:
  - `itemsPerPage` The number of rows you wish to show in the grid per page, defaults to 5.
  - `maxPages` The maximum number of pages to show in the pagination bar, defualts to 5.
  - `recordCount` The total number of records available through pagination.
- `bb-multiselect-actions` An array of actions that can be shown in the multiselect action bar. Each action can have the following:
  - `actionCallback` A function that will be called when the action is clicked.
  - `automationId` An identifier that will be placed in the `data-bbauto` attribute for automation purposes.
  - `isPrimary` If true, this action will have the primary button color.
  - `selections` The selected row objects from the list builder that are associated with this action, this can be updated through the `bb-selections-updated` function.
  - `title` The text that will appear on the button for the action.
- `bb-selected-rows` An object that has two way binding to the multiselected rows. It can be used to set the multiselected rows from the parent controller of the directive.
- `bb-selections-updated` A function which will be called when multiselect selections are updated. The selections are passed to the function as an argument and you can update your multiselect actions accordingly.

### Custom Grid Toolbar ###
If you need more content in the grid toolbar beyond the add button, search input, column chooser, and filter button, then you can add custom content between the add button and search input.

To do this, the `bb-grid-custom-toolbar` attribute must be added to the `bb-grid` directive. Then, place a `bb-grid-toolbar` directive with your custom controls inside of the `bb-grid` directive.

### Grid Events ###

  - `includedColumnsChanged` Fires when the user has changed the grid columns.  If you plan to handle reloading the grid after this change (e.g. you need
to reload data from the server as a result of the column change), set the event handler's `data` parameter's `willResetData` property to `true` to avoid
reloading the grid with the current data after the event has fired.
  - `loadMoreRows` Fires when a page changes (when using pagination) or when the 'See more' button is clicked. When raised from a page change, a data object with top and skip parameters is included so that the calling controller can retrieve the proper paged data.

*/
(function ($) {
    'use strict';

    var DEFAULT_ITEMS_PER_PAGE = 5,
        DEFAULT_MAX_PAGES = 5,
        DEFAULT_COLUMN_SIZE = 150,
        MULTISELECT_COLUMN_SIZE = 35,
        DROPDOWN_TOGGLE_COLUMN_SIZE = 40,
        DROPDOWN_TOGGLE_COLUMN_NAME = 'dropdownToggle',
        MULTISELECT_COLUMN_NAME = 'cb';


    function arrayObjectIndexOf(array, obj) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (angular.equals(array[i], obj)) {
                return i;
            }
        }
        return -1;
    }

    angular.module('sky.grids', ['sky.contextmenu', 'sky.mediabreakpoints', 'sky.viewkeeper', 'sky.highlight', 'sky.resources', 'sky.data', 'sky.grids.filters', 'sky.grids.actionbar', 'sky.window', 'sky.grids.toolbar'])
        .controller('bbGridContextMenuController', ['$scope', function ($scope) {
            function toggleDropdown($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.locals.is_open = !$scope.locals.is_open;
            }

            $scope.locals = {
                is_open: false,
                items: [],
                toggleDropdown: toggleDropdown
            };

            /*istanbul ignore else: sanity check */
            if (angular.isFunction($scope.getContextMenuItems)) {
                $scope.locals.items = $scope.getContextMenuItems($scope.rowData.id, $scope.rowData);
            }
        }])


        .directive('bbGrid', ['$window', '$compile', '$templateCache', 'bbMediaBreakpoints', 'bbViewKeeperBuilder', 'bbHighlight', 'bbResources', 'bbData', '$controller', '$timeout', 'bbWindow',

            function ($window, $compile, $templateCache, bbMediaBreakpoints, bbViewKeeperBuilder, bbHighlight, bbResources, bbData, $controller, $timeout, bbWindow) {
                return {
                    replace: true,
                    transclude: true,
                    restrict: 'E',
                    scope: {
                        options: '=bbGridOptions',
                        multiselectActions: '=?bbMultiselectActions',
                        updateMultiselectActions: '&bbSelectionsUpdated',
                        paginationOptions: '=?bbGridPagination',
                        selectedRows: '=?bbSelectedRows'
                    },
                    controller: ['$scope', function ($scope) {
                        var locals,
                            self = this;

                        self.setFilters = function (filters) {
                            /*istanbul ignore else: sanity check */
                            if (angular.isFunction(locals.setFilters)) {
                                locals.setFilters(filters);
                            }
                        };

                        self.syncViewKeepers = function () {
                            /*istanbul ignore else: sanity check */
                            if ($scope.syncViewKeepers) {
                                $scope.syncViewKeepers();
                            }
                        };

                        self.syncActionBarViewKeeper = function () {
                            /*istanbul ignore else: sanity check */
                            if (angular.isFunction($scope.syncActionBarViewKeeper)) {
                                $scope.syncActionBarViewKeeper();
                            }
                        };

                        self.resetMultiselect = function () {
                            /*istanbul ignore else: sanity check */
                            if (angular.isFunction(locals.resetMultiselect)) {
                                locals.resetMultiselect();
                            }
                        };

                        self.getVisibleSelections = function (data, selected) {
                            var i,
                                index,
                                result = [];

                            for (i = 0; i < selected.length; i++) {
                                index = arrayObjectIndexOf(data, selected[i]);
                                if (index > -1) {
                                    result.push(selected[i]);
                                }
                            }
                            return result;
                        };

                        self.toggleMultiselectRows = function (visibleSelectedRows) {
                            /*istanbul ignore else: sanity check */
                            if (angular.isFunction(locals.toggleMultiselectRows)) {
                                locals.toggleMultiselectRows(visibleSelectedRows);
                            }
                        };

                        self.syncGridHeaderScrollToTopScrollbar = function () {
                            /*istanbul ignore else: sanity check */
                            if (angular.isFunction(locals.topScrollbarScroll)) {
                                locals.topScrollbarScroll();
                            }
                        };

                        self.scope = $scope;

                        $scope.resources = bbResources;

                        locals = $scope.locals = {
                            gridId: 'bbgrid-table-' + $scope.$id,
                            hasAdd: false,
                            hasColPicker: true,
                            hasFilters: true,
                            applySearchText: function () {
                                /*istanbul ignore else: sanity check */
                                if (angular.isFunction(self.applySearchText)) {
                                    self.applySearchText();
                                }
                            },
                            loadMore: function () {
                                $scope.$emit('loadMoreRows');
                            }
                        };

                        $scope.$watch('options.viewKeeperOffsetElId', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                if (self.viewKeeperChangedHandler) {
                                    self.viewKeeperChangedHandler(newValue);
                                }
                            }
                        });
                    }],
                    link: function ($scope, element, attr) {
                        $scope.customToolbar = {
                            hasCustomToolbar: false
                        };
                        $scope.customToolbar.hasCustomToolbar = angular.isDefined(attr.bbGridCustomToolbar);

                        $scope.$watch('locals.hasCustomToolbar', function () {
                            var breakpoints = {},
                                cellScopes,
                                columnCount = 0,
                                columnModel,
                                compiledTemplates = [],
                                currentExtendedColumnWidth,
                                extendedColumnIndex,
                                extendedColumnName,
                                fullGrid,
                                getContextMenuItems,
                                hasTemplatedColumns,
                                header,
                                id,
                                locals = $scope.locals,
                                localRowSelect = false,
                                needsExtendedColumnResize,
                                originalExtendedColumnWidth,
                                seemore_template = 'sky/templates/grids/seemore.html',
                                dropdown_template = 'sky/templates/grids/dropdown.html',
                                reorderingColumns,
                                tableBody,
                                tableEl = element.find('table'),
                                tableDomEl = tableEl[0],
                                tableWrapper = element.find('.table-responsive'),
                                tableWrapperWidth,
                                toolbarContainer = element.find('.bb-grid-toolbar-viewkeeper'),
                                toolbarContainerId,
                                totalColumnWidth,
                                verticalOffSetElId,
                                vkActionBarAndBackToTop,
                                vkToolbars,
                                vkHeader,
                                windowEl = $($window),
                                windowEventId,
                                resizeStartColWidth,
                                hasPristineColumns = true,
                                scrollbarWidth;

                            function getTopScrollbar() {
                                return element.find('.bb-grid-top-scrollbar');
                            }

                            function getTopScrollbarDiv() {
                                return element.find('.bb-grid-top-scrollbar > div');
                            }

                            function updateGridLoadedTimestampAndRowCount(count) {
                                $scope.locals.timestamp = new Date().getTime();
                                $scope.locals.rowcount = count;
                            }

                            function reInitGrid() {
                                if ($scope.options && $scope.options.selectedColumnIds && $scope.options.selectedColumnIds.length > 0 && tableEl[0].grid) {

                                    initGrid();

                                    if ($scope.options.data && $scope.options.data.length > 0) {
                                        setRows($scope.options.data);
                                    }
                                }
                            }

                            function mediaBreakpointHandler(newBreakpoints) {
                                breakpoints = newBreakpoints;
                                reInitGrid();
                            }

                            function buildColumnClasses(column) {
                                var classes = '';

                                //if this column does not allow search then add the appropriate class. This is used when highlighting search results
                                if (column.exclude_from_search) {
                                    classes += "bb-grid-no-search ";
                                }

                                return classes;
                            }

                            function getEmptyString() {
                                return '';
                            }

                            function buildCellAttribute(rowId, cellValue, rawObject, column) {
                                /*jslint unparam: true*/
                                return "data-grid-field='" + column.name + "'" + "data-bbauto-field='" + column.name + "'" + "data-bbauto-index='" + (tableEl.getInd(rowId) - 1) + "'";
                            }


                            function getColumnById(columns, id) {
                                var column,
                                    i;

                                for (i = 0; i < columns.length; i++) {
                                    column = columns[i];
                                    if (column.id === id) {
                                        return column;
                                    }
                                }
                            }

                            function resetExtendedColumn() {
                                //wipe out extended column stuff
                                extendedColumnName = null;
                                currentExtendedColumnWidth = null;
                                originalExtendedColumnWidth = null;
                                extendedColumnIndex = null;
                                needsExtendedColumnResize = false;
                            }

                            function getBreakpointsWidth(column) {
                                var columnDefault;

                                if (column.width_all > 0) {
                                    columnDefault = column.width_all;
                                } else {
                                    columnDefault = DEFAULT_COLUMN_SIZE;
                                }

                                if (breakpoints.xs) {
                                    return column.width_xs > 0 ? column.width_xs : columnDefault;
                                } else if (breakpoints.sm) {
                                    return column.width_sm > 0 ? column.width_sm : columnDefault;
                                } else if (breakpoints.md) {
                                    return column.width_md > 0 ? column.width_md : columnDefault;
                                } else if (breakpoints.lg) {
                                    return column.width_lg > 0 ? column.width_lg : columnDefault;
                                }

                                return columnDefault;
                            }

                            function buildColumnModel(columns, selectedColumnIds) {
                                var colModel = [],
                                    column,
                                    colWidth,
                                    index,
                                    gridColumn;

                                hasTemplatedColumns = false;

                                if (getContextMenuItems) {
                                    colModel.push({
                                        classes: 'bb-grid-dropdown-cell',
                                        fixed: true,
                                        sortable: false,
                                        name: DROPDOWN_TOGGLE_COLUMN_NAME,
                                        label: ' ',
                                        width: DROPDOWN_TOGGLE_COLUMN_SIZE,
                                        title: false,
                                        hidedlg: true,
                                        resizable: false,
                                        search: false,
                                        template_url: dropdown_template,
                                        controller: 'bbGridContextMenuController',
                                        cellattr: buildCellAttribute,
                                        formatter: getEmptyString,
                                        is_context_menu: true
                                    });

                                    /*istanbul ignore else: sanity check */
                                    if (!compiledTemplates[dropdown_template]) {
                                        compiledTemplates[dropdown_template] = $compile($templateCache.get(dropdown_template));
                                    }

                                    hasTemplatedColumns = true;

                                    totalColumnWidth = totalColumnWidth + DROPDOWN_TOGGLE_COLUMN_SIZE;
                                }


                                resetExtendedColumn();

                                for (index = 0; index < selectedColumnIds.length; index++) {
                                    column = getColumnById(columns, selectedColumnIds[index]);

                                    if (column) {

                                        colWidth = getBreakpointsWidth(column);

                                        //If this is the last selected column and the sum of the columns is shorter than the area available, extend the last column
                                        if ((index === (selectedColumnIds.length - 1)) && (tableWrapper.width() > (colWidth + totalColumnWidth))) {
                                            needsExtendedColumnResize = true;
                                            originalExtendedColumnWidth = colWidth;
                                            extendedColumnName = column.name;
                                            extendedColumnIndex = index;

                                            //If multiselect and/or contextmenu exist, then the last column index is shifted.
                                            if (locals.multiselect) {
                                                extendedColumnIndex =  extendedColumnIndex + 1;
                                            }
                                            if (getContextMenuItems) {
                                                extendedColumnIndex = extendedColumnIndex + 1;
                                            }

                                            colWidth = tableWrapper.width() - totalColumnWidth;
                                            currentExtendedColumnWidth = colWidth;
                                        }

                                        gridColumn = {
                                            index: column.id.toString(),
                                            sortable: false,
                                            id: column.id,
                                            name: column.name,
                                            label: column.caption,
                                            align: (column.right_align ? 'right' : (column.center_align ? 'center' : 'left')),
                                            classes: buildColumnClasses(column),
                                            cellattr: buildCellAttribute,
                                            controller: column.controller,
                                            template_url: column.template_url,
                                            jsonmap: column.jsonmap,
                                            allow_see_more: column.allow_see_more,
                                            width: colWidth
                                        };

                                        if (column.allow_see_more && !gridColumn.template_url) {
                                            gridColumn.template_url = seemore_template;

                                            if (!compiledTemplates[seemore_template]) {
                                                compiledTemplates[seemore_template] = $compile($templateCache.get(seemore_template));
                                            }
                                        }

                                        if (gridColumn.template_url) {
                                            //Setup a formatter to return an empty string until the
                                            //angular template is processed for the cell.
                                            gridColumn.formatter = getEmptyString;
                                            hasTemplatedColumns = true;
                                        } else if (column.colFormatter) {
                                            gridColumn.formatter = column.colFormatter;
                                        }

                                        colModel.push(gridColumn);

                                        totalColumnWidth = totalColumnWidth + colWidth;
                                    }
                                }

                                return colModel;
                            }

                            function getColumnElementIdFromName(columnName) {
                                return locals.gridId + "_" + columnName;
                            }

                            function getColumnNameFromElementId(columnName) {
                                /*istanbul ignore else: sanity check */
                                if (columnName) {
                                    return columnName.replace(locals.gridId + "_", "");
                                }
                            }

                            function getDesiredGridWidth() {
                                var width = tableWrapper.width();

                                if (width < totalColumnWidth) {
                                    width = totalColumnWidth;
                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                } else {
                                    tableWrapper.addClass('bb-grid-table-wrapper');
                                }

                                return width;
                            }

                            function setScrollbarHeight() {
                                var topScrollbar = getTopScrollbar(),
                                    topScrollbarDiv = getTopScrollbarDiv();

                                if (totalColumnWidth > (topScrollbar.width()) && !breakpoints.xs) {
                                    topScrollbar.height(scrollbarWidth);
                                    topScrollbarDiv.height(scrollbarWidth);
                                } else {
                                    topScrollbar.height(0);
                                    topScrollbarDiv.height(0);
                                }
                            }

                            function resetTopScrollbar() {
                                var topScrollbarDiv = getTopScrollbarDiv();
                                topScrollbarDiv.width(totalColumnWidth);
                                setScrollbarHeight();
                            }

                            function resizeExtendedColumn(changedWidth, isIncreasing) {
                                var extendedShrinkWidth = currentExtendedColumnWidth - originalExtendedColumnWidth;

                                //If the extended portion of the last column is less than the amount resized
                                if (extendedShrinkWidth <= changedWidth) {
                                    //decrease extended column to original size
                                    tableEl.setColProp(extendedColumnName, {widthOrg: originalExtendedColumnWidth});

                                    //increase grid width by remainder and wipe out all the extended stuff
                                    if (isIncreasing) {
                                        totalColumnWidth = totalColumnWidth + (changedWidth - extendedShrinkWidth);
                                    } else {
                                        totalColumnWidth = totalColumnWidth - extendedShrinkWidth;
                                    }

                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                    resetExtendedColumn();
                                } else {
                                    //decrease extended column width by changedWidth
                                    currentExtendedColumnWidth = currentExtendedColumnWidth - changedWidth;
                                    tableEl.setColProp(extendedColumnName, {widthOrg: currentExtendedColumnWidth});

                                    if (!isIncreasing) {
                                        totalColumnWidth = totalColumnWidth - changedWidth;
                                    }
                                }
                                tableEl.setGridWidth(totalColumnWidth, true);
                                resetTopScrollbar();
                            }

                            function resetGridWidth(oldWidth, newWidth) {
                                var changedWidth,
                                    topScrollbar = getTopScrollbar(),
                                    width;

                                topScrollbar.width(tableWrapper.width());
                                if (needsExtendedColumnResize && newWidth < oldWidth) {
                                    changedWidth = oldWidth - newWidth;
                                    resizeExtendedColumn(changedWidth, false);
                                } else {
                                    if (totalColumnWidth === oldWidth) {
                                        totalColumnWidth = newWidth;
                                    }

                                    width = getDesiredGridWidth();

                                    /*istanbul ignore else: sanity check */
                                    if (width > 0) {
                                        tableEl.setGridWidth(width);
                                        resetTopScrollbar();
                                    }
                                }
                            }

                            function getLastIndex() {
                                var lastIndex = $scope.options.selectedColumnIds.length - 1;

                                if (locals.multiselect) {
                                    lastIndex = lastIndex + 1;
                                }
                                if (getContextMenuItems) {
                                    lastIndex = lastIndex + 1;
                                }

                                return lastIndex;
                            }

                            function resizeStart(event, index) {
                                var lastIndex = getLastIndex(),
                                    jqGridEl,
                                    thEls;

                                hasPristineColumns = false;

                                jqGridEl = element.find('.ui-jqgrid');

                                //if resizing last element and tableEl smaller than table wrapper

                                if (index === lastIndex && tableWrapperWidth > jqGridEl.width()) {
                                    //increase width of child of table-responsive
                                    jqGridEl.width(tableWrapperWidth);
                                    //increase width of hdiv
                                    element.find('.ui-jqgrid-hdiv').width(tableWrapperWidth);
                                    //make padding right on tr of headers
                                    element.find('.ui-jqgrid-hdiv tr').css('padding-right', tableWrapperWidth.toString() + 'px');
                                }

                                fullGrid.find('.ui-jqgrid-resize-mark').height(fullGrid.height());
                                thEls = element.find('.ui-jqgrid .ui-jqgrid-hdiv .ui-jqgrid-htable th');
                                resizeStartColWidth = parseInt(thEls[index].style.width);

                            }

                            function syncHeaderToTableWrapper() {
                                if (vkHeader && vkHeader.isFixed) {
                                    header.width(tableWrapper.width());
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }
                            }

                            function resizeStop(newWidth, index) {
                                var changedWidth;

                                tableWrapper.addClass('bb-grid-table-wrapper-overflow');

                                changedWidth = newWidth - resizeStartColWidth;

                                //If your last column was extended and this is the first resize
                                if (needsExtendedColumnResize) {
                                    //If the column you're resizing is not the extended column and you're increasing the size
                                    if (index !== extendedColumnIndex && changedWidth > 0) {

                                        resizeExtendedColumn(changedWidth, true);

                                        resetExtendedColumn();
                                        syncHeaderToTableWrapper();

                                        return;
                                    }
                                    resetExtendedColumn();
                                }

                                totalColumnWidth = totalColumnWidth + changedWidth;
                                tableEl.setGridWidth(totalColumnWidth, false);
                                resetTopScrollbar();
                                syncHeaderToTableWrapper();

                                return;
                            }

                            function setSortStyles() {
                                var className,
                                    headerElId,
                                    sortOptions;
                                /*istanbul ignore else: sanity check */
                                if (header) {
                                    header.find('th').removeClass('sorting-asc').removeClass('sorting-desc');
                                    /* istanbul ignore else: sanity check */
                                    if ($scope.options) {
                                        sortOptions = $scope.options.sortOptions;
                                        if (sortOptions && sortOptions.column) {
                                            headerElId = getColumnElementIdFromName(sortOptions.column);

                                            if (sortOptions.descending) {
                                                className = 'sorting-desc';
                                            } else {
                                                className = 'sorting-asc';
                                            }

                                            header.find('#' + headerElId).addClass(className);
                                        }
                                    }
                                }
                            }

                            function columnIsSortable(columnName) {
                                var excludedColumns,
                                    sortOptions = $scope.options.sortOptions;

                                if (columnName === DROPDOWN_TOGGLE_COLUMN_NAME || columnName === MULTISELECT_COLUMN_NAME) {
                                    return false;
                                }


                                /*istanbul ignore else: sanity check */
                                if (sortOptions) {
                                    excludedColumns = sortOptions.excludedColumns;
                                    if (excludedColumns) {
                                        if (excludedColumns.indexOf(columnName) > -1) {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            }

                            function highlightSearchText() {
                                var options = $scope.options;
                                if (options && options.searchText) {
                                    bbHighlight(tableEl.find("td").not('.bb-grid-no-search'), options.searchText, 'highlight');
                                } else {
                                    bbHighlight.clear(tableEl);
                                }
                            }

                            function linkCellValue(scope, cell, linkFunction) {
                                linkFunction(scope, function (cloned) {
                                    cell.append(cloned);
                                });
                            }

                            function afterInsertRow(rowid, rowdata, rowelem) {
                                /*jshint validthis: true */
                                var cell,
                                    column,
                                    columnData,
                                    i,
                                    itemScope,
                                    row,
                                    rowIndex;

                                if (hasTemplatedColumns) {

                                    if (!tableBody) {
                                        tableBody = $(this);
                                    }

                                    row = tableBody.find('#' + rowid);

                                    for (i = 0; i < columnModel.length; i++) {
                                        column = columnModel[i];

                                        if (column.template_url) {

                                            cell = row.find('[data-grid-field="' + column.name + '"]');
                                            columnData = rowdata[column.name];

                                            //Create a new scope and apply the cell object's properties to it.
                                            itemScope = $scope.$new(true);

                                            itemScope.data = columnData;
                                            itemScope.rowData = rowelem;

                                            if (column.allow_see_more) {
                                                itemScope.skyResources = $scope.resources;
                                            }

                                            if (column.is_context_menu) {
                                                itemScope.getContextMenuItems = getContextMenuItems;
                                            }

                                            //make the resources from the caller available to the column templates
                                            if ($scope.options.resources) {
                                                itemScope.resources = $scope.options.resources;
                                            }

                                            if (column.controller) {
                                                $controller(column.controller, {
                                                    $scope: itemScope
                                                });
                                            }

                                            cellScopes.push(itemScope); //Stash scope for cleanup later.

                                            linkCellValue(itemScope, cell, compiledTemplates[column.template_url]);
                                        }
                                    }
                                }

                                rowIndex = tableEl.getInd(rowid);

                                //check if row should be multiselected
                                if ($scope.selectedRows && $scope.selectedRows.length > 0) {

                                    row = $scope.options.data[(rowIndex - 1)];
                                    if (row && arrayObjectIndexOf($scope.selectedRows, row) > -1) {
                                        tableEl.setSelection(rowid, false);
                                    }
                                }
                            }

                            function setColumnHeaderAlignment() {
                                var alignmentClass,
                                    column,
                                    i;

                                for (i = 0; i < columnModel.length; i++) {
                                    column = columnModel[i];
                                    if (column.align === 'center') {
                                        alignmentClass = 'bb-grid-th-center';
                                    } else if (column.align === 'right') {
                                        alignmentClass = 'bb-grid-th-right';
                                    } else {
                                        alignmentClass = 'bb-grid-th-left';
                                    }

                                    tableEl.setLabel(column.name, '', alignmentClass);

                                }
                            }

                            function gridComplete() {
                                setColumnHeaderAlignment();
                            }

                            function gridColumnsReordered(orderedColumns) {
                                var i,
                                    offset = 0,
                                    oldIndex,
                                    selectedColumnIds = $scope.options.selectedColumnIds,
                                    newSelectedColumnIds = [];

                                resetExtendedColumn();

                                //Need to account for context menu if it exists.  It will always be the first
                                //column before and after the reorder
                                if (angular.isFunction(getContextMenuItems)) {
                                    offset += 1;
                                }

                                if (locals.multiselect) {
                                    offset += 1;
                                }

                                for (i = offset; i < orderedColumns.length; i++) {
                                    oldIndex = orderedColumns[i];
                                    newSelectedColumnIds.push(selectedColumnIds[oldIndex - offset]);
                                }

                                reorderingColumns = true;
                                $scope.options.selectedColumnIds = newSelectedColumnIds;
                                $scope.$apply();
                            }

                            function getSortable() {
                                var sortable = {
                                    update: gridColumnsReordered
                                };

                                if (getContextMenuItems) {
                                    sortable.exclude = "#" + $scope.locals.gridId + "_" + DROPDOWN_TOGGLE_COLUMN_NAME;
                                }

                                return sortable;
                            }

                            function clearSelectedRowsObject() {
                                $scope.selectedRows = [];
                            }


                            function resetMultiselect() {
                                clearSelectedRowsObject();
                                tableEl.resetSelection();
                            }



                            function onSelectAll(rowIds, status) {
                                /*jslint unparam: true */
                                var allRowData;

                                localRowSelect = true;

                                clearSelectedRowsObject();

                                if (status === true) {
                                    allRowData = $scope.options.data;
                                    if (allRowData && allRowData.length > 0) {
                                        $scope.selectedRows = allRowData.slice();
                                    }
                                }
                                $scope.$apply();
                            }


                            function toggleMultiselectRows(visibleSelectedRows) {
                                var i,
                                    index,
                                    rowIds;

                                rowIds = tableEl.getDataIDs();

                                for (i = 0; i < visibleSelectedRows.length; i++) {
                                    index = arrayObjectIndexOf($scope.options.data, visibleSelectedRows[i]);
                                    tableEl.setSelection(rowIds[index], true);
                                }
                            }


                            function onSelectRow(rowId, status) {
                                $timeout(function () {
                                    var index,
                                        rowIndex = tableEl.getInd(rowId),
                                        row;
                                    row = $scope.options.data[(rowIndex - 1)];

                                    localRowSelect = true;

                                    index = arrayObjectIndexOf($scope.selectedRows, row);

                                    if (status === true && index === -1 && row) {
                                        $scope.selectedRows.push(row);
                                    } else if (status === false && index > -1) {
                                        $scope.selectedRows.splice(index, 1);
                                    }
                                });
                            }

                            function setMultiselectRow(rowId, rowIndex) {
                                var row;

                                tableEl.setSelection(rowId, false);
                                row  = $scope.options.data[(rowIndex - 1)];
                                $scope.selectedRows.push(row);
                            }

                            function beforeSelectRow(rowId, e) {
                                var endIndex,
                                    i,
                                    lastSelectedRow,
                                    rowIds,
                                    startIndex = parseInt(tableEl.getInd(rowId));

                                localRowSelect = true;

                                if (e.shiftKey) {
                                    lastSelectedRow = tableEl.getInd(tableEl.getGridParam('selrow'));
                                    resetMultiselect();

                                    //if lastSelectedRow is undefined or null, set to 1
                                    if (angular.isUndefined(lastSelectedRow) || lastSelectedRow === null) {
                                        lastSelectedRow = 1;
                                    }

                                    endIndex = parseInt(lastSelectedRow);

                                    rowIds = tableEl.getDataIDs();

                                    //set shift click selection first so last selected row is set properly
                                    if (endIndex < startIndex) {
                                        for (i = startIndex; i >  endIndex - 1; i = i - 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else if (endIndex > startIndex) {
                                        for (i = startIndex; i <  endIndex + 1; i = i + 1) {
                                            setMultiselectRow(rowIds[(i - 1)], i);
                                        }
                                    } else {
                                        $scope.$apply();
                                        return true;
                                    }

                                    $scope.$apply();
                                    return false;
                                }
                                return true;
                            }

                            function pageChanged() {
                                var skip = ($scope.locals.currentPage - 1) * $scope.paginationOptions.itemsPerPage,
                                    top = $scope.paginationOptions.itemsPerPage;

                                $scope.$emit('loadMoreRows', {top: top, skip: skip});

                            }

                            function initializePagination() {
                                if (angular.isDefined($scope.paginationOptions)) {

                                    if (!$scope.paginationOptions.itemsPerPage) {
                                        $scope.paginationOptions.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
                                    }

                                    if (!$scope.paginationOptions.maxPages) {
                                        $scope.paginationOptions.maxPages = DEFAULT_MAX_PAGES;
                                    }

                                    $scope.paginationOptions.pageChanged = pageChanged;

                                    $scope.locals.currentPage = 1;
                                }
                            }

                            function fancyCheckOff() {
                                element.find('td .bb-check-checkbox').off();
                            }

                            function wrapCheckboxEl(checkboxEl) {
                                checkboxEl.wrap('<label class="bb-check-wrapper"></label>');
                                checkboxEl.after('<span class="bb-check-checkbox"></span>');
                            }

                            function setUpFancyCheckHeader() {
                                var headerCheckEl =  header.find('th .cbox');
                                wrapCheckboxEl(headerCheckEl);
                            }

                            function setUpFancyCheckCell() {
                                var checkCellEl = element.find('td .cbox');
                                wrapCheckboxEl(checkCellEl);
                                element.find('td .bb-check-checkbox').on('click', function (event) {
                                    event.preventDefault();
                                });
                            }

                            function getIdPrefix() {
                                return 'bb-grid-row-' + $scope.$id + '-';
                            }

                            function initGrid() {
                                var columns,
                                    jqGridOptions,
                                    selectedColumnIds,
                                    useGridView = true,
                                    hoverrows = false;

                                totalColumnWidth = 0;

                                hasPristineColumns = true;

                                tableWrapperWidth = tableWrapper.width();

                                locals.multiselect = false;

                                //Clear reference to the table body since it will be recreated.
                                tableBody = null;

                                //Unload grid if it already exists.
                                tableEl.jqGrid('GridUnload');
                                fancyCheckOff();

                                tableEl = element.find('table');
                                tableDomEl = tableEl[0];

                                /*istanbul ignore else: sanity check */
                                if ($scope.options) {

                                    columns = $scope.options.columns;
                                    selectedColumnIds = $scope.options.selectedColumnIds;
                                    getContextMenuItems = $scope.options.getContextMenuItems;

                                    if ($scope.options.multiselect) {
                                        locals.multiselect = true;
                                        hoverrows = true;

                                        totalColumnWidth = totalColumnWidth + MULTISELECT_COLUMN_SIZE;
                                    }
                                    $scope.searchText = $scope.options.searchText;
                                }

                                // Allow grid styles to be changed when grid is in multiselect mode (such as the
                                // header checkbox alignment).
                                element[locals.multiselect ? 'addClass' : 'removeClass']('bb-grid-multiselect');


                                if (getContextMenuItems) {
                                    useGridView = false;
                                }

                                if (columns && selectedColumnIds) {


                                    columnModel = buildColumnModel(columns, selectedColumnIds);
                                    columnCount = columnModel.length;

                                    jqGridOptions = {
                                        afterInsertRow: afterInsertRow,
                                        autoencode: true,
                                        beforeSelectRow: beforeSelectRow,
                                        colModel: columnModel,
                                        datatype: angular.noop,
                                        gridComplete: gridComplete,
                                        gridView: useGridView,
                                        height: 'auto',
                                        hoverrows: hoverrows,
                                        idPrefix: getIdPrefix(),
                                        multiselect: locals.multiselect,
                                        multiselectWidth: MULTISELECT_COLUMN_SIZE,
                                        onSelectAll: onSelectAll,
                                        onSelectRow: onSelectRow,
                                        resizeStart: resizeStart,
                                        resizeStop: resizeStop,
                                        rowNum: -1,
                                        shrinktofit: false,
                                        sortable: getSortable(),
                                        width: getDesiredGridWidth()
                                    };


                                    tableEl.jqGrid(jqGridOptions);

                                    header = $(tableDomEl.grid.hDiv);

                                    //Attach click handler for sorting columns
                                    header.find('th').on('click', function () {
                                        var sortOptions = $scope.options.sortOptions,
                                            columnName;

                                        if (!sortOptions) {
                                            sortOptions = $scope.options.sortOptions = {};
                                        }

                                        columnName = getColumnNameFromElementId(this.id);

                                        if (columnIsSortable(columnName)) {
                                            sortOptions.column = columnName;
                                            sortOptions.descending = $(this).hasClass('sorting-asc');
                                            $scope.$apply();
                                        }
                                    });

                                    fullGrid = header.parents('.ui-jqgrid:first');

                                    if (vkHeader) {
                                        vkHeader.destroy();
                                    }

                                    $scope.locals.showToolbar = true;

                                    getTopScrollbar().width(tableWrapper.width());
                                    resetTopScrollbar();

                                    if (!$scope.options.fixedToolbar) {
                                        vkHeader = new bbViewKeeperBuilder.create({
                                            el: header[0],
                                            boundaryEl: tableWrapper[0],
                                            verticalOffSetElId: toolbarContainerId,
                                            setWidth: true,
                                            onStateChanged: function () {
                                                if (vkHeader.isFixed) {
                                                    header.scrollLeft(tableWrapper.scrollLeft());
                                                } else {
                                                    header.scrollLeft(0);
                                                }

                                            }
                                        });
                                    }

                                    setSortStyles();

                                    setUpFancyCheckHeader();

                                    $scope.gridCreated = true;

                                }

                            }

                            function destroyCellScopes() {
                                var i;
                                if (cellScopes) {
                                    for (i = 0; i < cellScopes.length; i++) {
                                        cellScopes[i].$destroy();
                                    }
                                }
                                cellScopes = [];
                            }

                            function loadColumnTemplates(callback) {
                                var columns,
                                    templateUrlsToLoad = {};

                                //Identify any template URLs that haven't been compiled
                                /*istanbul ignore else: sanity check */
                                if ($scope.options) {
                                    columns = $scope.options.columns;
                                    /*istanbul ignore else: sanity check */
                                    if (columns) {
                                        angular.forEach(columns, function (column) {
                                            var templateUrl = column.template_url;

                                            if (templateUrl && !compiledTemplates[templateUrl]) {
                                                templateUrlsToLoad[templateUrl] = templateUrl;
                                            }
                                        });
                                    }
                                }

                                //Load template URLs that need compiling
                                bbData.load({
                                    text: templateUrlsToLoad
                                }).then(function (result) {
                                    var p,
                                        template;

                                    // Compile templates and store them for use when adding rows.
                                    for (p in result.text) {
                                        /*istanbul ignore else: sanity check */
                                        if (result.text.hasOwnProperty(p)) {
                                            template = result.text[p];

                                            /*istanbul ignore else: sanity check */
                                            if (template) {
                                                compiledTemplates[p] = $compile(template);
                                            }
                                        }
                                    }

                                    callback();
                                });
                            }

                            function handleTableWrapperResize() {
                                var newWidth = tableWrapper.width(),
                                    topScrollbar = getTopScrollbar();

                                if (tableWrapperWidth && tableWrapperWidth !== newWidth) {
                                    if (hasPristineColumns) {
                                        resetGridWidth(tableWrapperWidth, newWidth);
                                    } else {
                                        topScrollbar.width(newWidth);
                                    }
                                    tableWrapperWidth = newWidth;
                                } else {
                                    tableWrapperWidth = newWidth;
                                }
                            }

                            function setRows(rows) {
                                /*istanbul ignore else: sanity check */
                                if (tableDomEl.addJSONData) {
                                    loadColumnTemplates(function () {

                                        if (locals.multiselect) {
                                            element.find('td').off('mousedown.gridmousedown');
                                        }

                                        tableEl.resetSelection();

                                        fancyCheckOff();

                                        destroyCellScopes();
                                        tableDomEl.addJSONData(rows);
                                        $timeout(highlightSearchText);
                                        handleTableWrapperResize();
                                        /*istanbul ignore next: sanity check */
                                        updateGridLoadedTimestampAndRowCount(rows ? rows.length : 0);

                                        setUpFancyCheckCell();

                                    });
                                }
                            }

                            function setupToolbarViewKeepers() {
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                /*istanbul ignore else: sanity check */
                                if ($scope.options) {
                                    verticalOffSetElId = $scope.options.viewKeeperOffsetElId;
                                }

                                if (!$scope.options || !$scope.options.fixedToolbar) {
                                    vkToolbars = new bbViewKeeperBuilder.create({
                                        el: toolbarContainer[0],
                                        boundaryEl: tableWrapper[0],
                                        setWidth: true,
                                        verticalOffSetElId: verticalOffSetElId,
                                        onStateChanged: function () {
                                            $timeout(function () {
                                                locals.isScrolled = vkToolbars.isFixed;
                                            });
                                        }
                                    });
                                }


                                vkActionBarAndBackToTop = new bbViewKeeperBuilder.create({
                                    el: element.find('.bb-grid-action-bar-and-back-to-top')[0],
                                    boundaryEl: element[0],
                                    setWidth: true,
                                    verticalOffSetElId: verticalOffSetElId,
                                    fixToBottom: true
                                });
                            }

                            function backToTop() {
                                vkToolbars.scrollToTop();
                            }

                            locals.resetMultiselect = resetMultiselect;

                            locals.toggleMultiselectRows = toggleMultiselectRows;

                            locals.setFilters = function (filters) {
                                $scope.options.filters = filters;
                                $scope.locals.applySearchText();
                            };

                            if (angular.isUndefined($scope.selectedRows) || !angular.isArray($scope.selectedRows)) {
                                $scope.selectedRows = [];
                            }

                            scrollbarWidth = bbWindow.getScrollbarWidth();

                            id = $scope.$id;
                            toolbarContainerId = id + '-toolbar-container';

                            locals.backToTop = backToTop;

                            //Apply unique id to the table.  ID is required by jqGrid.
                            toolbarContainer.attr('id', toolbarContainerId);

                            $scope.$watch('options.selectedColumnIds', function (newValue) {
                                var columnChangedData;

                                /*istanbul ignore else: sanity check */
                                if (newValue) {
                                    if (reorderingColumns) {
                                        reorderingColumns = false;
                                        return;
                                    }

                                    initGrid();

                                    // re-evaluated so the grid won't automatically be reloaded with existing data.
                                    columnChangedData = {
                                        willResetData: false
                                    };

                                    $scope.$emit('includedColumnsChanged', columnChangedData);


                                    if (!columnChangedData.willResetData && $scope.options.data && $scope.options.data.length > 0) {
                                        // Data won't change as a result of the columns changing; reload existing data.
                                        setRows($scope.options.data);
                                    }
                                }
                            }, true);

                            $scope.$watchCollection('selectedRows', function (newSelections) {
                                var i,
                                    index,
                                    rowIds;

                                if (localRowSelect) {
                                    localRowSelect = false;
                                    return;
                                }

                                if (tableEl[0].grid && $scope.options.data && $scope.options.data.length > 0) {
                                    //blow away existing selections
                                    tableEl.resetSelection();

                                    rowIds = tableEl.getDataIDs();

                                    for (i = 0; i < newSelections.length; i++) {

                                        index = arrayObjectIndexOf($scope.options.data, newSelections[i]);

                                        if (index > -1) {
                                            tableEl.setSelection(rowIds[index], false);
                                        }

                                    }
                                }

                            });

                            $scope.$watch('paginationOptions', initializePagination, true);

                            $scope.$watchCollection('options.data', setRows);

                            $scope.syncViewKeepers = function () {
                                /*istanbul ignore else: sanity check */
                                if (vkToolbars) {
                                    vkToolbars.syncElPosition();
                                }
                            };

                            $scope.syncActionBarViewKeeper = function () {
                                /*istanbul ignore else: sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.syncElPosition();
                                }
                            };

                            $scope.$watch('options.sortOptions', setSortStyles, true);

                            $scope.$watchGroup(['options.viewKeeperOffsetElId', 'options.fixedToolbar'], function () {
                                setupToolbarViewKeepers();
                            });

                            $scope.$watch('options.filters', function (f) {
                                $scope.$broadcast('updateAppliedFilters', f);
                            });

                            bbMediaBreakpoints.register(mediaBreakpointHandler);

                            tableWrapper.on('scroll', function () {

                                /*istanbul ignore else: sanity check */
                                if (vkHeader) {
                                    vkHeader.syncElPosition();
                                }

                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(tableWrapper.scrollLeft());
                                }

                                getTopScrollbar().scrollLeft(tableWrapper.scrollLeft());
                            });

                            windowEventId = 'bbgrid' + id;

                            windowEl.on('resize.' + windowEventId + ', orientationchange.' + windowEventId, function () {
                                handleTableWrapperResize();
                            });

                            // Reinitialize grid when grid element resizes from 0
                            $scope.$watch(function () {
                                return element.width();
                            }, function (newValue, oldValue) {
                                if (newValue !== oldValue && oldValue === 0) {
                                    reInitGrid();
                                }
                            });

                            $scope.locals.topScrollbarScroll = function () {
                                var topScrollbar = getTopScrollbar();
                                tableWrapper.scrollLeft(topScrollbar.scrollLeft());
                                if (header.hasClass('bb-viewkeeper-fixed')) {
                                    header.scrollLeft(topScrollbar.scrollLeft());
                                }
                            };

                            $scope.locals.hasWaitAndEmpty = function () {
                                return $scope.options && $scope.options.loading && (!$scope.options.data || $scope.options.data.length < 1);
                            };


                            element.on('$destroy', function () {

                                /*istanbul ignore else: sanity check */
                                if (vkToolbars) {
                                    vkToolbars.destroy();
                                }

                                /*istanbul ignore else: sanity check */
                                if (vkHeader) {
                                    vkHeader.destroy();
                                }

                                /*istanbul ignore else: sanity check */
                                if (vkActionBarAndBackToTop) {
                                    vkActionBarAndBackToTop.destroy();
                                }

                                windowEl.off('resize.' + windowEventId + ', orientationchange.' + windowEventId);

                                fancyCheckOff();

                                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                            });
                        });
                    },
                    templateUrl: 'sky/templates/grids/grid.html'
                };
            }]);
}(jQuery));

/*global angular */

(function () {
    'use strict';


    function BBGridToolbar(bbResources, bbModal) {
        return {
            require: '?^bbGrid',
            scope: {
                options: '=?bbToolbarOptions'
            },
            transclude: true,
            link: function ($scope, el, attr, bbGrid) {
                var topScrollbarEl = el.find('.bb-grid-top-scrollbar');

                function applySearchText() {
                    var searchEl;

                    searchEl = el.find('.bb-search-container input');
                    /*istanbul ignore else: sanity check */
                    if (angular.isFunction(searchEl.select) && searchEl.length > 0 && $scope.searchText) {
                        searchEl.eq(0).select();
                    }

                    $scope.options.searchText = $scope.searchText;
                }

                function openColumnPicker() {
                    bbModal.open({
                        templateUrl: 'sky/templates/grids/columnpicker.html',
                        controller: 'BBGridColumnPickerController',
                        resolve: {
                            columns: function () {
                                return $scope.options.columns;
                            },
                            selectedColumnIds: function () {
                                return $scope.options.selectedColumnIds;
                            },
                            columnPickerHelpKey: function () {
                                return $scope.options.columnPickerHelpKey;
                            },
                            listMode: function () {
                                return $scope.options.columnPickerMode;
                            }
                        }
                    }).result.then(function (selectedColumnIds) {
                        $scope.options.selectedColumnIds = selectedColumnIds;
                    });
                }

                function toggleFilterMenu(isOpen) {
                    if ($scope.options && $scope.options.hasInlineFilters) {
                        if (angular.isDefined(isOpen)) {
                            $scope.toolbarLocals.filtersVisible = isOpen;
                        } else {
                            $scope.toolbarLocals.filtersVisible = !$scope.toolbarLocals.filtersVisible;
                        }
                    /*istanbul ignore else: sanity check */
                    } else if (bbGrid !== null && angular.isFunction(bbGrid.toggleFilterMenu)) {
                        bbGrid.toggleFilterMenu(isOpen);
                    }
                }

                function moveInlineFilters() {
                    el.parents('.bb-grid-container').find('.bb-filters-inline')
                        .appendTo(el.find('.bb-grid-filter-inline-container'));

                }

                $scope.toolbarLocals = {
                    applySearchText: applySearchText,
                    openColumnPicker: openColumnPicker,
                    toggleFilterMenu: toggleFilterMenu
                };

                $scope.resources = bbResources;

                /*istanbul ignore else: sanity check */
                if (bbGrid !== null && angular.isUndefined($scope.options)) {
                    $scope.$watch(function () {
                        return bbGrid.scope.options;
                    }, function (newValue) {
                        $scope.options = newValue;
                    });
                }

                //grid columns changed, initialize toolbar stuff
                $scope.$watch('options.selectedColumnIds', function (newValue) {
                    if (angular.isDefined(newValue)) {

                        $scope.searchText = $scope.options.searchText;

                        if ($scope.options.hasInlineFilters) {
                            moveInlineFilters();
                        }

                        /*istanbul ignore else: sanity check */
                        if (bbGrid !== null) {
                            bbGrid.applySearchText = applySearchText;
                        }

                        if (angular.isFunction($scope.options.onAddClick)) {
                            $scope.toolbarLocals.hasAdd = true;
                        }
                    }
                }, true);

                $scope.$watch('options.filtersOpen', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        toggleFilterMenu(newValue);
                    }
                });

                /*istanbul ignore else: sanity check */
                if (bbGrid !== null) {
                    topScrollbarEl.on('scroll', function () {
                        bbGrid.syncGridHeaderScrollToTopScrollbar();
                    });
                }

                $scope.$on('$destroy', function () {
                    /*istanbul ignore else: sanity check */
                    if (bbGrid !== null) {
                        topScrollbarEl.off();
                    }
                });


            },
            templateUrl: 'sky/templates/grids/gridtoolbar.html'
        };
    }

    BBGridToolbar.$inject = ['bbResources', 'bbModal'];

    angular.module('sky.grids.toolbar', ['sky.resources', 'sky.modal', 'sky.grids.columnpicker'])
        .directive('bbGridToolbar', BBGridToolbar);
}());

/*jslint browser: true, plusplus: true */
/*global angular, jQuery */

/** @module Help
@icon question
@summary The help service allows Angular components to open and close the help panel programmatically.
 @description The help service allows other Angular components to open or close the help panel programmatically. When the widget opens, it interrogates the page to identify the current help topic and display the relevant help content. Settings for this service are controlled with the `bbHelpConfig` object.

 ### Dependencies ###

 - **[easyXDM](http://easyxdm.net/wp/) (2.4.19 or higher)** Used to make cross-domain requests to the help server

---

### bbHelp Methods ###

- `init()` Adds a global help button to the top-right corner of the page.  The appropriate `bbHelpConfig` options should be supplied before calling `init()`.
- `open()` Opens help using the specified help key.  If `init()` has not yet been called then the global add button will be added to the page before opening the help topic.
- `close()` Closes the current help topic.

### bbHelpConfig Settings ###

 - `caseCentral` Optional. Can customize the Case Central URL if needed, or set to empty string to remove this link.
 - `clientId` Optional. Used to pass the client / site id to the chat session.
 - `communityUrl` Optional. Can be provided in order for a link to Community to appear.
 - `customLocales` Optional.  An array of additional locales for which the product has help content other than the default help content locale.  This array should contain strings like 'en-gb' or 'fr'.
 - `getChatData` Optional. Function that returns the appropriate chat key and website id to use for the product based on the user's locale. e.g.
   ```
   getChatData: function(userLocale) {
            if (locale === 'en-gb') {
                return {
                    key: '3674699029499270000',
                    websiteId: ' 3506212574036402816'
                };
            }
            return {
                key: ' 171147028994005462',
                websiteId: '2766361919244160000'
            };
        }
    ```
 - `getCurrentHelpKey` A function that returns the page's current help URL. This way, if a user navigates around your app, at any point clicking the help panel can call this to determine the appropriate help file to show. e.g. `function() { return 'myHelpFile.html'}`
 - `helpBaseUrl` Optional. Provide the base URL to your help files. If omitted, the productId will be inserted into the URL https://www.blackbaud.com/files/support/helpfiles/{ProductId}/content/ to construct the base URL.  This parameter override is available if help content must exist at some other path instead.
 - `knowledgebaseUrl` Optional. Can customize the knowledgebase URL if needed, or set to empty string to remove this link.
 - `onHelpLoaded` Optional. An callback function after the help panel is loaded.
 - `productId` The current product identifier used to build the URL to the product's help content.
 - `url` The URL to the Help Widget that will be included.
 - `userData` Optional. Object used to pass information about the current user to the chat session. e.g `{ emailAddress: '', firstName: '', lastName: ''}`

 */

(function () {
    'use strict';

    angular.module('sky.help', ['ui.router'])
        .constant('bbHelpConfig', {
            onHelpLoaded: null,
            productId: 'Sky',
            customLocales: [],
            url: null
        })
        .factory('bbHelp', ['$q', '$state', '$window', 'bbHelpConfig', function ($q, $state, $window, bbHelpConfig) {
            var initPromise;

            function helpwidgetLoaded() {
                return !!($window.BBHELP && $window.BBHELP.HelpWidget);
            }

            function init() {
                var configOnHelpLoaded,
                    deferred;

                if (!initPromise) {
                    deferred = $q.defer();
                    initPromise = deferred.promise;

                    if (helpwidgetLoaded()) {
                        deferred.resolve();
                    } else if (bbHelpConfig.url) {
                        jQuery.ajax({
                            cache: true,
                            dataType: 'script',
                            url: bbHelpConfig.url
                        }).done(function () {
                            var config = angular.extend({}, bbHelpConfig);

                            if (!config.getCurrentHelpKey) {
                                config.getCurrentHelpKey = function () {
                                    // $state.current.helpKeyOverride outranks $state.current.pageData.helpKey
                                    if ($state.current.helpKeyOverride) {
                                        return $state.current.helpKeyOverride;
                                    }

                                    if ($state.current.pageData) {
                                        return $state.current.pageData.helpKey;
                                    }
                                    return null;
                                };
                            }

                            configOnHelpLoaded = config.onHelpLoaded;

                            config.onHelpLoaded = function () {
                                if (angular.isFunction(configOnHelpLoaded)) {
                                    configOnHelpLoaded.apply(this, arguments);
                                }

                                deferred.resolve();
                            };

                            $window.BBHELP.HelpWidget.load(config);
                        });
                    } else {
                        initPromise = null;
                        throw new Error('bbHelpConfig.url is not defined.');
                    }
                }

                return initPromise;
            }

            function open() {
                var args = arguments;

                init().then(function () {
                    $window.BBHELP.HelpWidget.open.apply($window.BBHELP.HelpWidget, args);
                });
            }

            function close() {
                if (helpwidgetLoaded()) {
                    $window.BBHELP.HelpWidget.close.apply($window.BBHELP.HelpWidget, arguments);
                }
            }

            return {
                init: init,
                open: open,
                close: close
            };
        }]);

}());

/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Help Button
@icon question-circle
@summary The help button creates a help icon to launch a help key that is different than the default help based on page context.
 @description The help button directive creates a help icon that can be clicked to launch a specific help key that is different than the default help based on page context. Optionally, it can override the page help context throughout the duration that the help button exists on the page.

### Help Button Settings ###

 - `bb-help-key` Specifies the help key that will be opened when the help button is clicked.
 - `bb-set-help-key-override` *(Default: `false`)* If `true`, then this button will override the current page help context, so clicking on the help ear will open to this help key while this button exists.

 */

(function () {
    'use strict';

    angular.module('sky.helpbutton', ['sky.help'])
        .directive('bbHelpButton', ['$state', '$window', 'bbHelp', function ($state, $window, bbHelp) {
            /// <summary>
            /// This directive provides a button that launches the Blackbaud Help Widget.
            /// The bbHelpKey attribute sets the help key. The widget will show the given key's corresponding help page
            /// The bbSetHelpKeyOverride attribute, when set to "true", makes this directive's help key override the current page help key.
            ///     The help key override will be removed when the directive is removed from the page.
            /// </summary>

            function link(scope, el, attrs) {
                /*jslint unparam: true */
                var oldHelpKeyOverride;

                el.addClass('bb-helpbutton fa fa-question-circle close');

                if (attrs.bbSetHelpKeyOverride && attrs.bbSetHelpKeyOverride.toLowerCase() === 'true') {
                    oldHelpKeyOverride = $state.current.helpKeyOverride;
                    $state.current.helpKeyOverride = attrs.bbHelpKey;

                    el.on("remove", function () {
                        $state.current.helpKeyOverride = oldHelpKeyOverride;
                    });
                }

                el.click(function () {
                    bbHelp.open(attrs.bbHelpKey);
                });
            }

            return {
                link: link
            };
        }]);

}());

/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Highlight
@icon paint-brush
@summary The highlight component highlights portions of text inside DOM elements.
 @description The highlight directive allows you to highlight portions of text inside DOM elements. Set the `bb-highlight` attribute to the text you want to highlight, and all matching text within the element will be highlighted.

### Highlight Options ###

- `bb-highlight-beacon` A property on your scope that will cause highlighting to occur when its value changes. This is needed when the highlight directive can't tell that the contents of the element to be highlighted has changed. For instance, if the element with the `bb-highlight` attribute also has the `ng-bind` attribute, the highlight directive can detect this and update highlighting whenever this value changes. However if you use a different directive to update the element's contents or the `bb-highlight` attribute is specified on a parent element of the element to be highlighted, you will need to use `bb-highlight-beacon` to notify the highlight directive to update the highlighted text.
 */

(function () {
    'use strict';

    angular.module('sky.highlight', [])
        .factory('bbHighlight', function () {
            var DATA_CLASS_NAME = 'bb-hightlight-class',
                DEFAULT_CLASS_NAME = 'highlight';

            // Copied and modified from here so we don't have yet another jQuery plugin dependency.
            // http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
            function highlight(el, pat, classn) {
                function innerHighlight(node, pat) {
                    var pos,
                        skip = 0,
                        spannode,
                        middlebit,
                        i,
                        middleclone;

                    classn = classn || DEFAULT_CLASS_NAME;

                    el.data(DATA_CLASS_NAME, classn);

                    if (node.nodeType === 3) {
                        pos = node.data.toUpperCase().indexOf(pat);
                        if (pos >= 0) {
                            spannode = document.createElement('span');
                            spannode.className = String(classn);
                            middlebit = node.splitText(pos);
                            middlebit.splitText(pat.length);
                            middleclone = middlebit.cloneNode(true);
                            spannode.appendChild(middleclone);
                            middlebit.parentNode.replaceChild(spannode, middlebit);
                            skip = 1;
                        }
                    } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                        for (i = 0; i < node.childNodes.length; ++i) {
                            i += innerHighlight(node.childNodes[i], pat);
                        }
                    }
                    return skip;
                }

                return el.length && pat && pat.length ? el.each(function () {
                    innerHighlight(this, pat.toUpperCase());
                }) : el;
            }

            function removeHighlight(el) {
                var classn = el.data(DATA_CLASS_NAME) || DEFAULT_CLASS_NAME;

                return el.find('span.' + classn).each(function () {
                    var parentNode = this.parentNode;

                    parentNode.replaceChild(this.firstChild, this);
                    parentNode.normalize();
                }).end();
            }

            highlight.clear = removeHighlight;

            return highlight;
        })
        .directive('bbHighlight', ['bbHighlight', function (bbHighlight) {
            return {
                link: function (scope, el, attrs) {
                    function highlight() {
                        var highlightText = scope.$eval(attrs.bbHighlight);
                        
                        bbHighlight.clear(el);

                        if (highlightText) {
                            bbHighlight(el, highlightText);
                        }
                    }
                    
                    scope.$watch(attrs.bbHighlight, function () {
                        highlight();
                    });

                    if (attrs.bbHighlightBeacon) {
                        scope.$watch(attrs.bbHighlightBeacon, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.$evalAsync(highlight);
                            }
                        }, true);
                    }
                    
                    if (attrs.ngBind) {
                        scope.$watch(attrs.ngBind, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                highlight();
                            }
                        });
                    }
                },
                priority: 1, // Make sure ng-bind (which has a priortiy of 0) is processed before this
                restrict: 'A'
            };
        }]);
}());

/*global angular, define, enquire, require */

/** @module Media Breakpoints
@icon mobile
@summary The media breakpoints service calls callback functions when a Bootstrap grid system breakpoint is hit to manipulate the user interface programmatically when CSS media queries are not sufficient.
 @description The media breakpoints service can call one or more callback functions whenever a [Bootstrap grid system breakpoint](http://getbootstrap.com/css/#grid-media-queries) is hit. This allows for manipulating the UI programmatically in cases where CSS media queries are not sufficient.

### Dependencies ##

 - **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**

---

### Media Breakpoint Methods ###

 - `register(callback)` Registers a callback method with the service that will be called any time a media breakpoint is hit. The callback function will be called with the following arguments:
  - `breakpoint` An object with `xs`, `sm`, `md` and `lg` properties. The property corresponding with the current breakpoint will be set to `true` and the rest set to `false`.
 - `unregister(callback)` Unregisters the specified callback method. This should be called whenever the controller's `$scope` is destroyed.
 - `getCurrent()` Gets the current media breakpoint object.
 */

(function () {
    'use strict';

    var mediaBreakpointsConfig = {
            mediaQueries: {
                xs: '(max-width: 767px)',
                sm: '(min-width: 768px) and (max-width: 991px)',
                md: '(min-width: 992px) and (max-width: 1199px)',
                lg: '(min-width: 1200px)'
            }
        },
        bp = {},
        handlers = [],
        mediaBreakpoints;



    function runRegisterEnquire($window, $timeout) {
        function registerEnquire(enquire) {
            var mediaQueries = mediaBreakpointsConfig.mediaQueries,
                p;

            function updateStatus(newSize) {
                var handler,
                    i;
                bp.xs = bp.sm = bp.md = bp.lg = false;
                bp[newSize] = true;

                for (i = 0; i < handlers.length; i += 1) {
                    handler = handlers[i];

                    /*istanbul ignore else */
                    if (handler) {
                        handler(bp);
                    }
                }
                $timeout(angular.noop);
            }


            function registerQuery(name) {
                if (!angular.isDefined(enquire.queries[mediaQueries[name]])) {
                    enquire.register(mediaQueries[name], function () {
                        updateStatus(name);
                    });
                }
            }

            for (p in mediaQueries) {
                /*istanbul ignore else */
                if (mediaQueries.hasOwnProperty(p)) {
                    registerQuery(p);
                }
            }
        }

        /* istanbul ignore next boilerplate RequireJS detection */
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            require(['enquire'], registerEnquire);
        } else if ($window.enquire) {
            // Browser globals
            registerEnquire(enquire);
        }
    }

    runRegisterEnquire.$inject = ['$window', '$timeout'];

    mediaBreakpoints = {
        register: function (callback) {
            handlers.push(callback);

            //Fire handler immediately
            callback(bp);
        },

        unregister: function (callback) {
            var i;

            for (i = 0; i < handlers.length; i += 1) {
                if (handlers[i] === callback) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        },

        getCurrent: function () {
            return bp;
        }
    };

    angular.module('sky.mediabreakpoints', [])
        .constant('bbMediaBreakpointsConfig', mediaBreakpointsConfig)
        .run(runRegisterEnquire)
        .factory('bbMediaBreakpoints', [function () {
            return mediaBreakpoints;
        }]);
}());

/*jshint browser: true */
/*global angular, jQuery */

/** @module Modal
@icon list-alt
@summary The modal component launches modals in a way that is consistent with Sky UX applications.
 @description The modal directive and service can be used to launch modals in a consistent way in a Sky UX application. Rather than using the ui-bootstrap `$modal.open`, use `bbModal.open` instead. This takes the same options object but allows for some custom default behaviors in Sky UX.

In addition to the `bbModal` service for lauching modals, a `bb-modal` directive should be used to have common look-and-feel for modal content. Within `bb-modal`, use `bb-modal-header` to include a common modal header, `bb-modal-footer` to include a common modal footer and buttons, and `bb-modal-body` to wrap the modal's body content.

### Modal Header Settings ###

 - `bb-modal-help-key` Specifies the help key for the modal. This will be be linked from a help button included in the modal header.

### Modal Footer Buttons ##

 - `bb-modal-footer-button` Generic button for the modal footer. HTML included in this tag will be included in the contents of the button. You must register events for the button manually.

 - `bb-modal-footer-button-primary` Primary button for the modal footer which will have a custom look.  Default content is 'Save', but HTML included in this tag will be included as the contents of the button if provided. You must register events for the button manually.

 - `bb-modal-footer-button-cancel` Cancel button for the modal footer. Default content is 'Cancel', but HTML included in this tag will be included as the contents of the button if provided. This button automatically cancels the modal form.

 */

(function ($) {
    'use strict';

    var openModalCount = 0;

    angular.module('sky.modal', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .factory('bbModal', ['$modal', '$window', function ($modal, $window) {
            return {
                open: function (opts) {
                    var bodyEl,
                        isIOS,
                        modalInstance,
                        scrollTop;

                    function modalClosed() {
                        openModalCount--;
                        if (isIOS) {
                            bodyEl
                                .removeClass('bb-modal-open-mobile')
                                .scrollTop(scrollTop);
                        }

                        bodyEl = null;
                    }

                    isIOS = /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                    bodyEl = $(document.body);

                    // Change default values for modal options
                    opts = angular.extend({
                        backdrop: 'static',
                        windowClass: 'bb-modal'
                    }, opts);

                    // Mobile browsers exhibit weird behavior when focusing on an input element
                    // inside a position: fixed element (in this case the modal), and it also
                    // doesn't propery prohibit scrolling on the window.  Adding this CSS class
                    // will change the body position to fixed and the modal position to absolute
                    // to work around this behavior.
                    if (isIOS) {
                        // Setting the body position to be fixed causes it to be scrolled to the
                        // top.  Cache the current scrollTop and set it back when the modal is
                        // closed.
                        scrollTop = bodyEl.scrollTop();
                        bodyEl.addClass('bb-modal-open-mobile');
                    }

                    modalInstance = $modal.open(opts);
                    openModalCount++;

                    modalInstance.result.then(modalClosed, modalClosed);

                    return modalInstance;
                }
            };
        }])
        .directive('bbModal', ['$timeout', function ($timeout) {
            function getPixelValue(val) {
                val = val || '0';

                return parseFloat(val.replace('px', ''));
            }

            function getModalBodyWrapperMargin(el) {
                var margin = 0;

                while (el.not('.modal-dialog') && el.length > 0) {
                    margin += el.outerHeight() - el.height();

                    el = el.parent();
                }

                return margin;
            }

            return {
                controller: ['$scope', function ($scope) {
                    this.setBodyEl = function (bodyEl) {
                        $scope.bodyEl = bodyEl;
                    };
                }],
                replace: true,
                transclude: true,
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modal.html',
                link: function ($scope, el) {
                    var bodyEl,
                        resizeTimeout,
                        windowEl = $(window);

                    function fitToWindow() {
                        var margin,
                            modalParentEl,
                            newMaxHeight,
                            reservedHeight;

                        if (bodyEl && bodyEl.length > 0) {
                            modalParentEl = el.parents('.modal-dialog');

                            if (modalParentEl.length > 0) {
                                margin = getPixelValue(modalParentEl.css('margin-bottom')) + getPixelValue(modalParentEl.css('margin-top'));

                                reservedHeight = margin + el.find('.modal-header').outerHeight() + el.find('.modal-footer').outerHeight();

                                // Account for the border, padding, etc. of the elements that wrap the modal body.
                                reservedHeight += getModalBodyWrapperMargin(el);

                                newMaxHeight = windowEl.height() - reservedHeight;

                                bodyEl.css('max-height', newMaxHeight);
                            }
                        }
                    }

                    $scope.$watch('bodyEl', function (newValue) {
                        bodyEl = newValue;
                        fitToWindow();
                    });

                    $timeout(function () {
                        fitToWindow();
                    }, 0);

                    windowEl.on('resize.bbModal' + $scope.$id, function () {
                        $timeout.cancel(resizeTimeout);

                        resizeTimeout = $timeout(function () {
                            fitToWindow();
                        }, 250);
                    });

                    el.on('$destroy', function () {
                        windowEl.off('.bbModal' + $scope.$id);
                    });
                }
            };
        }])
        .directive('bbModalBody', function () {
            return {
                link: function (scope, el, attrs, modalCtrl) {
                    el.addClass('modal-body container-fluid');
                    modalCtrl.setBodyEl(el);
                },
                require: '^bbModal',
                restrict: 'A'
            };
        })
        .directive('bbModalHeader', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalheader.html',
                scope: {
                    bbModalHelpKey: '='
                }
            };
        })
        .directive('bbModalFooter', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooter.html'
            };
        })
        .directive('bbModalFooterButton', function () {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbutton.html'
            };
        })
        .directive('bbModalFooterButtonPrimary', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
                    }
                }
            };
        }])
        .directive('bbModalFooterButtonCancel', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
                    }
                }
            };
        }]);
}(jQuery));

/*global angular, define, require */

/** @module Moment
@icon clock-o
@summary The moment module use the moment.js library to parse, validate, manipulate, or display dates.
@description The moment module allows you to use the [moment](http://momentjs.com/) library.
*/

(function () {
    'use strict';

    function bbMoment($window) {
        return $window.moment;
    }

    bbMoment.$inject = ['$window'];

    /*istanbul ignore next boilerplate require gunk */
    function runRegisterMoment($window) {

        function registerMoment(moment) {
            $window.moment = moment;
        }

        if (angular.isUndefined($window.moment) && typeof define === 'function' && define.amd) {
            require(['moment'], registerMoment);
        }
    }

    runRegisterMoment.$inject = ['$window'];

    angular.module('sky.moment', [])
        .run(runRegisterMoment)
        .factory('bbMoment', bbMoment);

}());

/*global angular, jQuery */

/** @module Navbar
@icon compass
@summary The navbar creates a Bootstrap `nav` element and applies Sky UX classes to it.
 @description The navbar directive creates a Bootstrap `nav` element with the appropriate Sky UX classes applied to it and its children, and also adds behavior such as showing sub-navigation items when the user hovers over the dropdown. If you do not wish to use the omnibar for collapsing the navbar into a mobile menu on small screens, then place the `bb-navbar-showmobile` class on the `bb-navbar` directive.
 */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    angular.module('sky.navbar', [])
        .directive('bbNavbar', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'sky/templates/navbar/navbar.html',
                link: function (scope, el) {
                    /*jslint unparam: true */
                    $(el).on('mouseenter', '.dropdown', function () {
                        toggleOpen(this, 'add');
                    }).on('mouseleave', '.dropdown', function () {
                        toggleOpen(this, 'remove');
                    }).on('click', '.dropdown-menu a', function () {
                        toggleOpen($('.dropdown', el), 'remove');
                    });
                }
            };
        });
}(jQuery));

/*global angular, jQuery */

(function ($) {
    'use strict';

    angular.module('sky.omnibar', [])
        .constant('bbOmnibarConfig', {
            appLookupUrl: '',
            enableHelp: false,
            enableSearch: false,
            productId: 'Sky',
            searchPlaceholder: 'Search',
            serviceName: 'Sky',
            signOutUrl: '',
            tenantId: '',
            url: 'https://signin.blackbaud.com/omnibar.min.js'
        })
        .directive('bbOmnibar', ['$window', 'bbOmnibarConfig', function ($window, bbOmnibarConfig) {
            return {
                transclude: true,
                template: '<div class="bb-omnibar-wrap"></div><div class="bb-omnibar-menu-wrap" ng-transclude></div>',
                link: function (scope, el) {
                    var omnibarEl = el.children('.bb-omnibar-wrap'),
                        omnibarMenuEl = el.find('.bb-omnibar-menu-wrap .bb-omnibar-menu');

                    function afterLoad() {
                        var searchBox = omnibarEl.find('.searchbox'),
                            searchContainer = omnibarEl.find('.searchContainer'),
                            searchValue;

                        // No longer need this holding div now that the menu was moved into the right location in the omnibar.
                        el.children(".bb-omnibar-menu-wrap").remove();

                        if (omnibarEl.find(".mobile .productmenucontainer").length === 0) {
                            $(".bb-navbar").addClass("bb-navbar-showmobile");
                        }

                        searchBox.attr('placeholder', bbOmnibarConfig.searchPlaceholder);

                        scope.searchBox = searchBox;

                        searchBox.on('keyup', function (event) {
                            var value = searchBox.val();

                            /*istanbul ignore else */
                            if (value !== searchValue) {
                                searchValue = value;

                                scope.searchText = value;
                                scope.$apply();
                            }

                            scope.$emit('searchBoxKeyUp', event.keyCode);
                        });

                        scope.$watch('searching', function (searching) {
                            if (searching) {
                                searchContainer.addClass('searching');
                            } else {
                                searchContainer.removeClass('searching');
                            }
                        });

                        scope.$watch('searchText', function (searchText) {
                            searchText = searchText || '';
                            if (searchText !== searchBox.val()) {
                                searchValue = searchText;
                                searchBox.val(searchText);
                            }
                        });

                        scope.$apply();

                        if (angular.isFunction(bbOmnibarConfig.afterLoad)) {
                            /* jshint validthis: true */
                            bbOmnibarConfig.afterLoad.apply(this, arguments);
                        }
                    }

                    function userLoaded(userData) {
                        var omnibarIndicatesNullUserTime;

                        //If the user ID loaded in the omnibar does not match the user who loaded the page, sign the
                        //user out of the application.  This will result in a redirect back to the auth size to update
                        //the user's claims or ask the user to log back in.
                        if (userData.id !== bbOmnibarConfig.authenticationUserId && bbOmnibarConfig.signOutUrl) {

                            if (userData.id === null) {
                                //If userData.id ==null then it may just means the omnibar is stale or there was a problem
                                //with the interaction of the omnibar and the rex shell SPA client side code.
                                //
                                //If we can use localStorage to track data across sessions, then attempt to log out of NXT once
                                //and see if this fixes it, but avoid an infinite redirect loop with the Auth Svc.
                                //
                                //If the browser doesn't support localStorage, then just return.
                                //
                                //If we don't back to the auth sign in site here, then it will just stay on the current page
                                //with the understanding that the omnibar may be in a state of acting as though the user
                                //is signed out.  The page is still secure because the Auth claims are evaluated on the server.
                                //This special case is just about dealing with an edge case issue with client side javascript.
                                if ($window.localStorage) {
                                    omnibarIndicatesNullUserTime = $window.localStorage.omnibarIndicatesNullUserTime;
                                    
                                    if (omnibarIndicatesNullUserTime && (new Date() - Date.parse(omnibarIndicatesNullUserTime)) / 1000 <= 10) {
                                        // We just looped through Auth within the last 10 seconds, so don't leave again now.
                                        return;
                                    }

                                    try {
                                        // Stash the time that we're doing this redirect to avoid infinite loops.
                                        $window.localStorage.omnibarIndicatesNullUserTime = (new Date()).toString();
                                    } catch (e) {
                                        // Safari private browsing will throw an exception on setting localStroage.
                                        /*istanbul ignore next: super edge case */
                                        return;
                                    }
                                } else {
                                    return;
                                }
                            }

                            // Log out and redirect to auth service.
                            $window.location.href = bbOmnibarConfig.signOutUrl;
                        }

                        if (angular.isFunction(bbOmnibarConfig.userLoaded)) {
                            /* jshint validthis: true */
                            bbOmnibarConfig.userLoaded.apply(this, arguments);
                        }
                    }

                    $.ajax({
                        cache: true,
                        dataType: 'script',
                        url: bbOmnibarConfig.url
                    }).done(function () {
                        var loadOptions = angular.extend({}, bbOmnibarConfig, {
                            afterLoad: afterLoad,
                            userLoaded: userLoaded,
                            menuEl: omnibarMenuEl
                        });

                        $window.BBAUTH.Omnibar.load(omnibarEl, loadOptions);
                    });
                }
            };
        }])
        .directive('bbOmnibarMenu', function () {
            return {
                replace: true,
                require: '^bbOmnibar',
                restrict: 'E',
                transclude: true,
                template: '<div class="bb-omnibar-menu" ng-transclude></div>'
            };
        });
}(jQuery));

/*global angular */

/** @module Page
@icon file-o
@summary The page component handles functionality around loading pages.
 @description The page directive provides functionality around loading pages.

### Page Settings ###

 - `bb-page-status` The status of the page.
    - `LOADING` Denotes the page is currently loading.
    - `LOADED` Denotes the page has successfully finished loading.
    - `NOT_AUTHORIZED` Denotes the page has finished loading and should show the unauthorized content.
    - `NOT_FOUND` Denotes the page is has finished loading and should redirect to the not found page.
 - `bb-page-uses-load-manager` Allow the page to use the bb-data load manager.
 */

(function () {
    'use strict';

    angular.module('sky.page', [])
        .constant('bbPageConfig', {
            redirectUrl: null,
            notFoundUrl: null
        })
        .factory('bbPage', [function () {
            var pageStatuses;

            pageStatuses = {
                LOADING: 0,
                LOADED: 1,
                NOT_AUTHORIZED: 2,
                //ERROR: 3,
                NOT_FOUND: 4
            };

            return {
                pageStatuses: pageStatuses
            };
        }])
        .directive('bbPage', ['$window', 'bbResources', 'bbPage', 'bbPageConfig', 'bbData', '$location',
            function ($window, bbResources, bbPage, bbPageConfig, bbData, $location) {
                function link(scope, element) {
                    var loadManager,
                        locals;

                    function navigateAway() {
                        $window.location.href = bbPageConfig.redirectUrl || $window.location.origin;
                    }

                    function noPageStatusSpecified() {
                        return element.attr('bb-page-status') === undefined;
                    }

                    function onShowing() {
                        if (scope.bbPageUsesLoadManager) {
                            loadManager = locals.loadManager = bbData.loadManager({
                                scope: scope,
                                waitForFirstItem: true,
                                nonblockWaitForAdditionalItems: true,
                                isAggregate: true
                            });
                        }
                    }

                    locals = scope.locals = {
                        navigateAway: navigateAway,
                        noPageStatusSpecified: noPageStatusSpecified,
                        pageStatuses: bbPage.pageStatuses,
                        onShowing: onShowing
                    };

                    scope.resources = bbResources;

                    scope.$watch('bbPageStatus', function (value, oldValue) {
                        scope.value = "something";
                        scope.oldValue = oldValue;

                        if (!value) {
                            scope.$emit("bbBeginWait");
                        } else if (value && !oldValue) {
                            scope.$emit("bbEndWait");
                        }

                        if (value === locals.pageStatuses.NOT_AUTHORIZED) {
                            if (loadManager) {
                                loadManager.cancelWaiting();
                            }
                        } else if (value === locals.pageStatuses.NOT_FOUND) {
                            if (loadManager) {
                                loadManager.cancelWaiting();
                            }

                            $location.path(bbPageConfig.notFoundUrl).replace();
                        }

                    });
                }

                return {
                    restrict: 'E',
                    scope: {
                        bbPageStatus: '=?',
                        bbPageUsesLoadManager: '@?'
                    },
                    templateUrl: 'sky/templates/page/page.html',
                    transclude: true,
                    link: link
                };
            }]);
}());

/*global angular */

/** @module Pagination
@icon files-o
@summary The pagination component displays data across multiple pages and inserts a pagination control to page through the data.
 @description The pagination directive allows list data to be displayed across multiple pages. When the number of items in the list exceeds the page size, a pagination control is displayed.

The `bb-pagination-content` directive and the `bbPaging` service are used in conjunction with this directive. The `bb-pagination-content` is used to wrap the paged content so that the height of the wrapper can be kept as a constant height across pages regardless of contents. When the list data is bound, the height of the largest page will be used for the wrapper so that the height of the list will not fluctuate as the user pages through it.
The `bbPaging` service is used to create the paged data and responds to changes in the pagination directive.

### Pagination Settings ###

 - `bb-pagination` The paged data initialized by the `bbPaging` service.
 - `bb-pagination-disabled` Determines whether the use can interact with the pagination control.

### Pagination Content Settings ##

 - `bb-pagination-content` The paged data initialized by the `bbPaging` service.

### Paging Settings ##
These are optional properties of the object passed to `bbPaging.init()`

 - `currentPage` *(Default: `1`)* The initial page to display.
 - `itemsPerPage` *(Default: `5`)* The number of items to display per page.
 */

(function () {
    'use strict';

    var evtNsPos = 0;

    angular.module('sky.pagination', ['ui.bootstrap.pagination'])
        .config(['paginationConfig', function (paginationConfig) {
            paginationConfig.maxSize = 4;
            paginationConfig.itemsPerPage = 5;

            paginationConfig.nextText = paginationConfig.previousText = '';
        }])
        .factory('bbPaging', function () {
            return {
                init: function (sourceData, config) {
                    var paging;

                    function setPageData() {
                        var startingIndex,
                            currentPage;

                        if (!paging.disabled && sourceData) {
                            currentPage = paging.currentPage - 1; // 1-based

                            startingIndex = currentPage * paging.itemsPerPage;
                            paging.items = sourceData.slice(startingIndex, startingIndex + paging.itemsPerPage);
                        }
                    }

                    paging = {
                        currentPage: 1,
                        itemsPerPage: 5,
                        totalItems: sourceData ? sourceData.length : 0,
                        pageChanged: setPageData
                    };

                    angular.extend(paging, config);

                    setPageData();

                    return paging;
                }
            };
        })
        .directive('bbPagination', function () {
            return {
                restrict: 'A',
                scope: {
                    paginationDisabled: '=bbPaginationDisabled'
                },
                compile: function (el, attrs) {
                    var pagedData = attrs.bbPagination;

                    /*jslint white: true */
                    el.html(
                        '<pagination ng-show="' + pagedData + '.totalItems > ' + pagedData + '.itemsPerPage" total-items="' + pagedData + '.totalItems" ng-model="' + pagedData + '.currentPage" ng-change="' + pagedData + '.pageChanged()" items-per-page="' + pagedData + '.itemsPerPage"></pagination>' +
                        '<div class="clearfix"></div>'
                    );
                    /*jslint white: false */

                    return function (scope, el) {
                        scope.$watch('paginationDisabled', function (newValue) {
                            var paginationDummyEl,
                                paginationEl;

                            // Since we don't have complete control over the Angular Bootstrap UI pagination directive,
                            // we can't disable it directly.  Instead just clone the pagination element, disable it
                            // and show it while hiding the original element when pagination is disabled.
                            if (angular.isDefined(newValue)) {
                                paginationEl = el.find('.pagination');

                                if (newValue) {
                                    paginationDummyEl = paginationEl
                                        .clone()
                                        .addClass('bb-pagination-dummy');

                                    paginationEl
                                        .before(paginationDummyEl)
                                        .hide();

                                    paginationDummyEl.find('li').addClass('disabled');
                                } else {
                                    el.find('.bb-pagination-dummy').remove();
                                    paginationEl.show();
                                }
                            }
                        });
                    };
                }
            };
        })
        .directive('bbPaginationContent', ['$timeout', '$window', function ($timeout, $window) {
            return {
                link: function (scope, el) {
                    var evtNs;

                    evtNsPos += 1;

                    evtNs = "bbPaginationContent" + evtNsPos;

                    function removeWindowResizeHandler() {
                        angular.element($window).off('.' + evtNs);
                    }

                    scope.$watch('pagedData', function () {
                        var pageCount,
                            pagedData,
                            tries = 0,
                            windowResizeTimeout;

                        // Try for 1 second to set a min-height on paged data so the paging bar doesn't jump
                        // up when the user hits a page with less than the max number of items.
                        function trySetMinHeight() {
                            $timeout(function () {
                                var currentPage,
                                    height = el.height(),
                                    i,
                                    maxHeight = 0;

                                function changePage(pageNumber) {
                                    pagedData.currentPage = pageNumber;
                                    pagedData.pageChanged();

                                    scope.$apply();
                                }

                                if (height === 0 && tries < 5) {
                                    tries += 1;
                                    trySetMinHeight();
                                    return;
                                }

                                el.addClass('bb-pagination-content bb-pagination-content-calculating');

                                // Cache the current page so we can put it back.
                                currentPage = pagedData.currentPage;

                                // Reset the min height from any previous iteration.
                                el.css('min-height', 0);

                                // Navigate through each page and find the tallest page.
                                for (i = 1; i <= pageCount; i += 1) {
                                    changePage(i);
                                    maxHeight = Math.max(el.height(), maxHeight);
                                }

                                // Set the min height to the height of the tallest page.
                                el.css('min-height', maxHeight);

                                // Navigate back to the initial page.
                                changePage(currentPage);

                                el.removeClass('bb-pagination-content-calculating');
                            }, 200);
                        }

                        pagedData = scope.pagedData;

                        if (angular.isDefined(scope.pagedData)) {
                            pageCount = Math.ceil(pagedData.totalItems / (pagedData.itemsPerPage || 1));

                            if (pageCount > 1) {
                                trySetMinHeight();

                                removeWindowResizeHandler();

                                angular.element($window).on('resize.' + evtNs, function () {
                                    if (windowResizeTimeout) {
                                        $timeout.cancel(windowResizeTimeout);
                                    }

                                    windowResizeTimeout = $timeout(trySetMinHeight, 500);
                                });

                                el.on('$destroy', removeWindowResizeHandler);
                            }
                        }
                    });
                },
                scope: {
                    pagedData: '=bbPaginationContent'
                }
            };
        }]);
}());

/*jshint unused: false */
/*global angular, bbPaletteConfig */

(function () {
'use strict';

var bbPaletteConfig;

/* LINES BELOW ARE AUTO GENERATED */
bbPaletteConfig = {
    "multi": [
        "#1f91da",
        "#f9b66d",
        "#1dc8a6",
        "#9176c6",
        "#28d7d9",
        "#ef6977",
        "#919191",
        "#7ec2ed",
        "#fbcf9f",
        "#75ebd3",
        "#beaedd",
        "#85e8ea",
        "#f59ca6",
        "#afafaf"
    ],
    "mono": [
        "#156395",
        "#1c84c6",
        "#44a6e5",
        "#83c4ed",
        "#c1e1f6"
    ]
};

angular.module('sky.palette.config', [])
    .constant('bbPaletteConfig', bbPaletteConfig);

}());

/*global angular */

/** @module Palette
@icon paint-brush
@summary The palette service provides methods for consistently producing a sequence of colors for Sky.
@description The palette service gives you the following functions:

  - `getColorByIndex(index, paletteType)` Get a specific color by it's index in the palette.
    - 'index' A required integer for the index of the color.
    - 'paletteType' An optional string representing either `mono` or the default `multi`.
  - `getColorSequence(requestedLength, paletteType)` Returns an array of colors for the requested length.  When using with `ng-repeat`, be sure to use the `track by` syntax since we return duplicates.
    - 'requestedLength' A required integer for the size of the array of colors you want returned.
    - 'paletteType' An optional string representing either `mono` or the default `multi`.

*/

(function () {
    'use strict';

    angular.module('sky.palette', ['sky.palette.config'])
        .factory('bbPalette', ['bbPaletteConfig', function (bbPaletteConfig) {

            function getPaletteByType(paletteType) {
                return bbPaletteConfig[paletteType || 'multi'];
            }

            return {
                getColorByIndex: function (index, paletteType) {
                    var palette = getPaletteByType(paletteType);
                    return palette[index % palette.length];
                },
                getColorSequence: function (requestedLength, paletteType) {

                    var i,
                        palette = getPaletteByType(paletteType),
                        paletteLength,
                        r = [];

                    paletteLength = palette.length;
                    requestedLength = requestedLength || paletteLength;

                    for (i = 0; i < requestedLength; i++) {
                        r.push(palette[i % paletteLength]);
                    }

                    return r;
                }
            };
        }]);
}());

/*global angular, jQuery */

/** @module Popover
@icon newspaper-o
@summary The popover component wraps the Angular UI Bootstrap popover directive to create an HTML-formatted popover that is displayed by a trigger element.
 @description The `bb-popover-template` directive enables an HTML-formatted popover to be displayed via a trigger element. This directive is an alternative to the `popover` directive from Angular UI Bootstrap, making it easier to define markup in a template rather than directly in the view's controller.

The `bb-popover-template` attribute should specify a URL for a template in the `$templateCache` that will be used as the popover content. The scope applied to this template inherits the current scope. A `hide` function is also
provided on the scope to dismiss the popover.

The directive is built as a thin wrapper of the [Angular UI Bootstrap Popover](http://angular-ui.github.io/bootstrap/) directive and supports all of it's optional properties.
 */

(function ($) {
    'use strict';

    angular.module('sky.popover', ['sky.data'])
        .directive('bbPopoverTemplatePopup', ['$templateCache', '$compile', '$timeout', '$window', function ($templateCache, $compile, $timeout, $window) {
            return {
                restrict: 'EA',
                replace: true,
                scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
                templateUrl: 'sky/templates/popover/popup.html',
                compile: function () {
                    return function ($scope, el) {
                        var compiledEl,
                            html = $templateCache.get($scope.content),
                            origScope,
                            popoverFlyoutScope,
                            popoverTriggerScope,
                            windowEl = $($window);

                        function removeTooltip() {
                            /*istanbul ignore else: sanity check */
                            if (el) {
                                el.remove();
                                el = null;
                            }
                            /*istanbul ignore else: sanity check */
                            if (popoverFlyoutScope) {
                                popoverFlyoutScope.$destroy();
                                popoverFlyoutScope = null;
                            }
                        }

                        function windowClickHandler(e) {
                            if (!el.is(e.target) && el.has(e.target).length === 0) {
                                $scope.$apply(function () {
                                    popoverFlyoutScope.hide();
                                });
                            }
                        }

                        //Get the scope of the popover directive.
                        popoverTriggerScope = $scope.$parent.$parent;

                        //Get the original scope that contains the popover directive
                        origScope = popoverTriggerScope.$parent;

                        //Create a new scope that will be bound to the template inside the flyout.  Base
                        //this scope on the original scope that contained the popover directive.
                        popoverFlyoutScope = origScope.$new();

                        popoverFlyoutScope.hide = function () {
                            $scope.$parent.$parent.isOpen = false;

                            //Borrowed from $tooltip, need to remove the item after the animation
                            $timeout(removeTooltip, 500);
                        };

                        $scope.$watch('isOpen()', function (value) {
                            if (value) {
                                $timeout(function () {
                                    windowEl.on('click', windowClickHandler);
                                });
                            } else {
                                windowEl.off('click', windowClickHandler);
                            }
                        });

                        compiledEl = $compile(html)(popoverFlyoutScope);
                        el.find('.popover-content').html(compiledEl);
                        popoverFlyoutScope.$apply();
                    };
                }
            };
        }])
        .directive('bbPopoverTemplate', ['$tooltip', function ($tooltip) {
            return $tooltip('bbPopoverTemplate', 'popover', 'click');
        }]);
}(jQuery));

/*global angular */

(function () {
    'use strict';

    var serviceModules = [];
    
    function bbResoucesFilter(bbResources) {
        return function (name) {
            return bbResources[name];
        };
    }
    
    bbResoucesFilter.$inject = ['bbResources'];

    angular.module('sky.resources', serviceModules)
        .constant('bbResources', {
            /* Strings are defined in separate JSON files located in js/sky/locales. */
        })
        .filter('bbResources', bbResoucesFilter);
}());
/*jshint browser: true */
/*global angular */

/** @module Scroll into View
@icon eye
@summary The scroll-into-view component causes an element to scroll into the viewport when its bound value changes.
 @description The scroll-into-view directive causes an element to scroll into the viewport whenever its bound value changes.

### Scroll-into-view Settings ###

 - `bb-scroll-into-view` The value that triggers the scroll.
 - `bb-scroll-into-view-highlight` A Boolean indicating whether the element should be highlighted when scrolling completes.
*/

(function () {
    'use strict';

    var CLS_HIGHLIGHTING = 'bb-scroll-into-view-highlighting',
        RETRY_INTERVAL = 100,
        RETRY_MAX = 10;

    angular.module('sky.scrollintoview', [])
        .constant('bbScrollIntoViewConfig', {
            reservedBottom: 0,
            reservedTop: 0
        })
        .factory('bbScrollIntoView', ['$window', 'bbScrollIntoViewConfig', function ($window, bbScrollIntoViewConfig) {
            function highlightEl(el, options) {
                if (options.highlight) {

                    // The automatic CSS class removal should be factored out once we have some more instances
                    // where we use animations.
                    el
                        .addClass(CLS_HIGHLIGHTING)
                        .one(
                            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                            /*istanbul ignore next */
                            function () {
                                el.removeClass(CLS_HIGHLIGHTING);
                            }
                        );
                }
            }

            function getScrollableParentEl(el) {
                var overflowY,
                    parentEl = el.parent();

                while (parentEl.length > 0) {
                    if (parentEl.is('body')) {
                        return parentEl;
                    }

                    overflowY = parentEl.css('overflow-y');

                    /*istanbul ignore else: sanity check (the computed overflow property will likely never return a non-string value) */
                    if (angular.isString(overflowY)) {
                        switch (overflowY.toUpperCase()) {
                        case 'AUTO':
                        case 'HIDDEN':
                        case 'SCROLL':
                            return parentEl;
                        }
                    }

                    parentEl = parentEl.parent();
                }
            }

            function getHtmlOrBodyScrollTop() {
                return angular.element('html').scrollTop() || angular.element('body').scrollTop();
            }

            function scrollIntoView(el, options) {
                var currentScrollTop,
                    elBottom,
                    elHeight,
                    elOffset,
                    elTop,
                    elToScroll,
                    isScrolledOffBottom,
                    isScrolledOffTop,
                    newScrollTop,
                    parentEl,
                    parentElIsBody,
                    parentHeight,
                    reservedBottom,
                    reservedTop,
                    viewportHeight;

                parentEl = getScrollableParentEl(el);
                parentElIsBody = parentEl.is('body');

                options = options || {};

                reservedBottom = options.reservedBottom;
                reservedTop = options.reservedTop;

                if (!angular.isDefined(reservedBottom)) {
                    reservedBottom = 0;

                    if (parentElIsBody) {
                        reservedBottom = bbScrollIntoViewConfig.reservedBottom || 0;
                    }
                }

                if (!angular.isDefined(reservedTop)) {
                    reservedTop = 0;

                    if (parentElIsBody) {
                        reservedTop = bbScrollIntoViewConfig.reservedTop || 0;
                    }
                }

                if (options.highlight) {
                    reservedBottom += 50;
                    reservedTop += 50;
                }

                if (parentElIsBody) {
                    currentScrollTop = getHtmlOrBodyScrollTop();
                } else {
                    currentScrollTop = parentEl.scrollTop();
                }

                elOffset = el.offset();
                elHeight = el.outerHeight();

                elTop = elOffset.top;

                if (!parentElIsBody) {
                    elTop = (elTop - parentEl.offset().top) + currentScrollTop;
                }

                elBottom = elTop + elHeight;

                parentHeight = parentElIsBody ? angular.element(window).height() : parentEl.height();

                isScrolledOffBottom = elBottom > parentHeight + (currentScrollTop - reservedBottom);
                isScrolledOffTop = elTop < (currentScrollTop + reservedTop);

                if (isScrolledOffBottom || isScrolledOffTop) {
                    if (isScrolledOffBottom) {
                        newScrollTop = elBottom - (parentHeight - reservedBottom);
                    }

                    viewportHeight = parentHeight - (reservedTop + reservedBottom);

                    // Ensure the top of the element is visible after scrolling even if it is currently
                    // scrolled off the bottom of the viewport.
                    if (!isScrolledOffBottom || elHeight > viewportHeight) {
                        newScrollTop = elTop - reservedTop;
                    }

                    elToScroll = parentElIsBody ? angular.element('html, body') : parentEl;

                    elToScroll.animate(
                        {
                            scrollTop: Math.round(newScrollTop)
                        },
                        {
                            duration: 250,
                            always: function () {
                                highlightEl(el, options);
                            }
                        }
                    );
                } else {
                    highlightEl(el, options);
                }
            }

            return scrollIntoView;
        }])
        .directive('bbScrollIntoView', ['$timeout', 'bbScrollIntoViewConfig', 'bbScrollIntoView', function ($timeout, bbScrollIntoViewConfig, bbScrollIntoView) {
            function link(scope, el, attrs) {
                var options,
                    previousTimeout,
                    retryCount;

                function doScroll(firstTry) {
                    if (previousTimeout) {
                        // Make sure any pending scrolling is canceled.
                        $timeout.cancel(previousTimeout);
                    }

                    if (firstTry) {
                        retryCount = 0;
                    }

                    /*istanbul ignore else: hard to reach in a unit test */
                    if (el.is(':visible') && el.children('.collapsing').length === 0) {
                        options = angular.extend({}, bbScrollIntoViewConfig);

                        if (attrs.bbScrollIntoViewHighlight) {
                            options.highlight = scope.$eval(attrs.bbScrollIntoViewHighlight);
                        }

                        bbScrollIntoView(el, options);
                    } else if (retryCount < RETRY_MAX) {
                        // Keep trying to scroll until the element is visible or we run out of retry attempts.
                        retryCount++;
                        previousTimeout = $timeout(doScroll, RETRY_INTERVAL);
                    }
                }

                /*istanbul ignore else: sanity check */
                if (attrs.bbScrollIntoView) {
                    scope.$watch(attrs.bbScrollIntoView, function (newValue, oldValue) {
                        if (newValue && newValue !== oldValue) {
                            doScroll(true);
                        }
                    });
                }
            }

            return {
                link: link,
                restrict: 'A'
            };
        }]);
}());

/*jslint browser: true */
/*global angular, jQuery */

/** @module Search Field
@icon search
@summary The search field builds single- and multi-search fields for local searches or for remote searches of larger datasets on a server.
 @description The search field directive allows you to easily build single- and multi-search fields that can be filtered as the user types. This directive uses all the syntax and settings of the `ui-select` third party control (see the `ui-select` documentation for more information, options, and settings).

The search field can be used for a local search (i.e. dropdown box where you have all the data already loaded), or it can be used for a remote search to search larger datasets on a server.  Both types support single- and multi-search capabilities.

### Dependencies ###

 - **[ui-select](https://github.com/angular-ui/ui-select) (0.11.0 or higher - .js and .css files needed)**

---

### Local Search Settings ###

 - `ui-select-choices`
   - `repeat` Required. An expression that defines the array of choices.  If a `filter` is included, then the choices will be filtered by what the user types, otherwise it will behave just a like a normal dropdown box.  See the `ui-select` documentation for more information.

### Remote Search Settings ###

 - `ui-select-choices`
   - `repeat` Required. An expression that defines the array of choices that will be populated from a remote server.  See the `ui-select` documentation for more information.
   - `refresh` Required. A function call to load the results from a remote server. The function should at least take `$select.search` as a parameter, and it should guard against calling the remote server with an empty search value.
     - ***NOTE:** The search control needs to know when you get results back from the server in order to properly display a "no results" message when necessary.  In your refresh function, after you receive and store the results, then you MUST fire the `bbSearchFinished` event like this:  `$scope.$broadcast('bbSearchFinished');`.*
   - `refresh-delay` Optional. The delay in milliseconds after the last keystroke before kicking off the remote search. Default from `ui-select` is 1000 ms.

### Single Search Settings ###

 - `ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$select.selected` syntax.
   - `allow-clear` Optional. Allows you to clear the current value by rendering an "X" button.
   - `placeholder` Optional. Default text when no selection is present.

### Multiple Search Settings ###

 - `ui-select`
   - `multiple` Required. Styles the search to accept multiple search values.
 - `ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$item` syntax.
   - `placeholder` Optional. Default text when no selection is present.
 */

(function ($) {
    'use strict';

    angular.module('sky.searchfield', ['sky.resources'])
        .directive('uiSelectMatch', ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var selectContainerEl,
                        origSizeSearchInputFunc,
                        matchEl,
                        windowResizeTimeout;

                    function sizeMatchItems() {
                        //The main logic flow for this function was taken from the ui-select's "sizeSearchInput()" function.
                        //Some things are done below in order to give the tags time to render before we try to fix any
                        //text overflow issues that may be present.

                        function updateIfVisible(containerOffsetWidth) {
                            var visible = (containerOffsetWidth > 0);

                            if (visible) {
                                //Get the container width minus any padding
                                containerOffsetWidth -= containerOffsetWidth - angular.element(selectContainerEl).width();

                                //For each match item, set the properly width so that text overflows properly
                                matchEl.find('.ui-select-match-item').css({
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: containerOffsetWidth
                                });
                            }

                            return visible;
                        }

                        $timeout(function () { //Give tags time to render correctly
                            updateIfVisible(selectContainerEl.offsetWidth);
                        });
                    }

                    if ($select.multiple) {
                        matchEl = element;
                        selectContainerEl = matchEl.parent().parent()[0];
                        origSizeSearchInputFunc = $select.sizeSearchInput;

                        //Hook into the ui-select function that controls resizing for multi search
                        $select.sizeSearchInput = function () {
                            origSizeSearchInputFunc();
                            sizeMatchItems();
                        };

                        //Resize any tags on load
                        sizeMatchItems();

                        $(window).on('resize.searchField' + scope.$id, function () {
                            $timeout.cancel(windowResizeTimeout);

                            windowResizeTimeout = $timeout(function () {
                                sizeMatchItems();
                            }, 250);
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.searchField' + scope.$id);
                        });
                    }
                }
            };
        }])
        .directive('uiSelectChoices', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var searching,
                        selectContainerEl,
                        msgEl;

                    function updateUIForSearch(showSearchingMsg) {
                        var msg;

                        // Remove the no results message if it's currently displayed
                        if (msgEl) {
                            msgEl.remove();
                            msgEl = null;
                        }

                        if (searching && $select.items.length === 0) {
                            // Display the "Searching..." or "No results..." message - only when we have empty results because we
                            //don't want the message to popup over a list of results as the user types.
                            msg = showSearchingMsg ? bbResources.searchfield_searching : bbResources.searchfield_no_records;

                            msgEl = angular.element($templateCache.get('sky/templates/searchfield/choices.html'));
                            msgEl.find('.bb-searchfield-no-records').text(msg);

                            selectContainerEl.append(msgEl);
                        }
                    }

                    function clearResults() {
                        searching = false;
                        $select.items = []; // Clear out current result set
                        updateUIForSearch();
                    }

                    //Remote Searches Only
                    //If the refresh attribute is set the control is being used as a remote search
                    if (attrs.refresh) {
                        selectContainerEl = angular.element(element).parent();
                        searching = false;

                        //Watch when the search field is opened/closed so that we can update the UI and remove
                        //the no results message, and remove the results for the next search.
                        scope.$watch('$select.open', function () {
                            clearResults();
                        });

                        //Watch the search results collection for any changes.
                        //NOTE: This does NOT fire when the collection is empty and the search result
                        //comes back empty.  To handle that case, see the "bbSearchFinished" event below.
                        scope.$watchCollection('$select.items', function () {
                            updateUIForSearch();
                        });

                        //This event should be fired by the consuming code after it gets and stores the results
                        //from the remote server.  This allows us to handle the problem above where $watchCollection
                        //doesn't fire when the collection is empty and the results also come back empty.
                        scope.$on("bbSearchFinished", function () {
                            updateUIForSearch();
                        });

                        //Watch all changes to the search text that the user is typing.
                        scope.$watch('$select.search', function (search) {
                            searching = (search && search.length > 0);

                            if (searching) {
                                //Initially shows the "Searching..." message until results come back from the remote server
                                updateUIForSearch(true);
                            } else {
                                clearResults();
                            }
                        });
                    }
                }
            };
        }]);
}(jQuery));

/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

/** @module Tab Scroll
@icon arrows-h
@summary The tab scroll component makes a row of tabs horizontally scrollable when the row is wider than its container.
 @description ### Dependencies ###

The `bb-tab-scroll` directive causes the row of tabs to be horizontally scrollable when the width of the tabs exceeds the width of its container.  The tabs are also animated to indicate to the user that they can be scrolled.

### Tab Scroll Settings ###

 - `bb-tab-scroll-ready` Used to indicate the tabs are ready to be animated.  This should be used when the tabs are loaded dynamically based on some asynchronous logic like loading data from a web server.

 */

(function ($) {
    'use strict';

    var tabScrollId = 0;
    angular.module('sky.tabscroll', ['ui.bootstrap.tabs'])
        .directive('bbTabScroll', ['$timeout', '$window', function ($timeout, $window) {
            return {
                require: 'tabset',
                link: function (scope, el, attrs) {
                    var lastWindowResizeTimeout,
                        lastWindowWidth;

                    function getNavTabsEl() {
                        return el.children('.nav-tabs');
                    }

                    function getScrollLeftForEl(navTabsEl, selector) {
                        var elWidth,
                            scrollLeft,
                            tabEl,
                            tabLeft,
                            tabPosition,
                            tabRight;

                        if (angular.isString(selector)) {
                            tabEl = navTabsEl.children(selector);
                        } else {
                            tabEl = selector;
                        }

                        tabPosition = tabEl.position();

                        if (tabPosition) {
                            tabLeft = tabPosition.left;

                            if (tabLeft < 0) {
                                scrollLeft = tabLeft + navTabsEl[0].scrollLeft;
                            } else {
                                elWidth = el.width();
                                tabRight = tabLeft + tabEl.width();

                                if (tabRight > elWidth) {
                                    scrollLeft = navTabsEl[0].scrollLeft + (tabRight - elWidth);
                                }
                            }
                        }

                        return scrollLeft;
                    }

                    function getScrollLeft(navTabsEl) {
                        return getScrollLeftForEl(navTabsEl, '.active') || 0;
                    }

                    function stopAnimateTabScroll(navTabsEl) {
                        navTabsEl.stop(true, true);
                    }

                    function animateTabScroll(navTabsEl, scrollLeft, duration) {
                        stopAnimateTabScroll(navTabsEl);

                        navTabsEl
                            .animate(
                                {
                                    scrollLeft: scrollLeft
                                },
                                {
                                    duration: duration || 500
                                }
                            );
                    }

                    function showTabsCanScroll(force) {
                        var hasOverflow,
                            navTabsEl = getNavTabsEl(),
                            overflowOccurred,
                            scrollLeft;

                        /*istanbul ignore else: sanity check */
                        if (navTabsEl.length > 0) {
                            hasOverflow = angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:first')) ||
                                angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:last'));

                            force = force || angular.isDefined(getScrollLeftForEl(navTabsEl, '.active'));

                            overflowOccurred = !showTabsCanScroll.previousHadOverflow && hasOverflow;

                            if (force || overflowOccurred) {
                                scrollLeft = getScrollLeft(navTabsEl);

                                stopAnimateTabScroll(navTabsEl);

                                if (overflowOccurred) {
                                    navTabsEl.scrollLeft(navTabsEl[0].scrollWidth - el.width());
                                }

                                animateTabScroll(navTabsEl, scrollLeft);
                            }
                        }

                        showTabsCanScroll.previousHadOverflow = hasOverflow;
                    }

                    tabScrollId++;

                    el.addClass('bb-tab-scroll');

                    if (attrs.bbTabScrollReady) {
                        scope.$watch(attrs.bbTabScrollReady, function (newValue, oldValue) {
                            if (newValue && newValue !== oldValue) {
                                showTabsCanScroll(true);
                            }
                        });
                    }

                    lastWindowWidth = $($window).width();

                    // Show initial scroll animation whenever the window width changes.
                    $($window).on('resize.tabscroll' + tabScrollId, function () {
                        var windowWidth = $($window).width();

                        if (lastWindowWidth !== windowWidth) {
                            $timeout.cancel(lastWindowResizeTimeout);

                            lastWindowResizeTimeout = $timeout(function () {
                                showTabsCanScroll();
                            }, 250);
                        }

                        lastWindowWidth = windowWidth;
                    });

                    // Ensure that when a tab is clicked the tab is fully visible and not partially
                    // scrolled off either side.
                    el.on('click', '> .nav-tabs > li', function () {
                        var navTabsEl,
                            scrollLeft;

                        navTabsEl = getNavTabsEl();
                        scrollLeft = getScrollLeftForEl(navTabsEl, $(this));

                        if (angular.isDefined(scrollLeft)) {
                            animateTabScroll(navTabsEl, scrollLeft, 250);
                        }
                    });

                    el.on('$destroy', function () {
                        $($window).off('.tabscroll' + tabScrollId);
                    });
                }
            };
        }]);
}(jQuery));

/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

/** @module Tabset
@icon folder-open-o
@summary The tabset module contains directives for enhancing ui-bootstrap tabs.
 @description ### Additional Dependencies ###

### Tabset Options ###

The `bb-tabset-add` attribute creates an add button in the tab area and takes a callback that will be executed when the add button is clicked.

The `bb-tabset-open` attribute creates an open button in the tab area and takes a callback that will be executed when the open button is clicked.

### Collapsing Tabs ###

To make tabs collapse into a dropdown on a small (mobile device) screen, use the `bb-tabset-collapsible` attribute on a ui-bootstrap `tabset`.
You must then use the `bb-tab-collapse-header` attribute on your ui-bootstrap `tab` to specify a title for the dropdown that will display when a tab is active.

### Tab Close Icon ###

If you wish to add a close icon to a tab, just add the `bb-tab-close` class to the ui-bootstrap `tab` element, and add an `i` element with the `bb-tab-close-icon` class inside of the ui-bootstrap `tab-heading` directive.

 */
(function ($) {
    'use strict';

    var DROPDOWN_CARET_WIDTH = 45,
        TAB_PADDING = 15;

    function getTemplate($templateCache, name) {
        return $templateCache.get('sky/templates/tabset/' + name + '.html');
    }

    function tabset($compile, $templateCache) {
        return {
            link: function ($scope, el, attr) {
                var ulEl,
                    liEl;

                if (angular.isDefined(attr.bbTabsetAdd) || angular.isDefined(attr.bbTabsetOpen)) {
                    ulEl = el.find('ul');
                    liEl = angular.element(getTemplate($templateCache, 'tabbutton'));
                    ulEl.append(liEl);

                    if (angular.isDefined(attr.bbTabsetAdd)) {
                        liEl.append($compile(getTemplate($templateCache, 'addbutton'))($scope));

                        $scope.bbTabAdd = function () {
                            $scope.$eval(attr.bbTabsetAdd);
                        };
                    }

                    if (angular.isDefined(attr.bbTabsetOpen)) {
                        liEl.append($compile(getTemplate($templateCache, 'openbutton'))($scope));

                        $scope.bbTabOpen = function () {
                            $scope.$eval(attr.bbTabsetOpen);
                        };
                    }
                }
            }
        };
    }

    tabset.$inject = ['$compile', '$templateCache'];

    function BBTabsetCollapsibleController($scope) {
        var self = this;

        self.updateCollapsibleHeader = function (header) {
            $scope.bbTabsetOptions.selectedTabHeader = header;
        };

        self.tabAdded = function () {
            if ($scope.bbTabsetOptions.isSmallScreen) {
                $scope.setupCollapsibleTabs($scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1);
            }
            $scope.bbTabsetOptions.tabCount++;
        };

        self.tabRemoved = function () {
            $scope.bbTabsetOptions.tabCount--;
        };

    }

    BBTabsetCollapsibleController.$inject = ['$scope'];

    function bbTabsetCollapsible($compile, $templateCache, $window, bbMediaBreakpoints) {
        return {
            restrict: 'A',
            require: 'tabset',
            controller: BBTabsetCollapsibleController,
            link: function ($scope, el) {
                var lastWindowWidth,
                    tabCollapseId = $scope.$id;


                function getBootstrapTabs() {
                    return el.find('li:not(.bb-tab-button):not(.bb-tabset-dropdown)');
                }

                function getDropdownEl() {
                    return angular.element(getTemplate($templateCache, 'dropdown'));
                }

                function setTabMaxWidth() {
                    //later this will resize tabs to fit the window
                    el.find('ul.nav-tabs li a').css('max-width', '');
                }

                function setDropdownMaxWidth() {
                    var availableWidth,
                        addOpenWidth = 0,
                        addOpenButtonEl,
                        i,
                        dropdownTextMaxWidth;

                    availableWidth = el.width();

                    addOpenButtonEl = el.find('.bb-tab-button-wrap');

                    for (i = 0; i < addOpenButtonEl.length; i++) {
                        addOpenWidth += addOpenButtonEl.eq(i).width();
                    }

                    dropdownTextMaxWidth = availableWidth - addOpenWidth - DROPDOWN_CARET_WIDTH - TAB_PADDING;

                    el.find('.bb-tab-header-text').css('max-width', (dropdownTextMaxWidth.toString() + 'px'));

                    el.find('.bb-tabset-dropdown ul.dropdown-menu li a').css('max-width', (availableWidth.toString() + 'px'));

                }

                function setupCollapsibleTabs(isCollapsed) {
                    var tabsEl,
                        dropdownContainerEl,
                        ulEl,
                        dropdownButtonsEl;

                    tabsEl = getBootstrapTabs();
                    dropdownButtonsEl = el.find('.bb-tab-button-wrap');

                    ulEl = el.find('ul:not(.bb-tabset-dropdown)');
                    if (isCollapsed) {
                        dropdownContainerEl = el.find('.bb-tabset-dropdown');

                        ulEl.addClass('dropdown-menu');
                        ulEl.removeClass('nav');
                        ulEl.removeClass('nav-tabs');
                        dropdownContainerEl.append(ulEl);
                        dropdownContainerEl.append(dropdownButtonsEl);
                        setDropdownMaxWidth();
                    } else {
                        ulEl.removeClass('dropdown-menu');
                        ulEl.addClass('nav');
                        ulEl.addClass('nav-tabs');

                        el.prepend(ulEl);

                        ulEl.find('.bb-tab-button').append(dropdownButtonsEl);
                        setTabMaxWidth();
                    }
                }

                $scope.setupCollapsibleTabs = setupCollapsibleTabs;

                function mediaBreakpointHandler(newBreakpoints) {
                    $scope.bbTabsetOptions.isSmallScreen = newBreakpoints.xs;
                    setupCollapsibleTabs(newBreakpoints.xs && ($scope.bbTabsetOptions.tabCount > 1));
                }

                $scope.bbTabsetOptions = {
                    isSmallScreen: false,
                    tabCount: 0
                };

                el.prepend($compile(getDropdownEl())($scope));

                $scope.$watch('bbTabsetOptions.tabCount', function (newValue) {
                    if ($scope.bbTabsetOptions.isSmallScreen) {
                        if (newValue && newValue > 1) {
                            setupCollapsibleTabs(true);
                        } else {
                            setupCollapsibleTabs(false);
                        }
                    }

                });

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                // Show initial scroll animation whenever the window width changes.
                $($window).on('resize.tabcollapse' + tabCollapseId, function () {
                    var windowWidth = $($window).width();

                    if (lastWindowWidth !== windowWidth && $scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1) {
                        setDropdownMaxWidth();
                    }

                    lastWindowWidth = windowWidth;
                });

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    $($window).off('.tabcollapse' + tabCollapseId);
                });
            }
        };
    }

    bbTabsetCollapsible.$inject = ['$compile', '$templateCache', '$window', 'bbMediaBreakpoints'];

    function collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading) {
        //get ui-bootstrap tab scope
        var tabScope = el.isolateScope();
        $scope.$watch(function () {
            return tabScope.active;
        }, function (active) {
            if (active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(getTabHeading());
            }
        });

        $scope.$watch(function () {
            return getTabHeading();
        }, function (collapseTitle) {
            if (tabScope.active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(collapseTitle);
            }
        });

        bbTabsetCollapsibleCtrl.tabAdded();

        $scope.$on('$destroy', function () {
            bbTabsetCollapsibleCtrl.tabRemoved();
        });
    }


    function bbTabCollapseHeader() {
        return {
            require: '^bbTabsetCollapsible',
            link: function ($scope, el, attr, bbTabsetCollapsibleCtrl) {
                function getTabHeading() {
                    return $scope.$eval(attr.bbTabCollapseHeader);
                }

                collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
            }
        };
    }

    function tab() {
        return {
            require: '?^bbTabsetCollapsible',
            link: function ($scope, el, attr, bbTabsetCollapsibleCtrl) {
                var tabScope = el.isolateScope();

                function getTabHeading() {
                    return tabScope.heading;
                }

                if (bbTabsetCollapsibleCtrl !== null && !angular.isDefined(attr.bbTabCollapseHeader)) {
                    collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
                }
            }
        };
    }

    angular.module('sky.tabset', ['ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .directive('tabset', tabset)
        .directive('bbTabsetCollapsible', bbTabsetCollapsible)
        .directive('bbTabCollapseHeader', bbTabCollapseHeader)
        .directive('tab', tab);
}(jQuery));

/*global angular */

/** @module Tab Sref
@icon link
@summary The tab sref component provides tab info in page URLs so that hyperlinks can point to specific tabs.
 @description The tab sref directive adds the ability to change the page's URL when the user clicks a tab. This also allows for users to navigate straight to a selected tab from a hyperlink.

### Dependencies ###

 - **[Angular UI Router](https://github.com/angular-ui/ui-router) (0.2.13 or higher)**

---

### Tab Sref Settings ###

 - `bb-tab-sref` The name of the state where the application should navigate when the tab is selected.
 */

(function () {
    'use strict';

    angular.module('sky.tabsref', ['ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: ['^tabset', 'tab'],
                link: function (scope, el, attrs, controllers) {
                    var active = attrs.active,
                        sref = attrs.bbTabSref,
                        stateChangeDeregistration,
                        tabsetCtrl = controllers[0];


                    function checkCurrentState() {
                        if ($state.is(sref)) {
                            tabsetCtrl.select(el.isolateScope());
                        }
                    }

                    /*istanbul ignore else sanity check */
                    if (active && sref) {
                        checkCurrentState();

                        stateChangeDeregistration = $rootScope.$on('$stateChangeSuccess', function () {
                            checkCurrentState();
                        });

                        scope.$watch(active, function (newValue) {
                            if (newValue && !$state.is(sref)) {
                                // JPB - Delay calling state.go because the state change will fail
                                // if it is triggered while in the middle of processing of another state change.
                                // This can happen if you browse to the page without specifying the state of a particular tab
                                // and then this code tries to switch you over to the state of the first tab.
                                $timeout(function () {
                                    $state.go(sref);
                                });
                            }
                        });

                        scope.$on('$destroy', function () {
                            stateChangeDeregistration();
                        });
                    }
                }
            };
        }]);
}());

/*jslint nomen: true, plusplus: true */
/*global angular */

/** @module Template
@icon building-o
@summary The template component places formatted text inside a tokenized string template.
 @description The template directives allow you to place formatted text inside a tokenized string template. This avoids the need to build HTML manually on the server or in a custom directive where HTML injection bugs are common.
The string template is specified with the `bb-template` attribute, and child elements with the `bb-template-item` attribute are the elements that contain the formatted text.

### Template Settings ###

 - `bb-template` The tokenized string that represents the template. Tokens use the {n} notation where n is the ordinal of the item to replace the token.
  - `bb-template-item` 
 */

(function () {
    'use strict';

    var BB_TEMPLATE_RESULT = 'bb-template-result';

    function createItemClassName(index) {
        return 'bb-template-item-' + index;
    }

    function insertTemplateItems(templateEl, items) {
        var i,
            n;

        // Move each item into the template element.
        for (i = 0, n = items.length; i < n; i++) {
            items[i].appendTo(templateEl.find('.' + createItemClassName(i)));
        }
    }

    angular.module('sky.templating', ['sky.format'])
        .directive('bbTemplate', ['bbFormat', function (bbFormat) {
            function createTemplateHtml(template) {
                // The template string itself should not contain HTML, so be sure to escape it to avoid HTML injection.
                template = bbFormat.escape(template);

                // Replace {0}, {1}, etc. with span elements that will serve as placeholders for the item elements.
                return template.replace(/\{(\d+)\}/g, function (match, number) {
                    /*jslint unparam: true */
                    return '<span class="' + createItemClassName(number) + '"></span>';
                });
            }

            return {
                controller: ['$scope', function ($scope) {
                    $scope.items = [];

                    this.addItem = function (item) {
                        $scope.items.push(item);
                    };
                }],
                link: function (scope, el) {

                    scope.$watch('template', function (newValue) {
                        var newEl,
                            oldEl = el.find('.' + BB_TEMPLATE_RESULT),
                            templateHtml;

                        if (angular.isDefined(newValue)) {
                            templateHtml = createTemplateHtml(newValue);

                            // Create and append a new template item, move the existing items to it, then
                            // destroy the old items.  Doing it in this order should ensure any elements
                            // with bindings remain bound after being moved.
                            newEl = angular.element('<span class="' + BB_TEMPLATE_RESULT + '">' + templateHtml + '</span>')
                                .appendTo(el);

                            insertTemplateItems(newEl, scope.items);

                            // Remove old elements if they exist.
                            oldEl.remove();
                        }
                    });
                },
                scope: {
                    template: '=bbTemplate'
                },
                restrict: 'A'
            };
        }])
        .directive('bbTemplateItem', function () {
            return {
                link: function (scope, el, attr, bbFormatCtrl) {
                    /*jslint unparam: true */
                    bbFormatCtrl.addItem(el);
                },
                require: '^bbTemplate',
                restrict: 'AE'
            };
        });
}());

/*jslint plusplus: true */

/*global angular */

/** @module Text Expand
@icon text-height
@summary The text expand component truncates long text with an ellipsis and a link that users can click to expand the text.
 @description The texteExpand directive truncates long text with an ellipsis and a link that allows the user to fully expand the text. If the text length falls below the specified threshold then no action is taken.

Note that collapsed text will have newlines removed. Also, if one or more newlines are detected, the text is automatically collapsed regardless of the total length of the text.

### Text Expand Settings ###

 - `bb-text-expand` The text to truncate.
 - `bb-text-expand-max-length` *(Default: 200)* The number of characters to show before truncating the text. The directive will attempt to look back up to 10 characters for a space and truncate there in order to avoid truncating in the middle of a word.

The Text Expand Repeater directive truncates a list of repeater items and will initially display a set number of items. Any items over the set maximum limit are hidden until the user elects to expand the list.

### Text Expand Repeater Settings ###

- `bb-text-expand-repeater-max` The maximum number of items to show before truncating the repeater list.
- `bb-text-expand-repeater-data` The name of the property containing the repeater data.
 */

(function () {
    'use strict';

    var modules = [
            'sky.resources',
            'sky.scrollintoview'
        ];

    function getNewlineCount(value) {
        var matches = value.match(/\n/gi);

        if (matches) {
            return matches.length;
        }

        return 0;
    }

    function createEl($templateCache, templateName) {
        return angular.element($templateCache.get('sky/templates/textexpand/' + templateName + '.html'));
    }

    angular.module('sky.textexpand', modules)
        .directive('bbTextExpandRepeater', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            function link(scope, el, attrs) {
                scope.$watch(attrs.bbTextExpandRepeaterData, function (data) {
                    var length,
                        maxToShow,
                        seeMoreEl,
                        seeMoreText = bbResources.text_expand_see_more,
                        seeLessText = bbResources.text_expand_see_less;

                    if (data) {
                        length = data.length;
                        maxToShow = +attrs.bbTextExpandRepeaterMax;
                        seeMoreEl = createEl($templateCache, 'seemore').text(seeMoreText);

                        if (length > maxToShow) {
                            el.find('li:gt(' + (maxToShow - 1) + ')').addClass('bb-text-expand-toggle-li').hide().end().append(
                                seeMoreEl.click(function () {
                                    seeMoreEl.siblings('.bb-text-expand-toggle-li').toggle(100);
                                    if (seeMoreEl.hasClass('bb-text-expand-see-more')) {
                                        seeMoreEl.text(seeLessText);
                                    } else {
                                        seeMoreEl.text(seeMoreText);
                                    }

                                    seeMoreEl.toggleClass('bb-text-expand-see-more');

                                    return false;
                                })
                            );
                        }
                    }
                });
            }

            return {
                link: link
            };
        }])
        .directive('bbTextExpand', ['$templateCache', 'bbResources', 'bbScrollIntoView', function ($templateCache, bbResources, bbScrollIntoView) {
            function link(scope, el, attrs) {
                var isExpanded,
                    maxLength = +attrs.bbTextExpandMaxLength || 200,
                    maxExpandedLength = +attrs.bbTextExpandMaxExpandedLength || 6500,
                    maxNewlines = 1,
                    maxExpandedNewlines = 50;

                function getTruncatedText(value, length, newlines) {
                    var i;

                    if (newlines && getNewlineCount(value) >= newlines) {
                        value = value.replace(/\s+/gi, ' ');
                    }

                    // Jump ahead one character and see if it's a space, and if it isn't,
                    // back up to the first space and break there so a word doesn't get cut
                    // in half.
                    for (i = length; i > length - 10; i--) {
                        if (/\s/.test(value.charAt(i))) {
                            length = i;
                            break;
                        }
                    }

                    return value.substr(0, length);
                }

                scope.$watch(attrs.bbTextExpand, function (newValue) {
                    var collapsedText,
                        expandedText,
                        containerEl,
                        currentHeight,
                        ellipsisEl,
                        expandEl,
                        newHeight,
                        textEl,
                        spaceEl;

                    function animateText(previousText, newText, newExpandText, showEllipsis) {
                        // Measure the current height so we can animate from it.
                        currentHeight = containerEl.height();

                        expandEl.text(newExpandText);
                        textEl.text(newText);

                        newHeight = containerEl.height();

                        if (newHeight < currentHeight) {
                            // The new text is smaller than the old text, so put the old text back before doing
                            // the collapse animation to avoid showing a big chunk of whitespace.
                            textEl.text(previousText);
                        }

                        ellipsisEl.text(showEllipsis ? '...' : '');

                        containerEl
                            .height(currentHeight)
                            .animate(
                                {
                                    height: newHeight
                                },
                                250,
                                function () {
                                    if (newHeight < currentHeight) {
                                        textEl.text(newText);
                                    }
                                    containerEl.css('height', 'auto');
                                }
                            );
                    }

                    containerEl = createEl($templateCache, 'container');

                    /* istanbul ignore else: nothing happens when there's no value, so there's nothing to test. */
                    if (newValue) {
                        collapsedText = getTruncatedText(newValue, maxLength, maxNewlines);
                        expandedText = getTruncatedText(newValue, maxExpandedLength, maxExpandedNewlines); // Get text based on max expanded length

                        if (collapsedText !== newValue) {
                            isExpanded = true;

                            textEl = createEl($templateCache, 'text').text(collapsedText);
                            ellipsisEl = createEl($templateCache, 'ellipsis');
                            spaceEl = createEl($templateCache, 'space');
                            expandEl = createEl($templateCache, 'seemore').text(bbResources.text_expand_see_more);

                            containerEl
                                .empty()
                                .append(textEl)
                                .append(ellipsisEl)
                                .append(spaceEl)
                                .append(expandEl);

                            expandEl.on('click', function () {
                                if (isExpanded) {
                                    animateText(collapsedText, expandedText, bbResources.text_expand_see_less, (expandedText !== newValue));
                                } else {
                                    animateText(expandedText, collapsedText, bbResources.text_expand_see_more, true);
                                }

                                bbScrollIntoView(expandEl);
                                isExpanded = !isExpanded;

                                return false;
                            });
                        } else {
                            containerEl.text(newValue);
                        }
                    }

                    el.empty().append(containerEl);

                    /* istanbul ignore next: these internal variables can't be tested. */
                    el.on('$destroy', function () {
                        containerEl = null;
                        expandEl = null;
                        textEl = null;
                        spaceEl = null;
                    });
                });
            }

            return {
                link: link
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Tile
@icon th-large
@summary The tile provides a collapsible container that is the building block for pages and forms in Sky UX applications.
 @description The `bb-tile` directive creates a collapsible container and is the bulding block for pages and forms in a Sky UX application. The `bb-tile-section` directive is used to create padded sections inside a `bb-tile` element. Additionally, the `bb-tile-header-content` directive may be placed inside the `bb-tile` directive to add summary information to the tile. If you simply need to show a check mark indicating the tile has data, you can add a `bb-tile-header-check` element to the `bb-tile-header-content` element.

When used on forms, it automatically adjusts the background color on the form and shrinks the tile header.

### Tile Settings ###

 - `bb-tile-header` The header text for the tile.
 - `bb-tile-settings-click` A function to call when the user clicks the settings button (indicated by a wrench icon) in the tile header.  If not specified, the settings button is not displayed.
 - `bb-tile-collapsed` (optional) binds to the collapsed state of the tile so that the tile can respond to user setting collapsed state.

### Tile Dashboard Directive ###

The `bb-tile-dashboard` directive allows you to have a set of tiles within a page which have controllable layouts and collapsed states. It depends on [angular-ui router](https://github.com/angular-ui/ui-router/wiki) to define states that map to tile controllers and templates.

### Tile Dashboard Settings ###

- `bb-tiles` An array of tile objects to be contained in the dashboard. Contains the following object:
    - `id` Unique ID for the tile.
    - `view_name` The name of the view for the tile defined in the ui-router `$stateProvider`.
    - `collapsed` True if the tile should be collapsed, false otherwise.
    - `collapsed_small` True if the tile should be collapsed in small screen state, false otherwise.
- `bb-layout` An object containing information about how the tiles should be organized within the tile dashboard. Contains the following:
    - `one_column_layout` Array of tile ids that correspond with how the tiles should be ordered in a one column layout (small screen) ex: `layout.one_column_layout = ['Tile1', 'Tile2'];`.
    - `two_column_layout` Array that corresponds with how tiles should be ordered in a two column layout. ex: `layout.two_column_layout = [['Tile1'], ['Tile2']];` where `Tile1` is in the left hand column and `Tile2` is in the right hand column.
- `bb-tile-dashboard-all-collapsed` If set to true, then collapses all tiles in the dashboard, if set to false, expands all tiles in the dashboard.

 */

(function () {
    'use strict';

    //Removes the specified tiles from the source container and appends them
    //in the specified order to the target container.
    function moveTilesToContainer(sourceContainer, targetContainer, tiles) {
        angular.forEach(tiles, function (tileId) {
            var tile = sourceContainer.find('[data-tile-id="' + tileId + '"]');
            targetContainer.append(tile);
        });
    }

    //Returns an array of tile names in the order they appear in the specified container.
    function parseTileOrder(container) {
        var tiles = [];
        container.find('[data-tile-id]').each(function () {
            tiles.push(angular.element(this).data('tile-id'));
        });
        return tiles;
    }

    angular.module('sky.tiles', ['sky.mediabreakpoints'])
        .directive('bbTile', ['$timeout', function ($timeout) {
            return {
                link: function (scope, el, attrs, dashboardCtrl) {
                    var dashboardState = {},
                        displayModeChanging = false,
                        tileInitialized = false;

                    //determines whether or not a tile is collapsed
                    function tileIsCollapsed(tileId, tiles) {
                        var i,
                            len = tiles.length,
                            tile;

                        for (i = 0; i < len; i++) {
                            tile = tiles[i];

                            if (tile.id === tileId) {
                                return scope.smallTileDisplayMode ? tile.collapsed_small : tile.collapsed;
                            }
                        }

                        return !!scope.smallTileDisplayMode;
                    }

                    //sets the collapsed state of the tile based on the tile settings and the display mode
                    function updateTileState(tiles) {
                        var collapsed,
                            oldCollapsed;

                        tiles = tiles || /*istanbul ignore next: default value */ [];

                        oldCollapsed = scope.isCollapsed;

                        collapsed = tileIsCollapsed(scope.tileId, tiles);

                        if (oldCollapsed === collapsed) {
                            displayModeChanging = false;
                        }
                        scope.isCollapsed = collapsed;

                        if (collapsed && !tileInitialized) {
                            //in some cases the tile-content div is left in a partially collapsed state.
                            //   this will ensure that the tile is styled corretly and the tile is completely collapsed
                            $timeout(function () {
                                var contentEl;
                                contentEl = el.find('.bb-tile-content');
                                contentEl.removeClass('collapsing').addClass('collapse');
                            }, 1);
                        }
                    }

                    function updateHeaderContent() {
                        var wrapperEl;

                        scope.hasHeaderContent = !!scope.headerContentEl;

                        if (scope.headerContentEl) {
                            wrapperEl = el.find('.bb-tile-header-with-content:first');

                            wrapperEl.append(scope.headerContentEl);
                        }
                    }

                    function initializeTile(data) {
                        var tiles = data.tiles || /*istanbul ignore next: default value */ [];

                        if (!tileInitialized) {
                            //retrieve the tile id from the parent container
                            scope.tileId = el.parent().attr('data-tile-id') || /*istanbul ignore next: default value */ '';
                            scope.smallTileDisplayMode = data.smallTileDisplayMode || false;
                        }

                        updateTileState(tiles);

                        tileInitialized = true;
                    }

                    scope.isCollapsed = scope.bbTileCollapsed || false;
                    scope.smallTileDisplayMode = false;
                    scope.tileId = '';

                    scope.titleClick = function () {
                        scope.isCollapsed = !scope.isCollapsed;
                        scope.scrollIntoView = !scope.isCollapsed;
                    };

                    //listens for the tileModeChanged event from the tileDashboard and updates the collapsed state of the tiles based on whether or not the tiles are in small display mode
                    scope.$on('tileDisplayModeChanged', function (event, data) {
                        /*jslint unparam: true */
                        scope.smallTileDisplayMode = data.smallTileDisplayMode || false;

                        if (tileInitialized) {
                            displayModeChanging = true;
                            updateTileState(data.tiles);
                        }
                    });

                    //listens for the tilesInitialized event from the tileDashboard and updates the initial collapsed state of the tiles
                    scope.$on('tilesInitialized', function (event, data) {
                        /*jslint unparam: true */

                        initializeTile(data);
                    });

                    //if the collapsed state changes, notify the tileDashboard
                    scope.$watch('isCollapsed', function () {
                        if (tileInitialized && !displayModeChanging) {
                            $timeout(function () {
                                scope.$emit('tileStateChanged', {
                                    tileId: scope.tileId,
                                    collapsed: scope.isCollapsed
                                });
                            });
                        }
                        displayModeChanging = false;

                        if (!scope.isCollapsed) {
                            $timeout(function () {
                                scope.$broadcast('tileRepaint');
                            });
                        }

                        scope.bbTileCollapsed = scope.isCollapsed;
                    });

                    if (attrs.bbTileCollapsed) {
                        scope.$watch('bbTileCollapsed', function (newValue) {
                            scope.isCollapsed = newValue;
                        });
                    }

                    scope.hasSettings = !!attrs.bbTileSettingsClick;

                    updateHeaderContent();

                    //If the dashboard has already been initialized and this tile hasn't, initialize tile.
                    if (dashboardCtrl !== null) {
                        if (dashboardCtrl.dashboardInitialized() && !tileInitialized) {
                            dashboardState = dashboardCtrl.getDashboardState();
                            initializeTile(dashboardState);
                        }
                    }
                },
                replace: true,
                restrict: 'E',
                require: '?^^bbTileDashboard',
                scope: {
                    bbTileCollapsed: '=?',
                    bbTileSettingsClick: '&?',
                    tileHeader: '=bbTileHeader'
                },
                controller: ['$scope', function ($scope) {
                    this.setHeaderContentEl = function (el) {
                        $scope.headerContentEl = el;
                    };
                }],
                templateUrl: 'sky/templates/tiles/tile.html',
                transclude: true
            };
        }])
        .directive('bbTileHeaderContent', function () {
            return {
                replace: true,
                require: '^bbTile',
                restrict: 'E',
                link: function (scope, el, attrs, tileCtrl) {
                    tileCtrl.setHeaderContentEl(el);
                },
                templateUrl: 'sky/templates/tiles/tileheadercontent.html',
                transclude: true
            };
        })
        .directive('bbTileHeaderCheck', function () {
            return {
                replace: true,
                require: '^bbTileHeaderContent',
                restrict: 'E',
                templateUrl: 'sky/templates/tiles/tileheadercheck.html'
            };
        })
        .directive('bbTileSection', function () {
            return {
                restrict: 'A',
                template: function (el) {
                    el.addClass('bb-tile-content-section');
                }
            };
        })
        .directive('bbTileDashboard', ['$timeout', 'bbMediaBreakpoints', function ($timeout, bbMediaBreakpoints) {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    tiles: '=bbTiles',
                    layout: '=bbLayout',
                    allCollapsed: '=bbTileDashboardAllCollapsed'
                },
                link: function (scope, element, attrs) {
                    var column1 = element.find('[data-dashboard-column="1"]'),
                        column2 = element.find('[data-dashboard-column="2"]'),
                        singleColumnMode = false,
                        sortableOptions;

                    scope.dashboardInitialized = false;
                    scope.smallTileDisplayMode = false;

                    //Inspects the tiles in each column and updates model accordingly.
                    function parseColumnTiles() {
                        scope.$apply(function () {
                            var layout = scope.layout;

                            if (singleColumnMode) {
                                layout.one_column_layout = parseTileOrder(column1);
                            } else {
                                layout.two_column_layout[0] = parseTileOrder(column1);
                                layout.two_column_layout[1] = parseTileOrder(column2);
                            }
                        });
                    }

                    //Layouts out the tiles based on the current one column or two column configuration
                    function layoutTiles() {
                        var layout = scope.layout;

                        if (layout) {
                            if (singleColumnMode) {
                                moveTilesToContainer(element, column1, layout.one_column_layout);
                            } else {
                                moveTilesToContainer(element, column1, layout.two_column_layout[0]);
                                moveTilesToContainer(element, column2, layout.two_column_layout[1]);
                            }
                        }
                    }

                    function fireDisplayModeChanged() {
                        scope.$broadcast('tileDisplayModeChanged', {
                            smallTileDisplayMode: scope.smallTileDisplayMode,
                            tiles: scope.tiles
                        });
                    }

                    function mediabreakpointChangeHandler(breakPoints) {
                        singleColumnMode = (breakPoints.xs || breakPoints.sm);
                        layoutTiles();

                        if (singleColumnMode) {
                            element.removeClass('bb-page-content-multicolumn');
                            column2.hide();
                        } else {
                            element.addClass('bb-page-content-multicolumn');
                            column2.show();
                        }

                        scope.smallTileDisplayMode = breakPoints.xs;

                        fireDisplayModeChanged();
                    }

                    //Setup jQuery sortable (drag and drop) options for the dashboard columns
                    sortableOptions = {
                        connectWith: '[data-dashboard-column]',
                        update: parseColumnTiles,
                        opacity: 0.8,
                        handle: '.bb-tile-grab-handle',
                        placeholder: 'placeholder bb-tile',
                        forcePlaceholderSize: true,
                        revert: 250
                    };

                    //Setup jQuery sortable drag/drop for the columns
                    column1.sortable(sortableOptions);
                    column2.sortable(sortableOptions);

                    bbMediaBreakpoints.register(mediabreakpointChangeHandler);

                    element.on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediabreakpointChangeHandler);
                    });

                    scope.$watch('tiles', function () {
                        $timeout(function () {
                            layoutTiles();
                            scope.$broadcast('tilesInitialized', {
                                smallTileDisplayMode: scope.smallTileDisplayMode,
                                tiles: scope.tiles
                            });

                            scope.dashboardInitialized = true;
                        });
                    });

                    scope.$watch('allCollapsed', function (newValue) {
                        var i,
                            n,
                            tiles = scope.tiles;

                        // Check for an explicit true/false here since null/undefined is the
                        // indeterminate state.
                        if (newValue === true || newValue === false) {
                            for (i = 0, n = tiles.length; i < n; i++) {
                                if (scope.smallTileDisplayMode) {
                                    tiles[i].collapsed_small = newValue;
                                } else {
                                    tiles[i].collapsed = newValue;
                                }
                            }

                            fireDisplayModeChanged();
                        }
                    });

                    scope.$on('tileStateChanged', function (event, data) {
                        /*jslint unparam: true */
                        scope.$apply(function () {
                            var allCollapsed = null,
                                collapsed,
                                collapsedProp,
                                i,
                                n,
                                tile,
                                tileId = data.tileId || /*istanbul ignore next: default value */ '',
                                tiles = scope.tiles;

                            collapsed = data.collapsed || false;
                            collapsedProp = scope.smallTileDisplayMode ? 'collapsed_small' : 'collapsed';

                            for (i = 0, n = tiles.length; i < n; i++) {
                                tile = tiles[i];

                                if (tile.id === tileId) {
                                    tile[collapsedProp] = collapsed;
                                }

                                if (i > 0 && tile[collapsedProp] !== allCollapsed) {
                                    allCollapsed = null;
                                } else {
                                    allCollapsed = tile[collapsedProp];
                                }
                            }

                            if (attrs.bbTileDashboardAllCollapsed) {
                                scope.allCollapsed = allCollapsed;
                            }
                        });
                    });
                },
                controller: ['$scope', function ($scope) {
                    var self = this;

                    self.getDashboardState = function () {
                        return {tiles: $scope.tiles, smallTileDisplayMode: $scope.smallTileDisplayMode};
                    };

                    self.dashboardInitialized = function () {
                        return $scope.dashboardInitialized;
                    };
                }],
                templateUrl: 'sky/templates/tiles/tiledashboard.html'
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Toast
@icon envelop-o
@summary The toast service launches toast messages basic string messages or complex toast messages that use HTML templates.
 @description The toast service can be used to launch toast in a consistent way in a Sky UX application. The service has a single method, `bbToast.open` used to launch a toast. Optionally include the `ngAnimate` module in the application for toasts to fade in and out.

### Dependencies ###

 - **[angular-toastr](https://github.com/Foxandxss/angular-toastr) (1.0.0-beta.2 or higher)**
 - **[ng-animate](https://docs.angularjs.org/api/ngAnimate) (optional, 1.3 or higher)**

---

### Toast Settings ##

 - `message` Used to provide a basic string message for simple toasts.
 - `templateUrl` Url for a template in the `$templateCache`. Used to provide an HTML template when displaying complex toasts.  Cannot be combined with the `message` option.
 - `controller` Used in conjunction with `templateUrl`. Specifies the name of a controller to apply to the template's scope.
 - `resolve` Items that will be resolved and passed to the controller as locals.
 */

(function () {
    'use strict';

    function nextId() {
        nextId.index = nextId.index || 0;
        nextId.index++;
        return 'bbtoast-' + nextId.index;
    }

    function validateOptions(opts) {
        if (opts.message && opts.templateUrl) {
            throw 'You must not provide both a message and a templateUrl.';
        } else if (!opts.message && !opts.templateUrl) {
            throw 'You must provide either a message or a templateUrl.';
        }
    }

    angular.module('sky.toast', ['toastr'])
        .config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                closeButton: true,
                newestOnTop: true,
                positionClass: 'toast-bottom-right',
                tapToDismiss: false,
                timeOut: 6000
            });
        }])
        .factory('bbToast', ['toastr', '$templateCache', '$compile', '$controller', '$rootScope', '$q', '$injector', function (toastr, $templateCache, $compile, $controller, $rootScope, $q, $injector) {
            //Based on $modal approach to resolves
            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function (value) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }

            function open(message, config) {
                config = config || {};
                config.iconClass = 'bb-toast';
                return toastr.info(message, '', config);
            }

            function openMessage(opts) {
                return open(opts.message);
            }

            function openWithTemplate(opts) {
                var controller = opts.controller,
                    controllerLocals,
                    elId,
                    resolveIter = 0,
                    resolvesPromise,
                    templateHtml,
                    toast,
                    toastScope;

                function insertTemplateInToast() {
                    var templateEl = toast.el.find('#' + elId);

                    templateEl.html(templateHtml);

                    if (controller) {
                        $controller(controller, controllerLocals);
                        $compile(templateEl)(controllerLocals.$scope);
                    }
                }

                opts.resolve = opts.resolve || {};

                resolvesPromise = $q.all(getResolvePromises(opts.resolve));

                resolvesPromise.then(function (resolvedVars) {
                    if (controller) {
                        controllerLocals = {};
                        controllerLocals.$scope = $rootScope.$new();
                        angular.forEach(opts.resolve, function (value, key) {
                            controllerLocals[key] = resolvedVars[resolveIter++];
                        });
                    }

                    templateHtml = $templateCache.get(opts.templateUrl);

                    elId = nextId();

                    toast = open("<div id='" + elId + "'></div>", { allowHtml: true });
                    toastScope = toast.scope;

                    //We need to hook in after the toast element has been created and the temporary message
                    //defined above exists, but before the toast is visually displayed.  The toastr code adds
                    //an init function to the scope when the toast directive is being linked.  An EvalAsync
                    //after this occurs will allow us to hook in at the correct moment.
                    toastScope.$watch('init', function () {
                        toastScope.$evalAsync(function () {
                            insertTemplateInToast();
                        });
                    });
                });
            }

            return {
                open: function (opts) {
                    opts = opts || {};
                    validateOptions(opts);

                    if (opts.templateUrl) {
                        openWithTemplate(opts);
                    } else {
                        openMessage(opts);
                    }
                }
            };
        }]);
}());

/*global angular */

/** @module Tooltip
@icon info
@summary The tooltip creates an HTML-formatted tooltip that is displayed by a trigger element.
 @description The tooltip directive enables an HTML-formatted tooltip to be displayed by a trigger element. This directive wraps up the Angular UI Bootstrap Tooltip directive while making it easier to define markup in a template rather than directly in the view's controller.

### Tooltip Settings ##

In addition to all the properties from the [Angular UI Bootstrap Tooltip](http://angular-ui.github.io/bootstrap/) directive, these properties may also be specified:

 - `bb-tooltip` URL for a template in the `$templateCache`. The template HTML may contain bindings to properties in the current scope.

 - `tooltip-updater` Optional. A property on the scope that can be watched by the directive so that when this property's value changes, the contents of the tooltip are refreshed.
 */

(function () {
    'use strict';


    function bbTooltip($compile, $timeout, bbData) {
        // Based on Adomas.NET's answer to this StackOverflow question:
        // http://stackoverflow.com/questions/19029676/angular-ui-tooltip-with-html
        // This allows us to use an HTML template with Angular binding instead of building
        // HTML in the controller which leaves open the potential for HTML injection.
        return {
            restrict: 'A',
            scope: true,
            compile: function (tElem) {
                //Add bootstrap directive
                /*istanbul ignore else */
                if (!tElem.attr('tooltip-html-unsafe')) {
                    tElem.attr('tooltip-html-unsafe', '{{tooltip}}');
                }

                return function (scope, el, attrs) {
                    function loadTemplate() {
                        bbData.load({
                            text: attrs.bbTooltip
                        }).then(function (result) {
                            var container = angular.element('<div></div>'),
                                tplContent = result.text;

                            container.html($compile(tplContent.trim())(scope));

                            $timeout(function () {
                                scope.tooltip = container.html();
                            });
                        });
                    }

                    //remove our direcive to avoid infinite loop
                    el.removeAttr('bb-tooltip');

                    //compile element to attach tooltip binding
                    $compile(el)(scope);

                    if (angular.isDefined(attrs.tooltipUpdater)) {
                        scope.$watch(attrs.tooltipUpdater, function () {
                            loadTemplate();
                        });
                    } else {
                        loadTemplate();
                    }
                };
            }
        };
    }


    bbTooltip.$inject = ['$compile', '$timeout', 'bbData'];

    angular.module('sky.tooltip', ['sky.data'])
        .directive('bbTooltip', bbTooltip);

}());

/*global angular */

/** @module Utilities
@icon gear
@summary The utilities module provides methods to encode URI components and format arguments.
@description The Sky UX utilities module gives you the following angular filters:

  - `encodeURIComponent` Uses the $window.encodeURIComponent function on your string.
  - `format` Formats the args with a given format string.

*/

(function () {
    'use strict';

    angular.module('sky.utilities', ['sky.format'])
        .filter('encodeURIComponent', ['$window', function ($window) {
            return function (value) {
                return $window.encodeURIComponent(value);
            };
        }])
        .filter('format', ['bbFormat', function (bbFormat) {
            return function () {
                return bbFormat.formatText.apply(this, arguments);
            };
        }]);
}());

/*global angular */

/** @module Email Validation
@icon check
@summary The email validation directive allows you to validate email strings in input fields.
 @description The email validation provides the ability to validate email strings in input fields.

### Email Validation Settings ###

- `ng-model` An object to bind the email value to on the input.
- `type=email` indicates that email validation can be used.
 */

(function () {
    'use strict';
    angular.module('sky.validation', [])
        .directive('bbEmailValidation', [function () {
            var EMAIL_REGEXP = /[\w\-]+@([\w\-]+\.)+[\w\-]+/;
            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    /*jslint unparam: true */
                    if (ctrl && ctrl.$validators.email) {
                        ctrl.$validators.email = function (modelValue) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        };
                    }
                }
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    var CLS_VIEWKEEPER_FIXED = 'bb-viewkeeper-fixed',
        config = {
            viewportMarginTop: 0
        },
        ViewKeeper;

    function nextId() {
        nextId.index = nextId.index || 0;
        nextId.index++;
        return 'viewkeeper-' + nextId.index;
    }

    function getSpacerId(vk) {
        return vk.id + "-spacer";
    }

    function setElPosition(elQ, left, top, bottom, width) {
        elQ.css({
            "top": top,
            "bottom": bottom,
            "left": left
        });

        /*istanbul ignore else: sanity check */
        if (width !== null) {
            elQ.css({ "width": width });
        }
    }

    function unfixEl(vk) {
        var elQ = angular.element(vk.el),
            width;

        angular.element("#" + getSpacerId(vk)).remove();

        elQ.removeClass(CLS_VIEWKEEPER_FIXED);

        vk.currentElFixedLeft = null;
        vk.currentElFixedTop = null;
        vk.currentElFixedBottom = null;
        vk.currentElFixedWidth = null;

        if (vk.setWidth) {
            width = "auto";
        }
        setElPosition(elQ, "", "", "", width);
    }

    function calculateVerticalOffset(vk) {
        var offset,
            verticalOffSetElTop;

        offset = vk.verticalOffSet;

        if (vk.verticalOffSetEl) {
            verticalOffSetElTop = vk.verticalOffSetEl.css('top');

            /*istanbul ignore else: sanity check */
            if (verticalOffSetElTop) {
                verticalOffSetElTop = parseInt(verticalOffSetElTop, 10);
                if (isNaN(verticalOffSetElTop)) {
                    verticalOffSetElTop = 0;
                }
            }

            offset += (vk.verticalOffSetEl.outerHeight() + verticalOffSetElTop);
        }

        return offset;
    }

    ViewKeeper = function (options) {
        var id,
            vk = this;

        options = options || /* istanbul ignore next */ {};

        vk.fixToBottom = options.fixToBottom;
        vk.setWidth = options.setWidth;
        vk.id = id = nextId();
        vk.el = options.el;
        vk.boundaryEl = options.boundaryEl;
        vk.verticalOffSet = options.verticalOffSet || 0;
        vk.setPlaceholderHeight = (options.setPlaceholderHeight !== false);
        vk.onStateChanged = options.onStateChanged;
        vk.isFixed = false;

        if (options.verticalOffSetElId) {
            vk.verticalOffSetEl = angular.element('#' + options.verticalOffSetElId);

            vk.verticalOffSetEl.on('afterViewKeeperSync.' + id, function () {
                vk.syncElPosition();
            });
        }

        angular.element(window).on("scroll." + id + ", resize." + id + ", orientationchange." + id, function () {
            vk.syncElPosition();
        });
    };

    ViewKeeper.prototype = {

        syncElPosition: function () {
            var anchorTop,
                anchorHeight,
                isCurrentlyFixed,
                currentElFixedLeft,
                currentElFixedTop,
                currentElFixedBottom,
                currentElFixedWidth,
                documentQ,
                fixEl,
                boundaryBottom,
                boundaryOffset,
                boundaryQ,
                boundaryTop,
                elFixedLeft,
                elFixedTop,
                elFixedBottom,
                elFixedWidth,
                elHeight,
                elQ,
                needsUpdating,
                scrollLeft,
                scrollTop,
                spacerHeight,
                spacerId,
                spacerQ,
                verticalOffSet,
                vk = this,
                width;

            isCurrentlyFixed = vk.isFixed;

            verticalOffSet = calculateVerticalOffset(vk);

            elQ = angular.element(vk.el);

            // When the element isn't visible, its size can't be calculated, so don't attempt syncing position in this case.
            if (!elQ.is(':visible')) {
                return;
            }

            boundaryQ = angular.element(vk.boundaryEl);
            spacerId = getSpacerId(vk);

            spacerQ = angular.element("#" + spacerId);
            documentQ = angular.element(window.document);

            boundaryOffset = boundaryQ.offset();
            boundaryTop = boundaryOffset.top;
            boundaryBottom = boundaryTop + boundaryQ.height();

            scrollLeft = documentQ.scrollLeft();
            scrollTop = documentQ.scrollTop();

            elHeight = elQ.outerHeight(true);

            if (vk.fixToBottom) {
                elFixedBottom = 0;
            } else {
                // If the element needs to be fixed, this will calculate its position.  The position will be 0 (fully visible) unless
                // the user is scrolling the boundary out of view.  In that case, the element should begin to scroll out of view with the
                // rest of the boundary by setting its top position to a negative value.
                elFixedTop = Math.min((boundaryBottom - elHeight) - scrollTop, verticalOffSet);
            }


            elFixedWidth = boundaryQ.width();
            elFixedLeft = boundaryOffset.left - scrollLeft;

            currentElFixedLeft = vk.currentElFixedLeft;
            currentElFixedTop = vk.currentElFixedTop;
            currentElFixedBottom = vk.currentElFixedBottom;
            currentElFixedWidth = vk.currentElFixedWidth;

            if (spacerQ.length > 0) {
                anchorTop = spacerQ.offset().top;
                anchorHeight = spacerQ.outerHeight(true);
            } else {
                anchorTop = elQ.offset().top;
                anchorHeight = elHeight;
            }

            if (vk.fixToBottom) {
                //Fix el if the natural bottom of the element would not be on the screen
                fixEl = (anchorTop + anchorHeight > scrollTop + window.innerHeight);
            } else {
                fixEl = scrollTop + verticalOffSet + config.viewportMarginTop > anchorTop;
            }

            if ((fixEl && currentElFixedLeft === elFixedLeft && currentElFixedTop === elFixedTop && currentElFixedBottom === elFixedBottom && currentElFixedWidth === elFixedWidth) || (!fixEl && !(currentElFixedLeft !== undefined && currentElFixedLeft !== null))) {
                // The element is either currently fixed and its position and width do not need to change, or the element is not
                // currently fixed and does not need to be fixed.  No changes are needed.
                needsUpdating = false;
            } else {
                needsUpdating = true;
            }

            if (needsUpdating) {
                if (fixEl) {
                    vk.isFixed = true;
                    if (spacerQ.length === 0) {
                        if (vk.setPlaceholderHeight) {
                            spacerHeight = elHeight;
                        } else {
                            spacerHeight = 0;
                        }
                        elQ.after('<div id="' + spacerId + '" style="height: ' + spacerHeight + 'px;"></div>');
                    }

                    elQ.addClass(CLS_VIEWKEEPER_FIXED);

                    vk.currentElFixedTop = elFixedTop;
                    vk.currentElFixedBottom = elFixedBottom;
                    vk.currentElFixedLeft = elFixedLeft;
                    vk.currentElFixedWidth = elFixedWidth;

                    if (vk.setWidth) {
                        width = elFixedWidth;
                    }

                    setElPosition(elQ, elFixedLeft, elFixedTop, elFixedBottom, width);
                } else {
                    vk.isFixed = false;
                    unfixEl(vk);
                }

                //If we changed if the item is fixed, fire the callback
                if (vk.onStateChanged && isCurrentlyFixed !== vk.isFixed) {
                    vk.onStateChanged();
                }
            }
            elQ.trigger('afterViewKeeperSync');
        },

        scrollToTop: function () {
            var anchorTop,
                elQ,
                documentQ,
                spacerId,
                spacerQ,
                verticalOffset,
                vk = this;

            verticalOffset = calculateVerticalOffset(vk);

            documentQ = angular.element(window.document);
            spacerId = getSpacerId(vk);
            spacerQ = angular.element("#" + spacerId);
            elQ = angular.element(vk.el);

            if (spacerQ.length > 0) {
                anchorTop = spacerQ.offset().top;
            } else {
                anchorTop = elQ.offset().top;
            }

            documentQ.scrollTop(anchorTop - verticalOffset - config.viewportMarginTop);
        },

        destroy: function () {
            var id,
                vk = this;

            if (!vk.isDestroyed) {
                id = vk.id;

                angular.element(window).off("scroll." + id + ", resize." + id + ", orientationchange." + id);
                unfixEl(vk);

                if (vk.verticalOffSetEl) {
                    vk.verticalOffSetEl.off("afterViewKeeperSync." + vk.id);
                    vk.verticalOffSetEl = null;
                }

                vk.isDestroyed = true;
            }
        }

    };

    angular.module('sky.viewkeeper', ['sky.mediabreakpoints', 'sky.window'])
        .constant('bbViewKeeperConfig', config)
        .factory('bbViewKeeperBuilder', function () {
            return {
                create: function (options) {
                    return new ViewKeeper(options);
                }
            };
        })
        .run(['$document', '$window', 'bbMediaBreakpoints', 'bbViewKeeperConfig', function ($document, $window, bbMediaBreakpoints, bbViewKeeperConfig) {
            function mediaBreakpointHandler(breakpoints) {
                //For user agents in which the omnibar follows you down the page, the ViewKeeper needs
                //to adjust for the height of the omnibar.

                //Ideally these values should be driven from a more appropriate source (omnibar js?)
                bbViewKeeperConfig.viewportMarginTop = breakpoints.xs ? 50 : 30;
            }

            if (/iPad|iPod|iPhone/i.test($window.navigator.userAgent)) {
                //On iOS the omnibar doesn't scroll with you.  Need to account for this on the styling.
                angular.element('body').addClass('omnibar-not-fixed');

                //On iOS we need to have special handling when entering textboxes to correct an issue with fixed
                //elements used by view keeper when the keyboard flys out.
                angular.element(document).on('focus', 'input', function () {
                    angular.element('body').addClass('bb-viewkeeper-ignore-fixed');
                }).on('blur', 'input', function () {
                    angular.element('body').removeClass('bb-viewkeeper-ignore-fixed');
                });
            } else {
                bbMediaBreakpoints.register(mediaBreakpointHandler);
            }
        }])
        .directive('bbViewKeeper', ['bbViewKeeperBuilder', function (bbViewKeeperBuilder) {
            function link(scope, el) {
                var vk;

                function destroyVk() {
                    if (vk) {
                        vk.destroy();
                        vk = null;
                    }
                }

                el.on('$destroy', function () {
                    destroyVk();
                });

                scope.$watch('bbBoundaryElId', function () {
                    var boundaryEl,
                        bbBoundaryElId = scope.bbBoundaryElId;

                    /*istanbul ignore else */
                    if (bbBoundaryElId) {
                        boundaryEl = angular.element('#' + bbBoundaryElId);

                        /*istanbul ignore else */
                        if (boundaryEl.length === 1) {
                            destroyVk();

                            vk = bbViewKeeperBuilder.create({
                                el: el[0],
                                boundaryEl: boundaryEl[0],
                                setWidth: true
                            });
                        }
                    }
                });
            }

            return {
                link: link,
                restrict: 'A',
                scope: {
                    bbBoundaryElId: '='
                }
            };
        }])
        .directive('bbScrollingViewKeeper', ['$window', 'bbWindow', function ($window, bbWindow) {
            return {
                scope: {
                    bbScrollingViewKeeper: "="
                },
                link: function (scope, element) {
                    var elementStart,
                        scrollPos,
                        prevScroll,
                        scrollingDown = true,
                        tempTop,
                        verticalOffset,
                        id = scope.$id;

                    function scroll() {
                        if (!element.is(':visible')) {
                            return;
                        }

                        if (angular.element('.bb-omnibar>.desktop').is(':visible')) {
                            verticalOffset = angular.element('.bb-omnibar>.desktop>.bar').outerHeight();
                        } else {
                            verticalOffset = 0;
                        }

                        if (scope.bbScrollingViewKeeper && scope.bbScrollingViewKeeper.viewKeeperOffsetElId) {
                            verticalOffset += angular.element('#' + scope.bbScrollingViewKeeper.viewKeeperOffsetElId).outerHeight();
                        }

                        if (!elementStart) {
                            elementStart = element.offset().top;
                        }
                        scrollPos = $window.scrollY || $window.pageYOffset || $window.document.body.scrollTop || 0;
                        if (prevScroll > scrollPos) {
                            scrollingDown = false;
                        } else {
                            scrollingDown = true;
                        }
                        prevScroll = scrollPos;

                        if (scrollPos >= elementStart - verticalOffset && element.height() + verticalOffset <= $window.document.body.offsetHeight) {
                            if (element.height() + verticalOffset < $window.innerHeight) {
                                tempTop = 0;

                                element.removeClass('bb-grid-filters-fixed-bottom').addClass('bb-grid-filters-fixed-top');

                                element.css({
                                    top: verticalOffset + 'px'
                                });
                            } else if (scrollingDown) {
                                if (element.offset().top + element.height() >= scrollPos + $window.innerHeight) {
                                    /*istanbul ignore else: sanity check */
                                    if (!tempTop) {
                                        tempTop = element.offset().top - elementStart;
                                    }

                                    element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom');

                                    element.css({
                                        top: tempTop
                                    });
                                } else {
                                    tempTop = 0;
                                    element.css({
                                        top: ''
                                    });
                                    element.removeClass('bb-grid-filters-fixed-top').addClass('bb-grid-filters-fixed-bottom');
                                }
                            } else {
                                if (element.offset().top < scrollPos + verticalOffset) {
                                    /*istanbul ignore else: sanity check */
                                    if (!tempTop) {
                                        tempTop = element.offset().top - elementStart;
                                    }

                                    element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom ');

                                    element.css({
                                        top: tempTop
                                    });
                                } else {
                                    tempTop = 0;

                                    element.removeClass('bb-grid-filters-fixed-bottom').addClass('bb-grid-filters-fixed-top');

                                    element.css({
                                        top: verticalOffset + 'px'
                                    });
                                }
                            }
                        } else {
                            tempTop = 0;
                            element.removeClass('bb-grid-filters-fixed-top bb-grid-filters-fixed-bottom grid-filters-fixed-top grid-filters-fixed-bottom');
                            element.css({
                                top: 0
                            });
                        }
                    }

                    if (!bbWindow.isIosUserAgent()) {
                        angular.element($window).on('scroll.' + id + ', orientationchange.' + id, scroll);

                        element.on('$destroy', function () {
                            angular.element($window).off("scroll." + id + ", orientationchange." + id);
                        });
                    }
                },
                restrict: 'A'
            };
        }]);
}());

/*jslint browser: true */
/*global angular, jQuery */

/** @module Wait
@icon spinner
@summary The wait component disables an element in a waiting state and visually indicates that it is in a waiting state.
 @description The wait directive allows you to disable and visually indicate that an element is in a waiting state.
When `bb-wait` is set to true, the element will initially be blocked with a clear mask, but after 300ms a visual indicator will cover the element as well.
This will allow for the element to immediately be disabled but not cause visual disturbances for very brief waits.

### Dependencies ###

 - **[jquery.blockUI.js](http://malsup.com/jquery/block/) (2.66.0-2013.10.09 or higher)**

---

If the value bound to `bb-wait` is truthy, then the element will begin waiting until the value becomes falsey.

### Multiple Waits ###
You can set the value of `bb-wait` to a numeric value to track a count of simultaneous waits.
When waits are added, increment the wait count and when they are removed then decrement the count.
This will cause the wait UI to only clear once all waits are removed.

### Full-page Waits ###
If bb-wait is added to the `<body>` tag, then a full-page version of the wait UI will be created.

### Raising Wait Events ###
Wait events can be raised from one controller to another by calling `$scope.$emit("bbBeginWait");` and `$scope.$emit("bbEndWait");` respectively.
A controller can capture that event and begin waiting its element by listening for the event and updating its own bb-wait directive.
When doing so, itshould call `stopPropagation()` on the event so that other parents won't catch it as well.
Uncaught events will raise all the way to the main controller of the application which can cause the entire page to wait.

    $scope.$on("bbBeginWait", function (event) {
        event.stopPropagation();
        $scope.myElementWaitCount += 1;
    });

### Wait Service ###
In addition to the `bb-wait` directive, a `bbWait` service exists to allow functional access to adding and removing waits on elements or the page as a whole.
This service supports the following functions

 - `beginElWait(element)` - Adds a wait for the specified element. Implicitly tracks a wait count for the element.
 - `endElWait(element)` - Removes a wait for the specified element. Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearElWait(element)` - Removes all waits for the specified element and will clear any wait UI.
 - `beginPageWait()` - Adds a wait for the whole page (same as body element). Implicitly tracks a wait count for the element.
 - `endPageWait()` - Removes a wait for the whole page (same as body element). Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearPageWait()` - Removes all waits for the whole page (same as body element) and will clear any wait UI.
 */

(function ($) {
    'use strict';

    angular.module('sky.wait', [])
        .factory('bbWait', ['$timeout', function ($timeout) {

            var addWait,
                removeWait,
                clearBlockOptions,
                fullPageClearBlockOptions,
                fullPageVisibleBlockOptions,
                fullPageZIndex = 20000,
                nonBlockWaitCountAttr = 'bb-wait-non-block-count',
                visibleBlockOptions,
                showingWaitAttr = 'bb-wait-showingwait',
                waitCountAttr = 'bb-wait-count';

            visibleBlockOptions = {
                message: '<div class="bb-wait-wrap"><div class="bb-wait-spinner"></div></div>'
            };

            clearBlockOptions = {
                message: "",
                fadeOut: 0,
                fadeIn: 0,
                overlayCSS: {
                    opacity: 0
                }
            };

            fullPageClearBlockOptions = angular.copy(clearBlockOptions);
            fullPageClearBlockOptions.overlayCSS["z-index"] = fullPageZIndex;

            fullPageVisibleBlockOptions = angular.copy(visibleBlockOptions);
            fullPageVisibleBlockOptions.overlayCSS = { "z-index": fullPageZIndex };
            fullPageVisibleBlockOptions.css = { "z-index": fullPageZIndex + 1 };

            function isBlockUISupported() {
                // Returns whether jquery.blockUI is loaded.
                return ($ && $.blockUI);
            }

            function isFullPage(el) {
                // Returns whether the element specified should be causing a
                // full page wait rather than just on the element itself.
                return $(el)[0] === document.body;
            }

            function getWaitCount(el, nonblocking) {
                // Returns the elements current wait count
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;
                return parseInt($(el).data(attr) || 0, 10);
            }

            function setWaitCount(el, count, nonblocking) {
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;

                // Sets the elements current wait count
                if (!count) {
                    $(el).removeData(attr);
                } else {
                    $(el).data(attr, count);
                }
            }

            function nonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length === 0) {
                    nonblock = $("<div class='bb-wait-nonblock'></div>");
                    $(el).append(nonblock);
                    $(nonblock).click(function () {
                        nonblock.hide();
                    });
                }
                nonblock.show();

                childOptions.nonblocking = false;

                addWait(nonblock[0], childOptions);
            }

            function unNonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length > 0) {
                    childOptions.nonblocking = false;
                    removeWait(nonblock[0], childOptions);
                }
            }

            function blockEl(el, options) {
                // Shows the element block UI.

                var customBlockOptions,
                    $el = $(el);

                if (!isBlockUISupported()) {
                    return;
                }

                /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                if ($el.data(showingWaitAttr)) {
                    // If we're already showing the block, then don't start this again.
                    // Using a different flag than the count itself to support delaying the unblock.
                    return;
                }

                function showFullBlock() {
                    /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                    if (!$el.data(showingWaitAttr)) {
                        // If we're no longer showing the wait then the block was removed before the visible block was added.
                        // We shouldn't continue to add the visible block.
                        return;
                    }

                    if (isFullPage(el)) {
                        $.blockUI(angular.extend({}, fullPageVisibleBlockOptions, customBlockOptions));
                    } else {
                        $el.block(angular.extend({}, visibleBlockOptions, customBlockOptions));
                    }
                }

                options = angular.extend({}, {
                    visualBlockDelay: 300
                }, options || /* istanbul ignore next: sanity check */ {});

                customBlockOptions = {
                    fadeIn: options.fadeIn
                };

                $el.data(showingWaitAttr, true);

                if (options.visualBlockDelay) {
                    if (isFullPage(el)) {
                        $.blockUI(fullPageClearBlockOptions);
                    } else {
                        $el.block(clearBlockOptions);
                    }

                    $timeout(showFullBlock, options.visualBlockDelay);
                } else {
                    showFullBlock();
                }
            }

            function unblockEl(el) {
                // Removes the element block UI.

                // Including a setTimeout here so that if a block is immediately re-added, then there won't be a blink
                // between turning off the current block and then adding another.
                // This timeout could default to something higher than 0 or we could make it configurable if needed.
                // A set timeout of 0 handles blocks added without async operations before starting another, which
                // would indicate that the block should have been maintained anyways.
                $timeout(function () {
                    /* istanbul ignore else: sanity check */
                    if (getWaitCount(el) === 0) {
                        var $el = $(el);

                        if (!isBlockUISupported()) {
                            return;
                        }

                        if (isFullPage(el)) {
                            $.unblockUI();
                        } else {
                            $el.unblock();
                        }
                        $(el).removeData(showingWaitAttr);
                    }
                }, 0);
            }

            addWait = function (el, options) {
                options = options || {};

                // Increases the element wait count and shows the wait if the count is above 0.
                var count = getWaitCount(el, options.nonblocking);
                count += 1;

                setWaitCount(el, count, options.nonblocking);
                if (count === 1) {
                    if (options.nonblocking) {
                        nonblockEl(el, options);
                    } else {
                        blockEl(el, options);
                    }
                }
            };

            removeWait = function (el, options) {
                options = options || {};

                // Decreases the element wait count and hides the wait if the count is at 0.
                var count = getWaitCount(el, options.nonblocking);
                if (count > 0) {
                    count -= 1;

                    setWaitCount(el, count, options.nonblocking);
                    if (count === 0) {
                        if (options.nonblocking) {
                            unNonblockEl(el, options);
                        } else {
                            unblockEl(el, options);
                        }
                    }
                }
            };

            function clearAllWaits(el) {
                // Forcibly clears out the wait count for an element
                setWaitCount(el, 0);
                unblockEl(el);
                setWaitCount(el, 0, true);
                unNonblockEl(el);
            }

            if (isBlockUISupported()) {
                // Clear any blockUI defaults.  Specifying these in the block call itself just gets appended to the defaults
                // but is incapable of generically clearing them all.
                $.blockUI.defaults.css = {};
                $.blockUI.defaults.overlayCSS = {};
            }

            return {
                beginElWait: function (el, options) {
                    addWait(el, options);
                },
                beginPageWait: function (options) {
                    addWait(document.body, options);
                },
                clearElWait: function (el) {
                    clearAllWaits(el);
                },
                clearPageWait: function () {
                    clearAllWaits(document.body);
                },
                endElWait: function (el, options) {
                    removeWait(el, options);
                },
                endPageWait: function (options) {
                    removeWait(document.body, options);
                }
            };
        }])
        .directive('bbWait', ['bbWait', function (bbWait) {
            /// <summary>
            /// This directive provides an attribute that can be placed on elements indicating whether they should or shouldn't be blocked for waiting.
            /// </summary>
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var firstScopeLoad = true;
                    scope.$watch(attrs.bbWait, function (value, oldValue) {
                        if (value && (!oldValue || firstScopeLoad)) {
                            bbWait.beginElWait(el);
                        } else if (oldValue && !value) {
                            bbWait.endElWait(el);
                        }
                        firstScopeLoad = false;
                    });
                }
            };
        }]);

}(jQuery));

/*global angular*/

/** @module Window
@icon desktop
@summary The window services provides helper methods to edit the browser’s window title and to obtain the browser’s scrollbar width.
@description An angular service with the following functions:

  - `setWindowTitle(title)` Changes the browser window's title. If a product name is specified in `bbWindowConfig`, then the product name will be appended to the passed title.
  - `getScrollbarWidth` Calculates and returns the width of the scrollbar for the current browser.
  - `isIosUserAgent` Uses window navigator user agent to determine if current user agent is an iPod, iPad, or iPhone.
*/

(function () {
    'use strict';

    angular.module('sky.window', [])
        .constant('bbWindowConfig', {
            productName: ''
        })
        .factory('bbWindow', ['$window', 'bbWindowConfig', '$timeout', '$document', function ($window, bbWindowConfig, $timeout, $document) {
            var scrollbarWidth;

            function calculateScrollbarWidth() {
                var inner,
                    outer,
                    w1,
                    w2;

                inner = angular.element('<p></p>');
                inner.css('width', '100%');
                inner.css('height', '200px');

                outer = angular.element('<div></div>');
                outer.css('position', 'absolute');
                outer.css('top', '0px');
                outer.css('left', '0px');
                outer.css('visibility', 'hidden');
                outer.css('width', '200px');
                outer.css('height', '150px');
                outer.css('overflow', 'hidden');

                outer.append(inner);

                $document.find('body').append(outer);

                w1 = inner[0].offsetWidth;

                outer.css('overflow', 'scroll');
                w2 = inner[0].offsetWidth;

                /*istanbul ignore else: sanity check */
                if (w1 === w2) {
                    w2 = outer[0].clientWidth;
                }
                outer.remove();
                return (w1 - w2);
            }

            return {
                setWindowTitle: function (title) {
                    var textToAppend = bbWindowConfig.productName;

                    if (textToAppend) {
                        title = title || '';

                        if (title) {
                            title += ' - ';
                        }

                        title += textToAppend;
                    }

                    //Adding a delay so the setWindowTitle method can be safely called after an angular
                    //state change without taking affect until after the browser has completed its
                    //state change.  Without this, the previous page will be renamed in the browser history.
                    $timeout(function () {
                        $window.document.title = title;
                    });
                },
                getScrollbarWidth: function () {
                    if (!scrollbarWidth && scrollbarWidth !== 0) {
                        scrollbarWidth = calculateScrollbarWidth();
                    }

                    return scrollbarWidth;
                },
                isIosUserAgent: function () {
                    return /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                }
            };
        }]);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Wizard
@icon magic
@summary The wizard adjusts a modal form to guide users through a set of pre-defined steps in a particular order.
 @description Wizards are used on a modal form when the user needs to perform a set of pre-defined steps in a particular order. The Sky UX Wizard works in conjunction with the [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/) tabs component.  Placing the `bb-wizard` directive on a UI Bootstrap `tabset` element will cause the tabs to look and behave like a Sky wizard.

Sky Wizards also have the concept of a completed step which is denoted by the `bb-wizard-step-complete` directive. When present on a `tab` and bound to a truthy value, the step's tab will be displayed as completed.

Finally there is a `bbWizardNavigator` service that provides some convenience methods for navigating through the wizard's steps. This will typically be used by wiring the navigator up to your modal's previous and next buttons.

The `bbWizardNavigator` service has an `init()` function that takes an `options` object with the following properties:

- `steps` An array of steps. Each step should have the following properties:


 - `active` Indicates whether the step is the currently active step. This should be the same property that is bound to the UI Bootstrap `tab` directive's `active` property.
 - `disabled()` A function that returns a boolean indicating whether the tab is disabled. This should be the same function that is bound to the UI Bootstrap `tab` directive's `disabled` property.
 - `complete()` A function that returns a boolean indicating whether the tab is complete. This should be the same function that is bound to the tab's `bb-wizard-step-complete` property.

The `bbWizardNavigator` also exposes the following methods:

- `previousText()` Returns the text for the modal's Previous button. This usually doesn't change while the user interacts with the widget.
- `nextText()` Returns the text for the modal's Next button. This changes to "Finish" when the user is on the last step.
- `goToPrevious()` Navigates the user to the previous step.
- `goToNext()` Navigates the user to the next step.
- `previousDisabled()` Indicates whether the previous step is disabled. This should be bound to the `ng-disabled` property of the modal's Previous button.
- `nextDisabled()` Indicates whether the next step is disabled. This should be bound to the `ng-disabled` property of the modal's Next button.
 */

(function () {
    'use strict';

    angular.module('sky.wizard', ['sky.resources', 'ui.bootstrap.tabs'])
        .directive('bbWizard', function () {
            return {
                link: function (scope, el) {
                    /*jslint unparam: true */
                    el.addClass('bb-wizard');
                },
                require: 'tabset',
                restrict: 'A'
            };
        })
        .directive('bbWizardStepComplete', function () {
            return {
                link: function (scope, el, attrs) {
                    scope.$watch(attrs.bbWizardStepComplete, function (newValue) {
                        el[newValue ? 'addClass' : 'removeClass']('bb-wizard-step-complete');
                    });
                }
            };
        })
        .factory('bbWizardNavigator', ['bbResources', function (bbResources) {
            function stepIsDisabled(step) {
                return angular.isFunction(step.disabled) && step.disabled();
            }

            return {
                init: function (options) {
                    /*jslint unparam: true */
                    var steps,
                        finish;

                    function getPreviousStep() {
                        var i,
                            n,
                            previousStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];

                            if (step.active && i > 0) {
                                previousStep = steps[i - 1];

                                if (!stepIsDisabled(previousStep)) {
                                    return previousStep;
                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function getNextStep() {
                        var i,
                            n,
                            nextStep,
                            step;

                        for (i = 0, n = steps.length; i < n; i++) {
                            step = steps[i];

                            if (step.active && i + 1 < n) {
                                nextStep = steps[i + 1];

                                if (!stepIsDisabled(nextStep)) {
                                    return nextStep;
                                }

                                break;
                            }
                        }

                        return null;
                    }

                    function setActiveStep(step) {
                        if (step) {
                            step.active = true;
                        }
                    }

                    function lastStepIsActive() {
                        return steps[steps.length - 1].active;
                    }

                    options = options || {};

                    steps = options.steps;
                    finish = options.finish;

                    return {
                        previousText: function () {
                            return bbResources.wizard_navigator_previous;
                        },
                        nextText: function () {
                            return lastStepIsActive() ? bbResources.wizard_navigator_finish : bbResources.wizard_navigator_next;
                        },
                        goToPrevious: function () {
                            setActiveStep(getPreviousStep());
                        },
                        goToNext: function () {
                            if (lastStepIsActive()) {
                                if (angular.isFunction(finish)) {
                                    finish();
                                }
                            } else {
                                setActiveStep(getNextStep());
                            }
                        },
                        previousDisabled: function () {
                            return !getPreviousStep();
                        },
                        nextDisabled: function () {
                            return !getNextStep() && !lastStepIsActive();
                        }
                    };
                }
            };
        }]);
}());

/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    var modules = [
        'sky.actionbar',
        'sky.autofocus',
        'sky.autonumeric',
        'sky.check',
        'sky.checklist',
        'sky.contextmenu',
        'sky.data',
        'sky.datepicker',
        'sky.daterangepicker',
        'sky.format',
        'sky.grids',
        'sky.help',
        'sky.helpbutton',
        'sky.highlight',
        'sky.mediabreakpoints',
        'sky.modal',
        'sky.moment',
        'sky.navbar',
        'sky.omnibar',
        'sky.palette',
        'sky.page',
        'sky.pagination',
        'sky.popover',
        'sky.resources',
        'sky.scrollintoview',
        'sky.searchfield',
        'sky.tabscroll',
        'sky.tabset',
        'sky.tabsref',
        'sky.templates',
        'sky.templating',
        'sky.textexpand',
        'sky.tiles',
        'sky.tooltip',
        'sky.utilities',
        'sky.validation',
        'sky.viewkeeper',
        'sky.wait',
        'sky.window',
        'sky.wizard'
    ];

    try {
        angular.module('toastr');
        modules.push('sky.toast');
    } catch (ignore) {
        /* The toastr module isn't defined.  Do not load sky.toast module */
    }

    try {
        angular.module('ngFileUpload');
        modules.push('sky.fileattachments');
    } catch (ignore) {

    }

    angular.module('sky', modules);

}());

/*jshint unused: false */
/*global angular, bbResourcesOverrides */

(function () {
'use strict';

var bbResourcesOverrides;
    
bbResourcesOverrides = {
    "action_bar_actions": "Actions", // The label for the actions dropdown on the action button bar
    "autonumeric_abbr_billions": "b", // The suffix to show after an abbreviated value in the billions (e.g. $1.2b)
    "autonumeric_abbr_millions": "m", // The suffix to show after an abbreviated value in the millions (e.g. $1.2m)
    "autonumeric_abbr_thousands": "k", // The suffix to show after an abbreviated value in the thousands (e.g. $1.2k)
    "checklist_select_all": "Select all", // Text for the link in a checklist to select all items.
    "checklist_clear_all": "Clear all", // Text for the link in a checklist to clear selections.
    "checklist_no_items": "No items found", // Text in a checklist when no items are shown based on the current filter.
    "grid_back_to_top": "Back to top", // Text for link in grid to scroll back to the top.
    "grid_column_picker_all_categories": "All", // Button text for category filters used to indicate that all columns should be shown in the column picker
    "grid_column_picker_description_header": "Description", // In the column picker, the header for the column showing the description of the columns to include in the grid.
    "grid_column_picker_header": "Choose columns to show in the list", // Header text for the grid column picker screen
    "grid_column_picker_name_header": "Column", // In the column picker, the header for the column showing the names of the columns to include in the grid.
    "grid_column_picker_search_placeholder": "Search by name", // Search text placeholder for the search box on the grid column picker
    "grid_column_picker_submit": "Apply changes", // Button text for applying changes made in the grid column picker
    "grid_columns_button": " Choose columns", // Label for button to select columns to display in a grid.
    "grid_filters_apply": "Apply filters", // Text for button on filters flyout to apply the selected filters to the grid
    "grid_filters_button": "Filters", // Label for button to select filters to be applied to a grid.
    "grid_filters_clear": "Clear", // Text for button on filters flyout to clear the selected filters for the grid
    "grid_filters_header": "Filter", // Header text for grid filters flyout
    "grid_filters_hide": "Hide", // Hide link text for grid filters flyout
    "grid_filters_summary_header": "Filter:", // Header text for filter summary on top of grid
    "grid_load_more": "Load more", // The text for the button to load additional rows into the grid if more rows are available.
    "grid_search_placeholder": "Find in this list", // Placeholder text in grid search box
    "grid_column_picker_search_no_columns": "No columns found", // Displays when no columns are found for the specified search text.
    "modal_footer_cancel_button": "Cancel", // Default lable text for modal cancel button
    "modal_footer_primary_button": "Save", // Default lable text for modal primary button
    "month_short_april": "Apr",
    "month_short_august": "Aug",
    "month_short_december": "Dec",
    "month_short_february": "Feb",
    "month_short_january": "Jan",
    "month_short_july": "Jul",
    "month_short_june": "Jun",
    "month_short_march": "Mar",
    "month_short_may": "May",
    "month_short_november": "Nov",
    "month_short_october": "Oct",
    "month_short_september": "Sep",
    "page_noaccess_button": "Return to a non-classified page",
    "page_noaccess_description": "Sorry, you don\'t have rights to this page.\nIf you feel you should, please contact your system administrator.",
    "page_noaccess_header": "Move along, there\'s nothing to see here",
    "text_expand_see_less": "See less", // Display less text content
    "text_expand_see_more": "See more",
    "grid_action_bar_clear_selection": "Clear selection", // Clear the selections in the grid.
    "grid_action_bar_cancel_mobile_actions": "Cancel", // Close the menu where you choose an action in mobile multiselect.
    "grid_action_bar_choose_action": "Choose an action", // Open a menu to choose an action in mobile  multiselect.
    "date_field_invalid_date_message": "Please enter a valid date", // error message shown when an invalid date is entered.
    "date_range_picker_this_week": "This week", //text for date range picker
    "date_range_picker_last_week": "Last week", //text for date range picker
    "date_range_picker_next_week": "Next week", //text for date range picker
    "date_range_picker_this_month": "This month", //text for date range picker
    "date_range_picker_last_month": "Last month", //text for date range picker
    "date_range_picker_next_month": "Next month", //text for date range picker
    "date_range_picker_this_calendar_year": "This calendar year", //text for date range picker
    "date_range_picker_last_calendar_year": "Last calendar year", //text for date range picker
    "date_range_picker_next_calendar_year": "Next calendar year", //text for date range picker
    "date_range_picker_this_fiscal_year": "This fiscal year", //text for date range picker
    "date_range_picker_last_fiscal_year": "Last fiscal year", //text for date range picker
    "date_range_picker_next_fiscal_year": "Next fiscal year", //text for date range picker
    "date_range_picker_this_quarter": "This quarter", //text for date range picker
    "date_range_picker_last_quarter": "Last quarter", //text for date range picker
    "date_range_picker_next_quarter": "Next quarter", //text for date range picker
    "date_range_picker_at_any_time": "At any time", //text for date range picker
    "date_range_picker_today": "Today", //text for date range picker
    "date_range_picker_tomorrow": "Tomorrow", //text for date range picker
    "date_range_picker_yesterday": "Yesterday", //text for date range picker
    "date_range_picker_filter_description_this_week": "{0} for this week", //text for date range picker
    "date_range_picker_filter_description_last_week": "{0} from last week", //text for date range picker
    "date_range_picker_filter_description_next_week": "{0} for next week", //text for date range picker
    "date_range_picker_filter_description_this_month": "{0} for this month", //text for date range picker
    "date_range_picker_filter_description_last_month": "{0} from last month", //text for date range picker
    "date_range_picker_filter_description_next_month": "{0} for next month", //text for date range picker
    "date_range_picker_filter_description_this_calendar_year": "{0} for this calendar year", //text for date range picker
    "date_range_picker_filter_description_last_calendar_year": "{0} from last calendar year", //text for date range picker
    "date_range_picker_filter_description_next_calendar_year": "{0} for next calendar year", //text for date range picker
    "date_range_picker_filter_description_this_fiscal_year": "{0} for this fiscal year", //text for date range picker
    "date_range_picker_filter_description_last_fiscal_year": "{0} from last fiscal year", //text for date range picker
    "date_range_picker_filter_description_next_fiscal_year": "{0} for next fiscal year", //text for date range picker
    "date_range_picker_filter_description_this_quarter": "{0} for this quarter", //text for date range picker
    "date_range_picker_filter_description_last_quarter": "{0} from last quarter", //text for date range picker
    "date_range_picker_filter_description_next_quarter": "{0} for next quarter", //text for date range picker
    "date_range_picker_filter_description_at_any_time": "{0} at any time", //text for date range picker
    "date_range_picker_filter_description_today": "{0} for today", //text for date range picker
    "date_range_picker_filter_description_yesterday": "{0} from yesterday", //text for date range picker
    "date_range_picker_filter_description_tomorrow": "{0} for tomorrow", //text for date range picker
    "file_size_b_plural": "{0} bytes",
    "file_size_b_singular": "{0} byte",
    "file_size_kb": "{0} KB",
    "file_size_mb": "{0} MB",
    "file_size_gb": "{0} GB",
    "file_upload_drag_file_here": "Drag a file here",
    "file_upload_drop_files_here": "Drop files here",
    "file_upload_invalid_file": "This file type is invalid",
    "file_upload_link_placeholder": "http://www.something.com/file",
    "file_upload_or_click_to_browse": "or click to browse",
    "file_upload_paste_link": "Paste a link to a file",
    "file_upload_paste_link_done": "Done",
    "searchfield_searching": "Searching...", //text for ui-select search control while performing a remote search
    "searchfield_no_records": "Sorry, no matching records found", // text for ui-select search control when no records are found,
    "wizard_navigator_finish": "Finish", // Text displayed on the next button when a wizard is ready for completion.
    "wizard_navigator_next": "Next", // Text displayed on a wizard"s next button.
    "wizard_navigator_previous": "Previous", // Text displayed on a wizard"s previous button.
    "datepicker_today": "Today", //Text displayed in the Today button of the datepicker
    "datepicker_clear": "Clear", //Text displayed in the Clear button of the datepicker
    "datepicker_close": "Done" //Text displayed in the Close button of the datepicker
};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());
angular.module('sky.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('sky/templates/actionbar/actionbar.html',
        '<div class="bb-action-bar">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/actionbar/actionbaritem.html',
        '<button class="btn bb-btn-secondary bb-action-bar-item-button" type="button">\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/actionbar/actionbaritemgroup.html',
        '<div class="bb-action-bar-group">\n' +
        '    <div class="bb-action-bar-buttons hidden-xs">\n' +
        '        <ng-transclude />\n' +
        '    </div>\n' +
        '    <div class="bb-action-bar-dropdown hidden-sm hidden-md hidden-lg">\n' +
        '        <div class="dropdown">\n' +
        '             <button class="btn bb-btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" href="javascript:void(0)">\n' +
        '            {{title}}<span class="caret"/>\n' +
        '            </button>\n' +
        '\n' +
        '            <ul class="dropdown-menu">\n' +
        '\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</span>\n' +
        '');
    $templateCache.put('sky/templates/charts/scatterplot.html',
        '<div class="bb-chart-container">\n' +
        '    <div ng-style="moveBackStyle()" ng-show="moveBackVisible">\n' +
        '        <a ng-href="#" ng-click="moveBack()" ng-disabled="moveBackDisabled()">\n' +
        '            <i class="glyphicon glyphicon-play icon-flipped"></i>\n' +
        '        </a>\n' +
        '    </div>\n' +
        '    <div ng-style="moveForwardStyle()" ng-show="moveForwardVisible">\n' +
        '        <a ng-href="#" ng-click="moveForward()" ng-disabled="moveForwardDisabled()">\n' +
        '            <i class="glyphicon glyphicon-play"></i>\n' +
        '        </a>\n' +
        '    </div>\n' +
        '    <div class="bb-chart"></div>\n' +
        '</div>');
    $templateCache.put('sky/templates/check/styled.html',
        '<span></span>\n' +
        '');
    $templateCache.put('sky/templates/check/wrapper.html',
        '<label class="bb-check-wrapper"></label>\n' +
        '');
    $templateCache.put('sky/templates/checklist/checklist.html',
        '<div>\n' +
        '    <div>\n' +
        '        <div ng-if="bbChecklistIncludeSearch" class="bb-checklist-filter-bar">\n' +
        '            <div class="bb-checklist-search">\n' +
        '                <input type="text" class="bb-checklist-search-box" maxlength="255" placeholder="{{bbChecklistSearchPlaceholder}}" ng-model="locals.searchText" ng-model-options="{debounce: bbChecklistSearchDebounce}" data-bbauto-field="ChecklistSearch">\n' +
        '                <div class="bb-checklist-search-icon">\n' +
        '                    <i class="fa fa-search"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div ng-if="bbChecklistCategories && bbChecklistCategories.length > 0" class="bb-checklist-filter-bar bb-checklist-category-bar">\n' +
        '            <button type="button" class="btn btn-sm" ng-click="locals.filterByCategory()" ng-class="locals.selectedCategory ? \'btn-default\' : \'btn-primary\'">{{\'grid_column_picker_all_categories\' | bbResources}}</button>\n' +
        '            <button ng-repeat="category in bbChecklistCategories" type="button" class="btn btn-sm" ng-click="locals.filterByCategory(category)" ng-class="locals.selectedCategory === category ? \'btn-primary\' : \'btn-default\'">{{category}}</button>\n' +
        '        </div>\n' +
        '        <div class="bb-checklist-filter-bar bb-checklist-select-all-bar">\n' +
        '            <button type="button" class="btn btn-link" data-bbauto-field="ChecklistSelectAll" ng-click="locals.selectAll()">{{\'checklist_select_all\' | bbResources}}</button>\n' +
        '            <button type="button" class="btn btn-link" data-bbauto-field="ChecklistClear" ng-click="locals.clear()">{{\'checklist_clear_all\' | bbResources}}</button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="bb-checklist-wrapper" ng-switch="bbChecklistMode">\n' +
        '        <div ng-switch-when="list" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{locals.filteredItems.length}}">\n' +
        '            <label class="bb-checklist-list-row" ng-repeat="item in locals.filteredItems" data-bbauto-field="{{item.name}}">\n' +
        '                <div class="bb-checklist-list-col bb-checklist-list-col-checkbox">\n' +
        '                    <input\n' +
        '                           bb-check\n' +
        '                           type="checkbox"\n' +
        '                           checklist-model="bbChecklistSelectedItems"\n' +
        '                           checklist-value="item"\n' +
        '                           />\n' +
        '                </div>\n' +
        '                <div class="bb-checklist-list-col">\n' +
        '                    <div class="bb-checklist-list-title" bb-highlight="locals.searchText" ng-bind="item.title"></div>\n' +
        '                    <div class="bb-checklist-list-description" bb-highlight="locals.searchText" ng-bind="item.description"></div>\n' +
        '                </div>\n' +
        '            </label>\n' +
        '        </div>\n' +
        '        <table class="table bb-checklist-table" ng-switch-default>\n' +
        '            <thead>\n' +
        '                <tr>\n' +
        '                    <th class="bb-checklist-checkbox-column"></th>\n' +
        '                    <th ng-repeat="column in locals.columns" class="{{column.class}}" ng-style="{\'width\': column.width}">{{column.caption}}</th>\n' +
        '                </tr>\n' +
        '            </thead>\n' +
        '            <tbody bb-highlight="locals.searchText" bb-highlight-beacon="locals.highlightRefresh" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{locals.filteredItems.length}}">\n' +
        '                <tr ng-repeat="item in locals.filteredItems" ng-click="locals.rowClicked(item);" class="bb-checklist-row">\n' +
        '                    <td>\n' +
        '                        <input bb-check type="checkbox" checklist-model="bbChecklistSelectedItems" checklist-value="item" data-bbauto-field="{{item[bbChecklistAutomationField]}}" />\n' +
        '                    </td>\n' +
        '                    <td ng-repeat="column in locals.columns" class="{{column.class}}" data-bbauto-field="{{column.automationId}}" data-bbauto-index="{{$parent.$index}}">{{item[column.field]}}</td>\n' +
        '                </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '        <div class="bb-checklist-no-items" ng-if="!locals.filteredItems.length">{{bbChecklistNoItemsMessage || (\'checklist_no_items\' | bbResources)}}</div>\n' +
        '    </div>\n' +
        '    <div ng-transclude></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/contextmenu.html',
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" dropdown>\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="contextButtonStopPropagation($event)" dropdown-toggle></bb-context-menu-button>\n' +
        '    <ul class="dropdown-menu" role="menu">\n' +
        '        <ng-transclude/>\n' +
        '    </ul>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/menubutton.html',
        '<button type="button" class="btn bb-btn-secondary bb-context-menu-btn"><i class="fa fa-ellipsis-h"></i></button>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/menuitem.html',
        '<li role="presentation"><a role="menuitem" href="javascript:void(0)" ng-click="clickItem()"><ng-transclude/></a></li>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/submenu.html',
        '<div class="bb-submenu">\n' +
        '    <accordion>\n' +
        '        <accordion-group is-open="accordionLocals.accordionOpen">\n' +
        '\n' +
        '            <accordion-heading ng-if="accordionLocals.staticHeader">\n' +
        '                <div ng-click="toggleAccordion($event)">\n' +
        '                    <span>\n' +
        '                        {{heading}}\n' +
        '                    <span>\n' +
        '                    <i ng-class="\'fa-chevron-\' + (accordionLocals.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '                </div>\n' +
        '            </accordion-heading>\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </accordion-group>\n' +
        '    </accordion>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/submenuheading.html',
        '<accordion-heading>\n' +
        '    <div ng-click="toggleAccordion($event)">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '        <i ng-class="\'fa-chevron-\' + (accordionLocals.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '    </div>\n' +
        '    \n' +
        '</accordion-heading>\n' +
        '');
    $templateCache.put('sky/templates/datefield/datefield.html',
        '<span class="add-on input-group-btn">\n' +
        '    <button type="button" class="btn btn-default bb-date-field-calendar-button">\n' +
        '        <i class="fa fa-calendar"></i>\n' +
        '    </button>\n' +
        '</span>');
    $templateCache.put('sky/templates/datepicker/datepicker.html',
        '<div>\n' +
        '    <div ng-if="locals.loaded" class="input-group bb-datefield">\n' +
        '        <input name="{{locals.inputName}}" type="text" class="form-control" ng-model="locals.date" is-open="locals.opened" datepicker-options="locals.dateOptions" datepicker-popup="{{format}}" show-button-bar="locals.showButtonBar" current-text="{{resources.datepicker_today}}" clear-text="{{resources.datepicker_clear}}" close-text="{{resources.datepicker_close}}" datepicker-append-to-body="{{locals.appendToBody}}" close-on-date-selection="{{locals.closeOnSelection}}" bb-datepicker-custom-validate="{{locals.hasCustomValidation}}" placeholder="{{placeholderText}}" max-date="maxDate" min-date="minDate" ng-required="locals.required" bb-min-date bb-max-date />\n' +
        '        <span class="bb-datepicker-button-container add-on input-group-btn" ng-class="{\'bb-datefield-open\': locals.opened}">\n' +
        '            <button type="button" class="btn btn-default bb-date-field-calendar-button" ng-click="locals.open($event)">\n' +
        '                <i class="fa fa-calendar"></i>\n' +
        '            </button>\n' +
        '        </span>\n' +
        '    </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/daterangepicker/daterangepicker.html',
        '<div>\n' +
        '    <select data-bbauto-field="{{bbDateRangePickerAutomationId}}_DateRangeType"\n' +
        '            class="form-control"\n' +
        '            ng-options="locals.bbDateRangePicker.getDateRangeTypeCaption(t) for t in (bbDateRangePickerOptions.availableDateRangeTypes || locals.bbDateRangePicker.defaultDateRangeOptions)"\n' +
        '            ng-model="bbDateRangePickerValue.dateRangeType" />\n' +
        '</div>');
    $templateCache.put('sky/templates/fileattachments/filedrop.html',
        '<div class="row bb-file-drop-row">\n' +
        '    <div class="col-xs-12 bb-file-drop-col" ng-class="{\'col-sm-6\': bbFileDrop.allowLinks}">\n' +
        '        <div\n' +
        '             class="bb-file-drop bb-file-drop-target"\n' +
        '             ngf-drop\n' +
        '             ngf-keep="false"\n' +
        '             ngf-drag-over-class="{accept: \'bb-file-drop-accept\', reject: \'bb-file-drop-reject\'}"\n' +
        '             ngf-change="bbFileDrop.fileChange($files, $event, $rejectedFiles)"\n' +
        '             >\n' +
        '            <div class="bb-file-drop-contents" ng-if="!bbFileDrop.hasTranscludeContents">\n' +
        '                <div class="bb-file-drop-contents-not-over">\n' +
        '                    <h4>{{\'file_upload_drag_file_here\' | bbResources}}</h4>\n' +
        '                    <h5>{{\'file_upload_or_click_to_browse\' | bbResources}}</h5>\n' +
        '                    <i class="fa fa-cloud-upload bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '                <div class="bb-file-drop-contents-accept">\n' +
        '                    <h4>{{\'file_upload_drop_files_here\' | bbResources}}</h4>\n' +
        '                    <i class="fa fa-bullseye bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '                <div class="bb-file-drop-contents-reject">\n' +
        '                    <h4>{{\'file_upload_invalid_file\' | bbResources}}</h4>\n' +
        '                    <i class="fa fa-times-circle bb-file-upload-icon"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="bb-file-drop-contents-custom" ng-transclude></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="col-sm-6 col-xs-12 bb-file-drop-col" ng-if="bbFileDrop.allowLinks">\n' +
        '        <div class="bb-file-drop-contents">\n' +
        '            <div class="bb-file-drop-link">\n' +
        '                <h4 class="bb-file-drop-link-header">{{\'file_upload_paste_link\' | bbResources}}</h4>\n' +
        '                <div class="form-group">\n' +
        '                    <input\n' +
        '                           type="text"\n' +
        '                           class="form-control"\n' +
        '                           placeholder="{{\'file_upload_link_placeholder\' | bbResources}}"\n' +
        '                           ng-model="bbFileDrop.url"\n' +
        '                           ng-keypress="$event.keyCode === 13 && bbFileDrop.addLink()"\n' +
        '                           />\n' +
        '                </div>\n' +
        '                <button type="button" class="btn btn-primary" ng-disabled="!bbFileDrop.url" ng-click="bbFileDrop.addLink()">\n' +
        '                    {{\'file_upload_paste_link_done\' | bbResources}}\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/fileattachments/fileitem.html',
        '<div class="bb-file-item">\n' +
        '    <div class="row bb-file-item-title">\n' +
        '        <div class="col-xs-10">\n' +
        '            <div class="bb-file-item-name">\n' +
        '                <strong>{{item.name || item.url}}</strong>\n' +
        '            </div>\n' +
        '            <div class="bb-file-item-size" ng-if="bbFileItem.isFile()">\n' +
        '                ({{item.size | bbFileSize}})\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-xs-2">\n' +
        '            <div class="pull-right">\n' +
        '                <button type="button" class="btn bb-btn-secondary bb-file-item-btn-delete" ng-click="itemDelete()">\n' +
        '                    <i class="glyphicon glyphicon-trash"></i>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-xs-3" ng-switch="bbFileItem.isImg()">\n' +
        '            <img class="bb-file-item-preview-img center-block" ngf-src="item" ng-switch-when="true" />\n' +
        '            <div class="bb-file-item-preview-other" ng-switch-when="false">\n' +
        '                <i class="fa" ng-class="bbFileItem.otherCls"></i>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-xs-9" ng-transclude>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/actionbar.html',
        '<div ng-show="locals.showActionBar" data-bbauto-view="GridActionBar">\n' +
        '    <div ng-if="!locals.showMobileActions" class="bb-grid-action-bar">\n' +
        '        <div ng-if="!locals.mobileButtons" class="bb-grid-action-bar-buttons" ng-repeat="action in locals.actions">\n' +
        '            <button type="button" class="btn" ng-class="{\'btn-primary\': action.isPrimary, \'bb-btn-secondary\': !action.isPrimary}" data-bbauto-field="{{action.automationId}}" ng-click="action.actionCallback()" ng-disabled="action.selections.length < 1">{{action.title}} ({{action.selections.length}})</button>\n' +
        '        </div>\n' +
        '        <div ng-if="locals.mobileButtons" class="bb-grid-action-bar-buttons">\n' +
        '            <button type="button" class="btn btn-primary" ng-click="locals.chooseAction()">\n' +
        '                <span>{{resources.grid_action_bar_choose_action}}</span>\n' +
        '            </button>\n' +
        '        </div>\n' +
        '        <button type="button" class="btn bb-grid-action-bar-clear-selection" ng-click="locals.clearSelection()">\n' +
        '            {{resources.grid_action_bar_clear_selection}}\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div ng-if="locals.showMobileActions" class="bb-grid-action-bar-mobile-buttons">\n' +
        '        <div class="bb-grid-action-bar-btn-container">\n' +
        '            <div ng-repeat="action in locals.actions">\n' +
        '                <button type="button" class="bb-grid-action-bar-mobile-btn btn btn-block btn-lg" ng-class="{\'btn-primary\': action.isPrimary, \'bb-btn-secondary\': !action.isPrimary}" ng-click="action.actionCallback()" ng-disabled="action.selections.length < 1">{{action.title}} ({{action.selections.length}})</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <button type="button" class="btn bb-grid-action-bar-mobile-cancel bb-grid-action-bar-clear-selection" ng-click="locals.cancelChooseAction()">\n' +
        '            {{resources.grid_action_bar_cancel_mobile_actions}}\n' +
        '        </button>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/columnpicker.html',
        '<bb-modal data-bbauto-view="ColumnPicker">\n' +
        '  <bb-modal-header bb-modal-help-key="$parent.columnPickerHelpKey">{{\'grid_column_picker_header\' | bbResources}}</bb-modal-header>\n' +
        '  <div bb-modal-body>\n' +
        '    <bb-checklist\n' +
        '                  bb-checklist-items="columns" \n' +
        '                  bb-checklist-selected-items="locals.selectedColumns" \n' +
        '                  bb-checklist-include-search="\'true\'" \n' +
        '                  bb-checklist-search-placeholder="{{\'grid_column_picker_search_placeholder\' | bbResources}}" \n' +
        '                  bb-checklist-no-items-message="{{\'grid_column_picker_search_no_columns\' | bbResources}}"\n' +
        '                  bb-checklist-categories="categories" \n' +
        '                  bb-checklist-mode="list" \n' +
        '                  bb-checklist-filter-local\n' +
        '                  >\n' +
        '    </bb-checklist>\n' +
        '  </div>\n' +
        '  <bb-modal-footer>\n' +
        '    <bb-modal-footer-button-primary data-bbauto-field="ColumnPickerSubmit" ng-click="applyChanges()">{{\'grid_column_picker_submit\' | bbResources}}</bb-modal-footer-button-primary>\n' +
        '    <bb-modal-footer-button-cancel data-bbauto-field="ColumnPickerCancel"></bb-modal-footer-button-cancel>\n' +
        '  </bb-modal-footer>\n' +
        '</bb-modal>');
    $templateCache.put('sky/templates/grids/dropdown.html',
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" dropdown dropdown-append-to-body ng-if="locals.items.length > 0" is-open="locals.is_open">\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="locals.toggleDropdown($event)">   \n' +
        '    </bb-context-menu-button>\n' +
        '    <ul class="dropdown-menu" role="menu">\n' +
        '        <bb-context-menu-item ng-repeat="item in locals.items" bb-context-menu-action="item.cmd()">{{item.title}}</bb-context-menu-item>\n' +
        '    </ul>\n' +
        '</div>');
    $templateCache.put('sky/templates/grids/filters.html',
        '<div style="display:none;">\n' +
        '    <div bb-scrolling-view-keeper="viewKeeperOptions" class="bb-grid-filters grid-filters">\n' +
        '        <div class="bb-grid-filters-box" bb-scroll-into-view="locals.expanded">\n' +
        '            <div class="bb-grid-filters-icon" ng-click="locals.expanded = !locals.expanded"></div>\n' +
        '            <div class="bb-grid-filters-container" style="display:none;">\n' +
        '                <div class="bb-grid-filters-header" ng-click="locals.expanded = !locals.expanded">\n' +
        '                    <h4 class="bb-grid-filters-header-title">{{resources.grid_filters_header}}</h4>\n' +
        '                    <span class="bb-grid-filters-header-hide">{{resources.grid_filters_hide}}</span>\n' +
        '                </div>\n' +
        '                <div class="bb-grid-filters-body" ng-transclude></div>\n' +
        '                <div class="bb-grid-filters-footer">\n' +
        '                    <button data-bbauto-field="ApplyGridFilters" class="btn btn-primary" type="submit" ng-click="applyFilters()">{{resources.grid_filters_apply}}</button>\n' +
        '                    <button data-bbauto-field="ClearGridFilters" class="btn bb-btn-secondary" type="button" ng-click="clearFilters()">{{resources.grid_filters_clear}}</button>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/filtersgroup.html',
        '<div class="form-group" ng-class="isCollapsed ? \'collapsed\' : \'collapsible\'">\n' +
        '    <div ng-click="isCollapsed = !isCollapsed">\n' +
        '        <i ng-class="\'glyphicon-chevron-\' + (isCollapsed ? \'down\' : \'up\')" class="bb-grid-filters-body-group-header-icon glyphicon"></i>\n' +
        '        <label>{{bbGridFiltersGroupLabel}}</label>\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filters-body-group-content" collapse="!!isCollapsed" ng-transclude></div>\n' +
        '</div>');
    $templateCache.put('sky/templates/grids/filterssummary.html',
        '<div class="toolbar bb-table-toolbar bb-applied-filter-bar">\n' +
        '    <div class="bb-applied-filter-header">\n' +
        '        <span>{{resources.grid_filters_summary_header}}</span>\n' +
        '    </div>\n' +
        '    <div class="bb-applied-filter-content" ng-click="openFilterMenu()">\n' +
        '        <span class="bb-applied-filter-text" data-bbauto-field="FilterSummaryText" ng-transclude></span>\n' +
        '        <span class="fa fa-times close" data-bbauto-field="FilterSummaryRemove" ng-click="clearFilters(); $event.stopPropagation();"></span>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/grid.html',
        '<section class="bb-grid-container" data-bbauto-grid="{{options.automationId}}" data-bbauto-timestamp="{{locals.timestamp}}" data-bbauto-repeater="{{options.automationId}}" data-bbauto-repeater-count="{{locals.rowcount}}">\n' +
        '\n' +
        '\n' +
        '    <div class="bb-grid-toolbar-viewkeeper">\n' +
        '        <div ng-if="!customToolbar.hasCustomToolbar">\n' +
        '            <div ng-show="locals.showToolbar">\n' +
        '                <bb-grid-toolbar>\n' +
        '                    <ng-transclude></ng-transclude>\n' +
        '                </bb-grid-toolbar>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div ng-if="customToolbar.hasCustomToolbar">\n' +
        '            <div ng-show="locals.showToolbar">\n' +
        '                <ng-transclude></ng-transclude>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="clearfix"></div>\n' +
        '\n' +
        '    <div class="table-responsive">\n' +
        '\n' +
        '        <table id="{{locals.gridId}}" class="bb-grid-table" bb-wait="options.loading" ng-class="{\'grid-multiselect\' : locals.multiselect}"></table>\n' +
        '        <div class="bb-grid-empty-wait" ng-if="locals.hasWaitAndEmpty()" bb-wait="locals.hasWaitAndEmpty()"></div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="!paginationOptions" class="bb-table-loadmore" data-bbauto-field="LoadMoreButton" ng-show="options.hasMoreRows" ng-click="locals.loadMore()">\n' +
        '        <span class="fa fa-cloud-download"></span>\n' +
        '        <button type="button" class="btn btn-link">{{resources.grid_load_more}}</button>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="paginationOptions" class="bb-grid-pagination-container">\n' +
        '        <pagination ng-show="paginationOptions.recordCount > options.data.length" total-items="paginationOptions.recordCount" items-per-page="paginationOptions.itemsPerPage" ng-model="locals.currentPage" ng-change="paginationOptions.pageChanged()" max-size="paginationOptions.maxPages"></pagination>\n' +
        '        <div class="clearfix"></div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="bb-grid-action-bar-and-back-to-top">\n' +
        '        <bb-grid-action-bar ng-if="locals.multiselect && multiselectActions && updateMultiselectActions" bb-multiselect-actions="multiselectActions" bb-selections-updated="updateMultiselectActions(selections)">\n' +
        '        </bb-grid-action-bar>\n' +
        '        <div class="bb-table-backtotop" data-bbauto-field="BackToTopButton" ng-show="locals.isScrolled" ng-click="locals.backToTop();">\n' +
        '            <span style="float:left">\n' +
        '                <span class="fa fa-arrow-up "></span>\n' +
        '                <button type="button" class="btn btn-link">{{resources.grid_back_to_top}}</button>\n' +
        '            </span>\n' +
        '            <span style="float:right">\n' +
        '                <span class="fa fa-arrow-up "></span>\n' +
        '                <button type="button" class="btn btn-link">{{resources.grid_back_to_top}}</button>\n' +
        '            </span>\n' +
        '            <div class="clearfix"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/grids/gridtoolbar.html',
        '<div class="bb-grid-toolbar-container">\n' +
        '    <div class="clearfix toolbar bb-table-toolbar">\n' +
        '        <button type="button" data-bbauto-field="AddButton" class="bb-grid-toolbar-btn btn-success btn" ng-show="toolbarLocals.hasAdd" ng-click="options.onAddClick()">\n' +
        '            <i class="fa fa-plus-circle"></i>\n' +
        '            <span class="bb-toolbar-btn-label" ng-show="options.onAddClickLabel">{{options.onAddClickLabel}}</span>\n' +
        '        </button>\n' +
        '        <div class="bb-grid-toolbar-button-container">\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </div>\n' +
        '        <div class="bb-search-container search-container">\n' +
        '            <input type="text" placeholder="{{resources.grid_search_placeholder}}" ng-model="searchText" ng-keyup="$event.keyCode == 13 && toolbarLocals.applySearchText()" data-bbauto-field="SearchBox" />\n' +
        '            <div class="bb-search-icon fa fa-search" data-bbauto-field="SearchButton" ng-click="toolbarLocals.applySearchText()"></div>\n' +
        '        </div>\n' +
        '        <button type="button" class="btn bb-btn-secondary bb-grid-toolbar-btn bb-column-picker-btn" data-bbauto-field="ColumnPickerButton" ng-show="!options.hideColPicker" ng-click="toolbarLocals.openColumnPicker()">\n' +
        '            <span class="fa fa-columns"></span>\n' +
        '            <span class="bb-toolbar-btn-label">{{resources.grid_columns_button}}</span>\n' +
        '        </button>\n' +
        '        <button type="button" class="btn bb-btn-secondary bb-grid-toolbar-btn bb-filter-btn" ng-class="{\'bb-filters-inline-active\': options.filtersAreActive}" data-bbauto-field="FilterButton" ng-show="!options.hideFilters" ng-click="toolbarLocals.toggleFilterMenu()">\n' +
        '            <span class="fa fa-filter"></span>\n' +
        '            <span class="bb-toolbar-btn-label">{{resources.grid_filters_button}}</span>\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filter-summary-container">\n' +
        '    </div>\n' +
        '    <div class="bb-grid-filter-inline-container" ng-hide="options.hasInlineFilters && !toolbarLocals.filtersVisible">\n' +
        '    </div>\n' +
        '    <div class="bb-grid-top-scrollbar">\n' +
        '        <div></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/grids/seemore.html',
        '<div bb-text-expand="data" bb-text-expand-max-length="100" style="white-space: pre-wrap"></div>');
    $templateCache.put('sky/templates/modal/modal.html',
        '<div class="bb-modal-content-wrapper" ng-transclude></div>');
    $templateCache.put('sky/templates/modal/modalfooter.html',
        '<div class="modal-footer" ng-transclude></div>\n' +
        '');
    $templateCache.put('sky/templates/modal/modalfooterbutton.html',
        '<button class="btn bb-btn-secondary" type="button" ng-transclude></button>\n' +
        '');
    $templateCache.put('sky/templates/modal/modalfooterbuttoncancel.html',
        '<button class="btn btn-link" type="button" ng-click="$parent.$parent.$dismiss(\'cancel\');" ng-transclude></button>');
    $templateCache.put('sky/templates/modal/modalfooterbuttonprimary.html',
        '<button class="btn btn-primary" type="submit" ng-transclude></button>');
    $templateCache.put('sky/templates/modal/modalheader.html',
        '<div class="modal-header">\n' +
        '    <h1 class="bb-dialog-header" ng-transclude></h1>\n' +
        '    <div class="fa fa-times close" ng-click="$parent.$parent.$dismiss(\'close\');"></div>\n' +
        '    <div bb-help-button bb-help-key="{{bbModalHelpKey}}" bb-set-help-key-override="true" data-bbauto-field="ModalHelpButton" ng-if="bbModalHelpKey"></div>\n' +
        '    <div class="clearfix"></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/navbar/navbar.html',
        '<nav class="navbar navbar-default bb-navbar" ng-transclude></nav>');
    $templateCache.put('sky/templates/page/page.html',
        '<section ng-if="locals.noPageStatusSpecified() || bbPageStatus === locals.pageStatuses.LOADED">\n' +
        '    <div ng-transclude ng-init="locals.onShowing()"></div>\n' +
        '</section>\n' +
        '<section class="container-fluid bb-page-content-column-container" ng-show="bbPageStatus === locals.pageStatuses.NOT_AUTHORIZED">\n' +
        '    <div class="row">\n' +
        '        <section class="bb-page-content-column col-xs-12 text-center">\n' +
        '            <div class="m">\n' +
        '                <h3>\n' +
        '                    {{resources.page_noaccess_header}}\n' +
        '                </h3>\n' +
        '            </div>\n' +
        '            <div class="bb-page-noaccess-description">{{resources.page_noaccess_description}}</div>\n' +
        '            <div class="m-lg">\n' +
        '                <button type="button" class="btn btn-lg btn-primary" ng-click="locals.navigateAway()" data-bbauto-field="NavigateAwayButton">\n' +
        '                    {{resources.page_noaccess_button}}\n' +
        '                </button>\n' +
        '            </div>\n' +
        '        </section>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/popover/popup.html',
        '<div class="popover {{placement}} fade" ng-class="{ in: isOpen()}">\n' +
        '  <div class="arrow"></div>\n' +
        '\n' +
        '  <div class="popover-inner">\n' +
        '    <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n' +
        '    <div class="popover-content"></div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/searchfield/choices.html',
        '<ul class="ui-select-choices ui-select-choices-content dropdown-menu">\n' +
        '  <li class="bb-searchfield-no-records"></li>\n' +
        '</ul>\n' +
        '');
    $templateCache.put('sky/templates/tabs/tab.html',
        '<div ng-hide="!tabsInitialized" data-bbauto-field="{{bbTabAutomationId}}" class="responsiveTabControl">\n' +
        '    <ul ng-transclude>\n' +
        '\n' +
        '    </ul>\n' +
        '</div>');
    $templateCache.put('sky/templates/tabset/addbutton.html',
        '<button ng-click="bbTabAdd()" type="button" class="bb-tab-button-wrap btn bb-tab-button-add bb-btn-secondary">\n' +
        '  <span class="btn bb-btn-secondary"><i class="fa fa-lg fa-plus-circle"></i></span>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/tabset/dropdown.html',
        '<div class="bb-tabset-dropdown nav nav-tabs" dropdown ng-show="bbTabsetOptions.isSmallScreen &amp;&amp; bbTabsetOptions.tabCount > 1">\n' +
        '  <button type="button" class="btn btn-primary bb-tab-dropdown-button" dropdown-toggle><div class="bb-tab-header-text">{{bbTabsetOptions.selectedTabHeader}}</div><i class="fa fa-caret-down"></i></button>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/tabset/openbutton.html',
        '<button ng-click="bbTabOpen()" type="button" class="bb-tab-button-wrap bb-tab-button-open btn bb-btn-secondary">\n' +
        '  <span class="btn bb-btn-secondary"><i class="fa fa-lg fa-folder-open-o"></i></span>\n' +
        '</button>\n' +
        '');
    $templateCache.put('sky/templates/tabset/tabbutton.html',
        '<li class="bb-tab-button"></li>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/container.html',
        '<div></div>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/ellipsis.html',
        '<span class="bb-text-expand-ellipsis">...</span>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/seemore.html',
        '<a href="#" class="bb-text-expand-see-more"></a>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/space.html',
        '<span class="bb-text-expand-space"> </span>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/text.html',
        '<span class="bb-text-expand-text"></span>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tile.html',
        '<section ng-class="isCollapsed ? \'collapsed\' : \'collapsible\'" class="bb-tile">\n' +
        '    <div bb-scroll-into-view="scrollIntoView">\n' +
        '        <div class="bb-tile-title" ng-click="titleClick()">\n' +
        '            <div class="bb-tile-header-with-content">\n' +
        '                <h2 class="bb-tile-header">{{tileHeader}}</h2>\n' +
        '            </div>\n' +
        '            <div class="bb-tile-header-column-tools">\n' +
        '                <div class="bb-tile-tools">\n' +
        '                    <i ng-class="\'fa-chevron-\' + (isCollapsed ? \'down\' : \'up\')" class="fa bb-tile-chevron"></i>\n' +
        '                    <i ng-if="hasSettings" class="bb-tile-settings fa fa-wrench" ng-click="$event.stopPropagation();bbTileSettingsClick();"></i>\n' +
        '                    <i class="bb-tile-grab-handle glyphicon glyphicon-th" ng-click="$event.stopPropagation()"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div collapse="isCollapsed" class="bb-tile-content" ng-transclude>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tiledashboard.html',
        '<div class="row">\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="1">\n' +
        '    <div ng-repeat="tile in tiles" data-tile-id="{{tile.id}}" data-ui-view="{{tile.view_name}}" id="{{tile.view_name}}">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="2">\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('sky/templates/tiles/tileheadercheck.html',
        '<i class="fa fa-check bb-tile-header-check"></i>');
    $templateCache.put('sky/templates/tiles/tileheadercontent.html',
        '<div class="bb-tile-header-content" ng-transclude></div>');
}]);

//# sourceMappingURL=sky.js.map