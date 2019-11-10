/*global angular */

(function () {
    'use strict';

    angular.module('sky.alert', ['sky.alert.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.avatar', ['sky.avatar.config', 'sky.avatar.directive']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.checklist',
        [
            'sky.checklist.directive',
            'sky.checklist.column.directive',
            'sky.checklist.columns.directive',
            'sky.checklist.model.directive'
        ]
    );
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.error', ['sky.error.directive', 'sky.errormodal.service']);
}());

/*global angular */

(function () {
    'use strict';

    angular.module('sky.pagesummary', []);
}());

/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.selectfield',
        [
            'sky.selectfield.directive',
            'sky.selectfieldpicker.directive',
            'sky.selectfield.item.animation'
        ]
    );

}());

/*global angular */

(function () {
    'use strict';

    function bbActionBar() {
        return {
            controller: angular.noop,
            controllerAs: 'bbActionBar',
            bindToController: true,
            scope: {},
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
                var vm = this;

                if (vm.title === null || angular.isUndefined(vm.title)) {
                    vm.title = bbResources.action_bar_actions;
                }
            },
            controllerAs: 'bbActionBarItemGroup',
            bindToController: {
                title: '=?bbActionBarItemGroupTitle'
            },
            restrict: 'E',
            scope: {},
            link: function ($scope, el) {
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
            controller: angular.noop,
            controllerAs: 'bbActionBarItem',
            bindToController: true,
            scope: {},
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

    angular.module('sky.actionbar', ['sky.resources', 'sky.mediabreakpoints', 'ui.bootstrap.dropdown'])
        .directive('bbActionBar', bbActionBar)
        .directive('bbActionBarItemGroup', bbActionBarItemGroup)
        .directive('bbActionBarItem', bbActionBarItem);
}());

/*global angular */

(function () {
    'use strict';

    function bbAlert() {
        function Controller() {

        }

        function link(scope, el, attrs, vm) {
            vm.close = function () {
                vm.bbAlertClosed = true;
            };
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbAlert',
            bindToController: {
                bbAlertType: '@',
                bbAlertCloseable: '@',
                bbAlertClosed: '='
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true
        };
    }

    angular.module('sky.alert.directive', ['sky.resources'])
        .directive('bbAlert', bbAlert);
}());

/*jshint browser: true */
/*global angular */

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

/*global angular */

(function () {
    'use strict';

    var bbAvatarConfig = {
        maxFileSize: 500000
    };

    angular.module('sky.avatar.config', [])
        .constant('bbAvatarConfig', bbAvatarConfig);
}());

/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbAvatar($filter, $templateCache, $window, bbAvatarConfig, bbErrorModal, bbFormat, bbPalette, bbResources) {
        function link(scope, el, attrs, vm) {
            var blobUrl,
                templateLoaded;

            function setImageUrl(url) {
                el.find('.bb-avatar-image').css('background-image', 'url(' + url + ')');
            }

            function getInitial(name) {
                return name.charAt(0).toUpperCase();
            }

            function getInitials(name) {
                var initials,
                    nameSplit;

                if (name) {
                    nameSplit = name.split(' ');
                    initials = getInitial(nameSplit[0]);

                    /* istanbul ignore else this is tested through a visual regression test */
                    if (nameSplit.length > 1) {
                        initials += getInitial(nameSplit[nameSplit.length - 1]);
                    }
                }

                return initials;
            }

            function getPlaceholderColor(name) {
                var colorIndex,
                    colors = bbPalette.getColorSequence(6),
                    seed;

                if (name) {
                    // Generate a unique-ish color based on the record name.  This is deterministic
                    // so that a given name will always generate the same color.
                    seed = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length;
                    colorIndex = Math.abs(seed % colors.length);
                } else {
                    colorIndex = 0;
                }

                return colors[colorIndex];
            }

            function drawPlaceolderImage() {
                var canvas,
                    context,
                    devicePixelRatio,
                    fontSize = "46px",
                    initials,
                    name,
                    size = 100;

                name = vm.bbAvatarName;
                initials = getInitials(name);

                canvas = el.find('.bb-avatar-initials')[0];
                context = canvas.getContext('2d');

                devicePixelRatio = $window.devicePixelRatio;

                /* istanbul ignore else */
                if (devicePixelRatio) {
                    $(canvas)
                        .attr('width', size * devicePixelRatio)
                        .attr('height', size * devicePixelRatio);

                    context.scale(devicePixelRatio, devicePixelRatio);
                }

                context.fillStyle = getPlaceholderColor(name);
                context.fillRect(0, 0, canvas.width, canvas.height);

                if (initials) {
                    context.font = fontSize + ' Arial';
                    context.textAlign = 'center';
                    context.fillStyle = '#FFF';
                    context.fillText(initials, size * 0.5, size * (2 / 3));
                }
            }

            function revokeBlobUrl() {
                if (blobUrl) {
                    $window.URL.revokeObjectURL(blobUrl);
                    blobUrl = null;
                }
            }

            function loadPhoto() {
                var src,
                    url;

                revokeBlobUrl();

                if (templateLoaded) {
                    src = vm.bbAvatarSrc;

                    if (src) {
                        if (src instanceof $window.File) {
                            url = $window.URL.createObjectURL(src);

                            // Keep the last blob URL around so we can revoke it later.
                            // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
                            blobUrl = url;
                        } else {
                            url = src;
                        }

                        setImageUrl(url);
                    } else {
                        drawPlaceolderImage();
                    }
                }
            }

            function handleInvalidFileDrop(rejectedFile) {
                var errorDescription,
                    errorTitle,
                    maxFileSizeFormatted;

                if (rejectedFile.type.toUpperCase().indexOf('IMAGE/') !== 0) {
                    errorDescription = bbResources.avatar_error_not_image_description;
                    errorTitle = bbResources.avatar_error_not_image_title;
                } else {
                    maxFileSizeFormatted = $filter('bbFileSize')(bbAvatarConfig.maxFileSize);

                    errorDescription = bbFormat.formatText(bbResources.avatar_error_too_large_description, maxFileSizeFormatted);
                    errorTitle = bbResources.avatar_error_too_large_title;
                }

                bbErrorModal.open({
                    errorDescription: errorDescription,
                    errorTitle: errorTitle
                });
            }

            vm.onTemplateLoad = function () {
                templateLoaded = true;
            };

            vm.photoDrop = function (files, rejectedFiles) {
                if (angular.isArray(rejectedFiles) && rejectedFiles.length > 0) {
                    handleInvalidFileDrop(rejectedFiles[0]);
                } else {
                    vm.bbAvatarChange({
                        file: files[0]
                    });
                }
            };

            vm.showInitials = function () {
                return !!(vm.bbAvatarName && !vm.bbAvatarSrc);
            };

            if (attrs.bbAvatarChange) {
                vm.canChange = true;
            }

            scope.$watch(function () {
                return templateLoaded;
            }, loadPhoto);

            scope.$watch(function () {
                return vm.bbAvatarSrc;
            }, loadPhoto);

            scope.$watch(function () {
                return vm.bbAvatarName;
            }, loadPhoto);

            scope.$on('$destroy', function () {
                revokeBlobUrl();
            });

            vm.maxFileSize = bbAvatarConfig.maxFileSize;
        }

        function template(el) {
            var dropEl;

            el.html($templateCache.get('sky/templates/avatar/avatar.directive.html'));

            dropEl = el.find('.bb-avatar-file-drop');

            dropEl.attr('bb-file-drop-max-size', bbAvatarConfig.maxFileSize);
        }

        return {
            scope: {},
            bindToController: {
                bbAvatarSrc: '=',
                bbAvatarName: '=',
                bbAvatarChange: '&'
            },
            controller: angular.noop,
            controllerAs: 'bbAvatar',
            link: link,
            template: template
        };
    }

    bbAvatar.$inject = ['$filter', '$templateCache', '$window', 'bbAvatarConfig', 'bbErrorModal', 'bbFormat', 'bbPalette', 'bbResources'];

    angular.module('sky.avatar.directive', ['sky.avatar.config', 'sky.error', 'sky.format', 'sky.palette', 'sky.resources'])
        .directive('bbAvatar', bbAvatar);
}(jQuery));

/*jshint browser: true */
/*global angular */

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

/*global angular */

(function () {
    'use strict';

    var SEARCH_PROPS = ['title', 'description'];

    function BBChecklistController($scope, bbChecklistUtility) {
        var vm = this;

        function itemMatchesCategory(item, category) {
            return !category || item.category === category;
        }

        function itemMatchesFilter(item, category, searchTextUpper) {
            var i,
                p,
                len,
                val;

            if (itemMatchesCategory(item, category)) {
                if (!searchTextUpper) {
                    return true;
                }

                for (i = 0, len = SEARCH_PROPS.length; i < len; i++) {
                    p = SEARCH_PROPS[i];
                    if (item.hasOwnProperty(p)) {
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
                items = vm.bbChecklistItems,
                n,
                searchTextUpper = (vm.searchText || '').toUpperCase(),
                selectedCategory = vm.selectedCategory;

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

            vm.filteredItems = filteredItems;
        }

        function invokeFilter() {
            if (vm.filterLocal) {
                invokeFilterLocal();
            } else if (vm.bbChecklistFilterCallback) {
                vm.bbChecklistFilterCallback({
                    searchText: vm.searchText,
                    category: vm.selectedCategory
                });
            }
        }

        function itemIsSelected(item) {
            return bbChecklistUtility.contains(vm.bbChecklistSelectedItems, item);
        }

        function eachFilteredItem(callback) {
            vm.filteredItems.forEach(callback);
        }

        function selectItem(item) {
            bbChecklistUtility.add(vm.bbChecklistSelectedItems, item);
        }

        function unselectItem(item) {
            bbChecklistUtility.remove(vm.bbChecklistSelectedItems, item);
        }

        vm.bbChecklistSelectedItems = vm.bbChecklistSelectedItems || [];
        vm.itemIsSelected = itemIsSelected;

        vm.selectAll = function () {
            eachFilteredItem(selectItem);
        };

        vm.clear = function () {
            eachFilteredItem(unselectItem);
        };

        vm.rowClicked = function (item) {
            if (!itemIsSelected(item)) {
                selectItem(item);
            } else {
                unselectItem(item);
            }
        };

        vm.filterByCategory = function (selectedCategory) {
            vm.selectedCategory = selectedCategory;
            invokeFilter();
        };

        vm.isSingleSelect = function () {
            return vm.bbChecklistSelectStyle === 'single';
        };

        vm.getChecklistCls = function () {
            return {
                'bb-checklist-single': vm.isSingleSelect()
            };
        };

        vm.getRowCls = function (item) {
            return {
                'bb-checklist-row-selected': itemIsSelected(item)
            };
        };

        vm.singleSelectRowClick = function (item) {
            vm.bbChecklistSelectedItems = [item];

            $scope.$emit('bbPickerSelected', {
                selectedItems: vm.bbChecklistSelectedItems
            });
        };

        vm.setColumns = function (columns) {
            vm.columns = columns;
        };

        $scope.$watch(function () {
            return vm.bbChecklistItems;
        }, function () {
            vm.filteredItems = vm.bbChecklistItems;
            vm.highlightRefresh = new Date().getTime();
        });

        $scope.$watch(function () {
            return vm.searchText;
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                invokeFilter();
            }
        });

        $scope.$emit('bbPickerReady', {
            setSelectedItems: function (selectedItems) {
                vm.bbChecklistSelectedItems = selectedItems;
            }
        });
    }

    BBChecklistController.$inject = ['$scope', 'bbChecklistUtility'];

    angular.module('sky.checklist.controller', ['sky.checklist.utility'])
        .controller('BBChecklistController', BBChecklistController);
}());

/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbChecklist() {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: 'sky/templates/checklist/checklist.directive.html',
            bindToController: {
                bbChecklistItems: '=',
                bbChecklistSelectedItems: '=',
                bbChecklistFilterCallback: '=',
                bbChecklistIncludeSearch: '=',
                bbChecklistSearchDebounce: '=',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=',
                bbChecklistCategories: '=',
                bbChecklistMode: '@',
                bbChecklistSelectStyle: '@',
                bbChecklistIsLoading: '='
            },
            controller: 'BBChecklistController',
            controllerAs: 'bbChecklist',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal);
            }
        };
    }

    angular.module(
        'sky.checklist.directive',
        [
            'sky.check',
            'sky.checklist.controller',
            'sky.resources',
            'sky.wait'
        ]
    )
        .directive('bbChecklist', bbChecklist);
}());

/*global angular */

(function () {
    'use strict';

    function bbChecklistColumn() {
        return {
            require: ['bbChecklistColumn', '^bbChecklistColumns'],
            restrict: 'E',
            bindToController: {
                bbChecklistColumnCaption: "=",
                bbChecklistColumnField: "=",
                bbChecklistColumnClass: "=",
                bbChecklistColumnWidth: "=",
                bbChecklistColumnAutomationId: "="
            },
            controller: function () {},
            controllerAs: 'bbChecklistColumn',
            scope: {},
            link: function ($scope, element, attrs, ctrls) {
                var bbChecklistColumns = ctrls[1],
                    column,
                    vm = ctrls[0];

                column = {
                    caption: vm.bbChecklistColumnCaption,
                    field: vm.bbChecklistColumnField,
                    'class': vm.bbChecklistColumnClass,
                    width: vm.bbChecklistColumnWidth,
                    automationId: vm.bbChecklistColumnAutomationId
                };

                bbChecklistColumns.addColumn(column);
            }
        };
    }

    angular.module('sky.checklist.column.directive', ['sky.checklist.columns.directive'])
        .directive('bbChecklistColumn', bbChecklistColumn);
}());

/*global angular */

(function () {
    'use strict';

    function BBChecklistColumnsController() {
        var vm = this;

        vm.columns = [];

        vm.addColumn = function (column) {
            vm.columns.push(column);
        };
    }

    angular.module('sky.checklist.columns.controller', [])
        .controller('BBChecklistColumnsController', BBChecklistColumnsController);
}());

/*global angular */

(function () {
    'use strict';

    function bbChecklistColumns() {
        function link($scope, element, attrs, ctrls) {
            var bbChecklist = ctrls[1],
                vm = ctrls[0];

            bbChecklist.setColumns(vm.columns);
        }

        return {
            require: ['bbChecklistColumns', '^bbChecklist'],
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: 'BBChecklistColumnsController',
            controllerAs: 'bbChecklistColumns',
            link: link
        };
    }

    angular.module('sky.checklist.columns.directive', ['sky.checklist.columns.controller'])
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

    angular.module('sky.checklist.model.directive', ['sky.checklist.utility'])
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
                add: function (arr, item, isSingleSelect) {
                    var i;

                    arr = !isSingleSelect && angular.isArray(arr) ? arr : [];
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

(function ($) {
    'use strict';
    angular.module('sky.datepicker', ['sky.resources', 'sky.moment', 'ui.bootstrap.datepicker'])
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
                        return $('body > ul[uib-datepicker-popup-wrap]');
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

                    function runValidators() {
                        var inputNgModel = $scope.getInputNgModel();
                        /*istanbul ignore else: sanity check */
                        if (inputNgModel) {
                            inputNgModel.$validate();
                        }
                    }

                    $scope.$watch('maxDate', function () {
                        runValidators();
                    });

                    $scope.$watch('minDate', function () {
                        runValidators();
                    });

                    function hasRequiredError() {
                        var inputNgModel = $scope.getInputNgModel();

                        return inputNgModel && inputNgModel.$error && inputNgModel.$error.required;
                    }

                    function hasMinMaxError() {
                        var inputNgModel = $scope.getInputNgModel();

                        return inputNgModel && inputNgModel.$error && (inputNgModel.$error.minDate || inputNgModel.$error.maxDate);
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

                        if (skipValidation || angular.isDate($scope.locals.date) || $scope.locals.date === '' || ($scope.locals.required && hasRequiredError()) || hasMinMaxError() || (!$scope.locals.required && $scope.locals.date === null) || datepickerIsPristine()) {
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
                            /* istanbul ignore else: sanity check */
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
                        format = attr.uibDatepickerPopup;

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

(function () {
    'use strict';


    function bbDateRangePickerFactory(bbResources) {
        var dateRangeTypes,
            defaultDateRangeOptions,
            specificDateRangeOptions,
            pastDateRangeOptions,
            dateRangeMap;

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
            THIS_WEEK: 18,
            SPECIFIC_RANGE: 19
        };


        // Deprecated
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

        // Deprecated
        specificDateRangeOptions = defaultDateRangeOptions.concat([dateRangeTypes.SPECIFIC_RANGE]);

        // Deprecated
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

        dateRangeMap = {};
        dateRangeMap[dateRangeTypes.AT_ANY_TIME] = {
            caption: bbResources.date_range_picker_at_any_time,
            description: bbResources.date_range_picker_filter_description_at_any_time
        };
        dateRangeMap[dateRangeTypes.YESTERDAY] = {
            caption: bbResources.date_range_picker_yesterday,
            description: bbResources.date_range_picker_filter_description_yesterday
        };
        dateRangeMap[dateRangeTypes.TODAY] = {
            caption: bbResources.date_range_picker_today,
            description: bbResources.date_range_picker_filter_description_today
        };
        dateRangeMap[dateRangeTypes.TOMORROW] = {
            caption: bbResources.date_range_picker_tomorrow,
            description: bbResources.date_range_picker_filter_description_tomorrow
        };
        dateRangeMap[dateRangeTypes.LAST_WEEK] = {
            caption: bbResources.date_range_picker_last_week,
            description: bbResources.date_range_picker_filter_description_last_week
        };
        dateRangeMap[dateRangeTypes.THIS_WEEK] = {
            caption: bbResources.date_range_picker_this_week,
            description: bbResources.date_range_picker_filter_description_this_week
        };
        dateRangeMap[dateRangeTypes.NEXT_WEEK] = {
            caption: bbResources.date_range_picker_next_week,
            description: bbResources.date_range_picker_filter_description_next_week
        };
        dateRangeMap[dateRangeTypes.LAST_QUARTER] = {
            caption: bbResources.date_range_picker_last_quarter,
            description: bbResources.date_range_picker_filter_description_last_quarter
        };
        dateRangeMap[dateRangeTypes.THIS_QUARTER] = {
            caption: bbResources.date_range_picker_this_quarter,
            description: bbResources.date_range_picker_filter_description_this_quarter
        };
        dateRangeMap[dateRangeTypes.NEXT_QUARTER] = {
            caption: bbResources.date_range_picker_next_quarter,
            description: bbResources.date_range_picker_filter_description_next_quarter
        };
        dateRangeMap[dateRangeTypes.LAST_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_last_calendar_year,
            description: bbResources.date_range_picker_filter_description_last_calendar_year
        };
        dateRangeMap[dateRangeTypes.THIS_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_this_calendar_year,
            description: bbResources.date_range_picker_filter_description_this_calendar_year
        };
        dateRangeMap[dateRangeTypes.NEXT_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_next_calendar_year,
            description: bbResources.date_range_picker_filter_description_next_calendar_year
        };
        dateRangeMap[dateRangeTypes.LAST_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_last_fiscal_year,
            description: bbResources.date_range_picker_filter_description_last_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_this_fiscal_year,
            description: bbResources.date_range_picker_filter_description_this_fiscal_year
        };
        dateRangeMap[dateRangeTypes.NEXT_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_next_fiscal_year,
            description: bbResources.date_range_picker_filter_description_next_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_MONTH] = {
            caption: bbResources.date_range_picker_this_month,
            description: bbResources.date_range_picker_filter_description_this_month
        };
        dateRangeMap[dateRangeTypes.NEXT_MONTH] = {
            caption: bbResources.date_range_picker_next_month,
            description: bbResources.date_range_picker_filter_description_next_month
        };
        dateRangeMap[dateRangeTypes.LAST_MONTH] = {
            caption: bbResources.date_range_picker_last_month,
            description: bbResources.date_range_picker_filter_description_last_month
        };
        dateRangeMap[dateRangeTypes.SPECIFIC_RANGE] = {
            caption: bbResources.date_range_picker_specific_range,
            description: bbResources.date_range_picker_filter_description_specific_range
        };

        function getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;
            if (dateRangePickerValue && dateRangePickerValue.dateRangeType) {
                info = getDateRangeTypeInfo(dateRangePickerValue.dateRangeType);
            } else {
                info = getDateRangeTypeInfo(dateRangePickerValue);
            }
            return info;
        }


        function getDateRangeTypeCaption(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;

            if (angular.isFunction(getDateRangeTypeInfo)) {

                info = getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo);

                if (info && info.caption) {
                    return info.caption;
                }
            }

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

            if (angular.isDefined(dateRangeMap[dateRangePickerValue.dateRangeType])) {
                return dateRangeMap[dateRangePickerValue.dateRangeType].caption;
            } else {
                return '';
            }

        }

        function getDateRangeFilterDescription(dateRangePickerValue, getDateRangeTypeInfo) {
            var info;
            if (angular.isFunction(getDateRangeTypeInfo)) {
                info = getTypeInfoFromDateRangePickerValue(dateRangePickerValue, getDateRangeTypeInfo);
                if (info && info.description) {
                    return info.description;
                }
            }

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
            if (angular.isDefined(dateRangeMap[dateRangePickerValue.dateRangeType])) {
                return dateRangeMap[dateRangePickerValue.dateRangeType].description;
            } else {
                return '';
            }
        }

        function getDateRangeOptions(optionTypes) {
            var dateRangeOptions = [dateRangeTypes.AT_ANY_TIME];
            optionTypes = optionTypes || {};

            if (optionTypes.includeDefault) {
                dateRangeOptions.push(dateRangeTypes.YESTERDAY);
                dateRangeOptions.push(dateRangeTypes.TODAY);
                dateRangeOptions.push(dateRangeTypes.TOMORROW);
                dateRangeOptions.push(dateRangeTypes.LAST_WEEK);
                dateRangeOptions.push(dateRangeTypes.THIS_WEEK);
                dateRangeOptions.push(dateRangeTypes.NEXT_WEEK);
                dateRangeOptions.push(dateRangeTypes.LAST_MONTH);
                dateRangeOptions.push(dateRangeTypes.THIS_MONTH);
                dateRangeOptions.push(dateRangeTypes.NEXT_MONTH);
                dateRangeOptions.push(dateRangeTypes.LAST_QUARTER);
                dateRangeOptions.push(dateRangeTypes.THIS_QUARTER);
                dateRangeOptions.push(dateRangeTypes.NEXT_QUARTER);
                dateRangeOptions.push(dateRangeTypes.LAST_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.NEXT_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.LAST_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.NEXT_FISCAL_YEAR);
            }

            if (optionTypes.includePast && !optionTypes.includeDefault) {
                dateRangeOptions.push(dateRangeTypes.YESTERDAY);
                dateRangeOptions.push(dateRangeTypes.TODAY);
                dateRangeOptions.push(dateRangeTypes.LAST_WEEK);
                dateRangeOptions.push(dateRangeTypes.THIS_WEEK);
                dateRangeOptions.push(dateRangeTypes.LAST_MONTH);
                dateRangeOptions.push(dateRangeTypes.THIS_MONTH);
                dateRangeOptions.push(dateRangeTypes.LAST_QUARTER);
                dateRangeOptions.push(dateRangeTypes.THIS_QUARTER);
                dateRangeOptions.push(dateRangeTypes.LAST_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_CALENDAR_YEAR);
                dateRangeOptions.push(dateRangeTypes.LAST_FISCAL_YEAR);
                dateRangeOptions.push(dateRangeTypes.THIS_FISCAL_YEAR);
            }

            if (optionTypes.includeSpecific) {
                dateRangeOptions.push(dateRangeTypes.SPECIFIC_RANGE);
            }

            return dateRangeOptions;
        }

        return {
            
            defaultDateRangeOptions: defaultDateRangeOptions,
            pastDateRangeOptions: pastDateRangeOptions,
            specificDateRangeOptions: specificDateRangeOptions,

            dateRangeTypes: dateRangeTypes,
            getDateRangeOptions: getDateRangeOptions,
            getDateRangeTypeCaption: getDateRangeTypeCaption,
            getDateRangeFilterDescription: getDateRangeFilterDescription
        };
    }

    bbDateRangePickerFactory.$inject = ['bbResources'];

    function bbDateRangePickerDirective(bbDateRangePicker, bbResources) {

        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'sky/templates/daterangepicker/daterangepicker.html',
            scope: {},
            controllerAs: 'bbDateRangePickerCtrl',
            bindToController: {
                bbDateRangePickerValue: "=",
                bbDateRangePickerAutomationId: "=",
                bbDateRangePickerOptions: '=',
                fromDate: '=?bbDateRangePickerFromDate',
                toDate: '=?bbDateRangePickerToDate',
                pickerLabel: '=?bbDateRangePickerLabel',
                isValid: '=?bbDateRangePickerValid'
            },
            controller: ['$scope', function ($scope) {
                var vm = this;
                vm.resources = bbResources;

                vm.defaultDateRangeOptions = bbDateRangePicker.getDateRangeOptions({includeDefault: true});

                vm.getDateRangeTypeCaption = function (dateRangeTypeValue) {
                    var infoFunction;
                    if (vm.bbDateRangePickerOptions && angular.isFunction(vm.bbDateRangePickerOptions.getDateRangeTypeInfo)) {
                        infoFunction = vm.bbDateRangePickerOptions.getDateRangeTypeInfo;
                    }
                    return bbDateRangePicker.getDateRangeTypeCaption(dateRangeTypeValue, infoFunction);
                };

                $scope.$watch(
                    function () {
                        return vm.dateRangeForm.$valid;
                    }, function (newVal) {
                        vm.isValid = newVal;
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.fromDate;
                    }, function (newVal) {
                        /* This prevents minDate from having a reference
                           to fromDate and changing it */
                        vm.minDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.toDate;
                    }, function (newVal) {
                        /* This prevents maxDate from having a reference
                           to toDate and changing it */
                        vm.maxDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.bbDateRangePickerValue;
                    }, function (newVal) {
                    if (!newVal) {
                        vm.bbDateRangePickerValue = {
                            dateRangeType: bbDateRangePicker.dateRangeTypes.AT_ANY_TIME
                        };
                        return;
                    }
                    vm.specificRangeIsVisible = vm.bbDateRangePickerValue.dateRangeType === bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE;
                    newVal.dateRangeType = newVal.dateRangeType || bbDateRangePicker.dateRangeTypes.AT_ANY_TIME;
                }, true);
            }],
            link: function ($scope, el, attr, vm) {
                vm.noLabels = attr.bbDateRangePickerNoLabels;
                if (vm.noLabels) {
                    vm.toPlaceholder = bbResources.date_range_picker_to_date;
                    vm.fromPlaceholder = bbResources.date_range_picker_from_date;
                } else {
                    vm.toPlaceholder = '';
                    vm.fromPlaceholder = '';
                }
            }
        };
    }

    bbDateRangePickerDirective.$inject = ['bbDateRangePicker', 'bbResources'];

    angular.module('sky.daterangepicker', ['sky.resources', 'sky.datepicker'])
        .factory('bbDateRangePicker', bbDateRangePickerFactory)
        .directive('bbDateRangePicker', bbDateRangePickerDirective);
}());

/* global angular */
(function () {
    'use strict';

    function BBErrorActionController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });
    }

    BBErrorActionController.$inject = ['$scope'];

    function bbErrorAction() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setAction(vm);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorAction', '?^bbError'],
            controller: BBErrorActionController,
            controllerAs: 'bbErrorAction',
            link: link,
            scope: {}
        };
    }

    angular.module('sky.error.action.directive', [])
        .directive('bbErrorAction', bbErrorAction);
}());

/* global angular */
(function () {
    'use strict';

    function BBErrorDescriptionController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });

        $scope.$watch(function () {
            return vm.errorType;
        }, function (newValue) {
            switch (newValue) {
                case 'broken':
                    vm.description = bbResources.error_description_broken;
                    break;
                case 'construction':
                    vm.description = bbResources.error_description_construction;
                    break;
                case 'notFound':
                    vm.description = '';
            }
        });
    }

    BBErrorDescriptionController.$inject = ['$scope', 'bbResources'];

    function bbErrorDescription() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setDescription(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorDescription', '?^bbError'],
            controller: BBErrorDescriptionController,
            controllerAs: 'bbErrorDescription',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.description.directive.html'
        };
    }

    angular.module('sky.error.description.directive', [])
        .directive('bbErrorDescription', bbErrorDescription);
}());

/*global angular */
(function () {
    'use strict';

    var components = [{
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Description',
        cls: 'description'
    }, {
        name: 'Action',
        cls: 'action'
    }];


    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function getOverridePropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'HasOverride';
    }

    function BBErrorController($scope) {
        var vm = this,
            errorType;

        errorType = vm.errorType;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl, isDefaultError) {
                var ctrlName = getCtrlPropName(component),
                    hasOverride = getOverridePropName(component);

                vm[ctrlName] = ctrl;

                if (!isDefaultError) {
                    vm[hasOverride] = true;
                }

                ctrl.onDestroy = function () {
                    vm[ctrlName] = null;
                };
            };
        }

        $scope.$watch(function () {
            return vm.errorType;
        }, function (newValue) {
            vm.imageType = newValue;
            vm.titleType =  newValue;
            vm.descriptionType =  newValue;
        });

        components.forEach(addComponentSetter);
    }

    BBErrorController.$inject = ['$scope'];

    function bbError() {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {

                    if (newValue) {

                        el.find('.bb-error-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            components.forEach(watchForComponent);
        }

        return {
            restrict: 'E',
            controller: 'BBErrorController',
            controllerAs: 'bbError',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/error/error.directive.html',
            transclude: true
        };
    }

    angular.module('sky.error.directive', ['sky.error.image.directive', 'sky.error.title.directive', 'sky.error.description.directive', 'sky.error.action.directive'])
        .controller('BBErrorController', BBErrorController)
        .directive('bbError', bbError);

}());

/* global angular */
(function () {
    'use strict';

    function BBErrorImageController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });
    }

    BBErrorImageController.$inject = ['$scope'];

    function bbErrorImage() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setImage(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorImage', '?^bbError'],
            controller: BBErrorImageController,
            controllerAs: 'bbErrorImage',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.image.directive.html'
        };
    }

    angular.module('sky.error.image.directive', [])
        .directive('bbErrorImage', bbErrorImage);
}());

/* global angular */
(function () {
    'use strict';

    function BBErrorTitleController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });
        $scope.$watch(function () {
            return vm.errorType;
        }, function (newValue) {
            switch (newValue) {
                case 'broken':
                    vm.title = bbResources.error_title_broken;
                    break;
                case 'construction':
                    vm.title = bbResources.error_title_construction;
                    break;
                case 'notFound':
                    vm.title = bbResources.error_title_notfound;
                    break;
            }
        });

    }

    BBErrorTitleController.$inject = ['$scope', 'bbResources'];

    function bbErrorTitle() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setTitle(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorTitle', '?^bbError'],
            controller: BBErrorTitleController,
            controllerAs: 'bbErrorTitle',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.title.directive.html'
        };
    }

    angular.module('sky.error.title.directive', [])
        .directive('bbErrorTitle', bbErrorTitle);
}());

/*global angular */

(function () {
    'use strict';

    function BBErrorModalController($uibModalInstance, options) {
        var vm = this;

        vm.options = options;

        vm.close = function () {
            $uibModalInstance.close();
        };
    }

    BBErrorModalController.$inject = ['$uibModalInstance', 'options'];

    angular.module('sky.errormodal.controller', ['sky.error.directive'])
        .controller('BBErrorModalController', BBErrorModalController);
}());

/*global angular */

(function () {
    'use strict';

    function bbErrorModal(bbModal) {
        return {
            open: function (options) {
                return bbModal.open({
                    controller: 'BBErrorModalController as bbErrorModal',
                    templateUrl: 'sky/templates/error/errormodal.template.html',
                    resolve: {
                        options: function () {
                            return options;
                        }
                    }
                });
            }
        };
    }

    bbErrorModal.$inject = ['bbModal'];

    angular.module('sky.errormodal.service', ['sky.errormodal.controller', 'sky.modal'])
        .factory('bbErrorModal', bbErrorModal);
}());

/*jshint browser: true */
/*global angular */

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
                    addLink: function ($event) {
                        $event.preventDefault();
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


        .directive('bbGrid', ['$window', '$compile', '$templateCache', 'bbMediaBreakpoints', 'bbViewKeeperBuilder', 'bbHighlight', 'bbResources', 'bbData', '$controller', '$timeout', 'bbWindow', '$q',

            function ($window, $compile, $templateCache, bbMediaBreakpoints, bbViewKeeperBuilder, bbHighlight, bbResources, bbData, $controller, $timeout, bbWindow, $q) {
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
                                scrollbarWidth,
                                doNotResetRows = false;

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

                            function setColumnSize(columnName, columnSize, totalWidth) {
                                var gridHeaders,
                                    colSizePx = columnSize + 'px',
                                    bodyScrollLeft,
                                    tableGrid = tableEl[0].grid;

                                gridHeaders = tableGrid.headers;
                                bodyScrollLeft = tableGrid.bDiv.scrollLeft;
                                /* jqGrid does not provide a function to change a single column column size.
                                   This code snippet mirrors how jqGrid changes column size in their own dragEnd
                                   function.
                                */
                                tableEl[0].p.colModel[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].width = columnSize;
                                gridHeaders[extendedColumnIndex].el.style.width = colSizePx;
                                tableGrid.cols[extendedColumnIndex].style.width = colSizePx;
                                /* istanbul ignore next: sanity check */
                                tableEl[0].p.tblwidth = totalWidth || tableEl[0].p.tblwidth;
                                tableGrid.hDiv.scrollLeft = bodyScrollLeft;
                            }

                            function resizeExtendedColumn(changedWidth, isIncreasing) {
                                var extendedShrinkWidth = currentExtendedColumnWidth - originalExtendedColumnWidth;

                                //If the extended portion of the last column is less than the amount resized
                                if (extendedShrinkWidth <= changedWidth) {
                                    //decrease extended column to original size


                                    //increase grid width by remainder and wipe out all the extended stuff
                                    if (isIncreasing) {
                                        totalColumnWidth = totalColumnWidth + (changedWidth - extendedShrinkWidth);
                                    } else {
                                        totalColumnWidth = totalColumnWidth - extendedShrinkWidth;
                                    }
                                    setColumnSize(extendedColumnName, originalExtendedColumnWidth, totalColumnWidth);

                                    tableWrapper.addClass('bb-grid-table-wrapper-overflow');
                                    resetExtendedColumn();

                                } else {
                                    //decrease extended column width by changedWidth
                                    currentExtendedColumnWidth = currentExtendedColumnWidth - changedWidth;


                                    if (!isIncreasing) {
                                        totalColumnWidth = totalColumnWidth - changedWidth;
                                    }
                                    setColumnSize(extendedColumnName, currentExtendedColumnWidth, totalColumnWidth);

                                }
                                tableEl.setGridWidth(totalColumnWidth, false);
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
                                var changedWidth,
                                    resizedColumnIndex = index;
                                
                                //If multiselect and/or contextmenu exist, then the resized column index is shifted.
                                if (locals.multiselect) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }
                                if (getContextMenuItems) {
                                    resizedColumnIndex =  resizedColumnIndex - 1;
                                }
                                
                                $scope.$emit("columnsResized", { newWidth: newWidth, index: resizedColumnIndex });

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
                                /*  The clone option for jquery ui clones the element that is being dragged.
                                    This prevents the click event from being invoked while users are reordering
                                    columns http://api.jqueryui.com/sortable/#option-helper
                                */
                                var sortable = {
                                    update: gridColumnsReordered,
                                    options: {
                                        helper: 'clone'
                                    }

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
                                var checkCellEl = element.find('td > .cbox');
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

                            function loadMore() {
                                var deferred = $q.defer(),
                                    loadMorePromise = deferred.promise;

                                loadMorePromise.then(function (moreRows) {
                                    tableEl.addRowData('', moreRows);
                                    $scope.options.data = $scope.options.data.concat(moreRows);
                                    setUpFancyCheckCell();
                                    doNotResetRows = true;
                                });

                                $scope.$emit('loadMoreRows', {
                                    promise: deferred
                                });

                            }

                            $scope.locals.loadMore = loadMore;

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

                            $scope.$watchCollection('options.data', function (newValue) {
                                if (doNotResetRows) {
                                    doNotResetRows = false;
                                } else {
                                    setRows(newValue);
                                }
                            });

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
                            
                            $scope.$on("reInitGrid", function () {
                                reInitGrid();
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

(function ($) {
    'use strict';

    var openModalCount = 0;

    angular.module('sky.modal', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .factory('bbModal', ['$uibModal', '$window', function ($uibModal, $window) {
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

                    modalInstance = $uibModal.open(opts);
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

(function () {
    'use strict';

    var components = [{
        name: 'Alert',
        cls: 'alert'
    }, {
        name: 'Content',
        cls: 'content'
    }, {
        name: 'KeyInfo',
        cls: 'key-info'
    }, {
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Status',
        cls: 'status'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Subtitle',
        cls: 'subtitle'
    }, {
        name: 'ActionBar',
        cls: 'action-bar'
    }],
    pageSummaryModule = angular.module('sky.pagesummary');

    function makePageSummaryComponent(component) {
        var controllerName,
            name = component.name;

        function Controller($scope) {
            var vm = this;

            $scope.$on('$destroy', function () {
                vm.onDestroy();
                vm = null;
            });
        }

        Controller.$inject = ['$scope'];

        function componentFn() {
            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbPageSummary = ctrls[1];

                vm.el = el;

                bbPageSummary['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbPageSummary' + name, '^bbPageSummary'],
                controller: controllerName,
                controllerAs: 'bbPageSummary' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBPageSummary' + name + 'Controller';

        pageSummaryModule
            .controller(controllerName, Controller)
            .directive('bbPageSummary' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBPageSummaryController() {
        var vm = this;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl) {
                var propName = getCtrlPropName(component);

                vm[propName] = ctrl;

                ctrl.onDestroy = function () {
                    vm[propName] = null;
                };
            };
        }

        components.forEach(addComponentSetter);

        vm.getPageSummaryLeftCls = function () {
            return {
                'col-sm-9': !!vm.keyInfoCtrl
            };
        };
    }

    function bbPageSummary(bbMediaBreakpoints) {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-page-summary-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            function mediaBreakpointHandler(breakpoint) {
                var keyInfoEl = el.find('.bb-page-summary-key-info'),
                    toEl;

                if (breakpoint.xs) {
                    toEl = el.find('.bb-page-summary-key-info-xs');
                } else {
                    toEl = el.find('.bb-page-summary-key-info-sm');
                }

                if (!keyInfoEl.parent().is(toEl)) {
                    toEl.append(keyInfoEl);
                }
            }

            components.forEach(watchForComponent);

            bbMediaBreakpoints.register(mediaBreakpointHandler);

            scope.$on('$destroy', function () {
                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
            });
        }

        return {
            restrict: 'E',
            controller: 'BBPageSummaryController',
            controllerAs: 'bbPageSummary',
            bindToController: true,
            link: link,
            scope: {},
            templateUrl: 'sky/templates/pagesummary/pagesummary.directive.html',
            transclude: true
        };
    }

    bbPageSummary.$inject = ['bbMediaBreakpoints'];

    pageSummaryModule
        .controller('BBPageSummaryController', BBPageSummaryController)
        .directive('bbPageSummary', bbPageSummary);

    components.forEach(makePageSummaryComponent);
}());

/*global angular */

(function () {
    'use strict';

    var evtNsPos = 0;

    angular.module('sky.pagination', ['ui.bootstrap.pagination'])
        .config(['uibPaginationConfig', function (paginationConfig) {
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
                        '<uib-pagination ng-show="' + pagedData + '.totalItems > ' + pagedData + '.itemsPerPage" total-items="' + pagedData + '.totalItems" ng-model="' + pagedData + '.currentPage" ng-change="' + pagedData + '.pageChanged()" items-per-page="' + pagedData + '.itemsPerPage"></uib-pagination>' +
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
        .directive('bbPaginationContent', ['$timeout', '$window', '$animate', function ($timeout, $window, $animate) {
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
                                    /* Disable animation for the page change
                                       to prevent issues with ng-repeat
                                       that impact min-height measurements */
                                    $animate.enabled(false, el);
                                    pagedData.currentPage = pageNumber;

                                    pagedData.pageChanged();
                                    scope.$apply();
                                    $animate.enabled(true, el);

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

(function ($) {
    'use strict';

    function bbPopoverTemplate($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {
                var bbPopoverOpenAttr = 'bbPopoverOpen' + $scope.$id;

                //prevent breaking change by adding quotes around template url and
                //passing to new directive
                /*istanbul ignore else */
                if (!el.attr('bb-uib-popover-template')) {
                    el.attr('bb-uib-popover-template', "'" + el.attr('bb-popover-template') + "'");
                }

                if (!el.attr('popover-is-open')) {
                    el.attr('popover-is-open', bbPopoverOpenAttr);
                }

                $scope.bbPopoverAttr = el.attr('popover-is-open');


                el.removeAttr('bb-popover-template');
                $compile(el)($scope);
            }
        };
    }

    bbPopoverTemplate.$inject = ['$compile'];

    function bbUibPopoverTemplate($uibTooltip) {
        var tooltip = $uibTooltip('bbUibPopoverTemplate', 'popover', 'click', {
            useContentExp: true
        });

        return tooltip;
    }

    bbUibPopoverTemplate.$inject = ['$uibTooltip'];

    function bbUibPopoverTemplatePopup($window, $parse) {
        return {
            replace: true,
            scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&', originScope: '&' },
            link: function ($scope, el) {

                var origScope = $scope.originScope(),
                    popoverIsOpenAttr,
                    windowEl = $($window),
                    scopeId = $scope.$id;

                popoverIsOpenAttr = origScope.bbPopoverAttr;

                function closePopover() {

                    /* Set the popover is open attribute this way to account for
                       both variables directly on scope as well as using 'controller
                       as'
                    */
                    /* istanbul ignore else: sanity check */
                    if (angular.isDefined(origScope.$eval(popoverIsOpenAttr))) {
                        $parse(popoverIsOpenAttr).assign(origScope, false);
                    }
                }

                origScope.hide = function () {
                    closePopover();
                };

                $scope.$watch('isOpen()', function (value) {
                    if (value) {
                        windowEl.on('click.popover' + scopeId, function (event) {
                            if (!el.is(event.target) && el.has(event.target).length === 0 && $scope.isOpen) {
                                $scope.$apply(function () {
                                    closePopover();
                                });
                            }
                        });
                    }

                });


                $scope.$on('$destroy', function () {
                    windowEl.off('click.popover' + scopeId);
                });
            },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }
    bbUibPopoverTemplatePopup.$inject = ['$window', '$parse'];

    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
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

/*global angular */

(function () {
    'use strict';

    function BBSelectFieldController($scope, bbChecklistUtility, bbFormat, bbResources, $filter) {
        var vm = this;

        vm.getFieldInclude = function () {
            var fieldStyle = vm.bbSelectFieldStyle;

            if (fieldStyle !== 'single') {
                fieldStyle = 'multiple';
            }

            return 'sky/templates/selectfield/selectfield' + fieldStyle + '.include.html';
        };

        /* Begin "public" API methods (called by child directives) */
        vm.setPicker = function (picker) {
            vm.picker = picker;
        };

        vm.getSelectedItems = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems;

            // Make a copy of the array so that changes the user makes before confirming the dialog
            // don't make their way back up to the parent scope.
            return angular.isArray(selectedItems) ? selectedItems.slice() : [];
        };

        vm.setSelectedItems = function (selectedItems) {
            vm.bbSelectFieldSelectedItems = selectedItems;
        };

        vm.selectFieldClick = function () {
            if (vm.picker) {
                vm.picker.open();
            }
        };

        vm.getSummaryCountText = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems,
                formattedCount;

            /*istanbul ignore else sanity check */
            if (angular.isArray(selectedItems)) {

                formattedCount = $filter('bbAutonumeric')(selectedItems.length, 'number', true);
                return bbFormat.formatText(bbResources.selectfield_summary_text, formattedCount);
            }
        };

        vm.removeAll = function () {
            vm.bbSelectFieldSelectedItems = [];
        };

        vm.remove = function (item) {
            bbChecklistUtility.remove(vm.bbSelectFieldSelectedItems, item);
        };
        /* End "public" API methods (called by child directives) */
    }

    BBSelectFieldController.$inject = ['$scope', 'bbChecklistUtility', 'bbFormat', 'bbResources', '$filter'];

    angular.module('sky.selectfield.controller', ['sky.autonumeric', 'sky.checklist.utility'])
        .controller('BBSelectFieldController', BBSelectFieldController);

}());

/*global angular */

(function () {
    'use strict';

    function bbSelectField() {
        function link($scope, el, attrs, ctrls) {
            if (ctrls[0] && ctrls[1] && attrs.required) {
                ctrls[1].$validators.required = function () {
                    return angular.isDefined(ctrls[0].bbSelectFieldSelectedItems) && ctrls[0].bbSelectFieldSelectedItems.length > 0;
                };

                $scope.$watchCollection(
                    function () {
                        return ctrls[0].bbSelectFieldSelectedItems;
                    },
                    function () {
                        ctrls[1].$validate();
                    }
                );

                ctrls[0].setModelTouched = function () {
                    ctrls[1].$setTouched();
                };
            }
        }

        return {
            require: ['bbSelectField', '?ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&?',
                bbSelectFieldSelectedItems: '=?ngModel',
                bbSelectFieldStyle: '@?',
                bbSelectFieldText: '@?'
            },
            controller: 'BBSelectFieldController',
            controllerAs: 'bbSelectField',
            scope: true,
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html',
            transclude: true,
            link: link
        };
    }

    angular.module('sky.selectfield.directive', ['sky.format', 'sky.resources', 'sky.selectfield.controller'])
        .directive('bbSelectField', bbSelectField);
}());

/*global angular */

(function () {
    'use strict';

    function bbSelectFieldMultipleItemAnimation() {
        var duration = 250,
            slideOptions;

        function getFadeOptions(doneFn) {
            return {
                duration: duration,
                always: doneFn,
                queue: false
            };
        }

        slideOptions = {
            duration: duration,
            queue: false
        };

        return {
            enter: function (el, doneFn) {
                el
                    .css({
                        display: 'none',
                        opacity: 0
                    })
                    .slideDown(slideOptions)
                    .animate({
                        opacity: 1
                    }, getFadeOptions(doneFn));
            },
            leave: function (el, doneFn) {
                // Take focus off the close button
                el.find('.close').blur();

                el
                    .slideUp(slideOptions)
                    .fadeOut(getFadeOptions(doneFn));
            }
        };
    }

    angular.module('sky.selectfield.item.animation', [])
        .animation('.bb-select-field-multiple-item', bbSelectFieldMultipleItemAnimation);
}());

/*global angular */

(function () {
    'use strict';

    function BBSelectFieldPickerController() {

    }

    function bbSelectFieldPicker(bbModal, bbResources) {
        function link(scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[1],
                modalInstance,
                selectedItems,
                vm = ctrls[0];

            vm.isSingleStyle = function () {
                return bbSelectField.bbSelectFieldStyle === 'single';
            };

            vm.getDialogHeaderText = function () {
                var header = vm.bbSelectFieldPickerHeader;

                if (!header) {
                    header = vm.isSingleStyle() ? bbResources.selectfieldpicker_select_value : bbResources.selectfieldpicker_select_values;
                }

                return header;
            };

            vm.open = function () {
                var pickerSelectedOff;

                function cleanup() {
                    if (angular.isFunction(bbSelectField.setModelTouched)) {
                        bbSelectField.setModelTouched();
                    }

                    if (pickerSelectedOff) {
                        pickerSelectedOff();
                    }

                    modalInstance = null;
                }

                function onPickerSelected(e, args) {
                    selectedItems = args.selectedItems;
                    bbSelectField.setSelectedItems(selectedItems);

                    modalInstance.close();
                }

                function onModalClosed(reason) {
                    if (reason === 'save') {
                        bbSelectField.setSelectedItems(selectedItems);
                    }

                    cleanup();
                }

                function onModalDismissed() {
                    cleanup();
                }

                if (angular.isFunction(bbSelectField.bbSelectFieldClick)) {
                    bbSelectField.bbSelectFieldClick();
                }

                modalInstance = bbModal.open({
                    scope: scope,
                    templateUrl: 'sky/templates/selectfield/selectfieldpicker.directive.html'
                });

                if (vm.isSingleStyle()) {
                    pickerSelectedOff = scope.$on('bbPickerSelected', onPickerSelected);
                }

                modalInstance.result.then(onModalClosed, onModalDismissed);
            };

            vm.okClick = function () {
                /*istanbul ignore else sanity check */
                if (modalInstance) {
                    modalInstance.close('save');
                }
            };

            vm.clearClick = function () {
                /*istanbul ignore else sanity check */
                if (modalInstance) {
                    selectedItems = [];
                    modalInstance.close('save');
                }
            };

            scope.$on('bbPickerReady', function (e, args) {
                selectedItems = bbSelectField.getSelectedItems();

                args.setSelectedItems(selectedItems);
            });

            bbSelectField.setPicker(vm);
        }

        return {
            require: ['bbSelectFieldPicker', '^bbSelectField'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldPickerTemplate: '@',
                bbSelectFieldPickerHeader: '@'
            },
            controller: BBSelectFieldPickerController,
            controllerAs: 'bbSelectFieldPicker',
            link: link,
            scope: true
        };
    }

    bbSelectFieldPicker.$inject = ['bbModal', 'bbResources'];

    angular.module('sky.selectfieldpicker.directive', ['sky.modal', 'sky.resources'])
        .directive('bbSelectFieldPicker', bbSelectFieldPicker);
}());

/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var tabScrollId = 0;
    angular.module('sky.tabscroll', ['ui.bootstrap.tabs'])
        .directive('bbTabScroll', ['$timeout', '$window', function ($timeout, $window) {
            return {
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
            if (!$scope.bbTabsetOptions) {
                $scope.bbTabsetOptions = {
                    isSmallScreen: false,
                    tabCount: 0
                };
            }

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
                if (!$scope.bbTabsetOptions) {
                    $scope.bbTabsetOptions = {
                        isSmallScreen: false,
                        tabCount: 0
                    };
                }

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
        .directive('uibTabset', tabset)
        .directive('tabset', tabset)
        .directive('bbTabsetCollapsible', bbTabsetCollapsible)
        .directive('bbTabCollapseHeader', bbTabCollapseHeader)
        .directive('tab', tab)
        .directive('uibTab', tab);

}(jQuery));

/*global angular */

(function () {
    'use strict';

    angular.module('sky.tabsref', ['ui.bootstrap.tabs'])
        .directive('bbTabSref', ['$rootScope', '$state', '$timeout', function ($rootScope, $state, $timeout) {
            return {
                require: ['^?tabset', '^?uibTabset'],
                link: function (scope, el, attrs, controllers) {
                    var active = attrs.active,
                        sref = attrs.bbTabSref,
                        stateChangeDeregistration,
                        tabsetCtrl;

                    tabsetCtrl = controllers[0] !== null ? controllers[0] : controllers[1];


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

(function () {
    'use strict';

    var modules = [
            'sky.resources',
            'sky.scrollintoview',
            'sky.modal'
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

    function BBTextExpandController(textExpandContent, headerContent, closeText) {
        var self = this;
        self.textExpandContent = textExpandContent;
        self.headerContent = headerContent;
        self.closeText = closeText;
    }

    BBTextExpandController.$inject = ['textExpandContent', 'headerContent', 'closeText'];

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
        .directive('bbTextExpand', ['$templateCache', 'bbResources', 'bbScrollIntoView', 'bbModal', function ($templateCache, bbResources, bbScrollIntoView, bbModal) {
            function link(scope, el, attrs) {
                var isExpanded,
                    maxLength = +attrs.bbTextExpandMaxLength || 200,
                    maxExpandedLength = +attrs.bbTextExpandMaxExpandedLength || 600,
                    maxNewlines = 1,
                    maxExpandedNewlines = +attrs.bbTexExpandMaxExpandedNewlines || 3;

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

                            if (getNewlineCount(newValue) >= maxExpandedNewlines || newValue.length > maxExpandedLength) {
                                expandEl.on('click', function () {
                                    bbModal.open({
                                        templateUrl: 'sky/templates/textexpand/expandmodal.html',
                                        controller: BBTextExpandController,
                                        controllerAs: 'expandCtrl',
                                        resolve: {
                                            textExpandContent: function () {
                                                return newValue;
                                            },
                                            headerContent: function () {
                                                return scope.$eval(attrs.bbTextExpandModalTitle) || bbResources.text_expand_modal_title;
                                            },
                                            closeText: function () {
                                                return bbResources.text_expand_close_text;
                                            }
                                        }
                                    });
                                });

                            } else {
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
                            }


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

    function BBTileController($scope, $timeout) {
        var vm = this,
            displayModeChanging = false;

        vm.setHeaderContentEl = function (el) {
            vm.headerContentEl = el;
        };

        //determines whether or not a tile is collapsed
        function tileIsCollapsed(tileId, tiles) {
            var i,
                len = tiles.length,
                tile;

            for (i = 0; i < len; i++) {
                tile = tiles[i];

                if (tile.id === tileId) {
                    return vm.smallTileDisplayMode ? tile.collapsed_small : tile.collapsed;
                }
            }

            return !!vm.smallTileDisplayMode;
        }

        //sets the collapsed state of the tile based on the tile settings and the display mode
        function updateTileState(tiles) {
            var collapsed,
                oldCollapsed;

            tiles = tiles || /*istanbul ignore next: default value */ [];

            oldCollapsed = vm.isCollapsed;

            collapsed = tileIsCollapsed(vm.tileId, tiles);

            if (oldCollapsed === collapsed) {
                displayModeChanging = false;
            }

            vm.isCollapsed = collapsed;

        }

        vm.updateTileState = updateTileState;

        vm.isCollapsed = vm.bbTileCollapsed || false;
        vm.smallTileDisplayMode = false;
        vm.tileId = '';

        vm.titleClick = function () {
            vm.isCollapsed = !vm.isCollapsed;
            vm.scrollIntoView = !vm.isCollapsed;
        };

        //listens for the tileModeChanged event from the tileDashboard and updates the collapsed state of the tiles based on whether or not the tiles are in small display mode
        $scope.$on('tileDisplayModeChanged', function (event, data) {
            /*jslint unparam: true */
            vm.smallTileDisplayMode = data.smallTileDisplayMode || false;

            if (vm.tileInitialized) {
                displayModeChanging = true;
                vm.updateTileState(data.tiles);
            }
        });

        //if the collapsed state changes, notify the tileDashboard
        $scope.$watch(function () {
            return vm.isCollapsed;
        }, function () {
            if (vm.tileInitialized && !displayModeChanging) {
                $timeout(function () {
                    $scope.$emit('tileStateChanged', {
                        tileId: vm.tileId,
                        collapsed: vm.isCollapsed
                    });
                });
            }
            displayModeChanging = false;

            if (!vm.isCollapsed) {
                $timeout(function () {
                    $scope.$broadcast('tileRepaint');
                });
            }

            vm.bbTileCollapsed = vm.isCollapsed;

        });
    }

    BBTileController.$inject = ['$scope', '$timeout'];

    function bbTile($timeout) {
        function link($scope, el, attrs, ctrls) {
            var dashboardCtrl = ctrls[1],
                vm = ctrls[0],
                dashboardState = {};

            function updateHeaderContent() {
                var wrapperEl;

                vm.hasHeaderContent = !!vm.headerContentEl;

                if (vm.headerContentEl) {
                    wrapperEl = el.find('.bb-tile-header-with-content:first');

                    wrapperEl.append(vm.headerContentEl);
                }
            }

            function initializeTile(data) {
                $timeout(function () {
                    var tiles = data.tiles || /*istanbul ignore next: default value */ [];

                    if (!vm.tileInitialized) {
                        //retrieve the tile id from the parent container
                        vm.tileId = el.parent().attr('data-tile-id') || /*istanbul ignore next: default value */ '';
                        vm.smallTileDisplayMode = data.smallTileDisplayMode || false;
                    }

                    vm.updateTileState(tiles);

                    vm.tileInitialized = true;
                });
            }

            //listens for the tilesInitialized event from the tileDashboard and updates the initial collapsed state of the tiles
            $scope.$on('tilesInitialized', function (event, data) {
                /*jslint unparam: true */

                initializeTile(data);
            });

            if (attrs.bbTileCollapsed) {
                $scope.$watch(function () {
                    return vm.bbTileCollapsed;
                }, function (newValue) {
                    vm.isCollapsed = newValue;
                });
            }

            vm.hasSettings = !!attrs.bbTileSettingsClick;

            updateHeaderContent();

            //If the dashboard has already been initialized and this tile hasn't, initialize tile.
            if (dashboardCtrl !== null) {
                if (dashboardCtrl.dashboardInitialized && !vm.tileInitialized) {
                    dashboardState = dashboardCtrl.getDashboardState();
                    initializeTile(dashboardState);
                    dashboardCtrl.layoutTiles();
                }
            }
        }
        return {
            link: link,
            replace: true,
            restrict: 'E',
            require: ['bbTile', '?^^bbTileDashboard'],
            scope: {},
            controller: BBTileController,
            controllerAs: 'bbTile',
            bindToController: {
                bbTileCollapsed: '=?',
                bbTileSettingsClick: '&?',
                tileHeader: '=bbTileHeader'
            },
            templateUrl: 'sky/templates/tiles/tile.html',
            transclude: true
        };
    }

    bbTile.$inject = ['$timeout'];

    function bbTileHeaderContent() {
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
    }

    function bbTileHeaderCheck() {
        return {
            replace: true,
            require: '^bbTileHeaderContent',
            restrict: 'E',
            templateUrl: 'sky/templates/tiles/tileheadercheck.html'
        };
    }

    function bbTileSection() {
        return {
            restrict: 'A',
            template: function (el) {
                el.addClass('bb-tile-content-section');
            }
        };
    }

    function BBTileDashboardController($scope, $timeout) {
        var vm = this;

        function fireDisplayModeChanged() {
            $scope.$broadcast('tileDisplayModeChanged', {
                smallTileDisplayMode: vm.smallTileDisplayMode,
                tiles: vm.tiles
            });
        }

        vm.getDashboardState = function () {
            return {tiles: vm.tiles, smallTileDisplayMode: vm.smallTileDisplayMode};
        };

        vm.layoutTiles = function () {
            /* This timeout is in place to allow a state change to
               complete before laying out tiles
            */
            $timeout(function () {
                vm.layoutTileColumns();
            });
        };

        vm.dashboardInitialized = false;
        vm.smallTileDisplayMode = false;

        vm.fireDisplayModeChanged = fireDisplayModeChanged;

        $scope.$watch(function () {
            return vm.tiles;
        }, function () {
            $timeout(function () {
                vm.layoutTileColumns();
                $scope.$broadcast('tilesInitialized', {
                    smallTileDisplayMode: vm.smallTileDisplayMode,
                    tiles: vm.tiles
                });

                vm.dashboardInitialized = true;
            });
        });

        $scope.$watch(function () {
            return vm.allCollapsed;
        }, function (newValue) {
            var i,
                n,
                tiles = vm.tiles;

            // Check for an explicit true/false here since null/undefined is the
            // indeterminate state.
            if (newValue === true || newValue === false) {
                for (i = 0, n = tiles.length; i < n; i++) {
                    if (vm.smallTileDisplayMode) {
                        tiles[i].collapsed_small = newValue;
                    } else {
                        tiles[i].collapsed = newValue;
                    }
                }

                vm.fireDisplayModeChanged();
            }
        });
    }

    BBTileDashboardController.$inject = ['$scope', '$timeout'];

    function bbTileDashboard($timeout, bbMediaBreakpoints) {

        function link($scope, element, attrs, vm) {
            var column1 = element.find('[data-dashboard-column="1"]'),
                column2 = element.find('[data-dashboard-column="2"]'),
                singleColumnMode = false,
                sortableOptions;

            //Layouts out the tiles based on the current one column or two column configuration
            function layoutTileColumns() {
                var layout = vm.layout;

                if (layout) {
                    if (singleColumnMode) {
                        moveTilesToContainer(element, column1, layout.one_column_layout);
                    } else {
                        moveTilesToContainer(element, column1, layout.two_column_layout[0]);
                        moveTilesToContainer(element, column2, layout.two_column_layout[1]);
                    }
                }
            }

            vm.layoutTileColumns = layoutTileColumns;


            //Inspects the tiles in each column and updates model accordingly.
            function parseColumnTiles() {
                $scope.$apply(function () {
                    var layout = vm.layout;

                    if (singleColumnMode) {
                        layout.one_column_layout = parseTileOrder(column1);
                    } else {
                        layout.two_column_layout[0] = parseTileOrder(column1);
                        layout.two_column_layout[1] = parseTileOrder(column2);
                    }
                });
            }

            function mediabreakpointChangeHandler(breakPoints) {
                singleColumnMode = (breakPoints.xs || breakPoints.sm);
                vm.layoutTileColumns();

                if (singleColumnMode) {
                    element.removeClass('bb-page-content-multicolumn');
                    column2.hide();
                } else {
                    element.addClass('bb-page-content-multicolumn');
                    column2.show();
                }

                vm.smallTileDisplayMode = breakPoints.xs;

                vm.fireDisplayModeChanged();
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

            $scope.$on('tileStateChanged', function (event, data) {
                /*jslint unparam: true */
                $scope.$apply(function () {
                    var allCollapsed = null,
                        collapsed,
                        collapsedProp,
                        i,
                        n,
                        tile,
                        tileId = data.tileId || /*istanbul ignore next: default value */ '',
                        tiles = vm.tiles;

                    collapsed = data.collapsed || false;
                    collapsedProp = vm.smallTileDisplayMode ? 'collapsed_small' : 'collapsed';

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
                        vm.allCollapsed = allCollapsed;
                    }
                });
            });
        }

        return {
            replace: true,
            require: 'bbTileDashboard',
            restrict: 'E',
            bindToController: {
                tiles: '=bbTiles',
                layout: '=bbLayout',
                allCollapsed: '=bbTileDashboardAllCollapsed'
            },
            scope: {},
            link: link,
            controller: BBTileDashboardController,
            controllerAs: 'bbTileDashboard',
            templateUrl: 'sky/templates/tiles/tiledashboard.html'
        };
    }

    bbTileDashboard.$inject = ['$timeout', 'bbMediaBreakpoints'];

    angular.module('sky.tiles', ['sky.mediabreakpoints'])
        .directive('bbTile', bbTile)
        .directive('bbTileHeaderContent', bbTileHeaderContent)
        .directive('bbTileHeaderCheck', bbTileHeaderCheck)
        .directive('bbTileSection', bbTileSection)
        .directive('bbTileDashboard', bbTileDashboard);
}());

/*jslint browser: true, plusplus: true */
/*global angular */

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

(function () {
    'use strict';


    function bbTooltip($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {
                //Add bootstrap directive
                /*istanbul ignore else */
                if (!el.attr('uib-tooltip-template')) {
                    el.attr('uib-tooltip-template', "'" + el.attr('bb-tooltip') + "'");
                }

                el.removeAttr('bb-tooltip');
                $compile(el)($scope);
            }
        };
    }

    bbTooltip.$inject = ['$compile'];

    angular.module('sky.tooltip', ['ui.bootstrap.tooltip'])
        .directive('bbTooltip', bbTooltip);

}());

/*global angular */

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
                    var $el;

                    /* istanbul ignore else: sanity check */
                    if (getWaitCount(el) === 0) {
                        $el = $(el);

                        if (!isBlockUISupported()) {
                            return;
                        }

                        if (isFullPage(el)) {
                            $.unblockUI();
                        } else {
                            $el.unblock();
                        }
                        $el.removeData(showingWaitAttr);
                    }
                }, 0);
            }

            addWait = function (el, options) {
                var count;
                options = options || {};

                // Increases the element wait count and shows the wait if the count is above 0.
                count = getWaitCount(el, options.nonblocking);
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
                var count;
                options = options || {};

                // Decreases the element wait count and hides the wait if the count is at 0.
                count = getWaitCount(el, options.nonblocking);
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

                /*istanbul ignore next: sanity check */
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

(function () {
    'use strict';

    angular.module('sky.wizard', ['sky.resources', 'ui.bootstrap.tabs'])
        .directive('bbWizard', function () {
            return {
                link: function (scope, el) {
                    /*jslint unparam: true */
                    el.addClass('bb-wizard');
                },
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
        'sky.alert',
        'sky.autofocus',
        'sky.autonumeric',
        'sky.avatar',
        'sky.check',
        'sky.checklist',
        'sky.contextmenu',
        'sky.data',
        'sky.datepicker',
        'sky.daterangepicker',
        'sky.error',
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
        'sky.pagesummary',
        'sky.pagination',
        'sky.popover',
        'sky.resources',
        'sky.scrollintoview',
        'sky.searchfield',
        'sky.selectfield',
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
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Actions","alert_close":"Close","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Please choose a file that is a valid image.","avatar_error_not_image_title":"File is not an image.","avatar_error_too_large_description":"Please choose an image that is less than {0}.","avatar_error_too_large_title":"File is too large.","checklist_select_all":"Select all","checklist_clear_all":"Clear all","checklist_no_items":"No items found","grid_back_to_top":"Back to top","grid_column_picker_all_categories":"All","grid_column_picker_description_header":"Description","grid_column_picker_header":"Choose columns to show in the list","grid_column_picker_name_header":"Column","grid_column_picker_search_placeholder":"Search by name","grid_column_picker_submit":"Apply changes","grid_columns_button":" Choose columns","grid_filters_apply":"Apply filters","grid_filters_button":"Filters","grid_filters_clear":"Clear","grid_filters_header":"Filter","grid_filters_hide":"Hide","grid_filters_summary_header":"Filter:","grid_load_more":"Load more","grid_search_placeholder":"Find in this list","grid_column_picker_search_no_columns":"No columns found","modal_footer_cancel_button":"Cancel","modal_footer_primary_button":"Save","month_short_april":"Apr","month_short_august":"Aug","month_short_december":"Dec","month_short_february":"Feb","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jun","month_short_march":"Mar","month_short_may":"May","month_short_november":"Nov","month_short_october":"Oct","month_short_september":"Sep","page_noaccess_button":"Return to a non-classified page","page_noaccess_description":"Sorry, you don't have rights to this page.\nIf you feel you should, please contact your system administrator.","page_noaccess_header":"Move along, there's nothing to see here","text_expand_see_less":"See less","text_expand_see_more":"See more","text_expand_modal_title":"Expanded view","text_expand_close_text":"Close","grid_action_bar_clear_selection":"Clear selection","grid_action_bar_cancel_mobile_actions":"Cancel","grid_action_bar_choose_action":"Choose an action","date_field_invalid_date_message":"Please enter a valid date","date_range_picker_this_week":"This week","date_range_picker_last_week":"Last week","date_range_picker_next_week":"Next week","date_range_picker_this_month":"This month","date_range_picker_last_month":"Last month","date_range_picker_next_month":"Next month","date_range_picker_this_calendar_year":"This calendar year","date_range_picker_last_calendar_year":"Last calendar year","date_range_picker_next_calendar_year":"Next calendar year","date_range_picker_this_fiscal_year":"This fiscal year","date_range_picker_last_fiscal_year":"Last fiscal year","date_range_picker_next_fiscal_year":"Next fiscal year","date_range_picker_this_quarter":"This quarter","date_range_picker_last_quarter":"Last quarter","date_range_picker_next_quarter":"Next quarter","date_range_picker_at_any_time":"At any time","date_range_picker_today":"Today","date_range_picker_tomorrow":"Tomorrow","date_range_picker_yesterday":"Yesterday","date_range_picker_specific_range":"Specific range","date_range_picker_filter_description_this_week":"{0} for this week","date_range_picker_filter_description_last_week":"{0} from last week","date_range_picker_filter_description_next_week":"{0} for next week","date_range_picker_filter_description_this_month":"{0} for this month","date_range_picker_filter_description_last_month":"{0} from last month","date_range_picker_filter_description_next_month":"{0} for next month","date_range_picker_filter_description_this_calendar_year":"{0} for this calendar year","date_range_picker_filter_description_last_calendar_year":"{0} from last calendar year","date_range_picker_filter_description_next_calendar_year":"{0} for next calendar year","date_range_picker_filter_description_this_fiscal_year":"{0} for this fiscal year","date_range_picker_filter_description_last_fiscal_year":"{0} from last fiscal year","date_range_picker_filter_description_next_fiscal_year":"{0} for next fiscal year","date_range_picker_filter_description_this_quarter":"{0} for this quarter","date_range_picker_filter_description_last_quarter":"{0} from last quarter","date_range_picker_filter_description_next_quarter":"{0} for next quarter","date_range_picker_filter_description_at_any_time":"{0} at any time","date_range_picker_filter_description_today":"{0} for today","date_range_picker_filter_description_yesterday":"{0} from yesterday","date_range_picker_filter_description_tomorrow":"{0} for tomorrow","date_range_picker_filter_description_specific_range":"{0} from {1} to {2}","date_range_picker_from_date":"From date","date_range_picker_to_date":"To date","date_range_picker_min_date_error":"End date must be after start date","date_range_picker_max_date_error":"Start date must be before end date","errormodal_ok":"OK","error_description_broken":"Try to refresh this page or come back later.","error_description_construction":"Thanks for your patience while improvements are made!\nPlease check back in a little while.","error_title_broken":"Sorry, something went wrong.","error_title_construction":"This page will return soon.","error_title_notfound":"Sorry, we can't reach that page.","file_size_b_plural":"{0} bytes","file_size_b_singular":"{0} byte","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_size_gb":"{0} GB","file_upload_drag_file_here":"Drag a file here","file_upload_drop_files_here":"Drop files here","file_upload_invalid_file":"This file type is invalid","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"or click to browse","file_upload_paste_link":"Paste a link to a file","file_upload_paste_link_done":"Done","searchfield_searching":"Searching...","searchfield_no_records":"Sorry, no matching records found","selectfield_summary_text":"{0} items selected","selectfield_remove":"Remove","selectfieldpicker_select":"Select","selectfieldpicker_select_value":"Select value","selectfieldpicker_select_values":"Select values","selectfieldpicker_clear":"Clear selection","wizard_navigator_finish":"Finish","wizard_navigator_next":"Next","wizard_navigator_previous":"Previous","datepicker_today":"Today","datepicker_clear":"Clear","datepicker_close":"Done"};

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
        '        <div uib-dropdown>\n' +
        '             <button class="btn bb-btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">\n' +
        '            {{bbActionBarItemGroup.title}}<span class="caret"/>\n' +
        '            </button>\n' +
        '\n' +
        '            <ul uib-dropdown-menu>\n' +
        '\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</span>\n' +
        '');
    $templateCache.put('sky/templates/alert/alert.html',
        '<div class="alert" ng-class="[\'alert-\' + (bbAlert.bbAlertType || \'warning\'), bbAlert.bbAlertCloseable === \'true\' ? \'alert-dismissible\' : null]" ng-show="!bbAlert.bbAlertClosed" role="alert">\n' +
        '    <button ng-show="bbAlert.bbAlertCloseable === \'true\'" type="button" class="close" ng-click="bbAlert.close({$event: $event})">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'alert_close\' | bbResources}}</span>\n' +
        '    </button>\n' +
        '    <div ng-transclude></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/avatar/avatar.directive.html',
        '<div class="bb-avatar" ng-switch="bbAvatar.canChange">\n' +
        '  <div ng-switch-when="true">\n' +
        '    <div\n' +
        '       class="bb-avatar-file-drop"\n' +
        '       bb-file-drop\n' +
        '       bb-file-drop-change="bbAvatar.photoDrop(files, rejectedFiles)"\n' +
        '       bb-file-drop-accept="\'image/*\'"\n' +
        '       >\n' +
        '      <ng-include src="\'sky/templates/avatar/avatarinner.include.html\'" onload="bbAvatar.onTemplateLoad()"></ng-include>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div ng-switch-default>\n' +
        '    <ng-include src="\'sky/templates/avatar/avatarinner.include.html\'" onload="bbAvatar.onTemplateLoad()"></ng-include>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/avatar/avatarinner.include.html',
        '<div class="bb-avatar-wrapper">\n' +
        '  <div class="bb-avatar-image" ng-show="bbAvatar.bbAvatarSrc"></div>\n' +
        '  <canvas class="bb-avatar-initials" ng-show="bbAvatar.showInitials()"></canvas>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/check/styled.html',
        '<span role="input"></span>\n' +
        '');
    $templateCache.put('sky/templates/check/wrapper.html',
        '<label class="bb-check-wrapper"></label>\n' +
        '');
    $templateCache.put('sky/templates/checklist/checklist.directive.html',
        '<div>\n' +
        '  <div>\n' +
        '    <div ng-if="bbChecklist.bbChecklistIncludeSearch" class="bb-checklist-filter-bar">\n' +
        '      <div class="bb-checklist-search">\n' +
        '        <input type="text" class="bb-checklist-search-box" maxlength="255" placeholder="{{bbChecklist.bbChecklistSearchPlaceholder}}" ng-model="bbChecklist.searchText" ng-model-options="{debounce: bbChecklist.bbChecklistSearchDebounce}" data-bbauto-field="ChecklistSearch">\n' +
        '        <div class="bb-checklist-search-icon">\n' +
        '          <i class="fa fa-search"></i>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <div ng-if="bbChecklist.bbChecklistCategories &amp;&amp; bbChecklist.bbChecklistCategories.length > 0" class="bb-checklist-filter-bar bb-checklist-category-bar">\n' +
        '      <button type="button" class="btn btn-sm" ng-click="bbChecklist.filterByCategory()" ng-class="bbChecklist.selectedCategory ? \'btn-default\' : \'btn-primary\'">{{\'grid_column_picker_all_categories\' | bbResources}}</button>\n' +
        '      <button ng-repeat="category in bbChecklist.bbChecklistCategories" type="button" class="btn btn-sm" ng-click="bbChecklist.filterByCategory(category)" ng-class="bbChecklist.selectedCategory === category ? \'btn-primary\' : \'btn-default\'">{{category}}</button>\n' +
        '    </div>\n' +
        '    <div class="bb-checklist-filter-bar bb-checklist-select-all-bar" ng-show="!bbChecklist.isSingleSelect()">\n' +
        '      <button type="button" class="btn btn-link" data-bbauto-field="ChecklistSelectAll" ng-click="bbChecklist.selectAll()">{{\'checklist_select_all\' | bbResources}}</button>\n' +
        '      <button type="button" class="btn btn-link" data-bbauto-field="ChecklistClear" ng-click="bbChecklist.clear()">{{\'checklist_clear_all\' | bbResources}}</button>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <div class="bb-checklist-wrapper" bb-wait="bbChecklist.bbChecklistIsLoading" ng-switch="bbChecklist.bbChecklistMode" ng-class="bbChecklist.getChecklistCls()">\n' +
        '    <div ng-switch-when="list" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{bbChecklist.filteredItems.length}}">\n' +
        '      <div ng-switch="bbChecklist.isSingleSelect()">\n' +
        '        <div ng-switch-when="true">\n' +
        '          <button ng-repeat="item in bbChecklist.filteredItems" type="button" class="bb-checklist-list-row" ng-class="bbChecklist.getRowCls(item)" data-bbauto-field="{{item.name}}" ng-click="bbChecklist.singleSelectRowClick(item)">\n' +
        '            <ng-include class="bb-checklist-list-col" src="\'sky/templates/checklist/checklistlistrow.include.html\'"></ng-include>\n' +
        '          </button>\n' +
        '        </div>\n' +
        '        <div ng-switch-default>\n' +
        '          <label ng-repeat="item in bbChecklist.filteredItems" class="bb-checklist-list-row" ng-class="bbChecklist.getRowCls(item)" data-bbauto-field="{{item.name}}">\n' +
        '            <div class="bb-checklist-list-col bb-checklist-list-col-checkbox">\n' +
        '              <input bb-check type="checkbox" checklist-model="bbChecklist.bbChecklistSelectedItems" checklist-value="item" checklist-select-style="bbChecklist.bbChecklistSelectStyle" />\n' +
        '            </div>\n' +
        '            <ng-include class="bb-checklist-list-col" src="\'sky/templates/checklist/checklistlistrow.include.html\'"></ng-include>\n' +
        '          </label>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <table class="table bb-checklist-table" ng-switch-default>\n' +
        '      <thead>\n' +
        '        <tr>\n' +
        '          <th class="bb-checklist-checkbox-column"></th>\n' +
        '          <th ng-repeat="column in bbChecklist.columns" class="{{column.class}}" ng-style="{\'width\': column.width}">{{column.caption}}</th>\n' +
        '        </tr>\n' +
        '      </thead>\n' +
        '      <tbody bb-highlight="bbChecklist.searchText" bb-highlight-beacon="bbChecklist.highlightRefresh" data-bbauto-repeater="ChecklistItems" data-bbauto-repeater-count="{{bbChecklist.filteredItems.length}}">\n' +
        '        <tr ng-repeat="item in bbChecklist.filteredItems" ng-click="bbChecklist.rowClicked(item);" class="bb-checklist-row">\n' +
        '          <td>\n' +
        '            <input bb-check type="checkbox" checklist-model="bbChecklist.bbChecklistSelectedItems" checklist-value="item" data-bbauto-field="{{item[bbChecklist.bbChecklistAutomationField]}}" />\n' +
        '          </td>\n' +
        '          <td ng-repeat="column in bbChecklist.columns" class="{{column.class}}" data-bbauto-field="{{column.automationId}}" data-bbauto-index="{{$parent.$index}}">{{item[column.field]}}</td>\n' +
        '        </tr>\n' +
        '      </tbody>\n' +
        '    </table>\n' +
        '    <div class="bb-checklist-no-items" ng-if="!bbChecklist.filteredItems.length">{{bbChecklist.bbChecklistNoItemsMessage || (\'checklist_no_items\' | bbResources)}}</div>\n' +
        '  </div>\n' +
        '  <div ng-transclude></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/checklist/checklistlistrow.include.html',
        '<div>\n' +
        '  <div class="bb-checklist-list-title" bb-highlight="bbChecklist.searchText" ng-bind="item.title"></div>\n' +
        '  <div class="bb-checklist-list-description" bb-highlight="bbChecklist.searchText" ng-bind="item.description"></div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/contextmenu.html',
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" uib-dropdown>\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="contextButtonStopPropagation($event)" uib-dropdown-toggle></bb-context-menu-button>\n' +
        '    <ul uib-dropdown-menu role="menu">\n' +
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
        '    <uib-accordion>\n' +
        '        <uib-accordion-group is-open="accordionLocals.accordionOpen">\n' +
        '\n' +
        '            <uib-accordion-heading ng-if="accordionLocals.staticHeader">\n' +
        '                <div ng-click="toggleAccordion($event)">\n' +
        '                    <span>\n' +
        '                        {{heading}}\n' +
        '                    <span>\n' +
        '                    <i ng-class="\'fa-chevron-\' + (accordionLocals.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '                </div>\n' +
        '            </uib-accordion-heading>\n' +
        '            <ng-transclude></ng-transclude>\n' +
        '        </uib-accordion-group>\n' +
        '    </uib-accordion>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/contextmenu/submenuheading.html',
        '<uib-accordion-heading>\n' +
        '    <div ng-click="toggleAccordion($event)">\n' +
        '        <ng-transclude></ng-transclude>\n' +
        '        <i ng-class="\'fa-chevron-\' + (accordionLocals.accordionOpen ? \'up\' : \'down\')" class="fa bb-submenu-chevron"></i>\n' +
        '    </div>\n' +
        '\n' +
        '</uib-accordion-heading>\n' +
        '');
    $templateCache.put('sky/templates/datefield/datefield.html',
        '<span class="add-on input-group-btn">\n' +
        '    <button type="button" class="btn btn-default bb-date-field-calendar-button">\n' +
        '        <i class="fa fa-calendar"></i>\n' +
        '    </button>\n' +
        '</span>\n' +
        '');
    $templateCache.put('sky/templates/datepicker/datepicker.html',
        '<div>\n' +
        '    <div ng-if="locals.loaded" class="input-group bb-datefield">\n' +
        '        <input name="{{locals.inputName}}" type="text" class="form-control" ng-model="locals.date" is-open="locals.opened" datepicker-options="locals.dateOptions" uib-datepicker-popup="{{format}}" show-button-bar="locals.showButtonBar" current-text="{{resources.datepicker_today}}" clear-text="{{resources.datepicker_clear}}" close-text="{{resources.datepicker_close}}" datepicker-append-to-body="{{locals.appendToBody}}" close-on-date-selection="{{locals.closeOnSelection}}" bb-datepicker-custom-validate="{{locals.hasCustomValidation}}" placeholder="{{placeholderText}}" max-date="maxDate" min-date="minDate" ng-required="locals.required" bb-min-date bb-max-date />\n' +
        '        <span class="bb-datepicker-button-container add-on input-group-btn" ng-class="{\'bb-datefield-open\': locals.opened}">\n' +
        '            <button type="button" class="btn btn-default bb-date-field-calendar-button" ng-click="locals.open($event)">\n' +
        '                <i class="fa fa-calendar"></i>\n' +
        '            </button>\n' +
        '        </span>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/daterangepicker/daterangepicker.html',
        '<div class="form-inline" ng-form="bbDateRangePickerCtrl.dateRangeForm">\n' +
        '    <div class="form-group bb-date-range-picker-form-group">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="bbDateRangePickerCtrl.pickerLabel && !bbDateRangePickerCtrl.noLabels">{{bbDateRangePickerCtrl.pickerLabel}}</label>\n' +
        '      <select data-bbauto-field="{{bbDateRangePickerCtrl.bbDateRangePickerAutomationId}}_DateRangeType"\n' +
        '        class="form-control"\n' +
        '        ng-options="bbDateRangePickerCtrl.getDateRangeTypeCaption(t) for t in (bbDateRangePickerCtrl.bbDateRangePickerOptions.availableDateRangeTypes || bbDateRangePickerCtrl.defaultDateRangeOptions)"\n' +
        '        ng-model="bbDateRangePickerCtrl.bbDateRangePickerValue.dateRangeType" />\n' +
        '    </div>\n' +
        '    <div class="form-group bb-date-range-picker-form-group" ng-if="bbDateRangePickerCtrl.specificRangeIsVisible">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="!bbDateRangePickerCtrl.noLabels">{{::bbDateRangePickerCtrl.resources.date_range_picker_from_date}}</label>\n' +
        '      <bb-datepicker ng-model="bbDateRangePickerCtrl.fromDate" max-date="bbDateRangePickerCtrl.maxDate" bb-datepicker-name="fromDate" datepicker-append-to-body="true" placeholder="bbDateRangePickerCtrl.fromPlaceholder"></bb-datepicker>\n' +
        '      <label class="bb-date-range-picker-date-format-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.fromDate.$error.dateFormat">{{::bbDateRangePickerCtrl.resources.date_field_invalid_date_message}}</label>\n' +
        '      <label class="bb-date-range-picker-date-max-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.fromDate.$error.maxDate">{{::bbDateRangePickerCtrl.resources.date_range_picker_max_date_error}}</label>\n' +
        '    </div>\n' +
        '    <div class="form-group bb-date-range-picker-form-group" ng-if="bbDateRangePickerCtrl.specificRangeIsVisible">\n' +
        '      <label class="bb-date-range-picker-label" ng-if="!bbDateRangePickerCtrl.noLabels">{{::bbDateRangePickerCtrl.resources.date_range_picker_to_date}}</label>\n' +
        '      <bb-datepicker ng-model="bbDateRangePickerCtrl.toDate" min-date="bbDateRangePickerCtrl.minDate" bb-datepicker-name="toDate" datepicker-append-to-body="true" placeholder="bbDateRangePickerCtrl.toPlaceholder"></bb-datepicker>\n' +
        '      <label class="bb-date-range-picker-date-format-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.toDate.$error.dateFormat">{{::bbDateRangePickerCtrl.resources.date_field_invalid_date_message}}</label>\n' +
        '      <label class="bb-date-range-picker-date-min-error error" ng-show="bbDateRangePickerCtrl.dateRangeForm.toDate.$error.minDate">{{::bbDateRangePickerCtrl.resources.date_range_picker_min_date_error}}</label>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/error.description.directive.html',
        '<div class="bb-error-description-container">\n' +
        '  <span ng-if="bbErrorDescription.description">{{bbErrorDescription.description}}</span>\n' +
        '</div>\n' +
        '<ng-transclude></ng-transclude>\n' +
        '');
    $templateCache.put('sky/templates/error/error.directive.html',
        '<div class="row bb-error">\n' +
        '  <section class="col-xs-12 text-center">\n' +
        '    <div class="bb-error-image" ng-show="bbError.imageCtrl">\n' +
        '      <bb-error-image error-default error-type="{{bbError.imageType}}" ng-if="bbError.imageType !== \'\' && !bbError.imageHasOverride">\n' +
        '      </bb-error-image>\n' +
        '    </div>\n' +
        '    <div class="bb-error-title" ng-show="bbError.titleCtrl">\n' +
        '      <bb-error-title error-default error-type="{{bbError.titleType}}" ng-if="bbError.titleType !== \'\' && !bbError.titleHasOverride">\n' +
        '      </bb-error-title>\n' +
        '    </div>\n' +
        '    <div class="bb-error-description" ng-show="bbError.descriptionCtrl">\n' +
        '      <bb-error-description error-default error-type="{{bbError.descriptionType}}" ng-if="bbError.descriptionType !== \'\' && !bbError.descriptionHasOverride">\n' +
        '      </bb-error-description>\n' +
        '    </div>\n' +
        '    <div class="bb-error-action" ng-show="bbError.actionCtrl"></div>\n' +
        '    <ng-transclude></ng-transclude>\n' +
        '  </section>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/error.image.directive.html',
        '<div ng-if="bbErrorImage.errorType" class="bb-error-image-container">\n' +
        '  <div class="bb-error-image-broken-container" ng-if="bbErrorImage.errorType === \'broken\'">\n' +
        '    <img class="bb-error-image-broken"\n' +
        '      src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAC9CAYAAAAeN4fHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7Z13eFRV+sc/585MJoU0ehGk9w6KiiBIR1GBzJDQBN3VXRv2XV1dI7v2te7qqr9VOkkmAcSCjS6gCKETeu8kJIT0ycw9vz9CSZlkSu6UaD7P4yO597SZ+c6Zc9/znveFWmqppZZaaqmlllp+L6zo1ev6zX36GPw9jt86ir8H8HtDSmVmdjH3+nscv3WEvwcQaPzQq1dTg02JGLwzda/WbS/vdkNrodj3ITl9wV7Uzrx7t1XrPmopoXbGLsVXffqE6lSWSMFwrdteNWiQXlHU5wE9ghb1DMaHapck3uN3O2PHg9K/d+8OhUIcG5Oamm8xmXT19h/6ArgTmD9k+5Yp1e1jedfe3YWOeCQdEbQBgsoVsQHHgTRFL6YPTk3NqG6ftZTwu52x40FVVDEz1CbzVvTonVVv/6GDlIgaoK8WfQzdtWUHyI0IOlFR1AB6oBmST2tFrS2/2xkb4PuuNzTX6+xpQJ1ytyTI5ULIDzPatfvanJxsB1jZs29/Fdlg6LbUL9zpZ2XP3s9IyRtUfL+LJMQM3b7la89fhYskTmgP6iigA0IWg2JhgmW91/v1E79rYQMs79n7WVEiOsdI9thU3YgRuzadWNGt1ygUsUzCp5m2okfdefhb0aP3UeD6cpdXDtm+ZYhnI3eRBNNdwN8Q3FjuTiaxyfW82rcf0ft7AH5HcqzSO5CkGsRfRqRuOgGAothBIuCBenpjjxW9ek0YsnVrmfrxoAzo1utWFGGSUm4bumPrZ1/16ROKTTZ30Ec3TV9LaSymzqh8CvR3eF/KRV7rOwD43QtbIJ90+MMluXvIji1flbmkqKpQr5bthyq2L+/e6w/rdmxd3L9Hn1sEqkkgYoCmAKoi2wOEWWUnqaAAe4WUL6iKUkeRvCSRrVZ1uaHx4N2bzmr6ohJjpqLyERBWSYm9BNue1bTPAON3LewV3XoNBHEjYAU2g+wIoi6AtOo3lC8v7EIt9x2IFEJYBvTonQ6yYZkviCB1+LZtBwBUvYwWUjygREXMGrx6tQ1gc58+Cy/auA9DcWNAG2F/8oCByIufgJxeaRnJBYRyJ2O/uKhJnwHK71rYqk6nCFUdqLsUsWnw0dWFy3v16qyofCehyZC9v2ZWKK8oqiLV8pcF0LBi4yLxyj+Hbt26vPztvqmpxcAnHg/eYtJhLnmoBWD+pAgMWSlIhlVRy4qO8aCeJsk8FCkHADcATSh5gD6HkOuwG95lYsI5j8cWAPyuhT1s2+bVpf8eunVr2g+9et2kqOJzUbLGLoNO2KWULj1vS9WARaNhliVxQnuE+goqd5IU8ykTUmaQENsUYV2GpEcVNVWk/BuScUixBGS0gzJtkaI/OlsPYJRXxu8jftfCdsTwrVtPL2vb9u7y15f37HmDVIWrM+y6YampxzUeGiTGmED9HHnZPCmFZGFcI4RtOdCp6spyD0K8VfHr6qioXFbtsfqZWmE7YPTBg0VX/r1q0CC9zMp5Tkr5d1x/vzZrPqgk83ikXFhmDArfgG0VzkQtASG6uNBLHpIZxKV8Vp2hBgK/ezt2Vazq2bOlKpW5wAA3qxapKDcP2755qyYDSYi5BSFWA6V9SzZd/v8NmvQBqaBMJDZpv0bt+ZXf7Za6M5b36D1BlcpO3Bc1gFFBTVjVpUv5HU33sZgiEWIBZUUNkIs2oi5Gin+icMtvRdRQuxSplMz2bVKi9x8+VWKbVsaBvM7NJjqoeuP/AXHVGogq3gDZstzVdGBwtdotYQco04lL2qJBWwFF7VLEBSSIlT363gD2sZRswLR1ua4Q04ZuS53jUccJ4/silI1U/GXdSbV2LaUEZQOCPUgiL1/LAk4hScUe9BOTF1zyvH3/UytsN1nRtU8bdPKgg1s5QCYQUeqaEZCKKvq6fXBBIkg0/VLBx0NgQ5Jfrh+tyUXIOQjxV8zJuV7sx2vUCtsDVvToswtkaSuDTSpy4NCtW3+uVsMWUwOkGIGU/YBhQIdqtVd9VhCbPNTPY/CI2jW2B0ihfinkNfOZQMwcsnWLZ6K2mDpjF/eAvBOVfiAD6YG++g+/fqJW2J4g+ArJcyV/yPUZ7du8yvZU1+vPmhZMSO4YEA+gMgTh2namD9kCch4Ref/190A8JdDe0BpBPCgDevQ+BYQoQu05eNu2oy5VtJgaoPIM8ABceWgLMAQ5SCxI9UPiFmljh/cDtcL2kJU9+vwPwcrbt6UudFp4YVx9FNtTwCPUrJ/3tUj1WeIWbfT3QNylVtgesrZPnyYDU1PPVFnIYtJhFw8j5D/wrhXDm0hgPgqPY06u4PEYqNQK21skjO8FyscOjmTVVE4gRFxNOSdZK2ytWTVIz/n6LyPFXwCdu9UNio6RjXsysEFnukW1IExvBGB/zhm2ZR0l+cTPnC302xkBK8g4YlMW+2sArlIrbC1JiG0O9oUIbnW3ql7omNF+NE90uINmIXUrLWeXKl+c2sSz2+dzONcvZwFsIKcQm5LovKj/qBW2ViSZR6DKBQjcPvl9fVgDEm9+nJvqtXO5TqG9mGe2z+M/B75ztzstKELK24lLqXB8LlBw+6eyFgckmf+IlAsQ7ls8moXUZfXgeLpFtXCrnl7RMbpJL4w6PSvO7XK32+qiR4g7MHdZQHJaQG65127QVAeJINH8ElK+5El1nVBYOuBZWtdp5PEQnus0lv05Z5h9ZLVL5UN1RkY26cmt9TvSLrwxwbogCuxW9uec5pcLB/j6dCqF9mJXmmqMyn+AGI8H70VqlyJucun0qvqqrnh80okjnz944MePEeI+T9ua0X407/WaVuG6lJKDhw+z78AB8vPzqV+vHj27daNuXcdr73x7EZ2/fZJjeemV9hWmN/K3zuN4sM0w6gZV/sOSXZzPp4eW84/di8ixFTh/EZK7iUv+0nlB31IrbDfJOft9Qzuc3ZOXdfru7cuanbe68OE7QC90nLjrvzQOjipz/ZdNm/hs9myOHi85Mtm8WTMeuO8+2rVtS05ODtHR0URGVDSJf3Twex5OdXyiq2/dNiy86THahTdxeXynC7KY9MsHrD6/21nR3ezt0p34+ArH9/1JrbDdRSK2HLWcaR0S2ehsUT6mnd+zM/eC282MbNKTbwc+X+bavIQE5iUkIGXJidvg4GD+9+GHNGp4LbpDcXExGZmZNGlUdvlSYLdSb8l9FNjLRl3rE92aFYP/TqQh1O0xFqnFTPr5AxaddLbxKM3EpiS73YEXCSRPspqBJeblt45uawTQ2BjK1z1H0y/S/TXygPplz99+9+OPzF248KqoAbp06lRG1AAGg4HNqalYrWUFHKILon/9sl6u9Y3hfHvb8x6JGsCoGJh/02P0jGpZdUEpHvaoAy9SK2x3SDBNQIoXUtIPcbKoxBgQqTeypPsoBtdt5lZTbcMbX/13Tk4On3z+eYUyhYWFDutmX7rE98srxOChZ3TLMn+/0WMyDYwVly2qqrJn3z6+/fFHvvzmG35NTaXI6ji+ZrDOQOItj6MXVRjQBLexcHzHygv4nlphu0pCzAAEcwBRrKr89+S1tWeoTk9C1+GMrOe6yS5IuWaQWrF6Nbm5Fa1maXv3kra37MGbgsJCVq5Zw4rVqyuUjzZceyhsFlKXe1veVqHMtz/+yJQ//IHHnn6adz74gJVr1qDT6cjMzOTQ4cMUF1e0iHQIb8qk653sOenEhKoL+JZac58rJMQ2RdgXUXLUC4BZp/fw1PU9qKsPBiBY0bGg6zAe2ruGpHOOTo6VJbs4/+q/U7dtc1hGSslzf/87EydMoHvXrly4cIGE5GROnDyJ0WisUN4mr0U8m9JyIDpxbd5SVZU33nmHlWvWXL3WtEkTXps5k5Dg4KvX0jMyCAsLIzQkpEzbD7cbyZyja6gUVYwGXq68gG+pFbYzLCYdqn0B0KD05Xy7jc9O7eGZ63tdvaYTgo863oYQgsSzB6psdufFa4Gizp0/X2m5/IIC/jd7doXrRUVFSCkR4trz/6FSW+y3Nehcpvwnn39eRtQAA/r3LyNqgAb165PyxRfE3HNPmet9oltT3xhORlGO44EK+rIwrj4TEwIiM0PtUsQZUr4ADHJ0698ndpJlKypzTScE/+04kAebVR146Yez26/+W693f36pW7duGVED/HzhWliQNqU2fQ4ePsySLyuamh0tOwB2paVx4NChMtcUIegWWeVSS0FnDxhPxlphV0WSuT9SvFjZ7Us2K+8f317hukDwerubeLh55RESdmYfZ11Gyfq5ZQv3ttMBunYuOyP/mnmQAznX3MNDdNdS3nz59ddlrC1XWLF6NZdyys7A586fZ+v27axYtapC+egqNnZKULWKSlVtaoVdGbOmBSPl/3DiT/PxyTROF+VVuC4QvNKmH39t2bvSuv/YXZJU4NZbbnF7eKOHl83Y98aepVf/3bQgiMz87Kt/b97q+IRXdnY2jz71FKvWruXosWOsWruWZ194gfz8/AozNpR4FlaJFD3deAlepXaNXRmhuS8ihVMTVqFq4+3j23i7neOMGH9t2ZtgRU/84V8r3Pvh7HY+PPA9D904nA7t2rHvQNXr8iv0v/lm+vS6trb/6nQqi0ttogw/W5/tr85lf0Q4kY3q00qEEB3ZgIvWArIK8ykuJdDTZ87w6ltvVeijoKDijuqhXKfx6Vu79AJ8QK13nyMSJ/QAZuPi+7MrLxNzwzZEGSpaKgBuimxEpD6IlZmnKtxbcW4Xfeu2xtR/BD+tX+9QUKXp0K4d8c8/j8FQEspvS9YRxq57i0L12np5R3QOuQY7rTP0FGZkUz84jOvCImkbUZ9udZvQPrIBzcIiqBccRh2DEZ2iYLXbUEvFGG7Xti2333bNXJhlzeO5HQudzdphpKS9VuUL8BG1wnZETGcLbsw+qpRk2YoY06BlpWVuiGhIq5AIvs88jlpqvWuXKpYTP9O+QXNm3DmZY8ePc+ZsxZlRr9dz1x138NzTT1+1ZPx4dgdj179FprWsDVwCh+oUsK7BRcKLdTQvMCJKeU8YFB3hBiMNSgm+a93GtI2oT5PQCKKNIXRr156mjZsQFGJE0emYd3QtS09twglBmLu8R3JakbOC3qbWV6Q8JXGoU9ytpgj4qc84utSp/PQLwLKMY9yXtpJC1V7h3uCGXXin172Ephfza2oqZ86exWg00ur667npxhtpUL8+AMfzM3gtbQmfHFqOdCGSe8dLoUw51oTm+Y5/UapEQFh0FDuUDPYGXeSHxplkGWyVl1dojTn5iPsdaUutsEtjMQWhshs3gk6WZmB0U77sMdppufXZZ4jd+QM5Nsfmtl7RrYi57ia6RjanbXhjCuxW8m1FbM48zOr03Sw7vbXMZowr6KRgyPloxp1oSKjdM5tBtsHOEz33Y1Oq+DJJ9QbiFmkf+N5Nah8eS2MXf0JIj0QNsDbrNMsvnGRovaojDvePbMJXPe8gZvt3ZBRX9AfZmnWErVnaTnp2IfmhUSYb615iwolG9M+IcDsA1fyWZ6oWNQAixEkBn1Br7rvCslFGhKx27sO/HfoFmzOzGNCzTn2W9bqT64y+jZ+TbbDxaetTxHc5yqE6rvuSf9M0g411XYgsXHof348ExCACgkth9wPuueg5YF/+RRY42U6/QvvQKL7rfScdQqOcF9aYI2EFzOxyhE/anCLHUPmyRgrJ0mYZJDWvfNu/DHYZEKuA3/ca22IKQor+oN5weYex2tNnkE1y23nBvPFTCTYGOa8AXLRZid35A79ka5ug11XC7Ar3nGzIsHN1Kb3SuGiwMbvVGbZEV+If4ggpBxKX8pP2o3SP35+w4+MVOu4aASIOGANoMl2GFanE/pLF2M2XCLGqNJl0O02nVpVLtCxF0s4DaatZmu58bd0qrCEtQusTHRRGrq2QfLuVw7nnqh1I5/r8YKYebcJ1+UZWNMziq2bpFOjcPfGl3EhsklO7oLf5/QjbYopEldNBPIyHVo/K6L8/j6eWpRNZcO0nXQQZ6Pr5kwQ1cP17o6qSZ/ev539nq05+YFQMDG/cHVPzm7mrWd+rJ2RybAWsO7+HpCWLWR51mlN6zyIj6KXAJlxJCOkAVe3KxEVOD0p6m9/+Bs3Su8IZ2+1ZpEgCcQ9QtaHZTUwbs3n623SCi8vNbHYV+6UCovq7kl6xBCEEw+u3oOc5G8vyzlKsdzzv2KXK/pwzLDn1K+/u+4aNmQexSTsdwpuinrxEyicLeH3YH+nfqRffn91eZkfRFdTqTHfSMJNFuyo6z/iY3+6MPWtaMCF5jwLPAvW90cWYLdk8/n3l7sdCEXT84GFC27n/THpmRSp/37aWlN51kMK1j8moGBiia0PzNCsvPvIUzaIasPZ8GoNWvezSRo4GFLO3S3AgnFj/bc7YiTHjMBR/AZgBz06yOqHLqUJeXHqeKs26EopOplNveB+32w9v3ZSBRNJ+wRb2NDKQFeb8o7JLlQNqBqn1svjwyI9szDxIs9ASv+09lyr6qWiO4AyPfPSO9ztyzm9rxraYuqHyPtrkQKwURcKnn52gVbrjA7DlaTPzXqL6eXbWNW/Pcfa8PJeP+oSwpG8kniT1CFL0WNUqtsG14xdik2/2RUfO+G3YsS2mEBLMr6KSipdFDTB62yWXRQ1w6tNvkDb3tsCvENapBV3f+CNPbC9m5qKzhFrd/5XXWtRK5UM4rWlH1aDmCzshZgAqWxDyOSqmZdYcIWHCRvfMaoUnM8j41nP3ieDrG9Hx/YcYYgvng7mnaJDjk9m3UtTLqoksqKDwgBF2zV1jz58UgbnjhwjxAeUO2nqTPscKGLcp23nBcuTtO0GD0TeiBHm2MacLNVJ3UA8Mvx7ixvWn2dg2lJwQzz4+nQp9j+QzeX0WT36XTsfTheSEKJyNNLi1OC0yCITkWh0pklm0OyBCC9dMYSeZB6PYv6dk2eHT54RpP2XR+rzry5ArqEXFIAQRvTw3oStBBuoO6oE+7RS91hxnTec6FAS5/qPbIMfGpA0Xee6rc9y57RJtz1sJLpa0zChm+K5chuzOxWhTORUdRKGr7ZZ+94XYRsruipF8/EDNenicNS2Y0Nx4pHgGPy2jLP8+Rr1c95YCuuBgom+6iQaDBxLWLwIpXArTWylSlRz/YAmbUrfz+KRm5AZX/Va0O1vEhI0XGbA3D73q3OynCth2fShf94rgpw5h7tq1V6Gqj/p7k6bmCDthfF+EMg/wWyitFheszPr0hMvlwzt1pJkphkYjR6ALLbE6FheeIT97Z/UHIyWnPv+eRds28/fxjR0WaXjJxh9WX+D2tFw83UhMD9ezoks4S/tEcD7C5WVUMUL+l2Lji0xe4IJLoPYEvrAlgiTTY8CbgGteRV5i6K4cnvvKuZdbeMcOtH74IeoNcBwWLDdzI/Zi99fpjjj/xQYeP/4Ly7pfi9FnsEmmrM8i5teLGG1OFC0EwY0aEdysKYregDUrk/xjx1GLyp7ukkKw9foQvu4Vwbr2Ybh0VkFwBin/yoSUeQjf7BBd6zqQKclkOxtwfizFB0xbm8mU9VmV3teHhdH60YdpZjYhlMo/eZs1i7ws7fyEzq3axtCcjZyI0HF9hpXnvzxH23OVPweENGtGw2FDib7xBiJ79URXLpyZarVyYf0Gjn7yKTl791Wonx6hZ1n3CL7tEU66a7P4WhRmYE52HMvNCwSusJPMI5ByDuB5HguNeWHpOQZXknIlvFNHuv7rTUKaubZ9nn9xG8VFLvo4u8Ch3Qd4ffm33PfDWYIczNKKwUDDEcNpZo4hsls3cGGbXqoq+19/g1MWx0dADzc08sf7r54WslO1MUIFFmC1Pc3UJdq98EoICKfwMlhMOqSciZTPEWBfvMh8x5ssjUaOoNPL8Sgu+l8DBIe3p9iaAS6ctnGFNl3a8Z5i5OBPc7DlXAt4aYiMoGnMeK6LnYCxgXtWUaEodHjurxSdzyDDQXTX1Fal4/4pNyPl7Qj5AI5P+CvAFIL0Y0gwv45Ovos52X3zkosE1gbN4rH1UPkGKZ4nwEQNEFZYUYTNzDF0fvWfbokaQNGFEhRS9dlIdwnr1IIObz+AoX4khsgI2j39JLd8/y1tHn3EbVFfRQg6PP8XFAfRXTe1Drvyz2PEJm0izvIGe7u0Q4hhIJIBR8KNQsjXUdlJgukOzwblwrC91bDbJIzvhVAWAa38PZTKmPXpCVpcuPZZNb5jNJ3/OdOln3VHSLWYnAvrkGr1zH/lsV8qok6DfgRFNXRe2EX2vPQyZ5ZeC2xZZBDc83grrHoBUs4hLmVahUoLJkajKzYBjwGV+e8uv7z+TtNssATKjJ0YMwqh/EQAixrK+ilH9elNp5df8ljUAEIxYAzTPiqYLsJIYXEadpsbR7qc0HDY0DJ/b28RUiJqAIHjwNmTFmYRm/wpscldUegLfAqUP0E8FJVtJMW8z/xJFdMveIj/hZ1kngxiKRDmtKyfselKPsigunXp8vqrCA/C/5bHGNoCRa/9S5eqlbzMX7FZ3U/85IjIHt3LWHo2tC3lDayI1U4bMCenEpv8IMbipsCDwI5Sdw1I8Rh66yESTTOwmKq9I+5fYSeankHKufjAeUkLCoNKhN3+ub94vmatgCCkTnuN2iqLlHbyLm6luLD6Odf14eHoL6fhk0Kwvv3Vc8/H3Yr8NPaLi5dn8R6lZvErJ27qA++h8isWk9v56EvjP2EnmJ+gZNMlcNb5TrgQpqPerf0r/CxXF72xAfogrxzyAamSn70Da8HJajdliIoEYEfzYDLrXJ1UV3rc4JVZXKEZJbP4FTt3b1TWkmi2sGDc9Z407R9hJ8Y8jpABcdLCHS5GBNH2yce90nZIeAe89x2XFFxKozC3YsxrdzBElhxMXtux1NJJiKWVFHcdc3L25Vm8V9lZXJrQ6dJIMMcza1qws2ZK43thJ5n/CKLGiRqg9e3DCWvtnRDQij6MoFBtzX/lKco7REHOXvBwd1sXHIwUgnXtrwq7gCLjj1qND7g2i9uCrsziexHyJULy9pMYM9XVZny7DLCYbkPlB/zs8+Epewe/ToeG3ott7i3zX3mCgpsSEtkFdz/+zZOmsib3ME9PbHrl0lfEJt+l9fgqYDH1QcqpSDEF2IaqPs7ERTuqquK7Gdti6oDKEmqoqG+u196rooYr5r82Xu0DwFp4mvyL29ze9Sy+lM133cOvXRDiC42H5hhzcioTUmZQENYU5H9RlLdINM/BYqr0Cd43W+oWUx1UvgSifdKfFxjfvJ9P+jGGNqe44CR2m2fBblyluCidvItbCI3qhagq624pLlnz+anD1QBAKkIu89oAHTF9diGQDCSTOKETdu4jyXyKhucTGby6jJO8b2Zsu/wP4B2blo+4u5mvEmIJgr1k/iuPzZpJflYqUjo/OGEvLOSHpnaKDFeXL0cwJVffjugpsUl7iLO8QWjBYtIb9GDulDKbAd5fYyeYJiJY4PV+vEjXyObsHPm2T/vMy9qCzeqbXKA6QwRhUb0RSuWrxJy0NPp9/xx7mpb2GRHJWI3TmTrP75GfyuPdGXvx2HoI3vdqHz5gdJPKU9p5C++a/8piL75EbtYmVLXy1DF7T+4rJ2oAaSKocDUWk6Zh47TAu2tsq+F1kF7aefAdvaJb+rzPEvNfc6z5x50X1gDVlkde5q+ERfdB0YXyc8Z+Vp7fxdG8dDZk7KsqklRfVFawYOLtTFpY+SkMH+O9KaHEW28z/t6214CdI9+ma2Rzn/frK/NfaS4UWxm741t25KS7W3UtCsO86WPtDt4TnaK86NX2fYRRMdAhvKnzgl5AKAaCfWD+K009QxCLug2nW5167lYdiCpe9caYPME7wrOYOiO5xytt+5j24U0wKP4LvxIU2hyd3rd5ahoEhfB1z9H0i3T3VJ58AovpNuflvI93hC3ldGqQc1NVNAyO9PMIBMHhHXzea6TeyJLuo7gt2q0QyAoq/9bC7bS6aP/wKBEkiTjN2/UTV7IF+IqMohy2XzzK7uyT7L50gt3ZJziUe45/t+/HsLq+XeeH6vQkdhvGpF3LWZnpsndgN6SIA+Z7cWhO0V7YCeM7XHZD/E3gK2GvTd/D8zsW8vOF/WVSUl/hbwc3MqhvMwxVhHXwBiGKnsRuw5m2ewXLMo65VknKJ/CzsLV/l4Tiqy06n+ALYa/L2Mvtq15mfcY+h6IG2J9/kc9O7/H6WBwRJBRmdxnCnVXkii9Hbyymzl4cklO88PUXNd5u7Wv+tfcr7C44JL1+NJV0q+tJR7UkSCjM6TyECY1cDKppF34NcuSFGVtWzKFcg8mxeV9IJ/Jd2zq/aLMy84j/0pTrhOCjjrcxsbELviyKvMX7I6qie81bVNX1VOXJLvkV2K95v14ip9j7wm4Z5nqYhAVn97HpktcDKVWKTgg+7DiAPzZzstKQdPLNiByjvbAnLtqBkO+Vu2oDvkaIkQg5hxrk6Zdj8/4P0NjrbnS5rCrhmf0bsFeyFvcFAsGb7W7mT9d1rbyQ9F0wfkd45xF7QsqToPQBeR9C3IHV1ozY5DEEF24A8bJX+vQSF4q0i81RGTHX3UQrN2btbbkZzDtTMVikLxEIXmvbj4ebd6usgFtnFLXGe05QsUlbgC1lruUHP46oWU5R+3POeL2PYJ2B93pN4+51b7pc5+XDmxjToCX1DP7Tj0DwSpt+1NHpeePo1vI3/RIX+wq+2yFack8UdiURCHFaNoAoVIv5c9vh1NF7V0AdIppyyZbPLxcOuDguO3lqMSPqtfDquFxhQFRTghU9q7PKeAAeJCXtE3+NyXfW/sKgR/H/0TCPctLtzfFB8k/gzR6TuceNkzqzT+9le642kZ6qy+MtuvNS61Jjl9J/5ht8JexPHjCgyD/7pK+q8Sjaelp29YPNuIJe6Ei65QmXxW2Xksf3rfPrg2RpnmjR45q4Bev8ORbfCDsiy4SkiU/6qpxD4NkRtfUZvntQC1L0pPR/ir90P1rfHQAAGIJJREFUutul8ltz0vnfaU0DlVaLJ1r04E/XdSlG0SCQTjXw1VLkAR/1UzmSJxFiq/OCFVl+bgfShylUdELh9e6TSLz5ceoFhTst/4/DmzldFDjHDl9te5MuZ8B0v/oLeV/YFlNjBNUKMKgBK4hL/pJiw05KUka4xbnC7KqORnmNCS1uYdeot53auXPtxfzl4M8+GpVzFIRiF7oZ/h2Dt1GJwb+JUlUU/gJwOTWbR/kHV5zTIIWdBzQOjmJR/6e4t1XV/vtfpR/luwu+OR/pIj392bkvliKjfNBHFYj5mJNTS13w6KFm8clfNRqPe1hVG9M2fsScI45jq5fmmQMbyLf7N8/6FST4b98fbws7Pl4B/OkMU4AiXyxzRXom7DXn0zic69v4MBeL8xi55hXmHnUuaoAThbl+dZIqg+Azf3bvXWF33t0FiHJazlsI+S7m5LK/z7pK0ko4QSKZ46LAtOBk/gX6L3+RVefdWzl9emoXG7LPemlULvNjdKMRvonrVwneFbYq23m1/arJoNj4RoWr5uRTeLjOnnN0TaUHAbTkYnEeA1e+RNol9+3nqoQ/71lDnt13IRvKcVAvdFP81fkVvCtsqXgUjV4j/llpHm8hv/WkwWN56Sw55f219su7UjiS5/kS9VhhDi8f1i7zrxucUFVlSJ1GQ/0X0+8y3hW2ovorYdIxInI/rvy28r2nDb+8K9nrs/bXp1OdF3LC/53aw6pMn5oot6uqcmvdpsMCwjTj5RlbuKYA4dlWd+X98iKjv608EJ2QawGP4vTuzD5OyslfPB2ZS4hqpNi7gkQyY/9PXLT5IjCTsOSr1lsCRdTgdXOfPOq0iJAfoIrPNex0J/u6VL11XhKGa5WnHby8K9mlM4qeclfTvpq0c7wwl4f3rvHmrqkKvBDZaFhs06Zj8p2WLs+yURXT/WqEl5ciYgOV7/QVgbyXCSkzEFI7PxLJc8THu6A6+Z2nXaRdOsm/9n7laXWn/L1LDO3CtXlLvsk4xscnPXpWdkamEMroqMYjXhHCxV/m0iSYJnKpzkUSYv7rhbF5Wdjm5CMgLA7ubAOlH7EpcwEQUhuToGQdccnfuFRWER49QF7hpV0WdmefqE4TlRJhCOGn22fSv742EaBeOvQrm7U9J7kT6BvZaJhnzypJ5sEI5gLBCHGfN8IQe3/nUZH3Ae9TksPvByRTyY6+kdik7VfLSKGNF78i/upy2ZKkmx67xRWpxdy/6WOvLUkaBUey9vaZzLrxIbpFVu8wgVWq3Lt7BWe0cZRaVqwr7B/VeITrSUtLM3dsQ6SczzU3iyDsquZmYe/noDEnFwBOkiOKYE9TtJViKRMs692qIcVihPQ4sMvGCwd4NW0JL3YZ72kTVaIIwbRWg5jWahDbLh5l+dmdrE7fzfJzOyly0059qiiP8Tu+59tedxCp92xpK+GDqEbZTwph9ujABvHxCkG7FwJlw9cqOucujG4SGGF+pVrdlNN2VPVvHlRbXM1+eXl3Mj+erTIzmyb0jGrJn9oO42heutuivkJaXiZxO3+kUHVblzYh5aPRjUfM8FjUAB3S/goMqXDdbtfcryQwhC2E+0/UZRuYxcRF7j8hxS3aSskBBI+xS5XYn9/jaJ7bgdLd5ult86q9rt+QfZbYnd+7bAaUcEZKdVhkk5H/qVbHCeN7IeRLjjsxav6wEhjChuxq1M2l2PZ3j2sLuaQafQOQac1lwoZ3KfJi5oFMay6zjnhsoSzD6qzTDEtdysF8J2+75Ds99IxuMmp1tTpcNsp4Z9MbFumFLggof3hijzdSfASGsIWszlH9t5iy2PMYCUJUezkC8GvmQZ7aNleLphyyK/sEVlU7l9QDBdkMSv2Cd45vI1e1lf9GbhZS3BHVZMSo8MYjqr9MuFTn3WC9odVnN/6JEF0QfeqWSQT7Q7Xbd0BgCBvF05+iU1iDq5enLq3LRkCTvecPD3zvNQ/AekHaZzXItRcfmHlo87hmeSJcSNkPGCJVW8uoxiNuiGwyXJvkpEnm8cCfvzi5iTub9uGpDmPYlHnw2n0hvtakn3IEiLDx7LSsEH+rdo7B+HgVIROq1UYpHk79H7u8YN/uEtmcfvU0s4qdA/kECl2JS14i2o0uimwy8teoxiNWRje9w8Ug2C6QENscKT8FsEk7ey+donNkM7KsVz+yA5gtKzTrrxSBIWy7zhNh/8KezvO06V/O1qQdIM9WxF0/vUGGF0KjJd78OC1CqxVIaw9CPEBBWEtiU97zaoYviykIYbcAVzdfghQ97+4rs3/2AcI7+/2BIeyJCRnAXjdqqCjMcG3r3JX+F+0GNDt6ciTvPOPW/0vTNTFAy7AGbB/5Fo+0G0mY67boS8A7KPQjNrkzEyz/dzknuXdR+Qi46cqfo5r04kzhRTZlXjVCpRNSNMdb3Xt/g8ZVhFyBFB1dLPwxZovWjtHzAW28j4Cf0vfw+NbZfNTnD1o1CUCUIYx/976PV7rFsSY9jV8vHOR4fgYF9pLJN0xnZPX5NI7mnwc4i7G4E2O/uKjpIJyRaJoB3H/lz0hDKP/pfR8zts5GEeKy26/8B3d/6bWIn4GT2SshZghCLHehZDoKHTEnZ1a7T4upBVJORYoJQGdKtj81PVH/YZ/7eajtCC2brJI/bf4/Pjn0Y8kfKqOYmOyxs5cn3Pj9c/eE6o0pq9N3X30fU/o/SZPgaML0wRTarZg2vHP8hP5Y+ypdi6tJ4MzYsSkrSTLtx1nsbMlz1RL13ClhGArHIbgXlcEgvLocm7FlNh3CmzKkUSXhdjXk/f3LrolayjlMTPGpqLGYWv2adfD/5t/0qK6usQ6LT27k4XYjaB5an1uWv4BdqvSv34E3u0/5Pq5lf6+JGgJljQ2UPETI152U+oF9XWa53XZ8vILFdBuJ5s8JKjxz2bNsCD54/TZpx7zhXQ54ORzxwmPreHLb5SWr4CRq0BNe7bA8FlMdVL4C6s8/9hMPtBnK3c1u4G+dxhH783tXncXWZ+xbG3d9/we9PZzAWYrA5RyRppXAIAd3T2G19WbqEtc3DBaO74LQmRByCtDaaXkv0rpOI9bdPpMmIdoHnF12Ziv3rHuT4hIfEBUphxOX4hUzWqUkxowDsQiggTGCHwa9gJCCO9e8xsmiqz+wRahqTyYucsdQ4BGBsxSBkll7gWEcuuJvgX6l7uxC6sYwNdm5qC2mbkhpQopYoJ0GXoOacDj3HCPWvMKa218mOki7o6C/XDiAecM7V0QNiH8Rl+xbUQMoYgUqOUB496jr2Z55lEc2fUauLLo2fQr5mi9EDYE2Y1/BYtIhxXik7AhyD4pYWqnNtSS98c1IeSdS3A24aFnxDwMadOLbgc+7Y66rlJ3Zx7lt5UulNzy2onCTV+3TVdD4iz/8p0dEy4c3ph/AKm3kU2oYknXoGOKrsQWmsJ0xd0oYxqLbkdIEjMGfQXk8oH/9Dnx72/OE6z1P7rDn0iluX/UyZwsvW/JsUiI5i+QEQpwDuQ3ERvILV/HgV9X0nqyEuaYWCHv9zlHNb7Xa7ebzRZe6BOn0QRnFOaHllHUcq+0Gt5aR1aRmCFsiSBjfDaEbjiJHIRlIoC2j3GRAg058OeBZogzuL0u2Zh1hxJpXSC8q5Ttm51HsfIlib4QUzUD0BvpTYpv/CeRcsvKX8piGJrb4eIU2uwaWZAiTx2l+IZUzDYai8AVw5ScpDam7g7jEo5r16wKBK2yLqTF2hoEcjhBDgcb+HpLWdI64jm8GPkfLMNczx60+v5ux6/7FxeJSLjJSfk5cyv0OK3x2VzhG4xiknAZ0R4h/E8R/MCdXx1W4aiymG1GZBhzBFvRJpYGLvEjgCDs+XqHz7n6o4h6QI4FuBNL4vETj4Cjm3fQoQ12wc886soo/bf6/8lv1q8iOHsGDnzp3Bp8zoT0623NIcQeIV7gu/UMGrw6M8Kwa41/hrBqkJ73BTZetGDGUPwv3O0EgmNF+NPFdTUQaQivcV6Xk2e3zeXtfhZAPR1D1N172tXGdheM7YhfvA01QxHQmJVc/9FSA4Xthz5oWTGj+WCRjL8/Mmh/krKlEB4XxaLtRTG81mJZhDZDAnksnmbbxw9LOQ1fIBOVWYpP2eNzhfNMEpHwfeJdDXd/SzKksAPCtsBNNDwD/BP+mI/YbErBL0Amn73wDYwRZ1jxs0uHZ2QwUhmFO3lbtMSXENsdmn4+UWRAyqdr+7d4iPl6h3f5IZGEYIjiPA+2zq/oi+k7YJaL2W0LLgEGlRNwKJQJ3nyOo6hiPDi9XxicPGAjN/Ajog15/J3GJpzVr21PmmlqBOhohBgE9KNk5Lu2gZgXWYbXew/0VvQR9KeyVwGCf9Rfo2GXJDK4I1z1WBN8hmIo52TtH4ufGPIdgOqoYzL3Jvs8mZTHpKJQmBA8Bt1K1Pk+jk0Mq28n0pROUT7ZSaww6UTL/qIDN6bb/KZD3YU4e7TVRA0xNeQ3BRyhyFXNMvktnJxHMG2+mSN2HIAEYQFWilvIEiNuq2p733YxtMTVGsgnJdT7rs6ZgB2SFtbcdyc8IOQdFLLgcUcs3zI15FsEkrNZbHf3Ma9uXqQUwGyFd+zUX8iiqcjtTk6sMsebbh8cF41ujU1KAXj7tNxCRXECQAZf/r6JglwOAjRjkOxQH/+yPjY2rzIv5EGiNUdyJOdnz6E9VMTfGBHyMwLWglC6KGvxh7rOYgrCLxxDyL0C1TqbWILYgxBMImUGhLYPDPTIcPtEvjKuPvXgpcIT8utNd2nTxFqsG6TlZ/xuQ25my6FlN2/5glJHosE+BqW7U2ocqhri69vffBs1XY0LJDzEh5b2UrKlqtO9HFRSA0o3YJNdCqVlMIRSRhFRzONxtil9tywsmRqNatyHlA0xd5HF6kzJYTHUokouA4S7XkezFoB/ijrUmMLasLaZIpBiMyo0IOQxED5DVDVQZKDxLbPJbbtWYNS0Yfe63ILcwZdFTXhqXa8yLGQAkYRO9mZ5cvTx788Y1AWUZbmXtFdspZhj3uffQHBhHw8zJ2dh16xC0APr+hkS9nezo99yuNX12IUZxD4JxzB3vu5PAjpiS8hNSfo6e6mUeSIhtCso63EtFnYqR290VNQSKsBNjxqHYdoGc5O+haIgdhfs9Xiebk7ORYjrwf3wypqIDiS8JVmaC2oH5MXd6VN9iisRm+wb3juelYhTDPT247V9hLx5bj4SYhZfPyjXy61i0piQrcPWci6akrEaIjYQETddoVJ5hTrYilT+D/Ddzp7jnQP7JmFCK5Ne4t/xYjzDeXp1oBP4TdpJ5NFb9doSI89sYvMdBQoscx4J2F6G+jRBOMkL4gKnJa5DiZ0TBMy7XiY9XCDUmULKL6CqrMTKyuqZO3wvbYqpLQsw8pPwG8N3ulu+wgjKRMRodx5q8+BfAwDxTW03aqw5S/BV4hLljG7pUvs2uF4G73OhhNUYxBnOyRzk4S+NbYVtMnVHZjBCTfdqvLxHyeWKTNE7IKtcj3Zr1vMPU5OMgExDK007LzjMNA150o/XvMIrRWogafCnsBROjUfkOaOXlnvwYb0EkY055R/tmxV5Qvf2+uYh8FSnuL7FyVMKCcdeDTMLVcHGSpRjF3Vq6DfhO2IptItDciz3kAEfR2jYvXE6cvp6C0KleCYsrRDFCBMYG1pTFZxDMwVbseN0fH6+gKrMBVyMDpVBQ16R1WAbfCVuo3ppJ05DiGSTrgZaatizYh3Qpsfl27IYxXgvPK6VEysAwzQIo6vsgpju0kLTZ/RSOI3lVRMokrsuI84brgA9nbDEX2O60nCsIziDlxwhxKwrdQb0BwUhN2r7G+0iXHm43EmQb4o0EQVcRsiMKB7zWvrtMWnwM+AlRUPZZab6pG8h/uNjKHIKVSd46TOw7YZuTcwkpGoAUrwHu2icLkKwBZiJlf/Z0uY64lD9jtmzALv+LEGYNR1qEZDpSHAOcJX75GoWhjFtyQcP+KyJFD4SizaSgHR8AjyEvL/3i4xWQn3AtnkhV/I9DXe/zmtcg/vIVsZiCsHErOtkXKdoDDYErYZEKQJxDqGdQxV50pAFpDtdgieZ/gdTSl+IcUo4jLmUDiaa1lDhnOcKGFDPZ1/kVrzspzRlbD0V3EKNo6lOfbFeYZ9qJYn+YSYvXMs/0wGVhO+MTDnV9yNvvm38eSEpEuvLyf56RaPqzxqLegdTdXSpiUWUHjlNReBCzxTchC4QSC3wdcKIGkHIeqjKROWN3g3zFhRofMTnlEUSK1y1XgfGk7S4JpruAf2vWnuAbioMmltntEnIWUrxOya+aHViLEB9itiz2VkIgx2MTUxB4nqDVmxj087HZtiN0Bpz71r/BlJS/MsUXAwsUt1V3SDL3R8ofubZ0qQ4SeJUJyS86FOv8cdcRpKuPNeiwX06zzB/XH6nMwyjaeXM9Wi3mmX4B2ZeqbdYlovYhNWvGtpjaosolaCPqDJDTiU35mthKSkxefBI4qUFfniF1byB4IWBFDSAwIqsQtRAvMTl5pg9HBPjbu88dLKbGqPyANsF2llNs705sileywmrC3JhxQB0Odkn091AqZV7MIKSsymvvGX+IGmrKjB0fr2DfnYio9nZ8JkI8g9kyy6frZHexmOpQpL6JKv8U4GHH4iu5LhE8yeQU9w9ZaETNmLE7pU1BcFs1WrCDmIWq78wEy+cBLWqAIvU9pFjJvYtcSQ/oH+bF3AIOPxMJ4jF/ihpqyoyNNHlaEfgSVf2bpiHBvMm88fcAgyi2BnqICkf+5ipC/pHJKZ/7fDTlqBnClrjrg1EILEDhHczJaS7VmDslzO8BGeeYmoH8L1I6jEcXMMw3dUbKYeWu2hHyfiYv8loaaXeoGUsRVX0JgbNEiQXADyDvQ6Exscl/cFnUAKLgBmaZ/Jc1Ye6UMBS5FMm7TF200W/jcAWpPkJZU7EdIacFiqihJtmxr2TUVWQ/VBoghETIDKQ4gJTbKazzi8vedXOnhKEv7EdO9E88+GmxlLK+boH5P2oQU/2ScSs+XqHN7kUgs5iScl+l5WZNC0aX1wQddZF2A3ZRB0XRI7GiIxuVbIrJ9uRUt8t8dlc4QUEngYjLV6xI4piasthrfXpAzRG2BjRZ+uDAMwVZU0BOoCTg/CoU7jI3uvkNy/H1gimLHvLLwObFvAOiD0aGkdbFRpvdrRH0RFW7IZQuIK+nxJfd1QPPWcAuBLuRbEORK5m0SBvvwHmmR0Be2fW1gpzAlEVfaNK2hvz2hT13bEOMuilIcd8/uk3o/O6+b8i0Xjt91Duq1YFD2WejsvMKunh1pqt0fDFPochHQUkA+iLlTTj3KvSEA8ACpJhVcsTLQ+aZdoLsChQhpYmpiyrkDwkEfpvCXnJPFEX6u0DEACMBA8CdTfvwfq9pzNg6m69Pp3Jnk978dCaNXFG0zD7BcofPxrdgfDtUZTSoDyJEx6uun76hGCETEcQzadFht2rOH3cTUvkZyENwN5N9nNbaDX47wl4Y16h5nYjxJ/Iz7wCGAkGOig1u2IUXOo8nRBfEmJWvky3zsaGCELczwbLKe+Mb3xG7mFCyDBKdvNaP6xQi5ZsU1PunyydY5sW8AsxAiruYmuy5Z6YPqBnmvsqwmDoj5ThUMQZh6/tKt4nKHzZ9XD5dHAChOiPmFjczo/1oNl84xFOpc7mkFlz7aks5CtBW2J/dFU6QcTLIP2K/Ejo5YOaSYIT4OyGZI5lrMrm4PBmAKoZxb/LPXh9dNal5wk6c0AZhj0OKCah0hWvB0g/knmHjsFd5fMts1qSn0SQkmuGNujOl5UB6Rrfk54z9/HnTp2zMOIhUKKcx+YtmY5xv6oZU/wxiMsjAzoomuBHkBuabRjE5eWel5eZPioCCp7h3sbahJbxEwEwfLpFoeg14GgdfyGCdge6R1zO91SCGNOoGQpBemM2RvHTqBoUxfv3bFNgdWvKswExik11xlK+a+TF3lgSVkf2r3ZbvSUfV3cq9Sfv9PRAtqDnClgiSTBe5Zj+9ikDQLaoFhXYrNqmSXniJHFvJgZPH2o/iupB6PLt9fvlqecBiUP5JbDU/zLnj+yHEGzj2nahJHMZm68P0Ly76eyDVpeYsRQSSBCYimA9Elb4lkey4eMxhta1ZR+kTfTXI53EQq5FyOaFFX3C3BtvWn4wJRRF1sMt/IngNRNkvniIUJJFlK0lR/jVcxkEsDungmohClJuUJJEIUXYnWZURiPK+0jIcKsQoqUOJ5Sganf5N4AEHY6tR1JwZ+woWU13s4l6QdyPojePMvhI4imAnqtgx/+ZHoyf/+sHbmJ3nLqnlt0HNE3Zp4uMV2u1ojkEXRsmpGiuQDqQH9KmTWmqppZZaaqmlllpqqaWWWmqppZZaaqmlllpc5f8BMDC0ZEVbYc0AAAAASUVORK5CYII=\'/>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="bb-error-image-construction-container" ng-if="bbErrorImage.errorType === \'construction\'">\n' +
        '    <img class="bb-error-image-construction"\n' +
        '      src=\'data:image/svg+xml;utf8, <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.13 205.14"><defs><style>.cls-1{fill:#5e5e5e;}.cls-2{fill:#d56c27;}.cls-3{fill:#e9ac8b;}.cls-4{fill:#a78d82;}.cls-5{fill:#a86d52;}.cls-6{fill:#fff;}.cls-7{fill:#9aa9a8;}.cls-8{fill:none;}.cls-9{fill:#dfd41f;}.cls-10{fill:#e9e062;}.cls-11{fill:#827674;}</style></defs><title>beaver</title><path class="cls-1" d="M229.79,325.41c3.41-7.68-4.16-9.53-17.64-15.92s-27.33-12.63-30.74-4.95-0.42,25.24,13.06,31.62S226.38,333.09,229.79,325.41Z" transform="translate(-55.06 -145.74)"/><path class="cls-1" d="M134.26,306.77c5.87-5.56,10,1,20.24,11.8s20.42,22,14.55,27.52-22.8,8.1-33-2.68S128.39,312.33,134.26,306.77Z" transform="translate(-55.06 -145.74)"/><path class="cls-2" d="M239.56,243.9c5.38,3.87-25.83,19.06-35,13.32s-13.77-14.95-10.26-20.57,13.8-5.53,23,.21S234,239.92,239.56,243.9Z" transform="translate(-55.06 -145.74)"/><path class="cls-3" d="M217.34,214.48a8.6,8.6,0,0,1,1-.2,15.84,15.84,0,0,1,2.59-.16,23.85,23.85,0,0,1,7.3,1.23c0.63,0.22,1.26.43,1.87,0.69s1.2,0.52,1.76.8,1.1,0.58,1.61.88,1,0.63,1.39.93a16.06,16.06,0,0,1,2,1.65,8.69,8.69,0,0,1,.71.76l-0.09.29s-1.28-.37-3.19-1l-7-2.2-6.94-2.33c-1.89-.65-3.14-1.11-3.14-1.11Z" transform="translate(-55.06 -145.74)"/><path class="cls-3" d="M219.52,214.42a8.58,8.58,0,0,1,1-.37,15.84,15.84,0,0,1,2.53-.59,23.85,23.85,0,0,1,7.4,0c0.66,0.11,1.31.22,2,.37s1.27,0.31,1.87.49,1.18,0.39,1.73.6,1.06,0.46,1.53.69a16.06,16.06,0,0,1,2.25,1.3,8.69,8.69,0,0,1,.83.63l0,0.3s-1.32-.15-3.3-0.41l-7.26-1-7.23-1.14c-2-.33-3.28-0.57-3.28-0.57Z" transform="translate(-55.06 -145.74)"/><path class="cls-4" d="M133.57,312.67c-22.7,9.62-65.39-33.85-76.49-56.81C46.31,233.6,81,215.53,102,209.59c23.69-6.72,33.66,14.9,43.61,38.38S156.27,303,133.57,312.67Z" transform="translate(-55.06 -145.74)"/><path class="cls-5" d="M132.83,311.81c-23,8.77-64-36.3-74.29-59.66-9.95-22.66,25.33-39.42,46.41-44.57,23.87-5.83,33,16.16,42.13,40S155.81,303,132.83,311.81Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="9.57" y1="88.86" x2="65.2" y2="150.45"/><path class="cls-4" d="M64.62,234.6s1,0.82,2.76,2.32,4.17,3.66,7,6.35c5.71,5.33,13,12.76,19.92,20.46s13.61,15.66,18.33,21.89c2.39,3.08,4.29,5.73,5.61,7.61s2,3,2,3-1-.82-2.76-2.31-4.17-3.66-7-6.35c-5.71-5.33-13-12.76-19.91-20.46S77,251.4,72.25,245.18c-2.39-3.08-4.29-5.73-5.61-7.6S64.62,234.6,64.62,234.6Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="22.79" y1="80.97" x2="75.88" y2="142.74"/><path class="cls-4" d="M77.85,226.71s1,0.82,2.66,2.33,4,3.68,6.72,6.39c5.48,5.36,12.42,12.82,19.06,20.54s13,15.7,17.44,21.93c2.27,3.09,4.06,5.74,5.3,7.61s1.9,3,1.9,3-1-.82-2.66-2.33-4-3.68-6.73-6.39c-5.48-5.36-12.42-12.82-19.06-20.54s-13-15.71-17.44-21.93c-2.27-3.09-4.06-5.74-5.31-7.61S77.85,226.71,77.85,226.71Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="36.65" y1="75.54" x2="89.74" y2="137.31"/><path class="cls-4" d="M91.71,221.28s1,0.82,2.66,2.33,4,3.68,6.72,6.39c5.48,5.36,12.42,12.82,19.06,20.54s13,15.7,17.44,21.93c2.27,3.09,4.06,5.74,5.3,7.61s1.9,3,1.9,3-1-.82-2.66-2.33-4-3.68-6.73-6.39C129.93,269,123,261.51,116.36,253.8s-13-15.71-17.44-21.93c-2.27-3.09-4.06-5.74-5.31-7.61S91.71,221.28,91.71,221.28Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="50.95" y1="71.26" x2="92.68" y2="122.54"/><path class="cls-4" d="M106,217s0.82,0.66,2.18,1.89,3.26,3,5.46,5.21,4.69,4.84,7.28,7.73c1.3,1.44,2.62,2.95,3.93,4.5s2.64,3.14,4,4.73,2.59,3.22,3.83,4.83,2.46,3.2,3.61,4.76c2.3,3.12,4.37,6.1,6.09,8.7s3.07,4.83,4,6.41,1.41,2.52,1.41,2.52-0.82-.66-2.18-1.89-3.26-3-5.47-5.21-4.69-4.84-7.28-7.73c-1.29-1.45-2.62-2.95-3.93-4.5s-2.63-3.14-3.95-4.74-2.59-3.22-3.83-4.83-2.46-3.2-3.61-4.77c-2.3-3.12-4.37-6.1-6.09-8.7s-3.07-4.83-4-6.41S106,217,106,217Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="8.37" y1="115.53" x2="75.88" y2="74.03"/><path class="cls-4" d="M63.43,261.27s0.94-.83,2.64-2.2,4.15-3.3,7.16-5.5c6-4.46,14.21-10,22.64-15.18s17.08-10,23.76-13.36c3.32-1.7,6.15-3,8.14-3.9s3.16-1.36,3.16-1.36-0.94.83-2.64,2.21-4.15,3.31-7.16,5.5c-6,4.46-14.21,10-22.65,15.17S81.4,252.68,74.72,256c-3.32,1.7-6.14,3-8.14,3.91S63.43,261.27,63.43,261.27Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="24.13" y1="132.18" x2="84.01" y2="89.26"/><path class="cls-4" d="M79.18,277.92s0.81-.85,2.29-2.25,3.61-3.36,6.23-5.63,5.74-4.84,9.14-7.5c1.7-1.33,3.47-2.69,5.29-4s3.68-2.71,5.54-4.07,3.75-2.67,5.63-3.94,3.72-2.52,5.53-3.71c3.61-2.37,7-4.49,10-6.25s5.53-3.15,7.34-4.09,2.86-1.44,2.86-1.44-0.81.85-2.28,2.25-3.61,3.36-6.23,5.64-5.74,4.84-9.14,7.5c-1.7,1.33-3.47,2.7-5.29,4s-3.68,2.71-5.54,4.06-3.76,2.67-5.63,3.94-3.72,2.52-5.53,3.71c-3.62,2.37-7,4.49-10,6.25s-5.53,3.15-7.34,4.09S79.18,277.92,79.18,277.92Z" transform="translate(-55.06 -145.74)"/><line class="cls-6" x1="41.54" y1="147.98" x2="90.35" y2="105.87"/><path class="cls-4" d="M96.59,293.73s0.62-.82,1.77-2.18,2.83-3.27,4.91-5.49,4.58-4.72,7.32-7.33c1.37-1.3,2.8-2.64,4.27-4s3-2.66,4.5-4,3.06-2.62,4.6-3.87,3.06-2.48,4.55-3.65c3-2.33,5.83-4.43,8.32-6.16S141.47,254,143,253s2.42-1.43,2.42-1.43-0.62.82-1.77,2.19-2.83,3.27-4.91,5.49-4.58,4.72-7.32,7.33c-1.37,1.3-2.8,2.64-4.27,4s-3,2.66-4.5,4-3.07,2.62-4.6,3.87-3.06,2.48-4.55,3.64c-3,2.33-5.83,4.42-8.32,6.16s-4.63,3.12-6.15,4.05S96.59,293.73,96.59,293.73Z" transform="translate(-55.06 -145.74)"/><path class="cls-2" d="M170.34,186.14c28.5,8.72,57.22,78.53,47.33,110.86s-47.4,36.28-75.9,27.56-43.58-42-33.69-74.33S141.84,177.43,170.34,186.14Z" transform="translate(-55.06 -145.74)"/><path class="cls-2" d="M223,187.66c15.25,16.27-4,42.7-27.66,59.84-20.6,14.92-47.63,13-60.67-4.63s-7-44.24,13.44-59.34S208,171.64,223,187.66Z" transform="translate(-55.06 -145.74)"/><path class="cls-1" d="M228.93,203.15c0,6.59-9.82,20-21.94,20s-21.94-13.39-21.94-20,9.82-11.94,21.94-11.94S228.93,196.56,228.93,203.15Z" transform="translate(-55.06 -145.74)"/><ellipse class="cls-1" cx="130" cy="40.47" rx="6.14" ry="5.87"/><ellipse class="cls-1" cx="147.87" cy="40.47" rx="6.14" ry="5.87"/><path class="cls-7" d="M201.12,215.25c2.83,1.3,4.9,2.87,4,4.72s-3.84,2.29-6.67,1-4.44-3.86-3.59-5.71S198.29,214,201.12,215.25Z" transform="translate(-55.06 -145.74)"/><ellipse class="cls-7" cx="131.18" cy="38.4" rx="3.68" ry="3.52"/><ellipse class="cls-7" cx="149.89" cy="39" rx="3.68" ry="3.52"/><path class="cls-2" d="M157.33,178.41c5.48-.64-10.83,22.14-19.69,23.76s-16.84-1.47-17.83-6.9,5.39-11.13,14.25-12.75S151.7,179.07,157.33,178.41Z" transform="translate(-55.06 -145.74)"/><path class="cls-3" d="M188.28,245.68c18.8,5.75,30.78,40.91,25.78,60.68-4.85,19.18-43.53,25.85-59.36,18.75-17.92-8-21-27.15-15-46.65S169.48,239.93,188.28,245.68Z" transform="translate(-55.06 -145.74)"/><path class="cls-7" d="M223,195.62c0,1.23-7.14,3.73-16,3.73s-16-2.5-16-3.73,7.06-4.4,15.87-4.4S223,194.39,223,195.62Z" transform="translate(-55.06 -145.74)"/><path class="cls-7" d="M215.67,215.44c-2.3,1.71-3.9,3.44-3,4.68s3.54,0.87,5.83-.84,3.4-4.1,2.48-5.35S218,213.73,215.67,215.44Z" transform="translate(-55.06 -145.74)"/><rect class="cls-6" x="187.84" y="222.83" width="12.95" height="14.94" rx="6.48" ry="6.48" transform="translate(-109.22 -85.89) rotate(-15.39)"/><rect class="cls-6" x="197.37" y="224.7" width="10.83" height="12.49" rx="5.41" ry="5.41" transform="translate(-21.69 -171.22) rotate(7.83)"/><path class="cls-2" d="M199.31,224.85c-1.91.47,6.42,6.58,9.58,6s5.43-2.67,5.07-4.75-3.21-3.32-6.37-2.77S201.27,224.37,199.31,224.85Z" transform="translate(-55.06 -145.74)"/><path class="cls-2" d="M206.62,223.82c2.79,0.68-9.38,9.61-14,8.82s-7.93-3.9-7.4-6.94,4.69-4.84,9.3-4S203.76,223.12,206.62,223.82Z" transform="translate(-55.06 -145.74)"/><path class="cls-2" d="M181.05,272.26c1.1,5.92-28.91-3.75-31.31-13.28s0.37-18.45,6.21-19.92,12.52,5.06,14.92,14.58S179.92,266.17,181.05,272.26Z" transform="translate(-55.06 -145.74)"/><line class="cls-8" x1="15.15" y1="84.56" x2="43.47" y2="56.24"/><path class="cls-3" d="M188.71,192.88a4.72,4.72,0,0,1-.15.62,6.84,6.84,0,0,1-.54,1.29,5.28,5.28,0,0,1-1,1.28,4.14,4.14,0,0,1-.65.51,5.27,5.27,0,0,1-.73.4,5.38,5.38,0,0,1-.79.26,4.22,4.22,0,0,1-.82.12,5.34,5.34,0,0,1-1.62-.15,6.88,6.88,0,0,1-1.31-.49,4.74,4.74,0,0,1-.55-0.31l-0.12-.28s0.49-.26,1.24-0.63l2.77-1.28,2.83-1.15c0.78-.3,1.3-0.48,1.3-0.48Z" transform="translate(-55.06 -145.74)"/><line class="cls-9" x1="118.8" y1="30.06" x2="130.14" y2="20.92"/><line class="cls-8" x1="114.79" y1="35.2" x2="105.05" y2="37.81"/><path class="cls-3" d="M165.7,225.19a8.58,8.58,0,0,1,.52-0.91,15.84,15.84,0,0,1,1.56-2.07,23.85,23.85,0,0,1,5.69-4.74c0.58-.33,1.15-0.67,1.74-1s1.17-.58,1.76-0.82,1.16-.46,1.71-0.64,1.11-.33,1.61-0.45a16.06,16.06,0,0,1,2.56-.44,8.68,8.68,0,0,1,1,0l0.16,0.26s-1.11.73-2.8,1.8L175,220l-6.29,3.75c-1.72,1-2.88,1.66-2.88,1.66Z" transform="translate(-55.06 -145.74)"/><path class="cls-3" d="M162.75,219.23a8.58,8.58,0,0,1,.74-0.74,15.84,15.84,0,0,1,2-1.6,23.85,23.85,0,0,1,6.72-3.11c0.64-.17,1.28-0.35,1.93-0.48s1.28-.25,1.91-0.34,1.24-.14,1.82-0.18,1.15,0,1.68,0a16.06,16.06,0,0,1,2.58.23,8.69,8.69,0,0,1,1,.23l0.08,0.29s-1.26.42-3.17,1l-7,2.13-7,2c-1.93.53-3.22,0.86-3.22,0.86Z" transform="translate(-55.06 -145.74)"/><path class="cls-9" d="M196,163.79c0.61,10.87-9.69,13.56-21.06,14.15s-18.18,1.18-18.79-9.68,6.64-20,18-20.61S195.38,152.93,196,163.79Z" transform="translate(-55.06 -145.74)"/><path class="cls-9" d="M194.43,168.25c0.87,2.67,8.78,9.16,6,10l-20.33,5.81c-2.78.85-21-6.23-21.86-8.9" transform="translate(-55.06 -145.74)"/><path class="cls-10" d="M194.77,169.74l0.14,0.28a1.68,1.68,0,0,1,0,1,4.42,4.42,0,0,1-.75,1.28,8.76,8.76,0,0,1-1.31,1.33,24.08,24.08,0,0,1-8.58,4.34c-0.84.23-1.69,0.46-2.54,0.62a23,23,0,0,1-2.51.37,21,21,0,0,1-2.39.09,15,15,0,0,1-2.16-.21,7.81,7.81,0,0,1-3.09-1.13,3.73,3.73,0,0,1-.89-0.86l0.3,0.1a4.5,4.5,0,0,0,.82.2,11.54,11.54,0,0,0,2.92,0,64,64,0,0,0,8.71-2,82.13,82.13,0,0,0,8.5-2.91c0.54-.26,1.06-0.48,1.47-0.73a5.45,5.45,0,0,0,1-.73,1.59,1.59,0,0,0,.39-0.65Z" transform="translate(-55.06 -145.74)"/><path class="cls-9" d="M176.2,160.6l-9.25-.72c-3.09-.24-6.34,0-6.07-3.51l1.38-5.26c1.25-3.24,3.27-4.07,5.68-4l9.25,0.72c3.09,0.24,5.39,3.31,5.12,6.83h0C182,158.16,179.29,160.84,176.2,160.6Z" transform="translate(-55.06 -145.74)"/><path class="cls-9" d="M184.64,157.82l-10.18-2a5.1,5.1,0,0,1-4-6h0a5.1,5.1,0,0,1,6-4l10.18,2c1.72,0.11,3,2.11,3.84,5.45L191,156C190.51,158.78,187.39,158.35,184.64,157.82Z" transform="translate(-55.06 -145.74)"/><path class="cls-10" d="M163.09,152.29s0.07-.12.2-0.31a3.8,3.8,0,0,1,.65-0.8c0.17-.16.38-0.35,0.61-0.53a8.52,8.52,0,0,1,.78-0.5c0.29-.16.62-0.3,1-0.47a11,11,0,0,1,1.17-.34,9.31,9.31,0,0,1,2.75-.14,10.57,10.57,0,0,1,2.95.72,12.13,12.13,0,0,1,2.78,1.53,14.86,14.86,0,0,1,2.37,2.16,15.57,15.57,0,0,1,1.8,2.61,13.16,13.16,0,0,1,1.15,2.85,11.29,11.29,0,0,1,.21,5.49,8.5,8.5,0,0,1-.77,2.09,6.21,6.21,0,0,1-1,1.39,4.5,4.5,0,0,1-.79.72,3.68,3.68,0,0,1-.31.22l-0.36-.18,0.11-.28a5.74,5.74,0,0,0,.29-0.81,8.92,8.92,0,0,0,.32-3A15.47,15.47,0,0,0,171.47,153a9.92,9.92,0,0,0-2.1-.89,8.82,8.82,0,0,0-2-.36,10.14,10.14,0,0,0-1.72.08,7.87,7.87,0,0,0-1.29.32,6.08,6.08,0,0,0-.81.32l-0.29.13Z" transform="translate(-55.06 -145.74)"/><path class="cls-11" d="M235.63,252.19c-3,13.84-3.71,11.55-5.26,11.21S227,264.8,230,251s6.75-24.78,8.3-24.44S238.66,238.36,235.63,252.19Z" transform="translate(-55.06 -145.74)"/><rect class="cls-1" x="227.98" y="224.97" width="16.95" height="11.59" rx="4" ry="4" transform="translate(-0.18 -191.01) rotate(12.36)"/><rect class="cls-7" x="239.33" y="226.15" width="5.71" height="11.59" rx="2.85" ry="2.85" transform="translate(0.21 -192.21) rotate(12.36)"/><rect class="cls-1" x="240.38" y="230.44" width="8.64" height="4.69" rx="2.34" ry="2.34" transform="translate(0.45 -192.73) rotate(12.36)"/><ellipse class="cls-1" cx="247.84" cy="232.95" rx="6.43" ry="3.63" transform="translate(-87.81 279.44) rotate(-77.64)"/><ellipse class="cls-1" cx="248.26" cy="232.7" rx="6.43" ry="3.63" transform="translate(-87.24 279.65) rotate(-77.64)"/><ellipse class="cls-7" cx="249.27" cy="233.24" rx="4.95" ry="2.79" transform="translate(-86.98 281.06) rotate(-77.64)"/><path class="cls-1" d="M225,223.37l8.39,3a1.1,1.1,0,0,0,1.31-.84h0a1.1,1.1,0,0,0-.84-1.31L225,222.24a1.1,1.1,0,0,0-1.31.84h0C223.56,223.67,224.42,223.24,225,223.37Z" transform="translate(-55.06 -145.74)"/></svg>\'\n' +
        '      />\n' +
        '  </div>\n' +
        '  \n' +
        '  <div class="bb-error-image-notfound-container" ng-if="bbErrorImage.errorType === \'notFound\'">\n' +
        '    <img class="bb-error-image-notfound"\n' +
        '      src=\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI2NTUuNzdweCIgaGVpZ2h0PSI2MTJweCIgdmlld0JveD0iMCAwIDY1NS43NyA2MTIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY1NS43NyA2MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxlbGxpcHNlIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Y1N0UyMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iNTc3LjQyIiBjeT0iMTQ0LjI4MiIgcng9IjI0LjUwMyIgcnk9IjIzLjUxMSIvPgoJPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTU4Mi4yMDgsMTIzLjUzMmMtNy43NzEsMy40NDktOS45MjgsOC4zMjQtMjMuNTk4LDMzLjY4OGMtNC40ODMsOC4zMTgtMTUuNzAyLTcuODgzLTE3LjgwNy0xMS45NzMKCQljLTguNDYyLTE2LjQ0Ny0xLjQxNS0yOC4zOTgsMTMuMTEzLTM3LjE5N0M1NjYuNzE0LDEwMC4zMDEsNjA1LjkxNSwxMTMuMDEsNTgyLjIwOCwxMjMuNTMyeiIvPgo8L2c+CjxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjc2MSAwLjk2MTEgLTAuOTYxMSAwLjI3NjEgNjM0LjQ0NTQgLTIwNC4xNzY2KSIgZmlsbD0iI0Y1N0UyMCIgY3g9IjQ1Mi43NjIiIGN5PSIzMTkuMDc5IiByeD0iMjguMjA1IiByeT0iMTcuOTQ5Ii8+CjxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuOTMyOSAwLjM2IC0wLjM2IDAuOTMyOSAxNTQuMDQwNSAtMTQ0LjQ4NTYpIiBmaWxsPSIjRjU3RTIwIiBjeD0iNDY0LjkwMSIgY3k9IjM0MS4yODkiIHJ4PSIyNC4zOTMiIHJ5PSIxMC41NDgiLz4KPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMjU3IDAuOTkyMSAtMC45OTIxIDAuMTI1NyA3NjcuNTcxNCAtMTYxLjg2NykiIGZpbGw9IiNGNTdFMjAiIGN4PSI0NzUuNjIxIiBjeT0iMzU0LjU0OSIgcng9IjguNzI0IiByeT0iNC4zOTIiLz4KPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTQ4OS4yNjQsMzU2Ljc1MmMtMi4xMTUsMS4xODktNS43NDYtMS4yNDYtOC4xMTItNS40NDRjLTIuMzY3LTQuMTk3LTIuNTY5LTguNTY1LTAuNDU3LTkuNzU3CgljMi4xMTMtMS4xOTMsNS43NDcsMS4yNDYsOC4xMTIsNS40NDFDNDkxLjE3MywzNTEuMTg5LDQ5MS4zNzYsMzU1LjU1Nyw0ODkuMjY0LDM1Ni43NTJ6Ii8+CjxnPgoJPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTQ0Ni4yNTEsMzY0LjAzYzE2LjgzMywzNS40MzIsMTUuNjg5LDk3LjU0Ni0xNS4xNTgsMTEyLjIwMWMtMzAuODQ2LDE0LjY1My0zMy4wNDgsMC40NzEtNjMuMDY4LTI1LjE1NgoJCWMtNDQuNDczLTM3Ljk2NC0yOC43MzUtODguNTA3LDIuMTEyLTEwMy4xNjFDNDAwLjk4NSwzMzMuMjYsNDI5LjQxNywzMjguNTk2LDQ0Ni4yNTEsMzY0LjAzeiIvPgoJPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTQzNC40MjEsNDMwLjgyMmMwLDI4LjU2MS00NS45ODEsNzIuMTMzLTYyLjkyNCw2My45MjhjLTE5LjMxOS05LjM1NSw5LjM4NC0yNi4wMTMsOS4zODQtNTQuNTczCgkJYzAtMjguNTYsNC4xMy02Ny4wNDQsMjMuMTgzLTY3LjA0NFM0MzQuNDIxLDQwMi4yNjMsNDM0LjQyMSw0MzAuODIyeiIvPgoJPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTQyMi4wNDIsNTE0LjEzM2MxOS41MDIsMjIuMzU0LTAuMDEyLDUyLjY0Mi0xOS4zOTUsNTcuMzA0Yy0xOS4zODEsNC42NjMtMjUuNjIxLTE3LjctMzQuMjkyLTQ0LjY4NgoJCWMtOC42Ny0yNi45ODYtMTUuNTg1LTU5LjkxOCwyLjg5My01My4wMzhDMzg4LjYyMSw0ODAuMTgsMzkzLjkxOCw0ODEuODk4LDQyMi4wNDIsNTE0LjEzM3oiLz4KCTxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik0zODcuMDY2LDUxOC4zOTFjLTMuMTA1LDExLjA3My0xMi4xMDUsMTguNjg4LTIwLjEwMiwxNy4wMDhzLTExLjk2My0xMi4wMTYtOC44NTgtMjMuMDg4CgkJYzMuMTA1LTExLjA3NCwxMi4xMDUtMTguNjg4LDIwLjEwMy0xNy4wMDlDMzg2LjIwNSw0OTYuOTgxLDM5MC4xNzIsNTA3LjMxNywzODcuMDY2LDUxOC4zOTF6Ii8+Cgk8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNDY0Ljc4LDU2MC4xMTFjMCwxNy4zNTItMS4xNSwxNi4zNDctMjguODk1LDE2LjM0N3MtNDkuMjUxLDEuNzcxLTQ5LjI1MS0xNS41OAoJCWMwLTE3LjM1MSwyMi40OTEtMzEuNDE2LDUwLjIzNS0zMS40MTZTNDY0Ljc4LDU0Mi43NjEsNDY0Ljc4LDU2MC4xMTF6Ii8+CjwvZz4KPHBhdGggZmlsbD0iI0Y1N0UyMCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik00NjAuNDE0LDI5Ny43OTZjMS4xNTEsNDIuNzkyLTYzLjc4NywxNTYuMzU4LTEzMC41MjUsMTU4LjE1NAoJYy02Ni43NCwxLjc5Ni0xMjMuNDk5LTMzLjU3NS0xMjQuNjUxLTc2LjM2N2MtMS4xNTItNDIuNzk0LDMyLjMwNS0xMjAuNTk3LDk2LjY4NS0xMzkuMTQ3CglDMzc3LjU2NCwyMTguNjQxLDQ1OS4yNjMsMjU1LjAwMiw0NjAuNDE0LDI5Ny43OTZ6Ii8+CjxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik0yMjguNzg4LDMxMC44NzljMTEuNTcyLTcuMzY0LDUxLjc4NSwxMTAuMDQsMC42NjMsMTE5LjIwNFMxOS4zMDgsMzU1LjYxNSw2LjkzNCwzNDcuMzAzCgljLTExLjM4Ni03LjY0OCw4My4zMTUsOS4xNjUsMTM0LjQzNywwUzIxNC4yMTgsMzIwLjE1LDIyOC43ODgsMzEwLjg3OXoiLz4KPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTQ1Ni4zMjMsMjI0LjgyM2MyMi42MzMsMTcuMzY4LDM1LjgyOCwxMi43MTIsMTkuMjM3LDUwLjczMmMtMzguMzgxLDg3Ljk1Ny0zMy44OTQsNDIuNDQ0LTYyLjkxNCw0MS4wNgoJYy0yOC40OTYtMS4zNi01Ni43NjItNzguODc1LTIwLjMzOS05NC43NjlDNDI4LjE3OCwyMDYuMTkzLDQzMy42OSwyMDcuNDU2LDQ1Ni4zMjMsMjI0LjgyM3oiLz4KPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTQ3MC41MTMsMjg0LjAyNWM4LjEzNCwzMi4zMDMtNjQuNzQzLDE2My40NjEtMTI2LjkyMywxNzUuNjQxCgljLTUyLjAzOSwxMC4xOTMtMTMxLjc5Ny0yMy4xODctMTIwLjIzMy01NC44ODdjMTAuMDcxLTI3LjYwOSw3Ny4zMzQtMjkuNTkxLDEyMC44NzQtNTkuODU2CglDMzk4LjUzNSwzMDcuMTc0LDQ2Mi4zOCwyNTEuNzI1LDQ3MC41MTMsMjg0LjAyNXoiLz4KPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTI0Ny4zMzMsNDAyLjA2MmMyNy4wMjgsMjMuNTIsODcuMTU1LDcyLjA0NC0yNy44MzQsNDAuOTUyQzE0OC4yNyw0MjMuNzU1LTAuOTk4LDM0NS43MjksNy4xNiwzNDcuNDk0CgljMzQuNDA5LDcuNDUxLDgwLjM0OSw0Ni4yMSwxNDAuMDA5LDU5LjA5MUMyMDkuOTE1LDQyMC4xMzIsMjM2LjI0LDM5Mi40MDgsMjQ3LjMzMyw0MDIuMDYyeiIvPgo8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNMzQzLjg1Niw0MzEuNjQ0YzAsMjguNTYxLTQ1Ljk4MSw3Mi4xMzMtNjIuOTI0LDYzLjkyOGMtMTkuMzE5LTkuMzU1LDkuMzgzLTI2LjAxMyw5LjM4My01NC41NzMKCWMwLTI4LjU2LDQuMTMtNjcuMDQ0LDIzLjE4NC02Ny4wNDRDMzMyLjU1MiwzNzMuOTU0LDM0My44NTYsNDAzLjA4NCwzNDMuODU2LDQzMS42NDR6Ii8+CjxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik0zMjguMjcyLDUxNC45NTRjMTkuNTAyLDIyLjM1NC0wLjAxMiw1Mi42NDItMTkuMzk1LDU3LjMwNGMtMTkuMzgsNC42NjMtMjUuNjIxLTE3LjctMzQuMjkxLTQ0LjY4NgoJYy04LjY3LTI2Ljk4Ni0xNS41ODUtNTkuOTE4LDIuODkzLTUzLjAzOEMyOTQuODUxLDQ4MS4wMDEsMzAwLjE0OSw0ODIuNzIsMzI4LjI3Miw1MTQuOTU0eiIvPgo8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNMjk1LjIyLDUxOS4yMTJjLTMuMTA1LDExLjA3My0xMi4xMDQsMTguNjg4LTIwLjEwMiwxNy4wMDhjLTcuOTk3LTEuNjgtMTEuOTYzLTEyLjAxNi04Ljg1OC0yMy4wODgKCWMzLjEwNS0xMS4wNzQsMTIuMTA1LTE4LjY4OCwyMC4xMDMtMTcuMDA5QzI5NC4zNTksNDk3LjgwMywyOTguMzI1LDUwOC4xMzksMjk1LjIyLDUxOS4yMTJ6Ii8+CjxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik0zNzEuMDEsNTYwLjkzM2MwLDE3LjM1Mi0xLjE0OSwxNi4zNDctMjguODk0LDE2LjM0N2MtMjcuNzQ1LDAtNDkuMjUyLDEuNzcxLTQ5LjI1Mi0xNS41OAoJYzAtMTcuMzUxLDIyLjQ5Mi0zMS40MTYsNTAuMjM2LTMxLjQxNlMzNzEuMDEsNTQzLjU4MiwzNzEuMDEsNTYwLjkzM3oiLz4KPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTM1Mi40ODEsMzY0Ljg1MmMxNi44MzMsMzUuNDMyLDE1LjY4OSw5Ny41NDYtMTUuMTU3LDExMi4yMDFjLTMwLjg0NywxNC42NTMtMzMuMDQ4LDAuNDcxLTYzLjA2OC0yNS4xNTYKCWMtNDQuNDczLTM3Ljk2NC0yOC43MzUtODguNTA3LDIuMTEyLTEwMy4xNkMzMDcuMjE2LDMzNC4wODIsMzM1LjY0OCwzMjkuNDE3LDM1Mi40ODEsMzY0Ljg1MnoiLz4KPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTMzOS44MTgsNTU4Ljk0M2MyLjI5MywxMi43OC0wLjI1LDIxLjk3LTcuOTI3LDI5LjgxMmMtNi4zOTYsNi41MzQtMTAuNjQ2LTEyLjQ0NC0xNS4xODQtMjUuMjI3CgljLTQuMzQ0LTEyLjIzNi0xLjQwNC0xNy4zOTMsNy41OTYtMTkuMDA4QzMzMy4zMDIsNTQyLjkwNSwzMzcuNTI1LDU0Ni4xNjMsMzM5LjgxOCw1NTguOTQzeiIvPgo8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNMzczLjQ0Miw1NTYuNjY1YzIuMjkzLDEyLjc4LTAuMjUsMjEuOTctNy45MjcsMjkuODEyYy02LjM5Niw2LjUzNC0xMC42NDYtMTIuNDQ0LTE1LjE4NC0yNS4yMjcKCWMtNC4zNDQtMTIuMjM2LTEuNDA0LTE3LjM5Myw3LjU5Ni0xOS4wMDhDMzY2LjkyNiw1NDAuNjI3LDM3MS4xNDksNTQzLjg4NSwzNzMuNDQyLDU1Ni42NjV6Ii8+CjxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik0zNTcuMTAzLDU2Mi4zOTdjMi4yOTMsMTIuNzgtMC4yNSwyMS45Ny03LjkyNywyOS44MTJjLTYuMzk2LDYuNTM0LTYuNjktMTQuNjUxLTE1LjE4NC0yNS4yMjcKCWMtNy40MTEtOS4yMjcsMC44MzQtMjQuODk1LDYuMzUyLTI2LjUyMUMzNDguOTQ1LDUzNy45MjcsMzU0LjgxLDU0OS42MTcsMzU3LjEwMyw1NjIuMzk3eiIvPgo8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNjEyLjE4LDIwMC42OTJjMCw1NC42MTktNTcuNTU2LDYyLjE1Mi0xMjkuMDUsNjIuMTUyYy03MS40OTMsMC05Mi44Ni03My45MjYtNzcuNDg0LTg3LjQ5OAoJYzY3LjI0MS01OS4zNTEsMTAuOTU3LTM5LjE1Myw3Ny4wODUtNzMuNTUyQzU0NS44MTMsNjguOTgxLDYxMi4xOCwxNDYuMDcyLDYxMi4xOCwyMDAuNjkyeiIvPgo8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNTcxLjY0MSwyNjAuOTQ4Yy0yMi41OTUsMjAuOTItMS45NTMsMjIuODYyLTQ2Ljc5NSwxNy45NDljLTQ2Ljc5NS01LjEyOC02My40NjEtNy42OTItNzQuMzkzLTE2Ljg2MwoJYy0xMi42MDktMTAuNTc4LDM0LjI0NS0yOS44MDEsNzYuNDg5LTI5LjgwMUM1NjkuMTg4LDIzMi4yMzMsNTg5LjUyMSwyNDQuMzkyLDU3MS42NDEsMjYwLjk0OHoiLz4KPGVsbGlwc2UgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjRjU3RTIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI0NjUuMDQ5IiBjeT0iMTQ1LjgwOSIgcng9IjI0LjUwMyIgcnk9IjIzLjUxIi8+CjxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik00NjkuODM3LDEyNS4wNThjLTcuNzcxLDMuNDQ5LTkuOTI4LDguMzI0LTIzLjU5OCwzMy42ODhjLTQuNDgzLDguMzE4LTE1LjcwMi03Ljg4My0xNy44MDctMTEuOTc0CgljLTguNDYyLTE2LjQ0Ni0xLjQxNS0yOC4zOTgsMTMuMTEzLTM3LjE5NkM0NTQuMzQzLDEwMS44MjcsNDkzLjU0NCwxMTQuNTM2LDQ2OS44MzcsMTI1LjA1OHoiLz4KPHBhdGggZmlsbD0iIzVENUU1RSIgZD0iTTQ4MC43MzgsMTY3LjE4MWMtMi45ODgsMy45MDctOC45MjksNy4yODItMTEuNjM1LDIuOTQxYy0yLjA3Ny0zLjMzMywwLjAwMi00LjQ3OSwyLjU4NS05LjAxMwoJYzQuOTkyLTguNzYsOC4yMjgtNS4xNDQsOC4yMzgtNS4xMzZDNDg0LjAyMywxNTkuMTA3LDQ4My43MjgsMTYzLjI3NCw0ODAuNzM4LDE2Ny4xODF6Ii8+CjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Y1N0UyMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNDk3LjEwNCwyMzAuMjU0YzQuOTQxLDIuMDU0LTE1LjQ5My0xLjU3My0zMi40Ni0xLjU3MwoJcy0yOC45ODEsNi45MjQtMjguOTgxLDEuNTczYzAtNS4zNTEsMTMuNzU0LTkuNjg4LDMwLjcyMS05LjY4OFM0ODMuMzU5LDIyNC41NDEsNDk3LjEwNCwyMzAuMjU0eiIvPgo8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNNDM1LjUzNiw1NTkuMDIxYzIuMjk0LDEyLjc4LTAuMjUsMjEuOTctNy45MjcsMjkuODEyYy02LjM5Niw2LjUzNC0xMC42NDYtMTIuNDQ0LTE1LjE4NC0yNS4yMjcKCWMtNC4zNDQtMTIuMjM2LTEuNDA0LTE3LjM5Myw3LjU5Ni0xOS4wMDhDNDI5LjAyMSw1NDIuOTgyLDQzMy4yNDMsNTQ2LjI0LDQzNS41MzYsNTU5LjAyMXoiLz4KPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTQ2OS4xNjEsNTU2Ljc0MmMyLjI5MywxMi43OC0wLjI1MSwyMS45Ny03LjkyOCwyOS44MTJjLTYuMzk2LDYuNTM0LTEwLjY0Ni0xMi40NDQtMTUuMTg0LTI1LjIyNwoJYy00LjM0NC0xMi4yMzYtMS40MDQtMTcuMzkzLDcuNTk2LTE5LjAwOFM0NjYuODY4LDU0My45NjIsNDY5LjE2MSw1NTYuNzQyeiIvPgo8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNNDUyLjgyMSw1NjIuNDc1YzIuMjkzLDEyLjc4LTAuMjUsMjEuOTctNy45MjgsMjkuODEyYy02LjM5Niw2LjUzNC02LjY4OS0xNC42NTEtMTUuMTg0LTI1LjIyNwoJYy03LjQxLTkuMjI3LDAuODM1LTI0Ljg5NSw2LjM1My0yNi41MjFDNDQ0LjY2NCw1MzguMDA0LDQ1MC41MjgsNTQ5LjY5NCw0NTIuODIxLDU2Mi40NzV6Ii8+CjxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMjc2MSAwLjk2MTEgLTAuOTYxMSAwLjI3NjEgNTgwLjk5MTkgLTE0MS43ODEyKSIgZmlsbD0iI0Y1N0UyMCIgY3g9IjM4NC42MTYiIGN5PSIzMTQuNzk0IiByeD0iMjguMjA1IiByeT0iMTcuOTQ5Ii8+CjxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuOTMzIDAuMzYgLTAuMzYgMC45MzMgMTQ3LjkxODQgLTEyMC4yMzM3KSIgZmlsbD0iI0Y1N0UyMCIgY3g9IjM5Ni43NTQiIGN5PSIzMzcuMDA0IiByeD0iMjQuMzkzIiByeT0iMTAuNTQ3Ii8+CjxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDAuMTI1NyAwLjk5MjEgLTAuOTkyMSAwLjEyNTcgNzAzLjc0MDggLTk4LjAwNjcpIiBmaWxsPSIjRjU3RTIwIiBjeD0iNDA3LjQ3NSIgY3k9IjM1MC4yNjUiIHJ4PSI4LjcyNCIgcnk9IjQuMzkyIi8+CjxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik00MjEuMTE3LDM1Mi40NjhjLTIuMTE1LDEuMTg5LTUuNzQ2LTEuMjQ2LTguMTEyLTUuNDQ0Yy0yLjM2Ny00LjE5Ny0yLjU2OS04LjU2NS0wLjQ1Ny05Ljc1NwoJYzIuMTEzLTEuMTkyLDUuNzQ3LDEuMjQ1LDguMTEyLDUuNDQxQzQyMy4wMjYsMzQ2LjkwNSw0MjMuMjI5LDM1MS4yNzIsNDIxLjExNywzNTIuNDY4eiIvPgo8cG9seWdvbiBmaWxsPSIjRkNCODIyIiBwb2ludHM9IjQ3Ni4zOTQsNjAzLjA3OSA0OTMuMDMzLDU3My40MDQgNTUzLjQ0OSw1NzIuNjM3IDU1NS40NDgsNjAzLjY2NyAiLz4KPGxpbmUgZmlsbD0ibm9uZSIgeDE9IjQ5MS43ODciIHkxPSI1NzYuMTMzIiB4Mj0iNTUzLjU2OSIgeTI9IjU3NS4yODQiLz4KPGc+Cgk8cGF0aCBmaWxsPSIjQjAxRTQ5IiBkPSJNNDkxLjkyNCw1NzUuNTA5YzAsMCwxNS40MDctMC4yMTYsMzAuODE1LTAuNDMxYzMuODUyLTAuMDUyLDcuNzA0LTAuMTAzLDExLjMxNS0wLjE1CgkJYzEuODA2LDAuMDExLDMuNTUxLTAuMDA2LDUuMjA2LDAuMDI3YzEuNjU1LDAuMDI0LDMuMjIsMC4wNDksNC42NjUsMC4wN2MxLjQ0NCwwLjAzNywyLjc2OSwwLjA3MSwzLjk0MiwwLjEwMQoJCWMxLjE3NCwwLjAzLDIuMTk3LDAuMDYzLDMuMDQsMC4xMDNjMS42ODYsMC4wNzUsMi42NDgsMC4xMTksMi42NDgsMC4xMTl2MC4xYzAsMC0wLjk2MywwLjA0OS0yLjY0NywwLjEzMwoJCWMtMC44NDMsMC4wNDMtMS44NjYsMC4wODItMy4wNCwwLjExOGMtMS4xNzMsMC4wMzYtMi40OTcsMC4wNzctMy45NDEsMC4xMjFjLTEuNDQ0LDAuMDI5LTMuMDEsMC4wNjItNC42NjUsMC4wOTYKCQljLTEuNjU0LDAuMDQxLTMuNCwwLjAzNC01LjIwNiwwLjA1NGMtMy42MTEtMC4wMjgtNy40NjMtMC4wNi0xMS4zMTUtMC4wOTFjLTE1LjQwOC0wLjEzNS0zMC44MTctMC4yNy0zMC44MTctMC4yN1Y1NzUuNTA5eiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iIzNFQUZFNCIgZD0iTTQ4Mi40NDMsNjAyLjc1MmMwLDAsMC4xODMtMC40NzEsMC41MDItMS4yOTVjMC4zMzktMC44MTQsMC43ODYtMS45OTYsMS4zODktMy4zODMKCQljMC42MDQtMS4zODcsMS4yNzgtMy4wMTgsMi4wNTQtNC43NGMwLjc2Ni0xLjcyOCwxLjYxNy0zLjU1NSwyLjQ2NS01LjM4M2MwLjg2Ny0xLjgxOSwxLjczLTMuNjQsMi41NzMtNS4zMzEKCQljMC44MzEtMS42OTcsMS42NTgtMy4yNTYsMi4zNDItNC42MDVjMC42ODQtMS4zNDksMS4zMDktMi40NDUsMS43MjEtMy4yMjdjMC40MzItMC43NzEsMC42NzgtMS4yMTIsMC42NzgtMS4yMTIKCQlzLTAuMTgzLDAuNDcxLTAuNTAyLDEuMjk1Yy0wLjMzOCwwLjgxNS0wLjc4NCwxLjk5Ny0xLjM4OCwzLjM4NGMtMC42MDQsMS4zODYtMS4yNzYsMy4wMTgtMi4wNTQsNC43NAoJCWMtMC43NjYsMS43MjgtMS42MTcsMy41NTQtMi40NjYsNS4zODJjLTAuODY3LDEuODE4LTEuNzMxLDMuNjM5LTIuNTc0LDUuMzNjLTAuODMyLDEuNjk2LTEuNjU4LDMuMjU3LTIuMzQyLDQuNjA1CgkJcy0xLjMwOSwyLjQ0Ni0xLjcyMSwzLjIyN0M0ODIuNjg5LDYwMi4zMTIsNDgyLjQ0Myw2MDIuNzUyLDQ4Mi40NDMsNjAyLjc1MnoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiMzRUFGRTQiIGQ9Ik00ODkuNjE5LDYwMy4zOTNjMCwwLDAuMTMxLTAuNDc5LDAuMzYtMS4zMmMwLjI0OS0wLjgzMiwwLjU2Ni0yLjAzNSwxLjAxNy0zLjQ1NXMwLjk0Ni0zLjA4NywxLjUzMi00Ljg1NAoJCWMwLjU3NS0xLjc3LDEuMjI1LTMuNjQ2LDEuODcxLTUuNTIyYzAuNjY2LTEuODY5LDEuMzI4LTMuNzQsMS45ODQtNS40ODJjMC42NDMtMS43NDYsMS4yOTgtMy4zNTcsMS44MzItNC43NDgKCQljMC41MzQtMS4zOSwxLjAzOC0yLjUyOCwxLjM2My0zLjMzNGMwLjM0Ni0wLjc5OSwwLjU0My0xLjI1NiwwLjU0My0xLjI1NnMtMC4xMzEsMC40OC0wLjM1OSwxLjMyCgkJYy0wLjI0OSwwLjgzMy0wLjU2NSwyLjAzNi0xLjAxNywzLjQ1NmMtMC40NSwxLjQxOS0wLjk0NCwzLjA4Ny0xLjUzMSw0Ljg1M2MtMC41NzYsMS43NzEtMS4yMjYsMy42NDYtMS44NzMsNS41MjIKCQljLTAuNjY2LDEuODY5LTEuMzMsMy43NC0xLjk4NSw1LjQ4MmMtMC42NDUsMS43NDYtMS4yOTgsMy4zNTctMS44MzIsNC43NDdjLTAuNTM1LDEuMzkxLTEuMDM3LDIuNTI5LTEuMzYyLDMuMzM1CgkJQzQ4OS44MTYsNjAyLjkzNiw0ODkuNjE5LDYwMy4zOTMsNDg5LjYxOSw2MDMuMzkzeiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iIzNFQUZFNCIgZD0iTTQ5Ni4xMDEsNjAzLjI4MWMwLDAsMC4wODYtMC40NzgsMC4yMzYtMS4zMTNjMC4xNzItMC44MywwLjM3Ny0yLjAyNSwwLjY5My0zLjQ0MgoJCWMwLjMxOC0xLjQxNywwLjY1OC0zLjA3OCwxLjA3OC00Ljg0M2MwLjQxLTEuNzY4LDAuODgzLTMuNjQ0LDEuMzU0LTUuNTIxYzAuNDktMS44NzIsMC45NzgtMy43NDQsMS40Ny01LjQ5MQoJCWMwLjQ3OS0xLjc1LDAuOTgyLTMuMzY4LDEuMzg1LTQuNzYzYzAuNDA0LTEuMzk2LDAuODAxLTIuNTQyLDEuMDUtMy4zNTJjMC4yNzEtMC44MDUsMC40MjUtMS4yNjUsMC40MjUtMS4yNjUKCQlzLTAuMDg2LDAuNDc4LTAuMjM2LDEuMzEzYy0wLjE3MSwwLjgzLTAuMzc1LDIuMDI2LTAuNjkyLDMuNDQzYy0wLjMxOCwxLjQxNi0wLjY1NiwzLjA3Ny0xLjA3OCw0Ljg0MgoJCWMtMC40MDksMS43NjgtMC44ODQsMy42NDQtMS4zNTQsNS41MjFjLTAuNDkxLDEuODcyLTAuOTc5LDMuNzQ0LTEuNDcxLDUuNDljLTAuNDgsMS43NS0wLjk4MiwzLjM2OS0xLjM4Niw0Ljc2NAoJCWMtMC40MDQsMS4zOTUtMC43OTksMi41NDItMS4wNDksMy4zNTJDNDk2LjI1NSw2MDIuODIxLDQ5Ni4xMDEsNjAzLjI4MSw0OTYuMTAxLDYwMy4yODF6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjM0VBRkU0IiBkPSJNNTAxLjQxMSw2MDMuMzEzYzAsMCwwLjA1Ni0wLjQ3NywwLjE1Mi0xLjMxMWMwLjExNy0wLjgzLDAuMjQ2LTIuMDIyLDAuNDcxLTMuNDQKCQljMC4yMjctMS40MTgsMC40NTktMy4wNzgsMC43NjUtNC44NDdjMC4yOTYtMS43NywwLjY0Ny0zLjY1LDAuOTk2LTUuNTMyYzAuMzctMS44NzgsMC43MzUtMy43NTYsMS4xMTQtNS41MQoJCWMwLjM2Ni0xLjc1NywwLjc2NS0zLjM4NSwxLjA3Ny00Ljc4N2MwLjMxMy0xLjQsMC42MzYtMi41NTcsMC44MzItMy4zNzJjMC4yMTgtMC44MTEsMC4zNDMtMS4yNzMsMC4zNDMtMS4yNzMKCQlzLTAuMDU1LDAuNDc3LTAuMTUxLDEuMzExYy0wLjExOCwwLjgzLTAuMjQ1LDIuMDIzLTAuNDcxLDMuNDQxYy0wLjIyNywxLjQxOC0wLjQ1NywzLjA3OC0wLjc2NSw0Ljg0NgoJCWMtMC4yOTUsMS43NzEtMC42NDgsMy42NTEtMC45OTcsNS41MzJjLTAuMzcsMS44NzgtMC43MzcsMy43NTYtMS4xMTUsNS41MWMtMC4zNjgsMS43NTYtMC43NjUsMy4zODUtMS4wNzcsNC43ODYKCQljLTAuMzE0LDEuNDAxLTAuNjM1LDIuNTU4LTAuODMyLDMuMzcyQzUwMS41MzUsNjAyLjg1LDUwMS40MTEsNjAzLjMxMyw1MDEuNDExLDYwMy4zMTN6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjM0VBRkU0IiBkPSJNNTA3LjUyNSw2MDMuMTc0YzAsMCwwLjAyMS0wLjQ3MiwwLjA1OS0xLjI5N2MwLjA1OS0wLjgyMywwLjEwMy0yLjAwMywwLjIyNy0zLjQxMQoJCWMwLjEyNS0xLjQwNywwLjIzOS0zLjA1NCwwLjQyLTQuODFjMC4xNjktMS43NTgsMC4zODctMy42MjksMC42MDItNS41YzAuMjM1LTEuODY4LDAuNDY4LTMuNzM3LDAuNzIxLTUuNDg0CgkJYzAuMjQxLTEuNzUsMC41MjItMy4zNzUsMC43MzUtNC43NzJzMC40NTItMi41NTQsMC41OTEtMy4zNjdjMC4xNi0wLjgxMSwwLjI1Mi0xLjI3MywwLjI1Mi0xLjI3M3MtMC4wMjEsMC40NzItMC4wNTksMS4yOTcKCQljLTAuMDU5LDAuODIzLTAuMTAxLDIuMDAzLTAuMjI2LDMuNDExYy0wLjEyNSwxLjQwNy0wLjIzNywzLjA1NC0wLjQyLDQuODFjLTAuMTY5LDEuNzU5LTAuMzg4LDMuNjI5LTAuNjAzLDUuNQoJCWMtMC4yMzYsMS44NjgtMC40NjksMy43MzctMC43MjIsNS40ODRjLTAuMjQzLDEuNzQ5LTAuNTIyLDMuMzc1LTAuNzM1LDQuNzcyYy0wLjIxNCwxLjM5Ni0wLjQ1MiwyLjU1NC0wLjU5MSwzLjM2NwoJCUM1MDcuNjE3LDYwMi43MTEsNTA3LjUyNSw2MDMuMTc0LDUwNy41MjUsNjAzLjE3NHoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiMzRUFGRTQiIGQ9Ik01MTMuMjIyLDYwMy4yNjljMCwwLDAtMC40NzIsMC0xLjI5OGMwLjAyMS0wLjgyNSwwLjAxMi0yLjAwNiwwLjA3Mi0zLjQxOAoJCWMwLjA2Mi0xLjQxMiwwLjEwMi0zLjA2MiwwLjIwMi00LjgyNGMwLjA5LTEuNzY0LDAuMjIzLTMuNjQzLDAuMzU0LTUuNTIxYzAuMTUtMS44NzcsMC4yOTgtMy43NTUsMC40NzMtNS41MTIKCQljMC4xNjEtMS43NTksMC4zNjktMy4zOTYsMC41MTktNC44MDFjMC4xNS0xLjQwNSwwLjMzNy0yLjU3MSwwLjQzOS0zLjM5YzAuMTIzLTAuODE3LDAuMTkzLTEuMjg0LDAuMTkzLTEuMjg0czAsMC40NzMsMCwxLjI5OQoJCWMtMC4wMjEsMC44MjQtMC4wMSwyLjAwNi0wLjA3MSwzLjQxN2MtMC4wNjIsMS40MTItMC4xLDMuMDYyLTAuMjAyLDQuODI0Yy0wLjA5LDEuNzY0LTAuMjI0LDMuNjQzLTAuMzU0LDUuNTIxCgkJYy0wLjE1MSwxLjg3Ny0wLjMsMy43NTUtMC40NzQsNS41MTJjLTAuMTYzLDEuNzU5LTAuMzY5LDMuMzk2LTAuNTE5LDQuODAxYy0wLjE1MSwxLjQwNS0wLjMzNywyLjU3MS0wLjQzOCwzLjM5CgkJQzUxMy4yOTIsNjAyLjgwMiw1MTMuMjIyLDYwMy4yNjksNTEzLjIyMiw2MDMuMjY5eiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iIzNFQUZFNCIgZD0iTTUxOC45NSw2MDMuNDUzYzAsMC0wLjAyNS0wLjQ3Mi0wLjA2OC0xLjI5N2MtMC4wMjItMC44MjQtMC4wOTUtMi4wMDMtMC4xMDktMy40MTYKCQljLTAuMDE0LTEuNDEzLTAuMDYyLTMuMDYzLTAuMDU1LTQuODI4Yy0wLjAwNC0xLjc2NywwLjAyOS0zLjY0OSwwLjA2LTUuNTMyYzAuMDUyLTEuODgzLDAuMDk5LTMuNzY2LDAuMTgtNS41MjkKCQljMC4wNjgtMS43NjUsMC4xODktMy40MSwwLjI2NC00LjgyMWMwLjA3NS0xLjQxMSwwLjItMi41ODYsMC4yNTktMy40MDljMC4wNzktMC44MjIsMC4xMjUtMS4yOTIsMC4xMjUtMS4yOTIKCQlzMC4wMjUsMC40NzIsMC4wNjksMS4yOTdjMC4wMjIsMC44MjQsMC4wOTYsMi4wMDMsMC4xMDksMy40MTZzMC4wNjMsMy4wNjMsMC4wNTUsNC44MjhjMC4wMDQsMS43NjctMC4wMywzLjY0OS0wLjA2MSw1LjUzMgoJCWMtMC4wNTIsMS44ODMtMC4xMDEsMy43NjYtMC4xODEsNS41MjljLTAuMDcsMS43NjUtMC4xODksMy40MS0wLjI2NCw0LjgyMWMtMC4wNzYsMS40MTEtMC4xOTksMi41ODYtMC4yNTgsMy40MDkKCQlDNTE4Ljk5NSw2MDIuOTgzLDUxOC45NSw2MDMuNDUzLDUxOC45NSw2MDMuNDUzeiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iIzNFQUZFNCIgZD0iTTU0NC44MTMsNjAzLjQ1YzAsMC0wLjA3NS0wLjQ2Ni0wLjIwNi0xLjI4MmMtMC4xMDktMC44MTctMC4zMDctMS45ODItMC40NzEtMy4zODYKCQljLTAuMTYzLTEuNDAzLTAuMzg1LTMuMDM4LTAuNTY1LTQuNzk1Yy0wLjE5MS0xLjc1Ni0wLjM1Ny0zLjYzMi0wLjUyNy01LjUwOGMtMC4xNDgtMS44NzctMC4zMDEtMy43NTUtMC40MDctNS41MTgKCQljLTAuMTItMS43NjItMC4xNzQtMy40MTEtMC4yNDktNC44MjJzLTAuMDc1LTIuNTkyLTAuMTA0LTMuNDE3Yy0wLjAwOC0wLjgyNi0wLjAxMy0xLjI5OC0wLjAxMy0xLjI5OHMwLjA3NSwwLjQ2NiwwLjIwNiwxLjI4MgoJCWMwLjExLDAuODE3LDAuMzA5LDEuOTgxLDAuNDcyLDMuMzg2YzAuMTYzLDEuNDAzLDAuMzg3LDMuMDM4LDAuNTY1LDQuNzk1YzAuMTkxLDEuNzU2LDAuMzU3LDMuNjMyLDAuNTI2LDUuNTA4CgkJYzAuMTQ4LDEuODc3LDAuMywzLjc1NSwwLjQwNiw1LjUxOGMwLjExOCwxLjc2MiwwLjE3NCwzLjQxMSwwLjI0OSw0LjgyMmMwLjA3NCwxLjQxMSwwLjA3NiwyLjU5MiwwLjEwNSwzLjQxNwoJCUM1NDQuODA4LDYwMi45NzksNTQ0LjgxMyw2MDMuNDUsNTQ0LjgxMyw2MDMuNDV6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjM0VBRkU0IiBkPSJNNTQwLjAzNCw2MDMuNDA0YzAsMC0wLjA2My0wLjQ2OC0wLjE3Mi0xLjI4N2MtMC4wODgtMC44Mi0wLjI1NC0xLjk4OS0wLjM4Mi0zLjM5NgoJCWMtMC4xMjYtMS40MDgtMC4zMDUtMy4wNDgtMC40MzgtNC44MDljLTAuMTQ1LTEuNzYxLTAuMjYyLTMuNjQxLTAuMzgyLTUuNTJjLTAuMDk5LTEuODgxLTAuMjAyLTMuNzYyLTAuMjYyLTUuNTI2CgkJYy0wLjA3My0xLjc2NS0wLjA4My0zLjQxNS0wLjEyMi00LjgyN2MtMC4wMzctMS40MTMtMC4wMDctMi41OTQtMC4wMTQtMy40MTljMC4wMTQtMC44MjYsMC4wMjEtMS4yOTgsMC4wMjEtMS4yOTgKCQlzMC4wNjMsMC40NjgsMC4xNzIsMS4yODdjMC4wODksMC44MiwwLjI1NiwxLjk4OSwwLjM4MywzLjM5NmMwLjEyNSwxLjQwOCwwLjMwNywzLjA0OCwwLjQzOCw0LjgwOQoJCWMwLjE0NiwxLjc2MSwwLjI2MSwzLjY0MSwwLjM4MSw1LjUyYzAuMDk5LDEuODgxLDAuMiwzLjc2MiwwLjI2MSw1LjUyNmMwLjA3MSwxLjc2NSwwLjA4NCwzLjQxNSwwLjEyMiw0LjgyNwoJCWMwLjAzNiwxLjQxMywwLjAwNywyLjU5NCwwLjAxNSwzLjQxOUM1NDAuMDQyLDYwMi45MzMsNTQwLjAzNCw2MDMuNDA0LDU0MC4wMzQsNjAzLjQwNHoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiMzRUFGRTQiIGQ9Ik01MzUuNjUxLDYwMy4wOTdjMCwwLTAuMDc2LTAuNDY2LTAuMjExLTEuMjgxYy0wLjExMi0wLjgxNy0wLjMxMy0xLjk4MS0wLjQ4My0zLjM4NAoJCWMtMC4xNjktMS40MDMtMC4zOTctMy4wMzctMC41ODQtNC43OTNjLTAuMTk4LTEuNzU2LTAuMzcyLTMuNjMxLTAuNTQ5LTUuNTA2Yy0wLjE1NS0xLjg3Ny0wLjMxNS0zLjc1My0wLjQyOS01LjUxNgoJCWMtMC4xMjYtMS43NjItMC4xODctMy40MS0wLjI2OC00LjgyMWMtMC4wOC0xLjQxMS0wLjA4NS0yLjU5Mi0wLjExNy0zLjQxN2MtMC4wMTItMC44MjYtMC4wMTgtMS4yOTgtMC4wMTgtMS4yOTgKCQlzMC4wNzcsMC40NjYsMC4yMTEsMS4yODFjMC4xMTMsMC44MTcsMC4zMTUsMS45OCwwLjQ4NCwzLjM4NHMwLjM5OSwzLjAzNywwLjU4NCw0Ljc5M2MwLjE5OCwxLjc1NSwwLjM3MSwzLjYzMSwwLjU0OCw1LjUwNgoJCWMwLjE1NSwxLjg3NywwLjMxMywzLjc1NCwwLjQyOCw1LjUxNmMwLjEyNCwxLjc2MiwwLjE4NywzLjQxLDAuMjY4LDQuODIxYzAuMDc5LDEuNDExLDAuMDg2LDIuNTkzLDAuMTE4LDMuNDE3CgkJQzUzNS42NDUsNjAyLjYyNSw1MzUuNjUxLDYwMy4wOTcsNTM1LjY1MSw2MDMuMDk3eiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iIzNFQUZFNCIgZD0iTTUzMC4zMTMsNjAzLjI1MWMwLDAtMC4wNTUtMC40NjktMC4xNS0xLjI5Yy0wLjA3NC0wLjgyMS0wLjIyLTEuOTkzLTAuMzIzLTMuNDAyCgkJYy0wLjEwMi0xLjQxLTAuMjUzLTMuMDUzLTAuMzU2LTQuODE1Yy0wLjExNS0xLjc2My0wLjItMy42NDUtMC4yODgtNS41MjVjLTAuMDY3LTEuODgyLTAuMTM4LTMuNzY0LTAuMTY4LTUuNTMKCQljLTAuMDQzLTEuNzY1LTAuMDI1LTMuNDE1LTAuMDQtNC44MjhjLTAuMDE0LTEuNDEzLDAuMDM3LTIuNTkzLDAuMDQ0LTMuNDE4YzAuMDI4LTAuODI2LDAuMDQ0LTEuMjk4LDAuMDQ0LTEuMjk4CgkJczAuMDU1LDAuNDY5LDAuMTUsMS4yOWMwLjA3NCwwLjgyMSwwLjIyMiwxLjk5MywwLjMyNCwzLjQwMmMwLjEwMiwxLjQxLDAuMjU1LDMuMDUzLDAuMzU3LDQuODE1CgkJYzAuMTE1LDEuNzYzLDAuMTk4LDMuNjQ1LDAuMjg2LDUuNTI1YzAuMDY3LDEuODgyLDAuMTM3LDMuNzY0LDAuMTY3LDUuNTNjMC4wNDEsMS43NjUsMC4wMjUsMy40MTUsMC4wNCw0LjgyOAoJCWMwLjAxMywxLjQxMy0wLjAzNywyLjU5My0wLjA0MywzLjQxOEM1MzAuMzI4LDYwMi43NzksNTMwLjMxMyw2MDMuMjUxLDUzMC4zMTMsNjAzLjI1MXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiMzRUFGRTQiIGQ9Ik01MjUuMjg3LDYwMy40MjZjMCwwLTAuMDQ2LTAuNDctMC4xMjctMS4yOTJjLTAuMDYtMC44MjMtMC4xODUtMS45OTctMC4yNjMtMy40MDgKCQljLTAuMDc2LTEuNDExLTAuMTk4LTMuMDU3LTAuMjcxLTQuODIxYy0wLjA4My0xLjc2NS0wLjEzNS0zLjY0Ni0wLjE4OS01LjUyOWMtMC4wMzMtMS44ODMtMC4wNy0zLjc2Ni0wLjA2OC01LjUzMgoJCWMtMC4wMTItMS43NjYsMC4wMzYtMy40MTUsMC4wNDctNC44MjhjMC4wMTItMS40MTMsMC4wODMtMi41OTMsMC4xMDQtMy40MTdjMC4wNDMtMC44MjUsMC4wNjctMS4yOTcsMC4wNjctMS4yOTcKCQlzMC4wNDYsMC40NywwLjEyNywxLjI5MmMwLjA2LDAuODIzLDAuMTg3LDEuOTk3LDAuMjY0LDMuNDA4YzAuMDc2LDEuNDExLDAuMiwzLjA1NywwLjI3MSw0LjgyMQoJCWMwLjA4NCwxLjc2NCwwLjEzNCwzLjY0NiwwLjE4OCw1LjUyOWMwLjAzMiwxLjg4MywwLjA2OCwzLjc2NywwLjA2Nyw1LjUzMmMwLjAxLDEuNzY2LTAuMDM1LDMuNDE1LTAuMDQ3LDQuODI4CgkJYy0wLjAxMywxLjQxMy0wLjA4MywyLjU5My0wLjEwNCwzLjQxN0M1MjUuMzEyLDYwMi45NTQsNTI1LjI4Nyw2MDMuNDI2LDUyNS4yODcsNjAzLjQyNnoiLz4KPC9nPgo8ZWxsaXBzZSB0cmFuc2Zvcm09Im1hdHJpeCgwLjk3NDUgMC4yMjQyIC0wLjIyNDIgMC45NzQ1IDM2LjQ1ODYgLTExNC42Mjg0KSIgZmlsbD0iIzUxNTM1QSIgY3g9IjUyMi45ODYiIGN5PSIxMDMuMjI5IiByeD0iNTguMDEzIiByeT0iMTIuODA1Ii8+Cjxwb2x5Z29uIGZpbGw9IiM1MTUzNUEiIHBvaW50cz0iNTUzLjAxMiwxMDYuMTQzIDUwMi44NCw5Ny4wMTQgNTA2Ljg0NSwxMi41MTEgNTc5LjEzMywyNS4xMzggIi8+CjxyZWN0IHg9IjQ3OS4zNTEiIHk9IjY2LjIzMyIgZmlsbD0iIzhDQkU0RCIgd2lkdGg9IjAiIGhlaWdodD0iMCIvPgo8Zz4KCTxwYXRoIGZpbGw9IiM4Q0JFNEQiIGQ9Ik01NTIuOTA2LDEwNi40NjNjLTAuMDAxLDAtMC4yMTgsMC4wNTgtMC42MTksMC4xMzRjLTAuMzk4LDAuMDY0LTAuOTkzLDAuMjA3LTEuNzMxLDAuMjkyCgkJYy0wLjc0MSwwLjA5OC0xLjY0NSwwLjIzOS0yLjY2MywwLjMwMmMtMS4wMjIsMC4wODktMi4xNzcsMC4xODYtMy40MjIsMC4yMTljLTIuNDkyLDAuMDgxLTUuMzcyLDAuMDIxLTguNDI0LTAuMjI4CgkJYy0wLjc2Ni0wLjA0Ny0xLjUzNi0wLjEzOC0yLjMxOC0wLjIyYy0wLjc4My0wLjA3NS0xLjU3Mi0wLjE2OS0yLjM2My0wLjI4NmMtMS41OS0wLjE5Ni0zLjE4OC0wLjQ4NC00Ljc5LTAuNzU3CgkJYy0xLjU5NC0wLjMxOS0zLjE4OC0wLjYyNy00Ljc0NC0xLjAxMWMtMS41Ni0wLjM2MS0zLjA4My0wLjc3Mi00LjU1Mi0xLjIwNmMtMi45MzktMC44Ni01LjY1LTEuODMzLTcuOTUtMi43OTcKCQljLTEuMTUxLTAuNDc0LTIuMTkzLTAuOTc5LTMuMTE4LTEuNDI0Yy0wLjkyOS0wLjQyLTEuNzIzLTAuODc2LTIuMzgtMS4yM2MtMC42NTktMC4zNDEtMS4xNjMtMC42ODctMS41MTQtMC44ODgKCQljLTAuMzQ4LTAuMjE1LTAuNTMtMC4zNDUtMC41My0wLjM0NWwwLjA5Mi0wLjQ5MWMwLDAsMC44MDEsMC4xMzIsMi4yMDMsMC4zNjRjMS40MDEsMC4yNCwzLjQxLDAuNTQ2LDUuODA4LDAuOTc5CgkJYzQuNzk5LDAuODU0LDExLjE5NiwxLjk5NCwxNy41OTMsMy4xMzNjNi4zODMsMS4yMjIsMTIuNzY1LDIuNDQzLDE3LjU1MiwzLjM1OWMyLjM5NSwwLjQ1Miw0LjM3OSwwLjg4NCw1Ljc3MywxLjE2MQoJCWMxLjM5MywwLjI4NSwyLjE4OCwwLjQ0NywyLjE4OCwwLjQ0N0w1NTIuOTA2LDEwNi40NjN6Ii8+CjwvZz4KPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMC45ODg1IDAuMTUxNCAtMC4xNTE0IDAuOTg4NSA5LjIwMzcgLTgxLjkyNzUpIiBmaWxsPSIjODA4Mjg1IiBjeD0iNTQyLjcxNiIgY3k9IjE5LjQ4OCIgcng9IjM2Ljk1NCIgcnk9IjkuMzQ2Ii8+Cjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzUxNTM1QSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjU0Ny45Miw2MS43MTkgNTE4LjksODYuMTQ0IDQ5NC44OTcsNTguOTI3IAoJNTIyLjU5NywzMS43MDIgIi8+Cjxwb2x5Z29uIGZpbGw9IiM4Q0JFNEQiIHBvaW50cz0iNTUzLjEwOSwxMDYuMDc4IDUwMS44MTMsOTYuNDUxIDUwMy40NjQsNzguMzgzIDU1OC42OTQsODguMzY0ICIvPgo8Zz4KCTxwYXRoIGZpbGw9IiNFMThDOTMiIGQ9Ik01MTMuMiw2MC4wNTlsLTEuNDM4LTAuNjk2bC0xLjMzNiwyLjc1OWwtMi40MDgtMS4xNjZsMS4zMzYtMi43NTlsLTUuMjI0LTIuNTNsMC44ODItMS44MThsOS4wOTYtNS45NTkKCQlsMi42MDEsMS4yNTlsLTMuOTYxLDguMTc5bDEuNDM4LDAuNjk1TDUxMy4yLDYwLjA1OXogTTUxMi45NTEsNTAuODU4bC0wLjA1MS0wLjAyNGMtMC4xODQsMC4xNzktMC40OTgsMC40NDQtMC45NDEsMC43OTUKCQlsLTQuNjUyLDMuMDY0bDMuMDMzLDEuNDY5bDEuOTc3LTQuMDgxQzUxMi40OTIsNTEuNzE5LDUxMi43MDMsNTEuMzEyLDUxMi45NTEsNTAuODU4eiIvPgoJPHBhdGggZmlsbD0iI0UxOEM5MyIgZD0iTTUxNy4wNzEsNjUuNjE4Yy0yLjg1NC0xLjM4MS0zLjIzLTQuMjQtMS4xMzEtOC41NzdjMS4wODktMi4yNSwyLjMwNi0zLjc3NywzLjY0OC00LjU4MwoJCWMxLjM0My0wLjgwNSwyLjc0Ny0wLjg1Myw0LjIxMi0wLjE0M2MyLjc4NiwxLjM0OSwzLjExMiw0LjIyOCwwLjk3OCw4LjYzOGMtMS4wNjMsMi4xOTUtMi4yNiwzLjY5My0zLjU4Niw0LjQ5NgoJCUM1MTkuODY1LDY2LjI1LDUxOC40OTIsNjYuMzA3LDUxNy4wNzEsNjUuNjE4eiBNNTIyLjYyOCw1NC40MzhjLTEuMTQyLTAuNTUzLTIuNDY2LDAuNzI1LTMuOTcsMy44MwoJCWMtMS40MTcsMi45MjUtMS41NjQsNC42NTktMC40NDQsNS4yMDJjMS4wOTIsMC41MjgsMi4zNjgtMC43MTQsMy44MjctMy43M0M1MjMuNTAzLDU2LjcyNCw1MjMuNjk4LDU0Ljk1Nyw1MjIuNjI4LDU0LjQzOHoiLz4KCTxwYXRoIGZpbGw9IiNFMThDOTMiIGQ9Ik01MzIuODkzLDY5LjU5NWwtMS40MzgtMC42OTZsLTEuMzM2LDIuNzU5bC0yLjQwNy0xLjE2NmwxLjMzNi0yLjc1OWwtNS4yMjUtMi41M2wwLjg4Mi0xLjgxOGw5LjA5Ni01Ljk1OQoJCWwyLjYwMSwxLjI1OWwtMy45NjEsOC4xNzhsMS40MzgsMC42OTdMNTMyLjg5Myw2OS41OTV6IE01MzIuNjQ0LDYwLjM5NGwtMC4wNTEtMC4wMjRjLTAuMTg0LDAuMTc5LTAuNDk4LDAuNDQ0LTAuOTQxLDAuNzk1CgkJTDUyNyw2NC4yMjhsMy4wMzMsMS40NjlsMS45NzctNC4wOEM1MzIuMTg2LDYxLjI1NSw1MzIuMzk2LDYwLjg0Nyw1MzIuNjQ0LDYwLjM5NHoiLz4KPC9nPgo8ZWxsaXBzZSB0cmFuc2Zvcm09Im1hdHJpeCgwLjg3NjYgMC40ODEzIC0wLjQ4MTMgMC44NzY2IDEzOS4wMDkxIC0xOTUuMTQ3MikiIGZpbGw9IiNGNTdFMjAiIGN4PSI0NDkuOTU3IiBjeT0iMTczLjQzNCIgcng9IjIxLjcwOCIgcnk9IjEyLjAzNCIvPgo8Zz4KCTxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik00NzYuODIyLDE4NC45ODFjMCwwLTAuMDUxLDAuMTA4LTAuMTU3LDAuMjg3Yy0wLjEwOSwwLjE3LTAuMjU0LDAuNDU1LTAuNDcyLDAuNzQ2CgkJYy0wLjQxNywwLjYyLTEuMDUsMS40MjctMS44NjEsMi4yOGMtMC44MTUsMC44NDQtMS44MiwxLjcxNC0yLjk1OSwyLjUxYy0wLjU3LDAuMzk2LTEuMTY2LDAuNzkyLTEuNzk3LDEuMTM3CgkJYy0wLjYyLDAuMzctMS4yOCwwLjY3OS0xLjkzNiwxYy0wLjY3LDAuMjg3LTEuMzM3LDAuNTgzLTIuMDIxLDAuODEzYy0wLjY3NiwwLjI0OC0xLjM2LDAuNDUtMi4wMzQsMC42MgoJCWMtMS4zNDcsMC4zNDUtMi42NjEsMC41NC0zLjgzMiwwLjYxMWMtMS4xNzYsMC4wNjEtMi4xOTksMC4wMTgtMi45NC0wLjA2N2MtMC4zNjEtMC4wMjMtMC42NzItMC4wOTktMC44NzMtMC4xMjUKCQljLTAuMjA0LTAuMDM2LTAuMzE4LTAuMDY3LTAuMzE4LTAuMDY3bC0wLjE2OC0wLjM2M2MwLDAsMC4zMjYtMC4xNjQsMC44OTctMC40NDljMC41NzMtMC4yOCwxLjM4MS0wLjcwNywyLjM3MS0xLjE3MQoJCWMxLjk3Ny0wLjkzNyw0LjYxMy0yLjE4Niw3LjI0OS0zLjQzNGMyLjY2NC0xLjE4OCw1LjMyOC0yLjM3Niw3LjMyNi0zLjI2N2MwLjk5Ny0wLjQ1LDEuODQ3LTAuNzg0LDIuNDMzLTEuMDM3CgkJYzAuNTg5LTAuMjQ3LDAuOTI1LTAuMzg4LDAuOTI1LTAuMzg4TDQ3Ni44MjIsMTg0Ljk4MXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik00NjUuMjU4LDEwOC44NjFjMCwwLDAuMTE4LTAuMDE5LDAuMzI1LTAuMDM1YzAuMjAyLTAuMDA2LDAuNTItMC4wNSwwLjg4My0wLjAzNwoJCWMwLjc0Ny0wLjAxLDEuNzcsMC4wNTEsMi45MzQsMC4yMzJjMS4xNTgsMC4xOTEsMi40NDUsMC41MjEsMy43NDgsMS4wMDRjMC42NSwwLjI0MywxLjMxNCwwLjUwNywxLjk1OCwwLjgzCgkJYzAuNjU2LDAuMywxLjI4NywwLjY2NiwxLjkyNCwxLjAyMWMwLjYxOCwwLjM4OCwxLjI0LDAuNzY4LDEuODE5LDEuMTk5YzAuNTg5LDAuNDE1LDEuMTQ1LDAuODYyLDEuNjY4LDEuMzIKCQljMS4wNSwwLjkxMSwxLjk1OCwxLjg4LDIuNjg0LDIuODAzYzAuNzIsMC45MzIsMS4yNjcsMS43OTcsMS42MTgsMi40NTVjMC4xODgsMC4zMTEsMC4zMDIsMC42MDksMC4zOTUsMC43ODkKCQljMC4wODcsMC4xODksMC4xMjYsMC4zLDAuMTI2LDAuM2wtMC4yMDMsMC4zNDVjMCwwLTAuMzItMC4xNzUtMC44OC0wLjQ4MmMtMC41NTctMC4zMTItMS4zNjctMC43MzItMi4zMTMtMS4yODIKCQljLTEuODk2LTEuMDkyLTQuNDIzLTIuNTQ5LTYuOTUtNC4wMDVjLTIuNDkzLTEuNTE0LTQuOTg2LTMuMDI4LTYuODU1LTQuMTYzYy0wLjkzOC0wLjU2My0xLjY5Ni0xLjA3Mi0yLjIzNy0xLjQxCgkJYy0wLjUzOC0wLjM0My0wLjg0Ni0wLjUzOS0wLjg0Ni0wLjUzOUw0NjUuMjU4LDEwOC44NjF6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNMzcwLjM3NSwzMjguNTMzYzAsMC0wLjEwNS0wLjA1NS0wLjI4LTAuMTY5Yy0wLjE2NS0wLjExNy0wLjQ0My0wLjI3My0wLjcyNS0wLjUwNAoJCWMtMC42MDEtMC40NDMtMS4zOC0xLjExLTIuMTk3LTEuOTU5Yy0wLjgwNy0wLjg1Mi0xLjYzMy0xLjg5My0yLjM3OS0zLjA2NWMtMC4zNzEtMC41ODctMC43NC0xLjE5OS0xLjA1OC0xLjg0NQoJCWMtMC4zNDItMC42MzYtMC42MjMtMS4zMS0wLjkxNS0xLjk3OGMtMC4yNTctMC42ODMtMC41MjMtMS4zNjEtMC43MjQtMi4wNTVjLTAuMjE4LTAuNjg3LTAuMzkxLTEuMzc5LTAuNTMxLTIuMDYxCgkJYy0wLjI4Ni0xLjM1OS0wLjQyMy0yLjY4Mi0wLjQ0My0zLjg1NGMtMC4wMS0xLjE3OCwwLjA3OC0yLjE5NywwLjE5NS0yLjkzNWMwLjAzOS0wLjM2LDAuMTI4LTAuNjY3LDAuMTYzLTAuODY2CgkJYzAuMDQ1LTAuMjAzLDAuMDgxLTAuMzE2LDAuMDgxLTAuMzE2bDAuMzctMC4xNWMwLDAsMC4xNDksMC4zMzMsMC40MSwwLjkxNWMwLjI1NSwwLjU4NiwwLjY0NiwxLjQxLDEuMDY3LDIuNDIKCQljMC44NDksMi4wMTcsMS45ODEsNC43MDQsMy4xMTQsNy4zOTNjMS4wNywyLjcxNCwyLjE0MSw1LjQyNywyLjk0NCw3LjQ2MmMwLjQwNiwxLjAxNiwwLjcwMiwxLjg3OSwwLjkzLDIuNDc2CgkJYzAuMjIxLDAuNTk5LDAuMzQ3LDAuOTQxLDAuMzQ3LDAuOTQxTDM3MC4zNzUsMzI4LjUzM3oiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGNTdFMjAiIGQ9Ik0zNDkuMDY3LDU0MS41OWMwLDAsMC4wOTUsMC4wMjEsMC4yNzMsMC4wNTljMC4xNjIsMC4wNDksMC40MzMsMC4wOTksMC43MTIsMC4yMDUKCQljMC41OTIsMC4xOSwxLjM2NiwwLjUxMSwyLjE4OSwwLjk2NGMwLjgxNCwwLjQ2LDEuNjYsMS4wNjUsMi40NCwxLjc5N2MwLjM4OSwwLjM2NiwwLjc3OCwwLjc1NCwxLjEyMSwxLjE4MgoJCWMwLjM2NSwwLjQxNCwwLjY3NiwwLjg3NCwwLjk5OCwxLjMyNmMwLjI5LDAuNDc0LDAuNTg3LDAuOTQyLDAuODI1LDEuNDRjMC4yNTQsMC40ODYsMC40NjUsMC45OTEsMC42NDYsMS40OTYKCQljMC4zNjYsMS4wMDUsMC41OTEsMi4wMjEsMC42OTYsMi45NDhjMC4wOTYsMC45MzUsMC4wOSwxLjc3MSwwLjAzNSwyLjM4OWMtMC4wMSwwLjI5OC0wLjA3LDAuNTY2LTAuMDg4LDAuNzM0CgkJYy0wLjAzNCwwLjE3OS0wLjA1MiwwLjI3My0wLjA1MiwwLjI3M2wtMC4zMzQsMC4yMjFjMCwwLTAuMTYzLTAuMjI1LTAuNDQ5LTAuNjE4Yy0wLjI4LTAuMzk2LTAuNzA1LTAuOTQ3LTEuMTcxLTEuNjM4CgkJYy0wLjkzOS0xLjM3NC0yLjE5MS0zLjIwOC0zLjQ0My01LjA0MWMtMS4xOTYtMS44Ny0yLjM5Mi0zLjc0LTMuMjktNS4xNDNjLTAuNDUzLTAuNjk4LTAuNzkyLTEuMzA2LTEuMDQ3LTEuNzE5CgkJYy0wLjI1LTAuNDE3LTAuMzkzLTAuNjU1LTAuMzkzLTAuNjU1TDM0OS4wNjcsNTQxLjU5eiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0Y1N0UyMCIgZD0iTTMzMy43NjYsNTQzLjg4NGMwLDAsMC4wOSwwLjAyLDAuMjYsMC4wNTZjMC4xNTMsMC4wNDUsMC40MTIsMC4wOTIsMC42NzMsMC4xOTEKCQljMC41NTksMC4xNzksMS4yODEsMC40NzgsMi4wNCwwLjljMC43NSwwLjQyOSwxLjUxNywwLjk5MywyLjIwOSwxLjY3NGMwLjM0NCwwLjM0MiwwLjY4OCwwLjcwMiwwLjk4MiwxLjEwMQoJCWMwLjMxNywwLjM4NiwwLjU3OCwwLjgxMywwLjg1LDEuMjM0YzAuMjM5LDAuNDQsMC40ODYsMC44NzcsMC42NzIsMS4zMzljMC4yMDMsMC40NTMsMC4zNjMsMC45MjMsMC40OTMsMS4zOTIKCQljMC4yNjYsMC45MzUsMC4zOTQsMS44NzksMC40MTIsMi43NDFjMC4wMDksMC44NjgtMC4wNzIsMS42NDUtMC4xODEsMi4yMTljLTAuMDM3LDAuMjc2LTAuMTE5LDAuNTI2LTAuMTUyLDAuNjgyCgkJYy0wLjA0OSwwLjE2Ni0wLjA3NSwwLjI1NC0wLjA3NSwwLjI1NGwtMC4zNDQsMC4yMDVjMCwwLTAuMTM5LTAuMjEtMC4zOC0wLjU3NWMtMC4yMzctMC4zNjktMC42LTAuODgyLTAuOTkxLTEuNTIzCgkJYy0wLjc4OS0xLjI3OS0xLjg0MS0yLjk4NS0yLjg5My00LjY5MWMtMC45OTQtMS43MzktMS45ODgtMy40NzktMi43MzQtNC43ODRjLTAuMzc3LTAuNjQ5LTAuNjUyLTEuMjE1LTAuODYzLTEuNTk5CgkJYy0wLjIwNi0wLjM4OS0wLjMyMy0wLjYwOS0wLjMyMy0wLjYwOUwzMzMuNzY2LDU0My44ODR6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNDQ0Ljg5Miw1NDEuNzkyYzAsMCwwLjA5NSwwLjAyMSwwLjI3MiwwLjA1OWMwLjE2MiwwLjA0OSwwLjQzNCwwLjA5OSwwLjcxMywwLjIwNQoJCWMwLjU5MiwwLjE5LDEuMzY1LDAuNTExLDIuMTg4LDAuOTY0YzAuODEzLDAuNDYsMS42NTksMS4wNjUsMi40NCwxLjc5N2MwLjM4OSwwLjM2NiwwLjc3NywwLjc1NCwxLjEyLDEuMTgyCgkJYzAuMzY1LDAuNDE0LDAuNjc2LDAuODc0LDAuOTk3LDEuMzI2YzAuMjkxLDAuNDc0LDAuNTg4LDAuOTQyLDAuODI1LDEuNDRjMC4yNTQsMC40ODYsMC40NjUsMC45OTEsMC42NDYsMS40OTYKCQljMC4zNjYsMS4wMDUsMC41OTIsMi4wMjEsMC42OTYsMi45NDhjMC4wOTcsMC45MzUsMC4wOSwxLjc3MSwwLjAzNCwyLjM4OWMtMC4wMSwwLjI5OC0wLjA3LDAuNTY2LTAuMDg4LDAuNzM0CgkJYy0wLjAzMywwLjE3OS0wLjA1MiwwLjI3My0wLjA1MiwwLjI3M2wtMC4zMzQsMC4yMjFjMCwwLTAuMTYzLTAuMjI1LTAuNDQ4LTAuNjE4Yy0wLjI4MS0wLjM5Ni0wLjcwNS0wLjk0Ny0xLjE3Mi0xLjYzOAoJCWMtMC45MzgtMS4zNzQtMi4xOS0zLjIwOC0zLjQ0My01LjA0MWMtMS4xOTUtMS44Ny0yLjM5Mi0zLjc0LTMuMjg5LTUuMTQzYy0wLjQ1My0wLjY5OC0wLjc5Mi0xLjMwNi0xLjA0Ny0xLjcxOQoJCWMtMC4yNS0wLjQxNy0wLjM5NC0wLjY1NS0wLjM5NC0wLjY1NUw0NDQuODkyLDU0MS43OTJ6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNDI5LjU5LDU0NC4wODZjMCwwLDAuMDksMC4wMiwwLjI2LDAuMDU2YzAuMTU0LDAuMDQ1LDAuNDEyLDAuMDkyLDAuNjc0LDAuMTkxCgkJYzAuNTU5LDAuMTc5LDEuMjgxLDAuNDc4LDIuMDM5LDAuOWMwLjc1LDAuNDI5LDEuNTE4LDAuOTkzLDIuMjA5LDEuNjc0YzAuMzQ1LDAuMzQyLDAuNjg4LDAuNzAyLDAuOTgyLDEuMTAxCgkJYzAuMzE4LDAuMzg2LDAuNTc4LDAuODEzLDAuODUxLDEuMjM0YzAuMjM5LDAuNDQsMC40ODUsMC44NzcsMC42NzIsMS4zMzljMC4yMDMsMC40NTMsMC4zNjIsMC45MjMsMC40OTMsMS4zOTIKCQljMC4yNjYsMC45MzUsMC4zOTMsMS44NzksMC40MTIsMi43NDFjMC4wMDksMC44NjgtMC4wNzIsMS42NDUtMC4xODIsMi4yMTljLTAuMDM2LDAuMjc2LTAuMTE5LDAuNTI2LTAuMTUxLDAuNjgyCgkJYy0wLjA0OSwwLjE2Ni0wLjA3NSwwLjI1NC0wLjA3NSwwLjI1NGwtMC4zNDQsMC4yMDVjMCwwLTAuMTM5LTAuMjEtMC4zODEtMC41NzVjLTAuMjM2LTAuMzY5LTAuNi0wLjg4Mi0wLjk5LTEuNTIzCgkJYy0wLjc4OS0xLjI3OS0xLjg0MS0yLjk4NS0yLjg5My00LjY5MWMtMC45OTQtMS43MzktMS45ODgtMy40NzktMi43MzQtNC43ODRjLTAuMzc3LTAuNjQ5LTAuNjUyLTEuMjE1LTAuODYzLTEuNTk5CgkJYy0wLjIwNS0wLjM4OS0wLjMyMi0wLjYwOS0wLjMyMi0wLjYwOUw0MjkuNTksNTQ0LjA4NnoiLz4KPC9nPgo8cGF0aCBmaWxsPSIjRjU3RTIwIiBkPSJNNTc0LjkwNiwyNjQuMzljLTI3LjI5My04LjMwNi0zOC4wMSwwLjY5LTM1Ljg0MS00MC43MzVjNS4wMi05NS44MzUsMTYuODE0LTUxLjY0OCw0NC40NzEtNjAuNTUxCgljMjcuMTU2LTguNzQyLDgwLjg2Miw1My44OTQsNTIuMzQ4LDgxLjU3NkM2MDcuODA0LDI3MS45MzksNjAyLjE5OSwyNzIuNjk1LDU3NC45MDYsMjY0LjM5eiIvPgo8Zz4KCTxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik01NTIuNTQ0LDE3OS43NjZjMCwwLDAuMTIxLTAuMTA1LDAuMzQ5LTAuMzAzYzAuMjMyLTAuMTgsMC41NjItMC40ODEsMS4wMDMtMC43ODkKCQljMC40MzktMC4zMTgsMC45NjctMC43MjIsMS41OTQtMS4xMDhjMC42MjEtMC40MDgsMS4zMjItMC44NjMsMi4xMS0xLjI4NGMwLjc4LTAuNDQ2LDEuNjI4LTAuOTIzLDIuNTQyLTEuMzYzCgkJYzAuOTE0LTAuNDQyLDEuODgzLTAuODg5LDIuODk4LTEuMzA3YzEuMDE2LTAuNDE4LDIuMDY5LTAuODM3LDMuMTU2LTEuMjAyYzEuMDgxLTAuMzksMi4xOTgtMC43MTcsMy4zMTItMS4wNTcKCQljMS4xMjUtMC4zMDMsMi4yNDYtMC42MTUsMy4zNjktMC44NThjMS4xMTctMC4yNjIsMi4yMjktMC40NzUsMy4zMTMtMC42NTRjMS4wODItMC4xODYsMi4xNDEtMC4zMjEsMy4xNS0wLjQzCgkJYzEuMDA5LTAuMTE0LDEuOTgtMC4xNTcsMi44NzgtMC4xOTZjMC44OS0wLjA2MywxLjcyOC0wLjA0NywyLjQ3LTAuMDM1YzAuNzM1LTAuMDA4LDEuMzk3LDAuMDU1LDEuOTM4LDAuMDkKCQljMC41MzcsMC4wMjUsMC45NzcsMC4xMDUsMS4yNjksMC4xMzNjMC4yOTcsMC4wNDYsMC40NTUsMC4wNzEsMC40NTUsMC4wNzFsMC4xMTEsMC4zODVjMCwwLTAuNTU3LDAuMTcyLTEuNTI5LDAuNDc0CgkJYy0wLjk3NiwwLjI5Ni0yLjM2LDAuNzQ3LTQuMDM2LDEuMjM3Yy0zLjM1LDAuOTg5LTcuODE2LDIuMzA4LTEyLjI4MiwzLjYyNmMtNC40ODUsMS4yNTQtOC45NzEsMi41MDktMTIuMzM0LDMuNDUKCQljLTEuNjgxLDAuNDc2LTMuMDk0LDAuODI4LTQuMDc2LDEuMDk1Yy0wLjk4NSwwLjI2MS0xLjU0OCwwLjQxLTEuNTQ4LDAuNDFMNTUyLjU0NCwxNzkuNzY2eiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTI2MC4wNzcsMzIyLjA3M2MwLDAtMi4xNTItMS4wMzgtNS4yODEtMi43MTljLTEuNTU4LTAuODQ4LTMuMzgxLTEuODMyLTUuMjkyLTIuOTM3CgkJYy0wLjk1OS0wLjU0OC0xLjk2Mi0xLjEwMS0yLjk0MS0xLjcxMWMtMC45ODgtMC42LTEuOTkyLTEuMjA5LTIuOTk2LTEuODE4Yy0xLjAwNi0wLjYwNS0yLjA1LTEuMTY1LTMuMTAxLTEuNjg2CgkJYy0xLjA0NC0wLjUzLTIuMDU0LTEuMDczLTIuOTE4LTEuNzRzLTEuNjExLTEuNDIyLTIuMjU3LTIuMjE2Yy0wLjY2LTAuNzc3LTEuMjM2LTEuNTcxLTEuNzI5LTIuMzUzCgkJYy0wLjUtMC43NzItMC45MS0xLjU0MS0xLjI1LTIuMjUxYy0wLjM0OC0wLjcwMS0wLjU5NC0xLjM4My0wLjc5NC0xLjk0N2MtMC4xOTktMC41NjYtMC4zMzEtMS4wNDItMC40MS0xLjM4CgkJYy0wLjA4Mi0wLjMzNC0wLjExMy0wLjUyOS0wLjExMy0wLjUyOWwwLjU2My0wLjcwMmMwLDAsMC4xOTYtMC4wMTMsMC41NDEtMC4wMDZjMC4zNDcsMC4wMDMsMC44NCwwLjAyOCwxLjQzNywwLjA5OAoJCWMwLjU5NCwwLjA3MiwxLjMxMywwLjE2NCwyLjA3NCwwLjM0OWMwLjc2OCwwLjE3NiwxLjYwOCwwLjQwOCwyLjQ3MSwwLjcyOGMwLjg3LDAuMzEsMS43NzEsMC42OTksMi42NzMsMS4xNzIKCQljMC45MTYsMC40NTcsMS44MTYsMS4wMjEsMi42NTYsMS43MThjMC44MzksMC42OTgsMS41OSwxLjU2NCwyLjMzNSwyLjQ2OGMwLjczOCwwLjkxMiwxLjUxMiwxLjgwOCwyLjMyMywyLjY1NwoJCWMwLjgxNCwwLjg0NiwxLjYyOCwxLjY5MiwyLjQyOSwyLjUyNWMwLjgxLDAuODIyLDEuNTY4LDEuNjgsMi4zMTMsMi40OTVjMS40OTYsMS42MjQsMi44NTQsMy4xODgsNC4wMjMsNC41MjIKCQljMi4zMjQsMi42ODYsMy44MDcsNC41NTksMy44MDcsNC41NTlMMjYwLjA3NywzMjIuMDczeiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTIyMC45LDM1OS44NjFjMCwwLTEuNDI3LTEuOTE2LTMuNDIzLTQuODU0Yy0wLjk4OC0xLjQ3My0yLjE0OS0zLjE4OC0zLjMzMy01LjA1MgoJCWMtMC41OTYtMC45MzEtMS4yMjktMS44ODQtMS44MTUtMi44NzljLTAuNTk4LTAuOTg4LTEuMjA2LTEuOTkzLTEuODE0LTIuOTk4Yy0wLjYxMS0xLjAwMy0xLjI3OC0xLjk4MS0xLjk2OC0yLjkzCgkJYy0wLjY4MS0wLjk1Mi0xLjMyNS0xLjkwMS0xLjc4Mi0yLjg5M2MtMC40NTctMC45OTEtMC43Ny0yLjAwNy0wLjk3NS0zLjAwOWMtMC4yMjUtMC45OTQtMC4zNjgtMS45NjUtMC40NDMtMi44ODYKCQljLTAuMDg2LTAuOTE2LTAuMDkzLTEuNzg3LTAuMDY2LTIuNTc0YzAuMDE3LTAuNzgyLDAuMTE0LTEuNTAxLDAuMTk3LTIuMDk0YzAuMDg2LTAuNTk1LDAuMTktMS4wNzcsMC4yNzYtMS40MTMKCQljMC4wODItMC4zMzQsMC4xNDUtMC41MjEsMC4xNDUtMC41MjFsMC44MjQtMC4zNjNjMCwwLDAuMTgsMC4wOCwwLjQ4MSwwLjI0NWMwLjMwNiwwLjE2NCwwLjczMiwwLjQxNCwxLjIyOCwwLjc1MgoJCWMwLjQ5NCwwLjM0LDEuMDg5LDAuNzUzLDEuNjc3LDEuMjdjMC41OTksMC41MTIsMS4yMzYsMS4xMDUsMS44NTMsMS43ODhjMC42MjgsMC42NzgsMS4yNDcsMS40MzksMS44MjgsMi4yNzcKCQljMC42LDAuODI4LDEuMTM4LDEuNzQ1LDEuNTU5LDIuNzUyczAuNjg2LDIuMTIyLDAuOTI4LDMuMjY4YzAuMjMyLDEuMTUsMC41MDQsMi4zMDMsMC44MywzLjQzMgoJCWMwLjMzLDEuMTI2LDAuNjU5LDIuMjUzLDAuOTg0LDMuMzYyYzAuMzM4LDEuMTA0LDAuNjEzLDIuMjE1LDAuODk2LDMuMjgzYzAuNTc1LDIuMTMyLDEuMDU1LDQuMTQ2LDEuNDczLDUuODcKCQljMC44MTcsMy40NTYsMS4yNjUsNS44MDMsMS4yNjUsNS44MDNMMjIwLjksMzU5Ljg2MXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik0xNzEuMDkxLDM3OS4xMjJjMCwwLTAuODctMi4yMjUtMi4wMTgtNS41ODZjLTAuNTY0LTEuNjgyLTEuMjI5LTMuNjQzLTEuODc4LTUuNzU0CgkJYy0wLjMzLTEuMDU1LTAuNjg4LTIuMTQyLTAuOTg5LTMuMjU1Yy0wLjMxNi0xLjExMi0wLjYzNi0yLjI0MS0wLjk1Ny0zLjM3MWMtMC4zMjUtMS4xMjktMC43MDgtMi4yNDktMS4xMjQtMy4zNDYKCQljLTAuNDA1LTEuMS0wLjc3NS0yLjE4NS0wLjk1NC0zLjI2MmMtMC4xNzktMS4wNzYtMC4yMTEtMi4xMzktMC4xNDUtMy4xNTljMC4wNDYtMS4wMTksMC4xNjQtMS45OTIsMC4zMzUtMi45CgkJYzAuMTU5LTAuOTA2LDAuMzgyLTEuNzQ4LDAuNjE3LTIuNWMwLjIyMy0wLjc1LDAuNTA2LTEuNDE3LDAuNzQ0LTEuOTY4YzAuMjQtMC41NSwwLjQ2OC0wLjk4OCwwLjYzOS0xLjI4OQoJCWMwLjE2Ny0wLjMwMSwwLjI3Ny0wLjQ2NSwwLjI3Ny0wLjQ2NWwwLjg5MS0wLjEzMWMwLDAsMC4xNTIsMC4xMjQsMC40LDAuMzYzYzAuMjUxLDAuMjM4LDAuNTk2LDAuNTkyLDAuOTg1LDEuMDUKCQljMC4zODYsMC40NTgsMC44NTEsMS4wMTQsMS4yODEsMS42NjhjMC40NDIsMC42NTEsMC45LDEuMzkzLDEuMzE0LDIuMjE0YzAuNDI2LDAuODIsMC44MjIsMS43MTgsMS4xNiwyLjY3OQoJCWMwLjM2LDAuOTU4LDAuNjM2LDEuOTg0LDAuNzc2LDMuMDY2YzAuMTQsMS4wODMsMC4xMDEsMi4yMjksMC4wMzEsMy4zOTdjLTAuMDgsMS4xNzEtMC4xMjMsMi4zNTQtMC4xMDcsMy41MjgKCQljMC4wMiwxLjE3NCwwLjA0LDIuMzQ4LDAuMDYsMy41MDRjMC4wMzQsMS4xNTMsMC4wMDUsMi4yOTgtMC4wMDQsMy40MDJjLTAuMDEsMi4yMDgtMC4wNzksNC4yNzgtMC4xMzIsNi4wNTEKCQljLTAuMTI1LDMuNTUtMC4zMTQsNS45MzItMC4zMTQsNS45MzJMMTcxLjA5MSwzNzkuMTIyeiIvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTExNC41MDEsMzgxLjg5NGMwLDAtMC4yNzEtMi4wODQtMC41Mi01LjE5Yy0wLjExNC0xLjU1Mi0wLjI1NS0zLjM2My0wLjM0MS01LjI5NQoJCWMtMC4xMjMtMS45MzgtMC4xNjItMy45OTEtMC4xODQtNi4wNDRjMC4wMDYtMi4wNDgtMC41MjEtNC4xNjYtMC4zMTYtNi4wNjFjMC4xMDMtMC45NDcsMC4zNDMtMS44NDUsMC42NjgtMi42ODQKCQljMC4zMDUtMC44NDIsMC42NjctMS42MjcsMS4wNjQtMi4zNDVjMC4zODUtMC43MTksMC44MTYtMS4zNjcsMS4yMzQtMS45MzhjMC40MDYtMC41NzIsMC44NTEtMS4wNiwxLjIyLTEuNDYKCQljMC4zNzQtMC40LDAuNy0wLjcxLDAuOTUtMC45MThzMC4zODMtMC4zMTksMC4zODMtMC4zMTlsMC44OTMsMC4xMTVjMCwwLDAuMTAxLDAuMTQxLDAuMjg5LDAuNDA1CgkJYzAuMTg5LDAuMjY1LDAuNDI2LDAuNjQ3LDAuNjg2LDEuMTI5YzAuMjU2LDAuNDgxLDAuNTYyLDEuMDY1LDAuODEsMS43MjJjMC4yNiwwLjY1OCwwLjUxMywxLjM5NiwwLjcwMywyLjE4OAoJCWMwLjIwMiwwLjc5NCwwLjM1NCwxLjY0NiwwLjQzNSwyLjUzN2MwLjEwMiwwLjg5NCwwLjEwNiwxLjgyMy0wLjAzNSwyLjc2NmMtMC4yODMsMS44ODUtMS4zMywzLjc5OS0xLjg0Myw1Ljc4MgoJCWMtMC41NDIsMS45NzktMS4xMDEsMy45NTctMS43MTEsNS43OTljLTAuNTc0LDEuODQ4LTEuMTY5LDMuNTYzLTEuNjczLDUuMDM2Yy0xLjAyOCwyLjk0MS0xLjgxOSw0Ljg4OS0xLjgxOSw0Ljg4OQoJCUwxMTQuNTAxLDM4MS44OTR6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNNjYuMTYzLDM3NC42NmMwLDAsMC4wODktMS43NjEsMC4zNzItNC4zNDdjMC4xNTEtMS4yODksMC4zMTktMi43OTYsMC41NjEtNC4zODgKCQljMC4yMDctMS42MDQsMC41MTUtMy4yODMsMC44MzktNC45NTZjMC4zNTEtMS42NjMsMC4xOTgtMy41MTUsMC43MTQtNS4wMDNjMC4yNTgtMC43NDUsMC42NDEtMS40MTQsMS4wOTYtMi4wMTUKCQljMC40MzYtMC42MDcsMC45MTgtMS4xNTUsMS40MjItMS42NGMwLjQ5My0wLjQ4NywxLjAxOC0wLjkwNywxLjUxOC0xLjI2N2MwLjQ4OS0wLjM2MywxLTAuNjQ4LDEuNDI0LTAuODgyCgkJYzAuNDI4LTAuMjMxLDAuNzk2LTAuNDAyLDEuMDcyLTAuNTA5YzAuMjc2LTAuMTA3LDAuNDIzLTAuMTY0LDAuNDIzLTAuMTY0bDAuODQzLDAuMzE2YzAsMCwwLjA3MywwLjE0LDAuMjExLDAuNDAxCgkJYzAuMTM4LDAuMjYyLDAuMzAzLDAuNjMyLDAuNDczLDEuMDg5YzAuMTY2LDAuNDU0LDAuMzYzLDEuMDA1LDAuNDkzLDEuNjAxYzAuMTQxLDAuNiwwLjI2LDEuMjYxLDAuMzEsMS45NTMKCQljMC4wNjIsMC42OTUsMC4wNjUsMS40MjYtMC4wMDcsMi4xN2MtMC4wNTIsMC43NTItMC4yMDQsMS41MDgtMC40OTksMi4yMzhjLTAuNTksMS40NjEtMS45MjMsMi43NTUtMi43NTIsNC4yMzgKCQljLTAuODU2LDEuNDc0LTEuNzI5LDIuOTQtMi42MjgsNC4yODVjLTAuODY1LDEuMzU4LTEuNzI5LDIuNjA0LTIuNDYzLDMuNjc1Yy0xLjQ4NywyLjEzNC0yLjU3OSwzLjUxOS0yLjU3OSwzLjUxOUw2Ni4xNjMsMzc0LjY2eiIKCQkvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0ZCQkE4NSIgZD0iTTI3OC42NDYsMjk2LjcyOWMwLDAtMS41NjYtMS44MDUtMy43NzQtNC41ODZjLTEuMDk1LTEuMzk2LTIuMzgtMy4wMi0zLjY5OS00Ljc5MQoJCWMtMC42NjQtMC44ODMtMS4zNjYtMS43ODctMi4wMjQtMi43MzVjLTAuNjctMC45NDEtMS4zNTEtMS44OTgtMi4wMzItMi44NTRjLTAuNjg0LTAuOTU1LTEuNDIxLTEuODgxLTIuMTgxLTIuNzc1CgkJYy0wLjc1LTAuODk5LTEuNDYyLTEuNzk4LTEuOTkyLTIuNzUycy0wLjkxNy0xLjk0NC0xLjE5Ni0yLjkyOGMtMC4yOTgtMC45NzUtMC41MTMtMS45MzItMC42NTctMi44NDQKCQljLTAuMTU0LTAuOTA3LTAuMjI2LTEuNzc1LTAuMjU3LTIuNTYzYy0wLjA0Mi0wLjc4MSwwLjAwMS0xLjUwNSwwLjA0MS0yLjEwM2MwLjA0Mi0wLjU5OSwwLjEwOS0xLjA4OCwwLjE3LTEuNDI5CgkJYzAuMDU3LTAuMzQsMC4xMDYtMC41MywwLjEwNi0wLjUzbDAuNzk0LTAuNDIzYzAsMCwwLjE4NSwwLjA2NiwwLjQ5OSwwLjIwOGMwLjMxNywwLjE0MSwwLjc2MSwwLjM1OCwxLjI4LDAuNjU5CgkJYzAuNTE4LDAuMzAyLDEuMTQyLDAuNjcsMS43NjcsMS4xNDFjMC42MzUsMC40NjYsMS4zMTUsMS4wMTEsMS45ODEsMS42NDZjMC42NzYsMC42MjksMS4zNSwxLjM0MywxLjk5MiwyLjEzNQoJCWMwLjY2LDAuNzgyLDEuMjY0LDEuNjU2LDEuNzYsMi42MjhjMC40OTUsMC45NzMsMC44NDIsMi4wNjYsMS4xNjgsMy4xOWMwLjMxNywxLjEyOSwwLjY3MywyLjI1OCwxLjA4MywzLjM1OQoJCWMwLjQxMywxLjA5OSwwLjgyNSwyLjE5OSwxLjIzMSwzLjI4MWMwLjQxOSwxLjA3NSwwLjc3NiwyLjE2MywxLjEzNywzLjIwN2MwLjczMiwyLjA4MywxLjM2LDQuMDU3LDEuOTA1LDUuNzQ1CgkJYzEuMDcyLDMuMzg2LDEuNjkzLDUuNjkzLDEuNjkzLDUuNjkzTDI3OC42NDYsMjk2LjcyOXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGQkJBODUiIGQ9Ik0zMDIuOTQ0LDI3OS44ODljMCwwLTAuOTQtMi4xOTYtMi4xOTQtNS41MTljLTAuNjE3LTEuNjY0LTEuMzQ1LTMuNjAzLTIuMDYtNS42OTEKCQljLTAuMzYzLTEuMDQ0LTAuNzU2LTIuMTE5LTEuMDkzLTMuMjIzYy0wLjM1MS0xLjEwMi0wLjcwNy0yLjIyLTEuMDYzLTMuMzM5Yy0wLjM2LTEuMTE4LTAuNzc5LTIuMjI2LTEuMjI5LTMuMzA5CgkJYy0wLjQzOS0xLjA4NS0wLjg0My0yLjE1OS0xLjA1Ny0zLjIyOWMtMC4yMTMtMS4wNzEtMC4yNzktMi4xMzEtMC4yNDUtMy4xNTRjMC4wMTMtMS4wMTksMC4xMDEtMS45OTYsMC4yNDMtMi45MDkKCQljMC4xMy0wLjkxMSwwLjMyNy0xLjc2LDAuNTM4LTIuNTE5YzAuMTk5LTAuNzU3LDAuNDYxLTEuNDMzLDAuNjgxLTEuOTljMC4yMjItMC41NTgsMC40MzYtMS4wMDMsMC41OTgtMS4zMQoJCWMwLjE1OC0wLjMwNiwwLjI2My0wLjQ3MywwLjI2My0wLjQ3M2wwLjg4Ni0wLjE2YzAsMCwwLjE1NiwwLjEyLDAuNDExLDAuMzUxYzAuMjU5LDAuMjMsMC42MTUsMC41NzMsMS4wMTgsMS4wMTgKCQljMC40MDEsMC40NDUsMC44ODMsMC45ODcsMS4zMzQsMS42MjZjMC40NjMsMC42MzcsMC45NDQsMS4zNjQsMS4zODQsMi4xNzFjMC40NTIsMC44MDYsMC44NzUsMS42OSwxLjI0NSwyLjY0MQoJCWMwLjM5LDAuOTQ2LDAuNjk5LDEuOTYzLDAuODc0LDMuMDRjMC4xNzQsMS4wNzgsMC4xNzEsMi4yMjUsMC4xMzksMy4zOTVjLTAuMDQzLDEuMTcyLTAuMDQ4LDIuMzU2LDAuMDA1LDMuNTMKCQljMC4wNTcsMS4xNzMsMC4xMTUsMi4zNDUsMC4xNzEsMy41YzAuMDcxLDEuMTUxLDAuMDc5LDIuMjk2LDAuMTA0LDMuNDAxYzAuMDYxLDIuMjA4LDAuMDU3LDQuMjc4LDAuMDYxLDYuMDUyCgkJYy0wLjAxMiwzLjU1Mi0wLjEyNSw1LjkzOC0wLjEyNSw1LjkzOEwzMDIuOTQ0LDI3OS44ODl6Ii8+CjwvZz4KPGc+Cgk8cGF0aCBmaWxsPSIjRkJCQTg1IiBkPSJNMzMzLjAxOSwyNzIuOTRjMCwwLTAuMzc1LTIuMzYtMC43NzctNS44ODhjLTAuMTkxLTEuNzY0LTAuNDIyLTMuODIyLTAuNjA0LTYuMDIyCgkJYy0wLjA5Ni0xLjEwMS0wLjIxNC0yLjIzOS0wLjI3MS0zLjM5MmMtMC4wNy0xLjE1My0wLjE0Mi0yLjMyNS0wLjIxNC0zLjQ5N2MtMC4wNzYtMS4xNzItMC4yMTEtMi4zNDktMC4zODItMy41MDkKCQljLTAuMTYtMS4xNi0wLjI5LTIuMjk5LTAuMjM1LTMuMzg5YzAuMDU2LTEuMDksMC4yNTEtMi4xMzUsMC41MzUtMy4xMThjMC4yNjItMC45ODUsMC41ODYtMS45MTEsMC45NDctMi43NjEKCQljMC4zNDktMC44NTEsMC43NDgtMS42MjYsMS4xMzctMi4zMTFjMC4zNzgtMC42ODUsMC43OTgtMS4yNzYsMS4xNDctMS43NjNjMC4zNTItMC40ODYsMC42NjgtMC44NjYsMC45LTEuMTIzCgkJYzAuMjI4LTAuMjU4LDAuMzcxLTAuMzk0LDAuMzcxLTAuMzk0bDAuODk3LDAuMDYyYzAsMCwwLjEyMywwLjE1NCwwLjMxMywwLjQ0MWMwLjE5NSwwLjI4NywwLjQ1NiwwLjcwNiwwLjczOCwxLjIzNgoJCWMwLjI3OSwwLjUzLDAuNjE0LDEuMTczLDAuODk1LDEuOTAzYzAuMjkzLDAuNzMxLDAuNTgyLDEuNTUzLDAuODExLDIuNDQ0YzAuMjQyLDAuODkyLDAuNDM2LDEuODU0LDAuNTYxLDIuODY1CgkJYzAuMTQ2LDEuMDEzLDAuMTk3LDIuMDc0LDAuMTAzLDMuMTYycy0wLjM3OCwyLjE5OS0wLjY5NiwzLjMyNmMtMC4zMjksMS4xMjYtMC42MjQsMi4yNzMtMC44NTksMy40MjMKCQljLTAuMjMxLDEuMTUxLTAuNDYzLDIuMzAyLTAuNjksMy40MzZjLTAuMjEzLDEuMTM0LTAuNDg2LDIuMjQ2LTAuNzMyLDMuMzIzYy0wLjQ4MSwyLjE1NS0wLjk5Miw0LjE2My0xLjQyMiw1Ljg4MwoJCWMtMC44ODEsMy40NC0xLjU3NSw1LjcyNy0xLjU3NSw1LjcyN0wzMzMuMDE5LDI3Mi45NHoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGMzdEMjAiIGQ9Ik00NjEuNzUxLDMxOS40N2MwLDAtMC4yMjMsMC4wMjktMC42NDEsMC4wODJjLTAuNDE1LDAuMDM1LTEuMDMsMC4xMjUtMS44LDAuMTYxCgkJYy0wLjc3MSwwLjA0OC0xLjcxLDAuMTIzLTIuNzczLDAuMTNjLTEuMDY3LDAuMDI5LTIuMjcxLDAuMDU4LTMuNTY4LDAuMDExYy0xLjMwNC0wLjAxOC0yLjcxNC0wLjA0OC00LjE5LTAuMTY4CgkJYy0xLjQ3OS0wLjA5Ni0zLjA0My0wLjE4MS00LjY0NS0wLjM2MWMtMS42MDMtMC4xNjgtMy4yNTYtMC4zNTYtNC45MjYtMC42MWMtMS42NzQtMC4yMjctMy4zNjEtMC41MjgtNS4wNTEtMC44MTcKCQljLTEuNjg0LTAuMzI2LTMuMzY4LTAuNjQ1LTUuMDE1LTEuMDIxYy0xLjY1LTAuMzU5LTMuMjY2LTAuNzU3LTQuODI0LTEuMTcxYy0xLjU2Mi0wLjM5NS0zLjA1NC0wLjg3My00LjQ3My0xLjMwMQoJCWMtMS40MjQtMC40MDctMi43NTMtMC44ODItMy45NzktMS4zMmMtMS4yMzItMC40MTItMi4zNDgtMC44NjYtMy4zMzYtMS4yNjhjLTAuOTkzLTAuMzgtMS44NDUtMC43ODItMi41NTEtMS4wOTcKCQljLTAuNzA2LTAuMzA1LTEuMjUxLTAuNjA1LTEuNjI3LTAuNzgzYy0wLjM3Mi0wLjE5Ni0wLjU3MS0wLjMwMi0wLjU3MS0wLjMwMmwwLjA3Mi0wLjM5M2MwLDAsMy4zODEsMC41NzIsOC40NTIsMS40MzEKCQljNS4wNjMsMC44OTcsMTEuODE2LDIuMDk0LDE4LjU2OCwzLjI5YzYuNzQsMS4yNjMsMTMuNDgsMi41MjUsMTguNTM1LDMuNDcyYzUuMDQ5LDAuOTg2LDguNDE0LDEuNjQ0LDguNDE0LDEuNjQ0TDQ2MS43NTEsMzE5LjQ3eiIKCQkvPgo8L2c+CjxnPgoJPHBhdGggZmlsbD0iI0YzN0QyMCIgZD0iTTQzMy43NywzNzcuOTg0YzAsMC0wLjMyNiwwLjAxLTAuOTM3LDAuMDI3Yy0wLjYwOCwwLjAwOS0xLjUxLDAuMDY4LTIuNjQxLDAuMDUKCQljLTEuMTMzLTAuMDA2LTIuNTExLDAuMDA1LTQuMDc5LTAuMDYyYy0xLjU3MS0wLjA0NS0zLjM0NC0wLjA5OS01LjI2NC0wLjIzNmMtMS45MjUtMC4xMDktNC4wMDktMC4yMzctNi4xOTctMC40NjIKCQljLTIuMTkzLTAuMi00LjUxLTAuMzktNi44ODUtMC43MWMtMi4zNzUtMC4zMTctNC44NDktMC41MzUtNy4zMjgtMC45NTZjLTIuNDg1LTAuMzg1LTUuMDEtMC43NzYtNy41MzUtMS4xNjcKCQljLTIuNTEyLTAuNDY4LTUuMDIzLTAuOTM3LTcuNDk1LTEuMzk3Yy0yLjQ3Ny0wLjQzNi00Ljg4NS0xLjAzOS03LjIzLTEuNTI5Yy0yLjM0OC0wLjQ4Mi00LjU5NC0xLjA3OS02LjczMS0xLjYxCgkJYy0yLjE0LTAuNTEzLTQuMTQ3LTEuMDg2LTYtMS42MTZjLTEuODU4LTAuNTA1LTMuNTQ4LTEuMDQzLTUuMDQ2LTEuNTE5Yy0xLjUwMi0wLjQ1NC0yLjc5OS0wLjkyMi0zLjg3LTEuMjkKCQljLTEuMDczLTAuMzU0LTEuOTAzLTAuNzEtMi40NzUtMC45MThjLTAuNTctMC4yMTktMC44NzUtMC4zMzUtMC44NzUtMC4zMzVsMC4wNjctMC4zOTVjMCwwLDIwLjE2NCwzLjMzNCw0MC4zMjcsNi42NjkKCQljMjAuMTMsMy41Myw0MC4yNiw3LjA2Miw0MC4yNiw3LjA2Mkw0MzMuNzcsMzc3Ljk4NHoiLz4KPC9nPgo8Zz4KCTxwYXRoIGZpbGw9IiNGMzdEMjAiIGQ9Ik0zOTIuNTg0LDQzMi4zNjFjMCwwLTAuMzIxLDAuMDEyLTAuOTI1LDAuMDMzYy0wLjYwMiwwLjAxMS0xLjQ5MSwwLjA3Ni0yLjYwOCwwLjA2MwoJCWMtMS4xMiwwLTIuNDgyLDAuMDE5LTQuMDMxLTAuMDRjLTEuNTUzLTAuMDM2LTMuMzA1LTAuMDgxLTUuMjAyLTAuMjA5Yy0xLjkwMi0wLjA5OS0zLjk2MS0wLjIxNi02LjEyNS0wLjQyOQoJCWMtMi4xNjctMC4xODgtNC40NTctMC4zNjUtNi44MDQtMC42NzRjLTIuMzQ4LTAuMzA0LTQuNzkyLTAuNTA5LTcuMjQyLTAuOTE2Yy0yLjQ1Ny0wLjM3Mi00Ljk1Mi0wLjc1LTcuNDQ3LTEuMTI3CgkJYy0yLjQ4My0wLjQ1NS00Ljk2NS0wLjkxLTcuNDA5LTEuMzU3Yy0yLjQ0OC0wLjQyMy00LjgyOC0xLjAxNC03LjE0Ny0xLjQ5MWMtMi4zMi0wLjQ3LTQuNTQxLTEuMDU1LTYuNjUzLTEuNTc1CgkJYy0yLjExNS0wLjUtNC4xLTEuMDYzLTUuOTMyLTEuNTg0Yy0xLjgzNi0wLjQ5NC0zLjUwNy0xLjAyMy00Ljk4OC0xLjQ5MWMtMS40ODUtMC40NDYtMi43NjctMC45MDctMy44MjYtMS4yNjkKCQljLTEuMDYxLTAuMzUtMS44ODItMC42OTktMi40NDctMC45MDVjLTAuNTY0LTAuMjE1LTAuODY0LTAuMzMtMC44NjQtMC4zM2wwLjA2NS0wLjM5NWMwLDAsMTkuOTI5LDMuMjI4LDM5Ljg1OCw2LjQ1NAoJCWMxOS44OTYsMy40MjQsMzkuNzkyLDYuODQ4LDM5Ljc5Miw2Ljg0OEwzOTIuNTg0LDQzMi4zNjF6Ii8+CjwvZz4KPHBvbHlsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZCQkE4NSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjQ0MS42MzcsMjI0LjYzIDQ0Ny41NDIsMjMwLjYzMyA0NTMuODM1LDIyMi4wMTcgCgk0NjAuNDE4LDIyOS4xODEgNDY2LjYxNCwyMjEuODIzIDQ3My42ODIsMjI5LjM3NSA0ODAuNjUyLDIyMy4yNzUgNDg0LjkxMiwyMzAuMDUyIDQ4OC45NzgsMjI2Ljc2MSAiLz4KPC9zdmc+\' />\n' +
        '  </div>\n' +
        '</div>\n' +
        '<ng-transclude></ng-transclude>\n' +
        '');
    $templateCache.put('sky/templates/error/error.title.directive.html',
        '<div class="bb-error-title-container">\n' +
        '  <span ng-if="bbErrorTitle.title">{{bbErrorTitle.title}}</span>\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/error/errormodal.template.html',
        '<bb-modal>\n' +
        '  <div class="modal-form">\n' +
        '    <div bb-modal-body>\n' +
        '      <bb-error>\n' +
        '        <bb-error-title>\n' +
        '          {{bbErrorModal.options.errorTitle}}\n' +
        '        </bb-error-title>\n' +
        '        <bb-error-description>\n' +
        '          {{bbErrorModal.options.errorDescription}}\n' +
        '        </bb-error-description>\n' +
        '        <bb-error-action>\n' +
        '          <button type="button" class="btn btn-primary" ng-click="bbErrorModal.close()">{{\'errormodal_ok\' | bbResources}}</button>\n' +
        '        </bb-error-action>\n' +
        '      </bb-error>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</bb-modal>\n' +
        '');
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
        '                           ng-keypress="$event.keyCode === 13 && bbFileDrop.addLink($event)"\n' +
        '                           />\n' +
        '                </div>\n' +
        '                <button type="button" class="btn btn-primary" ng-disabled="!bbFileDrop.url" ng-click="bbFileDrop.addLink($event)">\n' +
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
        '        <div ng-switch="bbFileItem.isImg()" class="col-xs-3">\n' +
        '            <div ng-switch-when="true" class="center-block">\n' +
        '              <img ng-if="item.url" class="bb-file-item-preview-img" ng-src="{{item.url}}" />\n' +
        '              <img ng-if="!item.url" class="bb-file-item-preview-img" ngf-src="item" />\n' +
        '            </div>\n' +
        '            <div ng-switch-when="false" class="bb-file-item-preview-other">\n' +
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
        '<div class="bb-context-menu" data-bbauto-field="ContextMenuActions" uib-dropdown dropdown-append-to-body ng-if="locals.items.length > 0" is-open="locals.is_open">\n' +
        '    <bb-context-menu-button data-bbauto-field="ContextMenuAnchor" ng-click="locals.toggleDropdown($event)">\n' +
        '    </bb-context-menu-button>\n' +
        '    <ul uib-dropdown-menu role="menu">\n' +
        '        <bb-context-menu-item ng-repeat="item in locals.items" bb-context-menu-action="item.cmd()">{{item.title}}</bb-context-menu-item>\n' +
        '    </ul>\n' +
        '</div>\n' +
        '');
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
        '    <div class="bb-grid-filters-body-group-content" uib-collapse="!!isCollapsed" ng-transclude></div>\n' +
        '</div>\n' +
        '');
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
        '    <div class="table-responsive" bb-wait="options.loading">\n' +
        '        <table id="{{locals.gridId}}" class="bb-grid-table" ng-class="{\'grid-multiselect\' : locals.multiselect}"></table>\n' +
        '        <div class="bb-grid-empty-wait" ng-if="locals.hasWaitAndEmpty()"></div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="!paginationOptions" class="bb-table-loadmore" data-bbauto-field="LoadMoreButton" ng-show="options.hasMoreRows" ng-click="locals.loadMore()">\n' +
        '        <span class="fa fa-cloud-download"></span>\n' +
        '        <button type="button" class="btn btn-link">{{resources.grid_load_more}}</button>\n' +
        '    </div>\n' +
        '\n' +
        '    <div ng-if="paginationOptions" class="bb-grid-pagination-container">\n' +
        '        <uib-pagination ng-show="paginationOptions.recordCount > options.data.length" total-items="paginationOptions.recordCount" items-per-page="paginationOptions.itemsPerPage" ng-model="locals.currentPage" ng-change="paginationOptions.pageChanged()" max-size="paginationOptions.maxPages"></uib-pagination>\n' +
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
        '<div bb-text-expand="data" bb-text-expand-max-length="100" style="white-space: pre-wrap"></div>\n' +
        '');
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
    $templateCache.put('sky/templates/pagesummary/pagesummary.directive.html',
        '<div class="bb-page-header">\n' +
        '  <div class="container-fluid">\n' +
        '    <div class="bb-page-summary-alert"></div>\n' +
        '    <div class="row">\n' +
        '      <div class="bb-page-summary-left col-xs-12" ng-class="bbPageSummary.getPageSummaryLeftCls()">\n' +
        '        <div class="bb-page-summary-image" ng-show="bbPageSummary.imageCtrl"></div>\n' +
        '        <div>\n' +
        '          <h1 class="bb-page-summary-title" ng-show="bbPageSummary.titleCtrl"></h1>\n' +
        '          <h2 class="bb-page-summary-subtitle" ng-show="bbPageSummary.subtitleCtrl"></h2>\n' +
        '          <div class="bb-page-summary-status" ng-show="bbPageSummary.statusCtrl"></div>\n' +
        '          <div class="bb-page-summary-key-info-xs"></div>\n' +
        '          <div class="bb-page-summary-content"></div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '      <div class="bb-page-summary-key-info-sm col-sm-3 hidden-xs" ng-class="bbPageSummary.getKeyInfoCls()">\n' +
        '        <div class="bb-page-summary-key-info"></div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <ng-transclude></ng-transclude>\n' +
        '</div>\n' +
        '<div class="bb-page-summary-action-bar"></div>\n' +
        '');
    $templateCache.put('sky/templates/popover/popup.html',
        '<div class="popover {{placement}}"\n' +
        '    tooltip-animation-class="fade"\n' +
        '    uib-tooltip-classes\n' +
        '    ng-class="{ in: isOpen() }">\n' +
        '  <div class="arrow"></div>\n' +
        '\n' +
        '  <div class="popover-inner">\n' +
        '    <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n' +
        '    <div class="popover-content"\n' +
        '        uib-tooltip-template-transclude="contentExp()"\n' +
        '        tooltip-template-transclude-scope="originScope()"></div>\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/searchfield/choices.html',
        '<ul class="ui-select-choices ui-select-choices-content dropdown-menu">\n' +
        '  <li class="bb-searchfield-no-records"></li>\n' +
        '</ul>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfield.directive.html',
        '<ng-include src="bbSelectField.getFieldInclude()"></ng-include>\n' +
        '<div ng-transclude></div>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldmultiple.include.html',
        '<button type="button" class="btn btn-link bb-select-field-multiple" ng-click="bbSelectField.selectFieldClick()">\n' +
        '  <i class="fa fa-plus-circle"></i> <span class="bb-select-field-multiple-title">{{bbSelectField.bbSelectFieldText}}</span>\n' +
        '</button>\n' +
        '<div>\n' +
        '  <ul class="list-unstyled bb-select-field-multiple-items">\n' +
        '    <li class="bb-select-field-multiple-item" ng-if="bbSelectField.bbSelectFieldSelectedItems.length <= 5" ng-repeat="selectedItem in bbSelectField.bbSelectFieldSelectedItems">\n' +
        '      <div class="bb-select-field-multiple-item-title">\n' +
        '        {{selectedItem.title}}\n' +
        '      </div>\n' +
        '      <button class="close bb-select-field-multiple-item-delete" ng-click="bbSelectField.remove(selectedItem); bbSelectField.setModelTouched()">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'selectfield_remove\' | bbResources}}</span>\n' +
        '      </button>\n' +
        '    </li>\n' +
        '    <li class="bb-select-field-multiple-item" ng-if="bbSelectField.bbSelectFieldSelectedItems.length > 5">\n' +
        '      <div class="bb-select-field-multiple-item-title bb-select-field-multiple-summary">\n' +
        '        {{bbSelectField.getSummaryCountText()}}\n' +
        '      </div>\n' +
        '      <button class="close bb-select-field-multiple-item-delete" ng-click="bbSelectField.removeAll(); bbSelectField.setModelTouched()">\n' +
        '        <span aria-hidden="true">&times;</span>\n' +
        '        <span class="sr-only">{{\'selectfield_remove\' | bbResources}}</span>\n' +
        '      </button>\n' +
        '    </li>\n' +
        '  </ul>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldpicker.directive.html',
        '<bb-modal>\n' +
        '  <div class="modal-form">\n' +
        '    <bb-modal-header>{{bbSelectFieldPicker.getDialogHeaderText()}}</bb-modal-header>\n' +
        '    <div bb-modal-body>\n' +
        '      <ng-include src="bbSelectFieldPicker.bbSelectFieldPickerTemplate"></ng-include>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '  <bb-modal-footer ng-if="!bbSelectFieldPicker.isSingleStyle()">\n' +
        '    <bb-modal-footer-button-primary ng-click="bbSelectFieldPicker.okClick()">\n' +
        '      {{\'selectfieldpicker_select\' | bbResources}}\n' +
        '    </bb-modal-footer-button-primary>\n' +
        '    <bb-modal-footer-button-cancel></bb-modal-footer-button-cancel>\n' +
        '  </bb-modal-footer>\n' +
        '  <bb-modal-footer ng-if="bbSelectFieldPicker.isSingleStyle()">\n' +
        '    <bb-modal-footer-button ng-click="bbSelectFieldPicker.clearClick()">\n' +
        '      {{\'selectfieldpicker_clear\' | bbResources}}\n' +
        '    </bb-modal-footer-button>\n' +
        '  </bb-modal-footer>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/selectfield/selectfieldsingle.include.html',
        '<button type="button" class="btn btn-default bb-select-field-single" ng-click="bbSelectField.selectFieldClick()">\n' +
        '  <div class="bb-select-field-single-inner">\n' +
        '    <div class="bb-select-field-single-title">{{bbSelectField.bbSelectFieldSelectedItems[0].title}}<span class="bb-select-field-single-title-placeholder" ng-if="!bbSelectField.bbSelectFieldSelectedItems[0].title">{{bbSelectField.bbSelectFieldText}}</span></div>\n' +
        '    <div class="bb-select-field-single-icon"><i class="fa fa-sort"></i></div>\n' +
        '  </div>\n' +
        '</button>\n' +
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
        '<div class="bb-tabset-dropdown nav nav-tabs" uib-dropdown ng-show="bbTabsetOptions.isSmallScreen &amp;&amp; bbTabsetOptions.tabCount > 1">\n' +
        '  <button type="button" class="btn btn-primary bb-tab-dropdown-button" uib-dropdown-toggle><div class="bb-tab-header-text">{{bbTabsetOptions.selectedTabHeader}}</div><i class="fa fa-caret-down"></i></button>\n' +
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
    $templateCache.put('sky/templates/textexpand/expandmodal.html',
        '<bb-modal>\n' +
        '  <bb-modal-header>\n' +
        '    {{expandCtrl.headerContent}}\n' +
        '  </bb-modal-header>\n' +
        '  <div class="modal-form">\n' +
        '    <div bb-modal-body>\n' +
        '      <div>\n' +
        '        <span class="bb-text-expand-text">{{expandCtrl.textExpandContent}}</span>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <bb-modal-footer>\n' +
        '      <bb-modal-footer-button-cancel>{{::expandCtrl.closeText}}</bb-modal-footer-button-cancel>\n' +
        '    </bb-modal-footer>\n' +
        '  </div>\n' +
        '</bb-modal>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/seemore.html',
        '<button type="button" class="btn bb-btn-link-inline bb-text-expand-see-more"></button>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/space.html',
        '<span class="bb-text-expand-space"> </span>\n' +
        '');
    $templateCache.put('sky/templates/textexpand/text.html',
        '<span class="bb-text-expand-text"></span>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tile.html',
        '<section ng-class="{ \'collapsed\': bbTile.isCollapsed }" class="bb-tile">\n' +
        '    <div bb-scroll-into-view="bbTile.scrollIntoView">\n' +
        '        <div class="bb-tile-title" ng-click="bbTile.titleClick()">\n' +
        '            <div class="bb-tile-header-with-content">\n' +
        '                <h2 class="bb-tile-header">{{bbTile.tileHeader}}</h2>\n' +
        '            </div>\n' +
        '            <div class="bb-tile-header-column-tools">\n' +
        '                <div class="bb-tile-tools">\n' +
        '                    <button type="button" ng-class="\'fa-chevron-\' + (bbTile.isCollapsed ? \'down\' : \'up\')" class="fa bb-tile-chevron"></button>\n' +
        '                    <button type="button" ng-if="bbTile.hasSettings" class="bb-tile-settings bb-icon bb-icon-config" ng-click="$event.stopPropagation();bbTile.bbTileSettingsClick();"></button>\n' +
        '                    <i class="bb-tile-grab-handle glyphicon glyphicon-th" ng-click="$event.stopPropagation()"></i>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div uib-collapse="bbTile.isCollapsed" class="bb-tile-content in collapse" ng-transclude>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</section>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tiledashboard.html',
        '<div class="row">\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="1">\n' +
        '    <div ng-repeat="tile in bbTileDashboard.tiles" data-tile-id="{{tile.id}}" data-ui-view="{{tile.view_name}}" id="{{tile.view_name}}">\n' +
        '    </div>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="col-md-6 bb-page-content-tile-column bb-page-content-tile-column-sortable" data-dashboard-column="2">\n' +
        '  </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('sky/templates/tiles/tileheadercheck.html',
        '<i class="fa fa-check bb-tile-header-check"></i>');
    $templateCache.put('sky/templates/tiles/tileheadercontent.html',
        '<div class="bb-tile-header-content" ng-transclude></div>');
}]);

//# sourceMappingURL=sky.js.map