/*
 LumX v1.9.1
 (c) 2014-2019 LumApps http://ui.lumapps.com
 License: MIT
*/
(function()
{
    'use strict';

    angular.module('lumx.utils.depth', []);
    angular.module('lumx.utils.event-scheduler', []);
    angular.module('lumx.utils.transclude-replace', []);
    angular.module('lumx.utils.utils', []);
    angular.module('lumx.utils.directives', []);
    angular.module('lumx.utils.filters', []);

    angular.module('lumx.utils', [
        'lumx.utils.depth',
        'lumx.utils.event-scheduler',
        'lumx.utils.transclude-replace',
        'lumx.utils.utils',
        'lumx.utils.directives',
        'lumx.utils.filters',
    ]);

    angular.module('lumx.button', []);
    angular.module('lumx.checkbox', []);
    angular.module('lumx.data-table', []);
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
    angular.module('lumx.stepper', []);
    angular.module('lumx.switch', []);
    angular.module('lumx.tabs', []);
    angular.module('lumx.text-field', []);
    angular.module('lumx.tooltip', []);

    angular.module('lumx', [
        'lumx.button',
        'lumx.checkbox',
        'lumx.data-table',
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
        'lumx.stepper',
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
/* eslint-disable angular/component-limit */
(function IIFE() {
    'use strict';

    /////////////////////////////

    /**
     * Highlights text in a string that matches another string.
     *
     * Taken from AngularUI Bootstrap Typeahead
     * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340
     */
    HighlightFilter.$inject = ['LxUtils'];
    function HighlightFilter(LxUtils) {
        return function highlightCode(matchItem, query, html) {
            if (!html) {
                return (query && matchItem) ?
                    matchItem.replace(
                        new RegExp(LxUtils.escapeRegexp(query), 'gi'),
                        '<span class="lx-select-choices__pane-choice--highlight">$&</span>'
                    ) : matchItem;
            }

            var el = angular.element('<div>' + matchItem + '</div>');
            if (el.children().length) {
                angular.forEach(el.children(), function forEachNodes(node) {
                    if (node.nodeName !== 'SPAN') {
                        return;
                    }

                    var nodeEl = angular.element(node);
                    nodeEl.html(highlightCode(nodeEl.text(), query, false));
                });
            } else {
                el.html(highlightCode(el.text(), query, false));
            }

            return el.html();
        };
    }

    /////////////////////////////

    /**
     * Blocks the propagation of an event in the DOM.
     *
     * @param  {string}    stopPropagation The name of the event (or events) to be stopped.
     * @return {Directive} The stop propagation directive.
     */
    function StopPropagationDirective() {
        return function stopPropagationCode(scope, el, attrs) {
            el.on(attrs.lxStopPropagation, function stopPropagation(evt) {
                evt.stopPropagation();
            });
        };
    }

    /////////////////////////////

    /**
     * Place here only small, highly re-usable directives.
     * For a big complex directive, use a separate own file.
     * For a directive specific to your application, place it in your application.
     */
    angular.module('lumx.utils.directives')
        .directive('lxStopPropagation', StopPropagationDirective);

    angular.module('lumx.utils.filters')
        .filter('lxHighlight', HighlightFilter);
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
        var alreadyDisabledScroll = false;

        service.debounce = debounce;
        service.disableBodyScroll = disableBodyScroll;
        service.escapeRegexp = escapeRegexp;
        service.generateUUID = generateUUID;

        ////////////

        // http://underscorejs.org/#debounce (1.8.3)
        function debounce(func, wait, immediate)
        {
            var timeout, args, context, timestamp, result;

            wait = wait || 500;

            var later = function()
            {
                var last = Date.now() - timestamp;

                if (last < wait && last >= 0)
                {
                    timeout = setTimeout(later, wait - last);
                }
                else
                {
                    timeout = null;
                    if (!immediate)
                    {
                        result = func.apply(context, args);
                        if (!timeout)
                        {
                            context = args = null;
                        }
                    }
                }
            };

            var debounced = function()
            {
                context = this;
                args = arguments;
                timestamp = Date.now();
                var callNow = immediate && !timeout;
                if (!timeout)
                {
                    timeout = setTimeout(later, wait);
                }
                if (callNow)
                {
                    result = func.apply(context, args);
                    context = args = null;
                }

                return result;
            };

            debounced.clear = function()
            {
                clearTimeout(timeout);
                timeout = context = args = null;
            };

            return debounced;
        }

        function disableBodyScroll()
        {
            var body = document.body;
            var documentElement = document.documentElement;

            if (!alreadyDisabledScroll) {
                var prevDocumentStyle = documentElement.style.cssText || '';
                var prevBodyStyle = body.style.cssText || '';
                var viewportTop = (document.scrollingElement) ?
                    document.scrollingElement.scrollTop : window.scrollY || window.pageYOffset || body.scrollTop;
                viewportTop = viewportTop || 0;
            }


            var clientWidth = body.clientWidth;
            var hasVerticalScrollbar = body.scrollHeight > window.innerHeight + 1;

            if (hasVerticalScrollbar)
            {
              angular.element('body').css({
                overflow: 'hidden',
              });
            }

            if (body.clientWidth < clientWidth)
            {
              body.style.overflow = 'hidden';
            }

            // This should be applied after the manipulation to the body, because
            // adding a scrollbar can potentially resize it, causing the measurement
            // to change.
            if (hasVerticalScrollbar)
            {
              documentElement.style.overflowY = 'scroll';
            }

            // This attribution prevents this function to consider the css it sets
            // to body and documents to be the 'previous' css attributes to recover.
            alreadyDisabledScroll = true;

            return function restoreScroll()
            {
                if (!alreadyDisabledScroll) {
                    return;
                }

                // Reset the inline style CSS to the previous.
                body.style.cssText = prevBodyStyle;
                documentElement.style.cssText = prevDocumentStyle;
                
                // The body loses its scroll position while being fixed.
                if (document.scrollingElement) {
                    document.scrollingElement.scrollTop = viewportTop;
                } else {
                    body.scrollTop = viewportTop;
                }

                alreadyDisabledScroll = false;
            };
        }

        /**
         * Escape all RegExp special characters in a string.
         *
         * @param  {string} strToEscape The string to escape RegExp special char in.
         * @return {string} The escapes string.
         */
        function escapeRegexp(strToEscape) {
            return strToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

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
        return {
            restrict: 'E',
            templateUrl: getTemplateUrl,
            link: link,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            setButtonStyle(element, attrs.lxSize, attrs.lxColor, attrs.lxType);

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
            element.removeClass('btn');
            element.removeClass (function (index, className) {
                return (className.match (/(^|\s)btn--\S+/g) || []).join(' ');
            });

            var buttonSize = angular.isDefined(size) ? 'btn--' + size : 'btn--m';
            var buttonColor = angular.isDefined(color) ? 'btn--' + color : 'btn--primary';
            var buttonType = angular.isDefined(type) ? 'btn--' + type : 'btn--raised';

            element.addClass('btn');
            element.addClass(buttonSize);
            element.addClass(buttonColor);
            element.addClass(buttonType);
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
                ngTrueValue: '@?',
                lxTheme: '@?'
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

    LxDatePickerController.$inject = ['$element', '$scope', '$timeout', '$transclude', 'LxDatePickerService', 'LxUtils'];

    function LxDatePickerController($element, $scope, $timeout, $transclude, LxDatePickerService, LxUtils)
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
        lxDatePicker.uuid = LxUtils.generateUUID();

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

                if (angular.isDefined(lxDatePicker.minDate))
                {
                    var minDate = (angular.isString(lxDatePicker.minDate)) ? new Date(lxDatePicker.minDate) : lxDatePicker.minDate;
                    if (date.toDate() < minDate)
                    {
                        date.disabled = true;
                    }
                }

                if (angular.isDefined(lxDatePicker.maxDate))
                {
                    var maxDate = (angular.isString(lxDatePicker.maxDate)) ? new Date(lxDatePicker.maxDate) : lxDatePicker.maxDate;
                    if (date.toDate() > maxDate)
                    {
                        date.disabled = true;
                    }
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

            generateCalendar();
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
                angular.element('body').removeClass('no-scroll-date-picker-' + scopeMap[_datePickerId].uuid);

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

            angular.element('body').addClass('no-scroll-date-picker-' + scopeMap[_datePickerId].uuid);

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

    function lxDialog()
    {
        return {
            restrict: 'E',
            template: '<div class="dialog" ng-class="{ \'dialog--l\': !lxDialog.size || lxDialog.size === \'l\', \'dialog--s\': lxDialog.size === \'s\', \'dialog--m\': lxDialog.size === \'m\' }"><div ng-if="lxDialog.isOpen" ng-transclude></div></div>',
            scope:
            {
                autoClose: '=?lxAutoClose',
                escapeClose: '=?lxEscapeClose',
                size: '@?lxSize'
            },
            link: link,
            controller: LxDialogController,
            controllerAs: 'lxDialog',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrl)
        {
            attrs.$observe('id', function(_newId)
            {
                ctrl.id = _newId;
            });
        }
    }

    LxDialogController.$inject = ['$element', '$interval', '$rootScope', '$scope', '$timeout', '$window', 'LxDepthService', 'LxEventSchedulerService', 'LxUtils'];

    function LxDialogController($element, $interval, $rootScope, $scope, $timeout, $window, LxDepthService, LxEventSchedulerService, LxUtils)
    {
        var lxDialog = this;
        var dialogFilter = angular.element('<div/>',
        {
            class: 'dialog-filter'
        });
        var dialogHeight;
        var dialogInterval;
        var dialogScrollable;
        var elementParent = $element.parent();
        var idEventScheduler;
        var resizeDebounce;
        var windowHeight;

        lxDialog.autoClose = angular.isDefined(lxDialog.autoClose) ? lxDialog.autoClose : true;
        lxDialog.escapeClose = angular.isDefined(lxDialog.escapeClose) ? lxDialog.escapeClose : true;
        lxDialog.isOpen = false;
        lxDialog.uuid = LxUtils.generateUUID();

        $scope.$on('lx-dialog__open', function(event, id, params)
        {
            if (id === lxDialog.id)
            {
                open(params);
            }
        });

        $scope.$on('lx-dialog__close', function(event, id, canceled, params)
        {
            if (id === lxDialog.id || id === undefined)
            {
                close(canceled, params);
            }
        });

        $scope.$on('$destroy', function()
        {
            close(true);
        });

        ////////////

        function checkDialogHeight()
        {
            var dialog = $element;
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
            if (resizeDebounce)
            {
                $timeout.cancel(resizeDebounce);
            }

            resizeDebounce = $timeout(function()
            {
                checkDialogHeight();
            }, 200);
        }

        function checkScrollEnd()
        {
            if (dialogScrollable.scrollTop() + dialogScrollable.innerHeight() >= dialogScrollable[0].scrollHeight)
            {
                $rootScope.$broadcast('lx-dialog__scroll-end', lxDialog.id);

                dialogScrollable.off('scroll', checkScrollEnd);

                $timeout(function()
                {
                    dialogScrollable.on('scroll', checkScrollEnd);
                }, 500);
            }
        }

        function onKeyUp(_event)
        {
            if (_event.keyCode == 27)
            {
                close(true);
            }

            _event.stopPropagation();
        }

        function open(_params)
        {
            if (lxDialog.isOpen)
            {
                return;
            }

            LxDepthService.register();

            angular.element('body').addClass('no-scroll-dialog-' + lxDialog.uuid);

            dialogFilter
                .css('z-index', LxDepthService.getDepth())
                .appendTo('body');

            if (lxDialog.autoClose)
            {
                dialogFilter.on('click', function()
                {
                    close(true);
                });
            }

            if (lxDialog.escapeClose)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            $element
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body')
                .show();

            $timeout(function()
            {
                $rootScope.$broadcast('lx-dialog__open-start', lxDialog.id, _params);

                lxDialog.isOpen = true;

                dialogFilter.addClass('dialog-filter--is-shown');
                $element.addClass('dialog--is-shown');
            }, 100);

            $timeout(function()
            {
                if ($element.find('.dialog__scrollable').length === 0)
                {
                    $element.find('.dialog__content').wrap(angular.element('<div/>',
                    {
                        class: 'dialog__scrollable'
                    }));
                }

                dialogScrollable = $element.find('.dialog__scrollable');
            }, 200);

            $timeout(function()
            {
                $rootScope.$broadcast('lx-dialog__open-end', lxDialog.id, _params);
            }, 700);

            dialogInterval = $interval(function()
            {
                checkDialogHeight();
            }, 500);

            angular.element($window).on('resize', checkDialogHeightOnResize);
        }

        function close(_canceled, _params)
        {
            if (!lxDialog.isOpen)
            {
                return;
            }

            _params = _params || {};

            if (angular.isDefined(idEventScheduler))
            {
                LxEventSchedulerService.unregister(idEventScheduler);
                idEventScheduler = undefined;
            }

            angular.element($window).off('resize', checkDialogHeightOnResize);
            $element.find('.dialog__scrollable').off('scroll', checkScrollEnd);

            $rootScope.$broadcast('lx-dialog__close-start', lxDialog.id, _canceled, _params);

            if (resizeDebounce)
            {
                $timeout.cancel(resizeDebounce);
            }

            $interval.cancel(dialogInterval);

            dialogFilter.removeClass('dialog-filter--is-shown');
            $element.removeClass('dialog--is-shown');

            $timeout(function()
            {
                angular.element('body').removeClass('no-scroll-dialog-' + lxDialog.uuid);

                dialogFilter.remove();

                $element
                    .hide()
                    .removeClass('dialog--is-fixed')
                    .appendTo(elementParent);

                lxDialog.isOpen = false;
                dialogHeight = undefined;
                $rootScope.$broadcast('lx-dialog__close-end', lxDialog.id, _canceled, _params);
            }, 600);
        }
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
                    LxDialogService.close(element.parents('.dialog').attr('id'), true);
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

    LxDialogService.$inject = ['$rootScope'];

    function LxDialogService($rootScope)
    {
        var service = this;

        service.open = open;
        service.close = close;

        ////////////

        function open(_dialogId, _params)
        {
            $rootScope.$broadcast('lx-dialog__open', _dialogId, _params);
        }

        function close(_dialogId, _canceled, _params)
        {
            $rootScope.$broadcast('lx-dialog__close', _dialogId, _canceled, _params);
        }
    }
})();

(function()
{
    'use strict';

    angular
        .module('lumx.data-table')
        .directive('lxDataTable', lxDataTable);

    function lxDataTable()
    {
        return {
            restrict: 'E',
            templateUrl: 'data-table.html',
            scope:
            {
                activable: '=?lxActivable',
                border: '=?lxBorder',
                bulk: '=?lxBulk',
                selectable: '=?lxSelectable',
                thumbnail: '=?lxThumbnail',
                tbody: '=lxTbody',
                thead: '=lxThead'
            },
            link: link,
            controller: LxDataTableController,
            controllerAs: 'lxDataTable',
            bindToController: true,
            transclude: true,
            replace: true
        };

        function link(scope, element, attrs, ctrl)
        {
            attrs.$observe('id', function(_newId)
            {
                ctrl.id = _newId;
            });
        }
    }

    LxDataTableController.$inject = ['$rootScope', '$sce', '$scope'];

    function LxDataTableController($rootScope, $sce, $scope)
    {
        var lxDataTable = this;

        lxDataTable.areAllRowsSelected = areAllRowsSelected;
        lxDataTable.border = angular.isUndefined(lxDataTable.border) ? true : lxDataTable.border;
        lxDataTable.bulk = angular.isUndefined(lxDataTable.bulk) ? true : lxDataTable.bulk;
        lxDataTable.sort = sort;
        lxDataTable.toggleActivation = toggleActivation;
        lxDataTable.toggleAllSelected = toggleAllSelected;
        lxDataTable.toggleSelection = toggleSelection;

        lxDataTable.$sce = $sce;
        lxDataTable.allRowsSelected = false;
        lxDataTable.selectedRows = [];

        $scope.$on('lx-data-table__select', function(event, id, row)
        {
            if (id === lxDataTable.id && angular.isDefined(row))
            {
                _select((angular.isArray(row) && row.length > 0) ? row[0] : row);
            }
        });

        $scope.$on('lx-data-table__select-all', function(event, id)
        {
            if (id === lxDataTable.id)
            {
                _selectAll();
            }
        });

        $scope.$on('lx-data-table__unselect', function(event, id, row)
        {
            if (id === lxDataTable.id && angular.isDefined(row))
            {
                _unselect((angular.isArray(row) && row.length > 0) ? row[0] : row);
            }
        });

        $scope.$on('lx-data-table__unselect-all', function(event, id)
        {
            if (id === lxDataTable.id)
            {
                _unselectAll();
            }
        });

        $scope.$on('lx-data-table__activate', function(event, id, row)
        {
            if (id === lxDataTable.id && angular.isDefined(row))
            {
                _activate((angular.isArray(row) && row.length > 0) ? row[0] : row);
            }
        });

        $scope.$on('lx-data-table__deactivate', function(event, id, row)
        {
            if (id === lxDataTable.id && angular.isDefined(row))
            {
                _deactivate((angular.isArray(row) && row.length > 0) ? row[0] : row);
            }
        });

        ////////////

        function _activate(row)
        {
            toggleActivation(row, true);
        }

        function _deactivate(row)
        {
            toggleActivation(row, false);
        }

        function _select(row)
        {
            toggleSelection(row, true);
        }

        function _selectAll()
        {
            lxDataTable.selectedRows.length = 0;

            for (var i = 0, len = lxDataTable.tbody.length; i < len; i++)
            {
                if (!lxDataTable.tbody[i].lxDataTableDisabled)
                {
                    lxDataTable.tbody[i].lxDataTableSelected = true;
                    lxDataTable.selectedRows.push(lxDataTable.tbody[i]);
                }
            }

            lxDataTable.allRowsSelected = true;

            $rootScope.$broadcast('lx-data-table__unselected', lxDataTable.id, lxDataTable.selectedRows);
        }

        function _unselect(row)
        {
            toggleSelection(row, false);
        }

        function _unselectAll()
        {
            for (var i = 0, len = lxDataTable.tbody.length; i < len; i++)
            {
                if (!lxDataTable.tbody[i].lxDataTableDisabled)
                {
                    lxDataTable.tbody[i].lxDataTableSelected = false;
                }
            }

            lxDataTable.allRowsSelected = false;
            lxDataTable.selectedRows.length = 0;

            $rootScope.$broadcast('lx-data-table__selected', lxDataTable.id, lxDataTable.selectedRows);
        }

        ////////////

        function areAllRowsSelected()
        {
            var displayedRows = 0;

            for (var i = 0, len = lxDataTable.tbody.length; i < len; i++)
            {
                if (!lxDataTable.tbody[i].lxDataTableDisabled)
                {
                    displayedRows++;
                }
            }

            if (displayedRows === lxDataTable.selectedRows.length)
            {
                lxDataTable.allRowsSelected = true;
            }
            else
            {
                lxDataTable.allRowsSelected = false;
            }
        }

        function sort(_column)
        {
            if (!_column.sortable)
            {
                return;
            }

            for (var i = 0, len = lxDataTable.thead.length; i < len; i++)
            {
                if (lxDataTable.thead[i].sortable && lxDataTable.thead[i].name !== _column.name)
                {
                    lxDataTable.thead[i].sort = undefined;
                }
            }

            if (!_column.sort || _column.sort === 'desc')
            {
                _column.sort = 'asc';
            }
            else
            {
                _column.sort = 'desc';
            }

            $rootScope.$broadcast('lx-data-table__sorted', lxDataTable.id, _column);
        }

        function toggleActivation(_row, _newActivatedStatus)
        {
            if (_row.lxDataTableDisabled || !lxDataTable.activable)
            {
                return;
            }

            for (var i = 0, len = lxDataTable.tbody.length; i < len; i++)
            {
                if (lxDataTable.tbody.indexOf(_row) !== i)
                {
                    lxDataTable.tbody[i].lxDataTableActivated = false;
                }
            }

            _row.lxDataTableActivated = !_row.lxDataTableActivated;

            if (_row.lxDataTableActivated)
            {
                $rootScope.$broadcast('lx-data-table__activated', lxDataTable.id, _row);
            }
            else
            {
                $rootScope.$broadcast('lx-data-table__deactivated', lxDataTable.id, _row);
            }
        }

        function toggleAllSelected()
        {
            if (!lxDataTable.bulk)
            {
                return;
            }

            if (lxDataTable.allRowsSelected)
            {
                _unselectAll();
            }
            else
            {
                _selectAll();
            }
        }

        function toggleSelection(_row, _newSelectedStatus, _event)
        {
            if (_row.lxDataTableDisabled || !lxDataTable.selectable)
            {
                return;
            }

            if (angular.isDefined(_event)) {
                _event.stopPropagation();
            }

            _row.lxDataTableSelected = angular.isDefined(_newSelectedStatus) ? _newSelectedStatus : !_row.lxDataTableSelected;

            if (_row.lxDataTableSelected)
            {
                // Make sure it's not already in.
                if (lxDataTable.selectedRows.length === 0 || (lxDataTable.selectedRows.length && lxDataTable.selectedRows.indexOf(_row) === -1))
                {
                    lxDataTable.selectedRows.push(_row);
                    lxDataTable.areAllRowsSelected();

                    $rootScope.$broadcast('lx-data-table__selected', lxDataTable.id, lxDataTable.selectedRows, _row);
                }
            }
            else
            {
                if (lxDataTable.selectedRows.length && lxDataTable.selectedRows.indexOf(_row) > -1)
                {
                    lxDataTable.selectedRows.splice(lxDataTable.selectedRows.indexOf(_row), 1);
                    lxDataTable.allRowsSelected = false;

                    $rootScope.$broadcast('lx-data-table__unselected', lxDataTable.id, lxDataTable.selectedRows, _row);
                }
            }
        }
    }
})();

(function()
{
    'use strict';

    angular
        .module('lumx.data-table')
        .service('LxDataTableService', LxDataTableService);

    LxDataTableService.$inject = ['$rootScope'];

    function LxDataTableService($rootScope)
    {
        var service = this;

        service.select = select;
        service.selectAll = selectAll;
        service.unselect = unselect;
        service.unselectAll = unselectAll;
        service.activate = activate;
        service.deactivate = deactivate;

        ////////////

        function select(_dataTableId, row)
        {
            $rootScope.$broadcast('lx-data-table__select', _dataTableId, row);
        }

        function selectAll(_dataTableId)
        {
            $rootScope.$broadcast('lx-data-table__select-all', _dataTableId);
        }

        function unselect(_dataTableId, row)
        {
            $rootScope.$broadcast('lx-data-table__unselect', _dataTableId, row);
        }

        function unselectAll(_dataTableId)
        {
            $rootScope.$broadcast('lx-data-table__unselect-all', _dataTableId);
        }

        function activate(_dataTableId, row)
        {
            $rootScope.$broadcast('lx-data-table__activate', _dataTableId, row);
        }

        function deactivate(_dataTableId, row)
        {
            $rootScope.$broadcast('lx-data-table__deactivate', _dataTableId, row);
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

    function lxDropdown()
    {
        return {
            restrict: 'E',
            templateUrl: 'dropdown.html',
            scope:
            {
                closeOnClick: '=?lxCloseOnClick',
                effect: '@?lxEffect',
                escapeClose: '=?lxEscapeClose',
                hover: '=?lxHover',
                hoverDelay: '=?lxHoverDelay',
                minOffset: '=?lxMinOffset',
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

            attrs.$observe('id', function(_newId)
            {
                ctrl.uuid = _newId;
            });

            scope.$on('$destroy', function()
            {
                if (ctrl.isOpen)
                {
                    ctrl.closeDropdownMenu();
                }
            });
        }
    }

    LxDropdownController.$inject = ['$document', '$element', '$interval', '$rootScope', '$scope', '$timeout', '$window',
        'LxDepthService', 'LxDropdownService', 'LxEventSchedulerService', 'LxUtils'
    ];

    function LxDropdownController($document, $element, $interval, $rootScope, $scope, $timeout, $window, LxDepthService,
        LxDropdownService, LxEventSchedulerService, LxUtils)
    {
        var lxDropdown = this;
        var dropdownContentWatcher;
        var dropdownMenu;
        var dropdownToggle;
        var idEventScheduler;
        var openTimeout;
        var positionTarget;
        var scrollMask = angular.element('<div/>',
        {
            class: 'scroll-mask'
        });
        var enableBodyScroll;

        lxDropdown.closeDropdownMenu = closeDropdownMenu;
        lxDropdown.openDropdownMenu = openDropdownMenu;
        lxDropdown.registerDropdownMenu = registerDropdownMenu;
        lxDropdown.registerDropdownToggle = registerDropdownToggle;
        lxDropdown.toggle = toggle;
        lxDropdown.uuid = LxUtils.generateUUID();

        lxDropdown.closeOnClick = angular.isDefined(lxDropdown.closeOnClick) ? lxDropdown.closeOnClick : true;
        lxDropdown.effect = angular.isDefined(lxDropdown.effect) ? lxDropdown.effect : 'expand';
        lxDropdown.escapeClose = angular.isDefined(lxDropdown.escapeClose) ? lxDropdown.escapeClose : true;
        lxDropdown.hasToggle = false;
        lxDropdown.isOpen = false;
        lxDropdown.overToggle = angular.isDefined(lxDropdown.overToggle) ? lxDropdown.overToggle : false;
        lxDropdown.position = angular.isDefined(lxDropdown.position) ? lxDropdown.position : 'left';
        lxDropdown.minOffset = (angular.isUndefined(lxDropdown.minOffset) || lxDropdown.minOffset < 0) ? 8 : lxDropdown.minOffset;

        $scope.$on('lx-dropdown__open', function(_event, _params)
        {
            if (_params.uuid === lxDropdown.uuid && !lxDropdown.isOpen)
            {
                LxDropdownService.closeActiveDropdown();
                LxDropdownService.registerActiveDropdownUuid(lxDropdown.uuid);
                positionTarget = _params.target;

                registerDropdownToggle(positionTarget);
                openDropdownMenu();
            }
        });

        $scope.$on('lx-dropdown__close', function(_event, _params)
        {
            if (_params.uuid === lxDropdown.uuid && lxDropdown.isOpen && (!_params.documentClick || (_params.documentClick && lxDropdown.closeOnClick)))
            {
                closeDropdownMenu();
            }
        });

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(openTimeout);
        });

        ////////////

        function closeDropdownMenu()
        {
            $document.off('click touchend', onDocumentClick);

            $rootScope.$broadcast('lx-dropdown__close-start', $element.attr('id'));

            angular.element(window).off('resize', initDropdownPosition);

            if (angular.isFunction(dropdownContentWatcher)) {
                dropdownContentWatcher();
                dropdownContentWatcher = undefined;
            }

            LxDropdownService.resetActiveDropdownUuid();

            var velocityProperties;
            var velocityEasing;

            if (!lxDropdown.hover && angular.isDefined(scrollMask)) {
                scrollMask.remove();
            }
            if (angular.isFunction(enableBodyScroll)) {
                enableBodyScroll();
            }
            enableBodyScroll = undefined;

            var dropdownToggleElement;
            if (lxDropdown.hasToggle)
            {
                dropdownToggleElement = (angular.isString(dropdownToggle)) ? angular.element(dropdownToggle) : dropdownToggle;

                dropdownToggleElement
                    .off('wheel')
                    .css('z-index', '');
            }

            dropdownMenu
                .css(
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

            if (lxDropdown.effect === 'expand' || lxDropdown.effect === 'fade')
            {
                dropdownMenu.velocity(velocityProperties,
                {
                    duration: 200,
                    easing: velocityEasing,
                    complete: function()
                    {
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
            else if (lxDropdown.effect === 'none')
            {
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

            dropdownMenu.off('scroll', checkScrollEnd);

            $rootScope.$broadcast('lx-dropdown__close-end', $element.attr('id'));
        }

        function getAvailableHeight()
        {
            var availableHeightOnTop;
            var availableHeightOnBottom;
            var direction;
            var dropdownToggleElement = (angular.isString(dropdownToggle)) ? angular.element(dropdownToggle) : dropdownToggle;
            var dropdownToggleHeight = dropdownToggleElement.outerHeight();
            var dropdownToggleTop = dropdownToggleElement.offset().top - angular.element($window).scrollTop();
            var windowHeight = $window.innerHeight;

            if (lxDropdown.overToggle)
            {
                availableHeightOnTop = dropdownToggleTop + dropdownToggleHeight;
                availableHeightOnBottom = windowHeight - dropdownToggleTop;
            }
            else
            {
                availableHeightOnTop = dropdownToggleTop;
                availableHeightOnBottom = windowHeight - (dropdownToggleTop + dropdownToggleHeight);
            }

            if (availableHeightOnTop > availableHeightOnBottom)
            {
                direction = 'top';
            }
            else
            {
                direction = 'bottom';
            }

            return {
                top: availableHeightOnTop,
                bottom: availableHeightOnBottom,
                direction: direction
            };
        }

        function initDropdownPosition()
        {
            var availableHeight = getAvailableHeight();
            var dropdownMenuWidth;
            var dropdownMenuLeft;
            var dropdownMenuRight;
            var dropdownToggleElement = (angular.isString(dropdownToggle)) ? angular.element(dropdownToggle) : dropdownToggle;
            var dropdownToggleWidth = dropdownToggleElement.outerWidth();
            var dropdownToggleHeight = dropdownToggleElement.outerHeight();
            var dropdownToggleTop = dropdownToggleElement.offset().top - angular.element($window).scrollTop();
            var windowWidth = $window.innerWidth;
            var windowHeight = $window.innerHeight;
            var cssProperties = {};

            if (angular.isDefined(lxDropdown.width))
            {
                if (lxDropdown.width.indexOf('%') > -1)
                {
                    dropdownMenuWidth = dropdownToggleWidth * (lxDropdown.width.slice(0, -1) / 100);
                    angular.extend(cssProperties,
                    {
                        minWidth: dropdownMenuWidth,
                    });
                }
                else
                {
                    dropdownMenuWidth = lxDropdown.width;
                    angular.extend(cssProperties,
                    {
                        width: dropdownMenuWidth,
                    });
                }
            }
            else
            {
                dropdownMenuWidth = 'auto';
                angular.extend(cssProperties,
                {
                    width: dropdownMenuWidth,
                });
            }


            if (lxDropdown.position === 'left')
            {
                dropdownMenuLeft = dropdownToggleElement.offset().left;
                dropdownMenuLeft = (dropdownMenuLeft <= lxDropdown.minOffset) ? lxDropdown.minOffset : dropdownMenuLeft;
                dropdownMenuRight = 'auto';
            }
            else if (lxDropdown.position === 'right')
            {
                dropdownMenuLeft = 'auto';
                dropdownMenuRight = windowWidth - dropdownToggleElement.offset().left - dropdownToggleWidth;
                dropdownMenuRight = (dropdownMenuRight > (windowWidth - lxDropdown.minOffset)) ? (windowWidth - lxDropdown.minOffset) : dropdownMenuRight;
            }
            else if (lxDropdown.position === 'center')
            {
                dropdownMenuLeft = (dropdownToggleElement.offset().left + (dropdownToggleWidth / 2)) - (dropdownMenuWidth / 2);
                dropdownMenuLeft = (dropdownMenuLeft <= lxDropdown.minOffset) ? lxDropdown.minOffset : dropdownMenuLeft;
                dropdownMenuRight = 'auto';
            }

            angular.extend(cssProperties,
            {
                left: dropdownMenuLeft,
                right: dropdownMenuRight,
            });

            dropdownMenu.css(cssProperties);

            if (availableHeight.direction === 'top')
            {
                dropdownMenu.css(
                {
                    bottom: lxDropdown.overToggle ? (windowHeight - dropdownToggleTop - dropdownToggleHeight) : (windowHeight - dropdownToggleTop + ~~lxDropdown.offset)
                });

                return availableHeight.top;
            }
            else if (availableHeight.direction === 'bottom')
            {
                dropdownMenu.css(
                {
                    top: lxDropdown.overToggle ? dropdownToggleTop : (dropdownToggleTop + dropdownToggleHeight + ~~lxDropdown.offset)
                });

                return availableHeight.bottom;
            }
        }

        function onDocumentClick() {
            $timeout(function nextDigest() {
                LxDropdownService.close(lxDropdown.uuid, true);
            })
        }

        function openDropdownMenu()
        {
            $document.on('click touchend', onDocumentClick);

            $document.on('touchmove', function onTouchMove(evt) {
                $document.off('touchend', onDocumentClick);
            });

            $rootScope.$broadcast('lx-dropdown__open-start', $element.attr('id'));

            lxDropdown.isOpen = true;

            LxDepthService.register();

            if (!lxDropdown.hover) {
                scrollMask.css('z-index', LxDepthService.getDepth()).appendTo('body');

                // An action outside the dropdown triggers the close function.
                scrollMask.on('click wheel touchmove ontouchstart', closeDropdownMenu);
            }

            angular.element(window).on('resize', initDropdownPosition);

            enableBodyScroll = LxUtils.disableBodyScroll();

            var dropdownToggleElement;
            if (lxDropdown.hasToggle)
            {
                dropdownToggleElement = (angular.isString(dropdownToggle)) ? angular.element(dropdownToggle) : dropdownToggle;
                dropdownToggleElement
                    .css('z-index', LxDepthService.getDepth() + 1)
                    .on('wheel', function preventDefault(e) {
                        e.preventDefault();
                    });
            }

            dropdownMenu
                .addClass('dropdown-menu--is-open')
                .css('z-index', LxDepthService.getDepth() + 1)
                .appendTo('body');

            if (lxDropdown.escapeClose)
            {
                idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
            }

            openTimeout = $timeout(function()
            {
                var availableHeight = initDropdownPosition() - ~~lxDropdown.offset;
                var dropdownMenuHeight = dropdownMenu.outerHeight();
                var dropdownMenuWidth = dropdownMenu.outerWidth();
                var enoughHeight = true;

                if (availableHeight < dropdownMenuHeight)
                {
                    enoughHeight = false;
                    dropdownMenuHeight = availableHeight;
                }

                /*
                 * Watch for any changes in the dropdown content.
                 * Each time the content of the dropdown changes, recompute its height to be sure to stay inside of the
                 * viewport (and make it scrollable when it overflows).
                 */
                dropdownContentWatcher = $scope.$watch(function watcherDropdownContent() {
                    return dropdownMenu.find('.dropdown-menu__content').html();
                }, function watchDropdownContent(newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    updateDropdownMenuHeight();
                });

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
                        width: dropdownMenuWidth,
                        height: dropdownMenuHeight
                    });

                    dropdownMenu.velocity(
                    {
                        width: dropdownMenuWidth
                    },
                    {
                        duration: 200,
                        easing: 'easeOutQuint',
                        queue: false
                    });

                    dropdownMenu.velocity(
                    {
                        height: dropdownMenuHeight
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

                            if (angular.isUndefined(lxDropdown.width))
                            {
                                dropdownMenu.css(
                                {
                                    width: 'auto'
                                });
                            }

                            $timeout(updateDropdownMenuHeight);

                            dropdownMenu.find('.dropdown-menu__content').removeAttr('style');
                        }
                    });
                }
                else if (lxDropdown.effect === 'fade')
                {
                    dropdownMenu.css(
                    {
                        height: dropdownMenuHeight
                    });

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
                            $timeout(updateDropdownMenuHeight);
                        }
                    });
                }
                else if (lxDropdown.effect === 'none')
                {
                    dropdownMenu.css(
                    {
                        opacity: 1
                    });

                    $timeout(updateDropdownMenuHeight);
                }

                dropdownMenu.on('scroll', checkScrollEnd);

                $rootScope.$broadcast('lx-dropdown__open-end', $element.attr('id'));
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
            if (!positionTarget)
            {
                lxDropdown.hasToggle = true;
            }

            dropdownToggle = _dropdownToggle;
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

        /**
         * Update the height of the dropdown.
         * If the content is too large to fit in the remaining size of the screen (to the top or the bottom), then make
         * it scrollable.
         * This function is called everytime the content inside of the dropdown changes.
         */
        function updateDropdownMenuHeight() {
            if (positionTarget) {
                registerDropdownToggle(angular.element(positionTarget));
            }

            if (!angular.element(dropdownToggle).is(':visible')) {
                return;
            }

            var availableHeight = getAvailableHeight();
            var scrollPosition = dropdownMenu.scrollTop();

            dropdownMenu.css({
                height: 'auto',
            });
            dropdownMenu.css(availableHeight.direction, 'auto');

            var dropdownMenuHeight = dropdownMenu.find('.dropdown-menu__content').outerHeight();

            if ((availableHeight[availableHeight.direction] - ~~lxDropdown.offset) <= dropdownMenuHeight) {
                if (availableHeight.direction === 'top') {
                    dropdownMenu.css({
                        top: 0,
                    });
                } else if (availableHeight.direction === 'bottom') {
                    dropdownMenu.css({
                        bottom: 0,
                    });
                }
            } else {
                if (availableHeight.direction === 'top') {
                    dropdownMenu.css({
                        top: 'auto',
                    });
                } else if (availableHeight.direction === 'bottom') {
                    dropdownMenu.css({
                        bottom: 'auto',
                    });
                }
            }

            dropdownMenu.scrollTop(scrollPosition);
        }

        /**
        * Check if user has scrolled to the end of the dropdown.
        */
        function checkScrollEnd() {
            if (
                dropdownMenu.scrollTop() + dropdownMenu.innerHeight() >=
                dropdownMenu[0].scrollHeight
            ) {
                $rootScope.$broadcast(
                    'lx-dropdown__scroll-end',
                    $element.attr('id')
                );
            }
        }
    }

    lxDropdownToggle.$inject = ['$timeout', '$window', 'LxDropdownService'];

    function lxDropdownToggle($timeout, $window, LxDropdownService)
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
            var hoverTimeout = [];
            var mouseEvent = ctrl.hover ? 'mouseenter' : 'click';

            ctrl.registerDropdownToggle(element);

            element.on(mouseEvent, function(_event)
            {
                // If we are in mobile, ignore the mouseenter event for hovering detection
                if (mouseEvent === 'mouseenter' && ('ontouchstart' in window && angular.element($window).outerWidth() <= 480)) {
                    return;
                }

                if (!ctrl.hover)
                {
                    _event.stopPropagation();
                }

                LxDropdownService.closeActiveDropdown();
                LxDropdownService.registerActiveDropdownUuid(ctrl.uuid);

                if (ctrl.hover)
                {
                    ctrl.mouseOnToggle = true;

                    if (!ctrl.isOpen)
                    {
                        hoverTimeout[0] = $timeout(function()
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

                    $timeout.cancel(hoverTimeout[0]);

                    hoverTimeout[1] = $timeout(function()
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
                    $timeout.cancel(hoverTimeout[0]);
                    $timeout.cancel(hoverTimeout[1]);
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
            var hoverTimeout;

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

                    hoverTimeout = $timeout(function()
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
                    $timeout.cancel(hoverTimeout);
                }
            });
        }
    }

    LxDropdownMenuController.$inject = ['$element'];

    function LxDropdownMenuController($element)
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
            var focusTimeout;

            element.on('click', function(_event)
            {
                _event.stopPropagation();
            });

            focusTimeout = $timeout(function()
            {
                element.find('input').focus();
            }, 200);

            scope.$on('$destroy', function()
            {
                $timeout.cancel(focusTimeout);
                element.off();
            });
        }
    }
})();

(function()
{
    'use strict';

    angular
        .module('lumx.dropdown')
        .service('LxDropdownService', LxDropdownService);

    LxDropdownService.$inject = ['$document', '$rootScope'];

    function LxDropdownService($document, $rootScope)
    {
        var service = this;
        var activeDropdownUuid;

        service.close = close;
        service.closeActiveDropdown = closeActiveDropdown;
        service.open = open;
        service.isOpen = isOpen;
        service.registerActiveDropdownUuid = registerActiveDropdownUuid;
        service.resetActiveDropdownUuid = resetActiveDropdownUuid;

        ////////////

        function close(_uuid, isDocumentClick)
        {
            isDocumentClick = isDocumentClick || false;
            $rootScope.$broadcast('lx-dropdown__close',
            {
                documentClick: isDocumentClick,
                uuid: _uuid
            });
        }

        function closeActiveDropdown()
        {
            if (angular.isDefined(activeDropdownUuid) && activeDropdownUuid.length > 0) {
                $rootScope.$broadcast('lx-dropdown__close',
                {
                    documentClick: true,
                    uuid: activeDropdownUuid
                });
            }
        }

        function open(_uuid, _target)
        {
            $rootScope.$broadcast('lx-dropdown__open',
            {
                uuid: _uuid,
                target: _target
            });
        }

        function isOpen(_uuid)
        {
            return activeDropdownUuid === _uuid;
        }

        function registerActiveDropdownUuid(_uuid)
        {
            activeDropdownUuid = _uuid;
        }

        function resetActiveDropdownUuid()
        {
            activeDropdownUuid = undefined;
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

            attrs.$observe('lxTriggerOnClick', function(isTriggeredOnClick)
            {
                ctrl.setFabTriggerMethod(scope.$eval(isTriggeredOnClick));
            });
        }
    }

    function LxFabController()
    {
        var lxFab = this;

        lxFab.setFabDirection = setFabDirection;
        lxFab.setFabTriggerMethod = setFabTriggerMethod;
        lxFab.toggleState = toggleState;

        lxFab.isOpen = false;

        ////////////

        function setFabDirection(_direction)
        {
            lxFab.lxDirection = _direction;
        }

        function setFabTriggerMethod(_isTriggeredOnClick)
        {
            lxFab.lxTriggerOnClick = _isTriggeredOnClick;
        }

        function toggleState()
        {
            if (lxFab.lxTriggerOnClick)
            {
                lxFab.isOpen = !lxFab.isOpen;
            }
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
                accept: '@lxAccept',
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

    LxNotificationService.$inject = ['$injector', '$rootScope', '$timeout', 'LxDepthService', 'LxEventSchedulerService'];

    function LxNotificationService($injector, $rootScope, $timeout, LxDepthService, LxEventSchedulerService)
    {
        var service = this;
        var dialogFilter;
        var dialog;
        var idEventScheduler;
        var notificationList = [];
        var actionClicked = false;

        service.alert = showAlertDialog;
        service.confirm = showConfirmDialog;
        service.error = notifyError;
        service.info = notifyInfo;
        service.notify = notify;
        service.success = notifySuccess;
        service.warning = notifyWarning;
        service.getNotificationList = getNotificationList;
        service.reComputeElementsPosition = reComputeElementsPosition;
        service.deleteNotification = deleteNotification;
        service.buildNotification = buildNotification;

        ////////////

        //
        // NOTIFICATION
        //

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

        function deleteNotification(_notification, _callback)
        {
            _callback = (!angular.isFunction(_callback)) ? angular.noop : _callback;

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

                _callback(actionClicked);
                actionClicked = false;
            }, 400);
        }

        /**
         * Compute the notification list element new position.
         * Usefull when the height change programmatically and you need other notifications to fit.
         */
        function reComputeElementsPosition()
        {
            var baseOffset = 0;

            for (var idx = notificationList.length -1; idx >= 0; idx--)
            {
                notificationList[idx].height = getElementHeight(notificationList[idx].elem[0]);
                notificationList[idx].margin = baseOffset;

                notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');

                baseOffset += notificationList[idx].height + 24;
            }
        }

        function buildNotification(_text, _icon, _color, _action)
        {
            var notification = angular.element('<div/>',
            {
                class: 'notification'
            });
            var notificationText = angular.element('<span/>',
            {
                class: 'notification__content',
                html: _text
            });

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

            notification.append(notificationText);

            if (angular.isDefined(_action))
            {
                var $compile = $injector.get('$compile');
                var notificationAction = angular.element('<button/>',
                {
                    class: 'notification__action btn btn--m btn--flat',
                    html: _action
                });

                if (angular.isDefined(_color))
                {
                    notificationAction.addClass('btn--' + _color);
                }
                else
                {
                    notificationAction.addClass('btn--white');
                }

                notificationAction.attr('lx-ripple', '');
                $compile(notificationAction)($rootScope);

                notificationAction.bind('click', function()
                {
                    actionClicked = true;
                });

                notification
                    .addClass('notification--has-action')
                    .append(notificationAction);
            }

            return notification;
        }

        function notify(_text, _icon, _sticky, _color, _action, _callback, _delay)
        {
            /*jshint ignore:start*/
            // Use of `this` for override purpose.
            var notification = this.buildNotification(_text, _icon, _color, _action);
            /*jshint ignore:end*/

            var notificationTimeout;
            var notificationDelay = _delay || 6000;

            LxDepthService.register();

            notification
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
                actionClicked = true;
                deleteNotification(data, _callback);

                if (angular.isDefined(notificationTimeout))
                {
                    $timeout.cancel(notificationTimeout);
                }
            });

            if (angular.isUndefined(_sticky) || !_sticky)
            {
                notificationTimeout = $timeout(function()
                {
                    deleteNotification(data, _callback);
                }, notificationDelay);
            }
        }

        function notifyError(_text, _sticky)
        {
            service.notify(_text, 'alert-circle', _sticky, 'red');
        }

        function notifyInfo(_text, _sticky)
        {
            service.notify(_text, 'information-outline', _sticky, 'blue');
        }

        function notifySuccess(_text, _sticky)
        {
            service.notify(_text, 'check', _sticky, 'green');
        }

        function notifyWarning(_text, _sticky)
        {
            service.notify(_text, 'alert', _sticky, 'orange');
        }

        //
        // ALERT & CONFIRM
        //

        function buildDialogActions(_buttons, _callback, _unbind)
        {
            var $compile = $injector.get('$compile');

            var dialogActions = angular.element('<div/>',
            {
                class: 'dialog__footer'
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

        function getNotificationList()
        {
            // Return a copy of the notification list.
            return notificationList.slice();
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
            lxProgress.lxClass = angular.isDefined(lxProgress.lxValue) ? 'progress-container--determinate' : 'progress-container--indeterminate';
        }

        this.$onInit = init;
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
        .filter('lxSearchHighlight', lxSearchHighlight)
        .directive('lxSearchFilter', lxSearchFilter);

    lxSearchHighlight.$inject = ['$sce'];

    function lxSearchHighlight($sce)
    {
        function escapeRegexp(queryToEscape)
        {
            return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

        return function (matchItem, query, icon)
        {
            var string = '';

            if (icon)
            {
                string += '<i class="mdi mdi-' + icon + '"></i>';
            }

            string += query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;

            return $sce.trustAsHtml(string);
        };
    }

    function lxSearchFilter()
    {
        return {
            restrict: 'E',
            templateUrl: 'search-filter.html',
            scope:
            {
                autocomplete: '&?lxAutocomplete',
                closed: '=?lxClosed',
                color: '@?lxColor',
                icon: '@?lxIcon',
                onInit: '&?lxOnInit',
                onSelect: '=?lxOnSelect',
                searchOnFocus: '=?lxSearchOnFocus',
                theme: '@?lxTheme',
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

                input.on('focus', ctrl.focusInput);
                input.on('blur', ctrl.blurInput);
                input.on('keydown', ctrl.keyEvent);
            });

            scope.$on('$destroy', function()
            {
                input.off();
            });


            if (angular.isDefined(scope.lxSearchFilter.onInit)) {
                scope.lxSearchFilter.onInit()(scope.lxSearchFilter.dropdownId);
            }
        }
    }

    LxSearchFilterController.$inject = ['$element', '$scope', '$timeout', 'LxDropdownService', 'LxNotificationService', 'LxUtils'];

    function LxSearchFilterController($element, $scope, $timeout, LxDropdownService, LxNotificationService, LxUtils)
    {
        var lxSearchFilter = this;
        var debouncedAutocomplete;
        var input;
        var itemSelected = false;

        lxSearchFilter.blurInput = blurInput;
        lxSearchFilter.clearInput = clearInput;
        lxSearchFilter.focusInput = focusInput;
        lxSearchFilter.getClass = getClass;
        lxSearchFilter.keyEvent = keyEvent;
        lxSearchFilter.openInput = openInput;
        lxSearchFilter.selectItem = selectItem;
        lxSearchFilter.setInput = setInput;
        lxSearchFilter.setModel = setModel;

        lxSearchFilter.activeChoiceIndex = -1;
        lxSearchFilter.color = angular.isDefined(lxSearchFilter.color) ? lxSearchFilter.color : 'black';
        lxSearchFilter.dropdownId = LxUtils.generateUUID();
        lxSearchFilter.theme = angular.isDefined(lxSearchFilter.theme) ? lxSearchFilter.theme : 'light';

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

            if (!input.val())
            {
                $timeout(function() {
                    lxSearchFilter.modelController.$setViewValue(undefined);
                }, 500);
            }
        }

        function clearInput()
        {
            lxSearchFilter.modelController.$setViewValue(undefined);
            lxSearchFilter.modelController.$render();

            // Temporarily disabling search on focus since we never want to trigger it when clearing the input.
            var searchOnFocus = lxSearchFilter.searchOnFocus;
            lxSearchFilter.searchOnFocus = false;

            input.focus();

            lxSearchFilter.searchOnFocus = searchOnFocus;
        }

        function focusInput()
        {
            if (!lxSearchFilter.searchOnFocus)
            {
                return;
            }

            updateAutocomplete(lxSearchFilter.modelController.$viewValue, true);
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

            if (angular.isDefined(lxSearchFilter.theme))
            {
                searchFilterClass.push('search-filter--theme-' + lxSearchFilter.theme);
            }

            if (angular.isFunction(lxSearchFilter.autocomplete))
            {
                searchFilterClass.push('search-filter--autocomplete');
            }

            if (LxDropdownService.isOpen(lxSearchFilter.dropdownId))
            {
                searchFilterClass.push('search-filter--is-open');
            }

            return searchFilterClass;
        }

        function keyEvent(_event)
        {
            if (!angular.isFunction(lxSearchFilter.autocomplete))
            {
                return;
            }

            if (!LxDropdownService.isOpen(lxSearchFilter.dropdownId))
            {
                lxSearchFilter.activeChoiceIndex = -1;
            }

            switch (_event.keyCode) {
                case 13:
                    keySelect();
                    if (lxSearchFilter.activeChoiceIndex > -1)
                    {
                        _event.preventDefault();
                    }
                    break;

                case 38:
                    keyUp();
                    _event.preventDefault();
                    break;

                case 40:
                    keyDown();
                    _event.preventDefault();
                    break;
            }

            $scope.$apply();
        }

        function keyDown()
        {
            if (lxSearchFilter.autocompleteList.length)
            {
                lxSearchFilter.activeChoiceIndex += 1;

                if (lxSearchFilter.activeChoiceIndex >= lxSearchFilter.autocompleteList.length)
                {
                    lxSearchFilter.activeChoiceIndex = 0;
                }
            }
        }

        function keySelect()
        {
            if (!lxSearchFilter.autocompleteList || lxSearchFilter.activeChoiceIndex === -1)
            {
                return;
            }

            selectItem(lxSearchFilter.autocompleteList[lxSearchFilter.activeChoiceIndex]);
        }

        function keyUp()
        {
            if (lxSearchFilter.autocompleteList.length)
            {
                lxSearchFilter.activeChoiceIndex -= 1;

                if (lxSearchFilter.activeChoiceIndex < 0)
                {
                    lxSearchFilter.activeChoiceIndex = lxSearchFilter.autocompleteList.length - 1;
                }
            }
        }

        function openDropdown()
        {
            LxDropdownService.open(lxSearchFilter.dropdownId, $element);
        }

        function closeDropdown()
        {
            LxDropdownService.close(lxSearchFilter.dropdownId);
        }

        function onAutocompleteSuccess(autocompleteList)
        {
            lxSearchFilter.autocompleteList = autocompleteList;

            (lxSearchFilter.autocompleteList.length) ? openDropdown() : closeDropdown();
            lxSearchFilter.isLoading = false;
        }

        function onAutocompleteError(error)
        {
            LxNotificationService.error(error);
            lxSearchFilter.isLoading = false;
        }

        function openInput()
        {
            if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed)
            {
                $element.velocity(
                {
                    width: angular.isDefined(lxSearchFilter.width) ? parseInt(lxSearchFilter.width) : 240
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

        function selectItem(_item)
        {
            itemSelected = true;

            closeDropdown();

            lxSearchFilter.modelController.$setViewValue(_item);
            lxSearchFilter.modelController.$render();

            if (angular.isFunction(lxSearchFilter.onSelect))
            {
                lxSearchFilter.onSelect(_item);
            }
        }

        function setInput(_input)
        {
            input = _input;
        }

        function setModel(_modelController)
        {
            lxSearchFilter.modelController = _modelController;

            if (angular.isFunction(lxSearchFilter.autocomplete) && angular.isFunction(lxSearchFilter.autocomplete()))
            {
                debouncedAutocomplete = LxUtils.debounce(function()
                {
                    lxSearchFilter.isLoading = true;
                    (lxSearchFilter.autocomplete()).apply(this, arguments);
                }, 500);
                lxSearchFilter.modelController.$parsers.push(updateAutocomplete);
            }
        }

        function updateAutocomplete(_newValue, _immediate)
        {
            if ((_newValue || (angular.isUndefined(_newValue) && lxSearchFilter.searchOnFocus)) && !itemSelected)
            {
                if (_immediate)
                {
                    lxSearchFilter.isLoading = true;
                    (lxSearchFilter.autocomplete())(_newValue, onAutocompleteSuccess, onAutocompleteError);
                }
                else
                {
                    debouncedAutocomplete(_newValue, onAutocompleteSuccess, onAutocompleteError);
                }
            }
            else
            {
                debouncedAutocomplete.clear();
                closeDropdown();
            }

            itemSelected = false;

            return _newValue;
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
                value: '@?',
                lxTheme: '@?'
            },
            controller: LxRadioButtonController,
            controllerAs: 'lxRadioButton',
            bindToController: true,
            transclude: true,
            link: function (scope, el, attrs, ctrl) {
                ctrl.init();
            },
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
        lxRadioButton.init = init;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

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
                allowNewValue: '=?lxAllowNewValue',
                autocomplete: '=?lxAutocomplete',
                newValueTransform: '=?lxNewValueTransform',
                choices: '=?lxChoices',
                choicesCustomStyle: '=?lxChoicesCustomStyle',
                choicesViewMode: '@?lxChoicesViewMode',
                customStyle: '=?lxCustomStyle',
                displayFilter: '=?lxDisplayFilter',
                error: '=?lxError',
                filter: '&?lxFilter',
                filterFields: '=?lxFilterFields',
                fixedLabel: '=?lxFixedLabel',
                helper: '=?lxHelper',
                helperMessage: '@?lxHelperMessage',
                infiniteScroll: '&?lxInfiniteScroll',
                label: '@?lxLabel',
                loading: '=?lxLoading',
                max: '=?lxMax',
                modelToSelection: '&?lxModelToSelection',
                multiple: '=?lxMultiple',
                ngChange: '&?',
                ngDisabled: '=?',
                ngModel: '=',
                selectionToModel: '&?lxSelectionToModel',
                theme: '@?lxTheme',
                valid: '=?lxValid',
                viewMode: '@?lxViewMode'
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

            attrs.$observe('infiniteScroll', function(newValue) {
                scope.lxSelect.infiniteScroll = function(data) {
                    return scope.$parent.$eval(newValue, data);
                };
            });
        }
    }

    LxSelectController.$inject = ['$interpolate', '$element', '$filter', '$sce', '$scope', '$timeout', 'LxDepthService', 'LxDropdownService', 'LxUtils'];

    function LxSelectController($interpolate, $element, $filter, $sce, $scope, $timeout, LxDepthService, LxDropdownService, LxUtils)
    {
        /////////////////////////////
        //                         //
        //    Private attributes   //
        //                         //
        /////////////////////////////

        var lxSelect = this;
        var choiceTemplate;
        var selectedTemplate;
        var toggledPanes = {};

        /////////////////////////////
        //                         //
        //    Public attributes    //
        //                         //
        /////////////////////////////

        lxSelect.activeChoiceIndex = -1;
        lxSelect.activeSelectedIndex = -1;
        lxSelect.uuid = LxUtils.generateUUID();
        lxSelect.filterModel = undefined;
        lxSelect.ngModel = angular.isUndefined(lxSelect.ngModel) && lxSelect.multiple ? [] : lxSelect.ngModel;
        lxSelect.unconvertedModel = lxSelect.multiple ? [] : undefined;
        lxSelect.viewMode = angular.isUndefined(lxSelect.viewMode) ? 'field' : lxSelect.viewMode;
        lxSelect.choicesViewMode = angular.isUndefined(lxSelect.choicesViewMode) ? 'list' : lxSelect.choicesViewMode;
        
        lxSelect.panes = [];
        lxSelect.matchingPaths = undefined;

        /////////////////////////////
        //                         //
        //    Private functions    //
        //                         //
        /////////////////////////////

        /**
         * Close the given panes (and all of its children panes).
         *
         * @param {number} index The index of the pane to close.
         */
        function _closePane(index) {
            if (index === 0) {
                _closePanes();

                return;
            }

            if (angular.isUndefined(toggledPanes[index])) {
                return;
            }

            _closePane(index + 1);

            if (lxSelect.choicesViewSize === 'large') {
                lxSelect.panes.splice(toggledPanes[index].position, 1);
            } else {
                lxSelect.openedPanes.splice(toggledPanes[index].position, 1);
            }

            delete toggledPanes[index];
        }

        /**
         * Close all panes.
         */
        function _closePanes() {
            toggledPanes = {};

            if (lxSelect.choicesViewSize === 'large') {
                if (angular.isDefined(lxSelect.choices) && lxSelect.choices !== null) {
                    lxSelect.panes = [lxSelect.choices];
                } else {
                    lxSelect.panes = [];
                }
            } else {
                if (angular.isDefined(lxSelect.choices) && lxSelect.choices !== null) {
                    lxSelect.openedPanes = [lxSelect.choices];
                } else {
                    lxSelect.openedPanes = [];
                }
            }
        }

        /**
         * Find the index of an element in an array.
         *
         * @param  {Array}  haystack The array in which to search for the value.
         * @param  {*}      needle   The value to search in the array.
         * @return {number} The index of the value of the array, or -1 if not found.
         */
        function _findIndex(haystack, needle) {
            if (angular.isUndefined(haystack) || haystack.length === 0) {
                return -1;
            }

            for (var i = 0, len = haystack.length; i < len; i++) {
                if (haystack[i] === needle) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * Get the longest matching path containing the given string.
         *
         * @param {string} [containing] The string we want the matching path to contain.
         *                              If none given, just take the longest matching path of the first matching path.
         */
        function _getLongestMatchingPath(containing) {
            if (angular.isUndefined(lxSelect.matchingPaths) || lxSelect.matchingPaths.length === 0) {
                return undefined;
            }

            containing = containing || lxSelect.matchingPaths[0];

            var longest = lxSelect.matchingPaths[0];
            var longestSize = longest.split('.').length;
            for (var i = 1, len = lxSelect.matchingPaths.length; i < len; i++) {
                var matchingPath = lxSelect.matchingPaths[i];
                if (!matchingPath) {
                    continue;
                }

                if (matchingPath.indexOf(containing) === -1) {
                    break;
                }

                var size = matchingPath.split('.').length;
                if (size > longestSize) {
                    longest = matchingPath;
                    longestSize = size;
                }
            }

            return longest;
        }

        /**
         * When the down key is pressed, select the next item of the most right opened pane (the first one if we are at
         * the bottom).
         */
        function _keyDown()
        {
            var filteredChoices;

            if (lxSelect.choicesViewMode === 'panes') {
                filteredChoices = Object.keys(lxSelect.panes[(lxSelect.panes.length - 1)]);
            } else {
                filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
            }

            if (filteredChoices.length)
            {
                lxSelect.activeChoiceIndex += 1;

                if (lxSelect.activeChoiceIndex >= filteredChoices.length)
                {
                    lxSelect.activeChoiceIndex = 0;
                }
            }

            if (lxSelect.autocomplete)
            {
                LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
            }
        }

        /**
         * When the left key is pressed and we are displaying the choices in pane mode, close the most right opened
         * pane.
         */
        function _keyLeft() {
            if (lxSelect.choicesViewMode !== 'panes' || lxSelect.panes.length < 2) {
                return;
            }

            var previousPaneIndex = lxSelect.panes.length - 2;

            lxSelect.activeChoiceIndex = (
                Object.keys(lxSelect.panes[previousPaneIndex]) || []
            ).indexOf(
                (toggledPanes[previousPaneIndex] || {}).key
            );

            _closePane(previousPaneIndex);
        }

        function _keyRemove()
        {
            if (lxSelect.filterModel || angular.isUndefined(lxSelect.getSelectedModel()) || !lxSelect.getSelectedModel().length)
            {
                return;
            }

            if (lxSelect.activeSelectedIndex === -1)
            {
                lxSelect.activeSelectedIndex = lxSelect.getSelectedModel().length - 1;
            }
            else
            {
                unselect(lxSelect.getSelectedModel()[lxSelect.activeSelectedIndex]);
            }
        }

        /**
         * When the right key is pressed and we are displaying the choices in pane mode, open the currently selected
         * pane.
         */
        function _keyRight() {
            if (lxSelect.choicesViewMode !== 'panes' || lxSelect.activeChoiceIndex === -1) {
                return;
            }

            var paneOpened = _openPane((lxSelect.panes.length - 1), lxSelect.activeChoiceIndex, true);

            if (paneOpened) {
                lxSelect.activeChoiceIndex = 0;
            } else {
                _keySelect();
            }
        }

        /**
         * When the enter key is pressed, select the currently active choice.
         */
        function _keySelect() {
            var filteredChoices;

            if (lxSelect.choicesViewMode === 'panes') {
                filteredChoices = lxSelect.panes[(lxSelect.panes.length - 1)];
                if (!lxSelect.isLeaf(filteredChoices[lxSelect.activeChoiceIndex])) {
                    return;
                }
            } else {
                filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
            }

            if (filteredChoices.length && filteredChoices[lxSelect.activeChoiceIndex]) {
                lxSelect.toggleChoice(filteredChoices[lxSelect.activeChoiceIndex]);
            } else if (lxSelect.filterModel && lxSelect.allowNewValue) {
                if (angular.isArray(getSelectedModel())) {
                    var value = angular.isFunction(lxSelect.newValueTransform) ? lxSelect.newValueTransform(lxSelect.filterModel) : lxSelect.filterModel;
                    var identical = getSelectedModel().some(function (item) {
                        return angular.equals(item, value);
                    });

                    if (!identical) {
                        lxSelect.getSelectedModel().push(value);
                    }
                }

                lxSelect.filterModel = undefined;

                LxDropdownService.close('dropdown-' + lxSelect.uuid);
            }
        }

        /**
         * When the up key is pressed, select the previous item of the most right opened pane (the last one if we are at
         * the top).
         */
        function _keyUp() {
            var filteredChoices;

            if (lxSelect.choicesViewMode === 'panes') {
                filteredChoices = Object.keys(lxSelect.panes[(lxSelect.panes.length - 1)]);
            } else {
                filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
            }

            if (filteredChoices.length) {
                lxSelect.activeChoiceIndex -= 1;

                if (lxSelect.activeChoiceIndex < 0) {
                    lxSelect.activeChoiceIndex = filteredChoices.length - 1;
                }
            }

            if (lxSelect.autocomplete) {
                LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
            }
        }

        /**
         * When a key is pressed, call the event handler in the angular context.
         *
         * @param {Event} evt The keydown event.
         */
        function _onKeyDown(evt) {
            $scope.$apply(function applyKeyEvent() {
                lxSelect.keyEvent(evt);
            });
        }

        /**
         * Open a pane.
         * If the pane is already opened, don't do anything.
         *
         * @param  {number}        parentIndex         The index of the parent of the pane to open.
         * @param  {number|string} indexOrKey          The index or the name of the pane to open.
         * @param  {boolean}       [checkIsLeaf=false] Check if the pane we want to open is in fact a leaf.
         *                                             In the case of a leaf, don't open it.
         * @return {boolean}       Indicates if the panel has been opened or not.
         */
        function _openPane(parentIndex, indexOrKey, checkIsLeaf) {
            if (angular.isDefined(toggledPanes[parentIndex])) {
                return false;
            }

            var pane = pane || lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

            if (angular.isUndefined(pane)) {
                return false;
            }

            var key = indexOrKey;
            if (angular.isObject(pane) && angular.isNumber(key)) {
                key = (Object.keys(pane) || [])[key];
            }

            if (checkIsLeaf && lxSelect.isLeaf(pane[key])) {
                return false;
            }

            if (lxSelect.choicesViewSize === 'large') {
                lxSelect.panes.push(pane[key]);
            } else {
                lxSelect.openedPanes.push(pane[key]);
            }

            toggledPanes[parentIndex] = {
                key: key,
                position: lxSelect.choicesViewSize === 'large' ? lxSelect.panes.length - 1 : lxSelect.openedPanes.length - 1,
                path: (parentIndex === 0) ? key : toggledPanes[parentIndex - 1].path + '.' + key,
            };

            return true;
        }

        /**
         * Search for any path in an object containing the given regexp as a key or as a value.
         *
         * @param  {*}      container               The container in which to search for the regexp.
         * @param  {RegExp} regexp                  The regular expression to search in keys or values of the object (nested)
         * @param  {string} previousKey             The path to the current object.
         * @param  {Array}  [limitToFields=Array()] The fields in which we want to look for the filter.
         *                                          If none give, then use all the fields of the object.
         * @return {Array}  The list of paths that have matching key or value.
         */
        function _searchPath(container, regexp, previousKey, limitToFields) {
            limitToFields = limitToFields || [];
            limitToFields = (angular.isArray(limitToFields)) ? limitToFields : [limitToFields];

            var results = [];

            angular.forEach(container, function forEachItemsInContainer(items, key) {
                if (limitToFields.length > 0 && limitToFields.indexOf(key) === -1) {
                    return;
                }

                var pathToMatching = (previousKey) ? previousKey + '.' + key : key;

                var previousKeyAdded = false;
                var isLeaf = lxSelect.isLeaf(items);

                if ((!isLeaf && angular.isString(key) && regexp.test(key)) || (angular.isString(items) && regexp.test(items))) {
                    if (!previousKeyAdded && previousKey) {
                        results.push(previousKey);
                    }

                    if (!isLeaf) {
                        results.push(pathToMatching);
                    }
                }

                if (angular.isArray(items) || angular.isObject(items)) {
                    var newPaths = _searchPath(items, regexp, pathToMatching, (isLeaf) ? lxSelect.filterFields : []);

                    if (angular.isDefined(newPaths) && newPaths.length > 0) {
                        if (previousKey) {
                            results.push(previousKey);
                            previousKeyAdded = true;
                        }

                        results = results.concat(newPaths);
                    }
                }
            });

            return results;
        }

        /////////////////////////////
        //                         //
        //     Public functions    //
        //                         //
        /////////////////////////////

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

        /**
         * Check if the choices dropdown is opened.
         *
         * @return {boolean} If the choices dropdown is opened or not.
         */
        function areChoicesOpened() {
            return LxDropdownService.isOpen('dropdown-' + lxSelect.uuid);
        }

        function displayChoice(_choice)
        {
            var choiceScope = {
                $choice: _choice
            };

            var interpolatedChoice = $interpolate(choiceTemplate)(choiceScope);
            interpolatedChoice = '<span>' + interpolatedChoice + '</span>';
            return $sce.trustAsHtml((lxSelect.matchingPaths) ?
                $filter('lxHighlight')(interpolatedChoice, lxSelect.filterModel, true) : interpolatedChoice
            );
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
            return $sce.trustAsHtml((lxSelect.matchingPaths) ?
                $filter('lxHighlight')(_subheader, lxSelect.filterModel, true) : _subheader
            );
        }

        function getFilteredChoices()
        {
            return $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
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

        /**
         * Check if an object is a leaf object.
         * A leaf object is an object that contains the `isLeaf` property or that has property that are anything else
         * than object or arrays.
         *
         * @param  {*}       obj The object to check if it's a leaf
         * @return {boolean} If the object is a leaf object.
         */
        function isLeaf(obj) {
            if (angular.isUndefined(obj)) {
                return false;
            }

            if (angular.isArray(obj)) {
                return false;
            }

            if (!angular.isObject(obj)) {
                return true;
            }

            if (obj.isLeaf) {
                return true;
            }

            var isLeaf = false;
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var property = keys[i];
                if (property.charAt(0) === '$') {
                    continue;
                }

                if (!angular.isArray(obj[property]) && !angular.isObject(obj[property])) {
                    isLeaf = true;
                    break;
                }
            }

            return isLeaf;
        }

        /**
         * Check if a pane is toggled.
         *
         * @param  {number}        parentIndex The parent index of the pane in which to check.
         * @param  {number|string} indexOrKey  The index or the name of the pane to check.
         * @return {boolean}       If the pane is toggled or not.
         */
        function isPaneToggled(parentIndex, indexOrKey) {
            var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

            if (angular.isUndefined(pane)) {
                return false;
            }

            var key = indexOrKey;
            if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
                key = (Object.keys(pane) || [])[indexOrKey];
            }

            return angular.isDefined(toggledPanes[parentIndex]) && toggledPanes[parentIndex].key === key;
        }

        /**
         * Check if a path of a pane is matching the filter.
         *
         * @param {number}        parentIndex The index of the pane.
         * @param {number|string} indexOrKey  The index or the name of the item to check.
         */
        function isMatchingPath(parentIndex, indexOrKey) {
            var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

            if (angular.isUndefined(pane)) {
                return;
            }

            var key = indexOrKey;
            if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
                key = (Object.keys(pane) || [])[indexOrKey];
            }

            if (parentIndex === 0) {
                return _findIndex(lxSelect.matchingPaths, key) !== -1;
            }

            var previous = toggledPanes[parentIndex - 1];
            if (angular.isUndefined(previous)) {
                return false;
            }

            return _findIndex(lxSelect.matchingPaths, previous.path + '.' + key) !== -1;
        }

        function isSelected(_choice)
        {
            if (lxSelect.multiple && angular.isDefined(getSelectedModel()))
            {
                return arrayObjectIndexOf(getSelectedModel(), _choice) !== -1;
            }
            else if (angular.isDefined(getSelectedModel()))
            {
                return angular.equals(getSelectedModel(), _choice);
            }
        }

        function isMaxSelected() {
            if (lxSelect.multiple && angular.isDefined(lxSelect.max))
            {
                return lxSelect.ngModel.length >= parseInt(lxSelect.max, 10);
            }

            return false;
        }

        /**
         * Handle a key press event
         *
         * @param {Event} evt The key press event.
         */
        function keyEvent(evt) {
            if (evt.keyCode !== 8) {
                lxSelect.activeSelectedIndex = -1;
            }

            if (!LxDropdownService.isOpen('dropdown-' + lxSelect.uuid)) {
                lxSelect.activeChoiceIndex = -1;
            }

            switch (evt.keyCode) {
                case 8:
                    _keyRemove();
                    break;

                case 13:
                    _keySelect();
                    evt.preventDefault();
                    break;

                case 37:
                    if (lxSelect.activeChoiceIndex > -1) {
                        _keyLeft();
                        evt.preventDefault();
                    }
                    break;

                case 38:
                    _keyUp();
                    evt.preventDefault();
                    break;

                case 39:
                    if (lxSelect.activeChoiceIndex > -1) {
                        _keyRight();
                        evt.preventDefault();
                    }
                    break;


                case 40:
                    _keyDown();
                    evt.preventDefault();
                    break;

                default:
                    break;
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

        function select(_choice, cb)
        {
            cb = cb || angular.noop;

            if (lxSelect.multiple)
            {
                if (angular.isUndefined(lxSelect.ngModel)) {
                    lxSelect.ngModel = [];
                }

                if (isMaxSelected()) {
                    cb();

                    return;
                }
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

                        if (lxSelect.autocomplete)
                        {
                            $element.find('.lx-select-selected__filter').focus();
                        }

                        if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && lxSelect.multiple) {
                            $element.find('.lx-select-selected__filter input').focus();
                        }

                        if (angular.isFunction(cb)) {
                            $timeout(cb);
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

                if (lxSelect.autocomplete)
                {
                    $element.find('.lx-select-selected__filter').focus();
                }

                if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && lxSelect.multiple) {
                    $element.find('.lx-select-selected__filter input').focus();
                }

                if (angular.isFunction(cb)) {
                    $timeout(cb);
                }
            }
        }

        /**
         * Toggle the given choice. If it was selected, unselect it. If it wasn't selected, select it.
         *
         * @param {Object} choice The choice to toggle.
         * @param {Event}  [evt]  The event that triggered the function.
         */
        function toggleChoice(choice, evt) {
            if (lxSelect.multiple && !lxSelect.autocomplete && angular.isDefined(evt)) {
                evt.stopPropagation();
            }

            if (lxSelect.areChoicesOpened() && lxSelect.multiple) {
                var dropdownElement = angular.element(angular.element(evt.target).closest('.dropdown-menu--is-open')[0]);
                // If the dropdown element is scrollable, fix the content div height to keep the current scroll state.
                if (dropdownElement.scrollTop() > 0) {
                    var dropdownContentElement = angular.element(dropdownElement.find('.dropdown-menu__content')[0]);
                    var dropdownFilterElement = angular.element(dropdownContentElement.find('.lx-select-choices__filter')[0]);

                    var newHeight = dropdownContentElement.height();
                    newHeight -= (dropdownFilterElement.length) ? dropdownFilterElement.outerHeight() : 0;

                    var dropdownListElement = angular.element(dropdownContentElement.find('ul > div')[0]);
                    dropdownListElement.css('height', newHeight + 'px');

                    // This function is called when the ng-change attached to the filter input is called.
                    lxSelect.resetDropdownSize = function() {
                        dropdownListElement.css('height', 'auto');
                        lxSelect.resetDropdownSize = undefined;
                    }
                }
            }

            if (lxSelect.multiple && isSelected(choice)) {
                lxSelect.unselect(choice);
            } else {
                lxSelect.select(choice);
            }

            if (lxSelect.autocomplete) {
                lxSelect.activeChoiceIndex = -1;
                lxSelect.filterModel = undefined;
            }

            if (lxSelect.autocomplete || (lxSelect.choicesViewMode === 'panes' && !lxSelect.multiple)) {
                LxDropdownService.close('dropdown-' + lxSelect.uuid);
            }
        }

        /**
         * Toggle a pane.
         *
         * @param {Event}         evt               The click event that led to toggle the pane.
         * @param {number}        parentIndex       The index of the containing pane.
         * @param {number|string} indexOrKey        The index or the name of the pane to toggle.
         * @param {boolean}       [selectLeaf=true] Indicates if we want to select the choice if the pane to toggle is
         *                                          in fact a leaf.
         */
        function togglePane(evt, parentIndex, indexOrKey, selectLeaf) {
            selectLeaf = (angular.isUndefined(selectLeaf)) ? true : selectLeaf;
            var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

            if (angular.isUndefined(pane)) {
                return;
            }

            var key = indexOrKey;
            if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
                key = (Object.keys(pane) || [])[indexOrKey];
            }

            if (angular.isDefined(toggledPanes[parentIndex])) {
                var previousKey = toggledPanes[parentIndex].key;

                _closePane(parentIndex);

                if (previousKey === key) {
                    return;
                }
            }

            var isLeaf = lxSelect.isLeaf(pane[key]);
            if (isLeaf) {
                if (selectLeaf) {
                    lxSelect.toggleChoice(pane[key], evt);
                }

                return;
            }

            _openPane(parentIndex, key, false);
        }

        function unselect(_choice, cb)
        {
            cb = cb || angular.noop;

            if (angular.isDefined(lxSelect.selectionToModel))
            {
                lxSelect.selectionToModel(
                {
                    data: _choice,
                    callback: function(resp)
                    {
                        removeElement(lxSelect.ngModel, resp);

                        if (lxSelect.autocomplete)
                        {
                            $element.find('.lx-select-selected__filter').focus();
                            lxSelect.activeSelectedIndex = -1;
                        }

                        if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter &&
                            (lxSelect.ngModel.length === 0 || lxSelect.multiple)) {
                            $element.find('.lx-select-selected__filter input').focus();
                        }

                        if (angular.isFunction(cb)) {
                            $timeout(cb);
                        }
                    }
                });

                removeElement(lxSelect.unconvertedModel, _choice);
            }
            else
            {
                removeElement(lxSelect.ngModel, _choice);

                if (lxSelect.autocomplete)
                {
                    $element.find('.lx-select-selected__filter').focus();
                    lxSelect.activeSelectedIndex = -1;
                }

                if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter &&
                    (lxSelect.ngModel.length === 0 || lxSelect.multiple)) {
                    $element.find('.lx-select-selected__filter input').focus();
                }

                if (angular.isFunction(cb)) {
                    $timeout(cb);
                }
            }
        }

        /**
         * Update the filter.
         * Either filter the choices available or highlight the path to the matching elements.
         */
        function updateFilter() {
            if (angular.isFunction(lxSelect.resetDropdownSize)) {
                lxSelect.resetDropdownSize();
            }

            if (angular.isDefined(lxSelect.filter)) {
                lxSelect.matchingPaths = lxSelect.filter({
                    newValue: lxSelect.filterModel
                });
            } else if (lxSelect.choicesViewMode === 'panes') {
                lxSelect.matchingPaths = lxSelect.searchPath(lxSelect.filterModel);
                _closePanes();
            }

            if (lxSelect.autocomplete) {
                lxSelect.activeChoiceIndex = -1;

                if (lxSelect.filterModel) {
                    LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
                } else {
                    LxDropdownService.close('dropdown-' + lxSelect.uuid);
                }
            }

            if (lxSelect.choicesViewMode === 'panes' && angular.isDefined(lxSelect.matchingPaths) && lxSelect.matchingPaths.length > 0) {
                var longest = _getLongestMatchingPath();
                if (!longest) {
                    return;
                }

                var longestPath = longest.split('.');
                if (longestPath.length === 0) {
                    return;
                }

                angular.forEach(longestPath, function forEachPartOfTheLongestPath(part, index) {
                    _openPane(index, part, index === (longestPath.length - 1));
                });
            }
        }

        function helperDisplayable() {
            // If helper message is not defined, message is not displayed...
            if (angular.isUndefined(lxSelect.helperMessage))
            {
                return false;
            }

            // If helper is defined return it's state.
            if (angular.isDefined(lxSelect.helper))
            {
                return lxSelect.helper;
            }

            // Else check if there's choices.
            var choices = lxSelect.getFilteredChoices();

            if (angular.isArray(choices))
            {
                return !choices.length;
            }
            else if (angular.isObject(choices))
            {
                return !(Object.keys(choices) || []).length;
            }

            return true;
        }

        function removeElement(model, element)
        {
            var index = -1;
            for (var i = 0, len = model.length; i < len; i++)
            {
                if (angular.equals(element, model[i]))
                {
                    index = i;
                    break;
                }
            }

            if (index > -1)
            {
                model.splice(index, 1);
            }
        }

        /**
         * Search in the multipane select for the paths matching the search.
         *
         * @param {string} newValue The filter string.
         */
        function searchPath(newValue) {
            if (!newValue || newValue.length < 2) {
                return undefined;
            }

            var regexp = new RegExp(LxUtils.escapeRegexp(newValue), 'ig');

            return _searchPath(lxSelect.choices, regexp);
        }

        /////////////////////////////

        lxSelect.areChoicesOpened = areChoicesOpened;
        lxSelect.displayChoice = displayChoice;
        lxSelect.displaySelected = displaySelected;
        lxSelect.displaySubheader = displaySubheader;
        lxSelect.getFilteredChoices = getFilteredChoices;
        lxSelect.getSelectedModel = getSelectedModel;
        lxSelect.helperDisplayable = helperDisplayable;
        lxSelect.isLeaf = isLeaf;
        lxSelect.isMatchingPath = isMatchingPath;
        lxSelect.isPaneToggled = isPaneToggled;
        lxSelect.isSelected = isSelected;
        lxSelect.isMaxSelected = isMaxSelected;
        lxSelect.keyEvent = keyEvent;
        lxSelect.registerChoiceTemplate = registerChoiceTemplate;
        lxSelect.registerSelectedTemplate = registerSelectedTemplate;
        lxSelect.searchPath = searchPath;
        lxSelect.select = select;
        lxSelect.toggleChoice = toggleChoice;
        lxSelect.togglePane = togglePane;
        lxSelect.unselect = unselect;
        lxSelect.updateFilter = updateFilter;

        /////////////////////////////
        //                         //
        //        Watchers         //
        //                         //
        /////////////////////////////

        $scope.$watch(function watcherChoices() {
            return lxSelect.choices;
        }, function watchChoices(newChoices, oldChoices) {
            if (angular.isUndefined(lxSelect.choices) || lxSelect.choices === null) {
                lxSelect.panes = [];

                return;
            }

            lxSelect.panes = [lxSelect.choices];
            lxSelect.openedPanes = [lxSelect.choices];
        }, true);

        /////////////////////////////
        //                         //
        //          Events         //
        //                         //
        /////////////////////////////

        /**
         * When the choices dropdown closes, reset the toggled panels and the filter.
         *
         * @param {Event}  evt        The dropdown close event.
         * @param {string} dropdownId The id of the dropdown that ends to close.
         */
        $scope.$on('lx-dropdown__close-end', function onDropdownClose(evt, dropdownId) {
            if (lxSelect.choicesViewMode !== 'panes' || dropdownId !== 'dropdown-' + lxSelect.uuid) {
                return;
            }

            angular.element(document).off('keydown', _onKeyDown);

            lxSelect.filterModel = undefined;
            lxSelect.matchingPaths = undefined;
            lxSelect.activeChoiceIndex = -1;

            _closePanes();
        });

        /**
         * When the choices dropdown opens, focus the search filter.
         *
         * @param {Event}  evt        The dropdown open event.
         * @param {string} dropdownId The id of the dropdown that ends to close.
         */
        $scope.$on('lx-dropdown__open-start', function onDropdownOpen(evt, dropdownId) {
            if (lxSelect.choicesViewMode !== 'panes' || dropdownId !== 'dropdown-' + lxSelect.uuid) {
                return;
            }

            angular.element(document).on('keydown', _onKeyDown);

            $timeout(function delayFocusSearchFilter() {
                $element.find('.lx-select-selected__filter input').focus();
            });
        });

        /**
         * When the end of the dropdown is reached and infinite scroll is specified,
         * fetch new data.
         * 
         * @param {Event}  evt        The scroll event.
         * @param {string} dropdownId The id of the dropdown that scrolled to the end.
         */
        $scope.$on('lx-dropdown__scroll-end', function(evt, dropdownId) {
            if (typeof lxSelect.infiniteScroll !== 'function'
                || dropdownId !== 'dropdown-' + lxSelect.uuid 
                || lxSelect.loading
            ) {
                return;
            }

            lxSelect.infiniteScroll()()
                    .then(function fetchNewData(newData) {
                        if (newData && newData.length) {
                            lxSelect.choices = lxSelect.choices.concat(newData);
                        }
                    })
                    .catch(function() {
                        // Do nothing here, because error is supposed to be catched before.
                    });
        });
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
                    template += clone[i].data || clone[i].outerHTML || '';
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
                    template += clone[i].data || clone[i].outerHTML || '';
                }

                ctrls[1].registerChoiceTemplate(template);
            });
        }
    }

    LxSelectChoicesController.$inject = ['$scope', '$timeout', '$window'];

    function LxSelectChoicesController($scope, $timeout, $window)
    {
        var lxSelectChoices = this;
        var timer;

        lxSelectChoices.isArray = isArray;
        lxSelectChoices.setParentController = setParentController;

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
        });

        ////////////

        function isArray(choices)
        {
            choices = (angular.isUndefined(choices)) ? lxSelectChoices.parentCtrl.choices : choices;

            return angular.isArray(choices);
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

            lxSelectChoices.parentCtrl.choicesViewSize = $window.innerWidth < 980 ? 'small' : 'large';

            angular.element($window).on('resize', function onResize(evt) {
                if (evt.target.innerWidth < 980) {
                    lxSelectChoices.parentCtrl.choicesViewSize = 'small';
                } else {
                    lxSelectChoices.parentCtrl.choicesViewSize = 'large';
                }
            });
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
    }
})();

(function()
{
    'use strict';

    angular
        .module('lumx.stepper')
        .directive('lxStepper', lxStepper)
        .directive('lxStep', lxStep)
        .directive('lxStepNav', lxStepNav);

    /* Stepper */
    function lxStepper()
    {
        return {
            restrict: 'E',
            templateUrl: 'stepper.html',
            scope: {
                cancel: '&?lxCancel',
                complete: '&lxComplete',
                controls: '=?lxShowControls',
                id: '@?lxId',
                isLinear: '=?lxIsLinear',
                labels: '=?lxLabels',
                layout: '@?lxLayout'
            },
            controller: LxStepperController,
            controllerAs: 'lxStepper',
            bindToController: true,
            transclude: true
        };
    }

    LxStepperController.$inject = ['$scope'];

    function LxStepperController($scope)
    {
        var lxStepper = this;

        var _classes = [];
        var _defaultValues = {
            isLinear: true,
            labels: {
                'back': 'Back',
                'cancel': 'Cancel',
                'continue': 'Continue',
                'optional': 'Optional'
            },
            layout: 'horizontal'
        };

        lxStepper.addStep = addStep;
        lxStepper.getClasses = getClasses;
        lxStepper.goToStep = goToStep;
        lxStepper.isComplete = isComplete;
        lxStepper.updateStep = updateStep;

        lxStepper.controls = angular.isDefined(lxStepper.controls) ? lxStepper.controls : true;
        lxStepper.activeIndex = 0;
        lxStepper.isLinear = angular.isDefined(lxStepper.isLinear) ? lxStepper.isLinear : _defaultValues.isLinear;
        lxStepper.labels = angular.isDefined(lxStepper.labels) ? lxStepper.labels : _defaultValues.labels;
        lxStepper.layout = angular.isDefined(lxStepper.layout) ? lxStepper.layout : _defaultValues.layout;
        lxStepper.steps = [];

        ////////////

        function addStep(step)
        {
            lxStepper.steps.push(step);
        }

        function getClasses()
        {
            _classes.length = 0;

            _classes.push('lx-stepper--layout-' + lxStepper.layout);

            if (lxStepper.isLinear)
            {
                _classes.push('lx-stepper--is-linear');
            }

            var step = lxStepper.steps[lxStepper.activeIndex];
            if (angular.isDefined(step))
            {
                if (step.feedback)
                {
                    _classes.push('lx-stepper--step-has-feedback');
                }

                if (step.isLoading)
                {
                    _classes.push('lx-stepper--step-is-loading');
                }
            }

            return _classes;
        }

        function goToStep(index, bypass)
        {
            // Check if the wanted step previous steps are optionals. 
            // If so, check if the step before the last optional step is valid to allow going to the wanted step from the nav (only if linear stepper).
            var stepBeforeLastOptionalStep;
            if (!bypass && lxStepper.isLinear)
            {
                for (var i = index - 1; i >= 0; i--)
                {
                    if (angular.isDefined(lxStepper.steps[i]) && !lxStepper.steps[i].isOptional)
                    {
                        stepBeforeLastOptionalStep = lxStepper.steps[i];
                        break;
                    }
                }

                if(angular.isDefined(stepBeforeLastOptionalStep)) 
                {
                    // Check validity only if step is dirty and editable.
                    if (!stepBeforeLastOptionalStep.pristine && angular.isFunction(stepBeforeLastOptionalStep.validator) && stepBeforeLastOptionalStep.isEditable) 
                    {
                        var validity = stepBeforeLastOptionalStep.validator();

                        if (validity === true) 
                        {
                            stepBeforeLastOptionalStep.isValid = true;
                        } 
                        else 
                        {
                            stepBeforeLastOptionalStep.isValid = false;
                            stepBeforeLastOptionalStep.errorMessage = validity;
                        }
                    }

                    if (stepBeforeLastOptionalStep.isValid === true)
                    {
                        bypass = true;
                    }
                }
            }
            
            // Check if the wanted step previous step is not valid to disallow going to the wanted step from the nav (only if linear stepper).
            if (!bypass && lxStepper.isLinear && angular.isDefined(lxStepper.steps[index - 1]) && (angular.isUndefined(lxStepper.steps[index - 1].isValid) || lxStepper.steps[index - 1].isValid === false))
            {
                return;
            }

            if (index < lxStepper.steps.length)
            {
                lxStepper.activeIndex = parseInt(index);
                lxStepper.steps[lxStepper.activeIndex].pristine = false;
                $scope.$emit('lx-stepper__step', lxStepper.id, index, index === 0, index === (lxStepper.steps.length - 1));
            }
        }

        function isComplete()
        {
            var countMandatory = 0;
            var countValid = 0;

            for (var i = 0, len = lxStepper.steps.length; i < len; i++)
            {
                if (!lxStepper.steps[i].isOptional)
                {
                    countMandatory++;

                    if (lxStepper.steps[i].isValid === true) {
                        countValid++;
                    }
                }
            }

            if (countValid === countMandatory)
            {
                lxStepper.complete();
                return true;
            }
        }

        function updateStep(step)
        {
            for (var i = 0, len = lxStepper.steps.length; i < len; i++)
            {
                if (lxStepper.steps[i].uuid === step.uuid)
                {
                    lxStepper.steps[i].index = step.index;
                    lxStepper.steps[i].label = step.label;
                    return;
                }
            }
        }

        $scope.$on('lx-stepper__go-to-step', function(event, id, stepIndex, bypass)
        {
            if (angular.isDefined(id) && id !== lxStepper.id)
            {
                return;
            }

            goToStep(stepIndex, bypass);
        });
        $scope.$on('lx-stepper__cancel', function(event, id)
        {
            if ((angular.isDefined(id) && id !== lxStepper.id) || !angular.isFunction(lxStepper.cancel))
            {
                return;
            }

            lxStepper.cancel();
        });
    }

    /* Step */
    function lxStep()
    {
        return {
            restrict: 'E',
            require: ['lxStep', '^lxStepper'],
            templateUrl: 'step.html',
            scope: {
                feedback: '@?lxFeedback',
                isEditable: '=?lxIsEditable',
                isOptional: '=?lxIsOptional',
                isValid: '=?lxIsValid',
                label: '@lxLabel',
                submit: '&?lxSubmit',
                validate: '&?lxValidate'
            },
            link: link,
            controller: LxStepController,
            controllerAs: 'lxStep',
            bindToController: true,
            replace: true,
            transclude: true
        };

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].init(ctrls[1], element.index());

            attrs.$observe('lxFeedback', function(feedback)
            {
                ctrls[0].setFeedback(feedback);
            });

            attrs.$observe('lxLabel', function(label)
            {
                ctrls[0].setLabel(label);
            });

            attrs.$observe('lxIsEditable', function(isEditable)
            {
                ctrls[0].setIsEditable(isEditable);
            });

            attrs.$observe('lxIsOptional', function(isOptional)
            {
                ctrls[0].setIsOptional(isOptional);
            });
        }
    }

    LxStepController.$inject = ['$q', '$scope', 'LxNotificationService', 'LxUtils'];

    function LxStepController($q, $scope, LxNotificationService, LxUtils)
    {
        var lxStep = this;

        var _classes = [];
        var _nextStepIndex;

        lxStep.getClasses = getClasses;
        lxStep.init = init;
        lxStep.previousStep = previousStep;
        lxStep.setFeedback = setFeedback;
        lxStep.setLabel = setLabel;
        lxStep.setIsEditable = setIsEditable;
        lxStep.setIsOptional = setIsOptional;
        lxStep.submitStep = submitStep;
        
        lxStep.step = {
            errorMessage: undefined,
            feedback: undefined,
            index: undefined,
            isEditable: false,
            isLoading: false,
            isOptional: false,
            isValid: lxStep.isValid,
            label: undefined,
            pristine: true,
            uuid: LxUtils.generateUUID(),
            validator: undefined
        };

        ////////////

        function getClasses()
        {
            _classes.length = 0;

            if (lxStep.step.index === lxStep.parent.activeIndex)
            {
                _classes.push('lx-step--is-active');
            }

            return _classes;
        }

        function init(parent, index)
        {
            lxStep.parent = parent;
            lxStep.step.index = index;
            lxStep.step.validator = lxStep.validate;

            lxStep.parent.addStep(lxStep.step);
        }

        function previousStep()
        {
            if (lxStep.step.index > 0)
            {
                lxStep.parent.goToStep(lxStep.step.index - 1);
            }
        }

        function setFeedback(feedback)
        {
            lxStep.step.feedback = feedback;
            updateParentStep();
        }

        function setLabel(label)
        {
            lxStep.step.label = label;
            updateParentStep();
        }

        function setIsEditable(isEditable)
        {
            lxStep.step.isEditable = isEditable;
            updateParentStep();
        }

        function setIsOptional(isOptional)
        {
            lxStep.step.isOptional = isOptional;
            updateParentStep();
        }

        function submitStep()
        {
            if (lxStep.step.isValid === true && !lxStep.step.isEditable)
            {
                lxStep.parent.goToStep(_nextStepIndex, true);
                return;
            }

            var validateFunction = lxStep.validate;
            var validity = true;

            if (angular.isFunction(validateFunction))
            {
                validity = validateFunction();
            }

            if (validity === true)
            {
                $scope.$emit('lx-stepper__step-loading', lxStep.parent.id, lxStep.step.index);

                lxStep.step.isLoading = true;
                updateParentStep();

                var submitFunction = lxStep.submit;

                if (!angular.isFunction(submitFunction))
                {
                    submitFunction = function()
                    {
                        return $q(function(resolve)
                        {
                            resolve();
                        });
                    };
                }

                var promise = submitFunction();

                promise.then(function(nextStepIndex)
                {
                    lxStep.step.isValid = true;
                    updateParentStep();

                    var isComplete = lxStep.parent.isComplete();

                    if (!isComplete)
                    {
                        _nextStepIndex = angular.isDefined(nextStepIndex) && nextStepIndex > lxStep.parent.activeIndex && (!lxStep.parent.isLinear || (lxStep.parent.isLinear && lxStep.parent.steps[nextStepIndex - 1].isOptional)) ? nextStepIndex : lxStep.step.index + 1;

                        lxStep.parent.goToStep(_nextStepIndex, true);
                    }
                    else
                    {
                        $scope.$emit('lx-stepper__completed', lxStepper.id);
                    }
                }).catch(function(error)
                {
                    LxNotificationService.error(error);
                }).finally(function()
                {
                    $scope.$emit('lx-stepper__step-loaded', lxStep.parent.id, lxStep.step.index);
                    lxStep.step.isLoading = false;
                    updateParentStep();
                });
            }
            else
            {
                lxStep.step.isValid = false;
                lxStep.step.errorMessage = validity;
                updateParentStep();
            }
        }

        function updateParentStep()
        {
            lxStep.parent.updateStep(lxStep.step);
        }

        $scope.$on('lx-stepper__submit-step', function(event, id, index)
        {
            if ((angular.isDefined(id) && id !== lxStep.parent.id) || index !== lxStep.step.index)
            {
                return;
            }

            submitStep();
        });
        $scope.$on('lx-stepper__previous-step', function(event, id, index)
        {
            if ((angular.isDefined(id) && id !== lxStep.parent.id) || index !== lxStep.step.index)
            {
                return;
            }

            previousStep();
        });
    }

    /* Step nav */
    function lxStepNav()
    {
        return {
            restrict: 'E',
            require: ['lxStepNav', '^lxStepper'],
            templateUrl: 'step-nav.html',
            scope: {
                activeIndex: '@lxActiveIndex',
                step: '=lxStep'
            },
            link: link,
            controller: LxStepNavController,
            controllerAs: 'lxStepNav',
            bindToController: true,
            replace: true,
            transclude: false
        };

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].init(ctrls[1]);
        }
    }

    function LxStepNavController()
    {
        var lxStepNav = this;

        var _classes = [];

        lxStepNav.getClasses = getClasses;
        lxStepNav.init = init;

        ////////////

        function getClasses()
        {
            _classes.length = 0;

            if (parseInt(lxStepNav.step.index) === parseInt(lxStepNav.activeIndex))
            {
                _classes.push('lx-step-nav--is-active');
            }

            if (lxStepNav.step.isValid === true)
            {
                _classes.push('lx-step-nav--is-valid');
            }
            else if (lxStepNav.step.isValid === false)
            {
                _classes.push('lx-step-nav--has-error');
            }

            if (lxStepNav.step.isEditable)
            {
                _classes.push('lx-step-nav--is-editable');
            }

            if (lxStepNav.step.isOptional)
            {
                _classes.push('lx-step-nav--is-optional');
            }

            return _classes;
        }

        function init(parent, index)
        {
            lxStepNav.parent = parent;
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
                lxColor: '@?',
                lxPosition: '@?',
                lxTheme: '@?'
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
            lxSwitch.lxPosition = angular.isUndefined(lxSwitch.lxPosition) ? 'left' : lxSwitch.lxPosition;
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
                links: '=?lxLinks',
                position: '@?lxPosition'
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
            return lxTabs.position;
        }, function(_newPosition) {
            lxTabs.bottomPosition = angular.isDefined(_newPosition) && (_newPosition === 'bottom');
        });

        $scope.$watch(function()
        {
            return lxTabs.links;
        }, function(_newLinks)
        {
            lxTabs.viewMode = angular.isDefined(_newLinks) ? 'separate' : 'gather';

            angular.forEach(_newLinks, function(link, index)
            {
                var tab = {
                    uuid: (angular.isUndefined(link.uuid) || link.uuid.length === 0) ? LxUtils.generateUUID() : link.uuid,
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
                if (tab.index === _tab.index)
                {
                    newTab = false;

                    tab.uuid = _tab.uuid;
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
                focus: '<?lxFocus',
                icon: '@?lxIcon',
                label: '@lxLabel',
                ngDisabled: '=?',
                hasPlaceholder: '=?lxHasPlaceholder',
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

                input.on('focus', function()
                {
                    var phase = scope.$root.$$phase;

                    if (phase === '$apply' || phase === '$digest')
                    {
                        ctrl.focusInput();
                    }
                    else
                    {
                        scope.$apply(ctrl.focusInput);
                    }
                });
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
        var timer;

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

            if (newValue !== oldValue && newValue)
            {
                updateTextareaHeight();
            }
        });

        $scope.$watch(function()
        {
            return lxTextField.focus;
        }, function(newValue, oldValue)
        {
            if (angular.isDefined(newValue) && newValue)
            {
                $timeout(function()
                {
                    input.focus();
                    // Reset the value so we can re-focus the field later on if we want to.
                    lxTextField.focus = false;
                });
            }
        });

        $scope.$on('$destroy', function()
        {
            $timeout.cancel(timer);
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
            lxTextField.isActive = true;
            lxTextField.isFocus = true;
        }

        function hasValue()
        {
            return angular.isDefined(input.val()) && input.val().length > 0;
        }

        function init()
        {
            lxTextField.isActive = hasValue();
            lxTextField.focus = angular.isDefined(lxTextField.focus) ? lxTextField.focus : false;
            lxTextField.isFocus = lxTextField.focus;
        }

        function setInput(_input)
        {
            input = _input;

            timer = $timeout(init);
        }

        function setModel(_modelControler)
        {
            modelController = _modelControler;
        }

        function updateTextareaHeight()
        {
            if (!input.is('textarea'))
            {
                return;
            }

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
            if (angular.isDefined(attrs.lxTooltip))
            {
                attrs.$observe('lxTooltip', function(newValue)
                {
                    ctrl.updateTooltipText(newValue);
                });
            }

            if (angular.isDefined(attrs.lxTooltipPosition))
            {
                attrs.$observe('lxTooltipPosition', function(newValue)
                {
                    scope.lxTooltip.position = newValue;
                });
            }

            if (angular.element(window).outerWidth() > 768) {
                element.on('mouseenter', ctrl.showTooltip);
                element.on('mouseleave', ctrl.hideTooltip);
            }

            scope.$on('$destroy', function()
            {
                element.off();
            });
        }
    }

    LxTooltipController.$inject = ['$element', '$scope', '$timeout', 'LxDepthService', 'LxUtils'];

    function LxTooltipController($element, $scope, $timeout, LxDepthService, LxUtils)
    {
        var lxTooltip = this;
        var timer1;
        var timer2;
        var tooltip;
        var tooltipBackground;
        var tooltipLabel;

        lxTooltip.hideTooltip = hideTooltip;
        lxTooltip.showTooltip = showTooltip;
        lxTooltip.updateTooltipText = updateTooltipText;

        lxTooltip.position = angular.isDefined(lxTooltip.position) ? lxTooltip.position : 'top';

        $scope.$on('$destroy', function()
        {
            if (angular.isDefined(tooltip))
            {
                tooltip.remove();
                tooltip = undefined;
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
                    if (angular.isDefined(tooltip))
                    {
                        angular.element(document).off('scroll', _debouncedSetPosition);
                        tooltip.remove();
                        tooltip = undefined;
                    }
                }, 200);
            }
        }

        function setTooltipPosition()
        {
            var topOffset = ($('.scroll-mask')) ? $('body').css('top') : 0;
            topOffset = (topOffset) ? parseInt(topOffset, 10) : 0;
            topOffset = (isNaN(topOffset)) ? 0 : topOffset;

            var width = $element.outerWidth(),
                height = $element.outerHeight(),
                top = $element.offset().top - topOffset,
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
        var _debouncedSetPosition = LxUtils.debounce(setTooltipPosition, 250);

        function showTooltip()
        {
            if (angular.isUndefined(tooltip))
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
                angular.element(document).on('scroll', _debouncedSetPosition);

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

        function updateTooltipText(_newValue)
        {
            if (angular.isDefined(tooltipLabel))
            {
                tooltipLabel.text(_newValue);
            }
        }
    }
})();

angular.module("lumx.dropdown").run(['$templateCache', function(a) { a.put('dropdown.html', '<div class="dropdown"\n' +
    '     ng-class="{ \'dropdown--has-toggle\': lxDropdown.hasToggle,\n' +
    '                 \'dropdown--is-open\': lxDropdown.isOpen }"\n' +
    '     ng-transclude></div>\n' +
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
    '    <input type="file" class="input-file__input" accept="{{ lxFileInput.accept }}">\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.text-field").run(['$templateCache', function(a) { a.put('text-field.html', '<div class="text-field"\n' +
    '     ng-class="{ \'text-field--error\': lxTextField.error,\n' +
    '                 \'text-field--fixed-label\': lxTextField.fixedLabel && !lxTextField.hasPlaceholder,\n' +
    '                 \'text-field--has-icon\': lxTextField.icon,\n' +
    '                 \'text-field--has-value\': lxTextField.hasValue(),\n' +
    '                 \'text-field--is-active\': lxTextField.isActive || lxTextField.hasPlaceholder,\n' +
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
    '            <lx-button type="submit" lx-size="l" lx-color="{{ lxSearchFilter.color }}" lx-type="icon" ng-click="lxSearchFilter.openInput()">\n' +
    '                <i class="mdi mdi-magnify"></i>\n' +
    '            </lx-button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="search-filter__input" ng-transclude></div>\n' +
    '\n' +
    '        <div class="search-filter__clear">\n' +
    '            <lx-button type="button" lx-size="l" lx-color="{{ lxSearchFilter.color }}" lx-type="icon" ng-click="lxSearchFilter.clearInput()">\n' +
    '                <i class="mdi mdi-close"></i>\n' +
    '            </lx-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="search-filter__loader" ng-if="lxSearchFilter.isLoading">\n' +
    '        <lx-progress lx-type="linear"></lx-progress>\n' +
    '    </div>\n' +
    '\n' +
    '    <lx-dropdown id="{{ lxSearchFilter.dropdownId }}" lx-effect="none" lx-width="100%" ng-if="lxSearchFilter.autocomplete">\n' +
    '        <lx-dropdown-menu class="search-filter__autocomplete-list">\n' +
    '            <ul>\n' +
    '                <li ng-repeat="item in lxSearchFilter.autocompleteList track by $index">\n' +
    '                    <a class="search-filter__autocomplete-item"\n' +
    '                       ng-class="{ \'search-filter__autocomplete-item--is-active\': lxSearchFilter.activeChoiceIndex === $index }"\n' +
    '                       ng-click="lxSearchFilter.selectItem(item)"\n' +
    '                       ng-bind-html="item | lxSearchHighlight:lxSearchFilter.modelController.$viewValue:lxSearchFilter.icon"></a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </lx-dropdown-menu>\n' +
    '    </lx-dropdown>\n' +
    '</div>');
	 }]);
angular.module("lumx.select").run(['$templateCache', function(a) { a.put('select.html', '<div class="lx-select"\n' +
    '     ng-class="{ \'lx-select--error\': lxSelect.error,\n' +
    '                 \'lx-select--fixed-label\': lxSelect.fixedLabel && lxSelect.viewMode === \'field\',\n' +
    '                 \'lx-select--is-active\': (!lxSelect.multiple && lxSelect.getSelectedModel()) || (lxSelect.multiple && lxSelect.getSelectedModel().length) || (lxSelect.choicesViewMode === \'panes\' && lxSelect.areChoicesOpened()),\n' +
    '                 \'lx-select--is-disabled\': lxSelect.ngDisabled,\n' +
    '                 \'lx-select--is-multiple\': lxSelect.multiple,\n' +
    '                 \'lx-select--is-unique\': !lxSelect.multiple,\n' +
    '                 \'lx-select--theme-light\': !lxSelect.theme || lxSelect.theme === \'light\',\n' +
    '                 \'lx-select--theme-dark\': lxSelect.theme === \'dark\',\n' +
    '                 \'lx-select--valid\': lxSelect.valid,\n' +
    '                 \'lx-select--custom-style\': lxSelect.customStyle,\n' +
    '                 \'lx-select--default-style\': !lxSelect.customStyle,\n' +
    '                 \'lx-select--view-mode-field\': !lxSelect.multiple || (lxSelect.multiple && lxSelect.viewMode === \'field\'),\n' +
    '                 \'lx-select--view-mode-chips\': lxSelect.multiple && lxSelect.viewMode === \'chips\',\n' +
    '                 \'lx-select--panes\': lxSelect.choicesViewMode === \'panes\',\n' +
    '                 \'lx-select--with-filter\': lxSelect.displayFilter,\n' +
    '                 \'lx-select--autocomplete\': lxSelect.autocomplete }">\n' +
    '    <span class="lx-select-label" ng-if="!lxSelect.autocomplete">\n' +
    '        {{ lxSelect.label }}\n' +
    '    </span>\n' +
    '\n' +
    '    <lx-dropdown id="dropdown-{{ lxSelect.uuid }}" lx-width="{{ (lxSelect.choicesViewMode === \'panes\') ? \'\' : \'100%\' }}"\n' +
    '                 lx-effect="{{ lxSelect.autocomplete ? \'none\' : \'expand\' }}">\n' +
    '        <ng-transclude></ng-transclude>\n' +
    '    </lx-dropdown>\n' +
    '</div>\n' +
    '');
	a.put('select-selected.html', '<div>\n' +
    '    <lx-dropdown-toggle ng-if="::!lxSelectSelected.parentCtrl.autocomplete">\n' +
    '        <ng-include src="\'select-selected-content.html\'"></ng-include>\n' +
    '    </lx-dropdown-toggle>\n' +
    '\n' +
    '    <ng-include src="\'select-selected-content.html\'" ng-if="::lxSelectSelected.parentCtrl.autocomplete"></ng-include>\n' +
    '</div>\n' +
    '');
	a.put('select-selected-content.html', '<div class="lx-select-selected-wrapper"\n' +
    '     ng-class="{ \'lx-select-selected-wrapper--with-filter\': !lxSelectSelected.parentCtrl.ngDisabled && lxSelectSelected.parentCtrl.areChoicesOpened() && (lxSelectSelected.parentCtrl.multiple || !lxSelectSelected.parentCtrl.getSelectedModel()) }"\n' +
    '     id="lx-select-selected-wrapper-{{ lxSelectSelected.parentCtrl.uuid }}">\n' +
    '    <div class="lx-select-selected"\n' +
    '         ng-if="!lxSelectSelected.parentCtrl.multiple">\n' +
    '        <span class="lx-select-selected__value"\n' +
    '              ng-bind-html="lxSelectSelected.parentCtrl.displaySelected()"\n' +
    '              ng-if="lxSelectSelected.parentCtrl.getSelectedModel()"></span>\n' +
    '\n' +
    '        <a class="lx-select-selected__clear"\n' +
    '           ng-click="lxSelectSelected.clearModel($event)"\n' +
    '           ng-if="lxSelectSelected.parentCtrl.allowClear && lxSelectSelected.parentCtrl.getSelectedModel()">\n' +
    '            <i class="mdi mdi-close-circle"></i>\n' +
    '        </a>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-select-selected" ng-if="lxSelectSelected.parentCtrl.multiple">\n' +
    '        <span class="lx-select-selected__tag"\n' +
    '              ng-class="{ \'lx-select-selected__tag--is-active\': lxSelectSelected.parentCtrl.activeSelectedIndex === $index }"\n' +
    '              ng-click="lxSelectSelected.removeSelected(selected, $event)"\n' +
    '              ng-repeat="selected in lxSelectSelected.parentCtrl.getSelectedModel()"\n' +
    '              ng-bind-html="lxSelectSelected.parentCtrl.displaySelected(selected)"></span>\n' +
    '\n' +
    '        <input type="text"\n' +
    '               placeholder="{{ ::lxSelectSelected.parentCtrl.label }}"\n' +
    '               class="lx-select-selected__filter"\n' +
    '               ng-model="lxSelectSelected.parentCtrl.filterModel"\n' +
    '               ng-change="lxSelectSelected.parentCtrl.updateFilter()"\n' +
    '               ng-keydown="lxSelectSelected.parentCtrl.keyEvent($event)"\n' +
    '               ng-if="lxSelectSelected.parentCtrl.autocomplete && !lxSelectSelected.parentCtrl.ngDisabled">\n' +
    '    </div>\n' +
    '\n' +
    '    <lx-search-filter lx-dropdown-filter class="lx-select-selected__filter" ng-if="lxSelectSelected.parentCtrl.choicesViewMode === \'panes\' && !lxSelectSelected.parentCtrl.ngDisabled && lxSelectSelected.parentCtrl.areChoicesOpened() && (lxSelectSelected.parentCtrl.multiple || !lxSelectSelected.parentCtrl.getSelectedModel())">\n' +
    '        <input type="text"\n' +
    '               ng-model="lxSelectSelected.parentCtrl.filterModel"\n' +
    '               ng-change="lxSelectSelected.parentCtrl.updateFilter()"\n' +
    '               lx-stop-propagation="click">\n' +
    '    </lx-search-filter>\n' +
    '</div>\n' +
    '');
	a.put('select-choices.html', '<lx-dropdown-menu class="lx-select-choices"\n' +
    '                  ng-class="{ \'lx-select-choices--custom-style\': lxSelectChoices.parentCtrl.choicesCustomStyle,\n' +
    '                              \'lx-select-choices--default-style\': !lxSelectChoices.parentCtrl.choicesCustomStyle,\n' +
    '                              \'lx-select-choices--is-multiple\': lxSelectChoices.parentCtrl.multiple,\n' +
    '                              \'lx-select-choices--is-unique\': !lxSelectChoices.parentCtrl.multiple,\n' +
    '                              \'lx-select-choices--list\': lxSelectChoices.parentCtrl.choicesViewMode === \'list\',\n' +
    '                              \'lx-select-choices--multi-panes\': lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' }">\n' +
    '    <ul ng-if="::lxSelectChoices.parentCtrl.choicesViewMode === \'list\'">\n' +
    '        <li class="lx-select-choices__filter" ng-if="::lxSelectChoices.parentCtrl.displayFilter && !lxSelectChoices.parentCtrl.autocomplete">\n' +
    '            <lx-search-filter lx-dropdown-filter>\n' +
    '                <input type="text" ng-model="lxSelectChoices.parentCtrl.filterModel" ng-change="lxSelectChoices.parentCtrl.updateFilter()">\n' +
    '            </lx-search-filter>\n' +
    '        </li>\n' +
    '        \n' +
    '        <div ng-if="::lxSelectChoices.isArray()">\n' +
    '            <li class="lx-select-choices__choice"\n' +
    '                ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.parentCtrl.isSelected(choice),\n' +
    '                            \'lx-select-choices__choice--is-disabled\': !lxSelectChoices.parentCtrl.isSelected(choice) && lxSelectChoices.parentCtrl.isMaxSelected(),\n' +
    '                            \'lx-select-choices__choice--is-focus\': lxSelectChoices.parentCtrl.activeChoiceIndex === $index }"\n' +
    '                ng-repeat="choice in lxSelectChoices.parentCtrl.choices | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.parentCtrl.filterModel"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displayChoice(choice)"\n' +
    '                ng-click="lxSelectChoices.parentCtrl.toggleChoice(choice, $event)"></li>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="::!lxSelectChoices.isArray()">\n' +
    '            <li class="lx-select-choices__subheader"\n' +
    '                ng-repeat-start="(subheader, children) in lxSelectChoices.parentCtrl.choices"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displaySubheader(subheader)"></li>\n' +
    '\n' +
    '            <li class="lx-select-choices__choice"\n' +
    '                ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.parentCtrl.isSelected(choice),\n' +
    '                            \'lx-select-choices__choice--is-focus\': lxSelectChoices.parentCtrl.activeChoiceIndex === $index }"\n' +
    '                ng-repeat-end\n' +
    '                ng-repeat="choice in children | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.parentCtrl.filterModel"\n' +
    '                ng-bind-html="::lxSelectChoices.parentCtrl.displayChoice(choice)"\n' +
    '                ng-click="lxSelectChoices.parentCtrl.toggleChoice(choice, $event)"></li>\n' +
    '        </div>\n' +
    '\n' +
    '        <li class="lx-select-choices__subheader" ng-if="lxSelectChoices.parentCtrl.helperDisplayable()">\n' +
    '            {{ lxSelectChoices.parentCtrl.helperMessage }}\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '    <div class="lx-select-choices__panes-wrapper" ng-if="lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' && lxSelectChoices.parentCtrl.choicesViewSize === \'large\'" lx-stop-propagation="click">\n' +
    '        <div class="lx-select-choices__loader" ng-if="lxSelectChoices.parentCtrl.loading">\n' +
    '            <lx-progress lx-type="circular" lx-color="white" lx-diameter="60"></lx-progress>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-select-choices__panes-container" ng-if="!lxSelectChoices.parentCtrl.loading">\n' +
    '            <div class="lx-select-choices__pane lx-select-choices__pane-{{ $index }}"\n' +
    '                 ng-class="{ \'lx-select-choices__pane--is-filtering\': lxSelectChoices.parentCtrl.matchingPaths !== undefined,\n' +
    '                             \'lx-select-choices__pane--first\': $first,\n' +
    '                             \'lx-select-choices__pane--last\': $last }"\n' +
    '                 ng-repeat="pane in lxSelectChoices.parentCtrl.panes">\n' +
    '                <div ng-repeat="(label, items) in pane"\n' +
    '                   class="lx-select-choices__pane-choice"\n' +
    '                   ng-class="{ \'lx-select-choices__pane-choice--is-selected\': lxSelectChoices.parentCtrl.isPaneToggled($parent.$index, label) || lxSelectChoices.parentCtrl.isSelected(items) || ($parent.$last && lxSelectChoices.parentCtrl.activeChoiceIndex === $index),\n' +
    '                               \'lx-select-choices__pane-choice--is-matching\': lxSelectChoices.parentCtrl.isMatchingPath($parent.$index, label),\n' +
    '                               \'lx-select-choices__pane-choice--is-leaf\': lxSelectChoices.isArray(pane) }"\n' +
    '                   ng-bind-html="(lxSelectChoices.isArray(pane)) ? lxSelectChoices.parentCtrl.displayChoice(items) : lxSelectChoices.parentCtrl.displaySubheader(label)"\n' +
    '                   ng-click="lxSelectChoices.parentCtrl.togglePane($event, $parent.$index, label, true)">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-select-choices__panes-wrapper" ng-if="lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' && lxSelectChoices.parentCtrl.choicesViewSize === \'small\'" lx-stop-propagation="click">\n' +
    '        <div class="lx-select-choices__loader" ng-if="lxSelectChoices.parentCtrl.loading">\n' +
    '            <lx-progress lx-type="circular" lx-color="white" lx-diameter="60"></lx-progress>\n' +
    '        </div>\n' +
    '        <div class="lx-select-choices__panes-container" ng-if="!lxSelectChoices.parentCtrl.loading">\n' +
    '            <div class="lx-select-choices__pane lx-select-choices__pane"\n' +
    '                ng-class="{ \'lx-select-choices__pane--is-filtering\': lxSelectChoices.parentCtrl.matchingPaths !== undefined,\n' +
    '                            \'lx-select-choices__pane--first\': $first,\n' +
    '                            \'lx-select-choices__pane--last\': $last }"\n' +
    '                ng-repeat="pane in lxSelectChoices.parentCtrl.panes">\n' +
    '                <div ng-include="\'select-choices-accordion.html\'" ng-init="level = 0"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <lx-progress lx-type="linear" lx-color="primary" ng-if="lxSelectChoices.parentCtrl.loading"></lx-progress>\n' +
    '</lx-dropdown-menu>\n' +
    '');
	a.put('select-choices-accordion.html', '<div ng-repeat="(label, items) in pane">\n' +
    '    <div class="lx-select-choices__pane-choice lx-select-choices__pane-{{ level }}"\n' +
    '         ng-class="{ \'lx-select-choices__pane-choice--is-selected\': lxSelectChoices.parentCtrl.isPaneToggled(level, label) || lxSelectChoices.parentCtrl.isSelected(items),\n' +
    '                \'lx-select-choices__pane-choice--is-matching\': lxSelectChoices.parentCtrl.isMatchingPath(level, label),\n' +
    '                \'lx-select-choices__pane-choice--is-leaf\': lxSelectChoices.isArray(pane) }"\n' +
    '         ng-bind-html="(lxSelectChoices.isArray(pane)) ? lxSelectChoices.parentCtrl.displayChoice(items) : lxSelectChoices.parentCtrl.displaySubheader(label)"\n' +
    '         ng-click="lxSelectChoices.parentCtrl.togglePane($event, level, label, true)"></div>\n' +
    '\n' +
    '    <div ng-include="\'select-choices-accordion.html\'"\n' +
    '         ng-if="!lxSelectChoices.isArray(pane) && lxSelectChoices.parentCtrl.isPaneToggled(level,label)"\n' +
    '         ng-init="pane = items; level = level + 1"></div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.tabs").run(['$templateCache', function(a) { a.put('tabs.html', '<div class="tabs tabs--layout-{{ lxTabs.layout }} tabs--theme-{{ lxTabs.theme }} tabs--color-{{ lxTabs.color }} tabs--indicator-{{ lxTabs.indicator }}">\n' +
    '    <div class="tabs__panes" ng-if="lxTabs.viewMode === \'gather\' && lxTabs.bottomPosition" ng-transclude></div>\n' +
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
    '    <div class="tabs__panes" ng-if="lxTabs.viewMode === \'gather\' && !lxTabs.bottomPosition" ng-transclude></div>\n' +
    '    <div class="tabs__indicator" ng-class="{\'tabs__indicator--top\': !lxTabs.bottomPosition, \'tabs__indicator--bottom\': lxTabs.bottomPosition}"></div>\n' +
    '</div>\n' +
    '');
	a.put('tabs-panes.html', '<div class="tabs tabs--separate">\n' +
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
angular.module("lumx.progress").run(['$templateCache', function(a) { a.put('progress.html', '<div class="progress-container progress-container--{{ lxProgress.lxType }} progress-container--{{ lxProgress.lxColor }} {{ lxProgress.lxClass }}">\n' +
    '    <div class="progress-circular"\n' +
    '         ng-if="lxProgress.lxType === \'circular\'"\n' +
    '         ng-style="lxProgress.getProgressDiameter()">\n' +
    '        <svg class="progress-circular__svg">\n' +
    '            <g transform="translate(50 50)">\n' +
    '                <g class="progress-circular__g">\n' +
    '                    <circle class="progress-circular__path" cx="0" cy="0" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" ng-style="lxProgress.getCircularProgressValue()"></circle>\n' +
    '                </g>\n' +
    '            </g>\n' +
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
angular.module("lumx.checkbox").run(['$templateCache', function(a) { a.put('checkbox.html', '<div class="checkbox checkbox--{{ lxCheckbox.lxColor }}"\n' +
    '     ng-class="{ \'checkbox--theme-light\': !lxCheckbox.lxTheme || lxCheckbox.lxTheme === \'light\',\n' +
    '                 \'checkbox--theme-dark\': lxCheckbox.lxTheme === \'dark\' }">\n' +
    '    <input id="{{ lxCheckbox.getCheckboxId() }}"\n' +
    '           type="checkbox"\n' +
    '           class="checkbox__input"\n' +
    '           name="{{ lxCheckbox.name }}"\n' +
    '           ng-model="lxCheckbox.ngModel"\n' +
    '           ng-true-value="{{ lxCheckbox.ngTrueValue }}"\n' +
    '           ng-false-value="{{ lxCheckbox.ngFalseValue }}"\n' +
    '           ng-change="lxCheckbox.triggerNgChange()"\n' +
    '           ng-disabled="lxCheckbox.ngDisabled">\n' +
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
	a.put('radio-button.html', '<div class="radio-button radio-button--{{ lxRadioButton.lxColor }}"\n' +
    '     ng-class="{ \'radio-button--theme-light\': !lxRadioButton.lxTheme || lxRadioButton.lxTheme === \'light\',\n' +
    '                 \'radio-button--theme-dark\': lxRadioButton.lxTheme === \'dark\' }">\n' +
    '    <input id="{{ lxRadioButton.getRadioButtonId() }}"\n' +
    '           type="radio"\n' +
    '           class="radio-button__input"\n' +
    '           name="{{ lxRadioButton.name }}"\n' +
    '           ng-model="lxRadioButton.ngModel"\n' +
    '           ng-value="lxRadioButton.ngValue"\n' +
    '           ng-change="lxRadioButton.triggerNgChange()"\n' +
    '           ng-disabled="lxRadioButton.ngDisabled">\n' +
    '    <label for="{{ lxRadioButton.getRadioButtonId() }}" class="radio-button__label" ng-transclude ng-if="!lxRadioButton.getRadioButtonHasChildren()"></label>\n' +
    '    <ng-transclude-replace ng-if="lxRadioButton.getRadioButtonHasChildren()"></ng-transclude-replace>\n' +
    '</div>\n' +
    '');
	a.put('radio-button-label.html', '<label for="{{ lxRadioButtonLabel.getRadioButtonId() }}" class="radio-button__label" ng-transclude></label>\n' +
    '');
	a.put('radio-button-help.html', '<span class="radio-button__help" ng-transclude></span>\n' +
    '');
	 }]);
angular.module("lumx.stepper").run(['$templateCache', function(a) { a.put('stepper.html', '<div class="lx-stepper" ng-class="lxStepper.getClasses()">\n' +
    '    <div class="lx-stepper__header" ng-if="lxStepper.layout === \'horizontal\'">\n' +
    '        <div class="lx-stepper__nav">\n' +
    '            <lx-step-nav lx-active-index="{{ lxStepper.activeIndex }}" lx-step="step" ng-repeat="step in lxStepper.steps"></lx-step-nav>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-stepper__feedback" ng-if="lxStepper.steps[lxStepper.activeIndex].feedback">\n' +
    '            <span>{{ lxStepper.steps[lxStepper.activeIndex].feedback }}</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-stepper__steps" ng-transclude></div>\n' +
    '</div>');
	a.put('step.html', '<div class="lx-step" ng-class="lxStep.getClasses()">\n' +
    '    <div class="lx-step__nav" ng-if="lxStep.parent.layout === \'vertical\'">\n' +
    '        <lx-step-nav lx-active-index="{{ lxStep.parent.activeIndex }}" lx-step="lxStep.step"></lx-step-nav>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-step__wrapper" ng-if="lxStep.parent.activeIndex === lxStep.step.index">\n' +
    '        <div class="lx-step__content">\n' +
    '            <ng-transclude></ng-transclude>\n' +
    '\n' +
    '            <div class="lx-step__progress" ng-if="lxStep.step.isLoading">\n' +
    '                <lx-progress lx-type="circular"></lx-progress>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-step__actions" ng-if="lxStep.parent.activeIndex === lxStep.step.index && lxStep.parent.controls">\n' +
    '            <div class="lx-step__action lx-step__action--continue">\n' +
    '                <lx-button ng-click="lxStep.submitStep()" ng-disabled="lxStep.isLoading">{{ lxStep.parent.labels.continue }}</lx-button>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="lx-step__action lx-step__action--cancel" ng-if="lxStep.parent.cancel">\n' +
    '                <lx-button lx-color="black" lx-type="flat" ng-click="lxStep.parent.cancel()" ng-disabled="lxStep.isLoading">{{ lxStep.parent.labels.cancel }}</lx-button>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="lx-step__action lx-step__action--back" ng-if="lxStep.parent.isLinear">\n' +
    '                <lx-button lx-color="black" lx-type="flat" ng-click="lxStep.previousStep()" ng-disabled="lxStep.isLoading || lxStep.step.index === 0">{{ lxStep.parent.labels.back }}</lx-button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
	a.put('step-nav.html', '<div class="lx-step-nav" ng-click="lxStepNav.parent.goToStep(lxStepNav.step.index)" ng-class="lxStepNav.getClasses()" lx-ripple>\n' +
    '    <div class="lx-step-nav__indicator lx-step-nav__indicator--index" ng-if="lxStepNav.step.isValid === undefined">\n' +
    '        <span>{{ lxStepNav.step.index + 1 }}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-step-nav__indicator lx-step-nav__indicator--icon" ng-if="lxStepNav.step.isValid === true">\n' +
    '        <lx-icon lx-id="check" ng-if="!lxStepNav.step.isEditable"></lx-icon>\n' +
    '        <lx-icon lx-id="pencil" ng-if="lxStepNav.step.isEditable"></lx-icon>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-step-nav__indicator lx-step-nav__indicator--error" ng-if="lxStepNav.step.isValid === false">\n' +
    '        <lx-icon lx-id="alert"></lx-icon>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="lx-step-nav__wrapper">\n' +
    '        <div class="lx-step-nav__label">\n' +
    '            <span>{{ lxStepNav.step.label }}</span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-step-nav__state">\n' +
    '            <span ng-if="(lxStepNav.step.isValid === undefined || lxStepNav.step.isValid === true) && lxStepNav.step.isOptional">{{ lxStepNav.parent.labels.optional }}</span>\n' +
    '            <span ng-if="lxStepNav.step.isValid === false">{{ lxStepNav.step.errorMessage }}</span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
	 }]);
angular.module("lumx.switch").run(['$templateCache', function(a) { a.put('switch.html', '<div class="switch switch--{{ lxSwitch.lxColor }} switch--{{ lxSwitch.lxPosition }}"\n' +
    '     ng-class="{ \'switch--theme-light\': !lxSwitch.lxTheme || lxSwitch.lxTheme === \'light\',\n' +
    '                 \'switch--theme-dark\': lxSwitch.lxTheme === \'dark\' }">\n' +
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
angular.module("lumx.fab").run(['$templateCache', function(a) { a.put('fab.html', '<div class="fab"\n' +
    '     ng-class="{ \'lx-fab--trigger-on-hover\': !lxFab.lxTriggerOnClick,\n' +
    '                 \'lx-fab--trigger-on-click\': lxFab.lxTriggerOnClick,\n' +
    '                 \'lx-fab--is-open\': lxFab.lxTriggerOnClick && lxFab.isOpen,\n' +
    '                 \'lx-fab--is-close\': lxFab.lxTriggerOnClick && !lxFab.isOpen }"\n' +
    '     ng-click="lxFab.toggleState()">\n' +
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
angular.module("lumx.data-table").run(['$templateCache', function(a) { a.put('data-table.html', '<div class="data-table-container">\n' +
    '    <table class="data-table"\n' +
    '           ng-class="{ \'data-table--bulk\': lxDataTable.bulk,\n' +
    '                       \'data-table--border\': lxDataTable.border,\n' +
    '                       \'data-table--thumbnail\': lxDataTable.thumbnail }">\n' +
    '        <thead>\n' +
    '            <tr ng-class="{ \'data-table__selectable-row\': lxDataTable.selectable,\n' +
    '                            \'data-table__selectable-row--is-selected\': lxDataTable.selectable && lxDataTable.allRowsSelected, }">\n' +
    '                <th align="center" ng-if="lxDataTable.thumbnail">\n' +
    '                    <lx-button class="data-table__checkbox"\n' +
    '                               lx-type="icon" lx-color="{{ lxDataTable.allRowsSelected ? \'accent\' : \'grey\' }}"\n' +
    '                               ng-click="lxDataTable.toggleAllSelected()"\n' +
    '                               ng-if="lxDataTable.selectable">\n' +
    '                        <lx-icon lx-id="checkbox-blank-outline" ng-if="!lxDataTable.allRowsSelected"></lx-icon>\n' +
    '                        <lx-icon lx-id="checkbox-marked" ng-if="lxDataTable.allRowsSelected"></lx-icon>\n' +
    '                    </lx-button>\n' +
    '                </th>\n' +
    '                <th align="center" ng-if="lxDataTable.selectable && !lxDataTable.thumbnail">\n' +
    '                    <lx-button class="data-table__checkbox"\n' +
    '                               lx-type="icon" lx-color="{{ lxDataTable.allRowsSelected ? \'accent\' : \'grey\' }}"\n' +
    '                               ng-click="lxDataTable.toggleAllSelected()">\n' +
    '                        <lx-icon lx-id="checkbox-blank-outline" ng-if="!lxDataTable.allRowsSelected"></lx-icon>\n' +
    '                        <lx-icon lx-id="checkbox-marked" ng-if="lxDataTable.allRowsSelected"></lx-icon>\n' +
    '                    </lx-button>\n' +
    '                </th>\n' +
    '                <th align="left"\n' +
    '                    ng-class=" { \'data-table__sortable-cell\': th.sortable,\n' +
    '                                 \'data-table__sortable-cell--asc\': th.sortable && th.sort === \'asc\',\n' +
    '                                 \'data-table__sortable-cell--desc\': th.sortable && th.sort === \'desc\' }"\n' +
    '                    ng-click="lxDataTable.sort(th)"\n' +
    '                    ng-repeat="th in lxDataTable.thead track by $index"\n' +
    '                    ng-if="!lxDataTable.thumbnail || (lxDataTable.thumbnail && $index != 0)">\n' +
    '                    <lx-icon lx-id="{{ th.icon }}" ng-if="th.icon"></lx-icon>\n' +
    '                    <span>{{ th.label }}</span>\n' +
    '                </th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '\n' +
    '        <tbody>\n' +
    '            <tr ng-class="{ \'data-table__selectable-row\': lxDataTable.selectable,\n' +
    '                            \'data-table__selectable-row--is-disabled\': lxDataTable.selectable && tr.lxDataTableDisabled,\n' +
    '                            \'data-table__selectable-row--is-selected\': lxDataTable.selectable && tr.lxDataTableSelected,\n' +
    '                            \'data-table__activable-row\': lxDataTable.activable,\n' +
    '                            \'data-table__activable-row--is-activated\': lxDataTable.activable && tr.lxDataTableActivated }"\n' +
    '                ng-repeat="tr in lxDataTable.tbody"\n' +
    '                ng-click="lxDataTable.toggleActivation(tr)">\n' +
    '                <td align="center" ng-if="lxDataTable.thumbnail">\n' +
    '                    <div class="data-table__thumbnail" ng-if="lxDataTable.thead[0].format" ng-bind-html="lxDataTable.$sce.trustAsHtml(lxDataTable.thead[0].format(tr))"></div>\n' +
    '\n' +
    '                    <lx-button class="data-table__checkbox"\n' +
    '                               lx-type="icon" lx-color="{{ tr.lxDataTableSelected ? \'accent\' : \'black\' }}"\n' +
    '                               ng-click="lxDataTable.toggleSelection(tr, undefined, $event)"\n' +
    '                               ng-if="lxDataTable.selectable && !tr.lxDataTableDisabled">\n' +
    '                        <lx-icon lx-id="checkbox-blank-outline" ng-if="!tr.lxDataTableSelected"></lx-icon>\n' +
    '                        <lx-icon lx-id="checkbox-marked" ng-if="tr.lxDataTableSelected"></lx-icon>\n' +
    '                    </lx-button>\n' +
    '                </td>\n' +
    '                <td align="center" ng-if="lxDataTable.selectable && !lxDataTable.thumbnail">\n' +
    '                    <lx-button class="data-table__checkbox"\n' +
    '                               lx-type="icon" lx-color="{{ tr.lxDataTableSelected ? \'accent\' : \'black\' }}"\n' +
    '                               ng-click="lxDataTable.toggleSelection(tr, undefined, $event)"\n' +
    '                               ng-disabled="tr.lxDataTableDisabled">\n' +
    '                        <lx-icon lx-id="checkbox-blank-outline" ng-if="!tr.lxDataTableSelected"></lx-icon>\n' +
    '                        <lx-icon lx-id="checkbox-marked" ng-if="tr.lxDataTableSelected"></lx-icon>\n' +
    '                    </lx-button>\n' +
    '                </td>\n' +
    '                <td align="left"\n' +
    '                    ng-repeat="th in lxDataTable.thead track by $index"\n' +
    '                    ng-if="!lxDataTable.thumbnail || (lxDataTable.thumbnail && $index != 0)">\n' +
    '                    <span ng-if="!th.format">{{ tr[th.name] }}</span>\n' +
    '                    <div ng-if="th.format" ng-bind-html="lxDataTable.$sce.trustAsHtml(th.format(tr))"></div>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '</div>');
	 }]);