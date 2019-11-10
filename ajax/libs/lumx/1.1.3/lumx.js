/*
 LumX v1.1.3
 (c) 2014-2016 LumApps http://ui.lumapps.com
 License: MIT
*/
(function()
{
    'use strict';

    angular.module('lumx.utils.depth', []);
    angular.module('lumx.utils.event-scheduler', []);
    angular.module('lumx.utils.transclude-replace', []);
    angular.module('lumx.utils.utils', []);

    angular.module('lumx.utils', [
        'lumx.utils.depth',
        'lumx.utils.event-scheduler',
        'lumx.utils.transclude-replace',
        'lumx.utils.utils'
    ]);

    angular.module('lumx.button', []);
    angular.module('lumx.checkbox', []);
    angular.module('lumx.date-picker', []);
    angular.module('lumx.dialog', ['lumx.utils.event-scheduler']);
    angular.module('lumx.dropdown', ['lumx.utils.event-scheduler']);
    angular.module('lumx.fab', []);
    angular.module('lumx.file-input', []);
    angular.module('lumx.icon', []);
    angular.module('lumx.notification', ['lumx.utils.event-scheduler']);
    angular.module('lumx.progress', []);
    angular.module('lumx.radio-button', []);
    angular.module('lumx.ripple', []);
    angular.module('lumx.search-filter', []);
    angular.module('lumx.select', []);
    angular.module('lumx.switch', []);
    angular.module('lumx.tabs', []);
    angular.module('lumx.text-field', []);
    angular.module('lumx.tooltip', []);

    angular.module('lumx', [
        'lumx.button',
        'lumx.checkbox',
        'lumx.date-picker',
        'lumx.dialog',
        'lumx.dropdown',
        'lumx.fab',
        'lumx.file-input',
        'lumx.icon',
        'lumx.notification',
        'lumx.progress',
        'lumx.radio-button',
        'lumx.ripple',
        'lumx.search-filter',
        'lumx.select',
        'lumx.switch',
        'lumx.tabs',
        'lumx.text-field',
        'lumx.tooltip',
        'lumx.utils'
    ]);
})();
(function()
{
    'use strict';

    angular
        .module('lumx.utils.depth')
        .service('LxDepthService', LxDepthService);

    function LxDepthService()
    {
        var service = this;
        var depth = 1000;

        service.getDepth = getDepth;
        service.register = register;

        ////////////

        function getDepth()
        {
            return depth;
        }

        function register()
        {
            depth++;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.utils.event-scheduler')
        .service('LxEventSchedulerService', LxEventSchedulerService);

    LxEventSchedulerService.$inject = ['$document', 'LxUtils'];

    function LxEventSchedulerService($document, LxUtils)
    {
        var service = this;
        var handlers = {};
        var schedule = {};

        service.register = register;
        service.unregister = unregister;

        ////////////

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
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.utils.transclude-replace')
        .directive('ngTranscludeReplace', ngTranscludeReplace);

    ngTranscludeReplace.$inject = ['$log'];

    function ngTranscludeReplace($log)
    {
        return {
            terminal: true,
            restrict: 'EA',
            link: link
        };

        function link(scope, element, attrs, ctrl, transclude)
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
                    element.replaceWith(clone);
                }
                else
                {
                    element.remove();
                }
            });
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.utils.utils')
        .service('LxUtils', LxUtils);

    function LxUtils()
    {
        var service = this;

        service.generateUUID = generateUUID;

        ////////////

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
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.button')
        .directive('lxButton', lxButton);

    function lxButton()
    {
        var buttonClass;

        return {
            restrict: 'E',
            templateUrl: getTemplateUrl,
            compile: compile,
            replace: true,
            transclude: true
        };

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

        function getTemplateUrl(element, attrs)
        {
            return isAnchor(attrs) ? 'link.html' : 'button.html';
        }

        function isAnchor(attrs)
        {
            return angular.isDefined(attrs.href) || angular.isDefined(attrs.ngHref) || angular.isDefined(attrs.ngLink) || angular.isDefined(attrs.uiSref);
        }

        function setButtonStyle(element, size, color, type)
        {
            var buttonBase = 'btn';
            var buttonSize = angular.isDefined(size) ? size : 'm';
            var buttonColor = angular.isDefined(color) ? color : 'primary';
            var buttonType = angular.isDefined(type) ? type : 'raised';

            element.removeClass(buttonClass);

            buttonClass = buttonBase + ' btn--' + buttonSize + ' btn--' + buttonColor + ' btn--' + buttonType;

            element.addClass(buttonClass);
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.checkbox')
        .directive('lxCheckbox', lxCheckbox)
        .directive('lxCheckboxLabel', lxCheckboxLabel)
        .directive('lxCheckboxHelp', lxCheckboxHelp);

    function lxCheckbox()
    {
        return {
            restrict: 'E',
            templateUrl: 'checkbox.html',
            scope:
            {
                lxColor: '@?',
                name: '@?',
                ngChange: '&?',
                ngDisabled: '=?',
                ngFalseValue: '@?',
                ngModel: '=',
                ngTrueValue: '@?'
            },
            controller: LxCheckboxController,
            controllerAs: 'lxCheckbox',
            bindToController: true,
            transclude: true,
            replace: true
        };
    }

    LxCheckboxController.$inject = ['$scope', '$timeout', 'LxUtils'];

    function LxCheckboxController($scope, $timeout, LxUtils)
    {
        var lxCheckbox = this;
        var checkboxId;
        var checkboxHasChildren;
        var timer;

        lxCheckbox.getCheckboxId = getCheckboxId;
        lxCheckbox.getCheckboxHasChildren = getCheckboxHasChildren;
        lxCheckbox.setCheckboxId = setCheckboxId;
        lxCheckbox.setCheckboxHasChildren = setCheckboxHasChildren;
        lxCheckbox.triggerNgChange = triggerNgChange;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        init();

        ////////////

        function getCheckboxId()
        {
            return checkboxId;
        }

        function getCheckboxHasChildren()
        {
            return checkboxHasChildren;
        }

        function init()
        {
            setCheckboxId(LxUtils.generateUUID());
            setCheckboxHasChildren(false);

            lxCheckbox.ngTrueValue = angular.isUndefined(lxCheckbox.ngTrueValue) ? true : lxCheckbox.ngTrueValue;
            lxCheckbox.ngFalseValue = angular.isUndefined(lxCheckbox.ngFalseValue) ? false : lxCheckbox.ngFalseValue;
            lxCheckbox.lxColor = angular.isUndefined(lxCheckbox.lxColor) ? 'accent' : lxCheckbox.lxColor;
        }

        function setCheckboxId(_checkboxId)
        {
            checkboxId = _checkboxId;
        }

        function setCheckboxHasChildren(_checkboxHasChildren)
        {
            checkboxHasChildren = _checkboxHasChildren;
        }

        function triggerNgChange()
        {
            timer = $timeout(lxCheckbox.ngChange);
        }
    }

    function lxCheckboxLabel()
    {
        return {
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

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setCheckboxHasChildren(true);
            ctrls[1].setCheckboxId(ctrls[0].getCheckboxId());
        }
    }

    function LxCheckboxLabelController()
    {
        var lxCheckboxLabel = this;
        var checkboxId;

        lxCheckboxLabel.getCheckboxId = getCheckboxId;
        lxCheckboxLabel.setCheckboxId = setCheckboxId;

        ////////////

        function getCheckboxId()
        {
            return checkboxId;
        }

        function setCheckboxId(_checkboxId)
        {
            checkboxId = _checkboxId;
        }
    }

    function lxCheckboxHelp()
    {
        return {
            restrict: 'AE',
            require: '^lxCheckbox',
            templateUrl: 'checkbox-help.html',
            transclude: true,
            replace: true
        };
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.date-picker')
        .directive('lxDatePicker', lxDatePicker);

    lxDatePicker.$inject = ['LxDatePickerService', 'LxUtils'];

    function lxDatePicker(LxDatePickerService, LxUtils)
    {
        return {
            restrict: 'AE',
            templateUrl: 'date-picker.html',
            scope:
            {
                autoClose: '=?lxAutoClose',
                callback: '&?lxCallback',
                color: '@?lxColor',
                escapeClose: '=?lxEscapeClose',
                inputFormat: '@?lxInputFormat',
                maxDate: '=?lxMaxDate',
                ngModel: '=',
                minDate: '=?lxMinDate',
                locale: '@lxLocale'
            },
            link: link,
            controller: LxDatePickerController,
            controllerAs: 'lxDatePicker',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            if (angular.isDefined(attrs.id))
            {
                attrs.$observe('id', function(_newId)
                {
                    scope.lxDatePicker.pickerId = _newId;
                    LxDatePickerService.registerScope(scope.lxDatePicker.pickerId, scope);
                });
            }
            else
            {
                scope.lxDatePicker.pickerId = LxUtils.generateUUID();
                LxDatePickerService.registerScope(scope.lxDatePicker.pickerId, scope);
            }
        }
    }

    LxDatePickerController.$inject = ['$element', '$scope', '$timeout', '$transclude', 'LxDatePickerService'];

    function LxDatePickerController($element, $scope, $timeout, $transclude, LxDatePickerService)
    {
        var lxDatePicker = this;
        var input;
        var modelController;
        var timer1;
        var timer2;
        var watcher1;
        var watcher2;

        lxDatePicker.closeDatePicker = closeDatePicker;
        lxDatePicker.displayYearSelection = displayYearSelection;
        lxDatePicker.hideYearSelection = hideYearSelection;
        lxDatePicker.getDateFormatted = getDateFormatted;
        lxDatePicker.nextMonth = nextMonth;
        lxDatePicker.openDatePicker = openDatePicker;
        lxDatePicker.previousMonth = previousMonth;
        lxDatePicker.select = select;
        lxDatePicker.selectYear = selectYear;

        lxDatePicker.autoClose = angular.isDefined(lxDatePicker.autoClose) ? lxDatePicker.autoClose : true;
        lxDatePicker.color = angular.isDefined(lxDatePicker.color) ? lxDatePicker.color : 'primary';
        lxDatePicker.element = $element.find('.lx-date-picker');
        lxDatePicker.escapeClose = angular.isDefined(lxDatePicker.escapeClose) ? lxDatePicker.escapeClose : true;
        lxDatePicker.isOpen = false;
        lxDatePicker.moment = moment;
        lxDatePicker.yearSelection = false;

        $transclude(function(clone)
        {
            if (clone.length)
            {
                lxDatePicker.hasInput = true;

                timer1 = $timeout(function()
                {
                    input = $element.find('.lx-date-input input');
                    modelController = input.data('$ngModelController');

                    watcher2 = $scope.$watch(function()
                    {
                        return modelController.$viewValue;
                    }, function(newValue, oldValue)
                    {
                        if (angular.isUndefined(newValue))
                        {
                            lxDatePicker.ngModel = undefined;
                        }
                    });
                });
            }
        });

        watcher1 = $scope.$watch(function()
        {
            return lxDatePicker.ngModel;
        }, init);

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer1);
            $timeout.cancel(timer2);

            if (angular.isFunction(watcher1))
            {
                watcher1();
            }

            if (angular.isFunction(watcher2))
            {
                watcher2();
            }
        });

        ////////////

        function closeDatePicker()
        {
            LxDatePickerService.close(lxDatePicker.pickerId);
        }

        function displayYearSelection()
        {
            lxDatePicker.yearSelection = true;

            timer2 = $timeout(function()
            {
                var yearSelector = angular.element('.lx-date-picker__year-selector');
                var activeYear = yearSelector.find('.lx-date-picker__year--is-active');

                yearSelector.scrollTop(yearSelector.scrollTop() + activeYear.position().top - yearSelector.height() / 2 + activeYear.height() / 2);
            });
        }

        function hideYearSelection()
        {
            lxDatePicker.yearSelection = false;
        }

        function generateCalendar()
        {
            lxDatePicker.days = [];

            var previousDay = angular.copy(lxDatePicker.ngModelMoment).date(0);
            var firstDayOfMonth = angular.copy(lxDatePicker.ngModelMoment).date(1);
            var lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
            var maxDays = lastDayOfMonth.date();

            lxDatePicker.emptyFirstDays = [];

            for (var i = firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1; i > 0; i--)
            {
                lxDatePicker.emptyFirstDays.push(
                {});
            }

            for (var j = 0; j < maxDays; j++)
            {
                var date = angular.copy(previousDay.add(1, 'days'));

                date.selected = angular.isDefined(lxDatePicker.ngModel) && date.isSame(lxDatePicker.ngModel, 'day');
                date.today = date.isSame(moment(), 'day');

                if (angular.isDefined(lxDatePicker.minDate) && date.toDate() < lxDatePicker.minDate)
                {
                    date.disabled = true;
                }

                if (angular.isDefined(lxDatePicker.maxDate) && date.toDate() > lxDatePicker.maxDate)
                {
                    date.disabled = true;
                }

                lxDatePicker.days.push(date);
            }

            lxDatePicker.emptyLastDays = [];

            for (var k = 7 - (lastDayOfMonth.day() === 0 ? 7 : lastDayOfMonth.day()); k > 0; k--)
            {
                lxDatePicker.emptyLastDays.push(
                {});
            }
        }

        function getDateFormatted()
        {
            var dateFormatted = lxDatePicker.ngModelMoment.format('llll').replace(lxDatePicker.ngModelMoment.format('LT'), '').trim().replace(lxDatePicker.ngModelMoment.format('YYYY'), '').trim();
            var dateFormattedLastChar = dateFormatted.slice(-1);

            if (dateFormattedLastChar === ',')
            {
                dateFormatted = dateFormatted.slice(0, -1);
            }

            return dateFormatted;
        }

        function init()
        {
            moment.locale(lxDatePicker.locale);

            lxDatePicker.ngModelMoment = angular.isDefined(lxDatePicker.ngModel) ? moment(angular.copy(lxDatePicker.ngModel)) : moment();
            lxDatePicker.days = [];
            lxDatePicker.daysOfWeek = [moment.weekdaysMin(1), moment.weekdaysMin(2), moment.weekdaysMin(3), moment.weekdaysMin(4), moment.weekdaysMin(5), moment.weekdaysMin(6), moment.weekdaysMin(0)];
            lxDatePicker.years = [];

            for (var y = moment().year() - 100; y <= moment().year() + 100; y++)
            {
                lxDatePicker.years.push(y);
            }

            generateCalendar();
        }

        function nextMonth()
        {
            lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.add(1, 'month');

            generateCalendar();
        }

        function openDatePicker()
        {
            LxDatePickerService.open(lxDatePicker.pickerId);
        }

        function previousMonth()
        {
            lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.subtract(1, 'month');

            generateCalendar();
        }

        function select(_day)
        {
            if (!_day.disabled)
            {
                lxDatePicker.ngModel = _day.toDate();
                lxDatePicker.ngModelMoment = angular.copy(_day);

                if (angular.isDefined(lxDatePicker.callback))
                {
                    lxDatePicker.callback(
                    {
                        newDate: lxDatePicker.ngModel
                    });
                }

                if (angular.isDefined(modelController) && lxDatePicker.inputFormat)
                {
                    modelController.$setViewValue(angular.copy(_day).format(lxDatePicker.inputFormat));
                    modelController.$render();
                }

                generateCalendar();
            }
        }

        function selectYear(_year)
        {
            lxDatePicker.yearSelection = false;

            lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.year(_year);

            generateCalendar();
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.date-picker')
        .service('LxDatePickerService', LxDatePickerService);

    LxDatePickerService.$inject = ['$rootScope', '$timeout', 'LxDepthService', 'LxEventSchedulerService'];

    function LxDatePickerService($rootScope, $timeout, LxDepthService, LxEventSchedulerService)
    {
        var service = this;
        var activeDatePickerId;
        var datePickerFilter;
        var idEventScheduler;
        var scopeMap = {};

        service.close = closeDatePicker;
        service.open = openDatePicker;
        service.registerScope = registerScope;

        ////////////

        function closeDatePicker(_datePickerId)
        {
            if (angular.isDefined(idEventScheduler))
            {
                LxEventSchedulerService.unregister(idEventScheduler);
                idEventScheduler = undefined;
            }

            activeDatePickerId = undefined;

            $rootScope.$broadcast('lx-date-picker__close-start', _datePickerId);

            datePickerFilter.removeClass('lx-date-picker-filter--is-shown');
            scopeMap[_datePickerId].element.removeClass('lx-date-picker--is-shown');

            $timeout(function()
            {
                angular.element('body').css(
                {
                    overflow: 'visible'
                });

                datePickerFilter.remove();

                scopeMap[_datePickerId].element
                    .hide()
                    .appendTo(scopeMap[_datePickerId].elementParent);

                scopeMap[_datePickerId].isOpen = false;
                $rootScope.$broadcast('lx-date-picker__close-end', _datePickerId);
            }, 600);
        }

        function onKeyUp(_event)
        {
            if (_event.keyCode == 27 && angular.isDefined(activeDatePickerId))
            {
                closeDatePicker(activeDatePickerId);
            }

            _event.stopPropagation();
        }

        function openDatePicker(_datePickerId)
        {
            LxDepthService.register();

            activeDatePickerId = _datePickerId;

            angular.element('body').css(
            {
                overflow: 'hidden'
            });

            datePickerFilter = angular.element('<div/>',
            {
                class: 'lx-date-picker-filter'
            });

            datePickerFilter
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            if (scopeMap[activeDatePickerId].autoClose)
            {
                datePickerFilter.on('click', function()
                {
                    closeDatePicker(activeDatePickerId);
                });
            }

            if (scopeMap[activeDatePickerId].escapeClose)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            scopeMap[activeDatePickerId].element
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body')
                .show();

            $timeout(function()
            {
                $rootScope.$broadcast('lx-date-picker__open-start', activeDatePickerId);

                scopeMap[activeDatePickerId].isOpen = true;

                datePickerFilter.addClass('lx-date-picker-filter--is-shown');
                scopeMap[activeDatePickerId].element.addClass('lx-date-picker--is-shown');
            }, 100);

            $timeout(function()
            {
                $rootScope.$broadcast('lx-date-picker__open-end', activeDatePickerId);
            }, 700);
        }

        function registerScope(_datePickerId, _datePickerScope)
        {
            scopeMap[_datePickerId] = _datePickerScope.lxDatePicker;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.dialog')
        .directive('lxDialog', lxDialog)
        .directive('lxDialogHeader', lxDialogHeader)
        .directive('lxDialogContent', lxDialogContent)
        .directive('lxDialogFooter', lxDialogFooter)
        .directive('lxDialogClose', lxDialogClose);

    lxDialog.$inject = ['LxDialogService'];

    function lxDialog(LxDialogService)
    {
        return {
            restrict: 'E',
            template: '<div class="dialog dialog--l"><div ng-if="lxDialog.isOpen" ng-transclude></div></div>',
            scope:
            {
                autoClose: '=?lxAutoClose',
                escapeClose: '=?lxEscapeClose'
            },
            link: link,
            controller: LxDialogController,
            controllerAs: 'lxDialog',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            attrs.$observe('id', function(_newId)
            {
                LxDialogService.registerScope(_newId, scope);
            });
        }
    }

    LxDialogController.$inject = ['$element'];

    function LxDialogController($element)
    {
        var lxDialog = this;

        lxDialog.autoClose = angular.isDefined(lxDialog.autoClose) ? lxDialog.autoClose : true;
        lxDialog.element = $element;
        lxDialog.elementParent = $element.parent();
        lxDialog.escapeClose = angular.isDefined(lxDialog.escapeClose) ? lxDialog.escapeClose : true;
        lxDialog.isOpen = false;
    }

    function lxDialogHeader()
    {
        return {
            restrict: 'E',
            template: '<div class="dialog__header" ng-transclude></div>',
            replace: true,
            transclude: true
        };
    }

    function lxDialogContent()
    {
        return {
            restrict: 'E',
            template: '<div class="dialog__scrollable"><div class="dialog__content" ng-transclude></div></div>',
            replace: true,
            transclude: true
        };
    }

    function lxDialogFooter()
    {
        return {
            restrict: 'E',
            template: '<div class="dialog__footer" ng-transclude></div>',
            replace: true,
            transclude: true
        };
    }

    lxDialogClose.$inject = ['LxDialogService'];

    function lxDialogClose(LxDialogService)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.on('click', function()
                {
                    LxDialogService.close(element.parents('.dialog').attr('id'));
                });

                scope.$on('$destroy', function()
                {
                    element.off();
                });
            }
        };
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.dialog')
        .service('LxDialogService', LxDialogService);

    LxDialogService.$inject = ['$interval', '$rootScope', '$timeout', '$window', 'LxDepthService', 'LxEventSchedulerService'];

    function LxDialogService($interval, $rootScope, $timeout, $window, LxDepthService, LxEventSchedulerService)
    {
        var service = this;
        var activeDialogId;
        var dialogFilter;
        var dialogHeight;
        var dialogInterval;
        var dialogScrollable;
        var idEventScheduler;
        var resizeDebounce;
        var scopeMap = {};
        var windowHeight;

        service.close = closeDialog;
        service.open = openDialog;
        service.registerScope = registerScope;

        ////////////

        function closeDialog(_dialogId)
        {
            if (angular.isDefined(idEventScheduler))
            {
                LxEventSchedulerService.unregister(idEventScheduler);
                idEventScheduler = undefined;
            }

            angular.element($window).off('resize', checkDialogHeightOnResize);
            angular.element('.dialog__scrollable').off('scroll', checkScrollEnd);

            activeDialogId = undefined;

            $rootScope.$broadcast('lx-dialog__close-start', _dialogId);

            if (resizeDebounce)
            {
                $timeout.cancel(resizeDebounce);
            }

            $interval.cancel(dialogInterval);

            dialogFilter.removeClass('dialog-filter--is-shown');
            scopeMap[_dialogId].element.removeClass('dialog--is-shown');

            $timeout(function()
            {
                angular.element('body').css(
                {
                    overflow: 'visible'
                });

                dialogFilter.remove();

                scopeMap[_dialogId].element
                    .hide()
                    .removeClass('dialog--is-fixed')
                    .appendTo(scopeMap[_dialogId].elementParent);

                scopeMap[_dialogId].isOpen = false;
                dialogHeight = undefined;
                $rootScope.$broadcast('lx-dialog__close-end', _dialogId);
            }, 600);
        }

        function checkDialogHeight(_dialogId)
        {
            var dialog = scopeMap[_dialogId].element;
            var dialogHeader = dialog.find('.dialog__header');
            var dialogContent = dialog.find('.dialog__content');
            var dialogFooter = dialog.find('.dialog__footer');

            if (!dialogFooter.length)
            {
                dialogFooter = dialog.find('.dialog__actions');
            }

            if (angular.isUndefined(dialogHeader))
            {
                return;
            }

            var heightToCheck = 60 + dialogHeader.outerHeight() + dialogContent.outerHeight() + dialogFooter.outerHeight();

            if (dialogHeight === heightToCheck && windowHeight === $window.innerHeight)
            {
                return;
            }

            dialogHeight = heightToCheck;
            windowHeight = $window.innerHeight;

            if (heightToCheck >= $window.innerHeight)
            {
                dialog.addClass('dialog--is-fixed');

                dialogScrollable
                    .css(
                    {
                        top: dialogHeader.outerHeight(),
                        bottom: dialogFooter.outerHeight()
                    })
                    .off('scroll', checkScrollEnd)
                    .on('scroll', checkScrollEnd);
            }
            else
            {
                dialog.removeClass('dialog--is-fixed');

                dialogScrollable
                    .removeAttr('style')
                    .off('scroll', checkScrollEnd);
            }
        }

        function checkDialogHeightOnResize()
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
        }

        function checkScrollEnd()
        {
            if (angular.isDefined(scopeMap[activeDialogId]))
            {
                if (dialogScrollable.scrollTop() + dialogScrollable.innerHeight() >= dialogScrollable[0].scrollHeight)
                {
                    $rootScope.$broadcast('lx-dialog__scroll-end', activeDialogId);

                    dialogScrollable.off('scroll', checkScrollEnd);

                    $timeout(function()
                    {
                        dialogScrollable.on('scroll', checkScrollEnd);
                    }, 500);
                }
            }
        }

        function onKeyUp(_event)
        {
            if (_event.keyCode == 27 && angular.isDefined(activeDialogId))
            {
                closeDialog(activeDialogId);
            }

            _event.stopPropagation();
        }

        function openDialog(_dialogId)
        {
            LxDepthService.register();

            activeDialogId = _dialogId;

            angular.element('body').css(
            {
                overflow: 'hidden'
            });

            dialogFilter = angular.element('<div/>',
            {
                class: 'dialog-filter'
            });

            dialogFilter
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            if (scopeMap[activeDialogId].autoClose)
            {
                dialogFilter.on('click', function()
                {
                    closeDialog(activeDialogId);
                });
            }

            if (scopeMap[activeDialogId].escapeClose)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            scopeMap[activeDialogId].element
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body')
                .show();

            $timeout(function()
            {
                $rootScope.$broadcast('lx-dialog__open-start', activeDialogId);

                scopeMap[activeDialogId].isOpen = true;

                dialogFilter.addClass('dialog-filter--is-shown');
                scopeMap[activeDialogId].element.addClass('dialog--is-shown');
            }, 100);

            $timeout(function()
            {
                if (scopeMap[activeDialogId].element.find('.dialog__scrollable').length === 0)
                {
                    scopeMap[activeDialogId].element.find('.dialog__content').wrap(angular.element('<div/>',
                    {
                        class: 'dialog__scrollable'
                    }));
                }

                dialogScrollable = scopeMap[activeDialogId].element.find('.dialog__scrollable');
            }, 200);

            $timeout(function()
            {
                $rootScope.$broadcast('lx-dialog__open-end', activeDialogId);
            }, 700);

            dialogInterval = $interval(function()
            {
                checkDialogHeight(activeDialogId);
            }, 500);

            angular.element($window).on('resize', checkDialogHeightOnResize);
        }

        function registerScope(_dialogId, _dialogScope)
        {
            scopeMap[_dialogId] = _dialogScope.lxDialog;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.dropdown')
        .directive('lxDropdown', lxDropdown)
        .directive('lxDropdownToggle', lxDropdownToggle)
        .directive('lxDropdownMenu', lxDropdownMenu)
        .directive('lxDropdownFilter', lxDropdownFilter);

    lxDropdown.$inject = ['$document', '$timeout'];

    function lxDropdown($document, $timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'dropdown.html',
            scope:
            {
                effect: '@?lxEffect',
                escapeClose: '=?lxEscapeClose',
                hover: '=?lxHover',
                hoverDelay: '=?lxHoverDelay',
                offset: '@?lxOffset',
                overToggle: '=?lxOverToggle',
                position: '@?lxPosition',
                width: '@?lxWidth'
            },
            link: link,
            controller: LxDropdownController,
            controllerAs: 'lxDropdown',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrl)
        {
            var backwardOneWay = ['position', 'width'];
            var backwardTwoWay = ['escapeClose', 'overToggle'];
            var timer;

            angular.forEach(backwardOneWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    attrs.$observe(attribute, function(newValue)
                    {
                        scope.lxDropdown[attribute] = newValue;
                    });
                }
            });

            angular.forEach(backwardTwoWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    scope.$watch(function()
                    {
                        return scope.$parent.$eval(attrs[attribute]);
                    }, function(newValue)
                    {
                        scope.lxDropdown[attribute] = newValue;
                    });
                }
            });

            $document.on('click', closeDropdownMenu);

            scope.$on('$destroy', function()
            {
                ctrl.closeDropdownMenu();
                $document.off('click', closeDropdownMenu);
                $timeout.cancel(timer);
            });

            function closeDropdownMenu()
            {
                if (scope.lxDropdown.isOpen)
                {
                    timer = $timeout(function()
                    {
                        scope.$apply(function()
                        {
                            ctrl.closeDropdownMenu();
                        });
                    });
                }
            }
        }
    }

    LxDropdownController.$inject = ['$element', '$interval', '$scope', '$timeout', '$window', 'LxDepthService', 'LxEventSchedulerService', 'LxUtils'];

    function LxDropdownController($element, $interval, $scope, $timeout, $window, LxDepthService, LxEventSchedulerService, LxUtils)
    {
        var lxDropdown = this;
        var dropdownInterval;
        var dropdownMenu;
        var dropdownToggle;
        var idEventScheduler;
        var timer;

        lxDropdown.closeDropdownMenu = closeDropdownMenu;
        lxDropdown.openDropdownMenu = openDropdownMenu;
        lxDropdown.registerDropdownMenu = registerDropdownMenu;
        lxDropdown.registerDropdownToggle = registerDropdownToggle;
        lxDropdown.toggle = toggle;
        lxDropdown.uuid = LxUtils.generateUUID();

        lxDropdown.effect = angular.isDefined(lxDropdown.effect) ? lxDropdown.effect : 'expand';
        lxDropdown.escapeClose = angular.isDefined(lxDropdown.escapeClose) ? lxDropdown.escapeClose : true;
        lxDropdown.isOpen = false;
        lxDropdown.overToggle = angular.isDefined(lxDropdown.overToggle) ? lxDropdown.overToggle : false;
        lxDropdown.position = angular.isDefined(lxDropdown.position) ? lxDropdown.position : 'left';

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        ////////////

        function closeDropdownMenu()
        {
            var velocityProperties;
            var velocityEasing;

            $interval.cancel(dropdownInterval);

            dropdownMenu.css(
            {
                overflow: 'hidden'
            });

            if (lxDropdown.effect === 'expand')
            {
                velocityProperties = {
                    width: 0,
                    height: 0
                };

                velocityEasing = 'easeOutQuint';
            }
            else if (lxDropdown.effect === 'fade')
            {
                velocityProperties = {
                    opacity: 0
                };

                velocityEasing = 'linear';
            }

            dropdownMenu.velocity(velocityProperties,
            {
                duration: 200,
                easing: velocityEasing,
                complete: function()
                {
                    $element.find('.dropdown').removeClass('dropdown--is-open');

                    dropdownMenu
                        .removeAttr('style')
                        .removeClass('dropdown-menu--is-open')
                        .appendTo($element.find('.dropdown'));

                    $scope.$apply(function()
                    {
                        lxDropdown.isOpen = false;

                        if (lxDropdown.escapeClose)
                        {
                            LxEventSchedulerService.unregister(idEventScheduler);
                            idEventScheduler = undefined;
                        }
                    });
                }
            });
        }

        function openDropdownMenu()
        {
            LxDepthService.register();

            lxDropdown.isOpen = true;

            $element.find('.dropdown').addClass('dropdown--is-open');

            dropdownMenu
                .addClass('dropdown-menu--is-open')
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            if (lxDropdown.escapeClose)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            timer = $timeout(function()
            {
                var enoughtHeight = true;
                var availableHeight = setDropdownMenuCss();
                var width = dropdownMenu.outerWidth();
                var height = dropdownMenu.outerHeight();

                if (availableHeight < height)
                {
                    enoughtHeight = false;
                    height = availableHeight;
                }

                if (lxDropdown.effect === 'expand')
                {
                    dropdownMenu.css(
                    {
                        width: 0,
                        height: 0,
                        opacity: 1,
                        overflow: 'hidden'
                    });

                    dropdownMenu.find('.dropdown-menu__content').css(
                    {
                        width: width,
                        height: height
                    });

                    dropdownMenu.velocity(
                    {
                        width: width
                    },
                    {
                        duration: 200,
                        easing: 'easeOutQuint',
                        queue: false
                    });

                    dropdownMenu.velocity(
                    {
                        height: height
                    },
                    {
                        duration: 500,
                        easing: 'easeOutQuint',
                        queue: false,
                        complete: function()
                        {
                            dropdownMenu.css(
                            {
                                overflow: 'auto'
                            });

                            if (enoughtHeight)
                            {
                                dropdownMenu.css(
                                {
                                    height: 'auto'
                                });
                            }

                            if (angular.isUndefined(lxDropdown.width))
                            {
                                dropdownMenu.css(
                                {
                                    width: 'auto'
                                });
                            }

                            dropdownMenu.find('.dropdown-menu__content').removeAttr('style');

                            dropdownInterval = $interval(function()
                            {
                                setDropdownMenuCss();
                            }, 500);
                        }
                    });
                }
                else if (lxDropdown.effect === 'fade')
                {
                    dropdownMenu.velocity(
                    {
                        opacity: 1,
                    },
                    {
                        duration: 200,
                        easing: 'linear',
                        queue: false,
                        complete: function()
                        {
                            dropdownInterval = $interval(function()
                            {
                                setDropdownMenuCss();
                            }, 500);
                        }
                    });
                }
            });
        }

        function onKeyUp(_event)
        {
            if (_event.keyCode == 27)
            {
                closeDropdownMenu();
            }

            _event.stopPropagation();
        }

        function registerDropdownMenu(_dropdownMenu)
        {
            dropdownMenu = _dropdownMenu;
        }

        function registerDropdownToggle(_dropdownToggle)
        {
            dropdownToggle = _dropdownToggle;
        }

        function setDropdownMenuCss()
        {
            var windowWidth = $window.innerWidth;
            var windowHeight = $window.innerHeight;
            var dropdownToggleWidth = dropdownToggle.outerWidth();
            var dropdownToggleHeight = dropdownToggle.outerHeight();
            var dropdownToggleTop = dropdownToggle.offset().top - angular.element($window).scrollTop();
            var dropdownMenuTopAvailable;
            var dropdownMenuBottomAvailable;
            var dropdownMenuWidth;

            if (lxDropdown.overToggle)
            {
                dropdownMenuTopAvailable = dropdownToggleTop + dropdownToggleHeight;
                dropdownMenuBottomAvailable = windowHeight - dropdownToggleTop;
            }
            else
            {
                dropdownMenuTopAvailable = dropdownToggleTop;
                dropdownMenuBottomAvailable = windowHeight - (dropdownToggleTop + dropdownToggleHeight);
            }

            if (angular.isDefined(lxDropdown.width))
            {
                if (lxDropdown.width.indexOf('%') > -1)
                {
                    dropdownMenuWidth = dropdownToggleWidth * (lxDropdown.width.slice(0, -1) / 100);
                }
                else
                {
                    dropdownMenuWidth = lxDropdown.width;
                }
            }
            else
            {
                dropdownMenuWidth = 'auto';
            }

            dropdownMenu.css(
            {
                right: lxDropdown.position === 'right' ? (windowWidth - dropdownToggle.offset().left - dropdownToggleWidth) : 'auto',
                left: lxDropdown.position === 'right' ? 'auto' : dropdownToggle.offset().left,
                width: dropdownMenuWidth
            });

            if (dropdownMenuTopAvailable > dropdownMenuBottomAvailable)
            {
                dropdownMenu.css(
                {
                    bottom: lxDropdown.overToggle ? (windowHeight - dropdownToggle.offset().top - dropdownToggleHeight) : (windowHeight - dropdownToggle.offset().top + ~~lxDropdown.offset)
                });

                return dropdownMenuTopAvailable;
            }
            else
            {
                dropdownMenu.css(
                {
                    top: lxDropdown.overToggle ? dropdownToggle.offset().top : (dropdownToggle.offset().top + dropdownToggleHeight + ~~lxDropdown.offset)
                });

                return dropdownMenuBottomAvailable;
            }
        }

        function toggle()
        {
            if (!lxDropdown.isOpen)
            {
                openDropdownMenu();
            }
            else
            {
                closeDropdownMenu();
            }
        }
    }

    lxDropdownToggle.$inject = ['$timeout'];

    function lxDropdownToggle($timeout)
    {
        return {
            restrict: 'AE',
            templateUrl: 'dropdown-toggle.html',
            require: '^lxDropdown',
            scope: true,
            link: link,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrl)
        {
            var timer1;
            var timer2;

            ctrl.registerDropdownToggle(element);

            element.on(ctrl.hover ? 'mouseenter' : 'click', function(_event)
            {
                if (!ctrl.hover)
                {
                    _event.stopPropagation();
                }

                angular.element('.dropdown').each(function(index, dropdownElem)
                {
                    if (angular.isDefined(angular.element(dropdownElem).scope().lxDropdown) &&
                        angular.element(dropdownElem).scope().lxDropdown.isOpen &&
                        angular.element(dropdownElem).scope().lxDropdown.uuid !== ctrl.uuid)
                    {
                        angular.element(dropdownElem).scope().lxDropdown.closeDropdownMenu();
                    }
                });

                if (ctrl.hover)
                {
                    ctrl.mouseOnToggle = true;

                    if (!ctrl.isOpen)
                    {
                        timer1 = $timeout(function()
                        {
                            scope.$apply(function()
                            {
                                ctrl.openDropdownMenu();
                            });
                        }, ctrl.hoverDelay);
                    }
                }
                else
                {
                    scope.$apply(function()
                    {
                        ctrl.toggle();
                    });
                }
            });

            if (ctrl.hover)
            {
                element.on('mouseleave', function()
                {
                    ctrl.mouseOnToggle = false;

                    $timeout.cancel(timer1);

                    timer2 = $timeout(function()
                    {
                        if (!ctrl.mouseOnMenu)
                        {
                            scope.$apply(function()
                            {
                                ctrl.closeDropdownMenu();
                            });
                        }
                    }, ctrl.hoverDelay);
                });
            }

            scope.$on('$destroy', function()
            {
                element.off();

                if (ctrl.hover)
                {
                    $timeout.cancel(timer1);
                    $timeout.cancel(timer2);
                }
            });
        }
    }

    lxDropdownMenu.$inject = ['$timeout'];

    function lxDropdownMenu($timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'dropdown-menu.html',
            require: ['lxDropdownMenu', '^lxDropdown'],
            scope: true,
            link: link,
            controller: LxDropdownMenuController,
            controllerAs: 'lxDropdownMenu',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrls)
        {
            var timer;

            ctrls[1].registerDropdownMenu(element);
            ctrls[0].setParentController(ctrls[1]);

            if (ctrls[1].hover)
            {
                element.on('mouseenter', function()
                {
                    ctrls[1].mouseOnMenu = true;
                });

                element.on('mouseleave', function()
                {
                    ctrls[1].mouseOnMenu = false;

                    timer = $timeout(function()
                    {
                        if (!ctrls[1].mouseOnToggle)
                        {
                            scope.$apply(function()
                            {
                                ctrls[1].closeDropdownMenu();
                            });
                        }
                    }, ctrls[1].hoverDelay);
                });
            }

            scope.$on('$destroy', function()
            {
                if (ctrls[1].hover)
                {
                    element.off();
                    $timeout.cancel(timer);
                }
            });
        }
    }

    function LxDropdownMenuController()
    {
        var lxDropdownMenu = this;

        lxDropdownMenu.setParentController = setParentController;

        ////////////

        function setParentController(_parentCtrl)
        {
            lxDropdownMenu.parentCtrl = _parentCtrl;
        }
    }

    lxDropdownFilter.$inject = ['$timeout'];

    function lxDropdownFilter($timeout)
    {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element)
        {
            var timer;

            element.on('click', function(_event)
            {
                _event.stopPropagation();
            });

            timer = $timeout(function()
            {
                element.find('input').focus();
            }, 200);

            scope.$on('$destroy', function()
            {
                $timeout.cancel(timer);
                element.off();
            });
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.fab')
        .directive('lxFab', lxFab)
        .directive('lxFabTrigger', lxFabTrigger)
        .directive('lxFabActions', lxFabActions);

    function lxFab()
    {
        return {
            restrict: 'E',
            templateUrl: 'fab.html',
            scope: true,
            link: link,
            controller: LxFabController,
            controllerAs: 'lxFab',
            bindToController: true,
            transclude: true,
            replace: true
        };

        function link(scope, element, attrs, ctrl)
        {
            attrs.$observe('lxDirection', function(newDirection)
            {
                ctrl.setFabDirection(newDirection);
            });
        }
    }

    function LxFabController()
    {
        var lxFab = this;

        lxFab.setFabDirection = setFabDirection;

        ////////////

        function setFabDirection(_direction)
        {
            lxFab.lxDirection = _direction;
        }
    }

    function lxFabTrigger()
    {
        return {
            restrict: 'E',
            require: '^lxFab',
            templateUrl: 'fab-trigger.html',
            transclude: true,
            replace: true
        };
    }

    function lxFabActions()
    {
        return {
            restrict: 'E',
            require: '^lxFab',
            templateUrl: 'fab-actions.html',
            link: link,
            transclude: true,
            replace: true
        };

        function link(scope, element, attrs, ctrl)
        {
            scope.parentCtrl = ctrl;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.file-input')
        .directive('lxFileInput', lxFileInput);

    function lxFileInput()
    {
        return {
            restrict: 'E',
            templateUrl: 'file-input.html',
            scope:
            {
                label: '@lxLabel',
                callback: '&?lxCallback'
            },
            link: link,
            controller: LxFileInputController,
            controllerAs: 'lxFileInput',
            bindToController: true,
            replace: true
        };

        function link(scope, element, attrs, ctrl)
        {
            var input = element.find('input');

            input
                .on('change', ctrl.updateModel)
                .on('blur', function()
                {
                    element.removeClass('input-file--is-focus');
                });

            scope.$on('$destroy', function()
            {
                input.off();
            });
        }
    }

    LxFileInputController.$inject = ['$element', '$scope', '$timeout'];

    function LxFileInputController($element, $scope, $timeout)
    {
        var lxFileInput = this;
        var input = $element.find('input');
        var timer;

        lxFileInput.updateModel = updateModel;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        ////////////

        function setFileName()
        {
            if (input.val())
            {
                lxFileInput.fileName = input.val().replace(/C:\\fakepath\\/i, '');

                $element.addClass('input-file--is-focus');
                $element.addClass('input-file--is-active');
            }
            else
            {
                lxFileInput.fileName = undefined;

                $element.removeClass('input-file--is-active');
            }

            input.val(undefined);
        }

        function updateModel()
        {
            if (angular.isDefined(lxFileInput.callback))
            {
                lxFileInput.callback(
                {
                    newFile: input[0].files[0]
                });
            }

            timer = $timeout(setFileName);
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.icon')
        .directive('lxIcon', lxIcon);

    function lxIcon()
    {
        return {
            restrict: 'E',
            templateUrl: 'icon.html',
            scope:
            {
                color: '@?lxColor',
                id: '@lxId',
                size: '@?lxSize',
                type: '@?lxType'
            },
            controller: LxIconController,
            controllerAs: 'lxIcon',
            bindToController: true,
            replace: true
        };
    }

    function LxIconController()
    {
        var lxIcon = this;

        lxIcon.getClass = getClass;

        ////////////

        function getClass()
        {
            var iconClass = [];

            iconClass.push('mdi-' + lxIcon.id);

            if (angular.isDefined(lxIcon.size))
            {
                iconClass.push('icon--' + lxIcon.size);
            }

            if (angular.isDefined(lxIcon.color))
            {
                iconClass.push('icon--' + lxIcon.color);
            }

            if (angular.isDefined(lxIcon.type))
            {
                iconClass.push('icon--' + lxIcon.type);
            }

            return iconClass;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.notification')
        .service('LxNotificationService', LxNotificationService);

    LxNotificationService.$inject = ['$injector', '$interval', '$rootScope', '$timeout', 'LxDepthService', 'LxEventSchedulerService'];

    function LxNotificationService($injector, $interval, $rootScope, $timeout, LxDepthService, LxEventSchedulerService)
    {
        var service = this;
        var dialogFilter;
        var dialog;
        var idEventScheduler;
        var notificationList = [];

        service.alert = showAlertDialog;
        service.confirm = showConfirmDialog;
        service.error = notifyError;
        service.info = notifyInfo;
        service.notify = notify;
        service.success = notifySuccess;
        service.warning = notifyWarning;

        ////////////

        //
        // NOTIFICATION
        //

        function deleteNotification(_notification)
        {
            var notifIndex = notificationList.indexOf(_notification);

            var dnOffset = angular.isDefined(notificationList[notifIndex]) ? 24 + notificationList[notifIndex].height : 24;

            for (var idx = 0; idx < notifIndex; idx++)
            {
                if (notificationList.length > 1)
                {
                    notificationList[idx].margin -= dnOffset;
                    notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
                }
            }

            _notification.elem.removeClass('notification--is-shown');

            $timeout(function()
            {
                _notification.elem.remove();

                // Find index again because notificationList may have changed
                notifIndex = notificationList.indexOf(_notification);

                if (notifIndex != -1)
                {
                    notificationList.splice(notifIndex, 1);
                }
            }, 400);
        }

        function getElementHeight(_elem)
        {
            return parseFloat(window.getComputedStyle(_elem, null).height);
        }

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

        function notify(_text, _icon, _sticky, _color)
        {
            LxDepthService.register();

            var notification = angular.element('<div/>',
            {
                class: 'notification'
            });
            var notificationText = angular.element('<span/>',
            {
                class: 'notification__content',
                html: _text
            });
            var notificationTimeout;

            if (angular.isDefined(_icon))
            {
                var notificationIcon = angular.element('<i/>',
                {
                    class: 'notification__icon mdi mdi-' + _icon
                });

                notification
                    .addClass('notification--has-icon')
                    .append(notificationIcon);
            }

            if (angular.isDefined(_color))
            {
                notification.addClass('notification--' + _color);
            }

            notification
                .append(notificationText)
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            $timeout(function()
            {
                notification.addClass('notification--is-shown');
            }, 100);

            var data = {
                elem: notification,
                margin: 0
            };
            notificationList.push(data);
            moveNotificationUp();

            notification.bind('click', function()
            {
                deleteNotification(data);

                if (angular.isDefined(notificationTimeout))
                {
                    $timeout.cancel(notificationTimeout);
                }
            });

            if (angular.isUndefined(_sticky) || !_sticky)
            {
                notificationTimeout = $interval(function()
                {
                    deleteNotification(data);
                }, 6000, 1);
            }
        }

        function notifyError(_text, _sticky)
        {
            notify(_text, 'alert-circle', _sticky, 'red');
        }

        function notifyInfo(_text, _sticky)
        {
            notify(_text, 'information-outline', _sticky, 'blue');
        }

        function notifySuccess(_text, _sticky)
        {
            notify(_text, 'check', _sticky, 'green');
        }

        function notifyWarning(_text, _sticky)
        {
            notify(_text, 'alert', _sticky, 'orange');
        }

        //
        // ALERT & CONFIRM
        //

        function buildDialogActions(_buttons, _callback, _unbind)
        {
            var $compile = $injector.get('$compile');

            var dialogActions = angular.element('<div/>',
            {
                class: 'dialog__actions'
            });

            var dialogLastBtn = angular.element('<button/>',
            {
                class: 'btn btn--m btn--blue btn--flat',
                text: _buttons.ok
            });

            if (angular.isDefined(_buttons.cancel))
            {
                var dialogFirstBtn = angular.element('<button/>',
                {
                    class: 'btn btn--m btn--red btn--flat',
                    text: _buttons.cancel
                });

                dialogFirstBtn.attr('lx-ripple', '');
                $compile(dialogFirstBtn)($rootScope);

                dialogActions.append(dialogFirstBtn);

                dialogFirstBtn.bind('click', function()
                {
                    _callback(false);
                    closeDialog();
                });
            }

            dialogLastBtn.attr('lx-ripple', '');
            $compile(dialogLastBtn)($rootScope);

            dialogActions.append(dialogLastBtn);

            dialogLastBtn.bind('click', function()
            {
                _callback(true);
                closeDialog();
            });

            if (!_unbind)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', function(event)
                {
                    if (event.keyCode == 13)
                    {
                        _callback(true);
                        closeDialog();
                    }
                    else if (event.keyCode == 27)
                    {
                        _callback(angular.isUndefined(_buttons.cancel));
                        closeDialog();
                    }

                    event.stopPropagation();
                });
            }

            return dialogActions;
        }

        function buildDialogContent(_text)
        {
            var dialogContent = angular.element('<div/>',
            {
                class: 'dialog__content p++ pt0 tc-black-2',
                text: _text
            });

            return dialogContent;
        }

        function buildDialogHeader(_title)
        {
            var dialogHeader = angular.element('<div/>',
            {
                class: 'dialog__header p++ fs-title',
                text: _title
            });

            return dialogHeader;
        }

        function closeDialog()
        {
            if (angular.isDefined(idEventScheduler))
            {
                $timeout(function()
                {
                    LxEventSchedulerService.unregister(idEventScheduler);
                    idEventScheduler = undefined;
                }, 1);
            }

            dialogFilter.removeClass('dialog-filter--is-shown');
            dialog.removeClass('dialog--is-shown');

            $timeout(function()
            {
                dialogFilter.remove();
                dialog.remove();
            }, 600);
        }

        function showAlertDialog(_title, _text, _button, _callback, _unbind)
        {
            LxDepthService.register();

            dialogFilter = angular.element('<div/>',
            {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>',
            {
                class: 'dialog dialog--alert'
            });

            var dialogHeader = buildDialogHeader(_title);
            var dialogContent = buildDialogContent(_text);
            var dialogActions = buildDialogActions(
            {
                ok: _button
            }, _callback, _unbind);

            dialogFilter
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body')
                .show()
                .focus();

            $timeout(function()
            {
                angular.element(document.activeElement).blur();

                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }

        function showConfirmDialog(_title, _text, _buttons, _callback, _unbind)
        {
            LxDepthService.register();

            dialogFilter = angular.element('<div/>',
            {
                class: 'dialog-filter'
            });

            dialog = angular.element('<div/>',
            {
                class: 'dialog dialog--alert'
            });

            var dialogHeader = buildDialogHeader(_title);
            var dialogContent = buildDialogContent(_text);
            var dialogActions = buildDialogActions(_buttons, _callback, _unbind);

            dialogFilter
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body')
                .show()
                .focus();

            $timeout(function()
            {
                angular.element(document.activeElement).blur();

                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.progress')
        .directive('lxProgress', lxProgress);

    function lxProgress()
    {
        return {
            restrict: 'E',
            templateUrl: 'progress.html',
            scope:
            {
                lxColor: '@?',
                lxDiameter: '@?',
                lxType: '@',
                lxValue: '@'
            },
            controller: LxProgressController,
            controllerAs: 'lxProgress',
            bindToController: true,
            replace: true
        };
    }

    function LxProgressController()
    {
        var lxProgress = this;

        lxProgress.getCircularProgressValue = getCircularProgressValue;
        lxProgress.getLinearProgressValue = getLinearProgressValue;
        lxProgress.getProgressDiameter = getProgressDiameter;

        init();

        ////////////

        function getCircularProgressValue()
        {
            if (angular.isDefined(lxProgress.lxValue))
            {
                return {
                    'stroke-dasharray': lxProgress.lxValue * 1.26 + ',200'
                };
            }
        }

        function getLinearProgressValue()
        {
            if (angular.isDefined(lxProgress.lxValue))
            {
                return {
                    'transform': 'scale(' + lxProgress.lxValue / 100 + ', 1)'
                };
            }
        }

        function getProgressDiameter()
        {
            if (lxProgress.lxType === 'circular')
            {
                return {
                    'transform': 'scale(' + parseInt(lxProgress.lxDiameter) / 100 + ')'
                };
            }

            return;
        }

        function init()
        {
            lxProgress.lxDiameter = angular.isDefined(lxProgress.lxDiameter) ? lxProgress.lxDiameter : 100;
            lxProgress.lxColor = angular.isDefined(lxProgress.lxColor) ? lxProgress.lxColor : 'primary';
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.radio-button')
        .directive('lxRadioGroup', lxRadioGroup)
        .directive('lxRadioButton', lxRadioButton)
        .directive('lxRadioButtonLabel', lxRadioButtonLabel)
        .directive('lxRadioButtonHelp', lxRadioButtonHelp);

    function lxRadioGroup()
    {
        return {
            restrict: 'E',
            templateUrl: 'radio-group.html',
            transclude: true,
            replace: true
        };
    }

    function lxRadioButton()
    {
        return {
            restrict: 'E',
            templateUrl: 'radio-button.html',
            scope:
            {
                lxColor: '@?',
                name: '@',
                ngChange: '&?',
                ngDisabled: '=?',
                ngModel: '=',
                ngValue: '=?',
                value: '@?'
            },
            controller: LxRadioButtonController,
            controllerAs: 'lxRadioButton',
            bindToController: true,
            transclude: true,
            replace: true
        };
    }

    LxRadioButtonController.$inject = ['$scope', '$timeout', 'LxUtils'];

    function LxRadioButtonController($scope, $timeout, LxUtils)
    {
        var lxRadioButton = this;
        var radioButtonId;
        var radioButtonHasChildren;
        var timer;

        lxRadioButton.getRadioButtonId = getRadioButtonId;
        lxRadioButton.getRadioButtonHasChildren = getRadioButtonHasChildren;
        lxRadioButton.setRadioButtonId = setRadioButtonId;
        lxRadioButton.setRadioButtonHasChildren = setRadioButtonHasChildren;
        lxRadioButton.triggerNgChange = triggerNgChange;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        init();

        ////////////

        function getRadioButtonId()
        {
            return radioButtonId;
        }

        function getRadioButtonHasChildren()
        {
            return radioButtonHasChildren;
        }

        function init()
        {
            setRadioButtonId(LxUtils.generateUUID());
            setRadioButtonHasChildren(false);

            if (angular.isDefined(lxRadioButton.value) && angular.isUndefined(lxRadioButton.ngValue))
            {
                lxRadioButton.ngValue = lxRadioButton.value;
            }

            lxRadioButton.lxColor = angular.isUndefined(lxRadioButton.lxColor) ? 'accent' : lxRadioButton.lxColor;
        }

        function setRadioButtonId(_radioButtonId)
        {
            radioButtonId = _radioButtonId;
        }

        function setRadioButtonHasChildren(_radioButtonHasChildren)
        {
            radioButtonHasChildren = _radioButtonHasChildren;
        }

        function triggerNgChange()
        {
            timer = $timeout(lxRadioButton.ngChange);
        }
    }

    function lxRadioButtonLabel()
    {
        return {
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

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setRadioButtonHasChildren(true);
            ctrls[1].setRadioButtonId(ctrls[0].getRadioButtonId());
        }
    }

    function LxRadioButtonLabelController()
    {
        var lxRadioButtonLabel = this;
        var radioButtonId;

        lxRadioButtonLabel.getRadioButtonId = getRadioButtonId;
        lxRadioButtonLabel.setRadioButtonId = setRadioButtonId;

        ////////////

        function getRadioButtonId()
        {
            return radioButtonId;
        }

        function setRadioButtonId(_radioButtonId)
        {
            radioButtonId = _radioButtonId;
        }
    }

    function lxRadioButtonHelp()
    {
        return {
            restrict: 'AE',
            require: '^lxRadioButton',
            templateUrl: 'radio-button-help.html',
            transclude: true,
            replace: true
        };
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.ripple')
        .directive('lxRipple', lxRipple);

    lxRipple.$inject = ['$timeout'];

    function lxRipple($timeout)
    {
        return {
            restrict: 'A',
            link: link,
        };

        function link(scope, element, attrs)
        {
            var timer;

            element
                .css(
                {
                    position: 'relative',
                    overflow: 'hidden'
                })
                .on('mousedown', function(e)
                {
                    var ripple;

                    if (element.find('.ripple').length === 0)
                    {
                        ripple = angular.element('<span/>',
                        {
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

                        ripple.css(
                        {
                            height: diameter,
                            width: diameter
                        });
                    }

                    var x = e.pageX - element.offset().left - ripple.width() / 2;
                    var y = e.pageY - element.offset().top - ripple.height() / 2;

                    ripple.css(
                    {
                        top: y + 'px',
                        left: x + 'px'
                    }).addClass('ripple--is-animated');

                    timer = $timeout(function()
                    {
                        ripple.removeClass('ripple--is-animated');
                    }, 651);
                });

            scope.$on('$destroy', function()
            {
                $timeout.cancel(timer);
                element.off();
            });
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.search-filter')
        .directive('lxSearchFilter', lxSearchFilter);

    function lxSearchFilter()
    {
        return {
            restrict: 'E',
            templateUrl: 'search-filter.html',
            scope:
            {
                closed: '=?lxClosed',
                color: '@?lxColor',
                width: '@?lxWidth'
            },
            link: link,
            controller: LxSearchFilterController,
            controllerAs: 'lxSearchFilter',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrl, transclude)
        {
            var input;

            attrs.$observe('lxWidth', function(newWidth)
            {
                if (angular.isDefined(scope.lxSearchFilter.closed) && scope.lxSearchFilter.closed)
                {
                    element.find('.search-filter__container').css('width', newWidth);
                }
            });

            transclude(function()
            {
                input = element.find('input');

                ctrl.setInput(input);
                ctrl.setModel(input.data('$ngModelController'));

                input.on('blur', ctrl.blurInput);
            });

            scope.$on('$destroy', function()
            {
                input.off();
            });
        }
    }

    LxSearchFilterController.$inject = ['$element'];

    function LxSearchFilterController($element)
    {
        var lxSearchFilter = this;
        var input;
        var modelController;

        lxSearchFilter.blurInput = blurInput;
        lxSearchFilter.clearInput = clearInput;
        lxSearchFilter.getClass = getClass;
        lxSearchFilter.openInput = openInput;
        lxSearchFilter.setInput = setInput;
        lxSearchFilter.setModel = setModel;

        lxSearchFilter.color = angular.isDefined(lxSearchFilter.color) ? lxSearchFilter.color : 'black';

        ////////////

        function blurInput()
        {
            if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed && !input.val())
            {
                $element.velocity(
                {
                    width: 40
                },
                {
                    duration: 400,
                    easing: 'easeOutQuint',
                    queue: false
                });
            }
        }

        function clearInput()
        {
            modelController.$setViewValue(undefined);
            modelController.$render();

            input.focus();
        }

        function getClass()
        {
            var searchFilterClass = [];

            if (angular.isUndefined(lxSearchFilter.closed) || !lxSearchFilter.closed)
            {
                searchFilterClass.push('search-filter--opened-mode');
            }

            if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed)
            {
                searchFilterClass.push('search-filter--closed-mode');
            }

            if (input.val())
            {
                searchFilterClass.push('search-filter--has-clear-button');
            }

            if (angular.isDefined(lxSearchFilter.color))
            {
                searchFilterClass.push('search-filter--' + lxSearchFilter.color);
            }

            return searchFilterClass;
        }

        function openInput()
        {
            if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed)
            {
                $element.velocity(
                {
                    width: angular.isDefined(lxSearchFilter.width) ? lxSearchFilter.width : 240
                },
                {
                    duration: 400,
                    easing: 'easeOutQuint',
                    queue: false,
                    complete: function()
                    {
                        input.focus();
                    }
                });
            }
            else
            {
                input.focus();
            }
        }

        function setInput(_input)
        {
            input = _input;
        }

        function setModel(_modelControler)
        {
            modelController = _modelControler;
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.select')
        .filter('filterChoices', filterChoices)
        .directive('lxSelect', lxSelect)
        .directive('lxSelectSelected', lxSelectSelected)
        .directive('lxSelectChoices', lxSelectChoices);

    filterChoices.$inject = ['$filter'];

    function filterChoices($filter)
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
    }

    function lxSelect()
    {
        return {
            restrict: 'E',
            templateUrl: 'select.html',
            scope:
            {
                allowClear: '=?lxAllowClear',
                choices: '=?lxChoices',
                customStyle: '@?lxCustomStyle',
                displayFilter: '=?lxDisplayFilter',
                error: '=?lxError',
                filter: '&?lxFilter',
                fixedLabel: '=?lxFixedLabel',
                helper: '=?lxHelper',
                helperMessage: '@?lxHelperMessage',
                label: '@?lxLabel',
                loading: '=?lxLoading',
                modelToSelection: '&?lxModelToSelection',
                multiple: '=?lxMultiple',
                ngChange: '&?',
                ngDisabled: '=?',
                ngModel: '=',
                selectionToModel: '&?lxSelectionToModel',
                theme: '@?lxTheme',
                valid: '=?lxValid'
            },
            link: link,
            controller: LxSelectController,
            controllerAs: 'lxSelect',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            var backwardOneWay = ['customStyle'];
            var backwardTwoWay = ['allowClear', 'choices', 'error', 'loading', 'multiple', 'valid'];

            angular.forEach(backwardOneWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    attrs.$observe(attribute, function(newValue)
                    {
                        scope.lxSelect[attribute] = newValue;
                    });
                }
            });

            angular.forEach(backwardTwoWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    scope.$watch(function()
                    {
                        return scope.$parent.$eval(attrs[attribute]);
                    }, function(newValue)
                    {
                        if (attribute === 'multiple' && angular.isUndefined(newValue))
                        {
                            scope.lxSelect[attribute] = true;
                        }
                        else
                        {
                            scope.lxSelect[attribute] = newValue;
                        }
                    });
                }
            });

            attrs.$observe('placeholder', function(newValue)
            {
                scope.lxSelect.label = newValue;
            });

            attrs.$observe('change', function(newValue)
            {
                scope.lxSelect.ngChange = function(data)
                {
                    return scope.$parent.$eval(newValue, data);
                };
            });

            attrs.$observe('filter', function(newValue)
            {
                scope.lxSelect.filter = function(data)
                {
                    return scope.$parent.$eval(newValue, data);
                };
                scope.lxSelect.displayFilter = true;
            });

            attrs.$observe('modelToSelection', function(newValue)
            {
                scope.lxSelect.modelToSelection = function(data)
                {
                    return scope.$parent.$eval(newValue, data);
                };
            });

            attrs.$observe('selectionToModel', function(newValue)
            {
                scope.lxSelect.selectionToModel = function(data)
                {
                    return scope.$parent.$eval(newValue, data);
                };
            });
        }
    }

    LxSelectController.$inject = ['$interpolate', '$sce'];

    function LxSelectController($interpolate, $sce)
    {
        var lxSelect = this;
        var choiceTemplate;
        var selectedTemplate;

        lxSelect.displayChoice = displayChoice;
        lxSelect.displaySelected = displaySelected;
        lxSelect.displaySubheader = displaySubheader;
        lxSelect.getSelectedModel = getSelectedModel;
        lxSelect.registerChoiceTemplate = registerChoiceTemplate;
        lxSelect.registerSelectedTemplate = registerSelectedTemplate;
        lxSelect.select = select;
        lxSelect.unselect = unselect;

        lxSelect.ngModel = angular.isUndefined(lxSelect.ngModel) && lxSelect.multiple ? [] : lxSelect.ngModel;
        lxSelect.unconvertedModel = lxSelect.multiple ? [] : undefined;

        ////////////

        function displayChoice(_choice)
        {
            var choiceScope = {
                $choice: _choice
            };

            return $sce.trustAsHtml($interpolate(choiceTemplate)(choiceScope));
        }

        function displaySelected(_selected)
        {
            var selectedScope = {};

            if (!angular.isArray(lxSelect.choices))
            {
                var found = false;

                for (var header in lxSelect.choices)
                {
                    if (found)
                    {
                        break;
                    }

                    if (lxSelect.choices.hasOwnProperty(header))
                    {
                        for (var idx = 0, len = lxSelect.choices[header].length; idx < len; idx++)
                        {
                            if (angular.equals(_selected, lxSelect.choices[header][idx]))
                            {
                                selectedScope.$selectedSubheader = header;

                                found = true;

                                break;
                            }
                        }
                    }
                }
            }

            if (angular.isDefined(_selected))
            {
                selectedScope.$selected = _selected;
            }
            else
            {
                selectedScope.$selected = getSelectedModel();
            }

            return $sce.trustAsHtml($interpolate(selectedTemplate)(selectedScope));
        }

        function displaySubheader(_subheader)
        {
            return $sce.trustAsHtml(_subheader);
        }

        function getSelectedModel()
        {
            if (angular.isDefined(lxSelect.modelToSelection) || angular.isDefined(lxSelect.selectionToModel))
            {
                return lxSelect.unconvertedModel;
            }
            else
            {
                return lxSelect.ngModel;
            }
        }

        function registerChoiceTemplate(_choiceTemplate)
        {
            choiceTemplate = _choiceTemplate;
        }

        function registerSelectedTemplate(_selectedTemplate)
        {
            selectedTemplate = _selectedTemplate;
        }

        function select(_choice)
        {
            if (lxSelect.multiple && angular.isUndefined(lxSelect.ngModel))
            {
                lxSelect.ngModel = [];
            }

            if (angular.isDefined(lxSelect.selectionToModel))
            {
                lxSelect.selectionToModel(
                {
                    data: _choice,
                    callback: function(resp)
                    {
                        if (lxSelect.multiple)
                        {
                            lxSelect.ngModel.push(resp);
                        }
                        else
                        {
                            lxSelect.ngModel = resp;
                        }
                    }
                });
            }
            else
            {
                if (lxSelect.multiple)
                {
                    lxSelect.ngModel.push(_choice);
                }
                else
                {
                    lxSelect.ngModel = _choice;
                }
            }
        }

        function unselect(_choice)
        {
            if (angular.isDefined(lxSelect.selectionToModel))
            {
                lxSelect.selectionToModel(
                {
                    data: _choice,
                    callback: function(resp)
                    {
                        lxSelect.ngModel.splice(lxSelect.ngModel.indexOf(resp), 1);
                    }
                });

                lxSelect.unconvertedModel.splice(lxSelect.unconvertedModel.indexOf(_choice), 1);
            }
            else
            {
                lxSelect.ngModel.splice(lxSelect.ngModel.indexOf(_choice), 1);
            }
        }
    }

    function lxSelectSelected()
    {
        return {
            restrict: 'E',
            require: ['lxSelectSelected', '^lxSelect'],
            templateUrl: 'select-selected.html',
            link: link,
            controller: LxSelectSelectedController,
            controllerAs: 'lxSelectSelected',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrls, transclude)
        {
            ctrls[0].setParentController(ctrls[1]);

            transclude(scope, function(clone)
            {
                var template = '';

                for (var i = 0; i < clone.length; i++)
                {
                    template += clone[i].outerHTML || '';
                }

                ctrls[1].registerSelectedTemplate(template);
            });
        }
    }

    function LxSelectSelectedController()
    {
        var lxSelectSelected = this;

        lxSelectSelected.clearModel = clearModel;
        lxSelectSelected.setParentController = setParentController;
        lxSelectSelected.removeSelected = removeSelected;

        ////////////

        function clearModel(_event)
        {
            _event.stopPropagation();

            lxSelectSelected.parentCtrl.ngModel = undefined;
            lxSelectSelected.parentCtrl.unconvertedModel = undefined;
        }

        function setParentController(_parentCtrl)
        {
            lxSelectSelected.parentCtrl = _parentCtrl;
        }

        function removeSelected(_selected, _event)
        {
            _event.stopPropagation();

            lxSelectSelected.parentCtrl.unselect(_selected);
        }
    }

    function lxSelectChoices()
    {
        return {
            restrict: 'E',
            require: ['lxSelectChoices', '^lxSelect'],
            templateUrl: 'select-choices.html',
            link: link,
            controller: LxSelectChoicesController,
            controllerAs: 'lxSelectChoices',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrls, transclude)
        {
            ctrls[0].setParentController(ctrls[1]);

            transclude(scope, function(clone)
            {
                var template = '';

                for (var i = 0; i < clone.length; i++)
                {
                    template += clone[i].outerHTML || '';
                }

                ctrls[1].registerChoiceTemplate(template);
            });
        }
    }

    LxSelectChoicesController.$inject = ['$scope', '$timeout'];

    function LxSelectChoicesController($scope, $timeout)
    {
        var lxSelectChoices = this;
        var timer;

        lxSelectChoices.isArray = isArray;
        lxSelectChoices.isSelected = isSelected;
        lxSelectChoices.setParentController = setParentController;
        lxSelectChoices.toggleChoice = toggleChoice;
        lxSelectChoices.updateFilter = updateFilter;

        lxSelectChoices.filterModel = undefined;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        ////////////

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

        function isArray()
        {
            return angular.isArray(lxSelectChoices.parentCtrl.choices);
        }

        function isSelected(_choice)
        {
            if (lxSelectChoices.parentCtrl.multiple && angular.isDefined(lxSelectChoices.parentCtrl.getSelectedModel()))
            {
                return arrayObjectIndexOf(lxSelectChoices.parentCtrl.getSelectedModel(), _choice) !== -1;
            }
            else if (angular.isDefined(lxSelectChoices.parentCtrl.getSelectedModel()))
            {
                return angular.equals(lxSelectChoices.parentCtrl.getSelectedModel(), _choice);
            }
        }

        function setParentController(_parentCtrl)
        {
            lxSelectChoices.parentCtrl = _parentCtrl;

            $scope.$watch(function()
            {
                return lxSelectChoices.parentCtrl.ngModel;
            }, function(newModel, oldModel)
            {
                timer = $timeout(function()
                {
                    if (newModel !== oldModel && angular.isDefined(lxSelectChoices.parentCtrl.ngChange))
                    {
                        lxSelectChoices.parentCtrl.ngChange(
                        {
                            newValue: newModel,
                            oldValue: oldModel
                        });
                    }

                    if (angular.isDefined(lxSelectChoices.parentCtrl.modelToSelection) || angular.isDefined(lxSelectChoices.parentCtrl.selectionToModel))
                    {
                        toSelection();
                    }
                });
            }, true);
        }

        function toggleChoice(_choice, _event)
        {
            if (lxSelectChoices.parentCtrl.multiple)
            {
                _event.stopPropagation();
            }

            if (lxSelectChoices.parentCtrl.multiple && isSelected(_choice))
            {
                lxSelectChoices.parentCtrl.unselect(_choice);
            }
            else
            {
                lxSelectChoices.parentCtrl.select(_choice);
            }
        }

        function toSelection()
        {
            if (lxSelectChoices.parentCtrl.multiple)
            {
                lxSelectChoices.parentCtrl.unconvertedModel = [];

                angular.forEach(lxSelectChoices.parentCtrl.ngModel, function(item)
                {
                    lxSelectChoices.parentCtrl.modelToSelection(
                    {
                        data: item,
                        callback: function(resp)
                        {
                            lxSelectChoices.parentCtrl.unconvertedModel.push(resp);
                        }
                    });
                });
            }
            else
            {
                lxSelectChoices.parentCtrl.modelToSelection(
                {
                    data: lxSelectChoices.parentCtrl.ngModel,
                    callback: function(resp)
                    {
                        lxSelectChoices.parentCtrl.unconvertedModel = resp;
                    }
                });
            }
        }

        function updateFilter()
        {
            if (angular.isDefined(lxSelectChoices.parentCtrl.filter))
            {
                lxSelectChoices.parentCtrl.filter(
                {
                    newValue: lxSelectChoices.filterModel
                });
            }
        }
    }
})();

(function()
{
    'use strict';

    angular
        .module('lumx.switch')
        .directive('lxSwitch', lxSwitch)
        .directive('lxSwitchLabel', lxSwitchLabel)
        .directive('lxSwitchHelp', lxSwitchHelp);

    function lxSwitch()
    {
        return {
            restrict: 'E',
            templateUrl: 'switch.html',
            scope:
            {
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
            transclude: true,
            replace: true
        };
    }

    LxSwitchController.$inject = ['$scope', '$timeout', 'LxUtils'];

    function LxSwitchController($scope, $timeout, LxUtils)
    {
        var lxSwitch = this;
        var switchId;
        var switchHasChildren;
        var timer;

        lxSwitch.getSwitchId = getSwitchId;
        lxSwitch.getSwitchHasChildren = getSwitchHasChildren;
        lxSwitch.setSwitchId = setSwitchId;
        lxSwitch.setSwitchHasChildren = setSwitchHasChildren;
        lxSwitch.triggerNgChange = triggerNgChange;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        init();

        ////////////

        function getSwitchId()
        {
            return switchId;
        }

        function getSwitchHasChildren()
        {
            return switchHasChildren;
        }

        function init()
        {
            setSwitchId(LxUtils.generateUUID());
            setSwitchHasChildren(false);

            lxSwitch.ngTrueValue = angular.isUndefined(lxSwitch.ngTrueValue) ? true : lxSwitch.ngTrueValue;
            lxSwitch.ngFalseValue = angular.isUndefined(lxSwitch.ngFalseValue) ? false : lxSwitch.ngFalseValue;
            lxSwitch.lxColor = angular.isUndefined(lxSwitch.lxColor) ? 'accent' : lxSwitch.lxColor;
        }

        function setSwitchId(_switchId)
        {
            switchId = _switchId;
        }

        function setSwitchHasChildren(_switchHasChildren)
        {
            switchHasChildren = _switchHasChildren;
        }

        function triggerNgChange()
        {
            timer = $timeout(lxSwitch.ngChange);
        }
    }

    function lxSwitchLabel()
    {
        return {
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

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setSwitchHasChildren(true);
            ctrls[1].setSwitchId(ctrls[0].getSwitchId());
        }
    }

    function LxSwitchLabelController()
    {
        var lxSwitchLabel = this;
        var switchId;

        lxSwitchLabel.getSwitchId = getSwitchId;
        lxSwitchLabel.setSwitchId = setSwitchId;

        ////////////

        function getSwitchId()
        {
            return switchId;
        }

        function setSwitchId(_switchId)
        {
            switchId = _switchId;
        }
    }

    function lxSwitchHelp()
    {
        return {
            restrict: 'AE',
            require: '^lxSwitch',
            templateUrl: 'switch-help.html',
            transclude: true,
            replace: true
        };
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.tabs')
        .directive('lxTabs', lxTabs)
        .directive('lxTab', lxTab)
        .directive('lxTabsPanes', lxTabsPanes)
        .directive('lxTabPane', lxTabPane);

    function lxTabs()
    {
        return {
            restrict: 'E',
            templateUrl: 'tabs.html',
            scope:
            {
                layout: '@?lxLayout',
                theme: '@?lxTheme',
                color: '@?lxColor',
                indicator: '@?lxIndicator',
                activeTab: '=?lxActiveTab',
                panesId: '@?lxPanesId',
                links: '=?lxLinks'
            },
            controller: LxTabsController,
            controllerAs: 'lxTabs',
            bindToController: true,
            replace: true,
            transclude: true
        };
    }

    LxTabsController.$inject = ['LxUtils', '$element', '$scope', '$timeout'];

    function LxTabsController(LxUtils, $element, $scope, $timeout)
    {
        var lxTabs = this;
        var tabsLength;
        var timer1;
        var timer2;
        var timer3;
        var timer4;

        lxTabs.removeTab = removeTab;
        lxTabs.setActiveTab = setActiveTab;
        lxTabs.setViewMode = setViewMode;
        lxTabs.tabIsActive = tabIsActive;
        lxTabs.updateTabs = updateTabs;

        lxTabs.activeTab = angular.isDefined(lxTabs.activeTab) ? lxTabs.activeTab : 0;
        lxTabs.color = angular.isDefined(lxTabs.color) ? lxTabs.color : 'primary';
        lxTabs.indicator = angular.isDefined(lxTabs.indicator) ? lxTabs.indicator : 'accent';
        lxTabs.layout = angular.isDefined(lxTabs.layout) ? lxTabs.layout : 'full';
        lxTabs.tabs = [];
        lxTabs.theme = angular.isDefined(lxTabs.theme) ? lxTabs.theme : 'light';
        lxTabs.viewMode = angular.isDefined(lxTabs.links) ? 'separate' : 'gather';

        $scope.$watch(function()
        {
            return lxTabs.activeTab;
        }, function(_newActiveTab, _oldActiveTab)
        {
            timer1 = $timeout(function()
            {
                setIndicatorPosition(_oldActiveTab);

                if (lxTabs.viewMode === 'separate')
                {
                    angular.element('#' + lxTabs.panesId).find('.tabs__pane').hide();
                    angular.element('#' + lxTabs.panesId).find('.tabs__pane').eq(lxTabs.activeTab).show();
                }
            });
        });

        $scope.$watch(function()
        {
            return lxTabs.links;
        }, function(_newLinks)
        {
            angular.forEach(_newLinks, function(link, index)
            {
                var tab = {
                    uuid: LxUtils.generateUUID(),
                    index: index,
                    label: link.label,
                    icon: link.icon,
                    disabled: link.disabled
                };

                updateTabs(tab);
            });
        });

        timer2 = $timeout(function()
        {
            tabsLength = lxTabs.tabs.length;
        });

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer1);
            $timeout.cancel(timer2);
            $timeout.cancel(timer3);
            $timeout.cancel(timer4);
        });

        ////////////

        function removeTab(_tab)
        {
            lxTabs.tabs.splice(_tab.index, 1);

            angular.forEach(lxTabs.tabs, function(tab, index)
            {
                tab.index = index;
            });

            if (lxTabs.activeTab === 0)
            {
                timer3 = $timeout(function()
                {
                    setIndicatorPosition();
                });
            }
            else
            {
                setActiveTab(lxTabs.tabs[0]);
            }
        }

        function setActiveTab(_tab)
        {
            if (!_tab.disabled)
            {
                lxTabs.activeTab = _tab.index;
            }
        }

        function setIndicatorPosition(_previousActiveTab)
        {
            var direction = lxTabs.activeTab > _previousActiveTab ? 'right' : 'left';
            var indicator = $element.find('.tabs__indicator');
            var activeTab = $element.find('.tabs__link').eq(lxTabs.activeTab);
            var indicatorLeft = activeTab.position().left;
            var indicatorRight = $element.outerWidth() - (indicatorLeft + activeTab.outerWidth());

            if (angular.isUndefined(_previousActiveTab))
            {
                indicator.css(
                {
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
                    indicator.velocity(
                    {
                        left: indicatorLeft
                    }, animationProperties);

                    indicator.velocity(
                    {
                        right: indicatorRight
                    }, animationProperties);
                }
                else
                {
                    indicator.velocity(
                    {
                        right: indicatorRight
                    }, animationProperties);

                    indicator.velocity(
                    {
                        left: indicatorLeft
                    }, animationProperties);
                }
            }
        }

        function setViewMode(_viewMode)
        {
            lxTabs.viewMode = _viewMode;
        }

        function tabIsActive(_index)
        {
            return lxTabs.activeTab === _index;
        }

        function updateTabs(_tab)
        {
            var newTab = true;

            angular.forEach(lxTabs.tabs, function(tab)
            {
                if (tab.uuid === _tab.uuid)
                {
                    newTab = false;

                    tab.index = _tab.index;
                    tab.icon = _tab.icon;
                    tab.label = _tab.label;
                }
            });

            if (newTab)
            {
                lxTabs.tabs.push(_tab);

                if (angular.isDefined(tabsLength))
                {
                    timer4 = $timeout(function()
                    {
                        setIndicatorPosition();
                    });
                }
            }
        }
    }

    function lxTab()
    {
        return {
            restrict: 'E',
            require: ['lxTab', '^lxTabs'],
            templateUrl: 'tab.html',
            scope:
            {
                ngDisabled: '=?'
            },
            link: link,
            controller: LxTabController,
            controllerAs: 'lxTab',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].init(ctrls[1], element.index());

            attrs.$observe('lxLabel', function(_newLabel)
            {
                ctrls[0].setLabel(_newLabel);
            });

            attrs.$observe('lxIcon', function(_newIcon)
            {
                ctrls[0].setIcon(_newIcon);
            });
        }
    }

    LxTabController.$inject = ['$scope', 'LxUtils'];

    function LxTabController($scope, LxUtils)
    {
        var lxTab = this;
        var parentCtrl;
        var tab = {
            uuid: LxUtils.generateUUID(),
            index: undefined,
            label: undefined,
            icon: undefined,
            disabled: false
        };

        lxTab.init = init;
        lxTab.setIcon = setIcon;
        lxTab.setLabel = setLabel;
        lxTab.tabIsActive = tabIsActive;

        $scope.$watch(function()
        {
            return lxTab.ngDisabled;
        }, function(_isDisabled)
        {
            if (_isDisabled)
            {
                tab.disabled = true;
            }
            else
            {
                tab.disabled = false;
            }

            parentCtrl.updateTabs(tab);
        });

        $scope.$on('$destroy', function()
        {
            parentCtrl.removeTab(tab);
        });

        ////////////

        function init(_parentCtrl, _index)
        {
            parentCtrl = _parentCtrl;
            tab.index = _index;

            parentCtrl.updateTabs(tab);
        }

        function setIcon(_icon)
        {
            tab.icon = _icon;

            parentCtrl.updateTabs(tab);
        }

        function setLabel(_label)
        {
            tab.label = _label;

            parentCtrl.updateTabs(tab);
        }

        function tabIsActive()
        {
            return parentCtrl.tabIsActive(tab.index);
        }
    }

    function lxTabsPanes()
    {
        return {
            restrict: 'E',
            templateUrl: 'tabs-panes.html',
            scope: true,
            replace: true,
            transclude: true
        };
    }

    function lxTabPane()
    {
        return {
            restrict: 'E',
            templateUrl: 'tab-pane.html',
            scope: true,
            replace: true,
            transclude: true
        };
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.text-field')
        .directive('lxTextField', lxTextField);

    lxTextField.$inject = ['$timeout'];

    function lxTextField($timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'text-field.html',
            scope:
            {
                allowClear: '=?lxAllowClear',
                error: '=?lxError',
                fixedLabel: '=?lxFixedLabel',
                icon: '@?lxIcon',
                label: '@lxLabel',
                ngDisabled: '=?',
                theme: '@?lxTheme',
                valid: '=?lxValid'
            },
            link: link,
            controller: LxTextFieldController,
            controllerAs: 'lxTextField',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrl, transclude)
        {
            var backwardOneWay = ['icon', 'label', 'theme'];
            var backwardTwoWay = ['error', 'fixedLabel', 'valid'];
            var input;
            var timer;

            angular.forEach(backwardOneWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    attrs.$observe(attribute, function(newValue)
                    {
                        scope.lxTextField[attribute] = newValue;
                    });
                }
            });

            angular.forEach(backwardTwoWay, function(attribute)
            {
                if (angular.isDefined(attrs[attribute]))
                {
                    scope.$watch(function()
                    {
                        return scope.$parent.$eval(attrs[attribute]);
                    }, function(newValue)
                    {
                        scope.lxTextField[attribute] = newValue;
                    });
                }
            });

            transclude(function()
            {
                input = element.find('textarea');

                if (input[0])
                {
                    input.on('cut paste drop keydown', function()
                    {
                        timer = $timeout(ctrl.updateTextareaHeight);
                    });
                }
                else
                {
                    input = element.find('input');
                }

                input.addClass('text-field__input');

                ctrl.setInput(input);
                ctrl.setModel(input.data('$ngModelController'));

                input.on('focus', ctrl.focusInput);
                input.on('blur', ctrl.blurInput);
            });

            scope.$on('$destroy', function()
            {
                $timeout.cancel(timer);
                input.off();
            });
        }
    }

    LxTextFieldController.$inject = ['$scope', '$timeout'];

    function LxTextFieldController($scope, $timeout)
    {
        var lxTextField = this;
        var input;
        var modelController;
        var timer1;
        var timer2;

        lxTextField.blurInput = blurInput;
        lxTextField.clearInput = clearInput;
        lxTextField.focusInput = focusInput;
        lxTextField.hasValue = hasValue;
        lxTextField.setInput = setInput;
        lxTextField.setModel = setModel;
        lxTextField.updateTextareaHeight = updateTextareaHeight;

        $scope.$watch(function()
        {
            return modelController.$viewValue;
        }, function(newValue, oldValue)
        {
            if (angular.isDefined(newValue) && newValue)
            {
                lxTextField.isActive = true;
            }
            else
            {
                lxTextField.isActive = false;
            }
        });

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer1);
            $timeout.cancel(timer2);
        });

        ////////////

        function blurInput()
        {
            if (!hasValue())
            {
                $scope.$apply(function()
                {
                    lxTextField.isActive = false;
                });
            }

            $scope.$apply(function()
            {
                lxTextField.isFocus = false;
            });
        }

        function clearInput(_event)
        {
            _event.stopPropagation();

            modelController.$setViewValue(undefined);
            modelController.$render();
        }

        function focusInput()
        {
            $scope.$apply(function()
            {
                lxTextField.isActive = true;
                lxTextField.isFocus = true;
            });
        }

        function hasValue()
        {
            return input.val();
        }

        function init()
        {
            lxTextField.isActive = hasValue();
            lxTextField.isFocus = false;
        }

        function setInput(_input)
        {
            input = _input;

            timer1 = $timeout(init);

            if (input.selector === 'textarea')
            {
                timer2 = $timeout(updateTextareaHeight);
            }
        }

        function setModel(_modelControler)
        {
            modelController = _modelControler;
        }

        function updateTextareaHeight()
        {
            var tmpTextArea = angular.element('<textarea class="text-field__input" style="width: ' + input.width() + 'px;">' + input.val() + '</textarea>');

            tmpTextArea.appendTo('body');

            input.css(
            {
                height: tmpTextArea[0].scrollHeight + 'px'
            });

            tmpTextArea.remove();
        }
    }
})();
(function()
{
    'use strict';

    angular
        .module('lumx.tooltip')
        .directive('lxTooltip', lxTooltip);

    function lxTooltip()
    {
        return {
            restrict: 'A',
            scope:
            {
                tooltip: '@lxTooltip',
                position: '@?lxTooltipPosition'
            },
            link: link,
            controller: LxTooltipController,
            controllerAs: 'lxTooltip',
            bindToController: true
        };

        function link(scope, element, attrs, ctrl)
        {
            if (angular.isDefined(attrs.tooltipPosition))
            {
                attrs.$observe('tooltipPosition', function(newValue)
                {
                    scope.lxTooltip.position = newValue;
                });
            }

            element.on('mouseenter', ctrl.showTooltip);
            element.on('mouseleave', ctrl.hideTooltip);

            scope.$on('$destroy', function()
            {
                element.off();
            });
        }
    }

    LxTooltipController.$inject = ['$element', '$scope', '$timeout', 'LxDepthService'];

    function LxTooltipController($element, $scope, $timeout, LxDepthService)
    {
        var lxTooltip = this;
        var timer1;
        var timer2;
        var tooltip;
        var tooltipBackground;
        var tooltipLabel;

        lxTooltip.hideTooltip = hideTooltip;
        lxTooltip.showTooltip = showTooltip;

        lxTooltip.position = angular.isDefined(lxTooltip.position) ? lxTooltip.position : 'top';

        $scope.$on('$destroy', function()
        {
            if (angular.isDefined(tooltip))
            {
                tooltip.remove();
            }

            $timeout.cancel(timer1);
            $timeout.cancel(timer2);
        });

        ////////////

        function hideTooltip()
        {
            if (angular.isDefined(tooltip))
            {
                tooltip.removeClass('tooltip--is-active');

                timer1 = $timeout(function()
                {
                    tooltip.remove();
                }, 200);
            }
        }

        function setTooltipPosition()
        {
            var width = $element.outerWidth(),
                height = $element.outerHeight(),
                top = $element.offset().top,
                left = $element.offset().left;

            tooltip
                .append(tooltipBackground)
                .append(tooltipLabel)
                .appendTo('body');

            if (lxTooltip.position === 'top')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top - tooltip.outerHeight()
                });
            }
            else if (lxTooltip.position === 'bottom')
            {
                tooltip.css(
                {
                    left: left - (tooltip.outerWidth() / 2) + (width / 2),
                    top: top + height
                });
            }
            else if (lxTooltip.position === 'left')
            {
                tooltip.css(
                {
                    left: left - tooltip.outerWidth(),
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }
            else if (lxTooltip.position === 'right')
            {
                tooltip.css(
                {
                    left: left + width,
                    top: top + (height / 2) - (tooltip.outerHeight() / 2)
                });
            }
        }

        function showTooltip()
        {
            LxDepthService.register();

            tooltip = angular.element('<div/>',
            {
                class: 'tooltip tooltip--' + lxTooltip.position
            });

            tooltipBackground = angular.element('<div/>',
            {
                class: 'tooltip__background'
            });

            tooltipLabel = angular.element('<span/>',
            {
                class: 'tooltip__label',
                text: lxTooltip.tooltip
            });

            setTooltipPosition();

            tooltip
                .append(tooltipBackground)
                .append(tooltipLabel)
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            timer2 = $timeout(function()
            {
                tooltip.addClass('tooltip--is-active');
            });
        }
    }
})();
angular.module("lumx.dropdown").run(['$templateCache', function(a) { a.put('dropdown.html', '<div class="dropdown" ng-transclude></div>\n' +
    '');
	a.put('dropdown-toggle.html', '<div class="dropdown-toggle" ng-transclude></div>\n' +
    '');
	a.put('dropdown-menu.html', '<div class="dropdown-menu">\n' +
    '    <div class="dropdown-menu__content" ng-transclude ng-if="lxDropdownMenu.parentCtrl.isOpen"></div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.file-input").run(['$templateCache', function(a) { a.put('file-input.html', '<div class="input-file">\n' +
    '    <span class="input-file__label">{{ lxFileInput.label }}</span>\n' +
    '    <span class="input-file__filename">{{ lxFileInput.fileName }}</span>\n' +
    '    <input type="file" class="input-file__input">\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.text-field").run(['$templateCache', function(a) { a.put('text-field.html', '<div class="text-field"\n' +
    '     ng-class="{ \'text-field--error\': lxTextField.error,\n' +
    '                 \'text-field--fixed-label\': lxTextField.fixedLabel,\n' +
    '                 \'text-field--has-icon\': lxTextField.icon,\n' +
    '                 \'text-field--has-value\': lxTextField.hasValue(),\n' +
    '                 \'text-field--is-active\': lxTextField.isActive,\n' +
    '                 \'text-field--is-disabled\': lxTextField.ngDisabled,\n' +
    '                 \'text-field--is-focus\': lxTextField.isFocus,\n' +
    '                 \'text-field--theme-light\': !lxTextField.theme || lxTextField.theme === \'light\',\n' +
    '                 \'text-field--theme-dark\': lxTextField.theme === \'dark\',\n' +
    '                 \'text-field--valid\': lxTextField.valid }">\n' +
    '    <div class="text-field__icon" ng-if="lxTextField.icon">\n' +
    '        <i class="mdi mdi-{{ lxTextField.icon }}"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <label class="text-field__label">\n' +
    '        {{ lxTextField.label }}\n' +
    '    </label>\n' +
    '\n' +
    '    <div ng-transclude></div>\n' +
    '\n' +
    '    <span class="text-field__clear" ng-click="lxTextField.clearInput($event)" ng-if="lxTextField.allowClear">\n' +
    '        <i class="mdi mdi-close-circle"></i>\n' +
    '    </span>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.search-filter").run(['$templateCache', function(a) { a.put('search-filter.html', '<div class="search-filter" ng-class="lxSearchFilter.getClass()">\n' +
    '    <div class="search-filter__container">\n' +
    '        <div class="search-filter__button">\n' +
    '            <lx-button lx-size="l" lx-color="{{ lxSearchFilter.color }}" lx-type="icon" ng-click="lxSearchFilter.openInput()">\n' +
    '                <i class="mdi mdi-magnify"></i>\n' +
    '            </lx-button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="search-filter__input" ng-transclude></div>\n' +
    '\n' +
    '        <span class="search-filter__clear" ng-click="lxSearchFilter.clearInput()">\n' +
    '            <i class="mdi mdi-close-circle"></i>\n' +
    '        </span>\n' +
    '    </div>\n' +
    '</div>');
	 }]);
angular.module("lumx.select").run(['$templateCache', function(a) { a.put('select.html', '<div class="lx-select"\n' +
    '     ng-class="{ \'lx-select--error\': lxSelect.error,\n' +
    '                 \'lx-select--fixed-label\': lxSelect.fixedLabel,\n' +
    '                 \'lx-select--is-active\': (!lxSelect.multiple && lxSelect.getSelectedModel()) || (lxSelect.multiple && lxSelect.getSelectedModel().length),\n' +
    '                 \'lx-select--is-disabled\': lxSelect.ngDisabled,\n' +
    '                 \'lx-select--is-multiple\': lxSelect.multiple,\n' +
    '                 \'lx-select--is-unique\': !lxSelect.multiple,\n' +
    '                 \'lx-select--theme-light\': !lxSelect.theme || lxSelect.theme === \'light\',\n' +
    '                 \'lx-select--theme-dark\': lxSelect.theme === \'dark\',\n' +
    '                 \'lx-select--valid\': lxSelect.valid }">\n' +
    '    <span class="lx-select-label">\n' +
    '        {{ ::lxSelect.label }}\n' +
    '    </span>\n' +
    '\n' +
    '    <lx-dropdown lx-width="100%">\n' +
    '        <ng-transclude></ng-transclude>\n' +
    '    </lx-dropdown>\n' +
    '</div>\n' +
    '');
	a.put('select-selected.html', '<div lx-dropdown-toggle>\n' +
    '    <div class="lx-select-selected-wrapper">\n' +
    '        <div class="lx-select-selected" ng-if="!lxSelectSelected.parentCtrl.multiple && lxSelectSelected.parentCtrl.getSelectedModel()">\n' +
    '            <span class="lx-select-selected__value"\n' +
    '                  ng-bind-html="lxSelectSelected.parentCtrl.displaySelected()"></span>\n' +
    '\n' +
    '            <a class="lx-select-selected__clear"\n' +
    '               ng-click="lxSelectSelected.clearModel($event)"\n' +
    '               ng-if="::lxSelectSelected.parentCtrl.allowClear">\n' +
    '                <i class="mdi mdi-close-circle"></i>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-select-selected" ng-if="lxSelectSelected.parentCtrl.multiple && lxSelectSelected.parentCtrl.getSelectedModel().length">\n' +
    '            <span class="lx-select-selected__tag"\n' +
    '                  ng-click="lxSelectSelected.removeSelected(selected, $event)"\n' +
    '                  ng-repeat="selected in lxSelectSelected.parentCtrl.getSelectedModel()"\n' +
    '                  ng-bind-html="lxSelectSelected.parentCtrl.displaySelected(selected)"></span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
	a.put('select-choices.html', '<lx-dropdown-menu class="lx-select-choices"\n' +
    '                  ng-class="{ \'lx-select-choices--custom-style\': lxSelectChoices.parentCtrl.customStyle,\n' +
    '                              \'lx-select-choices--default-style\': !lxSelectChoices.parentCtrl.customStyle,\n' +
    '                              \'lx-select-choices--is-multiple\': lxSelectChoices.parentCtrl.multiple,\n' +
    '                              \'lx-select-choices--is-unique\': !lxSelectChoices.parentCtrl.multiple, }">\n' +
    '    <ul>\n' +
    '        <li class="lx-select-choices__filter" ng-if="::lxSelectChoices.parentCtrl.displayFilter">\n' +
    '            <lx-search-filter lx-dropdown-filter>\n' +
    '                <input type="text" ng-model="lxSelectChoices.filterModel" ng-change="lxSelectChoices.updateFilter()">\n' +
    '            </lx-search-filter>\n' +
    '        </li>\n' +
    '        \n' +
    '        <div ng-if="::lxSelectChoices.isArray()">\n' +
    '            <li class="lx-select-choices__choice"\n' +
    '                ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.isSelected(choice) }"\n' +
    '                ng-repeat="choice in lxSelectChoices.parentCtrl.choices | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.filterModel"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displayChoice(choice)"\n' +
    '                ng-click="lxSelectChoices.toggleChoice(choice, $event)"></li>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="::!lxSelectChoices.isArray()">\n' +
    '            <li class="lx-select-choices__subheader"\n' +
    '                ng-repeat-start="(subheader, children) in lxSelectChoices.parentCtrl.choices"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displaySubheader(subheader)"></li>\n' +
    '\n' +
    '            <li class="lx-select-choices__choice"\n' +
    '                ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.isSelected(choice) }"\n' +
    '                ng-repeat-end\n' +
    '                ng-repeat="choice in children | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.filterModel"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displayChoice(choice)"\n' +
    '                ng-click="lxSelectChoices.toggleChoice(choice, $event)"></li>\n' +
    '        </div>\n' +
    '\n' +
    '        <li class="lx-select-choices__subheader" ng-if="lxSelectChoices.parentCtrl.helper">\n' +
    '            {{ lxSelectChoices.parentCtrl.helperMessage }}\n' +
    '        </li>\n' +
    '\n' +
    '        <li class="lx-select-choices__loader" ng-if="lxSelectChoices.parentCtrl.loading">\n' +
    '            <lx-progress lx-type="circular" lx-color="primary" lx-diameter="20"></lx-progress>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</lx-dropdown-menu>\n' +
    '');
	 }]);
angular.module("lumx.tabs").run(['$templateCache', function(a) { a.put('tabs.html', '<div class="tabs tabs--layout-{{ lxTabs.layout }} tabs--theme-{{ lxTabs.theme }} tabs--color-{{ lxTabs.color }} tabs--indicator-{{ lxTabs.indicator }}">\n' +
    '    <div class="tabs__links">\n' +
    '        <a class="tabs__link"\n' +
    '           ng-class="{ \'tabs__link--is-active\': lxTabs.tabIsActive(tab.index),\n' +
    '                       \'tabs__link--is-disabled\': tab.disabled }"\n' +
    '           ng-repeat="tab in lxTabs.tabs"\n' +
    '           ng-click="lxTabs.setActiveTab(tab)"\n' +
    '           lx-ripple>\n' +
    '           <i class="mdi mdi-{{ tab.icon }}" ng-if="tab.icon"></i>\n' +
    '           <span ng-if="tab.label">{{ tab.label }}</span>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '    \n' +
    '    <div class="tabs__panes" ng-if="lxTabs.viewMode === \'gather\'" ng-transclude></div>\n' +
    '    <div class="tabs__indicator"></div>\n' +
    '</div>\n' +
    '');
	a.put('tabs-panes.html', '<div class="tabs">\n' +
    '    <div class="tabs__panes" ng-transclude></div>\n' +
    '</div>');
	a.put('tab.html', '<div class="tabs__pane" ng-class="{ \'tabs__pane--is-disabled\': lxTab.ngDisabled }">\n' +
    '    <div ng-if="lxTab.tabIsActive()" ng-transclude></div>\n' +
    '</div>\n' +
    '');
	a.put('tab-pane.html', '<div class="tabs__pane" ng-transclude></div>\n' +
    '');
	 }]);
angular.module("lumx.date-picker").run(['$templateCache', function(a) { a.put('date-picker.html', '<div class="lx-date">\n' +
    '    <!-- Date picker input -->\n' +
    '    <div class="lx-date-input" ng-click="lxDatePicker.openDatePicker()" ng-if="lxDatePicker.hasInput">\n' +
    '        <ng-transclude></ng-transclude>\n' +
    '    </div>\n' +
    '    \n' +
    '    <!-- Date picker -->\n' +
    '    <div class="lx-date-picker lx-date-picker--{{ lxDatePicker.color }}">\n' +
    '        <div ng-if="lxDatePicker.isOpen">\n' +
    '            <!-- Date picker: header -->\n' +
    '            <div class="lx-date-picker__header">\n' +
    '                <a class="lx-date-picker__current-year"\n' +
    '                   ng-class="{ \'lx-date-picker__current-year--is-active\': lxDatePicker.yearSelection }"\n' +
    '                   ng-click="lxDatePicker.displayYearSelection()">\n' +
    '                    {{ lxDatePicker.moment(lxDatePicker.ngModel).format(\'YYYY\') }}\n' +
    '                </a>\n' +
    '\n' +
    '                <a class="lx-date-picker__current-date"\n' +
    '                   ng-class="{ \'lx-date-picker__current-date--is-active\': !lxDatePicker.yearSelection }"\n' +
    '                   ng-click="lxDatePicker.hideYearSelection()">\n' +
    '                    {{ lxDatePicker.getDateFormatted() }}\n' +
    '                </a>\n' +
    '            </div>\n' +
    '            \n' +
    '            <!-- Date picker: content -->\n' +
    '            <div class="lx-date-picker__content">\n' +
    '                <!-- Calendar -->\n' +
    '                <div class="lx-date-picker__calendar" ng-if="!lxDatePicker.yearSelection">\n' +
    '                    <div class="lx-date-picker__nav">\n' +
    '                        <lx-button lx-size="l" lx-color="black" lx-type="icon" ng-click="lxDatePicker.previousMonth()">\n' +
    '                            <i class="mdi mdi-chevron-left"></i>\n' +
    '                        </lx-button>\n' +
    '\n' +
    '                        <span>{{ lxDatePicker.ngModelMoment.format(\'MMMM YYYY\') }}</span>\n' +
    '                        \n' +
    '                        <lx-button lx-size="l" lx-color="black" lx-type="icon" ng-click="lxDatePicker.nextMonth()">\n' +
    '                            <i class="mdi mdi-chevron-right"></i>\n' +
    '                        </lx-button>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="lx-date-picker__days-of-week">\n' +
    '                        <span ng-repeat="day in lxDatePicker.daysOfWeek">{{ day }}</span>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="lx-date-picker__days">\n' +
    '                        <span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                              ng-repeat="x in lxDatePicker.emptyFirstDays">&nbsp;</span>\n' +
    '\n' +
    '                        <div class="lx-date-picker__day"\n' +
    '                             ng-class="{ \'lx-date-picker__day--is-selected\': day.selected,\n' +
    '                                         \'lx-date-picker__day--is-today\': day.today && !day.selected,\n' +
    '                                         \'lx-date-picker__day--is-disabled\': day.disabled }"\n' +
    '                             ng-repeat="day in lxDatePicker.days">\n' +
    '                            <a ng-click="lxDatePicker.select(day)">{{ day ? day.format(\'D\') : \'\' }}</a>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                              ng-repeat="x in lxDatePicker.emptyLastDays">&nbsp;</span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- Year selection -->\n' +
    '                <div class="lx-date-picker__year-selector" ng-if="lxDatePicker.yearSelection">\n' +
    '                    <a class="lx-date-picker__year"\n' +
    '                         ng-class="{ \'lx-date-picker__year--is-active\': year == lxDatePicker.moment(lxDatePicker.ngModel).format(\'YYYY\') }"\n' +
    '                         ng-repeat="year in lxDatePicker.years"\n' +
    '                         ng-click="lxDatePicker.selectYear(year)"\n' +
    '                         ng-if="lxDatePicker.yearSelection">\n' +
    '                        {{ year }}\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <!-- Actions -->\n' +
    '            <div class="lx-date-picker__actions">\n' +
    '                <lx-button lx-color="{{ lxDatePicker.color }}" lx-type="flat" ng-click="lxDatePicker.closeDatePicker()">\n' +
    '                    Ok\n' +
    '                </lx-button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
	 }]);
angular.module("lumx.progress").run(['$templateCache', function(a) { a.put('progress.html', '<div class="progress-container progress-container--{{ lxProgress.lxType }} progress-container--{{ lxProgress.lxColor }}"\n' +
    '     ng-class="{ \'progress-container--determinate\': lxProgress.lxValue,\n' +
    '                 \'progress-container--indeterminate\': !lxProgress.lxValue }">\n' +
    '    <div class="progress-circular"\n' +
    '         ng-if="lxProgress.lxType === \'circular\'"\n' +
    '         ng-style="lxProgress.getProgressDiameter()">\n' +
    '        <svg class="progress-circular__svg">\n' +
    '            <circle class="progress-circular__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" ng-style="lxProgress.getCircularProgressValue()">\n' +
    '        </svg>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="progress-linear" ng-if="lxProgress.lxType === \'linear\'">\n' +
    '        <div class="progress-linear__background"></div>\n' +
    '        <div class="progress-linear__bar progress-linear__bar--first" ng-style="lxProgress.getLinearProgressValue()"></div>\n' +
    '        <div class="progress-linear__bar progress-linear__bar--second"></div>\n' +
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
    '           ng-change="lxCheckbox.triggerNgChange()"\n' +
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
    '           ng-change="lxRadioButton.triggerNgChange()"\n' +
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
angular.module("lumx.switch").run(['$templateCache', function(a) { a.put('switch.html', '<div class="switch switch--{{ lxSwitch.lxColor }}">\n' +
    '    <input id="{{ lxSwitch.getSwitchId() }}"\n' +
    '           type="checkbox"\n' +
    '           class="switch__input"\n' +
    '           name="{{ lxSwitch.name }}"\n' +
    '           ng-model="lxSwitch.ngModel"\n' +
    '           ng-true-value="{{ lxSwitch.ngTrueValue }}"\n' +
    '           ng-false-value="{{ lxSwitch.ngFalseValue }}"\n' +
    '           ng-change="lxSwitch.triggerNgChange()"\n' +
    '           ng-disabled="lxSwitch.ngDisabled">\n' +
    '\n' +
    '    <label for="{{ lxSwitch.getSwitchId() }}" class="switch__label" ng-transclude ng-if="!lxSwitch.getSwitchHasChildren()"></label>\n' +
    '    <ng-transclude-replace ng-if="lxSwitch.getSwitchHasChildren()"></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	a.put('switch-label.html', '<label for="{{ lxSwitchLabel.getSwitchId() }}" class="switch__label" ng-transclude></label>\n' +
    '');
	a.put('switch-help.html', '<span class="switch__help" ng-transclude></span>\n' +
    '');
	 }]);
angular.module("lumx.fab").run(['$templateCache', function(a) { a.put('fab.html', '<div class="fab">\n' +
    '    <ng-transclude-replace></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	a.put('fab-trigger.html', '<div class="fab__primary" ng-transclude></div>\n' +
    '');
	a.put('fab-actions.html', '<div class="fab__actions fab__actions--{{ parentCtrl.lxDirection }}" ng-transclude></div>\n' +
    '');
	 }]);
angular.module("lumx.icon").run(['$templateCache', function(a) { a.put('icon.html', '<i class="icon mdi" ng-class="lxIcon.getClass()"></i>');
	 }]);