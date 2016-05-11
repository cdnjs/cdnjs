/*
 LumX v0.3.96
 (c) 2014-2015 LumApps http://ui.lumapps.com
 License: MIT
*/
/* global angular */

angular.module('lumx.utils', [
    'lumx.utils.event-scheduler',
    'lumx.utils.transclude',
    'lumx.utils.transclude-replace',
    'lumx.utils.utils'
]);

angular.module('lumx', [
    'lumx.button',
    'lumx.checkbox',
    'lumx.date-picker',
    'lumx.dialog',
    'lumx.dropdown',
    'lumx.fab',
    'lumx.file-input',
    'lumx.notification',
    'lumx.progress',
    'lumx.radio-button',
    'lumx.ripple',
    'lumx.scrollbar',
    'lumx.search-filter',
    'lumx.select',
    'lumx.switch',
    'lumx.tabs',
    'lumx.text-field',
    'lumx.thumbnail',
    'lumx.tooltip',
    'lumx.utils'
]);

/* global angular */
/* global window */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.event-scheduler', [])
    .service('LxEventSchedulerService', ['$document', 'LxUtils', function($document, LxUtils)
    {
        var handlers = {},
            schedule = {};

        function handle(event)
        {
            var scheduler = schedule[event.type];

            if (angular.isDefined(scheduler))
            {
                for (var i = 0, length = scheduler.length; i < length; i++)
                {
                    var handler = scheduler[i];

                    if (angular.isDefined(handler) && angular.isDefined(handler.callback) && angular.isFunction(handler.callback))
                    {
                        handler.callback(event);

                        if (event.isPropagationStopped())
                        {
                            break;
                        }
                    }
                }
            }
        }

        function register(eventName, callback)
        {
            var handler = {
                eventName: eventName,
                callback: callback
            };

            var id = LxUtils.generateUUID();
            handlers[id] = handler;

            if (angular.isUndefined(schedule[eventName]))
            {
                schedule[eventName] = [];

                $document.on(eventName, handle);
            }
            schedule[eventName].unshift(handlers[id]);

            return id;
        }

        function unregister(id)
        {
            var found = false;
            var handler = handlers[id];

            if (angular.isDefined(handler) && angular.isDefined(schedule[handler.eventName]))
            {
                var index = schedule[handler.eventName].indexOf(handler);

                if (angular.isDefined(index) && index > -1)
                {
                    schedule[handler.eventName].splice(index, 1);

                    delete handlers[id];
                    found = true;
                }

                if (schedule[handler.eventName].length === 0)
                {
                    delete schedule[handler.eventName];

                    $document.off(handler.eventName, handle);
                }
            }

            return found;
        }

        return {
            register: register,
            unregister: unregister
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.transclude-replace', [])
    .directive('ngTranscludeReplace', ['$log', function ($log) {
        return {
            terminal: true,
            restrict: 'EA',
            link: function ($scope, $element, $attr, ctrl, transclude)
            {
                if (!transclude)
                {
                    $log.error('orphan',
                         'Illegal use of ngTranscludeReplace directive in the template! ' +
                         'No parent directive that requires a transclusion found. ');
                    return;
                }

                transclude(function(clone)
                {
                    if (clone.length)
                    {
                        $element.replaceWith(clone);
                    }
                    else
                    {
                        $element.remove();
                    }
                });
            }
        };
    }]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.transclude', [])
    .config(['$provide', function($provide)
    {
        $provide.decorator('ngTranscludeDirective', ['$delegate', function($delegate)
        {
            $delegate.shift();

            return $delegate;
        }]);
    }])
    .directive('ngTransclude', function()
    {
        return {
            restrict: 'EAC',
            link: function(scope, element, attrs, ctrl, transclude)
            {
                var iScopeType = attrs.ngTransclude || 'sibling';

                switch (iScopeType)
                {
                    case 'sibling':
                        transclude(function(clone)
                        {
                            element.empty();
                            element.append(clone);
                        });
                        break;
                    case 'parent':
                        transclude(scope, function(clone)
                        {
                            element.empty();
                            element.append(clone);
                        });
                        break;
                    case 'child':
                        var iChildScope = scope.$new();

                        transclude(iChildScope, function(clone)
                        {
                            element.empty();
                            element.append(clone);
                            element.on('$destroy', function()
                            {
                                iChildScope.$destroy();
                            });
                        });
                        break;
                    default:
                        var count = parseInt(iScopeType);
                        if (!isNaN(count))
                        {
                            var toClone = scope;
                            for (var idx = 0; idx < count; idx++)
                            {
                                if (toClone.$parent)
                                {
                                    toClone = toClone.$parent;
                                }
                                else
                                {
                                    break;
                                }
                            }

                            transclude(toClone, function(clone)
                            {
                                element.empty();
                                element.append(clone);
                            });
                        }
                }
            }
        };
    });

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.utils.utils', [])
    .service('LxUtils', function()
    {
        function generateUUID()
        {
            var d = new Date().getTime();

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
            {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8))
                    .toString(16);
            });

            return uuid.toUpperCase();
        }

        return {
            generateUUID: generateUUID
        };
    });

(function() {
    'use strict';

    angular
        .module('lumx.button', [])
        .directive('lxButton', lxButton);

    function lxButton()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: getTemplateUrl,
            compile: compile,
            replace: true,
            transclude: true
        };

        return directive;

        function isAnchor(attrs)
        {
            return angular.isDefined(attrs.href) || angular.isDefined(attrs.ngHref) || angular.isDefined(attrs.ngLink) || angular.isDefined(attrs.uiSref);
        }

        function getTemplateUrl(element, attrs)
        {
            return isAnchor(attrs) ? 'link.html' : 'button.html';
        }

        function setButtonStyle(element, size, color, type)
        {
            var buttonBase = 'btn';
            var buttonSize = angular.isDefined(size) ? size : 'm';
            var buttonColor = angular.isDefined(color) ? color : 'primary';
            var buttonType = angular.isDefined(type) ? type : 'raised';

            element
                .removeAttr('class')
                .addClass(buttonBase + ' btn--' + buttonSize + ' btn--' + buttonColor + ' btn--' + buttonType);
        }

        function compile(element, attrs)
        {
            setButtonStyle(element, attrs.lxSize, attrs.lxColor, attrs.lxType);

            return function(scope, element, attrs)
            {
                attrs.$observe('lxSize', function(lxSize)
                {
                    setButtonStyle(element, lxSize, attrs.lxColor, attrs.lxType);
                });

                attrs.$observe('lxColor', function(lxColor)
                {
                    setButtonStyle(element, attrs.lxSize, lxColor, attrs.lxType);
                });

                attrs.$observe('lxType', function(lxType)
                {
                    setButtonStyle(element, attrs.lxSize, attrs.lxColor, lxType);
                });

                element.on('click', function(event)
                {
                    if (attrs.disabled === true)
                    {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                });
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('lumx.checkbox', [])
        .directive('lxCheckbox', lxCheckbox)
        .directive('lxCheckboxLabel', lxCheckboxLabel)
        .directive('lxCheckboxHelp', lxCheckboxHelp);

    function lxCheckbox()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'checkbox.html',
            scope: {
                ngModel: '=',
                name: '@?',
                ngTrueValue: '@?',
                ngFalseValue: '@?',
                ngChange: '&?',
                ngDisabled: '=?',
                lxColor: '@?'
            },
            controller: LxCheckboxController,
            controllerAs: 'lxCheckbox',
            bindToController: true,
            transclude: true
        };

        return directive;
    }

    LxCheckboxController.$inject = ['LxUtils'];

    function LxCheckboxController(LxUtils)
    {
        var lxCheckbox = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _checkboxId;
        var _checkboxHasChildren;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxCheckbox.getCheckboxId = getCheckboxId;
        lxCheckbox.getCheckboxHasChildren = getCheckboxHasChildren;
        lxCheckbox.setCheckboxId = setCheckboxId;
        lxCheckbox.setCheckboxHasChildren = setCheckboxHasChildren;

        //
        // PRIVATE METHODS
        //

        /**
         * Initialize the controller
         */
        function _init()
        {
            setCheckboxId(LxUtils.generateUUID());
            setCheckboxHasChildren(false);

            lxCheckbox.ngTrueValue = angular.isUndefined(lxCheckbox.ngTrueValue) ? true : lxCheckbox.ngTrueValue;
            lxCheckbox.ngFalseValue = angular.isUndefined(lxCheckbox.ngFalseValue) ? false : lxCheckbox.ngFalseValue;
            lxCheckbox.lxColor =  angular.isUndefined(lxCheckbox.lxColor) ? 'accent' : lxCheckbox.lxColor;
        }

        //
        // PUBLIC METHODS
        //

        function getCheckboxId()
        {
            return _checkboxId;
        }

        function getCheckboxHasChildren()
        {
            return _checkboxHasChildren;
        }

        function setCheckboxId(checkboxId)
        {
            _checkboxId = checkboxId;
        }

        function setCheckboxHasChildren(checkboxHasChildren)
        {
            _checkboxHasChildren = checkboxHasChildren;
        }

        //
        // INITIALIZATION
        //

        _init();
    }

    function lxCheckboxLabel()
    {
        var directive =
        {
            restrict: 'AE',
            require: ['^lxCheckbox', '^lxCheckboxLabel'],
            templateUrl: 'checkbox-label.html',
            link: link,
            controller: LxCheckboxLabelController,
            controllerAs: 'lxCheckboxLabel',
            bindToController: true,
            transclude: true,
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setCheckboxHasChildren(true);
            ctrls[1].setCheckboxId(ctrls[0].getCheckboxId());
        }
    }

    function LxCheckboxLabelController()
    {
        var lxCheckboxLabel = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _checkboxId;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxCheckboxLabel.getCheckboxId = getCheckboxId;
        lxCheckboxLabel.setCheckboxId = setCheckboxId;

        //
        // PUBLIC METHODS
        //

        function getCheckboxId()
        {
            return _checkboxId;
        }

        function setCheckboxId(checkboxId)
        {
            _checkboxId = checkboxId;
        }
    }

    function lxCheckboxHelp()
    {
        var directive =
        {
            restrict: 'AE',
            require: '^lxCheckbox',
            templateUrl: 'checkbox-help.html',
            transclude: true,
            replace: true
        };

        return directive;
    }
})();

/* global angular */
/* global moment */
/* global navigator */
'use strict'; // jshint ignore:line


angular.module('lumx.date-picker', [])
    .controller('lxDatePickerController', ['$scope', '$timeout', '$window', function($scope, $timeout, $window)
    {
        var self = this,
            activeLocale,
            $datePicker,
            $datePickerFilter,
            $datePickerContainer,
            $computedWindow;

        $scope.ctrlData = {
            isOpen: false
        };

        this.init = function(element, locale)
        {
            $datePicker = element.find('.lx-date-picker');
            $datePickerContainer = element;
            $computedWindow = angular.element($window);

            self.build(locale, false);
        };

        this.build = function(locale, isNewModel)
        {
            if (locale === activeLocale && !isNewModel)
            {
                return;
            }

            activeLocale = locale;

            moment.locale(activeLocale);

            if (angular.isDefined($scope.model))
            {
                $scope.selected = {
                    model: moment($scope.model).format('LL'),
                    date: $scope.model
                };

                $scope.activeDate = moment($scope.model);
            }
            else
            {
                $scope.selected = {
                    model: undefined,
                    date: new Date()
                };

                $scope.activeDate = moment();
            }

            $scope.moment = moment;

            $scope.days = [];
            $scope.daysOfWeek = [moment.weekdaysMin(1), moment.weekdaysMin(2), moment.weekdaysMin(3), moment.weekdaysMin(4), moment.weekdaysMin(5), moment.weekdaysMin(6), moment.weekdaysMin(0)];

            $scope.years = [];

            for (var y = moment().year() - 100; y <= moment().year() + 100; y++)
            {
                $scope.years.push(y);
            }

            generateCalendar();
        };

        $scope.previousMonth = function()
        {
            $scope.activeDate = $scope.activeDate.subtract(1, 'month');
            generateCalendar();
        };

        $scope.nextMonth = function()
        {
            $scope.activeDate = $scope.activeDate.add(1, 'month');
            generateCalendar();
        };

        $scope.select = function(day)
        {
            $scope.selected = {
                model: day.format('LL'),
                date: day.toDate()
            };

            $scope.model = day.toDate();

            generateCalendar();
        };

        $scope.selectYear = function(year)
        {
            $scope.yearSelection = false;

            $scope.selected.model = moment($scope.selected.date).year(year).format('LL');
            $scope.selected.date = moment($scope.selected.date).year(year).toDate();
            $scope.model = moment($scope.selected.date).toDate();
            $scope.activeDate = $scope.activeDate.add(year - $scope.activeDate.year(), 'year');

            generateCalendar();
        };

        $scope.openPicker = function()
        {
            if ($scope.ctrlData.isOpen)
            {
                return;
            }

            $scope.ctrlData.isOpen = true;

            $timeout(function()
            {
                $scope.yearSelection = false;

                $datePickerFilter = angular.element('<div/>', {
                    class: 'lx-date-filter'
                });

                $datePickerFilter
                    .appendTo('body')
                    .on('click', function()
                    {
                        $scope.closePicker();
                    });

                $datePicker
                    .appendTo('body')
                    .show();

                $timeout(function()
                {
                    $datePickerFilter.addClass('lx-date-filter--is-shown');
                    $datePicker.addClass('lx-date-picker--is-shown');
                }, 100);
            });
        };

        $scope.closePicker = function()
        {
            if (!$scope.ctrlData.isOpen)
            {
                return;
            }

            $datePickerFilter.removeClass('lx-date-filter--is-shown');
            $datePicker.removeClass('lx-date-picker--is-shown');

            $computedWindow.off('resize');

            $timeout(function()
            {
                $datePickerFilter.remove();

                $datePicker
                    .hide()
                    .appendTo($datePickerContainer);

                $scope.ctrlData.isOpen = false;
            }, 600);
        };

        $scope.displayYearSelection = function()
        {
            $scope.yearSelection = true;

            $timeout(function()
            {
                var $yearSelector = $datePicker.find('.lx-date-picker__year-selector');
                var $activeYear = $yearSelector.find('.lx-date-picker__year--is-active');
                $yearSelector.scrollTop($yearSelector.scrollTop() + $activeYear.position().top - $yearSelector.height()/2 + $activeYear.height()/2);
            });
        };

        $scope.clearDate = function()
        {
            $scope.model = undefined;
        };

        function generateCalendar()
        {
            var days = [],
                previousDay = angular.copy($scope.activeDate).date(0),
                firstDayOfMonth = angular.copy($scope.activeDate).date(1),
                lastDayOfMonth = angular.copy(firstDayOfMonth).endOf('month'),
                maxDays = angular.copy(lastDayOfMonth).date();

            $scope.emptyFirstDays = [];

            for (var i = firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1; i > 0; i--)
            {
                $scope.emptyFirstDays.push({});
            }

            for (var j = 0; j < maxDays; j++)
            {
                var date = angular.copy(previousDay.add(1, 'days'));

                date.selected = angular.isDefined($scope.selected.model) && date.isSame($scope.selected.date, 'day');
                date.today = date.isSame(moment(), 'day');

                days.push(date);
            }

            $scope.emptyLastDays = [];

            for (var k = 7 - (lastDayOfMonth.day() === 0 ? 7 : lastDayOfMonth.day()); k > 0; k--)
            {
                $scope.emptyLastDays.push({});
            }

            $scope.days = days;
        }
    }])
    .directive('lxDatePicker', function()
    {
        return {
            restrict: 'AE',
            controller: 'lxDatePickerController',
            scope: {
                model: '=',
                label: '@',
                fixedLabel: '&',
                allowClear: '@',
                icon: '@'
            },
            templateUrl: 'date-picker.html',
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element, checkLocale(attrs.locale));

                attrs.$observe('locale', function()
                {
                    ctrl.build(checkLocale(attrs.locale), false);
                });

                scope.$watch('model', function()
                {
                    ctrl.build(checkLocale(attrs.locale), true);
                });

                attrs.$observe('allowClear', function(newValue)
                {
                    scope.allowClear = !!(angular.isDefined(newValue) && newValue === 'true');
                });

                function checkLocale(locale)
                {
                    if (!locale)
                    {
                        return (navigator.language !== null ? navigator.language : navigator.browserLanguage).split("_")[0].split("-")[0] || 'en';
                    }

                    return locale;
                }
            }
        };
    });

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dialog', ['lumx.utils.event-scheduler'])
    .service('LxDialogService', ['$rootScope', '$timeout', '$interval', '$window', 'LxEventSchedulerService', function($rootScope, $timeout, $interval, $window, LxEventSchedulerService)
    {
        var self = this,
            dialogInterval,
            dialogFilter,
            dialogHeight,
            windowHeight,
            activeDialogId,
            scopeMap = {},
            dialog,
            dialogHeader,
            dialogContent,
            dialogActions,
            dialogScrollable,
            resizeDebounce,
            idEventScheduler;

        this.registerScope = function(dialogId, dialogScope)
        {
            scopeMap[dialogId] = dialogScope;
        };

        this.open = function(dialogId)
        {
            activeDialogId = dialogId;
            $rootScope.$broadcast('lx-dialog__open-start', dialogId);

            angular.element('body').css({
                overflow: 'hidden'
            });

            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialogFilter.appendTo('body');

            if (angular.isUndefined(scopeMap[dialogId].lxDialogAutoClose) || scopeMap[dialogId].lxDialogAutoClose === 'true')
            {
                dialogFilter.on('click', function()
                {
                    self.close(dialogId);
                });
            }

            if (angular.isUndefined(scopeMap[dialogId].lxDialogEscapeClose) || scopeMap[dialogId].lxDialogEscapeClose === 'true')
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            scopeMap[dialogId].lxDialogElement
                .appendTo('body')
                .show();

            $timeout(function()
            {
                scopeMap[dialogId].lxDialogIsOpened = true;

                dialogFilter.addClass('dialog-filter--is-shown');
                scopeMap[dialogId].lxDialogElement.addClass('dialog--is-shown');

                $timeout(function()
                {
                    $rootScope.$broadcast('lx-dialog__open-end', dialogId);
                }, 600);
            }, 100);

            dialogInterval = $interval(function()
            {
                checkDialogHeight(dialogId);
            }, 500);
        };

        this.close = function(dialogId, skipBeforeClose)
        {
            var carryOnClose = function()
            {
                if (angular.isDefined(idEventScheduler))
                {
                    $timeout(function()
                    {
                        LxEventSchedulerService.unregister(idEventScheduler);
                        idEventScheduler = undefined;
                    }, 1);
                }

                angular.element('.dialog__scrollable').off('scroll', checkScrollEnd);

                activeDialogId = undefined;
                $rootScope.$broadcast('lx-dialog__close-start', dialogId);
                if (resizeDebounce)
                {
                    $timeout.cancel(resizeDebounce);
                }

                $interval.cancel(dialogInterval);

                dialogFilter.removeClass('dialog-filter--is-shown');
                scopeMap[dialogId].lxDialogElement.removeClass('dialog--is-shown');

                if (scopeMap[dialogId].lxDialogOnclose)
                {
                    scopeMap[dialogId].lxDialogOnclose();
                }

                $timeout(function()
                {
                    angular.element('body').css({
                        overflow: 'visible'
                    });

                    dialogFilter.remove();

                    dialog = undefined;
                    dialogHeader = undefined;
                    dialogContent = undefined;
                    dialogActions = undefined;
                    dialogScrollable = undefined;

                    scopeMap[dialogId].lxDialogElement
                        .hide()
                        .removeClass('dialog--is-fixed')
                        .appendTo(scopeMap[dialogId].lxDialogParent);

                    scopeMap[dialogId].lxDialogIsOpened = false;
                    dialogHeight = undefined;
                    $rootScope.$broadcast('lx-dialog__close-end', dialogId);
                }, 600);
            };

            if (skipBeforeClose || angular.isUndefined(scopeMap[dialogId].lxDialogBeforeClose) || !angular.isFunction(scopeMap[dialogId].lxDialogBeforeClose))
            {
                carryOnClose();
            }
            else
            {
                var carryOn = scopeMap[dialogId].lxDialogBeforeClose();

                if (angular.isObject(carryOn) && angular.isDefined(carryOn.then))
                {
                    carryOn.then(carryOnClose);
                }
                else
                {
                    if (carryOn)
                    {
                        carryOnClose();
                    }
                }
            }
        };

        function onKeyUp(event)
        {
            if (event.keyCode == 27 && angular.isDefined(activeDialogId))
            {
                self.close(activeDialogId);
            }

            event.stopPropagation();
        }

        function checkDialogHeight(dialogId)
        {
            if (angular.isUndefined(dialogHeader))
            {
                dialog = scopeMap[dialogId].lxDialogElement;
                dialogHeader = dialog.find('.dialog__header');
                dialogContent = dialog.find('.dialog__content');
                dialogActions = dialog.find('.dialog__actions');

                if (angular.isUndefined(dialogHeader))
                {
                    return;
                }
            }

            var dialogMargin = 60;
            var heightToCheck = dialogMargin + dialogHeader.outerHeight() + dialogContent.outerHeight() + dialogActions.outerHeight();

            if (dialogHeight === heightToCheck && windowHeight === $window.innerHeight)
            {
                return;
            }

            dialogHeight = heightToCheck;
            windowHeight = $window.innerHeight;

            if (heightToCheck >= $window.innerHeight)
            {
                dialog.addClass('dialog--is-fixed');

                if (dialog.find('.dialog__scrollable').length === 0)
                {
                    var dialogScrollable = angular.element('<div/>', { class: 'dialog__scrollable' });
                    dialogScrollable
                        .css({ top: dialogHeader.outerHeight(), bottom: dialogActions.outerHeight() })
                        .on('scroll', checkScrollEnd);

                    dialogContent.wrap(dialogScrollable);
                }
            }
            else
            {
                dialog.removeClass('dialog--is-fixed');

                if (dialog.find('.dialog__scrollable').length > 0)
                {
                    dialogContent.unwrap();
                }
            }
        }

        function checkScrollEnd()
        {
            if (angular.isUndefined(dialogScrollable))
            {
                dialogScrollable = angular.element('.dialog__scrollable');

                if (angular.isUndefined(dialogScrollable))
                {
                    return;
                }
            }

            if (angular.isDefined(scopeMap[activeDialogId]) && angular.isDefined(scopeMap[activeDialogId].lxDialogOnscrollend))
            {
                if (dialogScrollable.scrollTop() + dialogScrollable.innerHeight() >= dialogScrollable[0].scrollHeight)
                {
                    scopeMap[activeDialogId].lxDialogOnscrollend();

                    dialogScrollable.off('scroll', checkScrollEnd);

                    $timeout(function()
                    {
                        dialogScrollable.on('scroll', checkScrollEnd);
                    }, 500);
                }
            }
        }

        angular.element($window).on('resize', function()
        {
            if (angular.isDefined(activeDialogId))
            {
                if (resizeDebounce)
                {
                    $timeout.cancel(resizeDebounce);
                }

                resizeDebounce = $timeout(function()
                {
                    checkDialogHeight(activeDialogId);
                }, 200);
            }
        });
    }])
    .controller('LxDialogController', ['$scope', 'LxDialogService', function($scope, LxDialogService)
    {
        this.init = function(element, id)
        {
            $scope.lxDialogIsOpened = false;
            $scope.lxDialogElement = element;
            $scope.lxDialogParent = element.parent();

            LxDialogService.registerScope(id, $scope);
        };
    }])
    .directive('lxDialog', function()
    {
        return {
            restrict: 'E',
            controller: 'LxDialogController',
            scope: true,
            template: '<div><div ng-if="lxDialogIsOpened" ng-transclude="child"></div></div>',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl)
            {
                attrs.$observe('id', function(newId)
                {
                    if (newId)
                    {
                        ctrl.init(element, newId);
                    }
                });

                attrs.$observe('autoClose', function(newValue)
                {
                    scope.lxDialogAutoClose = newValue;
                });

                attrs.$observe('escapeClose', function(newValue)
                {
                    scope.lxDialogEscapeClose = newValue;
                });

                attrs.$observe('beforeClose', function(newValue)
                {
                    scope.lxDialogBeforeClose = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('onclose', function(newValue)
                {
                    scope.lxDialogOnclose = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('onscrollend', function(newValue)
                {
                    scope.lxDialogOnscrollend = function()
                    {
                        return scope.$eval(newValue);
                    };
                });
            }
        };
    })
    .directive('lxDialogClose', ['LxDialogService', function(LxDialogService)
    {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs)
            {
                attrs.$observe('lxDialogClose', function(newValue)
                {
                    scope.lxDialogCloseSkipBefore = newValue;
                });

                element.on('click', function()
                {
                    LxDialogService.close(element.parents('.dialog').attr('id'), scope.lxDialogCloseSkipBefore);
                });
            }
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dropdown', ['lumx.utils.event-scheduler'])
    .service('LxDropdownService', ['$timeout', '$document', 'LxEventSchedulerService', function($timeout, $document, LxEventSchedulerService)
    {
        var openScope = null;

        function open(dropdownScope)
        {
            if (!openScope)
            {
                $document.on('click', closeDropdown);
            }

            if (angular.isUndefined(dropdownScope.lxDropdownEscapeClose) || dropdownScope.lxDropdownEscapeClose === 'true')
            {
                dropdownScope.idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            if (openScope && openScope !== dropdownScope)
            {
                openScope.lxDropdownIsOpened = false;
            }

            openScope = dropdownScope;
        }

        function close(dropdownScope)
        {
            if (openScope === dropdownScope)
            {
                if (angular.isDefined(dropdownScope.idEventScheduler))
                {
                    $timeout(function()
                    {
                        LxEventSchedulerService.unregister(dropdownScope.idEventScheduler);
                        delete dropdownScope.idEventScheduler;

                        openScope = null;
                    }, 1);
                }

                $document.off('click', closeDropdown);
            }
        }

        function closeDropdown()
        {
            if (!openScope) { return; }

            openScope.$apply(function()
            {
                openScope.lxDropdownIsOpened = false;
            });
        }

        function onKeyUp(event)
        {
            if (event.keyCode == 27)
            {
                closeDropdown();
            }

            event.stopPropagation();
        }

        return {
            open: open,
            close: close
        };
    }])
    .controller('LxDropdownController', ['$scope', '$timeout', '$window', 'LxDropdownService', function($scope, $timeout, $window, LxDropdownService)
    {
        var dropdown,
            dropdownMenu;
        var dropdownMenuHeight;
        var direction;
        var cssOptions;

        $scope.lxDropdownIsOpened = false;
        $scope.lxDropdownIsDropped = false;

        this.registerDropdown = function(element)
        {
            dropdown = element;

            $scope.lxDropdownPosition = angular.isDefined($scope.lxDropdownPosition) ? $scope.lxDropdownPosition : 'left';
        };

        this.registerDropdownMenu = function(element)
        {
            dropdownMenu = element;
        };

        this.toggle = function()
        {
            $scope.lxDropdownIsOpened = !$scope.lxDropdownIsOpened;
        };

        function linkList()
        {
            $scope.lxDropdownIsDropped = false;

            closeDropdownMenu();
        }

        function unlinkList()
        {
            $scope.lxDropdownIsDropped = true;

            dropdownMenu.appendTo('body');

            $timeout(function()
            {
                setDropdownMenuCss();
                openDropdownMenu();
            });
        }

        function fromTop(toTop)
        {
            if (angular.isUndefined($scope.lxDropdownOverToggle) && angular.isDefined($scope.lxDropdownFromTop))
            {
                return $scope.lxDropdownFromTop === 'true';
            }

            if ($scope.lxDropdownOverToggle === 'true')
            {
                return !toTop;
            }
            else
            {
                return toTop;
            }
        }

        function findDirectionAndOriginY()
        {
            var windowScrollTop = angular.element($window).scrollTop();
            var topLeftCorner = dropdown.offset().top - windowScrollTop;
            var buttonHeight = dropdown.outerHeight();
            var menuHeight = dropdownMenu.outerHeight();

            var originY = topLeftCorner;
            var direction = "to_bottom";

            if ($scope.lxDropdownOverToggle === 'true')
            {
                if (topLeftCorner + menuHeight >= $window.innerHeight &&
                    $window.innerHeight - topLeftCorner + (buttonHeight / 2) < $window.innerHeight / 2)
                {
                    direction = "to_top";
                    originY = $window.innerHeight - (originY + buttonHeight);
                }
            }
            else if (angular.isDefined($scope.lxDropdownOverToggle) || $scope.lxDropdownFromTop !== 'true')
            {
                if (topLeftCorner + buttonHeight + menuHeight < $window.innerHeight ||
                    $window.innerHeight - topLeftCorner + (buttonHeight / 2) >= $window.innerHeight / 2)
                {
                    originY += buttonHeight;
                }
                else
                {
                    direction = "to_top";
                    originY = $window.innerHeight - originY;
                }
            }
            else if (angular.isUndefined($scope.lxDropdownOverToggle) && $scope.lxDropdownFromTop === 'true')
            {
                if (topLeftCorner + menuHeight >= $window.innerHeight &&
                    $window.innerHeight - topLeftCorner < $window.innerHeight / 2)
                {
                    direction = "to_top";
                }
            }

            return { direction: direction, originY: originY + windowScrollTop };
        }

        function setDropdownMenuCss()
        {
            var scrollTop = dropdownMenu.scrollTop();
            dropdownMenu.removeAttr('style');
            dropdownMenu.css({
                opacity: 1
            });

            // Deternmine orientation only at open, just manage resize if it's already opened.
            var dropdownMenuWidth = dropdownMenu.outerWidth();
            var dropdownMenuHeight = dropdownMenu.outerHeight();
            var windowScrollTop = angular.element($window).scrollTop();
            var offset = 0;
            var topLeftCorner = dropdown.offset().top - windowScrollTop;
            var directionAndOriginY = findDirectionAndOriginY();

            if (!direction)
            { // Manage orientation
                var width = dropdownMenuWidth;

                if (angular.isDefined($scope.lxDropdownWidth))
                {
                    if ($scope.lxDropdownWidth === 'full')
                    {
                        width = dropdown.outerWidth();
                    }
                    else
                    {
                        width = dropdown.outerWidth() + parseInt($scope.lxDropdownWidth);
                    }
                }

                cssOptions = {
                    left: $scope.lxDropdownPosition !== 'right' ? dropdown.offset().left : undefined,
                    right: $scope.lxDropdownPosition === 'right' ? $window.innerWidth - dropdown.offset().left - dropdown.outerWidth() : undefined,
                    width: width
                };

                direction = directionAndOriginY.direction;

                if (direction === 'to_bottom')
                {
                    cssOptions.top = directionAndOriginY.originY;
                }
                else
                {
                    cssOptions.bottom = directionAndOriginY.originY;
                }
            }

            var css = angular.copy(cssOptions);
            if (direction === "to_bottom" && topLeftCorner + dropdownMenuHeight > $window.innerHeight - 8)
            {
                css.overflow = "auto";

                css.height = $window.innerHeight - 8 - topLeftCorner;
                if ($scope.lxDropdownOverToggle !== 'true' && (angular.isDefined($scope.lxDropdownOverToggle) || $scope.lxDropdownFromTop !== 'true'))
                {
                    css.height -= dropdown.outerHeight();
                }

                dropdownMenu.scrollTop(scrollTop);
            }
            else if (direction === 'to_top')
            {
                css.bottom = $window.innerHeight - (topLeftCorner + windowScrollTop);
                if ($scope.lxDropdownOverToggle === 'true')
                {
                    css.bottom -= dropdown.outerHeight();
                }

                if ((topLeftCorner + windowScrollTop) - dropdownMenuHeight < 8)
                {
                    css.overflow = "auto";

                    css.height = topLeftCorner - 8;
                    if ($scope.lxDropdownOverToggle === 'true')
                    {
                        css.height += dropdown.outerHeight();
                    }

                    dropdownMenu.scrollTop(scrollTop);
                }
            }

            dropdownMenu.css(css);
        }

        function openDropdownMenu()
        {
            var width = dropdownMenu.outerWidth();
            var height = dropdownMenu.outerHeight();

            dropdownMenu.css({
                width: 0,
                height: 0,
                opacity: 1
            });

            dropdownMenu.find('.dropdown-dropdownMenu__content').css({
                width: width,
                height: height
            });

            dropdownMenu.velocity({
                width: width
            }, {
                duration: 200,
                easing: 'easeOutQuint',
                queue: false
            });

            dropdownMenu.velocity({
                height: height
            }, {
                duration: 500,
                easing: 'easeOutQuint',
                queue: false,
                complete: function()
                {
                    if (height === dropdownMenuHeight)
                    {
                        dropdownMenu.css({ height: 'auto' });
                    }
                    else
                    {
                        dropdownMenu.css({ overflow: 'auto' });
                    }

                    if (!angular.isDefined($scope.lxDropdownWidth))
                    {
                        dropdownMenu.css({ width: 'auto' });
                    }

                    dropdownMenu.find('.dropdown-menu__content').removeAttr('style');
                }
            });

            dropdown.addClass('dropdown--is-active');
        }

        function closeDropdownMenu()
        {
            dropdownMenu.velocity({
                width: 0,
                height: 0,
            }, {
                duration: 200,
                easing: 'easeOutQuint',
                complete: function()
                {
                    dropdownMenu
                        .appendTo(dropdown)
                        .removeAttr('style');

                    dropdown.removeClass('dropdown--is-active');
                    direction = undefined;
                }
            });
        }

        function updatePositionAndSize()
        {
            if ($scope.lxDropdownIsDropped)
            {
                setDropdownMenuCss();
            }
        }

        $scope.$watch('lxDropdownIsOpened', function(lxDropdownIsOpened)
        {
            if (lxDropdownIsOpened)
            {
                unlinkList();
                LxDropdownService.open($scope);
            }
            else
            {
                linkList();
                LxDropdownService.close($scope);
            }
        });

        angular.element($window).on('resize', updatePositionAndSize);

        $scope.$on('$locationChangeSuccess', function()
        {
            $scope.lxDropdownIsOpened = false;
        });

        $scope.$on('$destroy', function()
        {
            dropdownMenu.remove();
            LxDropdownService.close($scope);
        });

        this.updatePositionAndSize = updatePositionAndSize;
    }])
    .directive('lxDropdown', function()
    {
        return {
            restrict: 'E',
            controller: 'LxDropdownController',
            templateUrl: 'dropdown.html',
            transclude: true,
            replace: true,
            scope: true,
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.registerDropdown(element);

                attrs.$observe('position', function(newValue)
                {
                    scope.lxDropdownPosition = newValue;
                });

                attrs.$observe('width', function(newValue)
                {
                    scope.lxDropdownWidth = newValue;
                });

                attrs.$observe('fromTop', function(newValue)
                {
                    scope.lxDropdownFromTop = newValue;
                });

                attrs.$observe('overToggle', function(newValue)
                {
                    scope.lxDropdownOverToggle = newValue;
                });

                attrs.$observe('escapeClose', function(newValue)
                {
                    scope.lxDropdownEscapeClose = newValue;
                });
            }
        };
    })
    .directive('lxDropdownToggle', function()
    {
        return {
            restrict: 'AE',
            require: '^lxDropdown',
            templateUrl: 'dropdown-toggle.html',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl)
            {
                element.on('click', function(event)
                {
                    event.stopPropagation();

                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });
            }
        };
    })
    .directive('lxDropdownMenu', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            require: '^lxDropdown',
            templateUrl: 'dropdown-menu.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl, transclude)
            {
                var timer;

                ctrl.registerDropdownMenu(element);
                element.on('click', function(event)
                {
                    event.stopPropagation();

                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                });

                scope.$watch(function()
                {
                    return element.html();
                }, function(newValue)
                {
                    if (timer)
                    {
                        $timeout.cancel(timer);
                    }

                    timer = $timeout(ctrl.updatePositionAndSize, 150); // debounce
                });
            }
        };
    }])
    .directive('lxDropdownFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.on('click', function(event)
                {
                    event.stopPropagation();
                });

                $timeout(function()
                {
                    element.find('input').focus();
                }, 200);
            }
        };
    }]);

(function() {
    'use strict';

    angular
        .module('lumx.fab', [])
        .directive('lxFab', lxFab)
        .directive('lxFabTrigger', lxFabTrigger)
        .directive('lxFabActions', lxFabActions);

    function lxFab()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'fab.html',
            scope: true,
            link: link,
            controller: LxFabController,
            controllerAs: 'lxFab',
            bindToController: true,
            transclude: true
        };

        return directive;

        function link(scope, element, attrs, ctrl)
        {
            attrs.$observe('lxDirection', function(newDirection)
            {
                ctrl.setFabDirection(newDirection);
            });

            scope.$watch(attrs.lxFabProgress, function(isLoading)
            {
                ctrl.setFabProgress(isLoading);
            });

            if (angular.isUndefined(attrs.lxFabProgressColor))
            {
                ctrl.setFabProgressColor('primary');
            }

            attrs.$observe('lxFabProgressColor', function(newColor)
            {
                ctrl.setFabProgressColor(newColor);
            });
        }
    }

    function LxFabController()
    {
        var lxFab = this;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxFab.setFabDirection = setFabDirection;
        lxFab.setFabProgress = setFabProgress;
        lxFab.setFabProgressColor = setFabProgressColor;

        //
        // PUBLIC METHODS
        //

        function setFabDirection(direction)
        {
            lxFab.lxDirection = direction;
        }

        function setFabProgress(isLoading)
        {
            lxFab.lxFabProgress = isLoading;
        }

        function setFabProgressColor(color)
        {
            lxFab.lxFabProgressColor = color;
        }
    }

    function lxFabTrigger()
    {
        var directive =
        {
            restrict: 'E',
            require: '^lxFab',
            templateUrl: 'fab-trigger.html',
            transclude: true,
            replace: true
        };

        return directive;
    }

    function lxFabActions()
    {
        var directive =
        {
            restrict: 'E',
            require: '^lxFab',
            templateUrl: 'fab-actions.html',
            link: link,
            transclude: true,
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrl)
        {
            scope.parentCtrl = ctrl;
        }
    }
})();

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.file-input', [])
    .directive('lxFileInput', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                value: '=',
                change: '&'
            },
            templateUrl: 'file-input.html',
            replace: true,
            link: function(scope, element)
            {
                var $input = element.find('input'),
                    $fileName = element.find('.input-file__filename');

                $input
                    .addClass('input-file__input')
                    .on('change', function()
                    {
                        $timeout(function()
                        {
                            setFileName($input.val());
                            element.addClass('input-file--is-focused');
                        });

                        // handle change function
                        if (angular.isDefined(scope.change))
                        {
                            // return the file element, the new value and the old value to the callback
                            scope.change({e: $input[0].files[0], newValue: $input.val(), oldValue: $fileName.text()});
                        }
                    })
                    .on('blur', function()
                    {
                        element.removeClass('input-file--is-focused');
                    });

                function setFileName(val)
                {
                    $input.val('');
                    if (val)
                    {
                        $fileName.text(val.replace(/C:\\fakepath\\/i, ''));

                        element.addClass('input-file--is-active');
                    }
                    else
                    {
                        $fileName.text('');
                        if (element.hasClass('input-file--is-active'))
                        {
                            element.removeClass('input-file--is-active');
                        }
                    }

                    scope.value = $fileName.text();
                }

                scope.$watch('value', function(value)
                {
                    setFileName(value);
                });
            }
        };
    }]);
/* global angular */
/* global window */
/* global document */
'use strict'; // jshint ignore:line


angular.module('lumx.notification', ['lumx.utils.event-scheduler'])
    .service('LxNotificationService', ['$injector', '$rootScope', '$timeout', 'LxEventSchedulerService', function($injector, $rootScope, $timeout, LxEventSchedulerService)
    {
        //
        // PRIVATE MEMBERS
        //
        var notificationList = [],
            dialogFilter,
            dialog,
            idEventScheduler;

        //
        // NOTIFICATION
        //

        // private
        function getElementHeight(elem)
        {
            return parseFloat(window.getComputedStyle(elem, null).height);
        }

        // private
        function moveNotificationUp()
        {
            var newNotifIndex = notificationList.length - 1;
            notificationList[newNotifIndex].height = getElementHeight(notificationList[newNotifIndex].elem[0]);

            var upOffset = 0;

            for (var idx = newNotifIndex; idx >= 0; idx--)
            {
                if (notificationList.length > 1 && idx !== newNotifIndex)
                {
                    upOffset = 24 + notificationList[newNotifIndex].height;

                    notificationList[idx].margin += upOffset;
                    notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
                }
            }
        }

        // private
        function deleteNotification(notification)
        {
            var notifIndex = notificationList.indexOf(notification);

            var dnOffset = 24 + notificationList[notifIndex].height;

            for (var idx = 0; idx < notifIndex; idx++)
            {
                if (notificationList.length > 1)
                {
                    notificationList[idx].margin -= dnOffset;
                    notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
                }
            }

            notification.elem.removeClass('notification--is-shown');

            $timeout(function()
            {
                notification.elem.remove();
                notificationList.splice(notifIndex, 1);
            }, 400);
        }

        function notify(text, icon, sticky, color)
        {
            var notificationTimeout;
            var notification = angular.element('<div/>', {
                class: 'notification'
            });

            var notificationText = angular.element('<span/>', {
                class: 'notification__content',
                html: text
            });

            if (angular.isDefined(icon))
            {
                var notificationIcon = angular.element('<i/>', {
                    class: 'notification__icon mdi mdi-' + icon
                });

                notification
                    .addClass('notification--has-icon')
                    .append(notificationIcon);
            }

            if (angular.isDefined(color))
            {
                notification.addClass('notification--' + color);
            }

            notification
                .append(notificationText)
                .appendTo('body');

            $timeout(function()
            {
                notification.addClass('notification--is-shown');
            }, 100);

            var data = { elem: notification, margin: 0 };
            notificationList.push(data);
            moveNotificationUp();

            notification.bind('click', function()
            {
                deleteNotification(data);

                if(angular.isDefined(notificationTimeout))
                {
                    $timeout.cancel(notificationTimeout);
                }
            });

            if (angular.isUndefined(sticky) || !sticky)
            {
                notificationTimeout = $timeout(function()
                {
                    deleteNotification(data);
                }, 6000);
            }
        }

        function success(text, sticky)
        {
            notify(text, 'check', sticky, 'green');
        }

        function error(text, sticky)
        {
            notify(text, 'alert-circle', sticky, 'red');
        }

        function warning(text, sticky)
        {
            notify(text, 'alert', sticky, 'orange');
        }

        function info(text, sticky)
        {
            notify(text, 'information-outline', sticky, 'blue');
        }


        //
        // ALERT & CONFIRM
        //

        // private
        function buildDialogHeader(title)
        {
            // DOM elements
            var dialogHeader = angular.element('<div/>', {
                class: 'dialog__header p++ fs-title',
                text: title
            });

            return dialogHeader;
        }

        // private
        function buildDialogContent(text)
        {
            // DOM elements
            var dialogContent = angular.element('<div/>', {
                class: 'dialog__content p++ pt0 tc-black-2',
                text: text
            });

            return dialogContent;
        }

        // private
        function buildDialogActions(buttons, callback, unbind)
        {
            var $compile = $injector.get('$compile');

            // DOM elements
            var dialogActions = angular.element('<div/>', {
                class: 'dialog__actions'
            });

            var dialogLastBtn = angular.element('<button/>', {
                class: 'btn btn--m btn--blue btn--flat',
                text: buttons.ok
            });

            // Cancel button
            if (angular.isDefined(buttons.cancel))
            {
                // DOM elements
                var dialogFirstBtn = angular.element('<button/>', {
                    class: 'btn btn--m btn--red btn--flat',
                    text: buttons.cancel
                });

                // Compilation
                dialogFirstBtn.attr('lx-ripple', '');
                $compile(dialogFirstBtn)($rootScope);

                // DOM link
                dialogActions.append(dialogFirstBtn);

                // Event management
                dialogFirstBtn.bind('click', function()
                {
                    callback(false);
                    closeDialog();
                });
            }

            // Compilation
            dialogLastBtn.attr('lx-ripple', '');
            $compile(dialogLastBtn)($rootScope);

            // DOM link
            dialogActions.append(dialogLastBtn);

            // Event management
            dialogLastBtn.bind('click', function()
            {
                callback(true);
                closeDialog();
            });

            if (!unbind)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', function(event)
                {
                    if (event.keyCode == 13)
                    {
                        callback(true);
                        closeDialog();
                    }
                    else if (event.keyCode == 27)
                    {
                        callback(angular.isUndefined(buttons.cancel));
                        closeDialog();
                    }

                    event.stopPropagation();
                });
            }

            return dialogActions;
        }

        function confirm(title, text, buttons, callback, unbind)
        {
            // DOM elements
            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>', {
                class: 'dialog dialog--alert'
            });

            var dialogHeader = buildDialogHeader(title);
            var dialogContent = buildDialogContent(text);
            var dialogActions = buildDialogActions(buttons, callback, unbind);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body')
                .show()
                .focus();

            // Starting animaton
            $timeout(function()
            {
                angular.element(document.activeElement).blur();

                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }

        function alert(title, text, button, callback, unbind)
        {
            // DOM elements
            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>', {
                class: 'dialog dialog--alert'
            });

            var dialogHeader = buildDialogHeader(title);
            var dialogContent = buildDialogContent(text);
            var dialogActions = buildDialogActions({ ok: button }, callback, unbind);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body')
                .show()
                .focus();

            // Starting animaton
            $timeout(function()
            {
                angular.element(document.activeElement).blur();

                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }

        // private
        function closeDialog()
        {
            if (angular.isDefined(idEventScheduler))
            {
                $timeout(function() {
                    LxEventSchedulerService.unregister(idEventScheduler);
                    idEventScheduler = undefined;
                }, 1);
            }

            // Starting animaton
            dialogFilter.removeClass('dialog-filter--is-shown');
            dialog.removeClass('dialog--is-shown');

            // After animaton
            $timeout(function()
            {
                dialogFilter.remove();
                dialog.remove();
            }, 600);
        }

        // Public API
        return {
            alert: alert,
            confirm: confirm,
            error: error,
            info: info,
            notify: notify,
            success: success,
            warning: warning
        };
    }]);

(function() {
    'use strict';

    angular
        .module('lumx.progress', [])
        .directive('lxProgress', lxProgress);

    function lxProgress()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'progress.html',
            scope: {
                lxType: '@?',
                lxDiameter: '@?',
                lxColor: '@?',
            },
            controller: LxProgressController,
            controllerAs: 'lxProgress',
            bindToController: true
        };

        return directive;
    }

    function LxProgressController()
    {
        var lxProgress = this;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public members
        lxProgress.getProgressDiameter = getProgressDiameter;

        //
        // PRIVATE METHODS
        //

        /**
         * Initialize the controller
         */
        function _init()
        {
            lxProgress.lxDiameter =  angular.isDefined(lxProgress.lxDiameter) ? lxProgress.lxDiameter : 50;
            lxProgress.lxColor =  angular.isDefined(lxProgress.lxColor) ? lxProgress.lxColor : 'primary';
        }

        //
        // PUBLIC METHODS
        //

        /**
         * Get circular progress diameter
         */
        function getProgressDiameter()
        {
            if (lxProgress.lxType === 'circular')
            {
                return { 'transform': 'scale(' + parseInt(lxProgress.lxDiameter) / 100 + ')' };
            }

            return;
        }

        //
        // INITIALIZATION
        //

        _init();
    }
})();

(function() {
    'use strict';

    angular
        .module('lumx.progress')
        .service('LxProgressService', LxProgressService);

    LxProgressService.$inject = ['$compile', '$rootScope', '$timeout'];

    function LxProgressService($compile, $rootScope, $timeout)
    {
        var service = {
            circular: {
                show: showProgressCircular,
                hide: hideProgressCircular
            },
            linear: {
                show: showProgressLinear,
                hide: hideProgressLinear
            }
        };

        var _progressCircular;
        var _progressCircularIsShown = false;
        var _progressLinear;
        var _progressLinearIsShown = false;

        return service;

        //
        // PUBLIC METHODS
        //

        /**
         * Hide circular progress
         */
        function hideProgressCircular()
        {
            if (_progressCircularIsShown)
            {
                _progressCircularIsShown = false;
                _progressCircular.remove();
            }
        }

        /**
         * Hide linear progress
         */
        function hideProgressLinear()
        {
            if (_progressLinearIsShown)
            {
                _progressLinearIsShown = false;
                _progressLinear.remove();
            }
        }

        /**
         * Show circular progress
         */
        function showProgressCircular(color, container)
        {
            if (!_progressCircularIsShown)
            {
                var progressCircularColor = angular.isDefined(color) ? color : 'primary';
                var progressCircularContainer = angular.isDefined(container) ? container : 'body';

                _progressCircular = $compile('<lx-progress lx-type="circular" lx-color="' + progressCircularColor + '"></lx-progress>')($rootScope);

                $timeout(function()
                {
                    angular.element(progressCircularContainer).append(_progressCircular[0]);

                    _progressCircularIsShown = true;
                });
            }
        }

        /**
         * Show linear progress
         */
        function showProgressLinear(color, container)
        {
            if (!_progressLinearIsShown)
            {
                var progressLinearColor = angular.isDefined(color) ? color : 'primary';
                var progressLinearContainer = angular.isDefined(container) ? container : 'body';

                _progressLinear = $compile('<lx-progress lx-type="linear" lx-color="' + progressLinearColor + '"></lx-progress>')($rootScope);

                $timeout(function()
                {
                    angular.element(progressLinearContainer).append(_progressLinear[0]);

                    _progressLinearIsShown = true;
                });
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('lumx.radio-button', [])
        .directive('lxRadioGroup', lxRadioGroup)
        .directive('lxRadioButton', lxRadioButton)
        .directive('lxRadioButtonLabel', lxRadioButtonLabel)
        .directive('lxRadioButtonHelp', lxRadioButtonHelp);

    function lxRadioGroup()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'radio-group.html',
            transclude: true
        };

        return directive;
    }

    function lxRadioButton()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'radio-button.html',
            scope: {
                name: '@',
                value: '@?',
                ngModel: '=',
                ngValue: '=?',
                ngChange: '&?',
                ngDisabled: '=?',
                lxColor: '@?'
            },
            controller: LxRadioButtonController,
            controllerAs: 'lxRadioButton',
            bindToController: true,
            transclude: true
        };

        return directive;
    }

    LxRadioButtonController.$inject = ['LxUtils'];

    function LxRadioButtonController(LxUtils)
    {
        var lxRadioButton = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _radioButtonId;
        var _radioButtonHasChildren;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxRadioButton.getRadioButtonId = getRadioButtonId;
        lxRadioButton.getRadioButtonHasChildren = getRadioButtonHasChildren;
        lxRadioButton.setRadioButtonId = setRadioButtonId;
        lxRadioButton.setRadioButtonHasChildren = setRadioButtonHasChildren;

        //
        // PRIVATE METHODS
        //

        /**
         * Initialize the controller
         */
        function _init()
        {
            setRadioButtonId(LxUtils.generateUUID());
            setRadioButtonHasChildren(false);

            if (angular.isDefined(lxRadioButton.value) && angular.isUndefined(lxRadioButton.ngValue))
            {
                lxRadioButton.ngValue = lxRadioButton.value;
            }

            lxRadioButton.lxColor =  angular.isUndefined(lxRadioButton.lxColor) ? 'accent' : lxRadioButton.lxColor;
        }

        //
        // PUBLIC METHODS
        //

        function getRadioButtonId()
        {
            return _radioButtonId;
        }

        function getRadioButtonHasChildren()
        {
            return _radioButtonHasChildren;
        }

        function setRadioButtonId(radioButtonId)
        {
            _radioButtonId = radioButtonId;
        }

        function setRadioButtonHasChildren(radioButtonHasChildren)
        {
            _radioButtonHasChildren = radioButtonHasChildren;
        }

        //
        // INITIALIZATION
        //

        _init();
    }

    function lxRadioButtonLabel()
    {
        var directive =
        {
            restrict: 'AE',
            require: ['^lxRadioButton', '^lxRadioButtonLabel'],
            templateUrl: 'radio-button-label.html',
            link: link,
            controller: LxRadioButtonLabelController,
            controllerAs: 'lxRadioButtonLabel',
            bindToController: true,
            transclude: true,
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setRadioButtonHasChildren(true);
            ctrls[1].setRadioButtonId(ctrls[0].getRadioButtonId());
        }
    }

    function LxRadioButtonLabelController()
    {
        var lxRadioButtonLabel = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _radioButtonId;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxRadioButtonLabel.getRadioButtonId = getRadioButtonId;
        lxRadioButtonLabel.setRadioButtonId = setRadioButtonId;

        //
        // PUBLIC METHODS
        //

        function getRadioButtonId()
        {
            return _radioButtonId;
        }

        function setRadioButtonId(radioButtonId)
        {
            _radioButtonId = radioButtonId;
        }
    }

    function lxRadioButtonHelp()
    {
        var directive =
        {
            restrict: 'AE',
            require: '^lxRadioButton',
            templateUrl: 'radio-button-help.html',
            transclude: true,
            replace: true
        };

        return directive;
    }
})();

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.ripple', [])
    .directive('lxRipple', ['$timeout', function($timeout)
    {
        return {
            restrict: 'A',
            link: function(scope, element, attrs)
            {
                var timeout;

                element
                    .css({
                        position: 'relative',
                        overflow: 'hidden'
                    })
                    .bind('mousedown', function(e)
                    {
                        var ripple;

                        if (element.find('.ripple').length === 0)
                        {
                            ripple = angular.element('<span/>', {
                                class: 'ripple'
                            });

                            if (attrs.lxRipple)
                            {
                                ripple.addClass('bgc-' + attrs.lxRipple);
                            }

                            element.prepend(ripple);
                        }
                        else
                        {
                            ripple = element.find('.ripple');
                        }

                        ripple.removeClass('ripple--is-animated');

                        if (!ripple.height() && !ripple.width())
                        {
                            var diameter = Math.max(element.outerWidth(), element.outerHeight());

                            ripple.css({ height: diameter, width: diameter });
                        }

                        var x = e.pageX - element.offset().left - ripple.width() / 2;
                        var y = e.pageY - element.offset().top - ripple.height() / 2;

                        ripple.css({ top: y+'px', left: x+'px' }).addClass('ripple--is-animated');

                        timeout = $timeout(function()
                        {
                            ripple.removeClass('ripple--is-animated');
                        }, 651);
                    });

                scope.$on('$destroy', function()
                {
                    $timeout.cancel(timeout);
                });
            }
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.scrollbar', [])
    .service('LxScrollbarService', ['$window', '$timeout', function($window, $timeout)
    {
        var scopeMap = {};

        function update()
        {
            angular.element($window).trigger('resize');
        }

        function setScrollPercent(id, newVal)
        {
            if(angular.isDefined(id) && id !== '')
            {
                $timeout(function() {
                    scopeMap[id] = newVal;
                });
            }
        }

        function getScrollPercent(id)
        {
            return scopeMap[id];
        }

        return {
            update: update,
            setScrollPercent: setScrollPercent,
            getScrollPercent: getScrollPercent
        };

    }])
    .controller('LxScrollbarController', ['$scope', '$window', 'LxScrollbarService',
        function($scope, $window, LxScrollbarService)
    {
        var mousePosition,
            scrollbarId,
            scrollbarContainer,
            scrollbarContainerHeight,
            scrollbarContent,
            scrollbarContentHeight,
            scrollbarYAxis,
            scrollbarYAxisHandle,
            scrollbarYAxisHandlePosition,
            scrollBottom;

        this.setElementId = function(id)
        {
            scrollbarId = id;
        };

        this.init = function(element)
        {
            scrollbarContainer = element;

            scrollbarContainer
                .addClass('scrollbar-container')
                .wrapInner('<div class="scrollbar-content"></div>');

            scrollbarContent = scrollbarContainer.find('.scrollbar-content');

            scrollbarYAxis = angular.element('<div/>', {
                class: 'scrollbar-y-axis'
            });

            scrollbarYAxisHandle = angular.element('<div/>', {
                class: 'scrollbar-y-axis__handle'
            });

            scrollbarYAxis
                .append(scrollbarYAxisHandle)
                .prependTo(scrollbarContainer);

            scrollbarYAxisHandle.bind('mousedown', function()
            {
                var handlePosition,
                    scrollPercent,
                    scrollPosition;

                angular.element($window).bind('mousemove', function(event)
                {
                    if ($window.innerWidth >= 1024)
                    {
                        event.preventDefault();

                        scrollbarYAxis.addClass('scrollbar-y-axis--is-dragging');

                        if (angular.isUndefined(mousePosition))
                        {
                            mousePosition = event.pageY;
                        }

                        if (angular.isUndefined(scrollbarYAxisHandlePosition))
                        {
                            scrollbarYAxisHandlePosition = scrollbarYAxisHandle.position().top;
                        }

                        handlePosition = (event.pageY - mousePosition) + scrollbarYAxisHandlePosition;
                        scrollPercent = handlePosition / (scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight());
                        scrollPosition = scrollBottom * scrollPercent;

                        updateScroll(handlePosition, scrollPosition);
                    }
                });
            });

            angular.element($window).bind('mouseup', function()
            {
                if ($window.innerWidth >= 1024)
                {
                    scrollbarYAxis.removeClass('scrollbar-y-axis--is-dragging');

                    mousePosition = undefined;
                    scrollbarYAxisHandlePosition = undefined;

                    angular.element($window).unbind('mousemove');
                }
            });

            scrollbarContainer.bind('mousewheel', function(event)
            {
                if ($window.innerWidth >= 1024)
                {
                    event.preventDefault();

                    var scrollPercent = scrollbarContainer.scrollTop() / scrollBottom,
                        scrollPosition = (scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight()) * scrollPercent;

                    updateScroll(scrollPosition, scrollbarContainer.scrollTop() + event.originalEvent.wheelDelta * -1);
                }
            });

            $scope.$watch(function()
            {
                return scrollbarContainer.outerHeight() || scrollbarContent.outerHeight();
            },
            function(newValue)
            {
                if (angular.isNumber(newValue) && $window.innerWidth >= 1024)
                {
                    initScrollbar();
                }
            });
        };

        function initScrollbar()
        {
            scrollbarContainerHeight = scrollbarContainer.outerHeight();
            scrollbarContentHeight = scrollbarContent.outerHeight();
            scrollBottom = scrollbarContentHeight - scrollbarContainerHeight;

            if (scrollbarContentHeight <= scrollbarContainerHeight)
            {
                scrollbarYAxis.hide();
            }
            else
            {
                scrollbarYAxis.show();

                updatePosition(0, 0);

                scrollbarYAxis.css({ height: scrollbarContainerHeight });
                scrollbarYAxisHandle.css({ height: (scrollbarContainerHeight / scrollbarContentHeight) * 100 + '%' });
            }
        }

        function updateScroll(handlePosition, scrollPosition)
        {
            if (scrollPosition >= 0 && scrollPosition <= scrollBottom)
            {
                updatePosition(handlePosition, scrollPosition);
            }
            else
            {
                if (scrollPosition < 0)
                {
                    updatePosition(0, 0);
                }
                else
                {
                    updatePosition(scrollbarContainerHeight - scrollbarYAxisHandle.outerHeight(), scrollBottom);
                }
            }
        }

        function updatePosition(handlePosition, scrollPosition)
        {
            scrollbarYAxisHandle.css({ top: handlePosition });
            scrollbarYAxis.css({ top: scrollPosition });
            scrollbarContainer.scrollTop(scrollPosition);
            if(angular.isDefined(scrollbarId))
            {
                LxScrollbarService.setScrollPercent(scrollbarId, (scrollPosition / scrollBottom) * 100);
            }
        }

        angular.element($window).bind('resize', function()
        {
            if ($window.innerWidth < 1024)
            {
                scrollbarYAxis.hide();
            }
            else
            {
                initScrollbar();
            }
        });
    }])
    .directive('lxScrollbar', function()
    {
        return {
            restrict: 'AE',
            controller: 'LxScrollbarController',
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);
                attrs.$observe('id', function (id)
                {
                    if (angular.isDefined(id))
                    {
                        ctrl.setElementId(id);
                    }
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.search-filter', [])
    .directive('lxSearchFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'search-filter.html',
            scope: {
                model: '=?',
                theme: '@',
                placeholder: '@'
            },
            link: function(scope, element, attrs)
            {
                var $input = element.find('.search-filter__input'),
                    $label = element.find('.search-filter__label'),
                    $searchFilter = element.find('.search-filter'),
                    $searchFilterContainer = element.find('.search-filter__container');

                scope.closed = angular.isDefined(attrs.closed);

                if (angular.isUndefined(scope.theme))
                {
                    scope.theme = 'light';
                }

                attrs.$observe('filterWidth', function(filterWidth)
                {
                    $searchFilterContainer.css({ width: filterWidth });
                });

                // Events
                $input
                    .on('blur', function()
                    {
                        if (angular.isDefined(attrs.closed) && !$input.val())
                        {
                            $searchFilter.velocity({ 
                                width: 40
                            }, {
                                duration: 400,
                                easing: 'easeOutQuint',
                                queue: false
                            });
                        }
                    });

                $label.on('click', function()
                {
                    if (angular.isDefined(attrs.closed))
                    {
                        $searchFilter.velocity({ 
                            width: attrs.filterWidth ? attrs.filterWidth: 240
                        }, {
                            duration: 400,
                            easing: 'easeOutQuint',
                            queue: false
                        });

                        $timeout(function()
                        {
                            $input.focus();
                        }, 401);
                    }
                    else
                    {
                        $input.focus();
                    }
                });

                scope.clear = function()
                {
                    scope.model = undefined;

                    $input.focus();
                };
            }
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line

angular.module('lumx.select', [])
    .filter('filterChoices', ['$filter', function($filter)
    {
        return function(choices, externalFilter, textFilter)
        {
            if (externalFilter)
            {
                return choices;
            }

            var toFilter = [];

            if (!angular.isArray(choices))
            {
                if (angular.isObject(choices))
                {
                    for (var idx in choices)
                    {
                        if (angular.isArray(choices[idx]))
                        {
                            toFilter = toFilter.concat(choices[idx]);
                        }
                    }
                }
            }
            else
            {
                toFilter = choices;
            }

            return $filter('filter')(toFilter, textFilter);
        };
    }])
    .controller('LxSelectController', ['$scope', '$filter', '$compile', '$sce', '$timeout', '$interpolate',
                                       function($scope, $filter, $compile, $sce, $timeout, $interpolate)
    {
        var newModel = false,
            newSelection = true,
            newScope;

        $scope.lxSelectData = {
            filter: '',
            selected: [],
            loading: false
        };

        function arrayObjectIndexOf(arr, obj)
        {
            for (var i = 0; i < arr.length; i++)
            {
                if (angular.equals(arr[i], obj))
                {
                    return i;
                }
            }
            return -1;
        }


        // Link methods
        this.registerTransclude = function(transclude)
        {
            $scope.lxSelectData.selectedTransclude = transclude;
        };

        this.getScope = function()
        {
            return $scope;
        };

        // Selection management
        function select(choice)
        {
            newSelection = false;
            if ($scope.lxSelectMultiple)
            {
                if (arrayObjectIndexOf($scope.lxSelectData.selected, choice) === -1)
                {
                    $scope.lxSelectData.selected.push(choice);
                }
            }
            else
            {
                $scope.lxSelectData.selected = [choice];
            }
        }

        function unselect(element, event, stopEvent)
        {
            newSelection = false;
            if (!$scope.lxSelectAllowClear && !$scope.lxSelectMultiple)
            {
                return;
            }

            if (angular.isDefined(event) && (!$scope.lxSelectMultiple || stopEvent))
            {
                event.stopPropagation();
            }

            var index = arrayObjectIndexOf($scope.lxSelectData.selected, element);
            if (index !== -1)
            {
                $scope.lxSelectData.selected.splice(index, 1);
            }
        }

        function toggle(choice, event)
        {
            if (angular.isDefined(event) && $scope.lxSelectMultiple)
            {
                event.stopPropagation();
            }

            if ($scope.lxSelectMultiple && isSelected(choice))
            {
                unselect(choice);
            }
            else
            {
                select(choice);
            }
        }

        // Getters
        function isSelected(choice)
        {
            return angular.isDefined($scope.lxSelectData.selected) && arrayObjectIndexOf($scope.lxSelectData.selected, choice) !== -1;
        }

        function hasNoResults()
        {
            return angular.isUndefined($scope.lxSelectChoices()) || $filter('filterChoices')($scope.lxSelectChoices(), $scope.lxSelectFilter, $scope.lxSelectData.filter).length === 0;
        }

        function filterNeeded()
        {
            return angular.isDefined($scope.lxSelectMinLength) && angular.isDefined($scope.lxSelectData.filter) && $scope.lxSelectData.filter.length < $scope.lxSelectMinLength;
        }

        function isHelperVisible()
        {
            return $scope.lxSelectLoading !== 'true' && (filterNeeded() || (hasNoResults() && !filterNeeded()));
        }

        function isChoicesVisible()
        {
            return $scope.lxSelectLoading !== 'true' && !hasNoResults() && !filterNeeded();
        }

        function isChoicesArray()
        {
            return angular.isArray($scope.lxSelectChoices());
        }

        function trust(data)
        {
            return $sce.trustAsHtml(data);
        }

        /**
         * Return the array of selected elements. Always return an array (ie. returns an empty array in case
         * selected list is undefined in the scope).
         */
        function getSelectedElements()
        {
            return angular.isDefined($scope.lxSelectData.selected) ? $scope.lxSelectData.selected : [];
        }

        function convertValue(newValue, conversion, callback)
        {
            var convertedData = $scope.lxSelectMultiple ? [] : undefined;
            var loading = [];

            if (!newValue || ($scope.lxSelectMultiple && newValue.length === 0))
            {
                callback(convertedData);
                return;
            }

            $scope.lxSelectData.loading = true;
            if ($scope.lxSelectMultiple)
            {
                if (angular.isDefined(conversion))
                {
                    var callbackCalled = false;
                    var convertionCallback = function(idx)
                    {
                        return function(data)
                        {
                            // Timeout to be sure for the callbacks to be executed after the for loop is finished
                            $timeout(function()
                            {
                                // Add the result in the selected list and remove the index from the loading list
                                if (data !== undefined)
                                {
                                    convertedData.splice(idx, 0, data);
                                }
                                loading.splice(loading.indexOf(idx), 1);

                                // If the loading list is empty, update the $scope and stop the loading animation
                                if (loading.length === 0 && !callbackCalled)
                                {
                                    callbackCalled = true;
                                    $scope.lxSelectData.loading = false;
                                    callback(convertedData);
                                }
                            });
                        };
                    };

                    for (var idx in newValue)
                    {
                        loading.push(idx);

                        // Call the method
                        conversion(newValue[idx], convertionCallback(idx));
                    }
                }
                else
                {
                    callback(newValue);
                }
            }
            else
            {
                if (angular.isDefined(conversion))
                {
                    $scope.lxSelectData.loading = true;
                    conversion(newValue, function(data)
                    {
                        $scope.lxSelectData.loading = false;
                        callback(data);
                    });
                }
                else
                {
                    callback(newValue);
                }
            }
        }

        // Watchers
        $scope.$watch('lxSelectNgModel.$modelValue', function(newValue)
        {
            if (newModel)
            {
                newModel = false;
                return;
            }

            convertValue(newValue,
                         $scope.lxSelectModelToSelection,
                         function(newConvertedValue)
            {
                newSelection = true;

                var value = newConvertedValue !== undefined ? angular.copy(newConvertedValue) : [];
                if (!$scope.lxSelectMultiple)
                {
                    value = newConvertedValue !== undefined ? [angular.copy(newConvertedValue)] : [];
                }

                $scope.lxSelectData.selected = value;
                $scope.$selected = !$scope.lxSelectMultiple && $scope.lxSelectGetSelectedElements().length === 1 ? $scope.lxSelectGetSelectedElements()[0] : undefined;
            });
        });

        $scope.$watch('lxSelectData.selected', function(newValue)
        {
            if (angular.isDefined(newValue) && angular.isDefined($scope.lxSelectData.selectedTransclude))
            {
                if (newScope)
                {
                    newScope.$destroy();
                }

                newScope = $scope.$new();
                $scope.lxSelectData.selectedTemplate = { html: '', selected: {} };

                angular.forEach(newValue, function(selectedElement, key)
                {
                    newScope.$selected = selectedElement;
                    $scope.lxSelectData.selectedTemplate.selected[key] = selectedElement;

                    $scope.lxSelectData.selectedTransclude(newScope, function(clone)
                    {
                        var div = angular.element('<div/>');
                        var wrapper = angular.element('<div/>').append(clone);
                        var content = $compile(wrapper.html())(newScope);
                        clone.html($interpolate(content.html())(newScope));

                        if ($scope.lxSelectMultiple)
                        {
                            if ($scope.lxSelectAllowClear || newValue.length > 1)
                            {
                                var deleteButton = angular.element('<i class="lx-select__delete-button" ng-click="lxSelectUnselect(lxSelectTranscludeSelected[' + key + '], $event, true)"></i>');
                                clone.append(deleteButton);
                            }
                        }

                        div.append(clone);

                        if ($scope.lxSelectMultiple)
                        {
                            div.find('span').addClass('lx-select__tag');
                        }

                        $scope.lxSelectData.selectedTemplate.html += div.html();
                    });
                });
            }

            if (newSelection)
            {
                newSelection = false;
                return;
            }

            var data = newValue;
            if(!$scope.lxSelectMultiple)
            {
                if (newValue)
                {
                    data = newValue[0];
                }
                else
                {
                    data = undefined;
                }
            }

            convertValue(data,
                         $scope.lxSelectSelectionToModel,
                         function(newConvertedValue)
            {
                newModel = true;

                if ($scope.lxSelectChange)
                {
                    $scope.lxSelectChange({ newValue: angular.copy(newConvertedValue), oldValue: angular.copy($scope.lxSelectNgModel.$modelValue) });
                }
                $scope.lxSelectNgModel.$setViewValue(angular.copy(newConvertedValue));
                $scope.$selected = !$scope.lxSelectMultiple && $scope.lxSelectGetSelectedElements().length === 1 ? $scope.lxSelectGetSelectedElements()[0] : undefined;
            });
        }, true);

        $scope.$watch('lxSelectData.filter', function(newValue, oldValue)
        {
            if (newValue !== oldValue && (angular.isUndefined($scope.lxSelectMinLength) || (newValue && $scope.lxSelectMinLength <= newValue.length)))
            {
                if ($scope.lxSelectFilter)
                {
                    $scope.lxSelectFilter(newValue, oldValue);
                }
            }
        });

        // Public API
        $scope.lxSelectSelect = select;
        $scope.lxSelectUnselect = unselect;
        $scope.lxSelectToggle = toggle;
        $scope.lxSelectIsChoicesVisible = isChoicesVisible;
        $scope.lxSelectIsHelperVisible = isHelperVisible;
        $scope.lxSelectIsSelected = isSelected;
        $scope.lxSelectFilterNeeded = filterNeeded;
        $scope.lxSelectGetSelectedElements = getSelectedElements;
        $scope.lxSelectHasNoResults = hasNoResults;
        $scope.lxSelectIsChoicesArray = isChoicesArray;
        $scope.lxSelectTrust = trust;
    }])
    .directive('lxSelect', function()
    {
        return {
            restrict: 'AE',
            controller: 'LxSelectController',
            require: '?ngModel',
            scope: true,
            templateUrl: 'select.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ngModel)
            {
                scope.lxSelectMultiple = angular.isDefined(attrs.multiple) && scope.$eval(attrs.multiple) !== false;
                scope.lxSelectDefaultMaxResults = angular.isDefined(attrs.maxResults) ? scope.$eval(attrs.maxResults) : 100;
                scope.lxSelectFloatingLabel = angular.isDefined(attrs.floatingLabel);
                scope.lxSelectTree = angular.isDefined(attrs.tree);
                scope.lxSelectNgModel = ngModel;

                // Default values
                scope.lxSelectCustom = undefined;
                scope.lxSelectPlaceholder = '';
                scope.lxSelectLoading = '';
                scope.lxSelectMinLength = undefined;
                scope.lxSelectAllowClear = '';
                scope.lxSelectChoices = function() { return []; };
                scope.lxSelectDisabled = undefined;
                scope.lxSelectError = undefined;
                scope.lxSelectValid = undefined;
                scope.lxSelectChange = undefined;
                scope.lxSelectFilter = undefined;
                scope.lxSelectSelectionToModel = undefined;
                scope.lxSelectModelToSelection = undefined;

                attrs.$observe('custom', function(newValue)
                {
                    scope.lxSelectCustom = newValue;
                });

                attrs.$observe('placeholder', function(newValue)
                {
                    scope.lxSelectPlaceholder = newValue;
                });

                attrs.$observe('loading', function(newValue)
                {
                    scope.lxSelectLoading = newValue;
                });

                attrs.$observe('minLength', function(newValue)
                {
                    scope.lxSelectMinLength = newValue;
                });

                attrs.$observe('allowClear', function(newValue)
                {
                    scope.lxSelectAllowClear = newValue;
                });

                attrs.$observe('disabled', function(newValue)
                {
                    scope.lxSelectDisabled = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('error', function(newValue)
                {
                    scope.lxSelectError = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('valid', function(newValue)
                {
                    scope.lxSelectValid = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('choices', function(newValue)
                {
                    scope.lxSelectChoices = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('change', function(newValue)
                {
                    scope.lxSelectChange = function(newData, oldData)
                    {
                        return scope.$eval(newValue, { newValue: newData, oldValue: oldData });
                    };
                });

                attrs.$observe('filter', function(newValue)
                {
                    scope.lxSelectFilter = function(newFilter, oldFilter)
                    {
                        return scope.$eval(newValue, { newValue: newFilter, oldValue: oldFilter });
                    };
                });

                var selectionToModel = function(newValue)
                {
                    scope.lxSelectSelectionToModel = function(selection, callback)
                    {
                        return scope.$eval(newValue, { data: selection, callback: callback });
                    };
                };

                if (angular.isDefined(attrs.selectionToModel))
                {
                    selectionToModel(attrs.selectionToModel);
                }

                attrs.$observe('selectionToModel', selectionToModel);

                var modelToSelection = function(newValue)
                {
                    scope.lxSelectModelToSelection = function(model, callback)
                    {
                        return scope.$eval(newValue, { data: model, callback: callback });
                    };
                };

                if (angular.isDefined(attrs.modelToSelection))
                {
                    modelToSelection(attrs.modelToSelection);
                }

                attrs.$observe('modelToSelection', modelToSelection);
            }
        };
    })
    .directive('lxSelectSelected', function()
    {
        return {
            restrict: 'E',
            require: '^lxSelect',
            templateUrl: 'select-selected.html',
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude)
            {
                ctrl.registerTransclude(transclude);
            }
        };
    })
    .directive('lxSelectChoices', function()
    {
        return {
            restrict: 'E',
            require: '^lxSelect',
            templateUrl: 'select-choices.html',
            transclude: true
        };
    })
    .directive('lxSelectChoicesSelected', ['$compile', '$parse', function($compile, $parse)
    {
        return {
            restrict: 'E',
            link: function(scope, element, attrs)
            {
                scope.$watch(attrs.content, function()
                {
                    var data = scope.$eval(attrs.content);

                    scope.lxSelectTranscludeSelected = data.selected;

                    element.html(data.html);
                    $compile(element.contents())(scope);
                }, true);
            }
        };
    }]);

(function() {
    'use strict';

    angular
        .module('lumx.switch', [])
        .directive('lxSwitch', lxSwitch)
        .directive('lxSwitchLabel', lxSwitchLabel)
        .directive('lxSwitchHelp', lxSwitchHelp);

    function lxSwitch()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'switch.html',
            scope: {
                ngModel: '=',
                name: '@?',
                ngTrueValue: '@?',
                ngFalseValue: '@?',
                ngChange: '&?',
                ngDisabled: '=?',
                lxColor: '@?'
            },
            controller: LxSwitchController,
            controllerAs: 'lxSwitch',
            bindToController: true,
            transclude: true
        };

        return directive;
    }

    LxSwitchController.$inject = ['LxUtils'];

    function LxSwitchController(LxUtils)
    {
        var lxSwitch = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _switchId;
        var _switchHasChildren;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxSwitch.getSwitchId = getSwitchId;
        lxSwitch.getSwitchHasChildren = getSwitchHasChildren;
        lxSwitch.setSwitchId = setSwitchId;
        lxSwitch.setSwitchHasChildren = setSwitchHasChildren;

        //
        // PRIVATE METHODS
        //

        /**
         * Initialize the controller
         */
        function _init()
        {
            setSwitchId(LxUtils.generateUUID());
            setSwitchHasChildren(false);

            lxSwitch.ngTrueValue = angular.isUndefined(lxSwitch.ngTrueValue) ? true : lxSwitch.ngTrueValue;
            lxSwitch.ngFalseValue = angular.isUndefined(lxSwitch.ngFalseValue) ? false : lxSwitch.ngFalseValue;
            lxSwitch.lxColor =  angular.isUndefined(lxSwitch.lxColor) ? 'accent' : lxSwitch.lxColor;
        }

        //
        // PUBLIC METHODS
        //

        function getSwitchId()
        {
            return _switchId;
        }

        function getSwitchHasChildren()
        {
            return _switchHasChildren;
        }

        function setSwitchId(switchId)
        {
            _switchId = switchId;
        }

        function setSwitchHasChildren(switchHasChildren)
        {
            _switchHasChildren = switchHasChildren;
        }

        //
        // INITIALIZATION
        //

        _init();
    }

    function lxSwitchLabel()
    {
        var directive =
        {
            restrict: 'AE',
            require: ['^lxSwitch', '^lxSwitchLabel'],
            templateUrl: 'switch-label.html',
            link: link,
            controller: LxSwitchLabelController,
            controllerAs: 'lxSwitchLabel',
            bindToController: true,
            transclude: true,
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setSwitchHasChildren(true);
            ctrls[1].setSwitchId(ctrls[0].getSwitchId());
        }
    }

    function LxSwitchLabelController()
    {
        var lxSwitchLabel = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _switchId;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        lxSwitchLabel.getSwitchId = getSwitchId;
        lxSwitchLabel.setSwitchId = setSwitchId;

        //
        // PUBLIC METHODS
        //

        function getSwitchId()
        {
            return _switchId;
        }

        function setSwitchId(switchId)
        {
            _switchId = switchId;
        }
    }

    function lxSwitchHelp()
    {
        var directive =
        {
            restrict: 'AE',
            require: '^lxSwitch',
            templateUrl: 'switch-help.html',
            transclude: true,
            replace: true
        };

        return directive;
    }
})();

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.tabs', [])
    .controller('LxTabsController', ['$scope', '$sce', '$timeout', '$window', function($scope, $sce, $timeout, $window)
    {
        var tabs = [],
            links,
            linksContainer,
            tabTags,
            indicator,
            paginationTranslation = 0;

        this.init = function(element)
        {
            links = element.find('.tabs__links');
            linksContainer = links.parent('.tabs');
            tabTags = links.find('.tabs-link');
            indicator = element.find('.tabs__indicator');
        };

        this.getScope = function()
        {
            return $scope;
        };

        this.addTab = function(tabScope)
        {
            tabs.push(tabScope);

            $timeout(function()
            {
                setIndicatorPosition();
            });

            return (tabs.length - 1);
        };

        this.removeTab = function(tabScope)
        {
            var idx = tabs.indexOf(tabScope);

            if (idx !== -1)
            {
                for (var tabIdx = idx + 1; tabIdx < tabs.length; ++tabIdx)
                {
                    --tabs[tabIdx].lxTabIndex;
                }

                tabs.splice(idx, 1);

                if (idx === $scope.lxTabsActiveTab)
                {
                    $scope.lxTabsActiveTab = 0;
                    $timeout(function()
                    {
                        setIndicatorPosition(idx);
                    });
                }
                else if(idx < $scope.lxTabsActiveTab)
                {
                    var old = $scope.lxTabsActiveTab;
                    $scope.lxTabsActiveTab = old - 1;

                    $timeout(function()
                    {
                        setIndicatorPosition(old);
                    });
                }
                else
                {
                    $timeout(function()
                    {
                        setIndicatorPosition();
                    });
                }
            }
        };

        function isPaginationActive()
        {
            var tabsWidth = links.outerWidth();
            var tabsVisibleWidth = linksContainer.outerWidth();

            return tabsWidth > tabsVisibleWidth;
        }

        function getFirstHiddenLeftTab()
        {
            var leftBorderContainer = linksContainer.offset().left;

            var firstTabHidden;

            for (var i = 0; i < tabTags.length; i++)
            {
                var leftBorderTab = angular.element(tabTags[i]).offset().left;

                if (!firstTabHidden && leftBorderTab > (leftBorderContainer - linksContainer.outerWidth()) && leftBorderTab < leftBorderContainer)
                {
                    firstTabHidden = angular.element(tabTags[i]);
                    break;
                }
            }

            return firstTabHidden;
        }

        function getFirstHiddenRightTab()
        {
            var rightBorderContainer = linksContainer.offset().left + linksContainer.outerWidth();

            var firstTabHidden;

            for (var i = 0; i < tabTags.length; i++)
            {
                var tabElement = angular.element(tabTags[i]);
                var rightBorderTab = tabElement.offset().left + tabElement.outerWidth();

                if (!firstTabHidden && rightBorderTab > rightBorderContainer)
                {
                    firstTabHidden = angular.element(tabTags[i]);
                    break;
                }
            }

            return firstTabHidden;
        }

        function getFirstVisibleTab()
        {
            var leftBorderContainer = linksContainer.offset().left;

            var firstTabVisible;

            for (var i = 0; i < tabTags.length; i++)
            {
                var leftBorderTab = angular.element(tabTags[i]).offset().left;
                if (!firstTabVisible && leftBorderTab > leftBorderContainer)
                {
                    firstTabVisible = tabTags[i];
                    break;
                }
            }

            return angular.element(firstTabVisible);
        }

        function isPaginationLeftDisabled ()
        {
            return getFirstHiddenLeftTab() === undefined;
        }

        function isPaginationRightDisabled ()
        {
            return getFirstHiddenRightTab() === undefined;
        }

        function showNextPage()
        {
            var firstTabHidden = getFirstHiddenRightTab();

            var deltaX = linksContainer.offset().left - firstTabHidden.offset().left;

            // Take in account the width of pagination button
            deltaX += 41;

            paginationTranslation += deltaX;

            var transformProperties = {
                translateX: paginationTranslation + 'px'
            };

            var animationProperties = {
                duration: 200
            };

            links.velocity(transformProperties, animationProperties);

            indicator.velocity(transformProperties, animationProperties);

            $timeout(function () {
                $scope.$apply();
            }, 201);
        }

        function showPrevPage()
        {
            var firstTabHidden = getFirstHiddenLeftTab();

            var deltaX = linksContainer.offset().left - firstTabHidden.offset().left;

            // Take in account width of pagination button
            deltaX += 41;

            paginationTranslation += deltaX;

            var transformProperties = {
                translateX: paginationTranslation + 'px'
            };

            var animationProperties = {
                duration: 200
            };

            links.velocity(transformProperties, animationProperties);

            indicator.velocity(transformProperties, animationProperties);

            $timeout(function () {
                $scope.$apply();
            }, 201);
        }

        function repositionPage()
        {
            var leftContainer = linksContainer.offset().left;

            var firstTabVisible = getFirstVisibleTab();

            var deltaX = leftContainer - firstTabVisible.offset().left + 41;

            paginationTranslation += deltaX;

            var transformProperties = {
                translateX: paginationTranslation + 'px'
            };

            var animationProperties = {
                duration: 10
            };

            links.velocity(transformProperties, animationProperties);

            indicator.velocity(transformProperties, animationProperties);

        }

        function getTabs()
        {
            return tabs;
        }

        function setActiveTab(index)
        {
            $timeout(function()
            {
                $scope.lxTabsActiveTab = index;
            });
        }

        function setLinksColor(newTab)
        {
            tabTags.removeClass('tc-' + $scope.lxTabsIndicator);
            tabTags.eq(newTab).addClass('tc-' + $scope.lxTabsIndicator);
        }

        function setIndicatorPosition(oldTab)
        {
            var direction;

            if ($scope.lxTabsActiveTab > oldTab)
            {
                direction = 'right';
            }
            else
            {
                direction = 'left';
            }

            var tabsVisibleWidth = links.parent('.tabs').outerWidth(),
                activeTab = links.find('.tabs-link').eq($scope.lxTabsActiveTab),
                activeTabWidth = activeTab.outerWidth(),
                indicatorLeft = activeTab.position().left,
                indicatorRight = tabsVisibleWidth - (indicatorLeft + activeTabWidth);

            if (angular.isUndefined(oldTab))
            {
                indicator.css({
                    left: indicatorLeft,
                    right: indicatorRight
                });
            }
            else
            {
                var animationProperties = {
                    duration: 200,
                    easing: 'easeOutQuint'
                };

                if (direction === 'left')
                {
                    indicator.velocity({
                        left: indicatorLeft
                    }, animationProperties);

                    indicator.velocity({
                        right: indicatorRight
                    }, animationProperties);
                }
                else
                {
                    indicator.velocity({
                        right: indicatorRight
                    }, animationProperties);

                    indicator.velocity({
                        left: indicatorLeft
                    }, animationProperties);
                }
            }
        }

        $scope.$watch('lxTabsActiveTab', function(newIndex, oldIndex)
        {
            if (newIndex !== oldIndex)
            {
                $timeout(function()
                {
                    setLinksColor(newIndex);
                    setIndicatorPosition(oldIndex);
                });
            }
        });

        // Watch tabs and go to previous page if there is no more tabs currently displayed
        $scope.$watchCollection(function() { return tabs; }, function ()
        {
            $timeout(function ()
            {
                tabTags = links.find('.tabs-link');
            });

            if (isPaginationActive())
            {
                var firstTabVisible = getFirstVisibleTab();

                if (angular.equals(firstTabVisible[0], tabTags[tabTags.length - 1]))
                {
                    showPrevPage();
                }
            }
        });

        angular.element($window).on('resize', function()
        {
            setIndicatorPosition();

            if (isPaginationActive())
            {
                repositionPage();
            }
        });

        // Public API
        $scope.lxTabsGetTabs = getTabs;
        $scope.lxTabsSetActiveTab = setActiveTab;
        $scope.lxTabsIsPaginationActive = isPaginationActive;
        $scope.lxTabsIsPaginationLeftDisabled = isPaginationLeftDisabled;
        $scope.lxTabsIsPaginationRightDisabled = isPaginationRightDisabled;
        $scope.lxTabsShowNextPage = showNextPage;
        $scope.lxTabsShowPrevPage = showPrevPage;
    }])
    .directive('lxTabs', ['$parse', function($parse)
    {
        return {
            restrict: 'E',
            controller: 'LxTabsController',
            templateUrl: 'tabs.html',
            transclude: true,
            replace: true,
            scope: true,
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);
                scope.lxTabsActiveTab = 0;
                scope.lxTabsLinksTc = 'dark';
                scope.lxTabsLinksBgc = 'white';
                scope.lxTabsIndicator = 'blue-500';
                scope.lxTabsZDepth = '0';
                scope.lxTabsLayout = 'full';
                scope.lxTabsIconPrefix = 'mdi mdi-';

                scope.$watch(function()
                {
                    return 'activeTab' in attrs ? scope.$parent.$eval(attrs.activeTab) : 0;
                }, function(newValue)
                {
                    scope.lxTabsActiveTab = angular.isDefined(newValue) ? newValue : 0;
                });

                if ('activeTab' in attrs)
                {
                    var activeTabModel = $parse(attrs.activeTab);

                    scope.$watch('lxTabsActiveTab', function(newActiveTab)
                    {
                        if (activeTabModel.assign)
                        {
                            activeTabModel.assign(scope, newActiveTab);
                        }
                    });
                }

                attrs.$observe('linksTc', function(newValue)
                {
                    scope.lxTabsLinksTc = newValue || 'dark';
                });

                attrs.$observe('linksBgc', function(newValue)
                {
                    scope.lxTabsLinksBgc = newValue || 'white';
                });

                attrs.$observe('indicator', function(newValue)
                {
                    scope.lxTabsIndicator = newValue || 'blue-500';
                });

                attrs.$observe('noDivider', function(newValue)
                {
                    scope.lxTabsNoDivider = newValue;
                });

                attrs.$observe('zDepth', function(newValue)
                {
                    scope.lxTabsZDepth = newValue || '0';
                });

                attrs.$observe('layout', function(newValue)
                {
                    scope.lxTabsLayout = newValue || 'full';
                });

                attrs.$observe('showIconAndHeading', function(newValue)
                {
                    scope.lxTabsShowIconAndHeading = newValue;
                });

                attrs.$observe('iconPrefix', function(newValue)
                {
                    scope.lxTabsIconPrefix = newValue || 'mdi mdi-';
                });
            }
        };
    }])
    .directive('lxTab', function()
    {
        return {
            require: '^lxTabs',
            restrict: 'E',
            scope: true,
            templateUrl: 'tab.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                scope.lxTabData = ctrl.getScope();
                scope.lxTabIndex = ctrl.addTab(scope);

                attrs.$observe('heading', function(newValue)
                {
                    scope.lxTabHeading = newValue;
                });

                attrs.$observe('icon', function(newValue)
                {
                    scope.lxTabIcon = newValue;
                });

                scope.$on('$destroy', function(scope)
                {
                    ctrl.removeTab(scope.currentScope);
                });
            }
        };
    })
    .directive('lxTabLink', ['$timeout', function($timeout)
    {
        return {
            require: '^lxTabs',
            restrict: 'A',
            link: function(scope, element)
            {
                if (scope.lxTabsActiveTab === element.parent().index())
                {
                    $timeout(function()
                    {
                        element.addClass('tc-' + scope.lxTabsIndicator);
                    });
                }

                element
                    .on('mouseenter', function()
                    {
                        if (scope.lxTabsActiveTab !== element.parent().index())
                        {
                            element.addClass('tc-' + scope.lxTabsIndicator);
                        }
                    })
                    .on('mouseleave', function()
                    {
                        if (scope.lxTabsActiveTab !== element.parent().index())
                        {
                            element.removeClass('tc-' + scope.lxTabsIndicator);
                        }
                    });
            }
        };
    }]);

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.text-field', [])
    .filter('unsafe', ['$sce', function($sce)
    {
        return $sce.trustAsHtml;
    }])
    .directive('lxTextField', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                disabled: '&',
                error: '&',
                valid: '&',
                fixedLabel: '&',
                icon: '@',
                theme: '@'
            },
            templateUrl: 'text-field.html',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl, transclude)
            {
                if (angular.isUndefined(scope.theme))
                {
                    scope.theme = 'light';
                }

                var modelController,
                    $field;

                scope.data = {
                    focused: false,
                    model: undefined
                };

                function focusUpdate()
                {
                    scope.data.focused = true;
                    scope.$apply();
                }

                function blurUpdate()
                {
                    scope.data.focused = false;
                    scope.$apply();
                }

                function modelUpdate()
                {
                    scope.data.model = modelController.$modelValue || $field.val();
                }

                function valueUpdate()
                {
                    modelUpdate();
                    scope.$apply();
                }

                function updateTextareaHeight()
                {
                    $timeout(function()
                    {
                        var tmpTextArea = angular.element('<textarea class="text-field__input" style="width: ' + $field.width() + 'px;">' + $field.val() + '</textarea>');
                        tmpTextArea.appendTo('body');

                        $field.css({ height: tmpTextArea[0].scrollHeight + 'px' });

                        tmpTextArea.remove();
                    });
                }

                transclude(function()
                {
                    $field = element.find('textarea');

                    if ($field[0])
                    {
                        updateTextareaHeight();

                        $field.on('cut paste drop keydown', function()
                        {
                            updateTextareaHeight();
                        });
                    }
                    else
                    {
                        $field = element.find('input');
                    }

                    $field.addClass('text-field__input');
                    $field.on('focus', focusUpdate);
                    $field.on('blur', blurUpdate);
                    $field.on('propertychange change click keyup input paste', valueUpdate);

                    modelController = $field.data('$ngModelController');

                    scope.$watch(function()
                    {
                        return modelController.$modelValue;
                    }, modelUpdate);
                });
            }
        };
    }]);

/* global angular */
/* global Image */
'use strict'; // jshint ignore:line


angular.module('lumx.thumbnail', [])
    .controller('LxThumbnailController', ['$scope', function($scope)
        {
            this.init = function(element)
            {
                $scope.element = element;
            };

            this.prepareImage = function()
            {
                $scope.isLoading = true;

                var img = new Image();

                img.src = $scope.thumbnailSrc;

                $scope.element.css({
                    width: $scope.thumbnailWidth + 'px',
                    height: $scope.thumbnailHeight + 'px'
                });

                img.onload = function()
                {
                    $scope.originalWidth = img.width;
                    $scope.originalHeight = img.height;

                    addImage();

                    $scope.isLoading = false;
                };
            };

            function addImage()
            {
                var imageSizeWidthRatio = $scope.thumbnailWidth / $scope.originalWidth,
                    imageSizeWidth = $scope.thumbnailWidth,
                    imageSizeHeight = $scope.originalHeight * imageSizeWidthRatio;

                if (imageSizeHeight < $scope.thumbnailHeight)
                {
                    var resizeFactor = $scope.thumbnailHeight / imageSizeHeight;

                    imageSizeHeight = $scope.thumbnailHeight;
                    imageSizeWidth = resizeFactor * imageSizeWidth;
                }

                $scope.element.css({
                    'background': 'url(' + $scope.thumbnailSrc + ') no-repeat',
                    'background-position': 'center',
                    'background-size': imageSizeWidth + 'px ' + imageSizeHeight + 'px',
                    'overflow': 'hidden'
                });
            }
        }])
    .directive('lxThumbnail', function()
    {
        return {
            restrict: 'E',
            template: '<div class="thumbnail" ng-class="{ \'thumbnail--is-loading\': isLoading }"></div>',
            replace: true,
            controller: 'LxThumbnailController',
            scope: {
                thumbnailSrc: '@',
                thumbnailWidth: '@',
                thumbnailHeight: '@'
            },
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);

                attrs.$observe('thumbnailSrc', function()
                {
                    if (attrs.thumbnailSrc)
                    {
                        ctrl.prepareImage();
                    }
                });

                attrs.$observe('thumbnailWidth', function()
                {
                    if (attrs.thumbnailWidth)
                    {
                        ctrl.prepareImage();
                    }
                });

                attrs.$observe('thumbnailHeight', function()
                {
                    if (attrs.thumbnailHeight)
                    {
                        ctrl.prepareImage();
                    }
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.tooltip', [])
    .controller('LxTooltipController', ['$scope', '$timeout', function($scope, $timeout)
    {
        var self = this,
            tooltip,
            tooltipContent,
            tooltipPosition,
            tooltipColor,
            tooltipLabel,
            tooltipBackground,
            tooltipTrigger;

        this.init = function(element, attrs)
        {
            tooltipTrigger = element;

            tooltipContent = attrs.lxTooltip;
            tooltipPosition = angular.isDefined(attrs.tooltipPosition) ? attrs.tooltipPosition : 'top';
            tooltipColor = angular.isDefined(attrs.tooltipColor) ? attrs.tooltipColor : 'black';

            tooltip = angular.element('<div/>',
            {
                class: 'tooltip tooltip--' + tooltipPosition + ' tooltip--' + tooltipColor
            });

            tooltipBackground = angular.element('<div/>',
            {
                class: 'tooltip__background'
            });

            tooltipLabel = angular.element('<span/>',
            {
                class: 'tooltip__label',
                text: tooltipContent
            });

            tooltipTrigger
                .bind('mouseenter', function()
                {
                    self.showTooltip();
                });

            tooltipTrigger
                .bind('mouseleave', function()
                {
                    self.hideTooltip();
                });
        };

        this.showTooltip = function()
        {
            var width = tooltipTrigger.outerWidth(),
                height = tooltipTrigger.outerHeight(),
                top = tooltipTrigger.offset().top,
                left = tooltipTrigger.offset().left;

            tooltip
                .append(tooltipBackground)
                .append(tooltipLabel)
                .appendTo('body');

            if (tooltipPosition === 'top')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top - tooltip.outerHeight()
                });
            }
            else if (tooltipPosition === 'bottom')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top + height
                });
            }
            else if (tooltipPosition === 'left')
            {
                tooltip.css(
                {
                    left: left - tooltip.outerWidth(),
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }
            else if (tooltipPosition === 'right')
            {
                tooltip.css(
                {
                    left: left + width,
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }

            tooltip.addClass('tooltip--is-active');
        };

        this.update = function(content)
        {
            tooltipContent = content;
            tooltipLabel.text(tooltipContent);
        };

        this.hideTooltip = function()
        {
            if (angular.isDefined(tooltip))
            {
                tooltip.removeClass('tooltip--is-active');

                $timeout(function()
                {
                    tooltip.remove();
                }, 200);
            }
        };

        this.isDisplayed = function()
        {
            return angular.isDefined(tooltip) && tooltip.hasClass('tooltip--is-active');
        };

        $scope.$on('$destroy', function(scope)
        {
            if (angular.isDefined(tooltip))
            {
                tooltip.remove();
            }
        });
    }])
    .directive('lxTooltip', function()
    {
        return {
            restrict: 'A',
            controller: 'LxTooltipController',
            link: function(scope, element, attrs, ctrl)
            {
                attrs.$observe('lxTooltip', function()
                {
                    if (attrs.lxTooltip)
                    {
                        if (ctrl.isDisplayed())
                        {
                            ctrl.update(attrs.lxTooltip);
                        }
                        else
                        {
                            ctrl.init(element, attrs);
                        }
                    }
                    else
                    {
                        ctrl.hideTooltip();
                    }
                });
            }
        };
    });

angular.module("lumx.dropdown").run(['$templateCache', function(a) { a.put('dropdown.html', '<div class="dropdown" ng-transclude="child"></div>\n' +
    '');
	a.put('dropdown-toggle.html', '<div ng-transclude="child"></div>\n' +
    '');
	a.put('dropdown-menu.html', '<div class="dropdown-menu dropdown-menu--{{ lxDropdownPosition }}" ng-class="{ \'dropdown__menu--is-dropped\': lxDropdownIsDropped }">\n' +
    '    <div class="dropdown-menu__content" ng-transclude="child" ng-if="lxDropdownIsDropped"></div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.file-input").run(['$templateCache', function(a) { a.put('file-input.html', '<div class="input-file">\n' +
    '    <span class="input-file__label" ng-bind-html="label | unsafe"></span>\n' +
    '    <span class="input-file__filename"></span>\n' +
    '    <input type="file">\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.text-field").run(['$templateCache', function(a) { a.put('text-field.html', '<div class="text-field text-field--{{ theme }}-theme"\n' +
    '     ng-class="{ \'text-field--is-valid\': valid(),\n' +
    '                 \'text-field--has-error\': error(),\n' +
    '                 \'text-field--is-disabled\': disabled(),\n' +
    '                 \'text-field--fixed-label\': fixedLabel(),\n' +
    '                 \'text-field--is-active\': data.model || data.focused,\n' +
    '                 \'text-field--is-focused\': data.focused,\n' +
    '                 \'text-field--label-hidden\': fixedLabel() && data.model,\n' +
    '                 \'text-field--with-icon\': icon && fixedLabel() }">\n' +
    '    <label class="text-field__label" ng-bind-html="label | unsafe"></label>\n' +
    '\n' +
    '    <div class="text-field__icon" ng-if="icon && fixedLabel() ">\n' +
    '        <i class="mdi mdi-{{ icon }}"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-transclude="1"></div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.search-filter").run(['$templateCache', function(a) { a.put('search-filter.html', '<div class="search-filter search-filter--{{ theme }}-theme"\n' +
    '     ng-class="{ \'search-filter--is-focused\': model,\n' +
    '                 \'search-filter--is-closed\': closed }">\n' +
    '    <div class="search-filter__container">\n' +
    '        <label class="search-filter__label"><i class="mdi mdi-magnify"></i></label>\n' +
    '        <input type="text" class="search-filter__input" placeholder="{{ placeholder }}" ng-model="model">\n' +
    '        <span class="search-filter__cancel" ng-click="clear()"><i class="mdi mdi-close-circle"></i></span>\n' +
    '    </div>\n' +
    '</div>');
	 }]);
angular.module("lumx.select").run(['$templateCache', function(a) { a.put('select.html', '<div class="lx-select"\n' +
    '     ng-class="{ \'lx-select--is-unique\': !lxSelectMultiple,\n' +
    '                 \'lx-select--is-multiple\': lxSelectMultiple,\n' +
    '                 \'lx-select--is-valid\': lxSelectValid(),\n' +
    '                 \'lx-select--has-error\': lxSelectError(),\n' +
    '                 \'lx-select--is-disabled\': lxSelectDisabled() }">\n' +
    '    <lx-dropdown width="32" over-toggle="true">\n' +
    '        <div ng-transclude="child"></div>\n' +
    '    </lx-dropdown>\n' +
    '</div>\n' +
    '');
	a.put('select-selected.html', '<div lx-dropdown-toggle>\n' +
    '    <span class="lx-select__floating-label" ng-if="lxSelectGetSelectedElements().length !== 0 && lxSelectFloatingLabel" ng-bind-html="lxSelectTrust(lxSelectPlaceholder)"></span>\n' +
    '\n' +
    '    <div class="lx-select__selected"\n' +
    '         ng-class="{ \'lx-select__selected--is-unique\': !lxSelectMultiple,\n' +
    '                     \'lx-select__selected--is-multiple\': lxSelectMultiple && lxSelectGetSelectedElements().length > 0,\n' +
    '                     \'lx-select__selected--placeholder\': lxSelectGetSelectedElements().length === 0 }"\n' +
    '         lx-ripple>\n' +
    '        <span ng-if="lxSelectGetSelectedElements().length === 0" ng-bind-html="lxSelectTrust(lxSelectPlaceholder)"></span>\n' +
    '\n' +
    '        <div ng-if="!lxSelectMultiple && lxSelectGetSelectedElements().length === 1">\n' +
    '            <i class="lx-select__close mdi mdi-close-circle" ng-click="lxSelectUnselect($selected, $event)" ng-if="lxSelectAllowClear"></i>\n' +
    '            <span ng-transclude="child"></span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="lxSelectMultiple">\n' +
    '            <div class="lx-select__tag" ng-repeat="$selected in lxSelectGetSelectedElements()">\n' +
    '                <span ng-transclude="child"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
	a.put('select-choices.html', '<lx-dropdown-menu class="lx-select__choices {{ lxSelectCustom }}">\n' +
    '    <ul ng-if="!lxSelectTree">\n' +
    '        <li ng-if="lxSelectGetSelectedElements().length > 0">\n' +
    '            <lx-select-choices-selected class="lx-select__chosen"\n' +
    '                                        ng-class="{ \'lx-select__chosen--is-multiple\': lxSelectMultiple,\n' +
    '                                                    \'lx-select__chosen--is-deletable\': lxSelectMultiple && (lxSelectGetSelectedElements().length > 1 || lxSelectAllowClear), }"\n' +
    '                                        content="lxSelectData.selectedTemplate"></lx-select-choices-selected>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '            <div class="lx-select__filter dropdown-filter"\n' +
    '                 ng-class="{ \'dropdown-filter\': !lxSelectCustom }">\n' +
    '                <lx-search-filter model="lxSelectData.filter" filter-width="100%" lx-dropdown-filter></lx-search-filter>\n' +
    '            </div>\n' +
    '        </li>\n' +
    '\n' +
    '        <li class="lx-select__help" ng-if="lxSelectIsHelperVisible()">\n' +
    '            <span ng-if="lxSelectFilterNeeded()">Type minimum {{ lxSelectMinLength }} to search</span>\n' +
    '            <span ng-if="lxSelectHasNoResults() && !lxSelectFilterNeeded()">No results!</span>\n' +
    '        </li>\n' +
    '\n' +
    '        <div ng-if="lxSelectIsChoicesVisible() && lxSelectIsChoicesArray()">\n' +
    '            <li ng-repeat="$choice in lxSelectChoices() | filterChoices:lxSelectFilter:lxSelectData.filter | limitTo:lxSelectDefaultMaxResults track by $index">\n' +
    '                <div class="lx-select__choice"\n' +
    '                   ng-class="{ \'lx-select__choice--is-multiple\': lxSelectMultiple,\n' +
    '                               \'lx-select__choice--is-selected\': lxSelectIsSelected($choice),\n' +
    '                               \'dropdown-link\': !lxSelectCustom }"\n' +
    '                   ng-click="lxSelectToggle($choice, $event)"\n' +
    '                   ng-transclude="child"></div>\n' +
    '            </li>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="lxSelectIsChoicesVisible() && !lxSelectIsChoicesArray()">\n' +
    '            <li ng-repeat-start="($subheader, children) in lxSelectChoices()">\n' +
    '                <span ng-class="{ \'dropdown-link dropdown-link--is-header\': !lxSelectCustom }"\n' +
    '                      ng-bind-html="lxSelectTrust($subheader)"></span>\n' +
    '            </li>\n' +
    '\n' +
    '            <li ng-repeat-end ng-repeat="$choice in children | filterChoices:lxSelectFilter:lxSelectData.filter | limitTo:lxSelectDefaultMaxResults track by $index">\n' +
    '                <div class="lx-select__choice"\n' +
    '                   ng-class="{ \'lx-select__choice--is-multiple\': lxSelectMultiple,\n' +
    '                               \'lx-select__choice--is-selected\': lxSelectIsSelected($choice),\n' +
    '                               \'dropdown-link\': !lxSelectCustom }"\n' +
    '                   ng-click="lxSelectToggle($choice, $event)"\n' +
    '                   ng-transclude="child"></div>\n' +
    '            </li>\n' +
    '        </div>\n' +
    '\n' +
    '        <li class="lx-select__loader" ng-if="lxSelectLoading === \'true\'">\n' +
    '            <i class="mdi mdi-reload"></i>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</lx-dropdown-menu>\n' +
    '');
	 }]);
angular.module("lumx.tabs").run(['$templateCache', function(a) { a.put('tabs.html', '<div class="tabs tabs--theme-{{ lxTabsLinksTc }} tabs--layout-{{ lxTabsLayout }}"\n' +
    '     ng-class="{ \'tabs--no-divider\': lsTabsNoDivider }">\n' +
    '\n' +
    '    <button class="tabs__pagination-left btn btn--m bgc-{{ lxTabsLinksBgc }}"\n' +
    '            ng-click="lxTabsShowPrevPage()"\n' +
    '            ng-if="lxTabsIsPaginationActive()"\n' +
    '            ng-disabled="lxTabsIsPaginationLeftDisabled()">\n' +
    '      <i class="mdi mdi-chevron-left"></i>\n' +
    '    </button>\n' +
    '\n' +
    '    <ul class="tabs__links bgc-{{ lxTabsLinksBgc }} z-depth{{ lxTabsZDepth }}"\n' +
    '        ng-class="{\'tabs__pagination-padding\': lxTabsIsPaginationActive()}">\n' +
    '        <li ng-repeat="tab in lxTabsGetTabs() track by $index">\n' +
    '            <a lx-tab-link\n' +
    '               class="tabs-link"\n' +
    '               ng-class="{ \'tabs-link--is-active\': $index === lxTabsActiveTab }"\n' +
    '               ng-click="lxTabsSetActiveTab($index)"\n' +
    '               lx-ripple="{{ lxTabsIndicator }}">\n' +
    '               <span ng-if="tab.lxTabIcon !== undefined"><i class="{{ lxTabsIconPrefix }}{{ tab.lxTabIcon }}"></i></span>\n' +
    '               <span ng-if="tab.lxTabIcon === undefined || lxTabsShowIconAndHeading">{{ tab.lxTabHeading }}</i></span>\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '    <button class="tabs__pagination-right btn btn--m bgc-{{ lxTabsLinksBgc }}"\n' +
    '            ng-click="lxTabsShowNextPage()"\n' +
    '            ng-if="lxTabsIsPaginationActive()"\n' +
    '            ng-disabled="lxTabsIsPaginationRightDisabled()">\n' +
    '      <i class="mdi mdi-chevron-right"></i>\n' +
    '    </button>\n' +
    '\n' +
    '    <div class="tabs__panes" ng-transclude="child"></div>\n' +
    '\n' +
    '    <div class="tabs__indicator bgc-{{ lxTabsIndicator }}"></div>\n' +
    '</div>\n' +
    '');
	a.put('tab.html', '<div class="tabs-pane" ng-if="lxTabIndex === lxTabData.lxTabsActiveTab" ng-transclude="child"></div>\n' +
    '');
	 }]);
angular.module("lumx.date-picker").run(['$templateCache', function(a) { a.put('date-picker.html', '<div class="lx-date" ng-class="{ \'lx-date--fixed-label\': fixedLabel(),\n' +
    '                                 \'lx-date--with-icon\': icon && fixedLabel() }">\n' +
    '\n' +
    '    <div class="text-field__icon" ng-if="icon && fixedLabel() ">\n' +
    '        <i class="mdi mdi-{{ icon }}"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Date picker input -->\n' +
    '    <div class="lx-date__input-wrapper">\n' +
    '        <lx-text-field class="lx-date-input" label="{{ label }}" ng-click="openPicker()">\n' +
    '            <input type="text" ng-model="selected.model" ng-disabled="true">\n' +
    '        </lx-text-field>\n' +
    '\n' +
    '        <a class="lx-date__clear" ng-click="clearDate()" ng-if="allowClear">\n' +
    '            <i class="mdi mdi-close-circle" ng-click="unselect($selected, $event)" ng-if="allowClear"></i>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Date picker -->\n' +
    '    <div class="lx-date-picker">\n' +
    '        <div ng-if="ctrlData.isOpen">\n' +
    '            <div class="lx-date-picker__header">\n' +
    '                <!-- Current day of week -->\n' +
    '                <div class="lx-date-picker__current-day-of-week">\n' +
    '                    <span>{{ moment(selected.date).format(\'dddd\') }}</span>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- Current date -->\n' +
    '                <div class="lx-date-picker__current-date">\n' +
    '                    <span ng-class="{ \'tc-white-1\': !yearSelection, \'tc-white-3\': yearSelection }">{{ moment(selected.date).format(\'MMM\') }}</span>\n' +
    '                    <strong ng-class="{ \'tc-white-1\': !yearSelection, \'tc-white-3\': yearSelection }">{{ moment(selected.date).format(\'DD\') }}</strong>\n' +
    '                    <a ng-class="{ \'tc-white-3\': !yearSelection, \'tc-white-1\': yearSelection }" ng-click="displayYearSelection()">{{ moment(selected.date).format(\'YYYY\') }}</a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="lx-date-picker__content">\n' +
    '                <!-- Calendar -->\n' +
    '                <div class="lx-date-picker__calendar" ng-if="!yearSelection">\n' +
    '                    <div class="lx-date-picker__nav">\n' +
    '                        <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="previousMonth()">\n' +
    '                            <i class="mdi mdi-chevron-left"></i>\n' +
    '                        </button>\n' +
    '\n' +
    '                        <span>{{ activeDate.format(\'MMMM YYYY\') }}</span>\n' +
    '\n' +
    '                        <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="nextMonth()">\n' +
    '                            <i class="mdi mdi-chevron-right"></i>\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="lx-date-picker__days-of-week">\n' +
    '                        <span ng-repeat="day in daysOfWeek">{{ day }}</span>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="lx-date-picker__days">\n' +
    '                        <span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                              ng-repeat="x in emptyFirstDays">&nbsp;</span><!--\n' +
    '\n' +
    '                     --><div class="lx-date-picker__day"\n' +
    '                             ng-class="{ \'lx-date-picker__day--is-selected\': day.selected,\n' +
    '                                         \'lx-date-picker__day--is-today\': day.today }"\n' +
    '                             ng-repeat="day in days">\n' +
    '                            <a ng-click="select(day)">{{ day ? day.format(\'D\') : \'\' }}</a>\n' +
    '                        </div><!--\n' +
    '\n' +
    '                     --><span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                              ng-repeat="x in emptyLastDays">&nbsp;</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- Year selection -->\n' +
    '                <div class="lx-date-picker__year-selector" ng-if="yearSelection">\n' +
    '                    <a class="lx-date-picker__year"\n' +
    '                         ng-class="{ \'lx-date-picker__year--is-active\': year == activeDate.format(\'YYYY\') }"\n' +
    '                         ng-repeat="year in years"\n' +
    '                         ng-click="selectYear(year)"\n' +
    '                         ng-if="yearSelection">\n' +
    '                        <span>{{ year }}</span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <!-- Actions -->\n' +
    '            <div class="lx-date-picker__actions">\n' +
    '                <button class="btn btn--m btn--teal btn--flat" lx-ripple ng-click="closePicker()">Ok</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.progress").run(['$templateCache', function(a) { a.put('progress.html', '<div class="progress-container progress-container--{{ lxProgress.lxType }} progress-container--{{ lxProgress.lxColor }}"\n' +
    '     ng-style="lxProgress.getProgressDiameter()">\n' +
    '    <div class="progress-circular-wrapper" ng-if="lxProgress.lxType === \'circular\'">\n' +
    '        <div class="progress-circular">\n' +
    '            <div class="progress-circular__gap"></div>\n' +
    '\n' +
    '            <div class="progress-circular__left">\n' +
    '                <div class="progress-circular__half-circle"></div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="progress-circular__right">\n' +
    '                <div class="progress-circular__half-circle"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="progress-linear-wrapper" ng-if="lxProgress.lxType === \'linear\'">\n' +
    '        <div class="progress-linear progress-linear--is-shown">\n' +
    '            <div class="progress-linear__background"></div>\n' +
    '            <div class="progress-linear__bar progress-linear__bar--first"></div>\n' +
    '            <div class="progress-linear__bar progress-linear__bar--second"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.button").run(['$templateCache', function(a) { a.put('link.html', '<a ng-transclude lx-ripple></a>\n' +
    '');
	a.put('button.html', '<button ng-transclude lx-ripple></button>\n' +
    '');
	 }]);
angular.module("lumx.checkbox").run(['$templateCache', function(a) { a.put('checkbox.html', '<div class="checkbox checkbox--{{ lxCheckbox.lxColor }}">\n' +
    '    <input id="{{ lxCheckbox.getCheckboxId() }}"\n' +
    '           type="checkbox"\n' +
    '           class="checkbox__input"\n' +
    '           name="{{ lxCheckbox.name }}"\n' +
    '           ng-model="lxCheckbox.ngModel"\n' +
    '           ng-true-value="{{ lxCheckbox.ngTrueValue }}"\n' +
    '           ng-false-value="{{ lxCheckbox.ngFalseValue }}"\n' +
    '           ng-change="lxCheckbox.ngChange()"\n' +
    '           ng-disabled="lxCheckbox.ngDisabled">\n' +
    '\n' +
    '    <label for="{{ lxCheckbox.getCheckboxId() }}" class="checkbox__label" ng-transclude ng-if="!lxCheckbox.getCheckboxHasChildren()"></label>\n' +
    '    <ng-transclude-replace ng-if="lxCheckbox.getCheckboxHasChildren()"></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	a.put('checkbox-label.html', '<label for="{{ lxCheckboxLabel.getCheckboxId() }}" class="checkbox__label" ng-transclude></label>\n' +
    '');
	a.put('checkbox-help.html', '<span class="checkbox__help" ng-transclude></span>\n' +
    '');
	 }]);
angular.module("lumx.radio-button").run(['$templateCache', function(a) { a.put('radio-group.html', '<div class="radio-group" ng-transclude></div>\n' +
    '');
	a.put('radio-button.html', '<div class="radio-button radio-button--{{ lxRadioButton.lxColor }}">\n' +
    '    <input id="{{ lxRadioButton.getRadioButtonId() }}"\n' +
    '           type="radio"\n' +
    '           class="radio-button__input"\n' +
    '           name="{{ lxRadioButton.name }}"\n' +
    '           ng-model="lxRadioButton.ngModel"\n' +
    '           ng-value="lxRadioButton.ngValue"\n' +
    '           ng-change="lxRadioButton.ngChange()"\n' +
    '           ng-disabled="lxRadioButton.ngDisabled">\n' +
    '\n' +
    '    <label for="{{ lxRadioButton.getRadioButtonId() }}" class="radio-button__label" ng-transclude ng-if="!lxRadioButton.getRadioButtonHasChildren()"></label>\n' +
    '    <ng-transclude-replace ng-if="lxRadioButton.getRadioButtonHasChildren()"></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	a.put('radio-button-label.html', '<label for="{{ lxRadioButtonLabel.getRadioButtonId() }}" class="radio-button__label" ng-transclude></label>\n' +
    '');
	a.put('radio-button-help.html', '<span class="radio-button__help" ng-transclude></span>\n' +
    '');
	 }]);
angular.module("lumx.switch").run(['$templateCache', function(a) { a.put('switch_label.html', '<label for="{{ lxSwitchLabel.getSwitchId() }}" class="switch__label" ng-transclude></label>\n' +
    '');
	a.put('switch_help.html', '<span class="switch__help" ng-transclude></span>\n' +
    '');
	a.put('switch.html', '<div class="switch switch--{{ lxSwitch.lxColor }}">\n' +
    '    <input id="{{ lxSwitch.getSwitchId() }}"\n' +
    '           type="checkbox"\n' +
    '           class="switch__input"\n' +
    '           name="{{ lxSwitch.name }}"\n' +
    '           ng-model="lxSwitch.ngModel"\n' +
    '           ng-true-value="{{ lxSwitch.ngTrueValue }}"\n' +
    '           ng-false-value="{{ lxSwitch.ngFalseValue }}"\n' +
    '           ng-change="lxSwitch.ngChange()"\n' +
    '           ng-disabled="lxSwitch.ngDisabled">\n' +
    '\n' +
    '    <label for="{{ lxSwitch.getSwitchId() }}" class="switch__label" ng-transclude ng-if="!lxSwitch.getSwitchHasChildren()"></label>\n' +
    '    <ng-transclude-replace ng-if="lxSwitch.getSwitchHasChildren()"></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.fab").run(['$templateCache', function(a) { a.put('fab.html', '<div class="fab">\n' +
    '    <ng-transclude-replace></ng-transclude-replace>\n' +
    '\n' +
    '    <lx-progress class="fab__progress"\n' +
    '                 lx-type="circular" lx-color="{{ lxFab.lxFabProgressColor }}" lx-diameter="64"\n' +
    '                 ng-if="lxFab.lxFabProgress"></lx-progress>\n' +
    '</div>\n' +
    '');
	a.put('fab-trigger.html', '<div class="fab__primary" ng-transclude></div>\n' +
    '');
	a.put('fab-actions.html', '<div class="fab__actions fab__actions--{{ parentCtrl.lxDirection }}" ng-transclude></div>\n' +
    '');
	 }]);