/*
 LumX v0.2.54
 (c) 2014-2015 LumApps http://ui.lumapps.com
 License: MIT
*/
/* global angular */

angular.module('lumx.utils', [
    'lumx.utils.transclude',
    'lumx.utils.transclude-replace'
]);

angular.module('lumx', [
    'lumx.utils',
    'lumx.ripple',
    'lumx.notification',
    'lumx.dropdown',
    'lumx.text-field',
    'lumx.dialog',
    'lumx.select',
    'lumx.scrollbar',
    'lumx.thumbnail',
    'lumx.tabs',
    'lumx.tooltip',
    'lumx.file-input',
    'lumx.progress',
    'lumx.search-filter',
    'lumx.date-picker'
]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dialog', [])
    .service('LxDialogService', ['$timeout', '$interval', '$window', function($timeout, $interval, $window)
    {
        var self = this,
            dialogInterval,
            dialogFilter,
            dialogHeight,
            activeDialogId,
            scopeMap = {};

        this.registerScope = function(dialogId, dialogScope)
        {
            scopeMap[dialogId] = dialogScope;
        };

        this.open = function(dialogId)
        {
            activeDialogId = dialogId;

            dialogFilter = angular.element('<div/>', {
                class: 'dialog-filter'
            });

            dialogFilter
                .appendTo('body')
                .bind('click', function()
                {
                    self.close(dialogId);
                });

            scopeMap[dialogId].element
                .appendTo('body')
                .show();

            $timeout(function()
            {
                scopeMap[dialogId].isOpened = true;

                dialogFilter.addClass('dialog-filter--is-shown');
                scopeMap[dialogId].element.addClass('dialog--is-shown');
            }, 100);

            dialogInterval = $interval(function()
            {
                if (scopeMap[dialogId].element.outerHeight() !== dialogHeight)
                {
                    checkDialogHeight(dialogId);
                    dialogHeight = scopeMap[dialogId].element.outerHeight();
                }
            }, 500);
        };

        this.close = function(dialogId)
        {
            activeDialogId = undefined;

            $interval.cancel(dialogInterval);

            dialogFilter.removeClass('dialog-filter--is-shown');
            scopeMap[dialogId].element.removeClass('dialog--is-shown');
            scopeMap[dialogId].onclose();

            $timeout(function()
            {
                dialogFilter.remove();

                scopeMap[dialogId].element
                    .hide()
                    .removeClass('dialog--is-fixed')
                    .appendTo(scopeMap[dialogId].parent);

                scopeMap[dialogId].isOpened = false;
                dialogHeight = undefined;
            }, 600);
        };

        function checkDialogHeight(dialogId)
        {
            var dialogMargin = 60,
                dialog = scopeMap[dialogId].element,
                dialogHeader = dialog.find('.dialog__header'),
                dialogContent = dialog.find('.dialog__content'),
                dialogActions = dialog.find('.dialog__actions'),
                dialogScrollable = angular.element('<div/>', { class: 'dialog__scrollable' }),
                HeightToCheck = dialogMargin + dialogHeader.outerHeight() + dialogContent.outerHeight() + dialogActions.outerHeight();

            if (HeightToCheck >= $window.innerHeight)
            {
                dialog.addClass('dialog--is-fixed');

                if (dialog.find('.dialog__scrollable').length === 0)
                {
                    dialogScrollable.css({ top: dialogHeader.outerHeight(), bottom: dialogActions.outerHeight() });
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

        angular.element($window).bind('resize', function()
        {
            if (angular.isDefined(activeDialogId))
            {
                checkDialogHeight(activeDialogId);
            }
        });
    }])
    .controller('LxDialogController', ['$scope', 'LxDialogService', function($scope, LxDialogService)
    {
        this.init = function(element, id)
        {
            $scope.isOpened = false;
            $scope.element = element;
            $scope.parent = element.parent();

            LxDialogService.registerScope(id, $scope);
        };
    }])
    .directive('lxDialog', function()
    {
        return {
            restrict: 'E',
            controller: 'LxDialogController',
            scope: {
                onclose: '&'
            },
            template: '<div><div ng-if="isOpened" ng-transclude="2"></div></div>',
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
            }
        };
    })
    .directive('lxDialogClose', ['LxDialogService', function(LxDialogService)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.bind('click', function()
                {
                    LxDialogService.close(element.parents('.dialog').attr('id'));
                });
            }
        };
    }]);

/* global angular */
/* global window */
'use strict'; // jshint ignore:line


angular.module('lumx.notification', [])
    .service('LxNotificationService', ['$injector', '$rootScope', '$timeout' , function($injector, $rootScope, $timeout)
    {
        //
        // PRIVATE MEMBERS
        //
        var notificationList = [],
            dialogFilter,
            dialog;

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
            for (var idx in notificationList)
            {
                var intIdx = parseInt(idx);

                if (angular.isUndefined(notificationList[idx].height))
                {
                    notificationList[idx].height = getElementHeight(notificationList[idx].elem[0]);
                }

                if (angular.isDefined(notificationList[intIdx + 1]))
                {
                    if (angular.isUndefined(notificationList[intIdx + 1].height))
                    {
                        notificationList[intIdx + 1].height = getElementHeight(notificationList[intIdx + 1].elem[0]);
                    }

                    notificationList[idx].margin += 24 + notificationList[intIdx + 1].height;
                }

                notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
            }
        }

        // private
        function deleteNotification(notification)
        {
            var notifIndex = notificationList.indexOf(notification);

            for (var idx = 0; idx < notificationList.length && idx < notifIndex; idx++)
            {
                if (angular.isDefined(notificationList[idx + 1]))
                {
                    notificationList[idx].margin -= 24 + notificationList[idx + 1].height;
                    notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
                }
            }

            notification.elem.remove();
            notificationList.splice(notifIndex, 1);
        }

        function notify(text, icon, sticky, color)
        {
            var notificationTimeout;
            var notification = angular.element('<div/>', {
                class: 'notification'
            });

            var notificationText = angular.element('<span/>', {
                class: 'notification__content',
                text: text
            });

            if (angular.isDefined(icon))
            {
                var notificationIcon = angular.element('<i/>', {
                    class: 'notification__icon mdi mdi--' + icon
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
            notify(text, 'error', sticky, 'red');
        }

        function warning(text, sticky)
        {
            notify(text, 'warning', sticky, 'orange');
        }

        function info(text, sticky)
        {
            notify(text, 'info-outline', sticky, 'blue');
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
        function buildDialogActions(buttons, callback)
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

            return dialogActions;
        }

        function confirm(title, text, buttons, callback)
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
            var dialogActions = buildDialogActions(buttons, callback);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body')
                .show();

            // Starting animaton
            $timeout(function()
            {
                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }

        function alert(title, text, button, callback)
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
            var dialogActions = buildDialogActions({ ok: button }, callback);

            // DOM link
            dialogFilter.appendTo('body');

            dialog
                .append(dialogHeader)
                .append(dialogContent)
                .append(dialogActions)
                .appendTo('body')
                .show();

            // Starting animaton
            $timeout(function()
            {
                dialogFilter.addClass('dialog-filter--is-shown');
                dialog.addClass('dialog--is-shown');
            }, 100);
        }

        // private
        function closeDialog()
        {
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

/* global angular */
/* global document */
'use strict'; // jshint ignore:line


angular.module('lumx.progress', [])
    .service('LxProgressService', ['$timeout', '$interval', function($timeout, $interval)
    {
        var progressCircularIsShown = false,
            progressCircular,
            progressCircularSvg,
            progressCircularPath,
            progressLinearIsShown = false,
            progressLinear,
            progressLinearBackground,
            progressLinearFirstBar,
            progressLinearSecondBar;

        function init()
        {
            // Circular
            progressCircular = document.createElement('div');
            progressCircular.setAttribute('class', 'progress-circular');

            progressCircularSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            progressCircularSvg.setAttribute('class', 'progress-circular__svg');

            progressCircularPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressCircularPath.setAttribute('class', 'progress-circular__path');
            progressCircularPath.setAttribute('cx', '50');
            progressCircularPath.setAttribute('cy', '50');
            progressCircularPath.setAttribute('r', '20');
            progressCircularPath.setAttribute('fill', 'none');
            progressCircularPath.setAttribute('stroke-miterlimit', '10');

            progressCircularSvg.appendChild(progressCircularPath);
            progressCircular.appendChild(progressCircularSvg);

            // Linear
            progressLinear = angular.element('<div/>', { 'class': 'progress-linear' });
            progressLinearBackground = angular.element('<div/>', { 'class': 'progress-linear__background' });
            progressLinearFirstBar = angular.element('<div/>', { 'class': 'progress-linear__bar progress-linear__bar--first' });
            progressLinearSecondBar = angular.element('<div/>', { 'class': 'progress-linear__bar progress-linear__bar--second' });

            progressLinear
                .append(progressLinearBackground)
                .append(progressLinearFirstBar)
                .append(progressLinearSecondBar);
        }

        function showCircular(color, container)
        {
            if (!progressCircularIsShown)
            {
                showCircularProgress(color, container);
            }
        }

        function hideCircular()
        {
            if (progressCircularIsShown)
            {
                hideCircularProgress();
            }
        }

        function showCircularProgress(color, container)
        {
            progressCircularIsShown = true;

            progressCircularPath.setAttribute('stroke', color);

            if (angular.isDefined(container))
            {
                document.querySelector(container).appendChild(progressCircular);
            }
            else
            {
                document.getElementsByTagName('body')[0].appendChild(progressCircular);
            }

            $timeout(function()
            {
                progressCircular.setAttribute('class', 'progress-circular progress-circular--is-shown');
            });
        }

        function hideCircularProgress()
        {
            progressCircular.setAttribute('class', 'progress-circular');

            $timeout(function()
            {
                progressCircular.remove();

                progressCircularIsShown = false;
            }, 400);
        }

        function showLinear(color, container)
        {
            if (!progressLinearIsShown)
            {
                showLinearProgress(color, container);
            }
        }

        function hideLinear()
        {
            if (progressLinearIsShown)
            {
                hideLinearProgress();
            }
        }

        function showLinearProgress(color, container)
        {
            progressLinearIsShown = true;

            progressLinearBackground.css({ backgroundColor: color });
            progressLinearFirstBar.css({ backgroundColor: color });
            progressLinearSecondBar.css({ backgroundColor: color });

            if (angular.isDefined(container))
            {
                progressLinear.appendTo(container);
            }
            else
            {
                progressLinear.appendTo('body');
            }

            $timeout(function()
            {
                progressLinear.addClass('progress-linear--is-shown');
            });
        }

        function hideLinearProgress()
        {
            progressLinear.removeClass('progress-linear--is-shown');

            $timeout(function()
            {
                progressLinear.remove();

                progressLinearIsShown = false;
            }, 400);
        }

        init();

        return {
            circular: {
                show: showCircular,
                hide: hideCircular
            },
            linear: {
                show: showLinear,
                hide: hideLinear
            }
        };
    }]);

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

        this.hideTooltip = function()
        {
            tooltip.removeClass('tooltip--is-active');

            $timeout(function()
            {
                tooltip.remove();
            }, 200);
        };

        $scope.$on('$destroy', function(scope)
        {
            tooltip.remove();
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
                        ctrl.init(element, attrs);
                    }
                });
            }
        };
    });

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
/* global moment */
'use strict'; // jshint ignore:line


angular.module('lumx.date-picker', [])
    .controller('lxDatePickerController', ['$scope', '$timeout', '$window', function($scope, $timeout, $window)
    {
        var locale = $window.navigator.language !== null ? $window.navigator.language : $window.navigator.browserLanguage,
            $element,
            $dateFilter,
            $datePicker;

        this.init = function(element)
        {
            $scope.selectedDate = {
                date: undefined,
                formatted: undefined
            };

            $element = element;
            $datePicker = element.find('.lx-date-picker');

            $scope.currentDate = moment(new Date());
            $scope.localeData = moment().locale(locale).localeData();
            $scope.now = moment().locale(locale);
            $scope.month = $scope.month || moment().locale(locale).startOf('day');
            $scope.days = [];
            $scope.daysOfWeek = [$scope.localeData._weekdaysMin[1], $scope.localeData._weekdaysMin[2], $scope.localeData._weekdaysMin[3], $scope.localeData._weekdaysMin[4], $scope.localeData._weekdaysMin[5], $scope.localeData._weekdaysMin[6], $scope.localeData._weekdaysMin[0]];

            generateCalendar();
        };

        this.updateModel = function(val)
        {
            if (angular.isDefined(val)) {
                $scope.selectedDate = {
                    date: moment(val).locale(locale),
                    formatted: moment(val).locale(locale).format('LL')
                };
            }
            else
            {
                $scope.selectedDate = {
                    date: undefined,
                    formatted: undefined
                };
            }
        };

        $scope.previousMonth = function()
        {
            $scope.month = $scope.month.subtract(1, 'month');
            generateCalendar();
        };

        $scope.nextMonth = function()
        {
            $scope.month = $scope.month.add(1, 'month');
            generateCalendar();
        };

        $scope.select = function(day)
        {
            $scope.selectedDate = {
                date: moment(day).locale(locale),
                formatted: moment(day).locale(locale).format('LL')
            };

            $scope.model = day.toDate();

            generateCalendar();
        };

        $scope.openPicker = function()
        {
            $dateFilter = angular.element('<div/>', {
                class: 'lx-date-filter'
            });

            $dateFilter
                .appendTo('body')
                .bind('click', function()
                {
                    $scope.closePicker();
                });

            $datePicker
                .appendTo('body')
                .show();

            $timeout(function()
            {
                $dateFilter.addClass('lx-date-filter--is-shown');
                $datePicker.addClass('lx-date-picker--is-shown');
            }, 100);
        };

        $scope.closePicker = function()
        {
            $dateFilter.removeClass('lx-date-filter--is-shown');
            $datePicker.removeClass('lx-date-picker--is-shown');

            $timeout(function()
            {
                $dateFilter.remove();

                $datePicker
                    .hide()
                    .appendTo($element);
            }, 600);
        };

        function generateCalendar()
        {
            var previousDay = moment($scope.month).locale(locale).date(0),
                firstDayOfMonth = moment($scope.month).locale(locale).date(1),
                days = [],
                lastDayOfMonth = moment(firstDayOfMonth).locale(locale).endOf('month'),
                maxDays = lastDayOfMonth.date();

            $scope.emptyFirstDays = [];

            for (var i = firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1; i > 0; i--)
            {
                $scope.emptyFirstDays.push({});
            }

            for (var j = 0; j < maxDays; j++)
            {
                var date = moment(previousDay.add(1, 'days')).locale(locale);
                date.selected = date.isSame($scope.selectedDate.date, 'day') && angular.isDefined($scope.selectedDate.date);
                date.today = date.isSame($scope.now, 'day');
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
                label: '@'
            },
            templateUrl: 'lumx.date_picker.html',
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);
                scope.$watch('model', function (newVal)
                {
                    ctrl.updateModel(newVal);
                });
            }
        };
    });
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.dropdown', [])
    .service('LxDropdownService', ['$document', function($document)
    {
        var openScope = null;

        function open(dropdownScope)
        {
            if (!openScope)
            {
                $document.bind('click', closeDropdown);
            }

            if (openScope && openScope !== dropdownScope)
            {
                openScope.isOpened = false;
            }

            openScope = dropdownScope;
        }

        function close(dropdownScope)
        {
            if (openScope === dropdownScope)
            {
                openScope = null;
                $document.unbind('click', closeDropdown);
            }
        }

        function closeDropdown()
        {
            if (!openScope) { return; }

            openScope.$apply(function()
            {
                openScope.isOpened = false;
            });
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

        $scope.isOpened = false;
        $scope.isDropped = false;

        this.registerDropdown = function(element)
        {
            dropdown = element;

            $scope.position = angular.isDefined($scope.position) ? $scope.position : 'left';
        };

        this.registerDropdownMenu = function(element)
        {
            dropdownMenu = element;
        };

        this.toggle = function()
        {
            $scope.isOpened = !$scope.isOpened;
        };

        function linkList()
        {
            $scope.isDropped = false;

            closeDropdownMenu();
        }

        function unlinkList()
        {
            $scope.isDropped = true;

            dropdownMenu.appendTo('body');

            $timeout(function()
            {
                setDropdownMenuCss();
                openDropdownMenu();
            });
        }

        function setDropdownMenuCss()
        {
            var top,
                bottom,
                left = 'auto',
                right = 'auto';

            if (angular.isDefined($scope.fromTop))
            {
                top = dropdown.offset().top;
                bottom = $window.innerHeight - dropdown.offset().top;
            }
            else
            {
                top = dropdown.offset().top + dropdown.outerHeight();
                bottom = $window.innerHeight - dropdown.offset().top - dropdown.outerHeight();
            }

            if ($scope.position === 'left')
            {
                left = dropdown.offset().left;
            }
            else if ($scope.position === 'right')
            {
                right = $window.innerWidth - (dropdown.offset().left + dropdown.outerWidth());
            }
            else if ($scope.position === 'center')
            {
                left = (dropdown.offset().left - (dropdownMenu.outerWidth() / 2)) + (dropdown.outerWidth() / 2);
            }

            if ($scope.direction === 'up')
            {
                dropdownMenu.css(
                    {
                        left: left,
                        right: right,
                        bottom: bottom
                    });
            }
            else
            {
                dropdownMenu.css(
                {
                    left: left,
                    right: right,
                    top: top
                });
            }

            if (angular.isDefined($scope.width))
            {
                if ($scope.width === 'full')
                {
                    dropdownMenu.css('width', dropdown.outerWidth());
                }
                else
                {
                    dropdownMenu.css('width', dropdown.outerWidth() + parseInt($scope.width));
                }
            }
        }

        function openDropdownMenu()
        {
            var dropdownMenuWidth = dropdownMenu.outerWidth(),
                dropdownMenuHeight = dropdownMenu.outerHeight();

            dropdownMenu.css({
                width: 0,
                height: 0,
                opacity: 1
            });

            dropdownMenu.find('.dropdown-dropdownMenu__content').css({
                width: dropdownMenuWidth,
                height: dropdownMenuHeight
            });

            dropdownMenu.velocity({
                width: dropdownMenuWidth
            }, {
                duration: 200,
                easing: 'easeOutQuint',
                queue: false
            });

            dropdownMenu.velocity({
                height: dropdownMenuHeight
            }, {
                duration: 500,
                easing: 'easeOutQuint',
                queue: false,
                complete: function()
                {
                    if (angular.isDefined($scope.width))
                    {
                        dropdownMenu.css({ height: 'auto' });
                    }
                    else
                    {
                        dropdownMenu.css({ width: 'auto', height: 'auto' });
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
                }
            });
        }

        $scope.$watch('isOpened', function(isOpened)
        {
            if (isOpened)
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

        angular.element($window).bind('resize, scroll', function()
        {
            if ($scope.isDropped)
            {
                setDropdownMenuCss();
            }
        });

        $scope.$on('$locationChangeSuccess', function()
        {
            $scope.isOpened = false;
        });

        $scope.$on('$destroy', function()
        {
            dropdownMenu.remove();
            LxDropdownService.close($scope);
        });
    }])
    .directive('lxDropdown', function()
    {
        return {
            restrict: 'E',
            controller: 'LxDropdownController',
            templateUrl: 'lumx.dropdown.html',
            transclude: true,
            replace: true,
            scope: {
                position: '@',
                width: '@',
                fromTop: '@',
                direction: '@'
            },
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.registerDropdown(element);
            }
        };
    })
    .directive('lxDropdownToggle', function()
    {
        return {
            restrict: 'A',
            require: '^lxDropdown',
            templateUrl: 'lumx.dropdown_toggle.html',
            replace: true,
            transclude: true,
            link: function(scope, element, attrs, ctrl)
            {
                element.bind('click', function(event)
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
    .directive('lxDropdownMenu', function()
    {
        return {
            restrict: 'E',
            require: '^lxDropdown',
            templateUrl: 'lumx.dropdown_menu.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.registerDropdownMenu(element);
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
    .directive('lxDropdownFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'A',
            link: function(scope, element)
            {
                element.bind('click', function(event)
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
            templateUrl: 'lumx.file_input.html',
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
                    if (val)
                    {
                        $fileName.text(val.replace(/C:\\fakepath\\/i, ''));

                        element.addClass('input-file--is-active');
                    }
                }

                scope.$watch('value', function(value)
                {
                    setFileName(value);
                });
            }
        };
    }]);
/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.search-filter', [])
    .directive('lxSearchFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'lumx.search_filter.html',
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
    .controller('LxSelectController', ['$scope', '$compile', '$filter', '$interpolate', '$sce', '$timeout',
                                       function($scope, $compile, $filter, $interpolate, $sce, $timeout)
    {
        var newModel = false,
            newSelection = true;

        $scope.data = {
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
            $scope.data.selectedTransclude = transclude;
        };

        this.getScope = function()
        {
            return $scope;
        };

        // Selection management
        function select(choice)
        {
            newSelection = false;
            if ($scope.multiple)
            {
                if (arrayObjectIndexOf($scope.data.selected, choice) === -1)
                {
                    $scope.data.selected.push(choice);
                }
            }
            else
            {
                $scope.data.selected = [choice];
            }
        }

        function unselect(element, event)
        {
            newSelection = false;
            if (!$scope.allowClear && !$scope.multiple)
            {
                return;
            }

            if (angular.isDefined(event) && !$scope.multiple)
            {
                event.stopPropagation();
            }

            var index = arrayObjectIndexOf($scope.data.selected, element);
            if (index !== -1)
            {
                $scope.data.selected.splice(index, 1);
            }
        }

        function toggle(choice, event)
        {
            if (angular.isDefined(event) && $scope.multiple)
            {
                event.stopPropagation();
            }

            if ($scope.multiple && isSelected(choice))
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
            return angular.isDefined($scope.data.selected) && arrayObjectIndexOf($scope.data.selected, choice) !== -1;
        }

        function hasNoResults()
        {
            return angular.isUndefined($scope.choices()) || $filter('filter')($scope.choices(), $scope.data.filter).length === 0;
        }

        function filterNeeded()
        {
            return angular.isDefined($scope.minLength) && angular.isDefined($scope.data.filter) && $scope.data.filter.length < $scope.minLength;
        }

        function isHelperVisible()
        {
            return $scope.loading !== 'true' && (filterNeeded() || (hasNoResults() && !filterNeeded()));
        }

        function isChoicesVisible()
        {
            return $scope.loading !== 'true' && !hasNoResults() && !filterNeeded();
        }

        /**
         * Return the array of selected elements. Always return an array (ie. returns an empty array in case
         * selected list is undefined in the scope).
         */
        function getSelectedElements()
        {
            return angular.isDefined($scope.data.selected) ? $scope.data.selected : [];
        }

        function getSelectedTemplate()
        {
            return $sce.trustAsHtml($scope.data.selectedTemplate);
        }

        function convertValue(newValue, conversion, callback)
        {
            var convertedData = $scope.multiple ? [] : undefined;
            var loading = [];

            if (!newValue || ($scope.multiple && newValue.length === 0))
            {
                callback(convertedData);
                return;
            }

            $scope.data.loading = true;
            if ($scope.multiple)
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
                                    $scope.data.loading = false;
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
                    $scope.data.loading = true;
                    conversion(newValue, function(data)
                    {
                        $scope.data.loading = false;
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
        $scope.$watch('ngModel.$modelValue', function(newValue)
        {
            if (newModel)
            {
                newModel = false;
                return;
            }

            convertValue(newValue,
                         $scope.modelToSelection,
                         function(newConvertedValue)
            {
                newSelection = true;

                var value = newConvertedValue !== undefined ? angular.copy(newConvertedValue) : [];
                if (!$scope.multiple)
                {
                    value = newConvertedValue !== undefined ? [angular.copy(newConvertedValue)] : [];
                }

                $scope.data.selected = value;
            });
        });

        $scope.$watch('data.selected', function(newValue)
        {
            if (angular.isDefined(newValue) && angular.isDefined($scope.data.selectedTransclude))
            {
                var newScope = $scope.$new();
                $scope.data.selectedTemplate = '';

                angular.forEach(newValue, function(selectedElement)
                {
                    newScope.$selected = selectedElement;

                    $scope.data.selectedTransclude(newScope, function(clone)
                    {
                        var div = angular.element('<div/>'),
                        element = $compile(clone)(newScope),
                        content = $interpolate(clone.html())(newScope);

                        element.html(content);

                        div.append(element);

                        if ($scope.multiple)
                        {
                            div.find('span').addClass('lx-select__tag');
                        }

                        $scope.data.selectedTemplate += div.html();
                    });
                });
            }

            if (newSelection)
            {
                newSelection = false;
                return;
            }

            var data = newValue;
            if(!$scope.multiple)
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
                         $scope.selectionToModel,
                         function(newConvertedValue)
            {
                newModel = true;

                if ($scope.change)
                {
                    $scope.change({ newValue: angular.copy(newConvertedValue), oldValue: angular.copy($scope.ngModel.$modelValue) });
                }
                $scope.ngModel.$setViewValue(angular.copy(newConvertedValue));
            });
        }, true);

        $scope.$watch('data.filter', function(newValue, oldValue)
        {
            if(angular.isUndefined($scope.minLength) || (newValue && $scope.minLength <= newValue.length))
            {
                if ($scope.filter)
                {
                    $scope.filter(newValue, oldValue);
                }
            }
        });

        // Public API
        $scope.select = select;
        $scope.unselect = unselect;
        $scope.toggle = toggle;
        $scope.isChoicesVisible = isChoicesVisible;
        $scope.isHelperVisible = isHelperVisible;
        $scope.isSelected = isSelected;
        $scope.filterNeeded = filterNeeded;
        $scope.getSelectedElements = getSelectedElements;
        $scope.getSelectedTemplate = getSelectedTemplate;
        $scope.hasNoResults = hasNoResults;
    }])
    .directive('lxSelect', function()
    {
        return {
            restrict: 'AE',
            controller: 'LxSelectController',
            require: '?ngModel',
            scope: true,
            templateUrl: 'lumx.select.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ngModel)
            {
                scope.multiple = angular.isDefined(attrs.multiple);
                scope.floatingLabel = angular.isDefined(attrs.floatingLabel);
                scope.tree = angular.isDefined(attrs.tree);
                scope.ngModel = ngModel;

                // Default values
                scope.placeholder = '';
                scope.loading = '';
                scope.minLength = 0;
                scope.allowClear = '';
                scope.choices = function() { return []; };
                scope.change = undefined;
                scope.filter = undefined;
                scope.selectionToModel = undefined;
                scope.modelToSelection = undefined;

                attrs.$observe('placeholder', function(newValue)
                {
                    scope.placeholder = newValue;
                });

                attrs.$observe('loading', function(newValue)
                {
                    scope.loading = newValue;
                });

                attrs.$observe('minLength', function(newValue)
                {
                    scope.minLength = newValue;
                });

                attrs.$observe('allowClear', function(newValue)
                {
                    scope.allowClear = newValue;
                });

                attrs.$observe('choices', function(newValue)
                {
                    scope.choices = function()
                    {
                        return scope.$eval(newValue);
                    };
                });

                attrs.$observe('change', function(newValue)
                {
                    scope.change = function(newData, oldData)
                    {
                        return scope.$eval(newValue, { newValue: newData, oldValue: oldData });
                    };
                });

                attrs.$observe('filter', function(newValue)
                {
                    scope.filter = function(newFilter, oldFilter)
                    {
                        return scope.$eval(newValue, { newValue: newFilter, oldValue: oldFilter });
                    };
                });

                var selectionToModel = function(newValue)
                {
                    scope.selectionToModel = function(selection, callback)
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
                    scope.modelToSelection = function(model, callback)
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
            templateUrl: 'lumx.select_selected.html',
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
            templateUrl: 'lumx.select_choices.html',
            transclude: true
        };
    });

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.tabs', [])
    .controller('LxTabsController', ['$scope', '$sce', '$timeout', '$window', function($scope, $sce, $timeout, $window)
    {
        var tabs = [],
            links,
            indicator;

        $scope.activeTab = angular.isUndefined($scope.activeTab) ? 0 : $scope.activeTab;

        this.init = function(element)
        {
            links = element.find('.tabs__links');
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
                    --tabs[tabIdx].index;
                }

                tabs.splice(idx, 1);

                if (idx === $scope.activeTab)
                {
                    $scope.activeTab = 0;
                    $timeout(function()
                    {
                        setIndicatorPosition(idx);
                    });
                }
                else if(idx < $scope.activeTab)
                {
                    var old = $scope.activeTab;
                    $scope.activeTab = old - 1;

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

        function getTabs()
        {
            return tabs;
        }

        function setActiveTab(index)
        {
            $timeout(function()
            {
                $scope.activeTab = index;
            });
        }

        function setLinksColor(newTab)
        {
            links.find('.tabs-link').removeClass('tc-' + $scope.indicator);
            links.find('.tabs-link').eq(newTab).addClass('tc-' + $scope.indicator);
        }

        function setIndicatorPosition(oldTab)
        {
            var direction;

            if ($scope.activeTab > oldTab)
            {
                direction = 'right';
            }
            else
            {
                direction = 'left';
            }

            var tabsWidth = links.outerWidth(),
                activeTab = links.find('.tabs-link').eq($scope.activeTab),
                activeTabWidth = activeTab.outerWidth(),
                indicatorLeft = activeTab.position().left,
                indicatorRight = tabsWidth - (indicatorLeft + activeTabWidth);

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

        $scope.$watch('activeTab', function(newIndex, oldIndex)
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

        angular.element($window).bind('resize', function()
        {
            setIndicatorPosition();
        });

        // Public API
        $scope.getTabs = getTabs;
        $scope.setActiveTab = setActiveTab;
    }])
    .directive('lxTabs', function()
    {
        return {
            restrict: 'E',
            controller: 'LxTabsController',
            templateUrl: 'lumx.tabs.html',
            transclude: true,
            replace: true,
            scope: {
                activeTab: '=?',
                linksTc: '@',
                linksBgc: '@',
                indicator: '@',
                noDivider: '@',
                zDepth: '@',
                layout: '@'
            },
            link: function(scope, element, attrs, ctrl)
            {
                ctrl.init(element);

                if (angular.isUndefined(scope.linksTc))
                {
                    scope.linksTc = 'dark';
                }

                if (angular.isUndefined(scope.linksBgc))
                {
                    scope.linksBgc = 'white';
                }

                if (angular.isUndefined(scope.indicator))
                {
                    scope.indicator = 'blue-500';
                }

                if (angular.isUndefined(scope.zDepth))
                {
                    scope.zDepth = '0';
                }

                if (angular.isUndefined(scope.layout))
                {
                    scope.layout = 'full';
                }
            }
        };
    })
    .directive('lxTab', function()
    {
        return {
            require: '^lxTabs',
            restrict: 'E',
            scope: {
                heading: '@',
                icon: '@'
            },
            templateUrl: 'lumx.tab.html',
            transclude: true,
            replace: true,
            link: function(scope, element, attrs, ctrl)
            {
                scope.data = ctrl.getScope();
                scope.index = ctrl.addTab(scope);

                scope.$on('$destroy', function(scope)
                {
                    ctrl.removeTab(scope.currentScope);
                });
            }
        };
    })
    .directive('lxTabLink', function()
    {
        return {
            require: '^lxTabs',
            restrict: 'A',
            link: function(scope, element)
            {
                if (scope.activeTab === element.parent().index())
                {
                    element.addClass('tc-' + scope.indicator);
                }

                element
                    .on('mouseenter', function()
                    {
                        if (scope.activeTab !== element.parent().index())
                        {
                            element.addClass('tc-' + scope.indicator);
                        }
                    })
                    .on('mouseleave', function()
                    {
                        if (scope.activeTab !== element.parent().index())
                        {
                            element.removeClass('tc-' + scope.indicator);
                        }
                    });
            }
        };
    });

/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.text-field', [])
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
            templateUrl: 'lumx.text_field.html',
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

                transclude(function()
                {
                    $field = element.find('textarea');

                    if ($field[0])
                    {
                        $field.on('cut paste drop keydown', function()
                        {
                            $timeout(function()
                            {
                                $field
                                    .removeAttr('style')
                                    .css({ height: $field[0].scrollHeight + 'px' });
                            });
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
'use strict'; // jshint ignore:line

var sidebar = angular.module('Sidebar', []).service('SidebarService', function()
{
    var sidebarIsShown = false;

    function toggleSidebar()
    {
        sidebarIsShown = !sidebarIsShown;
    }

    return {
        isSidebarShown: function()
        {
            return sidebarIsShown;
        },
        toggleSidebar: toggleSidebar
    };
});

/*global angular*/
angular.module('hljs', [])

.provider('hljsService', function () {
  var _hljsOptions = {};

  return {
    setOptions: function (options) {
      angular.extend(_hljsOptions, options);
    },
    getOptions: function () {
      return angular.copy(_hljsOptions);
    },
    $get: ['$window', function ($window) {
      ($window.hljs.configure || angular.noop)(_hljsOptions);
      return $window.hljs;
    }]
  };
})

.factory('hljsCache', [
         '$cacheFactory',
function ($cacheFactory) {
  return $cacheFactory('hljsCache');
}])

.controller('HljsCtrl', [
                  'hljsCache', 'hljsService',
function HljsCtrl (hljsCache,   hljsService) {
  var ctrl = this;

  var _elm = null,
      _lang = null,
      _code = null,
      _hlCb = null;

  ctrl.init = function (codeElm) {
    _elm = codeElm;
  };

  ctrl.setLanguage = function (lang) {
    _lang = lang;

    if (_code) {
      ctrl.highlight(_code);
    }
  };

  ctrl.highlightCallback = function (cb) {
    _hlCb = cb;
  };

  ctrl.highlight = function (code) {
    if (!_elm) {
      return;
    }

    var res, cacheKey;

    _code = code;

    if (_lang) {
      // language specified
      cacheKey = ctrl._cacheKey(_lang, _code);
      res = hljsCache.get(cacheKey);

      if (!res) {
        res = hljsService.highlight(_lang, hljsService.fixMarkup(_code), true);
        hljsCache.put(cacheKey, res);
      }
    }
    else {
      // language auto-detect
      cacheKey = ctrl._cacheKey(_code);
      res = hljsCache.get(cacheKey);

      if (!res) {
        res = hljsService.highlightAuto(hljsService.fixMarkup(_code));
        hljsCache.put(cacheKey, res);
      }
    }

    _elm.html(res.value);
    // language as class on the <code> tag
    _elm.addClass(res.language);

    if (_hlCb !== null && angular.isFunction(_hlCb)) {
      _hlCb();
    }
  };

  ctrl.clear = function () {
    if (!_elm) {
      return;
    }
    _code = null;
    _elm.text('');
  };

  ctrl.release = function () {
    _elm = null;
  };

  ctrl._cacheKey = function () {
    var args = Array.prototype.slice.call(arguments),
        glue = "!angular-highlightjs!";
    return args.join(glue);
  };
}])

.directive('hljs', ['$compile', '$parse', function ($compile, $parse) {
  return {
    restrict: 'EA',
    controller: 'HljsCtrl',
    compile: function(tElm, tAttrs, transclude) {
      // get static code
      // strip the starting "new line" character
      var staticHTML = tElm[0].innerHTML.replace(/^(\r\n|\r|\n)/m, ''),
          staticText = tElm[0].textContent.replace(/^(\r\n|\r|\n)/m, '');

      // put template
      tElm.html('<pre><code class="hljs"></code></pre>');

      return function postLink(scope, iElm, iAttrs, ctrl) {
        var compileCheck, escapeCheck;

        if (angular.isDefined(iAttrs.compile)) {
          compileCheck = $parse(iAttrs.compile);
        }

        if (angular.isDefined(iAttrs.escape)) {
          escapeCheck = $parse(iAttrs.escape);
        } else if (angular.isDefined(iAttrs.noEscape)) {
          escapeCheck = $parse('false');
        }

        ctrl.init(iElm.find('code'));

        if (iAttrs.onhighlight) {
          ctrl.highlightCallback(function () {
            scope.$eval(iAttrs.onhighlight);
          });
        }

        if ((staticHTML || staticText) && 
            angular.isUndefined(iAttrs.source) && angular.isUndefined(iAttrs.include)) {

          var code;

          // Auto-escape check
          // default to "true"
          if (escapeCheck && !escapeCheck(scope)) {
            code = staticText;
          }
          else {
            code = staticHTML;
          }

          ctrl.highlight(code);

          // Check if the highlight result needs to be compiled
          if (compileCheck && compileCheck(scope)) {
            // compile the new DOM and link it to the current scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(iElm.find('code').contents())(scope);
          }
        }

        scope.$on('$destroy', function () {
          ctrl.release();
        });
      };
    }
  };
}])

.directive('language', [function () {
  return {
    require: 'hljs',
    restrict: 'A',
    link: function (scope, iElm, iAttrs, ctrl) {
      iAttrs.$observe('language', function (lang) {
        if (angular.isDefined(lang)) {
          ctrl.setLanguage(lang);
        }
      });
    }
  };
}])

.directive('source', ['$compile', '$parse', function ($compile, $parse) {
  return {
    require: 'hljs',
    restrict: 'A',
    link: function(scope, iElm, iAttrs, ctrl) {
      var compileCheck;

      if (angular.isDefined(iAttrs.compile)) {
        compileCheck = $parse(iAttrs.compile);
      }

      scope.$watch(iAttrs.source, function (newCode, oldCode) {
        if (newCode) {
          ctrl.highlight(newCode);

          // Check if the highlight result needs to be compiled
          if (compileCheck && compileCheck(scope)) {
            // compile the new DOM and link it to the current scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(iElm.find('code').contents())(scope);
          }
        }
        else {
          ctrl.clear();
        }
      });
    }
  };
}])

.directive('include', [
         '$http', '$templateCache', '$q', '$compile', '$parse',
function ($http,   $templateCache,   $q,   $compile,   $parse) {
  return {
    require: 'hljs',
    restrict: 'A',
    compile: function(tElm, tAttrs, transclude) {
      var srcExpr = tAttrs.include;

      return function postLink(scope, iElm, iAttrs, ctrl) {
        var changeCounter = 0, compileCheck;

        if (angular.isDefined(iAttrs.compile)) {
          compileCheck = $parse(iAttrs.compile);
        }

        scope.$watch(srcExpr, function (src) {
          var thisChangeId = ++changeCounter;

          if (src && angular.isString(src)) {
            var templateCachePromise, dfd;

            templateCachePromise = $templateCache.get(src);
            if (!templateCachePromise) {
              dfd = $q.defer();
              $http.get(src, {
                cache: $templateCache,
                transformResponse: function(data, headersGetter) {
                  // Return the raw string, so $http doesn't parse it
                  // if it's json.
                  return data;
                }
              }).success(function (code) {
                if (thisChangeId !== changeCounter) {
                  return;
                }
                dfd.resolve(code);
              }).error(function() {
                if (thisChangeId === changeCounter) {
                  ctrl.clear();
                }
                dfd.resolve();
              });
              templateCachePromise = dfd.promise;
            }

            $q.when(templateCachePromise)
            .then(function (code) {
              if (!code) {
                return;
              }

              // $templateCache from $http
              if (angular.isArray(code)) {
                // 1.1.5
                code = code[1];
              }
              else if (angular.isObject(code)) {
                // 1.0.7
                code = code.data;
              }

              //code = code.replace(/^(\r\n|\r|\n)/m, '');
              ctrl.highlight(code);

              // Check if the highlight result needs to be compiled
              if (compileCheck && compileCheck(scope)) {
                // compile the new DOM and link it to the current scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(iElm.find('code').contents())(scope);
              }
            });
          }
          else {
            ctrl.clear();
          }
        });
      };
    }
  };
}]);

angular.module("lumx.dropdown").run(['$templateCache', function(a) { a.put('lumx.dropdown_toggle.html', '<div ng-transclude="1"></div>\n' +
    '');
	a.put('lumx.dropdown_menu.html', '<div class="dropdown-menu dropdown-menu--{{ position }}" ng-class="{ \'dropdown__menu--is-dropped\': isDropped }">\n' +
    '    <div class="dropdown-menu__content" ng-transclude="2" ng-if="isDropped"></div>\n' +
    '</div>\n' +
    '');
	a.put('lumx.dropdown.html', '<div class="dropdown" ng-transclude="parent"></div>\n' +
    '');
	 }]);
angular.module("lumx.file-input").run(['$templateCache', function(a) { a.put('lumx.file_input.html', '<div class="input-file">\n' +
    '    <span class="input-file__label">{{ label }}</span>\n' +
    '    <span class="input-file__filename"></span>\n' +
    '    <input type="file">\n' +
    '</div>');
	 }]);
angular.module("lumx.text-field").run(['$templateCache', function(a) { a.put('lumx.text_field.html', '<div class="text-field text-field--{{ theme }}-theme"\n' +
    '     ng-class="{ \'text-field--is-valid\': valid(),\n' +
    '                 \'text-field--has-error\': error(),\n' +
    '                 \'text-field--is-disabled\': disabled(),\n' +
    '                 \'text-field--fixed-label\': fixedLabel(),\n' +
    '                 \'text-field--is-active\': data.model || data.focused,\n' +
    '                 \'text-field--is-focused\': data.focused,\n' +
    '                 \'text-field--label-hidden\': fixedLabel() && data.model,\n' +
    '                 \'text-field--with-icon\': icon && fixedLabel() }">\n' +
    '    <label class="text-field__label">\n' +
    '        {{ label }}\n' +
    '    </label>\n' +
    '\n' +
    '    <div class="text-field__icon" ng-if="icon && fixedLabel() ">\n' +
    '        <i class="mdi mdi--{{ icon }}"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-transclude="1"></div>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.search-filter").run(['$templateCache', function(a) { a.put('lumx.search_filter.html', '<div class="search-filter search-filter--{{ theme }}-theme"\n' +
    '     ng-class="{ \'search-filter--is-focused\': model,\n' +
    '                 \'search-filter--is-closed\': closed }">\n' +
    '    <div class="search-filter__container">\n' +
    '        <label class="search-filter__label"><i class="mdi mdi--search"></i></label>\n' +
    '        <input type="text" class="search-filter__input" placeholder="{{ placeholder }}" ng-model="model">\n' +
    '        <span class="search-filter__cancel" ng-click="clear()"><i class="mdi mdi--cancel"></i></span>\n' +
    '    </div>\n' +
    '</div>');
	 }]);
angular.module("lumx.select").run(['$templateCache', function(a) { a.put('lumx.select_selected.html', '<div lx-dropdown-toggle>\n' +
    '    <span class="lx-select__floating-label" ng-if="getSelectedElements().length !== 0 && floatingLabel">{{ placeholder }}</span>\n' +
    '\n' +
    '    <div class="lx-select__selected"\n' +
    '         ng-class="{ \'lx-select__selected--is-unique\': !multiple,\n' +
    '                     \'lx-select__selected--is-multiple\': multiple && getSelectedElements().length > 0,\n' +
    '                     \'lx-select__selected--placeholder\': getSelectedElements().length === 0 }"\n' +
    '         lx-ripple>\n' +
    '        <span ng-if="getSelectedElements().length === 0">{{ placeholder }}</span>\n' +
    '\n' +
    '        <!-- ng-repeat is used to manage the initialization of the $select even for non-multiple selects -->\n' +
    '        <div ng-repeat="$selected in getSelectedElements()" ng-if="!multiple">\n' +
    '            <i class="lx-select__close mdi mdi--cancel" ng-click="unselect($selected, $event)" ng-if="allowClear"></i>\n' +
    '            <span ng-transclude="child"></span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div ng-if="multiple">\n' +
    '            <div class="lx-select__tag" ng-repeat="$selected in getSelectedElements()">\n' +
    '                <span ng-transclude="child"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
	a.put('lumx.select_choices.html', '<lx-dropdown-menu class="lx-select__choices">\n' +
    '    <ul ng-if="!tree">\n' +
    '        <li ng-if="getSelectedElements().length > 0">\n' +
    '            <div class="lx-select__chosen"\n' +
    '                 ng-class="{ \'lx-select__chosen--is-multiple\': multiple }"\n' +
    '                 ng-bind-html="getSelectedTemplate()"></div>\n' +
    '        </li>\n' +
    '\n' +
    '        <li>\n' +
    '            <div class="lx-select__filter dropdown-filter">\n' +
    '                <lx-search-filter model="data.filter" filter-width="100%" lx-dropdown-filter></lx-search-filter>\n' +
    '            </div>\n' +
    '        </li>\n' +
    '\n' +
    '        <li class="lx-select__help" ng-if="isHelperVisible()">\n' +
    '            <span ng-if="filterNeeded()">Type minimum {{ minLength }} to search</span>\n' +
    '            <span ng-if="hasNoResults() && !filterNeeded()">No results!</span>\n' +
    '        </li>\n' +
    '\n' +
    '        <li ng-repeat="$choice in choices() | filter:data.filter" ng-if="isChoicesVisible()">\n' +
    '            <a class="lx-select__choice dropdown-link"\n' +
    '               ng-class="{ \'lx-select__choice--is-multiple\': multiple,\n' +
    '                           \'lx-select__choice--is-selected\': isSelected($choice) }"\n' +
    '               ng-click="toggle($choice, $event)"\n' +
    '               ng-transclude="child"></a>\n' +
    '        </li>\n' +
    '\n' +
    '        <li class="lx-select__loader" ng-if="loading === \'true\'">\n' +
    '            <i class="mdi mdi--loop"></i>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</lx-dropdown-menu>');
	a.put('lumx.select.html', '<div class="lx-select"\n' +
    '     ng-class="{ \'lx-select--is-unique\': !multiple,\n' +
    '                 \'lx-select--is-multiple\': multiple }">\n' +
    '    <lx-dropdown width="32" from-top>\n' +
    '        <div ng-transclude="parent"></div>\n' +
    '    </lx-dropdown>\n' +
    '</div>\n' +
    '');
	 }]);
angular.module("lumx.tabs").run(['$templateCache', function(a) { a.put('lumx.tabs.html', '<div class="tabs tabs--theme-{{ linksTc }} tabs--layout-{{ layout }}"\n' +
    '     ng-class="{ \'tabs--no-divider\': noDivider }">\n' +
    '    <ul class="tabs__links bgc-{{ linksBgc }} z-depth{{ zDepth }}">\n' +
    '        <li ng-repeat="tab in getTabs()">\n' +
    '            <a lx-tab-link\n' +
    '               class="tabs-link"\n' +
    '               ng-class="{ \'tabs-link--is-active\': $index === activeTab }"\n' +
    '               ng-click="setActiveTab($index)"\n' +
    '               lx-ripple="{{ indicator }}">\n' +
    '               <span ng-if="tab.icon !== undefined"><i class="mdi mdi--{{ tab.icon }}"></i></span>\n' +
    '               <span ng-if="tab.icon === undefined">{{ tab.heading }}</i></span>\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '\n' +
    '    <div class="tabs__panes" ng-transclude="1"></div>\n' +
    '\n' +
    '    <div class="tabs__indicator bgc-{{ indicator }}"></div>\n' +
    '</div>\n' +
    '');
	a.put('lumx.tab.html', '<div class="tabs-pane" ng-if="index === data.activeTab" ng-transclude="2"></div>\n' +
    '');
	 }]);
angular.module("lumx.date-picker").run(['$templateCache', function(a) { a.put('lumx.date_picker.html', '<div class="lx-date">\n' +
    '    <lx-text-field class="lx-date-input" label="{{ label }}" ng-click="openPicker()">\n' +
    '        <input type="text" ng-model="selectedDate.formatted" ng-disabled="true">\n' +
    '    </lx-text-field>\n' +
    '\n' +
    '    <div class="lx-date-picker">\n' +
    '        <div class="lx-date-picker__current-day-of-week">\n' +
    '            <span ng-if="selectedDate.date">{{ localeData.weekdays(selectedDate.date || currentDate) }}</span>\n' +
    '            <span ng-if="!selectedDate.date">{{ localeData.weekdays(now) }}</span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-date-picker__current-date">\n' +
    '            <div ng-if="selectedDate.date">\n' +
    '                <span>{{ localeData.monthsShort(selectedDate.date || currentDate) }}</span>\n' +
    '                <strong>{{ selectedDate.date.format(\'DD\') }}</strong>\n' +
    '                <em>{{ selectedDate.date.format(\'YYYY\') }}</em>\n' +
    '            </div>\n' +
    '\n' +
    '            <div ng-if="!selectedDate.date">\n' +
    '                <span>{{ localeData.monthsShort(now) }}</span>\n' +
    '                <strong>{{ now.format(\'DD\') }}</strong>\n' +
    '                <em>{{ now.format(\'YYYY\') }}</em>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-date-picker__nav">\n' +
    '            <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="previousMonth()">\n' +
    '                <i class="mdi mdi--chevron-left"></i>\n' +
    '            </button>\n' +
    '\n' +
    '            <span>{{ month.format(\'MMMM YYYY\') }}</span>\n' +
    '\n' +
    '            <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="nextMonth()">\n' +
    '                <i class="mdi mdi--chevron-right"></i>\n' +
    '            </button>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-date-picker__days-of-week">\n' +
    '            <span ng-repeat="day in daysOfWeek">{{ day }}</span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-date-picker__days">\n' +
    '            <span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                  ng-repeat="x in emptyFirstDays">&nbsp;</span><!--\n' +
    '\n' +
    '         --><div class="lx-date-picker__day"\n' +
    '                 ng-class="{ \'lx-date-picker__day--is-selected\': day.selected,\n' +
    '                             \'lx-date-picker__day--is-today\': day.today }"\n' +
    '                 ng-repeat="day in days">\n' +
    '                <a ng-click="select(day)">{{ day ? day.format(\'D\') : \'\' }}</a>\n' +
    '            </div><!--\n' +
    '\n' +
    '         --><span class="lx-date-picker__day lx-date-picker__day--is-empty"\n' +
    '                  ng-repeat="x in emptyLastDays">&nbsp;</span>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="lx-date-picker__actions">\n' +
    '            <button class="btn btn--m btn--teal btn--flat" lx-ripple ng-click="closePicker()">Ok</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
	 }]);